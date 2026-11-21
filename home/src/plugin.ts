// The Vite plugin that makes the landing page from the guides: it reads them (guides.ts), makes each one's pictures and copies its display
// font, writes the stylesheet of their palettes and the tab's icon, and renders the markup into index.html and 404.html. In a build the
// files are emitted beside the bundle; in dev they are served from memory.
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import type { Plugin } from "vite";
import { APPS, readGuides } from "./guides";
import { ogImage, ogTags } from "./og";
import type { GuideArt } from "./page";
import { faviconSvg, guidesCss, renderHome, renderNotFound } from "./render";

/** The page's address, which the link preview's picture is named on (index.html's canonical and og:url). */
export const HOME = "https://hundo.quest";

/** The banner's copies: a phone's short band, a desktop's band at 1x, and up to the original for 2x and 3x screens. */
export const BANNER_WIDTHS = [480, 960, 1800];
/**
 * The hero's backdrop copy, every guide's cut to 288×96 whatever its banner's shape. Chrome counts an image drawn larger than its own
 * size as at most its own area for the largest contentful paint, and the backdrop's crop (object-fit: cover) doesn't lower that, so each
 * banner counts 27,648px² at any width, under the headline's smallest, 33,304 (two lines, from 400 to 600px wide): the backdrop never
 * outranks the headline. Measured in Chrome on 21 Nov 2026: a 320px copy counted its whole 34,240 and outranked the headline from 400
 * to 600px wide, Lighthouse's phone among them, and Koholint's, 320×119 from a 1700×630 banner, 38,080, outranking it from 320 to 600.
 */
export const BACKDROP_WIDTH = 288;
const TILE_WIDTHS = [40, 80, 120];
const HUNDO_FONT_FILE = join(import.meta.dirname, "fonts", "manrope.woff2");

const contentType: Record<string, string> = {
  webp: "image/webp",
  png: "image/png",
  jpg: "image/jpeg",
  woff2: "font/woff2",
  css: "text/css",
  svg: "image/svg+xml",
  txt: "text/plain",
};

/** What the build makes: each file's published path (no leading slash) and its bytes, and the pages' markup and head. */
export type Made = {
  files: Map<string, Buffer | string>;
  head: string;
  /** The link preview picture's tags, in index.html's head alone: 404.html is never shared or indexed. */
  og: string;
  home: string;
  notFound: string;
};

/** A name that changes with the content, so the year-long cache on /assets (vercel.json) is safe. */
const hashed = (name: string, extension: string, source: Buffer | string) =>
  `assets/${name}-${createHash("sha256").update(source).digest("hex").slice(0, 10)}.${extension}`;

/** The licence file a guide keeps beside its font (docs/house-style.md): "Playfair Display" → Playfair-Display-OFL.txt. */
const licenceOf = (fonts: string, family: string) => join(fonts, `${family.replace(/ /g, "-")}-OFL.txt`);

export const make = async (apps = APPS): Promise<Made> => {
  const guides = await readGuides(apps);
  if (!guides.length) throw new Error(`no guide in ${apps}: every folder there with a src/guide/brand.ts is one`);
  const files = new Map<string, Buffer | string>();
  const add = (path: string, source: Buffer | string) => (files.set(path, source), `/${path}`);

  const art: Record<string, GuideArt> = {};
  const display: Record<string, string> = {};
  for (const guide of guides) {
    const root = join(apps, guide.folder);
    const banner = join(root, "src", "guide", "banners", "chapter-1.webp");
    if (!existsSync(banner)) throw new Error(`${guide.folder}: no src/guide/banners/chapter-1.webp, which its band on the landing page shows`);
    const { width = 0 } = await sharp(banner).metadata();
    const widths = BANNER_WIDTHS.map((w) => Math.min(w, width)).filter((w, i, all) => all.indexOf(w) === i);
    const backdrop = await sharp(banner)
      .resize({ width: BACKDROP_WIDTH, height: BACKDROP_WIDTH / 3, fit: "cover" })
      .webp({ quality: 78 })
      .toBuffer();
    art[guide.folder] = {
      banner: await Promise.all(
        widths.map(async (w) => {
          const source = await sharp(banner).resize({ width: w }).webp({ quality: 78 }).toBuffer();
          return { url: add(hashed(`${guide.folder}-banner-${w}`, "webp", source), source), width: w };
        }),
      ),
      backdrop: { url: add(hashed(`${guide.folder}-backdrop-${BACKDROP_WIDTH}`, "webp", backdrop), backdrop), width: BACKDROP_WIDTH },
      tile: TILE_WIDTHS.map((w) => {
        const source = readFileSync(join(root, "public", "icons", `tile-${w}.png`));
        return { url: add(hashed(`${guide.folder}-tile-${w}`, "png", source), source), width: w };
      }),
    };
    const fonts = join(root, "public", "fonts");
    const font = readFileSync(join(fonts, guide.display.file));
    display[guide.folder] = add(hashed(guide.display.file.replace(/\.woff2$/, ""), "woff2", font), font);
    const licence = licenceOf(fonts, guide.display.family);
    if (!existsSync(licence)) throw new Error(`${guide.folder}: no ${licence}, the licence that goes with its display font`);
    files.set(`fonts/${licence.split("/").at(-1)}`, readFileSync(licence));
  }

  const hundoFont = readFileSync(HUNDO_FONT_FILE);
  const hundo = add(hashed("manrope", "woff2", hundoFont), hundoFont);
  const css = guidesCss(guides, { hundo, display });
  const stylesheet = add(hashed("guides", "css", css), css);
  add("favicon.svg", faviconSvg(guides));
  // Named by its content like every file here: link previews are cached by address, so a new guide's picture gets a new one.
  const picture = await ogImage(guides, apps);
  const og = ogTags(HOME + add(hashed("og", "jpg", picture), picture), guides);
  const head = [
    `<link rel="preload" href="${hundo}" as="font" type="font/woff2" crossorigin>`,
    `<link rel="stylesheet" href="${stylesheet}">`,
    `<link rel="icon" href="/favicon.svg" type="image/svg+xml">`,
  ].join("\n    ");
  return { files, head, og, home: renderHome(guides, art), notFound: renderNotFound() };
};

/** A page with the build's markup in its marks: index.html gets the home page and the link preview's tags, 404.html the lost page alone. */
export const fillPage = (html: string, path: string, { head, og, home, notFound }: Made) => {
  const lost = path.endsWith("404.html");
  if (!html.includes("<!--home:head-->") || !html.includes("<!--home:body-->")) throw new Error(`${path}: no <!--home:head--> or <!--home:body--> to fill`);
  if (!lost && !html.includes("<!--home:og-->")) throw new Error(`${path}: no <!--home:og--> for the link preview's picture`);
  return html
    .replace("<!--home:og-->", lost ? "" : og)
    .replace("<!--home:head-->", head)
    .replace("<!--home:body-->", lost ? notFound : home);
};

export const home = (): Plugin => {
  let made: Promise<Made> | undefined;
  const ready = () => (made ??= make());
  return {
    name: "hundo-home",
    // After Vite's own pass over the HTML, which would otherwise try to bundle the /assets/ paths written here as its own.
    transformIndexHtml: {
      order: "post",
      handler: async (html, { path }) => fillPage(html, path, await ready()),
    },
    async generateBundle() {
      for (const [fileName, source] of (await ready()).files) this.emitFile({ type: "asset", fileName, source });
    },
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        let path: string;
        try {
          path = decodeURIComponent((request.url ?? "").split("?")[0]).slice(1);
        } catch {
          return next();
        }
        const source = (await ready()).files.get(path);
        if (source === undefined) return next();
        response.setHeader("Content-Type", contentType[path.split(".").at(-1) ?? ""] ?? "application/octet-stream");
        response.end(source);
      });
    },
  };
};

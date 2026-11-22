// The Vite plugin that makes the landing page from the guides: it reads them (guides.ts), makes each one's pictures and copies its display
// font, writes the stylesheet of their palettes and the tab's icon, and renders the markup into index.html and 404.html. In a build the
// files are emitted beside the bundle; in dev they are served from memory.
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import subsetFont from "subset-font";
import type { Plugin } from "vite";
import { APPS, readGuides } from "./guides";
import { ogImage, ogTags } from "./og";
import type { GuideArt } from "./page";
import { faviconSvg, guidesCss, renderBackdropHead, renderHome, renderNotFound } from "./render";

/** The page's address, which the link preview's picture is named on (index.html's canonical and og:url). */
export const HOME = "https://hundo.quest";

/** The banner's copies: a phone's short band, a desktop's band at 1x, and up to the original for 2x and 3x screens. */
export const BANNER_WIDTHS = [480, 960, 1800];
/** Full-width hero copies, including upscaled 2× desktop art. Always resize the original, never a small derivative. */
export const BACKDROP_WIDTHS = [960, 1920, 2880, 3840];
export const MOBILE_BACKDROP_WIDTHS = [720, 960, 1200, 1800];
const TILE_WIDTHS = [40, 80, 120];
const HUNDO_FONT_FILE = join(import.meta.dirname, "fonts", "manrope.woff2");

const contentType: Record<string, string> = {
  avif: "image/avif",
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
  /** Only the home page draws a hero. */
  homeHead: string;
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
  const titleFonts = new Map<string, string>();
  for (const guide of guides) {
    const root = join(apps, guide.folder);
    const banner = join(root, "src", "guide", "banners", "chapter-1.webp");
    if (!existsSync(banner)) throw new Error(`${guide.folder}: no src/guide/banners/chapter-1.webp, which its band on the landing page shows`);
    const { width = 0, height = 0 } = await sharp(banner).metadata();
    const widths = BANNER_WIDTHS.map((w) => Math.min(w, width)).filter((w, i, all) => all.indexOf(w) === i);
    // Keep the same 72% focal point as object-position, but omit the sides a phone never draws.
    const frameHeight = Math.min(height, Math.floor(width / 3));
    const frameWidth = Math.min(width, frameHeight * 3);
    const mobileWidth = Math.round(frameHeight * 1.5);
    const mobileCrop = {
      left: Math.round((width - frameWidth) / 2 + (frameWidth - mobileWidth) * 0.72),
      top: Math.round((height - frameHeight) / 2),
      width: mobileWidth,
      height: frameHeight,
    };
    art[guide.folder] = {
      banner: await Promise.all(
        widths.map(async (w) => {
          const source = await sharp(banner).resize({ width: w }).webp({ quality: 78 }).toBuffer();
          return { url: add(hashed(`${guide.folder}-banner-${w}`, "webp", source), source), width: w };
        }),
      ),
      backdrop: {
        wide: await Promise.all(
          BACKDROP_WIDTHS.map(async (w) => {
            const source = await sharp(banner)
              .resize({ width: w, height: w / 3, fit: "cover", kernel: "lanczos3" })
              .webp({ quality: 84 })
              .toBuffer();
            return { url: add(hashed(`${guide.folder}-backdrop-${w}`, "webp", source), source), width: w };
          }),
        ),
        narrow: await Promise.all(
          MOBILE_BACKDROP_WIDTHS.map(async (w) => {
            const image = sharp(banner).extract(mobileCrop).resize(w, (w * 2) / 3);
            const [source, avif] = await Promise.all([
              image.clone().webp({ quality: 75 }).toBuffer(),
              image.clone().avif({ quality: 40, effort: 4 }).toBuffer(),
            ]);
            return {
              url: add(hashed(`${guide.folder}-backdrop-mobile-${w}`, "webp", source), source),
              avif: add(hashed(`${guide.folder}-backdrop-mobile-${w}`, "avif", avif), avif),
              width: w,
            };
          }),
        ),
      },
      tile: TILE_WIDTHS.map((w) => {
        const source = readFileSync(join(root, "public", "icons", `tile-${w}.png`));
        return { url: add(hashed(`${guide.folder}-tile-${w}`, "png", source), source), width: w };
      }),
    };
    const fonts = join(root, "public", "fonts");
    const licence = licenceOf(fonts, guide.display.family);
    if (!existsSync(licence)) throw new Error(`${guide.folder}: no ${licence}, the licence that goes with its display font`);
    const licenceBytes = readFileSync(licence);
    let titleFont = titleFonts.get(guide.display.family);
    if (!titleFont) {
      // Only guide titles use this face here. Include every title sharing it, retaining shaping features and licence metadata.
      const titles = guides.filter((other) => other.display.family === guide.display.family).map((other) => other.game).join(" ");
      const original = readFileSync(join(fonts, guide.display.file));
      // A subset is a modified font. Keep reserved-name faces intact rather than distribute renamed derivatives.
      const licenceHeader = licenceBytes.toString("utf8").split(/This Font Software is licensed|SIL OPEN FONT LICENSE/i)[0];
      const font = /reserved font name/i.test(licenceHeader) ? original : await subsetFont(original, titles, {
        targetFormat: "woff2",
        preserveNameIds: [0, 7, 8, 9, 13, 14],
      });
      titleFont = add(hashed(`${guide.folder}-title`, "woff2", font), font);
      titleFonts.set(guide.display.family, titleFont);
    }
    display[guide.folder] = titleFont;
    files.set(`fonts/${licence.split("/").at(-1)}`, licenceBytes);
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
  return { files, head, homeHead: renderBackdropHead(art[guides[0].folder].backdrop), og, home: renderHome(guides, art), notFound: renderNotFound() };
};

/** A page with the build's markup in its marks: index.html gets the home page and the link preview's tags, 404.html the lost page alone. */
export const fillPage = (html: string, path: string, { head, homeHead, og, home, notFound }: Made) => {
  const lost = path.endsWith("404.html");
  if (!html.includes("<!--home:head-->") || !html.includes("<!--home:body-->")) throw new Error(`${path}: no <!--home:head--> or <!--home:body--> to fill`);
  if (!lost && !html.includes("<!--home:og-->")) throw new Error(`${path}: no <!--home:og--> for the link preview's picture`);
  return html
    .replace("<!--home:og-->", lost ? "" : og)
    .replace("<!--home:head-->", (lost ? "" : homeHead) + head)
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

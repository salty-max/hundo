// What a build gives search engines and link previews (src/search.ts has the policy): robots.txt, the sitemap of the indexed pages, a
// file for each address that is a page of its own (src/routes.ts), the shell's WebSite block, and the picture a shared link shows, cut
// from chapter 1's banner, which every first visit already sees. A link preview never runs the page's scripts, so the shell's tags are the
// same on every address: the guide, never a chapter past the first.
import { createHash } from "node:crypto";
import sharp from "sharp";
import { runnerImport, type Plugin } from "vite";
import { routeFile, routeHtml, routesOf, siteFacts, sitemapPaths, type SiteFacts } from "./src/routes.ts";
import type { Brand, GuideConfig } from "./src/types.ts";

export const robotsTxt = (home: string) => `User-agent: *\nDisallow: /api/\n\nSitemap: ${home}/sitemap.xml\n`;

export const sitemapXml = (home: string, paths: readonly string[]) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(
    (path) => `  <url><loc>${home}${path}</loc></url>\n`,
  ).join("")}</urlset>\n`;

/**
 * What the build reads of the guide at `root`: its own config, loaded through Vite's module runner, which handles what the app's
 * imports use (the banners' `import.meta.glob`). Chapters and chips come from the data, so a new chapter needs nothing here.
 */
export async function guideFacts(root: string): Promise<SiteFacts> {
  const { module } = await runnerImport<{ default: GuideConfig }>(`${root}/src/guide/config.ts`);
  return siteFacts(module.default);
}

/** The WebSite block, as text that is safe inside a `<script>` element: no `<` can close it early. */
export const websiteJsonLd = (brand: Pick<Brand, "name" | "shortName" | "home">) =>
  JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: brand.name, alternateName: brand.shortName, url: `${brand.home}/` }).replace(
    /</g,
    "\\u003c",
  );

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;
/**
 * Where the crop sits across the banner, from 0 (its left edge) to 1 (its right). The banners keep their focal detail right of centre
 * and their left quiet (docs/house-style.md), so the crop leans right.
 */
const OG_LEAN = 0.7;

/** The link preview picture: a 1200×630 JPEG cut from a banner, 1.91:1 out of 3:1. */
export async function ogImage(banner: string) {
  const { width = 0, height = 0 } = await sharp(banner).metadata();
  const cropWidth = Math.round((height * OG_WIDTH) / OG_HEIGHT);
  if (cropWidth > width) {
    throw new Error(`${banner} is ${width}×${height}: the link preview is cut from it at 1.91:1, so it must be at least that wide (banners are 3:1)`);
  }
  const left = Math.round((width - cropWidth) * OG_LEAN);
  return sharp(banner)
    .extract({ left, top: 0, width: cropWidth, height })
    .resize(OG_WIDTH, OG_HEIGHT)
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
}

/** The picture's file, named by its content so a changed picture is a new address (link previews cache by address). */
export const ogFile = (source: Buffer) => `assets/og-${createHash("sha256").update(source).digest("hex").slice(0, 10)}.jpg`;

/**
 * Emits robots.txt, sitemap.xml and the preview picture into a build. `og` is the picture and its file, made before the page is. The
 * sitemap lists the routes the app's own rules leave indexable (src/routes.ts), so it follows the guide's chapters and the policy.
 */
export const searchFiles = (brand: Brand, og: () => Promise<{ file: string; source: Buffer }>, site: () => Promise<SiteFacts>): Plugin => ({
  name: "guide-search",
  apply: "build",
  async generateBundle() {
    const { file, source } = await og();
    this.emitFile({ type: "asset", fileName: file, source });
    this.emitFile({ type: "asset", fileName: "robots.txt", source: robotsTxt(brand.home) });
    this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemapXml(brand.home, sitemapPaths(routesOf(await site()))) });
  },
});

/**
 * Emits a copy of the built page for each address that is a page of its own, as `<address>/index.html`: its own title, description,
 * canonical and robots rule, and its text (src/routes.ts). Runs after Vite has built the page, so the copies carry the same hashed
 * scripts and styles. A host that finds the file serves it at the address, and any address without one still gets the shell.
 */
export const routeFiles = (site: () => Promise<SiteFacts>): Plugin => ({
  name: "guide-routes",
  apply: "build",
  enforce: "post",
  async generateBundle(_options, bundle) {
    const page = bundle["index.html"];
    if (page?.type !== "asset") throw new Error("guide-routes: the build has no index.html to make the routes' files from");
    const shell = String(page.source);
    for (const route of routesOf(await site())) {
      this.emitFile({ type: "asset", fileName: routeFile(route.path), source: routeHtml(shell, route) });
    }
  },
});

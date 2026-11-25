/// <reference types="vitest/config" />
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa";
import { fontCss, fontPreloads } from "./src/fonts.ts";
import { bannerSizes } from "./banners.ts";
import { OG_HEIGHT, OG_WIDTH, guideFacts, ogFile, ogImage, routeFiles, searchFiles, websiteJsonLd } from "./seo.ts";
import { escapeHtml, ROUTE_FOLDERS, shellMain } from "./src/routes.ts";
import { iconUrl, iconUrls } from "./icon-versions.ts";
import { guideManifest } from "./manifest.ts";
import { darkPalette, lightPalette } from "./palette.ts";
import type { Brand } from "./src/types.ts";

const here = (path: string) => fileURLToPath(new URL(path, import.meta.url));
// index.html loads the app through this id, which resolves to core's main.tsx.
const ENTRY = "/@core/main.tsx";

/** What index.html's `%GUIDE_<KEY>%` marks are filled with. `ogFile` is the link preview picture's path in the build (seo.ts). */
export const shellValues = (brand: Brand, palette: Record<string, string>, dark: Record<string, string>, ogFile: string) => {
  // Text that goes into an attribute or an element as it is, escaped; the fonts and the WebSite block are markup and script already.
  const text: Record<string, string> = {
    TITLE: brand.title,
    NAME: brand.name,
    SHORT_NAME: brand.shortName,
    DESCRIPTION: brand.description,
    HOME: brand.home,
    THEME_COLOR: palette["--surface"],
    THEME_COLOR_DARK: dark["--surface"],
    CORNERS: brand.corners,
    STORAGE: brand.storagePrefix,
    OG_WIDTH: String(OG_WIDTH),
    OG_HEIGHT: String(OG_HEIGHT),
    OG_ALT: `${brand.name}: the chapter 1 banner`,
    OG_IMAGE: `${brand.home}/${ogFile}`,
  };
  const values: Record<string, string> = {
    ...Object.fromEntries(Object.entries(text).map(([key, value]) => [key, escapeHtml(value)])),
    JSONLD: websiteJsonLd(brand),
    FONTS: fontCss(brand),
    FONT_PRELOADS: fontPreloads(brand),
    MAIN: shellMain(brand),
  };
  return values;
};

/**
 * Serves the page every guide shares: core's index.html with the brand filled in, and theme-init.js beside it.
 * theme-init.js stays an external file so the CSP can forbid inline scripts.
 */
const guideShell = (
  root: string,
  brand: Brand,
  palette: Record<string, string>,
  dark: Record<string, string>,
  og: () => Promise<{ file: string }>,
): Plugin => {
  const page = `${root}/index.html`;
  const template = readFileSync(here("./index.html"), "utf8");
  const themeInit = readFileSync(here("./theme-init.js"), "utf8");

  return {
    name: "guide-shell",
    enforce: "pre",
    resolveId: (id) => (id === ENTRY ? here("./src/main.tsx") : id === page ? page : undefined),
    load: (id) => (id === page ? template : undefined),
    transformIndexHtml: {
      order: "pre",
      handler: async (html) => {
        const filled = shellValues(brand, palette, dark, (await og()).file);
        return html.replace(/%GUIDE_([A-Z_]+)%/g, (match, key: string) => filled[key] ?? match);
      },
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = (req.url ?? "/").split("?")[0];
        if (path === "/theme-init.js") {
          res.setHeader("Content-Type", "text/javascript");
          res.end(themeInit);
        } else if (req.method === "GET" && req.headers.accept?.includes("text/html") && !/\.\w+$/.test(path)) {
          res.setHeader("Content-Type", "text/html");
          res.end(await server.transformIndexHtml("/index.html", template));
        } else next();
      });
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "theme-init.js", source: themeInit });
    },
  };
};

/** The service worker and the manifest, as vite-plugin-pwa takes them (icon-versions.test.ts reads them as the build gets them). */
export const pwaOptions = (root: string, brand: Brand, palette: Record<string, string>): Partial<VitePWAOptions> => ({
  // "prompt": a new version takes over by itself only while the guide is just starting, untouched, and otherwise waits until the reader
  // accepts, so a reload never lands mid-checklist (sw-updates.ts).
  registerType: "prompt",
  // The glob below precaches the icons and fonts already: listed here too, each went into sw.js twice. favicon.ico is no png or svg,
  // so the glob would miss it.
  includeAssets: ["favicon.ico"],
  includeManifestIcons: false,
  manifest: guideManifest(brand, palette, iconUrl(`${root}/public`)),
  workbox: {
    // Precache the whole shell, fonts and banners so the guide works offline.
    globPatterns: ["**/*.{js,css,html,webp,woff2,png,svg}"],
    // Not the copies of the shell made for each address (routes.ts): the worker answers every address with index.html (below), and a
    // reader who has the worker never needs them. They are for a first visit and for crawlers.
    globIgnores: [`{${ROUTE_FOLDERS.join(",")}}/**/index.html`],
    // Client-side routes (/guide/3 …) all resolve to the app shell.
    navigateFallback: "index.html",
    // /api is the sync API, never a page; robots.txt, the sitemap and the link preview picture are files a reader may open in a tab.
    navigateFallbackDenylist: [/^\/api\//, /\.(?:txt|xml|jpg)$/],
    // An icon's URL carries its version (`?v=`, icon-versions.ts) and the precache lists the bare file, under the same content's MD5:
    // leaving `v` out of the match is what lets the page's versioned icons come from the precache, offline too. Workbox's own two stay.
    ignoreURLParametersMatching: [/^utm_/, /^fbclid$/, /^v$/],
    cleanupOutdatedCaches: true,
  },
  devOptions: { enabled: false },
});

/** The whole Vite and Vitest setup for a guide app: pass the app's folder and its brand. */
export const guideConfig = (root: string, brand: Brand) => {
  const palette = lightPalette(root);
  const dark = darkPalette(root);
  // The link preview picture, made once per build or server from chapter 1's banner (seo.ts).
  let preview: Promise<{ file: string; source: Buffer }> | undefined;
  const og = () =>
    (preview ??= ogImage(`${root}/src/guide/banners/chapter-1.webp`).then((source) => ({ file: ogFile(source), source })));
  // What the sitemap and the files for each address are made from: the guide's own config, read once per build.
  let facts: ReturnType<typeof guideFacts> | undefined;
  const site = () => (facts ??= guideFacts(root));
  // In production /api is a rewrite to the sync API (vercel.json). Here the dev and preview servers send it to the local one
  // (`pnpm -C services/sync dev`, on 8787), keeping the page's own host so the API sees what it would see behind the rewrite.
  const proxy = { "/api": { target: process.env.SYNC_API ?? "http://127.0.0.1:8787" } };
  return defineConfig({
    server: { proxy },
    preview: { proxy },
    resolve: {
      // Core imports the guide's config, panels and theme through virtual:guide/…, which is the app's src/guide.
      alias: [{ find: /^virtual:guide\//, replacement: `${root}/src/guide/` }],
    },
    plugins: [
      guideShell(root, brand, palette, dark, og),
      searchFiles(brand, og, site),
      routeFiles(site),
      iconUrls(`${root}/public`),
      bannerSizes(),
      react(),
      // The jsdom tests never process CSS (only ?raw text gets through), so Tailwind sits them out.
      ...(process.env.VITEST ? [] : [tailwindcss()]),
      // Always pwaOptions, never options written here: icon-versions.test.ts checks the manifest and the precache match on what it returns.
      VitePWA(pwaOptions(root, brand, palette)),
    ],
    build: { target: "es2022", sourcemap: true },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: [here("./src/test/setup.ts")],
      // The deploy and icons tests read this app's vercel.json and icons.
      env: { GUIDE_ROOT: root },
      // Stylesheets load empty in tests, except the ?raw text the theme test reads.
      css: { include: [/\.css\?raw$/] },
      // Core's shared suites run against this guide, beside the guide's own tests.
      include: ["src/**/*.test.{ts,tsx}", `${here("./src")}/**/*.test.{ts,tsx}`],
    },
  });
};

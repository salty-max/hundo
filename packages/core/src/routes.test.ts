// @vitest-environment node
import type { Plugin } from "vite";
import page from "../index.html?raw";
import { guideFacts, robotsTxt, routeFiles, searchFiles, sitemapXml } from "../seo";
import { shellValues } from "../vite";
import { brand, chapters, config } from "./guide";
import { defaultState } from "./progress-state";
import { isOpen } from "./store/progress";
import { pwaOptions } from "../vite";
import { headFor, INDEXED_PATHS } from "./search";
import { firstVisit, ROUTE_FOLDERS, routeFile, routeHtml, routesOf, shellMain, siteFacts, sitemapPaths, type Route } from "./routes";

// The file each address of the guide is served as, and the sitemap that names them (routes.ts). What the policy is, which pages a search
// engine is asked for and which say noindex, is search.test.tsx's; this holds the files to it, in this guide's own data.
const root = process.env.GUIDE_ROOT!;
const facts = siteFacts(config);
const routes = routesOf(facts);
const last = chapters.length;

/** The built page as the build leaves it: the shell's marks filled, as the shell plugin does. */
const shell = (() => {
  const filled = shellValues(brand, { "--surface": "#fff" }, { "--surface": "#000" }, "assets/og-0123456789.jpg");
  return page.replace(/%GUIDE_([A-Z_]+)%/g, (match, key: string) => filled[key] ?? match);
})();

const html = (route: Route) => routeHtml(shell, route);

/** Runs a plugin's generateBundle over `bundle`, as the build does, and returns the files it emitted by name. */
const generate = async (plugin: Plugin, bundle: object) => {
  const emitted: Record<string, string> = {};
  const context = { emitFile: ({ fileName, source }: { fileName: string; source: string | Uint8Array }) => (emitted[fileName!] = String(source)) };
  await (plugin.generateBundle as unknown as (this: typeof context, options: object, bundle: object) => Promise<void>).call(context, {}, bundle);
  return emitted;
};
const one = (text: string, pattern: RegExp) => [...text.matchAll(pattern)].map((match) => match[1]);
const titleOf = (text: string) => one(text, /<title>([^<]*)<\/title>/g);
const canonicalOf = (text: string) => one(text, /<link rel="canonical" href="([^"]*)">/g);
const robotsOf = (text: string) => one(text, /<meta name="robots" content="([^"]*)">/g);
const rootOf = (text: string) => one(text, /<div id="root">([\s\S]*?)<\/div>/g);
/** What a reader or a crawler reads of a file before any script runs: the title, the description, and the text in the page. */
const readable = (text: string) =>
  [titleOf(text), one(text, /<meta name="description" content="([^"]*)">/g), rootOf(text), one(text, /<noscript>([\s\S]*?)<\/noscript>/g)]
    .flat()
    .join("\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

describe("the routes", () => {
  it("has a file for every chapter, the checklist, the progress page and the questlines page, and for nothing else", () => {
    const wanted = [...Array.from({ length: last }, (_, index) => `/guide/${index + 1}`), "/checklist", "/dashboard", "/questlines"];
    expect(routes.map((route) => route.path)).toEqual(wanted);
    expect(routeFile("/guide/3")).toBe("guide/3/index.html");
    expect(routeFile("/checklist")).toBe("checklist/index.html");
  });

  it("says what the app itself sets for a first visit, since that is what a crawler renders", () => {
    // A first visit is the app's own default save, not a copy of what it holds today: a change there has to change the files.
    const start = defaultState();
    const fresh = firstVisit(facts);
    expect(fresh.savedChapter).toBe(start.chapter);
    for (let chapter = 1; chapter <= last; chapter++) expect(fresh.open(chapter), `chapter ${chapter}`).toBe(isOpen(start, chapter));
    for (const route of routes) expect(route.head, route.path).toEqual(headFor(route.path, fresh));
  });

  it("keeps every route's file out of the service worker's precache, which answers every navigation with the shell", () => {
    const [ignored] = pwaOptions(root, brand, {}).workbox!.globIgnores!;
    expect(ignored).toBe(`{${ROUTE_FOLDERS.join(",")}}/**/index.html`);
    for (const route of routes) expect(ROUTE_FOLDERS, route.path).toContain(route.path.split("/")[1]);
  });
});

describe("the sitemap", () => {
  it("lists the guide's address for each route that isn't noindex, which is the three indexed pages", () => {
    const paths = sitemapPaths(routes);
    expect(paths).toEqual([...INDEXED_PATHS]);
    const locs = [...sitemapXml(brand.home, paths).matchAll(/<loc>([^<]*)<\/loc>/g)].map(([, loc]) => loc);
    expect(locs).toEqual(INDEXED_PATHS.map((path) => brand.home + path));
  });

  it("leaves no chapter out by mistake: each is listed or says noindex in its own file", () => {
    const listed = new Set(sitemapPaths(routes));
    for (let chapter = 1; chapter <= last; chapter++) {
      const route = routes.find((item) => item.path === `/guide/${chapter}`)!;
      // exactly one of the two: listed, with nothing to keep it out, or kept out in its own file
      expect(listed.has(route.path), route.path).toBe(robotsOf(html(route)).length === 0);
    }
  });

  it("follows the policy, so every chapter would be listed the moment it stopped saying noindex", () => {
    const open = { ...firstVisit(facts), open: () => true };
    const revealed = routes.map((route) => ({ ...route, head: headFor(route.path, open) }));
    expect(sitemapPaths(revealed)).toEqual(routes.filter((route) => route.path !== "/questlines").map((route) => route.path));
  });

  it("is made in the build from the guide's own config, in the guide's own folder", async () => {
    const site = await guideFacts(root);
    expect(site.chapterTitles).toEqual(chapters.map((chapter) => chapter.title));
    expect(site).toEqual(facts);
    const plugin = searchFiles(brand, async () => ({ file: "assets/og-0123456789.jpg", source: Buffer.from("x") }), async () => site);
    const emitted = await generate(plugin, {});
    expect(emitted["sitemap.xml"]).toBe(sitemapXml(brand.home, INDEXED_PATHS));
    expect(emitted["robots.txt"]).toBe(robotsTxt(brand.home));
  });
});

describe("each route's file", () => {
  it("has its own title, one description, and the route's own address as its canonical", () => {
    const titles = new Set<string>();
    for (const route of routes) {
      const text = html(route);
      expect(titleOf(text), route.path).toHaveLength(1);
      expect(canonicalOf(text), route.path).toEqual([`${brand.home}${route.path}`]);
      expect(text.match(/name="description"/g), route.path).toHaveLength(1);
      expect(text.match(/<title>/g), route.path).toHaveLength(1);
      titles.add(titleOf(text)[0]);
    }
    // every route a title of its own: no two pages tell a search engine they are the same
    expect(titles.size).toBe(routes.length);
    // and none points at the guide's start: the canonical is the page's, so a chapter never claims to be a copy of the home page
    expect(routes.filter((route) => route.path !== "/guide/1").map((route) => canonicalOf(html(route))[0])).not.toContain(`${brand.home}/guide/1`);
  });

  it("says noindex where the app does, on a hidden chapter and the questlines page, and nowhere else", () => {
    for (const route of routes) {
      const hidden = /^\/guide\/(\d+)$/.test(route.path) ? route.path !== "/guide/1" : route.path === "/questlines";
      expect(robotsOf(html(route)), route.path).toEqual(hidden ? ["noindex"] : []);
    }
  });

  it("keeps the shell's scripts, styles and link card, so the app loads and a shared link still shows the guide", () => {
    for (const route of routes) {
      const text = html(route);
      expect(text, route.path).toContain('<script src="/theme-init.js" vite-ignore></script>');
      expect(text, route.path).toContain('<script type="module" src="/@core/main.tsx"></script>');
      expect(text, route.path).toContain(`<meta property="og:title" content="${brand.title.replace(/&/g, "&amp;")}">`);
    }
  });

  it("holds a short text naming the guide and the page, and links to the three pages", () => {
    for (const route of routes) {
      const [main] = rootOf(html(route));
      expect(main, route.path).toContain(`<h1>`);
      expect(main, route.path).toMatch(/<nav><a href="\/guide\/1">Guide<\/a> · <a href="\/checklist">Checklist<\/a> · <a href="\/dashboard">Progress<\/a><\/nav>/);
    }
    expect(readable(html(routes[1]))).toContain(`Chapter 2 of ${last}.`);
    expect(readable(html(routes[0]))).toContain(`Chapter 1 of ${last}.`);
    const checklist = routes.find((route) => route.path === "/checklist")!;
    expect(readable(html(checklist))).toContain(`${facts.entries} entries across ${last} chapters`);
    expect(readable(html(checklist))).toContain(config.text.checklistIntro);
    expect(readable(html(routes.find((route) => route.path === "/dashboard")!))).toContain(config.text.dashboardIntro);
  });

  it("keeps the text out of sight while scripts run and shows it when they are off", () => {
    // Shown to everyone, the app swaps it out after its first paint, and Lighthouse's LCP for the checklist doubled (routes.ts).
    for (const route of [...routes, { path: "/", main: shellMain(brand) }]) expect(route.main, route.path).toMatch(/^<main class="sr-only">/);
    const reveal = /<noscript><style>#root>main\{([^}]*)\}/.exec(page)?.[1] ?? "";
    // every property sr-only sets is undone, so a reader without scripts sees the text, and the rule isn't inside a layer that sr-only outranks
    for (const property of ["position:static", "width:auto", "height:auto", "margin:0", "overflow:visible", "clip:auto", "clip-path:none", "white-space:normal"]) {
      expect(reveal, property).toContain(property);
    }
  });

  it("gives every other address the shell, with the guide's name and description and no canonical or robots rule", () => {
    expect(rootOf(shell)).toEqual([shellMain(brand)]);
    expect(shellMain(brand)).toContain(brand.description);
    expect(canonicalOf(shell)).toEqual([]);
    expect(robotsOf(shell)).toEqual([]);
  });

  it("names nothing the guide hides: no row, group, chapter title, teaser, region or intro in what a first look reads", () => {
    // Whatever the guide's brand, page intros and category chips already say is fair, and so is any word of it a row happens to repeat.
    const allowed = [brand.name, brand.title, brand.description, brand.game, ...facts.chips, facts.questlines, facts.checklistIntro, facts.dashboardIntro]
      .join("\n")
      .toLowerCase();
    const secrets = chapters.flatMap((chapter) => [
      chapter.title,
      chapter.teaser,
      chapter.region,
      chapter.intro,
      ...chapter.groups.flatMap((group) => [group.title, group.location, group.note, ...group.rows.flatMap((row) => [row.title, row.text])]),
    ]);
    const hidden = [...new Set(secrets.filter((text): text is string => typeof text === "string" && text.trim().length >= 4))].filter(
      (text) => !allowed.includes(text.trim().toLowerCase()),
    );
    expect(hidden.length).toBeGreaterThan(0);
    for (const route of [...routes, { path: "/", head: headFor("/", firstVisit(facts)), main: shellMain(brand) }]) {
      const read = route.path === "/" ? readable(shell) : readable(html(route));
      const found = hidden.find((text) => read.includes(text));
      expect(found, `${route.path} says "${found}"`).toBeUndefined();
    }
  });

  it("refuses a page the build changed under it, rather than writing files without their parts", () => {
    expect(() => routeHtml("<html><title>x</title></html>", routes[0])).toThrow(/no description/);
    expect(() => routeHtml(shell.replace('<div id="root">', '<div id="app">'), routes[0])).toThrow(/no #root/);
  });
});

describe("the build's route files", () => {
  it("emits one file per route from the built page, beside it", async () => {
    const plugin = routeFiles(async () => facts);
    const emitted = await generate(plugin, { "index.html": { type: "asset", source: shell } });
    expect(Object.keys(emitted)).toEqual(routes.map((route) => routeFile(route.path)));
    expect(emitted["guide/1/index.html"]).toBe(routeHtml(shell, routes[0]));
    expect(plugin.enforce).toBe("post");
    await expect(generate(plugin, {})).rejects.toThrow(/no index\.html/);
  });
});

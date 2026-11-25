import { headFor, type Head, type HeadContext } from "./search.ts";
import type { Brand, GuideConfig } from "./types.ts";

/*
 * The file each address of a guide is served as, made at build (seo.ts). A crawler's first look at an address is the raw HTML, before it
 * runs any script, so each address that is a page of its own gets its own title, description, canonical and robots rule there (the ones
 * the app sets once it loads, search.ts), and a little text that is the same for every reader: the guide's name, the game, what the
 * page is, and links to the guide's three pages. The app replaces that text when it loads.
 *
 * The text is visually hidden while the script runs (`sr-only`, which a screen reader and a crawler still read), and shown only when
 * scripts are off (index.html's `<noscript>` rule). Shown to everyone, Lighthouse's LCP for the checklist went from 1.9s to 3.7s on a Mac
 * (Koholint and Red Dead, 25 Nov 2026), over the gate's 3s, and hidden it is back at 1.9s. Why a paint the app then removes costs that
 * was not established; the measurement was.
 *
 * Spoiler-safe by construction: the text is built from the brand, the page intros the guide wrote for those pages, the category chips
 * (which the checklist's description already names), the number of chapters and the number of entries. It never takes a row, a group, a
 * chapter's title, teaser or region. routes.test.ts holds every route's HTML to that against each guide's own data.
 */

export const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** The folders the route files sit in, which the service worker's precache leaves out (vite.ts), so a route can't be added to one and not the other. */
export const ROUTE_FOLDERS = ["guide", "checklist", "dashboard", "questlines"] as const;

/** What the build reads of a guide's config. Plain data, so it comes out of a build's own Node process the same as out of a test. */
export interface SiteFacts {
  brand: HeadContext["brand"];
  chapterTitles: string[];
  chips: string[];
  questlines: string;
  /** Every row of every chapter. */
  entries: number;
  checklistIntro: string;
  dashboardIntro: string;
}

export const siteFacts = ({ brand, chapters, chips, questlines, text }: Pick<GuideConfig, "brand" | "chapters" | "chips" | "questlines" | "text">): SiteFacts => ({
  brand,
  chapterTitles: chapters.map((chapter) => chapter.title),
  chips: chips.checklist.map(([, label]) => label),
  questlines: questlines.title,
  entries: chapters.reduce((sum, chapter) => sum + chapter.groups.reduce((rows, group) => rows + group.rows.length, 0), 0),
  checklistIntro: text.checklistIntro,
  dashboardIntro: text.dashboardIntro,
});

/** A first visit, which is what a crawler always is: chapter 1 open, the rest hidden (search.ts). */
export const firstVisit = (facts: SiteFacts): HeadContext => ({
  brand: facts.brand,
  chapterTitles: facts.chapterTitles,
  chips: facts.chips,
  questlines: facts.questlines,
  savedChapter: 1,
  open: (chapter) => chapter <= 1,
});

export interface Route {
  /** The address, such as `/guide/3`. */
  path: string;
  /** What the app itself would set there for a first visit. */
  head: Head;
  /** The text for `#root`, as markup. */
  main: string;
}

/** The three pages a first visit can read, as the main navigation names them (nav.ts), the only links the text carries. */
const LINKS = `<nav><a href="/guide/1">Guide</a> · <a href="/checklist">Checklist</a> · <a href="/dashboard">Progress</a></nav>`;

const paragraphs = (...lines: string[]) => lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("");
const block = (heading: string, ...lines: string[]) => `<main class="sr-only"><h1>${escapeHtml(heading)}</h1>${paragraphs(...lines)}${LINKS}</main>`;

/** The text in the page every address without a file of its own gets (`/`, an entry's address, an unknown one). */
export const shellMain = (brand: Pick<Brand, "name" | "description">) => block(brand.name, brand.description);

const mainFor = (path: string, facts: SiteFacts, head: Head) => {
  const { brand, chapterTitles } = facts;
  const chapter = Number(path.split("/")[2]);
  if (path.startsWith("/guide/")) {
    const place = `Chapter ${chapter} of ${chapterTitles.length}.`;
    return block(
      brand.name,
      brand.description,
      chapter === 1
        ? `${place} Later chapters stay hidden until you reveal them, so the guide spoils nothing you haven't reached.`
        : `${place} It stays hidden until you reveal it, so the guide spoils nothing you haven't reached.`,
    );
  }
  if (path === "/checklist") {
    return block(
      head.title,
      head.description,
      facts.checklistIntro,
      `${facts.entries} entries across ${chapterTitles.length} chapters, each one checkable.`,
    );
  }
  if (path === "/dashboard") return block(head.title, head.description, facts.dashboardIntro);
  return block(head.title, head.description);
};

/** Every address that gets a file of its own, with what that file says. */
export function routesOf(facts: SiteFacts): Route[] {
  const context = firstVisit(facts);
  const [guide, ...pages] = ROUTE_FOLDERS;
  const paths = [...facts.chapterTitles.map((_, index) => `/${guide}/${index + 1}`), ...pages.map((page) => `/${page}`)];
  return paths.map((path) => {
    const head = headFor(path, context);
    return { path, head, main: mainFor(path, facts, head) };
  });
}

/** The sitemap's addresses: the routes a search engine is asked to index, which is what the app's own rules (search.ts) leave without noindex. */
export const sitemapPaths = (routes: Route[]) => routes.filter((route) => !route.head.noindex).map((route) => route.path);

/** The file a route is written to: a folder's index, which a host serves at the address itself. */
export const routeFile = (path: string) => `${path.slice(1)}/index.html`;

const once = (html: string, pattern: RegExp, replacement: string, what: string) => {
  if (!pattern.test(html)) throw new Error(`the page has no ${what} to fill (routes.ts looks for ${pattern})`);
  return html.replace(pattern, () => replacement);
};

/** The shell's page, built, as the route's own: its title and description, its canonical and robots rule, and its text. */
export function routeHtml(shell: string, route: Route) {
  const { head, main } = route;
  const tags = `<meta name="description" content="${escapeHtml(head.description)}">\n  <link rel="canonical" href="${escapeHtml(head.canonical)}">${
    head.noindex ? '\n  <meta name="robots" content="noindex">' : ""
  }`;
  let html = once(shell, /<title>[^<]*<\/title>/, `<title>${escapeHtml(head.title)}</title>`, "<title>");
  html = once(html, /<meta name="description" content="[^"]*">/, tags, "description");
  return once(html, /<div id="root">[\s\S]*?<\/div>/, `<div id="root">${main}</div>`, "#root");
}

import type { Brand } from "./types";

/*
 * What search engines get, and what they never get. A crawler keeps no storage between pages, so it always sees the guide as a first
 * visit does: chapter 1 open and every later chapter hidden. Nothing past chapter 1 is shown to it, so nothing past chapter 1 can reach
 * a result's title or snippet. These three pages are the indexed ones (the sitemap's list); a hidden chapter says noindex, and every
 * other address names one of them as its canonical. Pure, so the build (seo.ts, which writes each route's file from it, routes.ts) and
 * the page (Head.tsx) share it.
 */

/** The pages a search engine is given, as the sitemap lists them. */
export const INDEXED_PATHS = ["/guide/1", "/checklist", "/dashboard"] as const;

export interface HeadContext {
  brand: Pick<Brand, "name" | "title" | "description" | "game" | "home">;
  chapterTitles: string[];
  /** The checklist's category chip labels, in order. */
  chips: string[];
  /** The Questlines page's title. */
  questlines: string;
  /** The chapter `/` and `/guide` open at (the reader's last one). */
  savedChapter: number;
  /** Whether a chapter is revealed. */
  open: (chapter: number) => boolean;
}

export interface Head {
  title: string;
  description: string;
  /** Absolute, on the guide's own address. */
  canonical: string;
  noindex: boolean;
}

const list = (items: string[]) => (items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items.at(-1)}` : (items[0] ?? ""));

/** The title, description, canonical and robots rule for an address. */
export function headFor(pathname: string, { brand, chapterTitles, chips, questlines, savedChapter, open }: HeadContext): Head {
  const [view, param] = pathname.split("/").filter(Boolean);
  const page = (path: string, title: string, description: string): Head => ({
    title,
    description,
    canonical: brand.home + path,
    noindex: false,
  });

  if (view === "checklist") {
    const named = list([...chips.slice(0, 3), "more"]);
    return page(
      "/checklist",
      `${brand.game} checklist · ${brand.name}`,
      `Search every ${brand.game} entry by item, location or activity: ${named}. Later chapters stay hidden until revealed.`,
    );
  }
  // Not indexed: a crawler sees chapter 1 alone, so the page would hold what /guide/1 does, and a line's own address names the page.
  if (view === "questlines") {
    return { ...page("/questlines", `${questlines} · ${brand.name}`, `${brand.game}: ${questlines.toLowerCase()} step by step, as far as you have revealed.`), noindex: true };
  }
  if (view === "dashboard") {
    return page(
      "/dashboard",
      `${brand.game} progress tracker · ${brand.name}`,
      `Your ${brand.game} completion by chapter and category, and what's left. Progress stays in your browser, with backup and device sync.`,
    );
  }

  // The guide, which is also what `/` and any unknown address show (App's Home sends them to a chapter): the chapter the page draws.
  const n = Number(view === "guide" ? param : undefined);
  const chapter = Number.isInteger(n) && n >= 1 && n <= chapterTitles.length ? n : savedChapter;
  const path = `/guide/${chapter}`;
  if (!open(chapter)) return { ...page(path, `Chapter ${chapter} is hidden · ${brand.name}`, brand.description), noindex: true };
  if (chapter === 1) return page(path, brand.title, brand.description);
  return page(path, `Chapter ${chapter}: ${chapterTitles[chapter - 1]} · ${brand.name}`, brand.description);
}

import { useEffect } from "react";
import { useLocation } from "react-router";
import { brand, chapters, config } from "../guide";
import { headFor } from "../search";
import { isOpen, useProgress } from "../store/progress";

const chapterTitles = chapters.map((chapter) => chapter.title);
const chips = config.chips.checklist.map(([, label]) => label);
const questlines = config.questlines.title;

/** The `<head>` element matching `selector`, made from `attributes` when the shell has none. */
const tag = (selector: string, name: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLElement>(selector);
  if (!element) {
    element = document.createElement(name);
    for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
    document.head.append(element);
  }
  return element;
};

/**
 * The page's title, description, canonical and robots rule, for the address shown and what is revealed (search.ts). One place in the
 * app rather than one per page, since the pages stay drawn while hidden (Pages). It edits the title and description the page was
 * served with, and finds the canonical and the noindex if the file for the address (routes.ts) has them, so there is only ever one of
 * each. The shell has neither, since its address could be any, and a route's file carries what this sets for a first visit: for a crawler
 * the two agree, and for a reader who revealed a chapter this drops the file's noindex.
 */
export function Head() {
  const { pathname } = useLocation();
  const data = useProgress((s) => s.data);

  useEffect(() => {
    const head = headFor(pathname, { brand, chapterTitles, chips, questlines, savedChapter: data.chapter, open: (n) => isOpen(data, n) });
    document.title = head.title;
    tag('meta[name="description"]', "meta", { name: "description" }).setAttribute("content", head.description);
    tag('link[rel="canonical"]', "link", { rel: "canonical" }).setAttribute("href", head.canonical);
    const robots = document.head.querySelector('meta[name="robots"]');
    if (head.noindex) tag('meta[name="robots"]', "meta", { name: "robots" }).setAttribute("content", "noindex");
    else robots?.remove();
  }, [pathname, data]);

  return null;
}

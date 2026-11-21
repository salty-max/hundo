// The Find field over the guides: it narrows the list as a reader types, on the guide's name, its game and its publisher. Without this
// script the field stays invisible (home.css keeps its room, so showing it moves nothing; with scripts off it is gone) and every guide shows.
import type { Guide } from "./guides";

/** What the field matches a guide on, written into its band at build (page.tsx). */
export const findTerms = (guide: Pick<Guide, "mark" | "game" | "publisher">) => [guide.mark, guide.game, guide.publisher].join(" ");

/** Lower case, accents and apostrophes dropped, anything else that isn't a letter or a digit a space: "Link’s Awakening" → "links awakening". */
export const normalise = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/['’‘`]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

/** Whether a guide's terms match what was typed: every word typed starts one of the terms' words. Nothing typed matches everything. */
export const matches = (terms: string, query: string) => {
  const words = normalise(terms).split(" ");
  return normalise(query)
    .split(" ")
    .filter(Boolean)
    .every((typed) => words.some((word) => word.startsWith(typed)));
};

/** What the status line says after a search: nothing while every guide shows. */
export const status = (shown: number, total: number, query: string) => {
  if (shown === total) return "";
  if (shown === 0) return `No guide matches “${query.trim()}”.`;
  return `${shown} of ${total} guides match.`;
};

/** Wires the field on the page, if it has one. */
export const wireFind = (root: ParentNode = document) => {
  const field = root.querySelector<HTMLElement>("[data-find]");
  const input = field?.querySelector("input");
  const line = root.querySelector<HTMLElement>("[data-find-status]");
  const guides = [...root.querySelectorAll<HTMLElement>("[data-guide]")];
  if (!field || !input || !line || !guides.length) return;
  field.dataset.ready = "";
  const update = () => {
    let shown = 0;
    for (const guide of guides) {
      const show = matches(guide.dataset.guide ?? "", input.value);
      guide.hidden = !show;
      if (show) shown += 1;
    }
    line.textContent = status(shown, guides.length, input.value);
  };
  input.addEventListener("input", update);
  // A value the browser kept from before (back and forward) applies at once.
  if (input.value) update();
};

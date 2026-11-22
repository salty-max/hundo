import { allRows, byId, chapterRows, chapters, completion, config, missablesLeft } from "./guide";
import type { Chapter, Checks, Later, ProgressState, Row } from "./types";

/*
 * How the guide flows for a reader: what a row needs before it can be done (`requires`), where it's done (`place`), how far the reader
 * has come (the mark), what they set aside for later and when it comes back, what Next up offers, and the handoff at a chapter's end.
 * Nothing here counts: the figure and What's left read ticks only (guide.ts).
 */

type Flow = Pick<ProgressState, "checks" | "later">;
type IsOpen = (chapter: number) => boolean;

/** A row's place in the route, from 0. */
const routeIndex = new Map(allRows.map((row, index) => [row.id, index]));
export const routeOrder = (id: string) => routeIndex.get(id) ?? -1;

// ── Requirements ──

/** Whether every requirement of a row is met: each entry has one of its rows ticked. A row with none is never waiting. */
export const requirementsMet = (row: Row, checks: Checks) => row.requires.every((any) => any.some((id) => checks[id] === true));
/** The first requirement a row is still waiting on, as the rows any one of which would meet it. */
export const waitingOn = (row: Row, checks: Checks) => row.requires.find((any) => !any.some((id) => checks[id] === true));
/** What a row gives, as a requirement names it: its `gives`, else its title. */
export const givesName = (id: string) => byId.get(id)?.gives ?? byId.get(id)?.title ?? id;
/**
 * The rows of a requirement a reader may see named: those in revealed chapters. Empty when every one is in a hidden chapter, which the
 * row then calls something from a later chapter, never by name.
 */
export const shownNeeds = (any: readonly string[], isOpen: IsOpen) => any.filter((id) => isOpen(byId.get(id)?.chapter ?? Infinity));

/** A row's waiting words for a short list's second line: "Needs Monarch Wings", or something from a later chapter. */
export function needsWords(row: Row, checks: Checks, isOpen: IsOpen) {
  const need = waitingOn(row, checks);
  if (!need) return "";
  const ids = shownNeeds(need, isOpen);
  return ids.length ? `Needs ${ids.map(givesName).join(" or ")}` : "Needs something from a later chapter";
}

/** Rows a row in a later chapter requires: "Needed later" in their own chapter's handoff. */
const neededLater = new Set(allRows.flatMap((row) => row.requires.flat().filter((id) => (byId.get(id)?.chapter ?? Infinity) < row.chapter)));

// ── Places and visits ──

/** The places a location names: "Greenpath · Forgotten Crossroads" is two. */
const placesIn = (location: string | undefined) => (location ?? "").split("·").map((place) => place.trim()).filter(Boolean);
const groups = chapters.flatMap((chapter) => chapter.groups.map((group) => ({ group, chapter: chapter.id, places: placesIn(group.location) })));
const groupOfRow = new Map(groups.flatMap(({ group }, index) => group.rows.map((row) => [row.id, index] as const)));
/** For each place, the groups (by index in the route) that begin a visit to it: a run of groups at that place, after somewhere else. */
const visitStarts = new Map<string, number[]>();
groups.forEach(({ places }, index) => {
  for (const place of places) if (!groups[index - 1]?.places.includes(place)) visitStarts.set(place, [...(visitStarts.get(place) ?? []), index]);
});
/** How many visits to a place have begun by a group of the route: 0 before the first. */
const visitsBy = (place: string, at: number) => (visitStarts.get(place) ?? []).filter((start) => start <= at).length;

// ── The mark, and rows set aside ──

/** The furthest row ticked in route order among revealed chapters: how far the reader has come. */
export function markOf(checks: Checks, isOpen: IsOpen): Row | undefined {
  for (let index = allRows.length - 1; index >= 0; index--) {
    const row = allRows[index];
    if (checks[row.id] === true && isOpen(row.chapter)) return row;
  }
}

/** What a row set aside now is anchored to: the mark, or the row itself when it lies further on. When it comes back depends on it. */
export function anchorFor(rowId: string, checks: Checks, isOpen: IsOpen): string {
  const mark = markOf(checks, isOpen);
  return mark && routeOrder(mark.id) > routeOrder(rowId) ? mark.id : rowId;
}

/**
 * The place a set-aside row is back at: one of its places that the mark's group is at, on a later visit than its anchor's. Setting it
 * aside again then anchors it to this visit, so it waits for the next. Nothing while the reader is elsewhere.
 */
export function backAt(row: Row, anchor: string, mark: Row | undefined): string | undefined {
  if (!mark) return;
  const at = groupOfRow.get(mark.id);
  const from = groupOfRow.get(anchor) ?? groupOfRow.get(row.id);
  if (at === undefined || from === undefined) return;
  return placesIn(row.place).find((place) => groups[at].places.includes(place) && visitsBy(place, at) > visitsBy(place, from));
}

/** The next visit to one of a set-aside row's places after its anchor, with the chapter it begins in. None where the route has none. */
export function nextVisit(row: Row, anchor: string): { place: string; chapter: number } | undefined {
  const from = groupOfRow.get(anchor) ?? groupOfRow.get(row.id);
  if (from === undefined) return;
  let best: { place: string; start: number } | undefined;
  for (const place of placesIn(row.place)) {
    const start = (visitStarts.get(place) ?? []).find((index) => index > from);
    if (start !== undefined && (!best || start < best.start)) best = { place, start };
  }
  return best && { place: best.place, chapter: groups[best.start].chapter };
}

/**
 * When a set-aside row comes back, in the reader's words: the next visit to its place where the route has one in a revealed chapter.
 * Otherwise the same words whether a hidden chapter holds that visit or none does, since telling the two apart would tell that the place
 * comes back.
 */
export function comesBack(row: Row, later: Later | undefined, isOpen: IsOpen) {
  const place = backPlace(row, later, isOpen);
  return place ? `Back next time you’re in ${place}` : "Set aside for later";
}

/** The place a set-aside row comes back at, where the route's next visit to it is in a revealed chapter; else nothing to promise. */
export function backPlace(row: Row, later: Later | undefined, isOpen: IsOpen) {
  const visit = nextVisit(row, later?.[row.id] ?? row.id);
  return visit && isOpen(visit.chapter) ? visit.place : undefined;
}

/**
 * Whether a row is in a list's status filter: Unfinished is every unticked row, set aside or not; Set aside, the unticked ones set aside;
 * Completed, the ticked ones.
 */
export function inStatus(status: string, row: Row, { checks, later }: Flow) {
  const done = checks[row.id] === true;
  if (status === "done") return done;
  if (status === "todo") return !done;
  if (status === "later") return !done && later?.[row.id] !== undefined;
  return true;
}

// ── Next up ──

/** A step Next up offers, and why it came back, if it did ("Back in Blighttown", "Monarch Wings found"). */
export interface NextItem {
  row: Row;
  why?: string;
  /** Came back for a visit to its place (mint), or because what it needed is ticked (sky). */
  tone?: "mint" | "sky";
}

export interface NextView {
  items: NextItem[];
  /** Rows set aside in revealed chapters, but those back now. */
  aside: Row[];
  /** Rows in revealed chapters waiting on a requirement. */
  waiting: Row[];
}

/**
 * What Next up offers. First, at most two rows that came back: a set-aside row on the next visit to its place, and a row of an earlier
 * chapter whose requirements are met now. Then the next unticked rows in guide order from `fromChapter`, wrapping round, but none set
 * aside or waiting. The guide's deferred rows and the set-aside ones wait until nothing else is left. Never a hidden chapter.
 */
export function nextUp({ checks, later = {} }: Flow, isOpen: IsOpen, fromChapter: number, count = 3): NextView {
  const left = allRows.filter((row) => isOpen(row.chapter) && checks[row.id] !== true);
  const mark = markOf(checks, isOpen);
  const back: NextItem[] = [];
  for (const row of left) {
    const place = later[row.id] ? backAt(row, later[row.id], mark) : undefined;
    if (place) back.push({ row, why: `Back in ${place}`, tone: "mint" });
  }
  // A row comes back for a requirement only if it waited on it: what it needed lies after it in the route. One that needed something
  // the reader already had when they passed it was skipped, not waiting, and stays where the route puts it.
  const ready: NextItem[] = left.flatMap((row) => {
    if (row.chapter >= fromChapter || !row.requires.length || later[row.id] || !requirementsMet(row, checks)) return [];
    const after = row.requires.flat().filter((id) => checks[id] === true && routeOrder(id) > routeOrder(row.id));
    if (!after.length) return [];
    return [{ row, why: `${givesName(after.sort((a, b) => routeOrder(b) - routeOrder(a))[0])} found`, tone: "sky" as const }];
  });
  const surfaced = [...back, ...ready].slice(0, Math.min(2, Math.max(count - 1, 0)));
  const shown = new Set(surfaced.map((item) => item.row.id));
  const order = [...chapters.filter((chapter) => chapter.id >= fromChapter), ...chapters.filter((chapter) => chapter.id < fromChapter)]
    .filter((chapter) => isOpen(chapter.id))
    .flatMap(chapterRows)
    .filter((row) => checks[row.id] !== true && !shown.has(row.id) && requirementsMet(row, checks));
  const open = order.filter((row) => !later[row.id]);
  const steps = config.defer ? open.filter((row) => !config.defer!(row)) : open;
  const rest = steps.length ? steps : [...open, ...order.filter((row) => later[row.id])];
  const items = [...surfaced, ...rest.slice(0, count - surfaced.length).map((row) => ({ row }))];
  const offered = new Set(items.map((item) => item.row.id));
  return {
    items,
    aside: left.filter((row) => later[row.id] && !offered.has(row.id)),
    waiting: left.filter((row) => !later[row.id] && !requirementsMet(row, checks)),
  };
}

// ── The handoff ──

const outside = new Set(completion.outside ?? []);
const counted = new Set(completion.board.filter((item) => !outside.has(item.tag)).map((item) => item.tag));
/** Whether a row counts toward the figure: it carries a board target outside of what lies outside the game. */
export const countsRow = (row: Row) => row.tags.some((tag) => counted.has(tag)) && !row.tags.some((tag) => outside.has(tag));

export interface Handoff {
  /** No missable and no one-way row of the chapter is left, set aside or not. */
  safe: boolean;
  /** Every row that counts is ticked. */
  collected: boolean;
  /** Rows that count, unticked. */
  left: number;
  lost: Row[];
  open: Row[];
  aside: Row[];
  waiting: Row[];
  needed: Row[];
}

/**
 * Before leaving a chapter, from its rows and the reader's checks: whether it's safe to continue, apart from whether everything is
 * collected; what can be lost (Don't miss's rows), what's still open, what's set aside, what's waiting on a requirement, and what a later
 * chapter's rows need. Each row is in one list, in that order of precedence.
 */
export function handoff(chapter: Chapter, { checks, later = {} }: Flow): Handoff {
  const rows = chapterRows(chapter).filter((row) => checks[row.id] !== true);
  const lost = missablesLeft(chapter, checks);
  const taken = new Set(lost.map((row) => row.id));
  const take = (test: (row: Row) => boolean) => {
    const out = rows.filter((row) => !taken.has(row.id) && test(row));
    for (const row of out) taken.add(row.id);
    return out;
  };
  const aside = take((row) => later[row.id] !== undefined);
  const waiting = take((row) => !requirementsMet(row, checks));
  const needed = take((row) => neededLater.has(row.id));
  const open = take(() => true);
  const left = rows.filter(countsRow).length;
  return { safe: lost.length === 0, collected: left === 0, left, lost, open, aside, waiting, needed };
}

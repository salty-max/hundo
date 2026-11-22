import { brand, byId, overall } from "./guide";
import { useProgress } from "./store/progress";
import { useSyncStatus } from "./store/sync";
import { call } from "./sync/api";
import { readHint } from "./sync/local";
import type { ProgressState } from "./types";

/*
 * The guide's summary for hundo.quest: its overall figure (the Progress page's, `overall`) and the reader's chapter, in a cookie the landing
 * page reads to show a returning reader their progress on the guide's band. The sync API sets it (/api/summary, through the guide's own
 * /api, so the answer comes from the page's own host), never this script: Safari has kept a cookie set by page script for as little as a
 * week, and one set by a response as long as it asks (services/sync/README.md, "A guide's summary", has what was checked). So core never
 * writes document.cookie (summary.test.ts holds it to that); this
 * reads the cookie, and asks the API only when what it would set differs from what's there.
 *
 * On a linked device the API also keeps the summary for the group, which hundo.quest reads in the group's other browsers (an installed
 * iPhone app's cookies never reach Safari's). So a linked device says nothing before this page load's first sync has finished: until then
 * its progress may be behind the group's, or empty in an app just added to the Home Screen, and the group's figure would take it. After
 * that first sync it tells the group once, whatever its cookie says, so the group hears from a device whose cookie is already in step.
 */

/** The cookie's name, pinned in each guide's guide.test.ts: like a storage key, it never changes once live. */
export const SUMMARY_COOKIE = `hundo_p_${brand.id}`;

/** How long a change waits for the next, so a run of ticks, or a visit's first look and sync's first pull, make one call. */
export const SUMMARY_WAIT = 5_000;

type Summary = { percent: number; chapter: number } | null;

/** What hundo.quest should show: the figure and the chapter, or nothing while nothing this build has is checked. */
export function summaryOf(data: Pick<ProgressState, "checks" | "chapter">): Summary {
  if (!Object.entries(data.checks).some(([id, checked]) => checked === true && byId.has(id))) return null;
  return { percent: overall(data.checks).percent, chapter: data.chapter };
}

/** The cookie's text for a summary, as the API writes it (`1.<percent>.<chapter>`, the 1 its format), or "" for none. */
export const summaryText = (summary: Summary) => (summary ? `1.${summary.percent}.${summary.chapter}` : "");

/** The cookie as this page sees it, or "" when there is none. */
export function readSummary(): string {
  try {
    const found = document.cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${SUMMARY_COOKIE}=`));
    return found?.slice(SUMMARY_COOKIE.length + 1) ?? "";
  } catch {
    return "";
  }
}

let timer: ReturnType<typeof setTimeout> | undefined;
/** The last text asked for: a call refused or lost isn't made again for the same text, only for a new one or on the next visit. */
let tried: string | null = null;
/** This page load's sync has finished a round since the device was last linked, so its progress has caught up with its group's. */
let caughtUp = false;
/** The group is owed this device's summary: once a link and page load, after the first sync, whatever the cookie says. */
let owed = false;
/** A round that finished before the device was unlinked, which says nothing about a group it links to next. */
let stale: number | null = null;

/**
 * Asks the API to set the cookie, if it holds something else now: looked at when the call goes out, so a change another tab has already
 * sent is not sent twice. Never throws; a failure (offline, a preview whose API lacks the route) is dropped.
 */
export async function sendSummary(keepalive = false) {
  clearTimeout(timer);
  timer = undefined;
  const linked = readHint() !== "";
  // The end of the first sync sends it.
  if (linked && !caughtUp) return;
  const due = linked && owed;
  owed = false;
  const summary = summaryOf(useProgress.getState().data);
  const text = summaryText(summary);
  // In step already (perhaps another tab's call): what was tried before no longer stands in the way of trying it again.
  if (!due && text === readSummary()) {
    tried = null;
    return;
  }
  if (!due && text === tried) return;
  tried = text;
  await call("/summary", { guide: brand.id, summary }, keepalive);
}

const later = () => {
  clearTimeout(timer);
  timer = setTimeout(() => void sendSummary(), SUMMARY_WAIT);
};

/** A call still waiting goes now, before the page is hidden or closed. */
const flushNow = () => {
  if (timer !== undefined) void sendSummary(true);
};
const onVisibility = () => {
  if (document.visibilityState === "hidden") flushNow();
};

/**
 * The first round of sync this page load has finished: what the device holds now is the group's, and the group is owed a look. Unlinked,
 * it starts over, so a group it links to next waits for its own first round.
 */
const onSync = ({ phase, lastSync }: { phase: string; lastSync: number | null }) => {
  if (phase === "off") {
    caughtUp = false;
    owed = false;
    stale = lastSync;
    return;
  }
  if (caughtUp || lastSync === null || lastSync === stale) return;
  caughtUp = true;
  owed = true;
  later();
};

/**
 * Keeps the cookie in step with the progress: a look a moment after the guide opens, then after each change to the checks or the chapter,
 * whatever made it (a tick, a backup, sync, another tab), and on a linked device a look after its first sync. Called once, from main.tsx.
 * Returns the stop (tests).
 */
export function startSummary() {
  later();
  const stop = useProgress.subscribe((state, prev) => {
    if (state.data.checks !== prev.data.checks || state.data.chapter !== prev.data.chapter) later();
  });
  const stopSync = useSyncStatus.subscribe(onSync);
  onSync(useSyncStatus.getState());
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", flushNow);
  return () => {
    stop();
    stopSync();
    clearTimeout(timer);
    timer = undefined;
    tried = null;
    caughtUp = false;
    owed = false;
    stale = null;
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pagehide", flushNow);
  };
}

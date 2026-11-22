import { allRows, chapters, rowsByTag } from "@hundo/core/guide";
import { STORAGE_KEY, defaultState, validateState } from "@hundo/core/progress-state";
import { readRunLog } from "./run-log";
import { THEME_KEY } from "@hundo/core/store/theme";
import { AWAKE_KEY } from "@hundo/core/store/awake";
import { PLACE_KEY } from "@hundo/core/store/place";
import { SYNC_KEY } from "@hundo/core/sync/local";
import { PERSIST_KEY } from "@hundo/core/persistence";
import { COUNTS_KEY } from "@hundo/core/counts";
import { BUILD_ASKED_KEY, BUILD_KEY } from "@hundo/core/store/build";
import { SUMMARY_COOKIE } from "@hundo/core/summary";
import { flatten, viewFrom } from "@hundo/core/sync/fields";
import type { Entries } from "@hundo/core/sync/ledger";
import { targets } from "./config";

const [a] = allRows.map((row) => row.id);

describe("Koholint completion", () => {
  it("cites sources for every chapter", () => {
    for (const chapter of chapters) expect(chapter.sources.length, chapter.title).toBeGreaterThan(0);
  });

  // Two hosts for each game total, and the guide's own lists, whose goals are their rows: docs/facts-to-verify.md. Core's data.test.ts
  // holds each goal to its rows.
  it("pins every target's goal", () => {
    expect(Object.fromEntries(targets.map(({ tag, goal }) => [tag, goal]))).toEqual({
      heart: 32,
      shell: 50,
      treasure: 83,
      trade: 14,
      gear: 24,
      container: 9,
      instrument: 8,
      song: 3,
      bottle: 3,
      figure: 10,
      lure: 2,
      challenge: 24,
      stone: 14,
      warp: 10,
      fairy: 4,
      explore: 5,
      amiibo: 6,
    });
  });

  // The Lightweight Lure is the pond's default, and buying back the item traded for the Boomerang gets back one already counted.
  it("counts neither the default lure nor the bought-back item", () => {
    for (const id of ["lure-light", "buyback"]) expect(allRows.find((row) => row.id === id)?.tags, id).toEqual(["story"]);
  });

  it("keeps the mini-game rewards and chamber effects as filters, each row counted as the item it is", () => {
    for (const tag of ["mini", "effect"]) {
      expect(targets.map((item) => item.tag), tag).not.toContain(tag);
      expect(rowsByTag(tag).length, tag).toBeGreaterThan(0);
      for (const row of rowsByTag(tag)) expect(row.tags.some((entry) => entry !== "amiibo" && targets.some((item) => item.tag === entry)), row.id).toBe(true);
    }
  });

  it("files every chest under Chests, and counts as Treasure Chests only those holding nothing else counted", () => {
    expect(targets.map((item) => item.tag)).not.toContain("chest");
    for (const row of rowsByTag("treasure")) expect(row.tags, row.id).toEqual(["chest", "treasure"]);
    const holding = rowsByTag("chest").filter((row) => !row.tags.includes("treasure"));
    expect(holding.map((row) => row.tags[0]).sort()).toEqual([...Array(8).fill("gear"), ...Array(3).fill("shell")]);
    for (const row of holding) expect(row.tags, row.id).toEqual([row.tags[0], "chest"]);
  });

  it("labels instruments and other route rows by what they award, not as route steps", () => {
    for (const row of allRows) if (row.tags.length > 1) expect(row.tags[0], row.id).not.toBe("story");
    expect(allRows.find((row) => row.id === "tail-cello")?.tags).toEqual(["instrument", "story"]);
  });
});

describe("Koholint saves from before the shared format", () => {
  const v1 = { version: 1, checks: { [a]: true }, ceiling: 3, chapter: 2, spoilers: true, mode: "hero", runs: { normal: { deaths: 2, cleared: true }, hero: { deaths: 0, cleared: false } } };

  it("loads a version 1 save with its run log", () => {
    expect(validateState(v1)).toEqual({ ...defaultState(), checks: { [a]: true }, ceiling: 3, chapter: 2, extra: { mode: "hero", runs: v1.runs } });
  });

  it("reads a chapter number it never had as chapter 1, as it always has", () => {
    expect(validateState({ ...v1, ceiling: 99, chapter: 99 })).toMatchObject({ ceiling: 1, chapter: 1 });
  });

  it("refuses a version 1 file that names a guide", () => {
    expect(() => validateState({ ...v1, guide: "echoes-of-wisdom" })).toThrow();
  });

  it("keeps the run log through export and import", () => {
    const state = validateState(v1);
    expect(validateState(JSON.parse(JSON.stringify(state)))).toEqual(state);
  });
});

describe("run log", () => {
  it("sanitises modes and counts", () => {
    const log = readRunLog({ mode: "weird", runs: { hero: { deaths: -3, cleared: "yes" }, normal: { deaths: 2, cleared: true } } });
    expect(log.mode).toBe("normal");
    expect(log.runs.hero).toEqual({ deaths: 0, cleared: false });
    expect(log.runs.normal).toEqual({ deaths: 2, cleared: true });
    expect(readRunLog(undefined)).toEqual({ mode: "normal", runs: { normal: { deaths: 0, cleared: false }, hero: { deaths: 0, cleared: false } } });
  });
});

describe("storage", () => {
  // Readers' progress and theme live under these keys on this domain: new keys start every reader from nothing.
  it("keeps its storage keys", () => {
    expect(STORAGE_KEY).toBe("koholint-field-guide.v1");
    expect(THEME_KEY).toBe("koholint-field-guide.theme");
    expect(AWAKE_KEY).toBe("koholint-field-guide.awake");
    expect(PLACE_KEY).toBe("koholint-field-guide.place");
    expect(SYNC_KEY).toBe("koholint-field-guide.sync");
    expect(PERSIST_KEY).toBe("koholint-field-guide.persist");
    expect(COUNTS_KEY).toBe("koholint-field-guide.counts");
    expect(BUILD_KEY).toBe("koholint-field-guide.build");
    expect(BUILD_ASKED_KEY).toBe("koholint-field-guide.build-asked");
    // and the cookie hundo.quest reads this guide's progress from (core's summary.ts), set on every hundo.quest host
    expect(SUMMARY_COOKIE).toBe("hundo_p_links-awakening");
  });
});

const entries = (flat: Record<string, unknown>) => Object.fromEntries(Object.entries(flat).map(([key, value]) => [key, [1, value]])) as Entries;

describe("Koholint sync", () => {
  it("syncs the run log leaf by leaf, and rebuilds the same log from them", () => {
    const extra = { mode: "hero" as const, runs: { normal: { deaths: 4, cleared: true }, hero: { deaths: 1, cleared: false } } };
    const flat = flatten({ ...defaultState(), extra });
    expect(Object.keys(flat).filter((key) => key.startsWith("x:")).sort()).toEqual(["x:mode", "x:runs.hero.cleared", "x:runs.hero.deaths", "x:runs.normal.cleared", "x:runs.normal.deaths"]);
    expect(viewFrom(entries(flat), defaultState()).extra).toEqual(extra);
  });

  it("takes one changed leaf from the group and keeps the rest of the log", () => {
    const mine = { ...defaultState(), extra: { mode: "normal" as const, runs: { normal: { deaths: 2, cleared: false }, hero: { deaths: 0, cleared: false } } } };
    expect(viewFrom(entries({ "x:runs.hero.deaths": 5 }), mine).extra).toEqual({ mode: "normal", runs: { normal: { deaths: 2, cleared: false }, hero: { deaths: 5, cleared: false } } });
  });

  it("refuses what is not a run log's, as the guide's own reader does", () => {
    expect(viewFrom(entries({ "x:mode": "godlike", "x:runs.normal.deaths": -3 }), defaultState()).extra).toEqual(defaultState().extra);
  });
});

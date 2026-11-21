import { allRows, chapters, overall, rowsByTag } from "@hundo/core/guide";
import { STORAGE_KEY, validateState } from "@hundo/core/progress-state";
import { THEME_KEY } from "@hundo/core/store/theme";
import { AWAKE_KEY } from "@hundo/core/store/awake";
import { PLACE_KEY } from "@hundo/core/store/place";
import { SYNC_KEY } from "@hundo/core/sync/local";
import { PERSIST_KEY } from "@hundo/core/persistence";
import { COUNTS_KEY } from "@hundo/core/counts";
import { BUILD_ASKED_KEY, BUILD_KEY } from "@hundo/core/store/build";
import { SUMMARY_COOKIE } from "@hundo/core/summary";
import { flatten } from "@hundo/core/sync/fields";
import type { Checks, Row } from "@hundo/core/types";
import config, { targets } from "./config";
import { choices } from "./data/choices";
import { missables } from "./data/missables";
import { questlines } from "./data/questlines";

const [a] = allRows.map((row) => row.id);
const tick = (rows: Row[]): Checks => Object.fromEntries(rows.map((row) => [row.id, true]));

describe("Silksong completion", () => {
  it("cites sources for every chapter", () => {
    for (const chapter of chapters) expect(chapter.sources.length, chapter.title).toBeGreaterThan(0);
  });

  it("gives every entry directions", () => {
    for (const row of allRows) expect(row.text.trim(), row.id).not.toBe("");
  });

  it("counts the game's own 100 in its first eleven targets: 51 tools, the upgrades, 20 shards and 18 fragments", () => {
    const game = targets.slice(0, 11).map(({ tag, goal }) => [tag, goal]);
    expect(Object.fromEntries(game)).toEqual({ tool: 51, skill: 6, kit: 4, pouch: 4, "silk-heart": 3, crest: 6, ability: 7, "mask-shard": 20, "spool-fragment": 18, needle: 4, item: 1 });
    const per = { "mask-shard": 4, "spool-fragment": 2 } as Record<string, number>;
    expect(targets.slice(0, 11).reduce((sum, { tag, goal }) => sum + goal / (per[tag] ?? 1), 0)).toBe(100);
  });

  // Both ways of the one-way choice count: the first save's, recommended, and the second save's in the last chapter, A Second Save,
  // beside the boss only Steel Soul has. So 100% takes two saves, and nothing else waits for the second.
  it("counts both ways of its one-way choice and the Steel Soul boss, the second save's two in the last chapter", () => {
    expect(choices.map((choice) => [choice.row, choice.later.map((later) => later.row)])).toEqual([["wish-broodfeast", ["wish-runtfeast"]]]);
    expect(chapters.at(-1)?.title).toBe("A Second Save");
    expect(allRows.filter((row) => row.chapter === chapters.length).map((row) => row.id).sort()).toEqual(["boss-summoned-saviour", "wish-runtfeast"]);
  });

  it("pins the guide's own lists, whose goals are their rows", () => {
    expect(Object.fromEntries(targets.filter(({ list }) => list === "guide").map(({ tag, goal }) => [tag, goal]))).toEqual({ pickup: 13, wish: 79, boss: 41, challenge: 8 });
  });

  it("weighs a flea like a tool", () => {
    const [flea] = rowsByTag("flea");
    const [tool] = rowsByTag("tool");
    expect(overall(tick(allRows.filter((row) => row !== flea))).percent).toBe(overall(tick(allRows.filter((row) => row !== tool))).percent);
  });
});

// The game's last act is a spoiler: a first visit sees chapter 1, the rail's teasers and the Progress page, and each chapter shows once revealed.
describe("Silksong spoilers", () => {
  const act = /act\s*(3|three|iii)\b|third act|final act|last act|act changes|after the shift/i;
  const words = (chapter: (typeof chapters)[number]) => [
    chapter.title,
    chapter.region,
    chapter.intro,
    chapter.teaser ?? "",
    ...chapter.groups.flatMap((group) => [group.title, group.location ?? "", group.note ?? "", ...group.rows.flatMap((row) => [row.title, row.text])]),
  ];

  it("never names the last act in chapters 1 to 8", () => {
    for (const chapter of chapters.slice(0, 8)) for (const text of words(chapter)) expect(text, `chapter ${chapter.id}`).not.toMatch(act);
  });

  it("names it in chapter 9 only in its last group, the point of no return", () => {
    const nine = chapters[8];
    const early = { ...nine, groups: nine.groups.slice(0, -1) };
    for (const text of words(early)) expect(text).not.toMatch(act);
  });

  it("teases chapters 10 to 12 as late game, and the second save as itself", () => {
    expect(chapters.slice(9).map((chapter) => chapter.teaser)).toEqual(["Late game", "Late game", "Late game", "Second save"]);
  });

  // A choice's block shows in its own chapter: its name, its why, and each later way's title and playthrough. None names the last
  // act, or Runt, whose Wish the later way is: that would tell chapter 9 how the Huntress's story ends.
  it("keeps the one-way choice's block clear of the last act and of Runt", () => {
    for (const choice of choices) {
      const shown = [choice.name, choice.why, ...choice.later.flatMap((later) => [later.on, allRows.find((row) => row.id === later.row)?.title ?? ""])];
      for (const text of shown) expect(text, choice.row).not.toMatch(act);
      for (const text of shown) expect(text, choice.row).not.toMatch(/\brunt/i);
    }
  });

  it("keeps the missables' lines, the questline names and the Progress page's words clear of the last act", () => {
    for (const { id, why } of missables) expect(why, id).not.toMatch(act);
    for (const line of questlines.lines) expect(line.name, line.id).not.toMatch(act);
    expect(`${questlines.tab} ${questlines.title} ${questlines.intro}`).not.toMatch(act);
    for (const [key, text] of Object.entries(config.text)) expect(text, key).not.toMatch(act);
    for (const [tag, [plural, singular]] of Object.entries(config.categories)) expect(`${plural} ${singular}`, tag).not.toMatch(/everbloom|epilogue|act\s*3/i);
    expect(`${config.text.boardNote} ${config.text.dashboardIntro}`).not.toMatch(/everbloom|farsight|93|act\s*3|last act/i);
  });
});

describe("achievements", () => {
  // Silksong keeps its own list, so a reader sees its achievements: on Switch and Switch 2, which have none, the game records them
  // itself, as Feats (facts-to-verify.md). The guide tracks one, Completion, a challenge.
  it("shows the game's own achievements, backed by their sources", () => {
    expect(config.achievements?.sources.length).toBeGreaterThanOrEqual(2);
    expect(allRows.filter((row) => /achievement/i.test(`${row.title} ${row.text}`)).map((row) => row.id)).toEqual(["challenge-completion-achievement"]);
  });
});

describe("storage", () => {
  // Readers' progress, theme and sync ledger live under these keys on this domain: new keys start every reader from nothing.
  it("keeps its storage keys", () => {
    expect(STORAGE_KEY).toBe("hundo-pharloom.v1");
    expect(THEME_KEY).toBe("hundo-pharloom.theme");
    expect(AWAKE_KEY).toBe("hundo-pharloom.awake");
    expect(PLACE_KEY).toBe("hundo-pharloom.place");
    expect(SYNC_KEY).toBe("hundo-pharloom.sync");
    expect(PERSIST_KEY).toBe("hundo-pharloom.persist");
    expect(COUNTS_KEY).toBe("hundo-pharloom.counts");
    expect(BUILD_KEY).toBe("hundo-pharloom.build");
    expect(BUILD_ASKED_KEY).toBe("hundo-pharloom.build-asked");
    // and the cookie hundo.quest reads this guide's progress from (core's summary.ts), set on every hundo.quest host
    expect(SUMMARY_COOKIE).toBe("hundo_p_silksong");
  });
});

describe("Pharloom sync", () => {
  it("has no state of its own to sync beyond the shared fields", () => {
    expect(Object.keys(flatten(validateState({ version: 3, guide: "silksong", checks: { [a]: true }, ceiling: 2, chapter: 2, spoilers: true }))).sort()).toEqual([`c:${a}`, "ceiling", "chapter", "spoilers"].sort());
  });
});

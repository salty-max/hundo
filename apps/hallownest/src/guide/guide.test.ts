import { allRows, chapters, overall, rowsByTag, whatsLeft } from "@hundo/core/guide";
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
import { FULL, gamePoints } from "./points";

const [a] = allRows.map((row) => row.id);
const tick = (rows: Row[]): Checks => Object.fromEntries(rows.map((row) => [row.id, true]));
const without = (rows: Row[], left: Row) => tick(rows.filter((row) => row !== left));
// The sixteen targets that are the game's own 112%, and the rows that carry one of them. Everything else on the board counts here too.
const gameTags = [
  "charm", "percent-boss", "equipment", "warrior-dream", "spell", "forge", "mask-shard", "vessel-fragment",
  "nail-art", "dreamer", "dream-milestone", "trial", "troupe-boss", "troupe-finale", "godtuner", "pantheon",
];
const beyondTags = targets.map((target) => target.tag).filter((tag) => !gameTags.includes(tag));
const gameRows = allRows.filter((row) => row.tags.some((tag) => gameTags.includes(tag)));
const goals = targets.reduce((sum, target) => sum + target.goal, 0);

describe("Hollow Knight completion", () => {
  it("cites sources for every chapter", () => {
    for (const chapter of chapters) expect(chapter.sources.length, chapter.title).toBeGreaterThan(0);
  });

  it("gives every entry directions", () => {
    for (const row of allRows) expect(row.text.trim(), row.id).not.toBe("");
  });

  it("counts the game's sixteen and the rest", () => {
    expect(gameTags.every((tag) => targets.some((target) => target.tag === tag))).toBe(true);
    for (const tag of ["grub", "notch", "pale-ore", "map", "stag", "root", "simple-key", "ending", "dream-boss", "other-boss", "pickup", "challenge", "achievement", "quest"]) {
      expect(beyondTags, tag).toContain(tag);
    }
  });

  // One each, and stricter than core's rule: no row counts under two targets, game lists included (a quest step that is also a charm, a
  // boss or a nail upgrade counts as that).
  it("counts every row under at most one target", () => {
    for (const row of allRows) expect(row.tags.filter((tag) => targets.some((target) => target.tag === tag)), row.id).toHaveLength(row.tags.some((tag) => targets.some((target) => target.tag === tag)) ? 1 : 0);
    for (const id of ["charm-grimmchild", "boss-troupe-master-grimm", "troupe-finale-grimm-finale", "quest-city-nailsmith"]) expect(rowsByTag("quest").map((row) => row.id), id).not.toContain(id);
  });

  // Both ways of the one-way choice count: the first save's, recommended, and the second save's, in its own chapter at the end.
  it("counts both ways of its one-way choice, the later one in A Second Save", () => {
    expect(choices.map((choice) => [choice.row, choice.later.map((later) => later.row)])).toEqual([["quest-nailsmith-sheo", ["quest-nailsmith-purity"]]]);
    for (const id of ["quest-nailsmith-sheo", "quest-nailsmith-purity"]) expect(rowsByTag("quest").map((row) => row.id), id).toContain(id);
    expect(allRows.find((row) => row.id === "quest-nailsmith-purity")?.chapter).toBe(chapters.length);
  });

  // 100% is every target, each item once, so all the game counts is not enough: the rest counts too.
  it("reads under 100 with only the game's sixteen ticked", () => {
    expect(overall(tick(gameRows)).percent).toBeLessThan(100);
    expect(whatsLeft(tick(gameRows)).length).toBeGreaterThan(0);
  });

  it("reads under 100 with one Grub missing, and says it is the Grub that is left", () => {
    const [grub] = rowsByTag("grub");
    expect(overall(without(allRows, grub)).percent).toBe(Math.floor(((goals - 1) * 100) / goals));
    expect(overall(without(allRows, grub)).percent).toBeLessThan(100);
    expect(whatsLeft(without(allRows, grub))).toEqual([{ tag: "grub", total: 46, left: 1 }]);
  });

  it("counts each item once, whatever the game weighs it at, rounded down", () => {
    // 24 Grubs and 24 charms are the same share of the board, and three Mask Shards count though the game's own count holds them back.
    const share = Math.floor((24 * 100) / goals);
    expect(overall(tick(rowsByTag("grub").slice(0, 24))).percent).toBe(share);
    expect(overall(tick(rowsByTag("charm").slice(0, 24))).percent).toBe(share);
    expect(overall(tick(rowsByTag("equipment"))).percent).toBe(Math.floor((7 * 100) / goals));
    expect(overall(tick(rowsByTag("mask-shard").slice(0, 3))).percent).toBe(Math.floor((3 * 100) / goals));
    expect(overall(tick(rowsByTag("charm").slice(0, 1))).percent).toBe(0);
  });

  // The panel's figure: the save's own, the game's points over its 112 (it is not the bar's).
  it("adds up to the game's 112% with every row the game counts, and to nothing with the rest", () => {
    expect(gamePoints(tick(allRows), allRows)).toBe(FULL);
    expect(gamePoints(tick(gameRows), allRows)).toBe(FULL);
    expect(gamePoints(tick(allRows.filter((row) => !gameRows.includes(row))), allRows)).toBe(0);
  });

  it("counts Mask Shards by the mask and Vessel Fragments by the vessel, and equipment twice", () => {
    expect(gamePoints(tick(rowsByTag("mask-shard").slice(0, 3)), allRows)).toBe(0);
    expect(gamePoints(tick(rowsByTag("mask-shard").slice(0, 4)), allRows)).toBe(1);
    expect(gamePoints(tick(rowsByTag("mask-shard")), allRows)).toBe(4);
    expect(gamePoints(tick(rowsByTag("vessel-fragment").slice(0, 2)), allRows)).toBe(0);
    expect(gamePoints(tick(rowsByTag("vessel-fragment")), allRows)).toBe(3);
    expect(gamePoints(tick(rowsByTag("equipment").slice(0, 1)), allRows)).toBe(2);
    // (55 of 112: the 40 charms and the 15 bosses the game counts)
    const halfway = allRows.filter((row) => row.tags.includes("charm")).concat(rowsByTag("percent-boss"));
    expect(gamePoints(tick(halfway), allRows)).toBe(55);
  });

  it("reads the game's count from the first sixteen targets only", () => {
    // (every one of the sixteen earns points, and a row of the rest that carries none of them adds nothing)
    for (const tag of gameTags) expect(gamePoints(tick(rowsByTag(tag)), allRows), tag).toBeGreaterThan(0);
    for (const tag of beyondTags) expect(gamePoints(tick(rowsByTag(tag).filter((row) => !gameRows.includes(row))), allRows), tag).toBe(0);
  });
});

describe("achievements", () => {
  // Hollow Knight keeps its own list, so a reader sees its achievements: on Switch, which has none, the game shows them as Feats
  // (facts-to-verify.md). The guide tracks one, Pure Completion, which every platform's list has.
  it("shows the game's own achievements, backed by their sources", () => {
    expect(config.achievements?.sources.length).toBeGreaterThanOrEqual(2);
    expect(rowsByTag("achievement").map((row) => row.id)).toEqual(["achievement-pure-completion"]);
  });
});

describe("storage", () => {
  // Readers' progress, theme and sync ledger live under these keys on this domain: new keys start every reader from nothing.
  it("keeps its storage keys", () => {
    expect(STORAGE_KEY).toBe("hundo-hallownest.v1");
    expect(THEME_KEY).toBe("hundo-hallownest.theme");
    expect(AWAKE_KEY).toBe("hundo-hallownest.awake");
    expect(PLACE_KEY).toBe("hundo-hallownest.place");
    expect(SYNC_KEY).toBe("hundo-hallownest.sync");
    expect(PERSIST_KEY).toBe("hundo-hallownest.persist");
    expect(COUNTS_KEY).toBe("hundo-hallownest.counts");
    expect(BUILD_KEY).toBe("hundo-hallownest.build");
    expect(BUILD_ASKED_KEY).toBe("hundo-hallownest.build-asked");
    // and the cookie hundo.quest reads this guide's progress from (core's summary.ts), set on every hundo.quest host
    expect(SUMMARY_COOKIE).toBe("hundo_p_hollow-knight");
  });
});

describe("Hallownest sync", () => {
  it("has no state of its own to sync beyond the shared fields", () => {
    expect(Object.keys(flatten(validateState({ version: 3, guide: "hollow-knight", checks: { [a]: true }, ceiling: 2, chapter: 2, spoilers: true }))).sort()).toEqual([`c:${a}`, "ceiling", "chapter", "spoilers"].sort());
  });
});

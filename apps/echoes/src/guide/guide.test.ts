import { allRows, chapters, rowsByTag, tally } from "@hundo/core/guide";
import { STORAGE_KEY, validateState } from "@hundo/core/progress-state";
import { targets } from "./config";
import { THEME_KEY } from "@hundo/core/store/theme";
import { AWAKE_KEY } from "@hundo/core/store/awake";
import { PLACE_KEY } from "@hundo/core/store/place";
import { SYNC_KEY } from "@hundo/core/sync/local";
import { PERSIST_KEY } from "@hundo/core/persistence";
import { COUNTS_KEY } from "@hundo/core/counts";
import { BUILD_ASKED_KEY, BUILD_KEY } from "@hundo/core/store/build";
import { SUMMARY_COOKIE } from "@hundo/core/summary";
import { flatten } from "@hundo/core/sync/fields";
import type { Row } from "@hundo/core/types";

const [a] = allRows.map((row) => row.id);

describe("Echoes of Wisdom completion", () => {
  it("cites sources for every chapter", () => {
    for (const chapter of chapters) expect(chapter.sources.length, chapter.title).toBeGreaterThan(0);
  });

  it("gives every entry directions", () => {
    for (const row of allRows) expect(row.text.trim(), row.id).not.toBe("");
  });

  it("counts Might Crystals by what each entry awards", () => {
    const all = Object.fromEntries(allRows.map((row) => [row.id, true as const]));
    expect(tally("might-crystal", all)).toEqual({ done: 150, total: 150 });
    expect(rowsByTag("might-crystal").some((row) => row.quantity > 1)).toBe(true);
  });

  // The game keeps no count of Waypoints (no counter, percentage or reward), so the guide's own list is the goal: 17 overworld ones and
  // 26 inside dungeons, each one item. A dungeon Waypoint names its kind first and carries `waypoint` after it, so one tag counts both.
  it("counts every Waypoint once, as the guide's own list of 43", () => {
    const dungeon = rowsByTag("dungeon-waypoint");
    expect(targets.find((target) => target.tag === "waypoint")?.goal).toBe(43);
    expect(rowsByTag("waypoint")).toHaveLength(43);
    expect(dungeon).toHaveLength(26);
    for (const row of dungeon) expect(row.tags, row.id).toEqual(["dungeon-waypoint", "waypoint"]);
    expect(rowsByTag("waypoint").filter((row) => !dungeon.includes(row)).every((row) => row.tags.length === 1)).toBe(true);
  });

  it("splits chests into dungeon, mini-dungeon and overworld ones", () => {
    expect(rowsByTag("chest").length).toBeGreaterThan(rowsByTag("dungeon-chest").length + rowsByTag("mini-dungeon-chest").length);
    for (const row of rowsByTag("dungeon-chest")) expect(row.tags).toContain("chest");
    // (one second tag names the overworld ones, so a dungeon chest isn't a chest and a dungeon chest both)
    const overworld = rowsByTag("chest").filter((row) => !row.tags.includes("dungeon-chest") && !row.tags.includes("mini-dungeon-chest"));
    // (a chest that awards a bottle, crystals or an accessory counts as that, once: eight overworld ones, and two inside dungeons that carry
    // neither the dungeon tag nor the overworld one, since the dungeon chests are the guide's own list and not a game total)
    const counted = (row: Row) => row.tags.filter((tag) => targets.some((target) => target.tag === tag && tag !== "overworld-chest")).length;
    expect(rowsByTag("overworld-chest").map((row) => row.id)).toEqual(overworld.filter((row) => counted(row) === 0).map((row) => row.id));
    expect(overworld.length - rowsByTag("overworld-chest").length).toBe(10);
    for (const id of ["chest-suthorn-ruins-heart-pin", "chest-castle-frog-ring"]) {
      const row = rowsByTag("accessory").find((candidate) => candidate.id === id)!;
      expect(row.tags, id).toEqual(["chest", "accessory"]);
    }
  });

  it("counts a minigame entry once: only those that award nothing the board counts already carry the minigame target", () => {
    const others = targets.map((target) => target.tag).filter((tag) => tag !== "minigame-extra");
    const extra = rowsByTag("minigame").filter((row) => !row.tags.some((tag) => others.includes(tag)));
    expect(rowsByTag("minigame-extra").map((row) => row.id)).toEqual(extra.map((row) => row.id));
    expect(rowsByTag("minigame").length).toBeGreaterThan(rowsByTag("minigame-extra").length);
  });
});

describe("Echoes of Wisdom saves from before the shared format", () => {
  const v1 = { version: 1, guide: "echoes-of-wisdom", checks: { [a]: true }, ceiling: 4, chapter: 3, spoilers: false };

  it("loads a version 1 save as is", () => {
    expect(validateState(v1)).toEqual({ version: 3, guide: "echoes-of-wisdom", checks: { [a]: true }, ceiling: 4, chapter: 3, spoilers: false, extra: undefined });
  });

  it("refuses other guides' and unknown versions", () => {
    for (const bad of [{ ...v1, version: 2 }, { ...v1, guide: "red-dead-redemption" }, { ...v1, guide: undefined }]) expect(() => validateState(bad)).toThrow();
  });
});

describe("storage", () => {
  // Readers' progress and theme live under these keys on this domain: new keys start every reader from nothing.
  it("keeps its storage keys", () => {
    expect(STORAGE_KEY).toBe("echoes-of-wisdom-field-guide.v1");
    expect(THEME_KEY).toBe("echoes-of-wisdom-field-guide.theme");
    expect(AWAKE_KEY).toBe("echoes-of-wisdom-field-guide.awake");
    expect(PLACE_KEY).toBe("echoes-of-wisdom-field-guide.place");
    expect(SYNC_KEY).toBe("echoes-of-wisdom-field-guide.sync");
    expect(PERSIST_KEY).toBe("echoes-of-wisdom-field-guide.persist");
    expect(COUNTS_KEY).toBe("echoes-of-wisdom-field-guide.counts");
    expect(BUILD_KEY).toBe("echoes-of-wisdom-field-guide.build");
    expect(BUILD_ASKED_KEY).toBe("echoes-of-wisdom-field-guide.build-asked");
    // and the cookie hundo.quest reads this guide's progress from (core's summary.ts), set on every hundo.quest host
    expect(SUMMARY_COOKIE).toBe("hundo_p_echoes-of-wisdom");
  });
});

describe("Echoes sync", () => {
  it("has no state of its own to sync beyond the shared fields", () => {
    expect(Object.keys(flatten(validateState({ version: 3, guide: "echoes-of-wisdom", checks: { [a]: true }, ceiling: 2, chapter: 2, spoilers: true }))).sort()).toEqual([`c:${a}`, "ceiling", "chapter", "spoilers"].sort());
  });
});

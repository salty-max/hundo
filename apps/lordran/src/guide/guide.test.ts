import { allRows, chapters, rowsByTag } from "@hundo/core/guide";
import { STORAGE_KEY, validateState } from "@hundo/core/progress-state";
import config, { targets } from "./config";
import { readerText } from "@hundo/core/reader-text";
import { choices } from "./data/choices";
import { missables } from "./data/missables";
import { THEME_KEY } from "@hundo/core/store/theme";
import { AWAKE_KEY } from "@hundo/core/store/awake";
import { PLACE_KEY } from "@hundo/core/store/place";
import { SYNC_KEY } from "@hundo/core/sync/local";
import { PERSIST_KEY } from "@hundo/core/persistence";
import { COUNTS_KEY } from "@hundo/core/counts";
import { BUILD_ASKED_KEY, BUILD_KEY } from "@hundo/core/store/build";
import { SUMMARY_COOKIE } from "@hundo/core/summary";
import { flatten } from "@hundo/core/sync/fields";

const [a] = allRows.map((row) => row.id);

describe("Dark Souls Remastered completion", () => {
  it("cites sources for every chapter", () => {
    for (const chapter of chapters) expect(chapter.sources.length, chapter.title).toBeGreaterThan(0);
  });

  it("gives every entry directions", () => {
    for (const row of allRows) expect(row.text.trim(), row.id).not.toBe("");
  });

  // One each, and stricter than core's rule: no row counts under two targets, game lists included, so Snuggly's trades (the game's 20)
  // count 18, less the spell and the slab that count as their own kind.
  it("counts every row under at most one target", () => {
    for (const row of allRows) expect(row.tags.filter((tag) => targets.some((target) => target.tag === tag)).length, row.id).toBeLessThanOrEqual(1);
  });

  it("counts Snuggly's trades without the how-to row, the slabs the guide sends you to without the farming row, and three rows as their own kind", () => {
    for (const [id, tag] of [["sorcery-pursuers", "dlc-spell"], ["forge-snuggly-red-slab", "forge"], ["extra-laurentius-goodbye", "quest"]] as const) {
      expect(targets.filter((target) => rowsByTag(target.tag).some((row) => row.id === id)).map((target) => target.tag), id).toEqual([tag]);
    }
    expect(rowsByTag("trade").some((row) => row.id === "trade-snuggly-how")).toBe(false);
    expect(rowsByTag("forge").some((row) => row.id === "forge-kiln-farm")).toBe(false);
  });

  // Both ways of every one-way choice count: the first cycle's, recommended, and the later cycle's, so 100% takes NG+ and NG++ as the endings do.
  it("counts both ways of every one-way choice, the later one in chapter 13", () => {
    for (const choice of choices) for (const later of choice.later) expect(allRows.find((entry) => entry.id === later.row)!.chapter, later.row).toBe(13);
    expect(choices.map((choice) => choice.row).sort()).toEqual(["quest-ciaran", "quest-lautrec-invasion", "quest-lordvessel-frampt", "quest-patches-forgive", "quest-sieg-ash", "quest-solaire-shortcut"]);
    // Where the other way only yields an item, the item's own row is the later way, so the item counts once (19 Nov 2026).
    const laterOf = (row: string) => choices.find((choice) => choice.row === row)!.later.map((later) => later.row);
    expect(laterOf("quest-sieg-ash")).toEqual(["ring-speckled-stoneplate"]);
    expect(laterOf("quest-ciaran")).toEqual(["dlc-abyss-greatsword"]);
    // A recommended way is the choice's own row, so where it only yields items it counts them, and their rows are directions: Ciaran's
    // trade counts the two Tracers it gives (the user's decision, 19 Nov 2026).
    for (const id of ["dlc-gear-gold-tracer", "dlc-gear-dark-silver-tracer"]) expect(allRows.find((row) => row.id === id)?.tags[0], id).toBe("route");
  });

  // An item a later cycle gives counts once, in chapter 13, so no first-playthrough chapter sends a reader after it, and a later cycle's
  // step that only repeats something or yields an item its own row counts is a route step (decided 19 Nov 2026).
  it("counts each later cycle's item once, in chapter 13, and its steps as directions", () => {
    const laterItems = ["ring-leo", "ring-speckled-stoneplate", "rare-weapon-dragonslayer-spear", "rare-weapon-crystal-ring-shield", "rare-weapon-chaos-blade", "rare-weapon-dragon-bone-fist", "rare-weapon-artorias-sword-cursed", "rare-weapon-tin-darkmoon-catalyst", "rare-weapon-artorias-greatshield", "rare-weapon-great-lord-greatsword", "dlc-abyss-greatsword", "dlc-manus-catalyst"];
    for (const id of laterItems) expect(allRows.find((row) => row.id === id)?.chapter, id).toBe(13);
    const steps = ["cycle-ng-plus-bells", "cycle-ng-plus-anor", "cycle-ng-plus-sif", "cycle-ng-plus-gwyndolin", "cycle-ng-plus-dlc", "cycle-ng-plus-lords", "cycle-ng-plus-siegmeyer", "cycle-ng-plus-shiva", "cycle-ng-plus-plus-route", "cycle-ng-plus-plus-forge"];
    for (const id of steps) expect(allRows.find((row) => row.id === id)?.tags[0], id).toBe("route");
    // What's left on the later cycles' own list is the other way at four one-way choices.
    const laterWays = choices.flatMap((choice) => choice.later.map((later) => later.row));
    expect(rowsByTag("cycle").map((row) => row.id).sort()).toEqual(["cycle-ng-plus-lautrec", "cycle-ng-plus-patches", "cycle-ng-plus-plus-kaathe", "cycle-ng-plus-solaire"]);
    for (const row of rowsByTag("cycle")) expect(laterWays, row.id).toContain(row.id);
  });

  it("counts the base game's spells apart from the expansion's", () => {
    for (const row of rowsByTag("base-sorcery")) expect(row.tags, row.id).toContain("sorcery");
    for (const row of rowsByTag("base-pyromancy")) expect(row.tags, row.id).toContain("pyromancy");
    for (const row of rowsByTag("dlc-spell")) {
      expect(row.tags.some((tag) => tag.startsWith("base-")), row.id).toBe(false);
      expect(row.tags.some((tag) => tag === "sorcery" || tag === "pyromancy" || tag === "miracle"), row.id).toBe(true);
    }
  });

  // Dark Souls Remastered keeps no achievement list of its own (facts-to-verify.md). Steam's list checked the data for gaps, so no
  // reader sees an achievement, a target of them or one's name: Knight's Honor (Steam's name for the 47 rare weapons) and the three
  // spell sets' were row titles until 19 Nov 2026. The Dark Soul isn't here: it is the game's own lore too.
  it("shows no achievement: no target, no category, no name of one", () => {
    expect(config.achievements).toBeUndefined();
    expect(targets.some((target) => target.tag === "achievement")).toBe(false);
    expect(Object.keys(config.categories)).not.toContain("achievement");
    expect(readerText(config).filter(([, text]) => /achievement|Knight.s Honor|Wisdom of a Sage|Bond of a Pyromancer|Prayer of a Maiden/i.test(text))).toEqual([]);
  });

  // The README and the Don't miss strip are written for these 18 (Solaire's became a one-way choice, which Don't miss lists too).
  it("keeps the 18 missables the route was checked with", () => {
    expect(missables).toHaveLength(18);
  });
});

describe("storage", () => {
  // Readers' progress, theme and sync ledger live under these keys on this domain: new keys start every reader from nothing.
  it("keeps its storage keys", () => {
    expect(STORAGE_KEY).toBe("hundo-lordran.v1");
    expect(THEME_KEY).toBe("hundo-lordran.theme");
    expect(AWAKE_KEY).toBe("hundo-lordran.awake");
    expect(PLACE_KEY).toBe("hundo-lordran.place");
    expect(SYNC_KEY).toBe("hundo-lordran.sync");
    expect(PERSIST_KEY).toBe("hundo-lordran.persist");
    expect(COUNTS_KEY).toBe("hundo-lordran.counts");
    expect(BUILD_KEY).toBe("hundo-lordran.build");
    expect(BUILD_ASKED_KEY).toBe("hundo-lordran.build-asked");
    // and the cookie hundo.quest reads this guide's progress from (core's summary.ts), set on every hundo.quest host
    expect(SUMMARY_COOKIE).toBe("hundo_p_dark-souls-remastered");
  });
});

describe("Lordran builds", () => {
  // A reader's pick saves these ids (core's store/build.ts): a changed id drops it from every pick.
  it("keeps its leaning ids", () => {
    expect(config.builds?.leanings.map(({ id, label }) => `${id} ${label}`)).toEqual(["str Strength", "dex Dexterity", "int Intelligence", "fth Faith", "pyro Pyromancy", "hum Humanity"]);
  });
});

describe("Lordran sync", () => {
  it("has no state of its own to sync beyond the shared fields", () => {
    expect(Object.keys(flatten(validateState({ version: 3, guide: "dark-souls-remastered", checks: { [a]: true }, ceiling: 2, chapter: 2, spoilers: true }))).sort()).toEqual([`c:${a}`, "ceiling", "chapter", "spoilers"].sort());
  });
});

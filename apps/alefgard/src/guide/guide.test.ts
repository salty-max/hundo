import { allRows, chapters, rowsByTag } from "@hundo/core/guide";
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
import { brand } from "./brand";
import { targets } from "./config";

const [a] = allRows.map((row) => row.id);

// The game's fixed lists, each total on two hosts (facts-to-verify.md names them). Wild Side and Meditation are both prizes and scrolls.
const GAME = { "mini-medal": 40, "medal-prize": 13, scroll: 22, "secret-spot": 15, sigil: 5, recipe: 8 };

describe("Dragon Quest I completion", () => {
  it("cites sources for every chapter, and gives every row directions", () => {
    for (const chapter of chapters) expect(chapter.sources.length, chapter.title).toBeGreaterThan(0);
    for (const row of allRows) expect(row.text.trim(), row.id).not.toBe("");
  });

  it("counts the game's own lists at their totals", () => {
    for (const [tag, total] of Object.entries(GAME)) {
      expect(targets.find((target) => target.tag === tag)?.goal, tag).toBe(total);
      expect(rowsByTag(tag), tag).toHaveLength(total);
    }
  });

  it("keeps the ending that needs a second save off the bar", () => {
    expect(rowsByTag("outside").map((row) => row.id)).toEqual(["ending-carry-gwaelin"]);
    expect(rowsByTag("ending").map((row) => row.id).sort()).toEqual(["ending-dragonlord", "ending-dragonlords-offer"]);
  });

  it("keeps the guide's id, which backups and the sync API name it by", () => {
    expect(brand.id).toBe("dragon-quest-i-hd-2d");
  });
});

describe("storage", () => {
  // Readers' progress, theme and sync ledger live under these keys on this domain: new keys start every reader from nothing.
  it("keeps its storage keys", () => {
    expect(STORAGE_KEY).toBe("hundo-alefgard.v1");
    expect(THEME_KEY).toBe("hundo-alefgard.theme");
    expect(AWAKE_KEY).toBe("hundo-alefgard.awake");
    expect(PLACE_KEY).toBe("hundo-alefgard.place");
    expect(SYNC_KEY).toBe("hundo-alefgard.sync");
    expect(PERSIST_KEY).toBe("hundo-alefgard.persist");
    expect(COUNTS_KEY).toBe("hundo-alefgard.counts");
    expect(BUILD_KEY).toBe("hundo-alefgard.build");
    expect(BUILD_ASKED_KEY).toBe("hundo-alefgard.build-asked");
    // and the cookie hundo.quest reads this guide's progress from (core's summary.ts), set on every hundo.quest host
    expect(SUMMARY_COOKIE).toBe("hundo_p_dragon-quest-i-hd-2d");
  });
});

describe("Alefgard sync", () => {
  it("has no state of its own to sync beyond the shared fields", () => {
    expect(Object.keys(flatten(validateState({ version: 3, guide: "dragon-quest-i-hd-2d", checks: { [a]: true }, ceiling: 2, chapter: 2, spoilers: true }))).sort()).toEqual([`c:${a}`, "ceiling", "chapter", "spoilers"].sort());
  });
});

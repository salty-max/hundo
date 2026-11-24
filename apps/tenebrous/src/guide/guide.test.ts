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

// The game's 282 collectibles (100% Guides lists them all; NiaMeowDB's checklist agrees on every total but the Bonestones, where its
// list says it is partial): facts-to-verify.md names the hosts of each.
const GAME = { trinket: 60, kear: 50, bonestone: 111, "vial-pouch": 7, "health-rose": 10, "trinket-bag": 5, "joule-box": 8, "spark-container": 3, angling: 3, fish: 16, underlab: 9 };

describe("Mina the Hollower completion", () => {
  it("cites sources for every chapter, and gives every row directions", () => {
    for (const chapter of chapters) expect(chapter.sources.length, chapter.title).toBeGreaterThan(0);
    for (const row of allRows) expect(row.text.trim(), row.id).not.toBe("");
  });

  it("counts the game's 282 collectibles", () => {
    for (const [tag, total] of Object.entries(GAME)) {
      expect(targets.find((target) => target.tag === tag)?.goal, tag).toBe(total);
      expect(rowsByTag(tag), tag).toHaveLength(total);
    }
    expect(Object.values(GAME).reduce((sum, n) => sum + n, 0)).toBe(282);
  });

  it("keeps the guide's id, which backups and the sync API name it by", () => {
    expect(brand.id).toBe("mina-the-hollower");
  });
});

describe("storage", () => {
  // Readers' progress, theme and sync ledger live under these keys on this domain: new keys start every reader from nothing.
  it("keeps its storage keys", () => {
    expect(STORAGE_KEY).toBe("hundo-tenebrous.v1");
    expect(THEME_KEY).toBe("hundo-tenebrous.theme");
    expect(AWAKE_KEY).toBe("hundo-tenebrous.awake");
    expect(PLACE_KEY).toBe("hundo-tenebrous.place");
    expect(SYNC_KEY).toBe("hundo-tenebrous.sync");
    expect(PERSIST_KEY).toBe("hundo-tenebrous.persist");
    expect(COUNTS_KEY).toBe("hundo-tenebrous.counts");
    expect(BUILD_KEY).toBe("hundo-tenebrous.build");
    expect(BUILD_ASKED_KEY).toBe("hundo-tenebrous.build-asked");
    // and the cookie hundo.quest reads this guide's progress from (core's summary.ts), set on every hundo.quest host
    expect(SUMMARY_COOKIE).toBe("hundo_p_mina-the-hollower");
  });
});

describe("Tenebrous sync", () => {
  it("has no state of its own to sync beyond the shared fields", () => {
    expect(Object.keys(flatten(validateState({ version: 3, guide: "mina-the-hollower", checks: { [a]: true }, ceiling: 2, chapter: 2, spoilers: true }))).sort()).toEqual([`c:${a}`, "ceiling", "chapter", "spoilers"].sort());
  });
});

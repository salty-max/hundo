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
const BOSSES = ["heart", "isaac", "bluebaby", "satan", "lamb", "bossrush", "hush", "megasatan", "greedier", "delirium", "mother", "beast"];

describe("The Binding of Isaac completion", () => {
  it("cites sources for every chapter, and gives every row directions", () => {
    for (const chapter of chapters) expect(chapter.sources.length, chapter.title).toBeGreaterThan(0);
    for (const row of allRows) expect(row.text.trim(), row.id).not.toBe("");
  });

  // The game's two lists (facts-to-verify.md names the hosts): 641 secrets on Repentance+ (637 on Repentance, plus four), and twelve
  // Hard marks on each of the 34 characters' notes.
  it("counts the 641 secrets and the 408 Hard marks", () => {
    expect(targets.find((target) => target.tag === "secret")?.goal).toBe(641);
    expect(rowsByTag("secret")).toHaveLength(641);
    for (const boss of BOSSES) {
      expect(targets.find((target) => target.tag === `mark-${boss}`)?.goal, boss).toBe(34);
      expect(rowsByTag(`mark-${boss}`), boss).toHaveLength(34);
    }
    expect(targets).toHaveLength(13);
  });

  // A Normal win gives a mark's unlock without the mark, so a mark row ticks a secret only where the Hard mark itself earns it: the Hard
  // Mom's Heart unlocks (17: fifteen babies, Smelter and Marrow) and the Greedier unlocks (34). Splitting a combined row once live would retire its id.
  it("ticks a secret on a mark row only where the Hard mark itself earns it", () => {
    const both = allRows.filter((row) => row.tags[0].startsWith("mark-") && row.tags.includes("secret"));
    expect(both).toHaveLength(51);
    for (const row of both) expect(["mark-heart", "mark-greedier"], row.id).toContain(row.tags[0]);
  });

  it("names the four Repentance+ secrets for what they need", () => {
    for (const id of ["feat-play-online", "feat-win-online", "feat-win-online-daily"]) {
      expect(allRows.find((row) => row.id === id)?.text, id).toContain("Online only");
    }
    expect(allRows.find((row) => row.id === "feat-item-descriptions")?.text).toContain("Repentance+ only");
  });

  it("keeps the guide's id, which backups and the sync API name it by", () => {
    expect(brand.id).toBe("binding-of-isaac");
  });
});

describe("storage", () => {
  // Readers' progress, theme and sync ledger live under these keys on this domain: new keys start every reader from nothing.
  it("keeps its storage keys", () => {
    expect(STORAGE_KEY).toBe("hundo-basement.v1");
    expect(THEME_KEY).toBe("hundo-basement.theme");
    expect(AWAKE_KEY).toBe("hundo-basement.awake");
    expect(PLACE_KEY).toBe("hundo-basement.place");
    expect(SYNC_KEY).toBe("hundo-basement.sync");
    expect(PERSIST_KEY).toBe("hundo-basement.persist");
    expect(COUNTS_KEY).toBe("hundo-basement.counts");
    expect(BUILD_KEY).toBe("hundo-basement.build");
    expect(BUILD_ASKED_KEY).toBe("hundo-basement.build-asked");
    // and the cookie hundo.quest reads this guide's progress from (core's summary.ts), set on every hundo.quest host
    expect(SUMMARY_COOKIE).toBe("hundo_p_binding-of-isaac");
  });
});

describe("Basement sync", () => {
  it("has no state of its own to sync beyond the shared fields", () => {
    expect(Object.keys(flatten(validateState({ version: 3, guide: "binding-of-isaac", checks: { [a]: true }, ceiling: 2, chapter: 2, spoilers: true }))).sort()).toEqual([`c:${a}`, "ceiling", "chapter", "spoilers"].sort());
  });
});

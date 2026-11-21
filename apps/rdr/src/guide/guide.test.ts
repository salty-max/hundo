import { allRows, byId, cats, chapters, checklistOf, completion, config, missablesLeft, overall, rowsByTag, tally, whatsLeft } from "@hundo/core/guide";
import { STORAGE_KEY, defaultState, validateState } from "@hundo/core/progress-state";
import { calibrationDelta, estimate, readPercent, weightOf } from "./estimate";
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
import { brand } from "./brand";
import { targets } from "./config";
import { questlines } from "./data/questlines";

const all = Object.fromEntries(allRows.map((row) => [row.id, true as const]));
const [a] = allRows.map((row) => row.id);
const tick = (rows: typeof allRows) => Object.fromEntries(rows.map((row) => [row.id, true as const]));
const without = (left: (typeof allRows)[number]) => tick(allRows.filter((row) => row !== left));

// 100% is every target on the board, each item once: scraps, optional tasks and every challenge rank included.
describe("Red Dead completion", () => {
  it("counts every category of the board, with no weights, points or estimate behind the bar", () => {
    expect(completion.board.map((item) => item.tag)).toEqual(expect.arrayContaining(["scrap", "optional", "challenge", "outfit", "stranger"]));
    expect(overall({}).label).toBe("complete");
  });

  it("reads under 100 with any one counted item left, and What's left says which category", () => {
    for (const { tag } of completion.board) {
      const [row] = rowsByTag(tag);
      expect(overall(without(row)).percent, tag).toBeLessThan(100);
      expect(whatsLeft(without(row)).map((item) => item.tag), tag).toEqual([tag]);
    }
  });

  it("counts a scrap, an optional task and a challenge rank without credit like any other item", () => {
    for (const tag of ["scrap", "optional"]) {
      expect(weightOf(rowsByTag(tag)[0]), tag).toBe(0);
      expect(overall(tick(rowsByTag(tag))).percent, tag).toBeGreaterThan(0);
    }
    // (the game credits only ranks 5 and 10, so most ranks have no weight, but the board counts them all)
    expect(rowsByTag("challenge").some((row) => weightOf(row) === 0)).toBe(true);
    expect(tally("challenge", tick(rowsByTag("challenge")))).toEqual({ done: rowsByTag("challenge").length, total: rowsByTag("challenge").length });
  });

  it("counts a Stranger task once, by its last step, and nothing for the steps before it", () => {
    const stepsOnly = allRows.filter((row) => row.tags.length === 1 && row.tags[0] === "stranger-step");
    expect(stepsOnly.length).toBeGreaterThan(0);
    expect(overall(tick(stepsOnly)).percent).toBe(0);
    expect(tally("stranger", tick(rowsByTag("stranger")))).toEqual({ done: 18, total: 18 });
  });

  it("shows What's left in counts, not points", () => {
    for (const item of whatsLeft({})) expect(Number.isInteger(item.left), item.tag).toBe(true);
  });
});

// Every target has a goal, and every goal has its hosts in docs/facts-to-verify.md (Counts). Eleven are the game's own counts; the scraps are
// six for each of five outfits on two hosts' lists; the optional tasks are the guide's own list, whose goal is its rows with no total behind it.
describe("Red Dead's goals", () => {
  const goals = Object.fromEntries(targets.map(({ tag, goal }) => [tag, goal]));

  it("puts every category but the Stranger steps on the board", () => {
    expect(targets.map(({ tag }) => tag)).toEqual(Object.keys(cats).filter((tag) => tag !== "stranger-step"));
  });

  it("pins the thirteen counts", () => {
    expect(goals).toEqual({
      mission: 57, stranger: 18, location: 94, bounty: 20, challenge: 40, outfit: 9, scrap: 30, safehouse: 13, hideout: 7, weapon: 5, job: 5, minigame: 6, optional: 4,
    });
  });

  // The 30 scraps are two hosts' lists: six for each of five outfits (the Elegant Suit has none), one per outfit's own part.
  it("holds six scraps for each of five outfits", () => {
    const perOutfit: Record<string, number> = {};
    for (const row of rowsByTag("scrap")) {
      const outfit = row.id.split("-")[1];
      perOutfit[outfit] = (perOutfit[outfit] ?? 0) + 1;
    }
    expect(perOutfit).toEqual({ bollard: 6, treasure: 6, bandito: 6, reyes: 6, army: 6 });
  });

  // Each count times what the game credits for it is the game's 100%, so a count that drifted would show here and in the estimate's test.
  it("weighs the game's counts at the game's 100", () => {
    const credit = (tag: string) => rowsByTag(tag).reduce((sum, row) => sum + weightOf(row), 0);
    const game = targets.filter(({ tag }) => !["scrap", "optional"].includes(tag));
    expect(game).toHaveLength(11);
    expect(Math.round(game.reduce((sum, { tag }) => sum + credit(tag), 0) * 1e6) / 1e6).toBe(100);
  });

  // The story missions are the game's own list, credited in Stats → General, so they count: steps the game doesn't credit never count.
  it("counts the 57 story missions, which the game credits, and counts the Stranger steps before a task's last at nothing", () => {
    expect(tally("mission", tick(rowsByTag("mission")))).toEqual({ done: 57, total: 57 });
    expect(weightOf(rowsByTag("mission")[0])).toBe(1);
    expect(completion.board.map((item) => item.tag)).toContain("mission");
    expect(completion.board.map((item) => item.tag)).not.toContain("stranger-step");
  });
});

describe("Red Dead's in-game estimate", () => {
  it("weighs scraps, optional tasks and the steps before a Stranger task's last at nothing", () => {
    for (const row of allRows) if (["scrap", "optional", "stranger-step"].includes(row.tags[0])) expect(weightOf(row), row.id).toBe(0);
    expect(estimate(tick(allRows.filter((row) => ["scrap", "optional", "stranger-step"].includes(row.tags[0]))), allRows)).toBe(0);
  });

  it("totals roughly 100% when everything is checked", () => {
    expect(estimate({}, allRows)).toBe(0);
    expect(estimate(all, allRows)).toBeGreaterThanOrEqual(99);
    expect(estimate(all, allRows)).toBeLessThanOrEqual(100);
  });

  it("flags the time-limited Stranger chain", () => {
    expect(missablesLeft(chapters[0], {}).map((row) => row.id)).toContain("optional-i-know-you-start");
    expect(missablesLeft(chapters[0], { "optional-i-know-you-start": true })).toEqual([]);
  });

  it("measures calibration against the game's number", () => {
    expect(calibrationDelta(40.3, 41)).toBe(0.7);
    expect(calibrationDelta(41, 40.2)).toBe(-0.8);
  });
});

describe("Stranger tasks", () => {
  // The game's count: a task counts once, by its last step, however many steps it is split into.
  it("counts the game's 18", () => {
    expect(rowsByTag("stranger")).toHaveLength(18);
    expect(tally("stranger", {}).total).toBe(18);
  });

  it("ends each task's line on its counted step, every step before it a stranger-step", () => {
    const tagsOf = (id: string) => byId.get(id)!.tags;
    for (const line of questlines.lines) {
      if (line.id === "i-know-you") {
        for (const id of line.steps) expect(tagsOf(id)[0], id).toBe("optional");
        continue;
      }
      expect(tagsOf(line.steps.at(-1)!), line.id).toEqual(["stranger", "stranger-step"]);
      for (const id of line.steps.slice(0, -1)) expect(tagsOf(id), id).toEqual(["stranger-step"]);
    }
  });

  it("opens every step from the board's tile and What's left, where the Strangers chip goes", () => {
    expect(checklistOf("stranger")).toBe("/checklist/stranger-step");
    expect(config.chips.checklist).toContainEqual(["stranger-step", "Strangers"]);
    // (named so the Category select reads it as the whole of the tile's Stranger Tasks)
    expect(cats["stranger-step"][0]).toBe(`${cats.stranger[0]}, every step`);
    const steps = new Set(rowsByTag("stranger-step").map((row) => row.id));
    const lines = questlines.lines.filter((line) => line.id !== "i-know-you");
    expect(steps.size).toBeGreaterThan(rowsByTag("stranger").length);
    for (const id of lines.flatMap((line) => line.steps)) expect(steps.has(id), id).toBe(true);
  });

  it("names the place of every group with Stranger steps in it", () => {
    // Without one, a group's line lists its rows' categories, here "Stranger Tasks · Stranger Tasks, every step".
    for (const group of chapters.flatMap((chapter) => chapter.groups)) {
      if (group.rows.some((row) => row.tags.includes("stranger-step"))) expect(group.location, group.title).toBeTruthy();
    }
  });
});

describe("Red Dead saves from before the shared format", () => {
  const base = { guide: "red-dead-redemption", checks: { [a]: true }, ceiling: 2, chapter: 2, spoilers: false };

  it("loads a version 1 save and leaves the reported percentage empty", () => {
    expect(validateState({ ...base, version: 1, reported: 50 })).toEqual({ ...defaultState(), checks: { [a]: true }, ceiling: 2, chapter: 2, spoilers: false, extra: { reported: null } });
  });

  it("loads a version 2 save with its reported percentage", () => {
    expect(validateState({ ...base, version: 2, reported: 37.46 }).extra).toEqual({ reported: 37.5 });
  });

  it("keeps the reported percentage through export and import", () => {
    const state = validateState({ ...base, version: 2, reported: 41 });
    expect(validateState(JSON.parse(JSON.stringify(state)))).toEqual(state);
  });

  it("refuses unknown versions and other guides", () => {
    for (const bad of [{ ...base, version: 4 }, { ...base, version: 1, guide: "echoes-of-wisdom" }, { ...base, version: 1, guide: undefined }]) expect(() => validateState(bad)).toThrow();
  });
});

describe("in-game percentage", () => {
  it("keeps a valid number to a tenth and drops anything else", () => {
    expect(readPercent("12")).toBe(12);
    expect(readPercent(0)).toBe(0);
    for (const bad of [140, -1, "x", NaN, null, undefined, true, {}]) expect(readPercent(bad)).toBeNull();
  });
});

describe("storage", () => {
  // Readers' progress and theme live under these keys on this domain: new keys start every reader from nothing.
  it("keeps its storage keys", () => {
    expect(STORAGE_KEY).toBe("red-dead-field-guide.v1");
    expect(THEME_KEY).toBe("red-dead-field-guide.theme");
    expect(AWAKE_KEY).toBe("red-dead-field-guide.awake");
    expect(PLACE_KEY).toBe("red-dead-field-guide.place");
    expect(SYNC_KEY).toBe("red-dead-field-guide.sync");
    expect(PERSIST_KEY).toBe("red-dead-field-guide.persist");
    expect(COUNTS_KEY).toBe("red-dead-field-guide.counts");
    expect(BUILD_KEY).toBe("red-dead-field-guide.build");
    expect(BUILD_ASKED_KEY).toBe("red-dead-field-guide.build-asked");
    // and the cookie hundo.quest reads this guide's progress from (core's summary.ts), set on every hundo.quest host
    expect(SUMMARY_COOKIE).toBe("hundo_p_red-dead-redemption");
  });

  // Every saved state and backup carries this id, and one with another id is refused.
  it("keeps its guide id", () => {
    expect(brand.id).toBe("red-dead-redemption");
  });

  // The guide's address: every canonical, the sitemap and the link preview are on it.
  it("lives at rdr.hundo.quest", () => {
    expect(brand.home).toBe("https://rdr.hundo.quest");
  });
});

const entries = (flat: Record<string, unknown>) => Object.fromEntries(Object.entries(flat).map(([key, value]) => [key, [1, value]])) as Entries;

describe("Red Dead sync", () => {
  it("syncs the reported percentage as one leaf, empty or not, and gets it back", () => {
    expect(Object.keys(flatten(defaultState())).filter((key) => key.startsWith("x:"))).toEqual(["x:reported"]);
    expect(flatten({ ...defaultState(), extra: { reported: 37.5 } })["x:reported"]).toBe(37.5);
    expect(viewFrom(entries({ "x:reported": 37.5 }), defaultState()).extra).toEqual({ reported: 37.5 });
    expect(viewFrom(entries({ "x:reported": null }), { ...defaultState(), extra: { reported: 12 } }).extra).toEqual({ reported: null });
  });

  it("refuses a percentage that isn't one", () => {
    expect(viewFrom(entries({ "x:reported": 400 }), defaultState()).extra).toEqual({ reported: null });
  });
});

import { byChapter } from "@hundo/core/format";
import type { Banner, BoardItem, GuideConfig } from "@hundo/core/types";
import { brand } from "./brand";
import chapter1 from "./data/chapter-1";
import chapter2 from "./data/chapter-2";
import chapter3 from "./data/chapter-3";
import chapter4 from "./data/chapter-4";
import chapter5 from "./data/chapter-5";
import chapter6 from "./data/chapter-6";
import chapter7 from "./data/chapter-7";
import chapter8 from "./data/chapter-8";
import chapter9 from "./data/chapter-9";
import chapter10 from "./data/chapter-10";
import chapter11 from "./data/chapter-11";
import chapter12 from "./data/chapter-12";
import chapter13 from "./data/chapter-13";
import { choices } from "./data/choices";
import { missables } from "./data/missables";
import { questlines } from "./data/questlines";
import { sources } from "./data/sources";

const banners = byChapter(import.meta.glob<Banner>("./banners/chapter-*.webp", { eager: true, query: "?banner", import: "default" }));

/**
 * The completion board, and what 100% is: every target counts, each item once, up to its goal, so the bar reads 100 exactly when
 * What's left is empty. The first sixteen are the game's own completion (its 112%, term by term). The rest is what the game's
 * percentage doesn't count: the collections a full save also holds (Grubs, notches, Pale Ore, maps, stations, Roots, keys, relics), the
 * endings and dream rematches, and the guide's own lists (key pickups, the six bosses outside the percentage, the
 * challenges, Pure Completion and the quest steps), whose goals are their rows, not a game total. Route steps are directions and
 * carry no target. The game's own figure is the Check against the game panel's (`points.ts`), not the bar's. A test pins every
 * goal to the data.
 */
export const targets: BoardItem[] = [
  { tag: "charm", goal: 40, list: "game" },
  { tag: "percent-boss", goal: 15, list: "game" },
  { tag: "equipment", goal: 7, list: "game" },
  { tag: "warrior-dream", goal: 7, list: "game" },
  { tag: "spell", goal: 6, list: "game" },
  { tag: "forge", goal: 4, list: "game" },
  { tag: "mask-shard", goal: 16, list: "game" },
  { tag: "vessel-fragment", goal: 9, list: "game" },
  { tag: "nail-art", goal: 3, list: "game" },
  { tag: "dreamer", goal: 3, list: "game" },
  { tag: "dream-milestone", goal: 3, list: "game" },
  { tag: "trial", goal: 3, list: "game" },
  { tag: "troupe-boss", goal: 1, list: "game" },
  { tag: "troupe-finale", goal: 1, list: "game" },
  { tag: "godtuner", goal: 1, list: "game" },
  { tag: "pantheon", goal: 4, list: "game" },
  { tag: "grub", goal: 46, list: "game" },
  { tag: "notch", goal: 8, list: "game" },
  { tag: "pale-ore", goal: 6, list: "game" },
  { tag: "map", goal: 13, list: "game" },
  { tag: "stag", goal: 11, list: "game" },
  { tag: "root", goal: 15, list: "game" },
  { tag: "simple-key", goal: 4, list: "game" },
  // The relics go in chapter by chapter where the route picks each up: a guide list (its goal its rows) until the last chapter with a
  // relic, which makes all four the game's totals (14 Wanderer's Journals, 17 Hallownest Seals, 8 King's Idols, 4 Arcane Eggs).
  { tag: "hallownest-seal", goal: 6, list: "guide" },
  { tag: "wanderers-journal", goal: 6, list: "guide" },
  { tag: "ending", goal: 5, list: "game" },
  { tag: "dream-boss", goal: 5, list: "game" },
  { tag: "other-boss", goal: 6, list: "guide" },
  { tag: "pickup", goal: 8, list: "guide" },
  { tag: "challenge", goal: 4, list: "guide" },
  { tag: "achievement", goal: 1, list: "guide" },
  { tag: "quest", goal: 44, list: "guide" },
];

const config: GuideConfig = {
  brand,
  layout: "article",
  chapters: [chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter7, chapter8, chapter9, chapter10, chapter11, chapter12, chapter13],
  sources,
  // The game keeps its own achievement list: Switch has none of its own, so there the game shows them itself, as Feats.
  achievements: {
    sources: [
      ["Hollow Knight wiki · on Switch the achievements are in-game Feats (Quests before 1.5.12459)", "https://hollowknight.wiki/w/Achievements_(Hollow_Knight)"],
      ["Rogue Ranker · Switch lists them in-game as Feats", "https://rogueranker.com/hollow-knight-achievements/"],
      ["fextralife · on Switch the achievements are in the game, as Quests", "https://hollowknight.wiki.fextralife.com/Trophy_and_Achievement_Guide"],
    ],
  },
  categories: {
    route: ["Route steps", "Route", "compass"],
    quest: ["Quest steps", "Quest", "scroll", "mint"],
    map: ["Area maps", "Map", "compass", "sky"],
    stag: ["Stag stations", "Stag station", "pin", "sky"],
    boss: ["Boss encounters", "Boss", "sword", "rose"],
    "percent-boss": ["Bosses (in-game %)", "Boss (in-game %)", "sword", "rose"],
    "other-boss": ["Bosses (outside the %)", "Boss (outside the %)", "sword", "clay"],
    "dream-boss": ["Dream boss rematches", "Dream rematch", "sword", "violet"],
    "warrior-dream": ["Warrior Dreams", "Warrior Dream", "sword", "violet"],
    dreamer: ["Dreamers", "Dreamer", "star", "violet"],
    "dream-milestone": ["Dream Nail milestones", "Dream milestone", "star", "violet"],
    root: ["Whispering Roots", "Root", "star", "mint"],
    equipment: ["Equipment upgrades", "Equipment", "ribbon", "sky"],
    pickup: ["Special pickups", "Pickup", "chest", "mint"],
    "simple-key": ["Simple Keys", "Key", "chest", "amber"],
    "hallownest-seal": ["Hallownest Seals", "Hallownest Seal", "stamp", "sky"],
    "wanderers-journal": ["Wanderer’s Journals", "Wanderer’s Journal", "book", "clay"],
    charm: ["Charms", "Charm", "gem", "violet"],
    notch: ["Earned Charm Notches", "Charm Notch", "gem", "clay"],
    spell: ["Spells", "Spell", "flask", "violet"],
    "nail-art": ["Nail Arts", "Nail Art", "sword", "amber"],
    forge: ["Nail upgrades", "Nail upgrade", "sword", "amber"],
    "pale-ore": ["Pale Ore", "Pale Ore", "gem", "amber"],
    "mask-shard": ["Mask Shards", "Mask Shard", "heart", "rose"],
    "vessel-fragment": ["Vessel Fragments", "Vessel Fragment", "flask", "sky"],
    grub: ["Grubs", "Grub", "heart", "mint"],
    trial: ["Colosseum trials", "Trial", "ribbon", "amber"],
    "troupe-boss": ["Grimm’s first fight", "Troupe boss", "sword", "rose"],
    "troupe-finale": ["Troupe finale", "Troupe finale", "ribbon", "rose"],
    godtuner: ["Godtuner", "Godtuner", "gem", "amber"],
    pantheon: ["Completion Pantheons", "Pantheon", "sword", "amber"],
    ending: ["Endings", "Ending", "book", "violet"],
    challenge: ["Optional challenges", "Challenge", "ribbon", "violet"],
    achievement: ["Pure Completion", "Achievement", "ribbon", "amber"],
  },
  chips: {
    checklist: [
      ["charm", "Charms"],
      ["equipment", "Equipment upgrades"],
      ["grub", "Grubs"],
      ["mask-shard", "Mask Shards"],
      ["vessel-fragment", "Vessel Fragments"],
      ["boss", "Boss encounters"],
      ["quest", "Quest steps"],
      ["pale-ore", "Pale Ore"],
      ["stag", "Stag stations"],
      ["map", "Area maps"],
      ["root", "Whispering Roots"],
      ["ending", "Endings"],
      ["pantheon", "Completion Pantheons"],
    ],
  },
  missables,
  choices,
  questlines,
  banners,
  completion: { board: targets, directions: ["route"] },
  state: {},
  text: {
    checklistIntro: "Search by charm, boss, NPC or place. Checks are shared with the walkthrough.",
    searchPlaceholder: "Search charms, bosses or places",
    dashboardIntro:
      "100% is every target on the board, each item counted once: the game’s own completion with all four free content packs, and the Grubs, maps, endings, quest steps and the rest it leaves out. What your save should read is under Check against the game.",
    boardTitle: "Completion targets",
    boardNote:
      "Every target counts, each item once, so 100% is exactly when What’s left is empty. The first sixteen are the game’s own completion, which weighs them differently (equipment counts twice, and Mask Shards and Vessel Fragments count only as whole masks and vessels), so its figure, in Check against the game, differs from this bar. Grubs, notches, Pale Ore, maps, stations, Roots, keys, endings and dream rematches count here too, and so do the relics Lemm buys, as the guide adds them chapter by chapter, and so do the guide’s own lists: key pickups, six bosses outside the game’s percentage, the challenges, Pure Completion and the quest steps.",
    nextUpDone: "Everything revealed is checked. Reveal the next chapter or check the totals on the Progress page.",
    backupBlurb: "Export a copy of your checks and spoiler settings.",
  },
};

export default config;

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
import { named, notes, picks, tasks } from "./data/build-plan";
import { choices } from "./data/choices";
import { missables } from "./data/missables";
import { questlines } from "./data/questlines";
import { splits } from "./data/splits";
import { sources } from "./data/sources";

const banners = byChapter(import.meta.glob<Banner>("./banners/chapter-*.webp", { eager: true, query: "?banner", import: "default" }));

/**
 * The guide's own completion list, and what 100% is: every target counts, each item once, up to its goal, so the bar reads 100
 * exactly when What's left is empty. The bosses, covenants, rare weapons, spells, rings, embers, maximum reinforcements, endings and
 * the expansion's spells come with game totals (facts-to-verify.md has their hosts), and so do Snuggly's trades (the game's 20, less the Pursuers spell and the Red Titanite Slab, which count as a spell and a slab, so 18) and the NPC invasions, whose lists two hosts
 * give as tables. The rest are the guide's own lists, whose goals are their rows, not a game total: the NPC quest steps, the Estus
 * souls and Titanite Slabs it sends you to, the expansion's gear, the later cycles' ways at the one-way choices, the discoveries and the
 * equipment and keys the route picks up, each where it finds them. A test pins every goal to the data, so a missing row shows up as a failing count. Route steps are directions and carry no target,
 * and so are the later cycles' steps that only repeat something or yield an item its own row counts: an item a later cycle gives (the
 * Leo Ring, a boss soul's second or third recipe) sits in chapter 13 and counts once, there. At a one-way choice (data/choices.ts) the first cycle takes the way the
 * guide recommends and a later cycle the other, each a row that counts, so 100% takes NG+ as the endings do. Base-game spells have their own tags, so the five expansion
 * spells count once, on their own line, and still show in their schools. The game keeps no achievement list of its own (facts-to-verify.md
 * has what backs that), so the platforms' achievements are a source here and never a target, a category or a word a reader sees.
 */
export const targets: BoardItem[] = [
  { tag: "boss", goal: 26, list: "game" },
  { tag: "covenant", goal: 9, list: "game" },
  { tag: "rare-weapon", goal: 47, list: "game" },
  { tag: "base-sorcery", goal: 24, list: "game" },
  { tag: "base-pyromancy", goal: 19, list: "game" },
  { tag: "miracle", goal: 23, list: "game" },
  { tag: "ring", goal: 41, list: "game" },
  { tag: "ember", goal: 10, list: "game" },
  { tag: "reinforcement", goal: 10, list: "game" },
  { tag: "ending", goal: 2, list: "game" },
  { tag: "quest", goal: 62, list: "guide" },
  { tag: "dlc-spell", goal: 5, list: "game" },
  { tag: "dlc-gear", goal: 8, list: "guide" },
  { tag: "trade", goal: 18, list: "game" },
  { tag: "estus", goal: 5, list: "guide" },
  { tag: "forge", goal: 6, list: "guide" },
  { tag: "invasion", goal: 7, list: "game" },
  { tag: "cycle", goal: 4, list: "guide" },
  { tag: "extra", goal: 14, list: "guide" },
  { tag: "pickup", goal: 41, list: "guide" },
];

const config: GuideConfig = {
  brand,
  layout: "article",
  chapters: [chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter7, chapter8, chapter9, chapter10, chapter11, chapter12, chapter13],
  sources,
  categories: {
    route: ["Route steps", "Route", "compass"],
    boss: ["Bosses", "Boss", "sword", "rose"],
    quest: ["NPC quests", "Quest", "scroll", "mint"],
    covenant: ["Covenants", "Covenant", "ribbon", "violet"],
    invasion: ["NPC invasions", "Invasion", "sword", "rose"],
    pickup: ["Equipment and keys", "Pickup", "chest", "sky"],
    ring: ["Rings", "Ring", "gem", "violet"],
    ember: ["Embers", "Ember", "gem", "amber"],
    estus: ["Estus upgrades", "Estus", "flask", "amber"],
    forge: ["Forging materials", "Forging", "gem", "clay"],
    reinforcement: ["Maximum reinforcements", "Reinforcement", "sword", "amber"],
    "rare-weapon": ["Rare weapons", "Rare weapon", "sword", "amber"],
    sorcery: ["Sorceries", "Sorcery", "star", "sky"],
    pyromancy: ["Pyromancies", "Pyromancy", "star", "clay"],
    miracle: ["Miracles", "Miracle", "star", "amber"],
    "base-sorcery": ["Base-game sorceries", "Base sorcery", "star", "sky"],
    "base-pyromancy": ["Base-game pyromancies", "Base pyromancy", "star", "clay"],
    "dlc-spell": ["Expansion spells", "Expansion spell", "star", "violet"],
    "dlc-gear": ["Expansion equipment", "Expansion gear", "chest", "violet"],
    dlc: ["Artorias of the Abyss", "Expansion", "compass", "violet"],
    ending: ["Endings", "Ending", "book", "rose"],
    cycle: ["Later cycles", "Later cycle", "compass", "sky"],
    extra: ["Discoveries", "Discovery", "star", "mint"],
    trade: ["Crow trades", "Trade", "chest", "mint"],
  },
  chips: {
    checklist: [
      ["boss", "Bosses"],
      ["quest", "NPC quests"],
      ["rare-weapon", "Rare weapons"],
      ["ring", "Rings"],
      ["covenant", "Covenants"],
      ["sorcery", "Sorceries"],
      ["pyromancy", "Pyromancies"],
      ["miracle", "Miracles"],
      ["ember", "Embers"],
    ],
  },
  missables,
  choices,
  questlines,
  splits,
  builds: {
    leanings: [
      { id: "str", label: "Strength" },
      { id: "dex", label: "Dexterity" },
      { id: "int", label: "Intelligence" },
      { id: "fth", label: "Faith" },
      { id: "pyro", label: "Pyromancy" },
    ],
    // Humanity went with the Chaos weapons add-on (21 Nov 2026): a saved pick that holds it reads without it, the next save drops it, and
    // guide.test.ts holds that the id never comes back.
    retired: ["hum"],
    named,
    picks,
    tasks,
    notes,
  },
  banners,
  completion: { board: targets, directions: ["route"] },
  state: {},
  text: {
    checklistIntro: "Search by item, boss, NPC or place. Checks are shared with the walkthrough.",
    searchPlaceholder: "Search items, bosses or places",
    dashboardIntro: "100% is every target on the board, each item counted once, across three playthroughs: the bosses, covenants, rare weapons and spells, the rings, the expansion, the NPC quests, Snuggly’s trades, the invasions and the later cycles.",
    boardTitle: "Completion targets",
    boardNote:
      "Every target counts, each item once, so 100% is exactly when What’s left is empty. Spell counts are the base game’s; the five expansion spells have their own line. Rare weapons are all 47. NPC quests, expansion gear, Estus souls, slabs, later cycles, discoveries and pickups count the guide’s own rows, not a game total; trades (the game’s 20, less two that count as a spell and a slab) and invasions follow the game’s lists. At a one-way choice, like Frampt or Kaathe, the first cycle takes the way the guide recommends and a later cycle the other, and both count.",
    nextUpDone: "Everything revealed is checked. Reveal the next chapter or check the totals on the Progress page.",
    backupBlurb: "Export a copy of your checks and spoiler settings.",
  },
};

export default config;

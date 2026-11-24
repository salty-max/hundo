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
import chapter14 from "./data/chapter-14";
import chapter15 from "./data/chapter-15";
import chapter16 from "./data/chapter-16";
import chapter17 from "./data/chapter-17";
import chapter18 from "./data/chapter-18";
import chapter19 from "./data/chapter-19";
import chapter20 from "./data/chapter-20";
import { missables, reassurance } from "./data/missables";
import { questlines } from "./data/questlines";

const banners = byChapter(import.meta.glob<Banner>("./banners/chapter-*.webp", { eager: true, query: "?banner", import: "default" }));

/**
 * What 100% is: the 282 collectibles the game counts (its Enhanced Map shows them region by region; it has no overall percentage), in
 * its own lists, and beside them the guide's own lists of what a reader beats or gets: the bosses, the weapons and their upgrade
 * chests, the sidearms, the cloak upgrades and the island tasks. The Bonestones are a guide list until their total of 111 has a second
 * host. The generators are route steps (the finale needs them all), and chapters 19 and 20 are separate saves, outside the bar.
 * facts-to-verify.md names each total's hosts.
 */
export const targets: BoardItem[] = [
  { tag: "trinket", goal: 60, list: "game" },
  { tag: "kear", goal: 50, list: "game" },
  { tag: "bonestone", goal: 111, list: "guide" },
  { tag: "vial-pouch", goal: 7, list: "game" },
  { tag: "health-rose", goal: 10, list: "game" },
  { tag: "trinket-bag", goal: 5, list: "game" },
  { tag: "joule-box", goal: 8, list: "game" },
  { tag: "spark-container", goal: 3, list: "game" },
  { tag: "angling", goal: 3, list: "game" },
  { tag: "fish", goal: 16, list: "game" },
  { tag: "underlab", goal: 9, list: "game" },
  { tag: "boss", goal: 26, list: "guide" },
  { tag: "weapon", goal: 9, list: "guide" },
  { tag: "sidearm", goal: 13, list: "guide" },
  { tag: "gear", goal: 6, list: "guide" },
  { tag: "quest", goal: 16, list: "guide" },
];

const config: GuideConfig = {
  brand,
  layout: "article",
  chapters: [chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter7, chapter8, chapter9, chapter10, chapter11, chapter12, chapter13, chapter14, chapter15, chapter16, chapter17, chapter18, chapter19, chapter20],
  sources: [
    ["Every collectible the game counts, by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"],
    ["The 100% checklist (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/checklist"],
    ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"],
    ["The walkthrough (Gamer Guides)", "https://www.gamerguides.com/mina-the-hollower/guide"],
    ["The Blameless ending’s rules (Yacht Club Games)", "https://www.yachtclubgames.com/blog/mina-the-hollower-ending/"],
  ],
  categories: {
    route: ["Route steps", "Route", "compass"],
    trinket: ["Trinkets", "Trinket", "ribbon", "rose"],
    kear: ["Kears", "Kear", "unlock", "amber"],
    bonestone: ["Bonestones", "Bonestone", "gem", "violet"],
    "vial-pouch": ["Vial Pouches", "Vial Pouch", "flask", "mint"],
    "health-rose": ["Health Roses", "Health Rose", "heart", "rose"],
    "trinket-bag": ["Trinket Bags", "Trinket Bag", "chest", "clay"],
    "joule-box": ["Joule Boxes", "Joule Box", "star", "amber"],
    "spark-container": ["Spark Containers", "Spark Container", "flask", "sky"],
    angling: ["Fishing upgrades", "Fishing upgrade", "fish", "sky"],
    fish: ["Fish", "Fish", "fish", "sky"],
    underlab: ["Underlab equipment", "Underlab equipment", "gear", "clay"],
    boss: ["Bosses", "Boss", "sword", "rose"],
    weapon: ["Weapons and upgrades", "Weapon", "sword", "violet"],
    sidearm: ["Sidearms", "Sidearm", "tri", "violet"],
    gear: ["Cloak upgrades and permits", "Cloak upgrade or permit", "shirt", "clay"],
    quest: ["Island tasks", "Island task", "book", "mint"],
    outside: ["Separate saves", "Separate save", "flag"],
  },
  chips: {
    checklist: [
      ["trinket", "Trinkets"],
      ["kear", "Kears"],
      ["bonestone", "Bonestones"],
      ["health-rose", "Health Roses"],
      ["fish", "Fish"],
      ["boss", "Bosses"],
      ["quest", "Island tasks"],
    ],
  },
  missables,
  questlines,
  reassurance,
  banners,
  completion: { board: targets, directions: ["route"], outside: ["outside"] },
  state: {},
  text: {
    checklistIntro: "Search by trinket, Kear, place, boss or task. Checks are shared with the walkthrough.",
    searchPlaceholder: "Search trinkets, Kears or places",
    dashboardIntro: "100% is every collectible the game counts, 282 of them, with the guide’s lists of bosses, weapons, sidearms, cloak upgrades and island tasks beside them. New Game Plus and the alternative ending’s challenge are separate saves, tracked apart.",
    boardTitle: "Completion targets",
    boardNote:
      "Every target counts, each item once, so 100% is exactly when What’s left is empty. The game counts 282 collectibles, region by region on its Enhanced Map, and keeps no overall percentage. Ten of their lists are shown as the game’s own (171 collectibles); the 111 Bonestones count the guide’s own rows until a second source confirms that total. The bosses, weapons, sidearms, cloak upgrades and island tasks are the guide’s own lists. The separate saves are shown and left out of the bar.",
    nextUpDone: "Everything revealed is checked. Reveal the next chapter or check the totals on the Progress page.",
    backupBlurb: "Export a copy of your checks and spoiler settings.",
  },
};

export default config;

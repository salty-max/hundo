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
import { missables, reassurance } from "./data/missables";
import { questlines } from "./data/questlines";

const banners = byChapter(import.meta.glob<Banner>("./banners/chapter-*.webp", { eager: true, query: "?banner", import: "default" }));

/**
 * What 100% is: Dead God, which asks for every other secret and every item, and Death Certificate among those secrets, which asks for
 * every Hard completion mark on all 34 characters. So the board is the game's two lists: the 641 secrets of Repentance+ (its Stats →
 * Secrets page) and the twelve Hard marks of each character's note. A Hard mark row ticks only its mark, except where the mark's unlock
 * is earned by the Hard mark itself (the Hard Mom's Heart unlocks and the Greedier unlocks), since a Normal win gives the other unlocks
 * on their own. The Collection page (every item) sits inside Dead God's row. facts-to-verify.md names each total's hosts.
 */
export const targets: BoardItem[] = [
  { tag: "secret", goal: 641, list: "game" },
  { tag: "mark-heart", goal: 34, list: "game" },
  { tag: "mark-isaac", goal: 34, list: "game" },
  { tag: "mark-bluebaby", goal: 34, list: "game" },
  { tag: "mark-satan", goal: 34, list: "game" },
  { tag: "mark-lamb", goal: 34, list: "game" },
  { tag: "mark-bossrush", goal: 34, list: "game" },
  { tag: "mark-hush", goal: 34, list: "game" },
  { tag: "mark-megasatan", goal: 34, list: "game" },
  { tag: "mark-greedier", goal: 34, list: "game" },
  { tag: "mark-delirium", goal: 34, list: "game" },
  { tag: "mark-mother", goal: 34, list: "game" },
  { tag: "mark-beast", goal: 34, list: "game" },
];

const config: GuideConfig = {
  brand,
  layout: "article",
  chapters: [chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter7, chapter8, chapter9, chapter10, chapter11, chapter12, chapter13, chapter14],
  sources: [
    ["The secrets, with their conditions (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Achievements"],
    ["The secrets on Steam", "https://steamcommunity.com/stats/250900/achievements"],
    ["Completion marks (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Completion_Marks"],
    ["Item unlocks (Platinum God)", "https://tboi.com/repentance"],
    ["A Dead God route for Repentance+ (Steam guide)", "https://steamcommunity.com/sharedfiles/filedetails/?id=3712501774"],
  ],
  categories: {
    route: ["Route steps", "Route", "compass"],
    secret: ["Secrets", "Secret", "unlock", "amber"],
    character: ["Characters", "Character", "heart", "rose"],
    item: ["Items", "Item", "gem", "violet"],
    trinket: ["Trinkets", "Trinket", "ribbon", "clay"],
    pickup: ["Cards, runes and pickups", "Pickup", "stamp", "sky"],
    baby: ["Co-op babies", "Co-op baby", "shell", "mint"],
    challenge: ["Challenges", "Challenge", "flag", "amber"],
    area: ["Floors and bosses", "Floor or boss", "mountain", "clay"],
    donation: ["Donation machines", "Donation", "chest", "amber"],
    start: ["Starting items", "Starting item", "arrowUp"],
    feat: ["Feats", "Feat", "star", "violet"],
    "mark-heart": ["Mom’s Heart marks on Hard", "Mom’s Heart mark", "checkList", "violet"],
    "mark-isaac": ["Isaac marks on Hard", "Isaac mark", "checkList", "violet"],
    "mark-bluebaby": ["??? marks on Hard", "??? mark", "checkList", "violet"],
    "mark-satan": ["Satan marks on Hard", "Satan mark", "checkList", "violet"],
    "mark-lamb": ["The Lamb marks on Hard", "The Lamb mark", "checkList", "violet"],
    "mark-bossrush": ["Boss Rush marks on Hard", "Boss Rush mark", "checkList", "violet"],
    "mark-hush": ["Hush marks on Hard", "Hush mark", "checkList", "violet"],
    "mark-megasatan": ["Mega Satan marks on Hard", "Mega Satan mark", "checkList", "violet"],
    "mark-greedier": ["Ultra Greedier marks on Hard", "Ultra Greedier mark", "checkList", "violet"],
    "mark-delirium": ["Delirium marks on Hard", "Delirium mark", "checkList", "violet"],
    "mark-mother": ["Mother marks on Hard", "Mother mark", "checkList", "violet"],
    "mark-beast": ["The Beast marks on Hard", "The Beast mark", "checkList", "violet"],
  },
  chips: {
    checklist: [
      ["secret", "Secrets"],
      ["character", "Characters"],
      ["item", "Items"],
      ["challenge", "Challenges"],
      ["baby", "Co-op babies"],
      ["mark-heart", "Mom’s Heart marks"],
      ["mark-greedier", "Greedier marks"],
    ],
  },
  missables,
  questlines,
  reassurance,
  banners,
  completion: { board: targets, directions: ["route"] },
  state: {},
  text: {
    checklistIntro: "Search by secret, character, boss or item. Checks are shared with the walkthrough.",
    searchPlaceholder: "Search secrets, characters or bosses",
    dashboardIntro: "100% is Dead God: every one of the game’s 641 secrets, which include every Hard completion mark on all 34 characters, and every item on the Collection page.",
    boardTitle: "Completion targets",
    boardNote:
      "Two lists the game keeps: its Secrets page (641 on Repentance+, four of them added by Repentance+) and each character’s note, twelve Hard marks for each of the 34. The items of the Collection page count inside Dead God’s row, not one by one.",
    nextUpDone: "Everything revealed is checked. Reveal the next chapter or check the totals on the Progress page.",
    backupBlurb: "Export a copy of your checks and spoiler settings.",
  },
};

export default config;

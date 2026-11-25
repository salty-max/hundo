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
import { missables, reassurance } from "./data/missables";
import { questlines } from "./data/questlines";

const banners = byChapter(import.meta.glob<Banner>("./banners/chapter-*.webp", { eager: true, query: "?banner", import: "default" }));

/**
 * What 100% is: the game keeps no completion figure, so the bar counts its six fixed lists (Mini Medals, the Monarch's prizes, scrolls,
 * Secret Spots, sigils and the Craft-Master's recipes) and, beside them, the guide's own lists of what a reader finds or finishes: the
 * equipment found in the world, the sparkly spots (a guide list until a second host confirms 48), the bosses, Zalen's quest and
 * the two endings one save reaches. Carrying Gwaelin to the end needs a save of its own, so it lies outside the bar (the user's call,
 * 25 Nov 2026). Story beats, key items, keys and searches are route steps. facts-to-verify.md names each total's hosts.
 */
export const targets: BoardItem[] = [
  { tag: "mini-medal", goal: 40, list: "game" },
  { tag: "medal-prize", goal: 13, list: "game" },
  { tag: "scroll", goal: 22, list: "game" },
  { tag: "secret-spot", goal: 15, list: "game" },
  { tag: "sigil", goal: 5, list: "game" },
  { tag: "recipe", goal: 8, list: "game" },
  { tag: "equipment", goal: 81, list: "guide" },
  { tag: "sparkle", goal: 48, list: "guide" },
  { tag: "boss", goal: 13, list: "guide" },
  { tag: "quest", goal: 8, list: "guide" },
  { tag: "ending", goal: 2, list: "guide" },
];

const config: GuideConfig = {
  brand,
  layout: "article",
  chapters: [chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter7, chapter8, chapter9, chapter10],
  sources: [
    ["The walkthrough, chapter by chapter (Guide Lovers)", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/"],
    ["Walkthrough, Mini Medals and Secret Spots (RPG Site)", "https://www.rpgsite.net/guide/18688-dragon-quest-i-hd-2d-remake-walkthrough-where-to-go-all-mini-medals-secret-spots-step-by-step-guide"],
    ["Every Mini Medal and the Monarch’s prizes (Realm of Darkness)", "https://www.realmofdarkness.net/dq/hd2d-dq-medals/"],
    ["Every sparkly spot (Realm of Darkness)", "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"],
    ["Every Secret Spot (Realm of Darkness)", "https://www.realmofdarkness.net/dq/hd2d-dq-secret-spots/"],
    ["The game’s weapons, armour, shields, helmets and accessories (Gamer Guides)", "https://www.gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/database/dragon-quest-i"],
  ],
  categories: {
    route: ["Route steps", "Route", "compass"],
    story: ["Story", "Story", "book"],
    "key-item": ["Key items", "Key item", "unlock"],
    search: ["Searches", "Search", "chest"],
    "mini-medal": ["Mini Medals", "Mini Medal", "stamp", "amber"],
    "medal-prize": ["The Monarch’s prizes", "Monarch’s prize", "ribbon", "amber"],
    scroll: ["Scrolls", "Scroll", "scroll", "violet"],
    "secret-spot": ["Secret Spots", "Secret Spot", "pin", "mint"],
    sigil: ["Sigils", "Sigil", "gem", "sky"],
    recipe: ["Recipes", "Recipe", "flask", "clay"],
    equipment: ["Equipment", "Equipment", "shirt", "violet"],
    sparkle: ["Sparkly spots", "Sparkly spot", "star", "sky"],
    boss: ["Bosses", "Boss", "sword", "rose"],
    quest: ["Zalen’s quest", "Zalen’s quest", "music", "mint"],
    ending: ["Endings", "Ending", "flag", "rose"],
    outside: ["Separate saves", "Separate save", "fork"],
  },
  chips: {
    checklist: [
      ["scroll", "Scrolls"],
      ["boss", "Bosses"],
      ["mini-medal", "Mini Medals"],
      ["secret-spot", "Secret Spots"],
      ["equipment", "Equipment"],
      ["sparkle", "Sparkly spots"],
    ],
  },
  missables,
  questlines,
  reassurance,
  banners,
  completion: { board: targets, directions: ["route", "story", "key-item", "search"], outside: ["outside"] },
  state: {},
  text: {
    checklistIntro: "Search by medal, scroll, Secret Spot, equipment or place. Checks are shared with the walkthrough.",
    searchPlaceholder: "Search medals, scrolls, equipment or places",
    dashboardIntro: "100% is the game’s six fixed lists, from the 40 Mini Medals to the Craft-Master’s recipes, with the guide’s lists of equipment, sparkly spots, bosses, Zalen’s quest and endings beside them. The ending that needs a second save is tracked apart.",
    boardTitle: "Completion targets",
    boardNote:
      "Every target counts, each item once, so 100% is exactly when What’s left is empty. The game keeps no completion figure of its own. Its fixed lists are shown as the game’s: 40 Mini Medals, the Monarch’s 13 prizes, 22 scrolls, 15 Secret Spots, 5 sigils and 8 recipes. The equipment found in the world, the bosses, Zalen’s quest and the two endings one save reaches are the guide’s own lists, and so are the 48 sparkly spots until a second source confirms that total. The separate save is shown and left out of the bar.",
    nextUpDone: "Everything revealed is checked. Reveal the next chapter or check the totals on the Progress page.",
    backupBlurb: "Export a copy of your checks and spoiler settings.",
  },
};

export default config;

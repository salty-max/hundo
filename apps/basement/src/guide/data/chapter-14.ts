import type { RawChapter } from "@hundo/core/types";

export default {
  id: 14,
  title: "The Last Secrets",
  region: "Every floor",
  teaser: "The Last Secrets",
  intro: "The last secrets: Mega and the two mark totals, the Platinum Gods, and Dead God, which asks for every other secret and a full Collection page.",
  sources: [["The secrets, with their conditions (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Achievements"], ["The secrets on Steam", "https://steamcommunity.com/stats/250900/achievements"], ["A Dead God route for Repentance+ (Steam guide)", "https://steamcommunity.com/sharedfiles/filedetails/?id=3712501774"], ["The Collection page (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Collection_Page"]],
  groups: [
    {
      title: "The Collection page",
      rows: [
        ["route-collection-page", ["route"], "The Collection page: every item at least once", "Pick up every item at least once. Seeded runs, dailies, challenges and Victory Laps don’t fill the Collection page. The main menu’s Stats, then Items, shows what you’ve picked up. Advice: the record route says Dead God also needs Recall, the item Tainted Forgotten’s Birthright gives (chapter 12). It ends with a long Greed mode run as Azazel to pick up the items still missing."],
      ],
    },
    {
      title: "Items",
      rows: [
        ["item-mega", ["item", "secret"], "Unlock Mega", "Beat Mega Satan with every regular character; tainted ones aren’t needed."],
        ["item-mega-mush", ["item", "secret"], "Unlock Mega Mush", "Earn every Hard mark with all 17 regular characters (chapters 9 and 10)."],
        ["item-death-certificate", ["item", "secret"], "Unlock Death Certificate", "Earn every Hard mark with all 34 characters, tainted ones included (chapters 9 to 12)."],
      ],
    },
    {
      title: "Feats",
      rows: [
        ["feat-platinum-god", ["feat", "secret"], "!Platinum God!", "Pick up every item and unlock every secret and ending of Rebirth, the base game, apart from the Lost and his six unlocks."],
        ["feat-real-platinum-god", ["feat", "secret"], "The Real Platinum God", "Pick up every item and unlock every secret and ending of Rebirth, the base game, the Lost’s included."],
        ["feat-dead-god", ["feat", "secret"], "Dead God", "Unlock every other secret and pick up every item on the Collection page."],
      ],
    },
  ],
} satisfies RawChapter;

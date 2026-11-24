import type { RawChapter } from "@hundo/core/types";

export default {
  id: 14,
  title: "The Last Secrets",
  region: "Every floor",
  teaser: "Late game",
  intro: "The last secrets, the Collection page, and Dead God.",
  sources: [["The secrets, with their conditions (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Achievements"], ["The secrets on Steam", "https://steamcommunity.com/stats/250900/achievements"], ["A Dead God route for Repentance+ (Steam guide)", "https://steamcommunity.com/sharedfiles/filedetails/?id=3712501774"], ["The Collection page (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Collection_Page"]],
  groups: [
    {
      title: "Setting up the run",
      rows: [
        ["route-collection-page", ["route"], "The Collection page: every item at least once, never from seeded runs or challenges", "Every item counts once, picked up on a normal run: seeded runs, dailies and challenges don’t fill the Collection page. Recall counts too: pick up Birthright as Tainted Forgotten."],
      ],
    },
    {
      title: "Items",
      rows: [
        ["item-mega", ["item", "secret"], "Unlock Mega", "Beat Mega Satan as every character (except tainted characters)."],
        ["item-mega-mush", ["item", "secret"], "Unlock Mega Mush", "Earn all Hard mode Completion Marks for all non-Tainted characters."],
        ["item-death-certificate", ["item", "secret"], "Unlock Death Certificate", "Earn all Hard mode Completion Marks for all characters, including tainted ones."],
      ],
    },
    {
      title: "Feats",
      rows: [
        ["feat-platinum-god", ["feat", "secret"], "!Platinum God!", "Collect all non-DLC items, and unlock all non-DLC secrets and endings (minus The Lost and his 6 unlockable items)."],
        ["feat-real-platinum-god", ["feat", "secret"], "The Real Platinum God", "Collect all non-DLC items, and unlock all non-DLC secrets and endings."],
        ["feat-dead-god", ["feat", "secret"], "Dead God", "Unlock every other secret, and pick up every item at least once (the Collection page)."],
      ],
    },
  ],
} satisfies RawChapter;

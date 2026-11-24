import type { RawChapter } from "@hundo/core/types";

export default {
  id: 5,
  title: "Against the Clock",
  region: "Boss Rush · Blue Womb · The Void",
  teaser: "Boss Rush · Blue Womb · The Void",
  intro: "Two timers, then the Void. Fast runs open Boss Rush and Hush.",
  sources: [["The secrets, with their conditions (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Achievements"], ["The secrets on Steam", "https://steamcommunity.com/stats/250900/achievements"], ["A Dead God route for Repentance+ (Steam guide)", "https://steamcommunity.com/sharedfiles/filedetails/?id=3712501774"], ["Boss Rush and its timer (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Boss_Rush"], ["The Forgotten (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/The_Forgotten"]],
  groups: [
    {
      title: "Setting up the run",
      rows: [
        ["route-boss-rush-timer", ["route"], "Boss Rush: beat Mom inside the time limit (20 minutes; 25 through the Mausoleum)", "Beat Mom in the Depths inside the time limit and a door opens beside her exit: Boss Rush. Leaving her room late closes it."],
        ["route-broken-shovel", ["route"], "The Broken Shovel: beat the first boss inside a minute, then bomb the start room", "Once the Lamb has fallen, beat the first floor’s boss inside a minute, then bomb the starting room for the Broken Shovel. Hold it while you clear Boss Rush (its time limit doesn’t apply) for the second piece."],
        ["route-hush-timer", ["route"], "Hush: reach the Blue Womb by beating Mom’s Heart or It Lives! inside the time limit", "Beat Mom’s Heart or It Lives! inside the time limit and a way opens to the Blue Womb, where Hush waits."],
      ],
    },
    {
      title: "Floors and bosses",
      rows: [
        ["area-new-area", ["area", "secret"], "New Area", "Beat Hush."],
        ["area-a-secret-exit", ["area", "secret"], "A Secret Exit", "Beat Hush 3 times."],
      ],
    },
    {
      title: "Characters",
      rows: [
        ["character-the-forgotten", ["character", "secret"], "Unlock The Forgotten", "With the two pieces of the Broken Shovel joined into Mom’s Shovel, dig the dirt patch in the Dark Room’s grave room.", { requires: ["route-broken-shovel"] }],
      ],
    },
    {
      title: "Items",
      rows: [
        ["item-delirious", ["item", "secret"], "Unlock Delirious", "Beat Delirium."],
        ["item-lil-delirium", ["item", "secret"], "Unlock Lil Delirium", "Beat Delirium for the 1st time."],
      ],
    },
    {
      title: "Cards, runes and pickups",
      rows: [
        ["pickup-bone-heart", ["pickup", "secret"], "Unlock Bone Heart", "Unlock the Forgotten."],
      ],
    },
  ],
} satisfies RawChapter;

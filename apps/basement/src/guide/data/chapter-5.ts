import type { RawChapter } from "@hundo/core/types";

const WIKI = "https://bindingofisaacrebirth.wiki.gg/wiki/Achievements";
const WG = "https://bindingofisaacrebirth.wiki.gg/wiki/";
const ROUTE = "https://steamcommunity.com/sharedfiles/filedetails/?id=3712501774";

export default {
  id: 5,
  title: "Against the Clock",
  region: "Boss Rush · Blue Womb · The Void",
  teaser: "Boss Rush · Blue Womb",
  intro: "Two races against the run’s clock. Beat Mom fast and Boss Rush opens; beat Mom’s Heart or It Lives! fast and the way down to the Blue Womb opens, where Hush waits. Hush’s fall opens the Void and, at three wins, a second way down. Last, a one-run errand for the Forgotten.",
  sources: [
    ["The secrets, with their conditions (wiki)", WIKI],
    ["Boss Rush and its timer (wiki)", WG + "Boss_Rush"],
    ["The Blue Womb (wiki)", WG + "%3F%3F%3F_(Floor)"],
    ["The Void (wiki)", WG + "The_Void"],
    ["The Forgotten (wiki)", WG + "The_Forgotten"],
    ["A Dead God route for Repentance+ (Steam guide)", ROUTE],
  ],
  groups: [
    {
      title: "Boss Rush and the Blue Womb",
      location: "Depths · Womb",
      note: "Both doors depend on the run’s own timer, and a fast enough run can take both.",
      sources: [
        ["Boss Rush and its timer (wiki)", WG + "Boss_Rush"],
        ["The Blue Womb (wiki)", WG + "%3F%3F%3F_(Floor)"],
        ["The secrets, with their conditions (wiki)", WIKI],
      ],
      rows: [
        ["route-boss-rush-timer", ["route"], "Open Boss Rush: beat Mom before 20 minutes", "Beat Mom in Depths II before the run’s clock reaches 20 minutes and a door opens in her room to Boss Rush: one room where bosses come in waves, 30 of them. If you step into a Devil Room after her, come back before 20 minutes or the door shuts."],
        ["route-hush-timer", ["route"], "Open the Blue Womb: beat Mom’s Heart before 30 minutes", "Beat Mom’s Heart or It Lives! before the run’s timer reaches 30 minutes and a way down to the Blue Womb opens, where Hush waits at the end. Leaving and coming back into the room after 30 minutes makes it disappear.", { requires: ["area-blue-womb"] }],
        ["area-new-area", ["area", "secret"], "Beat Hush: the Void opens", "Beat Hush once. The first time, a giant golden chest appears, and the Void is unlocked from then on."],
        ["area-a-secret-exit", ["area", "secret"], "Beat Hush 3 times: A Secret Exit", "Your third win over Hush opens a second way down: a locked door in the boss room of Basement I or II, the start of chapter 7."],
      ],
    },
    {
      title: "The Void",
      location: "The Void",
      note: "The Void is one large floor with many boss rooms, and one of them always holds Delirium, its main boss. Once it’s unlocked, a portal to it can open after any major boss from Mom on, and on Repentance+ beating ???, the Lamb, Mega Satan or Mother (chapter 7) always opens one.",
      sources: [
        ["The Void (wiki)", WG + "The_Void"],
        ["Delirium (wiki)", WG + "Delirium"],
      ],
      rows: [
        ["item-lil-delirium", ["item", "secret"], "Unlock Lil Delirium", "Beat Delirium for the first time, with any character."],
        ["item-delirious", ["item", "secret"], "Unlock Delirious", "Comes on the same first win over Delirium."],
      ],
    },
    {
      title: "The Forgotten",
      location: "Basement · Dark Room",
      note: "All of this is one run, on either difficulty, once the Lamb has fallen and the Negative is unlocked. While you hold the Broken Shovel, Mom’s foot keeps trying to stomp you, so keep moving.",
      sources: [
        ["The Forgotten (wiki)", WG + "The_Forgotten"],
        ["A Dead God route for Repentance+ (Steam guide)", ROUTE],
      ],
      rows: [
        ["route-broken-shovel", ["route"], "Get the Broken Shovel and finish it in Boss Rush", "Start a new run without a chosen seed and beat Basement I’s boss before the clock reaches one minute; then set a bomb anywhere in the starting room and the Broken Shovel appears. Keep it to Depths II: there Mom drops only the Negative, so take it, and Boss Rush opens whatever the time. Clear Boss Rush holding the shovel for its second piece: the two make Mom’s Shovel.", { requires: ["item-the-negative", "area-the-gate-is-open"] }],
        ["character-the-forgotten", ["character", "secret"], "Unlock The Forgotten", "Same run: the shovel keeps the Cathedral’s beam away, so go down to Sheol, beat Satan and touch his chest with the Negative to reach the Dark Room. Find the grave room with a dirt patch in its centre, stand on the patch and use Mom’s Shovel, and stay until the soul rises.", { requires: ["route-broken-shovel"] }],
        ["pickup-bone-heart", ["pickup", "secret"], "Unlock Bone Heart", "Comes with the Forgotten."],
      ],
    },
  ],
} satisfies RawChapter;

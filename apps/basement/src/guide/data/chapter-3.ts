import type { RawChapter } from "@hundo/core/types";

const WIKI = "https://bindingofisaacrebirth.wiki.gg/wiki/Achievements";
const ROUTE = "https://steamcommunity.com/sharedfiles/filedetails/?id=3712501774";
const CHALLENGES = "https://bindingofisaacrebirth.wiki.gg/wiki/Challenges";

export default {
  id: 3,
  title: "Cathedral and Sheol",
  region: "Cathedral · Sheol",
  teaser: "Cathedral · Sheol",
  intro: "Isaac waits at the top of the Cathedral and Satan at the bottom of Sheol. Beat each five times, for the Polaroid and the Negative.",
  sources: [
    ["The secrets, with their conditions (wiki)", WIKI],
    ["Cathedral (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Cathedral"],
    ["Sheol (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Sheol"],
    ["A Dead God route for Repentance+ (Steam guide)", ROUTE],
  ],
  groups: [
    {
      title: "Isaac and Satan, five times each",
      location: "Cathedral · Sheol",
      note: "It Lives! always leaves a beam of light up to the Cathedral and a trapdoor down to Sheol, so each run picks one. Ehwaz (chapter 1’s Head Trauma reward) used in Womb II makes a trapdoor that always leads to Sheol. Advice: the record route finds the Polaroid the harder of the two, goes down to Sheol with Ehwaz or We Need To Go Deeper! when a run is after Satan, and avoids Devil Rooms until the Polaroid is unlocked.",
      sources: [
        ["Cathedral (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Cathedral"],
        ["Sheol (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Sheol"],
        ["A Dead God route for Repentance+ (Steam guide)", ROUTE],
        ["The Polaroid (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/The_Polaroid"],
        ["The Negative (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/The_Negative"],
        ["Ehwaz (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Ehwaz"],
      ],
      rows: [
        ["character-judas", ["character", "secret"], "Unlock Judas", "Beat Satan in Sheol once."],
        ["item-the-polaroid", ["item", "secret"], "Unlock The Polaroid", "Beat Isaac in the Cathedral 5 times. From then on the Polaroid drops when you beat Mom. Hold it when you beat Isaac and touch the chest he leaves to go on to the Chest (chapter 4)."],
        ["item-the-negative", ["item", "secret"], "Unlock The Negative", "Beat Satan in Sheol 5 times. From then on the Negative drops beside the Polaroid when you beat Mom: you keep one, and the other disappears. Hold it when you beat Satan and touch the chest he leaves to go on to the Dark Room (chapter 4)."],
        ["area-something-icky", ["area", "secret"], "Unlock Something Icky", "Beat Isaac 10 times: a new boss joins the Womb."],
      ],
    },
    {
      title: "Challenges they open",
      note: "Each row that opens a challenge comes before the row for winning it. BRAINS! and PONG end at ???, the Chest’s boss.",
      sources: [
        ["Challenges (wiki)", CHALLENGES],
        ["The secrets, with their conditions (wiki)", WIKI],
      ],
      rows: [
        ["challenge-onans-streak", ["challenge", "secret"], "Open the challenge Onan’s Streak", "Opened once Judas and It Lives! are both unlocked."],
        ["item-kidney-stone", ["item", "secret"], "Unlock Kidney Stone", "Challenge #29, Onan’s Streak: Judas with Chocolate Milk, where a missed shot costs half a heart. Beat Isaac."],
        ["challenge-brains", ["challenge", "secret"], "Open the challenge BRAINS!", "Opened by your fifth win over Isaac."],
        ["trinket-stud-finder", ["trinket", "secret"], "Unlock Stud Finder", "Challenge #27, BRAINS!: ??? with three Bob’s Brains and Thunder Thighs. Beat ???, the Chest’s boss (chapter 4)."],
        ["challenge-pong", ["challenge", "secret"], "Open the challenge PONG", "Opened by your fifth win over Isaac."],
        ["item-greeds-gullet", ["item", "secret"], "Unlock Greed’s Gullet", "Challenge #35, PONG: Isaac with Cupid’s Arrow and Rubber Cement. Beat ???, the Chest’s boss (chapter 4)."],
      ],
    },
  ],
} satisfies RawChapter;

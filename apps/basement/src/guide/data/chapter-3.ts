import type { RawChapter } from "@hundo/core/types";

export default {
  id: 3,
  title: "Cathedral and Sheol",
  region: "Cathedral · Sheol",
  teaser: "Cathedral · Sheol",
  intro: "Beat Isaac and Satan five times each, for the Polaroid and the Negative.",
  sources: [["The secrets, with their conditions (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Achievements"], ["The secrets on Steam", "https://steamcommunity.com/stats/250900/achievements"], ["Item unlocks (Platinum God)", "https://tboi.com/repentance"]],
  groups: [
    {
      title: "Isaac and Satan, five times each",
      rows: [
        ["character-judas", ["character", "secret"], "Unlock Judas", "Beat Satan."],
        ["item-the-polaroid", ["item", "secret"], "Unlock The Polaroid", "Beat Isaac 5 times."],
        ["item-the-negative", ["item", "secret"], "Unlock The Negative", "Beat Satan 5 times."],
        ["area-something-icky", ["area", "secret"], "Something Icky", "Beat Isaac 10 times."],
      ],
    },
    {
      title: "Challenges you can open now",
      rows: [
        ["challenge-onans-streak", ["challenge", "secret"], "Open the challenge Onan’s Streak", "Unlock Judas and It Lives!"],
        ["challenge-brains", ["challenge", "secret"], "Open the challenge BRAINS!", "Beat Isaac 5 times."],
        ["challenge-pong", ["challenge", "secret"], "Open the challenge PONG", "Beat Isaac 5 times."],
        ["trinket-stud-finder", ["trinket", "secret"], "Unlock Stud Finder", "Complete BRAINS! (challenge #27)."],
        ["item-kidney-stone", ["item", "secret"], "Unlock Kidney Stone", "Complete Onan’s Streak (challenge #29)."],
        ["item-greeds-gullet", ["item", "secret"], "Unlock Greed’s Gullet", "Complete Pong (challenge #35)."],
      ],
    },
  ],
} satisfies RawChapter;

import type { RawChapter } from "@hundo/core/types";

export default {
  id: 4,
  title: "The Chest and the Dark Room",
  region: "The Chest · Dark Room",
  teaser: "The Chest · Dark Room",
  intro: "The Polaroid opens the Chest and the Negative the Dark Room. The angels’ key pieces open Mega Satan.",
  sources: [["The secrets, with their conditions (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Achievements"], ["The secrets on Steam", "https://steamcommunity.com/stats/250900/achievements"], ["A Dead God route for Repentance+ (Steam guide)", "https://steamcommunity.com/sharedfiles/filedetails/?id=3712501774"], ["Item unlocks (Platinum God)", "https://tboi.com/repentance"], ["Angels and their key pieces (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Angel"], ["Mega Satan and the Golden Gate (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Mega_Satan"]],
  groups: [
    {
      title: "Floors and bosses",
      rows: [
        ["area-the-gate-is-open", ["area", "secret"], "The gate is open!", "Beat The Lamb."],
        ["area-angels", ["area", "secret"], "Angels", "Complete Chapter 6."],
      ],
    },
    {
      title: "Items",
      rows: [
        ["item-dead-boy", ["item", "secret"], "Unlock Dead Boy", "Complete Chapter 6 without taking damage."],
        ["route-key-pieces", ["route"], "The two key pieces: Uriel and Gabriel from angel statues or the Sacrifice Room", "Uriel and Gabriel, the angels, each drop a key piece: they come from angel statues and from the Sacrifice Room."],
        ["item-dads-key", ["item", "secret"], "Unlock Dad’s Key", "Pick up both Key Pieces from the Angels in one run."],
      ],
    },
    {
      title: "Trinkets",
      rows: [
        ["trinket-missing-poster", ["trinket", "secret"], "Unlock Missing Poster", "Beat The Lamb as Isaac. Either difficulty."],
        ["trinket-filigree-feather", ["trinket", "secret"], "Unlock Filigree Feather", "Acquire both Key Piece 1 and Key Piece 2."],
      ],
    },
    {
      title: "Feats",
      rows: [
        ["feat-golden-god", ["feat", "secret"], "Golden God!", "Beat ??? and The Lamb."],
      ],
    },
    {
      title: "Setting up the run",
      rows: [
        ["route-golden-gate", ["route"], "The Golden Gate after the Chest or the Dark Room", "With both key pieces, the Golden Gate past the Chest or the Dark Room opens on Mega Satan."],
      ],
    },
    {
      title: "Characters",
      rows: [
        ["character-the-lost", ["character", "secret"], "Unlock The Lost", "Find the Missing Poster in a run, then die in a Sacrifice Room while holding it.", { requires: ["trinket-missing-poster"] }],
        ["character-apollyon", ["character", "secret"], "Unlock Apollyon", "Beat Mega Satan."],
      ],
    },
    {
      title: "Challenges you can open now",
      rows: [
        ["challenge-the-family-man", ["challenge", "secret"], "Open the challenge The Family Man", "Pick up both Key Pieces from the Angels in one run and defeat Mom’s Heart 11 times."],
        ["item-epic-fetus", ["item", "secret"], "Unlock Epic Fetus", "Complete The Family Man (challenge #19)."],
        ["challenge-i-rule", ["challenge", "secret"], "Open the challenge I RULE!", "Beat Mega Satan and unlock The Negative."],
        ["challenge-backasswards", ["challenge", "secret"], "Open the challenge Backasswards", "Beat Mega Satan and unlock The Negative."],
        ["challenge-ultra-hard", ["challenge", "secret"], "Open the challenge Ultra Hard", "Beat Mega Satan and unlock The Negative."],
        ["start-laz-bleeds-more", ["start", "secret"], "Unlock Laz Bleeds More!", "Complete Backasswards (challenge #31)."],
        ["start-samson-feels-healthy", ["start", "secret"], "Unlock Samson Feels Healthy!", "Complete Ultra Hard (challenge #34)."],
        ["trinket-poker-chip", ["trinket", "secret"], "Unlock Poker Chip", "Complete I RULE! (challenge #26)."],
      ],
    },
  ],
} satisfies RawChapter;

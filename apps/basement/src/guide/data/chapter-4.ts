import type { RawChapter } from "@hundo/core/types";

const WIKI = "https://bindingofisaacrebirth.wiki.gg/wiki/Achievements";
const ROUTE = "https://steamcommunity.com/sharedfiles/filedetails/?id=3712501774";
const CHALLENGES = "https://bindingofisaacrebirth.wiki.gg/wiki/Challenges";
const MEGA = "https://bindingofisaacrebirth.wiki.gg/wiki/Mega_Satan";
const ANGEL = "https://bindingofisaacrebirth.wiki.gg/wiki/Angel";

export default {
  id: 4,
  title: "The Chest and the Dark Room",
  region: "The Chest · Dark Room",
  teaser: "The Chest · Dark Room",
  intro: "Beat Mom and keep the Polaroid or the Negative she drops: with the Polaroid, the chest Isaac leaves takes you to the Chest, and with the Negative, Satan’s takes you to the Dark Room. Beat ??? and the Lamb at their ends, then take the angels’ key pieces to Mega Satan.",
  sources: [
    ["The secrets, with their conditions (wiki)", WIKI],
    ["Mega Satan and the Golden Gate (wiki)", MEGA],
    ["Angels and their key pieces (wiki)", ANGEL],
    ["A Dead God route for Repentance+ (Steam guide)", ROUTE],
    ["Item unlocks (Platinum God)", "https://tboi.com/repentance"],
  ],
  groups: [
    {
      title: "??? and the Lamb",
      location: "Chest · Dark Room",
      note: "??? waits at the end of the Chest and the Lamb at the end of the Dark Room. A Sacrifice Room has spikes in its centre, and each step on them costs you a heart and counts as a sacrifice. Past the 12th, each further sacrifice has a 50% chance to take you down to the Dark Room, without the Negative.",
      sources: [
        ["The Chest (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Chest_(Floor)"],
        ["Dark Room (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Dark_Room"],
        ["Mega Satan and the Golden Gate (wiki)", MEGA],
        ["Portal (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Portal"],
        ["Sacrifice Room (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Sacrifice_Room"],
        ["The Polaroid (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/The_Polaroid"],
      ],
      rows: [
        ["area-angels", ["area", "secret"], "Unlock the angels", "Beat ??? or the Lamb once. From then on the angels Uriel and Gabriel can be fought."],
        ["area-the-gate-is-open", ["area", "secret"], "Unlock The gate is open! (Portals)", "Beat the Lamb once: new enemies, Portals, start to appear."],
        ["feat-golden-god", ["feat", "secret"], "Golden God!: beat ??? and the Lamb", "Beat both ??? and the Lamb, in any runs."],
        ["item-dead-boy", ["item", "secret"], "Unlock Dead Boy", "Clear the Chest or the Dark Room without taking any damage."],
      ],
    },
    {
      title: "Missing Poster, then the Lost",
      location: "Dark Room",
      note: "Advice: once the Missing Poster drops, the record route stops playing that run for a win, however good it is, and heads for the nearest Sacrifice Room to die there holding it.",
      sources: [
        ["The secrets, with their conditions (wiki)", WIKI],
        ["A Dead God route for Repentance+ (Steam guide)", ROUTE],
        ["The Lost (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/The_Lost"],
      ],
      rows: [
        ["trinket-missing-poster", ["trinket", "secret"], "Unlock Missing Poster", "Beat the Lamb as Isaac, on either difficulty. The trinket then turns up in runs."],
        ["character-the-lost", ["character", "secret"], "Unlock The Lost", "Find the Missing Poster in a run, then die in a Sacrifice Room while holding it: step on the spikes until they kill you. The Lost has no health: any hit ends the run.", { requires: ["trinket-missing-poster"] }],
      ],
    },
    {
      title: "Mega Satan",
      location: "Chest · Dark Room",
      note: "Mega Satan waits behind the Golden Gate in the first room of the Chest and of the Dark Room, once ??? or the Lamb has fallen. Dad’s Key or a Get out of Jail Free Card (chapter 1’s SPEED! reward) also open the gate.",
      sources: [
        ["Mega Satan and the Golden Gate (wiki)", MEGA],
        ["Angels and their key pieces (wiki)", ANGEL],
      ],
      rows: [
        ["route-key-pieces", ["route"], "Win both key pieces from the angels", "In one run: bomb an angel statue in an Angel Room to bring out an angel, or step on a Sacrifice Room’s spikes: the 9th time brings Uriel and the 11th Gabriel. Uriel drops Key Piece 1 and Gabriel Key Piece 2, and the two make the Golden Key."],
        ["item-dads-key", ["item", "secret"], "Unlock Dad’s Key", "Pick up both key pieces in one run."],
        ["trinket-filigree-feather", ["trinket", "secret"], "Unlock Filigree Feather", "Comes at the same moment as Dad’s Key, from holding both key pieces."],
        ["route-golden-gate", ["route"], "Open the Golden Gate", "Carry the Golden Key into the Chest or the Dark Room and the gate in its first room opens by itself."],
        ["character-apollyon", ["character", "secret"], "Unlock Apollyon", "Beat Mega Satan, with any character."],
      ],
    },
    {
      title: "Challenges they open",
      note: "Each row that opens a challenge comes before the row for winning it. Advice: play Ultra Hard soon. The record route plays it before its 16th win over Mom’s Heart and It Lives! together, since that win starts bringing harder versions of the floors into runs.",
      sources: [
        ["Challenges (wiki)", CHALLENGES],
        ["A Dead God route for Repentance+ (Steam guide)", ROUTE],
      ],
      rows: [
        ["challenge-the-family-man", ["challenge", "secret"], "Open the challenge The Family Man", "Opened by picking up both key pieces in one run, once you have 11 Mom’s Heart wins."],
        ["item-epic-fetus", ["item", "secret"], "Unlock Epic Fetus", "Challenge #19, The Family Man: Isaac with Dad’s Key, Sister Maggy, Brother Bobby, Rotten Baby and BFFS!. Beat Isaac in the Cathedral."],
        ["challenge-i-rule", ["challenge", "secret"], "Open the challenge I RULE!", "Opened by beating Mega Satan once the Negative is unlocked."],
        ["trinket-poker-chip", ["trinket", "secret"], "Unlock Poker Chip", "Challenge #26, I RULE!: Isaac with Mom’s Knife, Trinity Shield, The Boomerang, The Ladder and both key pieces. Beat Mega Satan."],
        ["challenge-backasswards", ["challenge", "secret"], "Open the challenge Backasswards", "Opened by beating Mega Satan once the Negative is unlocked."],
        ["start-laz-bleeds-more", ["start", "secret"], "Unlock Laz Bleeds More!", "Challenge #31, Backasswards: Isaac starts at the Mega Satan fight and climbs the floors in reverse, back to the first. From then on Lazarus starts with Anemic."],
        ["challenge-ultra-hard", ["challenge", "secret"], "Open the challenge Ultra Hard", "Opened by beating Mega Satan once the Negative is unlocked."],
        ["start-samson-feels-healthy", ["start", "secret"], "Unlock Samson Feels Healthy!", "Challenge #34, Ultra Hard: Isaac with both key pieces, every enemy a champion and no hearts to pick up. Beat Mega Satan. From then on Samson starts with Child’s Heart."],
      ],
    },
  ],
} satisfies RawChapter;

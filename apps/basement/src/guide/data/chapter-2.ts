import type { RawChapter } from "@hundo/core/types";

export default {
  id: 2,
  title: "The Womb",
  region: "The Womb",
  teaser: "The Womb",
  intro: "Mom’s Heart, again and again: each win counts, and the eleventh turns her into It Lives!",
  sources: [["The secrets, with their conditions (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Achievements"], ["The secrets on Steam", "https://steamcommunity.com/stats/250900/achievements"], ["Item unlocks (Platinum God)", "https://tboi.com/repentance"]],
  groups: [
    {
      title: "Mom’s Heart, win after win",
      rows: [
        ["character-eden", ["character", "secret"], "Unlock Eden", "Complete Chapter 4."],
        ["character-bethany", ["character", "secret"], "Unlock Bethany", "Beat Mom’s Heart or It Lives! on Hard as Lazarus, without dying at all."],
        ["item-rubber-cement", ["item", "secret"], "Unlock Rubber Cement", "Beat Mom’s Heart 2 times."],
        ["item-a-noose", ["item", "secret"], "Unlock A Noose", "Beat Mom’s Heart 3 times."],
        ["item-wire-coat-hanger", ["item", "secret"], "Unlock Wire Coat Hanger", "Beat Mom’s Heart 4 times."],
        ["item-everything-is-terrible", ["item", "secret"], "Unlock Everything Is Terrible!!!", "Beat Mom’s Heart 5 times."],
        ["item-ipecac", ["item", "secret"], "Unlock Ipecac", "Beat Mom’s Heart 6 times."],
        ["item-experimental-treatment", ["item", "secret"], "Unlock Experimental Treatment", "Beat Mom’s Heart 7 times."],
        ["item-a-quarter", ["item", "secret"], "Unlock A Quarter", "Beat Mom’s Heart 8 times."],
        ["item-a-fetus-in-a-jar", ["item", "secret"], "Unlock A Fetus in a Jar", "Beat Mom’s Heart 9 times."],
        ["character-blue-baby", ["character", "secret"], "Unlock ???", "Beat Mom’s Heart 10 times."],
        ["area-blue-womb", ["area", "secret"], "Blue Womb", "Beat Mom’s Heart 10 times."],
        ["area-it-lives", ["area", "secret"], "It Lives!", "Beat Mom’s Heart 11 times."],
        ["area-burning-basement", ["area", "secret"], "Burning Basement", "Beat Mom’s Heart 11 times."],
      ],
    },
    {
      title: "Challenges you can open now",
      rows: [
        ["challenge-bloody-mary", ["challenge", "secret"], "Open the challenge Bloody Mary", "Unlock Bethany, Blood Bag, and It Lives!"],
        ["trinket-sigil-of-baphomet", ["trinket", "secret"], "Unlock Sigil of Baphomet", "Complete Bloody Mary (challenge #37)."],
        ["challenge-solar-system", ["challenge", "secret"], "Open the challenge Solar System", "Beat Mom’s Heart 3 times."],
        ["challenge-demo-man", ["challenge", "secret"], "Open the challenge Demo Man", "Beat Mom’s Heart 9 times."],
        ["challenge-suicide-king", ["challenge", "secret"], "Open the challenge Suicide King", "Beat Mom’s Heart 11 times and unlock Lazarus."],
        ["challenge-pokey-mans", ["challenge", "secret"], "Open the challenge Pokey Mans", "Beat Mom’s Heart 11 times."],
        ["pickup-rune-of-perthro", ["pickup", "secret"], "Unlock Rune of Perthro", "Complete Solar System (challenge #6)."],
        ["pickup-chaos-card", ["pickup", "secret"], "Unlock Chaos Card", "Complete Demo Man (challenge #9)."],
        ["pickup-suicide-king", ["pickup", "secret"], "Unlock Suicide King", "Complete Suicide King (challenge #7)."],
        ["pickup-charged-key", ["pickup", "secret"], "Unlock Charged Key", "Complete Pokey Mans (challenge #33)."],
      ],
    },
  ],
} satisfies RawChapter;

import type { RawChapter } from "@hundo/core/types";

export default {
  id: 7,
  title: "The Other Way Down",
  region: "Downpour · Mines · Mausoleum · Corpse",
  teaser: "Late game",
  intro: "The other way down, to Mother.",
  sources: [["The secrets, with their conditions (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Achievements"], ["The secrets on Steam", "https://steamcommunity.com/stats/250900/achievements"], ["A Dead God route for Repentance+ (Steam guide)", "https://steamcommunity.com/sharedfiles/filedetails/?id=3712501774"], ["The Corpse and the knife pieces (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Corpse"]],
  groups: [
    {
      title: "Setting up the run",
      rows: [
        ["route-knife-pieces", ["route"], "The two knife pieces: Downpour/Dross II, then Mines/Ashpit II", "Take the hidden door to Downpour, then the Mines: each holds a knife piece, and the knife opens the way to the Corpse."],
      ],
    },
    {
      title: "Floors and bosses",
      rows: [
        ["area-dross", ["area", "secret"], "Dross", "Beat all bosses in Downpour."],
        ["area-ashpit", ["area", "secret"], "Ashpit", "Beat all bosses in Mines."],
        ["area-gehenna", ["area", "secret"], "Gehenna", "Beat all bosses in Mausoleum."],
        ["area-a-strange-door", ["area", "secret"], "A Strange Door", "Beat Mother."],
      ],
    },
    {
      title: "Characters",
      rows: [
        ["character-jacob-and-esau", ["character", "secret"], "Unlock Jacob and Esau", "Beat Mother."],
      ],
    },
    {
      title: "Items",
      rows: [
        ["item-brimstone-bombs", ["item", "secret"], "Unlock Brimstone Bombs", "After breaking Hornfel’s minecart, kill him before he can escape."],
      ],
    },
    {
      title: "Trinkets",
      rows: [
        ["trinket-forgotten-lullaby", ["trinket", "secret"], "Unlock Forgotten Lullaby", "Blow up The Siren’s skull after defeating her."],
      ],
    },
    {
      title: "Cards, runes and pickups",
      rows: [
        ["pickup-rotten-heart", ["pickup", "secret"], "Unlock Rotten Heart", "Enter Corpse for the first time."],
      ],
    },
    {
      title: "Challenges you can open now",
      rows: [
        ["challenge-isaacs-awakening", ["challenge", "secret"], "Open the challenge Isaac’s Awakening", "Beat Mother."],
        ["challenge-seeing-double", ["challenge", "secret"], "Open the challenge Seeing Double", "Beat Mother."],
        ["item-spirit-sword", ["item", "secret"], "Unlock Spirit Sword", "Complete Isaac’s Awakening (challenge #39)."],
        ["trinket-broken-glasses", ["trinket", "secret"], "Unlock Broken Glasses", "Complete Seeing Double (challenge #40)."],
      ],
    },
  ],
} satisfies RawChapter;

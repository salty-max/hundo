import type { RawChapter } from "@hundo/core/types";

export default {
  id: 8,
  title: "Home",
  region: "The Ascent · Home",
  teaser: "Late game",
  intro: "Home, and a closet for every character.",
  sources: [["The secrets, with their conditions (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Achievements"], ["The secrets on Steam", "https://steamcommunity.com/stats/250900/achievements"], ["A Dead God route for Repentance+ (Steam guide)", "https://steamcommunity.com/sharedfiles/filedetails/?id=3712501774"], ["The Ascent (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Ascent"], ["Tainted characters (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Tainted_Characters"]],
  groups: [
    {
      title: "Setting up the run",
      rows: [
        ["route-dads-note", ["route"], "The strange door in Depths II, then Dad’s Note", "Once Mother has fallen, a strange door waits in the first room of Depths II: give it the Polaroid or the Negative. It leads to a Mausoleum II whose Dad’s Note starts the Ascent."],
        ["item-red-key", ["item", "secret"], "Unlock Red Key", "Open Mom’s Chest in Home."],
        ["route-cracked-key", ["route"], "A trinket left on the way down becomes a Cracked Key", "Leave a trinket in a Treasure or Boss Room on the way down; on the Ascent it waits in that same room as a Cracked Key. Carry it Home for the closet."],
      ],
    },
    {
      title: "Characters",
      rows: [
        ["character-tainted-isaac", ["character", "secret"], "Unlock Tainted Isaac (The Broken)", "Use Red Key (etc.) to open the hidden closet in Home as Isaac."],
        ["character-tainted-magdalene", ["character", "secret"], "Unlock Tainted Magdalene (The Dauntless)", "Use Red Key (etc.) to open the hidden closet in Home as Magdalene."],
        ["character-tainted-cain", ["character", "secret"], "Unlock Tainted Cain (The Hoarder)", "Use Red Key (etc.) to open the hidden closet in Home as Cain."],
        ["character-tainted-judas", ["character", "secret"], "Unlock Tainted Judas (The Deceiver)", "Use Red Key (etc.) to open the hidden closet in Home as Judas."],
        ["character-tainted-blue-baby", ["character", "secret"], "Unlock Tainted ??? (The Soiled)", "Use Red Key (etc.) to open the hidden closet in Home as ???"],
        ["character-tainted-eve", ["character", "secret"], "Unlock Tainted Eve (The Curdled)", "Use Red Key (etc.) to open the hidden closet in Home as Eve."],
        ["character-tainted-samson", ["character", "secret"], "Unlock Tainted Samson (The Savage)", "Use Red Key (etc.) to open the hidden closet in Home as Samson."],
        ["character-tainted-azazel", ["character", "secret"], "Unlock Tainted Azazel (The Benighted)", "Use Red Key (etc.) to open the hidden closet in Home as Azazel."],
        ["character-tainted-lazarus", ["character", "secret"], "Unlock Tainted Lazarus (The Enigma)", "Use Red Key (etc.) to open the hidden closet in Home as Lazarus."],
        ["character-tainted-eden", ["character", "secret"], "Unlock Tainted Eden (The Capricious)", "Use Red Key (etc.) to open the hidden closet in Home as Eden."],
        ["character-tainted-lost", ["character", "secret"], "Unlock Tainted Lost (The Baleful)", "Use Red Key (etc.) to open the hidden closet in Home as the Lost."],
        ["character-tainted-lilith", ["character", "secret"], "Unlock Tainted Lilith (The Harlot)", "Use Red Key (etc.) to open the hidden closet in Home as Lilith."],
        ["character-tainted-keeper", ["character", "secret"], "Unlock Tainted Keeper (The Miser)", "Use Red Key (etc.) to open the hidden closet in Home as Keeper."],
        ["character-tainted-apollyon", ["character", "secret"], "Unlock Tainted Apollyon (The Empty)", "Use Red Key (etc.) to open the hidden closet in Home as Apollyon."],
        ["character-tainted-forgotten", ["character", "secret"], "Unlock Tainted Forgotten (The Fettered)", "Use Red Key (etc.) to open the hidden closet in Home as the Forgotten."],
        ["character-tainted-bethany", ["character", "secret"], "Unlock Tainted Bethany (The Zealot)", "Use Red Key (etc.) to open the hidden closet in Home as Bethany."],
        ["character-tainted-jacob", ["character", "secret"], "Unlock Tainted Jacob (The Deserter)", "Use Red Key (etc.) to open the hidden closet in Home as Jacob & Esau."],
      ],
    },
    {
      title: "Challenges you can open now",
      rows: [
        ["challenge-hot-potato", ["challenge", "secret"], "Open the challenge Hot Potato", "Unlock Tainted Forgotten."],
        ["challenge-cantripped", ["challenge", "secret"], "Open the challenge Cantripped!", "Unlock Tainted Cain."],
        ["challenge-red-redemption", ["challenge", "secret"], "Open the challenge Red Redemption", "Unlock Tainted Jacob."],
        ["challenge-delete-this", ["challenge", "secret"], "Open the challenge DELETE THIS", "Unlock Tainted Eden."],
        ["pickup-the-chariot", ["pickup", "secret"], "Unlock VII - The Chariot?", "Complete Hot Potato (challenge #42)."],
        ["pickup-justice", ["pickup", "secret"], "Unlock VIII - Justice?", "Complete Cantripped (challenge #43)."],
        ["pickup-the-hermit", ["pickup", "secret"], "Unlock IX - The Hermit?", "Complete Red Redemption (challenge #44)."],
        ["pickup-temperance", ["pickup", "secret"], "Unlock XIV - Temperance?", "Complete DELETE THIS (challenge #45)."],
      ],
    },
  ],
} satisfies RawChapter;

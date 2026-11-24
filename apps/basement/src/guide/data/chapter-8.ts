import type { RawChapter } from "@hundo/core/types";

const WIKI = "https://bindingofisaacrebirth.wiki.gg/wiki/Achievements";
const WG = "https://bindingofisaacrebirth.wiki.gg/wiki/";
const ROUTE = "https://steamcommunity.com/sharedfiles/filedetails/?id=3712501774";
const CHALLENGES = WG + "Challenges";

export default {
  id: 8,
  title: "Home",
  region: "The Ascent · Home",
  intro: "Past Mother, a strange door in Depths II leads to Dad’s Note and the Ascent, back up through every floor to Home. Its closet holds a tainted version of whoever you bring: seventeen trips, one each.",
  sources: [
    ["The secrets, with their conditions (wiki)", WIKI],
    ["The Ascent (wiki)", WG + "Ascent"],
    ["Home (wiki)", WG + "Home"],
    ["Tainted characters (wiki)", WG + "Tainted_Characters"],
    ["A Dead God route for Repentance+ (Steam guide)", ROUTE],
  ],
  groups: [
    {
      title: "The way Home",
      location: "Depths · Mausoleum · Home",
      note: "Advice: Depths II always holds a Marked Skull, and destroying it drops the card The Fool. The record route keeps the card and uses it after Mom to get back to the strange door in the floor’s first room.",
      sources: [
        ["A Dead God route for Repentance+ (Steam guide)", ROUTE],
        ["The Ascent (wiki)", WG + "Ascent"],
        ["The Polaroid (wiki)", WG + "The_Polaroid"],
        ["Home (wiki)", WG + "Home"],
      ],
      rows: [
        ["route-dads-note", ["route"], "Open the strange door, then take Dad’s Note", "Once Mother has fallen, a strange door waits in the first room of Depths II. Beat Mom, keep the Polaroid or the Negative, and get back to that first room: the door takes the item and leads to a special Mausoleum II. Its Dad’s Note starts the Ascent, a climb back up through the floors you came down, to Home.", { requires: ["area-a-strange-door", ["item-the-polaroid", "item-the-negative"]] }],
        ["item-red-key", ["item", "secret"], "Unlock Red Key", "At Home, open the big chest in Mom’s bedroom: on your first trip it holds the Red Key. Use it on the closet’s wall in the hall the same trip. From then on the Red Key is unlocked and can turn up in runs."],
        ["route-cracked-key", ["route"], "Leave a trinket on the way down for a Cracked Key", "On every later trip, leave a trinket in a Treasure or Boss Room before you take Dad’s Note: on the Ascent it waits in that same room as a Cracked Key, which opens the closet."],
      ],
    },
    {
      title: "The closet",
      location: "Home",
      note: "The closet is on the left wall of the hall before Mom’s bedroom. Open it with the Red Key or a Cracked Key, and touch the body inside: it unlocks the tainted version of the character you’re playing. One per trip, and the unlock is yours once you touch it: you needn’t finish the run.",
      sources: [
        ["Tainted characters (wiki)", WG + "Tainted_Characters"],
        ["Tainted characters (StrategyWiki)", "https://strategywiki.org/wiki/The_Binding_of_Isaac:_Repentance/Tainted_characters"],
      ],
      rows: [
        ["character-tainted-isaac", ["character", "secret"], "Unlock Tainted Isaac (The Broken)", "Take Isaac Home and open the closet."],
        ["character-tainted-magdalene", ["character", "secret"], "Unlock Tainted Magdalene (The Dauntless)", "Take Magdalene Home and open the closet."],
        ["character-tainted-cain", ["character", "secret"], "Unlock Tainted Cain (The Hoarder)", "Take Cain Home and open the closet."],
        ["character-tainted-judas", ["character", "secret"], "Unlock Tainted Judas (The Deceiver)", "Take Judas Home and open the closet."],
        ["character-tainted-blue-baby", ["character", "secret"], "Unlock Tainted ??? (The Soiled)", "Take ??? Home and open the closet."],
        ["character-tainted-eve", ["character", "secret"], "Unlock Tainted Eve (The Curdled)", "Take Eve Home and open the closet."],
        ["character-tainted-samson", ["character", "secret"], "Unlock Tainted Samson (The Savage)", "Take Samson Home and open the closet."],
        ["character-tainted-azazel", ["character", "secret"], "Unlock Tainted Azazel (The Benighted)", "Take Azazel Home and open the closet."],
        ["character-tainted-lazarus", ["character", "secret"], "Unlock Tainted Lazarus (The Enigma)", "Take Lazarus Home and open the closet."],
        ["character-tainted-eden", ["character", "secret"], "Unlock Tainted Eden (The Capricious)", "Take Eden Home and open the closet."],
        ["character-tainted-lost", ["character", "secret"], "Unlock Tainted Lost (The Baleful)", "Take the Lost Home and open the closet."],
        ["character-tainted-lilith", ["character", "secret"], "Unlock Tainted Lilith (The Harlot)", "Take Lilith Home and open the closet."],
        ["character-tainted-keeper", ["character", "secret"], "Unlock Tainted Keeper (The Miser)", "Take Keeper Home and open the closet."],
        ["character-tainted-apollyon", ["character", "secret"], "Unlock Tainted Apollyon (The Empty)", "Take Apollyon Home and open the closet."],
        ["character-tainted-forgotten", ["character", "secret"], "Unlock Tainted Forgotten (The Fettered)", "Take the Forgotten Home and open the closet."],
        ["character-tainted-bethany", ["character", "secret"], "Unlock Tainted Bethany (The Zealot)", "Take Bethany Home and open the closet."],
        ["character-tainted-jacob", ["character", "secret"], "Unlock Tainted Jacob (The Deserter)", "Take Jacob and Esau Home and open the closet."],
      ],
    },
    {
      title: "Challenges the closet opens",
      note: "Each row that opens a challenge comes before the row for winning it. Their rewards are reversed tarot cards, which the game marks with a question mark.",
      sources: [
        ["Challenges (wiki)", CHALLENGES],
        ["The secrets, with their conditions (wiki)", WIKI],
      ],
      rows: [
        ["challenge-hot-potato", ["challenge", "secret"], "Open the challenge Hot Potato", "Opened by unlocking Tainted Forgotten."],
        ["pickup-the-chariot", ["pickup", "secret"], "Unlock VII - The Chariot?", "Challenge #42, Hot Potato: Tainted Forgotten, whose body explodes every few seconds. Beat Satan."],
        ["challenge-cantripped", ["challenge", "secret"], "Open the challenge Cantripped!", "Opened by unlocking Tainted Cain."],
        ["pickup-justice", ["pickup", "secret"], "Unlock VIII - Justice?", "Challenge #43, Cantripped!: Tainted Cain, every card and pill replaced by item cards. Beat Mom."],
        ["challenge-red-redemption", ["challenge", "secret"], "Open the challenge Red Redemption", "Opened by unlocking Tainted Jacob."],
        ["pickup-the-hermit", ["pickup", "secret"], "Unlock IX - The Hermit?", "Challenge #44, Red Redemption: Tainted Jacob with Dad’s Key, starting in a room with no doors: every room is reached with a Red Key that never runs out. Beat Mother."],
        ["challenge-delete-this", ["challenge", "secret"], "Open the challenge DELETE THIS", "Opened by unlocking Tainted Eden."],
        ["pickup-temperance", ["pickup", "secret"], "Unlock XIV - Temperance?", "Challenge #45, DELETE THIS: Isaac with TMTRAINER, every floor scrambled. It has no name in the challenge list. Beat ???."],
      ],
    },
  ],
} satisfies RawChapter;

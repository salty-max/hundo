import type { RawChapter } from "@hundo/core/types";

const WIKI = "https://bindingofisaacrebirth.wiki.gg/wiki/Achievements";
const WG = "https://bindingofisaacrebirth.wiki.gg/wiki/";
const ROUTE = "https://steamcommunity.com/sharedfiles/filedetails/?id=3712501774";
const CHALLENGES = WG + "Challenges";

export default {
  id: 7,
  title: "The Other Way Down",
  region: "Downpour · Mines · Mausoleum · Corpse",
  intro: "A Secret Exit opens a second road down, beside the Basement, Caves, Depths and Womb. Collect the two knife pieces on the way, cut through the flesh door at the end of the Mausoleum, and beat Mother in the Corpse.",
  sources: [
    ["The secrets, with their conditions (wiki)", WIKI],
    ["Downpour (wiki)", WG + "Downpour"],
    ["Mines (wiki)", WG + "Mines"],
    ["Mausoleum (wiki)", WG + "Mausoleum"],
    ["The Corpse and the knife pieces (wiki)", WG + "Corpse"],
    ["A Dead God route for Repentance+ (Steam guide)", ROUTE],
  ],
  groups: [
    {
      title: "Downpour and the Mines",
      location: "Downpour · Mines",
      note: "The doors wait in boss rooms once the boss is down. Basement I’s or II’s has a locked door to Downpour, which takes a key. Caves I’s or II’s, or Downpour II’s, has a boarded-up door to the Mines, which two bombs open. The knife needs Downpour II, then Mines II, in one run, so bring a key and bombs.",
      sources: [
        ["Downpour (wiki)", WG + "Downpour"],
        ["Mines (wiki)", WG + "Mines"],
        ["A Dead God route for Repentance+ (Steam guide)", ROUTE],
      ],
      rows: [
        ["route-knife-pieces", ["route"], "Collect the two knife pieces", "In one run. In Downpour II, touch the white fireplace to turn into a ghost, then walk into the mirror in another room. In the Mirrored World behind it, the Treasure Room holds Knife Piece 1; walk back out through the mirror. In Mines II, with Knife Piece 1, a tall room has a broken minecart track: find the three yellow buttons scattered across the floor to repair it, ride the cart, pick up Knife Piece 2 at the end, then outrun the shadow that chases you.", { requires: ["area-a-secret-exit"] }],
        ["area-dross", ["area", "secret"], "Unlock Dross", "Beat every boss that can appear in Downpour, over as many runs as it takes: Downpour can then come up as Dross."],
        ["area-ashpit", ["area", "secret"], "Unlock Ashpit", "Beat every boss that can appear in the Mines: the Mines can then come up as Ashpit."],
        ["item-brimstone-bombs", ["item", "secret"], "Unlock Brimstone Bombs", "When Hornfel’s minecart breaks, kill him before he can escape."],
      ],
    },
    {
      title: "The Mausoleum, the Corpse and Mother",
      location: "Mausoleum · Corpse",
      note: "The door to the Mausoleum appears in the boss room of Mines II or Depths I, and costs two full hearts to go through. Beat Mom at the end of Mausoleum II, Boss Rush opening there up to 25 minutes, and stab the flesh door in her room with the knife. Behind it you fight Mom’s Heart; beat it and the way down to the Corpse opens. Mother waits at the end of Corpse II.",
      sources: [
        ["Mausoleum (wiki)", WG + "Mausoleum"],
        ["The Corpse and the knife pieces (wiki)", WG + "Corpse"],
        ["The secrets, with their conditions (wiki)", WIKI],
      ],
      rows: [
        ["area-gehenna", ["area", "secret"], "Unlock Gehenna", "Beat every boss that can appear in the Mausoleum: it can then come up as Gehenna."],
        ["trinket-forgotten-lullaby", ["trinket", "secret"], "Unlock Forgotten Lullaby", "After beating the Siren, blow up the skull she leaves."],
        ["pickup-rotten-heart", ["pickup", "secret"], "Unlock Rotten Heart", "Walk into the Corpse for the first time."],
        ["area-a-strange-door", ["area", "secret"], "Beat Mother: A Strange Door", "Beat Mother at the end of Corpse II. From then on a strange door waits in the first room of Depths II, the way Home (chapter 8).", { requires: ["route-knife-pieces"] }],
        ["character-jacob-and-esau", ["character", "secret"], "Unlock Jacob and Esau", "Comes with the same first win over Mother.", { requires: ["route-knife-pieces"] }],
      ],
    },
    {
      title: "Challenges Mother opens",
      note: "Each row that opens a challenge comes before the row for winning it.",
      sources: [
        ["Challenges (wiki)", CHALLENGES],
        ["The secrets, with their conditions (wiki)", WIKI],
      ],
      rows: [
        ["challenge-isaacs-awakening", ["challenge", "secret"], "Open the challenge Isaac’s Awakening", "Opened by your first win over Mother."],
        ["item-spirit-sword", ["item", "secret"], "Unlock Spirit Sword", "Challenge #39, Isaac’s Awakening: Isaac with Spirit Sword, Mom’s Bracelet and Trinity Shield. Beat Mother."],
        ["challenge-seeing-double", ["challenge", "secret"], "Open the challenge Seeing Double", "Opened by your first win over Mother."],
        ["trinket-broken-glasses", ["trinket", "secret"], "Unlock Broken Glasses", "Challenge #40, Seeing Double: Jacob and Esau with 20/20 and X-Ray Vision, every enemy and boss doubled. Beat Mom’s Heart."],
      ],
    },
  ],
} satisfies RawChapter;

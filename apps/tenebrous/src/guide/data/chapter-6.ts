import type { RawChapter } from "@hundo/core/types";

export default {
  id: 6,
  title: "Western Wilds",
  region: "Western Wilds",
  teaser: "Western Wilds",
  intro: "Back toward Ossex, then west: the lava road of the Western Wilds, the Molten Foundry with Poppit’s second shop, three trinkets from the Trinket Bazaar in Ossex, and the way north to Kindlewood.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/western-wilds"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "Maxi on the eastern road",
      location: "Eastern Heath",
      rows: [
        ["route-after-crypt", ["route"], "Head back toward Ossex", "With the first generator restored, take the eastern road back toward Ossex: Maxi is waiting on it.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["boss-maxi", ["boss"], "Beat Maxi", "Maxi ambushes you on the eastern road once Queensbury Crypt is done.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-bag-maxi", ["trinket-bag"], "Get the Trinket Bag from Maxi", "Beating Maxi gives a Trinket Bag.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist"}],
      ],
    },
    {
      title: "The lava road",
      location: "Western Wilds",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"]],
      rows: [
        ["route-wilds-lava", ["route"], "Steer the lava into the red crystals", "From the Southern Outskirts’ western exit, the road leads into the Western Wilds’ lava fields. Burrow to draw the lava along behind you into the crystals that block the first path north: a Kear lock waits up there.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-wilds-balcony", ["bonestone"], "Get the Bonestone by Franz’s house", "On the screen past that lock, the chest is by the house of Franz, who wants a snowball: a job for later.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-wilds-occupied-bridge-underneath", ["bonestone"], "Get the Bonestone under the Occupied Bridge", "From the lava field, take the leftmost path north, then right: the chest shows through the bridge’s grate. Stand above it and walk down to it.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["sidearm-fog-thrower", ["sidearm"], "Get Fog Thrower", "Head north from the Occupied Bridge to the lava and strike the right-hand candle.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/western-wilds"}],
      ],
    },
    {
      title: "The Molten Foundry",
      location: "Western Wilds",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"], ["The 100% checklist (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/checklist"]],
      rows: [
        ["route-foundry", ["route"], "Find the Molten Foundry’s ways in", "Break the crates at the Foundry’s entrance to open the hole behind them.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/western-wilds"}],
        ["bonestone-wilds-brute", ["bonestone"], "Get the Bonestone among the big purple enemies", "Go through the Foundry to the top of the bridge, cross left and drop among the big purple enemies: the chest is at the top right.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-wilds-molten-foundry-dark", ["bonestone"], "Get the Bonestone on the Foundry’s dark path", "Behind the Foundry, steer the lava fast: its glow lights the deadly dark path near the Underlab only for a moment, and the chest waits at the end of it.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-helio-the-wisp", ["trinket"], "Buy Helio the Wisp from Poppit", "Behind the Foundry, send the lava left through the tunnel to break the crystals: Poppit’s shop is at the top, and Helio the Wisp costs 400 Bones.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["kear-wilds-molten-foundry-poppit", ["kear"], "Buy Poppit’s Kear in the Foundry", "Poppit sells a Kear beside Helio the Wisp.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["trinket-flame-guard", ["trinket"], "Get Flame Guard past the lava puzzles", "Back in the lava room behind the Foundry, break the crystals on the right: two vials pay the toll, then a Kear opens the lock. Beyond, guide the lava through each set of crystals to the end, where Flame Guard waits.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "The Trinket Bazaar",
      location: "Ossex",
      note: "The Trinket Bazaar is Ossex’s trinket shop, the purple building. Its stock grows as you collect trinkets, and once you own 20 it has them all.",
      sources: [["The 100% checklist (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/checklist"], ["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"]],
      compact: true,
      rows: [
        ["trinket-plasma-funnel", ["trinket"], "Buy Plasma Funnel at the Trinket Bazaar", "Lady Susan sells it at the Trinket Bazaar for 700 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist"}],
        ["trinket-seismic-belt", ["trinket"], "Buy Seismic Belt at the Trinket Bazaar", "Lady Susan sells it for 700 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist"}],
        ["trinket-brisk-brew", ["trinket"], "Buy Brisk Brew at the Trinket Bazaar", "Lady Susan sells it for 700 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist"}],
      ],
    },
    {
      title: "North to Kindlewood",
      location: "Western Wilds",
      rows: [
        ["route-kindlewood-road", ["route"], "Take the road into Kindlewood", "From the Western Wilds, head west then north into Kindlewood.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/kindlewood"}],
      ],
    },
  ],
} satisfies RawChapter;

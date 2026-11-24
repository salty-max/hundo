import type { RawChapter } from "@hundo/core/types";

export default {
  id: 6,
  title: "Western Wilds",
  region: "Western Wilds",
  teaser: "Western Wilds",
  intro: "Return past Maxi, open the Foundry services and take the northern route toward Kindlewood.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/western-wilds"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "The first return and the lava road",
      location: "Western Wilds",
      rows: [
        ["route-after-crypt", ["route"], "Revisit Ossex after the first generator", "Return toward Ossex after the first tower.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/exploration-towers"}],
        ["route-wilds-lava", ["route"], "Use burrow trails to carry lava through red ore", "Cross the Occupied Bridge and search the puddle entrance to the Secret Passage.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/western-wilds"}],
        ["route-foundry", ["route"], "Open the Foundry’s two side routes", "Break the crates at the entrance to open the hole behind them.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/western-wilds"}],
        ["route-kindlewood-road", ["route"], "Clear the western route into Kindlewood", "From Western Wilds, head west then north.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/kindlewood"}],
      ],
    },
    {
      title: "The bridge and Molten Foundry",
      location: "Western Wilds",
      compact: true,
      rows: [
        ["bonestone-wilds-brute", ["bonestone"], "Get the Bonestone: Brute", "Through the foundry to the bridge top, cross left and drop among the big purple enemies; chest top-right.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Western Wilds"}],
        ["bonestone-wilds-occupied-bridge-underneath", ["bonestone"], "Get the Bonestone: occupied Bridge, under the bridge beside the Foundry", "Occupied Bridge, underneath beside the Foundry: open the Kear lock on the platforms; chest by Franz’s home.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Western Wilds"}],
        ["trinket-helio-the-wisp", ["trinket"], "Get Helio the Wisp", "Poppit’s Western Wilds shop, 400 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Western Wilds"}],
        ["kear-wilds-molten-foundry-poppit", ["kear"], "Get the Kear: poppit hidden shop 2", "Molten Foundry cabin: burrow top-right, steer lava left to light the route; Poppit waits at the top.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Western Wilds"}],
        ["bonestone-wilds-molten-foundry-dark", ["bonestone"], "Get the Bonestone: red Molten Foundry, north of the bridge", "Burrow a grate, skirt the locked gate, light platforms with lava trails; Polyp Lamp helps.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Western Wilds"}],
        ["trinket-flame-guard", ["trinket"], "Get Flame Guard", "Chest at the edge of the area.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Western Wilds"}],
        ["bonestone-wilds-balcony", ["bonestone"], "Get the Bonestone: Balcony", "Franz (wants a snowball); chest there.", {"reference": "https://www.gamerguides.com/mina-the-hollower/guide", "place": "Western Wilds"}],
      ],
    },
    {
      title: "Bazaar after opening the western town connection",
      location: "Western Wilds",
      compact: true,
      rows: [
        ["trinket-plasma-funnel", ["trinket"], "Get Plasma Funnel", "Lady Susan’s Trinket Bazaar, Ossex, 700 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex"}],
        ["trinket-seismic-belt", ["trinket"], "Get Seismic Belt", "Lady Susan’s Trinket Bazaar, Ossex, 700 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex"}],
        ["trinket-brisk-brew", ["trinket"], "Get Brisk Brew", "Lady Susan’s Trinket Bazaar, Ossex, 700 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex"}],
      ],
    },
    {
      title: "The first return encounter",
      location: "Western Wilds",
      compact: true,
      rows: [
        ["boss-maxi", ["boss"], "Beat Maxi", "Ambush on the eastern road after Queensbury Crypt is cleared. Optional; gives a Trinket Bag.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses", "place": "Eastern Heath"}],
        ["trinket-bag-maxi", ["trinket-bag"], "Get the Trinket Bag from Maxi", "Reward for beating Maxi past Ossex’s eastern gate once the crypt tower falls.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Eastern Heath"}],
      ],
    },
    {
      title: "Sidearm for this leg",
      location: "Western Wilds",
      compact: true,
      rows: [
        ["sidearm-fog-thrower", ["sidearm"], "Get Fog Thrower", "Head north from the Occupied Bridge to the lava and strike the right-hand candle.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/western-wilds"}],
      ],
    },
  ],
} satisfies RawChapter;

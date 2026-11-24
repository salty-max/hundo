import type { RawChapter } from "@hundo/core/types";

export default {
  id: 13,
  title: "The island railway",
  region: "The island railway",
  teaser: "The island railway",
  intro: "Fund railway service, search its passenger compartments and complete the station races before heading into the mountains.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "Travel, passengers and footraces",
      location: "Ossex",
      rows: [
        ["gear-train-pass", ["gear"], "Get the Train Pass", "The Train Pass comes with getting the train running again, which takes 10,000 Bones at a station’s machine.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["route-train-cabins", ["route"], "Search the passenger compartments", "Burrow beneath closed compartment doors and inspect their lower corners.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
        ["quest-blaise-first-race", ["quest"], "Win Blaise’s first race", "Accept a ghost’s race back to the Ossex fountain.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
        ["route-blaise-followups", ["route"], "Complete Blaise’s remaining races", "Race Blaise again for the later prizes.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["route-coltrane-train", ["route"], "Take the train toward Coltrane Peak", "Ride the train on toward Coltrane Peak.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
      ],
    },
    {
      title: "Cabin, passenger and race rewards",
      location: "Ossex",
      compact: true,
      rows: [
        ["bonestone-ossex-train", ["bonestone"], "Get the Bonestone: train, locked passenger compartments", "Burrow in, break the lower-left candlestick; the first key gives it. Filed under Radiant Manor.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Ossex"}],
        ["gear-train-safety-shroud", ["gear"], "Get the Safety Shroud", "On the train, open the easternmost cabin and then the westmost: two Kear locks stand in the way.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist"}],
        ["trinket-bellows-bustle", ["trinket"], "Get Bellows Bustle", "Reward for beating Blaise in a third race.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex"}],
        ["kear-ossex-blaise-final-race", ["kear"], "Get the Kear: ghost race reward", "Fund the Ossex train (10,000 Bones), travel to Bone Beach, win the race to the Ossex fountain without stairs or fast travel.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Ossex"}],
        ["trinket-volatile-beastium", ["trinket"], "Get Volatile Beastium", "Vitas sells it on the train for 750 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Sandfalls"}],
        ["underlab-sidearm-duplicator", ["underlab"], "Buy the Sidearm Duplicator", "Drillhardt sells it in Ossex for 2,000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex", "requires": ["route-generator-septemburg"]}],
        ["underlab-memory-goggles", ["underlab"], "Buy the Memory Goggles", "Drillhardt sells it in Ossex for 2,000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex", "requires": ["route-generator-septemburg"]}],
        ["underlab-phonograph", ["underlab"], "Buy the Phonograph", "Drillhardt sells it in Ossex for 500 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex", "requires": ["route-generator-septemburg"]}],
        ["underlab-enhanced-map", ["underlab"], "Buy the Enhanced Map", "Drillhardt sells it in Ossex for 500 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex", "requires": ["route-generator-septemburg"]}],
      ],
    },
  ],
} satisfies RawChapter;

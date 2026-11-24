import type { RawChapter } from "@hundo/core/types";

export default {
  id: 13,
  title: "The island railway",
  region: "The island railway",
  teaser: "The island railway",
  intro: "The island railway: get the train running, search its carriages, race Blaise at three spots, and pick up Drillhardt’s new stock before the ride to Coltrane Peak.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "On the train",
      location: "Ossex",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"], ["The 100% checklist (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/checklist"]],
      rows: [
        ["gear-train-pass", ["gear"], "Get the Train Pass", "The Train Pass comes with getting the train running again, which takes 10,000 Bones at a station’s machine.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["route-train-cabins", ["route"], "Search the train’s carriages", "Burrow beneath the closed doors between the carriages and look in their lower corners.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
        ["bonestone-ossex-train", ["bonestone"], "Get the Bonestone in the train’s hidden room", "On any trip, in the first carriage, burrow under the shut door right of the open one, break the candle on the left and follow the tunnel to a hidden room: its first Kear lock opens on the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["gear-train-safety-shroud", ["gear"], "Get the Safety Shroud", "The hidden room’s second Kear lock opens on the Safety Shroud.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-volatile-beastium", ["trinket"], "Buy Volatile Beastium on the train", "On the train from the station south of Sandfalls toward Nox’s Bayou, Vitas sells it past the first cabin, for 750 Bones.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Sandfalls"}],
      ],
    },
    {
      title: "Blaise’s races",
      location: "Ossex",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"]],
      rows: [
        ["quest-blaise-first-race", ["quest"], "Win Blaise’s first race", "Blaise, a ghost, races you to the Ossex fountain from three spots: right of Ossex’s station, by the Western Wilds’ exit to Kindlewood, and in Sandfalls before its station to the south. Win one.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["route-blaise-followups", ["route"], "Win Blaise’s other two races", "No stairs and no fast travel on the way to the fountain.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["trinket-bellows-bustle", ["trinket"], "Win Bellows Bustle from Blaise", "One of Blaise’s races gives Bellows Bustle.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["kear-ossex-blaise-final-race", ["kear"], "Win Blaise’s Kear", "Another of Blaise’s races gives a Kear.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "Drillhardt’s later stock",
      location: "Ossex",
      sources: [["The 100% checklist (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/checklist"], ["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"]],
      compact: true,
      rows: [
        ["underlab-sidearm-duplicator", ["underlab"], "Buy the Sidearm Duplicator", "Drillhardt, in the Guild’s back room, adds to his stock as the story goes on: the Sidearm Duplicator costs 2,000 Bones.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["underlab-memory-goggles", ["underlab"], "Buy the Memory Goggles", "Drillhardt sells it for 2,000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist"}],
        ["underlab-phonograph", ["underlab"], "Buy the Phonograph", "Drillhardt sells it for 500 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist"}],
        ["underlab-enhanced-map", ["underlab"], "Buy the Enhanced Map", "Drillhardt sells it for 500 Bones. It shows how many collectibles each region still holds.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "Toward Coltrane Peak",
      location: "Ossex",
      rows: [
        ["route-coltrane-train", ["route"], "Take the train toward Coltrane Peak", "Ride the train on to Coltrane Peak.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
      ],
    },
  ],
} satisfies RawChapter;

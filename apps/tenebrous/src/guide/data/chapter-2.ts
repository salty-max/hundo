import type { RawChapter } from "@hundo/core/types";

export default {
  id: 2,
  title: "Ossex",
  region: "Ossex",
  teaser: "Ossex",
  intro: "The town at the island’s heart: the fountain, the shops around it, the Hollower’s Guild and the first chests behind Ossex’s walls. Nine Kears are for sale here, for the Kear locks on the side paths.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/ossex"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "Arrival and the town hub",
      location: "Ossex",
      rows: [
        ["route-ossex-intro", ["route"], "Visit the Courtyard", "From the central fountain, go to Lionel’s Courtyard and follow the introduction there.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/ossex"}],
        ["route-ossex-services", ["route"], "Find the shops around the fountain", "Legovich’s weapons shop, the Emporium and the Kear Institute, the building with a giant Kear on its roof, all stand around the fountain.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["route-guild", ["route"], "Meet the Hollowers in their Guild", "Break the crate south of the Kear Institute and enter the Guild: speak with Muriel inside.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["kear-ossex-hollowers-guild-back-room", ["kear"], "Get the Kear in the Guild’s back room", "Inside the Guild, burrow at the back of the hall into the second room: the chest stands beside one of the Hollowers.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
      ],
    },
    {
      title: "The High Street and the fountain",
      location: "Ossex",
      sources: [["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"], ["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Trinket locations (Gamer Guides)", "https://www.gamerguides.com/mina-the-hollower/guide/collectibles/trinkets/all-trinket-locations"]],
      rows: [
        ["route-balcony", ["route"], "Open the High Street’s locked gate", "A Kear opens the upper balcony gate off the High Street. Behind it are the telescope, and one screen to its left a house with a Bonestone and Steady Soles.", {"reference": "https://www.gamerguides.com/mina-the-hollower/guide/collectibles/trinkets/all-trinket-locations"}],
        ["kear-ossex-telescope-meteor", ["kear"], "Get the Kear from the telescope", "Look through the telescope behind the gate and hold it on the large planet on the right for a few seconds: a comet drops the Kear.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-ossex-attic", ["bonestone"], "Get the Bonestone in the house by the telescope", "One screen left of the telescope, burrow through the gap in the balcony’s railing and drop down the chimney into the house: the chest is in its bottom-left corner.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests"}],
        ["trinket-steady-soles", ["trinket"], "Get Steady Soles", "In the same house, take the stairs at the top left out to the balcony: Steady Soles is there.", {"reference": "https://www.gamerguides.com/mina-the-hollower/guide/collectibles/trinkets/all-trinket-locations"}],
        ["bonestone-ossex-couples-quarter", ["bonestone"], "Get the Bonestone in the Couple’s Quarters", "West of the fountain, past the newspaper stand, a small door leads into the Couple’s Quarters: burrow-jump the pit inside, and the chest is in the bottom-right corner.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests"}],
      ],
    },
    {
      title: "The Kear Institute",
      location: "Ossex",
      note: "The Kear Institute, south of the fountain with a giant Kear on its roof, sells nine Kears, each dearer than the last. Buy them as Kear locks bar your way: every one counts toward the 50.",
      sources: [["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"], ["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"]],
      compact: true,
      rows: [
        ["kear-ossex-institute-1", ["kear"], "Buy Kear 1 of 9 at the Kear Institute", "The first, and the cheapest.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["kear-ossex-institute-2", ["kear"], "Buy Kear 2 of 9 at the Kear Institute", "Dearer than the one before.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["kear-ossex-institute-3", ["kear"], "Buy Kear 3 of 9 at the Kear Institute", "Dearer than the one before.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["kear-ossex-institute-4", ["kear"], "Buy Kear 4 of 9 at the Kear Institute", "Dearer than the one before.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["kear-ossex-institute-5", ["kear"], "Buy Kear 5 of 9 at the Kear Institute", "Dearer than the one before.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["kear-ossex-institute-6", ["kear"], "Buy Kear 6 of 9 at the Kear Institute", "Dearer than the one before.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["kear-ossex-institute-7", ["kear"], "Buy Kear 7 of 9 at the Kear Institute", "Dearer than the one before.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["kear-ossex-institute-8", ["kear"], "Buy Kear 8 of 9 at the Kear Institute", "Dearer than the one before.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["kear-ossex-institute-9", ["kear"], "Buy Kear 9 of 9 at the Kear Institute", "The last, and the dearest.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
      ],
    },
  ],
} satisfies RawChapter;

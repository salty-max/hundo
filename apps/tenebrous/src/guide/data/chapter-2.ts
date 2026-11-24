import type { RawChapter } from "@hundo/core/types";

export default {
  id: 2,
  title: "Ossex",
  region: "Ossex",
  teaser: "Ossex",
  intro: "Use the fountain as your hub, meet the townspeople and prepare for the southern rescue.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/ossex"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "Arrival and the town hub",
      location: "Ossex",
      rows: [
        ["route-ossex-intro", ["route"], "Visit the Courtyard and continue the town introduction", "From the central fountain, head to Lionel’s Courtyard and follow the orphanage introduction.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/ossex"}],
        ["route-ossex-services", ["route"], "Find the three shops around the fountain", "Find Legovich’s weapons shop, the Emporium and the Kear Institute, the building with a giant Kear on its roof.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["route-guild", ["route"], "Meet the Hollowers in their Guild", "Enter the Guild and speak with Muriel.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/ossex"}],
        ["route-balcony", ["route"], "Find the High Street’s telescope room", "A locked room on the High Street holds a telescope.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/ossex"}],
      ],
    },
    {
      title: "Early town supplies",
      location: "Ossex",
      compact: true,
      rows: [
        ["trinket-steady-soles", ["trinket"], "Get Steady Soles", "Ossex chest on the balcony reached through the Attic.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex"}],
        ["bonestone-ossex-couples-quarter", ["bonestone"], "Get the Bonestone: beyond the newspaper stand, City Center", "Small door west of the fountain (Couple’s Quarters), burrow-jump a pit; 200 Flakes.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Ossex"}],
        ["kear-ossex-institute-1", ["kear"], "Buy Kear 1 of 9 at the Kear Institute", "Bought at the Kear Institute (giant Kear on the roof, below the central fountain); first of nine, price climbs each time.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Ossex"}],
        ["kear-ossex-institute-2", ["kear"], "Buy Kear 2 of 9 at the Kear Institute", "Second Kear Institute sale; dearer than the last.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Ossex"}],
        ["kear-ossex-institute-3", ["kear"], "Buy Kear 3 of 9 at the Kear Institute", "Third Kear Institute sale; dearer than the last.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Ossex"}],
        ["kear-ossex-institute-4", ["kear"], "Buy Kear 4 of 9 at the Kear Institute", "Fourth Kear Institute sale; dearer than the last.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Ossex"}],
        ["kear-ossex-institute-5", ["kear"], "Buy Kear 5 of 9 at the Kear Institute", "Fifth Kear Institute sale; dearer than the last.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Ossex"}],
        ["kear-ossex-institute-6", ["kear"], "Buy Kear 6 of 9 at the Kear Institute", "Sixth Kear Institute sale; dearer than the last.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Ossex"}],
        ["kear-ossex-institute-7", ["kear"], "Buy Kear 7 of 9 at the Kear Institute", "Seventh Kear Institute sale; dearer than the last.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Ossex"}],
        ["kear-ossex-institute-8", ["kear"], "Buy Kear 8 of 9 at the Kear Institute", "Eighth Kear Institute sale; dearer than the last.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Ossex"}],
        ["kear-ossex-institute-9", ["kear"], "Buy Kear 9 of 9 at the Kear Institute", "Ninth and last Kear Institute sale, the most expensive.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Ossex"}],
      ],
    },
    {
      title: "The Guild’s hidden back room",
      location: "Ossex",
      compact: true,
      rows: [
        ["kear-ossex-hollowers-guild-back-room", ["kear"], "Get the Kear: hollower’s Guild chest", "Break the crate outside the Institute, burrow at the back of the Guild hall to a chest beside an NPC.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Ossex"}],
      ],
    },
  ],
} satisfies RawChapter;

import type { RawChapter } from "@hundo/core/types";

export default {
  id: 3,
  title: "Southern Outskirts",
  region: "Southern Outskirts",
  teaser: "Southern Outskirts",
  intro: "Explore the first house, rescue Rhene and open the Guild’s back-room services.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/southern-outskirts"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "The southern house",
      location: "Southern Outskirts",
      rows: [
        ["route-basement", ["route"], "Explore the house off the western fork", "Leave Ossex south and take the western branch.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/southern-outskirts"}],
        ["trinket-primed-vial-pouch", ["trinket"], "Get Primed Vial Pouch", "Basement corner, burrow in through the roof.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Southern Outskirts"}],
      ],
    },
    {
      title: "The balloon caves",
      location: "Southern Outskirts",
      rows: [
        ["route-balloon-cave", ["route"], "Use the balloon route to open the Cave Network shortcut", "Push a floating balloon while emerging from beneath it, then ride it toward the upper ledge.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/southern-outskirts"}],
        ["sidearm-deflector-parasol", ["sidearm"], "Get Deflector Parasol", "At the Cave Network exit, break the rubble shortcut, head south and strike the candles.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/southern-outskirts"}],
      ],
    },
    {
      title: "Nearby side chests",
      location: "Southern Outskirts",
      compact: true,
      rows: [
        ["bonestone-outskirts-commons-bounce", ["bonestone"], "Get the Bonestone: Commons Bounce", "Push the bounce pad under the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Southern Outskirts"}],
        ["bonestone-outskirts-western-wilds-entrance", ["bonestone"], "Get the Bonestone: Western Wilds Entrance", "Past the big pit with two narrow moving platforms and laser troopers; chest just before the Wilds.", {"reference": "https://www.gamerguides.com/mina-the-hollower/guide", "place": "Southern Outskirts"}],
      ],
    },
    {
      title: "The Rebel Barracks",
      location: "Southern Outskirts",
      rows: [
        ["quest-rhene-cell", ["quest"], "Reach Rhene’s cell in the Rebel Barracks", "Spend a Kear at the barracks approach, lower the spikes and open the one-vial entrance.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/southern-outskirts"}],
        ["quest-rhene-rescue", ["quest"], "Wake Rhene with a vial and escort her out", "Heal beside Rhene to wake her.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/southern-outskirts"}],
      ],
    },
    {
      title: "Return to the Guild",
      location: "Ossex",
      rows: [
        ["quest-drillhardt", ["quest"], "Return to the Guild and free Drillhardt", "Follow Rhene back to Ossex.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/ossex", "place": "Ossex"}],
        ["underlab-isle-map", ["underlab"], "Buy the Isle Map", "Drillhardt sells it in Ossex for 500 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex"}],
        ["underlab-training-dummy", ["underlab"], "Buy the Training Dummy", "Drillhardt sells it in Ossex for 500 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex"}],
        ["underlab-joule-alembic", ["underlab"], "Buy the Joule Alembic", "Drillhardt sells it in Ossex for 1,000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex"}],
        ["underlab-sidearm-recoverer", ["underlab"], "Buy the Sidearm Recoverer", "Drillhardt sells it in Ossex for 2,000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex"}],
      ],
    },
  ],
} satisfies RawChapter;

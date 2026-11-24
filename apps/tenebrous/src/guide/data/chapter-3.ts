import type { RawChapter } from "@hundo/core/types";

export default {
  id: 3,
  title: "Southern Outskirts",
  region: "Southern Outskirts",
  teaser: "Southern Outskirts",
  intro: "South of Ossex: the house on the western fork, the balloon caves and the Rebel Barracks, where Rhene waits. Bring her home, and the Guild’s back room opens its shop.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/southern-outskirts"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "Out of the south gate",
      location: "Southern Outskirts",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"]],
      rows: [
        ["bonestone-outskirts-commons-bounce", ["bonestone"], "Get the Bonestone on the ruined building", "From Ossex’s south gate, head down and take the second right: push the bounce pad against the wall under the chest and bounce up.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Southern Outskirts"}],
        ["route-basement", ["route"], "Take the western fork to the house", "Leave Ossex by the south gate and take the western branch: watch the snipers’ firing lines on the way.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/southern-outskirts"}],
        ["trinket-primed-vial-pouch", ["trinket"], "Get Primed Vial Pouch in the house’s basement", "At the house, smash the cracked trunk and burrow in through the hole in the roof: the chest is in a corner of the basement. It’s a trinket, not one of the seven Vial Pouches.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/southern-outskirts", "place": "Southern Outskirts"}],
      ],
    },
    {
      title: "The balloon caves",
      location: "Southern Outskirts",
      rows: [
        ["route-balloon-cave", ["route"], "Ride a balloon up to the Cave Network", "Burrow under a floating balloon to push it, then ride it up to the ledge and into the caves, crossing them platform by platform.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/southern-outskirts"}],
        ["sidearm-deflector-parasol", ["sidearm"], "Get Deflector Parasol", "At the Cave Network’s exit, break the rubble shortcut, head south and strike the candles. Hold the parasol up while you jump to glide.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/southern-outskirts"}],
        ["bonestone-outskirts-western-wilds-entrance", ["bonestone"], "Get the Bonestone before the Western Wilds", "Where the Outskirts meet the road west, ride the two narrow moving platforms over the big pit past the laser troopers: the chest is in plain view on the far side.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Southern Outskirts"}],
      ],
    },
    {
      title: "The Rebel Barracks",
      location: "Southern Outskirts",
      rows: [
        ["quest-rhene-cell", ["quest"], "Reach Rhene’s cell in the Rebel Barracks", "Spend a Kear at the barracks’ approach, lower the spikes and pay a vial at the entrance. Clear the guards and work round to the switch beside Rhene’s cell.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/southern-outskirts"}],
        ["quest-rhene-rescue", ["quest"], "Wake Rhene with a vial and escort her out", "Use a vial beside Rhene to wake her, then lead her out, opening the switches ahead and going back for her if she stops.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/southern-outskirts"}],
      ],
    },
    {
      title: "Return to the Guild",
      location: "Ossex",
      sources: [["The 100% checklist (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/checklist"], ["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"]],
      rows: [
        ["quest-drillhardt", ["quest"], "Return to the Guild and free Drillhardt", "Follow Rhene back to Ossex. In the Guild’s back room, burrow under Drillhardt to free him: he sells the Underlab’s equipment from then on.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/ossex", "place": "Ossex"}],
        ["underlab-isle-map", ["underlab"], "Buy the Isle Map", "Drillhardt sells it at the Guild for 500 Bones once Rhene is home.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex"}],
        ["underlab-training-dummy", ["underlab"], "Buy the Training Dummy", "Drillhardt sells it at the Guild for 500 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex"}],
        ["underlab-joule-alembic", ["underlab"], "Buy the Joule Alembic", "Drillhardt sells it at the Guild for 1,000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex"}],
        ["underlab-sidearm-recoverer", ["underlab"], "Buy the Sidearm Recoverer", "Drillhardt sells it at the Guild for 2,000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex"}],
      ],
    },
  ],
} satisfies RawChapter;

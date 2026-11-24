import type { RawChapter } from "@hundo/core/types";

export default {
  id: 7,
  title: "Kindlewood",
  region: "Kindlewood",
  teaser: "Kindlewood",
  intro: "Use fire and leaf routes to reach the farm, obtain wall-burrowing and meet the schoolchildren.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/kindlewood"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "Overgrowth and the living house",
      location: "Kindlewood",
      rows: [
        ["route-kindlewood-fire", ["route"], "Carry fire through the leaf puzzles", "Break yellow rocks by emerging above them and landing on top and stomp leaf piles from above.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/kindlewood"}],
        ["quest-gourdan", ["quest"], "Introduce yourself to Gourdan at Farm Crossing", "Speak to Gourdan at Farm Crossing.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/kindlewood"}],
        ["route-wallower", ["route"], "Complete Wallower’s Path before leaving the farm", "Finish Wallower’s Path for its chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/kindlewood"}],
        ["quest-school-intro", ["quest"], "Talk to the schoolchildren and their teacher", "Visit the schoolhouse and inspect the drawing on the board.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/kindlewood"}],
      ],
    },
    {
      title: "Overgrowth, Farm Crossing and the rail tunnel",
      location: "Kindlewood",
      compact: true,
      rows: [
        ["bonestone-kindlewood-campfire", ["bonestone"], "Get the Bonestone: Campfire", "Overgrowth clearing south of the first Underlab: beat a Hulk Trooper and two Rebels; chest top right; 500 Shard.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Kindlewood"}],
        ["kear-kindlewood-residence-basement", ["kear"], "Get the Kear: first barn torch puzzle", "Carry the torch to the second platform, throw it at foliage by the bed, burrow under the table to the chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Kindlewood"}],
        ["boss-madd-house", ["boss"], "Beat Madd House", "Kindlewood; the house itself fights. Beating it opens Papa Madd’s shop.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses", "place": "Kindlewood"}],
        ["trinket-draining-beastium", ["trinket"], "Get Draining Beastium", "Papa Madd’s shop, Kindlewood, 2000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Kindlewood"}],
        ["trinket-oozing-organ", ["trinket"], "Get Oozing Organ", "Papa Madd’s shop, Kindlewood, 2000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Kindlewood"}],
        ["trinket-voltaic-guard", ["trinket"], "Get Voltaic Guard", "Papa Madd’s shop, Kindlewood, 2000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Kindlewood"}],
        ["kear-kindlewood-madd-house", ["kear"], "Get the Kear: papa Madd’s shop (1000 Bones)", "Opens as his shop once the Madd House mini-boss is beaten.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Kindlewood"}],
        ["bonestone-kindlewood-torch-escort", ["bonestone"], "Get the Bonestone: overgrowth, north of Madd House", "A carried torch clears the leaf-plugged burrow; gem, 800 Crystal.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Kindlewood"}],
        ["bonestone-kindlewood-gourdan-oozing-organ", ["bonestone"], "Get the Bonestone: farm Crossing, north of the Train Station", "Buy Oozing Organ at Madd House, burrow to Gourdan the jack-o-lantern, talk for the gem.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Kindlewood"}],
        ["bonestone-kindlewood-train-station-ledge", ["bonestone"], "Get the Bonestone: high ledge left of the Train Station", "Head north toward Gourdan, burrow the undergrowth, drop beside the chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Kindlewood"}],
        ["kear-kindlewood-shack", ["kear"], "Get the Kear: gourdan area house chest", "Burrow the left hole, break the chest with a sidearm and the candelabra, re-enter from the left.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Kindlewood"}],
        ["trinket-wallowers-gauntlets", ["trinket"], "Get Wallower’s Gauntlets", "Behind a Kear Lock.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Kindlewood"}],
        ["bonestone-kindlewood-wallowers-room", ["bonestone"], "Get the Bonestone: wallower’s Path, south of Farm Crossing", "With Wallower’s Gauntlets wall-burrow the bottom-right pit and cross; 500 Shard.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Kindlewood"}],
        ["vial-pouch-rail-tunnel", ["vial-pouch"], "Get the Vial Pouch: Rail Tunnel", "In Kindlewood, past the train station.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Kindlewood"}],
        ["trinket-dead-leaf", ["trinket"], "Get Dead Leaf", "Appears in Western Wilds once you’ve spoken to Leaf in Kindlewood.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Western Wilds"}],
      ],
    },
    {
      title: "Sidearm for this leg",
      location: "Kindlewood",
      compact: true,
      rows: [
        ["sidearm-dynamo-lantern", ["sidearm"], "Get Dynamo Lantern", "In the Fire Plant platform loop, reach the upper area and strike the upper-right candle.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/kindlewood"}],
      ],
    },
    {
      title: "The schoolhouse well",
      location: "Kindlewood",
      rows: [
        ["bonestone-septemburg-canal-well-entrance", ["bonestone"], "Get the Bonestone: Wastewater Canal Well Entrance", "In plain view just before leaving the sewers.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Septemburg"}],
      ],
    },
  ],
} satisfies RawChapter;

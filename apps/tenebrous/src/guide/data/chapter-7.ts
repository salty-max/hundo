import type { RawChapter } from "@hundo/core/types";

export default {
  id: 7,
  title: "Kindlewood",
  region: "Kindlewood",
  teaser: "Kindlewood",
  intro: "Kindlewood: the overgrowth and the living Madd House, Gourdan’s Farm Crossing, Wallower’s Path and its gauntlets, and the schoolhouse whose pupils have gone missing.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/kindlewood"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "The overgrowth and the Madd House",
      location: "Kindlewood",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"], ["The 100% checklist (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/checklist"]],
      rows: [
        ["route-kindlewood-fire", ["route"], "Burn and stomp a way through Kindlewood", "Break the yellow rocks and stomp the leaf piles by landing on them from above. A carried torch burns the leaves that plug burrows.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/kindlewood"}],
        ["bonestone-kindlewood-campfire", ["bonestone"], "Get the Bonestone in the first field", "In the corner of the first field with enemies: a Hulk Trooper and two Rebels guard the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["kear-kindlewood-residence-basement", ["kear"], "Get the Kear in the first house", "In the first building, carry the torch onto the moving platforms so its sparks burn the leaves at the top left, then burrow into what they hid for the Kear.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-kindlewood-torch-escort", ["bonestone"], "Get the Bonestone above the Madd House", "Carry the next torch through the cave to the Madd House and burn the leaves plugging a small hole at the top right, above the house: the gem is inside.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["boss-madd-house", ["boss"], "Beat Madd House", "The house itself is the boss. Beat it, and its owner, Papa Madd, opens his shop inside.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses"}],
        ["trinket-draining-beastium", ["trinket"], "Buy Draining Beastium from Papa Madd", "Papa Madd sells it inside the house for 2,000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist"}],
        ["trinket-oozing-organ", ["trinket"], "Buy Oozing Organ from Papa Madd", "Papa Madd sells it for 2,000 Bones. Gourdan, a little farther on, has a use for it.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist"}],
        ["trinket-voltaic-guard", ["trinket"], "Buy Voltaic Guard from Papa Madd", "Papa Madd sells it for 2,000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist"}],
        ["kear-kindlewood-madd-house", ["kear"], "Buy Papa Madd’s Kear", "Papa Madd sells a Kear too, for 1,000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["trinket-dead-leaf", ["trinket"], "Get Dead Leaf from the leaves", "Past the Madd House, go into the village, up, then left into the green area and out to the south: break the chest there and land on the leaf pile. Afterwards, talk to the leaves gathered in the Western Wilds, north of the lava field’s left end.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Western Wilds"}],
      ],
    },
    {
      title: "Farm Crossing",
      location: "Kindlewood",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"]],
      rows: [
        ["quest-gourdan", ["quest"], "Meet Gourdan at Farm Crossing", "Left of the Madd House, go up and under the fence to Gourdan, the pumpkin-headed farmer at Farm Crossing.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests"}],
        ["bonestone-kindlewood-gourdan-oozing-organ", ["bonestone"], "Get Gourdan’s Bonestone with Oozing Organ", "Equip Oozing Organ at an Underlab, burrow beneath Gourdan to leave its acid under him, then talk to him: he gives you a Bonestone.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-kindlewood-train-station-ledge", ["bonestone"], "Get the Bonestone on the ledge by the station", "From Gourdan, go left through the green area and leave by the bottom right of the rope: drop to the chest on the high ledge left of the train station.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["kear-kindlewood-shack", ["kear"], "Get the Kear in the house above the green area", "In the house at the top of the green area, throw a sidearm over the chair to break open the chest you can’t reach. Then break the candle on the top wall, go through the hole behind it and out the back, and come back in by the hidden hole on the left to the Kear.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["vial-pouch-rail-tunnel", ["vial-pouch"], "Get the Vial Pouch in the rail tunnel", "Out of that house’s right side, a Kear opens the lock in the open. Past it, break the cracked pipe at the top right onto the rail tracks, where a second Kear opens the tunnel on the right. At the cave’s end, bait the fire attacks into the leaves to uncover the pipes and the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["sidearm-dynamo-lantern", ["sidearm"], "Get Dynamo Lantern", "On the farm’s loop of platforms among the fire plants, reach the upper area and strike the candle at the upper right.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/kindlewood"}],
      ],
    },
    {
      title: "Wallower’s Path",
      location: "Kindlewood",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"]],
      rows: [
        ["route-wallower", ["route"], "Find Wallower’s Path", "Near Kindlewood’s station, a small hole under the fence by the pink building leads onto Wallower’s Path.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-wallowers-gauntlets", ["trinket"], "Get Wallower’s Gauntlets", "At the path’s end, a Kear opens the chest. Equip the gauntlets at an Underlab to burrow through walls.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-kindlewood-wallowers-room", ["bonestone"], "Get the Bonestone across Wallower’s gap", "Down the rope, past the person there, burrow through the wall over the gap with the gauntlets: the chest is on the other side.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "The schoolhouse",
      location: "Kindlewood",
      rows: [
        ["quest-school-intro", ["quest"], "Visit the schoolhouse", "In Kindlewood’s schoolhouse, look at the drawing on the board: the teacher’s three pupils are missing.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/kindlewood"}],
      ],
    },
  ],
} satisfies RawChapter;

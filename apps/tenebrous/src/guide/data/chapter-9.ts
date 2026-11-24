import type { RawChapter } from "@hundo/core/types";

export default {
  id: 9,
  title: "Backwaters",
  region: "Backwaters",
  teaser: "Backwaters",
  intro: "The Backwaters: Buffo and his jug, Pinky’s Parlor and its ladder, Lucky and the Fishing Hole, then the ladder carried back to the wreck for the starting weapons you left behind.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/backwaters"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "Shanty Swamp and Pinky’s Parlor",
      location: "Backwaters",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"], ["The 100% checklist (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/checklist"]],
      rows: [
        ["route-backwaters-entry", ["route"], "Go down into the Backwaters", "Back in the Western Wilds, take the waterfall route down into the Backwaters, where Shanty Swamp begins.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/backwaters"}],
        ["quest-gluttons-jug", ["quest"], "Get Glutton’s Jug from Buffo", "At Shanty Swamp’s north entrance, left of the first Underlab, Buffo the frog gives you an empty jug. Equip it and beat 50 enemies to fill it; the rest of his request comes later.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-backwaters-side-room", ["bonestone"], "Get the Bonestone behind the flowers", "Below Buffo, hit the flowers on the left to open a secret path: the chest is at the end of the room on the left.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["route-pinky", ["route"], "Open Pinky’s Parlor and its back door", "A Kear opens Pinky’s Parlor, the pink building at the bottom right of the first big screen. Buy the item on his rightmost shelf and Pinky moves his ladder; the back entrance, to the right, has a Kear lock of its own.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-spark-catcher", ["trinket"], "Buy Spark Catcher from Pinky", "Pinky sells it for 500 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist"}],
        ["kear-backwaters-pinkys-parlor", ["kear"], "Buy Pinky’s Kear", "Pinky sells a Kear too, for 300 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["joule-box-pinkys-parlor", ["joule-box"], "Get the Joule Box in Pinky’s back room", "Through the back entrance, carry the ladder to the far wall of Pinky’s back room and climb to the box.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-backwaters-fishing-hole-entrance-locked", ["bonestone"], "Get the Bonestone by the Fishing Hole", "On the next screen down, a chest near the top right sits behind a Kear lock: come at it from below.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["route-fishing-hole", ["route"], "Reach the Fishing Hole", "Past that lock, ride the moving platforms right to the Fishing Hole.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/backwaters"}],
        ["angling-fishing-rod", ["angling"], "Get the Fishing Rod", "At the Fishing Hole, in a cutscene, a giant fish eats the person fishing there and leaves the Fishing Rod behind.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["fish-fleeper-head", ["fish"], "Catch a Fleeper", "Catch a Fleeper in the water where you found the rod.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["angling-fishing-rod"]}],
        ["trinket-evasion-powder", ["trinket"], "Get Evasion Powder by ladder", "Set the ladder against the wall at the bottom right of Shanty Swamp’s lower area and climb to the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-backwaters-ladder", ["bonestone"], "Get the Bonestone in the building by Evasion Powder", "Set the ladder on a moving platform and climb as it passes the building left of Evasion Powder: the gem is inside.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["kear-backwaters-luckys-lair-gift", ["kear"], "Get Lucky’s Kear", "Burrow into the house in the middle of the swamp’s platforms, keeping clear of the candelabras, then burrow under the flower on the left island to wake Lucky, who gives you a Kear.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
      ],
    },
    {
      title: "The ladder back to the wreck",
      location: "Loner’s Landing",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Weapons (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/weapons"]],
      rows: [
        ["route-wreck-return", ["route"], "Carry Pinky’s ladder back to the wreck", "Bring Pinky’s ladder and three Kears. Past the Backwaters’ train station, the ladder reaches a hidden flower path that leads back to the wreck at Loner’s Landing: burrow into its hold.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-landing-belowdecks", ["bonestone"], "Get the Bonestone in the wreck’s hold", "In the hold, past a frog, a Kear opens the first lock: the chest is behind it.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["route-wreck-return"]}],
        ["weapon-landing-belowdecks-left", ["weapon"], "Open the first weapon chest in the hold", "Behind the second lock, hit the plants above the chest and run round to it before they grow back. It holds one of the two starting weapons you didn’t pick.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["route-wreck-return"]}],
        ["weapon-landing-belowdecks-right", ["weapon"], "Open the second weapon chest in the hold", "Behind the third lock, past its plants the same way: the other starting weapon you didn’t pick.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["route-wreck-return"]}],
        ["fish-trigger-antennae", ["fish"], "Catch a Buck Toothed Trigger in the wreck", "Catch a Buck Toothed Trigger in the wreck’s hold.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["route-wreck-return", "angling-fishing-rod"]}],
      ],
    },
    {
      title: "On to Nox’s Bayou",
      location: "Backwaters",
      rows: [
        ["route-to-bayou", ["route"], "Open the western route into Nox’s Bayou", "Back in Shanty Swamp’s main room of platforms, break the northern wall shortcut and take the southwestern exit.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/backwaters"}],
      ],
    },
  ],
} satisfies RawChapter;

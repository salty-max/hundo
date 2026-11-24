import type { RawChapter } from "@hundo/core/types";

export default {
  id: 9,
  title: "Backwaters",
  region: "Backwaters",
  teaser: "Backwaters",
  intro: "Begin Buffo’s request, borrow the ladder, learn to fish and recover the unchosen ship weapons.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/backwaters"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "A jug, a ladder and a fishing rod",
      location: "Backwaters",
      rows: [
        ["route-backwaters-entry", ["route"], "Descend into Backwaters from Western Wilds", "Take the waterfall route and meet Buffo.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/backwaters"}],
        ["route-pinky", ["route"], "Open both approaches to Pinky’s Parlor", "Buy something from an outer shelf so Pinky leaves his ladder at the far left or right.", {"reference": "https://www.gamerguides.com/mina-the-hollower/guide/walkthrough/noxs-bayou/backwaters-shanty-swamp"}],
        ["route-fishing-hole", ["route"], "Reach Irwin at the Fishing Hole", "Ride the moving platforms to the Fishing Hole.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/backwaters"}],
        ["route-wreck-return", ["route"], "Carry the ladder back to the wrecked ship", "At the train station, take the secret passage south toward Loner’s Landing.", {"reference": "https://www.gamerguides.com/mina-the-hollower/guide/walkthrough/noxs-bayou/backwaters-shanty-swamp"}],
        ["route-to-bayou", ["route"], "Open the western route into Nox’s Bayou", "Return to the main platform room, break the northern wall shortcut and take the southwestern exit.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/backwaters"}],
      ],
    },
    {
      title: "Swamp finds and Pinky’s stock",
      location: "Backwaters",
      compact: true,
      rows: [
        ["quest-gluttons-jug", ["quest"], "Get Glutton’s Jug from Buffo", "Speak to Buffo at the north entrance of Shanty Swamp, where it meets the Western Wilds.", {"reference": "https://meowdb.com/db/mina-the-hollower/trinkets/gluttons-jug", "place": "Backwaters"}],
        ["bonestone-backwaters-side-room", ["bonestone"], "Get the Bonestone: Side Room", "Below the frog hit the flowers on the left for a secret path; chest at the end of the left room.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Backwaters"}],
        ["trinket-spark-catcher", ["trinket"], "Get Spark Catcher", "Pinky’s Parlor, Backwaters, 500 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Backwaters"}],
        ["kear-backwaters-pinkys-parlor", ["kear"], "Get the Kear: pinky’s Parlor (300 Bones)", "Spend a Kear to open the pink building near Buffo; Pinky sells it.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Backwaters"}],
        ["joule-box-pinkys-parlor", ["joule-box"], "Get the Joule Box: Pinky’s Parlor", "Carry the ladder to the far wall and climb to the box.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Backwaters"}],
        ["trinket-evasion-powder", ["trinket"], "Get Evasion Powder", "Chest on a ledge only the ladder reaches.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Backwaters"}],
        ["bonestone-backwaters-ladder", ["bonestone"], "Get the Bonestone: floating platforms, second main room", "Throw the ladder at a wall, climb as a platform passes the shanty; gem, 500 Shard.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Backwaters"}],
        ["kear-backwaters-luckys-lair-gift", ["kear"], "Get the Kear: lucky’s free Kear", "Shanty Swamp: burrow into the purple house avoiding candelabras, burrow under the left-island flower to wake Lucky.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Backwaters"}],
        ["bonestone-backwaters-fishing-hole-entrance-locked", ["bonestone"], "Get the Bonestone: fishing Hole lock, second main room", "Come from the bottom right, open the Kear lock to reveal the chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Backwaters"}],
        ["angling-fishing-rod", ["angling"], "Get the Fishing Rod", "Path right past that lock; a giant fish eats an NPC in a cutscene and leaves the rod.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Backwaters"}],
        ["fish-fleeper-head", ["fish"], "Catch a Fleeper", "Catch a Fleeper in Backwaters.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Backwaters", "requires": ["angling-fishing-rod"]}],
      ],
    },
    {
      title: "The wreck return",
      location: "Loner’s Landing",
      compact: true,
      rows: [
        ["weapon-landing-belowdecks-left", ["weapon"], "Open the left chest below decks", "Below decks on the wreck, reached again later by way of the Backwaters: it holds one of the two starting weapons you didn’t pick.", {"reference": "https://meowdb.com/db/mina-the-hollower/weapons", "place": "Loner’s Landing", "requires": ["route-wreck-return"]}],
        ["weapon-landing-belowdecks-right", ["weapon"], "Open the right chest below decks", "Below decks on the wreck, reached again later by way of the Backwaters: it holds one of the two starting weapons you didn’t pick.", {"reference": "https://meowdb.com/db/mina-the-hollower/weapons", "place": "Loner’s Landing", "requires": ["route-wreck-return"]}],
        ["bonestone-landing-belowdecks", ["bonestone"], "Get the Bonestone: north of the wrecked starting ship", "North of the wrecked ship, from the Backwaters with Pinky’s ladder: burrow into the hull, beat a frog; needs 2 Kears, Steady Soles.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Loner’s Landing", "requires": ["route-wreck-return"]}],
        ["fish-trigger-antennae", ["fish"], "Catch a Buck Toothed Trigger", "Catch a Buck Toothed Trigger in Loner’s Landing.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Loner’s Landing", "requires": ["route-wreck-return", "angling-fishing-rod"]}],
      ],
    },
  ],
} satisfies RawChapter;

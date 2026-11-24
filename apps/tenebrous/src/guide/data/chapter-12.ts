import type { RawChapter } from "@hundo/core/types";

export default {
  id: 12,
  title: "Bone Beach",
  region: "Bone Beach",
  teaser: "Bone Beach",
  intro: "Explore the beach and caves, rescue the missing fiancé and open both paths through the Dreadworm.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/bone-beach"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "The beach and the Calcified Caves",
      location: "Bone Beach",
      rows: [
        ["quest-furgus-vial", ["quest"], "Share a vial with Furgus beside Lionel", "At the entrance, speak to Lionel and give Furgus a vial.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/bone-beach"}],
        ["route-bone-beach", ["route"], "Use coral and hanging grips to reach the beach", "Burrow beneath coral to lift or clear it, and use its bounce with the bat handholds.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/bone-beach"}],
        ["quest-fian-rescue", ["quest"], "Free Fian in the Calcified Caves", "Open the locked cell route beneath the waterfall.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/bone-beach"}],
        ["route-dreadworm", ["route"], "Enter the Dreadworm and open its back shortcut", "Follow the submerged sparkle path beside the beached creature before entering its mouth.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/bone-beach"}],
      ],
    },
    {
      title: "Beach and cave checks",
      location: "Bone Beach",
      compact: true,
      rows: [
        ["bonestone-beach-entrance-pit-handle", ["bonestone"], "Get the Bonestone: Entrance Pit Handle", "Burrow under a single block tile.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Bone Beach"}],
        ["bonestone-beach-wide-conveyor-bounce", ["bonestone"], "Get the Bonestone: Wide Conveyor Bounce", "Drop a screen, return on the left, bounce until you exit right; dig it up.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Bone Beach"}],
        ["bonestone-beach-above-tent", ["bonestone"], "Get the Bonestone: Above Tent", "A Bonestone chest on Bone Beach.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Bone Beach"}],
        ["bonestone-beach-message-in-a-bottle", ["bonestone"], "Get the Bonestone: Message In a Bottle", "A Bonestone chest on Bone Beach.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Bone Beach"}],
        ["trinket-polyp-lamp", ["trinket"], "Get Polyp Lamp", "The Delver on Bone Beach sells it for 1,250 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Bone Beach"}],
        ["kear-beach-bracs-tent", ["kear"], "Get the Kear: tent shopkeeper", "Sold in the tent on the entry trail, north past the fishing tent.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Bone Beach"}],
        ["trinket-joule-syringe", ["trinket"], "Get Joule Syringe", "Buried in the island’s corner; burrow to bring it up.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Bone Beach"}],
        ["kear-beach-calcified-caves", ["kear"], "Get the Kear: face-shaped cave chest", "First red-eyeball vertical area: climb the rope, go right into the cave, lower path to the chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Bone Beach"}],
        ["bonestone-beach-calcified-caves-jail", ["bonestone"], "Get the Bonestone: Calcified Caves Jail", "Break the wall by the NPC (freeing her leads to an Ossex trinket).", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Bone Beach"}],
        ["bonestone-beach-submerged-handles", ["bonestone"], "Get the Bonestone: Submerged Handles", "Boxes on the right, over water, shallow water; burrow the sparkles for handles to the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Bone Beach"}],
        ["bonestone-beach-pulsing-tract-hidden", ["bonestone"], "Get the Bonestone: Pulsing Tract Hidden", "Break a breakable wall along the path.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Bone Beach"}],
        ["weapon-beach-worms-back", ["weapon"], "Open the weapon chest: Worm’s Back", "Dreadworm’s Maw (Worm’s Back), tent-and-mirror screen: bounce up blue corals to the upper-left chest; Battery Buster’s Charge Swing.", {"reference": "https://meowdb.com/db/mina-the-hollower/weapons", "place": "Bone Beach"}],
        ["bonestone-beach-worms-back", ["bonestone"], "Get the Bonestone: Worm’s Back", "Right of that tent, wooden path down-right to the end.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Bone Beach"}],
      ],
    },
    {
      title: "Stomach Mine and Gut Depths",
      location: "Bone Beach",
      rows: [
        ["route-stomach-switches", ["route"], "Activate both Stomach Mine switches", "Use the geyser to reach the upper mine.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/bone-beach"}],
        ["route-gut-depths", ["route"], "Follow the moving walls through Gut Depths", "Keep to solid stopping points between the conveyors and crushing walls.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/bone-beach"}],
        ["route-generator-bone-beach", ["route"], "Restore the Shoreline Generator", "In the Brain Alcove, destroy Mined Mind’s exposed eyes, repositioning as the remaining eyes retreat.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/bone-beach"}],
      ],
    },
    {
      title: "The inner mine and boss reward",
      location: "Bone Beach",
      compact: true,
      rows: [
        ["kear-beach-stomach-mine", ["kear"], "Get the Kear: stomach Mine launch", "Defeat the central mass to get launched, drop off the far right, hop purple puffs to the Kear.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Bone Beach"}],
        ["bonestone-beach-gut-depths-moving-stairs", ["bonestone"], "Get the Bonestone: Gut Depths Moving Stairs", "Ride the in-and-out stair platform off-screen right to a secret room; dig.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Bone Beach"}],
        ["bonestone-beach-gut-depths-passage", ["bonestone"], "Get the Bonestone: Gut Depths Passage", "Before leaving the autoscroll room, hidden tunnel left of the big platforms; attack through the dark obstacles.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Bone Beach"}],
        ["boss-mined-mind", ["boss"], "Beat Mined Mind", "Bone Beach; Health Rose.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses", "place": "Bone Beach"}],
        ["health-rose-mined-mind", ["health-rose"], "Get the Health Rose from Mined Mind", "Reward for beating Mined Mind.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Bone Beach"}],
      ],
    },
    {
      title: "Sidearm for this leg",
      location: "Bone Beach",
      compact: true,
      rows: [
        ["sidearm-bounding-bombs", ["sidearm"], "Get Bounding Bombs", "On Bone Rush Trail, follow the coral route south to the miner beside the sidearm candle.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/bone-beach"}],
      ],
    },
  ],
} satisfies RawChapter;

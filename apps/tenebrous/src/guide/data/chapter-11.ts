import type { RawChapter } from "@hundo/core/types";

export default {
  id: 11,
  title: "Sandfalls",
  region: "Sandfalls",
  teaser: "Sandfalls",
  intro: "Finish Poppit’s final shop, navigate the dark mine and clear the sand works on the way to the coast.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/sandfalls"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "The dark mine and the sand works",
      location: "Sandfalls",
      rows: [
        ["route-sandfalls-mine", ["route"], "Cross the Mining Passage on its visible sparkles", "Bring at least two vials for the barrier in the Mining Passage.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/sandfalls"}],
        ["route-sifted-sands", ["route"], "Clear the dynamite carts with carried bombs", "In Sifted Sands, use the local bomb sources to destroy the red carts blocking the central building.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/sandfalls"}],
        ["route-guiding-grains", ["route"], "Direct bombs into all three Guiding Grains holes", "Use the sand-strip buttons to steer the rolling bomb.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/sandfalls"}],
      ],
    },
    {
      title: "Outskirts approach and hidden mine",
      location: "Sandfalls",
      compact: true,
      rows: [
        ["bonestone-outskirts-four-flowers", ["bonestone"], "Get the Bonestone: Four Flowers", "A Bonestone chest on the Sandfalls side of the Southern Outskirts.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Southern Outskirts"}],
        ["trinket-keri-the-wisp", ["trinket"], "Get Keri the Wisp", "Poppit’s Southern Outskirts shop, 500 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Southern Outskirts"}],
        ["kear-outskirts-poppit", ["kear"], "Get the Kear: poppit hidden shop 3 (300 Bones)", "Past the cleared wildfires, flower-launch into the cave and onto the top cliff, burrow the purple-decorated gap.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Southern Outskirts"}],
        ["kear-outskirts-mining-passage", ["kear"], "Get the Kear: invisible-platform cave", "On the way to Bone Beach, trace invisible tiles far left in the last screen, burrow the bottom-left crevice.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Southern Outskirts"}],
        ["bonestone-landing-boardwalk-sandwater-ledge", ["bonestone"], "Get the Bonestone: Boardwalk Sandwater Ledge", "Hop purple balloons over the fire into a watery cave; 200 Flakes. Only Boardwalk entry on both sides.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Loner’s Landing"}],
      ],
    },
    {
      title: "Sifted Sands and the junction",
      location: "Sandfalls",
      compact: true,
      rows: [
        ["bonestone-sandfalls-sifted-sands-snake-bomb", ["bonestone"], "Get the Bonestone: Sifted Sands Snake Bomb", "One of the two Sandfalls Bonestones you reach by carrying a bomb to clear the way.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Sandfalls"}],
        ["trinket-niter-belt", ["trinket"], "Get Niter Belt", "Chest at the top of the room; break the middle minecart.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Sandfalls"}],
        ["bonestone-sandfalls-guiding-grains-left", ["bonestone"], "Get the Bonestone: Guiding Grains Left", "Cave past the first locked door near the mine exit, where two Bonestones sit together (this pair is our left/right).", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Sandfalls"}],
        ["bonestone-sandfalls-guiding-grains-right", ["bonestone"], "Get the Bonestone: Guiding Grains Right", "Second of the two Bonestones in the cave past the first locked door near the mine exit.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Sandfalls"}],
        ["joule-box-sandfalls-hidden-cave", ["joule-box"], "Get the Joule Box: Hidden Cave", "In Sandfalls, guarded by a miniboss.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Sandfalls"}],
        ["trinket-tunneling-codex", ["trinket"], "Get Tunneling Codex", "Score 5000+ in the Ring Master’s game.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Sandfalls"}],
        ["bonestone-sandfalls-shifty-seclusion-mimic", ["bonestone"], "Get the Bonestone: Shifty Seclusion Mimic", "One of the two Sandfalls Bonestones you reach by carrying a bomb to clear the way.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Sandfalls"}],
        ["vial-pouch-payload-passage", ["vial-pouch"], "Get the Vial Pouch: Payload Passage", "Cavern under a wall across moving platforms, beneath a Kear Lock.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Sandfalls"}],
        ["bonestone-sandfalls-bone-junction", ["bonestone"], "Get the Bonestone: Bone Junction", "Climb down the ropes to the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Sandfalls"}],
        ["boss-major-miner", ["boss"], "Beat Major Miner", "A mid-game boss; beat it to go on to Bone Beach.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/sandfalls", "place": "Sandfalls"}],
        ["angling-anglers-raft", ["angling"], "Get the Angler’s Raft", "Back up one rope, right, chest in the water.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Sandfalls"}],
      ],
    },
    {
      title: "After the third merchant shop",
      location: "Sandfalls",
      rows: [
        ["gear-disturbing-dance", ["gear"], "Learn the Disturbing Dance", "Dance with Grinnsly: the dance opens warp holes to Sandfalls, the Molten Foundry and the Grassland.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/sandfalls"}],
      ],
    },
  ],
} satisfies RawChapter;

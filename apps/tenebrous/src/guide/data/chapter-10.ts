import type { RawChapter } from "@hundo/core/types";

export default {
  id: 10,
  title: "Nox’s Bayou",
  region: "Nox’s Bayou",
  teaser: "Nox’s Bayou",
  intro: "Work the flood controls, inspect the Moonlit Path and restore the swamp’s generator before escorting the missing band member.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/noxs-bayou"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "Flood controls and the Moonlit Path",
      location: "Nox’s Bayou",
      rows: [
        ["route-bayou-water", ["route"], "Raise the water to open Boat Bog and Big Lagoon", "Burrow into the taps to raise the water, then ride the boats.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/noxs-bayou"}],
        ["route-moonlit", ["route"], "Explore the Moonlit Path", "Lower the rope to the south first, then work north over the lily pads.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/noxs-bayou"}],
        ["route-thicket", ["route"], "Clear Thick Thicket’s side caves before the lair", "Clear the plants guarding the narrow footing.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/noxs-bayou"}],
        ["route-tainted-lair", ["route"], "Turn both taps and open the boss approach", "Raise the water with one tap, then return north to the hidden tunnel and collect its Bonestone before raising the second.", {"reference": "https://www.gamerguides.com/mina-the-hollower/guide/walkthrough/noxs-bayou/noxs-bayou"}],
        ["route-generator-bayou", ["route"], "Restore the Swampy Generator", "Defeat Nox’s Beast, collect the Health Rose and follow the waterfall route to the tower.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/noxs-bayou"}],
      ],
    },
    {
      title: "Boat Bog, the lagoon and the Moonlit Path",
      location: "Nox’s Bayou",
      compact: true,
      rows: [
        ["trinket-twill-weave", ["trinket"], "Get Twill Weave", "Nox’s Bayou chest at the top of a rope.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Nox’s Bayou"}],
        ["bonestone-bayou-first-flooder", ["bonestone"], "Get the Bonestone: First Flooder", "After the first water raise, hop from the bottom boat to the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Nox’s Bayou"}],
        ["bonestone-bayou-water-bugs", ["bonestone"], "Get the Bonestone: boat Bog, top right by the shanty", "Burrow a hole, clear the water-skaters guarding the chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Nox’s Bayou"}],
        ["kear-bayou-lagoon-unflooded-dark-room", ["kear"], "Get the Kear: fireball arena chest", "Strike the top-left boulder, follow the dark tunnel, beat the fireball enemy, break the chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Nox’s Bayou"}],
        ["trinket-vascular-syrup", ["trinket"], "Get Vascular Syrup", "Chest at a room’s edge.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Nox’s Bayou"}],
        ["trinket-pit-preserver", ["trinket"], "Get Pit Preserver", "Kindly Hag’s shack, Nox’s Bayou, 1000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Nox’s Bayou"}],
        ["kear-bayou-swamp-shack", ["kear"], "Get the Kear: kindly Hag’s shack (300 Bones)", "Northeast edge of the Big Lagoon, after the giant frog falls and the water returns.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Nox’s Bayou"}],
        ["weapon-bayou-hag-chest", ["weapon"], "Open the weapon chest: Swamp Shack", "Big Lagoon Swamp Shack (top right, after raising the water), back room behind a Kear gate; Blaststrike Maul’s Boom Charge upgrade.", {"reference": "https://meowdb.com/db/mina-the-hollower/weapons", "place": "Nox’s Bayou"}],
        ["bonestone-bayou-moonlit-path", ["bonestone"], "Get the Bonestone: moonlit Path, right alcove", "Follow the left wall, lily pads to the right alcove above the rope to the second Underlab.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Nox’s Bayou"}],
        ["trinket-iron-lung", ["trinket"], "Get Iron Lung", "Chest beside the mirror after Mock Moon falls.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Nox’s Bayou"}],
      ],
    },
    {
      title: "Thicket, lair and the return escort",
      location: "Nox’s Bayou",
      compact: true,
      rows: [
        ["bonestone-bayou-plant-pond-cave", ["bonestone"], "Get the Bonestone: thick Thicket, carnivorous plant room", "Burrow under a ledge into a water-skater cave; 500 Shard.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Nox’s Bayou"}],
        ["bonestone-bayou-thick-thicket", ["bonestone"], "Get the Bonestone: thick Thicket, two-plant glade", "Top right, half hidden by leaves, before the plants fight.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Nox’s Bayou"}],
        ["kear-bayou-thicket-hidden-cave", ["kear"], "Get the Kear: thick Thicket hidden cave", "Drop to the bottom of the vertical arena, exit through the left wall, enter the cave and hop the boats.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Nox’s Bayou"}],
        ["bonestone-bayou-grate-lake", ["bonestone"], "Get the Bonestone: Grate Lake", "The far-right switch clears the spikes; 500 Shard.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Nox’s Bayou"}],
        ["boss-noxs-beast", ["boss"], "Beat Nox’s Beast", "Nox’s Bayou arena; Health Rose.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses", "place": "Nox’s Bayou"}],
        ["health-rose-noxs-beast", ["health-rose"], "Get the Health Rose from Nox’s Beast", "Reward for beating Nox’s Beast in its arena.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Nox’s Bayou"}],
        ["bonestone-bayou-gutter-tunnel", ["bonestone"], "Get the Bonestone: Gutter Tunnel", "Raise only one water gear, then the northern hole opens to a storm-drain room; chest in the corner.", {"reference": "https://www.gamerguides.com/mina-the-hollower/guide", "place": "Nox’s Bayou"}],
        ["trinket-tumbling-tutu", ["trinket"], "Get Tumbling Tutu", "Reward for reuniting Cliff with his band.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Backwaters"}],
      ],
    },
  ],
} satisfies RawChapter;

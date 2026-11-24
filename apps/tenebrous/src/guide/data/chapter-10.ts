import type { RawChapter } from "@hundo/core/types";

export default {
  id: 10,
  title: "Nox’s Bayou",
  region: "Nox’s Bayou",
  teaser: "Nox’s Bayou",
  intro: "Nox’s Bayou: water levels to raise, Boat Bog and the Big Lagoon, the Kindly Hag’s shack, the Moonlit Path, Thick Thicket and Tainted Lair, to the swamp’s generator.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/noxs-bayou"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "Boat Bog and the Big Lagoon",
      location: "Nox’s Bayou",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"], ["The 100% checklist (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/checklist"]],
      rows: [
        ["route-bayou-water", ["route"], "Raise the water to open Boat Bog and the Big Lagoon", "Burrow into the taps to raise the water, then ride the boats.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/noxs-bayou"}],
        ["trinket-twill-weave", ["trinket"], "Get Twill Weave", "From the first boat, take the gap with a platform above it and climb the rope on the right: the chest is at the top.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-bayou-first-flooder", ["bonestone"], "Get the Bonestone off the bottom boat", "After the first water raise, hop from the bottom boat to the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-bayou-water-bugs", ["bonestone"], "Get the Bonestone among the water-skaters", "Where boats wait on both sides of a split wall, take the top boats to the small hole at the top right, by a shanty: clear the water-skaters guarding the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["kear-bayou-lagoon-unflooded-dark-room", ["kear"], "Get the Kear in the dark tunnel", "In the Big Lagoon, break the logs at the top left before you raise the water there: the hole behind them leads down a dark tunnel to a fireball enemy guarding the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-vascular-syrup", ["trinket"], "Get Vascular Syrup", "After the second raise, take the small tunnel at the bottom right to the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-pit-preserver", ["trinket"], "Buy Pit Preserver from the Kindly Hag", "In the shack at the Big Lagoon’s top right, after the second raise, the Kindly Hag sells it for 1,000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist"}],
        ["kear-bayou-swamp-shack", ["kear"], "Buy the Kindly Hag’s Kear", "She sells a Kear too, for 300 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["weapon-bayou-hag-chest", ["weapon"], "Open the weapon chest in the Hag’s shack", "A Kear opens the lock inside the Hag’s shack. Behind it is a chest for the Blaststrike Maul: with the wreck’s weapon chests already open, it gives one of the Maul’s upgrades.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "The Moonlit Path",
      location: "Nox’s Bayou",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"]],
      rows: [
        ["route-moonlit", ["route"], "Find the Moonlit Path", "A tunnel at the Big Lagoon’s bottom left opens onto the Moonlit Path, a river of lily pads.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/noxs-bayou"}],
        ["bonestone-bayou-moonlit-path", ["bonestone"], "Get the Bonestone on the Moonlit Path", "Ride the lily pads downriver: the chest is in an alcove on your right.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["boss-mock-moon", ["boss"], "Beat Mock Moon", "Then ride the lily pads all the way back upriver: Mock Moon waits in the arena at the path’s end.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses"}],
        ["trinket-iron-lung", ["trinket"], "Get Iron Lung", "After Mock Moon, the chest is beside the mirror on the next screen.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "Thick Thicket and Tainted Lair",
      location: "Nox’s Bayou",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"]],
      rows: [
        ["route-thicket", ["route"], "Clear Thick Thicket’s plants", "Clear the plants guarding the narrow footing.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/noxs-bayou"}],
        ["bonestone-bayou-plant-pond-cave", ["bonestone"], "Get the Bonestone in the water-skater cave", "On the main path, where you drop into spiky water, take the tunnel on the right into a cave of water-skaters.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-bayou-thick-thicket", ["bonestone"], "Get the Bonestone half hidden by a tree", "In Thick Thicket, on the screen where a tree half covers a chest at the top right, open it before the two plants attack.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests"}],
        ["kear-bayou-thicket-hidden-cave", ["kear"], "Get the Kear in Thick Thicket’s hidden cave", "Past a plant enemy on a floating platform, take the hidden stairs on the left, then go right to the cracked wall between the trees: the cave behind it leads by boat to the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["route-tainted-lair", ["route"], "Raise Tainted Lair’s water twice", "Raise the water with one tap, take the Bonestone it opens, then raise it a second time for the next one and the way to the boss.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/noxs-bayou"}],
        ["bonestone-bayou-gutter-tunnel", ["bonestone"], "Get the Bonestone in the storm drain", "In the pond with two taps, raise the water once, go up a screen and swim through the gap at the top: the chest is in the corner of the storm-drain room.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-bayou-grate-lake", ["bonestone"], "Get the Bonestone behind the spikes", "After raising the water twice, head south: the button at the bottom right lowers the spikes in front of the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["boss-noxs-beast", ["boss"], "Beat Nox’s Beast", "Nox’s Beast waits at the end of Tainted Lair.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses"}],
        ["health-rose-noxs-beast", ["health-rose"], "Get the Health Rose from Nox’s Beast", "Beating Nox’s Beast gives a Health Rose.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["route-generator-bayou", ["route"], "Climb to the Bayou’s generator", "After Nox’s Beast, follow the waterfall route to the swamp’s generator tower and climb it.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/noxs-bayou"}],
      ],
    },
    {
      title: "The band’s missing member",
      location: "Backwaters",
      rows: [
        ["trinket-tumbling-tutu", ["trinket"], "Bring Cliff back to his band", "The band playing in Shanty Swamp is missing Cliff, their frog. After the Bayou’s tower, find him behind a waterfall and carry him back: he gives you Tumbling Tutu.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
  ],
} satisfies RawChapter;

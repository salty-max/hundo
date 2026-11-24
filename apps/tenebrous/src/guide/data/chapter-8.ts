import type { RawChapter } from "@hundo/core/types";

export default {
  id: 8,
  title: "Septemburg",
  region: "Septemburg",
  teaser: "Septemburg",
  intro: "Septemburg’s farms, Crow Town and Tangled Woods: three missing pupils to find while the Carving Man gives chase, then his shack and the second generator.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "Withered Farms and the first chase",
      location: "Septemburg",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"]],
      rows: [
        ["route-septemburg-pads", ["route"], "Cross Withered Farms on the launch pads", "Septemburg lies past Kindlewood, and its first area, Withered Farms, is crossed on launch pads: break the cracked stumps to find hidden ones, and take the side room to the south before you climb north.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"}],
        ["sidearm-hollowers-rocks", ["sidearm"], "Get the Pebbles", "On the early climb up Withered Farms’ launch pads, strike the candle above the next ledge.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"}],
        ["bonestone-septemburg-launch-pad-secret-room", ["bonestone"], "Get the Bonestone at the foot of the launch pads", "At the end of the first area, go under the fence to the bottom launch pad and time the rotating pads, facing left then down, to land by the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["kear-septemburg-launch-pad-crow", ["kear"], "Get the Kear from the scarecrow", "On the checkpoint platform, a hidden trampoline at the far left starts a chain of pads and moving platforms up to a scarecrow, an enemy: talk to it, then beat it.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["sidearm-recall-disc", ["sidearm"], "Get Recall Disc", "In Withered Farms, take the small northern tunnel and strike its candle.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"}],
        ["quest-child-one", ["quest"], "Rescue Kid, the first missing pupil", "When the Carving Man appears, keep moving: this is a chase, not the fight. Kid is off the chase’s route, in a hollow log at the top left at its end.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-septemburg-withered-farms-kid-room", ["bonestone"], "Get the Bonestone by Kid’s hollow log", "Talk to Kid, and the Carving Man breaks the wall that hides the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["sidearm-beckoning-collar", ["sidearm"], "Get Beckoning Collar", "On a strong-wind screen after the early chase, strike the left candle.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"}],
        ["bonestone-septemburg-hidden-mandrake-room", ["bonestone"], "Get the Bonestone in the hidden cave", "At the left end of the next windy area, go under the fence and clear the grass on the left wall: the hidden cave behind holds the chest, with two Crows on guard.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["kear-septemburg-hidden-crop-thresher-room", ["kear"], "Get the Kear behind the bulldozers", "In the field with the bulldozers, lure them into the walls on the left and the right: once both are broken, a pipe leads to the Kear.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
      ],
    },
    {
      title: "The Rotten Barn",
      location: "Septemburg",
      rows: [
        ["quest-child-two", ["quest"], "Rescue Squealer in the Rotten Barn", "In the Rotten Barn, the Carving Man gives chase again: break into the route at the upper right rather than following the walls left. Squealer is past the tiny platforms.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"}],
        ["bonestone-septemburg-rotten-barn-squealer", ["bonestone"], "Get the Bonestone by Squealer", "From Squealer, ride the second tiny platform down to the chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests"}],
      ],
    },
    {
      title: "Crow Town",
      location: "Septemburg",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"], ["The 100% checklist (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/checklist"], ["Weapons (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/weapons"]],
      rows: [
        ["route-crow-town", ["route"], "Cross Crow Town using its lightning shelters", "Lightning strikes Crow Town: shelter by the rods and in the hollow logs between strikes.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"}],
        ["bonestone-septemburg-tunnel-locked", ["bonestone"], "Get the Bonestone in the giant pig’s room", "Past the bridge and a log, beat the giant pig in its room: the chest beside it is behind a Kear lock.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-repulsing-root", ["trinket"], "Buy Repulsing Root from the scarecrow merchant", "Up the path right of the bridge, untie the scarecrow on the right platform of the leaf-blower field: he’s a merchant, and Repulsing Root costs 1,250 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist"}],
        ["kear-septemburg-crow-town", ["kear"], "Buy the scarecrow merchant’s Kear", "The scarecrow merchant sells a Kear too, for 750 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["weapon-septemburg-rooftop-casket", ["weapon"], "Open the weapon chest in Crow Town", "Left of the scarecrow merchant’s shop, pass the bottom-left door: an enemy smashes out of it as you go by. Go in and up the stairs to the red chest on the balcony, a chest for the Guardian Casket: the weapon itself or one of its upgrades.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "Tangled Woods and the Carving Shack",
      location: "Septemburg",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"]],
      rows: [
        ["kear-septemburg-tangled-woods-hidden-grove", ["kear"], "Get the Kear behind the carved stump", "Entering the dark forest of Tangled Woods, break the X-carved stump at the bottom right: the chest is at the top left of the secret screen beyond.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["quest-child-three", ["quest"], "Rescue Galloway in Tangled Woods", "In Tangled Woods’ broad chase area, take the southwestern branch and follow the log paths into the side room with the wind and the pads: Galloway, the third pupil, is there.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"}],
        ["bonestone-septemburg-tangled-woods-galloway-room", ["bonestone"], "Get the Bonestone by Galloway", "On the third chase, in the area with the spike switches, the chest is in a hollow log at the bottom left.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["route-stormwatch", ["route"], "Cross Stormwatch Way", "Stormwatch Way is full of lightning rods: keep close to them between strikes.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"}],
        ["bonestone-septemburg-stormwatch-way", ["bonestone"], "Get the Bonestone at the end of the windy stretch", "The chest is in plain view at the end of the windy stretch that follows.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["boss-carving-man", ["boss"], "Beat The Carving Man", "At the end of the last chase, in the Carving Shack, the Carving Man can be hurt at last.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses"}],
        ["health-rose-carving-man", ["health-rose"], "Get the Health Rose from the Carving Man", "Beating the Carving Man gives a Health Rose.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["route-generator-septemburg", ["route"], "Climb to Septemburg’s generator", "After the Carving Man, climb Septemburg’s generator tower to the top.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"}],
      ],
    },
    {
      title: "The sewers back to Kindlewood",
      location: "Septemburg",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"]],
      rows: [
        ["bonestone-septemburg-canal-slime-room", ["bonestone"], "Get the Bonestone under the sewer pipes", "From the tower, the way back to Kindlewood runs through the sewers. One screen down, the chest is under the pipes at the top left.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-septemburg-canal-box-room", ["bonestone"], "Get the Bonestone among the sewer’s floor gaps", "In the sewer room with pipes and gaps in the floor, the chest is in the bottom-left corner.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-septemburg-canal-well-entrance", ["bonestone"], "Get the Bonestone at the sewers’ far end", "The chest is in plain view just before you leave the sewers for Kindlewood.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "Back to the schoolhouse",
      location: "Kindlewood",
      rows: [
        ["trinket-lightning-grip", ["trinket"], "Collect Lightning Grip from the teacher", "Save all three pupils during the chases on your first pass through Septemburg, and the teacher in Kindlewood’s schoolhouse gives you Lightning Grip. Miss any of them, and the Trinket Bazaar in Ossex sells it later.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["quest-child-one", "quest-child-two", "quest-child-three"]}],
      ],
    },
  ],
} satisfies RawChapter;

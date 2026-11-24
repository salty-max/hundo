import type { RawChapter } from "@hundo/core/types";

export default {
  id: 14,
  title: "Coltrane Peak",
  region: "Coltrane Peak",
  teaser: "Coltrane Peak",
  intro: "Coltrane Peak: Thorne on the train, the Frozen Pass, Dead Man’s Gorge, Mirren’s woods, Rupert on the Rail Yard’s ice, then Icebound Cavern and the Agnes Express to the summit.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "The train and the Frozen Pass",
      location: "Coltrane Peak",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"]],
      rows: [
        ["route-thorne-train", ["route"], "Reach Thorne on the train", "On the way up the mountain, climb the ladder and pipe by the engine.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
        ["boss-thorne-second", ["boss"], "Beat Thorne on the train", "Thorne waits at the top.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses"}],
        ["bonestone-coltrane-frozen-pass", ["bonestone"], "Get the Bonestone below the snowballs", "From the train, go left and down through the holes, clear the snowballs and drop to the chest on the left.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-smelling-salts", ["trinket"], "Crack Smelling Salts out of the ice", "Just below, near a person standing in the snow, a frozen block holds Smelling Salts: throw it into something to crack it.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["route-frigid-returns", ["route"], "Lower the Frozen Pass shortcuts", "Take the station’s left ladder and lower the ropes back toward Eastern Heath.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
        ["bonestone-coltrane-frozen-pass-rope", ["bonestone"], "Get the Bonestone by the rope in the pits", "From the station, go left; in the pits, keep dropping onto the platforms until a rope on the right leads to the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-coltrane-frigid-station-missed-train", ["bonestone"], "Get the Bonestone down the empty track", "Buy a ticket but let the train leave without you, then walk the empty track into the tunnel on the left.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "Dead Man’s Gorge",
      location: "Coltrane Peak",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"]],
      rows: [
        ["route-gorge", ["route"], "Descend through Dead Man’s Gorge", "Use Steady Soles if you dislike the ice sliding.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
        ["trinket-burning-beastium", ["trinket"], "Get Burning Beastium", "In Dead Man’s Gorge’s room with the icy floor, take the small hole at the bottom right and follow it to its end.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["kear-coltrane-dead-mans-gorge-rail", ["kear"], "Get the Kear under the rails", "In the rail-riding room, hop off onto the glass floor and burrow under the rails to the hole where they end.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["sidearm-gnawing-ghosts", ["sidearm"], "Get Gnawing Ghosts", "In Dead Man’s Gorge, a room holds ice cubes: break them, and the middle one holds Gnawing Ghosts.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
      ],
    },
    {
      title: "Frostbite Woods",
      location: "Coltrane Peak",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["The 100% checklist (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/checklist"]],
      rows: [
        ["route-mirren", ["route"], "Take the detour into Frostbite Woods", "From the Underlab, follow the eastern rooms with glass floors into Frostbite Woods.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
        ["boss-mirren", ["boss"], "Beat Mirren", "Past the next Underlab, to the right, Mirren waits by an empty stall in a building: offer help, and the ghost turns on you.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-blinking-glass", ["trinket"], "Get Blinking Glass", "Beating Mirren gives Blinking Glass.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "The Rail Yard",
      location: "Coltrane Peak",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"], ["Weapons (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/weapons"]],
      rows: [
        ["bonestone-coltrane-rail-yard-beside-pipe", ["bonestone"], "Get the Bonestone past the snowmen", "On the Rail Yard’s rideable tracks, go past the snowmen in the middle left and drop to the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["quest-rupert", ["quest"], "Free Rupert from the ice", "Past a Kear lock at the track area’s top left, Rupert races you across the ice. When he’s stuck in it, burrow up under him to free him.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-watchful-eye", ["trinket"], "Buy Watchful Eye from Rupert", "Once he’s safe, Rupert sells it for 2,000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist"}],
        ["kear-coltrane-rail-yard-room-rupert", ["kear"], "Buy Rupert’s Kear", "He sells a Kear too, for 1,000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["bonestone-coltrane-rail-yard-cliff", ["bonestone"], "Get the Bonestone across the tracks", "Cross the tracks: the chest is in the middle of the right side.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["weapon-coltrane-rail-yard", ["weapon"], "Open the Rail Yard’s weapon chest", "Near that chest, burrow under the rails from the snow patch to the hole in the wall at their right end: a red chest for the Guardian Casket, holding the weapon itself or one of its upgrades.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "Icebound Cavern and the summit",
      location: "Coltrane Peak",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"]],
      rows: [
        ["route-icebound", ["route"], "Cross Icebound Cavern", "Cross the ice rooms to Frozen Horror.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
        ["boss-frozen-horror", ["boss"], "Beat Frozen Horror", "Frozen Horror waits at the end of Icebound Cavern.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses"}],
        ["kear-coltrane-spiral-summit", ["kear"], "Get the Kear past the fragile floors", "On Spiral Summit, in the area with fragile floors, break the wall at the top left: the Kear is in the next room.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["route-generator-coltrane", ["route"], "Board the Agnes Express", "Past Icebound Cavern and up Spiral Summit, board the Agnes Express.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
        ["bonestone-coltrane-agnes-express-mimic", ["bonestone"], "Get the Bonestone aboard the Agnes Express", "Right after you board the Agnes Express, break the wall on the left and beat the miniboss behind it.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["boss-locomotress", ["boss"], "Beat Locomotress Agnes", "Locomotress Agnes is a runaway train: ride its cars as it chases you.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses"}],
        ["health-rose-locomotress", ["health-rose"], "Get the Health Rose from Locomotress", "Beating Locomotress Agnes gives a Health Rose.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
  ],
} satisfies RawChapter;

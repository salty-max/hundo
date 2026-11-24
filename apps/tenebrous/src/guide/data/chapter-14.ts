import type { RawChapter } from "@hundo/core/types";

export default {
  id: 14,
  title: "Coltrane Peak",
  region: "Coltrane Peak",
  teaser: "Coltrane Peak",
  intro: "Open the mountain shortcuts, visit the optional eastern path and finish the Agnes Express route.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "The mountain and the railway yard",
      location: "Coltrane Peak",
      rows: [
        ["route-thorne-train", ["route"], "Continue through the engine-car confrontation", "Use the ladder and pipe to reach Thorne.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
        ["route-frigid-returns", ["route"], "Lower the Frozen Pass shortcuts", "Take the station’s left ladder and lower the ropes back toward Eastern Heath.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
        ["route-gorge", ["route"], "Descend through Dead Man’s Gorge", "Use Steady Soles if you dislike the ice sliding.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
        ["route-mirren", ["route"], "Take the eastern Frostbite Woods detour", "From its Underlab, follow the eastern glass-floor rooms to the stool in the snow.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
        ["quest-rupert", ["quest"], "Rescue Rupert on the Rail Yard’s western branch", "On the ice, burrow up under Rupert to pull him out.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
        ["route-icebound", ["route"], "Finish Icebound Cavern and open its mirror", "Cross the ice rooms to Frozen Horror, attack after the charge sequence and open the pipe shortcut beyond.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
        ["route-generator-coltrane", ["route"], "Restore the Frozen Generator", "Continue through Spiral Summit and the Agnes Express.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
      ],
    },
    {
      title: "Mountain branches and summit rewards",
      location: "Coltrane Peak",
      compact: true,
      rows: [
        ["boss-thorne-second", ["boss"], "Beat Thorne again", "Thorne is met three times; this is a later fight.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses", "place": "Coltrane Peak"}],
        ["bonestone-coltrane-frigid-station-missed-train", ["bonestone"], "Get the Bonestone: rails, far western end", "Once the train runs, buy a ticket but let it leave, then walk left along the rails to the far-west chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Coltrane Peak"}],
        ["bonestone-coltrane-frozen-pass-rope", ["bonestone"], "Get the Bonestone: Frozen Pass Rope", "From the station go left; in the pit section drop onto platforms until a rope on the right leads to the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Coltrane Peak"}],
        ["bonestone-coltrane-frozen-pass", ["bonestone"], "Get the Bonestone: Frozen Pass", "From the train go left and down through the holes; clear snowballs, drop to the chest on the left.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Coltrane Peak"}],
        ["trinket-smelling-salts", ["trinket"], "Get Smelling Salts", "Eastern Heath, inside a block of ice.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Eastern Heath"}],
        ["trinket-burning-beastium", ["trinket"], "Get Burning Beastium", "Chest at the edge of the platforming challenge.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Coltrane Peak"}],
        ["kear-coltrane-dead-mans-gorge-rail", ["kear"], "Get the Kear: chest past ice cubes", "After the first tracks, burrow under the rails to the bottom-right hole and the chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Coltrane Peak"}],
        ["boss-mirren", ["boss"], "Beat Mirren", "Secret ghost in the Frostbite Woods carriage, Coltrane Peak, hostile when you offer help; gives Blinking Glass.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses", "place": "Coltrane Peak"}],
        ["trinket-blinking-glass", ["trinket"], "Get Blinking Glass", "Reward for beating Mirren, Coltrane Peak.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Coltrane Peak"}],
        ["bonestone-coltrane-rail-yard-beside-pipe", ["bonestone"], "Get the Bonestone: Rail Yard Beside Pipe", "One of the two Bonestone chests along the Rail Yard’s rideable tracks on Coltrane Peak.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Coltrane Peak"}],
        ["bonestone-coltrane-rail-yard-cliff", ["bonestone"], "Get the Bonestone: Rail Yard Cliff", "One of the two Bonestone chests along the Rail Yard’s rideable tracks on Coltrane Peak.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Coltrane Peak"}],
        ["weapon-coltrane-rail-yard", ["weapon"], "Open the Rail Yard’s weapon chest", "It holds the Guardian Casket’s Grave Counter upgrade.", {"reference": "https://meowdb.com/db/mina-the-hollower/weapons", "place": "Coltrane Peak"}],
        ["trinket-watchful-eye", ["trinket"], "Get Watchful Eye", "Rupert’s shop, Coltrane Peak, 2000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Coltrane Peak"}],
        ["kear-coltrane-rail-yard-room-rupert", ["kear"], "Get the Kear: rupert’s shop (1000 Bones)", "Up the tracks, beat the snowman, free Rupert from the ice; he opens a shop selling it.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Coltrane Peak"}],
        ["kear-coltrane-spiral-summit", ["kear"], "Get the Kear: hidden path past moving platforms", "Break thin ice to move the platforms; take the left opening just before the last one.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Coltrane Peak"}],
        ["bonestone-coltrane-agnes-express-mimic", ["bonestone"], "Get the Bonestone: agnes Express", "Take the destructible door on the left right after boarding.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Coltrane Peak"}],
        ["boss-frozen-horror", ["boss"], "Beat Frozen Horror", "Coltrane Peak’s Spark Generator boss.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses", "place": "Coltrane Peak"}],
        ["boss-locomotress", ["boss"], "Beat Locomotress", "Mina rides the cars as the runaway train chases; Health Rose.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses", "place": "Coltrane Peak"}],
        ["health-rose-locomotress", ["health-rose"], "Get the Health Rose from Locomotress", "Dropped by Locomotress Agnes on top of the train.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Coltrane Peak"}],
      ],
    },
    {
      title: "Sidearm for this leg",
      location: "Coltrane Peak",
      compact: true,
      rows: [
        ["sidearm-gnawing-ghosts", ["sidearm"], "Get Gnawing Ghosts", "In Dead Man’s Gorge, the middle cube holds it.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/coltrane-peak"}],
      ],
    },
  ],
} satisfies RawChapter;

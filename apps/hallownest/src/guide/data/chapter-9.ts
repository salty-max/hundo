import type { RawChapter } from "@hundo/core/types";

export default {
  id: 9,
  title: "The Cliffs and Forgotten Corners",
  region: "Howling Cliffs · The Hive · The Abyss",
  teaser: "Howling Cliffs",
  intro: "Climb the Howling Cliffs for the last Nail Art and Joni’s Repose, break into the Hive, then sweep the kingdom’s last corners: the Lifeblood door in the Abyss and the Stag Nest.",
  sources: [["Steam guide ch 10–13, 18, 21–22, 25 and 28 · Cliffs, the Hive, the Lifeblood door and the Stag Nest", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"], ["Cliffs landmarks: entrances, Mato, Baldur Shell, Joni’s Repose and the Stag Nest", "https://hollowknight.wiki/w/Howling_Cliffs"], ["Hive landmarks, entrance and Hive Guardians", "https://hollowknight.wiki/w/The_Hive"]],
  groups: [
    {
      title: "Howling Cliffs and the last Nail Art",
      location: "Howling Cliffs · Dirtmouth",
      sources: [["Map prices and Cornifer leaving every area after the three Dreamers", "https://hollowknight.wiki/w/Cornifer"], ["Iselda’s map prices", "https://hollowknight.wiki/w/Iselda"], ["Mato’s hut", "https://hollowknight.wiki/w/Nailmaster_Mato"], ["Baldur Shell: the 1 Geo chest and the right-hand Elder Baldur", "https://hollowknight.wiki/w/Baldur_Shell"], ["Gorb’s spear rings", "https://hollowknight.wiki/w/Gorb"], ["Sly’s basement once all three Nail Arts are learnt", "https://hollowknight.wiki/w/Sly"], ["Jiji’s door, Rancid Eggs and Steel Soul", "https://hollowknight.wiki/w/Confessor_Jiji"], ["The stone door past the graveyard", "https://hollowknight.wiki/w/Dirtmouth"]],
      rows: [
        ["route-cliffs-entry", ["route"], "Enter the Howling Cliffs", "There are three ways in, all needing the Mantis Claw, and the third comes later, from the Stag Nest. Of the first two, a secret passage left of where you started in King’s Pass climbs to the north-east of the Cliffs; a path in northern Greenpath, along the high ground past where you fought the Vengefly King, leads to their south."],
        ["map-howling-cliffs", ["map"], "Buy the Howling Cliffs map", "Cornifer leaves every area once all three Dreamers are down, so expect his note here and buy the map from Iselda in Dirtmouth for 100 Geo. If he is still humming on the main cliff face, he charges 75 Geo."],
        ["nail-art-mato", ["nail-art"], "Learn Cyclone Slash from Nailmaster Mato", "Mato’s hut is in the north-east of the Cliffs, near the drop to King’s Pass. Climb as high as the cliffs go, head right, cross the spiked floor and find his door in a crevasse under the overhang. He teaches you Cyclone Slash."],
        ["charm-baldur-shell", ["charm"], "Collect Baldur Shell in the Cliffs border cave", "In the south-west of the Cliffs, near the way up from Greenpath, a chest holds only 1 Geo. Jump down into it. Two Elder Baldurs wait below, but only the right-hand one has to die: its tunnel, lined with dead Elder Baldurs, leads to the charm."],
        ["warrior-dream-gorb", ["warrior-dream"], "Defeat Gorb near the top of the Cliffs", "Climb up and left from Mato’s hut to Gorb’s tombstone and Dream Nail it. He fires rings of spears outward, two and then three waves at a time as he weakens; slip through the gaps and hit him between them. 100 Essence."],
        ["charm-nailmaster-glory", ["charm"], "Receive Nailmaster’s Glory from Sly", "With all three Nail Arts learnt, go to Sly’s shop in Dirtmouth, drop into the basement and talk to him for the charm."],
        ["quest-jiji", ["quest"], "Unlock Confessor Jiji’s cave", "Past the graveyard at Dirtmouth’s east end, a stone door opens to a Simple Key. Inside is Confessor Jiji: give her a Rancid Egg and she calls your Shade to her from wherever it lies. In Steel Soul mode, Steel Soul Jinn sits there instead and buys Rancid Eggs for Geo."],
      ],
    },
    {
      title: "The Hive",
      location: "The Hive · Kingdom’s Edge",
      sources: [["Hive Knight’s attacks", "https://hollowknight.wiki/w/Hive_Knight"], ["Hiveblood below the arena", "https://hollowknight.wiki/w/Hiveblood"]],
      rows: [
        ["route-hive-door", ["route"], "Enter the Hive through the breakable wall", "Ride the Tram to Kingdom’s Edge and walk right from the station to the end of the tunnel, where Hivelings hover by a cracked wall. Break it with your nail or a spell to open the Hive. Inside, a bench hangs from the ceiling trapped in amber; break it free if you want a checkpoint."],
        ["route-hive-map", ["route"], "Fill in the Hive on the Kingdom’s Edge map", "The Hive has no map of its own: its rooms fill in on the Kingdom’s Edge map. Explore its corridors to fill them in."],
        ["boss-hive-knight", ["boss", "percent-boss"], "Defeat Hive Knight", "Break through the cracked barriers at the far right of the Hive’s big cavern to reach his arena. His lunge covers most of the floor, so jump it, and swat or dodge the slow-homing bees he spits up."],
        ["charm-hiveblood", ["charm"], "Collect Hiveblood under the Hive Knight arena", "After the fight, go right and down under the arena for the charm. Go back up to the room above if you want to meet Queen Vespa."],
      ],
    },
    {
      title: "Return pickups across the kingdom",
      location: "Howling Cliffs · Ancient Basin · The Abyss · The Hive · Dirtmouth",
      sources: [["Lifeblood door: the count, the egg and the seal", "https://hollowknight.wiki/w/Lifeblood_Core"], ["Lifeblood Chamber on the Abyss’s west wall", "https://hollowknight.wiki/w/The_Abyss_(Hollow_Knight)"], ["Joni’s 40% and Fragile Heart", "https://hollowknight.wiki/w/Joni%27s_Blessing"], ["Lifeblood doesn’t heal back", "https://hollowknight.wiki/w/Lifeblood"], ["Mask Shard locations", "https://hollowknight.wiki/w/Mask_Shard_(Hollow_Knight)"], ["Stag Nest opens with every other station", "https://hollowknight.wiki/w/Fast_Travel_(Hollow_Knight)"], ["Stag Nest Vessel Fragment", "https://hollowknight.wiki/w/Vessel_Fragment"]],
      compact: true,
      rows: [
        ["charm-joni-blessing", ["charm"], "Collect Joni’s Blessing from Joni’s Repose", "Beside Cornifer’s spot on the cliff face, a pitch-dark cavern opens; light it with the Lantern and mind the spikes and Vengeflies. Follow the blue butterflies east into Joni’s Repose; the charm lies by the altar where her spirit appears."],
        ["pickup-lifeblood-egg", ["pickup"], "Take the Lifeblood chamber’s Arcane Egg first", "A vine-sealed door on the Abyss’s west wall opens only for 14 Lifeblood masks, or 15 with Joni’s Blessing equipped. With 7 or more masks, wearing Joni’s Blessing, Fragile Heart and Lifeblood Heart (8 notches) gets you there: Joni’s turns your masks, Fragile Heart’s two included, into Lifeblood plus 40%, and Lifeblood Heart adds two more. Rest at the Basin bench with them on and head down; Lifeblood lost to a hit won’t heal back, though Lifeseeds from Lifeblood Cocoons add more. Inside, follow the spiked corridor down, go left where it splits and cross the gap with Crystal Heart to the Arcane Egg. Take the egg first: picking up the Core puts you outside and seals the room for good."],
        ["charm-lifeblood-core", ["charm"], "Collect Lifeblood Core", "Same door, same count: 14 Lifeblood masks, or 15 with Joni’s Blessing. With the Arcane Egg in hand, break the wall up and to the left of where it lay and climb to the hall above; the Core rests on an altar at its end. Taking it sets you down outside, and the door seals for good."],
        ["mask-shard-hive", ["mask-shard"], "Use a Hive Guardian to unseal the Mask Shard", "In the bottom-left corner of the Hive’s big cavern, a cracked wall hides the shard, and it gives way to the charge of a Hive Guardian. Stand so the big bee’s rush carries it into the wall, then step through for the shard."],
        ["stag-stagnest", ["stag"], "Unlock the Stag Nest", "Once every other station is open, the Stag remembers the way to the Nest where he was born. Ring any bell and choose the Stag Nest; it has no toll."],
        ["quest-cornifer-home", ["quest"], "Revisit Cornifer in Dirtmouth after the map sweep", "Cornifer sells twelve maps; the Resting Grounds one is Iselda’s alone. Once you own them all, or once Iselda stocks all of his, Cornifer moves home: you’ll find him asleep in a loft bed in the Dirtmouth map shop.", {"reference": "https://hollowknight.wiki/w/Cornifer"}],
        ["vessel-fragment-stag-nest", ["vessel-fragment"], "Collect the Stag Nest Vessel Fragment", "Ride the Stag to the Nest and head east along its lower path; the fragment lies there, before the lift up."],
        ["quest-stag-nest", ["quest"], "Explore the Stag Nest and speak to the Stag", "In the Nest’s upper area by the exit, inspect the broken eggshell. Then go back to the Stag and talk to him again.", {"reference": "https://hollowknight.wiki/w/Last_Stag"}],
      ],
    },
    {
      title: "Grubs that need revisits",
      location: "Howling Cliffs · The Hive",
      note: "The Collector’s Map marks the jars still waiting, which helps on a late sweep.",
      sources: [["Steam guide ch 10 and 21 · return-trip jars", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"], ["Grub locations and requirements", "https://hollowknight.wiki/w/Grub"]],
      map: ["ScriptersWar", "https://scripterswar.com/hollowknight/map"],
      compact: true,
      rows: [
        ["grub-cliffs-baldur", ["grub"], "Free the Grub hidden above the Baldur Shell cave", "This jar lies under the Cliffs path near the Greenpath connection, behind a breakable wall. From where the Baldur Shell lay, jump up into the opening overhead behind you and climb all the way up; the wall is on your left."],
        ["grub-hive-ceiling", ["grub"], "Free the Grub in the high Hive passage", "A hidden hallway above the Hive’s big cavern, the one before Hive Knight’s arena, leads to this jar. From the top of the cavern, follow the path right into the next room and drop to the second ledge below its entrance. Cling to the left wall and, from about halfway up it, charge Crystal Heart; cancel just short of the hole above and double-jump in."],
      ],
    },
  ],
} satisfies RawChapter;

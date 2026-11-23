import type { RawChapter } from "@hundo/core/types";

const steam = "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947";
const fxl = "https://hollowknight.wiki.fextralife.com/";
const gwCliffs = "https://gamerwalkthroughs.com/hollow-knight/howling-cliffs/";
const gwHive = "https://gamerwalkthroughs.com/hollow-knight/the-hive/";
const ludo = "https://www.ludo.guide/guide/hollow-knight/";
const sw = "https://scripterswar.com/hollowknight/map";

export default {
  id: 9,
  title: "The Cliffs and Forgotten Corners",
  region: "Stag Nest · Howling Cliffs · Dirtmouth · The Hive · The Abyss",
  teaser: "Howling Cliffs",
  intro: "Ride to the Stag Nest and walk down the Howling Cliffs for the last Nail Art, Joni’s Repose and the Nightmare Lantern, then come home to Dirtmouth. Break into the Hive, and end behind the Lifeblood door in the Abyss.",
  sources: [["Steam guide ch 3, 10, 21, 25 and 28 · the Cliffs, the Lantern, the Hive and the Lifeblood door", steam], ["gamerwalkthroughs · Howling Cliffs", gwCliffs], ["gamerwalkthroughs · The Hive", gwHive], ["ludo.guide · Howling Cliffs", `${ludo}howling-cliffs`]],
  groups: [
    {
      title: "The Stag Nest",
      location: "Stag Nest",
      sources: [["Steam guide · the Nest’s broken egg across from where you come in", steam], ["Wiki · the Stag Nest Vessel Fragment", "https://hollowknight.wiki/w/Vessel_Fragment"], ["gamerwalkthroughs · the Nest once every station is open", gwCliffs], ["ScriptersWar map · the fragment east of the station", sw], ["Wiki · the Stag Nest opens with every other station", "https://hollowknight.wiki/w/Fast_Travel_(Hollow_Knight)"]],
      rows: [
        ["stag-stagnest", ["stag"], "Unlock the Stag Nest", "From the Grey Mourner’s house, go back down to the crypt and on to the Resting Grounds’ Stag Station. With every other station open, the Stag offers the Stag Nest, where he was born: it has no toll. Ride there."],
        ["vessel-fragment-stag-nest", ["vessel-fragment"], "Collect the Stag Nest Vessel Fragment", "From where the Stag sets you down, go east along the lower path: the fragment lies there, before the lift up.", { requires: ["stag-stagnest"] }],
        ["quest-stag-nest", ["quest"], "Explore the Stag Nest and speak to the Stag", "On the upper level, at its west end, inspect the broken eggshell. Then go back to the Stag and talk to him again.", { requires: ["stag-stagnest"], reference: "https://hollowknight.wiki/w/Last_Stag" }],
      ],
    },
    {
      title: "Mato and Gorb",
      location: "Howling Cliffs",
      sources: [["Steam guide ch 3 · Mato’s hut and Gorb", steam], ["fextralife · Howling Cliffs: Mato’s hut at the bottom of the spiked pit", `${fxl}Howling+Cliffs`], ["gamerwalkthroughs · the bench in Mato’s hut and Gorb", gwCliffs], ["ludo.guide · Mato’s bench", `${ludo}howling-cliffs`], ["Wiki · Gorb’s spear rings", "https://hollowknight.wiki/w/Gorb"]],
      rows: [
        ["route-cliffs-entry", ["route"], "Enter the Howling Cliffs from the Stag Nest", "Leave the Nest by its east exit: it opens onto a high ledge in the Howling Cliffs."],
        ["nail-art-mato", ["nail-art"], "Learn Cyclone Slash from Nailmaster Mato", "Go down and right from the ledge, over the spiked floor into a crevasse, to Mato’s door. His hut has a bench: rest. He teaches you Cyclone Slash."],
        ["warrior-dream-gorb", ["warrior-dream"], "Defeat Gorb near the top of the Cliffs", "Go back up and left, about halfway to the Nest, to Gorb’s tombstone and Dream Nail it. He fires rings of spears outward, two and then three waves at a time as he weakens; slip through the gaps and hit him between them. 100 Essence.", { requires: ["dream-milestone-dream-nail"] }],
      ],
    },
    {
      title: "Down the great cliff",
      location: "Howling Cliffs",
      sources: [["Steam guide ch 3 and 4 · Joni’s Repose, the journal, the idol and the Lantern", steam], ["ludo.guide · the journal below Cornifer’s spot, the Lantern, the Root and the idol", `${ludo}howling-cliffs`], ["gamerwalkthroughs · the cliff face, the journal and the idol before the wind", gwCliffs], ["fextralife · Howling Cliffs: Joni’s Repose", `${fxl}Howling+Cliffs`], ["ScriptersWar map · the journal, the Root, the idol and the dive shortcut", sw], ["Wiki · Joni’s Blessing", "https://hollowknight.wiki/w/Joni%27s_Blessing"]],
      rows: [
        ["charm-joni-blessing", ["charm"], "Collect Joni’s Blessing from Joni’s Repose", "Leave Gorb’s room by its lower-left exit and drop onto the great cliff face. Hug the right wall down to an opening near the cliff’s top right, Cornifer’s spot: with the Dreamers gone, expect only his note, and Iselda sells this map. Right from there, a pitch-dark room needs the Lantern; mind the spikes and Vengeflies and follow the blue butterfly flowers right into Joni’s Repose. The charm lies by the altar where her spirit appears. Then go back the way you came to Cornifer’s spot.", { requires: ["pickup-lantern"] }],
        ["wanderers-journal-cliffs", ["wanderers-journal"], "Take the last Wanderer’s Journal on the cliff face", "Back on the cliff, a little below Cornifer’s spot and above the Root, break a cracked wall and drop into a hidden area: the last Wanderer’s Journal."],
        ["quest-nightmare-lantern", ["quest"], "Light the Nightmare Lantern in the Howling Cliffs", "Past the wall on the journal’s right, a short passage and one more small hidden gap lead to a huge bug’s corpse. Strike it with the Dream Nail, then go back into the room you came through: a lantern on a brazier there has lit. Hit the brazier until a scene plays: two tents appear in Dirtmouth.", { requires: ["dream-milestone-dream-nail"] }],
        ["root-cliffs", ["root"], "Clear the Howling Cliffs Root", "Out on the cliff, go down and west to the Howling Cliffs Root: 46 Essence.", { requires: ["dream-milestone-dream-nail"] }],
        ["kings-idol-cliffs", ["kings-idol"], "Take the King’s Idol at the Cliffs’ windy west end", "Go on west as far as the wind lets you: a King’s Idol lies on the ground by a big carcass."],
      ],
    },
    {
      title: "The Baldur cave",
      location: "Howling Cliffs",
      sources: [["Steam guide ch 10 · the fake chest and the Baldur Shell", steam], ["gamerwalkthroughs · the Grub as far right as you can go, the chest and the Shell", gwCliffs], ["ScriptersWar map · the Grub, the chest and the way out west", sw], ["Wiki · Baldur Shell: the 1 Geo chest and the right-hand Elder Baldur", "https://hollowknight.wiki/w/Baldur_Shell"]],
      rows: [
        ["grub-cliffs-baldur", ["grub"], "Free the Grub hidden above the Baldur Shell cave", "Go back east along the bottom of the Cliffs as far as you can: the jar is there."],
        ["charm-baldur-shell", ["charm"], "Collect Baldur Shell in the Cliffs border cave", "Down a small hole beside it, a chest holds only 1 Geo: open it, then jump into it and fall through. Two Elder Baldurs wait below, but only the right-hand one has to die, and past it lies the Baldur Shell. A retry starts at Mato’s bench."],
        ["route-cliffs-greenpath", ["route"], "Leave the Cliffs through Greenpath", "The cave’s west side opens into the room where you fought the Vengefly King in chapter 2. Go down three rooms to Greenpath’s Stag Station and ride to Dirtmouth."],
      ],
    },
    {
      title: "Dirtmouth",
      location: "Dirtmouth",
      sources: [["Steam guide ch 25 · Sly’s basement", steam], ["ludo.guide · Dirtmouth after the Cliffs: Sly and Grimm’s tent", `${ludo}dirtmouth-after-howling-cliffs`], ["Hollow Knight wiki · Grimmchild and the two tents", "https://hollowknight.wiki/w/Grimmchild"], ["Wiki · Iselda’s map prices", "https://hollowknight.wiki/w/Iselda"], ["Wiki · Sly’s basement once all three Nail Arts are learnt", "https://hollowknight.wiki/w/Sly"], ["Wiki · Jiji’s door, Rancid Eggs and Steel Soul", "https://hollowknight.wiki/w/Confessor_Jiji"], ["Wiki · Cornifer at home", "https://hollowknight.wiki/w/Cornifer"]],
      rows: [
        ["map-howling-cliffs", ["map"], "Buy the Howling Cliffs map", "Iselda sells the Howling Cliffs map for 100 Geo: your last one."],
        ["charm-nailmaster-glory", ["charm"], "Receive Nailmaster’s Glory from Sly", "With all three Nail Arts learnt, go to Sly’s shop, drop into the basement and talk to him for the charm.", { requires: ["nail-art-mato"] }],
        ["quest-cornifer-home", ["quest"], "Revisit Cornifer in Dirtmouth after the map sweep", "Cornifer sells twelve maps; the Resting Grounds one is Iselda’s alone. Once you own them all, or once Iselda stocks all of his, Cornifer moves home: you’ll find him asleep in a loft bed in the map shop.", { requires: ["map-howling-cliffs"], reference: "https://hollowknight.wiki/w/Cornifer" }],
        ["quest-jiji", ["quest"], "Unlock Confessor Jiji’s cave", "Past the graveyard at Dirtmouth’s east end, a stone door opens to your last Simple Key. Inside is Confessor Jiji: give her a Rancid Egg and she calls your Shade to her from wherever it lies. In Steel Soul mode, Steel Soul Jinn sits there instead and buys Rancid Eggs for Geo."],
        ["charm-grimmchild", ["charm"], "Receive Grimmchild from Troupe Master Grimm", "The Lantern has raised two tents at the village’s east end: talk to Grimm in the bigger one for Grimmchild. Its flames are chapter 11’s, so you needn’t wear it yet; the other tent is Divine’s, chapter 11’s too.", { requires: ["quest-nightmare-lantern"] }],
      ],
    },
    {
      title: "The Hive",
      location: "The Hive",
      sources: [["Steam guide ch 21 · the wall, the amber bench, the Grub, the shard, the shortcut, Hive Knight and Hiveblood", steam], ["gamerwalkthroughs · The Hive", gwHive], ["ludo.guide · the Hive: the bench, the Root, the Grub, the shard, the knight and the way out", `${ludo}kingdom-s-edge`], ["ScriptersWar map · the bench, the Root and the one-way walls", sw], ["Wiki · Hive Knight’s attacks", "https://hollowknight.wiki/w/Hive_Knight"]],
      rows: [
        ["route-hive-door", ["route"], "Enter the Hive through the breakable wall", "Ride the Stag to the Hidden Station, go two rooms to the Basin’s central room and up into its tram station, and ride the tram east to Kingdom’s Edge. Walk right from the station to the end of the tunnel, where Hivelings hover by a cracked wall, and break it. Go right into the next room, out its bottom left and all the way left: a bench hangs there, trapped in amber. Break it free and rest.", { requires: ["pickup-tram-pass"] }],
        ["route-hive-map", ["route"], "Fill in the Hive on the Kingdom’s Edge map", "The Hive has no map of its own: its rooms fill in on the Kingdom’s Edge map as you explore."],
        ["root-hive", ["root"], "Clear the Hive Root", "Back along the room to the right, the Hive Root on a ledge holds 20 Essence.", { requires: ["dream-milestone-dream-nail"] }],
        ["grub-hive-ceiling", ["grub"], "Free the Grub in the high Hive passage", "Go up and left, climb the tall room and take the large room’s upper path to the Hive’s big cavern. From the top of the cavern, follow the path right into the next room and drop to the second ledge below its entrance. Cling to the left wall and, from about halfway up it, charge Crystal Heart; cancel just short of the hole above and double-jump in to the jar."],
        ["mask-shard-hive", ["mask-shard"], "Use a Hive Guardian to unseal the Mask Shard", "In the bottom-left corner of the big cavern, a cracked wall hides the shard, and only a Hive Guardian’s charge breaks it: stand so the big bee’s rush carries it into the wall, then step through. Then break the wall left of the shard: a shortcut back toward the amber bench."],
        ["boss-hive-knight", ["boss", "percent-boss"], "Defeat Hive Knight", "Break through the cracked barriers at the cavern’s far right into his arena. Jump his lunge, which covers most of the floor, and swat or dodge the slow-homing bees he spits up. After a run of hits he staggers: a moment to heal. A retry starts at the amber bench."],
        ["charm-hiveblood", ["charm"], "Collect Hiveblood under the Hive Knight arena", "After the fight, go right and down under the arena for the charm. Then go back to the shard, out left through the wall you opened and the next one into Kingdom’s Edge, and drop to the tram station.", { requires: ["boss-hive-knight"] }],
      ],
    },
    {
      title: "The Lifeblood door",
      location: "The Abyss",
      sources: [["Steam guide ch 21 and 28 · the tram car’s bench and the chamber", steam], ["gamerwalkthroughs · the door on the left wall, the egg to the left and the Core to the right", "https://gamerwalkthroughs.com/hollow-knight/the-abyss/"], ["fextralife · The Abyss: 15 with Joni’s, the egg first, the Core to the east", `${fxl}The+Abyss`], ["ludo.guide · the tram car’s bench", `${ludo}ancient-basin-part-2`], ["Wiki · Lifeblood Core: the count, the egg and the seal", "https://hollowknight.wiki/w/Lifeblood_Core"], ["Wiki · Joni’s 40%", "https://hollowknight.wiki/w/Joni%27s_Blessing"]],
      rows: [
        ["pickup-lifeblood-egg", ["arcane-egg"], "Take the Lifeblood chamber’s Arcane Egg first", "In the tram car, rest at its bench wearing Joni’s Blessing, Fragile Heart and Lifeblood Heart, which your nine notches hold: with nine masks that’s 18 Lifeblood, and the vine-sealed door wants 15 with Joni’s Blessing on. Lifeblood lost to a hit won’t heal back: if you reach the door with fewer than 15, go back to the tram car’s bench and come down again. Ride to the Basin, drop through the central room’s floor and the King’s Brand gate, and about a third of the way down the Abyss cross to the left wall and drop to the door. Inside, follow the spiked corridor down, go left where it splits and cross the gap with Crystal Heart to the chamber’s Arcane Egg.", { requires: ["charm-joni-blessing"] }],
        ["charm-lifeblood-core", ["charm"], "Collect Lifeblood Core", "With the egg in hand, go back to the split and take the right-hand way to the Lifeblood Core on its altar. Taking it sets you down outside, and the door seals for good.", { requires: ["charm-joni-blessing"] }],
      ],
    },
  ],
} satisfies RawChapter;

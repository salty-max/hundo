import type { RawChapter } from "@hundo/core/types";

const steam = "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947";
const fxlDeep = "https://hollowknight.wiki.fextralife.com/Deepnest";
const gwDeep = "https://gamerwalkthroughs.com/hollow-knight/deepnest/";
const gwFungal = "https://gamerwalkthroughs.com/hollow-knight/fungal-wastes/";
const ludoDeep = "https://www.ludo.guide/guide/hollow-knight/deepnest";
const ludoDeep3 = "https://www.ludo.guide/guide/hollow-knight/deepnest-part-3";
const vgkDeep = "https://vgkami.com/walkthrough/hollow-knight/deepnest/";
const sw = "https://scripterswar.com/hollowknight/map";

export default {
  id: 6,
  title: "Deepnest and the Tram",
  region: "Mantis Village · Deepnest · Beast’s Den",
  teaser: "Deepnest",
  intro: "Beat the Mantis Lords and drop through the Fungal Core into Deepnest, with the Lumafly Lantern from chapter 4: much of it is pitch black. Find the Tram Pass and open the tram, then climb the Beast’s Den, and end at the Seer.",
  sources: [["Steam guide ch 4, 17 and 20 · Deepnest, the Mantis Lords, the Failed Tramway and the den", steam], ["fextralife · Deepnest", fxlDeep], ["gamerwalkthroughs · Deepnest", gwDeep], ["Wiki · Deepnest landmarks and Distant Village", "https://hollowknight.wiki/w/Deepnest"]],
  groups: [
    {
      title: "The Mantis Lords",
      location: "Fungal Wastes · Mantis Village",
      sources: [["Steam guide ch 17 · the bench, the levers, the Lords, the treasure room and its bench", steam], ["gamerwalkthroughs · the levers, the Lords and the treasure room’s three chests", gwFungal], ["ludo.guide · the treasure room’s layout and the arena’s left exit", "https://www.ludo.guide/guide/hollow-knight/fungal-wastes-part-2"], ["ScriptersWar map · the 620 Geo chest", sw], ["fextralife · the Lords, one then two", "https://hollowknight.wiki.fextralife.com/Mantis+Lords"], ["Wiki · Mantis Lords", "https://hollowknight.wiki/w/Mantis_Lords"], ["Wiki · Mark of Pride", "https://hollowknight.wiki/w/Mark_of_Pride"]],
      rows: [
        ["boss-mantis-lords", ["boss", "percent-boss"], "Defeat the Mantis Lords", "Rest at the bench below the Mantis Village: a retry starts here. Go up the shaft into the Mantis Village and drop through the way down you opened in chapter 3. High in the big room below, behind a breakable wall, a Lifeblood Cocoon waits. Work down the room, hitting the levers on its left side that open each door. At the bottom, challenge the lords: one fights alone first, and when she yields the other two come at you together. Be off the ground when a lance dash sweeps the floor; a blade thrown low from the wall is your moment to heal. Beaten, they open the arena’s left exit toward Deepnest; this route drops in through the Fungal Core instead, for its Mask Shard."],
        ["charm-mark-of-pride", ["charm"], "Open the Mantis treasure room for Mark of Pride", "Climb back up the arena’s right wall and through the gates on the right into the treasure room; the mantis at the door bows now instead of shutting it. Mark of Pride is in the chest just above where you come in."],
        ["hallownest-seal-mantis-treasure", ["hallownest-seal"], "Open the treasure room’s Hallownest Seal chest", "Climb to the chest above Mark of Pride’s for a Hallownest Seal. Then drop right and take a half-hidden path right to a Geo chest with 620 Geo, and lower still a hidden path to a bench. Rest there: the next bench is in Deepnest, past the Fungal Core."],
      ],
    },
    {
      title: "The Root above the village and the Fungal Core",
      location: "Fungal Wastes",
      sources: [["Steam guide ch 17 · up into the Fungal Core and down to the shard", steam], ["ludo.guide · the Root before the Core and the lit hole down", "https://www.ludo.guide/guide/hollow-knight/queen-s-garden"], ["ScriptersWar map · the Root just below the old journal spot and the Core’s Rancid Egg", sw], ["fextralife · the Fungal Core’s Rancid Egg and its residents", "https://hollowknight.wiki.fextralife.com/Fungal+Core"], ["VGKami · the drop into Deepnest", vgkDeep], ["Wiki · Whispering Roots: each one’s area and Essence", "https://hollowknight.wiki/w/Whispering_Root"], ["Wiki · Mask Shard locations", "https://hollowknight.wiki/w/Mask_Shard_(Hollow_Knight)"]],
      rows: [
        ["root-fungal-mantis", ["root"], "Clear the Fungal Wastes Root above Mantis Village", "Climb back out the way you came, up through the now peaceful village and through its ceiling into the room above: its Whispering Root, a little below where the journal lay in chapter 3, holds 18 Essence.", { requires: ["dream-milestone-dream-nail"] }],
        ["mask-shard-fungal-core", ["mask-shard"], "Drop from the Fungal Core to the Deepnest Mask Shard", "Leave that room by its left exit and double-jump up into the Fungal Core, where Shrumal Ogres and Warriors live; a Rancid Egg lies toward the left of its first room. Work down through the Core to its bottom and drop into Deepnest: the Mask Shard lies where you land, so take it before you move on.", { requires: ["equipment-monarch-wings"] }],
      ],
    },
    {
      title: "Into Deepnest",
      location: "Deepnest",
      note: "Deepnest is a maze, and much of it is dark: rest at every bench you find. Die before the Failed Tramway’s bench and you wake in the treasure room: the arena’s left exit, open since the Lords fell, leads back to Cornifer’s room.",
      sources: [["Steam guide ch 4, 17 and 20 · Cornifer, the maze Seal and the four-jar room", steam], ["fextralife · Cornifer behind a rock and the four jars", fxlDeep], ["gamerwalkthroughs · the secret wall to the four jars", gwDeep], ["ludo.guide · the false floor down to the Hot Spring", ludoDeep], ["ludo.guide · the super dash room, the worm and the fake wall to the four jars", "https://www.ludo.guide/guide/hollow-knight/fungal-wastes-part-3"], ["VGKami · the collapsing floor and Cornifer", vgkDeep], ["fextralife · Cornifer, and the Lords’ left exit into his room", "https://hollowknight.wiki.fextralife.com/Cornifer"], ["Wiki · Cornifer’s Deepnest map", "https://hollowknight.wiki/w/Cornifer"], ["Wiki · Grub locations", "https://hollowknight.wiki/w/Grub"]],
      rows: [
        ["map-deepnest", ["map"], "Buy Cornifer’s Deepnest map", "The landing ledge’s floor gives way under you. From where you fall, head left, up the first passage, to the room’s top-left corner: Cornifer hides behind a rock there, too frightened to hum, so look rather than listen. He sells the map for 38 Geo."],
        ["hallownest-seal-deepnest-maze", ["hallownest-seal"], "Take the Hallownest Seal in the maze above Cornifer", "Up from Cornifer, climb the maze room to its top. Where a tall shaft meets the ceiling and turns left, go right instead into a hidden area and drop through it to a Hallownest Seal at its end. Climb back out to the shaft."],
        ["grub-deepnest-mimics", ["grub"], "Free the real Grub in the four-jar room", "Follow the shaft left: the maze opens into a hub room whose false floor drops you into the Hot Spring, so stay off it for now. Climb up out of the hub into a room where you super dash across the top to its right side, and take the exit below that ledge into a room with a giant worm. Break the wall on its middle right, a little above the worm, and climb onto the ledge: the third jar from the entrance holds the real Grub, and the others are mimics that attack when freed. Then go back down to the hub."],
      ],
    },
    {
      title: "The Failed Tramway and Galien",
      location: "Deepnest",
      sources: [["Steam guide ch 4 and 20 · the tramway, the Pass, the cocoon and Galien", steam], ["gamerwalkthroughs · the tramway doors, the levers and Galien", gwDeep], ["ludo.guide · the Carver Hatchers spawning Dirtcarvers", ludoDeep], ["ludo.guide · Galien’s shaft", ludoDeep3], ["fextralife · Tram Pass", "https://hollowknight.wiki.fextralife.com/Tram+Pass"], ["fextralife · Galien", "https://hollowknight.wiki.fextralife.com/Galien"], ["Wiki · Galien", "https://hollowknight.wiki/w/Galien"]],
      rows: [
        ["pickup-tram-pass", ["pickup"], "Collect the Tram Pass in the Failed Tramway", "From the hub, go left to a room with a bench and rest. Through the big door on its left, past Carver Hatchers spawning Dirtcarvers, go left to the ruined station and drop into the old tram car half-buried beneath it, where a lever on the right opens the way on. Keep left to the wrecked car at the very end, get in through its roof and take the Tram Pass. On the way back a second lever opens the top gate, and up through the roof just past it a Lifeblood Cocoon waits.", { gives: "Tram Pass" }],
        ["warrior-dream-galien", ["warrior-dream"], "Defeat Galien below the Failed Tramway", "A few steps left of the big door, take the exit in the tramway’s floor, then the shaft’s left exit, lined with glowing white mushrooms, toward Galien’s cave. Before the fight, loop up and round above the cave, past his grave, for another Lifeblood Cocoon, then come back down. Dream Nail him or speak to his spirit. His big scythe chases you and two small ones join as he weakens, so finish him fast. Speak to him again for 200 Essence, then climb back up into the tramway and go right to the bench."],
      ],
    },
    {
      title: "Zote and the Hot Spring",
      location: "Deepnest",
      sources: [["Steam guide ch 4 and 17 · Zote, the idol, the spike Grub, the Hot Spring and Quirrel", steam], ["fextralife · the Corpse Creeper gauntlet and the idol to the west", fxlDeep], ["VGKami · one hit frees Zote", vgkDeep], ["ludo.guide · Quirrel in the spring", ludoDeep], ["Wiki · Zote the Mighty", "https://hollowknight.wiki/w/Zote_the_Mighty"], ["Wiki · Quirrel at the hot spring", "https://hollowknight.wiki/w/Quirrel"], ["Wiki · Grub locations", "https://hollowknight.wiki/w/Grub"]],
      rows: [
        ["quest-zote-deepnest", ["quest"], "Cut Zote free in upper Deepnest", "Drop through the left-hand exit in the bench room’s floor and win the Corpse Creeper gauntlet: three waves. If you saved Zote in Greenpath, he’s been caught again: head right and down to him hanging in the webs, where one strike frees him, and hear him out. If you didn’t, he isn’t here and this row stays open."],
        ["kings-idol-deepnest-zote", ["kings-idol"], "Take the King’s Idol west of Zote", "From the webs right of the gauntlet, go straight left to the room’s west end for a King’s Idol."],
        ["grub-deepnest-zote", ["grub"], "Free the Grub below the Zote route", "Drop into the room below by the idol: the jar is right beside you on the left as you land, above a spiked floor. Then go down through the small gap on the spike floor’s right to the room’s bottom, and right into the Hot Spring."],
        ["route-hot-spring", ["route"], "Rest at the Deepnest hot spring", "The Hot Spring has a bench beside its pool. Rest: it’s your base for the east side and Nosk."],
        ["quest-quirrel-deepnest", ["quest"], "Talk to Quirrel at the Deepnest hot spring", "Now that you’ve been to the Failed Tramway, Quirrel is resting in the Hot Spring. Talk to him until he has nothing more to say."],
      ],
    },
    {
      title: "The tram and the Garpede rooms",
      location: "Deepnest",
      sources: [["Steam guide ch 20 · the Garpede rooms, the tram station and the fragment", steam], ["fextralife · the Garpedes, the Soul Totem, the fragment and the shortcut back", fxlDeep], ["gamerwalkthroughs · the fragment and the shortcut by the bench", gwDeep], ["ludo.guide · inserting the Tram Pass", ludoDeep], ["VGKami · where the trams run", vgkDeep], ["Wiki · Vessel Fragment locations and requirements", "https://hollowknight.wiki/w/Vessel_Fragment"]],
      rows: [
        ["route-deepnest-tram", ["route"], "Open the Deepnest tram", "Leave the Hot Spring to the right into the Garpede room; the Garpedes can’t be killed. At its lower right is a tram station: insert the Tram Pass. This tram runs to the Ancient Basin and to Kingdom’s Edge, and the Pass runs the tram between the Crossroads and the Resting Grounds too. Below the Garpede room, a shade gate waits for a later ability (chapter 7 comes back for it).", { requires: ["pickup-tram-pass"] }],
        ["vessel-fragment-deepnest-tram", ["vessel-fragment"], "Collect the Vessel Fragment above the Deepnest tram", "From the Garpede room, climb into the room above it and cross its spiked gaps on Garpede backs, down-striking them and double-jumping between the walls; at its far right a breakable wall hides a Soul Totem. One Garpede crawls up a wall there: bounce on it again and again to rise into the hall above, and go left to the fragment. Carry on left: a shortcut drops you back by the Hot Spring’s bench."],
      ],
    },
    {
      title: "Nosk",
      location: "Deepnest",
      sources: [["Steam guide ch 20 · the Nosk Grub, Nosk and the Pale Ore", steam], ["fextralife · Nosk", "https://hollowknight.wiki.fextralife.com/Nosk"], ["gamerwalkthroughs · the cracked wall, Nosk and the ore", gwDeep], ["ludo.guide · the gates behind you and the ore", ludoDeep], ["Wiki · Nosk", "https://hollowknight.wiki/w/Nosk"], ["Wiki · Grub locations", "https://hollowknight.wiki/w/Grub"]],
      rows: [
        ["grub-deepnest-nosk", ["grub"], "Free the Grub on the Nosk approach", "Go back left from the Hot Spring into the room you came down through from Zote. From the ledge above the doorway you just came in by, super dash left to a cracked wall, break it and drop to the jar; the wall above it to the left leads on toward Nosk."],
        ["boss-nosk", ["boss", "percent-boss"], "Defeat Nosk in the hidden lair", "Smash the wall up and to the Grub’s left and chase a figure that looks like you through the tunnels, past one more breakable wall, into Nosk’s lair; the gates shut behind you. It charges the full width of the arena and leaps at you; when it vanishes into the ceiling, keep moving: infection rains down."],
        ["pale-ore-nosk", ["pale-ore"], "Take the Pale Ore behind Nosk", "Past Nosk’s arena to the right, the ore lies in a small room. On the way back, a wall in the tunnels breaks from this side and gives you a shortcut out beside the Grub; go back right from there into the room west of the spring."],
      ],
    },
    {
      title: "Dark Deepnest and the Weavers’ Den",
      location: "Deepnest",
      sources: [["Steam guide ch 20 · the dark rooms, the Grub and the Weavers’ Den", steam], ["ludo.guide · the dark room’s egg, its Grub, the Den and the Root", ludoDeep3], ["gamerwalkthroughs · the Stalking Devouts and Weaversong", gwDeep], ["fextralife · Weavers’ Den", "https://hollowknight.wiki.fextralife.com/Weavers+Den"], ["ScriptersWar map · the den’s secret room and its 160 Geo chest", sw], ["Wiki · Weaversong", "https://hollowknight.wiki/w/Weaversong"], ["Wiki · Whispering Roots: each one’s area and Essence", "https://hollowknight.wiki/w/Whispering_Root"], ["Wiki · Grub locations", "https://hollowknight.wiki/w/Grub"]],
      rows: [
        ["grub-deepnest-floor", ["grub"], "Free the Grub at the top of the dark room", "From the room west of the spring, take its far-left exit into the dark, where the Lantern lights the way and a Stalking Devout waits: it’s armoured, so strike only when it opens up to attack, then dash away. In the dark room beyond, go left to a dead end and up the platforms, then drop down the left side into a hidden way for a Rancid Egg. The jar is at the room’s top right, reached round from its left end.", { requires: ["pickup-lantern"] }],
        ["charm-weaversong", ["charm"], "Find Weaversong in the Weavers’ Den", "Below and right of the Grub, a corridor ends at a second Stalking Devout: get past it and break the wall behind it into the Weavers’ Den. Go right, then take the upper path across a spiked floor to the charm. A Geo chest with 160 Geo hides behind a secret wall in the den.", { requires: ["pickup-lantern"] }],
        ["root-deepnest", ["root"], "Clear the Deepnest Root", "Back in the dark room, from the platform below the Grub go all the way left to the Deepnest Root: 45 Essence.", { requires: ["pickup-lantern", "dream-milestone-dream-nail"] }],
      ],
    },
    {
      title: "Distant Village and the Beast’s Den",
      location: "Distant Village",
      note: "Let the bench trap carry you in, as this route does: beat Herrah without ever having been trapped and the den’s Hallownest Seal, and by one account its Rancid Egg, can’t be reached again. Take the Seal, the egg and the Grub before you climb to her.",
      sources: [["Steam guide ch 20 · the trap, the Seal below, the Grub, Herrah and the Stag", steam], ["fextralife · the den’s trap and Herrah", fxlDeep], ["ludo.guide · the den’s Grub, its egg and the Seal, and the way out", ludoDeep3], ["VGKami · the trap and the Stag Station with no bench", vgkDeep], ["ScriptersWar map · the Seal lost if Herrah falls before the trap", sw], ["Steam 112% guide · the Seal and Herrah without the trap", "https://steamcommunity.com/sharedfiles/filedetails/?id=936948247"], ["fextralife · Relic Seeker Lemm after the first Dreamer", "https://hollowknight.wiki.fextralife.com/Relic+Seeker+Lemm"], ["Wiki · Distant Village and the Beast’s Den", "https://hollowknight.wiki/w/Deepnest"], ["Wiki · Relic Seeker Lemm", "https://hollowknight.wiki/w/Relic_Seeker_Lemm"], ["Wiki · Stag tolls", "https://hollowknight.wiki/w/Fast_Travel_(Hollow_Knight)"], ["Wiki · Grub locations", "https://hollowknight.wiki/w/Grub"]],
      rows: [
        ["route-beasts-den", ["route"], "Enter the Beast’s Den", "Leave the dark room by its top-left exit and keep left, through more dark, to Distant Village, a web-hung cavern of cocoon houses at Deepnest’s far west. Go into the village’s largest building and sit on the bench the villagers urge on you: it’s a trap, and you’re webbed up and carried into the den. Mash attack to break free.", { requires: ["pickup-lantern"] }],
        ["hallownest-seal-beasts-den", ["hallownest-seal"], "Take the Hallownest Seal low in the Beast’s Den", "Right after you break free, drop down: a little to the right a floor collapses under you, and the Hallownest Seal lies in the alcove below. Take it now, before you climb to Herrah."],
        ["grub-deepnest-den", ["grub"], "Free the Grub inside the Beast’s Den", "On the climb through the den, this jar lies under a floor that breaks. From it, drop down the den’s right side hugging the right wall for a Rancid Egg below, then climb back."],
        ["dreamer-herrah", ["dreamer"], "Reach Herrah in the Beast’s Den", "Herrah sleeps at the top of the den. Strike her with the Dream Nail and see her dream through to the end. Then leave by the paths down the den’s left side to its own bench at the lower left, and on through a floor that gives way, back out into the village. From now on Lemm has shut his shop to wait at the memorial in the City’s fountain square: talk to him there and he goes back to it (chapter 7 takes you there)."],
        ["stag-distant-village", ["stag"], "Open Distant Village’s Stag Station", "Back in the village, climb the platforms up and to the right of its largest building to the Stag Station and pay 250 Geo to open it. There’s no bench here."],
      ],
    },
    {
      title: "Back to the Seer",
      location: "Resting Grounds",
      sources: [["fextralife · the Seer’s rewards", "https://hollowknight.wiki.fextralife.com/Seer"], ["Wiki · Seer", "https://hollowknight.wiki/w/Seer"]],
      rows: [
        ["quest-seer-dreamgate", ["quest"], "Learn Dreamgate at 900 Essence", "Ride the Stag to the Resting Grounds and climb to the Seer: Galien and this chapter’s two Roots have taken you past 900 Essence, and at 900 she teaches Dreamgate: set a gate with the Dream Nail where you stand, and warp back to it later."],
      ],
    },
  ],
} satisfies RawChapter;

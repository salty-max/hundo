import type { RawChapter } from "@hundo/core/types";

export default {
  id: 6,
  title: "Deepnest and the Tram",
  region: "Fungal Wastes · Deepnest · Beast’s Den",
  teaser: "Deepnest",
  intro: "Carry the Lumafly Lantern from chapter 4: much of Deepnest is pitch black. Beat the Mantis Lords for the way in, then find the Tram Pass and climb the Beast’s Den.",
  sources: [["Steam guide ch 4, 17 and 20 · Deepnest, the Mantis Lords, the Failed Tramway and the den", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"], ["Deepnest layout, dark rooms and sub-areas", "https://hollowknight.wiki/w/Deepnest"], ["Tram access", "https://hollowknight.wiki/w/Tram_Pass"]],
  groups: [
    {
      title: "Enter Deepnest from the Mantis Village",
      location: "Mantis Village · Deepnest",
      sources: [["Steam guide ch 17 and 20 · the Mantis Lords, Mark of Pride, the Failed Tramway, Zote and Nosk", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"], ["Cornifer in Deepnest", "https://hollowknight.wiki/w/Cornifer"]],
      rows: [
        ["boss-mantis-lords", ["boss", "percent-boss"], "Defeat the Mantis Lords", "Open the way down with the lever in the north-east of Mantis Village, then work down the big room below, pulling levers along its left side, to the throne room at the bottom. Challenge the lords there. One fights alone first; when she yields, the other two come at you together and more often. Be off the ground when a lance dash sweeps the floor, and watch for blades thrown from the walls. Beaten, all three bow and open the lower door into Deepnest.", {"reference": "https://hollowknight.wiki/w/Mantis_Lords"}],
        ["charm-mark-of-pride", ["charm"], "Open the Mantis treasure room for Mark of Pride", "Once the lords bow, climb back up and loop round to the arena’s right-hand exit, pulling levers to open the gates as you go. The room beyond, north-east of the arena, holds three chests: Mark of Pride is in one, Geo and a Hallownest Seal in the others.", {"reference": "https://hollowknight.wiki/w/Mark_of_Pride"}],
        ["map-deepnest", ["map"], "Buy Cornifer’s Deepnest map", "Cornifer waits near whichever entrance you came in by, and here he’s too frightened to hum, so look for him there. The map costs 38 Geo. He leaves once you reach the Hot Spring, though Iselda sells it too."],
        ["route-hot-spring", ["route"], "Find the Deepnest hot spring", "Work down through Deepnest’s dark maze of tunnels to the Hot Spring, which has a bench. Rest there: it’s your base for the Failed Tramway and Nosk."],
        ["warrior-dream-galien", ["warrior-dream"], "Defeat Galien below the Failed Tramway", "Galien’s cave opens off the left wall of the tall shaft that climbs into the Failed Tramway; glowing white mushrooms mark the way in. Dream Nail him or speak to his spirit. His big scythe bounces after you and two small ones join as he weakens, so finish him fast. Speak to him again for 200 Essence.", {"reference": "https://hollowknight.wiki/w/Galien"}],
        ["pickup-tram-pass", ["pickup"], "Collect the Tram Pass in the Failed Tramway", "Climb Galien’s shaft through its ceiling into the Failed Tramway, which has a bench. Head left to the ruined station and drop into the old tram car half-buried beneath it, where a lever on the right opens the way on. Keep left to the wrecked car at the very end, get in through its roof and take the Tram Pass."],
        ["quest-zote-deepnest", ["quest"], "Cut Zote free in upper Deepnest", "If you saved Zote in Greenpath, he’s been caught again. From the Failed Tramway, take the big door on the right and go down through the left-hand exit in its floor. Win the Corpse Creeper gauntlet, then head right and down to Zote hanging in the webs: strike the webs to free him and hear him out.", {"reference": "https://hollowknight.wiki/w/Zote_the_Mighty"}],
        ["quest-quirrel-deepnest", ["quest"], "Talk to Quirrel at the Deepnest hot spring", "Once you’ve been to the Failed Tramway, Quirrel is resting in the Hot Spring. Talk to him until he has nothing more to say; he moves on after that.", {"reference": "https://hollowknight.wiki/w/Quirrel"}],
        ["boss-nosk", ["boss", "percent-boss"], "Defeat Nosk in the hidden lair", "Next door to the Hot Spring on its west side, past the Grub behind the cracked wall, smash the wall up and to the Grub’s left and chase the familiar figure through the tunnels, past one more breakable wall, into Nosk’s lair. It charges the full width of the arena: pressed against the left side of the middle platform, you’re clear of its leftward charges and most of its eruptions and leaps. When it vanishes into the ceiling, keep moving: infection rains down.", {"reference": "https://hollowknight.wiki/w/Nosk"}],
      ],
    },
    {
      title: "Distant Village and the Beast’s Den",
      location: "Distant Village",
      sources: [["Steam guide ch 20 · the den, Herrah and the Distant Village station", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"], ["Stag Station prices", "https://hollowknight.wiki/w/Fast_Travel_(Hollow_Knight)"]],
      rows: [
        ["stag-distant-village", ["stag"], "Open Distant Village’s Stag Station", "Distant Village sits at Deepnest’s far west, a web-hung cavern of cocoon houses. Climb the platforms up and to the right of its largest building to the Stag Station and pay 250 Geo to open it."],
        ["route-beasts-den", ["route"], "Enter the Beast’s Den", "Go into the village’s largest building and sit on the bench the villagers urge on you: it’s a trap, and you’re webbed up and carried into the den. Mash attack to break free, then climb its dark tunnels to the top."],
        ["dreamer-herrah", ["dreamer"], "Reach Herrah in the Beast’s Den", "Herrah sleeps at the top of the den. Strike her with the Dream Nail and see her dream through to the end, then leave the den by the paths down its left side."],
      ],
    },
    {
      title: "Deepnest’s movement detours",
      location: "Deepnest",
      sources: [["Steam guide ch 17 and 20 · Nosk’s ore, Weaversong, the tram fragment and the Fungal Core shard", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"], ["Mask Shard sources", "https://hollowknight.wiki/w/Mask_Shard_(Hollow_Knight)"], ["Vessel Fragment sources", "https://hollowknight.wiki/w/Vessel_Fragment"]],
      compact: true,
      rows: [
        ["pale-ore-nosk", ["pale-ore"], "Take the Pale Ore behind Nosk", "Past Nosk’s arena to the right, the ore sits on a fossil in a small cave. In the tunnels on the way back, a wall breaks from this side and gives you a shortcut out beside the Grub near the Hot Spring.", {"reference": "https://hollowknight.wiki/w/Nosk"}],
        ["charm-weaversong", ["charm"], "Find Weaversong in the Weavers’ Den", "Below the Grub under the collapsing floor, drop down and dash right into a corridor; a second Stalking Devout guards its far end. Get past it and break the wall behind it into the Weavers’ Den, then take the upper path across a spiked floor to the charm.", {"reference": "https://hollowknight.wiki/w/Weaversong"}],
        ["vessel-fragment-deepnest-tram", ["vessel-fragment"], "Collect the Vessel Fragment above the Deepnest tram", "High above the working tram, a hall holds this fragment. The way up starts in the Garpede room east of the Hot Spring: climb into the room over it, crossing on Garpede backs with down-strikes and double jumps between the spiked walls. One Garpede travels up a wall there; bounce on it again and again to rise until the hall opens up and to the left."],
        ["mask-shard-fungal-core", ["mask-shard"], "Drop from the Fungal Core to the Deepnest Mask Shard", "The Fungal Core runs from the room above Mantis Village down into Deepnest. Leave the village through its ceiling, go out the left side of the room over it and double-jump up into the Core, then keep descending until you fall into Deepnest: the shard lies where you land."],
      ],
    },
    {
      title: "Deepnest jars",
      location: "Deepnest",
      sources: [["Steam guide ch 4 and 20 · Deepnest jars", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"], ["Grub locations and requirements", "https://hollowknight.wiki/w/Grub"]],
      map: ["ScriptersWar", "https://scripterswar.com/hollowknight/map"],
      compact: true,
      rows: [
        ["grub-deepnest-mimics", ["grub"], "Free the real Grub in the four-jar room", "Near the eastern Deepnest entrance below the Fungal Wastes, reach the side passage off the falling shaft and break through the wall. The third jar from the entrance holds the real Grub. The others are mimics."],
        ["grub-deepnest-den", ["grub"], "Free the Grub inside the Beast’s Den", "On the climb through the Beast’s Den to Herrah, this jar is tucked away behind a few breakable floors."],
        ["grub-deepnest-floor", ["grub"], "Free the Grub beneath the collapsing floor", "Get past the passage a Stalking Devout guards and drop through the collapsing floor beyond it; the jar is in the small chamber below."],
        ["grub-deepnest-zote", ["grub"], "Free the Grub below the Zote route", "After freeing Zote, go left past him and drop into the room below: the jar is right beside you on the left as you land, above a spiked floor."],
        ["grub-deepnest-nosk", ["grub"], "Free the Grub on the Nosk approach", "The room just west of the Hot Spring has a cracked wall high on its far side. Launch Crystal Heart from the ledge above the doorway you came in by, break through and drop to the jar; the wall above it to the left leads on toward Nosk."],
      ],
    },
  ],
} satisfies RawChapter;

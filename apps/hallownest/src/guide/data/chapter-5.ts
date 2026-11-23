import type { RawChapter } from "@hundo/core/types";

export default {
  id: 5,
  title: "Royal Waterways and Ancient Basin",
  region: "Royal Waterways · Ancient Basin · Palace Grounds",
  teaser: "Ancient Basin",
  intro: "Open the sewer hatch with a Simple Key, take acid immunity in Isma’s Grove and the double jump in the Ancient Basin, then carry the Wings back to Crystal Peak. Meet Cloth in the Basin now: it decides where her story goes.",
  sources: [["Steam guide ch 7–9, 12, 13 and 17 · Waterways, Isma’s Grove, the Basin, Flukemarm, Howling Wraiths and the Wings return", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"], ["Isma’s Tear requirements", "https://hollowknight.wiki/w/Isma%27s_Tear"], ["Basin paths, Palace Grounds and the Hidden Station", "https://hollowknight.wiki/w/Ancient_Basin"], ["Waterways layout and the hatch", "https://hollowknight.wiki/w/Royal_Waterways"]],
  groups: [
    {
      title: "The City hatch and Isma’s Grove",
      location: "Royal Waterways",
      sources: [["Steam guide ch 7–8 and 17 · the hatch, the bench, Cornifer, Dung Defender, Isma’s Grove and Flukemarm", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"], ["Simple Key locks", "https://hollowknight.wiki/w/Simple_Key_(Hollow_Knight)"], ["Cornifer’s Waterways map price", "https://hollowknight.wiki/w/Cornifer"]],
      rows: [
        ["route-waterways-hatch", ["route"], "Open the Royal Waterways with a Simple Key", "In the City’s bottom corridor, the room west of the fountain square has a round hatch with a keyhole. Open it with a Simple Key and drop into the Royal Waterways. Go left and down, following the bench sign on the wall, and break the loose floor with Descending Dark to reach the bench."],
        ["map-waterways", ["map"], "Buy Cornifer’s Royal Waterways map", "From the bench, head west two rooms. In the third, gates lock you in with a swarm of Hwurmps; once they’re dead, Cornifer is in the top-left corner and sells the map for 75 Geo. The lever by him opens a passage into the Fungal Wastes."],
        ["boss-dung-defender", ["boss", "percent-boss"], "Defeat Dung Defender and pull the pump lever", "His arena is where the Waterways walls turn brown: break the wall right of the bench, follow that passage straight on, then climb and loop round into it. When he burrows, cast Descending Dark over him to knock him out of the ground and stun him. Afterwards, pull the lever in the room to his right: it works the pump that lets you into Isma’s Grove.", {"reference": "https://hollowknight.wiki/w/Dung_Defender"}],
        ["charm-defenders-crest", ["charm"], "Collect Defender’s Crest from Dung Defender", "Take the charm he leaves in the arena. Worn at Leg Eater’s, it takes 20% off his charms and repairs, if you have anything left to buy there. Charms only change at a bench.", {"reference": "https://hollowknight.wiki/w/Defender%27s_Crest"}],
        ["boss-flukemarm", ["boss", "other-boss"], "Defeat Flukemarm under the Waterways", "Flukemarm hangs in a hidden cave deep below the bench. Break the loose floor in the corridor just under the bench with Descending Dark, go down as far as the tunnels allow, then west; where the tunnel starts to rise, carry straight on into her cave. She spits Flukefeys two at a time: kill them quickly and hit her between spawns, and keep out of the water, where you can’t attack.", {"reference": "https://hollowknight.wiki/w/Flukemarm"}],
        ["charm-flukenest", ["charm"], "Collect Flukenest after Flukemarm", "She leaves the charm behind when she falls.", {"reference": "https://hollowknight.wiki/w/Flukenest"}],
        ["equipment-ismas-tear", ["equipment"], "Collect Isma’s Tear at Isma’s Grove", "With the pump lever pulled, make for the bottom right of the main tunnels and follow them east to where crystals line the floor. Fly the whole spiked channel beyond with Crystal Heart, carry on east over the Hwurmp room, and win the three waves of guards in the room that locks. Then go down into the acid cavern and cross its platforms to the Tear."],
      ],
    },
    {
      title: "Ancient Basin and the hidden station",
      location: "Ancient Basin",
      sources: [["Steam guide ch 9 · the Basin, Broken Vessel, the Wings, Lost Kin and the Hidden Station", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"], ["The Crossroads after the Wings", "https://hollowknight.wiki/w/Forgotten_Crossroads"], ["Cornifer’s Basin map and when he leaves", "https://hollowknight.wiki/w/Cornifer"]],
      rows: [
        ["route-basin-descent", ["route"], "Descend the broken lift shaft to the Basin", "Go back to the spiked channel you flew through on the way to Isma’s Grove and this time drop through its middle into the broken lift shaft. Leave the shaft on the left, cross the collapsed bridge west as far as it goes, and drop to the Basin’s tram station."],
        ["quest-cloth-basin", ["quest"], "Meet Cloth at the end of the Basin tram tunnel", "Leave the tram station by dropping from its bottom left, then climb up into the big open room beyond. Instead of dropping again, cross the gap on the left to the end of the tram tunnel and kill every Lesser Mawlek and Aspid there: Cloth digs herself out to talk. Meet her here before you beat the boss of a much later garden: whether you do decides where her story goes.", {"reference": "https://hollowknight.wiki/w/Cloth"}],
        ["map-ancient-basin", ["map"], "Buy Cornifer’s Basin map", "Back at the tram platform, drop through the door in its middle into the Basin’s central room. Going down its right side, Cornifer is in the second alcove, just below the fountain’s, and sells the map for 112 Geo. He leaves once Broken Vessel falls."],
        ["simple-key-basin", ["simple-key"], "Take the Simple Key from the dead Mawlurk", "At the bottom of the central room, head left and open the next room’s bench for 150 Geo. Fly the spiked chasm with Crystal Heart and take the first opening in the floor. Slip past three Mawlurks to a further hole and drop through: the key is on a Royal Retainer’s corpse lying inside a dead Mawlurk, to your right.", {"reference": "https://hollowknight.wiki/w/Simple_Key_(Hollow_Knight)"}],
        ["boss-broken-vessel", ["boss", "percent-boss"], "Defeat Broken Vessel", "Climb back out, follow the path to the straight corridor, break the wall at its end and carry on west into the arena. Broken Vessel dashes across most of the floor with its nail, slams down from above, and keeps calling up Infected Balloons, so pop those as they come.", {"reference": "https://hollowknight.wiki/w/Broken_Vessel"}],
        ["equipment-monarch-wings", ["equipment"], "Collect Monarch Wings beyond Broken Vessel", "Past the arena, follow the path west and down, then climb to the Wings: jump again in mid-air to double-jump. Taking them spreads the infection through the Forgotten Crossroads and seals a couple of its passages for good, so expect detours there from now on.", {"reference": "https://hollowknight.wiki/w/Monarch_Wings"}],
        ["dream-boss-lost-kin", ["dream-boss"], "Defeat Lost Kin in Broken Vessel’s dream", "Back in the arena, the Vessel’s body now glows: strike it with the Dream Nail. Lost Kin fights like Broken Vessel but faster and with more balloons; Descending Dark clears them and keeps you safe as it lands. Losing just drops you outside the dream to try again. Talk to its ghost after the win for 400 Essence.", {"reference": "https://hollowknight.wiki/w/Lost_Kin"}],
        ["stag-hidden-station", ["stag"], "Open the Hidden Station", "With the Wings, go back east along the Basin’s lowest level past the arena and double-jump up into the Palace Grounds under the tram, out of reach until now. Keep east to the end, break the wall by two dead Royal Retainers and pay 300 Geo to open the Hidden Station."],
      ],
    },
    {
      title: "Waterways and Basin pickups",
      location: "Royal Waterways · Ancient Basin · Fog Canyon",
      sources: [["Steam guide ch 8–9 and 13 · the Waterways shard, Basin ore, the fountain, the Greenpath fragment and the Overgrown Mound", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"], ["fextralife · the Greenpath fragment, a wall jump up", "https://hollowknight.wiki.fextralife.com/Vessel+Fragment"], ["PlayerAssist · climbing to the Greenpath fragment with the claw", "https://playerassist.com/hollow-knight-obtain-vessel-fragment-greenpath/"], ["Wiki · Vessel Fragment locations and requirements", "https://hollowknight.wiki/w/Vessel_Fragment"], ["Overgrown Mound and Fog Canyon access", "https://hollowknight.wiki/w/Fog_Canyon"], ["Channelled Nail cost", "https://hollowknight.wiki/w/Nailsmith"]],
      compact: true,
      rows: [
        ["mask-shard-waterways", ["mask-shard"], "Take the Waterways Mask Shard", "In the room just before Cornifer’s, fall to its lowest point and swim west under the main path; the shard lies beneath that room’s exit.", {"reference": "https://hollowknight.wiki/w/Mask_Shard_(Hollow_Knight)"}],
        ["pale-ore-basin", ["pale-ore"], "Collect the Basin Pale Ore", "In the big open room past the tram station, take the drop rather than the gap to Cloth. Two Lesser Mawleks wait at the foot of it; the ore is just past them, west of the station.", {"reference": "https://hollowknight.wiki/w/Pale_Ore"}],
        ["forge-channelled-nail", ["forge"], "Upgrade to the Channelled Nail", "Take 800 Geo and 1 Pale Ore to the Nailsmith in the City once you have the Sharpened Nail."],
        ["vessel-fragment-basin-fountain", ["vessel-fragment"], "Pay the Ancient Basin fountain", "The Basin’s statue fountain sits in the first alcove down the right side of the Basin’s central room. It gives a Vessel Fragment once it has received 3,000 Geo in all. It keeps count, so you can pay in parts, and whatever its inscription suggests it never takes more than that.", {"reference": "https://hollowknight.wiki/w/Vessel_Fragment"}],
        ["vessel-fragment-greenpath", ["vessel-fragment"], "Collect the Vessel Fragment on the lower Greenpath route", "Before you drop into Fog Canyon, go back to lower Greenpath’s long corridor west of the Massive Moss Charger’s arena (chapter 2). The claw now climbs its far wall: at the corridor’s west end, wall-jump up through the ceiling and go right to the fragment.", { place: "Greenpath", requires: ["equipment-mantis-claw"] }],
        ["route-howling-wraiths-return", ["route"], "Drop into western Fog Canyon from lower Greenpath", "From lower Greenpath, drop into Fog Canyon the way you first went in, then take the exit on the left at the bottom. In the next room, Isma’s Tear lets you swim under the big central block, but its platforms get you across without it."],
        ["spell-howling-wraiths", ["spell"], "Learn Howling Wraiths in the Overgrown Mound", "Leave that room by its left exit and climb up and round into the Overgrown Mound, near the canyon’s western edge. Fight through the waves of Squits on the way right to the dead Snail Shaman at the far end: the spell lies by her body.", {"reference": "https://hollowknight.wiki/w/Howling_Wraiths"}],
      ],
    },
    {
      title: "Back to Crystal Peak with Monarch Wings",
      location: "Crystal Peak · Dirtmouth",
      sources: [["Steam guide ch 12 · the upper Grub past the Crystal Guardian’s bench", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"], ["The lift above Dirtmouth", "https://hollowknight.wiki/w/Dirtmouth"], ["Crystal Peak Grubs", "https://hollowknight.wiki/w/Grub"]],
      compact: true,
      rows: [
        ["grub-peak-upper", ["grub"], "Free the Grub east of the Crystal Guardian’s bench", "Ride the lift from Dirtmouth up into Crystal Peak (chapter 4 opened it) to the Crystal Guardian’s bench. The jar is at the far end of a cramped, crowded room east of it, on the way up toward the summit. Head right from the bench room; in the next room, double-jump from its top to the high ledge and carry on right along the bottom. Shade Soul thins out the enemies in the narrow room before they reach you."],
      ],
    },
    {
      title: "Sewer and Basin jars",
      location: "Royal Waterways · Ancient Basin",
      sources: [["Steam guide ch 8–9 · Waterways and Basin jars", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"], ["Grub locations and requirements", "https://hollowknight.wiki/w/Grub"]],
      map: ["ScriptersWar", "https://scripterswar.com/hollowknight/map"],
      compact: true,
      rows: [
        ["grub-waterways-bench", ["grub"], "Free the Grub behind the wall near the Waterways bench", "A cracked wall hides this jar, just under the doorway into the big open room west of the bench. Climb from the bench and take the first turning left to find it."],
        ["grub-waterways-isma", ["grub"], "Free the Grub above Isma’s acid pool", "With the Tear, swim right through the acid below Isma and climb the far wall to the jar."],
        ["grub-basin-mawlek", ["grub"], "Free the Grub beneath the Lesser Mawlek route", "Drop down again from the Pale Ore and follow the lower path back east toward the hall where you came in. Just before it climbs to that hall, break the loose floor with Descending Dark; the jar is down there behind one more Lesser Mawlek."],
        ["grub-basin-wings", ["grub"], "Free the Grub above the Mawlurk den", "In the room east of Broken Vessel’s arena, where Infected Balloons keep appearing, a gap in the ceiling above the drop into the Mawlurk den was out of reach before. Double-jump into it and climb to its top-left corner for the jar."],
      ],
    },
  ],
} satisfies RawChapter;

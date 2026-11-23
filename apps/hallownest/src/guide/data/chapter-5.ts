import type { RawChapter } from "@hundo/core/types";

const steam = "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947";
const fxlWaterways = "https://hollowknight.wiki.fextralife.com/Royal+Waterways";
const fxlBasin = "https://hollowknight.wiki.fextralife.com/Ancient+Basin";
const gwWaterways = "https://gamerwalkthroughs.com/hollow-knight/royal-waterways/";
const gwBasin = "https://gamerwalkthroughs.com/hollow-knight/ancient-basin/";
const ludoWaterways = "https://www.ludo.guide/guide/hollow-knight/royal-waterways";
const ludoBasin = "https://www.ludo.guide/guide/hollow-knight/ancient-basin";
const ludoBasin2 = "https://www.ludo.guide/guide/hollow-knight/ancient-basin-part-2";

export default {
  id: 5,
  title: "Royal Waterways and Ancient Basin",
  region: "Royal Waterways · Ancient Basin · Palace Grounds",
  teaser: "Ancient Basin",
  intro: "Open the sewer hatch with a Simple Key, take acid immunity in Isma’s Grove and the double jump in the Ancient Basin, then carry the Wings back through Greenpath, Fog Canyon, Crystal Peak and the Crossroads. Meet Cloth in the Basin now: it decides where her story goes.",
  sources: [["Steam guide ch 7–9, 11–13 and 17–18 · the Waterways, the Basin and the Wings’ returns", steam], ["fextralife · Royal Waterways", fxlWaterways], ["fextralife · Ancient Basin", fxlBasin], ["Wiki · Royal Waterways, Isma’s Grove and the Junk Pit route", "https://hollowknight.wiki/w/Royal_Waterways"], ["Wiki · Ancient Basin, Broken Vessel and the Palace Grounds", "https://hollowknight.wiki/w/Ancient_Basin"]],
  groups: [
    {
      title: "Down the hatch into the Royal Waterways",
      location: "Royal Waterways",
      sources: [["Steam guide ch 7–8 · the hatch below Lemm’s, Tuk, the bench, the Grub, Cornifer and the shard", steam], ["fextralife · the entrance room, the big room, the Flukemon and Cornifer", fxlWaterways], ["fextralife · Tuk", "https://hollowknight.wiki.fextralife.com/Tuk"], ["gamerwalkthroughs · the bench, the Grub and the shard", gwWaterways], ["ludo.guide · the Bluggsacs and the Soul Totem", ludoWaterways], ["VGKami · the mechanism below Lemm’s shop", "https://vgkami.com/walkthrough/hollow-knight/royal-waterways/"], ["Wiki · Cornifer’s Waterways map", "https://hollowknight.wiki/w/Cornifer"], ["Wiki · Mask Shard locations", "https://hollowknight.wiki/w/Mask_Shard_(Hollow_Knight)"], ["Wiki · Grub locations", "https://hollowknight.wiki/w/Grub"]],
      rows: [
        ["route-waterways-hatch", ["route"], "Open the Royal Waterways with a Simple Key", "The round hatch with a keyhole that you passed on the City’s bottom corridor in chapter 3 is just below Lemm’s shop: open it with a Simple Key and drop into the Royal Waterways. In the room you land in, break the wall beside a Geo deposit in the upper-right corner to find Tuk, who sells Rancid Eggs; come back to him wearing this chapter’s first charm and he gives you one. Then go left past the bench sign on the wall and break the loose floor with a dive to reach the tilted bench below.", { requires: [["simple-key-sly", "simple-key-city"]] }],
        ["grub-waterways-bench", ["grub"], "Free the Grub behind the wall near the Waterways bench", "Climb out of the bench room and take the first turn left: just under the way into the big open room, a cracked wall hides the jar."],
        ["map-waterways", ["map"], "Buy Cornifer’s Royal Waterways map", "Head west across the big room, where Hwurmps float over the water; leave them be if you can, since they swell when hit. A Rancid Egg waits at the room’s west end. In the next room a Flukemon splits in two when you hit it, and another Rancid Egg sits above, with a Soul Totem top left. In the third room the gates lock you in with a swarm of Hwurmps; once they’re dead, Cornifer is in the top-left corner and sells the map for 75 Geo. Pull the lever on the middle platform: it opens a door at the bottom left into the Fungal Wastes, your way out at this chapter’s end."],
        ["mask-shard-waterways", ["mask-shard"], "Take the Waterways Mask Shard", "Go back one room: a floor gives way under you. Fall to the bottom and swim west under the main path into a hidden room with the shard."],
      ],
    },
    {
      title: "Dung Defender and Isma’s Grove",
      location: "Royal Waterways",
      sources: [["Steam guide ch 8 · the wall right of the bench, Dung Defender, the lever, the idol and Isma’s Grove", steam], ["fextralife · Dung Defender’s arena, the lever room and Isma’s Grove", fxlWaterways], ["fextralife · Lemm won’t buy while the Crest is worn", "https://hollowknight.wiki.fextralife.com/Relic+Seeker+Lemm"], ["gamerwalkthroughs · the lever, Isma’s guards and the Tear", gwWaterways], ["ludo.guide · the Bluggsacs, the lever room’s wall and Emilitia’s crack", ludoWaterways], ["Wiki · Dung Defender, and the idol below his lever", "https://hollowknight.wiki/w/Dung_Defender"], ["fextralife · Leg Eater’s 20% discount with the Crest", "https://hollowknight.wiki.fextralife.com/Leg+Eater"], ["Wiki · Defender’s Crest", "https://hollowknight.wiki/w/Defender%27s_Crest"], ["Wiki · Grub locations", "https://hollowknight.wiki/w/Grub"]],
      rows: [
        ["boss-dung-defender", ["boss", "percent-boss"], "Defeat Dung Defender and pull the pump lever", "Back at the bench, break the wall to its right, where a Rancid Egg waits, and follow that passage nearly straight on until the walls turn brown; then climb and loop round into his arena. When he burrows, cast Descending Dark over him to knock him out of the ground and stun him. Afterwards, pull the lever in the room to his right: it works the pump that lets you into Isma’s Grove."],
        ["charm-defenders-crest", ["charm"], "Collect Defender’s Crest from Dung Defender", "Take the charm he leaves in the arena. Rest at the bench with it on and visit Tuk for his free Rancid Egg. Worn at Leg Eater’s, it takes 20% off his charms and repairs. Take it off before you sell relics: Lemm won’t deal with you while you wear it. Charms only change at a bench."],
        ["kings-idol-dung-defender", ["kings-idol"], "Take the King’s Idol below Dung Defender’s lever", "In the lever room, dive through the floor under the lever into a cave of statues made of dung: a King’s Idol rests on the statue at the right, a relic Lemm pays well for."],
        ["equipment-ismas-tear", ["equipment"], "Collect Isma’s Tear at Isma’s Grove", "With the pump lever pulled, go back to the bench and make for the bottom right of the tunnels around it, then follow them east to where crystals line the floor. Fly the whole spiked channel beyond with Crystal Heart and carry on east over the Hwurmp room: a Rancid Egg waits at its upper left, and a shaft on its left climbs to a crack where Eternal Emilitia opens a shortcut into the City, an optional way back. Win the three waves of City guards in the room that locks, then go down into the acid cavern and cross its platforms to the Tear.", { gives: "Isma’s Tear" }],
        ["grub-waterways-isma", ["grub"], "Free the Grub above Isma’s acid pool", "With the Tear, swim right through the acid below Isma and climb the far wall to the jar.", { requires: ["equipment-ismas-tear"] }],
      ],
    },
    {
      title: "Down the broken lift into the Ancient Basin",
      location: "Ancient Basin",
      sources: [["Steam guide ch 9 · the bridge, the tram station, Cloth, the ore, the Grub, the fountain, Cornifer, the toll bench and the key", steam], ["fextralife · the lever room’s wall", fxlWaterways], ["fextralife · the bridge journal and the Basin", fxlBasin], ["gamerwalkthroughs · the Root’s hidden wall and the Basin", gwBasin], ["ludo.guide · the bridge journal and the Root on the shaft’s bottom right", ludoBasin2], ["ludo.guide · Cloth, the ore and the key", ludoBasin], ["Wiki · Cornifer’s Basin map", "https://hollowknight.wiki/w/Cornifer"], ["Wiki · Pale Ore", "https://hollowknight.wiki/w/Pale_Ore"], ["Wiki · Simple Key locations", "https://hollowknight.wiki/w/Simple_Key_(Hollow_Knight)"], ["Wiki · Cloth, and when she leaves", "https://hollowknight.wiki/w/Cloth"], ["Wiki · Grub locations", "https://hollowknight.wiki/w/Grub"]],
      rows: [
        ["route-basin-descent", ["route"], "Descend the broken lift shaft to the Basin", "Go back to the lever room by Dung Defender’s arena and break the wall on its right: it opens onto the broken lift shaft. Drop down it."],
        ["root-waterways", ["root"], "Clear the Root by the broken Waterways lift", "At the shaft’s bottom, a hidden wall on the right hides a Whispering Root. Strike it and gather its 35 Essence.", { requires: ["dream-milestone-dream-nail"] }],
        ["wanderers-journal-basin-bridge", ["wanderers-journal"], "Take the Wanderer’s Journal under the broken bridge", "Leave the shaft on its left onto the first pillar of the broken bridge. Cling to the pillar’s right side, slide almost to the bottom, then super dash over the writhing bugs to a Wanderer’s Journal. Climb back up, keep left as far as the bridge goes, and drop to the Basin’s tram station."],
        ["quest-cloth-basin", ["quest"], "Meet Cloth at the end of the Basin tram tunnel", "Leave the tram station by dropping from its bottom left, then climb up into the big open room beyond. Instead of dropping again, cross the gap on the left to the end of the tram tunnel and kill every Lesser Mawlek and Aspid there: Cloth digs herself out to talk. Meet her here before you beat the boss of a much later garden: whether you do decides where her story goes."],
        ["pale-ore-basin", ["pale-ore"], "Collect the Basin Pale Ore", "Back in the big open room, take the drop rather than the gap to Cloth. Two Lesser Mawleks wait at the foot of it; the ore is just past them, west of the station."],
        ["grub-basin-mawlek", ["grub"], "Free the Grub beneath the Lesser Mawlek route", "Drop down again from the Pale Ore and follow the lower path back east toward the hall where you came in. Just before it climbs to that hall, break the loose floor with a dive; the jar is down there behind one more Lesser Mawlek."],
        ["map-ancient-basin", ["map"], "Buy Cornifer’s Basin map", "Back at the tram platform, drop through the door in its middle into the Basin’s central room. Going down its right side, the first alcove holds a statue fountain and the second Cornifer, who sells the map for 112 Geo. The fountain gives a Vessel Fragment once it has taken 3,000 Geo in all, in as many payments as you like; chapter 7 passes it again with more Geo. The gate at the room’s bottom needs something from a later chapter (chapter 7)."],
        ["simple-key-basin", ["simple-key"], "Take the Simple Key from the dead Mawlurk", "At the bottom of the central room, head left and open the next room’s bench for 150 Geo. Fly the spiked chasm with Crystal Heart and take the first opening in the floor. Slip past three Mawlurks to a further hole and drop through: the key is on a Royal Retainer’s corpse lying inside a dead Mawlurk, to your right."],
      ],
    },
    {
      title: "Broken Vessel, the Wings and the Hidden Station",
      location: "Ancient Basin",
      sources: [["Steam guide ch 9 · Broken Vessel, the Wings, Lost Kin, the Wings Grub and the Hidden Station", steam], ["fextralife · Broken Vessel’s balloons and the Wings", fxlBasin], ["gamerwalkthroughs · the passage under Cornifer to the Palace Grounds", gwBasin], ["Wiki · Broken Vessel", "https://hollowknight.wiki/w/Broken_Vessel"], ["Wiki · Monarch Wings and the Crossroads’ infection", "https://hollowknight.wiki/w/Monarch_Wings"], ["Wiki · Lost Kin", "https://hollowknight.wiki/w/Lost_Kin"], ["Wiki · Stag tolls", "https://hollowknight.wiki/w/Fast_Travel_(Hollow_Knight)"], ["Wiki · Grub locations", "https://hollowknight.wiki/w/Grub"]],
      rows: [
        ["boss-broken-vessel", ["boss", "percent-boss"], "Defeat Broken Vessel", "Climb back out of the Mawlurks’ den and follow the path to a straight corridor; break the wall at its end and carry on west into the arena. Broken Vessel dashes across most of the floor with its nail, slams down from above, and keeps calling up Infected Balloons, so pop those as they come."],
        ["equipment-monarch-wings", ["equipment"], "Collect Monarch Wings beyond Broken Vessel", "Past the arena, follow the path west and down, then climb to the Wings: jump again in mid-air to double-jump. Taking them spreads the infection through the Forgotten Crossroads and seals a couple of its passages for good, so expect detours there from now on.", { gives: "Monarch Wings" }],
        ["dream-boss-lost-kin", ["dream-boss"], "Defeat Lost Kin in Broken Vessel’s dream", "Back in the arena, the Vessel’s body now glows: strike it with the Dream Nail. Lost Kin fights like Broken Vessel but faster and with more balloons; Descending Dark clears them and keeps you safe as it lands. Losing just drops you outside the dream to try again. Talk to its ghost after the win for 400 Essence."],
        ["grub-basin-wings", ["grub"], "Free the Grub above the Mawlurk den", "Back east toward the spiked chasm, a gap in the ceiling near the opening you dropped through to the Mawlurks was out of reach before. Double-jump into it and climb to its top-left corner for the jar.", { requires: ["equipment-monarch-wings"] }],
        ["stag-hidden-station", ["stag"], "Open the Hidden Station", "Head back east past the chasm to the Basin’s central room. Below and right of Cornifer’s alcove, double-jump up the passage into the Palace Grounds, out of reach until now. Keep east to the end, break the wall there and pay 300 Geo to open the Hidden Station.", { requires: ["equipment-monarch-wings"] }],
      ],
    },
    {
      title: "Greenpath with Isma’s Tear",
      location: "Greenpath",
      sources: [["Steam guide ch 13 · the Lake of Unn, Sheo, the Seal in the acid room, the bubble room’s journal, the fragment and the Stone Sanctuary", steam], ["fextralife · the Seal south-west of Thorns of Agony", "https://hollowknight.wiki.fextralife.com/Hallownest+Seal"], ["fextralife · the Greenpath fragment, a wall jump up", "https://hollowknight.wiki.fextralife.com/Vessel+Fragment"], ["ludo.guide · the bubble room’s journal, the corridor’s fragment and No Eyes", "https://www.ludo.guide/guide/hollow-knight/greenpath-part-3"], ["ludo.guide · Sheo’s cavern and the egg outside his hut", "https://www.ludo.guide/guide/hollow-knight/greenpath-part-2"], ["PlayerAssist · climbing to the Greenpath fragment with the claw", "https://playerassist.com/hollow-knight-obtain-vessel-fragment-greenpath/"], ["Wiki · Shape of Unn", "https://hollowknight.wiki/w/Shape_of_Unn"], ["Wiki · Vessel Fragment locations and requirements", "https://hollowknight.wiki/w/Vessel_Fragment"], ["Wiki · Stone Sanctuary", "https://hollowknight.wiki/w/Greenpath"]],
      rows: [
        ["charm-shape-of-unn", ["charm"], "Collect Shape of Unn beyond the lake", "Ride the Stag from the Hidden Station to Greenpath. Go below Hornet’s old arena and west to the Lake of Unn: swim across with Isma’s Tear and under the cliff on the far side; the hidden way beyond leads down to Unn herself, who gives you the charm.", { requires: ["equipment-ismas-tear"] }],
        ["nail-art-sheo", ["nail-art"], "Learn Great Slash from Nailmaster Sheo", "Back at the Stag Station, drop to the bottom of its shaft and through the floor, then head west along the long cavern of Durandas and thorns, bouncing off them with your nail. Sheo’s hut is in the room past the cavern’s far end; a Rancid Egg lies outside it."],
        ["hallownest-seal-greenpath-acid", ["hallownest-seal"], "Take the Hallownest Seal in the room of Moss Chargers", "Come back east to the foot of the shaft and into the room of Moss Chargers: the Hallownest Seal on a dead bug just under its entrance, out of reach since chapter 2, is yours now."],
        ["wanderers-journal-greenpath-bubbles", ["wanderers-journal"], "Take the Wanderer’s Journal in the bubble room", "Go on east through the long room of Obbles and drop through its floor into the room where bubbles line the walls. Climb its right wall into a hidden area for a Wanderer’s Journal."],
        ["vessel-fragment-greenpath", ["vessel-fragment"], "Collect the Vessel Fragment on the lower Greenpath route", "Cross the gap on the bubble room’s left, past the Massive Moss Charger’s old arena, into the long corridor over acid. At its west end, wall-jump up through the ceiling and go right to the fragment."],
        ["warrior-dream-no-eyes", ["warrior-dream"], "Defeat No Eyes in Stone Sanctuary", "Back in the bubble room, the dark passage beneath its bench room runs to the Stone Sanctuary; the Lantern lights it. Dream Nail No Eyes’ statue. The middle of the floor platform is where her spirits almost never reach, so heal there between hits. Speak to her after the win for 200 Essence.", { requires: ["pickup-lantern", "dream-milestone-dream-nail"] }],
        ["mask-shard-stone-sanctuary", ["mask-shard"], "Take the Stone Sanctuary Mask Shard", "Past No Eyes’ chamber, follow the dark passages to the right, to the north-east, all the way to their end for the shard.", { requires: ["pickup-lantern"] }],
      ],
    },
    {
      title: "Fog Canyon’s west and the Overgrown Mound",
      location: "Fog Canyon",
      sources: [["Steam guide ch 13 · the central block, the Seal and cocoon above it, and the Overgrown Mound", steam], ["gamerwalkthroughs · the exit to the top past the block", "https://gamerwalkthroughs.com/hollow-knight/fog-canyon/"], ["ludo.guide · the Seal, the cocoon and the Squit waves", "https://www.ludo.guide/guide/hollow-knight/fog-canyon"], ["Wiki · Overgrown Mound and Fog Canyon access", "https://hollowknight.wiki/w/Fog_Canyon"], ["Wiki · Howling Wraiths", "https://hollowknight.wiki/w/Howling_Wraiths"]],
      rows: [
        ["route-howling-wraiths-return", ["route"], "Drop into western Fog Canyon from lower Greenpath", "Back in the bubble room, drop through its floor into Fog Canyon the way you first went in, then take the exit on the left at the bottom. In the next room, cross the big central block on its platforms, or swim under it."],
        ["hallownest-seal-fog-canyon-west", ["hallownest-seal"], "Take the Hallownest Seal above Fog Canyon’s central block", "Past the block, go up into the ceiling: a Hallownest Seal lies there, and a Lifeblood Cocoon to its left gives you blue masks."],
        ["spell-howling-wraiths", ["spell"], "Learn Howling Wraiths in the Overgrown Mound", "Back down, leave the block’s room by its left exit and climb up and round into the Overgrown Mound, near the canyon’s western edge. The gates shut as Squits come at you in waves: fight through them on the way right to the dead Snail Shaman at the far end, where the spell lies by her body."],
      ],
    },
    {
      title: "Crystal Peak with the Wings",
      location: "Crystal Peak",
      sources: [["Steam guide ch 12 · the idol above Cornifer, the Enraged Guardian, the Crown Grub and Hallownest’s Crown", steam], ["gamerwalkthroughs · the idol above Cornifer needs the Wings", "https://gamerwalkthroughs.com/hollow-knight/crystal-peak/"], ["ludo.guide · the Root, the Crown Grub, the Crown and the drop back down", "https://www.ludo.guide/guide/hollow-knight/crystal-peak-part-2"], ["VGKami · the Guardian’s upper level", "https://vgkami.com/walkthrough/hollow-knight/crystal-peak/"], ["Wiki · Crystal Peak and Hallownest’s Crown", "https://hollowknight.wiki/w/Crystal_Peak"], ["Wiki · Pale Ore", "https://hollowknight.wiki/w/Pale_Ore"], ["Wiki · Mask Shard locations", "https://hollowknight.wiki/w/Mask_Shard_(Hollow_Knight)"], ["Wiki · Grub locations", "https://hollowknight.wiki/w/Grub"]],
      rows: [
        ["kings-idol-peak-cornifer", ["kings-idol"], "Take the King’s Idol above Cornifer’s Crystal Peak spot", "From the Overgrown Mound, walk back east through Fog Canyon the way chapter 2 went, out at the bottom right twice, to Queen’s Station, and ride the Stag to Dirtmouth. Take the lift up into the mines. In Cornifer’s old room, double-jump to the ledge above where he stood for a King’s Idol.", { requires: ["equipment-monarch-wings"] }],
        ["boss-enraged-guardian", ["boss", "other-boss"], "Defeat Enraged Guardian above the mine bench", "Go on through the laser room and the key room to the Crystal Guardian’s bench room, and use the Wings to climb its right side into the room above, where the Guardian waits again, enraged. When he screams, beams fall from the ceiling one after another, so keep moving. A Mask Shard lies behind him.", { requires: ["equipment-monarch-wings"] }],
        ["mask-shard-enraged-guardian", ["mask-shard"], "Take the Mask Shard behind Enraged Guardian", "With the Enraged Guardian beaten, walk on past where he stood and pick up the shard."],
        ["root-peak", ["root"], "Clear the Crystal Peak Root", "In the tall room east of the Guardian, double-jump from its top to the high ledge and go right into a cavern: its Whispering Root holds 21 Essence.", { requires: ["equipment-monarch-wings", "dream-milestone-dream-nail"] }],
        ["grub-peak-upper", ["grub"], "Free the Grub east of the Crystal Guardian’s bench", "Along that cavern’s bottom, a narrow room on the right is crowded with enemies; the jar is at its far end. Shade Soul thins them out before they reach you.", { requires: ["equipment-monarch-wings"] }],
        ["pale-ore-hallownests-crown", ["pale-ore"], "Collect Pale Ore at Hallownest’s Crown", "From the cavern’s top-right exit, climb the crystal crevasses with the Wings to the very summit, Hallownest’s Crown, and go left to the statue there: the ore is at its base. Drop off the Crown’s left side to come back down into the mines, and ride the lift down to Dirtmouth.", { requires: ["equipment-monarch-wings"] }],
      ],
    },
    {
      title: "Back through Dirtmouth",
      location: "Dirtmouth",
      sources: [["Steam guide ch 13 · the lift back down to Dirtmouth", steam]],
      rows: [
        ["route-dirtmouth-ch5", ["route"], "Pass back through Dirtmouth", "Anything you set aside at Sly’s or Iselda’s comes back here. Then walk to the well and drop down it into the Crossroads."],
      ],
    },
    {
      title: "The infected Crossroads",
      location: "Forgotten Crossroads",
      note: "The infection has spread through the Crossroads since you took the Wings: more enemies, and a couple of passages sealed. The rooms you need here are all still open.",
      sources: [["Steam guide ch 11 and 18 · the infected Crossroads and the Brooding Mawlek", steam], ["ludo.guide · the infected Crossroads, its Root and the Ancestral Mound’s Root", "https://www.ludo.guide/guide/hollow-knight/infected-crossroads"], ["fextralife · the Grubfather’s rewards", "https://hollowknight.wiki.fextralife.com/Grubfather"], ["Wiki · Brooding Mawlek", "https://hollowknight.wiki/w/Brooding_Mawlek"], ["fextralife · Salubra’s last notch at 25 charms", "https://hollowknight.wiki.fextralife.com/Charm+Lover+Salubra"], ["Wiki · Charm Lover Salubra’s notches", "https://hollowknight.wiki/w/Charm_Lover_Salubra"], ["ludo.guide · the Grubfather through the shaft’s top-left exit", "https://www.ludo.guide/guide/hollow-knight/forgotten-crossroads"], ["Wiki · Whispering Roots: each one’s area and Essence", "https://hollowknight.wiki/w/Whispering_Root"]],
      rows: [
        ["root-crossroads", ["root"], "Clear the Forgotten Crossroads Root", "Go into the main shaft. High in it, in the room just before the Grubfather’s, double-jump into a false ceiling, climb, and take the hidden path left to the Crossroads’ Whispering Root: 29 Essence.", { requires: ["equipment-monarch-wings", "dream-milestone-dream-nail"] }],
        ["hallownest-seal-grubfather", ["hallownest-seal"], "Claim the Grubfather’s Hallownest Seal at 23 rescues", "Up the shaft’s top-left exit, the Grubfather has more to give: with this chapter’s jars you’ve freed 25 Grubs. He pays a Rancid Egg for the sixteenth, Geo for most of the rest, and a Hallownest Seal for the twenty-third. Pick everything up off the floor before you go."],
        ["boss-brooding-mawlek", ["boss", "percent-boss"], "Defeat Brooding Mawlek in the west Crossroads", "Back in the main shaft, break the cracked door below the Greenpath exit and work through the spiked corridors beyond to the Mawlek’s den. Its blobs arc toward whichever side of the room you’re on, and it slashes if you crowd it. It leaves a Mask Shard when it dies."],
        ["mask-shard-brooding-mawlek", ["mask-shard"], "Take the Mask Shard from Brooding Mawlek", "Pick up the shard that forms where Brooding Mawlek falls."],
        ["root-ancestral-mound", ["root"], "Clear the Ancestral Mound Root", "Go up into the Ancestral Mound, off the room before the False Knight’s hall. Climb to its top left and double-jump to open the way right to its Whispering Root: 42 Essence.", { requires: ["equipment-monarch-wings", "dream-milestone-dream-nail"] }],
        ["notch-salubra-twenty-five", ["notch"], "Buy Salubra’s twenty-five-charm Notch", "Once you own 25 charms, buy her last notch for 1,400 Geo. Short of charms or Geo, set it aside: Leg Eater’s three come back in chapter 9."],
      ],
    },
    {
      title: "The Seer’s gifts",
      location: "Resting Grounds",
      note: "Lost Kin’s 400 Essence carries you to the 500 and 700 gifts. If that fight is too much for now, take the Pale Ore at 300 and set the rest aside.",
      sources: [["Steam guide ch 11 · turning in Essence at the Seer", steam], ["fextralife · the Seer’s rewards", "https://hollowknight.wiki.fextralife.com/Seer"], ["Wiki · Seer", "https://hollowknight.wiki/w/Seer"]],
      rows: [
        ["pale-ore-seer-ore", ["pale-ore"], "Claim the Seer’s Pale Ore at 300 Essence", "Ride the Stag from the Crossroads to the Resting Grounds and climb to the Seer. Lost Kin, No Eyes and four Roots have taken you past 800 Essence: at 300 she hands over a Pale Ore."],
        ["charm-dream-wielder", ["charm"], "Obtain Dream Wielder at 500 Essence", "At 500 Essence the Seer gives you the Dream Wielder charm."],
        ["vessel-fragment-seer-vessel", ["vessel-fragment"], "Claim the Seer’s Vessel Fragment at 700 Essence", "At 700 Essence her gift is a Vessel Fragment. She also opens a way at 200 that chapter 10 takes."],
      ],
    },
    {
      title: "The Channelled Nail, Lemm and Flukemarm",
      location: "Royal Waterways",
      sources: [["Steam guide ch 17 · the Nailsmith’s prices and Flukemarm’s cave", steam], ["fextralife · Relic Seeker Lemm’s prices and the Crest", "https://hollowknight.wiki.fextralife.com/Relic+Seeker+Lemm"], ["Wiki · Relic Seeker Lemm", "https://hollowknight.wiki/w/Relic_Seeker_Lemm"], ["gamerwalkthroughs · the Flukefeys and the Channelled Nail", gwWaterways], ["ludo.guide · Flukemarm’s cave and Flukenest on the ledge", ludoBasin2], ["Wiki · Flukemarm", "https://hollowknight.wiki/w/Flukemarm"], ["Wiki · Flukenest", "https://hollowknight.wiki/w/Flukenest"], ["Wiki · the Nailsmith’s upgrades", "https://hollowknight.wiki/w/Nailsmith"]],
      rows: [
        ["route-lemm-relics-5", ["route"], "Sell this chapter’s relics to Lemm", "Ride the Stag to the City Storerooms. Take Defender’s Crest off at a bench, then go to Lemm. He pays 800 Geo for each King’s Idol, 450 for a Hallownest Seal and 200 for a Wanderer’s Journal: this chapter’s seven come to 3,350.", { place: "City of Tears" }],
        ["forge-channelled-nail", ["forge"], "Upgrade to the Channelled Nail", "Then go to the Nailsmith: the Channelled Nail costs 800 Geo and one Pale Ore.", { place: "City of Tears" }],
        ["boss-flukemarm", ["boss", "other-boss"], "Defeat Flukemarm under the Waterways", "Back down the hatch below Lemm’s shop to the Waterways bench. Break the loose floor in the corridor just under it with a dive, go down as far as the tunnels allow, then west; where the tunnel starts to rise, carry straight on through a hidden wall into her cave. The little worms on the way refill your Soul. She spits Flukefeys two at a time; the Channelled Nail kills each with one hit, so clear them and hit her between spawns."],
        ["charm-flukenest", ["charm"], "Collect Flukenest after Flukemarm", "She leaves the charm on the top-left ledge when she falls."],
        ["route-waterways-west", ["route"], "Leave the Waterways by Cornifer’s door", "Climb back up and go west to Cornifer’s room: the door its lever opened, at the bottom left, comes out in the Fungal Wastes by a bench. Go left and drop down to the Dashmaster statue, where chapter 6 begins."],
      ],
    },
  ],
} satisfies RawChapter;

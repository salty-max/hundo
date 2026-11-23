import type { RawChapter } from "@hundo/core/types";

const steam = "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947";
const fxl = "https://hollowknight.wiki.fextralife.com/";
const gwFog = "https://gamerwalkthroughs.com/hollow-knight/fog-canyon/";
const gwGardens = "https://gamerwalkthroughs.com/hollow-knight/queens-gardens/";
const gwTower = "https://gamerwalkthroughs.com/hollow-knight/watchers-spire-tower-of-love/";
const ludo = "https://www.ludo.guide/guide/hollow-knight/";
const vgkGardens = "https://vgkami.com/walkthrough/hollow-knight/queens-gardens/";
const sw = "https://scripterswar.com/hollowknight/map";

export default {
  id: 8,
  title: "Fog Canyon and Queen’s Gardens",
  region: "Forgotten Crossroads · Fog Canyon · Queen’s Gardens · Tower of Love",
  teaser: "Queen’s Gardens",
  intro: "Walk back through the Crossroads into Fog Canyon, cross the Queen’s Gardens to the Traitor Lord and the White Lady, and come out through Greenpath to the Teacher’s Archives. Then climb the Tower of Love, and end by carrying a flower to the Gardens.",
  sources: [["Steam guide ch 18, 19, 22, 23, 25 and 26 · Fog Canyon, the Gardens, the Tower, Millibelle, the Grubfather and the flower", steam], ["gamerwalkthroughs · Fog Canyon", gwFog], ["gamerwalkthroughs · Queen’s Gardens", gwGardens], ["fextralife · Queen’s Gardens", `${fxl}Queen's+Gardens`]],
  groups: [
    {
      title: "Back through the Crossroads",
      location: "Forgotten Crossroads",
      sources: [["Steam guide ch 18, 25 and 26 · the acid pool, the Grubfather and the walk west", steam], ["ludo.guide · Fog Canyon from the Crossroads", `${ludo}fog-canyon`], ["fextralife · Blue Lake", `${fxl}Blue+Lake`], ["ScriptersWar map · the lake’s Rancid Egg and the Isma’s Tear wall", sw], ["Wiki · the Grubfather’s rewards", "https://hollowknight.wiki/w/Grubfather"]],
      rows: [
        ["route-blue-lake-west", ["route"], "Cross the Blue Lake to Salubra", "From the Seer, go back down to the Blue Lake, as in chapter 4, and swim it west: the hidden passage at the far side drops you beside Salubra’s hut. A Rancid Egg lies by the lake. Rest at the bench outside her hut; anything you set aside at Salubra’s comes back here."],
        ["pale-ore-grubfather-ore", ["pale-ore"], "Claim Pale Ore at 31 rescues", "Go west through the Crossroads, past the Goams’ halls, to the room where you first met Cornifer, and up the main shaft above it to its top-left exit and the Grubfather. With 37 Grubs freed, he gives the Pale Ore at 31. He drops his rewards on the floor, so pick everything up. His King’s Idol comes at 38, one Grub away: this chapter comes back for it."],
        ["route-acid-pool-fog", ["route"], "Swim under the acid-pool wall into Fog Canyon", "Go back down into Cornifer’s room and out its lower-left exit, along the passage to the acid pool where chapter 1 freed its Grub. Swim under the wall on its right with Isma’s Tear and drop into Fog Canyon’s tall shaft."],
      ],
    },
    {
      title: "Fog Canyon’s east shaft",
      location: "Fog Canyon",
      sources: [["Steam guide ch 18 · the Seal, the notch and the bubbles", steam], ["ludo.guide · the Seal in the left wall and the notch below it", `${ludo}fog-canyon`], ["ScriptersWar map · the Seal and the notch", sw]],
      rows: [
        ["hallownest-seal-fog-canyon-east", ["hallownest-seal"], "Take the Hallownest Seal at the top of Fog Canyon’s shaft", "Climb to the very top of the shaft: a hidden way in the left wall leads through and down a nook lined with thorns, and the Hallownest Seal lies on its bottom platform."],
        ["notch-fog-canyon", ["notch"], "Take the Charm Notch in the exploding bubble room", "Back in the shaft, go down to the first exit on the left: a room of bubbles that burst when popped, with the notch at its bottom left. Spells clear the bubbles ahead of you, and Descending Dark’s moment of invulnerability helps on the drops. Set your Dreamgate in the shaft as you come back out: the side trip next comes back in one warp."],
      ],
    },
    {
      title: "Right into the Fungal Wastes",
      location: "Fungal Wastes",
      sources: [["Steam guide ch 18 · straight across to the right, Leg Eater and Elder Hu", steam], ["ludo.guide · the Root through a small pool of acid from Leg Eater’s side", `${ludo}infected-crossroads`], ["ScriptersWar map · the Root", sw], ["Wiki · Elder Hu’s rings", "https://hollowknight.wiki/w/Elder_Hu"]],
      rows: [
        ["root-fungal-fog", ["root"], "Clear the Fungal Wastes Root near Fog Canyon", "From the notch’s exit, go straight across to the right into the Fungal Wastes: the Root in the first room holds 20 Essence.", { requires: ["dream-milestone-dream-nail"] }],
        ["warrior-dream-elder-hu", ["warrior-dream"], "Defeat Elder Hu on the eastern Fungal Wastes route", "One room on, through the acid, is Leg Eater’s camp and bench: anything of his you set aside comes back here, cheaper while you wear Defender’s Crest (take it off again before you sell to Lemm). From there go down and right two rooms, then right at the bottom of the next tall room to Elder Hu’s memorial. Dream Nail it. He slams rows of rings into the ground with gaps between them: stand in a gap, then strike while he floats low. 100 Essence. Then warp back to the shaft, or walk.", { requires: ["dream-milestone-dream-nail"] }],
      ],
    },
    {
      title: "Cornifer and the Archives’ room",
      location: "Fog Canyon",
      sources: [["Steam guide ch 18 · Cornifer above the shade gate, the jar and Quirrel", steam], ["ludo.guide · up the platforms to Cornifer, the jar, Quirrel and the scaffolding", `${ludo}fog-canyon`], ["gamerwalkthroughs · the super dash before the Archives’ entrance", gwFog], ["fextralife · Cornifer", `${fxl}Cornifer`], ["ScriptersWar map · the jar and the one-way scaffolding", sw]],
      rows: [
        ["map-fog-canyon", ["map"], "Buy Cornifer’s Fog Canyon map", "Down the shaft, take the next exit on the left, cross the small room and climb the platforms in the next to Cornifer, above a shade gate: 150 Geo."],
        ["grub-fog-superdash", ["grub"], "Free the Fog Canyon super-dash Grub", "Back in the shaft, take its lowest exit on the left and cross the room beyond. As you come into the Archives’ room after it, charge Crystal Heart from its top-right ledge to shoot left across to a hidden area with the jar."],
        ["quest-quirrel-archives", ["quest"], "Find Quirrel outside the Teacher’s Archives", "Quirrel stands outside the Archives’ door in this room: talk to him. The Archives wait until you’ve crossed the Gardens. Break the scaffolding on the room’s left and drop into the next tall room."],
      ],
    },
    {
      title: "The bank and Queen’s Station",
      location: "Fog Canyon · Queen’s Station",
      sources: [["Steam guide ch 19 · the bank, the Seal above Willoh, the rest and the empty booth", steam], ["gamerwalkthroughs · the bank to the left", gwFog], ["fextralife · Millibelle", `${fxl}Millibelle`], ["ScriptersWar map · the bank, the booth and the Seal", sw], ["Wiki · Millibelle: what makes her leave", "https://hollowknight.wiki/w/Millibelle_the_Banker"]],
      rows: [
        ["quest-millibelle-bank", ["quest"], "Open Millibelle’s account if you want her full story", "Drop to the bottom of this tall room and go left to Millibelle’s bank. Open an account for 100 Geo and deposit at least 2,550: you win back about one and a half times what she holds, up to 4,500, and once she’s gone nothing more goes in, so put in all you mean to at once. Put in less and nothing happens; keep about 350 back for the Gardens’ map and Stag ahead. If you can’t spare it now, come back on the way to the Archives. Then go through the room’s bottom-right exit to Queen’s Station, take the Seal above Willoh and rest at the station’s bench: that moves her story on. On your way back to the Gardens, the booth stands empty; knock its front over with your nail."],
        ["hallownest-seal-queens-station", ["hallownest-seal"], "Take the Hallownest Seal above Willoh", "In Queen’s Station, from the hall’s upper-left platform, double-jump into the room above Willoh, who eats fungus: a Hallownest Seal waits there.", { requires: ["equipment-monarch-wings"] }],
      ],
    },
    {
      title: "Into the Queen’s Gardens",
      location: "Queen’s Gardens",
      sources: [["Steam guide ch 19 · under the thorns, Cloth, the gauntlet, Cornifer, the lever and the Love Key", steam], ["fextralife · Queen’s Gardens: the free bench, the lever over the Fool Eaters, the Root and the key’s acid passage", `${fxl}Queen's+Gardens`], ["VGKami · the spike pit, the gauntlet, the bench and the lever", vgkGardens], ["ludo.guide · Cloth, Cornifer and the Root", `${ludo}queen-s-garden`], ["gamerwalkthroughs · the bench by Cornifer", gwGardens], ["ScriptersWar map · the Rancid Egg, the lever and the key", sw], ["Wiki · the Love Key in the south-east", "https://hollowknight.wiki/w/Queen%27s_Gardens"], ["Wiki · Iselda’s map prices", "https://hollowknight.wiki/w/Iselda"]],
      rows: [
        ["route-gardens-entry", ["route"], "Enter the Queen’s Gardens from Fog Canyon", "From the tall room’s middle exit on the left, swim with Isma’s Tear under the great wall of thorns into the Queen’s Gardens. A Rancid Egg sits at the first room’s top right, up a platform over a spike pit that gives way if you linger."],
        ["quest-cloth-gardens", ["quest"], "Meet Cloth again on the Gardens approach", "If you found Cloth in the Basin, she waits on the path just inside the Gardens, before its gates. Talk to her: she means to face the mantis traitors here, and she joins you for the Traitor Lord fight."],
        ["map-queens-gardens", ["map"], "Buy Cornifer’s Queen’s Gardens map", "Go left, down the next room’s platforms over a spike pit and out at its bottom right: the gates shut on Mantis Petras. Beat them, then follow the bench sign round to the room’s top right and through, to a bench and Cornifer, who sells the map for 150 Geo. Rest here. If only his note is there, Iselda sells it in Dirtmouth for 200."],
        ["root-gardens", ["root"], "Clear the Queen’s Gardens Root", "Back out, drop toward the thorn pits: a gate on the right is locked. Go left over the thorns, minding the Fool Eaters buried in the walls and floor, slide down and go right to the lever that opens it. Through the gate and down a room of collapsing platforms and Mossflies, the Queen’s Gardens Root at its lower left holds 29 Essence.", { requires: ["dream-milestone-dream-nail"] }],
        ["pickup-love-key", ["pickup"], "Collect the Love Key in the Gardens", "Go right into the next tall room: a Geo deposit marks a narrow acid passage on its right. Swim it to a giant dead Husk Dandy clutching the Love Key. Two Mantis Traitors guard it, and a third drops in behind you. The key opens the Tower of Love, later this chapter.", { gives: "Love Key" }],
      ],
    },
    {
      title: "The western Gardens and the Stag",
      location: "Queen’s Gardens",
      sources: [["Steam guide ch 19 · the gauntlet Grub, the far-west Grub and Seal, Marmu and the Stag", steam], ["fextralife · Queen’s Gardens: the flipping platforms, the gauntlet, the thorny path and the toll bench to the west", `${fxl}Queen's+Gardens`], ["VGKami · the gauntlet, the far-west Seal and the Stag’s hidden way", vgkGardens], ["gamerwalkthroughs · the jars and the bench to the west", gwGardens], ["ludo.guide · the far-west room, Marmu and the Stag", `${ludo}queen-s-garden`], ["ScriptersWar map · the jars, the Seal, the grave and the Stag’s lever", sw]],
      rows: [
        ["grub-gardens-hidden", ["grub"], "Free the Grub behind the Gardens Geo rock", "Back in the Root’s room, leave at its bottom left into a room of metal platforms that flip a moment after you land, over spikes. A toll bench two rooms west costs 150 Geo; you don’t need it. Climb out of this room by the Stag sign: the gates shut on three waves of mantises and a Spiny Husk. Then go right, up past the Mossflies, and left along a thorny path to its end: a Geo deposit marks a hidden room with the jar."],
        ["grub-gardens-upper", ["grub"], "Free the Grub above the narrow Gardens passage", "Up in the tall room above, climb to the top and take the left path. Past a giant dead bug, where the corridor narrows, break the roof and climb up between the spikes to the jar."],
        ["hallownest-seal-gardens", ["hallownest-seal"], "Take the Hallownest Seal in the Gardens’ far west", "Back down, circle left through the narrow passages to the top-left platform: a Hallownest Seal."],
        ["warrior-dream-marmu", ["warrior-dream"], "Defeat Marmu beside the Gardens station", "Round the right half of the room, drop through a hole into the next: Marmu’s grave is on the way right. Dream Nail it. She curls up and hurls herself at you; hit her back like a ball. 150 Essence.", { requires: ["dream-milestone-dream-nail"] }],
        ["stag-queens-gardens", ["stag"], "Open the Queen’s Gardens station", "Go on right and through a hidden way at the top to the Stag Station: open it for 200 Geo, hit its lever to open the way into the tall room beside it, and rest at its bench. Halfway up that tall room, a thorny exit on the left leads to a grave: the end of this chapter brings a flower there."],
      ],
    },
    {
      title: "The Traitor Lord and the White Lady",
      location: "Queen’s Gardens",
      sources: [["Steam guide ch 19 · the shortcut lever, the glass Grub, the Traitor Lord, the White Lady and Cloth’s spirit", steam], ["fextralife · Traitor Lord", `${fxl}Traitor+Lord`], ["gamerwalkthroughs · the glass jar, the Traitor Lord’s two-mask hits and shockwave", gwGardens], ["VGKami · the shade gate, the platforms, the traitors, the shockwave and the White Lady", vgkGardens], ["ludo.guide · the glass jar", `${ludo}queen-s-garden`], ["Wiki · the White Lady’s White Fragment", "https://hollowknight.wiki/w/White_Lady"], ["Wiki · Cloth’s spirit, and Dirtmouth if you never found her", "https://hollowknight.wiki/w/Cloth"]],
      rows: [
        ["grub-gardens-glass", ["grub"], "Free the Grub beyond the Gardens glass barrier", "Through the Stag’s lever door into the tall room, climb to its top and go right: a lever there opens a blocked floor down to the Gardens’ entrance rooms, a shortcut. Go on, up and left across a room of trick platforms and thorns into a tall room, and set your Dreamgate at its foot. Climb past the Spiny Husk and Mantis Petra to the gazebo at the top, break the glass on its left, then wall-climb and super dash across, shooting the Mossflies first: the jar. It’s the hardest jar to reach; warp back down after."],
        ["boss-traitor-lord", ["boss", "percent-boss"], "Defeat the Traitor Lord", "The door on the left at the tall room’s foot is a shade gate: dash through, cross the collapsing platforms over spikes, and the gate shuts. Mantis Traitors come first, then he drops in, and his hits take two masks. His ground slam sends shockwaves both ways: dash through them with the Shade Cloak, or use Descending Dark if the dash is cooling. Jump over his lunge, and dash through him when he leaps at you. A retry starts from your Dreamgate, or the Stag’s bench.", { requires: ["equipment-shade-cloak"] }],
        ["quest-white-lady", ["quest"], "Receive the White Lady’s White Fragment", "Leave the arena by its left side to the great cocoon-like structure, then go in and down. The White Lady gives you the White Fragment, one half of a charm. Keep it; the other half comes later.", { requires: ["boss-traitor-lord"], gives: "White Fragment" }],
        ["quest-cloth-farewell", ["quest"], "Speak to Cloth in the arena afterwards", "Come back right through the arena: if Cloth fought beside you, speak to her there before you leave, since it’s your only chance. If you never found her in the Basin before this fight, finding her there now sends her to Dirtmouth instead, where she rests outside Sly’s shop.", { requires: ["boss-traitor-lord"] }],
      ],
    },
    {
      title: "Out through Greenpath",
      location: "Greenpath",
      sources: [["ludo.guide · right from the glass jar’s room to the Root", `${ludo}queen-s-garden`], ["ScriptersWar map · the Root at the corridor’s west end", sw], ["ludo.guide · the corridor, the bubble room and the drop into Fog Canyon", `${ludo}fog-canyon`], ["Wiki · Greenpath: its Root’s 44 Essence", "https://hollowknight.wiki/w/Greenpath"], ["Wiki · the Greenpath Root’s Essence", "https://hollowknight.wiki/w/Whispering_Root"]],
      rows: [
        ["root-greenpath", ["root"], "Clear the Greenpath Root", "Back at the foot of the tall room, its right exit opens into the far west end of Greenpath’s long acid corridor. The Greenpath Root is right there: 44 Essence. If some of it falls past the vine platforms into the corridor, follow it down.", { requires: ["dream-milestone-dream-nail"] }],
        ["route-gardens-greenpath", ["route"], "Walk out through Greenpath to Fog Canyon", "Go east along the corridor, past the chest and the Grub chapter 2 took, into the room of bubbles. Drop through its floor and out at the bottom right into Fog Canyon, by the tall room with the bank. If you didn’t fund Millibelle earlier, do it now: the Archives’ bench sends her off."],
      ],
    },
    {
      title: "The Teacher’s Archives",
      location: "Fog Canyon",
      sources: [["Steam guide ch 18 · the bench, Uumuu and Monomon", steam], ["gamerwalkthroughs · Uumuu rising from the acid, and the tank", gwFog], ["ludo.guide · the bench, the tank and the dream", `${ludo}fog-canyon`], ["fextralife · Uumuu", `${fxl}Uumuu`], ["fextralife · Monomon the Teacher", `${fxl}Monomon+the+Teacher`]],
      rows: [
        ["boss-uumuu", ["boss", "percent-boss"], "Defeat Uumuu with Quirrel’s help", "Go back into the Archives’ room through the scaffolding you broke, and in through the door: all the way right and up two platforms is the bench. Rest. Then go down through the building: Uumuu rises from the acid when you reach the lowest platform. Your nail and spells bounce off its membrane until Quirrel leaps in and pops it, so hit it hard in those few seconds. Keep moving the rest of the time: one of its attacks drops lightning wherever you stand."],
        ["dreamer-monomon", ["dreamer"], "Reach Monomon beyond the Archives arena", "Go on into the inner chamber, climb onto Monomon’s tank and inspect it. Quirrel arrives; once he has done what he came for, strike the tank with the Dream Nail, strike her in the dream, then Focus to break her seal. Then leave the Archives and take the tall room’s bottom-right exit to Queen’s Station.", { requires: ["boss-uumuu"] }],
      ],
    },
    {
      title: "The Tower of Love",
      location: "City of Tears",
      sources: [["Steam guide ch 22 and 23 · the lower-left door, the tower, the Collector, the jars and the map", steam], ["gamerwalkthroughs · Watcher’s Spire and Tower of Love", gwTower], ["fextralife · The Collector", `${fxl}The+Collector`], ["ScriptersWar map · the lobby’s lever down to the stagway, the jars and the map", sw], ["Wiki · the Collector’s Map", "https://hollowknight.wiki/w/Grub"]],
      rows: [
        ["route-tower-door", ["route"], "Open the Tower of Love from Kingdom’s Edge", "Ride the Stag from Queen’s Station to King’s Station, go through the flooded stagway into Kingdom’s Edge, and climb into the tall room above the way in. Its lower-left door leads into the Tower of Love’s lobby. Pull the lever there first: it opens a one-way shortcut down into the flooded stagway, so King’s Station’s bench is close by: go down and rest there before the fight. Then the Love Key opens the padded door on the left; climb the tower.", { requires: ["pickup-love-key"] }],
        ["boss-collector", ["boss", "percent-boss"], "Defeat the Collector", "The Collector waits at the top. Don’t jump: walk under his leaps and hit him as he lands. Kill whatever breaks out of his jars quickly, with spells from range. If he beats you, your shade waits in a jar in the tower.", { requires: ["route-tower-door"] }],
        ["grub-tower-near", ["grub"], "Free the first Grub beyond the Collector", "Climb above the arena and break the nearest of the three jars in the chamber there.", { requires: ["boss-collector"] }],
        ["grub-tower-middle", ["grub"], "Free the middle Grub beyond the Collector", "Go on across the chamber and break the middle jar.", { requires: ["boss-collector"] }],
        ["grub-tower-far", ["grub"], "Free the far Grub beyond the Collector", "Break the last jar in the chamber.", { requires: ["boss-collector"] }],
        ["pickup-collectors-map", ["pickup"], "Take the Collector’s Map", "At the chamber’s far left lies the Collector’s Map: it marks every Grub still waiting on the maps you own. Then go back down and through the lobby’s open floor to King’s Station.", { requires: ["boss-collector"], gives: "Collector’s Map" }],
      ],
    },
    {
      title: "Millibelle’s spa",
      location: "City of Tears",
      sources: [["Steam guide ch 23 · the Pleasure House and Millibelle", steam], ["fextralife · Millibelle", `${fxl}Millibelle`], ["fextralife · Relic Seeker Lemm", `${fxl}Relic+Seeker+Lemm`]],
      rows: [
        ["quest-millibelle-spa", ["quest"], "Find Millibelle at the Pleasure House", "From King’s Station, go into the building west of it: the Pleasure House you opened in chapter 7 is up and right of the Great Husk Sentry’s house. Ride the lift to the top, go through the left-hand door and climb to the hot spring. Hit Millibelle until no more Geo falls, gathering it as you go: about one and a half times what you deposited. If she isn’t there, she never left her booth. Lemm is by the fountain square two rooms west, at his shop or the memorial, if you want to sell this chapter’s Seals.", { requires: ["quest-millibelle-bank"] }],
      ],
    },
    {
      title: "The Grubfather’s idol",
      location: "Forgotten Crossroads",
      sources: [["Steam guide ch 25 · the Grubfather", steam], ["fextralife · Grubfather", `${fxl}Grubfather`], ["ScriptersWar map · the idol at 38", sw], ["Wiki · the Grubfather’s rewards", "https://hollowknight.wiki/w/Grubfather"]],
      rows: [
        ["kings-idol-grubfather", ["kings-idol"], "Take the Grubfather’s King’s Idol at 38", "Ride the Stag from King’s Station to the Crossroads and go back to the Grubfather, up the main shaft above the room where you first met Cornifer, as at this chapter’s start. With 44 Grubs freed, he gives the King’s Idol at 38. His last gift waits for two more jars."],
      ],
    },
    {
      title: "The Blue Lake and the Seer",
      location: "Resting Grounds",
      note: "From here to the grave, don’t rest at a bench: a rest brings back every enemy you’ve cleared from the flower’s way.",
      sources: [["Steam guide ch 26 · Quirrel at the lake", steam], ["ludo.guide · Quirrel one last time, and not resting", `${ludo}resting-grounds-part-3`], ["fextralife · Blue Lake", `${fxl}Blue+Lake`], ["fextralife · the Seer’s rewards", `${fxl}Seer`]],
      rows: [
        ["quest-quirrel-lake", ["quest"], "Sit with Quirrel at the Blue Lake", "Go down into Cornifer’s room and east through the Goam halls to Salubra’s hut, then up the hidden passage to the Blue Lake. Quirrel sits on its far shore: hear him out, then sit beside him for a while.", { requires: ["dreamer-monomon"] }],
        ["mask-shard-seer-mask", ["mask-shard"], "Claim the Seer’s Mask Shard at 1,500 Essence", "Go on up to the Seer: past 1,500 Essence, she gives you a Mask Shard."],
      ],
    },
    {
      title: "The Grey Mourner’s flower",
      location: "Resting Grounds",
      sources: [["Steam guide ch 26 · the Grey Mourner, the walk and the reload", steam], ["ludo.guide · the flower’s route, no rests, and the reload", `${ludo}resting-grounds-part-3`], ["gamerwalkthroughs · the chest, the roof and the bench by her house", "https://gamerwalkthroughs.com/hollow-knight/resting-grounds/"], ["fextralife · Delicate Flower: what breaks it", `${fxl}Delicate+Flower`], ["fextralife · Grey Mourner", `${fxl}Grey+Mourner`], ["Wiki · the flower and the tram", "https://hollowknight.wiki/w/Delicate_Flower_(Quest)"]],
      rows: [
        ["quest-flower-start", ["quest"], "Accept a Delicate Flower from the Grey Mourner", "Drop into the crypt through the grave you broke in chapter 4, go to the chest and break the ceiling above it, and climb to the Grey Mourner’s house, with a bench outside. Accept her Delicate Flower: your reload point is now her bench."],
        ["quest-flower-grave", ["quest"], "Deliver the Delicate Flower to the grave in Queen’s Gardens", "From her house, go back down to the crypt and west through it and the lift room to the Blue Lake, then along this chapter’s first walk: across the lake to Salubra’s, west through the Crossroads to the acid pool, under the wall into Fog Canyon, down the shaft and out its lowest left exit past the Archives, then the tall room’s middle-left exit and under the thorns into the Gardens. Go left from the first room, and in the next climb up through the floor the lever opened, then left into the tall room by the Stag, drop to about its middle and take its thorny left exit; hop and dash along the thorns to the grave and lay the flower on it. Fog Canyon and the Gardens have filled up again since you last rested there, so go slowly and dodge rather than fight. One hit breaks the flower, and so does a Stag ride or a Dreamgate warp; the tram is safe. If it breaks, the Grey Mourner gives you another.", { requires: ["quest-flower-start"], place: "Queen’s Gardens" }],
        ["mask-shard-flower", ["mask-shard"], "Claim the Grey Mourner’s Mask Shard", "With the flower on the grave, quit and reload: you wake at the Grey Mourner’s bench, outside her house. Go in for your Mask Shard. From then on, more flowers can be taken from the grave, if you want one for anyone else.", { requires: ["quest-flower-grave"] }],
      ],
    },
  ],
} satisfies RawChapter;

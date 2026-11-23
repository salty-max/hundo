import type { RawChapter } from "@hundo/core/types";

const steam = "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947";
const fxl = "https://hollowknight.wiki.fextralife.com/";
const gwEast = "https://gamerwalkthroughs.com/hollow-knight/city-of-tears-east/";
const gwEdge = "https://gamerwalkthroughs.com/hollow-knight/kingdoms-edge/";
const gwAbyss = "https://gamerwalkthroughs.com/hollow-knight/the-abyss/";
const gwSpire = "https://gamerwalkthroughs.com/hollow-knight/watchers-spire-tower-of-love/";
const ludo = "https://www.ludo.guide/guide/hollow-knight/";
const vgkEdge = "https://vgkami.com/walkthrough/hollow-knight/kingdoms-edge/";
const vgkAbyss = "https://vgkami.com/walkthrough/hollow-knight/the-abyss/";
const sw = "https://scripterswar.com/hollowknight/map";

export default {
  id: 7,
  title: "Kingdom’s Edge and the Abyss",
  region: "City of Tears · Kingdom’s Edge · The Abyss",
  teaser: "Kingdom’s Edge",
  intro: "Ride the lift down to King’s Station and sell your relics to Lemm, cross Kingdom’s Edge from Oro to Hornet for the King’s Brand, and carry it down the broken lift into the Abyss for the Shade Cloak. Then come back by tram for Markoth, climb the Watcher’s Spire, and end at the Seer.",
  sources: [["Steam guide ch 15, 16 and 22 to 24 · the east City, Kingdom’s Edge, the Abyss and the Watcher’s Spire", steam], ["gamerwalkthroughs · City of Tears (East)", gwEast], ["gamerwalkthroughs · Kingdom’s Edge", gwEdge], ["fextralife · Kingdom’s Edge", `${fxl}Kingdom%27s+Edge`]],
  groups: [
    {
      title: "The lift and King’s Station",
      location: "City of Tears",
      sources: [["Steam guide ch 15 · the lift, the guards’ fragment, the journal, the Stag and the roof Seal", steam], ["gamerwalkthroughs · the lift, the arena and King’s Station", gwEast], ["ludo.guide · the lift down from the Resting Grounds", `${ludo}resting-grounds-part-2`], ["VGKami · King’s Station’s bench and Stag", vgkEdge], ["ScriptersWar map · the arena, the journal and the Seal", sw]],
      rows: [
        ["route-east-city", ["route"], "Ride the lift down into the east City", "From the Seer, go down to the station, drop through the grave below it that you broke open in chapter 4, and go west through the wall you broke then into the lift room. Ride the lift down into the City of Tears."],
        ["vessel-fragment-kings-station", ["vessel-fragment"], "Collect the fragment above King’s Station", "Go one room right from the lift’s foot and climb to the exit in its ceiling: the gates shut on a wave of City guards. Beat them and the fragment waits at the far end."],
        ["wanderers-journal-kings-station", ["wanderers-journal"], "Take the Wanderer’s Journal in King’s Station’s tower", "Drop back into the tower below and work down its first lift shaft. In the second shaft, duck into the only floor with no call lever: past the Sentry Husks guarding it lies a Wanderer’s Journal."],
        ["stag-kings-station", ["stag"], "Open King’s Station", "Keep on down and into King’s Station through the floor. Its lower platform has a bench and the Stag Station: rest, and pay 300 Geo for the Stag if you have it (if not, it can wait until Lemm has paid you, a few rooms on). Set your Dreamgate here: it’s this chapter’s hub, and after the King’s Brand you can warp straight back."],
        ["hallownest-seal-kings-station", ["hallownest-seal"], "Take the Hallownest Seal on King’s Station’s roof", "From the upper station platform, double-jump up and pogo your nail off the spikes leftward along the roof to the Hallownest Seal above it. The only wall you can cling to on the way is a narrow strip on the side of the roof, just below the spikes."],
      ],
    },
    {
      title: "The houses west of the station, and Lemm",
      location: "City of Tears",
      note: "Lemm buys relics: 200 Geo a Wanderer’s Journal, 450 a Hallownest Seal, 800 a King’s Idol, 1,200 an Arcane Egg. He won’t deal while you wear Defender’s Crest.",
      sources: [["Steam guide ch 17, 23 and 24 · the Gorgeous Husk, the Great Husk Sentry’s Grub, the Pleasure House and Lemm at the memorial", steam], ["gamerwalkthroughs · the building’s open doors, the Grub, the Gorgeous Husk and the Pleasure House", gwEast], ["ludo.guide · the building, the Gorgeous Husk and the lever to the fountain square", `${ludo}city-of-tears-part-3`], ["ludo.guide · the Pleasure House: the journal, the egg, the bench and the wall", `${ludo}city-of-tears-part-4`], ["fextralife · Pleasure House", `${fxl}Pleasure+House`], ["fextralife · Relic Seeker Lemm: the memorial and his prices", `${fxl}Relic+Seeker+Lemm`]],
      rows: [
        ["grub-city-great-husk", ["grub"], "Free the Grub behind the Great Husk Sentry", "Leave King’s Station by its lower west exit into a big building with most of its doors shut. The house door on the ledge just above the exit holds this jar, and the Great Husk Sentry inside has to go first. In the same building, one level of platforms below where King’s Station’s upper-left exit comes out, a curtained door leads to a room of little Husks: clear them, then hop into the hidden passage at the back of the room, on the right, to the Gorgeous Husk, who drops 420 Geo."],
        ["wanderers-journal-pleasure-house", ["wanderers-journal"], "Take the Wanderer’s Journal in the Pleasure House", "Up and right from the Grub’s house, the door by the hot-spring sign is the Pleasure House. Spend one of your two Simple Keys on it. Send the lift up but step off at its first stop, go right and drop: a Wanderer’s Journal. From there, climb the shaft rather than riding: a Rancid Egg lies on one of the floors the lift skips. At the top are a bench and a hot spring, and the wall beside the bench breaks into the foot of the lift up to the Resting Grounds, a shortcut. Ride back down and leave the house."],
        ["route-lemm-memorial", ["route"], "Send Lemm home from the memorial and sell", "Leave the building at its west side and go left two rooms: a lever by a gate opens the fountain square from this side. Lemm stands at the memorial. Talk to him and he goes back to his shop, a little further on. Chapter 6’s four relics and this chapter’s three fetch 3,000 Geo, toward Oro’s lesson and the Basin fountain ahead."],
      ],
    },
    {
      title: "Into Kingdom’s Edge",
      location: "Kingdom’s Edge",
      sources: [["Steam guide ch 15 · the flooded station, the Grub and Cornifer’s pipe", steam], ["gamerwalkthroughs · the secret in the wall by the water, and no Stag in Kingdom’s Edge", gwEast], ["VGKami · the Vengeflies, the swim and the jar", vgkEdge], ["fextralife · Cornifer for 112 Geo", `${fxl}Kingdom%27s+Edge`]],
      rows: [
        ["route-edge-tunnel", ["route"], "Swim the flooded stagway toward Kingdom’s Edge", "Back in King’s Station, go to its bottom and take the exit right into the flooded stagway, a ruined copy of the station, where Vengeflies wait. Swim under the wall at its far right.", { place: "City of Tears" }],
        ["grub-city-belfly", ["grub"], "Free the Grub below the Belfly ledge", "Past the swim, the jar sits just below the path, with Belflies hanging from the ceiling over it. Deal with them before you drop down.", { place: "City of Tears" }],
        ["map-kingdoms-edge", ["map"], "Buy Cornifer’s Kingdom’s Edge map", "Keep east until the passage opens onto the central cliff of Kingdom’s Edge, where ash falls. There’s no Stag Station in Kingdom’s Edge, so King’s Station stays your way home. Follow Cornifer’s humming down the cliff to a pipe: he sells the map for 112 Geo."],
      ],
    },
    {
      title: "The tall room above the way in",
      location: "Kingdom’s Edge",
      sources: [["Steam guide ch 15 and 24 · the journal above the entrance and the idol behind the cracked wall", steam], ["ludo.guide · the scaffolding to the journal, the Root and the idol", `${ludo}kingdom-s-edge`], ["ludo.guide · the journal above the entrance", `${ludo}kingdom-s-edge-part-2`], ["gamerwalkthroughs · the idol just below the Colosseum", gwEdge], ["ScriptersWar map · the Root, the Rancid Egg and the shortcut wall", sw], ["Wiki · Kingdom’s Edge: the Root’s 51 Essence", "https://hollowknight.wiki/w/Kingdom%27s_Edge"], ["Wiki · King’s Idol under the Colosseum behind a breakable wall", "https://hollowknight.wiki/w/King%27s_Idol"]],
      rows: [
        ["root-edge", ["root"], "Clear the Kingdom’s Edge Root", "Go back to where you came in and climb into the tall room right above it. Low in that room, to the right, the Kingdom’s Edge Root holds 51 Essence.", { requires: ["dream-milestone-dream-nail"] }],
        ["wanderers-journal-edge-entrance", ["wanderers-journal"], "Take the Wanderer’s Journal above the way in", "Climb to the top of the wall over the entrance and break the scaffolding to reach a Wanderer’s Journal; a Rancid Egg lies near the top of the room too."],
        ["kings-idol-great-hopper", ["kings-idol"], "Take the King’s Idol behind the Great Hopper’s wall", "From the top of the room, go out left. Straight ahead, a cracked wall hides a spiked floor with a Great Hopper patrolling it, and a King’s Idol. Up and right past Belflies is the Colosseum’s door: its trials are chapter 11’s. The wall at the far west end of that cavern breaks from this side into the foot of the City lift, a shortcut. Then drop back down to the central cliff."],
      ],
    },
    {
      title: "Oro and the dive below his hut",
      location: "Kingdom’s Edge",
      sources: [["Steam guide ch 22 · Oro, the dive, the Grub and Quick Slash", steam], ["fextralife · Nailmaster Oro, his bench and the dive", `${fxl}Nailmaster+Oro`], ["fextralife · Quick Slash", `${fxl}Quick+Slash`], ["gamerwalkthroughs · the way to Oro, the dive, the 420 Geo rock and the way back up", gwEdge], ["VGKami · Oro’s bench, the Grub and the climb out", vgkEdge], ["ludo.guide · the dive, the rock, the charm and the Geo deposit by the exit", `${ludo}kingdom-s-edge`], ["ScriptersWar map · the Rancid Egg at the dive’s bottom", sw]],
      rows: [
        ["nail-art-oro", ["nail-art"], "Learn Dash Slash from Nailmaster Oro", "Drop to the acid at the foot of the central cliff and go right, past Hoppers, Primal Aspids and three Great Hoppers, to Oro’s hut in the area’s south-east. Rest at the bench outside. He teaches Dash Slash for 800 Geo."],
        ["grub-edge-oro", ["grub"], "Free the Grub below the brittle floors beside Oro", "Go right past his training dummy, with a Soul Totem at the end, and dive through the loose floor beside the dummy and the two below it. At the bottom, a Rancid Egg lies between the ways west and east. Go east past a Great Hopper and spikes to the jar: rocks fall from the ceiling as you free it. A cracked wall just under it opens a side passage down through many more loose floors to the biggest Geo deposit in Hallownest, 420 Geo; each floor costs a spell, so fill your SOUL first, and climb back up the way you dropped.", { requires: ["spell-desolate-dive"] }],
        ["charm-quick-slash", ["charm"], "Find Quick Slash below Oro’s hut", "Back by the Rancid Egg at the bottom, go west into a tall room. Halfway up, a doorway on the right leads to the charm, beneath a huge dead nailsmith. Climb to the room’s top and break the wall into Oro’s room, then go left a little: a Geo deposit marks the exit overhead.", { requires: ["spell-desolate-dive"] }],
      ],
    },
    {
      title: "The camp, Hornet and the Brand",
      location: "Kingdom’s Edge",
      sources: [["Steam guide ch 15 and 22 · the dive journal, the camp Grub, the hidden bench, Hornet, the Brand and the cocoon", steam], ["ludo.guide · the dive journal, the Grub, the hidden bench and Bardoon", `${ludo}kingdom-s-edge`], ["ludo.guide · the Cast-Off Shell", `${ludo}kingdom-s-edge-part-2`], ["fextralife · Hornet (Boss)", `${fxl}Hornet+(Boss)`], ["fextralife · Cast-Off Shell", `${fxl}Cast-Off+Shell`], ["VGKami · the camp bench, Hornet, talking to her and the shell caving in", vgkEdge], ["gamerwalkthroughs · the Grub, Hornet and the Brand", gwEdge], ["PlayerAssist · Hornet Sentinel", "https://playerassist.com/hollow-knight-defeat-hornet-sentinel/"], ["fextralife · Bardoon talks and gives nothing", `${fxl}Bardoon`]],
      rows: [
        ["wanderers-journal-edge-dive", ["wanderers-journal"], "Take the Wanderer’s Journal under the falling stalactites", "Up through the exit over that Geo deposit, dive the loose ground on the right of the room above, then climb halfway back up into a narrow passage: stalactites fall above the corpse at its end, which holds a Wanderer’s Journal. Along this room’s bottom to the right is a shade gate; later this chapter comes back through it.", { requires: ["spell-desolate-dive"] }],
        ["grub-edge-cracked-wall", ["grub"], "Free the Grub behind the low eastern wall", "Climb into the room above. At its bottom right, past spikes, smash the cracked wall and climb up behind it to the jar, guarded by a Primal Aspid."],
        ["wanderers-journal-edge-camp", ["wanderers-journal"], "Take the Wanderer’s Journal at the hidden camp bench", "Up and right in the same room, above a run of double jumps, a bent bench sign stands alone: break the ceiling above and left of it for a hidden bench and a Wanderer’s Journal. Rest: it’s the nearest bench to Hornet."],
        ["boss-hornet-sentinel", ["boss", "percent-boss"], "Defeat Hornet at Kingdom’s Edge", "Keep right: Hornet leads you along the hall and you drop through the next room into her arena. Once she’s lost about a third of her health she starts setting spike traps: cut them down with your nail or spells before they pile up. Don’t swing while she holds her needle up, since a hit then earns a wide counter. Jump her lunge and hit after it, and heal when she staggers and pants. A retry starts at the camp bench."],
        ["equipment-kings-brand", ["equipment"], "Collect King’s Brand from the Cast-Off Shell", "Talk to her afterwards and the way on opens. Go right and down, then all the way left into the Cast-Off Shell; Crystal Heart crosses its long floor. The King’s Brand lies in a pale broken egg at the far end. Walking back out, the shell caves in and Hornet pulls you out. Warp back to King’s Station with Dreamgate, or walk: on the way back west, past the room with the hidden bench, the next big room has a Lifeblood Cocoon in a hidden room whose ledge is marked by blue butterfly flowers; Bardoon lounges at its top and only talks. Then leave that room by its left side onto the central cliff, and go back through the flooded stagway to King’s Station.", { gives: "King’s Brand" }],
      ],
    },
    {
      title: "Down the broken lift",
      location: "Ancient Basin",
      sources: [["Steam guide ch 9, 16 and 24 · the fountain, the broken lift both ways and the gate", steam], ["ludo.guide · the bottom path to the Basin", `${ludo}kingdom-s-edge-part-2`], ["ludo.guide · the tram car’s bench and the gate", `${ludo}ancient-basin-part-2`], ["gamerwalkthroughs · the fountain takes only 3,000 Geo", "https://gamerwalkthroughs.com/hollow-knight/ancient-basin/"], ["gamerwalkthroughs · the gate and the door that wants masks", gwAbyss], ["VGKami · the gate for the King’s Brand", vgkAbyss], ["Wiki · the Basin fountain, and no benches in the Abyss", "https://hollowknight.wiki/w/The_Abyss_(Hollow_Knight)"]],
      rows: [
        ["route-broken-lift", ["route"], "Drop down the broken lift to the Basin", "From King’s Station, go back into the building west of it. Its second exit on the west side, not the one toward Lemm, opens onto the top of the broken lift shaft that chapter 5 broke into lower down: drop down it. If the fountain will want more Geo, Lemm is two rooms west by the other exit: the three journals and the idol from Kingdom’s Edge fetch 1,400. At the bottom, follow the hall to the Basin’s tram station and go on down into the Basin’s central room.", { place: "City of Tears" }],
        ["vessel-fragment-basin-fountain", ["vessel-fragment"], "Pay the Ancient Basin fountain", "The statue fountain is in the first alcove down the right side of the central room. It gives a Vessel Fragment once it has received 3,000 Geo in all. It keeps count, so whatever you paid in chapter 5 counts, and whatever its inscription suggests it never takes more than that."],
        ["route-abyss-door", ["route"], "Open the Abyss with King’s Brand", "The Abyss has no benches, so first rest at the bench you opened in chapter 5, left of the central room’s bottom. Then drop through the central room’s floor: down and to the left is the tall gate at the bottom of the Basin, which opens for the King’s Brand. Partway down on the left is a door that wants many blue masks (chapter 9 comes back for it).", { requires: ["equipment-kings-brand"] }],
      ],
    },
    {
      title: "The Abyss",
      location: "The Abyss",
      note: "The Abyss is long and has no bench: a shade you leave at the bottom means the whole climb down again. Siblings drift through it, and Shadow Creepers cling to the walls.",
      sources: [["Steam guide ch 16 · Abyss Shriek, the lighthouse, the Shade Cloak, the Arcane Egg and Hornet at the top", steam], ["gamerwalkthroughs · The Abyss", gwAbyss], ["ludo.guide · the lighthouse, the crossing, the egg and Hornet", `${ludo}ancient-basin-part-2`], ["VGKami · the climb past the bottom path, the egg and Hornet", vgkAbyss], ["fextralife · The Abyss: the tendrils and the lighthouse", `${fxl}The+Abyss`], ["fextralife · Shade Cloak", `${fxl}Shade+Cloak`], ["ScriptersWar map · the egg behind the shade gate", sw]],
      rows: [
        ["spell-abyss-shriek", ["spell"], "Upgrade Howling Wraiths to Abyss Shriek", "Drop all the way to the bottom and go left to the end of the hall, where an altar is ringed by screaming faces. Cast Howling Wraiths in the middle of that room and it becomes Abyss Shriek."],
        ["equipment-shade-cloak", ["equipment"], "Collect Shade Cloak across the Void lake", "Go back right along the bottom, two rooms over, and climb the platforms to the lighthouse: pull its lever, and the light calms the tendrils that lash out of the Void sea. Drop back down and cross the sea with Crystal Heart. In the next room climb up rather than taking the bottom path, then go east to a large statue holding a bowl of Void and stand in it. Your Mothwing Cloak becomes the Shade Cloak, whose dash passes through enemies, their attacks and shade gates.", { gives: "Shade Cloak" }],
        ["arcane-egg-shade-cloak", ["arcane-egg"], "Take the Arcane Egg past the shade gate", "From the bowl, take the lower path back west, dashing through the shade gate and the tendrils with the Shade Cloak: an Arcane Egg lies at its end. Then backtrack all the way to the Abyss’s entrance by the gate, where Hornet waits with a few words.", { requires: ["equipment-shade-cloak"] }],
      ],
    },
    {
      title: "Sharp Shadow, one stop west",
      location: "Deepnest",
      sources: [["Steam guide ch 20 · Sharp Shadow’s room", steam], ["fextralife · Deepnest: the shade gate below the Garpede room", `${fxl}Deepnest`], ["ludo.guide · the shade gate and the Goams", `${ludo}deepnest-part-2`], ["gamerwalkthroughs · Sharp Shadow behind a shade gate", "https://gamerwalkthroughs.com/hollow-knight/deepnest/"]],
      rows: [
        ["charm-sharp-shadow", ["charm"], "Return through the Deepnest shade gate for Sharp Shadow", "Climb into the Basin’s tram station and ride one stop west, to Deepnest, then step into the Garpede room beside the station and drop into the room below it. Dash through the shade gate there, then work around the room, shade-dashing through the Goams in your way, to the charm. Ride back east.", { requires: ["equipment-shade-cloak", "pickup-tram-pass"] }],
      ],
    },
    {
      title: "Back by tram, and Markoth",
      location: "Kingdom’s Edge",
      sources: [["Steam guide ch 22 · the Waterways jar, the sealed Hive jar, the wall and Markoth", steam], ["gamerwalkthroughs · up from the tram, the two jars, the wall and Markoth", gwEdge], ["ludo.guide · the jars and the wall", `${ludo}kingdom-s-edge`], ["ludo.guide · Markoth", `${ludo}kingdom-s-edge-part-3`], ["fextralife · Markoth", `${fxl}Markoth`], ["Wiki · the wall to the bottom of the central cliff", "https://hollowknight.wiki/w/Kingdom%27s_Edge"]],
      rows: [
        ["route-edge-tram", ["route"], "Ride the tram to Kingdom’s Edge", "Ride the tram east to Kingdom’s Edge. Straight right of the station, at the tunnel’s far end, is the Hive’s cracked wall: the Hive is chapter 9’s. Climb up from the station, two rooms, into a long hall.", { requires: ["pickup-tram-pass"] }],
        ["grub-waterways-ceiling", ["grub"], "Free the Grub over the southeastern Waterways passage", "Go up through the hall’s ceiling into a corridor of the Royal Waterways. Partway along it the ceiling opens: get up into the passage above to the jar. Then drop back into the hall."],
        ["grub-hive-waterways", ["grub"], "Reach the Hive’s sealed Grub from the Waterways", "Near the hall’s right end, break the loose floor with Desolate Dive or Descending Dark and swim the acid below into a sealed-off corner of the Hive with the jar. Then climb back up into the hall.", { place: "The Hive" }],
        ["warrior-dream-markoth", ["warrior-dream"], "Defeat Markoth in the eastern cliff grave", "Beside that loose floor, a wall breaks from this side into the foot of the central cliff, a shortcut to King’s Station that stays open. Cross to Oro’s room, go up past the Geo deposit and right along the bottom of the room above, and dash through the shade gate into Markoth’s grave. Dream Nail his corpse. His thrown nails aim where you are and then fly straight, so keep moving; cling to a wall and fire spells at him, and heal while his shield spins out wide. 250 Essence.", { requires: ["equipment-shade-cloak", "dream-milestone-dream-nail"] }],
      ],
    },
    {
      title: "The Watcher’s Spire",
      location: "City of Tears",
      sources: [["Steam guide ch 23 · the Spire’s Grub, the chandelier, the knights, the chest, the Seal and Lurien", steam], ["ludo.guide · the base’s lock-in, the levers, the bench, the Grub, the chest and Lurien", `${ludo}city-of-tears-part-5`], ["gamerwalkthroughs · the way in, the Grub, the chandelier and the knights", gwSpire], ["fextralife · Watcher Knight", `${fxl}Watcher+Knight`], ["fextralife · Watcher’s Spire: the way in", `${fxl}Watcher's+Spire`], ["fextralife · Lurien the Watcher", `${fxl}Lurien+the+Watcher`], ["ScriptersWar map · the lock-ins, the bench’s shortcut and the Seal", sw], ["Wiki · the Spire Grub’s guards", "https://hollowknight.wiki/w/Grub"]],
      rows: [
        ["route-watcher-spire", ["route"], "Climb into the Watcher’s Spire", "Go back through the central cliff and the flooded stagway to King’s Station and rest there, then go west through the houses to the corridor under the Watcher’s Spire. Double-jump up into its base. The gates shut on Great Husk Sentries and Lance Sentries. Beat them, then hit the levers that open the doors and two shortcuts, one of them to a bench in the room on the Spire’s west side: rest there, it’s where a retry against the knights starts.", { requires: ["equipment-monarch-wings"] }],
        ["grub-city-watcher", ["grub"], "Free the Grub on the Watcher’s Spire side route", "From the bench, go back through the lever doors and take the room’s upper-right exit, then the right-hand gap in the ceiling of the room after it: the jar is there, watched over by a Lance Sentry and a Great Husk Sentry."],
        ["boss-watcher-knights", ["boss", "percent-boss"], "Defeat the Watcher Knights", "Go back down and take the left-hand gap overhead. Up a level, just before the arena gate, break into the ceiling and head right to cut the chain: the chandelier falls on one of the six knights below and leaves you five. They wake one at a time, then two together. A curled, rolling knight shrugs off your nail but not your spells, so save SOUL for those moments, jump the roll or dash through it, and stay in the air rather than getting pinned between them."],
        ["hallownest-seal-watcher-knights", ["hallownest-seal"], "Take the Hallownest Seal above the knights’ chest", "Past the arena, go up and along to the end: a Geo chest holds 650 Geo, and a Hallownest Seal waits on the ledge above it.", { requires: ["boss-watcher-knights"] }],
        ["dreamer-lurien", ["dreamer"], "Reach Lurien above the Watcher Knights", "Leave by the opening in the middle of the ceiling and ride the lift to the top of the tower. Dream Nail Lurien’s body, strike him in the dream, then Focus to break his seal. On the way back, Lemm is by the fountain square again, at his shop or at the memorial, if you want to sell this chapter’s later relics.", { requires: ["boss-watcher-knights"] }],
      ],
    },
    {
      title: "The Seer’s egg",
      location: "Resting Grounds",
      sources: [["fextralife · the Seer’s rewards", `${fxl}Seer`], ["Wiki · Arcane Egg: the Seer at 1,200 Essence", "https://hollowknight.wiki/w/Arcane_Egg"]],
      rows: [
        ["arcane-egg-seer", ["arcane-egg"], "Take the Seer’s Arcane Egg at 1,200 Essence", "Ride the Stag from King’s Station to the Resting Grounds and climb to the Seer: the Kingdom’s Edge Root and Markoth have taken you past 1,200 Essence, and at 1,200 she gives an Arcane Egg."],
      ],
    },
  ],
} satisfies RawChapter;

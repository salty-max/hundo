import type { RawChapter } from "@hundo/core/types";

const steam = "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947";
const fxlPeak = "https://hollowknight.wiki.fextralife.com/Crystal+Peak";
const fxlRest = "https://hollowknight.wiki.fextralife.com/Resting+Grounds";
const fxlMound = "https://hollowknight.wiki.fextralife.com/Crystalised+Mound";
const gwPeak = "https://gamerwalkthroughs.com/hollow-knight/crystal-peak/";
const gwRest = "https://gamerwalkthroughs.com/hollow-knight/resting-grounds/";
const vgkPeak = "https://vgkami.com/walkthrough/hollow-knight/crystal-peak/";
const vgkRest = "https://vgkami.com/walkthrough/hollow-knight/resting-grounds/";
const ludoPeak = "https://www.ludo.guide/guide/hollow-knight/crystal-peak";
const ludoPeak2 = "https://www.ludo.guide/guide/hollow-knight/crystal-peak-part-2";
const ludoRest = "https://www.ludo.guide/guide/hollow-knight/resting-grounds";

export default {
  id: 4,
  title: "Crystal Peak and the Dream Nail",
  region: "Crystal Peak · Resting Grounds",
  teaser: "Crystal Peak",
  intro: "Back up through the Crossroads to Myla’s lift, dive into the mines and take the long dash from an old mining golem and Sly’s lost key. Loop back through Dirtmouth for his storeroom and the Lumafly Lantern, cross the dark to the Crystallised Mound, and drop into the Resting Grounds for the Dream Nail. Then over the Blue Lake and on to the City for Shade Soul.",
  sources: [["Steam guide ch 5–7, 11, 14 and 18 · Crystal Peak, the Resting Grounds, Shade Soul and the Crossroads returns", steam], ["fextralife · Crystal Peak, room by room", fxlPeak], ["fextralife · Resting Grounds", fxlRest], ["Wiki · Crystal Peak landmarks, access and the Crystallised Mound", "https://hollowknight.wiki/w/Crystal_Peak"], ["Wiki · Dream Nail and Seer rewards", "https://hollowknight.wiki/w/Dream_Nail"], ["Wiki · Resting Grounds landmarks", "https://hollowknight.wiki/w/Resting_Grounds"]],
  groups: [
    {
      title: "Up the Storerooms lift and through the Crossroads",
      location: "Forgotten Crossroads",
      sources: [["Steam guide ch 11 · the elevator toll and the fragment past the spiked hole", steam], ["Steam guide ch 18 · the shard through the first Goam room’s ceiling and the Seal halfway up the well", steam], ["fextralife · the Grubfather’s rewards", "https://hollowknight.wiki.fextralife.com/Grubfather"], ["fextralife · the well’s Hallownest Seal needs the Mantis Claw", "https://hollowknight.wiki.fextralife.com/Hallownest+Seal"], ["fextralife · the Goam room shard needs the Mantis Claw", "https://hollowknight.wiki.fextralife.com/Mask+Shard"], ["fextralife · Relic Seeker Lemm, in the City of Tears", "https://hollowknight.wiki.fextralife.com/Relic+Seeker+Lemm"], ["ludo.guide · the fragment off the elevator", "https://www.ludo.guide/guide/hollow-knight/forgotten-crossroads-part-2"], ["Wiki · Mask Shard locations", "https://hollowknight.wiki/w/Mask_Shard_(Hollow_Knight)"]],
      rows: [
        ["route-city-lift", ["route"], "Open the Crossroads–City elevator", "At the City Storerooms, go into the room on the left of the station and pay 150 Geo at the toll machine beside the journal’s hut to unlock the elevator. Ride it up: it comes out in the Crossroads down and left of the room of Leaping Husks below the Stag Station."],
        ["vessel-fragment-crossroads-lift", ["vessel-fragment"], "Take the Vessel Fragment by the City elevator", "Step off the elevator and head left. One room along, fall through the hole ringed with spikes and carry on left to the fragment; a shortcut there takes you back up.", { requires: ["route-city-lift"] }],
        ["mask-shard-goams", ["mask-shard"], "Take the Mask Shard above the first Goam room", "Go back right past the elevator to the room below the Stag Station’s tall room, then left into the Goam rooms. In the first of them, by the Aspid arena, climb through the gap in its ceiling and follow the passage to the shard."],
        ["charm-grubsong", ["charm"], "Claim Grubsong at ten rescues", "Carry on west through the Aspid arena and Cornifer’s old room into the main shaft, and up its top-left exit to the Grubfather. Chapters 1 to 3 freed thirteen Grubs: Grubsong is his gift for the tenth, and the eleventh to thirteenth pay 90, 100 and 110 Geo. He pays on how many you’ve freed, not which ones. His next gift, at sixteen, comes later."],
        ["hallownest-seal-well", ["hallownest-seal"], "Climb the well for its Hallownest Seal", "Go right from the shaft to the foot of the well. Jump back up into its shaft and climb its left wall halfway to a secret room with a Hallownest Seal, a relic Lemm in the City buys. Then climb on up into Dirtmouth."],
      ],
    },
    {
      title: "Dirtmouth and Salubra",
      location: "Forgotten Crossroads",
      note: "Keep 1,800 Geo for the Lumafly Lantern: this chapter needs it before the Crystallised Mound, and you’ll pass Sly again mid-chapter to buy it. Salubra’s dearer charms can wait; set aside what you can’t afford, and it comes back the next time the route is in the Forgotten Crossroads.",
      sources: [["Steam guide ch 5 · Salubra on the way to Crystal Peak", steam], ["Steam guide ch 25 · Bretta’s house", steam], ["gamerwalkthroughs · Salubra after the City", "https://gamerwalkthroughs.com/hollow-knight/city-of-tears/"], ["fextralife · Salubra’s stock, prices and notches", "https://hollowknight.wiki.fextralife.com/Charm+Lover+Salubra"], ["Wiki · Salubra’s stock and prices", "https://hollowknight.wiki/w/Charm_Lover_Salubra"], ["Wiki · Charm Notch list", "https://hollowknight.wiki/w/Charms"], ["Wiki · Mask Shard locations", "https://hollowknight.wiki/w/Mask_Shard_(Hollow_Knight)"]],
      rows: [
        ["mask-shard-bretta", ["mask-shard"], "Take the Mask Shard in Bretta’s house", "With Bretta rescued from the Fungal Wastes, her house in Dirtmouth stands open: the shard is inside.", { place: "Dirtmouth", requires: ["quest-bretta-rescue"] }],
        ["charm-lifeblood-heart", ["charm"], "Buy Lifeblood Heart from Salubra", "Ride the Stag down to the Crossroads, go down the station’s tall room and right through the Gruz Mother’s arena, and up to Salubra’s hut. Pay her 250 Geo for Lifeblood Heart."],
        ["charm-longnail", ["charm"], "Buy Longnail from Salubra", "Pay Salubra 300 Geo. It lengthens your nail’s reach."],
        ["charm-steady-body", ["charm"], "Buy Steady Body from Salubra", "Pay Salubra 120 Geo."],
        ["charm-shaman-stone", ["charm"], "Buy Shaman Stone from Salubra", "Pay Salubra 220 Geo. It makes your spells stronger."],
        ["charm-quick-focus", ["charm"], "Buy Quick Focus from Salubra", "Pay Salubra 800 Geo."],
        ["notch-salubra-five", ["notch"], "Buy Salubra’s five-charm Notch", "Own at least 5 charms, then buy the first notch for 120 Geo."],
        ["notch-salubra-ten", ["notch"], "Buy Salubra’s ten-charm Notch", "Own at least 10 charms, then buy the next notch for 500 Geo."],
      ],
    },
    {
      title: "Myla’s lift and the drop into the mines",
      location: "Forgotten Crossroads · Crystal Peak",
      note: "The dive is a one-way door: there’s no climbing back to Myla until later this chapter, and the toll gate out needs the Lantern. Two benches inside keep it safe.",
      sources: [["Steam guide ch 5 · Myla, the mining floor, the toll gate, the conveyors and the first bench", steam], ["ludo.guide · the Glimbacks, hit from the front", "https://www.ludo.guide/guide/hollow-knight/forgotten-crossroads-part-2"], ["fextralife · the egg off the drop and the one on the flipping platforms", fxlPeak], ["gamerwalkthroughs · Crystal Peak, the Bluggsac as you fall", gwPeak], ["ludo.guide · the conveyors and the first bench", ludoPeak], ["VGKami · Crystal Peak", vgkPeak], ["Wiki · the toll gate and the Lumafly Lantern", "https://hollowknight.wiki/w/Crystal_Peak"]],
      rows: [
        ["route-peak-entry", ["route"], "Break the mining floor above the Crossroads", "Back in the Stag Station’s tall room, climb to its lever shortcut and keep right to Myla, who has new lines. Ride the lift above her to the top and, in the next room, break the shaking floor with Desolate Dive to drop into Crystal Peak. As you fall, dash right onto a ledge for a Rancid Egg. A door on the left just below where you land leads to a 50 Geo toll gate back to the Crossroads; its machine won’t take your Geo until you carry the Lumafly Lantern.", { requires: ["spell-desolate-dive"] }],
        ["route-peak-bench", ["route"], "Cross the conveyors to the first mine bench", "Go east across the conveyor belts, minding which way each runs; hit the Glimbacks from the front. The first bench is through a door at the bottom right. From the bench room, go on into the next room, climb, and go west into a room of metal platforms that flip into crystal spikes a moment after you land on them: a Rancid Egg waits on the top ones. Then come back to the bench."],
      ],
    },
    {
      title: "The climb to Cornifer, the key and the Guardian",
      location: "Crystal Peak",
      sources: [["Steam guide ch 5 · the conveyor Grub, the laser room, Cornifer, the key and Quirrel’s hall", steam], ["fextralife · the climb, Cornifer’s room top left, the key and the Guardian", fxlPeak], ["fextralife · Crystal Guardian", "https://hollowknight.wiki.fextralife.com/Crystal+Guardian"], ["ludo.guide · the pistons room off the laser room, Cornifer and the key", ludoPeak], ["gamerwalkthroughs · the Guardian’s 385 Geo and how to fight him", gwPeak], ["VGKami · the key and Quirrel’s deck", vgkPeak], ["Wiki · Cornifer’s Crystal Peak map price", "https://hollowknight.wiki/w/Cornifer"], ["Wiki · Shopkeeper’s Key", "https://hollowknight.wiki/w/Shopkeeper%27s_Key"], ["Wiki · Crystal Guardian", "https://hollowknight.wiki/w/Crystal_Guardian"], ["Wiki · Grub locations", "https://hollowknight.wiki/w/Grub"]],
      rows: [
        ["grub-peak-conveyors", ["grub"], "Free the Grub at the top of the conveyor shaft", "Back west from the bench, climb into a room of upright conveyors and spiked walls. The jar sits at the top of the middle conveyor: ride it up and dash through the spike gaps near the top without steering. The lever beside the jar opens the way into the room above."],
        ["grub-peak-pistons", ["grub"], "Free the Grub above the piston room", "Above, Crystal Crawlers creep along the walls and fire lasers on a beat; only spells hurt them, so move between bursts. Take this laser room’s right exit into a room of crushers: dash through each gap as they pull back to the jar at the top. The lever behind it stops them and opens a gate into the room below, for later."],
        ["map-crystal-peak", ["map"], "Buy Cornifer’s Crystal Peak map", "Back in the laser room, follow Cornifer’s papers out its top-left exit and pay him 112 Geo; buy it as you pass, since he won’t be here for good. A Husk Miner chips at the laser room’s left wall: break it, but the crystal cave beyond waits for this chapter’s Crystal Heart, and so does a gap west of Cornifer. A ledge above him needs a later ability (chapter 5)."],
        ["pickup-shopkeepers-key", ["pickup"], "Recover Sly’s Shopkeeper’s Key", "Go back into the laser room and out its top. Climb around the left side clear of the lasers, cross to the tall shaft on the right and climb it: the key waits at the top. Sly wants it back in Dirtmouth.", { gives: "Shopkeeper’s Key" }],
        ["boss-crystal-guardian", ["boss", "other-boss"], "Defeat the Crystal Guardian on the central bench", "Right of the key room, in the shack room at the centre of the mines, the Guardian sits slumped on the bench and stops you resting. Hit him to start. A thin line of light marks every beam before it fires: step off his aimed laser, then jump behind him and strike while he fires; when he shouts, beams drop from the ceiling. Vengeful Spirit from a distance works too. Beaten, he leaps out of reach, leaving 385 Geo, and the bench is yours. The room above him waits for a later ability (chapter 9)."],
      ],
    },
    {
      title: "The tall room and Crystal Heart",
      location: "Crystal Peak",
      sources: [["Steam guide ch 5 · the journal, the gates, the Heart and its Grub", steam], ["fextralife · the tall room’s levers and the dive-floor egg", fxlPeak], ["fextralife · Crystal Heart’s controls", "https://hollowknight.wiki.fextralife.com/Crystal+Heart"], ["gamerwalkthroughs · the journal, the two gates and the Heart", gwPeak], ["ludo.guide · the Heart cavern and the bridge that falls", ludoPeak], ["VGKami · the journal, the bridge and the crusher room’s chest", vgkPeak], ["fextralife · a crusher conveyor to a chest", fxlMound], ["Wiki · Grub locations", "https://hollowknight.wiki/w/Grub"]],
      rows: [
        ["wanderers-journal-peak-crawlers", ["wanderers-journal"], "Take the Wanderer’s Journal in the tall room’s laser pocket", "Go back into the key room and climb out its top into a hall: Quirrel stands on a deck on its left, looking out over Dirtmouth. Go right from the hall and drop into the first opening on the right, a tall room. Follow the Crawlers’ lasers round anticlockwise into the middle pocket: a Wanderer’s Journal lies at its top left by a corpse. In the room to the left, a shaking floor gives way to Desolate Dive, down to a Rancid Egg that two Crystal Hunters guard."],
        ["equipment-crystal-heart", ["equipment"], "Collect Crystal Heart", "Pull the tall room’s levers as you go: one opens a shortcut at its bottom, another down the right-hand shaft opens the way on. Its upper-right exit needs a later ability (chapter 5). Out to the right is a cavern of conveyors, turning platforms, spikes overhead and beams from the ceiling crystals, with two Soul Totems on the way; move between bursts. The Heart is inside a broken mining golem at the end of a wooden bridge, and taking it drops the bridge behind you, so your first super dash is the way back. It has its own button: hold it on the ground or on a wall, let go, and you fly straight ahead until you hit something; jump or press it again to stop.", { gives: "Crystal Heart" }],
        ["grub-peak-heart", ["grub"], "Free the Grub across the gap in the Crystal Heart cavern", "This jar sits high across a gap in the cavern. With the Heart, go back to the cavern’s left exit, climb the wall above it and launch the dash while you cling there.", { requires: ["equipment-crystal-heart"] }],
        ["grub-peak-lower-gate", ["grub"], "Free the Grub by the lower Crystal Peak gate", "Back in the tall room, drop through the opening in its floor into a room of crushers and conveyors. Dash past them on the way down; a lever turns them off, and a Geo chest there holds 80 Geo. At the bottom, drop again into a corner of the mining site where a jar waits behind a gate; pull the lever beside the jar to open it."],
      ],
    },
    {
      title: "The loop west",
      location: "Crystal Peak",
      sources: [["Steam guide ch 12 · Deep Focus and the mimic Grub", steam], ["fextralife · Deep Focus, the mimic Grub and the lift after the Heart", fxlPeak], ["gamerwalkthroughs · Deep Focus, the mimic and the lift to Dirtmouth", gwPeak], ["ludo.guide · the geode, the mimic and the lever that unlocks the lift", ludoPeak], ["Wiki · Deep Focus", "https://hollowknight.wiki/w/Deep_Focus"]],
      rows: [
        ["charm-deep-focus", ["charm"], "Collect Deep Focus behind the mine wall", "From the lower gate’s corner, the mining site leads left back to the first bench and the conveyor room. Climb back to the laser room, go through the Husk Miner’s broken wall and super dash along the crystal cave, launching between the beams, into the geode: the charm lies at the bottom, and a conveyor carries you back up.", { requires: ["equipment-crystal-heart"] }],
        ["grub-peak-mimic", ["grub"], "Free the real Grub behind the Crystal Peak mimic", "Go on to Cornifer’s room and super dash across the gap west of it. Near the far end, take the way down past two Crystal Hunters: the jar at the bottom holds a mimic that attacks when freed. The real jar is behind the breakable wall beside it.", { requires: ["equipment-crystal-heart"] }],
        ["route-dirtmouth-lift", ["route"], "Open the Crystal Peak lift back to Dirtmouth", "Back up and left, hit the lever that unlocks the mine lift, and ride it down to Dirtmouth. From then on it runs between Dirtmouth and Crystal Peak.", { requires: ["equipment-crystal-heart"] }],
      ],
    },
    {
      title: "Sly’s storeroom and the Lantern",
      location: "Dirtmouth",
      note: "Buy the Lantern first: the next section needs it. The Elegant Key opens a door in the City at this chapter’s end, and you pass Dirtmouth again before then. The rest of Sly’s storeroom can wait: set it aside and it comes back the next time you’re in Dirtmouth.",
      sources: [["Steam guide ch 7 · Sly’s storeroom", steam], ["fextralife · Sly’s storeroom stock", "https://hollowknight.wiki.fextralife.com/Sly"], ["ludo.guide · Sly’s and Iselda’s stock", "https://www.ludo.guide/guide/hollow-knight/npcs-2"], ["Wiki · Lumafly Lantern", "https://hollowknight.wiki/w/Lumafly_Lantern"], ["Wiki · Sly’s storeroom and the Elegant Key", "https://hollowknight.wiki/w/Sly"], ["Wiki · Mask Shard locations", "https://hollowknight.wiki/w/Mask_Shard_(Hollow_Knight)"]],
      rows: [
        ["quest-sly-key", ["quest"], "Give the Shopkeeper’s Key to Sly", "In Dirtmouth, hand Sly the key from Crystal Peak. His storeroom stock opens up: the Elegant Key, Heavy Blow, Sprintmaster, his last two Mask Shards and his second Vessel Fragment.", { requires: ["pickup-shopkeepers-key"] }],
        ["pickup-lantern", ["pickup"], "Buy the Lumafly Lantern from Sly", "Buy the Lumafly Lantern for 1,800 Geo. Short of it? The relics you carry sell to Lemm in the City: ride the Stag to the City Storerooms, walk down to him and come back. The dark room before the Crystallised Mound is close to pitch black without it, and it pays the toll gate back into the mines. Much of Deepnest is dark too (chapter 6), and a dream fight in a dark shrine later can’t be started without it.", { gives: "Lumafly Lantern" }],
        ["pickup-elegant-key", ["pickup"], "Buy the Elegant Key from Sly", "Buy the Elegant Key for 800 Geo: it opens a door in the City of Tears at this chapter’s end.", { gives: "Elegant Key", requires: ["quest-sly-key"] }],
        ["charm-heavy-blow", ["charm"], "Buy Heavy Blow from Sly", "Once his storeroom is open, Heavy Blow costs 350 Geo."],
        ["charm-sprintmaster", ["charm"], "Buy Sprintmaster from Sly", "After the Shopkeeper’s Key, pay 400 Geo at the expanded shop."],
        ["mask-shard-sly-third", ["mask-shard"], "Buy Sly’s third Mask Shard", "With his key returned and his first two shards bought, the third costs 800 Geo."],
        ["mask-shard-sly-fourth", ["mask-shard"], "Buy Sly’s fourth Mask Shard", "After the third shard, pay 1,500 Geo for his last one."],
        ["vessel-fragment-sly-second", ["vessel-fragment"], "Buy Sly’s second Vessel Fragment", "With his key returned and his first fragment bought, the second costs 900 Geo."],
      ],
    },
    {
      title: "Through the dark to the Crystallised Mound",
      location: "Crystal Peak",
      sources: [["Steam guide ch 5 · the dark room, the chasm and the Mound", steam], ["fextralife · the toll gate’s second path in", fxlPeak], ["ludo.guide · past the toll, the Glimbacks and the wall", "https://www.ludo.guide/guide/hollow-knight/forgotten-crossroads-part-2"], ["fextralife · the Crystallised Mound, its floor and the shaman", fxlMound], ["gamerwalkthroughs · the chasm and the Mound’s dive floor", gwPeak], ["ludo.guide · the Mound’s Grub and the shaman", ludoPeak2], ["VGKami · the dark room, the chasm and the Mound", vgkPeak], ["Wiki · Descending Dark", "https://hollowknight.wiki/w/Descending_Dark"], ["Wiki · Grub locations", "https://hollowknight.wiki/w/Grub"]],
      rows: [
        ["route-peak-toll", ["route"], "Go back into the mines by the toll gate", "Ride the Stag to the Crossroads. A door on the right side of the station’s tall room leads through a dark room to the toll machine: with the Lantern, pay 50 Geo and go through. You come out by the door below where you first dropped into the mines. Drop down past the Glimbacks, go right, break the wall in your way, and cross the conveyors east to the first bench. Rest, then go east through the mining site to the dark room beyond, where Crystal Hunters and a Glimback wait in the Lantern’s light.", { requires: ["pickup-lantern"] }],
        ["grub-peak-mound", ["grub"], "Free the Grub in the Crystallised Mound", "Beyond the dark room, a Soul Totem stands by a door across a chasm. Cross the ledges past the Crystal Hunters and launch Crystal Heart from the last one straight at the door; if you fall, the chasm drops you into the Resting Grounds: open its Stag Station (next section), ride to the Crossroads and come back in by the toll gate. Inside the Crystallised Mound, break the floor just inside with Desolate Dive, then the wooden barricade, and climb the platforms past Crystal Hunters to the jar in the top-right corner.", { requires: ["pickup-lantern", "equipment-crystal-heart"] }],
        ["spell-descending-dark", ["spell"], "Find Descending Dark in the Crystallised Mound", "Back down on the left, cling to the wall, break the wooden floor with your nail and strike the Snail Shaman sealed in crystal: Desolate Dive becomes Descending Dark.", { requires: ["pickup-lantern", "equipment-crystal-heart"] }],
      ],
    },
    {
      title: "The Resting Grounds and the Dream Nail",
      location: "Resting Grounds",
      sources: [["Steam guide ch 6 and 11 · the dais, the Dream Nail, the Seer, Xero and her first gift", steam], ["fextralife · Resting Grounds, the dream and the Root", fxlRest], ["fextralife · Xero", "https://hollowknight.wiki.fextralife.com/Xero"], ["fextralife · the Seer’s rewards", "https://hollowknight.wiki.fextralife.com/Seer"], ["gamerwalkthroughs · the moth, Xero and the Seer’s Seal", gwRest], ["ludo.guide · Xero’s nails coming back, and healing below him", "https://www.ludo.guide/guide/hollow-knight/resting-grounds-part-2"], ["VGKami · the Root, Xero, the Seal and Cornifer’s note", vgkRest], ["ludo.guide · the dream, the Root and Dreamshield", ludoRest], ["Wiki · Xero", "https://hollowknight.wiki/w/Xero"], ["Wiki · Dreamshield", "https://hollowknight.wiki/w/Dreamshield"], ["Wiki · Stag tolls", "https://hollowknight.wiki/w/Fast_Travel_(Hollow_Knight)"]],
      rows: [
        ["dream-milestone-dream-nail", ["dream-milestone"], "Receive the Dream Nail in the Resting Grounds", "Leave the Mound to the left and drop into the chasm: you land at the Resting Grounds’ west end, by a grave on a raised platform. Go right to the raised dais with three statues and examine its tablet. In the dream, walk right to the edge, wait for the moth and follow it across the platforms: it hands you the Dream Nail. You wake in the Seer’s room. Talk to her: from now on she rewards the Essence you gather.", { gives: "Dream Nail" }],
        ["root-resting", ["root"], "Clear the Resting Grounds Root", "One level down the tall shaft outside her door, a Whispering Root grows. Strike it with the Dream Nail: its Essence scatters as floating motes around it. Gather all 20.", { requires: ["dream-milestone-dream-nail"] }],
        ["warrior-dream-xero", ["warrior-dream"], "Defeat Xero in the western Resting Grounds", "Back west, the grave on the raised platform where you landed is Xero’s. Dream Nail him or speak to his spirit to start. He throws two nails, then four and faster once he’s about half down, and they still hurt as they fly back to him; heal underneath him. Speak to him again after the win for 100 Essence.", { requires: ["dream-milestone-dream-nail"] }],
        ["hallownest-seal-seer", ["hallownest-seal"], "Claim the Seer’s Hallownest Seal at 100 Essence", "With the Root’s 20 and Xero’s 100, go back up to the Seer: at 100 Essence she gives you a Hallownest Seal.", { requires: ["warrior-dream-xero"] }],
        ["charm-dreamshield", ["charm"], "Collect Dreamshield below the Seer", "Below the Seer’s room, take the corridor off the tall shaft, opposite the Stag Station, to the pedestal that holds the charm."],
        ["stag-resting-grounds", ["stag"], "Open the Resting Grounds Stag Station", "Across the shaft is the Stag Station. There’s no fee: pull the big lever on the floor to open it. Cornifer has left only a note here; this is the one area he never maps."],
      ],
    },
    {
      title: "The crypt",
      location: "Resting Grounds",
      sources: [["Steam guide ch 14 · the crypt’s Grub, chest, journal, Soul Eater and Seal, and the way west", steam], ["fextralife · the crypt and the lever up to Xero’s grave", fxlRest], ["gamerwalkthroughs · the grave you dive, the chest and the nook", gwRest], ["VGKami · the collapsing floors, the journal and Soul Eater", vgkRest], ["ludo.guide · the crypt and the Seal behind its west ceiling", "https://www.ludo.guide/guide/hollow-knight/resting-grounds-part-2"], ["Wiki · Soul Eater", "https://hollowknight.wiki/w/Soul_Eater"], ["Wiki · Grub locations", "https://hollowknight.wiki/w/Grub"]],
      rows: [
        ["grub-resting-crypt", ["grub"], "Free the Grub hidden in the Resting Grounds crypt ceiling", "At the foot of the tall shaft, break the cracked grave on the right with a dive and drop into the crypt. Break the wall right of where you land, then the ceiling a little further on: the jar is in the hidden space above."],
        ["wanderers-journal-resting-crypt", ["wanderers-journal"], "Take the Wanderer’s Journal from the crypt’s hidden nook", "Further east, a Geo chest with 150 Geo sits by a wall you break to go on; the cracked ceiling above it leads to a house and a bench (chapter 8). Past the wall, floors give way over spikes. After the second drop and one more trap floor, a small hidden nook holds an Entombed Husk and, inside, a Wanderer’s Journal."],
        ["charm-soul-eater", ["charm"], "Collect Soul Eater in the Resting Grounds crypt", "From the nook’s entrance, jump up and break the ceiling: the charm lies beside a Snail Shaman’s sarcophagus."],
        ["hallownest-seal-resting-crypt", ["hallownest-seal"], "Take the Hallownest Seal behind the crypt’s west ceiling", "From the nook, make your way back west to below where you first dropped in, and keep left to a cracked ceiling. Break up through it, then through the cracked walls that lead back right, past Belflies and floors that collapse, to a Hallownest Seal."],
        ["route-crypt-west", ["route"], "Leave the crypt to the west", "Break the wall on the crypt’s left into a lift room: the lift goes down to the City’s east side (chapter 7). Keep west past a Great Husk Sentry and a Winged Sentry to a lever at the upper left: it opens the floor up to Xero’s grave, a shortcut. West again lies the Blue Lake."],
      ],
    },
    {
      title: "Over the Blue Lake to Salubra",
      location: "Forgotten Crossroads",
      sources: [["Steam guide ch 11 · the Blue Lake and the Glowing Womb", steam], ["Steam guide ch 1 · the exit on the left above the station, toward the False Knight", steam], ["fextralife · Blue Lake", "https://hollowknight.wiki.fextralife.com/Blue+Lake"], ["gamerwalkthroughs · across the Blue Lake to Dirtmouth", gwRest], ["Wiki · Salubra’s notches", "https://hollowknight.wiki/w/Charm_Lover_Salubra"], ["Wiki · Glowing Womb", "https://hollowknight.wiki/w/Glowing_Womb"]],
      rows: [
        ["route-blue-lake", ["route"], "Cross the Blue Lake", "Cross the Blue Lake to the west, to the hidden passage at its far side: it drops you beside Salubra’s hut in the Crossroads."],
        ["notch-salubra-eighteen", ["notch"], "Buy Salubra’s eighteen-charm Notch", "Once you own 18 charms, buy her third notch for 900 Geo, and anything of hers you set aside earlier."],
        ["charm-glowing-womb", ["charm"], "Collect Glowing Womb in the upper Crossroads", "Go back through the Gruz Mother’s arena to the Stag Station’s tall room and take its exit on the left, above the station’s door, toward the False Knight’s hall. In the ceiling corner above the Husk Guard, break it if you didn’t in chapter 1 and climb in: Crystal Heart carries you through the spiked tunnel above. In the room beyond, beat the waves of Aspids and take the charm from the body of a giant Aspid Mother in the top-right corner.", { requires: ["equipment-crystal-heart"] }],
      ],
    },
    {
      title: "Back through Dirtmouth",
      location: "Dirtmouth",
      note: "Anything you set aside at Sly’s comes back here: the Elegant Key, at least, before the City.",
      sources: [["Steam guide ch 7 · Iselda’s Resting Grounds map", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"], ["fextralife · Iselda’s Resting Grounds map", "https://hollowknight.wiki.fextralife.com/Iselda"], ["ludo.guide · the Resting Grounds map in Dirtmouth", ludoRest], ["Wiki · Iselda", "https://hollowknight.wiki/w/Iselda"]],
      rows: [
        ["map-resting-grounds", ["map"], "Buy the Resting Grounds map from Iselda", "Ride the Stag from the Crossroads to Dirtmouth. Cornifer never maps the Resting Grounds, so buy its map from Iselda: 75 Geo."],
      ],
    },
    {
      title: "Shade Soul and Lemm",
      location: "City of Tears",
      sources: [["Steam guide ch 7 · the Skyway shaft, Shade Soul and the way down to Lemm", steam], ["fextralife · Shade Soul", "https://hollowknight.wiki.fextralife.com/Shade+Soul"], ["fextralife · Relic Seeker Lemm", "https://hollowknight.wiki.fextralife.com/Relic+Seeker+Lemm"], ["Wiki · Shade Soul", "https://hollowknight.wiki/w/Shade_Soul"], ["Wiki · the City of Tears Root near the Storerooms", "https://hollowknight.wiki/w/City_of_Tears"]],
      rows: [
        ["root-city", ["root"], "Clear the City of Tears Root", "Ride the Stag from Dirtmouth to the City Storerooms and go down into the room of hanging platforms where you found the Simple Key: its Whispering Root grows in that room. Strike it and gather its 28 Essence.", { requires: ["dream-milestone-dream-nail"] }],
        ["spell-shade-soul", ["spell"], "Use the Elegant Key to learn Shade Soul", "Go east to the Skyway bench, back through its broken wall into the lift shaft and up to the top, where the Elegant Key opens an ornate locked door. Beat the Soul Warrior inside, who keeps calling Follies, then go up a floor to the Snail Shaman bound to a table and examine her: Vengeful Spirit becomes Shade Soul.", { requires: ["pickup-elegant-key"] }],
        ["route-shade-soul-lemm", ["route"], "Go down to Lemm and sell", "The lever there opens a gate: go down through the tower, dropping past the second lift instead of riding it, hit the lever at the bottom, drop again and go right to Lemm. If you’ve sold nothing since chapter 3’s visit, the seven relics you carry pay 2,400 Geo."],
      ],
    },
  ],
} satisfies RawChapter;

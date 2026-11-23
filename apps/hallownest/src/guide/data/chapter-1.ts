import type { RawChapter } from "@hundo/core/types";

const steam = "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947";

export default {
  id: 1,
  title: "The Well and the Forgotten Crossroads",
  region: "King’s Pass · Dirtmouth · Forgotten Crossroads",
  teaser: "Dirtmouth",
  intro: "Break into Dirtmouth and go down its well. In the Forgotten Crossroads, buy the map, open the Stag Station, wake the lost shopkeeper, beat the False Knight and learn the spell that clears the road west.",
  sources: [
    ["Steam guide ch 1–2 · opening route, Crossroads, Sly, False Knight, Vengeful Spirit", steam],
    ["Wiki · Forgotten Crossroads landmarks and the Ancestral Mound", "https://hollowknight.wiki/w/Forgotten_Crossroads"],
    ["fextralife · Forgotten Crossroads, room by room", "https://hollowknight.wiki.fextralife.com/Forgotten+Crossroads"],
    ["gamerwalkthroughs · Forgotten Crossroads walkthrough", "https://gamerwalkthroughs.com/hollow-knight/forgotten-crossroads/"],
    ["VGKami · Forgotten Crossroads walkthrough", "https://vgkami.com/?p=35640"],
  ],
  groups: [
    {
      title: "King’s Pass",
      location: "King’s Pass",
      note: "Once you drop into Dirtmouth there’s no climbing back up here until a later ability (chapter 3), so take what you want on the way through.",
      sources: [["Steam guide ch 1 · the first Geo deposit, the cocoon, Fury and the gate", steam], ["fextralife · King’s Pass", "https://hollowknight.wiki.fextralife.com/King's+Pass"], ["ludo.guide · King’s Pass", "https://www.ludo.guide/guide/hollow-knight/king-s-pass"], ["Wiki · Fury of the Fallen’s spike room", "https://hollowknight.wiki/w/Fury_of_the_Fallen"], ["Steam guide ch 14 · climbing Dirtmouth’s left cliff back into the pass", steam]],
      rows: [
        ["route-pass-start", ["route"], "Find your feet in King’s Pass", "Before you head right, step left from where you start: a hidden pocket there holds the game’s first Geo deposit. Hit it until it’s spent. Then go right, breaking the barriers in your way; read the glowing tablet halfway up: it explains Focus, how you heal with the Soul you gain by striking enemies. At the top of the second climb, a Lifeblood Cocoon on the left bursts into Lifeseeds when you break it: kill them for two blue masks that sit on top of your own until you lose them. Carry on until the floor collapses under you."],
        ["charm-fury-of-the-fallen", ["charm"], "Take Fury of the Fallen from King’s Pass", "Past the collapse, the road forks over spikes. Take the lower branch: a spike bed too wide to jump blocks it, so strike down at the spikes in mid-air to bounce across. Drop into the hidden room past its end and open the chest."],
        ["route-pass", ["route"], "Break through King’s Pass", "Make your way back around to the fork and take the upper branch this time, to the large gate at its end. Hit it until it gives way, then drop down into Dirtmouth."],
      ],
    },
    {
      title: "Dirtmouth",
      location: "Dirtmouth",
      sources: [["Steam guide ch 1 · Elderbug, the bench and the well", steam], ["fextralife · Dirtmouth", "https://hollowknight.wiki.fextralife.com/Dirtmouth"], ["ludo.guide · Dirtmouth", "https://www.ludo.guide/guide/hollow-knight/dirtmouth-the-fading-town"], ["Wiki · Elderbug", "https://hollowknight.wiki/w/Elderbug"], ["Wiki · Iselda’s shop", "https://hollowknight.wiki/w/Iselda"], ["Wiki · Sly’s rescue and shop", "https://hollowknight.wiki/w/Sly"], ["Wiki · Stag tolls and the Dirtmouth station", "https://hollowknight.wiki/w/Fast_Travel_(Hollow_Knight)"]],
      rows: [
        ["quest-elderbug", ["quest"], "Speak to Elderbug at the Dirtmouth bench", "Elderbug sits by the first bench you reach in town. Rest there and hear him out; he has views on the places you’ve been."],
        ["route-dirtmouth-well", ["route"], "Go down the well", "Most of the town is shut for now. Iselda’s map shop opens once you’ve met her husband Cornifer below, and Sly’s shop once you’ve found him, both in this chapter; the Stag Station opens the first time a Stag brings you here. Walk right through town to the well and drop down it into the Forgotten Crossroads."],
      ],
    },
    {
      title: "Down the well to Cornifer and the Aspid arena",
      location: "Forgotten Crossroads",
      note: "Rest at every bench you find: when you die, you wake at the last one you rested on, and your Geo stays with your shade where you fell. Go back and strike the shade to win the Geo back; die again before you do, and that Geo is gone.",
      sources: [["Steam guide ch 1 · Quirrel in the temple, and Geo lost with your shade", steam], ["Steam guide ch 18 · the Seal halfway up the well", steam], ["VGKami · the Geo deposit by the well", "https://vgkami.com/?p=35640"], ["Wiki · Quirrel at the Black Egg, and when he leaves", "https://hollowknight.wiki/w/Quirrel"], ["Steam guide ch 1 · the shaft, Cornifer, the Aspid lock-in and the Hot Springs", steam], ["Steam guide ch 18 · the Mawlek’s door and the acid passage", steam], ["gamerwalkthroughs · the Aspid lock-in, the hidden wall and the Hot Springs", "https://gamerwalkthroughs.com/hollow-knight/forgotten-crossroads/"], ["ludo.guide · the shaft, the Grub ledge and the leafy dead end", "https://www.ludo.guide/guide/hollow-knight/forgotten-crossroads"], ["fextralife · the Grubfather’s rewards", "https://hollowknight.wiki.fextralife.com/Grubfather"], ["Wiki · Cornifer’s humming, papers and prices", "https://hollowknight.wiki/w/Cornifer"], ["Wiki · Grub locations", "https://hollowknight.wiki/w/Grub"]],
      rows: [
        ["quest-quirrel-temple", ["quest"], "Meet Quirrel near the Black Egg", "Where the well drops you, go right first, into a vast temple built from an old shell: Quirrel stands inside, gazing at the Black Egg. Talk to him now, before you head west past the False Knight, which sends him on his way. Then come back out and take the road left. Halfway up the well’s left wall, out of reach for now, a secret room holds a Hallownest Seal: chapter 4 comes back for it."],
        ["route-crossroads-shaft", ["route"], "Drop down the Crossroads’ main shaft", "Go left from the foot of the well into a tall shaft of platforms and drop down it. Its exits are worth knowing, since you’ll be back for each. The first opening on the right has a Grub on a ledge you can’t reach yet (chapter 2). The top-left exit leads to the Grubfather, who pays you for every Grub you free: you’ll visit him on the way out. The leafy exit on the left is the road to Greenpath, and the shell curled at the far end of its bridge is an Elder Baldur your nail can’t hurt: it waits for the spell you learn at the end of this chapter. The cracked door below that exit leads to a hard optional boss: leave it for now, chapter 9 comes back for it."],
        ["map-crossroads", ["map"], "Buy Cornifer’s Crossroads map", "Cornifer is in the room under the shaft: follow his humming and the papers he leaves, and buy the map for 30 Geo. The gate on the room’s right stays shut until you open it from the far side at the end of this chapter. A map fills in only as you rest at benches, and only if you carry the Quill, which Iselda sells in Dirtmouth."],
        ["grub-crossroads-acid", ["grub"], "Free the Grub across Cornifer’s acid passage", "From Cornifer’s room, take the lower-left exit and follow the passage to the acid pool at its end; the jar waits across it, and no ability is needed. Leave the wall beyond the acid alone: getting under it needs a later ability (chapter 8). Go back to Cornifer’s room afterwards."],
        ["route-aspid-arena", ["route"], "Clear the Aspid arena and rest at the Hot Springs", "From Cornifer’s room, go down and right into a big room. Its gates shut as the Aspid Hunters arrive, one and then two more; they spit from a distance, so close in and cut them down. Once they’re dead, take the room’s upper-right exit to the Crossroads Hot Springs. Rest on the bench there, and sit in the spring to refill your Soul."],
      ],
    },
    {
      title: "The Stag Station, the Gruz Mother and Sly",
      location: "Forgotten Crossroads",
      sources: [["Steam guide ch 1 · the Goam rooms, the Stag Station sign, the Gruz Mother, Sly and the spike Grub", steam], ["Steam guide ch 18 · the shard through the first Goam room’s ceiling", steam], ["fextralife · the Goam room shard needs the Mantis Claw", "https://hollowknight.wiki.fextralife.com/Mask+Shard"], ["VGKami · the Goams and the hub room", "https://vgkami.com/?p=35640"], ["Wiki · Stag tolls", "https://hollowknight.wiki/w/Fast_Travel_(Hollow_Knight)"], ["Wiki · Mask Shard locations", "https://hollowknight.wiki/w/Mask_Shard_(Hollow_Knight)"], ["Wiki · Grub locations", "https://hollowknight.wiki/w/Grub"], ["gamerwalkthroughs · the Soul Totem before her and the Gruzzers", "https://gamerwalkthroughs.com/hollow-knight/forgotten-crossroads/"], ["fextralife · Sly", "https://hollowknight.wiki.fextralife.com/Sly"], ["Wiki · Gruz Mother", "https://hollowknight.wiki/w/Gruz_Mother"], ["Wiki · Sly’s rescue", "https://hollowknight.wiki/w/Sly"], ["Wiki · Salubra’s hut and how to reach it", "https://hollowknight.wiki/w/Charm_Lover_Salubra"]],
      rows: [
        ["stag-crossroads", ["stag"], "Open the Forgotten Crossroads Stag Station", "Go back into the arena and keep making your way right. Goams lunge from the floor and walls of the next rooms and can’t be killed: wait for each to pull back, then jump past. In the first of them, a passage up through the ceiling leads to a Mask Shard you can’t reach yet: chapter 4 comes back for it. Press on east to a sign pointing up and to the right, and follow it up the tall room it points into: the station is the first door on your left. Pay 50 Geo, ring for the Stag and rest on the bench."],
        ["boss-gruz-mother", ["boss", "percent-boss"], "Defeat the Gruz Mother", "Leave the station, go back down the tall room and on to the right, past the Leaping Husks and their Soul Totem, to a huge Gruz asleep in a small arena. Top up your Soul at the totem, then hit her to start the fight and stay clear of her charges and her floor-to-ceiling slams. When she dies her belly bursts into a swarm of Gruzzers: kill them all to open the way out, and pick up the 50 Geo she drops."],
        ["quest-sly-rescue", ["quest"], "Rescue Sly beyond the Gruz Mother", "Drop down from the Gruz Mother’s arena into the abandoned village below it. Only one house there stands open, and a dazed shopkeeper mutters inside. Talk to him until he comes to: he’s Sly, and he goes back to open his shop in Dirtmouth. A hut just right of the Gruz Mother’s arena, above the village, needs a later ability to reach (chapter 2)."],
        ["grub-crossroads-spikes", ["grub"], "Free the Grub above the spiked platforms", "From the village, climb back up through the arena into the room above it and take the room on its left. Bounce over the spiked platforms by striking down at them in mid-air to reach the jar, then keep going up and left past the shielded Husk warriors, back into the station’s tall room."],
      ],
    },
    {
      title: "The Aspid wall, Myla and the eastern loop",
      location: "Forgotten Crossroads",
      sources: [["Steam guide ch 1 · the lever shortcut, Myla and the Husk Guard’s Grub", steam], ["fextralife · Myla", "https://hollowknight.wiki.fextralife.com/Myla"], ["Wiki · Myla", "https://hollowknight.wiki/w/Myla"], ["Wiki · Grub locations", "https://hollowknight.wiki/w/Grub"]],
      rows: [
        ["grub-crossroads-aspids", ["grub"], "Free the Grub behind the Aspid wall", "As you come back into the station’s tall room, break the cracked wall just up and to your left: it hides two Aspid Hunters and a jar. Kill both and free it."],
        ["quest-myla-intro", ["quest"], "Visit Myla the miner", "Then climb the room and strike up at the lever on the underside of a platform higher up: it opens a shortcut. Go through it and hang right, and keep going right instead of up to find Myla, mining and singing. Talk to her; she has more to say on later visits."],
        ["grub-crossroads-husk", ["grub"], "Free the Grub guarded by the Husk Guard", "Back where the shortcut came out, go up instead, then right: a big Husk Guard stands guard over this jar. Beat him and free it, then go back down to the station’s tall room."],
      ],
    },
    {
      title: "Shopping in Dirtmouth",
      location: "Dirtmouth",
      note: "Chapter 1 can’t pay for all of this. Buy the Quill first, then what you can afford; set the rest aside and it comes back the next time you’re in Dirtmouth. Spend before the False Knight: Geo in your pocket is Geo you can lose.",
      sources: [["Steam guide ch 3 · the Quill and the Compass on the first ride back", steam], ["fextralife · Sly’s stock and prices", "https://hollowknight.wiki.fextralife.com/Sly"], ["fextralife · Iselda’s stock and prices", "https://hollowknight.wiki.fextralife.com/Iselda"], ["fextralife · Rancid Eggs and Sly’s one", "https://hollowknight.wiki.fextralife.com/Rancid+Egg"], ["Wiki · Stag tolls and the Dirtmouth station", "https://hollowknight.wiki/w/Fast_Travel_(Hollow_Knight)"], ["Wiki · Iselda’s shop and the Quill", "https://hollowknight.wiki/w/Iselda"], ["Wiki · Sly’s prices", "https://hollowknight.wiki/w/Sly"], ["Wiki · Mask Shard locations", "https://hollowknight.wiki/w/Mask_Shard_(Hollow_Knight)"]],
      rows: [
        ["stag-dirtmouth", ["stag"], "Unlock the Dirtmouth station door", "Ring for the Stag at the Crossroads station and ride up to Dirtmouth. Dirtmouth’s station opens only from the inside, so arriving this way unlocks it at no cost."],
        ["route-iseldas-shop", ["route"], "Buy the Quill from Iselda", "Iselda’s map shop is open now that you’ve met Cornifer. Buy the Quill for 120 Geo: without it your map never fills in. Her pins and markers only mark things on your map; this guide doesn’t count them."],
        ["charm-wayward-compass", ["charm"], "Buy Wayward Compass", "Buy from Iselda for 220 Geo. Equip it at a bench to see where you are on the map."],
        ["charm-gathering-swarm", ["charm"], "Buy Gathering Swarm", "Buy from Sly, now home in his shop, for 300 Geo. While it’s equipped, it collects loose Geo for you."],
        ["charm-stalwart-shell", ["charm"], "Buy Stalwart Shell", "Buy from Sly for 200 Geo."],
        ["mask-shard-sly-first", ["mask-shard"], "Buy Sly’s first Mask Shard", "Pay Sly 150 Geo."],
        ["mask-shard-sly-second", ["mask-shard"], "Buy Sly’s second Mask Shard", "After the first, pay 500 Geo for the next shard."],
        ["vessel-fragment-sly-first", ["vessel-fragment"], "Buy Sly’s first Vessel Fragment", "Pay Sly 550 Geo."],
        ["simple-key-sly", ["simple-key"], "Buy Sly’s Simple Key", "Sly’s Simple Key costs 950 Geo. Keep it for whichever key lock you want to open first. He also sells a Rancid Egg for 60 Geo, which counts for nothing but pays a later helper (chapter 9), and the Lumafly Lantern for 1,800, which chapter 6 needs."],
      ],
    },
    {
      title: "The False Knight and the first spell",
      location: "Forgotten Crossroads · Ancestral Mound",
      sources: [["Steam guide ch 1–2 · the corridor west, the False Knight, his chest, the mound and the lever", steam], ["gamerwalkthroughs · the False Knight’s phases, the fall through the floor, and the Shaman opening the gate", "https://gamerwalkthroughs.com/hollow-knight/forgotten-crossroads/"], ["VGKami · running under his leap and the fall through the floor", "https://vgkami.com/?p=35640"], ["fextralife · False Knight", "https://hollowknight.wiki.fextralife.com/False+Knight"], ["fextralife · Ancestral Mound, the loop and the Elder Baldur", "https://hollowknight.wiki.fextralife.com/Ancestral+Mound"], ["Wiki · False Knight’s slam, stagger and drops", "https://hollowknight.wiki/w/False_Knight"], ["Wiki · the Elder Baldur on Greenpath’s door", "https://hollowknight.wiki/w/Greenpath"]],
      rows: [
        ["boss-false-knight", ["boss", "percent-boss"], "Defeat False Knight", "Ride back down and rest at the Crossroads station’s bench. Leave the station’s tall room by the exit on the left, above the station’s door: in the corridor west, a Husk Guard stands under a ceiling corner you can break now to open a passage for later (chapter 9). In the large room beyond, climb its right side and cross left at the top into the arena. Jump the shockwave from each mace slam, run under him when he leaps, and hit his exposed head whenever his armour topples. After his third fall he smashes through the floor: drop after him and finish him below. Take the City Crest he leaves, then go through the arena’s gate and up to the left to open a Geo chest."],
        ["spell-vengeful-spirit", ["spell"], "Learn Vengeful Spirit from the Snail Shaman", "Keep left from the arena, then up the path into the Ancestral Mound. Rest at the bench inside, then talk to the Snail Shaman for the spell."],
        ["charm-soul-catcher", ["charm"], "Take Soul Catcher from the Ancestral Mound", "Taking the spell knocks you out, and you wake locked in. Break the barricade on the left for a Soul Totem and go round the loop past the rolling Baldurs; near its top, before the drop, a Lifeblood Cocoon gives two more blue masks. Below, an Elder Baldur holds the passage and curls up whenever you’re close: stand back and hit it with Vengeful Spirit as it opens. The spell spends Soul, as healing does, so strike the little Baldurs it spits to fill up again. Soul Catcher lies just left past it. Break the barrier beyond, drop back down to the Shaman and talk to her: she opens the gate."],
        ["route-goams", ["route"], "Open the road west to Greenpath", "Leave the mound, go down and left, and hit the lever: it opens the gate into Cornifer’s room, a shortcut back to the shaft. Climb the shaft to its top-left exit and visit the Grubfather: he pays Geo for each Grub you’ve freed, 10 for the first, 20 for the second, and more for each after. Then take the shaft’s leafy exit, cross the bridge and shoot the Elder Baldur with Vengeful Spirit until it dies. Greenpath lies beyond."],
      ],
    },
  ],
} satisfies RawChapter;

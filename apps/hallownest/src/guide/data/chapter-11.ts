import type { RawChapter } from "@hundo/core/types";

const steam = "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947";
const fxl = "https://hollowknight.wiki.fextralife.com/";
const sw = "https://scripterswar.com/hollowknight/map";
const troupe: [string, string] = ["fextralife · The Grimm Troupe quest", `${fxl}The+Grimm+Troupe+(Quest)`];
const grimmchild: [string, string] = ["Hollow Knight wiki · Grimmchild’s three sets of flames", "https://hollowknight.wiki/w/Grimmchild"];

export default {
  id: 11,
  title: "The Grimm Troupe and Colosseum",
  region: "Colosseum of Fools · City of Tears · Dirtmouth · across Hallownest",
  teaser: "Colosseum of Fools",
  intro: "With Grimmchild on, take the Colosseum’s first two trials, the last Nail upgrades and the Grimm Troupe’s flames across the kingdom, then the Trial of the Fool, Troupe Master Grimm, Divine and the Nightmare King. The chapter ends in Dirtmouth.",
  sources: [["Steam guide ch 11–29 · every flame, the Colosseum, the Nailsmith and the Troupe’s end", steam], troupe, ["Hollow Knight wiki · Colosseum of Fools: the way in, trial fees and rewards", "https://hollowknight.wiki/w/Colosseum_of_Fools"]],
  groups: [
    {
      title: "The mine corridor",
      location: "Crystal Peak",
      note: "Put Grimmchild on at the Temple’s bench and keep it on all chapter: the Grimmkin and their flames show only while you wear it, one set at a time, and your map marks them.",
      sources: [["Steam guide ch 12 · the Crystal Peak Novice", steam], ["ScriptersWar map · every Grimmkin", sw], grimmchild],
      rows: [
        ["quest-grimm-novice-peak", ["quest"], "Take the Crystal Peak Grimmkin Novice’s flame", "Up the well to Dirtmouth and ride the lift at its east end into the first mine corridor, as in chapter 5. Go east past the drop to the mimic Grub and over the next gap with Crystal Heart: beat the Grimmkin Novice for its flame. Then go back down and ride the Stag to King’s Station.", { requires: ["charm-grimmchild"] }],
      ],
    },
    {
      title: "The Colosseum of Fools",
      location: "Colosseum of Fools",
      sources: [["Steam guide ch 24 · the pit, the trials, the Pale Lurker and the idol", steam], ["gamerwalkthroughs · The Colosseum", "https://gamerwalkthroughs.com/hollow-knight/the-colosseum/"], ["ScriptersWar map · the Pale Lurker’s wall and the idol", sw], ["Hollow Knight wiki · Colosseum of Fools: the pit, Zote, the fees and rewards", "https://hollowknight.wiki/w/Colosseum_of_Fools"], ["Hollow Knight wiki · the Pale Lurker and her lake", "https://hollowknight.wiki/w/Pale_Lurker"]],
      rows: [
        ["route-colosseum-entry", ["route"], "Find the Colosseum in upper Kingdom’s Edge", "From King’s Station, climb the tower by its lifts to the foot of the lift up to the Resting Grounds, as in chapter 7, and take its upper-right exit through the wall you broke then into the Colosseum’s cavern; go right to the door. If you left that wall, it opens only from the cavern’s side: come instead through the flooded stagway into Kingdom’s Edge, up the tall room above the way in, left through the Great Hopper’s room and up and right past the Belflies. Little Fool takes the fee for each trial. Drop into the warriors’ pit below the hall: a bench, a hot spring at the east end, and the dark room to the west, where your shade waits after a trial lost. Rest; swap charms for the trials if you like, and put Grimmchild back on before you leave."],
        ["trial-trial-warrior", ["trial"], "Complete the Trial of the Warrior", "Pay Little Fool 100 Geo to open the first trial and clear its waves. The first win pays a Charm Notch and about 1,000 Geo. Once a trial is paid for, you can retry it for free."],
        ["notch-colosseum", ["notch"], "Take the Trial of the Warrior Charm Notch", "The Charm Notch comes with your first clear of the Trial of the Warrior; later wins pay Geo only.", { reference: "https://hollowknight.wiki/w/Colosseum_of_Fools" }],
        ["quest-zote-colosseum", ["quest"], "Beat Zote in the Trial of the Warrior", "If you freed Zote in Greenpath and in Deepnest, he sits caged in the warriors’ pit and turns up as the Trial of the Warrior’s last opponent; he can’t hurt you. Beat him and, with Bretta rescued too, he heads home to Dirtmouth.", { requires: ["quest-zote-deepnest"] }],
        ["trial-trial-conqueror", ["trial"], "Complete the Trial of the Conqueror", "Pay 450 Geo once the Warrior trial is beaten. This one adds waves you fight from the walls and in the air. The first win pays a Pale Ore and about 2,000 Geo.", { requires: ["trial-trial-warrior"] }],
        ["pale-ore-colosseum", ["pale-ore"], "Claim the Trial of the Conqueror Pale Ore", "The Pale Ore comes only with the first clear of the Trial of the Conqueror; later clears pay Geo.", { requires: ["trial-trial-conqueror"] }],
        ["simple-key-pale-lurker", ["simple-key"], "Take the Pale Lurker’s Simple Key", "From the warriors’ pit, take the path up and right behind the arena and break the shell wall at the far east. Down by the lake the Pale Lurker clutches a Simple Key and runs into her arena as you approach; beat her for the key. A door then opens a shortcut back."],
        ["kings-idol-pale-lurker", ["kings-idol"], "Take the last King’s Idol under the Pale Lurker’s arena", "In the lake room’s south-east corner, a small pool runs under the wall below the arena’s gate: swim east through it to a tent and the last King’s Idol. Then go back down the tower to King’s Station."],
      ],
    },
    {
      title: "West across the City",
      location: "City of Tears",
      sources: [["Steam guide ch 11, 17 and 29 · Lemm, the Nailsmith and the Storerooms Novice", steam], ["fextralife · Relic Seeker Lemm", `${fxl}Relic+Seeker+Lemm`], ["ScriptersWar map · the Nailsmith’s costs and the Storerooms Novice", sw], ["Hollow Knight wiki · Nailsmith: upgrade costs and his request", "https://hollowknight.wiki/w/Nailsmith"], grimmchild],
      rows: [
        ["route-lemm-last", ["route"], "Sell the last relics to Lemm", "From King’s Station’s hub, take the upper-left exit and cross the boulevard to Lemm’s shop: sell whatever relics you still carry; if he isn’t there, he’s at the memorial in the fountain square. The idol you just took fetches 800 Geo."],
        ["forge-coiled-nail", ["forge"], "Upgrade to the Coiled Nail", "Go on along the boulevard, past the lift from the City’s gates, and up the wall to the Nailsmith’s hut. The Coiled Nail costs 2,000 Geo and 2 Pale Ore: with the Conqueror’s ore you hold five, enough for both upgrades at once, and the two take 6,000 Geo between them. Short of Geo, rerun the Conqueror trial."],
        ["forge-pure-nail", ["forge"], "Upgrade to the Pure Nail", "The last upgrade costs 4,000 Geo and 3 Pale Ore. Once it’s done, he asks you to strike him down: walk away instead.", { requires: ["forge-coiled-nail"] }],
        ["quest-grimm-novice-storerooms", ["quest"], "Take the City Storerooms Grimmkin Novice’s flame", "Go back right to the foot of the lifts from the City’s gates and up through the room of hanging platforms into the Storerooms: the Novice’s torch is in the room left of the Stag. Then ride the Stag to Greenpath: a Stag ride or a rest at a bench is what moves the Nailsmith to Sheo’s.", { requires: ["charm-grimmchild"] }],
      ],
    },
    {
      title: "Greenpath",
      location: "Greenpath",
      sources: [["Steam guide ch 13 · the Greenpath Novice", steam], ["ScriptersWar map · the Novice", sw], ["Hollow Knight wiki · the Nailsmith’s move to Sheo’s", "https://hollowknight.wiki/w/Nailsmith"], ["Hollow Knight wiki · Sheo’s hut", "https://hollowknight.wiki/w/Nailmaster_Sheo"]],
      rows: [
        ["quest-grimm-novice-greenpath", ["quest"], "Take the Greenpath Grimmkin Novice’s flame", "Go down the Stag’s shaft to its foot and east into the room of Moss Chargers, where chapter 5 took a Seal: the Novice waits there.", { requires: ["charm-grimmchild"] }],
        ["quest-nailsmith-sheo", ["quest"], "Visit the Nailsmith and Sheo together", "Go west through the cavern to Sheo’s hut: the Nailsmith is there with him. Talk to both (Happy Couple). Then ride the Stag to Dirtmouth.", { requires: ["forge-pure-nail", "nail-art-sheo"] }],
      ],
    },
    {
      title: "Dirtmouth",
      location: "Dirtmouth",
      sources: [["Steam guide ch 14 and 25 · showing Grimm the flames, Zote and Bretta, Grey Prince Zote", steam], ["fextralife · Grey Prince Zote: the basement and the Wings", `${fxl}Grey+Prince+Zote`], troupe, ["Hollow Knight wiki · Grey Prince Zote", "https://hollowknight.wiki/w/Grey_Prince_Zote"]],
      rows: [
        ["quest-grimm-novices-shown", ["quest"], "Show Grimm the Novices’ three flames", "With Grimmchild on, go into Grimm’s big tent and show him the three flames: Grimmchild grows, and the Masters’ flames appear.", { requires: ["quest-grimm-novice-peak", "quest-grimm-novice-storerooms", "quest-grimm-novice-greenpath"] }],
        ["quest-zote-home", ["quest"], "Talk to Zote and Bretta at home", "Zote is home since the Colosseum: talk to him, and to Bretta.", { requires: ["quest-zote-colosseum", "quest-bretta-rescue"] }],
        ["dream-boss-grey-prince-zote", ["dream-boss"], "Fight Grey Prince Zote", "With Zote beaten in the Colosseum and Bretta rescued, you can reach the basement of her house with the Monarch Wings. Dream Nail the statue there to fight Grey Prince Zote; an upgraded nail helps. The first win gives 300 Essence. It adds nothing to the game’s own percentage, but this guide’s bar counts it.", { requires: ["quest-zote-colosseum", "quest-bretta-rescue"] }],
      ],
    },
    {
      title: "King’s Pass",
      location: "King’s Pass",
      sources: [["Steam guide ch 14 · the King’s Pass Master", steam], ["ScriptersWar map · the Master", sw]],
      rows: [
        ["quest-grimm-master-pass", ["quest"], "Take the King’s Pass Grimmkin Master’s flame", "Go west into King’s Pass: the Master waits in the first big room right of where the game began. Then ride the Stag to the Resting Grounds.", { requires: ["quest-grimm-novices-shown"] }],
      ],
    },
    {
      title: "The Resting Grounds lift",
      location: "Resting Grounds",
      sources: [["Steam guide ch 14 · the Master by the lift", steam], ["ScriptersWar map · the Master", sw]],
      rows: [
        ["quest-grimm-master-grounds", ["quest"], "Take the Resting Grounds Grimmkin Master’s flame", "Drop through the grave below the station into the crypt and go west through the wall you broke into the lift room: the Master waits one room further west.", { requires: ["quest-grimm-novices-shown"] }],
      ],
    },
    {
      title: "The Colosseum again",
      location: "Colosseum of Fools",
      sources: [["Steam guide ch 24 and 29 · the Fool’s tips and rerunning it", steam], ["gamerwalkthroughs · the Trial of the Fool and the God Tamer", "https://gamerwalkthroughs.com/hollow-knight/the-colosseum/"], ["Hollow Knight wiki · Colosseum of Fools: free reruns", "https://hollowknight.wiki/w/Colosseum_of_Fools"]],
      rows: [
        ["trial-trial-fool", ["trial"], "Complete the Trial of the Fool", "Ride the lift down to the City and take its upper-right exit back into the Colosseum’s cavern. Pay 800 Geo for the last trial, now with the Pure Nail. It’s the hardest of the three: heal in the gaps between waves, and Dream Nail enemies to refill SOUL. The last fight is the God Tamer and her beast; killing the beast ends it, so aim your damage there. The win pays about 3,000 Geo, and each later clear pays again for nothing: the place to raise Geo for Divine.", { requires: ["trial-trial-conqueror"] }],
      ],
    },
    {
      title: "The central cliff",
      location: "Kingdom’s Edge",
      sources: [["Steam guide ch 15 · the Master outside Cornifer’s pipe", steam], ["ScriptersWar map · the Master", sw]],
      rows: [
        ["quest-grimm-master-edge", ["quest"], "Take the Kingdom’s Edge Grimmkin Master’s flame", "Go down through the Great Hopper’s room into the tall room above the way in and on down to the central cliff: the Master waits on a platform outside Cornifer’s pipe. Then go left through the flooded stagway to King’s Station and ride to Dirtmouth.", { requires: ["quest-grimm-novices-shown"] }],
      ],
    },
    {
      title: "Grimm’s tent",
      location: "Dirtmouth",
      sources: [["Steam guide ch 17 · Troupe Master Grimm", steam], troupe, ["ludo.guide · the chest with the notch", "https://www.ludo.guide/guide/hollow-knight/the-grimm-troupe"], ["ScriptersWar map · the notch in the tent", sw]],
      rows: [
        ["boss-troupe-master-grimm", ["boss", "troupe-boss"], "Defeat Troupe Master Grimm", "Rest, keep Grimmchild on, and go into the big tent with the Masters’ three flames: Grimm fights you. Winning upgrades Grimmchild again.", { requires: ["quest-grimm-master-pass", "quest-grimm-master-grounds", "quest-grimm-master-edge"] }],
        ["notch-grimm-notch", ["notch"], "Collect Grimm’s Charm Notch", "A chest appears in the tent after the fight, with a Charm Notch: open it before you leave. Then ride the Stag to the Hidden Station.", { requires: ["boss-troupe-master-grimm"] }],
      ],
    },
    {
      title: "The broken bridge",
      location: "Ancient Basin",
      sources: [["Steam guide ch 24 · the Nightmare on the bridge", steam], troupe, ["ScriptersWar map · the Nightmares", sw]],
      rows: [
        ["quest-grimm-nightmare-basin", ["quest"], "Take the Grimmkin Nightmare’s flame by the Basin", "Rest at the Hidden Station’s bench first: a loss sends you back to your last bench. Go up into the Basin’s tram station and on up into the hall of the broken bridge: the Nightmare waits there. Start the fight, then draw it to the passages on the left, off the pillars. Then ride the tram east.", { requires: ["boss-troupe-master-grimm"] }],
      ],
    },
    {
      title: "The Hive",
      location: "The Hive",
      sources: [troupe, ["ScriptersWar map · the Hive’s Nightmare", sw]],
      rows: [
        ["quest-grimm-nightmare-hive", ["quest"], "Take the Hive’s Grimmkin Nightmare’s flame", "Go up from the station and right through the wall you opened in chapter 9, then up the tall room into the large room: the Nightmare waits there. Then ride the tram back to the Basin, walk to the Hidden Station and ride to the Distant Village.", { requires: ["boss-troupe-master-grimm"] }],
      ],
    },
    {
      title: "Brumm in the Distant Village",
      location: "Distant Village",
      sources: [["Steam guide ch 20 · Brumm’s hut", steam], ["fextralife · Brumm", `${fxl}Brumm`], ["ScriptersWar map · Brumm", sw]],
      rows: [
        ["quest-grimm-brumm", ["quest"], "Take Brumm’s flame in the Distant Village", "Go left into the village and across the platforms to the small hut: Brumm gives you his flame and asks you to help him end the Troupe. A fourth flame, in the Fungal Core, is a spare: three are enough. Then ride the Stag to Dirtmouth.", { requires: ["boss-troupe-master-grimm"] }],
      ],
    },
    {
      title: "Divine’s tent and the Nightmare King",
      location: "Dirtmouth",
      note: "Divine buys a Fragile charm off you and sells it back Unbreakable: wear one Fragile charm into her tent, let her eat it, keep talking, then pay. One charm at a time. A charm she’s holding doesn’t count toward your 40, so never leave one with her.",
      sources: [["Steam guide ch 29 · Divine, the Nightmare King and Banishment", steam], troupe, ["ludo.guide · Divine’s small tent, and Heart and Strength before the Nightmare King", "https://www.ludo.guide/guide/hollow-knight/the-grimm-troupe"], ["Hollow Knight wiki · a charm Divine holds doesn’t count, and either ending is one percent", "https://hollowknight.wiki/w/Completion_(Hollow_Knight)"], ["Hollow Knight wiki · Divine", "https://hollowknight.wiki/w/Divine"]],
      rows: [
        ["quest-divine-greed", ["quest"], "Make Fragile Greed Unbreakable", "Wearing Fragile Greed, go into Divine’s tent, the small one beside Grimm’s, and let her eat it; keep talking, then pay 9,000 Geo for Unbreakable Greed. The upgrades add nothing to the game’s own percentage, but the bar counts each.", { requires: ["charm-fragile-greed"] }],
        ["quest-divine-heart", ["quest"], "Make Fragile Heart Unbreakable", "The same with Fragile Heart, for 12,000 Geo. It and Strength help against the Nightmare King.", { requires: ["charm-fragile-heart"] }],
        ["quest-divine-strength", ["quest"], "Make Fragile Strength Unbreakable", "The same with Fragile Strength, for 15,000 Geo. Short of Geo, rerun the Trial of the Fool: on the Ritual this chapter takes, Divine stays after the finale until all three are done.", { requires: ["charm-fragile-strength"] }],
        ["troupe-finale-grimm-finale", ["troupe-finale"], "Finish the Grimm Troupe quest by ritual or banishment", "This chapter takes the Ritual. Rest at Dirtmouth’s bench: a loss wakes you there. With three of the last flames and Grimmchild on, Dream Nail the sleeping Grimm at the back of his tent and defeat Nightmare King Grimm. You wake outside with Grimmchild at full strength; the big tent is gone and Divine stays. Banishment instead: buy all three of Divine’s upgrades first, then meet Brumm by the Nightmare Lantern in the Cliffs and break the brazier before you leave the room; walk out after talking to him and Banishment is lost for good. Nymm, outside Dirtmouth’s Stag Station, then gives you Carefree Melody in Grimmchild’s place. Either ending is worth the same one percent.", { requires: ["quest-grimm-nightmare-basin", "quest-grimm-nightmare-hive", "quest-grimm-brumm"] }],
      ],
    },
  ],
} satisfies RawChapter;

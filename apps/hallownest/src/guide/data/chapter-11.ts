import type { RawChapter } from "@hundo/core/types";

export default {
  id: 11,
  title: "The Grimm Troupe and Colosseum",
  region: "Howling Cliffs · Dirtmouth · Kingdom’s Edge",
  teaser: "Colosseum",
  intro: "Clear the Colosseum’s three trials, then take the Grimm Troupe’s story to one of its two ends. Finish with the last Nail upgrades.",
  sources: [["Steam guide ch 10–29 · every flame, the Colosseum and the Troupe’s end", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"], ["Hollow Knight wiki · the Grimm Troupe quest, both endings and Brumm’s room", "https://hollowknight.wiki/w/Grimm_Troupe_(Quest)"], ["Hollow Knight wiki · Colosseum of Fools: the way in, trial fees and rewards", "https://hollowknight.wiki/w/Colosseum_of_Fools"]],
  groups: [
    {
      title: "The three arena trials",
      location: "Colosseum of Fools · Dirtmouth",
      sources: [["Hollow Knight wiki · Zote in the Colosseum and back in Dirtmouth", "https://hollowknight.wiki/w/Zote_the_Mighty"], ["Hollow Knight wiki · Grey Prince Zote: the basement, his Essence", "https://hollowknight.wiki/w/Grey_Prince_Zote"], ["Hollow Knight wiki · Grey Prince Zote missing from the 112%", "https://hollowknight.wiki/w/Completion_(Hollow_Knight)"], ["pindrop · the 112% from the game’s files, with no line for Grey Prince Zote", "https://pindrop.gg/hollow-knight/guides/112-percent-checklist"], ["Steam guide ch 24–25 · the trials, the Pale Lurker and Grey Prince Zote", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"]],
      rows: [
        ["route-colosseum-entry", ["route"], "Find the Colosseum in upper Kingdom’s Edge", "Climb to the top of Kingdom’s Edge’s western chasm and take the cavern in its north-west corner to the Colosseum. Little Fool takes the fee for each trial, and the warriors’ pit below the arena has a bench to rest at between attempts."],
        ["trial-trial-warrior", ["trial"], "Complete the Trial of the Warrior", "Pay Little Fool 100 Geo to open the first trial and clear its waves. The first win pays a Charm Notch and about 1,000 Geo. Once a trial is paid for, you can retry it for free."],
        ["notch-colosseum", ["notch"], "Take the Trial of the Warrior Charm Notch", "The Charm Notch comes with your first clear of the Trial of the Warrior; later wins pay Geo only.", {"reference": "https://hollowknight.wiki/w/Colosseum_of_Fools"}],
        ["quest-zote-arena", ["quest"], "Finish Zote’s bout and check on Bretta", "If you freed Zote in Greenpath and in Deepnest, he sits caged in the warriors’ pit and turns up as the Trial of the Warrior’s last opponent; he can’t hurt you. Beat him, and with Bretta rescued too, he heads home to Dirtmouth. Talk to him and to Bretta there."],
        ["dream-boss-grey-prince-zote", ["dream-boss"], "Fight Grey Prince Zote", "With Zote beaten in the Colosseum and Bretta rescued, the basement of her house opens once you have Monarch Wings. Dream Nail the statue there to fight Grey Prince Zote. The first win gives 300 Essence. It adds nothing to the game’s own percentage, but this guide’s bar counts it."],
        ["trial-trial-conqueror", ["trial"], "Complete the Trial of the Conqueror", "Pay 450 Geo once the Warrior trial is beaten. This one adds waves you fight from the walls and in the air. The first win pays a Pale Ore and about 2,000 Geo."],
        ["pale-ore-colosseum", ["pale-ore"], "Claim the Trial of the Conqueror Pale Ore", "The Pale Ore comes only with the first clear of the Trial of the Conqueror; later clears pay Geo."],
        ["trial-trial-fool", ["trial"], "Complete the Trial of the Fool", "Pay 800 Geo after the Conqueror. It’s the hardest of the three: heal in the gaps between waves, and Dream Nail enemies to refill SOUL. The last fight is God Tamer and her beast. Killing the beast ends it, so aim your damage there. The win pays about 3,000 Geo."],
        ["simple-key-pale-lurker", ["simple-key"], "Take the Pale Lurker’s Simple Key", "From the warriors’ pit, take the path up and right behind the arena and break the shell wall at the far east. Down by the lake the Pale Lurker clutches a Simple Key and runs into her arena as you approach; beat her for the key. A door then opens a shortcut back."],
      ],
    },
    {
      title: "Summon the Troupe and make the choice",
      location: "Howling Cliffs · Dirtmouth",
      sources: [["Hollow Knight wiki · Grimmchild’s three sets of flames", "https://hollowknight.wiki/w/Grimmchild"], ["Hollow Knight wiki · where the Grimmkin Nightmares wait", "https://hollowknight.wiki/w/Grimmkin_Nightmare"], ["Hollow Knight wiki · Brumm, and the room you mustn’t leave", "https://hollowknight.wiki/w/Brumm"], ["Hollow Knight wiki · Divine’s prices and what happens to her charms", "https://hollowknight.wiki/w/Divine"], ["Hollow Knight wiki · a Fragile charm Divine holds counts for nothing", "https://hollowknight.wiki/w/Completion_(Hollow_Knight)"], ["Steam guide ch 10–17, 20, 24, 29 · the Lantern, each flame, Grimm and Divine", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"]],
      rows: [
        ["quest-grimm-flames-one", ["quest"], "Collect the first two sets of three flames", "With Grimmchild on, beat the three Grimmkin Novices, in Greenpath, the City Storerooms and Crystal Peak, take their flames and report to Grimm. Then do the same with the three Masters, in King’s Pass, the Resting Grounds and Kingdom’s Edge, and go back to his tent."],
        ["boss-troupe-master-grimm", ["boss", "troupe-boss"], "Defeat Troupe Master Grimm", "With the Masters’ three flames, go back to the tent and Grimm fights you. Winning upgrades Grimmchild again."],
        ["notch-grimm-notch", ["notch"], "Collect Grimm’s Charm Notch", "Grimm’s defeat also gives a Charm Notch, apart from the percent the fight itself is worth."],
        ["quest-divine", ["quest"], "Get Divine’s Unbreakable charms before any banishment", "Wear a Fragile charm into Divine’s tent, the other one beside Grimm’s, and let her eat it. Keep talking, then pay to get it back Unbreakable: 9,000 Geo for Greed, 12,000 for Heart, 15,000 for Strength. The upgrades add nothing to the game’s own percentage, but the bar counts this step, and a charm she’s holding doesn’t count, so don’t leave it with her. Banish the Troupe and she goes too, leaving any charm she still holds on the ground where her tent stood, still Fragile. On the Nightmare King route she stays until all three are done."],
        ["troupe-finale-grimm-finale", ["troupe-finale"], "Finish the Grimm Troupe quest by ritual or banishment", "The last stage has four flames and you need three: in the Fungal Core, the Hive, the Waterways at the Ancient Basin’s edge, and with Brumm in Deepnest’s Distant Village, who also offers to help you end the Troupe. Ritual: with three flames and Grimmchild on, Dream Nail the sleeping Grimm in his tent and defeat Nightmare King Grimm. Banishment: meet Brumm by the Nightmare Lantern in the Cliffs and break the brazier before you leave the room; walk out after talking to him and Banishment is lost for good. Then Nymm, outside Dirtmouth’s Stag Station, gives you Carefree Melody in Grimmchild’s place. Either ending is worth the same one percent."],
      ],
    },
    {
      title: "Finish the Nail and the smith’s story",
      location: "City of Tears · Greenpath",
      sources: [["Hollow Knight wiki · Nailsmith: upgrade costs, his request, the move to Sheo’s", "https://hollowknight.wiki/w/Nailsmith"], ["Hollow Knight wiki · Sheo’s hut and the Great Slash condition", "https://hollowknight.wiki/w/Nailmaster_Sheo"], ["Steam guide ch 28–29 · the Pure Nail and the smith’s choice", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"]],
      compact: true,
      rows: [
        ["forge-coiled-nail", ["forge"], "Upgrade to the Coiled Nail", "Take 2,000 Geo and 2 Pale Ore to the Nailsmith once you have the Channelled Nail."],
        ["forge-pure-nail", ["forge"], "Upgrade to the Pure Nail", "The last upgrade costs 4,000 Geo and 3 Pale Ore."],
        ["quest-nailsmith-sheo", ["quest"], "Visit the Nailsmith and Sheo together", "Once the Pure Nail is done, he asks you to strike him down: walk away instead. With Great Slash learned, rest at a bench or ride a Stag, then find him in Sheo’s hut in Greenpath and talk to him (Happy Couple)."],
      ],
    },
  ],
} satisfies RawChapter;

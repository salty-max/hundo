import type { RawChapter } from "@hundo/core/types";

const steam = "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947";
const fxl = "https://hollowknight.wiki.fextralife.com/";
const sw = "https://scripterswar.com/hollowknight/map";
const mushroom: [string, string][] = [["fextralife · Mister Mushroom", `${fxl}Mister+Mushroom`], ["Hollow Knight wiki · Mister Mushroom’s seven places and their order", "https://hollowknight.wiki/w/Mister_Mushroom_(Hollow_Knight)"]];

export default {
  id: 10,
  title: "The Black Egg and the White Palace",
  region: "Across Hallownest · Black Egg Temple · White Palace · The Abyss",
  teaser: "Palace Grounds",
  intro: "With the three Dreamers gone, follow Mister Mushroom across the kingdom, wake the dream bosses, open the Temple of the Black Egg for the first ending and bring the Seer her Essence. Then climb the White Palace, take Kingsoul to the Birthplace, and end at the Black Egg.",
  sources: [["Steam guide ch 11, 25, 27 and 28 · the dream bosses, the Seer, the White Palace and the Birthplace", steam], ["fextralife · Endings, and where each reload starts", `${fxl}Endings`], ["Hollow Knight wiki · the endings", "https://hollowknight.wiki/w/Endings_(Hollow_Knight)"], ["Hollow Knight wiki · Dream Nail: Essence sources and the Seer’s rewards", "https://hollowknight.wiki/w/Dream_Nail"]],
  groups: [
    {
      title: "Mister Mushroom’s first stop",
      location: "Fungal Wastes",
      note: "Mister Mushroom shows up only once all three Dreamers are gone, and moves on only if you talk to him with Spore Shroom equipped: wear it from here on whenever you visit him. Hit him with the nail to make him turn and talk. His seven spots come in order along this chapter.",
      sources: [...mushroom, ["ScriptersWar map · his seven spots", sw]],
      rows: [
        ["quest-mushroom-fungal", ["quest"], "Meet Mister Mushroom in the Fungal Wastes", "Climb out of the Abyss to the Basin’s central room and go right through the Palace Grounds to the Hidden Station. Rest, take off Joni’s Blessing, Fragile Heart and Lifeblood Heart, put on Spore Shroom, and ride to Queen’s Station. Two rooms right and down, he sits at Cornifer’s old spot in the Fungal Wastes: talk until he burrows away. Then ride back to the Hidden Station."],
      ],
    },
    {
      title: "Up from the Kingdom’s Edge tram",
      location: "Kingdom’s Edge",
      sources: [...mushroom],
      rows: [
        ["quest-mushroom-edge", ["quest"], "Follow Mister Mushroom to Kingdom’s Edge", "From the Hidden Station, go two rooms to the Basin’s central room and up into the tram station, and ride east to Kingdom’s Edge. In the tall room straight up from the station, he sits in a small cave on its middle left.", { requires: ["quest-mushroom-fungal"] }],
      ],
    },
    {
      title: "Below the Failed Tramway",
      location: "Deepnest",
      sources: [...mushroom],
      rows: [
        ["quest-mushroom-deepnest", ["quest"], "Meet Mister Mushroom in Galien’s cavern", "Ride the tram west to Deepnest and go left through the Garpede room and the Hot Spring, then on left and up into the room under the Failed Tramway: he sits at its bottom left, by the way to Galien’s cave. Then ride the tram back to the Basin and rest in the car.", { requires: ["quest-mushroom-edge"] }],
      ],
    },
    {
      title: "White Defender",
      location: "Royal Waterways",
      sources: [["Steam guide ch 24 · White Defender", steam], ["fextralife · White Defender", `${fxl}White+Defender`], ["gamerwalkthroughs · dive just under the lever room, and close in while he erupts", "https://gamerwalkthroughs.com/hollow-knight/dream-bosses/"], ["Hollow Knight wiki · White Defender’s hidden room", "https://hollowknight.wiki/w/White_Defender"]],
      rows: [
        ["dream-boss-white-defender", ["dream-boss"], "Defeat White Defender below Dung Defender’s arena", "From the tram station, go up to the bridge and right into the broken lift shaft, climb through the wall you broke in chapter 5 into the lever room, and drop through the floor below the lever into the cave of dung statues. The Defender sleeps left of the idol’s statue: Dream Nail him. Hit him right after each attack and close in while he erupts; a loss wakes you beside him, with nothing lost. 300 Essence. Then go back down through the Basin to the Hidden Station and ride to Dirtmouth.", { requires: ["dream-milestone-dream-nail"] }],
      ],
    },
    {
      title: "Mato’s hut",
      location: "Howling Cliffs",
      sources: [...mushroom],
      rows: [
        ["quest-mushroom-mato", ["quest"], "Speak to Mister Mushroom in Mato’s hut", "Go west into King’s Pass, back to where you began, and climb the high path on the left into the Howling Cliffs. Go west to the raised platforms, down the spiked pit and east into Mato’s hut: he’s inside. Then go up and right to the cliff edge and super dash right: you fall into Dirtmouth.", { requires: ["quest-mushroom-deepnest"] }],
      ],
    },
    {
      title: "The Forgotten Crossroads and the first ending",
      location: "Forgotten Crossroads",
      sources: [["Steam guide ch 11 and 28 · Failed Champion and the Temple", steam], ["fextralife · Failed Champion", `${fxl}Failed+Champion`], ["gamerwalkthroughs · Failed Champion’s shockwave and when to heal", "https://gamerwalkthroughs.com/hollow-knight/dream-bosses/"], ["ludo.guide · the Temple’s bench, the tablet and the chains", "https://www.ludo.guide/guide/hollow-knight/final-steps"], ["Hollow Knight wiki · Failed Champion behind the wall above the arena", "https://hollowknight.wiki/w/Failed_Champion"], ["Hollow Knight wiki · World Sense from the Temple’s tablet", "https://hollowknight.wiki/w/World_Sense"], ["Hollow Knight wiki · the Hollow Knight’s chains and the Temple bench", "https://hollowknight.wiki/w/The_Hollow_Knight"], ["Hollow Knight wiki · the Grubfather’s last reward", "https://hollowknight.wiki/w/Grubfather"]],
      rows: [
        ["charm-grubberfly-elegy", ["charm"], "Claim Grubberfly’s Elegy at all 46 rescues", "Go down the well and left to the main shaft’s top-left exit and the Grubfather: with all 46 Grubs freed, his last reward is Grubberfly’s Elegy."],
        ["dream-boss-failed-champion", ["dream-boss"], "Defeat Failed Champion above False Knight’s arena", "Go to False Knight’s arena, the way chapter 1 went, climb above it and break the wall there: his body lies there with two Maggots beside it. Strike it with the Dream Nail. His hits take two masks and rocks fall as he fights; jump his shockwave, and heal while he’s down. 300 Essence.", { requires: ["dream-milestone-dream-nail"] }],
        ["route-world-sense", ["route"], "Gain World Sense in the Temple of the Black Egg", "Go back up and right past the well to the Temple of the Black Egg, where you met Quirrel. With Herrah, Monomon and Lurien gone, its sealed door stands open: rest at the bench inside, then read the tablet beside it. Your completion now shows in the inventory and on your save file."],
        ["boss-hollow-knight", ["boss", "other-boss"], "Defeat the Hollow Knight before getting Void Heart", "Go on into the Black Egg at the Temple’s centre, where the Hollow Knight is held in chains. Break the chains to start the fight. Hit it from above and dash away right after its jumping attack; a retry starts at the Temple’s bench."],
        ["ending-hollow-knight", ["ending"], "Record the first Black Egg ending", "Win that fight before you own Void Heart and this ending plays. Once Void Heart is yours it’s gone from this save, so take it now. After the credits your file loads at the Temple’s bench with the fight there to take again.", { requires: ["boss-hollow-knight"] }],
      ],
    },
    {
      title: "Soul Tyrant",
      location: "City of Tears",
      sources: [["fextralife · Soul Tyrant", `${fxl}Soul+Tyrant`], ["gamerwalkthroughs · Soul Tyrant where Soul Master fell", "https://gamerwalkthroughs.com/hollow-knight/dream-bosses/"], ["Hollow Knight wiki · Soul Tyrant from Soul Master’s body", "https://hollowknight.wiki/w/Soul_Tyrant"]],
      rows: [
        ["dream-boss-soul-tyrant", ["dream-boss"], "Defeat Soul Tyrant in the Soul Sanctum", "Back up the well, ride the Stag to the City Storerooms and go on to the Skyway bench outside the Soul Sanctum, as in chapter 3: rest there. Go through the Sanctum to the room where Soul Master first fought you; his body lies there. Strike it with the Dream Nail. Heal before he smashes through the floor, since the second half gives you no chance to; then strike while he hangs still casting orbs. 300 Essence. Then go back the way you came to the Storerooms and ride to the Resting Grounds.", { requires: ["dream-milestone-dream-nail"] }],
      ],
    },
    {
      title: "The Spirits’ Glade and the Seer",
      location: "Resting Grounds",
      sources: [["Steam guide ch 11 and 25 · the Glade’s first spirit, its Root, its idol and the Seer", steam], ["fextralife · Spirits’ Glade: don’t Dream Nail the spirits", `${fxl}Spirits'+Glade`], ["ludo.guide · the Glade right of the Seer, its Root and idol", "https://www.ludo.guide/guide/hollow-knight/resting-grounds-part-2"], ["ScriptersWar map · the Glade’s door, Root and idol", sw], ["Hollow Knight wiki · the Seer’s rewards", "https://hollowknight.wiki/w/Seer"]],
      rows: [
        ["root-glade", ["root"], "Clear the Spirits’ Glade Root", "The Glade’s door is to the right of the Seer, open since you brought her 200 Essence. Don’t Dream Nail the spirits inside: one of them, Revek, then hunts you, hits for two masks and can’t be killed. The Root is in the top right corner: strike it for 34 Essence.", { requires: ["dream-milestone-dream-nail"] }],
        ["kings-idol-glade", ["kings-idol"], "Take the King’s Idol hidden below the Glade’s Root", "Below the Root, at the top of the waterfall on the right wall, a hidden room holds a King’s Idol."],
        ["dream-milestone-seer-awoken", ["dream-milestone"], "Awaken the Dream Nail at 1,800 Essence", "Go on to the Seer: with the dream bosses and the Glade’s Root you’re past 2,400 Essence. At 1,800 she awakens your Dream Nail, which the White Palace needs."],
        ["dream-milestone-seer-final", ["dream-milestone"], "Hear the Seer’s final words at 2,400 Essence", "Keep talking: at 2,400 she tells her last story and fades away. The seven Warrior Dreams (1,100) and Lost Kin, Failed Champion, Soul Tyrant and White Defender (1,300) come to 2,400 between them, and the Roots hold 482 more.", { requires: ["dream-milestone-seer-awoken"] }],
      ],
    },
    {
      title: "The White Palace",
      location: "White Palace",
      note: "The Palace is a long climb through saws and spikes, with three benches. Hiveblood, Grubsong with Deep Focus, and Longnail or Mark of Pride all make it easier.",
      sources: [["Steam guide ch 27 · the Palace route, its benches and the throne", steam], ["fextralife · White Palace", `${fxl}White+Palace`], ["Hollow Knight wiki · White Palace: the way in, the two levers, the Path of Pain, the throne", "https://hollowknight.wiki/w/White_Palace"], ["Hollow Knight wiki · Kingsoul from two halves", "https://hollowknight.wiki/w/Kingsoul"], ["Hollow Knight wiki · Completion: no Path of Pain entry", "https://hollowknight.wiki/w/Completion_(Hollow_Knight)"]],
      rows: [
        ["route-palace-entry", ["route"], "Enter the White Palace from the Palace Grounds", "Ride the Stag to the Hidden Station and walk west to the middle of the Palace Grounds, where a Kingsmould’s body lies before the old gates. Strike it with the awakened Dream Nail, then beat the living Kingsmould in the dream to open the way in. A bench waits just inside; past a second Kingsmould and a switch is the central hall, with another bench: rest there.", { requires: ["dream-milestone-seer-awoken"] }],
        ["route-palace-left", ["route"], "Light the White Palace’s left lantern", "From the central bench, take the left exit through the saw rooms. A lever at the far end lights this wing’s lantern, and one more past it opens a shortcut back to the bench."],
        ["route-palace-right", ["route"], "Light the White Palace’s right lantern", "Take the right exit next, passing over a caged lever you can’t reach yet. At the end of that wing a lever opens the cage; drop back and pull the one inside to light this wing’s lantern. With both wings’ lanterns lit, the lift at the top of the hall runs."],
        ["challenge-path-of-pain", ["challenge"], "Clear the Path of Pain", "It adds nothing to the game’s own percentage, but this guide’s bar counts it. Ride the lift up, get past the Wingmoulds to the bench at the top of the first climb, and rest. Then go back down into the Wingmoulds’ room: a hidden wall high up opens onto the Path of Pain, and a fall there sends you back to that bench. Its thorned walls can’t be pogoed. The course ends in a scene."],
        ["route-palace-ascent", ["route"], "Reach the final Palace chamber", "From the bench at the top of the first climb, work up through the saw and spear rooms. Near the top, Crystal Heart carries you over the long gaps to the throne room."],
        ["charm-kingsoul", ["charm"], "Complete Kingsoul with the two White Fragments", "Hit the Pale King’s body on the throne until it falls, and take his White Fragment; you wake outside the Palace. With the White Lady’s half it forms Kingsoul, which counts only once whole: that’s all 40 charms.", { requires: ["quest-white-lady"] }],
      ],
    },
    {
      title: "The Birthplace",
      location: "The Abyss",
      sources: [["Steam guide ch 28 · the bench, the floor, the egg and the great egg", steam], ["ScriptersWar map · the egg", sw], ["Hollow Knight wiki · Void Heart in the Birthplace", "https://hollowknight.wiki/w/Void_Heart"], ["Hollow Knight wiki · the floor that gives way", "https://hollowknight.wiki/w/The_Abyss_(Hollow_Knight)"]],
      rows: [
        ["arcane-egg-birthplace", ["arcane-egg"], "Take the Arcane Egg in the Birthplace", "Go to the Basin’s toll bench, left at the bottom of the central room, and rest with Kingsoul equipped. Go down the Abyss: at the bottom’s west side the shaking floor gives way to the Birthplace. Almost straight down from where you drop in lies the last Arcane Egg.", { requires: ["charm-kingsoul"] }],
        ["route-void-heart", ["route"], "Transform Kingsoul into Void Heart at the Birthplace", "Go right past the Siblings to a great egg, strike its face with the Dream Nail, then climb the Abyss in the memory that follows. Kingsoul becomes Void Heart and keeps its completion point.", { requires: ["charm-kingsoul"] }],
      ],
    },
    {
      title: "Past Broken Vessel’s arena",
      location: "Ancient Basin",
      sources: [...mushroom],
      rows: [
        ["quest-mushroom-basin", ["quest"], "Speak to Mister Mushroom near Monarch Wings", "Put Spore Shroom back on. Left past the toll bench, through Broken Vessel’s arena, he waits in the next room, before the spot where you took the Monarch Wings. Then go back to the Hidden Station and ride to Queen’s Station.", { requires: ["quest-mushroom-mato"] }],
      ],
    },
    {
      title: "Below the Overgrown Mound",
      location: "Fog Canyon · Queen’s Gardens",
      sources: [...mushroom],
      rows: [
        ["quest-mushroom-canyon", ["quest"], "Speak to Mister Mushroom near the Overgrown Mound", "From Queen’s Station, go left into Fog Canyon’s tall room, out its middle-left exit and under the thorn wall, as in chapter 8: he’s on the left side of the room you come up in. Then ride from Queen’s Station to Dirtmouth.", { requires: ["quest-mushroom-basin"] }],
      ],
    },
    {
      title: "Where the journey began",
      location: "King’s Pass",
      sources: [...mushroom, ["Hollow Knight wiki · his scene after any ending", "https://hollowknight.wiki/w/Endings_(Hollow_Knight)"]],
      rows: [
        ["quest-mushroom-pass", ["quest"], "Find Mister Mushroom where the journey began", "Go west into King’s Pass: he’s back where you started the game, at its west end. After this talk, every ending you finish adds his scene after the credits.", { requires: ["quest-mushroom-canyon"] }],
      ],
    },
    {
      title: "The Black Egg",
      location: "Forgotten Crossroads",
      sources: [["Steam guide ch 28 · Salubra’s Blessing at the first chance, and the last endings", steam], ["fextralife · Endings", `${fxl}Endings`], ["Hollow Knight wiki · Hornet’s opening and the Radiance", "https://hollowknight.wiki/w/The_Hollow_Knight"], ["Hollow Knight wiki · Salubra’s Blessing", "https://hollowknight.wiki/w/Salubra%27s_Blessing"]],
      rows: [
        ["pickup-salubra-blessing", ["pickup"], "Buy Salubra’s Blessing at 40 charms", "Go down the well and east through the Crossroads to Salubra’s hut: with all 40 charms and every notch she sells, buy her Blessing for 800 Geo. It adds nothing to the game’s own percentage, but the bar counts it. Buy it now: later choices can take a charm off you for a while and drop the count below 40. Then go back west to the Temple.", { requires: ["charm-kingsoul", "charm-grubberfly-elegy"] }],
        ["ending-sealed-siblings", ["ending"], "Finish the Black Egg fight while Hornet restrains the boss", "Rest at the Temple’s bench and fight the Hollow Knight again with Void Heart. When Hornet pins the Hollow Knight down, don’t use the Dream Nail: keep hitting, or wait, until it breaks free. Winning from there gives Sealed Siblings, and the file loads back at the Temple’s bench. A loss sends you back to that bench too, with the Hollow Knight to fight again.", { requires: ["route-void-heart"] }],
        ["boss-radiance", ["boss", "other-boss"], "Enter the Radiance fight through Hornet’s opening", "Fight the Hollow Knight once more, and this time strike it with the Dream Nail while Hornet holds it down: that takes you into the Radiance’s dream. A loss sends you back to the Temple’s bench, with the Hollow Knight to beat again first.", { requires: ["route-void-heart"] }],
        ["ending-dream-no-more", ["ending"], "Record Dream No More", "Defeat the Radiance for Dream No More. Your file loads at the Temple’s bench afterward, so you can play on.", { requires: ["boss-radiance"] }],
      ],
    },
  ],
} satisfies RawChapter;

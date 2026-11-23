import type { RawChapter } from "@hundo/core/types";

const steam = "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947";
const fxl = "https://hollowknight.wiki.fextralife.com/";
const sw = "https://scripterswar.com/hollowknight/map";

export default {
  id: 12,
  title: "Godhome and the Final Percentage",
  region: "Royal Waterways · Junk Pit · Godhome · Queen’s Gardens · Greenpath",
  teaser: "Godhome",
  intro: "Break into the Junk Pit under the Royal Waterways, free the Godseeker with the Pale Lurker’s key and clear the first four Pantheons for 112%. Then the Pantheon of Hallownest for Pure Completion, a flower for the Godseeker, and the Hunter’s Journal to end the first save.",
  sources: [["Steam guide ch 30 · the Junk Pit and Godhome’s layout", steam], ["fextralife · Godhome", `${fxl}Godhome`], ["Hollow Knight wiki · the Godtuner from the Godseeker’s coffin", "https://hollowknight.wiki/w/Godtuner"], ["Hollow Knight wiki · Pantheons: unlocks, final bosses and bindings", "https://hollowknight.wiki/w/Pantheons"], ["pindrop · the Godtuner and four Pantheons in the 112%", "https://pindrop.gg/hollow-knight/guides/112-percent-checklist"]],
  groups: [
    {
      title: "Down to the Junk Pit",
      location: "Royal Waterways",
      sources: [["Steam guide ch 30 · the roof by Flukemarm, the pipe and the Flukemungas", steam], ["Hollow Knight wiki · the Junk Pit: the roof by Flukemarm and the sarcophagus", "https://hollowknight.wiki/w/Royal_Waterways"]],
      rows: [
        ["route-junk-pit", ["route"], "Reach the Junk Pit in the Royal Waterways", "Ride the Stag to the City Storerooms, walk to Lemm’s shop and drop through the hatch below it to the Waterways bench, as in chapter 5. Dive through the floor below it and head west toward Flukemarm. In the square room beside hers, break the roof in the north-west corner and go up into the pipe. Mind the Flukemungas there, which hit for two masks, then swim across into the Junk Pit."],
      ],
    },
    {
      title: "The Godseeker’s coffin",
      location: "Junk Pit",
      sources: [["Steam guide ch 30 · the coffin", steam], ["ScriptersWar map · the chests round the coffin", sw], ["Hollow Knight wiki · the Godseeker freed with a Simple Key", "https://hollowknight.wiki/w/Godseeker"], ["Hollow Knight wiki · Godhome: the way in", "https://hollowknight.wiki/w/Godhome"]],
      rows: [
        ["godtuner-godtuner", ["godtuner"], "Free the Godseeker and pick up the Godtuner", "A handful of chests stand round the golden sarcophagus at the pit’s far side, about 51 Geo in all, and one lets out only Lumaflies. Unlock the sarcophagus with the Pale Lurker’s Simple Key: the Godseeker inside drops the Godtuner, worth one percent. Pick it up, then strike her with the Dream Nail to enter Godhome.", { requires: ["simple-key-pale-lurker"] }],
      ],
    },
    {
      title: "The Hall of Gods and the four Pantheons",
      location: "Godhome",
      note: "Rest at the bench on Godhome’s top floor first: a Pantheon you lose sends you back there.",
      sources: [["Steam guide ch 30 · the bench, the Hall of Gods and the order of the doors", steam], ["fextralife · Godhome: the bench before the Pantheon gates", `${fxl}Godhome`], ["Hollow Knight wiki · Hall of Gods: statues and difficulties", "https://hollowknight.wiki/w/Hall_of_Gods"], ["Hollow Knight wiki · each Pantheon’s final boss and how it unlocks", "https://hollowknight.wiki/w/Pantheons"], ["Hollow Knight wiki · the Godtuner and four Pantheons in the 112%", "https://hollowknight.wiki/w/Completion_(Hollow_Knight)"]],
      rows: [
        ["challenge-practice-gods", ["challenge"], "Practice troublesome bosses in the Hall of Gods", "The Hall of Gods, on Godhome’s lowest floor, has a statue for each boss you’ve beaten, and a few more. Fight any of them at Attuned or Ascended, and at Radiant once you’ve won its Ascended fight; losing there costs nothing. Practice whichever boss keeps ending your Pantheon runs."],
        ["pantheon-master", ["pantheon"], "Clear the Pantheon of the Master", "Its door is the first, on the left of Godhome’s middle floor. The run ends against Brothers Oro & Mato."],
        ["pantheon-artist", ["pantheon"], "Clear the Pantheon of the Artist", "The second door. Paintmaster Sheo is its last fight."],
        ["pantheon-sage", ["pantheon"], "Clear the Pantheon of the Sage", "The third door, ending with Great Nailsage Sly. Grey Prince Zote is among its fights."],
        ["pantheon-knight", ["pantheon"], "Clear the Pantheon of the Knight", "Its door opens to the right of the other three once they’re cleared. The last fight is Pure Vessel, a stronger Hollow Knight with new moves. This is the last Pantheon that counts toward 112%: your inventory now reads it.", { requires: ["pantheon-master", "pantheon-artist", "pantheon-sage"] }],
        ["challenge-bindings", ["challenge"], "Track Pantheon bindings and Godhome practice", "Bindings are optional handicaps for any Pantheon run: Nail, Shell, Charms and Soul. Each binding you clear on a Pantheon for the first time fills a notch around the locked door left of the Hall of Gods; the first major notch opens it and adds Lifeblood masks to your Pantheon runs. Bound clears also add Lifeblood cocoons to each Pantheon’s hot spring room. Like Ascended and Radiant wins in the Hall of Gods, none of it counts toward 112%."],
      ],
    },
    {
      title: "Godhome’s peak",
      location: "Godhome",
      sources: [["Steam guide ch 30 · the way up, Pure Completion with Embrace the Void", steam], ["fextralife · Godhome: the upper area’s hot springs", `${fxl}Godhome`], ["Hollow Knight wiki · Pantheon of Hallownest: entry, 42 bosses, rest rooms", "https://hollowknight.wiki/w/Pantheon_of_Hallownest"], ["Hollow Knight wiki · achievements only after an ending", "https://hollowknight.wiki/w/Completion_(Hollow_Knight)"], ["Hollow Knight wiki · the two Godhome endings, and where the save loads", "https://hollowknight.wiki/w/Endings_(Hollow_Knight)"]],
      rows: [
        ["route-godhome-upper", ["route"], "Climb to Godhome’s upper area", "Clearing the Pantheon of the Knight opens Godhome’s upper area: strike the structure above its door and climb. A hot spring waits partway, and a bench up the outer wall on the right: rest there.", { requires: ["pantheon-knight"] }],
        ["challenge-hallownest", ["challenge"], "Attempt the Pantheon of Hallownest", "The fifth Pantheon is at the very top; you need Void Heart to enter. It runs 42 bosses, with rest rooms between sets, each with a bench and a hot spring. Neither it nor its bindings add anything to the game’s own percentage, but the bar counts this row.", { requires: ["route-godhome-upper"] }],
        ["ending-embrace-void", ["ending"], "Record Embrace the Void before gifting the flower", "Clear the Pantheon of Hallownest and defeat Absolute Radiance at its end before you give the Godseeker a flower: after that, this ending only plays in the flower’s version.", { requires: ["challenge-hallownest"] }],
        ["achievement-pure-completion", ["achievement"], "Finish an ending with 112% on your file", "With your inventory at 112%, that clear gives the game’s completion achievements, Pure Completion among them: they come only after an ending (on Switch it lists them itself, as Feats). If the fifth Pantheon is beyond you for now, any ending gives them: beat the Radiance again at the Black Egg, and come back for the rest of this chapter once you can clear it. After the Pantheon your save loads again in Godhome. From here to the grave, don’t rest at a bench."],
      ],
    },
    {
      title: "The Traitor’s Child’s grave",
      location: "Queen’s Gardens",
      note: "Walk out to the grave clearing everything, and back the same way: a rest at a bench brings the enemies back.",
      sources: [["Steam guide ch 26 and 30 · the way out of Godhome and the flower’s route", steam], ["fextralife · Delicate Flower: more flowers at the grave", `${fxl}Delicate+Flower`], ["ludo.guide · clearing the flower’s way without resting", "https://www.ludo.guide/guide/hollow-knight/resting-grounds-part-3"], ["Hollow Knight wiki · the grave’s new flowers", "https://hollowknight.wiki/w/Delicate_Flower"]],
      rows: [
        ["route-flower-godseeker", ["route"], "Take a flower from the grave in Queen’s Gardens", "Leave Godhome where you came in, by the Godseeker, and go back out through the pipe, killing the Flukemungas. Go up into the Waterways bench room without resting, west to Cornifer’s room and through the door its lever opened into the Fungal Wastes, as chapter 5 ended. Go up past the bench below the Mantis Village, again without resting, and on to Queen’s Station; then left into Fog Canyon and under the thorns into the Gardens, and chapter 8’s flower walk to the grave. Kill everything on the way. Take a Delicate Flower from the grave."],
      ],
    },
    {
      title: "The flower for the Godseeker",
      location: "Junk Pit",
      sources: [["fextralife · Delicate Flower: what breaks it", `${fxl}Delicate+Flower`], ["Hollow Knight wiki · who accepts a Delicate Flower", "https://hollowknight.wiki/w/Delicate_Flower"], ["Hollow Knight wiki · what breaks a Delicate Flower", "https://hollowknight.wiki/w/Delicate_Flower_(Quest)"]],
      rows: [
        ["quest-godseeker-flower", ["quest"], "Give the Godseeker a Delicate Flower after Embrace the Void", "Carry it back the same way, through the rooms you’ve cleared, to the Godseeker in the Junk Pit, without taking a hit, riding a Stag or warping by Dreamgate; trams are safe. If it breaks, rest at the Gardens’ Stag Station by the grave for a new one, and the rooms fill again. Give it to her once Embrace the Void is done.", { requires: ["ending-embrace-void", "route-flower-godseeker"] }],
      ],
    },
    {
      title: "Godhome’s peak again",
      location: "Godhome",
      sources: [["Hollow Knight wiki · the two Godhome endings", "https://hollowknight.wiki/w/Endings_(Hollow_Knight)"]],
      rows: [
        ["ending-delicate-flower", ["ending"], "Record the flower version of the Godhome ending", "Dream Nail her back into Godhome, climb to the top and clear the Pantheon of Hallownest again. The ending now plays the flower’s scene; it’s a version of Embrace the Void and shares its achievement.", { requires: ["quest-godseeker-flower"] }],
      ],
    },
    {
      title: "The Hunter",
      location: "Greenpath",
      sources: [["Steam guide ch 30 · the Fluke Hermit’s grate", steam], ["fextralife · the Hunter’s Journal achievements", `${fxl}Trophy_and_Achievement_Guide`], ["game-checklists · the journal’s entries and the ones found by looking", "https://game-checklists.com/hollow-knight/hunters-journal-checklist/"], ["TheGamer · the Hunter’s Journal and the Hunter’s Mark", "https://www.thegamer.com/hollow-knight-hunters-journal-complete-guide/"], ["ScriptersWar map · the grate", sw], ["Hollow Knight wiki · the way up below the Nailsmith’s forge", "https://hollowknight.wiki/w/Royal_Waterways"]],
      rows: [
        ["route-junk-pit-city", ["route"], "Climb out of the Junk Pit into the City", "From the pit’s far side, cross the platforms to a ledge above where you came in, go through the crack in the wall and up to a high pool, swim under the wall to the right and break the grate: the Fluke Hermit. Climb on up into the City below the Nailsmith’s hut; this way only goes up. Walk to the City Storerooms and ride the Stag to Greenpath.", { place: "Junk Pit" }],
        ["achievement-keen-hunter", ["achievement"], "Record every creature in the Hunter’s Journal", "From Greenpath’s Stag, go down the shaft and on to the Hunter, behind the toothed door below Cornifer’s old spot, the way chapter 2 came the other way. Keen Hunter wants every required entry recorded; a few come from looking rather than killing, like the fossil Goam in the Crossroads, the Garpede corpse in Deepnest and the tank in the Teacher’s Archives. The optional entries, among them the Grimmkin, the Zotes, the Nailmasters in Godhome and the bosses of the endings, don’t count."],
        ["achievement-true-hunter", ["achievement"], "Receive the Hunter’s Mark from the Hunter", "True Hunter wants every required creature killed as many times as its entry asks; then visit the Hunter for the Hunter’s Mark. Bosses’ summons don’t count. This ends the first save.", { requires: ["achievement-keen-hunter"] }],
      ],
    },
  ],
} satisfies RawChapter;

import type { Missable } from "@hundo/core/types";

const steam = "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947";
const fextralifeTroupe = "https://hollowknight.wiki.fextralife.com/The+Grimm+Troupe+(Quest)";

/** What can be lost for good, in route order. None of it costs a point of the game's own completion, but eight of the nine are board rows a save can't get back once it has gone past them (four quest steps, the two endings, the Arcane Egg and the Beast's Den Seal), so the bar needs them; the Troupe's finale is on the board too and is the same either way. The Nailsmith's request is a one-way choice (choices.ts), not a missable. */
export const missables: Missable[] = [
  {
    id: "quest-zote-greenpath",
    why: "Free Zote from the Vengefly King on this visit: once you have the movement ability after the cloak, he dies in the trap and his later steps go with him.",
    sources: ["https://hollowknight.wiki/w/Zote_the_Mighty", "https://hollowknight.wiki.fextralife.com/Zote+the+Mighty"],
  },
  {
    id: "quest-quirrel-station",
    why: "Talk to Quirrel on your first visit to Queen’s Station: he’s gone once you leave the station or get your next movement ability.",
    sources: ["https://hollowknight.wiki/w/Quirrel", steam],
  },
  {
    id: "quest-cloth-basin",
    why: "Meet Cloth here before you beat the boss of a much later garden: after that, she can’t be met here and her story goes elsewhere.",
    sources: ["https://hollowknight.wiki/w/Cloth", steam],
  },
  {
    id: "hallownest-seal-beasts-den",
    why: "Let the den’s bench trap carry you in before you beat Herrah: beat her without ever having been trapped, and this Seal can’t be reached again.",
    sources: ["https://scripterswar.com/hollowknight/map", "https://steamcommunity.com/sharedfiles/filedetails/?id=936948247"],
  },
  {
    id: "pickup-lifeblood-egg",
    why: "Take the Arcane Egg before the Lifeblood Core: picking up the charm throws you out and seals the room for good.",
    sources: ["https://hollowknight.wiki/w/Lifeblood_Core", steam],
  },
  {
    id: "ending-hollow-knight",
    why: "See this ending before you take Void Heart: once you hold it, the fight only leads to the other endings.",
    sources: ["https://hollowknight.wiki/w/Endings_(Hollow_Knight)", "https://hollowknight.wiki.fextralife.com/Endings"],
  },
  {
    id: "quest-divine",
    why: "Buy the Unbreakable upgrades before you banish the Troupe: Divine leaves with the Troupe, and a charm she holds is left in Dirtmouth, still Fragile.",
    sources: ["https://hollowknight.wiki/w/Divine", fextralifeTroupe],
  },
  {
    id: "troupe-finale-grimm-finale",
    why: "For Banishment, break the Nightmare Lantern’s brazier once Brumm has spoken: leave the room first and only Nightmare King Grimm is left.",
    sources: ["https://hollowknight.wiki/w/Brumm", fextralifeTroupe],
  },
  {
    id: "ending-embrace-void",
    why: "Beat the Pantheon of Hallownest before you give the Godseeker a Delicate Flower: after that, the fight ends in the flower’s version.",
    sources: ["https://hollowknight.wiki/w/Endings_(Hollow_Knight)", "https://hollowknight.wiki.fextralife.com/Endings"],
  },
];

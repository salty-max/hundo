import type { RawChapter } from "@hundo/core/types";

export default {
  id: 13,
  title: "A Second Save",
  region: "City of Tears",
  teaser: "Second save",
  intro: "The first save spared the Nailsmith. Striking him down instead, for Purity, is for another save: start a new one and play it as far as the Pure Nail.",
  sources: [["Hollow Knight wiki · the Nailsmith: his request, both answers and their achievements", "https://hollowknight.wiki/w/Nailsmith"], ["Fextralife · A Nailsmith’s Obsession: the Pure Nail and his last request", "https://hollowknight.wiki.fextralife.com/A+Nailsmith's+Obsession"]],
  groups: [
    {
      title: "The Nailsmith’s other answer",
      location: "City of Tears",
      sources: [["Hollow Knight wiki · Pale Ore: all six in the game", "https://hollowknight.wiki/w/Pale_Ore"], ["Fextralife · Pale Ore", "https://hollowknight.wiki.fextralife.com/Pale+Ore"], ["Hollow Knight wiki · the Nailsmith: upgrade costs and Purity", "https://hollowknight.wiki/w/Nailsmith"]],
      rows: [
        ["quest-nailsmith-purity", ["quest"], "Strike the Nailsmith down", "On the new save, bring him all six Pale Ore (this guide takes them in chapters 5, 5, 5, 6, 8 and 11) and 7,050 Geo over his four upgrades (250, 800, 2,000 and 4,000). When the Pure Nail is done and he asks you to strike him down, do it, and you get Purity."],
      ],
    },
  ],
} satisfies RawChapter;

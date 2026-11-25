import type { Questlines } from "@hundo/core/types";

// Errands that take more than one visit, as lines of rows in route order. A name says only what the line's first step already says.
export const questlines: Questlines = {
  tab: "Quests",
  title: "Quests",
  intro: "Errands that take more than one visit, in order, as far as you’ve revealed. Ticking a step here ticks it in the guide.",
  cover: ["quest"],
  lines: [
    {
      id: "zalen",
      name: "Zalen the bard",
      steps: ["quest-zalen-forgotten-ruins", "quest-zalen-nameless-ruins", "quest-zalen-damdara", "quest-zalen-cantlin", "quest-zalen-galenholm", "quest-zalen-field-of-flowers", "quest-zalen-western-isle", "equip-erdricks-helm", "quest-zalen-rimuldar"],
    },
    {
      id: "sigils",
      name: "Gifts for the faeries",
      steps: ["item-wellspring-crystal", "sigil-soul", "sigil-water", "item-moonbeam-dew", "sigil-moon", "item-undying-flame", "sigil-sun", "item-stardust", "sigil-star"],
    },
  ],
};

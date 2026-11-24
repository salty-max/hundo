import type { Questlines } from "@hundo/core/types";

// Unlocks that lead from one to the next, as lines of rows in route order. A name says only what the line's first step already says.
export const questlines: Questlines = {
  tab: "Chains",
  title: "Unlock chains",
  intro: "Unlocks that lead from one to the next, in order, as far as you’ve revealed. Ticking a step here ticks it in the guide.",
  lines: [
    { id: "missing-poster", name: "The Missing Poster", steps: ["trinket-missing-poster", "character-the-lost"] },
    { id: "key-pieces", name: "The key pieces", steps: ["route-key-pieces", "item-dads-key", "route-golden-gate", "character-apollyon"] },
    { id: "broken-shovel", name: "The Broken Shovel", steps: ["route-broken-shovel", "character-the-forgotten", "pickup-bone-heart"] },
    { id: "knife-pieces", name: "The knife pieces", steps: ["route-knife-pieces", "area-a-strange-door", "route-dads-note", "item-red-key"] },
  ],
};

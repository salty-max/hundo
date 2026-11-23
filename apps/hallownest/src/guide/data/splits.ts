import type { Split } from "@hundo/core/types";

/**
 * Bundled rows split into rows of their own (docs/chapter-data.md, Splitting a row). Each `from` is retired for good and stays here:
 * a save, a backup or a device that has it ticked or set aside has every part ticked or set aside instead. A part is always a new row:
 * what a bundle held that already had a row of its own (Troupe Master Grimm) stays out, so a bundle's untick on another device can
 * never clear that row's own tick.
 */
export const splits: Split[] = [
  {
    from: "quest-grimm-flames-one",
    into: ["quest-grimm-novice-peak", "quest-grimm-novice-storerooms", "quest-grimm-novice-greenpath", "quest-grimm-novices-shown", "quest-grimm-master-pass", "quest-grimm-master-grounds", "quest-grimm-master-edge"],
  },
  { from: "quest-zote-arena", into: ["quest-zote-colosseum", "quest-zote-home"] },
  { from: "quest-divine", into: ["quest-divine-greed", "quest-divine-heart", "quest-divine-strength"] },
];

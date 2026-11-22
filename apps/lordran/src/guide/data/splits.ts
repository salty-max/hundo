import type { Split } from "@hundo/core/types";

/**
 * Bundled rows split into rows of their own (docs/chapter-data.md, Splitting a row). Each `from` is retired for good and stays here:
 * a save, a backup or a device that has it ticked or set aside has every part ticked or set aside instead. A part is always a new row:
 * what a bundle held that already had a row of its own (a ring, a spell, a rare weapon) stays out, so a bundle's untick on another
 * device can never clear that row's own tick.
 */
export const splits: Split[] = [
  { from: "pickup-firelink-graveyard", into: ["pickup-caduceus-round-shield", "pickup-winged-spear", "pickup-zweihander"] },
  { from: "pickup-depths-weapons", into: ["pickup-depths-greataxe", "pickup-heavy-crossbow"] },
  { from: "pickup-iaito", into: ["pickup-blighttown-iaito", "pickup-shadow-set"] },
  { from: "pickup-anor-entry-chests", into: ["pickup-anor-twinkling-chest", "pickup-crystal-halberd", "pickup-anor-demon-titanite"] },
  { from: "extra-township-carvings", into: ["extra-carving-im-sorry", "extra-carving-very-good", "extra-carving-help-me", "extra-carvings-gough"] },
  { from: "pickup-sens-scavenger", into: ["pickup-shotel", "pickup-black-sorcerer-set"] },
  { from: "pickup-havel-trove", into: ["pickup-havel-set", "pickup-occult-club"] },
  { from: "pickup-painted-tower", into: ["pickup-red-sign-soapstone"] },
  { from: "pickup-painted-annex", into: ["pickup-black-cleric-set"] },
  { from: "boss-kalameet", into: ["boss-black-dragon-kalameet", "forge-kalameet-slab"] },
];

import type { Brand } from "@hundo/core/types";

/** Names, colours, storage and fonts. Also read by the build for the manifest and the page head. */
export const brand = {
  id: "dragon-quest-i-hd-2d",
  name: "Alefgard Hundo",
  shortName: "Alefgard",
  title: "Alefgard Hundo · Dragon Quest I HD-2D Remake 100% checklist",
  description: "A spoiler-aware 100% route through Dragon Quest I HD-2D Remake: every Mini Medal, scroll and Secret Spot, and the equipment on the way, in Alefgard’s order.",
  storagePrefix: "hundo-alefgard",
  backupFile: "alefgard-hundo-progress.json",
  mark: "Alefgard",
  game: "Dragon Quest I HD-2D Remake",
  publisher: "Square Enix",
  corners: "narrow",
  home: "https://alefgard.hundo.quest",
  fonts: {
    display: { family: "Almendra", file: "almendra.woff2", weight: "700", fallback: "Georgia,serif" },
    sans: { family: "Figtree", file: "figtree.woff2", weight: "300 900", fallback: "system-ui,sans-serif" },
  },
} satisfies Brand;

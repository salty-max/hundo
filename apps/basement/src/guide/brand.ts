import type { Brand } from "@hundo/core/types";

/** Names, colours, storage and fonts. Also read by the build for the manifest and the page head. */
export const brand = {
  id: "binding-of-isaac",
  name: "Basement Hundo",
  shortName: "Basement",
  title: "Basement Hundo · The Binding of Isaac: Repentance+ path to Dead God",
  description: "A spoiler-aware path to Dead God in The Binding of Isaac: Repentance+, with every secret and every Hard completion mark in a sensible order.",
  storagePrefix: "hundo-basement",
  backupFile: "basement-hundo-progress.json",
  mark: "Basement",
  game: "The Binding of Isaac",
  publisher: "Nicalis",
  corners: "normal",
  home: "https://basement.hundo.quest",
  fonts: {
    display: { family: "Kalam", file: "kalam.woff2", weight: "700", fallback: "'Comic Sans MS','Chalkboard SE',cursive" },
    sans: { family: "Atkinson Hyperlegible Next", file: "atkinson-hyperlegible-next.woff2", weight: "200 800", fallback: "system-ui,sans-serif" },
  },
} satisfies Brand;

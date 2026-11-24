import type { Brand } from "@hundo/core/types";

/** Names, colours, storage and fonts. Also read by the build for the manifest and the page head. */
export const brand = {
  id: "mina-the-hollower",
  name: "Tenebrous Hundo",
  shortName: "Tenebrous",
  title: "Tenebrous Hundo · Mina the Hollower 100% checklist",
  description: "A spoiler-aware 100% route through Mina the Hollower: the collectibles the game counts, with the bosses, weapons, sidearms and tasks, in the island’s order.",
  storagePrefix: "hundo-tenebrous",
  backupFile: "tenebrous-hundo-progress.json",
  mark: "Tenebrous",
  game: "Mina the Hollower",
  publisher: "Yacht Club Games",
  corners: "narrow",
  home: "https://tenebrous.hundo.quest",
  fonts: {
    display: { family: "Texturina", file: "texturina.woff2", weight: "700", fallback: "Georgia,serif" },
    sans: { family: "Libre Franklin", file: "libre-franklin.woff2", weight: "100 900", fallback: "system-ui,sans-serif" },
  },
} satisfies Brand;

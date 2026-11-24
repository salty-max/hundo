import type { RawChapter } from "@hundo/core/types";

export default {
  id: 19,
  title: "New Game Plus",
  region: "New Game Plus",
  teaser: "Further journeys",
  intro: "New Game Plus, played on a save of its own so the collection save stays as it is.",
  sources: [["Further-play reference", "https://meowdb.com/db/mina-the-hollower/new-game-plus"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "A separate replay profile",
      location: "A new save",
      rows: [
        ["ngplus-rules", ["outside"], "Read what New Game Plus carries over", "Read the game’s own explanation before you start.", {"reference": "https://meowdb.com/db/mina-the-hollower/new-game-plus"}],
        ["ngplus-start", ["outside"], "Start New Game Plus on another save", "Keep your finished collection save, and play New Game Plus on a different one.", {"reference": "https://meowdb.com/db/mina-the-hollower/new-game-plus"}],
        ["ngplus-clear", ["outside"], "Play the island through again", "Finish a New Game Plus run.", {"reference": "https://meowdb.com/db/mina-the-hollower/new-game-plus"}],
      ],
    },
  ],
} satisfies RawChapter;

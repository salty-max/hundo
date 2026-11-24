import type { RawChapter } from "@hundo/core/types";

export default {
  id: 19,
  title: "New Game Plus",
  region: "New Game Plus",
  teaser: "Further journeys",
  intro: "Keep the finished collection file separate from optional replay rounds and inspect each round’s changes in game.",
  sources: [["Further-play reference", "https://meowdb.com/db/mina-the-hollower/new-game-plus"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "A separate replay profile",
      location: "A new save",
      rows: [
        ["ngplus-start", ["outside"], "Start New Game Plus only after preserving your finished save", "Use the game’s post-clear replay option and keep a backup if your platform supports one.", {"reference": "https://meowdb.com/db/mina-the-hollower/new-game-plus"}],
        ["ngplus-rules", ["outside"], "Inspect the New Game Plus rules before committing", "Read the current in-game carryover and difficulty explanation.", {"reference": "https://meowdb.com/db/mina-the-hollower/new-game-plus"}],
        ["ngplus-clear", ["outside"], "Complete the replay on its own terms", "Follow the regional route again, adjusting for the replay’s tougher encounters.", {"reference": "https://meowdb.com/db/mina-the-hollower/new-game-plus"}],
      ],
    },
  ],
} satisfies RawChapter;

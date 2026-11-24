import type { RawChapter } from "@hundo/core/types";

export default {
  id: 5,
  title: "Completion sweep",
  region: "All territories",
  teaser: "All territories",
  intro: "Finish the last unlocks, then compare the field checklist with Stats → General in your game. The checklist lets you jump back to any missed requirement.",
  groups: [
    {
      title: "The final Stranger task",
      location: "Blackwater · Lake Don Julio · Río del Toro",
      sources: [
        ["iRedDead · Stranger tasks", "https://www.ireddead.com/rdr/guides/stranger-side-mission-list"],
      ],
      rows: [
        ["stranger-remember-my-family", ["stranger", "stranger-step"], "Remember My Family", "After The Last Enemy That Shall Be Destroyed, speak to the agent at Blackwater station. Ask at the marked cabin by Lake Don Julio, then visit Phillip at the river camp near Río del Toro. Follow the river to the final marker and win the duel. Let the credits run before returning to the cleanup checklist.", { reference: "https://www.ireddead.com/rdr/guides/remember-my-family" }],
      ],
    },
    {
      title: "Postgame uniform unlocks",
      location: "Blackwater · New Austin",
      sources: [
        ["iRedDead · outfits", "https://www.ireddead.com/rdr/guides/outfits"],
      ],
      rows: [
        ["scrap-army-6", ["scrap"], "U.S. Army 6 · Blackwater tailor", "After The Last Enemy That Shall Be Destroyed, buy the U.S. Military Scrap from the Blackwater tailor.", { reference: "https://www.ireddead.com/rdr/maps/us-army-uniform", map: ["iRedDead", "https://www.ireddead.com/rdr/maps/us-army-uniform"] }],
        ["outfit-army", ["outfit"], "U.S. Army Uniform", "Collect the five West Elizabeth scraps and buy the final Blackwater tailor scrap after the story. Check the complete uniform in the Outfits menu.", { reference: "https://www.ireddead.com/rdr/maps/us-army-uniform", map: ["iRedDead", "https://www.ireddead.com/rdr/maps/us-army-uniform"] }],
        ["outfit-marshal", ["outfit"], "U.S. Marshal Uniform", "After The Last Enemy That Shall Be Destroyed, clear five New Austin hideouts within one in-game day. Start at Pike’s Basin and ride through Twin Rocks, Fort Mercer, Tumbleweed, then Gaptooth Breach. Stock up before the first clear, ride directly between hideouts, and avoid sleeping or fast travel. Aim to finish within the window without dying. Confirm the uniform unlock after the fifth clear.", { reference: "https://www.ireddead.com/rdr/maps/us-marshal-uniform", map: ["iRedDead", "https://www.ireddead.com/rdr/maps/us-marshal-uniform"] }],
      ],
    },
    {
      title: "Final safehouse",
      location: "Beecher’s Hope",
      sources: [
        ["iRedDead · safehouses", "https://www.ireddead.com/rdr/guides/safehouses"],
      ],
      rows: [
        ["safehouse-beechers-final", ["safehouse"], "Beecher’s Hope · second room", "The other save room becomes available after The Last Enemy That Shall Be Destroyed. Check the unlocked property in the ranch house."],
      ],
    },
  ],
} satisfies RawChapter;

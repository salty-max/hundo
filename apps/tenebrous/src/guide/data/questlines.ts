import type { Questlines } from "@hundo/core/types";

// Tasks that lead from one step to the next, as lines of rows in route order. A name says only what the line's first step already says.
export const questlines: Questlines = {
  tab: "Tasks",
  title: "Island tasks",
  intro: "Tasks that take more than one visit, in order, as far as you’ve revealed. Ticking a step here ticks it in the guide.",
  lines: [
    { id: "guild", name: "The Guild rescue", steps: ["quest-rhene-cell", "quest-rhene-rescue", "quest-drillhardt", "underlab-isle-map"] },
    { id: "school", name: "The missing children", steps: ["quest-school-intro", "quest-child-one", "quest-child-two", "quest-child-three", "trinket-lightning-grip"] },
    { id: "jug", name: "Buffo’s request", steps: ["quest-gluttons-jug", "trinket-plasma-jug"] },
    { id: "couple", name: "The separated couple", steps: ["quest-fian-rescue", "trinket-thermal-pack"] },
    { id: "band", name: "The band’s missing member", steps: ["route-generator-bayou", "trinket-tumbling-tutu"] },
    { id: "duke", name: "The Duke’s request", steps: ["route-duke-escort", "boss-duchess", "trinket-proto-spark"] },
    { id: "snowball", name: "A winter delivery", steps: ["route-snowball-return", "trinket-dummy-cache"] },
    { id: "poppit", name: "The hidden merchants", steps: ["trinket-willow-the-wisp", "trinket-helio-the-wisp", "trinket-keri-the-wisp", "gear-disturbing-dance"] },
    { id: "blaise", name: "The station races", steps: ["gear-train-pass", "quest-blaise-first-race", "trinket-bellows-bustle", "kear-ossex-blaise-final-race"] },
    { id: "rupert", name: "The icy crossing", steps: ["quest-rupert", "trinket-watchful-eye", "kear-coltrane-rail-yard-room-rupert"] },
    { id: "choir", name: "The Manor choir", steps: ["route-manor-choir", "route-manor-performance", "bonestone-manor-meowstros-chamber"] },
  ],
};

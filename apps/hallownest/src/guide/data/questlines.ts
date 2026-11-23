import type { Questlines } from "@hundo/core/types";

export const questlines = {
  "tab": "Quests",
  "title": "Hallownest questlines",
  "intro": "Find selected NPC routes as far as you have revealed them. Their checks are shared with the walkthrough.",
  "cover": [
    "quest"
  ],
  "lines": [
    {
      "id": "elderbug",
      "name": "Elderbug",
      "steps": [
        "quest-elderbug"
      ]
    },
    {
      "id": "quirrel",
      "name": "Quirrel",
      "steps": [
        "quest-quirrel-temple",
        "quest-lake-quirrel",
        "quest-quirrel-station",
        "quest-quirrel-mantis",
        "quest-quirrel-monument",
        "quest-quirrel-deepnest",
        "quest-quirrel-archives",
        "boss-uumuu",
        "dreamer-monomon",
        "quest-quirrel-lake"
      ]
    },
    {
      "id": "sly",
      "name": "Sly",
      "steps": [
        "quest-sly-rescue",
        "quest-sly-key",
        "charm-nailmaster-glory"
      ]
    },
    {
      "id": "myla",
      "name": "Myla",
      "steps": [
        "quest-myla-intro"
      ]
    },
    {
      "id": "zote",
      "name": "Zote",
      "steps": [
        "quest-zote-greenpath",
        "quest-zote-deepnest",
        "quest-zote-arena",
        "dream-boss-grey-prince-zote"
      ]
    },
    {
      "id": "bretta",
      "name": "Bretta",
      "steps": [
        "quest-bretta-rescue",
        "mask-shard-bretta",
        "quest-zote-arena",
        "dream-boss-grey-prince-zote"
      ]
    },
    {
      "id": "leg-eater",
      "name": "Leg Eater",
      "steps": [
        "quest-leg-eater",
        "charm-fragile-heart",
        "charm-fragile-greed",
        "charm-fragile-strength",
        "quest-divine"
      ]
    },
    {
      "id": "cloth",
      "name": "Cloth",
      "steps": [
        "quest-cloth-fungal",
        "quest-cloth-basin",
        "quest-cloth-gardens",
        "boss-traitor-lord",
        "quest-cloth-farewell"
      ]
    },
    {
      "id": "nailsmith",
      "name": "The Nailsmith",
      "steps": [
        "quest-city-nailsmith",
        "forge-channelled-nail",
        "forge-coiled-nail",
        "forge-pure-nail",
        "quest-nailsmith-sheo",
        "quest-nailsmith-purity"
      ]
    },
    {
      "id": "lemm",
      "name": "Relic Seeker Lemm",
      "steps": [
        "quest-lemm-first"
      ]
    },
    {
      "id": "jiji",
      "name": "Confessor Jiji",
      "steps": [
        "quest-jiji"
      ]
    },
    {
      "id": "white-lady",
      "name": "The White Lady",
      "steps": [
        "quest-white-lady",
        "charm-kingsoul"
      ]
    },
    {
      "id": "millibelle",
      "name": "Millibelle",
      "steps": [
        "quest-millibelle-bank",
        "quest-millibelle-spa"
      ]
    },
    {
      "id": "grey-mourner",
      "name": "The Grey Mourner",
      "steps": [
        "quest-flower-start",
        "quest-flower-grave",
        "mask-shard-flower"
      ]
    },
    {
      "id": "seer",
      "name": "The Seer",
      "steps": [
        "dream-milestone-dream-nail",
        "pale-ore-seer-ore",
        "charm-dream-wielder",
        "vessel-fragment-seer-vessel",
        "quest-seer-dreamgate",
        "mask-shard-seer-mask",
        "dream-milestone-seer-awoken",
        "dream-milestone-seer-final"
      ]
    },
    {
      "id": "stag",
      "name": "The Stag",
      "steps": [
        "stag-crossroads",
        "stag-stagnest",
        "vessel-fragment-stag-nest",
        "quest-stag-nest"
      ]
    },
    {
      "id": "cartography",
      "name": "Cornifer",
      "steps": [
        "map-crossroads",
        "quest-cornifer-home"
      ]
    },
    {
      "id": "mister-mushroom",
      "name": "Mister Mushroom",
      "steps": [
        "quest-mushroom-fungal",
        "quest-mushroom-edge",
        "quest-mushroom-deepnest",
        "quest-mushroom-mato",
        "quest-mushroom-basin",
        "quest-mushroom-canyon",
        "quest-mushroom-pass"
      ]
    },
    {
      "id": "grimm",
      "name": "The Nightmare Lantern",
      "steps": [
        "quest-nightmare-lantern",
        "charm-grimmchild",
        "quest-grimm-flames-one",
        "boss-troupe-master-grimm",
        "notch-grimm-notch",
        "quest-divine",
        "troupe-finale-grimm-finale"
      ]
    },
    {
      "id": "godseeker",
      "name": "The Godseeker",
      "steps": [
        "godtuner-godtuner",
        "ending-embrace-void",
        "quest-godseeker-flower",
        "ending-delicate-flower"
      ]
    }
  ]
} satisfies Questlines;

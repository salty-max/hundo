import type { RawChapter } from "@hundo/core/types";

export default {
  id: 1,
  title: "Loner’s Landing",
  region: "Loner’s Landing",
  teaser: "Loner’s Landing",
  intro: "Learn the burrow, escape the docks and begin a collection-focused journey.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/loners-landing"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "Before leaving the wreck",
      location: "Loner’s Landing",
      rows: [
        ["route-starting-weapon", ["route"], "Choose a starting weapon below decks", "Try Nightstar, Blaststrike Maul or Whisper and Vesper, then break the yellow rubble to leave.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/loners-landing"}],
        ["route-nether-kraken", ["route"], "Fight through the opening attack", "Go upstairs and engage the Nether Kraken.", {"reference": "https://www.gamerguides.com/mina-the-hollower/guide/walkthrough/prologue/shipwrecked/"}],
        ["quest-cappy", ["quest"], "Talk to Cappy on the wreck", "Cappy hands you your first vials before you leave the ship.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/loners-landing"}],
        ["route-burrow-basics", ["route"], "Use the first Underlab and practice burrow-jumps", "Enter the purple ground opening to establish a checkpoint.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/loners-landing"}],
      ],
    },
    {
      title: "Blighted Docks",
      location: "Loner’s Landing",
      rows: [
        ["route-docks", ["route"], "Clear the dock paths before following the fire", "Search the path by the fence and the side cave, then cross the docks.", {"reference": "https://www.gamerguides.com/mina-the-hollower/guide/walkthrough/prologue/loners-landing-blighted-docks"}],
        ["bonestone-landing-blighted-docks-fence", ["bonestone"], "Get the Bonestone: bushes behind a fence, screen past the first Underlab", "Bushes behind a fence past the first Underlab; clear them with Volt Hatchet or go round, burrow in from above.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Loner’s Landing"}],
        ["bonestone-landing-blighted-docks-side-room", ["bonestone"], "Get the Bonestone: Blighted Docks Side Room", "By the first Underlab, burrow the left opening, hop small platforms, beat the owl guarding the chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Loner’s Landing"}],
        ["bonestone-landing-blighted-docks-guard-room", ["bonestone"], "Get the Bonestone: Blighted Docks Guard Room", "Residence past three Rebels, cracked door, thrown boulders; 200 Flakes.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Loner’s Landing"}],
        ["bonestone-landing-blighted-docks-bridge", ["bonestone"], "Get the Bonestone: Blighted Docks Bridge", "High ledge reached under the bridge, up two ropes past Rebels and a guard.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Loner’s Landing"}],
        ["kear-landing-blighted-docks-room-bubble", ["kear"], "Get the Kear: Tower hole past the shipwreck", "Cross the back-left bridge, clear enemies at a small tower with a cracked door, strike it open and follow the underground route.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Loner’s Landing"}],
      ],
    },
    {
      title: "The Boardwalk",
      location: "Loner’s Landing",
      rows: [
        ["route-boardwalk", ["route"], "Cross the Boardwalk with the puffballs", "Keep to the platforms around the flames.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/loners-landing"}],
        ["kear-landing-boardwalk-fire-bounce", ["kear"], "Get the Kear: Wildfire arena secret area", "Moving platform to a high-jump flower, launch into the hidden bottom-right area, beat two guards by the chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Loner’s Landing"}],
      ],
    },
    {
      title: "Toward Ossex",
      location: "Loner’s Landing",
      rows: [
        ["sidearm-gyro-dagger", ["sidearm"], "Get Gyro Dagger", "Break the candle by the pillar after the second checkpoint.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/loners-landing"}],
        ["route-to-ossex", ["route"], "Open the passage toward Ossex", "Smash the tree trunk in the way and carry on through the Southern Outskirts toward Ossex.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/southern-outskirts"}],
      ],
    },
  ],
} satisfies RawChapter;

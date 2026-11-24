import type { RawChapter } from "@hundo/core/types";

export default {
  id: 1,
  title: "Loner’s Landing",
  region: "Loner’s Landing",
  teaser: "Loner’s Landing",
  intro: "The wreck, the Blighted Docks and the Boardwalk: learn to burrow, pick your weapon and find the island’s first Bonestones and Kears on the way to Ossex.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/loners-landing"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "Before leaving the wreck",
      location: "Loner’s Landing",
      rows: [
        ["route-starting-weapon", ["route"], "Choose a starting weapon below decks", "Below decks, pick Nightstar, the Blaststrike Maul or Whisper and Vesper, then break the yellow rubble to get out. You can get the other two later, so take the one you like.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/loners-landing"}],
        ["route-nether-kraken", ["route"], "Fight through the opening attack", "Go up on deck and fight the Nether Kraken: keep moving around its attacks and hit back between them.", {"reference": "https://www.gamerguides.com/mina-the-hollower/guide/walkthrough/prologue/shipwrecked/"}],
        ["trinket-uranium-bracelet", ["trinket"], "Win the Uranium Bracelet from the Kraken", "Beating the Nether Kraken gives the Uranium Bracelet. If you miss it here, the Trinket Bazaar in Ossex sells it later.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Ossex"}],
        ["quest-cappy", ["quest"], "Talk to Cappy on the wreck", "Talk to Cappy on deck before you leave the ship: he gives you your first vials.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/loners-landing"}],
      ],
    },
    {
      title: "Blighted Docks",
      location: "Loner’s Landing",
      sources: [["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"], ["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Loner’s Landing and the Blighted Docks (Gamer Guides)", "https://www.gamerguides.com/mina-the-hollower/guide/walkthrough/prologue/loners-landing-blighted-docks"]],
      rows: [
        ["route-burrow-basics", ["route"], "Find the first Underlab", "The purple opening in the ground is an Underlab, where you manage your weapons and trinkets. Burrow under the ground, and jump out of it to clear gaps.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/loners-landing"}],
        ["route-docks", ["route"], "Search the docks off the main path", "Four chests sit off the docks’ main path: two by the first Underlab and two around the broken bridge.", {"reference": "https://www.gamerguides.com/mina-the-hollower/guide/walkthrough/prologue/loners-landing-blighted-docks"}],
        ["bonestone-landing-blighted-docks-side-room", ["bonestone"], "Get the Bonestone in the room beside the Underlab", "Beside the first Underlab, burrow under the left wall into a small room, hop across the narrow platforms and beat the owl that guards the chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests"}],
        ["bonestone-landing-blighted-docks-fence", ["bonestone"], "Get the Bonestone behind the docks’ fence", "Past the first Underlab, smash the two cracked walls and burrow under the fence to the south: the chest sits among the bushes behind it.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests"}],
        ["bonestone-landing-blighted-docks-guard-room", ["bonestone"], "Get the Bonestone in the house by the broken bridge", "On the broken-bridge screen, break the cracked door of the house right of the stairs. Three Rebels wait inside: throw the boulders at them, then open the chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests"}],
        ["bonestone-landing-blighted-docks-bridge", ["bonestone"], "Get the Bonestone above the broken bridge", "From under the broken bridge, climb the ropes on the right and bounce across on the purple jellyfish: the chest is at the end of the high path.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["kear-landing-blighted-docks-room-bubble", ["kear"], "Get the Kear under the cracked tower", "Cross the back-left bridge to the small tower with a cracked door, clear its guards and strike the door open. Follow the passage underground and pop the bubble around the Kear: it opens the gate to the Boardwalk.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
      ],
    },
    {
      title: "The Boardwalk",
      location: "Loner’s Landing",
      sources: [["Loner’s Landing (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/walkthrough/loners-landing"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"], ["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"]],
      rows: [
        ["route-boardwalk", ["route"], "Cross the Boardwalk", "Keep to the platforms around the flames, and look in the hidden corner at the bottom right before you leave.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/loners-landing"}],
        ["kear-landing-boardwalk-fire-bounce", ["kear"], "Get the Kear in the Boardwalk’s hidden corner", "After the moving platforms, bounce off the high-jump flower over the fire into the hidden area at the bottom right: two guards stand by the chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
      ],
    },
    {
      title: "Toward Ossex",
      location: "Loner’s Landing",
      rows: [
        ["sidearm-gyro-dagger", ["sidearm"], "Get Gyro Dagger", "Break the torches by the pillar after the second checkpoint.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/loners-landing"}],
        ["route-to-ossex", ["route"], "Climb into the Southern Outskirts", "Go up the stairs into the Southern Outskirts, then on to Ossex.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/loners-landing"}],
      ],
    },
  ],
} satisfies RawChapter;

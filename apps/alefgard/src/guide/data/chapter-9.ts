import type { RawChapter } from "@hundo/core/types";

export default {
  id: 9,
  title: "The final castle",
  region: "Dragonlord’s Castle",
  teaser: "The final castle",
  intro: "The rainbow bridge leads to the Dragonlord’s Castle. Sweep its side paths for the equipment and the last medal before you face him; a beam of light deep inside takes you out to rest and trade medals, and back.",
  sources: [["Final castle route", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/dragonlords-castle/"], ["Ending branches", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/endings/"], ["Late game reference", "https://www.rpgsite.net/guide/18688-dragon-quest-i-hd-2d-remake-walkthrough-where-to-go-all-mini-medals-secret-spots-step-by-step-guide"], ["Every sparkly spot (Realm of Darkness)", "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"], ["The Dragonlord’s offer, and after the credits (Realm of Darkness)", "https://www.realmofdarkness.net/dq/hd2d-dq-tips/"], ["Zalen’s last steps and the rainbow bridge (Guide Lovers)", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/erdricks-helm/"], ["The castle, the offer and after the credits (Realm of Darkness)", "https://www.realmofdarkness.net/dq/hd2d-dq-dragonlords-castle/"], ["Every Mini Medal and prize (Realm of Darkness)", "https://www.realmofdarkness.net/dq/hd2d-dq-medals/"]],
  groups: [
    {
      title: "The approach and the first floors",
      location: "Rimuldar · Dragonlord’s Castle",
      map: ["Gamer Guides", "https://www.gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/maps/dragonlords-castle-dragon-quest-i"],
      rows: [
        ["story-rainbow-bridge", ["story"], "Make the rainbow bridge northwest of Rimuldar", "Zoom to Rimuldar and follow the marker northwest to the shore: use the Rainbow Drop there and a rainbow bridge appears. Cross it and follow the valleys to the Dragonlord’s Castle, past a sparkly spot in the poison marsh.", {"place": "Rimuldar", "reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/erdricks-helm/", "map": ["Gamer Guides", "https://www.gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/maps/alefgard-dragon-quest-i"]}],
        ["loot-final-side-wings", ["search"], "Search the castle’s first floors", "In the Dragonlord’s Castle, the corner chests on 1F are empty. Before the central descent, take the west side staircase down to B1: a Seed of Wisdom lies hidden in the dead end left of centre, and the chests on B1’s branches are empty too.", {"reference": "https://www.rpgsite.net/guide/18688-dragon-quest-i-hd-2d-remake-walkthrough-where-to-go-all-mini-medals-secret-spots-step-by-step-guide", "place": "Dragonlord’s Castle"}],
        ["equip-cower-ring-dragonlords-castle", ["equipment"], "Find the Cower Ring on the castle’s B1", "In the Dragonlord’s Castle, take the east side staircase down to B1 and search the northeast dead end, from its right side, for a Cower Ring. It’s cursed: leave it unequipped.", {"reference": "https://www.rpgsite.net/guide/18688-dragon-quest-i-hd-2d-remake-walkthrough-where-to-go-all-mini-medals-secret-spots-step-by-step-guide", "place": "Dragonlord’s Castle"}],
        ["equip-steel-broadsword", ["equipment"], "Find the Steel Broadsword in the castle’s southwest passage", "In the Dragonlord’s Castle, go down 1F’s southwest hallway, take the stairs on the right and go north at the fork: the floor plate in the centre of that passage hides a Steel Broadsword.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/dragonlords-castle/", "place": "Dragonlord’s Castle"}],
        ["story-final-throne", ["story"], "Find the stairs behind the empty throne", "Go north to the empty throne in the middle of the castle’s 1F, past the electrified tiles, and examine its back: stairs down appear. In the throne room, the sunlit spot on the left of the open area holds Frazzled Feathers.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/dragonlords-castle/", "place": "Dragonlord’s Castle"}],
      ],
    },
    {
      title: "B2 to B4",
      location: "Dragonlord’s Castle",
      map: ["Gamer Guides", "https://www.gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/maps/dragonlords-castle-dragon-quest-i"],
      note: "Gamer Guides’ map shows each of the castle’s floors and the stairs between them.",
      rows: [
        ["equip-ruinous-shield", ["equipment"], "Open the Ruinous Shield chest on the castle’s B2", "On the Dragonlord’s Castle’s B2, go north, then north again in the open area, to the western chest: it holds the Ruinous Shield. It’s cursed: leave it unequipped.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/dragonlords-castle/"}],
        ["equip-hapless-helm", ["equipment"], "Open the Hapless Helm chest on the castle’s B2", "On the Dragonlord’s Castle’s B2, take the right-hand tunnel at the northeast fork to a chest with the Hapless Helm. It’s cursed: leave it unequipped.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/dragonlords-castle/"}],
        ["loot-final-b3", ["search"], "Search the castle’s B3", "On the Dragonlord’s Castle’s B3, go west at the first fork to a pair of chests with gold and a Medicinal Herb. Elsewhere on B3, south of the northwest stairs, a chest is a Mimic, a chest monster that drops a Sage’s Elixir.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/dragonlords-castle/"}],
        ["equip-hate-mail", ["equipment"], "Open the Hate Mail chest down B3’s northeast stairs", "Down the Dragonlord’s Castle’s B3 northeast stairs, the lone chest on B4’s east side holds Hate Mail. It’s cursed: leave it unequipped.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/dragonlords-castle/"}],
        ["equip-erdricks-sword", ["equipment"], "Climb from B4 to Erdrick’s Sword", "On the Dragonlord’s Castle’s B4, take the northwest of the two central staircases and follow the chain of stairs up to B1: Erdrick’s Sword lies on the ground at the end.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/dragonlords-castle/"}],
      ],
    },
    {
      title: "B5, B6 and the shortcut",
      location: "Dragonlord’s Castle",
      map: ["Gamer Guides", "https://www.gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/maps/dragonlords-castle-dragon-quest-i"],
      rows: [
        ["medal-final-castle", ["mini-medal"], "Take the medal on the castle’s B5", "From Erdrick’s Sword, walk back down the chain of stairs to the Dragonlord’s Castle’s B4 and take the other central staircase, to the centre-east, down to B5: the chest north of the stairs holds a Mini Medal.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/dragonlords-castle/"}],
        ["loot-final-b5", ["search"], "Find the Mimics on the castle’s B4 and B5", "On the Dragonlord’s Castle’s B4, the far north chest is a Mimic, a chest monster that drops a Sage’s Elixir. B4’s far northeast stairs lead down to another part of B5: left at the fork, that path ends at another Mimic.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/dragonlords-castle/"}],
        ["equip-double-edged-sword", ["equipment"], "Open the Double-Edged Sword chest on the castle’s B5", "Take the Dragonlord’s Castle’s far northeast stairs down from B4. On B5, go right at the fork, south, then west to a dead end: the chest holds the Double-Edged Sword. It’s cursed: leave it unequipped.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/dragonlords-castle/"}],
        ["loot-final-b6", ["search"], "Open the nine chests on the castle’s B6", "On the Dragonlord’s Castle’s B6, the room north of the bridge holds nine chests: a Dieamend, 500 gold, a Chimaera Wing, a Mimic that drops a Sage’s Elixir, the Wasteband, a Prayer Ring, 420 gold, a Medicinal Herb and a Seed of Magic. A scene plays there.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/dragonlords-castle/"}],
        ["equip-wasteband", ["equipment"], "Take the Wasteband in the castle’s B6 treasure room", "In the nine-chest room on the Dragonlord’s Castle’s B6, one chest holds the Wasteband. It’s cursed: leave it unequipped.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/dragonlords-castle/"}],
        ["story-final-shortcut", ["story"], "Step into the beam of light on B6", "On the Dragonlord’s Castle’s B6, past the treasure room, follow the poison marsh to its end: a beam of light there links you to the castle’s entrance and back. Use it to rest and trade your medals before you face the Dragonlord.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/dragonlords-castle/"}],
        ["reward-medals-40", ["medal-prize"], "Claim the Gringham Whip at 40 medals", "Bring at least 40 Mini Medals to the Monarch of Medals for the Gringham Whip.", {"place": "Medal Citadel", "reference": "https://www.realmofdarkness.net/dq/hd2d-dq-medals/", "map": ["Gamer Guides", "https://www.gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/maps/citadel-of-the-monarch-of-medals-dragon-quest-i"]}],
      ],
    },
    {
      title: "The offer and final battles",
      location: "Dragonlord’s Castle · Tantegel",
      map: ["Gamer Guides", "https://www.gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/maps/dragonlords-castle-dragon-quest-i"],
      rows: [
        ["ending-dragonlords-offer", ["ending"], "Accept the Dragonlord’s offer, then reload", "Save before you speak to the Dragonlord. Accept his offer every time he asks, to see where it leads: if the game ends there, reload your save; if you wake at Rimuldar’s inn instead, walk back. Then refuse him.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/endings/", "place": "Dragonlord’s Castle"}],
        ["boss-dragonlord", ["boss"], "Refuse the offer and defeat the Dragonlord", "Refuse him and fight. Keep Magic Barrier up against his spells and Spooky Aura and attack with Lightning Slash; don’t spend turns on Wild Side here. Erdrick’s Helm resists his Snooze.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/dragonlords-castle/", "place": "Dragonlord’s Castle"}],
        ["boss-dragonlord-true", ["boss"], "Defeat the Dragonlord’s true form", "The second battle follows at once. Dragon Slash him, keep Dodgy Dance up against his bites, and heal on any turn you’re unsure of; Erdrick’s gear softens his breath and spells. When Gigaslash glows, hold the button for its powered-up version.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/dragonlords-castle/", "place": "Dragonlord’s Castle"}],
        ["ending-dragonlord", ["ending"], "Return to Tantegel and finish the ending", "After the battle you’re back on the world map: Zoom to Tantegel for the throne-room scenes and the credits. The game then puts you back before the final battle, so anything still unticked can be collected afterwards.", {"reference": "https://www.rpgsite.net/guide/18688-dragon-quest-i-hd-2d-remake-walkthrough-where-to-go-all-mini-medals-secret-spots-step-by-step-guide", "map": ["Gamer Guides", "https://www.gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/maps/tantegel-dragon-quest-i"], "place": "Tantegel"}],
      ],
    },
    {
      title: "Sparkly spots on the way",
      location: "Dragonlord’s Castle",
      map: ["Realm of Darkness", "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"],
      note: "Sparkly spots are the blue sparkles on the world map, each a free pile of items. Realm of Darkness’s numbered map shows where each one is.",
      compact: true,
      rows: [
        ["sparkle-south-of-the-dragonlords-castle", ["sparkle"], "Pick up the Frazzled Feathers south of the Dragonlord’s Castle", "The sparkly spot in the poison marsh south of the Dragonlord’s Castle, on the way from the rainbow bridge, holds two Frazzled Feathers and Hextract.", {"place": "Dragonlord’s Castle", "reference": "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"}],
      ],
    },
  ],
} satisfies RawChapter;

import type { RawChapter } from "@hundo/core/types";

export default {
  id: 9,
  title: "The final castle",
  region: "Dragonlord’s Castle",
  teaser: "The final castle",
  intro: "This chapter contains the final dungeon and its boss choices. Take the equipment and medal detours before the fight. You can leave to rest, redeem rewards and return through the dungeon shortcut.",
  sources: [["Final castle route", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/dragonlords-castle/"], ["Final castle cross-check", "https://gamefaqs.gamespot.com/pc/470902-dragon-quest-i-and-ii-hd-2d-remake/faqs/82279/dq1-dragonlords-castle"], ["Final castle map", "https://www.gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/maps/dragonlords-castle-dragon-quest-i"], ["Ending branches", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/endings/"], ["Late game reference", "https://www.rpgsite.net/guide/18688-dragon-quest-i-hd-2d-remake-walkthrough-where-to-go-all-mini-medals-secret-spots-step-by-step-guide"], ["Every sparkly spot (Realm of Darkness)", "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"], ["The Dragonlord’s offer, and after the credits (Realm of Darkness)", "https://www.realmofdarkness.net/dq/hd2d-dq-tips/"]],
  groups: [
    {
      title: "The approach and upper branches",
      location: "Rimuldar · Dragonlord’s Castle",
      rows: [
        ["story-rainbow-bridge", ["story"], "Use the Rainbow Drop northwest of Rimuldar", "Go to the marked shore northwest of town and use the item to create the bridge. Cross to the central landmass and follow the valleys to the castle. Search the sparkle in the marsh along the way.", {"place": "Rimuldar"}],
        ["loot-final-side-wings", ["search"], "Search the castle’s two side-wing routes", "Before taking the central descent, visit both side staircases. One side route has a Cower Ring on B1 and a Steel Broadsword on a marked floor panel above. The other route has a hidden Seed of Wisdom at its B1 dead end. Several visible chests are empty. Mark them opened if you are clearing containers as well as treasures."],
        ["equip-cower-ring-dragonlords-castle", ["equipment"], "Take the Cower Ring on a side wing’s B1", "One side route has a Cower Ring on B1 and a Steel Broadsword on a marked floor panel above. It’s cursed, so read its description before you equip it."],
        ["equip-steel-broadsword", ["equipment"], "Take the Steel Broadsword on a marked floor panel", "One side route has a Cower Ring on B1 and a Steel Broadsword on a marked floor panel above."],
        ["story-final-throne", ["story"], "Find the staircase behind the empty throne", "Return to the central ground-floor throne room. Search the sunlit cracked floor nearby for Frazzled Feathers, then examine the throne from behind to reveal the onward stairs."],
      ],
    },
    {
      title: "B2 to B4",
      location: "Dragonlord’s Castle",
      rows: [
        ["equip-ruinous-shield", ["equipment"], "Open the Ruinous Shield chest on B2", "Follow the newly revealed descent. On B2, take the northern open-area branch to the western chest. This shield is cursed."],
        ["equip-hapless-helm", ["equipment"], "Open the Hapless Helm chest on B2", "Explore the northeastern branch before descending again. The southern chest on the onward route is a Mimic. Check your HP and use Peep before opening doubtful containers. Explore the northwestern B4 passage for its separate Mimic before taking the central detour. It’s cursed, so read its description before you equip it."],
        ["loot-final-b3", ["search"], "Search B3’s southwest chests and northeast stair detour", "Take the paired southwest chests for gold and medicine. The northeast stairs reach an isolated B4 chest containing Hate Mail. Return to B3, explore the western monster chest and descend by the northwest stairs."],
        ["equip-hate-mail", ["equipment"], "Take the Hate Mail in the isolated B4 chest", "The northeast stairs reach an isolated B4 chest containing Hate Mail. It’s cursed, so read its description before you equip it."],
        ["equip-erdricks-sword", ["equipment"], "Take the central B4 stair route up to Erdrick’s Sword", "On the main B4 section, use the northwestern of the two central stair routes and follow the isolated chain upward to B1. Examine the sword on the ground at the end."],
      ],
    },
    {
      title: "B5 and the last medal",
      location: "Dragonlord’s Castle",
      rows: [
        ["medal-final-castle", ["mini-medal"], "Open the medal chest on the isolated B5 branch", "Return to B4 and take the central-eastern staircase down. Go north from the B5 arrival stairs to the medal chest. Return to B4 afterwards."],
        ["loot-final-b5", ["search"], "Explore B5 from B4’s far northeastern stairs", "Use the separate northeastern descent. Follow the eastern side south and west for the Double-Edged Sword. Check the western dead-end monster chest, then return to the southeastern stairs down to B6."],
        ["equip-double-edged-sword", ["equipment"], "Take the Double-Edged Sword on B5’s eastern side", "Follow the eastern side south and west for the Double-Edged Sword. It’s cursed, so read its description before you equip it."],
        ["loot-final-b6", ["search"], "Clear the nine-chest room on B6", "Search every chest in the room north of the bridge. The contents include a Prayer Ring, Dieamend, medicine, a Chimaera Wing, gold, a Seed of Magic and cursed equipment. One chest is a Mimic. Use Nose for Treasure and Snoop, if available, before following the final corridor."],
        ["equip-wasteband", ["equipment"], "Take the Wasteband in the B6 treasure room", "In the B6 treasure room, the chest on the east wall holds the Wasteband. It’s cursed, so read its description before you equip it."],
        ["story-final-shortcut", ["story"], "Activate the light shortcut before confronting the Dragonlord", "Follow the lower route through the marsh and finish the scene that establishes the connection to the entrance. Test the return route, then leave to rest and save."],
        ["reward-medals-40", ["medal-prize"], "Claim the Gringham Whip at 40 medals", "Return to the Citadel with at least 40 medals collected and claim the Gringham Whip. Rewards unlock cumulatively. Check this box after receiving the prize.", {"place": "Medal Citadel"}],
      ],
    },
    {
      title: "The offer and final battles",
      location: "Dragonlord’s Castle · Tantegel",
      rows: [
        ["ending-dragonlords-offer", ["ending"], "Accept the Dragonlord’s offer from a save", "Save before you speak to him. Accept his offer every time he asks to see where it leads, then reload the save, refuse him and fight."],
        ["boss-dragonlord", ["boss"], "Refuse the offer and defeat the Dragonlord’s first form", "Enter fully healed with MP recovery items ready. Protect against spells and use effective single-target attacks. Keep enough resources for the immediate second fight. Avoid spending a large setup cost when the first form is nearly defeated."],
        ["boss-dragonlord-true", ["boss"], "Defeat the Dragonlord’s true form", "The second battle follows directly. Breath-resistant gear and evasion help against its varied attacks. Use Dragon Slash, refresh defensive effects and keep HP high enough for a multi-action round. If a powered-up skill becomes available, read its displayed effect before choosing it. Meditation and MP items support a steady recovery rhythm. The victory returns the Sphere of Light."],
        ["ending-dragonlord", ["ending"], "Return to Tantegel and finish the ending", "After the victory, go back to Tantegel for the final audience and the credits. The game then puts you back before the final battle, so anything still unticked can be collected afterwards."],
      ],
    },
    {
      title: "Sparkly spots on the way",
      location: "Dragonlord’s Castle",
      compact: true,
      rows: [
        ["sparkle-south-of-the-dragonlords-castle", ["sparkle"], "Pick up the Frazzled Feathers south of the Dragonlord’s Castle", "The sparkling pile south of the Dragonlord’s Castle on the world map includes the Frazzled Feathers. Pick up the whole pile.", {"place": "Dragonlord’s Castle"}],
      ],
    },
  ],
} satisfies RawChapter;

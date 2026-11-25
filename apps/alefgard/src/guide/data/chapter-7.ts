import type { RawChapter } from "@hundo/core/types";

export default {
  id: 7,
  title: "The lyre and the sacred treasures",
  region: "Grave of Galen · Shrine of Rain · Shrine of the Spirit · Sanctum",
  teaser: "Grave of Galen",
  intro: "You need all five sigils and the Faerie Flute alongside the lyre. Check those earlier steps before starting the tower ritual. The last shrine opens after the tower events.",
  sources: [["Deep tomb navigation", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/grave-of-galen/"], ["Tower climb and ritual", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/shrine-of-rain/"], ["Staff of Rain chest", "https://www.realmofdarkness.net/dq/hd2d-dq-shrine-of-rain/"], ["Tower cross-check", "https://gamefaqs.gamespot.com/pc/470902-dragon-quest-i-and-ii-hd-2d-remake/faqs/82279/dq1-shrine-of-rain-second-visit"], ["Spirit shrine and Sanctum", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/shrine-of-the-spirit/"], ["Spirit shrine battle cross-check", "https://gamefaqs.gamespot.com/pc/470902-dragon-quest-i-and-ii-hd-2d-remake/faqs/82279/dq1-shrine-of-the-spirit-and-miscellaneous"], ["Shrine of Rain map", "https://www.gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/maps/shrine-of-rain-dragon-quest-i"], ["Every sparkly spot (Realm of Darkness)", "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"]],
  groups: [
    {
      title: "Grave of Galen",
      location: "Grave of Galen · Galenholm",
      rows: [
        ["story-galen-return", ["story"], "Return to Galenholm and open the deep tomb route", "Finish the arrival scene, pass through the dock building and enter the Grave of Galen. The Ultimate Key opens the deeper eastern gate. The accessible first-floor medal and Whistle were covered in Chapter 3.", {"place": "Galenholm"}],
        ["scroll-kacrackle-slash", ["scroll"], "Learn Kacrackle Slash in the tomb’s northwest B3 chest", "From B1’s southwest descent, cross B2 toward its southeastern stairs. On B3, loop through the broken-wall route and take the northwest chest. Search the nearby pots for a Seed of Agility and Dark Robe, then use the northeast stairs back to B2."],
        ["equip-dark-robe-grave-of-galen", ["equipment"], "Take the Dark Robe by the B3 chest", "Search the nearby pots for a Seed of Agility and Dark Robe, then use the northeast stairs back to B2."],
        ["loot-galen-deep", ["search"], "Search both B2 loops and their isolated B3 branches", "Inspect the eastern B2 monster chest, then the separate B3 monster-chest room reached from the western open area. Search behind the nearby wall for the barrels. Before using the southwest B2 stairs, check the pots to their east for Seeds of Stamina and Life."],
        ["medal-galen-statue", ["mini-medal"], "Search the base of the large B3 statue", "Take the southwest B2 staircase into the next B3 section. Examine the enormous statue along the route before following the northeast stairs down to B4."],
        ["item-lyre-of-ire", ["key-item"], "Collect the Lyre of Ire in the tomb’s inner chamber", "On B4, take the supply detour southeast, then work west around the room to the central stairs back up. The lyre is in the isolated inner B3 area. Finish the scene and return to the Faerie Village for the shrine objective."],
        ["quest-zalen-galenholm", ["quest"], "Speak to Zalen on Galenholm’s beach after finding the lyre", "Finish the bard’s next conversation before proceeding with his later destination. He should follow the Cantlin meeting.", {"place": "Galenholm"}],
      ],
    },
    {
      title: "Shrine of Rain upper floors",
      location: "Shrine of Rain",
      rows: [
        ["chest-rain-dieamend", ["search"], "Open the Dieamend chest behind the tower’s final-key gate", "Back at the Shrine of Rain, finish the entrance scene and open the large gate. Take the eastern detour on the first climbing section, then return west to ascend."],
        ["medal-rain-3f", ["mini-medal"], "Search the barrel on Shrine of Rain 3F", "After the 2F eastern route, check the barrel near the northern side of the 3F arrival area. Cross west for the Oomph Powder chest, then return east to the next stairs."],
        ["loot-rain-seeds", ["search"], "Search 4F and both outer 5F branches", "On 4F, examine the floor near your arrival point for a Seed of Life and search the western pots. On 5F, check the outer eastern and southern rooms before the centre. Collect the Seed of Luck, Seed of Defence, Pure Water and the Full Moon Ring and medicine chests."],
        ["equip-full-moon-ring-shrine-of-rain", ["equipment"], "Take the Full Moon Ring in the 5F eastern room", "Collect the Seed of Luck, Seed of Defence, Pure Water and the Full Moon Ring and medicine chests."],
        ["boss-goregoyle", ["boss"], "Defeat Goregoyle at the summit", "Bring healing items because Fizzle can interrupt spell recovery. Maintain your defensive buffs and use your stronger attacks while Wild Side is active. Heal before approaching the central marker."],
        ["story-summon-rubiss", ["story"], "Complete the ritual after the summit battle", "Let the faeries’ scenes finish and enter the summit building when directed. All five sigils, the flute and lyre must already have been gathered. This event also makes five additional Secret Spots appear in Alefgard."],
        ["medal-rain-summit", ["mini-medal"], "Open the chest west of the summit building", "After the ritual, step outside and inspect the west side of the central building. References sometimes label this part 5F or the summit. Use the building and west-side chest as the landmark."],
        ["item-staff-of-rain", ["key-item"], "Return to the Sage of Rain for the Staff of Rain", "Go back to the entrance-level sage after the ritual and open the chest by him for the staff. Finish the conversation that directs you toward the newly available Shrine of the Spirit southeast of Cantlin.", {"place": "Shrine of Rain"}],
      ],
    },
    {
      title: "Shrine of the Spirit and Sanctum",
      location: "Shrine of the Spirit · Sanctum",
      rows: [
        ["medal-spirit-shrine", ["mini-medal"], "Search the rubble inside the Shrine of the Spirit", "Travel southeast from the Wayfarer’s Inn into the marsh. The shrine becomes available after the tower sequence and staff. On its first floor, inspect the rubble along the northwest wall."],
        ["boss-armageddon", ["boss"], "Defeat Armageddon upstairs in the shrine", "Keep healing items ready for its spell-blocking fog. Its physical reflection stance is a cue to heal or refresh buffs. Use Undead Undoer or another effective attack once the stance passes. Maintain evasion and leave room for several physical hits in one round."],
        ["item-mark-of-erdrick", ["key-item"], "Receive the Mark of Erdrick after the shrine battle", "Finish the scenes as the Sacred Amulet becomes the Mark of Erdrick. Check behind the chair for the remaining elixir before leaving.", {"place": "Shrine of the Spirit"}],
        ["spot-sanctum-east", ["secret-spot"], "Search the Secret Spot northeast of Sanctum", "Travel south from the dwarven cave region to Sanctum’s small landmass and inspect the spot on its eastern side. The surrounding monsters can still hit hard."],
        ["equip-agility-gilet-sanctum-spot", ["equipment"], "Take the Agility Gilet in the Secret Spot", "Inspect the spot on its eastern side for the Agility Gilet and the hidden Banishing Bell on the raised ground."],
        ["equip-banishing-bell-sanctum-spot", ["equipment"], "Take the Banishing Bell on the raised ground", "Search the raised ground in the Secret Spot northeast of Sanctum for a hidden Banishing Bell."],
        ["medal-sanctum", ["mini-medal"], "Examine the stained-glass window at Sanctum", "Walk behind the waterfall and inspect the north wall’s stained glass for the medal.", {"place": "Sanctum"}],
        ["item-rainbow-drop", ["key-item"], "Receive the Rainbow Drop from the Sage of Rainbows", "Present the Sunstone, Staff of Rain and Mark of Erdrick at Sanctum. Once the exchange is complete, you can create the route to the final island. Finish the optional equipment sweep in Chapter 8 first if you want the full set.", {"place": "Sanctum"}],
        ["reward-medals-35", ["medal-prize", "scroll"], "Claim the Meditation Scroll at 35 medals", "Return to the Citadel with at least 35 medals collected and claim the Meditation Scroll. Rewards unlock cumulatively. Check this box after receiving the prize. Read the scroll immediately so its ability is learned.", {"place": "Medal Citadel"}],
      ],
    },
    {
      title: "Sparkly spots on the way",
      location: "Shrine of the Spirit · Sanctum",
      compact: true,
      rows: [
        ["sparkle-south-of-the-shrine-of-the-spirit", ["sparkle"], "Pick up the Seed of Strength south of the Shrine of the Spirit", "The sparkling pile south of the Shrine of the Spirit on the world map includes the Seed of Strength. Pick up the whole pile.", {"place": "Shrine of the Spirit"}],
        ["sparkle-northeast-of-the-shrine-of-the-spirit", ["sparkle"], "Pick up the Anti-Freeze Earrings northeast of the Shrine of the Spirit", "The sparkling pile northeast of the Shrine of the Spirit on the world map includes the Anti-Freeze Earrings. Pick up the whole pile.", {"place": "Shrine of the Spirit"}],
        ["sparkle-southwest-of-sanctum", ["sparkle"], "Pick up the Seed of Life southwest of Sanctum", "The sparkling pile southwest of Sanctum on the world map includes the Seed of Life. Pick up the whole pile.", {"place": "Sanctum"}],
        ["sparkle-south-of-sanctum", ["sparkle"], "Pick up the Staff of Divine Wrath south of Sanctum", "The sparkling pile south of Sanctum on the world map includes the Staff of Divine Wrath. Pick up the whole pile.", {"place": "Sanctum"}],
      ],
    },
  ],
} satisfies RawChapter;

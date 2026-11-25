import type { RawChapter } from "@hundo/core/types";

export default {
  id: 8,
  title: "Zalen and the final equipment sweep",
  region: "Field of Flowers · Western Isle · five new Secret Spots",
  teaser: "Field of Flowers",
  intro: "Use this chapter after the Shrine of Rain ritual. It finishes the bard’s story, obtains another piece of Erdrick’s equipment and visits the five newly appearing Secret Spots.",
  sources: [["Zalen and Western Isle", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/erdricks-helm/"], ["Zalen sequence and crafting cross-check", "https://gamefaqs.gamespot.com/pc/470902-dragon-quest-i-and-ii-hd-2d-remake/faqs/82279/dq1-zalen-sidequest-and-miscellaneous"], ["All 15 Secret Spots", "https://www.realmofdarkness.net/dq/hd2d-dq-secret-spots/"], ["Late-spot cross-check", "https://www.neoseeker.com/dragon-quest-i-hd-2d-remake/Hunting_down_Secret_Spots"], ["Alefgard map", "https://www.gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/maps/alefgard-dragon-quest-i"]],
  groups: [
    {
      title: "Zalen’s last journey",
      location: "Field of Flowers · Shrine of Rain · Western Isle · Rimuldar",
      rows: [
        ["quest-zalen-field-of-flowers", ["quest"], "Return to the Field of Flowers after the Galenholm meeting", "Finish the new scene there. If nothing happens, revisit the earlier Zalen conversations in their listed order and ensure the lyre and shrine ritual are complete."],
        ["quest-zalen-western-isle", ["quest"], "Ask Dream-Whisperer about Erdrick at the Shrine of Rain", "Speak to her near the entrance and follow the conversation about the place associated with Erdrick. She takes you to Western Isle. Access depends on the preceding story and Zalen sequence."],
        ["equip-erdricks-helm", ["equipment"], "Collect Erdrick’s Helm on Western Isle", "Inspect the helmet by the grave. Search the ground southeast of the grave for the crafting clover before leaving."],
        ["medal-western-isle", ["mini-medal"], "Search the far end of Western Isle’s northern dock", "Follow the dock all the way north and inspect the ground at its end. Speak to Dream-Whisperer to return to the shrine."],
        ["quest-zalen-rimuldar", ["quest"], "Complete Zalen’s final conversation in Rimuldar", "Find him on the small island near the southwestern shops."],
      ],
    },
    {
      title: "Five Secret Spots after the ritual",
      location: "Tantegel · Roadside Inn · Faerie Village · Damdara · Rimuldar",
      rows: [
        ["spot-tantegel-late", ["secret-spot"], "Open the Dieamend chest northwest of Tantegel", "Check the newly appearing spot near the coast northwest of the starting town. This is a different site from the early barrel-filled spot north of town."],
        ["spot-roadside-late", ["secret-spot"], "Search the new spot southeast of the Roadside Inn", "Leave the inn southward, cross the bridge and inspect the newly available spot on the eastern side of the barren land. Open its final-key chest for the Mirror Shield. Examine the southwest tree or nearby ground for the Duplic Hat."],
        ["equip-mirror-shield-roadside-spot", ["equipment"], "Take the Mirror Shield in the dark chest", "Open its final-key chest for the Mirror Shield."],
        ["equip-duplic-hat-roadside-spot", ["equipment"], "Take the Duplic Hat by the southwest tree", "Examine the southwest tree or nearby ground for the Duplic Hat."],
        ["spot-faerie-late", ["secret-spot"], "Search the new spot northwest of the Faerie Village", "Cross toward the newly appearing spot northwest of the village. Search the central containers and chest for gold and Slippery Sap."],
        ["medal-faerie-late", ["mini-medal"], "Take the medal in the new faerie-region Secret Spot", "Inspect the barrels in the middle of the northwest spot. Recheck the area with Nose for Treasure before leaving."],
        ["spot-damdara-late", ["secret-spot"], "Search the new spot southeast of Damdara", "Cross the bridge southeast of the ruins, then turn north and west into the forest. Inspect the ground by the western rocks or bushes for the Yggdrasil Dress Coat, and the nearby barrel for the Pot Lid."],
        ["equip-yggdrasil-dress-coat-damdara-spot", ["equipment"], "Take the Yggdrasil Dress Coat by the western rocks", "Inspect the ground by the western rocks or bushes for the Yggdrasil Dress Coat, and the nearby barrel for the Pot Lid."],
        ["equip-pot-lid-damdara-spot", ["equipment"], "Take the Pot Lid in the barrel", "Inspect the ground by the western rocks or bushes for the Yggdrasil Dress Coat, and the nearby barrel for the Pot Lid."],
        ["medal-damdara-late", ["mini-medal"], "Search the hanging pouch in the new Damdara spot", "The medal is in the pouch in the central area. This is separate from the early forest medal southwest of town."],
        ["spot-rimuldar-late", ["secret-spot"], "Search the new spot northeast of Rimuldar", "Go to the desert beyond the mountain northeast of town. Search the pot for a Seed of Strength and open the Sword of Ruin chest. Inspect its curse before deciding whether to equip it."],
        ["equip-sword-of-ruin", ["equipment"], "Take the Sword of Ruin in the chest", "Search the pot for a Seed of Strength and open the Sword of Ruin chest. It’s cursed, so read its description before you equip it."],
      ],
    },
    {
      title: "Equipment and resources before the castle",
      location: "Wayfarer’s Inn",
      rows: [
        ["spot-cantlin-swamp", ["secret-spot"], "Clear the marsh Secret Spot east of the Wayfarer’s Inn", "If you skipped this earlier, cross the swamp toward the continent’s eastern side. Search the barrel and the ground near the southwestern boulder for crafting material and gold. The forest sparkle north of the spot provides a Prayer Ring and Anti-Freeze Earrings."],
        ["reward-medals-37", ["medal-prize"], "Claim the Metal Wing Boomerang at 37 medals", "Return to the Citadel with at least 37 medals collected and claim the Metal Wing Boomerang. Rewards unlock cumulatively. Check this box after receiving the prize.", {"place": "Medal Citadel"}],
        ["reward-medals-39", ["medal-prize"], "Claim the War Drum at 39 medals", "Return to the Citadel with at least 39 medals collected and claim the War Drum. Rewards unlock cumulatively. Check this box after receiving the prize.", {"place": "Medal Citadel"}],
      ],
    },
  ],
} satisfies RawChapter;

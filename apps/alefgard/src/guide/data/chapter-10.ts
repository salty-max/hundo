import type { RawChapter } from "@hundo/core/types";

export default {
  id: 10,
  title: "The Craft-Master and a second save",
  region: "Faerie Village",
  teaser: "Faerie Village",
  intro: "Once all five sigils are made, the Craft-Master in the Faerie Village makes eight recipes from what you’ve gathered along the way. The chapter ends with the other way to finish Gwaelin’s story, on a save of its own.",
  sources: [["Crafting and collection cross-check", "https://gamefaqs.gamespot.com/pc/470902-dragon-quest-i-and-ii-hd-2d-remake/faqs/82279/dq1-zalen-sidequest-and-miscellaneous"], ["Scrolls and level-up abilities", "https://www.rpgsite.net/guide/18769-dragon-quest-i-hd-2d-remake-all-scroll-locations"], ["Secret Spot count", "https://www.realmofdarkness.net/dq/hd2d-dq-secret-spots/"], ["Remake FAQ", "https://www.realmofdarkness.net/dq/hd2d-dq-tips/"], ["All five equipped pieces", "https://www.xboxachievements.com/game/dragon-quest-i-ii-hd-2d-remake/achievement/erdricks-legacy.html"], ["Regular crafting unlock", "https://www.xboxachievements.com/game/dragon-quest-i-ii-hd-2d-remake/achievement/master-crafter.html"], ["Every recipe (NoobFeed)", "https://noobfeed.com/articles/dragon-quest-1-hd-2d-remake-craft-items"], ["Every recipe, and when the Craft-Master offers them (Gamer Guides)", "https://gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/guide/trophies-and-achievements/dragon-quest-i-trophies-and-achievements/master-crafter-how-to-craft-all-items"], ["Carrying Gwaelin to the end (Guide Lovers)", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/endings/"], ["Carrying Gwaelin: dialogue, prayers, the Dragonlord’s reaction (dragon-quest.org)", "https://dragon-quest.org/wiki/Princess_Gwaelin"]],
  groups: [
    {
      title: "The Craft-Master’s eight regular recipes",
      location: "Faerie Village",
      compact: true,
      rows: [
        ["recipe-holy-water", ["recipe"], "Craft Holy Water from Pure Water", "Once all five sigils are made, speak to the Craft-Master in the Faerie Village workshop. Choose Holy Water and provide Pure Water. Extra recipe materials can be found in the route’s containers and overworld pickups."],
        ["recipe-tangleweb", ["recipe"], "Craft Tangleweb from Spider Web", "Select the recipe and spend the material. Count a recipe as complete after making it, even if you later use or sell the result."],
        ["recipe-coagulant", ["recipe"], "Craft Coagulant from Twitching Powder", "Select the recipe at the workshop. Earlier cave and Secret Spot pickups provide the ingredient."],
        ["recipe-oomph-powder", ["recipe"], "Craft Oomph Powder from Hextract", "Make one for the recipe record. Its battle effect can also be helpful when you are preparing for the last bosses."],
        ["recipe-chimaera-wing", ["recipe"], "Craft a Chimaera Wing from Frazzled Feathers", "Choose the crafting option even if you already own bought or found wings. Owning the result does not confirm that you crafted it."],
        ["recipe-musk", ["recipe"], "Craft Musk from Jeeper Creeper", "Make the recipe once and leave this box completed after spending the result."],
        ["recipe-unsealant", ["recipe"], "Craft Unsealant from Slippery Sap", "Use the Craft-Master’s recipe. Several forest and late Secret Spot searches supply the ingredient."],
        ["recipe-strong-medicine", ["recipe"], "Craft Strong Medicine from a Two-Leaf Clover", "Check Cantlin, Western Isle and overworld sparkles if you need clover."],
      ],
    },
    {
      title: "A second save",
      location: "Quagmire Cave · Dragonlord’s Castle",
      rows: [
        ["ending-carry-gwaelin", ["outside"], "Carry Gwaelin to the Dragonlord on a second save", "Load the save you kept at her rescue in chapter 5, and never take her into Tantegel Castle: the town, inn and church are safe. She travels with you to the end, with extra dialogue along the way, and blesses you in the late boss fights. Leave the castle’s Ultimate Key treasury to your main save. This one is separate, so it stays off the progress bar.", {"place": "Quagmire Cave"}],
      ],
    },
  ],
} satisfies RawChapter;

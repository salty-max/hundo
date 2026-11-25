import type { RawChapter } from "@hundo/core/types";

export default {
  id: 10,
  title: "The Craft-Master and a second save",
  region: "Faerie Village",
  teaser: "Faerie Village",
  intro: "Once all five sigils are made, the Craft-Master in the Faerie Village makes eight recipes from what you’ve gathered along the way. The chapter ends with the other way to finish Gwaelin’s story, on a save of its own.",
  sources: [["Secret Spot count", "https://www.realmofdarkness.net/dq/hd2d-dq-secret-spots/"], ["Remake FAQ", "https://www.realmofdarkness.net/dq/hd2d-dq-tips/"], ["Every recipe (NoobFeed)", "https://noobfeed.com/articles/dragon-quest-1-hd-2d-remake-craft-items"], ["Every recipe, and when the Craft-Master offers them (Gamer Guides)", "https://gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/guide/trophies-and-achievements/dragon-quest-i-trophies-and-achievements/master-crafter-how-to-craft-all-items"], ["Carrying Gwaelin to the end (Guide Lovers)", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/endings/"], ["Carrying Gwaelin: dialogue, prayers, the Dragonlord’s reaction (dragon-quest.org)", "https://dragon-quest.org/wiki/Princess_Gwaelin"]],
  groups: [
    {
      title: "The Craft-Master’s eight recipes",
      location: "Faerie Village",
      map: ["Gamer Guides", "https://www.gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/maps/faerie-village-dragon-quest-i"],
      note: "Once all five sigils are made and Rubiss is back, the Craft-Master in the Faerie Village’s northeast workshop crafts these, from one ingredient each. Have each crafted once.",
      compact: true,
      rows: [
        ["recipe-holy-water", ["recipe"], "Craft Holy Water from Pure Water", "Bring the Craft-Master some Pure Water for Holy Water. You found some in the bucket upstairs in the house right of Tantegel’s church.", {"reference": "https://gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/guide/trophies-and-achievements/dragon-quest-i-trophies-and-achievements/master-crafter-how-to-craft-all-items"}],
        ["recipe-tangleweb", ["recipe"], "Craft Tangleweb from Spider Web", "Bring the Craft-Master a Spider Web for Tangleweb. You found one in the barrel in Tantegel church’s cell.", {"reference": "https://gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/guide/trophies-and-achievements/dragon-quest-i-trophies-and-achievements/master-crafter-how-to-craft-all-items"}],
        ["recipe-coagulant", ["recipe"], "Craft Coagulant from Twitching Powder", "Bring the Craft-Master some Twitching Powder for Coagulant. You found some in the middle barrel of the swamp Secret Spot east of the Wayfarer’s Inn.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/ultimate-key/"}],
        ["recipe-oomph-powder", ["recipe"], "Craft Oomph Powder from Hextract", "Bring the Craft-Master some Hextract for Oomph Powder. You found some in the sparkly spots south of the Shrine of the Spirit and south of the Dragonlord’s Castle.", {"reference": "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"}],
        ["recipe-chimaera-wing", ["recipe"], "Craft a Chimaera Wing from Frazzled Feathers", "Bring the Craft-Master some Frazzled Feathers for a Chimaera Wing. You found them in the sparkly spots south of Sanctum and south of the Dragonlord’s Castle, and on the sunlit spot in the Dragonlord’s throne room.", {"reference": "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"}],
        ["recipe-musk", ["recipe"], "Craft Musk from Jeeper Creeper", "Bring the Craft-Master a Jeeper Creeper for Musk. You found some in the pots and barrels at the top of Weeping Isle’s cliff.", {"reference": "https://gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/guide/trophies-and-achievements/dragon-quest-i-trophies-and-achievements/master-crafter-how-to-craft-all-items"}],
        ["recipe-unsealant", ["recipe"], "Craft Unsealant from Slippery Sap", "Bring the Craft-Master some Slippery Sap for Unsealant. You found some in a barrel in the new Secret Spot northwest of the Faerie Village.", {"reference": "https://www.realmofdarkness.net/dq/hd2d-dq-secret-spots/"}],
        ["recipe-strong-medicine", ["recipe"], "Craft Strong Medicine from a Two-Leaf Clover", "Bring the Craft-Master a Two-Leaf Clover for Strong Medicine. You found one in the grass by the wall on Western Isle.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/erdricks-helm/"}],
      ],
    },
    {
      title: "A second save",
      location: "Tantegel · Dragonlord’s Castle",
      rows: [
        ["ending-carry-gwaelin", ["outside"], "Carry Gwaelin to the Dragonlord on a second save", "Load the separate save you kept in Tantegel before walking Gwaelin into the castle, and never take her inside; going into the town, the inn or the church doesn’t send her home. She travels with you to the end: she clears Weirdwood’s fog in person, holds the torch in the Grave of Galen and blesses you in the late boss fights. Tantegel Castle’s four west chests stay shut until after the ending on this save, so take them on your main one. This save is separate, so it stays off the progress bar.", {"place": "Tantegel", "reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/endings/"}],
      ],
    },
  ],
} satisfies RawChapter;

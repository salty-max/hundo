import type { RawChapter } from "@hundo/core/types";

export default {
  id: 1,
  title: "Tantegel and Erdrick’s Hollow",
  region: "Tantegel · Erdrick’s Hollow · Roadside Inn",
  teaser: "Tantegel",
  intro: "Search Tantegel’s castle and town, explore Erdrick’s Hollow floor by floor, then make a short loop through the Roadside Inn and the Secret Spot west of it.",
  sources: [["Opening route, Secret Spot and inn companion", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/tantegel/"], ["Erdrick’s Hollow route", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/erdricks-hollow/"], ["Hollow chest positions, Zoom and Helpful Settings", "https://www.rpgsite.net/guide/18688-dragon-quest-i-hd-2d-remake-walkthrough-where-to-go-all-mini-medals-secret-spots-step-by-step-guide"], ["Every sparkly spot (Realm of Darkness)", "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"], ["Every Secret Spot (Realm of Darkness)", "https://www.realmofdarkness.net/dq/hd2d-dq-secret-spots/"], ["Tantegel’s treasure (Realm of Darkness)", "https://www.realmofdarkness.net/dq/hd2d-dq-tantegel/"], ["Erdrick’s Hollow’s treasure (Realm of Darkness)", "https://www.realmofdarkness.net/dq/hd2d-dq-erdricks-hollow/"], ["The Roadside Inn’s treasure (Realm of Darkness)", "https://www.realmofdarkness.net/dq/hd2d-dq-roadside-inn/"]],
  groups: [
    {
      title: "Leaving Tantegel",
      location: "Tantegel",
      map: ["Gamer Guides", "https://www.gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/maps/tantegel-dragon-quest-i"],
      rows: [
        ["story-audience", ["story"], "Speak to King Lorik", "Finish the opening audience in Tantegel Castle: the king gives you 120 gold and some supplies. Search the castle and the town before you leave.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/tantegel/"}],
        ["loot-tantegel-castle-open", ["search"], "Search Tantegel Castle", "On the roof, the northwest pot holds some gold and a barrel a Seed of Magic. On the ground floor, the pots east of the fountain, by the healing mage, hold gold and a Chimaera Wing. In the dining hall the southwest barrel holds a Seed of Agility, and a pot nearby Holy Water. Up the west stairs, the southeast room’s pot holds a Seed of Defence. Out in the backyard, the pots hold an Antidotal Herb and a Seed of Luck, the shed’s barrel a Chimaera Wing, and the barrel in the castle’s basement some gold.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/tantegel/"}],
        ["equip-oaken-club-tantegel-castle", ["equipment"], "Take the Oaken Club in Tantegel Castle", "Take the west stairs to the southwest bedroom: its barrel holds an Oaken Club.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/tantegel/"}],
        ["equip-boxer-shorts-tantegel-castle", ["equipment"], "Take the Boxer Shorts by the castle’s bath", "East of the castle’s fountain, examine the towel by the bathtub for a pair of Boxer Shorts.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/tantegel/"}],
        ["loot-tantegel-town-open", ["search"], "Search Tantegel town", "The pot under the tree west of the south house holds a Seed of Strength. Examine the south side of the grave southeast of the equipment shop for a Seed of Life. The barrels by the inn hold gold and a Medicinal Herb, and the item shop’s pot holds an Antidotal Herb. There’s more gold in a pot by the southern pier and in a barrel by the carpenter’s scaffolding. The inn’s chest holds bonus items if you have them, such as those for Dragon Quest III HD-2D save data.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/tantegel/"}],
        ["equip-rabbit-tail-tantegel-town", ["equipment"], "Take the Rabbit Tail in Tantegel town", "Follow the path south to the house at its end: the pouch hanging on the wall holds a Rabbit Tail.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/tantegel/"}],
        ["spot-tantegel-north", ["secret-spot"], "Find the Secret Spot by the signpost north of Tantegel", "Secret Spots are small hidden areas off the world map. This one sits east-southeast of the signpost north of Tantegel. Its middle barrel holds a Seed of Strength, the west barrel a Medicinal Herb, and the barrel down the north path some gold.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/tantegel/"}],
        ["route-hollow-approach", ["route"], "Head for Erdrick’s Hollow", "Turn on the Helpful Settings to mark chests and Secret Spots on the map. Heal before you go in, and keep a Chimaera Wing to fly home: you won’t learn Zoom, the spell that does the same, until level 13.", {"reference": "https://www.rpgsite.net/guide/18688-dragon-quest-i-hd-2d-remake-walkthrough-where-to-go-all-mini-medals-secret-spots-step-by-step-guide"}],
      ],
    },
    {
      title: "Erdrick’s Hollow",
      location: "Erdrick’s Hollow",
      map: ["Gamer Guides", "https://www.gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/maps/erdricks-hollow-dragon-quest-i"],
      rows: [
        ["equip-divine-dagger-hollow", ["equipment"], "Open the Divine Dagger chest in Erdrick’s Hollow", "On B1, head all the way south and take the branch at the bottom to the southwest chest: it holds the Divine Dagger.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/erdricks-hollow/"}],
        ["scroll-sandstorm", ["scroll"], "Learn Sandstorm in Erdrick’s Hollow", "On B1, a lost priest stands at a fork. The dead end on the left has a chest with the Sandstorm scroll: read it and you learn the skill.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/erdricks-hollow/"}],
        ["equip-leather-shield-hollow", ["equipment"], "Open the Leather Shield chest in Erdrick’s Hollow", "From the fork by the lost priest on B1, go north, then east, to the northeast chest: it holds a Leather Shield.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/erdricks-hollow/"}],
        ["equip-dragon-scale-hollow", ["equipment"], "Open the Dragon Scale chest in Erdrick’s Hollow", "Just before B1’s stairs down to B2, take the east branch to a chest with a Dragon Scale.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/erdricks-hollow/"}],
        ["medal-hollow", ["mini-medal"], "Take the Mini Medal on Erdrick’s Hollow B2", "In B2’s southwest room, a monk is losing a fight to a Slime. The chest beside him holds a Mini Medal, and the room’s pots hold Magic Water, Medicinal Herbs and gold.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/erdricks-hollow/"}],
        ["loot-hollow-remaining", ["search"], "Search the rest of Erdrick’s Hollow", "On B2, the chest east of the centre holds 314 gold and the west chest a Chimaera Wing. On the way back up, check B1’s north barrel for more gold.", {"reference": "https://www.rpgsite.net/guide/18688-dragon-quest-i-hd-2d-remake-walkthrough-where-to-go-all-mini-medals-secret-spots-step-by-step-guide"}],
        ["story-hollow-inscription", ["story"], "Read Erdrick’s gravestone twice", "At the bottom of the Hollow, read the gravestone and let the scene play, then examine it a second time for the rest of the message.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/erdricks-hollow/"}],
      ],
    },
    {
      title: "Roadside loop",
      location: "Roadside Inn",
      map: ["Gamer Guides", "https://www.gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/maps/roadside-inn-dragon-quest-i"],
      rows: [
        ["equip-leather-suit-roadside-inn", ["equipment"], "Take the Leather Suit at the Roadside Inn", "The Roadside Inn is southwest of Erdrick’s Hollow. In its entrance hall, the barrels on the right hold a Leather Suit and Strong Medicine.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/erdricks-hollow/"}],
        ["medal-roadside-inn", ["mini-medal"], "Take the medal from the Roadside Inn’s dresser", "In the inn’s first bedroom on the left, the dresser beside the bed holds a Mini Medal. The other dresser holds gold, and the pot in the other bedroom a Chimaera Wing.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/erdricks-hollow/"}],
        ["spot-roadside-west", ["secret-spot"], "Find the Secret Spot west of the Roadside Inn", "Leave the inn by its north exit and follow the cliffs west to a Secret Spot. The pots on its west side hold gold and Antidotal Herbs.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/erdricks-hollow/"}],
        ["medal-roadside-spot", ["mini-medal"], "Take the medal in the Secret Spot west of the Roadside Inn", "In the Secret Spot west of the inn, the pot beneath the central tree holds a Mini Medal.", {"reference": "https://guidelovers.com/dragon-quest-i-hd-2d-remake/erdricks-hollow/"}],
      ],
    },
    {
      title: "Sparkly spots on the way",
      location: "Tantegel · Erdrick’s Hollow · Roadside Inn",
      map: ["Realm of Darkness", "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"],
      note: "Sparkly spots are the blue sparkles on the world map, each a free pile of items. Realm of Darkness’s numbered map shows where each one is.",
      compact: true,
      rows: [
        ["sparkle-west-of-tantegel", ["sparkle"], "Pick up the Seed of Stamina west of Tantegel", "The sparkly spot west of Tantegel holds a Seed of Stamina and a Medicinal Herb.", {"place": "Tantegel", "reference": "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"}],
        ["sparkle-northwest-of-tantegel", ["sparkle"], "Pick up the Oaken Club northwest of Tantegel", "The sparkly spot northwest of Tantegel holds an Oaken Club, Plain Clothes and some gold.", {"place": "Tantegel", "reference": "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"}],
        ["sparkle-southeast-of-erdricks-hollow", ["sparkle"], "Pick up the Wayfarer’s Clothes southeast of Erdrick’s Hollow", "The sparkly spot southeast of Erdrick’s Hollow holds Wayfarer’s Clothes, a Chimaera Wing and some gold.", {"place": "Erdrick’s Hollow", "reference": "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"}],
        ["sparkle-south-of-erdricks-hollow", ["sparkle"], "Pick up the Dazzle-Me-Nots south of Erdrick’s Hollow", "The sparkly spot south of Erdrick’s Hollow holds two Dazzle-Me-Nots.", {"place": "Erdrick’s Hollow", "reference": "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"}],
        ["sparkle-southwest-of-erdricks-hollow", ["sparkle"], "Pick up the Seed of Agility southwest of Erdrick’s Hollow", "The sparkly spot southwest of Erdrick’s Hollow holds a Seed of Agility and two Antidotal Herbs.", {"place": "Erdrick’s Hollow", "reference": "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"}],
        ["sparkle-north-of-erdricks-hollow", ["sparkle"], "Pick up the Antidotal Herbs north of Erdrick’s Hollow", "The sparkly spot north of Erdrick’s Hollow holds two Antidotal Herbs.", {"place": "Erdrick’s Hollow", "reference": "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"}],
        ["sparkle-north-of-the-roadside-inn", ["sparkle"], "Pick up the Magic Water north of the Roadside Inn", "The sparkly spot north of the Roadside Inn holds Magic Water, two Holy Waters and some gold.", {"place": "Roadside Inn", "reference": "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"}],
        ["sparkle-northwest-of-the-roadside-inn", ["sparkle"], "Pick up the Turban northwest of the Roadside Inn", "The sparkly spot northwest of the Roadside Inn holds a Turban and some gold.", {"place": "Roadside Inn", "reference": "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"}],
      ],
    },
  ],
} satisfies RawChapter;

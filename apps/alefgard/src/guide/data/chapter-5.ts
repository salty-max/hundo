import type { RawChapter } from "@hundo/core/types";

export default {
  id: 5,
  title: "The princess, Weirdwood and Cantlin",
  region: "Quagmire Cave · Weirdwood · Wayfarer’s Inn · Cantlin",
  teaser: "Quagmire Cave",
  intro: "Prepare for the rescue using the blue-door upgrades. The escort choice is explained at the moment it becomes relevant. This route continues by returning the princess, with an optional branch for keeping her along.",
  sources: [["Rescue route and escort choices", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/quagmire-cave/"], ["Weirdwood and the inn", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/weirdwood/"], ["Cantlin and equipment", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/cantlin/"], ["Golem in the remake", "https://dragon-quest.org/wiki/Golem"], ["Escort branch cross-check", "https://gamefaqs.gamespot.com/switch/470858-dragon-quest-i-and-ii-hd-2d-remake/faqs/82240/dragon-quest-1-chapter-2"], ["Every sparkly spot (Realm of Darkness)", "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"], ["Returning Gwaelin or carrying her (Guide Lovers)", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/endings/"], ["Carrying Gwaelin: dialogue, prayers, the Dragonlord’s reaction (dragon-quest.org)", "https://dragon-quest.org/wiki/Princess_Gwaelin"]],
  groups: [
    {
      title: "Quagmire Cave beyond the blue door",
      location: "Quagmire Cave",
      rows: [
        ["chest-quagmire-medicine", ["search"], "Take the Special Medicine on Quagmire B2", "Enter the southeastern blue door on B1 and descend. Check the first southern dead end for the medicine chest before following the longer passage west."],
        ["item-moonbeam-dew", ["key-item"], "Collect Moonbeam Dew on Quagmire B2", "Explore the central dead-end branch and examine its sparkle. Keep it for the next Faerie Village visit."],
        ["equip-mad-cap-quagmire", ["equipment"], "Take the Mad Cap and inspect the other B2 chest carefully", "Explore the northern side branches for the hat. A separate chest in this section is a Cannibox. Use Peep or heal before opening it."],
        ["medal-quagmire-b2", ["mini-medal"], "Take the medal in Quagmire B2’s northwest dead end", "At the final set of branches before the isolated return to B1, explore northwest for the chest. Check the nearby barrel for Magic Water."],
        ["boss-green-dragon", ["boss"], "Defeat the dragon guarding Gwaelin", "Climb into the isolated B1 section, search its containers, then approach the marker with full resources. Use your strongest appropriate single-target attacks and heal early as the dragon’s pressure increases. Magic Barrier protects against spells. Keep healing items available as a second recovery option."],
        ["story-gwaelin-homecoming", ["story"], "Take Gwaelin home to Tantegel Castle", "Before you go in, keep a save on a separate file: walking her into Tantegel Castle returns her for good, while if you never take her to the castle she travels with you to the end, with extra dialogue along the way (chapter 10 covers that save). The town, inn and church are safe either way. Then take her to the castle for the homecoming, and finish the balcony scene afterwards.", {"place": "Tantegel"}],
        ["sigil-moon", ["sigil"], "Exchange Moonbeam Dew for the Moon Sigil", "Visit the Craft-Master in the Faerie Village after the rescue. Hand over the dew before going onward to Weirdwood.", {"place": "Faerie Village"}],
      ],
    },
    {
      title: "The looping forest",
      location: "Weirdwood",
      rows: [
        ["story-weirdwood-mist", ["story"], "Clear the mist in Weirdwood", "Enter Weirdwood east of the Medal Citadel after the princess rescue. Try the looping exits until Gwaelin’s scene restores the map. Search the first area before crossing into the second."],
        ["medal-weirdwood", ["mini-medal"], "Open Weirdwood’s eastern medal chest", "Enter the forest east of the Medal Citadel. Search its initial map’s eastern branch for the chest. Other branches contain a Siren Sword, gold and Slippery Sap."],
        ["equip-siren-sword-weirdwood", ["equipment"], "Take the Siren Sword on the first map’s western branch", "Other branches contain a Siren Sword, gold and Slippery Sap."],
        ["story-weirdwood-mirage", ["boss"], "Defeat the Mirages in Weirdwood’s second area", "Once the map is usable, cross into the second area and approach the marked encounter. Several enemies can act at once, so focus damage and keep healing active. The scene afterwards takes you to the Faerie Village."],
        ["story-faerie-leader", ["story"], "Speak to the faeries until the next objective appears", "Finish the conversations after the rescue. Speak with Dream-Whisperer when directed. Return to Weirdwood to clear its newly accessible second area. Register the Wayfarer’s Inn beyond the forest before taking another long round trip.", {"place": "Faerie Village"}],
        ["scroll-focus-pocus", ["scroll"], "Learn Focus Pocus in Weirdwood’s second area", "From the second area’s central junction, follow the bridge route to the middle chest. Read the scroll before continuing the treasure sweep."],
        ["item-undying-flame", ["key-item"], "Collect the Undying Flame in Weirdwood", "Explore the northeastern dead end of the second area. Search the other branches for the Thief’s Turban and the monster chest before exiting east."],
        ["equip-thiefs-turban-weirdwood", ["equipment"], "Take the Thief’s Turban on the second map", "Search the other branches for the Thief’s Turban and the monster chest before exiting east."],
        ["sigil-sun", ["sigil"], "Exchange the Undying Flame for the Sun Sigil", "Hand it to the Craft-Master when the workshop is available. If story events interrupt access before you do this, return after Kol’s later crisis. Keep the material until the exchange is complete.", {"place": "Faerie Village"}],
      ],
    },
    {
      title: "The road to Cantlin",
      location: "Wayfarer’s Inn · Cantlin",
      rows: [
        ["medal-wayfarers-inn", ["mini-medal"], "Search the rocks in the Wayfarer’s Inn well", "This inn is east of the bridge beyond Weirdwood. Visit to register it for return travel, then descend the well and examine the central rocks."],
        ["equip-slime-earrings-wayfarers-inn", ["equipment"], "Take the Slime Earrings in the inn’s drawer", "Search the drawer at the Wayfarer’s Inn for the Slime Earrings."],
        ["boss-golem", ["boss"], "Use the Faerie Flute to help defeat Cantlin’s Golem", "Heal before entering Cantlin because the guardian attacks on arrival. Use the flute from the battle item menu to put the Golem to sleep, then attack between recovery turns. Repeat the flute as necessary. Defend against a charged blow if it is awake and preparing one."],
        ["medal-cantlin-grave", ["mini-medal"], "Inspect the rightmost grave in Cantlin", "Go to the small cemetery and search the grave on the right. Speak to the townspeople marked with story information while you explore."],
        ["scroll-attack-attacker", ["scroll"], "Learn Attack Attacker in Cantlin’s western house", "In the house south of the inn, go upstairs and search the dressers. Take the Iron Armour in the same area."],
        ["equip-iron-armour-cantlin", ["equipment"], "Take the Iron Armour in the western house", "Take the Iron Armour in the same area."],
        ["scroll-moreheal", ["scroll"], "Learn Moreheal from the upstairs bookshelf", "Search the bookshelves in the adjacent upstairs room of the same western house. Read the scroll immediately. This stronger healing is valuable for the next bosses."],
        ["loot-cantlin-open", ["search"], "Search Cantlin’s open houses and shops", "Sweep the inn chest, the southwestern house dressers, the equipment shop’s back room and the northern building upstairs. These include seeds and crafting materials. Speak to the man whose family shop was in Damdara and the man discussing buried treasure behind a tree. The northeastern locked chest needs the Ultimate Key."],
      ],
    },
    {
      title: "Sparkly spots on the way",
      location: "Wayfarer’s Inn · Cantlin",
      compact: true,
      rows: [
        ["sparkle-southwest-of-the-wayfarers-inn", ["sparkle"], "Pick up the Dazzle-Me-Not southwest of the Wayfarer’s Inn", "The sparkling pile southwest of the Wayfarer’s Inn on the world map includes the Dazzle-Me-Not. Pick up the whole pile.", {"place": "Wayfarer’s Inn"}],
        ["sparkle-northwest-of-cantlin", ["sparkle"], "Pick up the Seed of Defence northwest of Cantlin", "The sparkling pile northwest of Cantlin on the world map includes the Seed of Defence. Pick up the whole pile.", {"place": "Cantlin"}],
        ["sparkle-east-of-cantlin", ["sparkle"], "Pick up the Edged Boomerang east of Cantlin", "The sparkling pile east of Cantlin on the world map includes the Edged Boomerang. Pick up the whole pile.", {"place": "Cantlin"}],
      ],
    },
  ],
} satisfies RawChapter;

import type { RawChapter } from "@hundo/core/types";

export default {
  id: 1,
  title: "Tantegel and Erdrick’s Hollow",
  region: "Tantegel · Erdrick’s Hollow · Roadside Inn",
  teaser: "Tantegel",
  intro: "Begin with the castle supplies, take the first dungeon slowly, then make a short loop through the Roadside Inn. Directions use the English names in the 2025 HD-2D remake. North is the top of the in-game map.",
  sources: [["Tantegel supplies", "https://gamefaqs.gamespot.com/pc/470902-dragon-quest-i-and-ii-hd-2d-remake/faqs/82279/dq1-tantegel"], ["Opening route, Secret Spot and inn companion", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/tantegel/"], ["Erdrick’s Hollow route", "https://guidelovers.com/dragon-quest-i-hd-2d-remake/erdricks-hollow/"], ["Hollow chest positions, Zoom and Helpful Settings", "https://www.rpgsite.net/guide/18688-dragon-quest-i-hd-2d-remake-walkthrough-where-to-go-all-mini-medals-secret-spots-step-by-step-guide"], ["Tantegel map", "https://www.gamerguides.com/dragon-quest-i-and-ii-hd-2d-remake/maps/tantegel-dragon-quest-i"], ["Every sparkly spot (Realm of Darkness)", "https://www.realmofdarkness.net/dq/hd2d-dq-sparkly-spots/"]],
  groups: [
    {
      title: "Leaving Tantegel",
      location: "Tantegel",
      rows: [
        ["story-audience", ["story"], "Speak to King Lorik and begin your journey", "Finish the opening audience. The first destination is Erdrick’s Hollow to the north-northwest. Before leaving, use the menu to choose battle speed and your preferred difficulty. The Helpful Settings can reveal chest and Secret Spot markers."],
        ["loot-tantegel-castle-open", ["search"], "Search the accessible castle rooms and grounds", "Check the roof’s north barrels for a Seed of Magic. Downstairs, search the dining-room barrel for a Seed of Agility. The west stairs lead to an Oaken Club in the southwest bedroom and a Seed of Defence in the southeast bedroom. In the eastern bathing area, examine the laundry for Boxer Shorts. Follow the rear garden path south for a Seed of Luck and the basement barrel. The man behind the eastern counter restores HP and MP."],
        ["equip-oaken-club-tantegel-castle", ["equipment"], "Take the Oaken Club in the southwest bedroom", "The west stairs lead to an Oaken Club in the southwest bedroom and a Seed of Defence in the southeast bedroom."],
        ["equip-boxer-shorts-tantegel-castle", ["equipment"], "Take the Boxer Shorts in the laundry", "In the eastern bathing area, examine the laundry for Boxer Shorts."],
        ["loot-tantegel-town-open", ["search"], "Search the town before buying equipment", "Take a Seed of Strength from the pot under the tree near the southern house, and a Seed of Life at the grave by the equipment shop. Check the inn’s barrels and the item shop’s outside pot. Equip the free Oaken Club and compare the Boxer Shorts with your current armour before spending gold. Edition bonuses, when available, are in the inn chest."],
        ["equip-rabbit-tail-tantegel-town", ["equipment"], "Take the Rabbit Tail in the pouch on the south house’s wall", "In the house at the end of the southern path, take the Rabbit Tail from the pouch hanging on the wall."],
        ["spot-tantegel-north", ["secret-spot"], "Search the Secret Spot north of Tantegel", "Follow the northbound road to the signpost, then inspect the trees to its east-southeast. Search the barrels for the Seed of Strength, medicine and gold. A Secret Spot becomes a map location after entry."],
        ["route-hollow-approach", ["route"], "Reach Erdrick’s Hollow with healing supplies", "Keep north-northwest. Pick up the road sparkles and fight near town if ordinary encounters are already draining your supplies. Heal before entering the desert cave. Keep a Chimaera Wing for the return journey. At level 13, Zoom lets you return to previously visited destinations without spending a wing."],
      ],
    },
    {
      title: "Erdrick’s Hollow",
      location: "Erdrick’s Hollow",
      rows: [
        ["equip-divine-dagger-hollow", ["equipment"], "Open the Divine Dagger chest on B1", "Explore the southern side of the first floor before descending. The dagger is in the southwest portion of the map. Equip it if it improves your attack."],
        ["scroll-sandstorm", ["scroll"], "Learn Sandstorm from the B1 chest", "At the junction by the lost priest, take the dead-end branch to the scroll chest. Use the scroll from your inventory. Scrolls have one recipient in this game, the Hero."],
        ["equip-leather-shield-hollow", ["equipment"], "Open the Leather Shield chest on B1", "Explore the northeast branch before the stairs down. Compare its defence with your equipped shield."],
        ["equip-dragon-scale-hollow", ["equipment"], "Open the Dragon Scale chest on B1", "Take the eastern detour near the route to B2, beside the other adventurer. Accessories are equipped separately from shields and armour."],
        ["medal-hollow", ["mini-medal"], "Collect the Mini Medal in Erdrick’s Hollow B2", "Go into the southwestern room with the struggling adventurer and inspect the chest. Also search the containers around him."],
        ["loot-hollow-remaining", ["search"], "Clear the remaining Hollow branches", "Collect B2’s gold chest on the central-eastern branch and its Chimaera Wing chest on the western route. Check B1’s northern barrel and B2’s pots. Work back to the main passage after each branch so the stairs stay easy to identify."],
        ["story-hollow-inscription", ["story"], "Read Erdrick’s inscription twice", "Reach the monument at the bottom and let the adventurers’ scene finish. Examine the inscription again for its remaining message. Leave the dungeon and register the Roadside Inn to the southwest."],
      ],
    },
    {
      title: "Roadside loop",
      location: "Roadside Inn",
      rows: [
        ["medal-roadside-inn", ["mini-medal"], "Take the Roadside Inn’s bedroom medal", "Search the dresser in the bedroom. Check the other dresser, the entrance barrels and the pot in the other room for supplies. Keep to the northern region for now."],
        ["spot-roadside-west", ["secret-spot"], "Enter the Secret Spot west of the Roadside Inn", "Leave by the north exit and follow the cliffs west. Search the pots beneath and beside the central tree."],
        ["medal-roadside-spot", ["mini-medal"], "Take the Mini Medal beneath the Secret Spot’s tree", "Inspect the central pot. This is a separate medal from the inn dresser. Sweep the other pots before returning to the road toward Galenholm."],
      ],
    },
    {
      title: "Sparkly spots on the way",
      location: "Tantegel · Erdrick’s Hollow · Roadside Inn",
      compact: true,
      rows: [
        ["sparkle-west-of-tantegel", ["sparkle"], "Pick up the Seed of Stamina west of Tantegel", "The sparkling pile west of Tantegel on the world map includes the Seed of Stamina. Pick up the whole pile.", {"place": "Tantegel"}],
        ["sparkle-northwest-of-tantegel", ["sparkle"], "Pick up the Oaken Club northwest of Tantegel", "The sparkling pile northwest of Tantegel on the world map includes the Oaken Club. Pick up the whole pile.", {"place": "Tantegel"}],
        ["sparkle-southeast-of-erdricks-hollow", ["sparkle"], "Pick up the Wayfarer’s Clothes southeast of Erdrick’s Hollow", "The sparkling pile southeast of Erdrick’s Hollow on the world map includes the Wayfarer’s Clothes. Pick up the whole pile.", {"place": "Erdrick’s Hollow"}],
        ["sparkle-south-of-erdricks-hollow", ["sparkle"], "Pick up the Dazzle-Me-Not south of Erdrick’s Hollow", "The sparkling pile south of Erdrick’s Hollow on the world map includes the Dazzle-Me-Not. Pick up the whole pile.", {"place": "Erdrick’s Hollow"}],
        ["sparkle-southwest-of-erdricks-hollow", ["sparkle"], "Pick up the Seed of Agility southwest of Erdrick’s Hollow", "The sparkling pile southwest of Erdrick’s Hollow on the world map includes the Seed of Agility. Pick up the whole pile.", {"place": "Erdrick’s Hollow"}],
        ["sparkle-north-of-erdricks-hollow", ["sparkle"], "Pick up the Antidotal Herb north of Erdrick’s Hollow", "The sparkling pile north of Erdrick’s Hollow on the world map includes the Antidotal Herb. Pick up the whole pile.", {"place": "Erdrick’s Hollow"}],
        ["sparkle-north-of-the-roadside-inn", ["sparkle"], "Pick up the Magic Water north of the Roadside Inn", "The sparkling pile north of the Roadside Inn on the world map includes the Magic Water. Pick up the whole pile.", {"place": "Roadside Inn"}],
        ["sparkle-northwest-of-the-roadside-inn", ["sparkle"], "Pick up the Turban northwest of the Roadside Inn", "The sparkling pile northwest of the Roadside Inn on the world map includes the Turban. Pick up the whole pile.", {"place": "Roadside Inn"}],
      ],
    },
  ],
} satisfies RawChapter;

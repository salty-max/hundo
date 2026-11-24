import type { RawChapter } from "@hundo/core/types";

export default {
  id: 18,
  title: "Radiant Manor",
  region: "Radiant Manor",
  teaser: "Radiant Manor",
  intro: "Radiant Manor: the Foyer’s library, the greenhouse, the rafters and the gallery, eight hidden cats for Meowstro’s choir, and the Manor’s last fights.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/radiant-manor"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "The Foyer and the greenhouse",
      location: "Radiant Manor",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"]],
      rows: [
        ["route-manor-library", ["route"], "Find the Foyer’s library", "The library is through the door right of the Foyer’s big mirror.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-manor-foyer-library", ["bonestone"], "Get the Bonestone in the Foyer’s library", "Break the pillar to uncover a ladder, and climb to the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["route-greenhouse", ["route"], "Return the greenhouse statue head", "Use the four levers to raise the pond platforms, carry the head back and reset the platforms with throws where needed.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/radiant-manor"}],
        ["route-manor-choir", ["route"], "Find the eight cats of the choir", "Eight cats hide around the Manor. They don’t count on their own, but Meowstro’s Bonestone needs them all: in the first big room, behind the wall above the left mimic; outside, through the corridor left of the main room, north between the statues, in the wall under the bridge; at the top left of the mousetrap attic; above the spike switch at the main room’s upper left, under a dirt patch; just right of that, dropping between the small pillars into a wall hole; behind the left wall, after burrowing under the soldier who sells Spring Heels; behind the windows at the end of the glass-window section, past the miniboss; and behind the Kear lock at the bottom right of the central room.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "The rafters and the gallery",
      location: "Radiant Manor",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["The 100% checklist (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/checklist"]],
      rows: [
        ["trinket-dodging-pendulum", ["trinket"], "Get Dodging Pendulum from the mimic", "In the first big room, at the top right, clear the plants to a passage with two mimics: the one on the right drops Dodging Pendulum.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["route-manor-rafters", ["route"], "Search the Rafters", "Burrow past mousetraps and give exploding bats room.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/radiant-manor"}],
        ["bonestone-manor-rafters", ["bonestone"], "Get the Bonestone in the mousetrap attic", "In the attic with the mousetraps, break the wall at the top right.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["route-manor-gallery", ["route"], "Cross the Gallery", "Use the levers to alternate spike paths.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/radiant-manor"}],
        ["trinket-spring-heels", ["trinket"], "Buy Spring Heels from the soldier", "Right of the central room, past the spike switches, an Underlab sits on a purple carpet: take the hole in the railing at the bottom, and a soldier sells Spring Heels for 2,000 Bones.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-manor-ballroom", ["bonestone"], "Get the Bonestone above the central room", "On your second loop to the top of the central room, take the jump pad right of the big enemy, then go right to the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-manor-ballroom-tile-chamber", ["bonestone"], "Get the Bonestone under the spikes", "Back to the left, clear the plants in the covered stretch and press the switch: drop where the spikes were, and the chest is below.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["boss-furgus", ["boss"], "Beat Furgus", "Furgus, the Manor’s butler, fights you.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses"}],
        ["route-manor-roof", ["route"], "Open the rooftop shortcuts", "Lower the rope toward the Courtyard, then flip the golden floor tiles on the Rooftop.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/radiant-manor"}],
        ["bonestone-manor-meowstros-chamber", ["bonestone"], "Get Meowstro’s Bonestone", "With all eight found, set each cat to its height, by hitting it, burrowing under it or jumping on it, then talk to the lone cat on the left behind that last lock: the gem is the choir’s reward.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "Before the finale",
      location: "Radiant Manor",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"]],
      rows: [
        ["bonestone-ossex-institute-completion", ["bonestone"], "Trade the spare Kears for the last Bonestone", "With all 40 Kear locks opened, the Manor’s included, and all 50 Kears found, give the 10 left over to the person on the left in the Kear Institute.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Ossex"}],
        ["route-native-audit", ["route"], "Check each region’s count on the Enhanced Map", "Once you own the Enhanced Map, it shows each region’s collectible progress: look for any region short of full before the last fights.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "The finale",
      location: "Radiant Manor",
      sources: [["Bosses (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bosses"]],
      rows: [
        ["route-final-lions", ["route"], "Clear the Dining Room approach", "Use the side rocks and explosive barrels against the two Paladin Lions.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/radiant-manor"}],
        ["boss-lionel", ["boss"], "Beat Lionel", "A duel with Lionel in Radiant Manor.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses"}],
        ["boss-radiant-lionel", ["boss"], "Beat Radiant Lionel", "The last fight, with Lionel on the Prime Generator itself.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses"}],
        ["route-generator-prime", ["route"], "Restore the Prime Generator", "Win the fight on the Prime Generator, and the island’s last generator runs again.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/radiant-manor"}],
      ],
    },
  ],
} satisfies RawChapter;

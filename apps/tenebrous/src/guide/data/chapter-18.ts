import type { RawChapter } from "@hundo/core/types";

export default {
  id: 18,
  title: "Radiant Manor",
  region: "Radiant Manor",
  teaser: "Radiant Manor",
  intro: "Search both Manor wings, reunite the choir and finish the ordinary ending on the collection save.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/radiant-manor"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "The greenhouse, rafters and gallery",
      location: "Radiant Manor",
      rows: [
        ["route-manor-library", ["route"], "Search the Foyer library before entering the main wing", "Search the library off the Foyer.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/radiant-manor"}],
        ["route-greenhouse", ["route"], "Return the greenhouse statue head", "Use the four levers to raise the pond platforms, carry the head back and reset the platforms with throws where needed.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/radiant-manor"}],
        ["route-manor-rafters", ["route"], "Search the Rafters and open the Ballroom return", "Burrow past mousetraps and give exploding bats room.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/radiant-manor"}],
        ["route-manor-choir", ["route"], "Find the hidden choir members as you explore", "Check breakable walls, back rooms and the high platform detour for purple creatures.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/radiant-manor"}],
        ["route-manor-gallery", ["route"], "Cross the Gallery and visit the Servants’ Quarters", "Use the levers to alternate spike paths.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/radiant-manor"}],
        ["boss-furgus", ["boss"], "Beat Furgus", "Radiant Manor’s butler.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses", "place": "Radiant Manor"}],
        ["route-manor-roof", ["route"], "Open the rooftop shortcuts", "Lower the rope toward the Courtyard, then flip the golden floor tiles on the Rooftop.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/radiant-manor"}],
      ],
    },
    {
      title: "Last rooms and the finale",
      location: "Radiant Manor",
      rows: [
        ["route-manor-ballroom", ["route"], "Clear both upper Ballroom chest routes", "Lower the chamber spikes, cross the arrow-switched tile room for one chest, then drop through the cleared bushes for the other.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/radiant-manor"}],
        ["route-manor-performance", ["route"], "Return to Meowstro after finding the choir", "Use the back-room picture to arrange the cats, collect the performance reward and revisit any remaining map counter gaps before the Dining Room.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/radiant-manor"}],
        ["route-final-lions", ["route"], "Clear the Dining Room approach", "Use the side rocks and explosive barrels against the two Paladin Lions.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/radiant-manor"}],
        ["boss-lionel", ["boss"], "Beat Lionel", "A duel in Radiant Manor.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses", "place": "Radiant Manor"}],
        ["boss-radiant-lionel", ["boss"], "Beat Radiant Lionel", "Final boss at the Prime Generator, Radiant Manor; the last duel with Lionel.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses", "place": "Radiant Manor"}],
        ["route-generator-prime", ["route"], "Finish the Prime Generator sequence", "Finish the last generator after the final fights.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/radiant-manor"}],
      ],
    },
    {
      title: "Remaining room checks",
      location: "Radiant Manor",
      compact: true,
      rows: [
        ["bonestone-ossex-institute-completion", ["bonestone"], "Get the Bonestone: Institute Completion", "With all 40 locks opened and all 50 Kears found, give the 10 spare Kears to the left NPC in the Kear shop.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Ossex"}],
        ["trinket-dodging-pendulum", ["trinket"], "Get Dodging Pendulum", "Dropped by the miniboss.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Radiant Manor"}],
        ["bonestone-manor-rafters", ["bonestone"], "Get the Bonestone: Rafters", "Break the destructible wall.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Radiant Manor"}],
        ["trinket-spring-heels", ["trinket"], "Get Spring Heels", "The Trooper sells it for 2000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Radiant Manor"}],
        ["bonestone-manor-ballroom", ["bonestone"], "Get the Bonestone: Ballroom", "Head right to the far end.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Radiant Manor"}],
        ["bonestone-manor-ballroom-tile-chamber", ["bonestone"], "Get the Bonestone: Ballroom Tile Chamber", "From the dance hall’s top floor, drop at the indicated spot.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Radiant Manor"}],
        ["bonestone-manor-meowstros-chamber", ["bonestone"], "Get the Bonestone: behind a locked door, Meowstro", "Meowstro’s reward behind a locked door for rescuing every scattered chorus member; not a chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Radiant Manor"}],
        ["bonestone-manor-foyer-library", ["bonestone"], "Get the Bonestone: foyer library", "Destroy the right pillar to reveal a ladder and climb; the Foyer’s only secret.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Radiant Manor"}],
      ],
    },
  ],
} satisfies RawChapter;

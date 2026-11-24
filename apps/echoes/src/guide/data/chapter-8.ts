import type { RawChapter } from "@hundo/core/types";

export default {
  id: 8,
  title: "Eternal Forest and finale",
  region: "Eternal Forest",
  teaser: "Eternal Forest and finale",
  intro: "Start here once the three Goddess Sanctions are complete. This chapter gives the final puzzle and boss solutions.",
  sources: [
    ["Eternal Forest and the six pedestals", "https://www.nintendolife.com/guides/zelda-echoes-of-wisdom-the-eternal-forest-walkthrough"],
    ["Forest chests, crystal and Lynel", "https://zeldawiki.wiki/wiki/Eternal_Forest"],
    ["Zelda's Echo strategy", "https://www.nintendolife.com/guides/zelda-echoes-of-wisdom-how-to-defeat-zeldas-echo"],
    ["Final dungeon and reloading the clear save", "https://www.nintendolife.com/guides/zelda-echoes-of-wisdom-nulls-body-walkthrough"],
    ["Null's three phases", "https://www.nintendolife.com/guides/zelda-echoes-of-wisdom-how-to-defeat-null"],
    ["Ancient Ruins and final platform rooms", "https://www.thonky.com/zelda-echoes-of-wisdom/stilled-ancient-ruins"],
  ],
  groups: [
    {
      title: "The six forest pedestals",
      rows: [
        ["story-prime-energy", ["story"], "Speak to the king after the last regional temple", "After the scene and Zelda's return to her room, go to the throne room. Leave for the Eternal Forest north of Hyrule Field."],
        ["waypoint-eternal-forest", ["waypoint"], "Activate the Eternal Forest Waypoint", "Follow the forest entrance north to the warp stone. The trees and fog can hide the paths, so use the map to keep your bearings."],
        ["echo-ancient-orb", ["echo"], "Learn Ancient Orb by the stone tablet", "At the puzzle site, examine the tablet and copy the orb. Summon one on each pedestal. The pattern on the tablet shows the rough positions of the six sites."],
        ["orb-eternal-tablet", ["route"], "Place an orb on the tablet pedestal", "Start with the empty pedestal beside the tablet."],
        ["orb-eternal-moblin", ["route"], "Place an orb near the blue Sword Moblin", "Head southwest from the tablet. Look around the Moblin clearing for the pedestal."],
        ["orb-eternal-southwest", ["route"], "Place an orb in the southwestern clearing", "Continue southwest from the Moblin site to a smaller clearing and fill the pedestal."],
        ["orb-eternal-south", ["route"], "Place an orb beside the trees on the south side", "Follow the southern stretch of the triangle toward the center of the forest."],
        ["orb-eternal-southeast", ["route"], "Place an orb in the southeastern tree nook", "Look for the pedestal tucked between trees near the southeast corner."],
        ["orb-eternal-baba", ["route"], "Clear the Deku Baba and fill the northwest pedestal", "Pull the plant's head with Bind and summon the last orb where it stood. Return to the tablet and take the route that opens to the Deku Tree."],
      ],
    },
    {
      title: "Forest detours",
      rows: [
        ["echo-lynel", ["echo"], "Follow the hoofprints and learn Lynel", "Start with the tracks just south of the Waypoint. Follow them in order around to the clearing east of the stone, which makes the Lynel appear. Keep a strong echo between you and the Lynel. Let it finish a charge before you close in to attack, then learn it when it falls."],
        ["crystal-eternal-forest-grass", ["might-crystal"], "Find the Might Crystal in the grass ring above the trees", "Climb above the treeline northwest of the Lynel clearing and check the center of the grass ring.", { quantity: 1 }],
        ["chest-eternal-south-stone", ["chest", "overworld-chest"], "Pull up the Monster Stone chest south of the entrance", "Bind the partially buried chest and pull it free."],
        ["chest-eternal-west-rupees", ["chest", "overworld-chest"], "Pull up the 50-rupee chest in the western clearing", "Look in the westernmost clearing with Sword Moblin Lv. 3 and use Bind on the buried chest."],
        ["chest-eternal-northwest-stone", ["chest", "overworld-chest"], "Open the Monster Stone chest in the northwest nook", "Follow the forest's northwest edge to the alcove before returning to the main route."],
      ],
    },
    {
      title: "Stilled Ancient Ruins",
      rows: [
        ["story-ancient-ruins", ["story"], "Follow the Deku Tree's route into the Ancient Ruins", "Go past the opened stone puzzle to the tree and take the elevator. Enter the rift once Tri opens it."],
        ["story-stilled-ancient-grass-ice", ["story"], "Cross the grassy and frozen sections of the rift", "Follow the floating ground north. The branches rejoin higher up. Use a fire echo on the ice pillars and keep clear of the Freezards' breath."],
        ["story-stilled-ancient-lava", ["story"], "Cross the lava using Lava Rocks and a flying echo", "Place Lava Rocks on the rising jets. Ride wind with a held Ghirro or another gliding echo, then glide west to the small grass platform and climb."],
        ["dungeon-waypoint-ancient-ruins", ["dungeon-waypoint", "waypoint"], "Activate the Waypoint at the top of the Ancient Ruins", "Use the stone before approaching the boss plateau."],
        ["story-echo-zelda", ["story"], "Defeat Zelda's Echo", "Send a strong monster into the summoned waves while you aim the Bow of Might at the floating boss. Strike with sword or echoes when she falls. Repeat against the stronger summons and use their energy drops to keep your bow available."],
        ["story-rescue-link", ["story"], "Free Link from the crystal", "Fire an arrow at the crystal after the fight. You can still leave to finish optional tasks. Zelda gives Link the Swordfighter weapons before the final dungeon, so set up your fighting and swimming echoes first."],
      ],
    },
    {
      title: "Null's Body",
      note: "There are no treasure chests inside Null's Body. Enter when you are ready for the final fight or do the collection sweep first.",
      rows: [
        ["story-nulls-body-entrance", ["story"], "Enter with Link and clear the first combat rooms", "Speak to Link when ready. Follow him and summon combat echoes to help clear each wave."],
        ["story-nulls-body-separated", ["story"], "Cross the gap and help Link through the bars", "After the paths separate, use Clouds to go right. Clear your enemies first. Send an echo through the bars to fight the monsters trapping Link on the other side."],
        ["story-nulls-body-platforms", ["story"], "Cross the moving platforms and climb past the Gustmasters", "Use Clouds or Reverse Bond to move between the platforms. Avoid the wind while crossing, then grab a flying echo and use the air currents to climb."],
        ["story-nulls-body-switch", ["story"], "Build steps so Link can reach the switch", "Place boxes or beds on Link's side of the bars or use Bind to guide him up. Get him to the far right so he can cut the barrier and trigger the switch. Rejoin him and drop down the final hole."],
      ],
    },
    {
      title: "Null and the clear save",
      rows: [
        ["story-null-first-phase", ["story"], "Pull Null's arms so Link can cut them", "After a claw slam and shockwave, Bind a hand and pull it out for Link. Remove all three arms and have your echoes attack the body. When arms emerge from the walls, use the same opening while staying clear of the shockwaves and pools."],
        ["story-null-water-phase", ["story"], "Pursue Null through the flooded passage", "Use Chompfin or another strong swimming echo. Move around the whirlpools and refill air at bubbles. Bind and stretch the tentacles so the summoned echo can attack, then hit the body when it collapses."],
        ["story-null-final-phase", ["story"], "Clear the last arm cycles and finish the fight", "Back on land, use Bind to set up Link's attacks on the six arms. Keep moving as echoes of earlier bosses appear. Burn webs if they block the route, and attack the body after the arms are gone. Follow the final on-screen prompt."],
        ["story-clear-save", ["story"], "Finish the credits and reopen the starred save", "Load the clear save to return to the point before the final dungeon. Use the collection counters and speak to the Deku Tree for a region hint if you're missing Echoes."],
      ],
    },
  ],
} satisfies RawChapter;

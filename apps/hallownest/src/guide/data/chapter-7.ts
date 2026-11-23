import type { RawChapter } from "@hundo/core/types";

export default {
  id: 7,
  title: "Kingdom’s Edge and the Abyss",
  region: "City of Tears · Kingdom’s Edge · Ancient Basin",
  teaser: "Kingdom’s Edge",
  intro: "Open the City’s east side and Lurien’s spire, cross the flooded stagway into Kingdom’s Edge for the King’s Brand, then carry it down to the sealed door at the bottom of the Basin for the Shade Cloak.",
  sources: [["Steam guide ch 15–16 and 22–23 · east City, Kingdom’s Edge, the Abyss and the Watcher’s Spire", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"], ["Kingdom’s Edge entrances, Markoth, Oro, Quick Slash and the Cast-Off Shell", "https://hollowknight.wiki/w/Kingdom%27s_Edge"], ["The Abyss: lighthouse, Shade Cloak, Abyss Shriek and no benches", "https://hollowknight.wiki/w/The_Abyss_(Hollow_Knight)"]],
  groups: [
    {
      title: "King’s Station and the Watcher’s Spire",
      location: "City of Tears",
      sources: [["East City access, King’s Station and the Watcher’s Spire", "https://hollowknight.wiki/w/City_of_Tears"], ["Resting Grounds lift to the City", "https://hollowknight.wiki/w/Resting_Grounds"], ["King’s Station toll", "https://hollowknight.wiki/w/Fast_Travel_(Hollow_Knight)"], ["Watcher Knights: chandelier, rolls and spells", "https://hollowknight.wiki/w/Watcher_Knight"], ["Lurien: lift and seal", "https://hollowknight.wiki/w/Lurien_the_Watcher"]],
      rows: [
        ["route-east-city", ["route"], "Reach the City’s eastern half", "Dive through the fragile grave below the Resting Grounds station into the crypts, then head west and break through the wall into the lift room. Ride the lift down into the east City, then work your way down the tower below and its lift shafts until you come out in King’s Station."],
        ["stag-kings-station", ["stag"], "Open King’s Station", "King’s Station is at the City’s far east end. Pay 300 Geo at its toll. Its lowest level is a ruined, flooded stagway, which is your way on to Kingdom’s Edge."],
        ["route-watcher-spire", ["route"], "Climb the Watcher’s Spire and drop the chandelier", "The Watcher’s Spire stands in the east City; Monarch Wings get you in, or a nail-bounce off a background object by its entrance. Climb it, hitting the levers that open its doors. Just before the arena gate, get up into the ceiling there and head right to cut the chain: the chandelier falls on one of the six knights below and leaves you five to fight."],
        ["boss-watcher-knights", ["boss", "percent-boss"], "Defeat the Watcher Knights", "The knights wake one or two at a time, never more than two. A rolling knight shrugs off your nail but not your spells, so save SOUL for those moments, and stay in the air rather than getting pinned between them."],
        ["dreamer-lurien", ["dreamer"], "Reach Lurien above the Watcher Knights", "Past the arena, leave by the central opening overhead and ride the lift to the top of the tower. Dream Nail Lurien’s body, strike him in the dream, then Focus to break his seal. Head back down to King’s Station afterwards."],
      ],
    },
    {
      title: "The upper cliffs and the Brand",
      location: "Kingdom’s Edge",
      sources: [["Map price", "https://hollowknight.wiki/w/Cornifer"], ["Dash Slash price", "https://hollowknight.wiki/w/Nailmaster_Oro"], ["Hornet’s spike traps and parry", "https://hollowknight.wiki/w/Hornet_Sentinel"], ["King’s Brand and the collapsing shell", "https://hollowknight.wiki/w/King%27s_Brand"]],
      rows: [
        ["route-edge-tunnel", ["route"], "Enter Kingdom’s Edge through the flooded station route", "The way in is the flooded, ruined stagway at the very bottom of King’s Station. Swim under the wall on its far right and keep going east through the hidden passage until it opens onto the central cliff of Kingdom’s Edge, where the ash falls."],
        ["map-kingdoms-edge", ["map"], "Buy Cornifer’s Kingdom’s Edge map", "He’s close to where you come in: go down the right-hand wall from the first ledge. Cornifer is humming inside a pipe there and sells the map for 112 Geo."],
        ["nail-art-oro", ["nail-art"], "Learn Dash Slash from Nailmaster Oro", "Oro’s hut is at the far end of Kingdom’s Edge, in its south-east, past a stretch of Great Hoppers. He teaches Dash Slash for 800 Geo."],
        ["boss-hornet-sentinel", ["boss", "percent-boss"], "Defeat Hornet at Kingdom’s Edge", "Keep heading east until Hornet leads you into her arena where the Cast-Off Shell begins, in the far east of the area. Cut down the hanging spike traps she sets with your nail or spells before they pile up, and don’t swing at her while she holds her needle up to parry: a hit then earns you a wide counter."],
        ["equipment-kings-brand", ["equipment"], "Collect King’s Brand from the Cast-Off Shell", "After the fight, go right and down, then all the way left into the Cast-Off Shell; Crystal Heart crosses its long floor quickly. The King’s Brand lies in a broken egg at the far end. Taking it brings the shell down and Hornet pulls you out; the shell stays sealed for good. Ride the Stag from King’s Station to the Hidden Station to carry the Brand to the Basin."],
      ],
    },
    {
      title: "Beyond the Basin door",
      location: "The Abyss",
      sources: [["Steam guide ch 9 · the Basin fountain and its running count", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"], ["gamerwalkthroughs · the fountain takes only 3,000 Geo", "https://gamerwalkthroughs.com/hollow-knight/ancient-basin/"], ["Wiki · the Basin fountain", "https://hollowknight.wiki/w/Ancient_Basin"], ["Abyss gate at the bottom of the Basin", "https://hollowknight.wiki/w/King%27s_Brand"], ["Shade Cloak: lighthouse and Void bowl", "https://hollowknight.wiki/w/Shade_Cloak"]],
      rows: [
        ["vessel-fragment-basin-fountain", ["vessel-fragment"], "Pay the Ancient Basin fountain", "On the way down to the Abyss gate, stop at the statue fountain in the first alcove down the right side of the Basin’s central room. It gives a Vessel Fragment once it has received 3,000 Geo in all. It keeps count, so whatever you paid in chapter 5 counts, and whatever its inscription suggests it never takes more than that.", { place: "Ancient Basin" }],
        ["route-abyss-door", ["route"], "Open the Abyss with King’s Brand", "From the Hidden Station, cross to the Basin’s central hub room and drop through its floor. Down and to the left is the gate at the bottom of the Basin, which opens for the King’s Brand. The Abyss has no benches, so arrive healthy."],
        ["equipment-shade-cloak", ["equipment"], "Collect Shade Cloak across the Void lake", "From the bottom of the Abyss, head east to the lighthouse on the shore of the Void sea. Climb inside and pull the lever: the light calms the tendrils in the sea, and Crystal Heart carries you across. At the far end, stand in the bowl of Void held by a corpse. It turns your Mothwing Cloak into the Shade Cloak, whose dash passes through enemies, their attacks and shade gates."],
        ["spell-abyss-shriek", ["spell"], "Upgrade Howling Wraiths to Abyss Shriek", "At the bottom of the Abyss, go west to the end of the hall, where an altar is ringed by screaming faces. Cast Howling Wraiths in the middle of that room and it becomes Abyss Shriek."],
      ],
    },
    {
      title: "High ledges and secret rooms in the East",
      location: "Kingdom’s Edge · City of Tears",
      sources: [["Steam guide ch 15 and 22 · King’s Station fragment and Quick Slash", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"], ["Quick Slash: floor by the training dummy", "https://hollowknight.wiki/w/Quick_Slash"], ["Vessel Fragment above King’s Station", "https://hollowknight.wiki/w/Vessel_Fragment"], ["Markoth: shade gate, Essence and fight", "https://hollowknight.wiki/w/Markoth"]],
      compact: true,
      rows: [
        ["charm-quick-slash", ["charm"], "Find Quick Slash near Oro’s hut", "Beside the training dummy east of Oro’s hut, smash the loose floor with Desolate Dive or Descending Dark and keep diving through the floors below. At the bottom, loop back west and up: a tunnel in the wall leads to an anvil in front of a huge dead nailsmith, with the charm on it."],
        ["vessel-fragment-kings-station", ["vessel-fragment"], "Collect the fragment above King’s Station", "Above King’s Station, near the lift from the Resting Grounds, an exit in the ceiling leads to a gauntlet of City guards. Beat them and the fragment waits at the far end."],
        ["warrior-dream-markoth", ["warrior-dream"], "Defeat Markoth in the eastern cliff grave", "Back in Kingdom’s Edge, Markoth lies east of the central cliff behind a shade gate: dash through it with the Shade Cloak and Dream Nail his corpse. His thrown nails stop turning once they fly, so keep moving; cling to a wall and fire spells at him, and heal while his shield is spinning out wide. 250 Essence."],
      ],
    },
    {
      title: "East City and Kingdom’s Edge jars",
      location: "City of Tears · Kingdom’s Edge",
      sources: [["Steam guide ch 15, 22 and 23 · east City and Kingdom’s Edge jars", "https://steamcommunity.com/sharedfiles/filedetails/?id=3005043947"], ["Grub locations and guards", "https://hollowknight.wiki/w/Grub"]],
      map: ["ScriptersWar", "https://scripterswar.com/hollowknight/map"],
      compact: true,
      rows: [
        ["grub-city-belfly", ["grub"], "Free the Grub below the Belfly ledge", "In the flooded tunnel from King’s Station to Kingdom’s Edge, the jar sits just below the path, with Belflies hanging over it. Deal with them before you drop down."],
        ["grub-edge-cracked-wall", ["grub"], "Free the Grub behind the low eastern wall", "This jar hides behind a breakable wall near spikes, with a Primal Aspid close by. Take the lower way down through the room, smash the wall at its bottom right and climb up behind it."],
        ["grub-edge-oro", ["grub"], "Free the Grub below the brittle floors beside Oro", "Take the same dive as for Quick Slash, through the loose floors by Oro’s training dummy, but at the very bottom head east instead. The jar is past a Great Hopper and a spiked stretch."],
        ["grub-city-great-husk", ["grub"], "Free the Grub behind the Great Husk Sentry", "This jar is in a house just west of King’s Station. Leave the station by its lower west exit and the house door is on the ledge right above it. The Great Husk Sentry inside has to go first."],
        ["grub-city-watcher", ["grub"], "Free the Grub on the Watcher’s Spire side route", "This jar is on the Watcher’s Spire’s east side, watched over by a Lance Sentry and a Great Husk Sentry. Past the lever doors, take the room’s upper-right exit; the jar’s room is through the right-hand gap in the ceiling of the room after it."],
      ],
    },
  ],
} satisfies RawChapter;

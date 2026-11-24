import type { RawChapter } from "@hundo/core/types";

export default {
  id: 15,
  title: "Return journeys",
  region: "Return journeys",
  teaser: "Return journeys",
  intro: "Carry the later movement tools back through earlier regions for delivery tasks, optional encounters and high ledges.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/ossex"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "Use the new tools across earlier regions",
      location: "Return journeys",
      rows: [
        ["route-return-tools", ["route"], "Take your new tools back to earlier regions", "The rows below say what each spot needs.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/ossex"}],
        ["route-snowball-return", ["route"], "Carry a mountain snowball to Franz", "Take a snowball from Coltrane Peak back to the old man’s house in Western Wilds.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/ossex"}],
        ["route-docks-lantern-return", ["route"], "Return for the high swamp and crypt side routes", "Use Pinky’s ladder to reach Lantern Cave’s Spark door, then work upward through the lit platforms.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/ossex"}],
        ["route-optional-fights", ["route"], "Find the optional fights", "Each fight below says where it waits and what opens it.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/ossex"}],
      ],
    },
    {
      title: "Coltrane Peak — return checks",
      location: "Coltrane Peak",
      compact: true,
      rows: [
        ["fish-fishcicle-core", ["fish"], "Catch a Fishcicle", "Catch a Fishcicle in Coltrane Peak.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Coltrane Peak", "requires": ["angling-fishing-rod"]}],
        ["trinket-dummy-cache", ["trinket"], "Get Dummy Cache", "Carry a snowball down from Coltrane Peak by way of Eastern Heath, Ossex and the Southern Outskirts, without letting it be hit or climbing a rope, and hit Franz with it.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Coltrane Peak", "requires": ["route-snowball-return"]}],
      ],
    },
    {
      title: "Septemburg — return checks",
      location: "Septemburg",
      compact: true,
      rows: [
        ["spark-container-dark-deluxy", ["spark-container"], "Get the Spark Container from Dark Deluxy", "Escort Luxy, beat Dark Deluxy, then heal her with a spare Plasma Vial.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Septemburg"}],
        ["fish-spincer-pincers", ["fish"], "Catch a Spincer", "Catch a Spincer in Septemburg.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Septemburg", "requires": ["angling-fishing-rod"]}],
        ["boss-dark-deluxy", ["boss"], "Beat Dark Deluxy", "Windy Generator, door sealed by two Spark slots; escort Luxy back. Optional; healing her after gives a Spark Container.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses", "place": "Septemburg"}],
      ],
    },
    {
      title: "Backwaters — return checks",
      location: "Backwaters",
      compact: true,
      rows: [
        ["bonestone-backwaters-lantern-cave", ["bonestone"], "Get the Bonestone: lantern Cave, flooded vertical cave", "Pinky’s ladder at the one-Spark door, climb the lanterns for the gem; 500 Shard.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Backwaters"}],
        ["vial-pouch-lantern-cave", ["vial-pouch"], "Get the Vial Pouch: Lantern Cave", "Pinky’s ladder at the Spark door by the waterfall; chest on a ledge.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Backwaters"}],
        ["trinket-plasma-jug", ["trinket"], "Upgrade the jug to the Plasma Jug", "Kill 50 enemies holding it, return it and win the fight for the Plasma Jug.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Backwaters", "requires": ["quest-gluttons-jug"]}],
      ],
    },
    {
      title: "Sandfalls — return checks",
      location: "Sandfalls",
      compact: true,
      rows: [
        ["fish-puffer-beak", ["fish"], "Catch a Bouncy Puffy", "Catch a Bouncy Puffy in Sandfalls.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Sandfalls", "requires": ["angling-fishing-rod"]}],
      ],
    },
    {
      title: "Queensbury Crypt — return checks",
      location: "Queensbury Crypt",
      compact: true,
      rows: [
        ["fish-tombstone", ["fish"], "Catch a Ghost Fish", "Catch a Ghost Fish in Queensbury Crypt.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Queensbury Crypt", "requires": ["angling-fishing-rod"]}],
        ["spark-container-head-escort", ["spark-container"], "Get the Spark Container: Head Escort", "Switch, two locks, carry a statue head back through Mourner’s Mile to a headless statue; spikes drop; chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Queensbury Crypt"}],
        ["bonestone-mile-knights-rest-after-generator", ["bonestone"], "Get the Bonestone: Knight’s Rest Post Generator", "Burrow at the shiny spot.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Queensbury Crypt"}],
      ],
    },
    {
      title: "Ossex — return checks",
      location: "Ossex",
      compact: true,
      rows: [
        ["fish-triple-flagellum", ["fish"], "Catch a Flag Fish", "Catch a Flag Fish in Ossex.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex", "requires": ["angling-fishing-rod"]}],
        ["trinket-warding-beastium", ["trinket"], "Get Warding Beastium", "A chest at the edge of the courtyard.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex"}],
        ["health-rose-evra", ["health-rose"], "Get the Health Rose from Evra", "After defeating Evra, collect the Health Rose in her arena beyond Goddred’s Grave.", {"reference": "https://meowdb.com/db/mina-the-hollower/upgrades", "place": "Ossex"}],
        ["bonestone-ossex-strategy-center", ["bonestone"], "Get the Bonestone: strategy Center, High Street", "Break the table from the courtyard with Volt Hatchet, then burrow under it.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Ossex"}],
        ["bonestone-ossex-strategy-center-ophidio", ["bonestone"], "Get the Bonestone: strategy Center, High Street", "An upgraded Whisper and Vesper kills the green snake head-on; it drops the gem.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Ossex"}],
        ["trinket-pneumatic-armlet", ["trinket"], "Get Pneumatic Armlet", "Reward for beating Wonder Willis, Ossex.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Ossex"}],
        ["boss-armand", ["boss"], "Beat Armand", "Forge under Legovich’s Arms, triggered by buying a second item; optional; reopens the smithy.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses", "place": "Ossex"}],
        ["boss-evra", ["boss"], "Beat Evra", "A secret boss in Goddred’s Grave, off the Septemburg Courtyard; the room it opens holds a Health Rose.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses", "place": "Ossex"}],
        ["boss-wonder-willis", ["boss"], "Beat Wonder Willis", "Secret pirate-shark boss in the Ossex Music Hall, end of the longest sidequest; gives Pneumatic Armlet.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses", "place": "Ossex", "requires": ["trinket-tumbling-tutu"]}],
      ],
    },
    {
      title: "Bone Beach — return checks",
      location: "Bone Beach",
      compact: true,
      rows: [
        ["fish-goremaw-fang", ["fish"], "Catch a Goremaw", "Catch a Goremaw in Bone Beach.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Bone Beach", "requires": ["angling-fishing-rod"]}],
        ["bonestone-beach-behind-furgus-tunnel", ["bonestone"], "Get the Bonestone: Behind Furgus Tunnel", "Break the wall on the first screen; chest behind the tower (if the NPC is still there, come back later).", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Bone Beach"}],
        ["kear-beach-mite", ["kear"], "Get the Kear: old man’s hat", "After the Bone Beach boss, beat the old man’s former pet Mite for his hat and a Kear.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Bone Beach"}],
      ],
    },
    {
      title: "Nox’s Bayou — return checks",
      location: "Nox’s Bayou",
      compact: true,
      rows: [
        ["fish-shrimpter-tail", ["fish"], "Catch a Shrimpter", "Catch a Shrimpter in Nox’s Bayou.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Nox’s Bayou", "requires": ["angling-fishing-rod"]}],
      ],
    },
    {
      title: "Eastern Heath — return checks",
      location: "Eastern Heath",
      compact: true,
      rows: [
        ["fish-dork-eyes", ["fish"], "Catch a Pink Eyed Dork", "Catch a Pink Eyed Dork in Eastern Heath.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Eastern Heath", "requires": ["angling-fishing-rod"]}],
        ["bonestone-heath-bush-room-locked", ["bonestone"], "Get the Bonestone: Bush Room Locked", "A Kear lock opens onto a chest.", {"reference": "https://www.gamerguides.com/mina-the-hollower/guide", "place": "Eastern Heath"}],
        ["bonestone-heath-beside-kite", ["bonestone"], "Get the Bonestone: east bank near the kite-flying boy", "Northern cliffs (Kear), cave past the falls, south, chest by the bridge cliff.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Eastern Heath"}],
        ["trinket-windfall-charm", ["trinket"], "Get Windfall Charm", "Shoot down the boy’s kite with a ranged attack.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Eastern Heath"}],
        ["joule-box-bucklers-bluff", ["joule-box"], "Get the Joule Box: Buckler’s Bluff", "Top chest of Buckler’s Bluff, the Eastern Heath climbing challenge; needs the Drill Driver.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Eastern Heath"}],
      ],
    },
    {
      title: "Mourner’s Mile — return checks",
      location: "Mourner’s Mile",
      compact: true,
      rows: [
        ["bonestone-mile-minas-grave", ["bonestone"], "Get the Bonestone: Mina’s Grave", "The door to the grave needs three Spark Containers. Dig into the grave inside for a run on one health point.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Mourner’s Mile", "requires": ["spark-container-emporium", "spark-container-dark-deluxy", "spark-container-head-escort"]}],
        ["trinket-starving-beastium", ["trinket"], "Get Starving Beastium", "Chest once the nightmare world is cleared.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Mourner’s Mile"}],
      ],
    },
    {
      title: "Western Wilds — return checks",
      location: "Western Wilds",
      compact: true,
      rows: [
        ["kear-wilds-secret-passage", ["kear"], "Get the Kear: puddle cavern chest", "South gate of Ossex, left past minotaurs and a crow; burrow the puddle near the upper exit, Drill Driver over the pit.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Western Wilds"}],
        ["joule-box-secret-passage-locked", ["joule-box"], "Get the Joule Box: Secret Passage", "Burrow into the first screen’s pond; Drill Driver over the gap to the locked chest, past a Kear chest.", {"reference": "https://www.gamerguides.com/mina-the-hollower/guide/collectibles/upgrades/all-joule-box-locations", "place": "Western Wilds"}],
        ["bonestone-wilds-leaf-area", ["bonestone"], "Get the Bonestone: Leaf Area", "Break the crystal at the lava area’s left end; area above (later the leaf NPCs’ room).", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Western Wilds"}],
        ["fish-cuddlepus-shell", ["fish"], "Catch a Cuddlepus", "Catch a Cuddlepus in Western Wilds. Only in lava.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Western Wilds", "requires": ["angling-fishing-rod"]}],
        ["fish-glomper-stalk", ["fish"], "Catch a Glomper", "Catch a Glomper in Western Wilds.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Western Wilds", "requires": ["angling-fishing-rod"]}],
      ],
    },
    {
      title: "Southern Outskirts — return checks",
      location: "Southern Outskirts",
      compact: true,
      rows: [
        ["kear-outskirts-commons-ossex-entry-wall-left", ["kear"], "Get the Kear: upper Bowery cliff chest", "Burrow the fireplace of the upper-bridge house, tunnel to a purple flower, launch across using Drill Driver mid-air.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Southern Outskirts"}],
        ["fish-crumblefin-head", ["fish"], "Catch a Crumblefin", "Catch a Crumblefin in Southern Outskirts. Immune to direct hits: burrow and throw it at a wall.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Southern Outskirts", "requires": ["angling-fishing-rod"]}],
        ["bonestone-outskirts-cave-network", ["bonestone"], "Get the Bonestone: Cave Network", "Pad in the bottom-left corner up to a left-side chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Southern Outskirts"}],
        ["joule-box-cave-network-side-room", ["joule-box"], "Get the Joule Box: Cave Network Side Room", "Chest on a ledge; push the bouncy plant against the blue railings in the west room.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Southern Outskirts"}],
        ["bonestone-outskirts-pit-room", ["bonestone"], "Get the Bonestone: Pit Room", "South exit, second left to the end; dash gaps with Drill Driver; burrow at the sparkly spot.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Southern Outskirts"}],
        ["trinket-lace-glove", ["trinket"], "Get Lace Glove", "Reward for beating Dugin a second time.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Southern Outskirts"}],
        ["boss-dugin-first", ["boss"], "Beat Dugin the first time", "Dugin turns up at a random spot in the Southern Outskirts and has to be beaten twice; this is the first fight.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses"}],
        ["boss-dugin-second", ["boss"], "Beat Dugin 2", "Southern Outskirts, appears at a random spot and must be beaten twice; optional; gives Lace Glove.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses", "place": "Southern Outskirts"}],
      ],
    },
    {
      title: "Kindlewood — return checks",
      location: "Kindlewood",
      compact: true,
      rows: [
        ["fish-gazeworm-eye", ["fish"], "Catch a Gazeworm", "Catch a Gazeworm in Kindlewood.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Kindlewood", "requires": ["angling-fishing-rod"]}],
      ],
    },
  ],
} satisfies RawChapter;

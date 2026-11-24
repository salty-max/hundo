import type { RawChapter } from "@hundo/core/types";

export default {
  id: 15,
  title: "Return journeys",
  region: "Return journeys",
  teaser: "Return journeys",
  intro: "Back across the island with the tools you’ve gathered: the fish the rod can now reach, the doors that want Spark Containers, Ossex’s secret fights, Dugin’s hunt and the ledges that needed the Drill Driver. A Spark door opens once you hold as many Spark Containers as it has slots, and you keep them, so the same three open every one.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/ossex"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "Mourner’s Mile and the crypt",
      location: "Mourner’s Mile",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["The 100% checklist (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/checklist"]],
      rows: [
        ["spark-container-head-escort", ["spark-container"], "Get the Spark Container behind the spikes", "After the crypt’s tower, the way back comes out in Mourner’s Mile, above a door that needs three Spark Containers. A switch there opens a small hole to two Kear locks; past them, carry the statue head back through Mourner’s Mile to the headless statue, and the spikes drop in front of the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-mile-knights-rest-after-generator", ["bonestone"], "Get the Bonestone on the stairs below the locks", "On the stairs just below those two locks, burrow at the shiny spot.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["fish-tombstone", ["fish"], "Catch a Ghost Fish", "Catch a Ghost Fish in the crypt’s dirty water, by the room with the spiked rollers.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["angling-fishing-rod"], "place": "Queensbury Crypt"}],
      ],
    },
    {
      title: "Ossex",
      location: "Ossex",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"], ["Bosses (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bosses"]],
      rows: [
        ["spark-container-emporium", ["spark-container"], "Buy the Emporium’s Spark Container", "The Emporium, south of Ossex’s fountain, sells a single Spark Container.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["fish-triple-flagellum", ["fish"], "Catch a Flag Fish", "Catch a Flag Fish in the pond at Ossex’s bottom right.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["angling-fishing-rod"]}],
        ["trinket-warding-beastium", ["trinket"], "Get Warding Beastium", "In Ossex’s Courtyard, cross the gap on the right with a trinket or sidearm that carries you over gaps: the chest is at the edge.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["boss-evra", ["boss"], "Beat Evra", "Right of Warding Beastium, a Kear opens a lock; the bushes beyond hide a hole down into Goddred’s Grave. Evra waits at its end.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["health-rose-evra", ["health-rose"], "Get the Health Rose from Evra", "Beating Evra gives a Health Rose.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-ossex-strategy-center", ["bonestone"], "Get the Bonestone in the Strategy Center", "The Strategy Center, the red-domed building on Ossex’s east side, opens its red door to a Spark Container. Inside, break the chest beyond the table open from range with a sidearm such as the Volt Hatchet, then burrow under the table to it.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-ossex-strategy-center-ophidio", ["bonestone"], "Get the green snake’s Bonestone", "In the same building, the green snake drops a gem when Whisper and Vesper’s upgraded charged throw hits it.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["boss-armand", ["boss"], "Beat Armand", "Try to buy a second weapon from Legovich and you get a letter instead: Armand is in the forge under the shop. Beat him, and Legovich’s Arms sells again.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses"}],
        ["boss-wonder-willis", ["boss"], "Beat Wonder Willis", "Once Cliff is back with his band, Wonder Willis, a big shark, will fight you in the Ossex Music Hall.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["trinket-tumbling-tutu"]}],
        ["trinket-pneumatic-armlet", ["trinket"], "Get Pneumatic Armlet", "Beating Wonder Willis gives Pneumatic Armlet.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "Septemburg",
      location: "Septemburg",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bosses (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bosses"]],
      rows: [
        ["boss-dark-deluxy", ["boss"], "Beat Dark Deluxy", "In Septemburg’s sewers, in the giant pig’s room, break the top-right wall: the door there needs two Spark Containers. Behind it is Luxy, a moth: lead her to the tower, where Dark Deluxy fights you.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["spark-container-emporium", "spark-container-head-escort"]}],
        ["spark-container-dark-deluxy", ["spark-container"], "Heal Luxy for a Spark Container", "Afterwards, heal Luxy with a spare vial: she gives you a Spark Container.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["fish-spincer-pincers", ["fish"], "Catch a Spincer", "Catch a Spincer in the water where you sheltered from the lightning in hollow logs.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["angling-fishing-rod"]}],
        ["fish-gazeworm-eye", ["fish"], "Catch a Gazeworm", "Catch a Gazeworm in the last room of Septemburg’s sewers, before Kindlewood.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["angling-fishing-rod"]}],
      ],
    },
    {
      title: "Mina’s Grave",
      location: "Mourner’s Mile",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["The 100% checklist (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/checklist"]],
      rows: [
        ["bonestone-mile-minas-grave", ["bonestone"], "Get the Bonestone in Mina’s Grave", "Up the stairs left of Knight’s Rest’s central pit, and up again, a Kear lock stands in the open: the door left of it needs three Spark Containers. Inside, dig into the grave for a run with a single point of health.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["spark-container-emporium", "spark-container-dark-deluxy", "spark-container-head-escort"]}],
        ["trinket-starving-beastium", ["trinket"], "Get Starving Beastium", "Clear that run and the chest at its end holds Starving Beastium.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "The Lantern Cave and Buffo",
      location: "Backwaters",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"]],
      rows: [
        ["route-docks-lantern-return", ["route"], "Return for the Lantern Cave", "With a Spark Container, bring Pinky’s ladder back to Shanty Swamp: the door atop its first screen opens on the Lantern Cave.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/ossex"}],
        ["bonestone-backwaters-lantern-cave", ["bonestone"], "Get the Bonestone in the Lantern Cave", "In the dark cave behind the door, go up the left side, then under the grating: the gem is at the top right.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["vial-pouch-lantern-cave", ["vial-pouch"], "Get the Vial Pouch in the Lantern Cave", "In the same cave, go down the right side and take the stairs on the left to the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-plasma-jug", ["trinket"], "Upgrade the jug to the Plasma Jug", "Once the jug is full, bring it back to Buffo and beat him: he turns it into the Plasma Jug.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["quest-gluttons-jug"]}],
      ],
    },
    {
      title: "Coltrane Peak",
      location: "Coltrane Peak",
      rows: [
        ["fish-fishcicle-core", ["fish"], "Catch a Fishcicle", "Catch a Fishcicle in the water near Rupert on Coltrane Peak.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["angling-fishing-rod"]}],
        ["route-snowball-return", ["route"], "Carry a snowball to Franz", "Franz, in the Western Wilds, wants a snowball from Coltrane Peak. Carry one down without letting it be hit or climbing a rope, by way of Eastern Heath, Ossex and the Southern Outskirts.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/ossex"}],
        ["trinket-dummy-cache", ["trinket"], "Get Dummy Cache", "Hit Franz with the snowball: he gives you Dummy Cache.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["route-snowball-return"], "place": "Western Wilds"}],
      ],
    },
    {
      title: "The Western Wilds",
      location: "Western Wilds",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"]],
      rows: [
        ["kear-wilds-secret-passage", ["kear"], "Get the Kear in the cave under the Wilds", "From Ossex’s south gate, go left past the minotaurs and the crow and burrow into the small puddle near the upper exit: a secret cave runs under the Western Wilds. Cross its pit with the Drill Driver to the Kear.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["joule-box-secret-passage-locked", ["joule-box"], "Get the Joule Box in the cave under the Wilds", "Deeper in the same cave, a Kear lock opens on the box.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-wilds-leaf-area", ["bonestone"], "Get the Bonestone above the lava field", "At the lava field’s left end, break the crystal: the chest is in the area above, where the leaves gather.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["fish-cuddlepus-shell", ["fish"], "Catch a Cuddlepus", "Catch a Cuddlepus in the Western Wilds’ lava streams: watch for its silhouette.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["angling-fishing-rod"]}],
        ["fish-glomper-stalk", ["fish"], "Catch a Glomper", "Catch a Glomper in the water on the last Western Wilds screen before the Backwaters.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["angling-fishing-rod"]}],
      ],
    },
    {
      title: "The Southern Outskirts",
      location: "Southern Outskirts",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"]],
      rows: [
        ["kear-outskirts-commons-ossex-entry-wall-left", ["kear"], "Get the Kear past the fireplace tunnel", "On Ossex’s upper west path, go through the small door under the rope into the house and burrow into its fireplace: the tunnel leads to a purple flower. Launch across, using the Drill Driver in mid-air, to the chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["fish-crumblefin-head", ["fish"], "Catch a Crumblefin", "Catch a Crumblefin in any pond in the Southern Outskirts. Direct hits don’t hurt it: burrow, and throw it at a wall.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "requires": ["angling-fishing-rod"]}],
        ["bonestone-outskirts-cave-network", ["bonestone"], "Get the Bonestone in the square arena", "Right of the chest you bounced up to outside Ossex’s south gate, a cave of moving bounce pads ends at a Kear lock. Past it, in the square arena, take the pad in the bottom-left corner up to the chest on the left.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["joule-box-cave-network-side-room", ["joule-box"], "Get the Joule Box in the square arena", "Push the same pad against the arena’s right wall and bounce up to the chest on the right.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-outskirts-pit-room", ["bonestone"], "Get the Bonestone across the gaps", "From Ossex’s south gate, take the second left to its end: dash across the gaps with the Drill Driver and burrow at the sparkling spot.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["boss-dugin-first", ["boss"], "Beat Dugin the first time", "Dugin turns up either on the last Western Wilds screen before the Backwaters or on the Outskirts’ rightmost screen: beat him.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["boss-dugin-second", ["boss"], "Beat Dugin again", "He comes back only after the next generator tower, which on this route is the Astral Orrery’s, at either spot again: beat him a second time.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["route-generator-orrery"]}],
        ["trinket-lace-glove", ["trinket"], "Get Lace Glove", "Beating Dugin the second time gives Lace Glove. The Enhanced Map counts it in whichever region that second fight happens.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["boss-dugin-second"]}],
      ],
    },
    {
      title: "Eastern Heath",
      location: "Eastern Heath",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"]],
      rows: [
        ["fish-dork-eyes", ["fish"], "Catch a Pink Eyed Dork", "Catch a Pink Eyed Dork in the river under the bridge where Eastern Heath begins.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["angling-fishing-rod"]}],
        ["bonestone-heath-bush-room-locked", ["bonestone"], "Get the Bonestone at the foot of the bushy path", "Below Eastern Heath’s first screen, follow the bushy path down past the gaps and enemies: at the bottom, a Kear lock stands beside the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-heath-beside-kite", ["bonestone"], "Get the Bonestone past the kite", "Follow the watery path right through the first cave, over the moving spikes, then south past the kite to the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-windfall-charm", ["trinket"], "Knock down the kite for Windfall Charm", "Hit the kite with the Volt Hatchet while it hovers over land. If it falls into water or a hole, reset it at an Underlab.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["joule-box-bucklers-bluff", ["joule-box"], "Get the Joule Box atop Buckler’s Bluff", "Jump the gap above the kite, take the rope shortcut, then go right and up: a Kear opens Buckler’s Bluff, where Drill Driver platforming leads to the box at the top.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "Sandfalls and Bone Beach",
      location: "Sandfalls",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"]],
      rows: [
        ["fish-puffer-beak", ["fish"], "Catch a Bouncy Puffy", "Catch a Bouncy Puffy at the start of Sandfalls: break the wall left of the cave entrance and go up the stairs to the water.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["angling-fishing-rod"]}],
        ["kear-beach-mite", ["kear"], "Beat the Mite for the old man’s Kear", "After Bone Beach’s boss, a creature called the Mite waits outside a house in Sandfalls: beat it for an old man’s hat and a Kear.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["fish-goremaw-fang", ["fish"], "Catch a Goremaw", "Catch a Goremaw in the water just outside Bone Beach’s shop tent.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["angling-fishing-rod"], "place": "Bone Beach"}],
        ["bonestone-beach-behind-furgus-tunnel", ["bonestone"], "Get the Bonestone behind the tower", "On Bone Beach’s first screen, break the wall: the chest is behind the tower, once Furgus has gone from beside it.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Bone Beach"}],
      ],
    },
    {
      title: "Nox’s Bayou",
      location: "Nox’s Bayou",
      rows: [
        ["fish-shrimpter-tail", ["fish"], "Catch a Shrimpter", "Catch a Shrimpter on Nox’s Bayou’s first screen.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["angling-fishing-rod"]}],
      ],
    },
  ],
} satisfies RawChapter;

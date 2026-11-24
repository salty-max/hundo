import type { RawChapter } from "@hundo/core/types";

export default {
  id: 4,
  title: "Eastern Heath and Mourner’s Mile",
  region: "Eastern Heath and Mourner’s Mile",
  teaser: "Eastern Heath and Mourner’s Mile",
  intro: "East of Ossex: the Grassland of Eastern Heath, Poppit’s first hidden shop, then Knight’s Rest and the graves of Mourner’s Mile on the road to Queensbury Crypt.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/eastern-heath"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "The Grassland",
      location: "Eastern Heath",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"]],
      rows: [
        ["route-heath-entry", ["route"], "Leave Ossex by the east gate", "Head east into the Grassland. The first Bonestone is just below the gate; the rest of the Grassland’s finds follow southeast, through the gear and turret screens.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/eastern-heath"}],
        ["bonestone-heath-ossex-entry", ["bonestone"], "Get the Bonestone below the east gate", "On the first screen out of Ossex’s east gate, head down and burrow under the low wall at the bottom left: the chest is on the hidden path behind it.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Eastern Heath"}],
        ["bonestone-heath-riverbed", ["bonestone"], "Get the Bonestone above the river", "Ride the moving platforms up past the turret to the wet ledge above the river: the chest is there.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Eastern Heath"}],
        ["bonestone-heath-poppit-cave", ["bonestone"], "Get the Bonestone in Poppit’s cave", "Burrow into the cave entrance between the two flaming pipes, at the bottom right past the Underlab: the chest is on the cave’s left, Poppit on its right.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Eastern Heath"}],
        ["trinket-willow-the-wisp", ["trinket"], "Get Willow the Wisp", "Poppit sells it in his cave in the Grassland, for 400 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Eastern Heath"}],
        ["kear-heath-poppit-cave", ["kear"], "Buy Poppit’s Kear", "Poppit sells a Kear beside Willow the Wisp, for 200 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Eastern Heath"}],
        ["kear-heath-mimic", ["kear"], "Get the Kear in the room under the bridge", "Cut through the bushes left of the moving platform toward the lake and burrow under the bridge into a hidden room. Beat the mimic there: the Kear is in the next room.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Eastern Heath"}],
        ["route-heath-shortcuts", ["route"], "Press the bridge switch and head for Mourner’s Mile", "Follow the platforms toward the northeastern sign and take the bridge branch to press its switch: the way to Mourner’s Mile opens, with a checkpoint before it.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/eastern-heath"}],
        ["trinket-chain-capacitor", ["trinket"], "Win Chain Capacitor in the car-wrecking game", "Back past the bridge switch, north of the Grassland’s first screen, a Kear opens the house with the wrecking game: smash the marked car’s parts within 30 seconds.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Eastern Heath"}],
        ["bonestone-heath-hidden-slime-cave", ["bonestone"], "Get the Bonestone in the slime cave", "Burrow under the fence left of the wrecking-game house and open the Kear lock behind it. Break the wall above into a hole and drop into the cave: hit its switch to lower the spikes, then open the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Eastern Heath"}],
      ],
    },
    {
      title: "Knight’s Rest",
      location: "Mourner’s Mile",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"], ["Mourner’s Mile and Knight’s Rest (Gamer Guides)", "https://www.gamerguides.com/mina-the-hollower/guide/walkthrough/queensbury-crypt/mourners-mile-knights-rest"]],
      rows: [
        ["route-knights-rest", ["route"], "Work through Knight’s Rest and find the Shallow Tomb", "Mourner’s Mile begins at Knight’s Rest, a field of graves around a central pit. Bait the armoured Knights into charging, then hit their backs.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/eastern-heath"}],
        ["bonestone-mile-knights-rest", ["bonestone"], "Get the Bonestone on Knight’s Rest’s high platforms", "On Knight’s Rest’s first screen, glide with the Deflector Parasol over to the high platforms: two ambushes wait where you land, then the chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Mourner’s Mile"}],
        ["kear-mile-shallow-tomb", ["kear"], "Get the Kear in the Shallow Tomb", "On the next screen, break the third gravestone from the left in the top row and drop into the Shallow Tomb, a dark cave. Follow its candlelit passage without breaking the candles: the Kear is at the bottom.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Mourner’s Mile"}],
        ["bonestone-mile-statue-room", ["bonestone"], "Get the Bonestone in the cracked gravestone", "Out of the Shallow Tomb, go left and break the cracked gravestone: the Bonestone is a gem in the ground, not a chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Mourner’s Mile"}],
        ["trinket-spike-spurs", ["trinket"], "Get Spike Spurs behind the cracked wall", "Go round the top of the central pit and break the cracked wall north of it into a hidden cave: the chest is in a corner. Spike Spurs carries you over spikes.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Mourner’s Mile"}],
        ["sidearm-iron-steed", ["sidearm"], "Get Iron Steed", "Climb the stairs left of the central pit, and up again, to a Kear lock in the open: the Iron Steed is behind it.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/eastern-heath"}],
        ["bonestone-mile-tower-tunnel-1", ["bonestone"], "Get the first Bonestone in the Tower Tunnel", "Break the cracked gravestone right of that Kear lock and burrow into the dark cave: follow the moving candles round the spikes, and the chest is at the bottom left.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Mourner’s Mile"}],
        ["bonestone-mile-tower-tunnel-2", ["bonestone"], "Get the second Bonestone in the Tower Tunnel", "Past the first chest, burrow through the tunnel to the cave’s right side: the chest is across a pit at the top right.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Mourner’s Mile"}],
      ],
    },
    {
      title: "The Spike Vault",
      location: "Mourner’s Mile",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"]],
      rows: [
        ["route-spike-vault", ["route"], "Go down into the Spike Vault", "Below the Tower Tunnel lies a graveyard with someone standing in it. Its graves lead down into the Spike Vault: the second gravestone from the left in the top row drops you by a Vial Pouch, and the grave at the upper right leads to the vault’s switch and exit.", {"reference": "https://www.gamerguides.com/mina-the-hollower/guide/walkthrough/queensbury-crypt/mourners-mile-knights-rest"}],
        ["vial-pouch-spike-vault", ["vial-pouch"], "Get the Vial Pouch under the gravestone", "Break the second gravestone from the left in the top row, beside the person standing there, and drop in: the chest is right beside you.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Mourner’s Mile"}],
        ["kear-mile-spike-vault-hidden-room", ["kear"], "Get the Kear in the Spike Vault’s hidden room", "In the Vial Pouch’s room, break the wall at the top left, then the next one, past the floor spikes: the Kear is on the raised platform on the left.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Mourner’s Mile"}],
      ],
    },
    {
      title: "The road to Queensbury",
      location: "Mourner’s Mile",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"]],
      rows: [
        ["sidearm-mist-jar", ["sidearm"], "Get Mist Jar", "On the road toward Queensbury, strike the candles on the right of the spiked side room.", {"reference": "https://meowdb.com/db/mina-the-hollower/region-checklists"}],
        ["bonestone-mile-spike-hell", ["bonestone"], "Get the Bonestone in the spike maze", "After the spike switch on the road to the crypt, go right and down the stairs into the spike field, wearing Spike Spurs: at the first junction, go down and right to the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Mourner’s Mile"}],
      ],
    },
  ],
} satisfies RawChapter;

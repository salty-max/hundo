import type { RawChapter } from "@hundo/core/types";

export default {
  id: 4,
  title: "Eastern Heath and Mourner’s Mile",
  region: "Eastern Heath and Mourner’s Mile",
  teaser: "Eastern Heath and Mourner’s Mile",
  intro: "Search the Grassland, use the separate grave entrances and cross Knight’s Rest before entering the crypt.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/eastern-heath"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "The Grassland",
      location: "Eastern Heath and Mourner’s Mile",
      rows: [
        ["route-heath-entry", ["route"], "Search below Ossex’s east gate before heading out", "Burrow south from the lower-left corner of the entrance walkway for its ledge chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/eastern-heath"}],
        ["route-heath-shortcuts", ["route"], "Lower the bridge spikes and reach Mourner’s Mile", "Follow the platform route toward the northeastern sign.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/eastern-heath"}],
      ],
    },
    {
      title: "Grassland branches",
      location: "Eastern Heath",
      compact: true,
      rows: [
        ["bonestone-heath-ossex-entry", ["bonestone"], "Get the Bonestone: ledge south of the Ossex east gate", "Burrow at the bottom left of the return walkway to a hidden path.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Eastern Heath"}],
        ["bonestone-heath-riverbed", ["bonestone"], "Get the Bonestone: Riverbed", "Left bank toward the Outskirts, over a turret platform, burrow-jump to a watery ledge.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Eastern Heath"}],
        ["bonestone-heath-poppit-cave", ["bonestone"], "Get the Bonestone: Poppit Cave", "Burrow into the entrance between two flames; chest on the cave’s left.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Eastern Heath"}],
        ["trinket-willow-the-wisp", ["trinket"], "Get Willow the Wisp", "Poppit’s Eastern Heath shop, 400 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Eastern Heath"}],
        ["kear-heath-poppit-cave", ["kear"], "Get the Kear: poppit hidden shop 1 (200 Bones)", "Out the east gate, over the bridge, right at the fork along the lower screen, burrow through a hole to Poppit.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Eastern Heath"}],
        ["bonestone-heath-hidden-slime-cave", ["bonestone"], "Get the Bonestone: Hidden Slime Cave", "Break the wall above into a hole; in the cave below, hit the switch to drop the spikes, then open the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Eastern Heath"}],
        ["kear-heath-mimic", ["kear"], "Get the Kear: hidden room under bridge", "Ride the spiked platform west, cut grass to the lake, burrow under the bridge into a room and beat its guard.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Eastern Heath"}],
      ],
    },
    {
      title: "Knight’s Rest",
      location: "Mourner’s Mile",
      rows: [
        ["route-knights-rest", ["route"], "Work through Knight’s Rest and find the Shallow Tomb", "Bait the armored Knights’ charges and strike their exposed backs.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/eastern-heath"}],
        ["trinket-spike-spurs", ["trinket"], "Get Spike Spurs", "Chest in a corner of the Shallow Tomb.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Mourner’s Mile"}],
        ["bonestone-mile-knights-rest", ["bonestone"], "Get the Bonestone: Knight’s Rest", "First Mourner’s Mile screen from the Heath, two tiers: glide with the Parasol to high platforms; two ambushes on landing.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Mourner’s Mile"}],
        ["bonestone-mile-statue-room", ["bonestone"], "Get the Bonestone: Statue Room", "Burrow-jump to a platform, left into the graveyard, hit a headstone for the gem.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Mourner’s Mile"}],
        ["kear-mile-shallow-tomb", ["kear"], "Get the Kear: candle-lit corridor hidden room", "Burrow the far-right loose dirt, break cracked tombstones, follow the candle-lit passage without breaking the candles.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Mourner’s Mile"}],
        ["bonestone-mile-tower-tunnel-1", ["bonestone"], "Get the Bonestone: Tower Tunnel, northern edge", "Break the gravestone by the lock, burrow in, far left of the dark ring; Spike Spurs advised.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Mourner’s Mile"}],
        ["bonestone-mile-tower-tunnel-2", ["bonestone"], "Get the Bonestone: Tower Tunnel, past the first chest", "Burrow out, right branch before the dead end, north end of the right wall.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Mourner’s Mile"}],
      ],
    },
    {
      title: "The grave entrances",
      location: "Mourner’s Mile",
      rows: [
        ["route-spike-vault", ["route"], "Enter the graves to clear the Spike Vault", "In the cemetery, use the grave immediately left of the NPC for the Vial Pouch beside your landing.", {"reference": "https://www.gamerguides.com/mina-the-hollower/guide/walkthrough/queensbury-crypt/mourners-mile-knights-rest"}],
        ["kear-mile-spike-vault-hidden-room", ["kear"], "Get the Kear: cemetery secret room", "Break the second top-row tombstone from the left, drop in, pass floor spikes, strike the odd wall stone.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Mourner’s Mile"}],
        ["vial-pouch-spike-vault", ["vial-pouch"], "Get the Vial Pouch: Spike Vault", "Raised section reached only through the Spike Vault entrance, under a broken tombstone.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Mourner’s Mile"}],
        ["sidearm-iron-steed", ["sidearm"], "Get Iron Steed", "Before the Knight’s Rest graveyard, climb the northern stairs and spend a Kear at the left lock.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/eastern-heath"}],
      ],
    },
    {
      title: "Before Queensbury",
      location: "Mourner’s Mile",
      rows: [
        ["sidearm-mist-jar", ["sidearm"], "Get Mist Jar", "In the spike side room just before Queensbury, strike the right-side candles for Mist Jar.", {"reference": "https://meowdb.com/db/mina-the-hollower/region-checklists"}],
        ["bonestone-mile-spike-hell", ["bonestone"], "Get the Bonestone: road to Queensbury Crypt, spike puzzle", "Fence gap, Spike Spurs over spikes, Mist Jar; a red crow attacks.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Mourner’s Mile"}],
      ],
    },
    {
      title: "Other checks on this circuit",
      location: "Eastern Heath and Mourner’s Mile",
      compact: true,
      rows: [
        ["trinket-chain-capacitor", ["trinket"], "Get Chain Capacitor", "Smash the car in under 30 seconds.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Eastern Heath"}],
      ],
    },
  ],
} satisfies RawChapter;

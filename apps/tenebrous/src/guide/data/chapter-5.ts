import type { RawChapter } from "@hundo/core/types";

export default {
  id: 5,
  title: "Queensbury Crypt",
  region: "Queensbury Crypt",
  teaser: "Queensbury Crypt",
  intro: "Solve the statue-head halls, complete the Duke’s escort and restore the first generator.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/queensbury-crypt"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "Old Graveyard",
      location: "Queensbury Crypt",
      rows: [
        ["quest-sodsby", ["quest"], "Help Sodsby dig the graves", "Burrow beneath the fence to meet the gravedigger.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/queensbury-crypt"}],
        ["kear-crypt-mrs-sodsby", ["kear"], "Get the Kear: gravedigger reward", "Burrow under the iron fence, dig every grave with loose dirt before it, then return to the gravedigger.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Queensbury Crypt"}],
        ["bonestone-crypt-old-graveyard", ["bonestone"], "Get the Bonestone: old Graveyard, past the first Underlab gate", "Buried gem by the down-ledge, burrow for it; 200 Flakes.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Queensbury Crypt"}],
        ["bonestone-crypt-broken-bridge", ["bonestone"], "Get the Bonestone: Broken Bridge", "Buried gem, burrow by the green torch.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Queensbury Crypt"}],
        ["bonestone-crypt-pipe-room", ["bonestone"], "Get the Bonestone: Pipe Room", "Outside the crypt entrance near the Heath shortcut: buried gem, ride the platform to the bottom-right corner; blue bird ambush.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Queensbury Crypt"}],
        ["trinket-desperation-bonnet", ["trinket"], "Get Desperation Bonnet", "Chest in the Old Graveyard.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Queensbury Crypt"}],
        ["sidearm-volt-hatchet", ["sidearm"], "Get Volt Hatchet", "In the Old Graveyard’s moving-platform section, ride left to the candles and strike them for the axe sidearm.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/queensbury-crypt"}],
      ],
    },
    {
      title: "The Foyer and Entryway",
      location: "Queensbury Crypt",
      rows: [
        ["route-crypt-entry", ["route"], "Light the graveyard pipes and enter the crypt", "Use the buttons to change the spike routes, lower rope shortcuts and check the side ledges.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/queensbury-crypt"}],
        ["weapon-crypt-foyer-chest", ["weapon"], "Open the weapon chest: Castle Entry", "Left ledge by the big vase, strike the left wall to a hidden outside balcony.", {"reference": "https://meowdb.com/db/mina-the-hollower/weapons", "place": "Queensbury Crypt"}],
        ["sidearm-drill-driver", ["sidearm"], "Get Drill Driver", "From the graveyard shortcut pipe, follow the right walkway past the moving gear into the next screen.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/queensbury-crypt"}],
        ["kear-crypt-midden-1", ["kear"], "Get the Kear: crow room secret NPC", "Strike the cracked bottom-right wall into a room with an NPC, break the object beside him.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Queensbury Crypt"}],
        ["bonestone-crypt-hidden-tunnel", ["bonestone"], "Get the Bonestone: crypt Entryway, before the rope", "Burrow into a secret room, jump on a pressure plate for a floating gem.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Queensbury Crypt"}],
      ],
    },
    {
      title: "Statue Head Hall",
      location: "Queensbury Crypt",
      rows: [
        ["route-crypt-heads", ["route"], "Return the statue heads in both crypt halls", "The Entryway’s head lowers its spikes.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/queensbury-crypt"}],
        ["bonestone-crypt-statue-head-hall", ["bonestone"], "Get the Bonestone: statue Head Hall, first room, opposite the Underlab", "Statue Head Hall first room, opposite the Underlab: jump the rolling spikes, break the chest from range, cross the gap.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Queensbury Crypt"}],
        ["bonestone-crypt-mirror-room", ["bonestone"], "Get the Bonestone: statue Head Hall, grand-mirror room", "Burrow up the right wall from the main room to the chest on the Orrery route.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Queensbury Crypt"}],
        ["trinket-stolenoid", ["trinket"], "Get Stolenoid", "Belvedere’s hidden crypt shop, 600 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Queensbury Crypt"}],
        ["kear-crypt-mirror-room-belvedere", ["kear"], "Buy the Kear from the crypt’s hidden merchant", "Burrow left of the pillar in the corridor that leads up to the boss floor to reach the hidden merchant.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Queensbury Crypt"}],
        ["bonestone-crypt-midden-2", ["bonestone"], "Get the Bonestone: second crypt level, Statue Head Hall", "Chase Midden for a gem; a destroyed gravestone opens stairs.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Queensbury Crypt"}],
      ],
    },
    {
      title: "Midden’s side challenge",
      location: "Queensbury Crypt",
      rows: [
        ["boss-midden", ["boss"], "Beat Midden", "Ancestral Chamber, Queensbury Crypt, behind a two-Plasma-Vial door; insult him to fight. Optional; gives Fly Bait.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses", "place": "Queensbury Crypt"}],
        ["trinket-fly-bait", ["trinket"], "Get Fly Bait", "Reward for beating Midden in Queensbury Crypt.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Queensbury Crypt"}],
      ],
    },
    {
      title: "The Royal Tomb",
      location: "Queensbury Crypt",
      rows: [
        ["route-duke-escort", ["route"], "Bring the Duke to the Royal Tomb", "Find the Duke through the crypt’s upper route.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/queensbury-crypt"}],
        ["route-duchess", ["route"], "Use the last statue head to start the Duchess fight", "Break the wall beside the checkpoint, carry the head north and place it.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/queensbury-crypt"}],
        ["boss-duchess", ["boss"], "Beat The Duchess", "End of Queensbury Crypt; Health Rose.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses", "place": "Queensbury Crypt"}],
        ["health-rose-duchess", ["health-rose"], "Get the Health Rose from the Duchess", "Reward for beating The Duchess.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Queensbury Crypt"}],
        ["trinket-proto-spark", ["trinket"], "Get Proto Spark", "Reward for sealing The Duke in the tomb.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Queensbury Crypt"}],
      ],
    },
    {
      title: "The tower",
      location: "Queensbury Crypt",
      rows: [
        ["route-generator-queensbury", ["route"], "Restore the Solemn Generator", "After the Royal Tomb, enter the generator climb.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/queensbury-crypt"}],
      ],
    },
  ],
} satisfies RawChapter;

import type { RawChapter } from "@hundo/core/types";

export default {
  id: 5,
  title: "Queensbury Crypt",
  region: "Queensbury Crypt",
  teaser: "Queensbury Crypt",
  intro: "Queensbury Crypt: Mrs. Sodsby’s graveyard, the statue-head halls, Midden’s side challenge and the Duke’s last wish, then the climb to the crypt’s generator.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/queensbury-crypt"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "Old Graveyard",
      location: "Queensbury Crypt",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"]],
      rows: [
        ["quest-sodsby", ["quest"], "Help Mrs. Sodsby dig the graves", "Burrow under the iron fence into the first big graveyard and dig up every grave with loose dirt, then talk to Mrs. Sodsby at the top left.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["kear-crypt-mrs-sodsby", ["kear"], "Get Mrs. Sodsby’s Kear", "Mrs. Sodsby gives you a Kear once every loose grave is dug.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["bonestone-crypt-old-graveyard", ["bonestone"], "Get the Bonestone buried in the graveyard", "In the same graveyard, take the stairs near the bottom, at the far left, and burrow at the shiny spot: the Bonestone is a gem in the ground.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-crypt-broken-bridge", ["bonestone"], "Get the Bonestone by the green torch", "On the next screen toward the crypt, the one with floating platforms, jump the gap to the left and burrow at the shiny spot by the green torch.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-desperation-bonnet", ["trinket"], "Get Desperation Bonnet in the locked tomb", "Behind the fence right of Mrs. Sodsby, loop round above and spend a Kear on the small tomb’s lock. Inside, burrow under the grave into a secret room.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["sidearm-volt-hatchet", ["sidearm"], "Get Volt Hatchet", "On the same screen, ride the moving platforms left to the candles and strike them.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/queensbury-crypt"}],
      ],
    },
    {
      title: "The Foyer and Entryway",
      location: "Queensbury Crypt",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"], ["Weapons (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/weapons"]],
      rows: [
        ["route-crypt-entry", ["route"], "Enter Queensbury Crypt", "Use the buttons to change the spike routes, lower the rope shortcuts and check the side ledges as you go.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/queensbury-crypt"}],
        ["weapon-crypt-foyer-chest", ["weapon"], "Open the weapon chest outside the Foyer", "In the crypt’s first room, jump the gap on the left and break the wall: a hidden passage leads outside to a chest for Whisper and Vesper, holding the daggers themselves or one of their upgrades.", {"reference": "https://meowdb.com/db/mina-the-hollower/weapons"}],
        ["sidearm-drill-driver", ["sidearm"], "Get Drill Driver", "Past the crypt’s entrance, follow the right-hand walkway past the moving gear into the next screen and strike the candles.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/queensbury-crypt"}],
        ["kear-crypt-midden-1", ["kear"], "Get the Kear past the dirty water", "In the room with the spiked rollers, break the cracked wall at the bottom right, by the dirty water. The Kear is in the room beyond, where Midden waits: talk to him.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-crypt-hidden-tunnel", ["bonestone"], "Get the Bonestone off the arrow-trap room", "In the room with the arrow-trap switch, take the hole on the right before you leave north. Jump over the pressure plate, dodging its arrow, to the gem.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests"}],
      ],
    },
    {
      title: "Statue Head Hall",
      location: "Queensbury Crypt",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"]],
      rows: [
        ["route-crypt-heads", ["route"], "Put the statue heads back", "The crypt’s gates answer to its headless statues: carry each head back to its statue. The Entryway’s head lowers its spikes; Statue Head Hall wants two more.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/queensbury-crypt"}],
        ["bonestone-crypt-statue-head-hall", ["bonestone"], "Get the Bonestone past the lizard’s door", "In Statue Head Hall’s first room, go through the door beside the lizard: the chest is at the bottom left of the next room.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-crypt-mirror-room", ["bonestone"], "Get the Bonestone beyond the statues", "Back in the hall, burrow under the gap right of the statues: the chest is on the far side.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-stolenoid", ["trinket"], "Buy Stolenoid from Belvedere", "A hole near the top left of the statues leads to Belvedere, a hidden merchant: Stolenoid costs 600 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist"}],
        ["kear-crypt-mirror-room-belvedere", ["kear"], "Buy Belvedere’s Kear", "Belvedere sells a Kear beside Stolenoid, for 300 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
        ["bonestone-crypt-midden-2", ["bonestone"], "Get the Bonestone by Midden’s second hideout", "From the hall, go right, then back left up the hidden stairs and over the dirty water: Midden is in the next room again, and a gem beside him.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "Midden’s side challenge",
      location: "Queensbury Crypt",
      rows: [
        ["boss-midden", ["boss"], "Beat Midden", "Once you’ve met Midden twice, the crypt’s Underlab room with wooden platforms has a block on the right that takes two vials. Pay, give him the insulting answer, and fight.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-fly-bait", ["trinket"], "Get Fly Bait", "Beating Midden gives Fly Bait.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "The Royal Tomb",
      location: "Queensbury Crypt",
      rows: [
        ["route-duke-escort", ["route"], "Lead the Duke to the Royal Tomb", "Find the Duke, off to the left of the crypt, and lead him to the Royal Tomb, clearing each room before he crosses it.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/queensbury-crypt"}],
        ["bonestone-crypt-pipe-room", ["bonestone"], "Get the Bonestone down the pipe", "In the room before the Duchess, a pipe among the grass on the right leads down to a gem.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["route-duchess", ["route"], "Use the last statue head to start the Duchess fight", "Break the wall beside the checkpoint, carry the head north and place it.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/queensbury-crypt"}],
        ["boss-duchess", ["boss"], "Beat The Duchess", "The Duchess waits at the end of the crypt, once the last statue head is in place.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["health-rose-duchess", ["health-rose"], "Get the Health Rose from the Duchess", "Beating the Duchess gives a Health Rose.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-proto-spark", ["trinket"], "Lay the Duke to rest for Proto Spark", "After the Duchess, lead the Duke from the room on the left to his coffin in her room and seal him in: he gives you Proto Spark.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "The tower",
      location: "Queensbury Crypt",
      rows: [
        ["route-generator-queensbury", ["route"], "Climb to the crypt’s generator", "After the Royal Tomb, the generator climb begins: burrow into its launchers to break the electric barriers, and at the top burrow into the opening in the generator’s face.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/queensbury-crypt"}],
      ],
    },
  ],
} satisfies RawChapter;

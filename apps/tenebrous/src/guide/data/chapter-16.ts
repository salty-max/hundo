import type { RawChapter } from "@hundo/core/types";

export default {
  id: 16,
  title: "Astral Orrery",
  region: "Astral Orrery",
  teaser: "Astral Orrery",
  intro: "The Astral Orrery: the island’s mirrors lead through Mirror’s End to its hub, where four challenges branch off, green, purple, blue and red, before the Congealed and the Orrery’s generator.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/astral-orrery"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "Mirror’s End and the hub",
      location: "Mirror’s End",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"], ["Fishing (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/fishing"], ["The Blameless ending’s rules (Yacht Club Games)", "https://www.yachtclubgames.com/blog/mina-the-hollower-ending/"]],
      rows: [
        ["route-six-mirrors", ["route"], "Activate the island’s six mirrors", "Six mirrors around the island lead into the Astral Orrery, each with a switch to activate; among them are the ones in Queensbury’s Statue Head Hall and in the Foyer of Radiant Manor.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/astral-orrery"}],
        ["route-orrery-hub", ["route"], "Reach the Orrery’s mirror hub", "Through the mirrors you reach Mirror’s End, the Astral Orrery’s mirror hub, where four challenges branch off: green, purple, blue and red.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/astral-orrery"}],
        ["fish-trunkstar-core", ["fish"], "Catch a Trunkstar", "Catch a Trunkstar in the pond in the middle of the mirror hub.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "requires": ["angling-fishing-rod"]}],
        ["trinket-bag-mirrors-end", ["trinket-bag"], "Get the Trinket Bag behind the hub’s left lock", "On the hub’s left side, a Kear opens the lock in front of the Trinket Bag.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-mirrors-end-red-switch", ["bonestone"], "Get the Bonestone under the red mirror", "Right of the big central mirror, a small tunnel under the red mirror’s area leads to the chest, out in the open.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-mirrors-end-blue-switch-path", ["bonestone"], "Get the Bonestone up the blue mirror’s side", "In the hub, go up the right side of the blue mirror to the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-reckless-beastium", ["trinket"], "Find Dr. Naught’s brain for Reckless Beastium", "On the hub’s right side, a Kear opens the lock to Dr. Naught, who wants his brain back: break the walls up and to the left to find the right one, and throw it to him.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "The green challenge",
      location: "Astral Orrery",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Every Kear (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/kears"]],
      rows: [
        ["route-mutant", ["route"], "Enter the green challenge, the Mutant Lab", "Move beneath and onto the glass through its star-marked entry points.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/astral-orrery"}],
        ["bonestone-orrery-mutant-lab-east-secret-room", ["bonestone"], "Get the Bonestone right of the glass path", "After the lowest room, go back north and break the wall right of the glass path.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-bridge-weaver", ["trinket"], "Get Bridge Weaver", "In the room under a huge glass panel, burrow under the pipes at the bottom left instead of leaving south: the chest is there.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["trinket-vial-salvo", ["trinket"], "Buy Vial Salvo from Tubert", "After the green challenge, drop below and take the capsule on the left to Tubert’s shop: Vial Salvo costs 2,000 Bones.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["kear-orrery-tubert", ["kear"], "Buy Tubert’s Kear", "Tubert sells a Kear too, for 1,000 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears"}],
      ],
    },
    {
      title: "The purple challenge",
      location: "Astral Orrery",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bosses (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bosses"]],
      rows: [
        ["route-scholars", ["route"], "Enter the purple challenge, the Hall of Scholars", "Work through the Hall of Scholars.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/astral-orrery"}],
        ["bonestone-orrery-hall-of-scholars-below-boss-chamber", ["bonestone"], "Get the Bonestone below the enemy wave", "After the wave of enemies, drop through the vertical hole on the right to a corner platform below.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["boss-lumenarks", ["boss"], "Beat Lumenarks", "The Lumenarks, a cultist, waits in the Hall.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses"}],
        ["bonestone-orrery-hall-of-scholars-exit", ["bonestone"], "Get the Bonestone by the exit mirror", "At the challenge’s end, the chest is right of the exit mirror.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "The blue challenge",
      location: "Astral Orrery",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bonestone chests (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bonestone-chests"], ["Weapons (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/weapons"]],
      rows: [
        ["route-gravity", ["route"], "Enter the blue challenge, the Gravity Zone", "Use the coloured switches to swap the platforms and the black holes.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/astral-orrery"}],
        ["kear-orrery-gravity-zone-after-purple-switch", ["kear"], "Get the Kear through the portals", "Hit the portal switch at the right end and jump into the two portals on the right: the Kear is in the next room.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-orrery-gravity-zone-long-hallway", ["bonestone"], "Get the Bonestone left of the switch", "After the switch, go back left: the chest is behind a breakable wall below.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["bonestone-orrery-gravity-zone-below-green-switch", ["bonestone"], "Get the Bonestone over the bottom wall", "Go back to the start and down to the next switch room: ride the portals over the bottom wall to the chest.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["weapon-orrery-stellarium", ["weapon"], "Open the weapon chest after the blue challenge", "After the blue challenge, drop down on the right: a Kear opens the lock to a chest for the Battery Buster, holding the weapon itself or one of its upgrades.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "The red challenge",
      location: "Astral Orrery",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"]],
      rows: [
        ["route-cog", ["route"], "Enter the red challenge, the Cog Chamber", "Ride the cogs to the blue cubes.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/astral-orrery"}],
        ["bonestone-orrery-cog-chamber-west-secret-room", ["bonestone"], "Get the Bonestone past the electric block", "Throw the first cube at the electric block in the bottom barrier, then ride the platform into the left tunnel.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["kear-orrery-cog-chamber-east-secret-room", ["kear"], "Get the Kear past the middle laser", "Carry the second cube through the hall of spinning platforms, break the left wall and throw the cube at the middle laser.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
      ],
    },
    {
      title: "The Congealed",
      location: "Astral Orrery",
      sources: [["Every collectible by area (100% Guides)", "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"], ["Bosses (NiaMeowDB)", "https://meowdb.com/db/mina-the-hollower/bosses"]],
      rows: [
        ["boss-orrery-warden", ["boss"], "Beat the Orrery Warden", "The Orrery Warden patrols the Orrery: beat it.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses"}],
        ["boss-congealed", ["boss"], "Beat The Congealed", "The Congealed waits at the end of the Orrery.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses"}],
        ["health-rose-congealed", ["health-rose"], "Get the Health Rose from the Congealed", "Beating the Congealed gives a Health Rose.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations"}],
        ["route-generator-orrery", ["route"], "Climb to the Orrery’s generator", "After the Congealed, finish the generator climb.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/astral-orrery"}],
      ],
    },
  ],
} satisfies RawChapter;

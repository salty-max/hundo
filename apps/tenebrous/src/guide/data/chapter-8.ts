import type { RawChapter } from "@hundo/core/types";

export default {
  id: 8,
  title: "Septemburg",
  region: "Septemburg",
  teaser: "Septemburg",
  intro: "Rescue all three children while surviving the pursuit, then finish the regional boss and tower.",
  sources: [["Regional walkthrough", "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"], ["Community regional collectible hints", "https://meowdb.com/db/mina-the-hollower/region-checklists"]],
  groups: [
    {
      title: "Withered Farms and the first chase",
      location: "Septemburg",
      rows: [
        ["route-septemburg-pads", ["route"], "Use the launchpads through Withered Farms", "Break cracked stumps to expose hidden pads and take the southern side room before climbing north.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"}],
        ["quest-child-one", ["quest"], "Rescue the first child off the first chase route", "When the Carving Man appears, keep moving: this encounter is an escape, not the final fight.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"}],
        ["quest-child-two", ["quest"], "Rescue the second child in the Rotten Barn", "During the barn chase, break into the upper-right route rather than following only the leftward walls.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"}],
        ["route-crow-town", ["route"], "Cross Crow Town using its lightning shelters", "Use rods and hollow logs between strikes.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"}],
      ],
    },
    {
      title: "Farm and barn detours",
      location: "Septemburg",
      compact: true,
      rows: [
        ["bonestone-septemburg-launch-pad-secret-room", ["bonestone"], "Get the Bonestone: withered Farms, second launch-pad screen", "Time the rotating pads to reach the bottom left; 500 Shard.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Septemburg"}],
        ["kear-septemburg-launch-pad-crow", ["kear"], "Get the Kear: scarecrow trampoline", "Hidden trampoline far left on the checkpoint platform; ride the chain up and beat the scarecrow.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Septemburg"}],
        ["bonestone-septemburg-withered-farms-kid-room", ["bonestone"], "Get the Bonestone: Withered Farms Kid Room", "Withered Farms during the first Carving Man chase: burrow the log north of the exit; 800 Crystal.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Septemburg"}],
        ["bonestone-septemburg-hidden-mandrake-room", ["bonestone"], "Get the Bonestone: Hidden Mandrake Room", "Leafy platform, burrow the south fence, break a wall; two Crows guard; 500 Shard.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Septemburg"}],
        ["kear-septemburg-hidden-crop-thresher-room", ["kear"], "Get the Kear: tractor wall trail", "After the last tractor smashes the left wall, follow the hidden trail behind it.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Septemburg"}],
        ["bonestone-septemburg-rotten-barn-squealer", ["bonestone"], "Get the Bonestone: rotten Barn, second Carving Man chase", "Rotten Barn during the second Carving Man chase: break the top-right wall, ride a tiny platform down; 500 Shard.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Septemburg"}],
        ["bonestone-septemburg-tunnel-locked", ["bonestone"], "Get the Bonestone: Tunnel Locked", "Pressure plates, a Boar fight, a Kear lock on a rope; 1000 Chunk.", {"reference": "https://meowdb.com/db/mina-the-hollower/bonestone-chests", "place": "Septemburg"}],
        ["trinket-repulsing-root", ["trinket"], "Get Repulsing Root", "The Scarecrow in Crow Town, Septemburg, 1250 Bones.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Septemburg"}],
        ["kear-septemburg-crow-town", ["kear"], "Get the Kear: living scarecrow merchant (750 Bones)", "Untie the scarecrow on the right platform of the leaf-blower field; he sells it.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Septemburg"}],
        ["weapon-septemburg-rooftop-casket", ["weapon"], "Open the weapon chest in Crow Town", "In Crow Town, the blue-roofed building at the bottom left holds the Guardian Casket’s Coffin Toss upgrade.", {"reference": "https://meowdb.com/db/mina-the-hollower/weapons", "place": "Septemburg"}],
      ],
    },
    {
      title: "Tangled Woods to the generator",
      location: "Septemburg",
      rows: [
        ["quest-child-three", ["quest"], "Rescue the third child in Tangled Woods", "In the broad chase area, take the southwestern branch and follow the log paths into the side room with the wind and the pads; the third child is there.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"}],
        ["route-stormwatch", ["route"], "Carry the lightning rod through Stormwatch Way", "Move the rod between safe areas to direct strikes, then work through the hollow-log paths and spike switches.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"}],
        ["route-generator-septemburg", ["route"], "Restore the Windy Generator", "Defeat the Carving Man, collect the regional reward and finish the tower climb.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"}],
      ],
    },
    {
      title: "Woods, canals and the rescue reward",
      location: "Septemburg",
      compact: true,
      rows: [
        ["kear-septemburg-tangled-woods-hidden-grove", ["kear"], "Get the Kear: x-carved tree trunk", "In the bogeyman-invaded Underlab area, strike the bottom-right trunk to open a path to a chest.", {"reference": "https://meowdb.com/db/mina-the-hollower/kears", "place": "Septemburg"}],
        ["bonestone-septemburg-tangled-woods-galloway-room", ["bonestone"], "Get the Bonestone: Tangled Woods Galloway Room", "Hollow log bottom-left.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Septemburg"}],
        ["bonestone-septemburg-stormwatch-way", ["bonestone"], "Get the Bonestone: Stormwatch Way", "In plain view at the end of the next windy stretch.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Septemburg"}],
        ["bonestone-septemburg-canal-slime-room", ["bonestone"], "Get the Bonestone: Wastewater Canal Slime Room", "One of the two Bonestones in the sewers past Septemburg’s tower.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Septemburg"}],
        ["bonestone-septemburg-canal-box-room", ["bonestone"], "Get the Bonestone: Wastewater Canal Box Room", "One of the two Bonestones in the sewers past Septemburg’s tower.", {"reference": "https://www.100pguides.com/guides/mina-the-hollower-all-collectible-locations", "place": "Septemburg"}],
        ["boss-carving-man", ["boss"], "Beat The Carving Man", "Septemburg; Health Rose.", {"reference": "https://meowdb.com/db/mina-the-hollower/bosses", "place": "Septemburg"}],
        ["health-rose-carving-man", ["health-rose"], "Get the Health Rose from the Carving Man", "Reward for beating The Carving Man.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Septemburg"}],
        ["trinket-lightning-grip", ["trinket"], "Get Lightning Grip", "Save Kid, Squealer and Galloway before beating The Carving Man.", {"reference": "https://meowdb.com/db/mina-the-hollower/checklist", "place": "Kindlewood", "requires": ["quest-child-one", "quest-child-two", "quest-child-three"]}],
      ],
    },
    {
      title: "Sidearm for this leg",
      location: "Septemburg",
      compact: true,
      rows: [
        ["sidearm-recall-disc", ["sidearm"], "Get Recall Disc", "In Withered Farms, take the small northern tunnel and strike its candle.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"}],
      ],
    },
    {
      title: "Sidearm for this leg",
      location: "Septemburg",
      compact: true,
      rows: [
        ["sidearm-beckoning-collar", ["sidearm"], "Get Beckoning Collar", "On a strong-wind screen after the early chase, strike the left candle.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"}],
      ],
    },
    {
      title: "Sidearm for this leg",
      location: "Septemburg",
      compact: true,
      rows: [
        ["sidearm-hollowers-rocks", ["sidearm"], "Get the Pebbles", "On the early Withered Farms launchpad climb, strike the candle above the next ledge.", {"reference": "https://meowdb.com/db/mina-the-hollower/walkthrough/septemburg"}],
      ],
    },
  ],
} satisfies RawChapter;

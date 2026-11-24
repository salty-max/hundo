import type { RawChapter } from "@hundo/core/types";

export default {
  id: 2,
  title: "Bottle Grotto",
  region: "Tal Tal Heights · Goponga Swamp",
  teaser: "Bottle Grotto",
  intro: "Rescue BowWow and follow him through the swamp. Inside Bottle Grotto, use Magic Powder and the Feather to open routes blocked by darkness, pits and switches.",
  sources: [
    ["Link’s Hideaway · Switch route", "https://www.linkshideaway.com/links-awakening-switch-walkthrough/bottle-grotto/"],
    ["VGKAMI · Bottle Grotto room screenshots", "https://vgkami.com/walkthrough/links-awakening/level-2-bottle-grotto/"],
    ["Thonky · Goponga Swamp", "https://www.thonky.com/zelda-links-awakening/goponga-swamp"],
  ],
  groups: [
    {
      title: "Rescue BowWow",
      location: "Mabe Village → Koholint Prairie → Goponga Swamp",
      rows: [
        ["bottle-moblins", ["story"], "Find the Moblin Hideout", "Talk to the children and Madam MeowMeow in Mabe Village. Go through the Mysterious Forest to the northeastern exit. Use the Feather to cross the pits around the Heart Piece in Koholint Prairie and continue northeast to the cave beside an owl statue. Inside, guard against the sword-and-shield Moblin and work through the next room of spear throwers."],
        ["bottle-bowwow", ["story"], "Beat King Moblin and free BowWow", "Block or dodge the spears. When King Moblin prepares to charge, sidestep so he hits the wall, then slash while he’s stunned. Take the fairy if you need it and interact with BowWow in the next room."],
        ["bottle-enter", ["story"], "Have BowWow clear the swamp flowers", "Return west and south across the prairie pits. Cross the forest to its northwest exit by Mr. Write’s house and go east past the telephone booth. Walk up to the flowers and wait for BowWow to bite them. For an optional 50 rupees, have him clear the large flower guarding the chest in the central swamp. Continue northeast to the dungeon entrance and let him clear the flowers in front of it."],
      ],
    },
    {
      title: "Jumping detours",
      location: "Koholint Prairie · Tabahl Wasteland · Forest",
      rows: [
        ["heart-prairie", ["heart"], "Piece of Heart · Pit ring", "Just north of the Witch’s Hut, use Roc’s Feather to jump into the center of the ring of holes and jump out the same way.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-6-jump-the-circle-of-pits-koholint-prairie"] }],
        ["heart-tabahl", ["heart"], "Piece of Heart · Tabahl Wasteland", "Jump the pits east of the Witch’s Hut to reach the graveyard and continue north into the wasteland. Jump the narrow crossing to the heart piece on the far side of the pits.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-7-jump-a-line-of-pits-tabahl-wasteland"] }],
      ],
    },
    {
      title: "Forest and wasteland shells",
      location: "Mysterious Forest · Goponga Swamp · Tabahl Wasteland",
      rows: [
        ["shell-northforest", ["shell"], "Secret Seashell · North forest exit", "Leave the forest by the path north of the Toadstool clearing. Dig beside the tree on the west side of the path, just below the exit.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-8-dig-near-a-tree-at-northern-exit-mysterious-forest"] }],
        ["shell-write", ["shell"], "Secret Seashell · Mr. Write’s telephone booth", "Follow the path east from Mr. Write’s house to the telephone booth. Go north of it, slash the southernmost bush in that patch, and dig the tile underneath.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-9-dig-near-the-cliffs-west-of-goponga-swamp"] }],
        ["shell-tabahl", ["shell"], "Secret Seashell · Tabahl Wasteland", "Dig the bare dirt among the grass and dead trees in the northeast corner of the wasteland.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-10-digging-in-a-patch-of-grass-tabahl-wasteland"] }],
      ],
    },
    {
      title: "Return to the crane",
      location: "Mabe Village",
      rows: [
        ["fig-goomba", ["figure","mini"], "Goomba figure", "After Tail Cave, win Goomba at the crane game once CiaoCiao is on its stand. Place Goomba on the back table in Marin and Tarin’s house."],
      ],
    },
    {
      title: "Sweep the entrance and southeast rooms",
      location: "Bottle Grotto · torch room and crystal switches",
      rows: [
        ["bottle-loose-key-stalfos", ["story"], "Light the torches and defeat the two Stalfos", "Go north from the entrance. Light both torches with Magic Powder to open the east door. Defeat the pair of Stalfos inside and collect the Small Key that appears."],
        ["bottle-beak", ["chest","treasure"], "Stone Beak", "Return to the torch room and unlock its west door. Let the Blade Traps rush past before entering, then defeat the Keese to open the north door. Go north, jump the pit and open the chest. Block and flip the Spiked Beetle to kill it and reopen the way out. Return through the torch room to the two-Stalfos room."],
        ["bottle-key-crystal", ["chest","treasure"], "Small Key · crystal enclosure", "Go east from the two-Stalfos room and hit the crystal to lower the blue barriers. Go south and hit the next crystal through the corner of the raised orange blocks. The lowered orange blocks let you reach the chest."],
        ["bottle-key-floor", ["chest","treasure"], "Small Key · floor switch among pits", "Go east from the crystal enclosure and use the Feather to cross the pits to the southeast. Hit the crystal here to lower the blue blocks and press the nearby floor switch. Jump to the new chest in the northeast corner."],
        ["bottle-loose-key-mimics", ["story"], "Collect the Mask-Mimics’ Small Key", "Go north from the floor-switch room. Stand back-to-back with each Mask-Mimic and use a charged spin attack to strike its unarmored back. Their key falls in the fenced-off left corridor. Loop back south, then west twice to the two-Stalfos room. From there go east to the owl-and-crystal room and take its east exit to enter the fenced corridor and pick up the key."],
        ["bottle-compass", ["chest","treasure"], "Compass", "Return west to the two-Stalfos room. Use a Small Key on its south door. Spin-attack the lone Mask-Mimic from behind and open the chest that appears."],
      ],
    },
    {
      title: "Cross the basement and get the Bracelet",
      location: "Bottle Grotto · Hinox and the north wing",
      rows: [
        ["bottle-hinox", ["story"], "Reveal the stairs and defeat Hinox", "Return to the room where you fought two Mask-Mimics, entering from the south to stay outside the fenced corridor. Go east past the Spiked Beetles and unlock the north door. Push the two center blocks toward each other and take the stairs. Jump through the side-view tunnel to the left, climb out and take the one-way north door. Sidestep Hinox’s grab and hit from the side after it misses. Give its bombs room to detonate. A fairy and an entrance warp appear when it falls."],
        ["bottle-map", ["chest","treasure"], "Dungeon Map", "Go east after Hinox, jump across to the right and go north. The Vacuum Mouth periodically pulls toward the southwest. Move against the pull and open the chest in the northeast when it pauses."],
        ["bottle-rupees-20", ["chest","treasure"], "20 Rupees · powder room", "Go north from the map chest. Open the chest in the room with the floating Magic Powder pickup and take the refill if you’re running low."],
        ["bottle-bracelet", ["gear","chest"], "Power Bracelet", "Unlock the west door from the 20-rupee room. Light both torches with Magic Powder while avoiding the Boos. Open the chest that appears. The Bracelet lets you lift and throw pots and small rocks with A."],
        ["bottle-rupees-50", ["chest","treasure"], "50 Rupees · entrance pots", "Now that you can move the pots, return to the entrance using Hinox’s warp. Lift or throw the pots on the west side of the entrance room and open the chest. Take the warp back and return to the 20-rupee room. You can also collect this after the dungeon clear."],
        ["bottle-key-long-room", ["chest","treasure"], "Small Key · long switch corridor", "Lift the pots behind the 20-rupee chest and follow the northern path east. Stand on a lowered orange block beside the crystal and strike the crystal to rise with the block. Jump to the other raised orange block beyond the blue gap, then hit the crystal again to lower yourself by the chest. Open it and flip the crystal once more to continue east on the lowered blue blocks."],
      ],
    },
    {
      title: "Solve the kill-order puzzle",
      location: "Bottle Grotto · Nightmare wing",
      rows: [
        ["bottle-nightmare", ["chest","treasure"], "Nightmare Key", "Take the south exit at the far end of the long switch corridor. Push the right block of the trapped Pols Voice’s barrier down and the left block left. Throw a pot at the Pols Voice first, then slash the Keese and finally defeat the Stalfos. If you kill an enemy out of order, leave and re-enter to reset the room. Open the chest."],
        ["bottle-genie", ["story"], "Cross the weighted platform and defeat Genie", "Go north to the switch corridor and unlock the east door. Use pots on both Pols Voices and clear the Gel to reveal the stairs. In the side-view passage, carry a pot onto the left platform to lower it, then climb out and use the Nightmare Key. Dodge the Genie’s fireballs. When it ducks into the bottle, stun the bottle with your sword, pick it up and throw it against the wall. After three throws, dodge the Genie’s larger fireballs and slash it when it becomes solid."],
        ["bottle-heart", ["container"], "Genie’s Heart Container", "Pick up the full Heart Container in the boss room."],
        ["bottle-horn", ["instrument","story"], "Conch Horn", "Go through the west door from the boss room and take the instrument. If you skipped the entrance chest, re-enter with the Bracelet and collect it now."],
      ],
    },
    {
      title: "Dampé’s first arrangements",
      location: "Dampé’s Shack",
      rows: [
        ["chamber-arranging", ["challenge"], "Dungeon Arranging 101", "After Bottle Grotto, enter Dampé’s Shack north of Tabahl Wasteland. Connect the entrance to the preset chest and the boss. Every doorway needs a matching doorway. Use Y in the editor to find mismatches. Start the adventure from the entrance tile, open the chest and beat the boss."],
        ["chamber-basics", ["challenge"], "Placing the Basics", "Fit chest and locked-door tiles where marked. Put an easy chest before the lock so you can get a Small Key. The final chest always has the Nightmare Key. Give yourself a route back to the boss door from the last chest."],
      ],
    },
  ],
} satisfies RawChapter;

import type { RawChapter } from "@hundo/core/types";

export default {
  id: 6,
  title: "Face Shrine",
  region: "Ancient Ruins · Southern Face Shrine · Face Shrine",
  teaser: "Face Shrine",
  intro: "Follow the ruins to the Face Key. Inside the northern shrine, stronger lifting power turns statues and even a pair of chess knights into puzzle tools.",
  sources: [
    ["ExtremePhobia · Face Shrine", "https://gamefaqs.gamespot.com/switch/258622-the-legend-of-zelda-links-awakening/faqs/77938/level-6-face-shrine"],
    ["Link’s Hideaway · Face Shrine", "https://www.linkshideaway.com/links-awakening-switch-walkthrough/face-shrine/"],
    ["Thonky · Face Shrine", "https://www.thonky.com/zelda-links-awakening/face-shrine"],
    ["Zelda Dungeon · Southern Face Shrine", "https://www.zeldadungeon.net/links-awakening-walkthrough/face-shrine/"],
  ],
  groups: [
    {
      title: "Open the two shrines",
      location: "Ancient Ruins and Face Shrine island",
      rows: [
        ["face-south", ["story"], "Reach the Southern Face Shrine", "Leave Animal Village west, follow the river north, then turn east through the boulder path. Enter the ruins to the south and work toward the building at the northwest. Touch blocking Armos to wake them, then sidestep and shoot them with arrows or draw them off your route."],
        ["face-key", ["story"], "Defeat Armos Knight and take the Face Key", "In the shrine, jump with Roc’s Feather just before the knight lands to avoid the shockwave. Strike with charged spins until its armor breaks, then finish with more sword hits or arrows. Collect the dropped key. In the north room, light the two torches with Magic Powder and read the relief."],
        ["face-enter", ["story"], "Raise the northern Face Shrine", "Leave the ruins and descend the southern set of steps into the water. Swim to the islet with two Armos. Wake the left one and defeat it or lure it off the island to reveal the staircase. Swim west through the tunnel, Hookshot across the dry gap, and climb out. Use the Face Key on the northeast keyhole and enter the shrine."],
      ],
    },
    {
      title: "Finish the trading quest",
      location: "Martha’s Bay · Animal Village · Toronbo Shores",
      rows: [
        ["trade-lens", ["trade"], "Magnifying Lens", "Approach the Mermaid Statue from the south, using the Hookshot on the stone across the gap. Place the Scale in the statue, descend and collect the Lens."],
        ["boomerang", ["gear"], "Boomerang", "With the Lens, bomb the cracked cliff along Toronbo Shores below the coconut-throwing monkey. Offer Goriya a tradeable item such as the equipped Shovel."],
        ["buyback", ["story"], "Recover the traded item", "Talk to Goriya again and buy back the item for 300 rupees. You can keep it and the Boomerang on the Switch remake."],
      ],
    },
    {
      title: "Hookshot detours",
      location: "Mysterious Forest · Animal Village · Kanalet Castle",
      rows: [
        ["heart-forest-hook", ["heart"], "Piece of Heart · Forest Hookshot cave", "Lift the three boulders at the northeast forest log entrance. Hookshot to the solid block at the upper-left, then push the other block down to reach the piece.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-25-lift-rocks-hookshot-across-a-chasm-mysterious-forest"] }],
        ["heart-animal-hook", ["heart"], "Piece of Heart · Animal Village bomb cave", "Bomb the cliff behind Animal Village. Inside, bomb the northeast wall first. Follow the ledge and throw a bomb over the low wall to destroy the cracked block. Loop back to the entrance, go left and up, and Hookshot to the remaining block.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-29-bombs-and-hookshot-chasms-animal-village"] }],
      ],
    },
    {
      title: "Ruins, village and castle shells",
      location: "Ancient Ruins · Animal Village · Kanalet Castle · Mabe Village",
      rows: [
        ["shell-ruins-rock", ["shell"], "Secret Seashell · Northeast of the shrine", "On the overland approach from Animal Village, take the trail around the east of the shrine area. Lift the loose rock in the far northeast corner.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-30-under-a-rock-in-the-corner-eastern-face-shrine"] }],
        ["shell-armos", ["shell"], "Secret Seashell · Ancient Ruins stairs", "In the north-central part of the Armos maze, wake the statue covering a staircase. Move aside as it hops or defeat it with the Bow or Boomerang, then go down for the chest.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-42-move-an-armos-ancient-ruins"] }],
        ["shell-zora", ["shell"], "Secret Seashell · Friendly Zora", "With the Magnifying Lens, visit the house in northeast Animal Village and speak to the Zora in the pool.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-40-finding-the-friendly-zora-animal-village"] }],
        ["shell-kanalet-hook", ["shell"], "Secret Seashell · West of the castle bridge", "At the south end of the castle bridge, walk west to the line of holes. Hookshot to the stump across it and go downstairs for the chest.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-41-hookshot-across-the-potholes-kanalet-castle"] }],
        ["shell-large-fish", ["shell","mini"], "Secret Seashell · Blooper catch", "After Catfish’s Maw, catch a Blooper at the Mabe pond when the water glows. If it brings no shell, land a fish of 45 inches or more.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-44-fishing-hole-2-catch-a-blooper-mabe-village"] }],
      ],
    },
    {
      title: "Fishing and Trendy Game returns",
      location: "Mabe Village",
      rows: [
        ["lure-heavy", ["lure","mini"], "Heavyweight Lure", "Catch a Blooper after Catfish’s Maw. Aim into the middle of the pond when it glows. Ease up when the squid jets away, then reel when it turns."],
        ["stone-crane", ["stone","mini"], "Chamber Stone · Crane prize", "Check the crane game after Catfish’s Maw. Clear the early unique prizes and refresh the room until the stone appears. If it has not appeared, collect other unique prizes and revisit after your next dungeon clear."],
        ["heart-crane-2", ["heart","mini"], "Piece of Heart · Moving crane prize", "After the early unique prizes have cycled, watch for the second heart piece on a moving tray. Line up with its rail, then time the sideways movement so the tray reaches the claw as it drops.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-13-trendy-game-2-mabe-village"] }],
        ["shell-crane-2", ["shell","mini"], "Secret Seashell · Moving crane prize", "After Angler’s Tunnel, return as the prize pool refreshes. Win the first shell and the second heart piece to clear the way for the shell on the moving tray.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-32-trendy-game-2-mabe-village"] }],
        ["fig-blooper", ["figure","mini"], "Blooper figure", "After Catfish’s Maw, win Blooper and place it on the stand near the beds in Ulrira’s house."],
      ],
    },
    {
      title: "Rapids Ride and Rapids Race",
      location: "Tal Tal Heights · Raft Shop",
      rows: [
        ["heart-rapids-ride", ["heart","mini"], "Piece of Heart · Rapids Ride island", "Hookshot over the water east of Tal Tal Heights to the Raft Shop and pay 100 rupees for Rapids Ride. Keep west, avoid the early drops, then head south at the west end and pull up to the heart-piece island.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-26-explore-on-the-rapids-ride-raft-shop"] }],
        ["shell-rapids-ride", ["shell","mini"], "Secret Seashell · Rapids Ride island", "From the west route, follow the lower current east and Hookshot onto the small bare island. Dig in its upper-right corner.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-38-explore-on-the-rapids-ride-raft-shop"] }],
        ["heart-rapids-return", ["heart","mini"], "Piece of Heart · Raft return cave", "At the end, decline another run and enter the raft operator’s return cave to the west. Hookshot across its two stones to the heart piece before jumping off the ledge.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-27-use-your-hookshot-while-returning-for-another-go-raft-shop"] }],
        ["heart-rapids-race", ["heart","mini"], "Piece of Heart · Rapids Race", "Choose Rapids Race. Finish under 40 seconds. Use the Hookshot on rocks and posts to pull ahead of the current and avoid the eastern loop.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-28-get-under-40-seconds-on-the-rapids-race-raft-shop"] }],
        ["shell-rapids-race", ["shell","mini"], "Secret Seashell · Rapids Race", "Finish Rapids Race under 35 seconds. Use the first drop and Hookshot shortcuts, and check the prize dialogue after the run.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-39-get-under-35-seconds-on-the-rapids-race-raft-shop"] }],
        ["stone-rapids", ["stone","mini"], "Chamber Stone · Rapids Race", "Finish Rapids Race under 30 seconds. Use the Hookshot as soon as a post comes into range to cut across slower current."],
      ],
    },
    {
      title: "Face Shrine · the west wing",
      location: "Level 6",
      rows: [
        ["face-rupees-west", ["chest","treasure"], "Face Shrine chest · 50 rupees behind the Wizzrobes", "Go west from the entrance and defeat the three Wizzrobes with bombs or arrows while they are visible. Take the northeast door to the chest, then return and take the northwest exit."],
        ["face-bracelet", ["gear","chest"], "Face Shrine chest · Powerful Bracelet", "Follow the path around to the crystal-switch room. Drop a bomb at the switch and cross the lowered blue blocks toward the northeast doorway before it explodes, leaving the blue blocks down for the tunnel exit. In the next room bomb the cracked east wall. Clear the hidden Zols in the dark room to reveal stairs. Cross the side-view passage with the Feather and Boots. At the exit, clear the Wizzrobes and Mini-Moldorm to open the north door. Climb the left steps to the chest."],
        ["face-rupees-statue", ["chest","treasure"], "Face Shrine chest · 100 rupees past the elephant", "Lift the elephants out of the way and go north from the bracelet. Throw an elephant statue at the northeast shutter. Open the chest, then use another statue to break the south door and return to the crystal-switch room."],
        ["face-map", ["chest","treasure"], "Face Shrine chest · Dungeon Map", "Set the switch so the blue blocks are raised. Place a bomb by it and get past the lowered orange blocks toward the northwest door before it goes off. With the blue blocks down, defeat the three Wizzrobes in the room beyond to reveal the chest."],
        ["face-beak", ["chest","treasure"], "Face Shrine chest · Stone Beak", "Leave the map room north. In the room with several pots and a breakable north shutter, first take the east doorway into the small side room and open the chest. Return to the pots."],
        ["face-compass", ["chest","treasure"], "Face Shrine chest · Compass", "Throw a pot at the north shutter. Go north and then east and open the chest below the crystal switch. Hit the crystal from the steps to raise the orange blocks, then go west and follow their tops past the barrier."],
        ["face-rupees-west-knights", ["chest","treasure"], "Face Shrine chest · 100 rupees by the western knights", "Use an elephant statue to open the north shutter. In the chessboard room, leave the crystal as it is, climb the right-side steps, and open the chest on the raised platform."],
        ["face-rapids-shell", ["shell","chest"], "Face Shrine exterior chest · Secret Seashell", "Go up the stairs behind the 100-rupee chest in the western chess room. The staircase emerges on a walled island in the Rapids. Open the chest outside and return down the same stairs.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-43-ducking-out-for-some-fresh-air-inside-face-shrine"] }],
        ["face-west-knights", ["story"], "Solve the western chess knights", "Find the sockets with green centers. From the left socket move one tile south and three east, then throw the black knight west. From the right socket move one tile south and three west, then throw the white knight east. Their L-shaped bounces seat them in the sockets and reopen the south door."],
        ["face-key-wizzrobes", ["story"], "Take the loose Wizzrobe key", "Go south, then east to the Compass and go up the steps. With the orange blocks raised by the switch, follow the raised path south, then east around its corners, then north into a room mostly covered in orange blocks. Defeat the Wizzrobes and take the Small Key they drop. Return to the entrance with Manbo’s Mambo or backtrack."],
      ],
    },
    {
      title: "Face Shrine · the east wing",
      location: "Level 6",
      rows: [
        ["face-key-water", ["chest","treasure"], "Face Shrine chest · Small Key beyond the pool", "Go east twice from the entrance past the conveyors and blade traps. In the flying-tile room, face west with your shield up from the southeast corner until the tiles are spent, then go north. Break the east shutter with a statue, defeat all four Wizzrobes, and go north. Go down the steps into the shallow water and follow it to the chest."],
        ["face-smasher", ["story"], "Defeat Smasher", "Return to the statue room west of the four Wizzrobes. Unlock its north door, clear the red Zols, and bomb the crack in the north wall. Dodge the miniboss’s thrown ball, grab it before he does, and throw it back at him. Pick up the fairy and leave north. Lift the left elephant statue and take the hidden stairs."],
        ["face-key-tiles", ["story"], "Take the loose flying-tile key", "In the passage, time your jumps between ladders to avoid the Sparks. Climb out into the second flying-tile room. Block the tiles from the southeast corner and hop over to pick up the key they leave. Unlock the northeast block and proceed."],
        ["face-east-knights", ["story"], "Solve the central chess knights", "Go past the Sparks and throw a statue through the west shutter. Remove the pots so you can see the marked floor. Stand one tile south of the left socket on white and throw the white knight east. Stand one more tile south on black and throw the black knight west. Go west and take the stairs. Dash across the Thwomp tunnel during openings and climb out at the east end."],
        ["face-rupees-east-knights", ["chest","treasure"], "Face Shrine chest · 300 rupees by the eastern knights", "Clear the three Pols Voice with pots, arrows, or bombs. Go north through the room with pots and Sparks to the mirror chess room. Climb the left steps to the chest. If the shutter closes, put the knights into their sockets. Throw the black knight east from the southwestern blue block and the white knight west from four tiles to its left. Return south to the Pols Voice room."],
        ["face-nightmare-key", ["chest","treasure"], "Face Shrine chest · Nightmare Key", "Go south from the Pols Voice room. Feed the two Dodongo Snakes bombs and take the west door. Grapple to the wooden block across the gap, unlock the key block, and continue north. Throw a pot at the sealed chest before opening it."],
        ["face-medicine-chest", ["chest","treasure"], "Face Shrine chest · Secret Medicine", "Set the nearby switch so the orange blocks are raised. Drop into the shallow water to the south, follow it to the exit, then go south from the four-Wizzrobe room. Clear the two Wizzrobes, climb the left stairs, and jump along the raised orange blocks to the steps across the gap. Follow the high route northeast past the blade trap to the chest above the four Wizzrobes. If you already carry Secret Medicine, Link puts this dose back. Return when you have space to claim it."],
      ],
    },
    {
      title: "Face Shrine · the face in the floor",
      location: "Level 6",
      rows: [
        ["face-boss", ["story"], "Defeat Facade", "Return to Smasher’s north exit and take the stairs under the left statue back to the flying-tile room. Leave south. Stay near the walls to reveal the Zols around the Vacuum Mouth and clear them. Go east, kill the Wizzrobe while dodging the laser, then jump up and move the block blocking the north exit. Light the two unlit braziers with Magic Powder if you need a breather. In the Nightmare room, place bombs on Facade’s face and block or dodge the flying debris. When pits start opening, keep moving and throw a bomb onto the face from clear ground."],
        ["face-heart", ["container"], "Facade · Heart Container", "Collect the full Heart Container from the arena."],
        ["face-triangle", ["instrument","story"], "Claim the Coral Triangle", "Go north after the fight and collect the instrument."],
      ],
    },
    {
      title: "Seashell rewards and recovery",
      location: "Seashell Mansion · Face Shrine",
      rows: [
        ["stone-mansion30", ["stone"], "Chamber Stone · 30 shells", "Stand on the meter at Seashell Mansion with at least 30 shells. Bring the reward to Dampé."],
        ["sword-koholint", ["gear"], "Koholint Sword · 40 shells", "Stand on the Mansion meter with 40 shells. The upgraded sword can fire a beam at full health."],
        ["fairy-face", ["fairy"], "Great Fairy · Face Shrine", "Look for the cracked wall east of the shrine entrance. Bomb it to enter the fountain cave."],
      ],
    },
    {
      title: "Dampé’s second heart piece",
      location: "Dampé’s Shack",
      rows: [
        ["chamber-vault", ["challenge"], "Treasure Vault", "After Catfish’s Maw, place chest rooms on the marked tiles and bridge the separated areas with stairs. Open every chest before trying the Nightmare door. Simple Color Dungeon puzzles make good chest rooms."],
        ["chamber-central", ["challenge","heart"], "Passageway Central", "After Treasure Vault, finish the arrangement with a route between the islands of tiles. Use stair chambers in pairs and confirm the links with Y. Keep required chests on a loop so you can collect them on one pass. Finish all four tier-two challenges for the second Piece of Heart.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-24-complete-all-tier-2-challenges-dampers-shack"] }],
      ],
    },
  ],
} satisfies RawChapter;

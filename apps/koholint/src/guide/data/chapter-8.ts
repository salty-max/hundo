import type { RawChapter } from "@hundo/core/types";

export default {
  id: 8,
  title: "Turtle Rock",
  region: "Western Tal Tal Mountains · Turtle Rock",
  teaser: "Turtle Rock",
  intro: "Head west through the mountains, then solve a network of lava crossings, locked rooms and side-view tunnels.",
  sources: [
    ["Western mountain route", "https://gamefaqs.gamespot.com/switch/258622-the-legend-of-zelda-links-awakening/faqs/77938/unto-the-turtle"],
    ["Turtle Rock room-by-room route", "https://gamefaqs.gamespot.com/switch/258622-the-legend-of-zelda-links-awakening/faqs/77938/level-8-turtle-rock"],
    ["Turtle Rock alternate routes and screenshots", "https://www.zeldadungeon.net/links-awakening-walkthrough/turtle-rock/"],
    ["Trap chest and other room details", "https://www.linkshideaway.com/links-awakening-switch-walkthrough/turtle-rock/"],
  ],
  groups: [
    {
      title: "Cross the western mountains",
      location: "Tal Tal Mountain Range",
      rows: [
        ["turtle-marin", ["story"], "Rescue Marin at the broken bridge", "Return to the Hen House above Angler’s Tunnel. Head west and Hookshot across the first broken bridge. At the second gap, use the Hookshot again to reach Marin. Go west after the scene, cut the bush and descend the stairs it conceals."],
        ["turtle-west-mountain", ["story"], "Reach the cave with the flame jet", "In the passage west of the bridge, the cracked south wall leads to a Heart Piece detour. The main route goes west down the steps and across a gap with the Hookshot. Exit and climb the path while watching for falling boulders. At the top, head west past the rupee chest and the boulder over Mad Batter’s staircase. Drop south from the ledge, find the cracked wall and bomb it."],
        ["turtle-flame-jet", ["story"], "Cross with the Mirror Shield", "Hold up the Mirror Shield facing north and walk into the flame jet until you can step left out of its path. Climb the stairs and lift the nearby rock to uncover the Western Tal Tal Mountains warp point. From there, continue west toward the stone turtle."],
        ["turtle-entrance", ["story"], "Wake the Giant Turtle", "Play Frog’s Song of Soul at the stone head. When it draws back, sidestep the lunge. Drop a bomb by its head after it crashes into the wall and repeat until the mask breaks. Then slash its exposed face after a lunge or jump and slash when it sweeps overhead. Enter the opening it leaves."],
      ],
    },
    {
      title: "Western mountain detours",
      location: "Tal Tal Mountains · Turtle Rock",
      rows: [
        ["heart-west-cave", ["heart"], "Piece of Heart · Mountain bomb wall", "Hookshot west across the broken Hen House bridge. In the first cave, bomb the cracked wall in the lower recess and take the right-hand route inside.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-30-bomb-a-cracked-wall-western-tal-tal-mountain-range"] }],
        ["heart-west-path", ["heart"], "Piece of Heart · Mountain side path", "On the stone field before the cave with the fire jet, take the southwest path to the heart piece. Use care near the drop to the swamp.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-31-head-down-a-sidepath-western-tal-tal-mountain-range"] }],
      ],
    },
    {
      title: "Carry more arrows",
      location: "Western Tal Tal Mountains",
      rows: [
        ["upgrade-arrows", ["gear"], "Arrow capacity · 60", "At the top of the rockfall trail, lift the lone boulder just south of the upper treasure chest. Descend and sprinkle Powder on the altar. Decline other offers until you get the arrow upgrade if you still need it."],
      ],
    },
    {
      title: "Return to the crane",
      location: "Mabe Village",
      rows: [
        ["fig-plant", ["figure","mini"], "Piranha Plant figure", "After Eagle’s Tower, win the Piranha Plant. If it tips, try gripping the base. Place it on the floor stand by the bed and pots in Marin and Tarin’s house."],
      ],
    },
    {
      title: "Island warp points",
      location: "Koholint Island",
      rows: [
        ["warp-west", ["warp"], "Western Tal Tal Mountains warp", "After passing the flame jet, lift the rock near the cave exit to reveal the pad."],
      ],
    },
    {
      title: "West wing, map and crystal switch",
      location: "Turtle Rock · west and south rooms",
      rows: [
        ["turtle-blue-hinox", ["story"], "Clear the entrance and Blue Hinox", "Head north to the first Vire. Block or sidestep its shots, hit it during a swoop or use a ranged attack, then dodge or slash the two Keese it splits into. Go west, reflect the Beamos beam and defeat the Ropes. Head north to fight Blue Hinox, keeping out of its grab range. Take the west door once it opens."],
        ["turtle-rupees-floor", ["chest","treasure"], "20-rupee chest from the first floor puzzle", "Activate the paving block and steer it four tiles west, two north, one west, then south to the end. Covering every gap reveals a chest. After opening it, go south."],
        ["turtle-rupees-sparks", ["chest","treasure"], "50-rupee chest in the pit room", "Jump the holes to the chest. The Boomerang can remove the Sparks before you jump. Take the west door to Rolling Bones and jump over its spike roller as you attack."],
        ["turtle-key-vire", ["story"], "Small Key from the western Vire", "After beating Rolling Bones, go north and defeat the Vire to collect the dropped key. Return south to Rolling Bones’s room and continue south to the next room."],
        ["turtle-compass", ["chest","treasure"], "Compass chest", "Get to the Vacuum Mouth in the southeast and hit it, then clear the Zols around the central chest. Open it and return to the entrance with Manbo’s Mambo, or retrace the western rooms to the first Vire."],
        ["turtle-map", ["chest","treasure"], "Dungeon Map chest", "From the first Vire go north across the lava, then east to the paving block. Steer it two tiles north and two west to bridge to the west passage. Follow that passage to three blocks guarding the chest. Push the upper and lower blocks west and the middle one south."],
        ["turtle-stone-beak", ["chest","treasure"], "Stone Beak chest", "Bomb the north wall in the Map room, enter, and take the stairs to the left. Cross the side-view lava tunnel to the east, timing jumps between the fireballs. Open the chest in the room with Ropes. Defeat the Ropes and take the north door to Smasher. Dodge the heavy ball and throw it back at him until the west door opens."],
        ["turtle-key-paving", ["story"], "Small Key from the diagonal floor puzzle", "West of Smasher, use the paving block to cover the entire zigzag gap. With N, S, E and W as tile directions, steer W2, N1, W1, N1, W1, N1, W2. Then steer S1, E1, S1, E1, S1, E1, S1, E1, S1, E1, N1, E1, S1, E1. Pick up the dropped key. Bomb the north wall, go through and strike the crystal so it is orange and the blue barriers are down."],
        ["turtle-trap", ["chest","treasure"], "Trapped chest containing a Zol", "Bomb the west wall in the crystal room and go through. Climb onto the raised walkway, take the south exit and drop from the ledge to the chest. It releases a green Zol. Continue west twice to the first Vire."],
      ],
    },
    {
      title: "Unlock the north wing",
      location: "Turtle Rock · central rooms and roof",
      rows: [
        ["turtle-north-route", ["story"], "Build a bridge to the locked passage", "From the first Vire, go north and east to the paving block. To reach the gap between the northern blocks, steer N1, E2, N3. Follow the path and push the block on the right into the lava. Go north through the lock block, then east and through the locked door. Jump when entering the room with the blade traps and take the one-way door north."],
        ["turtle-key-gibdos", ["story"], "Small Key from the Gibdos", "Go north again from the room with the floating bombs and Owl Statue. Keep moving on the cracking floor and kill both Gibdos. Pick up their key near the doorway where you came in. Backtrack south one room and bomb its west wall. Leave the Dodongo Snakes alone if you reach their lower floor."],
        ["turtle-key-eye", ["story"], "Small Key from the eye statue", "Enter through the bomb opening. Jump to the southwest exit and use a key on the lock block. Pass west through the next dark room, then bomb the west wall of the room with the Ropes and Peahat. Hop over the lava and stand directly south of the eye statue. Shoot an arrow north into its eye and retrieve the key."],
        ["turtle-key-block-chest", ["chest","treasure"], "Small Key chest behind movable blocks", "Go west from the eye statue. Reflect the Beamos beam with the Mirror Shield, stand left of the chest, push the block below you down, and push the block in front of the chest to the right. Open the chest. Leave by the southwest doorway and return to reset the blocks so you can go back east."],
        ["turtle-rupees-roof", ["chest","treasure"], "50-rupee chest by the roof exit", "From the eye statue take the northwest passage. Clear the two Ropes and the Vire, then take the west exit. Climb the stairs and loop back east on the upper level. Hookshot east to the chest in the northeast corner."],
        ["turtle-roof", ["story"], "Find the roof shortcut", "Drop into the center of the 50-rupee chest room and take the stairs at its north end. On the surface, the grassy rise holds a Heart Piece. Cross the bridge east, activate the Turtle Rock warp point, and re-enter the dungeon through the eastern opening."],
        ["turtle-key-dodongo", ["chest","treasure"], "Small Key chest from the Dodongo Snakes", "From the roof entrance, stay on the ledge and throw bombs down into the path of both Dodongo Snakes. Each needs to swallow three bombs. Defeating both spawns the Small Key chest on the ledge beside you."],
        ["turtle-medicine", ["chest","treasure"], "Secret Medicine chest", "West of the Dodongo room, follow the thin ledge north beside the lava and Hookshot across to the chest. Link puts the medicine back if he is already carrying a dose. The ledge is one-way from the chest side, so take the way back toward the entrance or play Manbo’s Mambo."],
      ],
    },
    {
      title: "Turtle Rock’s roof",
      location: "Turtle Rock · exterior",
      rows: [
        ["heart-turtle-roof", ["heart"], "Piece of Heart · Turtle Rock roof", "Take the stairs in the northwestern part of Turtle Rock to the surface and pick up the heart piece on the grass. Register the warp while you’re there.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-32-step-outside-of-the-dungeon-to-cool-off-turtle-rock"] }],
      ],
    },
    {
      title: "Island warp points",
      location: "Koholint Island",
      rows: [
        ["warp-turtle", ["warp"], "Turtle Rock warp", "Use the stairs in the dungeon’s northwestern part. Step on the outdoor pad near the roof heart piece."],
      ],
    },
    {
      title: "The Magic Rod and Nightmare Key",
      location: "Turtle Rock · lower tunnels and northwest wing",
      rows: [
        ["turtle-blaino-route", ["story"], "Reach Blaino’s room", "From the first Vire, retrace the route through the northern lava bridge, east to the blade traps, then north through the one-way door. Go west through the bomb opening and continue west across the dark rooms to the one with the Peahat. Climb the northeast stairs, unlock the block and go east. Hookshot to the stairs across the gap and unlock their block. In the side-view tunnel, hop between platforms when the lava fireballs are low. At the end, climb the ladder and go south."],
        ["turtle-blaino", ["story"], "Defeat Blaino", "Circle the boxer and wait for a punch, then hit him from the side or behind while he recovers. Move across his line of attack if he winds up an uppercut. It can send you back to the entrance."],
        ["turtle-magic-rod", ["gear","chest"], "Magic Rod chest", "Take the north door after beating Blaino. Cross the lowered blue blocks and climb the steps to the chest. If the blocks are raised, use the portal to go back to the entrance, revisit the crystal room and set the switch to orange. Return through Blaino’s portal."],
        ["turtle-key-torches", ["chest","treasure"], "Small Key chest from the dark torches", "Return to the first Vire and go west twice via the Blue Hinox to the first floor puzzle. Pave a path to that room’s north exit. Use the Magic Rod to light both torches through the fences in the dark room. Open the Small Key chest that appears."],
        ["turtle-cueball", ["story"], "Melt a path to Cueball", "Return to the large lava room north of the first Vire. Use the paving block to cross east and reach the nearer staircase on the south ledge. In the ice tunnel, melt the first ice wall and clear the falling Goombas. In the next part, jump and fire west to melt the top row and use the bottom row as stepping stones. Climb out and unlock the west door. When Cueball charges, jump over it and slash its rear while staying clear of the lava."],
        ["turtle-nightmare-key", ["chest","treasure"], "Nightmare Key chest", "Go north from Cueball to the last paving puzzle. Steer up to the northwest corner and east to the northeast. Go down two tiles, left two under the east torch, then up, left, down and left to get under the west torch. Go south to the bottom edge and snake east around the remaining gaps. A fully covered floor spawns the chest in the northeast."],
      ],
    },
    {
      title: "Find and defeat Hot Head",
      location: "Turtle Rock · final tunnel",
      rows: [
        ["turtle-final-ice", ["story"], "Cross the second ice tunnel", "Back at the central lava pool, build a bridge east all the way to the far staircase. Inside the tunnel, climb to the top and melt the ice to your west. In the next part, clear the column overhead and jump-fire west to remove the top row. Use the remaining ice to reach the west ledge and melt the block in its way. In the last part, melt the bottom row and the column above the second tile from the right. Return to the ladder, jump from the first remaining ice block across the gap and climb down the far-left ladder."],
        ["turtle-boss", ["story"], "Defeat Hot Head", "Open the Nightmare Door. Shoot the Magic Rod across the lava when Hot Head leaps, then keep firing while it bounces exposed. Avoid the diagonal lava splashes when it lands. Once its shell breaks, keep shooting as the exposed head jumps."],
        ["turtle-heart", ["container"], "Heart Container", "After Hot Head falls, jump around the outside of the lava pool and collect the Heart Container on the west side."],
        ["turtle-drum", ["instrument"], "Thunder Drum", "Go through the north door and collect the eighth Instrument of the Sirens."],
      ],
    },
    {
      title: "Mountain shells and the final Mansion reward",
      location: "Western Tal Tal Mountains · Seashell Mansion",
      rows: [
        ["shell-rockslide", ["shell"], "Secret Seashell · Above the rockslide", "Climb past the rolling boulders and lift the loose rock on the plateau at the top.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-49-lift-up-a-rock-western-tal-tal-mountain-range"] }],
        ["shell-west-cross", ["shell"], "Secret Seashell · Western mountain stone cross", "After using the Mirror Shield to pass the fire jet, walk west of the Western Tal Tal Mountains warp. Dig in the center of the cross-shaped pebble pattern at the south edge.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-50-dig-between-the-stones-western-tal-tal-mountains"] }],
        ["stone-mansion50", ["stone","effect"], "Chamber Stone · 50 shells", "With all 50 shells, collect the final reward at Seashell Mansion and bring it to Dampé for the +Rupees Effect."],
      ],
    },
    {
      title: "Dampé’s swordless challenge",
      location: "Dampé’s Shack",
      rows: [
        ["chamber-sheathed", ["challenge","effect"], "Sheathed Sword", "After Eagle’s Tower and Heart Shortage, use the Bow, Boomerang, bombs or pots. Avoid fights that require sword swings. Facade is a good boss choice because it takes damage from bombs. Clearing it awards +Hearts."],
      ],
    },
  ],
} satisfies RawChapter;

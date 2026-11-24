import type { RawChapter } from "@hundo/core/types";

export default {
  id: 7,
  title: "Eagle’s Tower",
  region: "Mabe Village · Tal Tal Mountain Range",
  teaser: "Eagle’s Tower",
  intro: "Find a way across the mountain gaps, then bring down four pillars inside a dungeon that spans multiple floors.",
  sources: [
    ["Mountain route and Bird Key", "https://gamefaqs.gamespot.com/switch/258622-the-legend-of-zelda-links-awakening/faqs/77938/the-lonely-mountaineer"],
    ["Eagle’s Tower room-by-room route", "https://gamefaqs.gamespot.com/switch/258622-the-legend-of-zelda-links-awakening/faqs/77938/level-7-eagles-tower"],
    ["Pillar route and chest screenshots", "https://vgkami.com/walkthrough/links-awakening/level-7-eagles-tower/"],
    ["Frog’s Song of Soul and mountain detours", "https://www.zeldadungeon.net/links-awakening-walkthrough/eagles-tower/"],
  ],
  groups: [
    {
      title: "Bring the Flying Rooster back",
      location: "Signpost Maze and Mabe Village",
      rows: [
        ["eagle-signpost-maze", ["song","story"], "Solve the Signpost Maze", "If you haven’t learned Frog’s Song of Soul, leave Mabe Village east toward Ukuku Prairie, go south, and Hookshot across the gaps into the maze. Start with the entrance sign. Follow each arrow in a straight line to the sign in its row or column and read it before moving on. Use the Power Bracelet and Hookshot to clear the obstructions. The final sign reveals stairs to Mamu, who teaches the song for 300 rupees."],
        ["eagle-rooster", ["story"], "Revive the Flying Rooster", "With the Powerful Bracelet from Face Shrine, push the weather vane north from its south side in Mabe Village. Descend and play Frog’s Song of Soul beside the pile of bones. Lift the revived rooster when you need it to carry you over a gap."],
      ],
    },
    {
      title: "Find the Bird Key",
      location: "Tal Tal Mountain Range",
      rows: [
        ["eagle-hen-house", ["story"], "Reach the Hen House", "Climb north behind Dampé’s Shack, lift the rocks and take the mountain tunnel toward the ledge above Angler’s Tunnel. Swim east and climb the first tall ladder out of the water. Walk west along the bridge to the Hen House and enter the cave just below it."],
        ["eagle-bird-key", ["gear"], "Bird Key", "In the cave, work around the bottom of the boulder room. At the first torch, move two tiles west and one north, then alternately push rocks north and west until you can lift the rooster and fly to the north doorway. In the next room, carry the rooster over the large pit and land on the left. Climb to the key. Fly back and push the boulders south to clear your return."],
        ["eagle-upper-tunnels", ["story"], "Cross the eastern mountain tunnels", "Back at the base of the ladder, swim east to the cave at the end. Follow its main passage southeast to an owl statue. The cave’s bombable north wall is the turnoff for the five-chest rupee puzzle and the Seashell ledge. Outside, climb the next ladder and follow the upper cave through. Walk left outside and re-enter via the neighboring opening, then take the stairs inside. Use the rooster or Hookshot to cross the gap and exit southeast."],
        ["eagle-unlock", ["story"], "Open Eagle’s Tower", "On the far-eastern ledge, the dig spot reveals a warp point and the cracked wall hides a Great Fairy. Continue through the cave to the east. Take the stairs at the back and follow the upper room southwest to its exit. Outside, walk west past the tower and lift the rock by the keyhole. Insert the Bird Key and climb into the rotated tower."],
      ],
    },
    {
      title: "Old Baron and the crane",
      location: "Mabe Village",
      rows: [
        ["stone-baron", ["stone"], "Chamber Stone · First Ol’ Baron", "After Face Shrine, look for the glowing pond and fish deep with the Heavyweight Lure. Land the huge blue Ol’ Baron once."],
        ["stone-baron-large", ["stone"], "Chamber Stone · Large Ol’ Baron", "Catch an Ol’ Baron over 60 inches. If the first catch was large enough, check whether both rewards were awarded."],
        ["fig-shyguy", ["figure","mini"], "Shy Guy figure", "After Face Shrine, win Shy Guy and put it on the stand just inside the right-hand door of the north family house."],
      ],
    },
    {
      title: "Eastern mountain shells",
      location: "Tal Tal Mountains",
      rows: [
        ["shell-hen-toss", ["shell"], "Secret Seashell · Below the Hen House bridge", "Near the Hen House, stand on the bridge above the hole in the pile of stones and throw a lit bomb into the opening.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-45-throw-a-bomb-in-a-hole-western-tal-tal-mountain-range"] }],
        ["shell-hen-rock", ["shell"], "Secret Seashell · East of the Hen House", "Cross the bridge east of the Hen House. Lift the rock at the far end to find the shell.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-46-lift-a-rock-western-tal-tal-mountain-range"] }],
        ["shell-tal-ledge", ["shell"], "Secret Seashell · Eastern mountain ledge", "Bomb the cracked wall in the flooded cave east of Angler’s Tunnel. Take the stairs to the block puzzle, push the top block left and the one right of the leftmost chest down. Exit to the ledge and open its chest.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-47-bomb-a-wall-and-explore-a-cave-eastern-tal-tal-mountain-range"] }],
        ["fairy-east", ["fairy"], "Great Fairy · Eastern Tal Tal Mountains", "Bomb the cracked cliff in the far eastern mountains near the Eagle’s Tower approach to reach the fountain."],
      ],
    },
    {
      title: "Island warp points",
      location: "Koholint Island",
      rows: [
        ["warp-east", ["warp"], "Eastern Tal Tal Mountains warp", "On the mountain route southeast of Eagle’s Tower, dig on the faint circular mark near the ledge path."],
      ],
    },
    {
      title: "Shop Chamber Stone",
      location: "Mabe Village",
      rows: [
        ["stone-shop-3", ["stone"], "Shop Chamber Stone · 3 of 7", "After Face Shrine, check the Town Tool Shop again. Buy the newly available stone for 1,280 rupees."],
      ],
    },
    {
      title: "The iron ball and the first two pillars",
      location: "Eagle’s Tower · 1F and 2F",
      rows: [
        ["eagle-key-likelikes", ["story"], "Small Key from the Like Likes", "Go east twice from the entrance, jumping the blade traps and floor spikes on the way. Defeat both Like Likes in the southeast room and pick up the key they drop. Use it on the north door, follow the corridor upstairs, and leave the shield chest room through the northeast exit for now."],
        ["eagle-pillar-first", ["story"], "Smash the first pillar", "Lift the iron ball in the pulley room and set it on the line between the east handle and west gate. Pull the handle back, pick up the ball and hurry west between the closing blocks. Clear the Zols in the next room and throw the ball at the cracked pillar. If the ball falls through a pit, look for it back in the pulley room."],
        ["eagle-map", ["chest","treasure"], "Dungeon Map chest", "From the first pillar, take the northwest doorway to the horse-head puzzle. Move the white piece aside, stand on its original slot and throw the black piece east. For the white piece, stand one tile south of the dark tile in the far northwest corner and throw south. Both pieces land upright and reveal the chest in the northeast."],
        ["eagle-pillar-second", ["story"], "Smash the second pillar", "Return to the first pillar, jump the gap to its southeast doorway and head south twice to the fenced crystal. Strike it to make it orange and lower the blue blocks. Fetch the ball and return to the second pillar just north of that crystal. Toss the ball over the gap before jumping after it, then throw it east into the pillar."],
        ["eagle-stage-third-ball", ["story"], "Send the ball around the divider", "Take the ball north to the first pillar, push the block down to clear the west passage, and carry the ball west. Throw it past the spikes before jumping them, then go north into the blue-tiled room. Take that room’s southwest exit and throw the ball east across the low divider into the other half of the pillar room. Return north."],
        ["eagle-compass", ["chest","treasure"], "Compass chest", "In the blue-tiled room, time a hit on each of the three card enemies so all stop on the same suit. Open the chest in the northeast. Descend the stairs on the room’s north side."],
      ],
    },
    {
      title: "The Hinox, the Mirror Shield and the last pillars",
      location: "Eagle’s Tower · 1F and 2F",
      rows: [
        ["eagle-hinox", ["story"], "Small Key from the Red Hinox", "On 1F, skirt the raised orange blocks along the north wall, follow them west and then south, and take the stairs immediately east of the blocked Stone Beak chest. Go south from the room with the Sparks. Keep away from the pits while fighting the Red Hinox. Hit from a corner or at range, and collect the Small Key it drops."],
        ["eagle-shell", ["shell","chest"], "Secret Seashell chest", "Drop through a pit against the west side of the Red Hinox arena to land on a raised 1F walkway. Stay on it and follow the west wall north to the chest. Return south along the ledge and drop near the stairs to the Hinox area.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-48-jump-down-a-hole-in-the-hinox-boss-room-eaglers-tower"] }],
        ["eagle-bomb-chest-spawn", ["story"], "Reveal the chest beyond the gap", "Go back upstairs and south through the Hinox arena, then east into the other card-enemy room. Match all three suits to make a chest appear across the gap. You’ll use that chest as a Hookshot target when you circle around."],
        ["eagle-pillar-third", ["story"], "Smash the third pillar and open the shortcut", "Return to the room north of the Hinox and take its west door. Guard with your shield until the orange floor tiles stop flying. Go east and throw the waiting ball at the third pillar. Bomb the cracked south wall between the torches, go through it and bomb the next south wall as well. Return to the ball."],
        ["eagle-stage-fourth-ball", ["story"], "Get the ball over the second divider", "Push the block out of the third pillar room’s east passage and throw the ball across the pit. Carry it east and then south twice to the fenced crystal and throw it over the fence to the south. Keep the crystal orange for the return trip. Backtrack to the first card-enemy room, go downstairs, and follow the west passage back up to the Hinox. Go east twice from the Hinox to recover the ball. Take it west one room and throw it north across the short divider toward the fourth pillar."],
        ["eagle-mirror-shield", ["gear","chest"], "Mirror Shield chest", "Go east from the southern card-enemy room, strike the crystal to turn it blue and cross the lowered orange blocks to the east. Use the Hinox’s Small Key on the lock block at the stairs and go up. Head north, jump onto the blue blocks by the shield chest, then hit the crystal from there with a projectile to turn it orange. Open the chest for the Mirror Shield."],
        ["eagle-small-key-chest", ["chest","treasure"], "Small Key chest on the east walkway", "Drop through the hole beside the crystal in the Mirror Shield room. You land on a raised walkway on 1F. Follow it north to the Small Key chest in the northeast corner. This third key opens an optional lock block on 3F."],
        ["eagle-stone-beak", ["chest","treasure"], "Stone Beak chest", "Follow the east walkway south to the crystal surrounded by spikes and drop down. With the crystal orange, stand on the lowered blue blocks to its west and hit the crystal with a projectile. Ride the rising blocks, follow them west, jump the gaps, then turn south to reach the chest."],
        ["eagle-one-bomb", ["chest","treasure"], "Single Bomb chest", "From the Stone Beak chest, go east and Hookshot to the pot across the gap. Climb the stairs, drop onto the raised orange blocks and follow them north to the spiked crystal. Set it orange. Follow the lowered blocks west, south and east to the room with blade traps and a Gibdo, then go south to the Like Likes. Take the original stairs to 2F. From the Mirror Shield room, go south, climb the short stair and drop west past the orange blocks. Circle to the flying-tile room, go east, and follow the two bomb passages south. Hookshot east to the chest you spawned by matching the suits."],
        ["eagle-pillar-fourth", ["story"], "Smash the fourth pillar", "Pick up the ball near the Bomb chest and take it north. Throw it into the last cracked pillar. With all four destroyed, the tower’s top floor drops into place."],
      ],
    },
    {
      title: "The third floor and the roof",
      location: "Eagle’s Tower · 3F and exterior",
      rows: [
        ["eagle-grim-creeper", ["story"], "Defeat Grim Creeper", "Drop through the pit in the Bomb chest room to return to the entrance. Take the original stairs to 2F and retrace the route to the room immediately south of the blue card-enemy room. Climb the stairs on its east side to 3F. Go north, then east from the long room. Stand in a corner facing the middle and swing at the flying enemies as they dive. Defeat the entire wave before one escapes."],
        ["eagle-nightmare-key", ["chest","treasure"], "Nightmare Key chest", "From Grim Creeper’s room take the northeast exit. Push the two wooden blocks toward each other to reveal the chest. Deal with the Sparks first if they’re in your way."],
        ["eagle-medicine", ["chest","treasure"], "Secret Medicine chest", "Backtrack to the long room west of Grim Creeper and open the Nightmare Door in the northwest. Go north, then east to the conveyor and chess pieces. Reflect the Beamos beam and clear the Zol. Stand one tile south of the east socket and throw the black knight west. Stand one tile south of the west socket and throw the white knight east. Open the new chest. Link puts the medicine back if he already has a dose."],
        ["eagle-boss", ["story"], "Defeat Evil Eagle", "Return to the room just past the Nightmare Door. Climb the northwest steps, Hookshot east across the gap, go south and take the stairs on the east to the roof. Stay near the middle. Use the Mirror Shield and walk toward the eagle during the feather gust. Slash low passes or use the Bow, Hookshot or Boomerang to catch higher ones. Keep your footing between attacks."],
        ["eagle-heart", ["container"], "Heart Container", "Pick up the Heart Container on the roof after defeating Evil Eagle, then climb back down into the tower."],
        ["eagle-organ", ["instrument"], "Organ of Evening Calm", "Back inside, drop to the lower level and enter the newly opened door to the east. Collect the seventh Instrument of the Sirens."],
      ],
    },
    {
      title: "Dampé’s third Fairy Bottle",
      location: "Dampé’s Shack",
      rows: [
        ["chamber-stairs", ["challenge"], "Stair Decisions", "After Face Shrine and Treasure Vault, build around the preset stair rooms. Keep each intended pair close, then inspect the links with Y. Move the extra stairs away from the critical pair if they link incorrectly."],
        ["chamber-shortage", ["challenge","bottle"], "Heart Shortage", "Fill the bottle shape after Stair Decisions. You start with three hearts. Put one easy chest and the boss near the entrance and connect the remaining cells as dead-end branches. Clear for the third Fairy Bottle."],
      ],
    },
  ],
} satisfies RawChapter;

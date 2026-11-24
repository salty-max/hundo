import type { RawChapter } from "@hundo/core/types";

export default {
  id: 3,
  title: "Key Cavern",
  region: "Ukuku Prairie · Kanalet Castle",
  teaser: "Key Cavern",
  intro: "Recover five Golden Leaves for Richard, then use his secret passage to find the Slime Key. Bring Bombs for Key Cavern and open all four basement doors for a full sweep.",
  sources: [
    ["Link’s Hideaway · Switch route", "https://www.linkshideaway.com/links-awakening-switch-walkthrough/key-cavern/"],
    ["GameFAQs · Key Cavern room-by-room", "https://gamefaqs.gamespot.com/switch/258622-the-legend-of-zelda-links-awakening/faqs/77938/level-3-key-cavern"],
    ["Nintendo Life · Kanalet Castle and the Slime Key", "https://www.nintendolife.com/guides/zelda-links-awakening-slime-key-location-five-golden-leaves-and-kanalet-castle-bridge"],
    ["Zelda Universe · Toadstool Tunnel Heart Piece", "https://zeldauniverse.net/guides/links-awakening/sidequests/pieces-of-heart/#The_Toadstool_Tunnel"],
  ],
  groups: [
    {
      title: "Prepare for Kanalet Castle",
      location: "Mabe Village · Tail Cave revisit",
      rows: [
        ["key-return-bowwow", ["story"], "Bring BowWow home and stock up", "Return to Madam MeowMeow’s house in Mabe Village and speak to her with BowWow in tow. Buy the Shovel if you don’t already have it and pick up Bombs at the Town Tool Shop. Save at least six Bombs for the Key Cavern miniboss and bring extras for breakable walls and Pairodds. For the castle entrance you’ll also need Bananas. Follow the trading checklist from the Yoshi Doll through Sale’s trade if you haven’t already."],
        ["shell-tail-cave", ["shell","chest"], "Secret Seashell chest · Tail Cave return visit", "With Bombs, return to Tail Cave. Go north from the entrance to the floor-switch room, east to the Map room and north through its one-way door into the large hub. Follow the lower path to the west end, near the Mini-Moldorms and their 20-rupee chest. Bomb the cracked wall on the west side and open the chest in the hidden room.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-7-bomb-a-wall-in-the-tail-cave"] }],
        ["key-richard", ["story"], "Get Richard’s request for five Golden Leaves", "Leave Mabe Village to the east by lifting the rocks near the shop. From the Ukuku Prairie warp platform, follow the path south past the Key Cavern lock to Richard’s Villa by Pothole Field. Speak to Richard, then go east and north to the closed castle gate."],
      ],
    },
    {
      title: "The castle trade",
      location: "Kanalet Castle",
      rows: [
        ["trade-stick", ["trade"], "Stick", "Give Kiki the Bananas on the east side of Kanalet Castle. The monkeys build a bridge and leave a Stick. Pick it up before crossing."],
      ],
    },
    {
      title: "Recover all five Golden Leaves",
      location: "Kanalet Castle",
      rows: [
        ["key-castle-access", ["story"], "Cross Kiki’s bridge", "From the locked main gate, follow the outside of the castle east to Kiki. Give him your Bananas and pick up the Stick when the monkeys finish the bridge. Cross and follow the path north to a lone bush. Cut it, take the stairs underneath, and cross the side-view tunnel to emerge inside the castle grounds."],
        ["key-leaf-crow", ["story"], "Golden Leaf · crow in the tree", "Go around the grounds to the west side. Throw a nearby rock at the tree with the perched crow. When it swoops down, slash it and collect the leaf."],
        ["key-leaf-bomber", ["story"], "Golden Leaf · Mad Bomber", "On the east side of the grounds, the Mad Bomber pops up from a cluster of holes. Watch where he surfaces, get in a quick hit and move clear of the bomb. Collect the leaf when he falls."],
        ["key-leaf-guards", ["story"], "Golden Leaf · ground-floor guards", "Enter the castle from the courtyard. Pass the Anti-Fairy and go west to the guard room. Defeat every enemy there to reveal the leaf. Then go north and east and step on the switch to open the castle’s outside gate for the return trip."],
        ["key-leaf-darknut", ["story"], "Golden Leaf · hidden Darknut", "From the gate switch go west and upstairs. The upper wall has two cracked panels. Bomb the left panel and defeat the Darknut it releases. The right panel can be left intact."],
        ["key-leaf-trooper", ["story"], "Golden Leaf · Ball and Chain Trooper", "Go east, south and west from the cracked panels, then step outside onto the upper balcony. Re-enter by the other balcony doorway and throw a pot at the sealed north door. Let the soldier swing before darting in for a hit. Repeat and take the final leaf."],
      ],
    },
    {
      title: "Dig up the Slime Key",
      location: "Richard’s Villa · Pothole Field",
      rows: [
        ["key-slime", ["story"], "Use Richard’s passage and dig at the owl", "Return the leaves to Richard. Push the statue he steps away from and descend. The left fork leads to a Seashell chest in the collectible checklist. Take the right fork to the field and cut the bushes before each move to uncover the pits. Work around the field to the owl statue in the northwest and dig on the tile directly in front of it."],
        ["key-enter", ["story"], "Open Key Cavern and cross the lake", "Leave the field on the west side and use the Slime Key in the lock north of the villa. To reach the actual door, loop south around the villa, then take the path by the eastern shore of the lake. Use the Feather to hop west over the little islands to the open entrance."],
      ],
    },
    {
      title: "Power Bracelet detours",
      location: "Forest · Ukuku Prairie · Tal Tal Mountains",
      rows: [
        ["heart-forest-log", ["heart"], "Piece of Heart · Toadstool tunnel", "Bring the Power Bracelet back to the hollow log you crossed in Chapter 1. Enter from the south doorway in the toadstool clearing so you start in the room with the Heart Piece. Push the two highest blocks you can reach left, then push the two blocks in line with the first skull up. Lift the skulls to reach the Heart Piece in the northwest corner.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-8-push-blocks-and-throw-a-skull-mysterious-forest"] }],
        ["heart-prairie-blocks", ["heart"], "Piece of Heart · Prairie block cave", "Enter the cave in northwest Ukuku Prairie. Push the top-left block north and the next block right. Lift the skull. At the two blocks on the right, push the top one right and the lower one down, then lift the final skull.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-9-more-block-pushing-and-skull-throwing-ukuku-prairie"] }],
        ["heart-mansion", ["heart"], "Piece of Heart · 5 shells", "Enter the Seashell Mansion south of Kanalet Castle and step onto its meter with at least five Secret Seashells.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-10-collect-5-secret-seashells-seashell-mansion"] }],
        ["heart-pothole", ["heart"], "Piece of Heart · Pothole Field", "After giving Richard the leaves, reach the northeast of his field. Cut the bushes before attempting the jump. Return with the Pegasus Boots if you want an easier dash-jump across the gap.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-11-jump-the-pits-in-the-pothole-field-ukuku-prairie"] }],
        ["heart-tal-blocks", ["heart"], "Piece of Heart · First mountain cave", "North of Dampé’s Shack, lift the boulders outside the first cave. In the block room, break the upper crystal, push the block down and go down and back up the stairs to reset. Push the middle block of the three below the stairs down, then the left block left. Break the crystal and collect the piece.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-12-pushing-blocks-and-jumping-gaps-tal-tal-mountain-range"] }],
      ],
    },
    {
      title: "Shovel and bomb detours",
      location: "Koholint Prairie · Ukuku Prairie · Tal Tal Heights",
      rows: [
        ["shell-witch", ["shell"], "Secret Seashell · Below the Witch’s Hut", "From the Witch’s Hut go west, lift the boulder and descend. Cut the lone bush in the clearing and dig on the tile it occupied.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-6-dig-in-the-ring-of-lilypads-koholint-prairie"] }],
        ["shell-forest-chest", ["shell"], "Secret Seashell · Forest boulder chest", "In the southwest of the Mysterious Forest, lift the boulder that blocks the short path to the chest.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-11-lift-a-rock-to-access-a-chest-mysterious-forest"] }],
        ["shell-moblin-sign", ["shell"], "Secret Seashell · Tal Tal signpost", "Head north and east from the Moblin hideout. At the sign ringed by stones, lift the one on the east side.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-12-lift-up-a-rock-gopongo-swamp"] }],
        ["shell-prairie-skull", ["shell"], "Secret Seashell · Buried by the giant skull", "East of the Ukuku Prairie warp, bomb the giant stone skull blocking the path. Dig in the spot between the exposed small rocks.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-14-digging-by-a-hill-in-ukuku-prairie"] }],
        ["shell-rock-maze", ["shell"], "Secret Seashell · Stone enclosure", "Southwest of Seashell Mansion, enter the enclosure made of round-topped stones and lift the loose boulder inside.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-15-under-a-rock-south-central-ukuku-prairie"] }],
        ["shell-prairie-owl", ["shell"], "Secret Seashell · Prairie owl statue", "Enter the cave west of the stone enclosure, bomb the west wall, jump the gap and take the stairs. Work around the blocks and use the upper exit. Outside, dig immediately southwest of the owl statue.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-16-bomb-push-and-dig-in-the-cave-network-ukuku-prairie"] }],
        ["shell-bay-phone", ["shell"], "Secret Seashell · Bush by the bay", "Follow the path south from the prairie cave toward Martha’s Bay. Cut the bush east of the telephone booth on the south shore.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-17-look-under-a-bush-near-the-bay-marthars-bay"] }],
        ["shell-mansion-bush", ["shell"], "Secret Seashell · East of the Mansion", "Cut the bushes immediately east of Seashell Mansion. Check the faint warp marking nearby as well.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-18-look-under-a-bush-ukuku-prairieshell-mansion"] }],
        ["shell-richard", ["shell"], "Secret Seashell · Richard’s tunnel", "When Richard moves after receiving five Golden Leaves, go under his villa. Follow the left fork and jump to the chest.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-19-tunnel-under-richardrs-house-ukuku-prairie"] }],
        ["shell-keyroof", ["shell"], "Secret Seashell · Key Cavern roof", "Climb onto the hill above Key Cavern and dig in the center of the four patches of grass.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-20-dig-on-the-roof-of-the-key-cavern-ukuku-prairie"] }],
        ["shell-tal-bomb", ["shell"], "Secret Seashell · Tal Tal Heights bomb toss", "East of Dampé’s Shack, find the large hole beside the Tal Tal Heights warp. Throw a lit bomb into it and pick up the shell it ejects.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-21-throw-a-bomb-into-a-hole-tal-tal-heights"] }],
      ],
    },
    {
      title: "Shop, fairy and upgrades",
      location: "Mabe Village · Mysterious Forest · Ukuku Prairie",
      rows: [
        ["bombs", ["gear"], "Bombs", "After Bottle Grotto, buy a pack of 10 from the Town Tool Shop for 10 rupees. Bring them on your Tail Cave return and into bombable caves."],
        ["bow", ["gear"], "Bow & Arrow Set", "The Town Tool Shop sells the set for 980 rupees after you purchase the Shovel. Save up or return later. The purchase is safe for a deathless file."],
        ["medicine-tracy", ["gear"], "Secret Medicine · Crazy Tracy", "Lift the rocks on the approach to Crazy Tracy’s spa in Koholint Prairie. Talk to her and buy a dose. It automatically restores health when you would otherwise fall."],
        ["upgrade-powder", ["gear"], "Magic Powder capacity · 40", "In the center of the Mysterious Forest, west of the Great Fairy cave, lift the lone rock to find stairs. Sprinkle Powder on the altar and accept the Powder offer. Each of the three altars gives one upgrade, and you may decline offers to cycle them."],
        ["sensor", ["gear"], "Seashell Sensor · 15 shells", "Collect at least 15 shells, then stand on the meter in Seashell Mansion. The sensor chimes near hidden shells and can be toggled in the inventory."],
        ["fairy-prairie", ["fairy"], "Great Fairy · Ukuku Prairie", "Bomb the cracked wall on the north edge of the prairie, east of the village warp area, to enter the fountain cave."],
      ],
    },
    {
      title: "Return to the crane",
      location: "Mabe Village",
      rows: [
        ["fig-spiny", ["figure","mini"], "Spiny figure", "After Bottle Grotto, win Spiny once Goomba is on its stand. Place it on the table by the left-hand door of the large family house in northern Mabe Village."],
      ],
    },
    {
      title: "Island warp points",
      location: "Koholint Island",
      rows: [
        ["warp-ukuku", ["warp"], "Ukuku Prairie warp", "Step onto the visible warp pad immediately east of Mabe Village."],
        ["warp-dampe", ["warp"], "Dampé’s Shack warp", "Lift the boulder immediately north of the shack to reveal the warp."],
        ["warp-mansion", ["warp"], "Seashell Mansion warp", "Dig at the faint mark in the small dirt circle east of Seashell Mansion."],
      ],
    },
    {
      title: "Sweep the entrance and basement",
      location: "Key Cavern · first floor and four-door room",
      rows: [
        ["key-first-chest", ["chest","treasure"], "Small Key · Bombite corridor", "Throw a pot at the sealed north door from the entrance. In the next room, knock the Bombites away with your sword and duck into the other corridor until they explode. Clear any surviving enemies and open the chest."],
        ["key-gel-trap", ["chest","treasure"], "Green Gel · trap chest", "Take the right-hand path north and defeat the Green Zols to make a chest appear. Open it for the chest sweep and slash the Gel that jumps out. Continue north past the Stalfos to the stairs down."],
        ["key-basement-north", ["story"], "Unlock the north basement door and flip the crystal", "In the room with four locked doors, open the north one first. Defeat the two skeletons, collect the replacement Small Key and hit the crystal to lower the blue barriers. Return south and climb back to the upper floor."],
        ["key-beak", ["chest","treasure"], "Stone Beak", "At the top of the stairs from the four-door room, the lowered blue blocks now let you open the chest beside the stairway."],
        ["key-map", ["chest","treasure"], "Dungeon Map", "Go south twice to the trap-chest room, then east. Cross the lowered blue blocks, get past the Stalfos and Zol, and open the chest. Retrace the route to the four-door basement."],
        ["key-basement-west", ["story"], "Collect the loose Small Key · west basement door", "Unlock the west door. Keep clear of the conveyor edges, clear the Zol and attack the two Pairodds from a distance. Throw Bombs at their landing spots or shoot them if you have the Bow. Stay off the moving belts when throwing so the bombs don’t slide into the pit. Collect the loose key and return."],
        ["key-basement-south", ["story"], "Collect the loose Small Key · south basement door", "Unlock the south door. Clear the Zols on the belts, then use a pot on the Pairodd and defeat the remaining Stalfos. Pick up the key that appears in the northwest corner. Return to the four-door room."],
        ["key-zol-key", ["story"], "Take the east stairs and clear the Zols", "Unlock the east door and go up the stairs beyond the conveyor, watching for the Keese. On the floor above, circle the room and defeat all five Green Zols as they emerge. Pick up the Small Key before continuing north."],
      ],
    },
    {
      title: "Get the Boots and sweep the early rooms",
      location: "Key Cavern · upper loop and entrance",
      rows: [
        ["key-pairodd-key", ["story"], "Collect the loose Small Key · upper Pairodds", "From the Zol room go north, then west along the long room. Clear the Red Zols to unseal the doors and take the west exit. Use bombs or arrows against both Pairodds, clearing the little Zols as well. Take the loose key and go north through the one-way door."],
        ["key-rupees-50", ["chest","treasure"], "50 Rupees · raised walkway", "Clear the slimes and skeletons in the next room to spawn a chest above you. Go north, deal with the Bombites and Stalfos, and take the stairs on the east side onto the ledge. Follow the ledge south to the chest, then continue south and push the block out of the way. Take the north door to the miniboss."],
        ["key-dodongos", ["story"], "Defeat the Dodongo Snakes", "Place a bomb directly ahead of a snake while its mouth is open, then back away. Each snake needs to swallow three Bombs. Alternate targets after successful hits and collect the fairies they drop. A warp to the entrance opens when both are defeated."],
        ["key-boots", ["gear","chest"], "Pegasus Boots", "Go east after the Dodongos. Approach the chest from the right. Push the lower block left and then push the block directly above you up. Open the chest. Hold L to dash. Dash through the barriers on the south side, then push the block right to exit. Return to the Dodongo room to use its entrance warp."],
        ["key-vacuum-chest", ["chest","treasure"], "Small Key · Vacuum Mouth", "Go east from the dungeon entrance. Line up on the central path and dash into the Vacuum Mouth during its pause, keeping away from the surrounding pits. Open the chest it guarded."],
        ["key-rupees-300", ["chest","treasure"], "300 Rupees · split corridor", "Go north from the entrance and take the left path in the Bombite room. Dash through the barriers and kill the Red Zol at the end. Backtrack to the right-hand path, go north through the trap-chest room and then north again. Defeat both Stalfos on this side of the wall to spawn the chest. The lone Red Zol on the far side must also be dead."],
      ],
    },
    {
      title: "Break the wall and open the spiral",
      location: "Key Cavern · Nightmare wing",
      rows: [
        ["key-nightmare", ["chest","treasure"], "Nightmare Key", "Use the entrance warp to return to the Dodongo room, go south and take the northeast route. In the room with the arrow on the floor, bomb the wall the arrow points to between the torches. Go through the breach. Use a Boots dash and then Feather jump at the edge of the wide pit. Climb the stairs and repeat the dash-jump along the raised path to reach the chest."],
        ["key-compass", ["chest","treasure"], "Compass", "Drop off the ledge after the Nightmare Key and take the north door. Slash the chasing Bombites back and move away before the countdown reaches zero. Clear the room, go west and open the chest guarded by a Stalfos and Green Zols."],
        ["key-bombite-key", ["story"], "Collect the loose Small Key · three Bombites", "Bomb the west wall of the Compass room and go through the opening. Knock the three Bombites away and use the nook by the pots for cover. Pick up the dropped Small Key when all three are gone. With the basement side doors swept, you should have four Small Keys before entering the spiral."],
        ["key-spiral", ["story"], "Spend four keys and pass the red Thwomp", "Backtrack to the Dodongo room. On the south approach to that room, enter the enclosure with four locked blocks and open each in turn. Descend the stairs. In the side-view tunnel, dash into the red Thwomp from the upper platform to knock it down. Jump past the spikes and climb down the right ladder. Dash into the three Pairodds before they can teleport, then go west."],
        ["key-extra-small-key", ["story"], "Collect the spare Small Key · five Keese", "Defeat all five Keese in the conveyor room immediately before the Nightmare door to make the last loose Small Key drop. Key Cavern contains nine Small Keys and eight locks, so it’s normal to have this one left over after opening every lock."],
        ["key-slime-eye", ["story"], "Defeat Slime Eye", "Use the Nightmare Key, then dash into a wall to drop Slime Eye from the ceiling. Slash the eye until the two halves stretch apart and the link between them is thin. Dash through the link. When either half jumps, move out of its shadow and use the Feather as it lands to avoid the stun. Slash the eyes between jumps until both halves are defeated."],
        ["key-heart", ["container"], "Slime Eye’s Heart Container", "Pick up the full Heart Container from the boss room before continuing."],
        ["key-bell", ["instrument","story"], "Sea Lily’s Bell", "Go through the north door after Slime Eye and take the instrument."],
      ],
    },
    {
      title: "Dampé’s first heart and shell",
      location: "Dampé’s Shack",
      rows: [
        ["chamber-passage", ["challenge"], "A Passage Across", "After Key Cavern and Placing the Basics, add a matching pair of stair chambers to connect the separated cells. Check the stair link with Y. Put a single easy chest on the remote side so it gives the Nightmare Key."],
        ["chamber-hearts", ["challenge","heart","shell"], "Fill Up Your Hearts", "After A Passage Across, fill the heart outline. Connect the entrance to an easy chest and a familiar boss with a short central route. Fill the wings with side branches you can skip while playing. Completing tier one awards a Piece of Heart and a Secret Seashell.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-14-complete-lfill-up-your-heartsr-challenge-dampers-shack"] }],
        ["chamber-key-hunter", ["challenge"], "Key Hunter", "After A Passage Across, place chests on the marked tiles and use more chest rooms if needed. Start with a chest on an unlocked route so you can reach the first locked door with a key in hand."],
      ],
    },
  ],
} satisfies RawChapter;

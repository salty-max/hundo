import type { RawChapter } from "@hundo/core/types";

export default {
  id: 5,
  title: "Catfish’s Maw",
  region: "Tal Tal Heights · Martha’s Bay",
  teaser: "Catfish’s Maw",
  intro: "Put the Flippers to work, help an unexpected travelling companion, and track the skeleton that ran off with the dungeon’s treasure. Pack bombs before diving in.",
  sources: [
    ["Zelda Dungeon · Catfish’s Maw and the ghost", "https://www.zeldadungeon.net/links-awakening-walkthrough/catfishs-maw/"],
    ["ExtremePhobia · Catfish’s Maw", "https://gamefaqs.gamespot.com/switch/258622-the-legend-of-zelda-links-awakening/faqs/77938/level-5-the-catfish-maw"],
    ["Nintendo Life · Catfish’s Maw", "https://www.nintendolife.com/guides/zelda-links-awakening-catfishs-maw-map-compass-and-getting-the-hookshot"],
    ["Link’s Hideaway · Catfish’s Maw", "https://www.linkshideaway.com/links-awakening-switch-walkthrough/catfishs-maw/"],
  ],
  groups: [
    {
      title: "Songs, a visitor, and the underwater entrance",
      location: "Tal Tal Heights → Martha’s Bay",
      rows: [
        ["maw-manbo", ["song","warp"], "Learn Manbo’s Mambo", "Swim west from Angler’s Tunnel to the adjacent cave. Show Manbo the Ocarina and learn his song. It opens fast travel to activated warp points outdoors, including Manbo’s Pond, and returns you to the entrance inside dungeons."],
        ["maw-escort", ["story"], "Help the ghost visit its home and grave", "When the ghost joins you, take it to the lone house on the south coast at the west edge of Martha’s Bay, just east of Toronbo Shores. After its visit, use Manbo’s Pond as a shortcut to the solitary gravestone west of the main cemetery. Lift the rock on the path and approach the grave. The ghost leaves a Fairy Bottle."],
        ["maw-enter", ["story"], "Dive into Catfish’s Maw", "Swim out to the giant catfish head in Martha’s Bay. Dive by the gap in the rocks on its west side to enter a side-view tunnel. Swim right, surface, and walk into the open mouth."],
      ],
    },
    {
      title: "The last water trades",
      location: "Martha’s Bay",
      rows: [
        ["trade-necklace", ["trade"], "Mermaid’s Necklace", "Swim under the bridge in southeast Martha’s Bay to find a fisherman in a boat. Climb aboard, give him the Fishing Hook and take his catch."],
        ["trade-scale", ["trade"], "Mermaid’s Scale", "Swim to the mermaid northwest of Catfish’s Maw and return her Necklace. She gives you a Scale."],
      ],
    },
    {
      title: "Dive for heart pieces",
      location: "Tal Tal Heights · Kanalet Castle · Martha’s Bay",
      rows: [
        ["heart-flooded-tal", ["heart"], "Piece of Heart · Flooded mountain cave", "Swim east from the Angler’s Tunnel entrance into the neighboring cave. Dive with B where you see the piece under the surface.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-19-dive-in-a-flooded-cave-tal-tal-heights"] }],
        ["heart-moat", ["heart"], "Piece of Heart · Castle moat", "Swim around the moat toward the corner immediately west of Kanalet’s main bridge. Dive on the visible heart piece.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-20-dive-in-the-moat-kanalet-castle"] }],
        ["heart-village-tunnel", ["heart"], "Piece of Heart · Animal Village shortcut", "Go back through the underground tunnel between Ukuku Prairie and Animal Village. Dive in the patch of deep water near the black barriers.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-21-dive-in-the-tunnel-connecting-ukuku-prairie-and-animal-village"] }],
        ["heart-bay-tunnel", ["heart"], "Piece of Heart · Flooded bay tunnel", "At southwest Martha’s Bay, cut the bushes beyond the pits with a ranged attack or a jump-slash. Dash-jump across, descend, and dive in the side-view tunnel.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-22-jump-the-pits-and-dive-in-the-flooded-tunnel-marthars-bay"] }],
        ["heart-bay-water", ["heart"], "Piece of Heart · Southern bay", "Dive in the shallow-looking inlet south of the Mermaid Statue. This one is in the open water, separate from the tunnel piece.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-23-dive-in-the-southern-waters-marthars-bay"] }],
      ],
    },
    {
      title: "Swim and revisit for shells",
      location: "Kanalet Castle · Martha’s Bay · Animal Village · Mabe Village",
      rows: [
        ["shell-ghost", ["shell"], "Secret Seashell · House by the Bay", "On the ghost’s visit to the abandoned house on the shore, lift the pots in its lower-right corner. You can return after the escort if you missed it.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-13-smash-pots-in-the-abandoned-house-tornobo-shores"] }],
        ["shell-moat", ["shell"], "Secret Seashell · Moat waterfall", "From Tal Tal Heights descend into the north side of the castle moat. Swim west to the waterfall and dive where it hits the water.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-31-dive-below-a-waterfall-kanalet-castle"] }],
        ["shell-key-island", ["shell"], "Secret Seashell · Key Cavern lake islet", "Swim to the islet with a single bush in the lake east of Key Cavern. Cut the bush.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-34-check-under-a-bush-on-an-islet-near-the-key-cavern"] }],
        ["shell-south-island", ["shell"], "Secret Seashell · South shore islet", "From the bay’s telephone booth, swim south to the tiny island and cut its single bush.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-35-visit-an-islet-on-the-south-coast-southeast-marthars-bay"] }],
        ["shell-tal-water", ["shell"], "Secret Seashell · Upper mountain waterfall", "Cross the first mountain cave north of Dampé’s Shack and follow the upper path east. In the deeper pool above Angler’s Tunnel, dive at the base of the small waterfall.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-36-dive-in-a-waterfall-western-tal-tal-mountain-range"] }],
        ["shell-christine", ["shell"], "Secret Seashell · Christine’s thanks", "Once Mr. Write has accepted the letter, go back to Christine in Animal Village and talk to her again.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-33-return-to-christine-for-a-reward-animal-village"] }],
        ["shell-cheep", ["shell","mini"], "Secret Seashell · First Cheep Cheep", "After Angler’s Tunnel, look for the glow on the Mabe fishing pond. Reel in a red Cheep Cheep near the upper or middle part of the water. Leave and re-enter a building to refresh the spawn.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-37-fishing-hole-1-catch-a-cheep-cheep-mabe-village"] }],
      ],
    },
    {
      title: "Ghost and village returns",
      location: "Koholint Prairie · Mabe Village",
      rows: [
        ["bottle-ghost", ["bottle"], "Fairy Bottle · Ghost escort", "Take the ghost to the House by the Bay, then to its solitary grave west of the main cemetery, near the Witch’s Hut. The ghost leaves you a bottle."],
      ],
    },
    {
      title: "Carry more bombs",
      location: "Martha’s Bay",
      rows: [
        ["upgrade-bombs", ["gear"], "Bomb capacity · 60", "Go through the flooded side-view tunnel under the southwest bay and emerge in the isolated clearing. Descend the second stairs to the west and use Powder on the altar. Decline offers until you get the bomb upgrade if you still need it."],
      ],
    },
    {
      title: "Return to the crane",
      location: "Mabe Village",
      rows: [
        ["fig-cheep", ["figure","mini"], "Cheep Cheep figure", "After Angler’s Tunnel, win Cheep Cheep and place it on the table stand in Ulrira’s house near the telephone booth."],
      ],
    },
    {
      title: "Island warp points",
      location: "Koholint Island",
      rows: [
        ["warp-bay", ["warp"], "Martha’s Bay warp", "Dig on the faint ground marking just west of the Martha’s Bay telephone booth."],
      ],
    },
    {
      title: "Catfish’s Maw · compass, beak, and the stolen item",
      location: "Level 5",
      rows: [
        ["maw-compass", ["chest","treasure"], "Catfish’s Maw chest · Compass", "From the entrance go west twice. In the second room kill the four Keese and the Iron Mask to open the west door. Take that door, open the chest, and head down the stairs."],
        ["maw-drop-key", ["story"], "Solve the paired platforms and block square", "Stand on a hanging platform to raise its partner, then jump across before it sinks too far. In the four-platform section, the first raises the third and the second raises the fourth. At the far ladder, surface, defeat the four Stalfos, break the crystals, and push the two upper blocks inward to make a 2×2 square. Take the loose Small Key and return to the room with four Keese."],
        ["maw-beak", ["chest","treasure"], "Catfish’s Maw chest · Stone Beak", "Use the key on the north door. In the crystal-and-water room, go west and jump as you enter to avoid the blade traps. Defeat the Iron Masks to open the west door, then defeat the two Iron Masks inside to spawn the chest."],
        ["maw-stalfos-1", ["story"], "Master Stalfos · first encounter", "Go east twice to the crystal-and-water room, then north. Defeat the Stalfos to open the next north door. When Master Stalfos raises his sword and exposes his side, slash to collapse him, then drop a bomb by the bones. Repeat until he retreats."],
        ["maw-empty-chest", ["chest","treasure"], "Catfish’s Maw chest · Master Stalfos’s note", "Go east from the first fight, clear the Zols, and open the chest. Master Stalfos has already taken its contents. Continue north to the five-block junction."],
        ["maw-stalfos-2", ["story"], "Master Stalfos · second encounter", "Push the center block north and exit west. Re-enter from the west, push the center block east, and step on the north floor switch. Exit north and return to reset the blocks, then push the center block south and go east to the next duel. Use sword strikes and bombs again."],
        ["maw-stalfos-3", ["story"], "Master Stalfos · third encounter", "Return west to the junction, push the center block west, and take the north door. Jump the gap, cross the large dirt platform, and exit northwest. Shift a central pot and push a block to cross the divider. Clear the Zols on both sides to open the north door. Defeat Master Stalfos there."],
        ["maw-map", ["chest","treasure"], "Catfish’s Maw chest · Dungeon Map", "Go west from the third duel, break the pots, and clear the Stalfos. Open the chest. Use Manbo’s Mambo or backtrack to the entrance."],
        ["maw-hookshot", ["gear"], "Master Stalfos · fourth encounter and Hookshot", "Follow the west corridor back to the Compass and cross the hanging-platform tunnel. In the room where you made the block square, go west for the final sword-and-bomb duel. Take the Hookshot that Master Stalfos drops."],
      ],
    },
    {
      title: "Catfish’s Maw · sweep the Hookshot chests",
      location: "Level 5",
      rows: [
        ["maw-rupees-entrance", ["chest","treasure"], "Catfish’s Maw chest · 100 rupees near the entrance", "Return to the room with four Keese and an Iron Mask. Use its northeast doorway to reach the far side of the original corridor. Grapple to the chest across the gap, then grapple back to the wooden block."],
        ["maw-nightmare-key", ["chest","treasure"], "Catfish’s Maw chest · Nightmare Key", "At the five-block junction, push the center block north and go west, then northwest. Dive in the deep square at the center of the pool. Swim past the Bloopers and climb out at the far end. Hookshot the wooden handle from above to unfold a bridge and cross to the chest."],
        ["maw-rupees-platform", ["chest","treasure"], "Catfish’s Maw chest · 50 rupees on the island", "Swim back through the same tunnel, go south and east to the junction, then north. Reach the single-tile patch at the southeast using Roc’s Feather or grapple to its wooden block. Face north and grapple to the chest."],
        ["maw-key-east", ["chest","treasure"], "Catfish’s Maw chest · Small Key east of the island", "From the rupee platform take the east doorway. Grapple to the wooden block across the gap, open the chest, then grapple back from above the chest."],
        ["maw-rupees-bridge", ["chest","treasure"], "Catfish’s Maw chest · 50 rupees beyond a folding bridge", "Return west, walk north of the island chest, and grapple to the handle to extend the bridge. Cross and open the second rupee chest before returning to the entrance."],
        ["maw-key-northwest", ["chest","treasure"], "Catfish’s Maw chest · Small Key beyond the blade traps", "Retrace the west corridor, then go north to the crystal-and-water room. Go west into the blade-trap room, north to the laser statue, and west again. Grapple across the gaps to avoid the traps, kill the two Zols, and take the northwest door. Grapple to the chest."],
      ],
    },
    {
      title: "Catfish’s Maw · two eyes and an eel",
      location: "Level 5",
      rows: [
        ["maw-gohmas", ["story"], "Defeat the two Gohmas", "Grapple back to the laser-statue room and unfold the bridge to the northeast exit. Use a key on the locked block. When a Gohma opens its eye to fire, hit the eye with the Hookshot to stun it and close in with sword strikes. Move diagonally out of charging lanes. Take the fairy and exit northeast."],
        ["maw-eel", ["story"], "Defeat Slime Eel", "Descend the stairs, cross the tunnel, and Hookshot upward at the carved target to reach the exit ladder. Unlock the last key block, wrap around the wooden blocks, and grapple west to the Nightmare door. Inside, jump the sweeping tail. Shoot an open mouth with the Hookshot from across the room, then slash the glowing spot just behind the head. If you pull out a decoy, move clear and wait for the next opening."],
        ["maw-heart", ["container"], "Slime Eel · Heart Container", "Take the full Heart Container when the Slime Eel falls."],
        ["maw-marimba", ["instrument","story"], "Claim the Wind Marimba", "Go north from the boss arena and collect the instrument."],
      ],
    },
    {
      title: "Dampé’s bomb challenge",
      location: "Dampé’s Shack",
      rows: [
        ["chamber-bombs", ["challenge","effect"], "Bomb’s Away!", "After Angler’s Tunnel and Fill Up Your Hearts, fill the bomb shape. Keep the required chest and boss near the entrance on the route you’ll play. Connect the rest as side branches. Clearing it awards +Bombs."],
      ],
    },
  ],
} satisfies RawChapter;

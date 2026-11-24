import type { RawChapter } from "@hundo/core/types";

export default {
  id: 1,
  title: "Tail Cave",
  region: "Mabe Village · Mysterious Forest",
  teaser: "Tail Cave",
  intro: "Recover Link’s equipment, undo the forest’s trick and open the first dungeon. Make a village circuit for early hearts and a Fairy Bottle before facing Moldorm.",
  sources: [
    ["Link’s Hideaway · Switch route", "https://www.linkshideaway.com/links-awakening-switch-walkthrough/tail-cave/"],
    ["VGKAMI · Mysterious Forest screenshots", "https://vgkami.com/walkthrough/links-awakening/the-mysterious-forest/"],
    ["VGKAMI · Tail Cave room screenshots", "https://vgkami.com/walkthrough/links-awakening/level-1-tail-cave/"],
    ["Nintendo Life · Tail Cave", "https://www.nintendolife.com/guides/zelda-links-awakening-tail-cave-dungeon-and-roc-feather-location"],
  ],
  groups: [
    {
      title: "Recover your sword and shield",
      location: "Mabe Village → Toronbo Shores",
      rows: [
        ["shield", ["gear"], "Get the Shield from Tarin", "When Link wakes up, talk to Tarin inside the house. Hold R to block. You can also walk into certain enemies while blocking to push them aside."],
        ["sword", ["gear"], "Recover the Sword from the beach", "Leave the house, head west through the village and take the path south to Toronbo Shores. Follow the water east, pushing the Sea Urchins aside with your Shield. After the owl speaks, pull the Sword from the sand. Use B to slash or hold and release B for a spin attack."],
      ],
    },
    {
      title: "Village errands",
      location: "Mabe Village",
      rows: [
        ["heart-well", ["heart"], "Piece of Heart · Mabe well", "At the west edge of Mabe Village, cut the bushes on the raised bank and step off into the well. Pick up the heart piece and leave through the cave exit.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-5-jump-in-the-well-mabe-village"] }],
        ["heart-shop", ["heart"], "Piece of Heart · Town Tool Shop", "Buy the heart piece displayed in Mabe Village’s shop for 200 rupees. It can wait if you need the rupees for the Shovel.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-2-go-shopping-in-the-tool-shop-mabe-village"] }],
        ["shovel", ["gear"], "Deluxe Shovel", "Buy the Shovel for 200 rupees from the Town Tool Shop. Look for it after getting the Sword. It opens the digging stops on this route."],
        ["shell-mabe", ["shell"], "Secret Seashell · Mabe bush patch", "Cut the small bushes in the square field just north of the Trendy Game. The shell is near the middle.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-1-eastern-mabe-village"] }],
        ["shell-kennel", ["shell"], "Secret Seashell · CiaoCiao’s kennel", "Use the little door at the right of Madam MeowMeow’s house. Dig near the bottom-right corner of the kennel.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-3-dig-in-the-kennel-on-mrs-meow-meowrs-house-central-mabe-village"] }],
      ],
    },
    {
      title: "Trendy Game and the first trades",
      location: "Southeast Mabe Village · Toronbo Shores",
      rows: [
        ["trade-yoshi", ["trade","mini"], "Yoshi Doll", "Pay 10 rupees at the crane game. Move the claw forward, then right, using the on-screen prompts. Each direction gets one move. Line up with the center of the prize and watch it all the way to the collection chute."],
        ["heart-crane-1", ["heart","mini"], "Piece of Heart · First crane prize", "Win the stationary Piece of Heart at the Trendy Game. Take it from the collection area after the claw drops it.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-1-trendy-game-1-mabe-village"] }],
        ["trade-ribbon", ["trade"], "Ribbon", "Take the Yoshi Doll to Mamasha in the long family house at the north end of Mabe Village. She is holding a baby."],
        ["fig-ciao", ["figure","mini"], "CiaoCiao figure", "After delivering Yoshi to Mamasha, check the machine for CiaoCiao. Win it and put it on the kitchen-table stand inside Madam MeowMeow’s main house."],
        ["shell-crane-1", ["shell","mini"], "Secret Seashell · First crane prize", "Win the Yoshi Doll and first heart piece, then leave and re-enter to refresh the prizes. If the shell has not appeared, win and place CiaoCiao too.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-2-trendy-game-1-mabe-village"] }],
        ["trade-food", ["trade"], "Dog Food", "Give the Ribbon to CiaoCiao in the kennel beside Madam MeowMeow’s house."],
        ["trade-bananas", ["trade"], "Bananas", "Give the Dog Food to Sale, the crocodile in the beachside house on Toronbo Shores."],
      ],
    },
    {
      title: "Fishing Pond",
      location: "Northwest Mabe Village",
      rows: [
        ["lure-light", ["story"], "Fish with the Lightweight Lure", "Pay 10 rupees to fish at the pond. The Lightweight Lure is available from your first visit. Hold A to cast, then tap A to reel when the fish faces you. Ease off when it turns and pulls away."],
        ["heart-fish-1", ["heart","mini"], "Piece of Heart · First fish", "Land your first fish. A small orange Runt close to the surface is an easy target.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-3-catch-a-small-fish-mabe-village-fishing-hole"] }],
        ["lure-middle", ["lure","mini"], "Middleweight Lure", "Land your first green Lunker. This lure sinks more quickly and makes the bottle easier to reach."],
        ["heart-fish-2", ["heart","mini"], "Piece of Heart · Large fish", "Aim for one of the biggest green Lunkers swimming in the lower half of the pond to earn the second Piece of Heart.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-heart-pieces-map-and-locations#heart-piece-4-catch-a-large-fish-mabe-village-fishing-hole"] }],
        ["bottle-fishing", ["bottle","mini"], "Fairy Bottle · Pond floor", "Cast beyond the bottle in the lower-left weeds and let the lure sink. Reel it into the bottle and bring it up slowly. Catch nearby fish first if they keep knocking the bottle loose."],
      ],
    },
    {
      title: "Find the Tail Key",
      location: "Mysterious Forest · Witch’s Hut",
      rows: [
        ["tail-log-rupees", ["chest","treasure"], "Open the 50-rupee chest in the log cave", "Enter the forest from northwest Mabe Village. Just south of the raccoon’s clearing, take the narrow path east to the hollow log beside a sign. Inside, keep moving over the cracked floor and slash the purple crystals. Stand to the right of the rock in front of the chest and push it left to reach the chest."],
        ["tail-toadstool", ["story"], "Cross the log cave for the Sleepy Toadstool", "From the chest room, go north through the corridor, then west into the room of rocks. The Piece of Heart in the northwest corner is blocked by skulls. Come back with the Power Bracelet and check it off in Chapter 3 under Power Bracelet detours. For now, push the rock immediately to your left leftward, then push the rock below you down. Take the south exit and pick the toadstool to the left."],
        ["magic-powder", ["gear"], "Have the Witch make Magic Powder", "Return through the log cave and leave the forest to the northeast. You’ll pass a Piece of Heart surrounded by pits. The guide brings you back for it with Roc’s Feather in Chapter 2. Follow the prairie path southeast to the Witch’s Hut, give electrified enemies space, and hand over the toadstool. Equip the Magic Powder on X or Y."],
        ["tail-key", ["story"], "Break the raccoon’s spell and take the Tail Key", "Back in the forest, approach the raccoon from the south and sprinkle it with Magic Powder. Once the path stops sending you astray, go north from the clearing and open the chest."],
        ["tail-enter", ["story"], "Unlock Tail Cave", "Leave Mabe Village by its south path, take the east trail at the sign and turn south at the end. Use the Tail Key on the lock outside the entrance. This is a good point to finish the nearby village checklist and fill a Fairy Bottle if you have one."],
      ],
    },
    {
      title: "Forest and shore detours",
      location: "Mysterious Forest · Toronbo Shores",
      rows: [
        ["shell-flowers", ["shell"], "Secret Seashell · Blue flower ring", "In the central Mysterious Forest, dig in the center of the ring of blue flowers. You can do this as soon as you own the Shovel.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-4-dig-in-the-flower-circle-central-mysterious-forest"] }],
        ["shell-beach", ["shell"], "Secret Seashell · Beach alcove", "Follow Toronbo Shores toward its east end. In the enclosed sandy nook by the log, dig in the lower-left corner against the wall.", { map: ["Nintendo Life", "https://www.nintendolife.com/guides/zelda-links-awakening-all-secret-seashells-map-and-locations#shell-5-dig-in-the-corner-of-the-secluded-beach-eastern-tornobo-shores"] }],
        ["fairy-forest", ["fairy"], "Great Fairy · Mysterious Forest", "From the sign outside the toadstool log cave, take the path south and then east into the clearing. The fountain is at the north end. Use it to recover before the dungeon, and catch a small fairy if you have an empty bottle."],
      ],
    },
    {
      title: "Open the first doors",
      location: "Tail Cave · entrance and central hub",
      rows: [
        ["tail-loose-key-beetles", ["story"], "Knock the Hardhat Beetles into the pits", "Take the west exit from the entrance. Sword hits or a raised Shield knock the beetles back without injuring them. Push both into the gaps and pick up the Small Key they leave."],
        ["tail-compass", ["chest","treasure"], "Compass", "Go west again. Clear the four Green Zols around the chest while avoiding the corner statues’ fireballs, then open it. The Compass marks unopened chests on the map."],
        ["tail-key-switch", ["chest","treasure"], "Small Key · floor switch", "Backtrack east twice to the entrance and go north. Clear the Gel and knock the beetle into the pit. Step on the switch in the middle of the room to reveal the chest."],
        ["tail-map", ["chest","treasure"], "Dungeon Map", "Go east from the switch room. Defeat the Keese and both Stalfos. The skeletons retreat when you swing, so corner them. Open the chest and step through the one-way doorway in the north wall."],
        ["tail-beak", ["chest","treasure"], "Stone Beak", "On the lower side of the central hub, unlock the eastern door with a Small Key. Go north from the next room. Time a slash on each Three-of-a-Kind when it shows your chosen suit. All three must display the same suit to reveal the chest. If the three suits don’t match, the enemies start moving again so you can retry."],
        ["tail-key-spark", ["chest","treasure"], "Small Key · orbiting Spark", "Go south and west from the card room, back into the hub. Head west along the lower path to the chest with a Spark circling it. Wait until the Spark moves away, then open it."],
        ["tail-rupees-20", ["chest","treasure"], "20 Rupees · Mini-Moldorms", "Defeat both small yellow worms in the large hub to reveal the chest on the west side. The cracked west wall nearby hides a Secret Seashell chest. Chapter 3 brings you back with Bombs."],
      ],
    },
    {
      title: "Get the Feather and reach the boss",
      location: "Tail Cave · north wing and east wing",
      rows: [
        ["tail-feather", ["gear","chest"], "Roc’s Feather", "In the hub’s west side, unlock the north door beyond the Blade Trap. Follow the passage east and back west around the block walls. Push the leftmost block beside the owl statue to open the west door. Block the two Spiked Beetles to flip them, then slash their bellies to reveal stairs. Take the side-view tunnel left, climb out and bait the Blade Traps before walking past them to the chest. Equip the Feather on X or Y to jump."],
        ["tail-nightmare", ["chest","treasure"], "Nightmare Key", "Return through the side-view tunnel and take the east exit from the beetle room. Jump the gap south of the owl, then go south into the hub. Take the east route on the north side of the long row of blocks and go north. Jump the gap, spend your last Small Key on the lock block and follow the raised walkway west to the chest."],
        ["tail-rolling-bones", ["story"], "Defeat Rolling Bones", "Retrace your route to the hub’s lower-right locked door that leads toward the Stone Beak. Instead of going north to the card room, jump the gap to the east. Jump over Rolling Bones’ roller, slash the skeleton and repeat. Use the fairy it drops to heal or put it in your bottle."],
        ["tail-moldorm", ["story"], "Defeat Moldorm", "From Rolling Bones, go north past the Blade Traps. The stairs here lead to recovery hearts if you need them. Use the Nightmare Key on the north door. Keep away from the rim and wait for Moldorm’s tail to open before slashing it. Raise the Shield if it charges and let it pass. If it knocks you into the pit, climb back and try again."],
        ["tail-heart", ["container"], "Moldorm’s Heart Container", "Pick up the full Heart Container in the arena before taking the north exit."],
        ["tail-cello", ["instrument","story"], "Full Moon Cello", "Walk north into the reward room and take the instrument from its pedestal."],
      ],
    },
  ],
} satisfies RawChapter;

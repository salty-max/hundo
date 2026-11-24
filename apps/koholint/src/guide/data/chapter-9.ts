import type { RawChapter } from "@hundo/core/types";

export default {
  id: 9,
  title: "Wind Fish’s Egg",
  region: "Mabe Village · Mt. Tamaranch",
  teaser: "Wind Fish’s Egg",
  intro: "Read your file’s maze directions, gather supplies and face the final battle. Return to the cleared save for the last Trendy Game prize.",
  sources: [
    ["The Great Egg and postgame", "https://gamefaqs.gamespot.com/switch/258622-the-legend-of-zelda-links-awakening/faqs/77938/the-great-egg"],
    ["Egg maze and final fight", "https://www.nintendolife.com/guides/zelda-links-awakening-wind-fishrs-egg-maze-defeat-the-final-boss-and-the-color-dungeon"],
    ["Switch deathless ending and Secret Medicine", "https://gamefaqs.gamespot.com/switch/258622-the-legend-of-zelda-links-awakening/cheats"],
  ],
  groups: [
    {
      title: "Last shop Chamber Stones",
      location: "Mabe Village",
      rows: [
        ["stone-shop-4", ["stone"], "Shop Chamber Stone · 4 of 7", "After Turtle Rock, the shop adds four more stones. Pay 1,280 rupees for this one, then leave and return to refresh stock."],
        ["stone-shop-5", ["stone"], "Shop Chamber Stone · 5 of 7", "After Turtle Rock, the shop adds four more stones. Pay 1,280 rupees for this one, then leave and return to refresh stock."],
        ["stone-shop-6", ["stone"], "Shop Chamber Stone · 6 of 7", "After Turtle Rock, the shop adds four more stones. Pay 1,280 rupees for this one, then leave and return to refresh stock."],
        ["stone-shop-7", ["stone"], "Shop Chamber Stone · 7 of 7", "After Turtle Rock, the shop adds four more stones. Pay 1,280 rupees for this one, then leave and return to refresh stock."],
      ],
    },
    {
      title: "Read your route and open the Egg",
      location: "Mabe Village Library · Mt. Tamaranch",
      rows: [
        ["egg-book", ["story"], "Record the maze directions", "Finish the trading quest to obtain the Magnifying Lens. In the Mabe Village Library, read the dark book with the red emblem in the southeast corner. Write down or screenshot the arrow sequence. The sequence depends on your save file."],
        ["egg-open", ["story"], "Open the Wind Fish’s Egg", "Restock Magic Powder and arrows, bring the Magic Rod and refill your hearts. A bottled fairy can heal you when used from the item menu. Crazy Tracy’s Secret Medicine activates automatically at zero hearts and preserves a zero-Game-Over run. Climb the western ladder above Dampé’s Shack to Mt. Tamaranch, then play Ballad of the Wind Fish at the Egg with all eight instruments collected."],
        ["egg-maze", ["story"], "Follow your maze sequence", "Inside, head north, drop into the first large pit and go north again to the maze entrance. Take the exits in the order written in the library book until you reach a smaller pit. Drop into it when ready. There are no chests in the Egg."],
      ],
    },
    {
      title: "Shadow Nightmares",
      location: "Wind Fish’s Egg",
      rows: [
        ["egg-blob", ["story"], "Giant Shadow Zol", "Keep moving so the blob misses its landing. Sprinkle Magic Powder as soon as it touches down. Repeat for the next landings."],
        ["egg-agahnim", ["story"], "Shadow Agahnim", "Stand far enough away to read each cast. Swing the sword at the round orange-red shot to reflect it. Dodge the blue burst and move away from the diagonals where it splits."],
        ["egg-moldorm", ["story"], "Shadow Moldorm", "Circle the head and strike the tail. If you prefer space, fire the Magic Rod through the body when you can line up the tail."],
        ["egg-ganon", ["story"], "Shadow Ganon", "Keep moving to avoid the fiery bats. Wait until he throws the spinning trident, approach from the side away from it and land a charged sword spin while he is exposed. Move away before the trident returns."],
        ["egg-lanmola", ["story"], "Shadow Lanmola", "Give the fast snake-like shadow room to emerge. Fire the Magic Rod along its path from a safe position."],
        ["egg-dethl", ["story"], "Dethl", "Equip Roc’s Feather and the Bow or Boomerang. Jump over each sweeping arm and fire at the open eye when you have a clean shot. The arms speed up and start moving out of sync as the fight goes on, so let a shot pass if you need time to land safely."],
        ["egg-clear", ["story"], "Finish the story and save the clear", "Climb the staircase after the fight. Watch through the credits and accept the completion save. With zero recorded Game Overs, the bonus scene plays after the credits."],
      ],
    },
    {
      title: "Return after the credits",
      location: "Mabe Village",
      rows: [
        ["egg-reload", ["story"], "Reload the cleared save", "Continue from your completed file to revisit Koholint. The final Trendy Game figure can now appear once the earlier figures are collected and placed. Winning it completes the prize series, and you can still return for unfinished checklists."],
      ],
    },
    {
      title: "The final figures",
      location: "Mabe Village",
      rows: [
        ["fig-pokey", ["figure","mini"], "Pokey figure", "After Turtle Rock, win Pokey and place it on the floor stand by the dining table in the northwest corner of the large family house."],
        ["fig-bowwow", ["figure","mini"], "BowWow figure", "After the ending, accept the clear save and reload it. Win BowWow at the Trendy Game, then put it on the floor stand just left of the door inside Madam MeowMeow’s main house."],
        ["stone-figures", ["stone","effect","mini"], "Chamber Stone · Figure collection", "After winning and placing all ten figures, speak to the Trendy Game owner. Collect the stone and the permanent discount, then hand the stone to Dampé to obtain +Monsters."],
      ],
    },
    {
      title: "Dampé’s final starter challenge",
      location: "Dampé’s Shack",
      rows: [
        ["chamber-clock", ["challenge","container","effect"], "Ticking Clock", "After Turtle Rock and Sheathed Sword, clear the layout in five minutes. Use short, low-combat connections from the entrance to the chests and boss. Check the stairs in Arrange before starting. Finish all 12 starter challenges to earn the last Heart Container and +Wallmasters."],
      ],
    },
    {
      title: "Gold challenges · 300 rupees each",
      location: "Dampé’s Shack",
      rows: [
        ["chamber-forge", ["challenge"], "Forging a Sword", "Clear all 12 starters to unlock Gold. Fill the sword outline, working from the lower left toward its tip. Put compulsory rooms on one direct route and use the rest as side branches."],
        ["chamber-shield", ["challenge"], "Crafting a Shield", "Fill the shield outline. You have five hearts. Use low-risk rooms and choose a boss you can beat reliably. A fairy room on your route is a good place to recover."],
        ["chamber-bows", ["challenge"], "Bows > Swords", "The sword is disabled. Use the Bow or Boomerang on enemies, carry bombs for Facade, and leave out rooms that require a sword attack."],
        ["chamber-song", ["challenge"], "Dungeon Song", "Fill the Ocarina shape. Use single-exit rooms in the protruding cells and an uninterrupted path for the entrance, chests and Nightmare door."],
        ["chamber-hinox", ["challenge"], "House of the Hinox", "Clear within three minutes. Stick to the shortest valid route through the preset Hinox rooms and chest tiles. Use ranged damage where possible and avoid the grab."],
        ["chamber-square", ["challenge"], "Back to Square One", "Clear within five minutes. Inspect the stair links before the run, keep chest detours short, and choose a quickly defeated Nightmare."],
        ["chamber-hand", ["challenge"], "Need a Hand?", "The sword is disabled. Choose rooms you can clear with ranged gear, pots and bombs. Favor room puzzles whose switches can be hit from range."],
        ["chamber-zigzag", ["challenge"], "Zig-Zaggy", "Fill the winding outline with corner and straight passages that face the right way. Place the corner rooms first, then check that no doors face the edge of the grid."],
        ["chamber-all-stairs", ["challenge"], "Nothin’ but Stairs", "Fill the stair-heavy shape and use Y to check each paired connection. Adjust the distance between pairs if the editor links the wrong two rooms."],
        ["chamber-hoard", ["challenge"], "Treasure Hoard", "Use chest chambers on the marked spaces. Plan a continuous route to open them all and reach the Nightmare door last."],
        ["chamber-skull", ["challenge"], "Skull Arrangement", "Fill the large skull outline. Reserve your rare door configurations for the narrow spots, then connect the necessary chests and boss on a shorter route inside the outline."],
        ["chamber-supreme", ["challenge"], "The Supreme Shape", "Fill the last outline. Start with the entrance, boss and required tiles, then fit your straight, corner and dead-end rooms around that route."],
      ],
    },
    {
      title: "Island completion sweep",
      location: "Koholint Island",
      rows: [
        ["apple-red", ["explore"], "Eat a red Apple", "Dash into an apple-bearing tree with the Pegasus Boots. Pick up a red Apple that drops."],
        ["apple-green", ["explore"], "Eat a Green Apple", "Dash into apple-bearing trees and pick up a Green Apple when one drops. Check the trees in Mabe Village and around the prairie."],
        ["map-buildings", ["explore"], "Reveal the buildings on the map", "Open the island map and sweep each region for unrevealed houses and telephone booths. Visit each one so it appears on the map."],
        ["owl-overworld", ["explore"], "Read the overworld Owl Statues", "Use the owl markers on the island map. Interact with each overworld statue during your region sweep."],
        ["chambers-review", ["explore"], "Review new chamber panels", "Hand in all Chamber Stones, then scroll through the panels in Dampé’s Arrange editor and clear the new-item indicators."],
      ],
    },
    {
      title: "Optional amiibo panels",
      location: "Dampé’s Shack",
      rows: [
        ["amiibo-fairy", ["amiibo"], "Great Fairy’s Chamber", "Scan compatible, distinct Zelda series amiibo at Dampé’s shack until this bonus chamber is unlocked."],
        ["amiibo-moblin", ["amiibo"], "Moblin Chief’s Chamber", "Scan another compatible, distinct Zelda series amiibo at the shack."],
        ["amiibo-trooper", ["amiibo"], "Ball and Chain Trooper’s Chamber", "Scan another compatible, distinct Zelda series amiibo at the shack."],
        ["amiibo-winged", ["amiibo"], "Winged Item Chamber", "Scan another compatible, distinct Zelda series amiibo at the shack."],
        ["amiibo-armos", ["amiibo"], "Armos Knight’s Chamber", "Scan another compatible, distinct Zelda series amiibo at the shack."],
        ["amiibo-shadow", ["amiibo"], "Shadow Link Effect", "Scan the Link’s Awakening Link amiibo at Dampé’s shack to unlock +Shadow Link."],
      ],
    },
  ],
} satisfies RawChapter;

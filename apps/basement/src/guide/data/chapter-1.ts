import type { RawChapter } from "@hundo/core/types";

const WIKI = "https://bindingofisaacrebirth.wiki.gg/wiki/Achievements";
const ROUTE = "https://steamcommunity.com/sharedfiles/filedetails/?id=3712501774";
const CHALLENGES = "https://bindingofisaacrebirth.wiki.gg/wiki/Challenges";

export default {
  id: 1,
  title: "The Basement",
  region: "Basement · Caves · Depths",
  teaser: "The Basement",
  intro:
    "Every run starts in the Basement. Beat Mom, unlock the first characters along the way, and start the side tracks that take days: the dailies and the shop’s Donation Machine.",
  sources: [
    ["The secrets, with their conditions (wiki)", WIKI],
    ["The secrets on Steam", "https://steamcommunity.com/stats/250900/achievements"],
    ["A Dead God route for Repentance+ (Steam guide)", ROUTE],
    ["Item unlocks (Platinum God)", "https://tboi.com/repentance"],
  ],
  groups: [
    {
      title: "Beat Mom",
      location: "Basement · Caves · Depths",
      note: "Normal is enough for every unlock in chapters 1 to 8 but Bethany (chapter 2); you pick the difficulty as you start a run. Chapters 9 to 12 come back for each character’s completion marks, the boss marks on their note at the character select screen, and those need Hard. A Hard win gives the Normal mark too.",
      sources: [
        ["The secrets, with their conditions (wiki)", WIKI],
        ["Repentance+ and its item descriptions (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/The_Binding_of_Isaac:_Repentance%2B"],
        ["Completion marks (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Completion_Marks"],
      ],
      rows: [
        ["item-monstros-tooth", ["item", "secret"], "Unlock Monstro’s Tooth", "Clear Basement II, the second floor of the Basement."],
        ["item-lil-chubby", ["item", "secret"], "Unlock Lil’ Chubby", "Clear Caves II, the second floor of the Caves."],
        ["area-the-womb", ["area", "secret"], "Beat Mom for the first time", "Mom waits at the end of Depths II. Your first win over her opens the Womb, the chapter below, and unlocks the three rows after this one at the same moment."],
        ["area-the-harbingers", ["area", "secret"], "Unlock the Harbingers", "From that first Mom win, the Harbingers can turn up as the boss of a floor."],
        ["item-a-cube-of-meat", ["item", "secret"], "Unlock A Cube of Meat", "Also from the first Mom win."],
        ["feat-item-descriptions", ["feat", "secret"], "Unlock Item Descriptions", "Also from the first Mom win, on Repentance+ only: item descriptions join the game’s options."],
        ["item-the-book-of-revelations", ["item", "secret"], "Unlock The Book of Revelations", "Beat any one of the Harbingers, once they appear as a floor’s boss."],
      ],
    },
    {
      title: "The first characters",
      note: "Each of these comes from something you do inside a run, with any character, so watch for them from your first run on. Advice: the record route, a Dead God speedrun route translated on Steam (in the sources) that this guide’s advice follows, takes Azazel in its very first run and plays him for many early wins after.",
      sources: [
        ["Every character and how to unlock them (Game Rant)", "https://gamerant.com/binding-isaac-unlock-every-character/"],
        ["A Dead God route for Repentance+ (Steam guide)", ROUTE],
        ["Devil Room (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Devil_Room"],
      ],
      rows: [
        ["character-azazel", ["character", "secret"], "Unlock Azazel", "Take three Devil Room deals in one run. A Devil Room can open in a floor’s boss room once the boss is down, and its deals trade health for items. Azazel flies, and fires a short beam instead of tears."],
        ["character-magdalene", ["character", "secret"], "Unlock Magdalene", "Hold 7 or more red heart containers at the same time: take every health-up you find in a run."],
        ["character-cain", ["character", "secret"], "Unlock Cain", "Hold 55 coins at the same time."],
        ["character-lazarus", ["character", "secret"], "Unlock Lazarus", "Hold 4 or more soul hearts at the same time. Black hearts count too."],
        ["character-eve", ["character", "secret"], "Unlock Eve", "Go two floors in a row without picking up a single heart."],
        ["character-samson", ["character", "secret"], "Unlock Samson", "Clear two floors in a row without taking any damage."],
      ],
    },
    {
      title: "Challenges open from the start",
      note: "A challenge is a set run, picked from Challenges in the main menu: one character, set items, one goal. A win unlocks the challenge’s own reward and nothing else, and no other secret can come from it. Advice: the record route plays Head Trauma, It’s in the Cards, Waka Waka and The Host straight after its first run, and saves Ehwaz for going down to Sheol after Mom’s Heart (chapter 3).",
      sources: [
        ["Challenges (wiki)", CHALLENGES],
        ["A Dead God route for Repentance+ (Steam guide)", ROUTE],
      ],
      rows: [
        ["pickup-rune-of-ehwaz", ["pickup", "secret"], "Unlock Rune of Ehwaz", "Challenge #3, Head Trauma: Isaac with Tiny Planet, Soy Milk, Iron Bar and The Small Rock. Beat Mom."],
        ["item-smb-super-fan", ["item", "secret"], "Unlock SMB Super Fan", "Challenge #14, It’s in the Cards: Isaac with Starter Deck, Deck of Cards, 9 Volt, The Battery and two random tarot cards. Beat Mom."],
        ["item-deaths-touch", ["item", "secret"], "Unlock Death’s Touch", "Challenge #17, Waka Waka: Isaac with Strange Attractor and Anti-Gravity. Beat Mom."],
        ["item-technology-5", ["item", "secret"], "Unlock Technology .5", "Challenge #18, The Host: Isaac with The Mulligan, Spiderbaby and the Tick. Beat Mom."],
        ["pickup-rune-of-hagalaz", ["pickup", "secret"], "Unlock Rune of Hagalaz", "Challenge #1, Pitch Black: Isaac with no items. Beat Mom."],
        ["pickup-rune-of-jera", ["pickup", "secret"], "Unlock Rune of Jera", "Challenge #2, High Brow: Isaac with Butt Bombs, Number One, E. Coli, Flush! and Petrified Poop. Beat Mom."],
        ["pickup-card-against-humanity", ["pickup", "secret"], "Unlock Card Against Humanity", "Challenge #12, When Life Gives You Lemons: Isaac with Lemon Mishap, Habit, 9 Volt and Lemon Party. Beat Mom."],
        ["trinket-burnt-penny", ["trinket", "secret"], "Unlock Burnt Penny", "Challenge #13, Beans!: Isaac with Butt Bombs, Pyro, The Black Bean, The Bean and 9 Volt. Beat Mom."],
        ["trinket-swallowed-penny", ["trinket", "secret"], "Unlock Swallowed Penny", "Challenge #15, Slow Roll: Isaac with Polyphemus, Cupid’s Arrow and My Reflection. Beat Mom."],
        ["item-robo-baby-20", ["item", "secret"], "Unlock Robo-Baby 2.0", "Challenge #16, Computer Savvy: Isaac with Technology, Technology 2 and Spoon Bender. Beat Mom."],
        ["item-dirty-mind", ["item", "secret"], "Unlock Dirty Mind", "Challenge #36, Scat Man: Isaac with The Poop, Skatole, three Butt Bombs, 9 Volt, BFFS!, Thunder Thighs, Dirty Mind and Mysterious Candy. Beat Mom."],
      ],
    },
    {
      title: "Challenges Mom opens",
      note: "Your first Mom win opens seven challenges at once. Each row that opens one comes before the row for winning it. Their goal is Mom’s Heart, at the end of Womb II, which chapter 2 is about.",
      sources: [
        ["Challenges (wiki)", CHALLENGES],
        ["The secrets, with their conditions (wiki)", WIKI],
      ],
      rows: [
        ["challenge-purist", ["challenge", "secret"], "Open the challenge Purist", "Opened by your first Mom win."],
        ["pickup-rune-of-berkano", ["pickup", "secret"], "Unlock Rune of Berkano", "Challenge #20, Purist: Isaac with no items. Beat Mom’s Heart."],
        ["challenge-xxxxxxxxl", ["challenge", "secret"], "Open the challenge XXXXXXXXL", "Opened by your first Mom win."],
        ["pickup-gold-heart", ["pickup", "secret"], "Unlock Gold Heart", "Challenge #21, XXXXXXXXL: Isaac, every floor the size of one under Curse of the Labyrinth. Beat Mom’s Heart."],
        ["challenge-speed", ["challenge", "secret"], "Open the challenge SPEED!", "Opened by your first Mom win."],
        ["pickup-get-out-of-jail-free-card", ["pickup", "secret"], "Unlock Get out of Jail Free Card", "Challenge #22, SPEED!: Isaac, with everything sped up. Beat Mom’s Heart."],
        ["challenge-have-a-heart", ["challenge", "secret"], "Open the challenge Have a Heart", "Opened by your first Mom win."],
        ["pickup-pills-have-a-heart", ["pickup", "secret"], "Unlock 2 new pills", "Challenge #25, Have a Heart: Isaac with Charm of the Vampire, red hearts turned into coins. Beat Mom’s Heart."],
        ["challenge-pride-day", ["challenge", "secret"], "Open the challenge PRIDE DAY!", "Opened by your first Mom win."],
        ["item-d8", ["item", "secret"], "Unlock D8", "Challenge #28, PRIDE DAY!: Isaac with Rainbow Baby, 3 Dollar Bill and Rainbow Worm. Beat Mom’s Heart."],
        ["challenge-the-guardian", ["challenge", "secret"], "Open the challenge The Guardian", "Opened by your first Mom win."],
        ["pickup-blank-rune", ["pickup", "secret"], "Unlock Blank Rune", "Challenge #30, The Guardian: Isaac with Punching Bag, Isaac’s Heart, Holy Grail and Spear of Destiny. Beat Mom’s Heart."],
        ["challenge-aprils-fool", ["challenge", "secret"], "Open the challenge Aprils Fool", "Opened by your first Mom win."],
        ["start-maggy-now-holds-a-pill", ["start", "secret"], "Unlock Maggy Now Holds a Pill!", "Challenge #32, Aprils Fool: Isaac, every floor’s boss the Bloat and every pickup shown as something else. Beat Mom’s Heart. From then on Magdalene starts with a pill."],
      ],
    },
    {
      title: "Challenges that open along the way",
      note: "These three open from things you do in an ordinary run: the first two at the same moment as Magdalene.",
      sources: [
        ["Challenges (wiki)", CHALLENGES],
        ["The secrets, with their conditions (wiki)", WIKI],
      ],
      rows: [
        ["challenge-the-tank", ["challenge", "secret"], "Open the challenge The Tank", "Opened by holding 7 red heart containers at once, as for Magdalene."],
        ["pickup-rune-of-ansuz", ["pickup", "secret"], "Unlock Rune of Ansuz", "Challenge #5, The Tank: Magdalene with Thunder Thighs, Bucket of Lard and Infamy. Beat Mom."],
        ["challenge-cursed", ["challenge", "secret"], "Open the challenge Cursed!", "Opened by holding 7 red heart containers at once, as for Magdalene."],
        ["pickup-credit-card", ["pickup", "secret"], "Unlock Credit Card", "Challenge #10, Cursed!: Magdalene with Treasure Map, The Compass, Blue Map, Raw Liver and Child’s Heart. Beat Mom."],
        ["challenge-cat-got-your-tongue", ["challenge", "secret"], "Open the challenge Cat Got Your Tongue", "Opened by turning into Guppy: three Guppy items in one run."],
        ["pickup-rune-of-algiz", ["pickup", "secret"], "Unlock Rune of Algiz", "Challenge #8, Cat Got Your Tongue: Isaac with Guppy’s Tail, Guppy’s Head and Guppy’s Hairball. Beat Mom."],
      ],
    },
    {
      title: "Running in the background",
      note: "These take days or many runs, so start them now and let them run under everything else. A Daily Run can be played once a day, on one save file. The shop’s Donation Machine keeps its total from run to run.",
      sources: [
        ["Daily Challenges (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Daily_Challenges"],
        ["A Dead God route for Repentance+ (Steam guide)", ROUTE],
        ["The secrets, with their conditions (wiki)", WIKI],
      ],
      rows: [
        ["trinket-the-marathon", ["trinket", "secret"], "Unlock The Marathon", "Win five Daily Runs in a row. The days needn’t follow each other, but a daily you start must be finished: leaving one breaks the streak."],
        ["item-broken-modem", ["item", "secret"], "Unlock Broken Modem", "Win 7 Daily Runs in all, the streak’s five included. One source gives 30 on consoles."],
        ["pickup-dedication", ["pickup", "secret"], "Unlock Dedication", "Take part in 31 Daily Runs, on any days. A daily counts even if you die in its first room, so once the wins are in, the rest can be quick."],
        ["pickup-hat-trick", ["pickup", "secret"], "Unlock Hat trick!", "Win three runs in a row."],
        ["pickup-mr-resetter", ["pickup", "secret"], "Unlock Mr. Resetter!", "Restart a run seven times in a row. On Switch and PS4, get a streak of minus 10 instead."],
        ["trinket-wooden-cross", ["trinket", "secret"], "Unlock Wooden Cross", "Sleep in a bed."],
        ["donation-blue-map", ["donation", "secret"], "Unlock Blue Map", "Put 10 coins in all into the Donation Machine in shops."],
        ["donation-store-upgrade-lv1", ["donation", "secret"], "Unlock Store Upgrade lv.1", "Reach 20 coins in the Donation Machine."],
        ["donation-theres-options", ["donation", "secret"], "Unlock There’s Options", "Reach 50 coins in the Donation Machine."],
        ["donation-store-upgrade-lv2", ["donation", "secret"], "Unlock Store Upgrade lv.2", "Reach 100 coins in the Donation Machine."],
        ["donation-black-candle", ["donation", "secret"], "Unlock Black Candle", "Reach 150 coins in the Donation Machine."],
        ["donation-store-upgrade-lv3", ["donation", "secret"], "Unlock Store Upgrade lv.3", "Reach 200 coins in the Donation Machine."],
        ["donation-red-candle", ["donation", "secret"], "Unlock Red Candle", "Reach 400 coins in the Donation Machine."],
        ["donation-store-upgrade-lv4", ["donation", "secret"], "Unlock Store Upgrade lv.4", "Reach 600 coins in the Donation Machine."],
        ["donation-blue-candle", ["donation", "secret"], "Unlock Blue Candle", "Reach 900 coins in the Donation Machine."],
        ["donation-stop-watch", ["donation", "secret"], "Unlock Stop Watch", "Reach 999 coins in the Donation Machine."],
        ["donation-blood-bag", ["donation", "secret"], "Unlock Blood Bag", "Use a Blood Donation Machine, a different machine from the shop’s, 30 times in all, across runs."],
      ],
    },
  ],
} satisfies RawChapter;

import type { RawChapter } from "@hundo/core/types";

const WIKI = "https://bindingofisaacrebirth.wiki.gg/wiki/Achievements";
const WG = "https://bindingofisaacrebirth.wiki.gg/wiki/";
const ROUTE = "https://steamcommunity.com/sharedfiles/filedetails/?id=3712501774";
const MACHINE = WG + "Greed_Donation_Machine";

export default {
  id: 6,
  title: "Greed",
  region: "Greed mode",
  teaser: "Greed mode",
  intro: "Greed mode is a different game: floors of waves around one arena, a shop on every floor, and Ultra Greed at the end. Its donation machine counts every coin across your runs, up to Greedier and Keeper.",
  sources: [
    ["The secrets, with their conditions (wiki)", WIKI],
    ["Greed mode (wiki)", WG + "Greed_Mode"],
    ["The Greed Donation Machine (wiki)", MACHINE],
    ["A Dead God route for Repentance+ (Steam guide)", ROUTE],
  ],
  groups: [
    {
      title: "Greed mode",
      location: "Greed mode",
      note: "Greed mode has seven floors. On each of the first six, pressing the button in the arena starts the waves of enemies and coins; the seventh holds Ultra Greed. Advice: the record route plays its first Greed run as Azazel, for Lilith.",
      sources: [
        ["Greed mode (wiki)", WG + "Greed_Mode"],
        ["A Dead God route for Repentance+ (Steam guide)", ROUTE],
      ],
      rows: [
        ["character-lilith", ["character", "secret"], "Unlock Lilith", "Beat Ultra Greed as Azazel."],
        ["route-greed-machine", ["route"], "Feed the Greed Donation Machine at the end of every Greed run", "The Greed Donation Machine, a different machine from chapter 1’s shop one, appears after every Ultra Greed fight and keeps its total from run to run. Put every coin you have left into it. The machine can jam: each character has a jam chance of its own that rises as that character donates, and beating Ultra Greed unjams it, so spreading donations across characters jams it less often. Advice: the record route plans six Greed runs at 84 coins or more each to reach 500."],
      ],
    },
    {
      title: "The Greed Donation Machine",
      location: "Greed mode",
      note: "Each row is a total across all your Greed runs.",
      sources: [
        ["The Greed Donation Machine (wiki)", MACHINE],
        ["The secrets, with their conditions (wiki)", WIKI],
        ["Keeper (wiki)", WG + "Keeper"],
        ["The Lost (wiki)", WG + "The_Lost"],
      ],
      rows: [
        ["donation-lucky-pennies", ["donation", "secret"], "Unlock Lucky Pennies", "Reach 2 coins in the Greed Donation Machine."],
        ["donation-special-hanging-shopkeepers", ["donation", "secret"], "Unlock Special Hanging Shopkeepers", "Reach 14 coins."],
        ["donation-wooden-nickel", ["donation", "secret"], "Unlock Wooden Nickel", "Reach 33 coins."],
        ["donation-cain-holds-paperclip", ["donation", "secret"], "Unlock Cain holds Paperclip", "Reach 68 coins: Cain then starts with the Paper Clip."],
        ["donation-everything-is-terrible-2", ["donation", "secret"], "Unlock Everything is Terrible 2!!!", "Reach 111 coins: Greed mode gets harder."],
        ["donation-special-shopkeepers", ["donation", "secret"], "Unlock Special Shopkeepers", "Reach 234 coins."],
        ["donation-eve-now-holds-razor-blade", ["donation", "secret"], "Unlock Eve now holds Razor Blade", "Reach 439 coins: Eve then starts with the Razor Blade, once beating Satan as Eve has unlocked it."],
        ["donation-greedier", ["donation", "secret"], "Unlock Greedier!", "Reach 500 coins: Greedier, the harder Greed mode, opens. Its final boss is Ultra Greedier."],
        ["donation-store-key", ["donation", "secret"], "Unlock Store Key", "Reach 666 coins."],
        ["donation-lost-holds-holy-mantle", ["donation", "secret"], "Unlock Lost holds Holy Mantle", "Reach 879 coins: from then on the Lost starts every run with the Holy Mantle’s shield, which the pause menu doesn’t show."],
        ["donation-generosity", ["donation", "secret"], "Unlock Generosity", "Reach 999 coins."],
        ["character-keeper", ["character", "secret"], "Unlock Keeper", "Reach 1,000 coins. Keeper’s health is coin hearts: every heart he finds turns into blue flies, except gold hearts, which turn into coins."],
      ],
    },
  ],
} satisfies RawChapter;

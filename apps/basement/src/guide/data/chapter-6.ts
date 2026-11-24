import type { RawChapter } from "@hundo/core/types";

export default {
  id: 6,
  title: "Greed",
  region: "Greed mode",
  teaser: "Greed mode",
  intro: "Greed mode, and the machine that remembers every coin.",
  sources: [["The secrets, with their conditions (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Achievements"], ["The secrets on Steam", "https://steamcommunity.com/stats/250900/achievements"], ["A Dead God route for Repentance+ (Steam guide)", "https://steamcommunity.com/sharedfiles/filedetails/?id=3712501774"]],
  groups: [
    {
      title: "Setting up the run",
      rows: [
        ["route-greed-machine", ["route"], "Feed the Greed Donation Machine after every Greed run", "At the end of every Greed run, put every coin you have left into the Greed Donation Machine: its total carries over."],
      ],
    },
    {
      title: "Characters",
      rows: [
        ["character-lilith", ["character", "secret"], "Unlock Lilith", "Beat Ultra Greed as Azazel. Either difficulty."],
        ["character-keeper", ["character", "secret"], "Unlock Keeper", "Donate 1000 Coins to the Greed Donation Machine."],
      ],
    },
    {
      title: "Donation machines",
      rows: [
        ["donation-lucky-pennies", ["donation", "secret"], "Unlock Lucky Pennies", "Donate 2 Coins to the Greed Donation Machine."],
        ["donation-special-hanging-shopkeepers", ["donation", "secret"], "Unlock Special Hanging Shopkeepers", "Donate 14 Coins to the Greed Donation Machine."],
        ["donation-wooden-nickel", ["donation", "secret"], "Unlock Wooden Nickel", "Donate 33 Coins to the Greed Donation Machine."],
        ["donation-cain-holds-paperclip", ["donation", "secret"], "Unlock Cain holds Paperclip", "Donate 68 Coins to the Greed Donation Machine."],
        ["donation-everything-is-terrible-2", ["donation", "secret"], "Unlock Everything is Terrible 2!!!", "Donate 111 Coins to the Greed Donation Machine."],
        ["donation-special-shopkeepers", ["donation", "secret"], "Unlock Special Shopkeepers", "Donate 234 Coins to the Greed Donation Machine."],
        ["donation-eve-now-holds-razor-blade", ["donation", "secret"], "Unlock Eve now holds Razor Blade", "Donate 439 Coins to the Greed Donation Machine."],
        ["donation-greedier", ["donation", "secret"], "Unlock Greedier!", "Donate 500 Coins to the Greed Donation Machine."],
        ["donation-store-key", ["donation", "secret"], "Unlock Store Key", "Donate 666 Coins to the Greed Donation Machine."],
        ["donation-lost-holds-holy-mantle", ["donation", "secret"], "Unlock Lost holds Holy Mantle", "Donate 879 Coins to the Greed Donation Machine."],
        ["donation-generosity", ["donation", "secret"], "Unlock Generosity", "Donate 999 Coins to the Greed Donation Machine."],
      ],
    },
  ],
} satisfies RawChapter;

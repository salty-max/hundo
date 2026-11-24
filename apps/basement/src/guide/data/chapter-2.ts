import type { RawChapter } from "@hundo/core/types";

const WIKI = "https://bindingofisaacrebirth.wiki.gg/wiki/Achievements";
const ROUTE = "https://steamcommunity.com/sharedfiles/filedetails/?id=3712501774";
const CHALLENGES = "https://bindingofisaacrebirth.wiki.gg/wiki/Challenges";

export default {
  id: 2,
  title: "The Womb",
  region: "The Womb",
  teaser: "The Womb",
  intro: "Mom’s Heart, again and again. Every win counts toward the next unlock, and the eleventh turns her into It Lives! for good.",
  sources: [
    ["The secrets, with their conditions (wiki)", WIKI],
    ["It Lives! (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/It_Lives!"],
    ["A Dead God route for Repentance+ (Steam guide)", ROUTE],
    ["Item unlocks (Platinum God)", "https://tboi.com/repentance"],
  ],
  groups: [
    {
      title: "Mom’s Heart, win after win",
      location: "Womb",
      note: "Mom’s Heart waits at the end of Womb II. Every win counts, on either difficulty, so keep a tally: the unlocks below come at 2, 3, 4 and on up to 11 wins, and later ones at 16, 21 and 30 (chapter 13). After a win, an Angel Room holding a beam of light, or a Devil Room holding a trapdoor, can appear: the beam takes you up to the Cathedral and the trapdoor down to Sheol, where wins over Isaac and Satan already count toward chapter 3. An Angel Room is the Devil Room’s holy twin, with free items.",
      sources: [
        ["The secrets, with their conditions (wiki)", WIKI],
        ["Cathedral (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Cathedral"],
        ["Sheol (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Sheol"],
        ["Every character and how to unlock them (Game Rant)", "https://gamerant.com/binding-isaac-unlock-every-character/"],
        ["Angel Room (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Angel_Room"],
      ],
      rows: [
        ["character-eden", ["character", "secret"], "Unlock Eden", "Your first Mom’s Heart win, at the end of Womb II, unlocks Eden, who starts every run with random items."],
        ["item-rubber-cement", ["item", "secret"], "Unlock Rubber Cement", "Win against Mom’s Heart twice."],
        ["item-a-noose", ["item", "secret"], "Unlock A Noose", "Win against Mom’s Heart 3 times."],
        ["item-wire-coat-hanger", ["item", "secret"], "Unlock Wire Coat Hanger", "Win against Mom’s Heart 4 times."],
        ["item-everything-is-terrible", ["item", "secret"], "Unlock Everything Is Terrible!!!", "Win against Mom’s Heart 5 times."],
        ["item-ipecac", ["item", "secret"], "Unlock Ipecac", "Win against Mom’s Heart 6 times."],
        ["item-experimental-treatment", ["item", "secret"], "Unlock Experimental Treatment", "Win against Mom’s Heart 7 times."],
        ["item-a-quarter", ["item", "secret"], "Unlock A Quarter", "Win against Mom’s Heart 8 times."],
        ["item-a-fetus-in-a-jar", ["item", "secret"], "Unlock A Fetus in a Jar", "Win against Mom’s Heart 9 times."],
        ["character-blue-baby", ["character", "secret"], "Unlock ???", "Win against Mom’s Heart 10 times. ??? starts with soul hearts instead of red ones."],
        ["area-blue-womb", ["area", "secret"], "Open the Blue Womb", "The same tenth win opens the Blue Womb, a floor reached by beating Mom’s Heart fast enough. Chapter 5 covers the timer."],
        ["area-it-lives", ["area", "secret"], "Unlock It Lives!", "Your eleventh win. From then on It Lives! takes Mom’s Heart’s place, and beating it always leaves both a way up to the Cathedral and a way down to Sheol."],
        ["area-burning-basement", ["area", "secret"], "Unlock the Burning Basement", "Also at eleven wins: the Basement can now come up as its burning version."],
      ],
    },
    {
      title: "Bethany, on Hard",
      location: "Womb",
      note: "Advice: the record route plays this as its own careful run and stops after the Hard win. Going on as Lazarus to Boss Rush or to Isaac in the Cathedral would unlock Missing No. and Lazarus’ Rags early, and the Rags then crowd the Angel Room’s items for many runs. Both come back in Lazarus’s Hard note (chapter 9).",
      sources: [
        ["A Dead God route for Repentance+ (Steam guide)", ROUTE],
        ["Completion marks (wiki)", "https://bindingofisaacrebirth.wiki.gg/wiki/Completion_Marks"],
      ],
      rows: [
        ["character-bethany", ["character", "secret"], "Unlock Bethany", "Beat Mom’s Heart or It Lives! on Hard as Lazarus without dying once in the run. Lazarus’s spare life counts as a death: Lazarus Risen can’t unlock her."],
      ],
    },
    {
      title: "Challenges the wins open",
      note: "Each row that opens a challenge comes before the row for winning it.",
      sources: [
        ["Challenges (wiki)", CHALLENGES],
        ["The secrets, with their conditions (wiki)", WIKI],
      ],
      rows: [
        ["challenge-solar-system", ["challenge", "secret"], "Open the challenge Solar System", "Opened by your third Mom’s Heart win."],
        ["pickup-rune-of-perthro", ["pickup", "secret"], "Unlock Rune of Perthro", "Challenge #6, Solar System: Isaac with Distant Admiration, Forever Alone, Halo of Flies and Transcendence. Beat Mom’s Heart."],
        ["challenge-demo-man", ["challenge", "secret"], "Open the challenge Demo Man", "Opened by your ninth Mom’s Heart win."],
        ["pickup-chaos-card", ["pickup", "secret"], "Unlock Chaos Card", "Challenge #9, Demo Man: Isaac with Dr. Fetus, Remote Detonator and Match Stick. Beat Mom’s Heart."],
        ["challenge-suicide-king", ["challenge", "secret"], "Open the challenge Suicide King", "Opened by your eleventh Mom’s Heart win, once Lazarus is unlocked."],
        ["pickup-suicide-king", ["pickup", "secret"], "Unlock Suicide King", "Challenge #7, Suicide King: Lazarus with Ipecac, My Reflection and Mr. Mega. Beat Isaac in the Cathedral (chapter 3)."],
        ["challenge-pokey-mans", ["challenge", "secret"], "Open the challenge Pokey Mans", "Opened by your eleventh Mom’s Heart win."],
        ["pickup-charged-key", ["pickup", "secret"], "Unlock Charged Key", "Challenge #33, Pokey Mans: Isaac with Mom’s Eyeshadow and a Friendly Ball that calls up a random friendly monster. Beat Isaac in the Cathedral (chapter 3)."],
        ["challenge-bloody-mary", ["challenge", "secret"], "Open the challenge Bloody Mary", "Opened once Bethany, Blood Bag (chapter 1’s Blood Donation Machine) and It Lives! are all unlocked."],
        ["trinket-sigil-of-baphomet", ["trinket", "secret"], "Unlock Sigil of Baphomet", "Challenge #37, Bloody Mary: Bethany without her Book of Virtues, carrying The Book of Belial, Blood Bag, Anemic, Blood Oath and Child’s Heart. Beat Satan in Sheol (chapter 3)."],
      ],
    },
  ],
} satisfies RawChapter;

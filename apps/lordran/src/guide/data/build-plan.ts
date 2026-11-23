import type { BuildGuide, BuildNote, BuildPick, BuildTask, NamedBuild } from "@hundo/core/types";

/**
 * Lordran's named builds, how guides start each, what build guides use for them, and the steps each takes (core's Builds,
 * docs/chapter-data.md#builds). Research notes for every pick and step, with the guides read, their stat spreads and what they disagree
 * on, are in the builds research of 21 Nov 2026 (three passes; the third timed every pick and laid out each build's weapon).
 *
 * What a reader sees is the build's note on a row (`notes`, at the end), written in the guide's voice against the row's own words: what to do
 * there for that build, and when. The picks and steps are the sourced structure under the notes. Each pick has a role, when it serves its
 * build: a starter is usable in the opening hours with the build's starting class's stats, within a few levels (guide.test.ts holds every
 * starter's `needs` to that); an upgrade is what the build moves to once its stats or its upgrades allow; an endgame pick is what it ends on,
 * and a later pick's note says when. A big weapon found early is a pick only if guides use it. A random drop isn't a pick (the Black
 * Knight weapons, 20% drops, aren't).
 *
 * A pick needs, for each named build it's for, two independent hosts, at least one a guide that lays that build out (`guides`:
 * Fextralife's build pages, one host however many; gamevoyagers' class guides; magicgameworld's build pages; Steam guides). A guide counts
 * for the build its stat spread is: a Strength page with 32 Intelligence for Crystal Magic Weapon is a hybrid, not Pure Strength. A
 * ranked "best builds" list (`lists`: TheGamer, Gameranx, GameRant, GamersDecide, High Ground Gaming, FandomSpot) is a second voice only.
 * On a pick for several builds, each link's third place names the builds it backs (`only`). An add-on's picks need a guide for that kind
 * of build: Pyromancy's stand on Fextralife's melee builds with a flame beside them, not on a pyromancer's guide. Forum threads and
 * machine-written pages don't count, nor does a page that lists twenty weapons without choosing. facts-to-verify.md holds what stands
 * on less.
 *
 * A step sits on the row whose tick means it's done, and says nothing its chapter hasn't reached. A pick that is no named build reads the
 * steps' own words. Every named build and the Pyromancy add-on has notes (22 Nov 2026), so a named build never reads steps (guide.test.ts).
 */

const F = (page: string): BuildGuide => ["Fextralife", `https://darksouls.wiki.fextralife.com/${page}`];
const gamevoyagersPyro: BuildGuide = ["gamevoyagers", "https://gamevoyagers.com/?p=2011999"];
const gamevoyagersSorcerer: BuildGuide = ["gamevoyagers", "https://gamevoyagers.com/?p=2012286"];
const gamevoyagersWarrior: BuildGuide = ["gamevoyagers", "https://gamevoyagers.com/?p=10583"];
const gamevoyagersBandit: BuildGuide = ["gamevoyagers", "https://gamevoyagers.com/?p=2012293"];
const gamevoyagersWanderer: BuildGuide = ["gamevoyagers", "https://gamevoyagers.com/?p=2012243"];
const magicgameworldSorcery: BuildGuide = ["magicgameworld", "https://www.magicgameworld.com/dark-souls-remastered-pure-sorcery-magic-pvp-character-build/"];
const magicgameworldStrength: BuildGuide = ["magicgameworld", "https://magicgameworld.com/?p=19514"];
const magicgameworldDexterity: BuildGuide = ["magicgameworld", "https://www.magicgameworld.com/?p=19512"];
/** A Steam guide to a Paladin, in Portuguese: Cleric, Strength 30, Faith 30. */
const steamPaladin: BuildGuide = ["Steam", "https://steamcommunity.com/sharedfiles/filedetails/?id=2683025624"];
/** A Steam guide to a Darkmoon Blade Dexterity build, in Turkish: Cleric, Faith 30, Dexterity weapons. */
const steamDexFaith: BuildGuide = ["Steam", "https://steamcommunity.com/sharedfiles/filedetails/?id=681981285"];
/** A Steam guide to a Pure Faith Cleric started with the Master Key. */
const steamFaith: BuildGuide = ["Steam", "https://steamcommunity.com/sharedfiles/filedetails/?id=1487550701"];
const theGamer: BuildGuide = ["TheGamer", "https://www.thegamer.com/dark-souls-best-builds/"];
const gameranx: BuildGuide = ["Gameranx", "https://gameranx.com/features/id/232570/article/20-best-dark-souls-builds-that-will-make-you-wanna-replay/"];
const gameRant: BuildGuide = ["GameRant", "https://gamerant.com/dark-souls-overpowered-builds-next-playthrough/"];
const gamersDecide: BuildGuide = ["GamersDecide", "https://www.gamersdecide.com/articles/dark-souls-remastered-best-builds"];
const gamersDecideBeginner: BuildGuide = ["GamersDecide", "https://gamersdecide.com/articles/dark-souls-remastered-best-beginner-builds"];
const gamersDecideDex: BuildGuide = ["GamersDecide", "https://www.gamersdecide.com/articles/dark-souls-remastered-best-dex-weapons"];
const gamersDecideInt: BuildGuide = ["GamersDecide", "https://www.gamersdecide.com/articles/dark-souls-remastered-best-intelligence-weapons"];
const highGround: BuildGuide = ["High Ground Gaming", "https://www.highgroundgaming.com/dark-souls-remastered-best-beginner-class-build/"];
const fandomspot: BuildGuide = ["FandomSpot", "https://www.fandomspot.com/ds1-dex-weapons/"];

/** A guide or list that backs only some of a pick's builds: a sorcerer's guide and a pyromancer's naming one ring. */
const only = ([name, url]: BuildGuide, ...ids: string[]): BuildGuide => [name, url, ids];

const W = (page: string) => `https://darksouls.wikidot.com/${page}`;
const FX = (page: string) => `https://darksouls.wiki.fextralife.com/${page}`;

export const named: NamedBuild[] = [
  // No start: only Fextralife's Random Build names a Quality class (facts-to-verify.md).
  { id: "quality", name: "Quality", stats: ["str", "dex"], blurb: "Strength and Dexterity together: weapons that grow with both." },
  {
    id: "strength",
    name: "Pure Strength",
    stats: ["str"],
    blurb: "Heavy weapons that hit hard and grow with Strength.",
    start: { class: "a Bandit or a Warrior", guides: [F("dark+souls+build"), F("Royal+Tank"), gamevoyagersBandit, gamevoyagersWarrior], sources: [W("bandit"), W("warrior")] },
  },
  {
    id: "dexterity",
    name: "Pure Dexterity",
    stats: ["dex"],
    blurb: "Fast blades and katanas that grow with Dexterity, bleed among them.",
    start: {
      class: "a Wanderer",
      weapon: "Scimitar",
      why: "the Wanderer’s own curved sword, to fight with early",
      guides: [F("Dragon+Slayer"), gamevoyagersWanderer],
      lists: [fandomspot],
      sources: [W("wanderer"), W("scimitar")],
    },
  },
  {
    id: "sorcerer",
    name: "Sorcerer",
    stats: ["int"],
    blurb: "Sorceries from a catalyst, growing with Intelligence.",
    start: { class: "a Sorcerer", guides: [F("Magic+User+Guide"), gamevoyagersSorcerer], sources: [W("sorcerer"), W("classes")] },
  },
  // No start: its guides start it as a Sorcerer, a Wanderer or a Pyromancer, one host each (facts-to-verify.md).
  { id: "magic-knight", name: "Magic Knight", stats: ["dex", "int"], blurb: "A Dexterity blade beside sorceries: buffs, and weapons that grow with Intelligence." },
  {
    id: "faith",
    name: "Pure Faith",
    stats: ["fth"],
    blurb: "Miracles from a talisman: lightning, healing and buffs.",
    start: { class: "a Cleric", guides: [F("Highland_Cleric"), steamFaith], sources: [W("cleric"), W("classes")] },
  },
  {
    id: "paladin",
    name: "Paladin",
    stats: ["str", "fth"],
    blurb: "Strength weapons, with miracles to heal and buff.",
    start: {
      class: "a Cleric",
      weapon: "Mace",
      why: "the Cleric’s own, which Paladin guides fight with from the start: to +5 at Andre, then Divine, or on the Normal path to +15",
      guides: [F("Faith+-+Strength+Hybrid"), steamPaladin],
      sources: [W("cleric"), W("mace")],
    },
  },
  {
    id: "dex-faith",
    name: "Dex/Faith",
    stats: ["dex", "fth"],
    blurb: "Fast weapons, with miracles to buff them.",
    start: { class: "a Cleric", guides: [F("Faith+-+Dex+Hybrid"), steamDexFaith], sources: [W("cleric"), W("classes")] },
  },
  {
    id: "pyromancer",
    name: "Pyromancer",
    stats: ["pyro"],
    blurb: "Fire from a flame you upgrade with souls. No casting stat.",
    start: {
      class: "a Pyromancer",
      weapon: "Hand Axe",
      why: "it carries the early game: Fireball has 8 casts and the flame can’t be reinforced yet, so the axe takes the small enemies and the casts wait for the dangerous ones",
      guides: [gamevoyagersPyro, F("Pyromaniac+Build")],
      lists: [highGround],
      sources: [W("pyromancer"), W("hand-axe"), W("fireball")],
    },
  },
  { id: "pyromancy", name: "Pyromancy", stats: ["pyro"], blurb: "A flame beside any build: it needs no stat.", addon: true },
];

export const picks: BuildPick[] = [
  // Chapter 1
  {
    row: "pickup-zweihander",
    for: ["strength"],
    kind: "weapon",
    item: "Zweihander",
    role: "starter",
    needs: { str: 24, dex: 10 },
    guides: [gamevoyagersWarrior, F("dark+souls+build"), F("Royal+Tank")],
    lists: [gamersDecide, highGround],
    sources: [W("zweihander"), W("warrior"), W("bandit")],
  },
  {
    row: "route-andre",
    for: ["sorcerer"],
    kind: "weapon",
    item: "Longsword",
    role: "starter",
    needs: { str: 10, dex: 10 },
    guides: [F("Magic+User+Guide"), gamevoyagersSorcerer],
    sources: [W("andre-of-astora"), W("longsword"), W("sorcerer")],
  },
  {
    row: "covenant-way-of-white",
    for: ["paladin"],
    kind: "spell",
    item: "Homeward",
    role: "upgrade",
    needs: { fth: 18 },
    guides: [F("Paladin+Build"), steamPaladin],
    sources: [W("homeward"), W("petrus-of-thorolund")],
  },
  {
    row: "pickup-claymore",
    for: ["quality", "faith"],
    kind: "weapon",
    item: "Claymore",
    role: "starter",
    needs: { str: 16, dex: 10 },
    guides: [only(F("Random+Build"), "quality"), only(F("Highland_Cleric"), "faith")],
    lists: [only(gamersDecide, "quality", "faith"), only(theGamer, "faith")],
    sources: [W("claymore")],
  },
  // Chapter 2
  {
    row: "quest-griggs",
    for: ["sorcerer"],
    kind: "spell",
    item: "Soul Arrow",
    role: "starter",
    needs: { int: 10 },
    guides: [F("Magic+User+Guide"), gamevoyagersSorcerer],
    sources: [W("griggs-of-vinheim"), W("soul-arrow")],
  },
  {
    row: "quest-griggs",
    for: ["sorcerer"],
    kind: "spell",
    item: "Great Heavy Soul Arrow",
    role: "upgrade",
    needs: { int: 16 },
    guides: [F("Magic+User+Guide"), gamevoyagersSorcerer],
    sources: [W("griggs-of-vinheim"), W("great-heavy-soul-arrow")],
  },
  {
    row: "quest-griggs",
    for: ["sorcerer", "pyromancer"],
    kind: "ring",
    item: "Bellowing Dragoncrest Ring",
    role: "upgrade",
    guides: [only(F("Magic+User+Guide"), "sorcerer"), only(gamevoyagersSorcerer, "sorcerer"), only(magicgameworldSorcery, "sorcerer"), only(F("Pyromaniac+Build"), "pyromancer")],
    lists: [only(theGamer, "pyromancer")],
    sources: [W("bellowing-dragoncrest-ring")],
  },
  {
    row: "quest-laurentius",
    for: ["pyromancer", "pyromancy"],
    kind: "catalyst",
    item: "Pyromancy Flame",
    role: "starter",
    guides: [only(F("Pyromaniac+Build"), "pyromancer"), only(gamevoyagersPyro, "pyromancer"), only(F("Dex+Pyro+SL+100"), "pyromancy"), only(F("Pyro+Warrior"), "pyromancy")],
    lists: [only(theGamer, "pyromancy"), only(gameranx, "pyromancy")],
    sources: [W("pyromancy-flame")],
  },
  // Chapter 3
  {
    row: "pickup-blighttown-iaito",
    for: ["dexterity", "dex-faith"],
    kind: "weapon",
    item: "Iaito",
    role: "upgrade",
    needs: { str: 14, dex: 20 },
    guides: [only(F("Dragon+Slayer"), "dexterity"), only(F("Dextrous+Tank"), "dex-faith"), only(steamDexFaith, "dex-faith")],
    lists: [only(fandomspot, "dexterity")],
    sources: [W("iaito-sword")],
  },
  {
    row: "route-swamp-bonfire",
    for: ["pyromancer"],
    kind: "spell",
    item: "Poison Mist",
    role: "upgrade",
    guides: [F("The+Burning+Reaper+(Pure+Pyromancy)")],
    lists: [theGamer],
    sources: [W("poison-mist")],
  },
  {
    row: "pickup-great-club",
    for: ["strength"],
    kind: "weapon",
    item: "Great Club",
    role: "upgrade",
    needs: { str: 28 },
    guides: [gamevoyagersWarrior],
    lists: [gameranx],
    sources: [W("great-club")],
  },
  {
    row: "pyromancy-power-within",
    for: ["pyromancer", "pyromancy", "dex-faith"],
    kind: "spell",
    item: "Power Within",
    role: "upgrade",
    guides: [
      only(F("The+Burning+Reaper+(Pure+Pyromancy)"), "pyromancer"),
      only(F("Chaos+Build"), "pyromancy"),
      only(F("Chaos+Blade+Build"), "pyromancy"),
      only(F("Faith+-+Dex+Hybrid"), "dex-faith"),
      only(steamDexFaith, "dex-faith"),
    ],
    lists: [only(theGamer, "pyromancer", "pyromancy"), only(gameranx, "pyromancy", "dex-faith")],
    sources: [W("power-within")],
  },
  {
    row: "route-rickert",
    for: ["sorcerer"],
    kind: "path",
    item: "A Magic weapon",
    role: "upgrade",
    guides: [F("Magic+User+Guide"), gamevoyagersSorcerer],
    sources: [W("rickert-of-vinheim"), W("magic")],
  },
  {
    row: "pickup-estoc",
    for: ["dexterity"],
    kind: "weapon",
    item: "Estoc",
    role: "upgrade",
    needs: { str: 10, dex: 12 },
    guides: [gamevoyagersWarrior],
    lists: [gamersDecideDex, fandomspot],
    sources: [W("estoc"), W("wanderer")],
  },
  {
    row: "covenant-chaos-servant",
    for: ["pyromancer", "pyromancy"],
    kind: "spell",
    item: "Great Chaos Fireball",
    role: "upgrade",
    guides: [only(F("Pyromaniac+Build"), "pyromancer"), only(F("Dex+Pyro+SL+100"), "pyromancy")],
    lists: [only(theGamer, "pyromancer", "pyromancy")],
    sources: [W("chaos-servant")],
  },
  {
    row: "quest-quelaana",
    for: ["pyromancer", "pyromancy"],
    kind: "spell",
    item: "Great Combustion",
    role: "upgrade",
    guides: [only(F("Pyromaniac+Build"), "pyromancer"), only(F("Dex+Pyro+SL+100"), "pyromancy")],
    lists: [only(theGamer, "pyromancer", "pyromancy"), only(gameranx, "pyromancy")],
    sources: [W("quelaana-of-izalith"), FX("Pyromancies")],
  },
  {
    row: "quest-quelaana",
    for: ["pyromancer"],
    kind: "spell",
    item: "Fire Whip",
    role: "upgrade",
    guides: [F("Pyromaniac+Build")],
    lists: [theGamer],
    sources: [W("fire-whip"), W("quelaana-of-izalith")],
  },
  {
    row: "quest-quelaana",
    for: ["pyromancy"],
    kind: "spell",
    item: "Great Fireball",
    role: "upgrade",
    guides: [F("Pyro+Warrior")],
    lists: [theGamer],
    sources: [W("great-fireball"), W("quelaana-of-izalith")],
  },
  // Chapter 4
  {
    row: "ring-wolf",
    for: ["faith"],
    kind: "ring",
    item: "Wolf Ring",
    role: "upgrade",
    guides: [F("Light's+Faith+Build"), F("Faithful_Knight")],
    lists: [theGamer],
    sources: [W("wolf-ring")],
  },
  {
    row: "ember-divine",
    for: ["faith", "paladin"],
    kind: "path",
    item: "A Divine weapon",
    role: "upgrade",
    guides: [only(F("Faith+Caster+PvP"), "faith"), only(F("Faith+-+Strength+Hybrid"), "paladin"), only(steamPaladin, "paladin")],
    lists: [only(gamersDecide, "faith"), only(theGamer, "faith")],
    sources: [W("divine")],
  },
  {
    row: "quest-shiva-shop",
    for: ["dexterity", "dex-faith"],
    kind: "weapon",
    item: "Uchigatana",
    role: "upgrade",
    needs: { str: 14, dex: 14 },
    guides: [only(F("Samurai+(build)"), "dexterity"), only(magicgameworldDexterity, "dexterity"), only(F("Faith+-+Dex+Hybrid"), "dex-faith"), only(steamDexFaith, "dex-faith")],
    lists: [only(gamersDecideDex, "dexterity")],
    sources: [W("uchigatana"), W("shiva-of-the-east")],
  },
  {
    row: "quest-shiva-shop",
    for: ["strength"],
    kind: "weapon",
    item: "Demon’s Greataxe",
    role: "endgame",
    needs: { str: 46 },
    guides: [magicgameworldStrength, gamevoyagersWarrior, F("Royal+Tank"), F("dark+souls+build")],
    sources: [W("demon-s-greataxe"), W("shiva-of-the-east")],
  },
  {
    row: "pickup-grass-crest-shield",
    for: ["quality", "dexterity", "dex-faith"],
    kind: "armor",
    item: "Grass Crest Shield",
    role: "upgrade",
    guides: [
      only(F("Random+Build"), "quality"),
      only(F("Darkwood+Hunter"), "quality"),
      only(magicgameworldDexterity, "dexterity"),
      only(F("Faith+-+Dex+Hybrid"), "dex-faith"),
      only(steamDexFaith, "dex-faith"),
    ],
    lists: [only(gamersDecide, "quality", "dexterity")],
    sources: [W("grass-crest-shield"), FX("Grass+Crest+Shield")],
  },
  {
    row: "quest-dusk",
    for: ["sorcerer", "pyromancer"],
    kind: "armor",
    item: "Crown of Dusk",
    role: "upgrade",
    guides: [only(F("Magic+User+Guide"), "sorcerer"), only(magicgameworldSorcery, "sorcerer"), only(F("The+Burning+Reaper+(Pure+Pyromancy)"), "pyromancer")],
    lists: [only(gameRant, "pyromancer")],
    sources: [W("crown-of-dusk")],
  },
  {
    row: "extra-havel",
    for: ["strength", "sorcerer", "paladin", "dex-faith"],
    kind: "ring",
    item: "Havel’s Ring",
    role: "upgrade",
    guides: [
      only(magicgameworldStrength, "strength"),
      only(F("Magic+User+Guide"), "sorcerer"),
      only(magicgameworldSorcery, "sorcerer"),
      only(F("Faith+-+Strength+Hybrid"), "paladin"),
      only(steamPaladin, "paladin"),
      only(F("Faith+-+Dex+Hybrid"), "dex-faith"),
      only(steamDexFaith, "dex-faith"),
    ],
    lists: [only(gamersDecide, "strength")],
    sources: [W("havel-s-ring")],
  },
  {
    row: "ring-red-tearstone",
    for: ["strength"],
    kind: "ring",
    item: "Red Tearstone Ring",
    role: "endgame",
    guides: [magicgameworldStrength, F("Black+knight+Marauders")],
    sources: [W("red-tearstone-ring")],
  },
  {
    row: "pickup-ricards-rapier",
    for: ["dex-faith"],
    kind: "weapon",
    item: "Ricard’s Rapier",
    role: "endgame",
    needs: { str: 8, dex: 20 },
    guides: [F("Faith+-+Dex+Hybrid"), steamDexFaith],
    sources: [W("ricard-s-rapier")],
  },
  // Chapter 5
  {
    row: "miracle-emit-force",
    for: ["faith", "paladin"],
    kind: "spell",
    item: "Emit Force",
    role: "upgrade",
    guides: [only(F("Faith+Caster+PvP"), "faith"), only(F("Paladin+Build"), "paladin"), only(steamPaladin, "paladin")],
    lists: [only(gamersDecide, "faith"), only(theGamer, "faith")],
    sources: [W("emit-force")],
  },
  {
    row: "ember-dark",
    for: ["faith"],
    kind: "path",
    item: "An Occult weapon",
    role: "endgame",
    guides: [F("Highland_Cleric"), F("Evox's_SL125_Holy_Knight")],
    lists: [gamersDecideBeginner],
    sources: [W("occult")],
  },
  {
    row: "rare-weapon-velkas-rapier",
    for: ["magic-knight"],
    kind: "weapon",
    item: "Velka’s Rapier",
    role: "upgrade",
    needs: { str: 8, dex: 16, int: 16 },
    guides: [F("Darkmoon+Battlemage")],
    lists: [gamersDecideInt],
    sources: [W("velka-s-rapier")],
  },
  {
    row: "miracle-great-magic-barrier",
    for: ["faith", "paladin"],
    kind: "spell",
    item: "Great Magic Barrier",
    role: "upgrade",
    needs: { fth: 24 },
    guides: [only(F("Highland_Cleric"), "faith"), only(F("Paladin+Build"), "paladin"), only(steamPaladin, "paladin")],
    lists: [only(gamersDecide, "faith"), only(theGamer, "faith")],
    sources: [W("great-magic-barrier")],
  },
  {
    row: "ring-favor-protection",
    for: ["strength", "dexterity", "faith", "paladin", "dex-faith"],
    kind: "ring",
    item: "Ring of Favor and Protection",
    role: "endgame",
    guides: [
      only(F("Fast+Rolling+Greatsword"), "strength"),
      only(F("Samurai+(build)"), "dexterity"),
      only(F("Highland_Cleric"), "faith"),
      only(F("Faith+-+Strength+Hybrid"), "paladin"),
      only(steamPaladin, "paladin"),
      only(F("Faith+-+Dex+Hybrid"), "dex-faith"),
      only(steamDexFaith, "dex-faith"),
    ],
    lists: [only(gamersDecide, "strength", "dexterity", "faith", "paladin"), only(theGamer, "faith")],
    sources: [W("ring-of-favor-and-protection")],
  },
  {
    row: "ring-sun-firstborn",
    for: ["faith", "paladin"],
    kind: "ring",
    item: "Ring of the Sun’s Firstborn",
    role: "endgame",
    guides: [only(F("Faith+Caster+PvP"), "faith"), only(F("Paladin+Build"), "paladin")],
    lists: [only(gamersDecide, "faith", "paladin")],
    sources: [W("ring-of-the-sun-s-firstborn")],
  },
  // Chapter 7
  {
    row: "sorcery-crystal-soul-spear",
    for: ["sorcerer"],
    kind: "spell",
    item: "Crystal Soul Spear",
    role: "endgame",
    needs: { int: 44 },
    guides: [gamevoyagersSorcerer, F("Moonlight+Sorcerer")],
    sources: [W("big-hat-logan")],
  },
  {
    row: "sorcery-crystal-magic-weapon",
    for: ["magic-knight"],
    kind: "spell",
    item: "Crystal Magic Weapon",
    role: "upgrade",
    needs: { int: 25 },
    guides: [gamevoyagersSorcerer, F("Darkmoon+Battlemage")],
    lists: [theGamer],
    sources: [W("crystal-magic-weapon")],
  },
  {
    row: "sorcery-homing-crystal-soulmass",
    for: ["sorcerer", "magic-knight"],
    kind: "spell",
    item: "Homing Crystal Soulmass",
    role: "endgame",
    needs: { int: 24 },
    guides: [only(F("Magic+User+Guide"), "sorcerer"), only(gamevoyagersSorcerer, "sorcerer", "magic-knight"), only(F("Darkmoon+Battlemage"), "magic-knight")],
    lists: [only(gameranx, "sorcerer"), only(theGamer, "magic-knight")],
    sources: [W("homing-crystal-soulmass"), W("big-hat-logan")],
  },
  {
    row: "rare-weapon-seath-tail",
    for: ["sorcerer", "magic-knight"],
    kind: "weapon",
    item: "Moonlight Greatsword",
    role: "endgame",
    needs: { str: 16, dex: 10, int: 28 },
    guides: [only(gamevoyagersSorcerer, "sorcerer", "magic-knight"), only(magicgameworldSorcery, "sorcerer")],
    lists: [only(gamersDecideInt, "sorcerer"), only(theGamer, "magic-knight")],
    sources: [W("moonlight-greatsword")],
  },
  {
    row: "quest-logan-finish",
    for: ["sorcerer", "magic-knight"],
    kind: "catalyst",
    item: "Tin Crystallization Catalyst",
    role: "endgame",
    needs: { int: 32 },
    guides: [only(gamevoyagersSorcerer, "sorcerer", "magic-knight"), only(F("Moonlight+Sorcerer"), "sorcerer"), only(F("Darkmoon+Battlemage"), "magic-knight")],
    lists: [only(gameranx, "sorcerer"), only(gameRant, "sorcerer"), only(theGamer, "magic-knight")],
    sources: [W("tin-crystallization-catalyst"), W("logan-s-catalyst")],
  },
  {
    row: "sorcery-white-dragon-breath",
    for: ["sorcerer"],
    kind: "spell",
    item: "White Dragon Breath",
    role: "endgame",
    needs: { int: 50 },
    guides: [gamevoyagersSorcerer, F("Moonlight+Sorcerer")],
    sources: [W("white-dragon-breath")],
  },
  {
    row: "quest-logan-study",
    for: ["sorcerer", "magic-knight"],
    kind: "catalyst",
    item: "Logan’s Catalyst",
    role: "endgame",
    needs: { int: 24 },
    guides: [only(F("Magic+User+Guide"), "sorcerer"), only(gamevoyagersSorcerer, "sorcerer", "magic-knight"), only(magicgameworldSorcery, "sorcerer"), only(F("Versatile+PVE+build"), "magic-knight")],
    sources: [W("logan-s-catalyst")],
  },
  // Chapter 8
  {
    row: "pickup-great-scythe",
    for: ["dexterity", "dex-faith"],
    kind: "weapon",
    item: "Great Scythe",
    role: "endgame",
    needs: { str: 14, dex: 14 },
    guides: [only(magicgameworldDexterity, "dexterity"), only(gamevoyagersWarrior, "dexterity"), only(F("Faith+-+Dex+Hybrid"), "dex-faith"), only(steamDexFaith, "dex-faith")],
    lists: [only(gamersDecide, "dexterity"), only(fandomspot, "dexterity")],
    sources: [W("great-scythe")],
  },
  {
    row: "quest-reah-pit",
    for: ["faith", "paladin"],
    kind: "spell",
    item: "Replenishment",
    role: "upgrade",
    needs: { fth: 16 },
    guides: [only(F("Light's+Faith+Build"), "faith"), only(F("Faithful_Knight"), "faith"), only(F("Paladin+Build"), "paladin"), only(steamPaladin, "paladin")],
    lists: [only(theGamer, "faith")],
    sources: [W("replenishment")],
  },
  {
    row: "quest-reah",
    for: ["faith", "paladin"],
    kind: "spell",
    item: "Wrath of the Gods",
    role: "upgrade",
    needs: { fth: 28 },
    guides: [only(F("Faith+Caster+PvP"), "faith"), only(F("Paladin+Build"), "paladin")],
    lists: [only(gamersDecide, "faith", "paladin"), only(theGamer, "faith")],
    sources: [W("wrath-of-the-gods"), W("rhea-of-thorolund")],
  },
  {
    row: "invasion-leeroy",
    for: ["paladin"],
    kind: "armor",
    item: "Sanctus",
    role: "endgame",
    needs: { str: 10, fth: 18 },
    guides: [F("Paladin+Build")],
    lists: [gamersDecide],
    sources: [W("sanctus")],
  },
  {
    row: "quest-patches",
    for: ["paladin"],
    kind: "catalyst",
    item: "Canvas Talisman",
    role: "starter",
    guides: [F("Paladin+Build"), F("Holy_Bishop"), steamPaladin],
    lists: [gamersDecide],
    sources: [W("canvas-talisman"), W("cleric")],
  },
  // Chapter 8: Vamos
  {
    row: "route-vamos",
    for: ["pyromancer"],
    kind: "path",
    item: "A Fire weapon",
    role: "upgrade",
    guides: [F("Pyromaniac+Build")],
    lists: [gameRant],
    sources: [W("vamos"), W("fire")],
  },
  // Chapter 9
  {
    row: "pyromancy-fire-tempest",
    for: ["pyromancer", "pyromancy"],
    kind: "spell",
    item: "Fire Tempest",
    role: "endgame",
    guides: [only(F("Pyromaniac+Build"), "pyromancer"), only(F("Chaos+Build"), "pyromancy"), only(F("Chaos+Blade+Build"), "pyromancy")],
    lists: [only(theGamer, "pyromancer", "pyromancy")],
    sources: [FX("Pyromancies")],
  },
  // Chapter 11
  {
    row: "covenant-sunlight",
    for: ["faith"],
    kind: "spell",
    item: "Great Lightning Spear",
    role: "endgame",
    needs: { fth: 30 },
    guides: [F("Faithful_Knight")],
    lists: [gamersDecide, theGamer],
    sources: [W("great-lightning-spear"), W("warrior-of-sunlight")],
  },
  {
    row: "quest-darkmoon-rank",
    for: ["faith"],
    kind: "catalyst",
    item: "Darkmoon Talisman",
    role: "endgame",
    needs: { str: 4, fth: 24 },
    guides: [F("Faith+Caster+PvP"), F("Highland_Cleric")],
    lists: [gamersDecide, theGamer],
    sources: [W("darkmoon-talisman")],
  },
  {
    row: "quest-darkmoon-rank",
    for: ["dex-faith"],
    kind: "spell",
    item: "Darkmoon Blade",
    role: "endgame",
    needs: { fth: 30 },
    guides: [F("Faith+-+Dex+Hybrid"), F("Proud+Sword+Build"), steamDexFaith],
    sources: [W("blade-of-the-darkmoon"), FX("Darkmoon+Blade")],
  },
  {
    row: "boss-gwyndolin",
    for: ["faith", "paladin", "dex-faith"],
    kind: "spell",
    item: "Sunlight Blade",
    role: "endgame",
    needs: { fth: 30 },
    guides: [
      only(F("Faithful_Knight"), "faith"),
      only(F("Paladin+Build"), "paladin"),
      only(steamPaladin, "paladin"),
      only(F("Faith+-+Dex+Hybrid"), "dex-faith"),
      only(steamDexFaith, "dex-faith"),
    ],
    lists: [only(gamersDecideBeginner, "faith"), only(theGamer, "faith"), only(gameranx, "dex-faith")],
    sources: [W("sunlight-blade")],
  },
  {
    row: "rare-weapon-quelaags-furysword",
    for: ["dexterity"],
    kind: "weapon",
    item: "Quelaag’s Furysword",
    role: "endgame",
    needs: { str: 11, dex: 13 },
    guides: [F("Dexbro")],
    lists: [gamersDecideDex],
    sources: [FX("Quelaag's+Furysword")],
  },
  {
    row: "ring-dark-wood-grain",
    for: ["pyromancer"],
    kind: "ring",
    item: "Dark Wood Grain Ring",
    role: "endgame",
    guides: [F("Pyromaniac+Build")],
    lists: [theGamer],
    sources: [W("dark-wood-grain-ring")],
  },
  {
    row: "quest-domhnall-firelink",
    for: ["faith", "paladin"],
    kind: "armor",
    item: "Crown of the Dark Sun",
    role: "endgame",
    guides: [only(F("Faith+Caster+PvP"), "faith"), only(F("Holy_Bishop"), "paladin")],
    lists: [only(gamersDecide, "faith", "paladin"), only(theGamer, "faith")],
    sources: [W("crown-of-the-dark-sun")],
  },
  // Chapter 13
  {
    row: "ring-leo",
    for: ["dexterity"],
    kind: "ring",
    item: "Leo Ring",
    role: "endgame",
    guides: [F("Dexbro")],
    lists: [gamersDecideDex, gameranx],
    sources: [W("leo-ring")],
  },
];

export const tasks: BuildTask[] = [
  // Chapter 1
  {
    row: "covenant-way-of-white",
    serves: ["fth"],
    title: "Buy a talisman and Heal from Petrus",
    text: "Unless you started as a Cleric, who has both already, he sells the Talisman for 1,000 souls and Heal, which needs 12 Faith, for 4,000. A later seller asks less for the same miracles.",
    sources: [W("petrus-of-thorolund"), W("cleric")],
  },
  {
    row: "route-andre",
    serves: ["str", "dex", "int", "fth", "pyro"],
    title: "Find Andre, your smith",
    quiet: ["pyromancy"],
    text: "He takes a Normal weapon to +5 with Titanite Shards, which he sells for 800 souls each, and each Normal level raises its Strength and Dexterity scaling. Casters’ guides reinforce their weapon here early too. Past +5 each of his paths needs an ember: more Normal levels, Raw, or Divine, which grows with Faith.",
    path: true,
    sources: [W("andre-of-astora"), FX("Blacksmith+Andre"), W("normal"), W("divine"), FX("Upgrades"), W("pyromancer"), FX("Magic+User+Guide")],
  },
  // Chapter 2
  {
    row: "quest-griggs",
    serves: ["int"],
    title: "Buy your first sorceries from Griggs",
    quiet: ["magic-knight"],
    text: "He sells Soul Arrow for 1,000 souls, Great Soul Arrow for 6,000 and Great Heavy Soul Arrow for 8,000, and his two Dragoncrest rings for 20,000 each.",
    sources: [W("griggs-of-vinheim"), FX("Griggs+of+Vinheim")],
  },
  {
    row: "ember-large",
    serves: ["str", "dex"],
    title: "Take the Large Ember to Andre",
    path: true,
    text: "Normal goes on to +10 with it. Raw gives more base damage for less Strength and Dexterity scaling, and stops at +5.",
    sources: [W("large-ember"), W("andre-of-astora"), W("raw"), FX("Regular+Upgrades")],
  },
  {
    row: "quest-laurentius",
    serves: ["pyro"],
    title: "Buy his pyromancies and start on the flame",
    text: "Laurentius sells Fireball for 800 souls and Combustion for 500, and reinforces the Pyromancy Flame for souls alone: 10,500 to reach +5.",
    sources: [W("laurentius"), W("pyromancy-flame"), FX("Laurentius+of+the+Great+Swamp")],
  },
  {
    row: "quest-laurentius-after-depths",
    serves: ["pyro"],
    title: "Take the flame toward +10",
    text: "From +5 each level costs more: 5,500 souls for +6 up to 12,000 for +10, 43,000 in all. A +10 flame opens another teacher.",
    sources: [W("pyromancy-flame"), FX("Pyromancy+Flame")],
  },
  // Chapter 3
  {
    row: "route-rickert",
    serves: ["int"],
    title: "Find Rickert, the magesmith",
    path: true,
    text: "Magic takes a Green Titanite Shard and adds magic damage that grows with Intelligence, while lowering what the weapon gets from Strength and Dexterity, and a Magic weapon can’t take a buff. His Soul Arrow costs 2,000 souls and Heavy Soul Arrow 4,000.",
    sources: [W("rickert-of-vinheim"), FX("Rickert+of+Vinheim"), W("magic"), FX("Upgrades")],
  },
  {
    row: "covenant-chaos-servant",
    serves: ["pyro"],
    title: "Join for Great Chaos Fireball",
    text: "Joining makes Laurentius ask where you learned your pyromancy: answer No and his shop stays open. Offering 30 Humanity later raises you to rank +2, which gives Chaos Storm.",
    sources: [W("chaos-servant"), FX("Chaos+Servant"), W("laurentius")],
  },
  {
    row: "quest-eingyi",
    serves: ["pyro"],
    title: "Buy Eingyi’s mists",
    quiet: ["pyromancy"],
    text: "Poison Mist costs 10,000 souls and Toxic Mist 25,000.",
    sources: [W("eingyi"), FX("Eingyi")],
  },
  {
    row: "quest-quelaana",
    serves: ["pyro"],
    title: "Show Quelana a +10 flame and learn from her",
    text: "She sells Great Combustion for 5,000 souls, Fire Whip and Undead Rapport for 10,000 each, Great Fireball for 20,000 and Firestorm for 30,000. She takes the flame on to +15, 96,000 souls past +10, and only she ascends a +15 flame: ascending it and taking it to +5 costs 191,000 more.",
    sources: [W("quelaana-of-izalith"), FX("Quelana+of+Izalith"), W("pyromancy-flame"), FX("Pyromancy+Flame")],
  },
  // Chapter 4
  {
    row: "ember-divine",
    serves: ["fth"],
    title: "Take the Divine Ember to Andre",
    quiet: ["dex-faith"],
    path: true,
    text: "Divine adds magic damage that grows with Faith and keeps part of the weapon’s Strength and Dexterity scaling, but a Divine weapon can’t take a buff.",
    sources: [W("divine"), W("mace"), FX("Upgrades"), steamPaladin[1]],
  },
  {
    row: "ember-enchanted",
    serves: ["int"],
    title: "Take the Enchanted Ember to Rickert",
    text: "Enchanted starts from a Magic +5 weapon: its Intelligence scaling grows faster than Magic’s, and it stops at +5.",
    sources: [W("enchanted"), W("rickert-of-vinheim"), FX("Upgrades")],
  },
  {
    row: "quest-shiva-shop",
    serves: ["str", "dex"],
    title: "Shop with Shiva while a Forest Hunter",
    quiet: ["paladin", "quality", "magic-knight"],
    text: "Among his weapons are the Uchigatana for 5,000 souls, the Demon’s Greataxe for 10,000 and the Washing Pole for 20,000.",
    sources: [W("shiva-of-the-east")],
  },
  {
    row: "quest-dusk",
    serves: ["int"],
    title: "Say Yes to Dusk and buy from her",
    quiet: ["magic-knight"],
    text: "Her sign sells Cast Light for 1,000 souls, Hidden Body for 2,000 and the Oolacile Ivory Catalyst for 1,000, each spell needing 14 Intelligence. Summoning her once leaves the Antiquated Set, Crown of Dusk among it.",
    sources: [W("dusk-of-oolacile"), FX("Dusk+of+Oolacile")],
  },
  {
    row: "quest-logan",
    serves: ["int"],
    title: "Free Logan for his Firelink shop",
    quiet: ["magic-knight"],
    text: "Among his sorceries are Homing Soulmass for 20,000 souls and Soul Spear for 40,000, which need 18 and 36 Intelligence.",
    sources: [W("big-hat-logan"), FX("Big+Hat+Logan")],
  },
  // Chapter 5
  {
    row: "route-giant-blacksmith",
    serves: ["str", "dex"],
    title: "Meet the Giant Blacksmith",
    quiet: ["paladin"],
    text: "He makes a +10 Normal weapon Lightning, which loses its Strength and Dexterity scaling.",
    sources: [W("giant-blacksmith"), W("lightning"), FX("Giant+Blacksmith"), FX("Upgrades")],
  },
  {
    row: "ember-dark",
    serves: ["fth"],
    title: "Take the Dark Ember to Andre",
    quiet: ["dex-faith"],
    path: true,
    text: "Occult has less base magic damage than Divine but keeps the part that grows with Faith, and stops at +5.",
    sources: [W("occult"), FX("Upgrades")],
  },
  // Chapter 6
  {
    row: "ember-very-large",
    serves: ["str", "dex"],
    title: "Take the Very Large Ember to Andre",
    path: true,
    text: "Only the Normal path reaches +15, and its last level takes a Titanite Slab.",
    sources: [W("embers"), W("titanite-slab"), W("normal"), FX("Upgrades")],
  },
  // Chapter 7
  {
    row: "quest-logans-cell",
    serves: ["int"],
    title: "Free Logan and buy the Crystal sorceries",
    text: "In the Archives he sells Crystal Magic Weapon for 20,000 souls, Homing Crystal Soulmass for 30,000 and Crystal Soul Spear for 50,000, which he sells only there.",
    before: "Buy every spell he sells: his catalyst turns up only if you do.",
    sources: [W("big-hat-logan"), FX("Big+Hat+Logan")],
  },
  {
    row: "ember-large-magic",
    serves: ["int"],
    title: "Take the Large Magic Ember to Rickert",
    path: true,
    text: "Magic goes no further than +10; an Enchanted weapon stays at +5.",
    sources: [W("magic"), W("enchanted"), W("rickert-of-vinheim"), FX("Upgrades")],
  },
  // Chapter 8
  {
    row: "route-vamos",
    serves: ["pyro"],
    title: "Find Vamos",
    text: "Fire takes a +5 Normal weapon and a Green Titanite Shard: its damage then grows with nothing you level, as your pyromancies’ don’t.",
    path: true,
    sources: [W("vamos"), FX("Blacksmith+Vamos"), W("fire"), W("chaos"), FX("Upgrades")],
  },
  {
    row: "quest-reah",
    serves: ["fth"],
    title: "Buy Reah’s miracles",
    quiet: ["dex-faith"],
    text: "Wrath of the Gods and Great Heal cost 10,000 souls each, and Magic Barrier 6,000.",
    sources: [W("rhea-of-thorolund"), FX("Reah+of+Thorolund")],
  },
  {
    row: "ember-large-divine",
    serves: ["fth"],
    title: "Take the Large Divine Ember to Andre",
    quiet: ["dex-faith"],
    path: true,
    text: "He then takes a Divine weapon on from +5 to +10.",
    sources: [W("divine"), W("andre-of-astora")],
  },
  // Chapter 9
  {
    row: "ember-chaos-flame",
    serves: ["pyro"],
    title: "Take the Chaos Flame Ember to Vamos",
    quiet: ["pyromancy"],
    text: "The next step on the Fire path, if you want it: with the ember and a Red Titanite Chunk he turns a Fire +5 weapon Chaos, which grows with your Humanity, up to 10, instead of with nothing.",
    path: true,
    sources: [W("chaos"), FX("Chaos+Upgrades"), W("vamos")],
  },
  // Chapter 11
  {
    row: "covenant-sunlight",
    serves: ["fth"],
    title: "Join for Lightning Spear",
    quiet: ["paladin", "dex-faith"],
    text: "Great Lightning Spear needs 30 Faith to cast, whatever joining asked.",
    sources: [W("warrior-of-sunlight"), FX("Warrior+of+Sunlight"), W("great-lightning-spear")],
  },
  {
    row: "quest-darkmoon-rank",
    serves: ["fth"],
    title: "Rank up for Darkmoon Blade and its talisman",
    quiet: ["paladin"],
    text: "Rank +1 gives Darkmoon Blade, a buff for your weapon that needs 30 Faith, and the Darkmoon Talisman.",
    sources: [W("blade-of-the-darkmoon"), FX("Blade+of+the+Darkmoon"), FX("Darkmoon+Blade")],
  },
  {
    row: "reinforcement-chaos",
    serves: ["pyro"],
    title: "Take your Chaos weapon to +5",
    quiet: ["pyromancer", "pyromancy"],
    path: true,
    text: "Only for a weapon you took Chaos: +5 is as far as it goes.",
    sources: [W("chaos"), FX("Chaos+Upgrades"), W("red-titanite-slab")],
  },
];

const paladin = (row: string, text: string, more: Partial<BuildNote> = {}): BuildNote => ({ row, for: ["paladin"], text, ...more });
const pyromancer = (row: string, text: string, more: Partial<BuildNote> = {}): BuildNote => ({ row, for: ["pyromancer"], text, ...more });
const quality = (row: string, text: string, more: Partial<BuildNote> = {}): BuildNote => ({ row, for: ["quality"], text, ...more });
const strength = (row: string, text: string, more: Partial<BuildNote> = {}): BuildNote => ({ row, for: ["strength"], text, ...more });
const dexterity = (row: string, text: string, more: Partial<BuildNote> = {}): BuildNote => ({ row, for: ["dexterity"], text, ...more });
const sorcerer = (row: string, text: string, more: Partial<BuildNote> = {}): BuildNote => ({ row, for: ["sorcerer"], text, ...more });
const magicKnight = (row: string, text: string, more: Partial<BuildNote> = {}): BuildNote => ({ row, for: ["magic-knight"], text, ...more });
const faith = (row: string, text: string, more: Partial<BuildNote> = {}): BuildNote => ({ row, for: ["faith"], text, ...more });
const dexFaith = (row: string, text: string, more: Partial<BuildNote> = {}): BuildNote => ({ row, for: ["dex-faith"], text, ...more });
const pyromancy = (row: string, text: string, more: Partial<BuildNote> = {}): BuildNote => ({ row, for: ["pyromancy"], text, ...more });
/** A note whose words fit several builds: never a stage, which names one build's weapon. */
const shared = (row: string, builds: string[], text: string, more: Partial<BuildNote> = {}): BuildNote => ({ row, for: builds, text, ...more });

/**
 * What each row means for a build, in the guide's voice: what to do there and when, merged with the row's own advice and never repeating
 * it. Each names the picks under it; a stage names the build's weapon as the row leaves it, for its weapon track. A step that says nothing
 * to a build beyond the row's own words is `quiet` for it instead.
 */
export const notes: BuildNote[] = [
  // Paladin
  paladin(
    "covenant-way-of-white",
    "If you didn’t start as a Cleric, what you need now is the Talisman, 1,000 souls, and Heal, 4,000; a Cleric has both. Leave Homeward, the one miracle Paladin guides add from his list, for later: it needs 18 Faith.",
  ),
  paladin("route-andre", "Take your Mace to +5 here, with Titanite Shards at 800 souls each. That’s where its paths part: a Normal +5 weapon is what he can later make Divine.", {
    stage: "Mace +5",
    sources: [W("mace")],
  }),
  paladin("ember-large", "On the Normal path this takes your Mace past +5. If you mean to make it Divine, leave it at +5: Divine starts from a Normal +5 weapon.", {
    stage: "Mace +10, on the Normal path",
  }),
  paladin("miracle-great-magic-barrier", "Paladin guides carry Great Magic Barrier once their Faith reaches 24: one to keep for later."),
  paladin(
    "ember-divine",
    "The fork for your Mace. Made Divine, it grows with Faith and keeps some of its Strength scaling; kept Normal, it goes on toward +15 and can take a buff from your miracles later, which a Divine weapon can’t. Paladin guides take either path.",
    { stage: "Divine Mace", sources: [W("mace")] },
  ),
  paladin("extra-havel", "Paladin guides wear Havel’s Ring for heavier armor."),
  paladin("miracle-emit-force", "Emit Force is a ranged attack Paladin guides carry: an orb that bursts into a shockwave where it lands."),
  paladin(
    "ember-dark",
    "If your Mace went Divine, it forks again here: Occult has less base magic damage but keeps what grows with Faith, and stops at +5, while a Divine weapon goes further.",
    { stage: "Occult Mace, if you take it", sources: [W("occult")] },
  ),
  paladin("ember-very-large", "On the Normal path this takes your Mace on to +15, as far as it goes, and it can still take a buff from your miracles.", {
    stage: "Mace +15, on the Normal path",
    sources: [W("divine")],
  }),
  paladin("quest-reah-pit", "Replenishment is one Paladin guides carry: it heals you slowly for a while, and needs 16 Faith."),
  paladin("quest-reah", "Of her stock, Wrath of the Gods is the one Paladin guides carry, once their Faith reaches 28."),
  paladin("ember-large-divine", "If your Mace stayed Divine rather than Occult, this takes it on from +5 to +10.", { stage: "Divine Mace +10" }),
  paladin("invasion-leeroy", "Sanctus is the shield Paladin guides end on: it heals you slowly while you carry it, and needs 18 Faith."),
  paladin("quest-patches", "The Canvas Talisman is the talisman Paladin guides name: a Cleric starts with one, and anyone else can buy it here."),
  paladin(
    "boss-gwyndolin",
    "Sunlight Blade is the buff Paladin guides put on their Normal weapon: lightning for a minute. It needs 30 Faith, and a Divine weapon can’t take it.",
    { sources: [steamPaladin[1]] },
  ),
  paladin("ring-favor-protection", "Paladin guides wear the Ring of Favor and Protection to the end, for more HP, stamina and equip load."),
  paladin("ring-sun-firstborn", "Paladin guides wear the Ring of the Sun’s Firstborn for their attack miracles, which it makes a fifth stronger."),
  paladin("quest-domhnall-firelink", "Once Gwyndolin is dead his stock adds the Crown of the Dark Sun, for 10,000 souls: the helm Paladin guides cast in.", {
    sources: [W("domhnall-of-zena")],
  }),
  // Pyromancer
  pyromancer("route-andre", "Take the Hand Axe to +5 here, with Titanite Shards at 800 souls each: your flame can’t be reinforced yet, so the axe does most of the early fighting.", {
    stage: "Hand Axe +5",
  }),
  pyromancer("quest-griggs", "A Pyromancer’s 10 Intelligence is enough to shop with him, for the Bellowing Dragoncrest Ring: 20,000 souls, and it raises pyromancy damage as well as sorcery.", {
    sources: [W("classes")],
  }),
  pyromancer(
    "quest-laurentius",
    "You have Fireball already. Your Pyromancy Flame is the part that matters: no stat you level raises your pyromancies’ damage, so Pyromancer guides take its upgrades as far as they go. +5 costs 10,500 souls.",
    { sources: [W("pyromancer")] },
  ),
  pyromancer("quest-laurentius-after-depths", "The flame’s next five levels cost 43,000 souls in all, from 5,500 for +6 to 12,000 for +10.", { for: ["pyromancer", "pyromancy"] }),
  pyromancer("route-swamp-bonfire", "Poison Mist, on that corpse, is a cloud that poisons whatever walks into it; Pyromancer guides carry it."),
  pyromancer("pyromancy-power-within", "Power Within raises your damage while it drains your HP: a buff Pyromancer guides carry."),
  pyromancer("covenant-chaos-servant", "Great Chaos Fireball is one Pyromancer guides keep. Offering 30 Humanity here later raises you to rank +2, which gives Chaos Storm."),
  pyromancer("quest-eingyi", "If you picked up Poison Mist past the swamp bonfire, you needn’t buy his for 10,000 souls; Toxic Mist costs 25,000."),
  pyromancer(
    "quest-quelaana",
    "Of her stock, Pyromancer guides take Great Combustion, 5,000 souls, and Fire Whip, 10,000. She or Laurentius takes your flame from +10 to +15 for 96,000 souls, but only she ascends it.",
    { sources: [W("laurentius")] },
  ),
  pyromancer("quest-dusk", "In the Antiquated Set, the Crown of Dusk is the piece Pyromancer guides wear: it raises your spells’ damage and lowers your magic defense."),
  pyromancer(
    "route-vamos",
    "Bring your +5 Hand Axe, or any +5 Normal weapon, and a Green Titanite Shard for a Fire weapon: it no longer grows with Strength or Dexterity, so it needs no stat you level, like your pyromancies.",
    { stage: "Fire weapon" },
  ),
  pyromancer(
    "ember-chaos-flame",
    "If you want it, Vamos turns your Fire +5 weapon Chaos with this and a Red Titanite Chunk: its damage then grows with your Humanity, up to 10.",
    { stage: "Chaos weapon, if you take it" },
  ),
  pyromancer("pyromancy-fire-tempest", "Fire Tempest is the late pyromancy Pyromancer guides end on: pillars of fire all around you."),
  pyromancer("ring-dark-wood-grain", "Pyromancer guides wear the Dark Wood Grain Ring for a faster roll in light armor."),

  // Quality
  quality("pickup-claymore", "The Claymore is the weapon Quality guides name, carried at +15, as far as the Normal path goes. It needs 16 Strength and 10 Dexterity, or 11 Strength in both hands.", {
    stage: "Claymore",
  }),
  quality("route-andre", "Take your Claymore to +5 here, with Titanite Shards at 800 souls each, and keep it Normal from then on: each Normal level adds to what it gets from both your Strength and your Dexterity.", {
    stage: "Claymore +5",
  }),
  quality("ember-large", "This takes your Claymore on to +10. Raw would stop at +5 and cut the Strength and Dexterity scaling a Quality build levels for.", {
    stage: "Claymore +10",
  }),
  quality("ember-very-large", "Your Claymore goes to +15 with this, as far as any weapon goes; that last level takes a Titanite Slab.", { stage: "Claymore +15" }),

  // Pure Strength
  strength("pickup-zweihander", "The Zweihander is an early weapon Strength guides fight with. In both hands it needs 16 Strength and 10 Dexterity, three levels from where a Warrior or a Bandit starts.", {
    stage: "Zweihander",
  }),
  strength("route-andre", "Take the Zweihander to +5 here, with Titanite Shards at 800 souls each, and keep it Normal: each Normal level adds to what it gets from your Strength.", {
    stage: "Zweihander +5",
  }),
  strength("ember-large", "This takes the Zweihander on to +10. Raw would stop at +5 and cut what it gets from your Strength, the stat you level.", { stage: "Zweihander +10" }),
  strength("pickup-great-club", "The Great Club is a heavier weapon some Strength guides take up: 19 Strength holds it in both hands, 28 in one.", {
    stage: "Great Club, if you take it",
  }),
  strength(
    "quest-shiva-shop",
    "Of his stock, the Demon’s Greataxe is the axe Strength guides end on, at +15. It costs 10,000 souls: buy it while you can shop here, and swing it once you have 31 Strength for both hands, 46 for one.",
    { stage: "Demon’s Greataxe, at 31 Strength" },
  ),
  strength("ember-very-large", "Once you swing the Demon’s Greataxe, this takes it to +15, as far as any weapon goes; until then it can take the Zweihander there. The last level takes a Titanite Slab.", {
    stage: "Demon’s Greataxe +15, once you swing it",
  }),
  strength("ring-red-tearstone", "Strength guides wear the Red Tearstone Ring: your attack rises by half while your HP is below a fifth."),

  // Pure Dexterity
  dexterity("route-andre", "Take your Scimitar to +5 here, with Titanite Shards at 800 souls each, and keep it Normal: each Normal level adds to what it gets from your Dexterity.", {
    stage: "Scimitar +5",
  }),
  dexterity("ember-large", "This takes your Scimitar on to +10. Raw would stop at +5 and cut what it gets from your Dexterity, the stat you level.", { stage: "Scimitar +10" }),
  dexterity("pickup-blighttown-iaito", "The Iaito is a katana Dexterity guides take up once their Dexterity reaches 20.", { stage: "Iaito, at 20 Dexterity" }),
  dexterity("pickup-estoc", "The Estoc is a thrusting sword Dexterity guides carry, and a Wanderer can use it now: it needs 10 Strength and 12 Dexterity.", {
    stage: "Estoc, if you take it",
  }),
  dexterity(
    "quest-shiva-shop",
    "Of his stock, the Uchigatana is the katana Dexterity guides keep to the end, at +15: 5,000 souls, and its cuts make the target bleed. A Wanderer can hold it in both hands now.",
    { stage: "Uchigatana", sources: [W("wanderer")] },
  ),
  dexterity("ember-very-large", "Your Uchigatana goes to +15 with this, as far as any weapon goes; the last level takes a Titanite Slab.", { stage: "Uchigatana +15" }),
  dexterity("pickup-great-scythe", "Some Dexterity guides fight with the Great Scythe instead of a katana, kept Normal to +15. It needs 14 Strength and 14 Dexterity.", {
    stage: "Great Scythe, if you take it",
    sources: [gamevoyagersWanderer[1]],
  }),
  dexterity(
    "rare-weapon-quelaags-furysword",
    "The Giant Blacksmith makes it from your Scimitar +10, or any +10 curved sword, for 5,000 souls: Quelaag’s Furysword is the curved sword Dexterity guides carry beside their katana, and its fire grows with your Humanity.",
    { stage: "Quelaag’s Furysword", sources: [W("quelaag-s-furysword")] },
  ),
  dexterity("ring-leo", "Dexterity guides wear the Leo Ring: counterattacks with a thrusting weapon hit harder."),

  // Melee builds together
  shared("pickup-grass-crest-shield", ["quality", "dexterity", "dex-faith"], "Guides for this build carry the Grass Crest Shield: your stamina comes back faster with it, even with your weapon in both hands."),
  shared("route-giant-blacksmith", ["quality", "strength", "dexterity", "magic-knight", "dex-faith"], "From +10, a Normal weapon can go Lightning here: lightning damage in place of what it gets from your stats."),
  shared("extra-havel", ["strength", "sorcerer", "dex-faith"], "Guides for this build wear Havel’s Ring: half again as much equip load, for heavier armor."),
  shared("ring-favor-protection", ["strength", "dexterity", "faith", "dex-faith"], "Guides for this build wear the Ring of Favor and Protection to the end, for more HP, stamina and equip load."),

  // Sorcerer
  sorcerer(
    "route-andre",
    "Andre sells a Longsword for 1,000 souls, the early weapon Sorcerer guides take up, and a Sorcerer can hold it in both hands now. Take it to +5 and stop there: a Normal +5 weapon is what can later be made Magic, to grow with Intelligence.",
    { stage: "Longsword +5" },
  ),
  sorcerer(
    "quest-griggs",
    "You start with Soul Arrow, and a second copy, 1,000 souls here, gives you twice the casts. Sorcerer guides move on to Great Heavy Soul Arrow, 8,000, at 16 Intelligence, and wear the Bellowing Dragoncrest Ring, 20,000, which makes your sorceries hit a fifth harder.",
    { sources: [W("soul-arrow"), W("bellowing-dragoncrest-ring")] },
  ),
  sorcerer("route-rickert", "Bring your +5 Longsword and a Green Titanite Shard for a Magic weapon, the path Sorcerer guides take: its damage then grows with your Intelligence, and it goes on to +10 later.", {
    stage: "Magic Longsword",
  }),
  sorcerer("quest-dusk", "Of the Antiquated Set, the Crown of Dusk is the piece Sorcerer guides wear: your sorceries hit a fifth harder, and your magic defense falls by nearly a third.", {
    sources: [W("crown-of-dusk")],
  }),
  sorcerer("quest-logan", "What he sells asks more Intelligence to cast: Homing Soulmass, 20,000 souls, needs 18, and Soul Spear, 40,000, needs 36."),
  sorcerer("sorcery-crystal-soul-spear", "Buy it here for 50,000 souls even before your Intelligence reaches the 44 it needs: Crystal Soul Spear is the main attack Sorcerer guides end on."),
  sorcerer(
    "rare-weapon-seath-tail",
    "The Moonlight Greatsword is the weapon Sorcerer guides end on: its damage grows with your Intelligence, and it needs 28 of it, with 16 Strength, or 11 in both hands.",
    { stage: "Moonlight Greatsword" },
  ),
  sorcerer("sorcery-white-dragon-breath", "White Dragon Breath, a beam of crystal that leaves spikes along the ground, is one Sorcerer guides add once their Intelligence reaches 50."),
  sorcerer("ember-large-magic", "If your Longsword stayed Magic rather than going Enchanted, this is its last stretch: +10 is as far as Magic goes.", {
    stage: "Magic Longsword +10, if it stayed Magic",
  }),

  // Magic Knight
  magicKnight(
    "route-andre",
    "Take your weapon to +5 here, with Titanite Shards at 800 souls each. That’s where its paths part: a Normal +5 weapon can later be made Magic, to grow with Intelligence, or stay Normal and keep growing with your Dexterity.",
    { stage: "Your weapon +5" },
  ),
  magicKnight("ember-large", "On the Normal path this takes your weapon past +5. If you might make it Magic, leave it at +5: Magic starts from a Normal +5 weapon.", {
    stage: "Your weapon +10, on the Normal path",
  }),
  magicKnight(
    "route-rickert",
    "The fork for your weapon. Made Magic, it grows with Intelligence but gets less from your Dexterity, and it can’t take a buff; kept Normal, it can take a sorcery’s buff later.",
    { stage: "Magic weapon, if you take it" },
  ),
  magicKnight("rare-weapon-velkas-rapier", "Velka’s Rapier, behind those planks, grows with both your Dexterity and your Intelligence and needs 16 of each: a Magic Knight guide keeps it beside its main blade.", {
    stage: "Velka’s Rapier",
  }),
  magicKnight("ember-very-large", "If your weapon stayed Normal, this takes it on to +15, as far as any weapon goes.", { stage: "Your weapon +15, on the Normal path" }),
  magicKnight("sorcery-crystal-magic-weapon", "Crystal Magic Weapon is the buff Magic Knight guides lay on a Normal weapon, which a Magic one can’t take; casting it takes 25 Intelligence."),
  magicKnight(
    "rare-weapon-seath-tail",
    "The Moonlight Greatsword is what Magic Knight guides end on: its damage grows with your Intelligence, which it needs 28 of, with 16 Strength, or 11 in both hands.",
    { stage: "Moonlight Greatsword" },
  ),
  magicKnight("ember-large-magic", "If your weapon went Magic and stayed so rather than going Enchanted, this is its last stretch: +10 is as far as Magic goes.", {
    stage: "Magic weapon +10, if it stayed Magic",
  }),

  // Sorcerer and Magic Knight together
  shared("ember-enchanted", ["sorcerer", "magic-knight"], "If your weapon went Magic, it forks here: Enchanted grows faster with Intelligence but stops at +5, while Magic goes on to +10 later."),
  shared(
    "quest-logans-cell",
    ["sorcerer", "magic-knight"],
    "His Archives stock adds the Crystal sorceries, Crystal Magic Weapon, Homing Crystal Soulmass and Crystal Soul Spear, each with a row of its own in this chapter.",
  ),
  shared(
    "sorcery-homing-crystal-soulmass",
    ["sorcerer", "magic-knight"],
    "Guides for this build carry Homing Crystal Soulmass to the end. It costs 30,000 souls, and casting it takes 24 Intelligence.",
  ),
  shared(
    "quest-logan-finish",
    ["sorcerer", "magic-knight"],
    "The Tin Crystallization Catalyst he drops hits hardest of any catalyst at high Intelligence, but halves your casts. Guides for this build carry it; it needs 32 Intelligence.",
  ),
  shared(
    "quest-logan-study",
    ["sorcerer", "magic-knight"],
    "Logan’s Catalyst is the one guides for this build cast with when casts count: it keeps them all, where the Tin halves them. It needs 24 Intelligence, though below 40 other catalysts cast harder.",
    { sources: [W("tin-crystallization-catalyst")] },
  ),

  // Pure Faith
  faith("pickup-claymore", "Pure Faith guides keep the Claymore to the end, and it grows with your Faith once it’s made Divine later. A Cleric holds it in both hands after two levels of Dexterity: it needs 10.", {
    stage: "Claymore",
    sources: [W("cleric")],
  }),
  faith("route-andre", "Take your Claymore to +5 here, with Titanite Shards at 800 souls each, and stop there: Divine, which grows with Faith, starts from a Normal +5 weapon.", {
    stage: "Claymore +5",
  }),
  faith("miracle-great-magic-barrier", "Pure Faith guides list Great Magic Barrier, for once your Faith reaches 24: it cuts the magic damage you take for a while.", {
    sources: [W("great-magic-barrier")],
  }),
  faith("ring-wolf", "Some Pure Faith guides wear the Wolf Ring: 40 more poise, so blows interrupt you less."),
  faith("ember-divine", "Make your +5 Claymore a Divine weapon here, the path Pure Faith guides take: its damage then grows with your Faith, though it can no longer take a buff.", {
    stage: "Divine Claymore",
  }),
  faith("miracle-emit-force", "Pure Faith guides carry Emit Force, a ranged orb that bursts into a shockwave where it lands."),
  faith(
    "ember-dark",
    "Here your Divine Claymore +5 can become an Occult weapon, the path Pure Faith guides end on: less base magic damage, but what grows with your Faith stays, and it stops at +5.",
    { stage: "Occult Claymore" },
  ),
  faith("quest-reah-pit", "Replenishment, her thanks, is one Pure Faith guides carry: it heals you slowly for a while, and needs 16 Faith."),
  faith("quest-reah", "Of her stock, Wrath of the Gods is the one Pure Faith guides carry once their Faith reaches 28: a shockwave around you that knocks most enemies down."),
  faith("ember-large-divine", "If your Claymore stayed Divine rather than going Occult, this takes it on from +5 to +10.", { stage: "Divine Claymore +10, if it stayed Divine" }),
  faith("covenant-sunlight", "Great Lightning Spear, for the 10 medals, is the spear Pure Faith guides end on; it needs 30 Faith."),
  faith(
    "quest-darkmoon-rank",
    "The rank gives the Darkmoon Talisman too, the talisman Pure Faith guides end on: it needs 24 Faith, and casts harder than the Canvas Talisman once your Faith passes 39.",
    { sources: [W("darkmoon-talisman")] },
  ),
  faith(
    "boss-gwyndolin",
    "Sunlight Blade is lightning on a Normal weapon for a minute, at 30 Faith. Your Divine or Occult Claymore can’t take it, so Pure Faith guides that carry it keep a Normal weapon for it.",
    { sources: [W("divine"), W("occult")] },
  ),
  faith("ring-sun-firstborn", "Pure Faith guides wear the Ring of the Sun’s Firstborn: your attack miracles hit a fifth harder."),
  faith("quest-domhnall-firelink", "With Gwyndolin dead he adds the Crown of the Dark Sun to his stock, for 10,000 souls: Pure Faith guides cast in it.", {
    sources: [W("domhnall-of-zena")],
  }),

  // Dex/Faith
  dexFaith("route-andre", "Take your weapon to +5 here, with Titanite Shards at 800 souls each: it carries you until you have the Dexterity for this build’s own weapons.", {
    stage: "Your weapon +5",
  }),
  dexFaith("ember-large", "This takes your weapon on to +10, to carry you while your Dexterity climbs toward a katana’s needs; Raw would stop at +5.", { stage: "Your weapon +10" }),
  dexFaith("pickup-blighttown-iaito", "The Iaito is one of the katanas Dex/Faith guides take to +15 and buff, once their Dexterity reaches 20.", { stage: "Iaito, at 20 Dexterity" }),
  dexFaith(
    "quest-shiva-shop",
    "Of his stock, the Uchigatana is the katana Dex/Faith guides keep Normal to +15 and buff, since a Divine weapon can’t take a buff: 5,000 souls, and it needs 14 Dexterity.",
    { stage: "Uchigatana", sources: [W("divine")] },
  ),
  dexFaith("ember-very-large", "Your Uchigatana goes on to +15 with this, as far as any weapon goes, and stays a weapon your buffs can take. The last level takes a Titanite Slab.", {
    stage: "Uchigatana +15",
  }),
  dexFaith("pickup-great-scythe", "The Great Scythe is one Dex/Faith guides take to +15 and buff instead of a katana; it needs 14 Strength and 14 Dexterity.", {
    stage: "Great Scythe, if you take it",
  }),
  dexFaith("quest-darkmoon-rank", "Darkmoon Blade is the buff Dex/Faith guides end on: magic damage on your weapon for a minute, once your Faith reaches 30."),
  dexFaith(
    "boss-gwyndolin",
    "Sunlight Blade is the other buff Dex/Faith guides carry: lightning on your weapon for a minute, at 30 Faith. It won’t stack with Darkmoon Blade.",
  ),
  dexFaith("pickup-ricards-rapier", "Ricard’s Rapier is a thrusting sword Dex/Faith guides take to +15 and buff; it needs 20 Dexterity.", { stage: "Ricard’s Rapier, if you take it" }),

  // Pure Faith and Dex/Faith together
  shared(
    "covenant-way-of-white",
    ["faith", "dex-faith"],
    "Starting as a Cleric, you have a talisman and Heal already, so you need nothing from him yet. Any other class needs the Talisman, 1,000 souls, and Heal, 4,000, which takes 12 Faith.",
  ),

  // Pyromancy, beside another build
  pyromancy(
    "quest-laurentius",
    "Melee guides carry a Pyromancy Flame beside their weapon. No stat you level raises your pyromancies’ damage; the flame’s upgrades, for souls, do.",
    { sources: [W("pyromancer"), W("pyromancy-flame"), FX("Laurentius+of+the+Great+Swamp")] },
  ),
  pyromancy("covenant-chaos-servant", "Great Chaos Fireball is a pyromancy that guides with a flame beside their weapon keep."),
  pyromancy("quest-quelaana", "Guides with a flame beside their weapon take two of hers: Great Combustion, a close burst for 5,000 souls, and Great Fireball, thrown at range, for 20,000."),
  pyromancy("route-vamos", "A Fire weapon stops growing with Strength or Dexterity: if yours grows with a stat your build levels, leave it as it is."),
  pyromancy("pyromancy-fire-tempest", "Some guides with a flame beside their weapon end on Fire Tempest: pillars of fire all around you."),
  shared(
    "pyromancy-power-within",
    ["pyromancy", "dex-faith"],
    "Guides for this build use Power Within: two fifths more damage for 100 seconds, while it drains your HP. It’s a pyromancy, so it needs a Pyromancy Flame, which Laurentius gives you if you lack one.",
    { sources: [W("laurentius"), W("pyromancy-flame"), FX("Pyromancies")] },
  ),
];

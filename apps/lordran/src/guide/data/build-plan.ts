import type { BuildPick, BuildTask, NamedBuild, SourceLink } from "@hundo/core/types";

/**
 * Lordran's named builds, what build guides use for them, and the steps each takes (core's Builds, docs/chapter-data.md#builds). Research
 * notes for every pick and step, with the guides read and what they disagree on, are in the builds research of 21 Nov 2026.
 *
 * A pick needs two independent hosts, at least one a guide that lays a build out (`guides`: Fextralife's build pages, which count as one
 * host however many, gamevoyagers' class guides, magicgameworld's build pages); a ranked "best builds" list (`lists`: TheGamer, Gameranx,
 * GamersDecide, High Ground Gaming, fandomspot) is a second voice only. Forum threads and machine-written pages don't count. Quality,
 * Pure Faith, Paladin and Dex/Faith have no picks yet: their guides' picks stand on lists, or on a guide for another build, so they show
 * their steps and facts. facts-to-verify.md holds what stands on less.
 *
 * A step sits on the row whose tick means it's done, and says nothing its chapter hasn't reached.
 */

const F = (page: string): SourceLink => ["Fextralife", `https://darksouls.wiki.fextralife.com/${page}`];
const gamevoyagersPyro: SourceLink = ["gamevoyagers", "https://gamevoyagers.com/?p=2011999"];
const gamevoyagersSorcerer: SourceLink = ["gamevoyagers", "https://gamevoyagers.com/?p=2012286"];
const magicgameworldSorcery: SourceLink = ["magicgameworld", "https://www.magicgameworld.com/dark-souls-remastered-pure-sorcery-magic-pvp-character-build/"];
const magicgameworldStrength: SourceLink = ["magicgameworld", "https://magicgameworld.com/?p=19514"];
const magicgameworldDexterity: SourceLink = ["magicgameworld", "https://www.magicgameworld.com/?p=19512"];
const theGamer: SourceLink = ["TheGamer", "https://www.thegamer.com/dark-souls-best-builds/"];
const gameranx: SourceLink = ["Gameranx", "https://gameranx.com/features/id/232570/article/20-best-dark-souls-builds-that-will-make-you-wanna-replay/"];
const gamersDecide: SourceLink = ["GamersDecide", "https://www.gamersdecide.com/articles/dark-souls-remastered-best-builds"];
const gamersDecideDex: SourceLink = ["GamersDecide", "https://www.gamersdecide.com/articles/dark-souls-remastered-best-dex-weapons"];
const gamersDecideInt: SourceLink = ["GamersDecide", "https://www.gamersdecide.com/articles/dark-souls-remastered-best-intelligence-weapons"];
const highGround: SourceLink = ["High Ground Gaming", "https://www.highgroundgaming.com/dark-souls-remastered-best-beginner-class-build/"];
const fandomspot: SourceLink = ["FandomSpot", "https://www.fandomspot.com/ds1-dex-weapons/"];

const W = (page: string) => `https://darksouls.wikidot.com/${page}`;
const FX = (page: string) => `https://darksouls.wiki.fextralife.com/${page}`;

export const named: NamedBuild[] = [
  { id: "quality", name: "Quality", stats: ["str", "dex"], blurb: "Strength and Dexterity together: weapons that grow with both." },
  { id: "strength", name: "Pure Strength", stats: ["str"], blurb: "Heavy weapons that hit hard and grow with Strength." },
  { id: "dexterity", name: "Pure Dexterity", stats: ["dex"], blurb: "Fast blades and katanas that grow with Dexterity, bleed among them." },
  { id: "sorcerer", name: "Sorcerer", stats: ["int"], blurb: "Sorceries from a catalyst, growing with Intelligence." },
  { id: "magic-knight", name: "Magic Knight", stats: ["dex", "int"], blurb: "A Dexterity blade beside sorceries: buffs, and weapons that grow with Intelligence." },
  { id: "faith", name: "Pure Faith", stats: ["fth"], blurb: "Miracles from a talisman: lightning, healing and buffs." },
  { id: "paladin", name: "Paladin", stats: ["str", "fth"], blurb: "Strength weapons, with miracles to heal and buff." },
  { id: "dex-faith", name: "Dex/Faith", stats: ["dex", "fth"], blurb: "Fast weapons, with miracles to buff them." },
  { id: "pyromancer", name: "Pyromancer", stats: ["pyro"], blurb: "Fire from a flame you upgrade with souls. No casting stat." },
  { id: "pyromancy", name: "Pyromancy", stats: ["pyro"], blurb: "A flame beside any build: it needs no stat.", addon: true },
  { id: "chaos", name: "Chaos weapons", stats: ["hum"], blurb: "Weapons that grow with Humanity, up to 10.", addon: true },
];

export const picks: BuildPick[] = [
  // Chapter 1
  {
    row: "pickup-firelink-graveyard",
    for: ["strength"],
    kind: "weapon",
    item: "Zweihander",
    why: "an ultra greatsword that grows with Strength, found in the first chapter",
    guides: [F("Throned's+CMW+Strength+Build")],
    lists: [gamersDecide, highGround],
    sources: [W("zweihander")],
  },
  // Chapter 2
  {
    row: "quest-laurentius",
    for: ["pyromancer", "pyromancy"],
    kind: "catalyst",
    item: "Pyromancy Flame",
    why: "taken to +15, then ascended: only its upgrades raise a pyromancy’s damage",
    guides: [F("Pyromaniac+Build"), gamevoyagersPyro],
    lists: [gameranx],
    sources: [W("pyromancy-flame")],
  },
  {
    row: "quest-griggs",
    for: ["sorcerer"],
    kind: "spell",
    item: "Great Heavy Soul Arrow",
    why: "an efficient attack for the middle of the game, which Griggs sells for 8,000 souls",
    guides: [F("Magic+User+Guide"), gamevoyagersSorcerer],
    sources: [W("griggs-of-vinheim")],
  },
  {
    row: "quest-griggs",
    for: ["sorcerer", "pyromancer"],
    kind: "ring",
    item: "Bellowing Dragoncrest Ring",
    why: "raises sorcery and pyromancy damage; Griggs sells it for 20,000 souls",
    guides: [F("Magic+User+Guide"), gamevoyagersSorcerer, magicgameworldSorcery, F("Pyromaniac+Build")],
    lists: [theGamer],
    sources: [W("bellowing-dragoncrest-ring")],
  },
  // Chapter 3
  {
    row: "pickup-iaito",
    for: ["dexterity"],
    kind: "weapon",
    item: "Iaito",
    why: "a katana that grows with Dexterity",
    guides: [F("Sonho's+CWM+Build+(Dex)")],
    lists: [fandomspot],
    sources: [W("iaito-sword")],
  },
  {
    row: "covenant-chaos-servant",
    for: ["pyromancer", "pyromancy"],
    kind: "spell",
    item: "Great Chaos Fireball",
    why: "a ranged burst, the covenant’s gift on joining",
    guides: [F("Pyromaniac+Build")],
    lists: [theGamer],
    sources: [W("chaos-servant")],
  },
  {
    row: "quest-quelaana",
    for: ["pyromancer", "pyromancy"],
    kind: "spell",
    item: "Great Combustion",
    why: "a close-range burst, from Quelana for 5,000 souls",
    guides: [F("Pyromaniac+Build")],
    lists: [theGamer, gameranx],
    sources: [W("quelaana-of-izalith"), FX("Pyromancies")],
  },
  {
    row: "pyromancy-power-within",
    for: ["pyromancer"],
    kind: "spell",
    item: "Power Within",
    why: "raises your damage while it drains your HP",
    guides: [F("Chaos+Build")],
    lists: [theGamer],
    sources: [FX("Pyromancies")],
  },
  // Chapter 4
  {
    row: "quest-shiva-shop",
    for: ["dexterity"],
    kind: "weapon",
    item: "Uchigatana",
    why: "a katana that grows with Dexterity and makes its target bleed; Shiva sells it for 5,000 souls",
    guides: [F("Samurai+(build)"), magicgameworldDexterity],
    lists: [gamersDecideDex],
    sources: [W("uchigatana"), W("shiva-of-the-east")],
  },
  {
    row: "quest-dusk",
    for: ["sorcerer"],
    kind: "armor",
    item: "Crown of Dusk",
    why: "raises your spells’ damage, at the cost of magic defense",
    guides: [F("Magic+User+Guide"), magicgameworldSorcery],
    sources: [W("crown-of-dusk")],
  },
  {
    row: "extra-havel",
    for: ["strength", "sorcerer"],
    kind: "ring",
    item: "Havel’s Ring",
    why: "half again as much equip load, for heavier armor",
    guides: [magicgameworldStrength, F("Magic+User+Guide"), magicgameworldSorcery],
    lists: [gamersDecide],
    sources: [W("havel-s-ring")],
  },
  // Chapter 5
  {
    row: "pickup-painted-annex",
    for: ["magic-knight"],
    kind: "weapon",
    item: "Velka’s Rapier",
    why: "a rapier that grows with Dexterity and Intelligence",
    guides: [F("VelkaKnight")],
    lists: [gamersDecideInt],
    sources: [W("velka-s-rapier")],
  },
  // Chapter 7
  {
    row: "rare-weapon-seath-tail",
    for: ["sorcerer", "magic-knight"],
    kind: "weapon",
    item: "Moonlight Greatsword",
    why: "the caster’s greatsword: it grows with Intelligence",
    guides: [gamevoyagersSorcerer, magicgameworldSorcery, F("Moonlight+Warrior")],
    lists: [gamersDecideInt],
    sources: [W("moonlight-greatsword")],
  },
  {
    row: "sorcery-crystal-soul-spear",
    for: ["sorcerer"],
    kind: "spell",
    item: "Crystal Soul Spear",
    why: "the late main attack; only Logan sells it, for 50,000 souls",
    guides: [gamevoyagersSorcerer, F("Moonlight+Sorcerer")],
    sources: [W("big-hat-logan")],
  },
  {
    row: "sorcery-crystal-magic-weapon",
    for: ["magic-knight"],
    kind: "spell",
    item: "Crystal Magic Weapon",
    why: "a buff for a fast sword with no magic of its own, such as a Longsword",
    guides: [gamevoyagersSorcerer, F("Darkmoon+Battlemage")],
    sources: [W("crystal-magic-weapon")],
  },
  {
    row: "quest-logan-study",
    for: ["sorcerer"],
    kind: "catalyst",
    item: "Logan’s Catalyst",
    why: "the catalyst guides switch to once Intelligence passes about 40",
    guides: [F("Magic+User+Guide"), gamevoyagersSorcerer, magicgameworldSorcery],
    sources: [W("logan-s-catalyst")],
  },
  // Chapter 8
  // Chapter 9
  {
    row: "pyromancy-fire-tempest",
    for: ["pyromancer", "pyromancy"],
    kind: "spell",
    item: "Fire Tempest",
    why: "pillars of fire all around you",
    guides: [F("Pyromaniac+Build")],
    lists: [theGamer],
    sources: [FX("Pyromancies")],
  },
  // Chapter 11
  {
    row: "ring-dark-wood-grain",
    for: ["pyromancer"],
    kind: "ring",
    item: "Dark Wood Grain Ring",
    why: "a faster roll for a caster in light armor",
    guides: [F("Pyromaniac+Build")],
    lists: [theGamer],
    sources: [W("dark-wood-grain-ring")],
  },
  {
    row: "ring-favor-protection",
    for: ["strength", "dexterity"],
    kind: "ring",
    item: "Ring of Favor and Protection",
    why: "more HP, stamina and equip load; taking it off breaks it",
    guides: [F("Strength+GMW"), F("Samurai+(build)")],
    lists: [gamersDecide],
    sources: [W("ring-of-favor-and-protection")],
  },
  {
    row: "rare-weapon-black-knight-greataxe",
    for: ["strength"],
    kind: "weapon",
    item: "Black Knight Greataxe",
    why: "a heavy axe that grows with Strength",
    guides: [magicgameworldStrength],
    lists: [gamersDecide],
    sources: [W("black-knight-greataxe")],
  },
  {
    row: "reinforcement-chaos",
    for: ["chaos"],
    kind: "weapon",
    item: "A Chaos weapon at +5",
    why: "with your Humanity kept near 10",
    guides: [F("Chaos+Pyro+Build")],
    lists: [gameranx],
    sources: [W("chaos")],
  },
];

export const tasks: BuildTask[] = [
  // Chapter 1
  {
    row: "covenant-way-of-white",
    serves: ["fth"],
    title: "Buy a talisman and Heal from Petrus",
    text: "He sells the Talisman for 1,000 souls and Heal, which needs 12 Faith, for 4,000. A later seller asks less for the same miracles.",
    sources: [W("petrus-of-thorolund")],
  },
  {
    row: "route-andre",
    serves: ["str", "dex"],
    title: "Find Andre, your smith",
    text: "He takes a Normal weapon to +5 with Titanite Shards, which he sells for 800 souls each. Past +5 he needs an ember.",
    sources: [W("andre-of-astora"), FX("Blacksmith+Andre")],
  },
  // Chapter 2
  {
    row: "quest-griggs",
    serves: ["int"],
    title: "Buy your first sorceries from Griggs",
    text: "With 10 Intelligence he trades at Firelink: Soul Arrow for 1,000 souls, Great Soul Arrow for 6,000 and Great Heavy Soul Arrow for 8,000, and his two Dragoncrest rings for 20,000 each.",
    sources: [W("griggs-of-vinheim"), FX("Griggs+of+Vinheim")],
  },
  {
    row: "ember-large",
    serves: ["str", "dex"],
    title: "Take the Large Ember to Andre",
    text: "With it he takes a Normal weapon from +5 to +10, or turns a +5 weapon Raw.",
    sources: [W("large-ember"), W("andre-of-astora")],
  },
  {
    row: "quest-laurentius",
    serves: ["pyro"],
    title: "Buy his pyromancies and start on the flame",
    text: "Laurentius sells Fireball for 800 souls and Combustion for 500, and reinforces the Pyromancy Flame for souls alone: 10,500 to reach +5. A Pyromancer starts with a flame; anyone else gets one from him.",
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
    text: "He turns a +5 Normal weapon Magic with a Green Titanite Shard, so it grows with Intelligence, and sells Soul Arrow for 2,000 souls.",
    sources: [W("rickert-of-vinheim"), FX("Rickert+of+Vinheim")],
  },
  {
    row: "covenant-chaos-servant",
    serves: ["pyro"],
    title: "Join for Great Chaos Fireball",
    text: "Joining gives Great Chaos Fireball. Offering 30 Humanity later raises you to rank +2, which gives Chaos Storm.",
    sources: [W("chaos-servant"), FX("Chaos+Servant")],
  },
  {
    row: "quest-eingyi",
    serves: ["pyro"],
    title: "Buy Eingyi’s mists",
    text: "With the egg on your head he sells Poison Mist for 10,000 souls and Toxic Mist for 25,000. Once you’ve joined the covenant at the Fair Lady, he reinforces the flame too.",
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
    row: "quest-shiva-shop",
    serves: ["str", "dex"],
    title: "Shop with Shiva while a Forest Hunter",
    text: "By the waterwheel he sells the Uchigatana for 5,000 souls, the Demon’s Greataxe for 10,000 and the Washing Pole for 20,000.",
    sources: [W("shiva-of-the-east")],
  },
  {
    row: "quest-dusk",
    serves: ["int"],
    title: "Say Yes to Dusk and buy from her",
    text: "Her sign sells Cast Light for 1,000 souls, Hidden Body for 2,000 and the Oolacile Ivory Catalyst for 1,000, each spell needing 14 Intelligence. Summoning her once leaves the Antiquated Set, Crown of Dusk among it.",
    sources: [W("dusk-of-oolacile"), FX("Dusk+of+Oolacile")],
  },
  {
    row: "ember-divine",
    serves: ["fth"],
    title: "Take the Divine Ember",
    text: "Andre then turns a +5 Normal weapon Divine, so it grows with Faith.",
    sources: [W("divine"), FX("Upgrades")],
  },
  // Chapter 5
  {
    row: "route-giant-blacksmith",
    serves: ["str", "dex"],
    title: "Meet the Giant Blacksmith",
    text: "He makes a +10 Normal weapon Lightning, or Crystal once you bring him its ember, and forges weapons from boss souls. A Crystal weapon can’t be repaired, and a Lightning one loses its Strength and Dexterity scaling.",
    sources: [W("giant-blacksmith"), W("crystal"), W("lightning"), FX("Giant+Blacksmith")],
  },
  // Chapter 6
  {
    row: "ember-very-large",
    serves: ["str", "dex"],
    title: "Take the Very Large Ember to Andre",
    text: "He then takes a +10 Normal weapon on to +15; its last level takes a Titanite Slab.",
    sources: [W("embers"), W("titanite-slab")],
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
  // Chapter 8
  {
    row: "route-vamos",
    serves: ["hum"],
    title: "Find Vamos",
    text: "He ascends a +5 Normal weapon to Fire with a Green Titanite Shard: a Chaos weapon starts at Fire +5.",
    sources: [W("vamos"), FX("Blacksmith+Vamos")],
  },
  {
    row: "quest-reah",
    serves: ["fth"],
    title: "Buy Reah’s miracles",
    text: "At the Parish altar she sells Wrath of the Gods and Great Heal for 10,000 souls each, and Magic Barrier for 6,000.",
    sources: [W("rhea-of-thorolund"), FX("Reah+of+Thorolund")],
  },
  // Chapter 11
  {
    row: "covenant-sunlight",
    serves: ["fth"],
    title: "Join for Lightning Spear",
    text: "Joining takes 25 Faith, five less for each boss you’ve helped kill as a white phantom, and gives Lightning Spear; 10 Sunlight Medals give Great Lightning Spear.",
    sources: [FX("Warrior+of+Sunlight")],
  },
  {
    row: "reinforcement-chaos",
    serves: ["hum"],
    title: "Take a Fire weapon down the Chaos path",
    text: "Vamos turns a Fire +5 weapon Chaos with the Chaos Flame Ember and a Red Titanite Chunk, then takes it to +5 with more chunks and a Red Titanite Slab. It grows with your Humanity, up to 10, and loses its Strength and Dexterity scaling.",
    sources: [W("chaos"), FX("Chaos+Upgrades"), W("vamos")],
  },
];

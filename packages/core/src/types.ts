import type { ComponentType } from "react";
import type { IconName } from "./components/Icon";

/**
 * A page the data was written from: provenance for checking it (the tests, docs/chapter-data.md), never shown to readers. Every
 * `sources` and `reference` below is kept for that alone.
 */
export type SourceLink = [label: string, url: string];
/**
 * A page that shows readers where something is, named by its site ("Map on iRedDead"): a map image or an interactive map, opened in a
 * new tab. Kept apart from `sources` and `reference`, which are never shown, so a citation can't come back into view as a map.
 */
export type MapLink = [site: string, url: string];
export type Checks = Record<string, true>;

/** Optional per-row details: an amount that counts toward a category, the page this one row was written from, or its own map. */
export interface RowExtra {
  quantity?: number;
  reference?: string;
  /** Only when it differs from the group's map (data.test.ts refuses a repeat). */
  map?: MapLink;
}

/** [id, tags (the first one is the primary label), title, text, extra] */
export type RawRow = [id: string, tags: string[], title: string, text: string, extra?: RowExtra];

export interface RawGroup {
  title: string;
  location?: string;
  icon?: IconName;
  note?: string;
  sources?: SourceLink[];
  /** One map for every row in the group. */
  map?: MapLink;
  /** A catalogue list: the article layout renders its rows as a compact checklist instead of prose. */
  compact?: boolean;
  rows: RawRow[];
}

export interface RawChapter {
  id: number;
  title: string;
  region: string;
  intro: string;
  /** What the rail shows while the chapter is hidden: a place name, never story. Defaults to "Chapter 03". */
  teaser?: string;
  sources?: SourceLink[];
  groups: RawGroup[];
}

export interface Row {
  id: string;
  title: string;
  text: string;
  chapter: number;
  group: string;
  location?: string;
  /** Every category the entry counts toward; the first is its primary label. */
  tags: string[];
  quantity: number;
  reference?: string;
  map?: MapLink;
}

export interface Group {
  key: string;
  title: string;
  location?: string;
  icon?: IconName;
  note?: string;
  sources: SourceLink[];
  map?: MapLink;
  compact: boolean;
  rows: Row[];
}

export interface Chapter extends Omit<RawChapter, "sources" | "groups"> {
  sources: SourceLink[];
  groups: Group[];
}

export interface Missable {
  /** A row id from the guide data. */
  id: string;
  /** One line for the "Don't miss" strip: the exact condition for losing it. */
  why: string;
  /** At least two independent https sources that agree. */
  sources: string[];
}

/** Another way at a one-way choice: a row in a later playthrough's chapter, ticked and counted like any row. */
export interface ChoiceLater {
  /** The row's id. Its title shows in the choice's block, so it says only what the choice's chapter already says. */
  row: string;
  /** Which playthrough it belongs to, as the block names it: "NG+", "a second save". */
  on: string;
}

/**
 * A one-way choice: ways a single playthrough can't all take. The guide recommends one for this playthrough, a row in the choice's
 * chapter, and puts each other way in a later playthrough's chapter, as a row of its own. Every way counts, so 100% takes the later
 * playthrough too, as endings do. The block draws the recommended row with the later ones named and linked; "Don't miss" lists the
 * recommended row with the why while it's unticked.
 */
export interface Choice {
  /** The way recommended for this playthrough. A row is in one choice at most, and the recommended one is never in `missables` too. */
  row: string;
  /** What the reader decides, naming only what its chapter's rows already say ("Frampt or Kaathe"). */
  name: string;
  /** One line: what makes it one-way. */
  why: string;
  /** The other ways, at least one, each in a chapter after the choice's. */
  later: ChoiceLater[];
  /** At least two independent https sources that agree, as a missable's. */
  sources: string[];
}

/**
 * A way a reader levels their character that the guide can point toward ("Faith"). Its `id` is what a reader's pick saves (core's
 * `store/build.ts`), so it stays once live, as a row id does.
 */
export interface Leaning {
  /** Lowercase letters, digits and hyphens: "str", "fth" (data.test.ts). */
  id: string;
  /** The word the build dialog's stats and a row's tag show: "Dexterity". */
  label: string;
}

/**
 * What a pick's item is, as a build page lays gear out by slot: "catalyst" holds catalysts, talismans and the pyromancy flame, and "path"
 * an upgrade path (an ember, a weapon made Magic or Divine at a smith).
 */
export type BuildKind = "weapon" | "catalyst" | "spell" | "ring" | "armor" | "path";

/**
 * When a pick serves its build, as build guides time it: "starter", what the build can use in its opening hours with its starting class's
 * stats; "upgrade", what it moves to once its stats or its upgrades allow; "endgame", what it ends on.
 */
export type PickRole = "starter" | "upgrade" | "endgame";

/**
 * How build guides start a named build: the class, and the weapon that class starts with, the first stage of the build's weapon track. It
 * shows in the build dialog from the reader's first tick, so it names nothing past the first chapter.
 */
export interface BuildStart {
  /** The class, as the game names it, with its article: "a Cleric", "a Bandit or a Warrior". */
  class: string;
  /** The weapon that class starts with, as the game names it ("Hand Axe"), where the track starts from it: starting gear has no row. */
  weapon?: string;
  /** What guides say the start is for, where they say it ("carries the early game while your casts are few"). Needs `weapon`. */
  why?: string;
  /** Build guides that start it so, under a pick's rule: a guide for this build and two independent hosts in all. */
  guides: BuildGuide[];
  lists?: BuildGuide[];
  /** https pages for the class's gear and any fact in `why`. */
  sources: string[];
}

/**
 * A build readers know by name ("Pyromancer", "Quality"), as build guides name it: a set of leanings, so a reader's pick (saved as leaning
 * ids) is this build when it holds exactly these. An add-on ("Pyromancy" beside a melee build) is a set the pick may hold on top of a
 * named build. Data only: its id is never saved, so it may change.
 */
export interface NamedBuild {
  /** Lowercase letters, digits and hyphens, what a pick's `for` names: "dex-faith". */
  id: string;
  /** "Dex/Faith". */
  name: string;
  /** The leanings it is, by id, each once. No two named builds (or two add-ons) share a set (data.test.ts). */
  stats: string[];
  /** One line on how it plays, for the build dialog's card: a play style, never a later item, place or boss. */
  blurb: string;
  /** On top of another build: Pyromancy. */
  addon?: true;
  /** How guides start it, where two hosts agree on it: never on an add-on (data.test.ts). */
  start?: BuildStart;
}

/**
 * A page that recommends a pick, named as a reader knows the site: ["Fextralife", "https://…"], and the named builds (ids) it recommends
 * the pick for, where that is fewer than the pick's own `for`: a sorcerer's guide and a pyromancer's both naming one ring.
 */
export type BuildGuide = [name: string, url: string, builds?: string[]];

/**
 * What build guides use for a named build, on the row where the reader comes by it: a recommendation, which says who makes it and never
 * "best". For each build it's for, it needs two independent hosts, at least one of them a guide that lays that build out (`guides`); a
 * ranked "best builds" list (`lists`) can only be a second voice. A pick standing on lists alone, or on a guide for another build, goes to
 * the guide's facts-to-verify instead. Its role is the same for every build in `for`: a pick whose timing differs by build is two picks,
 * and no two picks for one item on one row share a build. A reader never sees a pick as a line of its own: the build's note on its row
 * says it (`BuildNote`), and the pick is the sourced structure under those words, behind the note's Who says so and the weapon track.
 */
export interface BuildPick {
  /** A row id from the guide data. */
  row: string;
  /** The named builds (ids) the guides recommend it for. A pick that is no named build (a custom one) gets no picks. */
  for: string[];
  kind: BuildKind;
  /** The item, as the game names it: "Great Combustion". Each build's note on the row names it (data.test.ts). */
  item: string;
  /**
   * When it serves the build. A starter's `needs` are met by its builds' starting classes, and a later pick's note says when (the guide's
   * own test holds both).
   */
  role: PickRole;
  /** What it needs to use, one-handed, by leaning id ({ fth: 14 }), as its wiki page gives it. */
  needs?: Record<string, number>;
  /**
   * Build guides that use it, each for the builds it lays out. Each build in `for` needs one guide of its own and two independent hosts in
   * all, guides and lists together (data.test.ts). Shown by name only, never as links, and only those for the reader's build.
   */
  guides: BuildGuide[];
  /** Ranked lists that name it ("best builds" articles): a second voice for a build, never its only one. */
  lists?: BuildGuide[];
  /** https pages for any fact in `needs`. */
  sources?: string[];
}

/**
 * A step a build takes at a row: buying from a trainer, joining a covenant, reinforcing, ascending, taking an ember to a smith. It is done
 * when its row is ticked (no progress of its own), so it sits only on a row whose tick means the step is done; an upgrade no row stands for
 * is part of the step it leads to. A named build reads its note on the row instead (`BuildNote`); the step's own words are what a pick that
 * is no named build sees, and the facts under the notes.
 */
export interface BuildTask {
  /** A row id from the guide data. */
  row: string;
  /** The leanings it serves, by id, each once: any of them in the pick shows it. */
  serves: string[];
  /** What to do, as a short imperative: "Buy his pyromancies and start on the flame". */
  title: string;
  /** How: who, where, what it costs, what it opens. Nothing the row's chapter hasn't reached, nor what the row already says. */
  text: string;
  /**
   * What is lost if it waits, in the row's own chapter terms ("Answer No when…"). Two independent hosts in `sources`, as a missable. Never
   * on a missable row, whose own warning says it. Shown to every pick it serves, after the build's note.
   */
  before?: string;
  /** A step on the weapon's path (a smith, an ember, a reinforcement): each named build it serves has a stage of its weapon track here. */
  path?: true;
  /**
   * Named builds (ids) its leanings serve that it says nothing to beyond the row's own words: they get no note here (Shiva's shop for a
   * Paladin). Every other named build it serves has one, so a note left out is written down, not forgotten (data.test.ts).
   */
  quiet?: string[];
  /** https pages for its facts. */
  sources: string[];
}

/**
 * What a row means for a named build, in the guide's own voice: what to do here and when, written against the row so it neither repeats
 * nor contradicts it. One per row per build, where the build has a pick or a step there; a note may serve several builds the same words
 * fit. It's all a named build sees on the row, once the guide has written notes for each build in the reader's pick.
 */
export interface BuildNote {
  /** A row id from the guide data. */
  row: string;
  /** The named builds (ids, add-ons included) it's written for. */
  for: string[];
  /**
   * One or two sentences that name each pick the row holds for these builds and say when a later one is worth having. Nothing past the
   * row's chapter, never "best", no run of the row's own words.
   */
  text: string;
  /**
   * The build's weapon as this row leaves it, for its weapon track ("Mace +5", "Divine Mace"): on a row with a weapon or path pick or a
   * path step for the build, and only on a note for one build, since a stage names one build's weapon.
   */
  stage?: string;
  /** https pages for any fact in `text` that the row's picks and steps don't already source. */
  sources?: string[];
}

/** A chained side quest: one character's arc, or one task in parts, as existing rows. Progress stays per row. */
export interface Questline {
  /** Stable once live: it's the line's address, `/questlines/<id>`. Never shown. */
  id: string;
  /** Only what the line's first step already says: the character as first met (docs/chapter-data.md). */
  name: string;
  /** Row ids in route order (data.test.ts holds them to it), so the steps a reader has revealed are always the line's first ones. A row may be in two lines. */
  steps: string[];
}

/** The Questlines page: its tab and title, and its lines. */
export interface Questlines {
  /** The tab's word in the navigation ("Quests", "Strangers"). */
  tab: string;
  title: string;
  intro: string;
  /** Every row carrying one of these tags is in a line (data.test.ts). */
  cover?: string[];
  lines: Questline[];
}

/**
 * Per-guide state saved beside the shared fields. A guide that keeps some declares its type here through
 * declaration merging: `declare module "@hundo/core/types" { interface Register { extra: MyExtra } }`.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- filled in by a guide through declaration merging
export interface Register {}
export type Extra = Register extends { extra: infer E } ? E : undefined;

export interface ProgressState {
  version: 3;
  guide: string;
  checks: Checks;
  ceiling: number;
  spoilers: boolean;
  chapter: number;
  extra: Extra;
}

/** A chapter banner: the original, and in a build the smaller copies beside it as a `srcset` (banners.ts). */
export interface Banner {
  src: string;
  srcSet?: string;
}

export interface FontFace {
  family: string;
  /** File name in public/fonts. */
  file: string;
  weight: string;
  fallback: string;
}

export interface Brand {
  /** Written into every backup as `guide`, so a backup from another guide is refused. */
  id: string;
  name: string;
  shortName: string;
  /** Document and social title. */
  title: string;
  description: string;
  /** Storage keys are `<prefix>.v1` (progress), `<prefix>.theme`, `<prefix>.sync` (a synced device's ledger), `<prefix>.awake` (Keep screen on), `<prefix>.place` (the last place read), `<prefix>.persist` (when the guide last asked to keep its storage), `<prefix>.counts` (Count my visits turned off), `<prefix>.build` (the leanings of the reader's build) and `<prefix>.build-asked` (whether the guide has asked for a build). */
  storagePrefix: string;
  backupFile: string;
  /** The word in the header brand, above "HUNDO". */
  mark: string;
  /** The game's full name. No page shows it on its own: the title and the description name it, for search (data.test.ts holds them to it). */
  game: string;
  /** The game's publisher, named in the rail's fan disclaimer ("not affiliated with …"). */
  publisher: string;
  /** "narrow": soft square corners. "normal": round buttons, chips and tags. */
  corners: "narrow" | "normal";
  /** The guide's own address, such as "https://koholint.hundo.quest": every canonical, the sitemap and the link preview are on it. */
  home: string;
  /** Hostnames the guide used to live on. They hand readers and their progress over to `home`. */
  movedFrom?: string[];
  fonts: { display: FontFace; sans: FontFace };
}

export type Tone = "rose" | "violet" | "amber" | "clay" | "sky" | "mint";
/** [plural name, singular label, icon, colour] */
export type Category = readonly [plural: string, singular: string, icon: IconName, tone?: Tone];

export interface BoardItem {
  tag: string;
  /**
   * Its total, exactly its rows as the board counts them (data.test.ts): a game's own count, whose two hosts the guide's
   * facts-to-verify.md names, or the rows of the guide's own list.
   */
  goal: number;
  /**
   * Whose list it is. "game": a list the game keeps, standing as the game counts it, so it may share a row with another of the game's
   * lists (an Echoes side quest and the accessory it awards). "guide": a list the guide makes up itself, not a game total, whose rows
   * count under no other target (data.test.ts).
   */
  list: "game" | "guide";
  /**
   * The category its tile and its line in "What's left" open on the checklist, when that isn't the tag it counts: one that holds every
   * row the tag does and more (data.test.ts). Red Dead counts a Stranger task by its last step and opens every step.
   */
  opens?: string;
}

export interface LeftItem {
  tag: string;
  left: number;
  total: number;
}

export interface Completion {
  /**
   * The guide's completion list. The overall figure and "What's left" both read it: every target but what lies outside the game, each
   * counted as the board counts it and up to its goal (core's `listedPercent`), followed by "complete". A game's own percentage never
   * replaces it; a guide shows that in a panel.
   */
  board: BoardItem[];
  /**
   * The tags that label a step the game doesn't credit, which only moves the reader on (route steps, Red Dead's Stranger steps before
   * a task's last). A row whose first tag is one carries no target, and every other row counts, but what lies outside the game
   * (data.test.ts).
   */
  directions: string[];
  /**
   * The tags of what lies outside the game, such as amiibo, which need physical figures: a row carrying one never counts, and a board
   * target with one is shown but left out of What's left and the bar. Nothing else stays out.
   */
  outside?: string[];
}

export interface GuideText {
  checklistIntro: string;
  searchPlaceholder: string;
  dashboardIntro: string;
  boardTitle: string;
  boardNote: string;
  nextUpDone: string;
  /** What an export holds, in the settings dialog. */
  backupBlurb: string;
}

export interface GuideConfig {
  brand: Brand;
  /** "article": prose sections with their checks in the text. "checklist": collapsible route groups with filters. */
  layout: "article" | "checklist";
  chapters: RawChapter[];
  /** Guide-wide sources; each chapter can carry its own. */
  sources: SourceLink[];
  /**
   * Set only when the game keeps an achievement list of its own, so every reader has one whatever they play on: in-game where the
   * platform has no achievements (Hollow Knight's Feats on Switch). Its sources, two hosts or more, back that and aren't shown.
   * Without it no text a reader sees says "achievement" or "trophy" (data.test.ts): a platform's achievements (Steam, Xbox,
   * PlayStation) can check the data for gaps but are never shown. Lordran sets none: nothing found names a list of Dark Souls
   * Remastered's own, and its facts-to-verify.md says what backs that (one host and the user's word) and what would settle it.
   */
  achievements?: { sources: SourceLink[] };
  categories: Record<string, Category>;
  /** Category chips on the checklist page and, in the checklist layout, above the route. */
  chips: { checklist: [id: string, label: string][]; route?: [id: string, label: string][] };
  /** Secondary tags that get a badge beside the primary one in route rows. */
  badges?: string[];
  /** The category a row's `quantity` counts toward (Might Crystals by amount). */
  quantity?: string;
  missables: Missable[];
  /** One-way choices, each drawn as one block. Every way is an ordinary counted row: the recommended one in the choice's chapter, each other in a later playthrough's. */
  choices?: Choice[];
  /** Chained side quests, on the Questlines page. */
  questlines: Questlines;
  /**
   * The builds the guide can point toward: the leanings a reader picks under Your build, the builds readers know by name, what build guides
   * use for each and the steps each takes. A lens over the checklist, never a count. A guide without it shows nothing of builds.
   */
  builds?: {
    leanings: Leaning[];
    /**
     * Leaning ids an earlier build of the guide named and this one doesn't: a reader's saved pick may still hold one. It reads without
     * them, and the next save drops them, so a tab still on that earlier build doesn't read a pick the reader has since changed or cleared
     * as a build of the retired leaning alone. Never a leaning again (data.test.ts), since every old pick would come back with it.
     */
    retired?: string[];
    /** The builds readers know by name, each a set of leanings: what the build dialog offers and what a pick is called. */
    named?: NamedBuild[];
    /** What build guides use for a named build. */
    picks?: BuildPick[];
    /** The steps a build takes: trainers, covenants, smiths, the flame. */
    tasks?: BuildTask[];
    /**
     * What each row means for each named build, in the guide's voice. A pick reads these once each build in it has notes; until then (a
     * build the guide has named but not written for) it reads as a custom pick does, by its leanings' steps.
     */
    notes?: BuildNote[];
  };
  /** Shown while nothing is flagged as missable: why that is safe. Its sources back the claim and aren't shown. */
  reassurance?: { text: string; sources: SourceLink[] };
  /** Chapter id → banner, imported with `?banner` (core's banners.ts). */
  banners: Record<number, Banner>;
  /** Rows "Next up" holds back until nothing else is left in the revealed chapters. */
  defer?: (row: Row) => boolean;
  completion: Completion;
  state: {
    /** Reads a backup saved before the shared format; returns its extra fields, or null if it is not one. */
    legacy?: (value: Record<string, unknown>) => { extra?: unknown } | null;
    extra?: { initial: () => Extra; read: (value: unknown) => Extra };
  };
  text: GuideText;
}

/**
 * An opt-in panel on the Progress page; `/dashboard/<id>` scrolls to it. Its component draws a Panel with this `id` and a PanelTitle
 * reading `title`, which is how the page's "On this page" names it (core's tests hold the two together in every guide).
 */
export interface Panel {
  id: string;
  title: string;
  Component: ComponentType;
}

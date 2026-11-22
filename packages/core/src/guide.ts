import config from "virtual:guide/config";
import { pct } from "./format";
import type { BuildGuide, BuildKind, BuildNote, BuildPick, BuildStart, BuildTask, Chapter, Checks, Choice, LeftItem, NamedBuild, PickRole, Row } from "./types";

export { config };
export const { brand, categories: cats, completion, text } = config;

const missableIds = new Set(config.missables.map((item) => item.id));
const choiceByRow = new Map((config.choices ?? []).map((choice) => [choice.row, choice]));
const choiceByLater = new Map((config.choices ?? []).flatMap((choice) => choice.later.map((later) => [later.row, choice] as const)));
export const hasMissables = missableIds.size > 0;
export const hasChoices = choiceByRow.size > 0;
/** The one-way choice a row is the recommended way at, if any. */
export const choiceOf = (rowId: string): Choice | undefined => choiceByRow.get(rowId);
/** The one-way choice a row is a later playthrough's way at, if any. */
export const choiceAt = (rowId: string): Choice | undefined => choiceByLater.get(rowId);

export const chapters: Chapter[] = config.chapters.map((chapter) => ({
  ...chapter,
  sources: chapter.sources ?? [],
  groups: chapter.groups.map((group, index) => ({
    key: `section-${chapter.id}-${index + 1}`,
    title: group.title,
    location: group.location,
    icon: group.icon,
    note: group.note,
    sources: group.sources ?? [],
    map: group.map,
    compact: group.compact === true,
    rows: group.rows.map(
      ([id, tags, title, text, extra]): Row => ({
        id,
        title,
        text,
        chapter: chapter.id,
        group: group.title,
        location: group.location,
        // Core's own tags: what "Don't miss" lists, a missable or the recommended way at a one-way choice (never both: data.test).
        tags: [...tags, ...(missableIds.has(id) ? ["missable"] : []), ...(choiceByRow.has(id) ? ["one-way"] : [])],
        quantity: extra?.quantity ?? 0,
        reference: extra?.reference,
        map: extra?.map,
        requires: (extra?.requires ?? []).map((entry) => (Array.isArray(entry) ? entry : [entry])),
        gives: extra?.gives,
        place: extra?.place ?? group.location,
      }),
    ),
  })),
}));

export const CHAPTER_COUNT = chapters.length;
export const allRows: Row[] = chapters.flatMap((chapter) => chapter.groups.flatMap((group) => group.rows));
export const byId = new Map(allRows.map((row) => [row.id, row]));
export const rowsByTag = (tag: string) => allRows.filter((row) => row.tags.includes(tag));
export const chapterRows = (chapter: Chapter) => chapter.groups.flatMap((group) => group.rows);
export const primaryTag = (row: Row) => row.tags[0];
export const isCategory = (value: string | undefined): value is string => value !== undefined && Object.hasOwn(cats, value);
export const tagName = (tag: string) => (isCategory(tag) ? cats[tag][0] : tag === "missable" ? "Missable" : tag === "one-way" ? "One-way" : tag);
/** The line "Don't miss" and a questline's step show under an entry: a missable's condition, or a one-way choice's why. */
export const missableWhy = (id: string) => config.missables.find((item) => item.id === id)?.why ?? choiceOf(id)?.why;

export const readChapter = (value: unknown, fallback = 1) => {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 && n <= CHAPTER_COUNT ? n : fallback;
};

export const statusOptions: [string, string][] = [
  ["all", "All statuses"],
  ["todo", "Unfinished"],
  ["later", "Set aside"],
  ["done", "Completed"],
];

const splitInto = new Map((config.splits ?? []).map((split) => [split.from, split.into]));
const splitFrom = new Map((config.splits ?? []).flatMap((split) => split.into.map((part) => [part, split.from] as const)));
/** Whether an id is a split bundle's, retired for good. */
export const isRetired = (id: string) => splitInto.has(id);
/** The rows an id stands for: a retired bundle's parts, through any chain of splits, in order; any other id, itself. */
export function partsOf(id: string, seen: ReadonlySet<string> = new Set()): string[] {
  const into = splitInto.get(id);
  if (!into || seen.has(id)) return [id];
  return into.flatMap((part) => partsOf(part, new Set([...seen, id])));
}
/** The retired bundles a row was split out of, nearest first: every level of a chain. */
export function bundlesOf(id: string): string[] {
  const out: string[] = [];
  for (let at = splitFrom.get(id); at && !out.includes(at); at = splitFrom.get(at)) out.push(at);
  return out;
}

/** A row id or a section key in this chapter, as the element id to scroll to. A split bundle's old id lands on its first part. */
export function guideAnchor(chapterId: number, target: string | undefined): string | undefined {
  if (!target) return;
  const row = isRetired(target) ? partsOf(target)[0] : target;
  if (byId.get(row)?.chapter === chapterId) return `entry-${row}`;
  return chapters[chapterId - 1]?.groups.find((group) => group.key === target)?.key;
}

/** What "Don't miss" lists for a chapter: its missables and the recommended ways at its one-way choices, unticked, in route order. */
export const missablesLeft = (chapter: Chapter, checks: Checks) =>
  chapterRows(chapter).filter((row) => (missableIds.has(row.id) || choiceByRow.has(row.id)) && checks[row.id] !== true);

/** The leanings a reader's build is made of, in the guide's order. Empty for a guide without builds, which shows nothing of them. */
export const leanings = config.builds?.leanings ?? [];
export const hasBuilds = leanings.length > 0;
/** Leaning ids an earlier build of the guide named and this one retired: a saved pick drops them on its next save. */
export const retiredLeanings = config.builds?.retired ?? [];
const leaningLabel = new Map(leanings.map((leaning) => [leaning.id, leaning.label]));
/** The kinds of item a pick names. */
export const buildKinds: readonly BuildKind[] = ["weapon", "catalyst", "spell", "ring", "armor", "path"];
/** A pick's roles, in the order a build meets them, and the word each shows as. */
export const pickRoles: Readonly<Record<PickRole, string>> = { starter: "Starter", upgrade: "Upgrade", endgame: "Endgame" };
/** A leaning's word ("Faith"). */
export const leaningName = (id: string) => leaningLabel.get(id) ?? id;
/** "Dexterity and Faith", "Strength, Dexterity and Faith". */
export const inWords = (words: readonly string[]) =>
  words.length < 2 ? (words[0] ?? "") : `${words.slice(0, -1).join(", ")} and ${words[words.length - 1]}`;

/** The builds readers know by name, in the guide's order, and the add-ons a pick may hold on top of one. */
export const namedBuilds = (config.builds?.named ?? []).filter((build) => !build.addon);
export const addons = (config.builds?.named ?? []).filter((build) => build.addon);

/**
 * The named build a pick is, and the add-ons it holds on top: the largest named build whose leanings are all in the pick, the rest of the
 * pick being add-ons exactly ("str dex pyro" is Quality with Pyromancy, "dex int pyro" Magic Knight with Pyromancy). Null for no pick, or
 * for a pick that is no named build (a custom one: "int fth").
 */
export function buildOf(picked: readonly string[]): { build: NamedBuild; addons: NamedBuild[] } | null {
  let best: { build: NamedBuild; addons: NamedBuild[] } | null = null;
  for (const build of namedBuilds) {
    if (!build.stats.every((id) => picked.includes(id))) continue;
    const rest = picked.filter((id) => !build.stats.includes(id));
    const on = addons.filter((addon) => addon.stats.every((id) => rest.includes(id)));
    if (!rest.every((id) => on.some((addon) => addon.stats.includes(id)))) continue;
    if (!best || build.stats.length > best.build.stats.length) best = { build, addons: on };
  }
  return best;
}

/** What a pick is called: "Pyromancer", "Quality + Pyromancy", or its leanings' words for a custom one ("Intelligence and Faith"). */
export function buildName(picked: readonly string[]) {
  const of = buildOf(picked);
  if (!of) return inWords(leanings.filter((leaning) => picked.includes(leaning.id)).map((leaning) => leaning.label));
  return [of.build, ...of.addons].map((build) => build.name).join(" + ");
}

const byRow = <T extends { row: string }>(items: readonly T[]) => {
  const map = new Map<string, T[]>();
  for (const item of items) map.set(item.row, [...(map.get(item.row) ?? []), item]);
  return map;
};
const picksByRow = byRow(config.builds?.picks ?? []);
const tasksByRow = byRow(config.builds?.tasks ?? []);
const notesByRow = byRow(config.builds?.notes ?? []);
/** Whether a row has a step, a pick or a note for any build, whatever the pick: a row without never reads the pick. */
export const hasBuildLines = (rowId: string) => picksByRow.has(rowId) || tasksByRow.has(rowId) || notesByRow.has(rowId);

/** The named builds (ids) the guide has written notes for. */
const noted = new Set((config.builds?.notes ?? []).flatMap((note) => note.for));

/**
 * The builds a pick reads notes for: its named build and its add-ons, by id, once the guide has written notes for every one of them. Null
 * for a custom pick, and for one holding a build the guide hasn't written for yet: it reads its leanings' steps instead.
 */
export function readsNotes(picked: readonly string[]): string[] | null {
  const of = buildOf(picked);
  if (!of) return null;
  const ids = [of.build.id, ...of.addons.map((addon) => addon.id)];
  return ids.every((id) => noted.has(id)) ? ids : null;
}

/** A row's notes for the pick, the named build's before its add-ons'. None for a pick that reads steps. */
export function notesFor(rowId: string, picked: readonly string[]): BuildNote[] {
  const ids = readsNotes(picked);
  const notes = notesByRow.get(rowId) ?? [];
  return ids ? [...new Set(ids.flatMap((id) => notes.filter((note) => note.for.includes(id))))] : [];
}

/** A row's picks for the named build the pick is, or for an add-on it holds. None for a custom pick: guides recommend for named builds. */
export function picksFor(rowId: string, picked: readonly string[]): BuildPick[] {
  const of = buildOf(picked);
  if (!of) return [];
  const ids = [of.build.id, ...of.addons.map((addon) => addon.id)];
  return (picksByRow.get(rowId) ?? []).filter((pick) => pick.for.some((id) => ids.includes(id)));
}

/** Which builds a pick's guide or list backs: the ones it names, else every build the pick is for. */
export const backs = (link: BuildGuide, pick: BuildPick) => link[2] ?? pick.for;

/**
 * Who recommends what a note says, for the reader's builds it's written for: each pick under it, with the sites that back it for those
 * builds, build guides first, by name and never linked. Empty for a note with no pick under it, which states game facts as the row does.
 */
export function whoSays(note: BuildNote, picked: readonly string[]): { item: string; by: string[] }[] {
  const ids = (readsNotes(picked) ?? []).filter((id) => note.for.includes(id));
  return (picksByRow.get(note.row) ?? [])
    .filter((pick) => pick.for.some((id) => ids.includes(id)))
    .map((pick) => {
      const links = [...pick.guides, ...(pick.lists ?? [])].filter((link) => backs(link, pick).some((id) => ids.includes(id)));
      return { item: pick.item, by: [...new Set(links.map(([name]) => name))] };
    });
}

const serves = (task: BuildTask, picked: readonly string[]) => task.serves.some((id) => picked.includes(id));

/** The names a row's build lines are led by: each note's build, and the pick's name for its steps. */
export interface Leads {
  note: (note: BuildNote) => string;
  steps: string;
}

/** A pick's leads: a note's is the named build's name, or the add-on's for a note written for the add-on alone. */
export function leadsFor(picked: readonly string[]): Leads {
  const of = buildOf(picked);
  const builds = of ? [of.build, ...of.addons] : [];
  return { note: (note) => builds.find((build) => note.for.includes(build.id))?.name ?? buildName(picked), steps: buildName(picked) };
}

/** A row's steps as a pick that reads steps sees them: those serving any of its leanings. None for a pick that reads notes. */
export const tasksFor = (rowId: string, picked: readonly string[]): BuildTask[] =>
  picked.length && !readsNotes(picked) ? (tasksByRow.get(rowId) ?? []).filter((task) => serves(task, picked)) : [];

/** What a row's steps say is lost by waiting, for a pick that reads notes: shown after its note, since it's a deadline, not advice. */
export const warningsFor = (rowId: string, picked: readonly string[]): string[] =>
  readsNotes(picked) ? (tasksByRow.get(rowId) ?? []).flatMap((task) => (task.before && serves(task, picked) ? [task.before] : [])) : [];

/** A row and what it holds for the pick: its notes, or its steps for a pick that reads steps, and any deadline. */
export interface PlanRow {
  row: Row;
  notes: BuildNote[];
  tasks: BuildTask[];
  warnings: string[];
}

/** What a chapter holds for the pick, row by row in route order. */
export const chapterPlan = (chapter: Chapter, picked: readonly string[]): PlanRow[] =>
  chapterRows(chapter)
    .map((row) => ({ row, notes: notesFor(row.id, picked), tasks: tasksFor(row.id, picked), warnings: warningsFor(row.id, picked) }))
    .filter((item) => item.notes.length + item.tasks.length + item.warnings.length > 0);

/**
 * The build's plan, chapter by chapter: the revealed chapters only (the guide's spoiler rules), each with its rows that hold something
 * for it. A chapter with nothing for it is left out.
 */
export function buildPlan(isChapterOpen: (chapter: number) => boolean, picked: readonly string[]) {
  if (!picked.length) return [];
  return chapters
    .filter((chapter) => isChapterOpen(chapter.id))
    .map((chapter) => ({ chapter, rows: chapterPlan(chapter, picked) }))
    .filter((part) => part.rows.length > 0);
}

/**
 * A stage of a build's weapon track: how guides start it, or a row's note that names the weapon as the row leaves it, with the role of the
 * row's weapon or path pick for the build as a word ("Upgrade"), or no word for a smith's stage, whose name says it.
 */
export type TrackStage = { start: BuildStart } | { row: Row; note: BuildNote; word: string };

/**
 * The build's weapon track: the weapon its start names, then each note that names a stage of it, in route order, from the revealed chapters
 * only. Nothing is said of what hidden chapters hold, not even how much. The stages are the named build's own, never an add-on's: Pyromancy
 * beside a Quality build doesn't put the Fire path in its weapon's track. Empty for a pick that reads steps.
 */
export function weaponTrack(isChapterOpen: (chapter: number) => boolean, picked: readonly string[]): TrackStage[] {
  const of = buildOf(picked);
  if (!of || !readsNotes(picked)) return [];
  const own = of.build.id;
  const stages: TrackStage[] = of.build.start?.weapon ? [{ start: of.build.start }] : [];
  for (const row of allRows) {
    if (!isChapterOpen(row.chapter)) continue;
    for (const note of notesByRow.get(row.id) ?? []) {
      if (!note.stage || !note.for.includes(own)) continue;
      const pick = (picksByRow.get(row.id) ?? []).find((item) => item.for.includes(own) && (item.kind === "weapon" || item.kind === "path"));
      stages.push({ row, note, word: pick ? pickRoles[pick.role] : "" });
    }
  }
  return stages;
}

/** How much one entry adds toward a category: the configured quantity category by amount, everything else by one. */
export const worth = (row: Row, tag: string) => (tag === config.quantity ? row.quantity : 1);

export function tally(tag: string, checks: Checks) {
  let done = 0;
  let total = 0;
  for (const row of rowsByTag(tag)) {
    total += worth(row, tag);
    if (checks[row.id] === true) done += worth(row, tag);
  }
  return { done, total };
}

const opens = new Map(completion.board.map((item) => [item.tag, item.opens ?? item.tag]));
/** The checklist a target's tile and its line in What's left open: its category, or the one it names (`BoardItem.opens`). */
export const checklistOf = (tag: string) => `/checklist/${opens.get(tag) ?? tag}`;

const outside = new Set(completion.outside ?? []);
/** The targets What's left and the bar count: every board target but what lies outside the game (`Completion.outside`). */
const listed = completion.board.filter((item) => !outside.has(item.tag));

/**
 * The guide's completion list done, as a whole percentage rounded down: every board target but what lies outside the game, counted as
 * the board counts it (an entry by one, the quantity category by amount) and only up to its goal. What's left counts the same targets
 * the same way, so this is 100 exactly when What's left is empty, and never 100 while anything on the list is left.
 */
export function listedPercent(checks: Checks) {
  let done = 0;
  let total = 0;
  for (const { tag, goal } of listed) {
    done += Math.min(tally(tag, checks).done, goal);
    total += goal;
  }
  return pct(done, total);
}

/**
 * The guide's one overall figure and the words after it: the completion list (`listedPercent`), "complete". Nothing is counted beside
 * it: the list's own total isn't a count of anything a reader can point at (crystals by amount, a row once per target it carries).
 */
export const overall = (checks: Checks) => ({ percent: listedPercent(checks), label: "complete" });

/** The figure in words, as a screen reader hears it: as it is shown, never rounded up (Base UI's own text goes through Intl, which reads 99.9 as "100%"). */
export const overallText = (percent: number, label: string) => `${percent}% ${label}`;

/** What is left per category, biggest first; finished categories drop out. */
export function whatsLeft(checks: Checks): LeftItem[] {
  const items = listed.map(({ tag, goal }) => ({ tag, total: goal, left: Math.max(goal - tally(tag, checks).done, 0) }));
  return items.filter((item) => item.left > 0).sort((a, b) => b.left - a.left || tagName(a.tag).localeCompare(tagName(b.tag)));
}

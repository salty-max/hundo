// @vitest-environment node
import { panels } from "virtual:guide/panels";
import { allRows, brand, byId, cats, chapterRows, chapters, CHAPTER_COUNT, completion, addons, backs, buildKinds, buildOf, buildPlan, config, guideAnchor, namedBuilds, notesFor, pickRoles, picksFor, readsNotes, tasksFor, warningsFor, hasMissables, isCategory, isRetired, leanings, missablesLeft, partsOf, readChapter, rowsByTag, tally, trackStages, weaponTrack, whatsLeft, type TrackFork, type TrackItem, type TrackStage } from "./guide";
import liveIds from "virtual:guide/data/live-ids.txt?raw";
import { nextUp } from "./flow";
import { two } from "./format";
import { validateState } from "./progress-state";
import { readerText } from "./reader-text";
import { viewFrom } from "./sync/fields";
import type { Row } from "./types";

const everything = Object.fromEntries(allRows.map((row) => [row.id, true as const]));
/** The sites behind some links: the same site with and without "www." is one. */
const hosts = (urls: string[]) => new Set(urls.map((url) => new URL(url).host.replace(/^www\./, "")));
/**
 * A scaling letter in any form the pages print one: a lone capital S or A–E soon after the verb "scales" in the same clause ("scales C",
 * "scales with C Strength", "scaling: B"), before "scal…" ("C scaling", "S-scaling"), before a stat that no lowercase word follows
 * ("E Strength, C Dexterity", where "A Faith catalyst" is an article), after a stat ("Strength: C", "Dexterity (B)"), or a pair ("C/C").
 * The verb is lowercase: a note starts with its item's name, so a capital "Scale" or "Scales" is a noun (the Dragon Scale).
 */
const STAT = "(?:Strength|Dexterity|Intelligence|Faith|Str|Dex|Int|Fth)";
const LONE = "(?<![\\w'’])[SA-E](?![\\w'’])";
const scalingLetter = new RegExp(
  [
    `\\bscal(?:es|ed|ing)\\b[^.,;]{0,24}?${LONE}`,
    `(?<![\\w'’])[SA-E](?:\\s*-\\s*|\\s+)[Ss]cal`,
    `(?<![\\w'’])[SA-E]\\s+${STAT}\\b(?!\\s+(?![Ss]cal)[a-z])`,
    `\\b${STAT}(?:\\s*:\\s*[SA-E]|\\s*\\(\\s*[SA-E]\\s*\\)|\\s+${LONE}(?!\\s+[a-z]))`,
    `(?<![\\w'’])[SA-E]\\s*(?:/|-to-)\\s*${LONE}`,
  ].join("|"),
);

describe("guide data", () => {
  it("names the game in the page's title and description, the only places the game's full name is", () => {
    expect(brand.title).toContain(brand.game);
    expect(brand.description).toContain(brand.game);
  });

  it("has its chapters in order, each with rows", () => {
    expect(chapters.map((chapter) => chapter.id)).toEqual(Array.from({ length: CHAPTER_COUNT }, (_, i) => i + 1));
    for (const chapter of chapters) expect(chapterRows(chapter).length, chapter.title).toBeGreaterThan(0);
  });

  it("gives each hidden chapter a line of its own on the rail, never two alike", () => {
    // The rail shows a hidden chapter's teaser, or "Chapter N" without one (Rail.tsx); docs/chapter-data.md has the rule.
    const shown = chapters.map((chapter) => chapter.teaser ?? `Chapter ${two(chapter.id)}`);
    expect(shown.filter((teaser, i) => shown.indexOf(teaser) !== i)).toEqual([]);
  });

  it("has unique row ids and a title on every row", () => {
    expect(byId.size).toBe(allRows.length);
    for (const row of allRows) expect(row.title.trim(), row.id).not.toBe("");
  });

  it("only uses known categories, and leaves core's own tags ('missable', 'one-way') to core", () => {
    for (const [id, tags] of config.chapters.flatMap((chapter) => chapter.groups.flatMap((group) => group.rows))) {
      expect(tags.includes("missable") || tags.includes("one-way"), `${id}: core adds these from missables.ts and choices.ts`).toBe(false);
    }
    for (const row of allRows) {
      expect(isCategory(row.tags[0]), row.id).toBe(true);
      for (const tag of row.tags) expect(isCategory(tag) || tag === "missable" || tag === "one-way", `${row.id}: ${tag}`).toBe(true);
    }
    const configured = [...config.chips.checklist, ...(config.chips.route ?? [])].map(([id]) => id);
    const board = completion.board.flatMap((item) => (item.opens ? [item.tag, item.opens] : [item.tag]));
    for (const tag of [...configured, ...board, ...(config.quantity ? [config.quantity] : [])]) {
      expect(isCategory(tag), tag).toBe(true);
    }
  });

  it("opens each board target on a checklist that lists every row it counts, and more", () => {
    for (const { tag, opens } of completion.board) {
      if (!opens) continue;
      for (const row of rowsByTag(tag)) expect(row.tags, `${tag} → ${opens}: ${row.id}`).toContain(opens);
      expect(rowsByTag(opens).length, `${tag} → ${opens}`).toBeGreaterThan(rowsByTag(tag).length);
    }
  });

  it("only links to https sources, each with a label", () => {
    const links = [
      ...config.sources,
      ...(config.reassurance?.sources ?? []),
      ...(config.achievements?.sources ?? []),
      ...chapters.flatMap((chapter) => [...chapter.sources, ...chapter.groups.flatMap((group) => group.sources)]),
    ];
    for (const [label, url] of links) {
      expect(label).not.toBe("");
      expect(url).toMatch(/^https:\/\//);
    }
    for (const row of allRows) if (row.reference) expect(row.reference, row.id).toMatch(/^https:\/\//);
  });

  it("names each map's site and links it over https, and a row's map is never its group's", () => {
    for (const group of chapters.flatMap((chapter) => chapter.groups)) {
      for (const [where, map] of [[group.title, group.map], ...group.rows.map((row) => [row.id, row.map] as const)] as const) {
        if (!map) continue;
        expect(map[0].trim(), where).not.toBe("");
        expect(map[1], where).toMatch(/^https:\/\//);
      }
      for (const row of group.rows) if (row.map && group.map) expect(row.map[1], `${row.id} repeats its group's map`).not.toBe(group.map[1]);
    }
  });

  it("only flags real rows as missable, each backed by two independent https sources", () => {
    for (const item of config.missables) {
      expect(byId.has(item.id), item.id).toBe(true);
      expect(item.why.length).toBeGreaterThan(10);
      expect(item.sources.every((url) => url.startsWith("https://"))).toBe(true);
      expect(hosts(item.sources).size, `${item.id} needs two independent hosts`).toBeGreaterThanOrEqual(2);
    }
    if (!hasMissables && config.reassurance) expect(hosts(config.reassurance.sources.map(([, url]) => url)).size).toBeGreaterThanOrEqual(2);
  });

  it("names each leaning once, and each in a named build or served by a step", () => {
    const ids = leanings.map((leaning) => leaning.id);
    expect(new Set(ids).size, "leaning ids are unique").toBe(ids.length);
    for (const { id, label } of leanings) {
      expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(label.trim(), id).not.toBe("");
    }
    if (config.builds) expect(leanings.length, "a guide with builds names its leanings").toBeGreaterThan(0);
    // A retired id is never a leaning again: every old pick that holds it would come back with a new meaning.
    for (const id of config.builds?.retired ?? []) {
      expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(ids, `${id} is retired`).not.toContain(id);
    }
    // A leaning no build is made of and no step serves would be a box that does nothing.
    const used = new Set([...(config.builds?.named ?? []).flatMap((build) => build.stats), ...(config.builds?.tasks ?? []).flatMap((task) => task.serves)]);
    for (const id of ids) expect(used.has(id), `nothing uses ${id}`).toBe(true);
  });

  it("makes each named build of leanings the guide names, no two of a kind the same, so a pick has one name", () => {
    const ids = leanings.map((leaning) => leaning.id);
    const named = config.builds?.named ?? [];
    if (named.length) expect(namedBuilds.length, "named builds besides add-ons").toBeGreaterThan(0);
    expect(new Set(named.map((build) => build.id)).size, "named build ids are unique").toBe(named.length);
    for (const build of named) {
      expect(build.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(build.name.trim(), build.id).not.toBe("");
      expect(build.blurb.trim().length, build.id).toBeGreaterThan(10);
      expect(build.stats.length, build.id).toBeGreaterThan(0);
      expect(new Set(build.stats).size, `${build.id}: a leaning once`).toBe(build.stats.length);
      for (const id of build.stats) expect(ids, `${build.id}: ${id}`).toContain(id);
    }
    for (const group of [namedBuilds, addons]) {
      const sets = group.map((build) => [...build.stats].sort().join(" "));
      expect(new Set(sets).size, "no two share their leanings").toBe(sets.length);
    }
    // Every named build is what its own leanings are called.
    for (const build of namedBuilds) expect(buildOf(build.stats)?.build.id, build.id).toBe(build.id);
  });

  it("starts a named build as build guides do: a class, the weapon it carries where they say so, on a guide for it and two hosts", () => {
    for (const build of config.builds?.named ?? []) {
      const { start } = build;
      if (!start) continue;
      expect(build.addon, `${build.id}: an add-on goes on top of a build, which has the start`).toBeUndefined();
      expect(start.class.trim(), build.id).not.toBe("");
      if (start.why) expect(start.weapon, `${build.id}: a why says what the weapon is for`).toBeDefined();
      expect(start.guides.length, `${build.id}: a build guide`).toBeGreaterThan(0);
      const links = [...start.guides, ...(start.lists ?? [])];
      for (const [name, url, only] of links) {
        expect(name.trim(), build.id).not.toBe("");
        expect(new URL(url).protocol, `${build.id}: ${url}`).toBe("https:");
        expect(only, `${build.id}: ${name} backs this build alone`).toBeUndefined();
      }
      expect(hosts(links.map(([, url]) => url)).size, `${build.id}: two independent hosts`).toBeGreaterThanOrEqual(2);
      expect(start.sources.length, build.id).toBeGreaterThan(0);
      for (const url of start.sources) expect(new URL(url).protocol, `${build.id}: ${url}`).toBe("https:");
    }
  });

  // What the reader asked of a build: a weapon to fight with, and steps to take, whatever spells it casts.
  it("gives every named build a weapon and a step its leanings serve, and a build with notes a weapon on its track", () => {
    for (const build of namedBuilds) {
      const weapon = build.start?.weapon !== undefined || (config.builds?.picks ?? []).some((pick) => pick.kind === "weapon" && pick.for.includes(build.id));
      expect(weapon, `${build.id}: a weapon, not only a smith`).toBe(true);
      expect((config.builds?.tasks ?? []).some((task) => task.serves.some((id) => build.stats.includes(id))), `${build.id}: a step`).toBe(true);
      if (!readsNotes(build.stats)) continue;
      const track = weaponTrack(() => true, build.stats);
      const weapons = trackStages(track?.line ?? []).filter((stage) => picksFor(stage.row.id, build.stats).some((pick) => pick.kind === "weapon"));
      expect(Boolean(track?.start) || weapons.length > 0, `${build.id}: a weapon on its track, not only a smith`).toBe(true);
    }
  });

  it("backs each pick, for each named build it is for, with a guide for that build and a second independent host, on a real row", () => {
    const named = new Set(namedBuilds.concat(addons).map((build) => build.id));
    const seen = new Set<string>();
    for (const pick of config.builds?.picks ?? []) {
      const at = `${pick.row}: ${pick.item}`;
      expect(byId.has(pick.row), at).toBe(true);
      expect(pick.for.length, at).toBeGreaterThan(0);
      for (const id of pick.for) expect(named.has(id), `${at}: ${id}`).toBe(true);
      expect(buildKinds, at).toContain(pick.kind);
      expect(Object.keys(pickRoles), at).toContain(pick.role);
      for (const [id, need] of Object.entries(pick.needs ?? {})) {
        expect(leanings.map((leaning) => leaning.id), `${at}: needs ${id}`).toContain(id);
        expect(Number.isInteger(need) && need > 0, `${at}: needs ${need} ${id}`).toBe(true);
      }
      expect(pick.item.trim(), at).not.toBe("");
      const links = [...pick.guides, ...(pick.lists ?? [])];
      for (const [name, url, only] of links) {
        expect(name.trim(), at).not.toBe("");
        expect(new URL(url).protocol, `${at}: ${url}`).toBe("https:");
        for (const id of only ?? []) expect(pick.for, `${at}: ${name} backs ${id}, which the pick isn't for`).toContain(id);
        // On a pick for several builds every link says which it backs: an untagged one would back them all unseen.
        if (pick.for.length > 1) expect(only, `${at}: ${name} names the builds it backs`).toBeDefined();
      }
      // For each build it's for: a guide that lays that build out, and two independent hosts in all. A ranked list is a second voice only.
      for (const build of pick.for) {
        const guides = pick.guides.filter((link) => backs(link, pick).includes(build));
        const voices = links.filter((link) => backs(link, pick).includes(build));
        expect(guides.length, `${at}: a build guide for ${build}`).toBeGreaterThan(0);
        expect(hosts(voices.map(([, url]) => url)).size, `${at}: two independent hosts for ${build}`).toBeGreaterThanOrEqual(2);
      }
      for (const url of pick.sources ?? []) expect(new URL(url).protocol, `${at}: ${url}`).toBe("https:");
      // A pick whose role differs by build is two picks, but no build gets the same item twice on one row.
      for (const build of pick.for) {
        expect(seen.has(`${at} ${build}`), `${at} twice for ${build}`).toBe(false);
        seen.add(`${at} ${build}`);
      }
    }
  });

  // A build's words say who recommends what; none of them ranks.
  it("never says best in anything a build shows", () => {
    // Every reader string under builds, as the reader-text walk finds them: a field added later is checked too.
    const words = readerText(config).filter(([path]) => path.startsWith("builds."));
    expect(words.filter(([, word]) => /\bbest\b/i.test(word))).toEqual([]);
  });

  // A build's words are notes, one per row it has something on. One left out is written down (a quiet step), never forgotten.
  it("writes, for each build with notes, one on every row it has a pick or an unquiet step on, and none without one under it", () => {
    const builds = new Map(namedBuilds.concat(addons).map((build) => [build.id, build]));
    const notes = config.builds?.notes ?? [];
    const picks = config.builds?.picks ?? [];
    const tasks = config.builds?.tasks ?? [];
    const noted = new Set(notes.flatMap((note) => note.for));
    const count = (row: string, id: string) => notes.filter((note) => note.row === row && note.for.includes(id)).length;
    const serves = (task: (typeof tasks)[number], id: string) => task.serves.some((stat) => builds.get(id)?.stats.includes(stat));
    for (const note of notes) {
      const at = `${note.row}: ${note.for.join(", ")}`;
      expect(byId.has(note.row), at).toBe(true);
      expect(note.for.length, at).toBeGreaterThan(0);
      expect(new Set(note.for).size, `${at}: a build once`).toBe(note.for.length);
      expect(note.text.trim().length, at).toBeGreaterThan(10);
      for (const url of note.sources ?? []) expect(new URL(url).protocol, `${at}: ${url}`).toBe("https:");
      for (const id of note.for) {
        expect(builds.has(id), `${at}: ${id} is a named build`).toBe(true);
        expect(count(note.row, id), `${at}: one note for ${id} on the row`).toBe(1);
        const under = picks.some((pick) => pick.row === note.row && pick.for.includes(id)) || tasks.some((task) => task.row === note.row && serves(task, id) && !task.quiet?.includes(id));
        expect(under, `${at}: a pick or an unquiet step for ${id} under it`).toBe(true);
      }
    }
    for (const pick of picks) for (const id of pick.for) if (noted.has(id)) expect(count(pick.row, id), `${pick.row}: ${pick.item}, a note for ${id}`).toBe(1);
    for (const task of tasks) {
      const at = `${task.row}: ${task.title}`;
      for (const id of task.quiet ?? []) {
        expect(builds.has(id) && serves(task, id), `${at}: quiet for ${id}, which it serves`).toBe(true);
        expect(task.before, `${at}: a deadline is never quiet`).toBeUndefined();
        expect(picks.some((pick) => pick.row === task.row && pick.for.includes(id)), `${at}: quiet for ${id}, which has a pick there`).toBe(false);
      }
      for (const id of noted) if (serves(task, id) && !task.quiet?.includes(id)) expect(count(task.row, id), `${at}: a note for ${id}, or quiet`).toBe(1);
    }
  });

  it("names each pick in its builds' notes, repeats no five-word run of its row, and names each weapon stage for one build", () => {
    const builds = new Map(namedBuilds.concat(addons).map((build) => [build.id, build]));
    const notes = config.builds?.notes ?? [];
    const picks = config.builds?.picks ?? [];
    const tasks = config.builds?.tasks ?? [];
    // Words in runs of five; a capitalised word is a name ("Titanite Shards", "Andre"), which a note may repeat, so a run holding one never
    // counts. A test can only catch a run: the review reads for the rest of what a row already says.
    const runs = (text: string) => {
      const words = text.split(/\s+/).map((word) => (/^[A-Z]/.test(word) ? "" : word.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9+]/g, "")));
      return words.slice(4).flatMap((_, i) => (words.slice(i, i + 5).every(Boolean) ? [words.slice(i, i + 5).join(" ")] : []));
    };
    for (const note of notes) {
      const row = byId.get(note.row)!;
      for (const pick of picks.filter((item) => item.row === note.row && item.for.some((id) => note.for.includes(id)))) {
        expect(note.text.toLowerCase(), `${note.row}: names ${pick.item}`).toContain(pick.item.replace(/^(an?|the) /i, "").toLowerCase());
      }
      const own = new Set(runs(row.text ?? ""));
      expect(runs(note.text).filter((run) => own.has(run)), `${note.row}: the row says it already`).toEqual([]);
      if (note.stage) {
        expect(note.for.length, `${note.row}: a stage names one build's weapon`).toBe(1);
        expect(builds.get(note.for[0])?.addon, `${note.row}: an add-on has no weapon track`).toBeUndefined();
      }
      if (note.branch) expect(note.stage, `${note.row}: a branch is a stage's`).toBeDefined();
    }
    // Every weapon or path pick and every path step a build with notes has is a stage of its track.
    for (const build of namedBuilds.filter((item) => notes.some((note) => note.for.includes(item.id)))) {
      const rows = new Set([
        ...picks.filter((pick) => pick.for.includes(build.id) && (pick.kind === "weapon" || pick.kind === "path")).map((pick) => pick.row),
        ...tasks.filter((task) => task.path && task.serves.some((id) => build.stats.includes(id)) && !task.quiet?.includes(build.id)).map((task) => task.row),
      ]);
      for (const row of rows) expect(notes.some((note) => note.row === row && note.for.includes(build.id) && note.stage), `${build.id}: a stage on ${row}`).toBe(true);
    }
  });

  // A fork guides split on is drawn as a branch off the stage it leaves (types.ts BuildBranch), never as the next stage of one line.
  it("hangs each branch of a build's weapon track off one of its stages, before its first, one level deep, each with its stages", () => {
    const notes = config.builds?.notes ?? [];
    const at = (row: string) => allRows.findIndex((item) => item.id === row);
    for (const build of config.builds?.named ?? []) {
      const branches = build.branches ?? [];
      if (branches.length) expect(build.addon, `${build.id}: an add-on has no weapon track`).toBeUndefined();
      expect(new Set(branches.map((branch) => branch.id)).size, `${build.id}: branch ids are unique`).toBe(branches.length);
      const staged = notes.filter((note) => note.stage && note.for.includes(build.id));
      for (const note of staged) if (note.branch) expect(branches.map((branch) => branch.id), `${note.row}: ${note.branch}`).toContain(note.branch);
      for (const branch of branches) {
        const where = `${build.id}: ${branch.id}`;
        expect(branch.id, where).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
        expect(branch.name.trim(), where).not.toBe("");
        expect(branch.why.trim().length, where).toBeGreaterThan(10);
        const stages = staged.filter((note) => note.branch === branch.id);
        expect(stages.length, `${where}: a stage on it`).toBeGreaterThan(0);
        const from = staged.find((note) => note.row === branch.from);
        expect(from, `${where}: leaves from a stage of the build`).toBeDefined();
        expect(at(branch.from), `${where}: leaves before its first stage`).toBeLessThan(Math.min(...stages.map((note) => at(note.row))));
        // One level deep: off the line, or off a branch that is off the line, and then a single stage.
        if (from?.branch) {
          const parent = branches.find((item) => item.id === from.branch);
          expect(staged.find((note) => note.row === parent?.from)?.branch, `${where}: one level deep`).toBeUndefined();
          expect(stages.length, `${where}: a branch off a branch is one stage`).toBe(1);
        }
      }
    }
  });

  it("puts each step on a real row, for leanings the guide names, with https sources, and a deadline only on two hosts and off a missable row", () => {
    const ids = leanings.map((leaning) => leaning.id);
    const missable = new Set(config.missables.map((item) => item.id));
    const seen = new Set<string>();
    for (const task of config.builds?.tasks ?? []) {
      const at = `${task.row}: ${task.title}`;
      expect(byId.has(task.row), at).toBe(true);
      expect(task.serves.length, at).toBeGreaterThan(0);
      expect(new Set(task.serves).size, `${at}: a leaning once`).toBe(task.serves.length);
      for (const id of task.serves) expect(ids, `${at}: ${id}`).toContain(id);
      expect(task.title.trim(), at).not.toBe("");
      expect(task.title, `${at}: the row's line adds the full stop`).not.toMatch(/[.!?]$/);
      expect(task.text.trim().length, at).toBeGreaterThan(10);
      expect(task.sources.length, at).toBeGreaterThan(0);
      for (const url of task.sources) expect(new URL(url).protocol, `${at}: ${url}`).toBe("https:");
      if (task.before) {
        expect(hosts(task.sources).size, `${at}: a deadline needs two independent hosts`).toBeGreaterThanOrEqual(2);
        expect(missable.has(task.row), `${at}: the row's missable warning already says it`).toBe(false);
      }
      expect(seen.has(at), `${at} twice`).toBe(false);
      seen.add(at);
    }
  });

  // The wikis' letter ranges differ (C is 52–79 on one, 50–74 on the other) and a +0 letter rises with each upgrade, so a note names the stats.
  it("says which stats a build entry's item scales with, never a scaling letter", () => {
    for (const bad of ["scales C with Dexterity", "C scaling", "scales with C Strength", "B Strength scaling", "E Strength and C Dexterity", "scaling: B", "S-scaling in Strength", "C/C", "E-to-B", "Strength: C", "Dexterity (B)", "scales with Strength and E", "scales with Faith (S)", "needs 10 Dexterity, B Dexterity."]) {
      expect(bad, "should be refused").toMatch(scalingLetter);
    }
    for (const good of [
      "needs 13 Strength and 15 Dexterity, and scales mostly with Dexterity.",
      "scales with both.",
      "each Normal level raises its Strength and Dexterity scaling.",
      "A Chaos weapon scales with humanity, up to 10, not with Strength or Dexterity.",
      "scales with Faith. A talisman",
      "Canvas Talisman: A Faith catalyst, needs 4 Faith.",
      "Dragon Scale: A Dragon weapon deals fixed damage.",
      "Dragon Scales: A Dragon weapon deals fixed damage.",
      "needs 40 Strength (A two-handed grip lowers that).",
      "A Strength and Dexterity weapon.",
    ]) {
      expect(good, "should pass").not.toMatch(scalingLetter);
    }
    for (const { id, start } of config.builds?.named ?? []) if (start?.why) expect(start.why, id).not.toMatch(scalingLetter);
    for (const { row, text } of config.builds?.notes ?? []) expect(text, row).not.toMatch(scalingLetter);
    for (const { row, text } of config.builds?.tasks ?? []) expect(text, row).not.toMatch(scalingLetter);
  });

  it("keeps each one-way choice to real rows, its later ways in later chapters, backed by two independent https sources", () => {
    const missable = new Set(config.missables.map((item) => item.id));
    const ids = (config.choices ?? []).flatMap((choice) => [choice.row, ...choice.later.map((later) => later.row)]);
    expect(new Set(ids).size, "a row is in one choice at most").toBe(ids.length);
    for (const choice of config.choices ?? []) {
      const row = byId.get(choice.row);
      expect(row, choice.row).toBeDefined();
      expect(missable.has(choice.row), `${choice.row} is a choice, so its warning is the choice's, not a missable's`).toBe(false);
      expect(choice.name.trim(), choice.row).not.toBe("");
      expect(choice.why.length, choice.row).toBeGreaterThan(10);
      expect(choice.later.length, `${choice.row} needs a later way`).toBeGreaterThan(0);
      for (const later of choice.later) {
        const other = byId.get(later.row);
        expect(other, later.row).toBeDefined();
        expect(other!.chapter, `${later.row} comes in a later chapter than ${choice.row}`).toBeGreaterThan(row!.chapter);
        expect(later.on.trim(), later.row).not.toBe("");
      }
      expect(choice.sources.every((url) => url.startsWith("https://"))).toBe(true);
      expect(hosts(choice.sources).size, `${choice.row} needs two independent hosts`).toBeGreaterThanOrEqual(2);
    }
  });

  it("keeps each questline to real rows, once each and in route order, under a stable id, and covers every row its tags name", () => {
    const at = new Map(allRows.map((row, index) => [row.id, index]));
    const { lines, cover = [] } = config.questlines;
    expect(new Set(lines.map((line) => line.id)).size).toBe(lines.length);
    for (const line of lines) {
      expect(line.id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(line.name.trim(), line.id).not.toBe("");
      expect(line.steps.length, line.id).toBeGreaterThan(0);
      for (const id of line.steps) expect(byId.has(id), `${line.id}: ${id}`).toBe(true);
      // Strictly in route order: the steps a reader has revealed are then always the line's first ones (questlines.ts).
      const order = line.steps.map((id) => at.get(id)!);
      expect(order, `${line.id} keeps to route order`).toEqual([...new Set(order)].sort((a, b) => a - b));
    }
    for (const tag of cover) expect(isCategory(tag), tag).toBe(true);
    const inLine = new Set(lines.flatMap((line) => line.steps));
    expect(allRows.filter((row) => row.tags.some((tag) => cover.includes(tag)) && !inLine.has(row.id)).map((row) => row.id)).toEqual([]);
  });

  it("finds the missables and one-way choices left in a chapter and drops them once checked", () => {
    for (const chapter of chapters) {
      const left = missablesLeft(chapter, {});
      expect(left.every((row) => row.tags.includes("missable") || row.tags.includes("one-way"))).toBe(true);
      expect(missablesLeft(chapter, everything)).toEqual([]);
    }
    expect(chapters.flatMap((chapter) => missablesLeft(chapter, {})).length).toBe(config.missables.length + (config.choices ?? []).length);
  });

  // Platform achievements can check the data, but a reader sees achievements only where the game keeps its own list (types.ts).
  it("says achievement or trophy only where the game keeps its own, backed by two independent hosts", () => {
    const said = readerText(config, panels).filter(([, text]) => /achievement|\btroph(y|ies)\b/i.test(text));
    if (config.achievements) expect(hosts(config.achievements.sources.map(([, url]) => url)).size).toBeGreaterThanOrEqual(2);
    else expect(said.map(([path, text]) => `${path}: ${text}`)).toEqual([]);
  });

  it("reads every row, chapter, group, map, category, chip, missable, choice, questline, build, page text and panel title as reader text, and never a citation, a link or an id", () => {
    const found = readerText(config, panels);
    const text = new Set(found.map(([, value]) => value));
    for (const row of allRows) for (const value of [row.title, row.text]) expect(text.has(value), row.id).toBe(true);
    const shown = [
      ...Object.values(config.text),
      brand.name,
      brand.shortName,
      brand.title,
      brand.mark,
      brand.description,
      ...Object.values(cats).flatMap(([plural, singular]) => [plural, singular]),
      ...[...config.chips.checklist, ...(config.chips.route ?? [])].map(([, label]) => label),
      ...chapters.flatMap((chapter) => [chapter.title, chapter.region, chapter.intro, chapter.teaser]),
      ...chapters.flatMap((chapter) => chapter.groups.flatMap((group) => [group.title, group.location, group.note, group.map?.[0]])),
      ...allRows.map((row) => row.map?.[0]),
      ...config.missables.map((item) => item.why),
      ...(config.choices ?? []).flatMap((choice) => [choice.name, choice.why, ...choice.later.map((later) => later.on)]),
      config.reassurance?.text,
      config.questlines.tab,
      config.questlines.title,
      config.questlines.intro,
      ...config.questlines.lines.map((line) => line.name),
      ...panels.map((panel) => panel.title),
      ...leanings.map((leaning) => leaning.label),
      ...(config.builds?.named ?? []).flatMap((build) => [build.name, build.blurb]),
      ...(config.builds?.named ?? []).flatMap(({ start }) => (start ? [start.class, start.weapon, start.why, ...start.guides.map(([name]) => name), ...(start.lists ?? []).map(([name]) => name)] : [])),
      ...(config.builds?.picks ?? []).flatMap((pick) => [pick.item, ...pick.guides.map(([name]) => name), ...(pick.lists ?? []).map(([name]) => name)]),
      ...(config.builds?.tasks ?? []).flatMap((task) => [task.title, task.text, task.before]),
      ...(config.builds?.notes ?? []).flatMap((note) => [note.text, note.stage]),
      ...(config.builds?.named ?? []).flatMap((build) => (build.branches ?? []).flatMap((branch) => [branch.name, branch.why])),
    ];
    for (const value of shown) {
      if (value !== undefined) expect(text.has(value), value).toBe(true);
    }
    // Nor a build's id or a branch's, which name them in the data and never to a reader.
    const buildIds = new Set((config.builds?.named ?? []).flatMap((build) => [build.id, ...(build.branches ?? []).map((branch) => branch.id)]));
    expect(found.filter(([path, value]) => /sources|reference/.test(path) || /^https?:/.test(value) || byId.has(value) || buildIds.has(value))).toEqual([]);
  });

  it("names every category it shows", () => {
    for (const [id, [plural, singular]] of Object.entries(cats)) {
      expect(plural, id).not.toBe("");
      expect(singular, id).not.toBe("");
    }
  });

  it("clamps chapter numbers", () => {
    expect(readChapter("3")).toBe(Math.min(3, CHAPTER_COUNT));
    expect(readChapter("0", 2)).toBe(2);
    expect(readChapter(String(CHAPTER_COUNT + 1))).toBe(1);
    expect(readChapter("x", 2)).toBe(2);
  });

  it("resolves a row id or a section key to an anchor in its own chapter only", () => {
    const row = chapters[0].groups[0].rows[0];
    expect(guideAnchor(1, row.id)).toBe(`entry-${row.id}`);
    expect(guideAnchor(1, chapters[0].groups[0].key)).toBe(chapters[0].groups[0].key);
    expect(guideAnchor(2, row.id)).toBeUndefined();
    expect(guideAnchor(1, "nope")).toBeUndefined();
  });
});

describe("nextUp", () => {
  const open = (n: number) => n <= 2;
  const steps = (checks: Record<string, true>, isOpen: (n: number) => boolean, from: number, count: number) =>
    nextUp({ checks }, isOpen, from, count).items.map((item) => item.row);

  it("starts at the given chapter in guide order and skips checked steps", () => {
    const [first, second] = chapterRows(chapters[0]).filter((row) => !config.defer?.(row) && row.requires.length === 0);
    const rows = steps({ [first.id]: true }, open, 1, 3);
    expect(rows).toHaveLength(3);
    expect(rows[0].id).toBe(second.id);
    expect(rows.every((row) => row.chapter <= 2)).toBe(true);
  });

  it("never reaches into hidden chapters", () => {
    const openIds = Object.fromEntries(allRows.filter((row) => row.chapter <= 2).map((row) => [row.id, true as const]));
    expect(steps(openIds, open, 1, 3)).toEqual([]);
  });

  it("wraps round to earlier chapters", () => {
    const later = Object.fromEntries(allRows.filter((row) => row.chapter === 2).map((row) => [row.id, true as const]));
    expect(steps(later, open, 2, 1)[0].chapter).toBe(1);
  });

  it("holds deferred rows back until nothing else is left", () => {
    const all = () => true;
    expect(steps({}, all, 1, 50).some((row) => config.defer?.(row))).toBe(false);
    const deferred = allRows.filter((row) => config.defer?.(row));
    if (!deferred.length) return;
    const rest = Object.fromEntries(allRows.filter((row) => !config.defer?.(row)).map((row) => [row.id, true as const]));
    expect(steps(rest, all, 1, 3).every((row) => config.defer?.(row))).toBe(true);
  });
});

describe("the guide's flow", () => {
  const real = (id: string) => byId.has(id);

  it("names real rows in every requirement, never the row itself or a retired id, and no requirement loops back", () => {
    for (const row of allRows) {
      for (const any of row.requires) {
        expect(any.length, `${row.id}: an empty requirement`).toBeGreaterThan(0);
        for (const id of any) {
          expect(real(id), `${row.id} requires ${id}, no row`).toBe(true);
          expect(id, `${row.id} requires itself`).not.toBe(row.id);
        }
      }
    }
    // No cycle: following requirements from any row never comes back to it.
    const reaches = (from: string, seen = new Set<string>()): boolean =>
      (byId.get(from)?.requires.flat() ?? []).some((id) => !seen.has(id) && (seen.add(id), id === from || reaches(id, seen)));
    for (const row of allRows) if (row.requires.length) expect(reaches(row.id), `${row.id} requires itself through others`).toBe(false);
  });

  it("gives a place and what a row gives as words, when it has them", () => {
    for (const [, , , , extra] of config.chapters.flatMap((chapter) => chapter.groups.flatMap((group) => group.rows))) {
      if (extra?.place !== undefined) expect(extra.place.trim().length).toBeGreaterThan(0);
      if (extra?.gives !== undefined) expect(extra.gives.trim().length).toBeGreaterThan(0);
    }
  });

  it("retires every split bundle for good: never a row, in one split, every part a row or another split, no loops", () => {
    const splits = config.splits ?? [];
    const froms = splits.map((split) => split.from);
    expect(new Set(froms).size, "a bundle split twice").toBe(froms.length);
    for (const { from, into } of splits) {
      expect(real(from), `${from} is split but is still a row`).toBe(false);
      expect(into.length, `${from} splits into nothing`).toBeGreaterThan(0);
      for (const part of into) expect(real(part) || froms.includes(part), `${from} splits into ${part}, no row`).toBe(true);
      expect(partsOf(from).every(real), `${from} doesn't end in rows`).toBe(true);
    }
  });

  it("lists every row that has ever shipped in data/live-ids.txt, and keeps every line a row or a retired bundle", () => {
    // A rename or a dropped row comes back unticked for every reader: a line can go only through a split (data/splits.ts), which
    // ticks its parts. A line added on a branch that never reached main may simply be deleted.
    const lines = liveIds.split("\n").map((line) => line.trim()).filter(Boolean);
    const listed = new Set(lines);
    const missing = allRows.map((row) => row.id).filter((id) => !listed.has(id));
    expect(missing, `add these lines to data/live-ids.txt:\n${missing.join("\n")}\n`).toEqual([]);
    const gone = lines.filter((id) => !real(id) && !isRetired(id));
    expect(gone, `rows that shipped and are gone; split them (data/splits.ts) instead:\n${gone.join("\n")}\n`).toEqual([]);
    expect([...lines].sort(), "data/live-ids.txt is sorted, one id a line").toEqual(lines);
  });

  it("loses no tick: everything that ever shipped, ticked or set aside, loads, imports and syncs as every row", () => {
    const lines = liveIds.split("\n").map((line) => line.trim()).filter(Boolean);
    const rows = allRows.map((row) => row.id).sort();
    const saved = { version: 3, guide: brand.id, checks: Object.fromEntries(lines.map((id) => [id, true])), ceiling: 1, spoilers: true, chapter: 1 };
    expect(Object.keys(validateState(saved).checks).sort()).toEqual(rows);
    const synced = viewFrom(Object.fromEntries(lines.map((id) => [`c:${id}`, [1, 1] as const])), validateState({ ...saved, checks: {} }));
    expect(Object.keys(synced.checks).sort()).toEqual(rows);
    const aside = validateState({ ...saved, checks: {}, later: Object.fromEntries(lines.map((id) => [id, id])) });
    expect(Object.keys(aside.later ?? {}).sort()).toEqual(rows);
    const asideSynced = viewFrom(Object.fromEntries(lines.map((id) => [`l:${id}`, [1, id] as const])), validateState({ ...saved, checks: {} }));
    expect(Object.keys(asideSynced.later ?? {}).sort()).toEqual(rows);
  });
});

describe("the build plan", () => {
  const all = leanings.map((leaning) => leaning.id);

  it("is empty without a pick, and never reaches into hidden chapters", () => {
    expect(buildPlan(() => true, [])).toEqual([]);
    for (const ceiling of [1, 2, CHAPTER_COUNT]) {
      for (const { chapter, rows } of buildPlan((n) => n <= ceiling, all)) {
        expect(chapter.id).toBeLessThanOrEqual(ceiling);
        expect(rows.length, `chapter ${chapter.id}`).toBeGreaterThan(0);
        for (const { row, notes, tasks, warnings } of rows) {
          expect(row.chapter, row.id).toBe(chapter.id);
          expect(notes.length + tasks.length + warnings.length, row.id).toBeGreaterThan(0);
        }
      }
    }
  });

  it("draws a build's weapon track from its start and its notes' stages, revealed chapters only, each line in route order with its forks in place, and nothing for a pick that reads steps", () => {
    const stageOf = (item: TrackItem | undefined) => (item && "stage" in item ? item.stage : undefined);
    const lines = (items: TrackItem[]): TrackItem[][] => [items, ...items.flatMap((item) => ("fork" in item ? item.fork.branches.flatMap((branch) => lines(branch.line)) : []))];
    const forksOf = (items: TrackItem[]): TrackFork[] => items.flatMap((item) => ("fork" in item ? [item.fork, ...item.fork.branches.flatMap((branch) => forksOf(branch.line))] : []));
    for (const build of namedBuilds) {
      // Whether a branch is the other way to a default is the build's, the same at every reveal: what the fully revealed track says.
      const whole = weaponTrack(() => true, build.stats);
      const other = new Map(forksOf(whole?.line ?? []).flatMap((fork) => fork.branches.map((branch) => [branch.branch.id, fork.alternative] as const)));
      for (const ceiling of [1, 2, 3, 5, 8, CHAPTER_COUNT]) {
        const track = weaponTrack((n) => n <= ceiling, build.stats);
        if (!readsNotes(build.stats)) {
          expect(track, `${build.id}: reads steps`).toBeNull();
          continue;
        }
        expect(track!.start, build.id).toEqual(build.start?.weapon ? build.start : undefined);
        for (const line of lines(track!.line)) {
          const order = line.flatMap((item) => ("stage" in item ? [allRows.indexOf(item.stage.row)] : []));
          expect(order, build.id).toEqual([...order].sort((a, b) => a - b));
          // A fork follows the stage it's placed after, leaves one stage, its branches start after that stage and before the line's next
          // one, and it's the other way to a default exactly when the line goes on past the stage it leaves, revealed or not.
          line.forEach((item, i) => {
            if (!("fork" in item)) return;
            const before = stageOf(line[i - 1]);
            const next = line.slice(i + 1).map(stageOf).find(Boolean);
            expect(before, `${build.id}: a fork after a stage`).toBeDefined();
            for (const { branch, from, line: way } of item.fork.branches) {
              const first = allRows.indexOf(stageOf(way[0])!.row);
              expect(from.row.id, `${build.id}: ${branch.id}`).toBe(branch.from);
              expect(allRows.indexOf(before!.row), `${build.id}: ${branch.id}`).toBeLessThan(first);
              if (next) expect(allRows.indexOf(next.row), `${build.id}: ${branch.id}`).toBeGreaterThan(first);
            }
            expect(new Set(item.fork.branches.map(({ from }) => from.row.id)).size, `${build.id}: a fork leaves one stage`).toBe(1);
            for (const { branch } of item.fork.branches) expect(item.fork.alternative, `${build.id}: ${branch.id} at ${ceiling}`).toBe(other.get(branch.id));
            // A branch drawn as its one stage has nothing else on it, in any chapter: no stage, and no branch off it, goes undrawn.
            for (const { branch, single, line: way } of item.fork.branches) if (single) expect(way.length, `${build.id}: ${branch.id} at ${ceiling}`).toBe(1);
            const hidden = (build.branches ?? []).filter((branch) => branch.from === item.fork.branches[0].from.row.id && !item.fork.branches.some((drawn) => drawn.branch === branch));
            expect(item.fork.more, `${build.id}: ${ceiling}`).toBe(!item.fork.alternative && hidden.length > 0);
          });
        }
        const drawn: TrackStage[] = trackStages(track!.line);
        for (const { row, note } of drawn) {
          expect(row.chapter, `${build.id}: ${row.id}`).toBeLessThanOrEqual(ceiling);
          expect(note.stage, `${build.id}: ${row.id}`).toBeTruthy();
          expect(note.for, `${build.id}: ${row.id}`).toContain(build.id);
        }
        if (ceiling === CHAPTER_COUNT)
          for (const line of lines(track!.line)) {
            const stages = line.map(stageOf).filter(Boolean);
            for (const item of line) if ("fork" in item) expect(item.fork.alternative, build.id).toBe(item.fork.branches[0].from.row.id !== stages[stages.length - 1]!.row.id);
          }
        // Every stage revealed is drawn, once: none lost to a branch whose stage it leaves from is hidden.
        const revealed = (config.builds?.notes ?? []).filter((note) => note.stage && note.for.includes(build.id) && byId.get(note.row)!.chapter <= ceiling);
        expect(drawn.map(({ note }) => note).sort((a, b) => a.row.localeCompare(b.row)), build.id).toEqual([...revealed].sort((a, b) => a.row.localeCompare(b.row)));
      }
    }
    const custom = leanings.flatMap((a) => leanings.map((b) => [a.id, b.id])).find(([a, b]) => a !== b && !buildOf([a, b]));
    if (custom) expect(weaponTrack(() => true, custom)).toBeNull();
    // An add-on changes no build's weapon: the track is the named build's alone (checked once a guide has an add-on's notes).
    for (const addon of addons) {
      for (const build of namedBuilds.filter((item) => !addon.stats.some((stat) => item.stats.includes(stat)))) {
        const both = [...build.stats, ...addon.stats];
        if (readsNotes(both)) expect(weaponTrack(() => true, both), `${build.id} + ${addon.id}`).toEqual(weaponTrack(() => true, build.stats));
      }
    }
  });

  // A pick with an add-on reads notes only once both have them: a Paladin with Pyromancy reads steps while Pyromancy has no notes. Until a
  // guide writes an add-on's notes, only the steps side of this runs.
  it("reads notes for a build with an add-on only when both have notes, and steps otherwise", () => {
    const noted = new Set((config.builds?.notes ?? []).flatMap((note) => note.for));
    for (const addon of addons) {
      for (const build of namedBuilds.filter((item) => !addon.stats.some((stat) => item.stats.includes(stat)))) {
        const both = [...build.stats, ...addon.stats];
        const reads = noted.has(build.id) && noted.has(addon.id);
        expect(readsNotes(both), `${build.id} + ${addon.id}`).toEqual(reads ? [build.id, addon.id] : null);
        for (const row of allRows) {
          if (reads) expect(tasksFor(row.id, both), `${build.id} + ${addon.id}: ${row.id}`).toEqual([]);
          else expect(notesFor(row.id, both), `${build.id} + ${addon.id}: ${row.id}`).toEqual([]);
        }
      }
    }
  });

  it("shows a pick that reads steps the steps serving it, and a pick that reads notes its notes and the deadlines of the steps serving it", () => {
    for (const build of namedBuilds) {
      for (const row of allRows) {
        const steps = (config.builds?.tasks ?? []).filter((task) => task.row === row.id && task.serves.some((id) => build.stats.includes(id)));
        if (readsNotes(build.stats)) {
          expect(tasksFor(row.id, build.stats), `${build.id}: ${row.id}`).toEqual([]);
          expect(warningsFor(row.id, build.stats), `${build.id}: ${row.id}`).toEqual(steps.flatMap((task) => (task.before ? [task.before] : [])));
          for (const note of notesFor(row.id, build.stats)) expect(note.for, `${build.id}: ${row.id}`).toContain(build.id);
        } else {
          expect(tasksFor(row.id, build.stats), `${build.id}: ${row.id}`).toEqual(steps);
          expect(notesFor(row.id, build.stats), `${build.id}: ${row.id}`).toEqual([]);
        }
      }
    }
  });

  it("gives a custom pick no picks, since guides recommend for named builds", () => {
    const custom = all.length > 1 ? all : [];
    if (custom.length && !buildOf(custom)) for (const row of allRows) expect(picksFor(row.id, custom), row.id).toEqual([]);
  });
});

describe("completion", () => {
  it("lists what is left, biggest first, and empties once everything is checked", () => {
    const left = whatsLeft({});
    expect(left.length).toBeGreaterThan(0);
    expect([...left].sort((a, b) => b.left - a.left).map((item) => item.left)).toEqual(left.map((item) => item.left));
    expect(whatsLeft(everything)).toEqual([]);
  });

  it("counts a category from nothing to everything", () => {
    for (const { tag } of completion.board) {
      const { done, total } = tally(tag, everything);
      expect(done, tag).toBe(total);
      expect(tally(tag, {}).done, tag).toBe(0);
    }
  });
});

// The completion rules (docs/core.md), held here in every guide so a guide can't drift from them unseen. Each test names its rule.
describe("the completion rules", () => {
  const { directions, outside = [] } = completion;
  const board = new Set(completion.board.map((item) => item.tag));
  const counted = new Set(completion.board.filter((item) => !outside.includes(item.tag)).map((item) => item.tag));
  const counts = (row: Row) => row.tags.some((tag) => counted.has(tag));

  it("names its direction tags and what lies outside the game as categories, apart, and never a direction on the board (rules 2 and 3)", () => {
    expect(directions.length, "a guide names the tags of its route steps").toBeGreaterThan(0);
    for (const tag of [...directions, ...outside]) expect(isCategory(tag), tag).toBe(true);
    expect(directions.filter((tag) => outside.includes(tag))).toEqual([]);
    expect(directions.filter((tag) => board.has(tag)), "a direction is never a target").toEqual([]);
  });

  it("gives every target a goal, exactly its rows as the board counts them (rule 5)", () => {
    for (const { tag, goal } of completion.board) {
      expect(Number.isInteger(goal) && goal > 0, `${tag}: ${goal}`).toBe(true);
      expect(tally(tag, {}).total, `${tag}'s goal is its rows`).toBe(goal);
    }
  });

  // Rule 1, everything the guide tracks counts; rule 2, a step the game doesn't credit never does. The first tag is a row's label, so a
  // row labelled a direction counts nothing, and every other row counts but what lies outside the game.
  it("counts every row but its directions and what lies outside the game, and never a row labelled a direction (rules 1 and 2)", () => {
    const wrong = allRows.flatMap((row) => {
      if (directions.includes(row.tags[0])) return row.tags.some((tag) => board.has(tag)) ? [`${row.id}: labelled a direction, on a target`] : [];
      if (row.tags.some((tag) => outside.includes(tag))) return counts(row) ? [`${row.id}: outside the game, but counted`] : [];
      return counts(row) ? [] : [`${row.id}: counts nothing, but isn't labelled a direction`];
    });
    expect(wrong).toEqual([]);
  });

  // Rule 4, per item: a game's own lists stand as the game counts them and may share a row (an Echoes side quest and the accessory it
  // awards), but a list the guide makes up itself only takes rows no other target counts.
  it("never counts a row of the guide's own lists under another target (rule 4)", () => {
    const own = completion.board.filter((item) => item.list === "guide").map((item) => item.tag);
    const shared = allRows.filter((row) => row.tags.some((tag) => own.includes(tag)) && row.tags.filter((tag) => board.has(tag)).length > 1);
    expect(shared.map((row) => `${row.id}: ${row.tags.filter((tag) => board.has(tag)).join(" + ")}`)).toEqual([]);
  });

  it("counts every way of a one-way choice, the recommended one and each later one (rule 6)", () => {
    for (const choice of config.choices ?? []) {
      for (const id of [choice.row, ...choice.later.map((later) => later.row)]) expect(counts(byId.get(id)!), `${choice.name}: ${id}`).toBe(true);
    }
  });
});

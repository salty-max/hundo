// @vitest-environment node
import { panels } from "virtual:guide/panels";
import { allRows, brand, byId, cats, chapterRows, chapters, CHAPTER_COUNT, completion, addons, backs, buildKinds, buildOf, buildPlan, config, guideAnchor, namedBuilds, picksFor, stepNumber, tasksFor, hasMissables, isCategory, leanings, missablesLeft, nextUp, readChapter, rowsByTag, tally, whatsLeft } from "./guide";
import { readerText } from "./reader-text";
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

  it("points each build entry at a real row, for leanings the guide names, with a note and an https source", () => {
    const ids = leanings.map((leaning) => leaning.id);
    expect(new Set(ids).size, "leaning ids are unique").toBe(ids.length);
    for (const { id, label } of leanings) {
      expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(label.trim(), id).not.toBe("");
    }
    if (config.builds) expect(leanings.length, "a guide with builds names its leanings").toBeGreaterThan(0);
    // A leaning nothing serves would be a box that does nothing.
    for (const { id } of leanings) expect((config.builds?.entries ?? []).some((entry) => entry.serves.includes(id)), `nothing serves ${id}`).toBe(true);
    const seen = new Set<string>();
    for (const { row, serves, kind, note, sources } of config.builds?.entries ?? []) {
      expect(byId.has(row), row).toBe(true);
      expect(serves.length, row).toBeGreaterThan(0);
      expect(new Set(serves).size, `${row}: a leaning once`).toBe(serves.length);
      for (const id of serves) expect(ids, `${row}: ${id}`).toContain(id);
      expect(note.trim().length, row).toBeGreaterThan(10);
      expect(buildKinds, `${row}: ${kind}`).toContain(kind);
      expect(sources.length, row).toBeGreaterThan(0);
      for (const url of sources) expect(new URL(url).protocol, `${row}: ${url}`).toBe("https:");
      expect(seen.has(`${row} ${note}`), `${row}: the same note twice`).toBe(false);
      seen.add(`${row} ${note}`);
    }
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

  it("backs each pick, for each named build it is for, with a guide for that build and a second independent host, on a real row", () => {
    const named = new Set(namedBuilds.concat(addons).map((build) => build.id));
    const seen = new Set<string>();
    for (const pick of config.builds?.picks ?? []) {
      const at = `${pick.row}: ${pick.item}`;
      expect(byId.has(pick.row), at).toBe(true);
      expect(pick.for.length, at).toBeGreaterThan(0);
      for (const id of pick.for) expect(named.has(id), `${at}: ${id}`).toBe(true);
      expect(buildKinds, at).toContain(pick.kind);
      expect(pick.item.trim(), at).not.toBe("");
      expect(pick.why.trim().length, at).toBeGreaterThan(5);
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
      expect(seen.has(at), `${at} twice`).toBe(false);
      seen.add(at);
    }
  });

  // A build's words say who recommends what; none of them ranks.
  it("never says best in anything a build shows", () => {
    // Every reader string under builds, as the reader-text walk finds them: a field added later is checked too.
    const words = readerText(config).filter(([path]) => path.startsWith("builds."));
    expect(words.filter(([, word]) => /\bbest\b/i.test(word))).toEqual([]);
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
    for (const { row, note } of config.builds?.entries ?? []) expect(note, row).not.toMatch(scalingLetter);
    for (const { row, why } of config.builds?.picks ?? []) expect(why, row).not.toMatch(scalingLetter);
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
      ...(config.builds?.entries ?? []).map((entry) => entry.note),
      ...(config.builds?.named ?? []).flatMap((build) => [build.name, build.blurb]),
      ...(config.builds?.picks ?? []).flatMap((pick) => [pick.item, pick.why, ...pick.guides.map(([name]) => name), ...(pick.lists ?? []).map(([name]) => name)]),
      ...(config.builds?.tasks ?? []).flatMap((task) => [task.title, task.text, task.before]),
    ];
    for (const value of shown) {
      if (value !== undefined) expect(text.has(value), value).toBe(true);
    }
    expect(found.filter(([path, value]) => /sources|reference/.test(path) || /^https?:/.test(value) || byId.has(value))).toEqual([]);
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

  it("starts at the given chapter in guide order and skips checked steps", () => {
    const [first, second] = chapterRows(chapters[0]).filter((row) => !config.defer?.(row));
    const rows = nextUp({ [first.id]: true }, open, 1, 3);
    expect(rows).toHaveLength(3);
    expect(rows[0].id).toBe(second.id);
    expect(rows.every((row) => row.chapter <= 2)).toBe(true);
  });

  it("never reaches into hidden chapters", () => {
    const openIds = Object.fromEntries(allRows.filter((row) => row.chapter <= 2).map((row) => [row.id, true as const]));
    expect(nextUp(openIds, open, 1, 3)).toEqual([]);
  });

  it("wraps round to earlier chapters", () => {
    const later = Object.fromEntries(allRows.filter((row) => row.chapter === 2).map((row) => [row.id, true as const]));
    expect(nextUp(later, open, 2, 1)[0].chapter).toBe(1);
  });

  it("holds deferred rows back until nothing else is left", () => {
    const all = () => true;
    expect(nextUp({}, all, 1, 50).some((row) => config.defer?.(row))).toBe(false);
    const deferred = allRows.filter((row) => config.defer?.(row));
    if (!deferred.length) return;
    const rest = Object.fromEntries(allRows.filter((row) => !config.defer?.(row)).map((row) => [row.id, true as const]));
    expect(nextUp(rest, all, 1, 3).every((row) => config.defer?.(row))).toBe(true);
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
        for (const { row, tasks, picks, entries } of rows) {
          expect(row.chapter, row.id).toBe(chapter.id);
          expect(tasks.length + picks.length + entries.length, row.id).toBeGreaterThan(0);
        }
      }
    }
  });

  it("numbers a pick's steps from 1 in route order, and a step serves the pick it's numbered for", () => {
    for (const id of all) {
      const steps = (config.builds?.tasks ?? []).filter((task) => task.serves.includes(id));
      const numbers = allRows.flatMap((row) => tasksFor(row.id, [id]).map((task) => stepNumber(task, [id])));
      expect(numbers, id).toEqual(steps.map((_, i) => i + 1));
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

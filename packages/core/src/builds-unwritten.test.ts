import { addons, allRows, buildName, config, leadsFor, namedBuilds, notesFor, readsNotes, tasksFor, weaponTrack } from "./guide";

// A guide writes its builds' notes a few at a time, and until every build in a pick has them the pick reads its leanings' steps. No guide's
// data is in that state once Lordran's builds all have notes (22 Nov 2026), so this takes the guide's own builds and drops the notes of its
// add-ons and of its last named build with notes: one build written, one not, an add-on not.
vi.mock("virtual:guide/config", async (importOriginal) => {
  const { default: real } = await importOriginal<typeof import("virtual:guide/config")>();
  const builds = real.builds;
  const named = builds?.named ?? [];
  const all = builds?.notes ?? [];
  const written = named.filter((build) => !build.addon && all.some((note) => note.for.includes(build.id)));
  if (!builds || !written.length) return { default: real };
  const drop = new Set([...named.filter((build) => build.addon).map((build) => build.id), written[written.length - 1].id]);
  const notes = all.flatMap((note) => {
    const kept = note.for.filter((id) => !drop.has(id));
    return kept.length ? [{ ...note, for: kept }] : [];
  });
  return { default: { ...real, builds: { ...builds, notes } } };
});

const noted = new Set((config.builds?.notes ?? []).flatMap((note) => note.for));
const serving = (picked: string[]) => allRows.filter((row) => (config.builds?.tasks ?? []).some((task) => task.row === row.id && task.serves.some((id) => picked.includes(id))));

describe.skipIf(noted.size === 0)("builds whose notes aren't all written", () => {
  const written = namedBuilds.filter((build) => noted.has(build.id));
  const unwritten = namedBuilds.filter((build) => !noted.has(build.id));

  it("has a build written, a build not, and an add-on not, to read", () => {
    expect(written.length).toBeGreaterThan(0);
    expect(unwritten.length).toBeGreaterThan(0);
    expect(addons.length).toBeGreaterThan(0);
    for (const addon of addons) expect(noted.has(addon.id), addon.id).toBe(false);
  });

  it("reads notes for a written build alone, and steps for a build not written yet", () => {
    for (const build of written) expect(readsNotes(build.stats), build.id).toEqual([build.id]);
    for (const build of unwritten) {
      expect(readsNotes(build.stats), build.id).toBeNull();
      expect(weaponTrack(() => true, build.stats), build.id).toEqual([]);
      const rows = serving(build.stats);
      expect(rows.length, build.id).toBeGreaterThan(0);
      for (const row of rows) {
        expect(notesFor(row.id, build.stats), `${build.id}: ${row.id}`).toEqual([]);
        expect(tasksFor(row.id, build.stats).length, `${build.id}: ${row.id}`).toBeGreaterThan(0);
      }
    }
  });

  it("reads steps for a written build beside an add-on not written, led by the pick's whole name", () => {
    let checked = 0;
    for (const build of written) {
      for (const addon of addons.filter((item) => !item.stats.some((stat) => build.stats.includes(stat)))) {
        const both = [...build.stats, ...addon.stats];
        expect(readsNotes(both), `${build.id} + ${addon.id}`).toBeNull();
        expect(buildName(both)).toBe(`${build.name} + ${addon.name}`);
        expect(leadsFor(both).steps).toBe(buildName(both));
        for (const row of serving(both)) {
          expect(notesFor(row.id, both), `${build.id} + ${addon.id}: ${row.id}`).toEqual([]);
          expect(tasksFor(row.id, both).length, `${build.id} + ${addon.id}: ${row.id}`).toBeGreaterThan(0);
        }
        checked++;
      }
    }
    expect(checked).toBeGreaterThan(0);
  });
});

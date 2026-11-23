import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";
import { addons, allRows, buildName, buildOf, byId, chapterPlan, chapters, CHAPTER_COUNT, config, hasBuilds, inWords, leanings, namedBuilds, picksFor, readsNotes, tasksFor, trackStages, weaponTrack, whoSays, type TrackFork, type TrackItem, type TrackStage } from "./guide";
import { defaultState } from "./progress-state";
import { BUILD_ASKED_KEY, BUILD_KEY, normalizeBuild, useBuild } from "./store/build";
import { forgetPlaces } from "./store/place";
import { useProgress } from "./store/progress";
import { useUi } from "./store/ui";
import { allowSlowMounts } from "./test/slow";

allowSlowMounts();

beforeEach(() => {
  localStorage.clear();
  forgetPlaces();
  useBuild.setState({ picked: [], asked: false });
  useProgress.setState({ data: defaultState(), storageError: false });
  useUi.setState({ toast: null, openGroups: {}, dialog: null, dialogKey: 0, afterClose: null, announcement: "" });
});

const open = async (path: string, heading?: string) => {
  history.replaceState(null, "", path);
  render(<App />);
  return heading ? screen.findByRole("heading", { level: 1, name: heading }) : screen.findByRole("heading", { level: 1 });
};

const escape = (text: string) => new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
const firstBox = (step: HTMLElement) => within(step).getAllByRole("checkbox")[0];

describe.runIf(!hasBuilds)("a guide without builds", () => {
  it("shows nothing of builds: no strip, no Build advice, no dialog on a tick, even with a pick saved under the key", async () => {
    localStorage.setItem(BUILD_KEY, "dex fth");
    useBuild.setState({ picked: normalizeBuild(localStorage.getItem(BUILD_KEY)) });
    expect(useBuild.getState().picked).toEqual([]);
    const user = userEvent.setup();
    await open("/guide/1");
    expect(screen.queryByRole("region", { name: "Build advice" })).toBeNull();
    const row = chapters[0].groups[0].rows[0];
    await user.click(firstBox(document.getElementById(`entry-${row.id}`) ?? document.body));
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(useUi.getState().dialog).toBeNull();
    expect(localStorage.getItem(BUILD_ASKED_KEY)).toBeNull();
    expect(allRows.some((item) => picksFor(item.id, ["dex", "fth"]).length + tasksFor(item.id, ["dex", "fth"]).length > 0)).toBe(false);
  });
});

describe.runIf(hasBuilds)("a guide with builds", () => {
  // (the suite's body runs in every guide, skipped or not, so nothing here reads builds a guide may not have)
  // A note for a named build that reads notes, with a pick under it (so a Who says so), and that build.
  const noted = (config.builds?.notes ?? []).flatMap((note) => {
    const build = namedBuilds.find((item) => note.for.includes(item.id) && readsNotes(item.stats));
    return build ? [{ note, build }] : [];
  });
  const backed = noted.find(({ note, build }) => whoSays(note, build.stats).length > 0);
  // A step, and a pick that reads it as a step: its leaning alone, or with another into a custom pick, whichever reads steps.
  const stepped = (config.builds?.tasks ?? []).flatMap((task) => {
    const picks = [[task.serves[0]], ...leanings.map((item) => [task.serves[0], item.id])].filter((ids) => new Set(ids).size === ids.length);
    const picked = picks.find((ids) => !readsNotes(ids));
    return picked ? [{ task, picked }] : [];
  })[0];
  const reveal = (chapter: number) => useProgress.setState({ data: { ...defaultState(), ceiling: chapter, chapter } });

  it("keeps the pick under its key in the guide's order, drops what it doesn't name, keeps a leaning a later build added, and is asked once it's set", () => {
    const ids = leanings.map((item) => item.id);
    act(() => useBuild.getState().setPicked([...ids].reverse()));
    expect(localStorage.getItem(BUILD_KEY)).toBe(ids.join(" "));
    expect(localStorage.getItem(BUILD_ASKED_KEY)).not.toBeNull();
    expect(useBuild.getState().asked).toBe(true);
    expect(normalizeBuild(`${ids[0]} not-a-leaning`)).toEqual([ids[0]]);
    // A tab on an older build saving its pick doesn't erase a leaning only a newer build names.
    localStorage.setItem(BUILD_KEY, `${ids[0]} added-later`);
    act(() => useBuild.getState().setPicked([ids[1]]));
    expect(localStorage.getItem(BUILD_KEY)).toBe(`${ids[1]} added-later`);
    // A leaning this build retired goes on the next save, so a tab on the older build doesn't read a cleared pick as a build of it alone.
    const retired = config.builds?.retired?.[0];
    if (retired) {
      localStorage.setItem(BUILD_KEY, `${ids[0]} ${retired} added-later`);
      act(() => useBuild.getState().setPicked([]));
      expect(localStorage.getItem(BUILD_KEY)).toBe("added-later");
    }
    localStorage.removeItem(BUILD_KEY);
    act(() => useBuild.getState().setPicked([]));
    // No build is no key, as before: only the asked key says the reader answered.
    expect(localStorage.getItem(BUILD_KEY)).toBeNull();
    expect(localStorage.getItem(BUILD_ASKED_KEY)).not.toBeNull();
  });

  it("names a pick: each named build by its leanings, add-ons on top, and a custom pick by its stats", () => {
    for (const build of namedBuilds) expect(buildName(build.stats)).toBe(build.name);
    for (const addon of addons) {
      const base = namedBuilds.find((build) => !addon.stats.some((stat) => build.stats.includes(stat)));
      if (base) expect(buildName(normalizeBuild([...base.stats, ...addon.stats].join(" ")))).toBe(`${base.name} + ${addon.name}`);
    }
    const custom = leanings.map((item) => item.id);
    if (!buildOf(custom)) expect(buildName(custom)).toMatch(/ and /);
  });

  it("invites from the strip until answered, opens nothing on a tick, and No thanks hides the strip for good, with Settings the way back", async () => {
    const row = chapters[0].groups[0].rows[0];
    const user = userEvent.setup();
    await open("/guide/1");
    const strip = screen.getByRole("region", { name: "Build advice" });
    expect(within(strip).getByText("Playing a build?")).toBeInTheDocument();
    // Nothing opens on its own: not on load, not on a tick, not on a Check all.
    await user.click(firstBox(document.getElementById(`entry-${row.id}`)!));
    await user.click(screen.getAllByRole("button", { name: /^Check all \(/ })[0]);
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(useUi.getState().dialog).toBeNull();
    expect(localStorage.getItem(BUILD_ASKED_KEY)).toBeNull();
    // The tick's toast is the tick's alone.
    expect(useUi.getState().toast?.undo).toBeDefined();
    await user.click(within(strip).getByRole("button", { name: "No thanks" }));
    expect(localStorage.getItem(BUILD_ASKED_KEY)).not.toBeNull();
    // A line in its place, with the focus, so it isn't lost with the button; gone on the next page.
    const said = await screen.findByText("No build advice. Guide settings can turn it on any time.");
    expect(said).toHaveFocus();
    expect(useBuild.getState().picked).toEqual([]);
    act(() => useUi.getState().openDialog({ kind: "settings" }));
    const settings = await screen.findByRole("dialog", { name: "Guide settings" });
    expect(settings).toHaveTextContent("Build advice: none.");
    await user.click(within(settings).getByRole("button", { name: "Choose build" }));
    expect(await screen.findByRole("dialog", { name: "Build advice" })).toBeInTheDocument();
  });

  it("follows another tab that answered", async () => {
    await open("/guide/1");
    expect(screen.getByRole("region", { name: "Build advice" })).toBeInTheDocument();
    localStorage.setItem(BUILD_ASKED_KEY, "1");
    act(() => window.dispatchEvent(new StorageEvent("storage", { key: BUILD_ASKED_KEY, newValue: "1" })));
    expect(useBuild.getState().asked).toBe(true);
    await waitFor(() => expect(screen.queryByRole("region", { name: "Build advice" })).toBeNull());
  });

  it("keeps the add-ons off until a build is chosen, so one never picks a build by itself", async () => {
    const addon = addons[0];
    if (!addon) return;
    const user = userEvent.setup();
    await open("/guide/1");
    await user.click(within(screen.getByRole("region", { name: "Build advice" })).getByRole("button", { name: "Choose build" }));
    const dialog = await screen.findByRole("dialog", { name: "Build advice" });
    expect(within(dialog).getByRole("switch", { name: addon.name })).toHaveAttribute("data-disabled");
    const build = namedBuilds.find((item) => !addon.stats.some((stat) => item.stats.includes(stat)))!;
    await user.click(within(dialog).getByRole("radio", { name: build.name }));
    expect(within(dialog).getByRole("switch", { name: addon.name })).not.toHaveAttribute("data-disabled");
  });

  it("never invites a reader who already picked a build", async () => {
    localStorage.setItem(BUILD_KEY, leanings[0].id);
    useBuild.setState({ picked: [leanings[0].id], asked: false });
    act(() => useBuild.getState().sync(localStorage.getItem(BUILD_KEY)));
    expect(useBuild.getState().asked).toBe(true);
    await open("/guide/1");
    const strip = screen.getByRole("region", { name: "Build advice" });
    expect(within(strip).queryByText("Playing a build?")).toBeNull();
    expect(within(strip).getByRole("button", { name: "Change build" })).toBeInTheDocument();
  });

  it("saves a named build from its card, with an add-on, says what this chapter holds for it, and clears it", async () => {
    const build = namedBuilds.find((item) => addons.some((addon) => !addon.stats.some((stat) => item.stats.includes(stat)))) ?? namedBuilds[0];
    const addon = addons.find((item) => !item.stats.some((stat) => build.stats.includes(stat)));
    const user = userEvent.setup();
    await open("/guide/1");
    await user.click(within(screen.getByRole("region", { name: "Build advice" })).getByRole("button", { name: "Choose build" }));
    const dialog = await screen.findByRole("dialog", { name: "Build advice" });
    await user.click(within(dialog).getByRole("radio", { name: build.name }));
    if (addon) await user.click(within(dialog).getByRole("switch", { name: addon.name }));
    // Nothing is kept until Save build.
    expect(localStorage.getItem(BUILD_KEY)).toBeNull();
    await user.click(within(dialog).getByRole("button", { name: "Save build" }));
    const saved = normalizeBuild([...build.stats, ...(addon?.stats ?? [])].join(" "));
    expect(useBuild.getState().picked).toEqual(saved);
    expect(localStorage.getItem(BUILD_KEY)).toBe(saved.join(" "));
    await waitFor(() => expect(within(screen.getByRole("region", { name: "Build advice" })).getByText(`${buildName(saved)} advice`)).toBeInTheDocument());
    const rows = chapterPlan(chapters[0], saved).length;
    expect(screen.getByRole("region", { name: "Build advice" })).toHaveTextContent(rows ? `on ${rows === 1 ? "1 step" : `${rows} steps`} in this chapter` : "none in this chapter");
    // Changing a build has no button that reads like a way out: Clear build says what it does.
    await user.click(within(screen.getByRole("region", { name: "Build advice" })).getByRole("button", { name: "Change build" }));
    const again = await screen.findByRole("dialog", { name: "Build advice" });
    await user.click(within(again).getByRole("button", { name: "Clear build" }));
    expect(useBuild.getState().picked).toEqual([]);
    expect(localStorage.getItem(BUILD_KEY)).toBeNull();
    // Cleared here, the invitation comes back in the strip's place, so the dialog's focus has its button to come back to.
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(within(screen.getByRole("region", { name: "Build advice" })).getByText("Playing a build?")).toBeInTheDocument();
  });

  it("offers no Clear build when choosing a build with none saved: Close keeps things as they were", async () => {
    const user = userEvent.setup();
    await open("/guide/1");
    await user.click(within(screen.getByRole("region", { name: "Build advice" })).getByRole("button", { name: "Choose build" }));
    const dialog = await screen.findByRole("dialog", { name: "Build advice" });
    expect(within(dialog).queryByRole("button", { name: "Clear build" })).toBeNull();
    await user.click(within(dialog).getByRole("button", { name: "Close dialog" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(localStorage.getItem(BUILD_ASKED_KEY)).toBeNull();
  });

  it("shows a row's note for the build, led by its name, under the row's words, for the pick only", async () => {
    if (!backed) return;
    const { note, build } = backed;
    const row = byId.get(note.row)!;
    reveal(row.chapter);
    await open(`/guide/${row.chapter}`);
    const step = document.getElementById(`entry-${row.id}`)!;
    expect(within(step).queryByText(escape(note.text))).toBeNull();
    act(() => useBuild.getState().setPicked(build.stats));
    expect(await within(step).findByText(escape(note.text))).toBeInTheDocument();
    expect(step).toHaveTextContent(`For your ${build.name}: ${note.text}`);
    // No tag beside the title and no step numbers: the note is the build's only line.
    expect(step).not.toHaveTextContent("For your build:");
    expect(step.textContent).not.toMatch(/Step \d/);
  });

  it("names who recommends a note's picks behind its Who says so, never linking them", async () => {
    if (!backed) return;
    const { note, build } = backed;
    const row = byId.get(note.row)!;
    reveal(row.chapter);
    act(() => useBuild.getState().setPicked(build.stats));
    const user = userEvent.setup();
    await open(`/guide/${row.chapter}`);
    const step = document.getElementById(`entry-${row.id}`)!;
    await user.click(within(step).getByRole("button", { name: `Who says so, for your ${build.name}, on “${row.title}”` }));
    const popup = await screen.findByRole("dialog", { name: "Who says so" });
    for (const { item, by } of whoSays(note, build.stats)) expect(popup).toHaveTextContent(`${item}: recommended by ${inWords(by)}.`);
    for (const pick of picksFor(row.id, build.stats)) for (const [, url] of pick.guides) expect(popup.querySelector(`a[href="${url}"]`)).toBeNull();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog", { name: "Who says so" })).toBeNull());
  });

  // A step's deadline (`before`) under a note: Lordran's Logan's catalyst, after the Sorcerer's note (22 Nov 2026).
  it("shows a step's deadline after the build's note, in bold", async () => {
    const found = (config.builds?.tasks ?? []).flatMap((task) => {
      const hit = task.before ? noted.find(({ note, build }) => note.row === task.row && task.serves.some((id) => build.stats.includes(id))) : undefined;
      return hit ? [{ before: task.before!, ...hit }] : [];
    })[0];
    if (!found) return;
    const { before, note, build } = found;
    const row = byId.get(note.row)!;
    reveal(row.chapter);
    act(() => useBuild.getState().setPicked(build.stats));
    await open(`/guide/${row.chapter}`);
    const step = document.getElementById(`entry-${row.id}`)!;
    expect(await within(step).findByText(escape(note.text))).toBeInTheDocument();
    expect(within(step).getByText(before).tagName).toBe("STRONG");
    expect(step.textContent!.indexOf(note.text)).toBeLessThan(step.textContent!.indexOf(before));
  });

  it("shows a pick that reads steps each step serving it, with its title, for the pick only", async () => {
    if (!stepped) return;
    const { task, picked } = stepped;
    const row = byId.get(task.row)!;
    reveal(row.chapter);
    await open(`/guide/${row.chapter}`);
    const step = document.getElementById(`entry-${row.id}`)!;
    expect(within(step).queryByText(escape(task.text))).toBeNull();
    act(() => useBuild.getState().setPicked(picked));
    expect(await within(step).findByText(escape(task.text))).toBeInTheDocument();
    expect(within(step).getByText(`${task.title}.`)).toBeInTheDocument();
    expect(step).toHaveTextContent(`For your ${buildName(picked)}: `);
    for (const other of tasksFor(row.id, picked)) expect(step).toHaveTextContent(other.text);
  });

  it("says on each build's card how guides start it", async () => {
    const started = namedBuilds.filter((build) => build.start);
    if (!started.length) return;
    const user = userEvent.setup();
    await open("/guide/1");
    await user.click(within(screen.getByRole("region", { name: "Build advice" })).getByRole("button", { name: "Choose build" }));
    const dialog = await screen.findByRole("dialog", { name: "Build advice" });
    for (const build of started) {
      const radio = within(dialog).getByRole("radio", { name: build.name });
      expect(radio).toHaveAccessibleDescription(new RegExp(`Starts as ${escape(build.start!.class).source}`));
    }
  });

  it("shows a build with notes beside an add-on without them its leanings' steps, led by the pick's whole name", async () => {
    const noted = new Set((config.builds?.notes ?? []).flatMap((note) => note.for));
    const pair = addons
      .filter((addon) => !noted.has(addon.id))
      .flatMap((addon) => namedBuilds.filter((build) => noted.has(build.id) && !addon.stats.some((stat) => build.stats.includes(stat))).map((build) => [...build.stats, ...addon.stats]))[0];
    const task = pair && (config.builds?.tasks ?? []).find((item) => item.serves.some((id) => pair.includes(id)));
    // Empty once a guide's add-ons all have notes, as Lordran's do (22 Nov 2026): builds-unwritten.test.ts holds the same reading on the
    // guide's builds with notes dropped, so the fallback stays tested either way.
    if (!pair || !task) return;
    const row = byId.get(task.row)!;
    reveal(row.chapter);
    act(() => useBuild.getState().setPicked(pair));
    await open(`/guide/${row.chapter}`);
    const step = document.getElementById(`entry-${row.id}`)!;
    expect(await within(step).findByText(`${task.title}.`)).toBeInTheDocument();
    expect(step).toHaveTextContent(`For your ${buildName(pair)}: `);
  });

  it("draws the build's weapon milestones on the Progress page: its start, then its notes' stages from the revealed chapters only, none filled by a tick", async () => {
    const build = namedBuilds.find((item) => item.start?.weapon && readsNotes(item.stats));
    if (!build) return;
    reveal(1);
    act(() => useBuild.getState().setPicked(build.stats));
    const first = (config.builds?.notes ?? []).find((note) => note.stage && note.for.includes(build.id) && byId.get(note.row)!.chapter === 1);
    // The stage's own row ticked: the track holds advice, so nothing on it says done.
    if (first) useProgress.setState({ data: { ...useProgress.getState().data, checks: { [first.row]: true } } });
    await open("/dashboard", "Your progress");
    const track = screen.getByRole("region", { name: "Weapon milestones" });
    expect(within(track).getByText(build.start!.weapon!)).toBeInTheDocument();
    expect(track).toHaveTextContent(`Starting as ${build.start!.class}.`);
    expect(track).toHaveTextContent(`Where ${build.name} guides take the ${build.start!.weapon}`);
    if (first) expect(within(track).getByRole("link", { name: first.stage })).toHaveAttribute("href", `/guide/1/${first.row}`);
    for (const link of within(track).queryAllByRole("link")) expect(link.getAttribute("href")).toMatch(/^\/guide\/1\//);
    expect(track.textContent).not.toMatch(/\bdone\b/i);
    expect(within(track).getByText("More shows as you reveal chapters.")).toBeInTheDocument();
  });

  // The tree's shapes, from whichever builds have them: equal ways under a caption, a longer branch under its name, a branch off a branch
  // inside it, a one-stage branch as an or, and the stage a branch leaves named when it's drawn further down.
  const forksOf = (items: TrackItem[]): TrackFork[] => items.flatMap((item) => ("fork" in item ? [item.fork, ...item.fork.branches.flatMap((branch) => forksOf(branch.line))] : []));
  const shapes = namedBuilds.flatMap((build) => {
    const track = readsNotes(build.stats) ? weaponTrack(() => true, build.stats) : null;
    return track ? [{ build, track, forks: forksOf(track.line) }] : [];
  });
  const drawTrack = async (build: (typeof namedBuilds)[number]) => {
    reveal(CHAPTER_COUNT);
    act(() => useBuild.getState().setPicked(build.stats));
    await open("/dashboard", "Your progress");
    return screen.getByRole("region", { name: "Weapon milestones" });
  };

  it("draws equal ways under a caption, each longer one under its name, with a branch off a branch inside its own", async () => {
    const found = shapes.find(({ forks }) => forks.some((fork) => !fork.alternative && fork.branches.some(({ line }) => line.length > 1)));
    if (!found) return;
    const track = await drawTrack(found.build);
    const fork = found.forks.find((item) => !item.alternative && item.branches.some(({ line }) => line.length > 1))!;
    expect(track.textContent).toMatch(new RegExp(`ways from ${escape(fork.branches[0].from.note.stage!).source}`, "i"));
    for (const { branch, line } of fork.branches.filter((item) => item.line.length > 1 || "fork" in (item.line[1] ?? {}))) {
      const heading = within(track).getByText(branch.name);
      expect(heading.closest("li"), branch.id).toHaveTextContent(branch.why);
      // Every stage on it, and on any branch off it, sits inside its list item.
      for (const { note } of trackStages(line)) expect(heading.closest("li")!.contains(within(track).getByRole("link", { name: note.stage })), `${branch.id}: ${note.stage}`).toBe(true);
    }
  });

  it("draws a one-stage branch as an or with its why, and names the stage it leaves when it's drawn further down", async () => {
    const found = shapes.find(({ track }) => {
      const lines = (items: TrackItem[]): TrackItem[][] => [items, ...items.flatMap((item) => ("fork" in item ? item.fork.branches.flatMap((branch) => lines(branch.line)) : []))];
      return lines(track.line).some((line) => line.some((item, i) => "fork" in item && item.fork.alternative && item.fork.branches.some(({ from, line: way }) => way.length === 1 && from.row.id !== (line[i - 1] as { stage: TrackStage }).stage.row.id)));
    });
    if (!found) return;
    const track = await drawTrack(found.build);
    for (const fork of found.forks.filter((item) => item.alternative)) {
      for (const { branch, from, line } of fork.branches.filter((item) => item.line.length === 1)) {
        const link = within(track).getByRole("link", { name: (line[0] as { stage: TrackStage }).stage.note.stage });
        const item = link.closest("li")!;
        expect(item.textContent, branch.id).toMatch(new RegExp(`^or ${escape(link.textContent!).source}`));
        expect(item, branch.id).toHaveTextContent(branch.why);
        void from;
      }
    }
    expect(track.textContent).toMatch(/ · from /);
  });

  it("lays the build out chapter by chapter on the Progress page, revealed chapters only, each row with its note, ticked in place", async () => {
    const first = noted[0];
    if (!first) return;
    const { note, build } = first;
    const row = byId.get(note.row)!;
    reveal(row.chapter);
    act(() => useBuild.getState().setPicked(build.stats));
    const user = userEvent.setup();
    await open("/dashboard", "Your progress");
    const panel = screen.getByRole("region", { name: `Build advice: ${build.name}` });
    expect(within(panel).getByRole("button", { name: new RegExp(`Chapter ${String(row.chapter).padStart(2, "0")}`) })).toBeInTheDocument();
    for (const later of chapters.filter((chapter) => chapter.id > row.chapter)) expect(within(panel).queryByText(escape(later.title))).toBeNull();
    const box = within(panel).getByRole("checkbox", { name: escape(row.title) });
    expect(within(panel).getByText(escape(note.text))).toBeInTheDocument();
    await user.click(box);
    expect(useProgress.getState().data.checks[row.id]).toBe(true);
    expect(box).toBeChecked();
    expect(box).toHaveFocus();
    await user.click(within(panel).getByRole("button", { name: "Change build" }));
    expect(await screen.findByRole("dialog", { name: "Build advice" })).toBeInTheDocument();
  });

  it("says how to choose a build while there is none, and promises advice, not a plan", async () => {
    await open("/dashboard", "Your progress");
    const panel = screen.getByRole("region", { name: "Build advice" });
    expect(within(panel).getByText(/^Pick the build you’re playing/)).toBeInTheDocument();
    expect(within(panel).getByRole("button", { name: "Choose build" })).toBeInTheDocument();
  });
});

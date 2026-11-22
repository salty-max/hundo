import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";
import { addons, allRows, buildName, buildOf, byId, chapters, config, hasBuilds, inWords, leanings, namedBuilds, picksFor, readsNotes, tasksFor, whoSays } from "./guide";
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
  it("shows nothing of builds: no strip, no Your build, no welcome on a tick, even with a pick saved under the key", async () => {
    localStorage.setItem(BUILD_KEY, "dex fth");
    useBuild.setState({ picked: normalizeBuild(localStorage.getItem(BUILD_KEY)) });
    expect(useBuild.getState().picked).toEqual([]);
    const user = userEvent.setup();
    await open("/guide/1");
    expect(screen.queryByRole("region", { name: "Your build" })).toBeNull();
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

  it("asks once, on the first tick: the welcome opens, any way out answers it, and the next tick asks nothing", async () => {
    const row = chapters[0].groups[0].rows[0];
    const user = userEvent.setup();
    await open("/guide/1");
    expect(within(screen.getByRole("region", { name: "Your build" })).getByText("Playing a build?")).toBeInTheDocument();
    // Nothing on load: a visitor from search meets no dialog.
    expect(useUi.getState().dialog).toBeNull();
    const step = document.getElementById(`entry-${row.id}`)!;
    await user.click(firstBox(step));
    const welcome = await screen.findByRole("dialog", { name: "How are you playing?" });
    expect(localStorage.getItem(BUILD_ASKED_KEY)).not.toBeNull();
    await user.click(within(welcome).getByRole("button", { name: "Close dialog" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await user.click(firstBox(step));
    await user.click(firstBox(step));
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(useUi.getState().dialog).toBeNull();
    expect(within(screen.getByRole("region", { name: "Your build" })).getByText("No build chosen: just the checklist.")).toBeInTheDocument();
  });

  it("asks on a first Check all too, once for ticks in quick succession, and gives the tick's Undo back when the welcome closes", async () => {
    const user = userEvent.setup();
    await open("/guide/1");
    await user.click(screen.getAllByRole("button", { name: /^Check all \(/ })[0]);
    const welcome = await screen.findByRole("dialog", { name: "How are you playing?" });
    const first = useUi.getState().toast;
    // The modal hides the toast; it comes back, Undo and all, as the welcome closes.
    await user.click(within(welcome).getByRole("button", { name: "Just the checklist" }));
    const again = useUi.getState().toast;
    expect(again?.id).not.toBe(first?.id);
    expect(again?.message).toBe(first?.message);
    expect(again?.undo).toBe(first?.undo);
    expect(useBuild.getState().picked).toEqual([]);
  });

  it("opens one welcome for two quick ticks", async () => {
    const rows = chapters[0].groups[0].rows.slice(0, 2);
    await open("/guide/1");
    // Two ticks in the same moment, before the welcome's timer runs.
    act(() => {
      for (const row of rows) firstBox(document.getElementById(`entry-${row.id}`)!).click();
    });
    await screen.findByRole("dialog", { name: "How are you playing?" });
    expect(useUi.getState().dialogKey).toBe(1);
  });

  it("follows another tab that asked", async () => {
    await open("/guide/1");
    localStorage.setItem(BUILD_ASKED_KEY, "1");
    act(() => window.dispatchEvent(new StorageEvent("storage", { key: BUILD_ASKED_KEY, newValue: "1" })));
    expect(useBuild.getState().asked).toBe(true);
  });

  it("keeps the add-ons off until a build is chosen, so one never picks a build by itself", async () => {
    const addon = addons[0];
    if (!addon) return;
    const user = userEvent.setup();
    await open("/guide/1");
    await user.click(within(screen.getByRole("region", { name: "Your build" })).getByRole("button", { name: "Choose build" }));
    const dialog = await screen.findByRole("dialog", { name: "Your build" });
    expect(within(dialog).getByRole("switch", { name: addon.name })).toHaveAttribute("data-disabled");
    const build = namedBuilds.find((item) => !addon.stats.some((stat) => item.stats.includes(stat)))!;
    await user.click(within(dialog).getByRole("radio", { name: build.name }));
    expect(within(dialog).getByRole("switch", { name: addon.name })).not.toHaveAttribute("data-disabled");
  });

  it("never asks a reader who already picked a build", async () => {
    localStorage.setItem(BUILD_KEY, leanings[0].id);
    useBuild.setState({ picked: [leanings[0].id], asked: false });
    act(() => useBuild.getState().sync(localStorage.getItem(BUILD_KEY)));
    expect(useBuild.getState().asked).toBe(true);
    const user = userEvent.setup();
    await open("/guide/1");
    await user.click(firstBox(document.getElementById(`entry-${chapters[0].groups[0].rows[0].id}`)!));
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(useUi.getState().dialog).toBeNull();
  });

  it("saves a named build from its card, with an add-on, and Just the checklist keeps none", async () => {
    const build = namedBuilds.find((item) => addons.some((addon) => !addon.stats.some((stat) => item.stats.includes(stat)))) ?? namedBuilds[0];
    const addon = addons.find((item) => !item.stats.some((stat) => build.stats.includes(stat)));
    const user = userEvent.setup();
    await open("/guide/1");
    await user.click(within(screen.getByRole("region", { name: "Your build" })).getByRole("button", { name: "Choose build" }));
    const dialog = await screen.findByRole("dialog", { name: "Your build" });
    await user.click(within(dialog).getByRole("radio", { name: build.name }));
    if (addon) await user.click(within(dialog).getByRole("switch", { name: addon.name }));
    // Nothing is kept until Save build.
    expect(localStorage.getItem(BUILD_KEY)).toBeNull();
    await user.click(within(dialog).getByRole("button", { name: "Save build" }));
    const saved = normalizeBuild([...build.stats, ...(addon?.stats ?? [])].join(" "));
    expect(useBuild.getState().picked).toEqual(saved);
    expect(localStorage.getItem(BUILD_KEY)).toBe(saved.join(" "));
    await waitFor(() => expect(within(screen.getByRole("region", { name: "Your build" })).getByText(buildName(saved))).toBeInTheDocument());
    // Changing a build has no button that reads like a way out: Clear build says what it does.
    await user.click(within(screen.getByRole("region", { name: "Your build" })).getByRole("button", { name: "Change build" }));
    const again = await screen.findByRole("dialog", { name: "Your build" });
    expect(within(again).queryByRole("button", { name: "Just the checklist" })).toBeNull();
    await user.click(within(again).getByRole("button", { name: "Clear build" }));
    expect(useBuild.getState().picked).toEqual([]);
    expect(localStorage.getItem(BUILD_KEY)).toBeNull();
  });

  it("offers neither Just the checklist nor Clear build when choosing a build with none saved: Close keeps things as they were", async () => {
    const user = userEvent.setup();
    await open("/guide/1");
    await user.click(within(screen.getByRole("region", { name: "Your build" })).getByRole("button", { name: "Choose build" }));
    const dialog = await screen.findByRole("dialog", { name: "Your build" });
    expect(within(dialog).queryByRole("button", { name: "Just the checklist" })).toBeNull();
    expect(within(dialog).queryByRole("button", { name: "Clear build" })).toBeNull();
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
    await user.click(within(screen.getByRole("region", { name: "Your build" })).getByRole("button", { name: "Choose build" }));
    const dialog = await screen.findByRole("dialog", { name: "Your build" });
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
    if (!pair || !task) return;
    const row = byId.get(task.row)!;
    reveal(row.chapter);
    act(() => useBuild.getState().setPicked(pair));
    await open(`/guide/${row.chapter}`);
    const step = document.getElementById(`entry-${row.id}`)!;
    expect(await within(step).findByText(`${task.title}.`)).toBeInTheDocument();
    expect(step).toHaveTextContent(`For your ${buildName(pair)}: `);
  });

  it("draws the build's weapon track on the Progress page: its start, then its notes' stages from the revealed chapters only", async () => {
    const build = namedBuilds.find((item) => item.start?.weapon && readsNotes(item.stats));
    if (!build) return;
    reveal(1);
    act(() => useBuild.getState().setPicked(build.stats));
    await open("/dashboard", "Your progress");
    const track = screen.getByRole("region", { name: "Main weapon" });
    expect(within(track).getByText(build.start!.weapon!)).toBeInTheDocument();
    expect(track).toHaveTextContent(`Starting as ${build.start!.class}.`);
    const first = (config.builds?.notes ?? []).find((note) => note.stage && note.for.includes(build.id) && byId.get(note.row)!.chapter === 1);
    if (first) expect(within(track).getByRole("link", { name: first.stage })).toHaveAttribute("href", `/guide/1/${first.row}`);
    for (const link of within(track).queryAllByRole("link")) expect(link.getAttribute("href")).toMatch(/^\/guide\/1\//);
    expect(within(track).getByText("More shows as you reveal chapters.")).toBeInTheDocument();
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
    const panel = screen.getByRole("region", { name: `Your build: ${build.name}` });
    expect(within(panel).getByRole("button", { name: new RegExp(`Chapter ${String(row.chapter).padStart(2, "0")}`) })).toBeInTheDocument();
    for (const later of chapters.filter((chapter) => chapter.id > row.chapter)) expect(within(panel).queryByText(escape(later.title))).toBeNull();
    const box = within(panel).getByRole("checkbox", { name: escape(row.title) });
    expect(within(panel).getByText(escape(note.text))).toBeInTheDocument();
    await user.click(box);
    expect(useProgress.getState().data.checks[row.id]).toBe(true);
    expect(box).toBeChecked();
    expect(box).toHaveFocus();
    await user.click(within(panel).getByRole("button", { name: "Change build" }));
    expect(await screen.findByRole("dialog", { name: "Your build" })).toBeInTheDocument();
  });

  it("says how to choose a build while there is none", async () => {
    await open("/dashboard", "Your progress");
    const panel = screen.getByRole("region", { name: "Your build" });
    expect(within(panel).getByText(/^Pick the build you play/)).toBeInTheDocument();
    expect(within(panel).getByRole("button", { name: "Choose your build" })).toBeInTheDocument();
  });
});

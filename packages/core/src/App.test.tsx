import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";
import { STORAGE_KEY, defaultState } from "./progress-state";
import { brand, chapterRows, chapters, config } from "./guide";
import { panels } from "virtual:guide/panels";
import { useProgress } from "./store/progress";
import { useUi } from "./store/ui";
import { usePersistence } from "./persistence";
import { allowSlowMounts } from "./test/slow";

allowSlowMounts();

const first = chapters[0];
const firstRow = first.groups[0].rows[0];
const saved = () => JSON.parse(localStorage.getItem(STORAGE_KEY)!).checks;
const contains = (id: string) => document.getElementById(id)!.contains(document.activeElement);

beforeEach(() => {
  localStorage.clear();
  useProgress.setState({ data: defaultState(), storageError: false });
  useUi.setState({ toast: null, openGroups: {} });
  history.replaceState(null, "", "/guide/1");
});

describe("App", () => {
  it("opens at chapter 1 and saves a ticked step", async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1, name: first.title })).toBeInTheDocument();
    const box = within(document.getElementById(`entry-${firstRow.id}`)!).getByRole("checkbox");
    await user.click(box);
    expect(box).toBeChecked();
    expect(saved()).toEqual({ [firstRow.id]: true });
  });

  it("keeps all of a newer tab's save when this page reloads it and the reader ticks here", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole("heading", { level: 1, name: first.title });
    const box = within(document.getElementById(`entry-${firstRow.id}`)!).getByRole("checkbox");
    // Another tab of the guide, on a newer build, saves: a higher version, a field, a tick on a row this build doesn't have, an extra key.
    const newer = { ...defaultState(), version: 4, checks: { "row-from-a-newer-build": true }, notes: { "row-from-a-newer-build": firstRow.id }, extra: { ...(defaultState().extra ?? {}), addedByANewerBuild: 7 } };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newer));
    act(() => window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY, newValue: localStorage.getItem(STORAGE_KEY) })));
    expect(useProgress.getState().storageError).toBe(false);
    await user.click(box);
    expect(box).toBeChecked();
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual({ ...newer, checks: { ...newer.checks, [firstRow.id]: true } });
  });

  it("names the guide <mark> Hundo and puts the copyright under the rail, after a link to every other guide", async () => {
    render(<App />);
    expect(brand.name).toBe(`${brand.mark} Hundo`);
    expect(brand.title.startsWith(`${brand.name} · `)).toBe(true);
    expect(await screen.findByRole("link", { name: `${brand.name} home` })).toHaveTextContent(`${brand.mark} Hundo`);
    const rail = screen.getByRole("complementary", { name: "Chapters" });
    expect(within(rail).getByText("© 2026 Hundo")).toBeInTheDocument();
    expect(within(rail).getByText(`Unofficial fan guide, not affiliated with ${brand.publisher}.`)).toBeInTheDocument();
    // Out to hundo.quest in a new tab, so the installed app opens it in the browser rather than in the guide's own window.
    const more = within(rail).getByRole("link", { name: "More guides on hundo.quest (opens in a new tab)" });
    expect(more).toHaveTextContent("More guides on hundo.quest");
    expect(more).toHaveAttribute("href", "https://hundo.quest/");
    expect(more).toHaveAttribute("target", "_blank");
    expect(more).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("hides later chapters until revealed, then opens at the linked section", async () => {
    const user = userEvent.setup();
    history.replaceState(null, "", "/guide/3/section-3-1");
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1, name: "Chapter 3: Not revealed yet" })).toBeInTheDocument();
    expect(screen.getByText(/^Hidden to spare you spoilers until you reach it\. Revealing it now also reveals chapter 2\.$/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to chapter 1" })).toHaveAttribute("href", "/guide/1");
    await user.click(screen.getByRole("button", { name: "Reveal chapter 3" }));
    await user.click(screen.getByRole("button", { name: "Reveal and open" }));
    expect(await screen.findByRole("heading", { level: 1, name: chapters[2].title })).toBeInTheDocument();
    expect(useProgress.getState().data.ceiling).toBe(3);
    expect(contains("section-3-1")).toBe(true);
  });

  it("keeps a ticked Next up step in place, undoes it, and advances on request", async () => {
    const user = userEvent.setup();
    render(<App />);
    const list = () => within(screen.getByRole("region", { name: "Next up" }));
    expect(list().getAllByRole("link", { name: /^Jump to/ })).toHaveLength(3);
    // Which rows the list shows, by their links: a Base UI box's own id is generated.
    const rowIds = () => list().getAllByRole("link", { name: /^Jump to/ }).map((link) => link.getAttribute("href"));
    const idsBefore = rowIds();
    await user.click(list().getAllByRole("checkbox")[0]);
    expect(rowIds()).toEqual(idsBefore);
    expect(list().getAllByRole("checkbox")[0]).toBeChecked();

    await user.click(screen.getByRole("button", { name: "Undo" }));
    expect(list().getAllByRole("checkbox")[0]).not.toBeChecked();
    expect(saved()).toEqual({});

    await user.click(list().getAllByRole("checkbox")[0]);
    await user.click(list().getByRole("button", { name: "Show next steps" }));
    expect(rowIds()).not.toContain(idsBefore[0]);
    expect(list().queryByRole("button", { name: "Show next steps" })).toBeNull();
  });

  it("checks a whole section at once and undoes it from the toast", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click((await screen.findAllByRole("button", { name: /^Check all \(/ }))[0]);
    expect(Object.keys(saved()).length).toBeGreaterThan(1);
    await user.click(screen.getByRole("button", { name: "Undo" }));
    expect(saved()).toEqual({});
  });

  it("shares checks with the checklist and links back to the entry in context", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(within(document.getElementById(`entry-${firstRow.id}`)!).getByRole("checkbox"));
    await user.click(screen.getByRole("link", { name: "Chapter checklist" }));
    await user.type(await screen.findByRole("searchbox"), firstRow.title);
    const box = screen.getByRole("checkbox", { name: firstRow.title });
    expect(box).toBeChecked();
    await user.click(box);
    await user.click(screen.getByRole("link", { name: `Open “${firstRow.title}” in chapter 1` }));
    expect(contains(`entry-${firstRow.id}`)).toBe(true);
    expect(within(document.getElementById(`entry-${firstRow.id}`)!).getByRole("checkbox")).not.toBeChecked();
  });

  it("returns focus to the status filter when ticking an entry filters it out of the checklist", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(await screen.findByRole("link", { name: "Chapter checklist" }));
    await user.click(await screen.findByRole("combobox", { name: "Status" }));
    await user.click(await screen.findByRole("option", { name: "Unfinished" }));
    await user.click(screen.getAllByRole("checkbox")[0]);
    await waitFor(() => expect(screen.getByRole("combobox", { name: "Status" })).toHaveFocus());
  });

  it("shows progress, what's left and the guide's own panels", async () => {
    history.replaceState(null, "", "/dashboard");
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1, name: "Your progress" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "What’s left" })).toBeInTheDocument();
    for (const panel of panels) expect(document.getElementById(panel.id)).toBeInTheDocument();
  });

  it("sends the old Sources page's address to the reader's chapter", async () => {
    history.replaceState(null, "", "/sources");
    render(<App />);
    await screen.findByRole("heading", { level: 1 });
    await waitFor(() => expect(location.pathname).toBe(`/guide/${useProgress.getState().data.chapter}`));
    expect(screen.queryByText(/Sources and maps/)).not.toBeInTheDocument();
  });

  it("shows no source in a chapter: they are kept in the data for checking it, never shown (a page the data also names as a map shows as that)", async () => {
    history.replaceState(null, "", "/guide/1");
    render(<App />);
    await screen.findByRole("heading", { level: 1 });
    const chapter = chapters[0];
    const cited = new Set([
      ...config.sources,
      ...(config.reassurance?.sources ?? []),
      ...chapter.sources,
      ...chapter.groups.flatMap((group) => group.sources),
    ].map(([, url]) => url));
    for (const row of chapterRows(chapter)) if (row.reference) cited.add(row.reference);
    for (const missable of config.missables) for (const url of missable.sources) cited.add(url);
    for (const choice of config.choices ?? []) for (const url of choice.sources) cited.add(url);
    for (const { start } of config.builds?.named ?? []) if (start) for (const url of [...start.guides, ...(start.lists ?? [])].map(([, link]) => link).concat(start.sources)) cited.add(url);
    for (const pick of config.builds?.picks ?? []) for (const url of [...pick.guides, ...(pick.lists ?? [])].map(([, link]) => link).concat(pick.sources ?? [])) cited.add(url);
    for (const task of config.builds?.tasks ?? []) for (const url of task.sources) cited.add(url);
    for (const group of chapter.groups) for (const map of [group.map, ...group.rows.map((row) => row.map)]) if (map) cited.delete(map[1]);
    const hrefs = [...document.querySelectorAll("a[href]")].map((link) => link.getAttribute("href"));
    expect(hrefs.filter((href) => href && cited.has(href))).toEqual([]);
    expect(hrefs).not.toContain("/sources");
    expect(document.body.textContent).not.toMatch(/\bSources\b/);
  });
});

describe("keeping storage", () => {
  const note = /hasn’t agreed to keep your progress/;
  /** A StorageManager that answers persisted() with `granted` and persist() with `grant`. */
  const fakeStorage = (granted: boolean, grant = false) => {
    const storage = { persisted: vi.fn(async () => granted), persist: vi.fn(async () => grant) };
    Object.defineProperty(navigator, "storage", { value: storage, configurable: true });
    return storage;
  };

  beforeEach(() => usePersistence.setState({ persisted: null }));
  afterEach(() => {
    Reflect.deleteProperty(navigator, "storage");
  });

  it("asks the browser to keep progress after a tick, not on load", async () => {
    const storage = fakeStorage(false, true);
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole("heading", { level: 1, name: first.title });
    await waitFor(() => expect(usePersistence.getState().persisted).toBe(false));
    expect(storage.persist).not.toHaveBeenCalled();
    await user.click(within(document.getElementById(`entry-${firstRow.id}`)!).getByRole("checkbox"));
    await waitFor(() => expect(storage.persist).toHaveBeenCalledTimes(1));
  });

  it("says on the dashboard when the browser hasn't agreed to keep progress", async () => {
    fakeStorage(false);
    history.replaceState(null, "", "/dashboard");
    render(<App />);
    const panel = (await screen.findByRole("heading", { name: "Progress backup" })).closest("section")!;
    expect(await within(panel).findByText(note)).toHaveTextContent("add the guide to your home screen and import the backup there");
  });

  it("says nothing more when storage is persistent or the browser can't say", async () => {
    fakeStorage(true);
    history.replaceState(null, "", "/dashboard");
    const { unmount } = render(<App />);
    await waitFor(() => expect(usePersistence.getState().persisted).toBe(true));
    expect(screen.queryByText(note)).not.toBeInTheDocument();
    unmount();

    Reflect.deleteProperty(navigator, "storage");
    usePersistence.setState({ persisted: null });
    render(<App />);
    expect(await screen.findByRole("heading", { name: "Progress backup" })).toBeInTheDocument();
    expect(screen.queryByText(note)).not.toBeInTheDocument();
  });
});

describe.runIf(config.layout === "article")("article layout", () => {
  it("reads as sections with inline checks and jumps to the first section", async () => {
    const user = userEvent.setup();
    render(<App />);
    const article = await screen.findByRole("article", { name: `${first.title} walkthrough` });
    expect(within(article).getByRole("heading", { level: 2, name: first.groups[0].title })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Expand all" })).toBeNull();
    await user.click(screen.getByRole("link", { name: "Read walkthrough" }));
    expect(screen.getByRole("heading", { level: 2, name: first.groups[0].title })).toHaveFocus();
  });
});

describe.runIf(config.layout === "checklist")("checklist layout", () => {
  it("filters the route and resumes at the first unchecked step", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole("heading", { level: 1, name: first.title });
    expect(screen.getByRole("button", { name: /Expand all|Collapse all/ })).toBeInTheDocument();
    await user.click(screen.getByRole("combobox", { name: "Route completion status" }));
    await user.click(await screen.findByRole("option", { name: "Completed" }));
    expect(screen.getByText("No steps match these filters.")).toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: "Start walkthrough" }));
    expect(contains(`entry-${firstRow.id}`)).toBe(true);
  });

  it("opens a linked group with the focus on its header, the button that closes it", async () => {
    const group = first.groups[first.groups.length - 1];
    history.replaceState(null, "", `/guide/1/${group.key}`);
    render(<App />);
    const header = await waitFor(() => within(document.getElementById(group.key)!).getAllByRole("button")[0]);
    expect(header).toHaveAttribute("aria-expanded", "true");
    await waitFor(() => expect(header).toHaveFocus());
  });

  it("returns focus to the status filter when ticking a step filters it out of the route", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole("heading", { level: 1, name: first.title });
    await user.click(screen.getByRole("combobox", { name: "Route completion status" }));
    await user.click(await screen.findByRole("option", { name: "Unfinished" }));
    await user.click(within(document.getElementById(`entry-${firstRow.id}`)!).getByRole("checkbox"));
    await waitFor(() => expect(screen.getByRole("combobox", { name: "Route completion status" })).toHaveFocus());
  });
});

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { changeChecks } from "./actions";
import { ArticleRoute } from "./components/ArticleRoute";
import { Handoff } from "./components/Handoff";
import { NextUp } from "./components/NextUp";
import { RouteGroup } from "./components/RouteGroup";
import { anchorFor, backAt, comesBack, handoff, inStatus, markOf, nextUp, requirementsMet, waitingOn } from "./flow";
import { byId, chapters, guideAnchor, partsOf } from "./guide";
import { defaultState, validateState } from "./progress-state";
import { isOpen, useProgress } from "./store/progress";
import { useUi } from "./store/ui";
import { changes, flatten, seed, viewFrom } from "./sync/fields";
import { allowSlowMounts } from "./test/slow";
import type { ProgressState } from "./types";

allowSlowMounts();

// Every guide, with the flow's data drawn onto its own rows in place of any the guide has: the first three groups of chapter 1 at
// Testville, Fieldham and Testville again (a second visit, beside Market Row); a gate row in chapter 2 that gives "Test Key", two rows of
// chapter 1 that wait on it (one on it or a second gate); a chapter 2 row that needs a row of chapter 1; one missable; and a chain of
// splits (zz-older → zz-old-bundle + a row; zz-old-bundle → two rows).
vi.mock("virtual:guide/config", async (importOriginal) => {
  const { default: real } = await importOriginal<typeof import("virtual:guide/config")>();
  const [one, two] = real.chapters;
  const [g0, g1, g2] = one.groups;
  const idsOf = (groups: typeof one.groups) => groups.flatMap((group) => group.rows.map((row) => row[0]));
  // The set-aside row in the first group (Testville) and the shop before the third (its Market Row); the rest of chapter 1's rows, but
  // the third group's, for the others; chapter 2's first rows for the gates.
  const aside = g0.rows[0][0];
  const shop = idsOf([g0, g1])[1];
  const inThird = new Set(idsOf([g2]));
  const rest = idsOf(one.groups).filter((id) => id !== aside && id !== shop && !inThird.has(id));
  const [waits, either, p1, p2, p3, missable, needed, hidden, nowhere] = rest;
  const [gate, gate2, needer] = idsOf(two.groups);
  const pick = { aside, shop, waits, either, gate, gate2, needer };
  const extra: Record<string, object> = {
    [pick.shop]: { place: "Market Row" },
    [pick.waits]: { requires: [pick.gate] },
    [pick.either]: { requires: [[pick.gate, pick.gate2]] },
    [pick.gate]: { gives: "Test Key" },
    [pick.needer]: { requires: [needed] },
    [hidden]: { place: "Hiddenburg" },
    [nowhere]: { place: "Nowhere" },
  };
  const flowKeys = new Set(["requires", "gives", "place"]);
  const location = new Map<object, string>([
    [g0, "Testville"],
    [g1, "Fieldham"],
    [g2, "Testville · Market Row"],
    [two.groups[0], "Hiddenburg"],
  ]);
  return {
    default: {
      ...real,
      __test: { ...pick, p1, p2, p3, missable, needed, hidden, nowhere },
      missables: [{ id: missable, why: "Test reason it can be lost.", sources: ["https://a.example/x", "https://b.example/y"] }],
      choices: [],
      splits: [
        { from: "zz-older", into: ["zz-old-bundle", p3] },
        { from: "zz-old-bundle", into: [p1, p2] },
      ],
      chapters: real.chapters.map((chapter) => ({
        ...chapter,
        groups: chapter.groups.map((group) => ({
          ...group,
          location: location.get(group) ?? group.location,
          rows: group.rows.map(([id, tags, title, text, more]) => {
            const kept = Object.fromEntries(Object.entries(more ?? {}).filter(([key]) => !flowKeys.has(key)));
            return [id, tags, title, text, { ...kept, ...extra[id] }];
          }),
        })),
      })),
    },
  };
});

const { default: config } = await import("virtual:guide/config");
const t = (config as unknown as { __test: Record<string, string> }).__test;
const row = (id: string) => byId.get(id)!;
const all = () => true;
const g = (index: number) => chapters[0].groups[index].rows;
const state = (patch: Partial<ProgressState> = {}): ProgressState => ({ ...defaultState(), spoilers: false, ...patch });
const set = (patch: Partial<ProgressState>) => useProgress.setState({ data: state(patch), storageError: false });
const draw = (node: React.ReactNode) => render(<MemoryRouter>{node}</MemoryRouter>);

beforeEach(() => {
  localStorage.clear();
  set({});
  useUi.setState({ toast: null });
});

describe("requirements", () => {
  it("wait until a row they name is ticked, any one of a list doing", () => {
    expect(waitingOn(row(t.waits), {})).toEqual([t.gate]);
    expect(requirementsMet(row(t.waits), { [t.gate]: true })).toBe(true);
    expect(requirementsMet(row(t.either), { [t.gate2]: true })).toBe(true);
    expect(requirementsMet(row(t.aside), {})).toBe(true);
  });

  it("keep a waiting row out of Next up's steps, count it as waiting, and bring it back from an earlier chapter once met", () => {
    const before = nextUp({ checks: {} }, all, 1, 50);
    expect(before.items.map((item) => item.row.id)).not.toContain(t.waits);
    expect(before.waiting.map((r) => r.id)).toEqual(expect.arrayContaining([t.waits, t.either]));
    const after = nextUp({ checks: { [t.gate]: true } }, all, 2, 3);
    expect(after.items[0]).toMatchObject({ row: { id: t.waits }, why: "Test Key found", tone: "sky" });
    expect(after.waiting.map((r) => r.id)).not.toContain(t.waits);
  });

  it("bring back only a row that waited: one whose requirement came before it was skipped, and stays in route order", () => {
    const view = nextUp({ checks: { [t.needed]: true } }, all, 3, 3);
    expect(view.items.some((item) => item.row.id === t.needer)).toBe(false);
  });
});

describe("a row set aside", () => {
  const checksAt = (index: number) => ({ [g(index).at(-1)!.id]: true as const });

  it("is anchored to the reader's mark, the furthest row ticked in revealed chapters, or to itself when that is further", () => {
    expect(markOf({}, all)).toBeUndefined();
    expect(anchorFor(t.aside, {}, all)).toBe(t.aside);
    expect(anchorFor(t.aside, checksAt(1), all)).toBe(g(1).at(-1)!.id);
    expect(markOf({ [t.gate]: true }, (n) => n === 1)).toBeUndefined();
  });

  it("comes back on the next visit to its place, not before, and waits for the visit after once set aside again there", () => {
    const mark = (index: number) => markOf(checksAt(index), all);
    expect(backAt(row(t.aside), t.aside, mark(1))).toBeUndefined();
    expect(backAt(row(t.aside), t.aside, mark(2))).toBe("Testville");
    expect(backAt(row(t.aside), g(2).at(-1)!.id, mark(2))).toBeUndefined();
    expect(backAt(row(t.shop), t.shop, mark(2))).toBe("Market Row");
    const view = nextUp({ checks: checksAt(2), later: { [t.aside]: t.aside } }, all, 1, 3);
    expect(view.items[0]).toMatchObject({ row: { id: t.aside }, why: "Back in Testville", tone: "mint" });
    expect(view.aside.map((r) => r.id)).not.toContain(t.aside);
  });

  it("says when it comes back where the visit is revealed, and the same words for a hidden visit as for none, so neither tells", () => {
    expect(comesBack(row(t.shop), { [t.shop]: t.shop }, all)).toBe("Back next time you’re in Market Row");
    expect(comesBack(row(t.hidden), { [t.hidden]: t.hidden }, all)).toBe("Back next time you’re in Hiddenburg");
    expect(comesBack(row(t.hidden), { [t.hidden]: t.hidden }, (n) => n === 1)).toBe("Set aside for later");
    expect(comesBack(row(t.nowhere), { [t.nowhere]: t.nowhere }, all)).toBe("Set aside for later");
  });

  it("leaves Next up's steps until nothing else is left, and counts as set aside, never as both", () => {
    const view = nextUp({ checks: {}, later: { [t.aside]: t.aside } }, all, 1, 50);
    expect(view.items.map((item) => item.row.id)).not.toContain(t.aside);
    expect(view.aside.map((r) => r.id)).toEqual([t.aside]);
    const rest = Object.fromEntries([...byId.keys()].filter((id) => id !== t.aside).map((id) => [id, true as const]));
    const last = nextUp({ checks: rest, later: { [t.aside]: t.aside } }, all, 1, 3);
    expect(last.items.map((item) => item.row.id)).toEqual([t.aside]);
    expect(last.aside).toEqual([]);
  });

  it("is in the Set aside status, and Unfinished, never Completed", () => {
    const data = { checks: {}, later: { [t.aside]: t.aside } };
    expect(inStatus("later", row(t.aside), data) && inStatus("todo", row(t.aside), data)).toBe(true);
    expect(inStatus("done", row(t.aside), data) || inStatus("later", row(t.shop), data)).toBe(false);
  });
});

describe("the store", () => {
  it("sets aside unticked rows only, anchored to the mark, and a tick takes a row off the list", () => {
    set({ checks: { [g(1).at(-1)!.id]: true } });
    useProgress.getState().setLater([t.aside, g(1).at(-1)!.id], true);
    expect(useProgress.getState().data.later).toEqual({ [t.aside]: g(1).at(-1)!.id });
    useProgress.getState().setCheck(t.aside, true);
    expect(useProgress.getState().data.later).toBeUndefined();
  });

  it("puts a set-aside back when a tick that cleared it is undone", () => {
    set({ later: { [t.aside]: "anchor-row" } });
    changeChecks([t.aside], true, "Checked.");
    expect(useProgress.getState().data.later).toBeUndefined();
    useUi.getState().toast!.undo!();
    expect(useProgress.getState().data).toMatchObject({ checks: {}, later: { [t.aside]: "anchor-row" } });
  });

  it("puts a cleared set-aside back, anchor and all", () => {
    set({ later: { [t.aside]: "anchor-row" } });
    useProgress.getState().setLater([t.aside], false);
    useProgress.getState().restoreLater([t.aside], { [t.aside]: "anchor-row" });
    expect(useProgress.getState().data.later).toEqual({ [t.aside]: "anchor-row" });
  });
});

describe("a save", () => {
  const saved = (patch: object) => ({ version: 3, guide: config.brand.id, checks: {}, ceiling: 1, spoilers: true, chapter: 1, ...patch });

  it("reads rows set aside, drops ticked or unknown-shaped ones, and keeps no empty list", () => {
    expect(validateState(saved({ later: { [t.aside]: t.shop, [t.shop]: "Not An Id", [t.p1]: t.p1 }, checks: { [t.p1]: true } })).later).toEqual({
      [t.aside]: t.shop,
      [t.shop]: t.shop,
    });
    expect(validateState(saved({ later: {} })).later).toBeUndefined();
    expect(validateState(saved({})).later).toBeUndefined();
  });

  it("ticks every part of a split bundle, through a chain, and drops the bundle so an untick of a part holds", () => {
    const read = validateState(saved({ checks: { "zz-older": true } }));
    expect(Object.keys(read.checks).sort()).toEqual([t.p1, t.p2, t.p3].sort());
    expect(partsOf("zz-older")).toEqual([t.p1, t.p2, t.p3]);
    const aside = validateState(saved({ later: { "zz-old-bundle": "zz-old-bundle" } }));
    expect(aside.later).toEqual({ [t.p1]: t.p1, [t.p2]: t.p1 });
  });

  it("lands a link to a split bundle on its first part", () => {
    expect(guideAnchor(row(t.p1).chapter, "zz-old-bundle")).toBe(`entry-${t.p1}`);
  });
});

describe("sync", () => {
  it("sends a set-aside as l:<row> with its anchor, and a 0 once it's back or ticked", () => {
    const aside = state({ later: { [t.aside]: t.shop } });
    expect(flatten(aside)[`l:${t.aside}`]).toBe(t.shop);
    expect(changes(aside, state())).toEqual({ [`l:${t.aside}`]: 0 });
    expect(changes(aside, state({ checks: { [t.aside]: true } }))).toEqual({ [`c:${t.aside}`]: 1, [`l:${t.aside}`]: 0 });
    const first = seed(aside, {}, { last: 0, offset: 0 }, 1_000);
    expect(first[`l:${t.aside}`][1]).toBe(t.shop);
    expect(first[`l:${t.aside}`][0]).toBeGreaterThan(0);
  });

  it("sets aside what another device set aside, but never a ticked row, and clears what it put back", () => {
    const here = viewFrom({ [`l:${t.aside}`]: [5, t.aside], [`l:${t.shop}`]: [5, t.shop], [`c:${t.shop}`]: [3, 1] }, state());
    expect(here.later).toEqual({ [t.aside]: t.aside });
    expect(viewFrom({ [`l:${t.aside}`]: [6, 0] }, here).later).toBeUndefined();
  });

  it("lets a set-aside stand only if it's later than the row's last tick or untick, so an untick brings back none a tick cleared", () => {
    expect(viewFrom({ [`l:${t.aside}`]: [5, t.aside], [`c:${t.aside}`]: [6, 0] }, state()).later).toBeUndefined();
    expect(viewFrom({ [`l:${t.aside}`]: [6, t.aside], [`c:${t.aside}`]: [6, 0] }, state()).later).toBeUndefined();
    expect(viewFrom({ [`l:${t.aside}`]: [7, t.aside], [`c:${t.aside}`]: [6, 0] }, state()).later).toEqual({ [t.aside]: t.aside });
  });

  it("reads an older device's bundle as each part, the later stamp winning part by part", () => {
    const next = viewFrom({ "c:zz-old-bundle": [10, 1], [`c:${t.p1}`]: [5, 0], [`c:${t.p2}`]: [20, 0] }, state());
    expect(next.checks).toEqual({ [t.p1]: true });
    expect(viewFrom({ "c:zz-older": [30, 1] }, next).checks).toEqual({ [t.p1]: true, [t.p2]: true, [t.p3]: true });
  });
});

describe("the handoff", () => {
  it("says what can be lost apart from what's collected, and puts each row in one list", () => {
    const view = handoff(chapters[0], { checks: {}, later: { [t.aside]: t.aside } });
    expect(view.safe).toBe(false);
    expect(view.lost.map((r) => r.id)).toEqual([t.missable]);
    expect(view.aside.map((r) => r.id)).toEqual([t.aside]);
    expect(view.waiting.map((r) => r.id)).toEqual(expect.arrayContaining([t.waits, t.either]));
    expect(view.needed.map((r) => r.id)).toEqual([t.needed]);
    expect(view.collected).toBe(false);
    const lists = [view.lost, view.open, view.aside, view.waiting, view.needed].flat().map((r) => r.id);
    expect(new Set(lists).size).toBe(lists.length);
    const ticked = Object.fromEntries(chapters[0].groups.flatMap((group) => group.rows).map((r) => [r.id, true as const]));
    expect(handoff(chapters[0], { checks: ticked })).toMatchObject({ safe: true, collected: true, left: 0, open: [] });
  });

  it("draws the card with its verdict and lists, Later and Back on route working from it", async () => {
    const user = userEvent.setup();
    set({ later: { [t.aside]: t.aside } });
    draw(<Handoff chapter={chapters[0]} />);
    const card = screen.getByRole("region", { name: "Before you leave chapter 1" });
    expect(within(card).getByText("Before you go: 1 thing here can be lost.")).toBeInTheDocument();
    expect(within(card).getByRole("region", { name: "Set aside for a return" })).toBeInTheDocument();
    expect(within(card).getByRole("region", { name: "Waiting" })).toHaveTextContent("Needs Test Key");
    await user.click(within(card).getByRole("button", { name: `Back on route: ${row(t.aside).title}` }));
    expect(useProgress.getState().data.later).toBeUndefined();
    await user.click(within(card).getByRole("button", { name: `Later: ${row(t.missable).title}` }));
    expect(useProgress.getState().data.later).toHaveProperty(t.missable);
    // Setting aside never hides a warning: the missable stays under Can be lost, and its button, now Back on route, keeps the focus.
    expect(within(card).getByRole("region", { name: "Can be lost" })).toHaveTextContent(row(t.missable).title);
    expect(within(card).getByRole("button", { name: `Back on route: ${row(t.missable).title}` })).toHaveFocus();
  });
});

describe("Next up", () => {
  it("sets a step aside from its Later, says when it comes back, and opens what's set aside and waiting from its count", async () => {
    const user = userEvent.setup();
    draw(<NextUp chapter={1} />);
    const panel = screen.getByRole("region", { name: "Next up" });
    const first = nextUp({ checks: {} }, all, 1, 3).items[0].row;
    await user.click(within(panel).getByRole("button", { name: `Later: ${first.title}` }));
    expect(useProgress.getState().data.later).toHaveProperty(first.id);
    expect(useUi.getState().toast?.message).toMatch(new RegExp(`^Set aside “${first.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}”\\.`));
    expect(useUi.getState().toast?.message).not.toMatch(/Set aside for later/);
    const count = within(panel).getByRole("button", { name: /1 set aside · \d+ waiting/ });
    await user.click(count);
    await user.click(within(panel).getByRole("button", { name: `Back on route: ${first.title}` }));
    expect(useProgress.getState().data.later).toBeUndefined();
  });

  it("tags a step that came back with why", () => {
    set({ checks: { [g(2).at(-1)!.id]: true }, later: { [t.aside]: t.aside } });
    draw(<NextUp chapter={1} />);
    expect(screen.getByText("Back in Testville")).toBeInTheDocument();
  });
});

describe("a row", () => {
  it("shows that it's set aside, with a tag that puts it back, in both layouts", async () => {
    const user = userEvent.setup();
    set({ later: { [t.aside]: t.aside } });
    const { unmount } = draw(<ArticleRoute chapter={chapters[0]} footer={null} />);
    await user.click(screen.getByRole("button", { name: `Set aside. Put “${row(t.aside).title}” back on the route` }));
    expect(useProgress.getState().data.later).toBeUndefined();
    unmount();
    set({ later: { [t.aside]: t.aside } });
    draw(<RouteGroup groupKey="g" title="Group" rows={g(0)} open highlightedId="" fallbackFocusId="x" rememberToggle={false} />);
    expect(screen.getByRole("button", { name: `Set aside. Put “${row(t.aside).title}” back on the route` })).toBeInTheDocument();
  });

  it("says what it needs while it waits, linked where revealed, and nothing of a hidden chapter's row", () => {
    const { unmount } = draw(<ArticleRoute chapter={chapters[0]} footer={null} />);
    const entry = document.getElementById(`entry-${t.waits}`)!;
    expect(within(entry).getByRole("link", { name: "Test Key" })).toHaveAttribute("href", `/guide/2/${t.gate}`);
    unmount();
    set({ spoilers: true, ceiling: 1 });
    draw(<ArticleRoute chapter={chapters[0]} footer={null} />);
    expect(document.getElementById(`entry-${t.waits}`)).toHaveTextContent("Needs something from a later chapter");
    expect(isOpen(useProgress.getState().data, 2)).toBe(false);
  });
});

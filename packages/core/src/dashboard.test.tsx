import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { panels } from "virtual:guide/panels";
import { App } from "./App";
import { dashboardSections } from "./dashboard";
import { chapters, hasBuilds, text } from "./guide";
import { defaultState } from "./progress-state";
import { forgetPlaces } from "./store/place";
import { useProgress } from "./store/progress";
import { useUi } from "./store/ui";
import { allowSlowMounts } from "./test/slow";

allowSlowMounts();

beforeEach(() => {
  localStorage.clear();
  forgetPlaces();
  useProgress.setState({ data: defaultState(), storageError: false });
  useUi.setState({ toast: null, openGroups: {}, dialog: null, afterClose: null, announcement: "" });
  history.replaceState(null, "", "/dashboard");
});

afterEach(() => {
  vi.restoreAllMocks();
});

// The page's parts as it draws them: the cards in <main> that aren't inside another, in the page's order.
const parts = () => [...screen.getByRole("main").querySelectorAll("section")].filter((section) => !section.parentElement!.closest("section"));
const titleOf = (part: Element) => part.querySelector("h2")?.textContent;
const lists = () => screen.getAllByRole("navigation", { name: "On this page" });
const open = async (path: string) => {
  history.replaceState(null, "", path);
  render(<App />);
  await screen.findByRole("heading", { level: 1, name: "Your progress" });
};

describe("the Progress page", () => {
  it("is one column in the phone's order: the overall figure, the chapters, the build (with builds), the backup, the guide's panels, what's left, the board", async () => {
    await open("/dashboard");
    const ids = ["chapters", ...(hasBuilds ? ["build"] : []), "backup", ...panels.map((panel) => panel.id), "whats-left", "categories"];
    const [hero, ...rest] = parts();
    expect(within(hero).getByRole("progressbar", { name: "Overall completion" })).toBeInTheDocument();
    expect(rest.map((part) => part.id)).toEqual(ids);
    expect(rest.map(titleOf)).toEqual(["Chapter progress", ...(hasBuilds ? ["Your build"] : []), "Progress backup", ...panels.map((panel) => panel.title), "What’s left", text.boardTitle]);
    // All of them in the one column the list stands beside, none in a column of its own.
    const column = rest[0].parentElement!;
    for (const part of rest) expect(part.parentElement).toBe(column);
  });

  it("lists every part it draws in On this page, the guide's own panels included, each a link to its address with its title", async () => {
    const user = userEvent.setup();
    await open("/dashboard");
    const drawn = parts().filter((part) => part.id);
    // One list folded above the page, opened by its toggle, and one beside it (CSS shows one of the two, by the page's width).
    expect(lists()).toHaveLength(1);
    await user.click(screen.getByRole("button", { name: "On this page" }));
    expect(lists()).toHaveLength(2);
    for (const list of lists()) {
      const links = within(list).getAllByRole("link");
      expect(links.map((link) => link.getAttribute("href"))).toEqual(drawn.map((part) => `/dashboard/${part.id}`));
      expect(links.map((link) => link.textContent)).toEqual(drawn.map(titleOf));
    }
    expect(dashboardSections.map((section) => section.id)).toEqual(drawn.map((part) => part.id));
  });

  it("gives each part an id of its own, which no chapter's section key takes: the guide page is kept in the same document", () => {
    const ids = dashboardSections.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
    // A chapter's sections are ids too, written by hand (the article's headings), and the guide page stays drawn beside this one.
    const keys = new Set(chapters.flatMap((chapter) => chapter.groups.map((group) => group.key)));
    expect(ids.filter((id) => keys.has(id))).toEqual([]);
  });

  it("arrives at the part an address names with its title focused, and again each time its link is followed", async () => {
    const scrolled = vi.spyOn(Element.prototype, "scrollIntoView");
    const user = userEvent.setup();
    await open("/dashboard/backup");
    const part = (id: string) => parts().find((candidate) => candidate.id === id)!;
    expect(scrolled.mock.contexts.at(-1)).toBe(part("backup"));
    expect(scrolled).toHaveBeenLastCalledWith({ block: "start" });
    expect(within(part("backup")).getByRole("heading", { name: "Progress backup" })).toHaveFocus();
    for (const list of lists()) expect(within(list).getByRole("link", { name: "Progress backup" })).toHaveAttribute("aria-current", "location");

    const [list] = lists();
    await user.click(within(list).getByRole("link", { name: "What’s left" }));
    await waitFor(() => expect(scrolled.mock.contexts.at(-1)).toBe(part("whats-left")));
    expect(within(part("whats-left")).getByRole("heading", { name: "What’s left" })).toHaveFocus();
    expect(within(list).getByRole("link", { name: "What’s left" })).toHaveAttribute("aria-current", "location");
    expect(within(list).getByRole("link", { name: "Progress backup" })).not.toHaveAttribute("aria-current");

    // The same link again, a new entry of the history: the page puts the part in view again, wherever the reader has scrolled since.
    const before = scrolled.mock.calls.length;
    await user.click(within(list).getByRole("link", { name: "What’s left" }));
    await waitFor(() => expect(scrolled.mock.calls.length).toBeGreaterThan(before));
    expect(scrolled.mock.contexts.at(-1)).toBe(part("whats-left"));
  });

  it("comes Back to a part's address where it was left, with the focus in the page, not on the part's title screens away", async () => {
    // jsdom doesn't scroll: the window's offset is set by hand, and a scroll event tells Layout, as the browser would.
    const scrollWindowTo = (y: number) => {
      Object.defineProperty(window, "scrollY", { value: y, configurable: true });
      act(() => void document.dispatchEvent(new Event("scroll")));
    };
    try {
      const scrolled = vi.spyOn(window, "scrollTo");
      const user = userEvent.setup();
      await open("/dashboard");
      await user.click(within(lists()[0]).getByRole("link", { name: "What’s left" }));
      await waitFor(() => expect(screen.getByRole("heading", { name: "What’s left" })).toHaveFocus());
      // Down to the board, and away by one of its tiles.
      scrollWindowTo(1400);
      await user.click(within(parts().find((part) => part.id === "categories")!).getAllByRole("link")[0]);
      await screen.findByRole("searchbox", { name: "Search entries" });
      act(() => history.back());
      await screen.findByRole("heading", { level: 1, name: "Your progress" });
      await waitFor(() => expect(scrolled).toHaveBeenLastCalledWith(0, 1400));
      expect(screen.getByRole("main")).toHaveFocus();
    } finally {
      Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
    }
  });

  const guidePanels = panels.length > 0 ? it : it.skip;
  guidePanels("arrives at each of the guide's own panels by its address", async () => {
    const scrolled = vi.spyOn(Element.prototype, "scrollIntoView");
    await open(`/dashboard/${panels[0].id}`);
    const panel = parts().find((part) => part.id === panels[0].id)!;
    expect(scrolled.mock.contexts.at(-1)).toBe(panel);
    expect(within(panel).getByRole("heading", { name: panels[0].title })).toHaveFocus();
  });

  it("goes to its top for an address that names no part, and leaves a part's address to the page", async () => {
    history.replaceState(null, "", "/guide/1");
    render(<App />);
    await screen.findByRole("heading", { level: 1 });
    const scrolled = vi.spyOn(window, "scrollTo");
    const scrolledTo = vi.spyOn(Element.prototype, "scrollIntoView");
    // A move the browser makes (Back or Forward to an entry), to an address this page doesn't know: Layout takes it to the top, focus in <main>.
    act(() => {
      history.pushState({ key: "unknown", idx: 1, usr: null }, "", "/dashboard/stats");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    await screen.findByRole("heading", { level: 1, name: "Your progress" });
    expect(scrolled).toHaveBeenLastCalledWith(0, 0);
    expect(screen.getByRole("main")).toHaveFocus();
    expect(scrolledTo).not.toHaveBeenCalled();
    for (const list of lists()) expect(within(list).queryByRole("link", { current: "location" })).toBeNull();

    // To a part's address: the page puts it in view, and Layout leaves it there.
    const calls = scrolled.mock.calls.length;
    act(() => {
      history.pushState({ key: "known", idx: 2, usr: null }, "", "/dashboard/categories");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    await waitFor(() => expect(screen.getByRole("heading", { name: text.boardTitle })).toHaveFocus());
    expect(scrolledTo.mock.contexts.at(-1)).toBe(parts().find((part) => part.id === "categories"));
    expect(scrolled.mock.calls.length).toBe(calls);
  });
});

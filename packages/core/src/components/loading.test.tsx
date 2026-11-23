import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { DialogHost } from "./DialogHost";
import { Select } from "./Select";
import { ToastHost } from "./ToastHost";
import { WhoSaysTrigger } from "./BuildMark";
import { WhoSaysHost } from "./WhoSaysHost";
import { chunks } from "./chunks";
import { loadable } from "../loadable";
import { defaultState } from "../progress-state";
import { useProgress } from "../store/progress";
import { useTheme } from "../store/theme";
import { useUi } from "../store/ui";
import { allowSlowMounts } from "../test/slow";

allowSlowMounts();

// What the dialog and the select show while the chunks behind them are on the way, and when they can't come. The tests everywhere else
// have the chunks loaded first (test/setup.ts); here each test brings chunks of its own that it controls, and the mock below leaves
// the setup nothing to load.
vi.mock("./chunks", async (importActual) => ({ ...(await importActual<typeof import("./chunks")>()), chunks: {} }));

type SelectModule = typeof import("./select-impl");
type DialogModule = typeof import("./DialogFrames");
type ToastsModule = typeof import("./Toasts");
type WhoSaysModule = typeof import("./WhoSays");

/** A promise settled from outside. */
const deferred = <T,>() => {
  let resolve!: (value: T) => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<T>((yes, no) => ((resolve = yes), (reject = no)));
  return { promise, resolve, reject };
};

const options: [number, string][] = [
  [1, "Chapter 1"],
  [2, "Chapter 2"],
];

afterEach(() => {
  vi.restoreAllMocks();
});

beforeEach(() => {
  localStorage.clear();
  useProgress.setState({ data: defaultState(), storageError: false });
  useUi.setState({ toast: null, dialog: null, afterClose: null, announcement: "" });
  useTheme.setState({ preference: "system" });
});

describe("Select while its chunk loads", () => {
  it("shows a stand-in with the same label and value, then the real select in its place", async () => {
    const user = userEvent.setup();
    const select = deferred<SelectModule>();
    chunks.select = loadable(() => select.promise);
    render(<Select id="chapter" label="Chapter" choices={options} value={2} onChange={() => {}} />);

    const standIn = screen.getByRole("button", { name: "Chapter" });
    expect(standIn).toHaveTextContent("Chapter 2");
    expect(standIn).toHaveAttribute("id", "chapter");
    expect(screen.queryByRole("combobox")).toBeNull();

    await user.hover(standIn);
    await act(async () => select.resolve(await vi.importActual<SelectModule>("./select-impl")));
    const trigger = screen.getByRole("combobox", { name: "Chapter" });
    expect(trigger).toHaveTextContent("Chapter 2");
    expect(trigger).toHaveAttribute("id", "chapter");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("opens the list once it has loaded when the stand-in was tapped before", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const select = deferred<SelectModule>();
    chunks.select = loadable(() => select.promise);
    render(<Select id="chapter" label="Chapter" choices={options} value={1} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Chapter" }));
    expect(screen.queryByRole("listbox")).toBeNull();
    await act(async () => select.resolve(await vi.importActual<SelectModule>("./select-impl")));
    await user.click(await screen.findByRole("option", { name: "Chapter 2" }));
    expect(onChange).toHaveBeenCalledExactlyOnceWith("2");
  });

  it("opens the list on the arrow keys too, and keeps the focus it had", async () => {
    const user = userEvent.setup();
    const select = deferred<SelectModule>();
    chunks.select = loadable(() => select.promise);
    render(<Select id="chapter" label="Chapter" choices={options} value={1} onChange={() => {}} />);

    await user.tab();
    expect(screen.getByRole("button", { name: "Chapter" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    await act(async () => select.resolve(await vi.importActual<SelectModule>("./select-impl")));
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("listbox")).toBeNull());
    expect(screen.getByRole("combobox", { name: "Chapter" })).toHaveFocus();
  });

  it("takes the focus to the real trigger when only the focus, not a tap, was on the stand-in", async () => {
    const user = userEvent.setup();
    const select = deferred<SelectModule>();
    chunks.select = loadable(() => select.promise);
    render(<Select id="chapter" label="Chapter" choices={options} value={1} onChange={() => {}} />);
    await user.tab();
    await act(async () => select.resolve(await vi.importActual<SelectModule>("./select-impl")));
    expect(screen.getByRole("combobox", { name: "Chapter" })).toHaveFocus();
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("doesn't fetch the chunk until the page is idle or the pointer or focus reaches a select", async () => {
    const user = userEvent.setup();
    const importer = vi.fn(() => vi.importActual<SelectModule>("./select-impl"));
    chunks.select = loadable(importer);
    const { unmount } = render(<Select id="chapter" label="Chapter" choices={options} value={1} onChange={() => {}} />);
    expect(importer).not.toHaveBeenCalled();
    await user.hover(screen.getByRole("button", { name: "Chapter" }));
    expect(importer).toHaveBeenCalledTimes(1);
    unmount();

    chunks.select = loadable(importer);
    render(<Select id="chapter" label="Chapter" choices={options} value={1} onChange={() => {}} />);
    await user.tab();
    expect(importer).toHaveBeenCalledTimes(2);
  });

  it("fetches it once the page is idle, with nobody having touched the select", async () => {
    // Real timers: Base UI needs them elsewhere in this file. jsdom has no requestIdleCallback, so the wait is whenIdle's timer, a second.
    const importer = vi.fn(() => vi.importActual<SelectModule>("./select-impl"));
    chunks.select = loadable(importer);
    render(<Select id="chapter" label="Chapter" choices={options} value={1} onChange={() => {}} />);
    expect(importer).not.toHaveBeenCalled();
    expect(await screen.findByRole("combobox", { name: "Chapter" }, { timeout: 5000 })).toBeInTheDocument();
    expect(importer).toHaveBeenCalledTimes(1);
  });

  it("tells the reader when a tap couldn't fetch it, and fetches it again on the next tap", async () => {
    const user = userEvent.setup();
    const importer = vi.fn<() => Promise<SelectModule>>().mockRejectedValueOnce(new Error("offline"));
    importer.mockImplementation(() => vi.importActual<SelectModule>("./select-impl"));
    chunks.select = loadable(importer);
    render(<Select id="chapter" label="Chapter" choices={options} value={1} onChange={() => {}} />);

    await user.hover(screen.getByRole("button", { name: "Chapter" }));
    await waitFor(() => expect(importer).toHaveBeenCalledTimes(1));
    // The reader hasn't asked for anything yet: a failed look-ahead is silent.
    expect(useUi.getState().toast).toBeNull();
    expect(screen.getByRole("button", { name: "Chapter" })).toBeEnabled();

    await user.click(screen.getByRole("button", { name: "Chapter" }));
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
    expect(importer).toHaveBeenCalledTimes(2);
  });

  it("says so, on every tap, while the chunk can't be fetched", async () => {
    const user = userEvent.setup();
    chunks.select = loadable(() => Promise.reject(new Error("offline")));
    render(<Select id="chapter" label="Chapter" choices={options} value={1} onChange={() => {}} />);

    await user.click(screen.getByRole("button", { name: "Chapter" }));
    await waitFor(() => expect(useUi.getState().toast?.message).toMatch(/Couldn't open that/));
    act(() => useUi.setState({ toast: null }));
    await user.click(screen.getByRole("button", { name: "Chapter" }));
    await waitFor(() => expect(useUi.getState().toast?.message).toMatch(/Couldn't open that/));
  });

  it("keeps a disabled select disabled while it loads", () => {
    chunks.select = loadable(() => deferred<SelectModule>().promise);
    render(<Select id="chapter" label="Chapter" choices={options} value={1} onChange={() => {}} disabled />);
    expect(screen.getByRole("button", { name: "Chapter" })).toBeDisabled();
  });
});

describe("the dialog while its chunk loads", () => {
  const renderHost = () =>
    render(
      <MemoryRouter>
        <DialogHost />
      </MemoryRouter>,
    );

  it("appears when its chunk arrives, if it was asked for before", async () => {
    const dialog = deferred<DialogModule>();
    const importer = vi.fn(() => dialog.promise);
    chunks.dialog = loadable(importer);
    renderHost();
    expect(importer).not.toHaveBeenCalled();

    act(() => useUi.getState().openDialog({ kind: "settings" }));
    expect(importer).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).toBeNull();
    await act(async () => dialog.resolve(await vi.importActual<DialogModule>("./DialogFrames")));
    const opened = await screen.findByRole("dialog", { name: "Guide settings" });
    // A dialog that mounts already open still takes the focus, but a moment after it has mounted.
    await waitFor(() => expect(within(opened).getByRole("radio", { name: "Use device setting" })).toHaveFocus());
  });

  it("is fetched once the page is idle, with nobody having asked, and then opens as it always does", async () => {
    // Real timers: Base UI's own transitions need them. jsdom has no requestIdleCallback, so the wait is whenIdle's timer, a second.
    const importer = vi.fn(() => vi.importActual<DialogModule>("./DialogFrames"));
    chunks.dialog = loadable(importer);
    renderHost();
    expect(importer).not.toHaveBeenCalled();
    await waitFor(() => expect(importer).toHaveBeenCalledTimes(1), { timeout: 5000 });
    act(() => useUi.getState().openDialog({ kind: "settings" }));
    expect(await screen.findByRole("dialog", { name: "Guide settings" })).toBeInTheDocument();
    expect(importer).toHaveBeenCalledTimes(1);
  });

  it("closes and says so when the chunk can't be fetched, and fetches it again on the next try", async () => {
    const importer = vi.fn<() => Promise<DialogModule>>().mockRejectedValueOnce(new Error("offline"));
    importer.mockImplementation(() => vi.importActual<DialogModule>("./DialogFrames"));
    chunks.dialog = loadable(importer);
    renderHost();

    act(() => useUi.getState().openDialog({ kind: "settings" }));
    await waitFor(() => expect(useUi.getState().dialog).toBeNull());
    expect(useUi.getState().toast?.message).toMatch(/Couldn't open that\. Reload the page/);

    act(() => useUi.getState().openDialog({ kind: "settings" }));
    expect(await screen.findByRole("dialog", { name: "Guide settings" })).toBeInTheDocument();
    expect(importer).toHaveBeenCalledTimes(2);
  });

  it("points at the connection, not the page, when the reader is offline", async () => {
    vi.spyOn(navigator, "onLine", "get").mockReturnValue(false);
    chunks.dialog = loadable(() => Promise.reject(new Error("offline")));
    renderHost();
    act(() => useUi.getState().openDialog({ kind: "settings" }));
    await waitFor(() => expect(useUi.getState().toast?.message).toMatch(/Check your connection/));
  });
});

describe("the toasts while their chunk loads", () => {
  it("say a toast in the status region and clear it when the chunk can't come, and ask again for the next one", async () => {
    const importer = vi.fn<() => Promise<ToastsModule>>().mockRejectedValueOnce(new Error("offline"));
    importer.mockImplementation(() => vi.importActual<ToastsModule>("./Toasts"));
    chunks.toasts = loadable(importer);
    render(<ToastHost />);

    act(() => useUi.getState().showToast("Checked 7 steps.", () => {}));
    await waitFor(() => expect(useUi.getState().toast).toBeNull());
    expect(useUi.getState().announcement).toBe("Checked 7 steps.");

    act(() => useUi.getState().showToast("Checked 3 steps.", () => {}));
    expect(await screen.findByRole("button", { name: "Undo" })).toBeInTheDocument();
    expect(screen.getByText("Checked 3 steps.")).toBeInTheDocument();
    expect(importer).toHaveBeenCalledTimes(2);
  });
});

describe("Who says so while its popover's chunk loads", () => {
  it("opens the popover on the trigger tapped before its chunk arrived", async () => {
    const user = userEvent.setup();
    const popover = deferred<WhoSaysModule>();
    chunks.whoSays = loadable(() => popover.promise);
    render(
      <>
        <WhoSaysTrigger lines={[{ item: "Homeward", by: ["Fextralife", "Steam"] }]} of="for your Paladin, on “Join the Way of White”" />
        <WhoSaysHost />
      </>,
    );
    await user.click(screen.getByRole("button", { name: "Who says so, for your Paladin, on “Join the Way of White”" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    await act(async () => popover.resolve(await vi.importActual<WhoSaysModule>("./WhoSays")));
    const popup = await screen.findByRole("dialog", { name: "Who says so" });
    expect(popup).toHaveTextContent("Homeward: recommended by Fextralife and Steam.");
  });
});

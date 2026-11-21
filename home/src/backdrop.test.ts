// @vitest-environment jsdom
// The hero's backdrop: one banner at a time, A to Z, each next one fetched shortly before it's due and brought in on top of the one before,
// only while it can be seen, and never for a reader who asks for reduced motion.
import { AHEAD, HOLD, wireBackdrop } from "./backdrop";

const URLS = ["/assets/a-backdrop-288-1.webp", "/assets/b-backdrop-288-2.webp", "/assets/c-backdrop-288-3.webp"];

function page(urls = URLS) {
  document.body.innerHTML = `<div class="sky"><div class="backdrop" aria-hidden="true" data-backdrop="${urls.join(" ")}"><img class="on" src="${urls[0]}" width="288" height="96" alt="" fetchpriority="low" decoding="async"></div></div>`;
}
const images = () => [...document.querySelectorAll<HTMLImageElement>(".backdrop img")];
/** The banner the reader sees: the last image with .on, drawn over the ones before it. */
const shown = () => images().findLast((image) => image.classList.contains("on"))?.getAttribute("src");

/** A reduced-motion setting the test sets, telling the page when it changes. */
function motion(reduce: boolean) {
  const listeners = new Set<() => void>();
  return {
    query: {
      get matches() {
        return reduce;
      },
      addEventListener: (_: string, listener: () => void) => listeners.add(listener),
      removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
    },
    set(next: boolean) {
      reduce = next;
      for (const listener of listeners) listener();
    },
  };
}

let reduced: ReturnType<typeof motion>;
let hidden: boolean;
let observed: Element[];
let view: ((...answers: boolean[]) => void) | undefined;
let decode: () => Promise<void>;

const setHidden = (next: boolean) => {
  hidden = next;
  document.dispatchEvent(new Event("visibilitychange"));
};
const wire = (reduce = false) => {
  reduced = motion(reduce);
  wireBackdrop();
};

beforeEach(() => {
  vi.useFakeTimers();
  hidden = false;
  observed = [];
  view = undefined;
  decode = () => Promise.resolve();
  Object.defineProperty(document, "hidden", { configurable: true, get: () => hidden });
  vi.stubGlobal("matchMedia", (query: string) => (query === "(prefers-reduced-motion: reduce)" ? reduced.query : { matches: false, addEventListener() {} }));
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
        view = (...answers) => callback(answers.map((isIntersecting) => ({ isIntersecting })));
      }
      observe(element: Element) {
        observed.push(element);
      }
    },
  );
  // jsdom has no decode()
  HTMLImageElement.prototype.decode = function () {
    return decode();
  };
  page();
});
afterEach(() => {
  // the backdrop this test wired stops for good, so a later test's events don't wake it
  reduced?.set(true);
  vi.useRealTimers();
  vi.unstubAllGlobals();
  delete (HTMLImageElement.prototype as Partial<HTMLImageElement>).decode;
});

describe("the hero's backdrop", () => {
  it("crossfades A to Z on a timer, fetching each next banner shortly before it's due, the one before staying whole beneath", async () => {
    wire();
    view!(true);
    await vi.advanceTimersByTimeAsync(HOLD - AHEAD - 1);
    expect(images().length).toBe(1);
    await vi.advanceTimersByTimeAsync(1);
    const [first, next] = images();
    // fetched, laid on top, not shown yet
    expect(next.getAttribute("src")).toBe(URLS[1]);
    expect(next.classList.contains("on")).toBe(false);
    expect(next.getAttribute("alt")).toBe("");
    expect(next.getAttribute("fetchpriority")).toBe("low");
    expect([next.getAttribute("width"), next.getAttribute("height")]).toEqual(["288", "96"]);
    expect(shown()).toBe(URLS[0]);
    // laid on top when fetched, and left there: a move would restyle it from nothing and show it without the fade
    const moves = vi.spyOn(next.parentElement!, "append");
    await vi.advanceTimersByTimeAsync(AHEAD);
    expect(shown()).toBe(URLS[1]);
    expect(moves).not.toHaveBeenCalled();
    expect(first.classList.contains("on")).toBe(true);
    // the one beneath goes once it's covered: it carries the banner after
    await vi.advanceTimersByTimeAsync(HOLD - AHEAD);
    expect(images()).toEqual([next, first]);
    expect(first.classList.contains("on")).toBe(false);
    expect(first.getAttribute("src")).toBe(URLS[2]);
    expect(shown()).toBe(URLS[1]);
    await vi.advanceTimersByTimeAsync(AHEAD);
    expect(shown()).toBe(URLS[2]);
    // and round again, with two images all along
    await vi.advanceTimersByTimeAsync(HOLD);
    expect(shown()).toBe(URLS[0]);
    expect(images().length).toBe(2);
  });

  it("shows no banner before it's decoded, and skips one that won't load", async () => {
    let done!: () => void;
    decode = () => new Promise((resolve) => (done = resolve));
    wire();
    view!(true);
    await vi.advanceTimersByTimeAsync(HOLD * 2);
    expect(shown()).toBe(URLS[0]);
    done();
    await vi.advanceTimersByTimeAsync(0);
    expect(shown()).toBe(URLS[1]);
    decode = () => Promise.reject(new Error("broken"));
    await vi.advanceTimersByTimeAsync(HOLD);
    expect(shown()).toBe(URLS[1]);
    decode = () => Promise.resolve();
    await vi.advanceTimersByTimeAsync(HOLD);
    expect(shown()).toBe(URLS[0]);
  });

  it("keeps the first banner and fetches nothing for a reader who asks for reduced motion, and stops when they ask mid-way", async () => {
    wire(true);
    view!(true);
    await vi.advanceTimersByTimeAsync(HOLD * 5);
    expect(images().length).toBe(1);
    expect(vi.getTimerCount()).toBe(0);
    reduced.set(false);
    await vi.advanceTimersByTimeAsync(HOLD);
    expect(shown()).toBe(URLS[1]);
    reduced.set(true);
    expect(vi.getTimerCount()).toBe(0);
    await vi.advanceTimersByTimeAsync(HOLD * 5);
    expect(shown()).toBe(URLS[1]);
  });

  it("waits while the tab is hidden, then gives the banner a full hold again", async () => {
    wire();
    view!(true);
    await vi.advanceTimersByTimeAsync(HOLD - 1000);
    setHidden(true);
    expect(vi.getTimerCount()).toBe(0);
    await vi.advanceTimersByTimeAsync(HOLD * 3);
    expect(shown()).toBe(URLS[0]);
    setHidden(false);
    await vi.advanceTimersByTimeAsync(HOLD - 1);
    expect(shown()).toBe(URLS[0]);
    await vi.advanceTimersByTimeAsync(1);
    expect(shown()).toBe(URLS[1]);
  });

  it("starts nothing before the hero is first seen, and waits while it's scrolled away or not drawn", async () => {
    wire();
    // the backdrop itself, which home.css hides for a reader who asks for more contrast: then it's never in view
    expect(observed).toEqual([document.querySelector(".backdrop")]);
    await vi.advanceTimersByTimeAsync(HOLD * 2);
    expect(images().length).toBe(1);
    view!(true);
    await vi.advanceTimersByTimeAsync(HOLD);
    expect(shown()).toBe(URLS[1]);
    view!(false);
    await vi.advanceTimersByTimeAsync(HOLD * 3);
    expect(shown()).toBe(URLS[1]);
    view!(true);
    await vi.advanceTimersByTimeAsync(HOLD);
    expect(shown()).toBe(URLS[2]);
    // scrolled away and back before the observer could answer: the latest answer counts
    view!(false, true);
    await vi.advanceTimersByTimeAsync(HOLD);
    expect(shown()).toBe(URLS[0]);
  });

  it("lets no banner in that was still decoding when it stopped", async () => {
    let done!: () => void;
    decode = () => new Promise((resolve) => (done = resolve));
    wire();
    view!(true);
    await vi.advanceTimersByTimeAsync(HOLD);
    setHidden(true);
    done();
    await vi.advanceTimersByTimeAsync(0);
    expect(shown()).toBe(URLS[0]);
    decode = () => Promise.resolve();
    setHidden(false);
    await vi.advanceTimersByTimeAsync(HOLD);
    expect(shown()).toBe(URLS[1]);
  });

  it("does nothing with one banner", async () => {
    page([URLS[0]]);
    wire();
    expect(view).toBeUndefined();
    await vi.advanceTimersByTimeAsync(HOLD * 3);
    expect(images().length).toBe(1);
    expect(vi.getTimerCount()).toBe(0);
  });
});

// The hero's backdrop (page.tsx's Backdrop): one guide's chapter 1 banner at a time, crossfading to the next, A to Z, on a timer. The
// markup holds the first banner and lists every guide's in data-backdrop. This fetches each next one shortly before it's due and brings it
// in on top of the one before, which stays whole beneath until it is covered (home.css's .backdrop img.on), so the fade never dips to the
// paper. It runs only while it can be seen: never for a reader who asks for reduced motion (the first banner stays, and nothing else is
// fetched), and not while the tab is hidden or the hero is scrolled away, coming back to a full hold when it can be seen again. Nothing is
// kept.

/** How long each banner holds before the next starts coming in, in ms. The fade itself is home.css's, 1.5 s. */
export const HOLD = 7000;
/** How long before it's due the next banner is fetched, in ms. */
export const AHEAD = 2000;

/** Starts the backdrop, if the page has one with more than one banner. */
export function wireBackdrop(root: ParentNode = document) {
  const box = root.querySelector<HTMLElement>("[data-backdrop]");
  const urls = box?.dataset.backdrop?.split(" ").filter(Boolean) ?? [];
  const first = box?.querySelector("img");
  if (!box || !first || urls.length < 2) return;
  let front = first;
  let back = document.createElement("img");
  back.alt = "";
  back.decoding = "async";
  back.setAttribute("fetchpriority", "low");
  back.setAttribute("width", first.getAttribute("width") ?? "");
  back.setAttribute("height", first.getAttribute("height") ?? "");

  const still = matchMedia("(prefers-reduced-motion: reduce)");
  // Until the observer's first answer: a page restored scrolled down starts nothing.
  let inView = false;
  const live = () => !still.matches && !document.hidden && inView;

  let shown = 0;
  let timers: ReturnType<typeof setTimeout>[] = [];
  // Bumped on every stop, so a banner still decoding when the backdrop stops doesn't come in.
  let run = 0;
  /** The next banner into the hidden image, laid on top: it was the one before, covered since its follower came in. */
  const load = (url: string) => {
    back.classList.remove("on");
    box.append(back);
    if (back.getAttribute("src") !== url) back.src = url;
  };
  const stop = () => {
    for (const timer of timers) clearTimeout(timer);
    timers = [];
    run++;
  };
  const schedule = () => {
    stop();
    const next = (shown + 1) % urls.length;
    const ticket = run;
    timers = [
      setTimeout(() => load(urls[next]), HOLD - AHEAD),
      // Not laid on top again here: a move restyles the image from nothing, and .on given to it then would show it at once, not fade it in.
      setTimeout(async () => {
        const decoded = await back.decode().then(
          () => true,
          () => false,
        );
        if (ticket !== run) return;
        // A banner that won't load is skipped: the one showing holds on, and the one after it is next.
        shown = next;
        if (decoded) {
          back.classList.add("on");
          [front, back] = [back, front];
        }
        schedule();
      }, HOLD),
    ];
  };

  let running = false;
  const update = () => {
    if (live() === running) return;
    running = !running;
    if (running) schedule();
    else stop();
  };
  still.addEventListener("change", update);
  document.addEventListener("visibilitychange", update);
  // Out of view includes not drawn at all, as where a reader asks for more contrast (home.css hides the backdrop).
  // One call can carry several answers, oldest first.
  new IntersectionObserver((entries) => {
    inView = entries.at(-1)!.isIntersecting;
    update();
  }).observe(box);
  update();
}

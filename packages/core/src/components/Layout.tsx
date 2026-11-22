import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigationType } from "react-router";
import { chunks, loadFailed } from "./chunks";
import { DialogHost } from "./DialogHost";
import { MainNav } from "./MainNav";
import { Rail } from "./Rail";
import { TopBar } from "./TopBar";
import { ToastHost } from "./ToastHost";
import { TooltipHost } from "./TooltipHost";
import { WhoSaysHost } from "./WhoSaysHost";
import { guideAnchor, hasBuilds, readChapter } from "../guide";
import { lineById } from "../questlines";
import { isDashboardSection } from "../dashboard";
import { useLoadable, whenIdle } from "../loadable";
import { isOpen, useProgress } from "../store/progress";
import { arrive, entryOffset, offsetOf, placeOf, savePlace, scrolled, useReturning } from "../store/place";
import { useUi } from "../store/ui";
import { isNarrow, useNarrow, usePhone } from "../useNarrow";
import { useChromeColor } from "../useThemeEffects";

function viewOf(pathname: string) {
  const [view = "guide", param, entry] = pathname.split("/").filter(Boolean);
  return { view, param, entry };
}

/**
 * The frame of every page: the top bar, the chapter rail (a drawer under 800px), the page itself, the tab bar (a phone) and the toasts. In a browser tab the
 * whole page scrolls under a sticky top bar. In the installed app (`standalone:`, see app.css) the frame is fixed to the screen and
 * only the main area scrolls.
 */
export function Layout({ children }: { children: ReactNode }) {
  const { pathname, key } = useLocation();
  const chapter = useProgress((s) => s.data.chapter);
  const announcement = useUi((s) => s.announcement);
  const dialogOpen = useUi((s) => s.dialog !== null);
  useChromeColor(dialogOpen);
  // Under 800px the chapter rail is a drawer (RailDrawer.tsx, a chunk of its own); wider, a column beside the page.
  const narrow = useNarrow();
  // On a phone the three pages are a tab bar at the bottom instead of links in the top bar (TopBar.tsx).
  const phone = usePhone();
  // The drawer is open only for the page it was opened on, so navigating closes it, and only while there is a drawer.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  if (menuPath !== null && (!narrow || menuPath !== pathname)) setMenuPath(null);
  const menuOpen = menuPath === pathname;
  // Where the drawer was opened, for the focus when it closes: back to the menu button, unless a link was followed.
  const openedOn = useRef<string | null>(null);
  const followedLink = useRef(false);
  const setMenuOpen = (open: boolean) => {
    if (open) {
      openedOn.current = pathname;
      followedLink.current = false;
    }
    setMenuPath(open ? pathname : null);
  };
  const drawer = useLoadable(chunks.drawer, menuOpen, () => {
    setMenuPath(null);
    loadFailed();
  });
  // Fetched ahead only where it can be needed; a window that narrows later loads it when the menu opens.
  useEffect(
    () =>
      whenIdle(() => {
        if (isNarrow()) chunks.drawer.warm();
      }),
    [],
  );
  const mainRef = useRef<HTMLElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  // The history entry last shown: an effect run again for the same one (React does that in development) changes nothing.
  const shown = useRef<string | null>(null);
  const { view, param, entry } = viewOf(pathname);
  const activeChapter = readChapter(param, chapter);
  const guideTarget = view === "guide" && guideAnchor(activeChapter, entry);
  const targetedGuide = useProgress((s) => Boolean(guideTarget && isOpen(s.data, activeChapter)));
  // A line on the Questlines page is something to scroll to only while it's listed, its first step revealed (questlines.ts).
  const targetedLine = useProgress((s) => {
    const line = view === "questlines" ? lineById(param) : undefined;
    return Boolean(line && isOpen(s.data, line.rows[0].chapter));
  });
  const targeted = targetedGuide || targetedLine || (view === "dashboard" && isDashboardSection(param));
  const place = placeOf(pathname, chapter);
  const returning = useReturning();

  // Where the reader is on each page, as they scroll (the window in a browser tab, the main area in the installed app), and the place
  // saved as the guide goes into the background, for the next launch (store/place.ts).
  useEffect(() => {
    const onScroll = (event: Event) => {
      const main = mainRef.current;
      if (event.target === document) scrolled(window.scrollY);
      else if (main && event.target === main) scrolled(main.scrollTop);
    };
    const onHide = () => {
      if (document.visibilityState === "hidden") savePlace();
    };
    // A scroll doesn't bubble: the main area's is caught on its way down.
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", savePlace);
    return () => {
      document.removeEventListener("scroll", onScroll, { capture: true });
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", savePlace);
    };
  }, []);

  // Moving to a new page: back to where the reader left it if they are coming back to it (Back or Forward to that very entry, a tab of the
  // bar, a launch that reopens the last place), its top otherwise, and the focus in <main>. An address that points at something to scroll
  // to (a guide section or entry, a questline, or a part of the Progress page) is left to the page, unless Back returns to it, where it
  // was left wins. A layout effect, so the page is where it belongs before it is shown. It runs after the page's own effects, so it has
  // the last word.
  const pop = useNavigationType() === "POP";
  useLayoutEffect(() => {
    if (shown.current === key) return;
    const first = shown.current === null;
    shown.current = key;
    arrive(place, key, returning);
    const left = pop ? entryOffset(key) : undefined;
    if (targeted && left === undefined) return;
    const offset = left ?? (returning ? offsetOf(place) : undefined);
    // The first page of a visit keeps the focus where the browser put it, and is scrolled only to a place being reopened.
    if (first && offset === undefined) return;
    window.scrollTo(0, offset ?? 0);
    // In the installed app the main area scrolls, not the page.
    mainRef.current?.scrollTo(0, offset ?? 0);
    // A page that put the focus on what its address names leaves it there, unless Back put the page back where it was left: then that
    // may be screens away, and the focus goes into the page as for any page come back to.
    if (!first && (!targeted || left !== undefined)) mainRef.current?.focus({ preventScroll: true });
  }, [key, place, pop, returning, targeted]);

  return (
    <>
      <a
        // Out of sight until it takes the focus, then in the top corner.
        className="absolute -top-96 left-3 z-30 rounded-small bg-surface px-3 py-2 whitespace-nowrap focus:fixed focus:top-[calc(0.75rem+var(--safe-top))] focus:left-[calc(0.75rem+var(--safe-left))]"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Skip to content
      </a>
      <TopBar chapter={chapter} view={view} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen(!menuOpen)} menuToggle={menuToggle} />
      {/* The bottom margin is the room the phone's fixed tab bar covers in a browser tab (MainNav); --tabs is 0 from 551px up.
          The frame (tokens.css): the rail's column and the page's, centred together between two bands that share whatever the screen has
          past --frame-max, so on a wide screen the rail and the page stay side by side and the spare width is split on either side of
          them. The left band is drawn in the rail's tint (the `before:`), so the rail runs to the screen's edge; the right one is <main>'s,
          which runs to the edge too: in the installed app it is what scrolls, so the scrollbar and the wheel belong to the window's edge.
          From 800px down it is one column, in a tab as in the app. Its one row is the room under the top bar (at least the screen less the
          bars in a tab, the room the fixed frame leaves in the app), and <main>, the page and the kept page in it (Pages) are each a track
          that fills what is left of it, so a page can sit something in the middle of the screen (SealedChapter) with no height worked out
          for it; a page taller than that is as tall as it needs, as before. */}
      <div className="mb-(--tabs) grid min-h-[calc(100dvh-var(--bar)-var(--tabs))] grid-cols-[minmax(0,1fr)_var(--rail-col)_minmax(0,var(--page-max))_minmax(0,1fr)] before:col-start-1 before:row-start-1 before:bg-rail before:content-[''] standalone:mb-0 standalone:min-h-0 standalone:flex-1 standalone:grid-rows-[minmax(0,1fr)] drawer:grid-cols-[minmax(0,1fr)] drawer:before:hidden">
        {/* The drawer stays mounted (closed, it renders nothing) so that widening past 800px closes it the ordinary way, focus and all. */}
        {drawer && (
          <drawer.RailDrawer
            open={menuOpen}
            onOpenChange={setMenuOpen}
            activeChapter={activeChapter}
            view={view}
            onFollowLink={() => {
              followedLink.current = true;
            }}
            returnFocus={() => {
              // Widened past 800px while open: the menu button is hidden at that width, so the focus goes into the page.
              if (!isNarrow()) return mainRef.current ?? false;
              // A link to another page: Layout puts the focus in the page after the move (or on what the address points at).
              if (window.location.pathname !== openedOn.current) return false;
              // The current chapter's link moves nothing, so the focus goes into the page from here.
              if (followedLink.current) return mainRef.current ?? false;
              return menuToggle.current ?? false;
            }}
          />
        )}
        {!narrow && <Rail activeChapter={activeChapter} view={view} />}
        <main
          id="main"
          tabIndex={-1}
          ref={mainRef}
          // From the page's column to the screen's edge (the frame above), in the grid's one row: placed there, not left to auto-placement,
          // so in the installed app it is always the row the frame bounds, and so a scroller. Its padding is the room above and under the
          // page (--pad-end, and the home indicator under that, but on a phone the tab bar covers the home indicator, so the room under the
          // page is --pad-end alone) and the notch's insets.
          className="col-[3/-1] row-start-1 flex min-w-0 flex-col pt-6 pr-(--safe-right) pb-[calc(var(--pad-end)+var(--safe-bottom))] outline-none [--pad-end:3rem] standalone:scroll-pt-(--sticky-gap) standalone:overflow-y-auto standalone:overscroll-contain drawer:col-auto drawer:pt-4 drawer:pl-(--safe-left) drawer:[--pad-end:2rem] phone:pt-3 phone:pb-(--pad-end) phone:[--pad-end:1.5rem]"
        >
          {/* The page itself: the page's column of the frame, at most --page-max, its side padding --gutter. The gutter is one clamp from a
              phone's 12px up, in vw: it is the frame's own padding, not a part's. This is also the page's container (`/page`), so what
              lives in the page column (a page's title) can size itself by the column, in `cqi`. */}
          <div className="@container/page flex max-w-(--page-max) grow flex-col px-(--gutter) [--gutter:clamp(0.75rem,3.25vw,3.3125rem)]">{children}</div>
        </main>
      </div>
      {phone && <MainNav chapter={chapter} view={view} place="bottom" />}
      <DialogHost />
      <ToastHost />
      <TooltipHost />
      {hasBuilds && <WhoSaysHost />}
      <div id="status" className="sr-only" role="status">
        {announcement}
      </div>
    </>
  );
}

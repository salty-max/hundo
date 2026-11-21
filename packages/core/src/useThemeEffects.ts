import { useEffect, useLayoutEffect, useSyncExternalStore } from "react";
import { THEME_KEY, useTheme } from "./store/theme";
import { STORAGE_KEY } from "./progress-state";
import { askAfterFirstTick, checkPersistence, reloadFromAnotherTab } from "./persistence";
import { AWAKE_KEY, useAwake } from "./store/awake";
import { BUILD_ASKED_KEY, BUILD_KEY, useBuild } from "./store/build";
import { useKeepAwake } from "./useKeepAwake";
import { COUNTS_KEY, startCounting, useCounts } from "./counts";

const query = () => matchMedia("(prefers-color-scheme: dark)");
const subscribeSystem = (callback: () => void) => {
  const media = query();
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

/** "light" or "dark" after resolving the "system" preference. */
export function useResolvedTheme() {
  const preference = useTheme((s) => s.preference);
  const systemDark = useSyncExternalStore(subscribeSystem, () => query().matches, () => false);
  return preference === "system" ? (systemDark ? "dark" : "light") : preference;
}

/** The colour of `surface` with the dialogs' backdrop over it, as `rgb(…)`, or null where a canvas can't tell. */
function dimmed(surface: string) {
  try {
    const probe = document.createElement("div");
    probe.style.background = "var(--backdrop)";
    document.body.append(probe);
    const backdrop = getComputedStyle(probe).backgroundColor;
    probe.remove();
    const context = document.createElement("canvas").getContext("2d");
    if (!context) return null;
    context.canvas.width = context.canvas.height = 1;
    context.fillStyle = surface;
    context.fillRect(0, 0, 1, 1);
    context.fillStyle = backdrop;
    context.fillRect(0, 0, 1, 1);
    const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
    return `rgb(${r}, ${g}, ${b})`;
  } catch {
    return null;
  }
}

/**
 * The colour of the strip the system draws above the page (a phone's status bar in the installed app, the browser's own bar in a tab):
 * the top bar's, so the two read as one. While a dialog has the page dimmed, the strip would stay bright above it, so it takes the dimmed
 * colour of the top bar then. (theme-init.js has set the right one before the first paint.) Whether the strip follows a change after the
 * page has loaded is the system's to decide, and not verified here for a browser tab or an installed iPhone app.
 */
export function useChromeColor(dim: boolean) {
  const resolved = useResolvedTheme();
  useEffect(() => {
    const surface = getComputedStyle(document.documentElement).getPropertyValue("--surface").trim();
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute("content", (dim && dimmed(surface)) || surface);
  }, [resolved, dim]);
}

/**
 * Puts the theme on the root. A change of theme lands everywhere in the same frame: until the next frame has been drawn the root says
 * so, and a pressable control, whose colours otherwise ease (press-style.ts), takes its new ones at once instead of lagging behind the
 * page. Returns what clears that early, or nothing when the theme was already there (theme-init.js set it before the first paint).
 */
export function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  if (root.dataset.theme === theme) return;
  root.dataset.themeSwitch = "";
  root.dataset.theme = theme;
  let frame = requestAnimationFrame(() => {
    frame = requestAnimationFrame(() => delete root.dataset.themeSwitch);
  });
  return () => {
    cancelAnimationFrame(frame);
    delete root.dataset.themeSwitch;
  };
}

/**
 * Mirror the theme to the document, keep every tab in sync through storage events, ask to keep storage, count the visit (counts.ts),
 * and keep the screen on if asked.
 */
export function useGlobalEffects() {
  const resolved = useResolvedTheme();

  // A layout effect: every layout effect runs before any passive one, and useChromeColor (a passive effect in Layout, a child of the
  // component that calls this) reads the colours of the theme this sets.
  useLayoutEffect(() => applyTheme(resolved), [resolved]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_KEY || event.key === null) useTheme.getState().sync(event.newValue);
      if (event.key === AWAKE_KEY || event.key === null) useAwake.getState().sync(event.newValue);
      if (event.key === COUNTS_KEY || event.key === null) useCounts.getState().sync(event.newValue);
      if (event.key === BUILD_KEY || event.key === null) useBuild.getState().sync(event.newValue);
      if (event.key === BUILD_ASKED_KEY) useBuild.getState().syncAsked();
      if (event.key === STORAGE_KEY) reloadFromAnotherTab();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    void checkPersistence();
    return askAfterFirstTick();
  }, []);

  useEffect(() => startCounting(), []);

  useKeepAwake();
}

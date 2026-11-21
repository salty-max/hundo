// The theme button in the top bar. The page follows the device (home.css's prefers-color-scheme) until the reader picks the scheme the
// device isn't using: only then is a choice kept, in this browser under THEME_KEY, and theme-init.js puts it back before the next first
// paint. Picking the device's own scheme forgets it, and the page follows the device again. It's the one thing hundo.quest keeps.

/** The one key hundo.quest keeps in the browser. public/theme-init.js reads it too. */
export const THEME_KEY = "hundo.theme";

export type Theme = "light" | "dark";

const darkDevice = () => matchMedia("(prefers-color-scheme: dark)");
const deviceTheme = (): Theme => (darkDevice().matches ? "dark" : "light");
const isTheme = (value: unknown): value is Theme => value === "light" || value === "dark";

/** The theme the page shows now: the reader's choice, or the device's. */
export const shownTheme = (): Theme => {
  const chosen = document.documentElement.dataset.theme;
  return isTheme(chosen) ? chosen : deviceTheme();
};

/** Shows a choice, or the device's scheme for null: the root's data-theme, and the browser bar's colour in both theme-color tags. */
export function showTheme(choice: Theme | null) {
  const root = document.documentElement;
  if (choice) root.dataset.theme = choice;
  else delete root.dataset.theme;
  const tags = [...document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')];
  for (const tag of tags) tag.dataset.colour ??= tag.content;
  const colour = choice ? tags.find((tag) => tag.getAttribute("media")?.includes(choice))?.dataset.colour : undefined;
  for (const tag of tags) tag.content = colour ?? tag.dataset.colour!;
}

/** Keeps a choice, or forgets it for null. Where storage is off (a private window, a setting) the choice lasts as long as the page. */
function keep(choice: Theme | null) {
  try {
    if (choice) localStorage.setItem(THEME_KEY, choice);
    else localStorage.removeItem(THEME_KEY);
  } catch {
    /* nothing kept: the page still shows the choice */
  }
}

/** Wires the theme button, if the page has one: marks it ready, which shows it (without this script it would do nothing), and flips the theme on a click. */
export function wireTheme(root: ParentNode = document) {
  const button = root.querySelector<HTMLButtonElement>("[data-theme-toggle]");
  if (!button) return;
  const pressed = () => button.setAttribute("aria-pressed", String(shownTheme() === "dark"));
  button.dataset.ready = "";
  pressed();
  button.addEventListener("click", () => {
    const next: Theme = shownTheme() === "dark" ? "light" : "dark";
    const choice = next === deviceTheme() ? null : next;
    showTheme(choice);
    keep(choice);
    pressed();
  });
  // The device turning dark at sunset, while the page follows it.
  darkDevice().addEventListener("change", pressed);
  // A choice made or forgotten in another tab (null: its storage cleared).
  addEventListener("storage", (event) => {
    if (event.key !== THEME_KEY && event.key !== null) return;
    showTheme(isTheme(event.newValue) ? event.newValue : null);
    pressed();
  });
}

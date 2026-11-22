import { Link } from "react-router";
import { Icon } from "./Icon";
import { lineChip } from "./line-chip-style";
import { pressClasses, pressTextClasses } from "./press-style";
import { changeLater } from "../actions";
import { byId } from "../guide";
import { anchorFor, backPlace, comesBack, givesName, shownNeeds, waitingOn } from "../flow";
import { isOpen, useProgress } from "../store/progress";
import type { Row } from "../types";

/*
 * Setting a row aside for later, and the row's requirements. "Later" lives in the short lists (Next up, Don't miss, the handoff), where a
 * row gets in the way; the row itself only shows that it's set aside, with a tag that puts it back (the user's pick, 22 Nov 2026).
 */

// A short list's action beside Jump to: link-look words on a wide screen, a small outlined box with the icon alone on a phone, where the
// words would crowd the row. Raised over the row's stretched label, as Jump to is. Its name starts with its words, so a voice command finds it.
const actionClasses = `${pressTextClasses} relative z-1 inline-flex min-h-8 cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-13 font-extrabold whitespace-nowrap text-primary hover:underline phone:size-10 phone:justify-center phone:rounded-button phone:border phone:border-control-line phone:bg-surface [&_svg]:size-4`;

/**
 * Keeps the focus on the page when the control that had it leaves with its row (Later in Next up, Back on route in the handoff, a Set aside
 * tag in a list filtered to it): the nearest part of the page still there takes it, its focusable heading or itself.
 */
function keepFocus(control: HTMLElement) {
  const around: HTMLElement[] = [];
  for (let at = control.parentElement; at; at = at.parentElement) around.push(at);
  requestAnimationFrame(() => {
    if (control.isConnected) return;
    for (const at of around) {
      if (!at.isConnected) continue;
      const target = at.matches("[tabindex]") ? at : at.querySelector<HTMLElement>("h1[tabindex], h2[tabindex]");
      if (target) return target.focus({ preventScroll: true });
    }
  });
}

/** Sets a row aside, with an Undo toast that says when it comes back, where the guide can say. */
function setAside(row: Row, control: HTMLElement) {
  keepFocus(control);
  const data = useProgress.getState().data;
  const open = (chapter: number) => isOpen(data, chapter);
  const place = backPlace(row, { [row.id]: anchorFor(row.id, data.checks, open) }, open);
  changeLater([row.id], true, `Set aside “${row.title}”.${place ? ` Back next time you’re in ${place}.` : ""}`);
}

/** Sets a row aside, in a list it then leaves. */
export function LaterButton({ row }: { row: Row }) {
  return <ActionButton row={row} aside={false} />;
}

/** Puts a set-aside row back on the route, in a list it then leaves. */
export function BackButton({ row }: { row: Row }) {
  return <ActionButton row={row} aside />;
}

// One button for both, so where the row stays (a missable set aside in Don't miss) it changes in place and keeps the focus.
function ActionButton({ row, aside }: { row: Row; aside: boolean }) {
  return (
    <button
      type="button"
      className={actionClasses}
      aria-label={`${aside ? "Back on route" : "Later"}: ${row.title}`}
      onClick={(event) => (aside ? putBack(row, event.currentTarget) : setAside(row, event.currentTarget))}
    >
      <Icon name={aside ? "undo" : "clock"} />
      <span className="phone:sr-only">{aside ? "Back on route" : "Later"}</span>
    </button>
  );
}

const putBack = (row: Row, control: HTMLElement) => {
  keepFocus(control);
  changeLater([row.id], false, `“${row.title}” is back on the route.`);
};

/** A short list's action for a row: Later, or Back on route for one already set aside, the same button either way. */
export function LaterAction({ row }: { row: Row }) {
  const aside = useProgress((s) => s.data.later?.[row.id] !== undefined);
  return <ActionButton row={row} aside={aside} />;
}

// The tag a set-aside row carries, which is also its way back: a tag's look, a button's behaviour.
const asideTagClasses = `${pressClasses} relative z-1 inline-flex cursor-pointer items-center gap-1 rounded-tag border-0 bg-soft px-2 py-1 align-[0.125rem] text-11 font-extrabold tracking-[0.02em] whitespace-nowrap text-soft-ink [&_svg]:size-3`;

/**
 * On a row set aside: a Set aside tag that puts it back on the route, and when it comes back. Nothing on any other row. In prose it sits
 * after the step's words; in a compact list and a checklist row, on a line of its own under them.
 */
export function AsideMark({ row, at }: { row: Row; at: "prose" | "list" | "column" }) {
  // One string or null per row, so a tick elsewhere redraws nothing here.
  const back = useProgress((s) =>
    s.data.checks[row.id] === true || s.data.later?.[row.id] === undefined ? null : comesBack(row, s.data.later, (n) => isOpen(s.data, n)),
  );
  if (back === null) return null;
  const words = (
    <>
      <button type="button" className={asideTagClasses} aria-label={`Set aside. Put “${row.title}” back on the route`} onClick={(event) => putBack(row, event.currentTarget)}>
        Set aside
        <Icon name="x" />
      </button>{" "}
      <span className="text-13 text-muted">{back}.</span>
    </>
  );
  if (at === "prose") return <> {words}</>;
  return <span className={at === "list" ? "basis-full ps-check-indent" : "mt-1.5 block"}>{words}</span>;
}

/**
 * What an unticked row still needs, while it waits: "Needs Monarch Wings", linked to the row that gives it, any of several with "or", or
 * "something from a later chapter" when that row's chapter is hidden. Nothing once it's met, or on a row with no requirements.
 */
export function NeedsLine({ row, at }: { row: Row; at: "prose" | "list" | "column" }) {
  const need = useProgress((s) => (row.requires.length && s.data.checks[row.id] !== true ? waitingOn(row, s.data.checks) : undefined));
  const shown = useProgress((s) => (need ? shownNeeds(need, (n) => isOpen(s.data, n)).join(" ") : ""));
  if (!need) return null;
  const ids = shown ? shown.split(" ") : [];
  const line = (
    <span className="text-13 font-semibold text-muted [&_svg]:me-1 [&_svg]:inline [&_svg]:size-3.75 [&_svg]:align-[-0.1875rem]">
      <Icon name="lock" />
      Needs{" "}
      {ids.length
        ? ids.map((id, index) => (
            <span key={id}>
              {index > 0 && " or "}
              <Link className={lineChip({ at: "prose" })} to={`/guide/${byId.get(id)!.chapter}/${id}`}>
                {givesName(id)}
              </Link>
            </span>
          ))
        : "something from a later chapter"}
    </span>
  );
  if (at === "prose") return <> {line}</>;
  return <span className={at === "list" ? "basis-full ps-check-indent" : "mt-1.5 block"}>{line}</span>;
}


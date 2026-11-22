import { Collapsible } from "@base-ui/react/collapsible";
import { cva } from "class-variance-authority";
import { memo, useState } from "react";
import { Link } from "react-router";
import { Icon } from "./Icon";
import { BuildLines } from "./BuildMark";
import { BulkCheck } from "./BulkCheck";
import { CheckBox } from "./CheckBox";
import { ChoiceBlock, ChoiceChip } from "./ChoiceBlock";
import { LineChips } from "./LineChip";
import { MapLink } from "./MapLink";
import { rowLinkClasses } from "./TickItem";
import { Quantity, Tag } from "./ui";
import { cats, choiceAt, choiceOf, config, primaryTag } from "../guide";
import { useProgress } from "../store/progress";
import { useUi } from "../store/ui";
import type { IconName } from "./Icon";
import type { MapLink as Map, Row } from "../types";
import { pressClasses, pressRowClasses } from "./press-style";

interface RowProps {
  row: Row;
  prefix: string;
  highlighted: boolean;
  /** On the checklist page: link back to the row in its chapter. */
  origin?: boolean;
  fallbackFocusId: string;
  /** In a choice's block, which says it's one-way, so the row doesn't. */
  inChoice?: boolean;
}

// A step: its box, its title over its text, and its tags and link at the end. Ticked, it takes the done tint; linked to (a deep link or the
// checklist's highlight), the highlight.
const routeRow = cva(
  "relative grid scroll-mt-4 grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 border-t border-line-soft p-3.5 first:border-t-0 target:bg-highlight phone:gap-2.5 phone:px-2.5 phone:py-3",
  { variants: { tone: { plain: "", done: "bg-done", highlight: "bg-highlight" } } },
);

// Memoised: the checklist re-renders the whole list on every tick, and only the ticked row has anything new to draw (it reads its own
// check from the store).
export const RouteRow = memo(function RouteRow({ row, prefix, highlighted, origin = false, fallbackFocusId, inChoice = false }: RowProps) {
  const checked = useProgress((s) => s.data.checks[row.id] === true);
  const boxId = `${prefix}-${row.id}`;
  const labelId = `${boxId}-label`;
  const tag = primaryTag(row);
  const badges = row.tags.filter((entry) => entry !== tag && config.badges?.includes(entry));
  // A later playthrough's way at a one-way choice links back to it.
  const otherSide = choiceAt(row.id);

  return (
    // On the checklist the row isn't what a link points at, and its chapter's page, which is, may be kept beside it (Pages).
    <div className={routeRow({ tone: highlighted ? "highlight" : checked ? "done" : "plain" })} id={origin ? undefined : `entry-${row.id}`}>
      <CheckBox id={boxId} labelId={labelId} row={row} fallbackFocusId={fallbackFocusId} />
      <div>
        {/* The label stretches over the whole row, so the row is the tap target; the box and the link sit above it. */}
        <label
          id={labelId}
          htmlFor={boxId}
          className={`${pressRowClasses} inline-block cursor-pointer text-15 leading-[1.3] font-extrabold after:absolute after:inset-0 after:cursor-pointer`}
        >
          {row.title}
        </label>
        {row.text && <p className="mt-1 text-15/[1.6] text-muted">{row.text}</p>}
        <BuildLines row={row} at="column" />
      </div>
      {/* On a phone a long tag wraps under the next instead of pushing the row wider. */}
      <div className="flex flex-col items-end gap-1 leading-[1.1]">
        <Tag tag={tag} at="column" />
        {badges.map((entry) => (
          <Tag key={entry} tag={entry} at="column" />
        ))}
        {row.quantity > 0 && <Quantity row={row} at="column" />}
        {row.tags.includes("missable") && <Tag tag="missable" at="column" />}
        {!inChoice && row.tags.includes("one-way") && <Tag tag="one-way" at="column" />}
        {origin ? (
          <Link className={rowLinkClasses} to={`/guide/${row.chapter}/${row.id}`} aria-label={`Open “${row.title}” in chapter ${row.chapter}`}>
            Chapter {row.chapter}
          </Link>
        ) : (
          <>
            {row.map && <MapLink map={row.map} of={row.title} at="row" />}
            <LineChips row={row} at="column" />
            {otherSide && <ChoiceChip choice={otherSide} at="column" />}
          </>
        )}
      </div>
    </div>
  );
});

interface GroupProps {
  groupKey: string;
  title: string;
  location?: string;
  icon?: IconName;
  note?: string;
  map?: Map;
  rows: Row[];
  open: boolean;
  highlightedId: string;
  origin?: boolean;
  fallbackFocusId: string;
  /** Persist manual open/close only when the list is unfiltered. */
  rememberToggle: boolean;
}

// The group's header is its heading, and the button inside it opens and closes the steps (a button can't hold a heading).
const triggerClasses = `${pressClasses} group/trigger grid min-h-14.5 w-full cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-3 border-0 bg-transparent px-3.5 py-3 text-left font-sans text-16 leading-[1.58] font-normal text-inherit hover:bg-raised phone:gap-2 phone:p-2.5`;

export function RouteGroup({ groupKey, title, location, icon, note, map, rows, open, highlightedId, origin, fallbackFocusId, rememberToggle }: GroupProps) {
  const setGroupOpen = useUi((s) => s.setGroupOpen);
  const checks = useProgress((s) => s.data.checks);
  // `open` is what the list wants; a reader can still open or close the group by hand, and that holds until the list wants something
  // else (a filter, Expand all), the way <details> behaved. Only an unfiltered list remembers the reader's choice.
  const [override, setOverride] = useState<{ base: boolean; value: boolean } | null>(null);
  if (override && override.base !== open) setOverride(null);
  const isOpen = override?.base === open ? override.value : open;
  const graphic = icon ?? cats[primaryTag(rows[0])][2];
  const kinds = [...new Set(rows.map((row) => cats[primaryTag(row)][0]))].slice(0, 3).join(" · ");
  const done = rows.filter((row) => checks[row.id] === true).length;
  const tools = rows.length > 1;

  return (
    <Collapsible.Root
      className="overflow-clip rounded-card border border-line bg-surface"
      id={origin ? undefined : groupKey}
      open={isOpen}
      onOpenChange={(next) => {
        setOverride({ base: open, value: next });
        if (rememberToggle) setGroupOpen(groupKey, next);
      }}
    >
      <h3 className="m-0">
        <Collapsible.Trigger className={triggerClasses}>
          <span className="grid size-8.5 place-items-center rounded-small bg-soft text-soft-ink phone:size-7 [&_svg]:size-4.25">
            <Icon name={graphic} />
          </span>
          <span className="grid">
            <span className="text-15 leading-[1.2] font-extrabold">{title}</span>
            <small className="text-12 text-muted">{location ?? kinds}</small>
          </span>
          <span className="text-12 whitespace-nowrap text-muted tabular-nums">
            {done} / {rows.length}
          </span>
          <Icon name="down" className="size-4 text-muted group-data-panel-open/trigger:rotate-180" />
        </Collapsible.Trigger>
      </h3>
      {/* Closed, the steps stay in the page, hidden until found: the browser's find-in-page reaches them and opens the group. */}
      <Collapsible.Panel hiddenUntilFound>
        {(note || map || tools) && (
          <div className="border-t border-line bg-paper px-3.5 py-2.5 text-13 text-muted">
            {note && <p>{note}</p>}
            {(map || tools) && (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 [p+&]:mt-2">
                {map && <MapLink map={map} of={title} at="group" />}
                {tools && <BulkCheck rows={rows} label={title} />}
              </div>
            )}
          </div>
        )}
        <div className="border-t border-line">
          {rows.map((row) => {
            const choice = choiceOf(row.id);
            const drawn = <RouteRow key={row.id} row={row} prefix={groupKey} highlighted={highlightedId === row.id} origin={origin} fallbackFocusId={fallbackFocusId} inChoice={choice !== undefined} />;
            return choice ? (
              <ChoiceBlock key={row.id} choice={choice} idPrefix={`${groupKey}-${row.id}-choice`} at="route">
                {/* First in its wrapper, so it draws no rule of its own under the caption. */}
                <div>{drawn}</div>
              </ChoiceBlock>
            ) : (
              drawn
            );
          })}
        </div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}

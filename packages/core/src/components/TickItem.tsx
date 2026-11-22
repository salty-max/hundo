import type { ReactNode } from "react";
import { Link } from "react-router";
import { CheckBox } from "./CheckBox";
import { Tag } from "./ui";
import type { Row, Tone } from "../types";
import { pressRowClasses, pressTextClasses } from "./press-style";

// A row's small link, raised above the label that stretches over the row.
const linkTextClasses = `${pressTextClasses} relative z-1 text-13 whitespace-nowrap text-primary underline underline-offset-3`;

/**
 * A row's small link that is alone in its cell ("Jump to" here, "Chapter 3" on the checklist, "Ch 05" on the questlines page): its tap area
 * reaches 8px above and below its words and 2px to each side without taking any room (negative margins cancel the padding), which is safe
 * only because nothing else a finger could mean sits within 8px of it. A link that can wrap under, or stack with, another target takes
 * `stackedLinkClasses`.
 */
export const rowLinkClasses = `${linkTextClasses} -mx-0.5 -my-2 px-0.5 py-2`;

/**
 * A row's small link that can wrap onto a line of its own under a box, or sit above or below another link (the map link): its tap area is its
 * own box, 24px tall at least, in the row's flow. A reach would run into the target next to it (axe's `target-size`, WCAG 2.2: 24px or
 * room around it). The chips are the same, `lineChip`.
 */
export const stackedLinkClasses = `${linkTextClasses} min-h-6`;

interface TickItemProps {
  row: Row;
  /** Makes the box's id unique on the page: one row can sit in two short lists at once. */
  prefix: string;
  ticked: boolean;
  /** The quieter second line. */
  detail: string;
  /** A tag before it: a category or core tag ("One-way" for the guide's way at a choice), or words in a tone ("Back in Blighttown"). */
  tag?: string | { text: string; tone: Tone | "none" };
  /** An action beside Jump to (Later, Back on route). */
  action?: ReactNode;
  /** The Jump to link's accessible name. */
  jumpLabel: string;
  onToggle: () => void;
}

/** One step in a short list (Next up, Don't miss): its box, its title over a quieter line, and a link to the step in its chapter. */
export function TickItem({ row, prefix, ticked, detail, tag, action, jumpLabel, onToggle }: TickItemProps) {
  const id = `${prefix}-${row.id}`;
  return (
    <li className="relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-t border-line-soft py-2.5 first:border-t-0 phone:gap-2.5">
      <CheckBox id={id} labelId={`${id}-label`} row={row} onToggle={onToggle} />
      {/* The label stretches over the whole item, so the item is the tap target; the link sits above it. */}
      <label id={`${id}-label`} className={`${pressRowClasses} grid cursor-pointer gap-0.5 leading-[1.3] after:absolute after:inset-0`} htmlFor={id}>
        <strong className={ticked ? "text-15 text-muted line-through decoration-1" : "text-15"}>{row.title}</strong>
        {tag ? (
          // The tag beside its line, as a questline's step lays out a missable's: wrapped words stay clear of it. With too little room
          // beside a long tag ("Back in the City of Tears"), the words go under it instead of into a narrow column.
          <small className="flex flex-wrap items-start gap-x-2 gap-y-1 text-12 text-muted">
            {typeof tag === "string" ? <Tag tag={tag} /> : <Tag tag="" tone={tag.tone}>{tag.text}</Tag>}
            <span className="min-w-0 grow basis-44 pt-0.5">{detail}</span>
          </small>
        ) : (
          <small className="text-12 text-muted">{detail}</small>
        )}
      </label>
      {action ? (
        <span className="relative z-1 flex items-center gap-4 phone:gap-3">
          {action}
          <JumpTo row={row} label={jumpLabel} />
        </span>
      ) : (
        <JumpTo row={row} label={jumpLabel} />
      )}
    </li>
  );
}

function JumpTo({ row, label }: { row: Row; label: string }) {
  return (
    <Link className={rowLinkClasses} to={`/guide/${row.chapter}/${row.id}`} aria-label={label}>
      Jump to
    </Link>
  );
}

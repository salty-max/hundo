import type { ReactNode } from "react";
import { Link } from "react-router";
import { Icon } from "./Icon";
import { BackButton, LaterAction, LaterButton } from "./Later";
import { TickItem } from "./TickItem";
import { Panel, PanelTitle } from "./ui";
import { buttonClass } from "./buttonStyle";
import { cats, choiceOf, missableWhy, primaryTag } from "../guide";
import { comesBack, handoff, needsWords } from "../flow";
import { useHeldRows } from "../useHeldRows";
import { isOpen, useProgress } from "../store/progress";
import type { Chapter, Row } from "../types";

/** How many of "Still open here" the card names; the rest are in the chapter's checklist. */
const OPEN_SHOWN = 3;

/**
 * "Before you leave chapter N", at the chapter's end above its navigation (the user's pick, 22 Nov 2026): whether it's safe to continue
 * (nothing of this chapter can be lost), kept apart from whether everything here is collected, then what can be lost, what's still open,
 * what's set aside for a return, what's waiting on a requirement, and what later chapters need from here. Built from the rows and the
 * reader's checks: nothing of its own is saved. Each list's boxes tick the row, as Next up's do.
 */
export function Handoff({ chapter }: { chapter: Chapter }) {
  const data = useProgress((s) => s.data);
  const open = (n: number) => isOpen(data, n);
  const view = handoff(chapter, data);
  const titleId = `handoff-${chapter.id}-title`;
  const kind = (row: Row) => `${cats[primaryTag(row)][1]} · ${row.group}`;

  return (
    <Panel aria-labelledby={titleId}>
      <PanelTitle id={titleId}>Before you leave chapter {chapter.id}</PanelTitle>
      <div className="flex flex-col gap-1.5 text-15">
        <p className="flex items-start gap-2">
          <Icon name={view.safe ? "check" : "flag"} className={`mt-0.5 size-5 ${view.safe ? "text-ok" : "text-warn"}`} />
          <strong className="font-extrabold">
            {view.safe ? "Safe to continue: nothing in this chapter can be lost." : `Before you go: ${view.lost.length === 1 ? "1 thing" : `${view.lost.length} things`} here can be lost.`}
          </strong>
        </p>
        <p className="flex items-start gap-2 text-14 text-muted">
          <Icon name="star" className="mt-0.5 size-5" />
          <span>{view.collected ? "Everything here is collected." : `Not everything is collected yet: ${view.left} left here.`}</span>
        </p>
      </div>
      <Part key="lost" id={`${chapter.id}-lost`} title="Can be lost" rows={view.lost} detail={(row) => missableWhy(row.id) ?? row.group} action={(row) => <LaterAction row={row} />} />
      <Part
        key="open"
        id={`${chapter.id}-open`}
        title="Still open here"
        rows={view.open.slice(0, OPEN_SHOWN)}
        detail={kind}
        action={(row) => <LaterButton row={row} />}
        after={
          view.open.length > OPEN_SHOWN && (
            <Link className={`${buttonClass("link", "default")} self-start`} to={`/checklist/all/${chapter.id}`}>
              The rest in the chapter checklist <Icon name="right" />
            </Link>
          )
        }
      />
      <Part key="aside" id={`${chapter.id}-aside`} title="Set aside for a return" rows={view.aside} detail={(row) => comesBack(row, data.later, open)} action={(row) => <BackButton row={row} />} />
      <Part key="waiting" id={`${chapter.id}-waiting`} title="Waiting" rows={view.waiting} detail={(row) => needsWords(row, data.checks, open)} />
      <Part key="needed" id={`${chapter.id}-needed`} title="Needed later" rows={view.needed} detail={() => "Steps in later chapters need it"} action={(row) => <LaterButton row={row} />} />
    </Panel>
  );
}

interface PartProps {
  id: string;
  title: string;
  rows: Row[];
  detail: (row: Row) => string;
  action?: (row: Row) => ReactNode;
  after?: ReactNode;
}

// One list of the card, under a caption. A ticked row stays put while the reader works down the list, as Don't miss's do.
function Part({ id, title, rows: fresh, detail, action, after }: PartProps) {
  const checks = useProgress((s) => s.data.checks);
  const { rows, hold } = useHeldRows(fresh, checks);
  if (!rows.length) return null;
  const captionId = `handoff-${id}`;
  return (
    <section className="flex flex-col gap-1" aria-labelledby={captionId}>
      <h3 id={captionId} className="text-11 font-extrabold tracking-[0.08em] text-soft-ink uppercase">
        {title}
      </h3>
      <ul className="m-0 list-none p-0">
        {rows.map((row) => (
          <TickItem
            key={row.id}
            row={row}
            prefix={`handoff-${id}`}
            ticked={checks[row.id] === true}
            detail={detail(row)}
            tag={choiceOf(row.id) ? "one-way" : undefined}
            action={checks[row.id] === true ? undefined : action?.(row)}
            jumpLabel={`Jump to “${row.title}”`}
            onToggle={hold}
          />
        ))}
      </ul>
      {after}
    </section>
  );
}

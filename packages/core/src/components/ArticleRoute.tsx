import { cva } from "class-variance-authority";
import type { ReactNode } from "react";
import { BuildLines } from "./BuildMark";
import { BulkCheck } from "./BulkCheck";
import { Contents } from "./Contents";
import { CheckBox } from "./CheckBox";
import { ChoiceBlock, ChoiceChip } from "./ChoiceBlock";
import { AsideMark, NeedsLine } from "./Later";
import { LineChips } from "./LineChip";
import { MapLink } from "./MapLink";
import { Quantity, Tag } from "./ui";
import { choiceAt, choiceOf } from "../guide";
import type { Chapter, Group, Row } from "../types";
import { pressTextClasses } from "./press-style";

/** The chapter as prose: one section per group, each step's opening sentence is its checkbox, with its sections listed beside it (Contents). */
export function ArticleRoute({ chapter, target, footer }: { chapter: Chapter; target?: string; footer: ReactNode }) {
  const current = chapter.groups.find((group) => group.key === target || group.rows.some((row) => `entry-${row.id}` === target))?.key;
  const links = chapter.groups.map((group) => ({ key: group.key, title: group.title, to: `/guide/${chapter.id}/${group.key}` }));

  return (
    <Contents label="In this chapter" links={links} current={current}>
      {/* A container too (`/article`), so a section's padding and title follow the column the article has, folded or not. */}
      <article className="@container/article flex min-w-0 flex-col gap-8" aria-label={`${chapter.title} walkthrough`}>
        <div className="flex flex-col gap-4">
          {chapter.groups.map((group) => (
            <Section key={group.key} group={group} target={target} />
          ))}
        </div>
        {footer}
      </article>
    </Contents>
  );
}

// A step's opening words, which hold its box: clicking them ticks it. In prose they run on into the step's text; in a compact list they
// sit on one line with the badges after them.
const check = cva(`${pressTextClasses} cursor-pointer font-extrabold hover:text-primary`, { variants: { in: { prose: "py-1.5", list: "flex items-center" } } });

// A step, as a paragraph of prose or a line of a compact list. Linked to (a deep link), it stands out on the page's own colour with a bar of
// the accent at its start.
const entry = cva("scroll-mt-4", {
  variants: {
    in: {
      prose: "leading-[1.8]",
      list: "flex flex-wrap items-center gap-x-2 gap-y-0.5 border-t border-line-soft py-2 first:border-t-0",
    },
    linked: { true: "rounded-[3px] [box-shadow:-3px_0_var(--accent)]", false: "" },
    // In a one-way choice's block, which is on the page's colour already, a linked step takes the card's.
    inChoice: { true: "", false: "" },
  },
  compoundVariants: [
    { linked: true, inChoice: false, class: "bg-paper" },
    { linked: true, inChoice: true, class: "bg-surface" },
  ],
});

// Its padding and title are in `cqi`, which is the nearest container's width, whatever its name: the article's, as long as no container
// is put between the two. One room parts the header from the first step and each step from the next.
function Section({ group, target }: { group: Group; target?: string }) {
  return (
    <section className="flex flex-col gap-3.5 rounded-card border border-line bg-surface p-[clamp(0.875rem,3.75cqi,1.5rem)]" aria-labelledby={group.key}>
      <header className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-1.5">
          <h2 id={group.key} tabIndex={-1} className="font-display text-[clamp(1.5625rem,5.4cqi,2.3125rem)] leading-[1.18] font-bold tracking-[-0.015em]">
            {group.title}
          </h2>
          {group.location && <p className="text-14 font-semibold text-muted">{group.location}</p>}
          {group.note && <p className="text-14 text-muted">{group.note}</p>}
          {group.map && (
            <p>
              <MapLink map={group.map} of={group.title} at="group" />
            </p>
          )}
        </div>
        <BulkCheck rows={group.rows} label={group.title} ownLine />
      </header>
      {group.compact ? (
        <ul className="m-0 list-none p-0">
          {group.rows.map((row) => {
            const choice = choiceOf(row.id);
            if (!choice) return <ListRow key={row.id} row={row} target={target} />;
            return (
              <li key={row.id} className="py-2">
                <ChoiceBlock choice={choice} idPrefix={`walkthrough-${row.id}-choice`} at="article">
                  <ul className="m-0 list-none px-4 phone:px-3">
                    <ListRow row={row} target={target} inChoice />
                  </ul>
                </ChoiceBlock>
              </li>
            );
          })}
        </ul>
      ) : (
        group.rows.map((row) => {
          const choice = choiceOf(row.id);
          if (!choice) return <ProseRow key={row.id} row={row} target={target} />;
          return (
            <ChoiceBlock key={row.id} choice={choice} idPrefix={`walkthrough-${row.id}-choice`} at="article">
              <div className="px-4 pt-1 pb-2 phone:px-3">
                <ProseRow row={row} target={target} inChoice />
              </div>
            </ChoiceBlock>
          );
        })
      )}
    </section>
  );
}

export function ListRow({ row, target, inChoice = false }: { row: Row; target?: string; inChoice?: boolean }) {
  return (
    <li id={`entry-${row.id}`} tabIndex={-1} className={entry({ in: "list", linked: target === `entry-${row.id}`, inChoice })}>
      <label id={`walkthrough-${row.id}-label`} className={check({ in: "list" })}>
        <CheckBox id={`walkthrough-${row.id}`} labelId={`walkthrough-${row.id}-label`} row={row} prose />
        {row.title}
      </label>
      <Badges row={row} inChoice={inChoice} />
      {row.map && <MapLink map={row.map} of={row.title} at="row" />}
      <LineChips row={row} at="list" />
      <LaterChip row={row} at="list" />
      {/* Under the step's words, not under its box. */}
      {row.text && <span className="basis-full ps-check-indent text-14/normal text-muted">{row.text}</span>}
      <NeedsLine row={row} at="list" />
      <AsideMark row={row} at="list" />
      <BuildLines row={row} at="list" />
    </li>
  );
}

export function ProseRow({ row, target, inChoice = false }: { row: Row; target?: string; inChoice?: boolean }) {
  return (
    <p id={`entry-${row.id}`} tabIndex={-1} className={entry({ in: "prose", linked: target === `entry-${row.id}`, inChoice })}>
      <label id={`walkthrough-${row.id}-label`} className={check({ in: "prose" })}>
        <CheckBox id={`walkthrough-${row.id}`} labelId={`walkthrough-${row.id}-label`} row={row} prose />
        {row.title}
        {/[.!?]$/.test(row.title) ? "" : "."}
      </label>{" "}
      <Badges row={row} inChoice={inChoice} />
      {row.text}
      {row.map && (
        <>
          {" "}
          <MapLink map={row.map} of={row.title} at="row" />
        </>
      )}
      <LineChips row={row} at="prose" />
      <LaterChip row={row} at="prose" />
      <NeedsLine row={row} at="prose" />
      <AsideMark row={row} at="prose" />
      <BuildLines row={row} at="prose" />
    </p>
  );
}

// Beside a later playthrough's way at a one-way choice: the choice it's the other side of.
function LaterChip({ row, at }: { row: Row; at: "prose" | "list" | "column" }) {
  const choice = choiceAt(row.id);
  return choice ? <ChoiceChip choice={choice} at={at} /> : null;
}

// In a choice's block the block says it's one-way, so the row doesn't.
function Badges({ row, inChoice = false }: { row: Row; inChoice?: boolean }) {
  return (
    <>
      {row.quantity > 0 && (
        <>
          <Quantity row={row} at="prose" />{" "}
        </>
      )}
      {row.tags.includes("missable") && (
        <>
          <Tag tag="missable" at="prose" />{" "}
        </>
      )}
      {!inChoice && row.tags.includes("one-way") && (
        <>
          <Tag tag="one-way" at="prose" />{" "}
        </>
      )}
    </>
  );
}

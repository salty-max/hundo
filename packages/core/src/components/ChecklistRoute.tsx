import { useState, type ReactNode } from "react";
import { RouteGroup } from "./RouteGroup";
import { Select } from "./Select";
import { Button, ChipGroup, Empty } from "./ui";
import { chapterRows, config, hasChoices, hasMissables, statusOptions } from "../guide";
import { inStatus } from "../flow";
import { useProgress } from "../store/progress";
import { useUi } from "../store/ui";
import { isFilter, isStatus, useKept } from "../store/place";
import type { Chapter } from "../types";

const routeChips: [string, string][] = [["all", "All steps"], ...(config.chips.route ?? []), ...(hasMissables ? [["missable", "Missable"] as [string, string]] : []), ...(hasChoices ? [["one-way", "One-way"] as [string, string]] : [])];

/** The chapter as collapsible route groups with category chips and a status filter. Re-mounted per target, so filters reset there. */
export function ChecklistRoute({ chapter, target, footer }: { chapter: Chapter; target?: string; footer: ReactNode }) {
  const checks = useProgress((s) => s.data.checks);
  const later = useProgress((s) => s.data.later);
  const openGroups = useUi((s) => s.openGroups);
  const setGroupsOpen = useUi((s) => s.setGroupsOpen);
  // Kept while the guide is open, for a reader coming back to the chapter; an address that points at an entry starts afresh, so it shows.
  const [filter, setFilter] = useKept("route-category", "all", isFilter, !target);
  const [status, setStatus] = useKept("route-status", "all", isStatus, !target);
  const [highlighted, setHighlighted] = useState(target?.startsWith("entry-") ? target.slice("entry-".length) : "");

  const rows = chapterRows(chapter);
  const done = rows.filter((row) => checks[row.id] === true).length;
  const groups = chapter.groups
    .map((group) => ({
      ...group,
      shown: group.rows.filter(
        (row) => (filter === "all" || row.tags.includes(filter)) && inStatus(status, row, { checks, later }),
      ),
    }))
    .filter((group) => group.shown.length);
  const labels = routeChips.filter(([key]) => key === "all" || rows.some((row) => row.tags.includes(key)));
  const filtered = filter !== "all" || status !== "all";
  const groupOpen = (key: string, index: number, shownIds: string[]) =>
    filtered || key === target || shownIds.includes(highlighted) || (openGroups[key] ?? index === 0);
  const allOpen = groups.every((group, index) => groupOpen(group.key, index, group.shown.map((row) => row.id)));

  return (
    <section id="route" aria-labelledby="route-title" className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-3 phone:flex-wrap phone:items-start phone:gap-1">
        <div>
          {/* (27px in a phone's column, 32px from a column of 416px: `cqi` is the page column's width) */}
          <h2 id="route-title" className="m-0 font-display text-[clamp(1.6875rem,7.7cqi,2rem)] leading-[1.17] font-bold tracking-[-0.015em]">
            Chapter route
          </h2>
          <p className="mt-1.5 text-14 text-muted">
            {done} of {rows.length} steps complete
          </p>
        </div>
        <Button look="link" icon="down" onClick={() => setGroupsOpen(groups.map((group) => group.key), !allOpen)}>
          {allOpen ? "Collapse all" : "Expand all"}
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ChipGroup
          label="Route categories"
          choices={labels}
          value={filter}
          onChange={(value) => {
            setFilter(value);
            setHighlighted("");
          }}
        />
        <Select
          id="route-status"
          label="Route completion status"
          choices={statusOptions}
          value={status}
          bare
          onChange={(value) => {
            setStatus(value);
            setHighlighted("");
          }}
        />
      </div>
      {groups.length ? (
        <div className="flex flex-col gap-3">
          {groups.map((group, index) => (
            <RouteGroup
              key={group.key}
              groupKey={group.key}
              title={group.title}
              location={group.location}
              icon={group.icon}
              note={group.note}
              map={group.map}
              rows={group.shown}
              open={groupOpen(group.key, index, group.shown.map((row) => row.id))}
              highlightedId={highlighted}
              fallbackFocusId="route-status"
              rememberToggle={!filtered}
            />
          ))}
        </div>
      ) : (
        <Empty>No steps match these filters.</Empty>
      )}
      {footer}
    </section>
  );
}

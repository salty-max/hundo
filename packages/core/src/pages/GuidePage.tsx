import { useEffect, useLayoutEffect } from "react";
import { Link, useLocation, useParams } from "react-router";
import { buttonClass } from "../components/buttonStyle";
import { Icon } from "../components/Icon";
import { ArticleRoute } from "../components/ArticleRoute";
import { BuildStrip } from "../components/BuildStrip";
import { ChapterHero } from "../components/ChapterHero";
import { ChapterNav } from "../components/ChapterNav";
import { ChecklistRoute } from "../components/ChecklistRoute";
import { Handoff } from "../components/Handoff";
import { MissablesStrip } from "../components/MissablesStrip";
import { NextUp } from "../components/NextUp";
import { SealedChapter } from "../components/SealedChapter";
import { LinkButton } from "../components/ui";
import { chapterRows, chapters, config, guideAnchor, hasBuilds, overall, readChapter } from "../guide";
import { useReveal } from "../useReveal";
import { isOpen, useProgress } from "../store/progress";
import type { Chapter } from "../types";
import { pressClasses } from "../components/press-style";

export function GuidePage() {
  const { chapter: param, entry } = useParams();
  const savedChapter = useProgress((s) => s.data.chapter);
  const ceiling = useProgress((s) => s.data.ceiling);
  const visitChapter = useProgress((s) => s.visitChapter);
  const reveal = useReveal();
  const chapterId = readChapter(param, savedChapter);
  const open = useProgress((s) => isOpen(s.data, chapterId));
  const target = guideAnchor(chapterId, entry);

  useEffect(() => {
    if (open) visitChapter(chapterId);
  }, [open, chapterId, visitChapter]);

  if (!open) return <SealedChapter chapter={chapterId} ceiling={ceiling} onReveal={() => reveal(chapterId, target ? entry : undefined)} />;

  // Re-mount per chapter so held lists and filters never leak into the next one.
  return <GuideView key={chapterId} chapter={chapters[chapterId - 1]} target={target} />;
}

// The chapter's top (the hero, Next up, the missables, the overall figure), then its route. An article opens with a padded card and a
// checklist route with a heading, so an article gets more room above it, and more again as the page column widens (`cqi` of `/page`).
const routeGap = config.layout === "article" ? "gap-[clamp(1.5rem,4cqi,2.5rem)]" : "gap-6";

function GuideView({ chapter, target }: { chapter: Chapter; target?: string }) {
  const { key: locationKey } = useLocation();
  const checks = useProgress((s) => s.data.checks);
  const path = `/guide/${chapter.id}`;
  const rows = chapterRows(chapter);
  const firstLeft = rows.find((row) => checks[row.id] !== true);
  const started = rows.some((row) => checks[row.id] === true);

  // Arrive at a linked section or entry, focused, every time the link is followed. A layout effect, so the page is there before it is
  // shown (Layout); it runs again as a kept page comes back (Pages), where Layout's own effect, after it, has the last word.
  useLayoutEffect(() => {
    if (!target) return;
    const element = document.getElementById(target);
    const focusable = element?.hasAttribute("tabindex") ? element : (element?.querySelector<HTMLElement>('[role="checkbox"], button') ?? element);
    focusable?.focus({ preventScroll: true });
    element?.scrollIntoView({ block: "start" });
  }, [target, locationKey]);

  // The chapter's end: what to settle before leaving it, then on to the next.
  const footer = (
    <>
      <Handoff chapter={chapter} />
      <ChapterNav chapter={chapter.id} in={config.layout === "article" ? "article" : "route"} />
    </>
  );

  return (
    <div className={`flex flex-col ${routeGap}`}>
      <div className="flex flex-col gap-4">
        <ChapterHero chapter={chapter} banner={config.banners[chapter.id]}>
          {config.layout === "article" ? (
            <LinkButton to={`${path}/${chapter.groups[0].key}`} look="accent" icon="down">
              Read walkthrough
            </LinkButton>
          ) : (
            <LinkButton to={`${path}/${firstLeft?.id ?? chapter.groups[0].key}`} look="accent" icon="play">
              {started ? "Resume route" : "Start walkthrough"}
            </LinkButton>
          )}
          <LinkButton to={`/checklist/all/${chapter.id}`} icon="checkList">
            Chapter checklist
          </LinkButton>
        </ChapterHero>
        {hasBuilds && <BuildStrip chapter={chapter} />}
        <NextUp chapter={chapter.id} />
        <MissablesStrip chapter={chapter} />
        <Link
          className={`${pressClasses} flex min-h-11 items-center justify-between gap-3 rounded-card border border-line bg-surface px-4 py-1.5 text-14 hover:border-control-line`}
          to="/dashboard"
        >
          <SummaryFigure />
          <span className={buttonClass("link", "default")}>
            Progress <Icon name="right" />
          </span>
        </Link>
      </div>
      {config.layout === "article" ? (
        <ArticleRoute chapter={chapter} target={target} footer={footer} />
      ) : (
        <ChecklistRoute key={target ?? ""} chapter={chapter} target={target} footer={footer} />
      )}
    </div>
  );
}

const figureClasses = "text-18 tabular-nums";

function SummaryFigure() {
  const checks = useProgress((s) => s.data.checks);
  const { percent, label } = overall(checks);
  // (kept out of search snippets, as the bar is: a first visit's figure is 0%)
  return (
    <span data-nosnippet="">
      <strong className={figureClasses}>{percent}%</strong> {label}
    </span>
  );
}

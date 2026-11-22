import type { ReactNode } from "react";
import { CHAPTER_COUNT } from "../guide";
import { two } from "../format";
import type { Banner, Chapter } from "../types";

/**
 * The top of a chapter: a tint from the guide's palette with the chapter's banner fading in on the right, its number, region, title and
 * intro, and `children`, the buttons under them. The hero follows its own width, not the screen's (it is its own container, `hero`):
 * narrower than 40rem the banner stacks above the words and fades into the card at its foot, as it fades at its left beside them, and
 * the title scales with the hero. On a phone the intro goes. The banner is 3:1, as its stacked frame is, so nothing is cut.
 */
// How wide the banner is drawn, for the browser's pick from its srcset (core's banners.ts). `sizes` can only read the screen, not the
// hero, so each range below is where the hero is known to be stacked, and asks its width; everywhere else the hero may be side by side.
// Stacked, the banner is the hero's width: on a phone the screen less its gutters (at least 12px a side), from 551 to 800px the screen less
// its 3.25vw gutters, and from 801px the same less the 224px rail. The hero stacks under 40rem (640px at the default 16px root), so those
// ranges end a little early; a larger root stacks it at more widths, where 1,320 over-asks. The figures below are at a 16px root: with
// larger text the words, and so the hero's height, grow. Side by side the
// banner fills the hero's height at 3:1, so it is drawn three times as wide as the hero is tall, which the words set: about 800 to 960px
// for a one-line title, about 1,270 for Lordran's three lines on a laptop. The one case past 1,320 is a three-line title in the narrowest
// side-by-side hero (Lordran's at about 645px: 1,395); asking more there would hand every 1x screen the original, twice the bytes of the
// 1,320 copy, for a banner 5% softer at 1x in that one case. At 2x every side-by-side ask gets the original anyway.
const BANNER_SIZES = "(max-width: 550px) calc(100vw - 24px), (max-width: 670px) 94vw, (max-width: 800px) 1320px, (max-width: 905px) calc(94vw - 224px), 1320px";

/** "Chapter 03 / 13": a chapter's place among them, as the top of a chapter (and of a hidden one, SealedChapter) shows it. */
export function ChapterNumber({ chapter }: { chapter: number }) {
  return (
    <span className="rounded-tag bg-ink px-2.5 py-1 text-11 font-extrabold tracking-[0.14em] text-paper uppercase">
      Chapter {two(chapter)} / {two(CHAPTER_COUNT)}
    </span>
  );
}

export function ChapterHero({ chapter, banner, children }: { chapter: Chapter; banner?: Banner; children: ReactNode }) {
  // The hero's own width is the container its parts read (`/hero`), the wrapper's: a container can't query itself, and the section changes.
  return (
    <div className="@container/hero">
      <section className="relative isolate flex min-h-61.25 items-center overflow-hidden rounded-hero border border-line bg-[linear-gradient(120deg,var(--hero-from),var(--hero-to))] px-[clamp(1.5rem,5cqi,3rem)] py-6 @max-[40rem]/hero:block @max-[40rem]/hero:min-h-0 @max-[40rem]/hero:p-0 phone:rounded-card">
        {banner && (
          <img
            className="absolute top-0 right-0 -z-1 h-full w-[68%] mask-[linear-gradient(to_right,transparent_9%,#000_66%)] object-cover object-[76%_center] @max-[40rem]/hero:static @max-[40rem]/hero:block @max-[40rem]/hero:aspect-3/1 @max-[40rem]/hero:h-auto @max-[40rem]/hero:w-full @max-[40rem]/hero:mask-[linear-gradient(to_top,transparent_4%,#000_62%)]"
            src={banner.src}
            srcSet={banner.srcSet}
            sizes={banner.srcSet ? BANNER_SIZES : undefined}
            alt=""
            width={1800}
            height={600}
            fetchPriority="high"
          />
        )}
        <div className="w-[59%] max-w-140 @max-[40rem]/hero:w-full @max-[40rem]/hero:max-w-none @max-[40rem]/hero:px-[clamp(1.25rem,5cqi,2.5rem)] @max-[40rem]/hero:py-5 phone:px-3.5 phone:py-4">
          <div className="mb-2 flex flex-wrap items-center gap-2.5 text-13 font-bold">
            <ChapterNumber chapter={chapter.id} />
            <span>{chapter.region}</span>
          </div>
          <h1 className="mb-2.5 font-display text-[clamp(2.125rem,6cqi,3.875rem)] leading-[1.02] font-bold tracking-[-0.02em] phone:mb-1.5">{chapter.title}</h1>
          <p className="max-w-112.5 text-15/[1.6] phone:hidden">{chapter.intro}</p>
          {/* On a phone the buttons keep narrower sides: Button reads the variable. */}
          <div className="mt-4 flex flex-wrap gap-2 phone:mt-2.5 phone:[--button-px:0.625rem]">{children}</div>
        </div>
      </section>
    </div>
  );
}

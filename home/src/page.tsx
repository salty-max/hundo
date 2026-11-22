// The landing page's markup, rendered to static HTML at build (render.tsx): no React reaches the browser. Each guide is drawn as its own
// chapter hero, in its own palette, display font and corners (the .g-<folder> classes guides.css sets), with its chapter 1 banner. The
// game is the band's title, the name a reader looks for; the guide's own name goes above it, beside its icon, unless it is the game's.
import { findTerms } from "./find";
import type { Guide } from "./guides";

/** Where the build put each guide's pictures. */
export type GuideArt = {
  /** The banner's copies, narrowest first. */
  banner: { url: string; width: number }[];
  /** Full-width and phone hero crops, each narrowest first. */
  backdrop: { wide: { url: string; width: number }[]; narrow: { url: string; avif: string; width: number }[] };
  /** The icon tile at 40, 80 and 120px. */
  tile: { url: string; width: number }[];
};

const srcSet = (copies: GuideArt["banner"]) => copies.map((copy) => `${copy.url} ${copy.width}w`).join(", ");
const avifSet = (copies: GuideArt["backdrop"]["narrow"]) => copies.map((copy) => `${copy.avif} ${copy.width}w`).join(", ");

// The banner is drawn at the band's height, three times as wide as that: about 280px tall beside the words (840px wide), about 150px in a
// phone's short band (450px).
const BANNER_SIZES = "(max-width: 36rem) 460px, 840px";
const TILE_SIZES = "(max-width: 36rem) 32px, 44px";
// object-fit: cover draws a 3:1 image wider than the viewport on phones: choose for the covered height, not just the visible width.
const BACKDROP_SIZES = "(max-width: 36rem) 1120px, (max-width: 60rem) 1440px, 100vw";
const MOBILE_BACKDROP_SIZES = "(max-width: 22rem) 620px, 548px";

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14m-5-5 5 5-5 5" />
  </svg>
);

const features = [
  {
    title: "Spoiler-aware",
    text: "Chapters past yours stay hidden until you choose to reveal them.",
    icon: <path d="M5 12a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7Zm3-2V7a4 4 0 1 1 8 0v3m-4 4v3" />,
  },
  {
    title: "Works offline",
    text: "Install a guide as an app on your phone or computer. It runs with no connection.",
    icon: <path d="M8.5 2.5h7A2.5 2.5 0 0 1 18 5v14a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 6 19V5a2.5 2.5 0 0 1 2.5-2.5Zm2 16h3M9 9.5l2 2 4-4" />,
  },
  {
    title: "Sync with a code",
    text: "Link your devices with a six-digit code and your ticks follow you.",
    icon: <path d="M20 12a8 8 0 0 1-14.3 4.9M4 12a8 8 0 0 1 14.3-4.9M18.5 3v4.2h-4.2M5.5 21v-4.2h4.2" />,
  },
  {
    title: "No account",
    text: "No email, no sign-up. Your ticks stay in your browser unless you link a device to sync them.",
    icon: <path d="M8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Zm-3.5 12.5c.8-3.6 3.9-5.5 7.5-5.5 1.3 0 2.6.3 3.7.8m.8 1.7 4 4m0-4-4 4" />,
  },
];

export const Logo = ({ href }: { href?: string }) => {
  const word = (
    <>
      hund<span className="o" />
    </>
  );
  return href ? (
    <a className="logo" href={href} aria-label="Hundo">
      {word}
    </a>
  ) : (
    <span className="logo" aria-hidden="true">
      {word}
    </span>
  );
};

/** The repository, which is public. */
export const GITHUB = "https://github.com/salty-max/hundo";

const ICON = { viewBox: "0 0 24 24", "aria-hidden": true } as const;

/** The logo, then the theme button and the repository on the right. */
const TopBar = () => (
  <header className="top wrap">
    <Logo href="/" />
    <div className="tools">
      {/* Shown by theme.ts, which marks it ready: without the script it would do nothing. In the page from the start and kept invisible
          (home.css), not hidden: left of GitHub's it still has a box, and the box's arrival moves the tools' left edge. */}
      <button type="button" className="icon-btn" data-theme-toggle aria-label="Dark theme" aria-pressed="false">
        <svg className="moon" {...ICON}>
          <path d="M20 14.6A8.4 8.4 0 0 1 9.4 4 8.4 8.4 0 1 0 20 14.6Z" />
        </svg>
        <svg className="sun" {...ICON}>
          <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0Zm4-9.5v2m0 15v2M5.3 5.3l1.4 1.4m10.6 10.6 1.4 1.4M2.5 12h2m15 0h2M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </svg>
      </button>
      <a className="icon-btn" href={GITHUB} target="_blank" rel="noopener" aria-label="Hundo on GitHub (opens in a new tab)">
        <svg className="mark" {...ICON}>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      </a>
    </div>
  </header>
);

const Footer = () => (
  <footer className="wrap">
    <div>
      <Logo />
      <span>© 2026 Hundo · Unofficial fan guides, not affiliated with the games’ publishers.</span>
    </div>
  </footer>
);

const Band = ({ guide, art, eager }: { guide: Guide; art: GuideArt; eager: boolean }) => {
  const largest = art.banner.at(-1)!;
  return (
    <li className={`cell g-${guide.folder}`} data-guide={findTerms(guide)} data-id={guide.id}>
      <div className="world">
        <img
          className="art"
          src={largest.url}
          srcSet={srcSet(art.banner)}
          sizes={BANNER_SIZES}
          width={largest.width}
          height={Math.round(largest.width / 3)}
          alt=""
          loading={eager ? undefined : "lazy"}
          decoding="async"
        />
        <div className="text">
          <div className="kick">
            <img className="tile" src={art.tile.at(-1)!.url} srcSet={srcSet(art.tile)} sizes={TILE_SIZES} width={120} height={120} alt="" loading={eager ? undefined : "lazy"} />
            {guide.mark !== guide.game && <span>{guide.mark}</span>}
          </div>
          <h3>
            <a href={guide.home}>{guide.game}</a>
          </h3>
          <div className="row">
            <span className="btn" aria-hidden="true">
              Open {guide.mark}
              <Arrow />
            </span>
            {/* Each number held to its word: a narrow phone's band may wrap the line, never between the two. */}
            <span className="meta">
              {guide.chapters}&nbsp;chapters · {guide.rows}&nbsp;checks
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

/** Discover only the first slide before render-blocking styles and the guide bands. */
export const BackdropPreloads = ({ art }: { art: GuideArt["backdrop"] }) => (
  <>
    <link rel="preload" as="image" type="image/avif" media="(max-width: 30rem)" imageSrcSet={avifSet(art.narrow)} imageSizes={MOBILE_BACKDROP_SIZES} fetchPriority="high" />
    <link rel="preload" as="image" media="(min-width: 30.001rem)" imageSrcSet={srcSet(art.wide)} imageSizes={BACKDROP_SIZES} fetchPriority="high" />
  </>
);

/**
 * Behind the headline, and up behind the top bar: one guide's chapter 1 banner at a time, muted and fading out at the foot, A to Z as the
 * bands are. The first responsive picture is in the markup; backdrop.ts loads the same responsive copies for each following slide.
 * Decoration, so hidden from assistive technology.
 */
const Backdrop = ({ guides, art }: { guides: Guide[]; art: Record<string, GuideArt> }) => {
  const first = art[guides[0].folder].backdrop;
  const largest = first.wide.at(-1)!;
  return (
    <div className="backdrop" aria-hidden="true" data-backdrop={JSON.stringify(guides.map((guide) => art[guide.folder].backdrop))}>
    <picture>
      <source type="image/avif" media="(max-width: 30rem)" srcSet={avifSet(first.narrow)} sizes={MOBILE_BACKDROP_SIZES} />
      <source media="(max-width: 30rem)" srcSet={srcSet(first.narrow)} sizes={MOBILE_BACKDROP_SIZES} />
      <img className="on" src={largest.url} srcSet={srcSet(first.wide)} sizes={BACKDROP_SIZES} width={largest.width} height={largest.width / 3} alt="" fetchPriority="high" decoding="async" />
    </picture>
    </div>
  );
};

/** The page: what hundo is, then every guide. */
export const Home = ({ guides, art }: { guides: Guide[]; art: Record<string, GuideArt> }) => (
  <>
    <TopBar />
    <main>
      <div className="sky">
        <Backdrop guides={guides} art={art} />
        <section className="hero wrap">
          <h1>Every last check, one chapter at a time.</h1>
          <p>Spoiler-aware walkthroughs and completion checklists for single-player games, one guide per game.</p>
        </section>
      </div>
      <section className="wrap" aria-label="What every guide does">
        <ul className="features">
          {features.map((feature) => (
            <li key={feature.title}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {feature.icon}
              </svg>
              <strong>{feature.title}</strong>
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="wrap guides" aria-labelledby="guides">
        <div className="bar">
          <h2 id="guides">
            {guides.length} {guides.length === 1 ? "guide" : "guides"}
          </h2>
          {/* Shown by find.ts, which marks it ready: without the script there is nothing to type into. In the page from the start and kept
              invisible (home.css), not hidden, so the bar has its height at the first paint and showing the field moves nothing. */}
          <div className="find" data-find>
            <label htmlFor="find">Find</label>
            <input id="find" type="search" placeholder="Game or guide" autoComplete="off" spellCheck={false} />
          </div>
        </div>
        <p className="status" role="status" data-find-status />
        <ul className="worlds">
          {guides.map((guide, index) => (
            <Band key={guide.folder} guide={guide} art={art[guide.folder]} eager={index < 2} />
          ))}
        </ul>
      </section>
    </main>
    <Footer />
  </>
);

/** The page Vercel answers an unknown path with (vercel.json). */
export const NotFound = () => (
  <>
    <TopBar />
    <main className="hero wrap lost">
      <h1>Nothing here.</h1>
      <p>Each guide lives at its own address. The list of them is on the front page.</p>
      <p>
        <a className="back" href="/">
          See every guide
        </a>
      </p>
    </main>
    <Footer />
  </>
);

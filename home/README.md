# hundo.quest

The landing page: what hundo is, over one guide's chapter 1 banner at a time, crossfading to the next, then every guide, each drawn as its own chapter hero (its palette in light and dark, its display font,
its corners, its icon tile and its chapter 1 banner), A to Z by game. Each band's title is its game, the guide's own name above it beside
the icon (left out where it is the game's, as with Echoes of Wisdom), then an Open button and the guide's chapters and checks. Every row
of bands is as tall as the tallest band, so they are all one height. The top bar holds the theme button and a link to the repository on
GitHub. Vercel project `hundo-home`, for `https://hundo.quest` ([docs/deploying.md](../docs/deploying.md#the-landing-page)).

## How it's made

Nothing about a guide is written here. At build, `src/guides.ts` takes every folder in `apps/` with a `src/guide/brand.ts` and loads its
`config.ts` through Vite's `runnerImport` (each chapter's `?banner` import comes back empty: only chapter 1's banner is read, from the
file). From each guide it takes:

- its brand: name, game, publisher (which Find matches, though the page doesn't show it), address, corners and display font;
- its palette, from `theme.css` (core's `palette.ts`);
- its chapters and rows, from the config.

`src/plugin.ts` then:

- makes three copies of each chapter 1 banner for its band (480, 960 and up to 1,800px wide), and separate 960, 1,920, 2,880 and 3,840px copies for the hero’s backdrop, all cut directly from the original to 3:1 with Lanczos resampling, plus smaller 3:2 crops for phones;
- copies the icon tiles and makes a WOFF2 subset of each display font for the guide titles sharing its family, preserving shaping features and licence metadata; fonts declaring reserved names in their licence header stay byte-for-byte unchanged, and each font’s licence is copied into `fonts/`;
- writes one stylesheet of the guides' palettes, fonts and corners (each dark palette written twice, as home.css writes its own: below),
  and the tab's icon (the logo's ring, one arc per guide);
- makes the link preview's picture (`src/og.ts`), a 1200×630 JPEG named by its content: six chapter 1 banners, two across and three
  down, under the logo on a light card, its ring one arc per guide. Past six guides the wall shows six spread evenly across A to Z (the
  middle of each sixth of the list, `wallGuides`), and the ring gains an arc with each guide, so a new guide changes the picture. The word "hund" is drawn from outlines kept in `og.ts`, since sharp can't set text in the page's woff2;
  the comment above them says how to make them again. Its tags go in `index.html`'s head alone, at `<!--home:og-->`;
- renders `src/page.tsx` to static HTML in `index.html` and `404.html`.

React runs only at build. The browser gets the HTML, two stylesheets, `public/theme-init.js` and `src/main.ts`, a couple of kB, which
shows the theme button (`src/theme.ts`) and the Find field, narrows the guides as a reader types (`src/find.ts`), draws a returning
reader's progress (`src/progress.ts`) and runs the hero's backdrop (`src/backdrop.ts`). Without it the button and the field stay hidden,
every guide shows as it does for a first visit, and the backdrop keeps its first banner.

The hero's backdrop shows one guide's chapter 1 banner at a time, in the bands' order, A to Z: muted, from the top of the page, behind
the top bar, to the hero's foot, where it has faded out, with a glow of the paper behind the words. Every 7 seconds the next guide's
banner comes in over 1.5 seconds (`HOLD` in `src/backdrop.ts`, the fade in `home.css`), on top of the one before, which stays whole
beneath until it is covered, so the fade never dips to the paper. The markup holds the first banner and lists every guide's in
`data-backdrop`; the script fetches each next one 2 seconds before it's due (`AHEAD`), brings it in once it's decoded, and skips one that
won't load. It runs only while the backdrop can be seen: not while the tab is hidden or the hero is scrolled away, coming back to a full
hold, and never for a reader who asks for reduced motion, who keeps the first banner and fetches no other. A reader who asks for more
contrast (`prefers-contrast: more`) gets the bare page, and nothing past the first banner is fetched. Nothing is kept. The link preview
keeps its still wall of six.

The hero uses responsive WebP copies (`BACKDROP_WIDTHS` in `src/plugin.ts`) from 960×320 up to 3840×1280, including upscaled copies made directly from the guide’s original artwork. This avoids stretching a 288px thumbnail across a desktop. Upscaling preserves the existing composition; it does not invent detail absent from the original. `srcset` and `sizes` select the appropriate copy, with a minimum covered image width on phones: a 3:1 picture covering a tall hero is wider than the viewport. Following slides receive the same responsive sources before decoding and crossfading.

For phones up to 480px wide, a picture source supplies a 3:2 crop at the same 72% focal point, at widths 720/960/1200/1800. It omits the sides hidden by the narrow viewport, preserving visible detail while reducing transfer size. Mobile crops prefer AVIF with a WebP fallback; the media-matched AVIF preload is ignored by browsers which need the fallback. The first image has high fetch priority and media-matched responsive preloads, so only the applicable crop loads. Later images keep low priority and load only shortly before their turn. The backdrop may now be the largest contentful paint; image quality is no longer reduced to keep it out of that metric. The headline’s masks, glow and theme contrast treatments are unchanged. Recheck performance on the production build when changing image sizes or compression.

The landing build subsets decorative fonts to the guide titles, without changing the guides’ own font files. Playfair Display declares a reserved name and is served unchanged. A browser comparison of all six titles against the original fonts checks both their width and rendered pixels. This reduces decorative font transfer from about 194KiB to 55KiB. The existing Lighthouse budgets remain unchanged; run `pnpm lighthouse home` to check the current build rather than relying on measurements from the old full-font build.

Light and dark follow the device, in CSS alone, until the reader presses the theme button for the scheme the device isn't using. Only then
is a choice kept, in localStorage under `hundo.theme` (`THEME_KEY`), and the root gets `data-theme`; pressing it back to the device's scheme
deletes the key and the attribute, and the page follows the device again, a change at sunset included. So every dark rule is written twice,
in `home.css` and in the guides' stylesheet (`render.tsx`'s `inDark`): for `:root[data-theme="dark"]`, and in a `prefers-color-scheme: dark`
query for `:root:not([data-theme="light"])`. `public/theme-init.js`, an external script in both pages' heads ahead of the stylesheets (the
CSP runs no inline script), puts a kept choice back before the first paint, with its colour in both `theme-color` tags. Every read and write
of the key is in a `try`: where storage is off the button still flips the page, and nothing is kept. A choice made in another tab follows.
The guides' theme keys are theirs, on their own addresses.

The page keeps that one key in the browser and nothing else: progress lives on each guide's own address. It reads one cookie per guide, `hundo_p_<brand.id>`, which
the sync API sets on every hundo.quest host when the guide asks it to (core's `summary.ts`, [docs/core.md](../docs/core.md#hundoquests-summary)):
the guide's figure, as its Progress page shows it, and the chapter the reader was last in. A band whose guide has one says "57% complete ·
Chapter 6" in place of its chapters and checks, beside a Continue button, with a bar in the guide's colour laid along its foot, so no band
changes height. A phone's short band has no button, and holds either line in a box two lines high that it may wrap in, so it stays off the
art at any width. Each band carries its guide's `brand.id` as `data-id` for it. Only the chapter's number shows,
never its title.

A browser linked by sync (a well-formed `hundo_link` cookie) also asks its group: one `POST /api/summaries` through the page's own `/api`,
which `vercel.json` sends to the sync API as the guides do, and which is the one route the API takes from `https://hundo.quest`
([its README](../services/sync/README.md#a-guides-summary)). The answer is the latest summary any device of the group sent for each guide,
an installed iPhone app's included, whose cookies never reach this browser, or `null` for a guide reset there. The cookies are drawn
first, at once. For each guide the answer names, the band then shows the higher figure of the group's and this browser's cookie, the
group's on a tie (`combine`), and `null` puts the band back as a first visit sees it (each band's first look is kept for that); a guide
it doesn't name keeps its cookie, and a band whose figure doesn't change isn't drawn again. Not "the newest wins", since the cookie
carries no time; and not the group's alone, since a guide's progress joins the group only when a device opens it after linking, so this
browser's own cookie can be ahead of the group's copy until it opens that guide. A reset on another device, `null`, wins over any cookie, so a reset
shows as one; the API keeps it only in place of a summary the group held, so a device that never had progress in a guide can't blank it
here. Until this browser opens the guide, two cases show the wrong figure: after an untick elsewhere, too high (this browser's older
cookie); and after a reset elsewhere of a guide this browser had progress in but hadn't opened since linking, not started (its progress
joins the group, and mostly comes back, when it opens the guide). Both are rarer than progress made before linking, which the higher
figure gets right. A third lasts until a linked device next opens the guide: a summary whose cookie landed while the group's write
failed (the store down) leaves the group's other browsers on the group's older figure. A browser that isn't linked makes no request, and any failure (offline,
a 401, the store down) leaves the cookies' bands as they are.

A new guide shows up by itself. Its build stops, naming what's missing, if the guide has no `src/guide/banners/chapter-1.webp`, no
`public/icons/tile-{40,80,120}.png`, or no licence beside its display font (`<Family-Name>-OFL.txt`).

## Scripts

From this folder: `pnpm dev`, `pnpm build`, `pnpm preview`, `pnpm test`. In the browser pane: `home` (dev) and `home-preview`. The dev
server reads the guides once, when it starts: restart it after changing a guide. Its dev and preview servers send `/api` to the local sync
API (`sync-api`, port 8787, or `SYNC_API`), as a guide's do: start it first to try a linked browser ([docs/testing.md](../docs/testing.md#sync-in-a-browser)). At the root, `pnpm lighthouse home` audits the
production build as CI's `lighthouse-home` job does.

## Tests

`src/test/setup.ts` builds the real page and all assets once per Vitest run, before workers start. It writes a temporary V8 fixture that preserves Maps and Buffers; the page and link-preview suites read independent copies. Watch reruns rebuild the fixture, and teardown removes it. This avoids competing AVIF encodes in each suite’s 60-second setup hook. Generation failures still fail the run, and the tests still inspect actual emitted assets.

- `page.test.ts`: the page as the build makes it. Every guide with a `vercel.json` in `apps/` is on it, linking to its `brand.home`, its
  game the band's title and its own name above it, unless it is the game's, with no publisher. Its pictures and fonts are among the files
  the build writes, and each guide's dark palette is written for both ways into dark. The hero's backdrop lists every guide's banner A to Z, their
  responsive copies up to 4K, verifies the reserved-name font stays unmodified, and holds only the first, with a matching responsive preload, hidden from assistive technology. The top bar links to the repository in a new tab and holds
  the theme button, invisible until its script runs. Find narrows the guides. The theme button and the Find field keep their room before
  their script runs (never `hidden`, which gave them none: showing the field grew the guides' bar from 26 to 82px on a phone and pushed
  the guides down) and go, room and all, where scripts are off. A guide's cookie fills in its band and no other, and
  a linked browser's group draws over them.
- `backdrop.test.ts`: the hero's backdrop crossfades A to Z, fetching each next banner shortly before it's due and laying it over the one
  before, retaining each slide’s responsive sources and covered-image sizing; it shows none before it's decoded and skips one that won't load; it keeps the first and fetches nothing under reduced motion,
  and stops when that's asked for mid-way; it waits while the tab is hidden or the hero is out of view or not drawn; and it does nothing
  with one banner.
- `guides.test.ts`: what's read from each guide.
- `find.test.ts`: how Find matches.
- `og.test.ts`: the link preview. Its tags name a picture the build writes, on `https://hundo.quest`, at the size they declare; which
  guides the wall shows, and its six tiles under six guides; the logo's ring and word; the picture at one guide and at thirty.
- `progress.test.ts`: how a guide's cookie is read, and what a started band shows; a linked browser asks its group and an unlinked one
  asks nothing, the higher figure shows (a reset puts the band back, an unknown guide keeps its cookie, a band that doesn't change keeps
  focus), and only a good answer is read.
- `theme.test.ts`: the theme button follows the device until a press, keeps only the scheme the device isn't using and forgets it when
  the device's is picked again, follows the device and another tab, and still flips the page with storage off; `theme-init.js` puts a
  kept choice back and ignores anything else.
- `theme.test.ts` also holds `home.css` to writing every dark rule twice, for a choice of dark and for a dark device with no choice of
  light.
- `deploy.test.ts`: `vercel.json` (the guides' headers, the guides' `/api` route ahead of the 404, the cache only on a hit, the 404), the ignore step, the canonical, sitemap and
  robots, no inline script, `theme-init.js` ahead of the stylesheets in both pages, no browser storage but `hundo.theme` (one key, the
  same in both files that touch it, and no other file touching storage), and the guides' cookies read but never written.

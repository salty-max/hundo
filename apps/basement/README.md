# Basement Hundo

A spoiler-aware, unofficial path to Dead God in *The Binding of Isaac: Repentance+*: every secret and every Hard completion mark, in an order that opens the game before it marks it. Fourteen chapters, from the Basement to Dead God.

## Work on it

This folder is one app in the [hundo](../../README.md) monorepo; the app itself is `packages/core`. Install once at the repository root with `pnpm install`, then run these from here:

```bash
pnpm dev        # http://localhost:5173
pnpm build      # typecheck + production build into dist/
pnpm preview    # serve the production build
pnpm test       # this guide's tests plus core's shared suites, run against this guide
pnpm lint
pnpm icons      # regenerate public/icons and public/favicon.ico from scripts/icon-master.webp and scripts/favicon.svg
```

`src/guide` is what makes this guide Isaac: `brand.ts` (names, storage keys, fonts, corner style), `config.ts` (article layout, categories, completion targets), the chapter data in `src/guide/data` (one module per chapter), the banners and `theme.css`, which sets only the palette.

## Deploy

The Vercel project `hundo-basement` builds this folder as its Root Directory and serves [basement.hundo.quest](https://basement.hundo.quest). `vercel.json` here sets the install, build, ignore command, rewrites, CSP and cache rules; [docs/deploying.md](../../docs/deploying.md) explains them.

## Use the guide

- **Guide** walks the unlocks chapter by chapter as one article. Chapters 1 to 8 open the game: Mom, Mom's Heart, Isaac and Satan, the Chest and the Dark Room, Mega Satan, the timers, the Void, Greed, the other way down and Home. Chapters 9 to 12 fill every character's note on Hard, one compact group a character. Chapter 13 holds the totals, the one-run feats, the streaks, the Victory Laps and the last challenges, and chapter 14 the last secrets and Dead God. Later chapters stay hidden until you reveal them.
- **Checklist** searches and filters every row; a check is shared with the walkthrough.
- **Progress** counts the game's own two lists: its 641 secrets (the Stats → Secrets page on Repentance+) and the twelve Hard marks on each of the 34 characters' notes. A Hard mark row ticks only its mark, apart from the Hard Mom's Heart unlocks and the Greedier unlocks, which the Hard mark itself earns: every other mark's unlock comes on Normal too, so it has a row of its own. The items of the Collection page count inside Dead God's row. Route steps never count. Its Check against the game panel (`/dashboard/game-check`) says how many secrets the game should list for your ticks, since many come chapters before their row.
- No secret is known to be missable, so each chapter shows a one-line note saying so ([docs/facts-to-verify.md](docs/facts-to-verify.md) says how far its sources go).
- The four secrets Repentance+ added say what they need: three need online play, and Item Descriptions needs Repentance+.

## Content and accuracy

Every secret's number, name and condition come from the Binding of Isaac wiki's achievements table, checked against Steam's list, tboi.com (Platinum God), strategywiki and a Dead God route on Steam; the row texts are drafted from those and not replayed in the game. [docs/facts-to-verify.md](docs/facts-to-verify.md) lists what is still unconfirmed.

## Credits

Kalam and Atkinson Hyperlegible Next are bundled with their SIL OFL licenses in `public/fonts`. The fourteen chapter banners and the red D6 app icon are original AI-generated illustrations, exported through the shared Hundo pipelines. The browser favicon is a simplified drawing of the same die. The banner recipes live in the `guide-banners` skill; the icon prompt is in [the artwork notes](../../docs/icon-art.md#basement). *The Binding of Isaac* belongs to Edmund McMillen and Nicalis; this is an unofficial fan guide.

## Rebuild artwork

Retain the original generation PNGs outside the repository, then export them into this guide:

```bash
node apps/basement/scripts/artwork.mjs /path/to/masters
pnpm -C apps/basement icons
```

The folder must contain `chapter-1.png` through `chapter-14.png` and `icon.png`. Chapter banners are 1800 × 600 WebP and stay below 200 KB each. The app icon painting is 1024px, with core exporting the app, maskable, Apple, launcher and favicon variants.

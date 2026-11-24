# Tenebrous Hundo

A spoiler-aware, unofficial 100% route through *Mina the Hollower*: every collectible the game counts, and the guide’s own lists of bosses, weapons, sidearms, cloak upgrades and island tasks, in the order Tenebrous Isle opens up. Eighteen chapters on one save, then two separate saves: New Game Plus and the Blameless ending.

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

`src/guide` is what makes this guide Mina: `brand.ts` (names, storage keys, fonts, corner style), `config.ts` (article layout, categories, completion targets), the chapter data in `src/guide/data` (one module per chapter), the banners and `theme.css`, which sets only the palette.

## Deploy

The Vercel project `hundo-tenebrous` builds this folder as its Root Directory and serves [tenebrous.hundo.quest](https://tenebrous.hundo.quest). `vercel.json` here sets the install, build, ignore command, rewrites, CSP and cache rules; [docs/deploying.md](../../docs/deploying.md) explains them.

## Use the guide

- **Guide** walks the island chapter by chapter as one article, from the wreck at Loner's Landing to Radiant Manor, with return trips once new tools reach old ledges. Later chapters stay hidden until you reveal them.
- **Checklist** searches and filters every row; a check is shared with the walkthrough.
- **Progress** counts the game's own lists, the 282 collectibles its Enhanced Map counts region by region (60 trinkets, 50 Kears, 111 Bonestones, 7 Vial Pouches, 10 Health Roses, 5 Trinket Bags, 8 Joule Boxes, 3 Spark Containers, 3 fishing upgrades, 16 fish and 9 pieces of Underlab equipment), and beside them the guide's own lists: bosses, weapons and their upgrade chests, sidearms, cloak upgrades and island tasks. The game keeps no overall percentage. Route steps never count, and the two separate saves are shown and left out of the bar.
- Nothing collectible can be missed for good, so each chapter shows a one-line note saying so ([docs/facts-to-verify.md](docs/facts-to-verify.md) says how far its sources go).

## Content and accuracy

The collectibles come from 100% Guides' list of all 282 and NiaMeowDB's checklist, Kear and Bonestone lists, checked against Gamer Guides' trinket, Joule Box and Trinket Bag lists. The route and its order started from an editorial draft and are rewritten chapter by chapter from those sources; nothing was replayed in the game. [docs/facts-to-verify.md](docs/facts-to-verify.md) lists what is still unconfirmed.

## Credits

Texturina and Libre Franklin are bundled with their SIL OFL licenses in `public/fonts`. The twenty chapter banners and the mace-and-whip app icon are original AI-generated illustrations, exported through the shared Hundo pipelines. The browser favicon is a simplified drawing of the same mace. The banner recipe lives in the `guide-banners` skill; the icon prompt is in [the artwork notes](../../docs/icon-art.md#tenebrous). *Mina the Hollower* belongs to Yacht Club Games; this is an unofficial fan guide.

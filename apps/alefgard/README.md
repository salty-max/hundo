# Alefgard Hundo

A spoiler-aware, unofficial 100% route through *Dragon Quest I HD-2D Remake*, the first half of the 2025 *Dragon Quest I & II HD-2D Remake* collection: every Mini Medal, prize, scroll, Secret Spot, sigil and recipe the game keeps, and the guide’s own lists of equipment, sparkly spots, bosses, Zalen’s quest and endings, in the order Alefgard opens up. Nine chapters on one save, then the Craft-Master’s recipes and one separate save: carrying Gwaelin to the end.

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

`src/guide` is what makes this guide Dragon Quest: `brand.ts` (names, storage keys, fonts, corner style), `config.ts` (article layout, categories, completion targets), the chapter data in `src/guide/data` (one module per chapter), the banners and `theme.css`, which sets only the palette.

## Deploy

The Vercel project `hundo-alefgard` builds this folder as its Root Directory and serves [alefgard.hundo.quest](https://alefgard.hundo.quest). `vercel.json` here sets the install, build, ignore command, rewrites, CSP and cache rules; [docs/deploying.md](../../docs/deploying.md) explains them.

## Use the guide

- **Guide** walks Alefgard chapter by chapter as one article, from King Lorik’s audience to the Dragonlord’s Castle, with the red, blue and Ultimate Key doors revisited as each key arrives. Later chapters stay hidden until you reveal them.
- **Checklist** searches and filters every row; a check is shared with the walkthrough.
- **Progress** counts the game’s own fixed lists (40 Mini Medals, the Monarch of Medals’ 13 prizes, 22 scrolls, 15 Secret Spots, 5 sigils and 8 recipes) and beside them the guide’s own lists: the equipment found in the world, the 48 sparkly spots, the bosses, Zalen’s quest and the two endings one save reaches. The game keeps no completion figure of its own. Route steps never count, and the separate save is shown and left out of the bar.
- Nothing can be lost for good, so each chapter shows a one-line note saying so ([docs/facts-to-verify.md](docs/facts-to-verify.md) says how far its sources go).

## Content and accuracy

The route comes from Guide Lovers’ chapter walkthrough and RPG Site’s walkthrough, the collections from Realm of Darkness’s medal, Secret Spot, sparkly spot and area treasure lists, and the equipment’s kinds from Gamer Guides’ Dragon Quest I database. It started from a research draft and is rewritten chapter by chapter from those sources; nothing was replayed in the game. [docs/facts-to-verify.md](docs/facts-to-verify.md) lists what is still unconfirmed.

## Credits

Almendra and Figtree are bundled with their SIL OFL licenses in `public/fonts`. The ten chapter banners and the Slime app icon are original AI-generated illustrations, exported through the shared Hundo pipelines. The browser favicon is a simplified drawing of the same Slime. The banner recipe lives in the `guide-banners` skill; the icon prompt is in [the artwork notes](../../docs/icon-art.md#alefgard). *Dragon Quest* belongs to Square Enix; this is an unofficial fan guide.

# Lordran Hundo

A spoiler-aware, unofficial companion for *Dark Souls Remastered*: a thirteen-chapter walkthrough across New Game, NG+ and NG++, with a checklist of every boss, covenant, ring, rare weapon and spell.

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

`src/guide` is what makes this guide Dark Souls: `brand.ts` (names, storage keys, fonts, corner style), `config.ts` (article layout, categories, completion targets), the chapter data in `src/guide/data` (one module per chapter, plus `missables.ts`, `build-plan.ts` for the builds it points toward, and the guide-wide `sources.ts`), the banners and `theme.css`, which sets only the palette.

## Deploy

The Vercel project `hundo-lordran` builds this folder as its Root Directory and serves [lordran.hundo.quest](https://lordran.hundo.quest), a domain it takes only at launch: before the merge, its deployments live on `hundo-lordran.vercel.app` and the branch addresses, as [a new project](../../docs/deploying.md#a-new-project) says. Its first deployment went to production; the next push, on 17 Nov 2026, built a preview. `vercel.json` here sets the install, build, ignore command, rewrites, CSP and cache rules; [docs/deploying.md](../../docs/deploying.md) explains them.

## Use the guide

- **Guide** walks the route chapter by chapter as one article: a heading per section, each step's opening sentence is its checkbox, and **In this chapter** jumps between sections. Later chapters stay hidden until you reveal them. Chapters 1 to 10 are the first playthrough with the expansion, chapter 11 is the completion sweep (covenants, forging and the collections, with the spells nobody can lose), chapter 12 ends the first cycle, and chapter 13 holds NG+ and NG++.
- The route is one character, offline, with no trades. New Game joins the Darkwraiths without placing the Lordvessel for Kaathe, so Frampt stays, and takes the Dark Lord ending; NG+ links the fire; NG++ takes the third Sif soul and the last forge, then Kaathe's way with the Lordvessel. Spells sold by someone who can be lost sit in that vendor's chapter, with the window stated.
- **Checklist** searches and filters every entry. A check is shared between the walkthrough and the checklist. Each section has **Check all** / **Uncheck all**, and every change shows an **Undo** toast.
- **Progress** counts every target on the board, each item once: 26 bosses, 9 covenants, 47 rare weapons, the base game's 24 sorceries, 19 pyromancies and 23 miracles, 41 rings, 10 embers, 10 maximum reinforcements, both endings, the expansion's 5 spells and the guide's pick of 8 pieces of its equipment. It also counts Snuggly's trades (18 of the 20 in the game's list; the Pursuers spell and the Red Titanite Slab count as a spell and a slab) and the 7 NPC invasions, which two hosts list, and the guide's own lists, which no game total backs: 62 NPC quest steps, 5 Estus souls, 5 Titanite Slabs, 4 later-cycle ways at the one-way choices, 11 discoveries and 22 loot sweeps. Route steps never count, and a later cycle's item (the Leo Ring, a boss soul's second recipe) counts once, in chapter 13. Six one-way choices (Frampt or Kaathe, Lautrec and Anastacia, Patches's apology, Ciaran's soul, Siegmeyer's and Solaire's fates) each show as a block: the way the guide recommends for the first cycle, and the other way, a row in chapter 13 for NG+ or NG++. Both count, so 100% takes the later cycles, as the second ending does. Dark Souls Remastered's achievements are the platforms', not the game's own list (facts-to-verify.md says what backs that), so they only checked the lists for gaps and the guide never shows them. The game shows no overall percentage; the bar reads 100% exactly when What's left is empty, shown over the chapters and at the top of Progress. An ending you don't take on this save needs another one.
- 18 entries can be lost for a playthrough, some for good. Each is flagged in its chapter and in **Don't miss**, and its condition rests on two sources on different sites. **Don't miss** also lists each one-way choice's recommended way, with what makes it one-way, until it's ticked.
- The sun or moon in the header switches the theme. **Progress saved** opens Sync devices, where a six-digit code links your other devices. Spoiler settings and the backup (export and import) are under **Change settings**, in the chapters menu (beside the page on a wide screen), and Progress has **Export progress** and **Import progress**. Progress is stored in this browser for this site address; an installed PWA can keep separate storage, so export before moving.

## Content and accuracy

The chapter text was drafted from community guides (wikidot, fextralife, Gold Phantom and two Steam guides), which the data keeps per section so it can be checked (the guide doesn't show them), then checked claim by claim against the pages it cites, twice, by passes that didn't write it. It has not been replayed in the game. [docs/facts-to-verify.md](docs/facts-to-verify.md) lists the source conflicts, the one-source warnings kept off the missables, and what would settle each.

## Credits

Cinzel and Source Sans 3 are bundled with their SIL OFL licenses in `public/fonts`. The bonfire app icon is an original generated illustration, with its master in [scripts/icon-master.webp](scripts/icon-master.webp). The chapter banners in `src/guide/banners` are original AI-generated illustrations of the game's places, made from text prompts alone. *Dark Souls* belongs to Bandai Namco and FromSoftware; this is an unofficial fan guide.

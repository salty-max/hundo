# Hallownest Hundo

A spoiler-aware, unofficial companion for *Hollow Knight*: a twelve-chapter walkthrough to the game's full 112%, with a checklist for every charm, boss, Mask Shard, Vessel Fragment and Grub.

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

`src/guide` is what makes this guide Hollow Knight: `brand.ts` (names, storage keys, fonts, corner style), `config.ts` (article layout, categories, completion targets), `points.ts` (the game's own completion count), `GameCheck.tsx` (the Progress page's "Check against the game"), the chapter data in `src/guide/data` (one module per chapter, plus `missables.ts`, `questlines.ts` and the guide-wide `sources.ts`), the banners and `theme.css`, which sets only the palette.

## Deploy

The Vercel project `hundo-hallownest` builds this folder as its Root Directory and serves [hallownest.hundo.quest](https://hallownest.hundo.quest), a domain it takes only at launch: before the merge, its deployments live on `hundo-hallownest.vercel.app` and the branch addresses, as [a new project](../../docs/deploying.md#a-new-project) says. The project was created on 18 Nov 2026 through Vercel's API and connected to the repository while this guide's pull request was open, so its first deployment came from a push of that branch. `vercel.json` here sets the install, build, ignore command, rewrites, CSP and cache rules; [docs/deploying.md](../../docs/deploying.md) explains them.

## Use the guide

- **Guide** walks the route chapter by chapter as one article: a heading per section, each step's opening sentence is its checkbox, and **In this chapter** jumps between sections. Later chapters stay hidden until you reveal them. Chapters 1 to 9 cross Hallownest, taking what the content packs add on the way; chapter 10 is the Black Egg, the Seer and the White Palace, chapter 11 the Colosseum, the Grimm Troupe and the last nail upgrades, chapter 12 Godhome and the last percent, and chapter 13 A Second Save, the other answer to the Nailsmith's request.
- **Checklist** searches and filters every entry. A check is shared between the walkthrough and the checklist. Each section has **Check all** / **Uncheck all**, and every change shows an **Undo** toast.
- **Progress** counts every target on its board, each item once. The game's own completion is 40 charms, 15 bosses, 7 pieces of equipment, 7 Warrior Dreams, 6 spells, 4 nail upgrades, 16 Mask Shards, 9 Vessel Fragments, 3 nail arts, 3 Dreamers, 3 Dream Nail steps, 3 Colosseum trials, the Grimm Troupe's two, the Godtuner and 4 Pantheons. The board also holds the collections a full save has that the game's figure doesn't: 46 Grubs, 8 earned notches, 6 Pale Ore, 13 maps, 11 Stag Stations, 15 Whispering Roots, 4 Simple Keys, 5 endings and 5 dream rematches, and the relics Lemm buys, each where the route picks it up (being added chapter by chapter: so far the Hallownest Seal in the well and the Wanderer's Journal by Greenpath's Stagway, of the game's 14 Wanderer's Journals, 17 Hallownest Seals, 8 King's Idols and 4 Arcane Eggs). And it counts the guide's own lists, which no game total backs: 7 key pickups, 6 bosses the game's percentage leaves out, 4 challenges, the Pure Completion achievement (the game keeps its achievements itself, as Feats on Switch, so the guide may show this one) and 43 quest steps. Route steps are directions and never count. The Nailsmith's request is a one-way choice, shown as a block: the first save spares him (Happy Couple), and a short last chapter, A Second Save, strikes him down (Purity). Both count, so 100% takes a second save. All of it shows on the board and in What's left.
- **The overall figure is everything on the board.** 100% is every target counted item by item, up to its goal, so the bar reads 100% exactly when What's left is empty, and a Grub moves it as much as a charm. It is not the game's percentage, which counts up to 112% with all four free content packs, weighs equipment twice, counts Mask Shards and Vessel Fragments only as whole masks and vessels, and leaves out the collections and endings above. **Check against the game**, on the Progress page, keeps that figure: what your save should read in the game's own terms, to compare with the inventory once you have World Sense. The two don't move together.
- Eight entries can be lost for good. Each is flagged in its chapter and in **Don't miss**, and its condition rests on two sources on different sites. None of the eight costs a point of the game's own completion: the Grimm Troupe's finale counts the same whichever way it ends. Seven of them are board rows that a save can't get back once it has gone past them, so it can't reach 100% (four quest steps, two endings and the Arcane Egg); the Troupe's finale is on the board too but counts the same either way. **Don't miss** also lists the Nailsmith's request, the one-way choice, until it's ticked.
- The sun or moon in the header switches the theme. **Progress saved** opens Sync devices, where a six-digit code links your other devices. Spoiler settings and the backup (export and import) are under **Change settings**, in the chapters menu (beside the page on a wide screen), and Progress has **Export progress** and **Import progress**. Progress is stored in this browser for this site address; an installed PWA can keep separate storage, so export before moving.

## Content and accuracy

The chapters were drafted with GPT from community sources (the Hollow Knight wiki, a Steam route guide, pindrop.gg and others), which the data keeps per section so it can be checked (the guide doesn't show them). The draft was then audited claim by claim against those pages by passes that didn't write it, fixed, and checked again against its sources. It has not been replayed in the game. [docs/facts-to-verify.md](docs/facts-to-verify.md) lists the source conflicts, the one-source claims kept off the missables, and what would settle each.

## Credits

Cormorant Garamond and Nunito Sans are bundled with their SIL OFL licenses in `public/fonts`. The app icon is a generated illustration of the Knight's mask, with its master in [scripts/icon-master.webp](scripts/icon-master.webp). The chapter banners in `src/guide/banners` are original AI-generated illustrations of the game's places, made from text prompts alone. *Hollow Knight* belongs to Team Cherry; this is an unofficial fan guide.

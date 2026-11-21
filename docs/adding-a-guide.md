# Adding a guide

A guide is one folder in `apps/`. It holds its data, its look (palette, fonts, corners, icon art, banners) and its deploy settings. Everything else comes from `packages/core`, and core's shared tests then hold the new guide to the same rules as the others.

Start from `apps/echoes`, the plainest guide: article layout, no panels and no per-guide saved state. Copy Red Dead's `config.ts` instead only if the game suits a mission list with route filters (`layout: "checklist"`).

## 1. Copy the folder

```bash
rsync -a --exclude node_modules --exclude dist apps/echoes/ apps/<name>/
```

Then, in `apps/<name>`:

- **`package.json`**: set `name` to `hundo-<sub>`, after the guide's subdomain (as in `hundo-rdr`), and `version` to `1.0.0`. The Vercel project uses the same name, so there's one name to look up. A new guide uses it as its storage prefix too. The first three guides keep their older prefixes (`koholint-field-guide`, `red-dead-field-guide`, `echoes-of-wisdom-field-guide`), which never change.
- **`vercel.json`**: leave it as copied. `packages/core/src/deploy.test.ts` fails unless every guide's file is the same, and checks the parts that broke before ([deploying.md](deploying.md)).
- **`tsconfig.json`** and **`vite.config.ts`**: leave them. They're identical in every guide.

Delete what's Echoes' own:

- `src/guide/data/*`, apart from `missables.ts` and `questlines.ts`, which you rewrite;
- `src/guide/banners/*`;
- `public/fonts/*` and `public/icons/*`;
- the Echoes cases in `src/guide/guide.test.ts`, such as the crystal counts and the v1 saves.

## 2. Write `src/guide`

| File | What goes in it | Details |
| --- | --- | --- |
| `brand.ts` | names, storage prefix, fonts, corners | below |
| `config.ts` | layout, categories, chips, completion, texts | below |
| `data/chapter-N.ts` | one module per chapter | [chapter-data.md](chapter-data.md) |
| `data/missables.ts` | missables, or a reassurance while there are none | [chapter-data.md](chapter-data.md#missables) |
| `data/questlines.ts` | the Questlines page's words and its chained side quests | [chapter-data.md](chapter-data.md#questlines) |
| `theme.css` | the palette: eleven colours, light and dark | [house-style.md](house-style.md#the-palette) |
| `panels.ts` | `export const panels: Panel[] = [];` | a panel only for a real per-game tracker, as Koholint's deathless run or Red Dead's calibration |
| `banners/chapter-N.webp` | one per chapter | [house-style.md](house-style.md#banners) |
| `guide.test.ts` | the game's own totals, the storage key | below |

### `brand.ts`

- `id`: written into every backup as `guide`, and the name the sync API stores the guide's progress and visit counts under, so a backup from another guide is refused. It's short, for example `echoes-of-wisdom`. **It never changes**, and the API has to know it before the guide's previews can sync or count (step 4, [deploying.md](deploying.md#a-new-project)), so settle it before any of that.
- `name`: the mark and "Hundo", as in `RDR Hundo`. It's the installed app's name and the header's label.
- `shortName`: the bare mark (`RDR`), without "Hundo", so the label under a home-screen icon isn't cut short.
- `title`: the document and social title. The name, then enough to name the game, so a search for it finds the guide and a newcomer who doesn't know the word still knows what it is: `RDR Hundo · Red Dead Redemption 100% checklist`, or `Echoes of Wisdom Hundo · Zelda completion checklist`, where the name already holds the game's. Use the word its `description` uses for what it covers: "100%", or "completion" as in Echoes.
- `description`.
- `storagePrefix`: the localStorage prefix. Progress is saved under `<prefix>.v1`, the theme under `<prefix>.theme` and a synced device's ledger under `<prefix>.sync`. **Pick it once.** Changing it after launch starts every reader from nothing.
- `backupFile`: the name of the exported JSON file.
- `mark`: the word in the header, above "HUNDO".
- `game` (the game's full name, which the `title` and `description` must contain: no page shows it on its own, and `data.test.ts` checks it) and `publisher` (named in the rail's small print: "Unofficial fan guide, not affiliated with …").
- `corners` and `fonts`: [house-style.md](house-style.md#fonts-and-corners).
- `home` (required): the guide's address, `https://<sub>.hundo.quest`. Every canonical, the sitemap and the link preview are on it ([core.md](core.md#search-engines-and-link-previews)). The subdomain is chosen per guide, and the folder and package follow it (`apps/rdr`, `hundo-rdr`, `rdr.hundo.quest`). `movedFrom` stays out of a new guide; it's only for a guide that changes address ([deploying.md](deploying.md#pitfalls)).

### `config.ts`

The full type is `GuideConfig` in `packages/core/src/types.ts`, and every field is commented there. What each guide decides:

- **`layout`**: `"article"` for prose sections with inline checks, `"checklist"` for collapsible route groups with filters.
- **`categories`**: `id → [plural, singular, icon, tone?]`. The tones are rose, violet, amber, clay, sky and mint. Every tag a row uses must be a category, and the first tag is the row's label.
- **`chips.checklist`**: the category filters on the checklist page. `chips.route` adds filters above the route in the checklist layout.
- **`badges`** (optional): secondary tags shown as a badge beside the label in route rows.
- **`quantity`** (optional): the category a row's `quantity` counts toward, like Echoes' Might Crystals.
- **`missables`** and **`reassurance`**: from `data/missables.ts`.
- **`questlines`**: from `data/questlines.ts`.
- **`banners`**: `byChapter(import.meta.glob<Banner>("./banners/chapter-*.webp", { eager: true, query: "?banner", import: "default" }))`, as Echoes has it (`?banner` adds the phone-sized copies, [house-style.md](house-style.md#banners)).
- **`defer`** (optional): rows Next up holds back until nothing else is left, such as optional amiibo outfits.
- **`completion`**:
  - `board`: the counts on the Progress page. Every target has a `goal`, exactly its rows as the board counts them, and says whose list it is: `list: "game"` for a list the game keeps (its total, with two hosts in `facts-to-verify.md`), `list: "guide"` for one the guide makes up, whose rows count under no other target. `data.test.ts` checks both. A tile, and What's left's line for the same tag, opens the checklist on its own category. Give `opens` a wider category only when the tag counts a task by one of its rows, as Red Dead's Stranger Tasks counts each task by its last step and opens `stranger-step`, every step. `data.test.ts` checks that every counted row is in that category.
  - The overall figure needs nothing: it is every board target but what lies outside the game, each counted as the board counts it and up to its `goal`, rounded down, and it reads "complete" ([core.md](core.md#overall-completion)). So everything the guide tracks that a reader gets or finishes is a target, even where the game doesn't count it toward its own percentage (Hallownest's Grubs, Red Dead's outfit scraps). Steps the game doesn't credit carry no target (route steps, tagged `route`). The rows of a one-way choice are ordinary counted rows: the recommended way in the choice's chapter, each other way in a later playthrough's.
  - `directions`: the tags that label a step the game doesn't credit, such as `route`. A row whose first tag is one carries no target, and every other row must carry one, but what lies outside the game (`data.test.ts`). A direction tag after another kind is only a filter, as Koholint's instruments are tagged `["instrument", "story"]`.
  - `outside` (optional): the tags of what lies outside the game, such as amiibo, which need physical figures. A row with one never counts, and a board target with one is shown and left out of the bar and What's left. Nothing else stays out.
  - Nothing replaces the figure: a game that keeps a percentage of its own has it in a "Check against the game" panel, never in the bar. The rules the board follows (one each, a goal for every target, nothing left out but what lies outside the game) are in [core.md](core.md#the-completion-rules).
- **`state: {}`**: a new guide has no saves from before the shared format, so no `legacy`. Add `extra`, with a `Register` declaration, only for a panel that saves its own state. Koholint's run log is the example.
- **`text`**: the ten strings in `GuideText`.

### `guide.test.ts`

- Pin the game's own totals, as Echoes does with `targets`, so a missing row fails a count.
- Pin the nine storage keys, as every guide does at the bottom of its test. `STORAGE_KEY` comes from `@hundo/core/progress-state`, `THEME_KEY` from `@hundo/core/store/theme`, `AWAKE_KEY` from `@hundo/core/store/awake`, `PLACE_KEY` from `@hundo/core/store/place`, `SYNC_KEY` from `@hundo/core/sync/local`, `PERSIST_KEY` from `@hundo/core/persistence`, `COUNTS_KEY` from `@hundo/core/counts`, and `BUILD_KEY` and `BUILD_ASKED_KEY` from `@hundo/core/store/build` (pinned in a guide without builds too: the keys exist in every guide):

  ```ts
  describe("storage", () => {
    // Readers' progress, theme and sync ledger live under these keys on this domain: new keys start every reader from nothing.
    it("keeps its storage keys", () => {
      expect(STORAGE_KEY).toBe("hundo-<sub>.v1");
      expect(THEME_KEY).toBe("hundo-<sub>.theme");
      expect(AWAKE_KEY).toBe("hundo-<sub>.awake");
      expect(PLACE_KEY).toBe("hundo-<sub>.place");
      expect(SYNC_KEY).toBe("hundo-<sub>.sync");
      expect(PERSIST_KEY).toBe("hundo-<sub>.persist");
      expect(COUNTS_KEY).toBe("hundo-<sub>.counts");
      expect(BUILD_KEY).toBe("hundo-<sub>.build");
      expect(BUILD_ASKED_KEY).toBe("hundo-<sub>.build-asked");
    });
  });
  ```

- If the guide has builds (`config.builds`, [chapter-data.md](chapter-data.md#builds)), pin its leaning ids and labels too, as Lordran's test does: a reader's pick saves the ids.
- If the guide keeps an `extra` state, pin how it syncs, as Koholint's and Red Dead's tests do: `flatten` from `@hundo/core/sync/fields` names one `x:<path>` key per leaf, and `viewFrom` rebuilds the state from keys through the guide's own `read`. Keep its keys to letters, digits, `_` and `-`, at most 60 leaves of at most 256 bytes each, or the leaf is left out of sync ([core.md](core.md#syncing-devices)).

## 3. Fonts, icons, README

- **Fonts**: put the two `.woff2` files and their licence texts in `public/fonts`, and name them in `brand.fonts`.
- **Icons**: put the painting in `scripts/icon-master.webp` and the tab drawing in `scripts/favicon.svg`, copy a guide's `scripts/icons.mjs` and run `pnpm icons` from the app folder. [house-style.md](house-style.md#icon) has what each must be and what core writes from them. Then run `pnpm screenshots <name>` from the root for the install dialog's pictures, and commit them (`icons.test.ts` fails without them).
- **`README.md`**: what the guide covers, how to use it, its sources and credits. Copy the shape of Echoes' README.
- **`docs/facts-to-verify.md`**: what isn't confirmed yet ([chapter-data.md](chapter-data.md#facts-to-verify)).

## 4. Wire it into the repository

Every guide is listed in a few places outside its own folder. A test holds each list to the folders in `apps/` (the lockfile, to CI's frozen install), so a guide left out fails `pnpm check` and the failure names the list.

- Run `pnpm install` at the root. A new workspace package changes `pnpm-lock.yaml`. Commit the lockfile with the app, or CI's and Vercel's `--frozen-lockfile` install fails.
- `services/sync/src/app.ts`: add the guide's `brand.id` to `GUIDES`, or the sync API turns its readers away (`services/sync`'s `project.test.ts` fails until it's there). **The API has to know the id before the guide's previews can sync or count**: a guide's `/api` goes to the production API, and an id it doesn't know gets a `400` (`{"error":"guide"}`, on `/api/count` and `/api/sync`, checked live on 17 Nov 2026). It's one line either way; when it lands is the choice, and [deploying.md](deploying.md#the-api-knows-the-guide-first) has the two ways.
- `.github/workflows/ci.yml`: add the folder's name to the lighthouse job's `guide: [...]` matrix, or the guide's pull requests run no Lighthouse. `packages/core/src/wiring.test.ts` fails until it's there.
- `packages/stories/.storybook/ids.ts`: add the folder's name to `GUIDES`, and in `guides.ts` the guide's `brand` and `theme.css?raw` imports and its entry in `guides`. The stories run axe under every guide's palette in both themes, and a guide left out is never run: `packages/stories/src/guides.test.ts` fails until `GUIDES` has it, and the typecheck until `guides.ts` does.
- Root `README.md`: add a row to the apps table, the one list of guides and their Vercel projects (`wiring.test.ts` checks it).
- `.claude/launch.json`: copy Echoes's two entries onto the next band, 5500 and 4500 (each guide's ports sit 100 apart, [testing.md](testing.md#start-a-guide) says why). Keep `"autoPort": true`, and `--port ${PORT:-<its port>}` in the preview's shell string. `wiring.test.ts` checks the entries, their package filter and that no two share a port.

What finds the guides in `apps/` by itself and needs nothing: `pnpm lighthouse --all`, `pnpm screenshots`, `guide-check`'s scripts with `--all`, `pnpm check`'s scope (a folder with a `vercel.json` is a guide; a new package checks every package), and the landing page at hundo.quest (`home/`), which shows every folder with a `src/guide/brand.ts`, A to Z by game. Its band is made from the guide's own files: `brand.ts` (the game, its title there, and the guide's name), `config.ts` (the chapters and the rows), the palette, `src/guide/banners/chapter-1.webp`, `public/icons/tile-{40,80,120}.png`, and the display font with its licence beside it as `<Family-Name>-OFL.txt` in `public/fonts`. Home's build stops and names what's missing, and its `page.test.ts` fails when a guide with a `vercel.json` isn't on the page.

## 5. Check it

- Run `pnpm check` at the root. Core's shared suites run against the new guide: the data rules, the app flows for its layout, the theme's keys and contrast, the deploy settings and the lists of step 4.
- Look at it in a browser on desktop and phone, in light and dark ([testing.md](testing.md#in-a-browser)).
- Look at its band on the landing page too: `preview_start` with `home-preview`, or `pnpm --filter hundo-home build && pnpm --filter hundo-home preview` at the root, at desktop and phone width, in light and dark. The game is the band's title, in the guide's display font, so a long one shows there first.
- Run `pnpm lighthouse <name>` at the root before asking for the push ([testing.md](testing.md#lighthouse)); it takes its turn in the queue, so run it in the background. CI audits the guide on its first pull request, against limits set per page from the guide that does worst, so a new guide can fail them. If it does, fix the guide (its banners' weight and its fonts' size are where to look first, and the report's diagnostics say where the time went). **Never loosen a threshold in `lighthouse/lighthouserc.mjs` to let a guide through**: moving one is the user's call, through the opener.

## 6. Deploy it

Creating the Vercel project and every deploy need the user's go. The steps are in [deploying.md](deploying.md#a-new-project): the API knowing the guide first, root directory `apps/<name>`, the preview toolbar turned off (an environment variable on the project that stops the toolbar's script, which the CSP blocks and logs an error for on every preview), no `hundo.quest` domain until launch, the first deployment checked on its Vercel addresses, then the launch: the merge, then the domain.

The merge also rebuilds the landing page (`hundo-home` watches `apps/`), which then links to the new guide's address. Until the guide's domain is on, that link leads nowhere, so add the domain as soon as the guide's production build of `main` is in, as the launch step says.

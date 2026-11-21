# Testing and checking

## The checks

| Command | Where | What it runs |
| --- | --- | --- |
| `pnpm check` | root | lint, typecheck, tests and build for the packages this tree changes against `origin/main`, and the packages that read what it changes ([what it runs](#what-pnpm-check-runs)) |
| `pnpm check --all` | root | the same over every package, as CI does |
| `pnpm check --dry-run` | root | its first line alone: what it would check, and why |
| `pnpm test` | an app folder | that guide's tests plus core's shared suites, against that guide |
| `pnpm exec vitest` | an app folder | the same, in watch mode |
| `bun harness/q.ts check -- bun run check` | root | `pnpm check` through the harness: one verdict line, the log in `.cache/logs/`, and the tree stamped so a push is allowed |

- Lint fails on any warning (`--max-warnings 0`). The rule that matters most is `react-hooks/exhaustive-deps`.
- Typecheck runs per app and includes core's source, so core is checked against each real guide config.
- `pnpm build` runs `tsc` and `vite build` per app, which is what Vercel runs.
- `services/sync` is a package too, so `pnpm check` runs its lint, typecheck and tests (`pnpm -C services/sync test` alone). Its store contract also runs against real Upstash when `SYNC_TEST_REDIS_URL` and `SYNC_TEST_REDIS_TOKEN` name a test database ([its README](../services/sync/README.md#run-it)).

CI (`.github/workflows/ci.yml`) runs the root's `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build` after `pnpm install --frozen-lockfile`, each over every package (`pnpm -r`; the root's `pnpm test` runs `tools/`'s own tests first), on every pull request and every push to `main`, and a [Lighthouse](#lighthouse) job per guide beside them. A red CI and a green `pnpm check` on your machine usually means a lockfile left out of the commit, a file that isn't committed, or a read across packages that `tools/scope.mjs` doesn't know (below).

### What pnpm check runs

`tools/check.mjs` lists what a commit of the working directory would change against `origin/main` as this checkout last fetched it: the branch's commits since it left main, what it stages and doesn't, and the untracked files git doesn't ignore. `tools/scope.mjs` turns those files into packages, and the check runs lint, typecheck, tests and build, in that order, over those packages alone (`pnpm --filter`), two packages' tests at a time. Its first line names the packages and the files that brought them in.

| A change to | Checks |
| --- | --- |
| `packages/core` | every package: each guide runs core's suites and typechecks core against its own config, the stories render core's components, and every package's lint reads core's `app.css` (the Tailwind lint's entry point) |
| a guide's own test, its docs | that guide: its `guide.test.ts` and every core suite against it, its lint, typecheck and build |
| a guide's data, or anything else in its `src/guide` but its tests | that guide and the landing page (`home/` is made from every guide's `config.ts` and what it imports, and its chapter 1 banner) |
| a guide's `brand.ts` | that guide, the landing page, the stories (they show every guide's brand) and the sync API (its `project.test.ts` reads every guide's id) |
| a guide's `theme.css` or `public/fonts` | that guide, the landing page and the stories |
| a guide's `public/icons` | that guide and the landing page (its icon tiles); Koholint's, the stories too |
| Koholint's `src/guide` | Koholint, the landing page and the stories, which render its data and its brand tile |
| a guide's `vercel.json` or `package.json` | every guide (core's `deploy.test.ts` and `wiring.test.ts` read them all) and the stories (`guides.test.ts` counts the guides); for `vercel.json`, the landing page too (its `deploy.test.ts` holds its headers to Koholint's) |
| `home/` | the landing page |
| `services/sync/src`, its tests aside | the sync API and every guide: core's sync tests run the API's code (`test/sync-world.ts` imports its `harness.ts`), and core's `ledger.test.ts` holds its copy of the ledger to the API's |
| the sync API's tests, `api/` or config | the sync API |
| a story | the stories |
| `docs/`, the root's Markdown but `README.md`, `.claude/` but `launch.json`, `harness/`, `tools/`, `lighthouse/`, `.github/` but `ci.yml` | nothing; a change to `tools/` runs the tools' own tests (`node --test "tools/**/*.test.mjs"`) |
| anything else: the root's `package.json`, the lockfile, `tsconfig.base.json`, `eslint.config.js`, `scripts/`, `README.md`, `ci.yml` and `.claude/launch.json` (core's `wiring.test.ts` reads those three), a new package | every package |

- **Every package**, too, with `--all`, with `CI` set, and when git can't say what changed (no `origin/main` fetched).
- **`--base <ref>`** measures the change against another ref, such as the branch a stacked branch was cut from.
- **The push gate.** q stamps a tree only for the repository's own check, `bun run check` word for word, so `--all`, `--base` and `--dry-run` stamp nothing. A stamp says: the packages this tree changes, and the packages that read them, passed here, and every other package is byte for byte the merge base's, a commit of `main` that CI checked in full. CI then checks every pull request in full, so a hole in the scope shows up as a red pull request, not as a bad merge. Everything reaches `main` through a pull request: since 19 Nov 2026 `main`'s branch protection requires one, with CI's `check` job passed on it, for admins too, and refuses force pushes (it doesn't require the branch to be up to date with `main`, so CI runs again on `main` after the merge). The architect helper reviewed this on 19 Nov 2026 against the two other ways: stamps from a full check only, which sends every push through the heaviest job to guard what CI already catches, and a stamp that records its scope, a harness change that can wait (the scope is in the check's log, its first line).
- **A read across packages needs its rule in `tools/scope.mjs`.** Otherwise a change to the file it reads checks too little here, and CI is the first to fail. `tools/reads.test.mjs` finds the paths a package spells out that leave its folder (imports, `?raw` stylesheets, paths joined onto `import.meta.dirname` or a URL) and fails when a change to one wouldn't check the package that reads it. It can't see a path built from a variable (core's tests reading `${root}/README.md`, the stories' main.ts serving each guide's fonts), a path to a folder, or a tsconfig's paths, so code that reads like that adds its rule by hand.
- **Caches.** Each package's lint runs with ESLint's `--cache` (keyed on each file's content, in the package's `node_modules/.cache/eslint`). A cached result is keyed on the config too, and `eslint.config.js` puts in its settings a hash of what else the lint reads, core's stylesheets and the lockfile, so a change to either lints every file again. `tsconfig.base.json` sets `incremental`, with each package's build info in its `node_modules/.cache/tsbuildinfo`: a typecheck rechecks what changed since the last, and the `tsc` in a guide's `build`, which repeated its typecheck in full, now takes a moment. CI starts with none (its cache is pnpm's store). Vitest's experimental `fsModuleCache` gains nothing here (a guide's tests 13.2 to 13.7 s with it, 13.7 s without: transforms are 4% of the time) and Vite keeps no build cache. To start cold, delete a package's `node_modules/.cache`.
- **Measured** on this Mac (8 cores, 16 GB) on 19 Nov 2026 with `tools/measure.mjs`, each run alone and through q's queue. Before is `main` at a0154fd (#78's cap on Chromes already in), where every check was the full one whatever it changed; after is this change, the change-sized runs with `--base` on its own commit. Each cell: wall time, the peak 1-minute load, the peak RSS of the run's processes, its most Chrome processes at once, and how far the swap grew. The load is an average over a minute that carries the run before's tail: the after runs went back to back and started at a load of 4 to 23.

| Run | Before | After |
| --- | --- | --- |
| full check, cold (no caches) | 205 s, load 155, 5.9 GB, 14 Chrome, swap +1.3 GB | 130 s, load 22, 4.5 GB, 10 Chrome, swap +0 |
| full check, warm | 205 s, load 89, 5.8 GB, 14 Chrome, swap +0.8 GB | 121 s, load 36, 4.1 GB, 9 Chrome, swap +0 |
| a core change (every package) | the full check | 104 s, load 21, 4.4 GB, 9 Chrome, swap +0 |
| one guide's data (Lordran) | the full check | 20 s, load 23, 2.2 GB, no Chrome, swap +0 |
| Koholint's data (the guide and the stories) | the full check | 65 s, load 23, 3.8 GB, 9 Chrome, swap +0 |
| docs alone | the full check | nothing to check, 0 s |
| the stories alone (`pnpm -C packages/stories test`) | 85 s, load 17, 3.8 GB, 16 Chrome | 53 s, load 5, 2.8 GB, 9 Chrome |

  Where the full check's time goes now: lint and typecheck about 20 s cold and 10 s warm, the guides' jsdom suites two at a time (about 22 s each), then the stories alone for about 55 s at a low load, and the builds.

## What the tests hold every guide to

Core's suites run against each guide:

- **`data.test.ts`**: chapters in order, unique row ids, known categories, https sources with labels, missables backed by two hosts, Next up and completion behaviour.
- **`progress-state.test.ts`, `store/progress.test.ts`, `actions.test.ts`**: saves round-trip, bad input is refused or cleaned, undo restores exactly, storage failures are survived.
- **`theme.test.ts`**: the palette's keys and contrast in both themes ([house-style.md](house-style.md#the-palette)).
- **`App.test.tsx`**: the main flows in the guide's layout. It ticks and saves, reveals chapters, uses Next up, bulk check and undo, the checklist and the dashboard, and asks the browser to keep progress after a tick, not on load, with the dashboard's line when it hasn't agreed.
- **`MissablesStrip*.test.tsx`**: the strip with and without flagged rows.
- **`overall.test.tsx`**: the overall figure is 0 with nothing ticked, 100 exactly when What's left is empty, under 100 while any target on the list has a row left, and untouched by rows on no target; the bar is a progressbar named "Overall completion", read as the figure shown, in the rail outside the chapters' nav ([core.md](core.md#overall-completion)).
- **`persistence.test.ts`**: storage is asked to stay on the first tick in that tab, not for another tab's tick, at most every 30 days, and never with an error ([core.md](core.md#keeping-storage)).
- **`deploy.test.ts`**: the app's `vercel.json`, the same in every app, and core's page template, held to the pitfalls in [deploying.md](deploying.md#pitfalls), the `/api` route and its place before the catch-all, and a long cache only after the file was found, among them.
- **`wiring.test.ts`**: every guide is listed where it has to be outside its folder: CI's lighthouse matrix, `.claude/launch.json` (a dev entry and a `-preview` entry, on its package, no two servers on one port) and the root README's apps table ([adding-a-guide.md](adding-a-guide.md#4-wire-it-into-the-repository)). The stories' `GUIDES` and the sync API's have tests of their own, in `packages/stories` and `services/sync`.
- **`icons.test.ts`**: the icons the page links and the manifest lists are in `public` at the sizes they declare, the Apple and maskable icons are opaque, `favicon.ico` holds 16 and 32px frames, the top bar's brand tile is opaque squares at 40, 80 and 120px, and `public/icons/favicon.svg` is the guide's tab drawing ([house-style.md](house-style.md#icon)).
- **`icon-versions.test.ts`**: a changed icon file gets a new URL and the same bytes the same one, and the page, the manifest (icons, shortcuts' icons, screenshots) and the top bar's tile name only versioned URLs, each with its file's hash ([core.md](core.md#the-installed-app)).
- **`sync/*.test.ts`, `SyncScreen.test.tsx`**: sync, from the ledger's merge to the screen ([core.md](core.md#syncing-devices)). `cycle.test.ts` runs two simulated browsers against the real API handler on an in-memory store, so the guide and the API are tested against each other. `ledger.test.ts` holds core's ledger equal to the API's.

Each guide's own `guide.test.ts` adds its totals, its legacy saves, its extra state (and how that syncs), its nine storage keys and, in a guide with builds, its leaning ids.

## Stories

`packages/stories` holds Storybook for core's components. A story is a component in one state; every component gets stories for every state (default, hover or focus where it matters, disabled, invalid, empty, long text). A new component or a new look isn't done without them.

- **See them:** `pnpm --filter hundo-stories storybook` (port 6006), or `preview_start` with `storybook` (port 6600). The toolbar's Guide and Theme switch the palette, fonts and corners, the same things a guide sets. The stories read Koholint's chapter data whichever guide is chosen: only the look changes.
- **Test them:** `pnpm test` in `packages/stories` (and so `pnpm check`, for a change that reaches the stories) renders every story in Chrome and runs axe on it, once for each guide in `.storybook/ids.ts`'s `GUIDES`, in light and dark: ten looks. One Vitest project, `stories`, holds one test per story, and the test renders its story in each look in turn (`.storybook/every-look.ts`, below). A plain Node project beside it, `guides` (`src/guides.test.ts`), fails when `GUIDES` isn't the folders in `apps/` that hold a `vercel.json`, so a new guide can't go unrun. A violation fails the run, colour contrast included, because the CSS is really processed. To run one file: `pnpm -C packages/stories exec vitest run --project stories Button`.
- **Every look in one test.** Storybook's Vitest plugin turns each story into a test that calls its `testStory`. A plugin in `vitest.config.ts` sends a story file's import of it to `every-look.ts`, which calls Storybook's own once per guide and theme with the pair as the story's own globals (they win over every other source when Storybook composes a story). Before each look it empties the page's storage and moves the mouse off the page; Storybook unmounts the look before; axe checks each (the a11y addon's `afterEach`). A failing look doesn't stop the others: the test fails at the end with each failing look named (`2 of 10 looks failed: rdr, dark: …`). A look still rendering after a minute (`LOOK_LIMIT` in `ids.ts`) stops the test there, named. A story can't set its own guide or theme: it runs in all ten.
- **The guard:** `Foundation/Palette` fails if a look isn't really the guide and theme `every-look.ts` set for it (its `--primary`, the button's fill and text, the corner preset and the font), or if `every-look.ts` didn't run at all. Without it the axe checks could pass on a page with no CSS, or ten times on one look.
- **Chrome:** the tests use the system Google Chrome (`channel: "chrome"`, as `shoot.mjs` does) and don't download a browser. CI relies on the runner having one.
- **One Chrome, two story files at a time.** There used to be a Vitest project per guide and theme, each with its own Vite server and its own Chrome (up to 74 Chrome processes and 7.4 GB with Vitest's default of 7 workers; #78 capped that at two Chromes, `maxWorkers: 2`). Now there's one server and one Chrome, and `maxWorkers: 2` in `vitest.config.ts` runs two story files at once, each in its own page. Measured on this Mac on 19 Nov 2026, `pnpm -C packages/stories test` alone and queued, the same 2,031 story renders each time: ten projects with #78's cap, 85 s, 16 Chrome processes, 3.8 GB at the peak; one project, 53 s, 9 processes, 2.8 GB. One page at a time took 96 s and 2.6 GB, so two it is. Don't set `VITEST_MAX_WORKERS` in a shell or CI step: it overrides the config for every package's tests.

- **axe's `target-size` is off unless a story asks.** axe-core ships the rule disabled (Lighthouse turns it on), so a story that holds small links or boxes close together turns it on for itself: `parameters: { a11y: { test: "error", config: { rules: [{ id: "target-size", enabled: true }] } } }`, as `LineChip.stories.tsx` does, beside a measurement of the real boxes (the rule's own message names a box by its size, not by which neighbour covers it, and the rule leaves out a link inline in a sentence, which only a measurement of the story's own holds).
- **Exempting a story** from axe takes `parameters: { a11y: { test: "todo" } }` on that story, with a comment saying why. Don't turn the check off for a whole file.
- **The dependency cache.** Vite pre-bundles the dependencies the stories use and keeps them in `packages/stories/node_modules/.cache/storybook`. A run with that cache empty is fine. A run with an old cache, after someone imports a Base UI part core didn't use before, used to fail with "Vite unexpectedly reloaded a test": the new part was found while tests were running, and the guide x theme projects of the time all started at once. `.storybook/main.ts` now lists every `@base-ui/react/...` part core imports (read from core's source, so there's no list to keep), which also changes the cache's key, so a new part is bundled before the first story loads. Tested with a throwaway component importing a new part: without the list, the run fails; with it, it passes.
- **Lazy parts are loaded first.** The dialog and the select load on use ([core.md](core.md#loaded-on-use)), so `.storybook/preview.tsx` has a loader that loads them before each story renders, and `src/test/setup.ts` does the same before a jsdom test; otherwise axe and the tests would be checking the stand-in. A new lazy part goes in `components/chunks.ts`, and both pick it up. `loading.test.tsx` tests what shows while a chunk is on the way, with a mocked `chunks`.
- **No Tailwind classes in a story.** Tailwind only reads core's `.tsx` files, so a `className="flex gap-3"` in a story renders unstyled and raises no error. Lay a story out with inline `style`, as `Button.stories.tsx` does, or use core's own components.
- Nothing in `packages/stories` reaches a guide's bundle, and a change to the stories alone doesn't rebuild a guide on Vercel. A change to the package's dependencies does, because it rewrites `pnpm-lock.yaml`, which each guide's ignore command watches, and so does the sync API's (`hundo-api`, `services/sync/scripts/vercel-ignore.sh`, which also watches the root `package.json`). Every guide's Vercel install and the API's (`pnpm install --frozen-lockfile`) also install the whole workspace, Storybook included; no browser is downloaded.
- The pnpm workspace's `allowBuilds` records that esbuild's install script isn't run: an unanswered one makes `pnpm install --frozen-lockfile` exit 1.

## Lighthouse

CI's `lighthouse` job audits each guide's production build with Lighthouse on every pull request and every push to `main`, beside the four checks, and its `lighthouse-home` job the landing page's (`home/`). A regression fails the pull request, as an axe violation in the stories does.

**What runs.** One job per guide (the `guide: [...]` matrix in `ci.yml`, which `wiring.test.ts` holds to the folders in `apps/`), about three minutes each on GitHub's runner with the install and the build, so the guides don't share a CPU and one failing doesn't stop the others. Each one builds its guide (`pnpm --filter hundo-<name> build`), serves `dist` with `vite preview` inside the runner, and runs Lighthouse CI (`@lhci/cli`, pinned at 0.16.1 in the root `package.json`, which pins Lighthouse 13.6.0) on the runner's own Google Chrome. The job prints Chrome's version, and the summary names its major version: the runner image updates it, so a jump in every number at once can be a new Chrome. `lighthouse/run.mjs` does all of it, and `pnpm lighthouse` runs that same script on a laptop.

- **Pages:** `/guide/1`, `/checklist` (the heaviest page: Red Dead's has 307 rows) and `/dashboard` (Progress) on a phone, which is Lighthouse's default (a 412×823 screen, a slow 4G network and a four-times-slower CPU, all simulated), and `/checklist` again on a desktop. The desktop run's URL ends in `#desktop`: the app ignores the hash, and Lighthouse CI keeps it in the URL it groups runs by, which is how the thresholds tell the two apart.
- **Runs:** three of each, so twelve per guide. Every run starts from an empty save: a reader with half of Red Dead ticked is never measured.
- **The landing page** (`pnpm lighthouse home`, CI's `lighthouse-home` job) is one page, `/`, three times on a phone and three on a desktop (`/#desktop`). Its speed limits are its own (`:\d+/$` in `lighthouserc.mjs`), the desktop's are the guides' desktop limits, and the scores are held to 100 like every page. `pnpm lighthouse` with no names adds it when the change touches `home/`.
- **Not audited here:** Vercel's headers and CDN (`vite preview` sends no CSP, so a CSP violation never shows as a console error here: [deploying.md](deploying.md#preview-first) covers headers on a preview), the service worker's offline mode and the manifest (Lighthouse 13 has no PWA category any more; the `guide-deploy` skill checks them), Lighthouse's new agentic browsing category, and byte budgets, which there are none of on purpose.

**What it's held to.** `lighthouse/lighthouserc.mjs`, whose comments give each number's reason:

| Assertion | Pages | Threshold | Runs it reads |
| --- | --- | --- | --- |
| Accessibility | all | 100 | the worst of three |
| Best practices | all | 100 | the worst |
| SEO | all | 100 | the worst |
| Performance, largest contentful paint, total blocking time, cumulative layout shift | each page | its own floor and limits, set from the guide that does worst on that page on GitHub's runner, with a margin for its noise (the comment at the top of `lighthouserc.mjs` gives each margin) | each metric's median over the three (`median`, not `median-run`, which can assert the slow run) |

Every accessibility audit counts, axe's `target-size` (WCAG 2.2's 24px targets) included. It once failed on main for two reasons, both fixed in core on 16 Nov 2026: rows passing under the phone's tab bar at the fold, which axe counts as covered by the bar's links while the bar is `sticky` but not once it is `fixed` ([core.md](core.md#the-installed-app)), and What's left's 22px category links on Progress, now 24px.

**A new guide** is audited from its first pull request, against limits set from the guides that did worst, so it can fail them. Run `pnpm lighthouse <name>` before asking for the push. If it fails, fix the guide (its banners' weight and its fonts' size are where to look first, and the report's diagnostics say where the time went), and never loosen a threshold to let it through: a threshold change is the user's call, through the opener.

**Run it locally.** At the root:

```bash
pnpm lighthouse
```

```bash
pnpm lighthouse rdr,echoes --no-build
```

The first builds and audits the guides whose own files this checkout's change touches (`guidesOf` in `tools/scope.mjs`: a change to the sync API or a story audits nothing), about two minutes each on an M-series Mac; a change to core or the root's files alone stops it with a line asking for names, since CI's job audits each guide anyway, and `--all` audits every guide. The second audits two guides' existing `dist`. It queues behind other sessions' checks and heavy jobs and prints its table at the end of the log the verdict line names, so run it in the background ([Heavy jobs share the Mac](#heavy-jobs-share-the-mac)); `HARNESS_QUEUE=off pnpm lighthouse` runs it at once, printing as it goes. It uses the system Google Chrome (`CHROME_PATH` names another) and leaves the reports in `.cache/lighthouse/<guide>/report`, one HTML and one JSON per run, named after the page and its hash (`checklist-desktop-…` for the desktop runs, `-unknown-` where a phone run has no hash), and `manifest.json` listing them (its `isRepresentativeRun` is Lighthouse CI's pick for `median-run`, not what's asserted). It isn't part of `pnpm check`, which stays fast. A laptop is usually faster than the runner: the table's `cpu` column is Lighthouse's benchmark of the machine (about 3,200 on an M-series Mac; on GitHub's runner 2,200 to 2,500 on 16 Nov 2026, and 2,300 to 4,400 a day later, so it depends on the machine the job lands on), and speed numbers from a faster machine pass more easily. TBT shows it most: Red Dead's first chapter blocks for about 90 ms on the Mac and about 320 ms on the runner.

**Read a failure.** The job log, and the run's summary page, end with a table of each page's numbers as the assertions read them: the median of its runs for performance, LCP, TBT, CLS and `cpu`, the worst run for accessibility, best practices and SEO. Then one line per failed assertion: `<guide> <page>: <audit>: <rule>, was <value>`. The run's artifacts hold `lighthouse-<guide>`, every run's report, for 14 days: open the HTML for the page that failed.

- **Accessibility, best practices or SEO:** these don't depend on the machine. The report names the element and the audit. Fix the page.
- **Performance, LCP, TBT or CLS:** look at `cpu` first. Far below the runner's usual 2,300 or more means a slow machine (a run at about 1,650 was seen on 16 Nov 2026, its TBT more than twice the others'): rerun the job. If it fails again at a normal `cpu`, the change made the page slower. The report's diagnostics say where the time went.
- **A threshold that needs to move** moves in `lighthouserc.mjs`, in the pull request that needs it, with its reason in the comment beside it and the user's go.

Checked on an M-series Mac on 16 Nov 2026, against the first limits (before the runner's numbers moved them), with `pnpm lighthouse koholint` and uncommitted edits reverted afterwards: an image without `alt` added to the page template and a 400 ms busy loop at start-up, built into Koholint, failed accessibility, SEO, performance and TBT on all four of its pages (and LCP on three) and exited 1. The same run on main's code passed.

## Heavy jobs share the Mac

Several sessions work on this Mac at once, a worktree each, and a browser job is heavy. On 19 Nov 2026 around 03:55 the load average was 198 to 263 on 8 cores, swap was 7.7 of 9.2 GB used (666k pageouts) on 16 GB of RAM, and headless Chrome held about 4.7 GB in 25 renderers: a child's `pnpm check` was running the stories' browser tests while Lighthouse and screenshot sweeps ran beside it. The desktop app's harness pane, whose module has 10 seconds to start, reported an error naming a file that was not the cause. The same overload most likely caused the CI flake on #66, "Failed to connect to the browser session … within the timeout" for three stories projects. What keeps it down:

- **The stories run in one Chrome**, two story files at a time ([Stories](#stories)).
- **A local check runs only what the change reaches** ([What pnpm check runs](#what-pnpm-check-runs)), with ESLint's and TypeScript's caches, and two packages' tests at a time.
- **The browser jobs pick the guides whose pages the change can change.** `shoot.mjs` without `--apps` shoots those, with Koholint, Red Dead and Echoes beside them when the change reaches every guide (core, the root's files), and `pnpm lighthouse` without names audits those (and asks for names when the change is to core or the root's files alone). `--all` takes every guide.
- **Heavy browser jobs queue.** The `check` already waits its turn in a machine-wide queue (`[checks] queue = true`, `harness/queue.ts`). These jobs stand in the same line, so one heavy thing runs at a time whichever worktree it is in:

| Job | Queue name | How |
| --- | --- | --- |
| `pnpm lighthouse` | `lighthouse` | queues itself |
| guide-check's `shoot.mjs`, `tab-switch.mjs`, `tab-trace.mjs`, `reveal-probe.mjs`, `sheet-probe.mjs` | the script's name | queue themselves |
| `pnpm screenshots` | `screenshots` | `bun harness/q.ts --queue screenshots -- pnpm screenshots [app,…]`: its script is in core and its entry is the root `package.json`, which every guide's Vercel ignore command watches, so wiring it into the script would rebuild every guide on the next merge |
| guide-check's `sim-tabs.mjs` | none | not queued: it serves a page and waits, for as long as it takes, for someone to open it in the Simulator, and a queue that held that would hold every `check` behind it. Shut down only the Simulator you booted, once the walk has reported |

A script queues itself with two lines after its imports, `import { queueSelf } from "…/tools/queued.mjs"; await queueSelf("<name>")`. `tools/queued.mjs` runs the script again through `bun harness/q.ts --queue <name> -- …` (with the arguments and the folder it was started from), so:

- **It can wait for minutes.** A line on stderr names who holds the place (its name, repository, folder and pid, how long it has run, its limit and what is left of it) and says it again every five minutes, so a stuck holder shows in the output of whoever waits. `bun harness/q.ts --queue-status` prints the holder and the waiters, writing nothing. Run the job in the background: a foreground Bash call is capped at 10 minutes, wait and job together, and a call that times out loses its place.
- **A job has a time limit, 30 minutes.** The queue frees a place only when its holder dies, so a job that hangs holds it for every session behind it: on 19 Nov 2026 a Playwright probe, run as `bun harness/q.ts --queue shots -- node livesync.mjs`, waited 52 minutes for the body of a fetch that never answered, and a `check` and a screenshot sweep waited behind it for 40. Past the limit q sends SIGTERM to the job and to everything it started (a browser it launched included), SIGKILL ten seconds later to what is left, gives the place up and prints `<name>: FAILED (timed out after 30min, exit 124)` with the log's path: the log's last lines say where it was. A `check` that times out stamps nothing. The clock starts with the job, not with the wait, and a job inside a queued command has no limit of its own unless it passes `--limit` (its holder's covers it). `[checks] queue_limit` in `harness.toml` moves it for the project (minutes, 0 for none), `--limit <minutes>` for one run: give a probe of your own a short one, `bun harness/q.ts --queue --limit 10 <name> -- node <script>` (minutes may be fractions), and a script that can take longer than 30 minutes passes its own, `queueSelf(name, { limit })`: `pnpm lighthouse` asks for 45 when it audits more than three guides (six take 15 minutes or more on a quiet Mac, longer on a shared one). A holder still there past its limit, which `--queue-status` and the waiting line say, is a q that couldn't stop its command (or a Mac that slept through it): the next waiter takes the place itself at an hour, or at the holder's limit and two minutes when that is longer, so nobody needs to kill anything.
- **The output is in the log.** q keeps it in `.cache/logs/<name>-<time>-<pid>.log`, prints one verdict line ending with that path, then the log's last 50 lines: Lighthouse's table and a probe's numbers are there. The exit code is the job's.
- **When it doesn't queue.** In CI (`CI` is set: no bun, no one to share with), with `HARNESS_QUEUE=off`, inside a command that already holds the queue (a `check`, or the `bun harness/q.ts --queue … --` line above), and where bun or `harness/q.ts` isn't there. The job then runs as it always did and prints as it goes.
- **A stopped job gives its place up.** A signal sent to the script reaches q, which stops the job and releases the lock. Where `bun` and `node` are shims (Volta's), the module starts bun's own executable, and watches the `node` shim it runs under, because stopping a shim alone, which is the pid a caller holds for `node …`, would leave q and its job running (or waiting, to start later) with nobody to stop them.

`tools/measure.mjs` measures what a run costs the machine: `bun harness/q.ts --queue measure -- node tools/measure.mjs --label <name> -- <command…>` prints its wall time and the peaks, the 1-minute load, the RSS of its process tree, its Chrome processes and how far the swap grew (`--out <file>` keeps the samples). It measured the numbers in this file. Read the load it started at: a run on a busy machine measures that too.

What the queue doesn't hold: the dev and preview servers, the browser pane, `preview_start`, and anything run outside q. A job started by hand with `node` still queues (the scripts above do it themselves), and one started inside another session's queued command shares its place.

## In a browser

The tests don't see layout, fonts, colour or how a page reads. Look at every visible change in a browser before calling it done. The `guide-check` skill (`.claude/skills/guide-check`) scripts what follows. It builds, serves and screenshots each guide at 1280×860, 768×1024 and 375×812 in both themes, and makes a before/after page. The tablet size is there because 551 to 800px has its own layout (the drawer, and the top bar at its tightest, where the pages' icons wrap away and the brand's name gives way), between a phone's tab bar and the desktop; there the hero and the article follow their own width, as on a desktop.

### Start a guide

`.claude/launch.json` has one entry per guide, for Claude's browser pane (`preview_start` with the name):

| Name | What | URL |
| --- | --- | --- |
| `koholint`, `rdr`, `echoes` (a new guide takes the next band, 5500 and 4500) | dev server | http://localhost:5200, 5300, 5400 |
| `koholint-preview`, `rdr-preview`, `echoes-preview` | production build, then `vite preview` | http://localhost:4200, 4300, 4400 |

Those are the ports when nothing holds them. Read the port from `preview_start`'s result.

By hand:

```bash
pnpm --filter hundo-echoes dev
```

```bash
pnpm --filter hundo-echoes build && pnpm --filter hundo-echoes preview
```

Check a release-bound change on the production build. Dev mode skips the service worker and serves unbundled modules.

A session the app opened in its own worktree ([CLAUDE.md](../CLAUDE.md#sessions-and-worktrees)) runs its servers there ([which folder](#which-folder-the-pane-serves)), so two of them can preview the same guide at once. Every entry has `"autoPort": true`: when its port is taken, the pane starts the server on the next free one, up to 20 above it, and says so in the result. The dev entries pass `--port` and the pane rewrites it. The preview entries run a shell string, where the pane can't rewrite a flag, so they read `$PORT`, which the pane sets to the port it chose; `${PORT:-<port>}` falls back to the entry's own port where nothing sets it. Each guide's port sits 100 from the next, so a busy port moves a guide up within its own band and never onto another guide's.

That matters because the pane keeps each origin's service worker and caches between sessions. A port that once served another guide, or an older build, can answer in place of the build you just started: the page is the wrong guide, or last week's. Unregister it from the page and reload:

```js
for (const r of await navigator.serviceWorker.getRegistrations()) await r.unregister();
for (const k of await caches.keys()) await caches.delete(k);
location.reload();
```

To see what holds a port, `lsof -nP -iTCP:<port> -sTCP:LISTEN`.

### Which folder the pane serves

`preview_start` reads `.claude/launch.json` from the folder the session works in, starts the entry's process with that folder as its working directory, and expands `${workspaceFolder}` to it. For a session the app opened in a worktree, which is what `[session] worktrees = true` gives every child the desktop app opens, that is the worktree, so what it serves is its own code. Checked on 15 Nov 2026 from such a session:

- an entry added only to the worktree's `launch.json` was found and ran, and saw the worktree as `${workspaceFolder}` and as its `pwd`;
- `koholint` (dev) and `koholint-preview` (production build) listened with the worktree's `apps/koholint` as their cwd;
- a file added only to the worktree's `apps/koholint/public` came back 200 from both, and 404 from a `vite` run in the main checkout.

A session the app opened in the main checkout gets main instead (`get_session` shows `cwd: /Users/max/code/hundo` and no `worktreePath`). That holds even when it works in a worktree it made with `git worktree add`: the app's code picks the session's worktree or its own folder, and a hand-made worktree is neither (read in the app's code, not run). A session working in a worktree reported this on 15 Nov 2026: `lsof` put its servers in `/Users/max/code/hundo/apps/koholint`. The page looks fine either way, so it's easy not to notice. Not tried: a session that moves into a worktree with `EnterWorktree`.

Check before trusting a page. `preview_list` prints each server's `cwd`, or ask the process: `lsof -a -p $(lsof -nP -iTCP:<port> -sTCP:LISTEN -t | head -1) -d cwd`. It has to be the worktree you edit in.

When it isn't, serve the worktree yourself from the worktree. Build into a folder of your own, so the worktree's `dist` (and any server on it) stays as it is, then preview that folder on a free port:

```bash
cd <worktree> && pnpm -C apps/<name> exec vite build --outDir <scratchpad>/<name>-dist --emptyOutDir
```

```bash
cd <worktree> && pnpm -C apps/<name> exec vite preview --outDir <scratchpad>/<name>-dist --port <free port> --strictPort
```

Open `http://localhost:<free port>` in the pane with `navigate`. A free port: `node -e 'const s=require("net").createServer().listen(0,()=>{console.log(s.address().port);s.close()})'`. `vite build` skips the `tsc` that `pnpm build` runs, so the typecheck stays with `pnpm check`. Both commands were run this way on 15 Nov 2026, and the marker file from the list above came back 200 on the port, with the worktree's `dist` untouched.

`shoot.mjs` needs none of this: it builds and serves `--root` (the folder you run it from unless told otherwise), so from a worktree it shoots that worktree, and from any other folder `--root <worktree>` points it there.

### What to look at

Do each of these on desktop, on a tablet width (768) and on a phone-sized viewport, in light and dark. The pane's `mobile` preset in `resize_window` is 375×812, and the browser's device toolbar works too. Any phone width from 375 to 390 will do.

1. **The page you changed**, and the guide, checklist and progress pages if the change is in core.
2. **The theme:** the sun or moon in the header switches it from 551px up (on a phone it's in Guide settings, Appearance), and the choice is saved under `<storagePrefix>.theme`. With nothing saved, the page follows the system setting.
3. **Fonts and banner:** both fonts load (not the fallback), and the chapter banner shows with its art on the right fading towards the words, or, where the hero is under 40rem wide (a phone, a small tablet), stacked above them and fading into the card.
4. **No sideways scroll on the phone.** `document.documentElement.scrollWidth <= innerWidth` in the console should be `true`.
5. **No console errors.**
6. **Progress:** tick a row, reload, and it's still ticked. The undo toast undoes it (on a phone it sits above the tab bar).
7. **On a phone:** the tab bar marks the current page and a press on it takes the page to its top; the checklist's Filters button opens the sheet, which filters, counts what's on, and closes on Escape, a press outside, its button and a swipe down, with the focus back on the button.

For a core change, do this in an article guide (Koholint or Echoes) and in Red Dead, the checklist layout. For a visual change, take before and after screenshots of the same pages and compare them side by side.

**A larger default text size.** A change to sizes, the type scale or the frame's widths gets a look at a 20px default too (Chrome's and Brave's "Large"). Emulate it with CDP, `Page.setFontSizes({ fontSizes: { standard: 20 } })` (Playwright: `context.newCDPSession(page)`), which moves rem sizes and em media queries both, as the setting does. `html { font-size: 20px }` moves only the rem sizes, not the widths ([core.md](core.md#styles), sizes in rem).

**A change meant to look the same** (a refactor of sizes or class names) is checked pixel for pixel: production builds before and after, full-page shots compared exactly, and a dump of every element's computed size, position and spacing compared line for line, with a dialog, the drawer, the sheet, a select and a tooltip opened as well as the pages. Chrome's raster isn't the same twice by default: gradients over the banner and rounded corners came out differently between two runs of the same build. These launch flags made 36 shots identical across runs: `--disable-gpu --disable-gpu-rasterization --disable-partial-raster --disable-skia-runtime-opts --force-color-profile=srgb --disable-lcd-text --num-raster-threads=1`. Shoot the same build twice first, to be sure any difference is the change's.

### Clean up

Testing writes to the guide's localStorage on `localhost`. When you're done, remove what you added (`localStorage.removeItem("<storagePrefix>.v1")`, and `.theme` and `.persist`), so the next check starts blank.

### In the iOS Simulator

The installed iPhone app can be run on the Mac, in a real iOS WebKit, with Xcode (the free app from the Mac App Store, then `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer` and `sudo xcodebuild -license accept`, both needing the user's password) and an iOS runtime. On 15 Nov 2026 that was Xcode 27.2 with iOS 27.2 (`xcrun simctl list devices` lists iPhone 18 Pro, 17, 17e, Air). Xcode 27 lists the iOS 26.3 runtime as unavailable, so an older iOS, such as the owner's 18.7, can't be had this way: check what only 18.x does on a phone.

1. Serve a production build of the guide on the Mac (`pnpm --filter hundo-koholint build`, then `pnpm exec vite preview --port 4220` in the app's folder). The Simulator reaches the Mac at `localhost`, so no Wi-Fi address and no `--host`.
2. `xcrun simctl boot <udid>` (take the id from `simctl list devices`), then the iOS Simulator tool (`mcp__Claude_Code_iOS_Simulator__control`, its `attach` opens a live panel) to tap, swipe, screenshot and `set_appearance`. The first use of a device asks the user for permission.
3. In Mobile Safari open the guide (`xcrun simctl openurl <udid> <url>`, or typing it), then the address bar's menu, Share, View More, Add to Home Screen, leave "Open as Web App" on, Add; Home, find the icon (it lands on the last Home Screen page) and open it: it runs standalone, which is what the installed app is. The first Add to Home Screen sheet takes about ten seconds to enable its Add button.
4. The Simulator is slow: a tap's result shows two to six seconds later, so wait before a screenshot, and read one that shows nothing as "not yet" before calling it a failure. Menus have a different layout in light and dark appearance and between pages, so look before tapping.
5. To read a colour from a screenshot, sample the file (it is 1206×2622 for an iPhone 18 Pro), as `sharp` can: a screenshot of the status strip, the top bar and the page gave `rgb(255,254,249)` (the surface), `rgb(255,254,249)` and `rgb(246,245,238)` (the paper).

What the Simulator showed for the installed app on 15 Nov 2026 (in light; in dark only the page, the top bar and the status strip were looked at, not the dialogs): the frame fixed and only the main area scrolling; the top bar's Back button after a move (since removed); a dialog centred above the on-screen keyboard with the Back button of the code screen in view and the code field's ring whole; no focus ring after a touch; the toast clear of the home indicator. What it showed that is not as wanted: the status strip (see [core.md](core.md#the-installed-app)). What it did not show: the page bouncing (a pull can't be held and photographed through the tool) and iOS 18.

### Sync in a browser

A guide's dev and preview servers send `/api` to the local sync API, so start it first (`preview_start` with `sync-api`, or `pnpm -C services/sync dev`, port 8787 with an in-memory store that a restart empties). `SYNC_API=http://127.0.0.1:<port>` points a guide's server somewhere else, which is how two sessions each run their own pair.

Two devices need two cookie jars: the pane is one, and a second Chrome profile is the other (a `playwright-core` script with `executablePath` set to the system Chrome and a fresh context). To link them, show a code in one (settings, Sync devices, Show a code), type it in the other (Enter a code), then tick on one and, in the other, bring the page back after 10 seconds or more away (a `visibilitychange` to `hidden` and back) to see the tick arrive. localhost cookies ignore the port, so Koholint's and Red Dead's dev servers in one browser share a link, and the second guide joins by itself on opening. Linked browsers pile up as devices in the group; clear the in-memory store by restarting the API.

`home`'s dev and preview servers send `/api` there too, so hundo.quest's linked path can be tried the same way: link a second context to the first (from home's own page, a `fetch("/api/pair/claim", …)` with the code works, since on localhost the API doesn't hold home to `/api/summaries`), tick in a guide in the first, and open home in the second without opening the guide there: its band shows the first's progress from one `POST /api/summaries`. A browser without `hundo_link` makes no request. Tried on 21 Nov 2026 with `sync-api`, Koholint's and home's dev servers: a phone-sized context ticked three rows, and the pane (linked, with no `hundo_p_` cookie) showed "1% complete · Chapter 1" and Continue. With its own Koholint cookie at 57% it showed 57%, at 0% the group's 1%. A `summary: null` for a guide the group never had stored nothing, and that guide kept the pane's cookie; one for Koholint, which the group had, made the band unstarted though the pane's cookie said 57%. A context never linked made no `/api` call on home and showed its own cookie's "0% complete · Chapter 1".

### What a local check can't cover

- **The `/api` rewrite on Vercel.** Locally the dev server's proxy stands in for it. Behind the real rewrite the API gets its own host and no `x-forwarded-host` naming the guide's, while `Cookie`, `Origin`, `Set-Cookie` and the visitor's address pass ([deploying.md](deploying.md#the-sync-api)). That was seen on a preview, so a change to the rewrite or to how the API reads who is calling has to be seen on one again.
- **Safari and an installed phone app.** On 15 Nov 2026, on production, Brave on a Mac and the installed Koholint app on an iPhone were linked by a code typed on the phone, and a tick and an untick went each way (Secure cookies over https worked in the installed app). Not yet seen: linking in Safari first and then adding a guide to the Home Screen (the cookie probe's plain-http finding says it should start linked), and a direct test of two installed apps' cookie jars (the Red Dead app wasn't linked by the Koholint app's link and took a code of its own, which fits one jar per app; the Echoes app wasn't installed to try). Linking the Red Dead app on that iPhone by a typed code, and ticks both ways with the Mac, were seen on 15 Nov 2026.
- **The installed app's frame.** The pane isn't an installed app, so the mark and the notch are faked by hand ([core.md](core.md#the-installed-app)): `data-standalone` on the root and `--safe-top: 47px`, `--safe-bottom: 34px`. On 15 Nov 2026 that showed, at 375×812 and on a desktop size, in all three guides (and the top bar with Back at 820, 900, 1040 and 1041px wide in Echoes, which has the longest name), the fixed top bar, only the content area scrolling, the drawer, the toasts and the dialog clear of the faked notch and home indicator, and the Back button. On 16 Nov 2026 the same faking showed, at 375×812 in all three guides in light and dark, the tab bar as the frame's last row with the faked home indicator under its labels, and Back beside the brand in Echoes at 375px (at 360px only its tile). The top bar's Back button went the same day; after it, the same faking showed at 320, 375, 768 and 1280px in all three guides, light and dark, the theme toggle beside the save status on a phone, Echoes' name whole at 375px, ellipsized at 361px and only its tile at 320px, and the brand back beside the menu at 768px. What only a phone shows: iOS's status bar and its colour next to the top bar, the home indicator, the feel of the scroll and whether the frame bounces, the edge swipe, a field's focus not zooming the page, and what the on-screen keyboard does to a fixed frame (a known iOS risk, not tried). The page's `display-mode` path and an installed desktop window weren't exercised either: Chrome's own emulation of the media feature didn't reach `matchMedia`.
- **The service worker's offline mode.** The pane registers the service worker (it once refused to fetch `sw.js`, and an old one answering for a new build is how that shows now), but offline mode hasn't been checked in it. Check it in a regular browser, or on a Vercel preview. The update prompt does work in the pane, though it takes a deploy: on 2026-11-15 it showed on all three live guides, each open in the pane before the deploy, and its Reload brought in the new build. Since the quiet updates (`sw-updates.ts`) a reload left untouched takes the new build without the prompt; the prompt is for a build found once the page is in use. Neither path has been seen in the pane after a deploy yet.
- **Headers.** The CSP, the security headers and the cache rules come from `vercel.json` and exist only on Vercel. Check them on a preview deployment ([deploying.md](deploying.md#preview-first)).

---
name: guide-banners
description: Make or bring in a hundo guide's chapter banners (src/guide/banners/chapter-N.webp, 1800×600). Reuse what the guide's research folder already has, or generate them with Codex's image generation in one consistent style per guide, composed for the inset banner (focal detail right of centre, a quiet left). Then size them, and check them in light and dark and on a phone. Use when a new guide needs banners, a chapter is added, or a banner is redone. The prompt recipe lives here, never in a README.
---

# Chapter banners

[docs/house-style.md](../../../docs/house-style.md#banners) says how the banner is shown and cropped. This is how one gets made.

## 1. Look for banners that exist

A guide's research folder may already have them. `~/code/dragon-quest-1-hd2d-guide/assets/banners/` holds ten 1800×600 WebP files, one per chapter, with a README that lists each scene and the shared prompt. Show them to the user and ask whether to use them. If yes:

- convert each one straight from the research folder to `apps/<name>/src/guide/banners/chapter-<N>.webp`, numbered by the guide's chapters, with step 5's command. Don't copy it there first: `sharp` refuses to read and write the same file. Dragon Quest's files are about 224 KB each, above the budget, so the conversion matters;
- move the style line into the table at the end of this file, so the recipe lives here and not in a README.

Generate only the banners that are missing, or the ones the user wants redone.

## 2. Find Codex

Codex wasn't on this Mac's `PATH` when this skill was written (2026-11-14). Look first:

```bash
which codex || /bin/ls ~/.volta/bin ~/.npm-global/bin /opt/homebrew/bin 2>/dev/null | grep -i codex
```

If it isn't there, ask the user before installing it (a child sends the question to its opener), saying the package and the command (`npm install -g @openai/codex`, or `brew install codex`). Installing software is their call, and so is signing it in. Then run `codex --help`, and check that this version can generate images and how: a tool it uses inside `codex exec`, or a flag. If it can't, stop and tell the user. Don't fall back to another image service without asking.

## 3. Fix the guide's style once

Every banner of one guide shares one style line. Use the guide's row in the table at the end. A new guide gets its row once the user approves its first banner. Banners that drift in style look broken next to each other.

## 4. The prompt

Each prompt is the guide's **shared prompt** plus one **scene**. The shared prompt is this recipe, with the brackets filled in:

> Original environmental illustration for a chapter banner in a fan walkthrough for [game]. [The guide's style line.] No characters, bosses, plot reveals, glyphs, text, logos, borders, UI, watermarks or panels. Full-bleed wide landscape, one scene, ultrawide 3:1 framing. Keep the main silhouette legible when cropped to the central band, with focal detail around 70 percent of the way across and slightly below mid-height. Lower-contrast atmospheric scenery on the left third, where the page fades the art out under the title. Deliberate palette, clear shapes, inviting composition.

A scene names the chapter's place, what's in it, the light, three or four colours, and what sits right of centre. For example:

> Gerudo Desert. A domed sandstone desert settlement and stepped temple ruins amid peach dunes and red-brown cliffs, with a slender turquoise oasis and palms as a crisp accent. Amber dusk, dusty rose, copper and warm gold. Emphasise the sandstone silhouette and oasis right of centre.

Rules for scenes:

- **Places and moods, never story.** No boss, no twist, no late-game reveal. A chapter whose teaser is "Late game" gets a scene that gives nothing away.
- **Original art.** Don't ask for the game's own artwork, characters or logos, and don't name an artist.

Ask Codex for each image, and save the full-size output in the scratchpad, never straight into the repository.

## 5. Size and place

Convert with `sharp`, which is in the workspace, to exactly 1800×600 WebP. The page crops any other size to fit (`object-fit: cover`), so a different shape loses its edges:

```bash
node -e 'require("sharp")(process.argv[1]).resize(1800, 600, { fit: "cover" }).webp({ quality: 80 }).toFile(process.argv[2]).then((i) => console.log(i.size))' <in> apps/<name>/src/guide/banners/chapter-<N>.webp
```

- **Keep each file small.** The service worker precaches every banner on a reader's first visit, with the 800 and 1320px copies the build makes of it, and the existing originals weigh 0.6 to 1.5 MB for five to thirteen banners (1.0 to 2.4 MB with the copies, for the first three guides). Above about 200 KB, lower the quality and convert again.
- `config.ts` picks the banners up through `byChapter(import.meta.glob<Banner>("./banners/chapter-*.webp", { eager: true, query: "?banner", import: "default" }))`, and the build makes the copies (`packages/core/banners.ts`). There's nothing else to wire.

## 6. Check how it reads

- Run the `guide-check` skill on the guide with `--reveal`, and with `--pages` naming every chapter, such as `--pages c1=/guide/1,c2=/guide/2,c3=/guide/3`.
- **On desktop, in light and dark:** the focal detail sits right of centre, nothing important sinks into the fade, and the title stays readable.
- **On a phone:** the whole image shows above the text, and it reads as a picture on its own.
- Show the user the set before committing. `compare.mjs` with an empty "before" gives one page of shots. The look is their call.

## 7. Credit it

The guide's README says the banners are original AI-generated illustrations, as Echoes' does. The prompts stay here, not in the README or in `docs/`.

## Style lines

| Guide | Style line |
| --- | --- |
| Echoes | A cohesive, beautifully lit miniature fantasy diorama with rounded handcrafted shapes, hand-painted wood and stone, touchable moss and vegetation, soft shadows, subtle depth of field, and the warmth of a storybook. |
| Dragon Quest I (research banners) | The art direction of an HD-2D Japanese RPG: a richly layered miniature scene, deliberately pixel-crafted architectural and foliage detail, tactile stone, water and wood, atmospheric volumetric light, gentle tilt-shift depth. Restrained JRPG concept-art composition with clear silhouettes at small sizes, sincere classic medieval fantasy. No pixel-grid overlay. |
| Lordran | Restrained painterly oil realism: hand-painted environmental concept art with subtle brush texture, a muted earthy palette, soft atmospheric light and grounded proportions. Empty places, no characters or bosses. Keep the overall image mid-toned and readable, never near-black. |
| Hallownest | Hand-inked painted environment, layered parallax, dark silhouette edges, graphic 2D shapes, subtle grain; empty places, no characters. |
| Pharloom | Hand-painted 2D environment, inked edges, layered silhouette depth, saturated regional palette, subtle texture; empty places, no characters. Bold dark ink outlines, with near-black foreground silhouettes framing the bottom and the edges; the rest mid-dark and readable, never near-black, never soft or misty. |
| Basement | Hand-drawn horror-comedy environment: chunky, slightly irregular black ink outlines, simplified rounded shapes, muted gouache fills on worn paper, restrained dimensional shading; empty places, no characters. |
| Koholint, Red Dead | not recorded when their banners were made |

## Basement scenes

The two shared prompts below, then one scene per chapter. These are interpretive environments and still lifes, not floor maps.

### Shared prompt for chapters 1, 2, 3, 5, 7 and 8

Use case: stylized-concept. Asset: original environmental chapter banner for a fan completion guide to The Binding of Isaac: Repentance. Cohesive hand-drawn horror-comedy environment: chunky slightly irregular black ink outlines, simplified rounded architectural shapes, muted gouache fills on worn brown paper, tactile cardboard and dusty stone, restrained dimensional shading, graphic readable silhouettes. Feels like an illustrated dungeon from Isaac, not realistic gothic fantasy and not a pixel-art screenshot. Full-bleed ultrawide 3:1 landscape, one continuous place, not a collage or multiple panels. Slightly elevated room-level perspective. Focal detail around 70 percent across; quiet lower-contrast left third for a title fade. Important forms survive a central horizontal crop. Midtones stay readable; never near-black overall. No people, characters, creatures, bosses, bodies, faces, portraits, text, glyphs, numbers, UI, border, watermark or game logo. Do not add plot reveals. Interpretive artwork, not an accurate navigation map.

### Shared prompt for revised chapters 4, 6 and 9–14

Use case: stylized-concept. Original interpretive chapter illustration for a fan completion guide to The Binding of Isaac: Repentance. Hand-drawn horror-comedy style: chunky slightly irregular black ink contours, simplified rounded shapes, muted gouache fills, worn paper texture, tactile surfaces, restrained dimensional shading. Graphic game-like cartoon environment, not realistic gothic fantasy, not a screenshot. Full-bleed ultrawide 3:1 landscape, one scene, no panels or border. Focal detail around 70 percent across, lower-contrast left third for a title fade; important forms survive the central horizontal band. Readable midtones. No characters, creatures, bosses, bodies, faces, portraits, plot reveals, readable text, letters, glyphs, UI, watermark, game logo. Interpretive artwork, not an accurate navigation map. Do not default to a brown cellar, table, desk, high window or crates. Follow the distinct composition specified below.

### Current scenes

**1. The Basement**

An empty rough wooden basement room: warm brown floorboards, uneven stone foundation, dusty support beams, a square open trapdoor and stacked plain wooden crates to the right, a few loose stones and a single red candle. Pale light through a tiny high window, warm cardboard brown, parchment cream, charcoal and restrained brick red.

**2. The Womb**

A fantastical empty organic tunnel, walls made of rounded red and dusty rose folds with dark branching vein textures, bulbous fleshy arches and a softly lit red passage to the right. Dry stylized cartoon surfaces, abstract internal-organ environment, no gore, blood pools or anatomical body parts. Muted burgundy, terracotta, blush and a small warm ivory highlight.

**3. Cathedral and Sheol**

One empty subterranean stone sanctuary, a pale blue-grey vaulted arch and broken ivory columns on the right, floor tiles giving way to darker cracked charcoal stone in the foreground, a small cold light shaft and restrained ember-red cracks at the edge. A single unified transition between sacred and ashen dungeon atmospheres, no religious figures or faces. Dusty blue, ivory, slate and ember orange.

**4. The Chest and the Dark Room**

Low ground-level wide composition in a cold charcoal stone chamber. A single large scarlet-red wooden chest with black iron straps dominates the right foreground, seen from its corner; its lid is shut, no face or markings. Behind it, massive dark square stone columns recede into dusty indigo distance. Cracked pale grey floor tiles run diagonally toward the chest, sparse cobweb threads between columns. Burgundy red, blue-black, slate, ivory reflected light. The chest is the clear graphic subject; no warm brown timber room, no desk, no golden sunlight.

**5. Against the Clock**

An empty deep blue cavern chamber with low rounded stone walls, a pale sandy centre, an old plain hourglass on a stone ledge to the right, scattered pebbles and one dark passage receding behind it. Soft cold underground light, dusty indigo, muted cyan, sandy cream and charcoal. The hourglass is a quiet thematic prop; no clock numerals.

**6. Greed**

Steep overhead diagonal view of a square grey stone arena floor, cropped like a board-game environment. A large plain circular metal floor button sits near right-centre in a shallow ring of raised stone; a spill of oversized gold coins arcs around it and toward the lower right edge. Heavy chains enter diagonally from the upper right. Sparse coin reflections and hard gold light, dusty ochre, grey stone, olive shadows and copper. Clear circular composition, huge coins as foreground shapes. No wooden shop counter, donation box, chest, shelves, table or perspective back wall. Coin faces completely blank; no currency symbols.

**7. The Other Way Down**

An empty rain-soaked underground utility chamber: flooded blue-grey stone floor, water ripples, rusty mine rails entering a dark low arch, a simple empty minecart parked to the right, two small violet candles lighting an alcove. One coherent room that hints at an alternate descent, without revealing its destination. Steel blue, wet slate, rust brown and muted purple.

**8. Home**

An empty modest living room with dark wooden floorboards, faded cream wallpaper, an old sagging muted-brown sofa to the right, a small side table and warm lamp, a plain dark television cabinet, worn rectangular rug and an ordinary closed door. Spare domestic scene, no family photos or visible pictures, no figure in television, no supernatural reveal. Ochre, cream, dusty brown and a small red fabric accent.

**9. Notes: Isaac to Eden**

Macro still life seen at a shallow diagonal angle across an expansive creased sheet of blank ivory paper lying on a pale powder-blue floor. A single chunky red six-sided die with ivory circular pips sits on the paper in the right third, with a small brass key and a stubby yellow pencil nearby. The paper's folded edge makes a strong diagonal sweeping from lower left toward the die. Gentle broad daylight, ivory and dusty light blue dominate, small brick-red and mustard accents. An airy close-up, no visible room, walls, desk or furniture. The paper is blank and unruled; only the die pips are markings. Strong object silhouettes, not a repetitive pile of notes.

**10. Notes: Lilith to the Lost**

Wide atmospheric composition of an empty cold stone recess with a tall antique iron birdcage suspended by a chain at right-centre. Its small door hangs open; the cage contains only a loose torn white strip of fabric draped through the bars, no animal, no ghost or figure. A cluster of small blue-flame candles on the floor casts soft cyan highlights; the left dissolves into pale blue-grey stone mist. Strong vertical cage silhouette, flowing fabric as a light accent, cool silver, steel blue, desaturated cyan and ink black. Camera at cage height, thin masonry texture, no cellar timber, chest, desk, window or warm lamplight. Symbolic illustration of vulnerability, not a claimed location.

**11. Tainted Notes**

An oversized warped oval mirror is embedded upright in a jagged wall of black thorn-like roots and violet stone, right of centre. View close to the ground, a dramatic tilted oval silhouette filling the scene height. Its glass reflects only an empty dim red stone passage, no face, person or creature. Violet ink-stained floor puddles spread sideways; a torn blank cream paper sheet catches at the mirror base. Muted plum, cold lavender, black ink and restrained dusty crimson reflection. Roots frame the edges in sweeping curves. Surreal corruption theme, no tabletop, desk, chair, candle, chest or brown cellar.

**12. The Last Tainted Notes**

Very steep high-angle view across a narrow cracked stone causeway running diagonally upward toward the right over a deep muted crimson chasm. Jagged short iron spikes flank the walkway, with a safe empty strip down its centre. A few blank torn cream paper scraps caught along a crack, subtle rust-orange light rising from below. Angular strong diagonals and dark red negative space distinguish this illustration. Dusty scarlet, graphite, pale grey stone and ivory. No room-level back wall, furniture, windows, chest, mirrors, candles, people or creatures. Symbolic difficult route, not an accurate game map; readable midtones and simplified rounded ink-drawn stone.

**13. Odd Jobs**

An empty shabby arcade alcove framed by parted dusty coral-red velvet curtains, seen front-on. At right-centre stands a squat vintage slot machine with a brass body and blue side panels, one lever, three completely blank cream reel windows and a small bowl of plain coins at its base. A string of round unlettered amber bulbs curves overhead; small worn chequered tiles in muted navy and cream. Curved curtain silhouette, festive but slightly eerie, coral, dusty navy, buttery yellow and cream. No faces or symbols on the machine, no labels, price signs, numerals or writing. No brown basement, desk, chest, shelf or donation box.

**14. The Last Secrets**

Extreme close environmental view of an enormous old keyhole-shaped opening through a thick cracked blue-grey stone wall at right-centre. The round upper hole and narrow lower slot form the single bold silhouette; warm peach-gold light pours through from a softly glowing empty hidden recess beyond. A few floating dust flecks and small chips of stone, long golden beam sweeping across the dark slate foreground. Cool slate, pale turquoise, peach and soft gold, readable midtones. No key itself, treasure chest, paper, desk, windows, characters or ending imagery. A final secret threshold, understated and mysterious, not a dungeon map.

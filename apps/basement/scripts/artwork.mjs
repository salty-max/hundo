// Rebuilds the chapter exports and icon painting from the retained generation masters.
// Run from any folder: node apps/basement/scripts/artwork.mjs /path/to/masters
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const masters = process.argv[2];
if (!masters) throw new Error("Pass the folder containing chapter-1.png through chapter-14.png and icon.png.");
const app = fileURLToPath(new URL("../", import.meta.url));
const banners = join(app, "src/guide/banners");
await mkdir(banners, { recursive: true });
for (let n = 1; n <= 14; n++) {
  const source = resolve(masters, `chapter-${n}.png`);
  let buffer;
  for (let quality = 84; quality >= 56; quality -= 4) {
    buffer = await sharp(source).resize(1800, 600, { fit: "cover" }).webp({ quality }).toBuffer();
    if (buffer.length < 200000) break;
  }
  if (buffer.length >= 200000) throw new Error(`Chapter ${n} exceeds the banner budget.`);
  await writeFile(join(banners, `chapter-${n}.webp`), buffer);
}

// The frame's colour follows this guide's actual dark surface; all Hundo disks share this radius.
const theme = await readFile(join(app, "src/guide/theme.css"), "utf8");
const darkSurface = /:root\[data-theme="dark"\][\s\S]*?--surface:(#[0-9a-f]+)/i.exec(theme)?.[1];
if (!darkSurface) throw new Error("Missing dark surface colour.");
const diskMask = Buffer.from('<svg width="1024" height="1024"><circle cx="512" cy="512" r="416" fill="white"/></svg>');
const motif = await sharp(resolve(masters, "icon.png"))
  .resize(1024, 1024, { fit: "cover" }).ensureAlpha()
  .composite([{ input: diskMask, blend: "dest-in" }]).png().toBuffer();
await sharp({ create: { width: 1024, height: 1024, channels: 3, background: darkSurface } })
  .composite([{ input: motif }]).webp({ quality: 94 }).toFile(join(app, "scripts/icon-master.webp"));
console.log("Exported 14 banners and the 1024px icon painting. Run pnpm icons in apps/basement next.");

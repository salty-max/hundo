// Regenerates public/icons and public/favicon.ico from the art beside this script. Run: pnpm icons
import { writeIcons } from "@hundo/core/icons";

await writeIcons({ master: new URL("./icon-master.webp", import.meta.url), favicon: new URL("./favicon.svg", import.meta.url) });

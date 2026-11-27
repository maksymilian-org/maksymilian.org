#!/usr/bin/env node
// Converts screenshots delivered to ~/Projects/maksymilian.org/portfolio-inbox/<id>/ into optimised
// WebP files for the portfolio: names containing "mobile" become 780 px wide
// phone screens, everything else 1440 px wide desktop screens.
//
//   node scripts/import-portfolio.mjs <id> [<id> ...]
//
// Output: public/projects/<id>-<nn>-<mobile|desktop>.webp, in file-name order.

import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Lives next to the my-website checkout, outside the repo (raw files never get committed).
const INBOX = fileURLToPath(new URL("../../../portfolio-inbox", import.meta.url));
const OUT = "public/projects";

for (const id of process.argv.slice(2)) {
  const dir = join(INBOX, id);
  if (!existsSync(dir)) {
    console.log(`skip ${id}: no ${dir}`);
    continue;
  }
  const files = readdirSync(dir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort();
  let n = 0;
  for (const f of files) {
    const mobile = /mobile|phone|ios|android/i.test(f);
    const kind = mobile ? "mobile" : "desktop";
    const name = `${id}-${String(++n).padStart(2, "0")}-${kind}.webp`;
    const meta = await sharp(join(dir, f)).metadata();
    await sharp(join(dir, f))
      .resize({ width: mobile ? 780 : 1440, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(join(OUT, name));
    console.log(`${f} (${meta.width}x${meta.height}) -> ${name}`);
  }
}

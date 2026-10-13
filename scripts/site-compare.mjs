#!/usr/bin/env node
// Compares two snapshots made by scripts/site-snapshot.mjs (old vs new site) and
// prints every SEO-relevant difference.
//
// Usage: node scripts/site-compare.mjs <baseline.json> <candidate.json>

import { readFileSync } from "node:fs";

const [aPath, bPath] = process.argv.slice(2);
if (!aPath || !bPath) {
  console.error("Usage: node scripts/site-compare.mjs <baseline.json> <candidate.json>");
  process.exit(1);
}
const a = JSON.parse(readFileSync(aPath, "utf8"));
const b = JSON.parse(readFileSync(bPath, "utf8"));
const norm = (o) => JSON.stringify(o);

const fields = ["status", "title", "description", "canonical", "robots", "hreflang", "ogImage", "ogTitle", "htmlLang", "h1", "jsonldTypes"];
const problems = [];
const notes = [];

const byUrl = new Map(b.pages.map((p) => [p.url, p]));
for (const p of a.pages) {
  const q = byUrl.get(p.url);
  if (!q) {
    problems.push(`${p.url}: MISSING in candidate`);
    continue;
  }
  for (const f of fields) {
    if (norm(p[f]) !== norm(q[f])) {
      // A missing H1 that is now present is an improvement, not a regression.
      const list = f === "h1" && !p.h1 && q.h1 ? notes : problems;
      list.push(`${p.url}: ${f}\n      old: ${norm(p[f])}\n      new: ${norm(q[f])}`);
    }
  }
  const lost = p.internalLinks.filter((l) => !q.internalLinks.includes(l));
  if (lost.length) problems.push(`${p.url}: lost internal links ${lost.join(", ")}`);
  const gained = q.internalLinks.filter((l) => !p.internalLinks.includes(l));
  if (gained.length) notes.push(`${p.url}: new internal links ${gained.join(", ")}`);
  // The mobile menu is now always in the HTML (hidden), worth about 16 words per page.
  if (p.words > 0 && Math.abs(q.words - p.words) > 25 && Math.abs(q.words - p.words) / p.words > 0.1) {
    problems.push(`${p.url}: word count ${p.words} -> ${q.words}`);
  }
}
for (const q of b.pages) if (!a.pages.some((p) => p.url === q.url)) notes.push(`${q.url}: NEW in candidate`);

const sp = new Map(b.specials.map((s) => [s.path, s]));
for (const s of a.specials) {
  const t = sp.get(s.path);
  if (!t) continue;
  const same = s.status === t.status && s.location === t.location && s.type === t.type;
  // 307 vs 308 for the same target is not a functional difference.
  const sameRedirect = [307, 308].includes(s.status) && [307, 308].includes(t.status) && s.location === t.location;
  if (!same && !sameRedirect) problems.push(`probe ${s.path}: ${norm(s)} -> ${norm(t)}`);
}

console.log(`compared ${a.pages.length} pages and ${a.specials.length} probes\n`);
if (notes.length) console.log(`NOTES (${notes.length})\n  ${notes.join("\n  ")}\n`);
if (problems.length) {
  console.log(`DIFFERENCES (${problems.length})\n  ${problems.join("\n  ")}`);
  process.exitCode = 1;
} else {
  console.log("No SEO-relevant differences.");
}

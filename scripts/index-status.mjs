#!/usr/bin/env node
// Asks Search Console (URL Inspection API) how Google sees specific URLs.
// Read-only: it can tell you whether a page is indexed, but cannot request
// indexing (Google exposes no API for that).
//
// Usage: node scripts/index-status.mjs <url> [<url> ...]
//   GSC_SITE  property (default sc-domain:maksymilian.org)

import { loadKey, getAccessToken } from "./google-auth.mjs";

const site = process.env.GSC_SITE ?? "sc-domain:maksymilian.org";
const urls = process.argv.slice(2);
if (urls.length === 0) {
  console.error("Usage: node scripts/index-status.mjs <url> [<url> ...]");
  process.exit(1);
}

const token = await getAccessToken(loadKey());

for (const url of urls) {
  const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ inspectionUrl: url, siteUrl: site }),
  });
  if (!res.ok) {
    console.log(`${url}\n  ERROR ${res.status}: ${(await res.text()).slice(0, 200)}\n`);
    continue;
  }
  const r = (await res.json()).inspectionResult?.indexStatusResult ?? {};
  console.log(url);
  console.log(`  verdict:        ${r.verdict ?? "?"}`);
  console.log(`  coverage:       ${r.coverageState ?? "?"}`);
  console.log(`  last crawl:     ${r.lastCrawlTime ?? "never"}`);
  console.log(`  crawled as:     ${r.crawledAs ?? "-"}`);
  console.log(`  google canon.:  ${r.googleCanonical ?? "-"}`);
  console.log(`  user canon.:    ${r.userCanonical ?? "-"}`);
  console.log(`  robots / index: ${r.robotsTxtState ?? "-"} / ${r.indexingState ?? "-"}\n`);
}

#!/usr/bin/env node
// Pulls Search Console + GA4 data and writes a markdown report used to decide
// which blog posts to write next. Zero dependencies (node:crypto + fetch).
//
// Usage:
//   node scripts/seo-report.mjs [--days 90] [--ga-property 123456789]
//
// Config (env or flags):
//   GOOGLE_SA_KEY    path to the service-account JSON (default ~/.gsc-service-account.json)
//   GSC_SITE         Search Console property (default sc-domain:maksymilian.org)
//   GA4_PROPERTY_ID  numeric GA4 property id (optional; GA4 section skipped if absent)

import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { createSign } from "node:crypto";
import { homedir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const DAYS = Number(flag("days", "90"));
const KEY_PATH = process.env.GOOGLE_SA_KEY ?? join(homedir(), ".gsc-service-account.json");
const GSC_SITE = process.env.GSC_SITE ?? "sc-domain:maksymilian.org";
const GA_PROPERTY = flag("ga-property", process.env.GA4_PROPERTY_ID ?? "");
const OUT_DIR = ".seo-reports";

const SCOPES = [
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/analytics.readonly",
].join(" ");

// ---------- auth ----------

function loadKey() {
  if (!existsSync(KEY_PATH)) {
    console.error(`Service account key not found at ${KEY_PATH}`);
    console.error("Create one in Google Cloud Console and save it there (outside the repo).");
    process.exit(1);
  }
  return JSON.parse(readFileSync(KEY_PATH, "utf8"));
}

const b64url = (v) => Buffer.from(typeof v === "string" ? v : JSON.stringify(v)).toString("base64url");

async function getAccessToken(key) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url({ alg: "RS256", typ: "JWT" });
  const claim = b64url({
    iss: key.client_email,
    scope: SCOPES,
    aud: key.token_uri ?? "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  });
  const signature = createSign("RSA-SHA256")
    .update(`${header}.${claim}`)
    .sign(key.private_key, "base64url");

  const res = await fetch(key.token_uri ?? "https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claim}.${signature}`,
    }),
  });
  if (!res.ok) throw new Error(`Token request failed: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

async function api(token, url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    const hint =
      res.status === 403
        ? "\n  -> Is the service account e-mail added as a user in Search Console / GA4, and is the API enabled?"
        : "";
    throw new Error(`${res.status} ${url}\n${text}${hint}`);
  }
  return res.json();
}

// ---------- Search Console ----------

const isoDate = (d) => d.toISOString().slice(0, 10);

async function gscQuery(token, dimensions, rowLimit = 1000) {
  // GSC data lags ~2-3 days, so end the window 3 days ago.
  const end = new Date(Date.now() - 3 * 86400000);
  const start = new Date(end.getTime() - DAYS * 86400000);
  const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(GSC_SITE)}/searchAnalytics/query`;
  const data = await api(token, url, {
    startDate: isoDate(start),
    endDate: isoDate(end),
    dimensions,
    rowLimit,
  });
  return {
    range: { start: isoDate(start), end: isoDate(end) },
    rows: (data.rows ?? []).map((r) => ({
      keys: r.keys,
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position,
    })),
  };
}

// ---------- GA4 ----------

async function ga4Report(token, body) {
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${GA_PROPERTY}:runReport`;
  const data = await api(token, url, body);
  return (data.rows ?? []).map((r) => ({
    dims: r.dimensionValues.map((v) => v.value),
    metrics: r.metricValues.map((v) => Number(v.value)),
  }));
}

// ---------- formatting ----------

const pct = (v) => `${(v * 100).toFixed(1)}%`;
const pos = (v) => v.toFixed(1);
const path = (u) => u.replace(/^https?:\/\/[^/]+/, "") || "/";

function table(headers, rows) {
  if (rows.length === 0) return "_No data._\n";
  const line = (cells) => `| ${cells.join(" | ")} |`;
  return [line(headers), line(headers.map(() => "---")), ...rows.map(line)].join("\n") + "\n";
}

function queryRows(rows, limit) {
  return rows.slice(0, limit).map((r) => [
    r.keys[0],
    r.clicks,
    r.impressions,
    pct(r.ctr),
    pos(r.position),
  ]);
}

// ---------- main ----------

const key = loadKey();
const token = await getAccessToken(key);

console.log(`Fetching Search Console data for ${GSC_SITE} (${DAYS} days)...`);
const [queries, pages, queryPage] = await Promise.all([
  gscQuery(token, ["query"]),
  gscQuery(token, ["page"]),
  gscQuery(token, ["query", "page"], 5000),
]);

const q = queries.rows;
const totals = q.reduce(
  (a, r) => ({ clicks: a.clicks + r.clicks, impressions: a.impressions + r.impressions }),
  { clicks: 0, impressions: 0 }
);

// Striking distance: ranks 4-20, enough impressions to matter on a small site.
const striking = q
  .filter((r) => r.position >= 4 && r.position <= 20 && r.impressions >= 5)
  .sort((a, b) => b.impressions - a.impressions);

// Seen but not clicked: decent visibility, weak CTR -> title/lead problem.
const lowCtr = q
  .filter((r) => r.impressions >= 10 && r.position <= 10 && r.ctr < 0.02)
  .sort((a, b) => b.impressions - a.impressions);

// One query served by several URLs -> cannibalization candidates.
const byQuery = new Map();
for (const r of queryPage.rows) {
  const [query, page] = r.keys;
  if (!byQuery.has(query)) byQuery.set(query, []);
  byQuery.get(query).push({ page, impressions: r.impressions });
}
const cannibal = [...byQuery.entries()]
  .filter(([, list]) => list.length > 1)
  .map(([query, list]) => ({ query, list, total: list.reduce((s, x) => s + x.impressions, 0) }))
  .sort((a, b) => b.total - a.total)
  .slice(0, 15);

let report = `# SEO report — ${isoDate(new Date())}\n\n`;
report += `Property: \`${GSC_SITE}\` · window: ${queries.range.start} → ${queries.range.end} (${DAYS} days)\n\n`;
report += `**Totals:** ${totals.clicks} clicks, ${totals.impressions} impressions, ${q.length} distinct queries\n\n`;

report += `## Striking distance (position 4–20) — best ROI for new/extended posts\n\n`;
report += table(["Query", "Clicks", "Impr.", "CTR", "Pos."], queryRows(striking, 30));

report += `\n## Visible but not clicked (position ≤10, CTR <2%) — rewrite title/lead\n\n`;
report += table(["Query", "Clicks", "Impr.", "CTR", "Pos."], queryRows(lowCtr, 20));

report += `\n## Top queries\n\n`;
report += table(["Query", "Clicks", "Impr.", "CTR", "Pos."], queryRows(q, 30));

report += `\n## Top pages\n\n`;
report += table(
  ["Page", "Clicks", "Impr.", "CTR", "Pos."],
  pages.rows.slice(0, 25).map((r) => [path(r.keys[0]), r.clicks, r.impressions, pct(r.ctr), pos(r.position)])
);

report += `\n## Possible cannibalization (one query, several URLs)\n\n`;
report += table(
  ["Query", "URLs (impressions)"],
  cannibal.map((c) => [c.query, c.list.map((x) => `${path(x.page)} (${x.impressions})`).join(", ")])
);

let ga = null;
if (GA_PROPERTY) {
  console.log(`Fetching GA4 data for property ${GA_PROPERTY}...`);
  const dateRanges = [{ startDate: `${DAYS}daysAgo`, endDate: "today" }];

  const organicLanding = await ga4Report(token, {
    dateRanges,
    dimensions: [{ name: "landingPagePlusQueryString" }],
    metrics: [
      { name: "sessions" },
      { name: "engagementRate" },
      { name: "averageSessionDuration" },
      { name: "keyEvents" },
    ],
    dimensionFilter: {
      filter: {
        fieldName: "sessionDefaultChannelGroup",
        stringFilter: { value: "Organic Search", matchType: "EXACT" },
      },
    },
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 25,
  });

  const channels = await ga4Report(token, {
    dateRanges,
    dimensions: [{ name: "sessionDefaultChannelGroup" }],
    metrics: [{ name: "sessions" }, { name: "keyEvents" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
  });

  const events = await ga4Report(token, {
    dateRanges,
    dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }],
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
    limit: 20,
  });

  ga = { organicLanding, channels, events };

  report += `\n## GA4 — organic landing pages\n\n`;
  report += table(
    ["Landing page", "Sessions", "Engagement", "Avg. duration (s)", "Key events"],
    organicLanding.map((r) => [
      r.dims[0],
      r.metrics[0],
      pct(r.metrics[1]),
      r.metrics[2].toFixed(0),
      r.metrics[3],
    ])
  );

  report += `\n## GA4 — traffic by channel\n\n`;
  report += table(
    ["Channel", "Sessions", "Key events"],
    channels.map((r) => [r.dims[0], r.metrics[0], r.metrics[1]])
  );

  report += `\n## GA4 — events recorded\n\n`;
  report += table(["Event", "Count"], events.map((r) => [r.dims[0], r.metrics[0]]));
  report += `\n_If no contact/form event appears above, the form is not reporting conversions to GA4 yet._\n`;
} else {
  report += `\n_GA4 section skipped — set GA4_PROPERTY_ID or pass --ga-property._\n`;
}

mkdirSync(OUT_DIR, { recursive: true });
const base = join(OUT_DIR, isoDate(new Date()));
writeFileSync(`${base}.md`, report);
writeFileSync(`${base}.json`, JSON.stringify({ queries, pages, queryPage, ga }, null, 2));
console.log(`Report written to ${base}.md`);

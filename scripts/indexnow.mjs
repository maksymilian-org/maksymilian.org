#!/usr/bin/env node
// Tells IndexNow-enabled search engines (Bing, Yandex, Seznam, Naver...) that
// URLs were added or changed. Google does not support IndexNow.
//
// Usage:
//   node scripts/indexnow.mjs <url> [<url> ...]   submit specific URLs
//   node scripts/indexnow.mjs --all               submit every URL in the sitemap
//
// The key is public by design: the same string must be served as plain text at
// https://<host>/<key>.txt (the file lives in public/).

import { readdirSync, readFileSync } from "node:fs";

const HOST = "maksymilian.org";
const ORIGIN = `https://${HOST}`;

const keyFile = readdirSync("public").find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error("No IndexNow key file (public/<32 hex chars>.txt) found.");
  process.exit(1);
}
const key = keyFile.replace(".txt", "");
if (readFileSync(`public/${keyFile}`, "utf8").trim() !== key) {
  console.error("The key file content must equal its file name.");
  process.exit(1);
}

let urls = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (process.argv.includes("--all")) {
  const xml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
urls = [...new Set(urls)].filter((u) => u.startsWith(ORIGIN));
if (urls.length === 0) {
  console.error("No URLs to submit. Pass URLs or --all.");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation: `${ORIGIN}/${keyFile}`, urlList: urls }),
});

// 200 = accepted, 202 = accepted (key validation pending), 422/403 = bad key or URLs.
console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URL(s)`);
if (res.status >= 400) console.log((await res.text()).slice(0, 300));

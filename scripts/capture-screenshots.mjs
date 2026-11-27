#!/usr/bin/env node
// Captures screenshots of public project pages for the portfolio, driving
// headless Chrome over the DevTools protocol (no extra dependencies, does not
// take over the screen). Cookie banners are dismissed with the most
// privacy-preserving option the page offers ("reject" / "only necessary").
//
// Output in public/projects/:
//   <id>-desktop.webp  1440x900 viewport
//   <id>-full.webp     the whole page (up to 6000 px tall), for scroll-on-hover
//   <id>-mobile.webp   390x844 @2x, iPhone user agent
//
// Usage: node scripts/capture-screenshots.mjs [id ...]   (no ids = all)

import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT = "public/projects";
const IPHONE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";

const TARGETS = [
  { id: "geoservice", url: "https://mapspace.com/" },
  { id: "surveys", url: "https://careertest.universumglobal.com/" },
  { id: "process-control", url: "https://intrack.eu/" },
  { id: "food-idea", url: "https://food-idea-maksymilian-org.netlify.app/" },
  { id: "pokedex", url: "https://pokedex-maksymilian-org.netlify.app/" },
  { id: "memory", url: "https://memory-maksymilian-org.netlify.app/" },
  { id: "tictactoe", url: "https://tictactoe-lmp6.onrender.com", wait: 40000 },
  { id: "this-website", url: "https://maksymilian.org/" },
  { id: "site-civitas", url: "https://fundacja.civitaschristiana.pl/" },
  { id: "site-royalbotanic", url: "https://hotel-royalbotanic.pl/" },
  { id: "site-ksiegowy", url: "http://ksiegowy.plus/" },
  { id: "site-ecotechnika", url: "https://www.ecotechnika.pl/" },
];

// Runs in the page: click the least-consenting button of a cookie banner, then
// hide any consent overlay that is still on screen.
const DISMISS = `(() => {
  const prefer = [/odrzu|reject|decline|deny|only necessary|tylko niezb|niezbędne|necessary only/i, /zamknij|close|×|✕/i, /akcept|accept|zgadzam|agree|ok\\b|rozumiem|got it/i];
  const els = [...document.querySelectorAll('button, a, [role=button], input[type=button], input[type=submit]')]
    .filter(e => e.offsetParent !== null && (e.innerText || e.value || e.getAttribute('aria-label') || '').trim().length < 40);
  const inBanner = e => /cookie|consent|gdpr|rodo|cmp|privacy|ciastecz/i.test((e.closest('[id],[class]')?.id || '') + ' ' + (e.closest('[class]')?.className || '') + ' ' + (e.closest('div,section,aside')?.innerText || '').slice(0, 400));
  for (const re of prefer) {
    const hit = els.find(e => re.test(e.innerText || e.value || e.getAttribute('aria-label') || '') && inBanner(e));
    if (hit) { hit.click(); break; }
  }
  for (const el of document.querySelectorAll('[id*=cookie i],[class*=cookie i],[id*=consent i],[class*=consent i],[id*=gdpr i],[class*=cmp i],[id*=cmp i]')) {
    const s = getComputedStyle(el);
    if (s.position === 'fixed' || s.position === 'sticky') el.style.setProperty('display', 'none', 'important');
  }
})()`;

function launch() {
  const profile = mkdtempSync(join(tmpdir(), "capture-"));
  const proc = spawn(CHROME, [
    "--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profile}`,
    "--hide-scrollbars", "--no-first-run", "--mute-audio", "--disable-gpu", "about:blank",
  ]);
  return new Promise((resolve, reject) => {
    proc.stderr.on("data", (d) => {
      const m = /DevTools listening on (ws:\/\/\S+)/.exec(String(d));
      if (m) resolve({ proc, profile, port: new URL(m[1]).port });
    });
    proc.on("exit", () => reject(new Error("Chrome exited")));
  });
}

async function openPage(port) {
  const target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));
  let id = 0;
  const pending = new Map();
  const listeners = new Set();
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else listeners.forEach((fn) => fn(msg));
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      pending.set(++id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  const once = (method, timeout) =>
    new Promise((resolve) => {
      const t = setTimeout(() => { listeners.delete(fn); resolve(false); }, timeout);
      const fn = (m) => { if (m.method === method) { clearTimeout(t); listeners.delete(fn); resolve(true); } };
      listeners.add(fn);
    });
  return { send, once, close: () => ws.close() };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function capture(port, t, mode) {
  const page = await openPage(port);
  const { send } = page;
  const mobile = mode === "mobile";
  const width = mobile ? 390 : 1440;
  const height = mobile ? 844 : 900;
  const scale = mobile ? 2 : 1;
  try {
    await send("Page.enable");
    await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: scale, mobile });
    if (mobile) await send("Emulation.setUserAgentOverride", { userAgent: IPHONE_UA });
    const loaded = page.once("Page.loadEventFired", t.wait ?? 30000);
    await send("Page.navigate", { url: t.url });
    await loaded;
    await sleep(2500);
    await send("Runtime.evaluate", { expression: DISMISS });
    await sleep(1500);
    await send("Runtime.evaluate", { expression: DISMISS });
    await sleep(800);
    await send("Runtime.evaluate", { expression: "window.scrollTo(0,0)" });

    const shot = await send("Page.captureScreenshot", { format: "png" });
    await sharp(Buffer.from(shot.data, "base64"))
      .resize({ width: mobile ? 780 : 1440 })
      .webp({ quality: 80 })
      .toFile(join(OUT, `${t.id}-${mode}.webp`));

    if (!mobile) {
      const { cssContentSize } = await send("Page.getLayoutMetrics");
      const full = Math.min(Math.ceil(cssContentSize.height), 6000);
      const long = await send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
        clip: { x: 0, y: 0, width, height: full, scale: 1 },
      });
      await sharp(Buffer.from(long.data, "base64"))
        .resize({ width: 960 })
        .webp({ quality: 72 })
        .toFile(join(OUT, `${t.id}-full.webp`));
    }
    console.log(`ok   ${t.id}-${mode}`);
  } catch (e) {
    console.log(`fail ${t.id}-${mode}: ${e.message}`);
  } finally {
    page.close();
  }
}

const only = process.argv.slice(2);
const { proc, profile, port } = await launch();
try {
  for (const t of TARGETS.filter((t) => !only.length || only.includes(t.id))) {
    await capture(port, t, "desktop");
    await capture(port, t, "mobile");
  }
} finally {
  proc.kill();
  await sleep(500);
  rmSync(profile, { recursive: true, force: true });
}

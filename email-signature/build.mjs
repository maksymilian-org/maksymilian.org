#!/usr/bin/env node
// Builds the Gmail signature (EN + PL) and a preview page with a "Copy" button.
//
//   npm run signature:build
//
// Edit the TEXT / STYLE constants below (or content/site.ts for contact data),
// run the build, open email-signature/preview.html, click "Copy signature" and
// paste it into Gmail: Settings > See all settings > General > Signature.
//
// Email clients ignore <style> blocks and most modern CSS, so the markup is a
// plain table with inline styles. The logo must be a public https URL because
// Gmail cannot embed local images in a signature.

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "../content/site.ts";

const OUT = dirname(fileURLToPath(import.meta.url));

const STYLE = {
  brand: "#512da8", // --brand-solid of the website
  text: "#1f1b2e",
  muted: "#6b6680",
  line: "#d9d4e8",
  font: "Arial, Helvetica, sans-serif",
  logo: `${site.url}/favicon/apple-icon-180x180.png`,
  logoSize: 44, // the logo is a transparent PNG, so it sits on a white tile (see signature())
};

// Tracks signature clicks in GA4 as source "email" / medium "signature".
const utm = (path = "") =>
  `${site.url}${path}?utm_source=email&utm_medium=signature&utm_campaign=signature`;

const TEXT = {
  en: {
    title: "Senior Fullstack Developer",
    tagline: "Websites, apps, integrations and automation",
    where: "Remote from Lublin, Poland (CET)",
    cta: "Get a free quote",
    quotePath: "/quote",
    phone: "Phone",
    email: "Email",
    web: "Web",
    tax: "VAT ID",
    taxValue: site.vatId,
  },
  pl: {
    title: "Senior Fullstack Developer",
    tagline: "Strony, aplikacje, integracje i automatyzacje",
    where: "Lublin, Polska",
    cta: "Darmowa wycena",
    quotePath: "/pl/quote",
    phone: "Tel.",
    email: "E-mail",
    web: "WWW",
    tax: "NIP",
    taxValue: site.nip,
  },
};

const a = (href, label, extra = "") =>
  `<a href="${href}" target="_blank" style="color:${STYLE.brand};text-decoration:none;${extra}">${label}</a>`;

function signature(locale) {
  const t = TEXT[locale];
  const s = (css) => `font-family:${STYLE.font};${css}`;
  const row = (label, value) =>
    `<tr><td style="${s(`font-size:12px;line-height:18px;color:${STYLE.muted};padding-right:10px;white-space:nowrap`)}">${label}</td>` +
    `<td style="${s(`font-size:13px;line-height:18px;color:${STYLE.text}`)}">${value}</td></tr>`;
  const links = [
    a(site.social.linkedin, "LinkedIn"),
    a(site.social.github, "GitHub"),
    a(site.whatsapp, "WhatsApp"),
  ].join(`<span style="color:${STYLE.line}">&nbsp;&nbsp;|&nbsp;&nbsp;</span>`);

  return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;">
  <tr>
    <td valign="top" style="padding:0 16px 0 0;">
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:separate;"><tr><td style="background:#ffffff;border:1px solid ${STYLE.line};border-radius:14px;padding:10px;"><a href="${utm()}" target="_blank"><img src="${STYLE.logo}" width="${STYLE.logoSize}" height="${STYLE.logoSize}" alt="${site.brand}" style="display:block;border:0;"></a></td></tr></table>
    </td>
    <td valign="top" style="padding:0 0 0 16px;border-left:1px solid ${STYLE.line};">
      <div style="${s(`font-size:17px;line-height:22px;font-weight:bold;color:${STYLE.text}`)}">${site.name}</div>
      <div style="${s(`font-size:13px;line-height:20px;color:${STYLE.brand};font-weight:bold`)}">${t.title}</div>
      <div style="${s(`font-size:12px;line-height:18px;color:${STYLE.muted};padding-bottom:8px`)}">${t.tagline}</div>
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;">
        ${row(t.phone, a(`tel:${site.phone}`, site.phoneDisplay, `color:${STYLE.text};`))}
        ${row(t.email, a(`mailto:${site.email}`, site.email, `color:${STYLE.text};`))}
        ${row(t.web, a(utm(), site.brand))}
      </table>
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;margin-top:12px;">
        <tr>
          <td style="background:${STYLE.brand};border-radius:8px;padding:7px 14px;">
            <a href="${utm(t.quotePath)}" target="_blank" style="${s("font-size:13px;line-height:16px;font-weight:bold;color:#ffffff;text-decoration:none;display:inline-block")}">${t.cta}&nbsp;&rarr;</a>
          </td>
          <td style="${s("font-size:12px;line-height:16px;padding-left:14px")}">${links}</td>
        </tr>
      </table>
      <div style="${s(`font-size:11px;line-height:16px;color:${STYLE.muted};padding-top:10px`)}">${t.where} &middot; ${t.tax}: ${t.taxValue}</div>
    </td>
  </tr>
</table>
`;
}

function preview(en, pl) {
  const doc = (id, html) => `<section id="${id}" class="sig" hidden>${html}</section>`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gmail signature preview</title>
<style>
  :root { --bg:#f6f4fb; --card:#fff; --fg:#1f1b2e; --muted:#6b6680; --brand:#512da8; --line:#d9d4e8; }
  * { box-sizing: border-box; }
  body { margin:0; padding:32px 16px; background:var(--bg); color:var(--fg); font:15px/1.5 Arial, Helvetica, sans-serif; }
  main { max-width:720px; margin:0 auto; }
  h1 { font-size:22px; margin:0 0 4px; }
  p.lead { margin:0 0 24px; color:var(--muted); }
  .bar { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px; }
  button { font:inherit; cursor:pointer; border:1px solid var(--line); background:var(--card); color:var(--fg); padding:8px 14px; border-radius:8px; }
  button[aria-pressed="true"] { background:var(--brand); border-color:var(--brand); color:#fff; }
  button.primary { background:var(--brand); border-color:var(--brand); color:#fff; font-weight:bold; }
  .mail { background:var(--card); border:1px solid var(--line); border-radius:12px; padding:24px; overflow-x:auto; }
  .mail p { margin:0 0 20px; color:var(--muted); }
  .status { min-height:22px; margin:12px 0 0; color:var(--brand); }
  ol { color:var(--muted); padding-left:20px; margin-top:24px; }
</style>
</head>
<body>
<main>
  <h1>Gmail signature</h1>
  <p class="lead">Generated by <code>npm run signature:build</code>. Edit <code>email-signature/build.mjs</code> and rebuild.</p>
  <div class="bar">
    <button id="b-en" aria-pressed="true" type="button">English</button>
    <button id="b-pl" aria-pressed="false" type="button">Polski</button>
    <button id="copy" class="primary" type="button">Copy signature</button>
    <button id="copy-html" type="button">Copy HTML code</button>
  </div>
  <div class="mail">
    <p>Best regards,</p>
    ${doc("sig-en", en)}
    ${doc("sig-pl", pl)}
  </div>
  <p class="status" id="status" role="status"></p>
  <ol>
    <li>Click "Copy signature".</li>
    <li>In Gmail open Settings, "See all settings", General, Signature, then create a new signature.</li>
    <li>Paste into the box (Ctrl/Cmd+V) and save changes at the bottom of the page.</li>
  </ol>
</main>
<script>
  var current = "en";
  var status = document.getElementById("status");
  function show(lang) {
    current = lang;
    ["en", "pl"].forEach(function (l) {
      document.getElementById("sig-" + l).hidden = l !== lang;
      document.getElementById("b-" + l).setAttribute("aria-pressed", String(l === lang));
    });
  }
  function say(msg) { status.textContent = msg; }
  function selectNode(node) {
    var r = document.createRange(); r.selectNodeContents(node);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
  }
  document.getElementById("b-en").onclick = function () { show("en"); };
  document.getElementById("b-pl").onclick = function () { show("pl"); };
  document.getElementById("copy").onclick = function () {
    var node = document.getElementById("sig-" + current);
    var html = node.innerHTML;
    // Preferred: put rich HTML on the clipboard so Gmail keeps the layout.
    if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
      var item = new ClipboardItem({
        "text/html": new Blob([html], { type: "text/html" }),
        "text/plain": new Blob([node.innerText], { type: "text/plain" })
      });
      navigator.clipboard.write([item]).then(function () { say("Copied. Paste it into the Gmail signature box."); }, fallback);
    } else { fallback(); }
    function fallback() {
      selectNode(node);
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      say(ok ? "Copied. Paste it into the Gmail signature box." : "Selected. Press Ctrl/Cmd+C, then paste into Gmail.");
    }
  };
  document.getElementById("copy-html").onclick = function () {
    var html = document.getElementById("sig-" + current).innerHTML;
    navigator.clipboard.writeText(html).then(function () { say("HTML code copied."); },
      function () { say("Could not copy automatically; open signature." + current + ".html and copy from there."); });
  };
  show("en");
</script>
</body>
</html>
`;
}

const en = signature("en");
const pl = signature("pl");
writeFileSync(join(OUT, "signature.en.html"), en);
writeFileSync(join(OUT, "signature.pl.html"), pl);
writeFileSync(join(OUT, "preview.html"), preview(en, pl));
console.log("Wrote signature.en.html, signature.pl.html and preview.html in email-signature/");

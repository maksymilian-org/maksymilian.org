// Small global behaviours for the otherwise static pages: theme toggle, mobile
// menu, currency conversion of [data-pln] prices, language preference and
// analytics clicks. Loaded once from the base layout.

import { CURRENCIES, formatPln, getState, initCurrency, setCurrency, subscribe, type Currency } from "../../lib/currency";
import { trackEvent } from "../../utils/analytics";

const html = document.documentElement;
const locale = html.lang || "en";

// ---- theme ----------------------------------------------------------------
function applyTheme(theme: string) {
  html.setAttribute("data-theme", theme);
  html.style.colorScheme = theme;
}
document.addEventListener("click", (e) => {
  const btn = (e.target as Element | null)?.closest?.("[data-theme-toggle]");
  if (!btn) return;
  const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* ignore */
  }
});

// ---- mobile menu ----------------------------------------------------------
function setMenu(open: boolean) {
  const menu = document.getElementById("mobile-menu");
  const toggle = document.querySelector<HTMLElement>("[data-menu-toggle]");
  if (!menu || !toggle) return;
  menu.hidden = !open;
  toggle.setAttribute("aria-expanded", String(open));
  toggle.querySelector('[data-menu-icon="open"]')?.classList.toggle("hidden", open);
  toggle.querySelector('[data-menu-icon="close"]')?.classList.toggle("hidden", !open);
}
document.addEventListener("click", (e) => {
  const target = e.target as Element | null;
  if (target?.closest?.("[data-menu-toggle]")) {
    const menu = document.getElementById("mobile-menu");
    setMenu(!!menu?.hidden);
  } else if (target?.closest?.("#mobile-menu a")) {
    setMenu(false);
  }
});

// ---- language preference ---------------------------------------------------
// Remember an explicit choice so the first-visit redirect never overrides it.
document.addEventListener("click", (e) => {
  const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[data-lang-link]");
  if (!link) return;
  try {
    localStorage.setItem("lang", link.dataset.langLink ?? "");
  } catch {
    /* ignore */
  }
});

// ---- currency ---------------------------------------------------------------
function paintPrices() {
  const state = getState();
  document.querySelectorAll<HTMLElement>("[data-pln]").forEach((el) => {
    el.textContent = formatPln(Number(el.dataset.pln), state);
  });
  document.querySelectorAll<HTMLSelectElement>("select[data-currency-select]").forEach((sel) => {
    if (sel.value !== state.currency) sel.value = state.currency;
  });
}
subscribe(paintPrices);
document.addEventListener("change", (e) => {
  const sel = (e.target as Element | null)?.closest?.<HTMLSelectElement>("select[data-currency-select]");
  if (sel && (CURRENCIES as readonly string[]).includes(sel.value)) setCurrency(sel.value as Currency);
});
paintPrices();
// Exchange rates are not needed for first paint: fetch them when the browser is idle.
const startCurrency = () => initCurrency(locale);
"requestIdleCallback" in window ? requestIdleCallback(startCurrency, { timeout: 2500 }) : setTimeout(startCurrency, 1000);

// ---- analytics clicks ---------------------------------------------------------
// Contact links are the real conversions on a site with few forms: a visitor who
// taps the phone number or WhatsApp never touches the contact form.
function classify(href: string): { event: string; channel: string } | null {
  if (href.startsWith("tel:")) return { event: "click_phone", channel: "phone" };
  if (href.startsWith("mailto:")) return { event: "click_email", channel: "email" };
  if (href.includes("wa.me/")) return { event: "click_whatsapp", channel: "whatsapp" };
  if (href.includes("m.me/")) return { event: "click_messenger", channel: "messenger" };
  return null;
}
document.addEventListener("click", (e) => {
  const a = (e.target as Element | null)?.closest?.("a");
  if (!a) return;
  const href = a.getAttribute("href") ?? "";
  const hit = classify(href);
  if (hit) {
    trackEvent(hit.event, { channel: hit.channel, page: window.location.pathname });
  } else if (/(^|\/)quote(\?|$)/.test(href.replace(/^https?:\/\/[^/]+/, ""))) {
    trackEvent("cta_quote", { page: window.location.pathname });
  }
});

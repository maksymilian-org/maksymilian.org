// Prices are authored in PLN. The viewer picks a currency (default: USD for
// English, PLN for Polish) and amounts are converted with free, key-less FX
// rates and rounded to clean numbers. This is a plain store (no React) so the
// same logic serves static HTML (via data-pln attributes) and React islands.

export const CURRENCIES = ["PLN", "USD", "EUR", "GBP"] as const;
export type Currency = (typeof CURRENCIES)[number];

const SYMBOLS: Record<Currency, string> = { PLN: "zł", USD: "$", EUR: "€", GBP: "£" };
const STORAGE_CURRENCY = "currency";
const STORAGE_RATES = "fx_rates_pln";
// Free, no-key endpoint. Returns { result, base_code, rates: { USD: .., ... } }.
const RATES_URL = "https://open.er-api.com/v6/latest/PLN";

export interface CurrencyState {
  currency: Currency;
  rates: Record<string, number>;
  ready: boolean;
}

/** What the server renders and what the first client render must match. */
export const SERVER_STATE: CurrencyState = { currency: "PLN", rates: { PLN: 1 }, ready: false };

let state: CurrencyState = SERVER_STATE;
let initialized = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((fn) => fn());
}

export function getState(): CurrencyState {
  return state;
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

// Round to a clean, slightly-approximate figure so prices read naturally.
function roundNice(value: number): number {
  if (value < 100) return Math.round(value / 5) * 5;
  if (value < 1000) return Math.round(value / 10) * 10;
  return Math.round(value / 50) * 50;
}

function formatAmount(currency: Currency, amount: number): string {
  const nf = new Intl.NumberFormat(currency === "PLN" ? "pl-PL" : "en-US", {
    maximumFractionDigits: 0,
  });
  const num = nf.format(amount);
  return currency === "PLN" ? `${num} ${SYMBOLS.PLN}` : `${SYMBOLS[currency]}${num}`;
}

/** Convert a PLN amount to the active currency, rounded. */
export function formatPln(pln: number, s: CurrencyState = state): string {
  // Until rates arrive we can only show the base currency faithfully.
  if (s.currency === "PLN") return formatAmount("PLN", roundNice(pln));
  const rate = s.rates[s.currency];
  if (!s.ready || !rate) return formatAmount("PLN", roundNice(pln));
  return formatAmount(s.currency, roundNice(pln * rate));
}

export function setCurrency(next: Currency) {
  state = { ...state, currency: next };
  try {
    localStorage.setItem(STORAGE_CURRENCY, next);
  } catch {
    /* ignore */
  }
  emit();
}

/** Client only, idempotent: restore the saved currency and load FX rates. */
export function initCurrency(locale: string) {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;

  let currency: Currency = locale === "pl" ? "PLN" : "USD";
  try {
    const saved = localStorage.getItem(STORAGE_CURRENCY);
    if (saved && (CURRENCIES as readonly string[]).includes(saved)) currency = saved as Currency;
  } catch {
    /* ignore */
  }
  state = { ...state, currency };
  emit();

  // Same-day cached rates first.
  try {
    const cached = localStorage.getItem(STORAGE_RATES);
    if (cached) {
      const parsed = JSON.parse(cached) as { date: string; rates: Record<string, number> };
      if (parsed.date === today() && parsed.rates) {
        state = { ...state, rates: parsed.rates, ready: true };
        emit();
        return;
      }
    }
  } catch {
    /* ignore */
  }

  fetch(RATES_URL)
    .then((r) => r.json())
    .then((data: { result?: string; rates?: Record<string, number> }) => {
      if (data.result !== "success" || !data.rates) return;
      state = { ...state, rates: data.rates, ready: true };
      emit();
      try {
        localStorage.setItem(STORAGE_RATES, JSON.stringify({ date: today(), rates: data.rates }));
      } catch {
        /* ignore */
      }
    })
    .catch(() => {
      /* offline / blocked: prices stay in PLN */
    });
}

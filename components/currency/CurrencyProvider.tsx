"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { useLocale } from "next-intl";

// Prices are authored in PLN (the base). We convert to the viewer's chosen
// currency using free, key-less FX rates and round the result to nice numbers.
export const CURRENCIES = ["PLN", "USD", "EUR", "GBP"] as const;
export type Currency = (typeof CURRENCIES)[number];

const SYMBOLS: Record<Currency, string> = {
  PLN: "zł",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

const STORAGE_CURRENCY = "currency";
const STORAGE_RATES = "fx_rates_pln";
// Free, no-key endpoint. Returns { result, base_code, rates: { USD: .., ... } }.
const RATES_URL = "https://open.er-api.com/v6/latest/PLN";

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  ready: boolean;
  /** Convert a PLN amount to the active currency, rounded. */
  format: (pln: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

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

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function CurrencyProvider({ children }: PropsWithChildren) {
  const locale = useLocale();
  // Deterministic default (matches server render): EN → USD, PL → PLN.
  const [currency, setCurrencyState] = useState<Currency>(
    locale === "pl" ? "PLN" : "USD"
  );
  const [rates, setRates] = useState<Record<string, number>>({ PLN: 1 });
  const [ready, setReady] = useState(false);

  // On mount (client only): restore the saved currency, then load FX rates
  // from cache or the network. PLN needs no rates, so it's ready immediately.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CURRENCY);
      if (saved && (CURRENCIES as readonly string[]).includes(saved)) {
        setCurrencyState(saved as Currency);
      }
    } catch {
      /* ignore */
    }

    // Try a same-day cached rate set first.
    try {
      const cached = localStorage.getItem(STORAGE_RATES);
      if (cached) {
        const parsed = JSON.parse(cached) as {
          date: string;
          rates: Record<string, number>;
        };
        if (parsed.date === today() && parsed.rates) {
          setRates(parsed.rates);
          setReady(true);
          return;
        }
      }
    } catch {
      /* ignore */
    }

    let cancelled = false;
    fetch(RATES_URL)
      .then((r) => r.json())
      .then((data: { result?: string; rates?: Record<string, number> }) => {
        if (cancelled || data.result !== "success" || !data.rates) return;
        setRates(data.rates);
        setReady(true);
        try {
          localStorage.setItem(
            STORAGE_RATES,
            JSON.stringify({ date: today(), rates: data.rates })
          );
        } catch {
          /* ignore */
        }
      })
      .catch(() => {
        /* offline / blocked — prices stay in PLN */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next);
    try {
      localStorage.setItem(STORAGE_CURRENCY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const format = useCallback(
    (pln: number): string => {
      // Until rates arrive we can only show the base currency faithfully.
      if (currency === "PLN") return formatAmount("PLN", roundNice(pln));
      const rate = rates[currency];
      if (!ready || !rate) return formatAmount("PLN", roundNice(pln));
      return formatAmount(currency, roundNice(pln * rate));
    },
    [currency, rates, ready]
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, ready, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}

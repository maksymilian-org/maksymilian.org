"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  CURRENCIES,
  useCurrency,
  type Currency,
} from "@/components/currency/CurrencyProvider";

export function CurrencySwitcher() {
  const t = useTranslations("common");
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="relative inline-flex h-9 items-center rounded-lg border border-border text-xs font-medium">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as Currency)}
        aria-label={t("currencyLabel")}
        title={t("currencyLabel")}
        className="h-full cursor-pointer appearance-none rounded-lg bg-transparent py-0 pl-2.5 pr-7 text-fg outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        {CURRENCIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-muted" />
    </div>
  );
}

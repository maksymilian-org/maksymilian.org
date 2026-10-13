import { useEffect, useSyncExternalStore } from "react";
import { useLocale } from "@/lib/i18n";
import {
  SERVER_STATE,
  formatPln,
  getState,
  initCurrency,
  setCurrency,
  subscribe,
} from "@/lib/currency";

export { CURRENCIES, type Currency } from "@/lib/currency";

// React view of the shared currency store (see lib/currency.ts).
export function useCurrency() {
  const locale = useLocale();
  const state = useSyncExternalStore(subscribe, getState, () => SERVER_STATE);
  useEffect(() => initCurrency(locale), [locale]);
  return {
    currency: state.currency,
    ready: state.ready,
    setCurrency,
    format: (pln: number) => formatPln(pln, state),
  };
}

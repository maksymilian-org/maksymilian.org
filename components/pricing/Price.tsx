"use client";

import { useCurrency } from "@/components/currency/CurrencyProvider";

// Renders a PLN base amount in the viewer's active currency. Client-side so it
// can react to the currency switcher; falls back to PLN until rates load.
export function Price({
  pln,
  className,
}: {
  pln: string | number;
  className?: string;
}) {
  const { format } = useCurrency();
  const base = typeof pln === "string" ? parseFloat(pln) : pln;
  return (
    <span className={className} suppressHydrationWarning>
      {format(base)}
    </span>
  );
}

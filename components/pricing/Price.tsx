import { SERVER_STATE, formatPln } from "@/lib/currency";

// Renders a PLN base amount. The static HTML shows PLN; src/scripts/ui.ts
// rewrites every [data-pln] element into the viewer's currency once rates load.
export function Price({ pln, className }: { pln: string | number; className?: string }) {
  const base = typeof pln === "string" ? parseFloat(pln) : pln;
  return (
    <span className={className} data-pln={base}>
      {formatPln(base, SERVER_STATE)}
    </span>
  );
}

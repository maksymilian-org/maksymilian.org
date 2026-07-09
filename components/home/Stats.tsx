import { useTranslations } from "next-intl";

// Compact trust bar shown right under the hero: a few honest, verifiable
// numbers (experience, Google rating, response time, one-person delivery).
export function Stats() {
  const t = useTranslations("stats");
  const items = t.raw("items") as { value: string; label: string }[];

  return (
    <section className="border-y border-border bg-surface">
      <div className="container-page py-8">
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="text-center">
              <dt className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">
                {item.value}
              </dt>
              <dd className="mt-1 text-sm text-muted">{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

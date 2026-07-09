import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import cn from "classnames";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Price } from "@/components/pricing/Price";
import { JsonLd } from "@/components/seo/JsonLd";

// Fixed display order; the middle tier is highlighted as the popular choice.
const tierKeys = ["landing", "business", "store"] as const;
const highlighted = "business";

interface Tier {
  name: string;
  price: string;
  desc: string;
  features: string[];
}

export function Pricing({ withSchema = false }: { withSchema?: boolean }) {
  const t = useTranslations("pricing");
  const tiers = tierKeys.map((key) => ({
    key,
    ...(t.raw(`tiers.${key}`) as Tier),
  }));

  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: t("heading"),
    itemListElement: tiers.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      description: tier.desc,
      priceCurrency: "PLN",
      price: tier.price,
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: tier.price,
        priceCurrency: "PLN",
      },
    })),
  };

  return (
    <Section id="pricing">
      {withSchema && <JsonLd data={offerSchema} />}
      <SectionHeading center title={t("heading")} lead={t("lead")} />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {tiers.map((tier) => {
          const isTop = tier.key === highlighted;
          return (
            <div
              key={tier.key}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6",
                isTop
                  ? "border-brand bg-surface shadow-lg lg:-mt-3 lg:mb-3"
                  : "border-border bg-surface"
              )}
            >
              {isTop && (
                <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                  {t("popular")}
                </span>
              )}
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="mt-3 flex items-baseline gap-1.5">
                <span className="text-sm text-muted">{t("from")}</span>
                <Price
                  pln={tier.price}
                  className="text-3xl font-bold tracking-tight"
                />
              </p>
              <p className="mt-3 text-sm text-muted">{tier.desc}</p>
              <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={cn(
                  "mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5",
                  isTop
                    ? "bg-brand text-white"
                    : "border border-border bg-bg text-fg hover:border-brand hover:text-brand"
                )}
              >
                {t("cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Custom work — quoted individually */}
      <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-border bg-surface p-6 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-semibold">{t("custom.title")}</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">{t("custom.text")}</p>
        </div>
        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
        >
          {t("cta")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <p className="mt-6 text-center text-xs text-muted">{t("note")}</p>
    </Section>
  );
}

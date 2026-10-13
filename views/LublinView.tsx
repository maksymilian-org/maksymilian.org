import { ArrowRight, Check, MapPin } from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { Page } from "./Page";

// Featured local services (the most sought-after locally).
const FEATURED = ["websites", "ecommerce", "webapps", "integrations"] as const;

export function LublinView({ locale }: { locale: Locale }) {
  return (
    <Page locale={locale} pathname="/lublin">
      <LublinContent />
    </Page>
  );
}

function LublinContent() {
  const t = useTranslations("lublin");
  const n = useTranslations("nav");
  return (
    <>
      <Section>
        <p className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium text-brand">
          <MapPin className="h-3.5 w-3.5" />
          {t("eyebrow")}
        </p>
        <h1 className="mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {t("heading")}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {t("lead")}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/contact">
            {t("ctaHeading")}
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/services" variant="secondary">
            {n("services")}
          </ButtonLink>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("offerHeading")}
          lead={t("offerText")}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {FEATURED.map((id) => {
            const service = services.find((s) => s.id === id);
            return service ? (
              <ServiceCard key={id} service={service} />
            ) : null;
          })}
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-border bg-surface p-8 sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t("remoteHeading")}
          </h2>
          <p className="mt-4 max-w-2xl text-muted">{t("remoteText")}</p>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={site.brand} title={t("whyHeading")} />
        <WhyGrid />
      </Section>

      <Section>
        <div className="mt-4 rounded-3xl bg-brand-solid px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t("ctaHeading")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">{t("ctaLead")}</p>
          <div className="mt-7">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-solid shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              {t("ctaHeading")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

function WhyGrid() {
  const t = useTranslations("lublin");
  const why = t.raw("why") as { title: string; text: string }[];
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2">
      {why.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-border bg-surface p-6"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Check className="h-4 w-4" />
            </span>
            <h3 className="text-lg font-semibold">{item.title}</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

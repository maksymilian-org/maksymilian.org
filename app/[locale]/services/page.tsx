import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/utils/seo";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/services/ServiceCard";
import { CustomServiceCard } from "@/components/services/CustomServiceCard";
import { Pricing } from "@/components/pricing/Pricing";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { industries } from "@/content/industries";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: "services", path: "/services" });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t(`items.${s.id}.title`),
      description: t(`items.${s.id}.description`),
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <Section>
        <SectionHeading eyebrow={site.brand} title={t("heading")} lead={t("lead")} />
        <ServicesGrid />
        <div className="mt-14 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-xl font-bold tracking-tight">
            {locale === "pl" ? "Rozwiązania dla Twojej branży" : "Solutions for your industry"}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {industries.map((i) => (
              <Link
                key={i.id}
                href={`/solutions/${i.slug}`}
                className="rounded-full border border-border px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
              >
                {i.title[locale]}
              </Link>
            ))}
          </div>
        </div>
      </Section>
      <Pricing withSchema />
      <Section>
        <Cta />
      </Section>
    </>
  );
}

function ServicesGrid() {
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => (
        <ServiceCard key={s.id} service={s} detailed />
      ))}
      <CustomServiceCard />
    </div>
  );
}

function Cta() {
  const t = useTranslations("home");
  const c = useTranslations("common");
  return (
    <div className="mt-16 rounded-3xl border border-border bg-surface px-6 py-12 text-center">
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {t("ctaHeading")}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-muted">{t("ctaLead")}</p>
      <div className="mt-7">
        <ButtonLink href="/quote">
          {c("getQuote")}
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </div>
  );
}

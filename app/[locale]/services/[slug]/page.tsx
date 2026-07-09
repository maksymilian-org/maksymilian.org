import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/utils/seo";
import { site } from "@/content/site";
import { getServiceBySlug, services, type ServiceDef } from "@/content/services";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { ServiceIllustration } from "@/components/illustrations/ServiceIllustration";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";

interface Params {
  locale: Locale;
  slug: string;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const t = await getTranslations({ locale, namespace: "services.items" });
  return buildMetadata({
    locale,
    title: t(`${service.id}.title`),
    description: t(`${service.id}.description`),
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "services.items" });
  const title = t(`${service.id}.title`);
  const description = t(`${service.id}.description`);
  const faq = t.raw(`${service.id}.detail.faq`) as { q: string; a: string }[];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    serviceType: title,
    provider: { "@type": "Person", name: site.name, url: site.url },
    areaServed: ["PL", "EU"],
    url: `${site.url}${locale === "en" ? "" : "/pl"}/services/${slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: site.brand, item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "pl" ? "Usługi" : "Services",
        item: `${site.url}${locale === "en" ? "" : "/pl"}/services`,
      },
      { "@type": "ListItem", position: 3, name: title },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <ServiceDetail service={service} />
    </>
  );
}

function ServiceDetail({ service }: { service: ServiceDef }) {
  const t = useTranslations("services");
  const c = useTranslations("common");
  const n = useTranslations("nav");
  const id = service.id;
  const features = t.raw(`items.${id}.detail.features`) as string[];
  const faq = t.raw(`items.${id}.detail.faq`) as { q: string; a: string }[];
  const related = services.filter((s) => s.id !== id).slice(0, 3);

  return (
    <Section>
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-sm text-muted"
      >
        <Link href="/" className="hover:text-fg">
          {n("home")}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/services" className="hover:text-fg">
          {t("heading")}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-fg">{t(`items.${id}.title`)}</span>
      </nav>

      {/* Hero */}
      <div className="mt-8 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-start">
        <div className="h-20 w-20 rounded-2xl bg-brand/5 p-4">
          <ServiceIllustration name={service.illustration} />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t(`items.${id}.title`)}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            {t(`items.${id}.detail.intro`)}
          </p>
        </div>
      </div>

      {/* What you get */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_20rem]">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {t("whatHeading")}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <span className="text-sm">{f}</span>
              </li>
            ))}
          </ul>

          {/* FAQ */}
          <h2 className="mt-14 text-2xl font-bold tracking-tight">
            {t("faqHeading")}
          </h2>
          <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface">
            {faq.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {f.q}
                  <ChevronRight className="h-4 w-4 shrink-0 text-brand transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Sidebar CTA */}
        <aside className="lg:sticky lg:top-24 h-fit rounded-2xl border border-border bg-brand p-6 text-white">
          <p className="text-lg font-semibold">{c("letsTalk")}</p>
          <p className="mt-2 text-sm text-white/85">{c("getQuote")}</p>
          <Link
            href="/contact"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand transition-all hover:-translate-y-0.5"
          >
            {c("getQuote")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>

      {/* Related services */}
      <div className="mt-16 border-t border-border pt-10">
        <h2 className="text-2xl font-bold tracking-tight">
          {t("relatedHeading")}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {related.map((s) => (
            <Link
              key={s.id}
              href={`/services/${s.slug}`}
              className="group rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-brand/40"
            >
              <div className="mb-4 h-12 w-12 rounded-lg bg-brand/5 p-2.5">
                <ServiceIllustration name={s.illustration} />
              </div>
              <h3 className="font-semibold">{t(`items.${s.id}.title`)}</h3>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                {t("detailsLink")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/services" variant="secondary">
            {t("allServices")}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

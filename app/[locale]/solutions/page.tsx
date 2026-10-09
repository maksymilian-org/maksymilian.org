import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/utils/seo";
import { industries } from "@/content/industries";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceIllustration } from "@/components/illustrations/ServiceIllustration";
import { JsonLd } from "@/components/seo/JsonLd";

const META = {
  pl: {
    title: "Rozwiązania dla branż: hotele, produkcja, flota, sklepy",
    description:
      "Strony, systemy i integracje dopasowane do branży: hotele i biura podróży, gabinety, firmy produkcyjne, flota, sprzedawcy online, szkoły i organizacje.",
    heading: "Rozwiązania dla Twojej branży",
    lead: "Każda branża ma swoje problemy. Wybierz tę, która jest Ci najbliższa, a zobaczysz, co buduję, z jakimi realizacjami i za ile.",
    eyebrow: "Branże",
    more: "Zobacz rozwiązanie",
    crumb: "Rozwiązania dla branż",
  },
  en: {
    title: "Solutions by industry: hotels, manufacturing, fleets, stores",
    description:
      "Websites, systems and integrations tailored to your industry: hotels and travel agencies, clinics, manufacturers, fleets, online sellers, schools and organisations.",
    heading: "Solutions for your industry",
    lead: "Every industry has its own problems. Pick the one closest to yours and see what I build, with which projects and at what price.",
    eyebrow: "Industries",
    more: "See the solution",
    crumb: "Solutions by industry",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, title: META[locale].title, description: META[locale].description, path: "/solutions" });
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const m = META[locale];
  const base = `${site.url}${locale === "en" ? "" : "/pl"}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: site.brand, item: site.url },
      { "@type": "ListItem", position: 2, name: m.crumb },
    ],
  };
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: industries.map((i, n) => ({
      "@type": "ListItem",
      position: n + 1,
      name: i.title[locale],
      url: `${base}/solutions/${i.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={itemList} />
      <Section>
        <SectionHeading eyebrow={m.eyebrow} title={m.heading} lead={m.lead} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <Link
              key={i.id}
              href={`/solutions/${i.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
            >
              <div className="mb-5 h-16 w-16 rounded-xl bg-brand/5 p-3 transition-colors group-hover:bg-brand/10">
                <ServiceIllustration name={i.illustration} />
              </div>
              <h2 className="text-lg font-semibold">{i.title[locale]}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{i.lead[locale]}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                {m.more}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

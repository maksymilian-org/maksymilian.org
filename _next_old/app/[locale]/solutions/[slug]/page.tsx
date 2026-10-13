import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight, ExternalLink } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/utils/seo";
import { getIndustryBySlug, industries } from "@/content/industries";
import { getPostBySlug } from "@/content/blog";
import { QUOTE_SERVICE, services } from "@/content/services";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/Section";
import { BlogCard } from "@/components/blog/BlogCard";
import { BookCall } from "@/components/contact/BookCall";
import { ServiceIllustration } from "@/components/illustrations/ServiceIllustration";
import { JsonLd } from "@/components/seo/JsonLd";

interface Params {
  locale: Locale;
  slug: string;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    industries.map((i) => ({ locale, slug: i.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return buildMetadata({
    locale,
    title: industry.metaTitle[locale],
    description: industry.metaDescription[locale],
    path: `/solutions/${slug}`,
  });
}

const UI = {
  pl: {
    eyebrow: "Rozwiązania dla branż",
    crumbHome: "Start",
    crumb: "Rozwiązania dla branż",
    pains: "Z czym się mierzysz",
    build: "Co dla Ciebie buduję",
    proof: "Z moich realizacji",
    price: "Ile to kosztuje",
    services: "Powiązane usługi",
    posts: "Przeczytaj więcej",
    faq: "Najczęstsze pytania",
    ctaHeading: "Zobacz, ile to może kosztować",
    ctaLead: "Odpowiedz na kilka pytań i zobacz orientacyjne widełki. Dokładną wycenę odeślę mailem.",
    quote: "Darmowa wycena online",
  },
  en: {
    eyebrow: "Solutions by industry",
    crumbHome: "Home",
    crumb: "Solutions by industry",
    pains: "What you are up against",
    build: "What I build for you",
    proof: "From my work",
    price: "What it costs",
    services: "Related services",
    posts: "Read more",
    faq: "Frequently asked questions",
    ctaHeading: "See what it could cost",
    ctaLead: "Answer a few questions and see an indicative range. I will email you the exact quote.",
    quote: "Free online quote",
  },
} as const;

export default async function IndustryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();
  setRequestLocale(locale);

  const ui = UI[locale];
  const st = await getTranslations({ locale, namespace: "services.items" });
  const base = `${site.url}${locale === "en" ? "" : "/pl"}`;
  const url = `${base}/solutions/${slug}`;

  const serviceLinks = industry.services
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => !!s);
  const posts = industry.posts
    .map((p) => getPostBySlug(p))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: industry.h1[locale],
    description: industry.metaDescription[locale],
    serviceType: industry.title[locale],
    provider: { "@id": `${site.url}/#business` },
    areaServed: ["PL", "EU"],
    url,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: site.brand, item: site.url },
      { "@type": "ListItem", position: 2, name: ui.crumb, item: `${base}/solutions` },
      { "@type": "ListItem", position: 3, name: industry.title[locale] },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: industry.faq.map((f) => ({
      "@type": "Question",
      name: f.q[locale],
      acceptedAnswer: { "@type": "Answer", text: f.a[locale] },
    })),
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumb} />
      <JsonLd data={faqSchema} />

      <Section>
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted">
          <Link href="/" className="hover:text-fg">{ui.crumbHome}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/solutions" className="hover:text-fg">{ui.crumb}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-fg">{industry.title[locale]}</span>
        </nav>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="h-20 w-20 shrink-0 rounded-2xl bg-brand/5 p-4">
            <ServiceIllustration name={industry.illustration} />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">{ui.eyebrow}</p>
            <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
              {industry.h1[locale]}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{industry.lead[locale]}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={{ pathname: "/quote", query: { service: industry.quoteService } }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-solid px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-soft hover:shadow-md"
              >
                {ui.quote}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <BookCall />
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-xl font-bold tracking-tight">{ui.pains}</h2>
            <ul className="mt-5 space-y-3">
              {industry.pains[locale].map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-brand/30 bg-brand/5 p-6">
            <h2 className="text-xl font-bold tracking-tight">{ui.build}</h2>
            <ul className="mt-5 space-y-3">
              {industry.build[locale].map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {industry.proof && (
          <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-xl font-bold tracking-tight">{ui.proof}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{industry.proof.text[locale]}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {industry.proof.links.map((l) => (
                <li key={l.url}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-brand hover:text-brand"
                  >
                    {l.title}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-xl font-bold tracking-tight">{ui.price}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed">{industry.price[locale]}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {serviceLinks.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
              >
                {st(`${s.id}.title`)}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <h2 className="text-2xl font-bold tracking-tight">{ui.faq}</h2>
        <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface">
          {industry.faq.map((f) => (
            <details key={f.q.pl} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {f.q[locale]}
                <ChevronRight className="h-4 w-4 shrink-0 text-brand transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.a[locale]}</p>
            </details>
          ))}
        </div>

        {posts.length > 0 && (
          <>
            <h2 className="mt-14 text-2xl font-bold tracking-tight">{ui.posts}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </>
        )}

        <div className="mt-14 overflow-hidden rounded-3xl bg-brand-solid px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{ui.ctaHeading}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">{ui.ctaLead}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={{ pathname: "/quote", query: { service: industry.quoteService } }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-solid shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              {ui.quote}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <BookCall variant="onBrand" />
          </div>
        </div>
      </Section>
    </>
  );
}

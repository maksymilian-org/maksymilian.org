import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/utils/seo";
import { tools } from "@/content/tools";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceIllustration } from "@/components/illustrations/ServiceIllustration";

const META = {
  pl: {
    title: "Darmowe narzędzia: test gotowości do KSeF i kalkulator automatyzacji",
    description: "Darmowe narzędzia dla firm: sprawdź gotowość do KSeF w 10 pytaniach i policz, ile oszczędzisz dzięki automatyzacji.",
    eyebrow: "Narzędzia",
    heading: "Darmowe narzędzia dla Twojej firmy",
    lead: "Krótkie, praktyczne narzędzia, które pomagają podjąć decyzję. Bez rejestracji.",
    open: "Otwórz narzędzie",
  },
  en: {
    title: "Free tools: KSeF readiness test and automation calculator",
    description: "Free tools for businesses: check your KSeF readiness in 10 questions and work out how much automation would save you.",
    eyebrow: "Tools",
    heading: "Free tools for your business",
    lead: "Short, practical tools that help you decide. No sign-up.",
    open: "Open the tool",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({ locale, title: META[locale].title, description: META[locale].description, path: "/tools" });
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const m = META[locale];
  return (
    <Section>
      <SectionHeading eyebrow={m.eyebrow} title={m.heading} lead={m.lead} />
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {tools.map((t) => (
          <Link
            key={t.id}
            href={`/tools/${t.slug}`}
            className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
          >
            <div className="mb-5 h-16 w-16 rounded-xl bg-brand/5 p-3 transition-colors group-hover:bg-brand/10">
              <ServiceIllustration name={t.illustration} />
            </div>
            <h2 className="text-lg font-semibold">{t.title[locale]}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t.lead[locale]}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
              {m.open}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { industries } from "@/content/industries";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceIllustration } from "@/components/illustrations/ServiceIllustration";
import { Page } from "./Page";

export const SOLUTIONS_META = {
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


export function SolutionsView({ locale }: { locale: Locale }) {
  const m = SOLUTIONS_META[locale];
  return (
    <Page locale={locale} pathname="/solutions">
      <Section>
        <SectionHeading as="h1" eyebrow={m.eyebrow} title={m.heading} lead={m.lead} />
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
    </Page>
  );
}

import { ArrowRight, Check, ChevronRight, Clock, Code2, Coins, ShieldCheck } from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { hire } from "@/content/hire";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Price } from "@/components/pricing/Price";
import { Page } from "./Page";

const WHY_ICONS = [Clock, Code2, Coins, ShieldCheck];

export function HireView({ locale }: { locale: Locale }) {
  return (
    <Page locale={locale} pathname="/hire-developer-poland">
      <HireContent locale={locale} />
    </Page>
  );
}

function HireContent({ locale }: { locale: Locale }) {
  const p = useTranslations("pricing");

  return (
    <>
      <Section>
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted">
          <Link href="/" className="hover:text-fg">{hire.crumbHome[locale]}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-fg">{hire.crumb[locale]}</span>
        </nav>
        <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-brand">{hire.eyebrow[locale]}</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{hire.h1[locale]}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{hire.lead[locale]}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/quote">
            {hire.quote[locale]}
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <SectionHeading title={hire.modelsHeading[locale]} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {hire.models.map((m) => (
            <div key={m.title.en} className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-lg font-semibold">{m.title[locale]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{m.text[locale]}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading title={hire.whyHeading[locale]} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {hire.why.map((w, i) => {
            const Icon = WHY_ICONS[i];
            return (
              <div key={w.title.en} className="rounded-2xl border border-border bg-bg p-6">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-lg font-semibold">{w.title[locale]}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{w.text[locale]}</p>
              </div>
            );
          })}
        </div>
        <h2 className="mt-12 text-xs font-semibold uppercase tracking-widest text-muted">{hire.stackHeading[locale]}</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {hire.stack.map((s) => (
            <li key={s} className="rounded-lg border border-brand/30 bg-brand/5 px-3 py-1.5 text-sm font-medium text-brand">
              {s}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{hire.stepsHeading[locale]}</h2>
            <ol className="mt-6 space-y-4">
              {hire.steps.map((s, i) => (
                <li key={s.en} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-solid text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-sm leading-relaxed">{s[locale]}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{hire.paperHeading[locale]}</h2>
            <ul className="mt-6 space-y-3">
              {hire.paper.map((s) => (
                <li key={s.en} className="flex items-start gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{s[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading title={hire.pricesHeading[locale]} lead={hire.pricesLead[locale]} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hire.tiers.map((id) => (
            <li key={id} className="rounded-2xl border border-border bg-bg p-5">
              <p className="font-semibold">{p(`tiers.${id}.name`)}</p>
              <p className="mt-1 text-sm text-muted">{p(`tiers.${id}.desc`)}</p>
              <p className="mt-4 text-2xl font-bold tracking-tight text-brand">
                {p("from")} <Price pln={p(`tiers.${id}.price`)} />
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{hire.faqHeading[locale]}</h2>
        <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface">
          {hire.faq.map((f) => (
            <details key={f.q.en} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {f.q[locale]}
                <ChevronRight className="h-4 w-4 shrink-0 text-brand transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.a[locale]}</p>
            </details>
          ))}
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl bg-brand-solid px-6 py-12 text-center text-white sm:px-12">
          <h2 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">{hire.ctaHeading[locale]}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">{hire.ctaLead[locale]}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-solid shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              {hire.quote[locale]}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

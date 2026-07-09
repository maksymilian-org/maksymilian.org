import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { buildPageMetadata } from "@/utils/seo";
import { services } from "@/content/services";
import { commercialProjects } from "@/content/projects";
import { Hero } from "@/components/hero/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reviews } from "@/components/reviews/Reviews";
import { Stats } from "@/components/home/Stats";
import { Guarantees } from "@/components/home/Guarantees";
import { HomeFaq } from "@/components/home/HomeFaq";
import { Pricing } from "@/components/pricing/Pricing";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd, localBusinessSchema, personSchema } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: "home", path: "/" });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("meta");

  return (
    <>
      <JsonLd data={personSchema()} />
      <JsonLd data={localBusinessSchema(t("home.description"))} />
      <Hero />
      <Stats />
      <ServicesPreview />
      <Pricing withSchema />
      <Guarantees />
      <Process />
      <RecentWork />
      <Reviews />
      <HomeFaq />
      <HomeCta />
    </>
  );
}

function ServicesPreview() {
  const t = useTranslations("home");
  const c = useTranslations("common");
  return (
    <Section>
      <SectionHeading
        center
        title={t("servicesHeading")}
        lead={t("servicesLead")}
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <ButtonLink href="/services" variant="secondary">
          {c("seeServices")}
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </Section>
  );
}

function Process() {
  const t = useTranslations("home");
  const steps = ["talk", "quote", "build", "launch"] as const;
  return (
    <Section className="bg-surface">
      <SectionHeading center title={t("processHeading")} />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step}
            className="rounded-2xl border border-border bg-bg p-6"
          >
            <h3 className="font-semibold text-brand">
              {t(`process.${step}.title`)}
            </h3>
            <p className="mt-2 text-sm text-muted">
              {t(`process.${step}.text`)}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function RecentWork() {
  const t = useTranslations("home");
  const c = useTranslations("common");
  return (
    <Section>
      <SectionHeading title={t("projectsHeading")} lead={t("projectsLead")} />
      <div className="mt-10 grid gap-6">
        {commercialProjects.slice(0, 2).map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
      <div className="mt-10">
        <ButtonLink href="/projects" variant="secondary">
          {c("seeProjects")}
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </Section>
  );
}

function HomeCta() {
  const t = useTranslations("home");
  const c = useTranslations("common");
  return (
    <Section>
      <div className="overflow-hidden rounded-3xl bg-brand px-6 py-14 text-center text-white sm:px-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("ctaHeading")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/85">{t("ctaLead")}</p>
        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            {c("getQuote")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}

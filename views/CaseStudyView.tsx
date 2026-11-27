import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight, Clock, Globe, Monitor, Smartphone, Users } from "lucide-react";
import { useTranslations } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { caseStudies, pick, type Project } from "@/content/projects";
import { QUOTE_SERVICE, services } from "@/content/services";
import { Section } from "@/components/ui/Section";
import { BrowserFrame, PhoneFrame } from "@/components/projects/DeviceFrames";
import { ProjectVisual, Chip } from "@/components/projects/ProjectShowcase";
import { StoreBadges } from "@/components/projects/StoreBadges";
import { Page } from "./Page";

const PLATFORM_ICON = { Web: Globe, PWA: Smartphone, Desktop: Monitor, iOS: Smartphone, Android: Smartphone } as const;

export function CaseStudyView({ locale, project }: { locale: Locale; project: Project }) {
  return (
    <Page locale={locale} pathname={`/projects/${project.id}`}>
      <CaseStudy locale={locale} project={project} />
    </Page>
  );
}

function CaseStudy({ locale, project }: { locale: Locale; project: Project }) {
  const t = useTranslations("projects.labels");
  const k = useTranslations("projects.kinds");
  const n = useTranslations("nav");
  const st = useTranslations("services.items");
  const c = useTranslations("common");
  const story = project.story!;
  const m = project.media;
  const highlights = project.highlights?.[locale] ?? project.highlights?.en ?? [];
  const stack = project.technologies?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
  const teamSize = project.team ? pick(project.team, locale).split(":")[0] : undefined;
  const related = (project.services ?? [])
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => !!s);
  const quoteService = project.services?.[0] ? QUOTE_SERVICE[project.services[0]] : undefined;
  const idx = caseStudies.findIndex((p) => p.id === project.id);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  const steps = [
    { label: t("challenge"), text: pick(story.challenge, locale) },
    { label: t("solution"), text: pick(story.solution, locale) },
    { label: t("outcome"), text: pick(story.outcome, locale) },
  ];

  return (
    <>
      <Section>
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
          <Link href="/" className="hover:text-fg">{n("home")}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/projects" className="hover:text-fg">{n("projects")}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-fg">{pick(project.title, locale)}</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            {m && <p className="text-xs font-semibold uppercase tracking-widest text-brand">{k(m.kind)}</p>}
            <h1 className="mt-2 text-3xl font-bold tracking-tight [text-wrap:balance] sm:text-4xl">
              {pick(project.title, locale)}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{pick(project.summary ?? project.description, locale)}</p>
            <ul className="mt-6 flex flex-wrap gap-2 text-sm">
              {project.time && <Chip icon={<Clock className="h-4 w-4" />}>{pick(project.time, locale)}</Chip>}
              {teamSize && <Chip icon={<Users className="h-4 w-4" />}>{teamSize}</Chip>}
              {project.platforms?.map((p) => {
                const Icon = PLATFORM_ICON[p as keyof typeof PLATFORM_ICON] ?? Globe;
                return (
                  <Chip key={p} icon={<Icon className="h-4 w-4" />}>
                    {p}
                  </Chip>
                );
              })}
            </ul>
        {project.stores && project.stores.length > 0 && (
          <div className="mt-6">
            <StoreBadges stores={project.stores} />
          </div>
        )}
            {project.links && (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
                  >
                    {l.title}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="min-w-0 rounded-3xl bg-brand/[0.06] p-5 sm:p-8">
            <ProjectVisual project={project} />
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.label} className="rounded-2xl border border-border bg-bg p-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-solid text-sm font-semibold text-white">
                {i + 1}
              </span>
              <h2 className="mt-4 text-lg font-semibold">{s.label}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {(m?.screens?.length || m?.gallery?.length) && (
        <Section>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("gallery")}</h2>
          {m?.screens && m.screens.length > 0 && (
            <ul className="-mx-4 mt-8 flex snap-x gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
              {m.screens.map((src) => (
                <li key={src} className="w-[44%] shrink-0 snap-center sm:w-auto">
                  <PhoneFrame src={src} alt={pick(project.title, locale)} />
                </li>
              ))}
            </ul>
          )}
          {m?.gallery && m.gallery.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              {m.gallery.map((g) => (
                <div key={g.src}>
                  <BrowserFrame src={g.src} alt={pick(g.caption, locale)} url={m.url} />
                  <p className="mt-3 text-sm text-muted">{pick(g.caption, locale)}</p>
                </div>
              ))}
            </div>
          )}
        </Section>
      )}

      <Section className={m?.screens?.length || m?.gallery?.length ? "bg-surface" : undefined}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{t("highlights")}</h2>
            <ul className="mt-5 list-disc space-y-2 pl-5 marker:text-brand">
              {highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            {stack.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{t("technologies")}</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {stack.map((s) => (
                    <li key={s} className="rounded-lg border border-brand/25 bg-brand/5 px-3 py-1.5 text-sm font-medium text-brand">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              {project.team && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-muted">{t("team")}</dt>
                  <dd className="mt-1">{pick(project.team, locale)}</dd>
                </div>
              )}
              {project.framework && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-muted">{t("framework")}</dt>
                  <dd className="mt-1">{pick(project.framework, locale)}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl bg-brand-solid px-6 py-12 text-center text-white sm:px-12">
          <h2 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight [text-wrap:balance] sm:text-3xl">{t("ctaHeading")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">{t("ctaLead")}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={quoteService ? { pathname: "/quote", query: { service: quoteService } } : "/quote"}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-solid shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              {c("getQuote")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            {related.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="inline-flex items-center justify-center rounded-xl border border-white/50 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {st(`${s.id}.title`)}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-sm">
          <Link href="/projects" className="inline-flex items-center gap-1.5 font-medium hover:text-brand">
            <ArrowLeft className="h-4 w-4" />
            {t("allProjects")}
          </Link>
          {next && next.id !== project.id && (
            <Link href={`/projects/${next.id}`} className="inline-flex items-center gap-1.5 font-medium hover:text-brand">
              {t("nextProject")}: {pick(next.title, locale)}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </Section>
    </>
  );
}

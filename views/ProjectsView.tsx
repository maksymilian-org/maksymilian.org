import { useTranslations } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { commercialProjects } from "@/content/projects";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { WebsiteWall } from "@/components/projects/WebsiteWall";
import { Page } from "./Page";

export function ProjectsView({ locale }: { locale: Locale }) {
  return (
    <Page locale={locale} pathname="/projects">
      <ProjectsContent />
    </Page>
  );
}

function ProjectsContent() {
  const t = useTranslations("projects");
  const k = useTranslations("projects.kinds");
  return (
    <Section>
      <SectionHeading as="h1" title={t("heading")} lead={t("lead")} />

      <h2 className="mt-16 text-2xl font-bold tracking-tight">{t("commercialHeading")}</h2>
      <p className="mt-2 max-w-2xl text-muted">{t("commercialText")}</p>
      <div data-filter-bar hidden className="mt-8 flex flex-wrap gap-2" role="group" aria-label={t("commercialHeading")}>
        {(["all", "mobile", "web", "desktop"] as const).map((f) => (
          <button
            key={f}
            type="button"
            data-filter={f}
            aria-pressed={f === "all"}
            className="rounded-full border border-border px-4 py-1.5 text-sm font-medium transition-colors hover:border-brand aria-pressed:border-brand aria-pressed:bg-brand-solid aria-pressed:text-white"
          >
            {f === "all" ? t("labels.filterAll") : k(f)}
          </button>
        ))}
      </div>
      <div data-filter-scope className="mt-12 space-y-20 sm:space-y-28">
        {commercialProjects.map((p, i) => (
          <ProjectShowcase key={p.id} project={p} flip={i % 2 === 1} />
        ))}
      </div>

      <h2 className="mt-24 text-2xl font-bold tracking-tight">{t("websitesHeading")}</h2>
      <p className="mt-2 max-w-2xl text-muted">
        {t("websitesText")} {t("websitesHint")}
      </p>
      <div className="mt-10">
        <WebsiteWall />
      </div>

      {/* The side-projects section (ownProjects + ProjectTile) is hidden for now at the owner's request. */}
    </Section>
  );
}

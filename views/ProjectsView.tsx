import { useTranslations } from "@/lib/i18n";
import type { Locale } from "@/i18n/routing";
import { commercialProjects, ownProjects } from "@/content/projects";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { ProjectTile } from "@/components/projects/ProjectTile";
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
  return (
    <Section>
      <SectionHeading as="h1" title={t("heading")} lead={t("lead")} />

      <h2 className="mt-16 text-2xl font-bold tracking-tight">{t("commercialHeading")}</h2>
      <p className="mt-2 max-w-2xl text-muted">{t("commercialText")}</p>
      <div className="mt-12 space-y-20 sm:space-y-28">
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

      <h2 className="mt-24 text-2xl font-bold tracking-tight">{t("ownHeading")}</h2>
      <p className="mt-2 text-muted">{t("ownText")}</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ownProjects.map((p) => (
          <ProjectTile key={p.id} project={p} />
        ))}
      </div>
    </Section>
  );
}

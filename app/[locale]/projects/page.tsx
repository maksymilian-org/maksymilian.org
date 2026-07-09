import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/utils/seo";
import {
  commercialProjects,
  ownProjects,
  websites,
} from "@/content/projects";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: "projects", path: "/projects" });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProjectsContent />;
}

function ProjectsContent() {
  const t = useTranslations("projects");
  return (
    <Section>
      <SectionHeading title={t("heading")} lead={t("lead")} />

      <h2 className="mt-14 text-2xl font-bold tracking-tight">
        {t("commercialHeading")}
      </h2>
      <p className="mt-2 text-muted">{t("commercialText")}</p>
      <div className="mt-6 grid gap-6">
        {commercialProjects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-bold tracking-tight">
        {t("websitesHeading")}
      </h2>
      <p className="mt-2 text-muted">{t("websitesText")}</p>
      <ul className="mt-6 flex flex-wrap gap-3">
        {websites.map((w) => (
          <li key={w.url}>
            <a
              href={w.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm transition-colors hover:border-brand hover:text-brand"
            >
              {w.title}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </li>
        ))}
      </ul>

      <h2 className="mt-16 text-2xl font-bold tracking-tight">
        {t("ownHeading")}
      </h2>
      <p className="mt-2 text-muted">{t("ownText")}</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {ownProjects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Section>
  );
}

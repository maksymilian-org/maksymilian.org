import { ExternalLink } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { pick, type Project } from "@/content/projects";
import type { Locale } from "@/i18n/routing";

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("projects.labels");
  const locale = useLocale() as Locale;

  const highlights = project.highlights?.[locale] ?? project.highlights?.en;

  return (
    <article className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <h3 className="text-xl font-semibold tracking-tight">
        {pick(project.title, locale)}
      </h3>
      <p className="mt-2 text-muted">{pick(project.description, locale)}</p>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        {project.time && (
          <Field label={t("duration")}>{pick(project.time, locale)}</Field>
        )}
        {project.framework && (
          <Field label={t("framework")}>
            {pick(project.framework, locale)}
          </Field>
        )}
        {project.team && (
          <Field label={t("team")}>{pick(project.team, locale)}</Field>
        )}
        {project.technologies && (
          <Field label={t("technologies")}>{project.technologies}</Field>
        )}
      </dl>

      {highlights && highlights.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            {t("highlights")}
          </p>
          <ul className="mt-2 grid list-disc gap-1 pl-5 text-sm marker:text-brand sm:grid-cols-2">
            {highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      {project.links && project.links.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
            >
              {link.title}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-widest text-muted">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm">{children}</dd>
    </div>
  );
}

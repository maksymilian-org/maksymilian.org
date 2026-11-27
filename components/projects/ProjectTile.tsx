import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { pick, type Project } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { BrowserFrame } from "./DeviceFrames";

// Compact card for side projects: a screenshot (when there is one) and a short story.
export function ProjectTile({ project }: { project: Project }) {
  const locale = useLocale() as Locale;
  const m = project.media;
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-surface p-4">
      {m?.desktop && (
        <BrowserFrame src={m.desktop} scrollSrc={m.full} alt={pick(project.title, "en")} url={m.url} className="shadow-none" />
      )}
      <div className="flex flex-1 flex-col px-1 pt-4">
        <h3 className="font-semibold">{pick(project.title, locale)}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{pick(project.description, locale)}</p>
        {project.technologies && <p className="mt-3 text-xs text-muted">{project.technologies}</p>}
        {project.links && (
          <div className="mt-3 flex flex-wrap gap-3">
            {project.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline">
                {l.title}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "@/lib/i18n";
import { Link } from "@/i18n/navigation";
import { pick, type Project } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { BrowserFrame, DesktopFrame, PhoneFrame } from "./DeviceFrames";
import { ScreenMockView } from "./ScreenMocks";

// Small project card linking to its case study (used on service pages).
export function ProjectMiniCard({ project }: { project: Project }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("projects.labels");
  const m = project.media;
  const title = pick(project.title, locale);
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-4 transition-all hover:-translate-y-1 hover:border-brand/40"
    >
      <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl bg-brand/[0.06] p-4">
        {m?.kind === "mobile" ? (
          <PhoneFrame compact src={m.screens?.[0]} alt={title} className="w-24">
            {m.mock && <ScreenMockView name={m.mock} />}
          </PhoneFrame>
        ) : m?.kind === "desktop" ? (
          <DesktopFrame title={title} className="w-full shadow-none">
            {m.mock && <ScreenMockView name={m.mock} />}
          </DesktopFrame>
        ) : (
          <BrowserFrame src={m?.desktop} alt={title} url={m?.url} className="w-full shadow-none">
            {m?.mock && <ScreenMockView name={m.mock} />}
          </BrowserFrame>
        )}
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-1.5 line-clamp-3 flex-1 text-sm text-muted">{pick(project.summary ?? project.description, locale)}</p>
      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
        {t("caseStudy")}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

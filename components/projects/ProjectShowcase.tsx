import { ArrowRight, ArrowUpRight, Globe, Monitor, Smartphone, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import cn from "classnames";
import { useLocale, useTranslations } from "@/lib/i18n";
import { StoreBadges } from "@/components/projects/StoreBadges";
import { pick, type Project } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { BrowserFrame, DesktopFrame, PhoneFrame } from "./DeviceFrames";
import { ScreenMockView } from "./ScreenMocks";

// A project told outcome-first: a device mockup, what it gives its users in
// plain language, a few facts, and the technical details folded away for those
// who want them.

export function ProjectVisual({ project }: { project: Project }) {
  const locale = useLocale() as Locale;
  const m = project.media;
  if (!m) return null;
  const title = pick(project.title, locale);

  if (m.kind === "mobile") {
    const [main, left, right] = m.screens ?? [];
    if (!main) {
      return (
        <div className="relative mx-auto flex w-full max-w-md items-end justify-center gap-6">
          <PhoneFrame className="relative w-[46%] -rotate-3" alt={title}>
            {m.mock && <ScreenMockView name={m.mock} />}
          </PhoneFrame>
        </div>
      );
    }
    // Three phones fanned out: the best screen in front, two more behind it.
    return (
      <div className="relative mx-auto aspect-[10/9] w-full max-w-md">
        {left && (
          <PhoneFrame aspect={m.phoneAspect} src={left} alt="" className="absolute left-[4%] top-[9%] w-[34%] -rotate-[8deg] opacity-95" />
        )}
        {right && (
          <PhoneFrame aspect={m.phoneAspect} src={right} alt="" className="absolute right-[4%] top-[9%] w-[34%] rotate-[8deg] opacity-95" />
        )}
        <PhoneFrame aspect={m.phoneAspect} src={main} alt={title} className="absolute left-1/2 top-0 z-10 w-[40%] -translate-x-1/2" />
      </div>
    );
  }

  if (m.kind === "desktop") {
    return (
      <DesktopFrame title={title}>{m.mock && <ScreenMockView name={m.mock} />}</DesktopFrame>
    );
  }

  return (
    <div className="relative pb-6 pr-6 sm:pb-10 sm:pr-10">
      <BrowserFrame src={m.desktop} scrollSrc={m.full} alt={title} url={m.url}>
        {m.mock && <ScreenMockView name={m.mock} />}
      </BrowserFrame>
      {m.mobile && (
        <PhoneFrame
          compact
          src={m.mobile}
          alt=""
          className="absolute bottom-0 right-0 w-[24%] min-w-[84px]"
        />
      )}
    </div>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface px-4 py-3 shadow-sm">
      <p className="text-lg font-bold tracking-tight text-brand">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

const PLATFORM_ICON = { Web: Globe, PWA: Smartphone, Desktop: Monitor, iOS: Smartphone, Android: Smartphone } as const;

export function ProjectShowcase({ project, flip }: { project: Project; flip?: boolean }) {
  const t = useTranslations("projects.labels");
  const k = useTranslations("projects.kinds");
  const locale = useLocale() as Locale;
  const highlights = project.highlights?.[locale] ?? project.highlights?.en;
  const teamSize = project.team ? pick(project.team, locale).split(":")[0] : undefined;
  const stack = project.technologies?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];

  return (
    <article data-kind={project.media?.kind} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <div className={cn("min-w-0 rounded-3xl bg-brand/[0.06] p-5 sm:p-8", flip && "lg:order-last")}>
        <ProjectVisual project={project} />
      </div>

      <div className="min-w-0">
        {project.media && (
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">
            {k(project.media.kind)}
          </p>
        )}
        <h3 className="mt-2 text-2xl font-bold tracking-tight [text-wrap:balance] sm:text-3xl">
          {pick(project.title, locale)}
        </h3>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {pick(project.summary ?? project.description, locale)}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2 text-sm">
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
        {(project.story || (project.links && project.links.length > 0)) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.story && (
              <Link
                href={`/projects/${project.id}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand-solid px-4 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-soft"
              >
                {t("caseStudy")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            {project.links?.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
              >
                {link.title}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ))}
          </div>
        )}

        {(highlights?.length || stack.length > 0) && (
          <details className="group mt-6 rounded-2xl border border-border bg-surface">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold">
              {t("techDetails")}
              <span className="text-brand transition-transform group-open:rotate-45" aria-hidden>
                +
              </span>
            </summary>
            <div className="space-y-5 border-t border-border px-5 py-5">
              {highlights && highlights.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted">{t("highlights")}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm marker:text-brand">
                    {highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}
              {stack.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted">{t("technologies")}</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {stack.map((s) => (
                      <li key={s} className="rounded-md border border-brand/25 bg-brand/5 px-2 py-0.5 text-xs font-medium text-brand">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {(project.team || project.framework) && (
                <dl className="grid gap-3 text-sm sm:grid-cols-2">
                  {project.team && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest text-muted">{t("team")}</dt>
                      <dd className="mt-0.5">{pick(project.team, locale)}</dd>
                    </div>
                  )}
                  {project.framework && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest text-muted">{t("framework")}</dt>
                      <dd className="mt-0.5">{pick(project.framework, locale)}</dd>
                    </div>
                  )}
                </dl>
              )}
            </div>
          </details>
        )}
      </div>
    </article>
  );
}

export function Chip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5">
      <span className="text-brand">{icon}</span>
      {children}
    </li>
  );
}

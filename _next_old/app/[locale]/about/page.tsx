import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/utils/seo";
import { calculateAge } from "@/utils/calculateAge";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Avatar } from "@/components/brand/Avatar";

const mainTech = [
  "React",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "Node.js",
  "React Native",
  "Angular",
  "Vue",
];

const additionalSkills = [
  "Redux", "RTK Query", "Gatsby", "Vite", "Vitest", "Jest", "Cypress",
  "Playwright", "REST", "GraphQL", "WebSockets", "Electron", "RxJS", "SCSS",
  "Tailwind CSS", "PHP", "Python", "MySQL", "PostgreSQL", "Docker", "AWS",
  "WordPress", "Git", "GitHub", "GitLab", "Jira",
];

const jobs = [
  { key: "embiq", company: "Embiq", place: "Lublin", from: "01.2021", to: "present" },
  { key: "ingrifo", company: "Ingrifo", place: "Warsaw", from: "02.2019", to: "08.2020" },
  { key: "self", company: "Maksymilian.org", place: "Lublin", from: "09.2016", to: "present" },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: "about", path: "/about" });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");
  const age = calculateAge("1993-06-12");

  return (
    <Section>
      <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center">
        <Avatar className="h-28 w-28" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("heading")}
          </h1>
          <p className="mt-3 text-lg text-muted">{t("lead")}</p>
        </div>
      </div>

      <p className="mt-8 max-w-2xl text-lg leading-relaxed">{t("intro")}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Fact label={t("labels.name")}>{site.name}</Fact>
        <Fact label={t("labels.age")}>{age}</Fact>
        <Fact label={t("labels.city")}>
          <a
            href={site.location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand"
          >
            {site.location.city}, {site.location.country}
          </a>
        </Fact>
        <Fact label={t("labels.languages")}>{t("languages")}</Fact>
      </div>

      <Block title={t("labels.mainTech")}>
        <div className="flex flex-wrap gap-2">
          {mainTech.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-brand/30 bg-brand/5 px-3 py-1.5 text-sm font-medium text-brand"
            >
              {tech}
            </span>
          ))}
        </div>
      </Block>

      <Block title={t("labels.additionalSkills")}>
        <div className="flex flex-wrap gap-2">
          {additionalSkills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-muted"
            >
              {skill}
            </span>
          ))}
        </div>
      </Block>

      <Block title={t("labels.experience")}>
        <ul className="space-y-5">
          {jobs.map((job) => (
            <li key={job.company} className="border-l-2 border-brand/40 pl-4">
              <p className="text-sm text-muted">
                {job.from} – {job.to === "present" ? t("jobs.present") : job.to}
              </p>
              <p className="font-semibold">{t(`jobs.${job.key}`)}</p>
              <p className="text-sm text-muted">
                {job.company} · {job.place}
              </p>
            </li>
          ))}
        </ul>
      </Block>

      <div className="mt-10 grid gap-10 sm:grid-cols-2">
        <Block title={t("labels.education")} noMargin>
          <p>{t("educationText")}</p>
          <p className="text-sm text-muted">2016</p>
        </Block>

        <Block title={t("labels.interests")} noMargin>
          <ul className="space-y-1 text-muted">
            <li>{t("interests.family")}</li>
            <li>{t("interests.firefighting")}</li>
            <li>{t("interests.moto")}</li>
            <li>{t("interests.history")}</li>
            <li>{t("interests.rescue")}</li>
            <li>{t("interests.football")}</li>
          </ul>
        </Block>
      </div>
    </Section>
  );
}

function Fact({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">
        {label}
      </p>
      <p className="mt-1 font-medium">{children}</p>
    </div>
  );
}

function Block({
  title,
  children,
  noMargin,
}: {
  title: string;
  children: React.ReactNode;
  noMargin?: boolean;
}) {
  return (
    <div className={noMargin ? "" : "mt-10"}>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

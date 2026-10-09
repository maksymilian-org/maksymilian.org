import { ChevronRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { site } from "@/content/site";
import type { Tool } from "@/content/tools";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";

// Shared frame for the free tools: breadcrumb, heading, structured data.
export function ToolShell({
  tool,
  locale,
  children,
}: {
  tool: Tool;
  locale: Locale;
  children: React.ReactNode;
}) {
  const base = `${site.url}${locale === "en" ? "" : "/pl"}`;
  const crumbHome = locale === "pl" ? "Start" : "Home";
  const crumbTools = locale === "pl" ? "Narzędzia" : "Tools";

  const app = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title[locale],
    description: tool.metaDescription[locale],
    url: `${base}/tools/${tool.slug}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    inLanguage: locale,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "PLN" },
    author: { "@id": `${site.url}/#person` },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: site.brand, item: site.url },
      { "@type": "ListItem", position: 2, name: crumbTools, item: `${base}/tools` },
      { "@type": "ListItem", position: 3, name: tool.title[locale] },
    ],
  };

  return (
    <>
      <JsonLd data={app} />
      <JsonLd data={breadcrumb} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted">
            <Link href="/" className="hover:text-fg">{crumbHome}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/tools" className="hover:text-fg">{crumbTools}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-fg">{tool.title[locale]}</span>
          </nav>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">{tool.h1[locale]}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{tool.lead[locale]}</p>
          <div className="mt-10">{children}</div>
        </div>
      </Section>
    </>
  );
}

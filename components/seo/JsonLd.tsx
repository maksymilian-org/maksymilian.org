import { site } from "@/content/site";
import { reviews, reviewsSummary } from "@/content/reviews";

// Renders a JSON-LD script. Data is trusted (built from our own content).
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Stable entity IDs so all structured data across the site forms one connected
// graph (helps both classic rich results and AI/GEO entity understanding).
export const PERSON_ID = `${site.url}/#person`;
export const BUSINESS_ID = `${site.url}/#business`;
export const WEBSITE_ID = `${site.url}/#website`;

// What the person is an expert in — entity signals for search + AI engines.
const KNOWS_ABOUT = [
  "Web development",
  "Mobile app development",
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "React Native",
  "Angular",
  "Vue.js",
  "PHP",
  "Laravel",
  "MySQL",
  "E-commerce",
  "API integrations",
  "KSeF e-invoicing",
  "Workflow automation",
  "AI and LLM integration",
  "Embedded systems and IoT",
  "SEO",
];

// Embeddable Person node (e.g. as a blog post author) — self-contained with
// @id so it links to the main Person entity.
export function authorPerson() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    url: site.url,
    jobTitle: "Fullstack Developer",
    sameAs: [site.social.github, site.social.linkedin],
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: "Fullstack Developer",
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: "PL",
    },
    knowsAbout: KNOWS_ABOUT,
    knowsLanguage: ["pl", "en"],
    worksFor: { "@id": BUSINESS_ID },
    sameAs: [site.social.github, site.social.linkedin],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.brand,
    inLanguage: ["en", "pl"],
    publisher: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
  };
}

export function localBusinessSchema(description: string) {
  // Only expose ratings when real review data is present.
  const ratingData =
    reviewsSummary.count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: reviewsSummary.rating,
            reviewCount: reviewsSummary.count,
            bestRating: 5,
          },
          review: reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.author },
            reviewRating: {
              "@type": "Rating",
              ratingValue: r.rating,
              bestRating: 5,
            },
            reviewBody: r.text.pl,
            ...(r.date ? { datePublished: r.date } : {}),
          })),
        }
      : {};

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: site.name,
    image: `${site.url}/og.png`,
    url: site.url,
    telephone: site.phone,
    email: `mailto:${site.email}`,
    description,
    priceRange: "$$",
    areaServed: [
      { "@type": "City", name: "Lublin" },
      { "@type": "AdministrativeArea", name: "Lubelskie" },
      { "@type": "Country", name: "Poland" },
      "EU",
    ],
    knowsLanguage: ["pl", "en"],
    keywords:
      "tworzenie stron internetowych Lublin, aplikacje webowe, sklepy internetowe, programista fullstack Lublin, automatyzacje, KSeF, aplikacje mobilne",
    vatID: site.vatId,
    taxID: site.nip,
    founder: { "@id": PERSON_ID },
    provider: { "@id": PERSON_ID },
    ...ratingData,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: "PL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.location.geo.lat,
      longitude: site.location.geo.lng,
    },
    sameAs: [site.social.github, site.social.linkedin],
  };
}

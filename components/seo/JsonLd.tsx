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

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: "Fullstack Developer",
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressCountry: "PL",
    },
    sameAs: [site.social.github, site.social.linkedin],
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
    name: site.name,
    image: `${site.url}/og.png`,
    "@id": site.url,
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

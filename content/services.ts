// Service definitions. Copy (title/description/bullets) lives in the i18n
// message files under `services.items.<id>`; here we keep the stable id, the
// illustration key and the number of bullet points to render.
export interface ServiceDef {
  id: string;
  slug: string;
  illustration: IllustrationKey;
  bullets: number;
}

export type IllustrationKey =
  | "websites"
  | "ecommerce"
  | "webapps"
  | "mobile"
  | "integrations"
  | "ksef"
  | "ai"
  | "embedded"
  | "modernization"
  | "audit"
  | "maintenance";

// Order matters: custom solutions & automation are featured first. The home
// page lists all of these in order; the order here is the order shown.
export const services: ServiceDef[] = [
  { id: "webapps", slug: "web-applications", illustration: "webapps", bullets: 3 },
  { id: "integrations", slug: "integrations-automation", illustration: "integrations", bullets: 3 },
  { id: "ksef", slug: "ksef-e-invoicing", illustration: "ksef", bullets: 3 },
  { id: "mobile", slug: "mobile-apps", illustration: "mobile", bullets: 3 },
  { id: "websites", slug: "websites", illustration: "websites", bullets: 3 },
  { id: "ecommerce", slug: "online-stores", illustration: "ecommerce", bullets: 3 },
  { id: "ai", slug: "ai-solutions", illustration: "ai", bullets: 3 },
  { id: "embedded", slug: "embedded-iot", illustration: "embedded", bullets: 3 },
  { id: "modernization", slug: "app-modernization", illustration: "modernization", bullets: 3 },
  { id: "audit", slug: "seo-audit-optimization", illustration: "audit", bullets: 3 },
  { id: "maintenance", slug: "maintenance-support", illustration: "maintenance", bullets: 3 },
];

export function getServiceBySlug(slug: string): ServiceDef | undefined {
  return services.find((s) => s.slug === slug);
}

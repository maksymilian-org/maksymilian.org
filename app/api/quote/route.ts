import { getCloudflareContext } from "@opennextjs/cloudflare";
import { site } from "@/content/site";
import {
  budgets,
  calculateEstimate,
  contactVia,
  contentStates,
  currentStates,
  designStates,
  getQuoteService,
  languageChoices,
  sources,
  timelines,
  type Plain,
} from "@/content/quote";

interface Env {
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

interface Payload {
  service?: string;
  scale?: string;
  options?: unknown;
  timeline?: string;
  budget?: string;
  maintenance?: boolean;
  state?: string;
  content?: string;
  design?: string;
  languages?: unknown;
  industry?: string;
  url?: string;
  integrations?: string;
  description?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  via?: string;
  source?: string;
  consent?: boolean;
  locale?: string;
  token?: string;
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function verifyTurnstile(secret: string, token: string, ip?: string) {
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body }
  );
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const strings = (v: unknown, max = 30) =>
  Array.isArray(v)
    ? v.filter((x): x is string => typeof x === "string").slice(0, max)
    : [];

// Map an id to its Polish label (the owner reads the e-mail in Polish).
const plLabel = (list: Plain[], id: string) =>
  list.find((x) => x.id === id)?.label.pl ?? "";

const pln = (n: number) => `${n.toLocaleString("pl-PL")} zł`;

export async function POST(req: Request) {
  const env = getCloudflareContext().env as unknown as Env;

  let p: Payload;
  try {
    p = await req.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const service = getQuoteService(p.service);
  const name = clean(p.name, 120);
  const email = clean(p.email, 200);
  const description = clean(p.description, 4000);

  if (!service || !name || !email || !description || p.consent !== true) {
    return json({ ok: false, error: "missing_fields" }, 400);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ ok: false, error: "invalid_email" }, 400);
  }

  if (env.TURNSTILE_SECRET_KEY) {
    const ok = await verifyTurnstile(
      env.TURNSTILE_SECRET_KEY,
      clean(p.token, 4000),
      req.headers.get("CF-Connecting-IP") ?? undefined
    );
    if (!ok) return json({ ok: false, error: "turnstile_failed" }, 400);
  }

  if (!env.RESEND_API_KEY) {
    return json({ ok: false, error: "not_configured" }, 503);
  }

  // Never trust client-side numbers: recompute from the shared config, keeping
  // only option ids that really exist for this service.
  const validOptions = new Set(service.options.map((o) => o.id));
  const options = strings(p.options).filter((id) => validOptions.has(id));
  const scale = clean(p.scale, 40);
  const timeline = clean(p.timeline, 40);
  const estimate = calculateEstimate({ service: service.id, scale, options, timeline });

  const scaleLabel = service.scale?.choices.find((c) => c.id === scale)?.label.pl;
  const optionLabels = service.options
    .filter((o) => options.includes(o.id))
    .map((o) => `  - ${o.label.pl}`);
  const languages = strings(p.languages, 8)
    .map((id) => plLabel(languageChoices, id))
    .filter(Boolean);

  const range = estimate ? `${pln(estimate.low)} – ${pln(estimate.high)} netto` : "wycena indywidualna";

  // Lines are `null` when a value is empty (dropped); "" is an intentional blank.
  const kv = (label: string, value: string | undefined | false) =>
    value ? `${label}: ${value}` : null;
  const via = plLabel(contactVia, clean(p.via, 20));
  const source = plLabel(sources, clean(p.source, 20));
  const stateLabel = plLabel(currentStates, clean(p.state, 20));
  const contentLabel = plLabel(contentStates, clean(p.content, 20));
  const designLabel = plLabel(designStates, clean(p.design, 20));

  const lines = (
    [
      `WYCENA ONLINE — ${service.title.pl}`,
      `Szacunek pokazany klientowi: ${range}`,
      estimate?.monthly && p.maintenance
        ? `Opieka po wdrożeniu (klient chce): ${pln(estimate.monthly[0])} – ${pln(estimate.monthly[1])} / mies.`
        : null,
      "",
      "KONTAKT",
      kv("Imię i nazwisko", name),
      kv("E-mail", email),
      kv("Telefon", clean(p.phone, 40)),
      kv("Firma", clean(p.company, 160)),
      kv("Preferowany kontakt", via),
      kv("Skąd wie o mnie", source),
      "",
      "ZAKRES",
      scaleLabel ? `${service.scale?.label.pl}: ${scaleLabel}` : null,
      optionLabels.length
        ? `Dodatki i funkcje:\n${optionLabels.join("\n")}`
        : "Dodatki i funkcje: brak zaznaczonych",
      "",
      "PROJEKT",
      kv("Branża / czym zajmuje się firma", clean(p.industry, 300)),
      kv("Stan obecny", stateLabel),
      kv("Treści", contentLabel),
      kv("Projekt graficzny", designLabel),
      kv("Języki", languages.join(", ")),
      kv("Obecna strona / system", clean(p.url, 300)),
      kv("Integracje", clean(p.integrations, 600)),
      "",
      "OPIS KLIENTA",
      description,
      "",
      "TERMIN I BUDŻET",
      `Termin: ${plLabel(timelines, timeline) || "nie podano"}`,
      `Budżet: ${plLabel(budgets, clean(p.budget, 20)) || "nie podano"}`,
      `Opieka po wdrożeniu: ${p.maintenance ? "tak" : "nie"}`,
      "",
      `Język strony: ${p.locale === "pl" ? "PL" : "EN"}`,
    ] as (string | null)[]
  )
    .filter((x): x is string => x !== null)
    .join("\n");

  const to = env.CONTACT_TO || site.email;
  const from = env.CONTACT_FROM || `Kontakt <kontakt@${new URL(site.url).host}>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `Wycena: ${service.title.pl} — ${name}${estimate ? ` (${pln(estimate.low)}–${pln(estimate.high)})` : ""}`,
      text: lines,
    }),
  });

  if (!res.ok) {
    console.error("resend_error", res.status, await res.text());
    return json({ ok: false, error: "send_failed" }, 502);
  }

  return json({ ok: true });
}

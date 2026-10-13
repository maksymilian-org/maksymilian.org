import { getCloudflareContext } from "@opennextjs/cloudflare";
import { site } from "@/content/site";
import {
  ATTACHMENT_TYPES,
  MAX_ATTACHMENTS,
  MAX_ATTACHMENT_MB,
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
  deadline?: string;
  budget?: string;
  budgetCustom?: string;
  contactNote?: string;
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

function toBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

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
  let uploads: File[] = [];
  try {
    const form = await req.formData();
    p = JSON.parse(String(form.get("payload") ?? "{}"));
    uploads = form.getAll("files").filter((x): x is File => typeof x !== "string");
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

  const maxBytes = MAX_ATTACHMENT_MB * 1024 * 1024;
  if (
    uploads.length > MAX_ATTACHMENTS ||
    uploads.some((u) => !ATTACHMENT_TYPES.includes(u.type) || u.size > maxBytes || u.size === 0)
  ) {
    return json({ ok: false, error: "bad_attachment" }, 400);
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
  const deadline = clean(p.deadline, 10);
  const estimate = calculateEstimate({ service: service.id, scale, options, timeline, deadline });

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
  const budgetId = clean(p.budget, 20);
  const budgetText =
    budgetId === "custom"
      ? `własna kwota: ${clean(p.budgetCustom, 40) || "nie podano"}`
      : plLabel(budgets, budgetId) || "nie podano";
  const timelineText =
    timeline === "date"
      ? `konkretna data: ${deadline || "nie podano"}`
      : plLabel(timelines, timeline) || "nie podano";
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
      kv("Szczegóły kontaktu", clean(p.contactNote, 200)),
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
      `Termin: ${timelineText}`,
      `Budżet: ${budgetText}`,
      `Opieka po wdrożeniu: ${p.maintenance ? "tak" : "nie"}`,
      "",
      uploads.length ? `Załączniki: ${uploads.length} (w mailu)` : "Załączniki: brak",
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
      attachments: await Promise.all(
        uploads.map(async (u, i) => ({
          filename: `zalacznik-${i + 1}.${EXT[u.type] ?? "bin"}`,
          content: toBase64(await u.arrayBuffer()),
        }))
      ),
    }),
  });

  if (!res.ok) {
    console.error("resend_error", res.status, await res.text());
    return json({ ok: false, error: "send_failed" }, 502);
  }

  return json({ ok: true });
}

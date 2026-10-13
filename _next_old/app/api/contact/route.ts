import { getCloudflareContext } from "@opennextjs/cloudflare";
import { site } from "@/content/site";

interface Env {
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
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

export async function POST(req: Request) {
  const env = getCloudflareContext().env as unknown as Env;

  let payload: {
    name?: string;
    email?: string;
    message?: string;
    package?: string;
    token?: string;
  };
  try {
    payload = await req.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const message = payload.message?.trim();
  // Optional: which pricing package the visitor came from (already localized).
  const pkg = payload.package?.trim()?.slice(0, 120);

  if (!name || !email || !message) {
    return json({ ok: false, error: "missing_fields" }, 400);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json({ ok: false, error: "invalid_email" }, 400);
  }

  // Spam protection (only enforced when Turnstile is configured).
  if (env.TURNSTILE_SECRET_KEY) {
    const ok = await verifyTurnstile(
      env.TURNSTILE_SECRET_KEY,
      payload.token ?? "",
      req.headers.get("CF-Connecting-IP") ?? undefined
    );
    if (!ok) return json({ ok: false, error: "turnstile_failed" }, 400);
  }

  if (!env.RESEND_API_KEY) {
    // Not configured yet — fail clearly so the UI can suggest email fallback.
    return json({ ok: false, error: "not_configured" }, 503);
  }

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
      subject: pkg
        ? `New message from ${name} (${pkg}) — maksymilian.org`
        : `New message from ${name} — maksymilian.org`,
      text: `Name: ${name}\nEmail: ${email}${
        pkg ? `\nRegarding: ${pkg}` : ""
      }\n\n${message}`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("resend_error", res.status, detail);
    return json({ ok: false, error: "send_failed" }, 502);
  }

  return json({ ok: true });
}

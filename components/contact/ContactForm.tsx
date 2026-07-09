"use client";

import Script from "next/script";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { site } from "@/content/site";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-fg outline-none transition-colors placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/30";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const token = (data.get("cf-turnstile-response") as string) || "";

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          token,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface p-8 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-2xl text-brand">
          ✓
        </div>
        <p className="text-lg font-medium">{t("success")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      {siteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
        />
      )}

      <div className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t("name")}</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t("email")}</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">
            {t("message")}
          </span>
          <textarea name="message" required rows={5} className={inputClass} />
        </label>

        {siteKey && (
          <div className="flex justify-center">
            <div className="cf-turnstile" data-sitekey={siteKey} data-theme="auto" />
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" ? t("sending") : t("send")}
        </button>

        {status === "error" && (
          <p className="text-sm text-red-500">
            {t("error")}{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium underline"
            >
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

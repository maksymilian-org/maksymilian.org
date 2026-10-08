"use client";

import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { ArrowLeft, ArrowRight, Check, Clock, ImagePlus, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
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
  quoteServices,
  quoteUi,
  sources,
  timelines,
  type L,
  type Plain,
  type ServiceId,
} from "@/content/quote";
import { ServiceIllustration } from "@/components/illustrations/ServiceIllustration";
import { useCurrency } from "@/components/currency/CurrencyProvider";
import { trackEvent } from "@/utils/analytics";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Lang = "pl" | "en";
type Status = "idle" | "sending" | "error";

const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          theme?: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => string;
      remove: (id: string) => void;
      reset: (id?: string) => void;
    };
  }
}

interface Answers {
  service?: ServiceId;
  scale?: string;
  options: string[];
  state: string;
  content: string;
  design: string;
  languages: string[];
  industry: string;
  url: string;
  integrations: string;
  description: string;
  timeline: string;
  deadline: string;
  budget: string;
  budgetCustom: string;
  maintenance: boolean;
  name: string;
  email: string;
  phone: string;
  company: string;
  contactNote: string;
  via: string;
  source: string;
  consent: boolean;
}

const initialAnswers: Answers = {
  options: [],
  state: "",
  content: "",
  design: "",
  languages: [],
  industry: "",
  url: "",
  integrations: "",
  description: "",
  timeline: "flexible",
  deadline: "",
  budget: "unsure",
  budgetCustom: "",
  maintenance: false,
  name: "",
  email: "",
  phone: "",
  company: "",
  contactNote: "",
  via: "email",
  source: "",
  consent: false,
};

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-fg outline-none transition-colors placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/30";

const cardBase =
  "rounded-xl border px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand";
const cardOn = "border-brand bg-brand/5";
const cardOff = "border-border bg-surface hover:border-brand/50";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function QuoteWizard() {
  const lang = useLocale() as Lang;
  const tx = (v: L) => v[lang] ?? v.pl;

  const [a, setA] = useState<Answers>(initialAnswers);
  // Position inside the flow (not the raw step id), see `flow` below.
  const [pos, setPos] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorCode, setErrorCode] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [verified, setVerified] = useState(!siteKey);
  const [done, setDone] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const turnstileEl = useRef<HTMLDivElement>(null);
  const turnstileToken = useRef("");
  const turnstileId = useRef<string | undefined>(undefined);
  const firstRender = useRef(true);
  const skipNextScroll = useRef(false);

  const set = (patch: Partial<Answers>) => setA((prev) => ({ ...prev, ...patch }));
  const toggle = (key: "options" | "languages", id: string) =>
    setA((prev) => ({
      ...prev,
      [key]: prev[key].includes(id) ? prev[key].filter((x) => x !== id) : [...prev[key], id],
    }));

  const service = getQuoteService(a.service);
  // "Something else" has no add-ons to pick, so the scope step is skipped.
  const flow = useMemo(
    () => (a.service === "other" ? [0, 2, 3, 4] : [0, 1, 2, 3, 4]),
    [a.service]
  );
  const step = flow[Math.min(pos, flow.length - 1)];
  const isLast = pos === flow.length - 1;

  // Pre-select a category from ?service= (e.g. from a pricing tile). Done after
  // mount so the page itself can be prerendered.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("service");
    const preset = getQuoteService(id ?? undefined);
    if (preset) {
      skipNextScroll.current = true;
      setA((prev) => ({ ...prev, service: preset.id }));
      setPos(1);
    }
  }, []);

  // Keep the viewport at the top of the wizard when moving between steps.
  useEffect(() => {
    if (firstRender.current || skipNextScroll.current) {
      firstRender.current = false;
      skipNextScroll.current = false;
      return;
    }
    wrapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pos, done]);

  // Turnstile is rendered explicitly: the widget's container only exists once
  // the contact step is shown, after the script's implicit scan has run.
  useEffect(() => {
    if (step !== 4 || done || !siteKey) return;
    let widgetId: string | undefined;
    const timer = setInterval(() => {
      if (window.turnstile && turnstileEl.current) {
        clearInterval(timer);
        widgetId = window.turnstile.render(turnstileEl.current, {
          sitekey: siteKey,
          theme: "auto",
          callback: (token) => {
            turnstileToken.current = token;
            setVerified(true);
          },
          "expired-callback": () => {
            turnstileToken.current = "";
            setVerified(false);
          },
          "error-callback": () => {
            turnstileToken.current = "";
            setVerified(false);
          },
        });
        turnstileId.current = widgetId;
      }
    }, 300);
    return () => {
      clearInterval(timer);
      if (widgetId) window.turnstile?.remove(widgetId);
      turnstileId.current = undefined;
      turnstileToken.current = "";
      if (siteKey) setVerified(false);
    };
  }, [step, done]);

  function stepValid(id: number): boolean {
    switch (id) {
      case 0:
        return !!a.service;
      case 2:
        return a.description.trim().length >= 10;
      case 3:
        return a.timeline !== "date" || (a.deadline !== "" && a.deadline >= todayIso());
      case 4:
        return (
          a.name.trim().length > 0 &&
          EMAIL_RE.test(a.email.trim()) &&
          a.consent &&
          (!["phone", "whatsapp"].includes(a.via) || a.phone.trim().length >= 6)
        );
      default:
        return true;
    }
  }

  function goNext() {
    if (!stepValid(step)) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setPos((p) => Math.min(p + 1, flow.length - 1));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!stepValid(4)) {
      setShowErrors(true);
      return;
    }
    setStatus("sending");
    try {
      const body = new FormData();
      body.append("payload", JSON.stringify({ ...a, locale: lang, token: turnstileToken.current }));
      files.forEach((file) => body.append("files", file));
      const res = await fetch("/api/quote", { method: "POST", body });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setErrorCode(data.error ?? "");
        throw new Error("failed");
      }
      trackEvent("generate_lead", { lead_type: "quote", service: a.service ?? "" });
      setDone(true);
    } catch {
      setStatus("error");
      // Turnstile tokens are single-use: get a fresh one for the retry.
      turnstileToken.current = "";
      if (siteKey) {
        setVerified(false);
        window.turnstile?.reset(turnstileId.current);
      }
    }
  }

  const estimate = useMemo(
    () =>
      a.service
        ? calculateEstimate({
            service: a.service,
            scale: a.scale,
            options: a.options,
            timeline: a.timeline,
            deadline: a.deadline,
          })
        : null,
    [a.service, a.scale, a.options, a.timeline, a.deadline]
  );

  if (done) {
    return (
      <div ref={wrapRef} className="scroll-mt-24">
        <QuoteResult
          lang={lang}
          serviceTitle={service ? tx(service.title) : ""}
          estimate={estimate}
          maintenance={a.maintenance}
          email={a.email}
        />
      </div>
    );
  }

  const stepNumber = pos + 1;

  return (
    <div ref={wrapRef} className="scroll-mt-24">
      {siteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="lazyOnload"
        />
      )}

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-brand">
            {tx(quoteUi.stepOf)
              .replace("{n}", String(stepNumber))
              .replace("{total}", String(flow.length))}
          </span>
          <span className="text-muted">{tx(quoteUi.steps[step])}</span>
        </div>
        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={flow.length}
          aria-valuenow={stepNumber}
        >
          <div
            className="h-full rounded-full bg-brand transition-all duration-300"
            style={{ width: `${(stepNumber / flow.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-8">
        {step === 0 && (
          <section>
            <StepHead title={tx(quoteUi.s1Title)} lead={tx(quoteUi.s1Lead)} />
            <div
              role="radiogroup"
              aria-label={tx(quoteUi.s1Title)}
              className="mt-6 grid gap-3 sm:grid-cols-2"
            >
              {quoteServices.map((s) => {
                const on = a.service === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => set({ service: s.id, scale: undefined, options: [] })}
                    className={`${cardBase} flex items-start gap-3 p-4 ${on ? cardOn : cardOff}`}
                  >
                    <span className="h-12 w-12 shrink-0 rounded-lg bg-brand/5 p-2.5">
                      <ServiceIllustration name={s.illustration} />
                    </span>
                    <span>
                      <span className="block font-semibold">{tx(s.title)}</span>
                      <span className="mt-0.5 block text-muted">{tx(s.blurb)}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            {showErrors && !a.service && <ErrorNote lang={lang} />}
          </section>
        )}

        {step === 1 && service && (
          <section>
            <StepHead title={tx(quoteUi.s2Title)} lead={tx(quoteUi.s2Lead)} />

            {service.scale && (
              <fieldset className="mt-6">
                <legend className="mb-2 text-sm font-medium">{tx(service.scale.label)}</legend>
                <div role="radiogroup" className="flex flex-wrap gap-2">
                  {service.scale.choices.map((c, i) => {
                    const on = (a.scale ?? service.scale!.choices[0].id) === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => set({ scale: c.id })}
                        className={`${cardBase} py-2 ${on ? cardOn : cardOff}`}
                      >
                        {tx(c.label)}
                        {i === 0 && <span className="sr-only"> (default)</span>}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            <fieldset className="mt-6">
              <legend className="mb-2 text-sm font-medium">{tx(quoteUi.s2Options)}</legend>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {service.options.map((o) => {
                  const on = a.options.includes(o.id);
                  return (
                    <button
                      key={o.id}
                      type="button"
                      role="checkbox"
                      aria-checked={on}
                      onClick={() => toggle("options", o.id)}
                      className={`${cardBase} flex items-center gap-3 ${on ? cardOn : cardOff}`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                          on ? "border-brand bg-brand text-white" : "border-border"
                        }`}
                        aria-hidden
                      >
                        {on && <Check className="h-3.5 w-3.5" />}
                      </span>
                      <span>{tx(o.label)}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-6">
            <StepHead title={tx(quoteUi.s3Title)} lead={tx(quoteUi.s3Lead)} />

            <TextField
              label={tx(quoteUi.industry)}
              value={a.industry}
              onChange={(v) => set({ industry: v })}
              placeholder={tx(quoteUi.industryPh)}
              autoComplete="organization-title"
            />

            <RadioGroup
              label={tx(quoteUi.state)}
              items={currentStates}
              twoCol
              value={a.state}
              onChange={(v) => set({ state: v })}
              tx={tx}
            />
            <RadioGroup
              label={tx(quoteUi.content)}
              items={contentStates}
              twoCol
              value={a.content}
              onChange={(v) => set({ content: v })}
              tx={tx}
            />
            {(a.service === "landing" ||
              a.service === "business" ||
              a.service === "store" ||
              a.service === "mobile" ||
              a.service === "webapp") && (
              <RadioGroup
                label={tx(quoteUi.design)}
                items={designStates}
                twoCol
                value={a.design}
                onChange={(v) => set({ design: v })}
                tx={tx}
              />
            )}

            <fieldset>
              <legend className="mb-2 text-sm font-medium">{tx(quoteUi.languages)}</legend>
              <div className="flex flex-wrap gap-2">
                {languageChoices.map((c) => {
                  const on = a.languages.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      role="checkbox"
                      aria-checked={on}
                      onClick={() => toggle("languages", c.id)}
                      className={`${cardBase} py-2 ${on ? cardOn : cardOff}`}
                    >
                      {tx(c.label)}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <TextField
              label={tx(quoteUi.url)}
              value={a.url}
              onChange={(v) => set({ url: v })}
              placeholder="https://"
              type="text"
              inputMode="url"
            />
            <TextField
              label={tx(quoteUi.integrations)}
              value={a.integrations}
              onChange={(v) => set({ integrations: v })}
              placeholder={tx(quoteUi.integrationsPh)}
            />

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">
                {tx(quoteUi.description)} <span className="text-brand">*</span>
              </span>
              <textarea
                rows={6}
                value={a.description}
                onChange={(e) => set({ description: e.target.value })}
                placeholder={tx(quoteUi.descriptionPh)}
                className={inputClass}
                aria-invalid={showErrors && a.description.trim().length < 10}
              />
            </label>
            {showErrors && a.description.trim().length < 10 && <ErrorNote lang={lang} />}

            <Attachments files={files} onChange={setFiles} lang={lang} />
          </section>
        )}

        {step === 3 && (
          <section className="space-y-6">
            <StepHead title={tx(quoteUi.s4Title)} lead={tx(quoteUi.s4Lead)} />
            <RadioGroup
              label={tx(quoteUi.timeline)}
              items={timelines}
              value={a.timeline}
              onChange={(v) => set({ timeline: v })}
              tx={tx}
              columns
            />
            {a.timeline === "date" && (
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">
                  {tx(quoteUi.deadline)} <span className="text-brand">*</span>
                </span>
                <input
                  type="date"
                  min={todayIso()}
                  value={a.deadline}
                  onChange={(e) => set({ deadline: e.target.value })}
                  className={`${inputClass} ${showErrors && !stepValid(3) ? "border-red-500" : ""}`}
                  aria-invalid={showErrors && !stepValid(3)}
                />
                <span className="mt-1.5 block text-xs text-muted">{tx(quoteUi.deadlineHint)}</span>
                {showErrors && !stepValid(3) && (
                  <span className="mt-1 block text-sm text-red-500" role="alert">
                    {tx(quoteUi.deadlinePast)}
                  </span>
                )}
              </label>
            )}
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">{tx(quoteUi.budget)}</span>
              <select
                value={a.budget}
                onChange={(e) => set({ budget: e.target.value })}
                className={inputClass}
              >
                {budgets.map((b) => (
                  <option key={b.id} value={b.id}>
                    {tx(b.label)}
                  </option>
                ))}
              </select>
            </label>
            {a.budget === "custom" && (
              <TextField
                label={tx(quoteUi.budgetCustom)}
                value={a.budgetCustom}
                onChange={(v) => set({ budgetCustom: v.slice(0, 40) })}
                placeholder={tx(quoteUi.budgetCustomPh)}
              />
            )}
            {service?.monthly && (
              <button
                type="button"
                role="checkbox"
                aria-checked={a.maintenance}
                onClick={() => set({ maintenance: !a.maintenance })}
                className={`${cardBase} flex w-full items-center gap-3 ${a.maintenance ? cardOn : cardOff}`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                    a.maintenance ? "border-brand bg-brand text-white" : "border-border"
                  }`}
                  aria-hidden
                >
                  {a.maintenance && <Check className="h-3.5 w-3.5" />}
                </span>
                <span>{tx(quoteUi.maintenance)}</span>
              </button>
            )}
          </section>
        )}

        {step === 4 && (
          <form onSubmit={submit} noValidate className="space-y-5">
            <StepHead title={tx(quoteUi.s5Title)} lead={tx(quoteUi.s5Lead)} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label={tx(quoteUi.name)}
                value={a.name}
                onChange={(v) => set({ name: v })}
                autoComplete="name"
                required
                invalid={showErrors && !a.name.trim()}
              />
              <TextField
                label={tx(quoteUi.email)}
                value={a.email}
                onChange={(v) => set({ email: v })}
                type="email"
                autoComplete="email"
                required
                invalid={showErrors && !EMAIL_RE.test(a.email.trim())}
              />
              <TextField
                label={tx(quoteUi.phone)}
                value={a.phone}
                onChange={(v) => set({ phone: v })}
                type="tel"
                autoComplete="tel"
                required={["phone", "whatsapp"].includes(a.via)}
                invalid={showErrors && ["phone", "whatsapp"].includes(a.via) && a.phone.trim().length < 6}
              />
              <TextField
                label={tx(quoteUi.company)}
                value={a.company}
                onChange={(v) => set({ company: v })}
                autoComplete="organization"
              />
            </div>

            <RadioGroup
              label={tx(quoteUi.via)}
              items={contactVia}
              value={a.via}
              onChange={(v) => set({ via: v })}
              tx={tx}
              compact
            />
            {a.via === "slack" && (
              <TextField
                label={tx(quoteUi.contactNote)}
                value={a.contactNote}
                onChange={(v) => set({ contactNote: v.slice(0, 200) })}
                placeholder={tx(quoteUi.contactNoteSlack)}
              />
            )}
            {showErrors && ["phone", "whatsapp"].includes(a.via) && a.phone.trim().length < 6 && (
              <p className="text-sm text-red-500" role="alert">{tx(quoteUi.phoneNeeded)}</p>
            )}

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">{tx(quoteUi.source)}</span>
              <select
                value={a.source}
                onChange={(e) => set({ source: e.target.value })}
                className={inputClass}
              >
                <option value="" />
                {sources.map((s) => (
                  <option key={s.id} value={s.id}>
                    {tx(s.label)}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={a.consent}
                onChange={(e) => set({ consent: e.target.checked })}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[rgb(var(--brand))]"
                aria-invalid={showErrors && !a.consent}
              />
              <span className={showErrors && !a.consent ? "text-red-500" : undefined}>
                {tx(quoteUi.consent)}
              </span>
            </label>

            {siteKey && <div ref={turnstileEl} className="flex justify-center" />}
            {siteKey && !verified && status !== "error" && (
              <p className="text-center text-xs text-muted">{tx(quoteUi.verifying)}</p>
            )}

            {showErrors && !stepValid(4) && <ErrorNote lang={lang} />}
            {status === "error" && (
              <p className="text-sm text-red-500">
                {errorCode === "turnstile_failed"
                  ? tx(quoteUi.errTurnstile)
                  : errorCode === "bad_attachment"
                    ? tx(quoteUi.errUpload)
                    : tx(quoteUi.error)}{" "}
                <a href={`mailto:${site.email}`} className="font-medium underline">
                  {site.email}
                </a>
                .
              </p>
            )}

            <div className="flex items-center justify-between gap-3 pt-2">
              <BackButton
                label={tx(quoteUi.back)}
                disabled={status === "sending"}
                onClick={() => setPos((p) => Math.max(p - 1, 0))}
              />
              <button
                type="submit"
                disabled={status === "sending" || (!!siteKey && !verified)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? tx(quoteUi.sending) : tx(quoteUi.submit)}
                {status !== "sending" && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-center text-xs text-muted">{tx(quoteUi.stepNote)}</p>
          </form>
        )}

        {!isLast && (
          <div className="mt-8 flex items-center justify-between gap-3">
            {pos > 0 ? (
              <BackButton
                label={tx(quoteUi.back)}
                onClick={() => setPos((p) => Math.max(p - 1, 0))}
              />
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={goNext}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-soft"
            >
              {tx(quoteUi.next)}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- small building blocks ----------

function StepHead({ title, lead }: { title: string; lead: string }) {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="mt-1.5 text-muted">{lead}</p>
    </div>
  );
}

function ErrorNote({ lang }: { lang: Lang }) {
  return (
    <p className="mt-3 text-sm text-red-500" role="alert">
      {quoteUi.required[lang]}
    </p>
  );
}

function BackButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-brand hover:text-brand disabled:opacity-60"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </button>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  inputMode,
  required,
  invalid,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "url" | "text";
  required?: boolean;
  invalid?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">
        {label} {required && <span className="text-brand">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={invalid || undefined}
        className={`${inputClass} ${invalid ? "border-red-500" : ""}`}
      />
    </label>
  );
}

function RadioGroup({
  label,
  items,
  value,
  onChange,
  tx,
  columns,
  twoCol,
  compact,
}: {
  label: string;
  items: (Plain & { hint?: L })[];
  value: string;
  onChange: (v: string) => void;
  tx: (v: L) => string;
  columns?: boolean;
  twoCol?: boolean;
  compact?: boolean;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">{label}</legend>
      <div
        role="radiogroup"
        className={
          compact
            ? "flex flex-wrap gap-2"
            : columns || twoCol
              ? "grid gap-2.5 sm:grid-cols-2"
              : "grid gap-2.5"
        }
      >
        {items.map((it) => {
          const on = value === it.id;
          return (
            <button
              key={it.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(on && !columns ? "" : it.id)}
              className={`${cardBase} ${compact ? "py-2" : ""} ${on ? cardOn : cardOff}`}
            >
              <span className="block font-medium">{tx(it.label)}</span>
              {it.hint && <span className="mt-0.5 block text-xs text-muted">{tx(it.hint)}</span>}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

// ---------- result ----------

function QuoteResult({
  lang,
  serviceTitle,
  estimate,
  maintenance,
  email,
}: {
  lang: Lang;
  serviceTitle: string;
  estimate: ReturnType<typeof calculateEstimate>;
  maintenance: boolean;
  email: string;
}) {
  const { format } = useCurrency();
  const tx = (v: L) => v[lang];

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
        <Check className="h-7 w-7" />
      </div>
      <p className="mt-5 text-center text-sm font-semibold uppercase tracking-widest text-brand">
        {tx(quoteUi.resultEyebrow)}
      </p>
      <h2 className="mt-2 text-center text-2xl font-bold tracking-tight sm:text-3xl">
        {tx(quoteUi.resultHeading)}
      </h2>
      <p className="mt-1 text-center text-muted">{serviceTitle}</p>

      {estimate ? (
        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-brand/30 bg-brand/5 p-6 text-center">
          <p className="text-3xl font-bold tracking-tight sm:text-4xl" suppressHydrationWarning>
            {estimate.low === estimate.high
              ? `${tx(quoteUi.from)} ${format(estimate.low)}`
              : `${format(estimate.low)} – ${format(estimate.high)}`}
          </p>
          <p className="mt-1 text-sm text-muted">{tx(quoteUi.resultNet)}</p>
          {maintenance && estimate.monthly && (
            <p className="mt-4 border-t border-brand/20 pt-4 text-sm" suppressHydrationWarning>
              <span className="text-muted">{tx(quoteUi.monthly)}: </span>
              <span className="font-semibold">
                {format(estimate.monthly[0])} – {format(estimate.monthly[1])}
              </span>
            </p>
          )}
        </div>
      ) : (
        <p className="mx-auto mt-8 max-w-xl rounded-2xl border border-border p-6 text-center">
          {tx(quoteUi.resultOther)}
        </p>
      )}

      {estimate && (
        <p className="mx-auto mt-4 flex max-w-xl items-start gap-2 text-sm text-muted">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
          <span>
            {tx(quoteUi.resultNote)} <span className="font-medium text-fg">{email}</span>
          </span>
        </p>
      )}

      {estimate && (
        <div className="mx-auto mt-8 max-w-xl">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">
            {tx(quoteUi.breakdown)}
          </h3>
          <ul className="mt-3 divide-y divide-border rounded-xl border border-border text-sm">
            {estimate.items.map((it, i) => (
              <li key={i} className="flex items-center justify-between gap-4 px-4 py-2.5">
                <span>{tx(it.label)}</span>
                <span className="shrink-0 text-muted" suppressHydrationWarning>
                  {it.min === it.max
                    ? format(it.min)
                    : `${format(it.min)} – ${format(it.max)}`}
                </span>
              </li>
            ))}
          </ul>
          {estimate.timelineFactor[1] > 1 && (
            <p className="mt-2 text-xs text-muted">{tx(quoteUi.rush)}</p>
          )}
        </div>
      )}

      <div className="mx-auto mt-10 max-w-xl">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">
          {tx(quoteUi.nextTitle)}
        </h3>
        <ol className="mt-3 space-y-3">
          {[quoteUi.next1, quoteUi.next2, quoteUi.next3].map((s, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
                {i + 1}
              </span>
              {tx(s)}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-xl border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
        >
          {tx(quoteUi.home)}
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center rounded-xl border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
        >
          {tx(quoteUi.blog)}
        </Link>
      </div>
    </div>
  );
}

// ---------- attachments ----------

function Attachments({
  files,
  onChange,
  lang,
}: {
  files: File[];
  onChange: (files: File[]) => void;
  lang: Lang;
}) {
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const tx = (v: L) => v[lang];
  const fill = (text: string, vars: Record<string, string | number>) =>
    Object.entries(vars).reduce((acc, [k, v]) => acc.replace(`{${k}}`, String(v)), text);

  // Object URLs for thumbnails; revoked when the list changes or on unmount.
  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);
  useEffect(() => () => previews.forEach((u) => URL.revokeObjectURL(u)), [previews]);

  function add(list: FileList | null) {
    if (!list) return;
    let next = [...files];
    let message = "";
    for (const file of Array.from(list)) {
      if (!ATTACHMENT_TYPES.includes(file.type)) {
        message = fill(tx(quoteUi.attachBadType), { name: file.name });
      } else if (file.size > MAX_ATTACHMENT_MB * 1024 * 1024) {
        message = fill(tx(quoteUi.attachTooBig), { name: file.name, mb: MAX_ATTACHMENT_MB });
      } else if (next.length >= MAX_ATTACHMENTS) {
        message = fill(tx(quoteUi.attachTooMany), { n: MAX_ATTACHMENTS });
      } else {
        next = [...next, file];
      }
    }
    setError(message);
    onChange(next);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <p className="mb-1 text-sm font-medium">{tx(quoteUi.attachTitle)}</p>
      <p className="mb-2 text-xs text-muted">
        {fill(tx(quoteUi.attachHint), { n: MAX_ATTACHMENTS, mb: MAX_ATTACHMENT_MB })}
      </p>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          add(e.dataTransfer.files);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center text-sm transition-colors focus-within:ring-2 focus-within:ring-brand/40 ${
          dragging ? "border-brand bg-brand/5" : "border-border hover:border-brand/50"
        }`}
      >
        <ImagePlus className="h-6 w-6 text-brand" aria-hidden />
        <span>{tx(quoteUi.attachDrop)}</span>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ATTACHMENT_TYPES.join(",")}
          onChange={(e) => add(e.target.files)}
          className="sr-only"
        />
      </label>

      {error && (
        <p className="mt-2 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      {files.length > 0 && (
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className="group relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previews[i]}
                alt={file.name}
                className="h-20 w-full rounded-lg border border-border object-cover"
              />
              <button
                type="button"
                onClick={() => onChange(files.filter((_, idx) => idx !== i))}
                aria-label={`${tx(quoteUi.attachRemove)}: ${file.name}`}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-fg text-bg shadow transition-transform hover:scale-110"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <p className="mt-1 truncate text-xs text-muted">{file.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

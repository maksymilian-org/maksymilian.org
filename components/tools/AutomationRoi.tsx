"use client";

import { useRef, useState } from "react";
import { useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BookCall } from "@/components/contact/BookCall";
import { trackEvent } from "@/utils/analytics";

type Lang = "pl" | "en";

const UI = {
  pl: {
    hours: "Godzin tygodniowo na jedno powtarzalne zadanie",
    people: "Ile osób je wykonuje",
    rate: "Koszt godziny pracy (zł, z narzutami)",
    pct: "Jaką część da się zautomatyzować",
    build: "Koszt wdrożenia automatyzacji (zł)",
    upkeep: "Miesięczny koszt utrzymania (zł)",
    yearly: "Roczny koszt pracy ręcznej",
    saved: "Roczna oszczędność",
    hoursSaved: "Odzyskane godziny rocznie",
    payback: "Zwrot po",
    months: "mies.",
    never: "brak zwrotu przy tych założeniach",
    net: "Wynik po pierwszym roku",
    note: "Orientacyjne wyliczenie na podstawie podanych założeń, nie gwarancja. Wartości domyślne to przykład, wpisz własne.",
    ctaTitle: "Chcesz policzyć to dla swojego procesu?",
    ctaText: "Opisz zadanie w kalkulatorze wyceny, a zobaczysz widełki kosztu wdrożenia.",
    quote: "Wycena automatyzacji",
    cur: "zł",
  },
  en: {
    hours: "Hours per week on one repetitive task",
    people: "How many people do it",
    rate: "Cost of an hour of work (PLN, fully loaded)",
    pct: "How much of it can be automated",
    build: "Cost of building the automation (PLN)",
    upkeep: "Monthly running cost (PLN)",
    yearly: "Yearly cost of the manual work",
    saved: "Yearly saving",
    hoursSaved: "Hours won back per year",
    payback: "Pays back in",
    months: "months",
    never: "no payback under these assumptions",
    net: "Result after the first year",
    note: "An indicative calculation based on your assumptions, not a guarantee. The defaults are an example, enter your own.",
    ctaTitle: "Want this worked out for your process?",
    ctaText: "Describe the task in the quote calculator and see a range for the build cost.",
    quote: "Automation quote",
    cur: "PLN",
  },
} as const;

function num(v: string, fallback = 0) {
  const n = parseFloat(v.replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

export function AutomationRoi() {
  const lang = useLocale() as Lang;
  const ui = UI[lang];
  const fmt = new Intl.NumberFormat(lang === "pl" ? "pl-PL" : "en-GB", { maximumFractionDigits: 0 });
  const fmt1 = new Intl.NumberFormat(lang === "pl" ? "pl-PL" : "en-GB", { maximumFractionDigits: 1 });
  const money = (n: number) => `${fmt.format(Math.round(n))} ${ui.cur}`;

  const [hours, setHours] = useState("5");
  const [people, setPeople] = useState("1");
  const [rate, setRate] = useState("60");
  const [pct, setPct] = useState(80);
  const [build, setBuild] = useState("1500");
  const [upkeep, setUpkeep] = useState("0");
  const tracked = useRef(false);

  function touch() {
    if (tracked.current) return;
    tracked.current = true;
    trackEvent("tool_complete", { tool: "automation_roi" });
  }

  const h = num(hours), p = num(people), r = num(rate), b = num(build), u = num(upkeep);
  const yearlyManual = h * p * r * 52;
  const yearlySaved = yearlyManual * (pct / 100);
  const hoursSaved = h * p * 52 * (pct / 100);
  const monthlyGain = yearlySaved / 12 - u;
  const paybackMonths = monthlyGain > 0 ? b / monthlyGain : null;
  const netYear1 = yearlySaved - b - u * 12;

  const field = (label: string, value: string, set: (v: string) => void, suffix?: string) => (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          min={0}
          value={value}
          onChange={(e) => { touch(); set(e.target.value); }}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 pr-14 text-fg outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/30"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-border bg-surface p-6">
          {field(ui.hours, hours, setHours, "h")}
          {field(ui.people, people, setPeople)}
          {field(ui.rate, rate, setRate, ui.cur)}
          <label className="block">
            <span className="mb-1.5 flex items-center justify-between text-sm font-medium">
              {ui.pct}
              <span className="text-brand">{pct}%</span>
            </span>
            <input
              type="range"
              min={10}
              max={95}
              step={5}
              value={pct}
              onChange={(e) => { touch(); setPct(Number(e.target.value)); }}
              className="w-full accent-[rgb(var(--brand))]"
            />
          </label>
          {field(ui.build, build, setBuild, ui.cur)}
          {field(ui.upkeep, upkeep, setUpkeep, ui.cur)}
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-brand/30 bg-brand/5 p-6">
            <p className="text-sm text-muted">{ui.saved}</p>
            <p className="mt-1 text-4xl font-bold tracking-tight text-brand">{money(yearlySaved)}</p>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted">{ui.yearly}</dt>
                <dd className="font-medium">{money(yearlyManual)}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted">{ui.hoursSaved}</dt>
                <dd className="font-medium">{fmt.format(Math.round(hoursSaved))} h</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted">{ui.payback}</dt>
                <dd className="font-medium">
                  {paybackMonths === null
                    ? ui.never
                    : `${paybackMonths < 1 ? "<1" : fmt1.format(paybackMonths)} ${ui.months}`}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-brand/20 pt-3">
                <dt className="text-muted">{ui.net}</dt>
                <dd className={`font-semibold ${netYear1 >= 0 ? "text-brand" : "text-red-500"}`}>{money(netYear1)}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl bg-brand-solid p-6 text-white">
            <h3 className="text-lg font-bold">{ui.ctaTitle}</h3>
            <p className="mt-1 text-sm text-white/85">{ui.ctaText}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href={{ pathname: "/quote", query: { service: "automation" } }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-solid transition-all hover:-translate-y-0.5"
              >
                {ui.quote}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <BookCall variant="onBrand" />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-muted">{ui.note}</p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { ArrowRight, Check, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BookCall } from "@/components/contact/BookCall";
import { trackEvent } from "@/utils/analytics";

type Lang = "pl" | "en";
interface Q {
  q: { pl: string; en: string };
  /** What to do when the answer is "no". */
  fix: { pl: string; en: string };
}

// Facts follow the KSeF schedule: large taxpayers 2026-02-01, everyone else
// 2026-04-01, micro (sales up to 10k PLN a month) 2027-01-01; receiving
// invoices has been required of every company since 2026-02-01.
const QUESTIONS: Q[] = [
  {
    q: { pl: "Wiesz, od kiedy obowiązek KSeF dotyczy Twojej firmy?", en: "Do you know when the KSeF obligation applies to your company?" },
    fix: { pl: "Ustal swój termin: od 1 lutego 2026 (obroty ponad 200 mln zł), od 1 kwietnia 2026 (pozostali) albo od 1 stycznia 2027 (sprzedaż do 10 tys. zł miesięcznie). Odbiór faktur z KSeF obowiązuje już wszystkich.", en: "Find out your date: 1 February 2026 (turnover above 200 million PLN), 1 April 2026 (everyone else) or 1 January 2027 (sales up to 10,000 PLN a month). Receiving invoices from KSeF already applies to everyone." },
  },
  {
    q: { pl: "Czy Twój program do fakturowania lub ERP umie wysyłać faktury do KSeF?", en: "Can your invoicing program or ERP send invoices to KSeF?" },
    fix: { pl: "Sprawdź u dostawcy, czy jest moduł KSeF (schemat FA(3)). Jeśli system jest starszy lub własny, potrzebna będzie integracja przez API albo warstwa pośrednia.", en: "Ask your vendor whether there is a KSeF module (FA(3) schema). If the system is older or in-house, you will need an API integration or a middleware layer." },
  },
  {
    q: { pl: "Masz skonfigurowane uwierzytelnienie w KSeF (certyfikat lub token)?", en: "Have you set up KSeF authentication (certificate or token)?" },
    fix: { pl: "Skonfiguruj dostęp i uprawnienia w KSeF dla firmy i osób, które będą z niego korzystać. Zadbaj o bezpieczne przechowywanie certyfikatów i tokenów.", en: "Set up KSeF access and permissions for the company and the people who will use it. Store certificates and tokens securely." },
  },
  {
    q: { pl: "Potrafisz odbierać faktury kosztowe z KSeF?", en: "Can you receive purchase invoices from KSeF?" },
    fix: { pl: "Odbiór faktur obowiązuje już wszystkie firmy. Ustal, jak pobierasz faktury (ręcznie, przez program lub automat) i kto je przypisuje do zamówień lub kosztów.", en: "Receiving invoices applies to all companies. Decide how you fetch invoices (by hand, through your program or automatically) and who matches them to orders or costs." },
  },
  {
    q: { pl: "Wszystkie faktury wystawiasz z jednego systemu?", en: "Do you issue all invoices from a single system?" },
    fix: { pl: "Faktury z kilku źródeł (ERP, magazyn, sklep, ręczne) trzeba podłączyć albo wyłączyć z obiegu. Zrób listę wszystkich miejsc, w których powstają faktury.", en: "Invoices from several sources (ERP, warehouse, store, manual) must be connected or taken out of the flow. List every place where invoices are created." },
  },
  {
    q: { pl: "Masz procedurę korekt faktur?", en: "Do you have a procedure for correcting invoices?" },
    fix: { pl: "Faktury przyjętej przez KSeF nie da się edytować, każda zmiana to faktura korygująca. Opisz, kto i kiedy ją wystawia przy zwrotach i reklamacjach.", en: "An invoice accepted by KSeF can't be edited, every change is a correction invoice. Define who issues it and when for returns and complaints." },
  },
  {
    q: { pl: "Wiesz, co robić, gdy KSeF jest niedostępny?", en: "Do you know what to do when KSeF is unavailable?" },
    fix: { pl: "Poznaj tryby awaryjny i offline oraz terminy dosyłania faktur. System powinien wiedzieć, kiedy z nich korzystać, i dosyłać dokumenty po powrocie usługi.", en: "Learn the emergency and offline modes and the deadlines for resubmitting invoices. The system should know when to use them and resubmit documents once the service is back." },
  },
  {
    q: { pl: "Przechowujesz numer KSeF i potwierdzenie odbioru (UPO) przy każdej fakturze?", en: "Do you store the KSeF number and the receipt confirmation (UPO) with every invoice?" },
    fix: { pl: "Zapisuj numer KSeF i UPO przy fakturze, razem z kopią wysłanego XML. To Twój dowód, że dokument został przyjęty.", en: "Save the KSeF number and UPO with the invoice, along with a copy of the XML that was sent. It is your proof that the document was accepted." },
  },
  {
    q: { pl: "Przetestowałeś wysyłkę i odbiór w środowisku testowym?", en: "Have you tested sending and receiving in the test environment?" },
    fix: { pl: "Przetestuj całość na realnych przypadkach (korekty, zaliczki, załączniki), nie na jednej fakturze. Środowisko testowe KSeF jest do tego przeznaczone.", en: "Test the whole flow on real cases (corrections, advances, attachments), not on a single invoice. The KSeF test environment exists for this." },
  },
  {
    q: { pl: "Twoja księgowość ma ustalony sposób pracy z KSeF (dostęp, uprawnienia, akceptacja)?", en: "Does your accounting have an agreed way of working with KSeF (access, permissions, approval)?" },
    fix: { pl: "Ustal z biurem rachunkowym lub księgowością, kto ma dostęp do KSeF, jak przekazywane są faktury i kto je akceptuje.", en: "Agree with your accountant or finance team who has KSeF access, how invoices are passed on and who approves them." },
  },
];

const UI = {
  pl: {
    intro: "Odpowiedz na 10 pytań. Na końcu dostaniesz wynik i listę konkretnych rzeczy do zrobienia.",
    yes: "Tak",
    no: "Nie",
    answered: "Odpowiedzi",
    show: "Pokaż wynik",
    again: "Zacznij od nowa",
    tiers: [
      { min: 9, title: "Jesteś dobrze przygotowany", text: "Prawie wszystko masz uporządkowane. Sprawdź jeszcze pozostałe punkty z listy poniżej." },
      { min: 6, title: "Jesteś blisko, ale są luki", text: "Podstawy masz, lecz kilka obszarów wymaga uwagi, zanim KSeF zacznie sprawiać problemy." },
      { min: 3, title: "Potrzebujesz uporządkować kilka rzeczy", text: "Wiele elementów jest niedopracowanych. Warto zająć się nimi w kolejności z listy poniżej." },
      { min: 0, title: "Pilnie zajmij się KSeF", text: "Większość obszarów jest nieprzygotowana. Zacznij od pierwszych punktów z listy." },
    ],
    todo: "Do zrobienia",
    nothing: "Wszystkie punkty zaznaczyłeś jako gotowe. Świetnie.",
    note: "To narzędzie edukacyjne, nie porada podatkowa. Szczegóły obowiązków sprawdzaj w aktualnych przepisach i u księgowego.",
    ctaTitle: "Chcesz, żeby ktoś to zrobił za Ciebie?",
    ctaText: "Podłączam systemy do KSeF od strony technicznej. Zobacz orientacyjne widełki w kalkulatorze.",
    quote: "Wycena integracji KSeF",
  },
  en: {
    intro: "Answer 10 questions. At the end you get a score and a list of concrete things to do.",
    yes: "Yes",
    no: "No",
    answered: "Answered",
    show: "Show my score",
    again: "Start again",
    tiers: [
      { min: 9, title: "You are well prepared", text: "Almost everything is in order. Check the remaining points on the list below." },
      { min: 6, title: "You are close, but there are gaps", text: "You have the basics, but a few areas need attention before KSeF starts causing trouble." },
      { min: 3, title: "A few things need sorting out", text: "Several elements are unfinished. It is worth tackling them in the order below." },
      { min: 0, title: "Deal with KSeF urgently", text: "Most areas are unprepared. Start with the first items on the list." },
    ],
    todo: "To do",
    nothing: "You marked every point as ready. Great.",
    note: "This is an educational tool, not tax advice. Check the details of your obligations in current regulations and with your accountant.",
    ctaTitle: "Want someone to do it for you?",
    ctaText: "I connect systems to KSeF on the technical side. See an indicative range in the calculator.",
    quote: "Get a KSeF integration quote",
  },
} as const;

export function KsefReadiness() {
  const lang = useLocale() as Lang;
  const ui = UI[lang];
  const [answers, setAnswers] = useState<(boolean | null)[]>(QUESTIONS.map(() => null));
  const [done, setDone] = useState(false);

  const answered = answers.filter((a) => a !== null).length;
  const score = answers.filter((a) => a === true).length;
  const tier = ui.tiers.find((t) => score >= t.min) ?? ui.tiers[ui.tiers.length - 1];
  const todo = QUESTIONS.filter((_, i) => answers[i] === false);

  function set(i: number, v: boolean) {
    setAnswers((prev) => prev.map((x, idx) => (idx === i ? v : x)));
  }

  function reveal() {
    setDone(true);
    trackEvent("tool_complete", { tool: "ksef_readiness", score });
  }

  if (done) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-brand/30 bg-brand/5 p-6 text-center sm:p-8">
          <p className="text-5xl font-bold tracking-tight text-brand">
            {score}<span className="text-2xl text-muted">/{QUESTIONS.length}</span>
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">{tier.title}</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted">{tier.text}</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="text-lg font-semibold">{ui.todo}</h3>
          {todo.length === 0 ? (
            <p className="mt-3 text-sm text-muted">{ui.nothing}</p>
          ) : (
            <ol className="mt-4 space-y-4">
              {todo.map((q, i) => (
                <li key={q.q.pl} className="flex gap-3 text-sm leading-relaxed">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-solid text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-medium">{q.q[lang]}</span>
                    <span className="mt-1 block text-muted">{q.fix[lang]}</span>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="rounded-2xl bg-brand-solid p-6 text-center text-white sm:p-8">
          <h3 className="text-xl font-bold">{ui.ctaTitle}</h3>
          <p className="mx-auto mt-2 max-w-lg text-white/85">{ui.ctaText}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={{ pathname: "/quote", query: { service: "ksef" } }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-solid transition-all hover:-translate-y-0.5"
            >
              {ui.quote}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <BookCall variant="onBrand" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => { setAnswers(QUESTIONS.map(() => null)); setDone(false); }}
            className="text-sm font-medium text-brand hover:underline"
          >
            {ui.again}
          </button>
          <p className="max-w-xl text-center text-xs text-muted">{ui.note}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-muted">{ui.intro}</p>
      <ol className="mt-6 space-y-3">
        {QUESTIONS.map((q, i) => (
          <li key={q.q.pl} className="rounded-xl border border-border bg-surface p-4">
            <p className="text-sm font-medium">
              <span className="mr-2 text-brand">{i + 1}.</span>
              {q.q[lang]}
            </p>
            <div role="radiogroup" aria-label={q.q[lang]} className="mt-3 flex gap-2">
              {([true, false] as const).map((v) => {
                const on = answers[i] === v;
                return (
                  <button
                    key={String(v)}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => set(i, v)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                      on ? "border-brand bg-brand/5 text-brand" : "border-border hover:border-brand/50"
                    }`}
                  >
                    {v ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    {v ? ui.yes : ui.no}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">
          {ui.answered}: {answered}/{QUESTIONS.length}
        </p>
        <button
          type="button"
          onClick={reveal}
          disabled={answered < QUESTIONS.length}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-solid px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {ui.show}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

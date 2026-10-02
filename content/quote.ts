import type { IllustrationKey } from "@/content/services";

// Single source of truth for the online quote estimator. Prices are PLN, net.
// Tune the numbers here — the wizard UI, the result screen and the e-mail that
// reaches the owner are all derived from this file.

export type L = { pl: string; en: string };
const l = (pl: string, en: string): L => ({ pl, en });

export type ServiceId =
  | "landing"
  | "business"
  | "store"
  | "mobile"
  | "webapp"
  | "automation"
  | "ai"
  | "ksef"
  | "other";

export interface Choice {
  id: string;
  label: L;
  hint?: L;
  min: number;
  max: number;
}

export interface QuoteService {
  id: ServiceId;
  illustration: IllustrationKey;
  title: L;
  blurb: L;
  /** Starting price (PLN net). null = priced individually, no estimate shown. */
  base: number | null;
  /** Optional single-choice size question; the first choice is the default. */
  scale?: { label: L; choices: Choice[] };
  /** Optional add-ons (multi-select). */
  options: Choice[];
  /** Typical monthly upkeep range (PLN net), if the service has one. */
  monthly: [number, number] | null;
}

export const quoteServices: QuoteService[] = [
  {
    id: "landing",
    illustration: "websites",
    title: l("Wizytówka / landing", "One-page site / landing"),
    blurb: l(
      "Jedna strona, która zbiera kontakty i robi dobre wrażenie.",
      "A single page that collects enquiries and makes a strong first impression."
    ),
    base: 400,
    options: [
      { id: "copy", label: l("Pomoc z tekstami", "Copywriting help"), min: 100, max: 250 },
      { id: "multilang", label: l("Wersja w drugim języku", "Second language version"), min: 50, max: 300 },
      { id: "booking", label: l("Rezerwacja terminów / kalendarz", "Booking / calendar widget"), min: 100, max: 350 },
      { id: "blog", label: l("Sekcja aktualności / blog", "News / blog section"), min: 50, max: 350 },
      { id: "animations", label: l("Animacje i efekty", "Animations and effects"), min: 50, max: 300 },
      { id: "analytics", label: l("Analityka i konfiguracja SEO", "Analytics and SEO setup"), min: 50, max: 250 },
      { id: "branding", label: l("Logo / odświeżenie identyfikacji", "Logo / brand refresh"), min: 100, max: 600 },
    ],
    monthly: [30, 100],
  },
  {
    id: "business",
    illustration: "websites",
    title: l("Strona firmowa", "Company website"),
    blurb: l(
      "Wielopodstronowa strona, która buduje zaufanie i pozycję w Google.",
      "A multi-page site that builds trust and ranks on Google."
    ),
    base: 600,
    scale: {
      label: l("Ile podstron?", "How many pages?"),
      choices: [
        { id: "p5", label: l("Do 5", "Up to 5"), min: 0, max: 0 },
        { id: "p10", label: l("6–10", "6–10"), min: 50, max: 400 },
        { id: "p20", label: l("11–20", "11–20"), min: 100, max: 600 },
        { id: "p20plus", label: l("Ponad 20", "Over 20"), min: 150, max: 1800 },
      ],
    },
    options: [
      { id: "cms", label: l("Panel do samodzielnej edycji treści", "Panel to edit content yourself"), min: 100, max: 800 },
      { id: "blog", label: l("Blog / aktualności", "Blog / news"), min: 50, max: 450 },
      { id: "multilang", label: l("Wersje językowe", "Language versions"), min: 50, max: 700 },
      { id: "forms", label: l("Rezerwacje, rozbudowane formularze", "Bookings, advanced forms"), min: 100, max: 450 },
      { id: "copy", label: l("Pomoc z tekstami", "Copywriting help"), min: 50, max: 600 },
      { id: "graphics", label: l("Grafiki / ilustracje", "Graphics / illustrations"), min: 50, max: 400 },
      { id: "seo", label: l("Rozszerzone SEO (treści, dane strukturalne)", "Extended SEO (content, structured data)"), min: 100, max: 600 },
      { id: "migration", label: l("Przeniesienie treści ze starej strony", "Migrating content from an old site"), min: 0, max: 500 },
    ],
    monthly: [50, 150],
  },
  {
    id: "store",
    illustration: "ecommerce",
    title: l("Sklep internetowy", "Online store"),
    blurb: l(
      "Sklep gotowy do sprzedaży: płatności, wysyłka, panel zarządzania.",
      "A store ready to sell: payments, shipping, management panel."
    ),
    base: 1200,
    scale: {
      label: l("Ile produktów?", "How many products?"),
      choices: [
        { id: "s50", label: l("Do 50", "Up to 50"), min: 0, max: 0 },
        { id: "s500", label: l("50–500", "50–500"), min: 200, max: 500 },
        { id: "s500plus", label: l("Ponad 500 (import)", "Over 500 (import)"), min: 500, max: 1400 },
      ],
    },
    options: [
      { id: "shipping", label: l("Integracje wysyłki (InPost, kurierzy)", "Shipping integrations (couriers)"), min: 100, max: 350 },
      { id: "marketplace", label: l("Allegro / Baselinker", "Marketplaces / Baselinker"), min: 300, max: 900 },
      { id: "invoicing", label: l("Fakturowanie / księgowość", "Invoicing / accounting"), min: 200, max: 600 },
      { id: "multilang", label: l("Wiele języków lub walut", "Multiple languages or currencies"), min: 300, max: 800 },
      { id: "accounts", label: l("Konta klientów, program lojalnościowy", "Customer accounts, loyalty programme"), min: 200, max: 700 },
      { id: "configurator", label: l("Konfigurator produktów", "Product configurator"), min: 400, max: 1400 },
      { id: "feeds", label: l("Feedy do porównywarek", "Product feeds for comparison sites"), min: 150, max: 450 },
      { id: "migration", label: l("Migracja ze starego sklepu", "Migration from an existing store"), min: 300, max: 1000 },
    ],
    monthly: [100, 250],
  },
  {
    id: "mobile",
    illustration: "mobile",
    title: l("Aplikacja mobilna", "Mobile app"),
    blurb: l(
      "iOS i Android z jednego kodu — od pomysłu po sklepy z aplikacjami.",
      "iOS and Android from one codebase — from idea to the app stores."
    ),
    base: 1600,
    scale: {
      label: l("Ile ekranów / widoków?", "How many screens?"),
      choices: [
        { id: "x5", label: l("Do 5", "Up to 5"), min: 0, max: 0 },
        { id: "x12", label: l("6–12", "6–12"), min: 500, max: 1000 },
        { id: "x25", label: l("13–25", "13–25"), min: 1200, max: 2800 },
        { id: "x25plus", label: l("Ponad 25", "Over 25"), min: 2800, max: 6000 },
      ],
    },
    options: [
      { id: "accounts", label: l("Logowanie i konta użytkowników", "Sign-in and user accounts"), min: 300, max: 800 },
      { id: "payments", label: l("Płatności / subskrypcje", "Payments / subscriptions"), min: 400, max: 1200 },
      { id: "push", label: l("Powiadomienia push", "Push notifications"), min: 150, max: 350 },
      { id: "offline", label: l("Tryb offline", "Offline mode"), min: 300, max: 900 },
      { id: "maps", label: l("Mapy i lokalizacja", "Maps and location"), min: 200, max: 600 },
      { id: "media", label: l("Aparat, zdjęcia, pliki", "Camera, photos, files"), min: 150, max: 450 },
      { id: "backend", label: l("Backend i API", "Backend and API"), min: 600, max: 1800 },
      { id: "admin", label: l("Panel administracyjny", "Admin panel"), min: 600, max: 1800 },
      { id: "chat", label: l("Czat / wiadomości", "Chat / messaging"), min: 500, max: 1600 },
    ],
    monthly: [150, 400],
  },
  {
    id: "webapp",
    illustration: "webapps",
    title: l("Aplikacja webowa / system", "Web app / custom system"),
    blurb: l(
      "System szyty na miarę: panel, rezerwacje, portal klienta, CRM.",
      "A system built for you: dashboard, bookings, client portal, CRM."
    ),
    base: 2000,
    options: [
      { id: "roles", label: l("Konta i role pracowników", "Staff accounts and roles"), min: 300, max: 700 },
      { id: "bookings", label: l("Rezerwacje / harmonogramy", "Bookings / scheduling"), min: 500, max: 1200 },
      { id: "portal", label: l("Portal klienta (bez zakładania konta)", "Client portal (no account needed)"), min: 400, max: 1000 },
      { id: "orders", label: l("Panel obsługi zleceń / zamówień", "Order / job management panel"), min: 500, max: 1300 },
      { id: "pricing", label: l("Automatyczna wycena według reguł", "Rule-based automatic pricing"), min: 400, max: 1000 },
      { id: "pdf", label: l("Dokumenty i umowy PDF", "PDF documents and contracts"), min: 250, max: 500 },
      { id: "notify", label: l("Powiadomienia e-mail / SMS", "E-mail / SMS notifications"), min: 200, max: 400 },
      { id: "payments", label: l("Płatności online", "Online payments"), min: 300, max: 700 },
      { id: "reports", label: l("Raporty i dashboardy", "Reports and dashboards"), min: 300, max: 900 },
      { id: "export", label: l("Import / eksport XLSX, CSV", "XLSX / CSV import and export"), min: 150, max: 350 },
      { id: "integrations", label: l("Integracje z innymi systemami", "Integrations with other systems"), min: 250, max: 900 },
      { id: "migration", label: l("Migracja danych z Excela / starego systemu", "Data migration from Excel / an old system"), min: 200, max: 600 },
      { id: "multilang", label: l("Wiele języków lub walut", "Multiple languages or currencies"), min: 200, max: 400 },
    ],
    monthly: [200, 450],
  },
  {
    id: "automation",
    illustration: "integrations",
    title: l("Integracja / automatyzacja", "Integration / automation"),
    blurb: l(
      "Połącz systemy i zdejmij z siebie powtarzalną pracę.",
      "Connect your systems and take repetitive work off your plate."
    ),
    base: 400,
    scale: {
      label: l("Ile procesów do zautomatyzowania?", "How many processes?"),
      choices: [
        { id: "n1", label: l("Jeden", "One"), min: 0, max: 0 },
        { id: "n3", label: l("2–3", "2–3"), min: 300, max: 800 },
        { id: "n4", label: l("4 lub więcej", "4 or more"), min: 800, max: 2200 },
      ],
    },
    options: [
      { id: "api", label: l("Integracja z zewnętrznym API", "External API integration"), min: 200, max: 600 },
      { id: "invoicing", label: l("Fakturowanie / KSeF / JPK", "Invoicing / KSeF / JPK"), min: 300, max: 800 },
      { id: "sync", label: l("Synchronizacja danych między systemami", "Data sync between systems"), min: 200, max: 700 },
      { id: "reports", label: l("Automatyczne raporty", "Automated reports"), min: 200, max: 500 },
      { id: "messages", label: l("Powiadomienia e-mail / SMS", "E-mail / SMS notifications"), min: 150, max: 400 },
      { id: "ui", label: l("Własny panel do obsługi", "Custom admin interface"), min: 300, max: 1000 },
    ],
    monthly: [50, 150],
  },
  {
    id: "ai",
    illustration: "ai",
    title: l("Rozwiązanie z AI", "AI solution"),
    blurb: l(
      "Chatbot, asystent lub automatyzacja oparta na AI.",
      "A chatbot, assistant or AI-powered automation."
    ),
    base: 400,
    options: [
      { id: "kb", label: l("Odpowiedzi na podstawie Twoich dokumentów", "Answers from your own documents"), min: 300, max: 900 },
      { id: "leads", label: l("Zbieranie zapytań i umawianie spotkań", "Lead capture and booking"), min: 200, max: 700 },
      { id: "crm", label: l("Integracja z CRM / pocztą", "CRM / e-mail integration"), min: 250, max: 800 },
      { id: "channels", label: l("Messenger / WhatsApp", "Messenger / WhatsApp"), min: 250, max: 800 },
      { id: "internal", label: l("Asystent wewnętrzny dla zespołu", "Internal assistant for your team"), min: 400, max: 1200 },
      { id: "multilang", label: l("Obsługa wielu języków", "Multi-language support"), min: 150, max: 450 },
    ],
    monthly: [50, 300],
  },
  {
    id: "ksef",
    illustration: "ksef",
    title: l("KSeF / e-faktury", "KSeF / e-invoicing"),
    blurb: l(
      "Wdrożenie Krajowego Systemu e-Faktur w Twoich procesach.",
      "Rolling out Poland's national e-invoicing system in your processes."
    ),
    base: 600,
    options: [
      { id: "send", label: l("Wysyłka faktur z Twojego systemu", "Sending invoices from your system"), min: 0, max: 400 },
      { id: "receive", label: l("Odbiór faktur zakupowych", "Receiving purchase invoices"), min: 300, max: 900 },
      { id: "accounting", label: l("Integracja z programem księgowym", "Accounting software integration"), min: 300, max: 1000 },
      { id: "bulk", label: l("Wystawianie hurtowe i szablony", "Bulk issuing and templates"), min: 200, max: 600 },
      { id: "training", label: l("Dokumentacja i szkolenie zespołu", "Documentation and team training"), min: 100, max: 400 },
    ],
    monthly: [50, 150],
  },
  {
    id: "other",
    illustration: "custom",
    title: l("Coś innego", "Something else"),
    blurb: l(
      "Nietypowy projekt? Opisz go — wycenię indywidualnie.",
      "An unusual project? Describe it — I will quote it individually."
    ),
    base: null,
    options: [],
    monthly: null,
  },
];

export const quoteServiceIds = quoteServices.map((s) => s.id);

export function getQuoteService(id: string | undefined): QuoteService | undefined {
  return quoteServices.find((s) => s.id === id);
}

// ---------- Timeline, budget and the other project-detail choices ----------

export interface Plain {
  id: string;
  label: L;
  hint?: L;
}

/** Price multiplier (low, high) applied to the whole estimate. */
export const timelines: (Plain & { factor: [number, number] })[] = [
  { id: "flexible", label: l("Bez pośpiechu", "No rush"), hint: l("Liczy się jakość, nie data", "Quality matters more than the date"), factor: [1, 1] },
  { id: "month", label: l("W ciągu miesiąca", "Within a month"), factor: [1, 1] },
  { id: "two-weeks", label: l("W ciągu 2 tygodni", "Within 2 weeks"), hint: l("Priorytet w kolejce", "Priority in the queue"), factor: [1.1, 1.2] },
  { id: "asap", label: l("Jak najszybciej (1–3 dni)", "As soon as possible (1–3 days)"), hint: l("Tryb ekspresowy", "Express mode"), factor: [1.3, 1.5] },
  { id: "date", label: l("Konkretna data", "A specific date"), hint: l("Podaj termin, na który to potrzebne", "Tell me the date you need it by"), factor: [1, 1] },
];

export const budgets: Plain[] = [
  { id: "unsure", label: l("Nie wiem — podpowiedz", "Not sure — advise me") },
  { id: "lt1k", label: l("do 1 000 zł", "under 1,000 PLN") },
  { id: "1-3k", label: l("1 000 – 3 000 zł", "1,000 – 3,000 PLN") },
  { id: "3-6k", label: l("3 000 – 6 000 zł", "3,000 – 6,000 PLN") },
  { id: "6-12k", label: l("6 000 – 12 000 zł", "6,000 – 12,000 PLN") },
  { id: "gt12k", label: l("ponad 12 000 zł", "over 12,000 PLN") },
  { id: "custom", label: l("Podam własną kwotę", "I will enter my own amount") },
];

export const currentStates: Plain[] = [
  { id: "nothing", label: l("Zaczynam od zera", "Starting from scratch") },
  { id: "replace", label: l("Mam stronę / system do wymiany", "I have a site / system to replace") },
  { id: "manual", label: l("Robię to ręcznie (Excel, maile, papier)", "I do it manually (Excel, e-mail, paper)") },
  { id: "tool", label: l("Używam gotowego narzędzia, które nie wystarcza", "I use an off-the-shelf tool that falls short") },
];

export const contentStates: Plain[] = [
  { id: "ready", label: l("Mam teksty i zdjęcia", "I have texts and photos") },
  { id: "partial", label: l("Część mam, resztę trzeba uzupełnić", "I have some, the rest is missing") },
  { id: "none", label: l("Potrzebuję pomocy z treściami", "I need help with content") },
];

export const designStates: Plain[] = [
  { id: "mine", label: l("Mam gotowy projekt graficzny", "I have a ready design") },
  { id: "branding", label: l("Mam logo i kolory, resztę zaprojektuj", "I have a logo and colours, design the rest") },
  { id: "scratch", label: l("Zaprojektuj od zera", "Design it from scratch") },
];

export const languageChoices: Plain[] = [
  { id: "pl", label: l("Polski", "Polish") },
  { id: "en", label: l("Angielski", "English") },
  { id: "de", label: l("Niemiecki", "German") },
  { id: "other", label: l("Inny", "Other") },
];

export const contactVia: Plain[] = [
  { id: "email", label: l("E-mail", "E-mail") },
  { id: "phone", label: l("Telefon", "Phone") },
  { id: "whatsapp", label: l("WhatsApp", "WhatsApp") },
  { id: "slack", label: l("Slack", "Slack") },
];

export const sources: Plain[] = [
  { id: "google", label: l("Google", "Google") },
  { id: "recommendation", label: l("Polecenie", "Recommendation") },
  { id: "social", label: l("Social media", "Social media") },
  { id: "ai", label: l("Asystent AI (ChatGPT, Claude…)", "AI assistant (ChatGPT, Claude…)") },
  { id: "other", label: l("Inaczej", "Other") },
];

// ---------- Estimate ----------

export interface EstimateInput {
  service: string;
  scale?: string;
  options: string[];
  timeline: string;
  /** yyyy-mm-dd, used when timeline is "date". */
  deadline?: string;
}

export interface EstimateItem {
  label: L;
  min: number;
  max: number;
}

export interface Estimate {
  low: number;
  high: number;
  /** Starting price + every selected add-on, before the timeline multiplier. */
  items: EstimateItem[];
  timelineFactor: [number, number];
  monthly: [number, number] | null;
}

/** An exact deadline maps onto the same surcharge tiers as the presets. */
export function factorForDeadline(deadline: string | undefined, now = new Date()): [number, number] {
  if (!deadline || !/^\d{4}-\d{2}-\d{2}$/.test(deadline)) return [1, 1];
  const days = Math.ceil((new Date(deadline + "T23:59:59").getTime() - now.getTime()) / 86400000);
  if (Number.isNaN(days)) return [1, 1];
  if (days <= 3) return [1.3, 1.5];
  if (days <= 14) return [1.1, 1.2];
  return [1, 1];
}

function roundOut(low: number, high: number): [number, number] {
  const step = high >= 3000 ? 100 : 50;
  return [Math.floor(low / step) * step, Math.ceil(high / step) * step];
}

/** Pure and deterministic — used by the browser and re-run on the server. */
export function calculateEstimate(input: EstimateInput): Estimate | null {
  const service = getQuoteService(input.service);
  if (!service || service.base === null) return null;

  const items: EstimateItem[] = [
    { label: l("Cena wyjściowa", "Starting price"), min: service.base, max: service.base },
  ];

  if (service.scale) {
    const choice =
      service.scale.choices.find((c) => c.id === input.scale) ??
      service.scale.choices[0];
    if (choice.min > 0 || choice.max > 0) {
      items.push({ label: choice.label, min: choice.min, max: choice.max });
    }
  }

  for (const opt of service.options) {
    if (input.options.includes(opt.id)) {
      items.push({ label: opt.label, min: opt.min, max: opt.max });
    }
  }

  const timeline = timelines.find((t) => t.id === input.timeline) ?? timelines[0];
  const factor =
    timeline.id === "date" ? factorForDeadline(input.deadline) : timeline.factor;
  const rawLow = items.reduce((s, i) => s + i.min, 0) * factor[0];
  const rawHigh = items.reduce((s, i) => s + i.max, 0) * factor[1];
  const [low, high] = roundOut(rawLow, rawHigh);

  return { low, high, items, timelineFactor: factor, monthly: service.monthly };
}

// ---------- UI copy (kept next to the data it describes) ----------

export const quoteUi = {
  eyebrow: l("Wycena online", "Online quote"),
  heading: l("Wyceń swój projekt w kilka minut", "Estimate your project in minutes"),
  lead: l(
    "Odpowiedz na kilka pytań — na końcu zobaczysz orientacyjne widełki ceny, a dokładną wycenę odeślę mailem. Bez zobowiązań.",
    "Answer a few questions — at the end you will see an indicative price range, and I will email you the exact quote. No commitment."
  ),
  steps: [
    l("Usługa", "Service"),
    l("Zakres", "Scope"),
    l("Projekt", "Project"),
    l("Termin i budżet", "Timing and budget"),
    l("Kontakt", "Contact"),
  ],
  stepOf: l("Krok {n} z {total}", "Step {n} of {total}"),
  back: l("Wstecz", "Back"),
  next: l("Dalej", "Next"),
  submit: l("Wyślij i zobacz widełki", "Send and see the estimate"),
  sending: l("Wysyłanie…", "Sending…"),
  s1Title: l("Czego potrzebujesz?", "What do you need?"),
  s1Lead: l("Wybierz najbliższą kategorię — doprecyzujemy w kolejnych krokach.", "Pick the closest category — we will refine it in the next steps."),
  s2Title: l("Zakres projektu", "Project scope"),
  s2Lead: l("Zaznacz, co ma się znaleźć w projekcie. Nic nie jest obowiązkowe.", "Tick what the project should include. Nothing is mandatory."),
  s2Options: l("Dodatki i funkcje", "Add-ons and features"),
  s3Title: l("Opowiedz o projekcie", "Tell me about the project"),
  s3Lead: l("Im więcej szczegółów, tym trafniejsza wycena.", "The more detail, the more accurate the quote."),
  state: l("Jak to wygląda dziś?", "Where are you today?"),
  content: l("Treści (teksty i zdjęcia)", "Content (texts and photos)"),
  design: l("Projekt graficzny", "Design"),
  languages: l("Języki", "Languages"),
  industry: l("Czym zajmuje się Twoja firma?", "What does your business do?"),
  industryPh: l("np. biuro podróży, gabinet, sklep z odzieżą…", "e.g. travel agency, clinic, clothing store…"),
  url: l("Obecna strona lub system (opcjonalnie)", "Current site or system (optional)"),
  integrations: l("Z czym ma się łączyć? (opcjonalnie)", "What should it connect to? (optional)"),
  integrationsPh: l("np. księgowość, Allegro, kalendarz Google, CRM…", "e.g. accounting, marketplaces, Google Calendar, CRM…"),
  description: l("Opisz, co chcesz osiągnąć", "Describe what you want to achieve"),
  descriptionPh: l(
    "Jakie problemy ma rozwiązać? Kto będzie z tego korzystał? Co dziś kosztuje Cię najwięcej czasu?",
    "What problems should it solve? Who will use it? What costs you the most time today?"
  ),
  s4Title: l("Termin i budżet", "Timing and budget"),
  s4Lead: l("Pomoże mi dobrać zakres i sposób pracy.", "This helps me shape the scope and the way we work."),
  timeline: l("Na kiedy to potrzebne?", "When do you need it?"),
  budget: l("Orientacyjny budżet (opcjonalnie)", "Rough budget (optional)"),
  deadline: l("Do kiedy to potrzebne?", "Deadline"),
  deadlineHint: l("Termin liczymy od dziś — krótkie terminy mają dopłatę za tryb priorytetowy.", "Counted from today — short deadlines carry a priority surcharge."),
  deadlinePast: l("Wybierz datę w przyszłości.", "Pick a date in the future."),
  budgetCustom: l("Twoja kwota (z walutą)", "Your amount (with currency)"),
  budgetCustomPh: l("np. 5000 zł albo 1500 USD", "e.g. 5000 PLN or 1500 USD"),
  attachTitle: l("Załączniki (opcjonalnie)", "Attachments (optional)"),
  attachHint: l(
    "Logo, makiety, zrzuty ekranu, inspiracje. Do {n} plików, każdy do {mb} MB (JPG, PNG, WebP, GIF).",
    "Logos, mock-ups, screenshots, inspiration. Up to {n} files, {mb} MB each (JPG, PNG, WebP, GIF)."
  ),
  attachDrop: l("Przeciągnij pliki tutaj lub kliknij, aby wybrać", "Drag files here or click to choose"),
  attachRemove: l("Usuń plik", "Remove file"),
  attachTooMany: l("Możesz dodać maksymalnie {n} plików.", "You can attach at most {n} files."),
  attachTooBig: l("Plik „{name}” jest większy niż {mb} MB.", "File “{name}” is larger than {mb} MB."),
  attachBadType: l("Plik „{name}” nie jest obsługiwanym obrazem.", "File “{name}” is not a supported image."),
  contactNote: l("Szczegóły kontaktu (opcjonalnie)", "Contact details (optional)"),
  contactNoteSlack: l("Twój workspace lub e-mail do zaproszenia Slack Connect", "Your workspace or e-mail for a Slack Connect invite"),
  phoneNeeded: l("Podaj numer telefonu, aby kontakt telefoniczny / WhatsApp był możliwy.", "Add a phone number so I can reach you by phone / WhatsApp."),
  verifying: l("Trwa weryfikacja antyspamowa…", "Running the anti-spam check…"),
  errTurnstile: l("Weryfikacja antyspamowa nie powiodła się. Odczekaj chwilę i spróbuj ponownie.", "The anti-spam check failed. Wait a moment and try again."),
  errUpload: l("Nie udało się przyjąć załączników. Sprawdź rozmiar i format plików.", "The attachments were rejected. Check file size and format."),
  maintenance: l("Chcę opiekę po wdrożeniu (hosting, kopie, aktualizacje)", "I want post-launch care (hosting, backups, updates)"),
  s5Title: l("Jak się z Tobą skontaktować?", "How can I reach you?"),
  s5Lead: l("Dokładną wycenę wyślę na Twój e-mail.", "I will email the exact quote to you."),
  name: l("Imię i nazwisko", "Full name"),
  email: l("E-mail", "E-mail"),
  phone: l("Telefon (opcjonalnie)", "Phone (optional)"),
  company: l("Firma (opcjonalnie)", "Company (optional)"),
  via: l("Preferowany kontakt", "Preferred contact"),
  source: l("Skąd o mnie wiesz? (opcjonalnie)", "How did you hear about me? (optional)"),
  consent: l(
    "Zgadzam się na przetwarzanie danych w celu przygotowania wyceny i kontaktu w sprawie projektu.",
    "I agree to my data being processed to prepare the quote and contact me about the project."
  ),
  required: l("Uzupełnij wymagane pola.", "Please fill in the required fields."),
  error: l(
    "Nie udało się wysłać formularza. Spróbuj ponownie lub napisz na",
    "Could not send the form. Please try again or write to"
  ),
  resultEyebrow: l("Dziękuję — dostałem Twoje zgłoszenie", "Thank you — I received your request"),
  resultHeading: l("Orientacyjne widełki dla Twojego projektu", "Indicative range for your project"),
  resultNet: l("netto, jednorazowo", "net, one-off"),
  from: l("od", "from"),
  resultNote: l(
    "To szacunek na podstawie Twoich odpowiedzi, a nie oferta. Dokładną wycenę odeślę mailem po przeczytaniu Twojego zgłoszenia — zwykle w ciągu godziny (w godzinach pracy).",
    "This is an estimate based on your answers, not an offer. I will email you the exact quote after reading your request — usually within an hour (during business hours)."
  ),
  resultOther: l(
    "Nietypowe projekty wyceniam indywidualnie. Przeczytam Twoje zgłoszenie i odeślę dokładną wycenę mailem — zwykle w ciągu godziny (w godzinach pracy).",
    "Unusual projects are quoted individually. I will read your request and email you the exact quote — usually within an hour (during business hours)."
  ),
  breakdown: l("Z czego wynika szacunek", "How the estimate adds up"),
  monthly: l("Opieka po wdrożeniu (miesięcznie)", "Post-launch care (monthly)"),
  rush: l("Dopłata za tryb ekspresowy jest wliczona w widełki.", "The express-delivery surcharge is included in the range."),
  nextTitle: l("Co dalej", "What happens next"),
  next1: l("Czytam Twoje zgłoszenie i sprawdzam zakres", "I read your request and check the scope"),
  next2: l("Odsyłam dokładną wycenę mailem", "I email you the exact quote"),
  next3: l("Jeśli trzeba, umawiamy krótką rozmowę", "If needed, we book a short call"),
  home: l("Wróć na stronę główną", "Back to the home page"),
  blog: l("Poczytaj blog", "Read the blog"),
  stepNote: l("Dane z formularza trafiają tylko do mnie.", "Your answers go only to me."),
} as const;

// Attachment limits, shared by the browser (friendly errors) and the API.
export const MAX_ATTACHMENTS = 5;
export const MAX_ATTACHMENT_MB = 5;
export const ATTACHMENT_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

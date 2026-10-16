// Content of the /hire-developer-poland page (aimed at international B2B buyers).
// Bilingual per field, like content/industries.ts.

type L = { pl: string; en: string };

export const hire = {
  meta: {
    title: {
      pl: "Zatrudnij programistę z Polski: web, mobile, integracje (B2B)",
      en: "Hire a senior developer from Poland: web, mobile, integrations",
    } as L,
    description: {
      pl: "Senior fullstack developer z Lublina dla firm i agencji z zagranicy: strefa CET, faktura z numerem VAT UE, umowa z przeniesieniem praw. Cena stała lub dedykowany developer.",
      en: "Senior fullstack developer in Poland for companies and agencies abroad: CET time zone, EU VAT invoice, code ownership transferred to you. Fixed price or a dedicated developer.",
    } as L,
  },
  eyebrow: { pl: "Dla firm i agencji z zagranicy", en: "For companies and agencies abroad" } as L,
  h1: {
    pl: "Zatrudnij senior developera z Polski",
    en: "Hire a senior developer from Poland",
  } as L,
  lead: {
    pl: "Jestem fullstack developerem z Lublina (strefa CET). Buduję i utrzymuję aplikacje webowe i mobilne, sklepy oraz integracje dla firm i agencji z Europy, Wielkiej Brytanii i USA: zdalnie, w Twojej strefie czasowej, z fakturą z UE i bezpośrednio, bez account managerów.",
    en: "I'm a fullstack developer based in Lublin, Poland (CET). I build and maintain web apps, mobile apps, online stores and integrations for companies and agencies across Europe, the UK and the US: remotely, in your time zone, invoiced from the EU and working with you directly, with no account managers in between.",
  } as L,
  quote: { pl: "Darmowa wycena online", en: "Free online quote" } as L,

  modelsHeading: { pl: "Jak możemy współpracować", en: "How we can work together" } as L,
  models: [
    {
      title: { pl: "Projekt za cenę stałą", en: "Fixed-price project" },
      text: {
        pl: "Jasny zakres, jedna cena, odbiór etapami. Najlepsze dla stron, sklepów, MVP i integracji, gdzie wiesz, co chcesz dostać.",
        en: "A defined scope, one price, delivery in milestones. Best for websites, stores, MVPs and integrations where you know what you want to get.",
      },
    },
    {
      title: { pl: "Dedykowany developer", en: "Dedicated developer" },
      text: {
        pl: "Moce przerobowe na część lub cały etat w Twoim zespole, w Twoich narzędziach (Slack, Jira, GitHub). Stawkę ustalamy indywidualnie, poproś o wycenę.",
        en: "Part-time or full-time capacity inside your team and your tools (Slack, Jira, GitHub). The rate is agreed per engagement, so just ask for a quote.",
      },
    },
    {
      title: { pl: "Podwykonawstwo dla agencji", en: "Subcontracting for agencies" },
      text: {
        pl: "Dodatkowy senior do projektów Twoich klientów: pod NDA, pod Twoją marką, z komunikacją po angielsku.",
        en: "An extra senior for your clients' projects: under NDA, under your brand, communicating in English.",
      },
    },
    {
      title: { pl: "Utrzymanie i rozwój", en: "Maintenance and support" },
      text: {
        pl: "Miesięczna opieka nad istniejącą aplikacją: aktualizacje, monitoring, poprawki i drobne funkcje.",
        en: "Monthly care for an existing application: updates, monitoring, fixes and small features.",
      },
    },
  ],

  whyHeading: { pl: "Dlaczego developer z Polski", en: "Why a developer from Poland" } as L,
  why: [
    {
      title: { pl: "Pokrywająca się strefa czasowa", en: "An overlapping time zone" },
      text: {
        pl: "CET to pełne pokrycie godzin pracy z Europą i wspólne okno ze wschodnim wybrzeżem USA. Rozmowy na żywo zamiast czekania dobę na odpowiedź.",
        en: "CET gives a full working-day overlap with Europe and a shared window with the US East Coast. Live calls instead of waiting a day for a reply.",
      },
    },
    {
      title: { pl: "Nowoczesny stack", en: "A modern stack" },
      text: {
        pl: "React, TypeScript, Next.js, Node.js, React Native, integracje API i chmura: doświadczenie z projektów komercyjnych, nie tylko z tutoriali.",
        en: "React, TypeScript, Next.js, Node.js, React Native, API integrations and cloud: experience from commercial projects, not just tutorials.",
      },
    },
    {
      title: { pl: "Koszt poniżej lokalnych agencji", en: "Cost below local agencies" },
      text: {
        pl: "Płacisz za pracę developera, a nie za warstwy sprzedaży i zarządzania. Ceny startowe poniżej, dokładną wycenę dostajesz przed startem.",
        en: "You pay for the developer's work, not for layers of sales and project management. Starting prices are below, and you get the exact quote before we start.",
      },
    },
    {
      title: { pl: "Prawo i dane w UE", en: "EU law and data" },
      text: {
        pl: "Polska jest w UE: obowiązuje RODO, umowa i faktura w europejskim standardzie, a kod i dane zostają pod Twoją kontrolą.",
        en: "Poland is in the EU: GDPR applies, the contract and invoice follow European standards, and the code and data stay under your control.",
      },
    },
  ],

  stackHeading: { pl: "Technologie", en: "Technologies" } as L,
  stack: ["React", "TypeScript", "Next.js", "Node.js", "React Native", "Angular", "Vue", "PHP", "Python", "PostgreSQL", "MySQL", "Docker", "AWS", "REST / GraphQL"],

  stepsHeading: { pl: "Jak zaczynamy", en: "How we start" } as L,
  steps: [
    { pl: "Opisujesz projekt: cel, zakres, termin, orientacyjny budżet", en: "You describe the project: goal, scope, deadline, rough budget" },
    { pl: "Dostajesz wycenę i propozycję zakresu pierwszego etapu", en: "You receive a quote and a proposed scope for the first stage" },
    { pl: "Krótka rozmowa wideo, żeby ustalić szczegóły", en: "A short video call to settle the details" },
    { pl: "Start z cotygodniowymi demo i widocznym postępem", en: "Kick-off with weekly demos and visible progress" },
    { pl: "Odbiór, przekazanie kodu i dostępów, opcjonalna opieka po wdrożeniu", en: "Delivery, handover of code and access, optional post-launch care" },
  ] as L[],

  paperHeading: { pl: "Formalności", en: "Paperwork" } as L,
  paper: [
    { pl: "Faktura VAT od polskiej firmy z numerem VAT UE", en: "A VAT invoice from a Polish company with an EU VAT number" },
    { pl: "Dla firm z UE z ważnym numerem VAT zwykle odwrotne obciążenie, czyli bez polskiego VAT na fakturze", en: "For EU businesses with a valid VAT number the reverse charge usually applies: no Polish VAT on the invoice" },
    { pl: "Umowa z przeniesieniem praw autorskich do kodu na Ciebie", en: "A contract that transfers copyright in the code to you" },
    { pl: "Repozytorium i konta zakładane na Twoją firmę", en: "Repository and accounts set up in your company's name" },
    { pl: "NDA przed rozmową o szczegółach, jeśli tego potrzebujesz", en: "An NDA before discussing details, if you need one" },
  ] as L[],

  pricesHeading: { pl: "Ceny startowe projektów", en: "Starting prices for fixed-price projects" } as L,
  pricesLead: {
    pl: "Orientacyjne ceny netto, przeliczane na wybraną walutę. Dokładną wycenę dostajesz przed startem, bez ukrytych kosztów. Współpraca z dedykowanym developerem jest wyceniana indywidualnie.",
    en: "Indicative net prices, converted into your chosen currency. You get the exact quote before we start, with no hidden fees. A dedicated-developer engagement is quoted individually.",
  } as L,
  tiers: ["landing", "business", "store", "mobile", "automation"] as const,

  faqHeading: { pl: "Najczęstsze pytania", en: "Frequently asked questions" } as L,
  faq: [
    {
      q: { pl: "Ile kosztuje dedykowany developer?", en: "What does a dedicated developer cost?" },
      a: {
        pl: "Stawkę ustalam indywidualnie, zależnie od zakresu, liczby godzin w miesiącu i czasu trwania współpracy. Napisz, czego potrzebujesz, a odpowiem z konkretną propozycją, zwykle w ciągu jednego dnia roboczego.",
        en: "I agree the rate individually, depending on scope, hours per month and the length of the engagement. Tell me what you need and I will reply with a concrete proposal, usually within one working day.",
      },
    },
    {
      q: { pl: "W jakiej strefie czasowej pracujesz?", en: "Which time zone do you work in?" },
      a: {
        pl: "W CET (UTC+1, latem UTC+2). To pełne pokrycie godzin pracy z Europą i kilka wspólnych godzin ze wschodnim wybrzeżem USA.",
        en: "CET (UTC+1, UTC+2 in summer). That is a full overlap with Europe and a few shared hours with the US East Coast.",
      },
    },
    {
      q: { pl: "Kto jest właścicielem kodu?", en: "Who owns the code?" },
      a: {
        pl: "Ty. Umowa przenosi na Ciebie prawa autorskie do wytworzonego kodu, a repozytorium i konta zakładam na Twoją firmę.",
        en: "You do. The contract transfers copyright in the code to you, and I set up the repository and accounts in your company's name.",
      },
    },
    {
      q: { pl: "Czy podpiszesz NDA?", en: "Will you sign an NDA?" },
      a: {
        pl: "Tak, mogę podpisać NDA przed rozmową o szczegółach projektu.",
        en: "Yes, I can sign an NDA before we discuss the details of the project.",
      },
    },
    {
      q: { pl: "Jak wygląda faktura i płatność?", en: "How do invoicing and payment work?" },
      a: {
        pl: "Wystawiam fakturę VAT z numerem VAT UE. Firmy z UE z ważnym numerem VAT zwykle rozliczają się z odwrotnym obciążeniem (bez polskiego VAT). Płatność przelewem, inne formy po ustaleniu.",
        en: "I issue a VAT invoice with an EU VAT number. EU businesses with a valid VAT number usually settle under the reverse charge (no Polish VAT). Payment is by bank transfer, other options by arrangement.",
      },
    },
    {
      q: { pl: "Jak komunikujemy się na co dzień?", en: "How do we communicate day to day?" },
      a: {
        pl: "Po angielsku, w narzędziach, których używasz (Slack, Teams, e-mail, wideorozmowy, Jira lub Linear, GitHub lub GitLab). Do tego cotygodniowe demo z widocznym postępem.",
        en: "In English, in the tools you already use (Slack, Teams, email, video calls, Jira or Linear, GitHub or GitLab), plus a weekly demo with visible progress.",
      },
    },
    {
      q: { pl: "Czy współpracujesz z agencjami?", en: "Do you work with agencies?" },
      a: {
        pl: "Tak. Mogę dołączyć do projektu jako podwykonawca: pod NDA, pod Twoją marką, z bezpośrednim kontaktem z Twoim zespołem.",
        en: "Yes. I can join a project as a subcontractor: under NDA, under your brand, with direct contact with your team.",
      },
    },
    {
      q: { pl: "Kiedy możesz zacząć?", en: "When can you start?" },
      a: {
        pl: "Zależy od bieżącego obłożenia. Po opisie projektu odpowiadam z konkretnym terminem startu razem z wyceną.",
        en: "It depends on my current workload. After you describe the project I reply with a concrete start date together with the quote.",
      },
    },
  ],

  ctaHeading: { pl: "Opisz projekt, a wrócę z zakresem, ceną i terminem", en: "Describe your project and I'll come back with scope, price and timeline" } as L,
  ctaLead: {
    pl: "Pierwsza rozmowa i wycena są bezpłatne i bez zobowiązań.",
    en: "The first conversation and the quote are free and with no obligation.",
  } as L,
  crumbHome: { pl: "Start", en: "Home" } as L,
  crumb: { pl: "Zatrudnij programistę z Polski", en: "Hire a developer from Poland" } as L,
} as const;

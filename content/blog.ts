import type { IllustrationKey } from "@/content/services";

// A blog post's body is a small set of block types rendered to semantic HTML.
// Content is authored in the repo (no CMS), localized per block.
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export interface BlogPost {
  slug: string;
  date: string; // ISO publish date
  updated?: string; // ISO, optional
  illustration: IllustrationKey;
  readingMinutes: number;
  tags: { pl: string[]; en: string[] };
  title: { pl: string; en: string };
  excerpt: { pl: string; en: string };
  body: { pl: Block[]; en: Block[] };
}

export const posts: BlogPost[] = [
  {
    slug: "ile-kosztuje-strona-internetowa",
    date: "2026-06-18",
    illustration: "websites",
    readingMinutes: 6,
    tags: {
      pl: ["Strony internetowe", "Cennik", "SEO"],
      en: ["Websites", "Pricing", "SEO"],
    },
    title: {
      pl: "Ile kosztuje strona internetowa w 2026 roku?",
      en: "How much does a website cost in 2026?",
    },
    excerpt: {
      pl: "Od czego zależy cena strony, ile realnie zapłacisz za wizytówkę, stronę firmową i sklep — i na czym naprawdę nie warto oszczędzać.",
      en: "What drives the price of a website, what you'll really pay for a one-pager, a company site and a store — and where cutting costs backfires.",
    },
    body: {
      pl: [
        { type: "p", text: "„Ile kosztuje strona internetowa?” to pytanie, na które uczciwa odpowiedź brzmi: „to zależy”. Ale to nie znaczy, że nie da się podać widełek. Poniżej tłumaczę, od czego zależy cena i ile realnie kosztują poszczególne rodzaje stron w Polsce w 2026 roku." },
        { type: "h2", text: "Od czego zależy cena" },
        { type: "p", text: "Na koszt strony wpływa przede wszystkim jej złożoność — inaczej wycenia się jednostronicową wizytówkę, a inaczej rozbudowany serwis firmowy z blogiem czy sklep z płatnościami. Kluczowe czynniki to:" },
        { type: "ul", items: [
          "Liczba podstron i sekcji",
          "Indywidualny projekt graficzny czy gotowy szablon",
          "Funkcje: formularze, płatności, rezerwacje, integracje",
          "Optymalizacja pod Google (SEO) i szybkość działania",
          "Kto to robi — agencja, software house czy freelancer",
        ] },
        { type: "h2", text: "Orientacyjne ceny na rynku" },
        { type: "p", text: "W polskich realiach (dane z ofert m.in. lubelskich firm) ceny zaczynają się mniej więcej tak: prosty landing lub wizytówka od 1500–1800 zł, strona firmowa od ok. 2200 zł, a sklep internetowy od kilku tysięcy złotych wzwyż. To ceny wyjściowe — ostateczny koszt rośnie wraz z zakresem." },
        { type: "p", text: "Jako niezależny developer utrzymuję stawki na poziomie mniej więcej 40% tego, co biorą agencje, przy tej samej jakości wykonania: wizytówkę robię od 600 zł, stronę firmową od 900 zł, a sklep od 1600 zł. Niższa cena bierze się z braku narzutu agencyjnego, a nie z gorszej roboty." },
        { type: "h2", text: "Na czym nie warto oszczędzać" },
        { type: "p", text: "Najtańsza strona bywa najdroższa — jeśli jest wolna, nie działa na telefonach albo nie pojawia się w Google, po prostu nie przynosi klientów. Warto zadbać o:" },
        { type: "ul", items: [
          "Szybkość ładowania i dobre Core Web Vitals",
          "Wersję mobilną (większość ruchu to telefony)",
          "Podstawowe SEO od pierwszego dnia — struktura, metadane, sitemapa",
          "Własność kodu i możliwość samodzielnej edycji treści",
        ] },
        { type: "h2", text: "Jak dostać realną wycenę" },
        { type: "p", text: "Najlepiej zacząć od krótkiej rozmowy o celu strony i tym, co ma osiągać. Wtedy zamiast „ceny z sufitu” dostajesz konkret: zakres, koszt i termin. U mnie pierwsza rozmowa i wycena są darmowe i niezobowiązujące — napisz, a powiem Ci wprost, ile to u Ciebie wyjdzie." },
      ],
      en: [
        { type: "p", text: "“How much does a website cost?” is a question whose honest answer is “it depends.” But that doesn't mean you can't give a range. Below I explain what drives the price and what different types of websites really cost in Poland in 2026." },
        { type: "h2", text: "What drives the price" },
        { type: "p", text: "The main factor is complexity — a one-page business card is priced very differently from a large company site with a blog, or a store with payments. The key drivers are:" },
        { type: "ul", items: [
          "The number of subpages and sections",
          "Custom design versus a ready-made template",
          "Features: forms, payments, bookings, integrations",
          "Google optimisation (SEO) and performance",
          "Who builds it — an agency, a software house or a freelancer",
        ] },
        { type: "h2", text: "Typical market prices" },
        { type: "p", text: "In Poland, entry prices look roughly like this: a simple landing or one-pager from 1,500–1,800 PLN, a company website from about 2,200 PLN, and an online store from a few thousand PLN upwards. These are starting points — the final cost grows with scope." },
        { type: "p", text: "As an independent developer I keep rates at roughly 40% of agency prices for the same build quality: a one-pager from 600 PLN, a company site from 900 PLN, and a store from 1,600 PLN. The lower price comes from no agency overhead — not from cutting corners." },
        { type: "h2", text: "Where not to cut costs" },
        { type: "p", text: "The cheapest website is often the most expensive — if it's slow, doesn't work on phones or never shows up in Google, it simply won't bring you clients. It's worth investing in:" },
        { type: "ul", items: [
          "Fast loading and good Core Web Vitals",
          "A mobile version (most traffic is on phones)",
          "Basic SEO from day one — structure, metadata, sitemap",
          "Owning the code and being able to edit content yourself",
        ] },
        { type: "h2", text: "How to get a real quote" },
        { type: "p", text: "Start with a short conversation about the goal of the site and what it should achieve. Instead of a number pulled from thin air, you get specifics: scope, cost and timeline. With me the first conversation and quote are free and with no obligation — get in touch and I'll tell you straight what it would cost in your case." },
      ],
    },
  },
  {
    slug: "ksef-jak-przygotowac-firme",
    date: "2026-06-30",
    illustration: "ksef",
    readingMinutes: 5,
    tags: {
      pl: ["KSeF", "E-faktury", "Automatyzacja"],
      en: ["KSeF", "E-invoicing", "Automation"],
    },
    title: {
      pl: "KSeF: jak przygotować firmę do obowiązkowych e-faktur",
      en: "KSeF: how to prepare your company for mandatory e-invoicing",
    },
    excerpt: {
      pl: "Czym jest KSeF, kogo obejmuje i jak spokojnie wdrożyć e-faktury bez zmiany programu do fakturowania.",
      en: "What KSeF is, who it affects and how to roll out e-invoicing calmly — without changing your invoicing software.",
    },
    body: {
      pl: [
        { type: "p", text: "KSeF, czyli Krajowy System e-Faktur, to centralna platforma, przez którą polskie firmy będą wystawiać i odbierać faktury ustrukturyzowane. Dla wielu przedsiębiorców brzmi to groźnie, ale w praktyce da się to wdrożyć spokojnie — jeśli zacznie się odpowiednio wcześnie." },
        { type: "h2", text: "Co to zmienia" },
        { type: "p", text: "Zamiast PDF-a wysyłanego mailem, faktura trafia w ustandaryzowanym formacie (FA) prosto do systemu KSeF, który nadaje jej numer i potwierdzenie (UPO). Kontrahent pobiera ją z tego samego systemu. Zyskujesz jednolity obieg dokumentów i mniej ręcznej pracy, ale musisz mieć narzędzie, które z KSeF rozmawia." },
        { type: "h2", text: "Kogo obejmuje i od kiedy" },
        { type: "p", text: "Wdrożenie obowiązkowego KSeF jest w Polsce rozłożone w czasie i zależy od wielkości firmy — więksi podatnicy wchodzą wcześniej, mniejsi później. Dlatego pierwszym krokiem jest ustalenie, który termin dotyczy właśnie Ciebie, i przygotowanie się z zapasem, a nie w ostatnim tygodniu." },
        { type: "h2", text: "Jak się przygotować — krok po kroku" },
        { type: "ol", items: [
          "Sprawdź, od kiedy obowiązek dotyczy Twojej firmy",
          "Zweryfikuj, czy Twój program do fakturowania obsługuje KSeF lub ma API",
          "Ustal sposób uwierzytelniania (token, pieczęć lub kwalifikowany podpis)",
          "Przetestuj wysyłkę i odbiór na środowisku testowym",
          "Zadbaj o archiwizację faktur i obsługę statusów oraz błędów",
        ] },
        { type: "h2", text: "Nie musisz zmieniać całego systemu" },
        { type: "p", text: "Najczęstsza obawa brzmi: „czy będę musiał wyrzucić program, którego używam od lat?”. Zwykle nie. Jeśli Twój system ma API lub eksport danych, można podłączyć do niego integrację z KSeF, tak by faktury wychodziły i przychodziły automatycznie. Jeśli nie ma takiej możliwości, dobiera się najprostsze rozwiązanie pośrednie." },
        { type: "p", text: "Zajmuję się takimi wdrożeniami od strony technicznej — od integracji z API KSeF po podłączenie do Twojego fakturowania, ERP lub sklepu. Jeśli chcesz mieć to z głowy przed terminem, napisz — zaczynamy od darmowej rozmowy." },
      ],
      en: [
        { type: "p", text: "KSeF (the National e-Invoicing System) is the central platform through which Polish companies will issue and receive structured invoices. It sounds intimidating to many business owners, but in practice it can be rolled out calmly — as long as you start early enough." },
        { type: "h2", text: "What changes" },
        { type: "p", text: "Instead of a PDF emailed to the client, the invoice goes in a standardised format (FA) straight into KSeF, which assigns it a number and a confirmation (UPO). Your counterparty downloads it from the same system. You get a uniform document flow and less manual work — but you need a tool that talks to KSeF." },
        { type: "h2", text: "Who it affects and when" },
        { type: "p", text: "Poland's mandatory KSeF rollout is phased over time and depends on company size — larger taxpayers go first, smaller ones later. So the first step is to figure out which deadline applies to you and prepare with a margin, not in the final week." },
        { type: "h2", text: "How to prepare — step by step" },
        { type: "ol", items: [
          "Check when the obligation applies to your company",
          "Verify whether your invoicing software supports KSeF or has an API",
          "Decide on authentication (token, seal or qualified signature)",
          "Test sending and receiving on the test environment",
          "Ensure invoice archiving and handling of statuses and errors",
        ] },
        { type: "h2", text: "You don't have to replace your whole system" },
        { type: "p", text: "The most common worry is: “will I have to throw out the software I've used for years?” Usually not. If your system has an API or data export, a KSeF integration can be connected to it so invoices go out and come in automatically. If that's not possible, the simplest intermediate solution is chosen." },
        { type: "p", text: "I handle this kind of rollout on the technical side — from integrating with the KSeF API to connecting it to your invoicing, ERP or store. If you'd like it sorted before the deadline, get in touch — we start with a free conversation." },
      ],
    },
  },
  {
    slug: "automatyzacja-w-malej-firmie",
    date: "2026-07-07",
    illustration: "integrations",
    readingMinutes: 5,
    tags: {
      pl: ["Automatyzacja", "Integracje", "Produktywność"],
      en: ["Automation", "Integrations", "Productivity"],
    },
    title: {
      pl: "Automatyzacja w małej firmie: od czego zacząć",
      en: "Automation in a small business: where to start",
    },
    excerpt: {
      pl: "Nie musisz wdrażać wielkiego systemu. Pokazuję, jak znaleźć zadania, które zjadają czas, i zautomatyzować je krok po kroku.",
      en: "You don't need a giant system. Here's how to find the tasks eating your time and automate them step by step.",
    },
    body: {
      pl: [
        { type: "p", text: "Automatyzacja kojarzy się z drogimi systemami dla korporacji, ale najwięcej zyskują na niej właśnie małe firmy — bo to tam jedna osoba robi wszystko naraz i każda odzyskana godzina jest na wagę złota. Dobra wiadomość: nie trzeba zaczynać od rewolucji." },
        { type: "h2", text: "Znajdź zadania, które zjadają czas" },
        { type: "p", text: "Zacznij od wypisania czynności, które powtarzasz co tydzień i które są nudne oraz oparte na regułach. Najlepsi kandydaci do automatyzacji to zwykle:" },
        { type: "ul", items: [
          "Przepisywanie danych między systemami (np. z formularza do arkusza)",
          "Wystawianie i wysyłka tych samych dokumentów",
          "Przypomnienia, potwierdzenia i powiadomienia do klientów",
          "Zbieranie zamówień lub zapytań z kilku miejsc w jednym",
          "Comiesięczne raporty składane ręcznie z kilku źródeł",
        ] },
        { type: "h2", text: "Policz, ile to naprawdę kosztuje" },
        { type: "p", text: "Jeśli jakieś zadanie zajmuje 3 godziny tygodniowo, to ponad 150 godzin rocznie. Nawet jeśli automatyzacja zajmie kilka dni pracy, zwraca się zwykle w kilka miesięcy — a potem po prostu działa w tle." },
        { type: "h2", text: "Zacznij od jednego procesu" },
        { type: "p", text: "Nie próbuj automatyzować wszystkiego naraz. Wybierz jeden, najbardziej dokuczliwy proces, zautomatyzuj go od początku do końca i sprawdź w praktyce. Kiedy się sprawdzi, przechodzisz do kolejnego. Takie podejście małymi krokami jest tańsze, mniej ryzykowne i szybciej przynosi efekty." },
        { type: "h2", text: "Czego zwykle się używa" },
        { type: "p", text: "Wiele integracji da się zbudować na istniejących narzędziach, które już masz — jeśli udostępniają API lub eksport danych. Tam, gdzie gotowe klocki nie wystarczą, piszę dedykowaną automatyzację dopasowaną do Twojego procesu, łącznie z obsługą błędów, żeby działała niezawodnie." },
        { type: "p", text: "Jeśli masz w firmie zadanie, które „robi się samo tylko dlatego, że ktoś je robi ręcznie” — napisz. Wspólnie znajdziemy najprostszy sposób, żeby zdjąć je z głowy." },
      ],
      en: [
        { type: "p", text: "Automation sounds like expensive corporate systems, but small businesses gain the most from it — because that's where one person does everything at once and every hour saved is precious. The good news: you don't have to start with a revolution." },
        { type: "h2", text: "Find the tasks eating your time" },
        { type: "p", text: "Start by listing the things you repeat every week that are boring and rule-based. The best candidates for automation are usually:" },
        { type: "ul", items: [
          "Copying data between systems (e.g. from a form into a spreadsheet)",
          "Issuing and sending the same documents",
          "Reminders, confirmations and notifications to clients",
          "Collecting orders or enquiries from several places into one",
          "Monthly reports assembled by hand from several sources",
        ] },
        { type: "h2", text: "Count what it really costs" },
        { type: "p", text: "If a task takes 3 hours a week, that's over 150 hours a year. Even if the automation takes a few days to build, it usually pays back within a few months — and then simply runs in the background." },
        { type: "h2", text: "Start with a single process" },
        { type: "p", text: "Don't try to automate everything at once. Pick the single most annoying process, automate it end to end and test it in practice. Once it proves itself, move on to the next. This small-steps approach is cheaper, less risky and delivers results faster." },
        { type: "h2", text: "What's typically used" },
        { type: "p", text: "Many integrations can be built on the tools you already have — if they expose an API or data export. Where ready-made building blocks aren't enough, I write a custom automation tailored to your process, including error handling so it runs reliably." },
        { type: "p", text: "If there's a task in your company that “runs itself only because someone runs it by hand” — get in touch. Together we'll find the simplest way to take it off your plate." },
      ],
    },
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

// Newest first.
export const sortedPosts = [...posts].sort((a, b) =>
  a.date < b.date ? 1 : -1
);

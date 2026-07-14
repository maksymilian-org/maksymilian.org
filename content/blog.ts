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
        { type: "p", text: "Jako niezależny developer utrzymuję stawki znacznie niższe niż agencje, przy tej samej jakości wykonania: wizytówkę robię od 400 zł, stronę firmową od 600 zł, a sklep od 1200 zł. Niższa cena bierze się z braku narzutu agencyjnego, a nie z gorszej roboty." },
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
        { type: "p", text: "As an independent developer I keep rates well below agency prices for the same build quality: a one-pager from 400 PLN, a company site from 600 PLN, and a store from 1,200 PLN. The lower price comes from no agency overhead — not from cutting corners." },
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
  {
    slug: "ile-kosztuje-aplikacja-mobilna",
    date: "2026-07-09",
    illustration: "mobile",
    readingMinutes: 6,
    tags: {
      pl: ["Aplikacje mobilne", "Cennik", "React Native"],
      en: ["Mobile apps", "Pricing", "React Native"],
    },
    title: {
      pl: "Ile kosztuje aplikacja mobilna i od czego zależy cena",
      en: "How much does a mobile app cost, and what drives the price",
    },
    excerpt: {
      pl: "Co realnie wpływa na koszt aplikacji na telefon, dlaczego jeden kod na iOS i Android potrafi zdławić budżet o połowę i ile trzeba doliczyć na utrzymanie.",
      en: "What really drives the cost of a phone app, why one codebase for iOS and Android can halve the budget, and what to budget for upkeep.",
    },
    body: {
      pl: [
        { type: "p", text: "Aplikacja mobilna to jeden z tych projektów, gdzie widełki cenowe są ogromne — od kilku tysięcy złotych za prostą aplikację do kilkudziesięciu tysięcy za rozbudowany produkt. Poniżej tłumaczę, co realnie wpływa na koszt i jak nie przepłacić." },
        { type: "h2", text: "Największy czynnik: zakres funkcji" },
        { type: "p", text: "Cena rośnie przede wszystkim z liczbą i złożonością funkcji. Inaczej wycenia się aplikację, która pokazuje treści i wysyła powiadomienia, a inaczej taką z kontami użytkowników, płatnościami i synchronizacją danych w czasie rzeczywistym. Na budżet wpływają zwykle:" },
        { type: "ul", items: [
          "Logowanie i konta użytkowników",
          "Płatności, subskrypcje lub zakupy w aplikacji",
          "Backend i API — czyli serwer, z którym gada aplikacja",
          "Powiadomienia push, mapy, aparat, tryb offline",
          "Panel administracyjny do zarządzania treścią",
        ] },
        { type: "h2", text: "Jeden kod zamiast dwóch: React Native" },
        { type: "p", text: "Największa oszczędność bierze się z technologii. Zamiast pisać osobno aplikację na iOS i osobno na Androida, w React Native piszę jeden kod, który działa na obu platformach. To realnie skraca czas i potrafi obciąć koszt nawet o połowę względem dwóch osobnych aplikacji natywnych — przy zachowaniu natywnego wyglądu i płynności." },
        { type: "h2", text: "Pamiętaj o kosztach po starcie" },
        { type: "p", text: "Sama budowa to nie koniec. Do budżetu warto z góry doliczyć rzeczy, o których łatwo zapomnieć:" },
        { type: "ul", items: [
          "Konta deweloperskie: Apple App Store (99 USD rocznie) i Google Play (jednorazowo 25 USD)",
          "Hosting backendu i baza danych",
          "Aktualizacje pod nowe wersje systemów iOS i Android",
          "Poprawki, drobne zmiany i rozwój po premierze",
        ] },
        { type: "h2", text: "Jak podejść do wyceny mądrze" },
        { type: "p", text: "Najtaniej wychodzi start od wersji MVP — czyli najprostszej działającej aplikacji z jedną, kluczową funkcją. Wypuszczasz ją, sprawdzasz z prawdziwymi użytkownikami i dopiero potem inwestujesz w rozbudowę tego, co faktycznie się przyjęło. To ogranicza ryzyko i rozkłada koszt w czasie." },
        { type: "p", text: "Jeśli masz pomysł na aplikację, napisz w kilku zdaniach, co ma robić — odpiszę z orientacyjnym zakresem, kosztem i terminem. Pierwsza rozmowa i wycena są darmowe." },
      ],
      en: [
        { type: "p", text: "A mobile app is one of those projects where the price range is huge — from a few thousand zloty for a simple app to tens of thousands for a rich product. Below I explain what really drives the cost and how to avoid overpaying." },
        { type: "h2", text: "The biggest factor: scope of features" },
        { type: "p", text: "The price grows mainly with the number and complexity of features. An app that shows content and sends notifications is priced very differently from one with user accounts, payments and real-time data sync. The budget is usually driven by:" },
        { type: "ul", items: [
          "Sign-in and user accounts",
          "Payments, subscriptions or in-app purchases",
          "A backend and API — the server the app talks to",
          "Push notifications, maps, camera, offline mode",
          "An admin panel to manage content",
        ] },
        { type: "h2", text: "One codebase instead of two: React Native" },
        { type: "p", text: "The biggest saving comes from technology. Instead of building a separate app for iOS and another for Android, with React Native I write one codebase that runs on both. That genuinely shortens the timeline and can cut the cost by up to half compared with two separate native apps — while keeping a native look and feel." },
        { type: "h2", text: "Don't forget the costs after launch" },
        { type: "p", text: "Building the app isn't the end. It's worth budgeting up front for the things that are easy to forget:" },
        { type: "ul", items: [
          "Developer accounts: Apple App Store (99 USD/year) and Google Play (one-off 25 USD)",
          "Backend hosting and a database",
          "Updates for new iOS and Android versions",
          "Fixes, small changes and growth after release",
        ] },
        { type: "h2", text: "How to approach the quote wisely" },
        { type: "p", text: "The cheapest route is to start with an MVP — the simplest working app with one key feature. You ship it, test it with real users, and only then invest in expanding what actually caught on. That limits risk and spreads the cost over time." },
        { type: "p", text: "If you have an app idea, describe in a few sentences what it should do — I'll reply with a rough scope, cost and timeline. The first conversation and quote are free." },
      ],
    },
  },
  {
    slug: "integracja-sklepu-allegro-baselinker",
    date: "2026-07-11",
    illustration: "ecommerce",
    readingMinutes: 6,
    tags: {
      pl: ["E-commerce", "Integracje", "Allegro", "Baselinker"],
      en: ["E-commerce", "Integrations", "Allegro", "Baselinker"],
    },
    title: {
      pl: "Integracja sklepu z Allegro i Baselinker — jak to działa",
      en: "Integrating your store with Allegro and Baselinker",
    },
    excerpt: {
      pl: "Jak połączyć sklep, Allegro i magazyn w jednym miejscu, przestać ręcznie przepisywać zamówienia i uniknąć sprzedaży towaru, którego już nie ma.",
      en: "How to connect your store, Allegro and warehouse in one place, stop retyping orders by hand and avoid overselling out-of-stock items.",
    },
    body: {
      pl: [
        { type: "p", text: "Sprzedajesz jednocześnie we własnym sklepie i na Allegro? Bez integracji szybko robi się z tego chaos: dwa panele zamówień, ręczne przepisywanie danych i ciągły strach, że sprzedasz coś, czego już nie ma na magazynie. Baselinker rozwiązuje to, spinając wszystko w jeden panel — a moim zadaniem jest podłączyć do niego Twój sklep tak, żeby po prostu działało." },
        { type: "h2", text: "Co daje integracja z Baselinker" },
        { type: "p", text: "Baselinker to popularny w Polsce system, który zbiera zamówienia z wielu kanałów i zarządza magazynem oraz wysyłką w jednym miejscu. Dobrze podłączony do sklepu pozwala:" },
        { type: "ul", items: [
          "Zbierać zamówienia ze sklepu i z Allegro w jednym panelu",
          "Automatycznie zdejmować stan magazynowy po każdej sprzedaży",
          "Wystawiać faktury i etykiety kurierskie hurtowo",
          "Aktualizować ceny i dostępność produktów w wielu miejscach naraz",
          "Automatycznie wysyłać statusy i numery przesyłek do klientów",
        ] },
        { type: "h2", text: "Najczęstszy problem: nadsprzedaż" },
        { type: "p", text: "Bez wspólnego stanu magazynowego łatwo sprzedać ten sam ostatni egzemplarz dwa razy — raz w sklepie, raz na Allegro. Kończy się to anulowaniem zamówienia, zwrotem pieniędzy i negatywną opinią. Integracja pilnuje jednego, wspólnego stanu, więc gdy towar się kończy, znika ze wszystkich kanałów naraz." },
        { type: "h2", text: "Jak wygląda podłączenie" },
        { type: "p", text: "Sposób integracji zależy od tego, na czym stoi Twój sklep. Popularne platformy mają gotowe wtyczki, ale w praktyce często trzeba je dostroić albo — przy sklepie na własnym silniku — połączyć się przez API. Typowa realizacja obejmuje:" },
        { type: "ol", items: [
          "Ustalenie, które dane mają się synchronizować i w którą stronę",
          "Połączenie sklepu z Baselinker (wtyczka lub API)",
          "Zmapowanie produktów, kategorii i stanów magazynowych",
          "Testy na zamówieniach próbnych, zanim wszystko pójdzie na produkcję",
        ] },
        { type: "p", text: "Jeśli tracisz czas na ręczne przeklejanie zamówień albo zdarza Ci się sprzedać towar, którego nie ma — napisz. Sprawdzę, jak spiąć Twój sklep, Allegro i magazyn tak, żeby proces działał sam." },
      ],
      en: [
        { type: "p", text: "Selling on your own store and on Allegro at the same time? Without an integration it quickly turns into chaos: two order panels, retyping data by hand and a constant fear of selling something that's already out of stock. Baselinker solves this by pulling everything into one panel — and my job is to connect your store to it so it just works." },
        { type: "h2", text: "What a Baselinker integration gives you" },
        { type: "p", text: "Baselinker is a system popular in Poland that collects orders from many channels and manages stock and shipping in one place. Connected properly to your store, it lets you:" },
        { type: "ul", items: [
          "Collect orders from the store and Allegro in one panel",
          "Automatically reduce stock levels after every sale",
          "Issue invoices and courier labels in bulk",
          "Update prices and availability across channels at once",
          "Automatically send statuses and tracking numbers to customers",
        ] },
        { type: "h2", text: "The most common problem: overselling" },
        { type: "p", text: "Without a shared stock level it's easy to sell the same last item twice — once in the store, once on Allegro. That ends in a cancelled order, a refund and a bad review. The integration keeps a single shared stock level, so when an item runs out it disappears from every channel at once." },
        { type: "h2", text: "What connecting it looks like" },
        { type: "p", text: "How the integration is done depends on what your store runs on. Popular platforms have ready-made plugins, but in practice they often need tuning — or, for a custom-built store, a connection over the API. A typical project covers:" },
        { type: "ol", items: [
          "Deciding which data should sync, and in which direction",
          "Connecting the store to Baselinker (plugin or API)",
          "Mapping products, categories and stock levels",
          "Testing on sample orders before anything goes to production",
        ] },
        { type: "p", text: "If you're losing time retyping orders by hand, or occasionally sell stock you no longer have — get in touch. I'll look at how to connect your store, Allegro and warehouse so the process runs itself." },
      ],
    },
  },
  {
    slug: "hire-developer-from-poland-nearshoring",
    date: "2026-07-13",
    illustration: "webapps",
    readingMinutes: 6,
    tags: {
      pl: ["Nearshoring", "Współpraca", "Zdalnie"],
      en: ["Nearshoring", "Hiring", "Remote"],
    },
    title: {
      pl: "Nearshoring: dlaczego warto zatrudnić programistę z Polski",
      en: "Hiring a developer from Poland: a practical nearshoring guide",
    },
    excerpt: {
      pl: "Bliskie strefy czasowe, mocne kwalifikacje i rozsądne stawki — dlaczego firmy z zachodniej Europy i USA chętnie zlecają projekty programistom z Polski.",
      en: "Overlapping time zones, strong skills and reasonable rates — why Western European and US companies increasingly hand projects to developers in Poland.",
    },
    body: {
      pl: [
        { type: "p", text: "Coraz więcej firm z Europy Zachodniej i USA zamiast zatrudniać drogiego developera na miejscu, zleca projekty specjalistom z Polski. To model nazywany nearshoringiem — praca zdalna z kimś w bliskiej strefie czasowej, kto ma porównywalne kwalifikacje, ale niższą stawkę. Oto dlaczego to działa." },
        { type: "h2", text: "Strefa czasowa, która się pokrywa" },
        { type: "p", text: "Polska jest w strefie środkowoeuropejskiej (CET). To pełne pokrycie godzin pracy z resztą Europy i sensowny wspólny czas ze wschodnim wybrzeżem USA. W praktyce oznacza to rozmowy na żywo, szybkie decyzje i brak czekania dobę na odpowiedź — inaczej niż przy współpracy z odległymi strefami." },
        { type: "h2", text: "Mocne kwalifikacje techniczne" },
        { type: "p", text: "Polscy programiści regularnie plasują się w czołówce światowych rankingów umiejętności. Nie brakuje tu doświadczenia w nowoczesnym stacku — React, TypeScript, Next.js, Node.js — ani w integracjach i aplikacjach mobilnych. Dostajesz jakość porównywalną z lokalnym seniorem, tyle że taniej." },
        { type: "h2", text: "Rozsądne stawki bez utraty jakości" },
        { type: "p", text: "Niższy koszt nie wynika z gorszej pracy, tylko z niższych kosztów życia i braku narzutu dużej agencji. Współpracując bezpośrednio z developerem, płacisz za realną robotę, a nie za warstwy pośredników, sprzedaży i zarządzania projektem." },
        { type: "h2", text: "Na co zwrócić uwagę przy wyborze" },
        { type: "p", text: "Żeby współpraca się udała, warto sprawdzić kilka rzeczy:" },
        { type: "ul", items: [
          "Komunikację po angielsku — swobodną, na bieżąco",
          "Portfolio i realne projekty, najlepiej z kodem do wglądu",
          "Umowę i legalne rozliczenie na fakturę, z przekazaniem praw do kodu",
          "Bezpośredni kontakt z osobą, która faktycznie pisze kod",
        ] },
        { type: "p", text: "Pracuję zdalnie z klientami w Polsce i za granicą, rozliczam się na fakturę i rozmawiam po angielsku. Jeśli szukasz rzetelnego developera z Polski do konkretnego projektu — napisz, a wrócę z zakresem, kosztem i terminem." },
      ],
      en: [
        { type: "p", text: "More and more companies in Western Europe and the US, instead of hiring an expensive developer locally, hand their projects to specialists in Poland. This model is called nearshoring — working remotely with someone in a nearby time zone who has comparable skills but a lower rate. Here's why it works." },
        { type: "h2", text: "A time zone that overlaps" },
        { type: "p", text: "Poland is in Central European Time (CET). That's a full overlap with the rest of Europe and a workable shared window with the US East Coast. In practice it means live calls, fast decisions and no waiting a full day for a reply — unlike working with far-away time zones." },
        { type: "h2", text: "Strong technical skills" },
        { type: "p", text: "Polish developers consistently rank near the top in global skills league tables. There's no shortage of experience in a modern stack — React, TypeScript, Next.js, Node.js — nor in integrations and mobile apps. You get quality comparable to a local senior, just at a lower cost." },
        { type: "h2", text: "Reasonable rates without losing quality" },
        { type: "p", text: "The lower cost doesn't come from lesser work, but from a lower cost of living and no big-agency overhead. Working directly with a developer, you pay for the actual work — not for layers of middlemen, sales and project management." },
        { type: "h2", text: "What to check when choosing" },
        { type: "p", text: "For the collaboration to succeed, it's worth checking a few things:" },
        { type: "ul", items: [
          "English communication — fluent and responsive",
          "A portfolio and real projects, ideally with code to review",
          "A contract and proper invoicing, with code rights transferred to you",
          "Direct contact with the person who actually writes the code",
        ] },
        { type: "p", text: "I work remotely with clients in Poland and abroad, invoice properly and communicate in English. If you're looking for a reliable developer from Poland for a specific project — get in touch and I'll come back with a scope, cost and timeline." },
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

import type { IllustrationKey } from "@/content/services";
import type { L } from "@/content/quote";

// "Solutions by industry" pages. Every claim in `proof` comes from the real
// portfolio in content/projects.ts; industries with no matching project simply
// omit it. Prices follow the online quote calculator (content/quote.ts).

const l = (pl: string, en: string): L => ({ pl, en });
const lists = (pl: string[], en: string[]) => ({ pl, en });

export interface Industry {
  id: string;
  slug: string;
  illustration: IllustrationKey;
  /** Category pre-selected in the online quote. */
  quoteService: string;
  /** Service ids linked from the page. */
  services: string[];
  /** Blog slugs shown at the bottom. */
  posts: string[];
  title: L;
  h1: L;
  lead: L;
  metaTitle: L;
  metaDescription: L;
  pains: { pl: string[]; en: string[] };
  build: { pl: string[]; en: string[] };
  proof?: { text: L; links: { url: string; title: string }[] };
  price: L;
  faq: { q: L; a: L }[];
}

export const industries: Industry[] = [
  {
    id: "hospitality",
    slug: "hotels-travel",
    illustration: "webapps",
    quoteService: "webapp",
    services: ["websites", "webapps", "integrations"],
    posts: ["ile-kosztuje-dedykowana-aplikacja-webowa", "excel-przestal-wystarczac-czas-na-wlasny-system", "jak-wyglada-wycena-aplikacji-etapy-i-brief"],
    title: l("Hotele, apartamenty i biura podróży", "Hotels, apartments and travel agencies"),
    h1: l("Strony i systemy rezerwacji dla hoteli, apartamentów i biur podróży", "Websites and booking systems for hotels, apartments and travel agencies"),
    lead: l(
      "Rezerwacje przez maile i telefon, wyceny liczone ręcznie według reguł każdego wyjazdu, umowy przepisywane do Worda. Buduję strony i systemy, które łączą sprzedaż z codzienną pracą biura.",
      "Bookings by e-mail and phone, quotes calculated by hand according to each trip's rules, contracts retyped into Word. I build websites and systems that connect sales with the office's daily work."
    ),
    metaTitle: l("System rezerwacji i strona dla hotelu lub biura podróży", "Booking system and website for a hotel or travel agency"),
    metaDescription: l(
      "Strona z ofertą, rezerwacje, automatyczna wycena według reguł, umowy PDF i panel klienta. Dla hoteli, apartamentów i biur podróży. Darmowa wycena online.",
      "A website with your offer, bookings, rule-based automatic pricing, PDF contracts and a client portal. For hotels, apartments and travel agencies. Free online quote."
    ),
    pains: lists(
      [
        "Zapytania i rezerwacje rozproszone po mailach, telefonach i arkuszach",
        "Wycena zależna od liczby osób, pokoi, wieku dzieci, opcji dodatkowych i waluty, liczona ręcznie",
        "Umowy, potwierdzenia i przypomnienia o płatnościach przygotowywane ręcznie",
        "Listy uczestników i rooming w Excelu, przesyłane hotelowi mailem",
      ],
      [
        "Enquiries and bookings scattered across e-mail, phone and spreadsheets",
        "Pricing that depends on guests, rooms, children's ages, extras and currency, calculated by hand",
        "Contracts, confirmations and payment reminders prepared manually",
        "Guest lists and rooming in Excel, e-mailed to the hotel",
      ]
    ),
    build: lists(
      [
        "Stronę z ofertą wyjazdów lub pokoi, opisami i cennikiem, którą zespół sam edytuje",
        "Formularz zgłoszenia, który od razu tworzy rezerwację",
        "Automatyczną wycenę według reguł konkretnego wyjazdu (osoby, pokoje, dzieci, opcje, ubezpieczenie, PLN i EUR)",
        "Panel biura: statusy, historia, notatki, wpłaty, saldo",
        "Portal klienta na bezpiecznym linku, bez zakładania konta",
        "Umowy PDF z danych rezerwacji oraz automatyczne maile i przypomnienia",
        "Eksporty list uczestników i roomingu do XLSX dla hotelu",
      ],
      [
        "A website with your trips or rooms, descriptions and prices that your team edits itself",
        "A booking form that creates the reservation straight away",
        "Automatic pricing by the rules of each trip (guests, rooms, children, extras, insurance, PLN and EUR)",
        "An office panel: statuses, history, notes, payments, balance",
        "A client portal on a secure link, no account needed",
        "PDF contracts from booking data plus automatic e-mails and reminders",
        "Guest-list and rooming exports to XLSX for the hotel",
      ]
    ),
    proof: {
      text: l(
        "Realizowałem strony dla obiektów noclegowych oraz aplikację do zarządzania zakwaterowaniem z rezerwacjami i algorytmem dopasowywania użytkowników (Django i Vue).",
        "I have built websites for accommodation businesses and an accommodation-management app with bookings and a user-matching algorithm (Django and Vue)."
      ),
      links: [
        { url: "https://hotel-royalbotanic.pl/", title: "hotel-royalbotanic.pl" },
        { url: "http://apartamentyogrodowa.pl/en", title: "apartamentyogrodowa.pl" },
        { url: "https://www.studenthousingsoftware.com/", title: "studenthousingsoftware.com" },
      ],
    },
    price: l(
      "Strona obiektu zaczyna się od ok. 600 zł. System z rezerwacjami, wyceną, panelem biura, portalem klienta i umowami to zwykle kilka tysięcy złotych, zależnie od liczby modułów. Dokładne widełki zobaczysz w kalkulatorze wyceny online.",
      "A property website starts at about 600 PLN. A system with bookings, pricing, an office panel, a client portal and contracts is usually a few thousand zloty, depending on the number of modules. You can see exact ranges in the online quote calculator."
    ),
    faq: [
      {
        q: l("Ile kosztuje system rezerwacji dla hotelu lub biura podróży?", "How much does a booking system for a hotel or travel agency cost?"),
        a: l("To zależy od zakresu. Strona z formularzem rezerwacji to koszt strony firmowej (od ok. 600 zł). System z automatyczną wyceną, panelem biura i portalem klienta zwykle kosztuje od kilku do kilkunastu tysięcy złotych. Zakres wyceniam po krótkiej rozmowie, a orientacyjne widełki policzy kalkulator online.", "It depends on the scope. A site with a booking form costs about a company website (from around 600 PLN). A system with automatic pricing, an office panel and a client portal usually costs from a few to a dozen or so thousand zloty. I quote the scope after a short conversation, and the online calculator gives indicative ranges."),
      },
      {
        q: l("Czy system może liczyć cenę według reguł wyjazdu?", "Can the system calculate the price using the trip's rules?"),
        a: l("Tak. Reguły takie jak liczba osób, rodzaj pokoju, wiek dzieci, opcje dodatkowe, ubezpieczenie, zaliczki i przeliczenie PLN na EUR można zapisać w systemie, tak aby wycena liczyła się automatycznie i była powtarzalna.", "Yes. Rules such as the number of guests, room type, children's ages, extras, insurance, deposits and PLN to EUR conversion can be built into the system so the price is calculated automatically and consistently."),
      },
      {
        q: l("Czy muszę rezygnować z obecnych narzędzi?", "Do I have to give up my current tools?"),
        a: l("Nie od razu. Zaczynamy zwykle od jednego, najbardziej uciążliwego procesu (np. wyceny i umów), a resztę dokładamy etapami. Dane z arkuszy można zaimportować do systemu.", "Not right away. We usually start with the single most painful process (for example pricing and contracts) and add the rest in stages. Data from spreadsheets can be imported into the system."),
      },
    ],
  },
  {
    id: "local-services",
    slug: "clinics-local-business",
    illustration: "websites",
    quoteService: "business",
    services: ["websites", "audit", "maintenance"],
    posts: ["co-musi-zawierac-strona-firmowa", "dlaczego-strona-nie-wyswietla-sie-w-google", "ile-kosztuje-strona-internetowa"],
    title: l("Gabinety, kancelarie i lokalne firmy usługowe", "Clinics, practices and local service businesses"),
    h1: l("Strony internetowe dla gabinetów, kancelarii i lokalnych firm usługowych", "Websites for clinics, practices and local service businesses"),
    lead: l(
      "Klient szuka Cię w Google, wchodzi na telefonie i w kilka sekund decyduje, czy zadzwonić. Buduję szybkie strony, które pojawiają się w wynikach lokalnych i ułatwiają kontakt.",
      "A customer searches for you on Google, opens the site on a phone and decides within seconds whether to call. I build fast websites that show up in local results and make contact easy."
    ),
    metaTitle: l("Strona internetowa dla gabinetu, kancelarii i lokalnej firmy", "Website for a clinic, practice or local business"),
    metaDescription: l(
      "Szybka strona firmowa od 600 zł z lokalnym SEO, rezerwacją wizyt i zgodnością z RODO. Dla gabinetów, kancelarii, restauracji i firm usługowych.",
      "A fast company website from 600 PLN with local SEO, appointment booking and GDPR compliance. For clinics, practices, restaurants and service businesses."
    ),
    pains: lists(
      [
        "Strona jest wolna albo nie działa na telefonie, więc klienci wychodzą",
        "Firma nie pojawia się w Google na frazy typu „usługa + miasto”",
        "Rezerwacje wizyt odbywają się wyłącznie telefonicznie",
        "Brak podstawowych elementów prawnych: polityki prywatności, cookies, danych firmy",
      ],
      [
        "The site is slow or doesn't work on a phone, so visitors leave",
        "The business doesn't show up on Google for “service + city” searches",
        "Appointments can only be booked by phone",
        "Basic legal elements are missing: privacy policy, cookies, company details",
      ]
    ),
    build: lists(
      [
        "Szybką, responsywną stronę firmową z czytelną ofertą i danymi kontaktowymi",
        "Podstrony usług pod konkretne zapytania klientów",
        "Lokalne SEO: dane strukturalne, profil Firmy w Google, opinie",
        "Formularz kontaktowy i rezerwację wizyt lub terminów",
        "Polityka prywatności, zgody na cookies i dane firmy zgodne z RODO",
        "Łatwą edycję treści i opiekę po wdrożeniu",
      ],
      [
        "A fast, responsive company site with a clear offer and contact details",
        "Service pages aimed at what customers actually search for",
        "Local SEO: structured data, a Google Business Profile, reviews",
        "A contact form and appointment or slot booking",
        "A GDPR-compliant privacy policy, cookie consent and company details",
        "Easy content editing and post-launch care",
      ]
    ),
    proof: {
      text: l(
        "Realizowałem strony dla gabinetu dermatologicznego w Lublinie, biura rachunkowego i restauracji.",
        "I have built websites for a dermatology practice in Lublin, an accountancy and a restaurant."
      ),
      links: [
        { url: "https://dermatologlublin.com.pl/", title: "dermatologlublin.com.pl" },
        { url: "http://ksiegowy.plus/", title: "ksiegowy.plus" },
        { url: "http://forchetto.com/en/", title: "forchetto.com" },
      ],
    },
    price: l(
      "Strona firmowa zaczyna się od ok. 600 zł, a prosta wizytówka od 400 zł. Rezerwacje, wiele podstron i panel do edycji treści podnoszą cenę, ale kalkulator online pokaże widełki w kilka minut.",
      "A company website starts at about 600 PLN and a simple one-pager from 400 PLN. Bookings, many pages and an editing panel raise the price, but the online calculator shows a range in minutes."
    ),
    faq: [
      {
        q: l("Ile kosztuje strona internetowa dla gabinetu lub kancelarii?", "How much does a website for a clinic or practice cost?"),
        a: l("Strona firmowa z kilkoma podstronami zaczyna się od ok. 600 zł. Cena rośnie z liczbą podstron, rezerwacją wizyt i panelem do edycji treści. Dokładną wycenę dostaniesz po krótkiej rozmowie albo z kalkulatora online.", "A company website with several pages starts at about 600 PLN. The price grows with the number of pages, appointment booking and a content-editing panel. You get an exact quote after a short conversation or from the online calculator."),
      },
      {
        q: l("Czy strona pomoże mi pojawić się w Google w moim mieście?", "Will the site help me show up on Google in my city?"),
        a: l("Tak, o ile jest zbudowana pod to: z osobnymi podstronami usług, danymi strukturalnymi, poprawnym adresem i telefonem oraz powiązaniem z profilem Firmy w Google. Pozycji nikt nie może zagwarantować, ale dobra podstawa techniczna i treściowa jest warunkiem koniecznym.", "Yes, as long as it's built for it: with separate service pages, structured data, a correct address and phone number and a link to your Google Business Profile. Nobody can guarantee rankings, but a solid technical and content base is a prerequisite."),
      },
      {
        q: l("Czy muszę mieć politykę prywatności i cookies?", "Do I need a privacy policy and cookie notice?"),
        a: l("Tak. Strona zbierająca dane (formularz, rezerwacje, analityka) musi mieć politykę prywatności zgodną z RODO i, przy cookies innych niż niezbędne, zgodę użytkownika. Przygotowuję te elementy razem ze stroną.", "Yes. A site that collects data (a form, bookings, analytics) needs a GDPR-compliant privacy policy and, for non-essential cookies, the user's consent. I prepare these elements along with the site."),
      },
    ],
  },
  {
    id: "manufacturing",
    slug: "manufacturing-industry",
    illustration: "ksef",
    quoteService: "ksef",
    services: ["ksef", "integrations", "webapps", "embedded"],
    posts: ["ksef-dla-firm-produkcyjnych", "integracja-ksef-api-najczestsze-bledy", "modernizacja-aplikacji-przepisac-czy-naprawic"],
    title: l("Firmy produkcyjne i przemysł", "Manufacturers and industry"),
    h1: l("Oprogramowanie dla firm produkcyjnych: KSeF, integracje i panele", "Software for manufacturers: KSeF, integrations and dashboards"),
    lead: l(
      "Faktury z kilku systemów, dane rozrzucone między ERP, magazynem i arkuszami, procesy, które trzeba kontrolować. Podłączam systemy do KSeF, buduję integracje i panele oraz oprogramowanie współpracujące ze sprzętem.",
      "Invoices from several systems, data scattered across the ERP, warehouse and spreadsheets, processes that have to be controlled. I connect systems to KSeF, build integrations and dashboards, and write software that works with hardware."
    ),
    metaTitle: l("Oprogramowanie dla firm produkcyjnych: KSeF, integracje, panele", "Software for manufacturers: KSeF, integrations, dashboards"),
    metaDescription: l(
      "Integracja ERP z KSeF, połączenie systemów, panele kontrolne i oprogramowanie dla sprzętu. Dla firm produkcyjnych i przemysłowych. Darmowa wycena online.",
      "ERP integration with KSeF, connecting systems, control dashboards and software for hardware. For manufacturing and industrial companies. Free online quote."
    ),
    pains: lists(
      [
        "KSeF wymaga podłączenia kilku źródeł faktur (ERP, magazyn, portal B2B) i obsługi korekt",
        "Dane o produkcji, magazynie i sprzedaży żyją w osobnych systemach i arkuszach",
        "Starszy lub własny system bez API, którego nikt nie chce ruszać",
        "Brak jednego miejsca z raportami i kontrolą procesów",
      ],
      [
        "KSeF requires connecting several invoice sources (ERP, warehouse, B2B portal) and handling corrections",
        "Production, warehouse and sales data live in separate systems and spreadsheets",
        "An older or in-house system with no API that nobody wants to touch",
        "No single place for reports and process control",
      ]
    ),
    build: lists(
      [
        "Integrację Twojego ERP lub systemu sprzedażowego z KSeF (wysyłka, odbiór, korekty, statusy)",
        "Konektory i synchronizację między ERP, magazynem i innymi systemami",
        "Panele i raporty zbierające dane z kilku źródeł",
        "Aplikacje webowe do kontroli procesów i automatyzacji obiegu dokumentów",
        "Oprogramowanie współpracujące z urządzeniami i czujnikami",
        "Modernizację starszych aplikacji bez zatrzymywania pracy firmy",
      ],
      [
        "Integration of your ERP or sales system with KSeF (sending, receiving, corrections, statuses)",
        "Connectors and synchronisation between the ERP, warehouse and other systems",
        "Dashboards and reports pulling data from several sources",
        "Web apps for process control and document-flow automation",
        "Software that works with devices and sensors",
        "Modernising older applications without stopping the business",
      ]
    ),
    proof: {
      text: l(
        "Realizowałem aplikację webową do kontroli procesów biznesowych (algorytmy, automatyzacja, weryfikacja na podstawie historii zdarzeń) oraz oprogramowanie ewaluacyjne dla czujników i urządzeń audio dla producenta układów scalonych.",
        "I have built a web app for business process control (algorithms, automation, verification against event history) and evaluation software for sensors and audio devices for a semiconductor manufacturer."
      ),
      links: [
        { url: "https://intrack.eu/", title: "intrack.eu" },
        { url: "https://ingrifo.com/", title: "ingrifo.com" },
        { url: "https://ams.com/as5951-eval-kit", title: "ams.com (AS5951)" },
      ],
    },
    price: l(
      "Prostą integrację z KSeF dla jednego systemu robię od ok. 600 zł. Wdrożenie z kilkoma źródłami faktur, odbiorem kosztów i obsługą korekt, a także panele i konektory wyceniam po rozmowie, bo zależą od liczby systemów.",
      "I do a simple KSeF integration for one system from about 600 PLN. Rollouts with several invoice sources, cost receiving and correction handling, as well as dashboards and connectors, I quote after a conversation because they depend on the number of systems."
    ),
    faq: [
      {
        q: l("Czy muszę zmieniać ERP, żeby wdrożyć KSeF?", "Do I have to change my ERP to roll out KSeF?"),
        a: l("Zwykle nie. Jeśli system ma API lub eksport danych, można podłączyć do niego integrację z KSeF. Przy starszych lub własnych systemach buduje się konektor albo warstwę pośrednią, która zbiera faktury z kilku miejsc.", "Usually not. If the system has an API or a data export, a KSeF integration can be connected to it. For older or in-house systems a connector or a middleware layer is built that collects invoices from several places."),
      },
      {
        q: l("Jak długo trwa integracja z KSeF?", "How long does a KSeF integration take?"),
        a: l("Prosta integracja z jednym systemem to zwykle od kilku dni do kilku tygodni. Dłużej trwa wdrożenie z kilkoma źródłami faktur, odbiorem faktur kosztowych i obsługą wyjątków.", "A simple integration with one system usually takes from a few days to a few weeks. A rollout with several invoice sources, purchase-invoice receiving and exception handling takes longer."),
      },
      {
        q: l("Czy zbudujesz panel do raportów z kilku systemów?", "Can you build a reporting dashboard across several systems?"),
        a: l("Tak. Panel pobiera dane z istniejących systemów przez API lub eksport, łączy je i pokazuje w jednym miejscu, bez przepisywania danych ręcznie.", "Yes. A dashboard pulls data from existing systems through an API or export, combines it and shows it in one place, with no manual retyping."),
      },
    ],
  },
  {
    id: "fleet",
    slug: "fleet-logistics",
    illustration: "mobile",
    quoteService: "mobile",
    services: ["mobile", "webapps", "embedded"],
    posts: ["react-native-czy-flutter-czy-natywnie", "ile-kosztuje-aplikacja-mobilna", "pwa-czy-aplikacja-mobilna"],
    title: l("Flota, lokalizacja i logistyka", "Fleets, tracking and logistics"),
    h1: l("Aplikacje mobilne i webowe dla flot, lokalizacji i logistyki", "Mobile and web apps for fleets, tracking and logistics"),
    lead: l(
      "Gdzie jest pojazd, którędy jechał, kiedy dotrze. Buduję aplikacje na iOS i Androida oraz panele z mapami, które pokazują to właścicielom pojazdów i dyspozytorom w czasie rzeczywistym.",
      "Where the vehicle is, which way it went, when it will arrive. I build iOS and Android apps and map dashboards that show owners and dispatchers this in real time."
    ),
    metaTitle: l("Aplikacja do lokalizacji pojazdów i zarządzania flotą", "Vehicle tracking and fleet management app"),
    metaDescription: l(
      "Aplikacje mobilne na iOS i Androida oraz panele z mapami dla flot i logistyki: lokalizacja w czasie rzeczywistym, historia tras, powiadomienia, integracja z urządzeniami GPS.",
      "iOS and Android apps and map dashboards for fleets and logistics: real-time tracking, trip history, notifications, GPS device integration."
    ),
    pains: lists(
      [
        "Brak wglądu w to, gdzie są pojazdy i jak są używane",
        "Raporty tras i kilometrów przygotowywane ręcznie",
        "Dane z urządzeń GPS dostępne tylko w niewygodnym narzędziu dostawcy",
        "Klienci oczekują aplikacji mobilnej, a firma ma tylko panel w przeglądarce",
      ],
      [
        "No visibility into where vehicles are and how they are used",
        "Route and mileage reports prepared by hand",
        "GPS device data available only in the vendor's clumsy tool",
        "Customers expect a mobile app while the company has only a browser panel",
      ]
    ),
    build: lists(
      [
        "Aplikację mobilną na iOS i Androida z jednego kodu (React Native)",
        "Lokalizację w czasie rzeczywistym i mapy z historią tras",
        "Powiadomienia push o zdarzeniach (ruch, strefy, alarmy)",
        "Integrację z urządzeniami GPS i IoT przez ich API",
        "Panel webowy dla dyspozytorów i właścicieli floty",
        "Publikację w App Store i Google Play oraz opiekę po wdrożeniu",
      ],
      [
        "A mobile app for iOS and Android from one codebase (React Native)",
        "Real-time location and maps with trip history",
        "Push notifications for events (movement, zones, alarms)",
        "Integration with GPS and IoT devices through their API",
        "A web dashboard for dispatchers and fleet owners",
        "Publishing in the App Store and Google Play plus post-launch care",
      ]
    ),
    proof: {
      text: l(
        "Przez ponad dwa lata rozwijałem aplikację mobilną I-DUV, w której właściciele pojazdów lokalizują samochód, ciężarówkę lub motocykl w czasie rzeczywistym, przeglądają historię tras i zarządzają flotą. Aplikacja jest w App Store i Google Play. Realizowałem też aplikację webową do eksploracji geoserwisu.",
        "For over two years I developed the I-DUV mobile app, where vehicle owners locate a car, truck or motorcycle in real time, review trip history and manage a fleet. The app is in the App Store and Google Play. I also built a web app for exploring a geoservice."
      ),
      links: [
        { url: "https://play.google.com/store/apps/details?id=com.guidepoint.iduv", title: "I-DUV (Google Play)" },
        { url: "https://apps.apple.com/app/i-duv/id6503607752", title: "I-DUV (App Store)" },
        { url: "https://mapspace.com/", title: "mapspace.com" },
      ],
    },
    price: l(
      "Prosta aplikacja mobilna zaczyna się od ok. 1 600 zł. Aplikacja z kontami, mapami, powiadomieniami i backendem to zwykle kilka tysięcy złotych, a rozbudowany produkt więcej. Kalkulator online da orientacyjne widełki dla Twojego zakresu.",
      "A simple mobile app starts at about 1,600 PLN. An app with accounts, maps, notifications and a backend is usually a few thousand zloty, and a full product more. The online calculator gives an indicative range for your scope."
    ),
    faq: [
      {
        q: l("Ile kosztuje aplikacja do lokalizacji pojazdów?", "How much does a vehicle-tracking app cost?"),
        a: l("To zależy od funkcji: mapy w czasie rzeczywistym, historia tras, powiadomienia, panel dla dyspozytora i integracja z urządzeniami GPS. Prosta wersja zaczyna się od kilku tysięcy złotych, a pełny produkt kosztuje więcej. Zakres wyceniam po rozmowie.", "It depends on the features: real-time maps, trip history, notifications, a dispatcher panel and GPS device integration. A simple version starts at a few thousand zloty and a full product costs more. I quote the scope after a conversation."),
      },
      {
        q: l("Czy aplikacja zadziała na iPhonie i Androidzie?", "Will the app work on iPhone and Android?"),
        a: l("Tak. Buduję je w React Native, więc jeden kod działa na obu platformach, a koszt jest znacznie niższy niż przy dwóch osobnych aplikacjach natywnych.", "Yes. I build them in React Native, so one codebase runs on both platforms and the cost is far lower than for two separate native apps."),
      },
      {
        q: l("Czy połączysz aplikację z moimi urządzeniami GPS?", "Can you connect the app to my GPS devices?"),
        a: l("Jeśli urządzenie lub jego dostawca udostępnia API lub eksport danych, tak. Przy projektach IoT zajmuję się też oprogramowaniem po stronie urządzenia.", "If the device or its vendor provides an API or data export, yes. On IoT projects I also work on the device-side software."),
      },
    ],
  },
  {
    id: "ecommerce-sellers",
    slug: "online-sellers",
    illustration: "ecommerce",
    quoteService: "store",
    services: ["ecommerce", "integrations", "ksef"],
    posts: ["integracja-sklepu-allegro-baselinker", "ile-kosztuje-sklep-internetowy", "automatyzacja-w-malej-firmie"],
    title: l("Sprzedawcy online: sklepy, Allegro i Baselinker", "Online sellers: stores, Allegro and Baselinker"),
    h1: l("Sklepy internetowe i integracje z Allegro oraz Baselinker", "Online stores and integrations with Allegro and Baselinker"),
    lead: l(
      "Dwa panele zamówień, ręczne stany magazynowe i strach przed sprzedażą towaru, którego nie ma. Buduję sklepy i integracje, które spinają sprzedaż w jednym miejscu.",
      "Two order panels, manual stock levels and the fear of selling goods you don't have. I build stores and integrations that bring sales together in one place."
    ),
    metaTitle: l("Sklep internetowy i integracja z Baselinker oraz Allegro", "Online store and integration with Baselinker and Allegro"),
    metaDescription: l(
      "Sklep od 1200 zł, integracja z Baselinker i Allegro, wspólny stan magazynowy, faktury i KSeF. Koniec z ręcznym przepisywaniem zamówień. Darmowa wycena online.",
      "A store from 1,200 PLN, Baselinker and Allegro integration, shared stock levels, invoices and KSeF. No more retyping orders by hand. Free online quote."
    ),
    pains: lists(
      [
        "Zamówienia ze sklepu i Allegro w osobnych panelach",
        "Rozjeżdżające się stany magazynowe i nadsprzedaż",
        "Ręczne wystawianie faktur i etykiet kurierskich",
        "Sklep na szablonie, który trudno dopasować do własnego procesu",
      ],
      [
        "Orders from the store and Allegro in separate panels",
        "Stock levels drifting apart and overselling",
        "Invoices and courier labels issued by hand",
        "A template store that is hard to adapt to your own process",
      ]
    ),
    build: lists(
      [
        "Sklep z płatnościami (karty, BLIK, przelewy), dostawami i panelem zarządzania",
        "Integrację z Baselinker i Allegro: zamówienia, stany, statusy, ceny",
        "Wspólny stan magazynowy, który znika ze wszystkich kanałów naraz",
        "Fakturowanie i integrację z KSeF",
        "Feedy do porównywarek i marketplace'ów",
        "Migrację ze starego sklepu bez utraty danych",
      ],
      [
        "A store with payments (cards, BLIK, transfers), delivery and a management panel",
        "Integration with Baselinker and Allegro: orders, stock, statuses, prices",
        "A shared stock level that disappears from every channel at once",
        "Invoicing and KSeF integration",
        "Feeds for comparison sites and marketplaces",
        "Migration from an old store without losing data",
      ]
    ),
    price: l(
      "Sklep zaczyna się od ok. 1 200 zł, a integrację z Baselinker robię od ok. 400 zł przy jednym procesie. Liczba produktów, integracje i migracja podnoszą cenę. Kalkulator online pokaże widełki dla Twojego sklepu.",
      "A store starts at about 1,200 PLN and I do a Baselinker integration from about 400 PLN for a single process. The number of products, integrations and migration raise the price. The online calculator shows a range for your store."
    ),
    faq: [
      {
        q: l("Ile kosztuje integracja sklepu z Baselinker?", "How much does integrating a store with Baselinker cost?"),
        a: l("Jeśli wystarczy wtyczka, koszt to głównie jej konfiguracja. Integrację przez API z własnym sklepem lub systemem zaczynam od ok. 400 zł przy jednym procesie, a synchronizację stanów, zamówień i faktur wyceniam po rozmowie.", "If a plugin is enough, the cost is mostly configuring it. An API integration with your own store or system I start at about 400 PLN for a single process, and sync of stock, orders and invoices I quote after a conversation."),
      },
      {
        q: l("Jak uniknąć sprzedaży towaru, którego nie ma?", "How do I avoid selling goods I don't have?"),
        a: l("Trzeba mieć jeden wspólny stan magazynowy dla wszystkich kanałów. Integracja z Baselinkerem pilnuje go automatycznie, więc gdy towar się kończy, znika ze sklepu i z Allegro jednocześnie.", "You need one shared stock level for all channels. A Baselinker integration keeps it automatically, so when an item runs out it disappears from the store and Allegro at the same time."),
      },
      {
        q: l("Czy mogę zachować obecny sklep i tylko go zintegrować?", "Can I keep my current store and just integrate it?"),
        a: l("Tak. Większość platform sklepowych da się połączyć z Baselinkerem przez wtyczkę lub API, więc zmiana sklepu nie jest warunkiem integracji.", "Yes. Most store platforms can be connected to Baselinker through a plugin or an API, so changing your store isn't a condition of integrating."),
      },
    ],
  },
  {
    id: "organizations",
    slug: "schools-nonprofits-osp",
    illustration: "websites",
    quoteService: "business",
    services: ["websites", "maintenance", "audit"],
    posts: ["co-musi-zawierac-strona-firmowa", "wordpress-czy-strona-dedykowana", "ile-kosztuje-strona-internetowa"],
    title: l("Szkoły, fundacje, stowarzyszenia i jednostki OSP", "Schools, foundations, associations and volunteer fire brigades"),
    h1: l("Strony dla szkół, fundacji, stowarzyszeń i jednostek OSP", "Websites for schools, foundations, associations and volunteer fire brigades"),
    lead: l(
      "Ograniczony budżet, treści dodawane przez wolontariuszy i potrzeba, żeby strona po prostu działała latami. Buduję proste, szybkie i tanie w utrzymaniu strony dla organizacji. Sam jestem strażakiem, więc znam potrzeby jednostek OSP.",
      "A limited budget, content added by volunteers and the need for a site that simply works for years. I build simple, fast and cheap-to-run websites for organisations. I'm a firefighter myself, so I know what volunteer fire brigades need."
    ),
    metaTitle: l("Strona internetowa dla szkoły, fundacji, stowarzyszenia lub OSP", "Website for a school, foundation, association or volunteer fire brigade"),
    metaDescription: l(
      "Prosta, szybka strona od 400 zł z łatwą edycją aktualności, galerią i wydarzeniami. Dla szkół, fundacji, stowarzyszeń i jednostek OSP. Darmowa wycena online.",
      "A simple, fast website from 400 PLN with easy news editing, a gallery and events. For schools, foundations, associations and volunteer fire brigades. Free online quote."
    ),
    pains: lists(
      [
        "Przestarzała strona, której nikt nie potrafi zaktualizować",
        "Informacje dodawane przez wolontariuszy i nauczycieli, którzy nie są informatykami",
        "Mały budżet i obawa przed kosztami utrzymania",
        "Wymogi dostępności, RODO i czytelność na telefonach",
      ],
      [
        "An outdated site nobody knows how to update",
        "Information added by volunteers and teachers who aren't IT people",
        "A small budget and fear of upkeep costs",
        "Accessibility and GDPR requirements and readability on phones",
      ]
    ),
    build: lists(
      [
        "Prostą, szybką stronę z czytelną strukturą i danymi kontaktowymi",
        "Aktualności, galerię i kalendarz wydarzeń, które łatwo edytować",
        "Formularze (kontakt, zgłoszenia, deklaracje) i wygodny odbiór wiadomości",
        "Dostępność i zgodność z RODO",
        "Niski koszt utrzymania i opiekę po wdrożeniu",
        "Przeniesienie treści ze starej strony",
      ],
      [
        "A simple, fast site with a clear structure and contact details",
        "News, a gallery and an events calendar that are easy to edit",
        "Forms (contact, applications, declarations) and convenient message handling",
        "Accessibility and GDPR compliance",
        "Low running costs and post-launch care",
        "Moving content over from the old site",
      ]
    ),
    proof: {
      text: l(
        "Realizowałem strony dla szkoły podstawowej i fundacji. Dla własnej jednostki OSP napisałem też narzędzie, które cyklicznie sprawdza strony i wychwytuje nowe szkolenia pożarnicze.",
        "I have built websites for a primary school and a foundation. For my own volunteer fire brigade I also wrote a tool that periodically checks pages and catches new fire-training courses."
      ),
      links: [
        { url: "http://spstasin.com.pl/", title: "spstasin.com.pl" },
        { url: "https://fundacja.civitaschristiana.pl/", title: "fundacja.civitaschristiana.pl" },
        { url: "https://github.com/maksymilian-org/website-checker", title: "website-checker (GitHub)" },
      ],
    },
    price: l(
      "Prosta strona zaczyna się od ok. 400 zł, a strona z kilkoma podstronami od ok. 600 zł. Panel do edycji treści i rozbudowane funkcje podnoszą cenę. Kalkulator online pokaże widełki.",
      "A simple site starts at about 400 PLN and a multi-page site at about 600 PLN. A content-editing panel and richer features raise the price. The online calculator shows a range."
    ),
    faq: [
      {
        q: l("Ile kosztuje strona dla fundacji, szkoły lub OSP?", "How much does a website for a foundation, school or volunteer fire brigade cost?"),
        a: l("Prosta strona z aktualnościami i kontaktem zaczyna się od ok. 400 zł, a rozbudowana, z kilkoma podstronami, galerią i kalendarzem, od ok. 600 zł. Dla organizacji staram się utrzymać koszty możliwie niskie, także po wdrożeniu.", "A simple site with news and contact details starts at about 400 PLN, and a fuller one with several pages, a gallery and a calendar at about 600 PLN. For organisations I keep costs as low as possible, also after launch."),
      },
      {
        q: l("Czy wolontariusze będą mogli sami dodawać aktualności?", "Will volunteers be able to add news themselves?"),
        a: l("Tak. Strona może mieć prosty panel lub mechanizm edycji, tak aby aktualności, zdjęcia i wydarzenia dodawały osoby bez wiedzy technicznej.", "Yes. The site can have a simple panel or editing mechanism so that people without technical knowledge can add news, photos and events."),
      },
      {
        q: l("Czy strona musi spełniać wymogi dostępności?", "Does the site have to meet accessibility requirements?"),
        a: l("Dla podmiotów publicznych tak, a dla pozostałych jest to dobra praktyka, która poprawia też czytelność i SEO. Buduję strony z czytelnym kontrastem, strukturą nagłówków i obsługą klawiatury.", "For public bodies yes, and for others it's good practice that also improves readability and SEO. I build sites with clear contrast, a heading structure and keyboard support."),
      },
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

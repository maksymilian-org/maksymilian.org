// Real Google reviews for Maksymilian.org. Original Polish text plus an English
// translation, shown according to the page locale. Source: Google Business
// profile.
export interface Review {
  author: string;
  rating: number; // 1–5
  text: { pl: string; en: string };
  date?: string; // ISO, optional
}

export interface ReviewsSummary {
  rating: number; // average, e.g. 5
  count: number; // total number of reviews
}

// Average + total shown in the rating badge and emitted as AggregateRating
// JSON-LD. Update if the numbers on Google change.
export const reviewsSummary: ReviewsSummary = {
  rating: 5,
  count: 10,
};

export const reviews: Review[] = [
  {
    author: "Normalna Kultura",
    rating: 5,
    text: {
      pl: "Młody, profesjonalny a jednocześnie zaangażowany w to co robi wykonawca. Błyskawiczna realizacja konkretnych zadań i pomoc w awaryjnych sytuacjach. Dyspozycyjność i współpraca z klientem na wysokim poziomie. Szczerze polecamy tym, którzy liczą czas, pieniądze, a nie chcą rezygnować z jakości.",
      en: "A young, professional and genuinely committed contractor. Lightning-fast delivery of specific tasks and help in emergency situations. Availability and client cooperation at a high level. We sincerely recommend him to anyone who values their time and money but doesn't want to compromise on quality.",
    },
  },
  {
    author: "Dominik Rogowski",
    rating: 5,
    text: {
      pl: "Serdecznie polecam! Zaufałem Panu Maksymilianowi i się nie zawiodłem. Miałem zupełnie inny pomysł, ale po przedstawieniu projektu strony przez fachowca całkowicie mu zaufałem. Po mojej akceptacji strona była gotowa w umówionym czasie (zaledwie kilka dni). Szybko, mądrze i fachowo.",
      en: "Highly recommended! I trusted Maksymilian and wasn't disappointed. I had a completely different idea, but once this professional presented the website design, I trusted him fully. After my approval the site was ready on time — in just a few days. Fast, smart and professional.",
    },
  },
  {
    author: "Kacper Sakowicz",
    rating: 5,
    text: {
      pl: "Duże wyczucie estetyczne, co przekłada się na dobre projekty, świetny kontakt i podejście do klienta, sprawna realizacja zleceń. Polecam wszystkim!",
      en: "A great sense of aesthetics that translates into good designs, excellent contact and client approach, and smooth delivery of projects. I recommend him to everyone!",
    },
  },
  {
    author: "Patrycja Widomska-Bajda",
    rating: 5,
    text: {
      pl: "Współpraca z Maksymilianem to niesamowita przyjemność, pełen profesjonalizm. Ma dużo pomysłów, spełnia każde wybrane kryteria, co przekłada się na owocne i efektywne cele. Jakość wykonania jest na bardzo wysokim poziomie, a podejście do klienta rewelacyjne. Z przyjemnością polecam usługi Maksymiliana i dziękuję za stworzenie mojej strony internetowej!",
      en: "Working with Maksymilian is an incredible pleasure — full professionalism. He has plenty of ideas and meets every chosen requirement, which leads to fruitful and effective results. The quality of work is very high and the client approach is superb. I'm happy to recommend Maksymilian's services and thank him for creating my website!",
    },
  },
  {
    author: "Piotr Kurpiewski",
    rating: 5,
    text: {
      pl: "Pan Maksymilian to świetny profesjonalista. Wykonaliśmy wspólnie kilka projektów i za każdym razem współpraca przebiegała wzorowo. Gorąco polecam!",
      en: "Mr Maksymilian is a great professional. We've completed several projects together and every time the cooperation went perfectly. Highly recommended!",
    },
  },
  {
    author: "Lotnictwo i Ludzie",
    rating: 5,
    text: {
      pl: "Profesjonalna i rzetelna firma. Świetny i szybki kontakt z klientem. Pełna otwartość na pomysły klienta, uzupełniona o inwencję twórczą oraz profesjonalizm wykonawcy. Serdecznie polecam!",
      en: "A professional and reliable company. Excellent and fast contact with the client. Full openness to the client's ideas, complemented by creativity and the contractor's professionalism. Sincerely recommended!",
    },
  },
  {
    author: "Vacansoleil Polska",
    rating: 5,
    text: {
      pl: "Bardzo udana i owocna współpraca. Mnóstwo pomysłów, konkretne propozycje i profesjonalne podejście do klienta — tego oczekiwaliśmy i to dostaliśmy. Wszystko zrobione na czas. Polecamy!",
      en: "A very successful and fruitful collaboration. Plenty of ideas, concrete proposals and a professional client approach — that's what we expected and what we got. Everything done on time. We recommend!",
    },
  },
];

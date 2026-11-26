/*
  OCH i ACH — dane strony / site data
  ------------------------------------
  Edytuj TYLKO ten plik, żeby zmienić menu, ceny, promocje, program i dane kontaktowe.
  Edit ONLY this file to change the menu, prices, deals, schedule and contact info.

  UWAGA: ceny i promocje poniżej to PRZYKŁADY — sprawdź i popraw przed publikacją.
  NOTE: prices and deals below are EXAMPLES — verify before going live.
*/

window.SITE = {
  // GOOGLE SHEETS: program wieczorów, zniżki i menu z arkusza Google.
  // Wklej tu ID arkusza (część linku między /d/ a /edit). Arkusz: Udostępnij → „Każda osoba mająca link” → Przeglądający.
  sheet: { id: "" },

  bar: {
    name: "Och i Ach",
    tagline: { pl: "Nie daj się prosić.", en: "Don't make us ask twice." },
    intro: {
      pl: "Karaoke, shoty, piwo i koktajle w piwnicy na Chmielnej. Mikrofon czeka, ekipa też.",
      en: "Karaoke, shots, beer and cocktails in a cellar on Chmielna. The mic is waiting, so is the crew."
    },
    address: "ul. Chmielna 5, 00-021 Warszawa",
    // Rezerwacje ze strony idą mailem przez Web3Forms (publiczny klucz formularza). Pusto = tylko WhatsApp.
    // Adres odbiorcy ustawia się w panelu Web3Forms (app.web3forms.com).
    web3formsKey: "26048607-a3a1-4ec8-b790-5128b4576137",
    district: "Śródmieście",
    phone: "+48 790 627 246",
    whatsapp: "48790627246",
    facebook: "https://www.facebook.com/ochach.pub", // z kodu QR na karcie
    instagram: "https://www.instagram.com/ochach.pub", // z kodu QR na karcie
    mapsLink: "https://maps.app.goo.gl/u3Kb7xyHDXAN5cHM7",
    mapsEmbed: "https://www.google.com/maps?q=52.2327728,21.0186538&z=17&output=embed",
    hours: [
      { days: { pl: "Ndz – Czw", en: "Sun – Thu" }, time: "17:00 – 02:00" },
      { days: { pl: "Pt – Sob", en: "Fri – Sat" }, time: "17:00 – 04:00" }
    ]
  },

  deals: [
    {
      tag: "-20%",
      title: { pl: "Zniżka studencka na koktajle", en: "Student cocktail discount" },
      text: {
        pl: "Na wszystkie koktajle od poniedziałku do czwartku. Wystarczy legitymacja.",
        en: "Off all cocktails, Monday to Thursday. Just show your student ID."
      },
      when: { pl: "Pon–Czw, cały wieczór", en: "Mon–Thu, all night" }
    },
    {
      tag: { pl: "Piwo 10 zł", en: "Beer 10 zł" },
      title: { pl: "Happy hour", en: "Happy hour" },
      text: {
        pl: "Piwo za 10 zł codziennie od 17:00 do 20:00. W niedziele i poniedziałki przez cały dzień.",
        en: "Beer for 10 zł every day from 5 to 8 pm. On Sundays and Mondays all day long."
      },
      when: { pl: "Codziennie 17:00–20:00 · ndz i pon cały dzień", en: "Daily 5–8 pm · Sun & Mon all day" }
    },
    {
      tag: "6+",
      title: { pl: "Ekipa na karaoke", en: "Karaoke crew" },
      text: {
        pl: "Przychodzicie w 6 lub więcej osób? Zarezerwowany stolik i kamikadze: 6 shotów za 24 zł.",
        en: "Coming as 6 or more? A reserved table and kamikaze: 6 shots for 24 zł."
      },
      when: { pl: "Z rezerwacją", en: "With a booking" }
    },
    {
      tag: "B-DAY",
      title: { pl: "Urodziny", en: "Birthday" },
      text: {
        pl: "Solenizant dostaje shota na start i pierwszą piosenkę bez kolejki.",
        en: "The birthday person gets a welcome shot and skips the song queue once."
      },
      when: { pl: "Z dowodem, w dniu urodzin", en: "With ID, on the day" }
    }
  ],
  dealsNote: {
    pl: "Zniżki studenckie tylko z ważną legitymacją (polska, ISIC lub Erasmus). Promocje się nie łączą.",
    en: "Student deals need a valid student card (Polish, ISIC or Erasmus). Deals can't be combined."
  },

  // MENU — przepisane z karty baru (2 strony), ceny w zł.
  // Zakładki (tabs) -> kategorie -> pozycje. Pozycja: { name, price } albo { name, sizes: [cena30, cena50] }.
  menu: [
    { id: "shoty", label: { pl: "Shoty", en: "Shots" }, cats: [
      { title: { pl: "Białe", en: "Clear" }, sizes: ["30 ml", "50 ml"], items: [
        { name: "Czysta", sizes: [6, 10] }, { name: "Czysta lepsza", sizes: [10, 14] },
        { name: "Sambuca palona", sizes: [null, 18] }, { name: "Absynt palony", sizes: [null, 18] } ] },
      { title: { pl: "Kolorowe", en: "Coloured" }, sizes: ["30 ml", "50 ml"], items: [
        { name: "Vanilla Sky", sizes: [6, 10] }, { name: "Malinowy bzyk", sizes: [6, 10] }, { name: "Herbatka", sizes: [6, 10] },
        { name: "Szarlotka", sizes: [6, 10] }, { name: "Kwaśna wiśnia", sizes: [6, 10] },
        { name: { pl: "Kamikadze (4× shot)", en: "Kamikaze (4× shot)" }, price: 24 },
        { name: { pl: "Kamikadze autorskie (4× shot)", en: "House kamikaze (4× shot)" }, price: 29 } ] },
      { title: { pl: "Warstwowe", en: "Layered" }, sizes: ["50 ml"], items: [
        { name: "Ognista truskawka", price: 13 }, { name: "Baby Guinness", price: 13 }, { name: "Wściekły pies", price: 13 },
        { name: "Monte", price: 13 }, { name: "Oreo", price: 13 }, { name: "Golf", price: 13 } ] },
      { title: { pl: "Nalewka domowa", en: "House nalewka" }, note: { pl: "Na przecierach owocowych, zapytaj o dostępne smaki.", en: "Made with fruit purée, ask for today's flavours." }, highlight: true, items: [
        { name: "50 ml", price: 13 } ] }
    ] },
    { id: "piwa", label: { pl: "Piwa", en: "Beer" }, cats: [
      { title: { pl: "Z beczki", en: "On tap" }, items: [
        { name: "Żywiec Pils", price: 15 }, { name: "Żywiec Biały", price: 17 } ] },
      { title: { pl: "Z butelki", en: "Bottled" }, items: [
        { name: "Żywiec IPA", price: 19 }, { name: "Żywiec APA", price: 19 }, { name: "Żywiec Porter", price: 19 },
        { name: { pl: "Żywiec 0% smakowy", en: "Żywiec 0% flavoured" }, price: 19 }, { name: "Heineken", price: 19 },
        { name: "Heineken 0%", price: 19 }, { name: "Desperados", price: 20 }, { name: { pl: "Cydr", en: "Cider" }, price: 18 } ] }
    ] },
    { id: "koktajle", label: { pl: "Koktajle", en: "Cocktails" }, cats: [
      { title: { pl: "Koktajle", en: "Cocktails" }, items: [
        { name: { pl: "Autorski", en: "House signature" }, price: 39 }, { name: "Śmierć na Chmielnej", price: 45, desc: { pl: "wódka, gin, biały rum, tequila, triple sec, sok z cytryny, prosecco, grenadyna", en: "vodka, gin, white rum, tequila, triple sec, lemon juice, prosecco, grenadine" } },
        { name: "Long Island Iced Tea", price: 40, desc: { pl: "wódka, gin, biały rum, tequila, triple sec, sok z cytryny, cola", en: "vodka, gin, white rum, tequila, triple sec, lemon juice, cola" } }, { name: "Negroni", price: 35, desc: { pl: "gin, Campari, czerwony wermut", en: "gin, Campari, red vermouth" } }, { name: "Margarita", price: 35, desc: { pl: "tequila, triple sec, sok z limonki", en: "tequila, triple sec, lime juice" } },
        { name: { pl: "Margarita truskawkowa", en: "Strawberry Margarita" }, price: 35, desc: { pl: "tequila, triple sec, sok z limonki, truskawki", en: "tequila, triple sec, lime juice, strawberries" } }, { name: "Cosmopolitan", price: 33, desc: { pl: "wódka, triple sec, sok żurawinowy, sok z limonki", en: "vodka, triple sec, cranberry juice, lime juice" } },
        { name: "Porn Star Martini", price: 33, desc: { pl: "wódka waniliowa, likier z marakui, puree z marakui, sok z limonki, prosecco", en: "vanilla vodka, passion fruit liqueur, passion fruit purée, lime juice, prosecco" } }, { name: "Berry Smash", price: 33, desc: { pl: "gin, sour, puree truskawkowe, syrop truskawkowy", en: "gin, sour mix, strawberry purée, strawberry syrup" } }, { name: "Sex on the Beach", price: 33, desc: { pl: "wódka, likier brzoskwiniowy, sok pomarańczowy, sok żurawinowy", en: "vodka, peach liqueur, orange juice, cranberry juice" } },
        { name: "Pina Colada", price: 33, desc: { pl: "biały rum, mleczko kokosowe, sok ananasowy", en: "white rum, coconut cream, pineapple juice" } }, { name: "Old Fashioned", price: 29, desc: { pl: "bourbon, cukier, angostura, skórka pomarańczy", en: "bourbon, sugar, Angostura bitters, orange peel" } }, { name: "Aperol Spritz", price: 29, desc: { pl: "Aperol, prosecco, woda gazowana", en: "Aperol, prosecco, soda water" } },
        { name: "Mojito", price: 29, desc: { pl: "biały rum, limonka, mięta, cukier trzcinowy, woda gazowana", en: "white rum, lime, mint, cane sugar, soda water" } }, { name: "Tequila Sunrise", price: 29, desc: { pl: "tequila, sok pomarańczowy, grenadyna", en: "tequila, orange juice, grenadine" } }, { name: "Whisky Sour", price: 27, desc: { pl: "whisky, sok z cytryny, syrop cukrowy", en: "whisky, lemon juice, sugar syrup" } },
        { name: { pl: "Wódka Sour", en: "Vodka Sour" }, price: 26, desc: { pl: "wódka, sok z cytryny, syrop cukrowy", en: "vodka, lemon juice, sugar syrup" } }, { name: "Cuba Libre", price: 27, desc: { pl: "rum, cola, limonka", en: "rum, cola, lime" } } ] }
    ] },
    { id: "mocne", label: { pl: "Tequila · whisky · rum", en: "Tequila · whisky · rum" }, cats: [
      { title: { pl: "Tequila", en: "Tequila" }, items: [ { name: "Silver", price: 20 }, { name: "Gold", price: 20 } ] },
      { title: { pl: "Whisky", en: "Whisky" }, items: [
        { name: "Grant's", price: 16 }, { name: "Jim Beam", price: 20 }, { name: "Tullamore Dew", price: 22 },
        { name: "Ballantines", price: 20 }, { name: "Jack Daniel's", price: 24 }, { name: "Maker's Mark", price: 33 } ] },
      { title: { pl: "Rum", en: "Rum" }, items: [ { name: "Bacardi Blanca", price: 18 }, { name: "Bacardi Negra", price: 18 } ] },
      { title: { pl: "Likiery", en: "Liqueurs" }, items: [ { name: { pl: "Różne 40 ml", en: "Various 40 ml" }, price: 20 } ] }
    ] },
    { id: "aperitivo", label: { pl: "Aperitivo i wino", en: "Aperitivo & wine" }, cats: [
      { title: { pl: "Aperitivo", en: "Aperitivo" }, items: [
        { name: "Campari", price: 20 }, { name: "Aperol", price: 20 }, { name: "Martini", price: 19 },
        { name: { pl: "Wino czerwone", en: "Red wine" }, price: 16 }, { name: { pl: "Wino białe", en: "White wine" }, price: 16 },
        { name: "Prosecco", price: 16 }, { name: "Prosecco 0%", price: 16 } ] }
    ] },
    { id: "inne", label: { pl: "Przekąski i softy", en: "Snacks & soft drinks" }, cats: [
      { title: { pl: "Przekąski", en: "Snacks" }, items: [
        { name: { pl: "Nachos z sosem", en: "Nachos with dip" }, price: 20 }, { name: "Pringles", price: 18 },
        { name: { pl: "Paluszki", en: "Pretzel sticks" }, price: 10 }, { name: { pl: "Orzeszki", en: "Peanuts" }, price: 10 } ] },
      { title: { pl: "Softy", en: "Soft drinks" }, items: [
        { name: { pl: "Woda niegazowana", en: "Still water" }, price: 10 }, { name: { pl: "Woda gazowana", en: "Sparkling water" }, price: 10 },
        { name: "Coca-Cola", price: 10 }, { name: "Coca-Cola Zero", price: 10 }, { name: "Sprite", price: 10 },
        { name: "Kinley", price: 10 }, { name: { pl: "Soki owocowe", en: "Fruit juices" }, price: 10 }, { name: "Red Bull", price: 17 } ] }
    ] }
  ],
  // Zdjęcia karty (pokazywane pod menu)
  menuPages: ["img/menu-2.jpg", "img/menu-1.jpg"],

  // ZDJĘCIA Z WIECZORÓW — gdzie zapisywać pliki od gości.
  // Bez konfiguracji formularz działa w trybie podglądu (pliki widzi tylko osoba, która je dodała).
  // Cloudinary: utwórz darmowe konto, „unsigned upload preset” z moderacją ręczną
  // i włącz „Resource list” w ustawieniach bezpieczeństwa. Potem wpisz dane poniżej.
  uploads: {
    cloudName: "",      // np. "ochiach"
    uploadPreset: "",   // np. "goscie_unsigned"
    maxFiles: 10,
    maxVideoMB: 50,
    nightsBack: 8       // ile ostatnich wieczorów karaoke pokazać
  },
  // Przykładowe zdjęcia do galerii wieczorów (można usunąć). Klucz = data wieczoru RRRR-MM-DD.
  nightSamples: {},

  // OPINIE — wklej tutaj prawdziwe opinie z Google Maps (tekst, autor, liczba gwiazdek, źródło).
  // Nie wymyślaj opinii. Poniżej jedyna opinia znaleziona publicznie (Tripadvisor, 2024).
  // Wydarzenia. Dla wydarzeń co 2 tygodnie wpisz "first" (data dowolnego terminu, RRRR-MM-DD),
  // wtedy strona sama policzy najbliższe daty. Puste pola po prostu się nie pokazują.
  events: [
    {
      id: "meetzone",
      name: "Meet Zone",
      every: 14,              // co ile dni
      first: "",              // np. "2026-11-20" — DO UZUPEŁNIENIA
      time: "",               // np. "19:00" — DO UZUPEŁNIENIA
      instagram: "https://www.instagram.com/meetzone.pl/",
      site: "https://meetzone.pl/warszawa/",
      tag: { pl: "Co 2 tygodnie", en: "Every 2 weeks" },
      text: { pl: "Spotkanie Meet Zone w naszej piwnicy. Nowi ludzie, rozmowy, shoty i mikrofon dla odważnych. Najbliższy termin i szczegóły na ich Instagramie.",
              en: "Meet Zone in our cellar. New people, good talks, shots and a mic for the brave. Next date and details on their Instagram." }
    },
    {
      id: "karaoke",
      name: "Karaoke",
      weekly: [4, 5, 6],      // czw, pt, sob
      time: "21:00",
      tag: { pl: "Co tydzień", en: "Every week" },
      text: { pl: "Od czwartku do soboty od 21:00. Zapisz się na piosenkę u DJ-a.",
              en: "Thursday to Saturday from 9 pm. Sign up for a song with the DJ." }
    }
  ],
  // PIOSENKI — przykładowe utwory z katalogu iSing (ising.pl/piosenki). Pełną listę możesz prowadzić w arkuszu Google (zakładka „Piosenki”).
  // lang: "pl" = polskie, "int" = zagraniczne
  songsCatalog: "https://ising.pl/piosenki",
  songs: [
    { title: "Zawsze tam gdzie ty", artist: "Lady Pank", lang: "pl" },
    { title: "Kryzysowa narzeczona", artist: "Lady Pank", lang: "pl" },
    { title: "Długość dźwięku samotności", artist: "Myslovitz", lang: "pl" },
    { title: "Nic dwa razy", artist: "Sanah", lang: "pl" },
    { title: "Cicho sza", artist: "Sanah", lang: "pl" },
    { title: "Mamo tyś płakała", artist: "sanah i Igor Herbut", lang: "pl" },
    { title: "Nareszcie", artist: "Męskie Granie Orkiestra", lang: "pl" },
    { title: "tylko kochaj mnie", artist: "Zalia", lang: "pl" },
    { title: "Pół kroku stąd", artist: "Natalia Nykiel", lang: "pl" },
    { title: "Rozkwitały pąki białych róż", artist: "Pieśń patriotyczna", lang: "pl" },
    { title: "Smoke on the Water", artist: "Deep Purple", lang: "int" },
    { title: "Enter Sandman", artist: "Metallica", lang: "int" },
    { title: "Have You Ever Seen the Rain", artist: "Rod Stewart", lang: "int" },
    { title: "Wake Me Up When September Ends", artist: "Green Day", lang: "int" },
    { title: "Tequila", artist: "The Champs", lang: "int" },
    { title: "Paint It, Black", artist: "The Rolling Stones", lang: "int" },
    { title: "Complicated", artist: "Avril Lavigne", lang: "int" },
    { title: "Enjoy the Silence", artist: "Depeche Mode", lang: "int" },
    { title: "Beauty and a Beat", artist: "Justin Bieber ft. Nicki Minaj", lang: "int" },
    { title: "Dracula", artist: "Tame Impala", lang: "int" }
  ],

  reviews: [
    { stars: 5, author: "Patryk Woźny", source: "Google", date: { pl: "2025", en: "2025" }, lang: "pl",
      text: "Bardzo fajny bar, w świetnej, chociaż nieco ukrytej lokalizacji i z szerokim wyborem shotów. Ciekawy wystrój lokalu, a barman bardzo miły i kontaktowy. Chętnie dostosowywał swoje propozycje do aktualnych potrzeb klientów. Ceny także znacznie niższe niż w barach na sąsiadującej ulicy - Nowym Świecie, zatem zdecydowanie polecam i zapewne kiedyś skorzystamy ponownie." },
    { stars: null, author: "Louise. edh", source: "Google", date: { pl: "2026", en: "2026" }, lang: "en",
      text: "My friends and I visited on our night out. Inside the decoration was really interesting. Sure made us laugh. The beer and cocktails were fairly priced and tasted good. We really enjoyed the karaoke night, where the atmosphere was relaxed and friendly. The service personnel was helpful and forthcoming. If you are staying in Warsaw, I can totally recommend checking out this bar!" },
    { stars: 5, author: "finn bohne", source: "Google", date: { pl: "2026", en: "2026" }, lang: "pl",
      text: "Gorąco polecam! Wnętrze jest naprawdę piękne, zwłaszcza czarownica i róże na suficie. Drinki były dostępne przez długi czas i w rozsądnej cenie. W czwartki i piątki zdecydowanie jest karaoke, gdzie grają najróżniejsze utwory. Cała obsługa jest bardzo miła!" },
    { stars: 5, title: "Wild night in Warsaw", text: "A true extraordinary experience!", author: "Gość z Tripadvisor", source: "Tripadvisor", date: { pl: "czerwiec 2024", en: "June 2024" }, lang: "en" }
    // { stars: 5, title: "", text: "...", author: "Imię", source: "Google", date: { pl: "...", en: "..." } },
  ],

  // Program tygodnia / weekly schedule
  karaokeStart: "21:00",
  nights: [
    { day: { pl: "Czwartek", en: "Thursday" }, title: { pl: "Karaoke od 21:00", en: "Karaoke from 9 pm" }, text: { pl: "Rozgrzewka przed weekendem. Zapisy na piosenki u DJ-a.", en: "Warm-up for the weekend. Sign up for songs with the DJ." } },
    { day: { pl: "Piątek", en: "Friday" }, title: { pl: "Karaoke od 21:00", en: "Karaoke from 9 pm" }, text: { pl: "Pełna piwnica i śpiewanie do 4 rano.", en: "A full cellar and singing until 4 am." } },
    { day: { pl: "Sobota", en: "Saturday" }, title: { pl: "Karaoke od 21:00", en: "Karaoke from 9 pm" }, text: { pl: "Najgłośniejszy wieczór tygodnia. Lepiej zarezerwuj stolik.", en: "The loudest night of the week. Book a table." } }
  ],

  // Galeria: wstaw własne zdjęcia (np. "img/piwnica.jpg"). Pusty src = kolorowy placeholder.
  gallery: [
    { src: "img/bar.jpg", label: { pl: "Piwnica", en: "The cellar" } },
    { src: "", label: { pl: "Bar", en: "The bar" } },
    { src: "", label: { pl: "Mikrofon", en: "The mic" } },
    { src: "", label: { pl: "Patio", en: "The patio" } },
    { src: "", label: { pl: "Ekipa", en: "The crew" } }
  ]
};

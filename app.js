(function () {
  var S = window.SITE;
  var lang = "pl";
  var saved = null;
  try { saved = localStorage.getItem("ochiach-lang"); } catch (e) {}
  lang = saved || ((navigator.language || "pl").slice(0, 2) === "pl" ? "pl" : "en");
  if (lang !== "pl" && lang !== "en") lang = "pl";

  // English strings for static text. Polish comes from the HTML itself.
  var EN = {
    "nav.deals": "Deals", "nav.menu": "Menu", "nav.karaoke": "Karaoke", "nav.book": "Book", "nav.contact": "Contact", "nav.reviews": "Reviews",
    "hero.onair": "Karaoke Thu–Sat from 9 pm", "hero.today": "Open today", "hero.shots": "Shots from 6 zł",
    "cta.book": "Book a table", "cta.menu": "See the menu", "cta.menuShort": "Menu", "cta.bookShort": "Book",
    "k.eyebrow": "The mic is waiting", "k.title": "Karaoke Thursday to Saturday", "k.lead": "Every night from 9 pm. Sign up for a song with the DJ and wait for your turn.",
    "k.bubble": "9 pm, let's sing!",
    "st.1": "Sign up", "st.1t": "Give your name to the DJ.", "st.2": "Pick a song", "st.2t": "Polish hits, classics, whatever you like.",
    "st.3": "Grab the mic", "st.3t": "Lyrics on the screen, the whole cellar sings along.",
    "deals.eyebrow": "For students", "deals.title": "Student deals", "deals.lead": "Student budget, full night out. Show your student card when you order.",
    "menu.eyebrow": "At the bar", "menu.lead": "Prices in złoty, straight from our menu card. With a student card cocktails are 20% off.", "menu.card": "Our menu card",
    "r.eyebrow": "A table for the crew", "r.title": "Book a table", "r.lead": "Fill in the form and your booking comes straight to us. We'll confirm by text or phone.",
    "r.p1": "Book early for weekend karaoke.", "r.p2": "We hold your table for 20 minutes.", "r.p3": "Same-day booking? Calling is fastest.",
    "f.name": "Name", "f.phone": "Phone", "f.date": "Date", "f.time": "Time", "f.people": "Guests", "f.student": "Students?",
    "f.yes": "Yes", "f.no": "No", "f.note": "Notes (optional)", "f.noteph": "E.g. birthday, we want to sing first", "f.submit": "Send booking",
    "ok.title": "Almost done!", "ok.wa": "Send on WhatsApp",
    "g.eyebrow": "The vibe", "g.title": "Gallery",
    "c.eyebrow": "Find us", "c.title": "Getting here", "c.addr": "Address", "c.hours": "Hours", "c.phone": "Phone", "c.social": "Social media", "c.maps": "Open in Google Maps",
    "nav.nights": "Photos", "n.eyebrow": "Photos and videos from guests", "n.title": "Your nights", "n.lead": "Pick a night to see karaoke photos and videos, or add your own.",
    "u.open": "Add your photos or videos", "u.title": "Add photos or videos", "u.lead": "Up to 10 files at once, videos up to 50 MB. They show up after a quick check by our staff.", "u.drop": "Drop files here or click", "u.types": "JPG, PNG, HEIC, MP4, MOV",
    "u.night": "Which night?", "u.name": "Your name or handle (optional)", "u.consent": "People visible in these photos agreed to have them posted.", "u.submit": "Send",
    "nav.events": "Events", "ev.eyebrow": "What's on in the cellar", "ev.title": "Events", "ev.lead": "Regular nights and guests who keep coming back.",
    "ev.hostT": "Want to host an event here?", "ev.hostP": "Birthdays, group meetups, a uni night. Message us and we'll sort the details.", "ev.hostB": "Message on WhatsApp",
    "so.eyebrow": "Karaoke Thu–Sat from 9 pm", "so.title": "What will you sing?", "so.lead": "We sing from the iSing catalogue. Here are our picks, and the full catalogue has thousands of songs. Ask the DJ for yours.",
    "so.search": "Search: title or artist", "so.catT": "Can't find your song?", "so.catP": "Check the full iSing catalogue, then ask the DJ.", "so.catB": "Full iSing catalogue ↗", "k.songs": "Song list",
    "rv.eyebrow": "What guests say", "rv.title": "Reviews", "rv.lead": "Been here? Leave a review on Google Maps, we read every one.", "rv.more": "Reviews on Google Maps"
  };
  var MSG = {
    pl: {
      name: "Wpisz imię.", phone: "Wpisz numer telefonu (min. 9 cyfr).", date: "Wybierz dzisiejszą lub późniejszą datę.", people: "Od 1 do 30 osób.",
      ok: function (d) { return "Rezerwacja dla " + d.people + " os. na " + d.dateTxt + ", godz. " + d.time + ". Wyślij ją na WhatsApp, a potwierdzimy stolik. Do zobaczenia przy mikrofonie, " + d.name + "!"; },
      wa: function (d) { return "Cześć! Rezerwacja w Och i Ach:\nImię: " + d.name + "\nTelefon: " + d.phone + "\nData: " + d.dateTxt + "\nGodzina: " + d.time + "\nLiczba osób: " + d.people + "\nStudenci: " + (d.student ? "tak" : "nie") + (d.note ? "\nUwagi: " + d.note : ""); },
      sendingRes: "Wysyłanie…", sentTitle: "Rezerwacja wysłana!",
      sentRes: function (d) { return "Dzięki, " + d.name + "! Rezerwacja dla " + d.people + " os. na " + d.dateTxt + ", godz. " + d.time + " trafiła do baru. Potwierdzimy ją SMS-em lub telefonicznie."; },
      failRes: "Nie udało się wysłać formularza. Wyślij rezerwację na WhatsApp albo zadzwoń.",
      copy: "Kopiuj", copied: "Skopiowano", footer: "Karaoke bar · Chmielna, Warszawa", page: "Strona karty", open: "otwórz w pełnym rozmiarze",
      days: ["ndz", "pon", "wt", "śr", "czw", "pt", "sob"], tonight: "dziś",
      empty: "Nikt jeszcze nie dodał zdjęć z tego wieczoru.", beFirst: "Dodaj pierwsze",
      noFiles: "Wybierz co najmniej jedno zdjęcie lub film.", noConsent: "Potwierdź zgodę osób na zdjęciach.",
      tooMany: function (n) { return "Maksymalnie " + n + " plików naraz."; }, tooBig: function (f, mb) { return f + ": film większy niż " + mb + " MB."; },
      sending: "Wysyłanie…", sent: "Dziękujemy! Pliki pojawią się w galerii po akceptacji.", failed: "Nie udało się wysłać. Spróbuj ponownie albo wyślij nam je na Facebooku.",
      demo: "Tryb podglądu: pliki są widoczne tylko na tym urządzeniu, dopóki strona nie zostanie podłączona do serwera zdjęć.", by: "od",
      evNext: "Najbliżej", evIg: "Instagram", evSite: "Strona i zapisy", evAsk: "Termin na Instagramie", evLineup: "Kto i kiedy", evSongs: "Lista piosenek", soAll: "Wszystkie", soPl: "Polskie", soInt: "Zagraniczne", soNone: "Brak na naszej liście. Sprawdź pełny katalog iSing poniżej.", evMore: "Program", evMoreTag: "Wkrótce", evHost: "Cześć! Chcemy zrobić wydarzenie w Och i Ach.",
      ticker: ["Karaoke czw–sob od 21:00", "Nie daj się prosić", "Shoty od 6 zł", "Weź mikrofon", "Piwnica na Chmielnej", "-20% na koktajle z legitymacją", "Meet Zone co 2 tygodnie"]
    },
    en: {
      name: "Enter your name.", phone: "Enter a phone number (at least 9 digits).", date: "Pick today or a later date.", people: "From 1 to 30 guests.",
      ok: function (d) { return "Booking for " + d.people + " on " + d.dateTxt + " at " + d.time + ". Send it on WhatsApp and we'll confirm your table. See you at the mic, " + d.name + "!"; },
      wa: function (d) { return "Hi! Booking at Och i Ach:\nName: " + d.name + "\nPhone: " + d.phone + "\nDate: " + d.dateTxt + "\nTime: " + d.time + "\nGuests: " + d.people + "\nStudents: " + (d.student ? "yes" : "no") + (d.note ? "\nNotes: " + d.note : ""); },
      sendingRes: "Sending…", sentTitle: "Booking sent!",
      sentRes: function (d) { return "Thanks, " + d.name + "! Your booking for " + d.people + " on " + d.dateTxt + " at " + d.time + " has reached the bar. We'll confirm by text or phone."; },
      failRes: "We couldn't send the form. Send your booking on WhatsApp or give us a call.",
      copy: "Copy", copied: "Copied", footer: "Karaoke bar · Chmielna, Warsaw", page: "Menu page", open: "open full size",
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], tonight: "tonight",
      empty: "Nobody has added photos from this night yet.", beFirst: "Add the first ones",
      noFiles: "Pick at least one photo or video.", noConsent: "Please confirm the people in the photos agreed.",
      tooMany: function (n) { return "Up to " + n + " files at once."; }, tooBig: function (f, mb) { return f + ": video is larger than " + mb + " MB."; },
      sending: "Sending…", sent: "Thanks! Your files will appear in the gallery once approved.", failed: "Upload failed. Try again or send them to us on Facebook.",
      demo: "Preview mode: files are visible only on this device until the site is connected to a photo server.", by: "by",
      evNext: "Next", evIg: "Instagram", evSite: "Website and sign-up", evAsk: "Date on Instagram", evLineup: "Who and when", evSongs: "Song list", soAll: "All", soPl: "Polish", soInt: "International", soNone: "Not on our list. Check the full iSing catalogue below.", evMore: "What’s on", evMoreTag: "Coming up", evHost: "Hi! We'd like to host an event at Och i Ach.",
      ticker: ["Karaoke Thu–Sat from 9 pm", "Don't make us ask twice", "Shots from 6 zł", "Grab the mic", "A cellar on Chmielna", "-20% on cocktails with student ID", "Meet Zone every 2 weeks"]
    }
  };

  // Na podstronach części elementów nie ma: wtedy zwracamy pusty element, żeby nic się nie psuło.
  var $ = function (s) { return document.querySelector(s) || document.createElement("div"); };
  var t = function (o) { return o && typeof o === "object" ? (o[lang] || o.pl) : o; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var ICON = {
    fb: '<svg class="brand-ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#1877F2"/><path fill="#fff" d="M15.1 15.5l.5-3.3h-3.2v-2.1c0-.9.4-1.8 1.9-1.8h1.4V5.5s-1.3-.2-2.6-.2c-2.6 0-4.3 1.6-4.3 4.4v2.5H6v3.3h2.8V24h3.6v-8.5h2.7z"/></svg>',
    ig: '<svg class="brand-ic" viewBox="0 0 24 24" aria-hidden="true"><defs><radialGradient id="igG" cx="30%" cy="107%" r="150%"><stop offset="0" stop-color="#fdf497"/><stop offset=".05" stop-color="#fdf497"/><stop offset=".45" stop-color="#fd5949"/><stop offset=".6" stop-color="#d6249f"/><stop offset=".9" stop-color="#285AEB"/></radialGradient></defs><rect width="24" height="24" rx="6" fill="url(#igG)"/><rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="12" cy="12" r="3.3" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="16.3" cy="7.7" r="1.05" fill="#fff"/></svg>',
    pin: '<svg class="brand-ic" viewBox="0 0 24 24" aria-hidden="true"><path fill="#EA4335" d="M12 1.5A7.5 7.5 0 0 0 4.5 9c0 5.6 7.5 13.5 7.5 13.5S19.5 14.6 19.5 9A7.5 7.5 0 0 0 12 1.5z"/><path fill="#C5221F" d="M12 22.5S4.5 14.6 4.5 9c0-1 .2-2 .6-2.9L12 22.5z" opacity=".35"/><circle cx="12" cy="9" r="2.8" fill="#fff"/></svg>'
  };

  document.querySelectorAll("[data-i18n]").forEach(function (el) { el.dataset.pl = el.textContent; });
  document.querySelectorAll("[data-i18n-ph]").forEach(function (el) { el.dataset.plPh = el.placeholder; });

  function hoursForDay(dow) { // 0=Sun..6=Sat
    var idx = (dow === 5 || dow === 6) ? 1 : 0;
    return S.bar.hours[idx];
  }
  function socials() {
    var out = "";
    if (S.bar.facebook) out += '<a class="chip" href="' + esc(S.bar.facebook) + '" target="_blank" rel="noopener">' + ICON.fb + "Facebook</a>";
    if (S.bar.instagram) out += '<a class="chip" href="' + esc(S.bar.instagram) + '" target="_blank" rel="noopener">' + ICON.ig + "Instagram</a>";
    out += '<a class="chip" href="' + esc(S.bar.mapsLink) + '" target="_blank" rel="noopener">' + ICON.pin + "Google Maps</a>";
    return out;
  }

  var activeTab = S.menu[0].id;
  function renderMenu() {
    $("#tabs").innerHTML = S.menu.map(function (c) {
      return '<button class="tab" role="tab" type="button" id="tab-' + c.id + '" data-id="' + c.id + '" aria-selected="' + (c.id === activeTab) + '" tabindex="' + (c.id === activeTab ? 0 : -1) + '">' + esc(t(c.label)) + "</button>";
    }).join("");
    var tab = S.menu.filter(function (c) { return c.id === activeTab; })[0];
    if (!tab) { tab = S.menu[0]; activeTab = tab.id; return renderMenu(); }
    $("#menuGrid").setAttribute("aria-labelledby", "tab-" + tab.id);
    $("#menuGrid").innerHTML = tab.cats.map(function (c) {
      var two = c.sizes && c.sizes.length === 2;
      var head = '<div class="cat-head"' + (two ? "" : ' style="grid-template-columns:1fr auto"') + '><h3 class="h-menu">' + esc(t(c.title)) + "</h3>" +
        (c.sizes ? c.sizes.map(function (z) { return "<span>" + esc(z) + "</span>"; }).join("") : "") + "</div>";
      var note = c.note ? '<p class="cat-note">' + esc(t(c.note)) + "</p>" : "";
      var rows = c.items.map(function (i) {
        if (two) {
          var a = i.sizes ? i.sizes[0] : null, b = i.sizes ? i.sizes[1] : i.price;
          var colspan = i.sizes ? "" : ' style="grid-column:2 / span 2"';
          return '<li class="row two"><span class="nm">' + esc(t(i.name)) + "</span>" +
            (i.sizes ? '<span class="pr">' + (a == null ? "" : a) + '</span><span class="pr">' + b + "</span>" : '<span class="pr"' + colspan + ">" + b + "</span>") + "</li>";
        }
        return '<li class="row"><span class="nm">' + esc(t(i.name)) + '</span><span class="pr">' + i.price + "</span></li>";
      }).join("");
      return '<div class="cat' + (c.highlight ? " hl" : "") + '">' + head + note + "<ul>" + rows + "</ul></div>";
    }).join("");
  }

  function render() {
    var m = MSG[lang];
    document.documentElement.lang = lang;
    $("#langBtn").textContent = lang === "pl" ? "EN" : "PL";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = lang === "en" && EN[el.dataset.i18n] ? EN[el.dataset.i18n] : el.dataset.pl;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      el.placeholder = lang === "en" && EN[el.dataset.i18nPh] ? EN[el.dataset.i18nPh] : el.dataset.plPh;
    });
    document.querySelectorAll('[data-bind="tagline"]').forEach(function (el) { el.textContent = "♪ " + t(S.bar.tagline) + " ♪"; });
    $(".lyric").setAttribute("aria-label", t(S.bar.tagline));
    $('[data-bind="intro"]').textContent = t(S.bar.intro);

    var today = new Date().getDay();
    $("#todayHours").textContent = hoursForDay(today).time;
    $("#heroAddr").textContent = S.bar.address;

    // Ticker (duplicated for a seamless loop)
    var items = m.ticker.map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("");
    $("#ticker").innerHTML = items + items;

    // Karaoke nights: Thu=4 .. Sat=6
    var order = [4, 5, 6];
    $("#nights").innerHTML = S.nights.map(function (n, i) {
      return '<div class="night' + (order[i] === today ? " today" : "") + '"><div class="d">' + esc(t(n.day)) + "</div><div><h3>" + esc(t(n.title)) + "</h3><p>" + esc(t(n.text)) + "</p></div></div>";
    }).join("");

    $("#deals").innerHTML = S.deals.map(function (d, i) {
      return '<article class="deal qr' + (i % 2 ? " ig" : "") + '"><div class="tag">' + esc(t(d.tag)) + "</div><h3>" + esc(t(d.title)) + "</h3><p>" + esc(t(d.text)) + '</p><div class="when">' + esc(t(d.when)) + "</div></article>";
    }).join("");
    $("#dealsNote").textContent = t(S.dealsNote);

    renderMenu();
    $("#menuPages").innerHTML = (S.menuPages || []).map(function (src, i) {
      return '<a href="' + esc(src) + '" target="_blank" rel="noopener" aria-label="' + m.page + " " + (i + 1) + ", " + m.open + '"><img src="' + esc(src) + '" alt="' + m.page + " " + (i + 1) + '" loading="lazy" width="1064" height="1401"></a>';
    }).join("");

    renderNights();

    renderEvents();
    renderSongs();
    $("#reviews").innerHTML = (S.reviews || []).map(function (r, i) {
      var stars = r.stars ? '<div class="stars" aria-label="' + r.stars + '/5">' + "★★★★★".slice(0, r.stars) + "</div>" : "";
      return '<figure class="review qr' + (i % 2 ? " ig" : "") + '">' + stars +
        (r.title ? "<b>" + esc(r.title) + "</b>" : "") +
        '<blockquote' + (r.lang ? ' lang="' + esc(r.lang) + '"' : "") + ">„" + esc(t(r.text)) + "”</blockquote>" +
        "<figcaption>" + esc(r.author) + " · " + esc(r.source) + (r.date ? ", " + esc(t(r.date)) : "") + "</figcaption></figure>";
    }).join("");
    $("#revLink").href = S.bar.mapsLink;

    var phoneHtml = '<a href="tel:' + S.bar.phone.replace(/\s/g, "") + '">' + esc(S.bar.phone) + '</a><button class="copy" type="button" data-copy="' + esc(S.bar.phone) + '">' + m.copy + "</button>";
    $("#cPhone").innerHTML = phoneHtml;
    $("#resPhone").innerHTML = phoneHtml;
    $("#cAddr").textContent = S.bar.address + " (" + S.bar.district + ")";
    if ($("#mapAddr")) { $("#mapAddr").textContent = S.bar.address; $("#mapBtn").href = S.bar.mapsLink; }
    $("#cHours").innerHTML = S.bar.hours.map(function (h) { return "<span>" + esc(t(h.days)) + "</span><span>" + esc(h.time) + "</span>"; }).join("");
    $("#cSocial").innerHTML = socials();
    $("#fSocial").innerHTML = socials();
    $("#fInfo").textContent = m.footer + " · © " + new Date().getFullYear();

    var sel = $("#f-time"), prev = sel.value, opts = [];
    for (var h = 15; h <= 24; h++) { opts.push(pad(h % 24) + ":00"); if (h < 24) opts.push(pad(h) + ":30"); }
    sel.innerHTML = opts.map(function (o) { return "<option" + (o === (prev || "21:00") ? " selected" : "") + ">" + o + "</option>"; }).join("");
  }

  // Wydarzenia: najbliższe terminy liczone z data.js
  function nextDates(ev, n) {
    var out = [], d = new Date(); d.setHours(0, 0, 0, 0);
    if (ev.weekly) {
      for (var i = 0; out.length < n && i < 21; i++) { var x = new Date(d); x.setDate(d.getDate() + i); if (ev.weekly.indexOf(x.getDay()) >= 0) out.push(x); }
    } else if (ev.first && ev.every) {
      var p = ev.first.split("-"), f = new Date(+p[0], +p[1] - 1, +p[2]);
      var step = ev.every * 864e5, k = Math.ceil((d - f) / step); if (k < 0) k = 0;
      for (var j = 0; j < n; j++) out.push(new Date(f.getTime() + (k + j) * step));
    }
    return out;
  }
  function evKey(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9]/g, ""); }
  function dLabel(d) { return MSG[lang].days[d.getDay()] + " " + d.getDate() + "." + pad(d.getMonth() + 1); }
  function lineup(rows) {
    return '<ol class="lineup">' + rows.map(function (p) {
      return '<li><span class="lu-d">' + esc(dLabel(p.date)) + (p.time ? "<small>" + esc(p.time) + "</small>" : "") + '</span><span class="lu-w">' +
        (p.who ? "<b>" + esc(p.who) + "</b>" : "") + (p.event && !p._own ? "<em>" + esc(p.event) + "</em>" : "") + (p.text ? "<span>" + esc(p.text) + "</span>" : "") + "</span></li>";
    }).join("") + "</ol>";
  }
  function renderEvents() {
    var m = MSG[lang], prog = (S.program || []).slice(), used = [];
    $("#evHost").href = "https://wa.me/" + S.bar.whatsapp + "?text=" + encodeURIComponent(m.evHost);
    var cards = (S.events || []).map(function (ev, i) {
      var k1 = evKey(ev.name), k2 = evKey(ev.id);
      var mine = prog.filter(function (p) { var k = evKey(p.event); return k && (k.indexOf(k1) >= 0 || k.indexOf(k2) >= 0); });
      mine.forEach(function (p) { p._own = true; used.push(p); });
      var dates = mine.length && !ev.weekly ? mine.slice(0, 3).map(function (p) { return p.date; }) : nextDates(ev, ev.weekly ? 4 : 3);
      var timeOf = function (d) { var p = mine.filter(function (x) { return +x.date === +d; })[0]; return (p && p.time) || ev.time; };
      var when = dates.length ? '<ul class="ev-dates">' + dates.map(function (d, k) {
        var tm = timeOf(d);
        return "<li" + (k === 0 ? ' class="next"' : "") + "><b>" + m.days[d.getDay()] + "</b>" + d.getDate() + "." + pad(d.getMonth() + 1) + (tm ? "<small>" + esc(tm) + "</small>" : "") + "</li>";
      }).join("") + "</ul>" : (ev.instagram ? '<p class="ev-ask">' + esc(m.evAsk) + "</p>" : "");
      var withInfo = mine.filter(function (p) { return p.who || p.text; });
      var lu = withInfo.length ? '<div class="lu-h">' + esc(m.evLineup) + "</div>" + lineup(withInfo.slice(0, 8)) : "";
      var extra = ev.id === "karaoke" ? '<a class="btn btn-primary ev-songs" href="piosenki.html">' + esc(m.evSongs) + "</a>" : "";
      var links = "";
      if (ev.instagram) links += '<a class="chip" href="' + esc(ev.instagram) + '" target="_blank" rel="noopener">' + ICON.ig + esc(m.evIg) + "</a>";
      if (ev.site) links += '<a class="chip" href="' + esc(ev.site) + '" target="_blank" rel="noopener">' + esc(m.evSite) + " ↗</a>";
      return '<article class="event ev-' + esc(ev.id) + (i % 2 ? " alt" : "") + '"><div class="ev-tag">' + esc(t(ev.tag)) + "</div><h3>" + esc(ev.name) + "</h3><p>" + esc(t(ev.text)) + "</p>" + when + lu + extra + (links ? '<div class="ev-links">' + links + "</div>" : "") + "</article>";
    });
    var rest = prog.filter(function (p) { return used.indexOf(p) < 0; });
    prog.forEach(function (p) { delete p._own; });
    if (rest.length) cards.push('<article class="event alt ev-more"><div class="ev-tag">' + esc(m.evMoreTag) + "</div><h3>" + esc(m.evMore) + "</h3>" + lineup(rest.slice(0, 12)) + "</article>");
    $("#events").innerHTML = cards.join("");
  }


  // Lista piosenek (karaoke)
  var songTab = "all", songQ = "";
  function fold(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ł/g, "l"); }
  function renderSongs() {
    if (!document.getElementById("songList")) return;
    var m = MSG[lang], all = S.songs || [];
    $("#songCat").href = S.songsCatalog || "https://ising.pl/piosenki";
    var hit = all.filter(function (s) { return !songQ || fold(s.title + " " + s.artist).indexOf(songQ) >= 0; });
    var cnt = { all: hit.length, int: 0, pl: 0 }; hit.forEach(function (s) { cnt[s.lang === "pl" ? "pl" : "int"]++; });
    $("#songTabs").innerHTML = [["all", m.soAll], ["int", m.soInt], ["pl", m.soPl]].map(function (x) {
      return '<button type="button" role="tab" class="ntab" data-k="' + x[0] + '" aria-selected="' + (songTab === x[0]) + '">' + esc(x[1]) + " <small>" + cnt[x[0]] + "</small></button>";
    }).join("");
    var col = function (k, title) {
      var list = hit.filter(function (s) { return (s.lang === "pl" ? "pl" : "int") === k; })
        .sort(function (a, b) { return fold(a.artist).localeCompare(fold(b.artist)) || fold(a.title).localeCompare(fold(b.title)); });
      if (!list.length) return "";
      return '<div class="song-col"><h3 class="h-menu">' + esc(title) + '</h3><ul class="song-list">' + list.map(function (s) {
        return "<li><b>" + esc(s.title) + "</b><span>" + esc(s.artist) + "</span></li>";
      }).join("") + "</ul></div>";
    };
    var html = (songTab !== "pl" ? col("int", m.soInt) : "") + (songTab !== "int" ? col("pl", m.soPl) : "");
    $("#songList").innerHTML = html || '<p class="song-none">' + esc(m.soNone) + "</p>";
  }
  $("#songTabs").addEventListener("click", function (e) { var b = e.target.closest(".ntab"); if (!b) return; songTab = b.dataset.k; renderSongs(); });
  $("#songQ").addEventListener("input", function (e) { songQ = fold(e.target.value.trim()); renderSongs(); });

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  // Embedded Google map only on the real website (sandboxed previews block iframes)
  (function () {
    var inFrame = false;
    try { inFrame = window.self !== window.top; } catch (e) { inFrame = true; }
    if (!inFrame && S.bar.mapsEmbed) {
      var m = $("#map");
      m.classList.add("has-frame");
      m.innerHTML = '<iframe title="Mapa – Och i Ach" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="' + esc(S.bar.mapsEmbed) + '"></iframe>';
    }
  })();

  $("#tabs").addEventListener("click", function (e) {
    var b = e.target.closest(".tab"); if (!b) return;
    activeTab = b.dataset.id; renderMenu();
    document.getElementById("tab-" + activeTab).focus();
  });
  $("#tabs").addEventListener("keydown", function (e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    var ids = S.menu.map(function (c) { return c.id; });
    var i = ids.indexOf(activeTab) + (e.key === "ArrowRight" ? 1 : -1);
    activeTab = ids[(i + ids.length) % ids.length]; renderMenu();
    document.getElementById("tab-" + activeTab).focus();
  });
  $("#langBtn").addEventListener("click", function () {
    lang = lang === "pl" ? "en" : "pl";
    try { localStorage.setItem("ochiach-lang", lang); } catch (e) {}
    render();
  });
  document.addEventListener("click", function (e) {
    var b = e.target.closest(".copy"); if (!b) return;
    var done = function () { b.textContent = MSG[lang].copied; setTimeout(function () { b.textContent = MSG[lang].copy; }, 1500); };
    try { navigator.clipboard.writeText(b.dataset.copy).then(done, function () {}); } catch (err) {}
  });

  var dateIn = $("#f-date");
  var todayStr = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateIn.min = todayStr;
  if (!dateIn.value) dateIn.value = todayStr;

  $("#resForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, m = MSG[lang], bad = false;
    var name = f.name.value.trim(), phone = f.phone.value.trim(), date = f.date.value, people = parseInt(f.people.value, 10);
    var set = function (id, msg) { $("#e-" + id).textContent = msg || ""; if (msg) bad = true; };
    set("name", name ? "" : m.name);
    set("phone", phone.replace(/\D/g, "").length >= 9 ? "" : m.phone);
    set("date", date && date >= todayStr ? "" : m.date);
    set("people", people >= 1 && people <= 30 ? "" : m.people);
    if (bad) { var first = f.querySelector(".err:not(:empty)"); if (first) first.previousElementSibling.focus(); return; }
    var d = {
      name: name, phone: phone, time: f.time.value, people: people, note: f.note.value.trim(),
      student: f.querySelector('input[name="student"]:checked').value === "yes",
      dateTxt: new Date(date + "T12:00:00").toLocaleDateString(lang === "pl" ? "pl-PL" : "en-GB", { weekday: "long", day: "numeric", month: "long" })
    };
    $("#waLink").href = "https://wa.me/" + S.bar.whatsapp + "?text=" + encodeURIComponent(m.wa(d));
    var show = function (txt) { $("#okText").textContent = txt; $("#resOk").hidden = false; $("#resOk").scrollIntoView({ behavior: "smooth", block: "nearest" }); };
    var mail = S.bar.bookingEmail;
    if (!mail) { $("#okTitle").textContent = lang === "pl" ? "Prawie gotowe!" : EN["ok.title"]; $("#waLink").hidden = false; show(m.ok(d)); return; }
    // Rezerwacja leci mailem do baru (FormSubmit), WhatsApp zostaje jako zapas
    var btn = f.querySelector('button[type="submit"]'); btn.disabled = true; var label = btn.textContent; btn.textContent = m.sendingRes;
    fetch("https://formsubmit.co/ajax/" + mail, {
      method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        _subject: "Rezerwacja: " + d.name + ", " + d.people + " os., " + d.dateTxt + " " + d.time,
        _template: "table", _captcha: "false",
        "Imię": d.name, "Telefon": d.phone, "Data": d.dateTxt, "Godzina": d.time, "Liczba osób": d.people,
        "Studenci": d.student ? "tak" : "nie", "Uwagi": d.note || "-", "Język strony": lang
      })
    }).then(function (r) { return r.json().then(function (j) { if (!r.ok || String(j.success) !== "true") throw 0; }); })
      .then(function () { $("#okTitle").textContent = m.sentTitle; show(m.sentRes(d)); $("#waLink").hidden = true; f.reset(); dateIn.value = todayStr; },
            function () { $("#okTitle").textContent = lang === "pl" ? "Prawie gotowe!" : EN["ok.title"]; show(m.failRes); $("#waLink").hidden = false; })
      .then(function () { btn.disabled = false; btn.textContent = label; });
  });

  // ---------- Wasze wieczory: galeria zdjęć/filmów z wieczorów karaoke ----------
  var UP = S.uploads || {};
  var CLOUD = UP.cloudName && UP.uploadPreset;
  var remote = {}, local = {};
  function ymd(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function karaokeNights() {
    var out = [], d = new Date(); d.setHours(12, 0, 0, 0);
    // after midnight, the night still belongs to the previous day
    if (new Date().getHours() < 5) d.setDate(d.getDate() - 1);
    while (out.length < (UP.nightsBack || 8)) {
      var w = d.getDay();
      if (w === 4 || w === 5 || w === 6) out.push(new Date(d));
      d.setDate(d.getDate() - 1);
    }
    return out;
  }
  var NIGHTS = karaokeNights();
  var activeNight = ymd(NIGHTS[0]);
  function nightLabel(d) {
    var m = MSG[lang];
    var isToday = ymd(d) === ymd(new Date());
    return (isToday ? m.tonight + " · " : "") + m.days[d.getDay()] + " " + pad(d.getDate()) + "." + pad(d.getMonth() + 1);
  }
  function itemsFor(key) {
    return [].concat((S.nightSamples || {})[key] || [], remote[key] || [], local[key] || []);
  }
  function renderNights() {
    var m = MSG[lang];
    $("#nightTabs").innerHTML = NIGHTS.map(function (d) {
      var k = ymd(d), n = itemsFor(k).length, on = k === activeNight;
      return '<button class="ntab" role="tab" type="button" id="nt-' + k + '" data-k="' + k + '" aria-selected="' + on + '" tabindex="' + (on ? 0 : -1) + '">' + esc(nightLabel(d)) + (n ? " <b>" + n + "</b>" : "") + "</button>";
    }).join("");
    $("#wall").setAttribute("aria-labelledby", "nt-" + activeNight);
    var items = itemsFor(activeNight);
    $("#wall").innerHTML = items.length ? items.map(function (it) {
      var media = it.type === "video"
        ? '<video src="' + esc(it.url) + '" muted playsinline preload="metadata" controls></video>'
        : '<a href="' + esc(it.full || it.url) + '" target="_blank" rel="noopener"><img src="' + esc(it.url) + '" alt="" loading="lazy"></a>';
      return '<figure class="shot">' + media + (it.by ? "<figcaption>" + m.by + " " + esc(it.by) + "</figcaption>" : "") + "</figure>";
    }).join("") : '<div class="wall-empty"><svg class="mic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1A7 7 0 0 0 19 11h-2z"/></svg><p>' + m.empty + '</p><button class="btn btn-ghost" type="button" id="beFirst">' + m.beFirst + "</button></div>";
    var sel = $("#u-night"), keep = sel.value || activeNight;
    sel.innerHTML = NIGHTS.map(function (d) { var k = ymd(d); return '<option value="' + k + '"' + (k === keep ? " selected" : "") + ">" + esc(nightLabel(d)) + "</option>"; }).join("");
  }
  function loadRemote(key) {
    if (!CLOUD || remote[key]) return;
    remote[key] = [];
    ["image", "video"].forEach(function (type) {
      fetch("https://res.cloudinary.com/" + UP.cloudName + "/" + type + "/list/night-" + key + ".json")
        .then(function (r) { return r.ok ? r.json() : { resources: [] }; })
        .then(function (j) {
          (j.resources || []).forEach(function (x) {
            var base = "https://res.cloudinary.com/" + UP.cloudName + "/" + type + "/upload/";
            var path = "v" + x.version + "/" + x.public_id + "." + (type === "video" ? "mp4" : x.format);
            var by = x.context && x.context.custom && x.context.custom.author;
            remote[key].push({ type: type, url: base + (type === "video" ? "w_720,q_auto/" : "c_fill,w_600,h_600,q_auto/") + path, full: base + path, by: by || "" });
          });
          renderNights();
        }).catch(function () {});
    });
  }
  loadRemote(activeNight);
  $("#nightTabs").addEventListener("click", function (e) {
    var b = e.target.closest(".ntab"); if (!b) return;
    activeNight = b.dataset.k; loadRemote(activeNight); renderNights();
    document.getElementById("nt-" + activeNight).focus();
  });
  $("#nightTabs").addEventListener("keydown", function (e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    var keys = NIGHTS.map(ymd), i = keys.indexOf(activeNight) + (e.key === "ArrowRight" ? 1 : -1);
    activeNight = keys[(i + keys.length) % keys.length]; loadRemote(activeNight); renderNights();
    document.getElementById("nt-" + activeNight).focus();
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest("#beFirst")) return;
    $("#upWrap").open = true; $("#upWrap").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  var picked = [];
  function setFiles(list) {
    picked = Array.prototype.slice.call(list || []).filter(function (f) { return /^(image|video)\//.test(f.type); });
    $("#upPreview").innerHTML = picked.map(function (f) {
      var u = URL.createObjectURL(f);
      return f.type.indexOf("video") === 0 ? '<video src="' + u + '" muted playsinline></video>' : '<img src="' + u + '" alt="">';
    }).join("");
    $("#e-up").textContent = "";
  }
  $("#u-files").addEventListener("change", function (e) { setFiles(e.target.files); });
  var drop = $("#drop");
  ["dragenter", "dragover"].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add("over"); }); });
  ["dragleave", "drop"].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove("over"); }); });
  drop.addEventListener("drop", function (e) { if (e.dataTransfer) setFiles(e.dataTransfer.files); });

  $("#upForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var m = MSG[lang], err = "", max = UP.maxFiles || 10, mb = UP.maxVideoMB || 50;
    if (!picked.length) err = m.noFiles;
    else if (picked.length > max) err = m.tooMany(max);
    else picked.some(function (f) { if (f.type.indexOf("video") === 0 && f.size > mb * 1048576) { err = m.tooBig(f.name, mb); return true; } });
    if (!err && !$("#u-ok").checked) err = m.noConsent;
    $("#e-up").textContent = err;
    if (err) return;
    var key = $("#u-night").value, by = $("#u-name").value.trim(), status = $("#upStatus");
    if (!CLOUD) {
      local[key] = (local[key] || []).concat(picked.map(function (f) {
        return { type: f.type.indexOf("video") === 0 ? "video" : "image", url: URL.createObjectURL(f), by: by };
      }));
      activeNight = key; renderNights();
      status.textContent = m.demo;
      reset(); return;
    }
    status.textContent = m.sending;
    Promise.all(picked.map(function (f) {
      var fd = new FormData();
      fd.append("file", f);
      fd.append("upload_preset", UP.uploadPreset);
      fd.append("tags", "ochiach,night-" + key);
      if (by) fd.append("context", "author=" + by.replace(/[|=]/g, " "));
      return fetch("https://api.cloudinary.com/v1_1/" + UP.cloudName + "/auto/upload", { method: "POST", body: fd })
        .then(function (r) { if (!r.ok) throw new Error(r.status); });
    })).then(function () { status.textContent = m.sent; reset(); }, function () { status.textContent = m.failed; });
  });
  function reset() { picked = []; $("#u-files").value = ""; $("#upPreview").innerHTML = ""; $("#u-ok").checked = false; }

  render();
  window.addEventListener("sheet:updated", function () { render(); });
})();

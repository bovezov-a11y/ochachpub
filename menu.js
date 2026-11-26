/* Menu przy stoliku (NFC / QR). Dane bierze z data.js (to samo menu co na stronie). */
(function () {
  var S = window.SITE;
  var lang = "pl";
  try { lang = localStorage.getItem("ochiach-lang") || ""; } catch (e) {}
  if (lang !== "pl" && lang !== "en") lang = (navigator.language || "pl").slice(0, 2) === "pl" ? "pl" : "en";

  var TXT = {
    pl: {
      navMenu: "Menu", navBook: "Rezerwacja", navEvents: "Wydarzenia", navPhotos: "Zdjęcia", navReviews: "Opinie",
      title: "Menu", search: "Szukaj, np. mojito, gin, piwo…", table: "Stolik", nores: "Nic nie znaleziono. Zapytaj przy barze!",
      karaoke: "Karaoke czw–sob od 21:00", karaokeT: "Zapisz się na piosenkę u DJ-a.",
      student: "-20% na koktajle z legitymacją", studentT: "Pon–czw, tylko na koktajle. Pokaż legitymację przy zamówieniu.",
      site: "Strona baru, rezerwacje i zdjęcia z wieczorów", fine: "Ceny w złotych, zawierają VAT. Alkohol sprzedajemy tylko osobom pełnoletnim.",
      tonight: "Karaoke dziś od 21:00", now: "Karaoke trwa! Zapisz się u DJ-a", review: "Opinia", top: "Do góry", tip: "Dotknij koktajlu, żeby zobaczyć skład"
    },
    en: {
      navMenu: "Menu", navBook: "Book", navEvents: "Events", navPhotos: "Photos", navReviews: "Reviews",
      title: "Menu", search: "Search, e.g. mojito, gin, beer…", table: "Table", nores: "Nothing found. Ask at the bar!",
      karaoke: "Karaoke Thu–Sat from 9 pm", karaokeT: "Sign up for a song with the DJ.",
      student: "-20% on cocktails with student ID", studentT: "Mon–Thu, cocktails only. Show your student card when you order.",
      site: "Bar website, bookings and photos from our nights", fine: "Prices in złoty incl. VAT. Alcohol is served to adults only.",
      tonight: "Karaoke tonight from 9 pm", now: "Karaoke is on! Sign up with the DJ", review: "Review", top: "Back to top", tip: "Tap a cocktail to see what's in it"
    }
  };
  var ICON = {
    ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><defs><radialGradient id="igM" cx="30%" cy="107%" r="150%"><stop offset="0" stop-color="#fdf497"/><stop offset=".05" stop-color="#fdf497"/><stop offset=".45" stop-color="#fd5949"/><stop offset=".6" stop-color="#d6249f"/><stop offset=".9" stop-color="#285AEB"/></radialGradient></defs><rect width="24" height="24" rx="6" fill="url(#igM)"/><rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="12" cy="12" r="3.3" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="16.3" cy="7.7" r="1.05" fill="#fff"/></svg>',
    fb: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#1877F2"/><path fill="#fff" d="M15.1 15.5l.5-3.3h-3.2v-2.1c0-.9.4-1.8 1.9-1.8h1.4V5.5s-1.3-.2-2.6-.2c-2.6 0-4.3 1.6-4.3 4.4v2.5H6v3.3h2.8V24h3.6v-8.5h2.7z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#EA4335" d="M12 1.5A7.5 7.5 0 0 0 4.5 9c0 5.6 7.5 13.5 7.5 13.5S19.5 14.6 19.5 9A7.5 7.5 0 0 0 12 1.5z"/><circle cx="12" cy="9" r="2.8" fill="#fff"/></svg>'
  };

  var $ = function (s) { return document.querySelector(s); };
  var t = function (o) { return o && typeof o === "object" ? (o[lang] || o.pl) : o; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var norm = function (s) { return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l"); };

  var query = "";

  function highlight(name) {
    var s = esc(name);
    if (!query) return s;
    var n = norm(name), i = n.indexOf(query);
    if (i < 0) return s;
    var raw = String(name);
    return esc(raw.slice(0, i)) + "<mark>" + esc(raw.slice(i, i + query.length)) + "</mark>" + esc(raw.slice(i + query.length));
  }

  function renderList() {
    var any = false;
    var html = S.menu.map(function (g) {
      var cats = g.cats.map(function (c) {
        var two = c.sizes && c.sizes.length === 2;
        var catHit = query && norm(t(c.title)).indexOf(query) >= 0;
        var items = c.items.filter(function (i) { return !query || catHit || norm(t(i.name)).indexOf(query) >= 0 || (i.desc && norm(t(i.desc)).indexOf(query) >= 0); });
        if (!items.length) return "";
        any = true;
        var same = g.cats.length === 1 && norm(t(c.title)) === norm(t(g.label));
        var head = same && !c.sizes ? "" : '<div class="cat-h' + (two ? " two" : "") + '"><h3>' + esc(t(c.title)) + "</h3>" +
          (c.sizes ? c.sizes.map(function (z) { return "<small>" + esc(z) + "</small>"; }).join("") : "") + "</div>";
        var rows = items.map(function (i) {
          var nm = '<span class="nm">' + highlight(t(i.name)) + "</span>";
          if (two && i.sizes) {
            return '<div class="it two">' + nm + '<span class="pr' + (i.sizes[0] == null ? ' na">–' : '">' + i.sizes[0]) + '</span><span class="pr">' + i.sizes[1] + "</span></div>";
          }
          if (i.desc) {
            var d = t(i.desc), open = query && norm(d).indexOf(query) >= 0 && norm(t(i.name)).indexOf(query) < 0;
            return '<div class="it has-d' + (two ? " two full" : "") + (open ? " open" : "") + '" role="button" tabindex="0" aria-expanded="' + open + '">' +
              '<span class="nm">' + highlight(t(i.name)) + '<i class="dt" aria-hidden="true"></i></span><span class="pr">' + i.price + '</span><span class="ds">' + esc(d) + "</span></div>";
          }
          return '<div class="it' + (two ? " two full" : "") + '">' + nm + '<span class="pr">' + i.price + "</span></div>";
        }).join("");
        return '<div class="cat' + (c.highlight ? " hl" : "") + '">' + head + (c.note ? '<p class="cat-note">' + esc(t(c.note)) + "</p>" : "") + (items.some(function (i) { return i.desc; }) ? '<p class="cat-tip">' + esc(TXT[lang].tip) + "</p>" : "") + rows + "</div>";
      }).join("");
      if (!cats) return "";
      return '<section class="grp" id="g-' + g.id + '"><div class="grp-h"><h2>' + esc(t(g.label)) + "</h2></div>" + cats + "</section>";
    }).join("");
    $("#list").innerHTML = html;
    $("#nores").hidden = any;
    $("#nores").textContent = TXT[lang].nores;
    observe();
  }

  function renderChips() {
    $("#chips").innerHTML = S.menu.map(function (g, i) {
      return '<a class="chip' + (i === 0 ? " on" : "") + '" href="#g-' + g.id + '" data-id="' + g.id + '">' + esc(t(g.label)) + "</a>";
    }).join("");
  }

  function renderToday() {
    var d = new Date(), w = d.getDay(), h = d.getHours();
    var out = "";
    var karaokeDay = (w === 4 || w === 5 || w === 6) || (h < 5 && (w === 5 || w === 6 || w === 0));
    if (karaokeDay) {
      var on = h >= 21 || h < 5;
      out += '<div class="badge red"><span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span>' + (on ? TXT[lang].now : TXT[lang].tonight) + "</span></div>";
    }
    var hh = (S.deals || []).filter(function (x) { return /happy/i.test(t(x.title)); })[0];
    if (hh) out += '<div class="badge"><span class="pop">' + esc(t(hh.tag)) + "</span><span>" + esc(t(hh.title)) + " · " + esc(t(hh.when)) + "</span></div>";
    $("#today").innerHTML = out;
  }

  function renderStatic() {
    var L = TXT[lang];
    document.documentElement.lang = lang;
    $("#lang").textContent = lang === "pl" ? "EN" : "PL";
    document.querySelectorAll("[data-t]").forEach(function (el) { if (L[el.dataset.t]) el.textContent = L[el.dataset.t]; });
    $("#q").placeholder = L.search;
    $("#topBtn").setAttribute("aria-label", L.top);
    var links = "";
    if (S.bar.instagram) links += '<a href="' + esc(S.bar.instagram) + '" target="_blank" rel="noopener">' + ICON.ig + "Instagram</a>";
    if (S.bar.facebook) links += '<a href="' + esc(S.bar.facebook) + '" target="_blank" rel="noopener">' + ICON.fb + "Facebook</a>";
    links += '<a href="' + esc(S.bar.mapsLink) + '" target="_blank" rel="noopener">' + ICON.pin + L.review + "</a>";
    $("#links").innerHTML = links;
  }

  function renderAll() { renderStatic(); renderChips(); renderToday(); renderList(); }

  // Podświetlanie aktualnej kategorii podczas przewijania
  var io;
  function observe() {
    if (!("IntersectionObserver" in window)) return;
    if (io) io.disconnect();
    io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = e.target.id.slice(2);
        document.querySelectorAll(".chip").forEach(function (c) {
          var on = c.dataset.id === id;
          c.classList.toggle("on", on);
          if (on) c.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
        });
      });
    }, { rootMargin: "-240px 0px -55% 0px" });
    document.querySelectorAll(".grp").forEach(function (g) { io.observe(g); });
  }

  $("#chips").addEventListener("click", function (e) {
    var a = e.target.closest(".chip"); if (!a) return;
    e.preventDefault();
    var g = document.getElementById("g-" + a.dataset.id);
    if (g) g.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  // Kliknięcie w koktajl pokazuje skład
  function toggle(row) { var on = !row.classList.contains("open"); row.classList.toggle("open", on); row.setAttribute("aria-expanded", on); }
  $("#list").addEventListener("click", function (e) { var r = e.target.closest(".it.has-d"); if (r) toggle(r); });
  $("#list").addEventListener("keydown", function (e) { var r = e.target.closest(".it.has-d"); if (r && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); toggle(r); } });
  $("#q").addEventListener("input", function (e) {
    query = norm(e.target.value.trim());
    renderList();
    window.scrollTo({ top: 0 });
  });
  $("#lang").addEventListener("click", function () {
    lang = lang === "pl" ? "en" : "pl";
    try { localStorage.setItem("ochiach-lang", lang); } catch (e) {}
    renderAll();
  });
  window.addEventListener("scroll", function () { $("#topBtn").hidden = window.scrollY < 600; }, { passive: true });
  $("#topBtn").addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  renderAll();
  window.addEventListener("sheet:updated", renderAll);
})();

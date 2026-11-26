/* Och! & Ach! — treść z Google Sheets.
   Program wieczorów, zniżki i menu można zmieniać w arkuszu Google, bez dotykania kodu.
   Wystarczy wpisać ID arkusza w data.js (sheet.id). Bez ID strona używa danych z data.js.
   Zakładki arkusza: Program, Znizki, Menu, Piosenki (nazwy muszą się zgadzać). */
(function () {
  var S = window.SITE;
  var CFG = S.sheet || {};
  var TABS = ["Program", "Znizki", "Menu", "Piosenki"];
  var KEY = "ochiach-sheet";

  // --- CSV ---
  function parseCSV(text) {
    var rows = [], row = [], cur = "", q = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (q) {
        if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; }
        else cur += c;
      } else if (c === '"') q = true;
      else if (c === ",") { row.push(cur); cur = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(cur); rows.push(row); row = []; cur = "";
      } else cur += c;
    }
    if (cur !== "" || row.length) { row.push(cur); rows.push(row); }
    return rows;
  }
  function norm(s) { return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l").replace(/[^a-z0-9]/g, ""); }
  // Zamienia CSV na listę obiektów z kluczami = znormalizowane nagłówki ("Cena (zł)" -> "cenazl").
  function objects(text) {
    var rows = parseCSV(text || "").filter(function (r) { return r.some(function (x) { return String(x).trim(); }); });
    if (rows.length < 2) return [];
    var head = rows[0].map(norm);
    return rows.slice(1).map(function (r) {
      var o = {}; head.forEach(function (h, i) { o[h] = String(r[i] == null ? "" : r[i]).trim(); }); return o;
    });
  }
  function pick(o, names) { for (var i = 0; i < names.length; i++) { var k = norm(names[i]); for (var h in o) if (h.indexOf(k) === 0 && o[h] !== "") return o[h]; } return ""; }
  function shown(o) { return !/^(nie|no|n|0|false|hayir|hayır)$/i.test(pick(o, ["Pokaz", "Pokaż"])); }
  function num(v) { v = String(v).replace(",", ".").replace(/[^\d.]/g, ""); return v === "" ? null : +v; }
  function pl(v, en) { return en ? { pl: v, en: en } : v; }

  function parseDate(v) {
    v = String(v).trim(); var m;
    if ((m = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/))) return new Date(+m[1], m[2] - 1, +m[3]);
    if ((m = v.match(/^(\d{1,2})[.\/-](\d{1,2})[.\/-](\d{2,4})/))) {
      var a = +m[1], b = +m[2], y = +m[3]; if (y < 100) y += 2000;
      if (b > 12 && a <= 12) { var t = a; a = b; b = t; } // format amerykański M/D/R
      return new Date(y, b - 1, a);
    }
    if ((m = v.match(/^Date\((\d+),(\d+),(\d+)/))) return new Date(+m[1], +m[2], +m[3]);
    return null;
  }

  // Szuka angielskich nazw w data.js, żeby wersja EN działała dalej.
  function enIndex() {
    var idx = { group: {}, cat: {}, item: {} };
    (S.menu || []).forEach(function (g) {
      idx.group[norm(g.label.pl || g.label)] = g;
      g.cats.forEach(function (c) {
        idx.cat[norm(c.title.pl || c.title)] = c;
        c.items.forEach(function (i) { if (i.name && i.name.en) idx.item[norm(i.name.pl)] = i.name.en; });
      });
    });
    return idx;
  }

  // --- Zastosowanie danych z arkusza ---
  function applyProgram(text) {
    var today = new Date(); today.setHours(0, 0, 0, 0);
    S.program = objects(text).filter(shown).map(function (o) {
      return { date: parseDate(pick(o, ["Data", "Date", "Tarih"])), time: pick(o, ["Godzina", "Time", "Saat"]).slice(0, 5),
               event: pick(o, ["Wydarzenie", "Event", "Etkinlik"]), who: pick(o, ["Kto", "Who", "Kim"]), text: pick(o, ["Opis", "Description", "Aciklama"]) };
    }).filter(function (p) { return p.date && p.date >= today; })
      .sort(function (a, b) { return a.date - b.date || a.time.localeCompare(b.time); });
  }
  function applyDeals(text) {
    var list = objects(text).filter(shown).map(function (o) {
      return { tag: pl(pick(o, ["Etykieta"]), pick(o, ["Etykieta EN"]) || null), title: pl(pick(o, ["Tytul", "Tytuł"]), pick(o, ["Tytul EN", "Tytuł EN"]) || null),
               text: pl(pick(o, ["Opis"]), pick(o, ["Opis EN"]) || null), when: pl(pick(o, ["Kiedy"]), pick(o, ["Kiedy EN"]) || null) };
    }).filter(function (d) { return (d.title.pl || d.title); });
    if (list.length) S.deals = list;
  }
  function applyMenu(text) {
    var rows = objects(text).filter(shown);
    if (!rows.length) return;
    var idx = enIndex(), groups = [], gmap = {};
    rows.forEach(function (o) {
      var gName = pick(o, ["Zakladka", "Zakładka"]), cName = pick(o, ["Kategoria"]), name = pick(o, ["Pozycja"]);
      if (!gName || !name) return;
      var gk = norm(gName), g = gmap[gk];
      if (!g) {
        var old = idx.group[gk];
        g = gmap[gk] = { id: old ? old.id : "z" + groups.length, label: old ? old.label : gName, cats: [], _c: {} };
        groups.push(g);
      }
      cName = cName || gName;
      var ck = norm(cName), c = g._c[ck];
      if (!c) {
        var oc = idx.cat[ck];
        c = g._c[ck] = { title: oc ? oc.title : cName, items: [] };
        if (oc && oc.note) c.note = oc.note;
        if (oc && oc.highlight) c.highlight = true;
        if (oc && oc.sizes) c.sizes = oc.sizes;
        g.cats.push(c);
      }
      var a = num(pick(o, ["30 ml", "30ml"])), b = num(pick(o, ["50 ml", "50ml"])), p = num(pick(o, ["Cena"]));
      var en = pick(o, ["Pozycja EN"]) || idx.item[norm(name)];
      var item = { name: en ? { pl: name, en: en } : name };
      var sk = pick(o, ["Sklad", "Skład"]), skEn = pick(o, ["Sklad EN", "Skład EN"]);
      if (sk) item.desc = skEn ? { pl: sk, en: skEn } : sk;
      if (a != null || b != null) { item.sizes = [a, b]; c.sizes = ["30 ml", "50 ml"]; } else item.price = p == null ? "" : p;
      c.items.push(item);
    });
    groups.forEach(function (g) {
      delete g._c;
      g.cats.forEach(function (c) { if (c.sizes && c.sizes.length === 2 && !c.items.some(function (i) { return i.sizes; })) c.sizes = c.sizes.slice(1); });
    });
    if (groups.length) S.menu = groups;
  }
  function applySongs(text) {
    var list = objects(text).filter(shown).map(function (o) {
      var l = norm(pick(o, ["Jezyk", "Język", "Language", "Dil"]));
      return { title: pick(o, ["Tytul", "Tytuł", "Title"]), artist: pick(o, ["Wykonawca", "Artist"]), lang: /^(pl|pol|polskie|polska|lehce)/.test(l) ? "pl" : "int" };
    }).filter(function (x) { return x.title; });
    if (list.length) S.songs = list;
  }
  function apply(data) {
    try { if (data.Piosenki != null) applySongs(data.Piosenki); } catch (e) {}
    try { if (data.Program != null) applyProgram(data.Program); } catch (e) {}
    try { if (data.Znizki != null) applyDeals(data.Znizki); } catch (e) {}
    try { if (data.Menu != null) applyMenu(data.Menu); } catch (e) {}
  }

  S.program = S.program || [];
  window.OCH_SHEET = { apply: apply, parseCSV: parseCSV }; // do testów
  if (!CFG.id) return;

  // 1) Najpierw ostatnia zapisana wersja (strona od razu ma aktualne ceny)
  try { var cached = JSON.parse(localStorage.getItem(KEY) || "null"); if (cached && cached.id === CFG.id) apply(cached.data); } catch (e) {}

  // 2) Potem świeże dane z arkusza
  var base = "https://docs.google.com/spreadsheets/d/" + encodeURIComponent(CFG.id) + "/gviz/tq?tqx=out:csv&headers=1&sheet=";
  Promise.all(TABS.map(function (tab) {
    return fetch(base + encodeURIComponent(tab), { cache: "no-store" })
      .then(function (r) { return r.ok ? r.text() : null; })
      .then(function (t) { return t && !/^\s*</.test(t) ? t : null; }, function () { return null; });
  })).then(function (texts) {
    var data = {}; TABS.forEach(function (tab, i) { if (texts[i] != null) data[tab] = texts[i]; });
    if (!Object.keys(data).length) return;
    apply(data);
    try { localStorage.setItem(KEY, JSON.stringify({ id: CFG.id, data: data })); } catch (e) {}
    window.dispatchEvent(new Event("sheet:updated"));
  });

})();

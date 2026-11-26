/* Och! & Ach! — animacje (dodatki). Usunięcie tego pliku i fx.css wyłącza je wszystkie. */
(function () {
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Pasek postępu przewijania
  var bar = document.createElement("div"); bar.className = "fx-progress"; bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);
  var tick = false;
  function prog() {
    tick = false;
    var h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, scrollY / h) : 0) + ")";
  }
  addEventListener("scroll", function () { if (!tick) { tick = true; requestAnimationFrame(prog); } }, { passive: true });
  prog();

  if (reduce) return;

  // Nuty w hero
  var hero = document.querySelector(".hero");
  if (hero) {
    var box = document.createElement("div"); box.className = "fx-notes"; box.setAttribute("aria-hidden", "true");
    var cols = ["var(--pop-red)", "var(--pop-yellow)", "var(--pop-blue)", "var(--wine)"];
    for (var i = 0; i < 7; i++) {
      var s = document.createElement("span");
      s.textContent = i % 3 ? "♪" : "♫";
      s.style.left = (6 + i * 13 + Math.random() * 6) + "%";
      s.style.color = cols[i % 4];
      s.style.fontSize = (1.4 + Math.random() * 1.4) + "rem";
      s.style.animationDelay = (i * 1.3) + "s";
      s.style.animationDuration = (8 + Math.random() * 4) + "s";
      box.appendChild(s);
    }
    hero.insertBefore(box, hero.firstChild);
  }

  // Logo kiwa się po dotknięciu
  var logo = document.querySelector(".hero-logo");
  if (logo) logo.addEventListener("click", function () { logo.classList.remove("fx-wob"); void logo.offsetWidth; logo.classList.add("fx-wob"); });

  // Treść wjeżdża przy przewijaniu (także elementy dorysowane później przez skrypt)
  if (!("IntersectionObserver" in window) || document.querySelector(".mm")) return; // menu przy stoliku: bez animacji wjazdu, ma być szybko
  var SEL = ".sec-head, .event, .deal, .review, .night, .steps li, .photo, .map, form.card, .res-aside, .ev-host, .wall > *, .cat, .grp-h, .pages > *, .loc dl > div";
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("fx-on"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px", threshold: .05 });
  function scan() {
    var n = 0;
    document.querySelectorAll(SEL).forEach(function (el) {
      if (el.classList.contains("fx-r") || el.closest(".mh")) return;
      var r = el.getBoundingClientRect();
      el.classList.add("fx-r");
      if (r.top < innerHeight) el.style.setProperty("--fx-d", Math.min(n++ * 0.06, .4) + "s");
      io.observe(el);
    });
  }
  scan();
  new MutationObserver(function () { scan(); }).observe(document.querySelector("main, .mm") || document.body, { childList: true, subtree: true });
})();

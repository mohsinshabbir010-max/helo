/* Kilcullen Cabs — booking form, guide fares, road-sign journeys, service-area map, contact links. */
(function () {
  "use strict";

  var CFG = window.KC_CONFIG || {};
  var PLACES = window.KC_PLACES || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  };
  var icon = function (id, cls) { return '<svg class="' + (cls || "i") + '" viewBox="0 0 24 24" aria-hidden="true"><use href="#' + id + '"/></svg>'; };
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };

  /* ---------- Contact links ---------- */
  function waLink(text) { return "https://wa.me/" + CFG.whatsapp + (text ? "?text=" + encodeURIComponent(text) : ""); }
  $$("[data-phone-text]").forEach(function (el) { if (CFG.phoneDisplay) el.textContent = CFG.phoneDisplay; });
  if (CFG.phoneTel) $$("[data-call]").forEach(function (a) { a.href = "tel:" + CFG.phoneTel; });
  if (CFG.whatsapp) $$("[data-wa]").forEach(function (a) {
    a.href = waLink("Hi Kilcullen Cabs, I'd like to book a cab.");
    a.target = "_blank";
    a.rel = "noopener";
  });
  if (CFG.email) $$("[data-email]").forEach(function (a) { a.href = "mailto:" + CFG.email; });
  $$("[data-email-text]").forEach(function (el) { if (CFG.email) el.textContent = CFG.email; });
  if (!CFG.email) $$("[data-email-item]").forEach(function (el) { el.remove(); });
  if (CFG.landlineTel) $$("[data-landline]").forEach(function (a) { a.href = "tel:" + CFG.landlineTel; });
  $$("[data-landline-text]").forEach(function (el) { if (CFG.landlineDisplay) el.textContent = CFG.landlineDisplay; });
  $$("[data-open]").forEach(function (el) {
    var day = new Date().toLocaleDateString("en-IE", { weekday: "long" });
    el.textContent = "Open today, " + day + " · " + (CFG.openDays || "7 days a week");
  });

  /* ---------- Destinations ---------- */
  function findPlace(text) {
    var t = String(text || "").trim().toLowerCase();
    if (!t) return null;
    for (var i = 0; i < PLACES.length; i++) {
      var p = PLACES[i];
      if (p.name.toLowerCase() === t || p.id === t || (p.ga && p.ga.toLowerCase() === t)) return p;
    }
    return null;
  }

  /* ---------- Booking form ---------- */
  var form = $("#booking"), done = $("#done"), fareBox = $("#fare");
  var f = function (id) { return document.getElementById(id); };
  var step = 1;

  // Datalist of popular destinations
  f("dest-list").innerHTML = PLACES.map(function (p) { return '<option value="' + esc(p.name) + '"></option>'; }).join("");

  // Sensible defaults: today, next quarter hour at least an hour from now
  (function defaults() {
    var now = new Date(Date.now() + 60 * 60 * 1000);
    now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15, 0, 0);
    var iso = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());
    var today = new Date();
    f("b-date").min = today.getFullYear() + "-" + pad(today.getMonth() + 1) + "-" + pad(today.getDate());
    if (!f("b-date").value) f("b-date").value = iso;
    f("b-time").value = pad(now.getHours()) + ":" + pad(now.getMinutes());
  })();

  function trip() {
    return {
      place: findPlace(f("b-dest").value),
      pax: parseInt(f("b-pax").value, 10) || 1,
      ret: f("b-return").checked,
    };
  }

  function renderFare() {
    var t = trip();
    var dest = f("b-dest").value.trim();
    var airport = (t.place && t.place.airport) || /airport/i.test(dest);
    f("flight-field").hidden = !airport;
    if (t.place) {
      fareBox.className = "fare";
      fareBox.innerHTML =
        '<p class="fare__amount"><small>~</small>' + t.place.km + '<small> km</small></p>' +
        '<p class="fare__meta">' + esc(t.place.name) + " · about " + t.place.min + " min" + (t.ret ? " · return trip" : " · one way") + "</p>" +
        '<p class="fare__note">We confirm your price when we reply — by phone, WhatsApp or text.</p>';
    } else {
      fareBox.className = "fare fare--quote";
      fareBox.innerHTML =
        '<p class="fare__amount">Anywhere</p>' +
        '<p class="fare__meta">' + (dest ? "We'll confirm the trip when we reply" : "Add a destination") + "</p>" +
        '<p class="fare__note">Kilcullen, Co. Kildare and beyond — airport runs, school runs, race days and local trips.</p>';
    }
  }
  ["b-dest", "b-date", "b-time", "b-pax", "b-return"].forEach(function (id) {
    f(id).addEventListener("input", renderFare);
    f(id).addEventListener("change", renderFare);
  });

  function setError(id, msg) {
    var el = f(id), err = f(id + "-err");
    if (msg) {
      if (!err) {
        err = document.createElement("p");
        err.className = "field__err";
        err.id = id + "-err";
        el.closest(".field").appendChild(err);
      }
      err.textContent = msg;
      el.setAttribute("aria-invalid", "true");
      el.setAttribute("aria-describedby", err.id);
      return false;
    }
    if (err) err.remove();
    el.removeAttribute("aria-invalid");
    el.removeAttribute("aria-describedby");
    return true;
  }
  function validate(ids) {
    var rules = {
      "b-pickup": function (v) { return v.trim() ? "" : "Enter a pickup address or Eircode."; },
      "b-dest": function (v) { return v.trim() ? "" : "Enter where you're going."; },
      "b-date": function (v) { return v ? "" : "Choose a date."; },
      "b-time": function (v) { return v ? "" : "Choose a pickup time."; },
      "b-name": function (v) { return v.trim() ? "" : "Enter your name so the driver knows who to look for."; },
      "b-phone": function (v) { return v.replace(/[^\d+]/g, "").length >= 7 ? "" : "Enter a mobile number we can text or call."; },
    };
    var firstBad = null;
    ids.forEach(function (id) {
      var ok = setError(id, rules[id](f(id).value));
      if (!ok && !firstBad) firstBad = id;
    });
    if (firstBad) f(firstBad).focus();
    return !firstBad;
  }

  function goStep(n) {
    step = n;
    f("step-1").hidden = n !== 1;
    f("step-2").hidden = n !== 2;
    f("b-back").hidden = n !== 2;
    f("b-next").innerHTML = n === 1 ? "Next: your details " + icon("i-arrow") : "Request booking " + icon("i-arrow");
    $$("[data-step-label]").forEach(function (li) {
      if (+li.dataset.stepLabel === n) li.setAttribute("aria-current", "step");
      else li.removeAttribute("aria-current");
    });
  }
  f("b-back").addEventListener("click", function () { goStep(1); f("b-dest").focus(); });

  function whenText() {
    var d = new Date(f("b-date").value + "T" + f("b-time").value);
    if (isNaN(d)) return f("b-date").value + " " + f("b-time").value;
    return d.toLocaleDateString("en-IE", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) + ", " + f("b-time").value;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (step === 1) {
      if (validate(["b-pickup", "b-dest", "b-date", "b-time"])) { goStep(2); f("b-name").focus(); }
      return;
    }
    if (!validate(["b-name", "b-phone"])) return;
    showDone();
  });

  function showDone() {
    var t = trip();
    var now = new Date();
    var ref = "KC-" + String(now.getFullYear()).slice(2) + pad(now.getMonth() + 1) + pad(now.getDate()) + "-" + Math.floor(100 + Math.random() * 900);
    var rows = [
      ["Pickup", f("b-pickup").value.trim()],
      ["Destination", f("b-dest").value.trim()],
      ["When", whenText()],
      ["Passengers", f("b-pax").value],
      ["Car", f("b-vehicle").value],
      ["Return trip", f("b-return").checked ? "Yes" : "No"],
    ];
    if (!f("flight-field").hidden && f("b-flight").value.trim()) rows.push(["Flight", f("b-flight").value.trim()]);
    rows.push(["Name", f("b-name").value.trim()], ["Mobile", f("b-phone").value.trim()]);
    if (f("b-email").value.trim()) rows.push(["Email", f("b-email").value.trim()]);
    if (f("b-notes").value.trim()) rows.push(["Notes", f("b-notes").value.trim()]);
    if (t.place) rows.push(["Distance", "about " + t.place.km + " km · " + t.place.min + " min"]);

    var text = "New booking request — Kilcullen Cabs\nRef: " + ref + "\n" + rows.map(function (r) { return r[0] + ": " + r[1]; }).join("\n");
    var actions = "";
    if (CFG.whatsapp) actions += '<a class="btn btn--amber btn--block" target="_blank" rel="noopener" href="' + waLink(text) + '">' + icon("i-whatsapp") + "Send booking on WhatsApp</a>";
    if (CFG.sms) actions += '<a class="btn btn--ghost btn--block" href="sms:' + CFG.sms + "?&body=" + encodeURIComponent(text) + '">' + icon("i-chat") + "Send booking by text message</a>";
    if (CFG.email) actions += '<a class="btn btn--ghost btn--block" href="mailto:' + encodeURIComponent(CFG.email) + "?subject=" + encodeURIComponent("Booking request " + ref) + "&body=" + encodeURIComponent(text) + '">' + icon("i-mail") + "Send booking by email</a>";
    if (CFG.phoneTel) actions += '<a class="btn btn--ghost btn--block" href="tel:' + CFG.phoneTel + '">' + icon("i-phone") + "Call " + esc(CFG.phoneDisplay) + " to confirm</a>";

    done.innerHTML =
      '<p class="done__ref"><small>Booking reference</small>' + ref + "</p>" +
      "<p class=\"done__note\">Almost done — send your booking below. It's confirmed once we reply with your price and pickup time.</p>" +
      "<dl>" + rows.map(function (r) { return "<div><dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("") + "</dl>" +
      '<div class="done__actions">' +
        (actions || '<p class="setup-note">Setup needed: add the phone, WhatsApp number or email in js/data.js so bookings reach you.</p>') +
        '<button class="btn btn--ghost btn--block" type="button" data-edit>Edit booking</button>' +
      "</div>";
    form.hidden = true;
    done.hidden = false;
    $$("[data-step-label]").forEach(function (li) {
      if (li.dataset.stepLabel === "3") li.setAttribute("aria-current", "step");
      else li.removeAttribute("aria-current");
    });
    done.focus();
  }
  done.addEventListener("click", function (e) {
    if (!e.target.closest("[data-edit]")) return;
    done.hidden = true;
    form.hidden = false;
    goStep(1);
    f("b-dest").focus();
  });

  function prefill(id) {
    var p = PLACES.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    f("b-dest").value = p.name;
    done.hidden = true;
    form.hidden = false;
    goStep(1);
    renderFare();
    $("#book").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    setTimeout(function () { f("b-date").focus({ preventScroll: true }); }, 450);
  }
  document.addEventListener("click", function (e) {
    var n = e.target.closest("[data-note]");
    if (n) {
      e.preventDefault();
      f("b-notes").value = n.dataset.note;
      f("b-dest").value = "";
      done.hidden = true;
      form.hidden = false;
      goStep(1);
      renderFare();
      $("#book").scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(function () { f("b-dest").focus({ preventScroll: true }); }, 450);
      return;
    }
    var b = e.target.closest("[data-prefill]");
    if (!b) return;
    e.preventDefault();
    prefill(b.dataset.prefill);
  });

  goStep(1);
  renderFare();

  /* ---------- Road-sign journeys ---------- */
  var GROUPS = [
    ["motorway", "Dublin & the motorway"],
    ["national", "Towns & train stations"],
    ["tourist", "Racecourses & shopping"],
  ];
  function pictFor(p) {
    if (p.airport) return icon("i-plane", "sign__pict");
    if (p.route === "Rail") return icon("i-train", "sign__pict");
    if (p.route === "Race days") return icon("i-shoe", "sign__pict");
    if (p.route === "Shopping") return icon("i-bag", "sign__pict");
    return icon("i-up", "sign__arrow");
  }
  $("#signs").innerHTML = GROUPS.map(function (g) {
    return '<p class="kicker sign-group">' + g[1] + "</p>" +
      PLACES.filter(function (p) { return p.sign === g[0]; }).map(function (p, i, list) {
        var span = list.length % 2 === 1 && i === list.length - 1 ? " sign--span" : "";
        return '<article class="sign sign--' + p.sign + span + '" data-place="' + p.id + '">' +
          '<div class="sign__top"><span class="sign__route">' + esc(p.route) + "</span>" + pictFor(p) + "</div>" +
          '<p class="sign__ga"' + (p.ga ? ' lang="ga"' : "") + ">" + esc(p.ga) + "</p>" +
          '<div class="sign__row"><h3 class="sign__name">' + esc(p.name) + '</h3><span class="sign__km">' + p.km + "<small> km</small></span></div>" +
          '<div class="sign__foot"><span>about <b>' + p.min + " min</b></span>" +
          '<button class="sign__book" type="button" data-prefill="' + p.id + '" aria-label="Book a cab to ' + esc(p.name) + '">Book ' + icon("i-arrow") + "</button></div>" +
        "</article>";
      }).join("");
  }).join("");

  /* ---------- Service-area map (radial scale spreads out nearby towns) ---------- */
  (function map() {
    var R = function (km) { return 70 * Math.pow(km, 0.55); };
    var size = 680;
    var short = function (n) { return n.replace(" Racecourse", "").replace(" Centre", "").replace(" & Naas Station", " Station"); };
    var rings = [10, 25, 50].map(function (km) {
      var r = R(km);
      return '<circle class="ring" cx="0" cy="0" r="' + r.toFixed(1) + '"/>' +
        '<text class="ring-label" x="' + (r * 0.71 + 8).toFixed(1) + '" y="' + (-r * 0.71 - 8).toFixed(1) + '">' + km + " km</text>";
    }).join("");
    var places = PLACES.map(function (p) {
      var d = Math.sqrt(p.x * p.x + p.y * p.y);
      var r = R(d);
      var x = (p.x / d) * r, y = -(p.y / d) * r;
      var right = x > 250 || x < -240; // label on the dot's left near the edges
      var quiet = p.route === "Rail" || p.id === "heuston" || p.id === "old-kilcullen";
      return '<g data-place="' + p.id + '"' + (quiet ? ' class="quiet"' : "") + ">" +
        '<line class="spoke" x1="0" y1="0" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '"/>' +
        '<circle class="dot dot--' + p.sign + '" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="13"/>' +
        '<text class="place-label" x="' + (x + (right ? -22 : 22)).toFixed(1) + '" y="' + (y + 12).toFixed(1) + '" text-anchor="' + (right ? "end" : "start") + '">' + esc(short(p.name)) + "</text>" +
      "</g>";
    }).join("");
    $("#map").innerHTML =
      '<svg class="map" viewBox="' + -size + " " + -size + " " + size * 2 + " " + size * 2 + '" role="img" aria-label="Map of popular destinations around Kilcullen">' +
        rings + places +
        '<circle class="home" cx="0" cy="0" r="20"/>' +
        '<text class="home-label" x="0" y="-38" text-anchor="middle">KILCULLEN</text>' +
      "</svg>";

    function setActive(id, on) {
      var g = $('#map g[data-place="' + id + '"]');
      if (g) g.classList.toggle("is-active", on);
      var s = $('.sign[data-place="' + id + '"]');
      if (s) s.classList.toggle("is-active", on);
    }
    $$(".sign").forEach(function (s) {
      var id = s.dataset.place;
      s.addEventListener("pointerenter", function () { setActive(id, true); });
      s.addEventListener("pointerleave", function () { setActive(id, false); });
      s.addEventListener("focusin", function () { setActive(id, true); });
      s.addEventListener("focusout", function () { setActive(id, false); });
    });
  })();
})();

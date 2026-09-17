/* NEXORA — interactions. Plain JS, no dependencies.
   Sections: intro · nav + rail · services · course pages · agent demo · tech orbit
             · why panels · counters · sliders · form · scroll effects */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var ICON = function (id, cls) {
    return '<svg class="' + (cls || "i") + '" viewBox="0 0 24 24" aria-hidden="true"><use href="#' + id + '"/></svg>';
  };

  /* ---------- Intro ---------- */
  (function intro() {
    var el = $("#intro");
    if (!el) return;
    function finish() {
      if (root.classList.contains("intro-done") && el.hidden) return;
      root.classList.add("intro-done");
      try { sessionStorage.setItem("nx-intro", "1"); } catch (e) {}
      setTimeout(function () { el.hidden = true; }, reduce ? 0 : 1300);
    }
    if (root.classList.contains("intro-done")) { el.hidden = true; return; }
    var timer = setTimeout(finish, 2700);
    var skip = function () { clearTimeout(timer); finish(); };
    $("#intro-skip").addEventListener("click", skip);
    el.addEventListener("click", skip);
    window.addEventListener("keydown", function once() { skip(); window.removeEventListener("keydown", once); });
  })();

  /* ---------- Nav, mobile menu, slide rail ---------- */
  var nav = $("#nav");
  var toggle = $(".nav__toggle");
  var menu = $("#menu");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
    document.body.classList.toggle("is-locked", open);
  }
  toggle.addEventListener("click", function () { setMenu(menu.hidden); });
  $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) { setMenu(false); toggle.focus(); } });

  var slides = $$("[data-slide]");
  var rail = $("#rail");
  var pad = function (n) { return (n < 10 ? "0" : "") + n; };
  rail.innerHTML =
    '<p class="rail__count" aria-hidden="true"><b id="rail-now">01</b> / ' + pad(slides.length) + "</p>" +
    slides.map(function (s) {
      return '<a href="#' + s.id + '"><span>' + esc(s.dataset.slide) + "</span></a>";
    }).join("");
  var railLinks = $$("a", rail);
  var navLinks = $$(".nav__links a");

  if ("IntersectionObserver" in window) {
    var slideIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var i = slides.indexOf(en.target);
        railLinks.forEach(function (a, j) { a.setAttribute("aria-current", String(i === j)); });
        $("#rail-now").textContent = pad(i + 1);
        navLinks.forEach(function (a) { a.setAttribute("aria-current", String(a.getAttribute("href") === "#" + en.target.id)); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    slides.forEach(function (s) { slideIO.observe(s); });
  }

  /* ---------- Services: tap to expand, pointer glow ---------- */
  $$(".svc__toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".svc");
      var open = !card.classList.contains("is-open");
      $$(".svc.is-open").forEach(function (c) {
        c.classList.remove("is-open");
        $(".svc__toggle", c).setAttribute("aria-expanded", "false");
      });
      card.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });
  $$(".svc, .social").forEach(function (card) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  /* ---------- Course detail pages (#course/<id>) ---------- */
  var coursePage = $("#course");
  var courses = window.NEXORA_COURSES || {};
  var lastFocus = null;

  function renderCourse(id, c) {
    var wa = (window.NEXORA_CONFIG || {}).whatsapp;
    var facts = [["Duration", c.duration], ["Skill level", c.level], ["Format", c.format], ["Certification", "Included"]];
    coursePage.innerHTML =
      '<div class="course__bar"><div class="wrap">' +
        '<a class="course__back" href="#academy" data-close>' + ICON("i-back") + "All courses</a>" +
        '<p class="course__crumbs">Academy / <b>' + esc(c.track) + "</b></p>" +
      "</div></div>" +
      '<header class="course__hero"><img class="course__hero-img" src="assets/img/course-' + id + '.webp" alt=""><div class="wrap">' +
        '<p class="eyebrow"><span class="eyebrow__idx">Course</span> ' + esc(c.track) + "</p>" +
        '<h2 class="course__title" id="course-title">' + esc(c.title) + "</h2>" +
        '<p class="course__desc">' + esc(c.description) + "</p>" +
        '<dl class="course__facts">' + facts.map(function (f) { return "<div><dt>" + f[0] + "</dt><dd>" + esc(f[1]) + "</dd></div>"; }).join("") + "</dl>" +
      "</div></header>" +
      '<div class="wrap course__body">' +
        "<div>" +
          '<section class="course__section"><h3 class="course__h">What You Will Learn</h3><ul class="learn">' +
            c.learn.map(function (l) { return "<li>" + ICON("i-check") + "<span>" + esc(l) + "</span></li>"; }).join("") +
          "</ul></section>" +
          '<section class="course__section"><h3 class="course__h">Projects</h3><ul class="projects-list">' +
            c.projects.map(function (p) { return "<li><b>" + esc(p[0]) + "</b><span>" + esc(p[1]) + "</span></li>"; }).join("") +
          "</ul></section>" +
          '<section class="course__section"><h3 class="course__h">Course Curriculum</h3><div class="curriculum">' +
            c.curriculum.map(function (m, i) {
              return "<details" + (i === 0 ? " open" : "") + '><summary><span class="curriculum__wk">' + esc(m[0]) + '</span><span class="curriculum__name">' + esc(m[1]) + '</span><span class="curriculum__plus" aria-hidden="true"></span></summary><ul>' +
                m[2].map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></details>";
            }).join("") +
          "</div></section>" +
        "</div>" +
        '<aside class="course__aside">' +
          '<div class="enroll metal-border">' +
            '<p class="enroll__track">' + esc(c.track) + "</p>" +
            '<p class="enroll__name">' + esc(c.title) + "</p>" +
            "<dl><div><dt>Duration</dt><dd>" + esc(c.duration) + "</dd></div><div><dt>Level</dt><dd>" + esc(c.level) + "</dd></div><div><dt>Certificate</dt><dd>" + esc(c.certificate) + "</dd></div><div><dt>Batches</dt><dd>Weekday &amp; weekend</dd></div></dl>" +
            '<a class="btn btn--gold" href="#contact" data-enroll="' + id + '">Enroll Now ' + ICON("i-arrow") + "</a>" +
            (wa
              ? '<a class="enroll__alt" target="_blank" rel="noopener" href="https://wa.me/' + wa + "?text=" + encodeURIComponent("Hello NEXORA, I have a question about " + c.title + ".") + '">Ask about this course on WhatsApp</a>'
              : '<a class="enroll__alt" href="#contact" data-ask="' + id + '">Talk to an advisor first</a>') +
          "</div>" +
          '<div class="instructor">' +
            '<div class="instructor__top"><span class="instructor__avatar">' + esc(c.instructor.initials) + '</span><div><p class="contact__k">Instructor</p><p class="instructor__role">' + esc(c.instructor.role) + "</p></div></div>" +
            '<p class="instructor__bio">' + esc(c.instructor.bio) + "</p>" +
            '<p class="note" style="margin-top:14px">Add instructor name and photo before launch.</p>' +
          "</div>" +
        "</aside>" +
      "</div>";
  }

  function openCourse(id) {
    var c = courses[id];
    if (!c) return false;
    if (coursePage.hidden) lastFocus = document.activeElement;
    renderCourse(id, c);
    coursePage.hidden = false;
    coursePage.scrollTop = 0;
    document.body.classList.add("is-locked");
    document.title = c.title + " — NEXORA Academy";
    var back = $(".course__back", coursePage);
    if (back) back.focus({ preventScroll: true });
    return true;
  }
  function closeCourse() {
    if (coursePage.hidden) return;
    coursePage.hidden = true;
    coursePage.innerHTML = "";
    document.body.classList.remove("is-locked");
    document.title = "NEXORA";
  }
  function prefill(id, mode) {
    var c = courses[id];
    if (!c) return;
    var sel = $("#f-service");
    var label = "Academy — " + c.title;
    $$("option", sel).forEach(function (o) { if (o.textContent === label) sel.value = o.value || o.textContent; });
    var msg = $("#f-msg");
    if (!msg.value) {
      msg.value = mode === "enroll"
        ? "I'd like to enroll in " + c.title + ". Please share the next batch dates and fees."
        : "I have a few questions about " + c.title + " before enrolling.";
    }
  }
  coursePage.addEventListener("click", function (e) {
    var en = e.target.closest("[data-enroll]");
    var ask = e.target.closest("[data-ask]");
    if (en) prefill(en.dataset.enroll, "enroll");
    if (ask) prefill(ask.dataset.ask, "ask");
  });
  coursePage.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { location.hash = "academy"; return; }
    if (e.key !== "Tab") return;
    var f = $$('a[href], button, summary, [tabindex]:not([tabindex="-1"])', coursePage);
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  function route() {
    var m = location.hash.match(/^#course\/([\w-]+)/);
    if (m && openCourse(m[1])) return;
    var wasOpen = !coursePage.hidden;
    closeCourse();
    if (wasOpen) {
      var target = location.hash && document.getElementById(location.hash.slice(1));
      if (target) target.scrollIntoView({ behavior: "auto" });
      if (location.hash === "#contact") setTimeout(function () { $("#f-name").focus({ preventScroll: true }); }, 50);
      else if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
  }
  window.addEventListener("hashchange", route);
  route();

  /* ---------- AI agent demo ---------- */
  (function agentDemo() {
    var data = window.NEXORA_AGENT || [];
    var tabs = $("#console-tabs"), body = $("#console-body"), caps = $$("#caps li"), consoleEl = $("#console");
    if (!tabs || !body || !data.length) return;

    var current = 0, run = 0, auto = true, inView = false, hovering = false;

    tabs.innerHTML = data.map(function (s, i) {
      return '<button type="button" role="tab" id="tab-' + i + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' + esc(s.tab) + "</button>";
    }).join("");
    var tabBtns = $$("button", tabs);

    function setCap(i) { caps.forEach(function (li, j) { li.classList.toggle("is-active", j === i); }); }

    function paint(s, state) {
      // state: "done" renders the finished run; "start" renders an empty run ready to animate
      var done = state === "done";
      body.innerHTML =
        '<div class="msg"><span class="msg__who">YOU</span><p class="msg__text" data-prompt>' + (done ? esc(s.prompt) : "") + "</p></div>" +
        '<div class="msg"><span class="msg__who"><svg class="mark" viewBox="0 0 64 64" style="width:16px;height:16px" aria-hidden="true"><use href="#nx-mark"/></svg></span><div class="plan" style="flex:1">' +
          s.steps.map(function (st) {
            return '<div class="step" data-state="' + (done ? "done" : "queued") + '"><span class="step__dot" aria-hidden="true"></span><span>' + esc(st[0]) + '</span><span class="step__tool">' + esc(st[1]) + "</span></div>";
          }).join("") +
        "</div></div>" +
        '<div class="result' + (done ? "" : " is-pending") + '"><div><p class="result__label">Output</p><p class="result__title">' + esc(s.result.title) + "</p><ul>" +
          s.result.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") +
        '</ul></div><div class="bars" aria-hidden="true">' +
          s.result.bars.map(function (h) { return '<i style="height:' + h + '%"></i>'; }).join("") +
        "</div></div>";
      if (done) setCap(s.steps[s.steps.length - 1][2]);
    }

    function select(i) {
      current = i;
      tabBtns.forEach(function (b, j) {
        b.setAttribute("aria-selected", String(i === j));
        b.tabIndex = i === j ? 0 : -1;
      });
      body.setAttribute("aria-labelledby", "tab-" + i);
    }

    async function play(i) {
      var id = ++run;
      var s = data[i];
      select(i);
      if (reduce) { paint(s, "done"); return; }
      paint(s, "start");
      var prompt = $("[data-prompt]", body);
      prompt.classList.add("is-typing");
      setCap(0);
      for (var c = 1; c <= s.prompt.length; c++) {
        if (id !== run) return;
        prompt.textContent = s.prompt.slice(0, c);
        await sleep(16);
      }
      prompt.classList.remove("is-typing");
      var steps = $$(".step", body);
      for (var k = 0; k < steps.length; k++) {
        if (id !== run) return;
        steps[k].dataset.state = "running";
        setCap(s.steps[k][2]);
        await sleep(760);
        if (id !== run) return;
        steps[k].dataset.state = "done";
      }
      await sleep(200);
      if (id !== run) return;
      $(".result", body).classList.remove("is-pending");
      await sleep(4200);
      if (id !== run) return;
      if (auto && inView && !hovering) play((i + 1) % data.length);
    }

    tabBtns.forEach(function (b, i) {
      b.addEventListener("click", function () { auto = false; play(i); });
      b.addEventListener("keydown", function (e) {
        var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        var n = (i + d + tabBtns.length) % tabBtns.length;
        tabBtns[n].focus();
        auto = false;
        play(n);
      });
    });
    consoleEl.addEventListener("pointerenter", function () { hovering = true; });
    consoleEl.addEventListener("pointerleave", function () { hovering = false; });

    // Resting state: the first scenario, finished.
    select(0);
    paint(data[0], "done");

    if ("IntersectionObserver" in window && !reduce) {
      var started = false;
      new IntersectionObserver(function (en) {
        inView = en[0].isIntersecting;
        if (inView && !started) { started = true; play(0); }
      }, { threshold: 0.35 }).observe(consoleEl);
    }
  })();

  /* ---------- Technology orbit ---------- */
  (function techOrbit() {
    var info = {
      ai: ["AI", "Language models, vision and prediction built into products and workflows."],
      python: ["Python", "AI models, data pipelines, automation scripts and back-end services."],
      javascript: ["JavaScript", "Interactive interfaces and full-stack web applications."],
      react: ["React", "Fast, component-based web apps and dashboards."],
      node: ["Node.js", "APIs, real-time features and scalable server logic."],
      cloud: ["Cloud", "Hosting, storage and deployments that scale on demand."],
      automation: ["Automation", "Workflows that move data between your tools with no manual work."],
      apis: ["APIs", "Connecting payments, CRMs, messaging and AI services."],
      databases: ["Databases", "Reliable storage for customers, orders and analytics."],
      security: ["Cybersecurity", "Secure logins, data protection and regular audits."],
      analytics: ["Analytics", "Dashboards and reports that turn data into decisions."],
    };
    var btns = $$("[data-tech]");
    var name = $("#core .core__name"), desc = $("#core .core__desc");
    if (!name) return;
    function show(btn) {
      var d = info[btn.dataset.tech];
      if (!d) return;
      btns.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      name.textContent = d[0];
      desc.textContent = d[1];
    }
    btns.forEach(function (b) {
      b.addEventListener("click", function () { show(b); });
      b.addEventListener("pointerenter", function () { show(b); });
      b.addEventListener("focus", function () { show(b); });
    });
  })();

  /* ---------- Why NEXORA: vertical scroll drives horizontal panels ---------- */
  var why = $("#why"), whyTrack = $("#why-track"), whyBar = $("#why-progress");
  var whyDistance = 0;
  function layoutWhy() {
    if (!why) return;
    var pin = window.innerWidth >= 1080 && !reduce;
    why.classList.toggle("why--pinned", pin);
    if (!pin) {
      why.style.height = "";
      whyTrack.style.transform = "";
      whyDistance = 0;
      return;
    }
    whyDistance = Math.max(0, whyTrack.scrollWidth - whyTrack.clientWidth);
    why.style.height = (window.innerHeight + whyDistance) + "px";
  }
  function scrollWhy() {
    if (!whyDistance) return;
    var top = why.getBoundingClientRect().top;
    var p = Math.min(1, Math.max(0, -top / whyDistance));
    whyTrack.style.transform = "translate3d(" + (-p * whyDistance).toFixed(1) + "px,0,0)";
    whyBar.style.setProperty("--p", p.toFixed(3));
  }
  if (whyTrack && !reduce) {
    whyTrack.addEventListener("scroll", function () {
      var max = whyTrack.scrollWidth - whyTrack.clientWidth;
      if (max > 0) whyBar.style.setProperty("--p", (whyTrack.scrollLeft / max).toFixed(3));
    }, { passive: true });
  }

  /* ---------- Animated counters ---------- */
  (function counters() {
    var nums = $$("[data-count]");
    if (!nums.length || reduce || !("IntersectionObserver" in window)) return;
    var fmt = function (n) { return Math.round(n).toLocaleString("en-US"); };
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      var t0 = performance.now();
      (function tick(now) {
        var k = Math.min(1, (now - t0) / 1600);
        var e = 1 - Math.pow(1 - k, 4);
        nums.forEach(function (n) { n.textContent = fmt(+n.dataset.count * e); });
        if (k < 1) requestAnimationFrame(tick);
      })(t0);
    }, { threshold: 0.5 });
    io.observe($("#stats"));
  })();

  /* ---------- Success slider (scroll-snap + controls) ---------- */
  $$("[data-slider]").forEach(function (sl) {
    var track = $(".slider__track", sl), prev = $("[data-prev]", sl), next = $("[data-next]", sl), bar = $(".slider__bar i", sl);
    function step() { var card = track.firstElementChild; return card ? card.getBoundingClientRect().width + 16 : 300; }
    function update() {
      var max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max - 2;
      bar.style.setProperty("--w", Math.min(100, (track.clientWidth / track.scrollWidth) * 100) + "%");
      bar.style.setProperty("--x", ((track.scrollLeft / track.clientWidth) * 100) + "%");
    }
    prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: reduce ? "auto" : "smooth" }); });
    next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: reduce ? "auto" : "smooth" }); });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });

  /* ---------- Project showcase (full-width slides) ---------- */
  (function work() {
    var box = $("#work-slider");
    if (!box) return;
    var track = $(".work__track", box), items = $$(".project", box), tabs = $$("[data-go]", box);
    var i = 0;
    function go(n) {
      i = (n + items.length) % items.length;
      track.style.transform = "translateX(" + (-i * 100) + "%)";
      items.forEach(function (it, j) {
        it.setAttribute("aria-hidden", String(i !== j));
        if ("inert" in it) it.inert = i !== j;
      });
      tabs.forEach(function (t, j) { t.setAttribute("aria-current", String(i === j)); });
    }
    $("[data-prev]", box).addEventListener("click", function () { go(i - 1); });
    $("[data-next]", box).addEventListener("click", function () { go(i + 1); });
    tabs.forEach(function (t) { t.addEventListener("click", function () { go(+t.dataset.go); }); });
    box.addEventListener("keydown", function (e) {
      if (e.target.closest("input,textarea,select")) return;
      if (e.key === "ArrowRight") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
    });
    var x0 = null;
    track.addEventListener("pointerdown", function (e) { x0 = e.clientX; });
    track.addEventListener("pointerup", function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
    });
    go(0);
  })();

  /* ---------- Contact form ---------- */
  (function contact() {
    var form = $("#contact-form"), done = $("#form-done");
    if (!form) return;
    var cfg = window.NEXORA_CONFIG || {};
    var rules = {
      "f-name": function (v) { return v.trim() ? "" : "Enter your name."; },
      "f-email": function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter a valid email, like name@company.com."; },
      "f-service": function (v) { return v ? "" : "Choose the service or course you need."; },
      "f-msg": function (v) { return v.trim().length >= 10 ? "" : "Tell us a little more — at least 10 characters."; },
    };
    function check(id) {
      var el = document.getElementById(id);
      var msg = rules[id](el.value);
      var err = document.getElementById(id + "-err");
      if (msg) {
        if (!err) {
          err = document.createElement("p");
          err.className = "field__err";
          err.id = id + "-err";
          el.parentNode.appendChild(err);
        }
        err.textContent = msg;
        el.setAttribute("aria-invalid", "true");
        el.setAttribute("aria-describedby", err.id);
      } else if (err) {
        err.remove();
        el.removeAttribute("aria-invalid");
        el.removeAttribute("aria-describedby");
      }
      return !msg;
    }
    Object.keys(rules).forEach(function (id) {
      document.getElementById(id).addEventListener("blur", function () { if (this.value) check(id); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var bad = Object.keys(rules).filter(function (id) { return !check(id); });
      if (bad.length) { document.getElementById(bad[0]).focus(); return; }
      var v = function (id) { return document.getElementById(id).value.trim(); };
      var text = "Hello NEXORA,\n\n" + v("f-msg") + "\n\nName: " + v("f-name") + "\nEmail: " + v("f-email") +
        (v("f-phone") ? "\nPhone: " + v("f-phone") : "") + (v("f-company") ? "\nCompany: " + v("f-company") : "") + "\nService: " + v("f-service");
      var actions = "";
      if (cfg.whatsapp) actions += '<a class="btn btn--gold" target="_blank" rel="noopener" href="https://wa.me/' + encodeURIComponent(cfg.whatsapp) + "?text=" + encodeURIComponent(text) + '">Send on WhatsApp ' + ICON("g-whatsapp") + "</a>";
      if (cfg.email) actions += '<a class="btn btn--ghost" href="mailto:' + encodeURIComponent(cfg.email) + "?subject=" + encodeURIComponent("New enquiry — " + v("f-service")) + "&body=" + encodeURIComponent(text) + '">Send by email</a>';
      done.innerHTML =
        '<p class="eyebrow">Message ready</p>' +
        "<h3>Thank you, " + esc(v("f-name").split(" ")[0]) + ".</h3>" +
        "<p>Your enquiry about <b>" + esc(v("f-service")) + "</b> is ready. " + (actions ? "Choose how you'd like to send it:" : "") + "</p>" +
        (actions ? '<div class="form__done-actions">' + actions + "</div>" : '<p class="note">Setup: add your WhatsApp number or email in js/data.js so enquiries are delivered.</p>') +
        '<div><button class="link-arrow" type="button" data-reset>Write another message ' + ICON("i-arrow") + "</button></div>";
      form.hidden = true;
      done.hidden = false;
      done.focus();
    });
    done.addEventListener("click", function (e) {
      if (!e.target.closest("[data-reset]")) return;
      form.reset();
      done.hidden = true;
      form.hidden = false;
      $("#f-name").focus();
    });
  })();

  /* ---------- Success: stacked card reveal ---------- */
  var stackCards = $$("#stack .story"), stackNow = $("#stack-now"), stackTops = [];
  function layoutStack() {
    stackTops = stackCards.map(function (c) { return parseFloat(getComputedStyle(c).top) || 0; });
  }
  function scrollStack() {
    if (!stackCards.length) return;
    var active = 0;
    for (var i = 0; i < stackCards.length; i++) {
      var c = stackCards[i], next = stackCards[i + 1];
      var r = c.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.55) active = i;
      if (!next || reduce) continue;
      var p = 1 - (next.getBoundingClientRect().top - stackTops[i]) / r.height;
      p = Math.min(1, Math.max(0, p));
      c.style.transform = "scale(" + (1 - p * 0.07).toFixed(4) + ")";
      c.style.setProperty("--dim", (p * 0.55).toFixed(3));
    }
    if (stackNow) stackNow.textContent = pad(active + 1);
  }

  /* ---------- Scroll-linked: nav state, hero parallax, why panels ---------- */
  var heroVisual = $(".hero__visual"), heroGlow = $(".hero__glow");
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 24);
    if (!reduce && y < window.innerHeight * 1.2) {
      if (heroVisual) heroVisual.style.transform = "translate3d(0," + (y * 0.12).toFixed(1) + "px,0)";
      if (heroGlow) heroGlow.style.transform = "translate3d(0," + (y * 0.25).toFixed(1) + "px,0)";
    }
    scrollWhy();
    scrollStack();
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  var resizeT;
  window.addEventListener("resize", function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(function () { layoutWhy(); layoutStack(); onScroll(); }, 120);
  });
  layoutWhy();
  layoutStack();
  onScroll();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { layoutWhy(); onScroll(); });
})();

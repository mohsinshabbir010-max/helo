/* NEXORA — hero particle core: a rotating gold/platinum point sphere with an orbit belt.
   Canvas 2D, DPR-capped, pauses when off-screen or the tab is hidden. */
(function () {
  var canvas = document.getElementById("core-canvas");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var W = 0, H = 0, pts = [], raf = 0, onScreen = true, t = 0.6;
  var pointer = { x: 0, y: 0, tx: 0, ty: 0 };

  function build() {
    var n = window.innerWidth < 700 ? 240 : 480;
    pts = [];
    var golden = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < n; i++) {
      var y = 1 - (i / (n - 1)) * 2;
      var r = Math.sqrt(1 - y * y);
      var th = i * golden;
      pts.push({ x: Math.cos(th) * r, y: y, z: Math.sin(th) * r, gold: Math.random() < 0.28, s: 1 });
    }
    var belt = Math.round(n / 2.5);
    for (var j = 0; j < belt; j++) {
      var a = Math.random() * Math.PI * 2;
      var rr = 1.38 + Math.random() * 0.3;
      pts.push({ x: Math.cos(a) * rr, y: (Math.random() - 0.5) * 0.05, z: Math.sin(a) * rr, gold: Math.random() < 0.6, s: 0.8 });
    }
  }

  function size() {
    var rect = canvas.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width;
    H = rect.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    if (!reduce) t += 0.0032;
    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;

    ctx.clearRect(0, 0, W, H);
    var cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.3;

    var glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.7);
    glow.addColorStop(0, "rgba(200,162,74,0.20)");
    glow.addColorStop(0.55, "rgba(200,162,74,0.05)");
    glow.addColorStop(1, "rgba(200,162,74,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    var ay = t + pointer.x * 0.5;
    var ax = -0.38 + pointer.y * 0.35;
    var cY = Math.cos(ay), sY = Math.sin(ay), cX = Math.cos(ax), sX = Math.sin(ax);

    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      var x = p.x * cY - p.z * sY;
      var z = p.x * sY + p.z * cY;
      var y = p.y * cX - z * sX;
      z = p.y * sX + z * cX;
      var persp = 1.6 / (2.4 - z * 0.7);
      var sx = cx + x * R * persp;
      var sy = cy + y * R * persp;
      var depth = (z + 1.7) / 3.4;
      var d = Math.max(0.6, 1.7 * persp * p.s);
      ctx.globalAlpha = 0.08 + depth * depth * 0.92;
      ctx.fillStyle = p.gold ? "#e9cf8c" : "#d8dce2";
      ctx.fillRect(sx - d / 2, sy - d / 2, d, d);
    }
    ctx.globalAlpha = 1;
  }

  function loop() {
    draw();
    raf = onScreen && !document.hidden && !reduce ? requestAnimationFrame(loop) : 0;
  }
  function start() { if (!raf && !reduce) raf = requestAnimationFrame(loop); }

  build();
  size();
  draw();
  start();

  if ("ResizeObserver" in window) {
    new ResizeObserver(function () { size(); draw(); }).observe(canvas);
  } else {
    window.addEventListener("resize", function () { size(); draw(); });
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      onScreen = entries[0].isIntersecting;
      if (onScreen) start();
    }).observe(canvas);
  }
  document.addEventListener("visibilitychange", function () { if (!document.hidden) start(); });

  var hero = document.getElementById("top");
  if (hero && !reduce) {
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      pointer.tx = (e.clientX - r.left) / r.width - 0.5;
      pointer.ty = (e.clientY - r.top) / r.height - 0.5;
    });
  }
})();

/* Swipe deck: swipe left for next, right for back.
   Also: arrow keys, space, Home/End, the arrow buttons, the dots,
   the contents menu, #hash deep links and the browser back button. */

(function () {
  "use strict";

  var deck = document.getElementById("deck");
  var track = document.getElementById("track");
  var dotsEl = document.getElementById("dots");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var progressFill = document.getElementById("progressFill");
  var counter = document.getElementById("counter");
  var live = document.getElementById("live");
  var menu = document.getElementById("menu");
  var menuBtn = document.getElementById("menuBtn");
  var menuClose = document.getElementById("menuClose");
  var menuList = document.getElementById("menuList");

  var STORE_KEY = "wctw:pledges";
  var index = 0;
  var pageEls = [];
  var dotEls = [];
  var menuBtns = [];
  var suppressHash = false;

  /* ---------- pledge storage ---------- */

  function loadPledges() {
    try {
      var raw = window.localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function savePledges(list) {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(list));
    } catch (e) {
      /* private mode or file:// restrictions: pledges just do not persist */
    }
  }

  function togglePledge(id) {
    var list = loadPledges();
    var at = list.indexOf(id);
    if (at === -1) list.push(id); else list.splice(at, 1);
    savePledges(list);
    return at === -1;
  }

  /* ---------- building ---------- */

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function addStat(parent, stat) {
    if (!stat) return;
    var wrap = el("div", "stat");
    wrap.appendChild(el("p", "stat-value", stat.value));
    wrap.appendChild(el("p", "stat-label", stat.label));
    parent.appendChild(wrap);
  }

  function addBody(parent, paragraphs) {
    if (!paragraphs) return;
    var wrap = el("div", "body");
    paragraphs.forEach(function (text) {
      wrap.appendChild(el("p", null, text));
    });
    parent.appendChild(wrap);
  }

  function addPledgeButton(parent, page) {
    var picked = loadPledges().indexOf(page.id) !== -1;
    var btn = el("button", "pledge-btn");
    btn.type = "button";
    btn.setAttribute("aria-pressed", picked ? "true" : "false");

    var tick = el("span", "tick", picked ? "✓" : "+");
    btn.appendChild(tick);
    btn.appendChild(el("span", null, "I am in"));

    btn.addEventListener("click", function () {
      var now = togglePledge(page.id);
      btn.setAttribute("aria-pressed", now ? "true" : "false");
      tick.textContent = now ? "✓" : "+";
      say(now ? "Added: " + page.pledge : "Removed: " + page.pledge);
    });

    var row = el("div", "btn-row");
    row.appendChild(btn);
    parent.appendChild(row);
  }

  function renderPledgePage(section, page) {
    var picked = loadPledges();
    var chosen = PAGES.filter(function (p) {
      return p.pledge && picked.indexOf(p.id) !== -1;
    });

    section.innerHTML = "";
    var inner = el("div", "page-inner");
    section.appendChild(inner);

    inner.appendChild(el("p", "eyebrow", page.eyebrow));
    inner.appendChild(el("h2", null, page.title));

    if (!chosen.length) {
      inner.appendChild(el("p", "body", page.empty));
      return;
    }

    inner.appendChild(el("p", "pledge-count", String(chosen.length)));
    inner.appendChild(el("p", "stat-label", page.lede));

    var list = el("ul", "pledge-list");
    chosen.forEach(function (p) {
      var li = el("li");
      li.appendChild(el("span", "tick", "✓"));
      li.appendChild(el("span", null, p.pledge));
      list.appendChild(li);
    });
    inner.appendChild(list);

    inner.appendChild(el("p", "body", page.outro));

    var reset = el("button", "restart", "Clear my picks");
    reset.type = "button";
    reset.addEventListener("click", function () {
      savePledges([]);
      renderPledgePage(section, page);
      say("Picks cleared");
    });
    var row = el("div", "btn-row");
    row.appendChild(reset);
    inner.appendChild(row);
  }

  function buildPage(page, i) {
    var section = el("section", "page " + page.kind);
    section.id = "page-" + page.id;
    section.style.setProperty("--accent", page.accent);
    section.setAttribute("role", "group");
    section.setAttribute("aria-roledescription", "slide");
    section.setAttribute("aria-label", (i + 1) + " of " + PAGES.length + ": " + page.menu);

    if (page.kind === "pledge") {
      section.dataset.dynamic = "1";
      renderPledgePage(section, page);
      return section;
    }

    var inner = el("div", "page-inner");
    section.appendChild(inner);

    if (page.kind === "hero") {
      inner.appendChild(el("h1", null, page.title));
      inner.appendChild(el("p", "lede", page.lede));
      if (page.hint) {
        var hint = el("p", "hint");
        hint.appendChild(el("span", "arrow", "←"));
        hint.appendChild(el("span", null, "Swipe left to start"));
        inner.appendChild(hint);
      }
      return section;
    }

    inner.appendChild(el("p", "eyebrow", page.eyebrow));
    inner.appendChild(el("h2", null, page.title));

    if (page.kind === "sources") {
      inner.appendChild(el("p", "stat-label", page.lede));
      var list = el("ul", "sources");
      page.items.forEach(function (item) {
        var li = el("li");
        var a = el("a", null, item.label);
        a.href = item.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        li.appendChild(a);
        list.appendChild(li);
      });
      inner.appendChild(list);
      return section;
    }

    addStat(inner, page.stat);
    addBody(inner, page.body);
    if (page.note) inner.appendChild(el("p", "note", page.note));

    if (page.todo) {
      var box = el("div");
      box.appendChild(el("p", "todo-title", "Do this"));
      var ul = el("ul", "todo");
      page.todo.forEach(function (text) {
        ul.appendChild(el("li", null, text));
      });
      box.appendChild(ul);
      inner.appendChild(box);
    }

    if (page.pledge) addPledgeButton(inner, page);

    return section;
  }

  function build() {
    PAGES.forEach(function (page, i) {
      var section = buildPage(page, i);
      pageEls.push(section);
      track.appendChild(section);

      var dotItem = document.createElement("li");
      var dot = el("button", "dot");
      dot.type = "button";
      dot.setAttribute("aria-label", "Go to page " + (i + 1) + ": " + page.menu);
      dot.addEventListener("click", function () { goTo(i, true); });
      dotItem.appendChild(dot);
      dotsEl.appendChild(dotItem);
      dotEls.push(dot);

      var menuItem = document.createElement("li");
      var link = el("button", null, page.menu);
      link.type = "button";
      link.addEventListener("click", function () {
        closeMenu();
        goTo(i, true);
      });
      menuItem.appendChild(link);
      menuList.appendChild(menuItem);
      menuBtns.push(link);
    });
  }

  /* ---------- navigation ---------- */

  function say(text) { live.textContent = text; }

  function setHash(id, push) {
    var hash = "#" + id;
    if (location.hash === hash) return;
    suppressHash = true;
    try {
      if (push) history.pushState(null, "", hash);
      else history.replaceState(null, "", hash);
    } catch (e) {
      location.hash = id;
    }
    window.setTimeout(function () { suppressHash = false; }, 0);
  }

  function translate(px, animate) {
    track.classList.toggle("animate", !!animate);
    track.style.transform = "translate3d(" + px + "px, 0, 0)";
  }

  function goTo(i, push) {
    index = Math.max(0, Math.min(PAGES.length - 1, i));
    var page = PAGES[index];

    translate(-index * deck.clientWidth, true);

    document.documentElement.style.setProperty("--accent", page.accent);
    progressFill.style.width = ((index + 1) / PAGES.length * 100) + "%";
    progressFill.style.background = page.accent;
    counter.textContent = (index + 1) + " / " + PAGES.length;

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === PAGES.length - 1;

    dotEls.forEach(function (dot, n) {
      dot.setAttribute("aria-current", n === index ? "true" : "false");
    });
    menuBtns.forEach(function (btn, n) {
      btn.setAttribute("aria-current", n === index ? "true" : "false");
    });

    pageEls.forEach(function (section, n) {
      section.setAttribute("aria-hidden", n === index ? "false" : "true");
      section.inert = n !== index;
    });

    var current = pageEls[index];
    current.scrollTop = 0;
    if (current.dataset.dynamic) renderPledgePage(current, page);

    setHash(page.id, push);
    say(page.menu + ". Page " + (index + 1) + " of " + PAGES.length + ".");
  }

  function next() { if (index < PAGES.length - 1) goTo(index + 1, true); }
  function prev() { if (index > 0) goTo(index - 1, true); }

  function indexFromHash() {
    var id = decodeURIComponent(location.hash.replace(/^#/, "")).replace(/^page-/, "");
    if (!id) return 0;
    for (var i = 0; i < PAGES.length; i++) {
      if (PAGES[i].id === id) return i;
    }
    var n = parseInt(id, 10);
    return isNaN(n) ? 0 : Math.max(0, Math.min(PAGES.length - 1, n - 1));
  }

  /* ---------- swipe ----------
     One gesture state machine, fed by touch events on touch screens and by
     pointer events for mouse and pen. Touch is handled directly rather than
     through pointer events: mobile Chrome hands the gesture to the scrolling
     page and fires pointercancel after a single pointermove, so a pointer-only
     implementation never sees the swipe. A non-passive touchmove that calls
     preventDefault once the drag is horizontal keeps the gesture ours. */

  var startX = 0, startY = 0, startTime = 0, delta = 0;
  var axis = null;      /* null = undecided, "x" = ours, "y" = the page scrolls */
  var active = false;
  var dragged = false;  /* a drag that ends on a link must not also click it */

  function gestureStart(x, y, time) {
    active = true;
    dragged = false;
    startX = x;
    startY = y;
    startTime = time;
    delta = 0;
    axis = null;
  }

  /* returns true once the drag belongs to the deck */
  function gestureMove(x, y) {
    if (!active) return false;

    var dx = x - startX;
    var dy = y - startY;

    if (axis === null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return false;
      axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (axis !== "x") return false;

    var width = deck.clientWidth;
    var atEdge = (index === 0 && dx > 0) || (index === PAGES.length - 1 && dx < 0);
    delta = atEdge ? dx * 0.3 : dx;
    translate(-index * width + delta, false);
    return true;
  }

  function gestureEnd(time) {
    if (!active) return;
    active = false;
    if (axis !== "x") { axis = null; return; }
    axis = null;
    if (Math.abs(delta) > 8) dragged = true;

    var width = deck.clientWidth;
    var elapsed = Math.max(1, time - startTime);
    var velocity = delta / elapsed;
    var flick = Math.abs(velocity) > 0.45 && Math.abs(delta) > 24;

    if (delta < 0 && (flick || -delta > width * 0.22)) next();
    else if (delta > 0 && (flick || delta > width * 0.22)) prev();
    else translate(-index * width, true);

    delta = 0;
  }

  /* the browser took the gesture: commit it if it had already gone far enough,
     otherwise snap back */
  function gestureCancel(time) {
    if (!active) return;
    if (axis === "x" && Math.abs(delta) > 8) { gestureEnd(time); return; }
    active = false;
    axis = null;
    delta = 0;
    translate(-index * deck.clientWidth, true);
  }

  function onTouchStart(e) {
    if (e.touches.length !== 1) { gestureCancel(e.timeStamp); return; }
    var t = e.touches[0];
    gestureStart(t.clientX, t.clientY, e.timeStamp);
  }

  function onTouchMove(e) {
    if (e.touches.length !== 1) { gestureCancel(e.timeStamp); return; }
    var t = e.touches[0];
    /* claim the gesture so the browser cannot scroll and cancel it */
    if (gestureMove(t.clientX, t.clientY) && e.cancelable) e.preventDefault();
  }

  function onTouchEnd(e) { gestureEnd(e.timeStamp); }
  function onTouchCancel(e) { gestureCancel(e.timeStamp); }

  function onPointerDown(e) {
    if (e.pointerType === "touch") return;
    if (e.button !== 0) return;
    gestureStart(e.clientX, e.clientY, e.timeStamp);
  }

  function onPointerMove(e) {
    if (e.pointerType === "touch" || !active) return;
    if (gestureMove(e.clientX, e.clientY) && axis === "x") {
      try { deck.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    }
  }

  function onPointerUp(e) {
    if (e.pointerType === "touch") return;
    gestureEnd(e.timeStamp);
  }

  function onPointerCancel(e) {
    if (e.pointerType === "touch") return;
    gestureCancel(e.timeStamp);
  }

  /* ---------- contents menu ---------- */

  function openMenu() {
    menu.hidden = false;
    deck.inert = true;
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtns[index].focus();
  }

  function closeMenu() {
    menu.hidden = true;
    deck.inert = false;
    menuBtn.setAttribute("aria-expanded", "false");
  }

  /* ---------- wiring ---------- */

  build();

  deck.addEventListener("touchstart", onTouchStart, { passive: true });
  deck.addEventListener("touchmove", onTouchMove, { passive: false });
  deck.addEventListener("touchend", onTouchEnd, { passive: true });
  deck.addEventListener("touchcancel", onTouchCancel, { passive: true });

  deck.addEventListener("pointerdown", onPointerDown, { passive: true });
  deck.addEventListener("pointermove", onPointerMove, { passive: true });
  deck.addEventListener("pointerup", onPointerUp, { passive: true });
  deck.addEventListener("pointercancel", onPointerCancel, { passive: true });
  deck.addEventListener("click", function (e) {
    if (!dragged) return;
    dragged = false;
    e.preventDefault();
    e.stopPropagation();
  }, true);

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
  menuBtn.addEventListener("click", openMenu);
  menuClose.addEventListener("click", closeMenu);
  menu.addEventListener("click", function (e) {
    if (e.target === menu) closeMenu();
  });

  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    if (e.key === "Escape") {
      if (!menu.hidden) { closeMenu(); menuBtn.focus(); }
      return;
    }
    if (!menu.hidden) return;

    var tag = document.activeElement ? document.activeElement.tagName : "";
    var typing = tag === "INPUT" || tag === "TEXTAREA";
    if (typing) return;

    switch (e.key) {
      case "ArrowRight":
      case "PageDown":
        e.preventDefault(); next(); break;
      case "ArrowLeft":
      case "PageUp":
        e.preventDefault(); prev(); break;
      case " ":
      case "Spacebar":
        if (document.activeElement === document.body) { e.preventDefault(); next(); }
        break;
      case "Home":
        e.preventDefault(); goTo(0, true); break;
      case "End":
        e.preventDefault(); goTo(PAGES.length - 1, true); break;
      case "m":
        e.preventDefault(); openMenu(); break;
    }
  });

  /* trackpad / shift-wheel horizontal scrolling */
  var wheelLock = false;
  deck.addEventListener("wheel", function (e) {
    var dx = e.shiftKey ? e.deltaY : e.deltaX;
    if (Math.abs(dx) < 25 || Math.abs(dx) < Math.abs(e.deltaY) && !e.shiftKey) return;
    if (wheelLock) return;
    wheelLock = true;
    window.setTimeout(function () { wheelLock = false; }, 550);
    if (dx > 0) next(); else prev();
  }, { passive: true });

  window.addEventListener("popstate", function () {
    if (suppressHash) return;
    goTo(indexFromHash(), false);
  });

  window.addEventListener("hashchange", function () {
    if (suppressHash) return;
    goTo(indexFromHash(), false);
  });

  var resizeTimer;
  window.addEventListener("resize", function () {
    translate(-index * deck.clientWidth, false);
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      translate(-index * deck.clientWidth, false);
    }, 120);
  });

  goTo(indexFromHash(), false);
})();

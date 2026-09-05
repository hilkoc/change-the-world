/* Swipe deck, two axes.

   Horizontal: swipe left and right for next and previous page.
   Vertical:   swipe up at the bottom of a page opens its proof sheet,
               swipe down closes the sheet, or skips to the next chapter.

   Also: arrow keys, space, Home/End, the arrow buttons, the dots, the chapter
   rail, the contents menu, #hash deep links and the browser back button.

   Touch is handled through touch events rather than pointer events: mobile
   Chrome hands the gesture to the scrolling page and fires pointercancel after
   a single pointermove, so a pointer-only implementation never sees the swipe.
   A non-passive touchmove that calls preventDefault once the gesture is ours
   keeps it. Pointer events cover mouse and pen only. */

(function () {
  "use strict";

  var deck = document.getElementById("deck");
  var track = document.getElementById("track");
  var dotsEl = document.getElementById("dots");
  var railEl = document.getElementById("rail");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var proofBtn = document.getElementById("proofBtn");
  var progressEl = document.getElementById("progress");
  var counter = document.getElementById("counter");
  var live = document.getElementById("live");
  var menu = document.getElementById("menu");
  var menuBtn = document.getElementById("menuBtn");
  var menuClose = document.getElementById("menuClose");
  var menuList = document.getElementById("menuList");
  var sheet = document.getElementById("proofSheet");
  var sheetPanel = document.getElementById("sheetPanel");
  var sheetBody = document.getElementById("sheetBody");
  var sheetTitle = document.getElementById("sheetTitle");
  var sheetClose = document.getElementById("sheetClose");

  var STORE_KEY = "wctw:pledges";
  var DAYS = ["Today", "Tomorrow", "This weekend", "Monday"];

  var index = 0;
  var pageEls = [];
  var dotEls = [];
  var menuBtns = [];
  var railBtns = [];
  var segFills = [];
  var chapters = [];
  var suppressHash = false;
  var sheetOpen = false;

  var reduceMotion = window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- pledge storage ----------
     v1 stored a bare array of ids. v2 keeps the start day alongside. */

  function loadStore() {
    var empty = { v: 2, ids: [], day: null };
    try {
      var raw = window.localStorage.getItem(STORE_KEY);
      if (!raw) return empty;
      var data = JSON.parse(raw);
      if (Array.isArray(data)) return { v: 2, ids: data, day: null };
      if (data && Array.isArray(data.ids)) return data;
      return empty;
    } catch (e) {
      return empty;
    }
  }

  function saveStore(data) {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(data));
    } catch (e) {
      /* private mode or file:// restrictions: pledges just do not persist */
    }
  }

  function pledgedIds() { return loadStore().ids; }

  function isPledged(id) { return pledgedIds().indexOf(id) !== -1; }

  function togglePledge(id) {
    var data = loadStore();
    var at = data.ids.indexOf(id);
    if (at === -1) data.ids.push(id); else data.ids.splice(at, 1);
    saveStore(data);
    return at === -1;
  }

  function setDay(day) {
    var data = loadStore();
    data.day = day;
    saveStore(data);
  }

  /* ---------- small helpers ---------- */

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function say(text) { live.textContent = text; }

  function buzz(ms) {
    if (navigator.vibrate) {
      try { navigator.vibrate(ms); } catch (e) { /* ignore */ }
    }
  }

  function currentPage() { return PAGES[index]; }

  function currentSection() { return pageEls[index]; }

  /* ---------- chapters ---------- */

  function buildChapters() {
    CHAPTERS.forEach(function (chapter) {
      var pages = [];
      PAGES.forEach(function (page, i) {
        if (page.chapter === chapter.id) pages.push(i);
      });
      if (!pages.length) return;
      chapters.push({
        id: chapter.id,
        label: chapter.label,
        first: pages[0],
        count: pages.length,
        accent: PAGES[pages[0]].accent
      });
    });
  }

  function chapterAt(i) {
    for (var c = chapters.length - 1; c >= 0; c--) {
      if (i >= chapters[c].first) return c;
    }
    return 0;
  }

  function nextChapter() {
    var c = chapterAt(index);
    if (c >= chapters.length - 1) {
      goTo(PAGES.length - 1, true);
      return;
    }
    goTo(chapters[c + 1].first, true);
    say("Chapter: " + chapters[c + 1].label);
  }

  function prevChapter() {
    var c = chapterAt(index);
    /* not at the top of this chapter? go there first */
    if (index > chapters[c].first) { goTo(chapters[c].first, true); return; }
    if (c === 0) { goTo(0, true); return; }
    goTo(chapters[c - 1].first, true);
    say("Chapter: " + chapters[c - 1].label);
  }

  /* ---------- proof ---------- */

  function allProof() {
    var seen = {};
    var out = [];
    PAGES.forEach(function (page) {
      (page.proof || []).forEach(function (item) {
        if (seen[item.url]) return;
        seen[item.url] = true;
        out.push(item);
      });
    });
    return out;
  }

  function fillSheet(page) {
    sheetTitle.textContent = page.proof ? "Proof: " + page.menu : "Proof";
    sheetBody.innerHTML = "";

    if (!page.proof || !page.proof.length) {
      sheetBody.appendChild(el("p", "sheet-empty", "No figures on this page, so nothing to check. Every number in the deck is on the sources page."));
      return;
    }

    page.proof.forEach(function (item) {
      var block = el("div", "proof-item");
      block.appendChild(el("p", "proof-claim", item.claim));
      var a = el("a", "proof-source", item.source);
      a.href = item.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      block.appendChild(a);
      sheetBody.appendChild(block);
    });
  }

  function openSheet() {
    if (sheetOpen) return;
    fillSheet(currentPage());
    sheet.hidden = false;
    sheet.setAttribute("aria-hidden", "false");
    sheetPanel.style.transform = "";
    deck.inert = true;
    sheetOpen = true;
    buzz(6);
    sheetClose.focus();
    say("Proof open");
  }

  function closeSheet(refocus) {
    if (!sheetOpen) return;
    sheet.hidden = true;
    sheet.setAttribute("aria-hidden", "true");
    sheetPanel.style.transform = "";
    deck.inert = false;
    sheetOpen = false;
    if (refocus) proofBtn.focus();
    say("Proof closed");
  }

  /* ---------- page building ---------- */

  function addStat(parent, stat) {
    if (!stat) return;
    var wrap = el("div", "stat");
    var value = el("p", "stat-value", stat.value);
    value.dataset.value = stat.value;
    wrap.appendChild(value);
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

  function addAsk(parent, page) {
    var picked = isPledged(page.id);

    if (page.ask) parent.appendChild(el("p", "ask", page.ask));

    var btn = el("button", "pledge-btn");
    btn.type = "button";
    btn.setAttribute("aria-pressed", picked ? "true" : "false");

    var tick = el("span", "tick", "✓");
    tick.hidden = !picked;
    btn.appendChild(tick);
    var label = el("span", null, picked ? "I am in" : "Yes, I am in");
    btn.appendChild(label);

    var plan = el("p", "plan", page.plan || "");
    plan.hidden = !picked || !page.plan;

    btn.addEventListener("click", function () {
      var now = togglePledge(page.id);
      btn.setAttribute("aria-pressed", now ? "true" : "false");
      tick.hidden = !now;
      label.textContent = now ? "I am in" : "Yes, I am in";
      plan.hidden = !now || !page.plan;
      if (now) buzz(10);
      say(now ? "Yes to: " + page.pledge : "Removed: " + page.pledge);
    });

    var row = el("div", "btn-row");
    row.appendChild(btn);
    parent.appendChild(row);
    parent.appendChild(plan);
  }

  function sharePledges(chosen, day) {
    var lines = chosen.map(function (p) { return "- " + p.pledge; });
    var text = "I am starting these " + (day ? day.toLowerCase() : "this week") + ":\n"
      + lines.join("\n") + "\n\nPick yours:";
    var url = location.href.split("#")[0];

    if (navigator.share) {
      navigator.share({ title: document.title, text: text, url: url })
        .catch(function () { /* user dismissed */ });
      return;
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text + " " + url).then(function () {
        say("Copied. Now paste it to one person.");
      }, function () { say("Could not copy"); });
      return;
    }
    say("Copy the link from the address bar and send it to one person.");
  }

  function renderPledgePage(section, page) {
    var data = loadStore();
    var chosen = PAGES.filter(function (p) {
      return p.pledge && data.ids.indexOf(p.id) !== -1;
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
      var head = el("div", "pledge-head");
      head.appendChild(el("span", "tick", "✓"));
      head.appendChild(el("span", null, p.pledge));
      li.appendChild(head);
      if (p.plan) li.appendChild(el("p", "plan-line", p.plan));
      list.appendChild(li);
    });
    inner.appendChild(list);

    inner.appendChild(el("p", "day-title", "Start when?"));
    var chips = el("div", "chips");
    DAYS.forEach(function (day) {
      var chip = el("button", "chip", day);
      chip.type = "button";
      chip.setAttribute("aria-pressed", data.day === day ? "true" : "false");
      chip.addEventListener("click", function () {
        setDay(day);
        renderPledgePage(section, page);
        buzz(10);
        say("Starting " + day.toLowerCase());
      });
      chips.appendChild(chip);
    });
    inner.appendChild(chips);

    inner.appendChild(el("p", "body", page.outro));

    var row = el("div", "btn-row");
    var share = el("button", "pledge-btn", "Send this to one person");
    share.type = "button";
    share.addEventListener("click", function () { sharePledges(chosen, data.day); });
    row.appendChild(share);
    inner.appendChild(row);

    var reset = el("button", "restart", "Clear my picks");
    reset.type = "button";
    reset.addEventListener("click", function () {
      saveStore({ v: 2, ids: [], day: null });
      renderPledgePage(section, page);
      say("Picks cleared");
    });
    var resetRow = el("div", "btn-row");
    resetRow.appendChild(reset);
    inner.appendChild(resetRow);
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
        hint.appendChild(el("span", null, "Swipe left to start. Swipe up for the proof."));
        inner.appendChild(hint);
      }
      return section;
    }

    inner.appendChild(el("p", "eyebrow", page.eyebrow));
    inner.appendChild(el("h2", null, page.title));

    if (page.kind === "sources") {
      inner.appendChild(el("p", "stat-label", page.lede));
      var list = el("ul", "sources");
      allProof().forEach(function (item) {
        var li = el("li");
        var a = el("a", null, item.source);
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
    if (page.norm) inner.appendChild(el("p", "norm", page.norm));
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

    if (page.pledge) addAsk(inner, page);

    return section;
  }

  function build() {
    buildChapters();

    chapters.forEach(function (chapter, c) {
      var btn = el("button", "rail-btn");
      btn.type = "button";
      btn.title = chapter.label;
      btn.setAttribute("aria-label", "Chapter: " + chapter.label);
      btn.style.setProperty("--accent", chapter.accent);
      btn.appendChild(el("span", "rail-label", chapter.label));
      btn.addEventListener("click", function () { goTo(chapter.first, true); });
      railEl.appendChild(btn);
      railBtns.push(btn);

      var seg = el("div", "seg");
      seg.style.flexGrow = String(chapter.count);
      seg.style.setProperty("--accent", chapter.accent);
      var fill = el("div", "seg-fill");
      seg.appendChild(fill);
      progressEl.appendChild(seg);
      segFills.push(fill);
      /* c is unused beyond ordering, kept for readability */
      void c;
    });

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
      if (chapters.length && PAGES[i - 1] && PAGES[i - 1].chapter !== page.chapter) {
        menuItem.className = "menu-break";
      }
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

  /* ---------- stat count-up ---------- */

  function countUp(section) {
    if (reduceMotion) return;
    var node = section.querySelector(".stat-value");
    if (!node) return;

    /* only animate a value holding exactly one number: "537,719", "£3,000",
       "2.4 t". Ranges like "80-90%" or "10 of 16" are left alone. */
    var match = /^([^\d]*)(\d[\d.,]*)([^\d]*)$/.exec(node.dataset.value || "");
    if (!match) return;

    var digits = match[2];
    var target = parseFloat(digits.replace(/,/g, ""));
    if (!isFinite(target) || target <= 0) return;

    var decimals = digits.indexOf(".") === -1 ? 0 : digits.length - digits.indexOf(".") - 1;
    var grouped = digits.indexOf(",") !== -1;
    var start = performance.now();
    var duration = 520;

    function frame(now) {
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      var value = (target * eased).toFixed(decimals);
      if (grouped) value = Number(value).toLocaleString("en-US");
      node.textContent = match[1] + value + match[3];
      if (t < 1 && node.isConnected) requestAnimationFrame(frame);
      else node.textContent = node.dataset.value;
    }
    requestAnimationFrame(frame);
  }

  /* ---------- navigation ---------- */

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

  function updateProgress() {
    var here = chapterAt(index);
    chapters.forEach(function (chapter, c) {
      var done = 0;
      if (c < here) done = 1;
      else if (c === here) done = (index - chapter.first + 1) / chapter.count;
      segFills[c].style.width = (done * 100) + "%";
      railBtns[c].setAttribute("aria-current", c === here ? "true" : "false");
    });
  }

  function goTo(i, push) {
    index = Math.max(0, Math.min(PAGES.length - 1, i));
    var page = PAGES[index];

    if (sheetOpen) closeSheet(false);

    translate(-index * deck.clientWidth, true);

    document.documentElement.style.setProperty("--accent", page.accent);
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
      section.style.transform = "";
    });

    updateProgress();

    var current = pageEls[index];
    current.scrollTop = 0;
    if (current.dataset.dynamic) renderPledgePage(current, page);
    countUp(current);

    proofBtn.hidden = !(page.proof && page.proof.length);

    setHash(page.id, push);
    if (push) buzz(6);
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

  /* ---------- gestures ----------
     One state machine, fed by touch events and by pointer events for mouse.
     intent is decided once per gesture and never changes mid-drag. */

  var startX = 0, startY = 0, startTime = 0, delta = 0;
  var axis = null;      /* null = undecided, "x" or "y" */
  var intent = null;    /* "page" | "sheet-open" | "sheet-close" | "chapter" */
  var active = false;
  var dragged = false;  /* a drag that ends on a link must not also click it */

  function atBottom(section) {
    return section.scrollTop + section.clientHeight >= section.scrollHeight - 2;
  }

  function verticalIntent(dy) {
    var section = currentSection();
    /* an open sheet only closes on a downward drag that starts at its top,
       so the sheet's own list still scrolls */
    if (sheetOpen) return (dy > 0 && sheetBody.scrollTop <= 0) ? "sheet-close" : null;
    if (dy < 0) return atBottom(section) ? "sheet-open" : null;
    return section.scrollTop <= 0 ? "chapter" : null;
  }

  function gestureStart(x, y, time) {
    active = true;
    dragged = false;
    startX = x;
    startY = y;
    startTime = time;
    delta = 0;
    axis = null;
    intent = null;
  }

  /* returns true once the drag belongs to the deck */
  function gestureMove(x, y) {
    if (!active) return false;

    var dx = x - startX;
    var dy = y - startY;

    if (axis === null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return false;
      if (Math.abs(dx) > Math.abs(dy)) {
        axis = "x";
        intent = sheetOpen ? null : "page";
      } else {
        axis = "y";
        intent = verticalIntent(dy);
      }
      if (!intent) { axis = "done"; return false; }
    }
    if (axis === "done") return false;

    if (intent === "page") {
      var width = deck.clientWidth;
      var atEdge = (index === 0 && dx > 0) || (index === PAGES.length - 1 && dx < 0);
      delta = atEdge ? dx * 0.3 : dx;
      translate(-index * width + delta, false);
      return true;
    }

    delta = dy;
    if (intent === "sheet-open") {
      var height = Math.max(1, sheetPanel.clientHeight);
      var shown = Math.min(1, -dy / height);
      sheet.hidden = false;
      sheet.setAttribute("aria-hidden", "false");
      sheetPanel.style.transform = "translate3d(0," + ((1 - shown) * 100) + "%,0)";
    } else if (intent === "sheet-close") {
      sheetPanel.style.transform = "translate3d(0," + Math.max(0, dy) + "px,0)";
    } else if (intent === "chapter") {
      currentSection().style.transform = "translate3d(0," + dy * 0.35 + "px,0)";
    }
    return true;
  }

  function gestureEnd(time) {
    if (!active) return;
    active = false;
    var kind = intent;
    var moved = delta;
    axis = null;
    intent = null;
    delta = 0;

    if (!kind) return;
    if (Math.abs(moved) > 8) dragged = true;

    var elapsed = Math.max(1, time - startTime);
    var velocity = moved / elapsed;
    var flick = Math.abs(velocity) > 0.45 && Math.abs(moved) > 24;

    if (kind === "page") {
      var width = deck.clientWidth;
      if (moved < 0 && (flick || -moved > width * 0.22)) next();
      else if (moved > 0 && (flick || moved > width * 0.22)) prev();
      else translate(-index * width, true);
      return;
    }

    var height = deck.clientHeight;

    if (kind === "sheet-open") {
      sheetPanel.style.transform = "";
      if (flick || -moved > height * 0.18) {
        sheet.hidden = true;          /* let openSheet run its full setup */
        openSheet();
      } else {
        sheet.hidden = true;
        sheet.setAttribute("aria-hidden", "true");
      }
      return;
    }

    if (kind === "sheet-close") {
      sheetPanel.style.transform = "";
      if (flick || moved > height * 0.15) closeSheet(false);
      return;
    }

    if (kind === "chapter") {
      currentSection().style.transform = "";
      if (flick || moved > height * 0.18) nextChapter();
    }
  }

  /* the browser took the gesture: commit it if it had already gone far enough,
     otherwise snap back */
  function gestureCancel(time) {
    if (!active) return;
    if (intent && Math.abs(delta) > 8) { gestureEnd(time); return; }
    active = false;
    axis = null;
    intent = null;
    delta = 0;
    translate(-index * deck.clientWidth, true);
    currentSection().style.transform = "";
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
    if (gestureMove(e.clientX, e.clientY) && intent === "page") {
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
    deck.inert = sheetOpen;
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

  /* the sheet listens on its own so a downward drag on it closes it */
  sheet.addEventListener("touchstart", onTouchStart, { passive: true });
  sheet.addEventListener("touchmove", onTouchMove, { passive: false });
  sheet.addEventListener("touchend", onTouchEnd, { passive: true });
  sheet.addEventListener("touchcancel", onTouchCancel, { passive: true });

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
  proofBtn.addEventListener("click", function () {
    if (sheetOpen) closeSheet(true); else openSheet();
  });
  sheetClose.addEventListener("click", function () { closeSheet(true); });
  sheet.addEventListener("click", function (e) {
    if (e.target === sheet || e.target.dataset.close != null) closeSheet(true);
  });

  menuBtn.addEventListener("click", openMenu);
  menuClose.addEventListener("click", closeMenu);
  menu.addEventListener("click", function (e) {
    if (e.target === menu) closeMenu();
  });

  document.addEventListener("keydown", function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    if (e.key === "Escape") {
      if (!menu.hidden) { closeMenu(); menuBtn.focus(); return; }
      if (sheetOpen) { closeSheet(true); }
      return;
    }
    if (!menu.hidden) return;

    var tag = document.activeElement ? document.activeElement.tagName : "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;

    switch (e.key) {
      case "ArrowRight":
      case "PageDown":
        if (sheetOpen) return;
        e.preventDefault(); next(); break;
      case "ArrowLeft":
      case "PageUp":
        if (sheetOpen) return;
        e.preventDefault(); prev(); break;
      case "ArrowUp":
        e.preventDefault(); openSheet(); break;
      case "ArrowDown":
        e.preventDefault();
        if (sheetOpen) closeSheet(true); else nextChapter();
        break;
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
      case "p":
        e.preventDefault(); if (sheetOpen) closeSheet(true); else openSheet(); break;
    }
  });

  /* trackpad and shift-wheel horizontal scrolling */
  var wheelLock = false;
  deck.addEventListener("wheel", function (e) {
    var dx = e.shiftKey ? e.deltaY : e.deltaX;
    if (Math.abs(dx) < 25 || Math.abs(dx) < Math.abs(e.deltaY) && !e.shiftKey) return;
    if (wheelLock || sheetOpen) return;
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

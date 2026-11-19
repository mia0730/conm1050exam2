(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const app = $("#app");
  const LX = Object.fromEntries(LESSONS.map((l) => [l.id, l]));
  const E1 = window.EXAM1;
  const E1MODS = ["m1", "m2", "m3", "m4", "m5", "m6"];

  /* ---------- per-viewer progress (browser storage; safe if blocked) */
  const store = {
    get(k, d) { try { const v = localStorage.getItem("conm1050e2:" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("conm1050e2:" + k, JSON.stringify(v)); } catch (e) {} },
  };
  const doneSecs = (id) => store.get("sec:" + id, []);
  const lessonPct = (l) => Math.round(doneSecs(l.id).length / l.sections.length * 100);

  const ICON = {
    road: '<path d="M9 3 5 21M15 3l4 18M12 5v3M12 11v3M12 17v3"/>',
    drop: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11Z"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
    box: '<path d="M3 7l9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7M12 11v10"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-2-2 6.3-6.3a4 4 0 0 1-5-5L10 6 6 2l2-1 4 4 2.7 1.3Z"/>',
    house: '<path d="M3 11 12 3l9 8M5 10v10h14V10M10 20v-6h4v6"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>',
  };
  const labOf = (l) => l.num <= 9 ? "LECTURE " + l.num : l.id === "modular" ? "GUEST LECTURE" : l.id === "ops" ? "LECTURE · NOV 5" : "LECTURE";
  const icon = (k, s = 22) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[k]}</svg>`;

  /* ---------- nav */
  const NAV = [["#/", "Home"], ["#/exam1", "Exam 1 Review"], ["#/learn", "Learn"], ["#/flashcards", "Flashcards"], ["#/quiz", "Quiz"], ["#/math", "Math Lab"]];
  function nav(active) {
    $("#nav").innerHTML = NAV.map(([h, t]) => `<a href="${h}" class="${active === h ? "on" : ""}">${t}</a>`).join("");
  }

  /* ================================================================ HOME */
  function home() {
    nav("#/");
    app.innerHTML = `
    <section class="hero home-hero"><div class="wrap">
      <div class="kick">CONM 1050 · INTRO TO THE BUILT ENVIRONMENT</div>
      <h1>Exam 2, <em>broken down.</em></h1>
      <p class="sub">Six lectures turned into pictures, step-by-step diagrams, calculators, flashcards and practice questions. Tap anything that looks like a button.</p>
      <div class="path">
        <a href="#/learn/transport"><i>1</i><b>Learn</b><span>visual lessons</span></a>
        <a href="#/flashcards"><i>2</i><b>Flashcards</b><span>${CARDS2.length} cards</span></a>
        <a href="#/quiz"><i>3</i><b>Quiz</b><span>${QUIZ2.length} questions</span></a>
        <a href="#/math"><i>4</i><b>Math Lab</b><span>NOI, cap rate, FCI…</span></a>
      </div></div></section>
    <div class="wrap">
      <h2 class="sech">Exam 2 lessons</h2>
      <div class="tiles">${LESSONS.map((l) => { const p = lessonPct(l); return `
        <a class="tile" href="#/learn/${l.id}" style="--acc:${l.color}">
          <div class="tt"><span class="ti">${icon(l.icon, 26)}</span><span class="tn">${labOf(l)}</span></div>
          <b>${l.title}</b><p>${l.big.replace(/<[^>]+>/g, "")}</p>
          <div class="prog"><i style="width:${p}%"></i></div><span class="pl">${p ? p + "% understood" : "Not started"}</span></a>`; }).join("")}
        <a class="tile e1" href="#/exam1" style="--acc:#1F2A37"><div class="tt"><span class="ti">${icon("star", 26)}</span><span class="tn">REVIEW</span></div><b>Exam 1 Review</b><p>Built environment, projects, contracts, BIM & VDC, delivery methods, LEED — the essentials.</p><span class="pl">Cumulative refresher</span></a>
      </div>
      <div class="howto"><b>How to use this:</b> open a lesson and work top to bottom. Every section ends with an <b>“I get this”</b> check — tick it when you could explain it to someone else. Your ticks are saved in this browser.</div>
    </div>`;
  }

  /* ================================================================ LEARN index + lesson */
  function learnIndex() {
    nav("#/learn");
    app.innerHTML = `<section class="hero"><div class="wrap"><div class="kick">LEARN</div><h1>Pick a lesson</h1><p class="sub">Go in order the first time — each one builds on the last.</p></div></section>
      <div class="wrap"><div class="lessonlist">${LESSONS.map((l) => `<a href="#/learn/${l.id}" style="--acc:${l.color}"><span class="ti">${icon(l.icon, 24)}</span><div><b>${l.title}</b><span>${l.sections.length} sections · ${lessonPct(l)}% understood</span></div><em>→</em></a>`).join("")}</div></div>`;
  }

  function lesson(id) {
    const l = LX[id]; if (!l) return home();
    nav("#/learn");
    const done = doneSecs(id);
    const idx = LESSONS.indexOf(l), next = LESSONS[idx + 1], prev = LESSONS[idx - 1];
    app.innerHTML = `
    <section class="hero lhero" style="--acc:${l.color}"><div class="wrap">
      <div class="kick">${icon(l.icon, 18)} ${labOf(l)} · ${l.sections.length} SECTIONS</div>
      <h1>${l.title}</h1><p class="big">${l.big}</p>${l.note ? `<p class="note">${l.note}</p>` : ""}
      <div class="lprog"><div class="prog"><i style="width:${lessonPct(l)}%"></i></div><span>${done.length}/${l.sections.length} understood</span></div>
    </div></section>
    <div class="wrap lwrap" style="--acc:${l.color}">
      <nav class="toc"><div class="toch">IN THIS LESSON</div>${l.sections.map((s, i) => `<a href="#/learn/${id}/${i}" data-i="${i}" class="${done.includes(i) ? "done" : ""}"><i>${done.includes(i) ? "✓" : i + 1}</i>${s.t}</a>`).join("")}
        <div class="tocact"><a href="#/flashcards/${id}">Flashcards →</a><a href="#/quiz/${id}">Quiz me →</a></div></nav>
      <div class="lcontent">
        ${l.sections.map((s, i) => `<section class="sec" id="s${i}"><div class="sech2"><span class="sn">${i + 1}</span><h2>${s.t}</h2></div><div class="sbody">${s.html}</div>
          <label class="got ${done.includes(i) ? "on" : ""}"><input type="checkbox" data-i="${i}" ${done.includes(i) ? "checked" : ""}> I get this — I could explain it to someone</label></section>`).join("")}
        <section class="sec takeaway"><div class="sech2"><span class="sn">★</span><h2>Remember these</h2></div><ul class="tk">${l.takeaways.map((t) => `<li>${t}</li>`).join("")}</ul>
          <div class="endbtns"><a class="btn primary" href="#/quiz/${id}">Quiz me on this lesson</a><a class="btn" href="#/flashcards/${id}">Flashcards</a></div></section>
        <div class="pager">${prev ? `<a href="#/learn/${prev.id}">← ${prev.short}</a>` : "<span></span>"}${next ? `<a href="#/learn/${next.id}" class="nx">Next: ${next.title} →</a>` : `<a href="#/quiz" class="nx">Take the full quiz →</a>`}</div>
      </div></div>`;
    $$(".w", app).forEach((el) => { try { W[el.dataset.w](el, WCFG[el.dataset.k]); } catch (e) { console.error(el.dataset.w, e); } });
    $$(".got input", app).forEach((c) => c.onchange = () => {
      const i = +c.dataset.i; let d = doneSecs(id); d = c.checked ? [...new Set([...d, i])] : d.filter((x) => x !== i); store.set("sec:" + id, d);
      c.parentElement.classList.toggle("on", c.checked);
      const a = $(`.toc a[data-i="${i}"]`, app); a.classList.toggle("done", c.checked); a.querySelector("i").textContent = c.checked ? "✓" : i + 1;
      $(".lprog i", app).style.width = lessonPct(l) + "%"; $(".lprog span", app).textContent = `${d.length}/${l.sections.length} understood`;
    });
    $$(".toc a[data-i]", app).forEach((a) => a.onclick = (e) => { e.preventDefault(); scrollToSec(+a.dataset.i); });
  }
  function scrollToSec(i) { const s = $("#s" + i); if (s) window.scrollTo({ top: s.getBoundingClientRect().top + scrollY - 76, behavior: "smooth" }); }

  /* ================================================================ EXAM 1 REVIEW */
  function exam1() {
    nav("#/exam1");
    const C = (m) => E1.mods[m].color;
    const block = (m, title, body) => `<section class="e1card" style="--acc:${C(m)}"><div class="e1h"><span>L${E1.mods[m].num}</span><h3>${title}</h3></div>${body}</section>`;
    app.innerHTML = `<section class="hero" style="--acc:#1F2A37"><div class="wrap"><div class="kick">CUMULATIVE REFRESHER</div><h1>Exam 1 Review</h1><p class="sub">The things from Exam 1 most worth remembering, on one page. Then drill them with the Exam 1 flashcards and quiz.</p>
      <div class="endbtns"><a class="btn primary" href="#/flashcards/exam1">Exam 1 flashcards (${E1.cards.filter((c) => E1MODS.includes(c.m)).length})</a><a class="btn" href="#/quiz/exam1">Exam 1 quiz (${E1.quiz.filter((q) => E1MODS.includes(q.m)).length})</a></div></div></section>
    <div class="wrap e1grid">
      ${block("m1", "The built environment", `<p>Everything people build. <b>4 parts:</b> buildings · infrastructure · systems · spaces & places. Opposite = <b>natural</b>.</p>
        <div class="chips"><span>Structure</span><span>Envelope (walls, windows, roof)</span><span>Mechanical (HVAC)</span><span>Electrical</span><span>Plumbing</span><span>Interiors</span><span>Site</span></div>
        <div class="miniflow"><span>Plan</span><span>Design</span><span class="hl">Build</span><span>Operate</span></div>
        <p class="small"><b>Resilient</b> = bounces back from storms · <b>Adaptable</b> = can change use.</p>`)}
      ${block("m2", "Projects & people", `<p>A project: <b>goal · start & end · time & money · resources · unique</b>.</p>
        <table class="tbl sm"><tr><th>Vertical type</th><th>Examples</th></tr><tr><td>Residential</td><td>homes, dorms</td></tr><tr><td>Commercial</td><td>offices, hotels</td></tr><tr><td>Institutional</td><td>schools, <b>hospitals</b></td></tr><tr><td>Industrial</td><td>factories, <b>warehouses</b></td></tr></table>
        <p class="small"><b>Owner</b> = the reason & the money · <b>designers</b> = drawings · <b>contractor</b> = builds · <b>public</b> = more rules.</p>`)}
      ${block("m2", "Contracts", `<table class="tbl sm"><tr><th>Type</th><th>How</th><th>Risk on</th></tr><tr><td>Lump sum</td><td>fixed price, drawings done</td><td>Builder</td></tr><tr><td>GMP</td><td>cost-plus with a max</td><td>Shared</td></tr><tr><td>Cost-plus</td><td>costs + fee, emergencies</td><td>Owner</td></tr></table>`)}
      ${block("m3", "Technology & BIM", `<p><b>BIM</b> = Building <b>Information</b> Modeling: one smart 3D model. CAD was faster but still 2D & separate.</p>
        <div class="chips"><span>3D model</span><span><b>4D time</b></span><span><b>5D cost</b></span><span>6D sustainability</span><span>7D facility mgmt</span><span>8D safety</span><span>9D lean</span><span>10D industrialized</span></div>
        <p class="small"><b>UAS</b> = FAA's term for the full drone system · <b>Gehry's Fish</b> = first 3D model for construction docs.</p>`)}
      ${block("m4", "VDC tools", `<table class="tbl sm"><tr><td>OpenSpace</td><td>stitches 360° photos</td></tr><tr><td>Procore</td><td>tickets & documents</td></tr><tr><td>Matterport</td><td>marketing tours</td></tr><tr><td>Navisworks</td><td>composite model, clash detection</td></tr><tr><td>Revit</td><td>change one view → all update</td></tr></table>
        <p class="small">Rework = <b>2–12%</b> of contract · spatial changes: dislocation, deformation, addition/removal.</p>`)}
      ${block("m5", "Delivery methods", `<table class="tbl sm"><tr><th></th><th>Contracts</th><th>Key idea</th></tr><tr><td>DBB</td><td>2</td><td>lowest bid, slowest, legal everywhere</td></tr><tr><td>CMAR</td><td>2</td><td>CM joins in design; GMP in <b>Part A</b></td></tr><tr><td>Design-Build</td><td>1</td><td>one company, fastest</td></tr><tr><td>IPD</td><td>1 shared</td><td>shared risk + reward</td></tr></table>`)}
      ${block("m6", "Sustainability & LEED", `<p><b>LEED</b> = Leadership in Energy & Environmental Design (by <b>USGBC</b>). <b>Prerequisite</b> = required, 0 pts · <b>credit</b> = optional points.</p>
        <div class="lvbar"><i style="flex:10;background:#7BAE7F">Certified 40</i><i style="flex:10;background:#A8A9AD">Silver 50</i><i style="flex:20;background:#D4A017">Gold 60</i><i style="flex:14;background:#5B6B7A">Platinum 80</i></div>
        <p class="small"><b>Embodied</b> carbon = before move-in · <b>operational</b> = using it. Building gets <b>certified</b>; person gets a <b>credential</b>.</p>`)}
      <section class="e1card link" style="--acc:#B7791F"><div class="e1h"><span>L7</span><h3>Transportation</h3></div><p>Lecture 7 is covered as a full lesson in the Exam 2 material.</p><a class="btn sm" href="#/learn/transport">Open the transportation lesson →</a></section>
    </div>`;
  }

  /* ================================================================ FLASHCARDS */
  function deckFor(set) {
    if (set === "exam1") return E1.cards.filter((c) => E1MODS.includes(c.m)).map((c) => ({ id: "e1:" + c.t, set: "exam1", tag: "L" + E1.mods[c.m].num + " · " + E1.mods[c.m].short, color: E1.mods[c.m].color, t: c.t, a: c.a }));
    return CARDS2.filter((c) => set === "all" || c[0] === set).map((c) => ({ id: c[0] + ":" + c[1], set: c[0], tag: LX[c[0]].short, color: LX[c[0]].color, t: c[1], a: c[2] }));
  }
  function filterChips(base, cur) {
    return `<div class="filters"><a href="${base}/all" class="${cur === "all" ? "on" : ""}">All Exam 2</a>${LESSONS.map((l) => `<a href="${base}/${l.id}" style="--acc:${l.color}" class="${cur === l.id ? "on" : ""}">${l.short}</a>`).join("")}<a href="${base}/exam1" class="${cur === "exam1" ? "on" : ""} e1f">Exam 1</a></div>`;
  }
  function flashcards(set = "all") {
    nav("#/flashcards");
    let deck = deckFor(set), i = 0, flipped = false, onlyLearning = false;
    const known = () => store.get("known", {});
    const view = () => onlyLearning ? deck.filter((c) => !known()[c.id]) : deck;
    app.innerHTML = `<section class="hero"><div class="wrap"><div class="kick">FLASHCARDS</div><h1>Tap the card to flip it</h1>${filterChips("#/flashcards", set)}</div></section>
      <div class="wrap fcwrap"><div class="fctop"><span class="fcount"></span><label class="tgl"><input type="checkbox" class="ol"> Only cards I'm still learning</label><button class="btn sm ghost shuf">Shuffle</button></div>
      <div class="fcard" tabindex="0"><div class="fin"><div class="ff front"></div><div class="ff back"></div></div></div>
      <div class="fcbtns"><button class="btn prev">←</button><button class="btn learning">Still learning</button><button class="btn primary gotit">Got it ✓</button><button class="btn next">→</button></div>
      <p class="small center">Keyboard: space = flip · ← → = move</p><div class="fcstat"></div></div>`;
    const draw = () => {
      const v = view(); const fc = $(".fcard", app);
      if (!v.length) { fc.querySelector(".front").innerHTML = `<div class="ft">Nothing left to learn here!</div>`; fc.querySelector(".back").innerHTML = ""; $(".fcount", app).textContent = "0 cards"; return; }
      i = (i + v.length) % v.length; const c = v[i];
      fc.classList.toggle("flip", flipped);
      fc.style.setProperty("--acc", c.color);
      fc.querySelector(".front").innerHTML = `<span class="ftag">${c.tag}</span><div class="ft">${c.t}</div><span class="fhint">tap to flip ↻</span>`;
      fc.querySelector(".back").innerHTML = `<span class="ftag">${c.tag}</span><div class="fsmall">${c.t}</div><div class="fa">${c.a}</div>${known()[c.id] ? '<span class="kn">✓ marked as known</span>' : ""}`;
      $(".fcount", app).textContent = `Card ${i + 1} of ${v.length}`;
      const k = known(); const nk = deck.filter((c) => k[c.id]).length;
      $(".fcstat", app).innerHTML = `<div class="prog"><i style="width:${nk / deck.length * 100}%"></i></div><span>${nk} of ${deck.length} known in this set</span>`;
    };
    const mark = (val) => { const v = view(); if (!v.length) return; const k = known(); k[v[i].id] = val; if (!val) delete k[v[i].id]; store.set("known", k); flipped = false; if (!(onlyLearning && val)) i++; draw(); };
    $(".fcard", app).onclick = () => { flipped = !flipped; draw(); };
    $(".next", app).onclick = () => { i++; flipped = false; draw(); };
    $(".prev", app).onclick = () => { i--; flipped = false; draw(); };
    $(".gotit", app).onclick = () => mark(true);
    $(".learning", app).onclick = () => mark(false);
    $(".shuf", app).onclick = () => { deck = U.shuffle(deck); i = 0; flipped = false; draw(); };
    $(".ol", app).onchange = (e) => { onlyLearning = e.target.checked; i = 0; flipped = false; draw(); };
    document.onkeydown = (e) => { if (!$(".fcard")) return; if (e.key === " ") { e.preventDefault(); flipped = !flipped; draw(); } if (e.key === "ArrowRight") { i++; flipped = false; draw(); } if (e.key === "ArrowLeft") { i--; flipped = false; draw(); } };
    draw();
  }

  /* ================================================================ QUIZ */
  function questionsFor(set) {
    if (set === "exam1") return E1.quiz.filter((q) => E1MODS.includes(q.m)).map((q) => ({ tag: "L" + E1.mods[q.m].num + " · " + E1.mods[q.m].short, color: E1.mods[q.m].color, set: q.m, q: q.q, o: q.o, c: q.c, e: q.e }));
    return QUIZ2.filter((q) => set === "all" || q[0] === set).map((q) => ({ tag: LX[q[0]].short, color: LX[q[0]].color, set: q[0], q: q[1], o: q[2], c: q[3], e: q[4] }));
  }
  function quiz(set = "all") {
    nav("#/quiz");
    document.onkeydown = null;
    app.innerHTML = `<section class="hero"><div class="wrap"><div class="kick">PRACTICE QUIZ</div><h1>Test yourself</h1>${filterChips("#/quiz", set)}</div></section><div class="wrap qwrap"></div>`;
    const box = $(".qwrap", app);
    let qs, i, score, missed;
    const start = (list) => { qs = U.shuffle(list).map((q) => { const order = U.shuffle(q.o.map((_, k) => k)); return { ...q, order }; }); i = 0; score = 0; missed = []; ask(); };
    const ask = () => {
      if (i >= qs.length) return finish();
      const q = qs[i];
      box.innerHTML = `<div class="qmeta"><span class="qtag" style="background:${q.color}">${q.tag}</span><span>Question ${i + 1} of ${qs.length}</span><span class="qsc">Score: ${score}</span></div>
        <div class="qbar"><i style="width:${i / qs.length * 100}%"></i></div>
        <h2 class="qq">${q.q}</h2><div class="opts">${q.order.map((k, j) => `<button class="opt" data-k="${k}"><span class="L">${"ABCD"[j]}</span><span>${q.o[k]}</span></button>`).join("")}</div><div class="qfb"></div>`;
      $$(".opt", box).forEach((b) => b.onclick = () => {
        const k = +b.dataset.k, ok = k === q.c;
        $$(".opt", box).forEach((x) => { x.disabled = true; if (+x.dataset.k === q.c) x.classList.add("ok"); });
        if (!ok) { b.classList.add("bad"); missed.push(q); } else score++;
        $(".qfb", box).innerHTML = `<div class="fb ${ok ? "ok" : "no"}"><b>${ok ? ["Nice!", "Correct!", "You got it!", "Yes!"][i % 4] : "Not quite."}</b> ${q.e}</div><button class="btn primary nextq">${i < qs.length - 1 ? "Next question →" : "See my score"}</button>`;
        $(".nextq", box).onclick = () => { i++; ask(); window.scrollTo({ top: box.offsetTop - 80, behavior: "smooth" }); };
      });
    };
    const finish = () => {
      const pct = Math.round(score / qs.length * 100);
      const best = store.get("best:" + set, 0); if (pct > best) store.set("best:" + set, pct);
      box.innerHTML = `<div class="final"><div class="ring" style="--p:${pct}"><b>${pct}%</b></div><h2>${score} of ${qs.length} correct</h2><p>${pct >= 90 ? "Exam-ready on this set." : pct >= 70 ? "Solid — review the ones you missed below." : "Good practice — go back through the lessons for the topics you missed."}</p>
        <div class="endbtns">${missed.length ? '<button class="btn primary redo">Retry only the ones I missed</button>' : ""}<button class="btn again">Start over</button></div>
        ${missed.length ? `<h3>Review what you missed</h3><div class="missed">${missed.map((q) => `<div class="mq" style="--acc:${q.color}"><b>${q.q}</b><span>✓ ${q.o[q.c]}</span><em>${q.e}</em></div>`).join("")}</div>` : ""}</div>`;
      const m = missed.slice();
      if ($(".redo", box)) $(".redo", box).onclick = () => start(m);
      $(".again", box).onclick = () => start(questionsFor(set));
    };
    const all = questionsFor(set);
    const best = store.get("best:" + set, null);
    box.innerHTML = `<div class="qstart"><h2>${all.length} questions</h2><p>One at a time with instant feedback. Answer choices are shuffled every time.${best !== null ? ` Your best on this set: <b>${best}%</b>.` : ""}</p><button class="btn primary go">Start the quiz</button></div>`;
    $(".go", box).onclick = () => start(all);
  }

  /* ================================================================ MATH LAB */
  const R = (a, b, s = 1) => Math.round((a + Math.random() * (b - a)) / s) * s;
  const PROBS = [
    { id: "tdc", t: "Total development cost", f: "TDC = land + hard + soft + financing + contingency", color: "#B42318",
      gen: () => { const h = R(8, 20), l = R(1, 6), s = R(1, 4), c = R(0.5, 2, 0.5); return { q: `Construction (hard) $${h}M, land $${l}M, soft costs $${s}M, contingency $${c}M. Total development cost in $M?`, a: h + l + s + c, unit: "$M", sol: `${h} + ${l} + ${s} + ${c} = <b>${h + l + s + c}</b> ($M)` }; } },
    { id: "noi", t: "Net operating income", f: "NOI = (rent + other income) − operating expenses", color: "#B42318",
      gen: () => { const r = R(300, 900, 10) * 1000, o = R(10, 60, 5) * 1000, e = R(100, 300, 10) * 1000; return { q: `Rent ${U.money(r)}, other income ${U.money(o)}, operating expenses ${U.money(e)}. NOI?`, a: r + o - e, unit: "$", sol: `${U.money(r)} + ${U.money(o)} − ${U.money(e)} = <b>${U.money(r + o - e)}</b>` }; } },
    { id: "val", t: "Value from cap rate", f: "Value = NOI ÷ cap rate", color: "#B42318",
      gen: () => { const n = R(200, 800, 10) * 1000, c = [4, 5, 6, 8, 10][R(0, 4)]; return { q: `NOI ${U.money(n)} and a ${c}% cap rate. Value?`, a: n / (c / 100), unit: "$", sol: `${U.money(n)} ÷ ${(c / 100).toFixed(2)} = <b>${U.money(n / (c / 100))}</b>` }; } },
    { id: "cap", t: "Find the cap rate", f: "Cap rate = NOI ÷ value", color: "#B42318",
      gen: () => { const c = [4, 5, 6, 8][R(0, 3)], v = R(4, 12) * 1000000, n = v * c / 100; return { q: `A property worth ${U.money(v)} has NOI of ${U.money(n)}. Cap rate in %?`, a: c, unit: "%", sol: `${U.money(n)} ÷ ${U.money(v)} = ${(c / 100).toFixed(2)} = <b>${c}%</b>` }; } },
    { id: "pay", t: "Simple payback", f: "Payback (years) = extra cost ÷ yearly savings", color: "#B42318",
      gen: () => { const s = R(10, 50) * 1000, y = R(3, 10), c = s * y; return { q: `An upgrade costs ${U.money(c)} extra and saves ${U.money(s)} a year. Payback in years?`, a: y, unit: "years", sol: `${U.money(c)} ÷ ${U.money(s)} = <b>${y} years</b>` }; } },
    { id: "lcc", t: "Lifecycle cost", f: "Total = purchase price + (yearly cost × years)", color: "#1F7A72",
      gen: () => { const p = R(20, 80) * 1000, o = R(2, 10) * 1000, y = R(5, 15); return { q: `Equipment costs ${U.money(p)} and ${U.money(o)} per year to run. Total cost over ${y} years?`, a: p + o * y, unit: "$", sol: `${U.money(p)} + ${U.money(o)} × ${y} = <b>${U.money(p + o * y)}</b>` }; } },
    { id: "fci", t: "Facility Condition Index", f: "FCI = repair needs ÷ replacement value", color: "#1F7A72",
      gen: () => { const v = R(10, 50) * 1000000, f = [0.02, 0.05, 0.1, 0.15, 0.2][R(0, 4)], r = v * f; return { q: `Repair needs ${U.money(r)}; replacement value ${U.money(v)}. FCI (as a decimal)?`, a: f, unit: "", sol: `${U.money(r)} ÷ ${U.money(v)} = <b>${f}</b>` }; } },
  ];
  function math() {
    nav("#/math");
    app.innerHTML = `<section class="hero" style="--acc:#B42318"><div class="wrap"><div class="kick">MATH LAB</div><h1>Every formula, with endless practice</h1><p class="sub">Each card makes a new problem every time. Type your answer (no commas or $ needed) and check it.</p></div></section>
      <div class="wrap mathgrid">${PROBS.map((p) => `<div class="mcard" data-id="${p.id}" style="--acc:${p.color}"><h3>${p.t}</h3><div class="formula">${p.f}</div><div class="mq"></div><div class="mrow"><input type="text" inputmode="decimal" placeholder="Your answer"><span class="unit"></span><button class="btn sm primary chk">Check</button><button class="btn sm ghost newp">New problem</button></div><div class="mfb"></div></div>`).join("")}</div>`;
    $$(".mcard", app).forEach((card) => {
      const p = PROBS.find((x) => x.id === card.dataset.id); let cur;
      const fresh = () => { cur = p.gen(); $(".mq", card).textContent = cur.q; $(".unit", card).textContent = cur.unit; $("input", card).value = ""; $(".mfb", card).innerHTML = ""; };
      $(".newp", card).onclick = fresh;
      const check = () => {
        const v = parseFloat($("input", card).value.replace(/[$,%\s]/g, "").replace(/m$/i, ""));
        if (isNaN(v)) { $(".mfb", card).innerHTML = `<div class="fb no">Type a number first.</div>`; return; }
        const ok = Math.abs(v - cur.a) <= Math.max(Math.abs(cur.a) * 0.005, 0.0051);
        $(".mfb", card).innerHTML = `<div class="fb ${ok ? "ok" : "no"}"><b>${ok ? "Correct!" : "Not quite."}</b> ${cur.sol}</div>`;
      };
      $(".chk", card).onclick = check; $("input", card).onkeydown = (e) => { if (e.key === "Enter") check(); };
      fresh();
    });
  }

  /* ================================================================ ROUTER */
  function route() {
    const parts = (location.hash || "#/").slice(2).split("/");
    document.onkeydown = null;
    const [a, b, c] = parts;
    if (a === "learn" && b) { lesson(b); if (c) setTimeout(() => scrollToSec(+c), 50); else window.scrollTo(0, 0); return; }
    window.scrollTo(0, 0);
    if (a === "learn") return learnIndex();
    if (a === "exam1") return exam1();
    if (a === "flashcards") return flashcards(b || "all");
    if (a === "quiz") return quiz(b || "all");
    if (a === "math") return math();
    home();
  }
  window.addEventListener("hashchange", route);
  route();
})();

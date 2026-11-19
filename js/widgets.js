/* Interactive widgets. Each W.name(el, cfg) fills el. */
(function () {
  const W = {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const money = (n) => (n < 0 ? "−" : "") + "$" + Math.round(Math.abs(n)).toLocaleString("en-US");
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  window.U = { money, shuffle };

  /* ---------------------------------------------------------- generic: flow (clickable steps) */
  W.flow = (el, cfg) => {
    const steps = cfg.steps;
    el.classList.add("flow");
    el.innerHTML = `<div class="flow-row">${steps.map((s, i) =>
      `<button class="fstep" data-i="${i}"><span class="fn">${i + 1}</span><span class="fl">${s[0]}</span>${s[1] ? `<span class="fs">${s[1]}</span>` : ""}</button>`).join('<span class="farr" aria-hidden="true">→</span>')}</div>
      <div class="fdetail"><div class="fdn"></div><div class="fdt"></div><button class="fnext">Next →</button></div>`;
    let cur = 0;
    const show = (i) => {
      cur = i;
      $$(".fstep", el).forEach((b, k) => { b.classList.toggle("on", k === i); b.classList.toggle("done", k < i); });
      $(".fdn", el).textContent = `Step ${i + 1} of ${steps.length} · ${steps[i][0].replace(/<[^>]+>/g, "")}`;
      $(".fdt", el).innerHTML = steps[i][2];
      $(".fnext", el).textContent = i < steps.length - 1 ? "Next step →" : "↺ Start over";
    };
    $$(".fstep", el).forEach((b) => b.onclick = () => show(+b.dataset.i));
    $(".fnext", el).onclick = () => show(cur < steps.length - 1 ? cur + 1 : 0);
    show(0);
  };

  /* ---------------------------------------------------------- generic: tabs */
  W.tabs = (el, cfg) => {
    el.classList.add("tabsw");
    el.innerHTML = `<div class="tabbar">${cfg.tabs.map((t, i) => `<button data-i="${i}">${t[0]}</button>`).join("")}</div><div class="tabpanel"></div>`;
    const show = (i) => { $$(".tabbar button", el).forEach((b, k) => b.classList.toggle("on", k === i)); $(".tabpanel", el).innerHTML = cfg.tabs[i][1]; };
    $$(".tabbar button", el).forEach((b) => b.onclick = () => show(+b.dataset.i));
    show(0);
  };

  /* ---------------------------------------------------------- generic: compare */
  W.compare = (el, cfg) => {
    el.classList.add("cmp");
    if (cfg.left) {
      const side = (s) => `<div class="cmpside" style="--c:${s.c}"><h5>${s.h}</h5><ul>${s.items.map((i) => `<li>${i}</li>`).join("")}</ul></div>`;
      el.innerHTML = `<div class="cmp2">${side(cfg.left)}<div class="vs">vs</div>${side(cfg.right)}</div>${cfg.foot ? `<p class="cmpfoot">${cfg.foot}</p>` : ""}`;
    } else if (cfg.cols) {
      el.innerHTML = `<div class="cmpcols">${cfg.cols.map((c) => `<div><b>${c[0]}</b><span>${c[1]}</span></div>`).join("")}</div>`;
    } else if (cfg.rows) {
      const [hd, ...rs] = cfg.rows;
      el.innerHTML = `<div class="tblwrap"><table class="tbl"><tr>${hd.map((x) => `<th>${x}</th>`).join("")}</tr>${rs.map((r) => `<tr>${r.map((x) => `<td>${x}</td>`).join("")}</tr>`).join("")}</table></div>${cfg.foot ? `<p class="cmpfoot">${cfg.foot}</p>` : ""}`;
    }
  };

  /* ---------------------------------------------------------- generic: put-in-order game */
  W.order = (el, cfg) => {
    el.classList.add("ordergame");
    const correct = cfg.items;
    const alts = [correct, ...(cfg.alts || [])];
    let picked = [];
    const draw = () => {
      const pool = el._pool.filter((x) => !picked.includes(x));
      el.innerHTML = `<div class="og-l">Tap the items in order:</div>
        <div class="og-pool">${pool.map((x) => `<button class="og-chip">${x}</button>`).join("") || '<span class="og-empty">All placed — check your answer!</span>'}</div>
        <ol class="og-list">${picked.map((x) => `<li><span>${x}</span><button class="og-x" title="remove">×</button></li>`).join("")}</ol>
        <div class="og-btns"><button class="btn sm primary og-check" ${picked.length < correct.length ? "disabled" : ""}>Check order</button><button class="btn sm ghost og-reset">Reset</button><button class="btn sm ghost og-show">Show answer</button></div>
        <div class="og-fb"></div>`;
      $$(".og-chip", el).forEach((b) => b.onclick = () => { picked.push(b.textContent); draw(); });
      $$(".og-x", el).forEach((b, i) => b.onclick = () => { picked.splice(i, 1); draw(); });
      $(".og-reset", el).onclick = () => { picked = []; el._pool = shuffle(correct); draw(); };
      $(".og-show", el).onclick = () => { picked = correct.slice(); draw(); check(true); };
      $(".og-check", el).onclick = () => check(false);
    };
    const check = (shown) => {
      const best = alts.find((a) => a.every((x, i) => x === picked[i]));
      const ref = best || correct;
      $$(".og-list li", el).forEach((li, i) => li.classList.add(picked[i] === ref[i] ? "ok" : "bad"));
      const n = picked.filter((x, i) => x === ref[i]).length;
      $(".og-fb", el).innerHTML = (best ? `<div class="fb ok"><b>${shown ? "Here's the order." : "Perfect order!"}</b> ` : `<div class="fb no"><b>${n} of ${correct.length} in the right spot.</b> Try again, or tap “Show answer”. `) + (cfg.why ? cfg.why : "") + "</div>";
    };
    el._pool = shuffle(correct);
    draw();
  };

  /* ---------------------------------------------------------- generic: sorter */
  W.sorter = (el, cfg) => {
    el.classList.add("sorter");
    const items = shuffle(cfg.items);
    let right = 0, done = 0;
    el.innerHTML = `<div class="so-items">${items.map((it, i) => `<div class="so-item" data-i="${i}"><div class="so-t">${it[0]}</div><div class="so-btns">${cfg.cats.map((c, k) => `<button data-k="${k}">${c}</button>`).join("")}</div></div>`).join("")}</div><div class="so-score"></div>`;
    $$(".so-item", el).forEach((row) => {
      const it = items[+row.dataset.i];
      $$("button", row).forEach((b) => b.onclick = () => {
        if (row.classList.contains("answered")) return;
        row.classList.add("answered");
        const ok = +b.dataset.k === it[1];
        b.classList.add(ok ? "ok" : "bad");
        if (!ok) $$("button", row)[it[1]].classList.add("ok");
        done++; if (ok) right++;
        $(".so-score", el).textContent = `${right} / ${done} correct` + (done === items.length ? (right === items.length ? " — perfect!" : " — look at the green answers you missed.") : "");
      });
    });
  };

  /* ================================================================ TRANSPORT */
  W.roadLayers = (el) => {
    const L = [
      ["Pavement", "#374151", "What you drive on — asphalt or concrete. The <b>top</b> layer only.", 40],
      ["Base", "#9CA3AF", "Strong crushed stone that spreads the load from the pavement.", 46],
      ["Subbase", "#C8B79A", "More aggregate below the base; helps support the road and drain water.", 54],
      ["Subgrade", "#8C6B3E", "The <b>native soil</b> at the bottom. Weak soil here = road failure above.", 70]];
    let y = 46, rects = "";
    L.forEach((l, i) => { rects += `<g class="lay" data-i="${i}"><rect x="20" y="${y}" width="520" height="${l[3]}" fill="${l[1]}"/><text x="280" y="${y + l[3] / 2 + 6}" text-anchor="middle" class="svgl" fill="${i === 0 || i === 3 ? "#fff" : "#1F2A37"}">${l[0].toUpperCase()}</text></g>`; y += l[3]; });
    el.innerHTML = `<div class="split"><svg viewBox="0 0 560 270" class="svg">
      <g class="car"><rect x="230" y="18" width="80" height="24" rx="7" fill="#E8590C"/><rect x="246" y="10" width="46" height="14" rx="5" fill="#F4A06B"/><circle cx="248" cy="44" r="7" fill="#111"/><circle cx="292" cy="44" r="7" fill="#111"/></g>
      ${rects}</svg><div class="side-info"><div class="si-h">Tap a layer</div><div class="si-t">Each layer has a job. Start at the top.</div></div></div>`;
    $$(".lay", el).forEach((g) => g.onclick = () => {
      const l = L[+g.dataset.i];
      $$(".lay", el).forEach((x) => x.classList.toggle("dim", x !== g));
      $(".si-h", el).textContent = `${+g.dataset.i + 1}. ${l[0]}`; $(".si-t", el).innerHTML = l[2];
    });
  };

  W.bridge = (el) => {
    const steps = [
      ["deck", "The car's weight presses down on the <b>deck</b> (the road surface)."],
      ["girder", "The deck passes the load to the <b>beams / girders</b> underneath."],
      ["pier", "Girders carry it to the <b>piers</b> (middle supports) and <b>abutments</b> (end supports)."],
      ["found", "Piers and abutments push it into the <b>foundations</b>."],
      ["ground", "Foundations spread it into the <b>ground</b>. Done!"]];
    el.innerHTML = `<svg viewBox="0 0 600 270" class="svg bridge">
      <path d="M0 210 Q300 270 600 210 L600 270 L0 270Z" fill="#C8B79A" class="part ground"/>
      <path d="M170 228 Q300 250 430 228" stroke="#60A5FA" stroke-width="7" fill="none" opacity=".7"/>
      <rect x="30" y="74" width="540" height="16" fill="#1E3A5F" class="part deck"/>
      <rect x="30" y="90" width="540" height="22" fill="#4A78A8" class="part girder"/>
      <g class="part pier"><polygon points="30,112 72,112 82,206 20,206" fill="#A8A29E"/><polygon points="528,112 570,112 580,206 518,206" fill="#A8A29E"/><rect x="214" y="112" width="30" height="104" fill="#A8A29E"/><rect x="356" y="112" width="30" height="104" fill="#A8A29E"/></g>
      <g class="part found"><rect x="196" y="216" width="66" height="22" fill="#57534E"/><rect x="338" y="216" width="66" height="22" fill="#57534E"/><rect x="6" y="206" width="90" height="20" fill="#57534E"/><rect x="504" y="206" width="90" height="20" fill="#57534E"/></g>
      <g class="vehicle"><rect x="262" y="52" width="58" height="22" rx="6" fill="#E8590C"/><circle cx="276" cy="75" r="0"/></g>
      <circle class="load" cx="291" cy="80" r="9" fill="#C92A2A"/>
      <text x="30" y="30" class="svgs" fill="#1E3A5F">SUPERSTRUCTURE = deck + girders</text>
      <text x="30" y="48" class="svgs" fill="#57534E">SUBSTRUCTURE = piers, abutments + foundations</text>
    </svg>
    <div class="bridge-ctl"><button class="btn sm primary bplay">▶ Play the load path</button><div class="bsteps">${steps.map((s, i) => `<button data-i="${i}">${i + 1}</button>`).join("")}</div></div>
    <div class="bstep-t">Press play, or tap 1–5.</div>`;
    const pos = { deck: [291, 82], girder: [291, 101], pier: [229, 160], found: [229, 227], ground: [229, 252] };
    const go = (i) => {
      const [k, t] = steps[i];
      $$(".part", el).forEach((p) => p.classList.toggle("lit", p.classList.contains(k)));
      const c = $(".load", el); c.setAttribute("cx", pos[k][0]); c.setAttribute("cy", pos[k][1]);
      $(".bstep-t", el).innerHTML = `<b>Step ${i + 1}:</b> ${t}`;
      $$(".bsteps button", el).forEach((b, j) => b.classList.toggle("on", j === i));
    };
    $$(".bsteps button", el).forEach((b) => b.onclick = () => go(+b.dataset.i));
    $(".bplay", el).onclick = () => { let i = 0; go(0); clearInterval(el._t); el._t = setInterval(() => { i++; if (i >= steps.length) return clearInterval(el._t); go(i); }, 1300); };
  };

  W.bridgeTypes = (el) => {
    const T = [
      ["Beam", "Simple girders resting on supports. Common for shorter spans.", `<rect x="20" y="40" width="220" height="12" fill="#1F2A37"/><rect x="26" y="52" width="12" height="44" fill="#9CA3AF"/><rect x="124" y="52" width="12" height="44" fill="#9CA3AF"/><rect x="222" y="52" width="12" height="44" fill="#9CA3AF"/>`],
      ["Arch", "A curved arch pushes the load outward to the ends.", `<rect x="20" y="30" width="220" height="10" fill="#1F2A37"/><path d="M26 96 Q130 -4 234 96" stroke="#9CA3AF" stroke-width="10" fill="none"/>${[70, 100, 130, 160, 190].map((x) => `<line x1="${x}" y1="40" x2="${x}" y2="${x === 130 ? 46 : 58}" stroke="#9CA3AF" stroke-width="3"/>`).join("")}`],
      ["Suspension", "The deck hangs from big main cables draped over tall towers. Very long spans.", `<rect x="10" y="66" width="240" height="8" fill="#1F2A37"/><rect x="66" y="10" width="9" height="86" fill="#9CA3AF"/><rect x="185" y="10" width="9" height="86" fill="#9CA3AF"/><path d="M10 50 Q38 14 70 12 Q130 66 190 12 Q222 14 250 50" stroke="#C92A2A" stroke-width="3" fill="none"/>${[90, 110, 130, 150, 170].map((x) => `<line x1="${x}" y1="${12 + 50 * (1 - ((x - 130) / 60) ** 2)}" x2="${x}" y2="66" stroke="#C92A2A" stroke-width="1.4"/>`).join("")}`],
      ["Cable-stayed", "Straight cables run directly from towers to the deck — a fan shape.", `<rect x="10" y="66" width="240" height="8" fill="#1F2A37"/><rect x="80" y="8" width="9" height="88" fill="#9CA3AF"/><rect x="170" y="8" width="9" height="88" fill="#9CA3AF"/>${[1, 2, 3, 4].map((k) => `<line x1="84" y1="${12 + k * 4}" x2="${84 - k * 16}" y2="66" stroke="#C92A2A" stroke-width="1.4"/><line x1="84" y1="${12 + k * 4}" x2="${84 + k * 10}" y2="66" stroke="#C92A2A" stroke-width="1.4"/><line x1="174" y1="${12 + k * 4}" x2="${174 - k * 10}" y2="66" stroke="#C92A2A" stroke-width="1.4"/><line x1="174" y1="${12 + k * 4}" x2="${174 + k * 16}" y2="66" stroke="#C92A2A" stroke-width="1.4"/>`).join("")}`]];
    el.innerHTML = `<div class="btypes">${T.map((t) => `<div class="bt"><svg viewBox="0 0 260 104" class="svg">${t[2]}</svg><b>${t[0]}</b><span>${t[1]}</span></div>`).join("")}</div>`;
  };

  /* ================================================================ WATER */
  W.water3 = (el) => {
    const SYS = {
      drink: { n: "Drinking water", c: "#2F7DD1", steps: ["Source (reservoir, river or well)", "Treatment plant", "Storage (tanks)", "Distribution pipes (pressurized)", "Your tap"], note: "Delivers <b>treated</b> water to homes and businesses." },
      waste: { n: "Wastewater", c: "#8C6B3E", steps: ["Building drain", "Sewer main (gravity)", "Pump station (if needed)", "Treatment plant", "River / reuse"], note: "Collects <b>sewage</b> and sends it to be cleaned." },
      storm: { n: "Stormwater", c: "#2B8A3E", steps: ["Rain hits roofs & streets", "Runs off to the curb", "Catch basin / storm drain", "Pipes, culverts, detention", "Outfall to a river"], note: "Manages <b>runoff, flooding and water quality</b>." }};
    el.innerHTML = `<div class="sysbtns">${Object.entries(SYS).map(([k, s]) => `<button data-k="${k}" style="--c:${s.c}">${s.n}</button>`).join("")}</div>
    <svg viewBox="0 0 760 300" class="svg city">
      <rect x="0" y="0" width="760" height="300" fill="#EEF6FB"/>
      <rect x="0" y="190" width="760" height="110" fill="#E7DCC8"/>
      <path d="M560 300 Q620 230 760 240 L760 300Z" fill="#60A5FA" opacity=".55"/><text x="680" y="285" class="svgs" fill="#1E3A5F">RIVER</text>
      <ellipse cx="70" cy="178" rx="58" ry="16" fill="#60A5FA"/><text x="70" y="160" text-anchor="middle" class="svgs">RESERVOIR</text>
      <rect x="150" y="140" width="80" height="50" rx="6" fill="#DBEAFE" stroke="#2F7DD1"/><text x="190" y="170" text-anchor="middle" class="svgs">WATER PLANT</text>
      <rect x="268" y="72" width="34" height="34" rx="17" fill="#93C5FD" stroke="#2F7DD1"/><line x1="276" y1="106" x2="272" y2="190" stroke="#2F7DD1" stroke-width="3"/><line x1="294" y1="106" x2="298" y2="190" stroke="#2F7DD1" stroke-width="3"/><text x="285" y="64" text-anchor="middle" class="svgs">TANK</text>
      <polygon points="350,150 390,118 430,150" fill="#D9480F"/><rect x="356" y="150" width="68" height="40" fill="#fff" stroke="#1F2A37"/><text x="390" y="176" text-anchor="middle" class="svgs">HOME</text>
      <rect x="440" y="186" width="120" height="6" fill="#4B5563"/><text x="500" y="182" text-anchor="middle" class="svgs">STREET</text>
      <rect x="560" y="140" width="90" height="50" rx="6" fill="#F3E8D8" stroke="#8C6B3E"/><text x="605" y="160" text-anchor="middle" class="svgs">WASTEWATER</text><text x="605" y="175" text-anchor="middle" class="svgs">PLANT</text>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<line x1="${430 + i * 22}" y1="${40 + (i % 2) * 12}" x2="${422 + i * 22}" y2="${66 + (i % 2) * 12}" stroke="#60A5FA" stroke-width="2" class="rain"/>`).join("")}
      <g class="pipe drink"><path d="M110 200 H150 M230 200 H285 M285 190 V200 M285 200 H390 V190" /></g>
      <g class="pipe waste"><path d="M410 190 V232 H605 V190 M650 200 Q690 205 700 240"/></g>
      <g class="pipe storm"><path d="M470 192 V256 H540 Q560 262 600 262"/><circle cx="470" cy="196" r="6" class="inlet"/></g>
    </svg>
    <div class="sysinfo"></div>`;
    const show = (k) => {
      const s = SYS[k];
      $$(".sysbtns button", el).forEach((b) => b.classList.toggle("on", b.dataset.k === k));
      $$(".pipe", el).forEach((p) => p.classList.toggle("on", p.classList.contains(k)));
      el.querySelector(".city").dataset.sys = k;
      $(".sysinfo", el).innerHTML = `<p style="--c:${s.c}" class="sysnote"><b>${s.n}:</b> ${s.note}</p><ol class="chain" style="--c:${s.c}">${s.steps.map((x) => `<li>${x}</li>`).join("")}</ol>`;
    };
    $$(".sysbtns button", el).forEach((b) => b.onclick = () => show(b.dataset.k));
    show("drink");
  };

  W.street = (el) => {
    const U = [
      ["power", "Power lines", "#C92A2A", 200, 222, 10, "Electric power cables in conduit — shallow, but deadly if hit."],
      ["comm", "Communication lines", "#7B4FB8", 300, 218, 8, "Phone, cable and fiber. Share the street corridor with everything else."],
      ["gas", "Gas line", "#E0A100", 400, 232, 9, "Natural gas. Hitting one can cause a fire or explosion."],
      ["water", "Water main", "#2F7DD1", 140, 262, 16, "Drinking water — usually <b>pressurized</b>. A break floods the trench fast."],
      ["storm", "Storm drain", "#2B8A3E", 480, 270, 20, "Collects <b>rainwater runoff</b> from catch basins at the curb."],
      ["sewer", "Sanitary sewer", "#8C6B3E", 320, 310, 22, "Carries wastewater — usually <b>gravity flow</b>, so it needs slope and is often deepest."]];
    el.innerHTML = `<div class="split"><svg viewBox="0 120 600 230" class="svg">
      <rect x="0" y="0" width="600" height="190" fill="#EEF6FB"/>
      <rect x="0" y="176" width="600" height="14" fill="#4B5563"/><rect x="0" y="168" width="80" height="8" fill="#D1D5DB"/><rect x="520" y="168" width="80" height="8" fill="#D1D5DB"/>
      <text x="300" y="160" text-anchor="middle" class="svgl" fill="#1F2A37">CITY STREET (cross-section)</text>
      <rect x="0" y="190" width="600" height="160" fill="#D9C8A9"/>
      ${U.map((u) => `<g class="ut" data-k="${u[0]}"><circle cx="${u[3]}" cy="${u[4]}" r="${u[5]}" fill="${u[2]}"/><text x="${u[3]}" y="${u[4] + u[5] + 15}" text-anchor="middle" class="svgs">${u[1]}</text></g>`).join("")}
    </svg><div class="side-info"><div class="si-h">Tap a pipe or line</div><div class="si-t">Everything shares one crowded corridor under the street.</div></div></div>`;
    $$(".ut", el).forEach((g) => g.onclick = () => {
      const u = U.find((x) => x[0] === g.dataset.k);
      $$(".ut", el).forEach((x) => x.classList.toggle("dim", x !== g));
      $(".si-h", el).innerHTML = `<span class="dotc" style="background:${u[2]}"></span>${u[1]}`; $(".si-t", el).innerHTML = u[6];
    });
  };

  W.trench = (el) => {
    el.innerHTML = `<div class="split"><svg viewBox="0 0 420 300" class="svg trench"></svg>
      <div class="side-info"><label class="slab">Trench depth: <b class="dv">3 ft</b></label><input type="range" min="1" max="12" value="3" class="range"><div class="tmsg"></div></div></div>`;
    const draw = (d) => {
      const px = 18, top = 70, depth = d * px, w = 120, x = 150;
      const prot = d >= 5;
      $(".trench", el).innerHTML = `<rect x="0" y="0" width="420" height="${top}" fill="#EEF6FB"/><rect x="0" y="${top}" width="420" height="${300 - top}" fill="#C8A97E"/>
        <rect x="${x}" y="${top}" width="${w}" height="${depth}" fill="#F7F4EE"/>
        ${prot ? `<rect x="${x + 4}" y="${top - 6}" width="8" height="${depth + 6}" fill="#4B5563"/><rect x="${x + w - 12}" y="${top - 6}" width="8" height="${depth + 6}" fill="#4B5563"/>${[0.3, 0.7].map((f) => `<rect x="${x + 12}" y="${top + depth * f}" width="${w - 24}" height="6" fill="#6B7280"/>`).join("")}` : ""}
        <g transform="translate(${x + w / 2 - 8},${top + depth - 46})"><circle cx="8" cy="6" r="6" fill="#E8590C"/><rect x="2" y="13" width="12" height="20" rx="3" fill="#2F5D8A"/><rect x="3" y="33" width="4" height="13" fill="#1F2A37"/><rect x="9" y="33" width="4" height="13" fill="#1F2A37"/></g>
        <line x1="${x + w + 16}" y1="${top}" x2="${x + w + 16}" y2="${top + depth}" stroke="#1F2A37" stroke-width="2"/><text x="${x + w + 24}" y="${top + depth / 2 + 5}" class="svgl" fill="#1F2A37">${d} ft</text>
        <line x1="20" y1="${top + 5 * px}" x2="${x - 8}" y2="${top + 5 * px}" stroke="#C92A2A" stroke-dasharray="5 4" stroke-width="2"/><text x="20" y="${top + 5 * px - 6}" class="svgs" fill="#C92A2A">5 FT LINE</text>
        ${prot ? `<text x="${x + w / 2}" y="${top - 14}" text-anchor="middle" class="svgs" fill="#2B8A3E">TRENCH SHIELD / SHORING</text>` : ""}`;
      $(".dv", el).textContent = d + " ft";
      $(".tmsg", el).innerHTML = prot
        ? `<div class="fb no"><b>${d} ft = 5 ft or deeper.</b> Cave-in protection is generally <b>required</b> (shoring, shields or sloping). A <b>competent person</b> must inspect.</div>`
        : `<div class="fb ok"><b>Under 5 ft.</b> Protection may not be required by the 5-ft rule — but a <b>competent person</b> still assesses the soil. Cave-ins happen in seconds.</div>`;
    };
    $(".range", el).oninput = (e) => draw(+e.target.value);
    draw(3);
  };

  W.sewer = (el) => {
    el.innerHTML = `<div class="toggles"><div class="tg"><span>System</span><button data-s="sep" class="on">Separate</button><button data-s="comb">Combined</button></div><div class="tg"><span>Weather</span><button data-w="dry" class="on">Dry</button><button data-w="rain">Heavy rain</button></div></div>
      <svg viewBox="0 0 760 260" class="svg sewersvg"></svg><div class="sewmsg"></div>`;
    let sys = "sep", wx = "dry";
    const draw = () => {
      const rain = wx === "rain";
      const rainLines = rain ? Array.from({ length: 22 }, (_, i) => `<line x1="${20 + i * 34}" y1="10" x2="${12 + i * 34}" y2="34" stroke="#60A5FA" stroke-width="2" class="rain"/>`).join("") : "";
      let pipes = "";
      if (sys === "sep") {
        pipes = `<path d="M150 150 H560" class="flow brown"/><text x="300" y="140" class="svgs" fill="#8C6B3E">SANITARY SEWER → plant</text>
                 <path d="M150 196 H470 Q560 200 620 236" class="flow green ${rain ? "" : "idle"}"/><text x="230" y="216" class="svgs" fill="#2B8A3E">STORM SEWER → outfall → river ${rain ? "" : "(nearly empty)"}</text>`;
      } else {
        pipes = `<path d="M150 170 H560" class="flow mix ${rain ? "full" : ""}"/><text x="230" y="160" class="svgs" fill="#6B4F2A">ONE COMBINED PIPE: sewage ${rain ? "+ stormwater" : ""} → plant</text>
                 ${rain ? `<path d="M470 172 Q520 220 620 236" class="flow over"/><text x="470" y="250" class="svgs" fill="#C92A2A">OVERFLOW (CSO) → river!</text>` : ""}`;
      }
      $(".sewersvg", el).innerHTML = `<rect width="760" height="260" fill="#F4F8FB"/>${rainLines}
        <polygon points="40,96 80,64 120,96" fill="#D9480F"/><rect x="46" y="96" width="68" height="44" fill="#fff" stroke="#1F2A37"/><text x="80" y="122" text-anchor="middle" class="svgs">HOME</text>
        <rect x="0" y="140" width="150" height="5" fill="#4B5563"/>
        <rect x="560" y="120" width="120" height="70" rx="8" fill="#F3E8D8" stroke="#8C6B3E"/><text x="620" y="152" text-anchor="middle" class="svgs">TREATMENT</text><text x="620" y="168" text-anchor="middle" class="svgs">PLANT</text>
        <path d="M600 260 Q660 220 760 226 L760 260Z" fill="#60A5FA" opacity=".6"/><text x="700" y="252" class="svgs" fill="#1E3A5F">RIVER</text>${pipes}`;
      const m = sys === "sep"
        ? (rain ? "<b>Separate + heavy rain:</b> sewage still goes to the plant; rain goes through the storm sewer to an outfall. No sewage mixes in." : "<b>Separate + dry:</b> sanitary sewer carries wastewater to the plant; the storm sewer is mostly idle.")
        : (rain ? "<b>Combined + heavy rain:</b> rain + sewage fill the single pipe beyond its capacity → overflow structures can dump <b>mixed sewage and stormwater</b> into the river. That's a <b>combined sewer overflow</b>." : "<b>Combined + dry:</b> one pipe easily carries sewage to the plant.");
      $(".sewmsg", el).innerHTML = `<div class="fb ${sys === "comb" && rain ? "no" : "ok"}">${m}</div>`;
    };
    $$("[data-s]", el).forEach((b) => b.onclick = () => { sys = b.dataset.s; $$("[data-s]", el).forEach((x) => x.classList.toggle("on", x === b)); draw(); });
    $$("[data-w]", el).forEach((b) => b.onclick = () => { wx = b.dataset.w; $$("[data-w]", el).forEach((x) => x.classList.toggle("on", x === b)); draw(); });
    draw();
  };

  W.runoff = (el) => {
    el.innerHTML = `<label class="slab">How much of the ground is paved? <b class="pv"></b></label><input type="range" min="0" max="4" value="0" class="range">
      <svg viewBox="0 0 760 210" class="svg runsvg"></svg><div class="rmsg"></div>`;
    const lab = ["Natural ground", "A little paving", "Half paved", "Mostly paved", "All roofs & asphalt"];
    const draw = (v) => {
      const paved = v / 4, n = 16;
      let s = `<rect width="760" height="210" fill="#F4F8FB"/><rect y="130" width="760" height="80" fill="#B08D57"/>`;
      s += `<rect x="0" y="122" width="${760 * paved}" height="10" fill="#4B5563"/><rect x="${760 * paved}" y="122" width="${760 * (1 - paved)}" height="10" fill="#6BAF6B"/>`;
      for (let i = 0; i < n; i++) {
        const x = 24 + i * 46, onPave = x < 760 * paved;
        s += `<line x1="${x}" y1="14" x2="${x - 6}" y2="40" stroke="#60A5FA" stroke-width="2.5"/>`;
        s += onPave ? `<path d="M${x - 6} 112 q20 4 34 8" stroke="#2F7DD1" stroke-width="3" fill="none" marker-end="url(#ra)"/>` : `<line x1="${x - 6}" y1="136" x2="${x - 8}" y2="170" stroke="#2F7DD1" stroke-width="3" marker-end="url(#ra)"/>`;
      }
      s = `<defs><marker id="ra" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#2F7DD1"/></marker></defs>` + s;
      s += `<text x="12" y="200" class="svgs" fill="#fff">↓ soaks into soil (infiltration)</text><text x="12" y="104" class="svgs">→ runs off the surface</text>`;
      $(".runsvg", el).innerHTML = s;
      $(".pv", el).textContent = lab[v];
      $(".rmsg", el).innerHTML = v <= 1 ? "Most rain <b>soaks in</b>. Little runoff." : v >= 3 ? "Most rain <b>runs off</b> — carrying trash, sediment and oil to drains and streams. Bigger flood risk." : "About half soaks in, half runs off.";
    };
    $(".range", el).oninput = (e) => draw(+e.target.value);
    draw(0);
  };

  /* ================================================================ ENERGY */
  W.voltage = (el) => {
    const names = ["Low", "Medium", "High", "Very high", "Extra high"];
    el.innerHTML = `<label class="slab">Transmission voltage: <b class="vv"></b></label><input type="range" min="1" max="5" value="1" class="range">
      <div class="vbars"><div><span>Power sent</span><div class="bar"><i class="b-p"></i></div><em>same every time</em></div><div><span>Current in the wire</span><div class="bar"><i class="b-i"></i></div><em class="ti"></em></div><div><span>Energy lost as heat</span><div class="bar"><i class="b-l"></i></div><em class="tl"></em></div></div>
      <p class="small">Relative, not real numbers. For the same power, current = power ÷ voltage, and wire losses grow with current squared.</p>`;
    const draw = (v) => {
      const I = 1 / v, L = I * I;
      $(".vv", el).textContent = names[v - 1];
      $(".b-p", el).style.width = "100%"; $(".b-i", el).style.width = I * 100 + "%"; $(".b-l", el).style.width = L * 100 + "%";
      $(".ti", el).textContent = v === 1 ? "high" : `${v}× lower`; $(".tl", el).textContent = v === 1 ? "high" : `${v * v}× lower`;
    };
    $(".range", el).oninput = (e) => draw(+e.target.value);
    draw(1);
  };

  W.battery = (el) => {
    el.innerHTML = `<div class="toggles"><div class="tg"><span>Battery is…</span><button data-m="c" class="on">Charging</button><button data-m="d">Discharging</button></div></div><svg viewBox="0 0 700 150" class="svg batt"></svg><div class="bmsg"></div>`;
    const draw = (m) => {
      const ch = m === "c";
      $(".batt", el).innerHTML = `<defs><marker id="ba" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#E8590C"/></marker></defs>
        <rect x="30" y="40" width="160" height="70" rx="10" fill="#FFF4E6" stroke="#D9480F"/><text x="110" y="80" text-anchor="middle" class="svgl">GRID</text>
        <rect x="480" y="40" width="190" height="70" rx="10" fill="#EBFBEE" stroke="#2B8A3E"/><rect x="660" y="62" width="10" height="26" fill="#2B8A3E"/>
        <rect x="488" y="48" width="${ch ? 80 : 150}" height="54" rx="6" fill="#2B8A3E" opacity=".5"/><text x="575" y="80" text-anchor="middle" class="svgl">BATTERY</text>
        <line x1="${ch ? 200 : 470}" y1="75" x2="${ch ? 470 : 200}" y2="75" stroke="#E8590C" stroke-width="5" marker-end="url(#ba)" class="dash"/>
        <text x="335" y="60" text-anchor="middle" class="svgs">${ch ? "extra power available → store it" : "grid needs power → send it back"}</text>`;
      $(".bmsg", el).innerHTML = `<b>${ch ? "Charge" : "Discharge"}</b> when ${ch ? "power is available" : "the grid needs it"}. Either way, the battery only moves energy around in time — it never <b>creates</b> it.`;
    };
    $$("[data-m]", el).forEach((b) => b.onclick = () => { $$("[data-m]", el).forEach((x) => x.classList.toggle("on", x === b)); draw(b.dataset.m); });
    draw("c");
  };

  /* ================================================================ MODULAR */
  W.ford = (el) => {
    el.innerHTML = `<div class="ford"><div class="fq">How much faster did Ford's moving line make a Model T chassis?</div>
      <div class="fopts">${["About the same", "2×", "5×", "8×"].map((x, i) => `<button data-i="${i}">${x}</button>`).join("")}</div>
      <div class="fres" hidden>
        <div class="frow"><span>Before (1913): car stands still, crews move</span><div class="bar big"><i style="width:100%;background:#9CA3AF"></i></div><b>12.5 hours</b></div>
        <div class="frow"><span>Moving line: work moves to the worker</span><div class="bar big"><i class="fast" style="width:12.4%;background:#7B4FB8"></i></div><b>93 minutes</b></div>
        <div class="fbig">≈ 8× faster</div></div></div>`;
    $$(".fopts button", el).forEach((b) => b.onclick = () => {
      $$(".fopts button", el).forEach((x, i) => { x.classList.toggle("ok", i === 3); x.classList.toggle("bad", x === b && i !== 3); x.disabled = true; });
      $(".fres", el).hidden = false;
    });
  };

  W.schedule = (el) => {
    const F = [["site", "Site work", 8], ["build", "Build on site (site-built)", 20], ["fac", "Factory build (modular)", 10], ["set", "Set & finish (modular)", 1], ["gc", "General conditions per week ($)", 25000]];
    el.innerHTML = `<div class="calc"><div class="inputs">${F.map((f) => `<label>${f[1]}<input type="number" min="0" step="${f[0] === "gc" ? 1000 : 1}" value="${f[2]}" data-k="${f[0]}"></label>`).join("")}</div>
      <svg viewBox="0 0 760 170" class="svg gantt"></svg><div class="cres"></div><p class="small">Example numbers you can change. (Haven Coffee: ~10 weeks in the factory, about a week to set.)</p></div>`;
    const draw = () => {
      const v = {}; $$("input", el).forEach((i) => v[i.dataset.k] = Math.max(0, +i.value || 0));
      const sb = v.site + v.build, md = Math.max(v.site, v.fac) + v.set, max = Math.max(sb, md, 1), S = 600 / max, x0 = 140;
      const bar = (x, y, w, c, t) => w > 0 ? `<rect x="${x0 + x * S}" y="${y}" width="${w * S}" height="26" rx="5" fill="${c}"/><text x="${x0 + x * S + 6}" y="${y + 17}" class="svgs" fill="#fff">${w * S > 70 ? t : ""}</text>` : "";
      $(".gantt", el).innerHTML = `<text x="0" y="40" class="svgl">Site-built</text>${bar(0, 22, v.site, "#8C6B3E", "Site work")}${bar(v.site, 22, v.build, "#D9480F", "Build on site")}
        <text x="${x0 + sb * S + 6}" y="40" class="svgs">${sb} wks</text>
        <text x="0" y="104" class="svgl">Modular</text>${bar(0, 76, v.site, "#8C6B3E", "Site work")}${bar(0, 108, v.fac, "#7B4FB8", "Factory (same time)")}${bar(Math.max(v.site, v.fac), 92, v.set, "#2B8A3E", "Set")}
        <text x="${x0 + md * S + 6}" y="110" class="svgs">${md} wks</text>
        <line x1="${x0}" y1="150" x2="${x0 + 600}" y2="150" stroke="#9CA3AF"/><text x="${x0}" y="166" class="svgs" fill="#6B7280">0</text><text x="${x0 + 600}" y="166" text-anchor="end" class="svgs" fill="#6B7280">${max} weeks</text>`;
      const saved = sb - md;
      $(".cres", el).innerHTML = `<div class="kpis"><div><span>Site-built</span><b>${sb} wks</b></div><div><span>Modular</span><b>${md} wks</b></div><div class="hl"><span>Weeks saved</span><b>${saved}</b></div><div class="hl"><span>General conditions saved</span><b>${money(saved * v.gc)}</b></div></div>`;
    };
    $$("input", el).forEach((i) => i.oninput = draw);
    draw();
  };

  /* ================================================================ OPS */
  W.ladder = (el) => {
    const S = [["Reactive", "Fix it after it breaks", "Low-risk, cheap, replaceable items (a lamp)", "Surprise downtime, extra damage, emergency cost", "#9CA3AF"],
      ["Preventive", "Scheduled by time, use or manufacturer", "Recurring service needs (filter changes, lubrication)", "Over-maintaining wastes labor & materials", "#2F5D8A"],
      ["Condition-based", "Act when the condition shows wear", "When you can measure deterioration", "Needs good inspections or sensor data", "#1F7A72"],
      ["Predictive", "Use data trends to forecast failure", "Critical, monitored equipment (vibration, temperature)", "Data quality & staff judgment matter; not every asset is worth it", "#7B4FB8"]];
    el.innerHTML = `<div class="ladder">${S.map((s, i) => `<div class="rung" style="--c:${s[4]};--i:${i}"><div class="rn">${i + 1}</div><div><b>${s[0]}</b><span class="rd">${s[1]}</span><span><em>Use for:</em> ${s[2]}</span><span><em>Watch out:</em> ${s[3]}</span></div></div>`).join("")}</div><div class="lad-ax"><span>simpler</span><span>more data & planning →</span></div>`;
  };

  W.lifecycle = (el) => {
    el.innerHTML = `<div class="calc"><div class="inputs four"><label>Option A price<input type="number" data-k="pa" value="40000" step="1000"></label><label>A yearly cost<input type="number" data-k="oa" value="8000" step="500"></label><label>Option B price<input type="number" data-k="pb" value="55000" step="1000"></label><label>B yearly cost<input type="number" data-k="ob" value="5000" step="500"></label></div>
      <label class="slab">Years: <b class="yv"></b></label><input type="range" min="1" max="20" value="10" class="range" data-k="y">
      <svg viewBox="0 0 760 240" class="svg lc"></svg><div class="cres"></div></div>`;
    const draw = () => {
      const v = {}; $$("[data-k]", el).forEach((i) => v[i.dataset.k] = +i.value || 0);
      const Y = 20, A = (t) => v.pa + v.oa * t, B = (t) => v.pb + v.ob * t, mx = Math.max(A(Y), B(Y)) * 1.05;
      const X = (t) => 60 + t * 34, Yp = (c) => 210 - (c / mx) * 190;
      const line = (f, c) => `<polyline points="${Array.from({ length: Y + 1 }, (_, t) => `${X(t)},${Yp(f(t))}`).join(" ")}" fill="none" stroke="${c}" stroke-width="3"/>`;
      let cross = "";
      if (v.oa !== v.ob) { const t = (v.pb - v.pa) / (v.oa - v.ob); if (t > 0 && t < Y) cross = `<circle cx="${X(t)}" cy="${Yp(A(t))}" r="6" fill="#fff" stroke="#1F2A37" stroke-width="2"/><text x="${X(t)}" y="${Yp(A(t)) - 12}" text-anchor="middle" class="svgs">break-even ≈ yr ${t.toFixed(1)}</text>`; }
      $(".lc", el).innerHTML = `<line x1="60" y1="210" x2="740" y2="210" stroke="#9CA3AF"/><line x1="60" y1="20" x2="60" y2="210" stroke="#9CA3AF"/>
        <rect x="${X(v.y) - 1}" y="20" width="2" height="190" fill="#E8590C" opacity=".5"/>${line(A, "#D9480F")}${line(B, "#2F5D8A")}${cross}
        <text x="${X(Y) - 4}" y="${Yp(A(Y)) - 8}" text-anchor="end" class="svgs" fill="#D9480F">Option A</text><text x="${X(Y) - 4}" y="${Yp(B(Y)) + 18}" text-anchor="end" class="svgs" fill="#2F5D8A">Option B</text>
        <text x="60" y="232" class="svgs" fill="#6B7280">year 0</text><text x="740" y="232" text-anchor="end" class="svgs" fill="#6B7280">year 20</text><text x="56" y="28" text-anchor="end" class="svgs" fill="#6B7280">$</text>`;
      $(".yv", el).textContent = v.y;
      const a = A(v.y), b = B(v.y), d = Math.abs(a - b);
      $(".cres", el).innerHTML = `<div class="kpis"><div><span>A over ${v.y} yrs</span><b>${money(a)}</b></div><div><span>B over ${v.y} yrs</span><b>${money(b)}</b></div><div class="hl"><span>Cheaper</span><b>${a === b ? "Tie" : (a < b ? "A" : "B") + " by " + money(d)}</b></div></div><p class="small">Total = purchase price + (yearly cost × years). Simple, undiscounted.</p>`;
    };
    $$("[data-k]", el).forEach((i) => i.oninput = draw);
    draw();
  };

  W.fci = (el) => {
    el.innerHTML = `<div class="calc"><div class="inputs"><label>Repair needs ($)<input type="number" data-k="r" value="2000000" step="100000"></label><label>Replacement value ($)<input type="number" data-k="v" value="20000000" step="1000000"></label></div>
      <div class="fcieq"></div><div class="bar fcibar"><i></i></div><div class="fciax"><span>0 · less repair burden</span><span>more repair burden →</span></div></div>`;
    const draw = () => {
      const r = +$("[data-k=r]", el).value || 0, v = +$("[data-k=v]", el).value || 1, f = r / v;
      $(".fcieq", el).innerHTML = `FCI = ${money(r)} ÷ ${money(v)} = <b>${f.toFixed(2)}</b>`;
      $(".fcibar i", el).style.width = Math.min(f / 0.5, 1) * 100 + "%";
    };
    $$("input", el).forEach((i) => i.oninput = draw);
    draw();
  };

  W.budget = (el) => {
    const O = [["Roof leak repair & waterproofing", 65000, "Leaks cause water damage & mold and can threaten electrical equipment."],
      ["HVAC controls & targeted repairs", 70000, "Comfort, indoor air and energy use."],
      ["LED lighting retrofit", 40000, "Saves energy over time; usually not urgent."],
      ["Plumbing fixture & valve repairs", 25000, "Prevents leaks and service disruptions."],
      ["Condition assessment & asset inventory", 20000, "Gives you the data to plan everything else."]];
    const MAX = 150000;
    el.innerHTML = `<div class="budget">${O.map((o, i) => `<label class="bopt"><input type="checkbox" data-i="${i}"><span class="bn">${o[0]}</span><b>${money(o[1])}</b></label>`).join("")}
      <div class="bar bbar"><i></i></div><div class="bsum"></div><div class="bfb"></div><p class="small">Costs are classroom assumptions from the lecture, not real estimates.</p></div>`;
    const draw = () => {
      const on = $$("input", el).map((c) => c.checked);
      const tot = O.reduce((s, o, i) => s + (on[i] ? o[1] : 0), 0);
      $(".bbar i", el).style.width = Math.min(tot / MAX, 1) * 100 + "%";
      $(".bbar i", el).style.background = tot > MAX ? "#C92A2A" : "#1F7A72";
      $(".bsum", el).innerHTML = `<b>${money(tot)}</b> of ${money(MAX)} · ${tot > MAX ? `<span class="neg">over by ${money(tot - MAX)}</span>` : `${money(MAX - tot)} left`}`;
      const deferred = O.filter((_, i) => !on[i]);
      $(".bfb", el).innerHTML = tot === 0 ? "" : `<div class="fb ${tot > MAX ? "no" : "ok"}">${tot > MAX ? "<b>Over budget</b> — something has to be deferred." : "<b>Within budget.</b>"} ${deferred.length ? "<br>You're deferring: " + deferred.map((o) => `<b>${o[0]}</b> (${o[2]})`).join("; ") + ". Explain why that risk is acceptable." : ""}</div>`;
    };
    $$("input", el).forEach((c) => c.onchange = draw);
    draw();
  };

  /* ================================================================ REAL ESTATE */
  W.cpv = (el) => {
    el.innerHTML = `<div class="cpv"><div style="--c:#D9480F"><b>COST</b><span>Dollars <b>spent</b> to buy land & build</span><em>e.g. it cost $20M to build</em></div><div style="--c:#2F5D8A"><b>PRICE</b><span>What a buyer actually <b>pays</b> in a sale</span><em>e.g. someone pays $22M</em></div><div style="--c:#2B8A3E"><b>VALUE</b><span>What it's <b>worth</b> under a stated method</span><em>e.g. income approach says $21M</em></div></div><p class="small">Example numbers. The point: a project can cost $20M and be worth <b>less or more</b>.</p>`;
  };

  W.tdc = (el) => {
    const F = [["hard", "Hard costs (construction)", 12, "#D9480F"], ["land", "Land", 3, "#8C6B3E"], ["soft", "Soft costs", 2, "#2F5D8A"], ["fin", "Financing", 0, "#7B4FB8"], ["cont", "Contingency", 1, "#9CA3AF"]];
    el.innerHTML = `<div class="calc"><div class="inputs five">${F.map((f) => `<label><span><span class="sw" style="background:${f[3]}"></span>${f[1]} ($M)</span><input type="number" min="0" step="0.5" value="${f[2]}" data-k="${f[0]}"></label>`).join("")}</div><div class="stack"></div><div class="cres"></div></div>`;
    const draw = () => {
      const v = F.map((f) => Math.max(0, +$(`[data-k=${f[0]}]`, el).value || 0)), t = v.reduce((a, b) => a + b, 0) || 1;
      $(".stack", el).innerHTML = F.map((f, i) => v[i] ? `<i style="flex:${v[i]};background:${f[3]}" title="${f[1]}">${v[i] / t > 0.08 ? "$" + v[i] + "M" : ""}</i>` : "").join("");
      $(".cres", el).innerHTML = `<div class="kpis"><div class="hl wide"><span>Total development cost</span><b>$${+(v.reduce((a, b) => a + b, 0)).toFixed(2)}M</b></div></div>`;
    };
    $$("input", el).forEach((i) => i.oninput = draw);
    draw();
  };

  W.noi = (el) => {
    el.innerHTML = `<div class="calc"><div class="inputs"><label>Effective rental income ($/yr)<input type="number" data-k="r" value="600000" step="10000"></label><label>Other income ($/yr)<input type="number" data-k="o" value="30000" step="5000"></label><label>Operating expenses ($/yr)<input type="number" data-k="e" value="230000" step="10000"></label></div>
      <svg viewBox="0 0 760 230" class="svg wf"></svg>
      <div class="excl"><span>NOT subtracted:</span><s>Debt service (loan payments)</s><s>Income taxes</s><s>Depreciation</s></div></div>`;
    const draw = () => {
      const r = +$("[data-k=r]", el).value || 0, o = +$("[data-k=o]", el).value || 0, e = +$("[data-k=e]", el).value || 0;
      const egi = r + o, noi = egi - e, mx = Math.max(egi, 1), H = 170, Y = (v) => 200 - (v / mx) * H;
      const col = (x, y1, y2, c, top, lab) => `<rect x="${x}" y="${Math.min(y1, y2)}" width="120" height="${Math.abs(y2 - y1)}" fill="${c}" rx="4"/><text x="${x + 60}" y="${Math.min(y1, y2) - 8}" text-anchor="middle" class="svgl">${top}</text><text x="${x + 60}" y="222" text-anchor="middle" class="svgs">${lab}</text>`;
      $(".wf", el).innerHTML = col(30, Y(0), Y(r), "#2F5D8A", money(r), "Rent") + col(180, Y(r), Y(egi), "#4A78A8", "+" + money(o), "Other income") + col(330, Y(0), Y(egi), "#1F2A37", money(egi), "Gross income") + col(480, Y(egi), Y(noi), "#C92A2A", "−" + money(e), "Operating exp.") + col(630, Y(0), Y(noi), "#2B8A3E", money(noi), "NOI");
    };
    $$("input", el).forEach((i) => i.oninput = draw);
    draw();
  };

  W.caprate = (el) => {
    el.innerHTML = `<div class="calc"><div class="inputs"><label>NOI ($/yr)<input type="number" data-k="n" value="400000" step="10000"></label></div>
      <label class="slab">Cap rate: <b class="cv"></b></label><input type="range" min="30" max="100" value="50" class="range">
      <div class="valbig"></div><svg viewBox="0 0 760 200" class="svg capc"></svg>
      <div class="presets"><span>Try the class examples:</span><button data-n="400000" data-c="50">$400k @ 5%</button><button data-n="300000" data-c="50">Building A: $300k @ 5%</button><button data-n="360000" data-c="60">Building B: $360k @ 6%</button><button data-n="480000" data-c="50">Go/no-go: $480k @ 5%</button></div></div>`;
    const draw = () => {
      const n = +$("[data-k=n]", el).value || 0, c = +$(".range", el).value / 1000, val = n / c;
      $(".cv", el).textContent = (c * 100).toFixed(1) + "%";
      $(".valbig", el).innerHTML = `<span>Value = ${money(n)} ÷ ${c.toFixed(3)} =</span><b>${money(val)}</b>`;
      const X = (r) => 60 + (r - 0.03) / 0.07 * 660, mx = n / 0.03, Yv = (v) => 180 - v / mx * 160;
      const pts = Array.from({ length: 71 }, (_, i) => { const r = 0.03 + i * 0.001; return `${X(r)},${Yv(n / r)}`; }).join(" ");
      $(".capc", el).innerHTML = `<line x1="60" y1="180" x2="730" y2="180" stroke="#9CA3AF"/><polyline points="${pts}" fill="none" stroke="#B42318" stroke-width="3"/>
        <circle cx="${X(c)}" cy="${Yv(val)}" r="8" fill="#B42318" stroke="#fff" stroke-width="3"/>
        <text x="60" y="196" class="svgs" fill="#6B7280">3% (lower risk)</text><text x="730" y="196" text-anchor="end" class="svgs" fill="#6B7280">10% (higher risk)</text><text x="70" y="20" class="svgs" fill="#6B7280">higher value</text>`;
    };
    $(".range", el).oninput = draw; $("input[type=number]", el).oninput = draw;
    $$(".presets button", el).forEach((b) => b.onclick = () => { $("[data-k=n]", el).value = b.dataset.n; $(".range", el).value = b.dataset.c; draw(); });
    draw();
  };

  W.gonogo = (el) => {
    el.innerHTML = `<h4>Go / no-go calculator</h4><div class="calc"><div class="inputs"><label>Total development cost ($)<input type="number" data-k="t" value="9500000" step="100000"></label><label>Stabilized NOI ($/yr)<input type="number" data-k="n" value="480000" step="10000"></label><label>Market cap rate (%)<input type="number" data-k="c" value="5" step="0.25"></label></div><div class="cres"></div></div>`;
    const draw = () => {
      const t = +$("[data-k=t]", el).value || 0, n = +$("[data-k=n]", el).value || 0, c = (+$("[data-k=c]", el).value || 1) / 100, v = n / c, m = v - t, pct = t ? m / t * 100 : 0;
      const verdict = m < 0 ? ["no", "Value is BELOW cost → as designed it loses money. Redesign, renegotiate (land/costs), or stop."] : pct < 10 ? ["warn", "Value is only slightly above cost — a thin cushion for risk. Consider redesigning or renegotiating before going."] : ["ok", "Value comfortably exceeds cost → a likely <b>go</b>, if the risks check out."];
      $(".cres", el).innerHTML = `<div class="kpis"><div><span>Value (NOI ÷ cap)</span><b>${money(v)}</b></div><div><span>Cost</span><b>${money(t)}</b></div><div class="hl"><span>Value − cost</span><b class="${m < 0 ? "neg" : ""}">${money(m)} (${pct.toFixed(1)}%)</b></div></div><div class="fb ${verdict[0]}">${verdict[1]}</div><p class="small">The 10% “thin cushion” line is just a rule of thumb for this tool, not from the lecture.</p>`;
    };
    $$("input", el).forEach((i) => i.oninput = draw);
    draw();
  };

  W.payback = (el) => {
    el.innerHTML = `<h4>Simple payback calculator</h4><div class="calc"><div class="inputs"><label>Extra upfront cost ($)<input type="number" data-k="c" value="250000" step="10000"></label><label>Savings per year ($)<input type="number" data-k="s" value="35000" step="1000"></label></div><div class="cres"></div></div>`;
    const draw = () => {
      const c = +$("[data-k=c]", el).value || 0, s = +$("[data-k=s]", el).value || 0;
      $(".cres", el).innerHTML = `<div class="kpis"><div class="hl wide"><span>Payback = cost ÷ yearly savings</span><b>${s ? (c / s).toFixed(1) + " years" : "—"}</b></div></div><p class="small">What simple payback <b>misses</b>: the time value of money (discounting), maintenance costs, risk, and how long the equipment lasts.</p>`;
    };
    $$("input", el).forEach((i) => i.oninput = draw);
    draw();
  };

  window.W = W;
})();

/* Exam 2 lessons — content written from the CONM 1050 lecture slides.
   Each section's html can hold widgets: <div class="w" data-w="NAME" data-k="KEY"></div> */
window.LESSONS = [
/* ================================================================ TRANSPORTATION */
{
  id: "transport", num: 7, short: "Transportation", title: "Transportation Infrastructure",
  color: "#B7791F", icon: "road",
  big: "Roads, bridges, rail, tunnels and airports are <b>systems</b> — and the hardest part is usually <b>rebuilding them while people are still using them</b>.",
  note: "Lecture 7 wasn't on the Exam 1 review list, so it's included here for Exam 2.",
  sections: [
    { t: "Why it matters", html: `
      <p class="lead">We notice buildings. We <b>depend</b> on infrastructure — and we usually only notice it <b>when it fails</b>.</p>
      <div class="cards c5">
        <div class="c"><i>1</i><b>Move people</b></div>
        <div class="c"><i>2</i><b>Move goods & materials</b></div>
        <div class="c"><i>3</i><b>Support emergency services</b></div>
        <div class="c"><i>4</i><b>Connect communities</b></div>
        <div class="c"><i>5</i><b>Keep businesses running</b></div>
      </div>
      <div class="plain"><b>In plain English:</b> transportation is all about <b>access and connectivity</b> — getting people and things from A to B.</div>
      <p>It's <b>one connected network</b>: roads, highways & bridges · rail & public transit · airports · tunnels · pedestrian & bike paths.</p>` },
    { t: "Building project vs. infrastructure project", html: `
      <div class="w" data-w="compare" data-k="transport.vs"></div>
      <div class="tip"><b>Exam tip:</b> the big difference — infrastructure often <b>stays open while you build it</b>.</div>
      <p>Who owns it? Mostly <b>public</b> entities: federal agencies, <b>state DOTs</b>, cities & towns, transit authorities, airport authorities. That means public money, accountability, procurement rules and public disruption.</p>` },
    { t: "Roads: more than asphalt", html: `
      <p>Tap each layer. What you drive on is only the <b>top</b> layer of the system.</p>
      <div class="w" data-w="roadLayers"></div>
      <div class="hook"><b>Memory hook:</b> “<b>P</b>lease <b>B</b>uild <b>S</b>trong <b>S</b>treets” → Pavement, Base, Subbase, Subgrade (top → bottom).</div>
      <h4>Why do roads fail?</h4>
      <div class="chips"><span>Water & poor drainage</span><span>Freeze / thaw cycles</span><span>Weak soil underneath</span><span>Heavy traffic & aging materials</span><span>Poor construction</span></div>` },
    { t: "How a road gets built", html: `
      <p>Put the steps in order, then check yourself.</p>
      <div class="w" data-w="order" data-k="transport.road"></div>
      <div class="think"><b>Think:</b> what if you forget a utility before paving? You tear up brand-new pavement. That's why <b>drainage & utilities come early</b>.</div>` },
    { t: "The CM problem: 50,000 cars a day", html: `
      <p class="lead">Rebuild the highway while <b>50,000 vehicles</b> still use it every day. It's a <b>management</b> problem as much as a technical one.</p>
      <div class="cards c4">
        <div class="c"><b>Traffic</b><span>lane closures & detours</span></div>
        <div class="c"><b>Phasing</b><span>temporary roads, staged work</span></div>
        <div class="c"><b>Schedule</b><span>night work</span></div>
        <div class="c"><b>Safety</b><span>protect workers beside traffic</span></div>
      </div>` },
    { t: "Bridges: follow the load", html: `
      <p>A bridge is a system: <b>Deck → Superstructure → Substructure → Foundations</b>. Press play to follow the weight of a car down to the ground.</p>
      <div class="w" data-w="bridge"></div>
      <div class="think"><b>Think:</b> if one link in the load path can't do its job, the whole path fails.</div>
      <h4>Four bridge types</h4>
      <div class="w" data-w="bridgeTypes"></div>
      <p>Engineers choose based on <b>span, site, cost, terrain, constructability, navigation and appearance</b>. Building over live traffic? <b>Close lanes beneath suspended loads.</b></p>
      <div class="case"><span>Local case</span><b>I-90 / I-95 Newton–Weston (MassDOT)</b> — <b>8 bridges</b>: 5 replacements, 1 rehabilitation, 2 superstructure replacements, all with <b>active interstate traffic</b> and complex phasing.</div>` },
    { t: "Rail, tunnels & airports", html: `
      <div class="cards c3">
        <div class="c"><b>Rail = a coordinated system</b><span>tracks & stations · signals & communication · power · bridges & tunnels. A road has traffic; rail has <b>passengers, trains, power, signals, track geometry and schedules</b>. One mistake can stop the whole system.</span></div>
        <div class="c"><b>Why go underground?</b><span>no space in dense cities · traffic · water & mountain crossings · environmental limits. Risks: <b>groundwater</b>, existing utilities, nearby buildings, ventilation & worker safety, <b>spoil removal</b>.</span></div>
        <div class="c"><b>An airport is a small city</b><span>airfield (runways, taxiways) · passenger areas · access (roads, parking) · operations (utilities, security). Runway rehab = short closure windows + safety zones + precise scheduling.</span></div>
      </div>
      <div class="case"><span>Boston case</span><b>The Big Dig</b> — dense city, traffic, utilities, rail, nearby buildings, groundwater. Lesson: <b>often coordination is harder than the construction itself.</b></div>` },
    { t: "Same problem, four places", html: `
      <div class="w" data-w="compare" data-k="transport.four"></div>
      <p>The five themes that show up every time:</p>
      <div class="chips big"><span>TRAFFIC</span><span>PHASING</span><span>UTILITIES</span><span>SAFETY</span><span>PUBLIC COORDINATION</span></div>` },
  ],
  takeaways: ["Road layers: Pavement → Base → Subbase → Subgrade", "Bridge load path: Deck → Girders → Piers/Abutments → Foundation → Ground", "Infrastructure often stays open during construction", "Most transportation infrastructure is publicly owned", "Big Dig lesson: coordination is often the hardest part"]
},

/* ================================================================ WATER */
{
  id: "water", num: 8, short: "Water", title: "Water Infrastructure",
  color: "#0E7490", icon: "drop",
  big: "Every city runs <b>three separate water systems</b>: drinking water in, wastewater out, and stormwater away.",
  sections: [
    { t: "One city, three water systems", html: `
      <p>Tap a system to follow its journey.</p>
      <div class="w" data-w="water3"></div>
      <div class="tip"><b>Exam tip:</b> <b>wastewater is NOT the same as stormwater.</b> They're different networks (except old “combined” systems — see below).</div>` },
    { t: "Drinking water: where it starts & how it's cleaned", html: `
      <div class="cards c2">
        <div class="c"><b>Surface water</b><span>lakes, reservoirs, rivers</span></div>
        <div class="c"><b>Groundwater</b><span>aquifers, reached through <b>wells</b></span></div>
      </div>
      <p>The <b>source affects the treatment</b>. Communities plan for drought, demand and contamination — protecting the source is part of infrastructure planning.</p>
      <h4>Inside the treatment plant — tap each step</h4>
      <div class="w" data-w="flow" data-k="water.treat"></div>
      <div class="hook"><b>Memory hook:</b> “<b>C</b>lumps <b>S</b>ink, <b>F</b>ilter, <b>D</b>isinfect” → Coagulation/flocculation → Sedimentation → Filtration → Disinfection.</div>
      <h4>Getting it to the building</h4>
      <div class="cards c5">
        <div class="c"><b>Transmission pipes</b><span>long distances</span></div>
        <div class="c"><b>Distribution mains</b><span>streets & neighborhoods</span></div>
        <div class="c"><b>Pumps & elevated tanks</b><span>keep the <b>pressure</b> up</span></div>
        <div class="c"><b>Valves & hydrants</b><span>isolate for repair · firefighting</span></div>
        <div class="c"><b>Meters</b><span>measure use</span></div>
      </div>` },
    { t: "What's under a city street?", html: `
      <p>Tap each pipe or line.</p>
      <div class="w" data-w="street"></div>
      <div class="think"><b>Think:</b> what if a contractor digs without locating existing utilities? You can hit a gas line, cut power, or flood the trench. <b>Always locate first.</b></div>` },
    { t: "Installing a water main + trench safety", html: `
      <div class="w" data-w="flow" data-k="water.main"></div>
      <h4>Trench safety — drag the depth</h4>
      <div class="w" data-w="trench"></div>
      <div class="cards c3">
        <div class="c"><b>Seconds</b><span>a trench can cave in within seconds</span></div>
        <div class="c"><b>Competent person</b><span>assesses the soil & protective systems</span></div>
        <div class="c"><b>5 feet</b><span>or deeper → cave-in protection generally required</span></div>
      </div>
      <div class="tip"><b>Never enter an unprotected or uninspected trench.</b> Water, nearby traffic and buried utilities add risk.</div>` },
    { t: "Wastewater: what happens after you flush", html: `
      <div class="w" data-w="flow" data-k="water.waste"></div>
      <div class="cards c4">
        <div class="c"><b>Laterals</b><span>connect each home to the sewer main</span></div>
        <div class="c"><b>Manholes</b><span>access for inspection & maintenance</span></div>
        <div class="c"><b>Gravity pipes</b><span>need the right <b>slope</b></span></div>
        <div class="c"><b>Lift stations</b><span>pump flow when gravity can't</span></div>
      </div>
      <h4>Inside the wastewater treatment plant</h4>
      <div class="w" data-w="flow" data-k="water.wwtp"></div>
      <p><b>Problems:</b> blockages & cracked/collapsed pipes · groundwater leaking into old pipes · <b>power failure at lift stations</b> · overloaded plants · spills & overflows into rivers and streets.</p>
      <div class="think"><b>Think:</b> a neighborhood grows but the sewer stays the same size → overload, backups, overflows.</div>` },
    { t: "Separate vs. combined sewers", html: `
      <p>Flip the switches and watch what happens in a storm.</p>
      <div class="w" data-w="sewer"></div>
      <div class="case"><span>Local case</span><b>Narragansett Bay sewer tunnels (RI)</b> — combined sewers were dumping untreated sewage + stormwater into local waters in heavy rain. The Narragansett Bay Commission built <b>storage & conveyance tunnels</b> so more flow reaches treatment. First major tunnel finished in <b>2008</b>.</div>` },
    { t: "Stormwater: where does rain go?", html: `
      <div class="w" data-w="runoff"></div>
      <h4>Two ways to handle it</h4>
      <div class="w" data-w="compare" data-k="water.storm"></div>
      <div class="tip"><b>Exam tip:</b> many projects need <b>BOTH</b> green features <b>and</b> engineered drainage. Site conditions decide whether letting water soak in (infiltration) works.</div>
      <h4>Designing for heavier rain</h4>
      <div class="chips"><span>Know where water flows in a storm</span><span>Keep equipment out of flood zones</span><span>Safe overflow routes</span><span>Plan for future rainfall</span><span>Plan inspections & maintenance</span></div>` },
    { t: "Think like a CM: the 100-home challenge", html: `
      <p class="lead">A developer plans <b>100 homes</b>, a park, two roads and a small commercial area. There's a city water main, a sanitary sewer, and a <b>stream</b> along one edge.</p>
      <div class="w" data-w="tabs" data-k="water.challenge"></div>` },
  ],
  takeaways: ["Three systems: drinking water, wastewater, stormwater", "Treatment: coagulation → sedimentation → filtration → disinfection", "Water mains are pressurized; sewers usually flow by gravity", "Combined sewers can overflow in heavy rain", "Trenches 5 ft+ generally need cave-in protection", "Green infrastructure manages rain where it falls"]
},

/* ================================================================ ENERGY */
{
  id: "energy", num: 9, short: "Energy", title: "Energy Infrastructure",
  color: "#D9480F", icon: "bolt",
  big: "One light switch depends on <b>five systems</b>: generation → transmission → substations → distribution → the building.",
  sections: [
    { t: "Follow the electricity", html: `
      <p>Tap each step from the power plant to your phone charger.</p>
      <div class="w" data-w="flow" data-k="energy.grid"></div>
      <div class="think"><b>Think:</b> if Boston lost power tonight, any one of these five links could be the one that failed.</div>` },
    { t: "Where power begins", html: `
      <div class="cards c3">
        <div class="c"><b>Natural gas · nuclear · hydro</b><span>use heat or moving water to spin <b>turbines & generators</b></span></div>
        <div class="c"><b>Wind</b><span>moving air turns blades connected to a generator</span></div>
        <div class="c"><b>Solar PV</b><span>panels turn sunlight <b>directly</b> into electricity</span></div>
      </div>
      <p>Different sources, but the <b>same construction disciplines</b>: site work, foundations, structures, electrical systems, controls and grid connections.</p>
      <h4>An energy project is not just electrical work</h4>
      <div class="w" data-w="flow" data-k="energy.phases"></div>` },
    { t: "Build a solar farm — what goes first?", html: `
      <p>The owner approved the design. Put the work in order.</p>
      <div class="w" data-w="order" data-k="energy.solar"></div>
      <p>A <b>CM manages the interfaces</b>: foundation crews can't wait on late equipment drawings; electricians can't test until upstream systems are ready; the owner needs <b>one realistic completion plan</b>.</p>` },
    { t: "Why send power at high voltage?", html: `
      <p>Slide the voltage up and watch what happens to the current and the energy lost in the wires.</p>
      <div class="w" data-w="voltage"></div>
      <div class="plain"><b>In plain English:</b> higher voltage → lower current for the same power → <b>less energy wasted</b> over long distances. <b>Transformers</b> change the voltage up for travel and down for local use.</div>
      <p>A transmission line is <b>a construction project that moves</b>: long corridors, repeated foundations, many stakeholders. <b>Right-of-way & environmental approvals</b> come before towers go up.</p>` },
    { t: "Substations: where the grid changes gears", html: `
      <div class="w" data-w="tabs" data-k="energy.sub"></div>
      <h4>What could delay a substation?</h4>
      <div class="cards c3">
        <div class="c"><b>Site issue</b><span>land floods or has weak soil</span><em>fix: raised site, stormwater plan</em></div>
        <div class="c"><b>Equipment issue</b><span>a big transformer arrives late</span><em>fix: order early</em></div>
        <div class="c"><b>Operations issue</b><span>utility won't approve the outage for the final hookup</span><em>escalate — a CM can't override utility safety rules</em></div>
      </div>` },
    { t: "Keeping the grid balanced + batteries", html: `
      <div class="stats">
        <div><b>6</b><span>New England states coordinated by <b>ISO New England</b></span></div>
        <div><b>24/7</b><span>monitoring & dispatch</span></div>
        <div><b>60 Hz</b><span>target grid frequency</span></div>
      </div>
      <p>Supply and demand must be <b>balanced constantly</b> as conditions change.</p>
      <div class="w" data-w="battery"></div>
      <div class="tip"><b>Exam tip:</b> batteries <b>store</b> energy — they do <b>not create</b> it, so a battery is not a primary energy source. (~52 GW of U.S. utility-scale battery capacity by June 2026.)</div>
      <h4>When a storm hits, design decisions show</h4>
      <div class="chips"><span>Is the substation above flood level?</span><span>Are lines exposed to trees or wind?</span><span>Is there a second path to hospitals?</span></div>` },
    { t: "Two megaprojects, two kinds of risk", html: `
      <div class="w" data-w="compare" data-k="energy.mega"></div>
      <div class="plain"><b>The lesson:</b> neither is “harder” — they have <b>different</b> risks. Offshore wind fights <b>weather & marine logistics</b>; nuclear fights <b>quality documentation, interfaces & long procurement</b>.</div>
      <p><b>Why CMs will keep seeing energy jobs:</b> U.S. electricity demand is growing — <b>data centers, manufacturing, electrification</b> — so more grid connections, substations, storage and upgrades.</p>` },
    { t: "Team challenge: power a coastal town", html: `
      <div class="w" data-w="tabs" data-k="energy.town"></div>` },
  ],
  takeaways: ["Generation → Transmission → Substation → Distribution → Building", "High voltage = lower current = less loss", "Substations: transformers, switchgear, protection", "Batteries store energy; they don't create it", "Solar order: site prep → foundations → connect & test", "Vineyard Wind = weather risk; Plant Vogtle = quality/interface risk"]
},

/* ================================================================ MODULAR */
{
  id: "modular", num: 10, short: "Modular", title: "Modular Construction (Guest Lecture)",
  color: "#7B4FB8", icon: "box",
  big: "Modular is a <b>delivery method, not a building type</b>: same codes, same trades — just built in a <b>factory</b> while the site is prepared.",
  note: "Guest lecture by Paul Arsenault, VP at BHRS Companies (a Wentworth CM grad).",
  sections: [
    { t: "Forget the trailer picture", html: `
      <p class="lead">Most people picture trailers or portable classrooms. Real modular can have <b>finished siding, a storefront and a nearly finished interior</b> — any look you can specify.</p>
      <div class="plain"><b>In plain English:</b> “The only difference between traditional and modular is <b>where it's built</b>.” Same codes, same materials, same trades, same inspections.</div>
      <h4>BHRS model: one team from land sale to closeout</h4>
      <div class="w" data-w="flow" data-k="modular.bhrs"></div>` },
    { t: "Ford's big idea: move the work to the worker", html: `
      <div class="w" data-w="ford"></div>
      <div class="cards c3">
        <div class="c"><b>The work moves to the worker</b></div>
        <div class="c"><b>Standard parts, standard process</b></div>
        <div class="c"><b>Every station has one job</b></div>
      </div>` },
    { t: "Site-built vs. modular", html: `
      <div class="w" data-w="compare" data-k="modular.vs"></div>
      <h4>The factory line (Lithia, FL) — tap through the stations</h4>
      <div class="w" data-w="flow" data-k="modular.line"></div>
      <p>One superintendent runs the floor; every trade checks in and out daily. Not exactly Ford: every building is different → <b>standard process, flexible spec</b>.</p>` },
    { t: "Time is money: the biggest cost lever", html: `
      <p class="lead">Site-built time = <b>site work + build</b>. Modular time = <b>the longer of site work or factory build</b> (they happen at the same time) <b>+ set</b>.</p>
      <div class="w" data-w="schedule"></div>
      <h4>What runs on the clock every single week?</h4>
      <div class="chips"><span>Supervision & project management</span><span>Trailer, fencing, power, toilets</span><span>Insurance</span><span>Loan interest</span><span>Lost sales</span></div>
      <div class="tip"><b>Exam answer:</b> time on site is the biggest cost lever because <b>general conditions run every week</b> — cut the weeks, cut the cost.</div>` },
    { t: "Days on site, not months — and safety", html: `
      <div class="cards c3">
        <div class="c"><b>Site-built: months</b><span>crews, trucks, noise and traffic for the whole build</span></div>
        <div class="c"><b>Factory: weeks</b><span>built indoors, in parallel with permitting & site work</span></div>
        <div class="c"><b>Modular on site: days</b><span>set off the truck, power the day they arrive</span></div>
      </div>
      <div class="stats one"><div><b>1 in 5</b><span>private-industry worker deaths are in construction. <b>Falls</b> lead the list.</span></div></div>
      <div class="cards c2">
        <div class="c"><b>How a factory helps</b><span>ground-level, covered, controlled work; less weather, theft and exposure</span></div>
        <div class="c"><b>Still needs discipline</b><span>crane picks, rigging, factory machinery, work at height at the <b>mate lines</b></span></div>
      </div>
      <p class="quote">“Nothing we build is worth someone not going home.”</p>` },
    { t: "Design for the box", html: `
      <div class="cards c2">
        <div class="c"><b>Lock the module grid first</b><span>width & length drive the chassis, roof and floor. Changing later = re-fabricating.</span></div>
        <div class="c"><b>Fit the road</b><span>transport limits width, length and height.</span></div>
        <div class="c"><b>Keep critical rooms off the seams</b><span>no restrooms, mechanical rooms, doors or windows across a <b>mate line</b>.</span></div>
        <div class="c"><b>Decide early</b><span>the first part of design locks in most of the cost and schedule.</span></div>
      </div>
      <h4>The tradeoffs</h4>
      <div class="chips"><span>Late design changes are expensive</span><span>The box has to travel</span><span>Every seam is a field joint</span><span>Cash moves earlier (materials bought up front)</span><span>Site + utilities + foundation = one scope</span></div>` },
    { t: "CM practice still applies — it just shifts left", html: `
      <p><b>CMAA's six CM functions</b> — flip between traditional and modular:</p>
      <div class="w" data-w="tabs" data-k="modular.cmaa"></div>
      <h4>CM phases, shifted left (decisions move earlier)</h4>
      <div class="w" data-w="flow" data-k="modular.phases"></div>
      <div class="cards c2">
        <div class="c"><b>PMP lens (PMI)</b><span><b>People · Process · Business environment</b> — plus managing uncertainty (weather, supply, interfaces).</span></div>
        <div class="c"><b>AIA lens</b><span>same documents, adapted: payments tied to <b>production milestones</b>, “factory completion” defined, change orders at <b>cost plus a fee</b>.</span></div>
      </div>
      <div class="hook"><b>Credentials:</b> <b>CCM</b> from <b>CMAA</b> · <b>PMP</b> from <b>PMI</b> · contracts from <b>AIA</b>.</div>` },
    { t: "Real estate follows customers", html: `
      <p class="lead">Fast-food & coffee chains (QSRs) are <b>dropping the dining room</b>: Chipotlanes, Taco Bell Defy, drive-thru-only coffee like 7 Brew.</p>
      <div class="cards c3">
        <div class="c"><b>Smaller lots work</b><span>a smaller box fits a smaller lot</span></div>
        <div class="c"><b>Site selection flips</b><span><b>traffic counts, turn lanes & car stacking</b> beat foot traffic</span></div>
        <div class="c"><b>Cost shifts to the site</b><span>the building shrinks; paving, utilities and permits don't</span></div>
      </div>
      <div class="case"><span>Example</span><b>Haven Coffee Roasters</b> — drive-thru & walk-up only · about <b>1,050 sq ft</b> · built indoors in Lithia, FL (~10 weeks in the factory) · set at <b>LEGOLAND Florida in days</b>.</div>` },
  ],
  takeaways: ["Modular = delivery method, not a building type", "Ford's line: ~8× faster per chassis", "Modular time = longer of site OR factory + set", "General conditions run every week → time on site is the biggest cost lever", "Decide early: late changes cost more", "CMAA six functions: project, cost, time, quality, contract admin, safety"]
},

/* ================================================================ BUILDING OPERATIONS */
{
  id: "ops", num: 11, short: "Building Ops", title: "Building Operations, Maintenance & Asset Management",
  color: "#1F7A72", icon: "wrench",
  big: "Construction delivers the building; <b>operations</b> keep it safe, working and valuable for <b>decades</b>.",
  sections: [
    { t: "A building is complete. Now what?", html: `
      <div class="w" data-w="flow" data-k="ops.life"></div>
      <p>Operations and renewal often last <b>decades</b> — much longer than construction. End of life can mean <b>reuse, retrofit or deconstruction</b>.</p>
      <h4>Commissioning & handover</h4>
      <div class="cards c4">
        <div class="c"><b>Verify</b><span>systems perform as required</span></div>
        <div class="c"><b>Transfer</b><span>as-builts, manuals, warranties, training</span></div>
        <div class="c"><b>Document</b><span>open issues & who owns them</span></div>
        <div class="c"><b>Warning</b><span>poor handover = avoidable problems later</span></div>
      </div>` },
    { t: "CM vs. FM — and who keeps it running", html: `
      <div class="w" data-w="compare" data-k="ops.cmfm"></div>
      <div class="cards c5">
        <div class="c"><b>Facility manager</b><span>priorities, budgets, vendors, performance</span></div>
        <div class="c"><b>Engineers & techs</b><span>systems & repairs</span></div>
        <div class="c"><b>Custodial & grounds</b><span>daily services</span></div>
        <div class="c"><b>Security & life safety</b><span>protection & response</span></div>
        <div class="c"><b>Outside contractors</b><span>specialized testing & service</span></div>
      </div>` },
    { t: "Building systems at a glance", html: `
      <p>Tap a system.</p>
      <div class="w" data-w="tabs" data-k="ops.systems"></div>
      <div class="tip"><b>Exam tip:</b> a BAS dashboard helps you diagnose, but it <b>does not replace checking on site</b> (field verification).</div>` },
    { t: "Four maintenance strategies", html: `
      <div class="w" data-w="ladder"></div>
      <p>Choose based on <b>criticality, consequences of failure, and cost</b>. Now practice — match each situation to a strategy:</p>
      <div class="w" data-w="sorter" data-k="ops.strat"></div>` },
    { t: "Work orders, backlog & triage", html: `
      <div class="cards c2">
        <div class="c"><b>Work order</b><span>records the issue, location, priority, who's assigned, and status. Closeout logs labor, parts, findings, fix.</span></div>
        <div class="c"><b>CMMS</b><span>Computerized Maintenance Management System — scheduling, asset histories, backlog. <b>Bad data in = bad planning later.</b></span></div>
      </div>
      <p><b>Backlog</b> = work identified but not done yet. Separate <b>life-safety</b>, <b>urgent operational</b>, and <b>planned renewal</b> work.</p>
      <h4>Triage activity — rank these from most to least urgent</h4>
      <div class="w" data-w="order" data-k="ops.triage"></div>` },
    { t: "Asset management", html: `
      <p>An <b>asset</b> = a building component or system with value and service duties (roofs, chillers, boilers, pumps, elevators, controls). Asset management plans its <b>inspection, maintenance, repair and replacement</b>.</p>
      <div class="cards c2">
        <div class="c"><b>Asset inventory records…</b><span>ID, location, make/model, install date, expected life, warranty, condition, <b>criticality</b> + linked manuals & records</span></div>
        <div class="c"><b>Condition assessment</b><span>inspection + history + testing. A poor score does <b>not automatically</b> mean replace now — consider safety, function, repairability, criticality.</span></div>
      </div>
      <h4>CapEx vs. OpEx — sort them</h4>
      <div class="w" data-w="sorter" data-k="ops.capex"></div>
      <div class="tip"><b>Exam tip:</b> a <b>low upfront price</b> can create <b>high long-term operating costs</b>.</div>` },
    { t: "Lifecycle cost: cheap now vs. cheap forever", html: `
      <div class="w" data-w="lifecycle"></div>
      <div class="plain"><b>Class example:</b> Option A $40k + $8k/yr · Option B $55k + $5k/yr. Over 10 years: A = <b>$120,000</b>, B = <b>$105,000</b> → <b>B saves $15,000</b>. (Real decisions also consider discounting, maintenance, risk and residual value.)</div>` },
    { t: "Deferred maintenance & FCI", html: `
      <p><b>Deferred maintenance</b> = needed work postponed past its planned time. It increases risk, damage and future cost. Some deferral is OK — <b>life-safety issues are not</b>.</p>
      <div class="w" data-w="fci"></div>
      <div class="hook"><b>Formula:</b> FCI = repair needs ÷ replacement value. Class example: $2M ÷ $20M = <b>0.10</b>. Lower is better. It's a summary — it doesn't replace asset-level risk checks.</div>` },
    { t: "Sustainability, resilience & digital tools", html: `
      <div class="cards c2">
        <div class="c"><b>Sustainability in operations</b><span>energy & water use continue for the whole life. Track use, <b>normalize</b> for weather/occupancy, <b>benchmark</b>, measure real performance — don't assume design targets were met. LEED O+M covers existing buildings.</span></div>
        <div class="c"><b>Climate resilience</b><span>plan for floods, heat, storms, outages: critical systems, backup capacity, emergency & recovery plans. Resilience is a <b>design AND operations</b> job.</span></div>
      </div>
      <div class="w" data-w="compare" data-k="ops.twin"></div>
      <div class="tip"><b>Exam tip:</b> <b>a BIM model alone is not a live digital twin.</b> AI outputs still need validation, cybersecurity and human judgment.</div>` },
    { t: "You're the facility manager: $150,000", html: `
      <p>A 20-year-old academic building. Pick improvements without going over budget. There's no single right answer — <b>safety first</b>, then defend your trade-offs.</p>
      <div class="w" data-w="budget"></div>` },
  ],
  takeaways: ["Handover = as-builts, manuals, warranties, training", "Reactive · Preventive · Condition-based · Predictive", "Life-safety work comes first", "Lifecycle cost beats purchase price", "FCI = repair needs ÷ replacement value (lower is better)", "BIM alone ≠ digital twin; tools don't replace judgment"]
},

/* ================================================================ REAL ESTATE */
{
  id: "realestate", num: 12, short: "Real Estate", title: "Real Estate Fundamentals",
  color: "#B42318", icon: "house",
  big: "Two same-size buildings can have totally different values — because value comes from <b>location, use, income, risk and demand</b>, not just what it cost to build.",
  sections: [
    { t: "Real estate is more than a building", html: `
      <p>Tap each puzzle piece.</p>
      <div class="w" data-w="tabs" data-k="re.four"></div>
      <h4>Property types</h4>
      <div class="cards c4">
        <div class="c"><b>Residential</b><span>single-family, multifamily, student housing</span></div>
        <div class="c"><b>Commercial</b><span>office, retail, hospitality, mixed-use</span></div>
        <div class="c"><b>Industrial</b><span>warehouses, manufacturing, logistics</span></div>
        <div class="c"><b>Special-purpose</b><span>hospitals, schools, labs, civic buildings</span></div>
      </div>
      <h4>Who uses real estate?</h4>
      <div class="cards c4">
        <div class="c"><b>Owner-user</b><span>runs a business or lives there</span></div>
        <div class="c"><b>Investor</b><span>wants rent, cash flow & appreciation</span></div>
        <div class="c"><b>Developer</b><span>turns a site into a viable project</span></div>
        <div class="c"><b>Public agency</b><span>delivers services or public benefit</span></div>
      </div>` },
    { t: "What makes property valuable?", html: `
      <h4>Location, location… and context</h4>
      <div class="chips"><span>Accessibility: transit, roads, walkability</span><span>Neighbors: helpful or conflicting uses</span><span>Demand: who needs space here?</span><span>Constraints: flooding, soil, utilities, zoning</span></div>
      <h4>Four forces that shape value</h4>
      <div class="cards c4 forces">
        <div class="c"><b>Demand ↑</b><span>how much people want it</span></div>
        <div class="c"><b>Supply ↓</b><span>how much similar space exists</span></div>
        <div class="c"><b>Income ↑</b><span>what it earns after operating costs</span></div>
        <div class="c"><b>Risk ↓</b><span>uncertainty about revenue, costs, approvals</span></div>
      </div>
      <h4>Cost ≠ Price ≠ Value</h4>
      <div class="w" data-w="cpv"></div>` },
    { t: "From empty lot to occupied building", html: `
      <div class="w" data-w="flow" data-k="re.dev"></div>
      <h4>Feasibility: four tests</h4>
      <div class="cards c4">
        <div class="c"><b>Market</b><span>enough demand at a realistic price or rent?</span></div>
        <div class="c"><b>Physical</b><span>will the site & infrastructure support it?</span></div>
        <div class="c"><b>Legal</b><span>what do zoning & permits allow?</span></div>
        <div class="c"><b>Financial</b><span>is the value high enough to justify cost & risk?</span></div>
      </div>
      <div class="hook"><b>Memory hook:</b> <b>M-P-L-F</b> — “<b>M</b>ake <b>P</b>lans <b>L</b>egal & <b>F</b>inanced.”</div>` },
    { t: "Zoning & the people involved", html: `
      <div class="cards c2">
        <div class="c"><b>Zoning = the rules of the game</b><span><b>Land use</b> (residential, commercial, industrial, mixed) · <b>density & massing</b> (floor area, height, setbacks, lot coverage) · <b>site requirements</b> (access, parking, loading, open space). May need reviews or <b>variances</b>.</span></div>
        <div class="c"><b>Who makes it happen</b><span><b>Developer/owner</b> sets the vision & takes the financial risk · architects & engineers design · <b>CM & contractors</b> handle cost, schedule, safety, delivery · plus lenders, investors, agencies, brokers, occupants.</span></div>
      </div>
      <h4>A developer's decision chain</h4>
      <div class="w" data-w="flow" data-k="re.chain"></div>` },
    { t: "Paying for it: total development cost", html: `
      <div class="cards c2">
        <div class="c"><b>Equity</b><span>money from owners & investors</span></div>
        <div class="c"><b>Debt</b><span>borrowed money that must be repaid. More debt can enable a project but adds obligations & risk.</span></div>
      </div>
      <div class="w" data-w="compare" data-k="re.hardsoft"></div>
      <p>Build the budget yourself (class example: $12M construction, $3M land, $2M soft, $1M contingency):</p>
      <div class="w" data-w="tdc"></div>` },
    { t: "NOI: what the property actually earns", html: `
      <div class="w" data-w="noi"></div>
      <div class="tip"><b>Exam tip:</b> NOI does <b>NOT</b> subtract <b>debt service</b> (loan payments), <b>income taxes</b> or <b>depreciation</b>.</div>
      <p>Property earns money from <b>rental income</b>, <b>other income</b> (parking, signage, storage), and <b>appreciation</b>. Cash flow depends on vacancies, expenses, financing and reserves.</p>` },
    { t: "Value = NOI ÷ cap rate", html: `
      <div class="w" data-w="caprate"></div>
      <div class="plain"><b>In plain English:</b> the cap rate is like the “risk price.” <b>Riskier property → higher cap rate → lower value</b> for the same income.</div>
      <h4>Why cap rates differ</h4>
      <div class="chips"><span>Tenant quality & stable rent</span><span>Age, condition, location</span><span>Lease length & vacancy risk</span><span>Investor expectations & the economy</span></div>
      <h4>Three ways to value property</h4>
      <div class="cards c3">
        <div class="c"><b>Sales comparison</b><span>what did <b>similar</b> properties sell for?</span></div>
        <div class="c"><b>Income approach</b><span>value from expected <b>income</b> (NOI ÷ cap rate)</span></div>
        <div class="c"><b>Cost approach</b><span>replacement <b>cost</b> − depreciation + land value</span></div>
      </div>` },
    { t: "Go or no-go? + payback", html: `
      <div class="w" data-w="gonogo"></div>
      <div class="w" data-w="payback"></div>` },
    { t: "Construction choices change value", html: `
      <div class="cards c4">
        <div class="c"><b>Layout</b><span>better function → easier to lease</span></div>
        <div class="c"><b>Energy efficiency</b><span>lower operating expenses → higher NOI</span></div>
        <div class="c"><b>Durability</b><span>lower lifecycle costs</span></div>
        <div class="c"><b>Delays & defects</b><span>weaken financial performance</span></div>
      </div>
      <h4>When projects go wrong</h4>
      <div class="chips"><span>Demand falls / rents miss</span><span>Land, labor, materials or loan costs rise</span><span>Permit, environmental or utility delays</span></div>
      <div class="tip"><b>Key idea:</b> a technically successful building can still <b>fail financially</b>.</div>
      <h4>The big trade-off</h4>
      <div class="cards c3">
        <div class="c"><b>Higher quality</b><span>more cost, more appeal</span></div>
        <div class="c"><b>Higher density</b><span>more revenue, more approvals</span></div>
        <div class="c"><b>Faster delivery</b><span>income sooner, more execution risk</span></div>
      </div>` },
  ],
  takeaways: ["Real estate = land + improvements + rights + market", "Cost (spent) ≠ price (paid) ≠ value (worth)", "Feasibility: market, physical, legal, financial", "TDC = land + soft + hard + financing + contingency", "NOI = income − operating expenses (no debt, taxes, depreciation)", "Value = NOI ÷ cap rate · higher cap rate → lower value"]
}
];

/* ------------------------------------------------ widget configs (generic widgets) */
window.WCFG = {
  "transport.vs": { left: { h: "Building project", c: "#1F2A37", items: ["Defined, mostly contained site", "Users usually move in after it's done", "Spaces people occupy"] },
                     right: { h: "Infrastructure project", c: "#B7791F", items: ["Can stretch for miles", "Constant public interaction & traffic", "Existing utilities & environmental impacts", "Often stays open during construction"] } },
  "transport.four": { cols: [["Highway", "traffic must continue"], ["Bridge", "active transportation below"], ["Transit", "passengers still need access"], ["Airport", "shutdown windows are limited"]] },
  "transport.road": { items: ["Survey & layout", "Earthwork", "Drainage & utilities", "Subgrade", "Base", "Pavement", "Striping & signage"], why: "You survey first, move the dirt, put pipes in <b>before</b> anything gets paved, then build the layers bottom-up, and paint last." },

  "water.treat": { steps: [
    ["Coagulation & flocculation", "particles clump", "Chemicals make tiny dirt particles stick together into bigger clumps (called floc)."],
    ["Sedimentation", "heavy particles settle", "Water sits still so the heavy clumps sink to the bottom."],
    ["Filtration", "leftovers removed", "Water passes through filters (like sand) that catch remaining particles."],
    ["Disinfection", "germs inactivated", "Harmful germs are killed/inactivated so the water is safe to drink."]] },
  "water.main": { steps: [
    ["Locate", "utilities + traffic plan", "Find existing underground utilities and plan traffic control."],
    ["Excavate", "protect the trench", "Dig the trench and protect it (shoring/shields)."],
    ["Bed & install", "lay the main", "Prepare the pipe bedding and install the main."],
    ["Connect", "joints, valves, hydrants", "Connect joints, valves, service lines and hydrants."],
    ["Test & restore", "pressure-test + disinfect", "Pressure-test, disinfect, verify — then restore the street."]] },
  "water.waste": { steps: [
    ["Building drain", "leaves the house", "Wastewater leaves the building through its drain and a lateral pipe."],
    ["Sewer main", "under the street", "Laterals feed into the sewer main, usually flowing by gravity."],
    ["Pump station", "if needed", "Lift stations pump flow uphill when gravity alone can't move it."],
    ["Treatment plant", "cleaned", "The wastewater treatment plant removes solids and pollutants."],
    ["River / reuse", "released", "Treated water must meet discharge or reuse rules before release."]] },
  "water.wwtp": { steps: [
    ["Screens & grit", "remove trash & sand", "Big objects and grit get screened out first."],
    ["Primary settling", "solids sink", "Heavier solids settle out in tanks."],
    ["Biological treatment", "microbes eat waste", "Microorganisms break down the dissolved organic material."],
    ["Secondary settling", "settle again", "The microbes and remaining solids settle out."],
    ["Disinfection / release", "safe to discharge", "Water is disinfected and released (or reused). Solids are managed separately."]] },
  "water.storm": { left: { h: "Traditional (gray) infrastructure", c: "#4B5563", items: ["<b>Catch basins</b> collect runoff", "<b>Storm pipes & culverts</b> carry it", "<b>Detention basins</b> hold it temporarily", "<b>Outfalls</b> release it to rivers", "Needs maintenance to avoid blockages & flooding"] },
                   right: { h: "Green infrastructure — manage rain where it falls", c: "#2B8A3E", items: ["<b>Rain gardens / bioretention</b> absorb & filter", "<b>Permeable pavement</b> lets water through", "<b>Green roofs</b> hold some rain", "<b>Trees, plants & soil</b> slow the flow"] } },
  "water.challenge": { tabs: [
    ["Drinking water", "Extend water mains from the <b>city main</b> through the new roads, with valves, hydrants, and a service line + meter to each home."],
    ["Wastewater", "Run gravity sewer mains (correct slope) with manholes to the <b>existing sanitary sewer</b>; add a lift station if the land doesn't slope the right way. Check the existing sewer has capacity for 100 more homes."],
    ["Stormwater", "Protect the <b>stream</b>: catch basins + detention basin, plus green infrastructure (rain gardens, permeable pavement) to slow and clean runoff. Erosion control during construction."],
    ["Biggest risk", "Excavation near unknown utilities and trench cave-ins; groundwater near the stream. Locate utilities first, protect trenches 5 ft+, plan for heavy rain."]] },

  "energy.grid": { steps: [
    ["Generation", "electricity is produced", "Power plants, wind turbines or solar panels make electricity."],
    ["Transmission", "power travels far", "High-voltage lines carry power long distances (high voltage = less loss)."],
    ["Substations", "voltage is adjusted", "Transformers step voltage down; switchgear and protection control and protect circuits."],
    ["Distribution", "power reaches streets", "Local lower-voltage lines bring power along streets and neighborhoods."],
    ["Building", "systems use the power", "The building's own electrical system: panels, lighting, equipment, your charger."]] },
  "energy.phases": { steps: [
    ["Before construction", "plan & permit", "Land, permitting, geotechnical investigations, procurement and access."],
    ["During construction", "build it", "Earthwork, foundations, steel, mechanical equipment, cabling and site logistics."],
    ["Before handover", "prove it", "Inspections, energization planning, testing, commissioning and safety verification."]] },
  "energy.solar": { items: ["Prepare the site & access roads", "Install foundations & panel supports", "Connect & test the solar equipment"], why: "Expected order: <b>C → B → A</b>. You can't build supports on an unprepared site, and you can't test what isn't installed. Some work (like cabling and buying equipment) can overlap if it's sequenced safely." },
  "energy.sub": { tabs: [
    ["Transformers", "<b>Raise or lower voltage.</b> The “gear change” of the grid."],
    ["Switchgear", "<b>Controls and isolates circuits</b> — like big switches that can cut off a section."],
    ["Protection systems", "<b>Detect faults and reduce damage</b> when something goes wrong."],
    ["What gets built", "Grading & stormwater systems · foundations, steel & <b>grounding</b> · cable trenches, a control building & equipment pads."]] },
  "energy.mega": { left: { h: "Vineyard Wind 1 · offshore MA", c: "#2F5D8A", items: ["<b>806 MW</b> offshore wind, connected to the New England grid", "Offshore foundations, a substation, subsea cables, onshore connections", "<b>Weather & marine access</b> limit construction", "Port → Sea → Shore must all line up", "Stakeholders from sea to shore"] },
                  right: { h: "Plant Vogtle 3 & 4 · Georgia", c: "#B42318", items: ["Two new <b>nuclear</b> units at an existing plant", "Construction began <b>2009</b>; units began operating <b>2023 & 2024</b>", "Intense <b>safety & quality documentation</b>", "Civil, mechanical & electrical work all depend on each other", "Long timelines magnify <b>procurement & interface</b> risk"] } },
  "energy.town": { tabs: [
    ["The setup", "A growing coastal town needs reliable power, but <b>budget and land are limited</b>. Options: <b>A</b> local solar + battery · <b>B</b> upgrade transmission & substation · <b>C</b> local natural-gas plant. Choose a <b>combination</b>, not a favorite."],
    ["Twist #1", "<b>The hospital must keep running during major storms.</b> → backup power / a microgrid for critical loads, substation above flood level, a second supply path."],
    ["Twist #2", "<b>Residents oppose an overhead line</b> through their neighborhood. → underground line where feasible, alternate route, community engagement & phasing. Underground isn't automatically best: it costs more and has permitting, heat and flooding tradeoffs."],
    ["Your pitch", "1. What would you build first, and why? 2. Which two packages depend on each other? 3. Biggest risk + how you'd manage it? 4. What tradeoff are you asking the community to accept?"]] },

  "modular.bhrs": { steps: [
    ["Real estate", "BlueKey CRES", "Find, buy, sell and lease the land."],
    ["Site", "All Florida Site Work", "Clear, grade, utilities and paving."],
    ["General contractor", "Hurd CM", "Permits, coordination and the vertical build."],
    ["Modular", "Fabricon Modular", "The building, built in a factory <b>while the site is prepared</b>."]] },
  "modular.vs": { rows: [["", "Site-built", "Modular"], ["Where", "on the site", "in a factory, then shipped"], ["Sequence", "one trade after another", "many tasks at once + site work in parallel"], ["Environment", "weather, theft, uneven access", "covered, controlled, secured"], ["Quality control", "spot checks, trade by trade", "checks built into every station"], ["Learning", "every project is a prototype", "each unit improves the next"]], foot: "Same codes. Same trades. Same building." },
  "modular.line": { steps: [
    ["Steel & frame", "", "Structural steel and framing."], ["Carpentry & siding", "", "Walls and exterior finish."], ["Plumbing", "", "Pipes and fixtures."], ["Electrical", "", "Wiring and power."], ["HVAC", "", "Heating, cooling, ventilation."], ["Roofing", "", "Roof goes on — indoors!"], ["Drywall, tile, ceilings", "", "Interior finishes."], ["Millwork & trim", "", "Cabinets and trim."], ["QC & ship", "", "Quality check, then onto the truck."]] },
  "modular.cmaa": { tabs: [
    ["Project mgmt", "<b>Traditional:</b> plan phases, team and scope. <br><b>Modular:</b> one scope — site, factory, transport, set."],
    ["Cost mgmt", "<b>Traditional:</b> budget, control, forecast. <br><b>Modular:</b> locked early; time-based costs shrink."],
    ["Time mgmt", "<b>Traditional:</b> schedule & critical path. <br><b>Modular:</b> parallel paths — the longer of site or factory."],
    ["Quality mgmt", "<b>Traditional:</b> inspect & verify on site. <br><b>Modular:</b> QC at every station, state-inspected."],
    ["Contract admin", "<b>Traditional:</b> changes, payment, closeout. <br><b>Modular:</b> milestones + a defined factory completion."],
    ["Safety mgmt", "<b>Traditional:</b> site safety plan & enforcement. <br><b>Modular:</b> controlled plant, planned crane picks."]] },
  "modular.phases": { steps: [
    ["Pre-design", "", "Pick the site. <b>Lock the module grid.</b>"], ["Design", "", "Factory drawings and state plan approval."], ["Procurement", "", "Steel and long-lead items bought <b>early</b>."], ["Construction", "", "Factory build and site work <b>at the same time</b>."], ["Post-construction", "", "Set, seam finishes, closeout and warranty."]] },

  "ops.life": { steps: [
    ["Planning", "& feasibility", "Is the project worth doing?"], ["Design", "", "Drawings and specifications."], ["Construction", "", "Building it."], ["Commissioning", "", "Testing that systems work as required."], ["Handover", "", "Keys, manuals, warranties and training go to the owner."], ["Operations & maintenance", "decades", "The longest phase: running and caring for the building."], ["Renewal", "& renovation", "Upgrades and replacements over time."]] },
  "ops.cmfm": { left: { h: "Construction management (CM)", c: "#D9480F", items: ["Scope, schedule, cost, quality, delivery", "Ends at handover"] },
                right: { h: "Facility management (FM)", c: "#1F7A72", items: ["Safe operation, service levels, upkeep", "<b>Lifecycle value</b> for decades"] }, foot: "Both depend on documentation, risk management and coordination. A CM should hand the FM team as-builts, manuals, warranties and training." },
  "ops.systems": { tabs: [
    ["HVAC", "Thermal comfort & ventilation. Air handling units distribute and <b>filter</b> air; ventilation brings in outdoor air. Maintenance: filters, belts, coils, controls. <i>Scenario: one floor is hot → check that floor's zone/controls.</i>"],
    ["Electrical", "Service → switchgear → panels → equipment. Lighting & controls. <b>Critical loads</b> may need emergency/standby power. Testing by qualified people only."],
    ["Plumbing", "Domestic water to sinks & fixtures; drainage & vents remove wastewater. Pumps, heaters, valves need upkeep. <b>Leaks → water damage, mold, disruption.</b>"],
    ["Life safety", "Fire alarms, sprinklers, emergency lighting, exits. Inspection & testing are essential. A fault can need <b>immediate escalation</b>. Elevators need specialized service."],
    ["BAS", "Building Automation System: sensors (temperature, humidity, occupancy) + controllers + dashboards (trends, alarms, setpoints). Supports diagnosis but <b>doesn't replace field verification</b>."]] },
  "ops.strat": { cats: ["Reactive", "Preventive", "Condition-based / Predictive"], items: [
    ["A cheap, noncritical lamp burns out", 0], ["Change air filters every 3 months", 1], ["A critical pump shows rising vibration", 2], ["A broken door closer", 0], ["Lubricate a motor per the manufacturer", 1], ["Sensors trend a chiller's temperature to forecast failure", 2]] },
  "ops.triage": { items: ["Fire alarm panel reports a fault", "Roof leak threatening electrical equipment", "Classroom thermostat is inaccurate", "Lobby light fixture is out"], alts: [["Roof leak threatening electrical equipment", "Fire alarm panel reports a fault", "Classroom thermostat is inaccurate", "Lobby light fixture is out"]], why: "<b>Life safety first</b> (fire alarm), then the leak that could damage equipment and become a hazard, then comfort, then the light. (Some instructors swap #1 and #2 — the key is life safety & hazards before comfort.)" },
  "ops.capex": { cats: ["OpEx (operating)", "CapEx (capital)"], items: [["Monthly electricity bill", 0], ["Replacing the whole roof", 1], ["Routine filter changes", 0], ["Installing a new chiller", 1], ["Custodial staff", 0], ["Major elevator modernization", 1]] },
  "ops.twin": { left: { h: "BIM for FM", c: "#2F5D8A", items: ["Organizes space & asset info for handover", "Equipment IDs, locations, document links", "Must be <b>maintained</b> to stay useful", "<b>Not</b> a live digital twin on its own"] },
                right: { h: "Digital twin + IoT + AI", c: "#7B4FB8", items: ["<b>IoT sensors</b> collect equipment & environment data", "A <b>digital twin</b> = digital model + <b>live</b> operating data", "AI can spot anomalies, forecast, prioritize", "Needs validation, governance, cybersecurity, judgment"] } },

  "re.four": { tabs: [
    ["Land", "A physical location with <b>access, boundaries and constraints</b>."],
    ["Improvements", "<b>Buildings, utilities, parking</b> and site infrastructure added to the land."],
    ["Rights", "<b>Ownership, leases, easements</b> and permitted uses — what you're legally allowed to do."],
    ["Market", "<b>People willing and able</b> to buy, lease or occupy."]] },
  "re.dev": { steps: [
    ["Evaluate the site", "Phase 1: site selection", "Match location to a market need; check size, shape, access, neighbors, environmental/utility/soil limits. <b>What can legally and physically be built here?</b>"],
    ["Test feasibility", "Phase 2", "Market, physical, legal, financial tests. Secure <b>site control</b>."],
    ["Design, permit, finance, build", "Phase 3", "Financial structure (equity + debt), design, permits and construction."],
    ["Lease or sell, operate", "after construction", "Attract and keep occupants; operations, maintenance, utilities, staffing, insurance."]] },
  "re.chain": { steps: [
    ["Market opportunity", "", "What is the market opportunity?"], ["Permitted & able to build", "", "What are we allowed and able to build?"], ["Cost & time", "", "What will delivery cost, and how long?"], ["Occupants & rent", "", "Who will occupy it, and what will they pay?"]] },
  "re.hardsoft": { left: { h: "Hard costs (physical)", c: "#D9480F", items: ["Sitework", "Materials", "Labor", "Equipment", "Construction"] },
                   right: { h: "Soft costs (paperwork & people)", c: "#2F5D8A", items: ["Design", "Legal", "Permits", "Insurance", "Marketing & studies"] }, foot: "Land and financing are often tracked separately. <b>Contingency</b> protects the budget against defined uncertainties. Hook: <b>hard = things you can touch.</b>" },
};

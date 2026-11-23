"use strict";

const issues = [
  ["Critical", "Language routing and metadata", "German text appeared on English and Polish pages. Polish links pointed to German pages.",
    "The audit found German titles and descriptions on both localized home pages, placeholder Open Graph titles and Polish product links pointing to German URLs. Verify hreflang and HTML language across templates. Correct localized titles, slugs, interface text and internal links."],
  ["High", "Duplicate URLs and index quality", "The sitemap listed about 10 confirmation URLs. Two Polish home pages were indexable.",
    "Confirm index coverage in Google and Bing. Reconcile duplicate Polish home, About, product and biogas URLs. Clean the sitemap and review the 18 Polish use-case entries against the nominal 17 before making redirects."],
  ["High", "Product specifications and sheets", "Product pages lack the typical values buyers need to compare grades.",
    "Publish approved iodine number, BET surface area, particle size, ash, hardness, moisture, density and CTC where relevant. Add technical data sheets (TDS) and approved safety data sheets (SDS). Public Downloads held ISO 9001 certificates and sales terms at audit."],
  ["High", "Thin application content", "At audit, the PFAS page had about 280 words and no product link.",
    "Replace unsupported claims with sourced engineering guidance. Explain applicable limits, carbon selection, pilot tests, change-out and handling of spent carbon. Expand drinking-water, biogas and micropollutant coverage."],
  ["High", "Internal linking and hierarchy", "Use cases and product pages rarely connect.",
    "Build links from application areas to use cases and matching products, with a clear inquiry path. Link product pages back to relevant applications. Verify orphan pages in the crawl and clarify application and use-case labels."],
  ["Verify", "Template health and performance", "The audit found repeated H1s and defects in headings, alt text and forms.",
    "Fix home and footer headings, descriptive alt text, email link markup and form labels. Measure Core Web Vitals and check large images. Verify hosting and web application firewall behavior before drawing conclusions about bot access."],
  ["Verify", "Structured data and brand identity", "Confirm existing schema and clarify the UNICARB–LSR relationship.",
    "Verify Yoast JSON-LD in rendered pages. Build Organization and BreadcrumbList markup where appropriate. Make the relationship to LSR Materials explicit. The German keyword database used in the competitor review returned no ranking keywords for unicarb-ac.com. Confirm search visibility in Search Console."]
];

const keywords = {
  DE: [
    ["aktivkohle", 9900, 0.75, "Generic product", "Broad activated-carbon demand includes consumer and retail intent. Use application-specific pages to reach engineers and industrial buyers.", false],
    ["aktivkohle kaufen", 1000, 0.90, "Broad purchase", "Focus B2B content on application requirements and carbon selection.", false],
    ["pfas filter", 390, 1.67, "PFAS & water", "Use the PFAS hub to address water utilities specifically. Explain granular activated carbon, pilot testing and selection under applicable drinking-water rules.", true],
    ["vierte reinigungsstufe", 90, 8.23, "Micropollutants", "The highest CPC in this research sample. Build a municipal guide comparing powdered and granular carbon, supported by DWA and research references. Verify plant-specific deadlines.", true],
    ["aktivkohlefilter industrie", 50, 2.38, "Industrial filtration", "Connect industrial filtration queries to relevant application and carbon-selection pages, with a clear route to a technical inquiry.", true],
    ["aktivkohle biogas", 40, 2.74, "Biogas", "Address H₂S and siloxanes, impregnated grades and the inputs needed to estimate consumption.", true],
    ["aktivkohle reaktivierung", 40, null, "Reactivation", "Assess demand for reactivation content. Confirm UNICARB’s take-back and reactivation options before making service claims.", true],
    ["aktivkohle hersteller", 20, 1.91, "Supplier discovery", "A directory ranked first in the sample. Describe UNICARB as a supplier with partner processing and European stock.", true],
    ["imprägnierte aktivkohle", 20, 1.05, "Specialist product", "Publish an evidence-led product page that links suitable impregnated grades to documented applications.", true]
  ],
  PL: [
    ["węgiel aktywny", 33100, 0.24, "Generic product", "This is the largest estimate in the research. It includes consumer searches for uses such as pharmacy, aquariums and home distilling.", false],
    ["węgiel aktywny cena", 880, 0.14, "Broad price", "Prioritize application-specific content and technical product data for industrial buyers.", false],
    ["węgiel aktywny kokosowy", 320, 0.31, "Coconut-shell carbon", "Explain selection criteria and publish approved typical values on the relevant Polish product page.", true],
    ["węgiel aktywny granulowany", 110, 0.33, "Granular carbon", "Give engineers a localized comparison of relevant grades, particle sizes and applications, supported by approved data.", true],
    ["filtr węglowy przemysłowy", 50, 1.46, "Industrial filtration", "Explain which carbon and supply model suit industrial installations. Clarify technical support and local contact options.", true],
    ["oczyszczanie biogazu", 40, 1.59, "Biogas cleaning", "Use the Polish biogas hub to explain H₂S and siloxane removal and the selection of impregnated grades.", true],
    ["węgiel aktywny producent", 30, null, "Supplier discovery", "Carbom and exporters appear in the source sample. Describe the partner-supply model accurately and pursue relevant supplier directories.", true],
    ["odsiarczanie biogazu", 20, 4.88, "Biogas desulfurization", "The highest reported Polish CPC in the set. Cover grade selection and engineer-reviewed carbon consumption estimates.", true]
  ]
};

const competitors = {
  DE: [
    ["CarboTech", "German producer", "PFAS and biogas pages, specifications", "≈575 estimated organic visits/month in Germany from 110 keywords.", "Essen production and reactivation, trade-media coverage and Fachverband Biogas membership.", "Publish approved specification tables, then use engineering-led PFAS and biogas articles to build recognition."],
    ["Jacobi", "Global manufacturer", "Product specifications", "Ranked #2 for “Aktivkohle Biogas Entschwefelung” with AddSorb VA3 in the study.", "Publishes technical specifications on product pages.", "Give buyers grade-level data, selection criteria and links between biogas applications and suitable products."],
    ["Chemviron", "Global manufacturer", "Reactivation and drinking water", "Ranked #1 for “Aktivkohle Reaktivierung” with a French page in the study.", "Recognized European offering with reactivation depth.", "Develop a German selection guide and confirm take-back and reactivation capabilities before publishing."],
    ["Donau Carbon", "German specialist", "Directory recognition", "Visible in supplier directories. Traffic was unavailable.", "Recognized supplier. Production and reactivation details require verification.", "Strengthen supplier listings and connect them to detailed product and use-case pages."],
    ["Silcarbon", "German specialist", "Local brand and listings", "Appeared in registers and directories. Traffic was unavailable.", "Trading and production positioning in the research.", "Make multi-source selection, engineering advice and European stock clear."],
    ["AdFiS", "Biogas specialist", "Narrow application focus", "Ranked #1 for “Aktivkohle Biogas Entschwefelung” in the study.", "A tightly focused biogas proposition.", "Address H₂S and siloxanes and provide engineer-reviewed carbon consumption estimates."]
  ],
  PL: [
    ["Desotec Polska", "Filter service", "30+ Polish knowledge hub items", "Polish knowledge hub observed. Traffic was unavailable.", "Mobile filters and reactivation as a service, with webinars, cases and e-books across PFAS, biogas, VOCs and wastewater.", "Compare an owned filter with carbon supply and a mobile filter service, using accurate scope and selection criteria."],
    ["Carbom", "Online shop", "Educational Polish articles", "Ranked #2 for “węgiel aktywny producent” and #1 – 2 for sampled impregnated-carbon and biogas searches.", "Accessible local education that attracts product and use-case searches.", "Publish engineering-level selection guidance, approved figures, calculations and client-approved cases."],
    ["Bio-Industry", "Biogas specialist", "Dedicated BIOAC-4H2S product", "Product and LinkedIn presence observed. Traffic was unavailable.", "A defined H₂S-removal offer for biogas operators.", "Show the connection between contaminant profile, impregnated grades and operating constraints."],
    ["Eurocarb", "Carbon supplier", "Localized biogas and wastewater page", "A Polish application page appeared near the top in the study.", "Localized application content from a UK supplier.", "Make local language, contact and application engineering visible throughout the purchase journey."],
    ["Gryfskand / Elbar Katowice", "Local companies", "Production to verify", "The sampled results did not show these companies.", "Confirm whether they produce activated carbon locally.", "Confirm with the client which local suppliers enter real purchase decisions."]
  ]
};

const countryStrategies = {
  DE: {
    title: "Lead with drinking water.",
    intro: "Build a German PFAS hub first, then extend into municipal wastewater and biogas.",
    priorities: [
      ["PFAS and drinking water", "Explain TrinkwV with primary sources. Walk utilities through granular carbon selection, pilot tests, change-out and spent-carbon handling."],
      ["Fourth treatment stage", "Compare powdered and granular carbon, dosing and selection for municipal plants. Cite DWA and research, and check applicable deadlines."],
      ["Biogas and product data", "Cover H₂S and siloxanes, impregnated grades and consumption inputs. Publish typical-value tables and data sheets with technical approval."],
      ["Trade visibility", "Target chemie.de, chemeurope.com, wlw and IndustryStock. Pitch Prozesstechnik, ZfK, gwf Wasser or Biogas Journal with expert material."]
    ],
    next: "Use native technical editing and consistent formal “Sie”. Build later coverage around reactivation and volatile organic compounds (VOCs) where the offering is confirmed."
  },
  PL: {
    title: "Lead with biogas and biomethane.",
    intro: "Complete the Polish buying journey before scaling publication. Keep links, metadata and interface text in Polish.",
    priorities: [
      ["Biogas and biomethane", "Build around H₂S desulfurization, siloxane removal and impregnated carbon. Use Bio Power Expo as a publishing hook."],
      ["PFAS and water", "Write for utilities and engineers. Verify Polish transposition and applicable drinking-water approvals before publication."],
      ["Engineering depth and trust", "Use selection data, calculations and approved cases. Compare carbon supply with mobile filters. Confirm Gdańsk, a Polish-speaking contact and PN-EN references."],
      ["Local industry platforms", "Target IndustryStock and Panorama Firm. Pitch Inżynieria, Magazyn Biomasa, Wodociągi Kanalizacja and Teraz Środowisko."]
    ],
    next: "Have a Polish editor review local copy. In months 6 – 9, extend siloxane coverage and develop cases after Bio Power Expo. Prioritize later expansion by search data."
  }
};

const pillars = [
  ["Technical foundations", "Clean sitemaps and indexation, reconcile duplicate URLs, fix headings and forms, validate Core Web Vitals and bot access, and enable IndexNow."],
  ["Multilingual search architecture", "Map German, English and Polish URLs. Verify hreflang and language tags, localize titles, descriptions, Open Graph and links, then use a data-informed 301 map for approved slug changes."],
  ["Product data and technical credibility", "Publish engineer-approved typical-value tables and technical data sheets for six product groups across three languages. Add safety sheets where approved and link grades to applications."],
  ["Application-focused content", "Create PFAS and biogas hubs, strengthen drinking water and micropollutants, and publish neutral, evidence-led comparisons such as coconut versus coal and granular versus powdered carbon."],
  ["Authority and industry visibility", "Build consistent directory profiles. Use trade fairs and expert LinkedIn articles as publishing opportunities. Pitch relevant trade media and refresh priority pages."],
  ["AI search discoverability", "Write direct answers, publish citable tables and primary sources, clarify the LSR–UNICARB entity relationship and validate structured data. Check AI bot access and monitor a fixed prompt set."]
];

const months = [
  {
    date: "December 2026", short: "Dec 2026", label: "Access & baseline", title: "Establish the baseline",
    tasks: ["Secure Search Console, Bing, GA4, WordPress and hosting access. Record search, inquiry and AI referral baselines for UNICARB and LSR.", "Crawl about 125 UNICARB URLs. Remove confirmation pages and consolidate duplicates. Configure IndexNow.", "Check hreflang, schema, bot access and performance. Extend the competitor and backlink benchmark."],
    milestone: "Clean sitemap, public audit validated against data, starting metrics and an agency task list.",
    dependency: "Week 1 access and ownership of the shared theme. Confirm search, site and inquiry tracking."
  },
  {
    date: "January 2027", short: "Jan 2027", label: "Languages & templates", title: "Repair languages and templates",
    tasks: ["Localize title metadata, descriptions, Open Graph and internal links. Resolve language mapping and prepare 301s where changes are approved.", "Fix shared headings, footer, alt text and forms. Add or validate Organization and BreadcrumbList structured data.", "Request publishable product figures and sheets. Confirm German copy review and start LSR index and metadata cleanup."],
    milestone: "Target metadata in the appropriate language on every page and a readiness score of 60+.",
    dependency: "Agency turnaround, a native technical editor and an agreed language and redirect map."
  },
  {
    date: "February 2027", short: "Feb 2027", label: "Product data & PFAS", title: "Publish engineering evidence",
    tasks: ["Publish typical-value tables and technical sheets for six product groups across three languages. Link use cases to product pages.", "Launch the German PFAS hub first, then localize for English and Polish. Map keywords and start repeatable AI-answer tracking.", "Start the Polish biogas hub and directory outreach in both markets where pages are ready."],
    milestone: "First PFAS hub live, approved technical facts available and AI tracking running.",
    dependency: "Client-approved data, native editing, primary regulatory references and verified product claims."
  },
  {
    date: "March 2027", short: "Mar 2027", label: "Use cases & LSR", title: "Expand priority applications",
    tasks: ["Rework biogas, drinking water and micropollutants. Merge weak pages where justified.", "Prepare two neutral comparison pages for publication. Begin the month 4 – 5 work on German fourth-stage treatment and Polish water and PFAS content.", "Apply finished shared template fixes to LSR and begin the wider off-site work."],
    milestone: "Target readiness of 80+, priority use cases and comparisons live, LSR template rollout under way.",
    dependency: "Approved technical copy and comparison scope, validated templates, and the client’s review of key claims."
  },
  {
    date: "April 2027", short: "Apr 2027", label: "Authority & AI", title: "Start industry outreach",
    tasks: ["Pursue German and Polish trade media and relevant directories. Use trade fairs as timely publishing hooks.", "Publish engineer-led LinkedIn content and assess a Wikidata entry if eligible. Start a refresh cycle for key pages.", "Review early external mentions, Bing citation reports and fixed-prompt AI observations."],
    milestone: "Outreach and page refreshes under way. Report any external mentions and AI citations observed.",
    dependency: "Published assets, client PR approvals and third-party editorial schedules."
  },
  {
    date: "May 2027", short: "May 2027", label: "Scale & review", title: "Scale the work that is gaining traction",
    tasks: ["Extend stronger topics to additional use cases and languages. Prioritize from Google and Bing data.", "Report change against baseline across search, indexation, AI visibility and website inquiries.", "Agree the next six months. Advance LSR product data and decarbonisation content as inputs allow."],
    milestone: "Six-month review and a prioritized next-stage plan.",
    dependency: "Reliable baseline and tracking, enough publishing history to assess early signals, and client feedback on inquiries."
  }
];

const phases = [
  ["1 – 2", "Dec – Jan", "Foundation", "Clean index, localized metadata and a measured baseline.", "#a0b5be"],
  ["3 – 4", "Feb – Mar", "First signals", "Watch for impressions, non-brand clicks and initial PFAS rankings.", "#94c7c0"],
  ["5 – 8", "Apr – Jul", "Growth", "Look for organic inquiries from priority applications and early AI citations.", "#80e9d1"],
  ["9 – 12", "Aug – Nov", "More consistent results", "Look for steadier inquiries by language and recurring brand mentions on priority prompts.", "#baf2cc"]
];


const byId = (id) => document.getElementById(id);
const nav = document.querySelector(".chapter-nav");
const chapterLinks = Array.from(nav.querySelectorAll("a"));
const chapters = chapterLinks.map((link) => ({
  id: link.hash.slice(1),
  name: link.textContent.trim(),
  link,
  section: byId(link.hash.slice(1))
}));

const state = {
  chapter: null,
  country: "DE",
  queryMode: "focus",
  keyword: { DE: "vierte reinigungsstufe", PL: "odsiarczanie biogazu" },
  competitor: { DE: "CarboTech", PL: "Desotec Polska" },
  month: 0,
  presenting: false
};
const countryNames = { DE: "Germany", PL: "Poland" };
const integer = new Intl.NumberFormat("en-US");
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const cpcText = (value) => value === null ? "—" : currency.format(value);
const twoDigits = (value) => String(value).padStart(2, "0");

function put(id, markup) {
  byId(id).innerHTML = markup;
}

// All interpolation below uses the bundled presentation data, never URL or form text.
function renderStaticContent() {
  put("audit-issues", issues.map(([priority, title, summary, detail]) => `
    <details class="panel issue">
      <summary><span class="severity ${priority.toLowerCase()}">${priority}</span><span><span class="issue-title">${title}</span><span class="issue-summary">${summary}</span></span></summary>
      <p>${detail}</p>
    </details>`).join(""));

  put("pillars", pillars.map(([title, detail], index) => `
    <details class="pillar"${index === 0 ? " open" : ""}>
      <summary><span class="pillar-index">${twoDigits(index + 1)}</span><span>${title}</span></summary><p>${detail}</p>
    </details>`).join(""));

  put("roadmap-months", months.map((month, index) => `
    <button type="button" data-month="${index}" aria-controls="roadmap-detail" aria-pressed="${index === state.month}">
      <span class="month-number">MONTH ${twoDigits(index + 1)}</span>
      <span class="month-date">${month.short}</span>
      <span class="month-title">${month.label}</span>
    </button>`).join(""));

  put("outcome-timeline", phases.map(([monthRange, dates, title, text, color]) => `
    <article class="phase" style="--phase-color:${color}">
      <p class="eyebrow">Months ${monthRange}<span class="phase-dates">${dates}</span></p><h3>${title}</h3><p>${text}</p>
    </article>`).join(""));

  document.querySelectorAll("[data-country-control]").forEach((control) => {
    control.innerHTML = Object.entries(countryNames).map(([code, name]) =>
      `<button type="button" data-country="${code}" aria-pressed="${code === state.country}">${name}</button>`
    ).join("");
  });
}

function setPressed(selector, key, value) {
  document.querySelectorAll(selector).forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset[key] === value));
  });
}

function renderMarket() {
  const rows = keywords[state.country].filter((row) => state.queryMode === "all" || row[5]);
  if (!rows.some(([word]) => word === state.keyword[state.country])) {
    state.keyword[state.country] = rows[0][0];
  }

  const scale = Math.max(...rows.map((row) => row[1]));
  put("keyword-chart", `
    <div class="keyword-header" aria-hidden="true"><span>QUERY &amp; TOPIC</span><span>SEARCHES</span><span>CPC</span></div>
    <div class="keyword-list" role="group" aria-label="Keyword estimates and selected detail">
      ${rows.map(([word, volume, cpc, topic]) => `
        <button class="keyword-row" type="button" data-keyword="${word}" aria-controls="market-insight" aria-pressed="false">
          <span>
            <span class="keyword-text"><span lang="${state.country.toLowerCase()}">${word}</span><span class="keyword-topic">${topic}</span></span>
            <span class="bar-track" aria-hidden="true"><i style="--bar:${volume / scale * 100}%"></i></span>
          </span>
          <span class="keyword-number">${integer.format(volume)}<span class="sr-only"> searches per month</span></span>
          <span class="keyword-number">${cpcText(cpc)}<span class="sr-only">${cpc === null ? " CPC unavailable" : " CPC in US dollars"}</span></span>
        </button>`).join("")}
    </div>`);
  renderMarketInsight();
}

function renderMarketInsight() {
  const country = state.country;
  const selected = state.keyword[country];
  const [word, volume, cpc, topic, detail] = keywords[country].find(([query]) => query === selected);
  setPressed("[data-keyword]", "keyword", selected);

  const context = country === "DE"
    ? `<article class="panel context-card">
         <h3>German drinking-water limits</h3>
         <div class="reg-values"><div><strong>PFAS-20 · 100 ng/L</strong><small>From 12 Jan 2026</small></div><div><strong>PFAS-4 · 20 ng/L</strong><small>From 12 Jan 2028</small></div></div>
         <p class="muted">The German Drinking Water Ordinance sets these limits.</p>
       </article>`
    : `<article class="panel context-card">
         <h3>Biogas first, water next</h3>
         <p>Lead with biogas and biomethane. The study identifies PFAS as a utilities opportunity but supplies no Polish PFAS volume or CPC. Verify Polish transposition and applicable approvals.</p>
       </article>`;

  put("market-insight", `
    <article class="panel insight">
      <p class="eyebrow">${topic.toUpperCase()}</p>
      <h2 lang="${country.toLowerCase()}">${word}</h2>
      <dl class="insight-facts"><div><dt>Searches / month</dt><dd>${integer.format(volume)}</dd></div><div><dt>Estimated CPC</dt><dd>${cpcText(cpc)}</dd></div></dl>
      <p>${detail}</p>
    </article>${context}`);
}

function renderCompetition() {
  const country = state.country;
  const observed = {
    DE: ["~575 est. visits / month", "#2 · Biogas query", "#1 · Reactivation query", "Supplier directories", "Registers & directories", "#1 · Biogas query"],
    PL: ["Polish knowledge hub", "Top results on sampled queries", "Product & LinkedIn", "Near top on a localized page", "Outside sampled results"]
  };
  put("competitor-matrix", `
    <table class="matrix">
      <caption>${countryNames[country]} comparison</caption>
      <thead><tr><th scope="col">Competitor</th><th class="matrix-model-desktop" scope="col">Business model</th><th scope="col">Content strength</th><th scope="col">Observed visibility</th></tr></thead>
      <tbody>${competitors[country].map(([name, model, content], index) => `
        <tr><th scope="row"><button type="button" data-competitor="${index}" aria-controls="competitor-profile" aria-pressed="false">${name}</button><span class="matrix-model-mobile">${model}</span></th>
        <td class="matrix-model-desktop">${model}</td><td>${content}</td><td>${observed[country][index]}</td></tr>`).join("")}</tbody>
    </table>`);

  put("competitor-context", country === "DE"
    ? `<div class="comp-context">
      <p><strong>Global and specialist suppliers.</strong> Norit has established brand recognition, with its current structure to verify. Haycarb and Kuraray appear in supplier round-ups. Carbon Service &amp; Consulting is listed on chemie.de.</p>
      <p><strong>Other search results.</strong> chemie.de led the sampled manufacturer query. Translated exporter pages, lab suppliers and adjacent filter companies also appeared in relevant searches.</p>
    </div>`
    : `<div class="comp-context">
      <p><strong>Other search results.</strong> IndustryStock and Panorama Firm ranked for supplier searches. Machine-translated exporters appeared for producer terms. Allegro and retailers capture broad consumer demand.</p>
      <p><strong>Production to verify.</strong> Confirm Gryfskand and Elbar Katowice production and market relevance with client input. Expand traffic and backlink research in month 1.</p>
    </div>`);

  renderCompetitorProfile();
}

function renderCompetitorProfile() {
  const country = state.country;
  const index = competitors[country].findIndex(([name]) => name === state.competitor[country]);
  const [name, model, , search, strength, response] = competitors[country][index];
  setPressed("[data-competitor]", "competitor", String(index));
  document.querySelectorAll("[data-competitor]").forEach((button) => {
    button.closest("tr").classList.toggle("selected", Number(button.dataset.competitor) === index);
  });

  put("competitor-profile", `
    <p class="eyebrow">${model.toUpperCase()}</p><h2>${name}</h2><p>${search}</p>
    <div class="profile-section"><h3>What sets them apart</h3><p>${strength}</p></div>
    <div class="profile-section"><h3>Proposed UNICARB response</h3><p>${response}</p></div>
    <div class="profile-section"><p class="muted">UNICARB combines partner processing and European stock with application advice across coconut, hard coal, wood and renewable grades.</p></div>`);
}

function renderCountryStrategy() {
  const plan = countryStrategies[state.country];
  put("country-strategy", `
    <p class="eyebrow">${countryNames[state.country].toUpperCase()} MARKET PLAN</p>
    <h2 style="margin-top:7px">${plan.title}</h2><p class="strategy-intro">${plan.intro}</p>
    <ul class="strategy-list">${plan.priorities.map(([title, detail]) => `<li><h3>${title}</h3><p>${detail}</p></li>`).join("")}</ul>
    <p class="market-next muted">${plan.next}</p>`);
}

function selectCountry(country) {
  if (state.country === country) return;
  state.country = country;
  setPressed("[data-country]", "country", country);
  renderMarket();
  renderCompetition();
  renderCountryStrategy();
}

function renderMonth() {
  const month = months[state.month];
  setPressed("[data-month]", "month", String(state.month));
  put("roadmap-detail", `
    <div>
      <p class="eyebrow">${month.date.toUpperCase()} · MONTH ${state.month + 1}</p>
      <h2>${month.title}</h2><h3>Planned work</h3>
      <ul>${month.tasks.map((task) => `<li>${task}</li>`).join("")}</ul>
    </div>
    <div class="roadmap-aside">
      <section><p class="eyebrow">TARGET MILESTONE</p><p>${month.milestone}</p></section>
      <section><p class="eyebrow">DEPENDENCIES</p><p>${month.dependency}</p></section>
    </div>`);
}

function setPagerLink(id, chapter, label) {
  const link = byId(id);
  link.hidden = !chapter;
  if (chapter) {
    link.href = "#" + chapter.id;
    link.textContent = label + " · " + chapter.name;
  }
}

function showChapter(id, moveFocus = true) {
  const index = chapters.findIndex((chapter) => chapter.id === id);
  if (index < 0 || state.chapter === id) return;
  const current = chapters[index];
  state.chapter = id;

  chapters.forEach((chapter) => {
    const active = chapter === current;
    chapter.section.hidden = !active;
    chapter.section.classList.toggle("entering", active);
    if (active) chapter.link.setAttribute("aria-current", "page");
    else chapter.link.removeAttribute("aria-current");
  });

  byId("chapter-count").textContent = `${twoDigits(index + 1)} / ${twoDigits(chapters.length)}`;
  byId("chapter-progress").style.width = `${((index + 1) / chapters.length) * 100}%`;
  setPagerLink("previous-chapter", chapters[index - 1], "Back");
  setPagerLink("next-chapter", chapters[index + 1], "Next");
  if (index === chapters.length - 1) {
    setPagerLink("next-chapter", chapters[0], "Return to");
    byId("next-chapter").textContent = "Return to overview";
  }

  const navRect = nav.getBoundingClientRect();
  const linkRect = current.link.getBoundingClientRect();
  if (linkRect.left < navRect.left || linkRect.right > navRect.right) {
    nav.scrollLeft += linkRect.left - navRect.left - (navRect.width - linkRect.width) / 2;
  }

  if (moveFocus) {
    window.scrollTo({ top: 0, behavior: "instant" });
    current.section.querySelector("h1").focus({ preventScroll: true });
  }
}

function goTo(id) {
  if (state.chapter !== id) history.pushState(null, "", "#" + id);
  showChapter(id);
}

function readRoute(moveFocus = true) {
  const id = location.hash.slice(1);
  if (id === "main") return;
  showChapter(chapters.some((chapter) => chapter.id === id) ? id : "overview", moveFocus);
}

function setPresentationMode(active) {
  state.presenting = active;
  document.body.classList.toggle("presenting", active);
  byId("present").setAttribute("aria-pressed", String(active));
  byId("present-label").textContent = active ? "Exit presentation" : "Present";
}

async function togglePresentation() {
  if (state.presenting) {
    if (document.fullscreenElement) await document.exitFullscreen();
    setPresentationMode(false);
    return;
  }

  setPresentationMode(true);
  try {
    await document.documentElement.requestFullscreen?.();
  } catch {
    // The layout and keyboard controls also work when fullscreen is unavailable.
  }
  window.scrollTo({ top: 0, behavior: "instant" });
  byId(state.chapter + "-title").focus({ preventScroll: true });
}

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement && state.presenting) setPresentationMode(false);
});

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (link && chapters.some((chapter) => "#" + chapter.id === link.hash) &&
      !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
    event.preventDefault();
    if (link.dataset.goCountry) selectCountry(link.dataset.goCountry);
    goTo(link.hash.slice(1));
    return;
  }

  const button = event.target.closest("button");
  if (!button) return;
  const { country, queryMode, keyword, competitor, month } = button.dataset;
  if (country) selectCountry(country);
  if (queryMode && queryMode !== state.queryMode) {
    state.queryMode = queryMode;
    setPressed("[data-query-mode]", "queryMode", queryMode);
    renderMarket();
  }
  if (keyword) {
    state.keyword[state.country] = keyword;
    renderMarketInsight();
  }
  if (competitor !== undefined) {
    state.competitor[state.country] = competitors[state.country][Number(competitor)][0];
    renderCompetitorProfile();
  }
  if (month !== undefined) {
    state.month = Number(month);
    renderMonth();
  }
});

document.addEventListener("keydown", (event) => {
  if (!state.presenting || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === "Escape" && !document.fullscreenElement) setPresentationMode(false);
  if (event.target.closest("a, button, summary, input, textarea, select, [contenteditable]")) return;

  const direction = { ArrowLeft: -1, ArrowRight: 1, PageUp: -1, PageDown: 1 }[event.key];
  if (!direction) return;
  const index = chapters.findIndex((chapter) => chapter.id === state.chapter);
  const destination = chapters[index + direction];
  if (destination) {
    event.preventDefault();
    goTo(destination.id);
  }
});

byId("present").addEventListener("click", togglePresentation);
document.querySelector(".skip").addEventListener("click", (event) => {
  event.preventDefault();
  byId("main").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "instant" });
});
window.addEventListener("hashchange", () => readRoute());
window.addEventListener("popstate", () => readRoute());

renderStaticContent();
renderMarket();
renderCompetition();
renderCountryStrategy();
renderMonth();
readRoute(false);
if (!state.chapter) showChapter("overview", false);


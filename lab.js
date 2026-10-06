// Peace Lab product registry + site header, shared by every product site.
//
// Each product keeps its own domain (the 37signals model: basecamp.com, hey.com) and the
// header carries a product switcher next to the logo (the Proton model), so a visitor can
// move between products from any page. To add a product: add one entry to PRODUCTS. The
// same file is copied to each product site; the entry whose `id` matches
// <body data-product="..."> is "this site".
const PRODUCTS = [
  {
    id: "peacelingo",
    name: "PeaceLingo",
    tagline: "Bilingual meeting notes from one recording",
    href: "https://peacelingo.com/",
    accent: "#24614f",
    icon: "https://peacelingo.com/icon-192.png",
    status: "beta",
  },
  {
    id: "peacemedia",
    name: "Peace Media",
    tagline: "Fact-checked AI explainers on YouTube",
    href: "https://chopeace.github.io/peace-media/",
    accent: "#5b4bd6",
    status: "live",
  },
];

// Per-site page links, shown after the switcher. Kept here so every page of a site agrees.
const SITE_LINKS = {
  peacelingo: [
    { name: "How it works", href: "/#how" },
    { name: "Privacy", href: "/#privacy" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Architecture", href: "/architecture" },
    { name: "How we ship", href: "/pipeline" },
    { name: "FAQ", href: "/#faq" },
  ],
};

(function () {
  const nav = document.getElementById("site-nav");
  if (!nav) return;
  const here = document.body.dataset.product;
  const self = PRODUCTS.find((p) => p.id === here) || PRODUCTS[0];
  const others = PRODUCTS.filter((p) => p !== self);
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const status = (p) => (p.status === "beta" ? ' <span class="pill">Beta</span>' : "");

  // The app icon when a product has one, else a dot in its accent color.
  const mark = (p, cls) => (p.icon
    ? `<img class="${cls}" src="${esc(p.icon)}" width="28" height="28" alt="">`
    : `<span class="dot" data-accent="${esc(p.accent)}"></span>`);
  const item = (p) =>
    `<li><a href="${esc(p.href)}"${p === self ? ' aria-current="true"' : ""}>` +
    mark(p, "app-icon") +
    `<span><b>${esc(p.name)}</b>${status(p)}<small>${esc(p.tagline)}</small></span></a></li>`;

  const switcher =
    `<details class="switcher"><summary aria-label="Switch product">` +
    `<span class="lab">Peace Lab</span></summary>` +
    `<div class="panel"><p class="panel-h">Products</p><ul>${[self, ...others].map(item).join("")}</ul></div></details>`;

  const links = (SITE_LINKS[self.id] || []).map((l) => `<li><a href="${esc(l.href)}">${esc(l.name)}</a></li>`).join("");

  if (nav.dataset.lab === "switcher") {
    // A site with its own header (Peace Media): keep its logo and links, add only the switcher.
    const brand = nav.querySelector(".brand");
    const left = document.createElement("div");
    left.className = "nav-left";
    brand.replaceWith(left);
    left.append(brand);
    left.insertAdjacentHTML("beforeend", switcher);
  } else {
    nav.innerHTML =
      `<div class="nav-left"><a class="brand" href="/">${self.icon ? mark(self, "brand-icon") : ""}${esc(self.name)}</a>${switcher}</div>` +
      `<ul class="nav-links">${links}</ul>`;
  }

  // Colors set through the DOM, not a style="" attribute, so the strict CSP (style-src 'self') holds.
  nav.querySelectorAll(".dot").forEach((el) => { el.style.background = el.dataset.accent; });

  // Close the switcher on outside click or Escape, like a native menu.
  const d = nav.querySelector(".switcher");
  document.addEventListener("click", (e) => { if (d.open && !d.contains(e.target)) d.open = false; });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") d.open = false; });
})();

// Site menu, shared by every page. To add a project: add one entry to PROJECTS
// and create its page (copy ai-briefing.html as a template), or link to its own site. With more than
// MAX_INLINE projects, they collapse into a "Projects" dropdown.
const PROJECTS = [
  { name: "Peace AI Briefing", href: "ai-briefing.html" },
  { name: "PeaceLingo", href: "https://peacelingo.com/" },
];
const MAX_INLINE = 3;

(function () {
  const nav = document.getElementById("site-nav");
  if (!nav) return;
  const here = location.pathname.split("/").pop() || "index.html";
  const link = (p) =>
    `<a href="${p.href}"${p.href === here ? ' aria-current="page"' : ""}>${p.name}</a>`;

  const projects = PROJECTS.length > MAX_INLINE
    ? `<li><details class="menu"><summary>Projects</summary><ul>${PROJECTS.map((p) => `<li>${link(p)}</li>`).join("")}</ul></details></li>`
    : PROJECTS.map((p) => `<li>${link(p)}</li>`).join("");

  nav.innerHTML =
    `<a class="brand" href="./">Peace<span>Media</span></a>` +
    `<ul>${projects}<li><a href="./#about">About</a></li>` +
    `<li>${link({ name: "Privacy", href: "privacy.html" })}</li></ul>`;
})();

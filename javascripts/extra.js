// ---------------------------------------------
// Navigation persistence & active parent expansion
// ---------------------------------------------
function setupNavPersistence() {
  const navItems = document.querySelectorAll(".md-nav__item--nested");

  navItems.forEach(item => {
    const toggle = item.querySelector(".md-nav__toggle");
    const label = item.querySelector(".md-nav__link");
    if (!toggle || !label) return;

    // Use stable key for localStorage
    const key = "nav-state-" + label.textContent.trim().toLowerCase().replace(/\s+/g, "-");

    // Restore saved state
    const saved = localStorage.getItem(key);
    if (saved === "expanded") toggle.checked = true;
    if (saved === "collapsed") toggle.checked = false;

    // Save state when user toggles
    toggle.addEventListener("change", () => {
      localStorage.setItem(key, toggle.checked ? "expanded" : "collapsed");
    });
  });

  expandActiveParents();
}

// ---------------------------------------------
// Only expand parents of the current page
// ---------------------------------------------
function expandActiveParents() {
  const activeLink = document.querySelector(".md-nav__link--active");
  if (!activeLink) return;

  // Walk up the DOM, expanding only the true parent sections
  let parent = activeLink.closest(".md-nav__item--nested");
  while (parent) {
    // Only expand parent if it's a top-level collapsible section
    const toggle = parent.querySelector(":scope > .md-nav__toggle");
    if (toggle) toggle.checked = true;

    // Move up to the next nested parent
    parent = parent.parentElement?.closest(".md-nav__item--nested");
  }
}

// ---------------------------------------------
// Run once on initial page load
// ---------------------------------------------
document.addEventListener("DOMContentLoaded", setupNavPersistence);

// ---------------------------------------------
// Re-run after Material instant navigation
// ---------------------------------------------
if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    setupNavPersistence();
  });
}
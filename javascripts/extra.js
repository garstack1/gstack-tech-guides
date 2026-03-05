function setupNavPersistence() {

  const navItems = document.querySelectorAll(".md-nav__item--nested");

  navItems.forEach(item => {

    const toggle = item.querySelector(".md-nav__toggle");
    const label = item.querySelector(".md-nav__link");

    if (!toggle || !label) return;

    const key = "nav-state-" + label.textContent.trim();

    // Restore saved state
    const saved = localStorage.getItem(key);

    if (saved === "expanded") toggle.checked = true;
    if (saved === "collapsed") toggle.checked = false;

    // Save state when user toggles
    toggle.addEventListener("change", () => {
      localStorage.setItem(key, toggle.checked ? "expanded" : "collapsed");
    });

  });

  // Ensure current page section is open
  const activeLink = document.querySelector(".md-nav__link--active");

  if (activeLink) {

    let parent = activeLink.closest(".md-nav__item--nested");

    while (parent) {

      const toggle = parent.querySelector(".md-nav__toggle");

      if (toggle) toggle.checked = true;

      parent = parent.parentElement?.closest(".md-nav__item--nested");

    }
  }
}


/* Run once on first page load */
document.addEventListener("DOMContentLoaded", setupNavPersistence);


/* Run again after instant navigation */
if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    setupNavPersistence();
  });
}
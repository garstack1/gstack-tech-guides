document.addEventListener("DOMContentLoaded", function () {

  const navItems = document.querySelectorAll(".md-nav__item--nested");

  // Restore saved state
  navItems.forEach(item => {
    const toggle = item.querySelector(".md-nav__toggle");
    const label = item.querySelector(".md-nav__link");

    if (!toggle || !label) return;

    const key = "nav-state-" + label.textContent.trim();

    const savedState = localStorage.getItem(key);

    if (savedState === "expanded") {
      toggle.checked = true;
    }

    if (savedState === "collapsed") {
      toggle.checked = false;
    }

    // Save state when toggled
    toggle.addEventListener("change", () => {
      localStorage.setItem(key, toggle.checked ? "expanded" : "collapsed");
    });
  });


  // Always expand the section that contains the active page
  const activeLink = document.querySelector(".md-nav__link--active");

  if (activeLink) {

    let parent = activeLink.closest(".md-nav__item--nested");

    while (parent) {

      const toggle = parent.querySelector(".md-nav__toggle");

      if (toggle) {
        toggle.checked = true;
      }

      parent = parent.parentElement.closest(".md-nav__item--nested");
    }

  }

});
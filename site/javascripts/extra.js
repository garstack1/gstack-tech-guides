document.addEventListener('DOMContentLoaded', () => {
  // 1. Always expand the section that contains the currently viewed page
  const activeSection = document.querySelector('.md-nav__section--active');
  if (activeSection) {
    activeSection.classList.remove('md-nav__section--collapsed');
  }

  // 2. Restore previously expanded sections (remember user's choice)
  document.querySelectorAll('.md-nav__section').forEach(section => {
    const storageKey = 'nav-section-' + (section.id || section.textContent.trim());
    if (localStorage.getItem(storageKey) === 'expanded') {
      section.classList.remove('md-nav__section--collapsed');
    }
  });

  // 3. Save expanded/collapsed state when user clicks a section title
  document.querySelectorAll('.md-nav__section > .md-nav__link').forEach(link => {
    link.addEventListener('click', () => {
      // Wait a tiny bit for Material to process its own collapse
      setTimeout(() => {
        const section = link.parentElement;
        const isCollapsed = section.classList.contains('md-nav__section--collapsed');
        const storageKey = 'nav-section-' + (section.id || section.textContent.trim());
        localStorage.setItem(storageKey, isCollapsed ? 'collapsed' : 'expanded');
      }, 100);
    });
  });
});
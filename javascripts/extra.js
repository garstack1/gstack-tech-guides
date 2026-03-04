// Force collapse all sections on initial load (runs after Material JS)
document.addEventListener('DOMContentLoaded', () => {
  // Find all section links
  document.querySelectorAll('.md-nav__section > .md-nav__link').forEach(link => {
    // Simulate click to collapse if not already collapsed
    if (!link.parentElement.classList.contains('md-nav__section--collapsed')) {
      link.click();
    }
  });

  // Ensure the active section is expanded
  const activeSection = document.querySelector('.md-nav__section--active');
  if (activeSection) {
    activeSection.classList.remove('md-nav__section--collapsed');
  }
});
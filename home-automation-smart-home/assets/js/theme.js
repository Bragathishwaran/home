/* ============================================
   NEXORA HOME - Theme JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initThemeToggle();
});

/* --- Initialize Theme --- */
function initTheme() {
  const saved = localStorage.getItem('nexora-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);
}

/* --- Apply Theme --- */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('nexora-theme', theme);

  const icon = document.querySelector('.theme-toggle i');
  if (icon) {
    icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  }
}

/* --- Theme Toggle --- */
function initThemeToggle() {
  const toggles = document.querySelectorAll('.theme-toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  });
}

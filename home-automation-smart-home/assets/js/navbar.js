/* ============================================
   NEXORA HOME - Navbar JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initActivePage();
  initNavDropdowns();
  initDirToggle();
});

/* --- Navbar Scroll Effect --- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (!toggle || !menu) return;

  const closeBtn = ensureMobileClose(toggle, menu);

  const isOpen = () => menu.classList.contains('active');

  const close = () => {
    toggle.classList.remove('active');
    menu.classList.remove('active');
    document.body.classList.remove('no-scroll');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = !isOpen();
    toggle.classList.toggle('active', open);
    menu.classList.toggle('active', open);
    document.body.classList.toggle('no-scroll', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  closeBtn.addEventListener('click', close);

  menu.querySelectorAll('a').forEach(link => {
    if (link.classList.contains('mobile-menu-home')) return;
    link.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) close();
  });
}

function ensureMobileClose(toggle, menu) {
  let btn = menu.querySelector('.mobile-close');
  if (!btn) {
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'mobile-close';
    btn.setAttribute('aria-label', 'Close menu');
    btn.innerHTML = '<i class="bi bi-x-lg"></i>';
    toggle.parentNode.insertBefore(btn, toggle.nextSibling);
  }
  return btn;
}

/* --- Active Page Indicator --- */
function initActivePage() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.navbar-nav a, .mobile-menu a');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.split('/').pop();

    if (linkPath === currentPath ||
        (currentPath === '' && linkPath === 'index.html') ||
        (currentPath === 'index.html' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --- Home Dropdown (Navbar) --- */
function initNavDropdowns() {
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  if (!dropdowns.length) return;

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      dropdowns.forEach((dd) => dd.classList.remove('open'));
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') dropdowns.forEach((dd) => dd.classList.remove('open'));
  });

  dropdowns.forEach((dd) => {
    const toggle = dd.querySelector(':scope > a');
    if (!toggle) return;

    if (canHover) {
      dd.addEventListener('mouseenter', () => dd.classList.add('open'));
      dd.addEventListener('mouseleave', () => dd.classList.remove('open'));
    }

    toggle.addEventListener('click', (e) => {
      if (dd.classList.contains('open')) return;
      e.preventDefault();
      dropdowns.forEach((other) => {
        if (other !== dd) other.classList.remove('open');
      });
      dd.classList.add('open');
    });
  });
}

/* --- Mobile Menu Home Submenu --- */
function toggleMobileHome(event) {
  event.preventDefault();
  const menu = document.querySelector('.mobile-menu');
  const sub = event.currentTarget.nextElementSibling;
  if (!sub) return;

  const willOpen = !sub.classList.contains('open');
  event.currentTarget.classList.toggle('down', willOpen);
  sub.classList.toggle('open', willOpen);
  if (menu) menu.classList.add('active');
}

/* --- Text Direction Toggle (LTR / RTL) --- */
function initDirToggle() {
  const group = document.querySelector('.dir-toggle');
  if (!group) return;

  const html = document.documentElement;
  const saved = (() => {
    try { return localStorage.getItem('nexora:dir'); } catch (e) { return null; }
  })();
  const initial = saved === 'rtl' ? 'rtl' : 'ltr';

  applyDir(initial);

  group.addEventListener('click', (e) => {
    const btn = e.target.closest('.dir-btn');
    if (!btn) return;
    const dir = btn.dataset.dir;
    applyDir(dir);
    try { localStorage.setItem('nexora:dir', dir); } catch (e) {}
  });

  function applyDir(dir) {
    html.setAttribute('dir', dir);
    group.querySelectorAll('.dir-btn').forEach(btn => {
      const active = btn.dataset.dir === dir;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }
}

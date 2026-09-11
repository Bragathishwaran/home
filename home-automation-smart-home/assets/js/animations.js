/* ============================================
   NEXORA HOME - Animations JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initStaggerChildren();
  initCardGlowEffect();
  initSmoothAnchors();
  initParallax();
});

/* --- Scroll Reveal with Intersection Observer --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --- Stagger Children --- */
function initStaggerChildren() {
  document.querySelectorAll('.stagger-children').forEach(parent => {
    const children = parent.children;
    Array.from(children).forEach((child, index) => {
      child.style.setProperty('--child-index', index);
    });
  });
}

/* --- Card Glow Following Mouse --- */
function initCardGlowEffect() {
  const cards = document.querySelectorAll('.card-hover-glow');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* --- Smooth Anchor Links --- */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* --- Parallax on Hero (light) --- */
function initHeroParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const visual = hero.querySelector('.hero-visual');
    if (visual && scrolled < window.innerHeight) {
      visual.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', initHeroParallax);

/* --- Parallax Band (JS-driven, static on touch/reduced-motion) --- */
function initParallax() {
  const section = document.querySelector('.parallax-section');
  const bg = document.querySelector('.parallax-bg');
  if (!section || !bg) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reducedMotion || isTouch) return;

  const speed = 0.35;
  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.bottom < 0 || rect.top > vh) return;
    const travelled = vh / 2 - (rect.top + rect.height / 2);
    const offset = Math.max(-16, Math.min(16, travelled * speed));
    bg.style.transform = `translate3d(0, ${offset}%, 0)`;
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}

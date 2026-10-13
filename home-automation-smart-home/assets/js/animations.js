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
  initAboutHeroParallax();
  initEditorialHeroParallax();

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

/* --- Full-bleed parallax background for the About hero --- */
function initAboutHeroParallax() {
  const hero = document.querySelector('.about-hero');
  const bg = hero && hero.querySelector('.about-hero-bg');
  if (!hero || !bg) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const strength = isTouch ? 5 : 9;
  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = hero.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.bottom < 0 || rect.top > vh) return;
    const travelled = vh / 2 - (rect.top + rect.height / 2);
    const offset = Math.max(-strength, Math.min(strength, travelled * 0.1));
    bg.style.transform = `translate3d(0, ${offset.toFixed(2)}%, 0)`;
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

/* --- Subtle parallax on Blog hero imagery --- */
function initEditorialHeroParallax() {
  const images = document.querySelectorAll('.blog-featured-story img');
  if (!images.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const maxOffset = isTouch ? 8 : 16;
  let ticking = false;

  const update = () => {
    ticking = false;
    const viewportCenter = window.innerHeight / 2;
    images.forEach(image => {
      const rect = image.parentElement.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const centerDelta = rect.top + rect.height / 2 - viewportCenter;
      const offset = Math.max(-maxOffset, Math.min(maxOffset, centerDelta * -0.035));
      image.style.setProperty('--hero-parallax-y', `${offset.toFixed(2)}px`);
    });
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  update();
}

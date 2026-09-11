/* ============================================
   NEXORA HOME - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initBackToTop();
  initScrollReveal();
  initCardGlow();
  initNewsletterForm();
});

/* --- Page Loader --- */
function initPageLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;

  const hide = () => {
    loader.classList.add('hidden');
    setTimeout(() => { if (loader.parentNode) loader.parentNode.removeChild(loader); }, 600);
  };

  window.addEventListener('load', () => setTimeout(hide, 400));
  setTimeout(hide, 3500);
}

/* --- Back to Top --- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- Scroll Reveal --- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach((el, i) => {
    el.style.setProperty('--child-index', i % 6);
    observer.observe(el);
  });
}

/* --- Card Glow Effect --- */
function initCardGlow() {
  const cards = document.querySelectorAll('.card-hover-glow');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', ((e.clientX - rect.left) / rect.width * 100) + '%');
      card.style.setProperty('--mouse-y', ((e.clientY - rect.top) / rect.height * 100) + '%');
    });
  });
}

/* --- Newsletter Form --- */
function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value.includes('@')) {
        showToast('Subscribed!', 'You\'ll receive smart home insights soon.', 'success');
        input.value = '';
      }
    });
  });
}

/* --- Toast Notification --- */
function showToast(title, message, type = 'info') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const icons = {
    success: 'bi-check-circle-fill',
    error: 'bi-exclamation-circle-fill',
    info: 'bi-info-circle-fill'
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="bi ${icons[type] || icons.info} toast-icon"></i>
    <div class="toast-content">
      <h5>${title}</h5>
      <p>${message}</p>
    </div>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* --- Animated Counters --- */
function animateCounter(el, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * eased);
    el.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* Run counter init when page loads */
document.addEventListener('DOMContentLoaded', initCounters);

/* --- Smooth Scroll for Anchor Links --- */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (link) {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

/* --- FAQ Toggle --- */
document.addEventListener('click', (e) => {
  const question = e.target.closest('.faq-question');
  if (question) {
    const item = question.closest('.faq-item');
    const wasOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

    if (!wasOpen) {
      item.classList.add('open');
    }
  }
});

/* --- Mobile Sidebar Toggle --- */
function toggleDashboardSidebar() {
  const sidebar = document.querySelector('.dashboard-sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  if (sidebar) {
    sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');
  }
}

/* --- Modal Functions --- */
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
}

/* Close modal on overlay click */
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }
});

/* Close modal on escape */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.classList.remove('no-scroll');
  }
});

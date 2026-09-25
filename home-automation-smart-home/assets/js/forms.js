/* ============================================
   NEXORA HOME - Forms JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initLoginForm();
  initRegisterForm();
  initPasswordStrength();
  initServiceRequestForm();
  initTicketForm();
  initWarrantyForm();
  initLoginSuccessPopup();
});

/* --- Contact Form --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateContactForm(form)) {
      showToast('Request Sent!', 'We\'ll contact you within 24 hours.', 'success');
      form.reset();
    }
  });
}

function validateContactForm(form) {
  const name = form.querySelector('[name="name"]');
  const email = form.querySelector('[name="email"]');
  const phone = form.querySelector('[name="phone"]');
  const message = form.querySelector('[name="message"]');
  let valid = true;

  if (name && !name.value.trim()) {
    showFieldError(name, 'Full name is required');
    valid = false;
  } else if (name && !isValidName(name.value)) {
    showFieldError(name, 'Please enter your full name (letters only)');
    valid = false;
  } else { clearFieldError(name); }

  if (email && !isValidEmail(email.value.trim())) {
    showFieldError(email, 'Valid email is required');
    valid = false;
  } else { clearFieldError(email); }

  if (phone && !phone.value.trim()) {
    showFieldError(phone, 'Phone number is required');
    valid = false;
  } else if (phone && !isValidPhone(phone.value)) {
    showFieldError(phone, 'Enter a valid phone number (digits only)');
    valid = false;
  } else { clearFieldError(phone); }

  if (message && !message.value.trim()) {
    showFieldError(message, 'Please enter your message');
    valid = false;
  } else { clearFieldError(message); }

  return valid;
}

/* --- Login Form --- */
function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('[name="email"]');
    const password = form.querySelector('[name="password"]');
    let valid = true;

    if (email && !isValidEmail(email.value.trim())) {
      showFieldError(email, 'Valid email is required');
      valid = false;
    } else { clearFieldError(email); }

    if (password && password.value.length < 6) {
      showFieldError(password, 'Password must be at least 6 characters');
      valid = false;
    } else { clearFieldError(password); }

    if (valid) {
      window.location.href = 'login.html?login=success';
    }
  });
}

/* --- Login Success Popup --- */
function initLoginSuccessPopup() {
  if (!document.getElementById('login-form')) return;

  if (new URLSearchParams(window.location.search).get('login') === 'success') {
    showToast('Login Successful!', 'Welcome back to Nexora Home.', 'success');
    const url = new URL(window.location.href);
    url.searchParams.delete('login');
    window.history.replaceState({}, '', url);
  }
}

/* --- Register Form --- */
function initRegisterForm() {
  const form = document.getElementById('register-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const phone = form.querySelector('[name="phone"]');
    const password = form.querySelector('[name="password"]');
    const confirm = form.querySelector('[name="confirm-password"]');
    const terms = form.querySelector('[name="terms"]');
    let valid = true;

    if (name && !name.value.trim()) {
      showFieldError(name, 'Full name is required');
      valid = false;
    } else if (name && !isValidName(name.value)) {
      showFieldError(name, 'Please enter your full name (letters only)');
      valid = false;
    } else { clearFieldError(name); }

    if (email && !isValidEmail(email.value.trim())) {
      showFieldError(email, 'Valid email is required');
      valid = false;
    } else { clearFieldError(email); }

    if (phone && !phone.value.trim()) {
      showFieldError(phone, 'Phone number is required');
      valid = false;
    } else if (phone && !isValidPhone(phone.value)) {
      showFieldError(phone, 'Enter a valid phone number (digits only)');
      valid = false;
    } else { clearFieldError(phone); }

    if (password && password.value.length < 8) {
      showFieldError(password, 'Password must be at least 8 characters');
      valid = false;
    } else { clearFieldError(password); }

    if (confirm && confirm.value !== password.value) {
      showFieldError(confirm, 'Passwords do not match');
      valid = false;
    } else { clearFieldError(confirm); }

    if (terms && !terms.checked) {
      showToast('Terms Required', 'Please agree to the Terms & Privacy Policy.', 'error');
      valid = false;
    }

    if (valid) {
      showToast('Account Created!', 'Welcome to Nexora Home.', 'success');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1200);
    }
  });
}

/* --- Password Strength --- */
function initPasswordStrength() {
  const passwordInput = document.querySelector('#register-form [name="password"]');
  if (!passwordInput) return;

  passwordInput.addEventListener('input', (e) => {
    const val = e.target.value;
    const strength = getPasswordStrength(val);
    const bar = document.querySelector('.strength-bar-fill');
    const text = document.querySelector('.strength-text');

    if (bar) {
      bar.className = 'strength-bar-fill ' + strength.level;
    }
    if (text) {
      text.textContent = strength.label;
    }
  });
}

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 'weak', label: 'Weak password' };
  if (score <= 2) return { level: 'fair', label: 'Fair password' };
  if (score <= 3) return { level: 'good', label: 'Good password' };
  return { level: 'strong', label: 'Strong password' };
}

/* --- Service Request Form --- */
function initServiceRequestForm() {
  const form = document.getElementById('service-request-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.querySelector('[name="service"]').value && form.querySelector('[name="description"]').value) {
      closeModal('service-request-modal');
      showToast('Request Submitted', 'Your service request has been received.', 'success');
      form.reset();
    }
  });
}

/* --- Ticket Form --- */
function initTicketForm() {
  const form = document.getElementById('ticket-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.querySelector('[name="subject"]').value && form.querySelector('[name="description"]').value) {
      showToast('Ticket Created', 'Our team will respond shortly.', 'success');
      form.reset();
    }
  });
}

/* --- Warranty Form --- */
function initWarrantyForm() {
  const form = document.getElementById('warranty-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Product Registered', 'Warranty has been activated.', 'success');
    form.reset();
  });
}

/* --- Utility Functions --- */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidName(name) {
  const trimmed = name.trim();
  if (trimmed.length < 2) return false;
  if (!/^[A-Za-z][A-Za-z' .-]*$/.test(trimmed)) return false;
  if (trimmed.replace(/[^A-Za-z]/g, '').length < 2) return false;
  return true;
}

function isValidPhone(phone) {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return /^\+?[0-9]{7,15}$/.test(cleaned);
}

function showFieldError(field, message) {
  clearFieldError(field);
  field.style.borderColor = '#ef4444';
  const error = document.createElement('span');
  error.className = 'field-error';
  error.style.cssText = 'color:#ef4444;font-size:0.8rem;margin-top:4px;display:block;';
  error.textContent = message;
  field.parentNode.appendChild(error);
}

function clearFieldError(field) {
  if (!field) return;
  field.style.borderColor = '';
  const error = field.parentNode?.querySelector('.field-error');
  if (error) error.remove();
}

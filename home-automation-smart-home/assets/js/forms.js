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

  const nameField = form.querySelector('[name="name"]');
  const emailField = form.querySelector('[name="email"]');
  const phoneField = form.querySelector('[name="phone"]');
  const messageField = form.querySelector('[name="message"]');

  applyInputFilter(nameField, (v) => v.replace(/[^A-Za-z\s]/g, ''));
  applyInputFilter(emailField, (v) => v.replace(/\s/g, ''));
  applyInputFilter(phoneField, (v) => v.replace(/\D/g, '').slice(0, 10));

  wireLiveValidation(nameField, (live) => validateNameField(nameField, live));
  wireLiveValidation(emailField, (live) => validateEmailField(emailField, live));
  wireLiveValidation(phoneField, (live) => validatePhoneField(phoneField, live));
  wireLiveValidation(messageField, (live) => validateRequiredText(messageField, 'Please enter your message', live));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const checks = [
      validateNameField(nameField, false),
      validateEmailField(emailField, false),
      validatePhoneField(phoneField, false),
      validateRequiredText(messageField, 'Please enter your message', false),
    ];
    if (checks.every(Boolean)) {
      submitContactPayload(buildContactPayload(form));
    }
  });
}

function validateContactForm(form) {
  return [
    validateNameField(form.querySelector('[name="name"]'), false),
    validateEmailField(form.querySelector('[name="email"]'), false),
    validatePhoneField(form.querySelector('[name="phone"]'), false),
    validateRequiredText(form.querySelector('[name="message"]'), 'Please enter your message', false),
  ].every(Boolean);
}

function buildContactPayload(form) {
  return {
    name: form.querySelector('[name="name"]').value.trim(),
    email: form.querySelector('[name="email"]').value.trim(),
    phone: form.querySelector('[name="phone"]').value.trim(),
    propertyType: form.querySelector('[name="property-type"]').value,
    city: form.querySelector('[name="city"]').value,
    solution: form.querySelector('[name="solution"]').value,
    consultationDate: form.querySelector('[name="consultation-date"]').value,
    message: form.querySelector('[name="message"]').value.trim(),
  };
}

function submitContactPayload(payload) {
  // Server-boundary: send the sanitized payload to the submission API.
  showToast('Request Sent!', 'We\'ll contact you within 24 hours.', 'success');
  const form = document.getElementById('contact-form');
  if (form) form.reset();
}

/* --- Login Form --- */
function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;

  const emailField = form.querySelector('[name="email"]');
  const passwordField = form.querySelector('[name="password"]');

  applyInputFilter(emailField, (v) => v.replace(/\s/g, ''));
  wireLiveValidation(emailField, (live) => validateEmailField(emailField, live));
  wireLiveValidation(passwordField, (live) => validatePasswordField(passwordField, 6, 'Password must be at least 6 characters', live));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailOk = validateEmailField(emailField, false);
    const passwordOk = validatePasswordField(passwordField, 6, 'Password must be at least 6 characters', false);
    if (emailOk && passwordOk) {
      submitLoginRequest({
        email: emailField.value.trim(),
        password: passwordField.value,
      });
    }
  });
}

function submitLoginRequest(credentials) {
  // Server-boundary: post the sanitized credentials to the login API.
  window.location.href = 'login.html?login=success';
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

  const nameField = form.querySelector('[name="name"]');
  const emailField = form.querySelector('[name="email"]');
  const phoneField = form.querySelector('[name="phone"]');
  const passwordField = form.querySelector('[name="password"]');
  const confirmField = form.querySelector('[name="confirm-password"]');
  const termsField = form.querySelector('[name="terms"]');

  applyInputFilter(nameField, (v) => v.replace(/[^A-Za-z\s]/g, ''));
  applyInputFilter(emailField, (v) => v.replace(/\s/g, ''));
  applyInputFilter(phoneField, (v) => v.replace(/\D/g, '').slice(0, 10));

  wireLiveValidation(nameField, (live) => validateNameField(nameField, live));
  wireLiveValidation(emailField, (live) => validateEmailField(emailField, live));
  wireLiveValidation(phoneField, (live) => validatePhoneField(phoneField, live));
  wireLiveValidation(passwordField, (live) => validatePasswordField(passwordField, 8, 'Password must be at least 8 characters', live));
  wireLiveValidation(confirmField, (live) => {
    if (!confirmField.value) {
      if (!live) showFieldError(confirmField, 'Please confirm your password');
      else clearFieldError(confirmField);
      return false;
    }
    return matchPasswordFields(confirmField, passwordField);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const checks = [
      validateNameField(nameField, false),
      validateEmailField(emailField, false),
      validatePhoneField(phoneField, false),
      validatePasswordField(passwordField, 8, 'Password must be at least 8 characters', false),
      matchPasswordFields(confirmField, passwordField),
      validateTermsField(termsField),
    ];
    if (checks.every(Boolean)) {
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
  return /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]*[A-Za-z0-9])?@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,}$/.test(email);
}

function isValidName(name) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return false;
  return words.every((w) => /^[A-Za-z]+$/.test(w) && w.length >= 2);
}

function isValidPhone(phone) {
  return /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));
}

/* --- Live input filtering + validation wiring --- */
function applyInputFilter(field, filterFn) {
  if (!field) return;
  field.addEventListener('input', () => {
    const filtered = filterFn(field.value);
    if (filtered !== field.value) field.value = filtered;
  });
}

function wireLiveValidation(field, validateFn) {
  if (!field) return;
  field.addEventListener('blur', () => validateFn(false));
  field.addEventListener('input', () => validateFn(true));
}

/* --- Field validators (return true when valid) --- */
function validateNameField(field, live) {
  const value = (field && field.value.trim()) || '';
  if (!value) {
    if (!live) showFieldError(field, 'Full name is required');
    else clearFieldError(field);
    return false;
  }
  if (!isValidName(value)) {
    showFieldError(field, 'Full name can contain letters and spaces only');
    return false;
  }
  clearFieldError(field);
  return true;
}

function validateEmailField(field, live) {
  const value = (field && field.value.trim()) || '';
  if (!value) {
    if (!live) showFieldError(field, 'Email is required');
    else clearFieldError(field);
    return false;
  }
  if (!isValidEmail(value)) {
    showFieldError(field, 'Enter a valid email address (e.g. name@example.com)');
    return false;
  }
  clearFieldError(field);
  return true;
}

function validatePhoneField(field, live) {
  const value = (field && field.value.trim()) || '';
  if (!value) {
    if (!live) showFieldError(field, 'Phone number is required');
    else clearFieldError(field);
    return false;
  }
  if (!isValidPhone(value)) {
    showFieldError(field, 'Enter a valid 10-digit mobile number');
    return false;
  }
  clearFieldError(field);
  return true;
}

function validateRequiredText(field, message, live) {
  const value = (field && field.value.trim()) || '';
  if (!value) {
    if (!live) showFieldError(field, message);
    else clearFieldError(field);
    return false;
  }
  clearFieldError(field);
  return true;
}

function validatePasswordField(field, min, message, live) {
  const value = (field && field.value) || '';
  if (!value) {
    if (!live) showFieldError(field, 'Password is required');
    else clearFieldError(field);
    return false;
  }
  if (value.length < min) {
    showFieldError(field, message);
    return false;
  }
  clearFieldError(field);
  return true;
}

function matchPasswordFields(confirmField, passwordField) {
  if (!confirmField) return true;
  if (!confirmField.value) {
    showFieldError(confirmField, 'Please confirm your password');
    return false;
  }
  if (confirmField.value !== passwordField.value) {
    showFieldError(confirmField, 'Passwords do not match');
    return false;
  }
  clearFieldError(confirmField);
  return true;
}

function validateTermsField(field) {
  if (!field) return true;
  if (!field.checked) {
    showToast('Terms Required', 'Please agree to the Terms & Privacy Policy.', 'error');
    return false;
  }
  return true;
}

function showFieldError(field, message) {
  clearFieldError(field);
  field.style.borderColor = '#ef4444';
  field.setAttribute('aria-invalid', 'true');
  const error = document.createElement('span');
  error.className = 'field-error';
  error.style.cssText = 'color:#ef4444;font-size:0.8rem;margin-top:4px;display:block;';
  error.textContent = message;
  field.parentNode.appendChild(error);
}

function clearFieldError(field) {
  if (!field) return;
  field.style.borderColor = '';
  field.removeAttribute('aria-invalid');
  const error = field.parentNode?.querySelector('.field-error');
  if (error) error.remove();
}

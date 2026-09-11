/* ============================================
   NEXORA HOME - Pricing JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPricingToggle();
});

function initPricingToggle() {
  const toggle = document.getElementById('pricing-toggle');
  if (!toggle) return;

  const monthlyLabel = document.getElementById('monthly-label');
  const yearlyLabel = document.getElementById('yearly-label');

  toggle.addEventListener('click', () => {
    const isYearly = toggle.classList.toggle('active');

    if (monthlyLabel) monthlyLabel.classList.toggle('active', !isYearly);
    if (yearlyLabel) yearlyLabel.classList.toggle('active', isYearly);

    document.querySelectorAll('.pricing-amount').forEach(el => {
      const monthly = el.dataset.monthly;
      const yearly = el.dataset.yearly;
      if (monthly && yearly) {
        const amountEl = el.querySelector('.amount');
        if (amountEl) {
          amountEl.textContent = isYearly ? yearly : monthly;
        }
      }
    });
  });
}

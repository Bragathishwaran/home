/* ============================================
   NEXORA HOME - Dashboard JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardNav();
  initDeviceToggles();
  initSettingsToggles();
  initNotificationDropdown();
});

/* --- Dashboard Navigation --- */
function initDashboardNav() {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href.replace('../', '').replace('./', ''))) {
      link.classList.add('active');
    }
  });
}

/* --- Device Toggles --- */
function initDeviceToggles() {
  document.querySelectorAll('.device-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const card = toggle.closest('.device-card');
      const statusEl = card?.querySelector('.device-status');

      toggle.classList.toggle('active');
      const isOn = toggle.classList.contains('active');

      if (statusEl) {
        statusEl.className = `device-status ${isOn ? 'online' : 'offline'}`;
        statusEl.innerHTML = `<span class="status-dot"></span> ${isOn ? 'Online' : 'Offline'}`;
      }

      const deviceName = card?.querySelector('h4')?.textContent || 'Device';
      showToast(
        isOn ? 'Device Turned On' : 'Device Turned Off',
        `${deviceName} has been ${isOn ? 'activated' : 'deactivated'}.`,
        isOn ? 'success' : 'info'
      );
    });
  });
}

/* --- Settings Toggles --- */
function initSettingsToggles() {
  document.querySelectorAll('.settings-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
    });
  });
}

/* --- Notification Dropdown --- */
function initNotificationDropdown() {
  const btn = document.querySelector('.notification-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    showToast('Notifications', 'You have 3 new notifications.', 'info');
  });
}

/* --- Demo Chart (Dashboard Home) --- */
function initDashboardChart() {
  const canvas = document.getElementById('energyChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.parentElement.offsetWidth;
  const height = canvas.height = 200;

  const data = [12, 19, 14, 22, 18, 25, 20];
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxVal = Math.max(...data);
  const barWidth = (width - 60) / data.length;
  const chartHeight = height - 40;

  ctx.clearRect(0, 0, width, height);

  data.forEach((val, i) => {
    const barHeight = (val / maxVal) * chartHeight;
    const x = 30 + i * barWidth + barWidth * 0.2;
    const y = height - 30 - barHeight;

    const gradient = ctx.createLinearGradient(x, y, x, height - 30);
    gradient.addColorStop(0, '#B08D57');
    gradient.addColorStop(1, 'rgba(176, 141, 87, 0.25)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth * 0.6, barHeight, [4, 4, 0, 0]);
    ctx.fill();

    ctx.fillStyle = '#A8A39A';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(labels[i], x + barWidth * 0.3, height - 12);

    ctx.fillStyle = '#6F6A61';
    ctx.font = 'bold 11px Space Grotesk, sans-serif';
    ctx.fillText(val + ' kWh', x + barWidth * 0.3, y - 6);
  });
}

document.addEventListener('DOMContentLoaded', initDashboardChart);

/* --- Download Invoice (Demo) --- */
function downloadDemoInvoice(invoiceId) {
  const content = `
NEXORA HOME - INVOICE
================================
Invoice ID: ${invoiceId}
Date: ${new Date().toLocaleDateString()}
================================

Thank you for choosing Nexora Home!

This is a demo invoice for demonstration purposes.
For actual invoices, please contact support.

================================
Nexora Home Intelligence
support@nexorahome.com
================================
  `.trim();

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Nexora-Invoice-${invoiceId}.txt`;
  a.click();
  URL.revokeObjectURL(url);

  showToast('Download Started', `Invoice ${invoiceId} is downloading.`, 'success');
}

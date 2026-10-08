/* ============================================
   NEXORA HOME - Dashboard JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardNav();
  initDeviceToggles();
  initNotificationDropdown();
  initDirToggle();
});

/* --- Text Direction (LTR / RTL) --- */
function setDirection(dir) {
  if (dir !== 'ltr' && dir !== 'rtl') return null;
  const html = document.documentElement;
  html.setAttribute('dir', dir);
  html.classList.toggle('is-rtl', dir === 'rtl');
  html.classList.toggle('is-ltr', dir === 'ltr');
  document.querySelectorAll('.dir-toggle .dir-btn').forEach(btn => {
    const active = btn.dataset.dir === dir;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
  try { localStorage.setItem('nexora:dir', dir); } catch (e) {}
  return dir;
}

function setLTR() {
  return setDirection('ltr');
}

function setRTL() {
  return setDirection('rtl');
}

function initDirToggle() {
  const saved = (() => {
    try { return localStorage.getItem('nexora:dir'); } catch (e) { return null; }
  })();
  setDirection(saved === 'rtl' ? 'rtl' : 'ltr');

  document.querySelectorAll('.dir-toggle').forEach(group => {
    if (group.dataset.dirBound === '1') return;
    group.dataset.dirBound = '1';
    group.addEventListener('click', (e) => {
      const btn = e.target.closest('.dir-btn');
      if (!btn) return;
      setDirection(btn.dataset.dir);
    });
  });
}

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

/* --- Notification Dropdown --- */
function initNotificationDropdown() {
  const btn = document.querySelector('.notification-bell');
  if (!btn) return;
  const anchor = btn.closest('.dashboard-header-right') || btn.parentElement;
  if (!anchor) return;
  if (anchor.querySelector('.notification-panel')) return;

  const panel = document.createElement('div');
  panel.className = 'notification-panel';
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-label', 'Notifications');
  panel.innerHTML = `
    <div class="notification-panel-header">
      <h4>Notifications</h4>
      <button type="button" class="notification-mark-read">Mark all as read</button>
    </div>
    <div class="notification-list">
      <a class="notification-item unread" href="devices.html">
        <span class="notif-icon notif-alert"><i class="bi bi-shield-exclamation"></i></span>
        <span class="notif-body">
          <h5>Security Alert</h5>
          <p>Front Door lock was opened while you were away.</p>
          <time>12 min ago</time>
        </span>
      </a>
      <a class="notification-item unread" href="service-requests.html">
        <span class="notif-icon notif-service"><i class="bi bi-tools"></i></span>
        <span class="notif-body">
          <h5>Service Update</h5>
          <p>Technician assigned to request #SR-1042 &mdash; arrives Oct 11.</p>
          <time>1 hour ago</time>
        </span>
      </a>
      <a class="notification-item unread" href="invoices.html">
        <span class="notif-icon notif-invoice"><i class="bi bi-receipt"></i></span>
        <span class="notif-body">
          <h5>Payment Due</h5>
          <p>Invoice INV-2026-005 is due in 3 days.</p>
          <time>5 hours ago</time>
        </span>
      </a>
      <a class="notification-item" href="installation-tracking.html">
        <span class="notif-icon notif-install"><i class="bi bi-diagram-3"></i></span>
        <span class="notif-body">
          <h5>Installation Update</h5>
          <p>Phase 3 (Scene Calibration) has been scheduled for Oct 14.</p>
          <time>2 days ago</time>
        </span>
      </a>
    </div>
    <div class="notification-panel-footer">
      <a href="service-tickets.html">View all activity <i class="bi bi-arrow-right-short"></i></a>
    </div>`;
  anchor.appendChild(panel);

  const badge = btn.querySelector('.notification-badge');
  btn.setAttribute('aria-haspopup', 'true');
  btn.setAttribute('aria-expanded', 'false');

  const close = () => {
    panel.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  };

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = panel.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  panel.addEventListener('click', (e) => e.stopPropagation());

  document.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  panel.querySelectorAll('.notification-item').forEach(item => {
    item.addEventListener('click', () => item.classList.remove('unread'));
  });

  const markRead = panel.querySelector('.notification-mark-read');
  if (markRead) {
    markRead.addEventListener('click', () => {
      panel.querySelectorAll('.notification-item.unread').forEach(item => item.classList.remove('unread'));
      if (badge) badge.style.display = 'none';
      markRead.textContent = 'All caught up';
      markRead.disabled = true;
    });
  }
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

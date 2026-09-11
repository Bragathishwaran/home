/* ============================================
   NEXORA HOME - Smart Home Demo JavaScript
   ============================================ */

const smartHomeState = {
  lighting: {
    power: true,
    brightness: 68,
    scene: 'relax'
  },
  climate: {
    temperature: 22,
    mode: 'cooling',
    fan: 'auto'
  },
  security: {
    armed: true,
    doorLock: true,
    cameras: true,
    motion: true
  },
  curtains: {
    open: true,
    position: 75
  },
  energy: {
    current: 1.2,
    daily: 18.4,
    saved: 24
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initSmartHomeDemo();
});

function initSmartHomeDemo() {
  initLightingControls();
  initClimateControls();
  initSecurityControls();
  initCurtainControls();
  initDemoTabs();
  updatePreview();
}

/* --- Tab Switching --- */
function initDemoTabs() {
  document.querySelectorAll('.demo-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.demo-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(tab.dataset.panel);
      if (panel) panel.classList.add('active');
    });
  });
}

/* --- Lighting Controls --- */
function initLightingControls() {
  const powerToggle = document.getElementById('light-power');
  const brightnessSlider = document.getElementById('brightness-slider');
  const brightnessValue = document.getElementById('brightness-value');

  if (powerToggle) {
    powerToggle.addEventListener('click', () => {
      smartHomeState.lighting.power = !smartHomeState.lighting.power;
      powerToggle.classList.toggle('active', smartHomeState.lighting.power);
      updatePreview();
    });
  }

  if (brightnessSlider) {
    brightnessSlider.addEventListener('input', (e) => {
      smartHomeState.lighting.brightness = parseInt(e.target.value);
      if (brightnessValue) brightnessValue.textContent = e.target.value + '%';
      updatePreview();
    });
  }

  document.querySelectorAll('.scene-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.scene-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      smartHomeState.lighting.scene = btn.dataset.scene;

      const scenes = { relax: 40, movie: 20, party: 85, night: 10 };
      if (scenes[btn.dataset.scene] !== undefined) {
        smartHomeState.lighting.brightness = scenes[btn.dataset.scene];
        const slider = document.getElementById('brightness-slider');
        const value = document.getElementById('brightness-value');
        if (slider) slider.value = scenes[btn.dataset.scene];
        if (value) value.textContent = scenes[btn.dataset.scene] + '%';
      }
      updatePreview();
    });
  });
}

/* --- Climate Controls --- */
function initClimateControls() {
  const tempUp = document.getElementById('temp-up');
  const tempDown = document.getElementById('temp-down');
  const tempDisplay = document.getElementById('temp-display');

  if (tempUp) {
    tempUp.addEventListener('click', () => {
      if (smartHomeState.climate.temperature < 30) {
        smartHomeState.climate.temperature++;
        if (tempDisplay) tempDisplay.textContent = smartHomeState.climate.temperature + '°C';
        updatePreview();
      }
    });
  }

  if (tempDown) {
    tempDown.addEventListener('click', () => {
      if (smartHomeState.climate.temperature > 16) {
        smartHomeState.climate.temperature--;
        if (tempDisplay) tempDisplay.textContent = smartHomeState.climate.temperature + '°C';
        updatePreview();
      }
    });
  }

  document.querySelectorAll('.climate-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.climate-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      smartHomeState.climate.mode = btn.dataset.mode;
    });
  });
}

/* --- Security Controls --- */
function initSecurityControls() {
  const armedToggle = document.getElementById('security-armed');
  const doorToggle = document.getElementById('door-lock');
  const cameraToggle = document.getElementById('camera-status');
  const motionToggle = document.getElementById('motion-detect');

  if (armedToggle) {
    armedToggle.addEventListener('click', () => {
      smartHomeState.security.armed = !smartHomeState.security.armed;
      armedToggle.classList.toggle('active', smartHomeState.security.armed);
      updatePreview();
    });
  }

  if (doorToggle) {
    doorToggle.addEventListener('click', () => {
      smartHomeState.security.doorLock = !smartHomeState.security.doorLock;
      doorToggle.classList.toggle('active', smartHomeState.security.doorLock);
      updatePreview();
    });
  }

  if (cameraToggle) {
    cameraToggle.addEventListener('click', () => {
      smartHomeState.security.cameras = !smartHomeState.security.cameras;
      cameraToggle.classList.toggle('active', smartHomeState.security.cameras);
    });
  }

  if (motionToggle) {
    motionToggle.addEventListener('click', () => {
      smartHomeState.security.motion = !smartHomeState.security.motion;
      motionToggle.classList.toggle('active', smartHomeState.security.motion);
    });
  }
}

/* --- Curtain Controls --- */
function initCurtainControls() {
  const curtainSlider = document.getElementById('curtain-slider');
  const curtainValue = document.getElementById('curtain-value');
  const curtainOpen = document.getElementById('curtain-open');
  const curtainClose = document.getElementById('curtain-close');

  if (curtainSlider) {
    curtainSlider.addEventListener('input', (e) => {
      smartHomeState.curtains.position = parseInt(e.target.value);
      if (curtainValue) curtainValue.textContent = e.target.value + '%';
      smartHomeState.curtains.open = parseInt(e.target.value) > 0;
      updatePreview();
    });
  }

  if (curtainOpen) {
    curtainOpen.addEventListener('click', () => {
      smartHomeState.curtains.position = 100;
      smartHomeState.curtains.open = true;
      if (curtainSlider) curtainSlider.value = 100;
      if (curtainValue) curtainValue.textContent = '100%';
      updatePreview();
    });
  }

  if (curtainClose) {
    curtainClose.addEventListener('click', () => {
      smartHomeState.curtains.position = 0;
      smartHomeState.curtains.open = false;
      if (curtainSlider) curtainSlider.value = 0;
      if (curtainValue) curtainValue.textContent = '0%';
      updatePreview();
    });
  }
}

/* --- Update Preview --- */
function updatePreview() {
  const roomVisual = document.querySelector('.room-visual');
  if (!roomVisual) return;

  /* Update lighting visual */
  const lightOverlay = document.getElementById('light-overlay');
  if (lightOverlay) {
    const sceneTints = {
      relax: 'radial-gradient(ellipse at 30% 40%, rgba(255,214,140,0.55) 0%, rgba(255,190,100,0.18) 45%, transparent 72%)',
      movie: 'radial-gradient(ellipse at 30% 40%, rgba(110,150,255,0.5) 0%, rgba(70,100,230,0.16) 45%, transparent 72%)',
      party: 'radial-gradient(ellipse at 26% 34%, rgba(255,110,220,0.55) 0%, rgba(170,90,255,0.22) 42%, rgba(255,160,60,0.12) 66%, transparent 82%)',
      night: 'radial-gradient(ellipse at 30% 40%, rgba(255,185,115,0.4) 0%, rgba(255,160,90,0.1) 45%, transparent 72%)'
    };
    const tint = sceneTints[smartHomeState.lighting.scene] || sceneTints.relax;
    if (lightOverlay.dataset.tint !== smartHomeState.lighting.scene) {
      lightOverlay.style.background = tint;
      lightOverlay.dataset.tint = smartHomeState.lighting.scene;
    }
    const opacity = smartHomeState.lighting.power ? smartHomeState.lighting.brightness / 100 * 0.45 : 0;
    lightOverlay.style.opacity = opacity;
  }

  /* Update thermostat readout inside the preview */
  const thermoText = document.getElementById('room-thermostat-temp');
  if (thermoText) thermoText.textContent = smartHomeState.climate.temperature + '°';

  /* Update status bar */
  const lightStat = document.getElementById('stat-light');
  const tempStat = document.getElementById('stat-temp');
  const securityStat = document.getElementById('stat-security');
  const curtainStat = document.getElementById('stat-curtain');

  if (lightStat) {
    lightStat.innerHTML = `<i class="bi bi-lightbulb"></i> Lights: <strong>${smartHomeState.lighting.power ? smartHomeState.lighting.brightness + '%' : 'OFF'}</strong>`;
  }

  if (tempStat) {
    tempStat.innerHTML = `<i class="bi bi-thermometer-half"></i> Climate: <strong>${smartHomeState.climate.temperature}°C</strong>`;
  }

  if (securityStat) {
    const statusText = smartHomeState.security.armed ? 'Armed' : 'Disarmed';
    securityStat.innerHTML = `<i class="bi bi-shield-check"></i> Security: <strong>${statusText}</strong>`;
  }

  if (curtainStat) {
    curtainStat.innerHTML = `<i class="bi bi-window"></i> Curtains: <strong>${smartHomeState.curtains.position}%</strong>`;
  }

  /* Update floating cards on hero */
  const fcLights = document.getElementById('fc-lights');
  const fcTemp = document.getElementById('fc-temp');
  const fcSecurity = document.getElementById('fc-security');
  const fcEnergy = document.getElementById('fc-energy');

  if (fcLights) fcLights.textContent = smartHomeState.lighting.power ? smartHomeState.lighting.brightness + '%' : 'OFF';
  if (fcTemp) fcTemp.textContent = smartHomeState.climate.temperature + '°C';
  if (fcSecurity) fcSecurity.textContent = smartHomeState.security.armed ? 'Armed' : 'Off';
  if (fcEnergy) fcEnergy.textContent = smartHomeState.energy.saved + '%';
}

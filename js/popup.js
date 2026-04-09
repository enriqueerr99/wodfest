// WODFEST Salou 2026 — Launch Countdown Popup
(function () {

  const LAUNCH_DATE   = new Date('2026-04-01T00:00:00');
  const STORAGE_KEY   = 'wodfest_popup_closed';
  const RESHOW_HOURS  = 12; // show again after 12h if dismissed

  // ── Should we show the popup? ────────────────────────────────
  function shouldShow() {
    // Don't show if registrations already open
    if (new Date() >= LAUNCH_DATE) return false;

    const closedAt = localStorage.getItem(STORAGE_KEY);
    if (!closedAt) return true;

    const hoursAgo = (Date.now() - Number(closedAt)) / 1000 / 3600;
    return hoursAgo >= RESHOW_HOURS;
  }

  if (!shouldShow()) return;

  // ── Build HTML ───────────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.className = 'launch-overlay';
  overlay.id = 'launchOverlay';
  overlay.innerHTML = `
    <div class="launch-popup" id="launchPopup">
      <button class="launch-close" id="closePopup" aria-label="Cerrar">✕</button>

      <div class="popup-tag">
        <span class="dot"></span>
        Próximamente
      </div>

      <h2 class="popup-title">
        SE ABREN<br/>
        <span>LAS INSCRIPCIONES</span>
      </h2>
      <p class="popup-sub">29 de Marzo · 00:00h · Salou, Tarragona</p>

      <div class="popup-countdown">
        <div class="pc-item">
          <span class="pc-num" id="pc-days">00</span>
          <span class="pc-label">Días</span>
        </div>
        <div class="pc-sep">:</div>
        <div class="pc-item">
          <span class="pc-num" id="pc-hours">00</span>
          <span class="pc-label">Horas</span>
        </div>
        <div class="pc-sep">:</div>
        <div class="pc-item">
          <span class="pc-num" id="pc-mins">00</span>
          <span class="pc-label">Min</span>
        </div>
        <div class="pc-sep">:</div>
        <div class="pc-item">
          <span class="pc-num" id="pc-secs">00</span>
          <span class="pc-label">Seg</span>
        </div>
      </div>

      <p class="popup-cta-text">
        Las plazas son <strong>limitadas</strong>. El 29 de marzo a medianoche<br/>
        se activa el precio de <strong>lanzamiento 72h</strong> — el más bajo del año.
      </p>

      <div class="popup-actions">
        <a href="https://instagram.com/wodfestsalou" target="_blank" class="popup-btn-primary">
          📷 Síguenos para no perderte nada
        </a>
        <button class="popup-btn-ghost" id="closePopupGhost">
          Ya lo sé, cerrar
        </button>
      </div>

      <p class="popup-note">
        🗓 7 · 8 Noviembre 2026 &nbsp;·&nbsp; Mediterranean Sport Hub, Salou
      </p>
    </div>
  `;

  document.body.appendChild(overlay);

  // ── Countdown tick ───────────────────────────────────────────
  function tick() {
    const diff = LAUNCH_DATE - new Date();
    if (diff <= 0) {
      closePopup();
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);

    document.getElementById('pc-days').textContent  = String(d).padStart(2, '0');
    document.getElementById('pc-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('pc-mins').textContent  = String(m).padStart(2, '0');
    document.getElementById('pc-secs').textContent  = String(s).padStart(2, '0');
  }
  tick();
  const timer = setInterval(tick, 1000);

  // ── Close logic ──────────────────────────────────────────────
  function closePopup() {
    clearInterval(timer);
    overlay.classList.add('hiding');
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setTimeout(() => overlay.remove(), 400);
  }

  document.getElementById('closePopup').addEventListener('click', closePopup);
  document.getElementById('closePopupGhost').addEventListener('click', closePopup);

  // Close on overlay click (outside card)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePopup();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopup();
  });

  // ── Show popup after small delay (feels more natural) ────────
  // Already rendered, just let CSS animation play

})();

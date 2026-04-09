// WODFEST Cookie Consent Manager - RGPD Compliant
(function() {
  'use strict';

  const COOKIE_NAME = 'wodfest_cookie_consent';
  const COOKIE_DURATION = 365; // días

  // Configuración de tipos de cookies
  const cookieTypes = {
    necessary: {
      name: 'Cookies Necesarias',
      description: 'Estas cookies son esenciales para el funcionamiento básico del sitio web. No se pueden desactivar.',
      required: true,
      cookies: [
        { name: 'wodfest_cookie_consent', purpose: 'Guarda tus preferencias de cookies', duration: '1 año' },
        { name: 'wodfest_session', purpose: 'Mantiene la sesión del usuario', duration: 'Sesión' }
      ]
    },
    analytics: {
      name: 'Cookies Analíticas',
      description: 'Nos ayudan a entender cómo los visitantes interactúan con el sitio web, recopilando información de forma anónima.',
      required: false,
      cookies: [
        { name: '_ga', purpose: 'Google Analytics - Distingue usuarios únicos', duration: '2 años' },
        { name: '_gid', purpose: 'Google Analytics - Distingue usuarios', duration: '24 horas' }
      ]
    },
    marketing: {
      name: 'Cookies de Marketing',
      description: 'Se utilizan para rastrear visitantes en las webs con la intención de mostrar anuncios relevantes.',
      required: false,
      cookies: [
        { name: '_fbp', purpose: 'Facebook Pixel - Publicidad personalizada', duration: '90 días' },
        { name: 'IDE', purpose: 'Google Ads - Publicidad personalizada', duration: '1 año' }
      ]
    }
  };

  // Funciones de utilidad
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
  }

  // Obtener preferencias guardadas
  function getConsent() {
    const consent = getCookie(COOKIE_NAME);
    if (consent) {
      try {
        return JSON.parse(consent);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  // Guardar preferencias
  function saveConsent(preferences) {
    setCookie(COOKIE_NAME, JSON.stringify(preferences), COOKIE_DURATION);
    applyConsent(preferences);
  }

  // Aplicar las preferencias
  function applyConsent(preferences) {
    // Aquí aplicarías la lógica según las preferencias
    if (preferences.analytics) {
      // Inicializar Google Analytics
      loadGoogleAnalytics();
    }
    
    if (preferences.marketing) {
      // Inicializar Facebook Pixel, Google Ads, etc.
      loadMarketingScripts();
    }
    
    // Disparar evento para que otros scripts puedan reaccionar
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: preferences }));
  }

  // Cargar Google Analytics (ejemplo)
  function loadGoogleAnalytics() {
    if (window.GA_INITIALIZED) return;
    
    // Aquí iría el código de Google Analytics
    // Por ejemplo: gtag('config', 'GA_MEASUREMENT_ID');
    
    window.GA_INITIALIZED = true;
  }

  // Cargar scripts de marketing (ejemplo)
  function loadMarketingScripts() {
    if (window.MARKETING_INITIALIZED) return;
    
    // Aquí irían los scripts de marketing
    // Facebook Pixel, Google Ads, etc.
    
    window.MARKETING_INITIALIZED = true;
  }

  // Crear el HTML del banner
  function createBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-banner-content">
        <div class="cookie-text">
          <h3>🍪 Configuración de Cookies</h3>
          <p>Utilizamos cookies propias y de terceros para mejorar nuestros servicios y mostrarle publicidad relacionada con sus preferencias mediante el análisis de sus hábitos de navegación. Si continúa navegando, consideramos que acepta su uso.</p>
          <a href="legal.html#cookies" target="_blank" class="cookie-link">Más información</a>
        </div>
        <div class="cookie-actions">
          <button id="cookieReject" class="cookie-btn cookie-btn-ghost">Rechazar todas</button>
          <button id="cookieSettings" class="cookie-btn cookie-btn-ghost">Configurar</button>
          <button id="cookieAccept" class="cookie-btn cookie-btn-primary">Aceptar todas</button>
        </div>
      </div>
    `;
    return banner;
  }

  // Crear el modal de configuración
  function createSettingsModal() {
    const modal = document.createElement('div');
    modal.id = 'cookieModal';
    modal.className = 'cookie-modal';
    modal.innerHTML = `
      <div class="cookie-modal-content">
        <div class="cookie-modal-header">
          <h2>Configuración de Cookies</h2>
          <button id="cookieModalClose" class="cookie-modal-close">✕</button>
        </div>
        <div class="cookie-modal-body">
          <p>Utilizamos cookies para mejorar tu experiencia. Puedes aceptar todas las cookies o configurar tus preferencias.</p>
          
          <div class="cookie-categories">
            ${Object.entries(cookieTypes).map(([key, type]) => `
              <div class="cookie-category">
                <div class="cookie-category-header">
                  <label class="cookie-switch">
                    <input type="checkbox" id="cookie-${key}" ${type.required ? 'checked disabled' : ''} />
                    <span class="cookie-slider ${type.required ? 'disabled' : ''}"></span>
                  </label>
                  <div class="cookie-category-info">
                    <h4>${type.name}</h4>
                    <p>${type.description}</p>
                  </div>
                </div>
                <div class="cookie-category-details">
                  <button class="cookie-toggle" data-category="${key}">Ver detalles</button>
                  <div class="cookie-list" id="list-${key}" style="display: none;">
                    ${type.cookies.map(cookie => `
                      <div class="cookie-item">
                        <strong>${cookie.name}</strong>: ${cookie.purpose} (${cookie.duration})
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="cookie-modal-footer">
          <button id="cookieSaveSettings" class="cookie-btn cookie-btn-primary">Guardar preferencias</button>
          <button id="cookieAcceptAll" class="cookie-btn cookie-btn-ghost">Aceptar todas</button>
        </div>
      </div>
    `;
    return modal;
  }

  // Insertar estilos
  function insertStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Cookie Banner */
      .cookie-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(10, 10, 10, 0.98);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        z-index: 9999;
        transform: translateY(100%);
        transition: transform 0.3s ease;
        padding: 20px 0;
      }
      
      .cookie-banner.show {
        transform: translateY(0);
      }
      
      .cookie-banner-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        display: flex;
        align-items: center;
        gap: 40px;
      }
      
      .cookie-text {
        flex: 1;
      }
      
      .cookie-text h3 {
        font-size: 1.2rem;
        margin-bottom: 8px;
        color: var(--text-primary);
      }
      
      .cookie-text p {
        font-size: 0.95rem;
        color: var(--text-secondary);
        line-height: 1.5;
        margin-bottom: 8px;
      }
      
      .cookie-link {
        color: var(--primary);
        text-decoration: none;
        font-size: 0.9rem;
      }
      
      .cookie-link:hover {
        text-decoration: underline;
      }
      
      .cookie-actions {
        display: flex;
        gap: 12px;
      }
      
      .cookie-btn {
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        font-size: 0.95rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
      }
      
      .cookie-btn-primary {
        background: var(--primary);
        color: white;
      }
      
      .cookie-btn-primary:hover {
        background: var(--primary-dark);
      }
      
      .cookie-btn-ghost {
        background: transparent;
        color: var(--text-primary);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .cookie-btn-ghost:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.3);
      }
      
      /* Cookie Modal */
      .cookie-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        z-index: 10000;
        align-items: center;
        justify-content: center;
      }
      
      .cookie-modal.show {
        display: flex;
      }
      
      .cookie-modal-content {
        background: var(--bg-card);
        border-radius: 12px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      
      .cookie-modal-header {
        padding: 24px 24px 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .cookie-modal-header h2 {
        font-size: 1.5rem;
        color: var(--text-primary);
      }
      
      .cookie-modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--text-secondary);
        cursor: pointer;
        padding: 4px 8px;
      }
      
      .cookie-modal-body {
        padding: 24px;
        overflow-y: auto;
        flex: 1;
      }
      
      .cookie-modal-body > p {
        color: var(--text-secondary);
        margin-bottom: 24px;
        line-height: 1.5;
      }
      
      .cookie-category {
        margin-bottom: 20px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 8px;
      }
      
      .cookie-category-header {
        display: flex;
        gap: 16px;
        align-items: flex-start;
      }
      
      .cookie-category-info h4 {
        color: var(--text-primary);
        margin-bottom: 6px;
      }
      
      .cookie-category-info p {
        color: var(--text-secondary);
        font-size: 0.9rem;
        line-height: 1.4;
      }
      
      .cookie-toggle {
        background: none;
        border: none;
        color: var(--primary);
        font-size: 0.85rem;
        cursor: pointer;
        margin-top: 10px;
        padding: 0;
      }
      
      .cookie-list {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
      }
      
      .cookie-item {
        font-size: 0.85rem;
        color: var(--text-secondary);
        margin-bottom: 6px;
      }
      
      /* Switch */
      .cookie-switch {
        position: relative;
        display: inline-block;
        width: 48px;
        height: 24px;
      }
      
      .cookie-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      
      .cookie-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.2);
        transition: .3s;
        border-radius: 24px;
      }
      
      .cookie-slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: .3s;
        border-radius: 50%;
      }
      
      .cookie-switch input:checked + .cookie-slider {
        background-color: var(--primary);
      }
      
      .cookie-switch input:checked + .cookie-slider:before {
        transform: translateX(24px);
      }
      
      .cookie-slider.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .cookie-modal-footer {
        padding: 16px 24px 24px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        gap: 12px;
        justify-content: flex-end;
      }
      
      /* Responsive */
      @media (max-width: 768px) {
        .cookie-banner-content {
          flex-direction: column;
          gap: 20px;
          text-align: center;
        }
        
        .cookie-actions {
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .cookie-modal-content {
          width: 95%;
          max-height: 90vh;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Inicializar
  function init() {
    insertStyles();

    const consent = getConsent();
    
    if (!consent) {
      // Mostrar banner si no hay consentimiento previo
      const banner = createBanner();
      document.body.appendChild(banner);
      
      setTimeout(() => {
        banner.classList.add('show');
      }, 500);
      
      // Event listeners para el banner
      document.getElementById('cookieAccept').addEventListener('click', () => {
        saveConsent({ necessary: true, analytics: true, marketing: true });
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 300);
      });
      
      document.getElementById('cookieReject').addEventListener('click', () => {
        saveConsent({ necessary: true, analytics: false, marketing: false });
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 300);
      });
      
      document.getElementById('cookieSettings').addEventListener('click', () => {
        showSettingsModal();
      });
    } else {
      // Aplicar consentimiento guardado
      applyConsent(consent);
    }
  }

  // Mostrar modal de configuración
  function showSettingsModal() {
    let modal = document.getElementById('cookieModal');
    if (!modal) {
      modal = createSettingsModal();
      document.body.appendChild(modal);
      
      // Event listeners para el modal
      document.getElementById('cookieModalClose').addEventListener('click', () => {
        modal.classList.remove('show');
      });
      
      document.getElementById('cookieAcceptAll').addEventListener('click', () => {
        saveConsent({ necessary: true, analytics: true, marketing: true });
        modal.classList.remove('show');
        document.getElementById('cookieBanner')?.classList.remove('show');
        setTimeout(() => document.getElementById('cookieBanner')?.remove(), 300);
      });
      
      document.getElementById('cookieSaveSettings').addEventListener('click', () => {
        const preferences = {
          necessary: true,
          analytics: document.getElementById('cookie-analytics').checked,
          marketing: document.getElementById('cookie-marketing').checked
        };
        saveConsent(preferences);
        modal.classList.remove('show');
        document.getElementById('cookieBanner')?.classList.remove('show');
        setTimeout(() => document.getElementById('cookieBanner')?.remove(), 300);
      });
      
      // Toggles para detalles
      document.querySelectorAll('.cookie-toggle').forEach(button => {
        button.addEventListener('click', () => {
          const category = button.dataset.category;
          const list = document.getElementById(`list-${category}`);
          const isVisible = list.style.display !== 'none';
          list.style.display = isVisible ? 'none' : 'block';
          button.textContent = isVisible ? 'Ver detalles' : 'Ocultar detalles';
        });
      });
      
      // Click fuera para cerrar
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('show');
        }
      });
    }
    
    // Cargar preferencias actuales
    const consent = getConsent();
    if (consent) {
      document.getElementById('cookie-analytics').checked = consent.analytics;
      document.getElementById('cookie-marketing').checked = consent.marketing;
    }
    
    modal.classList.add('show');
  }

  // Función pública para abrir configuración
  window.openCookieSettings = showSettingsModal;

  // Iniciar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
// WODFEST Salou 2026 - Upsell Modal Pack Multimedia

// Variable global para el estado del upsell
let upsellAccepted = false;

// Función para crear el modal de upsell
function createUpsellModal() {
  const modal = document.createElement('div');
  modal.id = 'upsellModal';
  modal.className = 'upsell-modal';
  modal.innerHTML = `
    <div class="upsell-modal-content">
      <!-- Cerrar X -->
      <button class="upsell-close" onclick="declineUpsell()">✕</button>
      
      <!-- Header con badge -->
      <div class="upsell-header">
        <span class="upsell-badge">⚡ OFERTA EXCLUSIVA</span>
        <h2>¡Captura cada momento épico!</h2>
        <p class="upsell-subtitle">Pack Multimedia Premium para tu equipo</p>
      </div>

      <!-- Visual del producto -->
      <div class="upsell-visual">
        <div class="upsell-gallery">
          <div class="gallery-item main">
            <div class="gallery-icon">📸</div>
            <h3>+500 Fotos HD</h3>
            <p>Profesionales siguiendo cada WOD</p>
          </div>
          <div class="gallery-item">
            <div class="gallery-icon">🎬</div>
            <h3>Aftermovie Exclusivo</h3>
            <p>4-6 min con tus mejores momentos</p>
          </div>
          <div class="gallery-item">
            <div class="gallery-icon">☁️</div>
            <h3>Descarga Digital</h3>
            <p>Galería privada online</p>
          </div>
          <div class="gallery-item">
            <div class="gallery-icon">⏱️</div>
            <h3>Entrega en 15 días</h3>
            <p>Listo para compartir</p>
          </div>
        </div>
      </div>

      <!-- Features -->
      <div class="upsell-features">
        <h4>Tu pack incluye:</h4>
        <ul>
          <li>✅ <strong>Fotógrafo dedicado</strong> siguiendo a tu equipo durante toda la competición</li>
          <li>✅ <strong>+500 fotos profesionales</strong> en alta resolución sin marca de agua</li>
          <li>✅ <strong>Aftermovie personalizado</strong> (4-6 minutos) con música épica</li>
          <li>✅ <strong>Galería online privada</strong> con descarga ilimitada</li>
          <li>✅ <strong>Momentos clave capturados:</strong> calentamiento, WODs, celebraciones</li>
          <li>✅ <strong>Ángulos exclusivos</strong> desde dentro del área de competición</li>
        </ul>
      </div>

      <!-- Pricing -->
      <div class="upsell-pricing">
        <div class="price-box">
          <div class="price-original">
            <span class="price-label">Precio después del evento</span>
            <span class="price-strike">120€</span>
          </div>
          <div class="price-special">
            <span class="price-label">Precio especial HOY</span>
            <span class="price-final">79€</span>
            <span class="price-save">Ahorras 41€</span>
          </div>
        </div>
        <div class="price-note">
          <p>⚠️ Esta oferta solo está disponible durante el proceso de inscripción</p>
        </div>
      </div>

      <!-- Social proof -->
      <div class="upsell-social">
        <div class="testimonial">
          <p>"Las fotos y el vídeo son increíbles, capturaron perfectamente la emoción del evento. ¡El mejor recuerdo!"</p>
          <cite>- Team CrossFury, WODFEST 2025</cite>
        </div>
      </div>

      <!-- CTAs -->
      <div class="upsell-actions">
        <button class="btn-upsell-accept" onclick="acceptUpsell()">
          <span class="btn-icon">🎬</span>
          Sí, quiero el Pack Multimedia (+79€)
        </button>
        <button class="btn-upsell-decline" onclick="declineUpsell()">
          No gracias, continuar sin pack
        </button>
      </div>

      <!-- Garantía -->
      <div class="upsell-guarantee">
        <p>💯 Garantía de satisfacción: Si no quedas 100% satisfecho, te devolvemos el dinero</p>
      </div>
    </div>
  `;
  return modal;
}

// Definir las funciones globalmente
window.showUpsellModal = function() {
  let modal = document.getElementById('upsellModal');
  if (!modal) {
    modal = createUpsellModal();
    document.body.appendChild(modal);
  }
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  
  // Track que se mostró el upsell
  if (typeof gtag !== 'undefined') {
    gtag('event', 'view_upsell', {
      'event_category': 'Ecommerce',
      'event_label': 'Pack Multimedia'
    });
  }
};

window.acceptUpsell = function() {
  upsellAccepted = true;
  
  // Guardar en localStorage
  localStorage.setItem('wodfest_pack_multimedia', 'true');
  
  // Actualizar el resumen con el pack multimedia
  const summaryContainer = document.querySelector('.payment-summary .summary-content');
  if (summaryContainer) {
    // Remover pack anterior si existe
    const existingPack = summaryContainer.querySelector('.pack-multimedia');
    if (existingPack) existingPack.remove();
    
    // Insertar antes del total
    const totalRow = summaryContainer.querySelector('.summary-row.total');
    const packRow = document.createElement('div');
    packRow.className = 'summary-row pack-multimedia';
    packRow.innerHTML = `
      <span>Pack Multimedia Premium</span>
      <span class="summary-price">79€</span>
    `;
    summaryContainer.insertBefore(packRow, totalRow);
    
    // Actualizar el total y llamar a updatePriceSummary si existe
    if (typeof updatePriceSummary === 'function') {
      updatePriceSummary();
    } else {
      const totalPrice = document.querySelector('.summary-row.total .summary-price');
      if (totalPrice) {
        const basePrice = parseInt(document.querySelector('input[name="category"]:checked')?.dataset.price || 0);
        totalPrice.textContent = (basePrice + 79) + '€';
      }
    }
  }
  
  // Añadir indicador visual
  const indicator = document.createElement('div');
  indicator.className = 'pack-added-indicator';
  indicator.innerHTML = '✅ Pack Multimedia añadido a tu pedido';
  indicator.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #22c55e;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
    animation: slideInRight 0.5s ease;
    z-index: 1000;
  `;
  document.body.appendChild(indicator);
  
  setTimeout(() => {
    indicator.style.animation = 'slideOutRight 0.5s ease';
    setTimeout(() => indicator.remove(), 500);
  }, 3000);
  
  closeUpsellModal();
  
  // Track conversión
  if (typeof gtag !== 'undefined') {
    gtag('event', 'add_to_cart', {
      'currency': 'EUR',
      'value': 79,
      'items': [{
        'item_id': 'pack-multimedia',
        'item_name': 'Pack Multimedia Premium',
        'price': 79,
        'quantity': 1
      }]
    });
  }
  
  // Continuar con la acción del formulario
  if (window.pendingFormAction) {
    setTimeout(() => {
      window.pendingFormAction();
    }, 100);
  }
};

window.declineUpsell = function() {
  upsellAccepted = false;
  localStorage.removeItem('wodfest_pack_multimedia');
  
  // Remover el pack del resumen si existe
  const packRow = document.querySelector('.summary-row.pack-multimedia');
  if (packRow) {
    packRow.remove();
  }
  
  // Actualizar precios
  if (typeof updatePriceSummary === 'function') {
    updatePriceSummary();
  }
  
  closeUpsellModal();
  
  // Track rechazo
  if (typeof gtag !== 'undefined') {
    gtag('event', 'decline_upsell', {
      'event_category': 'Ecommerce',
      'event_label': 'Pack Multimedia'
    });
  }
  
  // Continuar con la acción del formulario
  if (window.pendingFormAction) {
    setTimeout(() => {
      window.pendingFormAction();
    }, 100);
  }
};



// Función para cerrar el modal
function closeUpsellModal() {
  const modal = document.getElementById('upsellModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// Hacer la función disponible globalmente
window.closeUpsellModal = closeUpsellModal;

// Getter para saber si se aceptó el upsell
window.isUpsellAccepted = function() {
  return upsellAccepted;
};

document.addEventListener('DOMContentLoaded', () => {

  // Estilos CSS para el modal
  function insertUpsellStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .upsell-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.95);
        z-index: 10002;
        align-items: center;
        justify-content: center;
        padding: 20px;
        overflow-y: auto;
        animation: fadeIn 0.3s ease;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .upsell-modal.show {
        display: flex;
      }
      
      .upsell-modal-content {
        background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
        border-radius: 20px;
        max-width: 900px;
        width: 100%;
        position: relative;
        box-shadow: 0 30px 90px rgba(0, 0, 0, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.1);
        animation: slideUp 0.4s ease;
        overflow: hidden;
      }
      
      @keyframes slideUp {
        from { 
          opacity: 0;
          transform: translateY(50px);
        }
        to { 
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .upsell-close {
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #fff;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.2s ease;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .upsell-close:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
      }
      
      /* Header */
      .upsell-header {
        text-align: center;
        padding: 40px 20px 30px;
        background: rgba(33, 150, 243, 0.05);
        border-bottom: 1px solid rgba(33, 150, 243, 0.2);
      }
      
      .upsell-badge {
        display: inline-block;
        background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
        color: #1a1a1a;
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 700;
        margin-bottom: 16px;
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      .upsell-header h2 {
        font-family: var(--font-display);
        font-size: 2.5rem;
        color: #fff;
        margin: 0 0 8px 0;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .upsell-subtitle {
        color: var(--gray-light);
        font-size: 1.25rem;
        margin: 0;
      }
      
      /* Visual Gallery */
      .upsell-visual {
        padding: 40px 30px;
      }
      
      .upsell-gallery {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 30px;
      }
      
      .gallery-item {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        padding: 25px;
        border-radius: 12px;
        text-align: center;
        transition: all 0.3s ease;
      }
      
      .gallery-item.main {
        grid-column: 1 / -1;
        background: rgba(33, 150, 243, 0.1);
        border-color: rgba(33, 150, 243, 0.3);
      }
      
      .gallery-item:hover {
        transform: translateY(-5px);
        border-color: rgba(33, 150, 243, 0.4);
        background: rgba(33, 150, 243, 0.08);
      }
      
      .gallery-icon {
        font-size: 3rem;
        margin-bottom: 15px;
      }
      
      .gallery-item h3 {
        color: #fff;
        font-size: 1.25rem;
        margin: 0 0 8px 0;
        font-weight: 600;
      }
      
      .gallery-item p {
        color: var(--gray-light);
        font-size: 0.9rem;
        margin: 0;
      }
      
      /* Features */
      .upsell-features {
        padding: 0 40px;
      }
      
      .upsell-features h4 {
        color: #fff;
        font-size: 1.3rem;
        margin-bottom: 20px;
        font-weight: 600;
      }
      
      .upsell-features ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      .upsell-features li {
        color: var(--gray-light);
        padding: 10px 0;
        padding-left: 30px;
        position: relative;
        font-size: 1rem;
        line-height: 1.6;
      }
      
      .upsell-features li:before {
        content: "✅";
        position: absolute;
        left: 0;
        top: 10px;
      }
      
      /* Pricing */
      .upsell-pricing {
        padding: 40px;
        background: rgba(255, 255, 255, 0.02);
        margin: 30px 0;
      }
      
      .price-box {
        display: flex;
        justify-content: center;
        gap: 40px;
        margin-bottom: 20px;
      }
      
      .price-original, .price-special {
        text-align: center;
      }
      
      .price-label {
        display: block;
        font-size: 0.875rem;
        color: var(--gray);
        margin-bottom: 5px;
      }
      
      .price-strike {
        font-size: 1.5rem;
        color: #666;
        text-decoration: line-through;
        opacity: 0.6;
      }
      
      .price-final {
        font-size: 3.5rem;
        font-weight: 700;
        color: #ffd700;
        font-family: var(--font-display);
        line-height: 1;
      }
      
      .price-save {
        display: inline-block;
        background: #22c55e;
        color: #fff;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
        margin-top: 8px;
      }
      
      .price-note {
        text-align: center;
      }
      
      .price-note p {
        color: #ff6b6b;
        font-size: 0.9rem;
        margin: 0;
      }
      
      /* Social Proof */
      .upsell-social {
        padding: 0 40px;
        margin-bottom: 30px;
      }
      
      .testimonial {
        background: rgba(255, 255, 255, 0.03);
        border-left: 3px solid var(--blue-light);
        padding: 20px;
        border-radius: 8px;
      }
      
      .testimonial p {
        color: var(--gray-light);
        font-style: italic;
        font-size: 1.05rem;
        margin: 0 0 10px 0;
      }
      
      .testimonial cite {
        color: var(--gray);
        font-size: 0.9rem;
        font-style: normal;
      }
      
      /* Actions */
      .upsell-actions {
        padding: 0 40px 30px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .btn-upsell-accept {
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        color: white;
        border: none;
        padding: 20px 32px;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
        position: relative;
        overflow: hidden;
      }
      
      .btn-upsell-accept:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4);
      }
      
      .btn-icon {
        font-size: 1.3rem;
        margin-right: 8px;
      }
      
      .btn-upsell-decline {
        background: transparent;
        color: var(--gray);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 14px 24px;
        font-size: 0.95rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      
      .btn-upsell-decline:hover {
        background: rgba(255, 255, 255, 0.05);
        color: #fff;
      }
      
      /* Guarantee */
      .upsell-guarantee {
        background: rgba(34, 197, 94, 0.1);
        padding: 15px 20px;
        text-align: center;
        border-top: 1px solid rgba(34, 197, 94, 0.2);
      }
      
      .upsell-guarantee p {
        color: #22c55e;
        font-size: 0.9rem;
        margin: 0;
        font-weight: 500;
      }
      
      /* Responsive */
      @media (max-width: 768px) {
        .upsell-modal-content {
          margin: 20px;
        }
        
        .upsell-header h2 {
          font-size: 1.8rem;
        }
        
        .upsell-gallery {
          grid-template-columns: 1fr;
        }
        
        .price-box {
          flex-direction: column;
          gap: 20px;
        }
        
        .upsell-features, .upsell-social, .upsell-actions {
          padding: 0 20px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Las funciones ya están definidas globalmente arriba

  // Insertar animaciones adicionales
  const animations = document.createElement('style');
  animations.textContent = `
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideOutRight {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(100px);
      }
    }
  `;
  document.head.appendChild(animations);

  // Inicializar
  insertUpsellStyles();

});
// Popup WODFEST Night
document.addEventListener('DOMContentLoaded', function() {
  // Crear el popup HTML
  const popupHTML = `
    <div id="wodfest-night-popup" class="popup-overlay" style="display: none;">
      <div class="popup-content wodfest-night-modal">
        <button class="popup-close" aria-label="Cerrar">&times;</button>
        <div class="popup-body">
          <h2 class="popup-title">🎉 WODFEST Night</h2>
          <h3 class="popup-subtitle">Solo para atletas alojados</h3>
          <p class="popup-text">
            Recuerda: el acceso a la WODFEST Night — la fiesta oficial del evento con DJs en directo — 
            es <strong>EXCLUSIVO</strong> para equipos inscritos con alojamiento. 
            No se venderán entradas sueltas ni habrá acceso al público general.
          </p>
          <div class="popup-badge">Solo Competición + Alojamiento</div>
          <div class="popup-buttons">
            <a href="inscripcion.html" class="btn btn-primary btn-full">Inscribirme con Alojamiento →</a>
            <a href="inscripcion.html" class="btn btn-ghost btn-full">Solo Competición</a>
          </div>
        </div>
      </div>
    </div>
  `;

  // Insertar el popup en el body
  document.body.insertAdjacentHTML('beforeend', popupHTML);

  const popup = document.getElementById('wodfest-night-popup');
  const popupContent = popup.querySelector('.popup-content');
  const closeBtn = popup.querySelector('.popup-close');
  let hasShownPopup = sessionStorage.getItem('wodfestNightPopupShown');

  // Función para mostrar el popup
  function showPopup() {
    console.log('Showing WODFEST Night popup');
    
    if (!popup) {
      console.error('Popup element not found!');
      return;
    }
    
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Animación de entrada
    setTimeout(() => {
      popup.classList.add('active');
    }, 10);
  }

  // Función para cerrar el popup
  function closePopup() {
    popup.classList.remove('active');
    
    setTimeout(() => {
      popup.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  // Cerrar con el botón X
  closeBtn.addEventListener('click', closePopup);

  // Cerrar haciendo clic fuera
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      closePopup();
    }
  });

  // Interceptar clics en enlaces de inscripción
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href*="inscripcion.html"], a[href*="inscribirse"]');
    
    if (link) {
      console.log('Inscription link clicked, hasShownPopup:', hasShownPopup);
      
      if (!hasShownPopup) {
        e.preventDefault();
        e.stopPropagation();
        showPopup();
        sessionStorage.setItem('wodfestNightPopupShown', 'true');
        hasShownPopup = true;
      }
    }
  });
  
  // Para testing: resetear con Ctrl+Shift+R
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'R') {
      sessionStorage.removeItem('wodfestNightPopupShown');
      console.log('WODFEST Night popup reset');
    }
  });
  
  // Debug para verificar que el script carga
  console.log('WODFEST Night popup script loaded');
  
  // Verificar que el popup se creó correctamente
  setTimeout(() => {
    const popupCheck = document.getElementById('wodfest-night-popup');
    if (popupCheck) {
      console.log('✅ WODFEST Night popup HTML created successfully');
    } else {
      console.error('❌ WODFEST Night popup HTML not found in DOM');
    }
  }, 100);
});
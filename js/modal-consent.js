// WODFEST Salou 2026 - Modal de Consentimiento

document.addEventListener('DOMContentLoaded', () => {
  
  // Crear el modal de consentimiento
  function createConsentModal() {
    const modal = document.createElement('div');
    modal.id = 'consentModal';
    modal.className = 'consent-modal';
    modal.innerHTML = `
      <div class="consent-modal-content">
        <div class="consent-modal-header">
          <h2>Documento de Exoneración de Responsabilidad</h2>
          <button class="consent-modal-close" onclick="closeConsentModal()">✕</button>
        </div>
        <div class="consent-modal-body">
          <div class="consent-document">
            <div class="consent-header">
              <img src="assets/wodfest-logo.png" alt="WODFEST SALOU" style="height: 60px; margin-bottom: 20px;">
              <h3>WODFEST SALOU 2026</h3>
              <p><strong>ANDERSON OSPINA SAAVEDRA</strong><br>
              Joaquim Ruyra 3<br>
              Reus (Tarragona) 43206</p>
              
              <div class="event-info">
                <p><strong>Fechas celebración del evento:</strong> 07 y 08 de Noviembre<br>
                <strong>Localidad de celebración del evento:</strong> SALOU</p>
              </div>
            </div>

            <div class="consent-section">
              <h4>1. Estado de Salud y Forma Física:</h4>
              <ul>
                <li>Certifico que me encuentro en una condición física y mental óptima para participar en la competición de manera segura, sin arriesgar mi salud ni la de otros participantes.</li>
                <li>Declaro no padecer enfermedades, lesiones o condiciones físicas (ej. problemas cardíacos, respiratorios, lesiones articulares) que puedan agravarse o ser causa de accidentes, lesiones o incluso el fallecimiento durante la realización del evento.</li>
                <li>Asumo la exclusiva responsabilidad de mi estado de salud y aptitud para el esfuerzo físico que conlleva la prueba.</li>
              </ul>
            </div>

            <div class="consent-section">
              <h4>2. Asunción de Riesgos:</h4>
              <ul>
                <li>Soy consciente de que la participación en esta actividad deportiva implica riesgos inherentes, incluidos, entre otros, caídas, colisiones, condiciones climáticas, fatiga extrema o condiciones del terreno.</li>
                <li>Acepto voluntariamente asumir todos estos riesgos, tanto conocidos como desconocidos, que puedan derivarse de mi participación.</li>
              </ul>
            </div>

            <div class="consent-section">
              <h4>3. Exoneración de Responsabilidad:</h4>
              <ul>
                <li>En consecuencia, eximo de toda responsabilidad a la organización, patrocinadores, colaboradores, personal voluntario, instituciones o entidades participantes, y propietarios del terreno/instalaciones de cualquier tipo de daño, pérdida, enfermedad, lesión (incluida la muerte) que pueda sufrir, ya sea antes, durante o después del evento.</li>
                <li>Renuncio expresamente a cualquier reclamación, acción judicial o administrativa, contractual o extracontractual, contra las personas o entidades mencionadas anteriormente por los motivos citados.</li>
              </ul>
            </div>

            <div class="consent-section">
              <h4>4. Autorización Médica:</h4>
              <ul>
                <li>En caso de accidente o emergencia, autorizo a la organización a tomar las medidas necesarias para mi seguridad, incluyendo la prestación de primeros auxilios o atención médica de emergencia por personal calificado.</li>
                <li>Acepto recibir, bajo mi propio coste, cualquier tratamiento médico en caso de ser necesario y libero a la organización de cualquier responsabilidad derivada de dicha asistencia.</li>
              </ul>
            </div>

            <div class="consent-section">
              <h4>5. Normativa:</h4>
              <ul>
                <li>Me comprometo a cumplir con el reglamento de la competición y a seguir las indicaciones de la organización y seguridad.</li>
              </ul>
            </div>

            <div class="consent-footer">
              <p class="consent-important">
                <strong>IMPORTANTE:</strong> He leído y comprendo la totalidad de este documento y lo acepto conscientemente de sus consecuencias legales.
              </p>
              <p class="consent-note">
                Al marcar la casilla de aceptación, confirmo que todos los miembros de mi equipo han leído y aceptan estos términos.
              </p>
            </div>
          </div>
        </div>
        <div class="consent-modal-footer">
          <button class="btn btn-ghost" onclick="printConsent()">📄 Imprimir/Descargar</button>
          <button class="btn btn-ghost" onclick="closeConsentModal()">Cerrar</button>
          <button class="btn btn-primary" onclick="acceptConsentFromModal()">He leído y acepto</button>
        </div>
      </div>
    `;
    return modal;
  }

  // Estilos CSS para el modal
  function insertConsentStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .consent-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10001;
        align-items: center;
        justify-content: center;
        padding: 20px;
        overflow-y: auto;
      }
      
      .consent-modal.show {
        display: flex;
      }
      
      .consent-modal-content {
        background: var(--dark2);
        border-radius: 12px;
        max-width: 800px;
        width: 100%;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      }
      
      .consent-modal-header {
        padding: 24px 24px 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .consent-modal-header h2 {
        font-size: 1.75rem;
        color: var(--white);
        margin: 0;
      }
      
      .consent-modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--gray);
        cursor: pointer;
        padding: 4px 8px;
        transition: color 0.2s ease;
      }
      
      .consent-modal-close:hover {
        color: var(--white);
      }
      
      .consent-modal-body {
        flex: 1;
        overflow-y: auto;
        padding: 0;
      }
      
      .consent-document {
        padding: 32px;
        color: var(--gray-light);
        line-height: 1.7;
      }
      
      .consent-header {
        text-align: center;
        margin-bottom: 40px;
        padding-bottom: 30px;
        border-bottom: 2px solid rgba(255, 255, 255, 0.1);
      }
      
      .consent-header h3 {
        font-family: var(--font-display);
        font-size: 2rem;
        color: var(--blue-light);
        margin: 0 0 20px 0;
      }
      
      .consent-header p {
        margin: 10px 0;
      }
      
      .event-info {
        margin-top: 20px;
        padding: 20px;
        background: rgba(33, 150, 243, 0.1);
        border-radius: 8px;
        border: 1px solid rgba(33, 150, 243, 0.2);
      }
      
      .consent-section {
        margin-bottom: 32px;
      }
      
      .consent-section h4 {
        color: var(--white);
        font-size: 1.25rem;
        margin-bottom: 16px;
        font-weight: 600;
      }
      
      .consent-section ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      .consent-section li {
        position: relative;
        padding-left: 28px;
        margin-bottom: 12px;
      }
      
      .consent-section li:before {
        content: "•";
        position: absolute;
        left: 0;
        color: var(--blue-light);
        font-size: 1.5rem;
        line-height: 1.2;
      }
      
      .consent-footer {
        margin-top: 40px;
        padding-top: 30px;
        border-top: 2px solid rgba(255, 255, 255, 0.1);
      }
      
      .consent-important {
        background: rgba(255, 193, 7, 0.1);
        border: 1px solid rgba(255, 193, 7, 0.3);
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        font-size: 1.05rem;
        line-height: 1.6;
      }
      
      .consent-note {
        text-align: center;
        margin-top: 20px;
        font-size: 0.95rem;
        opacity: 0.8;
      }
      
      .consent-modal-footer {
        padding: 20px 24px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        gap: 12px;
        justify-content: flex-end;
      }
      
      /* Responsive */
      @media (max-width: 768px) {
        .consent-modal-content {
          max-height: 100vh;
          height: 100%;
          border-radius: 0;
        }
        
        .consent-document {
          padding: 20px;
        }
        
        .consent-header h3 {
          font-size: 1.5rem;
        }
        
        .consent-section h4 {
          font-size: 1.1rem;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Funciones globales
  window.openConsentModal = function() {
    let modal = document.getElementById('consentModal');
    if (!modal) {
      modal = createConsentModal();
      document.body.appendChild(modal);
    }
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  window.closeConsentModal = function() {
    const modal = document.getElementById('consentModal');
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  };

  window.acceptConsentFromModal = function() {
    // Marcar el checkbox
    const consentCheckbox = document.getElementById('acceptConsent');
    if (consentCheckbox) {
      consentCheckbox.checked = true;
      // Disparar evento change para actualizar cualquier validación
      const event = new Event('change', { bubbles: true });
      consentCheckbox.dispatchEvent(event);
    }
    
    // Guardar aceptación con timestamp
    const consentData = {
      accepted: true,
      timestamp: new Date().toISOString(),
      ip: 'captured-server-side', // Esto se debe capturar en el servidor
      userAgent: navigator.userAgent
    };
    
    // Guardar en localStorage temporalmente
    localStorage.setItem('wodfest_consent', JSON.stringify(consentData));
    
    // Cerrar modal
    closeConsentModal();
    
    // Mostrar confirmación visual
    const legalBlock = document.querySelector('.legal-block');
    if (legalBlock) {
      const confirmMsg = document.createElement('div');
      confirmMsg.className = 'consent-confirmed';
      confirmMsg.innerHTML = '✓ Documento aceptado';
      confirmMsg.style.cssText = 'color: #22c55e; font-size: 0.875rem; margin-top: 8px;';
      
      const existingMsg = legalBlock.querySelector('.consent-confirmed');
      if (existingMsg) existingMsg.remove();
      
      const consentLabel = consentCheckbox.closest('.checkbox-label');
      if (consentLabel) {
        consentLabel.parentNode.insertBefore(confirmMsg, consentLabel.nextSibling);
      }
    }
  };

  // Función para imprimir/descargar el documento
  window.printConsent = function() {
    const printWindow = window.open('', '_blank');
    const consentContent = document.querySelector('.consent-document').innerHTML;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Documento de Exoneración - WODFEST Salou 2026</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h3 { text-align: center; color: #333; }
          h4 { color: #444; margin-top: 30px; }
          ul { list-style: disc; padding-left: 30px; }
          li { margin-bottom: 10px; }
          .consent-header { text-align: center; margin-bottom: 30px; }
          .event-info { background: #f5f5f5; padding: 15px; margin: 20px 0; }
          .consent-important { background: #fff3cd; padding: 15px; margin: 20px 0; text-align: center; }
          .signature-line { margin-top: 50px; border-top: 1px solid #000; width: 300px; }
          .signature-section { margin-top: 60px; }
          @media print {
            body { margin: 0; }
            .signature-section { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        ${consentContent}
        <div class="signature-section">
          <p><strong>Datos del Participante:</strong></p>
          <p>Nombre y Apellidos: _________________________________________________</p>
          <p>DNI/Pasaporte: ______________________ Teléfono: _____________________</p>
          <p>Fecha de Nacimiento: ______________</p>
          <br>
          <p>Firma del Participante:</p>
          <div class="signature-line"></div>
          <p>Fecha: __________________</p>
        </div>
      </body>
      </html>
    `);
    
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  // Inicializar
  insertConsentStyles();

});
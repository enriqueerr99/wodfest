// WODFEST Salou 2026 — Inscripción Form Handler
// 
// IMPORTANTE: Actualizar WODBUSTER_URL con la URL correcta del evento
// cuando esté disponible en la plataforma Wodbuster

document.addEventListener('DOMContentLoaded', () => {
  
  // Esperar a que todos los scripts estén cargados
  window.addEventListener('load', () => {
    console.log('Scripts cargados, showUpsellModal disponible:', typeof showUpsellModal === 'function');
  });
  
  // Category card selection visual feedback
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      // Encontrar y marcar el radio button dentro de la tarjeta
      const radio = card.querySelector('input[name="category"]');
      if (radio) {
        radio.checked = true;
        // Disparar el evento change para actualizar el precio
        radio.dispatchEvent(new Event('change', { bubbles: true }));
      }
      
      // Actualizar clases visuales
      categoryCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });
  
  // Form elements
  const form = document.getElementById('registrationForm');
  const categoryInputs = document.querySelectorAll('input[name="category"]');
  const priceDisplay = document.querySelector('.summary-price');
  const totalDisplay = document.querySelector('.total .summary-price');
  
  // Ya no usamos Wodbuster - todo se procesa con Stripe
  // const WODBUSTER_URL = 'https://app.wodbuster.com/event/wodfest-salou-2026';
  
  // Update price display when category changes
  categoryInputs.forEach(input => {
    input.addEventListener('change', function() {
      updatePriceSummary();
      handleCompanionsSection();
    });
  });
  
  // Update summary on input changes
  form.addEventListener('input', updateSummaryDetails);
  
  // Pack Multimedia checkbox
  const packMultimediaCheckbox = document.getElementById('packMultimedia');
  if (packMultimediaCheckbox) {
    packMultimediaCheckbox.addEventListener('change', function() {
      updatePriceSummary();
    });
  }
  
  // Companions select
  const numCompanionsSelect = document.getElementById('numCompanions');
  if (numCompanionsSelect) {
    numCompanionsSelect.addEventListener('change', function() {
      generateCompanionsForms();
      updatePriceSummary();
    });
  }
  
  function updatePriceSummary() {
    const selectedCategory = document.querySelector('input[name="category"]:checked');
    const priceDisplay = document.querySelector('.summary-price');
    const totalDisplay = document.querySelector('.total .summary-price');
    const packMultimediaChecked = document.getElementById('packMultimedia')?.checked;
    const numCompanions = parseInt(document.getElementById('numCompanions')?.value || 0);
    
    if (selectedCategory) {
      const price = selectedCategory.dataset.price;
      const basePrice = parseInt(price);
      const multimediaPrice = packMultimediaChecked ? 60 : 0; // 60€ total por pack
      const companionsPrice = numCompanions * 140; // 140€ por acompañante
      const totalPrice = basePrice + multimediaPrice + companionsPrice;
      const priceText = `${totalPrice}€`;
      
      if (priceDisplay) priceDisplay.textContent = priceText;
      if (totalDisplay) {
        totalDisplay.textContent = priceText;
        
        // Animar el cambio de precio
        totalDisplay.classList.add('price-updating');
        setTimeout(() => {
          totalDisplay.classList.remove('price-updating');
        }, 300);
      }
      
      // Mostrar/ocultar línea de Pack Multimedia en el resumen
      const summaryContent = document.querySelector('.payment-summary .summary-content');
      const existingMultimediaRow = summaryContent?.querySelector('.summary-row.pack-multimedia');
      
      if (packMultimediaChecked && !existingMultimediaRow && summaryContent) {
        const totalRow = summaryContent.querySelector('.summary-row.total');
        const packRow = document.createElement('div');
        packRow.className = 'summary-row pack-multimedia';
        packRow.innerHTML = `
          <span>📸 Pack Multimedia</span>
          <span class="summary-price">60€</span>
        `;
        summaryContent.insertBefore(packRow, totalRow);
      } else if (!packMultimediaChecked && existingMultimediaRow) {
        existingMultimediaRow.remove();
      }
      
      // Mostrar/ocultar línea de acompañantes en el resumen
      const existingCompanionsRow = summaryContent?.querySelector('.summary-row.companions');
      
      if (numCompanions > 0 && !existingCompanionsRow && summaryContent) {
        const totalRow = summaryContent.querySelector('.summary-row.total');
        const companionsRow = document.createElement('div');
        companionsRow.className = 'summary-row companions';
        companionsRow.innerHTML = `
          <span>👥 ${numCompanions} acompañante${numCompanions > 1 ? 's' : ''}</span>
          <span class="summary-price">${numCompanions * 140}€</span>
        `;
        summaryContent.insertBefore(companionsRow, totalRow);
      } else if (numCompanions === 0 && existingCompanionsRow) {
        existingCompanionsRow.remove();
      } else if (existingCompanionsRow && numCompanions > 0) {
        // Actualizar la línea existente
        existingCompanionsRow.innerHTML = `
          <span>👥 ${numCompanions} acompañante${numCompanions > 1 ? 's' : ''}</span>
          <span class="summary-price">${numCompanions * 140}€</span>
        `;
      }
      
      // Update category name in summary
      const categoryName = selectedCategory.value === 'solo-competicion' ? 'Solo Competición' : 'Competición + Alojamiento';
      const summaryCategory = document.getElementById('summary-category');
      if (summaryCategory) summaryCategory.textContent = categoryName;
      
      // Update process info
      document.getElementById('process-info-default').style.display = 'none';
      document.getElementById('process-info-competition').style.display = 'none';
      document.getElementById('process-info-accommodation').style.display = 'none';
      
      if (selectedCategory.value === 'solo-competicion') {
        document.getElementById('process-info-competition').style.display = 'block';
      } else {
        document.getElementById('process-info-accommodation').style.display = 'block';
      }
    }
  }
  
  // Hacer la función global para que pueda ser llamada desde el modal
  window.updatePriceSummary = updatePriceSummary;
  
  // Función para manejar la sección de acompañantes
  function handleCompanionsSection() {
    const selectedCategory = document.querySelector('input[name="category"]:checked');
    const companionsSection = document.getElementById('companions-section');
    const companionsFormsSection = document.getElementById('companions-forms-section');
    
    if (selectedCategory && selectedCategory.value === 'competicion-alojamiento') {
      companionsSection.style.display = 'block';
    } else {
      companionsSection.style.display = 'none';
      companionsFormsSection.style.display = 'none';
      // Reset companions selection
      const numCompanionsSelect = document.getElementById('numCompanions');
      if (numCompanionsSelect) {
        numCompanionsSelect.value = '0';
        generateCompanionsForms();
      }
    }
  }
  
  // Función para generar formularios de acompañantes
  function generateCompanionsForms() {
    const numCompanions = parseInt(document.getElementById('numCompanions')?.value || 0);
    const container = document.getElementById('companions-forms-container');
    const formsSection = document.getElementById('companions-forms-section');
    
    if (!container) return;
    
    // Limpiar formularios existentes
    container.innerHTML = '';
    
    if (numCompanions === 0) {
      formsSection.style.display = 'none';
      return;
    }
    
    formsSection.style.display = 'block';
    
    // Generar formularios para cada acompañante
    for (let i = 1; i <= numCompanions; i++) {
      const companionForm = document.createElement('div');
      companionForm.className = 'companion-card';
      companionForm.innerHTML = `
        <div class="companion-header">
          <h3 class="companion-title">Acompañante ${i}</h3>
          <span class="companion-price">140€ (70€/noche)</span>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="companion${i}-name">Nombre y Apellidos <span class="required">*</span></label>
            <input type="text" id="companion${i}-name" name="companion${i}-name" class="form-input" placeholder="Juan García López" required />
          </div>
          <div class="form-group">
            <label for="companion${i}-email">Email <span class="required">*</span></label>
            <input type="email" id="companion${i}-email" name="companion${i}-email" class="form-input" placeholder="juan@email.com" required />
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="companion${i}-phone">Teléfono <span class="required">*</span></label>
            <input type="tel" id="companion${i}-phone" name="companion${i}-phone" class="form-input" placeholder="612 345 678" required />
          </div>
          <div class="form-group">
            <label for="companion${i}-dni">DNI / NIE / Pasaporte <span class="required">*</span></label>
            <input type="text" id="companion${i}-dni" name="companion${i}-dni" class="form-input" placeholder="12345678A" required />
          </div>
        </div>
      `;
      container.appendChild(companionForm);
    }
    
    // Re-aplicar el formateo de teléfonos a los nuevos inputs
    container.querySelectorAll('input[type="tel"]').forEach(input => {
      input.addEventListener('input', formatPhoneInput);
    });
  }
  
  // Función para formatear input de teléfono
  function formatPhoneInput(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 0) {
      if (value.length <= 3) {
        value = value;
      } else if (value.length <= 6) {
        value = `${value.slice(0, 3)} ${value.slice(3)}`;
      } else if (value.length <= 9) {
        value = `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`;
      } else {
        value = `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6, 9)}`;
      }
    }
    e.target.value = value;
  }
  
  function updateSummaryDetails() {
    // Update team name
    const teamName = document.getElementById('teamName').value;
    const summaryTeam = document.getElementById('summary-team');
    if (summaryTeam) summaryTeam.textContent = teamName || '-';
    
    // Update athlete names
    for (let i = 1; i <= 3; i++) {
      const name = document.getElementById(`athlete${i}-name`).value;
      const surname = document.getElementById(`athlete${i}-surname`).value;
      const fullName = name && surname ? `${name} ${surname}` : (name || '-');
      const summaryAthlete = document.getElementById(`summary-athlete${i}`);
      if (summaryAthlete) summaryAthlete.textContent = fullName;
    }
  }
  
  // Form validation
  function validateForm() {
    // Solo validar que haya un nombre de equipo
    const teamName = document.getElementById('teamName');
    if (!teamName || !teamName.value.trim()) {
      alert('Por favor, ingresa el nombre del equipo');
      return false;
    }
    return true;
  }
  
  // Remove error state on input
  form.addEventListener('input', (e) => {
    if (e.target.matches('.form-input, .form-select')) {
      e.target.closest('.form-group')?.classList.remove('error');
    }
  });
  
  // Variable para controlar si ya mostramos el upsell
  let upsellShown = false;

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Redirigir directamente a Stripe
    window.location.href = 'https://buy.stripe.com/9B66oH0m61Ti9yh10jefC00';
  });
  
  // Función para procesar el envío del formulario
  function processFormSubmission() {
    console.log('1. processFormSubmission iniciado');
    const selectedCategory = document.querySelector('input[name="category"]:checked');
    
    if (!selectedCategory) {
      alert('Por favor, selecciona una modalidad');
      return;
    }
    console.log('2. Categoría seleccionada:', selectedCategory.value);
    
    // Procesar pago con Stripe para ambas modalidades
    processStripeCheckout();
  }
  
  // Función para procesar el checkout con Stripe
  async function processStripeCheckout() {
    showLoading(true);
    
    try {
      // Recoger datos del formulario
      const selectedCategory = document.querySelector('input[name="category"]:checked');
      const teamName = document.getElementById('teamName').value;
      const packMultimedia = document.getElementById('packMultimedia')?.checked;
      const numCompanions = parseInt(document.getElementById('numCompanions')?.value || 0);
      // No buscar campos que no existen
      const athleteEmail = 'cliente@wodfest.com';
      const athleteName = 'Cliente WODFEST';
      
      // Guardar datos en localStorage para recuperar después del pago
      const formData = {
        teamName,
        category: selectedCategory.value,
        packMultimedia,
        numCompanions,
        athletes: [],
        companions: []
      };
      
      // Guardar datos de atletas
      for (let i = 1; i <= 3; i++) {
        formData.athletes.push({
          name: document.getElementById(`athlete${i}-name`).value,
          surname: document.getElementById(`athlete${i}-surname`).value,
          email: document.getElementById(`athlete${i}-email`)?.value || '',
          phone: document.getElementById(`athlete${i}-phone`)?.value || '',
          dni: document.getElementById(`athlete${i}-dni`).value,
          birthdate: document.getElementById(`athlete${i}-birthdate`)?.value || '',
          tshirt: document.getElementById(`athlete${i}-tshirt`)?.value || '',
          box: document.getElementById(`athlete${i}-box`)?.value || '',
          city: document.getElementById(`athlete${i}-city`).value
        });
      }
      
      // Guardar datos de acompañantes si los hay
      for (let i = 1; i <= numCompanions; i++) {
        formData.companions.push({
          name: document.getElementById(`companion${i}-name`).value,
          email: document.getElementById(`companion${i}-email`).value,
          phone: document.getElementById(`companion${i}-phone`).value,
          dni: document.getElementById(`companion${i}-dni`).value
        });
      }
      
      localStorage.setItem('wodfest_registration_data', JSON.stringify(formData));
      
      // Determinar el price ID correcto
      let priceKey = '';
      
      if (selectedCategory.value === 'solo-competicion') {
        priceKey = packMultimedia ? 'solo-pack' : 'solo';
      } else if (selectedCategory.value === 'competicion-alojamiento') {
        const totalPeople = 3 + numCompanions;
        priceKey = `alojamiento-${totalPeople}`;
        if (packMultimedia) priceKey += '-pack';
      }
      
      const STRIPE_URLS = {
        'solo': 'https://buy.stripe.com/9B66oH0m61Ti9yh10jefC00',
        'solo-pack': 'https://buy.stripe.com/fZu4gz3yidC06m58sLefC01',
        'alojamiento-3': 'https://buy.stripe.com/8x28wP5Gq1TidOxgZhefC02',
        'alojamiento-3-pack': 'https://buy.stripe.com/6oUeVd9WG8hG8uddN5efC03',
        'alojamiento-4': 'https://buy.stripe.com/bJeeVdb0K9lK8udbEXefC04',
        'alojamiento-4-pack': 'https://buy.stripe.com/4gM28r2ue55u11L38refC05',
        'alojamiento-5': 'https://buy.stripe.com/5kQ7sLb0K2XmdOxdN5efC06',
        'alojamiento-5-pack': 'https://buy.stripe.com/9B64gzfh08hG39TfVdefC07',
        'alojamiento-6': 'https://buy.stripe.com/5kQaEX1qabtSfWF38refC08',
        'alojamiento-6-pack': 'https://buy.stripe.com/28EbJ15Gq55u39T5gzefC09'
      };
      
      const checkoutUrl = STRIPE_URLS[priceKey];
      console.log('3. Price key:', priceKey);
      console.log('4. URL de checkout:', checkoutUrl);
      
      if (checkoutUrl) {
        // Guardar email en la URL si está disponible
        const url = new URL(checkoutUrl);
        if (athleteEmail) {
          url.searchParams.append('prefilled_email', athleteEmail);
        }
        
        // Mostrar mensaje antes de redirigir
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
          loadingOverlay.innerHTML = `
            <div style="text-align: center; color: white;">
              <div class="loading-spinner" style="margin: 0 auto 20px;"></div>
              <h3>Redirigiendo a Stripe...</h3>
              <p>Serás redirigido para completar el pago de forma segura.</p>
            </div>
          `;
        }
        
        // Redirigir
        setTimeout(() => {
          window.location.href = url.toString();
        }, 1500);
      } else {
        alert('Error: No se encontró el enlace de pago para esta configuración.');
        showLoading(false);
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la inscripción. Por favor, inténtalo de nuevo.');
      showLoading(false);
    }
  }
  
  /* FUNCIÓN DEPRECADA - Ya no se usa, todo se procesa a través de Stripe
  // Función para procesar alojamiento
  async function processAccommodation() {
    showLoading(true);
    
    // Recoger datos del formulario
    const consentData = localStorage.getItem('wodfest_consent');
    const packMultimedia = document.getElementById('packMultimedia')?.checked;
    const numCompanions = parseInt(document.getElementById('numCompanions')?.value || 0);
    
    // Recoger datos de acompañantes
    const companions = [];
    for (let i = 1; i <= numCompanions; i++) {
      companions.push({
        name: document.getElementById(`companion${i}-name`).value,
        email: document.getElementById(`companion${i}-email`).value,
        phone: document.getElementById(`companion${i}-phone`).value,
        dni: document.getElementById(`companion${i}-dni`).value
      });
    }
    
    const formData = {
      teamName: document.getElementById('teamName').value,
      category: 'competicion-alojamiento',
      packMultimedia: packMultimedia,
      numCompanions: numCompanions,
      companions: companions,
      consent: {
        accepted: true,
        timestamp: new Date().toISOString(),
        data: consentData ? JSON.parse(consentData) : null
      },
      members: [
        {
          name: document.getElementById('athlete1-name').value,
          surname: document.getElementById('athlete1-surname').value,
          email: document.getElementById('athlete1-email').value,
          phone: document.getElementById('athlete1-phone').value,
          dni: document.getElementById('athlete1-dni').value,
          birthdate: document.getElementById('athlete1-birthdate').value,
          tshirt: document.getElementById('athlete1-tshirt').value,
          box: document.getElementById('athlete1-box').value,
          city: document.getElementById('athlete1-city').value
        },
        {
          name: document.getElementById('athlete2-name').value,
          surname: document.getElementById('athlete2-surname').value,
          email: document.getElementById('athlete2-email').value,
          phone: document.getElementById('athlete2-phone').value,
          dni: document.getElementById('athlete2-dni').value,
          birthdate: document.getElementById('athlete2-birthdate').value,
          tshirt: document.getElementById('athlete2-tshirt').value,
          box: document.getElementById('athlete2-box').value,
          city: document.getElementById('athlete2-city').value
        },
        {
          name: document.getElementById('athlete3-name').value,
          surname: document.getElementById('athlete3-surname').value,
          email: document.getElementById('athlete3-email').value,
          phone: document.getElementById('athlete3-phone').value,
          dni: document.getElementById('athlete3-dni').value,
          birthdate: document.getElementById('athlete3-birthdate').value,
          tshirt: document.getElementById('athlete3-tshirt').value,
          box: document.getElementById('athlete3-box').value,
          city: document.getElementById('athlete3-city').value
        }
      ]
    };
    
    try {
      // Enviar datos al servidor para procesar alojamiento
      const response = await fetch('/api/accommodation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Error al procesar la reserva');
      }
      
      // Guardar en localStorage para recuperar después si es necesario
      localStorage.setItem('wodfest_accommodation', JSON.stringify({
        ...formData,
        bookingId: data.bookingId
      }));
      
      // Guardar en sistema demo si está disponible
      if (typeof saveRegistrationToDemo === 'function') {
        const registrationData = {
          booking_id: data.bookingId,
          team_name: formData.teamName,
          category: formData.category,
          pack_multimedia: formData.packMultimedia,
          num_companions: formData.numCompanions,
          companions: JSON.stringify(formData.companions),
          total_amount: data.totalAmount,
          athlete1_name: formData.members[0].name,
          athlete1_surname: formData.members[0].surname,
          athlete1_email: formData.members[0].email,
          athlete1_phone: formData.members[0].phone,
          athlete1_dni: formData.members[0].dni,
          athlete1_birthdate: formData.members[0].birthdate,
          athlete1_tshirt: formData.members[0].tshirt,
          athlete1_box: formData.members[0].box,
          athlete1_city: formData.members[0].city,
          athlete2_name: formData.members[1].name,
          athlete2_surname: formData.members[1].surname,
          athlete2_email: formData.members[1].email,
          athlete2_phone: formData.members[1].phone,
          athlete2_dni: formData.members[1].dni,
          athlete2_birthdate: formData.members[1].birthdate,
          athlete2_tshirt: formData.members[1].tshirt,
          athlete2_box: formData.members[1].box,
          athlete2_city: formData.members[1].city,
          athlete3_name: formData.members[2].name,
          athlete3_surname: formData.members[2].surname,
          athlete3_email: formData.members[2].email,
          athlete3_phone: formData.members[2].phone,
          athlete3_dni: formData.members[2].dni,
          athlete3_birthdate: formData.members[2].birthdate,
          athlete3_tshirt: formData.members[2].tshirt,
          athlete3_box: formData.members[2].box,
          athlete3_city: formData.members[2].city,
          consent_accepted: formData.consent.accepted,
          consent_timestamp: formData.consent.timestamp
        };
        saveRegistrationToDemo(registrationData);
      }
      
      // Mostrar mensaje de confirmación
      const loadingOverlay = document.querySelector('.loading-overlay');
      if (loadingOverlay) {
        const packMultimedia = document.getElementById('packMultimedia')?.checked;
        const numCompanions = parseInt(document.getElementById('numCompanions')?.value || 0);
        loadingOverlay.innerHTML = `
          <div style="text-align: center; color: white; max-width: 500px;">
            <div style="font-size: 48px; margin-bottom: 20px;">✅</div>
            <h3>¡Reserva confirmada!</h3>
            <div style="text-align: left; background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong>✓ Alojamiento:</strong> Resort Cambrils ★★★★</p>
              ${numCompanions > 0 ? `<p style="margin: 0 0 10px 0;"><strong>✓ Acompañantes:</strong> ${numCompanions} persona${numCompanions > 1 ? 's' : ''} adicional${numCompanions > 1 ? 'es' : ''}</p>` : ''}
              ${packMultimedia ? '<p style="margin: 0 0 10px 0;"><strong>✓ Pack Multimedia:</strong> +500 fotos HD + Aftermovie</p>' : ''}
            </div>
            <p style="margin: 20px 0;">Ahora te redirigiremos a Wodbuster para completar la inscripción de tu equipo en la competición.</p>
            <p style="font-size: 14px; opacity: 0.8;">Redirigiendo en <span id="redirect-count">5</span> segundos...</p>
          </div>
        `;
      }
      
      // Contador para redirección
      let count = 5;
      const countInterval = setInterval(() => {
        count--;
        const countEl = document.getElementById('redirect-count');
        if (countEl) countEl.textContent = count;
        
        if (count <= 0) {
          clearInterval(countInterval);
          redirectToWodbuster();
        }
      }, 1000);
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la reserva de alojamiento. Por favor, inténtalo de nuevo.');
      showLoading(false);
    }
  }
  */
  
  // Loading overlay
  function showLoading(show) {
    let overlay = document.querySelector('.loading-overlay');
    
    if (show) {
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(overlay);
      }
      overlay.style.display = 'flex';
    } else {
      if (overlay) {
        overlay.style.display = 'none';
      }
    }
  }
  
  // Initialize
  updatePriceSummary();
  updateSummaryDetails();
  handleCompanionsSection();
  

  
  // Auto-format phone numbers
  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', formatPhoneInput);
  });
  
  // Calculate age and validate minimum age (16 years)
  document.querySelectorAll('input[type="date"]').forEach(input => {
    input.addEventListener('change', (e) => {
      const birthDate = new Date(e.target.value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      if (age < 16) {
        alert('Los participantes deben tener al menos 16 años el día de la competición');
        e.target.value = '';
      }
    });
  });
  
  // Smooth scroll to sections
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
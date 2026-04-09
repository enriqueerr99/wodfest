// WODFEST Salou 2026 - Manejador del formulario de voluntarios
// Para la página principal

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('volunteerForm');
  if (!form) {
    console.log('Formulario de voluntarios no encontrado');
    return;
  }
  
  console.log('Formulario de voluntarios inicializado');
  
  // Prevenir el envío por defecto del formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Formulario enviado');
    
    // Validación básica
    const name = document.getElementById('vf-name')?.value;
    const surname = document.getElementById('vf-surname')?.value;
    const email = document.getElementById('vf-email')?.value;
    const phone = document.getElementById('vf-phone')?.value;
    const age = document.getElementById('vf-age')?.value;
    const tshirt = document.getElementById('vf-tshirt')?.value;
    
    // Validar disponibilidad
    const availabilityChecks = document.querySelectorAll('input[name="availability"]:checked');
    
    if (!name || !email || !age || !tshirt || availabilityChecks.length === 0) {
      alert('Por favor, completa todos los campos obligatorios (*) y selecciona al menos un día de disponibilidad');
      return;
    }
    
    // Obtener el botón de envío
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : 'Enviar solicitud';
    
    // Mostrar estado de carga
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
    }
    
    // Construir datos del formulario
    const fullName = surname ? `${name} ${surname}` : name;
    
    // Obtener disponibilidad de los checkboxes
    const availabilityChecks = document.querySelectorAll('input[name="availability"]:checked');
    const availability = Array.from(availabilityChecks).map(cb => cb.value).join(', ');
    
    // Obtener experiencia
    const experience = document.getElementById('vf-exp')?.value || '';
    
    // Obtener comentarios/motivación
    const comments = document.getElementById('vf-message')?.value || '';
    
    const formData = {
      name: fullName,
      email: email,
      phone: phone || '',
      age: age || '',
      city: document.getElementById('vf-city')?.value || '',
      tshirt_size: tshirt || '',
      availability: availability || 'No especificada',
      experience: experience || 'No especificada',
      comments: comments || ''
    };
    
    console.log('Datos a enviar:', formData);
    
    try {
      // Guardar en localStorage para demo si está disponible
      if (typeof saveVolunteerToDemo === 'function') {
        saveVolunteerToDemo(formData);
      }
      
      // Enviar a la API
      const response = await fetch('/api/volunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      console.log('Respuesta:', result);
      
      if (result.success || response.ok) {
        // Mostrar mensaje de éxito
        showSuccessMessage();
        
        // Limpiar formulario
        form.reset();
      } else {
        throw new Error(result.error || 'Error al enviar el formulario');
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      // Restaurar botón
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    }
  });
  
  // Mostrar mensaje de éxito
  function showSuccessMessage() {
    const formCard = document.getElementById('volFormCard');
    if (!formCard) {
      alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
      return;
    }
    
    // Guardar contenido original
    const originalContent = formCard.innerHTML;
    
    // Mostrar mensaje de éxito
    formCard.innerHTML = `
      <div class="vol-success" style="text-align: center; padding: 60px 20px;">
        <div style="font-size: 60px; margin-bottom: 20px;">🎉</div>
        <h3 style="color: #FFD700; margin-bottom: 16px; font-size: 2rem;">¡APUNTADO!</h3>
        <p style="margin-bottom: 12px; color: #ccc; font-size: 1.1rem;">
          Hemos recibido tu solicitud. El equipo de WODFEST se pondrá en contacto 
          contigo antes del evento. ¡Nos vemos en Salou!
        </p>
        <p style="color: #FFD700; font-weight: 600; margin-top: 20px; font-size: 1.2rem;">
          #SALOUSUDORYGLORIA
        </p>
        <button class="vol-btn vol-btn-primary" style="margin-top: 30px;" onclick="location.reload()">
          Enviar otra solicitud
        </button>
      </div>
    `;
    
    // Hacer scroll al mensaje
    formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});
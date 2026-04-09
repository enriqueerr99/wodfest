// WODFEST Salou 2026 - Formulario de Voluntarios

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('volunteerForm');
  if (!form) return;
  
  // Form validation
  function validateForm() {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      const formGroup = field.closest('.vol-field');
      if (!field.value.trim()) {
        formGroup?.classList.add('error');
        isValid = false;
      } else {
        formGroup?.classList.remove('error');
      }
    });
    
    return isValid;
  }
  
  // Remove error state on input
  form.addEventListener('input', (e) => {
    if (e.target.matches('input, select, textarea')) {
      e.target.closest('.vol-field')?.classList.remove('error');
    }
  });
  
  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }
    
    // Get submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : 'Enviar solicitud';
    
    // Show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
    }
    
    // Collect form data - usando los IDs correctos del HTML
    const name = document.getElementById('vf-name')?.value;
    const surname = document.getElementById('vf-surname')?.value;
    const fullName = name && surname ? `${name} ${surname}` : name || '';
    
    const formData = {
      name: fullName,
      email: document.getElementById('vf-email')?.value,
      phone: document.getElementById('vf-phone')?.value,
      tshirt_size: document.getElementById('vf-tshirt')?.value,
      availability: document.getElementById('vf-availability')?.value,
      experience: document.getElementById('vf-experience')?.value || '',
      comments: document.getElementById('vf-comments')?.value || ''
    };
    
    try {
      // Save to demo storage if available
      if (typeof saveVolunteerToDemo === 'function') {
        saveVolunteerToDemo(formData);
      }
      
      // Send to API
      const response = await fetch('/api/volunteers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Show success message
        showSuccessMessage();
        
        // Reset form
        form.reset();
      } else {
        throw new Error(result.error || 'Error al enviar el formulario');
      }
      
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      // Restore button
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    }
  });
  
  // Show success message
  function showSuccessMessage() {
    const formCard = document.getElementById('volFormCard');
    if (!formCard) {
      alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
      return;
    }
    
    // Save original content
    const originalContent = formCard.innerHTML;
    
    // Show success message
    formCard.innerHTML = `
      <div class="vol-success">
        <div class="success-icon">✅</div>
        <h3>¡Gracias por tu interés!</h3>
        <p>Hemos recibido tu solicitud para ser voluntario en WODFEST Salou 2026.</p>
        <p>Nos pondremos en contacto contigo pronto con más información.</p>
        <button class="btn btn-primary" onclick="location.reload()">Enviar otra solicitud</button>
      </div>
    `;
    
    // Scroll to success message
    formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Add success styles
    const style = document.createElement('style');
    style.textContent = `
      .vol-success {
        text-align: center;
        padding: 40px 20px;
      }
      .vol-success .success-icon {
        font-size: 60px;
        margin-bottom: 20px;
      }
      .vol-success h3 {
        color: #10b981;
        margin-bottom: 16px;
      }
      .vol-success p {
        margin-bottom: 12px;
        color: #4b5563;
      }
      .vol-success .btn {
        margin-top: 20px;
      }
    `;
    document.head.appendChild(style);
  }
});
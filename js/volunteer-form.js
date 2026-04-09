// Voluntarios Form - WODFEST Salou

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwFSl2qjK5IBjYRHa-faPYDOeT7Pft2d41RfHCX0rH1eYnQzGmOVugHGjBakmEe1kTv/exec';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('volunteerForm');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Recoger disponibilidad (checkboxes)
      const availabilityChecks = document.querySelectorAll('input[name="availability"]:checked');
      const disponibilidad = Array.from(availabilityChecks).map(cb => cb.value).join(', ') || '';
      
      const formData = new FormData();
      formData.append('nombre', document.getElementById('vf-name')?.value || '');
      formData.append('apellidos', document.getElementById('vf-surname')?.value || '');
      formData.append('email', document.getElementById('vf-email')?.value || '');
      formData.append('telefono', document.getElementById('vf-phone')?.value || '');
      formData.append('edad', document.getElementById('vf-age')?.value || '');
      formData.append('ciudad', document.getElementById('vf-city')?.value || '');
      formData.append('talla', document.getElementById('vf-tshirt')?.value || '');
      formData.append('disponibilidad', disponibilidad);
      formData.append('experiencia', document.getElementById('vf-exp')?.value || '');
      formData.append('detalles', document.getElementById('vf-why')?.value || '');
      
      // Enviar datos
      navigator.sendBeacon(WEBHOOK_URL, formData);
      
      // Mostrar confirmación
      alert('¡Gracias por tu interés! Te contactaremos pronto.');
      form.reset();
      console.log('✅ Voluntario registrado');
    });
  }
});

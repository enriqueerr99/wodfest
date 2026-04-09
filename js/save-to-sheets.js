// Guardar datos en Google Sheets - WODFEST Salou

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxxINnWzEOdyeHdV3EF4clGtSX9FEV2r4uFIBgDBY5GgoOYkWAo6FSbua5SGxGzTGXHkA/exec';

document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const formData = new FormData();
      
      // Datos básicos
      formData.append('equipo', document.getElementById('teamName')?.value || '');
      formData.append('categoria', document.querySelector('input[name="category"]:checked')?.value || '');
      formData.append('pack', document.getElementById('packMultimedia')?.checked ? 'Si' : 'No');
      formData.append('numAcompanantes', document.getElementById('numCompanions')?.value || '0');
      
      // Atletas
      for (let i = 1; i <= 3; i++) {
        formData.append(`atleta${i}Nombre`, document.getElementById(`athlete${i}-name`)?.value || '');
        formData.append(`atleta${i}Apellidos`, document.getElementById(`athlete${i}-surname`)?.value || '');
        formData.append(`atleta${i}Email`, document.getElementById(`athlete${i}-email`)?.value || '');
        formData.append(`atleta${i}Telefono`, document.getElementById(`athlete${i}-phone`)?.value || '');
        formData.append(`atleta${i}DNI`, document.getElementById(`athlete${i}-dni`)?.value || '');
        formData.append(`atleta${i}Nacimiento`, document.getElementById(`athlete${i}-birthdate`)?.value || '');
        formData.append(`atleta${i}Talla`, document.getElementById(`athlete${i}-tshirt`)?.value || '');
        formData.append(`atleta${i}Box`, document.getElementById(`athlete${i}-box`)?.value || '');
        formData.append(`atleta${i}Ciudad`, document.getElementById(`athlete${i}-city`)?.value || '');
      }
      
      // Acompañantes
      for (let i = 1; i <= 3; i++) {
        formData.append(`acompanante${i}Nombre`, document.getElementById(`companion${i}-name`)?.value || '');
        formData.append(`acompanante${i}Email`, document.getElementById(`companion${i}-email`)?.value || '');
        formData.append(`acompanante${i}Telefono`, document.getElementById(`companion${i}-phone`)?.value || '');
        formData.append(`acompanante${i}DNI`, document.getElementById(`companion${i}-dni`)?.value || '');
      }
      
      navigator.sendBeacon(WEBHOOK_URL, formData);
      console.log('✅ Todos los datos enviados a Sheets');
    });
  }
});

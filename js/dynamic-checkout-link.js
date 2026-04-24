// Dynamic Stripe Checkout Link - WODFEST Salou

// Mapeo de URLs según combinación
const CHECKOUT_URLS = {
  'solo-no-pack': 'https://buy.stripe.com/aFabJ1d8SgOc9yh4cvefC0c',
  'solo-pack': 'https://buy.stripe.com/cNi14n2ueeG4aCl9wPefC0d',
  'alojamiento-3-no-pack': 'https://buy.stripe.com/9B6eVd0m669y6m57oHefC0e',
  'alojamiento-3-pack': 'https://buy.stripe.com/dRm6oH8SC1TifWFeR9efC0f',
  'alojamiento-4-no-pack': 'https://buy.stripe.com/00w7sL9WGcxW8ud6kDefC0g',
  'alojamiento-4-pack': 'https://buy.stripe.com/dRm5kD5Gq0Peh0JcJ1efC0h',
  'alojamiento-5-no-pack': 'https://buy.stripe.com/9B614nd8S69ybGp5gzefC0i',
  'alojamiento-5-pack': 'https://buy.stripe.com/6oUaEX7OybtScKt8sLefC0j',
  'alojamiento-6-no-pack': 'https://buy.stripe.com/7sY00j7Oy1Ti8udgZhefC0k',
  'alojamiento-6-pack': 'https://buy.stripe.com/dRmfZhgl42XmfWF9wPefC0l'
};

function updateCheckoutLink() {
  // Obtener valores seleccionados
  const category = document.querySelector('input[name="category"]:checked')?.value || 'solo-competicion';
  const hasPack = document.getElementById('packMultimedia')?.checked || false;
  const numCompanions = parseInt(document.getElementById('numCompanions')?.value || 0);
  
  // Calcular total de personas
  const totalPeople = category === 'competicion-alojamiento' ? 3 + numCompanions : 0;
  
  // Generar key
  let key = '';
  if (category === 'solo-competicion') {
    key = hasPack ? 'solo-pack' : 'solo-no-pack';
  } else if (category === 'competicion-alojamiento') {
    const packSuffix = hasPack ? 'pack' : 'no-pack';
    key = `alojamiento-${totalPeople}-${packSuffix}`;
  }
  
  // Obtener URL
  const url = CHECKOUT_URLS[key];
  
  // Actualizar href
  const btn = document.getElementById('submit-btn');
  if (btn && url) {
    btn.href = url;
    console.log('✅ Enlace actualizado:', key, '→', url);
  }
}

// Escuchar cambios
document.addEventListener('DOMContentLoaded', () => {
  // Cambios en categoría
  document.querySelectorAll('input[name="category"]').forEach(radio => {
    radio.addEventListener('change', updateCheckoutLink);
  });
  
  // Cambio en pack multimedia
  const packCheckbox = document.getElementById('packMultimedia');
  if (packCheckbox) {
    packCheckbox.addEventListener('change', updateCheckoutLink);
  }
  
  // Cambio en acompañantes
  const companionsSelect = document.getElementById('numCompanions');
  if (companionsSelect) {
    companionsSelect.addEventListener('change', updateCheckoutLink);
  }
  
  // Actualizar al cargar
  updateCheckoutLink();
});

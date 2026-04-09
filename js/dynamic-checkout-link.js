// Dynamic Stripe Checkout Link - WODFEST Salou

// Mapeo de URLs según combinación
const CHECKOUT_URLS = {
  'solo-no-pack': 'https://buy.stripe.com/9B66oH0m61Ti9yh10jefC00',
  'solo-pack': 'https://buy.stripe.com/fZu4gz3yidC06m58sLefC01',
  'alojamiento-3-no-pack': 'https://buy.stripe.com/8x28wP5Gq1TidOxgZhefC02',
  'alojamiento-3-pack': 'https://buy.stripe.com/6oUeVd9WG8hG8uddN5efC03',
  'alojamiento-4-no-pack': 'https://buy.stripe.com/bJeeVdb0K9lK8udbEXefC04',
  'alojamiento-4-pack': 'https://buy.stripe.com/4gM28r2ue55u11L38refC05',
  'alojamiento-5-no-pack': 'https://buy.stripe.com/5kQ7sLb0K2XmdOxdN5efC06',
  'alojamiento-5-pack': 'https://buy.stripe.com/9B64gzfh08hG39TfVdefC07',
  'alojamiento-6-no-pack': 'https://buy.stripe.com/5kQaEX1qabtSfWF38refC08',
  'alojamiento-6-pack': 'https://buy.stripe.com/28EbJ15Gq55u39T5gzefC09'
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

// Script para sincronizar datos entre el frontend y el admin panel
// Se ejecuta en las páginas públicas para guardar en localStorage

// Función para guardar inscripción
window.saveRegistrationToDemo = function(registrationData) {
  try {
    const registrations = JSON.parse(localStorage.getItem('wodfest_registrations') || '[]');
    registrations.push({
      ...registrationData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      status: 'pending'
    });
    localStorage.setItem('wodfest_registrations', JSON.stringify(registrations));
    console.log('[Demo] Inscripción guardada localmente');
    return true;
  } catch (error) {
    console.error('Error guardando inscripción:', error);
    return false;
  }
};

// Función para guardar voluntario
window.saveVolunteerToDemo = function(volunteerData) {
  try {
    const volunteers = JSON.parse(localStorage.getItem('wodfest_volunteers') || '[]');
    volunteers.push({
      ...volunteerData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      status: 'pending'
    });
    localStorage.setItem('wodfest_volunteers', JSON.stringify(volunteers));
    console.log('[Demo] Voluntario guardado localmente');
    return true;
  } catch (error) {
    console.error('Error guardando voluntario:', error);
    return false;
  }
};
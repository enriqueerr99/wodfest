// WODFEST Salou 2026 - Admin Panel JavaScript

// Configuración de Supabase
const SUPABASE_URL = 'https://coopmsgaulridgjqfxwj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvb3Btc2dhdWxyaWRnanFmeHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MTU2MTYsImV4cCI6MjA4OTQ5MTYxNn0.jJweIORM5e3OEu_OoXz0T0QiaI9cemS8iYUWQlUE2Hk';

// Modo Demo - DESACTIVADO (usando Supabase real)
const DEMO_MODE = false;
const DEMO_PASSWORD = 'wodfest2026'; // Ya no se usa con Supabase

// Almacenamiento local para modo demo
let demoStorage = {
  registrations: [],
  volunteers: [],
  currentUser: null
};

// Cargar datos guardados o crear datos de ejemplo
function initDemoStorage() {
  const savedRegistrations = localStorage.getItem('wodfest_registrations');
  const savedVolunteers = localStorage.getItem('wodfest_volunteers');
  
  if (savedRegistrations) {
    demoStorage.registrations = JSON.parse(savedRegistrations);
  } else {
    // Crear algunos datos de ejemplo
    demoStorage.registrations = [
      {
        id: '1',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        booking_id: 'WF2026-1001',
        team_name: 'CrossFit Warriors',
        category: 'competicion-alojamiento',
        pack_multimedia: true,
        total_amount: 754,
        athlete1_name: 'Carlos', athlete1_surname: 'García', athlete1_email: 'carlos@example.com',
        athlete2_name: 'María', athlete2_surname: 'López', athlete2_email: 'maria@example.com',
        athlete3_name: 'Juan', athlete3_surname: 'Martínez', athlete3_email: 'juan@example.com',
        status: 'confirmed'
      },
      {
        id: '2',
        created_at: new Date(Date.now() - 172800000).toISOString(),
        booking_id: 'WF2026-1002',
        team_name: 'Box Fighters',
        category: 'solo-competicion',
        pack_multimedia: false,
        total_amount: 405,
        athlete1_name: 'Ana', athlete1_surname: 'Rodríguez', athlete1_email: 'ana@example.com',
        athlete2_name: 'Pedro', athlete2_surname: 'Sánchez', athlete2_email: 'pedro@example.com',
        athlete3_name: 'Laura', athlete3_surname: 'Fernández', athlete3_email: 'laura@example.com',
        status: 'pending'
      }
    ];
    localStorage.setItem('wodfest_registrations', JSON.stringify(demoStorage.registrations));
  }
  
  if (savedVolunteers) {
    demoStorage.volunteers = JSON.parse(savedVolunteers);
  } else {
    // Crear algunos voluntarios de ejemplo
    demoStorage.volunteers = [
      {
        id: '1',
        created_at: new Date(Date.now() - 259200000).toISOString(),
        name: 'Miguel Ángel',
        email: 'miguel@example.com',
        phone: '666 123 456',
        tshirt_size: 'L',
        availability: 'Ambos días',
        experience: 'Voluntario en WODFEST 2025',
        status: 'approved'
      },
      {
        id: '2',
        created_at: new Date(Date.now() - 345600000).toISOString(),
        name: 'Carmen Silva',
        email: 'carmen@example.com',
        phone: '677 234 567',
        tshirt_size: 'M',
        availability: 'Sábado',
        experience: 'Primera vez como voluntaria',
        status: 'pending'
      }
    ];
    localStorage.setItem('wodfest_volunteers', JSON.stringify(demoStorage.volunteers));
  }
}

// Inicializar almacenamiento demo
initDemoStorage();

// Funciones para simular Supabase en modo demo
const demoSupabase = {
  auth: {
    signInWithPassword: async ({ email, password }) => {
      if (password === DEMO_PASSWORD) {
        demoStorage.currentUser = { email, id: 'demo-user' };
        localStorage.setItem('wodfest_auth', JSON.stringify({ email }));
        return { data: { user: demoStorage.currentUser }, error: null };
      }
      return { data: null, error: { message: 'Contraseña incorrecta' } };
    },
    signOut: async () => {
      demoStorage.currentUser = null;
      localStorage.removeItem('wodfest_auth');
      return { error: null };
    },
    getSession: async () => {
      const auth = localStorage.getItem('wodfest_auth');
      if (auth) {
        const { email } = JSON.parse(auth);
        return { data: { session: { user: { email, id: 'demo-user' } } } };
      }
      return { data: { session: null } };
    }
  },
  from: (table) => ({
    select: () => ({
      order: () => ({
        then: (callback) => {
          const data = demoStorage[table] || [];
          callback({ data, error: null });
        }
      }),
      eq: () => ({
        then: (callback) => {
          const data = demoStorage[table] || [];
          callback({ data, error: null });
        }
      })
    }),
    insert: (data) => ({
      then: (callback) => {
        const newData = Array.isArray(data) ? data[0] : data;
        newData.id = Date.now().toString();
        newData.created_at = new Date().toISOString();
        demoStorage[table].push(newData);
        localStorage.setItem(`wodfest_${table}`, JSON.stringify(demoStorage[table]));
        callback({ data: [newData], error: null });
      }
    }),
    update: (updates) => ({
      eq: (field, value) => ({
        then: (callback) => {
          const index = demoStorage[table].findIndex(item => item[field] === value);
          if (index > -1) {
            demoStorage[table][index] = { ...demoStorage[table][index], ...updates };
            localStorage.setItem(`wodfest_${table}`, JSON.stringify(demoStorage[table]));
          }
          callback({ error: null });
        }
      })
    })
  }),
  rpc: (functionName) => ({
    then: (callback) => {
      // Simular estadísticas
      const stats = {
        total_registrations: demoStorage.registrations.length,
        confirmed_registrations: demoStorage.registrations.filter(r => r.status === 'confirmed').length,
        total_with_accommodation: demoStorage.registrations.filter(r => r.category === 'competicion-alojamiento').length,
        total_pack_multimedia: demoStorage.registrations.filter(r => r.pack_multimedia).length,
        total_volunteers: demoStorage.volunteers.length,
        approved_volunteers: demoStorage.volunteers.filter(v => v.status === 'approved').length,
        total_revenue: demoStorage.registrations
          .filter(r => r.status === 'confirmed')
          .reduce((sum, r) => sum + (r.total_amount || 0), 0)
      };
      callback({ data: stats, error: null });
    }
  })
};

// Usar demo o Supabase real según configuración
const supabaseClient = DEMO_MODE ? demoSupabase : supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Estado global
let currentUser = null;
let registrations = [];
let volunteers = [];

// Elementos DOM
const loginScreen = document.getElementById('login-screen');
const adminPanel = document.getElementById('admin-panel');
const loginForm = document.getElementById('login-form');

// Inicialización
document.addEventListener('DOMContentLoaded', async () => {
  // Verificar sesión existente
  const { data: { session } } = await supabaseClient.auth.getSession();
  
  if (session) {
    currentUser = session.user;
    showAdminPanel();
  }
  
  // Event listeners
  loginForm.addEventListener('submit', handleLogin);
  
  // Navigation tabs
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  
  // Search and filters
  document.getElementById('search-registrations')?.addEventListener('input', filterRegistrations);
  document.getElementById('filter-category')?.addEventListener('change', filterRegistrations);
  document.getElementById('search-volunteers')?.addEventListener('input', filterVolunteers);
  document.getElementById('filter-status')?.addEventListener('change', filterVolunteers);
});

// Funciones de autenticación
async function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorEl = document.getElementById('login-error');
  const loginText = document.getElementById('login-text');
  const loginLoading = document.getElementById('login-loading');
  
  // Mostrar loading
  loginText.style.display = 'none';
  loginLoading.style.display = 'inline';
  errorEl.style.display = 'none';
  
  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    currentUser = data.user;
    showAdminPanel();
    
  } catch (error) {
    errorEl.textContent = 'Email o contraseña incorrectos';
    errorEl.style.display = 'block';
  } finally {
    loginText.style.display = 'inline';
    loginLoading.style.display = 'none';
  }
}

async function logout() {
  await supabaseClient.auth.signOut();
  currentUser = null;
  loginScreen.style.display = 'flex';
  adminPanel.style.display = 'none';
  loginForm.reset();
}

function showAdminPanel() {
  loginScreen.style.display = 'none';
  adminPanel.style.display = 'block';
  
  // Cargar datos iniciales
  loadDashboardData();
  
  // Actualizar nombre de usuario
  if (currentUser?.email) {
    document.getElementById('user-name').textContent = currentUser.email.split('@')[0];
  }
}

// Funciones de navegación
function switchTab(tabName) {
  // Actualizar navegación activa
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  
  // Mostrar tab correspondiente
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.toggle('active', tab.id === `${tabName}-tab`);
  });
  
  // Cargar datos según el tab
  switch(tabName) {
    case 'dashboard':
      loadDashboardData();
      break;
    case 'registrations':
      loadRegistrations();
      break;
    case 'volunteers':
      loadVolunteers();
      break;
    case 'settings':
      loadSettings();
      break;
  }
}

// Dashboard
async function loadDashboardData() {
  try {
    // Obtener estadísticas usando la función SQL
    const { data: stats, error } = await supabaseClient
      .rpc('get_dashboard_stats');
    
    if (error) throw error;
    
    // Actualizar valores en el dashboard
    document.getElementById('stat-registrations').textContent = stats.total_registrations || 0;
    document.getElementById('stat-confirmed').textContent = stats.confirmed_registrations || 0;
    document.getElementById('stat-accommodation').textContent = stats.total_with_accommodation || 0;
    document.getElementById('stat-pack').textContent = stats.total_pack_multimedia || 0;
    document.getElementById('stat-volunteers').textContent = stats.total_volunteers || 0;
    document.getElementById('stat-revenue').textContent = `${stats.total_revenue || 0}€`;
    
  } catch (error) {
    console.error('Error loading dashboard:', error);
  }
}

// Inscripciones
async function loadRegistrations() {
  try {
    const { data, error } = await supabaseClient
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    registrations = data || [];
    displayRegistrations(registrations);
    
  } catch (error) {
    console.error('Error loading registrations:', error);
  }
}

function displayRegistrations(data) {
  const tbody = document.querySelector('#registrations-table tbody');
  const emptyState = document.getElementById('registrations-empty');
  
  if (!data.length) {
    tbody.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }
  
  emptyState.style.display = 'none';
  
  tbody.innerHTML = data.map(reg => `
    <tr>
      <td>${formatDate(reg.created_at)}</td>
      <td><strong>${reg.team_name}</strong></td>
      <td>${reg.category === 'solo-competicion' ? 'Solo Competición' : 'Competición + Alojamiento'}</td>
      <td>
        <div style="font-size: 0.875rem;">
          ${reg.athlete1_name} ${reg.athlete1_surname}<br>
          ${reg.athlete2_name} ${reg.athlete2_surname}<br>
          ${reg.athlete3_name} ${reg.athlete3_surname}
        </div>
      </td>
      <td>${reg.category === 'competicion-alojamiento' ? '✅' : '❌'}</td>
      <td>${reg.pack_multimedia ? '✅' : '❌'}</td>
      <td><strong>${reg.total_amount || 0}€</strong></td>
      <td><span class="status-badge status-${reg.status}">${getStatusText(reg.status)}</span></td>
      <td>
        <button class="btn btn-ghost btn-sm" onclick="viewRegistration('${reg.id}')">Ver</button>
      </td>
    </tr>
  `).join('');
}

function filterRegistrations() {
  const searchTerm = document.getElementById('search-registrations').value.toLowerCase();
  const categoryFilter = document.getElementById('filter-category').value;
  
  const filtered = registrations.filter(reg => {
    const matchesSearch = reg.team_name.toLowerCase().includes(searchTerm) ||
                         `${reg.athlete1_name} ${reg.athlete1_surname}`.toLowerCase().includes(searchTerm) ||
                         `${reg.athlete2_name} ${reg.athlete2_surname}`.toLowerCase().includes(searchTerm) ||
                         `${reg.athlete3_name} ${reg.athlete3_surname}`.toLowerCase().includes(searchTerm);
    
    const matchesCategory = !categoryFilter || reg.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  displayRegistrations(filtered);
}

// Voluntarios
async function loadVolunteers() {
  try {
    const { data, error } = await supabaseClient
      .from('volunteers')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    volunteers = data || [];
    displayVolunteers(volunteers);
    
  } catch (error) {
    console.error('Error loading volunteers:', error);
  }
}

function displayVolunteers(data) {
  const tbody = document.querySelector('#volunteers-table tbody');
  const emptyState = document.getElementById('volunteers-empty');
  
  if (!data.length) {
    tbody.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }
  
  emptyState.style.display = 'none';
  
  tbody.innerHTML = data.map(vol => `
    <tr>
      <td>${formatDate(vol.created_at)}</td>
      <td><strong>${vol.name}</strong></td>
      <td>${vol.email}</td>
      <td>${vol.phone || '-'}</td>
      <td>${vol.age || '-'}</td>
      <td>${vol.city || '-'}</td>
      <td>${vol.tshirt_size || '-'}</td>
      <td title="${vol.availability || ''}">${(vol.availability || '-').substring(0, 30)}${(vol.availability || '').length > 30 ? '...' : ''}</td>
      <td><span class="status-badge status-${vol.status}">${getStatusText(vol.status)}</span></td>
      <td>
        <button class="btn btn-ghost btn-sm" onclick="viewVolunteer('${vol.id}')">Ver</button>
        ${vol.status === 'pending' ? `
          <button class="btn btn-ghost btn-sm" onclick="updateVolunteerStatus('${vol.id}', 'approved')">✅</button>
          <button class="btn btn-ghost btn-sm" onclick="updateVolunteerStatus('${vol.id}', 'rejected')">❌</button>
        ` : ''}
      </td>
    </tr>
  `).join('');
}

function filterVolunteers() {
  const searchTerm = document.getElementById('search-volunteers').value.toLowerCase();
  const statusFilter = document.getElementById('filter-status').value;
  
  const filtered = volunteers.filter(vol => {
    const matchesSearch = vol.name.toLowerCase().includes(searchTerm) ||
                         vol.email.toLowerCase().includes(searchTerm);
    
    const matchesStatus = !statusFilter || vol.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  displayVolunteers(filtered);
}

async function updateVolunteerStatus(id, status) {
  try {
    const { error } = await supabaseClient
      .from('volunteers')
      .update({ status })
      .eq('id', id);
    
    if (error) throw error;
    
    // Recargar voluntarios
    loadVolunteers();
    
  } catch (error) {
    console.error('Error updating volunteer:', error);
  }
}

// Configuración
async function loadSettings() {
  try {
    // Por ahora solo mostramos el usuario actual
    const tbody = document.querySelector('#users-table tbody');
    tbody.innerHTML = `
      <tr>
        <td>${currentUser.email}</td>
        <td>Admin</td>
        <td>super_admin</td>
        <td>${formatDate(new Date())}</td>
        <td><span class="status-badge status-confirmed">Activo</span></td>
        <td></td>
      </tr>
    `;
  } catch (error) {
    console.error('Error loading settings:', error);
  }
}

// Funciones de visualización
async function viewRegistration(id) {
  const reg = registrations.find(r => r.id === id);
  if (!reg) return;
  
  const modal = document.getElementById('registration-modal');
  const details = document.getElementById('registration-details');
  
  details.innerHTML = `
    <div style="display: grid; gap: 20px;">
      <div>
        <h4>Información del Equipo</h4>
        <p><strong>Nombre:</strong> ${reg.team_name}</p>
        <p><strong>Categoría:</strong> ${reg.category === 'solo-competicion' ? 'Solo Competición' : 'Competición + Alojamiento'}</p>
        <p><strong>Pack Multimedia:</strong> ${reg.pack_multimedia ? 'Sí' : 'No'}</p>
        <p><strong>Total:</strong> ${reg.total_amount || 0}€</p>
        <p><strong>Estado:</strong> <span class="status-badge status-${reg.status}">${getStatusText(reg.status)}</span></p>
      </div>
      
      <div>
        <h4>Atletas</h4>
        <div style="display: grid; gap: 12px;">
          <div style="padding: 12px; background: #f3f4f6; border-radius: 8px;">
            <strong>Atleta 1:</strong> ${reg.athlete1_name} ${reg.athlete1_surname}<br>
            <small>
              Email: ${reg.athlete1_email}<br>
              Teléfono: ${reg.athlete1_phone}<br>
              DNI: ${reg.athlete1_dni}<br>
              Box: ${reg.athlete1_box}<br>
              Ciudad: ${reg.athlete1_city}
            </small>
          </div>
          <div style="padding: 12px; background: #f3f4f6; border-radius: 8px;">
            <strong>Atleta 2:</strong> ${reg.athlete2_name} ${reg.athlete2_surname}<br>
            <small>
              Email: ${reg.athlete2_email}<br>
              Teléfono: ${reg.athlete2_phone}<br>
              DNI: ${reg.athlete2_dni}<br>
              Box: ${reg.athlete2_box}<br>
              Ciudad: ${reg.athlete2_city}
            </small>
          </div>
          <div style="padding: 12px; background: #f3f4f6; border-radius: 8px;">
            <strong>Atleta 3:</strong> ${reg.athlete3_name} ${reg.athlete3_surname}<br>
            <small>
              Email: ${reg.athlete3_email}<br>
              Teléfono: ${reg.athlete3_phone}<br>
              DNI: ${reg.athlete3_dni}<br>
              Box: ${reg.athlete3_box}<br>
              Ciudad: ${reg.athlete3_city}
            </small>
          </div>
        </div>
      </div>
    </div>
  `;
  
  modal.style.display = 'flex';
}

async function viewVolunteer(id) {
  const vol = volunteers.find(v => v.id === id);
  if (!vol) return;
  
  const modal = document.getElementById('volunteer-modal');
  const details = document.getElementById('volunteer-details');
  
  details.innerHTML = `
    <div style="display: grid; gap: 16px;">
      <p><strong>Nombre:</strong> ${vol.name}</p>
      <p><strong>Email:</strong> ${vol.email}</p>
      <p><strong>Teléfono:</strong> ${vol.phone || '-'}</p>
      <p><strong>Edad:</strong> ${vol.age || '-'}</p>
      <p><strong>Ciudad:</strong> ${vol.city || '-'}</p>
      <p><strong>Talla de camiseta:</strong> ${vol.tshirt_size || '-'}</p>
      <p><strong>Disponibilidad:</strong> ${vol.availability || '-'}</p>
      <p><strong>Experiencia:</strong> ${vol.experience || '-'}</p>
      <p><strong>Comentarios:</strong> ${vol.comments || '-'}</p>
      <p><strong>Estado:</strong> <span class="status-badge status-${vol.status}">${getStatusText(vol.status)}</span></p>
    </div>
  `;
  
  modal.style.display = 'flex';
}

// Funciones de utilidad
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function getStatusText(status) {
  const statusMap = {
    pending: 'Pendiente',
    confirmed: 'Confirmado',
    cancelled: 'Cancelado',
    approved: 'Aprobado',
    rejected: 'Rechazado'
  };
  return statusMap[status] || status;
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Exportar datos
async function exportData(type) {
  const data = type === 'registrations' ? registrations : volunteers;
  
  if (!data.length) {
    alert('No hay datos para exportar');
    return;
  }
  
  // Crear CSV
  let csv = '';
  
  if (type === 'registrations') {
    csv = 'Fecha,Equipo,Categoría,Atleta1,Atleta2,Atleta3,Alojamiento,Pack,Total,Estado\\n';
    data.forEach(reg => {
      csv += `${formatDate(reg.created_at)},${reg.team_name},${reg.category},`;
      csv += `${reg.athlete1_name} ${reg.athlete1_surname},`;
      csv += `${reg.athlete2_name} ${reg.athlete2_surname},`;
      csv += `${reg.athlete3_name} ${reg.athlete3_surname},`;
      csv += `${reg.category === 'competicion-alojamiento' ? 'Sí' : 'No'},`;
      csv += `${reg.pack_multimedia ? 'Sí' : 'No'},`;
      csv += `${reg.total_amount}€,${getStatusText(reg.status)}\\n`;
    });
  } else {
    csv = 'Fecha,Nombre,Email,Teléfono,Edad,Ciudad,Talla,Disponibilidad,Experiencia,Comentarios,Estado\\n';
    data.forEach(vol => {
      csv += `${formatDate(vol.created_at)},${vol.name},${vol.email},`;
      csv += `${vol.phone || ''},${vol.age || ''},${vol.city || ''},`;
      csv += `${vol.tshirt_size || ''},"${vol.availability || ''}",`;
      csv += `"${vol.experience || ''}","${vol.comments || ''}",${getStatusText(vol.status)}\\n`;
    });
  }
  
  // Descargar archivo
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `wodfest_${type}_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
}

// Actualizar datos
async function refreshData() {
  const activeTab = document.querySelector('.nav-item.active').dataset.tab;
  switchTab(activeTab);
}
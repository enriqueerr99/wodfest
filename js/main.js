// WODFEST SALOU 2026 — Main JS

// =====================
// NAVBAR scroll effect
// =====================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// =====================
// COUNTDOWN TIMER
// Target: 1 April 2026 00:00:00
// =====================
function updateCountdown() {
  const target = new Date('2026-04-01T00:00:00');
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent = '00';
    document.getElementById('cd-secs').textContent = '00';
    document.querySelector('.countdown-label').textContent = '¡Las inscripciones ya están abiertas!';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// =====================
// SCROLL ANIMATIONS
// =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('fade-visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.fact-card, .cat-card, .step, .reg-block, .price-card, .exp-card, .sponsor-item, .perk'
).forEach(el => {
  el.classList.add('fade-hidden');
  observer.observe(el);
});

// =====================
// VOLUNTEER FORM
// =====================
const volunteerForm = document.getElementById('volunteerForm');
if (volunteerForm) {
  volunteerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn  = document.getElementById('volSubmitBtn');
    const btnText    = document.getElementById('volBtnText');
    const btnLoader  = document.getElementById('volBtnLoader');
    const errorDiv   = document.getElementById('volFormError');

    // Basic client-side validation
    const name    = document.getElementById('vf-name');
    const surname = document.getElementById('vf-surname');
    const email   = document.getElementById('vf-email');
    const age     = document.getElementById('vf-age');

    let valid = true;
    [name, surname, email, age].forEach(el => {
      if (!el.value.trim()) { el.classList.add('error'); valid = false; }
      else el.classList.remove('error');
    });

    const availability = [...document.querySelectorAll('input[name="availability"]:checked')]
      .map(cb => cb.value);

    if (!availability.length) {
      errorDiv.textContent = 'Selecciona al menos un día de disponibilidad.';
      errorDiv.classList.remove('hidden');
      return;
    }
    if (!valid) {
      errorDiv.textContent = 'Por favor, rellena todos los campos obligatorios.';
      errorDiv.classList.remove('hidden');
      return;
    }
    errorDiv.classList.add('hidden');

    // Submit
    submitBtn.disabled = true;
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');

    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:         name.value.trim(),
          surname:      surname.value.trim(),
          email:        email.value.trim(),
          phone:        document.getElementById('vf-phone').value.trim(),
          age:          age.value,
          city:         document.getElementById('vf-city').value.trim(),
          availability,
          experience:   document.getElementById('vf-exp').value,
          message:      document.getElementById('vf-message').value.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al enviar.');

      // Show success state
      document.getElementById('volFormCard').classList.add('hidden');
      document.getElementById('volSuccess').classList.remove('hidden');

    } catch (err) {
      errorDiv.textContent = err.message;
      errorDiv.classList.remove('hidden');
      submitBtn.disabled = false;
      btnText.classList.remove('hidden');
      btnLoader.classList.add('hidden');
    }
  });

  // Clear errors on input
  document.querySelectorAll('#volunteerForm input, #volunteerForm select, #volunteerForm textarea')
    .forEach(el => el.addEventListener('input', () => el.classList.remove('error')));
}

// =====================
// CONTACT FORM (placeholder)
// =====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = '✓ Mensaje enviado';
    btn.style.background = '#27ae60';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Enviar mensaje';
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

// =====================
// Smooth scroll for anchor links
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

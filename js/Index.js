// ── Formulario de contacto WhatsApp ─────────────────────────────────────────

const contactForm = document.getElementById('contactForm');
const formError   = document.getElementById('formError');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name     = document.getElementById('contactName').value.trim();
    const phone    = document.getElementById('contactPhone').value.trim();
    const piercing = document.getElementById('contactPiercing').value;
    const message  = document.getElementById('contactMessage').value.trim();

    if (!name || !phone) {
      formError.textContent = 'Por favor ingresa tu nombre y teléfono antes de enviar.';
      formError.removeAttribute('hidden');
      formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }

    formError.setAttribute('hidden', '');

    const lines = [
      `Hola, me llamo ${name}.`,
      `Mi contacto es ${phone}.`,
      piercing ? `Me interesa una perforación en: ${piercing}.` : null,
      message   ? `Mensaje: ${message}` : null,
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/50584272274?text=${encodeURIComponent(lines)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

// ── Intro screen ─────────────────────────────────────────────────────────────

const introScreen = document.getElementById('introScreen');
const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasSeenIntro = window.localStorage.getItem('hasSeenIntro') === 'true';

const initNav = () => {
  window.setupHamburgerNavigation?.();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNav);
} else {
  initNav();
}

window.addEventListener('load', () => {
  window.scrollTo({ top: 0, behavior: 'auto' });

  const revealHome = () => {
    document.body.classList.add('is-ready');
    document.body.classList.remove('is-loading');
    introScreen?.setAttribute('aria-hidden', 'true');

    window.setTimeout(() => {
      introScreen?.remove();
    }, 800);

    const inicio = document.getElementById('inicio');
    inicio?.scrollIntoView({ behavior: 'auto', block: 'start' });
  };

  // Si ya vio la intro, mostrar contenido inmediatamente
  if (hasSeenIntro) {
    introScreen?.remove();
    document.body.classList.remove('is-loading');
    revealHome();
  } else {
    // Primera vez: mostrar animación
    const delay = isReducedMotion ? 120 : 1600;
    window.setTimeout(revealHome, delay);
    // Guardar que ya vio la intro
    window.localStorage.setItem('hasSeenIntro', 'true');
  }
});

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

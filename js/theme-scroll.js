// Scroll Animations - Función reutilizable
const setupScrollAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observar todos los elementos con clase 'reveal'
  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });
};

// Inicializar cuando el DOM esté listo
const initScrollAnimations = () => {
  setupScrollAnimations();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}

(() => {
  const setupHamburgerNavigation = () => {
    const hamburgerToggle = document.getElementById('hamburgerToggle');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const hamburgerLinks = document.querySelectorAll('.hamburger-menu a');

    if (!hamburgerToggle || !hamburgerMenu) {
      return;
    }

    const closeMenu = () => {
      hamburgerMenu.classList.remove('active');
      document.body.classList.remove('hamburger-open');
      hamburgerToggle.setAttribute('aria-expanded', 'false');
    };

    const toggleMenu = () => {
      const isOpen = hamburgerMenu.classList.toggle('active');
      document.body.classList.toggle('hamburger-open', isOpen);
      hamburgerToggle.setAttribute('aria-expanded', String(isOpen));
    };

    hamburgerToggle.addEventListener('click', toggleMenu);
    hamburgerLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Cerrar menú cuando se hace resize a pantalla grande
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });

    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    });
  };

  window.setupHamburgerNavigation = setupHamburgerNavigation;
})();

const initNav = () => {
  window.setupHamburgerNavigation?.();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNav);
} else {
  initNav();
}

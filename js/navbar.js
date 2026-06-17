document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('.navbar');

  if (!nav) return;

  // Sticky behaviour: add class when scrolled past a small threshold
  const stickyThreshold = 30;
  function onScroll() {
    if (window.scrollY > stickyThreshold) {
      nav.classList.add('navbar--sticky');
    } else {
      nav.classList.remove('navbar--sticky');
    }
  }

  // Run on load in case page is loaded scrolled
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});

// Show sticky purchase bar after scrolling 600px.
(function () {
  var bar = document.getElementById('stickyBar');
  if (!bar) return;

  function onScroll() {
    if (window.scrollY > 600) {
      bar.classList.add('is-visible');
    } else {
      bar.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

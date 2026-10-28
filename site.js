// Table of contents: always open beside the text on wide screens, collapsible
// on narrow ones, with the section currently being read highlighted.
(function () {
  var toc = document.querySelector('.toc details');
  if (!toc) return;

  var wide = window.matchMedia('(min-width: 960px)');
  var syncOpen = function () { toc.open = wide.matches; };
  syncOpen();
  if (wide.addEventListener) wide.addEventListener('change', syncOpen);

  toc.addEventListener('click', function (e) {
    if (!wide.matches && e.target.closest('a')) toc.open = false;
  });

  var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));
  var sections = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });

  var ticking = false;
  var update = function () {
    ticking = false;
    var active = 0;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i] && sections[i].getBoundingClientRect().top <= 140) active = i;
    }
    links.forEach(function (a, i) {
      if (i === active) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  };

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();

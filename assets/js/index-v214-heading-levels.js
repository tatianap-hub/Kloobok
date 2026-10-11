
(function () {
  'use strict';
  const main = document.getElementById('mainContent');
  const sidebar = document.getElementById('sidebar');
  if (!main || !sidebar) return;
  const headingSelector = 'h1,h2,h3,h4,h5,h6';
  function setLevel(node, level) {
    if (!node) return;
    node.classList.remove('body-l1', 'body-l2', 'body-l3');
    node.classList.add('body-l' + level);
  }
  function findHeading(target) {
    if (target.matches(headingSelector)) return target;
    if (target.matches('details')) return target.querySelector(':scope > summary');
    if (target.matches('.nav-anchor')) {
      if (target.parentElement.matches('.proto-acc-head')) return target.parentElement.querySelector('.t');
      const next = target.nextElementSibling;
      if (!next) return null;
      if (next.matches(headingSelector)) return next;
      if (next.matches('section,article,.flow-item,.flow-group')) return next.querySelector(headingSelector);
      return null;
    }
    return target.querySelector(headingSelector);
  }
  function harmonise() {
    main.querySelectorAll('h2,h3,h4,h5,h6').forEach(h => {
      if (!h.matches('.body-l1,.body-l2,.body-l3')) h.classList.add('body-l3');
    });
    const levels = new Map();
    sidebar.querySelectorAll('a.nav-l1,a.nav-l2,a.nav-l3').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      const level = a.classList.contains('nav-l1') ? 1 : a.classList.contains('nav-l2') ? 2 : 3;
      levels.set(href.slice(1), Math.min(level, levels.get(href.slice(1)) || 3));
    });
    levels.forEach((level, id) => {
      const target = document.getElementById(id);
      if (!target || !main.contains(target)) return;
      setLevel(findHeading(target), level);
    });
  }
  if (typeof APP_HOOKS !== 'undefined') APP_HOOKS.afterLanguage.push(harmonise);
  harmonise();
})();


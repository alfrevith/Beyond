(() => {
  'use strict';
  const dialog = document.getElementById('welcome-dialog');
  let shown = false;

  // Once per page opening, when reaching the lobby. Returning from a subject
  // does not interrupt studying; a new opening or reload shows the notice again.
  function showAtHome() {
    const route = location.hash.slice(1);
    if (shown || (route && route !== 'inicio')) return;
    shown = true;
    dialog.showModal();
  }

  dialog.addEventListener('close', () => {
    if (dialog.returnValue === 'exit') {
      // User-opened tabs cannot reliably be closed by scripts. A blank page
      // leaves Beyond without sending the visitor to an external website.
      window.location.replace('about:blank');
    } else {
      document.getElementById('main').focus({ preventScroll: true });
    }
  });
  window.addEventListener('hashchange', showAtHome);
  showAtHome();
})();

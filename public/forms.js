// Coffee Kidd Cafe — form enhancement.
// Progressive enhancement for the mailing-list, contact, and signup forms:
// submit via fetch and swap in an in-style confirmation, without leaving the
// page. Without JS the forms fall back to a normal POST (action set server-side).
//
// A form opts in with class "js-form". When it has a data-endpoint it submits
// there; when it doesn't (service not configured yet) it stays inert.
(function () {
  function show(el) {
    if (el) el.hidden = false;
  }
  function hide(el) {
    if (el) el.hidden = true;
  }

  async function submit(form, endpoint, scope) {
    var btn = form.querySelector('[type="submit"]');
    if (btn) btn.setAttribute('aria-disabled', 'true');
    hide(scope.querySelector('[data-error]'));
    try {
      var res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (res.ok) {
        hide(form);
        hide(scope.querySelector('[data-note]'));
        show(scope.querySelector('[data-success]'));
        return;
      }
    } catch (e) {
      /* fall through to error */
    }
    show(scope.querySelector('[data-error]'));
    if (btn) btn.removeAttribute('aria-disabled');
  }

  document.querySelectorAll('form.js-form').forEach(function (form) {
    var endpoint = form.getAttribute('data-endpoint');
    var scope = form.closest('[data-form]') || form.parentElement;
    form.addEventListener('submit', function (e) {
      // Always intercept so an unconfigured form doesn't reload with querystring.
      e.preventDefault();
      if (endpoint) submit(form, endpoint, scope);
    });
  });
})();

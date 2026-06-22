/**
 * Netlify Identity — nodig voor uitnodigingslinks en /admin-login.
 */
(function () {
  if (window.netlifyIdentity) return;

  const script = document.createElement('script');
  script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
  script.onload = function () {
    if (!window.netlifyIdentity) return;
    window.netlifyIdentity.on('init', function (user) {
      if (!user) {
        window.netlifyIdentity.on('login', function () {
          if (window.location.pathname.startsWith('/admin')) return;
          window.location.href = '/admin/';
        });
      }
    });
  };
  document.head.appendChild(script);
})();
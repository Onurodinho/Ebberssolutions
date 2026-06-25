/**
 * Laadt de chat-assistent pas na idle — homepage blijft sneller interactief.
 */
(function () {
  let scheduled = false;

  function loadAssistant() {
    if (window.__assistantLoading || window.initAssistant) return;
    window.__assistantLoading = true;
    const script = document.createElement('script');
    script.src = 'js/assistant.js?v=20260626';
    script.async = true;
    document.body.appendChild(script);
  }

  function scheduleAssistant() {
    if (scheduled) return;
    scheduled = true;
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadAssistant, { timeout: 4000 });
    } else {
      window.addEventListener('load', () => setTimeout(loadAssistant, 1500), { once: true });
    }
  }

  function onReady() {
    if (window.__cmsLoaded) {
      scheduleAssistant();
      return;
    }
    document.addEventListener('contentready', scheduleAssistant, { once: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
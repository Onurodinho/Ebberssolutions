/**
 * Meertalige website-assistent — UI + /api/assistant
 */
(function () {
  const HISTORY_KEY = 'ebbers-assistant-history';
  const MAX_HISTORY = 12;

  let root;
  let panel;
  let toggle;
  let messagesEl;
  let form;
  let input;
  let sendBtn;
  let chipsEl;
  let busy = false;
  let history = [];

  function t(key) {
    return window.EbbersI18n ? EbbersI18n.t(key) : key;
  }

  function getLang() {
    return window.EbbersI18n ? EbbersI18n.getLang() : 'nl';
  }

  function contact() {
    return typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG.contact : null;
  }

  function loadHistory() {
    try {
      const raw = sessionStorage.getItem(HISTORY_KEY);
      history = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(history)) history = [];
    } catch {
      history = [];
    }
  }

  function saveHistory() {
    try {
      sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-MAX_HISTORY)));
    } catch {
      /* ignore */
    }
  }

  function renderMarkdown(text) {
    const escaped = String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    return escaped
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  function appendMessage(role, text) {
    const item = document.createElement('div');
    item.className = `assistant-msg assistant-msg--${role}`;
    item.innerHTML = renderMarkdown(text);
    messagesEl.appendChild(item);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return item;
  }

  function setBusy(state) {
    busy = state;
    sendBtn.disabled = state;
    input.disabled = state;
    toggle.setAttribute('aria-busy', state ? 'true' : 'false');
  }

  function openPanel() {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('assistant-open');
    input.focus();
    if (messagesEl.childElementCount === 0) {
      appendMessage('assistant', t('assistant.welcome'));
    }
  }

  function closePanel() {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('assistant-open');
    toggle.focus();
  }

  function togglePanel() {
    if (panel.hidden) openPanel();
    else closePanel();
  }

  async function sendMessage(text) {
    const message = String(text || '').trim();
    if (!message || busy) return;

    appendMessage('user', message);
    history.push({ role: 'user', content: message });
    saveHistory();

    setBusy(true);
    const thinking = appendMessage('assistant', t('assistant.thinking'));

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          lang: getLang(),
          history: history.slice(0, -1),
        }),
      });

      const data = await res.json().catch(() => ({}));
      thinking.remove();

      if (!res.ok || !data.reply) {
        appendMessage('assistant', t('assistant.error'));
        return;
      }

      appendMessage('assistant', data.reply);
      history.push({ role: 'assistant', content: data.reply });
      saveHistory();
    } catch {
      thinking.remove();
      appendMessage('assistant', t('assistant.error'));
    } finally {
      setBusy(false);
      input.focus();
    }
  }

  function buildChips() {
    const c = contact();
    const phone = c ? c.phone : '+31 6 1390 0094';
    const phoneHref = c ? c.phoneHref : '+31613900094';
    const email = c ? c.email : 'peterebbers67@gmail.com';

    const chips = [
      { label: 'assistant.chip.services', href: 'diensten.html' },
      { label: 'assistant.chip.collection', href: 'collectie.html' },
      { label: 'assistant.chip.contact', href: 'contact.html' },
      { label: 'assistant.chip.phone', href: `tel:${phoneHref}`, text: phone },
      { label: 'assistant.chip.email', href: `mailto:${email}`, text: email },
    ];

    chips.forEach((chip) => {
      const btn = document.createElement('a');
      btn.className = 'assistant-chip';
      btn.href = chip.href;
      if (chip.href.startsWith('tel:')) {
        btn.dataset.contactChip = 'phone';
      } else if (chip.href.startsWith('mailto:')) {
        btn.dataset.contactChip = 'email';
      } else {
        btn.dataset.i18nChip = chip.label;
      }
      chipsEl.appendChild(btn);
    });
  }

  function applyI18n() {
    if (!root) return;
    const c = contact();
    toggle.setAttribute('aria-label', t('assistant.toggle'));
    root.querySelector('.assistant-title').textContent = t('assistant.title');
    root.querySelector('.assistant-subtitle').textContent = t('assistant.subtitle');
    root.querySelector('.assistant-close').setAttribute('aria-label', t('assistant.close'));
    input.placeholder = t('assistant.placeholder');
    sendBtn.textContent = t('assistant.send');

    chipsEl.querySelectorAll('.assistant-chip').forEach((chip) => {
      if (chip.dataset.contactChip === 'phone') {
        chip.textContent = c ? c.phone : '+31 6 1390 0094';
      } else if (chip.dataset.contactChip === 'email') {
        chip.textContent = c ? c.email : 'peterebbers67@gmail.com';
      } else if (chip.dataset.i18nChip) {
        chip.textContent = t(chip.dataset.i18nChip);
      }
    });
  }

  function buildWidget() {
    if (document.getElementById('assistant-root')) return;

    root = document.createElement('div');
    root.id = 'assistant-root';
    root.className = 'assistant-root';
    root.innerHTML = `
      <button type="button" id="assistant-toggle" class="assistant-toggle" aria-expanded="false" aria-controls="assistant-panel">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H9l-4.2 3.15c-.55.41-1.3-.02-1.3-.7V16H6.5A2.5 2.5 0 0 1 4 13.5v-8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
        </svg>
      </button>
      <section id="assistant-panel" class="assistant-panel" hidden aria-label="">
        <header class="assistant-header">
          <div>
            <p class="assistant-eyebrow">Ebbers Solutions</p>
            <h2 class="assistant-title"></h2>
            <p class="assistant-subtitle"></p>
          </div>
          <button type="button" class="assistant-close" aria-label="">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </button>
        </header>
        <div class="assistant-messages" role="log" aria-live="polite" aria-relevant="additions"></div>
        <div class="assistant-chips"></div>
        <form class="assistant-form">
          <label class="usa-sr-only" for="assistant-input"></label>
          <input id="assistant-input" class="assistant-input" type="text" maxlength="500" autocomplete="off">
          <button type="submit" class="assistant-send btn btn-primary"></button>
        </form>
      </section>
    `;

    document.body.appendChild(root);

    /* Critical layout — zichtbaar ook als style.css nog uit cache komt */
    root.style.cssText =
      'position:fixed;bottom:max(1rem,env(safe-area-inset-bottom));right:max(1rem,env(safe-area-inset-right));z-index:13000;font-family:system-ui,sans-serif;';

    panel = root.querySelector('#assistant-panel');
    toggle = root.querySelector('#assistant-toggle');
    toggle.style.cssText =
      'width:52px;height:52px;border:none;border-radius:3px;background:#B85C28;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 40px rgba(26,34,40,0.14);';
    messagesEl = root.querySelector('.assistant-messages');
    form = root.querySelector('.assistant-form');
    input = root.querySelector('#assistant-input');
    sendBtn = root.querySelector('.assistant-send');
    chipsEl = root.querySelector('.assistant-chips');

    panel.setAttribute('aria-label', 'Chat assistent');

    buildChips();
    applyI18n();

    toggle.addEventListener('click', togglePanel);
    root.querySelector('.assistant-close').addEventListener('click', closePanel);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = input.value;
      input.value = '';
      sendMessage(value);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !panel.hidden) closePanel();
    });

    document.addEventListener('langchange', applyI18n);
  }

  function initAssistant() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      /* widget still useful; only animations toned down in CSS */
    }
    loadHistory();
    buildWidget();
  }

  window.initAssistant = initAssistant;

  function bootAssistant() {
    if (document.body) initAssistant();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootAssistant);
  } else {
    bootAssistant();
  }
})();
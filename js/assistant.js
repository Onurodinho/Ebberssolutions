/**
 * Website-assistent met lead capture (naam/e-mail) + /api/assistant
 */
(function () {
  const HISTORY_KEY = 'ebbers-assistant-history';
  const VISITOR_KEY = 'ebbers-assistant-visitor';
  const MAX_HISTORY = 12;

  const FALLBACK = {
    nl: {
      'assistant.toggle': 'Open hulpchat',
      'assistant.title': 'Ebbers Assistent',
      'assistant.subtitle': 'Vraag over diensten, collectie of contact — in elke taal.',
      'assistant.intro.title': 'Even voorstellen',
      'assistant.intro.desc': 'Zo kunnen wij u persoonlijk helpen en terugkoppelen als dat nodig is.',
      'assistant.intro.name': 'Naam',
      'assistant.intro.email': 'E-mailadres',
      'assistant.intro.phone': 'Telefoon (optioneel)',
      'assistant.intro.company': 'Bedrijf (optioneel)',
      'assistant.intro.consent': 'Ik geef toestemming om mijn gegevens te gebruiken om mijn vraag te beantwoorden.',
      'assistant.intro.start': 'Start gesprek',
      'assistant.intro.required': 'Vul naam en e-mail in.',
      'assistant.intro.invalidEmail': 'Vul een geldig e-mailadres in.',
      'assistant.intro.consentRequired': 'Geef toestemming om verder te gaan.',
      'assistant.close': 'Sluit chat',
      'assistant.placeholder': 'Stel uw vraag…',
      'assistant.send': 'Verstuur',
      'assistant.thinking': 'Even nadenken…',
      'assistant.error': 'Er ging iets mis. Bel **+31 6 1390 0094** of mail **peterebbers67@gmail.com**.',
      'assistant.welcome': 'Hallo {name}! Ik help u met metaalbewerking, onze collectie of contact. Voor offertes: bel **+31 6 1390 0094** of ga naar [contact](contact.html).',
      'assistant.chip.services': 'Diensten',
      'assistant.chip.collection': 'Collectie',
      'assistant.chip.contact': 'Contact',
      'assistant.chip.phone': 'Bellen',
      'assistant.chip.email': 'E-mail',
      'assistant.changeDetails': 'Gegevens wijzigen',
    },
    en: {
      'assistant.toggle': 'Open help chat',
      'assistant.title': 'Ebbers Assistant',
      'assistant.subtitle': 'Ask about services, collection, or contact — in any language.',
      'assistant.intro.title': 'Introduce yourself',
      'assistant.intro.desc': 'So we can help you personally and follow up if needed.',
      'assistant.intro.name': 'Name',
      'assistant.intro.email': 'Email address',
      'assistant.intro.phone': 'Phone (optional)',
      'assistant.intro.company': 'Company (optional)',
      'assistant.intro.consent': 'I agree that my details may be used to answer my question.',
      'assistant.intro.start': 'Start chat',
      'assistant.intro.required': 'Please enter your name and email.',
      'assistant.intro.invalidEmail': 'Please enter a valid email address.',
      'assistant.intro.consentRequired': 'Please give consent to continue.',
      'assistant.close': 'Close chat',
      'assistant.placeholder': 'Ask your question…',
      'assistant.send': 'Send',
      'assistant.thinking': 'Thinking…',
      'assistant.error': 'Something went wrong. Call **+31 6 1390 0094** or email **peterebbers67@gmail.com**.',
      'assistant.welcome': 'Hello {name}! I can help with metalwork, our collection, or contact. For quotes, call **+31 6 1390 0094** or visit [contact](contact.html).',
      'assistant.chip.services': 'Services',
      'assistant.chip.collection': 'Collection',
      'assistant.chip.contact': 'Contact',
      'assistant.chip.phone': 'Call',
      'assistant.chip.email': 'Email',
      'assistant.changeDetails': 'Change details',
    },
    de: {
      'assistant.toggle': 'Hilfe-Chat öffnen',
      'assistant.title': 'Ebbers Assistent',
      'assistant.subtitle': 'Fragen zu Leistungen, Kollektion oder Kontakt — in jeder Sprache.',
      'assistant.intro.title': 'Kurz vorstellen',
      'assistant.intro.desc': 'Damit wir Sie persönlich unterstützen und bei Bedarf zurückmelden können.',
      'assistant.intro.name': 'Name',
      'assistant.intro.email': 'E-Mail-Adresse',
      'assistant.intro.phone': 'Telefon (optional)',
      'assistant.intro.company': 'Unternehmen (optional)',
      'assistant.intro.consent': 'Ich erlaube die Nutzung meiner Daten zur Beantwortung meiner Frage.',
      'assistant.intro.start': 'Chat starten',
      'assistant.intro.required': 'Bitte Name und E-Mail eingeben.',
      'assistant.intro.invalidEmail': 'Bitte eine gültige E-Mail-Adresse eingeben.',
      'assistant.intro.consentRequired': 'Bitte Zustimmung erteilen.',
      'assistant.close': 'Chat schließen',
      'assistant.placeholder': 'Ihre Frage…',
      'assistant.send': 'Senden',
      'assistant.thinking': 'Einen Moment…',
      'assistant.error': 'Etwas ist schiefgelaufen. Rufen Sie **+31 6 1390 0094** an oder mailen Sie **peterebbers67@gmail.com**.',
      'assistant.welcome': 'Hallo {name}! Ich helfe bei Metallarbeit, Kollektion oder Kontakt. Für Angebote: **+31 6 1390 0094** oder [Kontakt](contact.html).',
      'assistant.chip.services': 'Leistungen',
      'assistant.chip.collection': 'Kollektion',
      'assistant.chip.contact': 'Kontakt',
      'assistant.chip.phone': 'Anrufen',
      'assistant.chip.email': 'E-Mail',
      'assistant.changeDetails': 'Daten ändern',
    },
  };

  let root;
  let panel;
  let toggle;
  let introView;
  let chatView;
  let introForm;
  let introError;
  let messagesEl;
  let form;
  let input;
  let sendBtn;
  let chipsEl;
  let busy = false;
  let history = [];
  let visitor = null;

  function getLang() {
    return window.EbbersI18n ? EbbersI18n.getLang() : 'nl';
  }

  function t(key, vars) {
    const lang = getLang();
    let text = key;
    if (window.EbbersI18n) {
      const translated = EbbersI18n.t(key);
      if (translated !== key) text = translated;
    }
    if (text === key) {
      text = FALLBACK[lang]?.[key] ?? FALLBACK.nl[key] ?? key;
    }
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replaceAll(`{${k}}`, v);
      });
    }
    return text;
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

  function loadVisitor() {
    try {
      const raw = sessionStorage.getItem(VISITOR_KEY);
      visitor = raw ? JSON.parse(raw) : null;
      if (!visitor || !visitor.name || !visitor.email) visitor = null;
    } catch {
      visitor = null;
    }
  }

  function saveVisitor(data) {
    visitor = data;
    try {
      sessionStorage.setItem(VISITOR_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }

  function clearVisitor() {
    visitor = null;
    history = [];
    try {
      sessionStorage.removeItem(VISITOR_KEY);
      sessionStorage.removeItem(HISTORY_KEY);
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
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
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

  function showIntro() {
    introView.hidden = false;
    chatView.hidden = true;
  }

  function showChat() {
    introView.hidden = true;
    chatView.hidden = false;
  }

  function showInitialView() {
    if (visitor) {
      showChat();
      if (messagesEl.childElementCount === 0) {
        appendMessage('assistant', t('assistant.welcome', { name: visitor.name }));
      }
    } else {
      showIntro();
    }
  }

  function openPanel() {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('assistant-open');
    showInitialView();
    if (visitor) input.focus();
    else introForm.querySelector('[name="name"]')?.focus();
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

  async function registerLead(data) {
    try {
      await fetch('/api/assistant/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          lang: getLang(),
          page: window.location.pathname,
        }),
      });
    } catch {
      /* chat may still work */
    }
  }

  async function sendMessage(text) {
    const message = String(text || '').trim();
    if (!message || busy || !visitor) return;

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
          visitor,
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
    const phoneHref = c ? c.phoneHref : '+31613900094';
    const email = c ? c.email : 'peterebbers67@gmail.com';

    const chips = [
      { label: 'assistant.chip.services', href: 'diensten.html' },
      { label: 'assistant.chip.collection', href: 'collectie.html' },
      { label: 'assistant.chip.contact', href: 'contact.html' },
      { label: 'assistant.chip.phone', href: `tel:${phoneHref}`, contactChip: 'phone' },
      { label: 'assistant.chip.email', href: `mailto:${email}`, contactChip: 'email' },
    ];

    chipsEl.innerHTML = '';
    chips.forEach((chip) => {
      const btn = document.createElement('a');
      btn.className = 'assistant-chip';
      btn.href = chip.href;
      if (chip.contactChip) btn.dataset.contactChip = chip.contactChip;
      else btn.dataset.i18nChip = chip.label;
      chipsEl.appendChild(btn);
    });
  }

  function applyI18n() {
    if (!root) return;
    const c = contact();

    toggle.setAttribute('aria-label', t('assistant.toggle'));
    root.querySelector('[data-assistant="title"]').textContent = t('assistant.title');
    root.querySelector('[data-assistant="subtitle"]').textContent = t('assistant.subtitle');
    root.querySelector('.assistant-close').setAttribute('aria-label', t('assistant.close'));
    root.querySelector('[data-assistant="intro-title"]').textContent = t('assistant.intro.title');
    root.querySelector('[data-assistant="intro-desc"]').textContent = t('assistant.intro.desc');
    root.querySelector('[data-assistant="label-name"]').textContent = t('assistant.intro.name');
    root.querySelector('[data-assistant="label-email"]').textContent = t('assistant.intro.email');
    root.querySelector('[data-assistant="label-phone"]').textContent = t('assistant.intro.phone');
    root.querySelector('[data-assistant="label-company"]').textContent = t('assistant.intro.company');
    root.querySelector('[data-assistant="consent-text"]').textContent = t('assistant.intro.consent');
    root.querySelector('[data-assistant="start-btn"]').textContent = t('assistant.intro.start');
    root.querySelector('[data-assistant="change-btn"]').textContent = t('assistant.changeDetails');
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

  function handleIntroSubmit(e) {
    e.preventDefault();
    introError.hidden = true;

    const fd = new FormData(introForm);
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const phone = String(fd.get('phone') || '').trim();
    const company = String(fd.get('company') || '').trim();
    const consent = fd.get('consent') === 'on';

    if (name.length < 2 || !email) {
      introError.textContent = t('assistant.intro.required');
      introError.hidden = false;
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      introError.textContent = t('assistant.intro.invalidEmail');
      introError.hidden = false;
      return;
    }
    if (!consent) {
      introError.textContent = t('assistant.intro.consentRequired');
      introError.hidden = false;
      return;
    }

    const data = { name, email, phone, company };
    saveVisitor(data);
    registerLead(data);

    messagesEl.innerHTML = '';
    history = [];
    saveHistory();
    showChat();
    appendMessage('assistant', t('assistant.welcome', { name }));
    input.focus();
  }

  function handleChangeDetails() {
    clearVisitor();
    messagesEl.innerHTML = '';
    introForm.reset();
    introError.hidden = true;
    showIntro();
    introForm.querySelector('[name="name"]')?.focus();
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
      <section id="assistant-panel" class="assistant-panel" hidden>
        <header class="assistant-header">
          <div>
            <p class="assistant-eyebrow">Ebbers Solutions</p>
            <h2 class="assistant-title" data-assistant="title"></h2>
            <p class="assistant-subtitle" data-assistant="subtitle"></p>
          </div>
          <button type="button" class="assistant-close" aria-label="">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </button>
        </header>

        <div class="assistant-intro" data-assistant-view="intro">
          <h3 class="assistant-intro-title" data-assistant="intro-title"></h3>
          <p class="assistant-intro-desc" data-assistant="intro-desc"></p>
          <p class="assistant-intro-error" data-assistant="intro-error" hidden></p>
          <form class="assistant-intro-form" novalidate>
            <label class="assistant-field">
              <span data-assistant="label-name"></span>
              <input name="name" type="text" required autocomplete="name" maxlength="80">
            </label>
            <label class="assistant-field">
              <span data-assistant="label-email"></span>
              <input name="email" type="email" required autocomplete="email" maxlength="120">
            </label>
            <label class="assistant-field">
              <span data-assistant="label-phone"></span>
              <input name="phone" type="tel" autocomplete="tel" inputmode="tel" maxlength="24" placeholder="+31 6 12345678">
            </label>
            <label class="assistant-field">
              <span data-assistant="label-company"></span>
              <input name="company" type="text" autocomplete="organization" maxlength="80">
            </label>
            <label class="assistant-consent">
              <input name="consent" type="checkbox" required>
              <span data-assistant="consent-text"></span>
            </label>
            <button type="submit" class="assistant-intro-submit btn btn-primary" data-assistant="start-btn"></button>
          </form>
        </div>

        <div class="assistant-chat" data-assistant-view="chat" hidden>
          <div class="assistant-messages" role="log" aria-live="polite" aria-relevant="additions"></div>
          <div class="assistant-chips"></div>
          <button type="button" class="assistant-change" data-assistant="change-btn"></button>
          <form class="assistant-form">
            <label class="usa-sr-only" for="assistant-input">Bericht</label>
            <input id="assistant-input" class="assistant-input" type="text" maxlength="500" autocomplete="off">
            <button type="submit" class="assistant-send btn btn-primary"></button>
          </form>
        </div>
      </section>
    `;

    document.body.appendChild(root);

    root.style.cssText =
      'position:fixed;bottom:max(1rem,env(safe-area-inset-bottom));right:max(1rem,env(safe-area-inset-right));z-index:13000;font-family:system-ui,sans-serif;';

    panel = root.querySelector('#assistant-panel');
    toggle = root.querySelector('#assistant-toggle');
    toggle.style.cssText =
      'width:52px;height:52px;border:none;border-radius:3px;background:#B85C28;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 40px rgba(26,34,40,0.14);';

    introView = root.querySelector('[data-assistant-view="intro"]');
    chatView = root.querySelector('[data-assistant-view="chat"]');
    introForm = root.querySelector('.assistant-intro-form');
    introError = root.querySelector('[data-assistant="intro-error"]');
    messagesEl = root.querySelector('.assistant-messages');
    form = root.querySelector('.assistant-form');
    input = root.querySelector('#assistant-input');
    sendBtn = root.querySelector('.assistant-send');
    chipsEl = root.querySelector('.assistant-chips');

    buildChips();
    applyI18n();

    toggle.addEventListener('click', togglePanel);
    root.querySelector('.assistant-close').addEventListener('click', closePanel);
    introForm.addEventListener('submit', handleIntroSubmit);
    root.querySelector('.assistant-change').addEventListener('click', handleChangeDetails);

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

  function bootAssistant() {
    loadHistory();
    loadVisitor();
    buildWidget();
    showInitialView();
  }

  window.initAssistant = bootAssistant;

  function scheduleBoot() {
    if (window.__cmsLoaded) {
      bootAssistant();
      return;
    }
    document.addEventListener(
      'contentready',
      () => {
        bootAssistant();
      },
      { once: true },
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleBoot);
  } else {
    scheduleBoot();
  }
})();
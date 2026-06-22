function bootMain() {
  initSiteConfig();
  initImages();
  initHeader();
  initReveal();
  initStatCounters();
  initContactForm();
  initScrollTop();
  initMobileMenu();
  if (typeof initPhotoSliders === 'function') initPhotoSliders();
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.__cmsLoaded) {
    bootMain();
    return;
  }
  document.addEventListener('contentready', bootMain, { once: true });
});

function initSiteConfig() {
  if (typeof SITE_CONFIG === 'undefined') return;

  const { company, contact } = SITE_CONFIG;

  document.querySelectorAll('[data-contact]').forEach(el => {
    const key = el.dataset.contact;

    switch (key) {
      case 'street':
        el.textContent = contact.street;
        break;
      case 'postcode-city':
        el.textContent = `${contact.postcode} ${contact.city}`;
        break;
      case 'region':
        el.textContent = contact.region;
        break;
      case 'phone':
        el.textContent = contact.phone;
        el.href = `tel:${contact.phoneHref}`;
        break;
      case 'email':
        el.textContent = contact.email;
        el.href = `mailto:${contact.email}`;
        break;
      case 'hours':
        el.textContent = window.EbbersI18n ? EbbersI18n.t('config.hours') : contact.hours;
        break;
      case 'kvk':
        el.textContent = company.kvk;
        break;
      case 'tagline':
        el.textContent = window.EbbersI18n ? EbbersI18n.t('config.tagline') : company.tagline;
        break;
      case 'address-full':
        el.innerHTML = `${contact.street}<br>${contact.postcode} ${contact.city}<br>${contact.region}`;
        break;
    }
  });
}

function initImages() {
  if (typeof SITE_CONFIG === 'undefined') return;

  const { images } = SITE_CONFIG;

  if (images.workshop) {
    setImage('workshop', images.workshop, 'Werkplaats Ebbers Solutions');
  }

  if (images.hero) {
    setImage('hero', images.hero, 'Ebbers Solutions');
  }

  images.projects.forEach(project => {
    if (project.src) {
      setImage(project.id, project.src, project.alt);
    }
  });
}

function setImage(id, src, alt) {
  const placeholder = document.querySelector(`[data-image="${id}"]`);
  if (!placeholder) return;

  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  placeholder.classList.add('img-loaded');
  placeholder.replaceChildren(img);
}

function initStatCounters() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const values = document.querySelectorAll('.stat-value[data-count]');
  if (!values.length || prefersReduced) return;

  const animate = el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix ?? '';
    const prefix = el.dataset.prefix ?? '';
    const duration = 1400;
    const start = performance.now();

    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      el.innerHTML = suffix
        ? `${prefix}${current}<em>${suffix}</em>`
        : `${prefix}${current}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  values.forEach(el => observer.observe(el));
}

function initReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll('.reveal');

  if (prefersReduced) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 0);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    naam: { el: document.getElementById('naam'), error: document.getElementById('naamError'), validate: v => v.trim().length >= 2 },
    email: { el: document.getElementById('email'), error: document.getElementById('emailError'), validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    onderwerp: { el: document.getElementById('onderwerp'), error: document.getElementById('onderwerpError'), validate: v => v !== '' },
    bericht: { el: document.getElementById('bericht'), error: document.getElementById('berichtError'), validate: v => v.trim().length >= 10 },
  };

  const messages = {
    naam: () => EbbersI18n?.t('contact.form.err.name') ?? 'Vul uw naam in (minimaal 2 tekens).',
    email: () => EbbersI18n?.t('contact.form.err.email') ?? 'Vul een geldig e-mailadres in.',
    onderwerp: () => EbbersI18n?.t('contact.form.err.subject') ?? 'Kies een onderwerp.',
    bericht: () => EbbersI18n?.t('contact.form.err.message') ?? 'Vul een bericht in (minimaal 10 tekens).',
  };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    let valid = true;

    Object.entries(fields).forEach(([key, { el, error, validate }]) => {
      const value = el.value;
      const isValid = validate(value);

      const group = el.closest('.usa-form-group') || el.closest('.form-group');
      if (group) group.classList.toggle('usa-form-group--error', !isValid);
      el.classList.toggle('error', !isValid);
      error.textContent = isValid ? '' : messages[key]();
      if (!isValid) valid = false;
    });

    if (!valid) return;

    const submitBtn = form.querySelector('[type="submit"]');
    const success = document.getElementById('formSuccess');
    const errBox = document.getElementById('formError');
    if (success) success.hidden = true;
    if (errBox) errBox.hidden = true;
    const defaultLabel = submitBtn?.textContent ?? '';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = EbbersI18n?.t('contact.form.sending') ?? 'Versturen…';
    }

    try {
      const body = new URLSearchParams(new FormData(form)).toString();
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

      if (!response.ok) throw new Error('submit failed');

      if (success) {
        success.hidden = false;
        form.reset();
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } catch {
      const err = document.getElementById('formError');
      if (err) {
        err.hidden = false;
        err.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = defaultLabel;
      }
    }
  });

  Object.values(fields).forEach(({ el, error, validate }) => {
    el.addEventListener('input', () => {
      const isValid = validate(el.value);
      const group = el.closest('.usa-form-group') || el.closest('.form-group');
      const showError = !isValid && el.value !== '';
      if (group) group.classList.toggle('usa-form-group--error', showError);
      el.classList.toggle('error', showError);
      if (isValid) error.textContent = '';
    });
  });
}

function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  const toggle = () => btn.classList.toggle('visible', window.scrollY > 400);
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* Reliable mobile menu for Safari.
   Clicking the Menu button (from any scroll position) opens the drawer with the links.
   Overlay blocks background. Close works on X or overlay.
   Body scroll is locked while open.
*/
function initMobileMenu() {
  const header = document.getElementById('header');
  if (!header) return;

  const btn = header.querySelector('.usa-menu-btn');
  const nav = header.querySelector('.usa-nav');
  const close = header.querySelector('.usa-nav__close');
  const overlay = document.querySelector('.usa-overlay');

  if (!btn || !nav) return;

  nav.setAttribute('aria-hidden', 'true');

  let scrollY = 0;

  function open() {
    scrollY = window.scrollY;
    nav.classList.add('is-visible');
    nav.setAttribute('aria-hidden', 'false');
    if (overlay) overlay.classList.add('is-visible');
    document.documentElement.classList.add('mobile-menu-open');
    document.body.classList.add('mobile-menu-open');
    // Simpler lock for Safari: overflow only, no position shift (avoids "behind white screen" and jump issues)
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    btn.setAttribute('aria-expanded', 'true');

    // Force the nav to full foreground on Safari - break any stacking context
    const headerH = header.offsetHeight || 76;
    nav.style.position = 'fixed';
    nav.style.zIndex = '999999';
    nav.style.left = '0';
    nav.style.top = headerH + 'px';
    nav.style.width = '100%';
    nav.style.height = `calc(100vh - ${headerH}px)`;
    nav.style.transform = 'none';
    nav.style.opacity = '1';
    nav.style.visibility = 'visible';
    nav.style.boxShadow = '0 0 0 9999px rgba(26, 34, 40, 0.6)';
    nav.style.paddingTop = '1rem';
  }

  function closeMenu() {
    nav.classList.remove('is-visible');
    nav.setAttribute('aria-hidden', 'true');
    if (overlay) overlay.classList.remove('is-visible');
    document.documentElement.classList.remove('mobile-menu-open');
    document.body.classList.remove('mobile-menu-open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    window.scrollTo(0, scrollY);
    btn.setAttribute('aria-expanded', 'false');

    // Reset forced styles
    nav.style.position = '';
    nav.style.zIndex = '';
    nav.style.left = '';
    nav.style.top = '';
    nav.style.width = '';
    nav.style.height = '';
    nav.style.transform = '';
    nav.style.opacity = '';
    nav.style.visibility = '';
    nav.style.boxShadow = '';
    nav.style.paddingTop = '';
  }

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    if (nav.classList.contains('is-visible')) {
      closeMenu();
    } else {
      open();
    }
  }, true); // capture to beat USWDS

  if (close) close.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-visible')) {
      closeMenu();
    }
  });

  // Close after clicking a link (navigation)
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (nav.classList.contains('is-visible')) setTimeout(closeMenu, 80);
    });
  });
}

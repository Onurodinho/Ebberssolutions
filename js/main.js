function bootMain() {
  initSiteConfig();
  initImages();
  initHeader();
  initReveal();
  initStatCounters();
  initContactForm();
  initScrollTop();
  if (typeof initPhotoSliders === 'function') initPhotoSliders();
}

function bootMobileMenuEarly() {
  if (document.documentElement.dataset.mobileMenuBooted === 'true') return;
  document.documentElement.dataset.mobileMenuBooted = 'true';
  initMobileMenu();
}

document.addEventListener('DOMContentLoaded', () => {
  bootMobileMenuEarly();
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

/* Mobile menu — Safari/iOS: portal nav + overlay naar body (buiten header stacking context). */
function initMobileMenu() {
  const header = document.getElementById('header');
  if (!header || header.dataset.mobileMenuInit === 'true') return;
  header.dataset.mobileMenuInit = 'true';

  const btn = header.querySelector('.usa-menu-btn');
  const nav = header.querySelector('.usa-nav');
  const close = nav?.querySelector('.usa-nav__close');
  const overlay = document.querySelector('.usa-overlay');

  if (!btn || !nav) return;

  const mobileMq = window.matchMedia('(max-width: 63.99em)');
  const navHome = { parent: nav.parentNode, next: nav.nextSibling, marker: null };
  const overlayHome = overlay
    ? { parent: overlay.parentNode, next: overlay.nextSibling, marker: null }
    : null;

  let scrollY = 0;
  let openState = false;

  nav.setAttribute('aria-hidden', 'true');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('type', 'button');

  function headerOffset() {
    return header.getBoundingClientRect().height || 76;
  }

  function portalEl(el, home) {
    if (!el || el.parentNode === document.body) return;
    const marker = document.createComment('portal');
    home.parent.insertBefore(marker, home.next);
    document.body.appendChild(el);
    home.marker = marker;
  }

  function restoreEl(el, home) {
    if (!el || !home?.marker?.parentNode) return;
    home.marker.parentNode.insertBefore(el, home.marker);
    home.marker.remove();
    home.marker = null;
  }

  function lockScroll() {
    scrollY = window.scrollY;
    document.documentElement.classList.add('mobile-menu-open');
    document.body.classList.add('mobile-menu-open');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  }

  function unlockScroll() {
    document.documentElement.classList.remove('mobile-menu-open');
    document.body.classList.remove('mobile-menu-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, scrollY);
  }

  function open() {
    if (!mobileMq.matches || openState) return;
    openState = true;

    const top = headerOffset();
    document.documentElement.style.setProperty('--mobile-nav-top', `${top}px`);

    portalEl(overlay, overlayHome);
    portalEl(nav, navHome);

    nav.classList.add('is-visible', 'mobile-nav-portal');
    nav.setAttribute('aria-hidden', 'false');
    if (overlay) overlay.classList.add('is-visible', 'mobile-overlay-portal');
    lockScroll();
    btn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    if (!openState) return;
    openState = false;

    nav.classList.remove('is-visible', 'mobile-nav-portal');
    nav.setAttribute('aria-hidden', 'true');
    if (overlay) overlay.classList.remove('is-visible', 'mobile-overlay-portal');
    unlockScroll();
    btn.setAttribute('aria-expanded', 'false');

    restoreEl(nav, navHome);
    restoreEl(overlay, overlayHome);
  }

  function toggleMenu(e) {
    if (!mobileMq.matches) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    if (openState) closeMenu();
    else open();
  }

  btn.addEventListener('click', toggleMenu, true);

  if (close) close.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && openState) closeMenu();
  });

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (openState) setTimeout(closeMenu, 80);
    });
  });

  mobileMq.addEventListener('change', (e) => {
    if (!e.matches && openState) closeMenu();
  });

  window.addEventListener('resize', () => {
    if (openState) document.documentElement.style.setProperty('--mobile-nav-top', `${headerOffset()}px`);
  });
}

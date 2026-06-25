function bootMain() {
  initSiteConfig();
  initImages();
  initHeader();
  initReveal();
  initStatCounters();
  initContactForm();
  initScrollTop();
  initServiceIndex();
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

document.addEventListener('cmsready', () => {
  initSiteConfig();
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
      const payload = Object.fromEntries(new FormData(form).entries());
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
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

/* Mobiel: vaste extended header — nav-links altijd zichtbaar (geen hamburger). */
function initMobileMenu() {
  const header = document.getElementById('header');
  if (!header || header.dataset.mobileMenuInit === 'true') return;
  header.dataset.mobileMenuInit = 'true';

  const nav = header.querySelector('.usa-nav');
  if (!nav) return;

  const mobileMq = window.matchMedia('(max-width: 63.99em)');

  function syncBarNav() {
    if (!mobileMq.matches) return;
    nav.classList.remove('is-visible');
    nav.setAttribute('aria-hidden', 'false');
  }

  function scrollActiveNavIntoView() {
    if (!mobileMq.matches) return;
    const current = nav.querySelector('.usa-nav__primary .usa-current');
    const list = nav.querySelector('.usa-nav__primary');
    if (!current || !list) return;
    const left = current.offsetLeft - (list.clientWidth - current.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }

  syncBarNav();
  scrollActiveNavIntoView();
  mobileMq.addEventListener('change', () => {
    syncBarNav();
    scrollActiveNavIntoView();
  });

  // USWDS zet nav soms terug op hidden — forceer zichtbaar op mobiel
  const guard = new MutationObserver(() => {
    syncBarNav();
    scrollActiveNavIntoView();
  });
  guard.observe(nav, { attributes: true, attributeFilter: ['aria-hidden', 'class'] });
}

function initServiceIndex() {
  const bar = document.querySelector('.service-index');
  if (!bar) return;

  const pairs = [...bar.querySelectorAll('.service-index-link')]
    .map(link => ({
      link,
      section: document.querySelector(link.getAttribute('href')),
    }))
    .filter(p => p.section);

  if (!pairs.length) return;

  const offset = () => {
    const header = document.getElementById('header');
    return (header?.offsetHeight ?? 0) + bar.offsetHeight + 12;
  };

  let ticking = false;
  let lastActiveLink = null;

  const scrollTabIntoView = link => {
    if (!window.matchMedia('(max-width: 63.99em)').matches) return;
    const list = bar.querySelector('.container');
    if (!list || !link) return;
    const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  };

  const update = () => {
    ticking = false;
    const y = offset();
    let active = pairs[0];
    pairs.forEach(pair => {
      if (pair.section.getBoundingClientRect().top <= y) active = pair;
    });
    pairs.forEach(({ link }) => link.classList.toggle('is-active', link === active.link));

    if (active.link !== lastActiveLink) {
      lastActiveLink = active.link;
      scrollTabIntoView(active.link);
    }
  };

  pairs.forEach(({ link }) => {
    link.addEventListener('click', () => scrollTabIntoView(link));
  });

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  update();
}

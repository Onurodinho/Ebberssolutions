document.addEventListener('DOMContentLoaded', () => {
  initSiteConfig();
  initImages();
  initHeader();
  initReveal();
  initContactForm();
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
        el.textContent = contact.hours;
        break;
      case 'kvk':
        el.textContent = company.kvk;
        break;
      case 'tagline':
        el.textContent = company.tagline;
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
    header.classList.toggle('scrolled', window.scrollY > 20);
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
    naam: 'Vul uw naam in (minimaal 2 tekens).',
    email: 'Vul een geldig e-mailadres in.',
    onderwerp: 'Kies een onderwerp.',
    bericht: 'Vul een bericht in (minimaal 10 tekens).',
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    Object.entries(fields).forEach(([key, { el, error, validate }]) => {
      const value = el.value;
      const isValid = validate(value);

      const group = el.closest('.usa-form-group') || el.closest('.form-group');
      if (group) group.classList.toggle('usa-form-group--error', !isValid);
      el.classList.toggle('error', !isValid);
      error.textContent = isValid ? '' : messages[key];
      if (!isValid) valid = false;
    });

    if (!valid) return;

    const success = document.getElementById('formSuccess');
    if (success) {
      success.hidden = false;
      form.reset();
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
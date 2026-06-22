/**
 * Photo slider — auto-rotating crossfade carousel (5s).
 * Geen externe CDN — werkt op Cloudflare Workers static assets.
 */
const SLIDER_DEFAULT_INTERVAL = 5000;

function initPhotoSliders() {
  document.querySelectorAll('.photo-slider').forEach(initPhotoSlider);
  document.addEventListener('langchange', refreshAllSliderCaptions);
}

function refreshAllSliderCaptions() {
  document.querySelectorAll('.photo-slider[data-slider-init="true"]').forEach(updateSliderCaption);
}

function initPhotoSlider(root) {
  if (root.dataset.sliderInit === 'true') return;
  root.dataset.sliderInit = 'true';

  const slides = [...root.querySelectorAll('.photo-slider__slide')];
  if (!slides.length) return;

  slides.forEach((slide, index) => {
    slide.classList.toggle('is-active', index === 0);
  });

  updateSliderCaption(root);

  if (slides.length < 2) return;

  const interval = parseInt(root.dataset.interval, 10) || SLIDER_DEFAULT_INTERVAL;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) return;

  const dotsWrap = root.querySelector('.photo-slider__dots');
  const dots = [];

  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'photo-slider__dot' + (index === 0 ? ' is-active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      dot.setAttribute('aria-label', `Afbeelding ${index + 1} van ${slides.length}`);
      dot.addEventListener('click', () => goTo(index, true));
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });
  }

  let current = 0;
  let timer = null;
  let paused = false;

  function goTo(index, userInitiated = false) {
    const next = ((index % slides.length) + slides.length) % slides.length;
    if (next === current) return;

    slides[current].classList.remove('is-active');
    slides[next].classList.add('is-active');
    current = next;

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
      dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
    });

    updateSliderCaption(root);
    restartProgress(root, interval);

    if (userInitiated) resetTimer();
  }

  function next() {
    if (!paused) goTo(current + 1);
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, interval);
  }

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (canHover) {
    root.addEventListener('mouseenter', () => { paused = true; });
    root.addEventListener('mouseleave', () => { paused = false; });
  }

  root.addEventListener('focusin', e => {
    if (e.target.closest('.photo-slider__dot')) paused = true;
  });
  root.addEventListener('focusout', e => {
    if (!root.contains(e.relatedTarget)) paused = false;
  });

  restartProgress(root, interval);
  resetTimer();
}

function restartProgress(root, interval) {
  const bar = root.querySelector('.photo-slider__progress span');
  if (!bar) return;

  bar.style.animation = 'none';
  void bar.offsetWidth;
  bar.style.animation = `slider-progress ${interval}ms linear forwards`;
}

function updateSliderCaption(root) {
  const active = root.querySelector('.photo-slider__slide.is-active');
  if (!active) return;

  const card = root.closest('[data-slider-root]')?.querySelector('[data-slider-caption]')
    ?? root.querySelector('[data-slider-caption]');
  if (!card) return;

  const productId = active.dataset.productId;
  const category = active.dataset.category;
  const i18n = window.EbbersI18n;

  const catEl = card.querySelector('[data-slider-cat]');
  const titleEl = card.querySelector('[data-slider-title]');
  const descEl = card.querySelector('[data-slider-desc]');

  if (catEl && category) {
    catEl.textContent = i18n?.cat ? i18n.cat(category) : category;
  }

  if (titleEl && productId) {
    const title = i18n?.product?.(productId, 'title') ?? active.dataset.title ?? '';
    if (title) titleEl.textContent = title;
  }

  if (descEl && productId) {
    const desc = i18n?.product?.(productId, 'desc') ?? active.dataset.desc ?? '';
    if (desc) descEl.textContent = desc;
  }

  const tagEl = root.closest('[data-slider-root]')?.querySelector('[data-slider-tag]');
  if (tagEl && active.dataset.tag) {
    tagEl.textContent = active.dataset.tag;
  }
}

window.initPhotoSliders = initPhotoSliders;
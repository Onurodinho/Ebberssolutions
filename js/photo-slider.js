/**
 * Photo sliders using Swiper plugin (CDN).
 * 5s auto rotate with fade, works on mobile Safari.
 * Old custom code removed.
 */
function initPhotoSliders() {
  if (typeof Swiper === 'undefined') {
    // fallback vanilla
    document.querySelectorAll('.photo-slider').forEach(root => {
      const slides = [...root.querySelectorAll('.photo-slider__slide')];
      if (slides.length < 2) return;
      let i = 0;
      setInterval(() => {
        slides.forEach(s => s.classList.remove('is-active'));
        slides[i].classList.add('is-active');
        i = (i + 1) % slides.length;
      }, 5000);
    });
    return;
  }

  document.querySelectorAll('.photo-slider').forEach(el => {
    if (el.swiper) return;

    const hasCaption = !!el.closest('[data-slider-root]') || !!el.querySelector('[data-slider-caption]');

    new Swiper(el, {
      wrapperClass: 'photo-slider__track',
      slideClass: 'photo-slider__slide',
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },
      loop: true,
      speed: 1100,
      keyboard: { enabled: true },
      pagination: el.querySelector('.photo-slider__dots') ? {
        el: el.querySelector('.photo-slider__dots'),
        clickable: true,
        bulletClass: 'photo-slider__dot',
        bulletActiveClass: 'is-active'
      } : false,
      on: {
        slideChange(swiper) {
          if (hasCaption) syncCaption(el, swiper);
          // Ensure custom .is-active class is toggled for existing CSS (opacity, pop effect)
          const allSlides = el.querySelectorAll('.photo-slider__slide');
          allSlides.forEach((s, idx) => {
            s.classList.toggle('is-active', idx === swiper.activeIndex);
          });
        },
        init(swiper) {
          // Initial active
          const allSlides = el.querySelectorAll('.photo-slider__slide');
          allSlides.forEach((s, idx) => {
            s.classList.toggle('is-active', idx === swiper.activeIndex);
          });
        }
      }
    });

    const prog = el.querySelector('.photo-slider__progress');
    if (prog) prog.style.display = 'none';
  });
}

function syncCaption(root, swiper) {
  const slide = swiper.slides[swiper.activeIndex];
  if (!slide) return;
  const card = root.closest('[data-slider-root]')?.querySelector('[data-slider-caption]') || root.querySelector('[data-slider-caption]');
  if (!card) return;

  const i18n = window.EbbersI18n;
  const catEl = card.querySelector('[data-slider-cat]');
  const titleEl = card.querySelector('[data-slider-title]');
  const descEl = card.querySelector('[data-slider-desc]');
  const tagEl = root.closest('[data-slider-root]')?.querySelector('[data-slider-tag]');

  if (catEl && slide.dataset.category) catEl.textContent = i18n?.cat(slide.dataset.category) || slide.dataset.category;
  if (titleEl && slide.dataset.productId) titleEl.textContent = i18n?.product?.(slide.dataset.productId, 'title') || slide.dataset.title || '';
  if (descEl && slide.dataset.productId) descEl.textContent = i18n?.product?.(slide.dataset.productId, 'desc') || slide.dataset.desc || '';
  if (tagEl && slide.dataset.tag) tagEl.textContent = slide.dataset.tag;
}

window.initPhotoSliders = initPhotoSliders;
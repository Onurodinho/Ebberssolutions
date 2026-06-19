document.addEventListener('DOMContentLoaded', async () => {
  await initGallery();
  initLightbox();
});

async function initGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  try {
    const res = await fetch('assets/images/products/manifest.json');
    const items = await res.json();
    grid.innerHTML = items.map((item, i) => `
      <button class="gallery-item${i === 0 ? ' gallery-item--featured' : ''}" type="button"
        data-full="${item.src}" data-alt="${item.alt}" aria-label="${item.alt}">
        <img src="${item.thumb}" alt="${item.alt}" loading="lazy" width="640" height="480">
        <span class="gallery-item-overlay">
          <span class="gallery-zoom">Bekijk</span>
        </span>
      </button>
    `).join('');
  } catch {
    grid.innerHTML = '<p class="gallery-error">Galerij kon niet geladen worden.</p>';
  }
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const img = lightbox.querySelector('.lightbox-img');
  const caption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let items = [];
  let current = 0;

  const open = index => {
    if (!items.length) return;
    current = index;
    const item = items[current];
    img.src = item.full;
    img.alt = item.alt;
    caption.textContent = item.alt;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    img.src = '';
  };

  const step = dir => {
    current = (current + dir + items.length) % items.length;
    open(current);
  };

  document.addEventListener('click', e => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;

    items = [...document.querySelectorAll('.gallery-item')].map(el => ({
      full: el.dataset.full,
      alt: el.dataset.alt,
    }));
    const index = items.findIndex(i => i.full === item.dataset.full);
    open(index >= 0 ? index : 0);
  });

  closeBtn?.addEventListener('click', close);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
  prevBtn?.addEventListener('click', () => step(-1));
  nextBtn?.addEventListener('click', () => step(1));

  document.addEventListener('keydown', e => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
}
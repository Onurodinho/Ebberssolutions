async function bootGallery() {
  await initGallery();
  initLightbox();
  initFilter();
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.__cmsLoaded) {
    bootGallery();
    return;
  }
  document.addEventListener('contentready', bootGallery, { once: true });
});

document.addEventListener('langchange', () => {
  const grid = document.getElementById('galleryGrid');
  const filtered = activeFilter === 'alles' ? allItems : allItems.filter(i => i.category === activeFilter);
  renderGallery(filtered, grid);
  updateFilterCounts();
  updateGalleryCount(filtered.length);
});

let allItems = [];
let activeFilter = 'alles';

function normalizeImagePath(path) {
  if (!path) return path;
  if (path.startsWith('assets/')) return path;
  if (path.startsWith('/assets/')) return path.slice(1);
  return `assets/images/products/${path.replace(/^\//, '')}`;
}

function normalizeManifest(data) {
  const items = Array.isArray(data) ? data : data.products || [];
  return items.map(item => ({
    ...item,
    src: normalizeImagePath(item.src),
    thumb: normalizeImagePath(item.thumb || item.src),
  }));
}

async function initGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  try {
    const res = await fetch('assets/images/products/manifest.json');
    const data = await res.json();
    allItems = normalizeManifest(data);
    renderGallery(allItems, grid);
    updateFilterCounts();
    updateGalleryCount(allItems.length);
  } catch {
    grid.innerHTML = `<p class="gallery-error">${getT('collectie.error')}</p>`;
  }
}

function getT(key) {
  return window.EbbersI18n?.t(key) ?? key;
}

function getCatLabel(cat) {
  return window.EbbersI18n?.cat(cat) ?? cat;
}

function getProductField(item, field) {
  const translated = window.EbbersI18n?.product(item.id, field);
  return translated || item[field] || item.alt;
}

function renderGallery(items, grid) {
  if (!grid) return;

  const featuredIndex = items.findIndex(item => item.featured);
  const featuredAt = featuredIndex >= 0 ? featuredIndex : 0;

  grid.innerHTML = items.map((item, i) => {
    const cat = item.category || 'details';
    const catLabel = getCatLabel(cat);
    const title = getProductField(item, 'title') || item.alt;
    const desc = getProductField(item, 'desc') || item.desc || '';

    return `
    <button class="gallery-item${i === featuredAt && activeFilter === 'alles' ? ' gallery-item--featured' : ''}" type="button"
      data-full="${item.src}" data-alt="${item.alt}" data-category="${cat}"
      data-title="${title}" aria-label="${item.alt}">
      <img src="${item.thumb}" alt="${item.alt}" loading="${i < 4 ? 'eager' : 'lazy'}" width="640" height="480">
      <span class="gallery-item-tag">${catLabel}</span>
      <span class="gallery-item-info">
        <span class="gallery-item-title">${title}</span>
        ${desc ? `<span class="gallery-item-desc">${desc}</span>` : ''}
      </span>
      <span class="gallery-item-overlay">
        <span class="gallery-zoom">${getT('common.zoom')}</span>
      </span>
    </button>`;
  }).join('');
}

function updateFilterCounts() {
  const filterBar = document.getElementById('galleryFilter');
  if (!filterBar) return;

  const counts = {
    alles: allItems.length,
    tafels: allItems.filter(i => i.category === 'tafels').length,
    stoelen: allItems.filter(i => i.category === 'stoelen').length,
    banken: allItems.filter(i => i.category === 'banken').length,
    details: allItems.filter(i => i.category === 'details').length,
  };

  filterBar.querySelectorAll('.filter-btn').forEach(btn => {
    const cat = btn.dataset.filter;
    const count = counts[cat] ?? 0;
    const label = getCatLabel(cat);
    btn.textContent = `${label} (${count})`;
  });
}

function updateGalleryCount(count) {
  const el = document.getElementById('galleryCount');
  if (!el) return;
  el.textContent = `${count} ${count === 1 ? getT('common.product') : getT('common.products')}`;
}

function initFilter() {
  const filterBar = document.getElementById('galleryFilter');
  if (!filterBar) return;

  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    activeFilter = btn.dataset.filter;
    const grid = document.getElementById('galleryGrid');
    const filtered = activeFilter === 'alles'
      ? allItems
      : allItems.filter(i => i.category === activeFilter);

    renderGallery(filtered, grid);
    updateGalleryCount(filtered.length);
  });
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
    const title = item.title ? `${item.title} — ` : '';
    caption.textContent = `${title}${item.alt} · ${current + 1} / ${items.length}`;
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
      title: el.dataset.title,
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
function normalizeImagePath(path) {
  if (!path) return path;
  if (path.startsWith('assets/')) return path;
  if (path.startsWith('/assets/')) return path.slice(1);
  return `assets/images/products/${path.replace(/^\//, '')}`;
}

function normalizeManifestItems(data) {
  const items = Array.isArray(data) ? data : data.products || [];
  return items.map(item => ({
    ...item,
    src: normalizeImagePath(item.src),
    thumb: normalizeImagePath(item.thumb || item.src),
  }));
}

function scheduleHomeCollection() {
  initHomeCollection();
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.__cmsLoaded) {
    scheduleHomeCollection();
    return;
  }
  document.addEventListener('contentready', scheduleHomeCollection, { once: true });
});

document.addEventListener('langchange', initHomeCollection);

function updateProductCounts(count) {
  if (!count || typeof I18N_STRINGS === 'undefined') return;
  I18N_STRINGS.nl['cta.allProducts'] = `Alle ${count} producten bekijken`;
  I18N_STRINGS.en['cta.allProducts'] = `View all ${count} products`;
  I18N_STRINGS.de['cta.allProducts'] = `Alle ${count} Produkte ansehen`;
  if (window.EbbersI18n) {
    document.querySelectorAll('[data-i18n="cta.allProducts"]').forEach((el) => {
      el.textContent = window.EbbersI18n.t('cta.allProducts');
    });
  }
}

async function initHomeCollection() {
  const grid = document.getElementById('homeCollection');
  if (!grid) return;

  try {
    const res = await fetch('assets/images/products/manifest.json');
    const data = await res.json();
    const items = normalizeManifestItems(data);
    updateProductCounts(items.length);
    const preview = pickPreviewItems(items, 4);
    grid.innerHTML = preview.map((item, i) => renderPreviewCard(item, i === 0)).join('');
  } catch {
    grid.innerHTML = `
      <a href="collectie.html" class="project-card project-card--featured">
        <img src="assets/images/products/thumbs/product-02.jpg" alt="Eettafel met ijzeren frame" loading="lazy">
      </a>`;
  }
}

function pickPreviewItems(items, count) {
  const featured = items.find(i => i.featured) || items[0];
  const rest = items.filter(i => i.id !== featured.id);
  const categories = ['banken', 'stoelen', 'tafels', 'details'];

  const picked = [featured];
  categories.forEach(cat => {
    const match = rest.find(i => i.category === cat && !picked.includes(i));
    if (match) picked.push(match);
  });

  while (picked.length < count) {
    const next = rest.find(i => !picked.includes(i));
    if (!next) break;
    picked.push(next);
  }

  return picked.slice(0, count);
}

function renderPreviewCard(item, featured) {
  const cat = window.EbbersI18n?.cat(item.category) ?? item.category;
  const title = window.EbbersI18n?.product(item.id, 'title') || item.title || item.alt;
  const desc = window.EbbersI18n?.product(item.id, 'desc') || item.desc || '';
  const customLabel = window.EbbersI18n?.t('home.collection.customBadge') ?? 'Op maat';

  return `
    <a href="collectie.html" class="project-card${featured ? ' project-card--featured' : ''}">
      <img src="${item.thumb}" alt="${item.alt}" loading="${featured ? 'eager' : 'lazy'}">
      <span class="project-card-badge">${customLabel}</span>
      <span class="project-card-tag">${cat}</span>
      <span class="project-card-info">
        <span class="project-card-title">${title}</span>
        ${desc ? `<span class="project-card-desc">${desc}</span>` : ''}
      </span>
    </a>`;
}
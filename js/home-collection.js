const HOME_CATEGORY_LABELS = {
  tafels: 'Tafels',
  stoelen: 'Stoelen',
  details: 'Details',
};

document.addEventListener('DOMContentLoaded', initHomeCollection);

async function initHomeCollection() {
  const grid = document.getElementById('homeCollection');
  if (!grid) return;

  try {
    const res = await fetch('assets/images/products/manifest.json');
    const items = await res.json();
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
  const categories = ['stoelen', 'tafels', 'details'];

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
  const cat = HOME_CATEGORY_LABELS[item.category] || 'Details';
  const title = item.title || item.alt;

  return `
    <a href="collectie.html" class="project-card${featured ? ' project-card--featured' : ''}">
      <img src="${item.thumb}" alt="${item.alt}" loading="${featured ? 'eager' : 'lazy'}">
      <span class="project-card-tag">${cat}</span>
      <span class="project-card-info">
        <span class="project-card-title">${title}</span>
        ${item.desc ? `<span class="project-card-desc">${item.desc}</span>` : ''}
      </span>
    </a>`;
}
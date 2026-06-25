/**
 * Laadt beheerbare content uit content/*.json (Decap CMS).
 * Overschrijft defaults uit config.js en i18n.js per taal.
 * Pagina start direct; CMS-overrides volgen op de achtergrond.
 */
(function () {
  function mapCmsContent(data) {
    if (!data) return {};
    const h = data.homepage || {};
    const hero = h.hero || {};
    const diensten = h.diensten || {};
    const over = h.over_ons || {};
    const collectie = h.collectie || {};
    const cta = h.cta || {};
    const algemeen = data.algemeen || {};
    const contact = data.contact || {};
    const recensies = data.recensies || {};

    return {
      'config.tagline': algemeen.tagline,
      'config.hours': algemeen.openingstijden,
      'home.hero.eyebrow': hero.eyebrow,
      'home.hero.title': hero.titel,
      'home.hero.lead': hero.intro,
      'home.hero.trust1.title': hero.trust1_titel,
      'home.hero.trust1.desc': hero.trust1_tekst,
      'home.hero.trust2.title': hero.trust2_titel,
      'home.hero.trust2.desc': hero.trust2_tekst,
      'home.hero.trust3.title': hero.trust3_titel,
      'home.hero.trust3.desc': hero.trust3_tekst,
      'home.services.label': diensten.label,
      'home.services.title': diensten.titel,
      'home.services.desc': diensten.intro,
      'home.services.s1.title': diensten.onderhoud_titel,
      'home.services.s1.desc': diensten.onderhoud_tekst,
      'home.services.s2.title': diensten.constructie_titel,
      'home.services.s2.desc': diensten.constructie_tekst,
      'home.services.s3.title': diensten.bewerking_titel,
      'home.services.s3.desc': diensten.bewerking_tekst,
      'home.about.label': over.label,
      'home.about.title': over.titel,
      'home.about.desc': over.intro,
      'home.about.p1': over.punt1,
      'home.about.p2': over.punt2,
      'home.about.p3': over.punt3,
      'home.collection.label': collectie.label,
      'home.collection.title': collectie.titel,
      'home.collection.desc': collectie.intro,
      'home.cta.title': cta.titel,
      'home.cta.desc': cta.tekst,
      'contact.hero.desc': contact.intro,
      'home.reviews.label': recensies.label,
      'home.reviews.title': recensies.titel,
      'home.reviews.note': recensies.notitie,
    };
  }

  function applySettings(data) {
    if (!data || typeof SITE_CONFIG === 'undefined') return;
    if (data.company) Object.assign(SITE_CONFIG.company, data.company);
    if (data.contact) Object.assign(SITE_CONFIG.contact, data.contact);
  }

  function applyLangStrings(lang, data) {
    if (!data || typeof I18N_STRINGS === 'undefined' || !I18N_STRINGS[lang]) return;
    const mapped = mapCmsContent(data);
    Object.entries(mapped).forEach(([key, value]) => {
      if (value != null && value !== '' && I18N_STRINGS[lang][key] !== undefined) {
        I18N_STRINGS[lang][key] = value;
      }
    });
  }

  function updateProductCounts(count) {
    if (!count || typeof I18N_STRINGS === 'undefined') return;
    I18N_STRINGS.nl['cta.allProducts'] = `Alle ${count} producten bekijken`;
    I18N_STRINGS.en['cta.allProducts'] = `View all ${count} products`;
    I18N_STRINGS.de['cta.allProducts'] = `Alle ${count} Produkte ansehen`;
  }

  async function loadManifestCount() {
    try {
      const res = await fetch('assets/images/products/manifest.json');
      if (!res.ok) return;
      const data = await res.json();
      const items = Array.isArray(data) ? data : data.products;
      if (Array.isArray(items)) updateProductCounts(items.length);
    } catch {
      /* fallback naar i18n defaults */
    }
  }

  async function loadCmsContent() {
    const [settingsRes, nlRes, enRes, deRes] = await Promise.allSettled([
      fetch('content/settings.json').then(r => (r.ok ? r.json() : null)),
      fetch('content/nl.json').then(r => (r.ok ? r.json() : null)),
      fetch('content/en.json').then(r => (r.ok ? r.json() : null)),
      fetch('content/de.json').then(r => (r.ok ? r.json() : null)),
    ]);

    if (settingsRes.status === 'fulfilled' && settingsRes.value) {
      applySettings(settingsRes.value);
    }
    if (nlRes.status === 'fulfilled' && nlRes.value) {
      applyLangStrings('nl', nlRes.value);
    }
    if (enRes.status === 'fulfilled' && enRes.value) {
      applyLangStrings('en', enRes.value);
    }
    if (deRes.status === 'fulfilled' && deRes.value) {
      applyLangStrings('de', deRes.value);
    }

    await loadManifestCount();
  }

  function boot() {
    try {
      if (typeof initI18n === 'function') initI18n();
    } catch (err) {
      console.error('Ebbers: i18n init mislukt', err);
    }

    window.__cmsLoaded = true;
    document.dispatchEvent(new CustomEvent('contentready'));

    loadCmsContent()
      .then(() => {
        const lang = window.EbbersI18n ? window.EbbersI18n.getLang() : 'nl';
        if (window.EbbersI18n) window.EbbersI18n.apply(lang, { silent: true });
        if (typeof initSiteConfig === 'function') initSiteConfig();
      })
      .catch((err) => console.error('Ebbers: CMS laden mislukt', err));
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
# Ebbers Solutions — Shared Context

Gedeelde taal voor mensen en AI-agents. Lees dit vóór wijzigingen aan de site. Visuele regels staan in `DESIGN.md`.

## Wat dit project is

**Ebbers Solutions** is een statische bedrijfssite voor een metaalwerkplaats in Neede (Achterhoek): B2B (constructie, metaalbewerking, machine-onderhoud) en B2C (handgemaakte ijzer/hout-meubels).

- **Live:** https://ebberssolutions.com
- **Stack:** HTML + CSS + vanilla JS + USWDS 3.9.0 — geen React/Next.js
- **Deploy:** Netlify (`npm run deploy`)
- **Preview:** `python3 -m http.server 8080` → http://127.0.0.1:8080

## Domain terms (gebruik deze woorden)

| Term | Betekenis |
|------|-----------|
| **Werkplaats Precision** | Het design-systeem: warm beton, staal, koper, ambachtelijk — geen corporate SaaS-look |
| **Studio frame** | Fotorahmen waarin productfoto's **volledig** zichtbaar zijn (`object-fit: contain`, nooit croppen in hero) |
| **Photo slider** | Auto-rotatie carousel (5s interval, crossfade, pauze bij hover/focus) — `js/photo-slider.js` |
| **Collectie** | Handgemaakte meubels; data uit `assets/images/products/manifest.json` |
| **Op maat** | Elk meubel aanpasbaar op afmeting, houtsoort, design — badge op preview- en gallery-cards |
| **Lasnaad** | Diagonale koperen accentlijn (`.weld-seam`) — signature-motief |
| **Bento** | Diensten-preview grid op homepage (`.bento-grid`, featured card donker) |
| **Manifest** | `manifest.json` — product-id, category, thumb, src, alt, title, desc |
| **Site config** | `js/config.js` — enige plek voor telefoon, adres, KVK (`data-contact` in HTML) |
| **i18n** | NL/EN/DE via `js/i18n.js`; strings in `EbbersI18n`, producten per id |
| **Content loader** | `js/content-loader.js` — optioneel CMS uit `content/settings.json` via `/admin` |

## Pagina's

| Pagina | Rol |
|--------|-----|
| `index.html` | Hero + stats + bento + werkwijze + testimonial + about-preview + collectie-preview |
| `diensten.html` | Drie diensten met page-hero slider en service-sliders |
| `collectie.html` | Volledige gallery + lightbox + filters (`js/gallery.js`) |
| `over-ons.html` | Verhaal, waarden, stats-band, werkplaats-slider |
| `contact.html` | Formulier (Netlify Forms POST), kaart, contactinfo |

## Script boot order

1. USWDS init
2. `config.js` → `i18n.js` → `content-loader.js` (event `contentready`)
3. `photo-slider.js` → `main.js` (`bootMain`)
4. Pagina-specifiek: `home-collection.js` (index), `gallery.js` (collectie)

## Harde regels

- **Geen** React, Next.js, Tailwind, of build-step voor de site
- **Geen** `object-fit: cover` op hero/productframes — altijd **contain**
- **Geen** stockfoto's, fake contactgegevens, of donkere generic AI-templates
- **USWDS** header/mobiel menu niet breken — overrides onderaan `css/style.css`
- Slider-interval overal **5000ms**
- `prefers-reduced-motion`: sliders en stat-counters uit
- Header/footer zijn **gedupliceerd** per HTML-pagina (bewust, static site)

## Belangrijke bestanden

```
DESIGN.md              → visuele tokens en do's/don'ts
CLAUDE-DESIGN-BRIEF.md → uitgebreide projectbrief voor agents
css/style.css          → alle styling + :root tokens
js/config.js           → bedrijfs- en contactconfig
js/photo-slider.js     → sliders
js/gallery.js          → collectie + lightbox
js/home-collection.js  → homepage collectie-preview
assets/images/products/manifest.json → productcatalogus
netlify.toml           → headers, redirects, manifest MIME
```

## Openstaand (content, niet verzinnen)

- Echt telefoonnummer in `js/config.js` (nu placeholder)
- Recensiesectie op homepage (`#recensies`) — kop staat, inhoud volgt; invullen in `home.reviews.*` (i18n.js)
- Echt logo als SVG beschikbaar is

## Agent workflow (aanbevolen)

1. Lees `CONTEXT.md` + `DESIGN.md` (+ `skills/ebbers-site/SKILL.md`)
2. Bij grote wijziging: stel eerst verduidelijkende vragen (grill)
3. Werk alleen in relevante HTML/CSS/JS — geen scope creep
4. Test mobiel menu na header-wijzigingen
5. Hard refresh op localhost na CSS/JS-wijzigingen
6. Skip-link (`#main`) en `prefers-reduced-motion` respecteren
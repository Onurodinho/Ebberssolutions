# Ebbers Solutions — Design-brief voor Claude

## Wat dit is

Statische bedrijfswebsite voor **Ebbers Solutions** (metaalbewerking + handgemaakte ijzeren meubels), Neede, Achterhoek.

- **Live:** https://ebbers-solutions.netlify.app
- **Repo (privé):** https://github.com/Onurodinho/Ebberssolutions
- **Lokaal:** `/Users/onurtastan/ebbers-solutions/`

De site **werkt en staat online**. Jouw taak is vooral **visuele polish en design-verbetering** — niet opnieuw bouwen vanaf nul.

---

## Tech (NIET wijzigen zonder overleg)

- Puur **HTML + CSS + vanilla JS** — geen React, Next.js, of build-tooling
- **USWDS 3.9.0** lokaal in `assets/uswds/dist/` — mobiel menu, formulieren, accessibility
- **Contactgegevens** alleen aanpassen in `js/config.js` (HTML gebruikt `data-contact` attributen)
- **Pagina's:** `index.html`, `diensten.html`, `collectie.html`, `over-ons.html`, `contact.html`
- **Styling:** `css/style.css` (design tokens in `:root`)
- **Scripts:** `js/main.js`, `js/gallery.js`, `js/config.js`
- **Collectie:** 16 productfoto's (`assets/images/products/product-01..16.jpg` + thumbs), `manifest.json`, lightbox in `gallery.js`

Preview lokaal:

```bash
cd /Users/onurtastan/ebbers-solutions && python3 -m http.server 8080
```

Deploy na wijzigingen:

```bash
git add . && git commit -m "design: ..." && git push
npm run deploy
```

---

## Bedrijfsgegevens (echt — niet verzinnen)

| | |
|---|---|
| Naam | Ebbers Solutions |
| KVK | 68518102 |
| Sinds | 2017 |
| Adres | Veldhoekweg 1, 7161 RW Neede, Industrieterrein Neede Berkelland |
| Tel (tijdelijk) | +31 (0)543 00 00 00 |
| Mail | peterebbers67@gmail.com |
| Openingstijden | Ma – Vr 07:30 – 16:30 |

**Diensten:** constructiewerken, metaalbewerking, machine-onderhoud  
**Showcase:** handgemaakte ijzer/hout meubels (stoelen, tafels, frames)

---

## Design-systeem (behouden tenzij expliciet anders gevraagd)

**Thema:** "Werkplaats Precision" — licht industrieel, geen generieke donkere AI-template

| Token | Waarde |
|-------|--------|
| Beton | `#E8E3DB` / `#F3F0EB` |
| Staal | `#1A2228` |
| Accent koper | `#B85C28` |
| Fonts koppen | Syne |
| Fonts body | IBM Plex Sans |
| Fonts labels | IBM Plex Mono |

**Motieven:** diagonale "lasnaad" (`.weld-seam`), scroll-reveal (`.reveal`)  
**Componenten:** USWDS header (`.usa-header`), knoppen (`.usa-button` + `.btn-*`), bento-grid, project-cards

Taal: **Nederlands** (`lang="nl"`)

---

## Wat al klaar is (niet opnieuw doen)

- [x] 5 pagina's met USWDS mobiel menu
- [x] Hero op homepage met productfoto
- [x] Bento-grid diensten-preview
- [x] Collectie-pagina met 16 foto's + lightbox
- [x] Contactformulier (frontend validatie, geen echte mail-backend)
- [x] Netlify deploy + GitHub repo
- [x] Productfoto's verwerkt (tafel = 1 beeld, geen collage-split)

---

## Wat jij moet / mag verbeteren

### Prioriteit 1 — Visuele polish

- **Hero** (`index.html` + `.hero` in `style.css`): sterker eerste indruk, betere balans tekst/foto op mobiel
- **Typografie & spacing:** consistentie tussen secties, betere leesbaarheid op kleine schermen
- **Bento-grid diensten:** visueel onderscheidender maken (featured card vs. rest)
- **Footer & header:** subtiele verfijning, geen USWDS-default look

### Prioriteit 2 — Collectie / productpresentatie

- Gallery-grid (`collectie.html`) professioneler — meer catalogus-gevoel
- Product-cards op homepage (`#projecten`) sterker (hover, captions, layout)
- Eventueel categorieën/filters (stoelen, tafels, frames) — alleen als het past bij static setup
- Betere alt-teksten / korte productbeschrijvingen bij foto's (content in `manifest.json`)

### Prioriteit 3 — Pagina-specifiek

- **diensten.html:** dienstensecties visueel rijker (iconen, scheiding, CTA's)
- **over-ons.html:** werkplaats-verhaal sterker met bestaande foto's (`product-01`, `product-15`)
- **contact.html:** formulier + info-blok visueel aantrekkelijker; kaart/route optioneel (OpenStreetMap embed)

### Prioriteit 4 — Optioneel / later

- Contactformulier koppelen aan Netlify Forms of Formspree
- Echt telefoonnummer invullen wanneer beschikbaar (alleen via `js/config.js`)
- Logo vervangen als echt logo beschikbaar is (nu SVG-mark in header)
- SEO: Open Graph tags, structured data (LocalBusiness)

---

## Wat je NIET moet doen

- Geen React/Next.js
- USWDS header/mobiel menu niet breken
- `node_modules` of `.tools/` niet committen
- Productfoto's niet opnieuw splitsen (tafel blijft 1 beeld)
- Geen fake contactgegevens of stockfoto's
- Geen donkere generieke "AI startup" template
- Header/footer per pagina anders structureren (nu duplicated — bewust voor static site)

---

## Belangrijke bestanden

```
css/style.css                         → alle styling + design tokens
js/config.js                          → bedrijfs- en contactconfig
js/main.js                            → scroll reveal, contact inject, form
js/gallery.js                         → collectie lightbox
assets/images/products/manifest.json  → gallery metadata
index.html                            → homepage (hero, bento, collectie-preview)
collectie.html                        → volledige galerij
```

USWDS overrides staan **onderaan** `style.css` — pas daar aan, niet in `uswds.min.css`.

---

## Designrichting

- Ambachtelijke metaalwerkplaats, niet corporate multinational
- Warm licht beton + koper accent, niet koud grijs/blauw
- Meubels moeten **verkopen** — foto's centraal, ruimte om adem te halen
- Professioneel voor B2B (machine-onderhoud) én B2C (meubels)
- Mobile-first: veel bezoekers op telefoon

---

## Werkwijze

1. Bekijk live site: https://ebbers-solutions.netlify.app
2. Werk in `css/style.css` en HTML-pagina's
3. Test mobiel menu na elke header-wijziging
4. Commit + push + `npm run deploy`

**Begin met prioriteit 1** (hero + typografie + mobiel), daarna collectie.
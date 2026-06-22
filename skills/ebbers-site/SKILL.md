---
name: ebbers-site
description: >
  Work on the Ebbers Solutions static website (Werkplaats Precision design).
  Use when editing index.html, diensten.html, collectie.html, over-ons.html,
  contact.html, css/style.css, or js/*. Always read CONTEXT.md and DESIGN.md first.
  Triggers: ebbers, werkplaats, collectie, photo slider, netlify site, metaal website.
---

# Ebbers Site

## Before any change

1. Read `CONTEXT.md` (domain terms, boot order, hard rules)
2. Read `DESIGN.md` (colors, typography, components)
3. Skim `CLAUDE-DESIGN-BRIEF.md` if scope is unclear

## Stack constraints

- HTML + CSS + vanilla JS only — no React, Next.js, Tailwind
- USWDS 3.9.0 for nav/forms — do not break mobile menu
- Contact data only in `js/config.js` (`data-contact` in HTML)

## Design non-negotiables

- **Werkplaats Precision:** warm beton `#F3F0EB`, steel `#1A2228`, copper `#B85C28`
- **Studio frame:** `object-fit: contain` — full product visible, never crop hero
- **Photo slider:** 5000ms interval, pause on hover, respect `prefers-reduced-motion`
- No purple gradients, dark SaaS templates, or stock photos

## Common tasks

| Task | Files |
|------|-------|
| Styling | `css/style.css` (tokens in `:root`) |
| Homepage hero/slider | `index.html`, `js/photo-slider.js` |
| Collectie | `collectie.html`, `js/gallery.js`, `manifest.json` |
| Homepage preview cards | `js/home-collection.js` |
| Vertalingen | `js/i18n.js` |
| Contactformulier | `contact.html`, `js/main.js` |
| Deploy headers | `netlify.toml` |

## Verify

```bash
python3 -m http.server 8080
# → http://127.0.0.1:8080 — hard refresh after CSS/JS changes
```

Test mobile menu after any header change.
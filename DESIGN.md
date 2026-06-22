# Design System — Ebbers Solutions (Werkplaats Precision)

## 1. Visual Theme & Atmosphere

Warm, light-industrial craft workshop — not corporate SaaS, not dark AI template. Concrete and steel tones with copper as the single warm accent. Photography of real products and workshop is central. Editorial precision with IBM Plex Mono labels.

## 2. Color Palette

| Role | Token | Hex |
|------|-------|-----|
| Canvas | `--concrete-light` | `#F3F0EB` |
| Surface muted | `--concrete` | `#E8E3DB` |
| Surface raised | `--surface` | `#FFFFFF` |
| Text primary | `--steel-900` | `#1A2228` |
| Text secondary | `--steel-700` | `#3E4F5C` |
| Text muted | `--steel-500` | `#6B7D8A` |
| Accent / CTA | `--copper` | `#B85C28` |
| Accent hover | `--copper-bright` | `#D4783A` |
| Dark sections | `--steel-900` | `#1A2228` |

## 3. Typography

| Role | Font | Notes |
|------|------|-------|
| Display | Syne 700–800 | Headlines, tight tracking `-0.03em` to `-0.04em` |
| Body | IBM Plex Sans | 1rem, line-height 1.65 |
| Labels | IBM Plex Mono | Uppercase eyebrows, 0.1–0.12em letter-spacing |

## 4. Components

- **Buttons:** 3px radius, copper primary, steel outline secondary. Hover: lift 1px + copper glow.
- **Cards:** 1px `--line` border, copper top bar on hover (scaleX animation).
- **Photos:** `object-fit: contain` in studio frame — full product visible, never cropped in hero.
- **Sliders:** 5s interval, crossfade 1.1s, pause on hover.

## 5. Layout

- Container: 1180px max
- Section padding: `clamp(4rem, 10vh, 7rem)`
- Spacing scale: 4 / 8 / 16 / 24 / 32 / 48 / 64px

## 6. Depth

Shadows only — no heavy elevation. `--shadow-sm` cards, `--shadow-lg` hero photo.

## 7. Do's and Don'ts

**Do:** Warm beton, koper accent, echte productfoto's, mono labels, lasnaad motif.  
**Don't:** Paarse gradients, donkere generic templates, stockfoto's, `object-fit: cover` op hero.

## 8. Responsive

- Mobile-first; hero photo above copy on `<960px`
- Touch targets min 44px
- `prefers-reduced-motion`: disable sliders & count-up

## 9. Tech Constraints

HTML + CSS + vanilla JS only. USWDS for nav/forms. Tokens in `css/style.css` `:root`.
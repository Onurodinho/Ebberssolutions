---
version: alpha
name: Werkplaats Precision
description: Design system for Ebbers Solutions — warm light-industrial craft workshop
colors:
  primary: "#1A2228"
  secondary: "#3E4F5C"
  tertiary: "#B85C28"
  neutral: "#F3F0EB"
  surface: "#FFFFFF"
  surface-muted: "#E8E3DB"
  surface-raised: "#FAF8F5"
  on-neutral: "#1A2228"
  on-surface: "#1A2228"
  on-surface-variant: "#6B7D8A"
  tertiary-hover: "#D4783A"
  tertiary-glow: "rgba(184, 92, 40, 0.18)"
  slate: "#4A6274"
  outline: "rgba(26, 34, 40, 0.1)"
  outline-strong: "rgba(26, 34, 40, 0.18)"
typography:
  display-lg:
    fontFamily: Syne
    fontSize: 3rem
    fontWeight: "700"
    lineHeight: 1.1
    letterSpacing: -0.04em
  display-md:
    fontFamily: Syne
    fontSize: 2.25rem
    fontWeight: "700"
    lineHeight: 1.15
    letterSpacing: -0.03em
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 1rem
    fontWeight: "400"
    lineHeight: 1.65
  label-caps:
    fontFamily: IBM Plex Mono
    fontSize: 0.75rem
    fontWeight: "500"
    lineHeight: 1.4
    letterSpacing: 0.12em
rounded:
  sm: 3px
  md: 6px
  lg: 10px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container: 1180px
  header: 76px
  section-padding: 4rem
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.surface}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.sm}"
    padding: 12px 24px
  button-primary-hover:
    backgroundColor: "{colors.tertiary-hover}"
  button-primary-glow:
    backgroundColor: "{colors.tertiary-glow}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 12px 24px
  button-secondary-hover:
    textColor: "{colors.tertiary}"
  section-canvas:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-neutral}"
  card-standard:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  card-muted:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  link-secondary:
    textColor: "{colors.slate}"
    typography: "{typography.body-md}"
  photo-studio-frame:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.md}"
  photo-slider:
    backgroundColor: transparent
  nav-scrolled:
    backgroundColor: "{colors.neutral}"
  section-divider:
    backgroundColor: "{colors.outline-strong}"
    height: 1px
---

# Design System — Ebbers Solutions (Werkplaats Precision)

## Overview

Warm, light-industrial craft workshop — not corporate SaaS, not dark AI template. Concrete and steel tones with copper as the single warm accent. Photography of real products and workshop is central. Editorial precision with IBM Plex Mono labels.

The emotional response should feel grounded, craft-forward, and trustworthy: a real werkplaats in Neede, not a generic template.

## Colors

The palette is rooted in warm concrete neutrals, steel text tones, and a single copper accent for interaction.

- **Primary (#1A2228):** Deep steel for headlines and core text (`--steel-900`).
- **Secondary (#3E4F5C):** Mid steel for supporting copy and borders (`--steel-700`).
- **Tertiary (#B85C28):** Copper — the sole driver for CTAs, eyebrows, and highlights (`--copper`).
- **Neutral (#F3F0EB):** Warm concrete canvas (`--concrete-light`).
- **Surface (#FFFFFF):** Raised cards and inputs (`--surface`).
- **Surface muted (#E8E3DB):** Secondary backgrounds (`--concrete`).
- **On-surface variant (#6B7D8A):** Captions and metadata (`--steel-500`).
- **Tertiary hover (#D4783A):** Copper bright for hover states (`--copper-bright`).

CSS custom properties in `css/style.css` `:root` mirror these tokens (`--concrete-light`, `--copper`, `--line`, etc.).

## Typography

Three-font stack: Syne for display, IBM Plex Sans for body, IBM Plex Mono for labels.

- **Display:** Syne 700–800 for headlines; tight tracking `-0.03em` to `-0.04em`.
- **Body:** IBM Plex Sans at 1rem, line-height 1.65.
- **Labels:** IBM Plex Mono, uppercase eyebrows, 0.1–0.12em letter-spacing.

## Layout

- Container max-width: 1180px (`--container`).
- Section padding: `clamp(4rem, 10vh, 7rem)`.
- Spacing scale: 4 / 8 / 16 / 24 / 32 / 48 / 64px (`--space-1` through `--space-7`).
- Mobile-first; hero photo above copy below 960px.

## Elevation & Depth

Shadows only — no heavy elevation layers.

- **Cards:** `--shadow-sm` (`0 2px 8px rgba(26, 34, 40, 0.06)`).
- **Hero photo:** `--shadow-lg` (`0 24px 64px rgba(26, 34, 40, 0.14)`).
- **Mid elevation:** `--shadow-md` for modals and elevated cards.
- Borders (`--line`, `--line-strong`) reinforce hierarchy where shadows stay subtle.

## Shapes

Architectural sharpness with minimal rounding — engineered, not bubbly.

- **Buttons and inputs:** 3px radius (`--radius-sm`).
- **Cards and frames:** 6px radius (`--radius`).
- **Large containers:** 10px radius (`--radius-lg`).
- **Lasnaad motif:** diagonal copper accent (`.weld-seam`, `--weld-angle: -2.5deg`).

## Components

### Buttons

3px radius, copper primary, steel outline secondary. Hover: lift 1px + copper glow (`--copper-glow`). Primary uses white text on copper; secondary uses steel border with copper hover.

### Cards

1px `--line` border, copper top bar on hover (scaleX animation). White surface on concrete canvas.

### Photos (studio frame)

`object-fit: contain` in studio frame — full product visible, never cropped in hero. Raised surface background, subtle shadow.

### Sliders

5s interval (`5000ms`), crossfade 1.1s, pause on hover/focus. Respect `prefers-reduced-motion`: disable auto-rotation and count-up.

### Navigation

USWDS 3.9.0 for nav and forms. Header height 76px; scrolled state adds `--line` bottom border.

## Do's and Don'ts

**Do:** Warm beton, koper accent, echte productfoto's, mono labels, lasnaad motif.

**Don't:** Paarse gradients, donkere generic templates, stockfoto's, `object-fit: cover` op hero.

## Responsive

- Mobile-first; hero photo above copy on `<960px`.
- Touch targets min 44px.
- `prefers-reduced-motion`: disable sliders & count-up.

## Tech Constraints

HTML + CSS + vanilla JS only. USWDS for nav/forms. Tokens in `css/style.css` `:root`. Contact data only in `js/config.js` (`data-contact` in HTML). No React, Next.js, or Tailwind.
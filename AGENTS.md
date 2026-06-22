# AI Agent Instructions — Ebbers Solutions

Lees **altijd eerst** `CONTEXT.md` en `DESIGN.md` voordat je wijzigingen maakt.

## Project

Statische bedrijfssite (metaalbewerking + handgemaakte meubels), Neede. HTML + CSS + vanilla JS + USWDS. Geen React/Next.js.

## Skills in deze repo

Geïnstalleerd in `skills/` (Matt Pocock, MIT — zie `skills/README.md`):

| Skill | Wanneer |
|-------|---------|
| `grill-me` | Vóór grote wijzigingen — alignment via interview |
| `grill-with-docs` | Zelfde + update `CONTEXT.md` / ADR's |
| `diagnosing-bugs` | Slider, i18n, formulier of gallery bugs |

Project-specifiek: `skills/ebbers-site` — startpunt voor site-werk.

Activeer lokaal: `bash scripts/setup-agent-skills.sh`

## Snelle regels

- Tokens en kleuren: `css/style.css` `:root` + `DESIGN.md`
- Contact alleen via `js/config.js` + `data-contact`
- Hero/productfoto's: `contain`, niet `cover`
- Slider: 5000ms overal
- Deploy: `git push` + `npm run deploy`

## Meer detail

`CLAUDE-DESIGN-BRIEF.md` — volledige brief met prioriteiten en wat al klaar is.
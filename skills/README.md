# Agent Skills — Ebbers Solutions

Skills voor AI-agents die aan deze site werken. Gebaseerd op [mattpocock/skills](https://github.com/mattpocock/skills) (MIT) + project-specifiek `ebbers-site`.

## Installeren (lokaal voor Grok/Cursor)

```bash
bash scripts/setup-agent-skills.sh
```

Dit kopieert `skills/` naar `.grok/skills/` zodat Grok ze in dit project kan laden.

## Volledige Matt Pocock install (optioneel, vereist Node.js)

Als je Node.js hebt:

```bash
npx skills@latest add mattpocock/skills
```

Kies `/setup-matt-pocock-skills` voor issue-tracker configuratie. Voor deze static site volstaat wat hier in `skills/` staat.

## Skills

| Map | Bron | Gebruik |
|-----|------|---------|
| `ebbers-site` | Project | Startpunt — leest CONTEXT.md + DESIGN.md |
| `grill-me` | Matt Pocock | Interview vóór grote wijzigingen |
| `grill-with-docs` | Matt Pocock | Grill + update CONTEXT.md |
| `grilling` | Matt Pocock | Herbruikbare grill-loop (door grill-with-docs) |
| `domain-modeling` | Matt Pocock | Domain glossary scherpen |
| `diagnosing-bugs` | Matt Pocock | Gestructureerd debuggen |

## Documentatie

- `CONTEXT.md` — gedeelde taal en harde regels
- `DESIGN.md` — visueel design contract
- `AGENTS.md` — agent entrypoint
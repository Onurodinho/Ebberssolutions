#!/usr/bin/env bash
# Kopieer project skills naar .grok/skills voor lokale Grok-sessies.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/skills"
DEST="$ROOT/.grok/skills"

mkdir -p "$DEST"

for skill in "$SRC"/*/; do
  name="$(basename "$skill")"
  [[ "$name" == "README.md" ]] && continue
  rm -rf "$DEST/$name"
  cp -R "$skill" "$DEST/$name"
  echo "✓ $name"
done

echo ""
echo "Skills actief in $DEST"
echo "Lees AGENTS.md en CONTEXT.md vóór je begint."
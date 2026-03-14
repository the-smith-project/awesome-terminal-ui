# GlyphUI / awesome-terminal-ui

"The Dribbble + Figma for Terminal UI" – glyph animation styleguide + drag-and-drop TUI canvas med live 80×24 xterm.js-preview.

## Kom igång

```bash
npm install
npm run dev
```

Öppna http://localhost:5173.

## Struktur

- `src/data/glyphs.ts` – katalog över spinners & throbbers, ASCII, Unicode, Hermes kawaii, progress, agentic feed.
- `src/components/GlyphCatalog.tsx` – filtrerbar stilguide, copy-knappar, tema.
- `src/components/builder` – React DnD-palett, canvas, xterm.js-anslutning.
- `src/utils/ansiRenderer.ts` – custom ANSI-renderare som översätter layout till \\r/CSI-kompatibel output.

## Phaseplan

1. **Glyph Animations Styleguide** – färdiga filter + copy-knappar och Terminaiui.taxonomie.
2. **Drag-and-drop canvas** – palette → snap-grid → xterm.js preview.
3. Kommande faser: Blueprints + TCSS, Multi-Agent Feed, Exportmotor, VHS pipeline.

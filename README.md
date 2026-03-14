# Loading glyph styleguide

Fristående styleguide för Unicode loading-spinners. Ingen koppling till något annat projekt.

## Öppna

Öppna `index.html` i webbläsare (eller serva mappen med valfri static server). Inga dependencies.

## Filer

- `index.html` — sidan (sökväg, tema, nav, kort, code block)
- `style.css` — alla stilar + tre teman (Mörk, Ljus, Terminal)
- `script.js` — spinnerSets, copy-knappar, temabyttare

## Komponenter (CSS-klasser)

| Komponent | Klass | Beskrivning |
|-----------|--------|-------------|
| Sökväg | `.sg-breadcrumb` | Breadcrumb (t.ex. Styleguide / Loading glyphs) |
| Sidhuvud | `.sg-header`, `.sg-title`, `.sg-desc` | Titel + beskrivning |
| Tema | `.sg-theme-switcher`, `.sg-theme-btn` | Knappar för Mörk / Ljus / Terminal |
| Callout | `.sg-callout` | Hjälptext (förklaring av Copy data / Copy användning) |
| Snabblänkar | `.sg-nav-inline` | In-page länkar till sektioner |
| Toolbar | `.sg-toolbar` | Sök + filter + sortering |
| Sök | `.sg-search-wrap`, `.sg-input` | Sökfält (filtrerar på variantnamn) |
| Filter | `.sg-filter-pills`, `.sg-pill`, `.sg-pill.active` | Kategori-pills (Alla, Dots, Pilar, Block, ASCII, Former, Symboler) |
| Sortering | `.sg-sort-wrap`, `.sg-select` | Dropdown: A–Ö, Ö–A, Kategori |
| Resultaträknare | `.sg-result-count` | T.ex. "Visar 5 av 15" |
| Sektion | `.sg-section`, `.sg-section-title`, `.sg-section-desc` | Avdelning med rubrik |
| Kort | `.sg-card`, `.sg-card-demo`, `.sg-card-name`, `.sg-card-actions` | Glyph-kort med demo + copy-knappar. `data-variant`, `data-category` för filter/sort. `.sg-card--hidden` döljer kort. |
| Copy-knapp | `.sg-copy-btn` | Sekundär knapp (Copy data / Copy användning) |
| Code block | `.sg-code-wrap`, `.sg-pre` | Kod med "Copy hela" |
| Terminal mockup | `.sg-terminal`, `.sg-terminal-titlebar`, `.sg-terminal-body`, `.sg-terminal-line`, `.sg-terminal-prompt` | 1:1 terminal-fönster för live glyph-showcase |
| Glyph-rad | `.sg-glyph-row`, `.sg-glyph-slot`, `.sg-glyph-add` | Rad med glyph-slots + plus-knapp (bygg loading-screen) |
| Hamburger | `.sg-hamburger` | Tre streck, stöd för `aria-expanded` (X när öppen) |
| Dropdown | `.sg-dropdown`, `.sg-dropdown-trigger`, `.sg-dropdown-panel`, `.sg-dropdown-item` | Trigger + panel; JS togglar `hidden` |
| Footer | `.sg-footer`, `.sg-footer-inner`, `.sg-footer-nav` | Enkel footer med länkar |
| Skip link | `.sg-skip-link` | Hoppa till innehåll (fokus synlig) |
| Typografi | `.sg-typo-h1`, `.sg-typo-h2`, `.sg-typo-body`, `.sg-typo-small` | Design-sektion |
| Färgpalett | `.sg-palette`, `.sg-swatch` | Swatches för --sg-* |
| Knappar | `.sg-btn`, `.sg-btn--primary`, `.sg-btn--secondary`, `.sg-btn--ghost` | Primär, sekundär, ghost |
| Länk | `.sg-link`, `.sg-link--muted` | Standard och dämpad |
| Formulär | `.sg-textarea`, `.sg-checkbox`, `.sg-radio`, `.sg-input-hint`, `.sg-input-hint--error` | Textarea, checkbox, radio, felmeddelande |
| Badge | `.sg-badge`, `.sg-badge--muted` | Tag/label |
| Tabs | `.sg-tabs`, `.sg-tab`, `.sg-tab.active`, `.sg-tab-panel` | Flikar med .active |
| Tabell | `.sg-table` | Enkel tabell |
| Modal | `.sg-modal`, `.sg-modal-backdrop`, `.sg-modal-box` | Dialog; JS öppnar/stänger med #sg-modal-open, #sg-modal-close |

## Teman

Tema styrs av `data-theme` på `<body>`: `dark` (default), `light`, `terminal`. Val sparas i `localStorage` (`sg-theme`). Alla färger går via CSS-variabler (`--sg-bg`, `--sg-text`, `--sg-accent`, etc.) så nya teman kan läggas till genom att lägga till t.ex. `[data-theme="mitt"] { ... }`.

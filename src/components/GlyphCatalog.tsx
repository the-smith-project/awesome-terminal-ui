import { useMemo, useState } from 'react';
import { glyphAnimations, glyphCategories } from '../data/glyphs';
import type { GlyphCategoryId } from '../types';
import { GlyphCard } from './GlyphCard';

interface Props {
  frame: number;
}

type SortMode = 'az' | 'za' | 'category';

export const GlyphCatalog = ({ frame }: Props) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<GlyphCategoryId | 'all'>('all');
  const [sortMode, setSortMode] = useState<SortMode>('az');

  const visibleGlyphs = useMemo(() => {
    const normalized = query.toLowerCase();
    return glyphAnimations
      .filter((glyph) => {
        const matchesCategory = category === 'all' || glyph.category === category;
        const matchesQuery =
          glyph.name.toLowerCase().includes(normalized) || glyph.tags.some((tag) => tag.includes(normalized));
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortMode === 'category') {
          return a.category.localeCompare(b.category);
        }
        if (sortMode === 'az') {
          return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
      });
  }, [category, query, sortMode]);

  return (
    <section className="glyph-section" id="glyph-animations">
      <header className="glyph-section__header">
        <div>
          <p className="sg-breadcrumb">
            <span>Styleguide</span> / <span>Glyph Animations</span>
          </p>
          <h2 className="sg-title">Glyph Animations</h2>
          <p className="sg-desc">Spinners & Throbbers, ASCII, Unicode, Hermes kawaii, Progress och Agentic feeds – allt här.</p>
        </div>
        <div className="sg-toolbar">
          <div className="sg-search-wrap">
            <label htmlFor="glyph-search" className="sg-label">
              Sök
            </label>
            <input
              id="glyph-search"
              type="search"
              className="sg-input"
              placeholder="Sök namn eller tagg"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div>
            <label className="sg-label">Sortera</label>
            <select className="sg-select" value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)}>
              <option value="az">A–Ö</option>
              <option value="za">Ö–A</option>
              <option value="category">Kategori</option>
            </select>
          </div>
          <p className="sg-result-count" aria-live="polite">
            Visar {visibleGlyphs.length} av {glyphAnimations.length}
          </p>
        </div>
      </header>

      <div className="sg-filter-pills">
        {Object.entries(glyphCategories).map(([id, meta]) => (
          <button
            key={id}
            type="button"
            className={`sg-pill ${category === id ? 'active' : ''}`}
            onClick={() => setCategory(id as GlyphCategoryId | 'all')}
          >
            {meta.label}
          </button>
        ))}
      </div>

      <div className="sg-grid">
        {visibleGlyphs.map((glyph) => (
          <GlyphCard key={glyph.id} glyph={glyph} frame={frame} />
        ))}
      </div>
    </section>
  );
};

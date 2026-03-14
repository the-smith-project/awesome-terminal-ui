import { useState } from 'react';
import type { GlyphAnimation } from '../types';

interface Props {
  glyph: GlyphAnimation;
  frame: number;
}

export const GlyphCard = ({ glyph, frame }: Props) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (content: string, label: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 1200);
  };

  const currentFrame = glyph.frames[frame % glyph.frames.length];

  return (
    <article className="sg-card">
      <div className="sg-card-demo" aria-live="polite" aria-label={`${glyph.name} demo`}>
        <span className="sg-card-frame">{currentFrame}</span>
      </div>
      <div className="sg-card-name">
        <strong>{glyph.name}</strong>
        <span>{glyph.category}</span>
      </div>
      <p className="sg-card-desc">{glyph.description}</p>
      <div className="sg-card-actions">
        <button type="button" className="sg-copy-btn" onClick={() => handleCopy(glyph.dataSnippet, 'data')}>
          {copiedField === 'data' ? 'Kopierad!' : 'Copy data'}
        </button>
        <button type="button" className="sg-copy-btn" onClick={() => handleCopy(glyph.usageSnippet, 'usage')}>
          {copiedField === 'usage' ? 'Kopierad!' : 'Copy användning'}
        </button>
      </div>
      <ul className="sg-card-tags">
        {glyph.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </article>
  );
};

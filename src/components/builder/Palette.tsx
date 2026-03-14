import { useMemo, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { paletteComponents } from '../../data/palette';
import type { DraggedItem } from '../../types';

const sections = [
  { title: 'Layout', ids: ['panel'] },
  { title: 'Content', ids: ['text-block'] },
  { title: 'Actions', ids: ['button-primary'] },
  { title: 'Feedback', ids: ['spinner-kawaii', 'progress-bar'] },
  { title: 'Agentic', ids: ['agent-feed', 'multi-agent'] },
];

const PaletteCard = ({
  label,
  description,
  icon,
  item,
}: {
  label: string;
  description: string;
  icon: string;
  item: DraggedItem;
}) => {
  const [, drag] = useDrag(() => ({
    type: 'builder-item',
    item,
  }));
  const cardRef = useRef<HTMLDivElement | null>(null);
  drag(cardRef);

  return (
    <article className="palette-card" ref={cardRef}>
      <span className="palette-card__icon" aria-hidden>
        {icon}
      </span>
      <div>
        <h4>{label}</h4>
        <p>{description}</p>
      </div>
    </article>
  );
};

export const Palette = () => {
  const componentMap = useMemo(() => Object.fromEntries(paletteComponents.map((comp) => [comp.id, comp])), []);

  return (
    <aside className="builder-panel" aria-label="Komponentbibliotek">
      <h3>Drag-and-drop palette</h3>
      <p className="builder-panel__hint">Dra block till canvasen. Alla komponenter snäpper till 80×24-galler.</p>
      {sections.map((section) => (
        <div key={section.title} className="palette-section">
          <h4>{section.title}</h4>
          {section.ids.map((id) => {
            const component = componentMap[id];
            if (!component) return null;
            const item: DraggedItem = {
              dragSource: 'palette',
              paletteId: component.id,
              width: component.width,
              height: component.height,
              kind: component.kind,
              glyphId: component.glyphId,
              defaultText: component.defaultText,
              label: component.label,
            };
            return <PaletteCard key={component.id} label={component.label} description={component.description} icon={component.icon} item={item} />;
          })}
        </div>
      ))}
    </aside>
  );
};

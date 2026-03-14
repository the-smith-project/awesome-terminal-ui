import { useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { CanvasComponent } from '../../types';
import { Palette } from './Palette';
import { Canvas } from './Canvas';
import { TerminalPreview } from './TerminalPreview';

interface Props {
  frame: number;
}

export const TerminalBuilder = ({ frame }: Props) => {
  const [components, setComponents] = useState<CanvasComponent[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const sortedComponents = useMemo(
    () => [...components].sort((a, b) => (a.y === b.y ? a.x - b.x : a.y - b.y)),
    [components],
  );

  const handleAdd = (component: CanvasComponent) => {
    setComponents((prev) => [...prev, component]);
  };

  const handleMove = (id: string, position: { x: number; y: number }) => {
    setComponents((prev) => prev.map((component) => (component.instanceId === id ? { ...component, ...position } : component)));
  };

  const handleRemove = (id: string) => {
    setComponents((prev) => prev.filter((component) => component.instanceId !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <section className="builder-section" id="builder">
      <div className="builder-section__intro">
        <div>
          <p className="sg-label">Terminal Canvas</p>
          <h2 className="sg-title">Drag-and-drop TUI Canvas</h2>
          <p className="sg-desc">Dra färdiga komponenter, snäpp mot rutnätet och se allt i live-terminalen till höger.</p>
        </div>
        <div className="builder-section__pillars">
          <div>
            <strong>Snap to grid</strong>
            <p>80×24-canvas, exakt som retroterminalen.</p>
          </div>
          <div>
            <strong>Hermes-native animationer</strong>
            <p>Kawaii thinking faces och agentic feed i previewn.</p>
          </div>
          <div>
            <strong>ANSI renderer</strong>
            <p>Retained-mode skrivning med färger & fallback.</p>
          </div>
        </div>
      </div>
      <DndProvider backend={HTML5Backend}>
        <div className="builder-layout">
          <Palette />
          <Canvas
            components={sortedComponents}
            onAdd={handleAdd}
            onMove={handleMove}
            onRemove={handleRemove}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <TerminalPreview components={sortedComponents} frame={frame} />
        </div>
      </DndProvider>
    </section>
  );
};

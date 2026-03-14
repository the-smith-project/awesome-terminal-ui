import { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import type { CanvasComponent, DraggedItem } from '../../types';
import { paletteComponents } from '../../data/palette';

const CELL_WIDTH = 10;
const CELL_HEIGHT = 20;
const GRID_COLS = 80;
const GRID_ROWS = 24;

interface Props {
  components: CanvasComponent[];
  onAdd: (component: CanvasComponent) => void;
  onMove: (id: string, position: { x: number; y: number }) => void;
  onRemove: (id: string) => void;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const findPaletteComponent = (paletteId?: string) => paletteComponents.find((component) => component.id === paletteId);

const CanvasItem = ({
  component,
  selected,
  onSelect,
  onRemove,
}: {
  component: CanvasComponent;
  selected: boolean;
  onSelect: (id: string | null) => void;
  onRemove: (id: string) => void;
}) => {
  const [, drag] = useDrag(() => ({
    type: 'builder-item',
    item: {
      dragSource: 'canvas' as const,
      instanceId: component.instanceId,
      width: component.width,
      height: component.height,
      kind: component.kind,
    },
  }));
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  drag(buttonRef);

  return (
    <button
      type="button"
      ref={buttonRef}
      className={`canvas-item ${selected ? 'is-selected' : ''}`}
      style={{
        width: component.width * CELL_WIDTH,
        height: component.height * CELL_HEIGHT,
        transform: `translate(${component.x * CELL_WIDTH}px, ${component.y * CELL_HEIGHT}px)`,
      }}
      onClick={() => onSelect(component.instanceId)}
      onDoubleClick={() => onRemove(component.instanceId)}
    >
      <span>{component.label}</span>
    </button>
  );
};

export const Canvas = ({ components, onAdd, onMove, onRemove, selectedId, onSelect }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop<DraggedItem>(() => ({
    accept: 'builder-item',
    drop: (item, monitor) => {
      const bounds = ref.current?.getBoundingClientRect();
      if (!bounds) return;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const localX = clientOffset.x - bounds.left;
      const localY = clientOffset.y - bounds.top;
      const cols = clamp(Math.floor(localX / CELL_WIDTH), 0, GRID_COLS - (item.width ?? 1));
      const rows = clamp(Math.floor(localY / CELL_HEIGHT), 0, GRID_ROWS - (item.height ?? 1));

      if (item.dragSource === 'palette' && item.paletteId) {
        const paletteItem = findPaletteComponent(item.paletteId);
        if (!paletteItem) return;
        onAdd({
          ...paletteItem,
          instanceId: crypto.randomUUID(),
          x: cols,
          y: rows,
        });
        return;
      }

      if (item.dragSource === 'canvas' && item.instanceId) {
        onMove(item.instanceId, { x: cols, y: rows });
      }
    },
  }));

  return (
    <section className="builder-canvas" aria-label="Terminal canvas">
      <div className="builder-canvas__header">
        <div>
          <h3>Figma för terminal</h3>
          <p>80×24-uppdelning, ANSI-säker. Dubbelklicka komponent för att ta bort.</p>
        </div>
        <span className="builder-canvas__badge">{components.length} block</span>
      </div>
      <div className="builder-grid" ref={(node) => { ref.current = node; drop(node); }}>
        {components.map((component) => (
          <CanvasItem
            key={component.instanceId}
            component={component}
            selected={selectedId === component.instanceId}
            onSelect={(id) => onSelect(id)}
            onRemove={onRemove}
          />
        ))}
      </div>
    </section>
  );
};

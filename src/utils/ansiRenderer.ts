import { glyphAnimations } from '../data/glyphs';
import type { CanvasComponent } from '../types';

const COLS = 80;
const ROWS = 24;

const glyphMap = new Map(glyphAnimations.map((glyph) => [glyph.id, glyph]));

type Cell = {
  char: string;
  color?: 'accent' | 'muted' | 'primary' | 'success' | 'warning';
  bold?: boolean;
};

const ESC = '\u001b';

const COLORS: Record<NonNullable<Cell['color']>, string> = {
  accent: `${ESC}[38;5;214m`,
  muted: `${ESC}[38;5;240m`,
  primary: `${ESC}[38;5;45m`,
  success: `${ESC}[38;5;82m`,
  warning: `${ESC}[38;5;208m`,
};

const RESET = `${ESC}[0m`;

const createGrid = (): Cell[][] =>
  Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ char: ' ' } as Cell)),
  );

const writeText = (
  grid: Cell[][],
  startX: number,
  startY: number,
  text: string,
  options: { color?: Cell['color']; bold?: boolean } = {},
) => {
  const lines = text.split('\n');
  lines.forEach((line, idx) => {
    const row = startY + idx;
    if (row < 0 || row >= ROWS) return;
    [...line].forEach((char, cIdx) => {
      const column = startX + cIdx;
      if (column < 0 || column >= COLS) return;
      grid[row][column] = { char, color: options.color, bold: options.bold };
    });
  });
};

const drawPanel = (
  grid: Cell[][],
  component: CanvasComponent,
  title = 'panel',
  color: Cell['color'] = 'muted',
) => {
  const { x, y, width, height } = component;
  for (let col = 0; col < width; col += 1) {
    const charTop = col === 0 ? '┌' : col === width - 1 ? '┐' : '─';
    const charBottom = col === 0 ? '└' : col === width - 1 ? '┘' : '─';
    const topCol = x + col;
    const bottomCol = x + col;
    if (y >= 0 && y < ROWS && topCol >= 0 && topCol < COLS) {
      grid[y][topCol] = { char: charTop, color };
    }
    if (y + height - 1 >= 0 && y + height - 1 < ROWS && bottomCol >= 0 && bottomCol < COLS) {
      grid[y + height - 1][bottomCol] = { char: charBottom, color };
    }
  }
  for (let row = 1; row < height - 1; row += 1) {
    const colLeft = x;
    const colRight = x + width - 1;
    const absoluteRow = y + row;
    if (absoluteRow < 0 || absoluteRow >= ROWS) continue;
    if (colLeft >= 0 && colLeft < COLS) grid[absoluteRow][colLeft] = { char: '│', color };
    if (colRight >= 0 && colRight < COLS) grid[absoluteRow][colRight] = { char: '│', color };
  }
  writeText(grid, x + 2, y + 1, title, { color: 'accent', bold: true });
};

const gridToAnsi = (grid: Cell[][]) => {
  let buffer = '';
  grid.forEach((row) => {
    let currentColor: Cell['color'] | undefined;
    let bold = false;
    row.forEach((cell) => {
      if (cell.color !== currentColor) {
        currentColor = cell.color;
        buffer += cell.color ? COLORS[cell.color] : RESET;
        bold = false;
      }
      if ((cell.bold ?? false) !== bold) {
        bold = cell.bold ?? false;
        buffer += bold ? '\u001b[1m' : '\u001b[22m';
      }
      buffer += cell.char;
    });
    buffer += `${RESET}\n`;
  });
  return buffer;
};

export const renderAnsiLayout = (components: CanvasComponent[], frameBeat: number) => {
  const grid = createGrid();
  components.forEach((component) => {
    const glyph = component.glyphId ? glyphMap.get(component.glyphId) : undefined;
    switch (component.kind) {
      case 'panel': {
        drawPanel(grid, component, component.defaultText?.split('\n')[0] ?? 'Panel');
        const body = component.defaultText?.split('\n').slice(1).join('\n');
        if (body) {
          writeText(grid, component.x + 2, component.y + 2, body, { color: 'muted' });
        }
        break;
      }
      case 'text': {
        writeText(grid, component.x, component.y, component.defaultText ?? '', { color: 'muted' });
        break;
      }
      case 'button': {
        const label = component.defaultText ?? 'Button';
        const content = `[ ${label.toUpperCase()} ]`;
        writeText(grid, component.x, component.y + 1, content, { color: 'primary', bold: true });
        break;
      }
      case 'spinner': {
        const frames = glyph?.frames ?? ['⠋', '⠙'];
        const frame = frames[frameBeat % frames.length];
        writeText(grid, component.x + 2, component.y + 1, `${frame} Thinking`, { color: 'accent' });
        break;
      }
      case 'progress': {
        const frames = glyph?.frames ?? ['[-----]'];
        const frame = frames[frameBeat % frames.length];
        writeText(grid, component.x, component.y + 1, `${frame} ${(frameBeat % 13) * 8}%`, { color: 'primary' });
        break;
      }
      case 'agent-feed': {
        const frames = glyph?.frames ?? ['┊ ...'];
        const feedLines = frames.map((entry, idx) => {
          const pointer = idx === frameBeat % frames.length ? '▶' : '┊';
          return `${pointer} ${entry}`;
        });
        writeText(grid, component.x, component.y + 1, feedLines.join('\n'), { color: 'muted' });
        break;
      }
      case 'multi-agent': {
        const statuses = [
          `Researcher  ${frameBeat % 3 === 0 ? '🔍 new intel' : '… scanning'}`,
          `Judge       ${frameBeat % 3 === 1 ? '⚖️ scoring' : 'review queued'}`,
          `Builder     ${frameBeat % 3 === 2 ? '✏️ patching' : 'awaiting brief'}`,
        ];
        drawPanel(grid, component, 'Agent Deck', 'warning');
        writeText(grid, component.x + 2, component.y + 2, statuses.join('\n'), { color: 'muted' });
        break;
      }
      default:
        break;
    }
  });
  return `${RESET}${ESC}[2J${ESC}[H${gridToAnsi(grid)}`;
};

export const GRID = { COLS, ROWS };

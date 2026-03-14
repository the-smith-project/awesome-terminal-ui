export type ThemeName = 'dark' | 'light' | 'terminal';

export type GlyphCategoryId =
  | 'spinners'
  | 'ascii'
  | 'unicode'
  | 'kawaii'
  | 'progress'
  | 'activity';

export interface GlyphAnimation {
  id: string;
  name: string;
  category: GlyphCategoryId;
  description: string;
  frames: string[];
  interval: number;
  tags: string[];
  variant: 'unicode' | 'ascii' | 'emoji';
  usageSnippet: string;
  dataSnippet: string;
}

export type PaletteComponentKind =
  | 'panel'
  | 'text'
  | 'button'
  | 'spinner'
  | 'progress'
  | 'agent-feed'
  | 'multi-agent';

export interface PaletteComponent {
  id: string;
  kind: PaletteComponentKind;
  label: string;
  description: string;
  icon: string;
  width: number;
  height: number;
  defaultText?: string;
  accent?: 'primary' | 'muted';
  glyphId?: string;
}

export interface CanvasComponent extends PaletteComponent {
  instanceId: string;
  x: number; // column 0-79
  y: number; // row 0-23
}

export type DragSource = 'palette' | 'canvas';

export interface DraggedItem {
  dragSource: DragSource;
  paletteId?: string;
  instanceId?: string;
  width: number;
  height: number;
  kind: PaletteComponentKind;
  glyphId?: string;
  defaultText?: string;
  label?: string;
  originX?: number;
  originY?: number;
}

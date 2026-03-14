import { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import type { CanvasComponent } from '../../types';
import { renderAnsiLayout } from '../../utils/ansiRenderer';

interface Props {
  components: CanvasComponent[];
  frame: number;
}

export const TerminalPreview = ({ components, frame }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const terminalRef = useRef<Terminal | null>(null);

  useEffect(() => {
    const term = new Terminal({
      cols: 80,
      rows: 24,
      fontFamily: 'IBM Plex Mono, Space Mono, monospace',
      convertEol: true,
      disableStdin: true,
      theme: {
        background: '#050405',
        foreground: '#F2F1F0',
      },
    });
    if (containerRef.current) {
      term.open(containerRef.current);
    }
    terminalRef.current = term;
    return () => {
      term.dispose();
      terminalRef.current = null;
    };
  }, []);

  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) return;
    const output = renderAnsiLayout(components, frame);
    terminal.reset();
    terminal.write(output);
  }, [components, frame]);

  return (
    <section className="builder-terminal" aria-label="Live terminal-preview">
      <div className="builder-terminal__header">
        <h3>Live 80×24 Preview</h3>
        <p>Renderas i xterm.js + egen ANSI-motor. Anpassar sig efter dina block.</p>
      </div>
      <div className="builder-terminal__frame">
        <div className="builder-terminal__chrome">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="builder-terminal__viewport" ref={containerRef} />
      </div>
    </section>
  );
};

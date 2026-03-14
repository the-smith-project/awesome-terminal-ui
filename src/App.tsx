import { useEffect, useState } from 'react';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { GlyphCatalog } from './components/GlyphCatalog';
import { TerminalBuilder } from './components/builder/TerminalBuilder';
import { useTheme } from './hooks/useTheme';

function App() {
  const [theme, setTheme] = useTheme();
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setFrame((value) => value + 1), 400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="sg-breadcrumb">
            <span>Projekt</span> / <span>awesome-terminal-ui</span>
          </p>
          <h1 className="hero__title">GlyphUI</h1>
          <p className="hero__subtitle">
            The Dribbble + Figma for Terminal UI. En komplett katalog över glyph animationer, plus en drag-and-drop canvas som exporterar agentiska layouts.
          </p>
          <div className="hero__meta">
            <span className="sg-badge">Spinners & Throbbers</span>
            <span className="sg-badge">Progress Indicators</span>
            <span className="sg-badge">Agentic Feeds</span>
          </div>
        </div>
        <ThemeSwitcher value={theme} onChange={setTheme} />
      </header>

      <section className="sg-callout">
        <p>
          Ingen fler "loading glyph"-förvirring. All terminologi mappar till riktiga komponenter: Spinners, Throbbers, Progress, Agentic Activity Feeds och Hermes kawaii-ansikten.
        </p>
      </section>

      <GlyphCatalog frame={frame} />

      <TerminalBuilder frame={frame} />
    </div>
  );
}

export default App;

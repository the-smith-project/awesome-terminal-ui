import type { ThemeName } from '../types';

interface Props {
  value: ThemeName;
  onChange: (theme: ThemeName) => void;
}

const themes: ThemeName[] = ['dark', 'light', 'terminal'];

export const ThemeSwitcher = ({ value, onChange }: Props) => (
  <div className="sg-theme-switcher" role="group" aria-label="Välj tema">
    {themes.map((theme) => (
      <button
        key={theme}
        type="button"
        className={`sg-theme-btn ${value === theme ? 'is-active' : ''}`}
        aria-pressed={value === theme}
        onClick={() => onChange(theme)}
      >
        {theme === 'dark' && 'Mörk'}
        {theme === 'light' && 'Ljus'}
        {theme === 'terminal' && 'Terminal'}
      </button>
    ))}
  </div>
);

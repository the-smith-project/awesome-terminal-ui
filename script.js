const glyphCategories = [
  { id: 'all', label: 'Alla animationer' },
  { id: 'spinners', label: 'Spinners & Throbbers' },
  { id: 'ascii', label: 'ASCII classics' },
  { id: 'unicode', label: 'Unicode motion' },
  { id: 'kawaii', label: 'Hermes kawaii' },
  { id: 'progress', label: 'Progress indicators' },
  { id: 'activity', label: 'Agentic activity feeds' },
];

const glyphCategoryMeta = new Map(glyphCategories.map((cat) => [cat.id, cat]));

const glyphCatalog = [
  {
    id: 'braille-orbital',
    name: 'Braille Orbital Spinner',
    category: 'spinners',
    description: 'Klassisk braille-loop för IO-intensiva kommandon.',
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
    interval: 80,
    tags: ['unicode', 'loop'],
  },
  {
    id: 'lunar-sweep',
    name: 'Lunar Sweep',
    category: 'unicode',
    description: 'Fyra fas-moon som funkar i alla terminaler (även Windows).',
    frames: ['◐', '◓', '◑', '◒'],
    interval: 90,
    tags: ['moon', 'calm'],
  },
  {
    id: 'unicode-orbit',
    name: 'Unicode Orbit',
    category: 'unicode',
    description: 'Orbital symboler för progress i mer tekniska dashboards.',
    frames: ['⊶', '⋔', '⋇', '⊷'],
    interval: 120,
    tags: ['symbol', 'loop'],
  },
  {
    id: 'ascii-pipe',
    name: 'ASCII Pipe',
    category: 'ascii',
    description: 'Rent ASCII (|/-\\) när du måste hålla dig till enkla tty:er.',
    frames: ['|', '/', '-', '\\'],
    interval: 100,
    tags: ['retro', 'ci'],
  },
  {
    id: 'ellipsis-pulse',
    name: 'Ellipsis Pulse',
    category: 'ascii',
    description: 'Minimalista tre steg för API-kopplingar och korta svar.',
    frames: ['.  ', '.. ', '...'],
    interval: 180,
    tags: ['minimal'],
  },
  {
    id: 'dice-roll',
    name: 'Dice Roll',
    category: 'unicode',
    description: 'Unicode-tärningar som signalerar slump eller probabilistik AI.',
    frames: ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'],
    interval: 140,
    tags: ['unicode', 'status'],
  },
  {
    id: 'kawaii-loop',
    name: 'Hermes Cognitive Loop',
    category: 'kawaii',
    description: 'Hermes egna thinking faces för att humanisera väntetid.',
    frames: ['◜ (｡ •́︿•̀｡)', '◠ (⊙_⊙)', '✧٩(ˊᗜˋ*)و✧', '(｡˃ ᵕ ˂｡)'],
    interval: 450,
    tags: ['agentic', 'brand'],
  },
  {
    id: 'kawaii-beam',
    name: 'Hermes Beam',
    category: 'kawaii',
    description: 'Blinka → stjärnor, perfekt när agenten hittar svaret.',
    frames: ['(ง •̀_•́)ง', '(ง •̀ᴗ•́)و ✧', '✧ (ง •̀ᴗ•́)ง ✧'],
    interval: 420,
    tags: ['emoji', 'delight'],
  },
  {
    id: 'progress-blocks',
    name: 'Block Progress Bar',
    category: 'progress',
    description: 'Retained-mode bar med 20 steg och tydlig vänster-höger-rörelse.',
    frames: [
      '[>-------------------]',
      '[=>------------------]',
      '[==>-----------------]',
      '[===>----------------]',
      '[====>---------------]',
      '[=====>--------------]',
      '[======>-------------]',
      '[=======>------------]',
      '[========>-----------]',
      '[=========>----------]',
      '[==========>---------]',
      '[===========>--------]',
      '[============>-------]',
      '[=============>------]',
      '[==============>-----]',
      '[===============>----]',
      '[================>---]',
      '[=================>--]',
      '[==================>-]',
      '[====================]',
    ],
    interval: 150,
    tags: ['progress', 'deterministisk'],
  },
  {
    id: 'progress-arc',
    name: 'Arc Runner',
    category: 'progress',
    description: 'ASCII båge som fylls sekventiellt, perfekt för streaming jobs.',
    frames: ['(    )', '(•   )', '(••  )', '(••• )', '(••••)'],
    interval: 160,
    tags: ['ascii', 'loop'],
  },
  {
    id: 'agent-feed',
    name: 'Agentic Feed Pulse',
    category: 'activity',
    description: 'Visar verktygskörningar med emojis och korta förklaringar.',
    frames: ['┊ 💻 terminal ls -la', '┊ 🔍 web_search design systems', '┊ 📄 web_extract glyphs.md'],
    interval: 600,
    tags: ['tools', 'transparens'],
  },
  {
    id: 'workflow-ladder',
    name: 'Workflow Ladder',
    category: 'activity',
    description: 'Researcher → Judge → Builder med live status i samma rad.',
    frames: [
      '研究者 Researcher — thinking',
      'Judge — reviewing patch',
      'Builder — writing diff',
    ],
    interval: 700,
    tags: ['multi-agent'],
  },
];

const glyphMap = new Map(glyphCatalog.map((entry) => [entry.id, entry]));
const CATEGORY_ORDER = {
  all: 0,
  spinners: 1,
  unicode: 2,
  ascii: 3,
  kawaii: 4,
  progress: 5,
  activity: 6,
};

const builderGroups = [
  { id: 'layout', label: 'Layout', defaultOpen: true },
  { id: 'content', label: 'Content' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'agentic', label: 'Agentic' },
];

const builderPalette = [
  {
    id: 'panel-block',
    group: 'layout',
    label: 'Panel',
    description: 'Fönster för status/loggar. Titel + body text.',
    kind: 'panel',
    width: 26,
    height: 6,
    defaultText: 'Panel Title\nstatus: OK',
  },
  {
    id: 'text-block',
    group: 'content',
    label: 'Text block',
    description: 'Fri text, prompts eller CLI-kommandon.',
    kind: 'text',
    width: 28,
    height: 4,
    defaultText: 'agent@host:~$ npm run ship',
  },
  {
    id: 'button-block',
    group: 'content',
    label: 'Button',
    description: 'CTA i terminalstil (Deploy, Retry…).',
    kind: 'button',
    width: 14,
    height: 3,
    defaultText: 'Deploy',
  },
  {
    id: 'kawaii-spinner',
    group: 'feedback',
    label: 'Kawaii spinner',
    description: 'Hermes thinking animation live i canvasen.',
    kind: 'spinner',
    glyphId: 'kawaii-loop',
    width: 14,
    height: 3,
  },
  {
    id: 'progress-bar',
    group: 'feedback',
    label: 'Progress bar',
    description: 'Deterministisk bar som följer TCSS.',
    kind: 'progress',
    glyphId: 'progress-blocks',
    width: 28,
    height: 3,
  },
  {
    id: 'agent-feed-block',
    group: 'agentic',
    label: 'Agentic feed',
    description: 'Hierarkisk verktygslogg (Thinking → Tools → Output).',
    kind: 'agent-feed',
    glyphId: 'agent-feed',
    width: 32,
    height: 8,
  },
  {
    id: 'multi-agent-block',
    group: 'agentic',
    label: 'Multi-agent deck',
    description: 'Researcher/Judge/Builder-status i samma block.',
    kind: 'multi-agent',
    width: 34,
    height: 9,
  },
];

const paletteById = new Map(builderPalette.map((item) => [item.id, item]));
const glyphCardRefs = new Map();
const GRID = { cols: 80, rows: 24 };
const builderState = [];
let builderSelectedId = null;
let builderFrame = 0;
let builderTerminal = null;
let builderTerminalFallback = null;
const builderSettings = { reduceMotion: false };
const builderRulers = { x: null, y: null };

const THEME_KEY = 'sg-theme';

const ESC = '\u001B';
const ANSI_COLORS = {
  accent: `${ESC}[38;5;82m`,
  muted: `${ESC}[38;5;240m`,
  primary: `${ESC}[38;5;45m`,
  warning: `${ESC}[38;5;208m`,
  info: `${ESC}[38;5;33m`,
};
const ANSI_RESET = `${ESC}[0m`;

const createId = () => (window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`);
let terminalRenderPending = false;

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  const hasGlyphCatalog = Boolean(document.getElementById('glyph-animations'));
  if (hasGlyphCatalog) {
    initGlyphCatalog();
  }
  initInlineGlyphs();
  initDropdowns();
  initModal();
  initBuilder();
  updateFullSetExport();
});

function initGlyphCatalog() {
  const filterContainer = document.getElementById('glyph-filter-pills');
  if (!filterContainer) return;
  renderFilterPills(filterContainer);
  renderGlyphCards();
  initFilterAndSort();
  initCardPreviews();
  initCopyButtons();
}

function renderFilterPills(container) {
  container.innerHTML = '';
  glyphCategories.forEach((category, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sg-pill sg-pill--filter';
    btn.dataset.filter = category.id;
    btn.textContent = category.label;
    btn.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
    if (index === 0) btn.classList.add('active');
    container.appendChild(btn);
  });
}

function renderGlyphCards() {
  const gridEl = document.getElementById('sg-grid');
  if (!gridEl) return;
  gridEl.innerHTML = '';
  glyphCatalog.forEach((entry) => {
    const card = document.createElement('article');
    card.className = 'sg-card';
    card.dataset.category = entry.category;
    card.dataset.name = entry.name.toLowerCase();
    card.dataset.tags = entry.tags.join(' ');

    const preview = document.createElement('div');
    preview.className = 'sg-card-preview';
    preview.dataset.glyph = entry.id;
    preview.textContent = entry.frames[0];
    const firstFrameLength = (entry.frames[0] || '').length;
    if (firstFrameLength > 20) {
      preview.style.fontSize = '1.3rem';
    } else if (firstFrameLength > 10) {
      preview.style.fontSize = '1.7rem';
    }

    const name = document.createElement('div');
    name.className = 'sg-card-name';
    const strong = document.createElement('strong');
    strong.textContent = entry.name;
    name.appendChild(strong);
    const categoryLabel = glyphCategoryMeta.get(entry.category)?.label;
    if (categoryLabel) {
      const span = document.createElement('span');
      span.textContent = categoryLabel;
      name.appendChild(span);
    }

    const actions = document.createElement('div');
    actions.className = 'sg-card-actions';
    const copyData = document.createElement('button');
    copyData.type = 'button';
    copyData.className = 'sg-copy-btn';
    copyData.dataset.copyType = 'data';
    copyData.dataset.glyphId = entry.id;
    copyData.innerHTML = '<span class="copy-label">Copy data</span>';
    const copyUsage = document.createElement('button');
    copyUsage.type = 'button';
    copyUsage.className = 'sg-copy-btn';
    copyUsage.dataset.copyType = 'usage';
    copyUsage.dataset.glyphId = entry.id;
    copyUsage.innerHTML = '<span class="copy-label">Copy användning</span>';
    actions.append(copyData, copyUsage);

    const info = document.createElement('details');
    info.className = 'sg-card-info';
    const summary = document.createElement('summary');
    summary.textContent = 'Mer info';
    info.appendChild(summary);
    if (entry.description) {
      const desc = document.createElement('p');
      desc.textContent = entry.description;
      info.appendChild(desc);
    }
    const tags = document.createElement('ul');
    tags.className = 'sg-card-tags';
    entry.tags.forEach((tag) => {
      const li = document.createElement('li');
      li.textContent = tag;
      tags.appendChild(li);
    });
    info.appendChild(tags);

    card.append(preview, name, actions, info);
    gridEl.appendChild(card);
    glyphCardRefs.set(entry.id, card);
  });
}

let activeFilter = 'all';
let sortValue = 'az';

function initFilterAndSort() {
  const searchEl = document.getElementById('sg-search');
  const sortEl = document.getElementById('sg-sort');
  const filterContainer = document.getElementById('glyph-filter-pills');
  if (filterContainer) {
    filterContainer.addEventListener('click', (event) => {
      const target = event.target.closest('.sg-pill');
      if (!target) return;
      filterContainer.querySelectorAll('.sg-pill').forEach((btn) => {
        btn.classList.toggle('active', btn === target);
        btn.setAttribute('aria-pressed', btn === target ? 'true' : 'false');
      });
      activeFilter = target.dataset.filter || 'all';
      applyFilterAndSort(searchEl?.value || '');
    });
  }
  if (searchEl) {
    searchEl.addEventListener('input', () => applyFilterAndSort(searchEl.value));
    searchEl.addEventListener('search', () => applyFilterAndSort(searchEl.value));
  }
  if (sortEl) {
    sortEl.addEventListener('change', () => {
      sortValue = sortEl.value;
      applyFilterAndSort(searchEl?.value || '');
    });
  }
  applyFilterAndSort('');
}

function applyFilterAndSort(searchValue) {
  const gridEl = document.getElementById('sg-grid');
  const countEl = document.getElementById('sg-result-count');
  if (!gridEl || !countEl) return;
  const term = (searchValue || '').trim().toLowerCase();
  const filtered = glyphCatalog.filter((entry) => {
    const matchesFilter = activeFilter === 'all' || entry.category === activeFilter;
    const haystack = `${entry.name} ${entry.description} ${entry.tags.join(' ')}`.toLowerCase();
    const matchesSearch = !term || haystack.includes(term);
    return matchesFilter && matchesSearch;
  });
  glyphCatalog.forEach((entry) => {
    const card = glyphCardRefs.get(entry.id);
    if (!card) return;
    if (filtered.includes(entry)) {
      card.classList.remove('sg-card--hidden');
    } else {
      card.classList.add('sg-card--hidden');
    }
  });
  const sorted = [...filtered].sort((a, b) => {
    if (sortValue === 'category') {
      const ca = CATEGORY_ORDER[a.category] ?? 99;
      const cb = CATEGORY_ORDER[b.category] ?? 99;
      if (ca !== cb) return ca - cb;
    }
    if (sortValue === 'za') {
      return b.name.localeCompare(a.name, 'sv');
    }
    return a.name.localeCompare(b.name, 'sv');
  });
  sorted.forEach((entry) => {
    const card = glyphCardRefs.get(entry.id);
    if (card) gridEl.appendChild(card);
  });
  const total = glyphCatalog.length;
  const visible = filtered.length;
  countEl.textContent = visible === total ? `${total} animationer` : `Visar ${visible} av ${total}`;
}

class AlwaysSpinner {
  constructor(glyphEl, frames, options = {}) {
    this.el = glyphEl;
    this.frames = frames;
    this.frame = Math.floor(Math.random() * frames.length);
    this.speed = options.speed ?? 250;
    this.hoverSpeed = options.onHoverSpeed ?? 80;
    this.hovering = false;
    this.timer = null;
  }

  start() {
    this.tick();
  }

  tick() {
    if (!this.el || !this.frames.length) return;
    this.el.textContent = this.frames[this.frame % this.frames.length];
    this.frame += 1;
    const delay = this.hovering ? this.hoverSpeed : this.speed;
    this.timer = window.setTimeout(() => this.tick(), delay);
  }

  setHover(state) {
    this.hovering = state;
  }
}


function initCardPreviews() {
  document.querySelectorAll('.sg-card-preview[data-glyph]').forEach((el) => {
    const glyph = glyphMap.get(el.dataset.glyph || '');
    if (!glyph) return;
    const spinner = new AlwaysSpinner(el, glyph.frames, { speed: glyph.interval, onHoverSpeed: glyph.interval });
    setTimeout(() => spinner.start(), Math.random() * 400);
  });
}

function initInlineGlyphs() {
  document.querySelectorAll('.inline-glyph[data-glyph]').forEach((el) => {
    const glyph = glyphMap.get(el.dataset.glyph || '');
    if (!glyph) return;
    const spinner = new AlwaysSpinner(el, glyph.frames, { speed: glyph.interval, onHoverSpeed: glyph.interval });
    setTimeout(() => spinner.start(), Math.random() * 300);
  });
}

function escapeFrameChar(char) {
  if (char === '\\') return "'\\\\'";
  if (char === "'") return "'\\''";
  if (char.length === 1 && char.charCodeAt(0) > 127) {
    return `"\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}"`;
  }
  return `'${char}'`;
}

function initCopyButtons() {
  document.querySelectorAll('.sg-copy-btn[data-glyph-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const glyphId = btn.dataset.glyphId;
      const type = btn.dataset.copyType;
      if (!glyphId || !type) return;
      copyGlyphSnippet(glyphId, type).then((ok) => {
        if (ok) flashCopyLabel(btn);
      });
    });
  });
}

function copyGlyphSnippet(glyphId, type) {
  const entry = glyphMap.get(glyphId);
  if (!entry) return Promise.resolve(false);
  const text = type === 'data' ? formatGlyphData(entry) : formatGlyphUsage(entry);
  return copyToClipboard(text);
}

function formatGlyphData(entry) {
  const frames = entry.frames.map(escapeFrameChar).join(', ');
  return `  "${entry.id}": { interval: ${entry.interval}, frames: [${frames}] },`;
}

function formatGlyphUsage(entry) {
  const frames = entry.frames.map(escapeFrameChar).join(', ');
  return `// ${entry.name}\nconst frames = [${frames}];\nlet i = 0;\nconst timer = setInterval(() => {\n  element.textContent = frames[i % frames.length];\n  i += 1;\n}, ${entry.interval});\n// stoppa: clearInterval(timer);`;
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.top = '-9999px';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    const ok = document.execCommand('copy');
    return Promise.resolve(ok);
  } catch (e) {
    return Promise.resolve(false);
  } finally {
    document.body.removeChild(textarea);
  }
}

function flashCopyLabel(btn) {
  const label = btn.querySelector('.copy-label') || btn;
  const previous = label.textContent;
  label.textContent = 'Kopierat!';
  setTimeout(() => {
    label.textContent = previous;
  }, 1200);
}

function initThemeSwitcher() {
  const theme = getTheme();
  setTheme(theme);
  document.querySelectorAll('.sg-theme-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.dataset.theme) setTheme(btn.dataset.theme);
    });
  });
}

function getTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light' || saved === 'terminal') return saved;
  } catch (e) {
    /* ignore */
  }
  return 'dark';
}

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  document.querySelectorAll('.sg-theme-btn').forEach((btn) => {
    btn.setAttribute('aria-pressed', btn.dataset.theme === theme ? 'true' : 'false');
  });
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    /* ignore */
  }
}

function updateFullSetExport() {
  const pre = document.getElementById('sg-full-set');
  const copyBtn = document.getElementById('sg-copy-full');
  if (!pre || !copyBtn) return;
  const lines = ['const glyphAnimations = {'];
  glyphCatalog.forEach((entry) => {
    lines.push(formatGlyphData(entry));
  });
  lines.push('};');
  pre.querySelector('code').textContent = lines.join('\n');
  copyBtn.addEventListener('click', () => {
    copyToClipboard(lines.join('\n')).then((ok) => {
      if (ok) flashCopyLabel(copyBtn);
    });
  });
}

function initDropdowns() {
  document.querySelectorAll('.sg-dropdown').forEach((wrap) => {
    const trigger = wrap.querySelector('.sg-dropdown-trigger');
    const panel = wrap.querySelector('.sg-dropdown-panel');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', () => {
      const open = !panel.hidden;
      panel.hidden = open;
      trigger.setAttribute('aria-expanded', (!open).toString());
    });
    document.addEventListener('click', (event) => {
      if (!wrap.contains(event.target)) {
        panel.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

function initModal() {
  const openBtn = document.getElementById('sg-modal-open');
  const modal = document.getElementById('sg-modal');
  const closeBtn = document.getElementById('sg-modal-close');
  const backdrop = document.getElementById('sg-modal-backdrop');
  if (!openBtn || !modal) return;
  openBtn.addEventListener('click', () => {
    modal.hidden = false;
  });
  const closeModal = () => {
    modal.hidden = true;
  };
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
}

function initBuilder() {
  const paletteWrap = document.getElementById('builder-palette');
  const canvas = document.getElementById('builder-canvas');
  const clearBtn = document.getElementById('builder-clear');
  const resetBtn = document.getElementById('builder-reset-demo');
  const reduceMotionToggle = document.getElementById('builder-reduce-motion');
  builderTerminalFallback = document.getElementById('builder-terminal-fallback');
  if (!paletteWrap || !canvas) return;
 
  renderBuilderPalette(paletteWrap);
  builderRulers.x = document.getElementById('builder-ruler-x');
  builderRulers.y = document.getElementById('builder-ruler-y');

  canvas.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  });
  canvas.addEventListener('drop', (event) => {
    event.preventDefault();
    handleCanvasDrop(event);
  });
  canvas.addEventListener('click', (event) => {
    if (event.target === canvas) {
      setBuilderSelection(null);
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      builderState.length = 0;
      builderSelectedId = null;
      renderBuilderCanvas();
      updateBuilderCount();
      scheduleTerminalRender();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetBuilderDemo();
    });
  }

  if (reduceMotionToggle) {
    reduceMotionToggle.addEventListener('change', () => {
      builderSettings.reduceMotion = reduceMotionToggle.checked;
      renderBuilderCanvas();
      scheduleTerminalRender();
    });
  }

  window.addEventListener('resize', () => {
    renderBuilderCanvas();
    renderBuilderRulers();
    scheduleTerminalRender();
  });

  document.addEventListener('keydown', (event) => {
    if ((event.key === 'Delete' || event.key === 'Backspace') && builderSelectedId) {
      event.preventDefault();
      removeBuilderComponent(builderSelectedId);
    }
  });

  initTerminalPreview();
  resetBuilderDemo();
  renderBuilderRulers();
  setInterval(() => {
    if (builderSettings.reduceMotion || !builderState.length) return;
    builderFrame += 1;
    renderBuilderCanvas();
    scheduleTerminalRender();
  }, 420);
}

function handlePaletteDragStart(event, paletteId) {
  const data = JSON.stringify({ source: 'palette', paletteId });
  event.dataTransfer.setData('application/json', data);
  event.dataTransfer.setData('text/plain', data);
  event.dataTransfer.effectAllowed = 'copy';
}

function handleNodeDragStart(event, component) {
  const rect = event.currentTarget.getBoundingClientRect();
  const payload = {
    source: 'node',
    instanceId: component.instanceId,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
  };
  const data = JSON.stringify(payload);
  event.dataTransfer.setData('application/json', data);
  event.dataTransfer.setData('text/plain', data);
  event.dataTransfer.effectAllowed = 'move';
}

function handleCanvasDrop(event) {
  const canvas = document.getElementById('builder-canvas');
  if (!canvas) return;
  const dataText = event.dataTransfer.getData('application/json') || event.dataTransfer.getData('text/plain');
  if (!dataText) return;
  let payload;
  try {
    payload = JSON.parse(dataText);
  } catch (e) {
    return;
  }
  const rect = canvas.getBoundingClientRect();
  const metrics = getCanvasMetrics();
  if (!metrics) return;
  const dropX = event.clientX - rect.left;
  const dropY = event.clientY - rect.top;

  if (payload.source === 'palette' && payload.paletteId) {
    const paletteItem = paletteById.get(payload.paletteId);
    if (!paletteItem) return;
    const startX = clamp(Math.floor(dropX / metrics.cellWidth), 0, GRID.cols - paletteItem.width);
    const startY = clamp(Math.floor(dropY / metrics.cellHeight), 0, GRID.rows - paletteItem.height);
    addBuilderComponent(paletteItem, startX, startY);
    return;
  }

  if (payload.source === 'node' && payload.instanceId) {
    const component = builderState.find((item) => item.instanceId === payload.instanceId);
    if (!component) return;
    const adjustedX = dropX - (payload.offsetX || 0);
    const adjustedY = dropY - (payload.offsetY || 0);
    const newX = clamp(Math.floor(adjustedX / metrics.cellWidth), 0, GRID.cols - component.width);
    const newY = clamp(Math.floor(adjustedY / metrics.cellHeight), 0, GRID.rows - component.height);
    moveBuilderComponent(component.instanceId, newX, newY);
  }
}

function getCanvasMetrics() {
  const canvas = document.getElementById('builder-canvas');
  if (!canvas) return null;
  const rect = canvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return null;
  return {
    cellWidth: rect.width / GRID.cols,
    cellHeight: rect.height / GRID.rows,
  };
}

function instantiateComponent(paletteItem, x, y) {
  return {
    instanceId: createId(),
    paletteId: paletteItem.id,
    label: paletteItem.label,
    kind: paletteItem.kind,
    width: paletteItem.width,
    height: paletteItem.height,
    x,
    y,
    glyphId: paletteItem.glyphId,
    defaultText: paletteItem.defaultText,
  };
}

function renderBuilderPalette(container) {
  container.innerHTML = '';
  const grouped = new Map();
  builderPalette.forEach((item) => {
    const groupId = item.group || 'misc';
    if (!grouped.has(groupId)) grouped.set(groupId, []);
    grouped.get(groupId).push(item);
  });
  builderGroups.forEach((group) => {
    const items = grouped.get(group.id);
    if (!items || !items.length) return;
    const details = document.createElement('details');
    details.className = 'sg-builder-group';
    if (group.defaultOpen) details.open = true;
    const summary = document.createElement('summary');
    summary.textContent = group.label;
    details.appendChild(summary);
    const list = document.createElement('div');
    list.className = 'sg-builder-panel-list';
    items.forEach((item) => list.appendChild(createPaletteTool(item)));
    details.appendChild(list);
    container.appendChild(details);
  });
}

function createPaletteTool(item) {
  const tool = document.createElement('button');
  tool.type = 'button';
  tool.className = 'sg-builder-tool';
  tool.draggable = true;
  tool.dataset.paletteId = item.id;
  tool.innerHTML = `<h4>${item.label}</h4><p>${item.description}</p><span>${item.kind}</span>`;
  tool.addEventListener('dragstart', (event) => handlePaletteDragStart(event, item.id));
  return tool;
}

function addBuilderComponent(paletteItem, x, y) {
  const component = instantiateComponent(paletteItem, x, y);
  builderState.push(component);
  builderSelectedId = component.instanceId;
  renderBuilderCanvas();
  updateBuilderCount();
  scheduleTerminalRender();
}

function moveBuilderComponent(instanceId, x, y) {
  const component = builderState.find((item) => item.instanceId === instanceId);
  if (!component) return;
  component.x = x;
  component.y = y;
  builderSelectedId = instanceId;
  renderBuilderCanvas();
  scheduleTerminalRender();
}

function removeBuilderComponent(instanceId) {
  const index = builderState.findIndex((item) => item.instanceId === instanceId);
  if (index === -1) return;
  builderState.splice(index, 1);
  if (builderSelectedId === instanceId) builderSelectedId = null;
  renderBuilderCanvas();
  updateBuilderCount();
  scheduleTerminalRender();
}

function renderBuilderCanvas() {
  const canvas = document.getElementById('builder-canvas');
  if (!canvas) return;
  const metrics = getCanvasMetrics();
  if (!metrics) return;
  canvas.innerHTML = '';
  builderState.forEach((component) => {
    const node = document.createElement('button');
    node.type = 'button';
    node.className = 'builder-node';
    if (component.instanceId === builderSelectedId) node.classList.add('is-active');
    node.style.width = `${component.width * metrics.cellWidth}px`;
    node.style.height = `${component.height * metrics.cellHeight}px`;
    node.style.left = `${component.x * metrics.cellWidth}px`;
    node.style.top = `${component.y * metrics.cellHeight}px`;
    node.draggable = true;
    node.dataset.instanceId = component.instanceId;

    const title = document.createElement('div');
    title.className = 'builder-node-title';
    title.textContent = component.label;
    node.appendChild(title);

    const preview = document.createElement('pre');
    preview.className = 'builder-node-preview';
    preview.textContent = getNodePreviewContent(component);
    node.appendChild(preview);

    node.addEventListener('dragstart', (event) => handleNodeDragStart(event, component));
    node.addEventListener('click', (event) => {
      event.stopPropagation();
      setBuilderSelection(component.instanceId);
    });
    node.addEventListener('dblclick', (event) => {
      event.preventDefault();
      removeBuilderComponent(component.instanceId);
    });
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'builder-node-remove';
    removeBtn.setAttribute('aria-label', `Ta bort ${component.label}`);
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      removeBuilderComponent(component.instanceId);
    });
    node.appendChild(removeBtn);
    canvas.appendChild(node);
  });
  renderBuilderRulers();
}

function getNodePreviewContent(component) {
  const glyph = component.glyphId ? glyphMap.get(component.glyphId) : null;
  switch (component.kind) {
    case 'panel': {
      const lines = (component.defaultText || 'Panel Title').split('\n');
      return lines.slice(0, Math.max(1, component.height - 2)).join('\n');
    }
    case 'text':
      return component.defaultText || 'text';
    case 'button': {
      const label = (component.defaultText || 'Button').toUpperCase();
      return `[ ${label} ]`;
    }
    case 'spinner':
    case 'progress':
    case 'agent-feed':
    case 'multi-agent': {
      if (!glyph || !glyph.frames.length) return component.label;
      const index = builderSettings.reduceMotion ? 0 : builderFrame % glyph.frames.length;
      return glyph.frames[index];
    }
    default:
      return component.label;
  }
}

function renderBuilderRulers() {
  if (!builderRulers.x || !builderRulers.y) return;
  const metrics = getCanvasMetrics();
  const xTicks = [0, 20, 40, 60, 80];
  const yTicks = [0, 6, 12, 18, 24];
  builderRulers.x.innerHTML = '';
  builderRulers.y.innerHTML = '';
  if (!metrics) return;
  xTicks.forEach((value) => {
    const span = document.createElement('span');
    span.textContent = value.toString();
    builderRulers.x.appendChild(span);
  });
  yTicks.forEach((value) => {
    const span = document.createElement('span');
    span.textContent = value.toString();
    builderRulers.y.appendChild(span);
  });
}

function setBuilderSelection(instanceId) {
  builderSelectedId = instanceId;
  renderBuilderCanvas();
}

function updateBuilderCount() {
  const counter = document.getElementById('builder-block-count');
  if (!counter) return;
  counter.textContent = builderState.length.toString();
}
 
function initTerminalPreview() {
  const container = document.getElementById('builder-terminal-container');
  if (container && window.Terminal) {
    builderTerminal = new window.Terminal({
      rows: GRID.rows,
      cols: GRID.cols,
      convertEol: true,
      disableStdin: true,
      fontFamily: 'IBM Plex Mono, Space Mono, monospace',
      fontSize: 13,
      theme: { background: '#050405', foreground: '#f5e6c8' },
    });
    builderTerminal.open(container);
  }
}

function scheduleTerminalRender() {
  if (terminalRenderPending) return;
  terminalRenderPending = true;
  requestAnimationFrame(() => {
    terminalRenderPending = false;
    renderTerminalPreview();
  });
}

function renderTerminalPreview() {
  const output = renderAnsiLayout(builderState, builderFrame);
  if (builderTerminal) {
    builderTerminal.reset();
    builderTerminal.write(output);
  } else if (builderTerminalFallback) {
    builderTerminalFallback.textContent = output.replace(/\u001B\[[0-9;]*m/g, '');
  }
}

function resetBuilderDemo() {
  builderState.length = 0;
  builderSelectedId = null;
  const defaults = [
    { paletteId: 'panel-block', x: 2, y: 2 },
    { paletteId: 'agent-feed-block', x: 42, y: 2 },
    { paletteId: 'multi-agent-block', x: 2, y: 12 },
    { paletteId: 'kawaii-spinner', x: 52, y: 13 },
    { paletteId: 'progress-bar', x: 42, y: 18 },
  ];
  defaults.forEach((item) => {
    const paletteItem = paletteById.get(item.paletteId);
    if (paletteItem) {
      builderState.push(instantiateComponent(paletteItem, item.x, item.y));
    }
  });
  builderSelectedId = null;
  updateBuilderCount();
  renderBuilderCanvas();
  scheduleTerminalRender();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function renderAnsiLayout(components, frame) {
  const grid = Array.from({ length: GRID.rows }, () => Array.from({ length: GRID.cols }, () => ({ char: ' ' })));
  const writeText = (startX, startY, text, colorCode) => {
    const lines = text.split('\n');
    lines.forEach((line, rowOffset) => {
      const row = startY + rowOffset;
      if (row < 0 || row >= GRID.rows) return;
      [...line].forEach((char, colOffset) => {
        const col = startX + colOffset;
        if (col < 0 || col >= GRID.cols) return;
        grid[row][col] = { char, color: colorCode };
      });
    });
  };

  const drawPanel = (component, title, colorCode = 'accent') => {
    const { x, y, width, height } = component;
    for (let col = 0; col < width; col += 1) {
      if (y >= 0 && y < GRID.rows && x + col < GRID.cols) {
        grid[y][x + col] = { char: col === 0 ? '┌' : col === width - 1 ? '┐' : '─', color: colorCode };
      }
      if (y + height - 1 >= 0 && y + height - 1 < GRID.rows && x + col < GRID.cols) {
        grid[y + height - 1][x + col] = { char: col === 0 ? '└' : col === width - 1 ? '┘' : '─', color: colorCode };
      }
    }
    for (let row = 1; row < height - 1; row += 1) {
      if (y + row >= 0 && y + row < GRID.rows) {
        grid[y + row][x] = { char: '│', color: colorCode };
        grid[y + row][x + width - 1] = { char: '│', color: colorCode };
      }
    }
    writeText(x + 2, y + 1, title, 'accent');
  };

  components.forEach((component) => {
    const glyph = component.glyphId ? glyphMap.get(component.glyphId) : null;
    switch (component.kind) {
      case 'panel': {
        const lines = (component.defaultText || '').split('\n');
        drawPanel(component, lines[0] || 'Panel');
        const body = lines.slice(1).join('\n');
        if (body) writeText(component.x + 2, component.y + 2, body, 'muted');
        break;
      }
      case 'text': {
        writeText(component.x, component.y, component.defaultText || '', 'muted');
        break;
      }
      case 'button': {
        const label = component.defaultText || 'Button';
        const text = `[ ${label.toUpperCase()} ]`;
        writeText(component.x, component.y + 1, text, 'primary');
        break;
      }
      case 'spinner': {
        const frames = glyph?.frames || ['⠋'];
        const char = frames[frame % frames.length];
        writeText(component.x + 1, component.y + 1, `${char} Thinking`, 'accent');
        break;
      }
      case 'progress': {
        const frames = glyph?.frames || ['[-----]'];
        const bar = frames[frame % frames.length];
        writeText(component.x, component.y + 1, `${bar} ${(frame % 20) * 5}%`, 'primary');
        break;
      }
      case 'agent-feed': {
        const frames = glyph?.frames || [];
        const feedLines = frames.map((line, idx) => {
          const pointer = idx === frame % frames.length ? '▶' : '┊';
          return `${pointer} ${line}`;
        });
        writeText(component.x, component.y + 1, feedLines.join('\n'), 'muted');
        break;
      }
      case 'multi-agent': {
        drawPanel(component, 'Agent Deck', 'warning');
        const statuses = [
          `Researcher  ${frame % 3 === 0 ? '🔍 new intel' : '… scanning'}`,
          `Judge       ${frame % 3 === 1 ? '⚖️ scoring' : 'review queued'}`,
          `Builder     ${frame % 3 === 2 ? '✏️ patching' : 'awaiting brief'}`,
        ];
        writeText(component.x + 2, component.y + 2, statuses.join('\n'), 'muted');
        break;
      }
      default:
        break;
    }
  });

  return `${ANSI_RESET}${ESC}[2J${ESC}[H${gridToAnsi(grid)}`;
}

function gridToAnsi(grid) {
  let buffer = '';
  grid.forEach((row) => {
    let currentColor = null;
    row.forEach((cell) => {
      if (cell.color !== currentColor) {
        currentColor = cell.color;
        buffer += currentColor && ANSI_COLORS[currentColor] ? ANSI_COLORS[currentColor] : ANSI_RESET;
      }
      buffer += cell.char;
    });
    buffer += `${ANSI_RESET}\n`;
  });
  return buffer;
}

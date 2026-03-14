/**
 * Loading glyph styleguide — fristående, inga exports. Kör i webbläsare med <script src="script.js">
 */

const spinnerSets = {
  braille: ['\u280B','\u2819','\u2839','\u2838','\u283C','\u2834','\u2826','\u2827','\u2807','\u280F'],
  arrows:  ['\u2191','\u2197','\u2192','\u2198','\u2193','\u2199','\u2190','\u2196'],
  blocks:  ['\u2596','\u2598','\u259D','\u2597','\u259A','\u259E','\u2588','\u2593','\u2592','\u2591'],
  classic: ['|','/','-','\\','|','/','-','\\'],
  dots:    ['\u28FE','\u28FD','\u28FB','\u28BF','\u287F','\u28DF','\u28AF','\u28B7'],
  moon:    ['\u25D0','\u25D3','\u25D1','\u25D2'],
  line:    ['\u2581','\u2582','\u2583','\u2584','\u2585','\u2586','\u2587','\u2588','\u2587','\u2586','\u2585','\u2584','\u2583','\u2582'],
  hex:     ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'],
  quarter: ['\u25DC','\u25E0','\u25DD','\u25DF','\u25DE','\u25DE','\u25DD','\u25E0'],
  triangle: ['\u25E2','\u25E3','\u25E4','\u25E5'],
  square:  ['\u25F1','\u25F2','\u25F3','\u25F0'],
  binary:  ['0','1'],
  dice:    ['\u2680','\u2681','\u2682','\u2683','\u2684','\u2685'],
  circle:  ['\u25F4','\u25F7','\u25F6','\u25F5'],
  grow:    ['\u258F','\u258E','\u258D','\u258C','\u258B','\u258A','\u2589','\u2588'],
};

function escapeForJs(c) {
  if (c === '\\') return "'\\\\'";
  if (c === "'") return "'\\''";
  if (c.length === 1 && c.charCodeAt(0) > 127)
    return "'\\u" + c.charCodeAt(0).toString(16).padStart(4, '0') + "'";
  return "'" + c + "'";
}

function getUsageSnippet(name) {
  const chars = spinnerSets[name] || spinnerSets.moon;
  const arr = '[' + chars.map(escapeForJs).join(',') + ']';
  return '// ' + name + ' — paste into your project\nconst chars = ' + arr + ';\nlet i = 0;\nconst id = setInterval(() => {\n  element.textContent = chars[i % chars.length];\n  i++;\n}, 100);\n// stop when done: clearInterval(id);';
}

function getDataSnippet(name) {
  const chars = spinnerSets[name];
  if (!chars) return '';
  return '  ' + name + ': [' + chars.map(escapeForJs).join(',') + '],';
}

class AlwaysSpinner {
  constructor(glyph, chars, options) {
    options = options || {};
    this.glyph = glyph;
    this.chars = chars;
    this.frame = Math.floor(Math.random() * chars.length);
    this.speed = options.speed !== undefined ? options.speed : 250;
    this.timer = null;
    this.hovering = false;
    this.onHoverSpeed = options.onHoverSpeed !== undefined ? options.onHoverSpeed : 50;
  }

  start() {
    this.tick();
  }

  tick() {
    this.glyph.textContent = this.chars[this.frame % this.chars.length];
    this.frame++;
    var speed = this.hovering ? this.onHoverSpeed : this.speed;
    this.timer = setTimeout(this.tick.bind(this), speed);
  }

  setHover(on) {
    this.hovering = on;
  }
}

function initOpenBtnSpinners() {
  document.querySelectorAll('.open-btn[data-spinner]').forEach(function(btn) {
    var glyph = btn.querySelector('.open-glyph');
    if (!glyph) return;
    var setName = btn.dataset.spinner || 'braille';
    var chars = spinnerSets[setName] || spinnerSets.braille;
    var spinner = new AlwaysSpinner(glyph, chars);
    setTimeout(function() { spinner.start(); }, Math.random() * 800);
    btn.addEventListener('mouseenter', function() { spinner.setHover(true); });
    btn.addEventListener('mouseleave', function() { spinner.setHover(false); });
  });
}

function initInlineGlyphs() {
  document.querySelectorAll('.inline-glyph[data-spinner]').forEach(function(el) {
    var setName = el.dataset.spinner || 'braille';
    var chars = spinnerSets[setName] || spinnerSets.braille;
    var spinner = new AlwaysSpinner(el, chars, { speed: 80, onHoverSpeed: 80 });
    setTimeout(function() { spinner.start(); }, Math.random() * 200);
  });
}

function copyToClipboard(text) {
  return navigator.clipboard.writeText(text).then(function() { return true; }).catch(function() { return false; });
}

function flashCopyLabel(btn) {
  var label = btn.querySelector('.copy-label') || btn;
  var was = label.textContent;
  label.textContent = 'Kopierat!';
  setTimeout(function() { label.textContent = was; }, 1200);
}

function initCopyButtons() {
  document.querySelectorAll('[data-copy-data]').forEach(function(btn) {
    var name = btn.dataset.copyData;
    btn.addEventListener('click', function() {
      copyToClipboard(getDataSnippet(name)).then(function(ok) { if (ok) flashCopyLabel(btn); });
    });
  });
  document.querySelectorAll('[data-copy-usage]').forEach(function(btn) {
    var name = btn.dataset.copyUsage;
    btn.addEventListener('click', function() {
      copyToClipboard(getUsageSnippet(name)).then(function(ok) { if (ok) flashCopyLabel(btn); });
    });
  });
  var fullPre = document.getElementById('sg-full-set');
  var fullBtn = document.getElementById('sg-copy-full');
  if (fullPre && fullBtn) {
    var lines = ['const spinnerSets = {'];
    for (var name in spinnerSets) {
      if (spinnerSets.hasOwnProperty(name)) lines.push(getDataSnippet(name));
    }
    lines.push('};');
    fullPre.querySelector('code').textContent = lines.join('\n');
    fullBtn.addEventListener('click', function() {
      copyToClipboard(lines.join('\n')).then(function(ok) { if (ok) flashCopyLabel(fullBtn); });
    });
  }
}

var THEME_KEY = 'sg-theme';

var CATEGORY_ORDER = { dots: 1, arrows: 2, blocks: 3, ascii: 4, shapes: 5, symbols: 6 };
var SORT_AZ = 'az';
var SORT_ZA = 'za';
var SORT_CATEGORY = 'category';

function getTheme() {
  try {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light' || saved === 'terminal') return saved;
  } catch (e) {}
  return 'dark';
}

function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  document.querySelectorAll('.sg-theme-btn').forEach(function(btn) {
    btn.setAttribute('aria-pressed', btn.dataset.theme === theme ? 'true' : 'false');
  });
  try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
}

function initThemeSwitcher() {
  var theme = getTheme();
  setTheme(theme);
  document.querySelectorAll('.sg-theme-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      setTheme(btn.dataset.theme);
    });
  });
}

function getCardName(card) {
  var nameEl = card.querySelector('.sg-card-name');
  return nameEl ? nameEl.textContent.trim().toLowerCase() : '';
}

function getCardCategory(card) {
  return card.getAttribute('data-category') || '';
}

function applyFilterAndSort() {
  var searchEl = document.getElementById('sg-search');
  var gridEl = document.getElementById('sg-grid');
  var countEl = document.getElementById('sg-result-count');
  if (!gridEl || !countEl) return;

  var search = (searchEl && searchEl.value) ? searchEl.value.trim().toLowerCase() : '';
  var activePill = document.querySelector('.sg-pill--filter.active');
  var activeFilter = (activePill && activePill.dataset.filter) ? activePill.dataset.filter : 'all';
  var sortValue = 'az';
  var sortEl = document.getElementById('sg-sort');
  if (sortEl) sortValue = sortEl.value || 'az';

  var cards = Array.from(gridEl.querySelectorAll('.sg-card'));
  var visible = cards.filter(function(card) {
    var name = getCardName(card);
    var cat = getCardCategory(card);
    var matchSearch = !search || name.indexOf(search) !== -1;
    var matchCat = activeFilter === 'all' || cat === activeFilter;
    return matchSearch && matchCat;
  });

  visible.forEach(function(c) { c.classList.remove('sg-card--hidden'); });
  cards.forEach(function(c) {
    if (visible.indexOf(c) === -1) c.classList.add('sg-card--hidden');
  });

  visible.sort(function(a, b) {
    var na = getCardName(a);
    var nb = getCardName(b);
    if (sortValue === SORT_ZA) return nb.localeCompare(na);
    if (sortValue === SORT_CATEGORY) {
      var ca = CATEGORY_ORDER[getCardCategory(a)] || 99;
      var cb = CATEGORY_ORDER[getCardCategory(b)] || 99;
      if (ca !== cb) return ca - cb;
    }
    return na.localeCompare(nb);
  });

  visible.forEach(function(card) {
    gridEl.appendChild(card);
  });

  var total = cards.length;
  countEl.textContent = visible.length === total ? total + ' varianter' : 'Visar ' + visible.length + ' av ' + total;
}

function initFilterAndSort() {
  var searchEl = document.getElementById('sg-search');
  var sortEl = document.getElementById('sg-sort');
  document.querySelectorAll('.sg-pill--filter').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.sg-pill--filter').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyFilterAndSort();
    });
  });
  if (searchEl) {
    searchEl.addEventListener('input', applyFilterAndSort);
    searchEl.addEventListener('search', applyFilterAndSort);
  }
  if (sortEl) sortEl.addEventListener('change', applyFilterAndSort);
  applyFilterAndSort();
}

function initDropdowns() {
  document.querySelectorAll('.sg-dropdown').forEach(function(wrap) {
    var trigger = wrap.querySelector('.sg-dropdown-trigger');
    var panel = wrap.querySelector('.sg-dropdown-panel');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', function() {
      var open = !panel.hidden;
      panel.hidden = open;
      trigger.setAttribute('aria-expanded', !open);
    });
    document.addEventListener('click', function(e) {
      if (!wrap.contains(e.target)) {
        panel.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

function initModal() {
  var openBtn = document.getElementById('sg-modal-open');
  var modal = document.getElementById('sg-modal');
  var closeBtn = document.getElementById('sg-modal-close');
  var backdrop = document.getElementById('sg-modal-backdrop');
  if (!modal || !openBtn) return;
  openBtn.addEventListener('click', function() {
    modal.hidden = false;
  });
  function closeModal() {
    modal.hidden = true;
  }
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
}

document.addEventListener('DOMContentLoaded', function() {
  initThemeSwitcher();
  initFilterAndSort();
  initDropdowns();
  initModal();
  initOpenBtnSpinners();
  initInlineGlyphs();
  initCopyButtons();
});

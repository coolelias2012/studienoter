'use strict';

const NOTES_KEY    = 'sn_custom_notes';
const HASH_KEY     = 'sn_admin_hash';
const DRAFT_KEY    = 'sn_admin_draft';
const DEFAULT_PASS = 'Mathias2309';

const SUBJECTS = {
  matematik:    { name:'Matematik',   icon:'🔢', color:'#2563eb' },
  dansk:        { name:'Dansk',       icon:'📖', color:'#059669' },
  engelsk:      { name:'Engelsk',     icon:'🇬🇧', color:'#dc2626' },
  tysk:         { name:'Tysk',        icon:'🇩🇪', color:'#b45309' },
  'fysik-kemi': { name:'Fysik/Kemi',  icon:'⚛️', color:'#7c3aed' },
  biologi:      { name:'Biologi',     icon:'🌱', color:'#10b981' },
  geografi:     { name:'Geografi',    icon:'🌍', color:'#0891b2' },
  historie:     { name:'Historie',    icon:'📜', color:'#ea580c' },
  samfundsfag:  { name:'Samfundsfag', icon:'🏛️', color:'#e11d48' },
  informatik:   { name:'Informatik',  icon:'💻', color:'#475569' },
};
const LEVELS = {
  '0-3':'0–3. klasse','4-6':'4–6. klasse','7-9':'7–9. klasse',
  '10':'10. klasse','gym':'Gymnasium','uni':'Videregående',
};
const ICONS = ['📝','📐','📏','📌','🔢','🔤','🔬','🧪','🧬','⚗️','🧮','📊','📈','📉','🗺️','🌍','🌎','🌏','☀️','🌙','⭐','🔥','💧','❄️','⚡','🌱','🌲','🌺','🍎','🍕','🎵','🎨','🎭','🎬','📚','📖','📜','✏️','🖊️','🔍','🔎','💡','🔑','🏆','🥇','🏅','⚽','🎯','🧩','🎲','🤖','💻','📱','⌨️','🖥️','🔌','💾','☁️','🌐','📡','🛰️','🚀','✈️','🚂','🚢','🏠','🏫','🏛️','🏰','🗼','❤️','💙','💚','💛','🧡','💜','🖤','⚖️','🔗','⚙️','🔧','🔩','🛠️','🧲','🔋','💎','🪨','🌊','🏔️','🌋','🦋','🐝','🦁','🐳','🦅','🌸'];

// ── Toast ─────────────────────────────────────────────────────────────────

function toast(msg, type = 'ok') {
  const t = document.createElement('div');
  t.className = 'toast toast-' + type;
  t.textContent = msg;
  document.getElementById('toast-container').appendChild(t);
  setTimeout(() => t.style.opacity = '0', 2800);
  setTimeout(() => t.remove(), 3100);
}

// ── Password ──────────────────────────────────────────────────────────────

function checkPass(entered) {
  if (entered === DEFAULT_PASS) return true;
  const stored = localStorage.getItem(HASH_KEY);
  return stored ? btoa(entered) === stored : false;
}

// ── Login ─────────────────────────────────────────────────────────────────

const loginPass = document.getElementById('login-pass');
const loginErr  = document.getElementById('login-error');

document.getElementById('toggle-pass').addEventListener('click', function() {
  const show = loginPass.type === 'password';
  loginPass.type = show ? 'text' : 'password';
  this.textContent = show ? '🔒' : '👁';
});

function doLogin() {
  const btn = document.getElementById('login-btn');
  const pass = loginPass.value;
  if (checkPass(pass)) {
    btn.classList.add('login-success');
    btn.querySelector('span').textContent = '✓ Logger ind…';
    setTimeout(() => {
      sessionStorage.setItem('sn_admin', '1');
      document.getElementById('login-screen').classList.add('hidden');
      document.getElementById('app').classList.remove('hidden');
      initApp();
    }, 400);
  } else {
    loginErr.classList.remove('hidden');
    loginPass.value = '';
    loginPass.focus();
    loginPass.closest('.login-field').classList.add('shake');
    setTimeout(() => loginPass.closest('.login-field').classList.remove('shake'), 500);
  }
}

document.getElementById('login-btn').addEventListener('click', doLogin);
loginPass.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

if (sessionStorage.getItem('sn_admin') === '1') {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
}

function initApp() {
  updateBadges();
  renderDashboard();
  loadDraft();
}

document.getElementById('btn-logout').addEventListener('click', () => {
  sessionStorage.removeItem('sn_admin');
  location.reload();
});

// ── Menu toggle ───────────────────────────────────────────────────────────

document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// ── Icon Picker ───────────────────────────────────────────────────────────

const iconInput  = document.getElementById('f-icon');
const iconPicker = document.getElementById('icon-picker');
const iconGrid   = document.getElementById('icon-grid');

ICONS.forEach(emoji => {
  const b = document.createElement('button');
  b.className = 'icon-opt'; b.type = 'button'; b.textContent = emoji;
  b.addEventListener('click', () => {
    iconInput.value = emoji;
    iconPicker.classList.remove('open');
    updatePreviewBadge();
  });
  iconGrid.appendChild(b);
});

iconInput.addEventListener('click', () => iconPicker.classList.toggle('open'));
document.addEventListener('click', e => {
  if (!iconInput.contains(e.target) && !iconPicker.contains(e.target))
    iconPicker.classList.remove('open');
});

// ── Tabs ──────────────────────────────────────────────────────────────────

const TAB_IDS = ['dashboard', 'add', 'notes', 'stats', 'analytics', 'settings'];

function switchTab(tab) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.nav-btn[data-tab="${tab}"]`);
  if (btn) btn.classList.add('active');
  TAB_IDS.forEach(id => {
    document.getElementById('tab-' + id).classList.toggle('hidden', id !== tab);
  });
  if (tab === 'dashboard')  renderDashboard();
  if (tab === 'notes')      renderNotes();
  if (tab === 'stats')      renderStats();
  if (tab === 'analytics')  loadAnalytics();
  document.getElementById('sidebar').classList.remove('open');
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// ── Subject filter ────────────────────────────────────────────────────────

let activeSubjectFilter = 'all';
document.querySelectorAll('.subj-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.subj-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeSubjectFilter = btn.dataset.subject;
    switchTab('notes');
    renderNotes();
  });
});

// ── Notes storage ─────────────────────────────────────────────────────────

function loadNotes() {
  try { return JSON.parse(localStorage.getItem(NOTES_KEY) || '[]'); }
  catch { return []; }
}
function saveNotes(arr) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(arr));
  updateBadges();
}
function updateBadges() {
  const n = loadNotes().length;
  document.getElementById('note-count-badge').textContent = n + ' ' + (n === 1 ? 'note' : 'noter');
  document.getElementById('sidebar-count').textContent = n;
}

// ── Tags suggestions ──────────────────────────────────────────────────────

function updateTagsSuggestions() {
  const all = loadNotes().flatMap(n => n.tags || []);
  const unique = [...new Set(all)];
  const dl = document.getElementById('tags-suggestions');
  if (dl) dl.innerHTML = unique.map(t => `<option value="${esc(t)}">`).join('');
}

// ── Toolbar ───────────────────────────────────────────────────────────────

const ta = document.getElementById('f-body');

const SNIPPETS = {
  def:     '<div class="def-box"><strong>Begreb:</strong> Forklaring her</div>',
  formula: '<div class="formula-box">Formel her<br><span style="font-size:.85rem;opacity:.8">Forklaring på symbolerne</span></div>',
  example: '<div class="example-box">\n  <span class="ex-label">Eksempel</span>\n  Problem her\n  <div class="steps">\n    <div class="step"><div class="step-num">1</div><div class="step-content">Trin 1</div></div>\n    <div class="step"><div class="step-num">2</div><div class="step-content">Trin 2</div></div>\n  </div>\n</div>',
  tip:     '<div class="tip-box">Tip her</div>',
  warning: '<div class="warning-box">Typisk fejl her</div>',
  exam:    '<div class="exam-tip">Eksamentip her</div>',
  funfact: '<div class="fun-fact">Interessant fact her</div>',
  note:    '<div class="note-box">Husk dette her</div>',
  steps:   '<div class="steps">\n  <div class="step"><div class="step-num">1</div><div class="step-content">Trin 1</div></div>\n  <div class="step"><div class="step-num">2</div><div class="step-content">Trin 2</div></div>\n  <div class="step"><div class="step-num">3</div><div class="step-content">Trin 3</div></div>\n</div>',
  table:   '<table>\n  <tr><th>Kolonne 1</th><th>Kolonne 2</th><th>Kolonne 3</th></tr>\n  <tr><td>Celle 1</td><td>Celle 2</td><td>Celle 3</td></tr>\n  <tr><td>Celle 4</td><td>Celle 5</td><td>Celle 6</td></tr>\n</table>',
  p:       '<p>Skriv tekst her</p>',
  ul:      '<ul>\n  <li>Punkt 1</li>\n  <li>Punkt 2</li>\n  <li>Punkt 3</li>\n</ul>',
};

document.querySelectorAll('.tb[data-insert]').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.insert;
    const s = ta.selectionStart, e = ta.selectionEnd;
    if (type === 'bold') {
      const sel = ta.value.slice(s, e) || 'tekst';
      insertAt(s, e, `<strong>${sel}</strong>`);
    } else if (type === 'em') {
      const sel = ta.value.slice(s, e) || 'tekst';
      insertAt(s, e, `<em>${sel}</em>`);
    } else {
      insertAt(s, e, '\n' + (SNIPPETS[type] || '') + '\n');
    }
  });
});

document.getElementById('tb-clear-body').addEventListener('click', () => {
  if (!ta.value || confirm('Ryd alt indhold?')) { ta.value = ''; updatePreview(); }
});

function insertAt(s, e, text) {
  ta.value = ta.value.slice(0, s) + text + ta.value.slice(e);
  ta.selectionStart = ta.selectionEnd = s + text.length;
  ta.focus();
  updatePreview();
  scheduleDraftSave();
}

ta.addEventListener('input', () => { updatePreview(); scheduleDraftSave(); });

function updatePreview() {
  const html = ta.value.trim();
  const box  = document.getElementById('preview-content');
  box.innerHTML = html
    ? html
    : '<div class="preview-empty"><span>👀</span><p>Forhåndsvisning vises her<br>når du skriver indhold</p></div>';
  const chars = ta.value.length;
  const words = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
  const lines = ta.value.split('\n').length;
  document.getElementById('char-count').textContent = chars + ' tegn';
  document.getElementById('word-count').textContent = words + ' ord';
  document.getElementById('line-count').textContent = lines + ' linjer';
  updatePreviewBadge();
}

function updatePreviewBadge() {
  const sub  = document.getElementById('f-subject').value;
  const icon = iconInput.value || SUBJECTS[sub]?.icon || '📝';
  const title = document.getElementById('f-title').value || '–';
  const badge = document.getElementById('preview-subject-badge');
  badge.textContent = icon + ' ' + title;
  // Also update fullscreen if open
  const fst = document.getElementById('fullscreen-title');
  if (fst) fst.textContent = icon + ' ' + title;
}

document.getElementById('f-subject').addEventListener('change', updatePreviewBadge);
document.getElementById('f-title').addEventListener('input', () => { updatePreviewBadge(); scheduleDraftSave(); });

// ── Auto-save draft ───────────────────────────────────────────────────────

let draftTimer = null;

function scheduleDraftSave() {
  clearTimeout(draftTimer);
  draftTimer = setTimeout(saveDraft, 1500);
}

function saveDraft() {
  if (!sessionStorage.getItem('sn_admin')) return;
  const draft = {
    subject: document.getElementById('f-subject').value,
    level:   document.getElementById('f-level').value,
    title:   document.getElementById('f-title').value,
    icon:    iconInput.value,
    tags:    document.getElementById('f-tags').value,
    body:    ta.value,
    editingId,
  };
  if (!draft.body && !draft.title) { clearDraft(); return; }
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(draft)); } catch {}
  const badge = document.getElementById('autosave-status');
  badge.classList.remove('hidden');
  badge.textContent = '💾 Kladde gemt ' + new Date().toLocaleTimeString('da-DK', { hour:'2-digit', minute:'2-digit' });
  const topBadge = document.getElementById('draft-badge');
  topBadge.classList.remove('hidden');
  topBadge.textContent = '● Kladde';
}

function loadDraft() {
  try {
    const d = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
    if (!d || !d.body) return;
    document.getElementById('f-subject').value = d.subject || 'matematik';
    document.getElementById('f-level').value   = d.level   || '7-9';
    document.getElementById('f-title').value   = d.title   || '';
    iconInput.value = d.icon || '';
    document.getElementById('f-tags').value    = d.tags    || '';
    ta.value = d.body || '';
    editingId = d.editingId || null;
    updatePreview();
    updatePreviewBadge();
    if (d.editingId) {
      document.getElementById('btn-save-note').querySelector('.save-btn-text').textContent = 'Opdater note';
      document.getElementById('form-heading').textContent = 'Rediger note';
    }
    document.getElementById('autosave-status').classList.remove('hidden');
    document.getElementById('autosave-status').textContent = '📂 Kladde indlæst';
    document.getElementById('draft-badge').classList.remove('hidden');
    toast('📂 Kladde genindlæst', 'info');
  } catch {}
}

function clearDraft() {
  try { localStorage.removeItem(DRAFT_KEY); } catch {}
  document.getElementById('autosave-status').classList.add('hidden');
  document.getElementById('draft-badge').classList.add('hidden');
}

// ── Keyboard shortcuts ────────────────────────────────────────────────────

document.addEventListener('keydown', e => {
  // Skip if in input/select that's not the editor
  const tag = document.activeElement?.tagName;
  const inEditor = document.activeElement === ta;

  if (e.key === '?' && tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
    openShortcuts(); return;
  }

  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'k') { e.preventDefault(); openPalette(); return; }
    if (e.key === 's') { e.preventDefault(); document.getElementById('btn-save-note').click(); return; }
    if (e.key === 'p' && inEditor) { e.preventDefault(); openFullscreen(); return; }
    if (e.key === 'b' && inEditor) { e.preventDefault(); insertBoldAtCursor(); return; }
    if (e.key === 'i' && inEditor) { e.preventDefault(); insertItalicAtCursor(); return; }
    if (e.key === '1') { e.preventDefault(); switchTab('dashboard'); return; }
    if (e.key === '2') { e.preventDefault(); switchTab('add'); return; }
    if (e.key === '3') { e.preventDefault(); switchTab('notes'); return; }
    if (e.key === '4') { e.preventDefault(); switchTab('stats'); return; }
    if (e.key === '5') { e.preventDefault(); switchTab('analytics'); return; }
  }

  if (e.key === 'Escape') {
    closeFullscreen();
    closePaletteFn();
    closeShortcutsBtn();
  }
});

function insertBoldAtCursor() {
  const s = ta.selectionStart, end = ta.selectionEnd;
  const sel = ta.value.slice(s, end) || 'tekst';
  insertAt(s, end, `<strong>${sel}</strong>`);
}

function insertItalicAtCursor() {
  const s = ta.selectionStart, end = ta.selectionEnd;
  const sel = ta.value.slice(s, end) || 'tekst';
  insertAt(s, end, `<em>${sel}</em>`);
}

// ── Shortcuts modal ───────────────────────────────────────────────────────

function openShortcuts() {
  document.getElementById('shortcuts-modal').classList.remove('hidden');
}
function closeShortcutsBtn() {
  document.getElementById('shortcuts-modal').classList.add('hidden');
}
function closeShortcuts(e) {
  if (e.target.id === 'shortcuts-modal') closeShortcutsBtn();
}

// ── Command Palette ───────────────────────────────────────────────────────

const COMMANDS = [
  { label:'✏️ Ny note', action: () => switchTab('add'), keys: 'Ctrl+2' },
  { label:'📋 Mine noter', action: () => switchTab('notes'), keys: 'Ctrl+3' },
  { label:'🏠 Dashboard', action: () => switchTab('dashboard'), keys: 'Ctrl+1' },
  { label:'📊 Statistik', action: () => switchTab('stats'), keys: 'Ctrl+4' },
  { label:'👁 Besøgslog', action: () => switchTab('analytics'), keys: 'Ctrl+5' },
  { label:'⚙️ Indstillinger', action: () => switchTab('settings') },
  { label:'⬇ Eksporter noter', action: exportNotes },
  { label:'🗑 Ryd formular', action: clearForm },
  { label:'⛶ Fullscreen preview', action: openFullscreen, keys: 'Ctrl+P' },
  { label:'🔑 Log ud', action: () => document.getElementById('btn-logout').click() },
];

function openPalette() {
  const pal = document.getElementById('command-palette');
  pal.classList.remove('hidden');
  const inp = document.getElementById('palette-input');
  inp.value = '';
  inp.focus();
  renderPalette('');
}

function closePaletteFn() {
  document.getElementById('command-palette').classList.add('hidden');
}
function closePalette(e) {
  if (e.target.id === 'command-palette') closePaletteFn();
}

document.getElementById('palette-input').addEventListener('input', function() {
  renderPalette(this.value.toLowerCase());
});

document.getElementById('palette-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const first = document.querySelector('.palette-item.active');
    if (first) first.click();
  }
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    const items = [...document.querySelectorAll('.palette-item')];
    const cur = items.findIndex(i => i.classList.contains('active'));
    items.forEach(i => i.classList.remove('active'));
    const next = e.key === 'ArrowDown'
      ? items[(cur + 1) % items.length]
      : items[(cur - 1 + items.length) % items.length];
    if (next) { next.classList.add('active'); next.scrollIntoView({ block:'nearest' }); }
    e.preventDefault();
  }
});

function renderPalette(q) {
  const notes = loadNotes();
  const noteHits = notes.filter(n =>
    n.title.toLowerCase().includes(q) ||
    (n.tags||[]).some(t => t.toLowerCase().includes(q))
  ).slice(0, 6);

  const cmdHits = COMMANDS.filter(c => c.label.toLowerCase().includes(q));

  const box = document.getElementById('palette-results');

  if (!q && !noteHits.length && !cmdHits.length) {
    box.innerHTML = '<div class="palette-empty">Skriv for at søge noter og handlinger…</div>';
    return;
  }

  let html = '';

  if (cmdHits.length) {
    html += '<div class="palette-section-title">Handlinger</div>';
    html += cmdHits.map((c, i) => `
      <div class="palette-item ${i===0?'active':''}" onclick="runCmd(${COMMANDS.indexOf(c)})">
        <span class="palette-item-label">${c.label}</span>
        ${c.keys ? `<kbd class="palette-item-key">${c.keys}</kbd>` : ''}
      </div>`).join('');
  }

  if (noteHits.length) {
    html += '<div class="palette-section-title">Noter</div>';
    html += noteHits.map(n => {
      const sub = SUBJECTS[n.subject] || { name: n.subject, color:'#888' };
      return `<div class="palette-item" onclick="openNoteFromPalette('${n.id}')">
        <span class="palette-item-label">${n.icon||'📝'} ${esc(n.title)}</span>
        <span class="palette-item-meta" style="color:${sub.color}">${sub.name} · ${LEVELS[n.level]||n.level}</span>
      </div>`;
    }).join('');
  }

  if (!html) {
    html = '<div class="palette-empty">Ingen resultater for "' + esc(q) + '"</div>';
  }

  box.innerHTML = html;
}

function runCmd(idx) {
  closePaletteFn();
  COMMANDS[idx]?.action();
}

function openNoteFromPalette(id) {
  closePaletteFn();
  editNote(id);
  switchTab('add');
}

// ── Fullscreen Preview ────────────────────────────────────────────────────

function openFullscreen() {
  const overlay = document.getElementById('fullscreen-overlay');
  const content = document.getElementById('fullscreen-content');
  content.innerHTML = ta.value.trim() || '<p style="color:#666;text-align:center;padding:60px 20px">Ingen indhold endnu</p>';
  overlay.classList.remove('hidden');
  overlay.focus();
}

function closeFullscreen() {
  document.getElementById('fullscreen-overlay').classList.add('hidden');
}

// ── Save note ─────────────────────────────────────────────────────────────

let editingId = null;

document.getElementById('btn-save-note').addEventListener('click', doSaveNote);

function doSaveNote() {
  const subject = document.getElementById('f-subject').value;
  const level   = document.getElementById('f-level').value;
  const title   = document.getElementById('f-title').value.trim();
  const icon    = iconInput.value.trim() || SUBJECTS[subject]?.icon || '📝';
  const tagsRaw = document.getElementById('f-tags').value.trim();
  const body    = ta.value.trim();

  if (!title) { toast('Titel må ikke være tom', 'err'); showStatus('Titel mangler.', false); return; }
  if (!body)  { toast('Indhold må ikke være tomt', 'err'); showStatus('Indhold mangler.', false); return; }

  const tags  = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];
  const notes = loadNotes();

  if (editingId) {
    const idx = notes.findIndex(n => n.id === editingId);
    if (idx !== -1) notes[idx] = { ...notes[idx], subject, level, title, icon, tags, body, updated: Date.now() };
    editingId = null;
    document.getElementById('btn-save-note').querySelector('.save-btn-text').textContent = 'Gem note';
    document.getElementById('form-heading').textContent = 'Ny note';
    toast('✓ Note opdateret!', 'ok');
  } else {
    notes.push({ id: 'custom-' + Date.now(), subject, level, title, icon, tags, body, created: Date.now() });
    toast('✓ Note gemt og vises på siden!', 'ok');
  }

  saveNotes(notes);
  showStatus('✓ Gemt!', true);
  clearDraft();
  clearForm();
}

function showStatus(msg, ok) {
  const el = document.getElementById('save-status');
  el.textContent = msg;
  el.className = 'save-status ' + (ok ? 'ok' : 'err');
  el.classList.remove('hidden');
  if (ok) setTimeout(() => el.classList.add('hidden'), 3000);
}

document.getElementById('btn-clear-form').addEventListener('click', () => { clearForm(); clearDraft(); });

function clearForm() {
  editingId = null;
  document.getElementById('f-title').value = '';
  iconInput.value = '';
  document.getElementById('f-tags').value = '';
  ta.value = '';
  document.getElementById('save-status').classList.add('hidden');
  document.getElementById('btn-save-note').querySelector('.save-btn-text').textContent = 'Gem note';
  document.getElementById('form-heading').textContent = 'Ny note';
  updatePreview();
  updatePreviewBadge();
}

// ── Render notes ──────────────────────────────────────────────────────────

let searchQuery = '';

document.getElementById('notes-search').addEventListener('input', function() {
  searchQuery = this.value.toLowerCase();
  renderNotes();
});
document.getElementById('notes-sort').addEventListener('change', renderNotes);

function sortNotes(arr, by) {
  const cp = [...arr];
  if (by === 'newest') return cp.sort((a, b) => (b.created||0) - (a.created||0));
  if (by === 'oldest') return cp.sort((a, b) => (a.created||0) - (b.created||0));
  if (by === 'alpha')  return cp.sort((a, b) => a.title.localeCompare(b.title, 'da'));
  if (by === 'subject') return cp.sort((a, b) => a.subject.localeCompare(b.subject));
  return cp;
}

function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return (tmp.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120);
}

function renderNotes() {
  let notes = loadNotes();
  const subtitle = document.getElementById('notes-subtitle');
  const sortBy   = document.getElementById('notes-sort').value;

  if (activeSubjectFilter !== 'all')
    notes = notes.filter(n => n.subject === activeSubjectFilter);
  if (searchQuery)
    notes = notes.filter(n =>
      n.title.toLowerCase().includes(searchQuery) ||
      (n.tags || []).some(t => t.toLowerCase().includes(searchQuery)) ||
      stripHtml(n.body).toLowerCase().includes(searchQuery)
    );

  notes = sortNotes(notes, sortBy);
  subtitle.textContent = notes.length + ' noter' +
    (activeSubjectFilter !== 'all' ? ` i ${SUBJECTS[activeSubjectFilter]?.name}` : '') +
    (searchQuery ? ` · søger "${searchQuery}"` : '');

  const list = document.getElementById('notes-list');
  if (!notes.length) {
    list.innerHTML = `<div class="notes-empty"><span>📭</span><p>Ingen noter fundet</p></div>`;
    return;
  }

  list.innerHTML = notes.map(n => {
    const sub = SUBJECTS[n.subject] || { name: n.subject, color: '#888', icon: '📝' };
    const preview = stripHtml(n.body);
    const dateStr = n.updated
      ? 'Opdateret ' + relativeTime(n.updated)
      : n.created ? 'Oprettet ' + relativeTime(n.created) : '';
    return `<div class="note-card" data-id="${n.id}">
      <div class="note-icon" style="color:${sub.color}">${n.icon}</div>
      <div class="note-body">
        <div class="note-title">${esc(n.title)}</div>
        ${preview ? `<div class="note-preview">${esc(preview)}…</div>` : ''}
        <div class="note-meta">
          <span class="subj-pill" style="--c:${sub.color}">${sub.icon} ${sub.name}</span>
          <span>${LEVELS[n.level] || n.level}</span>
          ${n.tags?.length ? '<span>' + n.tags.slice(0,3).join(', ') + '</span>' : ''}
          ${dateStr ? `<span class="note-date">${dateStr}</span>` : ''}
        </div>
      </div>
      <div class="note-actions">
        <button class="note-btn" onclick="editNote('${n.id}')" title="Rediger">✏️</button>
        <button class="note-btn note-btn-dup" onclick="duplicateNote('${n.id}')" title="Dupliker">📋</button>
        <button class="note-btn note-btn-del" onclick="deleteNote('${n.id}')" title="Slet">🗑</button>
      </div>
    </div>`;
  }).join('');
}

function relativeTime(ts) {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1)  return 'lige nu';
  if (min < 60) return `${min} min. siden`;
  const h = Math.floor(min / 60);
  if (h < 24)   return `${h} t. siden`;
  const d = Math.floor(h / 24);
  if (d < 7)    return `${d} dage siden`;
  return new Date(ts).toLocaleDateString('da-DK', { day:'numeric', month:'short' });
}

function editNote(id) {
  const note = loadNotes().find(n => n.id === id);
  if (!note) return;
  editingId = id;
  document.getElementById('f-subject').value = note.subject;
  document.getElementById('f-level').value   = note.level;
  document.getElementById('f-title').value   = note.title;
  iconInput.value = note.icon;
  document.getElementById('f-tags').value    = (note.tags || []).join(', ');
  ta.value = note.body;
  document.getElementById('btn-save-note').querySelector('.save-btn-text').textContent = 'Opdater note';
  document.getElementById('form-heading').textContent = 'Rediger note';
  updatePreview(); updatePreviewBadge();
  switchTab('add');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  toast('ℹ️ Redigerer: ' + note.title, 'info');
}

function duplicateNote(id) {
  const note = loadNotes().find(n => n.id === id);
  if (!note) return;
  const notes = loadNotes();
  notes.push({
    ...note,
    id: 'custom-' + Date.now(),
    title: note.title + ' (kopi)',
    created: Date.now(),
    updated: undefined,
  });
  saveNotes(notes);
  renderNotes();
  toast('📋 Note duplikeret: ' + note.title, 'ok');
}

function deleteNote(id) {
  const note = loadNotes().find(n => n.id === id);
  const card = document.querySelector(`.note-card[data-id="${id}"]`);
  if (card) {
    card.classList.add('deleting');
    setTimeout(() => {
      if (!confirm('Slet "' + (note?.title || 'note') + '"?')) {
        card.classList.remove('deleting');
        return;
      }
      saveNotes(loadNotes().filter(n => n.id !== id));
      renderNotes();
      toast('🗑 Note slettet', 'info');
    }, 200);
  } else {
    if (!confirm('Slet "' + (note?.title || 'note') + '"?')) return;
    saveNotes(loadNotes().filter(n => n.id !== id));
    renderNotes();
    toast('🗑 Note slettet', 'info');
  }
}

// ── Dashboard ─────────────────────────────────────────────────────────────

function renderDashboard() {
  const notes = loadNotes();
  const total = notes.length;
  const subjects = [...new Set(notes.map(n => n.subject))].length;
  const recent = [...notes].sort((a, b) => (b.created||0) - (a.created||0)).slice(0, 5);
  const lastEdit = notes.length ? relativeTime(Math.max(...notes.map(n => n.updated||n.created||0))) : '–';

  // Stats by subject
  const bySub = {};
  for (const s in SUBJECTS) bySub[s] = 0;
  notes.forEach(n => { if (bySub[n.subject] !== undefined) bySub[n.subject]++; });
  const topSubject = Object.entries(bySub).sort((a,b) => b[1]-a[1])[0];

  const html = `
  <div class="dashboard-hero">
    <div class="dashboard-greeting">
      <h1 class="dash-title">Velkommen til Admin 👋</h1>
      <p class="dash-sub">Administrer noter, se statistik og hold styr på besøgende.</p>
    </div>
    <div class="dash-quick-actions">
      <button class="quick-card quick-card-primary" onclick="switchTab('add')">
        <span class="qc-icon">✏️</span>
        <span class="qc-label">Ny note</span>
        <kbd>Ctrl+2</kbd>
      </button>
      <button class="quick-card" onclick="switchTab('notes')">
        <span class="qc-icon">📋</span>
        <span class="qc-label">Se noter</span>
        <kbd>Ctrl+3</kbd>
      </button>
      <button class="quick-card" onclick="switchTab('analytics')">
        <span class="qc-icon">👁</span>
        <span class="qc-label">Besøgslog</span>
        <kbd>Ctrl+5</kbd>
      </button>
      <button class="quick-card" onclick="openPalette()">
        <span class="qc-icon">⌘</span>
        <span class="qc-label">Søg</span>
        <kbd>Ctrl+K</kbd>
      </button>
    </div>
  </div>

  <div class="dash-kpi-row">
    <div class="kpi-card kpi-blue">
      <div class="kpi-icon">📝</div>
      <div class="kpi-num" data-target="${total}">0</div>
      <div class="kpi-label">Noter i alt</div>
    </div>
    <div class="kpi-card kpi-green">
      <div class="kpi-icon">📚</div>
      <div class="kpi-num" data-target="${subjects}">0</div>
      <div class="kpi-label">Fag dækket</div>
    </div>
    <div class="kpi-card kpi-purple">
      <div class="kpi-icon">🏆</div>
      <div class="kpi-num kpi-text">${topSubject && topSubject[1] > 0 ? SUBJECTS[topSubject[0]]?.icon + ' ' + SUBJECTS[topSubject[0]]?.name : '–'}</div>
      <div class="kpi-label">Mest noter i</div>
    </div>
    <div class="kpi-card kpi-orange">
      <div class="kpi-icon">⏱</div>
      <div class="kpi-num kpi-text">${lastEdit}</div>
      <div class="kpi-label">Sidst redigeret</div>
    </div>
  </div>

  <div class="dash-body">
    <div class="dash-card">
      <div class="dash-card-header">
        <h3>🕐 Seneste noter</h3>
        <button class="ghost-btn ghost-btn-sm" onclick="switchTab('notes')">Se alle →</button>
      </div>
      ${recent.length ? recent.map(n => {
        const sub = SUBJECTS[n.subject] || { color:'#888', icon:'📝', name: n.subject };
        return `<div class="dash-note-row" onclick="editNote('${n.id}')">
          <span class="dash-note-icon" style="color:${sub.color}">${n.icon}</span>
          <div class="dash-note-info">
            <span class="dash-note-title">${esc(n.title)}</span>
            <span class="dash-note-meta">${sub.icon} ${sub.name} · ${LEVELS[n.level]||n.level} · ${relativeTime(n.updated||n.created||0)}</span>
          </div>
          <span class="dash-note-arrow">→</span>
        </div>`;
      }).join('') : '<p class="dash-empty">Ingen noter endnu. <button class="link-btn" onclick="switchTab(\'add\')">Tilføj den første →</button></p>'}
    </div>

    <div class="dash-card">
      <div class="dash-card-header">
        <h3>📊 Fordeling per fag</h3>
        <button class="ghost-btn ghost-btn-sm" onclick="switchTab('stats')">Statistik →</button>
      </div>
      <div class="dash-bar-list">
        ${Object.entries(SUBJECTS).map(([k, s]) => {
          const n = bySub[k] || 0;
          const pct = total > 0 ? Math.round(n / total * 100) : 0;
          return n > 0 ? `<div class="dash-bar-row">
            <span class="dash-bar-label">${s.icon} ${s.name}</span>
            <div class="dash-bar-track">
              <div class="dash-bar-fill" style="width:${pct}%;background:${s.color}"></div>
            </div>
            <span class="dash-bar-num">${n}</span>
          </div>` : '';
        }).join('') || '<p class="dash-empty">Ingen noter endnu.</p>'}
      </div>
    </div>

    <div class="dash-card dash-card-tips">
      <div class="dash-card-header"><h3>💡 Genveje</h3></div>
      <div class="dash-shortcuts">
        <div class="ds-row"><kbd>Ctrl+K</kbd><span>Command palette</span></div>
        <div class="ds-row"><kbd>Ctrl+S</kbd><span>Gem note</span></div>
        <div class="ds-row"><kbd>Ctrl+P</kbd><span>Fullscreen preview</span></div>
        <div class="ds-row"><kbd>Ctrl+B</kbd><span>Fed tekst i editor</span></div>
        <div class="ds-row"><kbd>?</kbd><span>Alle genveje</span></div>
      </div>
    </div>
  </div>`;

  document.getElementById('dashboard-content').innerHTML = html;

  // Animate KPI numbers
  document.querySelectorAll('.kpi-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target) || target === 0) { el.textContent = '0'; return; }
    let current = 0;
    const step = Math.ceil(target / 20);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(interval);
    }, 30);
  });
}

// ── Stats ─────────────────────────────────────────────────────────────────

function renderStats() {
  const notes = loadNotes();
  const total = notes.length;
  const bySub = {};
  const byLevel = {};
  for (const s in SUBJECTS) bySub[s] = 0;
  for (const l in LEVELS) byLevel[l] = 0;
  notes.forEach(n => {
    if (bySub[n.subject] !== undefined) bySub[n.subject]++;
    if (byLevel[n.level] !== undefined) byLevel[n.level]++;
  });
  const maxSub = Math.max(...Object.values(bySub), 1);
  const maxLvl = Math.max(...Object.values(byLevel), 1);

  const html = `
    <div class="stat-cards">
      <div class="stat-card" style="--c:var(--accent)">
        <div class="stat-card-icon">📝</div>
        <div class="stat-card-num">${total}</div>
        <div class="stat-card-label">Noter i alt</div>
      </div>
      ${Object.entries(bySub).filter(([,v]) => v > 0).map(([k, v]) => `
      <div class="stat-card" style="--c:${SUBJECTS[k].color}">
        <div class="stat-card-icon">${SUBJECTS[k].icon}</div>
        <div class="stat-card-num">${v}</div>
        <div class="stat-card-label">${SUBJECTS[k].name}</div>
      </div>`).join('')}
    </div>

    <div class="stats-grid">
      <div class="log-card">
        <h3>📚 Fordeling per fag</h3>
        <div class="stat-bar-row">
          ${Object.entries(SUBJECTS).map(([k, s]) => `
          <div class="stat-bar-item">
            <div class="stat-bar-label">${s.icon} ${s.name}</div>
            <div class="stat-bar-track">
              <div class="stat-bar-fill" style="width:${Math.round((bySub[k]||0)/maxSub*100)}%;--c:${s.color}"></div>
            </div>
            <div class="stat-bar-num">${bySub[k]||0}</div>
          </div>`).join('')}
        </div>
      </div>
      <div class="log-card">
        <h3>🎒 Fordeling per niveau</h3>
        <div class="stat-bar-row">
          ${Object.entries(LEVELS).map(([k, name]) => `
          <div class="stat-bar-item">
            <div class="stat-bar-label">${name}</div>
            <div class="stat-bar-track">
              <div class="stat-bar-fill" style="width:${Math.round((byLevel[k]||0)/maxLvl*100)}%;--c:var(--accent)"></div>
            </div>
            <div class="stat-bar-num">${byLevel[k]||0}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>`;

  document.getElementById('stats-content').innerHTML = html;
}

// ── Export / Import ───────────────────────────────────────────────────────

function exportNotes(asJs = false) {
  const notes = loadNotes();
  if (!notes.length) return toast('Ingen noter at eksportere', 'err');
  let content, mime, ext;
  if (asJs) {
    content = 'const CUSTOM_NOTES = ' + JSON.stringify(notes, null, 2) + ';\n';
    mime = 'text/javascript'; ext = '.js';
  } else {
    content = JSON.stringify(notes, null, 2);
    mime = 'application/json'; ext = '.json';
  }
  const blob = new Blob([content], { type: mime });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'studienoter-noter-' + new Date().toISOString().slice(0,10) + ext;
  a.click();
  URL.revokeObjectURL(a.href);
  toast('✓ Eksporteret!', 'ok');
}

function importNotesFromFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      let data = JSON.parse(e.target.result);
      // Support both raw array and {notes:[…]}
      if (data.notes) data = data.notes;
      if (!Array.isArray(data)) throw new Error('Forventet en array af noter');
      const existing = loadNotes();
      const existingIds = new Set(existing.map(n => n.id));
      const newNotes = data.filter(n => n.id && n.title && n.body && !existingIds.has(n.id));
      if (!newNotes.length) { toast('Ingen nye noter at importere (allerede importeret?)', 'info'); return; }
      saveNotes([...existing, ...newNotes]);
      renderNotes();
      toast(`✓ ${newNotes.length} noter importeret!`, 'ok');
    } catch(err) {
      toast('Fejl ved import: ' + err.message, 'err');
    }
  };
  reader.readAsText(file);
}

document.getElementById('btn-export').addEventListener('click', () => exportNotes(false));
document.getElementById('btn-export2').addEventListener('click', () => exportNotes(false));
document.getElementById('btn-export-js').addEventListener('click', () => exportNotes(true));
document.getElementById('btn-import-trigger').addEventListener('click', () => document.getElementById('import-file').click());
document.getElementById('import-file').addEventListener('change', e => importNotesFromFile(e.target.files[0]));
document.getElementById('import-file2').addEventListener('change', e => importNotesFromFile(e.target.files[0]));

// Drag-and-drop import
const dropZone = document.getElementById('import-drop-zone');
if (dropZone) {
  dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    importNotesFromFile(e.dataTransfer.files[0]);
  });
}

// ── Settings ──────────────────────────────────────────────────────────────

document.getElementById('btn-change-pass').addEventListener('click', () => {
  const oldP = document.getElementById('s-old').value;
  const newP = document.getElementById('s-new').value;
  const conP = document.getElementById('s-confirm').value;
  const fb   = document.getElementById('pass-feedback');
  if (!checkPass(oldP))  return setPF(fb, '✗ Nuværende kode er forkert', 'err');
  if (newP.length < 4)   return setPF(fb, '✗ Ny kode skal være mindst 4 tegn', 'err');
  if (newP !== conP)     return setPF(fb, '✗ De to koder er ikke ens', 'err');
  localStorage.setItem(HASH_KEY, btoa(newP));
  setPF(fb, '✓ Kode ændret', 'ok');
  ['s-old','s-new','s-confirm'].forEach(id => document.getElementById(id).value = '');
  toast('✓ Adgangskode ændret!', 'ok');
});

function setPF(el, msg, type) {
  el.textContent = msg;
  el.className = 'pass-feedback ' + type;
  el.classList.remove('hidden');
}

document.getElementById('btn-clear-all').addEventListener('click', () => {
  if (!confirm('Slet ALLE egne noter? Dette kan ikke fortrydes.')) return;
  localStorage.removeItem(NOTES_KEY);
  updateBadges();
  renderNotes();
  renderStats();
  toast('🗑 Alle noter slettet', 'info');
});

// ── Analytics ─────────────────────────────────────────────────────────────

const EVENT_LABELS = { pageview:'Sidevisning', view:'Fag åbnet', topic_open:'Emne åbnet', search:'Søgning', session_end:'Session afsluttet' };
const EVENT_ICONS  = { pageview:'🌐', view:'📚', topic_open:'📖', search:'🔍', session_end:'👋' };

async function loadAnalytics() {
  const box = document.getElementById('analytics-content');
  box.innerHTML = '<div class="log-loading"><div class="spinner"></div> Henter data fra server…</div>';
  try {
    const res = await fetch('/api/analytics');
    if (!res.ok) throw new Error('Server svarede ' + res.status + '. Er server.py startet?');
    const data = await res.json();
    renderAnalytics(data);
  } catch(e) {
    box.innerHTML = `<div class="log-error">
      <strong>⚠ Kunne ikke hente data</strong><br>${e.message}<br><br>
      Start serveren med:<br><code>python C:\\programmering\\skole\\server.py</code>
    </div>`;
  }
}

function renderAnalytics(data) {
  const events   = data.events || [];
  const sessions = data.sessions || {};
  const box      = document.getElementById('analytics-content');

  if (!events.length) {
    box.innerHTML = '<div class="log-empty">📭 Ingen events endnu. Data dukker op når besøgende bruger siden.</div>';
    return;
  }

  const byType = {}, bySubject = {}, byTopic = {}, bySearch = {}, byDay = {}, byHour = new Array(24).fill(0);

  for (const e of events) {
    byType[e.type] = (byType[e.type] || 0) + 1;
    if (e.subject) bySubject[e.subject] = (bySubject[e.subject] || 0) + 1;
    if (e.topic_title) byTopic[e.topic_title] = (byTopic[e.topic_title] || 0) + 1;
    if (e.query) bySearch[e.query] = (bySearch[e.query] || 0) + 1;
    if (e.ts) {
      const d = e.ts.slice(0, 10);
      byDay[d] = (byDay[d] || 0) + 1;
      const h = parseInt(e.ts.slice(11, 13));
      if (!isNaN(h)) byHour[h]++;
    }
  }

  const totalSessions = Object.keys(sessions).length;
  const pageviews     = byType['pageview'] || 0;
  const topicOpens    = byType['topic_open'] || 0;
  const searches      = byType['search'] || 0;
  const topTopics     = Object.entries(byTopic).sort((a,b) => b[1]-a[1]).slice(0, 8);
  const topSubjects   = Object.entries(bySubject).sort((a,b) => b[1]-a[1]).slice(0, 10);
  const topSearches   = Object.entries(bySearch).sort((a,b) => b[1]-a[1]).slice(0, 8);
  const maxSubj       = topSubjects[0]?.[1] || 1;
  const maxHour       = Math.max(...byHour, 1);
  const recent        = [...events].reverse().slice(0, 50);
  const days          = Object.entries(byDay).sort((a,b) => a[0].localeCompare(b[0])).slice(-14);
  const maxDay        = Math.max(...days.map(d=>d[1]), 1);

  document.getElementById('log-age').textContent = 'Opdateret: ' + new Date().toLocaleTimeString('da-DK');

  box.innerHTML = `
  <div class="stat-cards" style="margin-bottom:20px">
    <div class="stat-card" style="--c:#58a6ff"><div class="stat-card-icon">🌐</div><div class="stat-card-num">${pageviews}</div><div class="stat-card-label">Sidevisninger</div></div>
    <div class="stat-card" style="--c:#3fb950"><div class="stat-card-icon">👥</div><div class="stat-card-num">${totalSessions}</div><div class="stat-card-label">Sessioner</div></div>
    <div class="stat-card" style="--c:#d29922"><div class="stat-card-icon">📖</div><div class="stat-card-num">${topicOpens}</div><div class="stat-card-label">Emner åbnet</div></div>
    <div class="stat-card" style="--c:#a371f7"><div class="stat-card-icon">🔍</div><div class="stat-card-num">${searches}</div><div class="stat-card-label">Søgninger</div></div>
    <div class="stat-card" style="--c:#ec6547"><div class="stat-card-icon">📊</div><div class="stat-card-num">${events.length}</div><div class="stat-card-label">Events i alt</div></div>
  </div>
  <div class="analytics-grid">
    <div class="log-card">
      <h3>📅 Aktivitet – seneste 14 dage</h3>
      <div class="day-bars">
        ${days.map(([d, n]) => `
          <div class="day-col">
            <div class="day-bar-wrap" title="${n} events den ${d}">
              <div class="day-bar" style="height:${Math.round(n/maxDay*64)}px"></div>
            </div>
            <div class="day-label">${d.slice(5)}</div>
          </div>`).join('') || '<p class="no-data">Ingen data endnu</p>'}
      </div>
    </div>
    <div class="log-card">
      <h3>🕐 Aktivitet per time</h3>
      <div class="hour-grid">
        ${byHour.map((n, h) => `
          <div class="hour-cell" title="${h}:00 – ${n} events" style="background:color-mix(in srgb,#58a6ff ${Math.round(n/maxHour*80)+10}%,transparent)">
            ${h}
          </div>`).join('')}
      </div>
    </div>
    <div class="log-card">
      <h3>📚 Populære fag</h3>
      <div class="stat-bar-row">
        ${topSubjects.map(([k, n]) => {
          const s = SUBJECTS[k] || { name:k, color:'#888', icon:'📝' };
          return `<div class="stat-bar-item">
            <div class="stat-bar-label">${s.icon} ${s.name}</div>
            <div class="stat-bar-track"><div class="stat-bar-fill" style="width:${Math.round(n/maxSubj*100)}%;--c:${s.color}"></div></div>
            <div class="stat-bar-num">${n}</div>
          </div>`;
        }).join('') || '<p class="no-data">Ingen data</p>'}
      </div>
    </div>
    <div class="log-card">
      <h3>🔥 Populære emner</h3>
      <div class="top-list">
        ${topTopics.map(([t, n], i) => `
          <div class="top-item">
            <span class="top-rank">${i+1}</span>
            <span class="top-name">${esc(t)}</span>
            <span class="top-num">${n}</span>
          </div>`).join('') || '<p class="no-data">Ingen emner åbnet endnu</p>'}
      </div>
    </div>
    ${topSearches.length ? `<div class="log-card">
      <h3>🔍 Søgeord</h3>
      <div class="top-list">
        ${topSearches.map(([q, n], i) => `
          <div class="top-item">
            <span class="top-rank">${i+1}</span>
            <span class="top-name">${esc(q)}</span>
            <span class="top-num">${n}</span>
          </div>`).join('')}
      </div>
    </div>` : ''}
  </div>
  <div class="log-card" style="margin-top:16px">
    <h3>📋 Seneste events <span style="font-size:12px;color:var(--muted);font-weight:400">(${events.length} i alt)</span></h3>
    <div class="event-table">
      <div class="event-row event-header">
        <span>Tid</span><span>Type</span><span>Detalje</span><span>Session</span><span>Enhed</span>
      </div>
      ${recent.map(e => `
      <div class="event-row">
        <span class="event-time">${(e.ts||'').slice(11,19)}<br><small>${(e.ts||'').slice(0,10)}</small></span>
        <span class="event-type">${EVENT_ICONS[e.type]||'·'} ${EVENT_LABELS[e.type]||e.type}</span>
        <span class="event-detail">${eventDetail(e)}</span>
        <span class="event-sid" title="${e.session_id||''}">${(e.session_id||'').slice(0,6)}</span>
        <span class="event-ua">${e.ua_type==='mobile'?'📱':'🖥'}</span>
      </div>`).join('')}
    </div>
  </div>`;

  // Bind event knapper efter render
  document.getElementById('btn-refresh-log')?.addEventListener('click', loadAnalytics);
  document.getElementById('btn-clear-log')?.addEventListener('click', async () => {
    if (!confirm('Slet hele loggen?')) return;
    await fetch('/api/log', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({type:'__clear__'}) });
    toast('Log ryddet', 'info');
    loadAnalytics();
  });
  document.getElementById('btn-export-csv')?.addEventListener('click', () => exportCsv(events));
}

function exportCsv(events) {
  const rows = [['ts','type','subject','topic','query','session','device']];
  events.forEach(e => rows.push([
    e.ts||'', e.type||'', e.subject||'', e.topic_title||'', e.query||'',
    (e.session_id||'').slice(0,8), e.ua_type||'',
  ]));
  const csv = rows.map(r => r.map(v => '"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
  const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'analytics-' + new Date().toISOString().slice(0,10) + '.csv';
  a.click();
  URL.revokeObjectURL(a.href);
  toast('✓ CSV eksporteret', 'ok');
}

function eventDetail(e) {
  if (e.type === 'view') return (SUBJECTS[e.subject]?.name || e.subject||'') + (e.level ? ' · ' + e.level : '');
  if (e.type === 'topic_open') return esc(e.topic_title||'') + (e.subject ? ' (' + (SUBJECTS[e.subject]?.name||e.subject) + ')' : '');
  if (e.type === 'search') return '🔍 ' + esc(e.query||'');
  if (e.type === 'session_end') return (e.duration_s||0) + ' sek.';
  if (e.type === 'pageview') return e.path || '/';
  return '';
}

// Sæt event handlers der lander i DOM inden render
document.getElementById('btn-refresh-log').addEventListener('click', loadAnalytics);
document.getElementById('btn-clear-log').addEventListener('click', () => {});

// ── Utils ─────────────────────────────────────────────────────────────────

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ── Init ──────────────────────────────────────────────────────────────────

if (sessionStorage.getItem('sn_admin') === '1') {
  updateBadges();
  renderDashboard();
  loadDraft();
  updateTagsSuggestions();
}
updatePreview();
updatePreviewBadge();

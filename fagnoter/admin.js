'use strict';

const NOTES_KEY    = 'sn_custom_notes';
const HASH_KEY     = 'sn_admin_hash';
const DEFAULT_PASS = 'Mathias2309';

const SUBJECTS = {
  matematik:   { name:'Matematik',   icon:'🔢', color:'#2563eb' },
  dansk:       { name:'Dansk',       icon:'📖', color:'#059669' },
  engelsk:     { name:'Engelsk',     icon:'🇬🇧', color:'#dc2626' },
  tysk:        { name:'Tysk',        icon:'🇩🇪', color:'#b45309' },
  'fysik-kemi':{ name:'Fysik/Kemi', icon:'⚛️', color:'#7c3aed' },
  biologi:     { name:'Biologi',     icon:'🌱', color:'#10b981' },
  geografi:    { name:'Geografi',    icon:'🌍', color:'#0891b2' },
  historie:    { name:'Historie',    icon:'📜', color:'#ea580c' },
  samfundsfag: { name:'Samfundsfag', icon:'🏛️', color:'#e11d48' },
  informatik:  { name:'Informatik',  icon:'💻', color:'#475569' },
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
  const pass = loginPass.value;
  if (checkPass(pass)) {
    sessionStorage.setItem('sn_admin', '1');
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    updateBadges();
    renderStats();
  } else {
    loginErr.classList.remove('hidden');
    loginPass.value = '';
    loginPass.focus();
    loginPass.closest('.login-field').style.borderColor = 'var(--danger)';
    setTimeout(() => loginPass.closest('.login-field').style.borderColor = '', 1200);
  }
}

document.getElementById('login-btn').addEventListener('click', doLogin);
loginPass.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

if (sessionStorage.getItem('sn_admin') === '1') {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
}

document.getElementById('btn-logout').addEventListener('click', () => {
  sessionStorage.removeItem('sn_admin');
  location.reload();
});

// ── Menu toggle (mobile) ──────────────────────────────────────────────────

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

const TAB_IDS = ['add', 'notes', 'stats', 'analytics', 'settings'];

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    TAB_IDS.forEach(id => {
      document.getElementById('tab-' + id).classList.toggle('hidden', id !== tab);
    });
    if (tab === 'notes')     renderNotes();
    if (tab === 'stats')     renderStats();
    if (tab === 'analytics') loadAnalytics();
    document.getElementById('sidebar').classList.remove('open');
  });
});

// ── Subject filter ────────────────────────────────────────────────────────

let activeSubjectFilter = 'all';
document.querySelectorAll('.subj-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.subj-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeSubjectFilter = btn.dataset.subject;
    // Switch to notes tab
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.nav-btn[data-tab="notes"]').classList.add('active');
    TAB_IDS.forEach(id => document.getElementById('tab-' + id).classList.toggle('hidden', id !== 'notes'));
    renderNotes();
    document.getElementById('sidebar').classList.remove('open');
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

// ── Toolbar ───────────────────────────────────────────────────────────────

const ta = document.getElementById('f-body');

const SNIPPETS = {
  def:     '\n<div class="def-box">Skriv forklaring her</div>',
  formula: '\n<div class="formula-box">Skriv formel her</div>',
  example: '\n<div class="example-box"><span class="ex-label">Eks.</span> Skriv eksempel her</div>',
  p:       '\n<p>Skriv tekst her</p>',
  ul:      '\n<ul>\n  <li>Punkt 1</li>\n  <li>Punkt 2</li>\n</ul>',
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
      insertAt(s, e, SNIPPETS[type] || '');
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
}

ta.addEventListener('input', updatePreview);

function updatePreview() {
  const html = ta.value.trim();
  const box  = document.getElementById('preview-content');
  box.innerHTML = html || '<div class="preview-empty"><span>👀</span><p>Forhåndsvisning vises her når du skriver indhold</p></div>';
  const chars = ta.value.length;
  const lines = ta.value.split('\n').length;
  document.getElementById('char-count').textContent = chars + ' tegn';
  document.getElementById('line-count').textContent = lines + ' linjer';
  updatePreviewBadge();
}

function updatePreviewBadge() {
  const sub  = document.getElementById('f-subject').value;
  const icon = iconInput.value || SUBJECTS[sub]?.icon || '📝';
  const title= document.getElementById('f-title').value || '–';
  const badge= document.getElementById('preview-subject-badge');
  badge.textContent = icon + ' ' + title;
}

document.getElementById('f-subject').addEventListener('change', updatePreviewBadge);
document.getElementById('f-title').addEventListener('input', updatePreviewBadge);

// ── Save note ─────────────────────────────────────────────────────────────

let editingId = null;

document.getElementById('btn-save-note').addEventListener('click', () => {
  const subject = document.getElementById('f-subject').value;
  const level   = document.getElementById('f-level').value;
  const title   = document.getElementById('f-title').value.trim();
  const icon    = iconInput.value.trim() || SUBJECTS[subject]?.icon || '📝';
  const tagsRaw = document.getElementById('f-tags').value.trim();
  const body    = ta.value.trim();

  if (!title) return showStatus('Titel må ikke være tom.', false);
  if (!body)  return showStatus('Indhold må ikke være tomt.', false);

  const tags  = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];
  const notes = loadNotes();

  if (editingId) {
    const idx = notes.findIndex(n => n.id === editingId);
    if (idx !== -1) notes[idx] = { ...notes[idx], subject, level, title, icon, tags, body, updated: Date.now() };
    editingId = null;
    document.getElementById('btn-save-note').querySelector('.save-btn-text').textContent = 'Gem note';
    toast('✓ Note opdateret!', 'ok');
  } else {
    notes.push({ id: 'custom-' + Date.now(), subject, level, title, icon, tags, body, created: Date.now() });
    toast('✓ Note gemt og vises nu på siden!', 'ok');
  }

  saveNotes(notes);
  showStatus('✓ Gemt!', true);
  clearForm();
});

function showStatus(msg, ok) {
  const el = document.getElementById('save-status');
  el.textContent = msg;
  el.className = 'save-status ' + (ok ? 'ok' : 'err');
  el.classList.remove('hidden');
  if (ok) setTimeout(() => el.classList.add('hidden'), 3000);
}

document.getElementById('btn-clear-form').addEventListener('click', clearForm);

function clearForm() {
  editingId = null;
  document.getElementById('f-title').value = '';
  iconInput.value = '';
  document.getElementById('f-tags').value = '';
  ta.value = '';
  document.getElementById('save-status').classList.add('hidden');
  document.getElementById('btn-save-note').querySelector('.save-btn-text').textContent = 'Gem note';
  updatePreview();
  updatePreviewBadge();
}

// ── Render notes ──────────────────────────────────────────────────────────

let searchQuery = '';
document.getElementById('notes-search').addEventListener('input', function() {
  searchQuery = this.value.toLowerCase();
  renderNotes();
});

function renderNotes() {
  let notes = loadNotes();
  const subtitle = document.getElementById('notes-subtitle');

  if (activeSubjectFilter !== 'all')
    notes = notes.filter(n => n.subject === activeSubjectFilter);
  if (searchQuery)
    notes = notes.filter(n =>
      n.title.toLowerCase().includes(searchQuery) ||
      (n.tags || []).some(t => t.toLowerCase().includes(searchQuery))
    );

  subtitle.textContent = notes.length + ' noter' + (activeSubjectFilter !== 'all' ? ` i ${SUBJECTS[activeSubjectFilter]?.name}` : '') + (searchQuery ? ` · søger "${searchQuery}"` : '');

  const list = document.getElementById('notes-list');
  if (!notes.length) {
    list.innerHTML = `<div class="notes-empty"><span>📭</span><p>Ingen noter fundet</p></div>`;
    return;
  }

  list.innerHTML = notes.map(n => {
    const sub = SUBJECTS[n.subject] || { name: n.subject, color: '#888', icon: '📝' };
    return `<div class="note-card">
      <div class="note-icon">${n.icon}</div>
      <div class="note-body">
        <div class="note-title">${esc(n.title)}</div>
        <div class="note-meta">
          <span class="subj-pill" style="--c:${sub.color}">${sub.icon} ${sub.name}</span>
          <span>${LEVELS[n.level] || n.level}</span>
          ${n.tags?.length ? '<span>' + n.tags.join(', ') + '</span>' : ''}
        </div>
      </div>
      <div class="note-actions">
        <button class="note-btn" onclick="editNote('${n.id}')">✏️ Rediger</button>
        <button class="note-btn note-btn-del" onclick="deleteNote('${n.id}')">🗑</button>
      </div>
    </div>`;
  }).join('');
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
  updatePreview();
  updatePreviewBadge();
  // Switch to add tab
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.nav-btn[data-tab="add"]').classList.add('active');
  TAB_IDS.forEach(id => document.getElementById('tab-' + id).classList.toggle('hidden', id !== 'add'));
  document.getElementById('form-heading').textContent = 'Rediger note';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  toast('ℹ️ Redigerer: ' + note.title, 'info');
}

function deleteNote(id) {
  const note = loadNotes().find(n => n.id === id);
  if (!confirm('Slet "' + (note?.title || 'note') + '"?')) return;
  saveNotes(loadNotes().filter(n => n.id !== id));
  renderNotes();
  toast('🗑 Note slettet', 'info');
}

// ── Stats ─────────────────────────────────────────────────────────────────

function renderStats() {
  const notes = loadNotes();
  const total = notes.length;
  const bySub = {};
  for (const s in SUBJECTS) bySub[s] = 0;
  notes.forEach(n => { if (bySub[n.subject] !== undefined) bySub[n.subject]++; });
  const maxSub = Math.max(...Object.values(bySub), 1);

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
    <h3 style="margin-bottom:12px;font-size:13px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em">Fordeling per fag</h3>
    <div class="stat-bar-row">
      ${Object.entries(SUBJECTS).map(([k, s]) => `
      <div class="stat-bar-item">
        <div class="stat-bar-label">${s.icon} ${s.name}</div>
        <div class="stat-bar-track">
          <div class="stat-bar-fill" style="width:${Math.round((bySub[k]||0)/maxSub*100)}%;--c:${s.color}"></div>
        </div>
        <div class="stat-bar-num">${bySub[k]||0}</div>
      </div>`).join('')}
    </div>`;

  document.getElementById('stats-content').innerHTML = html;
}

// ── Export ────────────────────────────────────────────────────────────────

function exportNotes() {
  const notes = loadNotes();
  if (!notes.length) return toast('Ingen noter at eksportere', 'err');
  const blob = new Blob(['const CUSTOM_NOTES = ' + JSON.stringify(notes, null, 2) + ';\n'], { type: 'text/javascript' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'mine-noter-' + new Date().toISOString().slice(0,10) + '.js';
  a.click();
  URL.revokeObjectURL(a.href);
  toast('✓ Eksporteret!', 'ok');
}

document.getElementById('btn-export').addEventListener('click', exportNotes);
document.getElementById('btn-export2').addEventListener('click', exportNotes);

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
  document.getElementById('s-old').value = '';
  document.getElementById('s-new').value = '';
  document.getElementById('s-confirm').value = '';
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
  box.innerHTML = '<div class="log-loading">Henter data fra server…</div>';
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

  // Tæl event-typer
  const byType    = {};
  const bySubject = {};
  const byTopic   = {};
  const bySearch  = {};
  const byDay     = {};
  const byHour    = new Array(24).fill(0);

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

  const totalSessions  = Object.keys(sessions).length;
  const pageviews      = byType['pageview'] || 0;
  const topicOpens     = byType['topic_open'] || 0;
  const searches       = byType['search'] || 0;
  const avgDur         = Object.values(sessions).reduce((s,v) => s + (v.events||0), 0) / (totalSessions || 1);

  // Top emner
  const topTopics   = Object.entries(byTopic).sort((a,b) => b[1]-a[1]).slice(0, 8);
  const topSubjects = Object.entries(bySubject).sort((a,b) => b[1]-a[1]).slice(0, 10);
  const topSearches = Object.entries(bySearch).sort((a,b) => b[1]-a[1]).slice(0, 8);
  const maxSubj     = topSubjects[0]?.[1] || 1;
  const maxTopic    = topTopics[0]?.[1] || 1;
  const maxHour     = Math.max(...byHour, 1);

  // Seneste events
  const recent = [...events].reverse().slice(0, 50);

  // Dage (seneste 14)
  const days    = Object.entries(byDay).sort((a,b) => a[0].localeCompare(b[0])).slice(-14);
  const maxDay  = Math.max(...days.map(d=>d[1]), 1);

  document.getElementById('log-age').textContent = 'Sidst opdateret: ' + new Date().toLocaleTimeString('da-DK');

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
            <div class="day-bar-wrap" title="${n} events">
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
          <div class="hour-cell" title="${h}:00 – ${n} events" style="background: color-mix(in srgb, #58a6ff ${Math.round(n/maxHour*80)+10}%, transparent)">
            ${h}
          </div>`).join('')}
      </div>
    </div>

    <div class="log-card">
      <h3>📚 Populære fag</h3>
      <div class="stat-bar-row">
        ${topSubjects.map(([k, n]) => {
          const s = SUBJECTS[k] || { name: k, color: '#888', icon: '📝' };
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

  // Bind knapper
  document.getElementById('btn-refresh-log').addEventListener('click', loadAnalytics);
  document.getElementById('btn-clear-log').addEventListener('click', async () => {
    if (!confirm('Slet hele loggen? Kan ikke fortrydes.')) return;
    // Nulstil via at skrive tom log
    await fetch('/api/log', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({type:'__clear__'}) });
    toast('Log ryddet', 'info');
    loadAnalytics();
  });
}

function eventDetail(e) {
  if (e.type === 'view') return (SUBJECTS[e.subject]?.name || e.subject||'') + (e.level ? ' · ' + (e.level) : '');
  if (e.type === 'topic_open') return esc(e.topic_title||'') + (e.subject ? ' (' + (SUBJECTS[e.subject]?.name||e.subject) + ')' : '');
  if (e.type === 'search') return '🔍 ' + esc(e.query||'');
  if (e.type === 'session_end') return (e.duration_s||0) + ' sek.';
  if (e.type === 'pageview') return e.path || '/';
  return '';
}

// Refresh log-knapper (sættes efter render)
document.getElementById('btn-refresh-log')?.addEventListener('click', loadAnalytics);
document.getElementById('btn-clear-log')?.addEventListener('click', () => {});

// ── Utils ─────────────────────────────────────────────────────────────────

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ── Init ──────────────────────────────────────────────────────────────────

updateBadges();
updatePreview();
updatePreviewBadge();

'use strict';

// ===== GDPR / COOKIE CONSENT =====
const CONSENT_KEY = 'sn_cookie_consent';
const THEME_KEY   = 'sn_theme';
const PREFS_KEY   = 'sn_prefs';

function getConsent() {
  try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
}
function setConsent(val) {
  try { localStorage.setItem(CONSENT_KEY, val); } catch {}
}

const cookieBanner = document.getElementById('cookie-banner');
if (!getConsent()) {
  cookieBanner.classList.remove('hidden');
} else {
  cookieBanner.classList.add('hidden');
}

document.getElementById('btn-accept-all').addEventListener('click', () => {
  setConsent('all'); cookieBanner.classList.add('hidden');
});
document.getElementById('btn-accept-necessary').addEventListener('click', () => {
  setConsent('necessary'); cookieBanner.classList.add('hidden');
});
document.getElementById('btn-reject-all').addEventListener('click', () => {
  setConsent('rejected'); cookieBanner.classList.add('hidden');
});

const cookieSettingsBtn = document.getElementById('cookie-settings-btn');
if (cookieSettingsBtn) {
  cookieSettingsBtn.addEventListener('click', e => {
    e.preventDefault();
    setConsent(null);
    try { localStorage.removeItem(CONSENT_KEY); } catch {}
    cookieBanner.classList.remove('hidden');
    cookieBanner.scrollIntoView({ behavior: 'smooth' });
  });
}

// ===== THEME =====
function loadTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark') applyTheme('dark');
    else if (saved === 'light') applyTheme('light');
    else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  } catch { applyTheme('light'); }
}
function applyTheme(theme) {
  document.body.className = theme;
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}
document.getElementById('theme-toggle').addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  const next = isDark ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem(THEME_KEY, next); } catch {}
});
loadTheme();

// ===== STATE =====
let currentSubject = 'matematik';
let currentLevel   = '0-3';

function savePrefs() {
  try { localStorage.setItem(PREFS_KEY, JSON.stringify({ subject: currentSubject, level: currentLevel })); } catch {}
}
function loadPrefs() {
  try {
    const p = JSON.parse(localStorage.getItem(PREFS_KEY) || '{}');
    if (p.subject && CONTENT.subjects[p.subject]) currentSubject = p.subject;
    if (p.level) currentLevel = p.level;
  } catch {}
}
loadPrefs();

// ===== RENDER =====
function render() {
  const subjectData = CONTENT.subjects[currentSubject];
  const levelData   = subjectData?.levels?.[currentLevel];
  const area        = document.getElementById('content-area');

  if (!subjectData || !levelData) {
    const levelNames = { '0-3':'0–3. klasse','4-6':'4–6. klasse','7-9':'7–9. klasse','10':'10. klasse','gym':'Gymnasium','uni':'Videregående' };
    area.innerHTML = `<div class="empty-state">
      <div class="empty-icon">📭</div>
      <h3>Ingen noter fundet</h3>
      <p>Der er endnu ikke noter for <strong>${subjectData?.name || currentSubject}</strong> på <strong>${levelNames[currentLevel] || currentLevel}</strong>-niveau.<br>Vælg et andet klassetrin.</p>
    </div>`;
    return;
  }

  const headerHTML = `<div class="content-header">
    <span class="content-header-icon">${subjectData.icon}</span>
    <div class="content-header-text">
      <h1 style="color:${subjectData.color}">${subjectData.name} – ${levelData.title}</h1>
      <p>${levelData.description}</p>
    </div>
  </div>`;

  const topicsHTML = levelData.topics.map(topic => `
    <article class="topic-card" id="topic-${topic.id}">
      <div class="topic-card-header" onclick="toggleTopic(this)" role="button" tabindex="0"
           aria-expanded="false" onkeydown="if(event.key==='Enter'||event.key===' ')toggleTopic(this)">
        <span class="topic-icon">${topic.icon}</span>
        <span class="topic-title">${topic.title}</span>
        <span class="topic-toggle">▼</span>
      </div>
      <div class="topic-body">
        ${topic.body}
        ${topic.tags ? `<div class="topic-tags">${topic.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>` : ''}
      </div>
    </article>`).join('');

  area.innerHTML = headerHTML + `<div class="topics-grid">${topicsHTML}</div>`;
}

function toggleTopic(header) {
  const body    = header.nextElementSibling;
  const isOpen  = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  header.classList.toggle('open', !isOpen);
  header.setAttribute('aria-expanded', String(!isOpen));
}

// ===== NAVIGATION =====
document.querySelectorAll('.level-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.level-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed','true');
    currentLevel = btn.dataset.level;
    savePrefs();
    render();
  });
});

document.querySelectorAll('.subject-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.subject-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed','true');
    currentSubject = btn.dataset.subject;
    savePrefs();
    render();
  });
});

// Footer quick-nav links
document.querySelectorAll('[data-nav-subject]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const sub = link.dataset.navSubject;
    const btn = document.querySelector(`.subject-btn[data-subject="${sub}"]`);
    if (btn) btn.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Sync UI with loaded prefs
function syncUI() {
  document.querySelectorAll('.level-btn').forEach(b => {
    const active = b.dataset.level === currentLevel;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('.subject-btn').forEach(b => {
    const active = b.dataset.subject === currentSubject;
    b.classList.toggle('active', active);
    b.setAttribute('aria-pressed', String(active));
  });
}
syncUI();

// ===== SEARCH =====
const searchInput   = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

function buildSearchIndex() {
  const index = [];
  for (const [subKey, sub] of Object.entries(CONTENT.subjects)) {
    for (const [levelKey, level] of Object.entries(sub.levels)) {
      for (const topic of level.topics) {
        const text = [topic.title, ...(topic.tags || []), sub.name, level.title].join(' ').toLowerCase();
        index.push({ subKey, levelKey, topic, text, subName: sub.name, levelTitle: level.title });
      }
    }
  }
  return index;
}
const searchIndex = buildSearchIndex();

let searchTimeout;
searchInput.addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q || q.length < 2) { searchResults.classList.remove('visible'); return; }
    const hits = searchIndex.filter(e => e.text.includes(q)).slice(0, 8);
    if (!hits.length) {
      searchResults.innerHTML = '<div class="search-result-item"><span class="result-title">Ingen resultater</span></div>';
    } else {
      searchResults.innerHTML = hits.map(h =>
        `<div class="search-result-item" tabindex="0" role="option"
              data-sub="${h.subKey}" data-level="${h.levelKey}" data-topic="${h.topic.id}"
              onclick="pickResult(this)" onkeydown="if(event.key==='Enter')pickResult(this)">
          <div class="result-subject">${CONTENT.subjects[h.subKey].icon} ${h.subName} · ${h.levelTitle}</div>
          <div class="result-title">${h.topic.title}</div>
        </div>`).join('');
    }
    searchResults.classList.add('visible');
  }, 180);
});

function pickResult(el) {
  const { sub, level, topic } = el.dataset;
  searchResults.classList.remove('visible');
  searchInput.value = '';
  // navigate to subject + level
  currentSubject = sub; currentLevel = level;
  syncUI(); render();
  // open the card after render
  setTimeout(() => {
    const card = document.getElementById('topic-' + topic);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const header = card.querySelector('.topic-card-header');
      if (header && !header.classList.contains('open')) toggleTopic(header);
    }
  }, 120);
}

document.addEventListener('click', e => {
  if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
    searchResults.classList.remove('visible');
  }
});

// ===== PRINT =====
document.getElementById('print-btn').addEventListener('click', () => {
  // Open all topics before printing
  document.querySelectorAll('.topic-body').forEach(b => b.classList.add('open'));
  window.print();
});

// ===== TOPIC COUNT BADGES =====
function updateTopicCounts() {
  document.querySelectorAll('.subject-btn').forEach(btn => {
    const sub = CONTENT.subjects[btn.dataset.subject];
    if (!sub) return;
    const total = Object.values(sub.levels).reduce((s, l) => s + (l.topics?.length || 0), 0);
    const existing = btn.querySelector('.subject-count');
    if (existing) existing.textContent = total;
    else {
      const badge = document.createElement('span');
      badge.className = 'subject-count';
      badge.textContent = total;
      btn.appendChild(badge);
    }
  });
}

// Open first topic card by default after render
function openFirstTopic() {
  const first = document.querySelector('.topic-card-header');
  if (first && !first.classList.contains('open')) toggleTopic(first);
}

// ===== CUSTOM NOTES (fra admin-panel) =====
(function loadCustomNotes() {
  const LEVEL_LABELS = { '0-3':'0–3. klasse','4-6':'4–6. klasse','7-9':'7–9. klasse','10':'10. klasse','gym':'Gymnasium','uni':'Videregående' };
  try {
    const notes = JSON.parse(localStorage.getItem('sn_custom_notes') || '[]');
    for (const note of notes) {
      const sub = CONTENT.subjects[note.subject];
      if (!sub) continue;
      if (!sub.levels[note.level]) {
        sub.levels[note.level] = { title: LEVEL_LABELS[note.level] || note.level, description: 'Egne noter', topics: [] };
      }
      sub.levels[note.level].topics.push({
        id: note.id, title: note.title, icon: note.icon || '📝',
        tags: note.tags || [], body: note.body,
      });
    }
  } catch {}
})();

// ===== ANALYTICS =====
(function() {
  const SESSION_KEY = 'sn_session';
  let sid = sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(SESSION_KEY, sid);
  }

  const uaType = /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
  const pageStart = Date.now();

  function track(type, data) {
    if (getConsent() !== 'all') return;
    fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, session_id: sid, ua_type: uaType, ...data }),
      keepalive: true,
    }).catch(() => {});
  }

  // Pageview
  track('pageview', { path: location.pathname });

  // Session-varighed
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden')
      track('session_end', { duration_s: Math.round((Date.now() - pageStart) / 1000) });
  });

  // Fag og niveau klik — via event delegation på knapper
  document.querySelectorAll('.subject-btn').forEach(btn => {
    btn.addEventListener('click', () =>
      track('view', { subject: btn.dataset.subject, level: currentLevel })
    );
  });
  document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', () =>
      track('view', { subject: currentSubject, level: btn.dataset.level })
    );
  });

  // Emner åbnet — via event delegation på content-area
  document.getElementById('content-area').addEventListener('click', e => {
    const header = e.target.closest('.topic-card-header');
    if (!header) return;
    const card = header.closest('.topic-card');
    if (!card || header.classList.contains('open')) return; // kun ved åbning
    const title = header.querySelector('.topic-title')?.textContent || '';
    track('topic_open', {
      subject: currentSubject, level: currentLevel,
      topic_id: card.id.replace('topic-', ''), topic_title: title,
    });
  });

  // Søgning
  const si = document.getElementById('search-input');
  if (si) {
    let st;
    si.addEventListener('input', () => {
      clearTimeout(st);
      st = setTimeout(() => {
        if (si.value.trim().length >= 2)
          track('search', { query: si.value.trim() });
      }, 800);
    });
  }
})();

// ===== INITIAL RENDER =====
updateTopicCounts();
render();
setTimeout(openFirstTopic, 50);

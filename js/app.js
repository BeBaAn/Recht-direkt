
// ═══════════════════════════════════════════════════
// SITZUNGSSPEICHER / PFAD-HISTORY v1
// ═══════════════════════════════════════════════════

// Interner History-Stack: [{id, label}]
let navHistory = [];
let _isHome = true;

// Leserliche Labels für Breadcrumb – Startseiten + Rechtsgebiet-Einstiegsseiten
const NAV_LABELS = {
  'home':                    '🏠 Start',
  'rechtsgebiet_kaufrecht':  '🛒 Kaufrecht',
  'rechtsgebiet_mietrecht':  '🏠 Mietrecht',
  'rechtsgebiet_arbeitsrecht':'💼 Arbeitsrecht',
  'rechtsgebiet_sozialrecht': '🏛️ Sozialrecht',
  'rechtsgebiet_verbraucherrecht':'🔒 Verbraucherrecht',
  'templatespage':           '📄 Vorlagen',
  'main':                    '❓ Problemauswahl',
  'mietrechtmain':           '❓ Problemauswahl',
  'arbeitsrechtmain':        '❓ Problemauswahl',
  'sozialrechtmain':         '❓ Problemauswahl',
  'verbraucherrechtmain':    '❓ Problemauswahl',
};

// Gibt einen lesbaren Label für eine pageId zurück
function _navLabel(pageId) {
  if (NAV_LABELS[pageId]) return NAV_LABELS[pageId];
  // TREE_DATA Node? → Frage-Text kürzen
  const node = TREE_DATA[pageId];
  if (node && node.h) {
    const raw = node.h.replace(/[🛒📦↩️📫⏰❌🛡️💰💳🔍📸⚖️👤📝🗣️🧾🌍🇪🇺🌎]/gu, '').trim();
    return raw.length > 32 ? raw.slice(0, 30) + '…' : raw;
  }
  if (node && node.title) {
    const raw = node.title.trim();
    return raw.length > 32 ? raw.slice(0, 30) + '…' : raw;
  }
  // Statische Seite → lesbar machen
  return pageId
    .replace(/rechtsgebiet_?/i, '')
    .replace(/result_?/i, '✔ ')
    .replace(/_/g, ' ')
    .replace(/^(\w)/, c => c.toUpperCase())
    .slice(0, 32);
}

// Breadcrumb-Leiste aktualisieren
function _updateBreadcrumb() {
  const bc = document.getElementById('rd-breadcrumb');
  if (!bc) return;
  if (navHistory.length <= 1) {
    bc.classList.remove('visible');
    bc.innerHTML = '';
    return;
  }
  bc.classList.add('visible');
  bc.innerHTML = navHistory.map((entry, i) => {
    const id    = entry.id || entry;
    const label = entry.label || _navLabel(id);
    const isCurrent = (i === navHistory.length - 1);
    const sepHTML = i > 0 ? '<span class="rd-bc-sep" aria-hidden="true">›</span>' : '';
    if (isCurrent) {
      return `${sepHTML}<span class="rd-bc-item current" aria-current="step" title="${_e(label)}">${_e(label)}</span>`;
    }
    return `${sepHTML}<button class="rd-bc-item" onclick="_jumpTo(${i})" title="Zurück zu: ${_e(label)}">${_e(label)}</button>`;
  }).join('');
}

// Springe direkt zu einem bestimmten History-Eintrag (Breadcrumb-Klick)
function _jumpTo(index) {
  if (index < 0 || index >= navHistory.length - 1) return;
  // Schneide History auf diesen Index
  navHistory = navHistory.slice(0, index + 1);
  const target = navHistory[navHistory.length - 1];
  const id = target.id || target;
  navHistory.pop(); // navigate() pusht selbst
  navigate(id);
}

function navigate(pageId) {
  const label = _navLabel(pageId);
  const staticEl = document.getElementById(pageId);
  if (staticEl && staticEl.classList.contains('page')) {
    _showPage(staticEl);
    navHistory.push({ id: pageId, label });
    _isHome = (pageId === 'home');
    if (_isHome) { navHistory = [{ id: 'home', label: '🏠 Start' }]; _resetScroll(); }
    else window.scrollTo({top:0,behavior:'instant'});
    _updateBreadcrumb();
    return;
  }
  const node = TREE_DATA[pageId];
  if (node) {
    const dynEl = document.getElementById('dyn-page');
    dynEl.innerHTML = node.t === 'q' ? _renderQ(node) : _renderR(node);
    _showPage(dynEl);
    navHistory.push({ id: pageId, label });
    _isHome = false;
    window.scrollTo({top:0,behavior:'instant'});
    _updateBreadcrumb();
    return;
  }
  console.warn('Page not found:', pageId);
}

function _showPage(el) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  el.classList.remove('hidden');
}

function _resetScroll() {
  window.scrollTo({top:0,behavior:'smooth'});
}

function _renderQ_DE(node) {
  const prog = node.p ? `<div class="progress">${_e(node.p)}</div>` : '';
  const hint = node.hint ? `<div class="hint">${_e(node.hint)}</div>` : '';
  const btns = (node.b||[]).map(b =>
    `<button class="btn btn-secondary" onclick="navigate('${_e(b.n)}')">${_e(b.l)}</button>`
  ).join('');
  return `<div class="container">
    <button class="btn btn-back" onclick="goBack()">&#8592; Zurück</button>
    <div class="card">${prog}<h2>${_e(node.h)}</h2>${hint}${btns}</div>
  </div>`;
}

function _renderR_DE(node) {
  // Legacy-Pfad: freies HTML (alle bestehenden Nodes)
  if (node.html) {
    return `<div class="container">
      <button class="btn btn-back" onclick="goBack()">&#8592; Zurück</button>
      <div class="card">
        ${_buildPathSummary()}
        ${node.html}
        <button class="btn btn-primary" style="margin-top:24px" onclick="navigate('home')">&#8592; Neue Anfrage starten</button>
      </div>
    </div>`;
  }

  // Structured v5 – severity/steps/deadline/template_id
  const sev = node.severity || 'success';
  const M = {
    success:{ color:'#166534', bg:'#f0fdf4', border:'#86efac', badge:'✅ Ihre Rechte' },
    warning:{ color:'#92400e', bg:'#fffbeb', border:'#fcd34d', badge:'⚠️ Handlungsbedarf' },
    danger: { color:'#991b1b', bg:'#fef2f2', border:'#fca5a5', badge:'🚨 Dringend handeln' },
    info:   { color:'#1e40af', bg:'#eff6ff', border:'#93c5fd', badge:'ℹ️ Wichtige Info' }
  }[sev];
  const badge = node.badge || M.badge;

  const deadlineHTML = node.deadline ? `
    <div style="background:#fef2f2;border:1.5px solid #fca5a5;border-radius:8px;padding:12px 16px;margin-bottom:18px;display:flex;gap:10px;align-items:flex-start;">
      <span style="font-size:20px;flex-shrink:0;">⏰</span>
      <div><strong style="color:#991b1b;font-size:15px;">FRIST:</strong>
      <span style="color:#7f1d1d;font-size:15px;margin-left:6px;">${_e(node.deadline)}</span></div>
    </div>` : '';

  const alertHTML = node.alert ? `
    <div style="background:${M.bg};border-left:4px solid ${M.border};border-radius:0 8px 8px 0;padding:14px 16px;margin-bottom:18px;">
      <span style="color:${M.color};font-size:15px;">${_e(node.alert)}</span>
    </div>` : '';

  const summaryHTML = node.summary ? `
    <p style="color:var(--color-text-secondary,#4b5563);font-size:16px;line-height:1.65;margin-bottom:20px;">${_e(node.summary)}</p>` : '';

  let stepsHTML = '';
  if (node.steps && node.steps.length) {
    const items = node.steps.map((s, i) => {
      const label  = typeof s === 'string' ? s : s.label;
      const detail = typeof s === 'string' ? '' : (s.detail || '');
      return `<div style="display:flex;gap:14px;align-items:flex-start;padding:14px 16px;background:var(--color-surface,#fff);border:1px solid var(--color-border,#e5e7eb);border-radius:10px;">
        <div style="flex-shrink:0;width:28px;height:28px;border-radius:50%;background:${M.color};color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;">${i+1}</div>
        <div>
          <div style="font-weight:600;color:var(--color-text,#111);font-size:15px;">${_e(label)}</div>
          ${detail ? `<div style="color:var(--color-text-secondary,#6b7280);font-size:14px;margin-top:3px;">${_e(detail)}</div>` : ''}
        </div>
      </div>`;
    }).join('');
    stepsHTML = `<div style="margin-bottom:20px;">
      <div style="font-size:13px;font-weight:700;color:var(--color-text-secondary,#6b7280);letter-spacing:.06em;text-transform:uppercase;margin-bottom:10px;">Ihr Handlungsplan</div>
      <div style="display:flex;flex-direction:column;gap:8px;">${items}</div>
    </div>`;
  }

  let legalHTML = '';
  if (node.legal && node.legal.length) {
    const tags = node.legal.map(l =>
      `<span style="font-family:Georgia,serif;font-style:italic;font-size:13px;background:var(--color-bg-1,#f8fafc);border:1px solid var(--color-border,#e5e7eb);border-radius:5px;padding:3px 9px;color:var(--color-text-secondary,#374151);">§ ${_e(l)}</span>`
    ).join('');
    legalHTML = `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px;">${tags}</div>`;
  }

  let templateHTML = '';
  if (node.template_id) {
    const tmpl = (typeof ALL_TEMPLATES !== 'undefined') ? ALL_TEMPLATES.find(t => t.id === node.template_id) : null;
    const tmplName = tmpl ? tmpl.name : 'Passendes Musterschreiben';
    const tmplDesc = tmpl ? tmpl.description : '';
    templateHTML = `
      <div style="border:2px dashed var(--color-border,#d1d5db);border-radius:10px;padding:16px 18px;margin-bottom:18px;background:var(--color-bg-1,#f9fafb);">
        <div style="font-size:13px;font-weight:700;color:var(--color-text-secondary,#6b7280);letter-spacing:.06em;text-transform:uppercase;margin-bottom:8px;">📄 Passendes Musterschreiben</div>
        <div style="font-weight:600;color:var(--color-text,#111);font-size:16px;margin-bottom:4px;">${_e(tmplName)}</div>
        ${tmplDesc ? `<div style="color:var(--color-text-secondary,#6b7280);font-size:14px;margin-bottom:12px;">${_e(tmplDesc)}</div>` : ''}
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="showTemplatesPage();setTimeout(()=>openPreview('${_e(node.template_id)}'),350);" style="font-size:14px;padding:8px 16px;">
            👁 Vorlage ansehen
          </button>
          <button class="btn btn-secondary" onclick="copyTemplate('${_e(node.template_id)}')" style="font-size:14px;padding:8px 16px;">
            📋 Text kopieren
          </button>
        </div>
      </div>`;
  }

  const ctaNextHTML = node.cta_next ? `
    <button class="btn btn-secondary" onclick="navigate('${_e(node.cta_next)}')" style="margin-top:8px;">
      Weiter: Nächster Schritt →
    </button>` : '';

  return `<div class="container">
    <button class="btn btn-back" onclick="goBack()">&#8592; Zurück</button>
    <div class="card">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;">
        <span style="background:${M.bg};border:1px solid ${M.border};color:${M.color};border-radius:20px;padding:4px 12px;font-size:13px;font-weight:700;">${_e(badge)}</span>
      </div>
      <h1 style="font-size:clamp(1.25rem,3vw,1.75rem);font-weight:700;margin-bottom:18px;color:var(--color-text,#111);">${_e(node.title)}</h1>
      ${_buildPathSummary()}
      ${deadlineHTML}
      ${summaryHTML}
      ${alertHTML}
      ${stepsHTML}
      ${legalHTML}
      ${templateHTML}
      <div style="margin-top:24px;display:flex;flex-wrap:wrap;gap:10px;border-top:1px solid var(--color-border,#e5e7eb);padding-top:20px;">
        ${ctaNextHTML}
        <button class="btn btn-primary" onclick="navigate('home')">&#8592; Neue Anfrage starten</button>
        <button class="btn btn-secondary" onclick="showTemplatesPage()">📄 Alle Vorlagen</button>
      </div>
    </div>
  </div>`;
}

function _e(s) {
  if (!s) return '';
  return String(s).replace(/</g,'&lt;').replace(/>/g,'&gt;');
}


// Pfad-Zusammenfassung für Ergebnis-Seiten
function _buildPathSummary() {
  if (navHistory.length < 3) return '';
  const steps = navHistory.slice(1); // ohne Home
  const pills = steps.map((entry, i) => {
    const id    = entry.id || entry;
    const label = entry.label || _navLabel(id);
    const isLast = (i === steps.length - 1);
    const arrowHTML = i > 0 ? '<span class=\"rd-path-step-arrow\">›</span>' : '';
    if (isLast) {
      return arrowHTML + '<span class=\"rd-path-step\" style=\"background:var(--color-primary,#1e3a8a);color:#fff;border-color:var(--color-primary,#1e3a8a);\">' + _e(label) + '</span>';
    }
    return arrowHTML + '<button class=\"rd-path-step\" onclick=\"_jumpTo(' + (i+1) + ')\" title=\"Zurück zu: ' + _e(label) + '\">' + _e(label) + '</button>';
  }).join('');
  return '<div class=\"rd-path-summary\"><div class=\"rd-path-summary-label\">Ihr Pfad</div>' + pills + '</div>';
}

function goBack() {
  if (navHistory.length > 1) {
    navHistory.pop(); // aktuelle Seite raus
    const prev = navHistory[navHistory.length - 1];
    navHistory.pop(); // wird von navigate() neu gepusht
    navigate(prev.id || prev);
  } else {
    navHistory = [];
    navigate('home');
  }
}



function startJourney() { navigate('home'); }
function showTemplatesPage(preFilter) {
  navigate('templates_page');
  setTimeout(() => {
    renderTemplatesList(preFilter || 'all', '');
    if (preFilter) {
      const s = document.getElementById('template-area-filter');
      if (s) s.value = preFilter;
    }
  }, 50);
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ═══════════════════════════════════════════════════════════════
// TEMPLATE ENGINE v2
// ═══════════════════════════════════════════════════════════════
let _recentTemplates = [];
const _AREA_LABELS = {
  kaufrecht:      '🛒 Kaufrecht',
  mietrecht:      '🏠 Mietrecht',
  arbeitsrecht:   '💼 Arbeitsrecht',
  sozialrecht:    '🏛️ Sozialrecht',
  verbraucherrecht: '🛡️ Verbraucherrecht'
};

function filterTemplates() {
  const area = document.getElementById('template-area-filter').value;
  const txt  = document.getElementById('template-search').value;
  renderTemplatesList(area, txt);
}

function showRecentTemplates() {
  if (!_recentTemplates.length) {
    const btn = document.getElementById('recentlyBtn');
    if (btn) btn.textContent = 'Noch keine verwendet';
    return;
  }
  const recent = ALL_TEMPLATES.filter(t => _recentTemplates.includes(t.id))
    .sort((a, b) => _recentTemplates.indexOf(a.id) - _recentTemplates.indexOf(b.id));
  const container = document.getElementById('templates-collapsible-list');
  if (!container) return;
  const rows = recent.map(t => `<li class="tmpl-item" id="tmpl-item-${t.id}">
    <div class="tmpl-name">${_e(t.name)}</div>
    <div class="tmpl-desc">${_e(t.description || '')}</div>
    <div class="tmpl-actions">
      <button class="tmpl-btn primary" onclick="openPreview('${t.id}')"><span>👁</span> Vorschau</button>
      <button class="tmpl-btn" onclick="copyTemplate('${t.id}')"><span>📋</span> Kopieren</button>
    </div>
  </li>`).join('');
  container.innerHTML = `<div class="templates-area open">
    <div class="templates-area-header">
      <span>🕐 Zuletzt verwendet</span>
      <span style="margin-left:auto;font-size:14px;font-weight:400;color:var(--color-text-secondary,#6b7280);">${recent.length} Vorlagen</span>
    </div>
    <ul class="templates-list">${rows}</ul>
  </div>`;
}

function toggleArea(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

function openPreview(id) {
  const tmpl = ALL_TEMPLATES.find(t => t.id === id);
  if (!tmpl) return;
  _recentTemplates = [id, ..._recentTemplates.filter(r => r !== id)].slice(0, 10);
  const modal   = document.getElementById('template-preview-modal');
  const content = document.getElementById('modal-preview-content');
  if (!modal || !content) return;
  content.innerHTML = `
    <h2 id="templatePreviewTitle" style="font-size:20px;font-weight:700;margin-bottom:6px;color:var(--color-text,#111);">${_e(tmpl.name)}</h2>
    <p style="color:var(--color-text-secondary,#6b7280);font-size:14px;margin-bottom:20px;">${_e(tmpl.description || '')}</p>
    <pre style="white-space:pre-wrap;font-family:inherit;font-size:14px;line-height:1.7;
      background:var(--color-bg-1,#f8fafc);border:1px solid var(--color-border,#e5e7eb);
      border-radius:8px;padding:18px;max-height:45vh;overflow-y:auto;
      color:var(--color-text,#111);">${escapeHTML(tmpl.text || '')}</pre>
    <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:20px;">
      <button class="tmpl-btn primary" onclick="copyTemplate('${_e(id)}')">📋 Text kopieren</button>
      <button class="tmpl-btn" onclick="downloadTemplate('${_e(id)}')">⬇️ Als TXT speichern</button>
    </div>`;
  modal.classList.remove('hidden');
  modal.focus();
}

function hidePreview() {
  const m = document.getElementById('template-preview-modal');
  if (m) m.classList.add('hidden');
}

function copyTemplate(id) {
  const tmpl = ALL_TEMPLATES.find(t => t.id === id);
  if (!tmpl) return;
  const done = () => _showToast('✅ Text in Zwischenablage kopiert!');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(tmpl.text || '').then(done).catch(() => _copyFallback(tmpl.text, done));
  } else {
    _copyFallback(tmpl.text, done);
  }
}

function _copyFallback(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); cb(); } catch(e) {}
  document.body.removeChild(ta);
}

function downloadTemplate(id) {
  const tmpl = ALL_TEMPLATES.find(t => t.id === id);
  if (!tmpl) return;
  const blob = new Blob([tmpl.text || ''], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = (tmpl.file || tmpl.name || id).replace(/\.pdf$/i, '.txt');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  _showToast('⬇️ Datei wird heruntergeladen…');
}

function _showToast(msg) {
  let t = document.getElementById('_rd_toast');
  if (!t) {
    t = document.createElement('div');
    t.id = '_rd_toast';
    t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);' +
      'background:#1e3a8a;color:#fff;padding:12px 24px;border-radius:24px;font-size:15px;' +
      'font-weight:600;z-index:99999;box-shadow:0 4px 20px rgba(0,0,0,.2);' +
      'transition:opacity .3s;pointer-events:none;opacity:0;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(t._hide);
  t._hide = setTimeout(() => { t.style.opacity = '0'; }, 2500);
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') hidePreview(); });
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  const home = document.getElementById('home');
  home.classList.remove('hidden');
  navHistory = [{ id: 'home', label: '🏠 Start' }];
  _isHome = true;
  _updateBreadcrumb();
  // Init language
  _updateLangUI();
  if (currentLang !== 'de') {
    document.getElementById('html-root').lang = currentLang;
    document.title = t('pageTitle');
    _applyTranslations();
  }
});

  
// ═══════════════════════════════════════════════════════════════
// i18n – Internationalization System
// ═══════════════════════════════════════════════════════════════

const TRANSLATIONS = {
  de: {
    // Meta
    pageTitle: "Recht – Direkt | Kostenfreie Rechtsinformationen",
    // Header Nav
    navHome: "Startseite",
    navTemplates: "Mustervorlagen",
    // Hero
    heroBadge: "Kostenfreie Rechtsinformation",
    heroH1: "Ihr Recht.<br>Klar erklärt.",
    heroSub: "Interaktive Entscheidungsbäume für Ihre rechtliche Situation — ohne Anwalt, ohne Kosten, ohne Umwege.",
    heroCheckMiet: "✓ Mietrecht",
    heroCheckKauf: "✓ Kaufrecht",
    heroCheckArbeit: "✓ Arbeitsrecht",
    heroCheckSozial: "✓ Sozialrecht",
    heroCheckVerbraucher: "✓ Verbraucherrecht",
    heroScrollHint: "Rechtsgebiet wählen",
    // Section titles
    sectionChoose: "Wählen Sie Ihr Rechtsgebiet",
    // Cards
    cardMietTitle: "Mietrecht",
    cardMietDesc: "Mängel, Kündigung, Nebenkosten, Kaution, WG, Schimmel und mehr",
    cardKaufTitle: "Kaufrecht",
    cardKaufDesc: "Widerruf, Garantie, Mängel, Reklamation und Rückgabe",
    cardArbeitTitle: "Arbeitsrecht",
    cardArbeitDesc: "Kündigung, Abmahnung, Gehalt und Überstunden",
    cardSozialTitle: "Sozialrecht",
    cardSozialDesc: "Bürgergeld, Sanktionen, Krankengeld und Rente",
    cardVerbraucherTitle: "Verbraucherrecht",
    cardVerbraucherDesc: "Abofallen, Inkasso, Datenschutz und unerwünschte Werbung",
    cardVorlagenTitle: "Musterschreiben",
    cardVorlagenDesc: "Kostenfreie Vorlagen zum Download für alle Rechtsgebiete",
    cardCta: "Starten →",
    cardVorlagenCta: "Vorlagen ansehen →",
    // Disclaimer
    disclaimerStrong: "Wichtiger Hinweis:",
    // Breadcrumb
    breadcrumbHome: "🏠 Start",
    // Buttons
    btnBack: "← Zurück",
    btnNewRequest: "← Neue Anfrage starten",
    btnHome: "Zur Startseite",
    // Templates page
    templatesTitle: "Kostenfreie Musterschreiben",
    templatesSub: "Professionelle Vorlagen für alle Rechtsbereiche – kostenlos zum Download",
    templatesSearchPlaceholder: "Vorlage suchen…",
    templatesFilterAll: "Alle",
    templatesBtnCopy: "📋 Kopieren",
    templatesBtnDownload: "⬇️ Download",
    templatesBtnPreview: "👁 Vorschau",
    templatesPreviewTitle: "Vorschau",
    templatesPreviewClose: "✕ Schließen",
    templatesCopied: "✅ In Zwischenablage kopiert!",
    templatesDownloading: "⬇️ Datei wird heruntergeladen…",
    templatesNoResults: "Keine Vorlagen gefunden.",
    // Footer disclaimer
    footerDisclaimer: "Diese Website ersetzt keine Rechtsberatung.",
    // Path summary
    pathSummaryTitle: "Ihr Weg:",
  },
  en: {
    // Meta
    pageTitle: "Right – Direct | Free Legal Information",
    // Header Nav
    navHome: "Home",
    navTemplates: "Templates",
    // Hero
    heroBadge: "Free Legal Information",
    heroH1: "Your Rights.<br>Clearly Explained.",
    heroSub: "Interactive decision trees for your legal situation — no lawyer, no costs, no detours.",
    heroCheckMiet: "✓ Tenancy Law",
    heroCheckKauf: "✓ Consumer Sales Law",
    heroCheckArbeit: "✓ Employment Law",
    heroCheckSozial: "✓ Social Law",
    heroCheckVerbraucher: "✓ Consumer Protection",
    heroScrollHint: "Choose a legal area",
    // Section titles
    sectionChoose: "Choose Your Legal Area",
    // Cards
    cardMietTitle: "Tenancy Law",
    cardMietDesc: "Defects, termination, utilities, deposit, flat-share, mould and more",
    cardKaufTitle: "Consumer Sales Law",
    cardKaufDesc: "Withdrawal, warranty, defects, complaints and returns",
    cardArbeitTitle: "Employment Law",
    cardArbeitDesc: "Dismissal, warning, salary and overtime",
    cardSozialTitle: "Social Law",
    cardSozialDesc: "Citizen's allowance, sanctions, sick pay and pension",
    cardVerbraucherTitle: "Consumer Protection",
    cardVerbraucherDesc: "Subscription traps, debt collection, data protection and unwanted advertising",
    cardVorlagenTitle: "Template Letters",
    cardVorlagenDesc: "Free downloadable templates for all legal areas",
    cardCta: "Start →",
    cardVorlagenCta: "View templates →",
    // Disclaimer
    disclaimerStrong: "Important notice:",
    // Breadcrumb
    breadcrumbHome: "🏠 Home",
    // Buttons
    btnBack: "← Back",
    btnNewRequest: "← Start new enquiry",
    btnHome: "Back to Home",
    // Templates page
    templatesTitle: "Free Template Letters",
    templatesSub: "Professional templates for all legal areas – free to download",
    templatesSearchPlaceholder: "Search templates…",
    templatesFilterAll: "All",
    templatesBtnCopy: "📋 Copy",
    templatesBtnDownload: "⬇️ Download",
    templatesBtnPreview: "👁 Preview",
    templatesPreviewTitle: "Preview",
    templatesPreviewClose: "✕ Close",
    templatesCopied: "✅ Copied to clipboard!",
    templatesDownloading: "⬇️ Downloading file…",
    templatesNoResults: "No templates found.",
    // Footer disclaimer
    footerDisclaimer: "This website does not replace legal advice.",
    // Path summary
    pathSummaryTitle: "Your path:",
  }
};

// ── TREE DATA TRANSLATIONS ──────────────────────────────────────
// English translations for all TREE_DATA nodes
const TREE_DATA_EN = {};

// We build TREE_DATA_EN dynamically by translating TREE_DATA keys
// Static translations for all known node text
const NODE_TRANSLATIONS_EN = {
  // ── MAIN ENTRY ──
  "main": { p: "Step 1 of max. 8", h: "🛒 What is your main problem?", b: [
    "📦 Defects/issues with purchased goods", "↩️ Withdrawal (14-day right)", "📫 Damaged delivery",
    "🔄 Replacement / duplicate delivery", "💳 Payment deducted, no goods received",
    "📱 Subscription trap / unwanted contract", "🏷️ Wrong price charged"
  ]},

  // ── RECHTSGEBIET ENTRY NODES ──
  "rechtsgebiet_kaufrecht": { p: "Step 1 of max. 8", h: "🛒 Consumer Sales Law – What is your problem?", hint: null, b: [
    "📦 Defects/issues with purchased goods", "↩️ Withdrawal (14-day right)", "📫 Damaged delivery",
    "🔄 Replacement / duplicate delivery", "💳 Payment deducted, no goods received",
    "📱 Subscription trap / unwanted contract", "🏷️ Wrong price charged"
  ]},
  "rechtsgebiet_mietrecht": { p: "Step 1 of max. 9", h: "🏠 Tenancy Law – What is your problem?", hint: null, b: [
    "🔧 Defects / mould / repairs", "📋 Landlord termination / notice received",
    "💶 Rent increase / modernisation surcharge", "💰 Utility bill / advance payment",
    "🔑 Deposit / return of deposit", "🏘️ Flatshare / WG issues",
    "📝 Other (noise, payment arrears, etc.)", "🏢 Owner-occupied flat / WEG law"
  ]},
  "rechtsgebiet_arbeitsrecht": { p: "Step 1 of max. 6", h: "💼 Employment Law – What is your problem?", hint: null, b: [
    "Warning received", "Dismissal received", "Wages not paid / paid late",
    "Mobbing / Discrimination", "Request employment reference",
    "🏭 Works council / BR issues", "⚖️ Discrimination (AGG)", "🏦 Employer is insolvent"
  ]},
  "rechtsgebiet_sozialrecht": { p: "Step 1 of max. 6", h: "🏥 Social Law – What is your problem?", hint: null, b: [
    "Citizen's allowance (Bürgergeld) – sanction received", "Sick pay dispute / sickness benefits",
    "Pension / early retirement", "Care allowance / care level",
    "Unemployment benefits (ALG I)", "Disability / severely disabled status"
  ]},
  "rechtsgebiet_verbraucherrecht": { p: "Step 1 of max. 5", h: "🛡️ Consumer Protection – What is your problem?", hint: null, b: [
    "Subscription trap / unwanted contract", "Debt collection letter received",
    "Data protection / GDPR violation", "Unwanted advertising / spam",
    "Unfair contract terms"
  ]},

  // ── MIETRECHT MAIN ──
  "mietrecht_main": { p: "Step 2 of max. 9", h: "🏠 What is the problem?", hint: null, b: [
    "🔧 Defects / mould / repairs", "📋 Landlord termination / notice received",
    "💶 Rent increase / modernisation surcharge", "💰 Utility bill / advance payment",
    "🔑 Deposit / return of deposit", "🏘️ Flatshare / WG issues",
    "📝 Other (noise, payment arrears, etc.)", "🏢 Owner-occupied flat / WEG law"
  ]},

  // ── ARBEITSRECHT MAIN ──
  "arbeitsrecht_main": { p: "Step 1 of max. 6", h: "What is your problem?", hint: null, b: [
    "Warning received", "Dismissal received", "Wages not paid / paid late",
    "Mobbing / Discrimination", "Request employment reference",
    "🏭 Works council / BR issues", "⚖️ Discrimination (AGG)", "🏦 Employer is insolvent"
  ]},
};

// ── Current language state ──────────────────────────────────────
let currentLang = localStorage.getItem('rd_lang') || 'de';

function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) ||
         (TRANSLATIONS['de'] && TRANSLATIONS['de'][key]) || key;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('rd_lang', lang);
  document.getElementById('html-root').lang = lang;
  document.title = t('pageTitle');
  _updateLangUI();
  _applyTranslations();
  closeLangDropdown();
  // Re-render current dynamic page if open
  const dynEl = document.getElementById('dyn-page');
  if (dynEl && !dynEl.classList.contains('hidden')) {
    const curId = navHistory[navHistory.length - 1]?.id;
    if (curId && curId !== 'home') navigate(curId);
  }
}

function _updateLangUI() {
  const flags = { de: '🇩🇪', en: '🇬🇧' };
  const labels = { de: 'DE', en: 'EN' };
  document.getElementById('lang-flag').textContent = flags[currentLang] || '🇩🇪';
  document.getElementById('lang-label').textContent = labels[currentLang] || 'DE';
  ['de','en'].forEach(l => {
    const opt = document.getElementById('lang-opt-' + l);
    if (opt) opt.classList.toggle('active', l === currentLang);
  });
}

function toggleLangDropdown() {
  const btn = document.getElementById('lang-btn');
  const dd = document.getElementById('lang-dropdown');
  const isOpen = dd.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  btn.setAttribute('aria-expanded', isOpen);
}

function closeLangDropdown() {
  document.getElementById('lang-dropdown').classList.remove('open');
  document.getElementById('lang-btn').classList.remove('open');
  document.getElementById('lang-btn').setAttribute('aria-expanded', false);
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  const sel = document.getElementById('lang-selector');
  if (sel && !sel.contains(e.target)) closeLangDropdown();
});

function _applyTranslations() {
  const lang = currentLang;
  const T = TRANSLATIONS[lang] || TRANSLATIONS['de'];

  // Nav links
  const navLinks = document.querySelectorAll('.nav-link');
  if (navLinks[0]) navLinks[0].textContent = T.navHome;
  if (navLinks[1]) navLinks[1].textContent = T.navTemplates;

  // Hero
  const heroBadge = document.querySelector('.rd-hero-badge');
  if (heroBadge) heroBadge.textContent = T.heroBadge;
  const heroH1 = document.querySelector('.rd-hero-h1');
  if (heroH1) heroH1.innerHTML = T.heroH1;
  const heroSub = document.querySelector('.rd-hero-sub');
  if (heroSub) heroSub.textContent = T.heroSub;
  const heroChecks = document.querySelectorAll('.rd-hero-checks span');
  const checkKeys = ['heroCheckMiet','heroCheckKauf','heroCheckArbeit','heroCheckSozial','heroCheckVerbraucher'];
  heroChecks.forEach((el, i) => { if (checkKeys[i]) el.textContent = T[checkKeys[i]]; });
  const scrollHint = document.querySelector('.rd-scroll-hint span');
  if (scrollHint) scrollHint.textContent = T.heroScrollHint;

  // Section title
  const sectionTitle = document.querySelector('.rd-section-title');
  if (sectionTitle) sectionTitle.textContent = T.sectionChoose;

  // Cards – using data attributes for identification
  const cards = document.querySelectorAll('.rd-card');
  const cardData = [
    { title: 'cardMietTitle',        desc: 'cardMietDesc',         cta: 'cardCta' },
    { title: 'cardKaufTitle',        desc: 'cardKaufDesc',         cta: 'cardCta' },
    { title: 'cardArbeitTitle',      desc: 'cardArbeitDesc',       cta: 'cardCta' },
    { title: 'cardSozialTitle',      desc: 'cardSozialDesc',       cta: 'cardCta' },
    { title: 'cardVerbraucherTitle', desc: 'cardVerbraucherDesc',  cta: 'cardCta' },
    { title: 'cardVorlagenTitle',    desc: 'cardVorlagenDesc',     cta: 'cardVorlagenCta' },
  ];
  cards.forEach((card, i) => {
    if (!cardData[i]) return;
    const h3 = card.querySelector('h3');
    const p  = card.querySelector('p');
    const cta = card.querySelector('.rd-card-cta');
    if (h3)  h3.textContent  = T[cardData[i].title] || h3.textContent;
    if (p)   p.textContent   = T[cardData[i].desc]  || p.textContent;
    if (cta) cta.textContent = T[cardData[i].cta]   || cta.textContent;
  });

  // Disclaimer strong text
  const disclaimerStrong = document.querySelector('.rd-disclaimer strong');
  if (disclaimerStrong) disclaimerStrong.textContent = T.disclaimerStrong;

  // Templates page
  const tplTitle = document.querySelector('#templates_page h1, #templates_page .tpl-title');
  if (tplTitle) tplTitle.textContent = T.templatesTitle;
  const tplSub = document.querySelector('#templates_page .tpl-sub, #templates_page .rd-hero-sub');
  if (tplSub) tplSub.textContent = T.templatesSub;
  const tplSearch = document.querySelector('#templates_page input[type="text"], #templates_page input[type="search"]');
  if (tplSearch) tplSearch.placeholder = T.templatesSearchPlaceholder;
}

// ── Override _renderQ / _renderR to support EN translations ────
const _renderQ_orig = window._renderQ_i18n_done ? null : _renderQ;

function _renderQ(node) {
  // If English and node has an EN translation key, substitute text
  if (currentLang === 'en') {
    node = _translateNode(node);
  }
  const prog = node.p ? `<div class="progress">${_e(node.p)}</div>` : '';
  const hint = node.hint ? `<div class="hint">${_e(node.hint)}</div>` : '';
  const btns = (node.b||[]).map(b =>
    `<button class="btn btn-secondary" onclick="navigate('${_e(b.n)}')">${_e(b.l)}</button>`
  ).join('');
  return `<div class="container">
    <button class="btn btn-back" onclick="goBack()">${t('btnBack')}</button>
    <div class="card">${prog}<h2>${_e(node.h)}</h2>${hint}${btns}</div>
  </div>`;
}

function _renderR(node) {
  const htmlContent = currentLang === 'en' ? (node.html_en || _translateResultHtml(node.html || '')) : (node.html || '');
  if (node.html) {
    return `<div class="container">
      <button class="btn btn-back" onclick="goBack()">${t('btnBack')}</button>
      <div class="card">
        ${_buildPathSummary()}
        ${htmlContent}
        <button class="btn btn-primary" style="margin-top:24px" onclick="navigate('home')">${t('btnNewRequest')}</button>
      </div>
    </div>`;
  }
  return `<div class="container"><p>Node not found.</p></div>`;
}

// ── Translation helpers ─────────────────────────────────────────
function _translateNode(node) {
  // Deep-clone to avoid mutating TREE_DATA
  const n = Object.assign({}, node);
  if (n.b) n.b = n.b.map(btn => Object.assign({}, btn));

  // Map German → English for question nodes
  const qMap = _getQuestionTranslationMap();
  if (n.p && qMap.progress[n.p]) n.p = qMap.progress[n.p];
  if (n.h && qMap.heading[n.h]) n.h = qMap.heading[n.h];
  if (n.hint && qMap.hint[n.hint]) n.hint = qMap.hint[n.hint];
  if (n.b) {
    n.b = n.b.map(btn => {
      const label = qMap.button[btn.l];
      return label ? Object.assign({}, btn, { l: label }) : btn;
    });
  }
  return n;
}

function _translateResultHtml(html) {
  // Translate common UI strings in result cards
  const map = _getResultTranslationMap();
  let out = html;
  for (const [de, en] of Object.entries(map)) {
    out = out.split(de).join(en);
  }
  return out;
}

function _getResultTranslationMap() {
  return {
    // Common headings in result cards
    "Nächste Schritte": "Next Steps",
    "Rechtliche Grundlage": "Legal Basis",
    "Sofortmaßnahmen": "Immediate Actions",
    "Erfolgschancen": "Chances of Success",
    "Beweise sammeln": "Gathering Evidence",
    "Was tun bei Kündigung?": "What to do about dismissal?",
    "Gründungsablauf": "Foundation procedure",
    "AGG-Beschwerdeweg": "AGG complaint procedure",
    "AGG-Beschwerdeweg (§ 13 AGG)": "AGG complaint procedure (§ 13 AGG)",
    "Indizien sichern": "Securing evidence",
    "Was passiert mit deinen Ansprüchen?": "What happens to your claims?",
    "Wichtige Besonderheiten": "Important special features",
    "Berechnung prüfen": "Check calculation",
    // Buttons in result cards
    "Zur Startseite": "Back to Home",
    "Neue Anfrage starten": "Start new enquiry",
    // Legal institutions
    "Mieterverein": "Tenants' association",
    "Arbeitsgericht": "Labour court",
    "Amtsgericht": "Local court",
    "Anwalt": "Lawyer",
    // Common phrases
    "Schritt": "Step",
    "von": "of",
    "Frist": "Deadline",
    "schriftlich": "in writing",
    "sofort": "immediately",
    "kostenlos": "free of charge",
    "Kündigung": "Notice / dismissal",
    "Widerspruch": "Objection",
    "Klage": "Lawsuit",
    "Mieterhöhung": "Rent increase",
    "Vermieter": "Landlord",
    "Mieter": "Tenant",
    "Arbeitgeber": "Employer",
    "Arbeitnehmer": "Employee",
    "Betriebsrat": "Works council",
    "Gewerkschaft": "Trade union",
    "Härtefall": "Hardship case",
  };
}

function _getQuestionTranslationMap() {
  return {
    progress: {
      "Schritt 1 von 5": "Step 1 of 5",
      "Schritt 1 von 6": "Step 1 of 6",
      "Schritt 1 von 7": "Step 1 of 7",
      "Schritt 1 von 8": "Step 1 of 8",
      "Schritt 1 von max. 10": "Step 1 of max. 10",
      "Schritt 1 von max. 3": "Step 1 of max. 3",
      "Schritt 1 von max. 6": "Step 1 of max. 6",
      "Schritt 1 von max. 8": "Step 1 of max. 8",
      "Schritt 2 of 10": "Step 2 of 10",
      "Schritt 2 of 8": "Step 2 of 8",
      "Schritt 2 von 10": "Step 2 of 10",
      "Schritt 2 von 2": "Step 2 of 2",
      "Schritt 2 von 3": "Step 2 of 3",
      "Schritt 2 von 4": "Step 2 of 4",
      "Schritt 2 von 5": "Step 2 of 5",
      "Schritt 2 von 6": "Step 2 of 6",
      "Schritt 2 von 7": "Step 2 of 7",
      "Schritt 2 von 8": "Step 2 of 8",
      "Schritt 3 of 10": "Step 3 of 10",
      "Schritt 3 of 5": "Step 3 of 5",
      "Schritt 3 of 8": "Step 3 of 8",
      "Schritt 3 von 10": "Step 3 of 10",
      "Schritt 3 von 3": "Step 3 of 3",
      "Schritt 3 von 4": "Step 3 of 4",
      "Schritt 3 von 5": "Step 3 of 5",
      "Schritt 3 von 6": "Step 3 of 6",
      "Schritt 3 von 7": "Step 3 of 7",
      "Schritt 3 von 8": "Step 3 of 8",
      "Schritt 4 of 10": "Step 4 of 10",
      "Schritt 4 of 8": "Step 4 of 8",
      "Schritt 4 von 10": "Step 4 of 10",
      "Schritt 4 von 5": "Step 4 of 5",
      "Schritt 4 von 6": "Step 4 of 6",
      "Schritt 4 von 8": "Step 4 of 8",
      "Schritt 5 of 10": "Step 5 of 10",
      "Schritt 5 of 8": "Step 5 of 8",
      "Schritt 5 von 10": "Step 5 of 10",
      "Schritt 5 von 5": "Step 5 of 5",
      "Schritt 5 von 6": "Step 5 of 6",
      "Schritt 5 von 8": "Step 5 of 8",
      "Schritt 6 of 10": "Step 6 of 10",
      "Schritt 6 of 8": "Step 6 of 8",
      "Schritt 6 von 10": "Step 6 of 10",
      "Schritt 6 von 6": "Step 6 of 6",
      "Schritt 6 von 8": "Step 6 of 8",
      "Schritt 7 of 10": "Step 7 of 10",
      "Schritt 7 of 8": "Step 7 of 8",
      "Schritt 7 von 10": "Step 7 of 10",
      "Schritt 7 von 8": "Step 7 of 8",
      "Schritt 8 of 10": "Step 8 of 10",
      "Schritt 8 of 8": "Step 8 of 8",
      "Schritt 8 von 9": "Step 8 of 9",
      "Schritt 9 von 9": "Step 9 of 9"
    },
    heading: {
      "Das 14-Tage-Widerrufsrecht ist vorbei. Was ist das Problem?": "Das 14-Tage-Widerrufsrecht ist vorbei. Was ist das Problem?",
      "Geht es um ein Haustier oder die Untervermietung?": "Is this about a pet or subletting?",
      "Hast du bereits Hilfe gesucht?": "Hast du bereits Hilfe gesucht?",
      "Hast du bereits gemahnt?": "Hast du bereits gemahnt?",
      "Hast du den Verkäufer benachrichtigt?": "Hast du den Verkäufer benachrichtigt?",
      "Hast du einen Insolvenzantrag erhalten?": "Hast du einen Insolvenzantrag erhalten?",
      "Hat die Reparatur geholfen?": "Hat die Reparatur geholfen?",
      "Ist die Abmahnung berechtigt?": "Ist die Abmahnung berechtigt?",
      "Kannst du die Verfahrenskosten (~1500€) zahlen?": "Kannst du die Verfahrenskosten (~1500€) zahlen?",
      "Kannst du kündigen?": "Kannst du kündigen?",
      "Kennst du die Forderung?": "Kennst du die Forderung?",
      "Um welche Leistung geht es?": "Um welche Leistung geht es?",
      "Wann hast du den Bescheid erhalten?": "Wann hast du den Bescheid erhalten?",
      "Wann hast du die Ware erhalten?": "Wann hast du die Ware erhalten?",
      "War es ein Online-Kauf?": "War es ein Online-Kauf?",
      "Warum willst du untervermieten?": "Why do you want to sublet?",
      "Warum wurde sanktioniert?": "Warum wurde sanktioniert?",
      "Was ist das Problem?": "Was ist das Problem?",
      "Was ist dein Problem?": "Was ist dein Problem?",
      "Was ist der nächste Schritt?": "Was ist der nächste Schritt?",
      "Was möchtest du tun?": "Was möchtest du tun?",
      "Was steht im Mietvertrag zu Haustieren?": "What does the tenancy agreement say about pets?",
      "Was willst du tun?": "Was willst du tun?",
      "Welche Art von Kündigung?": "Welche Art von Kündigung?",
      "Welcher Sonderfall?": "Welcher Sonderfall?",
      "Wie groß ist die offene Summe?": "Wie groß ist die offene Summe?",
      "Wie ist deine finanzielle Situation?": "Wie ist deine finanzielle Situation?",
      "Wie lange arbeitest du dort?": "Wie lange arbeitest du dort?",
      "Wie lange ist der Kauf her?": "Wie lange ist der Kauf her?",
      "Wie lange ist die Zahlung überfällig?": "Wie lange ist die Zahlung überfällig?",
      "Wie lange wartest du schon?": "Wie lange wartest du schon?",
      "Wie viel Zeit ist noch übrig?": "Wie viel Zeit ist noch übrig?",
      "Wie viele Gehälter fehlen?": "Wie viele Gehälter fehlen?",
      "⏰ Hat das Jobcenter eine Kostensenkungsfrist gesetzt?": "⏰ Has the job centre set a cost-reduction deadline?",
      "⏰ Seit wann besteht das Problem?": "⏰ How long has the problem existed?",
      "⏰ Wann gekauft?": "⏰ When did you buy?",
      "⏰ Wann hast du die Mängel beim Einzug festgestellt?": "⏰ When did you notice the defects on move-in?",
      "⏰ Wann hast du gekauft/erhalten?": "⏰ When did you buy / receive the goods?",
      "⏰ Wann hast du gekauft?": "⏰ When did you buy?",
      "⏰ Wann ist die Diskriminierung passiert?": "⏰ Wann ist die Diskriminierung passiert?",
      "⏰ Wann tritt der Lärm auf?": "⏰ When does the noise occur?",
      "⏰ Wie alt ist die Forderung?": "⏰ Wie alt ist die Forderung?",
      "⏰ Wie lange wartest du schon?": "⏰ How long have you been waiting?",
      "⏰ Wie viel Vorlaufzeit gibt der Vermieter?": "⏰ How much notice is the landlord giving?",
      "⏱️ Wie lange dauert die Baustelle schon?": "⏱️ How long has the construction site been going on?",
      "⏱️ Wurde die Kündigungsfrist eingehalten?": "⏱️ Wurde die Kündigungsfrist eingehalten?",
      "⏳ Wie lange her war die Anfrage?": "⏳ How long ago was the request?",
      "⚖️ Beweislast liegt bei DIR!": "⚖️ The burden of proof lies with YOU!",
      "⚖️ Hast du eine Räumungsklage erhalten?": "⚖️ Have you received an eviction claim?",
      "⚖️ Kannst du beweisen, dass Mangel von Anfang an da war?": "⚖️ Can you prove the defect was there from the start?",
      "⚖️ Welches Merkmal liegt der Diskriminierung zugrunde?": "⚖️ Welches Merkmal liegt der Diskriminierung zugrunde?",
      "⚙️ Nächste Schritte?": "⚙️ Nächste Schritte?",
      "⚠️ Dubios = Sofort widersprechen!": "⚠️ Dubios = Sofort widersprechen!",
      "⚠️ Hat der Vermieter reagiert?": "⚠️ Has the landlord reacted?",
      "⚠️ Ist die Kappungsgrenze eingehalten?": "⚠️ Is the cap limit (Kappungsgrenze) observed?",
      "⚠️ Schwieriger außerhalb EU!": "⚠️ More difficult outside the EU!",
      "⚠️ WICHTIG: Wann hast du die Kündigung erhalten?": "⚠️ IMPORTANT: When did you receive the notice?",
      "⚠️ Wann hast du die fristlose Kündigung erhalten?": "⚠️ When did you receive the extraordinary termination?",
      "⚠️ Wie hat der Vermieter reagiert?": "⚠️ How did the landlord react?",
      "⚡ Besteht eine Sicherheitsgefahr?": "⚡ Is there a safety risk?",
      "⚡ Was ist der Konflikt zwischen Hauptmieter und Untermieter?": "⚡ What is the conflict between main tenant and subtenant?",
      "⚡ Wurde ein schwerwiegender Grund angegeben?": "⚡ Wurde ein schwerwiegender Grund angegeben?",
      "✅ EU-Verbraucherschutz gilt!": "✅ EU consumer protection applies!",
      "✍️ Hast du Einwilligung gegeben?": "✍️ Hast du Einwilligung gegeben?",
      "❄️ Wann ist die Heizung ausgefallen?": "❄️ When did the heating fail?",
      "❌ Was ist falsch?": "❌ What is wrong?",
      "❓ Kannst du herausfinden, wie das Abo entstand?": "❓ Kannst du herausfinden, wie das Abo entstand?",
      "❓ Kennst du das Unternehmen?": "❓ Kennst du das Unternehmen?",
      "❓ Warum übernimmt das Jobcenter nicht die volle Miete?": "❓ Why is the job centre not covering the full rent?",
      "❓ Was ist die genaue Situation?": "❓ What is the exact situation?",
      "❓ Welchen Kündigungsgrund nannte der Arbeitgeber?": "❓ Welchen Kündigungsgrund nannte der Arbeitgeber?",
      "🌍 Aus welchem Land?": "🌍 From which country?",
      "🌐 Was genau ist ausgefallen?": "🌐 What exactly has failed?",
      "🌡️ Heizen Sie das Zimmer auf mindestens 18-20°C?": "🌡️ Are you heating the room to at least 18–20°C?",
      "🌡️ Ist die Außenwand im Winter kalt (unter 12°C an der Innenseite)?": "🌡️ Is the exterior wall cold in winter (below 12°C on the inside)?",
      "🌡️ Ist es Winter oder friert es draußen?": "🌡️ Is it winter or freezing outside?",
      "🌡️ Was ist das Problem mit der Heizkostenabrechnung?": "🌡️ What is the problem with the heating cost bill?",
      "🌡️ Wie stark ist der Heizungsausfall?": "🌡️ How severe is the heating failure?",
      "🌱 Was ist die Garten-Situation?": "🌱 What is the garden situation?",
      "🌳 Problem mit Gemeinschaftsflächen oder Garten?": "🌳 Problem with communal areas or garden?",
      "🎨 Was hast du bestellt vs. bekommen?": "🎨 What did you order vs. what did you receive?",
      "🏗️ In welchem Zustand wurde die Wohnung übergeben?": "🏗️ In what condition was the flat handed over?",
      "🏗️ Wer betreibt die Baustelle?": "🏗️ Who is running the construction site?",
      "🏗️ Wurden Modernisierungsarbeiten durchgeführt?": "🏗️ Have modernisation works been carried out?",
      "🏛️ Gibt es einen Betriebsrat?": "🏛️ Gibt es einen Betriebsrat?",
      "🏠 Geht es um den Einzug oder den Auszug?": "🏠 Is this about move-in or move-out?",
      "🏠 Was ist dein Hauptproblem mit der Mietwohnung?": "🏠 What is your main problem with the rented flat?",
      "🏡 Was ist dein Problem beim Eigentümerwechsel?": "🏡 What is your problem regarding the change of ownership?",
      "🏢 Was ist dein WEG-Problem?": "🏢 What is your WEG (owners' association) problem?",
      "🏢 Wie viele Mitarbeiter hat der Betrieb?": "🏢 Wie viele Mitarbeiter hat der Betrieb?",
      "🏦 Was ist deine Situation bei Arbeitgeber-Insolvenz?": "🏦 Was ist deine Situation bei Arbeitgeber-Insolvenz?",
      "🏦 Wurde die Kaution auf ein Sparkonto angelegt?": "🏦 Was the deposit placed in a savings account?",
      "🏭 Was ist dein Anliegen zum Betriebsrat?": "🏭 Was ist dein Anliegen zum Betriebsrat?",
      "🐀 Welche Art Ungeziefer?": "🐀 What type of vermin / pests?",
      "👤 War der Verkäufer gewerblich oder privat?": "👤 Was the seller commercial or private?",
      "👥 An wen wurden Daten weitergegeben?": "👥 An wen wurden Daten weitergegeben?",
      "👥 Was ist dein WG-Problem?": "👥 What is your flat-share (WG) problem?",
      "👥 Wie viele Mitarbeiter hat der Betrieb?": "👥 Wie viele Mitarbeiter hat der Betrieb?",
      "👨‍👩‍👧 Für wen wird Eigenbedarf geltend gemacht?": "👨‍👩‍👧 For whom is own use (Eigenbedarf) claimed?",
      "👻 Welche Daten waren betroffen?": "👻 Welche Daten waren betroffen?",
      "💧 Was war der Wassereinbruch?": "💧 What was the water ingress?",
      "💬 Hast du auf einen SMS-Link geklickt?": "💬 Hast du auf einen SMS-Link geklickt?",
      "💬 Sind die anderen Mitmieter einverstanden?": "💬 Are the other co-tenants in agreement?",
      "💰 Entstandener Schaden?": "💰 Entstandener Schaden?",
      "💰 Ist die Umlage korrekt berechnet?": "💰 Is the surcharge correctly calculated?",
      "💰 Kannst du die ausstehende Miete noch zahlen?": "💰 Can you still pay the outstanding rent?",
      "💰 Was bietet der Vermieter als Ausgleich?": "💰 What compensation is the landlord offering?",
      "💰 Was ist das Problem mit Ihrem Lohn?": "💰 Was ist das Problem mit Ihrem Lohn?",
      "💰 Was ist dein Problem mit den Nebenkosten?": "💰 What is your problem with the utility costs?",
      "💰 Wie hoch ist der Gesamtschaden?": "💰 Wie hoch ist der Gesamtschaden?",
      "💰 Wie hoch ist die Mieterhöhung pro m²?": "💰 How much is the rent increase per m²?",
      "💰 Wie viele Monatsmieten bist du im Rückstand?": "💰 How many months' rent are you in arrears?",
      "💳 Was ist dein Problem mit der Kaution?": "💳 What is your problem with the deposit?",
      "💳 Wie oft wurde bereits Geld abgebucht?": "💳 Wie oft wurde bereits Geld abgebucht?",
      "💳 Wie wurde bezahlt?": "💳 Wie wurde bezahlt?",
      "💶 Ist der Betrag korrekt?": "💶 Ist der Betrag korrekt?",
      "💶 Waren die Kosten VOR Bestellung klar erkennbar?": "💶 Waren die Kosten VOR Bestellung klar erkennbar?",
      "💶 Was stimmt mit der Hausgeld-Abrechnung nicht?": "💶 What is wrong with the service charge (Hausgeld) bill?",
      "💶 Wie viele Monatsgehälter fehlen?": "💶 Wie viele Monatsgehälter fehlen?",
      "💸 Mitbewohner zahlt seinen Anteil nicht — wie lang?": "💸 Flatmate not paying their share — for how long?",
      "💼 Arbeitsrecht – Was ist Ihr Anliegen?": "💼 Arbeitsrecht – Was ist Ihr Anliegen?",
      "💼 Was ist dein Jobcenter-Wohnproblem?": "💼 What is your job centre housing problem?",
      "📄 Hast du die Anrufe dokumentiert?": "📄 Hast du die Anrufe dokumentiert?",
      "📄 Ist die Kündigung korrekt zugestellt worden?": "📄 Was the notice correctly served?",
      "📄 Sind Form und Frist korrekt?": "📄 Are form and deadline correct?",
      "📄 Wann hast du die Kündigung erhalten?": "📄 When did you receive the notice?",
      "📄 Was genau ist unklar?": "📄 What exactly is unclear?",
      "📄 Was ist der Streitpunkt beim Auszug?": "📄 What is the dispute about on move-out?",
      "📄 Wie wurde die Kündigung übermittelt?": "📄 Wie wurde die Kündigung übermittelt?",
      "📅 Kennst du deine Kündigungsfrist?": "📅 Do you know your notice period?",
      "📅 Wann hast du die Abrechnung erhalten?": "📅 When did you receive the bill?",
      "📅 Wann hast du die Klageschrift erhalten?": "📅 When did you receive the statement of claim?",
      "📅 Welche Art von Abo?": "📅 Welche Art von Abo?",
      "📅 Wie lange fällt die Heizung schon aus?": "📅 How long has the heating been broken?",
      "📅 Wie lange ist der Abrechnungszeitraum her?": "📅 How long ago was the billing period?",
      "📅 Wie lange ist der Aufzug schon defekt?": "📅 How long has the lift been broken?",
      "📅 Wie lange ist der Auszug her?": "📅 How long ago did you move out?",
      "📅 Wie lange sind/waren Sie beschäftigt?": "📅 Wie lange sind/waren Sie beschäftigt?",
      "📅 Wurde der Zutritt vorher angekündigt?": "📅 Was the access announced in advance?",
      "📈 Hast du die Erhöhung mit dem Mietspiegel verglichen?": "📈 Have you compared the increase with the rent index (Mietspiegel)?",
      "📈 Um welche Art Mieterhöhung geht es?": "📈 What type of rent increase is this?",
      "📉 Wofür möchtest du die Mietminderung berechnen?": "📉 What do you want to calculate the rent reduction for?",
      "📊 Gibt es einen Mietspiegel in deiner Stadt?": "📊 Is there a rent index (Mietspiegel) in your city?",
      "📊 Wie viel hast du bekommen?": "📊 How much did you receive?",
      "📊 Wie viel höher ist die Abrechnung als erwartet?": "📊 How much higher is the bill than expected?",
      "📋 Aus welchem Grund will der Vermieter besichtigen?": "📋 Why does the landlord want to view the flat?",
      "📋 Bist du Hauptmieter oder Untermieter?": "📋 Are you the main tenant or a subtenant?",
      "📋 Hast du die Kündigung schriftlich anerkannt?": "📋 Have you acknowledged the notice in writing?",
      "📋 Hat der Vermieter bereits gekündigt?": "📋 Has the landlord already given notice?",
      "📋 Hat der Vermieter den Schaden schriftlich bestätigt?": "📋 Has the landlord confirmed the damage in writing?",
      "📋 Hat der Vermieter die Nebenkostenabrechnung erstellt?": "📋 Has the landlord produced the utility bill?",
      "📋 Mit welcher Begründung kündigt der neue Eigentümer?": "📋 What reason does the new owner give for the termination?",
      "📋 Was ist der Kündigungsgrund?": "📋 What is the reason for termination?",
      "📋 Was ist genau unklar / zu hoch?": "📋 What exactly is unclear / too high?",
      "📋 Was steht in der Abmahnung?": "📋 Was steht in der Abmahnung?",
      "📋 Was wurde beschlossen?": "📋 What was resolved?",
      "📋 Welche Art der Kündigung hast du erhalten?": "📋 What type of notice have you received?",
      "📋 Welchen Kündigungsgrund gibt der Vermieter an?": "📋 What termination reason does the landlord give?",
      "📋 Wer will kündigen?": "📋 Who wants to give notice?",
      "📋 Wie wurden Daten gesammelt?": "📋 Wie wurden Daten gesammelt?",
      "📋 Wurde der Schaden im Übergabeprotokoll festgehalten?": "📋 Was the damage recorded in the handover protocol?",
      "📋 Wurde ein Übergabeprotokoll erstellt?": "📋 Was a handover protocol created?",
      "📍 Angespannter Wohnungsmarkt?": "📍 Tight housing market?",
      "📍 In welchem Bereich fand die Diskriminierung statt?": "📍 In welchem Bereich fand die Diskriminierung statt?",
      "📏 Weiß du, welche Wohnungsgröße / Miete als angemessen gilt?": "📏 Do you know what flat size / rent is considered appropriate?",
      "📏 Wie groß ist die Schimmelfläche?": "📏 How large is the mould-affected area?",
      "📏 Wie groß ist die befallene Fläche?": "📏 How large is the affected area?",
      "📜 Hast du die Garantiekarte ausgefüllt?": "📜 Have you filled in the warranty card?",
      "📜 Stand \"Gewährleistung ausgeschlossen\" in der Anzeige?": "📜 Did the listing say \"warranty excluded\"?",
      "📜 Steht Gewährleistungsausschluss im Vertrag?": "📜 Does the contract contain a warranty exclusion?",
      "📜 Steht der Mitmieter im Hauptmietvertrag?": "📜 Is the co-tenant listed in the main tenancy agreement?",
      "📜 Was steht im Mietvertrag zu Schönheitsreparaturen?": "📜 What does the tenancy agreement say about cosmetic repairs?",
      "📝 Gab es einen schriftlichen Kaufvertrag?": "📝 Was there a written purchase contract?",
      "📝 Hast du den Verkäufer kontaktiert?": "📝 Have you contacted the seller?",
      "📝 Hast du den Vermieter schriftlich informiert?": "📝 Have you informed the landlord in writing?",
      "📝 Hat der Vermieter den Schimmel schon abgestritten?": "📝 Has the landlord already denied the mould?",
      "📝 Was ist dein Problem?": "📝 Was ist dein Problem?",
      "📝 Was ist dein sonstiges Problem?": "📝 What is your other problem?",
      "📞 Hast du den Vermieter bereits informiert?": "📞 Have you already informed the landlord?",
      "📞 Hast du den Vermieter informiert?": "📞 Have you informed the landlord?",
      "📞 Was wurde am Telefon gesagt?": "📞 Was wurde am Telefon gesagt?",
      "📞 Wie oft wurdest du angerufen?": "📞 Wie oft wurdest du angerufen?",
      "📢 Welche Art von irreführender Werbung?": "📢 Welche Art von irreführender Werbung?",
      "📢 Wurde die Baustelle angekündigt?": "📢 Was the construction work announced?",
      "📦 Hast du das Paket schon geöffnet?": "📦 Have you already opened the package?",
      "📦 Wann war das Paket beschädigt?": "📦 When was the package damaged?",
      "📦 War das Paket versichert?": "📦 Was the package insured?",
      "📧 Was stand in der Email?": "📧 Was stand in der Email?",
      "📱 Wie ist das Abo entstanden?": "📱 Wie ist das Abo entstanden?",
      "📲 Gibt es Tracking-Informationen?": "📲 Is there tracking information?",
      "📸 Hast du Fotos gemacht?": "📸 Have you taken photos?",
      "📸 Hast du Fotos und Thermometer-Aufnahmen als Beweis?": "📸 Do you have photos and thermometer readings as evidence?",
      "📸 Hast du den Lärm dokumentiert?": "📸 Have you documented the noise?",
      "📸 Hast du den Mangel dokumentiert?": "📸 Have you documented the defect?",
      "📸 Hast du den Schaden dokumentiert?": "📸 Have you documented the damage?",
      "🔄 Worum geht es bei der Rücknahme?": "🔄 What is the return about?",
      "🔊 Was ist die Lärmquelle?": "🔊 What is the source of the noise?",
      "🔊 Wer verursacht den Lärm?": "🔊 Who is causing the noise?",
      "🔍 Hast du die Ware getestet/benutzt?": "🔍 Have you tested / used the goods?",
      "🔍 Ist der Eigenbedarf plausibel begründet?": "🔍 Is the own-use claim plausibly reasoned?",
      "🔍 Kennst du das Inkassobüro?": "🔍 Kennst du das Inkassobüro?",
      "🔍 Um welche Art Schaden geht es?": "🔍 What type of damage is it?",
      "🔍 Was genau ist das Problem?": "🔍 What exactly is the problem?",
      "🔍 Was glaubst du, woher der Schimmel kommt?": "🔍 What do you think is the cause of the mould?",
      "🔍 Was ist der Klagegrund?": "🔍 What is the grounds for the claim?",
      "🔍 Was möchtest du wissen?": "🔍 What do you want to know?",
      "🔍 Was wurde modernisiert?": "🔍 What was modernised?",
      "🔍 Wer hat den Fehler gemacht?": "🔍 Who made the mistake?",
      "🔍 Wofür werden Abzüge geltend gemacht?": "🔍 What are deductions being claimed for?",
      "🔑 Was ist das Problem mit dem Vermieter-Zutritt?": "🔑 What is the problem with the landlord's access?",
      "🔒 Welche Art von Datenschutz-Verstoß?": "🔒 Welche Art von Datenschutz-Verstoß?",
      "🔘 War ein Bestellbutton deutlich sichtbar?": "🔘 War ein Bestellbutton deutlich sichtbar?",
      "🔧 Hat der Vermieter die Mängel bis jetzt behoben?": "🔧 Has the landlord remedied the defects so far?",
      "🔧 Was ist das konkrete Problem?": "🔧 What is the specific problem?",
      "🔧 Welche Art von Mangel liegt vor?": "🔧 What type of defect is it?",
      "🔧 Wie schwer beeinträchtigt dich der Mangel?": "🔧 How severely does the defect affect you?",
      "🔨 Beschreibe den Mangel:": "🔨 Describe the defect:",
      "🔬 Wann ist der Schimmel erstmals aufgetreten?": "🔬 When did the mould first appear?",
      "🕒 Hat der Vermieter reagiert?": "🕒 Has the landlord reacted?",
      "🗣️ Hat der Verkäufer über den Mangel gelogen?": "🗣️ Did the seller lie about the defect?",
      "🚀 Ist das Paket verloren gegangen?": "🚀 Has the package been lost?",
      "🚨 Ist es ein Notfall (z.B. Rohrbruch)?": "🚨 Is it an emergency (e.g. burst pipe)?",
      "🚨 Wurde das Unternehmen dich informiert?": "🚨 Wurde das Unternehmen dich informiert?",
      "🚪 Wie hat sich der Vermieter Zugang verschafft?": "🚪 How did the landlord gain access?",
      "🚿 Welcher Sanitärmangel genau?": "🚿 What exactly is the sanitary defect?",
      "🚿 Welches Sanitärproblem liegt vor?": "🚿 What sanitary problem is it?",
      "🛍️ Wo hast du gekauft?": "🛍️ Where did you buy?",
      "🛒 Kaufrecht – Was ist dein Problem?": "🛒 Consumer Sales Law – What is your problem?",
      "🛒 Was ist dein Hauptproblem?": "🛒 Was ist dein Hauptproblem?",
      "🛗 Was ist das Aufzug-Problem?": "🛗 What is the lift problem?",
      "🛡️ Hast du Härtefall-Gründe?": "🛡️ Do you have hardship grounds?",
      "🛡️ Was ist dein Hauptproblem?": "🛡️ Was ist dein Hauptproblem?",
      "🛡️ Welcher Härtegrund liegt vor?": "🛡️ What hardship ground applies?",
      "🤔 Ist die Forderung berechtigt?": "🤔 Ist die Forderung berechtigt?",
      "🤝 Aufhebungsvertrag — Situation?": "🤝 Termination agreement — what is the situation?",
      "🤝 Ist der Vermieter informiert / zustimmend?": "🤝 Is the landlord informed / in agreement?",
      "🦠 Wo ist der Schimmel aufgetreten?": "🦠 Where has the mould appeared?",
      "🦽 Bist du auf den Aufzug angewiesen?": "🦽 Are you dependent on the lift?",
      "🧾 Hast du den Kassenbon?": "🧾 Do you have the receipt?",
      "🩺 Hast du gesundheitliche Beschwerden?": "🩺 Do you have health complaints?",
      "🪟 Welcher Mangel liegt vor?": "🪟 What type of defect is it?",
      "🪟 Wie oft lüftest du pro Tag?": "🪟 How often do you ventilate per day?"
    },

    hint: {
      "Kaufdatum, Lieferdatum und Kassenbon/Rechnung bereithalten!": "Keep purchase date, delivery date and receipt/invoice ready!",
      "Widerrufsrecht gilt nur bei Fernabsatzverträgen (Online, Telefon, Haustür)!": "Right of withdrawal only applies to distance contracts (online, phone, doorstep)!",
      "Schwangerschaft, Kinder in Schule, hohes Alter (60+), Krankheit, langjährige Mietdauer (10+ Jahre)?": "Pregnancy, children in school, old age (60+), illness, long rental period (10+ years)?",
      "§ 574 BGB: Widerspruch muss bis 2 Monate vor Mietende schriftlich beim Vermieter eingehen!": "§ 574 BGB: Objection must be submitted in writing to the landlord up to 2 months before end of tenancy!",
      "Max. 8% der Modernisierungskosten pro Jahr auf die Jahresmiete umlegen!": "Max. 8% of modernisation costs per year may be passed on to the annual rent!",
      "§ 559e BGB: Kappungsgrenze 3 €/m² in 6 Jahren – in angespannten Märkten nur 2 €/m²!": "§ 559e BGB: Cap 3 €/m² in 6 years – in tight markets only 2 €/m²!",
      "München, Berlin, Hamburg, Köln, Frankfurt u.a. → dort gilt 2 €/m²-Grenze (§ 556d BGB)!": "Munich, Berlin, Hamburg, Cologne, Frankfurt etc. → the 2 €/m² limit applies there (§ 556d BGB)!",
      "WEG = Wohnungseigentumsgesetz. Gilt wenn du Eigentümer einer ETW in einer Gemeinschaft bist.": "WEG = Residential Ownership Act. Applies if you are the owner of a flat in a community.",
      "Beschlüsse können nur innerhalb von 1 Monat nach Versammlung angefochten werden! (§ 44 WEG)": "Resolutions can only be challenged within 1 month of the meeting! (§ 44 WEG)",
      "§ 1 BetrVG: Ab 5 wahlberechtigten Arbeitnehmern kann ein Betriebsrat gegründet werden!": "§ 1 BetrVG: A works council can be established with 5 or more eligible employees!",
      "Die Betriebsgröße bestimmt die BR-Größe (§ 9 BetrVG).": "Company size determines works council size (§ 9 BetrVG).",
      "§ 1 AGG schützt vor Diskriminierung wegen: Rasse, ethnischer Herkunft, Geschlecht, Religion, Behinderung, Alter, sexueller Identität.": "§ 1 AGG protects against discrimination on grounds of: race, ethnic origin, gender, religion, disability, age, sexual identity.",
      "§ 15 Abs. 4 AGG: Schadensersatz muss innerhalb von 2 Monaten geltend gemacht werden!": "§ 15 para. 4 AGG: Compensation must be claimed within 2 months!",
      "§ 165 SGB III: Insolvenzgeld sichert bis zu 3 Monatslöhne bei Insolvenz!": "§ 165 SGB III: Insolvency benefit secures up to 3 months' wages in insolvency!",
      "Insolvenzgeld deckt die letzten 3 Monate vor Insolvenzantrag ab!": "Insolvency benefit covers the last 3 months before insolvency application!",
    },
    button: {
      "'Besenreine Übergabe' ohne Malerklausel": "'Broom-clean handover' without painting clause",
      "'Renovierter Zustand' oder Quoten-Klausel": "'Renovated condition' or quota clause",
      "1 Gehalt": "1 Gehalt",
      "1 Monatsmiete": "1 month's rent",
      "1-2 Wochen": "1–2 weeks",
      "1-4 Wochen": "1–4 weeks",
      "1-4 Wochen überfällig": "1–4 weeks overdue",
      "1-7 Tage": "1–7 days",
      "10 oder weniger Mitarbeiter": "10 oder weniger Mitarbeiter",
      "12 Monate überschritten": "12 months exceeded",
      "12-24 Monate her": "12-24 Monate her",
      "14 Tage bis 2 Monate": "14 Tage bis 2 Monate",
      "1–2 Monate fehlen": "1–2 Monate fehlen",
      "1–3 Monate": "1–3 months",
      "1–3 Tage": "1–3 days",
      "2 oder mehr Monatsmieten": "2 or more months' rent",
      "2+ Gehälter": "2+ Gehaelter",
      "2-3 Mal": "2–3 times",
      "2-4 Wochen": "2–4 weeks",
      "2-Jahre-Gewährleistung nutzen": "Use 2-year statutory warranty",
      "20–50% höher": "20–50% higher",
      "21–200 Mitarbeiter": "21–200 Mitarbeiter",
      "2–3 €/m² Erhöhung": "2–3 €/m² increase",
      "2–4 Wochen her": "2–4 weeks ago",
      "3 oder mehr Monate fehlen": "3 oder mehr Monate fehlen",
      "3-7 Tage her": "3–7 days ago",
      "30 Tage - 6 Monate": "30 days – 6 months",
      "3x täglich mind. 5 Minuten Stoßlüften": "Ventilate 3× daily for at least 5 minutes",
      "4-8 Wochen": "4–8 weeks",
      "4–14 Tage": "4–14 days",
      "50-200€": "€50–200",
      "500€ - 2000€": "€500–2,000",
      "5–20 Mitarbeiter": "5–20 Mitarbeiter",
      "6 Monate bis 2 Jahre": "6 Monate bis 2 Jahre",
      "6-24 Monate": "6–24 months",
      "Abfindung / Resturlaub in der Insolvenz?": "Abfindung / Resturlaub in der Insolvenz?",
      "Abmahnung erhalten": "Warning received",
      "Abrechnung fehlt / zu spät": "Bill missing / too late",
      "Abrechnung ist unklar / unverständlich": "Bill unclear / incomprehensible",
      "Abrechnung kam zu spät / gar nicht": "Bill arrived too late / not at all",
      "Abrechnung zu hoch / unplausibel": "Bill too high / implausible",
      "Abrechnung zu hoch / unverständlich": "Bill too high / incomprehensible",
      "Abstandszahlung / Abfindung": "Moving-out payment / settlement",
      "Allgemein zu hoch": "Generally too high",
      "Am Übergabetag (im Protokoll vermerkt)": "On handover day (recorded in protocol)",
      "Andere Gründe (Störung, Schaden, etc.)": "Other reasons (disturbance, damage, etc.)",
      "Ankündigung nur wenige Stunden vorher": "Notice only a few hours in advance",
      "Antrag abgelehnt": "Antrag abgelehnt",
      "Arbeitgeber behindert die BR-Gründung": "Arbeitgeber behindert die BR-Gruendung",
      "Arbeitslosengeld I": "Unemployment benefits (ALG I)",
      "Arbeitszeugnis anfordern": "Request employment reference",
      "Aufhebung bereits unterschrieben — Reue": "Termination agreement already signed — regret",
      "Aufhebungsvertrag angeboten": "Termination agreement offered",
      "Aufhebungsvertrag unterschreiben?": "Sign a termination agreement?",
      "Aufzug defekt, ich kann Wohnung nicht verlassen": "Lift broken, I cannot leave the flat",
      "Aufzug ist dauerhaft zu langsam / laut": "Lift is permanently too slow / noisy",
      "Aufzug ist defekt / ausgefallen": "Lift is defective / out of order",
      "Aufzug oft defekt — keine Verlässlichkeit": "Lift often defective — no reliability",
      "Aufzug soll abgebaut / modernisiert werden": "Lift to be removed / modernised",
      "Automatische Verlängerung": "Automatische Verlaengerung",
      "Außenwand / Ecke": "Exterior wall / corner",
      "Außerordentliche / fristlose Kündigung": "Ausserordentliche / fristlose Kuendigung",
      "Badezimmer / Küche": "Bathroom / kitchen",
      "Baustelle am/im Gebäude": "Construction site at/in the building",
      "Beförderung / Gehaltserhöhung verweigert": "Promotion / pay rise refused",
      "Bei Lieferung / Übergabe": "At delivery / handover",
      "Belästigung / feindliches Arbeitsumfeld": "Belaestigung / feindliches Arbeitsumfeld",
      "Berufsbedingt umgezogen": "Relocated for work",
      "Bescheid kam zu spät / fehlerhaft": "Bescheid kam too late / fehlerhaft",
      "Beschluss war nicht ordnungsgemäß (Ladungsfehler etc.)": "Resolution was not in order (notice errors etc.)",
      "Beschwerde bei Bundesnetzagentur": "Beschwerde bei Bundesnetzagentur",
      "Betriebsbedingt (Stellenabbau)": "Betriebsbedingt (Stellenabbau)",
      "Betriebsrat gründen – wie geht das?": "Betriebsrat gruenden – wie geht das?",
      "Betriebsrat kämpft ums Überleben / wurde aufgelöst": "Betriebsrat kaempft ums Ueberleben / wurde aufgeloest",
      "Bettwanzen": "bedbugs",
      "Bewerbung / Einstellung abgelehnt": "Bewerbung / Einstellung abgelehnt",
      "Bis 20% höher als Vorjahr": "Up to 20% higher than previous year",
      "Bürgergeld (ALG II)": "Citizen's allowance (Bürgergeld) (ALG II)",
      "Cookies ohne Zustimmung": "Cookies without consent",
      "Dach undicht": "Roof leaking",
      "Darlehen beantragen": "Darlehen beantragen",
      "Daten unrechtmäßig gesammelt": "Daten unrechtmaessig gesammelt",
      "Daten verkauft": "Daten verkauft",
      "Daten weitergegeben (ohne Erlaubnis)": "Daten weitergegeben (ohne Erlaubnis)",
      "Datenleck/Hack": "Data leak / hack",
      "Die Heizung funktioniert nicht richtig": "The heating does not work properly",
      "Die Ware ist defekt/falsch/mangelhaft": "The goods are defective / wrong / faulty",
      "Dringende Reparatur wird nicht durchgeführt": "Urgent repair is not being carried out",
      "Drittanbieter": "Drittanbieter",
      "Drohende Obdachlosigkeit / Räumungsklage": "Threat of homelessness / eviction claim",
      "Dusche / Bad nicht nutzbar": "Shower / bathroom not usable",
      "Dusche / Badewanne defekt": "Shower / bathtub defective",
      "Echter Schaden (Loch in Wand, gebrochene Fliese)": "Actual damage (hole in wall, broken tile)",
      "Eigenbedarf für sich oder Familie": "Own use for themselves or family",
      "Eigenbedarfskündigung": "Termination for own use (Eigenbedarf)",
      "Einmal": "Once",
      "Energetische Sanierung (Dämmung, Fenster, Heizung)": "Energy renovation (insulation, windows, heating)",
      "Erhebliche Beeinträchtigung": "Significant impairment",
      "Erst nach einem Monat bemerkt": "Only noticed after a month",
      "Erst später entdeckt": "Discovered later",
      "Erstausstattung beantragen": "Apply for initial furnishing",
      "Erstmals / einmalig": "For the first time / one-off",
      "Es gibt einen Sonderfall (Eigentumsvorbehalt, Ratenkauf)": "There is a special case (retention of title, instalment purchase)",
      "Es gibt keine anderen Hauptmieter": "There are no other main tenants",
      "Es sind mehrere Ratenzahlungen ausstehend": "Several instalments are outstanding",
      "Fahrradkeller / Kellerabteil Problem": "Bicycle cellar / cellar compartment problem",
      "Fake Rabatte/Preise": "Fake Rabatte/Preise",
      "Fake Testimonials/Influencer": "Fake Testimonials/Influencer",
      "Falsche Menge/Anzahl": "Wrong quantity / number",
      "Falsche Produktbeschreibung (UWG §5)": "False product description (UWG §5)",
      "Falsche Variante (Farbe, Größe, Modell)": "Wrong variant (colour, size, model)",
      "Falscher Betrag gezahlt": "Wrong amount paid",
      "Familienmitglied (Kind, Eltern, etc.)": "Family member (child, parents, etc.)",
      "Fenster undicht / zieht": "Window leaking / draughty",
      "Feste Fristen (z.B. 'alle 3 Jahre streichen')": "Fixed intervals (e.g. 'paint every 3 years')",
      "Finanzdaten (Kreditkarte, Konto)": "Financial data (credit card, account)",
      "Fitnessstudio kündigen": "Fitnessstudio kuendigen",
      "Forderung ist verjährt": "Forderung ist verjaehrt",
      "Frisch renoviert (neu gestrichen etc.)": "Freshly renovated (newly painted etc.)",
      "Fristlos / außerordentlich": "Fristlos / ausserordentlich",
      "Fristlos kündigen wegen Mangel": "Fristlos kuendigen wegen Mangel",
      "Fristlose Kündigung": "Extraordinary termination",
      "Fristlose Kündigung (anderer Grund)": "Extraordinary termination (other reason)",
      "Für anderen Zweck verwendet": "Fuer anderen Zweck verwendet",
      "Ganzer Winter (saisonal)": "Entire winter (seasonal)",
      "Gar nicht / fast nie": "Not at all / almost never",
      "Gartennutzung — wer darf was?": "Garden use — who may do what?",
      "Gehalt wird seit Wochen nicht gezahlt": "Gehalt wird seit Wochen nicht gezahlt",
      "Gemeinschaftsantenne / SAT": "Shared antenna / satellite",
      "Gemeinschaftseigentum beschädigt": "Common property damaged",
      "Gemeinschaftsraum gesperrt / kaputt": "Common room closed / broken",
      "Gemischte Situation / unklar": "Mixed situation / unclear",
      "Generelles Verbot": "General prohibition",
      "Gerichtsvollzieher war da": "Bailiff has been here",
      "Gesundheitsdaten": "Gesundheitsdaten",
      "Gewerbe im Haus (Gastronomie etc.)": "Commercial premises in the building (gastronomy etc.)",
      "Gibt keinen Grund an": "No reason given",
      "Gläubiger droht mir / hat Insolvenzantrag gestellt": "Glaeubiger droht mir / hat Insolvenzantrag gestellt",
      "Groß (> 1m² oder mehrere Räume)": "Large (> 1m² or several rooms)",
      "Groß (> 1m², mehrere Räume)": "Large (> 1m², several rooms)",
      "Hab das Problem erst jetzt bemerkt": "Hab das Problem erst jetzt bemerkt",
      "Habe \"Nein\" gesagt": "Habe \"Nein\" gesagt",
      "Habe noch nie eine erhalten": "I have never received one",
      "Handyvertrag kündigen": "Handyvertrag kuendigen",
      "Hat Klingel ignoriert und Schlüssel benutzt": "Ignored the doorbell and used a key",
      "Hauptmieter erhöht Miete eigenmächtig": "Main tenant increases rent unilaterally",
      "Hauptmieter kündigt ohne Grund": "Main tenant terminates without reason",
      "Hauptmieter zahlt Vermieter nicht, ich zahle ihn": "Main tenant does not pay landlord, I pay the main tenant",
      "Hausmeister / Reinigung": "Caretaker / cleaning",
      "Haustiere": "Pets",
      "Heizkosten": "Heating costs",
      "Heizung zu laut / rumpelt": "Heating too loud / rumbling",
      "Hund / Katze erlaubt": "Dog / cat allowed",
      "Ich (falsch bestellt)": "Me (ordered the wrong item)",
      "Ich akzeptiere die Abmahnung": "Ich akzeptiere die Abmahnung",
      "Ich bin BR-Mitglied – Kündigungsschutz": "Ich bin BR-Mitglied – Kuendigungsschutz",
      "Ich bin Hauptmieter (stehe im Vertrag)": "I am the main tenant (named in the contract)",
      "Ich bin Hauptmieter, Untermieter zahlt nicht": "I am the main tenant, subtenant does not pay",
      "Ich bin Untermieter (zahle an Hauptmieter)": "I am a subtenant (paying the main tenant)",
      "Ich bin auf den Aufzug angewiesen (Behinderung/Alter)": "I rely on the lift (disability/age)",
      "Ich habe Eigentumsvorbehalt (Ware gehört mir noch)": "Ich habe Eigentumsvorbehalt (Ware gehoert mir noch)",
      "Ich habe eine Garantiekarte": "I have a warranty card",
      "Ich habe eine Kündigung erhalten": "I have received a notice of termination",
      "Ich habe keinen Beweis": "I have no evidence",
      "Ich habe mich verklickt": "I clicked the wrong thing",
      "Ich habe richtig bestellt!": "I ordered correctly!",
      "Ich habe selbst gekündigt und möchte rückgängig machen": "I gave notice myself and want to withdraw it",
      "Ich kann beweisen (Gutachten, etc.)": "I can prove it (expert report, etc.)",
      "Ich kann die Miete nicht zahlen (Zahlungsverzug)": "I cannot pay the rent (payment arrears)",
      "Ich schlage Aufhebung vor (will früher raus)": "I propose a termination agreement (want to move out earlier)",
      "Ich weiß es nicht genau": "I do not know exactly",
      "Ich weiß nicht ob die Kündigung wirksam ist": "I do not know if the termination is effective",
      "Ich weiß nicht wer jetzt mein Vermieter ist": "I do not know who my landlord is now",
      "Ich will die Ware einfach zurückgeben (egal warum)": "Ich will die Ware einfach zurueckgeben (egal warum)",
      "Ich will selbst kündigen": "I want to give notice myself",
      "Ich wurde im Insolvenzverfahren gekündigt": "Ich wurde im Insolvenzverfahren gekuendigt",
      "Ich wurde vom Vermieter/Nachbarn beschwert": "I have been complained about by landlord/neighbours",
      "Im Einzelfall zu entscheiden / Nichts geregelt": "To be decided on a case-by-case basis / nothing regulated",
      "Im Mietvertrag als Mitnutzung vereinbart": "Shared use agreed in tenancy agreement",
      "In den ersten 2 Wochen nach Einzug": "Within the first 2 weeks after moving in",
      "Insolvenz wurde offiziell eröffnet": "Insolvenz wurde offiziell eroeffnet",
      "Insolvenzantrag wurde gerade gestellt": "Insolvenzantrag wurde gerade gestellt",
      "Internet (im Vertrag inkludiert)": "Internet (included in contract)",
      "Internet aus eigenem Vertrag (Telekom etc.)": "Internet via own contract (Telekom etc.)",
      "Ja (München, Berlin, Hamburg etc.)": "Yes (Munich, Berlin, Hamburg etc.)",
      "Ja — Behinderung, Rollstuhl, Gehbehinderung": "Yes — disability, wheelchair, mobility impairment",
      "Ja — hohes Alter, Gehschwierigkeiten": "Yes — old age, walking difficulties",
      "Ja, Antrag ist eingegangen": "Ja, Antrag ist eingegangen",
      "Ja, Arbeiten sind abgeschlossen": "Yes, works are completed",
      "Ja, Beratung hat nicht geholfen": "Ja, Beratung hat nicht geholfen",
      "Ja, Betriebsrat vorhanden": "Ja, Betriebsrat vorhanden",
      "Ja, Datum/Uhrzeit notiert": "Ja, Datum/Uhrzeit notiert",
      "Ja, Forderung ist berechtigt": "Ja, Forderung ist berechtigt",
      "Ja, Fotos gemacht": "Yes, I have taken photos",
      "Ja, Fotos/Thermometer": "Yes, photos / thermometer readings",
      "Ja, Fotos/Videos": "Yes, photos / videos",
      "Ja, Frist ist schon abgelaufen": "Yes, the deadline has already passed",
      "Ja, Frist wurde eingehalten": "Ja, Frist wurde eingehalten",
      "Ja, Kappungsgrenze eingehalten": "Yes, cap limit (Kappungsgrenze) observed",
      "Ja, Klageschrift vom Gericht erhalten": "Yes, statement of claim received from the court",
      "Ja, Mängel sind eingetragen": "Yes, defects are recorded",
      "Ja, Reparatur läuft": "Yes, repair is underway",
      "Ja, SMS-Link angeklickt": "Ja, SMS-Link angeklickt",
      "Ja, Schuld ist real": "Ja, Schuld ist real",
      "Ja, Sicherheitsrisiko (z.B. Strom)": "Yes, safety risk (e.g. electricity)",
      "Ja, Vermieter weiß Bescheid": "Yes, landlord has been informed",
      "Ja, Ware funktioniert jetzt": "Ja, Ware funktioniert jetzt",
      "Ja, Wasser läuft aus / Notfall": "Yes, water leaking / emergency",
      "Ja, Wasserschaden wurde dokumentiert": "Yes, water damage was documented",
      "Ja, aber Kaution wird einbehalten": "Yes, but deposit is being withheld",
      "Ja, aber Mängel wurden nicht eingetragen": "Yes, but defects were not recorded",
      "Ja, aber Reparatur dauert zu lange": "Yes, but repair is taking too long",
      "Ja, aber Reparatur verzögert sich": "Yes, but repair is delayed",
      "Ja, aber keine Reaktion": "Yes, but no response",
      "Ja, aber nichts passiert": "Yes, but nothing has happened",
      "Ja, alle einverstanden": "Yes, everyone agrees",
      "Ja, alle sind Hauptmieter": "Yes, all are main tenants",
      "Ja, alles korrekt": "Yes, everything is correct",
      "Ja, ausführlich begründet": "Yes, thoroughly reasoned",
      "Ja, beide Seiten haben unterschrieben": "Yes, both sides have signed",
      "Ja, beides dokumentiert": "Yes, both documented",
      "Ja, bekannt": "Ja, bekannt",
      "Ja, bekanntes Büro": "Ja, bekanntes Buero",
      "Ja, bis zu einem bestimmten Datum": "Yes, until a certain date",
      "Ja, dokumentiert": "Yes, documented",
      "Ja, einmal": "Ja, einmal",
      "Ja, er hat versucht zu reparieren": "Ja, er hat versucht zu reparieren",
      "Ja, es gibt einen Mietspiegel": "Yes, there is a rent index (Mietspiegel)",
      "Ja, es ist kalt (Oktober-März / unter 15°C)": "Yes, it is cold (October–March / below 15°C)",
      "Ja, finanzieller Schaden": "Yes, financial damage",
      "Ja, fristlose Kündigung erhalten": "Yes, extraordinary termination received",
      "Ja, gesundheitliche Probleme": "Yes, health problems",
      "Ja, geöffnet": "Yes, opened",
      "Ja, habe Tracking": "Yes, there is tracking",
      "Ja, heize ordentlich": "Yes, I heat properly",
      "Ja, ich bin in Beratung": "Yes, I am getting advice",
      "Ja, ich habe einen Fehler gemacht": "Yes, I made a mistake",
      "Ja, ich habe online gekauft (Amazon, eBay, Webshop)": "Yes, I bought online (Amazon, eBay, web shop)",
      "Ja, ich kann noch zahlen": "Yes, I can still pay",
      "Ja, ich will jetzt kündigen": "Yes, I want to give notice now",
      "Ja, irgendwie": "Ja, irgendwie",
      "Ja, kalt und nass – typische Wärmebrücke": "Yes, cold and damp – typical thermal bridge",
      "Ja, konkreter Grund wurde genannt": "Ja, konkreter Grund wurde genannt",
      "Ja, korrekt per Brief/Email": "Yes, correctly by letter/email",
      "Ja, kurz getestet": "Yes, briefly tested",
      "Ja, laut Tracking verloren": "Yes, lost according to tracking",
      "Ja, mehrere Fotos": "Yes, several photos",
      "Ja, mehrfach": "Ja, mehrfach",
      "Ja, mehrfach benutzt": "Yes, used several times",
      "Ja, meine Wohnung liegt deutlich drüber": "Yes, my flat is significantly above that",
      "Ja, meine Wohnung liegt leicht drüber": "Yes, my flat is slightly above that",
      "Ja, mindestens einen Härtegrund": "Yes, at least one hardship ground",
      "Ja, mündlich oder per Email": "Yes, verbally or by email",
      "Ja, neue Miete liegt IM Bereich des Mietspiegels": "Yes, new rent is within the rent index range",
      "Ja, neue Miete liegt ÜBER Mietspiegel": "Yes, new rent is above the rent index",
      "Ja, per Email/Brief": "Yes, by email/letter",
      "Ja, rechtzeitig angekündigt (Modernisierung)": "Yes, announced in good time (modernisation)",
      "Ja, registriert": "Yes, registered",
      "Ja, sagt: Ich lüfte falsch": "Yes, says: I ventilate incorrectly",
      "Ja, scheint korrekt": "Yes, seems correct",
      "Ja, scheint zu hoch": "Yes, seems too high",
      "Ja, schriftlich": "Yes, in writing",
      "Ja, schriftlich per Email/Brief": "Yes, in writing by email/letter",
      "Ja, schriftlich zugestimmt": "Ja, schriftlich zugestimmt",
      "Ja, stimmt": "Ja, stimmt",
      "Ja, und beauftragt Gutachter": "Yes, and commissioned an expert",
      "Ja, und die 2-Wochen-Frist läuft bald ab": "Ja, und die 2-Wochen-Frist läuft bald ab",
      "Ja, versichert": "Yes, insured",
      "Ja, war online": "Ja, war online",
      "Ja, wurde informiert": "Ja, wurde informiert",
      "Jobangebot abgelehnt": "Jobangebot abgelehnt",
      "Jobcenter hat nie angefragt / vergessen": "Job centre never enquired / forgot",
      "Jobcenter sagt Wohnung ist zu teuer / zu groß": "Job centre says flat is too expensive / too large",
      "Jobcenter zahlt Kaution nicht": "Job centre does not pay deposit",
      "Jobcenter übernimmt Miete nicht vollständig": "Job centre does not fully cover rent",
      "Jährlich": "Annually",
      "Kabel-TV (im Vertrag)": "Cable TV (in contract)",
      "Kakerlaken / Schaben": "Cockroaches / roaches",
      "Kaum nutzbar / gesundheitsgefährdend": "Hardly usable / hazardous to health",
      "Kaution wird nicht zurückgezahlt": "Deposit is not being returned",
      "Kaution wurde nicht verzinst": "Deposit was not interest-bearing",
      "Kein Grund angegeben": "No reason given",
      "Kein Warmwasser": "No hot water",
      "Keine Abrechnung erhalten": "No bill received",
      "Keine Belege / Nachweise": "No receipts / evidence",
      "Keine Einzelnachweise / Belege": "No individual receipts / evidence",
      "Keine Reaktion": "No reaction",
      "Keinen Grund genannt": "Keinen Grund genannt",
      "Klein (< A4, einzelne Stellen)": "Small (< A4, individual spots)",
      "Klein (< Handtuch)": "Small (< towel size)",
      "Kleine Einschränkung": "Minor restriction",
      "Kleintiere erlaubt": "Small pets allowed",
      "Kommt immer wieder vor (chronisch)": "Occurs again and again (chronic)",
      "Komplett ausgefallen (< 18°C)": "Completely failed (< 18°C)",
      "Kosten nicht klar aufgeteilt": "Costs not clearly allocated",
      "Kreditkarte": "Kreditkarte",
      "Kurz nach Einzug (< 6 Monate)": "Shortly after moving in (< 6 months)",
      "Kurzfristige Zahlungsschwierigkeit (eine Zahlung fällt schwer)": "Kurzfristige Zahlungsschwierigkeit (eine Zahlung fällt schwer)",
      "Kündigung / Benachteiligung im Job": "Kündigung / Benachteiligung im Job",
      "Kündigung erhalten": "Kündigung erhalten",
      "Kündigung rückgängig machen": "Withdraw / reverse the termination",
      "Kündigung scheint formell korrekt": "Termination seems formally correct",
      "Kündigung wegen Eigenbedarfs — Eigenbedarfsfall entfällt": "Termination for own use — own-use case no longer applies",
      "Kündigungsfrist abgelaufen (Vertrag verlängert sich)": "Kündigungsfrist abgelaufen (Vertrag verlängert sich)",
      "Kündigungsfrist läuft noch": "Kündigungsfrist läuft noch",
      "Kündigungsschutzklage einreichen (3 Wochen!)": "Kündigungsschutzklage einreichen (3 Wochen!)",
      "Lastschrift/Bankeinzug": "Lastschrift/Bankeinzug",
      "Leerstandskosten auf mich umgelegt": "Vacancy costs passed on to me",
      "Link angeklickt / Daten eingegeben": "Link angeklickt / Daten eingegeben",
      "Lockvogel-Angebot": "Lockvogel-Angebot",
      "Lohn wird nicht/zu spät gezahlt": "Lohn wird nicht/zu spät gezahlt",
      "Lohn wurde gar nicht gezahlt": "Lohn wurde gar nicht gezahlt",
      "Lohn zu spät gezahlt": "Lohn zu spät gezahlt",
      "Lohnforderung durchsetzen": "Lohnforderung durchsetzen",
      "Länger als 2 Monate": "Länger als 2 Monate",
      "Länger als 24 Monate her": "Länger als 24 Monate her",
      "Lärm / Nachbarn": "Noise / neighbours",
      "Lärmbelästigung (Nachbarn / ich selbst)": "Noise nuisance (neighbours / myself)",
      "Löschung verweigert (Art. 17 DSGVO)": "Löschung verweigert (Art. 17 DSGVO)",
      "Maklergebühren": "Estate agent fees",
      "Maßnahme abgebrochen": "Maßnahme abgebrochen",
      "Mehr als 1 Monat": "Mehr als 1 Monat",
      "Mehr als 10 Mitarbeiter": "Mehr als 10 Mitarbeiter",
      "Mehr als 12 Monate - Abrechnung ist VERFALLEN!": "More than 12 months — bill is FORFEITED!",
      "Mehr als 12 Monate her": "More than 12 months ago",
      "Mehr als 14 Tage her": "More than 14 days ago",
      "Mehr als 2 Monate her": "Mehr als 2 Monate her",
      "Mehr als 3 Wochen her": "Mehr als 3 weeks her",
      "Mehr als 3 Wochen... her": "More than 3 weeks ago",
      "Mehr als 4 Wochen — Frist verpasst?": "Mehr als 4 weeks — deadline verpasst?",
      "Mehr als 50% höher / unplausibel": "More than 50% higher / implausible",
      "Mehr als 6 Monate": "Mehr als 6 Monate",
      "Mehr als bestellt": "More than ordered",
      "Mehrbedarf beantragen": "Mehrbedarf beantragen",
      "Mehrere Räume": "Several rooms",
      "Mehrere Schulden / Überschuldung": "Multiple debts / over-indebtedness",
      "Mehrfach (4+)": "Multiple times (4+)",
      "Mehrfach täglich (Belästigung!)": "Mehrfach täglich (Belästigung!)",
      "Meine Nutzung wurde eingeschränkt": "My use has been restricted",
      "Miete liegt über der Angemessenheitsgrenze": "Rent exceeds the affordability threshold",
      "Mietrückstand": "Rent arrears",
      "Mietvertrag soll neu abgeschlossen werden": "tenancy agreement soll neu abgeschlossen werden",
      "Mind. 24 Stunden Vorankündigung": "At least 24 hours' notice",
      "Mit eigenem Schlüssel (ohne Klingeln)": "With own key (without ringing the bell)",
      "Mittel (A4–1m², mehrere Stellen)": "Medium (A4–1m², multiple spots)",
      "Mittel (Handtuch–1m²)": "Medium (towel size–1m²)",
      "Mobbing / Diskriminierung": "Mobbing / Diskriminierung",
      "Modernisierungsumlage (§ 559 BGB)": "Modernisation surcharge (§ 559 BGB)",
      "Monatlich": "Monthly",
      "Mäuse / Ratten": "mice / rats",
      "Möchte Wohnung verkaufen / neu vermieten": "Wants to sell / re-let the flat",
      "Mücken / Fliegen (aus Rohren)": "Mosquitoes / flies (from pipes)",
      "Müllgebühren": "refuse collection fees",
      "Mündlich / telefonisch": "Mündlich / telefonisch",
      "Mündlich zugesagt, nicht im Vertrag": "Verbally agreed, not in the contract",
      "NEIN - illegal nach TMG § 7!": "NEIN - illegal nach TMG § 7!",
      "Nach Eigenbedarfskündigung / Ende Mietzeit": "After termination for own use / end of tenancy",
      "Nach einer Änderung (Umbau, neue Möbel)": "After a change (renovation, new furniture)",
      "Nach langer Mietdauer (> 1 Jahr)": "After a long tenancy (> 1 year)",
      "Nachbar (dauerhaft)": "Neighbour (ongoing)",
      "Nachbarn": "Neighbours",
      "Nachbarsgebäude / privat": "Neighbouring building / private",
      "Nachtruhe (22-6 Uhr)": "Quiet hours (22:00–06:00)",
      "Nebenkostenabrechnung zu hoch": "utility costsabrechnung too high",
      "Nein / Weiß nicht": "No / don't know",
      "Nein / nicht bekannt": "Nein / nicht bekannt",
      "Nein / unklar": "No / unclear",
      "Nein — Komforteinbuße, aber ich kann Treppen": "No — comfort loss, but I can use the stairs",
      "Nein, Erhöhung über 20% in 3 Jahren": "No, increase exceeds 20% in 3 years",
      "Nein, Forderung ist unbekannt": "No, claim is unknown",
      "Nein, Formfehler (mündlich, falsche Adresse, etc.)": "No, formal error (verbal, wrong address, etc.)",
      "Nein, Formfehler (mündlich, keine Begründung, etc.)": "No, formal error (verbal, no reasoning, etc.)",
      "Nein, Formfehler, mündlich, falsche Adresse, etc.": "No, formal error, verbal, wrong address, etc.",
      "Nein, Protokoll wurde nie erstellt": "No, protocol was never created",
      "Nein, aber Kündigung + Räumungsaufforderung": "No, but notice + eviction demand",
      "Nein, alles mündlich / gar nicht": "No, everything verbal / not at all",
      "Nein, andere wollen bleiben": "No, others want to stay",
      "Nein, das ist neu für mich": "No, this is new to me",
      "Nein, die Abmahnung ist ungerechtfertigt": "Nein, die Abmahnung ist ungerechtfertigt",
      "Nein, dubios/unbekannt": "No, dubious/unknown",
      "Nein, er ist Untermieter": "No, they are a subtenant",
      "Nein, es ist Sommer/warm": "No, it is summer/warm",
      "Nein, hat noch nicht reagiert": "No, has not reacted yet",
      "Nein, im Geschäft oder privat gekauft": "Nein, im Geschäft oder privat gekauft",
      "Nein, immer noch mangelhaft": "Nein, immer noch mangelhaft",
      "Nein, kam einfach rein": "No, kam einfach rein",
      "Nein, kein Mietspiegel vorhanden": "No, no rent index (Mietspiegel) available",
      "Nein, kein Protokoll gemacht": "No, no protocol was made",
      "Nein, kein Tracking": "No tracking",
      "Nein, kein oder unklarer Grund": "Nein, kein oder unklarer Grund",
      "Nein, keine Ahnung": "Nein, keine Ahnung",
      "Nein, keine Ankündigung": "No, no announcement",
      "Nein, keine Chance": "Nein, keine Chance",
      "Nein, keine Frist gesetzt": "No, no deadline set",
      "Nein, keine Info erhalten": "Nein, keine Info erhalten",
      "Nein, keine Möglichkeit": "No, no option",
      "Nein, keine Reaktion": "No, no reaction",
      "Nein, keine besonderen Gründe": "No, no special grounds",
      "Nein, kenne die Grenzen nicht": "No, I don't know the limits",
      "Nein, kenne ich nicht": "Nein, kenne ich nicht",
      "Nein, nichts geklickt": "Nein, nichts geklickt",
      "Nein, nichts passiert": "No, nothing has happened",
      "Nein, noch keine Beschwerden": "No, no complaints yet",
      "Nein, noch nicht": "No, not yet",
      "Nein, noch nicht informiert": "No, not yet informed",
      "Nein, noch nicht verglichen": "No, not yet compared",
      "Nein, normaler Defekt": "No, normaler Defekt",
      "Nein, nur Belastung": "Nein, nur Belastung",
      "Nein, nur Drohung": "Nein, nur Drohung",
      "Nein, nur Komforteinbuße": "No, only a comfort loss",
      "Nein, nur Mahnung/Drohung": "No, nur Mahnung/Drohung",
      "Nein, nur Standardtext / vage": "No, only boilerplate / vague",
      "Nein, nur angekündigt / laufen noch": "No, only announced / still ongoing",
      "Nein, nur mündlich": "No, nur verbally",
      "Nein, nur mündlich oder gar nicht": "No, only verbal or not at all",
      "Nein, spare am Heizen": "No, spare am Heizen",
      "Nein, unbekannt": "Nein, unbekannt",
      "Nein, ungerechtfertigt – Widerspruch!": "Nein, ungerechtfertigt – Widerspruch!",
      "Nein, vergessen": "No, forgotten",
      "Nein, welche Frist gilt?": "No, welche deadline gilt?",
      "Nein, widerspreche der Kündigung": "No, I object to the termination",
      "Nein, wurde nicht angelegt": "No, not set up",
      "Nein, zu hoch (Gebühren zu hoch)": "Nein, zu hoch (Gebühren zu hoch)",
      "Nein, zu kurze Frist": "Nein, zu kurze Frist",
      "Neuer Eigentümer betritt Wohnung häufig": "New owner enters the flat frequently",
      "Neuer Eigentümer erhöht die Miete stark": "New owner is raising the rent significantly",
      "Neuer Eigentümer will mich kündigen": "New owner wants to terminate my tenancy",
      "Nichts / unklar": "Nothing / unclear",
      "Nichts gemacht": "Nichts gemacht",
      "Nichts — reiner Druck": "Nothing — pure pressure",
      "Noch eine formale Mahnung": "Noch eine formale Mahnung",
      "Noch mehr als eine Woche Zeit": "Noch mehr als eine Woche Zeit",
      "Noch nicht überfällig / wenige Tage": "Noch nicht überfällig / wenige Tage",
      "Noch nichts dokumentiert": "Nothing documented yet",
      "Noch weniger als eine Woche": "Noch weniger als eine Woche",
      "Normale Abnutzung (Kratzer, Verfärbungen)": "Normal wear and tear (scratches, discolouration)",
      "Normale Mieterhöhung (§ 558 BGB - bis Vergleichsmiete)": "Standard rent increase (§ 558 BGB – up to comparative rent)",
      "Normale Temperatur, trotzdem Schimmel": "Normal temperature, yet mould",
      "Notfallreparatur (z.B. Dach undicht)": "Emergency repair (e.g. leaking roof)",
      "Nur Erlass der Restmiete": "Only waiver of remaining rent",
      "Nur Fotos (kein Thermometer)": "Only photos (no thermometer)",
      "Nur Kleintiere erlaubt": "Only small pets allowed",
      "Nur geöffnet, nicht benutzt": "Only opened, not used",
      "Offene Nebenkosten": "Offene utility costs",
      "Ohne Einwilligung": "Ohne Einwilligung",
      "Ordentliche Kündigung (mit Frist)": "Ordentliche Kündigung (mit Frist)",
      "Ordentliche Kündigung (ohne Eigenbedarf)": "Ordinary termination (without own-use claim)",
      "Ordentliche Kündigung ohne Eigenbedarf": "Ordinary termination without own use",
      "Parkplatz / Stellplatz Streit": "Parking space dispute",
      "Persönliche Gründe": "Personal reasons",
      "Persönliche Kosten des Vermieters enthalten": "Personal costs of the landlord included",
      "Positionen nicht aufgeschlüsselt": "Items not itemised",
      "Renovierung nach Auszug": "Renovation after moving out",
      "Reparatur läuft": "Repair is underway",
      "Rohrbruch / Leck (Vermieter-Verschulden)": "burst pipe / Leck (landlord-Verschulden)",
      "Rohrbruch / Wasserschaden": "burst pipe / water damage",
      "Rollläden / Jalousien defekt": "Roller shutters / blinds defective",
      "Routinekontrolle des Zustands": "Routine inspection of the condition",
      "Räumungstitel / Vollstreckungsankündigung": "Eviction order / enforcement notice",
      "Rücklagenanteil unklar": "Reserve fund share unclear",
      "Sagt er war Notfall (Rohrbruch etc.)": "Sagt er war Notfall (burst pipe etc.)",
      "Sanitär / Bad": "Sanitary / bathroom",
      "Schlafzimmer": "Bedroom",
      "Schlafzimmer / gesundheitsgefährdend": "Bedroom / hazardous to health",
      "Schon über 6 Monate": "Already more than 6 months",
      "Schäden an der Wohnung": "Damage to the flat",
      "Schönheitsreparaturen (Streichen)": "cosmetic repairs (Streichen)",
      "Seit 2–3 Monaten": "Seit 2–3 monthsn",
      "Sonderumlage / hohe Kosten beschlossen": "Special levy / high costs approved",
      "Sonderumlage zu hoch / unberechtigt": "Sonderumlage too high / unberechtigt",
      "Sonstige Position": "Other item",
      "Sonstiger Grund": "Other reason",
      "Sonstiges": "Other",
      "Sonstiges (Aufzug, Balkon, etc.)": "Sonstiges (lift, Balkon, etc.)",
      "Stadt / öffentliche Baustelle (Straße)": "City / public construction site (road)",
      "Staffelmiete / Indexmiete": "Graduated rent / index-linked rent",
      "Starkregen durch undichtes Dach/Fenster": "Heavy rain through leaking roof/window",
      "Straßenbau / Verkehr (extern)": "Road construction / traffic (external)",
      "Streit über Gartenpflege-Pflicht": "Dispute over garden maintenance obligation",
      "Stromausfall / Elektrik defekt": "Power outage / electrical fault",
      "Tagsüber": "During the day",
      "Teilweise — ein Raum fehlt": "Partial — one room missing",
      "Teilweise, aber unvollständig": "Partial, but incomplete",
      "Toilette defekt / verstopft": "Toilet defective / blocked",
      "Tür schließt nicht richtig": "Door does not close properly",
      "Umlageschlüssel falsch (qm/Personen)": "Distribution key incorrect (sqm/persons)",
      "Umlageschlüssel nicht erklärt": "Distribution key not explained",
      "Umzugskosten-Übernahme": "Moving cost reimbursement",
      "Umzugskosten-Übernahme beantragen": "Apply for moving cost reimbursement",
      "Ungerechtfertigte Abzüge von Kaution": "Unjustified deductions from deposit",
      "Ungeziefer / Schädlinge": "Vermin / pests",
      "Unklar / keine Info": "Unclear / no information",
      "Unklar / nicht konkret benannt": "Unclear / not specifically named",
      "Unrenoviert / bereits in schlechtem Zustand": "Unrenovated / already in poor condition",
      "Unsicher / kenne den Vertrag nicht": "Unsure / don't know the contract",
      "Unter 2 €/m² Erhöhung": "Less than €2/m² increase",
      "Unterschied Garantie vs. Gewährleistung": "Difference between warranty and statutory liability for defects",
      "Untervermietung": "Subletting",
      "Verbrauchserfassung fragwürdig": "Meter readings questionable",
      "Verkäufer (falsch verpackt)": "Seller (packed incorrectly)",
      "Vermieter behauptet, ich bin schuld": "landlord behauptet, ich bin schuld",
      "Vermieter benennt keine konkreten Schäden": "landlord benennt keine konkreten Schäden",
      "Vermieter betritt Wohnung ohne Ankündigung": "landlord betritt flat ohne Ankündigung",
      "Vermieter bietet Aufhebung an (will Wohnung zurück)": "landlord bietet Aufhebung an (will flat zurück)",
      "Vermieter dringt gegen meinen Willen ein": "landlord dringt gegen meinen Willen ein",
      "Vermieter hat es verweigert": "landlord hat es verweigert",
      "Vermieter leugnet den Wasserschaden": "landlord leugnet den water damage",
      "Vermieter lässt am Gebäude bauen": "landlord lässt am Gebäude bauen",
      "Vermieter meldet Schaden erst Wochen nach Auszug": "landlord meldet Schaden erst weeks nach Auszug",
      "Vermieter räumt Gemeinschaftsflächen nicht": "landlord räumt communal areas nicht",
      "Vermieter selbst": "landlord selbst",
      "Vermieter streitet die Mängel ab": "landlord streitet die Mängel ab",
      "Vermieter verlangt Wohnungsschlüssel-Kopie": "landlord verlangt flatsschlüssel-Kopie",
      "Vermieter verweigert": "landlord verweigert",
      "Vermieter verweigert Änderung des Vertrags": "landlord verweigert Änderung des Vertrags",
      "Vermieter weigert sich": "landlord weigert sich",
      "Vermieter will Besichtigung erzwingen": "landlord will Besichtigung erzwingen",
      "Vermieter will Garten sperren": "landlord will garden sperren",
      "Vermieter will Kündigung zurücknehmen": "landlord will termination zurücknehmen",
      "Vertragsverletzung (Miete, Hausordnung)": "Vertragsverletzung (rent, Hausordnung)",
      "Verwalter gegen meinen Willen bestellt": "Property manager appointed against my will",
      "Vor weniger als 3 Tagen": "Vor less than 3 daysn",
      "Vorauszahlungen zu hoch": "Vorauszahlungen too high",
      "Vorübergehend abwesend": "Temporarily away",
      "Völlig falsches Produkt": "Completely wrong product",
      "WC defekt / gesperrt": "WC defective / out of order",
      "War in der Wohnung als ich heimkam": "War in der flat als ich heimkam",
      "Warmwasser fehlt": "hot water fehlt",
      "Warmwasser fehlt zusätzlich": "hot water fehlt zusätzlich",
      "Was kann ich tun?": "What can I do?",
      "Wasser / Abwasser": "Water / wastewater",
      "Wasserhahn tropft / undicht": "Tap dripping / leaking",
      "Wasserschaden aus Nachbarwohnung (oben)": "water damage aus Nachbarwohnung (oben)",
      "Wasserverschmutzung / braunes Wasser": "Water contamination / brown water",
      "Weiter → Meine Rechte": "Next → My rights",
      "Weiß ich nicht": "I don't know",
      "Weiß ich nicht mehr genau": "I don't remember exactly",
      "Weiß nicht": "Don't know",
      "Weiß nicht / will prüfen": "Don't know / want to check",
      "Weiß nicht, wie prüfen?": "Don't know, how to check?",
      "Weniger als 1 Woche": "Less than 1 week",
      "Weniger als 12 Monate": "Weniger als 12 months",
      "Weniger als 12 Monate her": "Weniger als 12 months her",
      "Weniger als 14 Tage her": "Less than 14 days ago",
      "Weniger als 2 Jahre": "Less than 2 years",
      "Weniger als 2 Wochen her": "Weniger als 2 weeks her",
      "Weniger als 24 Stunden": "Less than 24 hours",
      "Weniger als 24 Stunden (akut)": "Less than 24 hours (acute)",
      "Weniger als 3 Wochen her": "Weniger als 3 weeks her",
      "Weniger als 30 Tage": "Weniger als 30 days",
      "Weniger als 3x täglich": "Less than 3 times a day",
      "Weniger als 4 Wochen": "Weniger als 4 weeks",
      "Weniger als 6 Monate": "Less than 6 months",
      "Weniger als bestellt": "Less than ordered",
      "Will barrierefreien Umbau beantragen": "Want to apply for barrier-free conversion",
      "Will sofort / heute noch": "Want to act immediately / today",
      "Wirtschaftliche Verwertung (Abriss/Umbau)": "Economic exploitation (demolition/conversion)",
      "Wirtschaftliche Verwertung gehindert": "Economic exploitation prevented",
      "Wohnungsbesichtigung (Rechte & Pflichten)": "flatsbesichtigung (Rechte & Pflichten)",
      "Zahlungsverzug (2+ Monatsmieten)": "payment arrears (2+ months' rent)",
      "Über 1 Woche": "Über 1 week",
      "Über 2 Jahre": "Over 2 years",
      "Über 2 Wochen": "More than 2 weeks",
      "Über 24 Monate": "More than 24 months",
      "Über 3 Monate": "Über 3 months",
      "Über 3 €/m² Erhöhung": "More than €3/m² increase",
      "Über 4 Wochen": "More than 4 weeks",
      "Über 6 Monate": "Über 6 months",
      "⚖️ Räumungsklage erhalten": "⚖️ eviction claim erhalten",
      "✅ Ja, \"Gekauft wie gesehen\"": "✅ Yes, 'bought as seen'",
      "✅ Ja, Fotos/Videos gemacht": "✅ Yes, photos/videos taken",
      "✅ Ja, Gutachten/Fotos": "✅ Yes, expert report/photos",
      "✅ Ja, er hat bewusst gelogen": "✅ Yes, they deliberately lied",
      "✅ Ja, habe ich": "✅ Yes, I have",
      "✅ Ja, schriftlich": "✅ Yes, in writing",
      "✅ Ja, stand dabei": "✅ Yes, it was stated",
      "❌ Nein / unklar": "❌ No / unclear",
      "❌ Nein, habe keinen Beweis": "❌ No, I have no evidence",
      "❌ Nein, nicht erwähnt": "❌ No, not mentioned",
      "❌ Nein, noch nicht": "❌ No, not yet",
      "❌ Nein, noch verschlossen": "❌ No, still sealed",
      "❌ Nein, nur mündlich": "❌ No, only verbally",
      "❌ Nein, verloren": "❌ No, lost",
      "❌ Nein, war ehrlich": "❌ No, they were honest",
      "❓ Mehrere Gründe kombiniert": "❓ Multiple reasons combined",
      "❓ Sonstiger Mangel": "❓ Other defect",
      "❓ Weiß nicht, Ursache unklar": "❓ Don't know, cause unclear",
      "🆕 Einzug — Mängel in neuer Wohnung": "🆕 Einzug — Mängel in neuer flat",
      "🇪🇺 EU-Land": "🇪🇺 EU country",
      "🌍 Internationaler Online-Shop": "🌍 International online shop",
      "🌎 Außerhalb EU (USA, China, etc.)": "🌎 Outside the EU (USA, China, etc.)",
      "🌐 Internet / TV ausgefallen": "🌐 Internet / TV has failed",
      "🌡️ Heizkostenabrechnung prüfen": "🌡️ heating costsabrechnung prüfen",
      "🌡️ Heizungsausfall": "🌡️ heatingsausfall",
      "🌳 Gemeinschaftsflächen / Garten / Keller": "🌳 communal areas / garden / Keller",
      "🎨 Schönheitsreparaturen (Streichen, Tapete)": "🎨 cosmetic repairs (Streichen, Tapete)",
      "🎨 Schönheitsreparaturen / Renovierung": "🎨 cosmetic repairs / Renovierung",
      "🏗️ Bauliche Veränderung beantragen (Balkon, Rampe)": "🏗️ Apply for structural alteration (balcony, ramp)",
      "🏗️ Baustelle vor der Wohnung": "🏗️ construction site vor der flat",
      "🏠 Lange Mietdauer (10+ Jahre)": "🏠 Long tenancy (10+ years)",
      "🏠 Wohnungsübergabe (Ein- / Auszug)": "🏠 flatsübergabe (Ein- / Auszug)",
      "🏡 Eigentumswechsel (Wohnung verkauft)": "🏡 Eigentumswechsel (flat verkauft)",
      "🏢 Eigentumswohnung / WEG-Recht": "🏢 Owner-occupied flat / WEG (owners' association) law",
      "🏢 Gewerblicher Verkäufer": "🏢 Commercial seller",
      "🏥 Schwere Erkrankung / Behinderung": "🏥 Serious illness / disability",
      "🏪 Lokales Geschäft": "🏪 Local shop",
      "🐀 Ungeziefer / Schädlinge": "🐀 vermin / Schädlinge",
      "🐕 Haustiere / Untervermietung": "🐕 Pets / subletting",
      "👥 Streit mit Nachbar-Eigentümer": "👥 Dispute with neighbouring owner",
      "👥 WG-Probleme": "👥 flat-share-Probleme",
      "👴 Hohes Alter (ab ca. 60–70 Jahre)": "👴 Old age (approx. 60–70 years+)",
      "👶 Kinder in Schule / Kita": "👶 Children in school / nursery",
      "💔 WG-Konflikt / Mitbewohner zahlt nicht": "💔 flat-share-Konflikt / Mitbewohner zahlt nicht",
      "💨 Ich lüfte viel, aber es hilft nicht": "💨 I ventilate a lot, but it doesn't help",
      "💰 Kaution wird einbehalten / nicht zurückgezahlt": "💰 deposit wird einbehalten / nicht zurückgezahlt",
      "💰 Nebenkosten / Betriebskosten": "💰 utility costs / Betriebskosten",
      "💳 Kaution wird nicht zurückgezahlt": "💳 deposit wird nicht zurückgezahlt",
      "💼 Jobcenter & Wohnkosten": "💼 Job centre & housing costs",
      "📈 Mieterhöhung / Modernisierung": "📈 rentrhöhung / Modernisierung",
      "📉 Mietminderung — wie viel steht mir zu?": "📉 Rent reduction — how much am I entitled to?",
      "📋 Kündigung erhalten / will kündigen": "📋 termination erhalten / will give notice",
      "📋 WEG-Beschluss anfechten": "📋 Challenge a WEG resolution",
      "📋 WG-Vertrag fehlt / unklar": "📋 flat-share-Vertrag fehlt / unklar",
      "📋 Übergabeprotokoll wurde nicht gemacht": "📋 Handover protocol was not created",
      "📋 Übergabeprotokoll — Vermieter will nachträglich Mängel melden": "📋 Übergabeprotokoll — landlord will nachträglich Mängel melden",
      "📜 Hausgeld-Abrechnung prüfen": "📜 service charge (Hausgeld)-Abrechnung prüfen",
      "📝 Sonstiges (Lärm, Zahlungsverzug, etc.)": "📝 Sonstiges (Lärm, payment arrears, etc.)",
      "📤 Ich will selbst kündigen": "📤 Ich will selbst give notice",
      "📤 Mitmieter/in zieht aus, ich bleibe": "📤 co-tenant/in zieht aus, ich bleibe",
      "📥 Ich will ausziehen, andere bleiben": "📥 I want to move out, others are staying",
      "📦 Amazon": "📦 Amazon",
      "📬 Ich habe eine Kündigung erhalten": "📬 Ich habe eine termination erhalten",
      "🔄 Kündigung rückgängig machen": "🔄 termination rückgängig machen",
      "🔊 Lärm (Bau, Nachbarn, Verkehr)": "🔊 Noise (construction, neighbours, traffic)",
      "🔍 Keine zumutbare Ersatzwohnung findbar": "🔍 No reasonable alternative flat available",
      "🔑 Hauptmieter vs. Untermieter — Konflikt": "🔑 main tenant vs. subtenant — Konflikt",
      "🔑 Vermieter-Zutritt / Hausfriedensbruch": "🔑 landlord-Zutritt / Hausfriedensbruch",
      "🔥 Heizungsausfall / Heizung funktioniert nicht": "🔥 heatingsausfall / heating funktioniert nicht",
      "🔧 Instandhaltung / Sonderumlage": "🔧 Maintenance / special levy",
      "🔧 Mängel in der Wohnung (Heizung, Schimmel, etc.)": "🔧 Mängel in der flat (heating, Schimmel, etc.)",
      "🔨 Schäden — Vermieter behauptet Beschädigungen": "🔨 Schäden — landlord behauptet Beschädigungen",
      "🔨 Sonstiger Mangel": "🔨 Other defect",
      "🔨 eBay": "🔨 eBay",
      "🔬 Ursache unklar — Ursachenklärung starten": "🔬 Cause unclear — start cause investigation",
      "🕐 Weniger als 6 Monate": "🕐 Less than 6 months",
      "🕑 6-24 Monate": "🕑 6–24 months",
      "🕒 Über 24 Monate": "🕒 More than 24 months",
      "🚪 Auszug — Streit über Zustand / Abnahme": "🚪 Move-out — dispute about condition / inspection",
      "🚪 Ich bin Mieter in einer ETW (nicht Eigentümer)": "🚪 Ich bin rentr in einer ETW (nicht Eigentümer)",
      "🚿 Nach Wasserrohrbruch / Feuchtigkeitsschaden": "🚿 After burst pipe / moisture damage",
      "🚿 Sanitär-Mängel (Bad, WC, Wasser)": "🚿 Sanitary defects (bathroom, WC, water)",
      "🚿 Sanitärmängel (Wasser, WC, Bad)": "🚿 Sanitary defects (water, WC, bathroom)",
      "🛗 Aufzug defekt / Barrierefreiheit": "🛗 lift defekt / Barrierefreiheit",
      "🤝 Aufhebungsvertrag unterschreiben?": "🤝 Sign a termination agreement?",
      "🤝 Privater Verkäufer": "🤝 Private seller",
      "🤝 Privatkauf (eBay Kleinanzeigen, Flohmarkt)": "🤝 Private purchase (classifieds, flea market)",
      "🦠 Schimmel / Feuchtigkeit": "🦠 Mould / damp",
      "🧱 Außenwand kalt / Wärmebrücke (Bauschaden)": "🧱 Exterior wall cold / thermal bridge (structural defect)",
      "🪟 Fenster / Türen / Elektrik": "🪟 Windows / doors / electrics"
    }
  };
}

// Override _buildPathSummary to use translated label
const _origBuildPathSummary = typeof _buildPathSummary !== 'undefined' ? _buildPathSummary : null;


// ═══════════════════════════════════════════════════════════════
// i18n FIX – Complete translation coverage
// ═══════════════════════════════════════════════════════════════

// 1. Add missing translation keys
Object.assign(TRANSLATIONS.de, {
  disclaimerBody: "Diese Website bietet keine Rechtsberatung. Die Informationen dienen ausschließlich Ihrer ersten Orientierung. Jeder Fall ist individuell. Für verbindliche Einschätzungen wenden Sie sich an einen Mieterverein, eine Gewerkschaft oder einen Rechtsanwalt.",
  areaBackBtn: "← Zurück zur Startseite",
  areaStartBtn: "Los geht's →",
  areaKaufTitle: "🛒 Kaufrecht",
  areaKaufDesc: "Hilfe bei Problemen mit Käufen, Mängeln, Widerruf und Lieferverzug.",
  areaMietTitle: "🏠 Mietrecht",
  areaMietDesc: "Hilfe bei Problemen mit der Mietwohnung, Vermieter und Kaution.",
  areaArbeitTitle: "💼 Arbeitsrecht",
  areaArbeitDesc: "Hilfe bei Problemen im Arbeitsverhältnis: Abmahnung, Kündigung, Lohn.",
  areaSozialTitle: "🤝 Sozialrecht",
  areaSozialDesc: "Hilfe bei Problemen mit Bürgergeld, ALG I, Wohngeld und Sanktionen.",
  areaVerbraucherTitle: "🛡️ Verbraucherrecht",
  areaVerbraucherDesc: "Hilfe bei Verträgen, Inkasso-Forderungen und Abofallen.",
  templatesFullDesc: "Hier finden Sie rechtssichere Mustervorlagen und Musterschreiben zum Download, sortiert nach Rechtsgebieten. Sie können den Text kopieren, ansehen oder sich eine professionelle PDF-Vorlage herunterladen. Alle Vorlagen enthalten Felder zum Ausfüllen und eine kurze Erklärung.",
  filterAllAreas: "Alle Rechtsgebiete",
  filterKaufrecht: "Kaufrecht",
  filterMietrecht: "Mietrecht",
  filterArbeitsrecht: "Arbeitsrecht",
  filterSozialrecht: "Sozialrecht",
  filterVerbraucherrecht: "Verbraucherrecht",
  recentlyUsedBtn: "Zuletzt verwendet",
  tmplBtnPreview: "👁 Vorschau & Download",
  tmplBtnCopy: "📋 Text kopieren",
  templatesNoResultsHint: "Suchbegriff ändern oder Filter zurücksetzen",
  templatesCount: "Vorlagen",
  modalCloseLabel: "Vorschau schließen",
  areaLabels: { kaufrecht: "🛒 Kaufrecht", mietrecht: "🏠 Mietrecht", arbeitsrecht: "💼 Arbeitsrecht", sozialrecht: "🏛️ Sozialrecht", verbraucherrecht: "🛡️ Verbraucherrecht" }
});

Object.assign(TRANSLATIONS.en, {
  disclaimerBody: "This website does not provide legal advice. The information is for initial orientation only. Every case is individual. For binding assessments, please contact a tenants' association, trade union or lawyer.",
  areaBackBtn: "← Back to Home",
  areaStartBtn: "Get started →",
  areaKaufTitle: "🛒 Consumer Sales Law",
  areaKaufDesc: "Help with problems involving purchases, defects, withdrawal and delayed delivery.",
  areaMietTitle: "🏠 Tenancy Law",
  areaMietDesc: "Help with problems involving your rental flat, landlord and deposit.",
  areaArbeitTitle: "💼 Employment Law",
  areaArbeitDesc: "Help with problems in your employment relationship: warnings, dismissal, wages.",
  areaSozialTitle: "🤝 Social Law",
  areaSozialDesc: "Help with problems involving citizen's allowance, ALG I, housing benefit and sanctions.",
  areaVerbraucherTitle: "🛡️ Consumer Protection",
  areaVerbraucherDesc: "Help with contracts, debt collection demands and subscription traps.",
  templatesFullDesc: "Here you will find legally sound template letters and sample documents to download, sorted by legal area. You can copy the text, preview it, or download a professional PDF template. All templates contain fillable fields and a brief explanation.",
  filterAllAreas: "All Legal Areas",
  filterKaufrecht: "Consumer Sales Law",
  filterMietrecht: "Tenancy Law",
  filterArbeitsrecht: "Employment Law",
  filterSozialrecht: "Social Law",
  filterVerbraucherrecht: "Consumer Protection",
  recentlyUsedBtn: "Recently used",
  tmplBtnPreview: "👁 Preview & Download",
  tmplBtnCopy: "📋 Copy text",
  templatesNoResultsHint: "Change search term or reset filters",
  templatesCount: "templates",
  modalCloseLabel: "Close preview",
  areaLabels: { kaufrecht: "🛒 Consumer Sales Law", mietrecht: "🏠 Tenancy Law", arbeitsrecht: "💼 Employment Law", sozialrecht: "🏛️ Social Law", verbraucherrecht: "🛡️ Consumer Protection" }
});

// 2. Replace _applyTranslations with complete version
function _applyTranslations() {
  const lang = currentLang;
  const T = TRANSLATIONS[lang] || TRANSLATIONS['de'];

  // Page title
  document.title = T.pageTitle;

  // Nav links
  const navLinks = document.querySelectorAll('.nav-link');
  if (navLinks[0]) navLinks[0].textContent = T.navHome;
  if (navLinks[1]) navLinks[1].textContent = T.navTemplates;

  // Hero
  const heroBadge = document.querySelector('.rd-hero-badge');
  if (heroBadge) heroBadge.textContent = T.heroBadge;
  const heroH1 = document.querySelector('.rd-hero-h1');
  if (heroH1) heroH1.innerHTML = T.heroH1;
  const heroSub = document.querySelector('.rd-hero-sub');
  if (heroSub) heroSub.textContent = T.heroSub;
  const heroChecks = document.querySelectorAll('.rd-hero-checks span');
  const checkKeys = ['heroCheckMiet','heroCheckKauf','heroCheckArbeit','heroCheckSozial','heroCheckVerbraucher'];
  heroChecks.forEach((el, i) => { if (checkKeys[i]) el.textContent = T[checkKeys[i]]; });
  const scrollHint = document.querySelector('.rd-scroll-hint span');
  if (scrollHint) scrollHint.textContent = T.heroScrollHint;

  // Section title
  const sectionTitle = document.querySelector('.rd-section-title');
  if (sectionTitle) sectionTitle.textContent = T.sectionChoose;

  // Cards
  const cards = document.querySelectorAll('.rd-card');
  const cardData = [
    { title: 'cardMietTitle',        desc: 'cardMietDesc',         cta: 'cardCta' },
    { title: 'cardKaufTitle',        desc: 'cardKaufDesc',         cta: 'cardCta' },
    { title: 'cardArbeitTitle',      desc: 'cardArbeitDesc',       cta: 'cardCta' },
    { title: 'cardSozialTitle',      desc: 'cardSozialDesc',       cta: 'cardCta' },
    { title: 'cardVerbraucherTitle', desc: 'cardVerbraucherDesc',  cta: 'cardCta' },
    { title: 'cardVorlagenTitle',    desc: 'cardVorlagenDesc',     cta: 'cardVorlagenCta' },
  ];
  cards.forEach((card, i) => {
    if (!cardData[i]) return;
    const h3 = card.querySelector('h3');
    const p  = card.querySelector('p');
    const cta = card.querySelector('.rd-card-cta');
    if (h3)  h3.textContent  = T[cardData[i].title] || h3.textContent;
    if (p)   p.textContent   = T[cardData[i].desc]  || p.textContent;
    if (cta) cta.textContent = T[cardData[i].cta]   || cta.textContent;
  });

  // Disclaimer – full content including body text
  const disclaimerDiv = document.querySelector('.rd-disclaimer > div');
  if (disclaimerDiv) {
    disclaimerDiv.innerHTML = '<strong>' + T.disclaimerStrong + '</strong> ' + T.disclaimerBody;
  }

  // Rechtsgebiet intro pages
  const areaPages = [
    { id: 'rechtsgebiet_kaufrecht',        title: 'areaKaufTitle',        desc: 'areaKaufDesc' },
    { id: 'rechtsgebiet_mietrecht',        title: 'areaMietTitle',        desc: 'areaMietDesc' },
    { id: 'rechtsgebiet_arbeitsrecht',     title: 'areaArbeitTitle',      desc: 'areaArbeitDesc' },
    { id: 'rechtsgebiet_sozialrecht',      title: 'areaSozialTitle',      desc: 'areaSozialDesc' },
    { id: 'rechtsgebiet_verbraucherrecht', title: 'areaVerbraucherTitle', desc: 'areaVerbraucherDesc' },
  ];
  areaPages.forEach(({ id, title, desc }) => {
    const page = document.getElementById(id);
    if (!page) return;
    const backBtn = page.querySelector('.btn-back');
    if (backBtn) backBtn.textContent = T.areaBackBtn;
    const h1 = page.querySelector('h1');
    if (h1) h1.textContent = T[title];
    const p = page.querySelector('p');
    if (p) p.textContent = T[desc];
    const startBtn = page.querySelector('.btn-primary');
    if (startBtn) startBtn.textContent = T.areaStartBtn;
  });

  // Templates page
  const tplPage = document.getElementById('templates_page');
  if (tplPage) {
    const tplBackBtn = tplPage.querySelector('.btn-back');
    if (tplBackBtn) tplBackBtn.textContent = T.areaBackBtn;
    const tplTitle = tplPage.querySelector('h1');
    if (tplTitle) tplTitle.textContent = '📄 ' + T.templatesTitle;
    const tplFullDesc = tplPage.querySelector('.card > p');
    if (tplFullDesc) tplFullDesc.textContent = T.templatesFullDesc;
    const tplSearch = tplPage.querySelector('#template-search');
    if (tplSearch) tplSearch.placeholder = T.templatesSearchPlaceholder;
    const filterSel = tplPage.querySelector('#template-area-filter');
    if (filterSel && filterSel.options.length >= 6) {
      filterSel.options[0].textContent = T.filterAllAreas;
      filterSel.options[1].textContent = T.filterKaufrecht;
      filterSel.options[2].textContent = T.filterMietrecht;
      filterSel.options[3].textContent = T.filterArbeitsrecht;
      filterSel.options[4].textContent = T.filterSozialrecht;
      filterSel.options[5].textContent = T.filterVerbraucherrecht;
    }
    const recentBtn = tplPage.querySelector('#recentlyBtn');
    if (recentBtn) recentBtn.textContent = T.recentlyUsedBtn;
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) modalClose.setAttribute('aria-label', T.modalCloseLabel);
  }

  // Re-render templates list with new language
  const currentArea = document.querySelector('#template-area-filter') ? document.querySelector('#template-area-filter').value : 'all';
  const currentSearch = document.querySelector('#template-search') ? document.querySelector('#template-search').value : '';
  renderTemplatesList(currentArea, currentSearch);
}

// 3. Replace renderTemplatesList to use t() for dynamic strings
function renderTemplatesList(area, txt) {
  area = area || 'all'; txt = txt || '';
  const T = TRANSLATIONS[currentLang] || TRANSLATIONS['de'];
  const container = document.getElementById('templates-collapsible-list');
  if (!container) return;
  const q = txt.toLowerCase().trim();
  const filtered = ALL_TEMPLATES.filter(tmpl => {
    const matchArea = area === 'all' || tmpl.area === area;
    const matchTxt  = !q || tmpl.name.toLowerCase().includes(q)
                         || (tmpl.description || '').toLowerCase().includes(q)
                         || (tmpl.text || '').toLowerCase().includes(q);
    return matchArea && matchTxt;
  });
  if (!filtered.length) {
    container.innerHTML = `<div style="text-align:center;padding:48px 16px;color:var(--color-text-secondary,#6b7280);">
      <div style="font-size:40px;margin-bottom:12px;">🔍</div>
      <div style="font-size:18px;font-weight:600;">${T.templatesNoResults || 'No templates found.'}</div>
      <div style="font-size:15px;margin-top:6px;">${T.templatesNoResultsHint || ''}</div>
    </div>`;
    return;
  }
  const ORDER = ['kaufrecht','mietrecht','arbeitsrecht','sozialrecht','verbraucherrecht'];
  const grouped = {};
  filtered.forEach(tmpl => { (grouped[tmpl.area] = grouped[tmpl.area] || []).push(tmpl); });
  const sortedGroups = ORDER.filter(k => grouped[k])
    .concat(Object.keys(grouped).filter(k => !ORDER.includes(k)));
  const areaLabels = T.areaLabels || {};
  container.innerHTML = sortedGroups.map(areaKey => {
    const items = grouped[areaKey];
    const areaLabel = areaLabels[areaKey] || _AREA_LABELS[areaKey] || areaKey;
    const rows = items.map(tmpl => `<li class="tmpl-item" id="tmpl-item-${tmpl.id}">
      <div class="tmpl-name">${_e(tmpl.name)}</div>
      <div class="tmpl-desc">${_e(tmpl.description || '')}</div>
      <div class="tmpl-actions">
        <button class="tmpl-btn primary" onclick="openPreview('${tmpl.id}')"><span>👁</span> ${T.tmplBtnPreview || '👁 Preview & Download'}</button>
        <button class="tmpl-btn" onclick="copyTemplate('${tmpl.id}')"><span>📋</span> ${T.tmplBtnCopy || '📋 Copy text'}</button>
      </div>
    </li>`).join('');
    return `<div class="templates-area open" id="area-block-${areaKey}">
      <div class="templates-area-header" onclick="toggleArea('area-block-${areaKey}')">
        <span class="collapse-arrow">▶</span>
        <span>${areaLabel}</span>
        <span style="margin-left:auto;font-size:14px;font-weight:400;color:var(--color-text-secondary,#6b7280);">${items.length} ${T.templatesCount || 'templates'}</span>
      </div>
      <ul class="templates-list">${rows}</ul>
    </div>`;
  }).join('');
}

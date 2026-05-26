/* ═══════════════════════════════════
   ArbitrageX L99 PRO v2 — App Logic
   ═══════════════════════════════════ */

/* ── STATE ── */
let userAlerts = [];
let userHistory = [...DEMO_HISTORY];
let scanFilter = 'all';
let histoFilter = 'all';
let alertFilter = 'all';
let scanCount = 0;
let keyVisible = false;

/* ── HELPERS ── */
function calc(p) {
  const fees = p.sell * (p.fee / 100);
  const profit = p.sell - p.buy - p.ship - fees;
  const margin = profit / p.sell * 100;
  const roi = profit / p.buy * 100;
  return { profit, margin, roi };
}
function mc(m) { return m >= 35 ? 'pill-high' : m >= 20 ? 'pill-med' : 'pill-low'; }
function ml(m) { return m >= 35 ? '↑ Élevée' : m >= 20 ? '→ Moyenne' : '↓ Faible'; }
function fmtDate(ts) {
  const d = new Date(ts);
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return "À l'instant";
  if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)}h`;
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}
function fmtEur(n) { return n.toFixed(2) + '€'; }
function fmtPct(n) { return n.toFixed(1) + '%'; }
function addHistory(type, label, source) {
  userHistory.unshift({ type, label, source, ts: Date.now() });
  const icons = { scan:'ti-radar', csv:'ti-file-spreadsheet', comp:'ti-layout-columns', alert:'ti-bell', calc:'ti-calculator' };
  const notifs = document.getElementById('notifList');
  const badge = document.getElementById('notifBadge');
  const item = document.createElement('div');
  item.className = 'notif-item';
  item.innerHTML = `<div class="notif-dot" style="background:var(--accent)"></div><div class="notif-text"><strong>${label}</strong>${source} · À l'instant</div><button onclick="dismissNotif(this)" style="background:none;border:none;cursor:pointer;color:var(--text3);font-size:16px;padding:0 4px;flex-shrink:0" title="Supprimer">×</button>`;
  notifs.prepend(item);
  const cur = parseInt(badge.textContent) || 0;
  badge.textContent = cur + 1;
  renderHisto(histoFilter);
}

/* ── TABS ── */
const PAGE_TITLES = {
  dashboard: 'Dashboard', scanner: 'Scanner multi-plateformes', csv: 'Import CSV',
  comparateur: 'Comparateur', calculateur: 'Calculateur', alertes: 'Alertes prix',
  historique: 'Historique', api: 'Intégration API', assistant: 'Assistant IA'
};
function switchTab(tabId) {
  document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  const sec = document.getElementById('tab-' + tabId);
  if (sec) sec.classList.add('active');
  const btn = document.querySelector(`[data-tab="${tabId}"]`);
  if (btn) btn.classList.add('active');
  document.getElementById('page-title').textContent = PAGE_TITLES[tabId] || tabId;
  closeMobile();
  if (tabId === 'dashboard') renderDashboard();
  if (tabId === 'comparateur') renderComp();
  if (tabId === 'historique') renderHisto(histoFilter);
  if (tabId === 'alertes') renderAlerts();
  if (tabId === 'api') renderEndpoints();
  if (tabId === 'calculateur') calcMargin();
  if (tabId === 'assistant') renderQuickQs();
}

/* ── MOBILE MENU ── */
document.getElementById('menuToggle').addEventListener('click', () => {
  document.querySelector('.sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
});
function closeMobile() {
  document.querySelector('.sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}
document.getElementById('overlay').addEventListener('click', closeMobile);

/* ── NAV ITEMS ── */
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

/* ── NOTIFICATIONS ── */
document.getElementById('notifBtn').addEventListener('click', () => {
  document.getElementById('notifPanel').classList.toggle('open');
});

function dismissNotif(el) {
  el.closest('.notif-item').style.transition = 'opacity 0.2s';
  el.closest('.notif-item').style.opacity = '0';
  setTimeout(() => {
    el.closest('.notif-item').remove();
    const remaining = document.querySelectorAll('.notif-item').length;
    document.getElementById('notifBadge').textContent = remaining;
    if (remaining === 0) document.getElementById('notifBadge').style.display = 'none';
  }, 200);
}

function clearAllNotifs() {
  document.querySelectorAll('.notif-item').forEach(n => n.remove());
  document.getElementById('notifBadge').textContent = '0';
  document.getElementById('notifBadge').style.display = 'none';
}

/* ══════════════ DASHBOARD ══════════════ */
function renderDashboard() {
  // top opportunities
  const sorted = [...PRODUCTS].sort((a, b) => calc(b).margin - calc(a).margin).slice(0, 6);
  const tbl = document.getElementById('dash-opps-table');
  tbl.innerHTML = `<thead><tr><th style="width:35%">Produit</th><th>Source</th><th>Cible</th><th>Achat</th><th>Vente</th><th>Marge</th></tr></thead><tbody>
  ${sorted.map(p => {
    const c = calc(p);
    return `<tr>
      <td style="font-weight:600;color:var(--text)">${p.name}</td>
      <td style="color:var(--text3);font-size:11px">${p.src}</td>
      <td style="color:var(--text3);font-size:11px">${p.tgt}</td>
      <td>${p.buy}€</td><td>${p.sell}€</td>
      <td><span class="pill ${mc(c.margin)}">${ml(c.margin)} ${fmtPct(c.margin)}</span></td>
    </tr>`;
  }).join('')}</tbody>`;

  // category bars
  const catDiv = document.getElementById('cat-bars');
  catDiv.innerHTML = CATEGORIES.map(cat => `
    <div class="cat-bar">
      <div class="cat-bar-name">${cat.name}</div>
      <div class="cat-bar-track"><div class="cat-bar-fill" style="width:${cat.margin}%"></div></div>
      <div class="cat-bar-val">${cat.margin}%</div>
    </div>`).join('');

  // recent history
  const histDiv = document.getElementById('dash-history');
  const icons = { scan:'ti-radar', csv:'ti-file-spreadsheet', comp:'ti-layout-columns', alert:'ti-bell', calc:'ti-calculator' };
  const recent = userHistory.slice(0, 5);
  histDiv.innerHTML = recent.map(h => `
    <div class="hist-item">
      <div class="hist-icon"><i class="ti ${icons[h.type] || 'ti-clock'}"></i></div>
      <div class="hist-body"><div class="hist-label">${h.label}</div><div class="hist-meta">${h.source} · ${fmtDate(h.ts)}</div></div>
    </div>`).join('');
}

/* ══════════════ SCANNER ══════════════ */
function setScanFilter(el, f) {
  document.querySelectorAll('#scan-chips .chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  scanFilter = f;
}

function doScan() {
  const q = document.getElementById('scan-q').value.toLowerCase().trim();
  const out = document.getElementById('scan-results');
  out.innerHTML = `<div class="card"><div class="loading-anim"><i class="ti ti-radar"></i>Analyse en cours sur toutes les plateformes...</div></div>`;
  addHistory('scan', `Scan : "${q || 'tous produits'}"`, 'Scanner');
  scanCount++;
  document.getElementById('d-scans').textContent = 37 + scanCount;

  setTimeout(() => {
    // Synonymes de recherche
    const SYNONYMS = {
      'beaute': 'beauté', 'beauté': 'beauté',
      'montre': 'montres', 'montres': 'montres', 'watch': 'montres',
      'electronique': 'électronique', 'électronique': 'électronique', 'tech': 'électronique',
      'jeu': 'jeux vidéo', 'jeux': 'jeux vidéo', 'gaming': 'jeux vidéo', 'console': 'jeux vidéo',
      'jouet': 'jouets', 'jouets': 'jouets',
      'maison': 'maison', 'cuisine': 'maison', 'electromenager': 'maison',
      'bien-etre': 'bien-être', 'bienetre': 'bien-être', 'sommeil': 'bien-être', 'relaxation': 'bien-être', 'wellness': 'bien-être', 'aurèa': 'bien-être', 'aurea': 'bien-être',
      'peche': 'pêche', 'pêche': 'pêche', 'axiome': 'pêche', 'carpe': 'pêche', 'leurre': 'pêche', 'canne': 'pêche', 'moulinet': 'pêche', 'fishing': 'pêche',
      'mode': 'mode', 'vetement': 'mode', 'vêtement': 'mode', 'habit': 'mode',
    };
    const qNorm = SYNONYMS[q] || q;

    // Récupère les filtres dropdowns
    const srcFilter = document.getElementById('scan-src').value.trim().toLowerCase();
    const tgtFilter = document.getElementById('scan-tgt').value.trim().toLowerCase();
    const catFilter = document.getElementById('scan-cat').value.trim().toLowerCase();

    let res = [...PRODUCTS];

    // Filtre par mot-clé
    if (q) {
      res = res.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(qNorm) ||
        p.cat.toLowerCase().includes(q) ||
        p.cat.toLowerCase().includes(qNorm)
      );
    }

    // Filtre par source (dropdown)
    if (srcFilter && srcFilter !== 'toutes sources' && srcFilter !== '') {
      res = res.filter(p => p.src.toLowerCase().includes(srcFilter.split(' ')[0]));
    }

    // Filtre par cible (dropdown)
    if (tgtFilter && tgtFilter !== 'toutes cibles' && tgtFilter !== '') {
      res = res.filter(p => p.tgt.toLowerCase().includes(tgtFilter.split(' ')[0]));
    }

    // Filtre par catégorie (dropdown)
    if (catFilter && catFilter !== 'toutes catégories' && catFilter !== '') {
      const catNorm = SYNONYMS[catFilter] || catFilter;
      res = res.filter(p =>
        p.cat.toLowerCase().includes(catFilter) ||
        p.cat.toLowerCase().includes(catNorm)
      );
    }

    // Filtre par marge (chips)
    if (scanFilter === 'high') res = res.filter(p => calc(p).margin >= 35);
    else if (scanFilter === 'med') res = res.filter(p => { const m = calc(p).margin; return m >= 20 && m < 35; });
    else if (scanFilter === 'low') res = res.filter(p => calc(p).margin < 20);

    if (!res.length) {
      out.innerHTML = `<div class="card"><div style="text-align:center;padding:2.5rem">
        <i class="ti ti-search-off" style="font-size:36px;color:var(--color-text-secondary);display:block;margin-bottom:12px"></i>
        <div style="font-size:14px;font-weight:500;color:var(--color-text-primary);margin-bottom:6px">Aucun résultat pour "${q}"</div>
        <div style="font-size:13px;color:var(--color-text-secondary);line-height:1.6">Ce produit n'est pas dans la base démo.<br>
        Avec le backend Python actif, la recherche se fait en temps réel sur eBay, Vinted, Leboncoin.</div>
        <div style="margin-top:12px;font-size:12px;color:var(--color-text-secondary)">
          Essayez : <strong>casio</strong> · <strong>seiko</strong> · <strong>nike</strong> · <strong>lego</strong> · <strong>ipad</strong> · <strong>samsung</strong> · <strong>dyson</strong>
        </div>
      </div></div>`;
      return;
    }
    lastScanResults = res;
    res.sort((a, b) => calc(b).margin - calc(a).margin);

    const avgM = res.reduce((a, p) => a + calc(p).margin, 0) / res.length;
    const best = res.reduce((a, p) => calc(p).profit > calc(a).profit ? p : a);

    out.innerHTML = `
    <div class="card">
      <div class="card-title"><i class="ti ti-check"></i>${res.length} opportunité${res.length > 1 ? 's' : ''} trouvée${res.length > 1 ? 's' : ''}</div>
      <div class="scan-stats">
        <div class="scan-stat"><div class="sv">${res.length}</div><div class="sl">Opportunités</div></div>
        <div class="scan-stat"><div class="sv">${fmtPct(avgM)}</div><div class="sl">Marge moyenne</div></div>
        <div class="scan-stat"><div class="sv">${best.name.split(' ').slice(0,2).join(' ')}</div><div class="sl">Meilleur produit</div></div>
      </div>
      <div style="overflow-x:auto">
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;align-items:center">
        <span style="font-size:11px;color:var(--color-text-secondary)">Trier par :</span>
        <button class="chip active" id="sort-margin" onclick="setScanSort('margin',this)">↓ Marge</button>
        <button class="chip" id="sort-profit" onclick="setScanSort('profit',this)">Profit net</button>
        <button class="chip" id="sort-sell" onclick="setScanSort('sell',this)">Prix vente</button>
        <button class="chip" id="sort-buy" onclick="setScanSort('buy',this)">Prix achat</button>
        <button class="chip" id="sort-roi" onclick="setScanSort('roi',this)">ROI</button>
        <button class="chip" id="sort-name" onclick="setScanSort('name',this)">Nom A→Z</button>
        <button class="chip" id="sort-src" onclick="setScanSort('src',this)">Source</button>
      </div>
      <table class="tbl">
        <thead><tr>
          <th style="width:140px;cursor:pointer" onclick="setScanSort('name',document.getElementById('sort-name'))">Produit ⇅</th>
          <th style="width:90px">Source</th>
          <th style="width:90px">Cible</th>
          <th style="width:55px;cursor:pointer" onclick="setScanSort('buy',document.getElementById('sort-buy'))">Achat ⇅</th>
          <th style="width:55px;cursor:pointer" onclick="setScanSort('sell',document.getElementById('sort-sell'))">Vente ⇅</th>
          <th style="width:75px;cursor:pointer" onclick="setScanSort('profit',document.getElementById('sort-profit'))">Profit ⇅</th>
          <th style="width:75px;cursor:pointer" onclick="setScanSort('margin',document.getElementById('sort-margin'))">Marge ⇅</th>
          <th style="width:55px;cursor:pointer" onclick="setScanSort('roi',document.getElementById('sort-roi'))">ROI ⇅</th>
          <th style="width:60px">Action</th>
        </tr></thead>
        <tbody>
        ${res.map(p => {
          const c = calc(p);
          return `<tr>
            <td style="color:var(--text);font-weight:500;white-space:normal;line-height:1.5;min-width:160px">
              <div style="margin-bottom:5px">${p.name}</div>
              <div style="display:flex;gap:4px;flex-wrap:wrap">${getSearchLinks(p)}</div>
            </td>
            <td style="color:var(--text3);font-size:11px">${p.src}</td>
            <td style="color:var(--text3);font-size:11px">${p.tgt}</td>
            <td>${p.buy}€</td>
            <td>${p.sell}€</td>
            <td style="color:var(--green);font-weight:600">+${fmtEur(c.profit)}</td>
            <td><span class="pill ${mc(c.margin)}">${fmtPct(c.margin)}</span></td>
            <td style="color:var(--text2)">${fmtPct(c.roi)}</td>
            <td><button class="btn-outline" style="padding:4px 8px;font-size:11px" onclick="quickAlert('${p.name}','${p.src}',${p.buy})">⚑ Alerte</button></td>
          </tr>`;
        }).join('')}
        </tbody>
      </table>
      </div>
    </div>`;
  }, 1000);
}

function quickAlert(name, plat, price) {
  document.getElementById('al-prod').value = name;
  document.getElementById('al-plat').value = plat;
  document.getElementById('al-price').value = Math.round(price * 0.95);
  switchTab('alertes');
}

/* ══════════════ CSV ══════════════ */
function loadCSV(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    const txt = ev.target.result;
    const lines = txt.trim().split('\n').filter(l => l.trim());
    const preview = document.getElementById('csv-preview');
    preview.innerHTML = `
      <div class="code-block" style="margin-top:12px;max-height:130px;overflow:auto">
        ${lines.slice(0, 7).map(l => `<div>${l}</div>`).join('')}
        ${lines.length > 7 ? `<div style="color:var(--accent)">... +${lines.length - 7} lignes supplémentaires</div>` : ''}
      </div>`;

    const rows = lines.slice(1).map(l => {
      const [name, buy, sell, src, tgt, shipIn, shipOut, fee] = l.split(',').map(s => s.trim());
      return { name, buy: +buy || 0, sell: +sell || 0, src: src || '?', tgt: tgt || '?', ship: (+shipIn || 0) + (+shipOut || 0), fee: +fee || 13 };
    }).filter(r => r.name && r.buy > 0);

    showToast('csv-toast', `✓ ${rows.length} produit${rows.length > 1 ? 's' : ''} importé${rows.length > 1 ? 's' : ''} depuis "${file.name}"`, 'success');
    addHistory('csv', `${file.name} — ${rows.length} produits importés`, 'Import CSV');
    document.getElementById('d-prods').textContent = (1847 + rows.length).toLocaleString('fr-FR');

    const tbl = document.getElementById('csv-table');
    if (!rows.length) { tbl.innerHTML = ''; return; }
    tbl.innerHTML = `
      <div style="margin-top:14px">
      <div class="card-title"><i class="ti ti-table" style="color:var(--accent)"></i>Analyse des ${rows.length} produits importés</div>
      <div style="overflow-x:auto">
      <table class="tbl">
        <thead><tr><th>Produit</th><th>Achat</th><th>Vente</th><th>Source</th><th>Cible</th><th>Profit net</th><th>Marge</th></tr></thead>
        <tbody>
        ${rows.slice(0, 12).map(p => {
          const c = calc(p);
          return `<tr>
            <td style="color:var(--text);font-weight:500">${p.name || '—'}</td>
            <td>${p.buy}€</td><td>${p.sell}€</td>
            <td style="font-size:11px;color:var(--text3)">${p.src}</td>
            <td style="font-size:11px;color:var(--text3)">${p.tgt}</td>
            <td style="color:var(--green);font-weight:600">+${fmtEur(c.profit)}</td>
            <td><span class="pill ${mc(c.margin)}">${fmtPct(c.margin)}</span></td>
          </tr>`;
        }).join('')}
        </tbody>
      </table>
      </div>
      ${rows.length > 12 ? `<div style="font-size:12px;color:var(--text3);padding:8px 0">... et ${rows.length - 12} autres produits</div>` : ''}
      </div>`;
  };
  reader.readAsText(file);
}

// Drag & drop
const dz = document.getElementById('dropzone');
dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('drag'); });
dz.addEventListener('dragleave', () => dz.classList.remove('drag'));
dz.addEventListener('drop', e => {
  e.preventDefault(); dz.classList.remove('drag');
  const files = e.dataTransfer.files;
  if (files[0]) { const fake = { target: { files } }; loadCSV(fake); }
});

function dlTemplate() {
  const csv = `nom,prix_achat,prix_vente,plateforme_source,plateforme_cible,frais_port_achat,frais_port_vente,commission\nAirPods Pro 2,189,249,Amazon DE,eBay FR,6,0,13\nNike Air Max 90,55,110,Vinted,Etsy,8,5,5\nLego 42115,120,180,Leboncoin,Amazon FBA,12,0,15\nDior Sauvage 100ml,18,55,AliExpress,eBay,4,0,13\nSamsung S24 Ultra,650,790,Backmarket,Amazon,0,0,12`;
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = 'modele_arbitragex.csv';
  a.click();
}

/* ══════════════ COMPARATEUR ══════════════ */
function renderComp() {
  const buy = parseFloat(document.getElementById('cp-buy').value) || 189;
  const shipIn = parseFloat(document.getElementById('cp-ship').value) || 6;
  const prod = document.getElementById('cp-prod').value || 'Produit';

  const results = PLATFORMS.map(pl => {
    const sell = Math.round(buy * pl.mult);
    const fees = sell * (pl.fee / 100);
    const profit = sell - buy - shipIn - pl.ship - fees;
    const margin = profit / sell * 100;
    const roi = profit / buy * 100;
    return { pl, sell, profit, margin, roi };
  }).sort((a, b) => b.profit - a.profit);

  const best = results[0];
  const summary = document.getElementById('comp-summary');
  summary.innerHTML = `<div class="comp-summary">Simulation pour <strong>${prod}</strong> acheté <strong>${buy}€</strong> (port achat : ${shipIn}€) · Meilleure plateforme : <strong>${best.pl.name}</strong> (+${fmtEur(best.profit)} profit)</div>`;

  const grid = document.getElementById('comp-grid');
  grid.innerHTML = results.map((r, i) => `
    <div class="comp-col${i === 0 ? ' best' : ''}">
      ${i === 0 ? '<div class="badge-best">⭐ Meilleure option</div>' : ''}
      <h4>${r.pl.name}</h4>
      <div class="cv ${r.profit > 0 ? 'g' : 'r'}">${r.profit > 0 ? '+' : ''}${fmtEur(r.profit)}</div>
      <div class="cl">profit net</div>
      <div style="margin-top:10px">
        <div style="font-size:10px;color:var(--text3);margin-bottom:3px">Marge</div>
        <div style="font-size:15px;font-weight:700;color:${r.margin >= 30 ? 'var(--green)' : r.margin >= 15 ? 'var(--amber)' : 'var(--red)'}">${fmtPct(r.margin)}</div>
        <div class="bar-comp"><div class="bar-comp-fill" style="width:${Math.max(0, Math.min(r.margin * 2, 100)).toFixed(0)}%;background:${r.margin >= 30 ? 'var(--green)' : r.margin >= 15 ? 'var(--amber)' : 'var(--red)'}"></div></div>
      </div>
      <div class="comp-detail">Commission ${r.pl.fee}% · Port ${r.pl.ship}€<br>Vente estimée ${r.sell}€<br>ROI ${fmtPct(r.roi)}</div>
    </div>`).join('');

  // bar chart
  const chart = document.getElementById('comp-chart');
  const maxProfit = Math.max(...results.map(r => r.profit));
  chart.innerHTML = results.map(r => `
    <div class="comp-chart-row">
      <div class="comp-chart-name">${r.pl.name}</div>
      <div class="comp-chart-bar">
        <div class="comp-chart-fill" style="width:${Math.max(0, (r.profit / maxProfit) * 100).toFixed(0)}%;background:${r.profit > 0 ? 'var(--accent)' : 'var(--red)'}">
          <div class="comp-chart-val">${r.profit > 0 ? '+' : ''}${fmtEur(r.profit)}</div>
        </div>
      </div>
    </div>`).join('');
}

/* ══════════════ CALCULATEUR ══════════════ */
function calcMargin() {
  const buy = parseFloat(document.getElementById('c-buy').value) || 0;
  const sell = parseFloat(document.getElementById('c-sell').value) || 0;
  const shipIn = parseFloat(document.getElementById('c-ship-in').value) || 0;
  const shipOut = parseFloat(document.getElementById('c-ship-out').value) || 0;
  const fee = parseFloat(document.getElementById('c-fee').value) || 0;
  const tva = parseFloat(document.getElementById('c-tva').value) || 0;
  const pack = parseFloat(document.getElementById('c-pack').value) || 0;
  const other = parseFloat(document.getElementById('c-other').value) || 0;

  const commissions = sell * (fee / 100);
  const tvaAmt = sell * (tva / 100);
  const totalCosts = buy + shipIn + shipOut + commissions + tvaAmt + pack + other;
  const profit = sell - totalCosts;
  const margin = sell > 0 ? (profit / sell * 100) : 0;
  const roi = buy > 0 ? (profit / buy * 100) : 0;

  const resultEl = document.getElementById('calc-result');
  const col = profit > 0 ? (margin > 25 ? 'g' : 'a') : 'r';
  resultEl.innerHTML = `
    <div class="cr-item"><div class="cr-label">Profit net</div><div class="cr-val ${col}">${fmtEur(profit)}</div></div>
    <div class="cr-item"><div class="cr-label">Marge nette</div><div class="cr-val ${col}">${fmtPct(margin)}</div></div>
    <div class="cr-item"><div class="cr-label">ROI</div><div class="cr-val ${col}">${fmtPct(roi)}</div></div>`;

  // cost breakdown
  const costs = [
    { label: 'Prix d\'achat', val: buy, color: '#ef4444' },
    { label: 'Transport (achat)', val: shipIn, color: '#f59e0b' },
    { label: 'Transport (vente)', val: shipOut, color: '#f59e0b' },
    { label: `Commission (${fee}%)`, val: commissions, color: '#a855f7' },
    { label: 'Emballage', val: pack, color: '#3b82f6' },
    { label: 'TVA', val: tvaAmt, color: '#ec4899' },
    { label: 'Autres frais', val: other, color: '#6b7280' },
  ].filter(c => c.val > 0);

  const totalC = costs.reduce((a, c) => a + c.val, 0);
  const breakdown = document.getElementById('cost-breakdown');
  breakdown.innerHTML = costs.map(c => `
    <div class="cost-item">
      <div class="cost-label">${c.label}</div>
      <div class="cost-bar"><div class="cost-bar-fill" style="width:${totalC > 0 ? (c.val / totalC * 100).toFixed(0) : 0}%;background:${c.color}"></div></div>
      <div class="cost-val">${fmtEur(c.val)}</div>
    </div>`).join('');

  // break even
  const breakEvenUnits = sell > 0 ? Math.ceil(500 / profit) : '∞';
  const beEl = document.getElementById('break-even');
  beEl.innerHTML = `<div class="break-even-box">
    <strong>${profit > 0 ? breakEvenUnits : '∞'} unités</strong>
    pour récupérer un investissement de 500€ (${fmtEur(profit > 0 ? 500 / breakEvenUnits * buy : 0)} investis)
  </div>`;

  addHistory('calc', `Calcul — Profit : ${fmtEur(profit)} | Marge : ${fmtPct(margin)}`, 'Calculateur');
}

/* ══════════════ ALERTES ══════════════ */
function addAlert() {
  const prod = document.getElementById('al-prod').value.trim();
  const plat = document.getElementById('al-plat').value;
  const price = parseFloat(document.getElementById('al-price').value);
  const marginMin = parseFloat(document.getElementById('al-margin-min').value) || 0;
  const notif = document.getElementById('al-notif').value;
  const freq = document.getElementById('al-freq').value;

  if (!prod || !price) { showToast('', 'Veuillez remplir le nom et le prix cible.', 'error'); return; }

  const newAlert = { id: 'al_' + Date.now(), prod, plat, price, margin: marginMin, notif, freq, status: 'active' };
  userAlerts.unshift(newAlert);
  document.getElementById('d-alerts').textContent = 11 + userAlerts.length;
  document.getElementById('mx3') && (document.getElementById('mx3').textContent = 11 + userAlerts.length);

  document.getElementById('al-prod').value = '';
  document.getElementById('al-price').value = '';
  addHistory('alert', `Alerte créée : ${prod} ≤ ${price}€ sur ${plat}`, 'Alertes prix');
  renderAlerts();
}

function filterAlerts(el, f) {
  document.querySelectorAll('#tab-alertes .chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  alertFilter = f;
  renderAlerts();
}

function deleteAlert(id) {
  userAlerts = userAlerts.filter(a => a.id !== id);
  renderAlerts();
}

function renderAlerts() {
  const all = [...userAlerts, ...DEMO_ALERTS];
  let filtered = alertFilter === 'all' ? all : all.filter(a => a.status === alertFilter);
  document.getElementById('alert-count').textContent = `${filtered.filter(a => a.status === 'active').length} active(s)`;

  const list = document.getElementById('alerts-list');
  list.innerHTML = filtered.map(a => `
    <div class="alert-row">
      <div class="al-dot ${a.status}"></div>
      <div class="al-info">
        <div class="al-name">${a.prod}</div>
        <div class="al-meta">${a.plat} · Prix cible ≤ ${a.price}€ · Marge min ${a.margin}% · ${a.notif} · ${a.freq}</div>
      </div>
      <span class="pill ${a.status === 'active' ? 'pill-active' : a.status === 'warn' ? 'pill-warn' : 'pill-off'}">
        ${a.status === 'active' ? '● Active' : a.status === 'warn' ? '⚠ Proche' : '○ Off'}
      </span>
      <div class="al-actions"><button onclick="deleteAlert('${a.id}')" title="Supprimer"><i class="ti ti-trash"></i></button></div>
    </div>`).join('');
}

/* ══════════════ HISTORIQUE ══════════════ */
function filterHisto(el, f) {
  document.querySelectorAll('#histo-chips .chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  histoFilter = f;
  renderHisto(f);
}

function renderHisto(f) {
  const icons = { scan:'ti-radar', csv:'ti-file-spreadsheet', comp:'ti-layout-columns', alert:'ti-bell', calc:'ti-calculator' };
  const all = userHistory;
  const filtered = f === 'all' ? all : all.filter(h => h.type === f);
  const list = document.getElementById('histo-list');
  if (!filtered.length) { list.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--text3);font-size:13px">Aucun événement dans cette catégorie</div>'; return; }
  list.innerHTML = filtered.map(h => `
    <div class="hist-item">
      <div class="hist-icon"><i class="ti ${icons[h.type] || 'ti-clock'}"></i></div>
      <div class="hist-body">
        <div class="hist-label">${h.label}</div>
        <div class="hist-meta">${h.source} · ${fmtDate(h.ts)}</div>
      </div>
    </div>`).join('');
}

function exportHistory() {
  const csv = ['type,label,source,date', ...userHistory.map(h =>
    `${h.type},"${h.label}",${h.source},${new Date(h.ts).toISOString()}`
  )].join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = `arbitragex_history_${Date.now()}.csv`;
  a.click();
}

/* ══════════════ API ══════════════ */
function renderEndpoints() {
  const list = document.getElementById('endpoints-list');
  list.innerHTML = ENDPOINTS.map(ep => `
    <div class="ep-item">
      <span class="ep-method ${ep.method.toLowerCase()}">${ep.method}</span>
      <span class="ep-path">${ep.path}</span>
      <span class="ep-desc">${ep.desc}</span>
      <span class="ep-params">${ep.params}</span>
    </div>`).join('');
  updatePreview();
}

function updatePreview() {
  const ep = document.getElementById('ep-sel').value;
  const param = document.getElementById('ep-param').value || 'q=airpods&min_margin=20';
  const method = ep === 'calculate' || ep === 'alerts_post' ? 'POST' : 'GET';
  document.getElementById('ep-preview').textContent =
    `curl -X ${method} "https://api.arbitragex.io/v1/${ep}?${param}" \\\n  -H "Authorization: Bearer axl99-sk-2f9a1b4c8d3e7f0a" \\\n  -H "Content-Type: application/json"`;
}

function testApi() {
  const ep = document.getElementById('ep-sel').value;
  const res = document.getElementById('ep-response');
  res.classList.remove('hidden');
  res.textContent = 'Chargement...';
  setTimeout(() => {
    res.textContent = EP_SAMPLES[ep] || EP_SAMPLES.scan;
  }, 500);
}

function toggleKey() {
  const field = document.getElementById('api-key-field');
  keyVisible = !keyVisible;
  field.type = keyVisible ? 'text' : 'password';
}

function copyKey() {
  const val = document.getElementById('api-key-field').value;
  navigator.clipboard?.writeText(val).then(() => showToast('key-toast', '✓ Clé copiée dans le presse-papiers', 'success'))
    .catch(() => showToast('key-toast', 'Copie manuelle : ' + val, ''));
}

function regenKey() {
  const newKey = 'axl99-sk-' + Math.random().toString(36).slice(2,10) + Math.random().toString(36).slice(2,10);
  document.getElementById('api-key-field').value = newKey;
  showToast('key-toast', '✓ Nouvelle clé générée', 'success');
}

/* ══════════════ ASSISTANT IA ══════════════ */
function renderQuickQs() {
  const container = document.getElementById('quick-qs');
  container.innerHTML = QUICK_QUESTIONS.map(q =>
    `<button class="quick-q" onclick="sendChatMsg('${q.replace(/'/g, "\\'")}')">${q}</button>`
  ).join('');
}

function getAIResponse(q) {
  const lq = q.toLowerCase();
  if (lq.includes('niche') || lq.includes('catégorie') || lq.includes('2025')) return AI_RESPONSES.niche;
  if (lq.includes('roi') || lq.includes('amazon') || lq.includes('fba') || lq.includes('calcul')) return AI_RESPONSES.roi;
  if (lq.includes('risque') || lq.includes('danger') || lq.includes('éviter') || lq.includes('problème')) return AI_RESPONSES.risque;
  if (lq.includes('ebay') || lq.includes('sous-évalué') || lq.includes('trouver')) return AI_RESPONSES.ebay;
  if (lq.includes('vinted')) return AI_RESPONSES.vinted;
  return AI_RESPONSES.default;
}

function addChatBubble(content, role) {
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `chat-bubble ${role}`;
  if (role === 'ai') div.innerHTML = `<div class="bubble-tag"><i class="ti ti-sparkles"></i> Assistant ArbitrageX</div>${content.replace(/\n/g, '<br>')}`;
  else div.textContent = content;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function sendChat() {
  const input = document.getElementById('chat-input');
  const q = input.value.trim();
  if (!q) return;
  sendChatMsg(q);
  input.value = '';
}

function sendChatMsg(q) {
  addChatBubble(q, 'user');
  document.getElementById('chat-input').value = '';
  setTimeout(() => addChatBubble(getAIResponse(q), 'ai'), 600);
}

/* ══════════════ TOAST ══════════════ */
function showToast(id, msg, type) {
  let el = id ? document.getElementById(id) : null;
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.querySelector('.content .tab-section.active')?.prepend(el);
  }
  el.className = `toast ${type}`;
  el.textContent = msg;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 4000);
}

/* ══════════════ INIT ══════════════ */
window.addEventListener('DOMContentLoaded', () => {
  renderDashboard();
  renderAlerts();
  renderHisto('all');
  renderQuickQs();
  renderEndpoints();
  calcMargin();
  updatePreview();
  renderComp();

  // seed notifications
  const notifList = document.getElementById('notifList');
  [
    { text: 'AirPods Pro 2 sous 185€ sur Amazon !', sub: 'Alerte prix déclenchée · il y a 3 min' },
    { text: 'Import CSV réussi — 42 produits analysés', sub: 'Import CSV · il y a 15 min' },
    { text: 'Nouvelle opportunité : Nacelle pêche +97€', sub: 'Scanner · il y a 1h' },
  ].forEach(n => {
    notifList.innerHTML += `<div class="notif-item">
      <div class="notif-dot" style="background:var(--accent)"></div>
      <div class="notif-text"><strong>${n.text}</strong>${n.sub}</div>
      <button onclick="dismissNotif(this)" style="background:none;border:none;cursor:pointer;color:var(--text3);font-size:16px;padding:0 4px;flex-shrink:0" title="Supprimer">×</button>
    </div>`;
  });
});

/* ══════════════ TENDANCES ══════════════ */
const PAGE_TITLES_EXT = { tendances: 'Tendances du marché' };
Object.assign(PAGE_TITLES, PAGE_TITLES_EXT);

let trendFilter = 'all';

function filterTrends(el, cat) {
  document.querySelectorAll('#trend-cats .chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  trendFilter = cat;
  renderTrends();
}

function renderTrends() {
  // Update timestamp
  const now = new Date();
  document.getElementById('tr-update').textContent = now.toLocaleTimeString('fr-FR', {hour:'2-digit',minute:'2-digit'});

  // Filter products
  let prods = trendFilter === 'all'
    ? [...TRENDING_PRODUCTS]
    : TRENDING_PRODUCTS.filter(p => p.cat === trendFilter);
  prods.sort((a, b) => b.score - a.score);

  const trendIcons = { hot:'ti-flame', up:'ti-trending-up', new:'ti-sparkles', stable:'ti-minus' };
  const trendColors = { hot:'#ef4444', up:'#22c55e', new:'#3b82f6', stable:'#6b7280' };
  const trendLabels = { hot:'🔥 Viral', up:'↑ En hausse', new:'✦ Nouveau', stable:'→ Stable' };

  document.getElementById('trend-list').innerHTML = prods.map(p => `
    <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:0.5px solid var(--color-border-tertiary);cursor:pointer"
         onclick="selectTrend('${p.name}')">
      <div style="width:44px;text-align:center;flex-shrink:0">
        <div style="font-size:18px;font-weight:700;color:${trendColors[p.trend]}">${p.score}</div>
        <div style="font-size:9px;color:var(--color-text-secondary)">score</div>
      </div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:7px;margin-bottom:3px">
          <span style="font-size:13px;font-weight:500;color:var(--color-text-primary)">${p.name}</span>
          <span style="font-size:10px;font-weight:600;padding:1px 6px;border-radius:20px;background:${trendColors[p.trend]}22;color:${trendColors[p.trend]}">${trendLabels[p.trend]}</span>
        </div>
        <div style="font-size:11px;color:var(--color-text-secondary)">${p.src} → ${p.tgt} · Marge ~${p.margin}% · Recherches ${p.searches} en ${p.since}</div>
        <div style="margin-top:5px;height:4px;background:var(--color-border-tertiary);border-radius:2px;overflow:hidden">
          <div style="width:${p.score}%;height:100%;background:${trendColors[p.trend]};border-radius:2px;transition:width 0.6s ease"></div>
        </div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-size:13px;font-weight:600;color:#22c55e">+${(p.sell - p.buy - p.sell*(p.margin < 30 ? 0.15 : 0.06) - 5).toFixed(0)}€</div>
        <div style="font-size:10px;color:var(--color-text-secondary)">profit est.</div>
      </div>
    </div>`).join('');

  // Niches
  document.getElementById('niches-list').innerHTML = NICHES_EMERGENTES.map(n => `
    <div style="padding:9px 0;border-bottom:0.5px solid var(--color-border-tertiary)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px">
        <span style="font-size:12px;font-weight:500;color:var(--color-text-primary)">${n.name}</span>
        <span style="font-size:11px;font-weight:600;color:#22c55e">${n.growth}</span>
      </div>
      <div style="font-size:11px;color:var(--color-text-secondary);line-height:1.5">${n.desc}</div>
      <div style="font-size:10px;color:#00a882;margin-top:2px">Marge typique : ${n.margin}</div>
    </div>`).join('');

  renderTrendChart('adidas_samba', 'Adidas Samba OG');
}

let selectedTrendProd = 'adidas_samba';
function selectTrend(name) {
  const key = name.toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_]/g,'');
  const dataKey = Object.keys(TREND_HISTORY).find(k => key.includes(k.split('_')[0])) || 'adidas_samba';
  renderTrendChart(dataKey, name);
}

function renderTrendChart(key, label) {
  const data = TREND_HISTORY[key] || TREND_HISTORY.adidas_samba;
  const labels = TREND_HISTORY.labels;
  const max = 100;
  const h = 120, w = 300, pad = 20;
  const pts = data.map((v, i) => {
    const x = pad + (i / (labels.length-1)) * (w - pad*2);
    const y = h - pad - (v / max) * (h - pad*2);
    return `${x},${y}`;
  });
  const area = pts.map((p,i) => i===0 ? `M${p}` : `L${p}`).join(' ') + ` L${pts[pts.length-1].split(',')[0]},${h-pad} L${pad},${h-pad} Z`;
  const line = pts.map((p,i) => i===0 ? `M${p}` : `L${p}`).join(' ');

  document.getElementById('trend-chart').innerHTML = `
    <div style="font-size:12px;color:var(--color-text-secondary);margin-bottom:8px">${label}</div>
    <svg width="100%" viewBox="0 0 ${w} ${h}">
      <path d="${area}" fill="#22c55e" fill-opacity="0.1"/>
      <path d="${line}" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      ${data.map((v,i) => {
        const x = pad + (i/(labels.length-1))*(w-pad*2);
        const y = h - pad - (v/max)*(h-pad*2);
        return `<circle cx="${x}" cy="${y}" r="3" fill="#22c55e"/>
                <text x="${x}" y="${h-4}" text-anchor="middle" font-size="9" fill="#6b7280">${labels[i]}</text>`;
      }).join('')}
      ${data.map((v,i) => {
        const x = pad + (i/(labels.length-1))*(w-pad*2);
        const y = h - pad - (v/max)*(h-pad*2);
        return `<text x="${x}" y="${y-6}" text-anchor="middle" font-size="9" font-weight="600" fill="#22c55e">${v}</text>`;
      }).join('')}
    </svg>`;
}

// Init tendances au chargement
window.addEventListener('DOMContentLoaded', () => {
  renderTrends();
});

/* ══════════════ TRI DES RÉSULTATS ══════════════ */
let currentScanSort = 'margin';
let currentScanDir = 'desc';
let lastScanResults = [];

function setScanSort(field, el) {
  // Toggle direction si même champ
  if (currentScanSort === field) {
    currentScanDir = currentScanDir === 'desc' ? 'asc' : 'desc';
  } else {
    currentScanSort = field;
    currentScanDir = field === 'name' || field === 'src' ? 'asc' : 'desc';
  }

  // Mettre à jour les chips
  document.querySelectorAll('#scan-results .chip').forEach(c => c.classList.remove('active'));
  if (el) {
    el.classList.add('active');
    const arrow = currentScanDir === 'desc' ? '↓' : '↑';
    const labels = {margin:'Marge',profit:'Profit net',sell:'Prix vente',buy:'Prix achat',roi:'ROI',name:'Nom A→Z',src:'Source'};
    el.textContent = `${arrow} ${labels[field] || field}`;
  }

  if (lastScanResults.length > 0) renderScanTable(lastScanResults);
}

function sortResults(res) {
  return [...res].sort((a, b) => {
    let va, vb;
    switch(currentScanSort) {
      case 'margin': va = calc(a).margin; vb = calc(b).margin; break;
      case 'profit': va = calc(a).profit; vb = calc(b).profit; break;
      case 'sell':   va = a.sell; vb = b.sell; break;
      case 'buy':    va = a.buy;  vb = b.buy;  break;
      case 'roi':    va = calc(a).roi; vb = calc(b).roi; break;
      case 'name':   va = a.name.toLowerCase(); vb = b.name.toLowerCase(); break;
      case 'src':    va = a.src.toLowerCase();  vb = b.src.toLowerCase();  break;
      default:       va = calc(a).margin; vb = calc(b).margin;
    }
    if (typeof va === 'string') return currentScanDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    return currentScanDir === 'desc' ? vb - va : va - vb;
  });
}

function renderScanTable(res) {
  const sorted = sortResults(res);
  const tbody = document.querySelector('#scan-results .tbl tbody');
  if (!tbody) return;
  tbody.innerHTML = sorted.map(p => {
    const c = calc(p);
    return `<tr>
      <td style="color:var(--color-text-primary);font-weight:500;white-space:normal;line-height:1.5;min-width:160px">
        <div style="margin-bottom:5px">${p.name}</div>
        <div style="display:flex;gap:4px;flex-wrap:wrap">
          ${getSearchLinks(p)}
        </div>
      </td>
      <td style="color:var(--color-text-secondary);font-size:11px">${p.src}</td>
      <td style="color:var(--color-text-secondary);font-size:11px">${p.tgt}</td>
      <td>${p.buy}€</td>
      <td>${p.sell}€</td>
      <td style="color:var(--green);font-weight:600">+${fmtEur(c.profit)}</td>
      <td><span class="pill ${mc(c.margin)}">${fmtPct(c.margin)}</span></td>
      <td style="color:var(--color-text-secondary)">${fmtPct(c.roi)}</td>
      <td><button class="btn-outline" style="padding:4px 8px;font-size:11px" onclick="quickAlert('${p.name}','${p.src}',${p.buy})">⚑</button></td>
    </tr>`;
  }).join('');
}

/* ══════════════ LIENS DE RECHERCHE INTELLIGENTS ══════════════ */
function getSearchLinks(p) {
  const q = encodeURIComponent(p.name.replace(/\(.*?\)/g,'').trim());
  const src = (p.src || '').toLowerCase();
  const links = [];

  // Lien direct si URL réelle disponible
  if (p.url_source && p.url_source.startsWith('http') &&
      !p.url_source.includes('github') && !p.url_source.includes('google')) {
    links.push(`<a href="${p.url_source}" target="_blank" style="${linkStyle('#00d4aa')}">🔗 Lien direct</a>`);
  }

  // Liens de recherche selon la source
  if (src.includes('ebay'))        links.push(`<a href="https://www.ebay.fr/sch/i.html?_nkw=${q}&LH_BIN=1&_sop=15" target="_blank" style="${linkStyle('#e53238')}">🔍 eBay</a>`);
  if (src.includes('vinted'))      links.push(`<a href="https://www.vinted.fr/catalog?search_text=${q}&order=newest_first" target="_blank" style="${linkStyle('#007782')}">🔍 Vinted</a>`);
  if (src.includes('leboncoin'))   links.push(`<a href="https://www.leboncoin.fr/recherche?text=${q}&sort=time" target="_blank" style="${linkStyle('#f56b2a')}">🔍 Leboncoin</a>`);
  if (src.includes('amazon'))      links.push(`<a href="https://www.amazon.fr/s?k=${q}&ref=nb_sb_noss" target="_blank" style="${linkStyle('#ff9900')}">🔍 Amazon</a>`);
  if (src.includes('aliexpress'))  links.push(`<a href="https://fr.aliexpress.com/wholesale?SearchText=${q}&sortType=total_tranpro_desc" target="_blank" style="${linkStyle('#e62e04')}">🔍 AliExpress</a>`);
  if (src.includes('cdiscount'))   links.push(`<a href="https://www.cdiscount.com/search/10/${q}.html#_his_" target="_blank" style="${linkStyle('#1c50a0')}">🔍 Cdiscount</a>`);
  if (src.includes('backmarket'))  links.push(`<a href="https://www.backmarket.fr/fr-fr/search?q=${q}" target="_blank" style="${linkStyle('#003c29')}">🔍 Backmarket</a>`);
  if (src.includes('fnac'))        links.push(`<a href="https://www.fnac.com/SearchResult/ResultList.aspx?SCat=0&Search=${q}&sft=1" target="_blank" style="${linkStyle('#e4a300')}">🔍 Fnac</a>`);
  if (src.includes('cjdropshipping')) links.push(`<a href="https://cjdropshipping.com/list.html?searchKey=${q}&sortField=saleCount&sortType=1" target="_blank" style="${linkStyle('#2563eb')}">🔍 CJDrop</a>`);
  if (src.includes('spocket'))     links.push(`<a href="https://app.spocket.co/products?search=${q}" target="_blank" style="${linkStyle('#7c3aed')}">🔍 Spocket</a>`);
  if (src.includes('zendrop'))     links.push(`<a href="https://app.zendrop.com/dashboard/products?search=${q}" target="_blank" style="${linkStyle('#0ea5e9')}">🔍 Zendrop</a>`);
  if (src.includes('dropmagic'))   links.push(`<a href="https://dropmagic.com/search?q=${q}" target="_blank" style="${linkStyle('#8b5cf6')}">🔍 Dropmagic</a>`);
  if (src.includes('dhgate'))      links.push(`<a href="https://www.dhgate.com/wholesale/search.do?act=search&searchkey=${q}&sortby=bestselling" target="_blank" style="${linkStyle('#c0392b')}">🔍 DHgate</a>`);
  if (src.includes('temu'))        links.push(`<a href="https://www.temu.com/search_result.html?search_key=${q}&search_method=user" target="_blank" style="${linkStyle('#ff6900')}">🔍 Temu</a>`);
  if (src.includes('bigbuy'))      links.push(`<a href="https://www.bigbuy.eu/fr/catalogsearch/result/?q=${q}" target="_blank" style="${linkStyle('#00b140')}">🔍 BigBuy</a>`);
  if (src.includes('syncee'))      links.push(`<a href="https://syncee.com/marketplace?search=${q}" target="_blank" style="${linkStyle('#ff4b00')}">🔍 Syncee</a>`);
  if (src.includes('wiio'))        links.push(`<a href="https://wiio.io/products?search=${q}" target="_blank" style="${linkStyle('#0077cc')}">🔍 Wiio</a>`);

  // Toujours ajouter recherche Google Shopping
  links.push(`<a href="https://www.google.fr/search?q=${q}&tbm=shop" target="_blank" style="${linkStyle('#4285f4')}">🔍 G.Shopping</a>`);

  // Bouton "Chercher partout" qui ouvre un menu
  const allPlatforms = [
    {name:'eBay', url:`https://www.ebay.fr/sch/i.html?_nkw=${q}&LH_BIN=1`, color:'#e53238'},
    {name:'Vinted', url:`https://www.vinted.fr/catalog?search_text=${q}`, color:'#007782'},
    {name:'Amazon', url:`https://www.amazon.fr/s?k=${q}`, color:'#ff9900'},
    {name:'Leboncoin', url:`https://www.leboncoin.fr/recherche?text=${q}`, color:'#f56b2a'},
    {name:'AliExpress', url:`https://fr.aliexpress.com/wholesale?SearchText=${q}`, color:'#e62e04'},
    {name:'CJDrop', url:`https://cjdropshipping.com/list.html?searchKey=${q}`, color:'#2563eb'},
    {name:'Spocket', url:`https://app.spocket.co/products?search=${q}`, color:'#7c3aed'},
    {name:'Zendrop', url:`https://app.zendrop.com/dashboard/products?search=${q}`, color:'#0ea5e9'},
    {name:'Dropmagic', url:`https://dropmagic.com/search?q=${q}`, color:'#8b5cf6'},
    {name:'Backmarket', url:`https://www.backmarket.fr/fr-fr/search?q=${q}`, color:'#003c29'},
    {name:'DHgate', url:`https://www.dhgate.com/wholesale/search.do?act=search&searchkey=${q}`, color:'#c0392b'},
    {name:'Temu', url:`https://www.temu.com/search_result.html?search_key=${q}`, color:'#ff6900'},
    {name:'BigBuy', url:`https://www.bigbuy.eu/fr/catalogsearch/result/?q=${q}`, color:'#00b140'},
    {name:'Syncee', url:`https://syncee.com/marketplace?search=${q}`, color:'#ff4b00'},
  ];
  const pid = 'pl_' + Math.random().toString(36).slice(2,7);
  links.push(`<button onclick="togglePlatforms('${pid}')" style="${linkStyle('#64748b')}">+ Toutes plateformes</button>`);
  links.push(`<div id="${pid}" style="display:none;width:100%;margin-top:4px">${allPlatforms.map(pl => `<a href="${pl.url}" target="_blank" style="${linkStyle(pl.color)};margin-bottom:2px">🔍 ${pl.name}</a> `).join('')}</div>`);

  return links.join('');
}

function linkStyle(color) {
  return `font-size:10px;padding:2px 6px;border-radius:4px;text-decoration:none;font-weight:500;background:${color}18;color:${color};border:0.5px solid ${color}44;white-space:nowrap;display:inline-block;margin-bottom:2px`;
}

function togglePlatforms(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = el.style.display === 'none' ? 'flex' : 'none';
  if (el) el.style.flexWrap = 'wrap';
  if (el) el.style.gap = '3px';
}

/* ══════════════ VIRAL & SPY ══════════════ */
Object.assign(PAGE_TITLES, { viral: 'Viral & Spy' });

function renderViral() {
  // ── Fournisseurs ──
  const grid = document.getElementById('viral-grid');
  const cats = ['dropshipping', 'grossiste'];
  grid.innerHTML = cats.map(cat => `
    <div style="margin-bottom:16px">
      <div style="font-size:12px;font-weight:600;color:var(--color-text-secondary);text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;padding-bottom:6px;border-bottom:0.5px solid var(--color-border-tertiary)">
        ${cat === 'dropshipping' ? '🚀 Fournisseurs Dropshipping' : '🏭 Grossistes'}
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px">
        ${VIRAL_SOURCES.filter(s => s.cat === cat).map(src => `
          <div style="background:var(--color-background-secondary);border:0.5px solid var(--color-border-tertiary);border-radius:var(--border-radius-lg);padding:14px;border-top:3px solid ${src.color}">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
              <span style="font-size:20px">${src.icon}</span>
              <div>
                <div style="font-size:13px;font-weight:600;color:var(--color-text-primary)">${src.name}</div>
                <div style="font-size:11px;color:var(--color-text-secondary)">${src.desc}</div>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:5px">
              ${src.links.map(l => `
                <a href="${l.url}" target="_blank"
                   style="display:flex;align-items:center;gap:6px;padding:7px 10px;border-radius:7px;background:${src.color}12;border:0.5px solid ${src.color}33;text-decoration:none;font-size:12px;color:${src.color};font-weight:500;transition:opacity 0.15s"
                   onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
                  ${l.label}
                  <span style="margin-left:auto;font-size:10px;opacity:0.6">↗</span>
                </a>`).join('')}
            </div>
          </div>`).join('')}
      </div>
    </div>`).join('');

  // ── Spy Concurrents ──
  const spyGrid = document.getElementById('spy-grid');
  spyGrid.innerHTML = `
    <div style="background:var(--color-background-secondary);border-radius:var(--border-radius-md);padding:10px 14px;font-size:12px;color:var(--color-text-secondary);margin-bottom:12px;border-left:3px solid var(--amber)">
      ⚠️ Ces outils permettent d'analyser légalement les publicités et boutiques publiques de vos concurrents pour identifier leurs produits gagnants.
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px">
      ${SPY_SOURCES.map(s => `
        <a href="${s.url}" target="_blank" style="background:var(--color-background-secondary);border:0.5px solid var(--color-border-tertiary);border-radius:var(--border-radius-lg);padding:14px;text-decoration:none;display:block;border-top:3px solid ${s.color};transition:transform 0.15s" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
            <span style="font-size:22px">${s.icon}</span>
            <div style="font-size:13px;font-weight:600;color:var(--color-text-primary)">${s.name}</div>
          </div>
          <div style="font-size:11px;color:var(--color-text-secondary);margin-bottom:8px;line-height:1.5">${s.desc}</div>
          <div style="font-size:11px;font-weight:600;color:${s.color};padding:4px 8px;background:${s.color}15;border-radius:5px;display:inline-block">${s.label} ↗</div>
        </a>`).join('')}
    </div>`;

  // ── Réseaux Sociaux ──
  const socialGrid = document.getElementById('social-grid');
  socialGrid.innerHTML = `
    <div style="background:var(--color-background-secondary);border-radius:var(--border-radius-md);padding:10px 14px;font-size:12px;color:var(--color-text-secondary);margin-bottom:12px;border-left:3px solid #00d4aa">
      💡 Suivez ces sources pour repérer les prochains produits viraux <strong style="color:var(--color-text-primary)">avant</strong> que tout le monde les vende.
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px">
      ${SOCIAL_VIRAL.map(s => `
        <a href="${s.url}" target="_blank" style="background:var(--color-background-secondary);border:0.5px solid var(--color-border-tertiary);border-radius:var(--border-radius-lg);padding:14px;text-decoration:none;display:block;border-top:3px solid ${s.color};transition:transform 0.15s" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
            <span style="font-size:22px">${s.icon}</span>
            <div style="font-size:13px;font-weight:600;color:var(--color-text-primary)">${s.name}</div>
          </div>
          <div style="font-size:11px;color:var(--color-text-secondary);margin-bottom:8px;line-height:1.5">${s.desc}</div>
          <div style="font-size:11px;font-weight:600;color:${s.color};padding:4px 8px;background:${s.color}20;border-radius:5px;display:inline-block">${s.label} ↗</div>
        </a>`).join('')}
    </div>`;
}

window.addEventListener('DOMContentLoaded', () => {
  // Patch switchTab to render viral
  const origSwitch = switchTab;
  window.switchTab = function(tabId) {
    origSwitch(tabId);
    if (tabId === 'viral') renderViral();
  };
});

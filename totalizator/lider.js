/* lider.js: вкладка «Таблица лидеров» (контракт п.8). Данные только из RATE (rejting.json). Всё через textContent/el. */
'use strict';
var LD = { mode: 'sezon', week: null };

function ldWeeks(){
  var w = (RATE && RATE.nedeli) ? RATE.nedeli.slice() : [];
  w.sort(function(a, b){ return a.id < b.id ? 1 : (a.id > b.id ? -1 : 0); });
  return w;
}
function ldWeekById(id){
  var ws = ldWeeks();
  for (var i = 0; i < ws.length; i++) if (ws[i].id === id) return ws[i];
  return null;
}
/* По умолчанию: самая свежая неделя с таблицей, иначе последняя закрытая, иначе самая свежая. */
function ldDefaultWeek(ws){
  var i;
  for (i = 0; i < ws.length; i++) if (ws[i].tablica && ws[i].tablica.length) return ws[i].id;
  for (i = 0; i < ws.length; i++) if (ws[i].status !== 'idet') return ws[i].id;
  return ws.length ? ws[0].id : null;
}
function ldRange(w){
  var a = fmtDate(w.mon + 'T00:00:00Z'), b = fmtDate(w.sun + 'T00:00:00Z');
  var pa = a.split(' '), pb = b.split(' ');
  if (pa[1] === pb[1]) return 'с ' + pa[0] + ' по ' + b;
  return 'с ' + a + ' по ' + b;
}
function ldWeekLabel(w){
  var st = { zakryta: 'итог есть', idet: 'идёт', bez_dannyh: 'без итога' }[w.status] || '';
  return 'Неделя ' + ldRange(w) + (st ? ' (' + st + ')' : '');
}
function ldPts(n){ return n + ' ' + plural(n, 'очко', 'очка', 'очков'); }
function ldIsMe(name){ return !!STATE.me && String(name).toLowerCase() === STATE.me.toLowerCase(); }
function ldBadgeInfo(id){
  var list = (RATE && RATE.znachki) || [];
  for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
  return null;
}

/* ---- переключатель Неделя / Сезон ---- */
function ldSeg(){
  var seg = el('div', 'ld-seg'); seg.id = 'ldSeg'; seg.setAttribute('role', 'group'); seg.setAttribute('aria-label', 'Что показать');
  [['nedelya', 'Неделя'], ['sezon', 'Сезон']].forEach(function(m){
    var on = LD.mode === m[0];
    var b = el('button', 'ld-segbtn' + (on ? ' on' : ''), m[1]); b.type = 'button'; b.setAttribute('data-mode', m[0]); b.setAttribute('aria-pressed', on ? 'true' : 'false');
    b.addEventListener('click', function(){ if (LD.mode === m[0]) return; LD.mode = m[0]; ldDraw(); });
    seg.appendChild(b);
  });
  return seg;
}
function ldPicker(ws){
  var box = el('div', 'ld-pick');
  var lab = el('label', 'ld-pick-l', 'Неделя'); lab.setAttribute('for', 'ldWeekSel');
  var sel = el('select', 'ld-sel'); sel.id = 'ldWeekSel';
  var idx = 0;
  ws.forEach(function(w, i){
    var o = el('option', null, ldWeekLabel(w)); o.value = w.id; if (w.id === LD.week) { o.selected = true; idx = i; } sel.appendChild(o);
  });
  sel.addEventListener('change', function(){ LD.week = sel.value; ldDraw(); });
  var older = el('button', 'btn btn-line ld-nav', 'Раньше'); older.type = 'button'; older.id = 'ldOlder';
  var newer = el('button', 'btn btn-line ld-nav', 'Позже'); newer.type = 'button'; newer.id = 'ldNewer';
  older.disabled = idx >= ws.length - 1; newer.disabled = idx <= 0;
  older.addEventListener('click', function(){ if (idx < ws.length - 1) { LD.week = ws[idx + 1].id; ldDraw(); } });
  newer.addEventListener('click', function(){ if (idx > 0) { LD.week = ws[idx - 1].id; ldDraw(); } });
  var row = el('div', 'ld-pick-row'); row.appendChild(older); row.appendChild(sel); row.appendChild(newer);
  box.appendChild(lab); box.appendChild(row);
  return box;
}

/* ---- строка таблицы ---- */
function ldRow(r, lead, stats){
  var li = el('li', 'ld-row' + (lead ? ' lead' : '') + (ldIsMe(r.imya) ? ' me' : ''));
  li.setAttribute('data-name', r.imya);
  li.appendChild(el('div', 'ld-place', String(r.mesto)));
  var who = el('div', 'ld-who');
  var nameLine = el('div', 'ld-nameline');
  var b = el('button', 'ld-name', r.imya + ' ›'); b.type = 'button';
  b.setAttribute('aria-label', 'Открыть ставки и значки: ' + r.imya);
  b.addEventListener('click', function(){ showTab('moi', r.imya); });
  nameLine.appendChild(b);
  if (lead) { var cup = el('span', 'ld-cup', '🏆'); cup.setAttribute('role', 'img'); cup.setAttribute('aria-label', 'Лидер'); nameLine.appendChild(cup); }
  if (ldIsMe(r.imya)) nameLine.appendChild(el('span', 'ld-me', 'это вы'));
  who.appendChild(nameLine);
  var zn = r.znachki || [];
  if (zn.length) {
    var bd = el('div', 'ld-badges');
    zn.forEach(function(id){
      var info = ldBadgeInfo(id); if (!info || !info.ikonka) return;
      var s = el('span', 'ld-bd', info.ikonka); s.title = info.nazvanie; s.setAttribute('role', 'img'); s.setAttribute('aria-label', info.nazvanie);
      bd.appendChild(s);
    });
    if (bd.childNodes.length) who.appendChild(bd);
  }
  li.appendChild(who);
  var pt = el('div', 'ld-pts'); pt.appendChild(el('b', null, String(r.ochki))); pt.appendChild(el('span', null, plural(r.ochki, 'очко', 'очка', 'очков')));
  li.appendChild(pt);
  if (stats) {
    var st = el('div', 'ld-stats');
    stats.forEach(function(s){ var c = el('div', 'ld-st'); c.appendChild(el('span', 'ld-k', s[0])); c.appendChild(el('b', null, s[1])); st.appendChild(c); });
    li.appendChild(st);
  }
  return li;
}
function ldLegend(){
  var list = (RATE && RATE.znachki) || [];
  if (!list.length) return null;
  var box = el('div', 'ld-legend');
  box.appendChild(el('h3', null, 'Значки'));
  var ul = el('ul', 'ld-leg-list');
  list.forEach(function(z){
    var li = el('li', 'ld-leg-i'); li.appendChild(el('span', 'ld-leg-e', z.ikonka || '')); li.appendChild(el('span', null, z.nazvanie)); ul.appendChild(li);
  });
  box.appendChild(ul);
  return box;
}

/* ---- сезон ---- */
function ldSezon(box){
  var sz = RATE.sezon || {};
  var info = el('div', 'ld-sez');
  if (sz.nazvanie) info.appendChild(el('h3', 'ld-sez-h', sz.nazvanie));
  if (sz.nedel_vsego) {
    var done = sz.nedel_proshlo || 0, pc = Math.max(0, Math.min(100, Math.round(done * 100 / sz.nedel_vsego)));
    var pr = el('div', 'ld-prog'); pr.id = 'ldProg';
    pr.appendChild(el('div', 'ld-prog-t', 'Прошло ' + done + ' из ' + sz.nedel_vsego + ' недель'));
    var bar = el('div', 'ld-bar'); bar.setAttribute('role', 'progressbar'); bar.setAttribute('aria-valuemin', '0'); bar.setAttribute('aria-valuemax', String(sz.nedel_vsego)); bar.setAttribute('aria-valuenow', String(done));
    var fill = el('span'); fill.style.width = Math.max(pc, done > 0 ? 2 : 0) + '%'; bar.appendChild(fill);
    pr.appendChild(bar); info.appendChild(pr);
  }
  box.appendChild(info);
  var rows = RATE.sezon_tablica || [];
  if (!rows.length) { var e = el('p', 'note', 'В таблице сезона пока никого: первая неделя ещё идёт.'); e.id = 'ldEmpty'; box.appendChild(e); return; }
  var leaders = RATE.lider_sezona || [];
  var ul = el('ol', 'ld-rows'); ul.id = 'ldRows';
  rows.forEach(function(r){
    var lead = leaders.indexOf(r.imya) >= 0;
    ul.appendChild(ldRow(r, lead, [
      ['Недель в игре', String(r.nedel || 0)],
      ['В топ-3', String(r.top3 || 0)],
      ['Лучшая неделя', ldPts(r.luchshee || 0)],
      ['Серия в топ-3', (r.serija || 0) + ' ' + plural(r.serija || 0, 'неделя', 'недели', 'недель')]
    ]));
  });
  box.appendChild(ul);
  var lg = ldLegend(); if (lg) box.appendChild(lg);
}

/* ---- неделя ---- */
function ldNedelya(box, ws){
  if (!LD.week || !ldWeekById(LD.week)) LD.week = ldDefaultWeek(ws);
  var w = ldWeekById(LD.week);
  box.appendChild(ldPicker(ws));
  box.appendChild(el('p', 'ld-range', 'Неделя ' + ldRange(w) + '.'));
  if (w.status === 'idet') {
    var a = el('div', 'ld-none'); a.id = 'ldNone';
    a.appendChild(el('b', null, 'Неделя идёт, итог в понедельник в 12:15. Таблицы недели пока нет.'));
    box.appendChild(a); return;
  }
  if (w.status === 'bez_dannyh' || !(w.tablica && w.tablica.length)) {
    var c = el('div', 'ld-none'); c.id = 'ldNone';
    c.appendChild(el('b', null, w.status === 'bez_dannyh' ? 'Рекламы на этой неделе не было, итога нет.' : 'На этой неделе очков никто не набрал.'));
    box.appendChild(c); return;
  }
  var zn = {};
  (RATE.sezon_tablica || []).forEach(function(r){ zn[r.imya] = r.znachki || []; });
  var wins = w.pobediteli || [];
  if (w.uslovnyj) { var n = el('p', 'note ld-cond', 'Условный итог: показов было мало.'); box.appendChild(n); }
  var ul = el('ol', 'ld-rows'); ul.id = 'ldRows';
  w.tablica.forEach(function(r){
    var row = { imya: r.imya, ochki: r.ochki, mesto: r.mesto, znachki: zn[r.imya] || [] };
    ul.appendChild(ldRow(row, wins.indexOf(r.imya) >= 0 && r.ochki > 0, null));
  });
  box.appendChild(ul);
  var lg = ldLegend(); if (lg) box.appendChild(lg);
}

/* ---- главная ---- */
function renderLider(){ ldDraw(); }
function ldDraw(){
  var box = $('s-lider'); if (!box) return;
  box.textContent = '';
  var ws = ldWeeks();
  if (!RATE || (!ws.length && !(RATE.sezon_tablica && RATE.sezon_tablica.length))) {
    var p = el('p', 'note ld-empty', 'Итогов пока нет: первая неделя ещё идёт.'); p.id = 'ldEmpty'; box.appendChild(p);
    return;
  }
  var h = el('h2'); h.appendChild(document.createTextNode('Таблица ')); h.appendChild(el('span', 'g', 'лидеров')); box.appendChild(h);
  box.appendChild(ldSeg());
  if (LD.mode === 'nedelya' && ws.length) ldNedelya(box, ws);
  else { LD.mode = 'sezon'; ldSezon(box); }
}

on('data:ready', function(){ if (typeof CUR_TAB !== 'undefined' && CUR_TAB === 'lider') ldDraw(); });
on('me:changed', function(){ if (typeof CUR_TAB !== 'undefined' && CUR_TAB === 'lider') ldDraw(); });

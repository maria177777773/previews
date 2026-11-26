/* itogi.js: вкладка «Итоги недели» (контракт п.8). Данные: RATE (rejting.json) и DATA (partii.json).
   Очки страница не считает: всё берётся из RATE.stavki[...].razbor и RATE.nedeli[...]. Всё через textContent/el. */
'use strict';
var IT = { week: null, saluted: {}, raf: 0, timer: 0, canvas: null };

/* ---- помощники ---- */
function itWeeks(){
  var w = (RATE && RATE.nedeli) ? RATE.nedeli.slice() : [];
  w.sort(function(a, b){ return a.id < b.id ? 1 : (a.id > b.id ? -1 : 0); });
  return w;
}
function itWeekById(id){
  var ws = itWeeks();
  for (var i = 0; i < ws.length; i++) if (ws[i].id === id) return ws[i];
  return null;
}
/* Последняя закрытая неделя; если закрытых нет, самая свежая. */
function itDefaultWeek(ws){
  for (var i = 0; i < ws.length; i++) if (ws[i].status !== 'idet') return ws[i].id;
  return ws.length ? ws[0].id : null;
}
function itRange(w){
  var a = fmtDate(w.mon + 'T00:00:00Z'), b = fmtDate(w.sun + 'T00:00:00Z');
  var pa = a.split(' '), pb = b.split(' ');
  if (pa[1] === pb[1]) return 'с ' + pa[0] + ' по ' + b;
  return 'с ' + a + ' по ' + b;
}
function itNames(list){
  if (!list || !list.length) return '';
  if (list.length === 1) return list[0];
  return list.slice(0, -1).join(', ') + ' и ' + list[list.length - 1];
}
function itWeekLabel(w){
  var st = { zakryta: 'итог есть', idet: 'идёт', bez_dannyh: 'без итога' }[w.status] || '';
  return 'Неделя ' + itRange(w) + (st ? ' (' + st + ')' : '');
}
function itPts(n){ return n + ' ' + plural(n, 'очко', 'очка', 'очков'); }
function itIsMe(name){ return !!STATE.me && String(name).toLowerCase() === STATE.me.toLowerCase(); }
function itTourBad(p){
  var t = p && p.itog;
  if (!p) return true;
  if (p.status === 'bez_dannyh') return true;
  if (!t) return true;
  if (t.status === 'bez_dannyh') return true;
  return !((t.luchshie && t.luchshie.length) || (t.hudshie && t.hudshie.length));
}
function itFaktMap(p){
  var m = {};
  ((p.itog && p.itog.fakt) || []).forEach(function(f){ m[f.id] = f; });
  return m;
}
function itBanner(p, id){
  var b = p.bannery || [];
  for (var i = 0; i < b.length; i++) if (b[i].id === id) return b[i];
  return null;
}

/* ---- выбор недели ---- */
function itPicker(ws){
  var box = el('div', 'it-pick');
  var lab = el('label', 'it-pick-l', 'Неделя'); lab.setAttribute('for', 'itWeekSel');
  var sel = el('select', 'it-sel'); sel.id = 'itWeekSel';
  ws.forEach(function(w){
    var o = el('option', null, itWeekLabel(w)); o.value = w.id; if (w.id === IT.week) o.selected = true; sel.appendChild(o);
  });
  sel.addEventListener('change', function(){ itSetWeek(sel.value); });
  var idx = 0; ws.forEach(function(w, i){ if (w.id === IT.week) idx = i; });
  var older = el('button', 'btn btn-line it-nav', 'Раньше'); older.type = 'button'; older.id = 'itOlder';
  var newer = el('button', 'btn btn-line it-nav', 'Позже'); newer.type = 'button'; newer.id = 'itNewer';
  older.disabled = idx >= ws.length - 1; newer.disabled = idx <= 0;
  older.addEventListener('click', function(){ if (idx < ws.length - 1) itSetWeek(ws[idx + 1].id); });
  newer.addEventListener('click', function(){ if (idx > 0) itSetWeek(ws[idx - 1].id); });
  var row = el('div', 'it-pick-row'); row.appendChild(older); row.appendChild(sel); row.appendChild(newer);
  box.appendChild(lab); box.appendChild(row);
  return box;
}
function itSetWeek(id){
  IT.week = id; itStopSalute(); itDraw(true);
}

/* ---- блоки закрытой недели ---- */
function itWinPlaque(w, cond){
  var win = el('div', 'it-win'); win.id = 'itWin';
  var names = w.pobediteli || [];
  win.appendChild(el('div', 'it-win-cup', '🏆'));
  win.appendChild(el('div', 'it-win-l', names.length > 1 ? 'Победители недели' : 'Победитель недели'));
  win.appendChild(el('div', 'it-win-n', itNames(names)));
  var top = null;
  (w.tablica || []).forEach(function(r){ if (names.indexOf(r.imya) >= 0 && (top === null || r.ochki > top)) top = r.ochki; });
  if (top != null) win.appendChild(el('div', 'it-win-p', names.length > 1 ? 'У каждого ' + itPts(top) : itPts(top)));
  if (cond) win.appendChild(el('div', 'it-cond', 'Условный итог: показов было мало'));
  return win;
}
function itPodium(w){
  var pod = w.podium || [], any = false;
  var box = el('ol', 'it-podium'); box.id = 'itPodium'; box.setAttribute('aria-label', 'Пьедестал недели');
  var pts = {};
  (w.tablica || []).forEach(function(r){ pts[r.imya] = r.ochki; });
  for (var i = 0; i < 3; i++) {
    var names = pod[i] || [];
    if (!names.length) continue;
    any = true;
    var st = el('li', 'it-step p' + (i + 1));
    st.appendChild(el('div', 'it-step-n', String(i + 1)));
    names.forEach(function(n){
      var nm = el('div', 'it-step-name', n);
      if (itIsMe(n)) nm.appendChild(el('span', 'it-me', ' (вы)'));
      st.appendChild(nm);
    });
    if (pts[names[0]] != null) st.appendChild(el('div', 'it-step-pts', itPts(pts[names[0]])));
    box.appendChild(st);
  }
  return any ? box : null;
}
function itTable(w){
  var rows = w.tablica || [];
  if (!rows.length) return null;
  var wrap = el('div', 'it-tab');
  wrap.appendChild(el('h3', null, 'Таблица недели'));
  var ul = el('ol', 'it-rows'); ul.id = 'itRows';
  rows.forEach(function(r){
    var lead = r.mesto === 1 && r.ochki > 0;
    var li = el('li', 'it-row' + (lead ? ' lead' : '') + (itIsMe(r.imya) ? ' me' : ''));
    li.appendChild(el('span', 'it-row-n', String(r.mesto)));
    var nm = el('span', 'it-row-name', r.imya);
    if (lead) nm.appendChild(el('span', 'it-cup', ' 🏆'));
    if (itIsMe(r.imya)) nm.appendChild(el('span', 'it-me', ' (вы)'));
    li.appendChild(nm);
    li.appendChild(el('span', 'it-row-p', itPts(r.ochki)));
    ul.appendChild(li);
  });
  wrap.appendChild(ul);
  return wrap;
}

/* ---- разбор тура ---- */
function itImgs(b){
  var row = el('div', 'it-imgs');
  var list = [{ s: b.img, big: b.img_big || b.img, alt: b.podpis + (b.img_g ? ', светлая версия' : '') }];
  if (b.img_g) list.push({ s: b.img_g, big: b.img_g_big || b.img_g, alt: b.podpis + ', зелёная версия' });
  list.forEach(function(it){
    var im = el('img'); im.src = it.s; im.alt = it.alt; im.loading = 'lazy'; im.decoding = 'async';
    var bt = el('button', 'it-imgbtn'); bt.type = 'button'; bt.setAttribute('aria-label', 'Увеличить: ' + it.alt);
    bt.addEventListener('click', function(){ openLightbox(it.big, it.alt); });
    bt.appendChild(im); row.appendChild(bt);
  });
  return row;
}
function itCard(b, f, isLider){
  var c = el('li', 'it-card');
  c.appendChild(itImgs(b));
  var nm = el('div', 'it-cname', b.podpis);
  c.appendChild(nm);
  if (isLider) c.appendChild(el('div', 'it-ctag', '★ Лидер недели'));
  var dl = el('dl', 'it-met');
  function line(k, v){ var r = el('div', 'it-met-r'); r.appendChild(el('dt', null, k)); r.appendChild(el('dd', null, v)); dl.appendChild(r); }
  if (f) {
    line('Показы', fmtNum(f.shows)); line('Клики', fmtNum(f.clicks)); line('CTR', ctrText(f.ctr));
    if (f.zayavki == null) { dl.appendChild(el('p', 'it-met-n', 'Заявок по макету пока нет данных.')); }
    else line('Заявки', String(f.zayavki));
  } else {
    dl.appendChild(el('p', 'it-met-n', 'Данных по макету пока нет.'));
  }
  c.appendChild(dl);
  return c;
}
function itGroup(p, title, ids, fm, liders){
  var g = el('div', 'it-grp');
  g.appendChild(el('h4', 'it-grp-h', title));
  var ul = el('ul', 'it-cards ' + (p.gz ? 'ny' : 'ob'));
  var n = 0;
  ids.forEach(function(id){
    var b = itBanner(p, id); if (!b) return;
    ul.appendChild(itCard(b, fm[id], liders.indexOf(id) >= 0)); n++;
  });
  if (!n) return null;
  g.appendChild(ul);
  return g;
}
function itBetLine(s, p){
  var r = s.razbor, out = el('div', 'it-bet');
  var head = el('div', 'it-bet-h');
  head.appendChild(el('b', null, s.imya));
  if (itIsMe(s.imya)) head.appendChild(el('span', 'it-me', ' (вы)'));
  var off = s.posle_starta || (r && r.vne_zachyota);
  if (off) head.appendChild(el('span', 'it-off', 'вне зачёта'));
  out.appendChild(head);
  if (off) {
    out.appendChild(el('div', 'it-bet-t', s.posle_starta ? 'Ставка сделана после старта тура, очки не идут в таблицу.' : 'Ставка пришла поздно, очки не идут в таблицу.'));
    return out;
  }
  if (!r || s.ochki == null) { out.appendChild(el('div', 'it-bet-t', 'Разбор этой ставки пока не готов.')); return out; }
  var parts = ['лучших ' + r.luchshie + ' из ' + p.k, 'худших ' + r.hudshie + ' из ' + p.h];
  if (r.lider > 0) parts.push('фаворит +' + r.lider);
  if (p.gz && r.cvet > 0) parts.push('цвет +' + r.cvet);
  out.appendChild(el('div', 'it-bet-t', 'угадал: ' + parts.join(', ') + ' = ' + s.ochki));
  return out;
}
function itTour(box, p, w){
  var sec = el('section', 'it-tour');
  sec.appendChild(el('h3', 'it-tour-h', 'Разбор тура: ' + p.nazvanie));
  if (itTourBad(p)) {
    sec.appendChild(el('p', 'note', 'Рекламы по этому туру не было, итога нет.'));
    box.appendChild(sec); return;
  }
  var t = p.itog, fm = itFaktMap(p), liders = t.lider || [];
  if (t.uslovnyj) sec.appendChild(el('p', 'note it-note-c', 'Условный итог: показов было мало. Очки начислены, но цифры могут сдвинуться.'));
  var g1 = itGroup(p, 'Реальные лучшие карточки', t.luchshie || [], fm, liders);
  var g2 = itGroup(p, 'Реальные худшие карточки', t.hudshie || [], fm, liders);
  if (g1) sec.appendChild(g1);
  if (g2) sec.appendChild(g2);
  if (p.gz) {
    var ct = t.cvet === 'w' ? 'Белая версия кликалась лучше зелёной.' : (t.cvet === 'g' ? 'Зелёная версия кликалась лучше белой.' : 'Цвет: победителя нет, очки за цвет никто не получил.');
    sec.appendChild(el('p', 'it-cvet', ct));
  }
  var bets = (RATE.stavki && RATE.stavki[p.id]) || [];
  if (bets.length) {
    var bx = el('div', 'it-bets'); bx.appendChild(el('h4', 'it-grp-h', 'Как угадали игроки'));
    var ul = el('ul', 'it-bet-list');
    bets.forEach(function(s){ var li = el('li', 'it-bet-li' + (itIsMe(s.imya) ? ' me' : '')); li.appendChild(itBetLine(s, p)); ul.appendChild(li); });
    bx.appendChild(ul); sec.appendChild(bx);
  }
  box.appendChild(sec);
}

/* ---- идущая и пустая неделя ---- */
function itCountBets(w){
  var n = 0, any = false;
  (w.turi || []).forEach(function(id){
    var c = RATE && RATE.chislo_stavok && RATE.chislo_stavok[id];
    if (c != null) { n += c; any = true; }
    else if (RATE && RATE.stavki && RATE.stavki[id]) { n += RATE.stavki[id].length; any = true; }
  });
  return any ? n : null;
}
function itRunning(box, w){
  var card = el('div', 'it-run'); card.id = 'itRun';
  card.appendChild(el('div', 'it-run-h', 'Неделя идёт, итог в понедельник в 12:15'));
  var konec = null;
  (w.turi || []).forEach(function(id){ var p = getPartiya(id); if (p && p.konec && (!konec || p.konec > konec)) konec = p.konec; });
  if (konec) card.appendChild(el('p', 'it-run-p', 'Итог: ' + fmtDay(konec) + ', ' + fmtDate(konec) + ', ' + fmtTime(konec) + ' по Москве.'));
  var n = itCountBets(w);
  if (n != null) card.appendChild(el('p', 'it-run-p', 'Ставок на эту неделю: ' + n + '. Кто как поставил, мы покажем после итога.'));
  box.appendChild(card);
}
function itEmptyWeek(box){
  var card = el('div', 'it-run it-none'); card.id = 'itNone';
  card.appendChild(el('div', 'it-run-h', 'Рекламы на этой неделе не было, итога нет'));
  box.appendChild(card);
}

/* ---- салют ---- */
function itStopSalute(){
  if (IT.raf) { try { cancelAnimationFrame(IT.raf); } catch (e) {} IT.raf = 0; }
  if (IT.timer) { clearTimeout(IT.timer); IT.timer = 0; }
  if (IT.canvas) { if (IT.canvas.parentNode) IT.canvas.parentNode.removeChild(IT.canvas); IT.canvas = null; }
}
function itSalute(){
  if (reducedMotion()) return;
  itStopSalute();
  var cv = document.createElement('canvas'); cv.className = 'it-salut'; cv.id = 'itSalut'; cv.setAttribute('aria-hidden', 'true');
  var dpr = Math.min(window.devicePixelRatio || 1, 2), W = window.innerWidth, H = window.innerHeight;
  cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
  var ctx = cv.getContext ? cv.getContext('2d') : null;
  if (!ctx) return;
  document.body.appendChild(cv); IT.canvas = cv;
  ctx.scale(dpr, dpr);
  var COL = ['#0aba59', '#7dffb4', '#ffd23f', '#0a0a0a', '#ffffff'], parts = [], plan = [0, 350, 800, 1400, 2100], fired = 0, t0 = performance.now(), TOTAL = 4000;
  function burst(){
    var cx = W * (0.2 + Math.random() * 0.6), cy = H * (0.18 + Math.random() * 0.3);
    for (var i = 0; i < 70; i++) {
      var a = Math.random() * Math.PI * 2, sp = 2 + Math.random() * 6;
      parts.push({ x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 2, c: COL[i % COL.length], s: 4 + Math.random() * 5, r: Math.random() * 6 });
    }
  }
  function stop(){ itStopSalute(); }
  cv.addEventListener('click', stop);
  cv.addEventListener('touchstart', function(e){ e.preventDefault(); stop(); }, { passive: false });
  IT.timer = setTimeout(stop, TOTAL);
  sound.play('win'); buzz(30);
  function frame(now){
    var t = now - t0;
    while (fired < plan.length && t >= plan[fired]) { burst(); fired++; }
    ctx.clearRect(0, 0, W, H);
    var fade = t > TOTAL - 700 ? Math.max(0, (TOTAL - t) / 700) : 1;
    ctx.globalAlpha = fade;
    for (var i = 0; i < parts.length; i++) {
      var q = parts[i];
      q.vy += 0.12; q.vx *= 0.99; q.x += q.vx; q.y += q.vy; q.r += 0.2;
      ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.r); ctx.fillStyle = q.c;
      ctx.fillRect(-q.s / 2, -q.s / 4, q.s, q.s / 2); ctx.restore();
    }
    if (parts.length > 700) parts.splice(0, parts.length - 700);
    if (t < TOTAL) IT.raf = requestAnimationFrame(frame);
  }
  IT.raf = requestAnimationFrame(frame);
}

/* ---- главная ---- */
function renderItogi(){ itDraw(true); }
function itDraw(enter){
  var box = $('s-itogi'); if (!box) return;
  box.textContent = '';
  var ws = itWeeks();
  if (!RATE || !ws.length) {
    if (enter) itStopSalute();
    var p = el('p', 'note it-empty', 'Итогов пока нет: первая неделя ещё идёт.'); p.id = 'itEmpty'; box.appendChild(p);
    return;
  }
  if (!IT.week || !itWeekById(IT.week)) IT.week = itDefaultWeek(ws);
  var w = itWeekById(IT.week);
  var h = el('h2'); h.appendChild(document.createTextNode('Итоги ')); h.appendChild(el('span', 'g', 'недели')); box.appendChild(h);
  box.appendChild(itPicker(ws));
  box.appendChild(el('p', 'it-range', 'Неделя ' + itRange(w) + '.'));
  var salute = false;
  if (w.status === 'idet') itRunning(box, w);
  else if (w.status === 'bez_dannyh') itEmptyWeek(box);
  else {
    var names = w.pobediteli || [], cond = !!w.uslovnyj;
    if (names.length && !w.bez_pobeditelya) {
      box.appendChild(itWinPlaque(w, cond));
      salute = !cond;
    } else {
      var nw = el('div', 'it-run it-none'); nw.id = 'itNoWin';
      nw.appendChild(el('div', 'it-run-h', 'Победителя на этой неделе нет: очков никто не набрал'));
      box.appendChild(nw);
    }
    var pod = itPodium(w); if (pod) box.appendChild(pod);
    var tb = itTable(w); if (tb) box.appendChild(tb);
    (w.turi || []).forEach(function(id){
      var p = getPartiya(id);
      if (p) itTour(box, p, w);
    });
  }
  if (enter && salute && !IT.saluted[w.id] && !reducedMotion()) { IT.saluted[w.id] = true; itSalute(); }
}

on('data:ready', function(){ if (typeof CUR_TAB !== 'undefined' && CUR_TAB === 'itogi') itDraw(false); });
on('me:changed', function(){ if (typeof CUR_TAB !== 'undefined' && CUR_TAB === 'itogi') itDraw(false); });
on('tab:changed', function(e){ if (e && e.tab !== 'itogi') itStopSalute(); });

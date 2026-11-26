/* igra-duel.js: игра «Дуэль». Два баннера рядом (на телефоне в портрете один над другим), выбираешь лучший.
   Победитель остаётся, проигравший уходит, на его место встаёт следующий из колоды (король горы).
   Логика счёта в duel-engine.js (DE). Выбор: тап по баннеру, свайп в сторону баннера, клавиши ←/→ (↑/↓). */
'use strict';
var DU_OUT_MS = 190, DU_TRESH = 70;
var DUN = { box: null, busy: false, suppress: false };

function duelKey(p){ return kp() + 'duel_' + p.id + '_' + STATE.me; }
function duelSave(){
  var d = IG.du; if (!d || !STATE.me || d.me !== STATE.me) return;
  ls(duelKey(d.p), JSON.stringify({ st: d.st, color: d.color }));
}
function duelDrop(p){ if (p && STATE.me) ls(duelKey(p), null); if (IG.du && IG.du.p === p) IG.du = null; }
function duelNew(p){
  return { p: p, me: STATE.me, st: DE.newState(p.bannery.map(function(b){ return b.id; })), color: 'w' };
}
function duelLoad(p){
  if (!p || !STATE.me) return null;
  var o = null; try { o = JSON.parse(ls(duelKey(p)) || 'null'); } catch (e) { o = null; }
  var s = o && o.st, ids = p.bannery.map(function(b){ return b.id; });
  if (!s || !Array.isArray(s.order) || !Array.isArray(s.slots) || s.order.length !== ids.length || s.order.some(function(id){ return ids.indexOf(id) < 0; })) return null;
  if (!s.elo || !s.w || !s.l || !Array.isArray(s.hist)) return null;
  return { p: p, me: STATE.me, st: s, color: o.color === 'g' ? 'g' : 'w' };
}
/* Текущая игра этого тура и этого игрока: из памяти или из localStorage. */
function duelCur(p){
  if (IG.du && IG.du.p === p && IG.du.me === STATE.me) return IG.du;
  IG.du = duelLoad(p); return IG.du;
}
function duelIsStacked(){
  try { return !window.matchMedia('(min-aspect-ratio: 1/1)').matches; } catch (e) { return false; }
}

function duelOpen(){
  var d = IG.du; if (!d) return;
  if (DUN.box) DUN.box.remove();
  var box = el('div', 'sv du'); box.id = 'duBox'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', 'Игра: дуэль двух баннеров');
  document.body.appendChild(box); document.body.classList.add('sv-open');
  DUN.box = box; DUN.busy = false; duelDraw(); duelPreload(d);
}
/* Картинки всей колоды грузим заранее, чтобы следующий баннер вставал на место сразу, без пустого окна. */
function duelPreload(d){
  DUN.pre = DUN.pre || {};
  d.st.order.forEach(function(id){
    var c = igraColors(igraCard(id)); c.forEach(function(col){ var v = duelVid(igraCard(id), col).v; if (v && v.src && !DUN.pre[v.src]) { var im = new Image(); im.src = v.src; DUN.pre[v.src] = im; } });
  });
}
function duelClose(){
  if (DUN.box) { DUN.box.remove(); DUN.box = null; }
  document.body.classList.remove('sv-open');
  igraDrawBody();
}
function duelHead(d){
  var st = d.st, pr = DE.progress(st), head = el('div', 'sv-top');
  var box = el('div', 'sv-prog');
  var txt = st.done ? 'Дуэли сыграны' : (pr.phase === 'main' ? 'Дуэль ' + pr.n + ' из ' + pr.m : 'Уточнение: дуэль ' + pr.n + ' из ' + pr.m);
  var t = el('div', 'sv-count', txt); t.id = 'duCount'; t.setAttribute('aria-live', 'polite');
  var line = el('div', 'sv-line'), fill = el('div', 'sv-fill');
  fill.style.width = (st.done ? 100 : Math.round((pr.n - 1) / Math.max(1, pr.m) * 100)) + '%'; line.appendChild(fill);
  box.appendChild(t); box.appendChild(line); head.appendChild(box);
  var cs = igraColors(igraCard(st.order[0]));
  if (cs.length > 1 && !st.done) {
    var seg = el('div', 'seg'); seg.setAttribute('role', 'group'); seg.setAttribute('aria-label', 'Версия баннеров');
    cs.forEach(function(c){
      var sb = el('button', 'seg-b', c === 'g' ? 'Зелёные' : 'Светлые'); sb.type = 'button'; sb.setAttribute('aria-pressed', d.color === c ? 'true' : 'false'); sb.setAttribute('data-color', c);
      sb.addEventListener('click', function(){ if (DUN.busy) return; d.color = c; duelSave(); duelDraw(); });
      seg.appendChild(sb);
    });
    head.appendChild(seg);
  }
  var x = el('button', 'sv-x', 'Выйти'); x.type = 'button'; x.id = 'duExit'; x.addEventListener('click', duelClose); head.appendChild(x);
  return head;
}
/* Картинка дуэли: горизонтальный формат нужной версии, иначе первый доступный. Без искажений: только max-width/max-height. */
function duelVid(b, color){
  var c = igraColors(b).indexOf(color) >= 0 ? color : 'w', v = igraVid(b, c);
  var h = v.filter(function(x){ return x.f === 'h'; });
  return { v: h.length ? h[0] : v[0], c: c };
}
function duelSide(d, i, cls){
  var st = d.st, id = st.slots[i], b = igraCard(id), vc = duelVid(b, d.color), v = vc.v;
  var s = el('div', 'du-side' + (cls ? ' ' + cls : '')); s.setAttribute('data-side', i === 0 ? 'left' : 'right'); s.setAttribute('data-card', id);
  var cap = el('div', 'du-cap'); cap.appendChild(el('span', 'du-name', b.podpis));
  var sc = el('span', 'du-score', 'Побед ' + st.w[id] + ', поражений ' + st.l[id]);
  cap.appendChild(sc); s.appendChild(cap);
  var pick = el('button', 'du-pick'); pick.type = 'button'; pick.setAttribute('data-pick', i);
  pick.setAttribute('aria-label', 'Выбрать этот баннер: ' + b.podpis + (i === 0 ? ', первый' : ', второй'));
  var im = el('img'); im.src = v.src; im.alt = b.podpis; im.decoding = 'async'; im.draggable = false;
  if (v.w) { im.width = v.w; im.height = v.h; }
  pick.appendChild(im); pick.addEventListener('click', function(){ duelVote(i); });
  s.appendChild(pick);
  var row = el('div', 'du-btns');
  var ok = el('button', 'du-ok'); ok.type = 'button'; ok.setAttribute('data-ok', i);
  ok.appendChild(el('span', 'du-ok-l', 'Лучше этот')); ok.addEventListener('click', function(){ duelVote(i); });
  var zm = el('button', 'du-zoom', 'Крупно'); zm.type = 'button';
  zm.setAttribute('aria-label', 'Открыть крупно: ' + b.podpis);
  zm.addEventListener('click', function(e){ e.stopPropagation(); igraZoom(b, vc.c, v.f); });
  row.appendChild(ok); row.appendChild(zm); s.appendChild(row);
  return s;
}
function duelDraw(){
  var d = IG.du, box = DUN.box; if (!d || !box) return;
  box.textContent = '';
  box.appendChild(duelHead(d));
  if (d.st.done) { box.appendChild(duelEnd(d)); return; }
  var stage = el('div', 'du-stage'); stage.id = 'duStage';
  stage.appendChild(duelSide(d, 0)); 
  var vs = el('div', 'du-vs'); vs.appendChild(el('span', '', 'или')); stage.appendChild(vs);
  stage.appendChild(duelSide(d, 1));
  box.appendChild(stage);
  var foot = el('div', 'du-foot');
  var un = el('button', 'btn btn-line du-undo', 'Отменить последний выбор'); un.type = 'button'; un.id = 'duUndo'; un.disabled = !d.st.hist.length; un.addEventListener('click', duelUndo);
  foot.appendChild(un);
  var tip = el('p', 'du-tip'); tip.id = 'duTip';
  tip.appendChild(el('span', 'du-tip-row', 'Нажмите на баннер, который лучше. Можно свайпом в его сторону или клавишами ← и →.'));
  tip.appendChild(el('span', 'du-tip-col', 'Нажмите на баннер, который лучше. Можно свайпом вверх или вниз, к нужному баннеру.'));
  foot.appendChild(tip); box.appendChild(foot);
  duelDragInit(stage);
  var pk = stage.querySelector('.du-pick'); if (pk) try { pk.focus({ preventScroll: true }); } catch (e) {}
}
/* side: 0 = первый (слева или сверху), 1 = второй (справа или снизу). Проигравший уходит, на его место встаёт следующий. */
function duelVote(side){
  var d = IG.du; if (!d || DUN.busy || d.st.done || !DUN.box) return;
  var stage = $('duStage'); if (!stage) return;
  DUN.busy = true; sound.play('pick'); buzz(20);
  var sides = stage.querySelectorAll('.du-side'), win = sides[side], lose = sides[1 - side];
  DE.vote(d.st, side); duelSave();
  function after(){
    DUN.busy = false;
    if (!DUN.box) return;
    if (d.st.done) { sound.play('win'); buzz(60); duelDraw(); return; }
    /* победитель остаётся на месте, на место проигравшего встаёт следующий */
    var head = DUN.box.querySelector('.sv-top'); if (head) head.replaceWith(duelHead(d));
    var fresh = duelSide(d, 1 - side, 'enter');
    lose.replaceWith(fresh);
    var wn = d.st.slots[side], ws = win.querySelector('.du-score'); if (ws) ws.textContent = 'Побед ' + d.st.w[wn] + ', поражений ' + d.st.l[wn];
    win.classList.remove('win'); win.classList.remove('lean');
    var un = $('duUndo'); if (un) un.disabled = !d.st.hist.length;
    stage.classList.remove('lean-0', 'lean-1'); stage.style.removeProperty('--dx');
    var pk = fresh.querySelector('.du-pick'); if (pk) try { pk.focus({ preventScroll: true }); } catch (e) {}
  }
  if (!reducedMotion()) { win.classList.add('win'); lose.classList.add('out'); setTimeout(after, DU_OUT_MS); } else after();
}
function duelUndo(){
  var d = IG.du; if (!d || DUN.busy || !d.st.hist.length) return;
  DE.undo(d.st); duelSave(); sound.play('tap'); duelDraw();
}
function duelDragInit(stage){
  var s = null;
  function lean(side){
    stage.classList.toggle('lean-0', side === 0); stage.classList.toggle('lean-1', side === 1);
  }
  stage.addEventListener('pointerdown', function(e){
    if (DUN.busy || (e.target.closest && e.target.closest('.du-btns'))) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    s = { x: e.clientX, y: e.clientY, id: e.pointerId, d: 0, moved: false, col: duelIsStacked() };
  });
  stage.addEventListener('pointermove', function(e){
    if (!s || e.pointerId !== s.id) return;
    var dx = e.clientX - s.x, dy = e.clientY - s.y, d = s.col ? dy : dx, o = s.col ? dx : dy;
    if (!s.moved) { if (Math.abs(d) < 10 || Math.abs(d) < Math.abs(o)) return; s.moved = true; try { stage.setPointerCapture(e.pointerId); } catch (er) {} }
    s.d = d; lean(d < -DU_TRESH / 2 ? 0 : (d > DU_TRESH / 2 ? 1 : -1));
  });
  function end(e){
    if (!s || (e && e.pointerId !== s.id)) return;
    var m = s; s = null; lean(-1);
    if (!m.moved) return;
    DUN.suppress = true; setTimeout(function(){ DUN.suppress = false; }, 60);
    if (Math.abs(m.d) >= DU_TRESH) duelVote(m.d < 0 ? 0 : 1);
  }
  stage.addEventListener('pointerup', end); stage.addEventListener('pointercancel', end);
  /* клик после перетаскивания не считается выбором */
  stage.addEventListener('click', function(e){ if (DUN.suppress) { e.stopPropagation(); e.preventDefault(); } }, true);
}
function duelEnd(d){
  var st = d.st, rk = DE.ranking(st), lead = igraCard(rk[0]), w = el('div', 'sv-end du-end');
  w.appendChild(el('h2', 'sv-end-h', st.phase === 'main' ? 'Все дуэли сыграны' : 'Уточнение закончено'));
  w.appendChild(el('p', 'sv-end-p', 'Лидер сейчас: ' + lead.podpis + '.'));
  var nx = DE.refineCount(st);
  w.appendChild(el('p', 'sv-end-p', 'Из дуэлей собраны ' + IG.lim + ' лучших и ' + IG.lim + ' худших. Их можно поправить вручную перед ставкой.'));
  var row = el('div', 'sv-end-btns');
  var go = el('button', 'btn', 'Смотреть итог'); go.type = 'button'; go.id = 'duToFinal'; go.addEventListener('click', duelFinish);
  row.appendChild(go);
  if (nx) {
    var rf = el('button', 'btn btn-line', 'Уточнить: ещё ' + nx + ' ' + plural(nx, 'дуэль', 'дуэли', 'дуэлей')); rf.type = 'button'; rf.id = 'duRefine';
    rf.addEventListener('click', function(){ DE.startRefine(st); duelSave(); DUN.busy = false; duelDraw(); });
    row.appendChild(rf);
  }
  var un = el('button', 'btn btn-line', 'Отменить последний выбор'); un.type = 'button'; un.id = 'duBackLast'; un.addEventListener('click', duelUndo); row.appendChild(un);
  w.appendChild(row);
  w.appendChild(el('p', 'sv-end-note', nx ? 'После одного прохода у многих баннеров по одной дуэли, поэтому середина рейтинга неточная. Уточнение сводит рядом стоящие баннеры.' : ''));
  setTimeout(function(){ var g = $('duToFinal'); if (g) g.focus(); }, 30);
  return w;
}
/* Итог игры → списки лучших и худших (с правкой вручную). Правки не теряем, если игра не менялась. */
function duelFinish(){
  var d = IG.du, p = IG.p; if (!d) return;
  var sig = d.st.hist.length + ':' + d.st.phase + ':' + (d.st.rounds || 0);
  if (!(IG.rank && IG.rank.src === 'igra' && IG.rank.sig === sig)) {
    var rk = DE.ranking(d.st), lim = IG.lim;
    IG.rank = { top: rk.slice(0, lim), bad: rk.slice(Math.max(lim, rk.length - lim)).reverse(), src: 'igra', sig: sig };
    rankSave();
  }
  IG.step = 'final';
  if (DUN.box) { DUN.box.remove(); DUN.box = null; } document.body.classList.remove('sv-open');
  igraDrawBody();
  var b = $('igraBody'); if (b) b.scrollIntoView({ block: 'start', behavior: 'auto' });
}
document.addEventListener('keydown', function(e){
  if (!DUN.box || lbOpen()) return;
  var tg = e.target && e.target.tagName; if (tg === 'INPUT' || tg === 'TEXTAREA') return;
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); duelVote(0); }
  else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); duelVote(1); }
  else if (e.key === 'Backspace') { e.preventDefault(); duelUndo(); }
  else if (e.key === 'Escape') { e.preventDefault(); duelClose(); }
  else if (e.key === 'Tab') {
    var f = Array.prototype.filter.call(DUN.box.querySelectorAll('button:not([disabled])'), function(x){ return x.offsetParent !== null; });
    if (!f.length) return;
    var i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && (i < 0 || i === f.length - 1)) { e.preventDefault(); f[0].focus(); }
  }
});

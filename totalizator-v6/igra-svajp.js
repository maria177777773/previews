/* igra-svajp.js: игра «по одному». Баннер на весь экран, свайп вправо = нравится, влево = не нравится.
   Кнопки 👎 и 👍 для мыши, клавиши ← и →, отмена последнего. В конце из ответов собирается ставка (секции в igra-ruchnoj.js). */
'use strict';
var SV_FLY_MS = 260, SV_TRESH = 90;

function svajpNew(p){
  var order = p.bannery.map(function(b){ return b.id; });
  for (var i = order.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = order[i]; order[i] = order[j]; order[j] = t; }
  return { p: p, me: STATE.me, order: order, i: 0, like: [], nope: [], hist: [], color: 'w', busy: false };
}
/* Ход игры живёт в localStorage: перезагрузка или «Выйти» ничего не стирают. Чистится после принятой ставки или «Сыграть заново». */
function svajpKey(p){ return kp() + 'sv_' + p.id + '_' + STATE.me; }
function svajpSave(){
  var sv = IG.sv; if (!sv || !STATE.me || sv.me !== STATE.me) return;
  ls(svajpKey(sv.p), JSON.stringify({ order: sv.order, i: sv.i, like: sv.like, nope: sv.nope, hist: sv.hist, color: sv.color }));
}
function svajpDrop(p){ if (p && STATE.me) ls(svajpKey(p), null); }
function svajpLoad(p){
  if (!p || !STATE.me) return null;
  var o = null; try { o = JSON.parse(ls(svajpKey(p)) || 'null'); } catch (e) { o = null; }
  if (!o || !Array.isArray(o.order)) return null;
  var ids = p.bannery.map(function(b){ return b.id; });
  if (o.order.length !== ids.length || o.order.some(function(id){ return ids.indexOf(id) < 0; })) return null;
  return { p: p, me: STATE.me, order: o.order, i: Math.max(0, Math.min(o.i | 0, o.order.length)), like: o.like || [], nope: o.nope || [], hist: o.hist || [], color: o.color === 'g' ? 'g' : 'w', busy: false };
}
/* Текущая игра этого тура и этого игрока: из памяти или из localStorage. */
function svajpCur(p){
  if (IG.sv && IG.sv.p === p && IG.sv.me === STATE.me) return IG.sv;
  IG.sv = svajpLoad(p); return IG.sv;
}
var SVN = { box: null, drag: null };

function svajpOpen(){
  var sv = IG.sv; if (!sv) return;
  if (SVN.box) SVN.box.remove();
  var box = el('div', 'sv'); box.id = 'svBox'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', 'Игра: баннеры по одному');
  document.body.appendChild(box); document.body.classList.add('sv-open');
  SVN.box = box; svajpDraw();
}
function svajpClose(){
  if (SVN.box) { SVN.box.remove(); SVN.box = null; }
  document.body.classList.remove('sv-open');
  igraDrawBody();
}
function svajpHead(sv){
  var n = sv.order.length, head = el('div', 'sv-top');
  var pr = el('div', 'sv-prog');
  var t = el('div', 'sv-count', sv.i < n ? 'Баннер ' + (sv.i + 1) + ' из ' + n : 'Готово: ' + n + ' из ' + n); t.id = 'svCount'; t.setAttribute('aria-live', 'polite');
  var line = el('div', 'sv-line'), fill = el('div', 'sv-fill'); fill.style.width = Math.round(sv.i / n * 100) + '%'; line.appendChild(fill);
  pr.appendChild(t); pr.appendChild(line); head.appendChild(pr);
  var sc = el('div', 'sv-score');
  var a = el('span', 'sv-sc down'); a.appendChild(icoSpan('down')); a.appendChild(el('b', '', String(sv.nope.length)));
  var b = el('span', 'sv-sc up'); b.appendChild(icoSpan('up')); b.appendChild(el('b', '', String(sv.like.length)));
  a.setAttribute('aria-label', 'Не понравились: ' + sv.nope.length); b.setAttribute('aria-label', 'Понравились: ' + sv.like.length);
  sc.appendChild(a); sc.appendChild(b); head.appendChild(sc);
  var x = el('button', 'sv-x', 'Выйти'); x.type = 'button'; x.id = 'svExit'; x.addEventListener('click', svajpClose); head.appendChild(x);
  return head;
}
function svajpDraw(){
  var sv = IG.sv, box = SVN.box; if (!sv || !box) return;
  box.textContent = '';
  box.appendChild(svajpHead(sv));
  if (sv.i >= sv.order.length) { box.appendChild(svajpEnd(sv)); return; }
  var b = igraCard(sv.order[sv.i]);
  var stage = el('div', 'sv-stage');
  var card = el('div', 'sv-card'); card.id = 'svCard'; card.setAttribute('data-card', b.id);
  var stL = el('div', 'sv-stamp sv-stamp-no'); stL.appendChild(icoSpan('down')); stL.appendChild(el('span', '', 'Не нравится'));
  var stR = el('div', 'sv-stamp sv-stamp-yes'); stR.appendChild(icoSpan('up')); stR.appendChild(el('span', '', 'Нравится'));
  var ch = el('div', 'sv-card-h'); ch.appendChild(el('h2', 'sv-name', b.podpis));
  var cs = igraColors(b);
  if (cs.length > 1) {
    var seg = el('div', 'seg'); seg.setAttribute('role', 'group'); seg.setAttribute('aria-label', 'Версия баннера');
    cs.forEach(function(c){
      var sb = el('button', 'seg-b', c === 'g' ? 'Зелёная' : 'Светлая'); sb.type = 'button'; sb.setAttribute('aria-pressed', sv.color === c ? 'true' : 'false');
      sb.addEventListener('click', function(e){ e.stopPropagation(); sv.color = c; svajpSave(); svajpDraw(); });
      seg.appendChild(sb);
    });
    ch.appendChild(seg);
  }
  card.appendChild(ch);
  card.appendChild(igraFset(b, cs.indexOf(sv.color) >= 0 ? sv.color : 'w', 'cl', true));
  card.appendChild(el('p', 'sv-tip', 'Нажмите на баннер, чтобы открыть крупно.'));
  card.appendChild(stL); card.appendChild(stR);
  stage.appendChild(card); box.appendChild(stage);
  var foot = el('div', 'sv-foot');
  var no = el('button', 'sv-btn sv-no'); no.type = 'button'; no.id = 'svNo'; no.appendChild(icoSpan('down')); no.appendChild(el('span', '', 'Не нравится'));
  var un = el('button', 'sv-btn sv-undo'); un.type = 'button'; un.id = 'svUndo'; un.appendChild(el('span', 'sv-undo-i', '↶')); un.appendChild(el('span', '', 'Назад')); un.disabled = !sv.hist.length;
  var yes = el('button', 'sv-btn sv-yes'); yes.type = 'button'; yes.id = 'svYes'; yes.appendChild(icoSpan('up')); yes.appendChild(el('span', '', 'Нравится'));
  no.addEventListener('click', function(){ svajpVote(false); });
  yes.addEventListener('click', function(){ svajpVote(true); });
  un.addEventListener('click', svajpUndo);
  foot.appendChild(no); foot.appendChild(un); foot.appendChild(yes); box.appendChild(foot);
  box.appendChild(el('p', 'sv-keys', 'Можно свайпом или клавишами ← и →.'));
  svajpDragInit(card);
  try { yes.focus({ preventScroll: true }); } catch (e) {}
}
function svajpVote(like){
  var sv = IG.sv; if (!sv || sv.busy || sv.i >= sv.order.length) return;
  var id = sv.order[sv.i], card = $('svCard');
  sv.busy = true; sound.play(like ? 'pick' : 'tap'); buzz(like ? 20 : 12);
  function go(){
    sv.hist.push({ id: id, like: like }); (like ? sv.like : sv.nope).push(id); sv.i++; sv.busy = false; svajpSave();
    if (sv.i >= sv.order.length) { sound.play('win'); buzz(60); }
    svajpDraw();
  }
  if (card && !reducedMotion()) {
    card.style.transition = 'transform ' + SV_FLY_MS + 'ms ease-in, opacity ' + SV_FLY_MS + 'ms ease-in';
    card.style.transform = 'translateX(' + (like ? 1 : -1) * (window.innerWidth) + 'px) rotate(' + (like ? 18 : -18) + 'deg)';
    card.style.opacity = '0';
    card.classList.add(like ? 'yes' : 'no');
    setTimeout(go, SV_FLY_MS);
  } else go();
}
function svajpUndo(){
  var sv = IG.sv; if (!sv || sv.busy || !sv.hist.length) return;
  var h = sv.hist.pop(), arr = h.like ? sv.like : sv.nope;
  arr.splice(arr.indexOf(h.id), 1); sv.i--; svajpSave(); sound.play('tap'); svajpDraw();
}
function svajpDragInit(card){
  var st = null;
  card.addEventListener('pointerdown', function(e){
    if (IG.sv.busy || (e.target.closest && e.target.closest('.seg'))) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    st = { x: e.clientX, y: e.clientY, id: e.pointerId, dx: 0, moved: false, t: e.target };
  });
  card.addEventListener('pointermove', function(e){
    if (!st || e.pointerId !== st.id) return;
    var dx = e.clientX - st.x, dy = e.clientY - st.y;
    if (!st.moved) { if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy)) return; st.moved = true; try { card.setPointerCapture(e.pointerId); } catch (er) {} card.classList.add('drag'); }
    st.dx = dx; card.style.transform = 'translateX(' + dx + 'px) rotate(' + (dx / 22) + 'deg)';
    var k = Math.min(1, Math.abs(dx) / SV_TRESH);
    card.style.setProperty('--yes', dx > 0 ? k : 0); card.style.setProperty('--no', dx < 0 ? k : 0);
  });
  function end(e){
    if (!st || (e && e.pointerId !== st.id)) return;
    var s = st; st = null; card.classList.remove('drag');
    if (!s.moved) return;
    if (Math.abs(s.dx) >= SV_TRESH) { svajpVote(s.dx > 0); return; }
    card.style.transition = 'transform .2s ease'; card.style.transform = ''; card.style.setProperty('--yes', 0); card.style.setProperty('--no', 0);
    setTimeout(function(){ card.style.transition = ''; }, 220);
  }
  card.addEventListener('pointerup', end); card.addEventListener('pointercancel', end);
  /* клик после перетаскивания не открывает лайтбокс */
  card.addEventListener('click', function(e){ if (card.style.transform && card.style.transform !== 'none' && card.style.transform !== '') { e.stopPropagation(); e.preventDefault(); } }, true);
}
function svajpEnd(sv){
  var p = IG.p, w = el('div', 'sv-end');
  var ei = icoSpan('cards'); ei.className = 'ico-w sv-end-ico'; w.appendChild(ei);
  w.appendChild(el('h2', 'sv-end-h', 'Все ' + sv.order.length + ' ' + plural(sv.order.length, 'баннер', 'баннера', 'баннеров') + ' просмотрены'));
  w.appendChild(el('p', 'sv-end-p', 'Понравились: ' + sv.like.length + '. Не понравились: ' + sv.nope.length + '.'));
  w.appendChild(el('p', 'sv-end-p', 'Теперь соберём ставку: ' + p.k + ' ' + plural(p.k, 'лучший', 'лучших', 'лучших') + ' и ' + p.h + ' ' + plural(p.h, 'худший', 'худших', 'худших') + '.'));
  var row = el('div', 'sv-end-btns');
  var un = el('button', 'btn btn-line', 'Вернуться к последнему'); un.type = 'button'; un.id = 'svBackLast'; un.addEventListener('click', svajpUndo);
  var go = el('button', 'btn', 'Собрать ставку'); go.type = 'button'; go.id = 'svToBet'; go.addEventListener('click', svajpFinish);
  row.appendChild(un); row.appendChild(go); w.appendChild(row);
  setTimeout(function(){ var g = $('svToBet'); if (g) g.focus(); }, 30);
  return w;
}
/* Ответы → черновик ставки и секции итогового экрана.
   Понравилось не больше k: все в лучших. Больше k: игрок сам отмечает k лучших среди понравившихся. С худшими так же. */
function svajpPlan(sv, p){
  var d = igraNewDraft('igra'), like = sv.like.slice(), nope = sv.nope.slice(), secs = [];
  if (like.length <= p.k) d.top = like.slice();
  var poolH = nope.filter(function(x){ return d.top.indexOf(x) < 0; });
  if (poolH.length <= p.h) d.hudshie = poolH.slice();
  d.lider = d.top[0] || null;
  var noteT = like.length > p.k ? 'Понравились ' + like.length + '. Отметьте «Лучшая» у ' + p.k + ' самых сильных.'
    : (like.length < p.k ? 'Понравились ' + like.length + ', а лучших нужно ' + p.k + '. Добавьте ещё ' + (p.k - like.length) + ' из второго списка.' : 'Все понравившиеся уже в лучших. Можно поменять.');
  var noteH = nope.length > p.h ? 'Не понравились ' + nope.length + '. Отметьте «Худшая» у ' + p.h + ' самых слабых.'
    : (nope.length < p.h ? 'Не понравились ' + nope.length + ', а худших нужно ' + p.h + '. Добавьте ещё ' + (p.h - nope.length) + ' из первого списка.' : 'Все непонравившиеся уже в худших. Можно поменять.');
  secs.push({ title: 'Понравились (' + like.length + ')', note: noteT, ids: like });
  secs.push({ title: 'Не понравились (' + nope.length + ')', note: noteH, ids: nope });
  return { d: d, secs: secs };
}
function svajpFinish(){
  var sv = IG.sv, p = IG.p; if (!sv) return;
  var plan = svajpPlan(sv, p);
  if (!(igraDraftHas(STATE.draft) && STATE.draft.rezhim === 'igra')) { STATE.draft = plan.d; STATE.rezhim = 'igra'; igraSaveDraft(); }
  IG.fin = plan.secs; IG.step = 'final';
  if (SVN.box) { SVN.box.remove(); SVN.box = null; } document.body.classList.remove('sv-open');
  igraDrawBody();
  var b = $('igraBody'); if (b) b.scrollIntoView({ block: 'start', behavior: 'auto' });
}
document.addEventListener('keydown', function(e){
  if (!SVN.box || lbOpen()) return;
  var tg = e.target && e.target.tagName; if (tg === 'INPUT' || tg === 'TEXTAREA') return;
  if (e.key === 'ArrowLeft') { e.preventDefault(); svajpVote(false); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); svajpVote(true); }
  else if (e.key === 'Backspace') { e.preventDefault(); svajpUndo(); }
  else if (e.key === 'Escape') { e.preventDefault(); svajpClose(); }
  else if (e.key === 'Tab') {
    var f = Array.prototype.filter.call(SVN.box.querySelectorAll('button:not([disabled])'), function(x){ return x.offsetParent !== null; });
    if (!f.length) return;
    var i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && (i < 0 || i === f.length - 1)) { e.preventDefault(); f[0].focus(); }
  }
});

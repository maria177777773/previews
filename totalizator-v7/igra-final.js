/* igra-final.js: итог игры и расстановка вручную. Лидер, «10 лучших» и «10 худших» с миниатюрами; правка вручную
   (выше, ниже, убрать, добавить, перетаскивание), потом «Сделать ставку». В ставку идут первые k лучших и первые h худших:
   их отделяет видимая черта. Списки хранятся в IG.rank = { top: [id...], bad: [id...], src: 'igra'|'ruchnoj', sig }. */
'use strict';
var FN = { msg: '', focus: null, drag: null };

function rankKey(p){ return kp() + 'rank_' + p.id + '_' + STATE.me; }
function rankSave(){
  var r = IG.rank, p = IG.p; if (!r || !p || !STATE.me) return;
  if (r.top.length || r.bad.length) { ls(rankKey(p), JSON.stringify(r)); unsavedGuard.set(true); }
  else { ls(rankKey(p), null); unsavedGuard.set(igraDraftHas(STATE.draft)); }
}
function rankDrop(p){ p = p || IG.p; if (p && STATE.me) ls(rankKey(p), null); IG.rank = null; }
function rankLoad(p){
  if (!p || !STATE.me) return null;
  var o = null; try { o = JSON.parse(ls(rankKey(p)) || 'null'); } catch (e) { o = null; }
  if (!o || !Array.isArray(o.top) || !Array.isArray(o.bad)) return null;
  var ids = {}, seen = {}; p.bannery.forEach(function(b){ ids[b.id] = 1; });
  function clean(a){ return a.filter(function(x){ if (!ids[x] || seen[x]) return false; seen[x] = 1; return true; }).slice(0, IG.lim); }
  var top = clean(o.top), bad = clean(o.bad);
  return (top.length || bad.length) ? { top: top, bad: bad, src: o.src === 'igra' ? 'igra' : 'ruchnoj', sig: o.sig || '' } : null;
}
function rankHas(r){ return !!r && (r.top.length > 0 || r.bad.length > 0); }
function rankGroup(g){ return g === 'top' ? IG.rank.top : IG.rank.bad; }
function rankName(g){ return g === 'top' ? 'Лучшие' : 'Худшие'; }
function rankMsg(t){ FN.msg = t || ''; var m = $('finMsg'); if (m) m.textContent = FN.msg; }
function rankFind(id){ return IG.rank.top.indexOf(id) >= 0 ? 'top' : (IG.rank.bad.indexOf(id) >= 0 ? 'bad' : null); }
/* Поставить баннер в группу на позицию pos (по умолчанию в конец). Из другой группы переносит. false: группа полна. */
function rankPut(id, group, pos){
  var r = IG.rank, from = rankFind(id), dst = rankGroup(group);
  if (from === group) {
    var a = dst, i = a.indexOf(id); a.splice(i, 1);
    a.splice(pos == null ? a.length : Math.max(0, Math.min(pos, a.length)), 0, id);
  } else {
    if (dst.length >= IG.lim) { rankMsg(rankName(group) + ' уже заполнены: ' + IG.lim + ' из ' + IG.lim + '. Уберите один баннер или поменяйте местами.'); sound.play('err'); buzz(40); return false; }
    if (from) rankGroup(from).splice(rankGroup(from).indexOf(id), 1);
    dst.splice(pos == null ? dst.length : Math.max(0, Math.min(pos, dst.length)), 0, id);
  }
  rankMsg(''); rankSave(); return true;
}
function rankRemove(id){
  var g = rankFind(id); if (!g) return;
  rankGroup(g).splice(rankGroup(g).indexOf(id), 1); rankMsg(''); rankSave();
}
function rankStep(id, d){
  var g = rankFind(id); if (!g) return;
  var a = rankGroup(g), i = a.indexOf(id), j = i + d;
  if (j < 0 || j >= a.length) return;
  a.splice(i, 1); a.splice(j, 0, id); rankMsg(''); rankSave();
}
function finalRedraw(focus){
  var y = window.pageYOffset; FN.focus = focus || null;
  igraDrawBody(); window.scrollTo(0, y);
}
/* Миниатюра: горизонтальный формат светлой версии. */
function finalThumb(b){ var v = duelVid(b, 'w').v; return v; }
function finalStats(id){
  var du = IG.rank && IG.rank.src === 'igra' ? duelCur(IG.p) : null;
  if (!du || du.st.w[id] == null) return '';
  return 'Побед ' + du.st.w[id] + ', поражений ' + du.st.l[id];
}
function finalItem(id, group, i){
  var b = igraCard(id), p = IG.p, lim = group === 'top' ? p.k : p.h, inBet = i < lim;
  var li = el('li', 'fi' + (inBet ? '' : ' fi-out')); li.setAttribute('data-id', id); li.setAttribute('data-group', group);
  var grab = el('div', 'fi-grab', String(i + 1)); grab.setAttribute('aria-hidden', 'true'); grab.title = 'Потяните, чтобы переставить';
  grab.addEventListener('pointerdown', function(e){ finalDragStart(e, li, id, group); });
  li.appendChild(grab);
  var v = finalThumb(b), th = el('button', 'fi-th'); th.type = 'button'; th.setAttribute('aria-label', 'Открыть крупно: ' + b.podpis);
  var im = el('img'); im.src = v.src; im.alt = b.podpis; im.draggable = false; if (v.w) { im.width = v.w; im.height = v.h; }
  th.appendChild(im); th.addEventListener('click', function(){ igraZoom(b, 'w', v.f); }); li.appendChild(th);
  var tx = el('div', 'fi-tx');
  var nm = el('div', 'fi-nm'); nm.appendChild(el('b', '', b.podpis));
  if (group === 'top' && i === 0) nm.appendChild(el('span', 'fi-tag', 'Лидер'));
  tx.appendChild(nm);
  var st = finalStats(id), meta = [];
  if (st) meta.push(st);
  meta.push(inBet ? 'Идёт в ставку' : 'Запас, в ставку не идёт');
  tx.appendChild(el('div', 'fi-meta', meta.join('. ')));
  var row = el('div', 'fi-btns');
  function bt(txt, act, fn, dis){ var x = el('button', 'fi-b', txt); x.type = 'button'; x.setAttribute('data-act', act); x.disabled = !!dis; x.setAttribute('aria-label', txt + ': ' + b.podpis); x.addEventListener('click', function(){ fn(); }); row.appendChild(x); return x; }
  var n = rankGroup(group).length;
  bt('Выше', 'up', function(){ rankStep(id, -1); sound.play('tap'); finalRedraw({ id: id, act: 'up' }); }, i === 0);
  bt('Ниже', 'down', function(){ rankStep(id, 1); sound.play('tap'); finalRedraw({ id: id, act: 'down' }); }, i === n - 1);
  bt(group === 'top' ? 'В худшие' : 'В лучшие', 'swap', function(){ var to = group === 'top' ? 'bad' : 'top'; if (rankPut(id, to)) sound.play('pick'); finalRedraw(); });
  bt('Убрать', 'del', function(){ rankRemove(id); sound.play('tap'); finalRedraw(); });
  tx.appendChild(row); li.appendChild(tx);
  return li;
}
function finalList(group){
  var p = IG.p, ids = rankGroup(group), lim = group === 'top' ? p.k : p.h;
  var box = el('section', 'fl fl-' + group); box.setAttribute('data-group', group);
  var h = el('h3', 'fl-h'); h.appendChild(document.createTextNode(group === 'top' ? 'Лучшие' : 'Худшие')); var c = el('span', 'fl-c', ids.length + '/' + IG.lim); c.setAttribute('data-cnt', group); h.appendChild(c); box.appendChild(h);
  box.appendChild(el('p', 'fl-note', group === 'top' ? 'Первый в списке: лидер и фаворит ставки. Выше черты: ' + lim + '.' : 'Первый в списке: самый слабый. Выше черты: ' + lim + '.'));
  var ol = el('ol', 'flist'); ol.setAttribute('data-group', group);
  ids.forEach(function(id, i){
    if (i === lim) { var cut = el('li', 'fi-cut', 'Черта: ниже баннеры в ставку не идут'); cut.setAttribute('aria-hidden', 'true'); ol.appendChild(cut); }
    ol.appendChild(finalItem(id, group, i));
  });
  if (!ids.length) { var em = el('li', 'fi-empty', 'Пока пусто. Добавьте баннеры из списка ниже.'); ol.appendChild(em); }
  box.appendChild(ol); return box;
}
function finalPool(){
  var r = IG.rank, p = IG.p, pool = p.bannery.filter(function(b){ return r.top.indexOf(b.id) < 0 && r.bad.indexOf(b.id) < 0; });
  var box = el('section', 'fpool'); box.id = 'finPool';
  box.appendChild(el('h3', 'fl-h', 'Остальные баннеры (' + pool.length + ')'));
  box.appendChild(el('p', 'fl-note', 'Нажмите «В лучшие» или «В худшие», чтобы добавить баннер в список. Чтобы убрать баннер из списка, перетащите его сюда.'));
  var g = el('div', 'fpool-g');
  pool.forEach(function(b){
    var v = finalThumb(b), c = el('div', 'fp'); c.setAttribute('data-id', b.id);
    var th = el('button', 'fi-th'); th.type = 'button'; th.setAttribute('aria-label', 'Открыть крупно: ' + b.podpis);
    var im = el('img'); im.src = v.src; im.alt = b.podpis; im.draggable = false; if (v.w) { im.width = v.w; im.height = v.h; }
    th.appendChild(im); th.addEventListener('click', function(){ igraZoom(b, 'w', v.f); }); c.appendChild(th);
    c.appendChild(el('div', 'fp-nm', b.podpis));
    var row = el('div', 'fi-btns');
    [['В лучшие', 'top'], ['В худшие', 'bad']].forEach(function(x){
      var bt = el('button', 'fi-b', x[0]); bt.type = 'button'; bt.setAttribute('data-act', 'add-' + x[1]); bt.setAttribute('aria-label', x[0] + ': ' + b.podpis);
      bt.addEventListener('click', function(){ if (rankPut(b.id, x[1])) sound.play('pick'); finalRedraw(); });
      row.appendChild(bt);
    });
    c.appendChild(row); g.appendChild(c);
  });
  if (!pool.length) g.appendChild(el('p', 'muted', 'Все баннеры уже в списках.'));
  box.appendChild(g); return box;
}
function finalBet(){
  var r = IG.rank, p = IG.p; if (!r || r.top.length < p.k || r.bad.length < p.h) return;
  var prev = STATE.draft;
  STATE.draft = { top: r.top.slice(0, p.k), hudshie: r.bad.slice(0, p.h), lider: r.top[0], cvet: prev && (prev.cvet === 'w' || prev.cvet === 'g') ? prev.cvet : null, rezhim: r.src === 'igra' ? 'igra' : 'ruchnoj' };
  STATE.rezhim = STATE.draft.rezhim; igraSaveDraft(); IG.res = null; IG.step = 'proverka'; igraDrawBody();
  var b = $('igraBody'); if (b) b.scrollIntoView({ block: 'start', behavior: 'auto' });
}
function finalRender(body){
  var r = IG.rank, p = IG.p;
  if (!r) { IG.step = 'modes'; igraDrawBody(); return; }
  var st = el('div', 'step fin');
  var h = el('h3'); h.appendChild(el('span', 'n', '3')); h.appendChild(document.createTextNode(r.src === 'igra' ? 'Итог игры' : 'Ваш выбор')); st.appendChild(h);
  if (r.top.length) {
    var b = igraCard(r.top[0]), v = duelVid(b, 'w').v, lead = el('div', 'fin-lead'); lead.id = 'finLead';
    var lb = el('button', 'fin-lead-img'); lb.type = 'button'; lb.setAttribute('aria-label', 'Открыть крупно: ' + b.podpis);
    var im = el('img'); im.src = v.src; im.alt = b.podpis; im.draggable = false; if (v.w) { im.width = v.w; im.height = v.h; }
    lb.appendChild(im); lb.addEventListener('click', function(){ igraZoom(b, 'w', v.f); });
    var lt = el('div', 'fin-lead-t'); lt.appendChild(el('span', 'fin-lead-k', 'Лидер')); lt.appendChild(el('b', 'fin-lead-n', b.podpis));
    var ls2 = finalStats(b.id); if (ls2) lt.appendChild(el('span', 'fin-lead-s', ls2));
    lt.appendChild(el('span', 'fin-lead-s', 'Он же фаворит вашей ставки.'));
    lead.appendChild(lb); lead.appendChild(lt); st.appendChild(lead);
  }
  st.appendChild(el('p', 'lead', 'Ставка принимает ' + p.k + ' ' + plural(p.k, 'лучший', 'лучших', 'лучших') + ' и ' + p.h + ' ' + plural(p.h, 'худший', 'худших', 'худших') + ': это первые в каждом списке, выше черты. Остальные баннеры до ' + IG.lim + ' в списке нужны как запас и как ваш рейтинг. Порядок можно менять кнопками «Выше» и «Ниже» или перетаскиванием за номер.'));
  var bar = el('div', 'bar fin-bar');
  [['top', 'Лучшие'], ['bad', 'Худшие']].forEach(function(x){
    var n = rankGroup(x[0]).length, c = el('span', 'cnt cnt-' + (x[0] === 'top' ? 'up' : 'down') + (n >= IG.lim ? ' full' : '')); c.appendChild(el('span', 'cnt-l', x[1])); var b2 = el('b', '', n + '/' + IG.lim); b2.id = x[0] === 'top' ? 'cntTop' : 'cntHud'; c.appendChild(b2); bar.appendChild(c);
  });
  var ready = r.top.length >= p.k && r.bad.length >= p.h;
  var go = igraBtn('Сделать ставку', 'bar-go' + (ready ? ' ready' : ''), finalBet); go.id = 'finBet'; go.disabled = !ready; bar.appendChild(go);
  st.appendChild(bar);
  var m = el('p', 'sr-live'); m.id = 'finMsg'; m.setAttribute('aria-live', 'polite'); m.textContent = FN.msg; st.appendChild(m);
  if (!ready) st.appendChild(igraNote('', 'Для ставки нужно минимум ' + p.k + ' ' + plural(p.k, 'лучший', 'лучших', 'лучших') + ' и ' + p.h + ' ' + plural(p.h, 'худший', 'худших', 'худших') + '.'));
  var cols = el('div', 'fin-cols'); cols.appendChild(finalList('top')); cols.appendChild(finalList('bad')); st.appendChild(cols);
  st.appendChild(finalPool());
  var br = el('div', 'btn-row');
  var back = igraBtn('Назад к выбору способа', 'btn-line', function(){ IG.step = 'modes'; igraDrawBody(); }); back.id = 'finBack'; br.appendChild(back);
  var tg = igraBtn(r.src === 'igra' ? 'Вернуться к дуэлям' : 'Отметить в общем списке', 'btn-line', function(){
    if (r.src === 'igra' && duelCur(p)) { igraStartMode('duel'); } else { IG.step = 'ruchnoj'; igraDrawBody(); }
  }); tg.id = 'finTo'; br.appendChild(tg);
  var big = igraBtn('Сделать ставку', ready ? '' : '', finalBet); big.id = 'finBet2'; big.disabled = !ready; br.appendChild(big);
  st.appendChild(br);
  body.appendChild(st);
  if (FN.focus) {
    var f = FN.focus; FN.focus = null;
    var node = body.querySelector('.fi[data-id="' + f.id + '"] [data-act="' + f.act + '"]');
    if (node && !node.disabled) try { node.focus({ preventScroll: true }); } catch (e) {}
  }
}

/* ---- перетаскивание за номер (мышь и палец) ---- */
function finalDragStart(e, li, id, group){
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  e.preventDefault();
  var rect = li.getBoundingClientRect();
  FN.drag = { li: li, id: id, group: group, x: e.clientX, y: e.clientY, sy: window.pageYOffset, pid: e.pointerId, moved: false, h: rect.height };
  try { e.target.setPointerCapture(e.pointerId); } catch (er) {}
  document.addEventListener('pointermove', finalDragMove); document.addEventListener('pointerup', finalDragEnd); document.addEventListener('pointercancel', finalDragEnd);
}
function finalDragTarget(x, y, d){
  d = d || FN.drag; d.li.style.pointerEvents = 'none';
  var n = document.elementFromPoint(x, y); d.li.style.pointerEvents = '';
  if (!n || !n.closest) return null;
  var pool = n.closest('#finPool'); if (pool) return { pool: true };
  var row = n.closest('.fi'); if (row && row !== d.li) {
    var r = row.getBoundingClientRect();
    return { id: row.getAttribute('data-id'), group: row.getAttribute('data-group'), after: y > r.top + r.height / 2, row: row };
  }
  var list = n.closest('.fl'); if (list) return { list: list.getAttribute('data-group') };
  return null;
}
function finalDragMove(e){
  var d = FN.drag; if (!d || e.pointerId !== d.pid) return;
  var dy = e.clientY - d.y + (window.pageYOffset - d.sy), dx = e.clientX - d.x;
  if (!d.moved) { if (Math.abs(dy) < 5 && Math.abs(dx) < 5) return; d.moved = true; d.li.classList.add('drag'); document.body.classList.add('fin-dragging'); }
  d.li.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
  if (e.clientY < 70) window.scrollBy(0, -14); else if (e.clientY > window.innerHeight - 70) window.scrollBy(0, 14);
  var t = finalDragTarget(e.clientX, e.clientY);
  document.querySelectorAll('.fi.over,.fi.over-after,.fl.over,#finPool.over').forEach(function(n){ n.classList.remove('over', 'over-after'); });
  if (t) { if (t.row) t.row.classList.add(t.after ? 'over-after' : 'over'); else if (t.list) document.querySelector('.fl[data-group="' + t.list + '"]').classList.add('over'); else if (t.pool) $('finPool').classList.add('over'); }
}
function finalDragEnd(e){
  var d = FN.drag; if (!d || (e && e.pointerId !== d.pid)) return;
  document.removeEventListener('pointermove', finalDragMove); document.removeEventListener('pointerup', finalDragEnd); document.removeEventListener('pointercancel', finalDragEnd);
  FN.drag = null; document.body.classList.remove('fin-dragging');
  if (!d.moved) return;
  var t = (e && e.type === 'pointerup') ? finalDragTarget(e.clientX, e.clientY, d) : null, did = false;
  d.li.classList.remove('drag'); d.li.style.transform = '';
  if (t) {
    if (t.pool) { rankRemove(d.id); did = true; }
    else if (t.row) {
      var a = rankGroup(t.group), pos = a.indexOf(t.id) + (t.after ? 1 : 0);
      if (t.group === d.group) { var cur = a.indexOf(d.id); if (cur < pos) pos--; }
      did = rankPut(d.id, t.group, pos);
    } else if (t.list) did = rankPut(d.id, t.list);
  }
  if (did) sound.play('pick');
  finalRedraw({ id: d.id, act: 'down' });
}

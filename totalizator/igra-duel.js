/* igra-duel.js: режим «Кто лучше». Дуэли, Elo K=32 со старта 1000, добор до 12 пар на границах групп. */
'use strict';
var DUEL_K = 32, DUEL_START = 1000, DUEL_MAX_DOB = 12, DUEL_ANIM_MS = 250;

function duelShuffle(a){
  var r = a.slice();
  for (var i = r.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = r[i]; r[i] = r[j]; r[j] = t; }
  return r;
}
function duelPairKey(x, y){ return x < y ? x + '|' + y : y + '|' + x; }
function duelNew(p){
  var order = duelShuffle(p.bannery.map(function(b){ return b.id; }));
  var du = { order: order, elo: {}, wins: {}, seen: {}, phase: 'first', i: 1, a: order[0], b: order[1], nFirst: order.length - 1, cmp: 0, dob: 0, dobMax: 0, hist: [], busy: false, fresh: 'both' };
  order.forEach(function(id){ du.elo[id] = DUEL_START; du.wins[id] = 0; });
  return du;
}
function duelRank(du){
  var pos = {}; du.order.forEach(function(id, i){ pos[id] = i; });
  return du.order.slice().sort(function(x, y){
    return (du.elo[y] - du.elo[x]) || (du.wins[y] - du.wins[x]) || (pos[x] - pos[y]);
  });
}
function duelBounds(du){
  var n = du.order.length, k = IG.p.k, h = IG.p.h, out = [k];
  if (n - h !== k) out.push(n - h);
  return out;
}
/* Пары через границы групп среди ближайших к границе карточек, которые ещё не сравнивали. */
function duelCandidates(du){
  var rank = duelRank(du), n = rank.length, res = [], seenK = {};
  duelBounds(du).forEach(function(b){
    var lo = Math.max(0, b - 3), hi = Math.min(n - 1, b + 2);
    for (var x = lo; x < b; x++) for (var y = b; y <= hi; y++) {
      var kk = duelPairKey(rank[x], rank[y]);
      if (du.seen[kk] || seenK[kk]) continue;
      seenK[kk] = 1; res.push({ a: rank[x], b: rank[y], d: Math.abs(du.elo[rank[x]] - du.elo[rank[y]]), g: y - x });
    }
  });
  res.sort(function(p, q){ return (p.d - q.d) || (p.g - q.g); });
  return res;
}
function duelSnapshot(du){
  var s = JSON.parse(JSON.stringify(du, function(k, v){ return k === 'hist' ? undefined : v; }));
  s.busy = false; return s;
}
function duelElo(du, w, l){
  var ea = 1 / (1 + Math.pow(10, (du.elo[l] - du.elo[w]) / 400));
  du.elo[w] += DUEL_K * (1 - ea); du.elo[l] -= DUEL_K * (1 - ea); du.wins[w]++;
  du.seen[duelPairKey(w, l)] = 1;
}
function duelNextDob(du){
  if (du.dob >= du.dobMax) return false;
  var c = duelCandidates(du); if (!c.length) return false;
  var q = c[0]; if (du.dob % 2) { du.a = q.b; du.b = q.a; } else { du.a = q.a; du.b = q.b; }
  return true;
}
function duelChoose(side){
  var du = IG.du; if (!du || du.busy) return;
  var w = side === 'a' ? du.a : du.b, l = side === 'a' ? du.b : du.a;
  var snap = duelSnapshot(du);
  du.busy = true; sound.play('pick'); buzz(15);
  var arena = $('duelArena');
  if (arena) {
    var cards = arena.querySelectorAll('.duel-card');
    cards.forEach(function(c){ if (c.getAttribute('data-slot') === side) c.classList.add('win'); else if (du.phase === 'first') c.classList.add('out'); else c.classList.add('out'); });
  }
  setTimeout(function(){
    if (IG.du !== du) return;
    du.hist.push(snap); duelElo(du, w, l); du.busy = false;
    if (du.phase === 'first') {
      du.cmp++;
      if (du.cmp >= du.nFirst) { duelStartDob(du); return; }
      du.i++;
      var next = du.order[du.i];
      if (side === 'a') { du.b = next; du.fresh = 'b'; } else { du.a = next; du.fresh = 'a'; }
    } else {
      du.dob++;
      if (!duelNextDob(du)) { duelFinish(); return; }
      du.fresh = 'both';
    }
    igraDrawBody();
  }, reducedMotion() ? 0 : DUEL_ANIM_MS);
}
function duelStartDob(du){
  du.phase = 'dob'; du.dob = 0;
  du.dobMax = Math.min(DUEL_MAX_DOB, du.order.length, duelCandidates(du).length);
  if (!duelNextDob(du)) { duelFinish(); return; }
  du.fresh = 'both'; igraDrawBody();
}
function duelUndo(){
  var du = IG.du; if (!du || du.busy || !du.hist.length) return;
  var snap = du.hist.pop(), rest = du.hist; snap.hist = rest; snap.fresh = 'both'; snap.busy = false;
  IG.du = snap; sound.play('tap'); igraDrawBody();
}
/* Итог: ровно k лучших и h худших по рейтингу Elo, фаворит первый в рейтинге. */
function duelFinish(){
  var du = IG.du, rank = duelRank(du), k = IG.p.k, h = IG.p.h;
  var d = igraNewDraft('igra');
  d.top = rank.slice(0, k); d.hudshie = rank.slice(rank.length - h); d.lider = d.top[0];
  STATE.draft = d; STATE.rezhim = 'igra'; igraSaveDraft();
  IG.step = 'proverka'; IG.du = null; sound.play('ok'); igraDrawBody();
  var b = $('igraBody'); if (b) b.scrollIntoView({ block: 'start', behavior: 'auto' });
}
function duelCountText(du){
  return du.phase === 'first' ? 'Сравнение ' + (du.cmp + 1) + ' из ' + du.nFirst : 'Уточняем: ' + (du.dob + 1) + ' из ' + du.dobMax;
}
function duelMakeCard(id, slot, fresh){
  var b = igraCard(id), c = el('div', 'duel-card' + (fresh ? ' in' : '')); c.setAttribute('data-slot', slot);
  var pick = el('button', 'duel-pick'); pick.type = 'button'; pick.setAttribute('aria-label', 'Выбрать: ' + b.podpis);
  pick.appendChild(igraImgs(b, 'duel-imgs', false)); pick.appendChild(el('span', 'duel-lab', b.podpis));
  pick.addEventListener('click', function(){ duelChoose(slot); });
  var z = el('button', 'zoom', 'Увеличить'); z.type = 'button'; z.setAttribute('aria-label', 'Увеличить: ' + b.podpis);
  z.addEventListener('click', function(e){ e.stopPropagation(); openLightbox(b.img_big || b.img, b.podpis); });
  c.appendChild(pick); c.appendChild(z); return c;
}
function duelRender(body){
  var du = IG.du; if (!du) return;
  var st = el('div', 'step');
  var head = el('div', 'duel-head');
  var cnt = el('div', 'duel-count', duelCountText(du)); cnt.id = 'duelCount'; cnt.setAttribute('aria-live', 'polite'); head.appendChild(cnt);
  head.appendChild(el('div', 'muted', 'Тапните по баннеру, который принесёт больше кликов.'));
  st.appendChild(head);
  var arena = el('div', 'duel-arena'); arena.id = 'duelArena';
  var f = du.fresh; du.fresh = '';
  arena.appendChild(duelMakeCard(du.a, 'a', f === 'a' || f === 'both'));
  arena.appendChild(duelMakeCard(du.b, 'b', f === 'b' || f === 'both'));
  st.appendChild(arena);
  var foot = el('div', 'btn-row duel-foot');
  var un = igraBtn('Отменить последний выбор', 'btn-line', duelUndo); un.id = 'duelUndo'; un.disabled = !du.hist.length;
  var done = igraBtn('Хватит, показать мой рейтинг', '', function(){ if (!du.busy) duelFinish(); }); done.id = 'duelDone';
  var snd = igraBtn(sound.isOn() ? 'Звук вкл' : 'Звук выкл', 'btn-line', function(){ sound.toggle(); refreshSound(); snd.textContent = sound.isOn() ? 'Звук вкл' : 'Звук выкл'; });
  foot.appendChild(un); foot.appendChild(done); foot.appendChild(snd); st.appendChild(foot);
  body.appendChild(st);
}
document.addEventListener('keydown', function(e){
  if (IG.step !== 'duel' || !IG.du || CUR_TAB !== 'igra') return;
  var tg = e.target && e.target.tagName; if (tg === 'INPUT' || tg === 'TEXTAREA') return;
  if (e.key === 'ArrowLeft') { e.preventDefault(); duelChoose('a'); }
  if (e.key === 'ArrowRight') { e.preventDefault(); duelChoose('b'); }
});

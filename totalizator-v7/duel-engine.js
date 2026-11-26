/* duel-engine.js: чистая логика дуэлей (без DOM). Король горы + Эло.
   Основной проход: баннер-чемпион остаётся, проигравший уходит, на его место встаёт следующий из колоды (n-1 дуэль).
   Уточнение (по желанию): пары соседей по текущему рейтингу, n/2 дуэлей на раунд. */
(function(root){
  'use strict';
  var K = 32, START = 1000;
  function shuffle(a, rnd){
    a = a.slice(); rnd = rnd || Math.random;
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function newState(ids, rnd){
    rnd = rnd || Math.random;
    var order = shuffle(ids, rnd), st = { order: order, ci: 2, slots: [order[0], order[1]], elo: {}, w: {}, l: {}, hist: [], phase: 'main', queue: [], qi: 0, rounds: 0, done: false };
    order.forEach(function(id){ st.elo[id] = START; st.w[id] = 0; st.l[id] = 0; });
    if (rnd() < 0.5) st.slots = [st.slots[1], st.slots[0]];
    if (order.length < 2) st.done = true;
    return st;
  }
  function snap(st){ var a = st.slots[0], b = st.slots[1]; return { slots: st.slots.slice(), ea: st.elo[a], eb: st.elo[b], wa: st.w[a], wb: st.w[b], la: st.l[a], lb: st.l[b], ci: st.ci, qi: st.qi, done: st.done, phase: st.phase, queue: st.queue, rounds: st.rounds }; }
  /* side: 0 = левый (первый), 1 = правый (второй) */
  function vote(st, side, rnd){
    if (st.done) return st;
    rnd = rnd || Math.random;
    var h = snap(st); h.side = side; st.hist.push(h);
    var win = st.slots[side], lose = st.slots[1 - side];
    var ew = 1 / (1 + Math.pow(10, (st.elo[lose] - st.elo[win]) / 400));
    st.elo[win] += K * (1 - ew); st.elo[lose] -= K * (1 - ew);
    st.w[win]++; st.l[lose]++;
    if (st.phase === 'main') {
      if (st.ci < st.order.length) { var ns = st.slots.slice(); ns[1 - side] = st.order[st.ci++]; st.slots = ns; }
      else st.done = true;
    } else {
      st.qi++;
      if (st.qi < st.queue.length) st.slots = st.queue[st.qi].slice(); else st.done = true;
    }
    return st;
  }
  function undo(st){
    if (!st.hist.length) return st;
    var h = st.hist.pop(), a = h.slots[0], b = h.slots[1];
    var win = h.slots[h.side], lose = h.slots[1 - h.side];
    st.w[win]--; st.l[lose]--;
    st.elo[a] = h.ea; st.elo[b] = h.eb;
    st.slots = h.slots; st.ci = h.ci; st.qi = h.qi; st.done = h.done;
    st.phase = h.phase; st.queue = h.queue; st.rounds = h.rounds;
    return st;
  }
  function ranking(st){
    var pos = {}; st.order.forEach(function(id, i){ pos[id] = i; });
    return st.order.slice().sort(function(x, y){
      return (st.elo[y] - st.elo[x]) || (st.w[y] - st.w[x]) || (st.l[x] - st.l[y]) || (pos[x] - pos[y]);
    });
  }
  /* Раунд уточнения: соседи по рейтингу. Чётные раунды пары (0,1),(2,3)..., нечётные (1,2),(3,4)... */
  function refinePairs(st, rnd){
    rnd = rnd || Math.random;
    var r = ranking(st), off = st.rounds % 2, pairs = [];
    for (var i = off; i + 1 < r.length; i += 2) pairs.push(rnd() < 0.5 ? [r[i], r[i + 1]] : [r[i + 1], r[i]]);
    return pairs;
  }
  function startRefine(st, rnd){
    var q = refinePairs(st, rnd); if (!q.length) return st;
    st.phase = 'refine'; st.queue = q; st.qi = 0; st.slots = q[0].slice(); st.done = false; st.rounds++;
    return st;
  }
  function refineCount(st){ return Math.floor((st.order.length - (st.rounds % 2)) / 2); }
  function totalMain(st){ return Math.max(0, st.order.length - 1); }
  /* номер текущей дуэли внутри фазы и их число в фазе */
  function progress(st){
    if (st.phase === 'main') return { n: Math.min(st.hist.filter(function(h){ return h.phase === 'main'; }).length + 1, totalMain(st)), m: totalMain(st), phase: 'main' };
    return { n: Math.min(st.qi + 1, st.queue.length), m: st.queue.length, phase: 'refine' };
  }
  var api = { newState: newState, vote: vote, undo: undo, ranking: ranking, startRefine: startRefine, progress: progress, refineCount: refineCount, totalMain: totalMain, shuffle: shuffle, K: K, START: START };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.DE = api;
})(typeof window !== 'undefined' ? window : this);

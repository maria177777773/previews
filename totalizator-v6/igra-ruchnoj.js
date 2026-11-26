/* igra-ruchnoj.js: режим «Расставлю сам», итог игры по одному (секции) и просмотр закрытого тура (readonly).
   Каждый баннер: все форматы в натуральных пропорциях, под ними 👎 «Худшая» слева и 👍 «Лучшая» справа. */
'use strict';
var RU = { cards: {}, msg: null, cnt: null };

function ruchnojMsg(t){ if (RU.msg) RU.msg.textContent = t || ''; }
function ruchnojToggle(id, group){
  var d = STATE.draft; if (!d) return;
  var p = IG.p, mine = group === 'top' ? d.top : d.hudshie, other = group === 'top' ? d.hudshie : d.top, lim = group === 'top' ? p.k : p.h;
  var name = group === 'top' ? 'Лучшие' : 'Худшие';
  var at = mine.indexOf(id);
  if (at >= 0) { mine.splice(at, 1); if (group === 'top' && d.lider === id) d.lider = d.top[0] || null; ruchnojMsg(''); sound.play('tap'); }
  else {
    if (mine.length >= lim) { ruchnojMsg(name + ' уже выбраны: ' + lim + ' из ' + lim + '. Снимите отметку с одного баннера, чтобы выбрать другой.'); sound.play('err'); buzz(40); ruchnojShake(id, group); return; }
    var oi = other.indexOf(id);
    if (oi >= 0) { other.splice(oi, 1); if (group === 'hudshie' && d.lider === id) d.lider = d.top[0] || null; }
    mine.push(id); if (group === 'top' && !d.lider) d.lider = id;
    sound.play('pick'); buzz(15); ruchnojMsg('');
  }
  igraSaveDraft(); ruchnojPaint();
}
function ruchnojShake(id, group){
  var r = RU.cards[id]; if (!r || reducedMotion()) return;
  var b = group === 'top' ? r.bt : r.bh; b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake');
}
function ruchnojCntText(n, lim){
  if (n === lim) return n + ' из ' + lim + ' ✓';
  if (n > lim) return n + ' из ' + lim + ', уберите ' + (n - lim);
  return n + ' из ' + lim;
}
function ruchnojPaint(){
  var d = STATE.draft, p = IG.p; if (!d || !p) return;
  Object.keys(RU.cards).forEach(function(id){
    var r = RU.cards[id], t = d.top.indexOf(id) >= 0, h = d.hudshie.indexOf(id) >= 0;
    r.card.classList.toggle('is-top', t); r.card.classList.toggle('is-hud', h);
    r.bt.setAttribute('aria-pressed', t ? 'true' : 'false'); r.bh.setAttribute('aria-pressed', h ? 'true' : 'false');
    r.btl.textContent = t ? 'Лучшая ✓' : 'Лучшая'; r.bhl.textContent = h ? 'Худшая ✓' : 'Худшая';
    r.tag.textContent = t ? (d.lider === id ? 'В лучших, фаворит ★' : 'В лучших') : (h ? 'В худших' : '');
    r.tag.className = 'rc-tag' + (t ? ' up' : (h ? ' down' : ''));
  });
  if (RU.cnt) {
    var c = RU.cnt;
    c.top.textContent = ruchnojCntText(d.top.length, p.k); c.hud.textContent = ruchnojCntText(d.hudshie.length, p.h);
    c.topBox.className = 'cnt cnt-up' + (d.top.length === p.k ? ' full' : (d.top.length > p.k ? ' over' : ''));
    c.hudBox.className = 'cnt cnt-down' + (d.hudshie.length === p.h ? ' full' : (d.hudshie.length > p.h ? ' over' : ''));
    var ready = d.top.length === p.k && d.hudshie.length === p.h;
    c.go.disabled = !(d.top.length + d.hudshie.length);
    c.go.textContent = ready ? 'Дальше: проверить ставку' : 'Проверить ставку';
    c.go.classList.toggle('ready', ready);
  }
}
function ruchnojVoteBtn(kind, fn){
  var b = el('button', 'vote vote-' + kind); b.type = 'button';
  b.appendChild(icoSpan(kind === 'up' ? 'up' : 'down'));
  var l = el('span', 'vote-l', kind === 'up' ? 'Лучшая' : 'Худшая'); b.appendChild(l);
  b.setAttribute('aria-pressed', 'false'); b.setAttribute('data-act', kind === 'up' ? 'top' : 'hud');
  b.addEventListener('click', fn); return { b: b, l: l };
}
function ruchnojCard(b, met, readonly, compact){
  var c = el('article', 'rcard'); c.setAttribute('data-card', b.id);
  var head = el('div', 'rc-head');
  head.appendChild(el('h4', 'rc-name', b.podpis));
  var tag = el('span', 'rc-tag', ''); head.appendChild(tag);
  c.appendChild(head);
  c.appendChild(igraFormats(b, compact ? 'one' : 'row', true));
  if (compact) c.appendChild(el('p', 'rc-more', 'Нажмите на баннер: все форматы крупно.'));
  if (met.src) c.appendChild(el('div', 'rc-met', igraMetLine(met.map[b.id])));
  if (readonly) {
    var parts = [];
    if (IG.mine) { if ((IG.mine.top || []).indexOf(b.id) >= 0) parts.push('Ваша лучшая'); if ((IG.mine.hudshie || []).indexOf(b.id) >= 0) parts.push('Ваша худшая'); }
    var itog = IG.p.itog;
    if (itog && itog.luchshie && itog.luchshie.indexOf(b.id) >= 0) parts.push('В итоге: лучшая');
    if (itog && itog.hudshie && itog.hudshie.indexOf(b.id) >= 0) parts.push('В итоге: худшая');
    tag.textContent = parts.join('. ');
    return c;
  }
  var row = el('div', 'rc-vote');
  var bh = ruchnojVoteBtn('down', function(){ ruchnojToggle(b.id, 'hudshie'); });
  var bt = ruchnojVoteBtn('up', function(){ ruchnojToggle(b.id, 'top'); });
  bh.b.setAttribute('aria-label', 'Худшая: ' + b.podpis); bt.b.setAttribute('aria-label', 'Лучшая: ' + b.podpis);
  row.appendChild(bh.b); row.appendChild(bt.b); c.appendChild(row);
  RU.cards[b.id] = { card: c, bt: bt.b, bh: bh.b, btl: bt.l, bhl: bh.l, tag: tag };
  return c;
}
/* sections: [{title, note, ids}] для итога игры по одному; без sections одна секция со всеми баннерами. */
function ruchnojRender(body, readonly, sections){
  var p = IG.p, st = el('div', 'step'), met = igraMetrics(p);
  RU = { cards: {}, msg: null, cnt: null };
  if (!readonly) {
    var h = el('h3'); h.appendChild(el('span', 'n', '3')); h.appendChild(document.createTextNode(sections ? 'Соберите ставку' : 'Отметьте лучшие и худшие')); st.appendChild(h);
    st.appendChild(el('p', 'lead', 'Нужно ' + p.k + ' ' + plural(p.k, 'лучший', 'лучших', 'лучших') + ' и ' + p.h + ' ' + plural(p.h, 'худший', 'худших', 'худших') + '. Повторное нажатие снимает отметку. Баннер можно открыть крупно.'));
    var bar = el('div', 'bar');
    var tb = el('span', 'cnt cnt-up'); tb.appendChild(icoSpan('up')); tb.appendChild(el('span', 'cnt-l', 'Лучшие')); var ct = el('b', '', ''); ct.id = 'cntTop'; tb.appendChild(ct);
    var hb = el('span', 'cnt cnt-down'); hb.appendChild(icoSpan('down')); hb.appendChild(el('span', 'cnt-l', 'Худшие')); var ch = el('b', '', ''); ch.id = 'cntHud'; hb.appendChild(ch);
    var go = igraBtn('Проверить ставку', 'bar-go', function(){ IG.step = 'proverka'; igraDrawBody(); window.scrollTo(0, ($('igraBody').getBoundingClientRect().top + window.pageYOffset) - 8); });
    go.id = 'ruchGo';
    bar.appendChild(hb); bar.appendChild(tb); bar.appendChild(go); st.appendChild(bar);
    RU.cnt = { top: ct, hud: ch, go: go, topBox: tb, hudBox: hb };
    var m = el('p', 'sr-live'); m.id = 'ruchMsg'; m.setAttribute('aria-live', 'polite'); RU.msg = m; st.appendChild(m);
  }
  if (met.src) st.appendChild(igraNote('', met.src === 'now' ? 'Под баннерами цифры текущей недели.' : 'Под баннерами цифры прошлого тура этой лиги. Это подсказка, а не итог.'));
  var secs = sections && sections.length ? sections : [{ title: '', note: '', ids: p.bannery.map(function(b){ return b.id; }) }];
  secs.forEach(function(sec){
    if (!sec.ids.length && !sec.note) return;
    var wrap = el('section', 'rsec');
    if (sec.title) wrap.appendChild(el('h3', 'rsec-h', sec.title));
    if (sec.note) wrap.appendChild(el('p', 'rsec-note', sec.note));
    var one = sec.ids.every(function(id){ var b = igraCard(id); return b && igraVid(b, 'w').length === 1; });
    var cmp = !!sections, list = el('div', 'rlist' + (p.gz ? ' ny' : '') + (one ? ' rlist-one' : '') + (cmp ? ' rlist-cmp' : '')); list.id = secs.length === 1 ? 'ruchGrid' : '';
    sec.ids.forEach(function(id){ var b = igraCard(id); if (b) list.appendChild(ruchnojCard(b, met, readonly, cmp)); });
    wrap.appendChild(list); st.appendChild(wrap);
  });
  if (!readonly) {
    var br = el('div', 'btn-row');
    var back = igraBtn('Назад к выбору способа', 'btn-line', function(){ IG.step = 'modes'; igraDrawBody(); }); back.id = 'ruchBack';
    br.appendChild(back); st.appendChild(br);
  }
  body.appendChild(st);
  if (!readonly) ruchnojPaint();
}

/* igra-ruchnoj.js: режим «Расставлю сам» и просмотр закрытого тура (readonly).
   Каждый баннер: все форматы в натуральных пропорциях, под ними «Худшая» слева и «Лучшая» справа. */
'use strict';
var RU = { cards: {}, msg: null, cnt: null };

function ruchnojMsg(t){ if (RU.msg) RU.msg.textContent = t || ''; }
/* Отметки идут в IG.rank: два списка по порядку отметки. Порядок потом правится на экране «Ваш выбор». */
function ruchnojToggle(id, group){
  var r = IG.rank; if (!r) return;
  var mine = group === 'top' ? r.top : r.bad, other = group === 'top' ? r.bad : r.top, lim = IG.lim;
  var name = group === 'top' ? 'Лучшие' : 'Худшие';
  var at = mine.indexOf(id);
  if (at >= 0) { mine.splice(at, 1); ruchnojMsg(''); sound.play('tap'); }
  else {
    if (mine.length >= lim) { ruchnojMsg(name + ' уже выбраны: ' + lim + ' из ' + lim + '. Снимите отметку с одного баннера, чтобы выбрать другой.'); sound.play('err'); buzz(40); ruchnojShake(id, group); return; }
    var oi = other.indexOf(id); if (oi >= 0) other.splice(oi, 1);
    mine.push(id); sound.play('pick'); buzz(15); ruchnojMsg('');
  }
  rankSave(); ruchnojPaint();
}
function ruchnojShake(id, group){
  var r = RU.cards[id]; if (!r || reducedMotion()) return;
  var b = group === 'top' ? r.bt : r.bh; b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake');
}
function ruchnojPaint(){
  var r = IG.rank, p = IG.p; if (!r || !p) return;
  Object.keys(RU.cards).forEach(function(id){
    var c = RU.cards[id], t = r.top.indexOf(id) >= 0, h = r.bad.indexOf(id) >= 0;
    c.card.classList.toggle('is-top', t); c.card.classList.toggle('is-hud', h);
    c.bt.setAttribute('aria-pressed', t ? 'true' : 'false'); c.bh.setAttribute('aria-pressed', h ? 'true' : 'false');
    c.btl.textContent = t ? 'Лучшая ✓' : 'Лучшая'; c.bhl.textContent = h ? 'Худшая ✓' : 'Худшая';
    c.tag.textContent = t ? 'В лучших' : (h ? 'В худших' : '');
    c.tag.className = 'rc-tag' + (t ? ' up' : (h ? ' down' : ''));
  });
  if (RU.cnt) {
    var c2 = RU.cnt, lim = IG.lim;
    c2.top.textContent = r.top.length + '/' + lim; c2.hud.textContent = r.bad.length + '/' + lim;
    c2.topBox.className = 'cnt cnt-up' + (r.top.length >= lim ? ' full' : ''); c2.hudBox.className = 'cnt cnt-down' + (r.bad.length >= lim ? ' full' : '');
    var ready = r.top.length >= p.k && r.bad.length >= p.h;
    c2.go.disabled = !(r.top.length + r.bad.length);
    c2.go.textContent = ready ? 'Дальше: итог и ставка' : 'Дальше: итог';
    c2.go.classList.toggle('ready', ready);
  }
}
function ruchnojVoteBtn(kind, fn){
  var b = el('button', 'vote vote-' + kind); b.type = 'button';
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
/* Весь список баннеров: крупно, под каждым «Худшая» и «Лучшая». readonly: просмотр закрытого тура. */
function ruchnojRender(body, readonly){
  var p = IG.p, st = el('div', 'step'), met = igraMetrics(p);
  RU = { cards: {}, msg: null, cnt: null };
  if (!readonly) {
    var h = el('h3'); h.appendChild(el('span', 'n', '3')); h.appendChild(document.createTextNode('Расставьте лучшие и худшие')); st.appendChild(h);
    st.appendChild(el('p', 'lead', 'Отметьте до ' + IG.lim + ' лучших и до ' + IG.lim + ' худших. Повторное нажатие снимает отметку. В ставку пойдут первые ' + p.k + ' и ' + p.h + ' из ваших списков, порядок поправите на следующем шаге. Баннер можно открыть крупно.'));
    var bar = el('div', 'bar');
    var tb = el('span', 'cnt cnt-up'); tb.appendChild(el('span', 'cnt-l', 'Лучшие')); var ct = el('b', '', ''); ct.id = 'cntTop'; tb.appendChild(ct);
    var hb = el('span', 'cnt cnt-down'); hb.appendChild(el('span', 'cnt-l', 'Худшие')); var ch = el('b', '', ''); ch.id = 'cntHud'; hb.appendChild(ch);
    var go = igraBtn('Дальше: итог', 'bar-go', function(){ IG.step = 'final'; igraDrawBody(); var bd = $('igraBody'); if (bd) bd.scrollIntoView({ block: 'start', behavior: 'auto' }); });
    go.id = 'ruchGo';
    bar.appendChild(tb); bar.appendChild(hb); bar.appendChild(go); st.appendChild(bar);
    RU.cnt = { top: ct, hud: ch, go: go, topBox: tb, hudBox: hb };
    var m = el('p', 'sr-live'); m.id = 'ruchMsg'; m.setAttribute('aria-live', 'polite'); RU.msg = m; st.appendChild(m);
  }
  if (met.src) st.appendChild(igraNote('', met.src === 'now' ? 'Под баннерами цифры текущей недели.' : 'Под баннерами цифры прошлого тура этой лиги. Это подсказка, а не итог.'));
  var wrap = el('section', 'rsec');
  var one = p.bannery.every(function(b){ return igraVid(b, 'w').length === 1; });
  var list = el('div', 'rlist' + (p.gz ? ' ny' : '') + (one ? ' rlist-one' : '')); list.id = 'ruchGrid';
  p.bannery.forEach(function(b){ list.appendChild(ruchnojCard(b, met, readonly, false)); });
  wrap.appendChild(list); st.appendChild(wrap);
  if (!readonly) {
    var br = el('div', 'btn-row');
    var back = igraBtn('Назад к выбору способа', 'btn-line', function(){ IG.step = 'modes'; igraDrawBody(); }); back.id = 'ruchBack';
    br.appendChild(back); st.appendChild(br);
  }
  body.appendChild(st);
  if (!readonly) ruchnojPaint();
}

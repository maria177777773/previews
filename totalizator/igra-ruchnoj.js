/* igra-ruchnoj.js: режим «Расставлю сам» и просмотр закрытого тура (readonly). */
'use strict';
var RU = { cards: {}, bar: null, msg: null };

function ruchnojMsg(t){ if (RU.msg) RU.msg.textContent = t || ''; }
function ruchnojToggle(id, group){
  var d = STATE.draft; if (!d) return;
  var p = IG.p, mine = group === 'top' ? d.top : d.hudshie, other = group === 'top' ? d.hudshie : d.top, lim = group === 'top' ? p.k : p.h;
  var name = group === 'top' ? 'Лучшие' : 'Худшие';
  var at = mine.indexOf(id);
  if (at >= 0) { mine.splice(at, 1); if (group === 'top' && d.lider === id) d.lider = d.top[0] || null; ruchnojMsg(''); }
  else {
    if (mine.length >= lim) { ruchnojMsg(name + ' уже заполнены: ' + lim + ' из ' + lim + '. Уберите одну карточку, чтобы выбрать другую.'); sound.play('err'); buzz(40); return; }
    var oi = other.indexOf(id);
    if (oi >= 0) { other.splice(oi, 1); if (group === 'hudshie' && d.lider === id) d.lider = d.top[0] || null; }
    mine.push(id); if (group === 'top' && !d.lider) d.lider = id;
    sound.play('pick'); buzz(15); ruchnojMsg('');
  }
  igraSaveDraft(); ruchnojPaint();
}
function ruchnojPaint(){
  var d = STATE.draft, p = IG.p; if (!d || !p) return;
  Object.keys(RU.cards).forEach(function(id){
    var r = RU.cards[id], t = d.top.indexOf(id) >= 0, h = d.hudshie.indexOf(id) >= 0;
    r.card.classList.toggle('is-top', t); r.card.classList.toggle('is-hud', h);
    r.bt.setAttribute('aria-pressed', t ? 'true' : 'false'); r.bh.setAttribute('aria-pressed', h ? 'true' : 'false');
    r.bt.textContent = t ? 'В лучших. Убрать' : 'В лучшие'; r.bh.textContent = h ? 'В худших. Убрать' : 'В худшие';
    r.tag.textContent = t ? (d.lider === id ? 'Лучшая, фаворит' : 'Лучшая') : (h ? 'Худшая' : '');
  });
  if (RU.cnt) { RU.cnt.top.textContent = 'Лучшие: ' + d.top.length + ' из ' + p.k; RU.cnt.hud.textContent = 'Худшие: ' + d.hudshie.length + ' из ' + p.h; RU.cnt.go.disabled = !(d.top.length + d.hudshie.length); }
}
function ruchnojRender(body, readonly){
  var p = IG.p, st = el('div', 'step'), met = igraMetrics(p);
  RU = { cards: {}, bar: null, msg: null, cnt: null };
  if (!readonly) {
    var h = el('h3'); h.appendChild(el('span', 'n', '3')); h.appendChild(document.createTextNode('Расставьте карточки')); st.appendChild(h);
    var bar = el('div', 'bar');
    var ct = el('b', '', ''), ch = el('b', '', ''); ct.id = 'cntTop'; ch.id = 'cntHud';
    var go = igraBtn('Проверить ставку', '', function(){ IG.step = 'proverka'; igraDrawBody(); window.scrollTo(0, ($('igraBody').getBoundingClientRect().top + window.pageYOffset) - 8); });
    go.id = 'ruchGo';
    bar.appendChild(ct); bar.appendChild(ch); bar.appendChild(go); st.appendChild(bar);
    RU.cnt = { top: ct, hud: ch, go: go };
    var m = el('p', 'sr-live'); m.id = 'ruchMsg'; m.setAttribute('aria-live', 'polite'); RU.msg = m; st.appendChild(m);
    var back = igraBtn('Назад к выбору способа', 'btn-line', function(){ IG.step = 'modes'; igraDrawBody(); }); back.id = 'ruchBack';
  }
  if (met.src) st.appendChild(igraNote('', met.src === 'now' ? 'Цифры текущей недели по каждому баннеру.' : 'Цифры прошлого тура этой лиги. Это подсказка, а не итог.'));
  var grid = el('div', 'grid' + (p.gz ? ' ny' : '')); grid.id = 'ruchGrid';
  var itog = p.itog;
  p.bannery.forEach(function(b){
    var c = el('div', 'gcard'); c.setAttribute('data-card', b.id);
    c.appendChild(igraImgs(b, 'gimgs', true));
    c.appendChild(el('div', 'gname', b.podpis));
    c.appendChild(el('div', 'gmet', igraMetLine(met.map[b.id])));
    var tag = el('div', 'gtag', '');
    if (readonly) {
      var parts = [];
      if (IG.mine) { if ((IG.mine.top || []).indexOf(b.id) >= 0) parts.push('Ваша лучшая'); if ((IG.mine.hudshie || []).indexOf(b.id) >= 0) parts.push('Ваша худшая'); }
      if (itog && itog.luchshie && itog.luchshie.indexOf(b.id) >= 0) parts.push('В итоге: лучшая');
      if (itog && itog.hudshie && itog.hudshie.indexOf(b.id) >= 0) parts.push('В итоге: худшая');
      tag.textContent = parts.join('. ');
      c.appendChild(tag); grid.appendChild(c); return;
    }
    c.appendChild(tag);
    var bt = igraBtn('В лучшие', 'btn-line', function(){ ruchnojToggle(b.id, 'top'); }); bt.setAttribute('aria-pressed', 'false'); bt.setAttribute('data-act', 'top');
    var bh = igraBtn('В худшие', 'btn-line', function(){ ruchnojToggle(b.id, 'hudshie'); }); bh.setAttribute('aria-pressed', 'false'); bh.setAttribute('data-act', 'hud');
    var row = el('div', 'gbtns'); row.appendChild(bt); row.appendChild(bh); c.appendChild(row);
    RU.cards[b.id] = { card: c, bt: bt, bh: bh, tag: tag };
    grid.appendChild(c);
  });
  st.appendChild(grid);
  if (!readonly) { st.appendChild(el('div', 'btn-row')).appendChild(back); }
  body.appendChild(st);
  if (!readonly) ruchnojPaint();
}

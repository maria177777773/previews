/* igra-proverka.js: экран проверки, отправка ставки, плашки «Ставка принята» и ошибки. */
'use strict';
var PV = { msg: '' };
var TXT_NET = 'Нет связи с сервером. Ставка сохранена на этом телефоне, нажмите «Отправить ещё раз».';
var TXT_BAD_ANSWER = 'Сервер ответил не так, как ждали. Ставка сохранена на этом телефоне, нажмите «Отправить ещё раз».';

function proverkaMissing(){
  var d = STATE.draft, p = IG.p, parts = [], nt = p.k - d.top.length, nh = p.h - d.hudshie.length;
  if (nt > 0) parts.push('ещё ' + nt + ' ' + plural(nt, 'лучшую', 'лучших', 'лучших'));
  if (nh > 0) parts.push('ещё ' + nh + ' ' + plural(nh, 'худшую', 'худших', 'худших'));
  if (p.gz && d.cvet !== 'w' && d.cvet !== 'g') parts.push('цвет');
  if (!parts.length && !d.lider) parts.push('фаворита');
  return parts;
}
function proverkaMove(id, to){
  var d = STATE.draft, p = IG.p, from = to === 'hudshie' ? d.top : d.hudshie, dest = to === 'hudshie' ? d.hudshie : d.top, lim = to === 'hudshie' ? p.h : p.k;
  if (dest.length >= lim) { PV.msg = (to === 'hudshie' ? 'Худшие' : 'Лучшие') + ' уже заполнены: ' + lim + ' из ' + lim + '. Сначала уберите одну карточку из этой группы.'; sound.play('err'); igraDrawBody(); return; }
  from.splice(from.indexOf(id), 1); dest.push(id);
  if (!d.lider || d.top.indexOf(d.lider) < 0) d.lider = d.top[0] || null;
  PV.msg = ''; igraSaveDraft(); igraDrawBody();
}
function proverkaRemove(id){
  var d = STATE.draft;
  [d.top, d.hudshie].forEach(function(g){ var i = g.indexOf(id); if (i >= 0) g.splice(i, 1); });
  if (d.top.indexOf(d.lider) < 0) d.lider = d.top[0] || null;
  PV.msg = ''; igraSaveDraft(); igraDrawBody();
}
function proverkaCard(id, group){
  var d = STATE.draft, b = igraCard(id), c = el('div', 'pcard'); c.setAttribute('data-card', id);
  c.appendChild(igraImgs(b, 'gimgs', true));
  var nm = el('div', 'pcard-name'); nm.appendChild(el('span', '', b.podpis));
  if (group === 'top') {
    var on = d.lider === id, st = el('button', 'star', '★'); st.type = 'button'; st.setAttribute('aria-pressed', on ? 'true' : 'false');
    st.setAttribute('aria-label', on ? 'Фаворит: ' + b.podpis : 'Сделать фаворитом: ' + b.podpis);
    st.addEventListener('click', function(){ d.lider = id; igraSaveDraft(); sound.play('pick'); igraDrawBody(); });
    nm.appendChild(st); if (on) nm.appendChild(el('span', 'g', 'Фаворит'));
  }
  c.appendChild(nm);
  var row = el('div', 'pcard-btns');
  row.appendChild(igraBtn('Убрать из группы', 'btn-line', function(){ proverkaRemove(id); }));
  row.appendChild(igraBtn(group === 'top' ? 'В худшие' : 'В лучшие', 'btn-line', function(){ proverkaMove(id, group === 'top' ? 'hudshie' : 'top'); }));
  c.appendChild(row); return c;
}
function proverkaGroup(group){
  var d = STATE.draft, p = IG.p, ids = group === 'top' ? d.top : d.hudshie, lim = group === 'top' ? p.k : p.h;
  var g = el('div', 'grp ' + (group === 'top' ? 'grp-top' : 'grp-hud')); g.setAttribute('data-group', group);
  g.appendChild(el('h3', '', (group === 'top' ? 'Ваши лучшие' : 'Ваши худшие') + ': ' + ids.length + ' из ' + lim));
  var list = el('div', 'pcards');
  ids.forEach(function(id){ list.appendChild(proverkaCard(id, group)); });
  if (!ids.length) list.appendChild(el('p', 'muted', 'Здесь пока никого.'));
  g.appendChild(list); return g;
}
function proverkaSostav(d){
  return { top: d.top.map(igraLabel), fav: igraLabel(d.lider), hud: d.hudshie.map(igraLabel), cvet: d.cvet };
}
function proverkaCopyText(s, who){
  var t = 'Моя ставка на тур «' + (IG.p.nazvanie || '') + '». Имя: ' + who + '. Лучшие: ' + s.top.map(function(n){ return n + (n === s.fav ? ' (фаворит)' : ''); }).join(', ') + '. Худшие: ' + s.hud.join(', ') + '.';
  if (s.cvet) t += ' Цвет: ' + (s.cvet === 'w' ? 'белая' : 'зелёная') + '.';
  return t;
}
function proverkaCopy(text, done){
  function fallback(){
    var ok = false, ta = el('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;left:0;top:0;opacity:0;font-size:16px';
    document.body.appendChild(ta); ta.focus(); ta.select();
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta); done(ok);
  }
  try { if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(text).then(function(){ done(true); }, fallback); return; } } catch (e) {}
  fallback();
}
function proverkaPlaque(){
  var r = IG.res; if (!r) return null;
  if (r.kind === 'sending') { var n = igraNote('', 'Отправляем ставку…'); n.setAttribute('role', 'status'); return n; }
  var box = el('div', 'res ' + (r.kind === 'ok' ? 'res-ok' : 'res-bad')); box.setAttribute('role', r.kind === 'ok' ? 'status' : 'alert'); box.id = 'resBox'; box.setAttribute('data-test', r.kind === 'ok' ? 'res-ok' : 'res-bad');
  if (r.kind === 'ok') {
    box.appendChild(el('h2', 'res-h', 'Ставка принята'));
    box.appendChild(el('p', 'res-p', 'Ставка № ' + r.nomer + ' принята в ' + fmtTime(r.vremya) + ' по Москве. Тур: ' + (IG.p.nazvanie || '') + '. Играет: ' + r.who + '.'));
    var ul = el('ul', 'res-list'); var s = r.sostav;
    ul.appendChild(el('li', '', 'Лучшие: ' + s.top.map(function(n){ return n + (n === s.fav ? ' (фаворит)' : ''); }).join(', ')));
    ul.appendChild(el('li', '', 'Худшие: ' + s.hud.join(', ')));
    if (s.cvet) ul.appendChild(el('li', '', 'Цвет: ' + (s.cvet === 'w' ? 'белая' : 'зелёная')));
    box.appendChild(ul);
    var conf = el('p', 'res-conf', r.confirm === 'yes' ? 'Сервер подтвердил: ваша ставка № ' + r.nomer + ' есть в списке.' : (r.confirm === 'no' ? 'Список с сервера пока не получили, но ставка принята.' : 'Сверяем с сервером…'));
    conf.id = 'resConf'; box.appendChild(conf);
    var row = el('div', 'btn-row');
    row.appendChild(igraBtn('Изменить ставку', 'btn-line', function(){ IG.res = null; IG.step = 'modes'; IG.du = null; igraDrawBody(); igraLoadMine(); }));
    box.appendChild(row); return box;
  }
  box.appendChild(el('h2', 'res-h', 'Ставка не принята'));
  box.appendChild(el('p', 'res-p', r.text));
  var rw = el('div', 'btn-row');
  if (r.kod !== 'zakryta') { var re = igraBtn('Отправить ещё раз', '', proverkaSend); re.id = 'resRetry'; rw.appendChild(re); }
  var cp = igraBtn('Скопировать ставку', 'btn-line', function(){
    var t = proverkaCopyText(r.sostav, r.who);
    proverkaCopy(t, function(ok){ var f = $('resCopied'); if (f) f.textContent = ok ? 'Ставка скопирована. Её можно отправить Маше в чат.' : 'Не получилось скопировать. Выделите текст ниже и скопируйте вручную: ' + t; });
  }); cp.id = 'resCopy'; rw.appendChild(cp); box.appendChild(rw);
  var fb = el('p', 'res-p'); fb.id = 'resCopied'; fb.setAttribute('aria-live', 'polite'); box.appendChild(fb);
  return box;
}
function proverkaPayload(){
  var d = STATE.draft;
  return { partiya: IG.p.id, imya: STATE.me, top: d.top.slice(), hudshie: d.hudshie.slice(), lider: d.lider, cvet: IG.p.gz ? d.cvet : null, rezhim: d.rezhim === 'igra' ? 'igra' : 'ruchnoj', klient: newKlient() };
}
function proverkaSend(){
  var d = STATE.draft; if (IG.sending || !d || proverkaMissing().length) return;
  var p = IG.p, me = STATE.me, payload = proverkaPayload(), sostav = proverkaSostav(d);
  igraSaveDraft(); IG.sending = true; IG.res = { kind: 'sending' }; igraDrawBody();
  apiPost('/zavod/tot/stavka2', payload).then(function(r){
    IG.sending = false;
    if (IG.p !== p) return;
    var j = r.json;
    if (r.ok && j && j.ok === true) {
      var vr = (j.stavka && j.stavka.vremya) || new Date().toISOString();
      IG.res = { kind: 'ok', nomer: j.nomer, vremya: vr, sostav: sostav, who: me, confirm: 'wait' };
      IG.mine = j.stavka || IG.mine; IG.step = 'proverka';
      igraDropDraft(); sound.play('ok'); buzz(60); igraDrawBody();
      emit('stavka:sent', { partiya: p.id, imya: me, nomer: j.nomer, stavka: j.stavka || null });
      var box = $('resBox'); if (box) box.scrollIntoView({ block: 'start', behavior: 'auto' });
      var klient = (j.klient && String(j.klient)) || payload.klient;
      igraKlientSet(p.id, me, klient);
      var okText = 'Сервер подтвердил: ваша ставка № ' + j.nomer + ' есть в списке.', noText = 'Список с сервера пока не получили, но ставка принята.';
      apiGet(igraStavki2Url(p.id, klient)).then(function(g){
        var found = !!(g.ok && g.json && g.json.ok && igraMineFrom(g.json, me));
        if (found && typeof g.json.chislo === 'number') IG.chislo = g.json.chislo;
        if (IG.res && IG.res.kind === 'ok' && IG.res.nomer === j.nomer) { IG.res.confirm = found ? 'yes' : 'no'; var c = $('resConf'); if (c) c.textContent = found ? okText : noText; }
      });
      return;
    }
    var text, kod = j && j.kod;
    if (r.net) text = TXT_NET;
    else if (j && j.ok === false && j.oshibka) text = j.oshibka;
    else text = TXT_BAD_ANSWER;
    IG.res = { kind: 'bad', kod: kod || (r.net ? 'set' : 'otvet'), text: text, sostav: sostav, who: me };
    sound.play('err'); buzz(80); igraDrawBody();
    var bx = $('resBox'); if (bx) bx.scrollIntoView({ block: 'center', behavior: 'auto' });
  });
}
function proverkaRender(body){
  var d = STATE.draft, p = IG.p, st = el('div', 'step');
  var okRes = IG.res && IG.res.kind === 'ok';
  var h = el('h3'); h.appendChild(el('span', 'n', '4')); h.appendChild(document.createTextNode(okRes ? 'Готово' : 'Проверьте ставку')); st.appendChild(h);
  var pl = proverkaPlaque(); if (pl) st.appendChild(pl);
  if (okRes) { body.appendChild(st); return; }
  if (!d) { IG.step = 'modes'; igraDrawBody(); return; }
  st.appendChild(proverkaGroup('top')); st.appendChild(proverkaGroup('hudshie'));
  if (p.gz) {
    var cg = el('div', 'grp'); cg.appendChild(el('h3', '', 'Белая или зелёная'));
    cg.appendChild(el('p', '', 'Какие баннеры в целом получат больше кликов: белые или зелёные?'));
    var cr = el('div', 'cvet');
    [['w', 'Белая'], ['g', 'Зелёная']].forEach(function(x){
      var b = igraBtn(x[1], '', function(){ d.cvet = x[0]; igraSaveDraft(); sound.play('pick'); igraDrawBody(); });
      b.setAttribute('aria-pressed', d.cvet === x[0] ? 'true' : 'false'); b.setAttribute('data-cvet', x[0]); cr.appendChild(b);
    });
    cg.appendChild(cr); st.appendChild(cg);
  }
  if (PV.msg) { var m = igraNote('note-bad', PV.msg); m.setAttribute('role', 'alert'); st.appendChild(m); }
  var miss = proverkaMissing();
  var ar = el('div', 'btn-row');
  if (d.top.length < p.k || d.hudshie.length < p.h) { var ad = igraBtn('Добавить карточки', 'btn-line', function(){ IG.step = 'ruchnoj'; igraDrawBody(); }); ad.id = 'pvAdd'; ar.appendChild(ad); }
  var bk = igraBtn('Назад к выбору способа', 'btn-line', function(){ IG.step = 'modes'; igraDrawBody(); }); ar.appendChild(bk);
  st.appendChild(ar);
  var send = igraBtn(IG.sending ? 'Отправляем…' : 'Отправить ставку', '', proverkaSend); send.id = 'sendBtn'; send.disabled = !!miss.length || IG.sending;
  var hint = el('p', 'hint' + (miss.length ? '' : ' ready'), miss.length ? 'Чтобы отправить, выберите ' + miss.join(', ') + '.' : 'Всё готово. Нажмите «Отправить ставку».'); hint.id = 'sendHint';
  var sr = el('div', 'btn-row'); sr.appendChild(send); st.appendChild(sr); st.appendChild(hint);
  body.appendChild(st);
}

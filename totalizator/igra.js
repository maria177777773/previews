/* igra.js: экран «Играть». Шаги: имя, тур, способ. Общие помощники для igra-duel.js, igra-ruchnoj.js, igra-proverka.js. */
'use strict';
var IG = { p: null, step: 'modes', other: false, nameErr: '', mine: null, chislo: null, mineLoaded: false, zakryta: false, view: false, du: null, res: null, sending: false, note: '' };
var NAMES = ['Маша', 'Никита', 'Ирек'];

/* ---- общие помощники ---- */
function igraCard(id){
  var b = IG.p ? IG.p.bannery : [];
  for (var i = 0; i < b.length; i++) if (b[i].id === id) return b[i];
  return null;
}
function igraLabel(id){ var c = igraCard(id); return c ? c.podpis : ''; }
function igraIsNy(){ return !!(IG.p && IG.p.gz); }
/* Картинки карточки: у Новогодних светлая и зелёная рядом. zoom=true: каждая картинка открывает крупную версию. */
function igraImgs(b, cls, zoom){
  var row = el('div', cls || 'gimgs');
  var list = [{ s: b.img, big: b.img_big || b.img, alt: b.podpis + (b.img_g ? ', светлая версия' : '') }];
  if (b.img_g) list.push({ s: b.img_g, big: b.img_g_big || b.img_g, alt: b.podpis + ', зелёная версия' });
  list.forEach(function(it){
    var im = el('img'); im.src = it.s; im.alt = it.alt; im.loading = 'lazy'; im.decoding = 'async';
    if (zoom) {
      var bt = el('button', 'imgbtn'); bt.type = 'button'; bt.setAttribute('aria-label', 'Увеличить: ' + it.alt);
      bt.addEventListener('click', function(){ openLightbox(it.big, it.alt); });
      bt.appendChild(im); row.appendChild(bt);
    } else row.appendChild(im);
  });
  return row;
}
/* Метрики карточек: текущие (tek) или итог последнего закрытого тура этой лиги. */
function igraMetrics(p){
  var map = {}, src = '';
  if (p && p.tek && p.tek.fakt && p.tek.fakt.length) { src = 'now'; p.tek.fakt.forEach(function(f){ map[f.id] = f; }); }
  else {
    var last = null;
    (DATA.partii || []).forEach(function(q){ if (q.liga === p.liga && q.id !== p.id && q.itog && q.itog.fakt && (!last || q.zakrytie > last.zakrytie)) last = q; });
    if (last) { src = 'past'; last.itog.fakt.forEach(function(f){ map[f.id] = f; }); }
  }
  return { map: map, src: src };
}
function igraMetLine(m){
  if (!m) return 'Данных по макету пока нет.';
  var t = 'Показы: ' + fmtNum(m.shows) + '. Клики: ' + fmtNum(m.clicks) + '. CTR: ' + ctrText(m.ctr) + '.';
  t += (m.zayavki == null) ? ' Заявок по макету пока нет данных.' : ' Заявки: ' + m.zayavki + '.';
  return t;
}
function igraNote(cls, text){ return el('p', 'note ' + (cls || ''), text); }
function igraBtn(text, cls, fn){ var b = el('button', 'btn ' + (cls || ''), text); b.type = 'button'; if (fn) b.addEventListener('click', fn); return b; }

/* ---- черновик ---- */
function igraDraftKey(){ return 'tot5_draft_' + (IG.p ? IG.p.id : '') + '_' + STATE.me; }
function igraNewDraft(mode){ return { top: [], hudshie: [], lider: null, cvet: null, rezhim: mode }; }
function igraDraftHas(d){ return !!d && (d.top.length > 0 || d.hudshie.length > 0); }
function igraSaveDraft(){
  var d = STATE.draft;
  if (IG.p && STATE.me && igraDraftHas(d)) { ls(igraDraftKey(), JSON.stringify(d)); unsavedGuard.set(true); }
  else { if (IG.p && STATE.me) ls(igraDraftKey(), null); unsavedGuard.set(false); }
}
function igraLoadDraft(){
  var raw = (IG.p && STATE.me) ? ls(igraDraftKey()) : null, d = null;
  if (raw) { try { d = JSON.parse(raw); } catch (e) { d = null; } }
  if (d && Array.isArray(d.top) && Array.isArray(d.hudshie)) {
    var ids = {}; IG.p.bannery.forEach(function(b){ ids[b.id] = 1; });
    d.top = d.top.filter(function(x){ return ids[x]; }); d.hudshie = d.hudshie.filter(function(x){ return ids[x]; });
    if (d.top.indexOf(d.lider) < 0) d.lider = d.top[0] || null;
    if (d.cvet !== 'w' && d.cvet !== 'g') d.cvet = null;
    d.rezhim = d.rezhim === 'igra' ? 'igra' : 'ruchnoj';
    return igraDraftHas(d) ? d : null;
  }
  return null;
}
function igraDropDraft(){ if (IG.p && STATE.me) ls(igraDraftKey(), null); STATE.draft = null; unsavedGuard.set(false); }

/* ---- туры ---- */
function igraTours(){
  var ny = null, ob = null, old = null;
  (DATA.partii || []).forEach(function(p){
    if (p.liga === 'ny' && (!ny || p.zakrytie > ny.zakrytie)) ny = p;
    if (p.liga === 'ob' && (!ob || p.zakrytie > ob.zakrytie)) ob = p;
    if (p.liga === 'old' && turnInfo(p).open && (!old || p.zakrytie > old.zakrytie)) old = p;
  });
  var out = [];
  if (ny) out.push({ p: ny, t: '❄ ' + (ny.nazvanie || 'Новогодние') });
  if (ob) out.push({ p: ob, t: ob.nazvanie || 'Обычные' });
  if (old) out.push({ p: old, t: old.nazvanie || 'Пять светлых баннеров' });
  return out;
}
function igraTourSub(p){
  return p.bannery.length + ' ' + plural(p.bannery.length, 'карточка', 'карточки', 'карточек') + '. Лучшие: ' + p.k + ', худшие: ' + p.h + '.';
}
function igraSelectTour(id){
  var p = getPartiya(id); if (!p) return;
  IG.p = p; STATE.partiya = p.id; STATE.liga = p.liga;
  IG.step = 'modes'; IG.mine = null; IG.chislo = null; IG.mineLoaded = false; IG.zakryta = false; IG.res = null; IG.du = null; IG.sending = false; IG.note = '';
  IG.view = !turnInfo(p).open;
  STATE.draft = igraLoadDraft(); STATE.rezhim = STATE.draft ? STATE.draft.rezhim : '';
  unsavedGuard.set(igraDraftHas(STATE.draft));
  igraRedrawAll(); igraLoadMine();
}
/* klient: случайный id попытки, который страница сама шлёт в POST /stavka2 и запоминает
   на этом устройстве (localStorage). Свою ставку открытого тура сервер отдаёт только по нему. */
function igraKlientKey(pid, me){ return 'tot5_klient_' + pid + '_' + String(me || '').toLowerCase(); }
function igraKlientGet(pid, me){ return ls(igraKlientKey(pid, me)) || ''; }
function igraKlientSet(pid, me, k){ if (k) ls(igraKlientKey(pid, me), k); }
function igraStavki2Url(pid, klient){
  return '/zavod/tot/stavki2?partiya=' + encodeURIComponent(pid) + (klient ? '&klient=' + encodeURIComponent(klient) : '');
}
/* Своя ставка из ответа /stavki2: у открытого тура поле moya (или null), у закрытого весь список stavki. */
function igraMineFrom(json, me){
  if (!json) return null;
  if (json.zakryta !== true && 'moya' in json) return json.moya || null;
  var low = String(me || '').toLowerCase(), found = null;
  (json.stavki || []).forEach(function(s){ if (String(s.imya).toLowerCase() === low) found = s; });
  return found;
}
function igraLoadMine(){
  var p = IG.p, me = STATE.me; if (!p || !me) return;
  apiGet(igraStavki2Url(p.id, igraKlientGet(p.id, me))).then(function(r){
    if (IG.p !== p || STATE.me !== me) return;
    IG.mineLoaded = true;
    if (r.ok && r.json && r.json.ok) {
      IG.zakryta = !!r.json.zakryta; if (IG.zakryta) IG.view = true;
      IG.chislo = typeof r.json.chislo === 'number' ? r.json.chislo : (Array.isArray(r.json.stavki) ? r.json.stavki.length : null);
      IG.mine = igraMineFrom(r.json, me);
    }
    igraDrawBody();
  });
}

/* ---- отрисовка ---- */
function igraFocusName(){
  var n = $('igraNameBox'); if (!n) return;
  n.scrollIntoView({ block: 'center', behavior: reducedMotion() ? 'auto' : 'smooth' });
  var b = n.querySelector('button'); if (b) b.focus();
}
function igraPickName(n){
  IG.other = false; IG.nameErr = '';
  if (setMe(n)) { if (IG.p) igraSelectTour(IG.p.id); else igraRedrawAll(); }
}
function igraNameStep(){
  var box = el('div', 'step'); box.id = 'igraNameBox';
  var h = el('h3'); h.appendChild(el('span', 'n', '1')); h.appendChild(document.createTextNode('Кто играет')); box.appendChild(h);
  var row = el('div', 'names');
  NAMES.forEach(function(n){
    var b = el('button', 'chip' + (STATE.me === n && !IG.other ? ' on' : ''), n); b.type = 'button'; b.setAttribute('aria-pressed', STATE.me === n && !IG.other ? 'true' : 'false');
    b.addEventListener('click', function(){ sound.play('tap'); igraPickName(n); }); row.appendChild(b);
  });
  var custom = STATE.me && NAMES.indexOf(STATE.me) < 0;
  var ob = el('button', 'chip' + (custom || IG.other ? ' on' : ''), custom && !IG.other ? STATE.me : 'Другое имя'); ob.type = 'button';
  ob.setAttribute('aria-pressed', (custom || IG.other) ? 'true' : 'false');
  ob.addEventListener('click', function(){ IG.other = true; igraRedrawAll(); var i = $('igraOther'); if (i) i.focus(); });
  row.appendChild(ob); box.appendChild(row);
  if (IG.other) {
    var o = el('div', 'other-box'), inp = el('input', 'inp'); inp.id = 'igraOther'; inp.type = 'text'; inp.maxLength = 24; inp.placeholder = 'Ваше имя'; inp.setAttribute('aria-label', 'Ваше имя');
    inp.value = custom ? STATE.me : '';
    var go = igraBtn('Готово', '', function(){
      var v = inp.value.trim();
      if (v.toLowerCase() === 'claude') { IG.nameErr = 'Это имя занято. Выберите другое.'; igraRedrawAll(); return; }
      if (!validName(v)) { IG.nameErr = 'Имя: до 24 знаков, буквы и цифры.'; igraRedrawAll(); return; }
      igraPickName(v);
    });
    inp.addEventListener('keydown', function(e){ if (e.key === 'Enter') go.click(); });
    o.appendChild(inp); o.appendChild(go); box.appendChild(o);
    if (IG.nameErr) box.appendChild(igraNote('note-bad', IG.nameErr));
  }
  if (!STATE.me) box.appendChild(igraNote('', 'Выберите имя, чтобы поставить ставку.'));
  return box;
}
function igraTourStep(){
  var box = el('div', 'step'); box.id = 'igraTourBox';
  var h = el('h3'); h.appendChild(el('span', 'n', '2')); h.appendChild(document.createTextNode('Выберите тур')); box.appendChild(h);
  var tiles = el('div', 'tiles');
  igraTours().forEach(function(t){
    var open = turnInfo(t.p).open, on = IG.p && IG.p.id === t.p.id;
    var b = el('button', 'tile' + (on ? ' on' : '')); b.type = 'button'; b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.setAttribute('data-tour', t.p.id);
    b.appendChild(el('span', 'tile-t', t.t)); b.appendChild(el('span', 'tile-s', igraTourSub(t.p)));
    b.appendChild(el('span', 'tile-b' + (open ? ' open' : ''), open ? 'Идёт приём ставок' : 'Тур закрыт, только просмотр'));
    b.addEventListener('click', function(){ sound.play('tap'); igraSelectTour(t.p.id); });
    tiles.appendChild(b);
  });
  if (!tiles.childNodes.length) tiles.appendChild(igraNote('', 'Туров пока нет. Загляните позже.'));
  box.appendChild(tiles); return box;
}
function igraRedrawAll(){
  var box = $('s-igra'); if (!box) return;
  box.textContent = '';
  box.appendChild(igraNameStep());
  if (!STATE.me || !DATA) return;
  box.appendChild(igraTourStep());
  var body = el('div'); body.id = 'igraBody'; box.appendChild(body);
  igraDrawBody();
}
function renderIgra(){ if (DATA) igraRedrawAll(); }

function igraMineNote(){
  var s = IG.mine; if (!s) return null;
  var t = IG.view ? 'Ваша ставка принята в ' + fmtTime(s.vremya) + '. Тур закрыт, изменить нельзя.' : 'Ваша ставка принята в ' + fmtTime(s.vremya) + ', можно изменить до закрытия.';
  var box = el('div', 'note note-ok'); box.setAttribute('data-test', 'mine');
  box.appendChild(el('div', '', t));
  var l = el('div', 'muted', 'Лучшие: ' + (s.top || []).map(igraLabel).join(', ') + '. Худшие: ' + (s.hudshie || []).map(igraLabel).join(', ') + '.' + (s.cvet ? ' Цвет: ' + (s.cvet === 'w' ? 'белая' : 'зелёная') + '.' : ''));
  box.appendChild(l); return box;
}
function igraDrawBody(){
  var body = $('igraBody'); if (!body) return;
  body.textContent = '';
  if (!IG.p) { body.appendChild(igraNote('', 'Выберите тур, и появятся способы игры.')); return; }
  var step = IG.step;
  if (IG.view) {
    body.appendChild(igraNote('', 'Тур закрыт: только просмотр. Ставки больше не принимаются.'));
    var mn = igraMineNote(); if (mn) body.appendChild(mn);
    ruchnojRender(body, true); return;
  }
  if (step === 'modes') {
    var h = el('h3'); h.appendChild(el('span', 'n', '3')); h.appendChild(document.createTextNode('Как будете выбирать'));
    var st = el('div', 'step'); st.appendChild(h);
    var mn2 = igraMineNote(); if (mn2) st.appendChild(mn2);
    var d = STATE.draft;
    if (igraDraftHas(d)) {
      var dn = el('div', 'note'); dn.setAttribute('data-test', 'draft');
      dn.appendChild(el('div', '', 'Найден черновик вашей ставки. Продолжить с того места?'));
      var br = el('div', 'btn-row');
      br.appendChild(igraBtn('Продолжить черновик', '', function(){ IG.step = 'proverka'; igraDrawBody(); }));
      br.appendChild(igraBtn('Начать заново', 'btn-line', function(){ igraDropDraft(); igraDrawBody(); }));
      dn.appendChild(br); st.appendChild(dn);
    }
    var m = el('div', 'modes');
    [['duel', 'Кто лучше', 'Две карточки, тапаете по лучшей. Быстро и без раздумий.'], ['ruchnoj', 'Расставлю сам', 'Все карточки на одном экране с цифрами. Сами решаете, кто лучший и худший.']].forEach(function(x){
      var b = el('button', 'mode'); b.type = 'button'; b.setAttribute('data-mode', x[0]);
      b.appendChild(el('span', 'mode-t', x[1])); b.appendChild(el('span', 'mode-s', x[2]));
      b.addEventListener('click', function(){ sound.play('tap'); igraStartMode(x[0]); }); m.appendChild(b);
    });
    st.appendChild(m); body.appendChild(st); return;
  }
  if (step === 'duel') { duelRender(body); return; }
  if (step === 'ruchnoj') { ruchnojRender(body, false); return; }
  if (step === 'proverka') { proverkaRender(body); return; }
}
function igraStartMode(mode){
  if (igraDraftHas(STATE.draft) && STATE.draft.rezhim === (mode === 'duel' ? 'igra' : 'ruchnoj') && mode === 'ruchnoj') { IG.step = 'ruchnoj'; igraDrawBody(); return; }
  STATE.draft = igraNewDraft(mode === 'duel' ? 'igra' : 'ruchnoj'); STATE.rezhim = STATE.draft.rezhim; IG.res = null;
  if (mode === 'duel') { IG.du = duelNew(IG.p); IG.step = 'duel'; }
  else IG.step = 'ruchnoj';
  igraDrawBody();
  var b = $('igraBody'); if (b) b.scrollIntoView({ block: 'start', behavior: 'auto' });
}

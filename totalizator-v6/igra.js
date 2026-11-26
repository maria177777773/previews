/* igra.js: экран «Играть». Шаги: имя, тур, способ. Общие помощники для igra-svajp.js, igra-ruchnoj.js, igra-proverka.js. */
'use strict';
var IG = { p: null, step: 'modes', other: false, nameErr: '', mine: null, chislo: null, mineLoaded: false, zakryta: false, view: false, sv: null, res: null, sending: false, note: '', fin: null };
var NAMES = ['Маша', 'Никита', 'Ирек'];

/* ---- общие помощники ---- */
function igraCard(id){
  var b = IG.p ? IG.p.bannery : [];
  for (var i = 0; i < b.length; i++) if (b[i].id === id) return b[i];
  return null;
}
function igraLabel(id){ var c = igraCard(id); return c ? c.podpis : ''; }
function igraIsNy(){ return !!(IG.p && IG.p.gz); }
/* ---- значки (SVG, одинаковые на всех системах) ---- */
var ICO = {
  up: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 10.5h3.6V21H2zM7.4 21h9.9c1 0 1.8-.7 2-1.6l1.6-7.3c.3-1.3-.7-2.6-2-2.6h-5.3l.8-3.9c.2-.8-.1-1.6-.6-2.1L12.9 2.6 7.4 8.4z" fill="currentColor"/></svg>',
  down: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 13.5h-3.6V3H22zM16.6 3H6.7c-1 0-1.8.7-2 1.6l-1.6 7.3c-.3 1.3.7 2.6 2 2.6h5.3l-.8 3.9c-.2.8.1 1.6.6 2.1l.9.9 5.5-5.8z" fill="currentColor"/></svg>',
  cards: '<svg class="ico-big" viewBox="0 0 64 64" aria-hidden="true"><rect x="9" y="12" width="28" height="40" rx="6" transform="rotate(-14 23 32)" fill="#fff" opacity=".55"/><rect x="25" y="10" width="28" height="40" rx="6" transform="rotate(12 39 30)" fill="#fff" opacity=".55"/><rect x="17" y="8" width="30" height="44" rx="6" fill="#fff"/><circle cx="32" cy="24" r="6" fill="#0aba59"/><path d="M22 44c1.6-6 5.4-9 10-9s8.4 3 10 9" fill="none" stroke="#0aba59" stroke-width="4" stroke-linecap="round"/><path d="M6 32h-4m4 0-3-3m3 3-3 3M58 32h4m-4 0 3-3m-3 3 3 3" stroke="#fff" stroke-width="2.6" stroke-linecap="round" fill="none"/></svg>',
  grid: '<svg class="ico-big" viewBox="0 0 64 64" aria-hidden="true"><rect x="6" y="8" width="52" height="14" rx="4" fill="currentColor" opacity=".18"/><rect x="6" y="25" width="52" height="14" rx="4" fill="currentColor" opacity=".18"/><rect x="6" y="42" width="52" height="14" rx="4" fill="currentColor" opacity=".18"/><rect x="9" y="11" width="16" height="8" rx="2" fill="currentColor"/><rect x="9" y="28" width="16" height="8" rx="2" fill="currentColor"/><rect x="9" y="45" width="16" height="8" rx="2" fill="currentColor"/><circle cx="45" cy="15" r="3.6" fill="#c9302a"/><circle cx="53" cy="15" r="3.6" fill="#0aba59"/><circle cx="45" cy="32" r="3.6" fill="#c9302a"/><circle cx="53" cy="32" r="3.6" fill="#0aba59"/><circle cx="45" cy="49" r="3.6" fill="#c9302a"/><circle cx="53" cy="49" r="3.6" fill="#0aba59"/></svg>',
  play: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="11" height="15" rx="2.5" transform="rotate(-10 8.5 12.5)" fill="currentColor" opacity=".55"/><rect x="9" y="3" width="11" height="16" rx="2.5" fill="currentColor"/></svg>'
};
function icoSpan(name){ var s = el('span', 'ico-w'); s.innerHTML = ICO[name]; return s; }

/* ---- форматы баннера в натуральных пропорциях ----
   vid: [{f: h|s|v, nazv, w, h, src, big}] из partii.json (превью v6). Нет vid: одна картинка img как есть. */
function igraVid(b, color){
  var v = color === 'g' ? (b.vid_g && b.vid_g.length ? b.vid_g : null) : (b.vid && b.vid.length ? b.vid : null);
  if (v) return v;
  if (color === 'g') return b.img_g ? [{ f: 'one', nazv: '', w: 0, h: 0, src: b.img_g, big: b.img_g_big || b.img_g }] : [];
  return [{ f: 'one', nazv: '', w: 0, h: 0, src: b.img, big: b.img_big || b.img }];
}
function igraColors(b){ return (b.vid_g && b.vid_g.length) || b.img_g ? ['w', 'g'] : ['w']; }
function igraColorName(c){ return c === 'g' ? 'зелёная' : 'светлая'; }
/* Галерея лайтбокса: все форматы одной карточки (оба цвета); ключ id|цвет|формат -> номер. */
function igraGallery(onlyId){
  var list = [], idx = {};
  (IG.p ? IG.p.bannery : []).forEach(function(b){
    if (onlyId && b.id !== onlyId) return;
    var cs = igraColors(b);
    cs.forEach(function(c){
      igraVid(b, c).forEach(function(v){
        idx[b.id + '|' + c + '|' + v.f] = list.length;
        var cap = b.podpis + (cs.length > 1 ? ', ' + igraColorName(c) : '') + (v.nazv ? ': ' + v.nazv.toLowerCase() + (v.w ? ' ' + v.w + '×' + v.h : '') : '');
        list.push({ src: v.big, alt: cap, cap: cap });
      });
    });
  });
  return { list: list, idx: idx };
}
function igraZoom(b, c, f){
  var g = igraGallery(b.id), i = g.idx[b.id + '|' + c + '|' + f];
  openLightbox(g.list[i || 0].src, g.list[i || 0].alt, g.list, i || 0);
}
/* Один набор форматов одного цвета. mode: row (ряд, на узком экране коллаж), cl (всегда коллаж, для игры), one (только горизонтальный). */
function igraFset(b, c, mode, zoom){
  var vids = igraVid(b, c);
  if (mode === 'one') { var h = vids.filter(function(v){ return v.f === 'h'; }); vids = h.length ? h : vids.slice(0, 1); }
  var row = el('div', 'frow' + (mode === 'cl' ? ' frow-cl' : '') + (mode === 'one' ? ' frow-one' : '') + (vids.length === 1 && mode !== 'one' ? ' frow-single' : ''));
  vids.forEach(function(v){
    var fig = el('figure', 'fbox f-' + v.f);
    var im = el('img'); im.src = v.src; im.alt = b.podpis + ', ' + igraColorName(c) + (v.nazv ? ', ' + v.nazv.toLowerCase() : ''); im.decoding = 'async'; im.loading = mode === 'cl' ? 'eager' : 'lazy';
    if (v.w) { im.width = v.w; im.height = v.h; }
    im.draggable = false;
    if (zoom) {
      var bt = el('button', 'fimg'); bt.type = 'button'; bt.setAttribute('aria-label', 'Открыть крупно: ' + im.alt);
      bt.appendChild(im); bt.addEventListener('click', function(e){ e.stopPropagation(); igraZoom(b, c, v.f); });
      fig.appendChild(bt);
    } else fig.appendChild(im);
    if (v.nazv && mode === 'row') fig.appendChild(el('figcaption', '', v.nazv + (v.w ? ' ' + v.w + '×' + v.h : '')));
    row.appendChild(fig);
  });
  return row;
}
/* Все цвета карточки: у Новогодних светлая и зелёная подписанными рядами. */
function igraFormats(b, mode, zoom){
  var box = el('div', 'fset fset-' + mode), cs = igraColors(b);
  cs.forEach(function(c){
    if (cs.length > 1) box.appendChild(el('div', 'fcol-lab', c === 'g' ? 'Зелёная версия' : 'Светлая версия'));
    box.appendChild(igraFset(b, c, mode, zoom));
  });
  return box;
}
/* Старое имя для совместимости (проверка ставки и другие вкладки): один горизонтальный формат на цвет. */
function igraImgs(b, cls, zoom){ return igraFormats(b, 'one', zoom); }
/* Метрики карточек: текущие (tek) или итог последнего закрытого тура этой лиги. */
function igraMetrics(p){
  var map = {}, src = '';
  /* пока тур принимает ставки, его собственные свежие цифры не показываем: иначе ставка делается с подсмотренным итогом */
  if (p && p.tek && p.tek.fakt && p.tek.fakt.length && !turnInfo(p).open) { src = 'now'; p.tek.fakt.forEach(function(f){ map[f.id] = f; }); }
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
function igraDraftKey(){ return kp() + 'draft_' + (IG.p ? IG.p.id : '') + '_' + STATE.me; }
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
  if (old) out.push({ p: old, t: 'Прошлая неделя, ещё открыта: ' + (old.nazvanie || 'Пять светлых баннеров') });
  return out;
}
function igraTourSub(p){
  return p.bannery.length + ' ' + plural(p.bannery.length, 'карточка', 'карточки', 'карточек') + '. Лучшие: ' + p.k + ', худшие: ' + p.h + '.';
}
function igraSelectTour(id){
  var p = getPartiya(id); if (!p) return;
  IG.p = p; STATE.partiya = p.id; STATE.liga = p.liga;
  IG.step = 'modes'; IG.mine = null; IG.chislo = null; IG.mineLoaded = false; IG.zakryta = false; IG.res = null; IG.sv = null; IG.fin = null; IG.sending = false; IG.note = '';
  IG.view = !turnInfo(p).open;
  STATE.draft = igraLoadDraft(); STATE.rezhim = STATE.draft ? STATE.draft.rezhim : '';
  unsavedGuard.set(igraDraftHas(STATE.draft));
  igraRedrawAll(); igraLoadMine();
}
/* klient: случайный id попытки, который страница сама шлёт в POST /stavka2 и запоминает
   на этом устройстве (localStorage). Свою ставку открытого тура сервер отдаёт только по нему. */
function igraKlientKey(pid, me){ return kp() + 'klient_' + pid + '_' + String(me || '').toLowerCase(); }
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
  if (setMe(n)) { var p = IG.p || igraFirstOpen(); if (p) igraSelectTour(p.id); else igraRedrawAll(); }
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
function renderIgra(){
  if (!DATA) return;
  if (STATE.me && !IG.p) { var p = igraFirstOpen(); if (p) { igraSelectTour(p.id); return; } }
  igraRedrawAll();
}

function igraMineNote(){
  var s = IG.mine; if (!s) return null;
  var t = IG.view ? 'Ваша ставка принята в ' + fmtTime(s.vremya) + '. Тур закрыт, изменить нельзя.' : 'Ваша ставка принята в ' + fmtTime(s.vremya) + ', можно изменить до закрытия.';
  var box = el('div', 'note note-ok'); box.setAttribute('data-test', 'mine');
  box.appendChild(el('div', '', t));
  var l = el('div', 'muted', 'Лучшие: ' + (s.top || []).map(igraLabel).join(', ') + '. Худшие: ' + (s.hudshie || []).map(igraLabel).join(', ') + '.' + (s.cvet ? ' Цвет: ' + (s.cvet === 'w' ? 'светлая' : 'зелёная') + '.' : ''));
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
    st.appendChild(igraModes()); body.appendChild(st); return;
  }
  if (step === 'final') { ruchnojRender(body, false, IG.fin); return; }
  if (step === 'ruchnoj') { ruchnojRender(body, false); return; }
  if (step === 'proverka') { proverkaRender(body); return; }
}
function igraModes(){
  var m = el('div', 'modes'), p = IG.p, n = p.bannery.length;
  var sv = svajpCur(p), done = !!(sv && sv.i >= sv.order.length);
  var b1 = el('button', 'mode mode-play'); b1.type = 'button'; b1.setAttribute('data-mode', 'svajp');
  b1.appendChild(icoSpan('cards'));
  var t1 = el('span', 'mode-body');
  t1.appendChild(el('span', 'mode-t', done ? 'Игра пройдена' : (sv ? 'Продолжить игру' : 'Играть по одному')));
  t1.appendChild(el('span', 'mode-s', done ? 'Понравились: ' + sv.like.length + '. Не понравились: ' + sv.nope.length + '. Осталось собрать из них ставку.' : sv ? 'Вы на баннере ' + (sv.i + 1) + ' из ' + n + '.' : 'Баннеры по одному на весь экран. Вправо: нравится, влево: нет. ' + n + ' ' + plural(n, 'баннер', 'баннера', 'баннеров') + ', около ' + Math.max(1, Math.round(n * 4 / 60)) + ' мин.'));
  t1.appendChild(el('span', 'mode-cta', done ? 'Собрать ставку' : (sv ? 'Продолжить' : 'Играть')));
  b1.appendChild(t1);
  b1.addEventListener('click', function(){ sound.play('tap'); igraStartMode('svajp'); });
  var b2 = el('button', 'mode mode-hand'); b2.type = 'button'; b2.setAttribute('data-mode', 'ruchnoj');
  b2.appendChild(icoSpan('grid'));
  var t2 = el('span', 'mode-body');
  t2.appendChild(el('span', 'mode-t', 'Расставлю сам'));
  t2.appendChild(el('span', 'mode-s', 'Все баннеры списком, крупно. Под каждым две кнопки: слева «худшая», справа «лучшая».'));
  t2.appendChild(el('span', 'mode-cta', 'Открыть список'));
  b2.appendChild(t2);
  b2.addEventListener('click', function(){ sound.play('tap'); igraStartMode('ruchnoj'); });
  m.appendChild(b1); m.appendChild(b2);
  if (!sv) return m;
  var w = el('div', 'modes-wrap'); w.appendChild(m);
  var again = igraBtn('Сыграть заново', 'btn-line', function(){ svajpDrop(p); IG.sv = null; igraStartMode('svajp'); }); again.id = 'svAgain';
  var r = el('div', 'btn-row'); r.appendChild(again); w.appendChild(r);
  return w;
}
function igraStartMode(mode){
  if (mode === 'svajp') {
    var cur = svajpCur(IG.p);
    if (cur && cur.i >= cur.order.length) { svajpFinish(); return; }
    if (!cur) { IG.sv = svajpNew(IG.p); svajpSave(); }
    IG.step = 'modes'; igraDrawBody(); svajpOpen(); return;
  }
  /* черновик из игры не стираем: его отметки переходят в общий список */
  if (igraDraftHas(STATE.draft)) { IG.fin = null; IG.step = 'ruchnoj'; igraDrawBody(); var bb = $('igraBody'); if (bb) bb.scrollIntoView({ block: 'start', behavior: 'auto' }); return; }
  STATE.draft = igraNewDraft('ruchnoj'); STATE.rezhim = 'ruchnoj'; IG.res = null; IG.fin = null;
  IG.step = 'ruchnoj';
  igraDrawBody();
  var b = $('igraBody'); if (b) b.scrollIntoView({ block: 'start', behavior: 'auto' });
}
/* Кнопка «Играть» в шапке: имя → первый открытый тур → игра по одному. */
function igraFirstOpen(){
  var t = igraTours().filter(function(x){ return turnInfo(x.p).open; });
  return t.length ? t[0].p : null;
}
function igraPlay(){
  if (!STATE.me) { igraRedrawAll(); igraFocusName(); IG.note = ''; var nb = $('igraNameBox'); if (nb && !nb.querySelector('.note-bad')) nb.appendChild(igraNote('note-bad', 'Сначала выберите, кто играет.')); return; }
  if (!IG.p || IG.view) { var p = igraFirstOpen(); if (!p) { igraRedrawAll(); return; } igraSelectTour(p.id); }
  igraStartMode('svajp');
}
window.igraPlay = igraPlay;

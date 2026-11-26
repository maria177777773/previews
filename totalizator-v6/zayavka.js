/* zayavka.js: вкладка «Свой баннер» (контракт п.5 и п.7). Заполняет #s-zayavka при каждом показе вкладки.
   Состояние живёт в объекте ZY и переживает смену вкладок. DOM строится через el() и textContent, без innerHTML.
   ВАЖНО: файл не ужимается. Размеры и тип читаются из байтов файла ДО отправки, как это делает сервер. */
'use strict';

/* ---- Таблица правил формата РСЯ. ----
   ИСТОЧНИК (копия констант серверной части, блок «Таблица правил формата РСЯ»,
   строки с RSYA_FIXED, RSYA_FIXED_MAX_BYTES, RSYA_TEXT_MAX_BYTES, RSYA_STD_SIDE, RSYA_WIDE_MIN, RSYA_WIDE_MAX, RSYA_WIDE_TOL).
   Первоисточник: Яндекс Директ API, объект AdImage, «Требования к изображениям»; справка Директа «Изображения в объявлении».
   Расхождение этой таблицы с сервером ловит автотест. Менять только вместе с серверной частью. */
var ZY_FIXED = [[240,400],[300,250],[300,500],[300,600],[320,50],[320,100],[320,480],[336,280],[480,320],[480,800],[600,500],[600,1000],[600,1200],[640,100],[640,200],[640,960],[672,560],[720,1200],[728,90],[900,750],[900,1500],[900,1800],[960,150],[960,300],[960,640],[960,1440],[960,1600],[970,250],[1008,840],[1200,1000],[1200,2000],[1200,2400],[1280,200],[1280,400],[1280,1920],[1344,1120],[1440,960],[1456,180],[1920,1280],[1940,500],[2184,270],[2910,750],[2912,360],[3880,1000]];
var ZY_FIXED_MAX_BYTES = 512 * 1024;      // графический баннер: файл не больше 512 КБ
var ZY_TEXT_MAX_BYTES = 10 * 1024 * 1024; // картинка текстово-графического объявления: не больше 10 МБ (наш предел ниже)
var ZY_FILE_MAX = 3 * 1024 * 1024;        // наш предел файла заявки (MAX_ZAYAVKA_IMG на сервере)
var ZY_STD_SIDE = [450, 5000];            // стандартная картинка: каждая сторона 450-5000 px, пропорция от 3:4 до 4:3
var ZY_WIDE_MIN = [1080, 607];            // широкая 16:9: от 1080x607
var ZY_WIDE_MAX = [5000, 2812];           // до 5000x2812, допуск пропорции 0,5% (RSYA_WIDE_TOL)
var ZY_TITLE_MAX = 60;

var ZY = {
  file: null, buf: null, info: null, verdict: null, zag: '', klient: '', sendKey: '', url: '',
  reading: false, readTok: 0, sending: false, retry: false, res: null,
  sent: [], srv: { state: '', list: [], tok: 0 }, nameErr: ''
};

/* ---- проверка размеров: точный порт серверной проверки формата ---- */
function zyIsFixed(w, h){
  for (var i = 0; i < ZY_FIXED.length; i++) if (ZY_FIXED[i][0] === w && ZY_FIXED[i][1] === h) return true;
  return false;
}
function zyFormaty(w, h, nbytes){
  var list = [], heavy = false;
  if (zyIsFixed(w, h)) {
    if (nbytes <= ZY_FIXED_MAX_BYTES) list.push({ tip: 'graficheskij', tekst: 'графический баннер ' + w + '×' + h });
    else heavy = true;
  }
  if (nbytes <= ZY_TEXT_MAX_BYTES) {
    var lo = ZY_STD_SIDE[0], hi = ZY_STD_SIDE[1];
    if (lo <= w && w <= hi && lo <= h && h <= hi && 3 * h <= 4 * w && 3 * w <= 4 * h)
      list.push({ tip: 'standart', tekst: 'картинка для текстово-графического объявления (стандартная)' });
    if (ZY_WIDE_MIN[0] <= w && w <= ZY_WIDE_MAX[0] && ZY_WIDE_MIN[1] <= h && h <= ZY_WIDE_MAX[1] && Math.abs(w * 9 - h * 16) * 200 <= h * 16)
      list.push({ tip: 'shirokaya', tekst: 'картинка для текстово-графического объявления (широкая 16:9)' });
  }
  return { list: list, why: (heavy && !list.length) ? 'tyazhelyj' : '' };
}
function zyReason(w, h, why){
  if (why === 'tyazhelyj') return 'Файл ' + w + '×' + h + ' для графического баннера должен быть не больше 512 КБ.';
  return 'Размер ' + w + '×' + h + ' не подходит для Директа. Нужен готовый баннер (например 300×250, 240×400, 728×90, 300×600), ' +
    'либо картинка в пропорции от 3:4 до 4:3 (от 450 пикселей по стороне), либо 16:9 (от 1080×607).';
}

/* ---- размеры из байтов файла: порт серверных функций чтения размера картинки ---- */
function zyJpegSize(b){
  if (b.length < 4 || b[0] !== 0xFF || b[1] !== 0xD8 || b[2] !== 0xFF) return null;
  var i = 2;
  while (i + 4 <= b.length) {
    if (b[i] !== 0xFF) return null;
    var m = b[i + 1];
    if (m === 0xFF) { i += 1; continue; }
    if (m === 0xD8 || m === 0x01 || (m >= 0xD0 && m <= 0xD7)) { i += 2; continue; }
    var ln = (b[i + 2] << 8) | b[i + 3];
    if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC) {
      if (i + 9 > b.length) return null;
      var h = (b[i + 5] << 8) | b[i + 6], w = (b[i + 7] << 8) | b[i + 8];
      return (w && h) ? [w, h] : null;
    }
    if (m === 0xDA || m === 0xD9) return null;
    i += 2 + ln;
  }
  return null;
}
function zyU32(b, i){ return b[i] * 16777216 + ((b[i + 1] << 16) | (b[i + 2] << 8) | b[i + 3]); }
function zyPngSize(b){
  var sig = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A], k;
  if (b.length < 24) return null;
  for (k = 0; k < 8; k++) if (b[k] !== sig[k]) return null;
  if (b[12] !== 0x49 || b[13] !== 0x48 || b[14] !== 0x44 || b[15] !== 0x52) return null;
  var w = zyU32(b, 16), h = zyU32(b, 20);
  return (w && h) ? [w, h] : null;
}
function zyGifSize(b){
  if (b.length < 10) return null;
  var s = String.fromCharCode(b[0], b[1], b[2], b[3], b[4], b[5]);
  if (s !== 'GIF87a' && s !== 'GIF89a') return null;
  var w = b[6] | (b[7] << 8), h = b[8] | (b[9] << 8);
  return (w && h) ? [w, h] : null;
}
/* -> { fmt: 'jpeg'|'png'|'gif', w, h } или null */
function zyInfo(b){
  var fns = [['jpeg', zyJpegSize], ['png', zyPngSize], ['gif', zyGifSize]];
  for (var i = 0; i < fns.length; i++) { var wh = fns[i][1](b); if (wh) return { fmt: fns[i][0], w: wh[0], h: wh[1] }; }
  return null;
}
function zyB64(u8){
  var s = '', CH = 0x8000;
  for (var i = 0; i < u8.length; i += CH) s += String.fromCharCode.apply(null, u8.subarray(i, i + CH));
  return btoa(s);
}
function zyBytes(n){
  if (n < 1024) return n + ' байт';
  if (n < 1024 * 1024) return Math.round(n / 1024) + ' КБ';
  return (n / 1048576).toFixed(1).replace('.', ',') + ' МБ';
}

/* ---- локальный список отправленных на этом устройстве ---- */
function zyLsKey(){ return 'tot5_zayavki_' + String(STATE.me || '').toLowerCase(); }
function zyLsGet(){ try { var a = JSON.parse(ls(zyLsKey()) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
function zyLsAdd(rec){
  var a = zyLsGet().filter(function(x){ return x.id !== rec.id; }); a.unshift(rec);
  ls(zyLsKey(), JSON.stringify(a.slice(0, 10)));
}

/* ---- разметка ---- */
function zyNote(cls, text){ return el('p', 'note ' + (cls || ''), text); }
function zyReady(){
  return !!(STATE.me && ZY.file && ZY.verdict && ZY.verdict.ok && ZY.zag.trim() && !ZY.sending && !ZY.reading);
}
function zyMissing(){
  var m = [];
  if (!STATE.me) m.push('выберите имя');
  if (!ZY.file) m.push('выберите файл с баннером');
  else if (ZY.reading) m.push('подождите, файл читается');
  else if (!ZY.verdict || !ZY.verdict.ok) m.push('выберите файл подходящего размера');
  if (!ZY.zag.trim()) m.push('напишите заголовок');
  return m;
}

function renderZayavka(){
  var box = $('s-zayavka');
  if (!box) return;
  box.textContent = '';
  var warn = el('div', 'zy-warn');
  warn.appendChild(el('p', 'zy-warn-t', 'Игра ничего не запускает сама: баннер в Директ ставит команда «Каталист» после проверки'));
  box.appendChild(warn);

  box.appendChild(el('h2', null, 'Свой баннер'));
  box.appendChild(el('p', 'zy-lead', 'Нарисовали свой баннер? Загрузите его, и он может попасть в реальную рекламу агентства «Каталист» в Яндекс Директе. Страница сама проверит размер файла и скажет, подходит ли он.'));
  var rules = el('ul', 'zy-rules');
  [
    'Файл JPEG, PNG или GIF до 3 МБ. Мы его не сжимаем: размер считается по исходному файлу.',
    'Заголовок до ' + ZY_TITLE_MAX + ' знаков.',
    'Не больше 4 заявок за 10 минут и не больше 5 заявок в сутки от одного имени.',
    'Отправили заявку: получаете значок «Автор».'
  ].forEach(function(t){ rules.appendChild(el('li', null, t)); });
  box.appendChild(rules);
  box.appendChild(zySizesBox());

  var name = el('div', 'zy-block'); name.id = 'zyName'; box.appendChild(name);

  var step = el('div', 'zy-block');
  step.appendChild(el('h3', null, 'Файл'));
  var drop = el('label', 'zy-drop'); drop.id = 'zyDrop';
  var dt = el('span', 'zy-drop-t', 'Перетащите файл сюда или нажмите, чтобы выбрать');
  var ds = el('span', 'zy-drop-s', 'JPEG, PNG или GIF, до 3 МБ');
  var inp = el('input', 'zy-file'); inp.type = 'file'; inp.id = 'zyFile'; inp.accept = 'image/jpeg,image/png,image/gif'; inp.setAttribute('aria-label', 'Файл с баннером');
  inp.addEventListener('change', function(){ if (inp.files && inp.files[0]) zyPick(inp.files[0]); inp.value = ''; });
  ['dragenter', 'dragover'].forEach(function(ev){ drop.addEventListener(ev, function(e){ e.preventDefault(); if (!ZY.sending) drop.classList.add('over'); }); });
  ['dragleave', 'dragend'].forEach(function(ev){ drop.addEventListener(ev, function(){ drop.classList.remove('over'); }); });
  drop.addEventListener('drop', function(e){
    e.preventDefault(); drop.classList.remove('over');
    var f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    if (f && !ZY.sending) zyPick(f);
  });
  drop.appendChild(dt); drop.appendChild(ds); drop.appendChild(inp);
  step.appendChild(drop);
  var facts = el('div'); facts.id = 'zyFacts'; step.appendChild(facts);
  var verdict = el('div'); verdict.id = 'zyVerdict'; verdict.setAttribute('aria-live', 'polite'); step.appendChild(verdict);
  box.appendChild(step);

  var st2 = el('div', 'zy-block');
  st2.appendChild(el('h3', null, 'Заголовок'));
  var zl = el('label', 'zy-lab', 'Короткий заголовок объявления'); zl.setAttribute('for', 'zyZag');
  var zi = el('input', 'inp zy-zag'); zi.id = 'zyZag'; zi.type = 'text'; zi.maxLength = ZY_TITLE_MAX; zi.value = ZY.zag; zi.autocomplete = 'off';
  zi.placeholder = 'Например: Тимбилдинг на крыше';
  zi.addEventListener('input', function(){ ZY.zag = zi.value; zyDrawCount(); zyDrawPrev(); zyDrawHint(); zyDrawBtn(); });
  st2.appendChild(zl); st2.appendChild(zi);
  var cnt = el('p', 'zy-count'); cnt.id = 'zyCount'; st2.appendChild(cnt);
  box.appendChild(st2);

  var prev = el('div', 'zy-block'); prev.id = 'zyPrev'; box.appendChild(prev);

  var hint = el('p', 'hint'); hint.id = 'zyHint'; hint.setAttribute('aria-live', 'polite'); box.appendChild(hint);
  var row = el('div', 'btn-row zy-send-row');
  var btn = el('button', 'btn', 'Тоже запустить в Директ'); btn.type = 'button'; btn.id = 'zySend';
  btn.addEventListener('click', zySend);
  row.appendChild(btn); box.appendChild(row);
  var res = el('div'); res.id = 'zyRes'; res.setAttribute('aria-live', 'polite'); box.appendChild(res);

  var mine = el('div', 'zy-mine');
  mine.appendChild(el('h2', null, 'Мои заявки'));
  var list = el('div'); list.id = 'zyList'; mine.appendChild(list);
  box.appendChild(mine);

  zyDrawAll();
  zyLoadList();
}

function zySizesBox(){
  var d = el('details', 'zy-sizes');
  d.appendChild(el('summary', null, 'Какие размеры подходят'));
  var inner = el('div', 'zy-sizes-in');
  inner.appendChild(el('p', null, 'Готовый баннер: ровно один из ' + ZY_FIXED.length + ' размеров из списка ниже, файл до 512 КБ.'));
  var ch = el('p', 'zy-chips');
  ZY_FIXED.forEach(function(s){ ch.appendChild(el('span', 'zy-size', s[0] + '×' + s[1])); });
  inner.appendChild(ch);
  inner.appendChild(el('p', null, 'Картинка для текстово-графического объявления: стороны от ' + ZY_STD_SIDE[0] + ' до ' + ZY_STD_SIDE[1] + ' пикселей, пропорция от 3:4 до 4:3.'));
  inner.appendChild(el('p', null, 'Широкая картинка 16:9: от ' + ZY_WIDE_MIN[0] + '×' + ZY_WIDE_MIN[1] + ' до ' + ZY_WIDE_MAX[0] + '×' + ZY_WIDE_MAX[1] + ' пикселей.'));
  d.appendChild(inner);
  return d;
}

/* ---- перерисовка частей ---- */
function zyDrawAll(){ zyDrawName(); zyDrawFacts(); zyDrawVerdict(); zyDrawCount(); zyDrawPrev(); zyDrawHint(); zyDrawBtn(); zyDrawRes(); zyDrawList(); zyDrawDrop(); }

function zyDrawDrop(){
  var drop = $('zyDrop'), inp = $('zyFile');
  if (!drop || !inp) return;
  inp.disabled = ZY.sending; drop.classList.toggle('off', ZY.sending);
}
function zyDrawName(){
  var box = $('zyName');
  if (!box) return;
  box.textContent = '';
  box.appendChild(el('h3', null, 'Кто отправляет'));
  if (STATE.me) {
    var row = el('div', 'zy-row');
    var p = el('p', 'zy-who', 'Заявка от имени: '); p.appendChild(el('b', null, STATE.me));
    var b = el('button', 'btn btn-line', 'Сменить имя'); b.type = 'button';
    b.addEventListener('click', function(){ showTab('igra'); setTimeout(function(){ if (typeof igraFocusName === 'function') igraFocusName(); }, 60); });
    row.appendChild(p); row.appendChild(b); box.appendChild(row);
  } else {
    box.appendChild(el('p', null, 'Чтобы отправить заявку, введите имя. Это то же имя, под которым вы играете.'));
    var r2 = el('div', 'other-box');
    var inp = el('input', 'inp'); inp.type = 'text'; inp.id = 'zyNameInp'; inp.maxLength = 24; inp.placeholder = 'Ваше имя'; inp.setAttribute('aria-label', 'Ваше имя'); inp.autocomplete = 'off';
    var ok = el('button', 'btn', 'Запомнить имя'); ok.type = 'button';
    function go(){
      var v = inp.value.trim();
      if (!v) { ZY.nameErr = 'Введите имя.'; zyDrawName(); return; }
      if (!setMe(v)) { ZY.nameErr = 'Имя не подошло: до 24 букв, цифр, пробелов, точек и дефисов. Имя Claude занято.'; zyDrawName(); }
      else ZY.nameErr = '';
    }
    ok.addEventListener('click', go);
    inp.addEventListener('keydown', function(e){ if (e.key === 'Enter') { e.preventDefault(); go(); } });
    r2.appendChild(inp); r2.appendChild(ok); box.appendChild(r2);
    if (ZY.nameErr) box.appendChild(zyNote('note-bad', ZY.nameErr));
  }
}
function zyFact(dl, k, v){ dl.appendChild(el('dt', null, k)); dl.appendChild(el('dd', null, v)); }
function zyDrawFacts(){
  var box = $('zyFacts');
  if (!box) return;
  box.textContent = '';
  if (!ZY.file) return;
  var dl = el('dl', 'zy-facts');
  zyFact(dl, 'Файл', ZY.file.name);
  if (ZY.info) {
    zyFact(dl, 'Тип', ZY.info.fmt === 'jpeg' ? 'JPEG' : ZY.info.fmt === 'png' ? 'PNG' : 'GIF');
    zyFact(dl, 'Размер картинки', ZY.info.w + '×' + ZY.info.h + ' пикселей');
  } else if (!ZY.reading && ZY.file.size <= ZY_FILE_MAX) {
    zyFact(dl, 'Тип', 'не картинка JPEG, PNG или GIF');
  }
  zyFact(dl, 'Вес', zyBytes(ZY.file.size));
  box.appendChild(dl);
}
function zyDrawVerdict(){
  var box = $('zyVerdict');
  if (!box) return;
  box.textContent = '';
  if (!ZY.file) return;
  if (ZY.reading) { box.appendChild(zyNote('', 'Читаю файл…')); return; }
  if (!ZY.verdict) return;
  var n = zyNote(ZY.verdict.ok ? 'note-ok zy-verdict' : 'note-bad zy-verdict', ZY.verdict.text);
  n.id = 'zyVerdictText';
  box.appendChild(n);
}
function zyDrawCount(){
  var c = $('zyCount');
  if (c) c.textContent = 'Знаков: ' + ZY.zag.length + ' из ' + ZY_TITLE_MAX;
}
function zyDrawPrev(){
  var box = $('zyPrev');
  if (!box) return;
  box.textContent = '';
  if (!ZY.file || !ZY.url) return;
  box.appendChild(el('h3', null, 'Как это выглядит'));
  var card = el('div', 'zy-prev');
  var ib = el('button', 'zy-prev-img'); ib.type = 'button'; ib.setAttribute('aria-label', 'Открыть баннер крупно');
  var im = el('img'); im.src = ZY.url; im.alt = 'Ваш баннер';
  ib.appendChild(im);
  ib.addEventListener('click', function(){ openLightbox(ZY.url, 'Ваш баннер'); });
  var cap = el('p', 'zy-prev-t', ZY.zag.trim() || 'Здесь появится ваш заголовок');
  card.appendChild(ib); card.appendChild(cap); box.appendChild(card);
}
function zyDrawHint(){
  var h = $('zyHint');
  if (!h) return;
  var m = zyMissing();
  h.classList.toggle('ready', !m.length && !ZY.sending);
  if (ZY.sending) h.textContent = 'Отправляем заявку, не закрывайте страницу.';
  else h.textContent = m.length ? 'Чтобы отправить: ' + m.join(', ') + '.' : 'Всё готово. Нажмите «Тоже запустить в Директ».';
}
function zyDrawBtn(){
  var b = $('zySend');
  if (!b) return;
  b.textContent = ZY.sending ? 'Отправляем…' : (ZY.retry && ZY.file ? 'Отправить ещё раз' : 'Тоже запустить в Директ');
  b.disabled = !zyReady();
}
function zyDrawRes(){
  var box = $('zyRes');
  if (!box) return;
  box.textContent = '';
  var r = ZY.res;
  if (!r) return;
  var w = el('div', 'res ' + (r.ok ? 'res-ok' : 'res-bad')); w.id = 'zyResBox';
  w.appendChild(el('h3', 'res-h', r.title));
  if (r.ok) {
    if (r.format) w.appendChild(el('p', 'res-p', r.format));
    w.appendChild(el('p', 'res-p', 'Мы проверим заявку и поставим баннер в Директ при следующей партии. Статус смотрите ниже, в разделе «Мои заявки».'));
    if (r.povtor) w.appendChild(el('p', 'res-p', 'Эта заявка уже была принята раньше, второй копии нет.'));
  } else {
    w.appendChild(el('p', 'res-p', r.text));
  }
  box.appendChild(w);
}

/* ---- выбор и чтение файла ---- */
function zyResetFile(){
  ZY.file = null; ZY.buf = null; ZY.info = null; ZY.verdict = null; ZY.url = '';
  ZY.reading = false; ZY.readTok++;
}
function zyPick(file){
  ZY.res = null; ZY.retry = false; ZY.sendKey = '';
  var tok = ++ZY.readTok;
  ZY.file = file; ZY.buf = null; ZY.info = null; ZY.verdict = null; ZY.reading = false;
  if (ZY.url) { try { URL.revokeObjectURL(ZY.url); } catch (e) {} ZY.url = ''; }
  if (file.size > ZY_FILE_MAX) {
    ZY.verdict = { ok: false, text: 'Файл весит ' + zyBytes(file.size) + ', а нужно не больше 3 МБ. Сожмите картинку и выберите файл заново.' };
    zyDrawAll(); return;
  }
  try { ZY.url = URL.createObjectURL(file); } catch (e) { ZY.url = ''; }
  ZY.reading = true; zyDrawAll();
  var fr = new FileReader();
  fr.onload = function(){
    if (tok !== ZY.readTok) return;
    ZY.reading = false;
    var u8 = new Uint8Array(fr.result);
    var info = zyInfo(u8);
    if (!info) {
      ZY.url = ''; ZY.info = null;
      ZY.verdict = { ok: false, text: 'Файл не прочитался. Нужна картинка JPEG, PNG или GIF.' };
    } else {
      ZY.buf = u8; ZY.info = info;
      var f = zyFormaty(info.w, info.h, file.size);
      if (f.list.length) ZY.verdict = { ok: true, text: 'Подходит для: ' + f.list.map(function(x){ return x.tekst; }).join('; ') };
      else ZY.verdict = { ok: false, text: zyReason(info.w, info.h, f.why) };
    }
    zyDrawAll();
  };
  fr.onerror = function(){
    if (tok !== ZY.readTok) return;
    ZY.reading = false; ZY.verdict = { ok: false, text: 'Файл не прочитался. Выберите его заново.' };
    zyDrawAll();
  };
  fr.readAsArrayBuffer(file);
}

/* ---- отправка ---- */
function zyFail(r){
  var j = r.json || {}, kod = j.kod || '';
  var title = (kod === 'razmer_zayavki' || kod === 'format_zayavki') ? 'Не подошла' : 'Заявка не отправлена';
  var text = typeof j.oshibka === 'string' && j.oshibka ? j.oshibka : '';
  var retry = false;
  if (r.net) { text = 'Нет связи с сервером. Заявка не отправлена, файл остался выбранным. Нажмите «Отправить ещё раз».'; retry = true; }
  else if (!text) {
    if (r.status === 413) text = 'Файл слишком большой для сервера. Нужен файл до 3 МБ.';
    else if (r.status === 429) text = 'Слишком часто. Подождите несколько минут и отправьте ещё раз.';
    else { text = 'Сервер ответил непонятно. Подождите минуту и нажмите «Отправить ещё раз».'; retry = true; }
  }
  return { ok: false, title: title, text: text, retry: retry };
}
/* Отправка заявки: свой fetch вместо apiPost, потому что apiPost ждёт 15 с, а файл до 3 МБ (около 4 МБ в base64)
   на медленной сети не успевает. Таймаут 60 с, те же правила повтора (2 повтора, пауза 700 мс * номер попытки),
   тот же klient в каждой попытке, тот же вид ответа {ok,status,json,net}. core.js не правился. */
var ZY_POST_TIMEOUT_MS = 60000, ZY_POST_RETRIES = 2, ZY_POST_PAUSE_MS = 700;
function zyPost(path, body){
  var url = apiUrl(path), attempt = 0;
  return new Promise(function(resolve){
    function once(){
      attempt++;
      var done = false, ctl = ('AbortController' in window) ? new AbortController() : null;
      function fail(kind){
        if (attempt <= ZY_POST_RETRIES) setTimeout(once, ZY_POST_PAUSE_MS * attempt);
        else resolve({ ok: false, status: 0, json: null, net: kind });
      }
      var timer = setTimeout(function(){ if (done) return; done = true; if (ctl) try { ctl.abort(); } catch (e) {} fail('tajmaut'); }, ZY_POST_TIMEOUT_MS);
      fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), cache: 'no-store', signal: ctl ? ctl.signal : undefined })
        .then(function(r){
          return r.text().then(function(t){
            if (done) return; done = true; clearTimeout(timer);
            var j = null; try { j = JSON.parse(t); } catch (e) { j = null; }
            resolve({ ok: r.ok, status: r.status, json: j, net: null });
          });
        })
        .catch(function(){ if (done) return; done = true; clearTimeout(timer); fail('set'); });
    }
    once();
  });
}
function zySend(){
  if (!zyReady()) return;
  var zag = ZY.zag.trim();
  var key = [ZY.file.name, ZY.file.size, ZY.file.lastModified, zag, STATE.me].join('|');
  if (ZY.sendKey !== key || !ZY.klient) { ZY.klient = newKlient(); ZY.sendKey = key; }
  ZY.sending = true; ZY.res = null; zyDrawAll();
  var info = ZY.info, imya = STATE.me, url = ZY.url;
  zyPost('/zavod/tot/zayavka', { imya: imya, zagolovok: zag, img: zyB64(ZY.buf), w: info.w, h: info.h, klient: ZY.klient }).then(function(r){
    ZY.sending = false;
    var j = r.json;
    if (!r.net && r.ok && j && j.ok) {
      ZY.res = { ok: true, title: 'Заявка принята', format: j.format || '', povtor: !!j.povtor };
      var rec = { id: j.id || ('local-' + Date.now()), imya: imya, zagolovok: zag, vremya: new Date().toISOString(), status: j.status || 'prinyata', prichina: '' };
      zyLsAdd(rec);
      ZY.sent.unshift({ id: rec.id, imya: imya, zagolovok: zag, vremya: rec.vremya, status: rec.status, prichina: '', src: url });
      ZY.file = null; ZY.buf = null; ZY.info = null; ZY.verdict = null; ZY.url = ''; ZY.zag = ''; ZY.sendKey = ''; ZY.retry = false;
      var zi = $('zyZag'); if (zi) zi.value = '';
      if (typeof sound !== 'undefined') sound.play('ok'); if (typeof buzz === 'function') buzz(30);
      zyLoadList();
    } else {
      var f = zyFail(r);
      ZY.res = f; ZY.retry = f.retry;
      if (typeof sound !== 'undefined') sound.play('err');
    }
    zyDrawAll();
  });
}

/* ---- мои заявки ---- */
function zyLoadList(){
  var tok = ++ZY.srv.tok;
  ZY.srv.state = 'loading'; zyDrawList();
  apiGet('/zavod/tot/zayavki').then(function(r){
    if (tok !== ZY.srv.tok) return;
    if (!r.net && r.ok && r.json && r.json.ok && Array.isArray(r.json.zayavki)) { ZY.srv.state = 'ok'; ZY.srv.list = r.json.zayavki; }
    else ZY.srv.state = 'fail';
    zyDrawList();
  });
}
function zyAllMine(){
  var me = String(STATE.me || '').toLowerCase(), seen = {}, out = [];
  if (!me) return out;
  function add(z, src){
    if (!z || !z.id || String(z.imya || '').toLowerCase() !== me || seen[z.id]) return;
    seen[z.id] = 1; z.src = src; out.push(z);
  }
  ZY.srv.list.forEach(function(z){ add({ id: z.id, imya: z.imya, zagolovok: z.zagolovok, vremya: z.vremya, status: z.status, prichina: z.prichina }, z.img_url ? apiUrl(z.img_url) : ''); });
  ((RATE && RATE.zayavki) || []).forEach(function(z){ add({ id: z.id, imya: z.imya, zagolovok: z.zagolovok, vremya: z.vremya, status: z.status, prichina: z.prichina }, z.img || ''); });
  ZY.sent.forEach(function(z){ add({ id: z.id, imya: z.imya, zagolovok: z.zagolovok, vremya: z.vremya, status: z.status, prichina: z.prichina }, z.src || ''); });
  zyLsGet().forEach(function(z){ add(z, ''); });
  out.sort(function(a, b){ return String(b.vremya || '') < String(a.vremya || '') ? -1 : String(b.vremya || '') > String(a.vremya || '') ? 1 : 0; });
  return out;
}
function zyStatusText(z){
  var s = z.status;
  if (s === 'proverena') return 'Проверена, ждёт партии';
  if (s === 'zapushchena') return 'Запущена в Директ';
  if (s === 'otklonena') return z.prichina ? 'Не подошла: ' + z.prichina : 'Не подошла';
  return 'Заявка принята';
}
function zyDrawList(){
  var box = $('zyList');
  if (!box) return;
  box.textContent = '';
  if (!STATE.me) { box.appendChild(zyNote('', 'Выберите имя, и здесь появятся ваши заявки.')); return; }
  if (ZY.srv.state === 'fail') box.appendChild(zyNote('', 'Список с сервера не загрузился. Ниже заявки, которые сохранены на этом устройстве.'));
  var items = zyAllMine();
  if (!items.length) {
    box.appendChild(zyNote('', ZY.srv.state === 'loading' ? 'Загружаю ваши заявки…' : 'Заявок пока нет. Загрузите баннер выше, и он появится здесь.'));
    return;
  }
  var ul = el('ul', 'zy-list');
  items.forEach(function(z){
    var li = el('li', 'zy-item zy-st-' + (['proverena', 'zapushchena', 'otklonena'].indexOf(z.status) >= 0 ? z.status : 'prinyata'));
    var th = el('div', 'zy-thumb');
    if (z.src) {
      var im = el('img'); im.src = z.src; im.alt = 'Баннер: ' + z.zagolovok; im.loading = 'lazy';
      im.addEventListener('error', function(){ th.textContent = ''; th.appendChild(el('span', 'zy-nopic', 'Без картинки')); });
      var ib = el('button', 'zy-thumb-b'); ib.type = 'button'; ib.setAttribute('aria-label', 'Открыть баннер крупно');
      ib.appendChild(im); ib.addEventListener('click', function(){ openLightbox(z.src, 'Баннер: ' + z.zagolovok); });
      th.appendChild(ib);
    } else th.appendChild(el('span', 'zy-nopic', 'Без картинки'));
    var tx = el('div', 'zy-item-tx');
    tx.appendChild(el('p', 'zy-item-t', z.zagolovok));
    var d = fmtDate(z.vremya), t = fmtTime(z.vremya);
    if (d) tx.appendChild(el('p', 'muted zy-item-d', d + (t ? ', ' + t : '')));
    tx.appendChild(el('p', 'zy-badge', zyStatusText(z)));
    li.appendChild(th); li.appendChild(tx); ul.appendChild(li);
  });
  box.appendChild(ul);
}

on('me:changed', function(){
  if (typeof CUR_TAB !== 'undefined' && CUR_TAB === 'zayavka') { ZY.nameErr = ''; zyDrawName(); zyDrawHint(); zyDrawBtn(); zyDrawList(); }
});

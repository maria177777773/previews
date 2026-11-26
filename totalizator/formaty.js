/* formaty.js: вкладка «Форматы». Перенос из старой страницы (site-src/index.html: FM, FF, SZ, SHOWW, loadFm, chipRow, fmImg, fmMeta, fmCard, renderFormaty).
   Данные: formaty.json рядом со страницей, картинки в img/formaty/. Заполняет #s-formaty при каждом показе вкладки.
   DOM строится через el() и textContent, без innerHTML. Стили fm-* лежат в zayavka.css. */
'use strict';

var FMD = { data: null, loading: false, failed: false, tok: 0, f: 'all', g: 'all', s: 'all' };
var FM_SIZES = [['all', 'Все размеры'], ['gor', 'Широкие'], ['kv', 'Квадратные'], ['ver', 'Высокие']];
var FM_SHOWW = { '300x250': 300, '300x600': 200, '728x90': 520, '240x400': 200, '1080x607': 360, '1080x1080': 260 };

function fmLoad(){
  var tok = ++FMD.tok;
  FMD.loading = true; FMD.failed = false;
  fetch('formaty.json', { cache: 'no-store' }).then(function(r){
    if (!r.ok) throw new Error('http ' + r.status);
    return r.json();
  }).then(function(j){
    if (tok !== FMD.tok) return;
    if (!j || !Array.isArray(j.formaty) || !Array.isArray(j.items)) throw new Error('формат');
    FMD.data = j; FMD.loading = false; renderFormaty();
  }).catch(function(){
    if (tok !== FMD.tok) return;
    FMD.loading = false; FMD.failed = true; renderFormaty();
  });
}

function fmChipRow(box, title, list, key){
  var f = el('div', 'fm-fil');
  f.appendChild(el('h3', 'fm-fil-h', title));
  var c = el('div', 'fm-chips');
  list.forEach(function(x){
    var b = el('button', 'chip', x[1]); b.type = 'button';
    b.setAttribute('aria-pressed', FMD[key] === x[0] ? 'true' : 'false');
    if (FMD[key] === x[0]) b.classList.add('on');
    b.addEventListener('click', function(){ FMD[key] = x[0]; renderFormaty(); });
    c.appendChild(b);
  });
  f.appendChild(c); box.appendChild(f);
}
function fmImg(im, alt, cls){
  var b = el('button', 'fm-im' + (cls ? ' ' + cls : '')); b.type = 'button';
  b.setAttribute('aria-label', alt + ', крупно');
  var i = new Image(); i.src = im.src; i.width = im.w; i.height = im.h; i.alt = alt; i.loading = 'lazy'; i.decoding = 'async'; i.draggable = false;
  b.appendChild(i);
  b.addEventListener('click', function(){ openLightbox(im.src, alt); });
  return b;
}
function fmMeta(it){
  var m = el('div', 'fm-meta');
  m.appendChild(el('span', it.v_stavke ? 'fm-tag fm-tag-y' : 'fm-tag', it.v_stavke ? 'В ставке' : 'Вне ставки'));
  var g = {};
  (FMD.data.gde || []).forEach(function(x){ g[x.id] = x.nazvanie; });
  m.appendChild(el('span', null, 'Где: ' + (it.tags || []).map(function(t){ return g[t] || t; }).join(', ')));
  return m;
}
function fmCard(it){
  var c = el('div', 'fm-card');
  if (it.format === 'poisk') {
    var s = el('div', 'fm-serp'), a = el('div', 'fm-ad');
    a.appendChild(el('b', null, 'Реклама')); a.appendChild(document.createTextNode('catalystrussia.ru'));
    s.appendChild(a); s.appendChild(el('div', 'fm-ft fm-ft-link', it.zagolovok)); s.appendChild(el('p', 'fm-fx', it.tekst));
    c.appendChild(s);
  } else if (it.format === 'ban') {
    c.classList.add('wide'); c.appendChild(el('h3', 'fm-ft', it.zagolovok));
    var sz = el('div', 'fm-sizes'), n = 0;
    (it.razmery || []).forEach(function(r){
      if (FMD.s !== 'all' && r.orient !== FMD.s) return;
      n++;
      var d = el('div', 'fm-sz'), w = FM_SHOWW[String(r.razmer).replace('×', 'x')] || 300;
      d.style.width = 'min(100%,' + w + 'px)';
      d.appendChild(fmImg(r, it.zagolovok + ', ' + r.razmer));
      d.appendChild(el('span', null, r.nazvanie));
      sz.appendChild(d);
    });
    if (!n) return null;
    c.appendChild(sz);
  } else if (it.format === 'video') {
    var v = document.createElement('video');
    v.controls = true; v.preload = 'none'; v.playsInline = true; v.poster = it.kartinka.src; v.src = it.video;
    v.setAttribute('aria-label', it.zagolovok); v.width = it.kartinka.w; v.height = it.kartinka.h;
    c.appendChild(v); c.appendChild(el('h3', 'fm-ft', it.zagolovok));
    if (it.tekst) c.appendChild(el('p', 'fm-fx', it.tekst));
  } else {
    if (it.kartinka) {
      var im = fmImg(it.kartinka, it.zagolovok);
      if (it.format === 'pb') im.style.maxWidth = '240px';
      c.appendChild(im);
    }
    c.appendChild(el('h3', 'fm-ft', it.zagolovok));
    if (it.tekst) c.appendChild(el('p', 'fm-fx', it.tekst));
  }
  if (it.podpis) c.appendChild(el('div', 'fm-meta', it.podpis));
  c.appendChild(fmMeta(it));
  return c;
}

function renderFormaty(){
  var v = $('s-formaty');
  if (!v) return;
  v.textContent = '';
  v.appendChild(el('h2', null, 'Форматы'));
  if (!FMD.data) {
    if (FMD.failed) {
      var n = el('div', 'fm-nof');
      n.appendChild(el('p', null, 'Не удалось загрузить форматы.'));
      var rb = el('button', 'btn btn-line', 'Попробовать ещё раз'); rb.type = 'button';
      rb.addEventListener('click', function(){ renderFormaty(); });
      n.appendChild(rb); v.appendChild(n);
      FMD.failed = false;
      return;
    }
    v.appendChild(el('p', 'muted', 'Загружаем форматы…'));
    if (!FMD.loading) fmLoad();
    return;
  }
  var nt = el('div', 'note');
  nt.appendChild(el('b', null, 'Какие бывают объявления в Директе. '));
  nt.appendChild(document.createTextNode('Образцы форматов рекламы, которые мы запускаем в рекламных сетях. Фильтры ниже помогают найти нужный формат и место показа.'));
  v.appendChild(nt);
  var D = FMD.data;
  fmChipRow(v, 'Формат', [['all', 'Все форматы']].concat(D.formaty.map(function(x){ return [x.id, x.nazvanie]; })), 'f');
  fmChipRow(v, 'Где показывается', [['all', 'Везде']].concat((D.gde || []).map(function(x){ return [x.id, x.nazvanie]; })), 'g');
  if (FMD.f === 'all' || FMD.f === 'ban') fmChipRow(v, 'Размер баннера', FM_SIZES, 's');
  var shown = 0, wrap = el('div');
  D.formaty.forEach(function(f){
    if (FMD.f !== 'all' && FMD.f !== f.id) return;
    var its = D.items.filter(function(i){ return i.format === f.id && (FMD.g === 'all' || (i.tags || []).indexOf(FMD.g) >= 0); });
    var cards = its.map(fmCard).filter(Boolean);
    if (!cards.length) return;
    shown += cards.length;
    var sec = el('div', 'fm-sec');
    sec.appendChild(el('h2', null, f.nazvanie)); sec.appendChild(el('p', 'fm-sec-d', f.opisanie));
    var g = el('div', 'fm-grid'); cards.forEach(function(c){ g.appendChild(c); });
    sec.appendChild(g); wrap.appendChild(sec);
  });
  if (!shown) {
    var no = el('div', 'fm-nof');
    no.appendChild(el('p', null, 'Для такого сочетания фильтров образцов нет.'));
    var sb = el('button', 'btn btn-line', 'Сбросить фильтры'); sb.type = 'button';
    sb.addEventListener('click', function(){ FMD.f = 'all'; FMD.g = 'all'; FMD.s = 'all'; renderFormaty(); });
    no.appendChild(sb); v.appendChild(no);
    return;
  }
  var cnt = el('p', 'fm-cnt', 'Показано образцов: ' + shown); cnt.id = 'fmCount';
  v.appendChild(cnt); v.appendChild(wrap);
}

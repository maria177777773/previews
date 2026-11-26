/* core.js: ядро страницы v5 (контракт п.8). Глобальные имена, без модулей. */
'use strict';
function $(id){ return document.getElementById(id); }
function el(tag, cls, text){
  var n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}
/* ls(k) читает, ls(k, v) пишет, ls(k, null) удаляет. Не падает без localStorage. */
function ls(k, v){
  try {
    if (arguments.length < 2) return window.localStorage.getItem(k);
    if (v === null) window.localStorage.removeItem(k); else window.localStorage.setItem(k, String(v));
    return v;
  } catch (e) { return null; }
}
var MES = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
var DNI = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'];
function mskDate(iso){ var t = new Date(iso).getTime(); return isNaN(t) ? null : new Date(t + 3 * 3600 * 1000); }
function fmtDate(iso){ var d = mskDate(iso); return d ? d.getUTCDate() + ' ' + MES[d.getUTCMonth()] : ''; }
function fmtTime(iso){
  var d = mskDate(iso); if (!d) return '';
  return String(d.getUTCHours()).padStart(2, '0') + ':' + String(d.getUTCMinutes()).padStart(2, '0');
}
function fmtDay(iso){ var d = mskDate(iso); return d ? DNI[d.getUTCDay()] : ''; }
function plural(n, a, b, c){
  var m = Math.abs(n) % 100, r = m % 10;
  if (m > 10 && m < 20) return c;
  if (r > 1 && r < 5) return b;
  if (r === 1) return a;
  return c;
}
/* Правило п.4: от 1% целое число, меньше 1% один знак. */
function ctrText(ctr){
  if (ctr == null || isNaN(ctr)) return '';
  if (ctr >= 1) return Math.round(ctr) + '%';
  return (Math.round(ctr * 10) / 10).toString().replace('.', ',') + '%';
}
function fmtNum(n){ return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

/* ---- Данные и состояние ---- */
var API = '';
var DATA = null;
var RATE = null;
var STATE = { me: '', partiya: '', liga: '', rezhim: '', draft: null };

/* ---- Шина событий: data:ready, me:changed, tab:changed, stavka:sent ---- */
var BUS = {};
function on(event, fn){ (BUS[event] = BUS[event] || []).push(fn); }
function emit(event, data){
  (BUS[event] || []).slice().forEach(function(fn){ try { fn(data); } catch (e) { console.error('Ошибка обработчика ' + event, e); } });
}

function isLocalHost(){ return /^(localhost|127\.0\.0\.1)$/.test(location.hostname); }
function setApiFrom(data){
  var q = new URLSearchParams(location.search).get('api');
  if (q && isLocalHost()) API = q.replace(/\/+$/, '');
  else if (data && data.api) API = String(data.api).replace(/\/+$/, '');
  else API = location.origin + '/zavod/tot';
}
/* Путь вида /zavod/tot/stavka2 берётся от адреса сервера, иначе добавляется к API. */
function apiUrl(path){
  if (/^https?:/.test(path)) return path;
  var origin = API; try { origin = new URL(API, location.href).origin; } catch (e) {}
  return path.indexOf('/zavod/tot') === 0 ? origin + path : API + path;
}
function fetchJson(url){
  return fetch(url, { cache: 'no-store' }).then(function(r){
    if (!r.ok) throw new Error('http ' + r.status);
    return r.json();
  });
}
/* Загружает partii.json, затем rejting.json (если нет файла: RATE = null, играть можно). */
function loadData(){
  return fetchJson('partii.json').then(function(d){
    DATA = d; setApiFrom(d);
    var ref = (d && typeof d.rejting === 'string') ? d.rejting : (d && d.rejting === null ? null : 'rejting.json');
    if (d && d.rejting && typeof d.rejting === 'object') { RATE = d.rejting; return; }
    if (!ref) { RATE = null; return; }
    return fetchJson(ref).then(function(r){ RATE = r; }).catch(function(){ RATE = null; });
  }).then(function(){ emit('data:ready', { data: DATA, rate: RATE }); return DATA; });
}
function getPartiya(id){
  if (!DATA || !DATA.partii) return null;
  for (var i = 0; i < DATA.partii.length; i++) if (DATA.partii[i].id === id) return DATA.partii[i];
  return null;
}

/* ---- Время тура ---- */
/* turnInfo(p) -> { status: otkryta|idet|zakryta|bez_dannyh, open, sec, zakrytie }. sec = секунд до закрытия (0 если закрыт). */
function turnInfo(p){
  var t = p ? new Date(p.zakrytie).getTime() : NaN;
  var sec = isNaN(t) ? 0 : Math.max(0, Math.floor((t - Date.now()) / 1000));
  var open = !!p && p.status === 'otkryta' && sec > 0;
  var status = p ? p.status : 'zakryta';
  if (p && p.status === 'otkryta' && sec === 0) status = 'idet';
  return { status: status, open: open, sec: sec, zakrytie: p ? p.zakrytie : null };
}
function leftText(sec){
  var d = Math.floor(sec / 86400), h = Math.floor(sec % 86400 / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
  var out = [];
  if (d) out.push(d + ' ' + plural(d, 'день', 'дня', 'дней'));
  if (d || h) out.push(h + ' ч');
  out.push(m + ' мин');
  if (!d) out.push(String(s).padStart(2, '0') + ' с');
  return out.join(' ');
}

/* ---- Звук, вибрация, анимации ---- */
var sound = (function(){
  var ctx = null, enabled = ls('tot5_zvuk') !== '0';
  function ac(){
    if (ctx) return ctx;
    var C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    try { ctx = new C(); } catch (e) { ctx = null; }
    return ctx;
  }
  var NOTES = { tap: [[520, 0.07]], pick: [[620, 0.07], [780, 0.09]], ok: [[523, 0.1], [659, 0.1], [784, 0.16]], err: [[220, 0.18]], win: [[523, 0.1], [659, 0.1], [784, 0.1], [1046, 0.2]] };
  function play(name){
    if (!enabled) return;
    var c = ac(); if (!c) return;
    try {
      if (c.state === 'suspended' && c.resume) c.resume();
      var t = c.currentTime, seq = NOTES[name] || NOTES.tap;
      seq.forEach(function(n){
        var o = c.createOscillator(), g = c.createGain();
        o.type = 'sine'; o.frequency.value = n[0];
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.05, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + n[1]);
        o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + n[1] + 0.02); t += n[1];
      });
    } catch (e) {}
  }
  function toggle(){ enabled = !enabled; ls('tot5_zvuk', enabled ? '1' : '0'); return enabled; }
  return { play: play, toggle: toggle, isOn: function(){ return enabled; } };
})();
function buzz(ms){ try { if (navigator.vibrate) navigator.vibrate(ms || 20); } catch (e) {} }
function reducedMotion(){
  try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; }
}

/* ---- Лайтбокс ---- */
var LB = { node: null, last: null };
function openLightbox(src, alt){
  if (!LB.node) {
    var box = el('div', 'lb'); box.id = 'lb'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.hidden = true;
    var b = el('button', 'lb-close', 'Закрыть'); b.type = 'button'; b.id = 'lbClose';
    var img = el('img', 'lb-img'); img.id = 'lbImg';
    box.appendChild(b); box.appendChild(img); document.body.appendChild(box);
    box.addEventListener('click', function(e){ if (e.target !== img) closeLightbox(); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && !box.hidden) closeLightbox(); });
    LB.node = box;
  }
  LB.last = document.activeElement;
  var im = LB.node.querySelector('img'); im.src = src; im.alt = alt || '';
  LB.node.hidden = false; document.body.classList.add('lb-open');
  LB.node.querySelector('button').focus();
}
function closeLightbox(){
  if (!LB.node) return;
  LB.node.hidden = true; document.body.classList.remove('lb-open');
  if (LB.last && LB.last.focus) try { LB.last.focus(); } catch (e) {}
}

/* ---- Предупреждение об уходе с несохранённой ставкой ---- */
var unsavedGuard = (function(){
  var on = false;
  function h(e){ e.preventDefault(); e.returnValue = ''; return ''; }
  return {
    set: function(v){
      v = !!v; if (v === on) return; on = v;
      if (v) window.addEventListener('beforeunload', h); else window.removeEventListener('beforeunload', h);
    },
    isOn: function(){ return on; }
  };
})();

/* ---- Сеть ---- */
function newKlient(){
  var s = '', a = 'abcdefghijklmnopqrstuvwxyz0123456789';
  try { var u = new Uint8Array(12); crypto.getRandomValues(u); for (var i = 0; i < u.length; i++) s += a[u[i] % a.length]; }
  catch (e) { for (var j = 0; j < 12; j++) s += a[Math.floor(Math.random() * a.length)]; }
  return s;
}
/* Сообщение о сбое на нашей стороне. Сбой самой /popytka не репортим. */
function reportPopytka(partiya, tip, kratko, klient){
  var body = JSON.stringify({ partiya: partiya || '', tip: tip, kratko: String(kratko || '').slice(0, 80), klient: klient || '' });
  var url = apiUrl('/zavod/tot/popytka');
  try {
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function(){});
  } catch (e) {
    try { if (navigator.sendBeacon) navigator.sendBeacon(url, new Blob([body], { type: 'application/json' })); } catch (e2) {}
  }
}
var NET_TIMEOUT_MS = 15000, NET_RETRIES = 2, NET_PAUSE_MS = 700;
/* apiPost всегда resolve: { ok: httpOk, status (0 при обрыве/таймауте), json|null, net: 'set'|'tajmaut'|null }.
   Повторы только при обрыве или таймауте (до 2 повторов, всего 3 POST), один klient на весь вызов. */
function apiPost(path, body){
  body = body || {};
  if (!body.klient) body.klient = newKlient();
  var url = apiUrl(path), attempt = 0;
  return new Promise(function(resolve){
    function finish(res){
      var isStavka = /stavka2?$/.test(path);
      if (isStavka && (res.net || (!res.json && res.status))) {
        reportPopytka(body.partiya, res.net || 'otvet', res.net ? (res.net + ' после ' + attempt + ' попыток') : ('ответ ' + res.status + ' не JSON'), body.klient);
      }
      resolve(res);
    }
    function once(){
      attempt++;
      var done = false, ctl = ('AbortController' in window) ? new AbortController() : null;
      var timer = setTimeout(function(){ if (done) return; done = true; if (ctl) try { ctl.abort(); } catch (e) {} fail('tajmaut'); }, NET_TIMEOUT_MS);
      function fail(kind){ if (attempt <= NET_RETRIES) setTimeout(once, NET_PAUSE_MS * attempt); else finish({ ok: false, status: 0, json: null, net: kind }); }
      fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), cache: 'no-store', signal: ctl ? ctl.signal : undefined })
        .then(function(r){
          return r.text().then(function(t){
            if (done) return; done = true; clearTimeout(timer);
            var j = null; try { j = JSON.parse(t); } catch (e) { j = null; }
            finish({ ok: r.ok, status: r.status, json: j, net: null });
          });
        })
        .catch(function(){ if (done) return; done = true; clearTimeout(timer); fail('set'); });
    }
    once();
  });
}
function apiGet(path){
  var url = apiUrl(path);
  return new Promise(function(resolve){
    var done = false, ctl = ('AbortController' in window) ? new AbortController() : null;
    var timer = setTimeout(function(){ if (done) return; done = true; if (ctl) try { ctl.abort(); } catch (e) {} resolve({ ok: false, status: 0, json: null, net: 'tajmaut' }); }, NET_TIMEOUT_MS);
    fetch(url, { cache: 'no-store', signal: ctl ? ctl.signal : undefined }).then(function(r){
      return r.text().then(function(t){
        if (done) return; done = true; clearTimeout(timer);
        var j = null; try { j = JSON.parse(t); } catch (e) { j = null; }
        resolve({ ok: r.ok, status: r.status, json: j, net: null });
      });
    }).catch(function(){ if (done) return; done = true; clearTimeout(timer); resolve({ ok: false, status: 0, json: null, net: 'set' }); });
  });
}

/* start.js: запуск страницы, вкладки, плашка недели, имя в шапке. Подключается последним. */
'use strict';
var TABS = ['igra', 'itogi', 'lider', 'moi', 'zayavka', 'formaty'];
var CUR_TAB = 'igra';
var NAME_RE = /^[0-9A-Za-zА-Яа-яЁё][0-9A-Za-zА-Яа-яЁё .'_-]{0,23}$/;

function validName(n){ return NAME_RE.test(n || '') && n.trim().toLowerCase() !== 'claude'; }
function setMe(name){
  name = (name || '').trim();
  if (name && !validName(name)) return false;
  STATE.me = name; ls('tot5_imya', name || null);
  refreshMeChip(); emit('me:changed', name); return true;
}
function refreshMeChip(){
  var b = $('meChip');
  b.textContent = STATE.me ? 'Играет: ' + STATE.me : 'Выберите имя';
  b.classList.toggle('has', !!STATE.me);
}
function refreshSound(){
  var b = $('sndBtn'), on = sound.isOn();
  b.textContent = on ? 'Звук вкл' : 'Звук выкл'; b.setAttribute('aria-pressed', on ? 'true' : 'false');
}

/* showTab(id, arg): показывает вкладку и вызывает её renderXxx(). Для moi arg = имя игрока. */
function showTab(id, arg){
  if (TABS.indexOf(id) < 0) id = 'igra';
  CUR_TAB = id;
  TABS.forEach(function(t){
    var on = t === id;
    $('tab-' + t).setAttribute('aria-selected', on ? 'true' : 'false');
    $('s-' + t).hidden = !on;
  });
  var fn = { igra: window.renderIgra, itogi: window.renderItogi, lider: window.renderLider, moi: window.renderMoi, zayavka: window.renderZayavka, formaty: window.renderFormaty }[id];
  if (fn) { try { fn(arg); } catch (e) { console.error('Ошибка вкладки ' + id, e); $('s-' + id).textContent = 'Раздел не открылся. Обновите страницу.'; } }
  emit('tab:changed', { tab: id, arg: arg });
}

/* ---- плашка недели ---- */
function weekTour(){
  var best = null;
  (DATA && DATA.partii || []).forEach(function(p){
    if (!turnInfo(p).open) return;
    var pr = p.liga === 'old' ? 1 : 0;
    if (!best || pr < best.pr || (pr === best.pr && p.zakrytie < best.p.zakrytie)) best = { p: p, pr: pr };
  });
  return best ? best.p : null;
}
function lastTour(){
  var last = null;
  (DATA && DATA.partii || []).forEach(function(p){ if (!last || p.zakrytie > last.zakrytie) last = p; });
  return last;
}
function oknoText(p){
  if (!p || !p.okno) return '';
  return 'Неделя с ' + fmtDate(p.okno.s + 'T00:00:00Z') + ' по ' + fmtDate(p.okno.po + 'T00:00:00Z') + '. ';
}
var WEEK_TIMER = null;
function drawWeek(){
  var p = weekTour(), main = $('weekMain'), tm = $('weekTimer'), box = $('week');
  if (p) {
    var ti = turnInfo(p);
    box.classList.remove('closed');
    main.textContent = oknoText(p) + 'Ставки до ' + fmtDayRod(p.zakrytie) + ', ' + fmtDate(p.zakrytie) + ', ' + fmtTime(p.zakrytie) + ' по Москве.';
    tm.textContent = 'Осталось ' + leftText(ti.sec);
  } else {
    var l = lastTour(); box.classList.add('closed');
    main.textContent = (l ? oknoText(l) : '') + 'Ставки на этот тур закрыты.';
    tm.textContent = 'Новый тур откроется скоро';
  }
}
function startWeek(){
  drawWeek();
  if (WEEK_TIMER) clearInterval(WEEK_TIMER);
  WEEK_TIMER = setInterval(drawWeek, 1000);
}

function startPage(){
  if (reducedMotion()) document.documentElement.classList.add('reduced');
  var saved = ls('tot5_imya'); if (saved && validName(saved)) STATE.me = saved;
  refreshMeChip(); refreshSound();
  $('sndBtn').addEventListener('click', function(){ sound.toggle(); refreshSound(); sound.play('tap'); });
  $('meChip').addEventListener('click', function(){ showTab('igra'); if (window.igraFocusName) window.igraFocusName(); });
  $('tabs').addEventListener('click', function(e){
    var b = e.target.closest ? e.target.closest('.tab') : null;
    if (b) showTab(b.getAttribute('data-tab'));
  });
  loadData().then(function(){
    startWeek();
    showTab('igra');
  }).catch(function(err){
    console.error('Не загрузились данные', err);
    var box = $('s-igra'); box.textContent = '';
    box.appendChild(el('p', 'note note-bad', 'Не удалось загрузить данные игры. Проверьте связь и обновите страницу.'));
    var b = el('button', 'btn', 'Обновить'); b.type = 'button'; b.onclick = function(){ location.reload(); }; box.appendChild(b);
    $('weekMain').textContent = 'Данные недели не загрузились.';
  });
}
document.addEventListener('DOMContentLoaded', startPage);

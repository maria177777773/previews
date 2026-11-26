/* moi.js: вкладка «Мои ставки и значки» (контракт п.6-8, формат данных IGRA-API.md). Префикс функций mo.
   Данные: RATE (rejting.json), DATA (partii.json). Весь вывод через el()/textContent, без innerHTML.
   Приватность: состав ставок показывается только у туров, которые уже не открыты. Свою ставку открытого тура
   читаем у сервера по klient, который лежит на этом устройстве, и только когда смотрим свой профиль. */
'use strict';
var MO = { arg: '', seq: 0 };
var MO_LIGA = { ny: 'Новогодние', ob: 'Обычные', old: 'Партия недели' };
/* Пороги значков из условий rejting.json (seriya 3 недели, postoyanstvo 4 недели, igrok 5 ставок). */
var MO_GOAL = { seriya: 3, postoyanstvo: 4, igrok: 5 };

function moLow(s){ return String(s == null ? '' : s).toLowerCase(); }
function moSame(a, b){ return !!a && !!b && moLow(a) === moLow(b); }
function moPts(n){ return n + ' ' + plural(n, 'очко', 'очка', 'очков'); }
/* Имя в том написании, как в списке участников. */
function moCanon(name){
  var u = (RATE && RATE.uchastniki) || [];
  for (var i = 0; i < u.length; i++) if (moSame(u[i], name)) return u[i];
  return name;
}
function moByName(map, name){
  if (!map) return null;
  for (var k in map) if (Object.prototype.hasOwnProperty.call(map, k) && moSame(k, name)) return map[k];
  return null;
}
function moSezonRow(name){
  var t = (RATE && RATE.sezon_tablica) || [];
  for (var i = 0; i < t.length; i++) if (moSame(t[i].imya, name)) return t[i];
  return null;
}
function moWeek(id){
  var w = (RATE && RATE.nedeli) || [];
  for (var i = 0; i < w.length; i++) if (w[i].id === id) return w[i];
  return null;
}
function moRange(a, b){
  if (!a || !b) return '';
  var da = fmtDate(a + 'T00:00:00Z'), db = fmtDate(b + 'T00:00:00Z');
  var pa = da.split(' '), pb = db.split(' ');
  return 'Неделя ' + (pa[1] === pb[1] ? 'с ' + pa[0] + ' по ' + db : 'с ' + da + ' по ' + db);
}
function moWeekText(nedelya, p){
  var w = moWeek(nedelya);
  if (w) return moRange(w.mon, w.sun);
  if (p && p.okno) return moRange(p.okno.s, p.okno.po);
  return '';
}
/* Состав чужих и закрытых ставок из RATE.stavki можно показывать только у тура, который уже не открыт. */
function moMayShow(pid, ochki){
  var p = getPartiya(pid);
  if (p) return p.status !== 'otkryta';
  return ochki != null;
}
function moCardName(p, id){
  var b = p ? p.bannery || [] : [];
  for (var i = 0; i < b.length; i++) if (b[i].id === id && b[i].podpis) return b[i].podpis;
  return 'Карточка из прошлого тура';
}
function moFindBet(pid, name){
  var l = (RATE && RATE.stavki && RATE.stavki[pid]) || [];
  for (var i = 0; i < l.length; i++) if (moSame(l[i].imya, name)) return l[i];
  return null;
}
/* Номер недели ISO 'YYYY-Www' в число недель от эпохи: для проверки «подряд». */
function moWeekNo(id){
  var m = /^(\d{4})-W(\d{1,2})$/.exec(id || ''); if (!m) return null;
  var y = +m[1], w = +m[2];
  var j4 = Date.UTC(y, 0, 4), dow = new Date(j4).getUTCDay() || 7;
  var mon = j4 - (dow - 1) * 86400000 + (w - 1) * 7 * 86400000;
  return Math.round(mon / (7 * 86400000));
}

/* ---- данные игрока ---- */
/* Строки истории: из RATE.istoriya плюс (только для себя) открытые туры, где на этом устройстве есть klient. */
function moRows(name, isMe){
  var src = moByName(RATE && RATE.istoriya, name) || [];
  var rows = src.map(function(h, i){ return { h: h, i: i }; });
  if (isMe && DATA && DATA.partii) {
    DATA.partii.forEach(function(p){
      if (p.status !== 'otkryta' || !igraKlientGet(p.id, name)) return;
      for (var j = 0; j < src.length; j++) if (src[j].partiya === p.id) return;
      rows.push({ h: { partiya: p.id, nedelya: p.nedelya, liga: p.liga, ochki: null, mesto_v_nedele: null, razbor: null }, i: -1 - rows.length });
    });
  }
  rows.sort(function(a, b){
    if (a.h.nedelya !== b.h.nedelya) return a.h.nedelya < b.h.nedelya ? 1 : -1;
    return a.i - b.i;
  });
  return rows.map(function(r){ return r.h; });
}
/* Значки: объединение znachki_u (с датой) и sezon_tablica.znachki (без даты). */
function moEarned(name){
  var got = {};
  (moByName(RATE && RATE.znachki_u, name) || []).forEach(function(z){ got[z.id] = { kogda: z.kogda || '' }; });
  var row = moSezonRow(name);
  ((row && row.znachki) || []).forEach(function(id){ if (!got[id]) got[id] = { kogda: '' }; });
  return got;
}
function moStreak(rows){
  var nums = [], seen = {};
  rows.forEach(function(h){
    if (h.razbor && h.razbor.vne_zachyota) return;
    var n = moWeekNo(h.nedelya); if (n == null || seen[n]) return;
    seen[n] = 1; nums.push(n);
  });
  nums.sort(function(a, b){ return a - b; });
  var best = 0, cur = 0;
  nums.forEach(function(n, i){ cur = (i && n === nums[i - 1] + 1) ? cur + 1 : 1; if (cur > best) best = cur; });
  return best;
}
function moIgraCount(name){
  var n = 0, st = (RATE && RATE.stavki) || {};
  Object.keys(st).forEach(function(pid){
    (st[pid] || []).forEach(function(s){
      if (moSame(s.imya, name) && s.rezhim === 'igra' && moMayShow(pid, s.ochki)) n++;
    });
  });
  return n;
}
/* Прогресс считается только там, где его можно получить из данных: -> {n, goal, text} или null. */
function moProgress(id, name, rows){
  var goal = MO_GOAL[id], n;
  if (!goal) return null;
  if (id === 'seriya') {
    var r = moSezonRow(name); n = r ? r.serija || 0 : 0;
    return { n: n, goal: goal, text: 'Лучшая серия в тройке: ' + Math.min(n, goal) + ' из ' + goal + ' ' + plural(goal, 'недели', 'недель', 'недель') + ' подряд' };
  }
  if (id === 'postoyanstvo') {
    n = moStreak(rows);
    return { n: n, goal: goal, text: 'Недель подряд со ставками: ' + Math.min(n, goal) + ' из ' + goal };
  }
  n = moIgraCount(name);
  return { n: n, goal: goal, text: 'Ставок в режиме «Кто лучше»: ' + Math.min(n, goal) + ' из ' + goal };
}

/* ---- мелкие кирпичи ---- */
function moBtn(text, cls, fn){
  var b = el('button', cls, text); b.type = 'button'; b.addEventListener('click', fn); return b;
}
function moTile(label, value, small){
  var t = el('div', 'mo-tile');
  t.appendChild(el('div', 'mo-tile-v' + (small ? ' mo-sm' : ''), value));
  t.appendChild(el('div', 'mo-tile-l', label));
  return t;
}
function moTag(text, star, hit){
  var t = el('span', 'mo-tag' + (hit ? ' mo-hit' : ''));
  t.appendChild(el('span', 'mo-tag-n', (star ? '★ ' : '') + text));
  if (hit) t.appendChild(el('span', 'mo-tag-v', '✓ верно'));
  return t;
}

/* ---- состав ставки ---- */
function moBetNode(p, bet, h){
  var box = el('div', 'mo-bet');
  var it = p && p.itog && p.status !== 'otkryta' ? p.itog : null;
  var inList = function(list, id){ return !!it && Array.isArray(list) && list.indexOf(id) >= 0; };
  var liderId = bet.lider || '';
  var g1 = el('div', 'mo-grp'); g1.appendChild(el('div', 'mo-grp-l', 'Лучшие'));
  var r1 = el('div', 'mo-tags');
  (bet.top || []).forEach(function(id){ r1.appendChild(moTag(moCardName(p, id), id === liderId, inList(it && it.luchshie, id))); });
  g1.appendChild(r1); box.appendChild(g1);
  var g2 = el('div', 'mo-grp'); g2.appendChild(el('div', 'mo-grp-l', 'Худшие'));
  var r2 = el('div', 'mo-tags');
  (bet.hudshie || []).forEach(function(id){ r2.appendChild(moTag(moCardName(p, id), false, inList(it && it.hudshie, id))); });
  g2.appendChild(r2); box.appendChild(g2);
  var meta = el('div', 'mo-meta');
  if (liderId) {
    var lv = inList(it && it.lider, liderId);
    meta.appendChild(el('span', 'mo-meta-i', '★ Фаворит: ' + moCardName(p, liderId) + (lv ? ', верно' : '')));
  }
  if ((p && p.gz) || bet.cvet) {
    if (bet.cvet === 'w' || bet.cvet === 'g') {
      var cv = it && it.cvet === bet.cvet;
      meta.appendChild(el('span', 'mo-meta-i', 'Цвет: ' + (bet.cvet === 'w' ? 'белая' : 'зелёная') + (cv ? ', верно' : '')));
    }
  }
  if (bet.vremya) meta.appendChild(el('span', 'mo-meta-i', 'Ставка принята ' + fmtDate(bet.vremya) + ', ' + fmtTime(bet.vremya) + ' по Москве'));
  if (meta.childNodes.length) box.appendChild(meta);
  return box;
}
function moRazborText(h, p, bet){
  var r = h.razbor; if (!r || r.vne_zachyota || h.ochki == null) return '';
  var k = p ? p.k : (bet && bet.top ? bet.top.length : 0), hh = p ? p.h : (bet && bet.hudshie ? bet.hudshie.length : 0);
  var parts = ['лучших ' + r.luchshie + (k ? ' из ' + k : ''), 'худших ' + r.hudshie + (hh ? ' из ' + hh : ''),
    r.lider > 0 ? 'фаворит +' + r.lider : 'фаворит 0'];
  if ((p && p.gz) || r.cvet > 0 || (bet && bet.cvet)) parts.push(r.cvet > 0 ? 'цвет +' + r.cvet : 'цвет 0');
  return 'Угадали: ' + parts.join(', ') + ' = ' + h.ochki;
}

/* ---- строка истории ---- */
function moRow(h, name, isMe, job){
  var p = getPartiya(h.partiya);
  var row = el('article', 'mo-row');
  var head = el('div', 'mo-row-h');
  var ttl = el('div', 'mo-row-t');
  var title = (p && p.nazvanie) || MO_LIGA[h.liga] || 'Тур';
  ttl.appendChild(el('h3', 'mo-h3', title));
  var meta = el('div', 'mo-row-m');
  if (MO_LIGA[h.liga] && MO_LIGA[h.liga] !== title) meta.appendChild(el('span', 'mo-liga', MO_LIGA[h.liga]));
  var wt = moWeekText(h.nedelya, p); if (wt) meta.appendChild(el('span', 'mo-wk', wt));
  ttl.appendChild(meta); head.appendChild(ttl);
  var pts = el('div', 'mo-pts');
  var vne = h.razbor && h.razbor.vne_zachyota;
  if (vne) {
    pts.appendChild(el('div', 'mo-pts-s', 'Вне зачёта'));
    pts.appendChild(el('div', 'mo-pts-l', 'Ставка пришла после старта тура, очки не начисляются'));
  } else if (h.ochki != null) {
    pts.appendChild(el('div', 'mo-pts-v', String(h.ochki)));
    pts.appendChild(el('div', 'mo-pts-l', plural(h.ochki, 'очко', 'очка', 'очков')));
  } else if (p && p.status === 'otkryta') {
    pts.appendChild(el('div', 'mo-pts-s', 'Тур идёт'));
    pts.appendChild(el('div', 'mo-pts-l', 'Ставки до ' + fmtDate(p.zakrytie) + ', ' + fmtTime(p.zakrytie)));
  } else {
    pts.appendChild(el('div', 'mo-pts-s', 'Ждёт итогов'));
  }
  head.appendChild(pts); row.appendChild(head);

  var body = el('div', 'mo-row-b'); row.appendChild(body);
  var bet = null;
  if (moMayShow(h.partiya, h.ochki)) bet = moFindBet(h.partiya, name);
  if (bet) {
    body.appendChild(moBetNode(p, bet, h));
  } else if (isMe && p && p.status === 'otkryta' && igraKlientGet(h.partiya, name)) {
    body.appendChild(el('p', 'mo-note', 'Загружаем вашу ставку…'));
    job(h, p, body);
  } else if (!moMayShow(h.partiya, h.ochki) || !bet) {
    var open = p && p.status === 'otkryta';
    body.appendChild(el('p', 'mo-note', open ? 'Ставка принята. Состав откроется после закрытия тура.' : 'Состав этой ставки не сохранился.'));
  }
  var rz = moRazborText(h, p, bet);
  if (rz) row.appendChild(el('p', 'mo-razbor', rz));
  if (h.mesto_v_nedele != null) {
    var w = moWeek(h.nedelya), tot = w && w.tablica ? w.tablica.length : 0;
    row.appendChild(el('p', 'mo-place', 'Место в неделе: ' + h.mesto_v_nedele + (tot ? ' из ' + tot : '')));
  }
  return row;
}

/* ---- значки ---- */
function moBadgeCard(z, got, prog){
  var c = el('article', 'mo-badge' + (got ? ' mo-got' : ' mo-no'));
  c.appendChild(el('div', 'mo-badge-i', z.ikonka || '🏅'));
  var tx = el('div', 'mo-badge-t');
  tx.appendChild(el('h3', 'mo-h3', z.nazvanie || ''));
  tx.appendChild(el('div', 'mo-badge-s', got ? (got.kogda ? 'Получен ' + fmtDate(got.kogda) : 'Получен') : 'Пока не получен'));
  tx.appendChild(el('p', 'mo-badge-c', 'Условие: ' + (z.opisanie || '')));
  if (!got && prog) {
    tx.appendChild(el('div', 'mo-prog-l', prog.text));
    var bar = el('div', 'mo-prog'); bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-valuemin', '0'); bar.setAttribute('aria-valuemax', String(prog.goal));
    bar.setAttribute('aria-valuenow', String(Math.min(prog.n, prog.goal)));
    var fill = el('div', 'mo-prog-f'); fill.style.width = Math.round(Math.min(prog.n, prog.goal) / prog.goal * 100) + '%';
    bar.appendChild(fill); tx.appendChild(bar);
  }
  c.appendChild(tx);
  return c;
}

/* ---- экраны ---- */
function moSwitcher(cur){
  var u = (RATE && RATE.uchastniki) || [];
  var box = el('div', 'mo-sw'); box.appendChild(el('span', 'mo-sw-l', 'Игрок:'));
  u.forEach(function(n){
    var b = moBtn(n, 'chip' + (moSame(n, cur) ? ' on' : ''), function(){ showTab('moi', n); });
    b.setAttribute('aria-pressed', moSame(n, cur) ? 'true' : 'false');
    box.appendChild(b);
  });
  return box;
}
function moAskName(root){
  root.appendChild(el('h2', 'mo-h2', 'Мои ставки и значки'));
  root.appendChild(el('p', 'mo-lead', 'Выберите имя, чтобы увидеть свои ставки и значки. Имя запоминается на этом устройстве.'));
  var names = el('div', 'mo-names');
  (typeof NAMES !== 'undefined' ? NAMES : []).forEach(function(n){
    names.appendChild(moBtn(n, 'chip', function(){ setMe(n); }));
  });
  root.appendChild(names);
  var form = el('div', 'mo-form');
  var inp = el('input', 'inp'); inp.type = 'text'; inp.maxLength = 24; inp.placeholder = 'Другое имя'; inp.setAttribute('aria-label', 'Другое имя');
  var err = el('p', 'note note-bad', 'Имя не подходит. Нужны буквы или цифры, до 24 знаков.'); err.hidden = true;
  var save = moBtn('Сохранить имя', 'btn', function(){
    if (setMe(inp.value)) return;
    err.hidden = false;
  });
  form.appendChild(inp); form.appendChild(save); root.appendChild(form); root.appendChild(err);
  if (RATE && RATE.uchastniki && RATE.uchastniki.length) {
    root.appendChild(el('p', 'mo-lead', 'Или посмотрите историю других игроков.'));
    var sw = el('div', 'mo-names');
    RATE.uchastniki.forEach(function(n){ sw.appendChild(moBtn(n, 'chip', function(){ showTab('moi', n); })); });
    root.appendChild(sw);
  }
}

function renderMoi(arg){
  var box = $('s-moi'); if (!box) return;
  MO.arg = arg || '';
  var seq = ++MO.seq;
  var name = (arg || STATE.me || '').trim();
  var root = el('div', 'mo-root');
  box.textContent = ''; box.appendChild(root);
  if (!name) { moAskName(root); root.setAttribute('data-mo-ready', '1'); return; }
  if (!RATE) {
    root.appendChild(el('h2', 'mo-h2', 'Мои ставки и значки'));
    root.appendChild(el('p', 'note', 'Данные рейтинга пока не загрузились. Обновите страницу через минуту.'));
    root.appendChild(moBtn('Обновить страницу', 'btn', function(){ location.reload(); }));
    root.setAttribute('data-mo-ready', '1'); return;
  }
  name = moCanon(name);
  var isMe = moSame(name, STATE.me);

  root.appendChild(el('h2', 'mo-h2', isMe ? 'Мои ставки и значки' : 'История игрока ' + name));
  root.appendChild(moSwitcher(name));
  if (!isMe && STATE.me) {
    var ob = el('div', 'mo-other');
    ob.appendChild(el('span', 'mo-other-t', 'Вы смотрите историю игрока ' + name + '.'));
    ob.appendChild(moBtn('Моя история', 'btn btn-line', function(){ showTab('moi'); }));
    root.appendChild(ob);
  }

  var rows = moRows(name, isMe);
  var got = moEarned(name);
  var zn = (RATE.znachki || []);
  var sz = moSezonRow(name);

  /* сводка */
  var sum = el('section', 'mo-sum'); sum.setAttribute('aria-label', 'Сводка сезона');
  var nPl = (RATE.sezon_tablica || []).length;
  sum.appendChild(moTile('очков в сезоне', sz ? String(sz.ochki) : 'Пока нет очков', !sz));
  sum.appendChild(moTile('место в сезоне', sz ? sz.mesto + (nPl ? ' из ' + nPl : '') : 'Пока нет', !sz));
  sum.appendChild(moTile('недель в игре', String(sz ? sz.nedel : 0)));
  var gotN = zn.filter(function(z){ return got[z.id]; }).length;
  sum.appendChild(moTile('значков получено', gotN + ' из ' + zn.length));
  if (sz && sz.luchshee != null) sum.appendChild(moTile('лучшая неделя, очков', String(sz.luchshee)));
  root.appendChild(sum);

  /* история */
  var hs = el('section', 'mo-sec');
  hs.appendChild(el('h2', 'mo-h2', 'История туров'));
  var pending = 0;
  function done(){ if (--pending <= 0 && seq === MO.seq) root.setAttribute('data-mo-ready', '1'); }
  function job(h, p, body){
    pending++;
    apiGet(igraStavki2Url(h.partiya, igraKlientGet(h.partiya, name))).then(function(r){
      if (seq !== MO.seq) return;
      var bet = (r.ok && r.json && r.json.ok) ? igraMineFrom(r.json, name) : null;
      body.textContent = '';
      if (bet && bet.top) body.appendChild(moBetNode(p, bet, h));
      else body.appendChild(el('p', 'mo-note', r.ok ? 'Ставка принята. Состав откроется после закрытия тура.' : 'Состав ставки сейчас не загрузился. Он откроется после закрытия тура.'));
      done();
    });
  }
  if (!rows.length) {
    var em = el('div', 'mo-empty');
    if (isMe) {
      em.appendChild(el('p', 'mo-lead', 'Пока нет ставок. Сделайте первую ставку на вкладке «Играть», и она появится здесь.'));
      em.appendChild(moBtn('Перейти к игре', 'btn', function(){ showTab('igra'); }));
    } else {
      em.appendChild(el('p', 'mo-lead', 'У игрока ' + name + ' пока нет ставок.'));
    }
    hs.appendChild(em);
  } else {
    rows.forEach(function(h){ hs.appendChild(moRow(h, name, isMe, job)); });
  }
  root.appendChild(hs);

  /* значки */
  var bs = el('section', 'mo-sec');
  bs.appendChild(el('h2', 'mo-h2', 'Значки'));
  if (!zn.length) {
    bs.appendChild(el('p', 'mo-lead', 'Список значков пока не загрузился.'));
  } else {
    if (!gotN) bs.appendChild(el('p', 'mo-lead', isMe ? 'Значков пока нет. Сделайте ставку, и первый значок появится здесь.' : 'Значков пока нет.'));
    var have = zn.filter(function(z){ return got[z.id]; }), lack = zn.filter(function(z){ return !got[z.id]; });
    if (have.length) {
      bs.appendChild(el('h3', 'mo-h3 mo-sub', 'Получено: ' + have.length));
      var g1 = el('div', 'mo-badges');
      have.forEach(function(z){ g1.appendChild(moBadgeCard(z, got[z.id], null)); });
      bs.appendChild(g1);
    }
    if (lack.length) {
      bs.appendChild(el('h3', 'mo-h3 mo-sub', 'Ещё не получены: ' + lack.length));
      var g2 = el('div', 'mo-badges');
      lack.forEach(function(z){ g2.appendChild(moBadgeCard(z, null, moProgress(z.id, name, rows))); });
      bs.appendChild(g2);
    }
  }
  root.appendChild(bs);
  if (!pending) root.setAttribute('data-mo-ready', '1');
}

on('me:changed', function(){ if (typeof CUR_TAB !== 'undefined' && CUR_TAB === 'moi') renderMoi(MO.arg); });

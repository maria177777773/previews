// Макет раздела «Материалы» (второй пункт меню, сразу под «Главным»).
// Данные для примера. Кнопки работают: создание, публикация, отправка и привязка меняют список и историю.
'use strict'

/* ── помощники ── */
const h = (tag, attrs = {}, ...kids) => {
  const el = document.createElement(tag)
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue
    if (k.startsWith('on')) el.addEventListener(k.slice(2), v)
    else if (k === 'class') el.className = v
    else if (k === 'dataset') Object.assign(el.dataset, v)
    else el.setAttribute(k, v === true ? '' : String(v))
  }
  for (const c of kids.flat()) if (c != null && c !== false) el.append(c.nodeType ? c : document.createTextNode(c))
  return el
}
const ICONS = {
  list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  month: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="7" y1="15" x2="13" y2="15"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  settings: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
  send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>',
}
const ico = (n, c = 'ico') => { const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('class', c); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true'); s.innerHTML = ICONS[n] || ''; return s }

const SITES = [
  { id: 'fks', name: 'ФКС-Центр', domain: 'center-fks.ru', logo: 'assets/logo-fks.svg', catalog: true },
  { id: 'ecpk', name: 'ЕЦПК', domain: 'center-pk.ru', logo: 'assets/logo-pk.png', catalog: true },
  { id: 'argentum', name: 'Аргентум', domain: 'edu-argentum.ru', logo: 'assets/logo-arg-light.webp', catalog: false },
]
const site = id => SITES.find(s => s.id === id)

/* ── меню: «Материалы» сразу под «Главным», «Письма» внутри него ── */
const NAV = [
  { name: 'programs', label: 'Главная', icon: 'list' },
  { name: 'materials', label: 'Материалы', icon: 'folder' },
  { name: 'calendar', label: 'Календарь мероприятий', icon: 'month' },
  { name: 'mailplan', label: 'График рассылок', icon: 'calendar' },
  { name: 'library', label: 'Фото', icon: 'image' },
  { name: 'drafts', label: 'Черновики', icon: 'file' },
]

/* ── данные для примера ── */
const TODAY = '10 ноября'
let uid = 100
const D = (when, text) => ({ when, text })
const items = [
  // лендинги
  { id: 'L1', type: 'page', title: 'Контрактная система: практикум по 44-ФЗ', meta: 'Москва, 24–26 ноября', status: 'published', sites: ['fks', 'ecpk'], date: '9 ноября', hist: [D('9 ноября', 'Опубликована на ЕЦПК'), D('7 ноября', 'Опубликована на ФКС-Центр'), D('5 ноября', 'Создана из файла программы')] },
  { id: 'L2', type: 'page', title: 'Закупки по 223-ФЗ для заказчиков', meta: 'Сочи, 8–12 декабря', status: 'published', sites: ['fks'], date: '6 ноября', hist: [D('6 ноября', 'Опубликована на ФКС-Центр'), D('4 ноября', 'Создана из файла программы')] },
  { id: 'L3', type: 'page', title: 'Бухгалтерский учёт в бюджетных учреждениях', meta: 'Санкт-Петербург, 1–3 декабря', status: 'draft', sites: [], date: '8 ноября', hist: [D('8 ноября', 'Правка: изменены тарифы'), D('8 ноября', 'Создана из файла программы')] },
  { id: 'L4', type: 'page', title: 'Кадры в госсекторе: новое в трудовом праве', meta: 'Сочи, 15–19 декабря', status: 'draft', sites: [], date: '3 ноября', hist: [D('3 ноября', 'Создана из файла программы')] },
  { id: 'L5', type: 'page', title: 'Антикоррупционная политика заказчика', meta: 'Онлайн, 19 ноября', status: 'published', sites: ['argentum'], date: '27 октября', hist: [D('27 октября', 'Опубликована на Аргентум'), D('26 октября', 'Создана из файла программы')] },
  // письма
  { id: 'M1', type: 'letter', title: 'Контрактная система: открыта запись', page: 'L1', sites: ['fks'], status: 'sent', service: 'DashaMail', date: '3 ноября', hist: [D('3 ноября', 'Отправлено через DashaMail'), D('2 ноября', 'Создан черновик письма')] },
  { id: 'M2', type: 'letter', title: 'Контрактная система: осталось 5 мест', page: 'L1', sites: ['ecpk'], status: 'scheduled', service: 'RuSender', date: '17 ноября', hist: [D('9 ноября', 'Запланировано на 17 ноября, RuSender'), D('9 ноября', 'Создан черновик письма')] },
  { id: 'M3', type: 'letter', title: 'Закупки по 223-ФЗ: приглашаем в Сочи', page: 'L2', sites: ['fks'], status: 'draft', date: '9 ноября', hist: [D('9 ноября', 'Создан черновик письма')] },
  { id: 'M4', type: 'letter', title: 'С Днём бухгалтера! Поздравление клиентам', page: null, sites: ['fks'], status: 'draft', date: '8 ноября', hist: [D('8 ноября', 'Создан черновик без страницы')] },
  { id: 'M5', type: 'letter', title: 'Итоги года: что изменилось в закупках', page: null, sites: ['ecpk'], status: 'draft', date: '2 ноября', hist: [D('2 ноября', 'Создан черновик без страницы')] },
  { id: 'M6', type: 'letter', title: 'Антикоррупционная политика: запись открыта', page: 'L5', sites: ['argentum'], status: 'sent', service: 'RuSender', date: '28 октября', hist: [D('28 октября', 'Отправлено через RuSender'), D('27 октября', 'Создан черновик письма')] },
  // рассылки
  { id: 'R1', type: 'mailing', title: 'Цепочка писем 1–5: контрактная система', page: 'L1', sites: ['fks'], status: 'running', note: 'Отправлено 2 из 5, следующее 17 ноября', date: '17 ноября', hist: [D('3 ноября', 'Письмо 1 отправлено'), D('9 ноября', 'Письмо 2 отправлено'), D('3 ноября', 'Цепочка запущена')] },
  { id: 'R2', type: 'mailing', title: 'Еженедельное письмо с расписанием, ФКС-Центр', sites: ['fks'], status: 'draft', note: 'Каждый понедельник 10:00, автоотправка выключена', date: '9 ноября', hist: [D('9 ноября', 'Собран черновик на неделю 16–22 ноября')] },
  { id: 'R3', type: 'mailing', title: 'Еженедельное письмо с расписанием, ЕЦПК', sites: ['ecpk'], status: 'draft', note: 'Каждый понедельник 10:00, автоотправка выключена', date: '9 ноября', hist: [D('9 ноября', 'Собран черновик на неделю 16–22 ноября')] },
  { id: 'R4', type: 'mailing', title: 'Еженедельное письмо с расписанием, Аргентум', sites: ['argentum'], status: 'draft', note: 'Каждый понедельник 10:00, автоотправка выключена', date: '9 ноября', hist: [D('9 ноября', 'Собран черновик на неделю 16–22 ноября')] },
  { id: 'R5', type: 'mailing', title: 'Еженедельное письмо с расписанием, ФКС-Центр: 2–8 ноября', sites: ['fks'], status: 'sent', note: 'Отправлено через DashaMail', date: '2 ноября', hist: [D('2 ноября', 'Отправлено через DashaMail'), D('1 ноября', 'Собран черновик')] },
  { id: 'R6', type: 'mailing', title: 'Еженедельное письмо с расписанием, ЕЦПК: 2–8 ноября', sites: ['ecpk'], status: 'sent', note: 'Отправлено через RuSender', date: '2 ноября', hist: [D('2 ноября', 'Отправлено через RuSender'), D('1 ноября', 'Собран черновик')] },
  // карточки каталога
  { id: 'C1', type: 'card', title: 'Контрактная система: практикум по 44-ФЗ', page: 'L1', sites: ['fks', 'ecpk'], status: 'onsite', date: '9 ноября', hist: [D('9 ноября', 'Выложена в каталог ЕЦПК'), D('7 ноября', 'Выложена в каталог ФКС-Центр')] },
  { id: 'C2', type: 'card', title: 'Закупки по 223-ФЗ для заказчиков', page: 'L2', sites: ['fks'], status: 'onsite', date: '6 ноября', hist: [D('6 ноября', 'Выложена в каталог ФКС-Центр')] },
  { id: 'C3', type: 'card', title: 'Охрана труда: удостоверение на 40 часов', page: null, sites: [], status: 'reserve', date: '1 ноября', hist: [D('1 ноября', 'Создана на будущее, без страницы')] },
  { id: 'C4', type: 'card', title: 'Кадры в госсекторе: новое в трудовом праве', page: 'L4', sites: [], status: 'draft', date: '3 ноября', hist: [D('3 ноября', 'Создана вместе со страницей')] },
]
const byId = id => items.find(i => i.id === id)
const pages = () => items.filter(i => i.type === 'page')

const TYPE = {
  page: { tab: 'pages', one: 'Страница', many: 'Страницы программ', ico: 'globe', cls: 'page' },
  letter: { tab: 'letters', one: 'Письмо', many: 'Письма', ico: 'mail', cls: 'letter' },
  mailing: { tab: 'mailings', one: 'Рассылка', many: 'Рассылки', ico: 'send', cls: 'mailing' },
  card: { tab: 'cards', one: 'Карточка', many: 'Карточки каталога', ico: 'card', cls: 'cardk' },
}
const TABS = [['all', 'Все', null], ['pages', 'Страницы', 'page'], ['letters', 'Письма', 'letter'], ['mailings', 'Рассылки', 'mailing'], ['cards', 'Карточки', 'card']]

/* ── состояние ── */
const st = { tab: 'all', q: '', filter: 'any', site: 'any' }

/* ── показ ── */
const app = document.getElementById('app')
let toastT
function toast(text) {
  const t = document.getElementById('toast'); t.textContent = ''
  t.append(h('span', {}, text)); t.hidden = false
  clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true }, 3500)
}
function badge(it) {
  const m = {
    page: { published: ['pub', 'Опубликована'], draft: ['draft', 'Черновик'] },
    letter: { draft: ['draft', 'Черновик'], scheduled: ['warn', `Запланировано на ${it.date}`], sent: ['pub', `Отправлено ${it.date}`] },
    mailing: { draft: ['draft', 'Черновик'], running: ['warn', 'Идёт'], sent: ['pub', 'Отправлена'] },
    card: { onsite: ['pub', 'В каталоге'], draft: ['draft', 'Черновик'], reserve: ['draft', 'На будущее'] },
  }[it.type][it.status]
  return h('span', { class: `badge ${m[0]}` }, h('span', { class: 'dot' }), m[1])
}
function pills(it) {
  if (it.type === 'page' || it.type === 'card') {
    const pool = it.type === 'card' ? SITES.filter(s => s.catalog) : SITES
    return h('span', { class: 'sitepills' }, pool.map(s => {
      const on = it.sites.includes(s.id)
      return h('span', { class: `sitepill ${on ? '' : 'off'}`, title: on ? `Есть на ${s.domain}` : `Не опубликовано на ${s.domain}` },
        h('img', { src: s.logo, alt: '' }), on ? s.name : `${s.name}: нет`)
    }))
  }
  return h('span', { class: 'sitepills' }, it.sites.map(id => { const s = site(id); return h('span', { class: 'sitepill', title: s.domain }, h('img', { src: s.logo, alt: '' }), s.name) }))
}
function pageLink(it) {
  if (it.type === 'page') return null
  if (it.page) return h('span', { class: 'meta' }, 'Страница: ', h('b', {}, byId(it.page).title))
  if (it.type === 'mailing') return null
  return h('span', { class: 'badge warn' }, 'Без страницы')
}
const openEditor = it => toast(`В панели откроется редактор: «${it.title}»`)
function actions(it) {
  const a = []
  if (it.type === 'page') {
    if (it.status === 'draft') a.push(h('button', { class: 'btn primary', type: 'button', onclick: () => publishModal(it) }, ico('globe'), 'Опубликовать'))
    else if (it.sites.length < SITES.length) a.push(h('button', { class: 'btn', type: 'button', onclick: () => publishModal(it) }, ico('globe'), 'На другой сайт'))
    if (!items.some(x => x.type === 'letter' && x.page === it.id)) a.push(h('button', { class: 'btn ghost', type: 'button', onclick: () => letterModal(it.id) }, ico('mail'), 'Создать письмо'))
  }
  if (it.type === 'letter' && it.status === 'draft') a.push(h('button', { class: 'btn primary', type: 'button', onclick: () => sendModal(it) }, ico('send'), 'Отправить'))
  if (it.type === 'card' && it.status !== 'onsite') a.push(h('button', { class: 'btn primary', type: 'button', onclick: () => cardPublishModal(it) }, ico('upload'), 'В каталог'))
  if ((it.type === 'letter' || it.type === 'card') && !it.page) a.push(h('button', { class: 'btn', type: 'button', onclick: () => linkModal(it) }, ico('link'), 'Привязать к странице'))
  a.push(h('button', { class: 'btn ghost', type: 'button', onclick: () => openEditor(it) }, ico('edit'), 'Редактировать'))
  return h('div', { class: 'acts' }, a)
}
function itemCard(it, showType) {
  const T = TYPE[it.type]
  const skip = e => e.target.closest('button, a, details, input, select, label')
  return h('article', { class: 'card item clickable', tabindex: '0', title: 'Открыть редактор', dataset: { id: it.id, type: it.type },
    onclick: e => { if (!skip(e)) openEditor(it) },
    onkeydown: e => { if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) { e.preventDefault(); openEditor(it) } } },
    h('div', { class: `kind ${T.cls}` }, ico(T.ico)),
    h('div', { class: 'main' },
      h('div', { class: 'row' }, showType ? h('span', { class: 'typetag' }, T.one) : null, badge(it), it.type === 'letter' && it.service && it.status !== 'draft' ? h('span', { class: 'meta' }, it.service) : null),
      h('h3', {}, it.title),
      h('div', { class: 'row' }, it.meta ? h('span', { class: 'meta' }, it.meta) : null, it.note ? h('span', { class: 'meta' }, it.note) : null, it.type === 'page' ? letterCount(it) : null),
      h('div', { class: 'row' }, pills(it), pageLink(it))),
    actions(it),
    h('details', { class: 'hist' }, h('summary', {}, `История: ${it.hist.length}`),
      h('ol', {}, it.hist.map(e => h('li', {}, h('time', {}, e.when), e.text)))))
}
function letterCount(p) {
  const n = items.filter(x => x.type === 'letter' && x.page === p.id).length
  const c = items.some(x => x.type === 'card' && x.page === p.id)
  return h('span', { class: 'meta' }, `Писем: ${n}`, c ? ', есть карточка' : ', карточки нет')
}

/* ── окна ── */
function modal(title, body, foot) {
  const close = () => ov.remove()
  const ov = h('div', { class: 'ov', role: 'dialog', 'aria-modal': 'true', onclick: e => { if (e.target === ov) close() } },
    h('div', { class: 'box' },
      h('div', { class: 'hd' }, h('h2', {}, title), h('button', { class: 'btn ghost', type: 'button', 'aria-label': 'Закрыть', style: 'min-width:48px;padding:0', onclick: close }, ico('close'))),
      h('div', { class: 'bd' }, body),
      h('div', { class: 'ft' }, foot(close))))
  document.body.append(ov)
  const f = ov.querySelector('input,select,textarea'); if (f) f.focus()
  return close
}
const field = (label, el, hint) => h('label', { class: 'field' }, h('span', {}, label), el, hint ? h('span', { class: 'hint' }, hint) : null)
const sel = (id, opts) => h('select', { id }, opts.map(([v, t]) => h('option', { value: v }, t)))
const pageOptions = (blank) => [['', blank], ...pages().map(p => [p.id, p.title])]
const siteChecks = (name, pool, on = []) => h('div', { class: 'checks' }, pool.map(s =>
  h('label', { class: 'check' }, h('input', { type: 'checkbox', name, value: s.id, checked: on.includes(s.id) }), h('img', { src: s.logo, alt: '', width: 26, height: 26, style: 'object-fit:contain' }), s.name, h('span', { class: 'dom' }, s.domain))))
const checked = (root, name) => [...root.querySelectorAll(`input[name="${name}"]:checked`)].map(i => i.value)
const cancel = close => h('button', { class: 'btn ghost', type: 'button', onclick: close }, 'Отмена')

function letterModal(pageId = '') {
  const root = h('div', { class: 'stack' },
    field('Тема письма', h('input', { id: 'f-subj', placeholder: 'Например: Контрактная система, открыта запись' })),
    field('О какой программе', sel('f-page', pageOptions('Ни о какой: письмо без страницы')), 'Страницу можно привязать позже'),
    field('Для какого сайта', sel('f-site', SITES.map(s => [s.id, s.name]))),
    field('Тон письма', sel('f-tone', [['1', 'Деловой'], ['2', 'Тёплый'], ['3', 'Короткий']])))
  root.querySelector('#f-page').value = pageId
  const make = () => {
    const page = root.querySelector('#f-page').value || null
    const subj = root.querySelector('#f-subj').value.trim() || (page ? `Письмо: ${byId(page).title}` : 'Новое письмо без темы')
    const it = { id: 'M' + (++uid), type: 'letter', title: subj, page, sites: [root.querySelector('#f-site').value], status: 'draft', date: TODAY, hist: [D(TODAY, page ? 'Создан черновик письма к странице' : 'Создан черновик без страницы')] }
    items.unshift(it); return it
  }
  modal('Создать письмо', root, close => [cancel(close),
    h('button', { class: 'btn', type: 'button', onclick: () => { make(); close(); go('drafts'); toast('Письмо сохранено в «Черновики». Отправить можно позже') } }, ico('file'), 'В черновики'),
    h('button', { class: 'btn primary', type: 'button', onclick: () => { const it = make(); close(); st.tab = 'letters'; st.filter = 'any'; go('materials/letters'); sendModal(it) } }, ico('send'), 'Отправить сейчас')])
}
function pageModal() {
  const root = h('div', { class: 'stack' },
    h('div', { class: 'drop' }, ico('upload', 'ico'), h('span', {}, h('b', {}, 'Выберите файл программы'), ' или перетащите сюда'), h('span', { class: 'hint' }, 'PDF, DOCX, DOC или TXT')),
    field('Название страницы', h('input', { id: 'f-title', placeholder: 'Подставится из файла, можно задать своё' })),
    h('div', { class: 'field' }, h('span', {}, 'Опубликовать на сайтах'), siteChecks('s', SITES), h('span', { class: 'hint' }, 'Ничего не отмечено: страница сохранится черновиком, опубликуете позже')),
    h('p', { class: 'site-note' }, 'Только страница. Письмо и карточку это окно не создаёт: их добавите отдельно, когда понадобятся.'))
  modal('Создать страницу программы', root, close => [cancel(close), h('button', { class: 'btn primary', type: 'button', onclick: () => {
    const on = checked(root, 's')
    items.unshift({ id: 'L' + (++uid), type: 'page', title: root.querySelector('#f-title').value.trim() || 'Новая программа из файла', meta: 'Даты возьмём из файла', status: on.length ? 'published' : 'draft', sites: on, date: TODAY, hist: [on.length ? D(TODAY, `Создана и опубликована: ${on.map(i => site(i).name).join(', ')}`) : D(TODAY, 'Создана из файла программы, черновик')] })
    close(); st.tab = 'pages'; st.filter = 'any'; go('materials/pages'); toast(on.length ? 'Страница создана и опубликована, письма нет' : 'Страница создана черновиком, письма нет')
  } }, 'Создать страницу')])
}
function cardModal() {
  const root = h('div', { class: 'stack' },
    field('Название карточки', h('input', { id: 'f-title', placeholder: 'Например: Охрана труда, 40 часов' })),
    field('Привязать к странице', sel('f-page', pageOptions('Пока без страницы: карточка на будущее')), 'Можно привязать позже, когда страница будет готова'),
    h('div', { class: 'field' }, h('span', {}, 'Каталог какого сайта'), siteChecks('s', SITES.filter(s => s.catalog)), h('span', { class: 'hint' }, 'Каталог есть только у ФКС-Центра и ЕЦПК. В каталог карточка попадёт только по кнопке «В каталог»')))
  modal('Создать карточку', root, close => [cancel(close), h('button', { class: 'btn primary', type: 'button', onclick: () => {
    const page = root.querySelector('#f-page').value || null
    items.unshift({ id: 'C' + (++uid), type: 'card', title: root.querySelector('#f-title').value.trim() || (page ? byId(page).title : 'Новая карточка'), page, sites: [], status: page ? 'draft' : 'reserve', date: TODAY, hist: [D(TODAY, page ? 'Создана к странице' : 'Создана на будущее, без страницы')] })
    close(); st.tab = 'cards'; st.filter = 'any'; go('materials/cards'); toast('Карточка сохранена. В каталог её можно выложить позже')
  } }, 'Создать карточку')])
}
function mailingModal() {
  const root = h('div', { class: 'stack' },
    field('Название рассылки', h('input', { id: 'f-title', placeholder: 'Например: Еженедельное письмо с расписанием' })),
    field('С какого сайта', sel('f-site', SITES.map(s => [s.id, s.name]))),
    field('Привязать к странице', sel('f-page', pageOptions('Без страницы')), 'Для цепочки писем по программе выберите её страницу'))
  const make = now => {
    const page = root.querySelector('#f-page').value || null
    items.unshift({ id: 'R' + (++uid), type: 'mailing', title: root.querySelector('#f-title').value.trim() || 'Новая рассылка', page, sites: [root.querySelector('#f-site').value], status: now ? 'running' : 'draft', note: now ? 'Запущена, первое письмо уходит сегодня' : 'Расписание ещё не задано', date: TODAY, hist: [D(TODAY, now ? 'Создана и запущена' : 'Сохранена в черновики')] })
  }
  modal('Создать рассылку', root, close => [cancel(close),
    h('button', { class: 'btn', type: 'button', onclick: () => { make(false); close(); go('drafts'); toast('Рассылка сохранена в «Черновики»') } }, ico('file'), 'В черновики'),
    h('button', { class: 'btn primary', type: 'button', onclick: () => { make(true); close(); st.tab = 'mailings'; st.filter = 'any'; go('materials/mailings'); toast('Рассылка запущена') } }, ico('send'), 'Запустить сейчас')])
}
function publishModal(it) {
  const root = h('div', { class: 'stack' }, h('p', {}, h('b', {}, it.title)), siteChecks('s', SITES.filter(s => !it.sites.includes(s.id)), SITES.filter(s => !it.sites.includes(s.id)).slice(0, 1).map(s => s.id)))
  modal('Опубликовать на сайте', root, close => [cancel(close), h('button', { class: 'btn primary', type: 'button', onclick: () => {
    const on = checked(root, 's'); if (!on.length) return toast('Отметьте хотя бы один сайт')
    it.sites.push(...on); it.status = 'published'; it.date = TODAY; it.hist.unshift(D(TODAY, `Опубликована: ${on.map(i => site(i).name).join(', ')}`))
    close(); render(); toast(`Опубликовано: ${on.map(i => site(i).name).join(', ')}`)
  } }, 'Опубликовать')])
}
function cardPublishModal(it) {
  const root = h('div', { class: 'stack' }, h('p', {}, h('b', {}, it.title)), siteChecks('s', SITES.filter(s => s.catalog)))
  modal('Выложить карточку в каталог', root, close => [cancel(close), h('button', { class: 'btn primary', type: 'button', onclick: () => {
    const on = checked(root, 's'); if (!on.length) return toast('Отметьте хотя бы один каталог')
    it.sites = on; it.status = 'onsite'; it.date = TODAY; it.hist.unshift(D(TODAY, `Выложена в каталог: ${on.map(i => site(i).name).join(', ')}`))
    close(); render(); toast('Карточка в каталоге')
  } }, 'Выложить')])
}
function sendModal(it) {
  const root = h('div', { class: 'stack' }, h('p', {}, h('b', {}, it.title)),
    field('Через какой сервис', sel('f-svc', [['DashaMail', 'DashaMail'], ['RuSender', 'RuSender']])),
    field('Когда', sel('f-when', [['now', 'Сейчас'], ['later', 'Запланировать на 17 ноября, 10:00']])))
  modal('Отправить письмо', root, close => [cancel(close), h('button', { class: 'btn primary', type: 'button', onclick: () => {
    const svc = root.querySelector('#f-svc').value, later = root.querySelector('#f-when').value === 'later'
    it.service = svc; it.status = later ? 'scheduled' : 'sent'; it.date = later ? '17 ноября' : TODAY
    it.hist.unshift(D(TODAY, later ? `Запланировано на 17 ноября, ${svc}` : `Отправлено через ${svc}`))
    close(); render(); toast(later ? 'Письмо запланировано' : 'Письмо отправлено')
  } }, 'Подтвердить')])
}
function linkModal(it) {
  const root = h('div', { class: 'stack' }, h('p', {}, h('b', {}, it.title)), field('Страница программы', sel('f-page', pageOptions('Выберите страницу').slice(1))))
  modal('Привязать к странице', root, close => [cancel(close), h('button', { class: 'btn primary', type: 'button', onclick: () => {
    it.page = root.querySelector('#f-page').value; if (it.type === 'card' && it.status === 'reserve') it.status = 'draft'
    it.hist.unshift(D(TODAY, `Привязано к странице «${byId(it.page).title}»`))
    close(); render(); toast('Привязано')
  } }, 'Привязать')])
}

/* ── экран «Материалы» ── */
const FILTERS = {
  page: [['any', 'Все'], ['draft', 'Черновики'], ['published', 'Опубликованы']],
  letter: [['any', 'Все'], ['draft', 'Черновики'], ['scheduled', 'Запланированы'], ['sent', 'Отправлены'], ['nopage', 'Без страницы']],
  mailing: [['any', 'Все'], ['running', 'Идут'], ['draft', 'Черновики'], ['sent', 'Отправлены']],
  card: [['any', 'Все'], ['onsite', 'В каталоге'], ['draft', 'Черновики'], ['reserve', 'На будущее']],
}
function visible() {
  const t = TABS.find(x => x[0] === st.tab)[2]
  return items.filter(i => (!t || i.type === t)
    && (st.filter === 'any' || !t || (st.filter === 'nopage' ? !i.page : i.status === st.filter))
    && (st.site === 'any' || (i.sites || []).includes(st.site))
    && (!st.q || i.title.toLowerCase().includes(st.q.toLowerCase())))
}
const CREATE = { page: () => pageModal(), letter: () => letterModal(), mailing: () => mailingModal(), card: () => cardModal() }
function createButtons(all) {
  const t = all ? null : TABS.find(x => x[0] === st.tab)[2]
  if (t) return h('div', { class: 'create-row' },
    h('button', { class: 'btn primary', type: 'button', id: 'b-add', onclick: CREATE[t] }, ico('plus'), TYPE[t].one))
  return h('div', { class: 'create-row' },
    h('button', { class: 'btn primary', type: 'button', id: 'b-letter', onclick: () => letterModal() }, ico('mail'), 'Создать письмо'),
    h('button', { class: 'btn primary', type: 'button', id: 'b-page', onclick: pageModal }, ico('globe'), 'Создать страницу'),
    h('button', { class: 'btn primary', type: 'button', id: 'b-card', onclick: cardModal }, ico('card'), 'Создать карточку'))
}
function renderMaterials(root) {
  root.append(
    h('div', { class: 'screen-head' }, h('h1', {}, 'Материалы'),
      createButtons()),
    h('div', { class: 'intro' }, h('p', {}, h('b', {}, 'Всё, что сделано, лежит здесь, и каждую вещь можно создать отдельно. '), 'На «Главной» программа по-прежнему создаётся пакетом: страница, карточка и письмо вместе. Здесь можно сделать только письмо, только страницу или карточку на будущее, а потом отправить, опубликовать или привязать одно к другому.')))
  const tabs = h('div', { class: 'tabs', role: 'tablist', 'aria-label': 'Разделы материалов' }, TABS.map(([id, label, type]) =>
    h('button', { type: 'button', role: 'tab', 'aria-selected': String(id === st.tab), dataset: { tab: id }, onclick: () => { st.tab = id; st.filter = 'any'; go(id === 'all' ? 'materials' : `materials/${id}`) } },
      label, h('span', { class: 'cnt' }, String(items.filter(i => !type || i.type === type).length)))))
  const t = TABS.find(x => x[0] === st.tab)[2]
  const search = h('label', { class: 'searchbox' }, ico('search'), h('input', { type: 'search', placeholder: 'Найти по названию', value: st.q, 'aria-label': 'Поиск', oninput: e => { st.q = e.target.value; paintList() } }))
  const chipRow = (list, key) => h('div', { class: 'chips' }, list.map(([v, l]) => h('button', { class: 'chip', type: 'button', 'aria-pressed': String(st[key] === v), onclick: () => { st[key] = v; render() } }, l)))
  const bar = h('div', { class: 'filters' }, search,
    t ? chipRow(FILTERS[t], 'filter') : null,
    chipRow([['any', 'Все сайты'], ...SITES.map(s => [s.id, s.name])], 'site'))
  const list = h('div', { class: 'list', id: 'list' })
  root.append(tabs, bar, list)
  function paintList() {
    const v = visible()
    const kids = []
    if (st.tab === 'letters' && st.filter === 'any') kids.push(h('p', { class: 'hint', style: 'margin-bottom:4px' }, 'Письма программ собираются в редакторе страницы, вкладка «Письмо». Письмо-расписание сайтов теперь в «Рассылках».'))
    if (!v.length) kids.push(h('div', { class: 'empty' }, h('h2', {}, 'Ничего не найдено'), h('p', {}, 'Измените поиск или фильтр, либо создайте новое кнопками наверху.')))
    else kids.push(...v.map(i => itemCard(i, st.tab === 'all')))
    list.replaceChildren(...kids)
  }
  paintList()
}

/* ── оболочка и маршруты ── */
const isDraft = i => i.status === 'draft' || i.status === 'reserve'
function renderDrafts(root) {
  const v = items.filter(isDraft)
  root.append(h('div', { class: 'screen-head' }, h('h1', {}, 'Черновики'), createButtons(true)),
    h('p', { class: 'hint', style: 'margin:-12px 0 20px' }, 'Здесь все черновики из «Материалов»: страницы, письма, рассылки и карточки. Любой можно доделать и опубликовать или отправить.'),
    h('div', { class: 'list' }, v.length ? v.map(i => itemCard(i, true)) : h('div', { class: 'empty' }, h('h2', {}, 'Черновиков нет'), h('p', {}, 'Всё опубликовано или отправлено.'))))
}
function go(path) { location.hash = '#/' + path; if (location.hash === '#/' + path) render() }
function route() {
  const [name, sub] = location.hash.replace(/^#\/?/, '').split('/')
  return { name: name || 'materials', sub }
}
function render() {
  const { name, sub } = route()
  if (name === 'materials') { const t = TABS.find(x => x[0] === (sub || 'all')); if (t) { if (st.tab !== t[0]) st.filter = 'any'; st.tab = t[0] } }
  const rail = h('aside', { class: 'rail' }, h('a', { class: 'logo-home', href: '#/programs', title: 'На главную' }, h('img', { class: 'rail-logo', src: 'assets/logo-fks.svg', alt: 'ФКС-Центр', width: 43, height: 60 })),
    h('nav', { 'aria-label': 'Разделы' },
      NAV.map(n => h('a', { class: `nav ${n.name === name ? 'on' : ''}`, href: `#/${n.name}`, dataset: { screen: n.name } }, ico(n.icon), h('span', {}, n.label))),
      h('a', { class: `nav rail-settings ${name === 'settings' ? 'on' : ''}`, href: '#/settings', dataset: { screen: 'settings' } }, ico('settings'), h('span', {}, 'Настройки')),
      h('button', { class: 'nav rail-end', type: 'button', onclick: () => toast('В макете выход не нужен') }, ico('logout'), h('span', {}, 'Выйти'))))
  const main = h('main', {})
  if (name === 'materials') renderMaterials(main)
  else if (name === 'drafts') renderDrafts(main)
  else {
    const n = [...NAV, { name: 'settings', label: 'Настройки' }].find(x => x.name === name) || { label: 'Раздел' }
    main.append(h('div', { class: 'screen-head' }, h('h1', {}, n.label)),
      h('div', { class: 'empty stub' }, h('h2', {}, 'Этот раздел без изменений'), h('p', {}, 'В макете показан только новый блок «Материалы». Остальные разделы остаются как в панели сейчас; отдельного пункта «Письма» в меню больше нет, он переехал внутрь «Материалов».'),
        h('a', { class: 'btn primary', href: '#/materials' }, 'Открыть «Материалы»')))
  }
  app.replaceChildren(h('div', { class: 'app' }, rail, h('div', { class: 'app-col' }, main)))
  const y = scrollY; scrollTo(0, name === 'materials' ? y : 0)
}
window.addEventListener('hashchange', render)
render()

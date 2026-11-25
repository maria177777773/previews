(() => {
const realDocument=window.document;
if(realDocument.getElementById('catalyst-site-navigation'))return;
const host=realDocument.createElement('div');host.id='catalyst-site-navigation';host.style.display='none';
const shadow=host.attachShadow({mode:'open'});
const container=realDocument.createElement('div');container.id='cn-body';
const sheet=realDocument.createElement('link');sheet.rel='stylesheet';sheet.href='/interaction-update-20261105/navigation.css?v=catalog-padding48-20261105';sheet.addEventListener('load',()=>{try{const st=sheet.ownerDocument.createElement('style');st.id='pv-2511-nav';st.textContent=window.__PV_NAV_CSS||'';sheet.after(st)}catch(e){}},{once:true});sheet.setAttribute('data-hover-ready','');
shadow.append(sheet,container);
const footerHost=realDocument.createElement('div');footerHost.id='catalyst-site-footer';footerHost.style.display='none';
const footerShadow=footerHost.attachShadow({mode:'open'});const footerContainer=realDocument.createElement('div');footerContainer.id='cn-body';const footerSheet=sheet.cloneNode();footerShadow.append(footerSheet,footerContainer);
const document=new Proxy(realDocument,{get(target,key){
 if(key==='body')return container;
 if(key==='querySelector')return selector=>{selector=selector.replace(/(?<![-\w.#])body(?![-\w])/g,'#cn-body');return shadow.querySelector(selector)||footerShadow.querySelector(selector)};
 if(key==='querySelectorAll')return selector=>{selector=selector.replace(/(?<![-\w.#])body(?![-\w])/g,'#cn-body');return [...shadow.querySelectorAll(selector),...footerShadow.querySelectorAll(selector)]};
 if(key==='getElementById')return id=>shadow.getElementById(id)||footerShadow.getElementById(id);
 if(key==='activeElement')return shadow.activeElement||footerShadow.activeElement;
 if(['addEventListener','removeEventListener'].includes(key))return (...args)=>{shadow[key](...args);footerShadow[key](...args);if(args[0]==='visibilitychange')target[key](...args)};
 if(key==='dispatchEvent')return shadow.dispatchEvent.bind(shadow);
 const value=Reflect.get(target,key,target);return typeof value==='function'?value.bind(target):value;
}});
container.innerHTML="<style>.menu-label{color:inherit;text-decoration:none;font:inherit}.menu-label:hover{text-decoration:underline;text-underline-offset:4px}.mega-menu[data-kind=newyear]{display:none!important}.mobile-root-season{display:none!important}</style><div class=\"header-proto\" id=\"header\"><div class=\"topline\"><nav class=\"utility-nav\" aria-label=\"Дополнительные разделы\"><a href=\"/reviews/\" target=\"_blank\" rel=\"noopener\">Отзывы</a><a href=\"/teambuilding-video/\" target=\"_blank\" rel=\"noopener\">Видео</a><a href=\"/blog/\" target=\"_blank\" rel=\"noopener\">Блог</a><a href=\"/foragencies/\" target=\"_blank\" rel=\"noopener\">Агентствам</a><a href=\"#offers-preview\" id=\"offers-trigger\" aria-haspopup=\"dialog\">Акции</a></nav><div class=\"utility-contacts\"><span class=\"geo-inline\">Москва, МО · выезды по России</span><span><a href=\"tel:+79911501001\">+7 991 150-10-01</a> · Пн–Вс 8:00–22:00</span></div></div><div class=\"primary-line\"><a class=\"brand\" href=\"/\" aria-label=\"Каталист — главная\"><img src=\"/home-release-20261104-v2/folder-source/assets/logo.png\" alt=\"Каталист\" width=\"176\" height=\"176\" decoding=\"async\"></a><nav aria-label=\"Основное меню\"><details class=\"mega-menu\" data-kind=\"programs\"><summary><a class=\"menu-label\" href=\"https://catalystrussia.ru/#catalog\">Тимбилдинг</a></summary><div class=\"mega-panel\"><div class=\"mega-head\"><div><h3>Каталог программ</h3><p>Отдельные игры и активности для команды</p></div></div><div class=\"mega-layout\"><nav class=\"mega-categories\" aria-label=\"Категории: Каталог программ\"><button type=\"button\" class=\"mega-category selected\" data-menu=\"programs\" data-index=\"0\" aria-pressed=\"true\">Популярные<span aria-hidden=\"true\">›</span></button><button type=\"button\" class=\"mega-category\" data-menu=\"programs\" data-index=\"1\" aria-pressed=\"false\">Новогодние<span aria-hidden=\"true\">›</span></button><button type=\"button\" class=\"mega-category\" data-menu=\"programs\" data-index=\"2\" aria-pressed=\"false\">Бизнес-игры<span aria-hidden=\"true\">›</span></button><button type=\"button\" class=\"mega-category\" data-menu=\"programs\" data-index=\"3\" aria-pressed=\"false\">Творческие<span aria-hidden=\"true\">›</span></button><button type=\"button\" class=\"mega-category\" data-menu=\"programs\" data-index=\"4\" aria-pressed=\"false\">Спортивные<span aria-hidden=\"true\">›</span></button><button type=\"button\" class=\"mega-category\" data-menu=\"programs\" data-index=\"5\" aria-pressed=\"false\">Кулинарные<span aria-hidden=\"true\">›</span></button><button type=\"button\" class=\"mega-category\" data-menu=\"programs\" data-index=\"6\" aria-pressed=\"false\">С нейросетями<span aria-hidden=\"true\">›</span></button><button type=\"button\" class=\"mega-category\" data-menu=\"programs\" data-index=\"7\" aria-pressed=\"false\">Необычные<span aria-hidden=\"true\">›</span></button></nav><div class=\"mega-results\" aria-live=\"polite\"><h4>Популярные</h4><p>Начните с известных программ и сравните, что делают участники.</p><div class=\"mega-links\"><a target=\"_blank\" rel=\"noopener\" href=\"/teambuilding/vse-programmy/festival-fudtrakov/\">Фестиваль Фудтраков<span aria-hidden=\"true\">↗</span></a><a target=\"_blank\" rel=\"noopener\" href=\"/teambuilding/vse-programmy/gorodskaya-strojka/\">Мегаполис<span aria-hidden=\"true\">↗</span></a><a target=\"_blank\" rel=\"noopener\" href=\"/teambuilding/vse-programmy/wow-bashnya/\">WOW Башня<span aria-hidden=\"true\">↗</span></a><a target=\"_blank\" rel=\"noopener\" href=\"/teambuilding/vse-programmy/formula-1/\">Гонки Формула-1<span aria-hidden=\"true\">↗</span></a><a target=\"_blank\" rel=\"noopener\" href=\"/teambuilding/vse-programmy/wow-pizza/\">WOW Пицца<span aria-hidden=\"true\">↗</span></a><a target=\"_blank\" rel=\"noopener\" href=\"/startap_business_game/\">Стартап с нейросетями<span aria-hidden=\"true\">↗</span></a></div><a class=\"mega-all-category\" href=\"/teambuilding-hit/\" target=\"_blank\" rel=\"noopener\">Смотреть все программы категории →</a></div><aside class=\"mega-promo\"><small>Актуальное предложение</small><h4>Новый год 2027</h4><p>Командные игры и программы к празднику</p><a href=\"/novogodnij-korporativ/\">Посмотреть предложение →</a></aside></div><div class=\"mega-footer\"><a href=\"/timbilding/\" target=\"_blank\" rel=\"noopener\">Весь каталог программ →</a><a href=\"/#contacts\">Помочь с выбором</a></div></div></details><details class=\"mega-menu\" data-kind=\"newyear\" hidden><summary>Новый год 2027</summary><div class=\"mega-panel\"><div class=\"mega-head\"><div><h3>Новый год для вашей команды</h3><p>Весь праздник под ключ, командная игра или отдельные активности</p></div></div><div class=\"mega-layout\"><nav class=\"mega-categories\" aria-label=\"Новогодние направления\"><button type=\"button\" class=\"mega-category selected\" data-index=\"0\" aria-pressed=\"true\">Праздник под ключ<span>›</span></button><button type=\"button\" class=\"mega-category \" data-index=\"1\" aria-pressed=\"false\">Командные игры<span>›</span></button><button type=\"button\" class=\"mega-category \" data-index=\"2\" aria-pressed=\"false\">Станции, фотозоны и шоу<span>›</span></button></nav><div class=\"mega-results\" aria-live=\"polite\"><h4>Праздник под ключ</h4><p>Нужен весь вечер: площадка, банкет, ведущий и развлекательная программа.</p><div class=\"mega-links\"><a href=\"/novogodnij-korporativ/do-50-chelovek/\" target=\"_blank\" rel=\"noopener\">Камерный Новый год · до 50 гостей</a><a href=\"/novogodnij-korporativ/na-50-200-chelovek/\" target=\"_blank\" rel=\"noopener\">Новый год компании · 50–200 гостей</a><a href=\"/novogodnij-korporativ/ot-200-chelovek/\" target=\"_blank\" rel=\"noopener\">Большой праздник · 200–3 000 гостей</a></div><a class=\"mega-all-category\" href=\"/novogodnij-korporativ/\">Все варианты новогоднего праздника →</a></div><aside class=\"mega-promo\"><small>Корпоративные праздники</small><h4>Новый год 2027</h4><p class=\"promo-deadline\">Зал, банкет, игра, ведущий и шоу — в пакетах под ключ</p><a href=\"/novogodnij-korporativ/\" target=\"_blank\" rel=\"noopener\">Посмотреть пакеты →</a></aside></div><div class=\"mega-footer\"><a href=\"/novogodnij-korporativ/\" target=\"_blank\" rel=\"noopener\">Всё для Нового года →</a><a href=\"/#contacts\">Помочь с выбором</a></div></div></details><details class=\"mega-menu\" data-kind=\"corporate\"><summary><a class=\"menu-label\" href=\"https://catalystrussia.ru/korporativ/\">Корпоративы</a></summary><div class=\"mega-panel\"><div class=\"mega-head\"><div><h3>Корпоративы под ключ</h3><p>Организация события целиком</p></div></div><div class=\"mega-layout\"><nav class=\"mega-categories\" aria-label=\"Категории: Корпоративы под ключ\"><button type=\"button\" class=\"mega-category selected\" data-menu=\"corporate\" data-index=\"0\" aria-pressed=\"true\">Выбрать повод<span aria-hidden=\"true\">›</span></button><button type=\"button\" class=\"mega-category\" data-menu=\"corporate\" data-index=\"1\" aria-pressed=\"false\">Где проводим<span aria-hidden=\"true\">›</span></button></nav><div class=\"mega-results\" aria-live=\"polite\"><h4>Выбрать повод</h4><p>Выберите, какое событие планирует компания.</p><div class=\"mega-links\"><a target=\"_blank\" rel=\"noopener\" href=\"/novogodnij-korporativ/\">Новогодний корпоратив<span aria-hidden=\"true\">↗</span></a><a target=\"_blank\" rel=\"noopener\" href=\"/yubiley-kompanii/\">Юбилей компании<span aria-hidden=\"true\">↗</span></a><a target=\"_blank\" rel=\"noopener\" href=\"/letnij-korporativ/\">Летний корпоратив<span aria-hidden=\"true\">↗</span></a><a target=\"_blank\" rel=\"noopener\" href=\"/korporativ/\">Тематический корпоратив<span aria-hidden=\"true\">↗</span></a></div><a class=\"mega-all-category\" href=\"/korporativ/\" target=\"_blank\" rel=\"noopener\">Подробнее об организации →</a></div><aside class=\"mega-promo\"><small>Актуальное предложение</small><h4>Новый год 2027</h4><p>Корпоратив под ключ: зал, банкет, игра, ведущий и шоу</p><a href=\"/novogodnij-korporativ/\">Посмотреть предложение →</a></aside></div><div class=\"mega-footer\"><a href=\"/korporativ/\" target=\"_blank\" rel=\"noopener\">Все корпоративы под ключ →</a><a href=\"/#contacts\">Обсудить мероприятие</a></div></div></details><a href=\"/cases/\" target=\"_blank\" rel=\"noopener\">Портфолио</a><details class=\"mega-menu about-menu\" data-kind=\"about\"><summary>О компании</summary><div class=\"mega-panel\"><div class=\"mega-head\"><h3>О компании</h3></div><div class=\"about-layout\"><nav aria-label=\"Разделы компании\"><a href=\"/about/\">О нас</a><a href=\"/#contacts\">Контакты</a></nav><div><h4>Работаем с 2010 года</h4><p>Собственное производство реквизита и своя школа ведущих.</p><a href=\"/about/\">Подробнее об агентстве →</a></div></div></div></details></nav><button type=\"button\" class=\"search-toggle\" aria-expanded=\"false\" aria-controls=\"header-search\" aria-label=\"Поиск по программам\"><svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\"><circle cx=\"10\" cy=\"10\" r=\"6.5\"/><path d=\"m15 15 6 6\"/></svg></button><a class=\"messenger mv-ib-tg\" title=\"Telegram\" aria-label=\"Написать в Telegram\" href=\"https://telegram.me/irek_stn\" rel=\"nofollow\" target=\"_blank\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M21.9 4.6 18.6 19.2c-.2 1-.9 1.2-1.8.8l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.2-8.3c.4-.4-.1-.6-.6-.2l-11.4 7.2-4.9-1.5c-1.1-.3-1.1-1.1.2-1.6L20.4 3c.9-.3 1.7.2 1.5 1.6z\"/></svg></a><a class=\"messenger mv-ib-max\" title=\"Max\" aria-label=\"Написать в Max\" href=\"https://max.ru/u/f9LHodD0cOKJGPNk8tLsr7rNfEOQc77ksLyB_spYPyOeeyFZdwIjxNIvtZs\" rel=\"nofollow\" target=\"_blank\"><svg viewBox=\"0 0 120 120\" fill=\"url(#mvMaxC)\" aria-hidden=\"true\"><defs><linearGradient id=\"mvMaxC\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"><stop offset=\"0%\" stop-color=\"#9849DC\"/><stop offset=\"51%\" stop-color=\"#3353EF\"/><stop offset=\"100%\" stop-color=\"#3CB2FC\"/></linearGradient></defs><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M60.6823 104.739C51.7136 104.739 47.5431 103.428 40.2984 98.1916C35.7143 104.086 21.1999 108.69 20.5671 100.813C20.5671 94.8981 19.2567 89.9005 17.7768 84.4445C16.008 77.723 14 70.239 14 59.3918C14 33.4871 35.2559 14 60.4382 14C85.6503 14 105.397 34.4487 105.397 59.636C105.481 84.4296 85.4759 104.609 60.6823 104.739ZM61.051 36.392C48.7838 35.7592 39.2271 44.2496 37.1095 57.5632C35.3656 68.5848 38.4648 82.008 41.1055 82.7056C42.3711 83.0095 45.56 80.4335 47.5431 78.4504C50.8268 80.7194 54.6509 82.0823 58.6295 82.4017C71.3352 83.0145 82.1974 73.3382 83.0494 60.6425C83.5477 47.9218 73.7618 37.1444 61.051 36.4169V36.392Z\"/></svg></a><a href=\"#contact-dialog\" class=\"cta\" data-form=\"callback\" aria-haspopup=\"dialog\">Заказать звонок</a></div><div id=\"header-search\" hidden><label>Поиск по программам<input id=\"program-search\" type=\"search\" placeholder=\"Например, Мегаполис или Фудтраки\"></label><div id=\"search-result\" aria-live=\"polite\"></div></div></div>";
realDocument.body.prepend(host);
footerContainer.innerHTML="<section class=\"continuation-block\" id=\"s10\" aria-labelledby=\"contact-folder-title\"><div class=\"continuation-inner\"><div class=\"contact-scene\"><img class=\"contact-scene-photo\" src=\"/home-release-20261104-v2/assets/performance/assets--continuation--contact-rustore-lossless-1500.webp\" alt=\"Город с башнями RuStore, собранный участниками тимбилдинга\" loading=\"lazy\" width=\"1500\" height=\"1000\" srcset=\"/home-release-20261104-v2/assets/performance/assets--continuation--contact-rustore-lossless-320.webp 320w, /home-release-20261104-v2/assets/performance/assets--continuation--contact-rustore-lossless-640.webp 640w, /home-release-20261104-v2/assets/performance/assets--continuation--contact-rustore-lossless-960.webp 960w, /home-release-20261104-v2/assets/performance/assets--continuation--contact-rustore-lossless-1280.webp 1280w, /home-release-20261104-v2/assets/performance/assets--continuation--contact-rustore-lossless-1500.webp 1500w\" sizes=\"(max-width:700px) calc(100vw - 24px), calc(100vw - 48px)\" decoding=\"async\"><div class=\"contact-folder\"><div class=\"contact-folder-tab\">Обсудим ваше событие</div><div class=\"contact-folder-body\"><h2 id=\"contact-folder-title\"><span class=\"contact-title-accent\">Ваша команда, наша идея</span></h2><p class=\"contact-folder-copy\">Расскажите, какое событие планируете.<br> Поможем выбрать программу и собрать всё под ключ.</p><div class=\"contact-folder-connect\"><div class=\"contact-folder-actions\"><a class=\"cta\" href=\"https://telegram.me/irek_stn\" target=\"_blank\" rel=\"noopener\"><svg class=\"contact-messenger-icon\" fill=\"currentColor\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M21.9 4.6 18.6 19.2c-.2 1-.9 1.2-1.8.8l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.2-8.3c.4-.4-.1-.6-.6-.2l-11.4 7.2-4.9-1.5c-1.1-.3-1.1-1.1.2-1.6L20.4 3c.9-.3 1.7.2 1.5 1.6z\"/></svg>Обсудить в Telegram</a><a class=\"cta secondary\" href=\"https://max.ru/u/f9LHodD0cOKJGPNk8tLsr7rNfEOQc77ksLyB_spYPyOeeyFZdwIjxNIvtZs\" target=\"_blank\" rel=\"noopener\"><svg class=\"contact-messenger-icon\" fill=\"#5146ff\" viewBox=\"0 0 120 120\" aria-hidden=\"true\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M60.6823 104.739C51.7136 104.739 47.5431 103.428 40.2984 98.1916C35.7143 104.086 21.1999 108.69 20.5671 100.813C20.5671 94.8981 19.2567 89.9005 17.7768 84.4445C16.008 77.723 14 70.239 14 59.3918C14 33.4871 35.2559 14 60.4382 14C85.6503 14 105.397 34.4487 105.397 59.636C105.481 84.4296 85.4759 104.609 60.6823 104.739ZM61.051 36.392C48.7838 35.7592 39.2271 44.2496 37.1095 57.5632C35.3656 68.5848 38.4648 82.008 41.1055 82.7056C42.3711 83.0095 45.56 80.4335 47.5431 78.4504C50.8268 80.7194 54.6509 82.0823 58.6295 82.4017C71.3352 83.0145 82.1974 73.3382 83.0494 60.6425C83.5477 47.9218 73.7618 37.1444 61.051 36.4169V36.392Z\"/></svg>Обсудить в Max</a></div><div class=\"contact-qr-pair\"><a class=\"contact-folder-qr\" href=\"https://telegram.me/irek_stn\" target=\"_blank\" rel=\"noopener\" aria-label=\"Открыть чат в Telegram\"><img src=\"/home-release-20261104-v2/assets/continuation/contact-telegram-qr.svg?v=matching-grid-49-20261104\" alt=\"QR-код для связи в Telegram\" width=\"120\" height=\"120\" loading=\"lazy\" decoding=\"async\"><span>Обсудить в Telegram</span></a><a class=\"contact-folder-qr\" href=\"https://max.ru/u/f9LHodD0cOKJGPNk8tLsr7rNfEOQc77ksLyB_spYPyOeeyFZdwIjxNIvtZs\" target=\"_blank\" rel=\"noopener\" aria-label=\"Открыть чат в Max\"><img src=\"/home-release-20261104-v2/assets/continuation/contact-max-qr.svg?v=valid-max-166\" alt=\"QR-код для связи в Max\" width=\"120\" height=\"120\" loading=\"lazy\" decoding=\"async\"><span>Обсудить в Max</span></a></div></div><p class=\"contact-folder-hours\">Ежедневно с 8:00 до 22:00</p><div class=\"contact-folder-direct\"><a href=\"tel:+79911501001\">+7 (991) 150-10-01</a><a href=\"mailto:info@catalystrussia.ru\">info@catalystrussia.ru</a></div><div class=\"contact-legal-row\"><p>Москва, Берсеневская набережная, 6, стр. 3</p><p>ИП Варламова Мария Вадимовна · ИНН 772865086700</p></div></div></div><aside class=\"contact-support\"><nav class=\"contact-social-strip\" aria-label=\"Каталист в соцсетях\"><h3>Мы в соцсетях</h3><div><a href=\"https://vk.com/catalystagency\" target=\"_blank\" rel=\"noopener\"><svg class=\"social-network-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M3 5h4c.4 5 2.3 7.1 3.8 7.6V5h3.7v4.4c1.5-.2 3.1-2.3 3.6-4.4H22c-.4 2.6-2.3 4.8-3.7 5.8 1.5.8 3.8 3 4.7 6.2h-4.3c-.6-2-2.1-3.7-4.2-3.9V17h-.5C6.7 17 3.5 12.1 3 5Z\"/></svg><span>ВКонтакте</span></a><a href=\"https://rutube.ru/channel/77141556/\" target=\"_blank\" rel=\"noopener\"><svg class=\"social-network-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"5\"/><path d=\"M8 6h5.7a4 4 0 0 1 1.5 7.7L18 18h-3.5l-2.5-4H11v4H8Zm3 3v2h2.5a1 1 0 0 0 0-2Z\" fill=\"#f3f2ed\"/></svg><span>RuTube</span></a><a href=\"https://www.youtube.com/@catalystrussia\" target=\"_blank\" rel=\"noopener\"><svg class=\"social-network-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M22 7s-.2-2-2-2.4C18.1 4.2 12 4.2 12 4.2s-6.1 0-8 .4C2.2 5 2 7 2 7s-.4 2.2-.4 5 .4 5 .4 5 .2 2 2 2.4c1.9.4 8 .4 8 .4s6.1 0 8-.4C21.8 19 22 17 22 17s.4-2.2.4-5S22 7 22 7Z\"/><path d=\"m10 8 6 4-6 4Z\" fill=\"#f3f2ed\"/></svg><span>YouTube</span></a><a href=\"https://t.me/catalyst_agency\" target=\"_blank\" rel=\"noopener\"><svg class=\"social-network-icon\" fill=\"currentColor\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M21.9 4.6 18.6 19.2c-.2 1-.9 1.2-1.8.8l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.2-8.3c.4-.4-.1-.6-.6-.2l-11.4 7.2-4.9-1.5c-1.1-.3-1.1-1.1.2-1.6L20.4 3c.9-.3 1.7.2 1.5 1.6z\"/></svg><span>Telegram-канал</span></a><a href=\"https://max.ru/u/f9LHodD0cOKiAVGFznh2Xf5KMmIIBG_SE4clws1rL5ygurh_cWWheFDIXWQ\" target=\"_blank\" rel=\"noopener\"><svg class=\"social-network-icon\" fill=\"currentColor\" viewBox=\"0 0 120 120\" aria-hidden=\"true\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M60.6823 104.739C51.7136 104.739 47.5431 103.428 40.2984 98.1916C35.7143 104.086 21.1999 108.69 20.5671 100.813C20.5671 94.8981 19.2567 89.9005 17.7768 84.4445C16.008 77.723 14 70.239 14 59.3918C14 33.4871 35.2559 14 60.4382 14C85.6503 14 105.397 34.4487 105.397 59.636C105.481 84.4296 85.4759 104.609 60.6823 104.739ZM61.051 36.392C48.7838 35.7592 39.2271 44.2496 37.1095 57.5632C35.3656 68.5848 38.4648 82.008 41.1055 82.7056C42.3711 83.0095 45.56 80.4335 47.5431 78.4504C50.8268 80.7194 54.6509 82.0823 58.6295 82.4017C71.3352 83.0145 82.1974 73.3382 83.0494 60.6425C83.5477 47.9218 73.7618 37.1444 61.051 36.4169V36.392Z\"/></svg><span>Max</span></a></div></nav></aside></div></div></section><footer class=\"continuation-block\" id=\"prototype-footer\"><div class=\"continuation-inner\"><div class=\"footer-proto-nav\"><nav class=\"ftr-col\" aria-label=\"Тимбилдинги\"><p class=\"ftr-h\">Тимбилдинги</p><ul><li><a href=\"/timbilding/\">Программы тимбилдинга</a></li><li><a href=\"/teambuilding-hit/\">Популярные тимбилдинги</a></li><li><a href=\"/organizaciya-timbildinga/\">Организация тимбилдинга</a></li><li><a href=\"/teambuilding-how-works/\">Как работают тимбилдинги</a></li><li><a href=\"/stoimost_teambuildinga/\">Стоимость</a></li><li><a href=\"/teambuilding-video/\">Видео тимбилдинга</a></li><li><a href=\"/reviews/\">Отзывы</a></li></ul></nav><nav class=\"ftr-col\" aria-label=\"Корпоративы и ивенты\"><p class=\"ftr-h\">Корпоративы и ивенты</p><ul><li><a href=\"/korporativ/\">Организация корпоратива</a></li><li><a href=\"/vyezdnoj-korporativ/\">Выездной корпоратив</a></li><li><a href=\"/novogodnij-korporativ/\">Новогодний корпоратив</a></li><li><a href=\"/korporativnye-meropriyatiya/\">Корпоративные мероприятия</a></li><li><a href=\"/organizaciya-meropriyatiy/\">Организация мероприятий</a></li><li><a href=\"/ivent-agentstvo/\">Ивент-агентство</a></li></ul></nav><nav class=\"ftr-col\" aria-label=\"О компании\"><p class=\"ftr-h\">О компании</p><ul><li><a href=\"/about/\">О нас</a></li><li><a href=\"/cases/\">Портфолио</a></li><li><a href=\"/kontakty/\">Контакты</a></li><li><a href=\"/blog/\">Блог</a></li><li></li><li><a href=\"/scholarship/\">Соцпрограмма Scholarship</a></li><li><a href=\"/sotrudnichestvo/\">Сотрудничество</a></li></ul></nav><nav class=\"ftr-col\" aria-label=\"География\"><p class=\"ftr-h\">География</p><ul><li><a href=\"/timbilding/\">Тимбилдинг в Москве</a></li><li><a href=\"/timbilding-v-podmoskove/\">Подмосковье</a></li><li><a href=\"/timbilding-spb/\">Санкт-Петербург</a></li><li><a href=\"/timbilding-ekaterinburg/\">Екатеринбург</a></li><li><a href=\"/timbilding-nizhnij-novgorod/\">Нижний Новгород</a></li></ul></nav></div><div class=\"footer-proto-bottom\"><div><h3 id=\"newsletter-title\">Подписаться на рассылку</h3><form class=\"footer-newsletter\" aria-labelledby=\"newsletter-title\" onsubmit=\"event.preventDefault()\"><div class=\"newsletter-controls\"><input id=\"newsletter-email\" aria-label=\"Ваш email\" name=\"email\" type=\"email\" autocomplete=\"email\" inputmode=\"email\" placeholder=\"name@company.ru\" required><button type=\"submit\">Подписаться</button></div></form></div></div><div class=\"footer-proto-legal\"><div class=\"footer-legal-group\"><p>© 2010 - 2026 Каталист: агентство организации тимбилдинга</p><p>Россия, Москва, Берсеневская набережная, 6, стр. 3</p><p>ИП Варламова Мария Вадимовна, ИНН 772865086700</p></div><div class=\"footer-legal-group\"><p>Фото можно использовать со ссылкой на catalystrussia.ru</p><a href=\"/politika-confidencialnosti/\" target=\"_blank\" rel=\"noopener\">Политика конфиденциальности</a><a href=\"#header\">Наверх ↑</a></div></div></div></footer>";

const legacyFooters=[...realDocument.querySelectorAll('footer#t-footer,footer.site-ftr,footer.cfooter,.t447.ftr')].map(el=>el.closest('#t-footer')||el.closest('.t-rec')||el);
const legacyContacts=[...realDocument.querySelectorAll('section.ctc#contacts')];
let anchor=legacyContacts[0]||legacyFooters[0];
for(const footer of legacyFooters){if(anchor&&footer.contains(anchor))anchor=footer;}
if(anchor)anchor.before(footerHost);else realDocument.body.append(footerHost);
const hideLegacy=()=>{for(const el of [...legacyContacts,...legacyFooters])el.setAttribute('data-catalyst-replaced','');};
const catalogTemplate=realDocument.createElement("div");catalogTemplate.id="catalog-download";catalogTemplate.hidden=true;catalogTemplate.innerHTML="<div class=\"cfb-art cfb-design-art\" aria-hidden=\"true\"><div class=\"cfb-design-back\"><img src=\"/home-release-20261104-v2/assets/catalog-figma/back-base-lossless.webp\" alt=\"\" loading=\"lazy\" width=\"1408\" height=\"792\" decoding=\"async\"><img src=\"/home-release-20261104-v2/assets/performance/assets--catalog-figma--back-new-lossless-2798.webp\" alt=\"\" loading=\"lazy\" width=\"2798\" height=\"1576\" srcset=\"/home-release-20261104-v2/assets/performance/assets--catalog-figma--back-new-lossless-320.webp 320w, /home-release-20261104-v2/assets/performance/assets--catalog-figma--back-new-lossless-640.webp 640w, /home-release-20261104-v2/assets/performance/assets--catalog-figma--back-new-lossless-960.webp 960w, /home-release-20261104-v2/assets/performance/assets--catalog-figma--back-new-lossless-1280.webp 1280w, /home-release-20261104-v2/assets/performance/assets--catalog-figma--back-new-lossless-2798.webp 2798w\" sizes=\"(max-width:700px) 80vw, 40vw\" decoding=\"async\"></div><img class=\"cfb-design-front\" src=\"/home-release-20261104-v2/assets/performance/assets--catalog-figma--front-new-lossless-1408.webp\" alt=\"\" loading=\"lazy\" width=\"1408\" height=\"792\" srcset=\"/home-release-20261104-v2/assets/performance/assets--catalog-figma--front-new-lossless-320.webp 320w, /home-release-20261104-v2/assets/performance/assets--catalog-figma--front-new-lossless-640.webp 640w, /home-release-20261104-v2/assets/performance/assets--catalog-figma--front-new-lossless-960.webp 960w, /home-release-20261104-v2/assets/performance/assets--catalog-figma--front-new-lossless-1280.webp 1280w, /home-release-20261104-v2/assets/performance/assets--catalog-figma--front-new-lossless-1408.webp 1408w\" sizes=\"(max-width:700px) 80vw, 40vw\" decoding=\"async\"></div>";container.append(catalogTemplate);
let MVS,menuSearchData;

/* Repeated neighbours keep native touch scrolling continuous in both directions. */
const createLoopCarousel = function(track, cards, enabled = () => true) {
 const count=cards.length;
 let copies=[],span=0,base=0,active=false,timer;
 const mod=(value,size)=>(value%size+size)%size;
 function clone(card){
  const copy=card.cloneNode(true);
  copy.dataset.loopCopy='';copy.setAttribute('aria-hidden','true');
  [copy,...copy.querySelectorAll('[id]')].forEach(el=>el.removeAttribute('id'));
  [copy,...copy.querySelectorAll('a,button,input,select,textarea,[tabindex]')].forEach(el=>el.setAttribute('tabindex','-1'));
  copy.addEventListener('click',event=>{
   event.preventDefault();event.stopPropagation();
   const nodes=[copy,...copy.querySelectorAll('*')],original=[card,...card.querySelectorAll('*')];
   original[nodes.indexOf(event.target)]?.click();
  });
  return copy;
 }
 function jump(left){track.scrollTo({left,behavior:'instant'});}
 function refresh(){
  const should=enabled()&&count>1&&track.clientWidth>0;
  const index=active&&span?mod(track.scrollLeft-base,span)/span:0;
  if(!should){if(active){copies.forEach(el=>el.remove());copies=[];active=false;span=base=0;jump(0);}return;}
  if(!active){
   const before=cards.map(clone),after=cards.map(clone);
   track.prepend(...before);track.append(...after);copies=[...before,...after];active=true;
  }
  const nextSpan=cards[0].offsetLeft-copies[0].offsetLeft;
  if(nextSpan>0&&nextSpan!==span){span=nextSpan;base=span;jump(base+index*span);}
 }
 function position(){return active&&span?mod(track.scrollLeft-base,span):track.scrollLeft;}
 function normalize(){
  if(!active||!span)return;
  if(track.scrollLeft<base-1||track.scrollLeft>=base+span-1)jump(base+position());
 }
 function move(left,behavior='smooth'){
  if(!active||!span){track.scrollTo({left,behavior});return;}
  // Choose the nearest equivalent slide, including the adjoining copy.
  const target=base+mod(left,span);
  const candidates=[target-span,target,target+span];
  const nearest=candidates.reduce((a,b)=>Math.abs(b-track.scrollLeft)<Math.abs(a-track.scrollLeft)?b:a);
  track.scrollTo({left:nearest,behavior});
 }
 track.addEventListener('scroll',()=>{clearTimeout(timer);timer=setTimeout(normalize,160)},{passive:true});
 track.addEventListener('scrollend',normalize);
 const observer=new ResizeObserver(refresh);observer.observe(track);refresh();
 return {position,move,refresh,destroy(){observer.disconnect();clearTimeout(timer);copies.forEach(el=>el.remove());}};
};

/* Поиск по сайту catalystrussia.ru: данные и движок меню V1. Собирает _shared/menu_v1.py, руками не править. */
menuSearchData={"built": "2026-10-07", "programs": [{"url": "/teambuilding/vse-programmy/wow-bashnya/", "name": "WOW Башня", "aliases": [], "cats": [], "hit": true, "kind": "Креатив", "place": "В помещении", "price": "от 4 700 ₽", "img": "/home-release-20261104-v2/folder-source/assets/search/wow-bashnya-hover.webp", "desc": "Гигантский 10-метровый арт-объект, который команда создаёт своими руками. Аналогов в России нет."}, {"url": "/teambuilding/vse-programmy/wow-pizza/", "name": "WOW Пицца", "aliases": ["Тимбилдинг WOW Пицца"], "cats": ["Необычные"], "hit": true, "kind": "Необычные", "place": "На улице", "price": "от 3 200 ₽", "img": "/home-release-20261104-v2/folder-source/assets/search/wow-pizza.webp", "desc": "Готовим пиццу диаметром 3 метра, самую большую в России. Готовит вся команда, такой формат есть только у Каталист."}, {"url": "/teambuilding/vse-programmy/gorodskaya-strojka/", "name": "Город Мегаполис", "aliases": ["Тимбилдинг Мегаполис", "Мегаполис"], "cats": ["Бизнес-игры"], "hit": true, "kind": "Бизнес-игры", "place": "В помещении", "price": "от 3 200 ₽", "img": "/home-release-20261104-v2/folder-source/assets/search/megapolis.webp", "desc": "Топовая бизнес-игра: команды строят город из тысяч деталей и договариваются, как собрать его в единый Мегаполис."}, {"url": "/startap_business_game/", "name": "Стартап с нейросетями", "aliases": [], "cats": ["С нейросетями"], "hit": true, "kind": "Нейросети", "place": "В помещении", "price": "от 3 200 ₽", "img": "/home-release-20261104-v2/folder-source/assets/search/startup.webp", "desc": "Команды создают AI-стартапы и защищают идею для рынка. Победитель BEMA 2025 за ИИ-проект."}, {"url": "/teambuilding/vse-programmy/festival-fudtrakov/", "name": "Фестиваль Фудтраков", "aliases": ["Тимбилдинг Фестиваль Фудтраков"], "cats": ["Необычные"], "hit": true, "kind": "Необычные", "place": "На улице", "price": "от 3 700 ₽", "img": "/home-release-20261104-v2/folder-source/assets/search/festival-foodtrucks.webp", "desc": "Команды строят фудтраки, у каждого своя кухня мира. На фестивале каждый фудтрак зарабатывает игровую валюту. Премия «Событие года» за лучший тимбилдинг-проект."}, {"url": "/teambuilding/vse-programmy/formula-1/", "name": "Формула-1", "aliases": ["Тимбилдинг Гонки Формула 1", "Гонки Формула 1"], "cats": ["Спортивные"], "hit": true, "kind": "Спортивные", "place": "На улице", "price": "от 3 300 ₽", "img": "/home-release-20261104-v2/folder-source/assets/search/040881bb5afab20e.webp", "desc": "Премиальный спортивный тимбилдинг в стиле F1: болиды, скорость, командный результат."}, {"url": "/teambuilding/vse-programmy/art-fun-sport/", "name": "Art&Fun&Sport", "aliases": [], "cats": ["Спортивные", "Необычные"], "hit": false, "kind": "Спортивные", "place": "На улице", "price": "от 3 300 ₽", "img": "/home-release-20261104-v2/folder-source/assets/search/art-fun-sport.webp", "desc": "Спортивный квест с элементами творчества и юмора: команды проходят этапы со спортом, логикой, творческими заданиями и фаном."}, {"url": "/teambuilding/vse-programmy/ekipazh/", "name": "Бизнес-игра Экипаж", "aliases": ["Бизнес игра для сотрудников"], "cats": [], "hit": false, "kind": null, "place": null, "price": null, "img": "/home-release-20261104-v2/folder-source/assets/search/57b1fb678072f0f0.webp", "desc": ""}, {"url": "/teambuilding/vse-programmy/gde-logika/", "name": "Где логика", "aliases": ["Тимбилдинг Где логика"], "cats": ["Бизнес-игры"], "hit": false, "kind": "Бизнес-игры", "place": "В помещении", "price": null, "img": "/home-release-20261104-v2/folder-source/assets/search/gde-logika.webp", "desc": "Интеллектуально-юмористическое шоу на корпоратив, с фактами и вопросами о самой компании."}, {"url": "/teambuilding/vse-programmy/soap-box-derby/", "name": "Гонки Чаплина", "aliases": ["Тимбилдинг Гонки Чаплина"], "cats": ["Спортивные"], "hit": false, "kind": "Спортивные", "place": "В помещении", "price": "от 4 700 ₽", "img": "/home-release-20261104-v2/folder-source/assets/search/soap-box.webp", "desc": "Команды строят картонные канонны-тарантасы и устраивают заезды в духе фильмов Чарли Чаплина. Комплектующие из Швейцарии."}, {"url": "/teambuilding/vse-programmy/vodnaya-odisseya/", "name": "Гонки на плотах", "aliases": ["Тимбилдинг Гонки на плотах"], "cats": ["Спортивные"], "hit": false, "kind": "На воде", "place": "На улице", "price": "от 3 600 ₽", "img": "/home-release-20261104-v2/folder-source/assets/search/raft-hover.webp", "desc": "Водный тимбилдинг: участники строят плоты, спускают их на воду и устраивают настоящий заезд. Очень зрелищно."}, {"url": "/teambuilding/vse-programmy/zoombie-kvest/", "name": "Зомби Квест", "aliases": ["Тимбилдинг Зомби Квест"], "cats": ["Необычные"], "hit": false, "kind": "Необычные", "place": "На улице", "price": null, "img": "/home-release-20261104-v2/folder-source/assets/search/97f1614520d62b9f.webp", "desc": "Необычный хоррор-квест: актёры, вертолёты, дымовые завесы и 15 спецэффектов. Только вечером и ночью."}, {"url": "/teambuilding/vse-programmy/intellectualnii-kviz/", "name": "Интеллектуальный квиз", "aliases": ["Интеллектуальный тимбилдинг Квиз"], "cats": ["Бизнес-игры"], "hit": false, "kind": "Бизнес-игры", "place": "В помещении", "price": null, "img": "/home-release-20261104-v2/folder-source/assets/search/e732f8e37d0cf799.webp", "desc": "Командная викторина: сложность подстраивается под участников, разные форматы вопросов и заданий."}, {"url": "/teambuilding/vse-programmy/kannskiye-lvi/", "name": "Камера! Мотор!", "aliases": ["Канские Львы"], "cats": ["Творческие"], "hit": false, "kind": "Творческие", "place": "В помещении", "price": "от 3 500 ₽", "img": "/home-release-20261104-v2/folder-source/assets/search/e4aef938fc83b50f.webp", "desc": "Команды снимают рекламные ролики и мини-фильмы: идея, съёмка, монтаж и показ на большом экране с наградами по номинациям."}, {"url": "/teambuilding/vse-programmy/teambuilding-obshaya-kartina/", "name": "Корпоративная картина", "aliases": ["Тимбилдинг Корпоративная картина"], "cats": ["Творческие"], "hit": false, "kind": "Творческие", "place": "В помещении", "price": "от 3 200 ₽", "img": "/home-release-20261104-v2/folder-source/assets/search/lm-corporate-picture.webp", "desc": "Гигантский шедевр от 3 метров: рисуем вместе и забираем картину в офис."}, {"url": "/teambuilding/vse-programmy/korporativnyj-bodibilding/", "name": "Корпоративный флешмоб", "aliases": ["Тимбилдинг корпоративный флешмоб для сотрудников"], "cats": ["Творческие"], "hit": false, "kind": "Творческие", "place": "В помещении", "price": null, "img": "/home-release-20261104-v2/folder-source/assets/search/986a2cb04bbd19b9.webp", "desc": "Совместный флешмоб-номер сотрудников: репетиция и яркое выступление на сцене."}, {"url": "/teambuilding/vse-programmy/kosmicheskaya-stancina/", "name": "Космическая станция", "aliases": [], "cats": ["Бизнес-игры"], "hit": false, "kind": "Бизнес-игры", "place": "В помещении", "price": null, "img": "/home-release-20261104-v2/folder-source/assets/search/044704e0b4b7a742.webp", "desc": "Команды конструируют и запускают ракеты, космическое инженерное приключение."}, {"url": "/teambuilding/vse-programmy/kofejnyj-sindikat/", "name": "Кофейный синдикат", "aliases": ["Бизнес игра"], "cats": ["Бизнес-игры"], "hit": false, "kind": "Бизнес-игры", "place": "В помещении", "price": null, "img": "/home-release-20261104-v2/folder-source/assets/search/bf56871b1ac013fb.webp", "desc": "Атмосферная бизнес-игра вокруг кофейного дела для сплочения команды."}, {"url": "/teambuilding/vse-programmy/cepnaya-reakciya/", "name": "Машина Голдберга", "aliases": [], "cats": ["Бизнес-игры"], "hit": false, "kind": "Бизнес-игры", "place": "В помещении", "price": "от 3 300 ₽", "img": "/home-release-20261104-v2/folder-source/assets/search/goldberg-machine.webp", "desc": "Строим гигантскую цепную реакцию по принципу домино и запускаем её целиком. Прокачивает командную работу."}, {"url": "/teambuilding/vse-programmy/monster_traki/", "name": "Монстер Траки", "aliases": ["Тимбилдинг Монстер Траки"], "cats": ["Спортивные"], "hit": false, "kind": "Спортивные", "place": "На улице", "price": null, "img": "/home-release-20261104-v2/folder-source/assets/search/7d14958136aac357.webp", "desc": "Заезды на легендарных Монстер Траках с огромными колёсами, драйв и адреналин для команды."}, {"url": "/teambuilding/vse-programmy/muzikalni_leibl/", "name": "Музыкальный Лейбл", "aliases": ["Тимбилдинг Музыкальный Лейбл"], "cats": ["С нейросетями"], "hit": false, "kind": "Нейросети", "place": "В помещении", "price": "от 3 400 ₽", "img": "/home-release-20261104-v2/folder-source/assets/search/music-label.webp", "desc": "Команды записывают треки с помощью нейросетей и представляют их на большой сцене. Выпускаем общий альбом."}, {"url": "/neural-network/", "name": "Нейрогалерея", "aliases": [], "cats": ["С нейросетями"], "hit": false, "kind": "Нейросети", "place": "В помещении", "price": "от 3 400 ₽", "img": "/home-release-20261104-v2/folder-source/assets/search/lm-neurogallery.webp", "desc": "Практический AI-тимбилдинг: команда вместе с нейросетями создаёт цифровое произведение искусства. Работа с Midjourney и ChatGPT."}, {"url": "/teambuilding/vse-programmy/neiro-kalendar/", "name": "Нейрокалендарь", "aliases": ["Нейро календарь 2025"], "cats": ["С нейросетями"], "hit": false, "kind": "Нейросети", "place": "В помещении", "price": null, "img": "/home-release-20261104-v2/folder-source/assets/search/5b248704353547d1.webp", "desc": "Новогодний тематический тимбилдинг с нейросетями: команды создают арт-календарь года."}, {"url": "/teambuilding/vse-programmy/sound-designer/", "name": "Озвучка 2.0", "aliases": [], "cats": ["Творческие"], "hit": false, "kind": "Творческие", "place": "В помещении", "price": "от 3 300 ₽", "img": "/home-release-20261104-v2/folder-source/assets/search/sound-designer.webp", "desc": "Саунд-дизайн в симбиозе с нейросетями: команды профессионально озвучивают ролики предметами-инструментами, награды по номинациям."}, {"url": "/teambuilding/vse-programmy/boom-time/", "name": "Оркестр", "aliases": ["Музыкальный тимбилдинг Оркестр"], "cats": ["Творческие"], "hit": false, "kind": "Творческие", "place": "В помещении", "price": null, "img": "/home-release-20261104-v2/folder-source/assets/search/982b78237f39a65d.webp", "desc": "Команды играют мировые хиты на разноцветных музыкальных трубках и собираются в единый оркестр."}, {"url": "/teambuilding/vse-programmy/parfyumernaya-kompaniya/", "name": "Парфюмерный бренд", "aliases": ["Арт игра Парфюмерный бренд"], "cats": [], "hit": false, "kind": null, "place": null, "price": null, "img": "/home-release-20261104-v2/folder-source/assets/search/f9e59bf1f7311219.webp", "desc": ""}, {"url": "/teambuilding/vse-programmy/timbilding-piramida/", "name": "Пирамида", "aliases": ["Тимбилдинг Пирамида"], "cats": [], "hit": false, "kind": null, "place": null, "price": null, "img": "/home-release-20261104-v2/folder-source/assets/search/6f2b7cc69d3f4879.webp", "desc": ""}, {"url": "/teambuilding/vse-programmy/recordsmeni/", "name": "Рекордсмены", "aliases": ["Тимбилдинг Рекордсмены"], "cats": [], "hit": false, "kind": null, "place": null, "price": null, "img": "/home-release-20261104-v2/folder-source/assets/search/d66547de9af1e232.webp", "desc": ""}, {"url": "/teambuilding/vse-programmy/challenge/", "name": "Спортивный квест", "aliases": [], "cats": ["Спортивные"], "hit": false, "kind": "Спортивные", "place": "На улице", "price": null, "img": "/home-release-20261104-v2/folder-source/assets/search/8d3608abbb753fb4.webp", "desc": "Командные спортивно-интеллектуальные испытания, классика командообразования на свежем воздухе."}, {"url": "/teambuilding/vse-programmy/super-nindzya/", "name": "Супер Ниндзя", "aliases": [], "cats": ["Спортивные"], "hit": false, "kind": "Спортивные", "place": "В помещении", "price": null, "img": "/home-release-20261104-v2/folder-source/assets/search/super-nindzya.webp", "desc": "Полоса препятствий с мягкими покрытиями, уровень сложности подстраивается под любую подготовку команды."}, {"url": "/teambuilding/vse-programmy/marionetka/", "name": "Театр Марионеток", "aliases": ["Картонный Тимбилдинг Марионетки"], "cats": ["Творческие"], "hit": false, "kind": "Творческие", "place": "В помещении", "price": "от 3 200 ₽", "img": "/home-release-20261104-v2/folder-source/assets/search/puppet-theater.webp", "desc": "Команды создают гигантских 5-метровых марионеток и ставят с ними танцевальный номер. Финал, яркий парад-показ."}, {"url": "/teambuilding/vse-programmy/festival-morozhenogo/", "name": "Фестиваль Мороженого", "aliases": ["Тимбилдинг Фестиваль Мороженого"], "cats": ["Необычные"], "hit": false, "kind": "Кулинарные", "place": "На улице", "price": "от 3 500 ₽", "img": "/home-release-20261104-v2/folder-source/assets/search/lm-festival-icecream.webp", "desc": "Команды строят тележки с мороженым, каждая со своим вкусом, и соревнуются в продажах. Формат по мотивам Фестиваля Фудтраков."}, {"url": "/teambuilding/vse-programmy/fort-boyard/", "name": "Форт Боярд", "aliases": [], "cats": ["Необычные", "Спортивные"], "hit": false, "kind": "Необычные", "place": "На улице", "price": "от 3 300 ₽", "img": "/home-release-20261104-v2/folder-source/assets/search/fort-boyard.webp", "desc": "Легендарное приключение по мотивам телешоу: команда проходит испытания и добывает ключи, чтобы получить золото в финале."}, {"url": "/teambuilding/vse-programmy/wool-teambuilding/", "name": "Шерстяной тимбилдинг", "aliases": [], "cats": ["Творческие"], "hit": false, "kind": "Творческие", "place": "В помещении", "price": null, "img": "/home-release-20261104-v2/folder-source/assets/search/7ca39efa23801206.webp", "desc": "Необычный творческий формат из шерсти, яркое рукодельное дополнение к событию."}, {"url": "/programmy/ecoferma/", "name": "Экоферма", "aliases": ["Эко ферма"], "cats": ["Необычные"], "hit": false, "kind": "Эко", "place": "Офис или улица", "price": null, "img": "/home-release-20261104-v2/folder-source/assets/search/ecoferma-hover.webp", "desc": "Команда собирает деревянные фигурки-кашпо и высаживает живые растения. Очень мило и душевно."}], "pages": [{"url": "/#katalog-programm", "name": "Все тимбилдинги: каталог программ", "group": "Тимбилдинги", "sub": "", "price": null}, {"url": "/new-year-teambuildings/", "name": "Новогодние тимбилдинги", "group": "Тимбилдинги", "sub": "Новый год 2027", "price": null}, {"url": "/novogodnij-korporativ/#ng-stancii", "name": "Новогодние станции", "group": "Тимбилдинги", "sub": "Новый год 2027", "price": null}, {"url": "/korporativ/", "name": "Корпоратив под ключ", "group": "Корпоративы", "sub": "", "price": null}, {"url": "/novogodnij-korporativ/", "name": "Новогодний корпоратив", "group": "Корпоративы", "sub": "Новый год 2027", "price": "от 3 200 ₽"}, {"url": "/novogodnij-korporativ/#novyj-god-2027", "name": "Подборка: пакеты, шоу, станции", "group": "Корпоративы", "sub": "Новый год 2027", "price": null}, {"url": "/yubiley-kompanii/", "name": "Юбилей компании", "group": "Корпоративы", "sub": "Повод", "price": "от 3 200 ₽"}, {"url": "/letnij-korporativ/", "name": "Летний корпоратив", "group": "Корпоративы", "sub": "Повод", "price": null}, {"url": "/korporativnye-meropriyatiya/", "name": "Корпоративные мероприятия", "group": "Корпоративы", "sub": "Повод", "price": null}, {"url": "/vyezdnoj-korporativ/", "name": "Выездной за городом", "group": "Корпоративы", "sub": "Где проводим", "price": "от 3 200 ₽"}, {"url": "/korporativ-na-teplohode/", "name": "На теплоходе", "group": "Корпоративы", "sub": "Где проводим", "price": null}, {"url": "/ploshchadki-dlya-korporativa/", "name": "Площадки для корпоратива", "group": "Корпоративы", "sub": "Где проводим", "price": null}, {"url": "/korporativ-na-prirode/", "name": "На природе", "group": "Корпоративы", "sub": "Где проводим", "price": null}, {"url": "/scenarij-korporativa/", "name": "Сценарии вечера", "group": "Корпоративы", "sub": "Полезное", "price": null}, {"url": "/organizatsiya-korporativa/", "name": "Как организовать: этапы и сроки", "group": "Корпоративы", "sub": "Полезное", "price": null}, {"url": "/konkursy-na-korporativ/", "name": "Идеи и конкурсы", "group": "Корпоративы", "sub": "Полезное", "price": null}, {"url": "/organizaciya-meropriyatiy/", "name": "Организация мероприятий", "group": "Корпоративы", "sub": "Полезное", "price": null}, {"url": "/idei-novogodnego-korporativa/", "name": "17 идей с ценами", "group": "Новый год 2027", "sub": "", "price": null}, {"url": "/novogodnij-korporativ/do-50-chelovek/", "name": "Камерный Новый год", "group": "Новый год 2027", "sub": "Новый год под ключ", "note": "до 50 гостей", "price": "от 12 000 ₽ за гостя"}, {"url": "/novogodnij-korporativ/na-50-200-chelovek/", "name": "Новый год компании", "group": "Новый год 2027", "sub": "Новый год под ключ", "note": "50-200 гостей", "price": "от 9 500 ₽ за гостя"}, {"url": "/novogodnij-korporativ/ot-200-chelovek/", "name": "Большой праздник", "group": "Новый год 2027", "sub": "Новый год под ключ", "note": "200-3 000 гостей", "price": "от 10 000 ₽ за гостя"}, {"url": "/novogodnij-korporativ/#ng-photozone", "name": "Фотозоны", "group": "Новый год 2027", "sub": "Станции и шоу", "note": "Фотобудка, нейрохудожник, сани с оленями", "price": null}, {"url": "/shou-programma-na-korporativ/", "name": "Шоу, артисты и ведущие", "group": "Новый год 2027", "sub": "Станции и шоу", "note": "Ведущий, живая музыка, 2-4 номера", "price": null}, {"url": "/about/", "name": "О компании", "group": "О нас", "sub": "", "note": "С 2010 года, 5 000+ проектов", "price": null}, {"url": "/foragencies/", "name": "Ивент-агентствам", "group": "О нас", "sub": "", "note": "Комиссия от 11%, постоплата", "price": null}, {"url": "/cases/", "name": "Кейсы", "group": "О нас", "sub": "", "price": null}, {"url": "/reviews/", "name": "Отзывы", "group": "О нас", "sub": "", "price": null}, {"url": "/teambuilding-video/", "name": "Видео", "group": "О нас", "sub": "", "price": null}, {"url": "/blog/", "name": "Блог", "group": "О нас", "sub": "", "price": null}, {"url": "/timbilding/", "name": "Цены и программы", "group": "Тимбилдинги", "sub": "Категории", "price": null}, {"url": "/teambuilding/vse-programmy/c/sportivnyj-timbilding/", "name": "Спортивные", "group": "Тимбилдинги", "sub": "Категории", "price": null}, {"url": "/teambuilding/vse-programmy/c/tvorcheski-timbilding/", "name": "Творческие", "group": "Тимбилдинги", "sub": "Категории", "price": null}, {"url": "/teambuilding/vse-programmy/c/biznes-igry/", "name": "Бизнес-игры", "group": "Тимбилдинги", "sub": "Категории", "price": null}, {"url": "/teambuilding/vse-programmy/c/konstruirovanie/", "name": "Конструирование", "group": "Тимбилдинги", "sub": "Категории", "price": null}, {"url": "/teambuilding/vse-programmy/c/neobichni-timbilding/", "name": "Необычные", "group": "Тимбилдинги", "sub": "Категории", "price": null}, {"url": "/#stoimost", "name": "Стоимость", "group": "Тимбилдинги", "sub": "Полезное", "price": null}, {"url": "/teambuilding-how-works/", "name": "Как работают тимбилдинги", "group": "Тимбилдинги", "sub": "Полезное", "price": null}], "cats": [{"name": "Спортивные", "url": "/teambuilding/vse-programmy/c/sportivnyj-timbilding/", "count": 8}, {"name": "Творческие", "url": "/teambuilding/vse-programmy/c/tvorcheski-timbilding/", "count": 7}, {"name": "Бизнес-игры", "url": "/teambuilding/vse-programmy/c/biznes-igry/", "count": 6}, {"name": "С нейросетями", "url": "/neural-network/", "count": 4}, {"name": "Необычные", "url": "/teambuilding/vse-programmy/c/neobichni-timbilding/", "count": 7}], "hits": ["/teambuilding/vse-programmy/festival-fudtrakov/", "/teambuilding/vse-programmy/gorodskaya-strojka/", "/teambuilding/vse-programmy/wow-bashnya/", "/startap_business_game/", "/teambuilding/vse-programmy/formula-1/", "/teambuilding/vse-programmy/wow-pizza/"]};
/* Поиск по сайту для меню V1 «Две строки» (06.10.2026).
   Исходник движка: _shared/menu_v1_search.src.js. Сборка: python3 _shared/menu_v1.py собирает /catalyst-home-2026-10-27/menu-search.js
   = данные (menuSearchData: программы и разделы из меню, каталога главной и catalog-data.js) + этот код.
   Без внешних сервисов: всё ищется в браузере. Подгружается при первом касании поля поиска.
   API: MVS.query(q) · MVS.bindDesk(box, root) — выпадашка под полем в шапке · MVS.bindSheet(sheet) — лист на телефоне */
(function () {
  'use strict';
  if (MVS) return;
  var D = menuSearchData, doc = document;
  if (!D) return;
  var PROGS = D.programs, PAGES = D.pages, CATS = D.cats;

  /* ---------- стили выдачи: живут здесь, а не в HTML, пока поиск не нужен ---------- */
  var CSS = [
    '#catMenuV4 .mv-pop,#catMenuV4 .mv-pop *,#mvSS .mvsh-body,#mvSS .mvsh-body *{box-sizing:border-box}',
    '#catMenuV4 .mv-pop{position:absolute;top:0;left:0;background:#ffffff;border-radius:20px;box-shadow:0 18px 50px rgba(10,20,20,.22);padding:24px 26px 22px;z-index:997;',
    ' max-height:calc(100vh - 170px);overflow-y:auto;font-family:Roboto,Arial,sans-serif;color:#141414;pointer-events:auto;text-align:left}',
    '#catMenuV4.cm4-fixed .mv-pop{max-height:calc(100vh - 130px)}',
    '#catMenuV4 .mv-pop[hidden]{display:none}',
    '#catMenuV4 .mv-pop .mv-hd,#mvSS .mv-hd{display:block;font:800 20px/1.15 TTCommonsPro,"TT Commons Pro",Arial,sans-serif;color:#141414;margin:0 0 12px}',
    '#catMenuV4 .mv-pop .mv-hd small,#mvSS .mv-hd small{font:400 16px/1 Roboto,Arial,sans-serif;color:#6b6f76;margin-left:8px}',
    '#catMenuV4 .mv-pop .mv-chips{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 20px}',
    '#catMenuV4 .mv-pop .mv-chip,#mvSS .mv-chip{display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 16px;border:1px solid #f3f2ed;border-radius:20px;background:#ffffff;',
    ' font:500 16px/1 Roboto,Arial,sans-serif;color:#141414!important;text-decoration:none;cursor:pointer;white-space:nowrap}',
    '#catMenuV4 .mv-pop .mv-chip span,#mvSS .mv-chip span{color:#6b6f76;font-weight:400}',
    '#catMenuV4 .mv-pop .mv-chip:hover,#mvSS .mv-chip:active{border-color:#141414;background:#141414;color:#ffffff!important}',
    '#catMenuV4 .mv-pop .mv-chip:hover span,#mvSS .mv-chip:active span{color:#f3f2ed}',
    '#catMenuV4 .mv-pop .mv-cols{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:30px}',
    '#catMenuV4 .mv-pop .mv-cols.one{grid-template-columns:1fr}',
    '#catMenuV4 .mv-pop .mv-row,#mvSS .mv-row{display:flex;align-items:center;gap:14px;padding:8px;border-radius:14px;text-decoration:none;color:#141414!important}',
    '#catMenuV4 .mv-pop .mv-row:hover,#catMenuV4 .mv-pop .mv-row.is-kb,#mvSS .mv-row:active{background:#f3f2ed}',
    '#catMenuV4 .mv-pop .mv-row .th,#mvSS .mv-row .th{width:84px;height:auto;aspect-ratio:4/3;border-radius:10px;object-fit:cover;flex:none;background:#f3f2ed;display:block}',
    '#catMenuV4 .mv-pop .mv-row .tx,#mvSS .mv-row .tx{min-width:0;display:flex;flex-direction:column;gap:5px}',
    '#catMenuV4 .mv-pop .mv-row .nm,#mvSS .mv-row .nm{font:700 18px/1.2 TTCommonsPro,"TT Commons Pro",Arial,sans-serif;color:#141414}',
    '#catMenuV4 .mv-pop .mv-row .mt,#mvSS .mv-row .mt{font:400 15px/1.35 Roboto,Arial,sans-serif;color:#6b6f76}',
    '#catMenuV4 .mv-pop .mv-row .mt b,#mvSS .mv-row .mt b{color:#141414;font-weight:500;white-space:nowrap}',
    '#catMenuV4 .mv-pop .mv-row.pg,#mvSS .mv-row.pg{padding:10px 8px}',
    '#catMenuV4 .mv-pop .mv-row.pg .pi,#mvSS .mv-row.pg .pi{width:40px;height:40px;border-radius:12px;background:#f3f2ed;display:flex;align-items:center;justify-content:center;flex:none;color:#141414}',
    '#catMenuV4 .mv-pop .mv-row.pg .pi svg,#mvSS .mv-row.pg .pi svg{width:20px;height:20px}',
    '#catMenuV4 .mv-pop .mv-hl,#mvSS .mv-hl{background:#f3f2ed;color:inherit;border-radius:3px;padding:0 1px}',
    '#catMenuV4 .mv-pop .mv-foot{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:18px;padding-top:18px;border-top:1px solid #f3f2ed}',
    '#catMenuV4 .mv-pop .mv-foot p,#mvSS .mv-foot p{margin:0;font:400 16px/1.4 Roboto,Arial,sans-serif;color:#6b6f76}',
    '#catMenuV4 .mv-pop .mv-gbtn,#mvSS .mv-gbtn{height:48px;display:inline-flex;align-items:center;justify-content:center;padding:0 24px;border-radius:24px;border:0;',
    ' background:#0aba59;color:#ffffff!important;font:800 17px/1 TTCommonsPro,"TT Commons Pro",Arial,sans-serif;text-decoration:none;cursor:pointer;white-space:nowrap}',
    '#catMenuV4 .mv-pop .mv-gbtn:hover,#mvSS .mv-gbtn:active{background:#141414}',
    '#catMenuV4 .mv-pop .mv-empty,#mvSS .mv-empty{font:400 17px/1.5 Roboto,Arial,sans-serif;color:#6b6f76;margin:0 0 14px}',
    '#catMenuV4 .mv-pop .mv-empty b,#mvSS .mv-empty b{color:#141414}',
    /* телефон: всё не мельче 16 px, чипы лентой, кнопка на всю ширину */
    '#mvSS .mvsh-body .mv-hd{margin:4px 4px 12px}',
    '#mvSS .mv-chips{display:flex;gap:8px;overflow-x:auto;margin:0 -12px 18px;padding:0 12px;scrollbar-width:none}',
    '#mvSS .mv-chips::-webkit-scrollbar{display:none}',
    '#mvSS .mv-chip{flex:none;height:44px}',
    '#mvSS .mv-row .th{width:96px}',
    '#mvSS .mv-row .mt{font-size:16px}',
    '#mvSS .mv-foot{margin-top:20px;padding:18px 4px 0;border-top:1px solid #f3f2ed;display:flex;flex-direction:column;gap:12px;align-items:stretch}',
    '#mvSS .mv-gbtn{height:52px;width:100%}',
    '#mvSS .mvsh-sec{margin:0 0 22px}',
    '#mvSS .mv-empty{font-size:16px}'
  ].join('\n');
  var st = doc.createElement('style'); st.id = 'menu-v1-search-css'; st.textContent = CSS; doc.head.appendChild(st);

  /* ---------- утилиты ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function $$(s, r) { return [].slice.call((r || doc).querySelectorAll(s)); }
  function svg(body) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>'; }
  var I_PAGE = svg('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>');

  /* ---------- движок ---------- */
  function norm(s) { return String(s || '').toLowerCase().replace(/ё/g, 'е').replace(/[«»"'!?.,:;()\[\]\-–—\/&+]/g, ' ').replace(/\s+/g, ' ').trim(); }
  function words(s) { return norm(s).split(' ').filter(Boolean); }
  var SYN = { 'нг': ['новый', 'год'], 'новогодний': ['новый', 'год'], 'новогодние': ['новый', 'год'], 'новогоднее': ['новый', 'год'], 'новогодняя': ['новый', 'год'],
    'ии': ['нейросет'], 'ai': ['нейросет'], 'нейро': ['нейросет'], 'нейронка': ['нейросет'], 'нейронки': ['нейросет'],
    'f1': ['формула'], 'ф1': ['формула'], 'офис': ['помещен'], 'улица': ['улиц'] };
  var STOP = { 'тимбилдинг': 1, 'тимбилдинги': 1, 'тимбилдинга': 1, 'программа': 1, 'программы': 1, 'для': 1, 'на': 1, 'в': 1, 'с': 1, 'и': 1, 'по': 1 };
  var IDX = PROGS.map(function (p) {
    return { t: 'p', o: p, name: words(p.name), alt: words(p.aliases.join(' ') + ' ' + p.cats.join(' ') + ' ' + (p.kind || '') + ' ' + (p.place || '') + (p.hit ? ' хит хиты' : '')), desc: words(p.desc) };
  }).concat(PAGES.map(function (g) { return { t: 'g', o: g, name: words(g.name), alt: words(g.group + ' ' + g.sub + ' ' + (g.note || '')), desc: [] }; }));
  function stem(q) { return q.length >= 5 ? q.slice(0, q.length - 2) : q.length === 4 ? q.slice(0, 3) : q; }
  function lev(a, b) {
    var m = a.length, n = b.length, d = [], i, j; for (i = 0; i <= m; i++) d[i] = [i]; for (j = 0; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  function tokScore(e, q) {
    var st = stem(q), s = 0, i, w;
    for (i = 0; i < e.name.length; i++) { w = e.name[i]; if (w.indexOf(q) === 0) return 30; if (w.indexOf(st) === 0) s = 24; }
    if (s) return s;
    for (i = 0; i < e.alt.length; i++) if (e.alt[i].indexOf(st) === 0) return 16;
    if (q.length >= 4) for (i = 0; i < e.desc.length; i++) if (e.desc[i].indexOf(st) === 0) return 6;
    if (q.length >= 5) { var all = e.name.concat(e.alt); for (i = 0; i < all.length; i++) if (lev(all[i].slice(0, q.length), q) <= 1) return 10; }
    return 0;
  }
  function toks(q) {
    var t = []; words(q).forEach(function (w) { if (SYN[w]) t = t.concat(SYN[w]); else t.push(w); });
    return t.filter(function (w) { return !STOP[w]; });
  }
  function run(q, any) {
    var tk = toks(q), nq = norm(q), out = [];
    if (!tk.length) return out;
    IDX.forEach(function (e) {
      var tot = 0, hit = 0;
      tk.forEach(function (w) { var s = tokScore(e, w); if (s) hit++; tot += s; });
      if (any ? hit > 0 : hit === tk.length) {
        if (norm(e.o.name).indexOf(nq) === 0) tot += 15;
        if (e.t === 'p') tot += 3; if (e.o.hit) tot += 2;
        out.push({ e: e, s: tot });
      }
    });
    return out.sort(function (a, b) { return b.s - a.s; });
  }
  var EN = "qwertyuiop[]asdfghjkl;'zxcvbnm,.`", RU = 'йцукенгшщзхъфывапролджэячсмитьбюё';
  function swapLayout(s) { return s.toLowerCase().split('').map(function (c) { var i = EN.indexOf(c); return i >= 0 ? RU[i] : c; }).join(''); }
  function query(q) {
    var r = run(q), note = '', used = q;
    if (!r.length && /[a-z]/i.test(q)) { var sw = swapLayout(q), r2 = run(sw); if (r2.length) { r = r2; used = sw; note = 'Похоже, раскладка не та: показываем «' + sw + '»'; } }
    if (!r.length && toks(q).length > 1) { r = run(q, true); if (r.length) note = 'Точного совпадения нет, вот близкое'; }
    var progs = [], pages = [];
    r.forEach(function (x) { (x.e.t === 'p' ? progs : pages).push(x.e.o); });
    var cc = {}; progs.forEach(function (p) { p.cats.forEach(function (c) { cc[c] = (cc[c] || 0) + 1; }); });
    var cats = CATS.filter(function (c) { return cc[c.name]; }).map(function (c) { return { name: c.name, url: c.url, count: cc[c.name] }; })
      .sort(function (a, b) { return b.count - a.count; });
    return { q: q, used: used, tk: toks(used), progs: progs, pages: pages, cats: cats, note: note, empty: !toks(q).length };
  }
  function hl(name, tk) {
    var low = name.toLowerCase().replace(/ё/g, 'е'), marks = [];
    (tk || []).forEach(function (w) {
      var st = stem(w), i = -1, from = 0;
      while ((i = low.indexOf(st, from)) >= 0) { if (i === 0 || /[^a-zа-я0-9]/.test(low[i - 1])) break; from = i + 1; }
      if (i >= 0) marks.push([i, i + st.length]);
    });
    marks.sort(function (a, b) { return a[0] - b[0]; });
    var out = '', pos = 0;
    marks.forEach(function (m) { if (m[0] < pos) return; out += esc(name.slice(pos, m[0])) + '<mark class="mv-hl">' + esc(name.slice(m[0], m[1])) + '</mark>'; pos = m[1]; });
    return out + esc(name.slice(pos));
  }

  /* ---------- вывод ---------- */
  function metaP(p) { var a = [p.kind, p.place].filter(Boolean).map(esc); if (p.price) a.push('<b>' + esc(p.price) + '</b>'); return a.join(' · '); }
  function metaG(g) { var a = [g.group, g.note || g.sub].filter(Boolean).map(esc); if (g.price) a.push('<b>' + esc(g.price) + '</b>'); return a.join(' · '); }
  function thumb(p) { return p.img ? '<img class="th" src="' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy" decoding="async" width="84" height="63">' : '<span class="th" aria-hidden="true"></span>'; }
  function rowP(p, tk) {
    return '<a class="mv-row mv-program-card photo-link menu-paper-card search-result-ticket" href="' + esc(p.url) + '"><img src="' + esc(p.img) + '" alt="" loading="lazy" decoding="async"><span class="menu-card-tear" aria-hidden="true"></span><span class="program-name">' + hl(p.name, tk) + '</span><span class="search-ticket-meta">' + metaP(p) + '</span><svg class="link-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-width="1.7"/></svg></a>';
  }
  var hitCardDetails = {"Фестиваль Фудтраков": {"title": "Фестиваль Фудтраков", "image": "/home-release-20261104-v2/assets/menu-official/408b995a0d8d-foodtrucks-hover.webp"}, "Город Мегаполис": {"title": "Мегаполис", "image": "/home-release-20261104-v2/assets/menu-official/a424f89569c1-megapolis.webp"}, "WOW Башня": {"title": "WOW Башня", "image": "/home-release-20261104-v2/assets/menu-official/d28ae89a5b54-wow-bashnya.webp"}, "Формула-1": {"title": "Гонки Формула-1", "image": "/home-release-20261104-v2/assets/menu-official/367df5691b79-501386952ef9eebe.webp"}, "WOW Пицца": {"title": "WOW Пицца", "image": "/home-release-20261104-v2/assets/menu-official/c2c7ecc50a4e-wow-pizza.webp"}, "Стартап с нейросетями": {"title": "Стартап с нейросетями", "image": "/home-release-20261104-v2/assets/menu-official/8b064e041fc5-9e6ac9307bddf3ff.webp"}};
  function hitCard(p) {
    var card = hitCardDetails[p.name] || {title:p.name, image:p.img};
    return '<a class="mv-row mv-program-card photo-link menu-paper-card" href="' + esc(p.url) + '"><img src="' + esc(card.image) + '" alt="" loading="lazy" decoding="async"><span class="menu-card-tear" aria-hidden="true"></span><span class="program-name">' + esc(card.title) + '</span><svg class="link-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-width="1.7"/></svg></a>';
  }
  function rowG(g, tk) { return '<a class="mv-row pg" href="' + esc(g.url) + '"><span class="pi">' + I_PAGE + '</span><span class="tx"><span class="nm">' + hl(g.name, tk) + '</span><span class="mt">' + metaG(g) + '</span></span></a>'; }
  function catChips(cats) { return cats.length ? '<div class="mv-chips">' + cats.map(function (c) { return '<a class="mv-chip" href="' + esc(c.url) + '">' + esc(c.name) + ' <span>' + c.count + '</span></a>'; }).join('') + '</div>' : ''; }
  var POPULAR = ['Фестиваль Фудтраков', 'Новогодний корпоратив', 'Выездной корпоратив', 'Нейросети', 'Мегаполис', 'Квест', 'Бизнес-игры'];
  function qChips() { return '<div class="mv-chips">' + POPULAR.map(function (t) { return '<button type="button" class="mv-chip" data-q="' + esc(t) + '">' + esc(t) + '</button>'; }).join('') + '</div>'; }
  var PICK = 'href="#contact-dialog" data-form="quiz" aria-haspopup="dialog"';
  function foot() { return '<div class="mv-foot"><p>Не нашли нужное? Подберём программу под вашу задачу.</p><a class="mv-gbtn" ' + PICK + '>Подобрать за 10 минут</a></div>'; }
  function hd(t, n) { return '<span class="mv-hd">' + esc(t) + (n != null ? '<small>' + n + '</small>' : '') + '</span>'; }
  var BY_URL = {}; PROGS.forEach(function (p) { BY_URL[p.url] = p; });
  var HITS = (D.hits || []).map(function (u) { return BY_URL[u]; }).filter(Boolean);
  var ALLCATS = CATS.slice();

  function results(kind, q) {
    var R = query(q), h = '';
    if (R.empty) {
      h += hd('Часто ищут') + qChips() + hd('Категории') + catChips(ALLCATS);
      var arrow = function (left) { return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="' + (left ? 'M19 12H5m7-7-7 7 7 7' : 'M5 12h14m-7-7 7 7-7 7') + '" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'; };
      h += '<section class="search-hits-slider" aria-label="Хиты"><div class="search-hits-heading">' + hd('Хиты') + '<div class="search-hits-arrows"><button type="button" data-hit-prev aria-label="Предыдущие программы">' + arrow(true) + '</button><button type="button" data-hit-next aria-label="Следующие программы">' + arrow(false) + '</button></div></div><div class="search-hits-track" tabindex="0" aria-label="Популярные программы">' + HITS.map(function (p) { return hitCard(p); }).join('') + '</div><nav class="search-hits-pagination" aria-label="Выбрать слайд"></nav></section>';
      return h + foot();
    }
    if (!R.progs.length && !R.pages.length) {
      return '<p class="mv-empty">По запросу <b>«' + esc(q) + '»</b> ничего не нашли. Попробуйте одно слово: «квест», «корпоратив», «нейросети».</p>' + qChips() + foot();
    }
    if (R.note) h += '<p class="mv-empty">' + esc(R.note) + '</p>';
    h += catChips(R.cats);
    var P = R.progs, G = R.pages, tk = R.tk;
    if (kind === 'sheet') {
      if (P.length) h += '<div class="mvsh-sec">' + hd('Программы', P.length) + P.slice(0, 12).map(function (p) { return rowP(p, tk); }).join('') + '</div>';
      if (G.length) h += '<div class="mvsh-sec">' + hd('Разделы', G.length) + G.slice(0, 8).map(function (g) { return rowG(g, tk); }).join('') + '</div>';
      return h + foot();
    }
    var l = P.length ? hd('Программы', P.length) + P.slice(0, 6).map(function (p) { return rowP(p, tk); }).join('') : '';
    var r = G.length ? hd('Разделы', G.length) + G.slice(0, 6).map(function (g) { return rowG(g, tk); }).join('') : '';
    h += '<div class="mv-cols' + (l && r ? '' : ' one') + '">' + (l ? '<div>' + l + '</div>' : '') + (r ? '<div>' + r + '</div>' : '') + '</div>';
    return h + foot();
  }

  /* выдача в контейнере: чипы «Часто ищут» подставляют запрос, стрелки и Enter ходят по выдаче */
  function bindResults(pop, input, kind, renderOnly) {
    var cleanupHits = function () {};
    function render() {
      cleanupHits();
      pop.innerHTML = results(kind, input.value);
      var slider = pop.querySelector('.search-hits-slider');
      if (!slider) return;
      var track = slider.querySelector('.search-hits-track'), cards = Array.from(track.children);
      var loop=createLoopCarousel(track,cards,()=>cards.length>1 && cards.reduce((width,card)=>width+card.getBoundingClientRect().width,0)>track.clientWidth+1);
      var pagination = slider.querySelector('.search-hits-pagination'), positions = [], active = 0;
      var reduced = matchMedia('(prefers-reduced-motion: reduce)');
      function move(index) { loop.move(positions[index],reduced.matches ? 'instant' : 'smooth'); }
      function update() {
        active = positions.reduce(function (best, pos, i) { return Math.abs(pos-loop.position())<Math.abs(positions[best]-loop.position()) ? i : best; }, 0);
        Array.from(pagination.children).forEach(function (dot, i) { if (i===active) dot.setAttribute('aria-current','true'); else dot.removeAttribute('aria-current'); });
      }
      function resize() {
        var max = Math.max(0, track.scrollWidth-track.clientWidth);
        positions = cards.map(function (card) { return card.offsetLeft-cards[0].offsetLeft; }).filter(function (pos,i,all) { return !i || pos>all[i-1]+1; });
        pagination.replaceChildren();
        positions.forEach(function (_,i) { var dot=document.createElement('button'); dot.type='button'; dot.setAttribute('aria-label','Слайд '+(i+1)); dot.innerHTML='<span aria-hidden="true"></span>'; dot.onclick=function(){move(i)}; pagination.append(dot); });
        pagination.hidden=positions.length<2;
        slider.querySelector('.search-hits-arrows').hidden=positions.length<2;
        update();
      }
      slider.querySelector('[data-hit-prev]').onclick=function(){move((active-1+positions.length)%positions.length)};
      slider.querySelector('[data-hit-next]').onclick=function(){move((active+1)%positions.length)};
      // Mouse dragging complements native touch scrolling and the navigation buttons.
      var drag=null,suppressClick=false;
      track.addEventListener('pointerdown',function(e){
        if(e.pointerType!=='mouse'||e.button!==0)return;
        suppressClick=false;
        drag={id:e.pointerId,x:e.clientX,left:track.scrollLeft,moved:false};
      });
      track.addEventListener('pointermove',function(e){
        if(!drag||drag.id!==e.pointerId)return;
        var dx=e.clientX-drag.x;
        if(!drag.moved){
          if(Math.abs(dx)<6)return;
          drag.moved=true;suppressClick=true;
          track.setPointerCapture(e.pointerId);
          track.style.scrollSnapType='none';
          track.classList.add('is-dragging');
        }
        e.preventDefault();track.scrollLeft=drag.left-dx;
      });
      function endDrag(e){
        if(!drag||drag.id!==e.pointerId)return;
        var moved=drag.moved;drag=null;
        track.style.scrollSnapType='';track.classList.remove('is-dragging');
        if(track.hasPointerCapture(e.pointerId))track.releasePointerCapture(e.pointerId);
        if(moved){update();move(active);setTimeout(function(){suppressClick=false},0);}
      }
      track.addEventListener('pointerup',endDrag);
      track.addEventListener('pointercancel',endDrag);
      track.addEventListener('dragstart',function(e){e.preventDefault()});
      track.addEventListener('click',function(e){if(suppressClick){e.preventDefault();e.stopImmediatePropagation();}},true);
      track.addEventListener('scroll',update,{passive:true});
      track.addEventListener('keydown',function(e){if(e.target!==track)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move((active+(e.key==='ArrowRight'?1:-1)+positions.length)%positions.length)}});
      var observer=new ResizeObserver(resize); observer.observe(track); resize();
      var frame=0,elapsed=0,last=0,seen=false,held=false;
      var visibility=new IntersectionObserver(function(entries){seen=entries[0].isIntersecting;start()});
      function start(){cancelAnimationFrame(frame);last=0;if(seen&&!document.hidden&&!reduced.matches)frame=requestAnimationFrame(tick)}
      function tick(t){if(!slider.isConnected)return;
        if(!held&&positions.length>1){elapsed+=last?Math.min(100,t-last):0;
          if(elapsed>=5000){elapsed=0;move((active+1)%positions.length)}
          pagination.style.setProperty('--hit-fill',elapsed/5000)}
        last=t;frame=requestAnimationFrame(tick)}
      visibility.observe(track);
      slider.addEventListener('pointerdown',function(){held=true;elapsed=0});
      function release(){held=false}
      window.addEventListener('pointerup',release);window.addEventListener('pointercancel',release);
      track.addEventListener('scroll',function(){elapsed=0},{passive:true});
      document.addEventListener('visibilitychange',start);reduced.addEventListener('change',start);
      cleanupHits=function(){cancelAnimationFrame(frame);visibility.disconnect();document.removeEventListener('visibilitychange',start);reduced.removeEventListener('change',start);window.removeEventListener('pointerup',release);window.removeEventListener('pointercancel',release);observer.disconnect();loop.destroy()};
    }
    if (renderOnly) return render;
    pop.addEventListener('click', function (e) {
      var c = e.target.closest('[data-q]');
      if (c) { e.preventDefault(); input.value = c.getAttribute('data-q'); input.dispatchEvent(new Event('input')); input.focus(); }
    });
    input.addEventListener('keydown', function (e) {
      var items = $$('.mv-row', pop), cur = pop.querySelector('.is-kb'), i = items.indexOf(cur);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault(); if (!items.length) return; if (cur) cur.classList.remove('is-kb');
        i = e.key === 'ArrowDown' ? (i + 1) % items.length : (i <= 0 ? items.length - 1 : i - 1);
        items[i].classList.add('is-kb'); items[i].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') { var t = items[i >= 0 ? i : 0]; if (t) { e.preventDefault(); location.href = t.href; } }
    });
    return render;
  }

  /* ПК: выпадашка под полем в капсуле, в пределах ширины контента */
  function bindDesk(box, root) {
    if (box.__mvs) return box.__mvs;
    var input = box.querySelector('input'), clr = box.querySelector('.mv-s-x'), wrap = box.closest('.mv-wrap') || root;
    var pop = doc.createElement('div'); pop.className = 'mv-pop'; pop.hidden = true; pop.setAttribute('role', 'listbox'); wrap.appendChild(pop);
    var render = bindResults(pop, input, 'list');
    function place() {
      var wr = wrap.getBoundingClientRect(), sr = box.getBoundingClientRect();
      var w = Math.min(Math.max(sr.width, 720), wr.width);
      var left = Math.max(0, Math.min(sr.left - wr.left, wr.width - w));
      pop.style.left = left + 'px'; pop.style.width = w + 'px'; pop.style.top = (sr.bottom - wr.top + 14) + 'px';
    }
    function dim() { root.classList.toggle('mv-dim', !pop.hidden || !!root.querySelector('.mv-catdd.is-open')); }
    function open() { if (pop.hidden) { pop.hidden = false; render(); place(); dim(); root.dispatchEvent(new CustomEvent('mv:search-open')); } }
    function close() { if (!pop.hidden) { pop.hidden = true; dim(); } }
    input.addEventListener('focus', open);
    input.addEventListener('input', function () { if (clr) clr.hidden = !input.value; open(); render(); place(); });
    if (clr) clr.addEventListener('click', function () { input.value = ''; clr.hidden = true; render(); input.focus(); });
    doc.addEventListener('mousedown', function (e) { if (!box.contains(e.target) && !pop.contains(e.target)) close(); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Escape') { close(); input.blur(); } });
    addEventListener('resize', function () { if (!pop.hidden) place(); });
    box.__mvs = { open: open, close: close, input: input, pop: pop };
    return box.__mvs;
  }

  /* телефон: лист поиска на весь экран (каркас листа уже в разметке, здесь только выдача) */
  function bindSheet(ss) {
    if (ss.__mvs) { ss.__mvs.render(); return ss.__mvs; }
    var input = ss.querySelector('input'), body = ss.querySelector('.mvsh-body');
    var render = bindResults(body, input, 'sheet');
    input.addEventListener('input', render);
    ss.__mvs = { render: render };
    render();
    return ss.__mvs;
  }

  MVS = { bindResults: bindResults, query: query, results: results, bindDesk: bindDesk, bindSheet: bindSheet, info: function () { return { programs: PROGS.length, pages: PAGES.length, built: D.built }; } };
})();

const menuData={"programs": [{"title": "Популярные", "desc": "Начните с известных программ и сравните, что делают участники.", "all": "/teambuilding-hit/", "items": [["Фестиваль Фудтраков", "/teambuilding/vse-programmy/festival-fudtrakov/"], ["Мегаполис", "/teambuilding/vse-programmy/gorodskaya-strojka/"], ["WOW Башня", "/teambuilding/vse-programmy/wow-bashnya/"], ["Гонки Формула-1", "/teambuilding/vse-programmy/formula-1/"], ["WOW Пицца", "/teambuilding/vse-programmy/wow-pizza/"], ["Стартап с нейросетями", "/startap_business_game/"]]}, {"title": "Новогодние", "desc": "Командные игры в новогодней версии — отдельно или в составе праздника.", "all": "/new-year-teambuildings/", "items": [["Город Мечты", "/new-year-teambuildings/"], ["Новогодняя Ярмарка", "/new-year-teambuildings/"], ["Конвейер подарков", "/new-year-teambuildings/"], ["Квиз «Итоги года»", "/new-year-teambuildings/"]]}, {"title": "Бизнес-игры", "desc": "Совместные решения, конструирование и игровые задачи для команды.", "all": "/teambuilding/vse-programmy/c/biznes-igry/", "items": [["Мегаполис", "/teambuilding/vse-programmy/gorodskaya-strojka/"], ["Машина Голдберга", "/teambuilding/vse-programmy/cepnaya-reakciya/"], ["Кофейный синдикат", "/teambuilding/vse-programmy/kofejnyj-sindikat/"], ["Космическая станция", "/teambuilding/vse-programmy/kosmicheskaya-stancina/"]]}, {"title": "Творческие", "desc": "Создать фильм, картину, озвучку или выступление вместе.", "all": "/teambuilding/vse-programmy/c/tvorcheski-timbilding/", "items": [["Корпоративная картина", "/teambuilding/vse-programmy/teambuilding-obshaya-kartina/"], ["Озвучка 2.0", "/teambuilding/vse-programmy/sound-designer/"], ["Камера! Мотор!", "/teambuilding/vse-programmy/kannskiye-lvi/"], ["Театр Марионеток", "/teambuilding/vse-programmy/marionetka/"], ["Оркестр", "/teambuilding/vse-programmy/boom-time/"]]}, {"title": "Спортивные", "desc": "Подвижные испытания и командные соревнования.", "all": "/teambuilding/vse-programmy/c/sportivnyj-timbilding/", "items": [["Гонки на плотах", "/teambuilding/vse-programmy/vodnaya-odisseya/"], ["Супер Ниндзя", "/teambuilding/vse-programmy/super-nindzya/"], ["Форт Боярд", "/teambuilding/vse-programmy/fort-boyard/"], ["Гонки Чаплина", "/teambuilding/vse-programmy/soap-box-derby/"], ["Спортивный квест", "/teambuilding/vse-programmy/challenge/"]]}, {"title": "Кулинарные", "desc": "Готовить, придумывать меню и пробовать результат вместе.", "all": "/timbilding/", "items": [["Фестиваль Фудтраков", "/teambuilding/vse-programmy/festival-fudtrakov/"], ["WOW Пицца", "/teambuilding/vse-programmy/wow-pizza/"], ["Сыроварня", "/teambuilding/vse-programmy/hand-made_cheese/"], ["Фестиваль Мороженого", "/teambuilding/vse-programmy/festival-morozhenogo/"]]}, {"title": "С нейросетями", "desc": "Работа с идеями, изображениями и музыкой с помощью ИИ.", "all": "/neural-network/", "items": [["Стартап с нейросетями", "/startap_business_game/"], ["Нейрогалерея", "/neural-network/"], ["Музыкальный Лейбл", "/teambuilding/vse-programmy/muzikalni_leibl/"], ["Нейрокалендарь", "/teambuilding/vse-programmy/neiro-kalendar/"]]}, {"title": "Необычные", "desc": "Форматы для команды, которая хочет попробовать что-то новое.", "all": "/teambuilding/vse-programmy/c/neobichni-timbilding/", "items": [["Фестиваль Мороженого", "/teambuilding/vse-programmy/festival-morozhenogo/"], ["Art&Fun&Sport", "/teambuilding/vse-programmy/art-fun-sport/"], ["Ужин с уликами", "/teambuilding/vse-programmy/uzhin-s-ulikami/"], ["Эко ферма", "/programmy/ecoferma/"]]}], "corporate": [{"title": "Выбрать повод", "desc": "Выберите, какое событие планирует компания.", "all": "/korporativ/", "items": [["Новогодний корпоратив", "/novogodnij-korporativ/"], ["Юбилей компании", "/yubiley-kompanii/"], ["Летний корпоратив", "/letnij-korporativ/"], ["Тематический корпоратив", "/korporativ/"]]}, {"title": "Где проводим", "desc": "Сравните варианты площадок и выездных событий.", "all": "/ploshchadki-dlya-korporativa/", "items": [["Выездной за городом", "/vyezdnoj-korporativ/"], ["На теплоходе", "/korporativ-na-teplohode/"], ["На природе", "/korporativ-na-prirode/"], ["Площадки для корпоратива", "/ploshchadki-dlya-korporativa/"]]}]};
menuData.newyear=[{"title": "Праздник под ключ", "desc": "Нужен весь вечер: площадка, банкет, ведущий и развлекательная программа.", "all": "/novogodnij-korporativ/", "items": [["Камерный Новый год · до 50 гостей", "/novogodnij-korporativ/do-50-chelovek/"], ["Новый год компании · 50–200 гостей", "/novogodnij-korporativ/na-50-200-chelovek/"], ["Большой праздник · 200–3 000 гостей", "/novogodnij-korporativ/ot-200-chelovek/"]]}, {"title": "Командные игры", "desc": "Нужна совместная игра для коллег — отдельно или как часть вашего праздника.", "all": "/new-year-teambuildings/", "items": [["Новогодние тимбилдинги", "/new-year-teambuildings/"]]}, {"title": "Станции, фотозоны и шоу", "desc": "Дополните готовый праздник или закажите отдельные активности. Состав и условия — на странице выбранного направления.", "all": "/novogodnij-korporativ/", "items": [["Новогодние станции", "/novogodnij-korporativ/#ng-stancii"], ["Новогодние фотозоны", "/novogodnij-korporativ/#ng-photozone"], ["Шоу, артисты и ведущие", "/shou-programma-na-korporativ/"]]}];
function fillMenu(menu,index=0,query=''){
 const list=menuData[menu.dataset.kind], selected=list[index], box=menu.querySelector('.mega-results');
 const h=box.querySelector('h4'),p=box.querySelector('p'),out=box.querySelector('.mega-links'),all=box.querySelector('.mega-all-category');out.replaceChildren();
 const q=query.toLocaleLowerCase('ru').trim();let found=[];
 if(q){const seen=new Set();list.forEach(cat=>cat.items.forEach(item=>{if((item[0]+' '+cat.title).toLocaleLowerCase('ru').includes(q)&&!seen.has(item[0])){found.push(item);seen.add(item[0])}}));h.textContent='Результаты поиска';p.textContent=found.length?'Найдено пунктов: '+found.length:'Попробуйте другое название или выберите категорию.';all.hidden=true}
 else{found=selected.items;h.textContent=selected.title;p.textContent=selected.desc;all.href=selected.all;all.textContent=menu.dataset.kind==="newyear"?(index===1?"Все новогодние тимбилдинги →":"Всё для Нового года →"):menu.dataset.kind==="corporate"?"Подробнее об организации →":"Смотреть все программы категории →";all.hidden=false}
 found.forEach(item=>{const a=document.createElement('a');a.href=item[1];a.target='_blank';a.rel='noopener';const t=document.createElement('span');t.textContent=item[0];a.appendChild(document.createTextNode(item[0]));const arrow=document.createElement('span');arrow.setAttribute('aria-hidden','true');arrow.textContent='↗';a.appendChild(arrow);out.appendChild(a)});
}
const menus=Array.from(document.querySelectorAll('.mega-menu'));
menus.forEach(menu=>{menu.addEventListener('toggle',()=>{if(menu.open){menus.forEach(other=>{if(other!==menu)other.open=false})}});menu.querySelectorAll('.mega-category').forEach(b=>b.addEventListener('click',()=>{menu.dataset.selected=b.dataset.index;menu.querySelectorAll('.mega-category').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b))});fillMenu(menu,Number(b.dataset.index))}));menu.querySelector('.mega-search')?.addEventListener('input',e=>fillMenu(menu,Number(menu.dataset.selected||0),e.target.value));menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.open=false}))});
document.addEventListener('click',e=>{if(!e.target.closest('.mega-menu'))menus.forEach(m=>m.open=false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const m=menus.find(x=>x.open);if(m){m.open=false;m.querySelector('summary').focus()}}});

const st=document.querySelector('.search-toggle');st.onclick=()=>{const el=document.getElementById('header-search');el.hidden=!el.hidden;st.setAttribute('aria-expanded',String(!el.hidden));if(!el.hidden)document.getElementById('program-search').focus()};
document.getElementById('program-search').oninput=e=>{const q=e.target.value.toLowerCase().trim(),out=document.getElementById('search-result');out.replaceChildren();if(!q)return;const seen=new Set();menuData.programs.flatMap(x=>x.items).filter(x=>x[0].toLowerCase().includes(q)).forEach(x=>{if(seen.has(x[0]))return;seen.add(x[0]);const a=document.createElement('a');a.href=x[1];a.textContent=x[0]+' ↗';out.append(a)});if(!seen.size)out.textContent='В подборке не найдено. Попробуйте другое название.'};
if(document.getElementById('open-catalog'))document.getElementById('open-catalog').onclick=()=>{const m=document.querySelector('[data-kind="programs"]');m.open=true;m.querySelector('summary').focus();window.scrollTo(0,0)};

const programPhotos={"neiro-kino": "/home-release-20261104-v2/folder-source/assets/neiro-kino.webp", "boom-time": "/home-release-20261104-v2/folder-source/assets/boom-time.webp", "formula-1": "/home-release-20261104-v2/folder-source/assets/formula-1.webp", "wow-bashnya": "/home-release-20261104-v2/folder-source/assets/wow-bashnya.webp", "uzhin-s-ulikami": "/home-release-20261104-v2/folder-source/assets/uzhin-s-ulikami.webp", "fort-boyard": "/home-release-20261104-v2/folder-source/assets/fort-boyard.webp", "kannskiye-lvi": "/home-release-20261104-v2/folder-source/assets/kannskiye-lvi.webp", "cepnaya-reakciya": "/home-release-20261104-v2/folder-source/assets/cepnaya-reakciya.webp", "teambuilding-obshaya-kartina": "/home-release-20261104-v2/folder-source/assets/teambuilding-obshaya-kartina.webp", "gorodskaya-strojka": "/home-release-20261104-v2/folder-source/assets/gorodskaya-strojka.webp", "festival-morozhenogo": "/home-release-20261104-v2/folder-source/assets/festival-morozhenogo.webp", "sound-designer": "/home-release-20261104-v2/folder-source/assets/sound-designer.webp", "muzikalni_leibl": "/home-release-20261104-v2/folder-source/assets/muzikalni_leibl.webp", "kosmicheskaya-stancina": "/home-release-20261104-v2/folder-source/assets/kosmicheskaya-stancina.webp", "soap-box-derby": "/home-release-20261104-v2/folder-source/assets/soap-box-derby.webp", "gde-logika": "/home-release-20261104-v2/folder-source/assets/gde-logika.webp", "kofejnyj-sindikat": "/home-release-20261104-v2/folder-source/assets/kofejnyj-sindikat.webp", "festival-fudtrakov": "/home-release-20261104-v2/folder-source/assets/foodtruck-selected.png", "wow-pizza": "/home-release-20261104-v2/folder-source/assets/wow-pizza.webp", "neiro-kalendar": "/home-release-20261104-v2/folder-source/assets/neiro-kalendar.webp", "hand-made_cheese": "/home-release-20261104-v2/folder-source/assets/hand-made_cheese.webp", "challenge": "/home-release-20261104-v2/folder-source/assets/challenge.webp", "super-nindzya": "/home-release-20261104-v2/folder-source/assets/super-nindzya.webp", "intellectualnii-kviz": "/home-release-20261104-v2/folder-source/assets/intellectualnii-kviz.webp", "marionetka": "/home-release-20261104-v2/folder-source/assets/marionetka.webp", "art-fun-sport": "/home-release-20261104-v2/folder-source/assets/art-fun-sport.webp", "startap_business_game": "/home-release-20261104-v2/folder-source/assets/startap_business_game.webp", "ny-small": "/home-release-20261104-v2/folder-source/assets/ny-small.webp", "ny-medium": "/home-release-20261104-v2/folder-source/assets/ny-medium.webp", "ny-large": "/home-release-20261104-v2/folder-source/assets/ny-large.webp", "megapolis-action": "/home-release-20261104-v2/folder-source/assets/megapolis-action.webp", "tower": "/home-release-20261104-v2/folder-source/assets/tower.webp", "c_megapolis": "/home-release-20261104-v2/folder-source/assets/c_megapolis.webp", "c_yarmarka": "/home-release-20261104-v2/folder-source/assets/c_yarmarka.webp", "c_konveer": "/home-release-20261104-v2/folder-source/assets/c_konveer.webp", "c_kviz": "/home-release-20261104-v2/folder-source/assets/c_kviz.webp"};
const iconSVG=(path,cls='ui-icon')=>`<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
const arrowSVG=iconSVG('<path d="M5 19 19 5M5 5h14v14"/>');
const chevronSVG=iconSVG('<path d="m8 10 4 4 4-4"/>','ui-icon chevron');
const categoryPaths=[
'<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>',
'<path d="M12 2 5 10h4l-6 7h8v5h2v-5h8l-6-7h4z"/>',
'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V3h8v4M3 12q9 5 18 0M12 12v4"/>',
'<path d="m4 20 4-1L20 7l-4-4L4 15zM13 6l4 4M3 22h18"/>',
'<path d="M8 3h8v6a4 4 0 0 1-8 0zM8 5H3v3a5 5 0 0 0 5 5M16 5h5v3a5 5 0 0 1-5 5M12 13v7M7 21h10"/>',
'<path d="M7 13a5 5 0 1 1 1-10 5 5 0 0 1 8 0 5 5 0 1 1 1 10v8H7zM7 16h10"/>',
'<rect x="4" y="6" width="16" height="15" rx="4"/><path d="M12 2v4M8 11v2M16 11v2M8 17h8M1 10v7M23 10v7"/>',
'<path d="m4 20 12-12M13 5l6 6M18 2v3M21 5h2M5 3v4M3 5h4M17 16v6M14 19h6"/>'
];
document.querySelectorAll('#header .mega-menu > summary').forEach(s=>{if(!s.querySelector(':scope > .chevron'))s.insertAdjacentHTML('beforeend',chevronSVG)});
document.querySelectorAll('[data-kind="programs"] .mega-category').forEach((b,i)=>{b.insertAdjacentHTML('afterbegin',`<span class="category-icon">${iconSVG(categoryPaths[i])}</span>`)});
document.querySelectorAll('.mega-category').forEach(b=>{const tail=b.lastElementChild;if(tail&&tail.textContent==='›')tail.outerHTML=iconSVG('<path d="m9 5 7 7-7 7"/>','ui-icon category-chevron')});
function cleanArrows(root=document.querySelector('#header')){root.querySelectorAll('a,button').forEach(a=>{if(a.matches('.mega-category'))return;Array.from(a.childNodes).forEach(n=>{if(n.nodeType===3&&/[↗→]/.test(n.textContent))n.textContent=n.textContent.replace(/[↗→]/g,'').trimEnd()});a.querySelectorAll('b,span').forEach(n=>{if(/^[↗→]$/.test(n.textContent.trim()))n.remove()});if((a.matches('.mega-links a,.mega-all-category,.mega-footer a,.mega-promo>a,.about-layout a,.button'))&&!a.querySelector('.link-arrow'))a.insertAdjacentHTML('beforeend',arrowSVG.replace('ui-icon','ui-icon link-arrow'))})}
programPhotos.ecoferma='/home-release-20261104-v2/folder-source/assets/ecoferma.webp';programPhotos.rafts='/home-release-20261104-v2/folder-source/assets/rafts.webp';
const byName={'Город Мечты':'c_megapolis','Новогодняя Ярмарка':'c_yarmarka','Конвейер подарков':'c_konveer','Квиз «Итоги года»':'c_kviz','Гонки на плотах':'rafts','Нейрогалерея':'neiro-kalendar','Новогодний корпоратив':'ny-medium','Юбилей компании':'ny-large','Летний корпоратив':'megapolis-action','Тематический корпоратив':'ny-large','Камерный Новый год · до 50 гостей':'ny-small','Новый год компании · 50–200 гостей':'ny-medium','Большой праздник · 200–3 000 гостей':'ny-large'};
const menuCardDescriptions={"festival-fudtrakov": "Команды строят фудтраки, у каждого своя кухня мира. На фестивале каждый фудтрак зарабатывает игровую валюту.", "gorodskaya-strojka": "Команды строят город из тысяч деталей и договариваются, как собрать его в единый Мегаполис.", "wow-bashnya": "Команда собирает гигантский 10-метровый арт-объект своими руками.", "formula-1": "Гонки болидов, собранных командами.", "teambuilding-obshaya-kartina": "Рисуем вместе и забираем картину в офис.", "startap_business_game": "Команды создают AI-стартапы и защищают идею для рынка.", "wow-pizza": "Готовим большую пиццу всей командой под руководством шеф-повара."};
const officialMenuPhotos={"Фестиваль Фудтраков": "/home-release-20261104-v2/assets/menu-official/408b995a0d8d-foodtrucks-hover.webp", "Мегаполис": "/home-release-20261104-v2/assets/menu-official/a424f89569c1-megapolis.webp", "WOW Башня": "/home-release-20261104-v2/assets/menu-official/d28ae89a5b54-wow-bashnya.webp", "Гонки Формула-1": "/home-release-20261104-v2/assets/menu-official/367df5691b79-501386952ef9eebe.webp", "WOW Пицца": "/home-release-20261104-v2/assets/menu-official/c2c7ecc50a4e-wow-pizza.webp", "Стартап с нейросетями": "/home-release-20261104-v2/assets/menu-official/8b064e041fc5-9e6ac9307bddf3ff.webp", "Город Мечты": "/home-release-20261104-v2/assets/menu-official/e52d689329c7-c_megapolis.webp", "Новогодняя Ярмарка": "/home-release-20261104-v2/assets/menu-official/03e481a955cd-c_yarmarka.webp", "Конвейер подарков": "/home-release-20261104-v2/assets/menu-official/5b1faf3d79af-c_konveer.webp", "Квиз «Итоги года»": "/home-release-20261104-v2/assets/menu-official/8afbfe0181dd-c_kviz.webp", "Машина Голдберга": "/home-release-20261104-v2/assets/menu-official/2920c423f245-00.webp", "Кофейный синдикат": "/home-release-20261104-v2/assets/menu-official/d9046dbb9161-00.webp", "Космическая станция": "/home-release-20261104-v2/assets/menu-official/c78b15d16da9-00.webp", "Корпоративная картина": "/home-release-20261104-v2/assets/menu-official/74ba0a1c43ec-00.webp", "Озвучка 2.0": "/home-release-20261104-v2/assets/menu-official/10278b806ceb-c65d1babb9a4aaf2.webp", "Камера! Мотор!": "/home-release-20261104-v2/assets/menu-official/107b6e81440e-00.webp", "Театр Марионеток": "/home-release-20261104-v2/assets/menu-official/9768216672f8-00.webp", "Оркестр": "/home-release-20261104-v2/assets/menu-official/765333c19ab1-00.webp", "Гонки на плотах": "/home-release-20261104-v2/assets/menu-official/667ef8944e7e-b110fb84953edb0f.webp", "Супер Ниндзя": "/home-release-20261104-v2/assets/menu-official/f5a6d266bc89-00.webp", "Форт Боярд": "/home-release-20261104-v2/assets/menu-official/f0710edf166e-00.webp", "Гонки Чаплина": "/home-release-20261104-v2/assets/menu-official/e95de7ff47ba-00.webp", "Спортивный квест": "/home-release-20261104-v2/assets/menu-official/cd59b6704e3a-00.webp", "Сыроварня": "/home-release-20261104-v2/assets/menu-official/da2beeef0fca-00.webp", "Фестиваль Мороженого": "/home-release-20261104-v2/assets/menu-official/a00a70771eae-festival-morozhenogo-telezhka.webp", "Музыкальный Лейбл": "/home-release-20261104-v2/assets/menu-official/b6262078435d-00.webp", "Нейрокалендарь": "/home-release-20261104-v2/assets/menu-official/a90d44dccc8b-00.webp", "Art&Fun&Sport": "/home-release-20261104-v2/assets/menu-official/a65aaa5ceeea-00.webp", "Ужин с уликами": "/home-release-20261104-v2/assets/menu-official/114597d0b494-00.webp", "Новогодний корпоратив": "/home-release-20261104-v2/assets/menu-official/197875ad878d-ng-salym-01-w600.webp", "Камерный Новый год · до 50 гостей": "/home-release-20261104-v2/assets/menu-official/f631ffc8204f-ng-salym-07-w600.webp", "Новый год компании · 50–200 гостей": "/home-release-20261104-v2/assets/menu-official/197875ad878d-ng-salym-01-w600.webp", "Большой праздник · 200–3 000 гостей": "/home-release-20261104-v2/assets/menu-official/7e1d768ea342-korporativ-katalist-61-w600.webp", "Новогодние тимбилдинги": "/home-release-20261104-v2/assets/menu-official/74e9ac945460-tv-shou-w600.webp", "Новогодние станции": "/home-release-20261104-v2/assets/menu-official/7aea0f345281-chudo-shar-w600.webp", "Новогодние фотозоны": "/home-release-20261104-v2/assets/menu-official/f531686fdbb0-novogodnyaya-fotobudka-w600.webp", "Шоу, артисты и ведущие": "/home-release-20261104-v2/assets/menu-official/102f214af726-elfy-w600.webp", "Нейрогалерея": "/home-release-20261104-v2/assets/menu-official/13fe5e4b6b40-neural-network-yd-27.webp", "Эко ферма": "/home-release-20261104-v2/assets/menu-official/e963cf690f5d-ecoferma-04.webp", "Юбилей компании": "/home-release-20261104-v2/assets/menu-official/462c30250a04-korporativ-katalist-26.webp", "Летний корпоратив": "/home-release-20261104-v2/assets/menu-official/effa041bdef5-hero-01.webp", "Тематический корпоратив": "/home-release-20261104-v2/assets/menu-official/4cf9790df245-ng-salym-05.webp", "Выездной за городом": "/home-release-20261104-v2/assets/menu-official/69e58fe8ec9e-vyezd-ploty-ozero-01.webp", "На теплоходе": "/home-release-20261104-v2/assets/menu-official/30f3e8bfd24a-ploshchadki-03.webp", "На природе": "/home-release-20261104-v2/assets/menu-official/f6062dd40d9d-festival-fudtrakov-timbilding-45.webp", "Площадки для корпоратива": "/home-release-20261104-v2/assets/menu-official/807e80ab6eea-ploshchadki-01.webp", "Корпоратив целиком": "/home-release-20261104-v2/assets/menu-official/72425acd2e18-korporativ-katalist-16.webp", "Концепция и сценарий": "/home-release-20261104-v2/assets/menu-official/b6dd7284d833-korporativ-scenarij-02.webp", "Подбор площадки": "/home-release-20261104-v2/assets/menu-official/807e80ab6eea-ploshchadki-01.webp", "Командная программа": "/home-release-20261104-v2/assets/menu-official/69fd2837e609-00.webp", "Организация мероприятий": "/home-release-20261104-v2/assets/menu-official/50b521b991e6-organizaciya-meropriyatiy-34.webp"};
function decorateCards(menu){menu.querySelectorAll('.mega-links a').forEach(a=>{let name=(a.querySelector('.program-name')?.textContent||a.textContent).replace(/[↗→]/g,'').trim();const photo=officialMenuPhotos[name];const existing=a.querySelector('img');if(existing){if(photo)existing.src=photo;return;}if(photo){a.classList.add('photo-link');a.innerHTML=`<img src="${photo}" alt="" loading="lazy"><span class="program-name"></span>`;a.querySelector('.program-name').textContent=name;}});cleanArrows(menu);menu.querySelectorAll('.mega-links .link-arrow path').forEach(p=>p.setAttribute('d','m9 5 7 7-7 7'))}
const originalFillMenu=fillMenu;fillMenu=function(...args){originalFillMenu(...args);decorateCards(args[0])};
menus.forEach(m=>{decorateCards(m);m.querySelector('summary').addEventListener('focus',()=>{menus.forEach(other=>{if(other!==m)other.open=false})})});
cleanArrows();

/* Third iteration: simpler menu actions and folder contents. */
document.querySelector('.hero-actions .yellow .link-arrow')?.remove();
menus.forEach(menu=>{
 const footer=menu.querySelector('.mega-footer'),head=menu.querySelector('.mega-head');
 if(footer){const help=footer.lastElementChild;help.classList.add('menu-help');help.querySelector('.link-arrow')?.remove();head.append(help);footer.firstElementChild.classList.add('catalog-all-button');}
 const promo=menu.querySelector('.mega-promo');
 if(promo){promo.insertAdjacentHTML('afterbegin','<div class="folder-front" aria-hidden="true"></div><div class="folder-photos" aria-hidden="true"><img src="/home-release-20261104-v2/folder-source/assets/ny-small.webp" alt=""><img src="/home-release-20261104-v2/folder-source/assets/ny-medium.webp" alt=""></div>');const cta=promo.querySelector(':scope > a');cta.classList.add('promo-button');cta.querySelector('.link-arrow')?.remove();promo.querySelectorAll('p').forEach(p=>{if(/31 октября/.test(p.textContent))p.classList.add('booking-highlight')});promo.insertAdjacentHTML('beforeend','<svg class="promo-doodle" viewBox="0 0 90 60" fill="none" aria-hidden="true"><path d="M75 5C85 35 43 12 22 44M21 24l-5 25 25-5"/></svg>');}
});
function compactCategoryLink(menu){
 const link=menu.querySelector('.mega-all-category'),title=menu.querySelector('.mega-results h4');
 if(!link||!title)return;
 const label=title.textContent.replace(/\s+/g,' ').trim();
 title.textContent=label;
 link.textContent='Смотреть все';
 link.setAttribute('aria-label','Смотреть все: '+label);
 link.removeAttribute('title');
 menu.querySelector('.mega-results').append(link);
}
menus.forEach(compactCategoryLink);
const decoratedFillMenu=fillMenu;fillMenu=function(...args){decoratedFillMenu(...args);compactCategoryLink(args[0])};
const shade=document.createElement('div');shade.className='menu-shade';shade.setAttribute('aria-hidden','true');document.body.append(shade);
const syncShade=()=>document.body.classList.toggle('menu-is-open',menus.some(m=>m.open));menus.forEach(m=>m.addEventListener('toggle',syncShade));shade.onclick=()=>{menus.forEach(m=>m.open=false);syncShade()};
if(document.querySelector('.client-logos')){
const logoBox=document.querySelector('.client-logos');const logoSet=document.createElement('div');logoSet.className='logo-set';while(logoBox.firstChild)logoSet.append(logoBox.firstChild);const logoTrack=document.createElement('div');logoTrack.className='logo-track';logoTrack.append(logoSet);const logoCopy=logoSet.cloneNode(true);logoCopy.setAttribute('aria-hidden','true');logoCopy.querySelectorAll('img').forEach(i=>i.alt='');logoTrack.append(logoCopy);logoBox.append(logoTrack);
// Each repeated set must cover the visible strip, including on wide screens.
function fitClientStrip(){logoBox.style.setProperty('--logo-cycle-width',logoBox.clientWidth+'px')}
new ResizeObserver(fitClientStrip).observe(logoBox);fitClientStrip();

document.querySelector('.clients p').innerHTML='<strong>Более 700 клиентов</strong><span>700+ клиентов: от Сбера и ВТБ до Яндекса.</span>';
}
/* Search uses the current site's data, ranking, aliases and typo handling. */
const searchPanel=document.getElementById('header-search'),searchInput=document.getElementById('program-search'),searchResults=document.getElementById('search-result'),primary=document.querySelector('.primary-line');
const searchField=document.createElement('div');searchField.className='inline-search';searchField.hidden=true;searchField.innerHTML=iconSVG('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>');searchInput.placeholder='Найти программу или раздел';searchInput.setAttribute('aria-label','Найти программу или раздел');searchInput.autocomplete='off';searchField.append(searchInput);primary.insertBefore(searchField,st);searchPanel.querySelector('label').remove();primary.append(searchPanel);searchResults.setAttribute('aria-live','polite');
const renderSearchResults=MVS.bindResults(searchResults,searchInput,'list',true);
function renderSiteSearch(){renderSearchResults();searchResults.querySelectorAll('.mv-gbtn').forEach(a=>{a.removeAttribute('onclick');a.href='#contact-dialog';a.dataset.form='quiz'});}
function setSearch(open,focusBack=false){document.body.classList.toggle('search-is-open',open);searchPanel.hidden=!open;searchField.hidden=!open;st.setAttribute('aria-expanded',String(open));st.setAttribute('aria-label',open?'Закрыть поиск':'Поиск по программам');st.innerHTML=open?iconSVG('<path d="m6 6 12 12M18 6 6 18"/>'):iconSVG('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>');if(open){menus.forEach(m=>m.open=false);renderSiteSearch();fitSearchDropdown();searchInput.focus()}else if(focusBack)st.focus()}
st.onclick=e=>{e.stopPropagation();setSearch(searchPanel.hidden,true)};searchInput.oninput=renderSiteSearch;
searchResults.addEventListener('click',e=>{const chip=e.target.closest('[data-q]');if(chip){e.preventDefault();e.stopPropagation();searchInput.value=chip.dataset.q;renderSiteSearch();fitSearchDropdown();searchInput.focus()}});
searchInput.addEventListener('keydown',e=>{const rows=[...searchResults.querySelectorAll('.mv-row')],current=rows.findIndex(x=>x.classList.contains('is-kb'));if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(!rows.length)return;rows.forEach(x=>x.classList.remove('is-kb'));const n=e.key==='ArrowDown'?(current+1)%rows.length:(current<=0?rows.length-1:current-1);rows[n].classList.add('is-kb');rows[n].scrollIntoView({block:'nearest'})}if(e.key==='Enter'&&rows.length){e.preventDefault();rows[Math.max(0,current)].click()}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!searchPanel.hidden)setSearch(false,true)});document.addEventListener('click',e=>{if(!searchPanel.hidden&&!primary.contains(e.target))setSearch(false)});menus.forEach(m=>m.addEventListener('toggle',()=>{if(m.open&&!searchPanel.hidden)setSearch(false)}));
const compactFillMenu=fillMenu;fillMenu=function(menu,...args){const link=menu.querySelector('.mega-all-category');if(link)menu.querySelector('.mega-results').append(link);compactFillMenu(menu,...args)};
/* Fourth iteration — restrained controls and a dedicated mobile catalogue. */
document.querySelectorAll('.catalog-all-button .link-arrow').forEach(x=>x.innerHTML='<path d="m9 5 7 7-7 7"/>');
const about=document.querySelector('.about-layout');about.querySelectorAll('.link-arrow').forEach(x=>x.remove());about.querySelector(':scope>div').classList.add('about-folder');about.querySelector(':scope>div>a').classList.add('promo-button');about.querySelector(':scope>div').insertAdjacentHTML('afterbegin','<div class="folder-photos" aria-hidden="true"><img src="/home-release-20261104-v2/folder-source/assets/team-cutout.png" alt=""><img src="/home-release-20261104-v2/folder-source/assets/megapolis-action.webp" alt=""></div>');about.querySelector(':scope>div').insertAdjacentHTML('beforeend','<svg class="promo-doodle" viewBox="0 0 90 60" fill="none" aria-hidden="true"><path d="M75 5C85 35 43 12 22 44M21 24l-5 25 25-5"/></svg>');
const mobileTrigger=document.createElement('button');mobileTrigger.className='mobile-trigger';mobileTrigger.type='button';mobileTrigger.setAttribute('aria-label','Открыть меню');mobileTrigger.setAttribute('aria-expanded','false');mobileTrigger.innerHTML=iconSVG('<path d="M4 7h16M4 12h16M4 17h16"/>');primary.append(mobileTrigger);
const mobileSheet=document.createElement('dialog');mobileSheet.className='mobile-sheet';mobileSheet.innerHTML='<div class="mobile-sheet-head"><button class="mobile-back" aria-label="Назад"></button><strong>Меню</strong><button class="mobile-close" aria-label="Закрыть меню"></button></div><div class="mobile-sheet-body"></div>';document.body.append(mobileSheet);const mobileQuoteAction=document.querySelector('.primary-line>.cta').cloneNode(true);mobileQuoteAction.className='mobile-quote-action';mobileQuoteAction.removeAttribute('id');mobileSheet.append(mobileQuoteAction);const mobileBody=mobileSheet.querySelector('.mobile-sheet-body');let mobileLevel='root',mobileKind='programs';
mobileSheet.querySelector('.mobile-close').innerHTML=iconSVG('<path d="m6 6 12 12M18 6 6 18"/>');mobileSheet.querySelector('.mobile-back').innerHTML=iconSVG('<path d="m14 5-7 7 7 7"/>');
const mobileNames={programs:'Тимбилдинг',corporate:'Корпоративы',about:'О компании'};
function mobileRoot(){mobileLevel='root';mobileSheet.querySelector('strong').textContent='Меню';mobileSheet.querySelector('.mobile-back').hidden=true;mobileBody.innerHTML='<button class="mobile-search-entry">Найти программу или раздел '+iconSVG('<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>')+'</button>'+Object.entries(mobileNames).map(([key,label])=>`<button class="mobile-row" data-kind="${key}">${label}${iconSVG('<path d="m9 5 7 7-7 7"/>')}</button>`).join('')+'<a class="mobile-row" href="/cases/">Портфолио</a><div class="mobile-contact"><a href="tel:+79911501001">+7 991 150-10-01</a><p>Москва, МО · выезды по России<br>Ежедневно 8:00–22:00</p><a class="button yellow" href="#contact-dialog" data-form="callback" aria-haspopup="dialog">Заказать звонок</a></div>'}
function mobileCategories(kind){mobileKind=kind;mobileLevel='categories';mobileSheet.querySelector('strong').textContent=mobileNames[kind];mobileSheet.querySelector('.mobile-back').hidden=false;if(kind==='about'){mobileBody.innerHTML='<a class="mobile-row" href="/about/">О нас</a><a class="mobile-row" href="/#contacts">Контакты</a>'+about.querySelector('.about-folder').outerHTML;return}mobileBody.innerHTML=menuData[kind].map((cat,i)=>`<button class="mobile-row" data-category="${i}">${kind==='programs'?'<span class="category-icon">'+iconSVG(categoryPaths[i])+'</span>':''}<span>${cat.title}</span>${iconSVG('<path d="m9 5 7 7-7 7"/>')}</button>`).join('')}
function mobilePrograms(index){mobileLevel='programs';const data=menuData[mobileKind][index];mobileSheet.querySelector('strong').textContent=data.title;mobileBody.innerHTML='<p class="mobile-description"></p><div class="mobile-cards"></div>';mobileBody.querySelector('p').textContent=data.desc;const holder=document.createElement('div');holder.dataset.kind=mobileKind;holder.innerHTML='<div class="mega-links"></div>';data.items.forEach(([name,url])=>{const a=document.createElement('a');a.href=url;a.textContent=name;holder.firstChild.append(a)});decorateCards(holder);mobileBody.querySelector('.mobile-cards').append(holder);const all=document.createElement('a');all.className='mobile-category-title';all.href=data.all;all.setAttribute('aria-label',data.title+' — все программы категории');const title=document.createElement('span');title.textContent=data.title;all.append(title);all.insertAdjacentHTML('beforeend',iconSVG('<path d="M7 17 17 7M7 7h10v10"/>'));mobileSheet.querySelector('.mobile-sheet-head strong').replaceChildren(all)}
function openMobile(){menus.forEach(m=>m.open=false);setSearch(false);mobileRoot();mobileSheet.show();positionMobilePanel();document.body.classList.add('mobile-menu-open');mobileTrigger.setAttribute('aria-expanded','true');mobileTrigger.setAttribute('aria-label','Закрыть меню');mobileTrigger.innerHTML=iconSVG('<path d="m6 6 12 12M18 6 6 18"/>')}
function closeMobile(restoreFocus=true){mobileSheet.close();document.body.classList.remove('mobile-menu-open');mobileTrigger.setAttribute('aria-expanded','false');mobileTrigger.setAttribute('aria-label','Открыть меню');mobileTrigger.innerHTML=iconSVG('<path d="M4 7h16M4 12h16M4 17h16"/>');if(restoreFocus===true)mobileTrigger.focus()}
mobileTrigger.onclick=openMobile;mobileSheet.querySelector('.mobile-close').onclick=closeMobile;mobileSheet.addEventListener('cancel',e=>{e.preventDefault();closeMobile()});mobileSheet.querySelector('.mobile-back').onclick=()=>mobileLevel==='programs'?mobileCategories(mobileKind):mobileRoot();mobileBody.onclick=e=>{const kind=e.target.closest('[data-kind]'),cat=e.target.closest('[data-category]');if(cat)mobilePrograms(Number(cat.dataset.category));else if(kind&&kind.tagName==='BUTTON')mobileCategories(kind.dataset.kind);else if(e.target.closest('.mobile-search-entry')){closeMobile();setSearch(true)}};
const oldCatalogOpen=document.getElementById('open-catalog')?.onclick;if(document.getElementById('open-catalog'))document.getElementById('open-catalog').onclick=()=>{if(innerWidth<=1100){openMobile();mobileCategories('programs')}else oldCatalogOpen()};
/* Refined header and mobile navigation. */
const mobileHeader=document.createElement('div');mobileHeader.className='mobile-preserved-header';mobileHeader.innerHTML='<div class="mobile-meta">Москва, МО · выезды по России<br><a href="tel:+79911501001">+7 991 150-10-01</a><span>Пн–Вс 8:00–22:00</span></div><div class="mobile-preserved-tools"></div>';const toolRow=mobileHeader.querySelector('.mobile-preserved-tools');toolRow.append(document.querySelector('.brand').cloneNode(true));const ms=document.createElement('button');ms.className='search-toggle';ms.setAttribute('aria-label','Поиск по программам');ms.innerHTML=iconSVG('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>');ms.onclick=()=>{closeMobile();setSearch(true)};toolRow.append(ms);document.querySelectorAll('.primary-line>.messenger').forEach(a=>{const copy=a.cloneNode(true);copy.querySelectorAll('[id]').forEach(x=>x.removeAttribute('id'));toolRow.append(copy)});const close=mobileSheet.querySelector('.mobile-close');toolRow.append(close);mobileSheet.prepend(mobileHeader);
function addMobileSeason(){if(mobileBody.querySelector('.mobile-season'))return;const card=document.querySelector('[data-kind="programs"] .mega-promo').cloneNode(true);card.classList.add('mobile-season');mobileBody.append(card)}
const savedMobileRoot=mobileRoot;mobileRoot=function(){savedMobileRoot();addMobileSeason()};const savedMobileCategories=mobileCategories;mobileCategories=function(kind){savedMobileCategories(kind);if(kind!=='about')addMobileSeason()};const savedMobilePrograms=mobilePrograms;mobilePrograms=function(index){savedMobilePrograms(index);addMobileSeason()};
const mobileCatalog=document.createElement('button');mobileCatalog.className='mobile-catalog-entry';mobileCatalog.textContent='Каталог программ';mobileCatalog.onclick=()=>{openMobile();mobileCategories('programs')};primary.append(mobileCatalog);
const aboutMenu=document.querySelector('.about-menu');function alignAbout(){if(innerWidth<=1100)return;const panel=aboutMenu.querySelector('.mega-panel'),trigger=aboutMenu.querySelector('summary'),base=primary.getBoundingClientRect();panel.style.right='auto';panel.style.left=Math.max(0,Math.min(trigger.getBoundingClientRect().left-base.left,base.width-panel.offsetWidth))+'px'}aboutMenu.addEventListener('toggle',()=>{if(aboutMenu.open)alignAbout()});addEventListener('resize',()=>{if(aboutMenu.open)alignAbout()});

// Mobile navigation shares the header and opens beneath it, like search.
mobileCatalog.remove();mobileHeader.remove();
const contacts=document.querySelector('.utility-contacts');
contacts.innerHTML='<span class="geo-inline">Москва, МО<br>Выезды по России</span><a class="contact-block" href="tel:+79911501001"><span>+7 991 150-10-01</span><span>Пн–Вс 8:00–22:00</span></a>';
const mobileDim=document.createElement('div');mobileDim.className='mobile-dim';document.body.append(mobileDim);mobileDim.onclick=closeMobile;
function positionMobilePanel(){mobileSheet.style.top=(primary.getBoundingClientRect().bottom+10)+'px';mobileSheet.style.maxHeight='calc(100dvh - '+(primary.getBoundingClientRect().bottom+24)+'px)'}
mobileTrigger.onclick=()=>mobileSheet.open?closeMobile():openMobile();
const tidyRoot=mobileRoot;mobileRoot=function(){tidyRoot();mobileSheet.dataset.level='root';mobileBody.querySelector('.mobile-search-entry')?.remove()};
const tidyCategories=mobileCategories;mobileCategories=function(kind){tidyCategories(kind);mobileSheet.dataset.level='categories'};
const tidyPrograms=mobilePrograms;mobilePrograms=function(index){tidyPrograms(index);mobileSheet.dataset.level='programs'};
// Reset overlays when switching navigation layouts, including device emulation.
const mobileNavigationViewport=matchMedia('(max-width:1100px)');
function resetNavigationLayout(){
 closeMobile(false);
 mobileSheet.style.removeProperty('top');
 mobileSheet.style.removeProperty('max-height');
 mobileSheet.scrollTop=0;
 mobileRoot();
 menus.forEach(menu=>{menu.open=false});
 syncShade();
 setSearch(false);
}
mobileNavigationViewport.addEventListener('change',resetNavigationLayout);
addEventListener('resize',()=>{
 if(mobileSheet.open){
  if(mobileNavigationViewport.matches)positionMobilePanel();
  else resetNavigationLayout();
 }
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobileSheet.open)closeMobile()});
document.querySelector('.primary-line>.search-toggle').addEventListener('click',()=>{if(mobileSheet.open)closeMobile()});

function arrangeDesktopMeta(){document.querySelector('.geo-inline').innerHTML=innerWidth>760?'Москва, МО · выезды по России':'Москва, МО<br>Выезды по России'}arrangeDesktopMeta();addEventListener('resize',arrangeDesktopMeta);
new ResizeObserver(entries=>document.documentElement.style.setProperty('--header-height',entries[0].target.getBoundingClientRect().height+'px')).observe(document.querySelector('.header-proto'));

// Assistance belongs below the results and seasonal offer, outside the categories column.
for(const kind of ['programs','corporate']){
 const menu=document.querySelector('.mega-menu[data-kind="'+kind+'"]');
 const help=menu.querySelector('.mega-head .menu-help');
 const strip=document.createElement('div');strip.className='menu-assistance';
 const copy=document.createElement('p');copy.textContent=kind==='programs'?'Не нашли нужное? Подберём программу под вашу задачу.':'Не знаете, что выбрать? Поможем организовать мероприятие под вашу задачу.';
 strip.append(copy);
 if(help){help.textContent=kind==='programs'?'Подобрать за 10 минут':'Обсудить мероприятие';strip.append(help)}
 menu.querySelector('.mega-layout').append(strip);
}

// Right-hand menu content has its own grid: assistance cannot size category tracks.
for(const kind of ['programs','newyear','corporate']){
 const menu=document.querySelector('.mega-menu[data-kind="'+kind+'"]'),layout=menu.querySelector('.mega-layout');
 let help=layout.querySelector('.menu-assistance');
 if(!help){help=document.createElement('div');help.className='menu-assistance';help.innerHTML='<p>Не знаете, что выбрать? Подберём праздник для вашей команды.</p>';const link=menu.querySelector('.menu-help');if(link)help.append(link)}
 help.querySelector('a').textContent='Помочь с выбором';
 const content=document.createElement('div');content.className='menu-content';
 content.append(layout.querySelector('.mega-results'),layout.querySelector('.mega-promo'),help);layout.append(content);
}
const companyCards=[
 ['О компании','/about/','/home-release-20261104-v2/folder-source/assets/o-kompanii.webp','С 2010 года, больше 5 000 проектов. 16 побед в ивент-премиях, премия BEMA. Своя школа ведущих и производство реквизита.'],
 ['Агентствам','/foragencies/','/home-release-20261104-v2/folder-source/assets/agentstvam.webp','Агентская комиссия от 11%. Постоплата до 100%. Презентации без контактов и логотипов. Свой реквизит и ведущие из нашей школы.'],
 ['Контакты','/kontakty/',null,'Москва, МО, выезды по России. Ежедневно с 8:00 до 22:00.']
];
function companyMarkup(){return '<div class="company-cards">'+companyCards.map(([title,url,img,copy])=>'<article class="company-card">'+(img?'<a href="'+url+'"><img src="'+img+'" alt="'+title+'"></a>':'')+'<div class="company-heading"><h4 class="company-title">'+title+'</h4><a class="company-more" href="'+url+'">Подробнее'+iconSVG('<path d="m9 5 7 7-7 7"/>')+'</a></div><p>'+copy+'</p>'+(img?'':'<a class="company-phone" href="tel:+79911501001">+7 991 150-10-01</a>')+'</article>').join('')+'</div>'}
about.innerHTML=companyMarkup();about.classList.add('company-layout');
const companyPanel=about.closest('.mega-panel');companyPanel.querySelector('.mega-head').innerHTML='<div><h3>О компании</h3><p></p></div>';
const beforeCompanyCategories=mobileCategories;mobileCategories=function(kind){if(kind!=='about')return beforeCompanyCategories(kind);mobileKind=kind;mobileLevel='categories';mobileSheet.dataset.level='categories';mobileSheet.querySelector('.mobile-sheet-head strong').textContent='О компании';mobileSheet.querySelector('.mobile-back').hidden=false;mobileBody.innerHTML=companyMarkup()};

// One independent assistance row below the three menu columns.
for(const kind of ['programs','newyear','corporate']){
 const menu=document.querySelector('.mega-menu[data-kind="'+kind+'"]'),layout=menu.querySelector('.mega-layout');
 layout.append(layout.querySelector('.menu-assistance'));
 const footer=menu.querySelector('.mega-footer');if(footer)layout.querySelector('.mega-categories').append(footer);
}
function companyTabContent(index){const [title,url,img,copy]=companyCards[index];return '<article class="company-detail"><div class="company-heading"><h4 class="company-title">'+title+'</h4><a class="company-more" href="'+url+'">Подробнее'+iconSVG('<path d="m9 5 7 7-7 7"/>')+'</a></div><p>'+copy+'</p>'+(img?'<a href="'+url+'"><img src="'+img+'" alt="'+title+'"></a>':'<a class="company-phone" href="tel:+79911501001">+7 991 150-10-01</a><div class="company-contact-actions"><a href="https://telegram.me/irek_stn">'+document.querySelector('.mv-ib-tg').innerHTML+'Telegram</a><a href="'+document.querySelector('.mv-ib-max').href+'">'+document.querySelector('.mv-ib-max').innerHTML+'Max</a></div>')+'</article>'}
about.innerHTML='<nav class="company-tabs" aria-label="Разделы компании">'+companyCards.map((c,i)=>'<button type="button" class="mega-category'+(i===0?' selected':'')+'" data-company="'+i+'" aria-pressed="'+(i===0)+'">'+c[0]+iconSVG('<path d="m9 5 7 7-7 7"/>')+'</button>').join('')+'</nav><div class="company-tab-content">'+companyTabContent(0)+'</div>';
about.addEventListener('click',e=>{const btn=e.target.closest('[data-company]');if(!btn)return;about.querySelectorAll('[data-company]').forEach(b=>{b.classList.toggle('selected',b===btn);b.setAttribute('aria-pressed',String(b===btn))});about.querySelector('.company-tab-content').innerHTML=companyTabContent(Number(btn.dataset.company))});
const companyMobileCategories=mobileCategories;mobileCategories=function(kind){if(kind!=='about')return companyMobileCategories(kind);mobileKind=kind;mobileLevel='categories';mobileSheet.dataset.level='categories';mobileSheet.querySelector('.mobile-sheet-head strong').textContent='О компании';mobileSheet.querySelector('.mobile-back').hidden=false;mobileBody.innerHTML=companyCards.map((c,i)=>'<button class="mobile-row" data-company="'+i+'">'+c[0]+iconSVG('<path d="m9 5 7 7-7 7"/>')+'</button>').join('')};
mobileBody.addEventListener('click',e=>{const btn=e.target.closest('[data-company]');if(!btn)return;mobileLevel='programs';mobileSheet.dataset.level='programs';mobileSheet.querySelector('.mobile-sheet-head strong').textContent=companyCards[Number(btn.dataset.company)][0];mobileBody.innerHTML=companyTabContent(Number(btn.dataset.company))});

function fitSearchDropdown(){if(!searchPanel.hidden)searchPanel.style.maxHeight=Math.max(120,innerHeight-Math.max(searchPanel.getBoundingClientRect().top,0)-16)+'px';}
addEventListener('resize',fitSearchDropdown);

function fitDropdowns(){document.querySelectorAll('.mega-menu[open]>.mega-panel').forEach(panel=>{const top=panel.getBoundingClientRect().top;panel.style.maxHeight=Math.max(120,innerHeight-Math.max(top,0)-16)+'px';panel.style.setProperty('--dropdown-height',Math.min(660,Math.max(120,innerHeight-Math.max(top,0)-16))+'px')})}
menus.forEach(menu=>menu.addEventListener('toggle',()=>{if(menu.open)requestAnimationFrame(fitDropdowns)}));addEventListener('resize',fitDropdowns);addEventListener('scroll',fitDropdowns,{passive:true});

// Help fills the space below cards and the seasonal folder, independently of the sidebar.
for(const kind of ['programs','newyear','corporate']){
 const menu=document.querySelector('.mega-menu[data-kind="'+kind+'"]');
 menu.querySelector('.menu-content').append(menu.querySelector('.menu-assistance'));
 const link=menu.querySelector('.catalog-all-button');if(link){link.classList.add('catalog-directory-link');link.querySelector('svg')?.setAttribute('aria-hidden','true')}
}
function alignFullCompany(){const panel=aboutMenu.querySelector('.mega-panel');panel.style.left='0';panel.style.right='0';panel.style.width='auto'}
aboutMenu.addEventListener('toggle',alignFullCompany);addEventListener('resize',alignFullCompany);alignFullCompany();

// Quiet assistance alongside the menu heading, without a separate panel.
for(const kind of ['programs','newyear','corporate']){
 const menu=document.querySelector('.mega-menu[data-kind="'+kind+'"]'),help=menu.querySelector('.menu-assistance');
 if(help){help.classList.add('menu-assistance-inline');menu.querySelector('.mega-head').append(help)}
}
function inlineCardArrows(root=document){root.querySelectorAll('.photo-link').forEach(card=>{const name=card.querySelector('.program-name'),arrow=card.querySelector('.link-arrow');card.classList.add('menu-paper-card');if(!card.querySelector('.menu-card-tear')){const tear=document.createElement('span');tear.className='menu-card-tear';tear.setAttribute('aria-hidden','true');card.append(tear)}if(arrow){if(arrow.parentElement!==card)card.append(arrow);arrow.querySelector('path')?.setAttribute('d','m9 5 7 7-7 7')}})}
inlineCardArrows();const beforeInlineDecorate=decorateCards;decorateCards=function(root){beforeInlineDecorate(root);inlineCardArrows(root)};

// Consistent seasonal action, including cards cloned into the mobile menu.
document.querySelectorAll('.mega-promo>a').forEach(a=>{a.textContent='Посмотреть предложение';a.href='/novogodnij-korporativ/';a.classList.add('promo-button')});
const companyFactLists=[['С 2010 года — больше 5 000 проектов','16 побед в ивент-премиях, премия BEMA','Своя школа ведущих','Собственное производство реквизита'],['Агентская комиссия от 11%','Постоплата до 100%','Презентации без контактов и логотипов','Свой реквизит и ведущие из нашей школы'],['Москва, МО','Выезды по России','Ежедневно с 8:00 до 22:00']];
const beforeCompanyFacts=companyTabContent;companyTabContent=function(index){const holder=document.createElement('div');holder.innerHTML=beforeCompanyFacts(index);const list=document.createElement('ul');list.className='company-facts';companyFactLists[index].forEach(fact=>{const item=document.createElement('li');item.textContent=fact;list.append(item)});holder.querySelector('.company-detail>p').replaceWith(list);return holder.innerHTML};
const activeCompany=about.querySelector('[data-company].selected');about.querySelector('.company-tab-content').innerHTML=companyTabContent(Number(activeCompany?.dataset.company||0));

// Contact panel follows the approved conversation illustration concept.
const originalCompanyContact=companyTabContent;
companyTabContent=function(index){
 if(index!==2)return originalCompanyContact(index);
 return `<article class="company-detail company-contact-banner"><div class="contact-banner-copy"><h4>Давайте обсудим вашу задачу</h4><p>Москва и МО · Выезды по России<br>Ежедневно с 8:00 до 22:00</p><div class="company-contact-actions"><a class="company-phone" href="tel:+79911501001"><svg class="phone-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2c1.1.4 2.3.6 3.6.6a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.6 3.6a1 1 0 0 1-.3 1Z"/></svg>+7 991 150-10-01</a><a href="https://telegram.me/irek_stn">${document.querySelector('.mv-ib-tg').innerHTML}Telegram</a><a href="${document.querySelector('.mv-ib-max').href}">${document.querySelector('.mv-ib-max').innerHTML}Max</a><a class="contact-all" href="/kontakty/">Все контакты</a></div></div><svg class="contact-conversation" viewBox="0 0 300 230" fill="none" aria-hidden="true"><g stroke="#11743e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path fill="#ffdf4a" d="M36 23h118a30 30 0 0 1 30 30v62a30 30 0 0 1-30 30H73l-35 30v-30h-2a30 30 0 0 1-30-30V53a30 30 0 0 1 30-30Z"/><path fill="#e2efdf" d="M161 99h80a26 26 0 0 1 26 26v40a26 26 0 0 1-26 26v24l-30-24h-50a26 26 0 0 1-26-26v-40a26 26 0 0 1 26-26Z"/><path d="m245 58 2-19m17 32 15-15m-2 34 18-2"/></g><g fill="#11743e"><circle cx="62" cy="81" r="8"/><circle cx="94" cy="81" r="8"/><circle cx="126" cy="81" r="8"/><circle cx="174" cy="145" r="6"/><circle cx="200" cy="145" r="6"/><circle cx="226" cy="145" r="6"/></g></svg></article>`;
};

// Only show the menu's scroll shadow once content passes under the heading.
mobileBody.addEventListener('scroll',()=>mobileSheet.classList.toggle('is-scrolled',mobileBody.scrollTop>2),{passive:true});
new MutationObserver(()=>{mobileBody.scrollTop=0;mobileSheet.classList.remove('is-scrolled')}).observe(mobileBody,{childList:true});

(() => {
  const $ = s => document.querySelector(s);
  const escape = s => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const telegram = $('.mv-ib-tg')?.href || 'https://telegram.me/irek_stn';
  const max = $('.mv-ib-max')?.href;
  const privacy = '/politika-confidencialnosti/';
  const endpoint = window.CATALYST_LEAD_ENDPOINT || (['catalystrussia.ru','www.catalystrussia.ru'].includes(location.hostname) ? '/api/lead/' : null);
  const contactIcon = name => {
    const brand = name === 'Telegram' ? 'tg' : name === 'Max' ? 'max' : name === 'Email' ? 'email' : 'phone';
    if(brand==='phone')return '<span class="cf-icon cf-icon--phone" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z"/></svg></span>';
    const source = name === 'Telegram' ? {outerHTML:"<svg class=\"contact-messenger-icon\" fill=\"currentColor\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M21.9 4.6 18.6 19.2c-.2 1-.9 1.2-1.8.8l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.2-8.3c.4-.4-.1-.6-.6-.2l-11.4 7.2-4.9-1.5c-1.1-.3-1.1-1.1.2-1.6L20.4 3c.9-.3 1.7.2 1.5 1.6z\"/></svg>"} : name === 'Max' ? {outerHTML:"<svg class=\"contact-messenger-icon\" fill=\"#5146ff\" viewBox=\"0 0 120 120\" aria-hidden=\"true\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M60.6823 104.739C51.7136 104.739 47.5431 103.428 40.2984 98.1916C35.7143 104.086 21.1999 108.69 20.5671 100.813C20.5671 94.8981 19.2567 89.9005 17.7768 84.4445C16.008 77.723 14 70.239 14 59.3918C14 33.4871 35.2559 14 60.4382 14C85.6503 14 105.397 34.4487 105.397 59.636C105.481 84.4296 85.4759 104.609 60.6823 104.739ZM61.051 36.392C48.7838 35.7592 39.2271 44.2496 37.1095 57.5632C35.3656 68.5848 38.4648 82.008 41.1055 82.7056C42.3711 83.0095 45.56 80.4335 47.5431 78.4504C50.8268 80.7194 54.6509 82.0823 58.6295 82.4017C71.3352 83.0145 82.1974 73.3382 83.0494 60.6425C83.5477 47.9218 73.7618 37.1444 61.051 36.4169V36.392Z\"/></svg>"} : null;
    const paths = name === 'Email' ? '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>' : '<path d="m8 3 3 5-3 3c1.5 2.5 3.5 4.5 6 6l3-3 4 3c0 3-2 4-4 4C10 20 4 14 3 7c0-2 2-4 5-4Z"/>';
    return `<span class="cf-icon cf-icon--${brand}" aria-hidden="true">${source ? source.outerHTML : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`}</span>`;
  };
  const messengerLinks = () => `<div class="cf-messengers"><a data-messenger="Telegram" href="${telegram}" target="_blank" rel="noopener">${contactIcon('Telegram')}Telegram</a>${max ? `<a data-messenger="Max" href="${max}" target="_blank" rel="noopener">${contactIcon('Max')}Max</a>` : ''}</div>`;
  const modal = document.createElement('dialog');
  modal.id = 'contact-dialog'; modal.setAttribute('aria-labelledby', 'cf-title');
  modal.innerHTML = '<button type="button" class="cf-close" aria-label="Закрыть форму"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button><div class="cf-content"></div>';
  document.body.append(modal);
  const content = modal.querySelector('.cf-content');
  // Keep phone formatting independent of the current form or selected channel.
  function formatPhone(value) {
    let digits = value.replace(/\D/g, '');
    if (/^\s*\+7/.test(value) || (digits.length > 10 && /^[78]/.test(digits))) digits = digits.slice(1);
    digits = digits.slice(0, 10);
    if (!digits) return '+7 (';
    let result = '+7 (' + digits.slice(0, 3);
    if (digits.length >= 3) result += ') ';
    if (digits.length > 3) result += digits.slice(3, 6);
    if (digits.length > 6) result += '-' + digits.slice(6, 8);
    if (digits.length > 8) result += '-' + digits.slice(8, 10);
    return result;
  }
  content.addEventListener('focusin', e => {
    const input = e.target;
    if (input.matches('input[type="tel"]') && !input.value.trim()) {
      input.value = '+7 (';
      input.setSelectionRange(input.value.length, input.value.length);
    }
  });
  content.addEventListener('paste', e => {
    const input = e.target;
    if (!input.matches('input[type="tel"]')) return;
    const pasted = e.clipboardData?.getData('text') || '';
    if (!/^[78]\d{10}$/.test(pasted.replace(/\D/g, ''))) return;
    e.preventDefault();
    input.value = formatPhone(pasted);
    input.setSelectionRange(input.value.length, input.value.length);
    input.dispatchEvent(new Event('input', {bubbles:true}));
  });
  content.addEventListener('focusout', e => {
    const input = e.target;
    if (input.matches('input[type="tel"]') && input.value === '+7 (') input.value = '';
  });
  content.addEventListener('keydown', e => {
    const input = e.target;
    if (!input.matches('input[type="tel"]') || !['Backspace','Delete'].includes(e.key)) return;
    const start = input.selectionStart, end = input.selectionEnd;
    if (start !== end) return;
    if ((e.key === 'Backspace' && start <= 4) || (e.key === 'Delete' && start < 4)) {
      e.preventDefault(); input.setSelectionRange(4, 4); return;
    }
    // Delete the adjacent digit, even when the caret is beside a mask separator.
    if (e.key === 'Backspace' && start > 0 && /\D/.test(input.value[start-1])) {
      let from = start-1;
      while (from > 0 && /\D/.test(input.value[from])) from--;
      input.setSelectionRange(from, end);
    } else if (e.key === 'Delete' && /\D/.test(input.value[start] || '')) {
      let to = start;
      while (to < input.value.length && /\D/.test(input.value[to])) to++;
      input.setSelectionRange(start, to+1);
    }
  });
  content.addEventListener('input', e => {
    const input = e.target;
    if (!input.matches('input[type="tel"]')) return;
    const raw = input.value, position = input.selectionStart;
    const digitsBefore = raw.slice(0, position).replace(/\D/g, '').length;
    const hadPrefix = /^[78]/.test(raw.replace(/\D/g, ''));
    const formatted = formatPhone(raw);
    input.value = formatted;
    let caret = formatted.length;
    if (position < raw.length && formatted) {
      const target = digitsBefore + (hadPrefix ? 0 : 1);
      let seen = 0;
      for (let i=0;i<formatted.length;i++) {
        if (/\d/.test(formatted[i])) seen++;
        if (seen >= target) { caret=i+1; break; }
      }
    }
    input.setSelectionRange(caret, caret);
  });
  document.addEventListener('keydown', e => { if(e.key==='Tab'){modal.classList.add('cf-keyboard-focus');document.body.classList.add('using-keyboard');} });
  document.addEventListener('pointerdown',()=>document.body.classList.remove('using-keyboard'),true);
  modal.addEventListener('pointerdown', () => modal.classList.remove('cf-keyboard-focus'));
  let opener, mode = 'proposal', context = '', step = 0;
  const drafts = {};
  const mobileOffers = matchMedia('(max-width:1100px)');
  function syncOfferStep(focus = false) {
    if(mode !== 'offers') return;
    const choosing = mobileOffers.matches && modal.dataset.offerStep !== 'contact';
    modal.setAttribute('aria-labelledby', choosing ? 'cf-offer-title' : 'cf-title');
    if(focus){
      const target = choosing ? content.querySelector(`[data-offer="${draft().offerIndex||0}"]`) : content.querySelector('#cf-title');
      target?.focus({preventScroll:true});
      (matchMedia('(max-width:700px)').matches ? modal : (modal.querySelector('.popup-form-surface') || modal)).scrollTop = 0;
    }
  }
  mobileOffers.addEventListener('change',()=>{if(modal.open)syncOfferStep();});

  const offers = [
    {label:'−10% за раннее бронирование',art:'foodtruck',tab:'Раннее бронирование',title:'Команда собирается — цена приятнее',benefit:'−10%',copy:'При бронировании за 30 дней до мероприятия для команды от 30 человек.',detail:'Пример предложения: скидка на программу, без аренды площадки и дополнительных услуг.'},
    {label:'Фото в подарок',art:'pizza',tab:'Фото в подарок',title:'Общие моменты останутся с вами',benefit:'Фотоотчёт',copy:'Два часа работы фотографа в подарок к командной программе от 50 участников.',detail:'Пример предложения: готовые фотографии после мероприятия для вашей команды.'},
    {label:'−35% на вторую программу',art:'tower',tab:'Две программы',title:'Больше впечатлений за один день',benefit:'−35%',copy:'На вторую программу, если проводите обе на одном мероприятии.',detail:'Пример предложения: объедините активный тимбилдинг и творческий мастер-класс.'}
  ];
  // Use the same offer content and selection IDs in menus and the dialog.
  function mountMenuOffers(){
    document.querySelectorAll('.monthly-offers,.mobile-nav-offers').forEach(trigger=>{
      if(trigger.nextElementSibling?.classList.contains('menu-offer-slider'))return;
      const slider=document.createElement('section');
      slider.className='menu-offer-slider';slider.setAttribute('aria-label','Акции');
      slider.innerHTML=`<div class="menu-offer-track">${offers.map((o,i)=>`<button type="button" class="menu-offer-card" data-form="offers" data-offer-index="${i}" aria-haspopup="dialog"><img src="/home-release-20261104-v2/assets/figma-hero-slides/${o.art}.png" alt=""><strong>${o.label}</strong><span class="menu-offer-description">${o.copy}</span></button>`).join('')}</div><nav class="menu-offer-pagination" aria-label="Выбрать акцию">${offers.map((o,i)=>`<button type="button" aria-label="Акция ${i+1}: ${o.label}"><span aria-hidden="true"></span></button>`).join('')}</nav>`;
      trigger.after(slider);
      const track=slider.querySelector('.menu-offer-track'),cards=[...track.children];
      const loop=createLoopCarousel(track,cards);
      const offerStep=()=>cards[1].offsetLeft-cards[0].offsetLeft;
      const pagination=slider.querySelector('.menu-offer-pagination'),dots=[...pagination.children];
      const reduced=matchMedia('(prefers-reduced-motion: reduce)');
      let current=0,elapsed=0,touch=false,scrolling=false,settle;
      function update(){
        const active=track.clientWidth?Math.min(cards.length-1,Math.max(0,Math.round(loop.position()/offerStep())%cards.length)):0;
        if(active!==current){current=active;elapsed=0;}
        dots.forEach((dot,i)=>{if(i===current)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current');});
        pagination.style.setProperty('--slide-progress',String(elapsed/5500));
      }
      function move(index){elapsed=0;loop.move(index*offerStep(),reduced.matches?'instant':'smooth');update();}
      dots.forEach((dot,i)=>dot.onclick=()=>move(i));
      track.addEventListener('scroll',()=>{scrolling=true;elapsed=0;update();clearTimeout(settle);settle=setTimeout(()=>{scrolling=false},180);},{passive:true});
      let drag=null,suppressClick=false;
      track.addEventListener('pointerdown',event=>{
        if(!event.isPrimary||event.button!==0)return;
        suppressClick=false;touch=true;
        drag={id:event.pointerId,x:event.clientX,y:event.clientY,left:track.scrollLeft,index:current,horizontal:false};
      });
      track.addEventListener('pointermove',event=>{
        if(!drag||drag.id!==event.pointerId)return;
        const dx=event.clientX-drag.x,dy=event.clientY-drag.y;
        if(!drag.horizontal){
          if(Math.max(Math.abs(dx),Math.abs(dy))<8)return;
          if(Math.abs(dy)>Math.abs(dx)){drag=null;return;}
          drag.horizontal=true;suppressClick=true;
          track.setPointerCapture(event.pointerId);
          track.style.scrollSnapType='none';
        }
        track.scrollLeft=drag.left-dx;
      });
      function endDrag(event){
        if(!drag||drag.id!==event.pointerId)return;
        const moved=drag.horizontal,dx=event.clientX-drag.x,start=drag.index;
        drag=null;touch=false;elapsed=0;track.style.scrollSnapType='';
        if(track.hasPointerCapture(event.pointerId))track.releasePointerCapture(event.pointerId);
        if(moved){
          const index=start+(Math.abs(dx)>35?(dx<0?1:-1):0);
          move((index+cards.length)%cards.length);
          setTimeout(()=>{suppressClick=false},0);
        }
      }
      track.addEventListener('pointerup',endDrag);
      track.addEventListener('pointercancel',endDrag);
      track.addEventListener('click',event=>{if(suppressClick){event.preventDefault();event.stopImmediatePropagation();}},true);
      track.addEventListener('dragstart',event=>event.preventDefault());
      slider.addEventListener('pointerdown',()=>{touch=true});
      slider.addEventListener('pointerup',()=>{touch=false;elapsed=0});
      slider.addEventListener('pointercancel',()=>{touch=false});
      slider.addEventListener('pointerleave',()=>{touch=false});
      const timer=setInterval(()=>{
        if(!slider.isConnected){clearInterval(timer);return;}
        const rect=track.getBoundingClientRect();
        const visible=rect.width>0&&rect.top<innerHeight&&rect.bottom>0&&getComputedStyle(track).visibility!=='hidden';
        if(!visible||document.hidden||reduced.matches||touch||scrolling||slider.matches(':hover')||slider.querySelector(':focus-visible')||document.querySelector('dialog[open]:not(.mobile-sheet)'))return;
        elapsed+=100;pagination.style.setProperty('--slide-progress',String(Math.min(elapsed/5500,1)));
        if(elapsed>=5500)move((current+1)%cards.length);
      },100);
      update();
    });
  }
  mountMenuOffers();
  new MutationObserver(mountMenuOffers).observe(document.body,{childList:true,subtree:true});
  // Questions and order from catalystrussia.ru's cost calculator.
  const questions = [
    ['Сколько человек будет на мероприятии?', ['30–50', '50–100', '100–300', 'Больше 300']],
    ['Что планируете?', ['Тимбилдинг', 'Новогодний корпоратив', 'Корпоратив или выезд', 'Пока не решили']],
    ['Когда мероприятие?', ['В ближайший месяц', 'Через 1–3 месяца', 'Позже', 'Дата пока не известна']],
    ['Какой бюджет на мероприятие?', ['250–500 тыс. ₽', '500 тыс. – 1 млн ₽', 'Больше 1 млн ₽', 'Пока не знаем']]
  ];
  const answerLabels = ['Участников', 'Формат', 'Когда', 'Бюджет'];
  const draft = () => drafts[mode] ||= {answers: [], channel: 'Телефон'};
  function remember() { content.querySelectorAll('[name]').forEach(el => { if (el.type !== 'checkbox' && (el.type !== 'radio' || el.checked)) draft()[el.name] = el.value; }); }
  function buildMessage() {
    remember();
    const d = draft();
    return [mode === 'callback' ? (d.channel === 'Телефон' ? 'Здравствуйте! Перезвоните мне, пожалуйста.' : 'Здравствуйте! Свяжитесь со мной, пожалуйста.') : mode === 'catalog' ? 'Здравствуйте! Хочу получить каталог программ.' : mode === 'offers' ? 'Здравствуйте! Хочу обсудить предложение для команды.' : 'Здравствуйте! Помогите подобрать программу и рассчитать стоимость.',
      (context || d.answers[1]) && 'Формат: ' + (context || d.answers[1]),
      (d.people || d.answers[0]) && 'Участников: ' + (d.people || d.answers[0]),
      d.answers[2] && 'Когда: ' + d.answers[2],
      d.answers[3] && 'Бюджет: ' + d.answers[3],
      d.name?.trim() && 'Меня зовут ' + d.name.trim() + '.',
      d.comment?.trim() && 'Пожелания: ' + d.comment.trim(),
      d.contact?.trim() && d.channel + ': ' + d.contact.trim()
    ].filter(Boolean).join('\n');
  }
  function telegramDraft(message) {
    const url = new URL(telegram);
    url.hostname = 't.me';
    url.searchParams.set('text', message);
    return url.href;
  }
  content.addEventListener('click', e => {
    const link = e.target.closest('[data-messenger]');
    if (!link) return;
    if (link.dataset.messenger === 'Telegram') {
      link.href = telegramDraft(buildMessage());
      return;
    }
    e.preventDefault();
    showMax(buildMessage());
  });
  async function showMax(message) {
    modal.classList.remove('cf-offers');
    content.innerHTML = `<h2 id="cf-title">Продолжим в Max</h2><p class="cf-intro" role="status">Копируем ваши ответы…</p><a class="cf-primary" href="${max}" target="_blank" rel="noopener">Открыть Max</a><button type="button" class="cf-text" id="cf-edit">Назад</button>`;
    content.querySelector('#cf-edit').onclick=render;
    const status=content.querySelector('.cf-intro');
    try {
      await navigator.clipboard.writeText(message);
      status.textContent='Ваши ответы скопированы. Вставьте их в чат и отправьте сообщение.';
    } catch {
      status.textContent='Скопируйте текст и вставьте его в чат.';
      status.insertAdjacentHTML('afterend',`<label class="cf-field">Ваше сообщение<textarea rows="5">${escape(message)}</textarea></label>`);
      const area=content.querySelector('textarea');area.focus();area.select();
    }
  }
  function close() { modal.close(); }
  modal.querySelector('.cf-close').onclick = close;
  modal.addEventListener('click', e => { if (e.target === modal) { const r = modal.getBoundingClientRect(); if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close(); } });
  modal.addEventListener('close', () => { document.body.classList.remove('cf-modal-open'); remember(); opener?.focus({preventScroll:true}); });
  function open(kind, trigger, selected = '', catalogInvite = false) {
    mode = kind; opener = trigger; context = kind === 'quiz' ? '' : selected; step = 0;
    if(kind==='offers' && trigger?.hasAttribute('data-offer-index')){
      const index=Number(trigger.dataset.offerIndex);
      if(Number.isInteger(index)&&index>=0&&index<offers.length){draft().offerIndex=index;draft().offerChosen=true;}
    }
    modal.dataset.offerStep = kind==='offers' && trigger?.hasAttribute('data-offer-index') ? 'contact' : 'select';
    modal.setAttribute('aria-labelledby','cf-title');
    modal.classList.remove('cf-catalog-banner','cf-success');
    modal.classList.toggle('cf-cost-quiz', kind === 'quiz');
    modal.classList.toggle('cf-callback', kind === 'callback');
    modal.classList.toggle('cf-offers', kind === 'offers');
    document.querySelectorAll('.mega-menu[open]').forEach(el => el.open = false);
    if(typeof closeMobile === 'function') closeMobile(false);
    if(typeof setSearch === 'function') setSearch(false);
    chat.hidden = true; launcher.setAttribute('aria-expanded','false');
    render();
    if (catalogInvite) {
      modal.classList.add('cf-catalog-banner');
      addCatalogArtwork();
    }
    modal.showModal(); document.body.classList.add('cf-modal-open');
  }
  function field(name, label, placeholder, type = 'text', extra = '') { return `<label class="cf-field cf-floating-field"><input name="${name}" type="${type}" aria-label="${label}" placeholder=" " value="${escape(draft()[name])}" ${extra}><span class="cf-floating-label">${label}</span></label>`; }
  function quizMarkup(step,d) {
    const firstUnanswered = questions.findIndex((_, i) => !d.answers[i]);
    const availableStep = firstUnanswered < 0 ? questions.length : firstUnanswered;
    const heading = step < questions.length ? questions[step][0] : 'Куда прислать расчёт?';
    const mobileHeading = {0: 'Сколько человек?', 3: 'Какой бюджет?'}[step];
    const headingMarkup = mobileHeading ? `<span class="cf-heading-desktop">${heading}</span><span class="cf-heading-mobile">${mobileHeading}</span>` : heading;
    let html = `<div class="cf-quiz-promise"><h2>Заполните короткий бриф — пришлём КП за 10 минут</h2><p>Ответьте на несколько вопросов о мероприятии — подберём программы и рассчитаем стоимость.</p></div><div class="cf-quiz-body"><div class="cf-quiz-heading"><h2 id="cf-title" tabindex="-1">${headingMarkup}</h2><p class="cf-step">Шаг ${step + 1} из 5</p></div><ol class="cf-progress-steps" aria-label="Шаги расчёта стоимости">${['Участники','Формат','Дата','Бюджет','Контакты'].map((label,i)=>`<li><button type="button" data-step="${i}" ${i>availableStep?'disabled':''} class="${i<=step?'is-filled':''}" ${i===step?'aria-current="step"':''}><span class="cf-progress-segment" aria-hidden="true"></span>${label}</button></li>`).join('')}</ol>`;
    if (step < questions.length) {
      html += `<div class="cf-options">${questions[step][1].map(a=>`<button type="button" aria-pressed="${d.answers[step]===a}" data-answer="${a}">${a}</button>`).join('')}</div>`;
    } else {
      html += `<section class="cf-selection" aria-label="Ваш выбор"><dl>${['Участники','Формат','Когда','Бюджет'].map((label,i)=>`<div><dt>${label}</dt><dd>${d.answers[i] ? `<span class="cf-context-accent">${escape(d.answers[i])}</span>` : 'Пока не выбрано'}</dd></div>`).join('')}</dl></section><form id="cf-quiz-form" class="cf-form" novalidate><fieldset class="cf-channels"><legend>Как с вами связаться?</legend><div class="cf-channel-options">${['Телефон','Telegram','Max'].map(c=>`<label><input type="radio" name="channel" value="${c}" ${d.channel===c?'checked':''}><span>${contactIcon(c)}${c}</span></label>`).join('')}</div></fieldset><div class="cf-quiz-contact-field">${field('contact',d.channel==='Telegram'?'Ваш Telegram — @username':d.channel==='Max'?'Номер телефона в Max':'Номер телефона','',d.channel==='Telegram'?'text':'tel','required maxlength="40" aria-describedby="cf-error"')}<p id="cf-error" class="cf-error" role="alert"></p></div></form>`;
    }
    if (step === questions.length) html += `<div class="cf-divider">Напишите в мессенджер — ответим вам сразу</div>${messengerLinks()}`;
    return html + `</div><div class="cf-quiz-submit-panel"><button class="cf-primary" type="submit" form="cf-quiz-form" ${step < questions.length ? 'disabled' : ''}>Получить расчёт</button></div>`;
  }
  const phoneQuizLayout = matchMedia('(max-width:700px)');
  function placeQuizSubmit() {
    const form = content.querySelector('#cf-quiz-form');
    const panel = content.querySelector(':scope > .cf-quiz-submit-panel');
    if (!form || !panel) return;
    const button = content.querySelector('button[form="cf-quiz-form"]');
    (phoneQuizLayout.matches ? form : panel).append(button);
    panel.hidden = phoneQuizLayout.matches;
  }
  phoneQuizLayout.addEventListener('change', placeQuizSubmit);
  let quizSizeObserver;
  function sizeQuizPanel(panel,d) {
    if(matchMedia('(max-width:700px)').matches){panel.style.removeProperty('height');return;}
    const width=panel.getBoundingClientRect().width;
    if(!width)return;
    // Use the final step as the size reference, including the longest answer labels
    // so selecting a longer answer cannot change the panel height midway through.
    const reference={...d,answers:questions.map(q=>q[1].reduce((a,b)=>a.length>b.length?a:b,''))};
    const template=document.createElement('template');
    template.innerHTML=quizMarkup(questions.length,reference);
    const probe=template.content.querySelector('.cf-quiz-body');
    probe.inert=true;probe.setAttribute('aria-hidden','true');
    Object.assign(probe.style,{position:'fixed',left:'0',top:'0',width:width+'px',height:'auto',minHeight:'0',maxHeight:'none',visibility:'hidden',pointerEvents:'none',overflow:'hidden'});
    content.append(probe);
    const height=Math.ceil(probe.getBoundingClientRect().height);
    probe.remove();
    const introHeight=content.querySelector('.cf-quiz-promise').getBoundingClientRect().height;
    const actionHeight=content.querySelector(':scope > .cf-quiz-submit-panel')?.getBoundingClientRect().height || 0;
    const viewportHeight=window.visualViewport?.height || innerHeight;
    // Every step shares the same external action panel. Reserve its height
    // before constraining the scrollable question and contact content.
    const dialogStyle=getComputedStyle(modal);
    const dialogLimit=parseFloat(dialogStyle.maxHeight)-parseFloat(dialogStyle.paddingTop)-parseFloat(dialogStyle.paddingBottom);
    const surface=modal.querySelector('.popup-form-surface');
    const surfaceLimit=surface?parseFloat(getComputedStyle(surface).maxHeight):NaN;
    const limits=[viewportHeight-72,dialogLimit,surfaceLimit].filter(Number.isFinite);
    const available=Math.max(0,Math.min(...limits)-introHeight);
    panel.style.height=Math.max(0,Math.min(height,available-actionHeight))+'px';
  }
  function resizeOpenQuiz(){
    const panel=content.querySelector('.cf-quiz-body');
    if(modal.open&&mode==='quiz'&&!modal.classList.contains('cf-success')&&panel)sizeQuizPanel(panel,draft());
  }
  window.addEventListener('resize',resizeOpenQuiz);
  window.visualViewport?.addEventListener('resize',resizeOpenQuiz);
  function renderQuiz() {
    quizSizeObserver?.disconnect();
    const d = draft();
    if(!['Телефон','Telegram','Max'].includes(d.channel))d.channel='Телефон';
    content.innerHTML=quizMarkup(step,d);
    modal.scrollTop=0;
    const surface=modal.querySelector('.popup-form-surface');if(surface)surface.scrollTop=0;
    const panel=content.querySelector('.cf-quiz-body');
    sizeQuizPanel(panel,d);
    let lastWidth=panel.getBoundingClientRect().width;
    quizSizeObserver=new ResizeObserver(()=>{
      const width=panel.getBoundingClientRect().width;
      if(width!==lastWidth){lastWidth=width;sizeQuizPanel(panel,d);}
    });
    quizSizeObserver.observe(panel);
    document.fonts.ready.then(()=>{if(panel.isConnected)sizeQuizPanel(panel,d);});
    const move = next => { const missing = questions.findIndex((_, i) => !d.answers[i]); if(next > (missing < 0 ? questions.length : missing)) return; remember(); step = next; renderQuiz(); content.querySelector(step===questions.length&&!matchMedia('(max-width:700px), (pointer:coarse)').matches?'[name="contact"]':'#cf-title').focus({preventScroll:true}); content.querySelector('.cf-quiz-body').scrollTop = 0; };
    content.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>move(Number(b.dataset.step)));
    const telegramLink = content.querySelector('[data-messenger="Telegram"]');
    if (telegramLink) telegramLink.href=telegramDraft(buildMessage());
    content.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{d.answers[step]=b.dataset.answer;move(step+1);});
    const form = content.querySelector('form');
    if (form) {
      form.onsubmit=submit;
      const button=content.querySelector('.cf-quiz-submit-panel button');
      placeQuizSubmit();
      const syncSubmit=()=>{button.disabled=form.dataset.submitting==='true';};
      form.addEventListener('input',()=>queueMicrotask(syncSubmit));
      form.addEventListener('change',syncSubmit);
      form.querySelector('[name="contact"]').oninput=e=>{e.target.removeAttribute('aria-invalid');content.querySelector('#cf-error').textContent='';};
      form.querySelectorAll('[name="channel"]').forEach(r=>r.onchange=()=>{
        remember();d.channel=r.value;d.contact='';
        const scroll=content.querySelector('.cf-quiz-body').scrollTop;
        renderQuiz();content.querySelector('.cf-quiz-body').scrollTop=scroll;
      });
      syncSubmit();
    }
  }
  function render() {
    quizSizeObserver?.disconnect();
    const d = draft();
    modal.classList.toggle('cf-offers',mode==='offers');
    if(mode==='offers'){
      context='Пример акции: '+offers[d.offerIndex||0].tab;
    }
    let html = '';
    if (mode === 'catalog') {
      if(!['Telegram','Max'].includes(d.channel)){d.channel='Telegram';d.contact='';}
      content.innerHTML = `<div class="cf-quiz-promise"><h2 id="cf-title">Пришлём каталог программ</h2><p class="cf-catalog-description">Оставьте контакт, чтобы посмотреть все программы и обсудить их с коллегами.</p></div><div class="cf-quiz-body cf-catalog-body"><form class="cf-form" novalidate><fieldset class="cf-channels"><legend>Куда прислать каталог?</legend><div class="cf-channel-options">${['Telegram','Max'].map(c=>`<label><input type="radio" name="channel" value="${c}" ${d.channel===c?'checked':''}><span>${contactIcon(c)}${c}</span></label>`).join('')}</div></fieldset>${field('contact',d.channel==='Telegram'?'Ваш Telegram — @username':'Номер телефона в Max',d.channel==='Telegram'?'@username':'+7 (999) 123-45-67',d.channel==='Telegram'?'text':'tel','required maxlength="40" aria-describedby="cf-error"')}<p id="cf-error" class="cf-error" role="alert"></p><button class="cf-primary" type="submit">Получить каталог</button></form></div>`;
      content.querySelector('form').onsubmit=submit;
      content.querySelectorAll('[name="channel"]').forEach(r=>r.onchange=()=>{d.channel=r.value;d.contact='';render();addCatalogArtwork();});
      content.querySelector('[name="contact"]').oninput=e=>{e.target.removeAttribute('aria-invalid');content.querySelector('#cf-error').textContent='';};
      return;
    }
    if (mode === 'quiz') { renderQuiz(); return; }
    if (mode === 'callback') html += '<div class="cf-quiz-promise"><h2 id="cf-title" tabindex="-1">Перезвоним вам</h2><p>Оставьте номер телефона или контакт в мессенджере — свяжемся в течение 10 минут.</p></div>';
    else if (mode !== 'quiz') html += `<h2 id="cf-title" tabindex="-1">${mode==='offers'?'Обсудим предложение':context ? 'Обсудим ваше событие' : 'Подберём программу'}</h2>`;
    if(context && mode!=='offers') {
      const card=opener?.closest('.ny-folder');
      const photo=card?.querySelector('.ny-photo img');
      html += photo ? `<div class="cf-program-selection"><img src="${escape(photo.getAttribute('src'))}" alt=""><div><h3><span class="cf-context-accent">${escape(card.querySelector('h3').textContent)}</span></h3><p>${escape(card.querySelector('.ny-tab').textContent)}</p></div></div>` : `<div class="cf-context"><span class="cf-context-accent">${escape(context)}</span></div>`;
    }
    html += `<form class="cf-form" novalidate><fieldset class="cf-channels"><legend>Способ связи</legend><div class="cf-channel-options">${['Телефон','Telegram','Max'].map(c=>`<label><input type="radio" name="channel" value="${c}" ${d.channel===c?'checked':''}><span>${contactIcon(c)}${c}</span></label>`).join('')}</div></fieldset><label class="cf-field cf-floating-field"><input name="contact" required maxlength="150" placeholder=" " aria-labelledby="cf-contact-label" aria-describedby="cf-error" value="${escape(d.contact)}"><span id="cf-contact-label" class="cf-floating-label">${d.channel==='Telegram'?'Ваш Telegram — @username':d.channel==='Max'?'Номер телефона в Max':'Номер телефона'}</span></label><p id="cf-error" class="cf-error" role="alert"></p><button class="cf-primary" type="submit">Отправить заявку </button></form><div class="cf-divider">Или напишите нам напрямую</div>${messengerLinks()}`;
    content.innerHTML = html;
    if(mode==='callback'){
      const body=document.createElement('div');body.className='cf-quiz-body';
      body.append(...Array.from(content.children).slice(1));content.append(body);
    }
    if(mode==='offers') {
      const contact=document.createElement('div');contact.className='cf-offer-contact';
      contact.append(...content.childNodes);content.append(contact);
      content.insertAdjacentHTML('afterbegin',`<section class="cf-offer-showcase" aria-label="Специальные предложения"><div class="cf-offer-heading"><h3 id="cf-offer-title">Выберите свой бонус</h3></div><div id="cf-offer-track" class="cf-offer-cards" role="group" aria-label="Выберите акцию">${offers.map((o,i)=>`<button type="button" class="cf-offer-card cf-offer-card-${i}" data-offer="${i}" aria-pressed="false"><img src="/home-release-20261104-v2/assets/figma-hero-slides/${o.art}.png" alt=""><strong>${o.label}</strong><span class="cf-offer-card-copy">${o.copy}</span><span class="cf-offer-card-select">Выбрать акцию</span></button>`).join('')}</div></section>`);
      contact.querySelector('h2').insertAdjacentHTML('afterend','<p class="cf-offer-selected" aria-live="polite"><span class="cf-context-accent"></span></p>');
      const selectOffer=i=>{
        d.offerIndex=i;const offer=offers[i];context='Пример акции: '+offer.tab+' — '+offer.benefit;
        content.querySelector('.cf-offer-selected .cf-context-accent').textContent=offer.tab+' · '+offer.benefit;
        content.querySelectorAll('[data-offer]').forEach((card,j)=>{card.setAttribute('aria-pressed',String(j===i));card.querySelector('.cf-offer-card-select').textContent=j===i?'Выбрано':'Выбрать акцию';});
        content.querySelectorAll('[data-messenger="Telegram"]').forEach(link=>link.href=telegramDraft(buildMessage()));
      };
      content.querySelectorAll('[data-offer]').forEach(card=>{card.onclick=()=>{d.offerChosen=true;selectOffer(Number(card.dataset.offer));if(mobileOffers.matches){modal.dataset.offerStep='contact';syncOfferStep(true);}};});
      const offerHeading=document.createElement('div');offerHeading.className='cf-offer-contact-heading';
      const back=document.createElement('button');back.type='button';back.className='mobile-back cf-offer-back';back.setAttribute('aria-label','Назад к акциям');
      back.innerHTML=document.querySelector('.mobile-sheet .mobile-back').innerHTML;
      const title=contact.querySelector('h2');title.before(offerHeading);offerHeading.append(back,title);
      contact.querySelector('.cf-offer-back').onclick=()=>{
        modal.dataset.offerStep='select';syncOfferStep(true);
      };
      selectOffer(d.offerIndex||0);
      if(mobileOffers.matches && !d.offerChosen){content.querySelectorAll('[data-offer]').forEach(card=>{card.setAttribute('aria-pressed','false');card.querySelector('.cf-offer-card-select').textContent='Выбрать акцию';});}
      syncOfferStep();

    }
    const input = content.querySelector('[name="contact"]');
    const submitButton = content.querySelector('[type="submit"]');
    const refreshLinks=()=>{
      const href=telegramDraft(buildMessage());
      content.querySelectorAll('[data-messenger="Telegram"]').forEach(link=>link.href=href);
    };
    content.querySelector('form').addEventListener('input',refreshLinks);
    function channel() {
      const c = content.querySelector('[name="channel"]:checked').value; d.channel=c;
      input.type=c==='Telegram'?'text':'tel'; input.inputMode=c==='Telegram'?'text':'tel'; input.autocomplete=c==='Telegram'?'off':'tel';
      input.placeholder=' ';
      content.querySelector('#cf-contact-label').textContent=c==='Telegram'?'Ваш Telegram — @username':c==='Max'?'Номер телефона в Max':'Номер телефона';
      input.removeAttribute('aria-invalid'); content.querySelector('#cf-error').textContent='';
      input.closest('.cf-field').hidden=false;
      input.required=true;
      submitButton.hidden=false;
      submitButton.textContent=mode==='callback' ? (c==='Телефон'?'Перезвонить мне':'Связаться со мной') : 'Отправить заявку';
      content.querySelector('.cf-divider').hidden=false;
      content.querySelector('.cf-messengers').hidden=false;
      refreshLinks();
    }
    channel(); content.querySelectorAll('[name="channel"]').forEach(r=>r.onchange=()=>{input.value='';channel();});
    content.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{remember();step=+b.dataset.edit;render();});
    content.querySelector('form').onsubmit=submit;
    input.oninput=()=>{input.removeAttribute('aria-invalid');content.querySelector('#cf-error').textContent='';};
  }
  function showSuccess(d, catalog = false) {
    quizSizeObserver?.disconnect();
    modal.classList.remove('cf-cost-quiz','cf-catalog-banner','cf-offers');
    modal.classList.add('cf-callback','cf-success');
    modal.removeAttribute('data-offer-step');
    modal.setAttribute('aria-labelledby','cf-title');
    const contact = escape(d.contact);
    const channel = escape(d.channel);
    const message = catalog ? `Пришлём каталог в ${channel}: ${contact}.`
      : d.channel === 'Телефон' ? `Перезвоним вам по номеру ${contact}.`
      : `Свяжемся с вами в ${channel}: ${contact}.`;
    content.innerHTML = `<div class="cf-quiz-promise"><h2 id="cf-title" tabindex="-1">Спасибо, ваш запрос отправлен</h2></div><div class="cf-quiz-body cf-success-body"><div role="status"><p class="cf-intro">${message}</p><p class="cf-intro">Работаем ежедневно с 8:00 до 22:00.</p></div><button type="button" class="cf-primary" id="cf-success-close">Хорошо</button></div>`;
    content.querySelector('#cf-success-close').onclick = close;
    content.querySelector('#cf-title').focus({preventScroll:true});
  }
  async function submit(e) {
    e.preventDefault(); remember(); const d=draft(); d.channel=content.querySelector('[name="channel"]:checked').value;
    if(mode==='quiz'){const missing=questions.findIndex((_,i)=>!d.answers[i]);if(missing>=0){step=missing;renderQuiz();return;}}
    const input=content.querySelector('[name="contact"]'), value=input.value.trim(), digits=value.replace(/\D/g,'');
    const phone=/^7\d{10}$/.test(digits);
    const valid=(d.channel==='Телефон'||d.channel==='Max')?phone:d.channel==='Email'?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value):/^@?[a-zA-Z0-9_]{1,32}$/.test(value);
    const error=content.querySelector('#cf-error');
    if(!valid) {error.textContent=d.channel==='Email'?'Укажите почту в формате name@company.ru.':d.channel==='Telegram'?'Укажите ваш @username. Если его нет, напишите нам напрямую.':'Введите номер полностью: +7 (999) 123-45-67.';input.setAttribute('aria-invalid','true');input.focus();return;}
    const people=content.querySelector('[name="people"]'); if(people && !people.checkValidity()){people.reportValidity();return;}
    if(d.channel==='Telegram'){d.contact='@'+value.replace(/^@/,'');input.value=d.contact;}
    const message=buildMessage();
    if(endpoint) {
      const button=content.querySelector('[type="submit"]');button.disabled=true;button.textContent='Отправляем…';content.querySelector('form').dataset.submitting='true';
      const submittedMode=mode;
      try {
        const res=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:d.name,phone:d.channel==='Телефон'?value:'',contact:value,channel:d.channel,comment:message,program:context||(submittedMode==='catalog'?'Каталог программ':submittedMode==='callback'?'Обратный звонок':'Подбор программы'),source:submittedMode,page:location.pathname}),signal:AbortSignal.timeout(15000)});
        const data=await res.json();
        if(!res.ok||data.ok!==true)throw Error();
        if(!data.duplicate){
          try {
            const goal=window.__ccGoal || (name=>{
              if(typeof window.ym==='function')window.ym(91307646,'reachGoal',name);
            });
            goal('lead_sent');
            if(submittedMode==='quiz')goal('form_quiz');
            else if(submittedMode==='callback')goal('form_callback');
            else if(submittedMode!=='catalog')goal('form_proposal');
          } catch(_e) {}
        }
        showSuccess(d,submittedMode==='catalog');delete drafts[submittedMode];
      }
      catch {error.textContent=mode==='catalog'?'Не удалось отправить запрос. Контакт сохранён в форме — попробуйте ещё раз.':'Не удалось отправить запрос. Данные сохранены в форме. Попробуйте ещё раз или напишите нам в мессенджере.';delete content.querySelector('form').dataset.submitting;button.disabled=false;button.textContent='Попробовать ещё раз';}return;
    }
    error.textContent='Отправка заявок пока не подключена. Вы можете написать нам в мессенджере.';
  }
  const chat=document.createElement('aside'); chat.id='catalyst-chat';chat.hidden=true;chat.setAttribute('aria-labelledby','chat-title');
  chat.innerHTML=`<div class="chat-paper"><div class="chat-header"><span class="chat-avatar"><img src="/home-release-20261104-v2/assets/chat-vlad.webp" alt="Влад"><i class="chat-status" aria-hidden="true"></i></span><div><strong>Влад · Каталист</strong><span>Ежедневно, 8:00–22:00 мск</span></div><button class="cf-close" aria-label="Закрыть чат" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div><div class="chat-message"><h2 id="chat-title">Ответьте на 5 коротких вопросов и&nbsp;получите расчёт</h2></div></div><div class="chat-bottom"><button class="action-black chat-request" type="button" data-form="quiz">Получить расчёт</button><div class="chat-messenger-note"><span>Или напишите напрямую — отвечу за 5 минут</span></div>${messengerLinks()}</div>`;
  const launcher=document.createElement('button');launcher.type='button';launcher.id='chat-launcher';launcher.setAttribute('aria-label','Открыть чат с Каталист');launcher.setAttribute('aria-controls','catalyst-chat');launcher.setAttribute('aria-expanded','false');
  launcher.innerHTML='<span class="chat-avatar"><img src="/home-release-20261104-v2/assets/chat-vlad.webp" alt="Влад" width="40" height="40"><i class="chat-status" aria-hidden="true"></i></span><span>Получить расчёт</span>';
  document.body.append(chat,launcher);
  // «Чатик 2» отключён; реализация сохранена в chat-quiz.js и chat-quiz.css.
  // window.mountCatalystChatQuiz({questions,answerLabels,endpoint,privacy,messengerLinks,telegramDraft,escape,formatPhone,contactIcon});
  // Shared across page loads in this tab; manual form opening remains available.
  const promptSessionMemory = new Map();
  function readPromptSession(key) {
    try { return sessionStorage.getItem('catalyst:prompts:' + key); }
    catch { return promptSessionMemory.get(key) || null; }
  }
  function writePromptSession(key, value) {
    promptSessionMemory.set(key, String(value));
    try { sessionStorage.setItem('catalyst:prompts:' + key, String(value)); } catch {}
  }
  const promptSessionStarted = Number(readPromptSession('started')) || Date.now();
  writePromptSession('started', promptSessionStarted);
  const scrollOffer=document.createElement('aside');
  scrollOffer.id='scroll-offer';scrollOffer.hidden=true;scrollOffer.setAttribute('aria-label','Специальное предложение');
  scrollOffer.innerHTML=`<button type="button" class="scroll-offer-open" data-form="offers" aria-haspopup="dialog"><strong>Посмотреть<br>акции</strong><svg class="offers-art" preserveAspectRatio="xMidYMin meet" viewBox="0 0 76 76" fill="none" aria-hidden="true"><path d="M24 0v20m-5 7v-7h10v7M57 0v32m-5 7v-7h10v7" stroke="#11743e" stroke-width="2"/><circle cx="24" cy="44" r="19" fill="#ffdf4a" stroke="#11743e" stroke-width="2"/><path d="M6 40q18 13 36 0M11 56q13-9 26 0" stroke="#11743e" stroke-width="2"/><circle cx="57" cy="56" r="16" fill="#e3f3e9" stroke="#11743e" stroke-width="2"/><path d="M57 44v24M45 56h24M49 48l16 16m0-16L49 64" stroke="#11743e" stroke-width="2"/></svg></button><button type="button" class="scroll-offer-close" aria-label="Скрыть карточку акции"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button>`;
  document.body.append(scrollOffer);
  function revealOffer(){
    if(readPromptSession('offer-shown'))return;
    if(document.hidden || document.querySelector('dialog[open], #catalyst-chat:not([hidden]), #chat-quiz:not([hidden])') || document.body.classList.contains('mobile-menu-open')){offerTimer=setTimeout(revealOffer,1000);return;}
    scrollOffer.hidden=false;
    writePromptSession('offer-shown', '1');
  }
  let offerTimer = readPromptSession('offer-shown') ? null : setTimeout(revealOffer, Math.max(0, 60000 - (Date.now() - promptSessionStarted)));
  scrollOffer.querySelector('.scroll-offer-close').onclick=()=>{clearTimeout(offerTimer);scrollOffer.hidden=true;launcher.focus({preventScroll:true});};

  function updateChatHours(){
    const hour=Number(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Moscow',hour:'2-digit',hourCycle:'h23'}).format(new Date()));
    const working=hour>=8&&hour<22;
    [chat,launcher].forEach(el=>{el.classList.toggle('chat-working',working);el.querySelector('.chat-avatar').title=working?'Рабочее время: 8:00–22:00 по Москве':'Вне рабочего времени. Ответим с 8:00 по Москве';});
  }
  updateChatHours();setInterval(updateChatHours,60000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateChatHours();});
  function toggleChat(show){chat.hidden=!show;launcher.setAttribute('aria-expanded',String(show));launcher.setAttribute('aria-label',show?'Закрыть чат с Каталист':'Открыть чат с Каталист');if(show)(chat.querySelector('#chat-title').setAttribute('tabindex','-1'),chat.querySelector('#chat-title').focus({preventScroll:true}));else launcher.focus({preventScroll:true});}
  launcher.onclick=()=>toggleChat(chat.hidden);chat.querySelector('.cf-close').onclick=()=>toggleChat(false);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!chat.hidden){toggleChat(false);}});
  document.addEventListener('click',e=>{if(!chat.hidden&&!chat.contains(e.target)&&!launcher.contains(e.target)) {chat.hidden=true;launcher.setAttribute('aria-expanded','false');}});
  document.addEventListener('catalyst:catalog-invite',()=>{
    if(readPromptSession('catalog-shown'))return;
    // On iOS a scroll-triggered dialog can lock the viewport mid toolbar transition.
    const viewport = window.visualViewport;
    let timer;
    function afterScroll() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        window.removeEventListener('scroll', afterScroll);
        viewport?.removeEventListener('resize', afterScroll);
        viewport?.removeEventListener('scroll', afterScroll);
        if (!readPromptSession('catalog-shown') && !document.hidden && !document.querySelector('dialog[open]')) {
          open('catalog', document.activeElement, '', true);
          writePromptSession('catalog-shown', '1');
        }
      }, 320);
    }
    window.addEventListener('scroll', afterScroll, {passive:true});
    viewport?.addEventListener('resize', afterScroll);
    viewport?.addEventListener('scroll', afterScroll);
    afterScroll();
  });
  function addCatalogArtwork(){
    if(!modal.classList.contains('cf-catalog-banner')||content.querySelector('.cf-catalog-art'))return;
    const intro=content.querySelector('.cf-quiz-promise'), formPanel=content.querySelector('.cf-catalog-body');
    if(intro&&formPanel)formPanel.prepend(intro);
    const art=document.querySelector('#catalog-download .cfb-design-art')?.cloneNode(true);
    if(art){art.className='cf-catalog-art';content.append(art);}
  }
  window.addEventListener('click',e=>{
    const trigger=e.composedPath().find(n=>n instanceof Element&&n.matches('a,button'))
      || (e.target instanceof Element && e.target.closest('#catalog-download')?.querySelector('[data-form="catalog"]'));if(!trigger)return;
    if(trigger.id==='chat-launcher'||trigger.closest('.cc-root'))return;
    if(!shadow.contains(trigger)&&!footerShadow.contains(trigger)&&!/Рассчит|рассчит|Получить расчёт|Получить расчет|Получить КП|Скачать каталог|Получить каталог/.test(trigger.textContent)&&!trigger.matches('[data-cc-topic],[href="#catalyst-chatbot"]'))return;
    // Legacy document listeners treat "Отправить заявку" as a link to another popup.
    // Dispatch the owned form's native submit before those listeners consume the click.
    if(trigger.type==='submit' && modal.contains(trigger) && trigger.form?.classList.contains('cf-form')){
      e.preventDefault();e.stopImmediatePropagation();
      if(!trigger.disabled && trigger.form.dataset.submitting!=='true')trigger.form.requestSubmit(trigger);
      return;
    }
    const text=trigger.textContent.trim();let kind=trigger.dataset.form;
    if(trigger.hasAttribute('data-brief')) kind='proposal';
    if(/Рассчит|рассчит|Получить расчёт|Получить расчет|Подобрать программу|Получить КП/.test(text)||trigger.matches('[data-cc-topic],[href="#catalyst-chatbot"]'))kind='quiz';
    if(/Скачать каталог|Получить каталог/.test(text))kind='catalog';
    if(/Помочь с выбором|Обсудить корпоратив|Обсудить мероприятие/.test(text))kind='proposal';
    if(trigger.id==='offers-trigger'||trigger.getAttribute('href')==='#offers-preview'||trigger.classList.contains('monthly-offers'))kind='offers';
    if(!['proposal','quiz','catalog','offers','callback'].includes(kind))return;
    e.preventDefault();e.stopImmediatePropagation();
    const selected=trigger.dataset.brief|| (trigger.id==='offers-trigger'?'Интересуют специальные предложения':text==='Обсудить корпоратив'?'Корпоратив под ключ':'');
    open(kind,trigger,selected);if(kind==='catalog'){modal.classList.add('cf-catalog-banner');addCatalogArtwork();}
  },true);

  shadow.addEventListener('catalyst:content-form',e=>{open(e.detail.kind,e.detail.trigger);if(e.detail.kind==='catalog'){modal.classList.add('cf-catalog-banner');addCatalogArtwork();}});host.dataset.formsReady='true';
  let catalogShown=false;
  function inviteCatalog(){
    if(catalogShown||realDocument.visibilityState!=='visible'||scrollY<1)return;
    const travel=realDocument.documentElement.scrollHeight-innerHeight;
    if(travel<innerHeight||scrollY<travel*.6)return;
    if(realDocument.activeElement?.matches('input,textarea,select')||document.activeElement?.matches('input,textarea,select')||document.querySelector('dialog[open],.mega-menu[open],#catalyst-chat:not([hidden])')||document.body.classList.contains('mobile-menu-open')||document.body.classList.contains('search-is-open'))return;
    catalogShown=true;removeEventListener('scroll',inviteCatalog);document.dispatchEvent(new CustomEvent('catalyst:catalog-invite'));
  }
  addEventListener('scroll',inviteCatalog,{passive:true});
  const newsletter=$('.footer-newsletter');

  if(newsletter){
    newsletter.querySelector('button').textContent='Подписаться';
    newsletter.insertAdjacentHTML('beforeend','<p class="newsletter-result" role="status"></p>');
    newsletter.onsubmit=e=>{e.preventDefault();const email=new FormData(newsletter).get('email');const result=newsletter.querySelector('.newsletter-result');result.innerHTML=`<span>Подтвердите подписку письмом:</span> <a href="mailto:info@catalystrussia.ru?subject=${encodeURIComponent('Подписка на новости Каталист')}&body=${encodeURIComponent('Хочу получать новости и идеи мероприятий Каталист на адрес '+email+'.')}" class="cf-text">Открыть письмо</a><small>Подписка начнётся после обработки запроса.</small>`;};
  }
})();

function addMonthlyOffers(){
 document.querySelectorAll('.mega-promo').forEach(promo=>{
  if(promo.parentElement.classList.contains('promo-stack'))return;
  const stack=document.createElement('div');stack.className='promo-stack';promo.before(stack);stack.append(promo);
  const button=document.createElement('button');button.type='button';button.className='monthly-offers';button.setAttribute('aria-haspopup','dialog');button.innerHTML='<strong>Спецпредложения октября</strong><span>Для тимбилдинга и корпоратива</span>';
  button.addEventListener('click',()=>{document.querySelectorAll('.mega-menu[open]').forEach(m=>m.open=false);document.getElementById('offers-preview').showModal()});stack.append(button);
 });
}
addMonthlyOffers();
new MutationObserver(addMonthlyOffers).observe(document.body,{childList:true,subtree:true});
function styleContactPhone(){document.querySelectorAll('.company-detail .company-phone').forEach(a=>{if(a.querySelector('svg'))return;a.insertAdjacentHTML('afterbegin','<svg class="phone-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02Z" stroke-linejoin="round"/></svg>');a.closest('.company-detail').querySelector('.company-contact-actions')?.prepend(a)})}
styleContactPhone();new MutationObserver(styleContactPhone).observe(document.body,{childList:true,subtree:true});


document.querySelector('.mobile-quote-action')?.remove();

(()=>{
 const header=document.querySelector('.header-proto'),utility=header?.querySelector('.topline'),nav=header?.querySelector('.primary-line'),hero=document.querySelector('body:not(.catalyst-inner) .hero');if(!header||!nav)return;
 let footer=document.getElementById('prototype-footer');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let raf=0,threshold=0,heroStart=0,heroHeight=1;
 function measure(){
  const c=getComputedStyle(header),left=parseFloat(c.paddingLeft),right=parseFloat(c.paddingRight),top=parseFloat(c.paddingTop),bottom=parseFloat(c.paddingBottom),navTop=parseFloat(c.getPropertyValue('--nav-top'))||12;
  // Resolve width before reading height, including when a viewport crosses a breakpoint.
  header.style.setProperty('--nav-left',(header.getBoundingClientRect().left+left)+'px');header.style.setProperty('--nav-width',(header.clientWidth-left-right)+'px');
  const utilityHeight=utility.getBoundingClientRect().height;
  header.style.setProperty('--header-flow-height',(top+utilityHeight+nav.getBoundingClientRect().height+bottom)+'px');
  threshold=Math.max(0,header.offsetTop+top+utilityHeight-navTop);
  heroStart=hero?.offsetTop||0;heroHeight=hero?.offsetHeight||1;draw();
 }
 function draw(){raf=0;drawFooter();const y=document.body.dataset.menuScroll!==undefined?Number(document.body.dataset.menuScroll):window.scrollY;header.classList.toggle('is-docked',y>threshold);const progress=reduced.matches?0:Math.max(0,Math.min(1,y/Math.max(1,heroStart+heroHeight-innerHeight*.22)));const eased=progress*progress*(3-2*progress);hero?.style.setProperty('--hero-inset',(eased*(innerWidth<=760?12:16)).toFixed(2)+'px');hero?.style.setProperty('--hero-corner',(eased*(innerWidth<=760?24:36)).toFixed(2)+'px')}
 function drawFooter(){footer ||= document.getElementById('prototype-footer');if(!footer)return;const remaining=Math.max(0,document.documentElement.scrollHeight-innerHeight-scrollY);const progress=reduced.matches?1:Math.max(0,Math.min(1,remaining/Math.min(footer.offsetHeight,innerHeight)));const eased=progress*progress*(3-2*progress);footer.style.setProperty('--footer-inset',(eased*(innerWidth<=760?12:16)).toFixed(2)+'px')}
 function update(){if(!raf)raf=requestAnimationFrame(draw)}
 addEventListener('scroll',update,{passive:true});addEventListener('resize',measure);reduced.addEventListener('change',draw);new ResizeObserver(measure).observe(nav);if(hero)new ResizeObserver(measure).observe(hero);document.fonts?.ready.then(measure);measure();
})();

(()=>{
const arrow='<svg class="ui-icon link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
function decorate(){document.querySelectorAll('.mega-promo:not(.promo-experiment)').forEach((card,index)=>{
const type='calendar';
card.classList.add('promo-experiment','promo-'+type);
const ornament=`<svg class="ny-ornament" viewBox="0 0 48 64" aria-hidden="true"><path d="M24 0v14m-6 8v-6h12v6" fill="none" stroke="#11743e" stroke-width="2"/><circle cx="24" cy="40" r="19" fill="#ffdf4a"/><path d="M6 38c9 7 27 7 36 0M11 51c8-5 18-5 26 0" fill="none" stroke="#11743e" stroke-width="2"/></svg>`;
card.innerHTML=`<div class="experiment-top">${type==='calendar'?'<span class="calendar-rings" aria-hidden="true"><svg viewBox="0 0 28 44" fill="none" aria-hidden="true"><circle cx="14" cy="33" r="5.5" fill="#fff" stroke="#c7c7bf" stroke-width="1.5"/><path d="M8 27V10C8 2 20 2 20 10V27C20 35 8 35 8 27Z" stroke="#343834" stroke-width="3" stroke-linejoin="round"/><path d="M9 25V10C9 5 13 4 16 5" stroke="#a7aaa4" stroke-width="1" stroke-linecap="round"/></svg><svg viewBox="0 0 28 44" fill="none" aria-hidden="true"><circle cx="14" cy="33" r="5.5" fill="#fff" stroke="#c7c7bf" stroke-width="1.5"/><path d="M8 27V10C8 2 20 2 20 10V27C20 35 8 35 8 27Z" stroke="#343834" stroke-width="3" stroke-linejoin="round"/><path d="M9 25V10C9 5 13 4 16 5" stroke="#a7aaa4" stroke-width="1" stroke-linecap="round"/></svg></span>':''}<span class="experiment-kicker">Новый год</span><h4>2027</h4><p>Для вашей команды</p>${type==='calendar'?ornament:''}</div><a class="experiment-button" href="/novogodnij-korporativ/">Смотреть предложение <svg class="offer-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></a>`;
const offers=card.parentElement.querySelector('.monthly-offers');if(offers){offers.innerHTML='Посмотреть акции '+arrow;offers.classList.add('experiment-offers')}
})}decorate();new MutationObserver(decorate).observe(document.body,{childList:true,subtree:true});
})();

(()=>{
let locked=false,previousOverflow='';
function lockPage(){
 const open=!!document.querySelector('.mega-menu[open]')||document.body.classList.contains('search-is-open');
 if(open===locked)return;
 locked=open;
 // Keep the document in its normal flow: closing on hover must not restore
 // its scroll position with an animated scroll (or move the docked header).
 const root=document.documentElement;
 if(open){previousOverflow=root.style.overflow;root.style.overflow='hidden';}
 else{root.style.overflow=previousOverflow;}
}
document.querySelectorAll('.mega-menu').forEach(menu=>menu.addEventListener('toggle',lockPage));
new MutationObserver(lockPage).observe(document.body,{attributes:true,attributeFilter:['class']});

document.querySelectorAll('.mega-menu').forEach(menu=>{
if(!menu.querySelector('.mega-results'))return;
menu.classList.add('catalog-layout-refined');
const panel=menu.querySelector('.mega-panel'),promo=menu.querySelector('.promo-stack');
if(promo)panel.append(promo);
const content=menu.querySelector('.menu-content');
const assistance=menu.querySelector('.menu-assistance');
if(assistance){
 assistance.className='catalog-menu-assistance';panel.append(assistance);
 const old=assistance.querySelector('a');const button=document.createElement('button');
 button.type='button';button.textContent='Подобрать программу';old.replaceWith(button);
 button.addEventListener('click',()=>{menu.open=false;document.querySelector('.hero-actions [data-brief], #header [data-form="callback"]').click()});
}
});
document.querySelectorAll('.mega-menu .experiment-offers').forEach(button=>{
 button.innerHTML='<span>Посмотреть<br>акции</span><svg class="offers-art" preserveAspectRatio="xMidYMin meet" viewBox="0 0 76 76" fill="none" aria-hidden="true"><path d="M24 0v20m-5 7v-7h10v7M57 0v32m-5 7v-7h10v7" stroke="#11743e" stroke-width="2"/><circle cx="24" cy="44" r="19" fill="#ffdf4a" stroke="#11743e" stroke-width="2"/><path d="M6 40q18 13 36 0M11 56q13-9 26 0" stroke="#11743e" stroke-width="2"/><circle cx="57" cy="56" r="16" fill="#e3f3e9" stroke="#11743e" stroke-width="2"/><path d="M57 44v24M45 56h24M49 48l16 16m0-16L49 64" stroke="#11743e" stroke-width="2"/></svg>';
});
})();

(()=>{
const chevron=iconSVG('<path d="m9 5 7 7-7 7"/>');
mobileSheet.classList.add('mobile-navigation');
mobileSheet.id='mobile-site-navigation';
mobileSheet.setAttribute('aria-label','Навигация по сайту');
const bar=document.createElement('div');bar.className='mobile-nav-bar';
bar.append(document.querySelector('.brand').cloneNode(true));
const actions=document.createElement('div');actions.className='mobile-nav-actions';
document.querySelectorAll('.primary-line>.messenger').forEach(a=>actions.append(a.cloneNode(true)));bar.append(actions);
const close=document.createElement('button');close.type='button';close.setAttribute('aria-label','Закрыть меню');close.innerHTML=iconSVG('<path d="m6 6 12 12M18 6 6 18"/>');close.onclick=()=>closeMobile();actions.append(close);mobileSheet.prepend(bar);
const footer=document.createElement('div');footer.className='mobile-nav-footer';footer.innerHTML='<button type="button" data-form="callback" aria-haspopup="dialog">Заказать звонок</button>';mobileSheet.append(footer);
// The footer separates content only while more of the list remains below it.
function syncFooterScroll(){
 mobileSheet.classList.toggle('has-content-below',mobileBody.scrollHeight-mobileBody.clientHeight-mobileBody.scrollTop>2);
}
mobileBody.addEventListener('scroll',syncFooterScroll,{passive:true});
new ResizeObserver(syncFooterScroll).observe(mobileBody);
new MutationObserver(()=>requestAnimationFrame(syncFooterScroll)).observe(mobileBody,{childList:true,subtree:true});
new MutationObserver(()=>requestAnimationFrame(syncFooterScroll)).observe(mobileSheet,{attributes:true,attributeFilter:['open']});
function level(name,title){mobileSheet.dataset.level=name;mobileSheet.querySelector('.mobile-sheet-head strong').textContent=title;mobileSheet.querySelector('.mobile-back').hidden=name==='root';mobileBody.scrollTop=0;}
mobileRoot=function(){
 mobileLevel='root';level('root','Меню');
 mobileBody.innerHTML='<button class="mobile-search-entry">Найти программу '+iconSVG('<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>')+'</button><nav class="mobile-main-links" aria-label="Основные разделы">'+Object.entries(mobileNames).map(([key,label])=>'<button class="mobile-row" data-kind="'+key+'"><span>'+label+'</span>'+chevron+'</button>').join('')+'<a class="mobile-row" href="/cases/"><span>Портфолио</span></a></nav><nav class="mobile-secondary-links" aria-label="Дополнительные разделы"></nav><div class="mobile-nav-contact"><a href="tel:+79911501001">+7 991 150-10-01</a><p>Ежедневно 8:00–22:00<br>Москва и МО · выезды по России</p><div class="mobile-nav-messengers"></div></div>';
 document.querySelectorAll('.utility-nav a').forEach(a=>{const copy=a.cloneNode(true);copy.removeAttribute('id');if(a.id!=='offers-trigger')copy.classList.add('mobile-row');if(a.id==='offers-trigger'){copy.classList.add('mobile-nav-offers');copy.innerHTML='<span>Посмотреть<br>акции</span><svg class="offers-art" preserveAspectRatio="xMidYMin meet" viewBox="0 0 76 76" fill="none" aria-hidden="true"><path d="M24 0v20m-5 7v-7h10v7M57 0v32m-5 7v-7h10v7" stroke="#11743e" stroke-width="2"/><circle cx="24" cy="44" r="19" fill="#ffdf4a" stroke="#11743e" stroke-width="2"/><path d="M6 40q18 13 36 0M11 56q13-9 26 0" stroke="#11743e" stroke-width="2"/><circle cx="57" cy="56" r="16" fill="#e3f3e9" stroke="#11743e" stroke-width="2"/><path d="M57 44v24M45 56h24M49 48l16 16m0-16L49 64" stroke="#11743e" stroke-width="2"/></svg>';}if(a.id==='offers-trigger')copy.onclick=e=>{e.preventDefault();closeMobile(false);document.getElementById('offers-preview').showModal()};(a.id==='offers-trigger'?mobileBody.querySelector('.mobile-main-links'):mobileBody.querySelector('.mobile-secondary-links')).append(copy)});
 // Keep all navigation together, followed by the seasonal card and offers.
 const secondary=mobileBody.querySelector('.mobile-secondary-links');
 const offers=mobileBody.querySelector('.mobile-nav-offers');
 secondary.after(offers);
 const seasonalSource=document.querySelector('#header .promo-calendar');
 if(seasonalSource){
  const stack=document.createElement('div');stack.className='promo-stack mobile-root-season';
  const card=document.createElement('a');card.className=seasonalSource.className;
  card.href='/novogodnij-korporativ/';
  card.innerHTML=seasonalSource.innerHTML;
  const link=card.querySelector('.experiment-button');
  if(link){const label=document.createElement('span');label.className=link.className;label.innerHTML=link.innerHTML;link.replaceWith(label)}
  stack.append(card);offers.before(stack);
 }
 document.querySelectorAll('.primary-line>.messenger').forEach(a=>{const copy=a.cloneNode(true);copy.className='mobile-nav-messenger '+(a.classList.contains('mv-ib-tg')?'mobile-nav-telegram':'mobile-nav-max');copy.append(document.createTextNode(a.classList.contains('mv-ib-tg')?'Telegram':'Max'));mobileBody.querySelector('.mobile-nav-messengers').append(copy)});
};
mobileCategories=function(kind){mobileKind=kind;mobileLevel='categories';level('categories',mobileNames[kind]);if(kind==='about'){mobileBody.innerHTML='<a class="mobile-row" href="/about/">О нас</a><a class="mobile-row" href="/#contacts">Контакты</a>';return}mobileBody.innerHTML=menuData[kind].map((cat,i)=>'<button class="mobile-row" data-category="'+i+'">'+(kind==='programs'?'<span class="category-icon">'+iconSVG(categoryPaths[i])+'</span>':'')+'<span>'+cat.title+'</span>'+chevron+'</button>').join('');};
mobilePrograms=function(index){savedMobilePrograms(index);mobileBody.querySelectorAll('.program-name').forEach(name=>{const text=name.textContent.trim();if(!text.includes(' · '))return;const [title,...details]=text.split(' · ');name.replaceChildren();const label=document.createElement('span');label.textContent=title;const meta=document.createElement('small');meta.className='mobile-program-meta';meta.textContent=details.join(' · ');name.append(label,meta)});level('programs',menuData[mobileKind][index].title);const all=document.createElement('a');all.className='mobile-category-all';all.href=menuData[mobileKind][index].all;all.textContent='Все программы категории';mobileBody.append(all)};

const desktopSearch=setSearch;
positionMobilePanel=function(){
 const rect=primary.getBoundingClientRect(),style=getComputedStyle(primary);
 // Keep the header contents at their closed-state viewport coordinates.
 bar.style.setProperty('height',Math.max(0,rect.bottom)+'px');
 bar.style.setProperty('padding-top',(Math.max(0,rect.top)+parseFloat(style.paddingTop))+'px');
 bar.style.setProperty('padding-bottom',style.paddingBottom);
 bar.style.setProperty('padding-left',(rect.left+parseFloat(style.paddingLeft))+'px');
 bar.style.setProperty('padding-right',(innerWidth-rect.right+parseFloat(style.paddingRight))+'px');
};
const previousClose=closeMobile;let menuMotion=null,menuClosing=false;
const reducedMenuMotion=matchMedia('(prefers-reduced-motion:reduce)');
function menuFrames(){
 const header=primary.getBoundingClientRect(),sheet=mobileSheet.getBoundingClientRect();
 const left=Math.max(0,header.left-sheet.left),top=Math.max(0,header.top-sheet.top);
 return [
  {clipPath:`inset(${top}px ${Math.max(0,sheet.right-header.right)}px ${Math.max(0,sheet.bottom-header.bottom)}px ${left}px)`},
  {clipPath:'inset(0px 0px 0px 0px)'}
 ];
}
function cancelMenuMotion(){menuMotion?.cancel();menuMotion=null;}
function animateMenu(open){
 if(open){
  cancelMenuMotion();
  menuMotion=mobileSheet.animate(menuFrames(),{duration:360,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});
 }else{
  // Decelerate towards the header instead of reversing the opening easing.
  const current=getComputedStyle(mobileSheet).clipPath;
  const radius=getComputedStyle(primary).borderTopLeftRadius;
  const destination=menuFrames()[0].clipPath.replace(/\)$/,` round ${radius})`);
  cancelMenuMotion();
  menuMotion=mobileSheet.animate([
   {clipPath:current==='none'?'inset(0px 0px 0px 0px round 0px)':current},
   {clipPath:destination}
  ],{duration:280,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});
 }
}
function finishClose(restore){
 previousClose(false);cancelMenuMotion();menuClosing=false;

 document.documentElement.style.overflow=document.querySelector('dialog[open],.mega-menu[open]')?'hidden':'';
 if(restore===true)mobileTrigger.focus({preventScroll:true});
}
closeMobile=function(restore=true){
 if(!mobileSheet.open)return;
 if(restore===false||reducedMenuMotion.matches){finishClose(restore);return;}
 if(menuClosing)return;
 menuClosing=true;
 animateMenu(false);menuMotion.onfinish=()=>finishClose(restore);
};
mobileSheet.addEventListener('cancel',e=>{e.preventDefault();closeMobile()});
mobileSheet.addEventListener('click',e=>{if(e.target===mobileSheet&&e.clientY>mobileSheet.getBoundingClientRect().bottom)closeMobile()});
openMobile=function(){
 if(mobileSheet.open)return;
 menus.forEach(m=>m.open=false);desktopSearch(false);mobileRoot();
 positionMobilePanel();document.documentElement.style.overflow='hidden';
 close.autofocus=true;mobileSheet.showModal();close.focus({preventScroll:true});
 document.body.classList.add('mobile-menu-open');
 mobileTrigger.setAttribute('aria-expanded','true');mobileTrigger.setAttribute('aria-label','Закрыть меню');
 mobileTrigger.innerHTML=iconSVG('<path d="m6 6 12 12M18 6 6 18"/>');
 if(!reducedMenuMotion.matches)animateMenu(true);
};
function mobileSearch(){
 mobileLevel='search';level('search','Поиск');
 mobileBody.innerHTML='<label class="mobile-search-field"><span class="sr-only">Найти программу</span><input type="search" placeholder="Название или задача команды" autocomplete="off"></label><div class="mobile-search-results"></div>';
 const input=mobileBody.querySelector('input'),results=mobileBody.querySelector('.mobile-search-results');
 const renderResults=MVS.bindResults(results,input,'sheet',true);
 function render(){renderResults();results.querySelectorAll('.mv-gbtn').forEach(a=>{a.removeAttribute('onclick');a.href='/#contacts'})}
 input.oninput=render;render();input.focus();
 results.onclick=e=>{const chip=e.target.closest('[data-q]');if(chip){e.preventDefault();input.value=chip.dataset.q;render();input.focus()}};
}
setSearch=function(open,focusBack=false){if(innerWidth>1100)return desktopSearch(open,focusBack);if(open){openMobile();mobileSearch()}else desktopSearch(false,focusBack)};
st.onclick=e=>{e.stopPropagation();if(innerWidth>1100){setSearch(searchPanel.hidden,true);return}if(mobileSheet.open&&mobileLevel==='search')closeMobile();else setSearch(true)};
mobileBody.onclick=e=>{const cat=e.target.closest('[data-category]'),kind=e.target.closest('button[data-kind]');if(cat)mobilePrograms(Number(cat.dataset.category));else if(kind)mobileCategories(kind.dataset.kind);else if(e.target.closest('.mobile-search-entry'))mobileSearch()};
mobileSheet.querySelector('.mobile-back').innerHTML=iconSVG('<path d="m14 5-7 7 7 7"/>');
mobileSheet.querySelector('.mobile-back').onclick=()=>{mobileLevel==='programs'?mobileCategories(mobileKind):mobileRoot()};
mobileBody.addEventListener('click',e=>{const a=e.target.closest('a.mobile-row');if(a)closeMobile(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobileSheet.open){e.preventDefault();closeMobile()}});
mobileSheet.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const items=[...mobileSheet.querySelectorAll('a[href],button:not([hidden]),input')].filter(el=>el.getClientRects().length);const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
})();

/* Keep modal close controls above the independently scrolling form surface. */
(() => {
  // Lock the document, while each dialog surface remains independently scrollable.
  let savedScroll = null, savedBody = '';
  function syncDocumentLock(){
    const isOpen = !!document.querySelector('dialog[open]');
    if(isOpen && savedScroll === null){
      savedScroll = window.scrollY;
      savedBody = realDocument.body.getAttribute('style') || '';
      document.documentElement.style.overflow = 'hidden';
      // Keep the page in normal flow on phones. Fixing the body at a negative
      // scroll offset can leave the area uncovered when iOS collapses its toolbar.
      if(!window.matchMedia('(max-width:700px)').matches)Object.assign(realDocument.body.style,{position:'fixed',top:`-${savedScroll}px`,left:'0',right:'auto',width:realDocument.documentElement.getBoundingClientRect().width+'px',overflow:'hidden'});
    }else if(!isOpen && savedScroll !== null){
      const y = savedScroll; savedScroll = null;
      realDocument.body.setAttribute('style',savedBody);
      // A menu may have locked the root before handing off to this dialog.
      // Never restore that stale lock once all overlays are closed.
      const menuOpen = !!document.querySelector('.mega-menu[open]') || document.body.classList.contains('mobile-menu-open');
      document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
      document.body.classList.remove('cf-modal-open');
      window.scrollTo({top:y,behavior:'instant'});
    }
  }
  new MutationObserver(syncDocumentLock).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open'],childList:true});
  function syncViewport(){
    const viewport=window.visualViewport;
    const height=viewport?.height||window.innerHeight;
    document.documentElement.style.setProperty('--popup-viewport-height',height+'px');
    document.documentElement.style.setProperty('--popup-viewport-bottom',Math.max(0,window.innerHeight-height-(viewport?.offsetTop||0))+'px');
  }
  window.visualViewport?.addEventListener('resize',syncViewport);
  window.visualViewport?.addEventListener('scroll',syncViewport);
  window.addEventListener('resize',syncViewport);
  syncViewport();
  document.querySelectorAll('#contact-dialog,#telegram-invite,#brief,#offers-preview').forEach(dialog => {
    const close=dialog.querySelector('.cf-close,.ti-close,.close,#offers-close');
    if(!close)return;
    const surface=document.createElement('div');
    surface.className='popup-form-surface';
    close.remove();
    surface.append(...dialog.childNodes);
    dialog.append(close,surface);
    function refresh(){
      dialog.removeAttribute('data-external-close');
      const style=getComputedStyle(dialog);
      dialog.style.setProperty('--popup-surface-padding',style.padding);
      dialog.style.setProperty('--popup-surface-background',style.backgroundColor);
      dialog.style.setProperty('--popup-surface-radius',style.borderRadius);
      dialog.setAttribute('data-external-close','');

    }
    const mobile=matchMedia('(max-width:700px)');
    function placeClose(){
      if(!dialog.open||!mobile.matches){
        if(close.hasAttribute('popover')){
          if(close.matches(':popover-open'))close.hidePopover();
          close.removeAttribute('popover');
        }
        return;
      }
      const supportsPopover=typeof close.showPopover==='function';
      const top=dialog.getBoundingClientRect().top+(supportsPopover?-48:8);
      dialog.style.setProperty('--popup-close-top',Math.max(0,top)+'px');
      // Promote the existing button, preserving its handler and accessible name.
      // iOS clips fixed descendants of a scrolling dialog unless they have their own top layer.
      if(supportsPopover){
        close.setAttribute('popover','manual');
        if(!close.matches(':popover-open'))close.showPopover();
      }
    }
    new ResizeObserver(placeClose).observe(dialog);
    window.visualViewport?.addEventListener('resize',placeClose);
    window.visualViewport?.addEventListener('scroll',placeClose);
    window.addEventListener('resize',placeClose);
    new MutationObserver(records=>{
      if(records.some(record=>record.attributeName==='class'||record.attributeName==='open'))refresh();
      placeClose();
    }).observe(dialog,{attributes:true,attributeFilter:['class','open']});
    window.addEventListener('resize',refresh);
    dialog.addEventListener('close',()=>{placeClose();surface.scrollTop=0;dialog.scrollTop=0;});
    refresh();
  });
})();

/* Photo-only parallax: contact text and controls never move within the section. */
(() => {
  const scene = document.querySelector('#s10 .contact-scene');
  const photo = scene?.querySelector('.contact-scene-photo');
  if (!photo) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 700px)');
  let frame = 0;
  function render() {
    frame = 0;
    if (reduced.matches) {
      photo.style.removeProperty('--contact-photo-offset');
      return;
    }
    const rect = scene.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) return;
    const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)));
    const travel = mobile.matches ? 24 : 48;
    photo.style.setProperty('--contact-photo-offset', `${((progress * 2 - 1) * travel).toFixed(2)}px`);
  }
  function request() { if (!frame) frame = requestAnimationFrame(render); }
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request);
  reduced.addEventListener('change', request);
  photo.addEventListener('load', request, { once: true });
  request();
})();


// Normal navigation stays in this tab, including links created by menu renderers.
const sameTab=root=>root.querySelectorAll('a[target]').forEach(a=>a.removeAttribute('target'));
for(const root of [shadow,footerShadow]){sameTab(root);new MutationObserver(()=>sameTab(root)).observe(root,{childList:true,subtree:true});}
const scrollContacts=()=>footerShadow.querySelector('#s10').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
realDocument.addEventListener('click',e=>{const a=e.composedPath().find(n=>n instanceof Element&&n.matches('a'));if(a&&a.getAttribute('href')==='#header'&&footerShadow.contains(a)){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});return;}if(a&&['#contacts','#s10'].includes(a.getAttribute('href'))){e.preventDefault();scrollContacts();}});
window.addEventListener('hashchange',()=>{if(['#contacts','#s10'].includes(location.hash))scrollContacts();});
// Remove only the stray standalone closing-angle text after legacy footers.
for(const root of realDocument.querySelectorAll('.site-foot')){const walker=realDocument.createTreeWalker(root,NodeFilter.SHOW_TEXT);const stray=[];while(walker.nextNode()){if(walker.currentNode.textContent.trim()==='>'&&!walker.currentNode.parentElement.closest('script,style'))stray.push(walker.currentNode);}stray.forEach(n=>n.remove());}
// Retain native content-page forms and close only this menu when clicking outside.
realDocument.addEventListener('click',e=>{if(!e.composedPath().includes(host)){menus.forEach(m=>m.open=false);setSearch(false);}});
// Show the replacement only after construction; old navigation is a no-JS fallback.
const activate=()=>{if(!sheet.sheet||!footerSheet.sheet)return;hideLegacy();host.style.removeProperty('display');footerHost.style.removeProperty('display');realDocument.documentElement.classList.add('catalyst-navigation-ready');};
footerSheet.addEventListener('load',activate,{once:true});
sheet.addEventListener('load',activate,{once:true});if(sheet.sheet)activate();
})();
(() => {
  const root = document.querySelector('[data-site-header]');
  const footer = document.querySelector('[data-site-footer]');
  const site = 'https://catalystrussia.ru';
  const menu = [
    ['Каталог программ', [
      ['Все программы', '/teambuilding/vse-programmy/'],
      ['Популярные тимбилдинги', '/teambuilding-hit/'],
      ['Тимбилдинг в офисе', '/programmy/timbilding-v-ofise/'],
      ['Тимбилдинг на природе', '/blog/letnij-timbilding-na-prirode/'],
    ]],
    ['Новый год 2027', [
      ['Всё для Нового года', '/novogodnij-korporativ/'],
      ['Новый год компании', '/novogodnij-korporativ/na-50-200-chelovek/'],
      ['Большой праздник', '/novogodnij-korporativ/ot-200-chelovek/'],
      ['Идеи для новогоднего корпоратива', '/idei-novogodnego-korporativa/'],
    ]],
    ['Корпоративы', [
      ['Корпоративы под ключ', '/korporativ/'],
      ['Корпоратив в офисе', '/korporativ-v-ofise/'],
      ['Выездной корпоратив', '/vyezdnoj-korporativ/'],
    ]],
    ['Портфолио', '/cases/'],
    ['О компании', [
      ['О нас', '/about/'],
      ['Контакты', '/kontakty/'],
    ]],
  ];
  const utility = [
    ['Отзывы', '/reviews/'], ['Видео', '/teambuilding-video/'], ['Блог', './index.html'],
    ['Агентствам', '/foragencies/'], ['Акции', '/#offers-preview'],
  ];
  const url = (path) => path.startsWith('/') ? site + path : path;
  const link = ([label, path]) => `<a href="${url(path)}"${path === './index.html' && !location.pathname.endsWith('article.html') ? ' aria-current="page"' : ''}>${label}</a>`;
  const mainMenu = menu.map(([label, routes]) => Array.isArray(routes)
    ? `<details><summary>${label}</summary><div class="journal-dropdown"><p>${label}</p><ul>${routes.map((route) => `<li>${link(route)}</li>`).join('')}</ul></div></details>`
    : link([label, routes])).join('');
  const mobileMenu = menu.map(([label, routes]) => link([label, Array.isArray(routes) ? routes[0][1] : routes])).join('');
  const search = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10" cy="10" r="6.5"></circle><path d="m15 15 6 6"></path></svg>';
  const burger = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>';
  const telegram = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.6 18.6 19.2c-.2 1-.9 1.2-1.8.8l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.2-8.3c.4-.4-.1-.6-.6-.2l-11.4 7.2-4.9-1.5c-1.1-.3-1.1-1.1.2-1.6L20.4 3c.9-.3 1.7.2 1.5 1.6z"></path></svg>';
  const max = '<svg aria-hidden="true" viewBox="0 0 120 120" fill="currentColor"><path d="M60.6823 104.739C51.7136 104.739 47.5431 103.428 40.2984 98.1916C35.7143 104.086 21.1999 108.69 20.5671 100.813C20.5671 94.8981 19.2567 89.9005 17.7768 84.4445C16.008 77.723 14 70.239 14 59.3918C14 33.4871 35.2559 14 60.4382 14C85.6503 14 105.397 34.4487 105.397 59.636C105.481 84.4296 85.4759 104.609 60.6823 104.739ZM61.051 36.392C48.7838 35.7592 39.2271 44.2496 37.1095 57.5632C35.3656 68.5848 38.4648 82.008 41.1055 82.7056C42.3711 83.0095 45.56 80.4335 47.5431 78.4504C50.8268 80.7194 54.6509 82.0823 58.6295 82.4017C71.3352 83.0145 82.1974 73.3382 83.0494 60.6425C83.5477 47.9218 73.7618 37.1444 61.051 36.4169V36.392Z" fill-rule="evenodd"></path></svg>';
  const telegramUrl = 'https://telegram.me/irek_stn';
  const maxUrl = 'https://max.ru/u/f9LHodD0cOKJGPNk8tLsr7rNfEOQc77ksLyB_spYPyOeeyFZdwIjxNIvtZs';

  if (root) {
    root.innerHTML = `
      <header class="journal-header" id="header">
        <div class="journal-topline">
          <nav class="journal-utility" aria-label="Дополнительные разделы">${utility.map(link).join('')}</nav>
          <div class="journal-contact">
            <span>Москва, МО · выезды по России</span>
            <a href="tel:+79911501001"><strong>+7 991 150-10-01</strong><span>Ежедневно с 8:00 до 22:00</span></a>
          </div>
        </div>
        <div class="journal-primary">
          <a class="journal-logo" href="${site}/" aria-label="Каталист, главная"><img src="./assets/logo.png" width="176" height="176" alt="Каталист"></a>
          <nav class="journal-nav" aria-label="Основное меню">${mainMenu}</nav>
          <a class="journal-icon" href="${site}/#catalog" aria-label="Найти программу в каталоге">${search}</a>
          <a class="journal-icon" href="${telegramUrl}" aria-label="Написать в Telegram">${telegram}</a>
          <a class="journal-icon" href="${maxUrl}" aria-label="Написать в Max">${max}</a>
          <a class="journal-call" href="#blog-contact">Заказать звонок</a>
          <details class="journal-mobile-nav">
            <summary class="journal-icon" aria-label="Меню">${burger}</summary>
            <nav class="journal-mobile-links" aria-label="Основное меню">${mobileMenu}${utility.map(link).join('')}<a href="#blog-contact">Заказать звонок</a><a href="tel:+79911501001">+7 991 150-10-01</a></nav>
          </details>
        </div>
      </header>`;

    const disclosures = [...root.querySelectorAll('details')];
    const close = (details) => { details.open = false; };
    root.addEventListener('click', (event) => {
      const source = event.target.closest('summary')?.parentElement;
      if (source) {
        disclosures.filter((details) => details !== source).forEach(close);
      }
      if (event.target.closest('a[href="#blog-contact"]')) disclosures.forEach(close);
    });
    document.addEventListener('click', (event) => {
      if (!root.contains(event.target)) disclosures.forEach(close);
    });
    root.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      const open = disclosures.find((details) => details.open);
      if (open) {
        close(open);
        open.querySelector('summary').focus();
      }
    });
  }

  if (footer) {
    footer.innerHTML = `
      <footer class="journal-footer">
        <div class="page-shell">
          <div class="journal-footer-grid">
            <nav aria-label="Программы"><h2>Программы</h2><ul>
              <li><a href="${site}/timbilding/">Тимбилдинги</a></li>
              <li><a href="${site}/korporativ/">Корпоративы</a></li>
              <li><a href="${site}/novogodnij-korporativ/">Новый год 2027</a></li>
            </ul></nav>
            <nav aria-label="О компании"><h2>О компании</h2><ul>
              <li><a href="${site}/about/">О нас</a></li>
              <li><a href="${site}/cases/">Портфолио</a></li>
              <li><a href="./index.html">Блог</a></li>
            </ul></nav>
            <nav aria-label="Контакты"><h2>Контакты</h2><ul>
              <li><a href="tel:+79911501001">+7 991 150-10-01</a></li>
              <li><a href="${telegramUrl}">Telegram</a></li>
              <li><a href="${maxUrl}">Max</a></li>
            </ul></nav>
          </div>
          <p class="journal-footer-bottom"><a href="${site}/">Каталист: больше 5 000 проектов, 16 наград, 50+ программ</a></p>
        </div>
      </footer>`;
  }
})();

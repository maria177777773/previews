const journalFilters = document.querySelector('[data-journal-filters]');
const journalStatus = document.querySelector('[data-journal-status]');
const journalCards = [...document.querySelectorAll('[data-rubric]')];

if (journalFilters) {
  const buttons = [...journalFilters.querySelectorAll('[data-filter]')];

  function selectRubric(selected) {
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button === selected));
    }
    for (const card of journalCards) {
      card.hidden = selected.dataset.filter !== 'all' && card.dataset.rubric !== selected.dataset.filter;
    }

    const count = journalCards.filter((card) => !card.hidden).length;
    journalStatus.textContent = 'Показано материалов: ' + count;
  }

  journalFilters.addEventListener('click', (event) => {
    const selected = event.target.closest('[data-filter]');
    if (selected) selectRubric(selected);
  });

  const rubric = new URLSearchParams(location.search).get('rubric');
  selectRubric(buttons.find((button) => button.dataset.filter === rubric) ?? buttons[0]);
  journalFilters.hidden = false;
}

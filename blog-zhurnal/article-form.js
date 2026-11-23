const contactIcons = {tel:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z"/></svg>',max:'<svg viewBox="0 0 120 120" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M60.6823 104.739C51.7136 104.739 47.5431 103.428 40.2984 98.1916C35.7143 104.086 21.1999 108.69 20.5671 100.813C20.5671 94.8981 19.2567 89.9005 17.7768 84.4445C16.008 77.723 14 70.239 14 59.3918C14 33.4871 35.2559 14 60.4382 14C85.6503 14 105.397 34.4487 105.397 59.636C105.481 84.4296 85.4759 104.609 60.6823 104.739ZM61.051 36.392C48.7838 35.7592 39.2271 44.2496 37.1095 57.5632C35.3656 68.5848 38.4648 82.008 41.1055 82.7056C42.3711 83.0095 45.56 80.4335 47.5431 78.4504C50.8268 80.7194 54.6509 82.0823 58.6295 82.4017C71.3352 83.0145 82.1974 73.3382 83.0494 60.6425C83.5477 47.9218 73.7618 37.1444 61.051 36.4169V36.392Z"/></svg>',tg:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.9 4.6 18.6 19.2c-.2 1-.9 1.2-1.8.8l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.2-8.3c.4-.4-.1-.6-.6-.2l-11.4 7.2-4.9-1.5c-1.1-.3-1.1-1.1.2-1.6L20.4 3c.9-.3 1.7.2 1.5 1.6z"/></svg>'};

const contactOptions = {
  tel: {label: 'Телефон', field: 'Номер телефона'},
  max: {label: 'Max', field: 'Номер телефона в Max'},
  tg: {label: 'Telegram', field: 'Имя пользователя в Telegram'},
};
const phoneExample = '+7 (925) 123-45-67';
const contactRoot = document.querySelector('[data-article-form]');

function nationalDigits(value) {
  const digits = value.replace(/\D/g, '');
  if (value.trimStart().startsWith('+7') || (digits.length === 11 && /^[78]/.test(digits))) {
    return digits.slice(1, 11);
  }
  return digits.slice(0, 10);
}

function formatPhone(digits) {
  if (!digits.length) return '';
  let value = '+7 (' + digits.slice(0, 3);
  if (digits.length > 3) value += ') ' + digits.slice(3, 6);
  if (digits.length > 6) value += '-' + digits.slice(6, 8);
  if (digits.length > 8) value += '-' + digits.slice(8, 10);
  return value;
}

function setPhoneSelection(field, digitCount) {
  if (!field.value) return;
  let seen = 0;
  for (let i = 4; i < field.value.length; i++) {
    if (!/\d/.test(field.value[i])) continue;
    seen += 1;
    if (seen === digitCount) {
      field.setSelectionRange(i + 1, i + 1);
      return;
    }
  }
  if (digitCount === 0) field.setSelectionRange(4, 4);
}

if (contactRoot) {
  contactRoot.innerHTML = [
    '<form class="blog-contact" aria-labelledby="blog-contact-title" novalidate>',
    '<div class="blog-contact-row">',
    '<h2 id="blog-contact-title">Помочь с выбором программы?</h2>',
    '<div class="blog-contact-ways" role="group" aria-label="Как с вами связаться">',
    ...Object.entries(contactOptions).map(([key, option]) =>
      '<button type="button" data-method="' + key + '" aria-pressed="' + (key === 'tel') +
      '" aria-label="' + option.label + '" title="' + option.label + '">' + contactIcons[key] + '</button>'),
    '</div>',
    '<div class="blog-contact-field">',
    '<span class="blog-contact-flag" aria-hidden="true"></span>',
    '<input type="tel" inputmode="tel" autocomplete="tel" required aria-describedby="blog-contact-status">',
    '</div>',
    '<button class="blog-contact-submit" type="submit">Отправить</button>',
    '</div>',
    '<p class="blog-contact-status" id="blog-contact-status" role="status"></p>',
    '</form>',
  ].join('');

  const form = contactRoot.querySelector('form');
  const field = form.querySelector('input');
  const holder = form.querySelector('.blog-contact-field');
  const status = form.querySelector('[role="status"]');
  const buttons = [...form.querySelectorAll('[data-method]')];
  const values = new Map();
  let method = 'tel';

  function resetStatus() {
    status.textContent = 'Демо-форма. Введённые данные остаются на этой странице.';
    field.removeAttribute('aria-invalid');
  }

  function useMethod(next) {
    values.set(method, field.value);
    method = next;
    const telegram = method === 'tg';
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.method === method));
    }
    holder.toggleAttribute('data-telegram', telegram);
    field.type = telegram ? 'text' : 'tel';
    field.inputMode = telegram ? 'text' : 'tel';
    field.autocomplete = telegram ? 'off' : 'tel';
    field.setAttribute('aria-label', contactOptions[method].field);
    field.placeholder = telegram ? '@username' : phoneExample;
    field.value = values.get(method) || '';
    resetStatus();
  }

  for (const button of buttons) {
    button.addEventListener('click', () => useMethod(button.dataset.method));
  }

  field.addEventListener('beforeinput', event => {
    const backward = event.inputType === 'deleteContentBackward';
    const forward = event.inputType === 'deleteContentForward';
    const caret = field.selectionStart;
    if (method === 'tg' || (!backward && !forward) || caret !== field.selectionEnd || !field.value) {
      return;
    }
    const beforeCaret = nationalDigits(field.value.slice(0, caret)).length;
    const removeIndex = backward ? beforeCaret - 1 : beforeCaret;
    const digits = nationalDigits(field.value);
    event.preventDefault();
    if (removeIndex < 0 || removeIndex >= digits.length) return;
    field.value = formatPhone(digits.slice(0, removeIndex) + digits.slice(removeIndex + 1));
    setPhoneSelection(field, removeIndex);
    resetStatus();
  });

  field.addEventListener('input', () => {
    if (method !== 'tg') {
      const before = field.value.slice(0, field.selectionStart);
      const digits = nationalDigits(field.value);
      const pastedNationalNumber = /^8\D*\d/.test(field.value) && field.value.replace(/\D/g, '').length === 11;
      const caretDigits = pastedNationalNumber
        ? Math.max(0, before.replace(/\D/g, '').length - 1)
        : nationalDigits(before).length;
      field.value = formatPhone(digits);
      setPhoneSelection(field, Math.min(caretDigits, digits.length));
    }
    resetStatus();
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const telegram = method === 'tg';
    const valid = telegram ? Boolean(field.value.trim()) : nationalDigits(field.value).length === 10;
    if (!valid) {
      field.setAttribute('aria-invalid', 'true');
      status.textContent = telegram ? 'Введите имя пользователя в Telegram.' : 'Введите номер целиком, как в примере.';
      field.focus();
      return;
    }
    field.removeAttribute('aria-invalid');
    status.textContent = 'Готово. Демо-форма работает, данные остались на странице.';
  });

  useMethod('tel');
}

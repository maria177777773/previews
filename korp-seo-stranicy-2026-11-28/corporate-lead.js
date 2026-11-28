(() => {
  const attempts = new WeakMap();
  const channels = { tel: 'Телефон', max: 'Max', tg: 'Telegram' };

  function normalizedContact(input, way) {
    const value = input.value.trim();
    const digits = value.replace(/\D/g, '');
    if (/^(?:\+?[78])[0-9 ()-]+$/.test(value) && /^[78]\d{10}$/.test(digits)) {
      return '+' + '7' + digits.slice(1);
    }
    const nick = value.replace(/^https?:\/\//i, '').replace(/^t\.me\//i, '').replace(/^@/, '');
    if (way === 'tg') return /^[a-z0-9_]{5,32}$/i.test(nick) ? '@' + nick : '';
    if (way === 'max' && input.type === 'text') {
      return /^@[a-z0-9_.-]{3,40}$/i.test(value) || /^https:\/\/max\.ru\/[a-z0-9_./-]{3,120}$/i.test(value) ? value : '';
    }
    return '';
  }

  window.catalystCorporateLead = async (region, button, input, way, note, program, summary, goal) => {
    if (attempts.get(region)?.pending || button.disabled) return;
    const contact = normalizedContact(input, way);
    if (!contact || !channels[way]) {
      note.textContent = 'Укажите контакт для выбранного канала.';
      input.setAttribute('aria-invalid', 'true');
      input.focus();
      return;
    }
    input.removeAttribute('aria-invalid');
    const payload = {
      phone: /^\+7\d{10}$/.test(contact) ? contact : '',
      contact,
      messenger: channels[way],
      comment: [contact, summary].filter(Boolean).join(' · '),
      program,
      title: 'Заявка на корпоратив с сайта',
      source: 'corporate-scenario',
      page: location.pathname,
      referer: location.href,
    };
    const fingerprint = JSON.stringify(payload);
    const previous = attempts.get(region);
    const id = previous?.fingerprint === fingerprint
      ? previous.id
      : typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : 'korp-' + Date.now() + '-' + Math.random().toString(36).slice(2);
    const attempt = { id, fingerprint, pending: true };
    attempts.set(region, attempt);
    const controls = [...region.querySelectorAll('[data-way], [data-hway]')].filter(el => el.tagName === 'BUTTON');
    for (const el of [button, input, ...controls]) el.disabled = true;
    note.textContent = 'Отправляем заявку…';
    try {
      const response = await fetch('/api/lead/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, lead_id: id }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('Заявка не подтверждена');
      note.textContent = 'Заявка принята. Менеджер свяжется с вами.';
      button.textContent = 'Спасибо!';
      if (!result.duplicate) {
        try {
          const reachGoal = window.__ccGoal || (name => window.ym?.(window.mainMetrikaId, 'reachGoal', name));
          reachGoal('lead_sent');
          reachGoal(goal);
        } catch { /* Сбой счётчика не меняет подтверждение заявки. */ }
      }
    } catch {
      note.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз.';
      for (const el of [button, input, ...controls]) el.disabled = false;
    } finally {
      attempt.pending = false;
    }
  };
})();

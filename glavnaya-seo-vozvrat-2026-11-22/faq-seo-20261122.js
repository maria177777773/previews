(() => {
  const section = document.getElementById('s8');
  const copy = section.querySelector('.seo-copy');
  const toggle = section.querySelector('.seo-toggle');
  let expanded = false;
  function setExpanded(value) {
    expanded = value;
    section.classList.toggle('seo-expanded', value);
    copy.classList.toggle('expanded', value);
    toggle.setAttribute('aria-expanded', String(value));
    toggle.textContent = value ? 'Свернуть' : 'Читать полностью';
  }
  toggle.addEventListener('click', () => {
    setExpanded(!expanded);
    if (!expanded) {
      section.scrollIntoView({block:'start', behavior:'instant'});
      toggle.focus({preventScroll:true});
    }
  });
  section.querySelectorAll('.seo-toc a').forEach(link => link.addEventListener('click', () => setExpanded(true)));
  setExpanded(false);
  const tocLinks = [...section.querySelectorAll('.seo-toc a')];
  const tocTargets = tocLinks.map(link => document.getElementById(link.hash.slice(1)));
  function markActive(index) {
    tocLinks.forEach((link, i) => {
      if (i === index) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  let tocFrame = 0;
  function updateActive() {
    tocFrame = 0;
    let index = 0;
    if (expanded) tocTargets.forEach((target, i) => {
      if (target && target.getBoundingClientRect().top <= (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 92) + 48) index = i;
    });
    markActive(index);
  }
  tocLinks.forEach((link, i) => link.addEventListener('click', () => markActive(i)));
  window.addEventListener('scroll', () => {
    if (!tocFrame) tocFrame = requestAnimationFrame(updateActive);
  }, {passive:true});
  window.addEventListener('resize', updateActive);
  toggle.addEventListener('click', updateActive);
  updateActive();


  // Keep one answer open across both FAQ columns, including older browsers.
  const questions = [...document.querySelectorAll('#s9 details.question')];
  document.querySelector('#s9 .faq-columns').replaceChildren(...questions);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const states = new Map();
  function animateQuestion(question, expanded) {
    const state = states.get(question);
    const startHeight = question.getBoundingClientRect().height;
    if (state.animation) {
      state.animation.onfinish = null;
      state.animation.cancel();
    }
    state.expanded = expanded;
    state.summary.setAttribute('aria-expanded', String(expanded));
    question.style.height = '';
    // Measure the destination in normal layout, then keep the answer rendered
    // until the closing animation completes.
    question.open = expanded;
    const endHeight = question.getBoundingClientRect().height;
    if (reducedMotion.matches) {
      state.animation = null;
      return;
    }
    question.open = true;
    state.animation = question.animate(
      [{height: `${startHeight}px`}, {height: `${endHeight}px`}],
      {duration: 280, easing: 'cubic-bezier(.22, 1, .36, 1)'}
    );
    state.animation.onfinish = () => {
      question.open = state.expanded;
      state.animation = null;
    };
  }
  questions.forEach(question => {
    // Native exclusive details close immediately; coordinate the animation here.
    question.removeAttribute('name');
    const summary = question.querySelector('summary');
    states.set(question, {expanded: question.open, animation: null, summary});
    summary.setAttribute('aria-expanded', String(question.open));
    summary.addEventListener('click', event => {
      event.preventDefault();
      const expanded = !states.get(question).expanded;
      if (expanded) questions.forEach(other => {
        if (other !== question && states.get(other).expanded) animateQuestion(other, false);
      });
      animateQuestion(question, expanded);
    });
  });
})();

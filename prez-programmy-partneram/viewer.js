(function () {
  var N = parseInt(document.getElementById('tot').textContent, 10);
  var img = document.getElementById('slide'), cur = document.getElementById('cur');
  var prev = document.getElementById('prev'), next = document.getElementById('next');
  var stage = document.getElementById('stage'), frame = document.getElementById('frame');
  var thumbs = document.getElementById('thumbs').querySelectorAll('button');
  var i = 1;
  function src(k) { return 's/' + (k < 10 ? '0' : '') + k + '.jpg'; }
  function pre(k) { if (k >= 1 && k <= N) { var p = new Image(); p.src = src(k); } }
  function go(k, noHash) {
    k = Math.max(1, Math.min(N, k)); if (k === i && img.getAttribute('src') === src(k)) return;
    i = k; img.src = src(k); img.alt = 'Слайд ' + k; cur.textContent = k;
    prev.disabled = k === 1; next.disabled = k === N;
    thumbs.forEach(function (t, j) { t.classList.toggle('on', j + 1 === k); });
    var t = thumbs[k - 1]; if (t) t.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    if (!noHash) history.replaceState(null, '', '#' + k);
    pre(k + 1); pre(k - 1); pre(k + 2);
  }
  prev.onclick = document.getElementById('prev2').onclick = function () { go(i - 1); };
  next.onclick = document.getElementById('next2').onclick = function () { go(i + 1); };
  thumbs.forEach(function (t, j) { t.onclick = function () { go(j + 1); }; });
  frame.onclick = function (e) { var r = frame.getBoundingClientRect(); go(e.clientX - r.left < r.width / 3 ? i - 1 : i + 1); };
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); go(i + 1); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(i - 1); }
    else if (e.key === 'Home') go(1); else if (e.key === 'End') go(N);
    else if (e.key === 'f' || e.key === 'F') fs();
    else if (e.key === 'Escape' && stage.classList.contains('pseudo')) stage.classList.remove('pseudo');
  });
  var x0 = null, y0 = null;
  frame.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  frame.addEventListener('touchend', function (e) {
    if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { go(dx < 0 ? i + 1 : i - 1); frame.dataset.sw = '1'; setTimeout(function () { frame.dataset.sw = ''; }, 400); }
    x0 = null;
  }, { passive: true });
  frame.addEventListener('click', function (e) { if (frame.dataset.sw) e.stopImmediatePropagation(); }, true);
  function fs() {
    var d = document;
    if (d.fullscreenElement || d.webkitFullscreenElement) { (d.exitFullscreen || d.webkitExitFullscreen).call(d); return; }
    if (stage.classList.contains('pseudo')) { stage.classList.remove('pseudo'); return; }
    var r = stage.requestFullscreen || stage.webkitRequestFullscreen;
    if (r) { var p = r.call(stage); if (p && p.catch) p.catch(function () { stage.classList.add('pseudo'); }); }
    else stage.classList.add('pseudo');
  }
  document.getElementById('fs').onclick = fs; document.getElementById('xfs').onclick = fs;
  var h = parseInt(location.hash.slice(1), 10);
  i = 0; go(h >= 1 && h <= N ? h : 1, true);
})();

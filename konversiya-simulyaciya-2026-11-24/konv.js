/* konv layer: ?r=0..3 кумулятивно включает правки круга; прод не затронут */
(function(){
 var m=location.search.match(/[?&]r=(\d)/); var R=m?+m[1]:0; var H=document.documentElement;
 for(var i=1;i<=R;i++)H.classList.add('konv-r'+i);
 if(R<1)return;
 var page=location.pathname.replace(/^.*?(home|korporativ|programs)\//,'$1/');
 function ready(f){document.readyState!=='loading'?f():document.addEventListener('DOMContentLoaded',f)}
 /* R1.1 маска телефона: ведущая 7/8 после подставленного «+7 (» не становится цифрой номера */
 document.addEventListener('input',function(e){
  var t=(e.composedPath&&e.composedPath()[0])||e.target; if(!t||t.type!=='tel')return;
  var d=(t.value||'').replace(/\D/g,'');
  if(d.length>=2&&d[0]==='7'&&(d[1]==='7'||d[1]==='8')&&d.slice(1,4)!=='800'){
   t.value='+7 ('+d.slice(2); /* прежний обработчик отформатирует заново */
  }
 },true);
 /* R1.4 «Подобрать программу» ведёт к подборке (#catalog), а не открывает квиз; слушатель на window в фазе захвата идёт раньше обработчиков сайта */
 window.addEventListener('click',function(e){
  var hb=e.target.closest&&e.target.closest('.hero-actions button'); var cat=document.getElementById('catalog');
  if(hb&&cat&&/Подобрать/.test(hb.textContent)){e.preventDefault();e.stopImmediatePropagation();cat.scrollIntoView({behavior:'smooth',block:'start'})}
 },true);
 ready(function(){
  /* R1.2 липкая панель: Max, Telegram, звонок */
  var tg=document.querySelector('a[href*="telegram.me"],a[href*="t.me/"]'), mx=document.querySelector('a[href*="max.ru"]');
  var bar=document.createElement('div'); bar.className='konv-bar';
  bar.innerHTML='<a href="'+(mx?mx.href:'https://max.ru/u/f9LHodD0cOKJGPNk8tLsr7rNfEOQc77ksLyB_spYPyO')+'" target="_blank" rel="noopener">Написать в Max</a>'+
   '<a href="'+(tg?tg.href:'https://telegram.me/irek_stn')+'" target="_blank" rel="noopener">Написать в Telegram</a>'+
   '<a class="konv-tel" href="tel:+79911501001">Позвонить</a>';
  document.body.appendChild(bar);
  /* R1.3 строка цены и минимума на первом экране */
  var txt={ 'home/':'Программы от <b>3 200 ₽</b> за участника · заказ от <b>249 000 ₽</b> · группы от 50 человек',
    'korporativ/':'Корпоративы от <b>9 500 ₽</b> за гостя · бюджет от <b>1 000 000 ₽</b>'}[page]||
    'Программы Каталиста от <b>3 200 ₽</b> за участника · заказ от <b>249 000 ₽</b> · группы от 50 человек';
  var anchor=document.querySelector('.hero-actions')||document.querySelector('h1');
  var line=document.createElement('p'); line.className='konv-price'; line.innerHTML=txt;

  if(R>=2){line.innerHTML+=' · свяжемся в течение 10 минут';var cal=[].slice.call(document.querySelectorAll('h2,h3,div,p,span')).filter(function(e){return e.children.length<4&&e.textContent.length<200&&/Ориентировочная стоимость|Ориентир для|Калькулятор/.test(e.textContent)})[0];
   if(cal&&page.indexOf('programs/')===0){cal.id=cal.id||'konv-calc';line.innerHTML+=' <a href="#'+cal.id+'">Калькулятор стоимости</a>'}}
  if(anchor)anchor.insertAdjacentElement(anchor.matches('h1')?'afterend':'beforebegin',line);
 });
 /* R2: блок «Документы и оплата», почта, подсказки в квизе */
 if(R>=2){ready(function(){
  var d=document.createElement('section'); d.className='konv-docs';
  d.innerHTML='<h3>Документы и оплата</h3><div><b>Договор</b>Работаем по договору с юридическими лицами и ИП</div><div><b>Оплата</b>Безналичная, на расчётный счёт</div><div><b>Закрывающие</b>После мероприятия передаём полный пакет актов и счетов для бухгалтерии</div><a href="mailto:info@catalystrussia.ru?subject=%D0%9A%D0%9F%20%D0%BD%D0%B0%20%D0%BF%D0%BE%D1%87%D1%82%D1%83">Запросить КП на почту: info@catalystrussia.ru</a>';
  var pl=document.querySelector('.konv-price'), hero=document.querySelector('section.hero');
  if(page.indexOf('programs/')===0){ if(pl)pl.insertAdjacentElement('afterend',d) } else if(hero){hero.insertAdjacentElement('afterend',d)} else if(pl){pl.insertAdjacentElement('afterend',d)}
  function roots(){var r=[document];['catalyst-site-navigation','catalyst-site-footer'].forEach(function(id){var h=document.getElementById(id);if(h&&h.shadowRoot)r.push(h.shadowRoot)});return r}
  var HS='margin:10px 0 0;padding:10px 12px;border-radius:10px;background:#f1f9f4;font:500 14px/1.4 TTCommonsPro,Roboto,Arial,sans-serif;color:#111';
  function hints(){roots().forEach(function(rt){rt.querySelectorAll('.cf-cost-quiz').forEach(function(q){
    var t=q.textContent, h=null, mail=false;
    if(/Сколько человек будет/.test(t)) h='Программы рассчитаны на группы от 50 человек. Минимальный заказ на тимбилдинг: от 249 000 ₽.';
    else if(/Какой бюджет на мероприятие/.test(t)) h='Минимальный заказ: тимбилдинг от 249 000 ₽, корпоратив от 1 000 000 ₽.';
    else if(R>=3&&/Куда прислать расчёт/.test(t)){h='Удобнее по почте? Напишите на <a href="mailto:info@catalystrussia.ru?subject=%D0%9A%D0%9F%20%D0%BD%D0%B0%20%D0%BF%D0%BE%D1%87%D1%82%D1%83" style="color:#0aba59;font-weight:600">info@catalystrussia.ru</a>, пришлём КП и договор.';mail=true}
    if(!h)return; var title=q.querySelector('.cf-quiz-heading')||[].slice.call(q.querySelectorAll('h1,h2,h3,h4,p,div')).filter(function(e){return e.children.length===0&&/Сколько человек будет|Какой бюджет на мероприятие|Куда прислать расчёт/.test(e.textContent)})[0];
    if(!title||(title.nextElementSibling&&title.nextElementSibling.classList.contains('konv-hint')))return;
    var x=document.createElement('p');x.className='konv-hint';x.setAttribute('style',HS);if(mail)x.innerHTML=h;else x.textContent=h;title.insertAdjacentElement('afterend',x)})})}
  var obs=new MutationObserver(function(){obs.disconnect();try{hints()}finally{attach()}});
  function attach(){roots().forEach(function(rt){obs.observe(rt===document?document.body:rt,{childList:true,subtree:true,characterData:true})})}
  attach();
 })}

 /* R3: кнопки Max и Telegram рядом с ценой (виден канал без квиза, и на ноутбуке, и на страницах программ) */
 if(R>=3){ready(function(){
  var pl=document.querySelector('.konv-price'); if(!pl)return;
  var tg=document.querySelector('a[href*="telegram.me"],a[href*="t.me/"]'), mx=document.querySelector('a[href*="max.ru"]');
  var row=document.createElement('div'); row.className='konv-ch';
  row.innerHTML='<a href="'+(mx?mx.href:'https://max.ru/u/f9LHodD0cOKJGPNk8tLsr7rNfEOQc77ksLyB_spYPyO')+'" target="_blank" rel="noopener">Написать в Max</a><a href="'+(tg?tg.href:'https://telegram.me/irek_stn')+'" target="_blank" rel="noopener">Написать в Telegram</a>';
  pl.insertAdjacentElement('afterend',row);
 })}

})();

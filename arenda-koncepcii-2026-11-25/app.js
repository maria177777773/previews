(function(){
var C=document.body.dataset.c,D=window.PD,KEY='prokat-'+C,$=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
function money(v){return Math.round(v).toLocaleString('ru-RU').replace(/\s/g,' ')+' ₽'}
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{items:[],prog:false}}catch(e){return{items:[],prog:false}}}
function save(s){try{localStorage.setItem(KEY,JSON.stringify(s))}catch(e){}badge()}
function badge(){var s=load(),n=s.items.reduce(function(a,x){return a+x.q},0);$$('[data-cart-count]').forEach(function(e){e.textContent=n})}
function add(id,q,prog){var s=load(),f=s.items.filter(function(x){return x.id===id})[0];if(f)f.q+=q||1;else s.items.push({id:id,q:q||1});if(prog)s.prog=true;save(s)}
function toast(t){var e=document.createElement('div');e.className='toast';e.setAttribute('role','status');e.textContent=t;document.body.appendChild(e);setTimeout(function(){e.remove()},2200)}
function it(id){return D.items[id]||{n:id,p:null}}
function priceTxt(p,q){return p?money(p*(q||1)):'по запросу'}
badge();
$$('[data-add]').forEach(function(b){b.addEventListener('click',function(){var prog=b.hasAttribute('data-prog');add(b.dataset.add,1,prog);toast(prog?'Добавлено в заявку с программой: минус 10% на аренду':'Добавлено в заявку');
 if(prog){var x=it(b.dataset.add),c=$('[data-pc-calc]'),base=+($('[data-pc-price]')||{dataset:{}}).dataset.base||x.p;if(c&&base)c.textContent='С программой: '+money(base)+' минус 10% = '+money(base*0.9)+' за аренду'}})});
/* праздники и отсчёт */
function easter(y){var a=y%4,b=y%7,c=y%19,d=(19*c+15)%30,e=(2*a+4*b-d+34)%7,m=Math.floor((d+e+114)/31),dd=(d+e+114)%31+1;var t=new Date(y,m-1,dd);t.setDate(t.getDate()+13);return t}
function hdate(h,y){if(h.d==='masl'){var e=easter(y);e.setDate(e.getDate()-55);return e}if(!h.d)return null;return new Date(y,h.d[0]-1,h.d[1])}
function next(h,now){var y=now.getFullYear(),t=hdate(h,y);if(!t)return null;if(h.d==='masl'){var end=new Date(t);end.setDate(end.getDate()+7);if(now<end)return t<now?now:t}if(t<new Date(now.getFullYear(),now.getMonth(),now.getDate()))t=hdate(h,y+1);return t}
function plural(n,a,b,c){n=Math.abs(n)%100;var m=n%10;return n>10&&n<20?c:m>1&&m<5?b:m===1?a:c}
var HJ=$('#hol');if(HJ){var H=JSON.parse(HJ.textContent),now=new Date(),best=null;
 H.forEach(function(h){var t=next(h,now);if(!t)return;var days=Math.ceil((t-now)/864e5);if(!best||t<best.t)best={h:h,t:t};
  $$('[data-hdays="'+h.k+'"]').forEach(function(e){e.textContent=days<=0?'идёт сейчас':'через '+days+' '+plural(days,'день','дня','дней')})});
 if(best){var cal=$('[data-hk="'+best.h.k+'"]');if(cal)cal.classList.add('is-next');var nm=$('[data-cd-name]');if(nm)nm.textContent='До праздника «'+best.h.n+'»';
  var tick=function(){var ms=Math.max(0,best.t-new Date()),d=Math.floor(ms/864e5),h=Math.floor(ms%864e5/36e5),m=Math.floor(ms%36e5/6e4),e;
   if(e=$('[data-cd-d]')){e.textContent=d;e.nextElementSibling.textContent=plural(d,'день','дня','дней')}
   if(e=$('[data-cd-h]')){e.textContent=('0'+h).slice(-2);e.nextElementSibling.textContent=plural(h,'час','часа','часов')}
   if(e=$('[data-cd-m]')){e.textContent=('0'+m).slice(-2);e.nextElementSibling.textContent=plural(m,'минута','минуты','минут')}};tick();setInterval(tick,30000)}}
/* конструктор набора: суммы только из D.sets и D.items */
function calc(rows,prog){var s=0,ask=0;rows.forEach(function(r){var x=it(r.id);if(r.id==='program')return;if(x.p)s+=x.p*r.q;else ask++});var disc=prog?Math.round(s*0.1):0;return{s:s,disc:disc,fin:s-disc,ask:ask}}
function sumHtml(c,prog){return '<p><span>Аренда</span><b>'+money(c.s)+'</b></p>'+(prog?'<p><span>Скидка 10% за программу</span><b>минус '+money(c.disc)+'</b></p>':'')+'<p class="tot"><span>Итого от</span><span>'+money(c.fin)+'</span></p>'+(c.ask||prog?'<p class="note">'+(c.ask?'Ещё '+c.ask+' '+plural(c.ask,'позиция','позиции','позиций')+' по запросу. ':'')+(prog?'Программа по запросу. ':'')+'Цены партнёров на 07.2026.</p>':'')}
$$('[data-set-sum]').forEach(function(e){var k=e.dataset.setSum;e.textContent=money(calc(D.sets[k].map(function(r){return{id:r[1],q:r[2]}}),false).s)});
$$('[data-kit]').forEach(function(k){var g=new URLSearchParams(location.search).get('g')||k.dataset.g,off={},photos=k.querySelector('[data-photos]');
 function render(){$$('[data-guests]',k).forEach(function(b){b.setAttribute('aria-pressed',b.dataset.guests===g)});
  var rows=D.sets[g].map(function(r){return{t:r[0],id:r[1],q:r[2]}}),ul=$('[data-kit-rows]',k);
  ul.innerHTML=rows.map(function(r,i){var x=it(r.id),p=r.id==='program'?'минус 10% на аренду':priceTxt(x.p,r.q);return '<li class="kr"><label><input type="checkbox" data-i="'+i+'"'+(off[g+i]?'':' checked')+'>'+(photos&&x.img?'<img src="../img/'+x.img+'" width="64" height="48" alt="" loading="lazy">':'')+'<span>'+r.t+(r.q>1?' × '+r.q:'')+'<br><small class="note">'+x.n+'</small></span></label><span class="kp'+(x.p?'':' ask')+'">'+p+'</span></li>'}).join('');
  var on=rows.filter(function(r,i){return!off[g+i]}),prog=on.some(function(r){return r.id==='program'});$('[data-kit-sum]',k).innerHTML=sumHtml(calc(on,prog),prog);
  $$('input',ul).forEach(function(c){c.addEventListener('change',function(){off[g+c.dataset.i]=!c.checked;render()})});
  var go=$('[data-kit-go]',k);go.onclick=function(){var s={items:[],prog:prog};on.forEach(function(r){if(r.id!=='program')s.items.push({id:r.id,q:r.q})});save(s)}}
 $$('[data-guests]',k).forEach(function(b){b.addEventListener('click',function(){g=b.dataset.guests;render()})});render()});
/* фильтры каталога */
var grid=$('[data-grid]');if(grid){var cards=$$('.card',grid),f='all',hf=new URLSearchParams(location.search).get('h')||'',sel=$('[data-hfilter]');if(sel)sel.value=hf;
 function apply(){var n=0;cards.forEach(function(c){var ok=(f==='all'||c.dataset.g===f)&&(!hf||(' '+c.dataset.h+' ').indexOf(' '+hf+' ')>-1);c.hidden=!ok;if(ok)n++});$('[data-found]').textContent='Показано позиций: '+n}
 $$('[data-filter]').forEach(function(b){b.addEventListener('click',function(){f=b.dataset.filter;$$('[data-filter]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});apply()})});
 if(sel)sel.addEventListener('change',function(){hf=sel.value;apply()});
 $('[data-sort]').addEventListener('change',function(e){var v=e.target.value,arr=cards.slice();if(v)arr.sort(function(a,b){var x=+a.dataset.price||1e9,y=+b.dataset.price||1e9;if(v==='down'){x=+a.dataset.price||-1;y=+b.dataset.price||-1;return y-x}return x-y});arr.forEach(function(c){grid.appendChild(c)})});apply()}
/* галерея и формат */
var gm=$('.gal-main');$$('[data-thumb]').forEach(function(t,i){t.setAttribute('aria-pressed',i===0);t.addEventListener('click',function(){gm.src=t.dataset.thumb;$$('[data-thumb]').forEach(function(x){x.setAttribute('aria-pressed',x===t)})})});
$$('[data-fmt]').forEach(function(r){r.addEventListener('change',function(){var p=$('[data-pc-price]');p.dataset.base=r.value;p.innerHTML='<span class="price">от '+money(+r.value)+'</span>'})});
/* маска телефона +7 (925) 123-45-67, 8925… и 7925… приводим к +7 */
function digits(v){v=v.trim();var d;if(/^\+7/.test(v))d=v.slice(2).replace(/\D/g,'');else{d=v.replace(/\D/g,'');if(d[0]==='8'||d[0]==='7')d=d.slice(1)}return d.slice(0,10)}
function fmt(d){var o='+7';if(d.length)o+=' ('+d.slice(0,3);if(d.length>=3)o+=')';if(d.length>3)o+=' '+d.slice(3,6);if(d.length>6)o+='-'+d.slice(6,8);if(d.length>8)o+='-'+d.slice(8,10);return o}
$$('[data-phone]').forEach(function(i){i.addEventListener('input',function(){var d=digits(i.value);i.value=d.length?fmt(d):''})});
/* заявка: состояния empty / filled / sent / error */
var zv=$('[data-zv]'),qs=new URLSearchParams(location.search);
function setState(s){if(!zv)return;['empty','filled','sent','error'].forEach(function(x){zv.classList.toggle('st-'+x,x===s)});$$('[data-st-link]').forEach(function(a){if(a.dataset.stLink===s)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});
 var f=$('[data-qform]',zv);if(f){f.classList.toggle('bad',s==='error');$('[data-err]',f).hidden=s!=='error';if(s==='error'){var p=$('[data-phone]',f);if(!p.value)p.value='+7 (925) 12';$('[name=name]',f).value=$('[name=name]',f).value||'Анна'}}}
function cartRender(){var s=load(),ul=$('[data-cart-list]');if(!ul)return;
 ul.innerHTML=s.items.map(function(r,i){var x=it(r.id);return '<li class="kr"><span>'+x.n+'</span><span class="qty"><button type="button" data-q="-1" data-i="'+i+'" aria-label="Меньше">−</button><b>'+r.q+'</b><button type="button" data-q="1" data-i="'+i+'" aria-label="Больше">+</button></span><span class="kp'+(x.p?'':' ask')+'">'+priceTxt(x.p,r.q)+'</span></li>'}).join('');
 var pc=$('[data-cart-prog]');pc.checked=!!s.prog;$('[data-cart-sum]').innerHTML=sumHtml(calc(s.items,s.prog),s.prog);
 $$('[data-q]',ul).forEach(function(b){b.addEventListener('click',function(){var s=load(),r=s.items[b.dataset.i];r.q+=+b.dataset.q;if(r.q<1)s.items.splice(b.dataset.i,1);save(s);if(!s.items.length){setState('empty')}cartRender()})})}
if(zv){var st=qs.get('state'),s0=load();
 if((st==='filled'||st==='error')&&!s0.items.length){s0={items:D.demo.map(function(r){return{id:r[0],q:r[1]}}),prog:true};save(s0)}
 if(!st)st=s0.items.length?'filled':'empty';setState(st);cartRender();
 $('[data-cart-prog]').addEventListener('change',function(e){var s=load();s.prog=e.target.checked;save(s);cartRender()});
 var via=qs.get('via'),vn=$('[data-via]');if(via&&vn){vn.hidden=false;vn.textContent='Оставьте телефон, и Ирек напишет вам в '+(via==='max'?'Max':'Telegram')+'.'}}
$$('[data-qform]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var p=$('[data-phone]',f),ok=digits(p.value).length===10;
 if(zv&&zv.contains(f)){var s=ok?'sent':'error';history.replaceState(null,'','?state='+s);setState(s);if(ok)window.scrollTo(0,0);return}
 f.classList.toggle('bad',!ok);$('[data-err]',f).hidden=ok;$('[data-ok]',f).hidden=!ok;if(ok)f.reset()})});
})();

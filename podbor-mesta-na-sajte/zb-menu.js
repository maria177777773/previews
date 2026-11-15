/* Полоса подбора тимбилдинга: «Нужен [тип] тимбилдинг [место] на [N] человек, бюджет до [сумма] ₽ всего» + кнопка «Подобрать».
   Кнопка ведёт на /timbilding/?mesto=..&lyudi=..&byudzhet=..&format=..
   Размер полей одинаков при любом выборе: ширину задаёт самое длинное значение (невидимые «призраки» .zb-g).
   На превью (window.ZB_PREVIEW) кнопка не уходит на сайт, а показывает собранную ссылку. */
(function(){
var R=document.getElementById('zb-m');
if(!R)return;
var PH=R.querySelector('#zb-phrase'),GO=R.querySelector('#zb-go');
var BOX=document.getElementById('zb-link-m');
var BASE=window.ZB_BASE||'https://catalystrussia.ru/timbilding/';
var PREVIEW=!!window.ZB_PREVIEW;
var ADJ=[{id:'any',label:'любой'},{id:'sport',label:'спортивный'},{id:'tvorch',label:'творческий'},{id:'biz',label:'бизнес-игра'},{id:'cook',label:'кулинарный'},{id:'neuro',label:'с нейросетями'},{id:'ny',label:'новогодний'},{id:'zima',label:'зимний'},{id:'leto',label:'летний'}];
var WH=[{id:'any',label:'в любом месте'},{id:'room',label:'в помещении'},{id:'street',label:'на улице'},{id:'trip',label:'на выезде'}];
function money(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,' ')}
var PEOPLE_L=[20,30,50,100,150,200,300,500,1000].map(function(v){return {id:String(v),label:String(v)}}).concat([{id:'custom',label:'Свой вариант'}]);
var BUDGET_L=[150000,200000,300000,500000,700000,1000000,2000000].map(function(v){return {id:String(v),label:money(v)}}).concat([{id:'any',label:'не важно'},{id:'custom',label:'Свой вариант'}]);
var DIG={p:'0123456789'.split('').map(function(d){return d+d+d+d}),b:'0123456789'.split('').map(function(d){return d+' '+d+d+d+' '+d+d+d})};
var ARIA={topic:'Какой тимбилдинг',place:'Где',people:'Сколько человек',budget:'Бюджет'};
var st={topic:'any',place:'any',people:100,budget:300000,pc:false,bc:false,bad:''};
var shown=false;
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function lab(l,id){var o=l.filter(function(x){return x.id===id})[0];return o?o.label:''}
function url(){
 return BASE+'?mesto='+encodeURIComponent(st.place)+'&lyudi='+st.people+'&byudzhet='+(st.budget==null?'any':st.budget)+'&format='+encodeURIComponent(st.topic)
}
function ghost(labels){
 return '<span class="zb-f zb-g" aria-hidden="true"><span class="zb-v"><span class="zb-gv">'+labels.map(function(l){return '<span>'+esc(l)+'</span>'}).join('')+'</span></span><span class="zb-ar"><i class="zb-ch"></i></span></span>'
}
function menu(q,list,curId){
 return '<ul class="zb-menu" role="listbox" aria-label="'+ARIA[q]+'" hidden>'+list.map(function(o){
  return '<li><button type="button" role="option" aria-selected="'+(o.id===curId)+'" data-q="'+q+'" data-v="'+o.id+'">'+esc(o.label)+'</button></li>'}).join('')+'</ul>'
}
function slot(q,list){
 var cur=list.filter(function(o){return o.id===st[q]})[0]||list[0];
 return '<span class="zb-slot" data-k="'+q+'"><button type="button" class="zb-f" data-slot="'+q+'" aria-haspopup="listbox" aria-expanded="false" aria-label="'+ARIA[q]+': '+esc(cur.label)+'"><span class="zb-v">'+esc(cur.label)+'</span><span class="zb-ar"><i class="zb-ch"></i></span></button>'+ghost(list.map(function(o){return o.label}))+menu(q,list,cur.id)+'</span>'
}
function numSlot(q){
 var isP=q==='people',list=isP?PEOPLE_L:BUDGET_L,cust=isP?st.pc:st.bc,val=st[q];
 var curId=cust?'custom':(val==null?'any':String(val));
 var cur=list.filter(function(o){return o.id===curId})[0]||list[0];
 var gh=ghost(list.filter(function(o){return o.id!=='custom'}).map(function(o){return o.label}).concat(DIG[isP?'p':'b']));
 if(cust){
  return '<span class="zb-slot zb-num" data-k="'+q+'"><span class="zb-f zb-cu"><input class="zb-v zb-inp" id="zb-in-'+q+'" type="text" inputmode="numeric" autocomplete="off" maxlength="'+(isP?4:9)+'" aria-label="'+(isP?'Число человек':'Бюджет, рублей')+'" value="'+(isP?val:money(val))+'"><button type="button" class="zb-ar" data-slot="'+q+'" aria-haspopup="listbox" aria-expanded="false" aria-label="Выбрать из списка"><i class="zb-ch"></i></button></span>'+gh+menu(q,list,curId)+'</span>'
 }
 return '<span class="zb-slot zb-num" data-k="'+q+'"><button type="button" class="zb-f" data-slot="'+q+'" aria-haspopup="listbox" aria-expanded="false" aria-label="'+ARIA[q]+': '+esc(cur.label)+'"><span class="zb-v">'+esc(cur.label)+'</span><span class="zb-ar"><i class="zb-ch"></i></span></button>'+gh+menu(q,list,curId)+'</span>'
}
function hid(t){return '<span class="zb-hid" aria-hidden="true">'+t+'</span>'}
function renderPhrase(){
 var any=st.budget==null;
 var l1='Нужен '+slot('topic',ADJ)+' тимбилдинг';
 var l2=slot('place',WH)+' на '+numSlot('people')+' человек,';
 var l3='бюджет '+(any?hid('до'):'до')+' '+numSlot('budget')+' '+(any?hid('₽&nbsp;всего'):'₽&nbsp;всего');
 PH.innerHTML='<span class="zb-ln">'+l1+'</span> <span class="zb-ln">'+l2+'</span> <span class="zb-ln">'+l3+'</span>';
 updateLink()
}
function updateLink(){
 var u=url();
 GO.setAttribute('href',u);
 GO.setAttribute('data-href',u);
 if(BOX&&shown)BOX.innerHTML='<b>Ссылка кнопки «Подобрать»:</b> <span class="zb-u">'+esc(u)+'</span>'
}
function closeAll(){
 R.querySelectorAll('.zb-menu').forEach(function(m){m.hidden=true});
 R.querySelectorAll('[data-slot]').forEach(function(b){b.setAttribute('aria-expanded','false')})
}
function openMenu(b){
 var m=b.closest('.zb-slot').querySelector('.zb-menu'),was=m.hidden;
 closeAll();
 if(!was)return;
 m.hidden=false;m.style.left='0px';
 b.setAttribute('aria-expanded','true');
 var r=m.getBoundingClientRect(),w=document.documentElement.clientWidth;
 if(r.right>w-8)m.style.left=(w-8-r.right)+'px';
 var sel=m.querySelector('[aria-selected="true"]')||m.querySelector('button');
 if(sel)try{sel.focus({preventScroll:true})}catch(e){}
}
function parseNum(s){var v=parseInt(String(s).replace(/\D/g,''),10);return isNaN(v)?null:v}
function pick(q,v){
 st.bad='';
 if(q==='people'||q==='budget'){
  var ck=q==='people'?'pc':'bc';
  if(v==='custom'){
   if(st[q]==null)st[q]=300000;
   st[ck]=true;renderPhrase();
   var inp=R.querySelector('#zb-in-'+q);if(inp){inp.focus();inp.select()}
   return
  }
  st[ck]=false;st[q]=v==='any'?null:+v
 }else st[q]=v;
 renderPhrase();
 var nb=R.querySelector('[data-slot="'+q+'"]');if(nb)nb.focus({preventScroll:true})
}
R.addEventListener('click',function(e){
 var o=e.target.closest('.zb-menu [data-q]');
 if(o){pick(o.getAttribute('data-q'),o.getAttribute('data-v'));return}
 var b=e.target.closest('[data-slot]');
 if(b){openMenu(b);return}
 if(e.target.closest('.zb-inp'))return;
 closeAll()
});
document.addEventListener('click',function(e){if(!R.contains(e.target))closeAll()});
R.addEventListener('input',function(e){
 var t=e.target;if(!t.classList.contains('zb-inp'))return;
 var q=t.id==='zb-in-people'?'people':'budget',max=q==='people'?9999:9999999,v=parseNum(t.value);
 var f=t.closest('.zb-f');
 if(v==null||v<1||v>max){st.bad=q;f.classList.add('zb-bad');t.setAttribute('aria-invalid','true');return}
 st.bad='';f.classList.remove('zb-bad');t.removeAttribute('aria-invalid');st[q]=v;updateLink()
});
R.addEventListener('change',function(e){
 var t=e.target;if(!t.classList.contains('zb-inp'))return;
 if(t.id==='zb-in-budget'&&!st.bad)t.value=money(st.budget);
 if(t.id==='zb-in-people'&&!st.bad)t.value=String(st.people)
});
R.addEventListener('keydown',function(e){
 var t=e.target;
 if(e.key==='Escape'){var sl=t.closest('.zb-slot');closeAll();if(sl){var b=sl.querySelector('[data-slot]');if(b)b.focus()}return}
 if(t.classList&&t.classList.contains('zb-inp')&&e.key==='Enter'){e.preventDefault();t.blur();return}
 if((e.key==='ArrowDown'||e.key==='ArrowUp')&&t.closest&&t.closest('.zb-menu')){
  e.preventDefault();
  var items=[].slice.call(t.closest('.zb-menu').querySelectorAll('button')),i=items.indexOf(t)+(e.key==='ArrowDown'?1:-1);
  if(items[i])items[i].focus()
 }
});
GO.addEventListener('click',function(e){
 if(st.bad){e.preventDefault();var inp=R.querySelector('#zb-in-'+st.bad);if(inp)inp.focus();return}
 if(PREVIEW){e.preventDefault();shown=true;updateLink()}
});
window.__zb={st:st,url:url,lists:{ADJ:ADJ,WH:WH,PEOPLE:PEOPLE_L,BUDGET:BUDGET_L},pick:pick};
renderPhrase()
})();

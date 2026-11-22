
const names=['Письмо в декабрь','Полночь','Билет на ёлку','Ёлочный шар','Фотополоса','Подарочная лента','Зимнее окно','Праздничная сцена'];
const descriptions = ['Снимок гостей внутри почтовой марки с зубчатым краем.', 'Золотой циферблат обрамляет фото на ночном синем фоне.', 'Штрихкод и отрывной корешок новогоднего билета.', 'Круглый снимок подвешен на ёлку как игрушка.', 'Два момента вечера на полосе фотоплёнки.', 'Снимок гостей перевязан алой лентой с бантом.', 'Фото видно сквозь арочное окно со снежинками.', 'Сцену обрамляют лампочки и бархатный занавес.'];
const sizes=['1080x607','300x600','960x300','240x400'];
let type='corp';
let hidden=new Set(JSON.parse(localStorage.getItem('newyear-hidden')||'[]'));
let selected=new Set(JSON.parse(localStorage.getItem('newyear-selected')||'[]'));
let tests=new Set();
const gallery=document.querySelector('#gallery'),nav=document.querySelector('.nav'),dialog=document.querySelector('dialog');
function save(){localStorage.setItem('newyear-hidden',JSON.stringify([...hidden]));
localStorage.setItem('newyear-selected',JSON.stringify([...selected]))}

function update(){const items=[...selected].sort((a,b)=>a-b);
document.querySelector('.selected-text').textContent=items.length?'Выбрано: '+items.join(', '):'Выбери концепции';
document.querySelector('.copy').disabled=!items.length;
document.querySelector('.restore').hidden=!hidden.size;
save()}

function image(n, s, cls) {
  const size = s.replace('x', ' × ');
  return `<div class="image-tile ${cls}"><div class="figure"><img loading="lazy" src="assets/${n}-${type}-${s}.webp" alt="${names[n-1]}. ${type === 'corp' ? 'Новогодний корпоратив под ключ в Москве' : 'Новогодний тимбилдинг, музыкальная программа «Оркестр» от 249 000 рублей'}. ${size}" onerror="this.hidden=true"><span class="missing">Изображение готовится</span><button aria-label="Открыть ${names[n-1]}, ${size} крупно" data-open="${n}|${s}"></button></div><div class="size">${size}</div></div>`;
}

function render(){
document.querySelector('.overview').innerHTML=names.map((name,i)=>hidden.has(i+1)?'':`<a class="overview-card" href="#v${i+1}"><img loading="lazy" src="assets/${i+1}-${type}-1080x607.webp" alt="" onerror="this.hidden=true"><span><b>${String(i+1).padStart(2,'0')}</b> ${name}</span></a>`).join('');
nav.innerHTML=names.map((_,i)=>!hidden.has(i+1)?`<a href="#v${i+1}" aria-label="Концепция ${i+1}">${i+1}</a>`:'').join('');
gallery.innerHTML=names.map((name,i)=>{let n=i+1;
if(hidden.has(n))return '';
return `<section class="section" id="v${n}"><div class="section-head"><div class="number">${String(n).padStart(2,'0')}</div><div class="title"><h2>${name}</h2><p>${descriptions[i]}</p></div><button class="select ${selected.has(n)?'chosen':''}" data-select="${n}" aria-pressed="${selected.has(n)}">${selected.has(n)?'✓ Выбрано':'Выбрать'}</button><button class="hide" data-hide="${n}" aria-label="Скрыть концепцию ${n}">×</button></div><div class="images">${image(n,sizes[0],'main')}${image(n,sizes[1],'tall')}${image(n,sizes[2],'wide')}</div><div class="test-row"><button class="test-toggle" data-test="${n}" aria-expanded="${tests.has(n)}">${tests.has(n)?'Скрыть тестовый размер':'Посмотреть тестовый размер 240 × 400'}</button></div>${tests.has(n)?`<div class="test-box">${image(n,sizes[3],'test')}</div>`:''}</section>`}).join('')||'<div class="empty">Все концепции скрыты. Их можно вернуть кнопкой вверху.</div>';
update();
observe()}

function observe(){if(window.observer)window.observer.disconnect();
window.observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('.nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id))}}),{rootMargin:'-25% 0px -65% 0px'});
document.querySelectorAll('.section').forEach(s=>observer.observe(s))}document.querySelector('.switch').onclick=e=>{let b=e.target.closest('[data-type]');
if(!b)return;
type=b.dataset.type;
document.querySelectorAll('[data-type]').forEach(x=>{x.classList.toggle('active',x===b);
x.setAttribute('aria-pressed',x===b)});
render()};
gallery.onclick=e=>{let b=e.target.closest('button');
if(!b)return;
if(b.dataset.select){let n=+b.dataset.select;
selected.has(n)?selected.delete(n):selected.add(n);
render()}if(b.dataset.hide){let n=+b.dataset.hide;
hidden.add(n);
selected.delete(n);
render()}if(b.dataset.test){let n=+b.dataset.test;
tests.has(n)?tests.delete(n):tests.add(n);
render()}if(b.dataset.open){let [n,s]=b.dataset.open.split('|'),img=b.parentElement.querySelector('img');
if(img.hidden)return;
document.querySelector('#dialog-title').textContent=`${n}. ${names[n-1]} · ${s.replace('x',' × ')}`;
let d=dialog.querySelector('img');
d.src=img.src;
d.alt=img.alt;
dialog.showModal()}};
document.querySelector('.restore').onclick=()=>{hidden.clear();
render()};
dialog.querySelector('button').onclick=()=>dialog.close();
dialog.onclick=e=>{if(e.target===dialog)dialog.close()};
document.querySelector('.copy').onclick=async()=>{let a=[...selected].sort((a,b)=>a-b);
let text='Беру '+(a.length>1?a.slice(0,-1).join(', ')+' и '+a.at(-1):a[0]);
try{await navigator.clipboard.writeText(text)}catch{let t=document.createElement('textarea');
t.value=text;
document.body.append(t);
t.select();
document.execCommand('copy');
t.remove()}let toast=document.querySelector('.toast');
toast.hidden=false;
setTimeout(()=>toast.hidden=true,2200)};
render();


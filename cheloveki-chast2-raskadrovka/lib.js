/* Раскадровка части 2: помощники рисования кадров (статичный SVG 1600x900, стиль С4 «Ночной пульт») */
const C={mal:'#D1105A',fux:'#FF2E93',pink:'#FFC2E0',wht:'#FFFFFF',gry:'#8a8094'};
let uid=0;
const rng=seed=>()=>{seed|=0;seed=seed+0x6D2B79F5|0;let r=Math.imul(seed^seed>>>15,1|seed);r=r+Math.imul(r^r>>>7,61|r)^r;return((r^r>>>14)>>>0)/4294967296};
const lerp=(a,b,t)=>a+(b-a)*t;
const R=n=>Math.round(n*10)/10;
/* свечение-пятно: gp фуксия, gw светло-розовое, gg серое */
const G=(x,y,r,k='gp',o=1)=>`<circle cx="${R(x)}" cy="${R(y)}" r="${R(r)}" fill="url(#${k})" opacity="${o}"/>`;
const spark=(x,y,r,k='gp',o=1)=>G(x,y,r,k,o)+G(x,y-r*.75,r*.6,k,o);
/* текст: по умолчанию Unbounded 900, b: Golos Text 700; max: вписать по ширине */
const T=(s,x,y,z,o={})=>`<text x="${R(x)}" y="${R(y)}" font-size="${z}" class="${o.b?'tb':'th'}" fill="${o.c||C.wht}" text-anchor="${o.a||'start'}" dominant-baseline="central"${o.max?` data-max="${o.max}"`:''}${o.g?' filter="url(#tg)"':''}${o.o?` opacity="${o.o}"`:''}${o.x||''}>${s}</text>`;
/* заголовок в две строки: белая и фуксия */
const TT=(ls,x,y,z,max=700,a='start')=>ls.map((l,i)=>T(l,x,y+i*z*1.16,z,{c:i?C.fux:C.wht,max,g:1,a})).join('');
const glass=(x,y,w,h,r=22,hot=0,o=1)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#${hot?'glh':'gl'})" stroke="url(#gs)" stroke-width="2.5" opacity="${o}"/>`;
const dark=(x,y,w,h,r=22,o=.8)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="rgba(11,6,16,${o})"/>`;
const manD=(x,y,s)=>`M${R(x-30*s)},${R(y)}V${R(y-12*s)}A${R(30*s)},${R(30*s)} 0 0 1 ${R(x+30*s)},${R(y-12*s)}V${R(y)}Z M${R(x+20*s)},${R(y-62*s)}A${R(20*s)},${R(20*s)} 0 1 0 ${R(x-20*s)},${R(y-62*s)}A${R(20*s)},${R(20*s)} 0 1 0 ${R(x+20*s)},${R(y-62*s)}Z`;
/* человечек: f = насколько налит светом (0..1); dead = погас */
function man(x,y,s,f=0,col=C.fux,o={}){const d=manD(x,y,s);
 if(o.dead)return `<path d="${d}" fill="rgba(138,128,148,.28)" stroke="${C.gry}" stroke-width="2.5" stroke-dasharray="7 7"/>`;
 let r='';
 if(f>=1)r+=G(x,y-36*s,74*s,col===C.fux||col===C.mal?'gp':'gw',.9)+`<path d="${d}" fill="${col}"/>`;
 else if(f>0){const id='c'+(uid++);r+=`<clipPath id="${id}"><rect x="${R(x-32*s)}" y="${R(y-82*s*f)}" width="${R(64*s)}" height="${R(82*s*f+2)}"/></clipPath><path d="${d}" fill="${col}" clip-path="url(#${id})"/>`}
 return r+`<path d="${d}" fill="none" stroke="${o.st||'rgba(255,194,224,.65)'}" stroke-width="2"${o.dash?' stroke-dasharray="6 6"':''}/>`}
/* Дед Мороз: человечек с шапкой и бородой. st: on, off, half */
function santa(x,y,s,st='on'){const off=st==='off',half=st==='half';const col=off?C.gry:C.fux,wh=off?'rgba(138,128,148,.5)':C.wht;
 let r=off?man(x,y,s,0,C.gry,{dead:1}):man(x,y,s,half?.5:1,C.fux);
 r+=`<path d="M${R(x-17*s)},${R(y-56*s)}Q${R(x)},${R(y-10*s)} ${R(x+17*s)},${R(y-56*s)}Q${R(x)},${R(y-44*s)} ${R(x-17*s)},${R(y-56*s)}Z" fill="${half?'rgba(255,255,255,.55)':wh}"/>`;
 r+=`<path d="M${R(x-21*s)},${R(y-72*s)}Q${R(x-6*s)},${R(y-116*s)} ${R(x+26*s)},${R(y-98*s)}L${R(x+21*s)},${R(y-72*s)}Z" fill="${off?'rgba(138,128,148,.35)':half?'rgba(255,46,147,.55)':col}" stroke="${off?C.gry:C.pink}" stroke-width="2"/>`;
 r+=`<rect x="${R(x-23*s)}" y="${R(y-78*s)}" width="${R(46*s)}" height="${R(10*s)}" rx="${R(5*s)}" fill="${wh}"/><circle cx="${R(x+27*s)}" cy="${R(y-98*s)}" r="${R(7*s)}" fill="${wh}"/>`;
 return r}
/* кот из части 1 */
function cat(x,y,s,col=C.fux,eye=C.wht){return `<g transform="translate(${x},${y}) scale(${s})"><path d="M24,-8Q62,-10 60,-52" fill="none" stroke="${col}" stroke-width="9" stroke-linecap="round"/><ellipse cx="0" cy="-28" rx="30" ry="30" fill="${col}"/><circle cx="0" cy="-70" r="23" fill="${col}"/><path d="M-22,-78L-19,-106L-3,-88ZM22,-78L19,-106L3,-88Z" fill="${col}"/><ellipse cx="-9" cy="-72" rx="4" ry="6" fill="${eye}"/><ellipse cx="9" cy="-72" rx="4" ry="6" fill="${eye}"/></g>`}
/* мешок, из которого выглядывает кот */
function sack(x,y,s,withCat=1){return `<g transform="translate(${x},${y}) scale(${s})">${withCat?`<g transform="translate(0,-118)"><circle cx="0" cy="-30" r="30" fill="${C.fux}"/><path d="M-28,-42L-24,-78L-5,-54ZM28,-42L24,-78L5,-54Z" fill="${C.fux}"/><ellipse cx="-11" cy="-32" rx="5" ry="8" fill="#fff"/><ellipse cx="11" cy="-32" rx="5" ry="8" fill="#fff"/></g>`:''}<path d="M-46,-130Q-120,-60 -92,0Q0,22 92,0Q120,-60 46,-130Q0,-112 -46,-130Z" fill="rgba(40,30,46,.95)" stroke="${C.gry}" stroke-width="4"/><path d="M-52,-134Q0,-112 52,-134" fill="none" stroke="${C.pink}" stroke-width="5" stroke-linecap="round"/><text x="0" y="-52" font-size="70" class="th" fill="${C.gry}" text-anchor="middle" dominant-baseline="central">?</text></g>`}
/* шар с логотипом (логотип только картинкой) */
function orb(x,y,r,rings=1){let s=G(x,y,r*2.8,'gp',.9);if(rings)for(let i=0;i<3;i++)s+=`<ellipse cx="${x}" cy="${y}" rx="${R(r*1.48+i*r*.22)}" ry="${R(r*.5+i*r*.12)}" transform="rotate(${[-18,24,62][i]} ${x} ${y})" fill="none" stroke="${i?'rgba(255,46,147,.55)':'rgba(255,194,224,.9)'}" stroke-width="3"/>`;
 return s+`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/><image href="logo-mark.webp" x="${R(x-r*.8)}" y="${R(y-r*.8*240/613)}" width="${R(r*1.6)}" height="${R(r*1.6*240/613)}"/>`}
function phone(cx,cy,w,h,inner,rot=-1.5){return `<g transform="translate(${cx},${cy}) rotate(${rot})">${G(0,0,h*.72,'gp',.75)}${dark(-w/2,-h/2,w,h,52,.86)}${glass(-w/2,-h/2,w,h,52)}<rect x="-46" y="${-h/2+14}" width="92" height="10" rx="5" fill="rgba(255,194,224,.35)"/>${inner}</g>`}
function btn(cx,cy,w,h,lines,z,o={}){const n=lines.length;return G(cx,cy,w*.62,'gp',o.dim?.25:.7)+`<rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" rx="${h/2}" fill="url(#bt)"${o.dim?' opacity=".55"':''}/>`+lines.map((l,i)=>T(l,cx,cy+(i-(n-1)/2)*z*1.3,z,{a:'middle',max:w-70})).join('')}
function chip(x,y,w,a,b,hot=0,z=32){return glass(x,y-38,w,76,22,hot)+T(a,x+26,y+1,z,{b:1,max:b?w-200:w-52})+(b?T(b,x+w-26,y+1,z,{a:'end',c:C.pink}):'')}
function bar(x,y,w,h,f){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h/2}" fill="rgba(255,255,255,.12)"/>`+(f>0?`<rect x="${x}" y="${y}" width="${R(Math.max(h,w*f))}" height="${h}" rx="${h/2}" fill="url(#br)"/>`+G(x+w*f,y+h/2,h*1.3,'gw'):'')}
function comet(x1,y1,x2,y2,lift,a=0,b=1,n=22){let s='';for(let i=0;i<=n;i++){const u=a+(b-a)*i/n,x=lerp(x1,x2,u),y=lerp(y1,y2,u)-Math.sin(u*Math.PI)*lift;s+=G(x,y,8+34*i/n,i===n?'gw':'gp',.35+.65*i/n)}return s}
function check(x,y,r){return G(x,y,r*2,'gp',.8)+`<circle cx="${x}" cy="${y}" r="${r}" fill="${C.fux}"/><path d="M${R(x-r*.42)},${R(y+r*.04)}L${R(x-r*.1)},${R(y+r*.36)}L${R(x+r*.46)},${R(y-r*.3)}" fill="none" stroke="#fff" stroke-width="${R(r*.2)}" stroke-linecap="round" stroke-linejoin="round"/>`}
const cursor=(x,y)=>`<circle cx="${x}" cy="${y}" r="30" fill="rgba(255,255,255,.25)" stroke="#fff" stroke-width="5"/>`;
const ripples=(x,y)=>[60,120,190].map((r,i)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="rgba(255,194,224,${.8-i*.25})" stroke-width="${5-i*1.5}"/>`).join('');
const dash=(d,col='rgba(255,194,224,.6)',w=2.5)=>`<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-dasharray="10 10" stroke-linecap="round"/>`;
/* фон: тёмная глубина, звёзды-искры, пол в перспективе. dim: «как было раньше», серо */
function bg(o={}){const r=rng(o.seed||2);let s=`<rect width="1600" height="900" fill="url(#${o.dim?'bgd':'bg'})"/>`;
 for(let i=0;i<(o.stars??60);i++)s+=G(r()*1600,r()*620,3+r()*7,o.dim?'gg':(r()>.5?'gp':'gw'),.8);
 let p='';for(let i=-14;i<=14;i++)p+=`M${800+i*2600},1100L${800+i*60},640`;for(let j=0;j<8;j++)p+=`M0,${R(640+260*Math.pow(j/7,2.1))}H1600`;
 return s+`<path d="${p}" stroke="${o.dim?'rgba(150,140,160,.16)':'rgba(255,46,147,.22)'}" stroke-width="1.5" fill="none"/>`}
const F=(inner,o)=>`<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" role="img">${bg(o)}${inner}</svg>`;

/* Общий движок подборки стилей: часы, пауза вне экрана, плавности, общая модель сцен */
(function(){
const U={};
U.W=1600;U.H=900;
U.T={tap:1.0,fly0:1.0,fly1:2.1,fill0:2.2,fill1:5.2,doneA:6.4,fun0:7.3,fun1:10.6,hero0:10.4,stamp:11.4,out:12.6,D:13};
U.C={mal:'#D1105A',fux:'#FF2E93',pink:'#FFC2E0',blk:'#111111',wht:'#FFFFFF',cream:'#FFF0F7'};
U.clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
U.lerp=(a,b,t)=>a+(b-a)*t;
U.p=(t,a,b)=>U.clamp((t-a)/(b-a));
const E=U.e={};
E.out3=x=>1-Math.pow(1-x,3);
E.in3=x=>x*x*x;
E.io3=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
E.out5=x=>1-Math.pow(1-x,5);
E.in5=x=>x*x*x*x*x;
E.io5=x=>x<.5?16*x*x*x*x*x:1-Math.pow(-2*x+2,5)/2;
E.back=x=>{const c=1.70158*1.4;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
E.inBack=x=>{const c=1.70158;return (c+1)*x*x*x-c*x*x};
E.elastic=x=>x<=0?0:x>=1?1:Math.pow(2,-9*x)*Math.sin((x*10-.75)*2.094)+1;
E.bounce=x=>{const n=7.5625,d=2.75;if(x<1/d)return n*x*x;if(x<2/d)return n*(x-=1.5/d)*x+.75;if(x<2.5/d)return n*(x-=2.25/d)*x+.9375;return n*(x-=2.625/d)*x+.984375};
/* удар: 0 → пик → затухание, для сквоша и тряски */
U.hit=(t,t0,len=.5)=>{const x=(t-t0)/len;return x<0||x>1?0:Math.exp(-5*x)*Math.cos(x*18)};
U.rng=seed=>()=>{seed|=0;seed=seed+0x6D2B79F5|0;let r=Math.imul(seed^seed>>>15,1|seed);r=r+Math.imul(r^r>>>7,61|r)^r;return((r^r>>>14)>>>0)/4294967296};
U.noise=(i,k=1)=>{const s=Math.sin(i*127.1+k*311.7)*43758.5453;return s-Math.floor(s)};

/* Команда: 6 промо-моделей и 4 аниматора. fill(k,t) = насколько наполнен человечек k */
U.team={n:10,promo:6,anim:4};
U.fill=(k,t)=>{const tt=U.p(t,U.T.fill0,U.T.fill1);const s=k/10*.82;return U.p(tt,s,s+.2)};
U.bar=t=>{let s=0;for(let k=0;k<10;k++)s+=E.out3(U.fill(k,t));return s/10};
U.cnt=(t,from,n)=>{let c=0;for(let k=from;k<from+n;k++)if(U.fill(k,t)>=.6)c++;return c};

/* Воронка: люди в нормированных координатах. x: -1..1 у горла, y: 0 верх воронки, 1 низ */
U.stY=[.3,.56,.82];
U.crowd=(n,seed=7)=>{const r=U.rng(seed),a=[];for(let i=0;i<n;i++){const f=r();a.push({i,sx:(r()*2-1),sy:-(.12+r()*.5),d:r()*.62,fate:f<.4?0:f<.72?1:f<.93?2:3,side:r()<.5?-1:1,v:.6+r()*.8,ph:r()*6.28,c:Math.floor(r()*4),cat:false})}
 a[Math.floor(n*.35)].cat=true;a[Math.floor(n*.35)].fate=1;a[Math.floor(n*.35)].d=.3;return a};
U.fw=y=>U.lerp(1,.13,U.clamp(y));            /* полуширина воронки на высоте y */
U.fpos=(p,t)=>{
 const tt=Math.max(0,(t-U.T.fun0)/(U.T.fun1-U.T.fun0)),l=(tt-p.d)/.36;
 const bob=Math.sin(t*5+p.ph)*.012;
 if(l<=0)return{x:p.sx*1.25,y:p.sy+bob,rot:Math.sin(t*3+p.ph)*.08,a:1,st:'wait',k:0};
 const stop=p.fate<3?U.stY[p.fate]:1.12;
 const tStop=.25+.55*(stop/1.12);
 if(l<tStop){const u=l/tStop;let x,y;
  if(u<.3){const q=E.in3(u/.3);x=U.lerp(p.sx*1.25,p.sx*.8,q);y=U.lerp(p.sy,0,q)}
  else{const q=(u-.3)/.7;y=stop*q;x=p.sx*.8*U.fw(y)+Math.sin(q*14+p.ph)*.03*U.fw(y)}
  return{x,y,rot:Math.sin(l*20+p.ph)*.3,a:1,st:'fall',k:0}}
 if(p.fate===3)return{x:0,y:1.12,rot:0,a:0,st:'pass',k:1};
 const k=(l-tStop)/.6,xs=p.sx*.8*U.fw(stop);
 return{x:xs+p.side*(U.fw(stop)+.1+p.v*1.5*k),y:stop-1.1*k*p.v+2.2*k*k,rot:p.side*k*9,a:U.clamp(1.6-k*1.6),st:'rej',k};
};
/* вспышка стадии s: когда через неё идёт основной поток */
U.stPulse=(s,t)=>{const tt=U.p(t,U.T.fun0,U.T.fun1);return U.clamp(1-Math.abs(tt-(.34+s*.2))/.16)};
U.stOn=(s,t)=>U.p(t,U.T.fun0+.5+s*.75,U.T.fun0+.9+s*.75);

/* canvas-помощники */
U.rr=(c,x,y,w,h,r)=>{r=Math.min(r,Math.abs(w)/2,Math.abs(h)/2);c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()};
U.font=(size,f='head')=>f==='head'?`900 ${size}px Unbounded, sans-serif`:f==='hand'?`800 ${size}px "Shantell Sans", sans-serif`:`${f==='bold'?700:600} ${size}px "Golos Text", sans-serif`;
U.txt=(c,s,x,y,size,o={})=>{c.save();c.font=U.font(size,o.f);c.textAlign=o.al||'center';c.textBaseline=o.base||'middle';
 if(o.ls&&'letterSpacing'in c)c.letterSpacing=o.ls+'px';
 if(o.stroke){c.lineWidth=o.lw||4;c.strokeStyle=o.stroke;c.lineJoin='round';c.strokeText(s,x,y)}
 if(o.col!==null){c.fillStyle=o.col||U.C.blk;c.fillText(s,x,y)}c.restore()};
/* буквы по одной с перекрытием: каждая вылетает снизу с пружиной */
U.kin=(c,s,x,y,size,pr,o={})=>{c.save();c.font=U.font(size,o.f);const w=c.measureText(s).width;let cx=o.al==='left'?x:x-w/2;
 c.textAlign='left';c.textBaseline='middle';c.fillStyle=o.col||U.C.blk;const n=s.length;
 for(let i=0;i<n;i++){const ch=s[i],cw=c.measureText(ch).width,q=U.clamp(pr*(1+n*.06)*1.0/(1)-i*.06,0,1),e=E.back(U.p(q,0,.6));
  if(q>0){c.save();c.translate(cx+cw/2,y+(1-e)*size*.9);c.rotate((1-e)*.35*(i%2?1:-1));c.globalAlpha*=U.clamp(q*6);c.fillText(ch,-cw/2,0);c.restore()}
  cx+=cw}c.restore()};
U.fit=(c,s,maxW,size,f)=>{c.save();c.font=U.font(size,f);const w=c.measureText(s).width;c.restore();return w>maxW?size*maxW/w:size};
/* кот: силуэт, сидит, хвост машет. x,y = низ */
U.cat=(c,x,y,s,col,t,eye)=>{c.save();c.translate(x,y);c.scale(s,s);c.fillStyle=col;c.strokeStyle=col;
 c.lineWidth=9;c.lineCap='round';c.beginPath();c.moveTo(24,-8);c.quadraticCurveTo(62,-10,58+Math.sin(t*4)*10,-52);c.stroke();
 c.beginPath();c.ellipse(0,-28,30,30,0,0,7);c.fill();c.beginPath();c.arc(0,-70,23,0,7);c.fill();
 c.beginPath();c.moveTo(-22,-78);c.lineTo(-19,-106);c.lineTo(-3,-88);c.moveTo(22,-78);c.lineTo(19,-106);c.lineTo(3,-88);c.fill();
 if(eye){c.fillStyle=eye;c.beginPath();c.ellipse(-9,-72,4,Math.sin(t*1.3)>.96?1:6,0,0,7);c.ellipse(9,-72,4,Math.sin(t*1.3)>.96?1:6,0,0,7);c.fill()}
 c.restore()};
/* заголовок в две строки: буквы влетают, уходит рывком влево */
U.title=(c,t,ls,x,y,size,tin,tout,o={})=>{if(t<tin||t>tout+.35)return;const ex=U.e.in5(U.p(t,tout,tout+.35));c.save();c.translate(-ex*1400,0);
 ls.forEach((l,i)=>U.kin(c,l,x,y+i*size*1.12,o.max?U.fit(c,l,o.max,size,o.f):size,U.p(t,tin+i*.14,tin+.55+i*.14),{al:'left',col:i?(o.col2||U.C.mal):(o.col1||U.C.blk),f:o.f}));c.restore()};
U.img=src=>{const i=new Image();i.src=src;return i};
U.logo=U.img('logo-mark.webp');
/* логотип картинкой, по ширине w, центр x,y */
U.drawLogo=(c,x,y,w)=>{const L=U.logo;if(!L.complete||!L.naturalWidth)return;const h=w*L.naturalHeight/L.naturalWidth;c.drawImage(L,x-w/2,y-h/2,w,h)};

/* сцена: canvas 1600x900, цикл D секунд, пауза вне экрана */
U.stage=(draw,o={})=>{
 const cv=document.createElement('canvas');document.body.appendChild(cv);const c=cv.getContext('2d');
 let s=1,vis=true,shown=!document.hidden,last=0,t=o.start||0,raf=0;
 const fit=()=>{const ww=innerWidth,wh=innerHeight,k=Math.min(ww/U.W,wh/U.H),dpr=Math.min(devicePixelRatio||1,1.5);
  cv.style.width=U.W*k+'px';cv.style.height=U.H*k+'px';cv.width=Math.round(U.W*k*dpr);cv.height=Math.round(U.H*k*dpr);s=k*dpr;if(!raf)frame(0,true)};
 const frame=(now,once)=>{if(!once){const dt=Math.min(.05,(now-last)/1000||0);last=now;t=(t+dt)%U.T.D}
  c.setTransform(s,0,0,s,0,0);c.globalAlpha=1;c.save();c.beginPath();c.rect(0,0,U.W,U.H);c.clip();
  try{draw(c,t)}catch(err){console.error('draw',err);vis=false}
  c.restore();if(!once)raf=vis&&shown?requestAnimationFrame(frame):0};
 const kick=()=>{if(vis&&shown&&!raf){last=performance.now();raf=requestAnimationFrame(frame)}};
 new IntersectionObserver(en=>{vis=en[0].isIntersecting;U.running=vis;kick()},{threshold:.05}).observe(cv);
 document.addEventListener('visibilitychange',()=>{shown=!document.hidden;kick()});
 addEventListener('resize',fit);fit();
 U.logo.decode&&U.logo.decode().catch(()=>{});
 (document.fonts&&document.fonts.load?Promise.all([document.fonts.load(U.font(40)),document.fonts.load(U.font(40,'body')),document.fonts.load(U.font(40,'bold')),document.fonts.load(U.font(40,'hand'))]):Promise.resolve()).catch(()=>{}).then(()=>{U.ready=true;kick()});
 U.seek=x=>{t=x;frame(0,true)};
 return cv};
window.U=U;
})();

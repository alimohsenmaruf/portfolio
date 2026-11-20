'use strict';
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const T=[[],[[3,2]],[[2,1]],[[3,1]],[[0,1]],[[0,3],[2,1]],[[0,2]],[[0,3]],[[0,3]],[[0,2]],[[0,1],[3,2]],[[0,1]],[[3,1]],[[2,1]],[[3,2]],[]];
const LV=[];for(let v=-3.4;v<=7;v+=.45)LV.push(v);
function Topo(host,cv,click){const ctx=cv.getContext('2d');let W,H,cell,cols,rows,f,mx=.5,my=.5,tx=.5,ty=.5,live=true,last=0,pk=[];
const size=()=>{const d=Math.min(devicePixelRatio||1,1.5);W=host.clientWidth;H=host.clientHeight;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);cell=W<820?18:15;cols=Math.ceil(W/cell)+2;rows=Math.ceil(H/cell)+2;f=new Float32Array(cols*rows)};
const E=(e,x,y,L,a,b,c,d)=>{const[v0,v1,ox,oy,sx,sy]=e===0?[a,b,0,0,1,0]:e===1?[b,c,1,0,0,1]:e===2?[d,c,0,1,1,0]:[a,d,0,0,0,1],t=(L-v0)/(v1-v0);return[(x+ox+sx*t)*cell,(y+oy+sy*t)*cell]};
const draw=t=>{ctx.clearRect(0,0,W,H);const s2=2*(Math.min(W,1200)*.13)**2;
for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const x=i*.11,y=j*.11,X=i*cell,Y=j*cell;let v=Math.sin(x*1.3+t)+Math.sin(y*1.7-t*.8)+Math.sin((x+y)*.9+t*.6)+Math.sin(Math.hypot(x-4,y-3)*1.6-t*.5)+3.2*Math.exp(-((X-mx*W)**2+(Y-my*H)**2)/s2);for(const p of pk)v+=p.a*Math.exp(-((X-p.x*W)**2+(Y-p.y*H)**2)/s2);f[j*cols+i]=v}
LV.forEach((L,k)=>{ctx.beginPath();for(let j=0;j<rows-1;j++)for(let i=0;i<cols-1;i++){const a=f[j*cols+i],b=f[j*cols+i+1],c=f[(j+1)*cols+i+1],d=f[(j+1)*cols+i],n=(a>L?8:0)+(b>L?4:0)+(c>L?2:0)+(d>L?1:0);for(const s of T[n]){const p=E(s[0],i,j,L,a,b,c,d),q=E(s[1],i,j,L,a,b,c,d);ctx.moveTo(p[0],p[1]);ctx.lineTo(q[0],q[1])}}
const g=k%4===0;ctx.strokeStyle=g?'rgba(244,182,61,.55)':'rgba(190,230,200,.22)';ctx.lineWidth=g?1.6:1;ctx.stroke()})};
const loop=ms=>{if(live&&ms-last>33){last=ms;mx+=(tx-mx)*.08;my+=(ty-my)*.08;pk.forEach(p=>p.a*=.994);pk=pk.filter(p=>p.a>.08);draw(ms/4000)}requestAnimationFrame(loop)};
size();addEventListener('resize',size);draw(1);
if(!reduce){requestAnimationFrame(loop);new IntersectionObserver(e=>live=e[0].isIntersecting).observe(host);
host.addEventListener('pointermove',e=>{const r=host.getBoundingClientRect();tx=(e.clientX-r.left)/r.width;ty=(e.clientY-r.top)/r.height;host.dispatchEvent(new CustomEvent('aim',{detail:[tx,ty]}))})}
if(click)host.addEventListener('click',e=>{if(e.target.closest('a,button'))return;const r=host.getBoundingClientRect();pk.push({x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height,a:5});if(reduce)draw(1)})}
const hero=document.querySelector('.hero');Topo(hero,document.getElementById('topo'));
hero.addEventListener('aim',e=>{const p=document.querySelector('.portrait').style;p.setProperty('--px',(e.detail[0]-.5)*-22+'px');p.setProperty('--py',(e.detail[1]-.5)*-10+'px')});
Topo(document.getElementById('contact'),document.getElementById('topo2'),true);
const para=document.getElementById('reveal');para.innerHTML=para.textContent.split(' ').map(w=>`<span class="w">${w}</span>`).join(' ');
const ws=[...para.querySelectorAll('.w')];
const rev=()=>{const r=para.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight*.85-r.top)/(r.height+innerHeight*.35)));ws.forEach((w,i)=>w.classList.toggle('on',reduce||i<p*ws.length))};
addEventListener('scroll',rev,{passive:true});rev();
const cp=document.getElementById('copy');cp.addEventListener('click',()=>{navigator.clipboard?.writeText('ali.mohsen.maruf@gmail.com').then(()=>{cp.textContent='Copied';setTimeout(()=>cp.textContent='Copy email',1800)})});
document.getElementById('up').addEventListener('click',()=>scrollTo({top:0,behavior:reduce?'auto':'smooth'}));
const ck=document.getElementById('clock'),tick=()=>ck.textContent=new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Dhaka',hour:'2-digit',minute:'2-digit'})+' local time';tick();setInterval(tick,30000);

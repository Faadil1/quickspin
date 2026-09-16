(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const d of r)if(d.type==="childList")for(const f of d.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&a(f)}).observe(document,{childList:!0,subtree:!0});function t(r){const d={};return r.integrity&&(d.integrity=r.integrity),r.referrerPolicy&&(d.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?d.credentials="include":r.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function a(r){if(r.ep)return;r.ep=!0;const d=t(r);fetch(r.href,d)}})();const jt=new Set(["completed","cancelled","failed","destroyed"]),Ut={idle:new Set(["waiting","destroyed"]),waiting:new Set(["playing","response-ready","completed","cancelled","failed","destroyed"]),playing:new Set(["response-ready","completed","cancelled","failed","destroyed"]),"response-ready":new Set(["completed","playing","cancelled","failed","destroyed"]),completed:new Set(["idle","destroyed"]),cancelled:new Set(["idle","destroyed"]),failed:new Set(["idle","destroyed"]),destroyed:new Set};class Yt{_status="idle";_progress=null;_emit;constructor(n){this._emit=n}get status(){return this._status}get progress(){return this._progress}get isTerminal(){return jt.has(this._status)}transition(n){if(this._status===n)return!0;const t=this._status,a=Ut[t];return!a||!a.has(n)?!1:(this._status=n,n==="idle"&&(this._progress=null),this._emit({type:"phase",data:{from:t,to:n}}),!0)}setProgress(n){n===void 0||Number.isNaN(n)?this._progress=null:this._progress=Math.max(0,Math.min(1,n)),this._emit({type:"progress",data:this._progress})}}const _t=String.raw`
:host {
  --qs-primary: #8b7cff;
  --qs-surface: #10111a;
  --qs-elevated: #181a27;
  --qs-game: #202334;
  --qs-text: #f8f9fc;
  --qs-muted: #a9b0c0;
  --qs-border: rgba(255, 255, 255, 0.1);
  --qs-success: #16a36a;
  --qs-radius: 16px;
  --qs-font: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
  --qs-monospace: "Geist Mono", "SFMono-Regular", ui-monospace, monospace;
}

.quickspin-root {
  font-family: var(--qs-font);
  color: var(--qs-text);
  background: var(--qs-surface);
  border: 1px solid var(--qs-border);
  border-radius: var(--qs-radius);
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
  font-size: 13px;
  line-height: 1.5;
}

.quickspin-collapsed {
  display: none;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
}

.quickspin-root.is-collapsed > :not(.quickspin-collapsed) { display: none; }
.quickspin-root.is-collapsed .quickspin-collapsed { display: flex; }
.quickspin-collapsed-text {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--qs-muted);
  font-size: 12px;
}
.quickspin-reopen { padding: 7px 11px !important; white-space: nowrap; }

.quickspin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--qs-border);
}

.quickspin-brand {
  display: flex;
  align-items: center;
  gap: 7px;
  font-weight: 700;
  font-size: 12.5px;
  color: var(--qs-muted);
}

.quickspin-dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: var(--qs-primary);
  box-shadow: 0 0 0 0 rgba(139, 124, 255, 0.5);
  animation: qs-pulse 1.6s infinite;
}

@keyframes qs-pulse {
  0% { box-shadow: 0 0 0 0 rgba(139, 124, 255, 0.45); }
  70% { box-shadow: 0 0 0 8px rgba(139, 124, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(139, 124, 255, 0); }
}

.quickspin-status {
  flex: 1;
  font-weight: 600;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.quickspin-elapsed {
  font-family: var(--qs-monospace);
  font-size: 12px;
  color: var(--qs-muted);
  font-variant-numeric: tabular-nums;
}

.quickspin-tools { display: flex; gap: 4px; }

.quickspin-btn {
  appearance: none;
  border: 1px solid transparent;
  background: transparent;
  color: var(--qs-muted);
  width: 28px;
  height: 28px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.quickspin-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--qs-text);
}

.quickspin-stage { position: relative; min-height: 220px; }
.quickspin-canvas {
  display: block;
  width: 100%;
  height: 220px;
  touch-action: manipulation;
}

.quickspin-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  text-align: center;
  background: color-mix(in srgb, var(--qs-surface) 88%, transparent);
  animation: qs-fade 180ms ease-out;
  overflow: auto;
}
.quickspin-overlay[hidden] { display: none; }
@keyframes qs-fade { from { opacity: 0; } to { opacity: 1; } }

.quickspin-waiting-label,
.quickspin-label {
  color: var(--qs-muted);
  font-size: 12.5px;
}

.quickspin-score-big {
  font-family: var(--qs-monospace);
  font-size: 40px;
  font-weight: 700;
  color: var(--qs-primary);
  line-height: 1.1;
}

.quickspin-notes {
  list-style: none;
  margin: 0;
  padding: 0;
  color: var(--qs-muted);
  font-size: 12px;
}

.quickspin-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 4px;
}

.quickspin-btn-primary,
.quickspin-btn-ghost {
  appearance: none;
  border: none;
  border-radius: 10px;
  padding: 9px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}
.quickspin-btn-primary { background: var(--qs-primary); color: #10111a; }
.quickspin-btn-ghost { background: rgba(255, 255, 255, 0.08); color: var(--qs-text); }

.quickspin-felt {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.quickspin-felt-btn {
  appearance: none;
  border: 1px solid var(--qs-border);
  background: var(--qs-elevated);
  color: var(--qs-text);
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
}
.quickspin-felt-btn:hover { border-color: var(--qs-primary); }

.quickspin-reduction,
.quickspin-extension {
  font-size: 13px;
  font-weight: 700;
}
.quickspin-reduction { color: var(--qs-success); }
.quickspin-extension { color: #ff9b70; }

.quickspin-receipt-title {
  font-family: var(--qs-monospace);
  font-size: 11px;
  letter-spacing: .12em;
  color: var(--qs-muted);
}

.quickspin-receipt {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  width: min(100%, 430px);
}

.quickspin-receipt-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 9px 8px;
  background: var(--qs-elevated);
  border: 1px solid var(--qs-border);
  border-radius: 10px;
}
.quickspin-receipt-cell span { color: var(--qs-muted); font-size: 10px; }
.quickspin-receipt-cell strong { font-family: var(--qs-monospace); font-size: 13px; }

.quickspin-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 9px 14px;
  border-top: 1px solid var(--qs-border);
  font-size: 11.5px;
  color: var(--qs-muted);
}

.quickspin-progress { height: 3px; background: var(--qs-border); }
.quickspin-progress-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--qs-primary), #ffe06a);
  transition: width 160ms linear;
}
.quickspin-progress-fill.indeterminate {
  width: 34% !important;
  animation: qs-slide 1.1s ease-in-out infinite;
}
@keyframes qs-slide { 0% { margin-left: -34%; } 100% { margin-left: 100%; } }

.quickspin-games {
  display: flex;
  gap: 6px;
  padding: 8px 14px 0;
}
.quickspin-gamebtn {
  appearance: none;
  border: 1px solid var(--qs-border);
  background: var(--qs-elevated);
  color: var(--qs-muted);
  font-size: 11.5px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 999px;
  cursor: pointer;
}
.quickspin-gamebtn[aria-pressed="true"] { color: var(--qs-primary); border-color: var(--qs-primary); }

.quickspin-canvas:focus-visible,
.quickspin-btn:focus-visible,
.quickspin-btn-primary:focus-visible,
.quickspin-btn-ghost:focus-visible,
.quickspin-felt-btn:focus-visible,
.quickspin-gamebtn:focus-visible {
  outline: 2px solid var(--qs-primary);
  outline-offset: 2px;
}

@media (max-width: 480px) {
  .quickspin-receipt { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .quickspin-footer { align-items: flex-start; flex-direction: column; }
}

@media (prefers-reduced-motion: reduce) {
  .quickspin-dot { animation: none; }
  .quickspin-progress-fill.indeterminate { animation: none; }
  .quickspin-overlay { animation: none; }
}
`,pe=40,_e=24,K=18,Bt=2400;function Qt(e){switch(e){case"retrieval":return 150;case"tool":return 200;case"artifact":return 250;case"warning":return 300}}function ft(e){e.signalActive=!1,e.signalKind=null,e.signalLabel=null}function ot(e,n){const t=n-44;return{speed:0,groundY:t,playerY:t-pe,vy:0,grounded:!0,obstacleX:e+40,obstacleW:30,obstacleH:52,distance:0,crashed:!1,ready:!0,signalX:e+24,signalY:t-84,signalKind:null,signalLabel:null,signalActive:!1,signalBonus:0,signalsCollected:0}}function Kt(e,n,t,a){if(e.crashed)return;const r=Math.max(0,Math.min(1,a??0));e.speed=220*(1+.9*r),e.distance+=e.speed*n,e.grounded||(e.vy+=Bt*n,e.playerY+=e.vy*n,e.playerY>=e.groundY-pe&&(e.playerY=e.groundY-pe,e.vy=0,e.grounded=!0)),e.obstacleX-=e.speed*n,e.obstacleX+e.obstacleW<0&&(e.obstacleX=t+40+(180+Math.random()*140),e.obstacleH=40+Math.random()*28),e.signalActive&&(e.signalX-=e.speed*.92*n,e.signalX+K<0&&ft(e))}function lt(e){e.crashed||e.grounded&&(e.grounded=!1,e.vy=-720)}function Xt(e){if(e.crashed)return!1;const n=8;return e.obstacleX<n+_e&&e.obstacleX+e.obstacleW>n&&e.playerY+pe-6>e.groundY-e.obstacleH&&e.playerY<e.groundY-2}function Vt(e,n,t){return e.crashed||e.signalActive?!1:(e.signalX=n+24,e.signalY=e.groundY-84,e.signalKind=t.kind,e.signalLabel=t.label,e.signalActive=!0,!0)}function zt(e){if(!e.signalActive||e.crashed||!e.signalKind)return!1;const n=8,t=e.playerY;return e.signalX<n+_e&&e.signalX+K>n&&e.signalY<t+pe&&e.signalY+K>t?(e.signalBonus+=Qt(e.signalKind),e.signalsCollected+=1,ft(e),!0):!1}function Jt(e,n){const t=Math.max(0,Math.floor(e.distance)+e.signalBonus),a=[];return e.signalsCollected>0&&a.push(`AI signals collected: ${e.signalsCollected}`),n==="ai-complete"&&a.push("AI finished — you beat the wait."),n==="player-failed"&&a.push("Crashed — the wait wins this round."),{score:t,label:`${t.toLocaleString()} m`,notes:a,reason:n}}function Zt(e){switch(e){case"retrieval":return"#72d8ff";case"tool":return"#b99cff";case"artifact":return"#60efb7";case"warning":return"#ffcf70";default:return"#ffffff"}}const gt={id:"runner",name:"Wait Runner",tagline:"Outrun the wait.",controls:"Space or tap to jump · collect live AI signals",create(e){let n=e.canvas.clientWidth||480,t=e.canvas.clientHeight||220,a=ot(n,t),r=!1,d=0,f=0;const l=[],u=e.canvas.getContext("2d"),p=()=>{const g=Math.min(window.devicePixelRatio||1,2);n=e.canvas.clientWidth||480,t=e.canvas.clientHeight||220;const y=Math.round(n*g),b=Math.round(t*g);(d!==y||f!==b||e.canvas.width!==y||e.canvas.height!==b)&&(d=y,f=b,e.canvas.width=y,e.canvas.height=b,u?.setTransform(g,0,0,g,0,0),a=ot(n,t))},I=()=>{if(a.signalActive)return;const g=l.shift();g&&Vt(a,n,g)},q=g=>{if(g.code!=="Space")return;const y=g.target;y&&(y.tagName==="INPUT"||y.tagName==="TEXTAREA"||y.isContentEditable)||y&&y!==e.root&&y!==e.canvas||(g.preventDefault(),lt(a))},P=g=>{g.preventDefault(),lt(a)},N=()=>{if(u&&(u.clearRect(0,0,n,t),u.strokeStyle="rgba(255,214,106,0.55)",u.lineWidth=2,u.beginPath(),u.moveTo(0,a.groundY),u.lineTo(n,a.groundY),u.stroke(),a.obstacleX+a.obstacleW>0&&a.obstacleX<n&&(u.fillStyle="rgba(255,120,120,0.85)",u.fillRect(a.obstacleX,a.groundY-a.obstacleH,a.obstacleW,a.obstacleH)),a.signalActive&&a.signalX<n&&(u.save(),u.translate(a.signalX+K/2,a.signalY+K/2),u.rotate(Math.PI/4),u.fillStyle=Zt(a.signalKind),u.fillRect(-K/2,-K/2,K,K),u.restore(),u.font="10px system-ui, sans-serif",u.fillStyle="rgba(255,255,255,0.78)",u.fillText((a.signalLabel??a.signalKind??"signal").slice(0,22),8,28)),u.fillStyle="rgba(255,214,106,0.95)",u.fillRect(8,a.playerY,_e,pe),u.font="10px system-ui, sans-serif",u.fillStyle="rgba(255,255,255,0.5)",u.fillText(`${a.distance.toFixed(0)} m · signals ${a.signalsCollected}`,8,12),e.phase)){const g=e.phase.slice(0,30),y=u.measureText(g).width;u.fillStyle="rgba(255,255,255,0.45)",u.fillText(g,Math.max(8,n-y-8),12)}};return{start(){r=!1,p(),e.root.tabIndex=0,e.canvas.tabIndex=0,e.root.addEventListener("keydown",q),e.canvas.addEventListener("pointerdown",P),e.canvas.setAttribute("aria-label",gt.name+": keep a character running by jumping over obstacles while the model thinks. Space or tap to jump. Live host execution signals appear as collectible diamonds."),I()},tick(g,y){r||(p(),Kt(a,Math.min(y,.05),n,e.intensity),zt(a),I(),Xt(a)&&(a.crashed=!0,e.finish("player-failed")),N())},signal(g){l.push(g),l.length>8&&l.shift(),I()},finish(g){return Jt(a,g)},pause(){r=!0},resume(){r=!1},destroy(){e.root.removeEventListener("keydown",q),e.canvas.removeEventListener("pointerdown",P)}}}};function en(e){switch(e){case"retrieval":return 150;case"tool":return 200;case"artifact":return 250;case"warning":return 300}}function tn(e){switch(e){case"retrieval":return"#72d8ff";case"tool":return"#b99cff";case"artifact":return"#60efb7";case"warning":return"#ffcf70";default:return"#60efb7"}}function ct(e,n){return{baseSpeed:60,fishX:e/2,fishY:n/2,vx:60,vy:40,caught:0,misses:0,combo:0,bestCombo:0,radius:9,active:!0,signalBonus:0,signalsCaught:0}}function nn(e,n,t,a,r){if(!e.active)return;const f=1+Math.max(0,Math.min(1,r??0))*1.5+Math.min(e.combo,8)*.05;e.fishX+=e.vx*f*n,e.fishY+=e.vy*f*n;const l=14;e.fishX<l&&(e.fishX=l,e.vx=Math.abs(e.vx)),e.fishX>t-l&&(e.fishX=t-l,e.vx=-Math.abs(e.vx)),e.fishY<l&&(e.fishY=l,e.vy=Math.abs(e.vy)),e.fishY>a-l&&(e.fishY=a-l,e.vy=-Math.abs(e.vy))}function an(e,n,t,a,r){const f=Math.hypot(n-e.fishX,t-e.fishY)<34&&e.active;if(f){e.caught+=1,e.combo+=1,e.bestCombo=Math.max(e.bestCombo,e.combo),e.fishX=28+Math.random()*Math.max(1,a-56),e.fishY=28+Math.random()*Math.max(1,r-56);const l=Math.random()*Math.PI*2;e.vx=Math.cos(l)*(70+Math.random()*90),e.vy=Math.sin(l)*(70+Math.random()*90)}else e.misses+=1,e.combo=0;return f}function sn(e,n){e.signalBonus+=en(n.kind),e.signalsCaught+=1}function rn(e,n){const t=e.caught+e.misses,a=t>0?e.caught/t:0,r=Math.max(0,Math.round(e.caught*1e3*(.4+a*.6)+e.bestCombo*50+e.signalBonus)),d=[];return e.caught>=3&&d.push(`Best combo: ${e.bestCombo}`),e.signalsCaught>0&&d.push(`AI signals caught: ${e.signalsCaught}`),n==="ai-complete"&&d.push("AI finished — you beat the wait."),{score:r,label:`${r.toLocaleString()} pts`,notes:d,reason:n}}const mt={id:"orbit",name:"Orbit Catch",tagline:"Catch the glow target. Multi-catch, combo-scored.",controls:"Tap/click or press Space/Enter · catch live AI signals",create(e){let n=e.canvas.clientWidth||480,t=e.canvas.clientHeight||220,a=ct(n,t),r=!1,d=0,f=0,l=null;const u=[],p=e.canvas.getContext("2d"),I=()=>{const b=Math.min(window.devicePixelRatio||1,2);n=e.canvas.clientWidth||480,t=e.canvas.clientHeight||220;const S=Math.round(n*b),L=Math.round(t*b);(d!==S||f!==L||e.canvas.width!==S||e.canvas.height!==L)&&(d=S,f=L,e.canvas.width=S,e.canvas.height=L,p?.setTransform(b,0,0,b,0,0),a=ct(n,t))},q=()=>{l||(l=u.shift()??null)},P=(b,S)=>{const L=an(a,b,S,n,t);return L&&l&&(sn(a,l),l=u.shift()??null),L},N=b=>{if(!a.active)return;b.preventDefault();const S=e.canvas.getBoundingClientRect();P(b.clientX-S.left,b.clientY-S.top)},g=b=>{!a.active||b.key!=="Enter"&&b.code!=="Space"||(b.preventDefault(),P(a.fishX,a.fishY))},y=()=>{if(!p)return;p.clearRect(0,0,n,t),p.save(),p.strokeStyle="rgba(24,26,39,0.4)",p.lineWidth=1;const b=30;for(let C=0;C<=n;C+=b)p.beginPath(),p.moveTo(C,0),p.lineTo(C,t),p.stroke();for(let C=0;C<=t;C+=b)p.beginPath(),p.moveTo(0,C),p.lineTo(n,C),p.stroke();p.restore();const S=tn(l?.kind??null),L=p.createRadialGradient(a.fishX,a.fishY,0,a.fishX,a.fishY,30);if(L.addColorStop(0,`${S}e6`),L.addColorStop(1,`${S}00`),p.fillStyle=L,p.beginPath(),p.arc(a.fishX,a.fishY,30,0,Math.PI*2),p.fill(),p.fillStyle=S,p.beginPath(),p.arc(a.fishX,a.fishY,a.radius,0,Math.PI*2),p.fill(),p.font="10px system-ui, sans-serif",p.fillStyle="rgba(255,255,255,0.55)",p.fillText(`caught ${a.caught} · signals ${a.signalsCaught} · combo ${a.combo} · accuracy ${a.caught>0||a.misses>0?Math.round(a.caught/Math.max(1,a.caught+a.misses)*100):0}%`,8,12),l&&(p.fillStyle="rgba(255,255,255,0.8)",p.fillText(`${l.kind}: ${l.label}`.slice(0,44),8,28)),e.phase){const C=e.phase.slice(0,30),j=p.measureText(C).width;p.fillStyle="rgba(255,255,255,0.45)",p.fillText(C,Math.max(8,n-j-8),t-10)}};return{start(){r=!1,I(),e.canvas.tabIndex=0,e.canvas.addEventListener("pointerdown",N),e.canvas.addEventListener("keydown",g),e.canvas.setAttribute("aria-label",mt.name+": catch the glow target while the model thinks. Tap or click the target, or press Space or Enter when the canvas is focused. Host execution signals are attached to live targets and score only when caught."),q()},tick(b,S){r||(I(),nn(a,Math.min(S,.05),n,t,e.intensity),y())},signal(b){l?(u.push(b),u.length>8&&u.shift()):l=b},finish(b){return rn(a,b)},pause(){r=!0},resume(){r=!1},destroy(){e.canvas.removeEventListener("pointerdown",N),e.canvas.removeEventListener("keydown",g)}}}},Be="quickspin:sessions:v1",Ue=1e3;function on(){return{phaseChanges:0,acceptedSignals:0,rejectedSignals:0,uniqueEvidenceRefs:0,interventions:0,acceptedInterventions:0,rejectedInterventions:0}}function xe(e){const n=new Set,t=on();for(const a of e)a.type==="phase"&&(t.phaseChanges+=1),a.type==="signal"&&(t.acceptedSignals+=1,a.signal?.evidenceRef&&n.add(a.signal.evidenceRef)),a.type==="signal-rejected"&&(t.rejectedSignals+=1),a.type==="intervention"&&(t.interventions+=1),a.type==="intervention-result"&&(a.interventionResult?.accepted?t.acceptedInterventions+=1:t.rejectedInterventions+=1,a.interventionResult?.evidenceRef&&n.add(a.interventionResult.evidenceRef));return t.uniqueEvidenceRefs=n.size,t}function ne(){try{const e=localStorage.getItem(Be);if(!e)return{version:1,records:[]};const n=JSON.parse(e);return Array.isArray(n.records)?{version:1,records:n.records.filter(a=>typeof a?.ts=="number").slice(-Ue)}:{version:1,records:[]}}catch{return{version:1,records:[]}}}function ht(e){try{localStorage.setItem(Be,JSON.stringify(e))}catch{}}function ln(e){let n=0;for(let t=e.length-1;t>=0&&e[t].completed;t--)n+=1;return n}function He(e){const n=ne(),t=e.gameId?un(e.gameId):0,a=e.completed&&!!e.gameId&&(e.score??0)>t,r=globalThis.crypto?.randomUUID?.()??Math.random().toString(36).slice(2),d=(e.trail??[]).map(u=>({...u})),f=e.evidenceCoverage??xe(d),l={id:r,gameId:e.gameId,score:e.completed?e.score:null,actualWaitMs:e.actualWaitMs,engagedPlayMs:e.engagedPlayMs,feltWaitMs:e.feltWaitMs??null,completed:e.completed,outcome:e.outcome??(e.completed?"completed":"unknown"),failureCode:e.failureCode??null,failureMessage:e.failureMessage??null,trail:d,evidenceCoverage:f,ts:Date.now()};return n.records.push(l),n.records.length>Ue&&(n.records=n.records.slice(-Ue)),ht(n),{id:r,isHighScore:a,dayStreak:yt(),sessionStreak:ln(n.records),record:{...l,trail:[...d],evidenceCoverage:{...f}}}}function cn(e,n){const t=ne(),a=t.records.find(r=>r.id===e);return!a||!a.completed||!Number.isFinite(n)||n<0?null:(a.feltWaitMs=n,ht(t),{...a})}function dn(e){const n=[...e.trail??[]];return{version:1,recordId:e.id,outcome:e.outcome??(e.completed?"completed":"unknown"),actualWaitMs:e.actualWaitMs,engagedPlayMs:e.engagedPlayMs,gameId:e.gameId,score:e.score,feltWaitMs:e.feltWaitMs??null,failureCode:e.failureCode??null,failureMessage:e.failureMessage??null,evidenceCoverage:e.evidenceCoverage??xe(n),trail:n,ts:e.ts}}function un(e){return ne().records.filter(t=>t.gameId===e&&t.completed&&typeof t.score=="number").reduce((t,a)=>a.score>t?a.score:t,0)}function Se(e){const t=ne().records.filter(a=>a.gameId===e&&a.completed&&typeof a.score=="number").sort((a,r)=>(r.score??0)-(a.score??0))[0];return t?`${t.score}`:null}function vt(){return ne().records.filter(n=>n.completed).reduce((n,t)=>n+Math.min(t.actualWaitMs,Math.max(0,t.engagedPlayMs)),0)}function bt(){return ne().records.length}function yt(){const e=ne(),n=new Set(e.records.filter(r=>r.completed).map(r=>new Date(r.ts).toDateString()));let t=0;const a=new Date(Date.now());for(;n.has(a.toDateString());)t++,a.setDate(a.getDate()-1);return t}function pn(){const n=ne().records.filter(r=>typeof r.feltWaitMs=="number"&&r.actualWaitMs>0);if(n.length===0)return{samples:0,avgRatio:0,avgDeltaMs:0};const t=n.reduce((r,d)=>r+(d.feltWaitMs??0)/d.actualWaitMs,0),a=n.reduce((r,d)=>r+((d.feltWaitMs??0)-d.actualWaitMs),0);return{samples:n.length,avgRatio:t/n.length,avgDeltaMs:a/n.length}}function fn(){try{localStorage.removeItem(Be)}catch{}}const Q={runner:gt,orbit:mt},gn=new Set(["retrieval","tool","artifact","warning"]);function mn(e){const n=e?.kind,t=typeof e?.label=="string"?e.label.trim():"",a=typeof e?.evidenceRef=="string"?e.evidenceRef.trim():"";return!gn.has(n)||!t||!a?null:{kind:n,label:t.slice(0,64),evidenceRef:a.slice(0,160)}}const dt={mode:"dark",primary:"#8b7cff",surface:"#10111a",elevated:"#181a27",game:"#202334",text:"#f8f9fc",muted:"#a9b0c0",border:"rgba(255,255,255,0.1)",success:"#16a36a",radius:"16px",font:'Inter, system-ui, -apple-system, "Segoe UI", sans-serif'},hn={mode:"light",primary:"#6658e8",surface:"#ffffff",elevated:"#f3f4f8",game:"#eef0f6",text:"#17181d",muted:"#68707f",border:"rgba(16,17,26,0.1)",success:"#16a36a",radius:"16px",font:'Inter, system-ui, -apple-system, "Segoe UI", sans-serif'};function vn(e){if(e instanceof HTMLElement)return e;if(typeof e=="string"){const n=document.querySelector(e);if(n instanceof HTMLElement)return n}throw new Error("QuickSpin: no target element found. Pass a selector or element.")}function Y(e){return`${Math.max(0,Math.round(e/1e3))}s`}function we(e){return Math.max(0,Math.min(1,e))}function ut(e={}){const n=vn(e.target),t=Math.max(0,e.delayMs??650);let a=Q[e.game??""]?e.game:"runner";const r=document.createElement("div");r.style.display="none";const d=r.attachShadow({mode:"open"}),f=document.createElement("style");f.textContent=_t,d.appendChild(f);const l=document.createElement("div");l.className="quickspin-root";const u=document.createElement("div");u.className="quickspin-collapsed";const p=document.createElement("span");p.className="quickspin-collapsed-text",p.textContent="QuickSpin · AI working";const I=document.createElement("button");I.className="quickspin-btn-primary quickspin-reopen",I.type="button",I.textContent="Resume play",u.appendChild(p),u.appendChild(I);const q=document.createElement("div");q.className="quickspin-header";const P=document.createElement("div");P.className="quickspin-brand";const N=document.createElement("span");N.className="quickspin-dot",P.appendChild(N),P.appendChild(document.createTextNode("QuickSpin"));const g=document.createElement("div");g.className="quickspin-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.textContent="Waiting for the model…";const y=document.createElement("div");y.className="quickspin-elapsed",y.textContent="0s";const b=document.createElement("div");b.className="quickspin-tools";const S=document.createElement("button");S.className="quickspin-btn",S.type="button",S.textContent="—",S.title="Collapse QuickSpin (game pauses)",S.setAttribute("aria-label","Collapse QuickSpin"),b.appendChild(S),q.appendChild(P),q.appendChild(g),q.appendChild(y),q.appendChild(b);const L=document.createElement("div");L.className="quickspin-games";const C=[];for(const s of Object.keys(Q)){const i=document.createElement("button");i.className="quickspin-gamebtn",i.type="button",i.textContent=Q[s].name,i.setAttribute("aria-pressed",a===s?"true":"false"),i.addEventListener("click",()=>Ct(s)),C.push(i),L.appendChild(i)}const j=document.createElement("div");j.className="quickspin-stage";const A=document.createElement("canvas");A.className="quickspin-canvas",A.width=480,A.height=220;const h=document.createElement("div");h.className="quickspin-overlay",h.hidden=!0,j.appendChild(A),j.appendChild(h);const _=document.createElement("div");_.className="quickspin-footer";const V=document.createElement("span");V.textContent=Q[a].controls;const le=document.createElement("span");le.textContent="",_.appendChild(V),_.appendChild(le);const ce=document.createElement("div");ce.className="quickspin-progress";const H=document.createElement("div");H.className="quickspin-progress-fill",ce.appendChild(H),l.appendChild(u),l.appendChild(q),l.appendChild(L),l.appendChild(j),l.appendChild(ce),l.appendChild(_),d.appendChild(l),n.appendChild(r),n.setAttribute("data-quickspin-active","true");let Ce=e.theme??dt;function qe(s){Ce=s;const c={...s.mode==="light"?hn:dt,...s};r.style.setProperty("--qs-primary",c.primary),r.style.setProperty("--qs-surface",c.surface),r.style.setProperty("--qs-elevated",c.elevated),r.style.setProperty("--qs-game",c.game),r.style.setProperty("--qs-text",c.text),r.style.setProperty("--qs-muted",c.muted),r.style.setProperty("--qs-border",c.border),r.style.setProperty("--qs-success",c.success),r.style.setProperty("--qs-radius",c.radius),r.style.setProperty("--qs-font",c.font)}qe(Ce);let w=null,k=!1,G=0,o=0,v=0,T=0,M=!1,R=!1,O=!1,z=!1,fe=null,D=null,Ie=-1,Me=0;const ae=[],$=[];let de=null,se="Waiting for the model…";const x=new Yt(W);let ge=null;function W(s){e.onEvent&&e.onEvent(s),ge&&ge(s)}function me(){return G>0?Math.max(0,performance.now()-G):0}function Le(s){de=dn(s),W({type:"capsule",data:de})}function Ae(){fe!=null&&(window.clearTimeout(fe),fe=null)}function J(){const s=O&&!M;r.style.display=s?"":"none",l.classList.toggle("is-collapsed",R)}function Te(){if(!k){p.textContent="QuickSpin · response ready";return}const s=Y(performance.now()-G),i=D??se;p.textContent=`QuickSpin · ${i} · ${s}`}function Xe(s){if(z)return;T=requestAnimationFrame(Xe);const i=v?(s-v)/1e3:0;v=s,k&&(y.textContent=Y(performance.now()-G),Te(),x.progress==null&&H.classList.add("indeterminate")),k&&w&&O&&!R&&!M&&!document.hidden&&w?(w.resume(),w.tick(s,i),o+=i*1e3):w&&w.pause()}function Ve(s){for(const i of C)i.setAttribute("aria-pressed",Q[s].name===i.textContent?"true":"false");V.textContent=Q[s].controls}function Ct(s){if(!Q[s])return;const i=w!=null;a=s,Ve(s);const c=w;w=null,c?.destroy(),k&&O&&(A.style.pointerEvents="",i&&(h.hidden=!0,Je())),Ot()}function ze(){return{canvas:A,root:l,get progress(){return x.progress},get intensity(){return x.progress==null?Me:we(x.progress)},get phase(){return D},finish(s){return qt(s)},elapsedMs(){return k?performance.now()-G:0}}}function qt(s){const i=w;if(!i)return{score:0,label:"—",notes:[],reason:s};const c=i.finish(s);return s==="player-failed"&&k&&Rt(c),c}function Je(){const s=w;w=null,s?.destroy();const i=Q[a].create(ze());if(w=i,i.start(),i.signal&&ae.length>0){const c=ae.splice(0,ae.length);for(const m of c)i.signal(m)}W({type:"game-start",data:{game:a,phase:D,intensity:ze().intensity}})}function Ze(){h.querySelector("button")?.focus()}function et(){Je(),h.hidden=!0,A.style.pointerEvents="",x.transition("playing")}function It(s){se=s??se,g.textContent=D??se,h.hidden=!1,h.innerHTML="",A.style.pointerEvents="none";const i=document.createElement("div");i.className="quickspin-waiting-label",i.textContent=D?`AI is working · ${D}`:"AI is working — play without leaving the response behind.";const c=document.createElement("div");c.className="quickspin-actions";const m=document.createElement("button");m.className="quickspin-btn-primary",m.type="button",m.textContent="Play while you wait",m.addEventListener("click",et);const E=document.createElement("button");E.className="quickspin-btn-ghost",E.type="button",E.textContent="Just wait",E.addEventListener("click",()=>{h.hidden=!0}),c.appendChild(m),c.appendChild(E),h.appendChild(i),h.appendChild(c)}function tt(){!k||z||(fe=null,O=!0,R=!1,J(),It(se))}function Mt(){h.hidden=!0,R=!1,O=!1,J()}function At(){if(!k)return;Ae(),k=!1;let s=null;w&&(s=w.finish("ai-complete")),x.transition("response-ready"),x.transition("completed");const i=performance.now()-G,c=He({gameId:w?a:null,score:s?.score??null,actualWaitMs:i,engagedPlayMs:o,feltWaitMs:null,completed:!0,outcome:"completed",trail:$,evidenceCoverage:xe($)}),m=i>0?we(o/i):0;W({type:"session-complete",data:{id:c.id,game:w?a:null,score:s?.score??null,actualWaitMs:i,engagedMs:o,engagedRatio:m,dayStreak:c.dayStreak,sessionStreak:c.sessionStreak}}),Le(c.record),Re(),We(),O?(Te(),Nt(s,i,o,c.id,c.isHighScore,c.dayStreak,c.sessionStreak)):(O=!1,J())}function Oe(){if(!k)return;Ae(),k=!1,x.transition("cancelled");const s=He({gameId:w?a:null,score:null,actualWaitMs:performance.now()-G,engagedPlayMs:o,feltWaitMs:null,completed:!1,outcome:"cancelled",trail:$,evidenceCoverage:xe($)});W({type:"cancel",data:{id:s.id,outcome:"cancelled",game:w?a:null}}),Le(s.record),Re(),O?Pt():J()}function Tt(s){if(!k)return;Ae(),k=!1,x.transition("failed");const i=s instanceof Error?s:new Error(String(s??"UNKNOWN_FAILURE")),c=He({gameId:w?a:null,score:null,actualWaitMs:performance.now()-G,engagedPlayMs:o,feltWaitMs:null,completed:!1,outcome:"failed",failureCode:"HOST_REQUEST_FAILED",failureMessage:i.message.slice(0,240),trail:$,evidenceCoverage:xe($)});W({type:"fail",data:{id:c.id,outcome:"failed",code:"HOST_REQUEST_FAILED",error:{name:i.name,message:i.message}}}),Le(c.record),Re(),O?Lt(i,c.id):J()}function Re(){const s=w;w=null,s?.destroy()}function Rt(s){h.hidden=!1,h.innerHTML="";const i=document.createElement("div");i.className="quickspin-label",i.textContent="Crash! The model is still working.";const c=document.createElement("div");c.className="quickspin-score-big",c.textContent=s.label;const m=document.createElement("div");m.className="quickspin-actions";const E=document.createElement("button");E.className="quickspin-btn-primary",E.type="button",E.textContent="Play again",E.addEventListener("click",et);const U=document.createElement("button");U.className="quickspin-btn-ghost",U.type="button",U.textContent="Keep waiting",U.addEventListener("click",()=>{h.hidden=!0}),m.appendChild(E),m.appendChild(U),h.appendChild(i),h.appendChild(c),h.appendChild(m),Ze()}function nt(s,i,c,m){h.hidden=!1,h.innerHTML="";const E=m==null||i<=0?null:m/i,U=m==null?null:m-i,Ne=i>0?we(c/i):0,ie=document.createElement("div");ie.className="quickspin-receipt-title",ie.textContent="WAIT RECEIPT";const re=document.createElement("div");re.className="quickspin-receipt";const he=[["Actual",Y(i)],["Played",Y(c)],["Engaged",`${Math.round(Ne*100)}%`],["Felt",m==null?"Skipped":Y(m)]];for(const[oe,Z]of he){const ee=document.createElement("div");ee.className="quickspin-receipt-cell";const ve=document.createElement("span");ve.textContent=oe;const be=document.createElement("strong");be.textContent=Z,ee.appendChild(ve),ee.appendChild(be),re.appendChild(ee)}if(h.appendChild(ie),h.appendChild(re),E!=null&&U!=null){const oe=document.createElement("div");oe.className=E<=1?"quickspin-reduction":"quickspin-extension";const Z=Math.round(Math.abs(1-E)*100);oe.textContent=E<.995?`This wait felt ${Z}% shorter.`:E>1.005?`This wait felt ${Z}% longer.`:"This wait felt about as long as it actually took.",h.appendChild(oe)}W({type:"receipt",data:{id:s,actualWaitMs:i,engagedPlayMs:c,engagement:Ne,feltWaitMs:m,ratio:E,deltaMs:U}});const F=document.createElement("button");F.className="quickspin-btn-primary",F.type="button",F.textContent="View response",F.addEventListener("click",Mt),h.appendChild(F),F.focus()}function Nt(s,i,c,m,E,U,Ne){h.hidden=!1,h.innerHTML="";const ie=document.createElement("div");ie.className="quickspin-label",ie.textContent="Response ready";const re=document.createElement("div");re.className="quickspin-score-big",re.textContent=s?s.label:"—";const he=document.createElement("ul");he.className="quickspin-notes";const F=[];s?.notes&&F.push(...s.notes),E&&F.push("New personal best"),F.push(`Streaks — days ${U} · sessions ${Ne}`);for(const B of F){const ue=document.createElement("li");ue.textContent=B,he.appendChild(ue)}h.appendChild(ie),h.appendChild(re),h.appendChild(he);const oe=B=>{const ue=cn(m,B),te=B/Math.max(1,i),Ft=B-i,rt=1-te;W({type:"perceived-wait",data:{id:m,felt:B,actual:i,ratio:te,deltaMs:Ft,change:rt,reduction:rt,persisted:!!ue}}),We(),nt(m,i,c,B)},Z=document.createElement("div");Z.className="quickspin-label",Z.textContent=`That took ${Y(i)}. How long did it feel?`;const ee=document.createElement("div");ee.className="quickspin-felt";const ve=Math.max(1e3,i*.6),be=i,it=Math.max(i+1e3,i*1.4),Gt=[[`Faster · ~${Y(ve)}`,ve],[`About the same · ~${Y(be)}`,be],[`Longer · ~${Y(it)}`,it]];for(const[B,ue]of Gt){const te=document.createElement("button");te.className="quickspin-felt-btn",te.type="button",te.textContent=B,te.addEventListener("click",()=>oe(ue)),ee.appendChild(te)}h.appendChild(Z),h.appendChild(ee);const ye=document.createElement("button");ye.className="quickspin-btn-ghost",ye.type="button",ye.textContent="Skip question · view receipt",ye.addEventListener("click",()=>nt(m,i,c,null));const $e=document.createElement("div");$e.className="quickspin-actions",$e.appendChild(ye),h.appendChild($e),Ze()}function Pt(){h.hidden=!1,h.innerHTML="";const s=document.createElement("div");s.className="quickspin-label",s.textContent="Wait cancelled.",h.appendChild(s)}function Lt(s,i){h.hidden=!1,h.innerHTML="";const c=document.createElement("div");c.className="quickspin-label",c.textContent="Request failed — no response fabricated.";const m=document.createElement("div");m.className="quickspin-notes",m.textContent=`${s.message} · evidence ${i.slice(0,8)}`,h.appendChild(c),h.appendChild(m)}function Ot(){le.textContent=Se(a)?`Best: ${Se(a)}`:""}function We(){le.textContent=`${bt()} sessions · ${Y(vt())} played during AI wait · `+(Se(a)?`Best: ${Se(a)}`:"No best yet")}const at=()=>{document.hidden||M||R?w?.pause():(w?.resume(),v=0)};document.addEventListener("visibilitychange",at);function Wt(){M=!0,J(),w?.pause()}function Dt(){M=!1,J(),R||w?.resume(),v=0}S.addEventListener("click",()=>{R=!0,l.classList.add("is-collapsed"),w?.pause(),Te()}),I.addEventListener("click",()=>{R=!1,l.classList.remove("is-collapsed"),w?.resume(),v=0}),T=requestAnimationFrame(Xe),We();function $t(){if(x.status==="destroyed")throw new Error("QuickSpin: controller is destroyed.");if((x.status==="completed"||x.status==="cancelled"||x.status==="failed")&&x.transition("idle"),x.status!=="idle")throw new Error(`QuickSpin: cannot start from ${x.status}.`);if(!x.transition("waiting"))throw new Error("QuickSpin: failed to enter waiting state.")}function st(s){if(z)throw new Error("QuickSpin: controller is destroyed.");$t(),k=!0,G=performance.now(),o=0,v=0,D=null,Ie=-1,Me=0,ae.length=0,$.length=0,R=!1,O=!1,H.style.width="0%",H.classList.remove("indeterminate"),y.textContent="0s";const i=s??{};se=i.status??"Waiting for the model…",g.textContent=se;const c=i.gameId??a;return Q[c]&&Ht(c),J(),W({type:"session-start",data:{game:a,delayMs:t}}),t===0?tt():fe=window.setTimeout(tt,t),De}function Ht(s){a=s,Ve(s)}const De={setPhase(s){if(!k)return;const i=s.trim();if(i){if(i!==D&&(D=i,Ie+=1,Me=we(.18+Math.max(0,Ie)*.22),$.push({type:"phase",atMs:me(),phase:i})),g.textContent=i,O&&!w&&!h.hidden){const c=h.querySelector(".quickspin-waiting-label");c&&(c.textContent=`AI is working · ${i}`)}Te(),W({type:"phase",data:{phase:i,index:Ie,intensity:x.progress==null?Me:x.progress,status:x.status}})}},setProgress(s){k&&(x.setProgress(s),s===void 0||Number.isNaN(s)?H.classList.add("indeterminate"):(H.classList.remove("indeterminate"),H.style.width=`${(we(s)*100).toFixed(1)}%`))},signal(s){if(!k)return!1;const i=mn(s);return i?($.push({type:"signal",atMs:me(),phase:D??void 0,signal:i}),w?.signal?w.signal(i):(ae.push(i),ae.length>8&&ae.shift()),W({type:"signal",data:{...i,phase:D,status:x.status}}),!0):($.push({type:"signal-rejected",atMs:me(),phase:D??void 0,reason:"INSUFFICIENT_EVIDENCE"}),W({type:"signal-rejected",data:{outcome:"UNKNOWN",reason:"INSUFFICIENT_EVIDENCE",phase:D,status:x.status}}),!1)},observe(s){if(!k)return!1;let i=!1,c=!0;const m=typeof s?.phase=="string"?s.phase.trim():"";return m&&(i=!0,De.setPhase(m)),s?.signal&&(i=!0,c=De.signal(s.signal)&&c),i&&c},async intervene(s){const i=globalThis.crypto?.randomUUID?.()??Math.random().toString(36).slice(2);if(!k)return{id:i,accepted:!1,reason:"SESSION_NOT_ACTIVE"};const c={kind:s.kind,label:typeof s.label=="string"?s.label.slice(0,96):void 0,payload:s.payload,id:i,atMs:me()};$.push({type:"intervention",atMs:c.atMs,intervention:{id:c.id,kind:c.kind,label:c.label,atMs:c.atMs}}),W({type:"intervention",data:c});let m;if(!e.onIntervention)m={id:i,accepted:!1,reason:"NO_HOST_HANDLER"};else try{const E=await e.onIntervention(c);m={id:i,accepted:!!E?.accepted,reason:typeof E?.reason=="string"?E.reason.slice(0,160):void 0,evidenceRef:typeof E?.evidenceRef=="string"&&E.evidenceRef.trim()?E.evidenceRef.trim().slice(0,160):void 0}}catch{m={id:i,accepted:!1,reason:"HOST_HANDLER_FAILED"}}return $.push({type:"intervention-result",atMs:me(),interventionResult:m}),W({type:"intervention-result",data:m}),m},complete(){At()},cancel(){Oe()},fail(s){Tt(s)}};return{start(s){return k&&Oe(),st(s)},async track(s,i){k&&Oe();const c=st(i);try{const m=await s;return c.complete(),m}catch(m){throw c.fail(m instanceof Error?m:new Error(String(m))),m}},setTheme(s){qe(s)},show(){Dt()},hide(){Wt()},destroy(){z||(Ae(),z=!0,k=!1,cancelAnimationFrame(T),document.removeEventListener("visibilitychange",at),Re(),x.transition("destroyed"),r.remove(),n.hasAttribute("data-quickspin-active")&&n.removeAttribute("data-quickspin-active"))},on(s){return ge=s,()=>{ge===s&&(ge=null)}},getLastCapsule(){return de?JSON.parse(JSON.stringify(de)):null},exportLastCapsule(){return de?JSON.stringify(de,null,2):null},get status(){return x.status}}}const wt=new Set(["completed","cancelled","failed","unknown"]),St=new Set(["phase","signal","signal-rejected","intervention","intervention-result"]),bn=new Set(["retrieval","tool","artifact","warning"]),yn=new Set(["cancel","retry","refine","custom"]);function X(e){return typeof e=="number"&&Number.isFinite(e)&&e>=0}function Et(e){if(!e||typeof e!="object")return!1;const n=e;return[n.phaseChanges,n.acceptedSignals,n.rejectedSignals,n.uniqueEvidenceRefs,n.interventions,n.acceptedInterventions,n.rejectedInterventions].every(t=>Number.isInteger(t)&&(t??-1)>=0)}function wn(e){if(!e||typeof e!="object")return!1;const n=e;return n.version!==1||typeof n.recordId!="string"||!wt.has(n.outcome)||!X(n.actualWaitMs)||!X(n.engagedPlayMs)||n.gameId!==null&&typeof n.gameId!="string"||n.score!==null&&typeof n.score!="number"||n.feltWaitMs!==null&&!X(n.feltWaitMs)||!Et(n.evidenceCoverage)||!Array.isArray(n.trail)||!X(n.ts)?!1:n.trail.every(t=>{if(!t||typeof t!="object")return!1;const a=t;return St.has(a.type)&&X(a.atMs)})}function Sn(e){if(!wn(e))throw new Error("QuickSpin: invalid Wait Capsule.");const n=e.trail.map(t=>{const a={type:t.type,atMs:t.atMs};return t.type==="signal"&&t.signal&&(a.signalKind=t.signal.kind),t.type==="intervention"&&t.intervention&&(a.interventionKind=t.intervention.kind),t.type==="intervention-result"&&t.interventionResult&&(a.accepted=t.interventionResult.accepted),a});return{version:1,privacy:"redacted",source:"wait-capsule",outcome:e.outcome,actualWaitMs:e.actualWaitMs,engagedPlayMs:e.engagedPlayMs,gameId:e.gameId,score:e.score,feltWaitMs:e.feltWaitMs,evidenceCoverage:{...e.evidenceCoverage},timeline:n}}function Qe(e){if(!e||typeof e!="object")return!1;const n=e;return n.version!==1||n.privacy!=="redacted"||n.source!=="wait-capsule"||!wt.has(n.outcome)||!X(n.actualWaitMs)||!X(n.engagedPlayMs)||n.gameId!==null&&typeof n.gameId!="string"||n.score!==null&&typeof n.score!="number"||n.feltWaitMs!==null&&!X(n.feltWaitMs)||!Et(n.evidenceCoverage)||!Array.isArray(n.timeline)?!1:n.timeline.every(t=>!(!t||typeof t!="object"||!St.has(t.type)||!X(t.atMs)||t.signalKind!==void 0&&!bn.has(t.signalKind)||t.interventionKind!==void 0&&!yn.has(t.interventionKind)||t.accepted!==void 0&&typeof t.accepted!="boolean"))}function En(e){let n="";for(const t of e)n+=String.fromCharCode(t);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function xn(e){const n=e.replace(/-/g,"+").replace(/_/g,"/"),t=n+"=".repeat((4-n.length%4)%4),a=atob(t);return Uint8Array.from(a,r=>r.charCodeAt(0))}function kn(e){if(!Qe(e))throw new Error("QuickSpin: invalid Wait Ghost.");return En(new TextEncoder().encode(JSON.stringify(e)))}function Cn(e){try{if(typeof e!="string"||e.length===0||e.length>32e3)return null;const n=new TextDecoder().decode(xn(e)),t=JSON.parse(n);return Qe(t)?t:null}catch{return null}}function qn(e,n=1){if(!Qe(e))throw new Error("QuickSpin: invalid Wait Ghost.");const t=Number.isFinite(n)?Math.min(20,Math.max(.1,n)):1,a=e.timeline.map((d,f)=>({event:{...d},index:f})).sort((d,f)=>d.event.atMs-f.event.atMs||d.index-f.index);let r=0;return a.map(({event:d,index:f})=>{const l=Math.max(0,d.atMs-r)/t;return r=d.atMs,{index:f,delayMs:l,event:d}})}function In(e,n){const t=e.feltWaitMs!==null&&n.feltWaitMs!==null?n.feltWaitMs-e.feltWaitMs:null,a=e.score!==null&&n.score!==null?n.score-e.score:null;return{actualWaitDeltaMs:n.actualWaitMs-e.actualWaitMs,engagedPlayDeltaMs:n.engagedPlayMs-e.engagedPlayMs,feltWaitDeltaMs:t,scoreDelta:a,acceptedSignalsDelta:n.evidenceCoverage.acceptedSignals-e.evidenceCoverage.acceptedSignals,rejectedSignalsDelta:n.evidenceCoverage.rejectedSignals-e.evidenceCoverage.rejectedSignals,uniqueEvidenceRefsDelta:n.evidenceCoverage.uniqueEvidenceRefs-e.evidenceCoverage.uniqueEvidenceRefs,outcomeChanged:e.outcome!==n.outcome,fromOutcome:e.outcome,toOutcome:n.outcome}}const ke=Math.PI*2,Ee=(e,n=0,t=1)=>Math.max(n,Math.min(t,e)),Ye=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,Mn=(e,n=4)=>String(e).padStart(n,"0"),xt="'Geist Mono', 'SF Mono', ui-monospace, monospace",Ke="Inter, system-ui, -apple-system, 'Segoe UI', sans-serif";function An(e,n){const{ctx:t,w:a,h:r}=e,d=a/2,f=r*.42,l=Math.min(64,a*.14);t.clearRect(0,0,a,r),t.textAlign="center",t.beginPath(),t.arc(d,f,l,0,ke),t.lineWidth=10,t.lineCap="round",t.strokeStyle="rgba(104,112,127,0.22)",t.stroke();const u=n/1500,p=-Math.PI/2+ke*u;t.beginPath(),t.arc(d,f,l,-Math.PI/2,p),t.lineWidth=10,t.strokeStyle="#6658e8",t.stroke(),t.beginPath(),t.arc(d,f,l,p-.6,p),t.lineWidth=4,t.strokeStyle="rgba(102,88,232,0.3)",t.stroke(),t.font=`600 12px ${Ke}`,t.fillStyle="rgba(104,112,127,0.9)",t.fillText("classic “thinking…” spinner",d,f+l+34)}function Tn(e,n){const{ctx:t,w:a,h:r}=e,d=r*.8,f=a*.12,l=a*.62,u=a*.84,p=Ye(Ee(n/700)),I=Ee((n-700)/500),q=Ye(Ee((n-1200)/800));t.clearRect(0,0,a,r),t.beginPath(),t.moveTo(0,d),t.lineTo(a,d),t.lineWidth=2,t.strokeStyle="rgba(23,24,29,0.16)",t.stroke();const P=30,N=46;t.fillStyle="#ffb547",t.beginPath(),t.roundRect(l-P/2,d-N,P,N,9),t.fill();const g=f+p*(l-f-34)+q*(u-l),y=d-Math.sin(I*Math.PI)*58;t.lineCap="round",t.lineWidth=4,t.strokeStyle="#6658e8";const b=Math.sin(n/90)*8;t.beginPath(),t.moveTo(g,y-8),t.lineTo(g-5+b,d-2),t.moveTo(g,y-8),t.lineTo(g+7-b,d-2),t.stroke(),t.fillStyle="#6658e8",t.beginPath(),t.roundRect(g-11,y-32,22,24,10),t.fill(),t.beginPath(),t.arc(g,y-36,6.5,0,ke),t.fill(),t.fillStyle="#16b8b0",t.beginPath(),t.roundRect(g+1,y-39,8,4.5,2),t.fill(),t.font=`700 15px ${xt}`,t.textAlign="left",t.fillStyle="#17181d",t.fillText(`SCORE ${Mn(Math.round(Ee(n/1500)*9876))}`,18,30),t.font=`600 12px ${Ke}`,t.textAlign="right",t.fillStyle="rgba(104,112,127,0.85)",t.fillText("…and a real score, streak, and best to protect",a-18,r-22)}function pt(e,n){const{ctx:t,w:a,h:r}=e,d=Ye(Ee(n/500)),f=a/2,l=r*.44;t.clearRect(0,0,a,r),t.textAlign="center",t.beginPath(),t.arc(f,l,18+d*70,0,ke),t.lineWidth=12,t.strokeStyle=`rgba(102,88,232,${.35*(1-d)})`,t.stroke(),t.beginPath(),t.arc(f,l,8+d*44,0,ke),t.lineWidth=6,t.strokeStyle=`rgba(22,184,176,${.5*(1-d)})`,t.stroke(),t.font=`800 30px ${Ke}`,t.fillStyle="#17181d",t.fillText("wait over —",f,l-16),t.fillText("and they played it.",f,l+24),t.font=`700 15px ${xt}`,t.fillStyle="#6658e8",t.fillText("SCORE 9876  ·  DAY STREAK 3",f,l+58)}function Rn(e){const n=e.getContext("2d");if(!n)return;const t=Math.min(window.devicePixelRatio||1,2),a=()=>{const g=e.getBoundingClientRect();e.width=Math.max(1,Math.round(g.width*t)),e.height=Math.max(1,Math.round(g.height*t))};a(),new ResizeObserver(a).observe(e);const d=()=>e.width/t,f=()=>e.height/t,l=()=>({ctx:n,w:d(),h:f()});if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){n.save(),n.scale(t,t),pt(l(),60),n.restore();return}const u=2600,p=2400,q=u+p+2200,P=performance.now(),N=g=>{const y=(g-P)%q;n.save(),n.scale(t,t),y<u?An(l(),y):y<u+p?Tn(l(),y-u):pt(l(),y-u-p),n.restore(),requestAnimationFrame(N)};requestAnimationFrame(N)}const Ge=e=>new Promise(n=>setTimeout(n,e)),Fe=[{status:"Reasoning…",ms:2600,signal:{kind:"tool",label:"Planned constraints",evidenceRef:"demo:phase:reasoning"}},{status:"Searching the web…",ms:3100,signal:{kind:"retrieval",label:"Retrieved Austin dinner options",evidenceRef:"demo:phase:retrieval"}},{status:"Drafting…",ms:3400,signal:{kind:"artifact",label:"Ranked five candidate spots",evidenceRef:"demo:phase:draft"}},{status:"Polishing…",ms:2900,signal:{kind:"artifact",label:"Final answer assembled",evidenceRef:"demo:phase:final"}}],kt=[{path:"/",label:"Home"},{path:"/lab",label:"Lab"},{path:"/proof",label:"Proof"},{path:"/sdk",label:"SDK"},{path:"/judges",label:"Judges"}];function Nn(){return new Promise((e,n)=>{window.setTimeout(()=>n(new Error("DEMO_PROVIDER_TIMEOUT")),1400)})}function Pn(){const e=window.location.pathname.replace(/\/+$/,"")||"/";return kt.some(n=>n.path===e)?e:"/"}function Ln(e,n){const t=kt.map(a=>`<a href="${a.path}" ${a.path===n?'aria-current="page"':""}>${a.label}</a>`).join("");return`
    <div class="site-shell">
      <nav class="site-nav" aria-label="Primary navigation">
        <div class="nav-inner">
          <a class="wordmark" href="/"><span class="mark" aria-hidden="true"></span><span>QuickSpin</span></a>
          <div class="nav-links">${t}</div>
          <a class="nav-proof" href="/proof">LIVE / 41 TESTS</a>
        </div>
      </nav>
      ${e}
      <nav class="mobile-dock" aria-label="Mobile navigation">${t}</nav>
      <footer>
        <div class="footer-inner">
          <div>QuickSpin · playable AI wait runtime · evidence before claims.</div>
          <div class="footer-links"><a href="/lab">Live lab</a><a href="/proof">Evidence</a><a href="/sdk">SDK</a><a href="/judges">Judge view</a></div>
        </div>
      </footer>
    </div>`}function Pe(e,n,t,a){return`<header class="page-head">
    <div><div class="eyebrow">${e}</div><h1>${n}</h1><p>${t}</p></div>
    <div class="page-index">QuickSpin / ${a}<br>execution → play → evidence</div>
  </header>`}function On(){return`<main class="page">
    <section class="hero-grid">
      <div>
        <div class="eyebrow">Commonsmade · Make Waiting for AI Fun</div>
        <h1 class="display">Make AI waiting <em>playable.</em><br>Keep the truth.</h1>
        <p class="lede">A black-box arcade for AI waiting: host-observed events become play, the full run closes into a private Evidence Capsule, and only a redacted Wait Ghost is allowed to travel.</p>
        <div class="route-actions">
          <a class="action signal" href="/lab">Enter the live wait lab →</a>
          <a class="action" href="/proof">Inspect the evidence</a>
          <a class="action" href="/sdk">Integrate the runtime</a>
        </div>
      </div>
      <div class="instrument" aria-label="QuickSpin timing instrument">
        <div class="instrument-head"><span>QS / WAIT INSTRUMENT</span><span>STATE 01</span></div>
        <div class="dial"><span class="dial-orbit"></span></div>
        <div class="instrument-strip">
          <div><strong>12.0s</strong><span>controlled wait</span></div>
          <div><strong>LIVE</strong><span>host signals</span></div>
          <div><strong>±</strong><span>directional delta</span></div>
        </div>
      </div>
    </section>
    <section class="signature-rail" aria-label="QuickSpin evidence lifecycle">
      <article><span>01 / HOST EVENT</span><strong>Observed</strong><small>phase · signal · failure</small></article>
      <i>→</i>
      <article><span>02 / PLAY</span><strong>Playable</strong><small>execution becomes game state</small></article>
      <i>→</i>
      <article class="private"><span>03 / CAPSULE</span><strong>Private proof</strong><small>full provenance retained</small></article>
      <i>→</i>
      <article class="ghost"><span>04 / WAIT GHOST</span><strong>Safe to replay</strong><small>redacted · historical · shareable</small></article>
    </section>
    <section class="proof-band" aria-label="Core QuickSpin proof">
      <article class="proof-card signal"><span class="index">01 / EXECUTION</span><h3>Real events become game mechanics.</h3><p>Tool, retrieval, artifact and warning signals require host-owned provenance before QuickSpin lets them affect play.</p></article>
      <article class="proof-card"><span class="index">02 / FAILURE</span><h3>Failure stays failure.</h3><p>A rejected request ends as FAILED. QuickSpin does not manufacture a response just to keep the demo green.</p></article>
      <article class="proof-card"><span class="index">03 / MEASURE</span><h3>Wait gets a receipt.</h3><p>Actual wait, played time, engagement and felt wait stay directional — and a redacted Wait Ghost can replay the run without pretending it is live AI.</p></article>
    </section>
    <section class="page-head" style="margin-bottom:0">
      <div><div class="eyebrow">Five surfaces / one product truth</div><h1>Not a landing page.<br>A product instrument.</h1><p>Each route has one job: explain, demonstrate, prove, integrate, or defend. The judge never has to excavate a single scrolling page to find the evidence.</p></div>
      <div class="page-index">HOME → thesis<br>LAB → interaction<br>PROOF → evidence<br>SDK → repeatability<br>JUDGES → rubric</div>
    </section>
  </main>`}function Wn(){return`<main class="page">
    ${Pe("Live wait lab","Same wait. Different experience.","Run the exact 12-second control, then the QuickSpin path. The product can also demonstrate a real rejected-Promise failure without fabricating success.","02 / LAB")}
    <section class="lab-grid">
      <div class="lab-panel">
        <div class="panel-kicker"><span>EXPERIMENT / QS-12</span><span>CONTROLLED 12.0s</span></div>
        <div class="lab-storyline" aria-label="QuickSpin lab flow"><span>WAIT</span><i></i><span>PLAY</span><i></i><span>RECORD</span><i></i><span>DERIVE</span></div>
        <div class="seg" role="group" aria-label="Demo mode"><button data-mode="classic">Classic spinner</button><button data-mode="quickspin">QuickSpin</button></div>
        <div id="classic-panel">
          <div class="chat">
            <div class="bubble ai">Ask for dinner ideas. The wait is deliberately fixed at twelve seconds.</div>
            <div class="thinking"><span class="spinner"></span><span class="spinner-label">Reasoning…</span></div>
            <div class="progress-track"><div class="fill"></div></div><div class="progress-label">0%</div>
          </div>
          <div id="classic-phase" class="qs-phase"></div>
        </div>
        <div id="qs-panel">
          <div class="chat"><div class="bubble ai">Choose to play while the host request progresses. Real phases and signals drive the waiting layer.</div><div id="qs-mount" class="qs-mount"></div></div>
          <div id="qs-phase" class="qs-phase">Phase: ready.</div>
        </div>
        <div class="lab-actions">
          <button id="run-demo" class="run">Run 12-second comparison</button>
          <button id="run-failure" class="failure">Run negative-path proof</button>
          <button id="copy-capsule">Copy Evidence Capsule</button>
          <button id="copy-ghost">Copy redacted Wait Ghost link</button>
          <button id="replay-ghost">Replay Wait Ghost</button>
          <button id="reset-stats">Reset local evidence</button>
        </div>
        <section class="ghost-console" aria-label="Wait Ghost boundary"><div class="ghost-console-head"><strong>WAIT GHOST</strong><span>REDACTED DERIVATIVE</span></div><div class="ghost-privacy"><span>NO PROMPT</span><span>NO LABELS</span><span>NO EVIDENCE REFS</span><span>NO PAYLOADS</span></div><div id="ghost-status" class="qs-phase">Wait Ghost: none loaded. Shared ghosts are redacted replay artifacts — never live AI.</div></section>
      </div>
      <aside class="evidence-panel" style="padding:0;overflow:hidden">
        <div class="panel-kicker" style="padding:18px;margin:0"><span>EVIDENCE FEED</span><span>HOST EVENTS</span></div>
        <div id="event-log" class="event-log" aria-live="polite"></div>
      </aside>
    </section>
    <div class="stats-grid">
      <div id="stat-sessions" class="stat"><div class="num">0</div><div class="lbl">sessions</div></div>
      <div id="stat-wait" class="stat"><div class="num">0s</div><div class="lbl">played wait</div></div>
      <div id="stat-best" class="stat"><div class="num">—</div><div class="lbl">runner best</div></div>
      <div id="stat-felt" class="stat"><div class="num">—</div><div class="lbl">felt / actual</div></div>
      <div id="stat-streak" class="stat"><div class="num">0</div><div class="lbl">day streak</div></div>
    </div>
  </main>`}function Dn(){return`<main class="page">
    ${Pe("Evidence room","A receipt for the wait. A record for the failure.","QuickSpin treats waiting as an observable product state. Success, cancellation, failure and UNKNOWN remain distinct — because a polished interface is not evidence.","03 / PROOF")}
    <section class="receipt" aria-label="Illustrative Wait Receipt">
      <div class="receipt-head"><div><div class="eyebrow">WAIT RECEIPT / SAMPLE</div><div class="receipt-title">Execution record</div></div><div class="receipt-id">QS-2026-0915<br>status / verified</div></div>
      <div class="receipt-row"><span>ACTUAL WAIT</span><strong>12.00 s</strong></div>
      <div class="receipt-row"><span>PLAYED</span><strong>8.41 s</strong></div>
      <div class="receipt-row"><span>ENGAGED</span><strong>7.88 s</strong></div>
      <div class="receipt-row signal"><span>FELT WAIT</span><strong>9.00 s / −25%</strong></div>
      <div class="receipt-row"><span>PROVENANCE</span><strong>HOST-OBSERVED</strong></div>
      <div class="receipt-row"><span>EVIDENCE CAPSULE</span><strong>PRIVATE / PORTABLE JSON</strong></div>
      <div class="receipt-row"><span>WAIT GHOST</span><strong>REDACTED / REPLAYABLE / SHAREABLE</strong></div>
      <div class="receipt-row"><span>UNKNOWN</span><strong>RETAINED / NOT LAUNDERED</strong></div>
      <div class="receipt-foot">Illustrative receipt layout. The live lab records the actual session values; perceived-wait delta is allowed to be shorter, equal, or longer.</div>
    </section>
    <section class="evidence-split" aria-label="Private and shareable evidence boundary">
      <article class="evidence-vessel capsule-vessel"><span>PRIVATE</span><h2>Evidence Capsule</h2><p>Full host-side run record with provenance, outcome and evidence coverage.</p><div><b>provenance</b><b>trail</b><b>outcome</b><b>coverage</b></div></article>
      <div class="redaction-gate"><span>REDACT</span><strong>→</strong><small>minimum shareable truth</small></div>
      <article class="evidence-vessel ghost-vessel"><span>SHAREABLE</span><h2>Wait Ghost</h2><p>Historical timing shape without prompts, labels, evidence refs or intervention payloads.</p><div><b>timing</b><b>event types</b><b>outcome</b><b>replay</b></div></article>
    </section>
    <div class="trust-boundary">PRIVATE → REDACT → SHARE · GHOST REPLAY IS HISTORICAL, NOT LIVE AI</div>
    <section class="evidence-grid" style="margin-top:54px">
      <article class="evidence-panel"><div class="eyebrow">Reality anchor</div><h2>A real production failure, not a hypothetical risk.</h2><p>OpenAI documented elevated errors and latency on June 2–3, 2026 across Responses API, Codex and ChatGPT. QuickSpin does not claim to repair provider reliability; the incident proves waiting, rejection and degraded flows are real product states.</p><div class="status-line"><span>PRIMARY-SOURCE EVENT</span><span class="status">PASS</span></div></article>
      <article class="evidence-panel"><div class="eyebrow">Negative path</div><h2>Real failure &gt; fake success.</h2><p>The live lab executes an actual rejected Promise. The session persists FAILED, emits structured evidence, and does not append an AI answer.</p><div class="status-line"><span>RUNTIME FAILURE PATH</span><span class="status">PASS</span></div></article>
      <article class="evidence-panel"><div class="eyebrow">Abstention</div><h2>No provenance? No claim.</h2><p>Execution signals without a valid evidenceRef are rejected as UNKNOWN / INSUFFICIENT_EVIDENCE and do not mutate gameplay.</p><div class="status-line"><span>UNKNOWN / REFUSAL</span><span class="status">PASS</span></div></article>
      <article class="evidence-panel"><div class="eyebrow">Boundary</div><h2>What QuickSpin refuses to claim.</h2><p>It does not make the model faster, guarantee every user feels less wait, or convert a controlled demo failure into evidence of a live provider outage.</p><div class="status-line"><span>CLAIM DISCIPLINE</span><span class="status">PASS</span></div></article>
    </section>
    <div class="route-actions"><a class="action signal" href="/lab">Run the live negative path →</a><a class="action" href="/judges">See rubric traceability</a></div>
  </main>`}function $n(){return`<main class="page">
    ${Pe("Integration surface","The product is the runtime contract — not one minigame.","Runner and Orbit consume the same lifecycle. Hosts can expose real phases and evidence-bearing execution signals without fabricating model progress.","04 / SDK")}
    <section class="lifecycle">
      ${["IDLE","WAITING","PLAYING","RESPONSE READY","COMPLETED","FAILED / CANCELLED"].map((n,t)=>`<div class="life"><b>0${t+1}</b><span>${n}</span></div>`).join("")}
    </section>
    <section class="contract-strip" aria-label="Runtime contract principles">
      <article><span>HOST AUTHORITY</span><strong>Observe. Do not invent.</strong><p>Phases and signals come from the host boundary.</p></article>
      <article><span>FAIL CLOSED</span><strong>No provenance, no gameplay claim.</strong><p>Insufficient evidence remains UNKNOWN.</p></article>
      <article><span>PORTABLE PROOF</span><strong>Private Capsule. Redacted Ghost.</strong><p>One contract across multiple waiting surfaces.</p></article>
    </section>
    <section class="code-panel"><div class="code-head"><span>Vanilla integration</span><span>evidence-aware</span></div><pre>${Gn(`const qs = createQuickSpin({ target: "#wait" });
const session = qs.start({ status: "Reasoning…" });

session.setProgress(); // indeterminate by default
session.setPhase("Searching…");
session.signal({
  kind: "retrieval",
  label: "Retrieved 12 sources",
  evidenceRef: "run_123:retrieval_4",
});

try {
  const response = await modelRequest();
  session.complete();
  return response;
} catch (error) {
  session.fail(error);
  throw error;
}`)}</pre></section>
    <section class="evidence-grid" style="margin-top:28px">
      <article class="evidence-panel"><div class="eyebrow">Execution signals</div><h2>Observed events become play.</h2><p><strong>retrieval</strong>, <strong>tool</strong>, <strong>artifact</strong>, and <strong>warning</strong> are optional host-supplied signals. Every accepted signal carries a provenance reference.</p></article>
      <article class="evidence-panel"><div class="eyebrow">Honest progress</div><h2>Indeterminate is a feature.</h2><p>If the host cannot prove percent progress, QuickSpin does not invent one. Phase changes can still alter intensity without pretending the model is “62% done.”</p></article>
      <article class="evidence-panel"><div class="eyebrow">Distribution</div><h2>Reusable by design.</h2><p>Vanilla SDK, React wrapper, ESM, CJS and IIFE outputs share the same host contract. Evidence Capsules can derive privacy-safe Wait Ghosts for replay, sharing and wait-to-wait regression diffs.</p></article>
      <article class="evidence-panel"><div class="eyebrow">Fast responses</div><h2>No game flash for trivial waits.</h2><p>The default 650 ms reveal threshold lets fast model responses finish without interrupting the user with unnecessary UI.</p></article>
    </section>
  </main>`}function Hn(){const e=[["RUBRIC","Waiting experience, originality, AI-native fit, repeatability and execution mapped to proof.","PASS"],["PAIN","Real AI latency/rejection states plus HCI evidence that wait presentation changes experience.","PASS"],["PROBLEM","Passive waiting gives little agency and can imply confidence the host does not actually have.","PASS"],["DIFFERENTIATOR","Observed execution becomes gameplay; private evidence becomes a Capsule; a redacted derivative becomes a shareable Wait Ghost.","PASS"],["EXECUTION","Two games, lifecycle, persistence, React/vanilla, accessibility, security gates.","PASS"],["EVIDENCE","Primary-source incident, tests, CI/CodeQL, runtime, Claim + Failure Ledgers.","PASS"],["STORY","One narrative: real wait → playable execution → truthful outcome.","PASS"],["DEMO","12-second control, Capsule, redacted Ghost replay, wait diff, failure and UNKNOWN.","READY"],["Q&A","Adversarial answer bank refuses unsupported claims instead of improvising them.","PREPARED"]],n=[["01","Signal / opportunity","AI products increasingly contain non-zero waits worth designing intentionally."],["02","Real negative event","OpenAI June 2–3, 2026 latency, rejection and degraded user flows."],["03","Observable impact","Response-start delay, HTTP 429 rejection, broken continuity and uncertainty."],["04","Design lesson","Waiting cannot silently mean success; unknown evidence must stay unknown."],["05","Mitigation","Playable wait, provenance, explicit terminal outcomes and directional receipt."]];return`<main class="page">
    ${Pe("Judge surface","Every claim has a route to proof.","This page compresses the build into judge logic: criterion → behavior → evidence → demo. It is intentionally explicit about what is verified, controlled, unknown, or refused.","05 / JUDGES")}
    <section class="judge-memory"><span>REMEMBER ONE THING</span><strong>QuickSpin turns AI waiting into a game you can verify afterward.</strong><div>PRIVATE CAPSULE → REDACTED GHOST → REPLAY / COMPARE</div></section>
    <section class="claim-matrix" aria-label="Claim classes"><article class="verified"><b>VERIFIED</b><strong>Observed execution can become play.</strong></article><article class="unknown"><b>UNKNOWN</b><strong>No evidence stays unresolved.</strong></article><article class="refused"><b>REFUSED</b><strong>QuickSpin does not claim faster models.</strong></article><article class="portable"><b>PORTABLE</b><strong>Capsule → Ghost → replay / compare.</strong></article></section>
    <section class="judge-cycle">${e.map(t=>`<div class="judge-row"><div class="stage">${t[0]}</div><div class="why">${t[1]}</div><div class="verdict">${t[2]}</div></div>`).join("")}</section>
    <section class="five-pattern">${n.map(t=>`<article class="pattern-step"><div class="n">${t[0]}</div><h3>${t[1]}</h3><p>${t[2]}</p></article>`).join("")}</section>
    <section class="evidence-panel"><div class="eyebrow">Canonical distinction</div><h2>QuickSpin is not trying to be the biggest AI waiting game.</h2><p>It is the reusable waiting layer that makes real execution playable, preserves failure truth, refuses unsupported signals, records a private Evidence Capsule, and derives a privacy-safe Wait Ghost for replay/share/compare. That evidence lifecycle is the product — the minigames are interchangeable implementations of the contract.</p><div class="route-actions"><a class="action signal" href="/lab">See it run →</a><a class="action" href="/proof">Inspect evidence</a><a class="action" href="/sdk">Inspect integration</a></div></section>
  </main>`}function Gn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Fn(){const e=document.getElementById("app");if(!e)return;const n=Pn(),t=n==="/lab"?Wn():n==="/proof"?Dn():n==="/sdk"?$n():n==="/judges"?Hn():On();e.innerHTML=Ln(t,n);const a=e.querySelector(".hero-canvas");a&&Rn(a),n==="/lab"&&jn(e)}function jn(e){const n=e.querySelector("#qs-mount"),t=e.querySelector("#event-log"),a=e.querySelector("#classic-panel"),r=e.querySelector("#qs-panel"),d=Array.from(e.querySelectorAll(".seg button")),f=e.querySelector("#run-demo"),l=e.querySelector("#run-failure"),u=e.querySelector("#copy-capsule"),p=e.querySelector("#copy-ghost"),I=e.querySelector("#replay-ghost"),q=e.querySelector("#ghost-status"),P=e.querySelector("#reset-stats"),N=e.querySelector("#qs-phase"),g=e.querySelector("#classic-phase"),b={target:n,delayMs:0,onEvent:o=>{const v=document.createElement("div");v.textContent=`[${new Date().toLocaleTimeString()}] ${o.type}${o.data?" "+JSON.stringify(o.data):""}`,t.appendChild(v),t.scrollTop=t.scrollHeight},onIntervention:o=>({id:o.id,accepted:o.kind==="refine",reason:o.kind==="refine"?"HOST_APPLIED_REFINEMENT":"DEMO_HOST_REFUSED_INTENT",evidenceRef:o.kind==="refine"?"demo:intervention:walkability":void 0})};let S=ut(b);const L=new URLSearchParams(window.location.hash.replace(/^#/,""));let C=Cn(L.get("ghost")??""),j="quickspin",A=!1;const h=o=>{j=o;for(const v of d)v.setAttribute("aria-pressed",o===v.dataset.mode?"true":"false");a.style.display=o==="classic"?"":"none",r.style.display=o==="quickspin"?"":"none"},_=(o,v)=>{const M=(j==="classic"?a:r).querySelector(".chat"),R=document.createElement("div");R.className=`bubble ${v}`,R.textContent=o,M.appendChild(R)},V=()=>{const o=(T,M)=>{const R=e.querySelector(`#${T} .num`);R&&(R.textContent=M)};o("stat-sessions",String(bt())),o("stat-wait",je(vt())),o("stat-best",Se("runner")??"—");const v=pn();o("stat-felt",v.samples>0?`${Math.round(v.avgRatio*100)}%`:"—"),o("stat-streak",String(yt()))},le=o=>o.type==="signal"?`signal · ${o.signalKind??"unknown-kind"}`:o.type==="signal-rejected"?"UNKNOWN · signal rejected":o.type==="intervention"?`intervention · ${o.interventionKind??"custom"}`:o.type==="intervention-result"?`intervention result · ${o.accepted?"accepted":"rejected"}`:o.type,ce=()=>{const o=S.getLastCapsule();return o?Sn(o):null},H=()=>{const o=S.getLastCapsule();if(!C||!o)return;const v=In(C,o),T=`${v.actualWaitDeltaMs>=0?"+":"−"}${je(Math.abs(v.actualWaitDeltaMs))}`,M=`${v.engagedPlayDeltaMs>=0?"+":"−"}${je(Math.abs(v.engagedPlayDeltaMs))}`;q.textContent=`Wait diff · current − shared ghost: actual ${T}; engaged ${M}; outcome ${v.fromOutcome} → ${v.toOutcome}. No winner score.`},Ce=async o=>{if(!A){A=!0,I.disabled=!0,I.textContent="Replaying redacted timeline…",q.textContent="WAIT GHOST REPLAY · redacted historical artifact · not live AI.";for(const v of qn(o,6)){await Ge(Math.min(v.delayMs,1200));const T=document.createElement("div");T.textContent=`[WAIT GHOST +${Math.round(v.event.atMs)}ms] ${le(v.event)}`,t.appendChild(T),t.scrollTop=t.scrollHeight}q.textContent=`Wait Ghost replay complete · ${o.timeline.length} redacted event(s) · source outcome ${o.outcome}. Replay did not emit host execution signals.`,A=!1,I.disabled=!1,I.textContent="Replay Wait Ghost",H()}},qe=async()=>{g.textContent="";const o=a.querySelector(".chat"),v=o.querySelector(".thinking"),T=o.querySelector(".fill"),M=o.querySelector(".progress-label");v.style.display="flex";let R=0;for(const O of Fe){v.querySelector(".spinner-label").textContent=O.status,R+=O.ms;const z=R/12e3;T.style.width=`${Math.round(z*100)}%`,M.textContent=`${Math.round(z*100)}%`,await Ge(O.ms)}v.style.display="none",_("Here are five spots — assuming everyone still likes tacos.","ai")},w=async()=>{const o=S.start({status:Fe[0].status});o.setProgress(),o.signal({kind:"retrieval",label:"Unproven retrieval candidate",evidenceRef:""});const v=await o.intervene({kind:"refine",label:"Prioritize walkability in the final ranking"});for(const M of Fe)o.setPhase(M.status),o.signal(M.signal),N.innerHTML=`Phase: <strong>${M.status}</strong> · signal: <strong>${M.signal.kind}</strong> — ${M.signal.label}`,await Ge(M.ms);o.complete();const T=S.getLastCapsule();N.innerHTML="Phase: <strong>Done</strong> — Evidence Capsule retained <strong>"+String(T?.evidenceCoverage.acceptedSignals??0)+"</strong> accepted signal(s), <strong>"+String(T?.evidenceCoverage.rejectedSignals??0)+"</strong> UNKNOWN/rejected signal(s), and host intervention <strong>"+(v.accepted?"ACKNOWLEDGED":"REJECTED")+"</strong>.",_("Here are five spots — assuming everyone still likes tacos.","ai"),V(),H()},k=async()=>{A||(A=!0,f.disabled=!0,l.disabled=!0,f.textContent="Generating…",_("Where should five friends eat tonight in Austin?","user"),j==="classic"?await qe():await w(),A=!1,f.disabled=!1,l.disabled=!1,f.textContent="Run 12-second comparison")},G=async()=>{if(A)return;A=!0,h("quickspin"),f.disabled=!0,l.disabled=!0,l.textContent="Failure in flight…",_("Find dinner options, but preserve failure truth if the provider rejects.","user");const o=S.start({status:"Calling restaurant search provider…"});o.setProgress(),o.setPhase("Calling restaurant search provider…"),N.innerHTML="Negative path: <strong>provider call in flight</strong> — no success assumed.";try{await Nn()}catch(v){const T=v instanceof Error?v:new Error(String(v));o.signal({kind:"warning",label:"Provider request rejected",evidenceRef:"demo:negative-path:promise-rejection"}),o.fail(T),N.innerHTML=`Negative path: <strong>FAILED</strong> — ${T.message}. No AI answer was fabricated.`,V()}A=!1,f.disabled=!1,l.disabled=!1,l.textContent="Run negative-path proof"};f.addEventListener("click",()=>{k()}),l.addEventListener("click",()=>{G()}),u.addEventListener("click",()=>{const o=S.exportLastCapsule();if(!o){u.textContent="Run a QuickSpin path first";return}navigator.clipboard?.writeText(o),u.textContent="Evidence Capsule copied"}),p.addEventListener("click",()=>{const o=ce();if(!o){p.textContent="Run a QuickSpin path first";return}C=o;const v=new URL(window.location.href);v.hash=`ghost=${kn(o)}`,window.history.replaceState(null,"",v),navigator.clipboard?.writeText(v.toString()),p.textContent="Redacted Wait Ghost link copied",q.textContent=`Wait Ghost ready · ${o.timeline.length} redacted event(s). Labels, evidence refs, payloads, record id, timestamp and failure details are excluded.`}),I.addEventListener("click",()=>{const o=C??ce();if(!o){q.textContent="No Wait Ghost available. Run QuickSpin or open a shared #ghost link first.";return}Ce(o)}),P.addEventListener("click",()=>{S.destroy(),n.innerHTML="",fn(),t.innerHTML="",S=ut(b),u.textContent="Copy Evidence Capsule",p.textContent="Copy redacted Wait Ghost link",V()});for(const o of d)o.addEventListener("click",()=>!A&&h(o.dataset.mode??"quickspin"));h("quickspin"),C&&(q.textContent=`Shared Wait Ghost loaded · ${C.timeline.length} redacted event(s) · outcome ${C.outcome}. Replay is historical, not live AI.`),V()}function je(e){return`${Math.round(e/1e3)}s`}Fn();

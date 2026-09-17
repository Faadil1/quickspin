(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const d of r)if(d.type==="childList")for(const v of d.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&a(v)}).observe(document,{childList:!0,subtree:!0});function t(r){const d={};return r.integrity&&(d.integrity=r.integrity),r.referrerPolicy&&(d.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?d.credentials="include":r.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function a(r){if(r.ep)return;r.ep=!0;const d=t(r);fetch(r.href,d)}})();const _t=new Set(["completed","cancelled","failed","destroyed"]),jt={idle:new Set(["waiting","destroyed"]),waiting:new Set(["playing","response-ready","completed","cancelled","failed","destroyed"]),playing:new Set(["response-ready","completed","cancelled","failed","destroyed"]),"response-ready":new Set(["completed","playing","cancelled","failed","destroyed"]),completed:new Set(["idle","destroyed"]),cancelled:new Set(["idle","destroyed"]),failed:new Set(["idle","destroyed"]),destroyed:new Set};class Yt{_status="idle";_progress=null;_emit;constructor(n){this._emit=n}get status(){return this._status}get progress(){return this._progress}get isTerminal(){return _t.has(this._status)}transition(n){if(this._status===n)return!0;const t=this._status,a=jt[t];return!a||!a.has(n)?!1:(this._status=n,n==="idle"&&(this._progress=null),this._emit({type:"phase",data:{from:t,to:n}}),!0)}setProgress(n){n===void 0||Number.isNaN(n)?this._progress=null:this._progress=Math.max(0,Math.min(1,n)),this._emit({type:"progress",data:this._progress})}}const Bt=String.raw`
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
`,ye=40,Be=24,ne=18,Qt=2400;function Kt(e){switch(e){case"retrieval":return 150;case"tool":return 200;case"artifact":return 250;case"warning":return 300}}function ft(e){e.signalActive=!1,e.signalKind=null,e.signalLabel=null}function ot(e,n){const t=n-44;return{speed:0,groundY:t,playerY:t-ye,vy:0,grounded:!0,obstacleX:e+40,obstacleW:30,obstacleH:52,distance:0,crashed:!1,ready:!0,signalX:e+24,signalY:t-84,signalKind:null,signalLabel:null,signalActive:!1,signalBonus:0,signalsCollected:0}}function Xt(e,n,t,a){if(e.crashed)return;const r=Math.max(0,Math.min(1,a??0));e.speed=220*(1+.9*r),e.distance+=e.speed*n,e.grounded||(e.vy+=Qt*n,e.playerY+=e.vy*n,e.playerY>=e.groundY-ye&&(e.playerY=e.groundY-ye,e.vy=0,e.grounded=!0)),e.obstacleX-=e.speed*n,e.obstacleX+e.obstacleW<0&&(e.obstacleX=t+40+(180+Math.random()*140),e.obstacleH=40+Math.random()*28),e.signalActive&&(e.signalX-=e.speed*.92*n,e.signalX+ne<0&&ft(e))}function lt(e){e.crashed||e.grounded&&(e.grounded=!1,e.vy=-720)}function Vt(e){if(e.crashed)return!1;const n=8;return e.obstacleX<n+Be&&e.obstacleX+e.obstacleW>n&&e.playerY+ye-6>e.groundY-e.obstacleH&&e.playerY<e.groundY-2}function zt(e,n,t){return e.crashed||e.signalActive?!1:(e.signalX=n+24,e.signalY=e.groundY-84,e.signalKind=t.kind,e.signalLabel=t.label,e.signalActive=!0,!0)}function Jt(e){if(!e.signalActive||e.crashed||!e.signalKind)return!1;const n=8,t=e.playerY;return e.signalX<n+Be&&e.signalX+ne>n&&e.signalY<t+ye&&e.signalY+ne>t?(e.signalBonus+=Kt(e.signalKind),e.signalsCollected+=1,ft(e),!0):!1}function Zt(e,n){const t=Math.max(0,Math.floor(e.distance)+e.signalBonus),a=[];return e.signalsCollected>0&&a.push(`AI signals collected: ${e.signalsCollected}`),n==="ai-complete"&&a.push("AI finished — you beat the wait."),n==="player-failed"&&a.push("Crashed — the wait wins this round."),{score:t,label:`${t.toLocaleString()} m`,notes:a,reason:n}}function en(e){switch(e){case"retrieval":return"#72d8ff";case"tool":return"#b99cff";case"artifact":return"#60efb7";case"warning":return"#ffcf70";default:return"#ffffff"}}const mt={id:"runner",name:"Wait Runner",tagline:"Outrun the wait.",controls:"Space or tap to jump · collect live AI signals",create(e){let n=e.canvas.clientWidth||480,t=e.canvas.clientHeight||220,a=ot(n,t),r=!1,d=0,v=0;const c=[],p=e.canvas.getContext("2d"),u=()=>{const m=Math.min(window.devicePixelRatio||1,2);n=e.canvas.clientWidth||480,t=e.canvas.clientHeight||220;const y=Math.round(n*m),b=Math.round(t*m);(d!==y||v!==b||e.canvas.width!==y||e.canvas.height!==b)&&(d=y,v=b,e.canvas.width=y,e.canvas.height=b,p?.setTransform(m,0,0,m,0,0),a=ot(n,t))},R=()=>{if(a.signalActive)return;const m=c.shift();m&&zt(a,n,m)},I=m=>{if(m.code!=="Space")return;const y=m.target;y&&(y.tagName==="INPUT"||y.tagName==="TEXTAREA"||y.isContentEditable)||y&&y!==e.root&&y!==e.canvas||(m.preventDefault(),lt(a))},q=m=>{m.preventDefault(),lt(a)},T=()=>{if(p&&(p.clearRect(0,0,n,t),p.strokeStyle="rgba(255,214,106,0.55)",p.lineWidth=2,p.beginPath(),p.moveTo(0,a.groundY),p.lineTo(n,a.groundY),p.stroke(),a.obstacleX+a.obstacleW>0&&a.obstacleX<n&&(p.fillStyle="rgba(255,120,120,0.85)",p.fillRect(a.obstacleX,a.groundY-a.obstacleH,a.obstacleW,a.obstacleH)),a.signalActive&&a.signalX<n&&(p.save(),p.translate(a.signalX+ne/2,a.signalY+ne/2),p.rotate(Math.PI/4),p.fillStyle=en(a.signalKind),p.fillRect(-ne/2,-ne/2,ne,ne),p.restore(),p.font="10px system-ui, sans-serif",p.fillStyle="rgba(255,255,255,0.78)",p.fillText((a.signalLabel??a.signalKind??"signal").slice(0,22),8,28)),p.fillStyle="rgba(255,214,106,0.95)",p.fillRect(8,a.playerY,Be,ye),p.font="10px system-ui, sans-serif",p.fillStyle="rgba(255,255,255,0.5)",p.fillText(`${a.distance.toFixed(0)} m · signals ${a.signalsCollected}`,8,12),e.phase)){const m=e.phase.slice(0,30),y=p.measureText(m).width;p.fillStyle="rgba(255,255,255,0.45)",p.fillText(m,Math.max(8,n-y-8),12)}};return{start(){r=!1,u(),e.root.tabIndex=0,e.canvas.tabIndex=0,e.root.addEventListener("keydown",I),e.canvas.addEventListener("pointerdown",q),e.canvas.setAttribute("aria-label",mt.name+": keep a character running by jumping over obstacles while the model thinks. Space or tap to jump. Live host execution signals appear as collectible diamonds."),R()},tick(m,y){r||(u(),Xt(a,Math.min(y,.05),n,e.intensity),Jt(a),R(),Vt(a)&&(a.crashed=!0,e.finish("player-failed")),T())},signal(m){c.push(m),c.length>8&&c.shift(),R()},finish(m){return Zt(a,m)},pause(){r=!0},resume(){r=!1},destroy(){e.root.removeEventListener("keydown",I),e.canvas.removeEventListener("pointerdown",q)}}}};function tn(e){switch(e){case"retrieval":return 150;case"tool":return 200;case"artifact":return 250;case"warning":return 300}}function nn(e){switch(e){case"retrieval":return"#72d8ff";case"tool":return"#b99cff";case"artifact":return"#60efb7";case"warning":return"#ffcf70";default:return"#60efb7"}}function ct(e,n){return{baseSpeed:60,fishX:e/2,fishY:n/2,vx:60,vy:40,caught:0,misses:0,combo:0,bestCombo:0,radius:9,active:!0,signalBonus:0,signalsCaught:0}}function an(e,n,t,a,r){if(!e.active)return;const v=1+Math.max(0,Math.min(1,r??0))*1.5+Math.min(e.combo,8)*.05;e.fishX+=e.vx*v*n,e.fishY+=e.vy*v*n;const c=14;e.fishX<c&&(e.fishX=c,e.vx=Math.abs(e.vx)),e.fishX>t-c&&(e.fishX=t-c,e.vx=-Math.abs(e.vx)),e.fishY<c&&(e.fishY=c,e.vy=Math.abs(e.vy)),e.fishY>a-c&&(e.fishY=a-c,e.vy=-Math.abs(e.vy))}function sn(e,n,t,a,r){const v=Math.hypot(n-e.fishX,t-e.fishY)<34&&e.active;if(v){e.caught+=1,e.combo+=1,e.bestCombo=Math.max(e.bestCombo,e.combo),e.fishX=28+Math.random()*Math.max(1,a-56),e.fishY=28+Math.random()*Math.max(1,r-56);const c=Math.random()*Math.PI*2;e.vx=Math.cos(c)*(70+Math.random()*90),e.vy=Math.sin(c)*(70+Math.random()*90)}else e.misses+=1,e.combo=0;return v}function rn(e,n){e.signalBonus+=tn(n.kind),e.signalsCaught+=1}function on(e,n){const t=e.caught+e.misses,a=t>0?e.caught/t:0,r=Math.max(0,Math.round(e.caught*1e3*(.4+a*.6)+e.bestCombo*50+e.signalBonus)),d=[];return e.caught>=3&&d.push(`Best combo: ${e.bestCombo}`),e.signalsCaught>0&&d.push(`AI signals caught: ${e.signalsCaught}`),n==="ai-complete"&&d.push("AI finished — you beat the wait."),{score:r,label:`${r.toLocaleString()} pts`,notes:d,reason:n}}const gt={id:"orbit",name:"Orbit Catch",tagline:"Catch the glow target. Multi-catch, combo-scored.",controls:"Tap/click or press Space/Enter · catch live AI signals",create(e){let n=e.canvas.clientWidth||480,t=e.canvas.clientHeight||220,a=ct(n,t),r=!1,d=0,v=0,c=null;const p=[],u=e.canvas.getContext("2d"),R=()=>{const b=Math.min(window.devicePixelRatio||1,2);n=e.canvas.clientWidth||480,t=e.canvas.clientHeight||220;const C=Math.round(n*b),L=Math.round(t*b);(d!==C||v!==L||e.canvas.width!==C||e.canvas.height!==L)&&(d=C,v=L,e.canvas.width=C,e.canvas.height=L,u?.setTransform(b,0,0,b,0,0),a=ct(n,t))},I=()=>{c||(c=p.shift()??null)},q=(b,C)=>{const L=sn(a,b,C,n,t);return L&&c&&(rn(a,c),c=p.shift()??null),L},T=b=>{if(!a.active)return;b.preventDefault();const C=e.canvas.getBoundingClientRect();q(b.clientX-C.left,b.clientY-C.top)},m=b=>{!a.active||b.key!=="Enter"&&b.code!=="Space"||(b.preventDefault(),q(a.fishX,a.fishY))},y=()=>{if(!u)return;u.clearRect(0,0,n,t),u.save(),u.strokeStyle="rgba(24,26,39,0.4)",u.lineWidth=1;const b=30;for(let N=0;N<=n;N+=b)u.beginPath(),u.moveTo(N,0),u.lineTo(N,t),u.stroke();for(let N=0;N<=t;N+=b)u.beginPath(),u.moveTo(0,N),u.lineTo(n,N),u.stroke();u.restore();const C=nn(c?.kind??null),L=u.createRadialGradient(a.fishX,a.fishY,0,a.fishX,a.fishY,30);if(L.addColorStop(0,`${C}e6`),L.addColorStop(1,`${C}00`),u.fillStyle=L,u.beginPath(),u.arc(a.fishX,a.fishY,30,0,Math.PI*2),u.fill(),u.fillStyle=C,u.beginPath(),u.arc(a.fishX,a.fishY,a.radius,0,Math.PI*2),u.fill(),u.font="10px system-ui, sans-serif",u.fillStyle="rgba(255,255,255,0.55)",u.fillText(`caught ${a.caught} · signals ${a.signalsCaught} · combo ${a.combo} · accuracy ${a.caught>0||a.misses>0?Math.round(a.caught/Math.max(1,a.caught+a.misses)*100):0}%`,8,12),c&&(u.fillStyle="rgba(255,255,255,0.8)",u.fillText(`${c.kind}: ${c.label}`.slice(0,44),8,28)),e.phase){const N=e.phase.slice(0,30),D=u.measureText(N).width;u.fillStyle="rgba(255,255,255,0.45)",u.fillText(N,Math.max(8,n-D-8),t-10)}};return{start(){r=!1,R(),e.canvas.tabIndex=0,e.canvas.addEventListener("pointerdown",T),e.canvas.addEventListener("keydown",m),e.canvas.setAttribute("aria-label",gt.name+": catch the glow target while the model thinks. Tap or click the target, or press Space or Enter when the canvas is focused. Host execution signals are attached to live targets and score only when caught."),I()},tick(b,C){r||(R(),an(a,Math.min(C,.05),n,t,e.intensity),y())},signal(b){c?(p.push(b),p.length>8&&p.shift()):c=b},finish(b){return on(a,b)},pause(){r=!0},resume(){r=!1},destroy(){e.canvas.removeEventListener("pointerdown",T),e.canvas.removeEventListener("keydown",m)}}}},Qe="quickspin:sessions:v1",je=1e3;function ln(){return{phaseChanges:0,acceptedSignals:0,rejectedSignals:0,uniqueEvidenceRefs:0,interventions:0,acceptedInterventions:0,rejectedInterventions:0}}function Me(e){const n=new Set,t=ln();for(const a of e)a.type==="phase"&&(t.phaseChanges+=1),a.type==="signal"&&(t.acceptedSignals+=1,a.signal?.evidenceRef&&n.add(a.signal.evidenceRef)),a.type==="signal-rejected"&&(t.rejectedSignals+=1),a.type==="intervention"&&(t.interventions+=1),a.type==="intervention-result"&&(a.interventionResult?.accepted?t.acceptedInterventions+=1:t.rejectedInterventions+=1,a.interventionResult?.evidenceRef&&n.add(a.interventionResult.evidenceRef));return t.uniqueEvidenceRefs=n.size,t}function le(){try{const e=localStorage.getItem(Qe);if(!e)return{version:1,records:[]};const n=JSON.parse(e);return Array.isArray(n.records)?{version:1,records:n.records.filter(a=>typeof a?.ts=="number").slice(-je)}:{version:1,records:[]}}catch{return{version:1,records:[]}}}function ht(e){try{localStorage.setItem(Qe,JSON.stringify(e))}catch{}}function cn(e){let n=0;for(let t=e.length-1;t>=0&&e[t].completed;t--)n+=1;return n}function Fe(e){const n=le(),t=e.gameId?pn(e.gameId):0,a=e.completed&&!!e.gameId&&(e.score??0)>t,r=globalThis.crypto?.randomUUID?.()??Math.random().toString(36).slice(2),d=(e.trail??[]).map(p=>({...p})),v=e.evidenceCoverage??Me(d),c={id:r,gameId:e.gameId,score:e.completed?e.score:null,actualWaitMs:e.actualWaitMs,engagedPlayMs:e.engagedPlayMs,feltWaitMs:e.feltWaitMs??null,completed:e.completed,outcome:e.outcome??(e.completed?"completed":"unknown"),failureCode:e.failureCode??null,failureMessage:e.failureMessage??null,trail:d,evidenceCoverage:v,ts:Date.now()};return n.records.push(c),n.records.length>je&&(n.records=n.records.slice(-je)),ht(n),{id:r,isHighScore:a,dayStreak:yt(),sessionStreak:cn(n.records),record:{...c,trail:[...d],evidenceCoverage:{...v}}}}function dn(e,n){const t=le(),a=t.records.find(r=>r.id===e);return!a||!a.completed||!Number.isFinite(n)||n<0?null:(a.feltWaitMs=n,ht(t),{...a})}function un(e){const n=[...e.trail??[]];return{version:1,recordId:e.id,outcome:e.outcome??(e.completed?"completed":"unknown"),actualWaitMs:e.actualWaitMs,engagedPlayMs:e.engagedPlayMs,gameId:e.gameId,score:e.score,feltWaitMs:e.feltWaitMs??null,failureCode:e.failureCode??null,failureMessage:e.failureMessage??null,evidenceCoverage:e.evidenceCoverage??Me(n),trail:n,ts:e.ts}}function pn(e){return le().records.filter(t=>t.gameId===e&&t.completed&&typeof t.score=="number").reduce((t,a)=>a.score>t?a.score:t,0)}function Te(e){const t=le().records.filter(a=>a.gameId===e&&a.completed&&typeof a.score=="number").sort((a,r)=>(r.score??0)-(a.score??0))[0];return t?`${t.score}`:null}function vt(){return le().records.filter(n=>n.completed).reduce((n,t)=>n+Math.min(t.actualWaitMs,Math.max(0,t.engagedPlayMs)),0)}function bt(){return le().records.length}function yt(){const e=le(),n=new Set(e.records.filter(r=>r.completed).map(r=>new Date(r.ts).toDateString()));let t=0;const a=new Date(Date.now());for(;n.has(a.toDateString());)t++,a.setDate(a.getDate()-1);return t}function fn(){const n=le().records.filter(r=>typeof r.feltWaitMs=="number"&&r.actualWaitMs>0);if(n.length===0)return{samples:0,avgRatio:0,avgDeltaMs:0};const t=n.reduce((r,d)=>r+(d.feltWaitMs??0)/d.actualWaitMs,0),a=n.reduce((r,d)=>r+((d.feltWaitMs??0)-d.actualWaitMs),0);return{samples:n.length,avgRatio:t/n.length,avgDeltaMs:a/n.length}}function mn(){try{localStorage.removeItem(Qe)}catch{}}const te={runner:mt,orbit:gt},gn=new Set(["retrieval","tool","artifact","warning"]);function hn(e){const n=e?.kind,t=typeof e?.label=="string"?e.label.trim():"",a=typeof e?.evidenceRef=="string"?e.evidenceRef.trim():"";return!gn.has(n)||!t||!a?null:{kind:n,label:t.slice(0,64),evidenceRef:a.slice(0,160)}}const dt={mode:"dark",primary:"#8b7cff",surface:"#10111a",elevated:"#181a27",game:"#202334",text:"#f8f9fc",muted:"#a9b0c0",border:"rgba(255,255,255,0.1)",success:"#16a36a",radius:"16px",font:'Inter, system-ui, -apple-system, "Segoe UI", sans-serif'},vn={mode:"light",primary:"#6658e8",surface:"#ffffff",elevated:"#f3f4f8",game:"#eef0f6",text:"#17181d",muted:"#68707f",border:"rgba(16,17,26,0.1)",success:"#16a36a",radius:"16px",font:'Inter, system-ui, -apple-system, "Segoe UI", sans-serif'};function bn(e){if(e instanceof HTMLElement)return e;if(typeof e=="string"){const n=document.querySelector(e);if(n instanceof HTMLElement)return n}throw new Error("QuickSpin: no target element found. Pass a selector or element.")}function V(e){return`${Math.max(0,Math.round(e/1e3))}s`}function Ie(e){return Math.max(0,Math.min(1,e))}function ut(e={}){const n=bn(e.target),t=Math.max(0,e.delayMs??650);let a=te[e.game??""]?e.game:"runner";const r=document.createElement("div");r.style.display="none";const d=r.attachShadow({mode:"open"}),v=document.createElement("style");v.textContent=Bt,d.appendChild(v);const c=document.createElement("div");c.className="quickspin-root";const p=document.createElement("div");p.className="quickspin-collapsed";const u=document.createElement("span");u.className="quickspin-collapsed-text",u.textContent="QuickSpin · AI working";const R=document.createElement("button");R.className="quickspin-btn-primary quickspin-reopen",R.type="button",R.textContent="Resume play",p.appendChild(u),p.appendChild(R);const I=document.createElement("div");I.className="quickspin-header";const q=document.createElement("div");q.className="quickspin-brand";const T=document.createElement("span");T.className="quickspin-dot",q.appendChild(T),q.appendChild(document.createTextNode("QuickSpin"));const m=document.createElement("div");m.className="quickspin-status",m.setAttribute("role","status"),m.setAttribute("aria-live","polite"),m.textContent="Waiting for the model…";const y=document.createElement("div");y.className="quickspin-elapsed",y.textContent="0s";const b=document.createElement("div");b.className="quickspin-tools";const C=document.createElement("button");C.className="quickspin-btn",C.type="button",C.textContent="—",C.title="Collapse QuickSpin (game pauses)",C.setAttribute("aria-label","Collapse QuickSpin"),b.appendChild(C),I.appendChild(q),I.appendChild(m),I.appendChild(y),I.appendChild(b);const L=document.createElement("div");L.className="quickspin-games";const N=[];for(const s of Object.keys(te)){const i=document.createElement("button");i.className="quickspin-gamebtn",i.type="button",i.textContent=te[s].name,i.setAttribute("aria-pressed",a===s?"true":"false"),i.addEventListener("click",()=>qt(s)),N.push(i),L.appendChild(i)}const D=document.createElement("div");D.className="quickspin-stage";const B=document.createElement("canvas");B.className="quickspin-canvas",B.width=480,B.height=220;const g=document.createElement("div");g.className="quickspin-overlay",g.hidden=!0,D.appendChild(B),D.appendChild(g);const z=document.createElement("div");z.className="quickspin-footer";const W=document.createElement("span");W.textContent=te[a].controls;const se=document.createElement("span");se.textContent="",z.appendChild(W),z.appendChild(se);const he=document.createElement("div");he.className="quickspin-progress";const Q=document.createElement("div");Q.className="quickspin-progress-fill",he.appendChild(Q),c.appendChild(p),c.appendChild(I),c.appendChild(L),c.appendChild(D),c.appendChild(he),c.appendChild(z),d.appendChild(c),n.appendChild(r),n.setAttribute("data-quickspin-active","true");let Ee=e.theme??dt;function we(s){Ee=s;const l={...s.mode==="light"?vn:dt,...s};r.style.setProperty("--qs-primary",l.primary),r.style.setProperty("--qs-surface",l.surface),r.style.setProperty("--qs-elevated",l.elevated),r.style.setProperty("--qs-game",l.game),r.style.setProperty("--qs-text",l.text),r.style.setProperty("--qs-muted",l.muted),r.style.setProperty("--qs-border",l.border),r.style.setProperty("--qs-success",l.success),r.style.setProperty("--qs-radius",l.radius),r.style.setProperty("--qs-font",l.font)}we(Ee);let E=null,S=!1,G=0,U=0,K=0,Se=0,ce=!1,_=!1,H=!1,de=!1,o=null,f=null,A=-1,M=0;const x=[],P=[];let F=null,$="Waiting for the model…";const w=new Yt(O);let J=null;function O(s){e.onEvent&&e.onEvent(s),J&&J(s)}function Z(){return G>0?Math.max(0,performance.now()-G):0}function ve(s){F=un(s),O({type:"capsule",data:F})}function ue(){o!=null&&(window.clearTimeout(o),o=null)}function j(){const s=H&&!ce;r.style.display=s?"":"none",c.classList.toggle("is-collapsed",_)}function pe(){if(!S){u.textContent="QuickSpin · response ready";return}const s=V(performance.now()-G),i=f??$;u.textContent=`QuickSpin · ${i} · ${s}`}function xe(s){if(de)return;Se=requestAnimationFrame(xe);const i=K?(s-K)/1e3:0;K=s,S&&(y.textContent=V(performance.now()-G),pe(),w.progress==null&&Q.classList.add("indeterminate")),S&&E&&H&&!_&&!ce&&!document.hidden&&E?(E.resume(),E.tick(s,i),U+=i*1e3):E&&E.pause()}function Ve(s){for(const i of N)i.setAttribute("aria-pressed",te[s].name===i.textContent?"true":"false");W.textContent=te[s].controls}function qt(s){if(!te[s])return;const i=E!=null;a=s,Ve(s);const l=E;E=null,l?.destroy(),S&&H&&(B.style.pointerEvents="",i&&(g.hidden=!0,Je())),Dt()}function ze(){return{canvas:B,root:c,get progress(){return w.progress},get intensity(){return w.progress==null?M:Ie(w.progress)},get phase(){return f},finish(s){return At(s)},elapsedMs(){return S?performance.now()-G:0}}}function At(s){const i=E;if(!i)return{score:0,label:"—",notes:[],reason:s};const l=i.finish(s);return s==="player-failed"&&S&&Nt(l),l}function Je(){const s=E;E=null,s?.destroy();const i=te[a].create(ze());if(E=i,i.start(),i.signal&&x.length>0){const l=x.splice(0,x.length);for(const h of l)i.signal(h)}O({type:"game-start",data:{game:a,phase:f,intensity:ze().intensity}})}function Ze(){g.querySelector("button")?.focus()}function et(){Je(),g.hidden=!0,B.style.pointerEvents="",w.transition("playing")}function It(s){$=s??$,m.textContent=f??$,g.hidden=!1,g.innerHTML="",B.style.pointerEvents="none";const i=document.createElement("div");i.className="quickspin-waiting-label",i.textContent=f?`AI is working · ${f}`:"AI is working — play without leaving the response behind.";const l=document.createElement("div");l.className="quickspin-actions";const h=document.createElement("button");h.className="quickspin-btn-primary",h.type="button",h.textContent="Play while you wait",h.addEventListener("click",et);const k=document.createElement("button");k.className="quickspin-btn-ghost",k.type="button",k.textContent="Just wait",k.addEventListener("click",()=>{g.hidden=!0}),l.appendChild(h),l.appendChild(k),g.appendChild(i),g.appendChild(l)}function tt(){!S||de||(o=null,H=!0,_=!1,j(),It($))}function Tt(){g.hidden=!0,_=!1,H=!1,j()}function Rt(){if(!S)return;ue(),S=!1;let s=null;E&&(s=E.finish("ai-complete")),w.transition("response-ready"),w.transition("completed");const i=performance.now()-G,l=Fe({gameId:E?a:null,score:s?.score??null,actualWaitMs:i,engagedPlayMs:U,feltWaitMs:null,completed:!0,outcome:"completed",trail:P,evidenceCoverage:Me(P)}),h=i>0?Ie(U/i):0;O({type:"session-complete",data:{id:l.id,game:E?a:null,score:s?.score??null,actualWaitMs:i,engagedMs:U,engagedRatio:h,dayStreak:l.dayStreak,sessionStreak:l.sessionStreak}}),ve(l.record),Pe(),We(),H?(pe(),Pt(s,i,U,l.id,l.isHighScore,l.dayStreak,l.sessionStreak)):(H=!1,j())}function De(){if(!S)return;ue(),S=!1,w.transition("cancelled");const s=Fe({gameId:E?a:null,score:null,actualWaitMs:performance.now()-G,engagedPlayMs:U,feltWaitMs:null,completed:!1,outcome:"cancelled",trail:P,evidenceCoverage:Me(P)});O({type:"cancel",data:{id:s.id,outcome:"cancelled",game:E?a:null}}),ve(s.record),Pe(),H?Lt():j()}function Mt(s){if(!S)return;ue(),S=!1,w.transition("failed");const i=s instanceof Error?s:new Error(String(s??"UNKNOWN_FAILURE")),l=Fe({gameId:E?a:null,score:null,actualWaitMs:performance.now()-G,engagedPlayMs:U,feltWaitMs:null,completed:!1,outcome:"failed",failureCode:"HOST_REQUEST_FAILED",failureMessage:i.message.slice(0,240),trail:P,evidenceCoverage:Me(P)});O({type:"fail",data:{id:l.id,outcome:"failed",code:"HOST_REQUEST_FAILED",error:{name:i.name,message:i.message}}}),ve(l.record),Pe(),H?Ot(i,l.id):j()}function Pe(){const s=E;E=null,s?.destroy()}function Nt(s){g.hidden=!1,g.innerHTML="";const i=document.createElement("div");i.className="quickspin-label",i.textContent="Crash! The model is still working.";const l=document.createElement("div");l.className="quickspin-score-big",l.textContent=s.label;const h=document.createElement("div");h.className="quickspin-actions";const k=document.createElement("button");k.className="quickspin-btn-primary",k.type="button",k.textContent="Play again",k.addEventListener("click",et);const X=document.createElement("button");X.className="quickspin-btn-ghost",X.type="button",X.textContent="Keep waiting",X.addEventListener("click",()=>{g.hidden=!0}),h.appendChild(k),h.appendChild(X),g.appendChild(i),g.appendChild(l),g.appendChild(h),Ze()}function nt(s,i,l,h){g.hidden=!1,g.innerHTML="";const k=h==null||i<=0?null:h/i,X=h==null?null:h-i,Le=i>0?Ie(l/i):0,fe=document.createElement("div");fe.className="quickspin-receipt-title",fe.textContent="WAIT RECEIPT";const me=document.createElement("div");me.className="quickspin-receipt";const ke=[["Actual",V(i)],["Played",V(l)],["Engaged",`${Math.round(Le*100)}%`],["Felt",h==null?"Skipped":V(h)]];for(const[ge,ie]of ke){const re=document.createElement("div");re.className="quickspin-receipt-cell";const Ce=document.createElement("span");Ce.textContent=ge;const qe=document.createElement("strong");qe.textContent=ie,re.appendChild(Ce),re.appendChild(qe),me.appendChild(re)}if(g.appendChild(fe),g.appendChild(me),k!=null&&X!=null){const ge=document.createElement("div");ge.className=k<=1?"quickspin-reduction":"quickspin-extension";const ie=Math.round(Math.abs(1-k)*100);ge.textContent=k<.995?`This wait felt ${ie}% shorter.`:k>1.005?`This wait felt ${ie}% longer.`:"This wait felt about as long as it actually took.",g.appendChild(ge)}O({type:"receipt",data:{id:s,actualWaitMs:i,engagedPlayMs:l,engagement:Le,feltWaitMs:h,ratio:k,deltaMs:X}});const Y=document.createElement("button");Y.className="quickspin-btn-primary",Y.type="button",Y.textContent="View response",Y.addEventListener("click",Tt),g.appendChild(Y),Y.focus()}function Pt(s,i,l,h,k,X,Le){g.hidden=!1,g.innerHTML="";const fe=document.createElement("div");fe.className="quickspin-label",fe.textContent="Response ready";const me=document.createElement("div");me.className="quickspin-score-big",me.textContent=s?s.label:"—";const ke=document.createElement("ul");ke.className="quickspin-notes";const Y=[];s?.notes&&Y.push(...s.notes),k&&Y.push("New personal best"),Y.push(`Streaks — days ${X} · sessions ${Le}`);for(const ee of Y){const be=document.createElement("li");be.textContent=ee,ke.appendChild(be)}g.appendChild(fe),g.appendChild(me),g.appendChild(ke);const ge=ee=>{const be=dn(h,ee),oe=ee/Math.max(1,i),Ut=ee-i,rt=1-oe;O({type:"perceived-wait",data:{id:h,felt:ee,actual:i,ratio:oe,deltaMs:Ut,change:rt,reduction:rt,persisted:!!be}}),We(),nt(h,i,l,ee)},ie=document.createElement("div");ie.className="quickspin-label",ie.textContent=`That took ${V(i)}. How long did it feel?`;const re=document.createElement("div");re.className="quickspin-felt";const Ce=Math.max(1e3,i*.6),qe=i,it=Math.max(i+1e3,i*1.4),Gt=[[`Faster · ~${V(Ce)}`,Ce],[`About the same · ~${V(qe)}`,qe],[`Longer · ~${V(it)}`,it]];for(const[ee,be]of Gt){const oe=document.createElement("button");oe.className="quickspin-felt-btn",oe.type="button",oe.textContent=ee,oe.addEventListener("click",()=>ge(be)),re.appendChild(oe)}g.appendChild(ie),g.appendChild(re);const Ae=document.createElement("button");Ae.className="quickspin-btn-ghost",Ae.type="button",Ae.textContent="Skip question · view receipt",Ae.addEventListener("click",()=>nt(h,i,l,null));const He=document.createElement("div");He.className="quickspin-actions",He.appendChild(Ae),g.appendChild(He),Ze()}function Lt(){g.hidden=!1,g.innerHTML="";const s=document.createElement("div");s.className="quickspin-label",s.textContent="Wait cancelled.",g.appendChild(s)}function Ot(s,i){g.hidden=!1,g.innerHTML="";const l=document.createElement("div");l.className="quickspin-label",l.textContent="Request failed — no response fabricated.";const h=document.createElement("div");h.className="quickspin-notes",h.textContent=`${s.message} · evidence ${i.slice(0,8)}`,g.appendChild(l),g.appendChild(h)}function Dt(){se.textContent=Te(a)?`Best: ${Te(a)}`:""}function We(){se.textContent=`${bt()} sessions · ${V(vt())} played during AI wait · `+(Te(a)?`Best: ${Te(a)}`:"No best yet")}const at=()=>{document.hidden||ce||_?E?.pause():(E?.resume(),K=0)};document.addEventListener("visibilitychange",at);function Wt(){ce=!0,j(),E?.pause()}function $t(){ce=!1,j(),_||E?.resume(),K=0}C.addEventListener("click",()=>{_=!0,c.classList.add("is-collapsed"),E?.pause(),pe()}),R.addEventListener("click",()=>{_=!1,c.classList.remove("is-collapsed"),E?.resume(),K=0}),Se=requestAnimationFrame(xe),We();function Ht(){if(w.status==="destroyed")throw new Error("QuickSpin: controller is destroyed.");if((w.status==="completed"||w.status==="cancelled"||w.status==="failed")&&w.transition("idle"),w.status!=="idle")throw new Error(`QuickSpin: cannot start from ${w.status}.`);if(!w.transition("waiting"))throw new Error("QuickSpin: failed to enter waiting state.")}function st(s){if(de)throw new Error("QuickSpin: controller is destroyed.");Ht(),S=!0,G=performance.now(),U=0,K=0,f=null,A=-1,M=0,x.length=0,P.length=0,_=!1,H=!1,Q.style.width="0%",Q.classList.remove("indeterminate"),y.textContent="0s";const i=s??{};$=i.status??"Waiting for the model…",m.textContent=$;const l=i.gameId??a;return te[l]&&Ft(l),j(),O({type:"session-start",data:{game:a,delayMs:t}}),t===0?tt():o=window.setTimeout(tt,t),$e}function Ft(s){a=s,Ve(s)}const $e={setPhase(s){if(!S)return;const i=s.trim();if(i){if(i!==f&&(f=i,A+=1,M=Ie(.18+Math.max(0,A)*.22),P.push({type:"phase",atMs:Z(),phase:i})),m.textContent=i,H&&!E&&!g.hidden){const l=g.querySelector(".quickspin-waiting-label");l&&(l.textContent=`AI is working · ${i}`)}pe(),O({type:"phase",data:{phase:i,index:A,intensity:w.progress==null?M:w.progress,status:w.status}})}},setProgress(s){S&&(w.setProgress(s),s===void 0||Number.isNaN(s)?Q.classList.add("indeterminate"):(Q.classList.remove("indeterminate"),Q.style.width=`${(Ie(s)*100).toFixed(1)}%`))},signal(s){if(!S)return!1;const i=hn(s);return i?(P.push({type:"signal",atMs:Z(),phase:f??void 0,signal:i}),E?.signal?E.signal(i):(x.push(i),x.length>8&&x.shift()),O({type:"signal",data:{...i,phase:f,status:w.status}}),!0):(P.push({type:"signal-rejected",atMs:Z(),phase:f??void 0,reason:"INSUFFICIENT_EVIDENCE"}),O({type:"signal-rejected",data:{outcome:"UNKNOWN",reason:"INSUFFICIENT_EVIDENCE",phase:f,status:w.status}}),!1)},observe(s){if(!S)return!1;let i=!1,l=!0;const h=typeof s?.phase=="string"?s.phase.trim():"";return h&&(i=!0,$e.setPhase(h)),s?.signal&&(i=!0,l=$e.signal(s.signal)&&l),i&&l},async intervene(s){const i=globalThis.crypto?.randomUUID?.()??Math.random().toString(36).slice(2);if(!S)return{id:i,accepted:!1,reason:"SESSION_NOT_ACTIVE"};const l={kind:s.kind,label:typeof s.label=="string"?s.label.slice(0,96):void 0,payload:s.payload,id:i,atMs:Z()};P.push({type:"intervention",atMs:l.atMs,intervention:{id:l.id,kind:l.kind,label:l.label,atMs:l.atMs}}),O({type:"intervention",data:l});let h;if(!e.onIntervention)h={id:i,accepted:!1,reason:"NO_HOST_HANDLER"};else try{const k=await e.onIntervention(l);h={id:i,accepted:!!k?.accepted,reason:typeof k?.reason=="string"?k.reason.slice(0,160):void 0,evidenceRef:typeof k?.evidenceRef=="string"&&k.evidenceRef.trim()?k.evidenceRef.trim().slice(0,160):void 0}}catch{h={id:i,accepted:!1,reason:"HOST_HANDLER_FAILED"}}return P.push({type:"intervention-result",atMs:Z(),interventionResult:h}),O({type:"intervention-result",data:h}),h},complete(){Rt()},cancel(){De()},fail(s){Mt(s)}};return{start(s){return S&&De(),st(s)},async track(s,i){S&&De();const l=st(i);try{const h=await s;return l.complete(),h}catch(h){throw l.fail(h instanceof Error?h:new Error(String(h))),h}},setTheme(s){we(s)},show(){$t()},hide(){Wt()},destroy(){de||(ue(),de=!0,S=!1,cancelAnimationFrame(Se),document.removeEventListener("visibilitychange",at),Pe(),w.transition("destroyed"),r.remove(),n.hasAttribute("data-quickspin-active")&&n.removeAttribute("data-quickspin-active"))},on(s){return J=s,()=>{J===s&&(J=null)}},getLastCapsule(){return F?JSON.parse(JSON.stringify(F)):null},exportLastCapsule(){return F?JSON.stringify(F,null,2):null},get status(){return w.status}}}const Et=new Set(["completed","cancelled","failed","unknown"]),wt=new Set(["phase","signal","signal-rejected","intervention","intervention-result"]),yn=new Set(["retrieval","tool","artifact","warning"]),En=new Set(["cancel","retry","refine","custom"]);function ae(e){return typeof e=="number"&&Number.isFinite(e)&&e>=0}function St(e){if(!e||typeof e!="object")return!1;const n=e;return[n.phaseChanges,n.acceptedSignals,n.rejectedSignals,n.uniqueEvidenceRefs,n.interventions,n.acceptedInterventions,n.rejectedInterventions].every(t=>Number.isInteger(t)&&(t??-1)>=0)}function wn(e){if(!e||typeof e!="object")return!1;const n=e;return n.version!==1||typeof n.recordId!="string"||!Et.has(n.outcome)||!ae(n.actualWaitMs)||!ae(n.engagedPlayMs)||n.gameId!==null&&typeof n.gameId!="string"||n.score!==null&&typeof n.score!="number"||n.feltWaitMs!==null&&!ae(n.feltWaitMs)||!St(n.evidenceCoverage)||!Array.isArray(n.trail)||!ae(n.ts)?!1:n.trail.every(t=>{if(!t||typeof t!="object")return!1;const a=t;return wt.has(a.type)&&ae(a.atMs)})}function Sn(e){if(!wn(e))throw new Error("QuickSpin: invalid Wait Capsule.");const n=e.trail.map(t=>{const a={type:t.type,atMs:t.atMs};return t.type==="signal"&&t.signal&&(a.signalKind=t.signal.kind),t.type==="intervention"&&t.intervention&&(a.interventionKind=t.intervention.kind),t.type==="intervention-result"&&t.interventionResult&&(a.accepted=t.interventionResult.accepted),a});return{version:1,privacy:"redacted",source:"wait-capsule",outcome:e.outcome,actualWaitMs:e.actualWaitMs,engagedPlayMs:e.engagedPlayMs,gameId:e.gameId,score:e.score,feltWaitMs:e.feltWaitMs,evidenceCoverage:{...e.evidenceCoverage},timeline:n}}function Ke(e){if(!e||typeof e!="object")return!1;const n=e;return n.version!==1||n.privacy!=="redacted"||n.source!=="wait-capsule"||!Et.has(n.outcome)||!ae(n.actualWaitMs)||!ae(n.engagedPlayMs)||n.gameId!==null&&typeof n.gameId!="string"||n.score!==null&&typeof n.score!="number"||n.feltWaitMs!==null&&!ae(n.feltWaitMs)||!St(n.evidenceCoverage)||!Array.isArray(n.timeline)?!1:n.timeline.every(t=>!(!t||typeof t!="object"||!wt.has(t.type)||!ae(t.atMs)||t.signalKind!==void 0&&!yn.has(t.signalKind)||t.interventionKind!==void 0&&!En.has(t.interventionKind)||t.accepted!==void 0&&typeof t.accepted!="boolean"))}function xn(e){let n="";for(const t of e)n+=String.fromCharCode(t);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function kn(e){const n=e.replace(/-/g,"+").replace(/_/g,"/"),t=n+"=".repeat((4-n.length%4)%4),a=atob(t);return Uint8Array.from(a,r=>r.charCodeAt(0))}function Cn(e){if(!Ke(e))throw new Error("QuickSpin: invalid Wait Ghost.");return xn(new TextEncoder().encode(JSON.stringify(e)))}function qn(e){try{if(typeof e!="string"||e.length===0||e.length>32e3)return null;const n=new TextDecoder().decode(kn(e)),t=JSON.parse(n);return Ke(t)?t:null}catch{return null}}function An(e,n=1){if(!Ke(e))throw new Error("QuickSpin: invalid Wait Ghost.");const t=Number.isFinite(n)?Math.min(20,Math.max(.1,n)):1,a=e.timeline.map((d,v)=>({event:{...d},index:v})).sort((d,v)=>d.event.atMs-v.event.atMs||d.index-v.index);let r=0;return a.map(({event:d,index:v})=>{const c=Math.max(0,d.atMs-r)/t;return r=d.atMs,{index:v,delayMs:c,event:d}})}function In(e,n){const t=e.feltWaitMs!==null&&n.feltWaitMs!==null?n.feltWaitMs-e.feltWaitMs:null,a=e.score!==null&&n.score!==null?n.score-e.score:null;return{actualWaitDeltaMs:n.actualWaitMs-e.actualWaitMs,engagedPlayDeltaMs:n.engagedPlayMs-e.engagedPlayMs,feltWaitDeltaMs:t,scoreDelta:a,acceptedSignalsDelta:n.evidenceCoverage.acceptedSignals-e.evidenceCoverage.acceptedSignals,rejectedSignalsDelta:n.evidenceCoverage.rejectedSignals-e.evidenceCoverage.rejectedSignals,uniqueEvidenceRefsDelta:n.evidenceCoverage.uniqueEvidenceRefs-e.evidenceCoverage.uniqueEvidenceRefs,outcomeChanged:e.outcome!==n.outcome,fromOutcome:e.outcome,toOutcome:n.outcome}}const Ne=Math.PI*2,Re=(e,n=0,t=1)=>Math.max(n,Math.min(t,e)),Ye=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,Tn=(e,n=4)=>String(e).padStart(n,"0"),xt="'Geist Mono', 'SF Mono', ui-monospace, monospace",Xe="Inter, system-ui, -apple-system, 'Segoe UI', sans-serif";function Rn(e,n){const{ctx:t,w:a,h:r}=e,d=a/2,v=r*.42,c=Math.min(64,a*.14);t.clearRect(0,0,a,r),t.textAlign="center",t.beginPath(),t.arc(d,v,c,0,Ne),t.lineWidth=10,t.lineCap="round",t.strokeStyle="rgba(104,112,127,0.22)",t.stroke();const p=n/1500,u=-Math.PI/2+Ne*p;t.beginPath(),t.arc(d,v,c,-Math.PI/2,u),t.lineWidth=10,t.strokeStyle="#6658e8",t.stroke(),t.beginPath(),t.arc(d,v,c,u-.6,u),t.lineWidth=4,t.strokeStyle="rgba(102,88,232,0.3)",t.stroke(),t.font=`600 12px ${Xe}`,t.fillStyle="rgba(104,112,127,0.9)",t.fillText("classic “thinking…” spinner",d,v+c+34)}function Mn(e,n){const{ctx:t,w:a,h:r}=e,d=r*.8,v=a*.12,c=a*.62,p=a*.84,u=Ye(Re(n/700)),R=Re((n-700)/500),I=Ye(Re((n-1200)/800));t.clearRect(0,0,a,r),t.beginPath(),t.moveTo(0,d),t.lineTo(a,d),t.lineWidth=2,t.strokeStyle="rgba(23,24,29,0.16)",t.stroke();const q=30,T=46;t.fillStyle="#ffb547",t.beginPath(),t.roundRect(c-q/2,d-T,q,T,9),t.fill();const m=v+u*(c-v-34)+I*(p-c),y=d-Math.sin(R*Math.PI)*58;t.lineCap="round",t.lineWidth=4,t.strokeStyle="#6658e8";const b=Math.sin(n/90)*8;t.beginPath(),t.moveTo(m,y-8),t.lineTo(m-5+b,d-2),t.moveTo(m,y-8),t.lineTo(m+7-b,d-2),t.stroke(),t.fillStyle="#6658e8",t.beginPath(),t.roundRect(m-11,y-32,22,24,10),t.fill(),t.beginPath(),t.arc(m,y-36,6.5,0,Ne),t.fill(),t.fillStyle="#16b8b0",t.beginPath(),t.roundRect(m+1,y-39,8,4.5,2),t.fill(),t.font=`700 15px ${xt}`,t.textAlign="left",t.fillStyle="#17181d",t.fillText(`SCORE ${Tn(Math.round(Re(n/1500)*9876))}`,18,30),t.font=`600 12px ${Xe}`,t.textAlign="right",t.fillStyle="rgba(104,112,127,0.85)",t.fillText("…and a real score, streak, and best to protect",a-18,r-22)}function pt(e,n){const{ctx:t,w:a,h:r}=e,d=Ye(Re(n/500)),v=a/2,c=r*.44;t.clearRect(0,0,a,r),t.textAlign="center",t.beginPath(),t.arc(v,c,18+d*70,0,Ne),t.lineWidth=12,t.strokeStyle=`rgba(102,88,232,${.35*(1-d)})`,t.stroke(),t.beginPath(),t.arc(v,c,8+d*44,0,Ne),t.lineWidth=6,t.strokeStyle=`rgba(22,184,176,${.5*(1-d)})`,t.stroke(),t.font=`800 30px ${Xe}`,t.fillStyle="#17181d",t.fillText("wait over —",v,c-16),t.fillText("and they played it.",v,c+24),t.font=`700 15px ${xt}`,t.fillStyle="#6658e8",t.fillText("SCORE 9876  ·  DAY STREAK 3",v,c+58)}function Nn(e){const n=e.getContext("2d");if(!n)return;const t=Math.min(window.devicePixelRatio||1,2),a=()=>{const m=e.getBoundingClientRect();e.width=Math.max(1,Math.round(m.width*t)),e.height=Math.max(1,Math.round(m.height*t))};a(),new ResizeObserver(a).observe(e);const d=()=>e.width/t,v=()=>e.height/t,c=()=>({ctx:n,w:d(),h:v()});if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){n.save(),n.scale(t,t),pt(c(),60),n.restore();return}const p=2600,u=2400,I=p+u+2200,q=performance.now(),T=m=>{const y=(m-q)%I;n.save(),n.scale(t,t),y<p?Rn(c(),y):y<p+u?Mn(c(),y-p):pt(c(),y-p-u),n.restore(),requestAnimationFrame(T)};requestAnimationFrame(T)}const Ge=e=>new Promise(n=>setTimeout(n,e)),Ue=[{status:"Reasoning…",ms:2600,signal:{kind:"tool",label:"Planned constraints",evidenceRef:"demo:phase:reasoning"}},{status:"Searching the web…",ms:3100,signal:{kind:"retrieval",label:"Retrieved demo candidates",evidenceRef:"demo:phase:retrieval"}},{status:"Drafting…",ms:3400,signal:{kind:"artifact",label:"Assembled five demo candidates",evidenceRef:"demo:phase:draft"}},{status:"Polishing…",ms:2900,signal:{kind:"artifact",label:"Final answer assembled",evidenceRef:"demo:phase:final"}}],kt=[{path:"/",label:"Home"},{path:"/lab",label:"Lab"},{path:"/proof",label:"Proof"},{path:"/sdk",label:"SDK"}],Pn=[{path:"/judges",label:"Judges"}],Ln=[...kt,...Pn],Ct="Where should five friends eat tonight in Austin?",On=[{title:"Eastside taco patio",meta:"CASUAL · SHAREABLE",detail:"A lively first stop built around tacos, patio energy and easy group ordering."},{title:"Neighborhood izakaya",meta:"SMALL PLATES · SOCIAL",detail:"A more intimate option for skewers, small plates and a slower group dinner."},{title:"Mediterranean table",meta:"SHARED PLATES · FLEXIBLE",detail:"A share-forward direction with vegetarian-friendly options and broad group appeal."},{title:"Food hall mix",meta:"CHOICE · LOW FRICTION",detail:"Useful when five people want different cuisines without splitting the group."},{title:"Late-night pizza room",meta:"EASY · LATE",detail:"The low-planning fallback: slices, communal seating and an easy second stop."}],Dn=[{title:"Best direct match",meta:"PRIMARY",detail:"The strongest answer direction for the request as written."},{title:"Alternative angle",meta:"OPTION B",detail:"A meaningfully different route with a different trade-off profile."},{title:"Fastest path",meta:"LOW FRICTION",detail:"The option optimized for speed, simplicity and minimum setup."},{title:"Most flexible path",meta:"ADAPTABLE",detail:"The option that leaves the most room to refine constraints after the first pass."},{title:"Wildcard",meta:"EXPLORE",detail:"A deliberately different direction worth checking before committing."}];function Wn(){return new Promise((e,n)=>{window.setTimeout(()=>n(new Error("DEMO_PROVIDER_TIMEOUT")),1400)})}function $n(){const e=window.location.pathname.replace(/\/+$/,"")||"/";return Ln.some(n=>n.path===e)?e:"/"}function Hn(e,n){const t=kt.map(a=>`<a href="${a.path}" ${a.path===n?'aria-current="page"':""}>${a.label}</a>`).join("");return`
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
          <div class="footer-links"><a href="/lab">Live lab</a><a href="/proof">Evidence</a><a href="/sdk">SDK</a></div>
        </div>
      </footer>
    </div>`}function Oe(e,n,t,a){return`<header class="page-head">
    <div><div class="eyebrow">${e}</div><h1>${n}</h1><p>${t}</p></div>
    <div class="page-index">QuickSpin / ${a}<br>execution → play → evidence</div>
  </header>`}function Fn(){return`<main class="page">
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
      <div><div class="eyebrow">Four public surfaces / one product truth</div><h1>Not a landing page.<br>A product instrument.</h1><p>Each public route has one job: explain, demonstrate, prove, or integrate. Internal evaluation material stays out of the product-facing experience.</p></div>
      <div class="page-index">HOME → thesis<br>LAB → interaction<br>PROOF → evidence<br>SDK → repeatability</div>
    </section>
  </main>`}function Gn(){return`<main class="page">
    ${Oe("Live wait lab","Same wait. Different experience.","Run the exact 12-second control, then the QuickSpin path. The product can also demonstrate a real rejected-Promise failure without fabricating success.","02 / LAB")}
    <section class="lab-grid">
      <div class="lab-panel">
        <div class="panel-kicker"><span>EXPERIMENT / QS-12</span><span>CONTROLLED 12.0s</span></div>
        <div class="lab-storyline" aria-label="QuickSpin lab flow"><span>WAIT</span><i></i><span>PLAY</span><i></i><span>RECORD</span><i></i><span>DERIVE</span></div>
        <form id="prompt-form" class="prompt-composer">
          <label for="prompt-input">Try your own prompt</label>
          <textarea id="prompt-input" rows="2" maxlength="240" spellcheck="true">${Ct}</textarea>
          <div class="prompt-meta"><span>Same controlled 12-second wait · your prompt drives the demo</span><button id="run-demo" class="run" type="submit">Run my prompt</button></div>
        </form>
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
          <button id="run-failure" class="failure">Run negative-path proof</button>
          <button id="copy-capsule">Copy Evidence Capsule</button>
          <button id="copy-ghost" hidden>Copy redacted Wait Ghost link</button>
          <button id="replay-ghost" hidden>Replay Wait Ghost</button>
          <button id="reset-stats">Reset local evidence</button>
        </div>
        <section id="ghost-console" class="ghost-console" aria-label="Wait Ghost boundary" hidden><div class="ghost-console-head"><strong>WAIT GHOST</strong><span>REDACTED DERIVATIVE</span></div><div class="ghost-privacy"><span>NO PROMPT</span><span>NO LABELS</span><span>NO EVIDENCE REFS</span><span>NO PAYLOADS</span></div><div id="ghost-status" class="qs-phase">Replay-safe Wait Ghost ready from this run.</div></section>
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
  </main>`}function Un(){return`<main class="page">
    ${Oe("Evidence room","A receipt for the wait. A record for the failure.","QuickSpin treats waiting as an observable product state. Success, cancellation, failure and UNKNOWN remain distinct — because a polished interface is not evidence.","03 / PROOF")}
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
    <div class="route-actions"><a class="action signal" href="/lab">Run the live negative path →</a><a class="action" href="/sdk">Inspect the runtime contract</a></div>
  </main>`}function _n(){return`<main class="page">
    ${Oe("Integration surface","The product is the runtime contract — not one minigame.","Runner and Orbit consume the same lifecycle. Hosts can expose real phases and evidence-bearing execution signals without fabricating model progress.","04 / SDK")}
    <section class="lifecycle">
      ${["IDLE","WAITING","PLAYING","RESPONSE READY","COMPLETED","FAILED / CANCELLED"].map((n,t)=>`<div class="life"><b>0${t+1}</b><span>${n}</span></div>`).join("")}
    </section>
    <section class="contract-strip" aria-label="Runtime contract principles">
      <article><span>HOST AUTHORITY</span><strong>Observe. Do not invent.</strong><p>Phases and signals come from the host boundary.</p></article>
      <article><span>FAIL CLOSED</span><strong>No provenance, no gameplay claim.</strong><p>Insufficient evidence remains UNKNOWN.</p></article>
      <article><span>PORTABLE PROOF</span><strong>Private Capsule. Redacted Ghost.</strong><p>One contract across multiple waiting surfaces.</p></article>
    </section>
    <section class="code-panel"><div class="code-head"><span>Vanilla integration</span><span>evidence-aware</span></div><pre>${Yn(`const qs = createQuickSpin({ target: "#wait" });
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
  </main>`}function jn(){const e=[["RUBRIC","Waiting experience, originality, AI-native fit, repeatability and execution mapped to proof.","PASS"],["PAIN","Real AI latency/rejection states plus HCI evidence that wait presentation changes experience.","PASS"],["PROBLEM","Passive waiting gives little agency and can imply confidence the host does not actually have.","PASS"],["DIFFERENTIATOR","Observed execution becomes gameplay; private evidence becomes a Capsule; a redacted derivative becomes a shareable Wait Ghost.","PASS"],["EXECUTION","Two games, lifecycle, persistence, React/vanilla, accessibility, security gates.","PASS"],["EVIDENCE","Primary-source incident, tests, CI/CodeQL, runtime, Claim + Failure Ledgers.","PASS"],["STORY","One narrative: real wait → playable execution → truthful outcome.","PASS"],["DEMO","12-second control, Capsule, redacted Ghost replay, wait diff, failure and UNKNOWN.","READY"],["Q&A","Adversarial answer bank refuses unsupported claims instead of improvising them.","PREPARED"]],n=[["01","Signal / opportunity","AI products increasingly contain non-zero waits worth designing intentionally."],["02","Real negative event","OpenAI June 2–3, 2026 latency, rejection and degraded user flows."],["03","Observable impact","Response-start delay, HTTP 429 rejection, broken continuity and uncertainty."],["04","Design lesson","Waiting cannot silently mean success; unknown evidence must stay unknown."],["05","Mitigation","Playable wait, provenance, explicit terminal outcomes and directional receipt."]];return`<main class="page">
    ${Oe("Judge surface","Every claim has a route to proof.","This page compresses the build into judge logic: criterion → behavior → evidence → demo. It is intentionally explicit about what is verified, controlled, unknown, or refused.","05 / JUDGES")}
    <section class="judge-memory"><span>REMEMBER ONE THING</span><strong>QuickSpin turns AI waiting into a game you can verify afterward.</strong><div>PRIVATE CAPSULE → REDACTED GHOST → REPLAY / COMPARE</div></section>
    <section class="claim-matrix" aria-label="Claim classes"><article class="verified"><b>VERIFIED</b><strong>Observed execution can become play.</strong></article><article class="unknown"><b>UNKNOWN</b><strong>No evidence stays unresolved.</strong></article><article class="refused"><b>REFUSED</b><strong>QuickSpin does not claim faster models.</strong></article><article class="portable"><b>PORTABLE</b><strong>Capsule → Ghost → replay / compare.</strong></article></section>
    <section class="judge-cycle">${e.map(t=>`<div class="judge-row"><div class="stage">${t[0]}</div><div class="why">${t[1]}</div><div class="verdict">${t[2]}</div></div>`).join("")}</section>
    <section class="five-pattern">${n.map(t=>`<article class="pattern-step"><div class="n">${t[0]}</div><h3>${t[1]}</h3><p>${t[2]}</p></article>`).join("")}</section>
    <section class="evidence-panel"><div class="eyebrow">Canonical distinction</div><h2>QuickSpin is not trying to be the biggest AI waiting game.</h2><p>It is the reusable waiting layer that makes real execution playable, preserves failure truth, refuses unsupported signals, records a private Evidence Capsule, and derives a privacy-safe Wait Ghost for replay/share/compare. That evidence lifecycle is the product — the minigames are interchangeable implementations of the contract.</p><div class="route-actions"><a class="action signal" href="/lab">See it run →</a><a class="action" href="/proof">Inspect evidence</a><a class="action" href="/sdk">Inspect integration</a></div></section>
  </main>`}function Yn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Bn(){const e=document.getElementById("app");if(!e)return;const n=$n(),t=n==="/lab"?Gn():n==="/proof"?Un():n==="/sdk"?_n():n==="/judges"?jn():Fn();e.innerHTML=Hn(t,n);const a=e.querySelector(".hero-canvas");a&&Nn(a),n==="/lab"&&Qn(e)}function Qn(e){const n=e.querySelector("#qs-mount"),t=e.querySelector("#event-log"),a=e.querySelector("#classic-panel"),r=e.querySelector("#qs-panel"),d=Array.from(e.querySelectorAll(".seg button")),v=e.querySelector("#prompt-form"),c=e.querySelector("#prompt-input"),p=e.querySelector("#run-demo"),u=e.querySelector("#run-failure"),R=e.querySelector("#copy-capsule"),I=e.querySelector("#copy-ghost"),q=e.querySelector("#replay-ghost"),T=e.querySelector("#ghost-status"),m=e.querySelector("#ghost-console"),y=e.querySelector("#reset-stats"),b=e.querySelector("#qs-phase"),C=e.querySelector("#classic-phase"),N={target:n,delayMs:0,onEvent:o=>{const f=document.createElement("div");f.textContent=`[${new Date().toLocaleTimeString()}] ${o.type}${o.data?" "+JSON.stringify(o.data):""}`,t.appendChild(f),t.scrollTop=t.scrollHeight},onIntervention:o=>({id:o.id,accepted:o.kind==="refine",reason:o.kind==="refine"?"HOST_APPLIED_REFINEMENT":"DEMO_HOST_REFUSED_INTENT",evidenceRef:o.kind==="refine"?"demo:intervention:walkability":void 0})};let D=ut(N);const B=new URLSearchParams(window.location.hash.replace(/^#/,""));let g=qn(B.get("ghost")??""),z="quickspin",W=!1;const se=o=>{z=o;for(const f of d)f.setAttribute("aria-pressed",o===f.dataset.mode?"true":"false");a.style.display=o==="classic"?"":"none",r.style.display=o==="quickspin"?"":"none"},he=(o,f)=>{const M=(z==="classic"?a:r).querySelector(".chat"),x=document.createElement("div");x.className=`bubble ${f}`,x.textContent=o,M.appendChild(x)},Q=o=>/dinner|restaurant|eat|food|taco|lunch|brunch/i.test(o)?On:Dn,Ee=o=>{const A=(z==="classic"?a:r).querySelector(".chat"),M=document.createElement("section");M.className="demo-results";const x=document.createElement("div");x.className="demo-results-head";const P=document.createElement("strong");P.textContent="Five demo results";const F=document.createElement("span");F.textContent="Illustrative local response · not a live web search",x.append(P,F);const $=document.createElement("p");$.className="demo-results-query",$.textContent=`For: “${o}”`;const w=document.createElement("div");w.className="demo-results-list",Q(o).forEach((J,O)=>{const Z=document.createElement("article");Z.className="demo-result";const ve=document.createElement("b");ve.textContent=String(O+1).padStart(2,"0");const ue=document.createElement("div"),j=document.createElement("strong");j.textContent=J.title;const pe=document.createElement("span");pe.textContent=J.meta;const xe=document.createElement("p");xe.textContent=J.detail,ue.append(j,pe,xe),Z.append(ve,ue),w.appendChild(Z)}),M.append(x,$,w),A.appendChild(M)},we=()=>{m.hidden=!1,I.hidden=!1,q.hidden=!1},E=()=>{m.hidden=!0,I.hidden=!0,q.hidden=!0},S=()=>{const o=(A,M)=>{const x=e.querySelector(`#${A} .num`);x&&(x.textContent=M)};o("stat-sessions",String(bt())),o("stat-wait",_e(vt())),o("stat-best",Te("runner")??"—");const f=fn();o("stat-felt",f.samples>0?`${Math.round(f.avgRatio*100)}%`:"—"),o("stat-streak",String(yt()))},G=o=>o.type==="signal"?`signal · ${o.signalKind??"unknown-kind"}`:o.type==="signal-rejected"?"UNKNOWN · signal rejected":o.type==="intervention"?`intervention · ${o.interventionKind??"custom"}`:o.type==="intervention-result"?`intervention result · ${o.accepted?"accepted":"rejected"}`:o.type,U=()=>{const o=D.getLastCapsule();return o?Sn(o):null},K=()=>{const o=D.getLastCapsule();if(!g||!o)return;const f=In(g,o),A=`${f.actualWaitDeltaMs>=0?"+":"−"}${_e(Math.abs(f.actualWaitDeltaMs))}`,M=`${f.engagedPlayDeltaMs>=0?"+":"−"}${_e(Math.abs(f.engagedPlayDeltaMs))}`;T.textContent=`Wait diff · current − shared ghost: actual ${A}; engaged ${M}; outcome ${f.fromOutcome} → ${f.toOutcome}. No winner score.`},Se=async o=>{if(!W){W=!0,q.disabled=!0,q.textContent="Replaying redacted timeline…",T.textContent="WAIT GHOST REPLAY · redacted historical artifact · not live AI.";for(const f of An(o,6)){await Ge(Math.min(f.delayMs,1200));const A=document.createElement("div");A.textContent=`[WAIT GHOST +${Math.round(f.event.atMs)}ms] ${G(f.event)}`,t.appendChild(A),t.scrollTop=t.scrollHeight}T.textContent=`Wait Ghost replay complete · ${o.timeline.length} redacted event(s) · source outcome ${o.outcome}. Replay did not emit host execution signals.`,W=!1,q.disabled=!1,q.textContent="Replay Wait Ghost",K()}},ce=async o=>{C.textContent="";const f=a.querySelector(".chat"),A=f.querySelector(".thinking"),M=f.querySelector(".fill"),x=f.querySelector(".progress-label");A.style.display="flex";let P=0;for(const F of Ue){A.querySelector(".spinner-label").textContent=F.status,P+=F.ms;const $=P/12e3;M.style.width=`${Math.round($*100)}%`,x.textContent=`${Math.round($*100)}%`,await Ge(F.ms)}A.style.display="none",Ee(o)},_=async o=>{const f=D.start({status:Ue[0].status});f.setProgress(),f.signal({kind:"retrieval",label:"Unproven retrieval candidate",evidenceRef:""});const A=await f.intervene({kind:"refine",label:"Apply the user-requested constraints in the final ranking"});for(const x of Ue)f.setPhase(x.status),f.signal(x.signal),b.innerHTML=`Phase: <strong>${x.status}</strong> · signal: <strong>${x.signal.kind}</strong> — ${x.signal.label}`,await Ge(x.ms);f.complete();const M=D.getLastCapsule();b.innerHTML="Phase: <strong>Done</strong> — Evidence Capsule retained <strong>"+String(M?.evidenceCoverage.acceptedSignals??0)+"</strong> accepted signal(s), <strong>"+String(M?.evidenceCoverage.rejectedSignals??0)+"</strong> UNKNOWN/rejected signal(s), and host intervention <strong>"+(A.accepted?"ACKNOWLEDGED":"REJECTED")+"</strong>.",Ee(o),we(),T.textContent="Replay-safe Wait Ghost ready from this run. Share it only if you want to compare the waiting experience.",S(),K()},H=async()=>{if(W)return;W=!0,p.disabled=!0,u.disabled=!0,p.textContent="Running…";const o=c.value.trim()||Ct;c.value=o,he(o,"user"),z==="classic"?await ce(o):await _(o),W=!1,p.disabled=!1,u.disabled=!1,p.textContent="Run my prompt"},de=async()=>{if(W)return;W=!0,se("quickspin"),p.disabled=!0,u.disabled=!0,u.textContent="Failure in flight…",he("Find dinner options, but preserve failure truth if the provider rejects.","user");const o=D.start({status:"Calling restaurant search provider…"});o.setProgress(),o.setPhase("Calling restaurant search provider…"),b.innerHTML="Negative path: <strong>provider call in flight</strong> — no success assumed.";try{await Wn()}catch(f){const A=f instanceof Error?f:new Error(String(f));o.signal({kind:"warning",label:"Provider request rejected",evidenceRef:"demo:negative-path:promise-rejection"}),o.fail(A),b.innerHTML=`Negative path: <strong>FAILED</strong> — ${A.message}. No AI answer was fabricated.`,S()}W=!1,p.disabled=!1,u.disabled=!1,u.textContent="Run negative-path proof"};v.addEventListener("submit",o=>{o.preventDefault(),H()}),u.addEventListener("click",()=>{de()}),R.addEventListener("click",()=>{const o=D.exportLastCapsule();if(!o){R.textContent="Run a QuickSpin path first";return}navigator.clipboard?.writeText(o),R.textContent="Evidence Capsule copied"}),I.addEventListener("click",()=>{const o=U();if(!o){I.textContent="Run a QuickSpin path first";return}g=o;const f=new URL(window.location.href);f.hash=`ghost=${Cn(o)}`,window.history.replaceState(null,"",f),navigator.clipboard?.writeText(f.toString()),I.textContent="Redacted Wait Ghost link copied",T.textContent=`Wait Ghost ready · ${o.timeline.length} redacted event(s). Labels, evidence refs, payloads, record id, timestamp and failure details are excluded.`}),q.addEventListener("click",()=>{const o=g??U();if(!o){T.textContent="No Wait Ghost available. Run QuickSpin or open a shared #ghost link first.";return}Se(o)}),y.addEventListener("click",()=>{D.destroy(),n.innerHTML="",mn(),t.innerHTML="",D=ut(N),R.textContent="Copy Evidence Capsule",I.textContent="Copy redacted Wait Ghost link",E(),S()});for(const o of d)o.addEventListener("click",()=>!W&&se(o.dataset.mode??"quickspin"));se("quickspin"),g?(we(),T.textContent=`Shared Wait Ghost loaded · ${g.timeline.length} redacted event(s) · outcome ${g.outcome}. Replay is historical, not live AI.`):E(),S()}function _e(e){return`${Math.round(e/1e3)}s`}Bn();

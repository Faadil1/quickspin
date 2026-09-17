(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const d of o)if(d.type==="childList")for(const v of d.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&s(v)}).observe(document,{childList:!0,subtree:!0});function t(o){const d={};return o.integrity&&(d.integrity=o.integrity),o.referrerPolicy&&(d.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?d.credentials="include":o.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function s(o){if(o.ep)return;o.ep=!0;const d=t(o);fetch(o.href,d)}})();const Ft=new Set(["completed","cancelled","failed","destroyed"]),Ut={idle:new Set(["waiting","destroyed"]),waiting:new Set(["playing","response-ready","completed","cancelled","failed","destroyed"]),playing:new Set(["response-ready","completed","cancelled","failed","destroyed"]),"response-ready":new Set(["completed","playing","cancelled","failed","destroyed"]),completed:new Set(["idle","destroyed"]),cancelled:new Set(["idle","destroyed"]),failed:new Set(["idle","destroyed"]),destroyed:new Set};class _t{_status="idle";_progress=null;_emit;constructor(n){this._emit=n}get status(){return this._status}get progress(){return this._progress}get isTerminal(){return Ft.has(this._status)}transition(n){if(this._status===n)return!0;const t=this._status,s=Ut[t];return!s||!s.has(n)?!1:(this._status=n,n==="idle"&&(this._progress=null),this._emit({type:"phase",data:{from:t,to:n}}),!0)}setProgress(n){n===void 0||Number.isNaN(n)?this._progress=null:this._progress=Math.max(0,Math.min(1,n)),this._emit({type:"progress",data:this._progress})}}const jt=String.raw`
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
`,we=40,je=24,te=18,Yt=2400;function Bt(e){switch(e){case"retrieval":return 150;case"tool":return 200;case"artifact":return 250;case"warning":return 300}}function ut(e){e.signalActive=!1,e.signalKind=null,e.signalLabel=null}function it(e,n){const t=n-44;return{speed:0,groundY:t,playerY:t-we,vy:0,grounded:!0,obstacleX:e+40,obstacleW:30,obstacleH:52,distance:0,crashed:!1,ready:!0,signalX:e+24,signalY:t-84,signalKind:null,signalLabel:null,signalActive:!1,signalBonus:0,signalsCollected:0}}function Qt(e,n,t,s){if(e.crashed)return;const o=Math.max(0,Math.min(1,s??0));e.speed=220*(1+.9*o),e.distance+=e.speed*n,e.grounded||(e.vy+=Yt*n,e.playerY+=e.vy*n,e.playerY>=e.groundY-we&&(e.playerY=e.groundY-we,e.vy=0,e.grounded=!0)),e.obstacleX-=e.speed*n,e.obstacleX+e.obstacleW<0&&(e.obstacleX=t+40+(180+Math.random()*140),e.obstacleH=40+Math.random()*28),e.signalActive&&(e.signalX-=e.speed*.92*n,e.signalX+te<0&&ut(e))}function rt(e){e.crashed||e.grounded&&(e.grounded=!1,e.vy=-720)}function Kt(e){if(e.crashed)return!1;const n=8;return e.obstacleX<n+je&&e.obstacleX+e.obstacleW>n&&e.playerY+we-6>e.groundY-e.obstacleH&&e.playerY<e.groundY-2}function Vt(e,n,t){return e.crashed||e.signalActive?!1:(e.signalX=n+24,e.signalY=e.groundY-84,e.signalKind=t.kind,e.signalLabel=t.label,e.signalActive=!0,!0)}function Xt(e){if(!e.signalActive||e.crashed||!e.signalKind)return!1;const n=8,t=e.playerY;return e.signalX<n+je&&e.signalX+te>n&&e.signalY<t+we&&e.signalY+te>t?(e.signalBonus+=Bt(e.signalKind),e.signalsCollected+=1,ut(e),!0):!1}function zt(e,n){const t=Math.max(0,Math.floor(e.distance)+e.signalBonus),s=[];return e.signalsCollected>0&&s.push(`AI signals collected: ${e.signalsCollected}`),n==="ai-complete"&&s.push("AI finished — you beat the wait."),n==="player-failed"&&s.push("Crashed — the wait wins this round."),{score:t,label:`${t.toLocaleString()} m`,notes:s,reason:n}}function Jt(e){switch(e){case"retrieval":return"#72d8ff";case"tool":return"#b99cff";case"artifact":return"#60efb7";case"warning":return"#ffcf70";default:return"#ffffff"}}const pt={id:"runner",name:"Wait Runner",tagline:"Outrun the wait.",controls:"Space or tap to jump · collect live AI signals",create(e){let n=e.canvas.clientWidth||480,t=e.canvas.clientHeight||220,s=it(n,t),o=!1,d=0,v=0;const c=[],p=e.canvas.getContext("2d"),u=()=>{const g=Math.min(window.devicePixelRatio||1,2);n=e.canvas.clientWidth||480,t=e.canvas.clientHeight||220;const w=Math.round(n*g),b=Math.round(t*g);(d!==w||v!==b||e.canvas.width!==w||e.canvas.height!==b)&&(d=w,v=b,e.canvas.width=w,e.canvas.height=b,p?.setTransform(g,0,0,g,0,0),s=it(n,t))},N=()=>{if(s.signalActive)return;const g=c.shift();g&&Vt(s,n,g)},A=g=>{if(g.code!=="Space")return;const w=g.target;w&&(w.tagName==="INPUT"||w.tagName==="TEXTAREA"||w.isContentEditable)||w&&w!==e.root&&w!==e.canvas||(g.preventDefault(),rt(s))},M=g=>{g.preventDefault(),rt(s)},R=()=>{if(p&&(p.clearRect(0,0,n,t),p.strokeStyle="rgba(255,214,106,0.55)",p.lineWidth=2,p.beginPath(),p.moveTo(0,s.groundY),p.lineTo(n,s.groundY),p.stroke(),s.obstacleX+s.obstacleW>0&&s.obstacleX<n&&(p.fillStyle="rgba(255,120,120,0.85)",p.fillRect(s.obstacleX,s.groundY-s.obstacleH,s.obstacleW,s.obstacleH)),s.signalActive&&s.signalX<n&&(p.save(),p.translate(s.signalX+te/2,s.signalY+te/2),p.rotate(Math.PI/4),p.fillStyle=Jt(s.signalKind),p.fillRect(-te/2,-te/2,te,te),p.restore(),p.font="10px system-ui, sans-serif",p.fillStyle="rgba(255,255,255,0.78)",p.fillText((s.signalLabel??s.signalKind??"signal").slice(0,22),8,28)),p.fillStyle="rgba(255,214,106,0.95)",p.fillRect(8,s.playerY,je,we),p.font="10px system-ui, sans-serif",p.fillStyle="rgba(255,255,255,0.5)",p.fillText(`${s.distance.toFixed(0)} m · signals ${s.signalsCollected}`,8,12),e.phase)){const g=e.phase.slice(0,30),w=p.measureText(g).width;p.fillStyle="rgba(255,255,255,0.45)",p.fillText(g,Math.max(8,n-w-8),12)}};return{start(){o=!1,u(),e.root.tabIndex=0,e.canvas.tabIndex=0,e.root.addEventListener("keydown",A),e.canvas.addEventListener("pointerdown",M),e.canvas.setAttribute("aria-label",pt.name+": keep a character running by jumping over obstacles while the model thinks. Space or tap to jump. Live host execution signals appear as collectible diamonds."),N()},tick(g,w){o||(u(),Qt(s,Math.min(w,.05),n,e.intensity),Xt(s),N(),Kt(s)&&(s.crashed=!0,e.finish("player-failed")),R())},signal(g){c.push(g),c.length>8&&c.shift(),N()},finish(g){return zt(s,g)},pause(){o=!0},resume(){o=!1},destroy(){e.root.removeEventListener("keydown",A),e.canvas.removeEventListener("pointerdown",M)}}}};function Zt(e){switch(e){case"retrieval":return 150;case"tool":return 200;case"artifact":return 250;case"warning":return 300}}function en(e){switch(e){case"retrieval":return"#72d8ff";case"tool":return"#b99cff";case"artifact":return"#60efb7";case"warning":return"#ffcf70";default:return"#60efb7"}}function ot(e,n){return{baseSpeed:60,fishX:e/2,fishY:n/2,vx:60,vy:40,caught:0,misses:0,combo:0,bestCombo:0,radius:9,active:!0,signalBonus:0,signalsCaught:0}}function tn(e,n,t,s,o){if(!e.active)return;const v=1+Math.max(0,Math.min(1,o??0))*1.5+Math.min(e.combo,8)*.05;e.fishX+=e.vx*v*n,e.fishY+=e.vy*v*n;const c=14;e.fishX<c&&(e.fishX=c,e.vx=Math.abs(e.vx)),e.fishX>t-c&&(e.fishX=t-c,e.vx=-Math.abs(e.vx)),e.fishY<c&&(e.fishY=c,e.vy=Math.abs(e.vy)),e.fishY>s-c&&(e.fishY=s-c,e.vy=-Math.abs(e.vy))}function nn(e,n,t,s,o){const v=Math.hypot(n-e.fishX,t-e.fishY)<34&&e.active;if(v){e.caught+=1,e.combo+=1,e.bestCombo=Math.max(e.bestCombo,e.combo),e.fishX=28+Math.random()*Math.max(1,s-56),e.fishY=28+Math.random()*Math.max(1,o-56);const c=Math.random()*Math.PI*2;e.vx=Math.cos(c)*(70+Math.random()*90),e.vy=Math.sin(c)*(70+Math.random()*90)}else e.misses+=1,e.combo=0;return v}function sn(e,n){e.signalBonus+=Zt(n.kind),e.signalsCaught+=1}function an(e,n){const t=e.caught+e.misses,s=t>0?e.caught/t:0,o=Math.max(0,Math.round(e.caught*1e3*(.4+s*.6)+e.bestCombo*50+e.signalBonus)),d=[];return e.caught>=3&&d.push(`Best combo: ${e.bestCombo}`),e.signalsCaught>0&&d.push(`AI signals caught: ${e.signalsCaught}`),n==="ai-complete"&&d.push("AI finished — you beat the wait."),{score:o,label:`${o.toLocaleString()} pts`,notes:d,reason:n}}const ft={id:"orbit",name:"Orbit Catch",tagline:"Catch the glow target. Multi-catch, combo-scored.",controls:"Tap/click or press Space/Enter · catch live AI signals",create(e){let n=e.canvas.clientWidth||480,t=e.canvas.clientHeight||220,s=ot(n,t),o=!1,d=0,v=0,c=null;const p=[],u=e.canvas.getContext("2d"),N=()=>{const b=Math.min(window.devicePixelRatio||1,2);n=e.canvas.clientWidth||480,t=e.canvas.clientHeight||220;const C=Math.round(n*b),O=Math.round(t*b);(d!==C||v!==O||e.canvas.width!==C||e.canvas.height!==O)&&(d=C,v=O,e.canvas.width=C,e.canvas.height=O,u?.setTransform(b,0,0,b,0,0),s=ot(n,t))},A=()=>{c||(c=p.shift()??null)},M=(b,C)=>{const O=nn(s,b,C,n,t);return O&&c&&(sn(s,c),c=p.shift()??null),O},R=b=>{if(!s.active)return;b.preventDefault();const C=e.canvas.getBoundingClientRect();M(b.clientX-C.left,b.clientY-C.top)},g=b=>{!s.active||b.key!=="Enter"&&b.code!=="Space"||(b.preventDefault(),M(s.fishX,s.fishY))},w=()=>{if(!u)return;u.clearRect(0,0,n,t),u.save(),u.strokeStyle="rgba(24,26,39,0.4)",u.lineWidth=1;const b=30;for(let P=0;P<=n;P+=b)u.beginPath(),u.moveTo(P,0),u.lineTo(P,t),u.stroke();for(let P=0;P<=t;P+=b)u.beginPath(),u.moveTo(0,P),u.lineTo(n,P),u.stroke();u.restore();const C=en(c?.kind??null),O=u.createRadialGradient(s.fishX,s.fishY,0,s.fishX,s.fishY,30);if(O.addColorStop(0,`${C}e6`),O.addColorStop(1,`${C}00`),u.fillStyle=O,u.beginPath(),u.arc(s.fishX,s.fishY,30,0,Math.PI*2),u.fill(),u.fillStyle=C,u.beginPath(),u.arc(s.fishX,s.fishY,s.radius,0,Math.PI*2),u.fill(),u.font="10px system-ui, sans-serif",u.fillStyle="rgba(255,255,255,0.55)",u.fillText(`caught ${s.caught} · signals ${s.signalsCaught} · combo ${s.combo} · accuracy ${s.caught>0||s.misses>0?Math.round(s.caught/Math.max(1,s.caught+s.misses)*100):0}%`,8,12),c&&(u.fillStyle="rgba(255,255,255,0.8)",u.fillText(`${c.kind}: ${c.label}`.slice(0,44),8,28)),e.phase){const P=e.phase.slice(0,30),$=u.measureText(P).width;u.fillStyle="rgba(255,255,255,0.45)",u.fillText(P,Math.max(8,n-$-8),t-10)}};return{start(){o=!1,N(),e.canvas.tabIndex=0,e.canvas.addEventListener("pointerdown",R),e.canvas.addEventListener("keydown",g),e.canvas.setAttribute("aria-label",ft.name+": catch the glow target while the model thinks. Tap or click the target, or press Space or Enter when the canvas is focused. Host execution signals are attached to live targets and score only when caught."),A()},tick(b,C){o||(N(),tn(s,Math.min(C,.05),n,t,e.intensity),w())},signal(b){c?(p.push(b),p.length>8&&p.shift()):c=b},finish(b){return an(s,b)},pause(){o=!0},resume(){o=!1},destroy(){e.canvas.removeEventListener("pointerdown",R),e.canvas.removeEventListener("keydown",g)}}}},Ye="quickspin:sessions:v1",Ue=1e3;function rn(){return{phaseChanges:0,acceptedSignals:0,rejectedSignals:0,uniqueEvidenceRefs:0,interventions:0,acceptedInterventions:0,rejectedInterventions:0}}function Re(e){const n=new Set,t=rn();for(const s of e)s.type==="phase"&&(t.phaseChanges+=1),s.type==="signal"&&(t.acceptedSignals+=1,s.signal?.evidenceRef&&n.add(s.signal.evidenceRef)),s.type==="signal-rejected"&&(t.rejectedSignals+=1),s.type==="intervention"&&(t.interventions+=1),s.type==="intervention-result"&&(s.interventionResult?.accepted?t.acceptedInterventions+=1:t.rejectedInterventions+=1,s.interventionResult?.evidenceRef&&n.add(s.interventionResult.evidenceRef));return t.uniqueEvidenceRefs=n.size,t}function le(){try{const e=localStorage.getItem(Ye);if(!e)return{version:1,records:[]};const n=JSON.parse(e);return Array.isArray(n.records)?{version:1,records:n.records.filter(s=>typeof s?.ts=="number").slice(-Ue)}:{version:1,records:[]}}catch{return{version:1,records:[]}}}function gt(e){try{localStorage.setItem(Ye,JSON.stringify(e))}catch{}}function on(e){let n=0;for(let t=e.length-1;t>=0&&e[t].completed;t--)n+=1;return n}function Ge(e){const n=le(),t=e.gameId?dn(e.gameId):0,s=e.completed&&!!e.gameId&&(e.score??0)>t,o=globalThis.crypto?.randomUUID?.()??Math.random().toString(36).slice(2),d=(e.trail??[]).map(p=>({...p})),v=e.evidenceCoverage??Re(d),c={id:o,gameId:e.gameId,score:e.completed?e.score:null,actualWaitMs:e.actualWaitMs,engagedPlayMs:e.engagedPlayMs,feltWaitMs:e.feltWaitMs??null,completed:e.completed,outcome:e.outcome??(e.completed?"completed":"unknown"),failureCode:e.failureCode??null,failureMessage:e.failureMessage??null,trail:d,evidenceCoverage:v,ts:Date.now()};return n.records.push(c),n.records.length>Ue&&(n.records=n.records.slice(-Ue)),gt(n),{id:o,isHighScore:s,dayStreak:vt(),sessionStreak:on(n.records),record:{...c,trail:[...d],evidenceCoverage:{...v}}}}function ln(e,n){const t=le(),s=t.records.find(o=>o.id===e);return!s||!s.completed||!Number.isFinite(n)||n<0?null:(s.feltWaitMs=n,gt(t),{...s})}function cn(e){const n=[...e.trail??[]];return{version:1,recordId:e.id,outcome:e.outcome??(e.completed?"completed":"unknown"),actualWaitMs:e.actualWaitMs,engagedPlayMs:e.engagedPlayMs,gameId:e.gameId,score:e.score,feltWaitMs:e.feltWaitMs??null,failureCode:e.failureCode??null,failureMessage:e.failureMessage??null,evidenceCoverage:e.evidenceCoverage??Re(n),trail:n,ts:e.ts}}function dn(e){return le().records.filter(t=>t.gameId===e&&t.completed&&typeof t.score=="number").reduce((t,s)=>s.score>t?s.score:t,0)}function Me(e){const t=le().records.filter(s=>s.gameId===e&&s.completed&&typeof s.score=="number").sort((s,o)=>(o.score??0)-(s.score??0))[0];return t?`${t.score}`:null}function mt(){return le().records.filter(n=>n.completed).reduce((n,t)=>n+Math.min(t.actualWaitMs,Math.max(0,t.engagedPlayMs)),0)}function ht(){return le().records.length}function vt(){const e=le(),n=new Set(e.records.filter(o=>o.completed).map(o=>new Date(o.ts).toDateString()));let t=0;const s=new Date(Date.now());for(;n.has(s.toDateString());)t++,s.setDate(s.getDate()-1);return t}function un(){const n=le().records.filter(o=>typeof o.feltWaitMs=="number"&&o.actualWaitMs>0);if(n.length===0)return{samples:0,avgRatio:0,avgDeltaMs:0};const t=n.reduce((o,d)=>o+(d.feltWaitMs??0)/d.actualWaitMs,0),s=n.reduce((o,d)=>o+((d.feltWaitMs??0)-d.actualWaitMs),0);return{samples:n.length,avgRatio:t/n.length,avgDeltaMs:s/n.length}}function pn(){try{localStorage.removeItem(Ye)}catch{}}const ee={runner:pt,orbit:ft},fn=new Set(["retrieval","tool","artifact","warning"]);function gn(e){const n=e?.kind,t=typeof e?.label=="string"?e.label.trim():"",s=typeof e?.evidenceRef=="string"?e.evidenceRef.trim():"";return!fn.has(n)||!t||!s?null:{kind:n,label:t.slice(0,64),evidenceRef:s.slice(0,160)}}const lt={mode:"dark",primary:"#8b7cff",surface:"#10111a",elevated:"#181a27",game:"#202334",text:"#f8f9fc",muted:"#a9b0c0",border:"rgba(255,255,255,0.1)",success:"#16a36a",radius:"16px",font:'Inter, system-ui, -apple-system, "Segoe UI", sans-serif'},mn={mode:"light",primary:"#6658e8",surface:"#ffffff",elevated:"#f3f4f8",game:"#eef0f6",text:"#17181d",muted:"#68707f",border:"rgba(16,17,26,0.1)",success:"#16a36a",radius:"16px",font:'Inter, system-ui, -apple-system, "Segoe UI", sans-serif'};function hn(e){if(e instanceof HTMLElement)return e;if(typeof e=="string"){const n=document.querySelector(e);if(n instanceof HTMLElement)return n}throw new Error("QuickSpin: no target element found. Pass a selector or element.")}function V(e){return`${Math.max(0,Math.round(e/1e3))}s`}function Ie(e){return Math.max(0,Math.min(1,e))}function ct(e={}){const n=hn(e.target),t=Math.max(0,e.delayMs??650);let s=ee[e.game??""]?e.game:"runner";const o=document.createElement("div");o.style.display="none";const d=o.attachShadow({mode:"open"}),v=document.createElement("style");v.textContent=jt,d.appendChild(v);const c=document.createElement("div");c.className="quickspin-root";const p=document.createElement("div");p.className="quickspin-collapsed";const u=document.createElement("span");u.className="quickspin-collapsed-text",u.textContent="QuickSpin · AI working";const N=document.createElement("button");N.className="quickspin-btn-primary quickspin-reopen",N.type="button",N.textContent="Resume play",p.appendChild(u),p.appendChild(N);const A=document.createElement("div");A.className="quickspin-header";const M=document.createElement("div");M.className="quickspin-brand";const R=document.createElement("span");R.className="quickspin-dot",M.appendChild(R),M.appendChild(document.createTextNode("QuickSpin"));const g=document.createElement("div");g.className="quickspin-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.textContent="Waiting for the model…";const w=document.createElement("div");w.className="quickspin-elapsed",w.textContent="0s";const b=document.createElement("div");b.className="quickspin-tools";const C=document.createElement("button");C.className="quickspin-btn",C.type="button",C.textContent="—",C.title="Collapse QuickSpin (game pauses)",C.setAttribute("aria-label","Collapse QuickSpin"),b.appendChild(C),A.appendChild(M),A.appendChild(g),A.appendChild(w),A.appendChild(b);const O=document.createElement("div");O.className="quickspin-games";const P=[];for(const a of Object.keys(ee)){const r=document.createElement("button");r.className="quickspin-gamebtn",r.type="button",r.textContent=ee[a].name,r.setAttribute("aria-pressed",s===a?"true":"false"),r.addEventListener("click",()=>kt(a)),P.push(r),O.appendChild(r)}const $=document.createElement("div");$.className="quickspin-stage";const Y=document.createElement("canvas");Y.className="quickspin-canvas",Y.width=480,Y.height=220;const m=document.createElement("div");m.className="quickspin-overlay",m.hidden=!0,$.appendChild(Y),$.appendChild(m);const X=document.createElement("div");X.className="quickspin-footer";const H=document.createElement("span");H.textContent=ee[s].controls;const se=document.createElement("span");se.textContent="",X.appendChild(H),X.appendChild(se);const ce=document.createElement("div");ce.className="quickspin-progress";const U=document.createElement("div");U.className="quickspin-progress-fill",ce.appendChild(U),c.appendChild(p),c.appendChild(A),c.appendChild(O),c.appendChild($),c.appendChild(ce),c.appendChild(X),d.appendChild(c),n.appendChild(o),n.setAttribute("data-quickspin-active","true");let Ee=e.theme??lt;function Se(a){Ee=a;const l={...a.mode==="light"?mn:lt,...a};o.style.setProperty("--qs-primary",l.primary),o.style.setProperty("--qs-surface",l.surface),o.style.setProperty("--qs-elevated",l.elevated),o.style.setProperty("--qs-game",l.game),o.style.setProperty("--qs-text",l.text),o.style.setProperty("--qs-muted",l.muted),o.style.setProperty("--qs-border",l.border),o.style.setProperty("--qs-success",l.success),o.style.setProperty("--qs-radius",l.radius),o.style.setProperty("--qs-font",l.font)}Se(Ee);let E=null,T=!1,W=0,B=0,Q=0,ve=0,de=!1,_=!1,F=!1,ue=!1,pe=null,i=null,f=-1,y=0;const x=[],S=[];let L=null,G="Waiting for the model…";const k=new _t(I);let z=null;function I(a){e.onEvent&&e.onEvent(a),z&&z(a)}function J(){return W>0?Math.max(0,performance.now()-W):0}function ye(a){L=cn(a),I({type:"capsule",data:L})}function fe(){pe!=null&&(window.clearTimeout(pe),pe=null)}function D(){const a=F&&!de;o.style.display=a?"":"none",c.classList.toggle("is-collapsed",_)}function ae(){if(!T){u.textContent="QuickSpin · response ready";return}const a=V(performance.now()-W),r=i??G;u.textContent=`QuickSpin · ${r} · ${a}`}function xe(a){if(ue)return;ve=requestAnimationFrame(xe);const r=Q?(a-Q)/1e3:0;Q=a,T&&(w.textContent=V(performance.now()-W),ae(),k.progress==null&&U.classList.add("indeterminate")),T&&E&&F&&!_&&!de&&!document.hidden&&E?(E.resume(),E.tick(a,r),B+=r*1e3):E&&E.pause()}function Ke(a){for(const r of P)r.setAttribute("aria-pressed",ee[a].name===r.textContent?"true":"false");H.textContent=ee[a].controls}function kt(a){if(!ee[a])return;const r=E!=null;s=a,Ke(a);const l=E;E=null,l?.destroy(),T&&F&&(Y.style.pointerEvents="",r&&(m.hidden=!0,Xe())),Lt()}function Ve(){return{canvas:Y,root:c,get progress(){return k.progress},get intensity(){return k.progress==null?y:Ie(k.progress)},get phase(){return i},finish(a){return Ct(a)},elapsedMs(){return T?performance.now()-W:0}}}function Ct(a){const r=E;if(!r)return{score:0,label:"—",notes:[],reason:a};const l=r.finish(a);return a==="player-failed"&&T&&At(l),l}function Xe(){const a=E;E=null,a?.destroy();const r=ee[s].create(Ve());if(E=r,r.start(),r.signal&&x.length>0){const l=x.splice(0,x.length);for(const h of l)r.signal(h)}I({type:"game-start",data:{game:s,phase:i,intensity:Ve().intensity}})}function ze(){m.querySelector("button")?.focus()}function Je(){Xe(),m.hidden=!0,Y.style.pointerEvents="",k.transition("playing")}function qt(a){G=a??G,g.textContent=i??G,m.hidden=!1,m.innerHTML="",Y.style.pointerEvents="none";const r=document.createElement("div");r.className="quickspin-waiting-label",r.textContent=i?`AI is working · ${i}`:"AI is working — play without leaving the response behind.";const l=document.createElement("div");l.className="quickspin-actions";const h=document.createElement("button");h.className="quickspin-btn-primary",h.type="button",h.textContent="Play while you wait",h.addEventListener("click",Je);const q=document.createElement("button");q.className="quickspin-btn-ghost",q.type="button",q.textContent="Just wait",q.addEventListener("click",()=>{m.hidden=!0}),l.appendChild(h),l.appendChild(q),m.appendChild(r),m.appendChild(l)}function Ze(){!T||ue||(pe=null,F=!0,_=!1,D(),qt(G))}function Tt(){m.hidden=!0,_=!1,F=!1,D()}function It(){if(!T)return;fe(),T=!1;let a=null;E&&(a=E.finish("ai-complete")),k.transition("response-ready"),k.transition("completed");const r=performance.now()-W,l=Ge({gameId:E?s:null,score:a?.score??null,actualWaitMs:r,engagedPlayMs:B,feltWaitMs:null,completed:!0,outcome:"completed",trail:S,evidenceCoverage:Re(S)}),h=r>0?Ie(B/r):0;I({type:"session-complete",data:{id:l.id,game:E?s:null,score:a?.score??null,actualWaitMs:r,engagedMs:B,engagedRatio:h,dayStreak:l.dayStreak,sessionStreak:l.sessionStreak}}),ye(l.record),Pe(),We(),F?(ae(),Rt(a,r,B,l.id,l.isHighScore,l.dayStreak,l.sessionStreak)):(F=!1,D())}function $e(){if(!T)return;fe(),T=!1,k.transition("cancelled");const a=Ge({gameId:E?s:null,score:null,actualWaitMs:performance.now()-W,engagedPlayMs:B,feltWaitMs:null,completed:!1,outcome:"cancelled",trail:S,evidenceCoverage:Re(S)});I({type:"cancel",data:{id:a.id,outcome:"cancelled",game:E?s:null}}),ye(a.record),Pe(),F?Nt():D()}function Mt(a){if(!T)return;fe(),T=!1,k.transition("failed");const r=a instanceof Error?a:new Error(String(a??"UNKNOWN_FAILURE")),l=Ge({gameId:E?s:null,score:null,actualWaitMs:performance.now()-W,engagedPlayMs:B,feltWaitMs:null,completed:!1,outcome:"failed",failureCode:"HOST_REQUEST_FAILED",failureMessage:r.message.slice(0,240),trail:S,evidenceCoverage:Re(S)});I({type:"fail",data:{id:l.id,outcome:"failed",code:"HOST_REQUEST_FAILED",error:{name:r.name,message:r.message}}}),ye(l.record),Pe(),F?Pt(r,l.id):D()}function Pe(){const a=E;E=null,a?.destroy()}function At(a){m.hidden=!1,m.innerHTML="";const r=document.createElement("div");r.className="quickspin-label",r.textContent="Crash! The model is still working.";const l=document.createElement("div");l.className="quickspin-score-big",l.textContent=a.label;const h=document.createElement("div");h.className="quickspin-actions";const q=document.createElement("button");q.className="quickspin-btn-primary",q.type="button",q.textContent="Play again",q.addEventListener("click",Je);const K=document.createElement("button");K.className="quickspin-btn-ghost",K.type="button",K.textContent="Keep waiting",K.addEventListener("click",()=>{m.hidden=!0}),h.appendChild(q),h.appendChild(K),m.appendChild(r),m.appendChild(l),m.appendChild(h),ze()}function et(a,r,l,h){m.hidden=!1,m.innerHTML="";const q=h==null||r<=0?null:h/r,K=h==null?null:h-r,Le=r>0?Ie(l/r):0,ge=document.createElement("div");ge.className="quickspin-receipt-title",ge.textContent="WAIT RECEIPT";const me=document.createElement("div");me.className="quickspin-receipt";const ke=[["Actual",V(r)],["Played",V(l)],["Engaged",`${Math.round(Le*100)}%`],["Felt",h==null?"Skipped":V(h)]];for(const[he,ie]of ke){const re=document.createElement("div");re.className="quickspin-receipt-cell";const Ce=document.createElement("span");Ce.textContent=he;const qe=document.createElement("strong");qe.textContent=ie,re.appendChild(Ce),re.appendChild(qe),me.appendChild(re)}if(m.appendChild(ge),m.appendChild(me),q!=null&&K!=null){const he=document.createElement("div");he.className=q<=1?"quickspin-reduction":"quickspin-extension";const ie=Math.round(Math.abs(1-q)*100);he.textContent=q<.995?`This wait felt ${ie}% shorter.`:q>1.005?`This wait felt ${ie}% longer.`:"This wait felt about as long as it actually took.",m.appendChild(he)}I({type:"receipt",data:{id:a,actualWaitMs:r,engagedPlayMs:l,engagement:Le,feltWaitMs:h,ratio:q,deltaMs:K}});const j=document.createElement("button");j.className="quickspin-btn-primary",j.type="button",j.textContent="View response",j.addEventListener("click",Tt),m.appendChild(j),j.focus()}function Rt(a,r,l,h,q,K,Le){m.hidden=!1,m.innerHTML="";const ge=document.createElement("div");ge.className="quickspin-label",ge.textContent="Response ready";const me=document.createElement("div");me.className="quickspin-score-big",me.textContent=a?a.label:"—";const ke=document.createElement("ul");ke.className="quickspin-notes";const j=[];a?.notes&&j.push(...a.notes),q&&j.push("New personal best"),j.push(`Streaks — days ${K} · sessions ${Le}`);for(const Z of j){const be=document.createElement("li");be.textContent=Z,ke.appendChild(be)}m.appendChild(ge),m.appendChild(me),m.appendChild(ke);const he=Z=>{const be=ln(h,Z),oe=Z/Math.max(1,r),Gt=Z-r,at=1-oe;I({type:"perceived-wait",data:{id:h,felt:Z,actual:r,ratio:oe,deltaMs:Gt,change:at,reduction:at,persisted:!!be}}),We(),et(h,r,l,Z)},ie=document.createElement("div");ie.className="quickspin-label",ie.textContent=`That took ${V(r)}. How long did it feel?`;const re=document.createElement("div");re.className="quickspin-felt";const Ce=Math.max(1e3,r*.6),qe=r,st=Math.max(r+1e3,r*1.4),Ht=[[`Faster · ~${V(Ce)}`,Ce],[`About the same · ~${V(qe)}`,qe],[`Longer · ~${V(st)}`,st]];for(const[Z,be]of Ht){const oe=document.createElement("button");oe.className="quickspin-felt-btn",oe.type="button",oe.textContent=Z,oe.addEventListener("click",()=>he(be)),re.appendChild(oe)}m.appendChild(ie),m.appendChild(re);const Te=document.createElement("button");Te.className="quickspin-btn-ghost",Te.type="button",Te.textContent="Skip question · view receipt",Te.addEventListener("click",()=>et(h,r,l,null));const He=document.createElement("div");He.className="quickspin-actions",He.appendChild(Te),m.appendChild(He),ze()}function Nt(){m.hidden=!1,m.innerHTML="";const a=document.createElement("div");a.className="quickspin-label",a.textContent="Wait cancelled.",m.appendChild(a)}function Pt(a,r){m.hidden=!1,m.innerHTML="";const l=document.createElement("div");l.className="quickspin-label",l.textContent="Request failed — no response fabricated.";const h=document.createElement("div");h.className="quickspin-notes",h.textContent=`${a.message} · evidence ${r.slice(0,8)}`,m.appendChild(l),m.appendChild(h)}function Lt(){se.textContent=Me(s)?`Best: ${Me(s)}`:""}function We(){se.textContent=`${ht()} sessions · ${V(mt())} played during AI wait · `+(Me(s)?`Best: ${Me(s)}`:"No best yet")}const tt=()=>{document.hidden||de||_?E?.pause():(E?.resume(),Q=0)};document.addEventListener("visibilitychange",tt);function Ot(){de=!0,D(),E?.pause()}function $t(){de=!1,D(),_||E?.resume(),Q=0}C.addEventListener("click",()=>{_=!0,c.classList.add("is-collapsed"),E?.pause(),ae()}),N.addEventListener("click",()=>{_=!1,c.classList.remove("is-collapsed"),E?.resume(),Q=0}),ve=requestAnimationFrame(xe),We();function Wt(){if(k.status==="destroyed")throw new Error("QuickSpin: controller is destroyed.");if((k.status==="completed"||k.status==="cancelled"||k.status==="failed")&&k.transition("idle"),k.status!=="idle")throw new Error(`QuickSpin: cannot start from ${k.status}.`);if(!k.transition("waiting"))throw new Error("QuickSpin: failed to enter waiting state.")}function nt(a){if(ue)throw new Error("QuickSpin: controller is destroyed.");Wt(),T=!0,W=performance.now(),B=0,Q=0,i=null,f=-1,y=0,x.length=0,S.length=0,_=!1,F=!1,U.style.width="0%",U.classList.remove("indeterminate"),w.textContent="0s";const r=a??{};G=r.status??"Waiting for the model…",g.textContent=G;const l=r.gameId??s;return ee[l]&&Dt(l),D(),I({type:"session-start",data:{game:s,delayMs:t}}),t===0?Ze():pe=window.setTimeout(Ze,t),De}function Dt(a){s=a,Ke(a)}const De={setPhase(a){if(!T)return;const r=a.trim();if(r){if(r!==i&&(i=r,f+=1,y=Ie(.18+Math.max(0,f)*.22),S.push({type:"phase",atMs:J(),phase:r})),g.textContent=r,F&&!E&&!m.hidden){const l=m.querySelector(".quickspin-waiting-label");l&&(l.textContent=`AI is working · ${r}`)}ae(),I({type:"phase",data:{phase:r,index:f,intensity:k.progress==null?y:k.progress,status:k.status}})}},setProgress(a){T&&(k.setProgress(a),a===void 0||Number.isNaN(a)?U.classList.add("indeterminate"):(U.classList.remove("indeterminate"),U.style.width=`${(Ie(a)*100).toFixed(1)}%`))},signal(a){if(!T)return!1;const r=gn(a);return r?(S.push({type:"signal",atMs:J(),phase:i??void 0,signal:r}),E?.signal?E.signal(r):(x.push(r),x.length>8&&x.shift()),I({type:"signal",data:{...r,phase:i,status:k.status}}),!0):(S.push({type:"signal-rejected",atMs:J(),phase:i??void 0,reason:"INSUFFICIENT_EVIDENCE"}),I({type:"signal-rejected",data:{outcome:"UNKNOWN",reason:"INSUFFICIENT_EVIDENCE",phase:i,status:k.status}}),!1)},observe(a){if(!T)return!1;let r=!1,l=!0;const h=typeof a?.phase=="string"?a.phase.trim():"";return h&&(r=!0,De.setPhase(h)),a?.signal&&(r=!0,l=De.signal(a.signal)&&l),r&&l},async intervene(a){const r=globalThis.crypto?.randomUUID?.()??Math.random().toString(36).slice(2);if(!T)return{id:r,accepted:!1,reason:"SESSION_NOT_ACTIVE"};const l={kind:a.kind,label:typeof a.label=="string"?a.label.slice(0,96):void 0,payload:a.payload,id:r,atMs:J()};S.push({type:"intervention",atMs:l.atMs,intervention:{id:l.id,kind:l.kind,label:l.label,atMs:l.atMs}}),I({type:"intervention",data:l});let h;if(!e.onIntervention)h={id:r,accepted:!1,reason:"NO_HOST_HANDLER"};else try{const q=await e.onIntervention(l);h={id:r,accepted:!!q?.accepted,reason:typeof q?.reason=="string"?q.reason.slice(0,160):void 0,evidenceRef:typeof q?.evidenceRef=="string"&&q.evidenceRef.trim()?q.evidenceRef.trim().slice(0,160):void 0}}catch{h={id:r,accepted:!1,reason:"HOST_HANDLER_FAILED"}}return S.push({type:"intervention-result",atMs:J(),interventionResult:h}),I({type:"intervention-result",data:h}),h},complete(){It()},cancel(){$e()},fail(a){Mt(a)}};return{start(a){return T&&$e(),nt(a)},async track(a,r){T&&$e();const l=nt(r);try{const h=await a;return l.complete(),h}catch(h){throw l.fail(h instanceof Error?h:new Error(String(h))),h}},setTheme(a){Se(a)},show(){$t()},hide(){Ot()},destroy(){ue||(fe(),ue=!0,T=!1,cancelAnimationFrame(ve),document.removeEventListener("visibilitychange",tt),Pe(),k.transition("destroyed"),o.remove(),n.hasAttribute("data-quickspin-active")&&n.removeAttribute("data-quickspin-active"))},on(a){return z=a,()=>{z===a&&(z=null)}},getLastCapsule(){return L?JSON.parse(JSON.stringify(L)):null},exportLastCapsule(){return L?JSON.stringify(L,null,2):null},get status(){return k.status}}}const yt=new Set(["completed","cancelled","failed","unknown"]),bt=new Set(["phase","signal","signal-rejected","intervention","intervention-result"]),vn=new Set(["retrieval","tool","artifact","warning"]),yn=new Set(["cancel","retry","refine","custom"]);function ne(e){return typeof e=="number"&&Number.isFinite(e)&&e>=0}function wt(e){if(!e||typeof e!="object")return!1;const n=e;return[n.phaseChanges,n.acceptedSignals,n.rejectedSignals,n.uniqueEvidenceRefs,n.interventions,n.acceptedInterventions,n.rejectedInterventions].every(t=>Number.isInteger(t)&&(t??-1)>=0)}function bn(e){if(!e||typeof e!="object")return!1;const n=e;return n.version!==1||typeof n.recordId!="string"||!yt.has(n.outcome)||!ne(n.actualWaitMs)||!ne(n.engagedPlayMs)||n.gameId!==null&&typeof n.gameId!="string"||n.score!==null&&typeof n.score!="number"||n.feltWaitMs!==null&&!ne(n.feltWaitMs)||!wt(n.evidenceCoverage)||!Array.isArray(n.trail)||!ne(n.ts)?!1:n.trail.every(t=>{if(!t||typeof t!="object")return!1;const s=t;return bt.has(s.type)&&ne(s.atMs)})}function wn(e){if(!bn(e))throw new Error("QuickSpin: invalid Wait Capsule.");const n=e.trail.map(t=>{const s={type:t.type,atMs:t.atMs};return t.type==="signal"&&t.signal&&(s.signalKind=t.signal.kind),t.type==="intervention"&&t.intervention&&(s.interventionKind=t.intervention.kind),t.type==="intervention-result"&&t.interventionResult&&(s.accepted=t.interventionResult.accepted),s});return{version:1,privacy:"redacted",source:"wait-capsule",outcome:e.outcome,actualWaitMs:e.actualWaitMs,engagedPlayMs:e.engagedPlayMs,gameId:e.gameId,score:e.score,feltWaitMs:e.feltWaitMs,evidenceCoverage:{...e.evidenceCoverage},timeline:n}}function Be(e){if(!e||typeof e!="object")return!1;const n=e;return n.version!==1||n.privacy!=="redacted"||n.source!=="wait-capsule"||!yt.has(n.outcome)||!ne(n.actualWaitMs)||!ne(n.engagedPlayMs)||n.gameId!==null&&typeof n.gameId!="string"||n.score!==null&&typeof n.score!="number"||n.feltWaitMs!==null&&!ne(n.feltWaitMs)||!wt(n.evidenceCoverage)||!Array.isArray(n.timeline)?!1:n.timeline.every(t=>!(!t||typeof t!="object"||!bt.has(t.type)||!ne(t.atMs)||t.signalKind!==void 0&&!vn.has(t.signalKind)||t.interventionKind!==void 0&&!yn.has(t.interventionKind)||t.accepted!==void 0&&typeof t.accepted!="boolean"))}function En(e){let n="";for(const t of e)n+=String.fromCharCode(t);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/g,"")}function Sn(e){const n=e.replace(/-/g,"+").replace(/_/g,"/"),t=n+"=".repeat((4-n.length%4)%4),s=atob(t);return Uint8Array.from(s,o=>o.charCodeAt(0))}function xn(e){if(!Be(e))throw new Error("QuickSpin: invalid Wait Ghost.");return En(new TextEncoder().encode(JSON.stringify(e)))}function kn(e){try{if(typeof e!="string"||e.length===0||e.length>32e3)return null;const n=new TextDecoder().decode(Sn(e)),t=JSON.parse(n);return Be(t)?t:null}catch{return null}}function Cn(e,n=1){if(!Be(e))throw new Error("QuickSpin: invalid Wait Ghost.");const t=Number.isFinite(n)?Math.min(20,Math.max(.1,n)):1,s=e.timeline.map((d,v)=>({event:{...d},index:v})).sort((d,v)=>d.event.atMs-v.event.atMs||d.index-v.index);let o=0;return s.map(({event:d,index:v})=>{const c=Math.max(0,d.atMs-o)/t;return o=d.atMs,{index:v,delayMs:c,event:d}})}function qn(e,n){const t=e.feltWaitMs!==null&&n.feltWaitMs!==null?n.feltWaitMs-e.feltWaitMs:null,s=e.score!==null&&n.score!==null?n.score-e.score:null;return{actualWaitDeltaMs:n.actualWaitMs-e.actualWaitMs,engagedPlayDeltaMs:n.engagedPlayMs-e.engagedPlayMs,feltWaitDeltaMs:t,scoreDelta:s,acceptedSignalsDelta:n.evidenceCoverage.acceptedSignals-e.evidenceCoverage.acceptedSignals,rejectedSignalsDelta:n.evidenceCoverage.rejectedSignals-e.evidenceCoverage.rejectedSignals,uniqueEvidenceRefsDelta:n.evidenceCoverage.uniqueEvidenceRefs-e.evidenceCoverage.uniqueEvidenceRefs,outcomeChanged:e.outcome!==n.outcome,fromOutcome:e.outcome,toOutcome:n.outcome}}const Ne=Math.PI*2,Ae=(e,n=0,t=1)=>Math.max(n,Math.min(t,e)),_e=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,Tn=(e,n=4)=>String(e).padStart(n,"0"),Et="'Geist Mono', 'SF Mono', ui-monospace, monospace",Qe="Inter, system-ui, -apple-system, 'Segoe UI', sans-serif";function In(e,n){const{ctx:t,w:s,h:o}=e,d=s/2,v=o*.42,c=Math.min(64,s*.14);t.clearRect(0,0,s,o),t.textAlign="center",t.beginPath(),t.arc(d,v,c,0,Ne),t.lineWidth=10,t.lineCap="round",t.strokeStyle="rgba(104,112,127,0.22)",t.stroke();const p=n/1500,u=-Math.PI/2+Ne*p;t.beginPath(),t.arc(d,v,c,-Math.PI/2,u),t.lineWidth=10,t.strokeStyle="#6658e8",t.stroke(),t.beginPath(),t.arc(d,v,c,u-.6,u),t.lineWidth=4,t.strokeStyle="rgba(102,88,232,0.3)",t.stroke(),t.font=`600 12px ${Qe}`,t.fillStyle="rgba(104,112,127,0.9)",t.fillText("classic “thinking…” spinner",d,v+c+34)}function Mn(e,n){const{ctx:t,w:s,h:o}=e,d=o*.8,v=s*.12,c=s*.62,p=s*.84,u=_e(Ae(n/700)),N=Ae((n-700)/500),A=_e(Ae((n-1200)/800));t.clearRect(0,0,s,o),t.beginPath(),t.moveTo(0,d),t.lineTo(s,d),t.lineWidth=2,t.strokeStyle="rgba(23,24,29,0.16)",t.stroke();const M=30,R=46;t.fillStyle="#ffb547",t.beginPath(),t.roundRect(c-M/2,d-R,M,R,9),t.fill();const g=v+u*(c-v-34)+A*(p-c),w=d-Math.sin(N*Math.PI)*58;t.lineCap="round",t.lineWidth=4,t.strokeStyle="#6658e8";const b=Math.sin(n/90)*8;t.beginPath(),t.moveTo(g,w-8),t.lineTo(g-5+b,d-2),t.moveTo(g,w-8),t.lineTo(g+7-b,d-2),t.stroke(),t.fillStyle="#6658e8",t.beginPath(),t.roundRect(g-11,w-32,22,24,10),t.fill(),t.beginPath(),t.arc(g,w-36,6.5,0,Ne),t.fill(),t.fillStyle="#16b8b0",t.beginPath(),t.roundRect(g+1,w-39,8,4.5,2),t.fill(),t.font=`700 15px ${Et}`,t.textAlign="left",t.fillStyle="#17181d",t.fillText(`SCORE ${Tn(Math.round(Ae(n/1500)*9876))}`,18,30),t.font=`600 12px ${Qe}`,t.textAlign="right",t.fillStyle="rgba(104,112,127,0.85)",t.fillText("…and a real score, streak, and best to protect",s-18,o-22)}function dt(e,n){const{ctx:t,w:s,h:o}=e,d=_e(Ae(n/500)),v=s/2,c=o*.44;t.clearRect(0,0,s,o),t.textAlign="center",t.beginPath(),t.arc(v,c,18+d*70,0,Ne),t.lineWidth=12,t.strokeStyle=`rgba(102,88,232,${.35*(1-d)})`,t.stroke(),t.beginPath(),t.arc(v,c,8+d*44,0,Ne),t.lineWidth=6,t.strokeStyle=`rgba(22,184,176,${.5*(1-d)})`,t.stroke(),t.font=`800 30px ${Qe}`,t.fillStyle="#17181d",t.fillText("wait over —",v,c-16),t.fillText("and they played it.",v,c+24),t.font=`700 15px ${Et}`,t.fillStyle="#6658e8",t.fillText("SCORE 9876  ·  DAY STREAK 3",v,c+58)}function An(e){const n=e.getContext("2d");if(!n)return;const t=Math.min(window.devicePixelRatio||1,2),s=()=>{const g=e.getBoundingClientRect();e.width=Math.max(1,Math.round(g.width*t)),e.height=Math.max(1,Math.round(g.height*t))};s(),new ResizeObserver(s).observe(e);const d=()=>e.width/t,v=()=>e.height/t,c=()=>({ctx:n,w:d(),h:v()});if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){n.save(),n.scale(t,t),dt(c(),60),n.restore();return}const p=2600,u=2400,A=p+u+2200,M=performance.now(),R=g=>{const w=(g-M)%A;n.save(),n.scale(t,t),w<p?In(c(),w):w<p+u?Mn(c(),w-p):dt(c(),w-p-u),n.restore(),requestAnimationFrame(R)};requestAnimationFrame(R)}const Rn=e=>new Promise(n=>setTimeout(n,e)),St=[{path:"/",label:"Home"},{path:"/lab",label:"Lab"},{path:"/proof",label:"Proof"},{path:"/sdk",label:"SDK"}],Nn=[{path:"/judges",label:"Judges"}],Pn=[...St,...Nn],xt="Where should five friends eat tonight in Austin?";function Ln(){return new Promise((e,n)=>{window.setTimeout(()=>n(new Error("DEMO_PROVIDER_TIMEOUT")),1400)})}function On(){const e=window.location.pathname.replace(/\/+$/,"")||"/";return Pn.some(n=>n.path===e)?e:"/"}function $n(e,n){const t=St.map(s=>`<a href="${s.path}" ${s.path===n?'aria-current="page"':""}>${s.label}</a>`).join("");return`
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
    </div>`}function Oe(e,n,t,s){return`<header class="page-head">
    <div><div class="eyebrow">${e}</div><h1>${n}</h1><p>${t}</p></div>
    <div class="page-index">QuickSpin / ${s}<br>execution → play → evidence</div>
  </header>`}function Wn(){return`<main class="page">
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
  </main>`}function Dn(){return`<main class="page">
    ${Oe("Live wait lab","Real search. Play the real wait.","Ask a real question. QuickSpin stays active while Tavily searches the web, then the sourced results replace the waiting state. The negative path still proves that failure remains failure.","02 / LAB")}
    <section class="lab-grid">
      <div class="lab-panel">
        <div class="panel-kicker"><span>LIVE SEARCH / TAVILY</span><span>REAL PROVIDER LATENCY</span></div>
        <div class="lab-storyline" aria-label="QuickSpin lab flow"><span>WAIT</span><i></i><span>PLAY</span><i></i><span>RECORD</span><i></i><span>DERIVE</span></div>
        <form id="prompt-form" class="prompt-composer">
          <label for="prompt-input">Try your own prompt</label>
          <textarea id="prompt-input" rows="2" maxlength="240" spellcheck="true">${xt}</textarea>
          <div class="prompt-meta"><span>Real Tavily search · sourced results · no fabricated answer</span><button id="run-demo" class="run" type="submit">Search with QuickSpin</button></div>
        </form>
        <div class="seg" role="group" aria-label="Demo mode"><button data-mode="classic">Classic spinner</button><button data-mode="quickspin">QuickSpin</button></div>
        <div id="classic-panel">
          <div class="chat">
            <div class="bubble ai">Classic mode shows the same real Tavily request with a passive spinner.</div>
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
  </main>`}function Hn(){return`<main class="page">
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
  </main>`}function Gn(){return`<main class="page">
    ${Oe("Integration surface","The product is the runtime contract — not one minigame.","Runner and Orbit consume the same lifecycle. Hosts can expose real phases and evidence-bearing execution signals without fabricating model progress.","04 / SDK")}
    <section class="lifecycle">
      ${["IDLE","WAITING","PLAYING","RESPONSE READY","COMPLETED","FAILED / CANCELLED"].map((n,t)=>`<div class="life"><b>0${t+1}</b><span>${n}</span></div>`).join("")}
    </section>
    <section class="contract-strip" aria-label="Runtime contract principles">
      <article><span>HOST AUTHORITY</span><strong>Observe. Do not invent.</strong><p>Phases and signals come from the host boundary.</p></article>
      <article><span>FAIL CLOSED</span><strong>No provenance, no gameplay claim.</strong><p>Insufficient evidence remains UNKNOWN.</p></article>
      <article><span>PORTABLE PROOF</span><strong>Private Capsule. Redacted Ghost.</strong><p>One contract across multiple waiting surfaces.</p></article>
    </section>
    <section class="code-panel"><div class="code-head"><span>Vanilla integration</span><span>evidence-aware</span></div><pre>${Un(`const qs = createQuickSpin({ target: "#wait" });
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
  </main>`}function Fn(){const e=[["RUBRIC","Waiting experience, originality, AI-native fit, repeatability and execution mapped to proof.","PASS"],["PAIN","Real AI latency/rejection states plus HCI evidence that wait presentation changes experience.","PASS"],["PROBLEM","Passive waiting gives little agency and can imply confidence the host does not actually have.","PASS"],["DIFFERENTIATOR","Observed execution becomes gameplay; private evidence becomes a Capsule; a redacted derivative becomes a shareable Wait Ghost.","PASS"],["EXECUTION","Two games, lifecycle, persistence, React/vanilla, accessibility, security gates.","PASS"],["EVIDENCE","Primary-source incident, tests, CI/CodeQL, runtime, Claim + Failure Ledgers.","PASS"],["STORY","One narrative: real wait → playable execution → truthful outcome.","PASS"],["DEMO","12-second control, Capsule, redacted Ghost replay, wait diff, failure and UNKNOWN.","READY"],["Q&A","Adversarial answer bank refuses unsupported claims instead of improvising them.","PREPARED"]],n=[["01","Signal / opportunity","AI products increasingly contain non-zero waits worth designing intentionally."],["02","Real negative event","OpenAI June 2–3, 2026 latency, rejection and degraded user flows."],["03","Observable impact","Response-start delay, HTTP 429 rejection, broken continuity and uncertainty."],["04","Design lesson","Waiting cannot silently mean success; unknown evidence must stay unknown."],["05","Mitigation","Playable wait, provenance, explicit terminal outcomes and directional receipt."]];return`<main class="page">
    ${Oe("Judge surface","Every claim has a route to proof.","This page compresses the build into judge logic: criterion → behavior → evidence → demo. It is intentionally explicit about what is verified, controlled, unknown, or refused.","05 / JUDGES")}
    <section class="judge-memory"><span>REMEMBER ONE THING</span><strong>QuickSpin turns AI waiting into a game you can verify afterward.</strong><div>PRIVATE CAPSULE → REDACTED GHOST → REPLAY / COMPARE</div></section>
    <section class="claim-matrix" aria-label="Claim classes"><article class="verified"><b>VERIFIED</b><strong>Observed execution can become play.</strong></article><article class="unknown"><b>UNKNOWN</b><strong>No evidence stays unresolved.</strong></article><article class="refused"><b>REFUSED</b><strong>QuickSpin does not claim faster models.</strong></article><article class="portable"><b>PORTABLE</b><strong>Capsule → Ghost → replay / compare.</strong></article></section>
    <section class="judge-cycle">${e.map(t=>`<div class="judge-row"><div class="stage">${t[0]}</div><div class="why">${t[1]}</div><div class="verdict">${t[2]}</div></div>`).join("")}</section>
    <section class="five-pattern">${n.map(t=>`<article class="pattern-step"><div class="n">${t[0]}</div><h3>${t[1]}</h3><p>${t[2]}</p></article>`).join("")}</section>
    <section class="evidence-panel"><div class="eyebrow">Canonical distinction</div><h2>QuickSpin is not trying to be the biggest AI waiting game.</h2><p>It is the reusable waiting layer that makes real execution playable, preserves failure truth, refuses unsupported signals, records a private Evidence Capsule, and derives a privacy-safe Wait Ghost for replay/share/compare. That evidence lifecycle is the product — the minigames are interchangeable implementations of the contract.</p><div class="route-actions"><a class="action signal" href="/lab">See it run →</a><a class="action" href="/proof">Inspect evidence</a><a class="action" href="/sdk">Inspect integration</a></div></section>
  </main>`}function Un(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function _n(){const e=document.getElementById("app");if(!e)return;const n=On(),t=n==="/lab"?Dn():n==="/proof"?Hn():n==="/sdk"?Gn():n==="/judges"?Fn():Wn();e.innerHTML=$n(t,n);const s=e.querySelector(".hero-canvas");s&&An(s),n==="/lab"&&jn(e)}function jn(e){const n=e.querySelector("#qs-mount"),t=e.querySelector("#event-log"),s=e.querySelector("#classic-panel"),o=e.querySelector("#qs-panel"),d=Array.from(e.querySelectorAll(".seg button")),v=e.querySelector("#prompt-form"),c=e.querySelector("#prompt-input"),p=e.querySelector("#run-demo"),u=e.querySelector("#run-failure"),N=e.querySelector("#copy-capsule"),A=e.querySelector("#copy-ghost"),M=e.querySelector("#replay-ghost"),R=e.querySelector("#ghost-status"),g=e.querySelector("#ghost-console"),w=e.querySelector("#reset-stats"),b=e.querySelector("#qs-phase"),C=e.querySelector("#classic-phase"),P={target:n,delayMs:650,onEvent:i=>{const f=document.createElement("div");f.textContent=`[${new Date().toLocaleTimeString()}] ${i.type}${i.data?" "+JSON.stringify(i.data):""}`,t.appendChild(f),t.scrollTop=t.scrollHeight},onIntervention:i=>({id:i.id,accepted:i.kind==="refine",reason:i.kind==="refine"?"HOST_APPLIED_REFINEMENT":"DEMO_HOST_REFUSED_INTENT",evidenceRef:i.kind==="refine"?"demo:intervention:walkability":void 0})};let $=ct(P);const Y=new URLSearchParams(window.location.hash.replace(/^#/,""));let m=kn(Y.get("ghost")??""),X="quickspin",H=!1;const se=i=>{X=i;for(const f of d)f.setAttribute("aria-pressed",i===f.dataset.mode?"true":"false");s.style.display=i==="classic"?"":"none",o.style.display=i==="quickspin"?"":"none"},ce=(i,f)=>{const x=(X==="classic"?s:o).querySelector(".chat"),S=document.createElement("div");S.className=`bubble ${f}`,S.textContent=i,x.appendChild(S)},U=async i=>{const f=await fetch("/api/search",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({query:i,maxResults:5})}),y=await f.json().catch(()=>null);if(!f.ok||!y||!y.ok){const x=y&&!y.ok?y.message:"Real search is unavailable.",S=y&&!y.ok?y.code:`HTTP_${f.status}`;throw new Error(`${S}: ${x}`)}return y},Ee=i=>{const y=(X==="classic"?s:o).querySelector(".chat"),x=document.createElement("section");x.className="demo-results";const S=document.createElement("div");S.className="demo-results-head";const L=document.createElement("strong");L.textContent=`${i.results.length} live result${i.results.length===1?"":"s"}`;const G=document.createElement("span");G.textContent=`Tavily · sourced web search${i.responseTime?` · ${i.responseTime}s`:""}`,S.append(L,G);const k=document.createElement("p");if(k.className="demo-results-query",k.textContent=`For: “${i.query}”`,x.append(S,k),i.answer){const I=document.createElement("p");I.className="search-answer",I.textContent=i.answer,x.appendChild(I)}const z=document.createElement("div");z.className="demo-results-list";for(const I of i.results){const J=document.createElement("article");J.className="demo-result";const ye=document.createElement("b");ye.textContent=String(I.rank).padStart(2,"0");const fe=document.createElement("div"),D=document.createElement("a");D.className="search-result-link",D.href=I.url,D.target="_blank",D.rel="noopener noreferrer",D.textContent=I.title;const ae=document.createElement("span");try{ae.textContent=new URL(I.url).hostname.replace(/^www\./,"")}catch{ae.textContent="source"}const xe=document.createElement("p");xe.textContent=I.snippet||"Open source result",fe.append(D,ae,xe),J.append(ye,fe),z.appendChild(J)}x.appendChild(z),y.appendChild(x)},Se=i=>{ce(`Search failed: ${i}`,"ai")},E=()=>{g.hidden=!1,A.hidden=!1,M.hidden=!1},T=()=>{g.hidden=!0,A.hidden=!0,M.hidden=!0},W=()=>{const i=(y,x)=>{const S=e.querySelector(`#${y} .num`);S&&(S.textContent=x)};i("stat-sessions",String(ht())),i("stat-wait",Fe(mt())),i("stat-best",Me("runner")??"—");const f=un();i("stat-felt",f.samples>0?`${Math.round(f.avgRatio*100)}%`:"—"),i("stat-streak",String(vt()))},B=i=>i.type==="signal"?`signal · ${i.signalKind??"unknown-kind"}`:i.type==="signal-rejected"?"UNKNOWN · signal rejected":i.type==="intervention"?`intervention · ${i.interventionKind??"custom"}`:i.type==="intervention-result"?`intervention result · ${i.accepted?"accepted":"rejected"}`:i.type,Q=()=>{const i=$.getLastCapsule();return i?wn(i):null},ve=()=>{const i=$.getLastCapsule();if(!m||!i)return;const f=qn(m,i),y=`${f.actualWaitDeltaMs>=0?"+":"−"}${Fe(Math.abs(f.actualWaitDeltaMs))}`,x=`${f.engagedPlayDeltaMs>=0?"+":"−"}${Fe(Math.abs(f.engagedPlayDeltaMs))}`;R.textContent=`Wait diff · current − shared ghost: actual ${y}; engaged ${x}; outcome ${f.fromOutcome} → ${f.toOutcome}. No winner score.`},de=async i=>{if(!H){H=!0,M.disabled=!0,M.textContent="Replaying redacted timeline…",R.textContent="WAIT GHOST REPLAY · redacted historical artifact · not live AI.";for(const f of Cn(i,6)){await Rn(Math.min(f.delayMs,1200));const y=document.createElement("div");y.textContent=`[WAIT GHOST +${Math.round(f.event.atMs)}ms] ${B(f.event)}`,t.appendChild(y),t.scrollTop=t.scrollHeight}R.textContent=`Wait Ghost replay complete · ${i.timeline.length} redacted event(s) · source outcome ${i.outcome}. Replay did not emit host execution signals.`,H=!1,M.disabled=!1,M.textContent="Replay Wait Ghost",ve()}},_=async i=>{C.textContent="Searching the web with Tavily…";const f=s.querySelector(".chat"),y=f.querySelector(".thinking"),x=f.querySelector(".fill"),S=f.querySelector(".progress-label");y.style.display="flex",y.querySelector(".spinner-label").textContent="Searching the web…",x.style.width="34%",S.textContent="LIVE";try{const L=await U(i);y.style.display="none",x.style.width="100%",S.textContent="DONE",C.textContent=`Tavily returned ${L.results.length} sourced result(s) in ${L.elapsedMs} ms.`,Ee(L)}catch(L){y.style.display="none";const G=L instanceof Error?L:new Error(String(L));throw C.textContent=`FAILED — ${G.message}`,Se(G.message),G}},F=async i=>{const f=$.start({status:"Searching the web with Tavily…"});f.setProgress(),f.setPhase("Calling Tavily Search…"),b.innerHTML="Phase: <strong>Calling Tavily Search…</strong> · real provider request in flight.";try{const y=await U(i);f.setPhase("Receiving sourced results…");for(const S of y.results)S.url&&f.signal({kind:"retrieval",label:`Result ${S.rank}: ${S.title}`.slice(0,64),evidenceRef:S.url});y.requestId&&f.signal({kind:"artifact",label:`Tavily response assembled · ${y.results.length} results`,evidenceRef:`tavily:request:${y.requestId}`}),f.setPhase("Rendering sourced answer…"),f.complete(),Ee(y);const x=$.getLastCapsule();b.innerHTML=`Phase: <strong>Done</strong> — Tavily returned <strong>${y.results.length}</strong> sourced result(s) in <strong>${y.elapsedMs} ms</strong>. Evidence Capsule retained <strong>${x?.evidenceCoverage.acceptedSignals??0}</strong> accepted signal(s).`,E(),R.textContent="Replay-safe Wait Ghost ready from this real search run. The Ghost excludes the prompt, result titles and source URLs.",W(),ve()}catch(y){const x=y instanceof Error?y:new Error(String(y));throw f.signal({kind:"warning",label:"Tavily search request failed",evidenceRef:"provider:tavily:request-failed"}),f.fail(x),b.innerHTML=`Phase: <strong>FAILED</strong> — ${x.message}. No search results were fabricated.`,Se(x.message),W(),x}},ue=async()=>{if(H)return;H=!0,p.disabled=!0,u.disabled=!0,p.textContent="Running…";const i=c.value.trim()||xt;c.value=i,ce(i,"user");try{X==="classic"?await _(i):await F(i)}finally{H=!1,p.disabled=!1,u.disabled=!1,p.textContent="Search with QuickSpin"}},pe=async()=>{if(H)return;H=!0,se("quickspin"),p.disabled=!0,u.disabled=!0,u.textContent="Failure in flight…",ce("Find dinner options, but preserve failure truth if the provider rejects.","user");const i=$.start({status:"Calling restaurant search provider…"});i.setProgress(),i.setPhase("Calling restaurant search provider…"),b.innerHTML="Negative path: <strong>provider call in flight</strong> — no success assumed.";try{await Ln()}catch(f){const y=f instanceof Error?f:new Error(String(f));i.signal({kind:"warning",label:"Provider request rejected",evidenceRef:"demo:negative-path:promise-rejection"}),i.fail(y),b.innerHTML=`Negative path: <strong>FAILED</strong> — ${y.message}. No AI answer was fabricated.`,W()}H=!1,p.disabled=!1,u.disabled=!1,u.textContent="Run negative-path proof"};v.addEventListener("submit",i=>{i.preventDefault(),ue()}),u.addEventListener("click",()=>{pe()}),N.addEventListener("click",()=>{const i=$.exportLastCapsule();if(!i){N.textContent="Run a QuickSpin path first";return}navigator.clipboard?.writeText(i),N.textContent="Evidence Capsule copied"}),A.addEventListener("click",()=>{const i=Q();if(!i){A.textContent="Run a QuickSpin path first";return}m=i;const f=new URL(window.location.href);f.hash=`ghost=${xn(i)}`,window.history.replaceState(null,"",f),navigator.clipboard?.writeText(f.toString()),A.textContent="Redacted Wait Ghost link copied",R.textContent=`Wait Ghost ready · ${i.timeline.length} redacted event(s). Labels, evidence refs, payloads, record id, timestamp and failure details are excluded.`}),M.addEventListener("click",()=>{const i=m??Q();if(!i){R.textContent="No Wait Ghost available. Run QuickSpin or open a shared #ghost link first.";return}de(i)}),w.addEventListener("click",()=>{$.destroy(),n.innerHTML="",pn(),t.innerHTML="",$=ct(P),N.textContent="Copy Evidence Capsule",A.textContent="Copy redacted Wait Ghost link",T(),W()});for(const i of d)i.addEventListener("click",()=>!H&&se(i.dataset.mode??"quickspin"));se("quickspin"),m?(E(),R.textContent=`Shared Wait Ghost loaded · ${m.timeline.length} redacted event(s) · outcome ${m.outcome}. Replay is historical, not live AI.`):T(),W()}function Fe(e){return`${Math.round(e/1e3)}s`}_n();

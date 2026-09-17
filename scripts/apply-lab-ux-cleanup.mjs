import fs from 'node:fs';

const mainPath = 'src/demo/main.ts';
const cssPath = 'src/demo/site.css';
let main = fs.readFileSync(mainPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');

function replaceOnce(source, from, to, label) {
  if (!source.includes(from)) throw new Error(`Missing patch target: ${label}`);
  return source.replace(from, to);
}

main = replaceOnce(main,
`const ROUTES = [
  { path: "/", label: "Home" },
  { path: "/lab", label: "Lab" },
  { path: "/proof", label: "Proof" },
  { path: "/sdk", label: "SDK" },
  { path: "/judges", label: "Judges" },
] as const;`,
`const PUBLIC_ROUTES = [
  { path: "/", label: "Home" },
  { path: "/lab", label: "Lab" },
  { path: "/proof", label: "Proof" },
  { path: "/sdk", label: "SDK" },
] as const;

const INTERNAL_ROUTES = [{ path: "/judges", label: "Judges" }] as const;
const ALL_ROUTES = [...PUBLIC_ROUTES, ...INTERNAL_ROUTES];

const DEFAULT_PROMPT = "Where should five friends eat tonight in Austin?";

const DINNER_DEMO_RESULTS = [
  { title: "Eastside taco patio", meta: "CASUAL · SHAREABLE", detail: "A lively first stop built around tacos, patio energy and easy group ordering." },
  { title: "Neighborhood izakaya", meta: "SMALL PLATES · SOCIAL", detail: "A more intimate option for skewers, small plates and a slower group dinner." },
  { title: "Mediterranean table", meta: "SHARED PLATES · FLEXIBLE", detail: "A share-forward direction with vegetarian-friendly options and broad group appeal." },
  { title: "Food hall mix", meta: "CHOICE · LOW FRICTION", detail: "Useful when five people want different cuisines without splitting the group." },
  { title: "Late-night pizza room", meta: "EASY · LATE", detail: "The low-planning fallback: slices, communal seating and an easy second stop." },
] as const;

const GENERAL_DEMO_RESULTS = [
  { title: "Best direct match", meta: "PRIMARY", detail: "The strongest answer direction for the request as written." },
  { title: "Alternative angle", meta: "OPTION B", detail: "A meaningfully different route with a different trade-off profile." },
  { title: "Fastest path", meta: "LOW FRICTION", detail: "The option optimized for speed, simplicity and minimum setup." },
  { title: "Most flexible path", meta: "ADAPTABLE", detail: "The option that leaves the most room to refine constraints after the first pass." },
  { title: "Wildcard", meta: "EXPLORE", detail: "A deliberately different direction worth checking before committing." },
] as const;`,
'public/internal routes');

main = main.replace('label: "Retrieved Austin dinner options"', 'label: "Retrieved demo candidates"');
main = main.replace('label: "Ranked five candidate spots"', 'label: "Assembled five demo candidates"');

main = replaceOnce(main,
`  return ROUTES.some((r) => r.path === clean) ? clean : "/";`,
`  return ALL_ROUTES.some((r) => r.path === clean) ? clean : "/";`,
'route resolver');

main = replaceOnce(main,
`  const links = ROUTES.map(`,
`  const links = PUBLIC_ROUTES.map(`,
'public nav');

main = main.replace('<div class="footer-links"><a href="/lab">Live lab</a><a href="/proof">Evidence</a><a href="/sdk">SDK</a><a href="/judges">Judge view</a></div>', '<div class="footer-links"><a href="/lab">Live lab</a><a href="/proof">Evidence</a><a href="/sdk">SDK</a></div>');
main = main.replace('Five surfaces / one product truth', 'Four public surfaces / one product truth');
main = main.replace('Each route has one job: explain, demonstrate, prove, integrate, or defend. The judge never has to excavate a single scrolling page to find the evidence.', 'Each public route has one job: explain, demonstrate, prove, or integrate. Internal evaluation material stays out of the product-facing experience.');
main = main.replace('HOME → thesis<br>LAB → interaction<br>PROOF → evidence<br>SDK → repeatability<br>JUDGES → rubric', 'HOME → thesis<br>LAB → interaction<br>PROOF → evidence<br>SDK → repeatability');
main = main.replace('<div class="route-actions"><a class="action signal" href="/lab">Run the live negative path →</a><a class="action" href="/judges">See rubric traceability</a></div>', '<div class="route-actions"><a class="action signal" href="/lab">Run the live negative path →</a><a class="action" href="/sdk">Inspect the runtime contract</a></div>');

main = replaceOnce(main,
`        <div class="lab-storyline" aria-label="QuickSpin lab flow"><span>WAIT</span><i></i><span>PLAY</span><i></i><span>RECORD</span><i></i><span>DERIVE</span></div>
        <div class="seg" role="group" aria-label="Demo mode"><button data-mode="classic">Classic spinner</button><button data-mode="quickspin">QuickSpin</button></div>`,
`        <div class="lab-storyline" aria-label="QuickSpin lab flow"><span>WAIT</span><i></i><span>PLAY</span><i></i><span>RECORD</span><i></i><span>DERIVE</span></div>
        <form id="prompt-form" class="prompt-composer">
          <label for="prompt-input">Try your own prompt</label>
          <textarea id="prompt-input" rows="2" maxlength="240" spellcheck="true">${DEFAULT_PROMPT}</textarea>
          <div class="prompt-meta"><span>Same controlled 12-second wait · your prompt drives the demo</span><button id="run-demo" class="run" type="submit">Run my prompt</button></div>
        </form>
        <div class="seg" role="group" aria-label="Demo mode"><button data-mode="classic">Classic spinner</button><button data-mode="quickspin">QuickSpin</button></div>`,
'prompt composer');

main = main.replace('          <button id="run-demo" class="run">Run 12-second comparison</button>\n', '');
main = main.replace('<button id="copy-ghost">Copy redacted Wait Ghost link</button>', '<button id="copy-ghost" hidden>Copy redacted Wait Ghost link</button>');
main = main.replace('<button id="replay-ghost">Replay Wait Ghost</button>', '<button id="replay-ghost" hidden>Replay Wait Ghost</button>');
main = main.replace('<section class="ghost-console" aria-label="Wait Ghost boundary">', '<section id="ghost-console" class="ghost-console" aria-label="Wait Ghost boundary" hidden>');
main = main.replace('Wait Ghost: none loaded. Shared ghosts are redacted replay artifacts — never live AI.', 'Replay-safe Wait Ghost ready from this run.');

main = replaceOnce(main,
`  const runBtn = app.querySelector<HTMLButtonElement>("#run-demo")!;`,
`  const promptForm = app.querySelector<HTMLFormElement>("#prompt-form")!;
  const promptInput = app.querySelector<HTMLTextAreaElement>("#prompt-input")!;
  const runBtn = app.querySelector<HTMLButtonElement>("#run-demo")!;`,
'prompt refs');

main = replaceOnce(main,
`  const ghostStatus = app.querySelector<HTMLElement>("#ghost-status")!;`,
`  const ghostStatus = app.querySelector<HTMLElement>("#ghost-status")!;
  const ghostConsole = app.querySelector<HTMLElement>("#ghost-console")!;`,
'ghost console ref');

main = replaceOnce(main,
`  const appendBubble = (label: string, kind: "user" | "ai"): void => {
    const panel = mode === "classic" ? classicPanel : qsPanel;
    const chat = panel.querySelector<HTMLElement>(".chat")!;
    const bubble = document.createElement("div");
    bubble.className = \`bubble \${kind}\`;
    bubble.textContent = label;
    chat.appendChild(bubble);
  };`,
`  const appendBubble = (label: string, kind: "user" | "ai"): void => {
    const panel = mode === "classic" ? classicPanel : qsPanel;
    const chat = panel.querySelector<HTMLElement>(".chat")!;
    const bubble = document.createElement("div");
    bubble.className = \`bubble \${kind}\`;
    bubble.textContent = label;
    chat.appendChild(bubble);
  };

  const demoResultsFor = (prompt: string) =>
    /dinner|restaurant|eat|food|taco|lunch|brunch/i.test(prompt)
      ? DINNER_DEMO_RESULTS
      : GENERAL_DEMO_RESULTS;

  const appendDemoResults = (prompt: string): void => {
    const panel = mode === "classic" ? classicPanel : qsPanel;
    const chat = panel.querySelector<HTMLElement>(".chat")!;
    const wrap = document.createElement("section");
    wrap.className = "demo-results";
    const head = document.createElement("div");
    head.className = "demo-results-head";
    const title = document.createElement("strong");
    title.textContent = "Five demo results";
    const note = document.createElement("span");
    note.textContent = "Illustrative local response · not a live web search";
    head.append(title, note);
    const query = document.createElement("p");
    query.className = "demo-results-query";
    query.textContent = \`For: “\${prompt}”\`;
    const list = document.createElement("div");
    list.className = "demo-results-list";
    demoResultsFor(prompt).forEach((result, index) => {
      const item = document.createElement("article");
      item.className = "demo-result";
      const rank = document.createElement("b");
      rank.textContent = String(index + 1).padStart(2, "0");
      const body = document.createElement("div");
      const name = document.createElement("strong");
      name.textContent = result.title;
      const meta = document.createElement("span");
      meta.textContent = result.meta;
      const detail = document.createElement("p");
      detail.textContent = result.detail;
      body.append(name, meta, detail);
      item.append(rank, body);
      list.appendChild(item);
    });
    wrap.append(head, query, list);
    chat.appendChild(wrap);
  };

  const revealGhostTools = (): void => {
    ghostConsole.hidden = false;
    copyGhostBtn.hidden = false;
    replayGhostBtn.hidden = false;
  };

  const hideGhostTools = (): void => {
    ghostConsole.hidden = true;
    copyGhostBtn.hidden = true;
    replayGhostBtn.hidden = true;
  };`,
'result rendering and ghost visibility');

main = main.replace('label: "Prioritize walkability in the final ranking",', 'label: "Apply the user-requested constraints in the final ranking",');

main = main.replace('  const runClassic = async (): Promise<void> => {', '  const runClassic = async (prompt: string): Promise<void> => {');
main = main.replace('    appendBubble("Here are five spots — assuming everyone still likes tacos.", "ai");\n  };', '    appendDemoResults(prompt);\n  };');
main = main.replace('  const runQuickSpin = async (): Promise<void> => {', '  const runQuickSpin = async (prompt: string): Promise<void> => {');
main = main.replace('    appendBubble("Here are five spots — assuming everyone still likes tacos.", "ai");\n    refreshStats();', '    appendDemoResults(prompt);\n    revealGhostTools();\n    ghostStatus.textContent = "Replay-safe Wait Ghost ready from this run. Share it only if you want to compare the waiting experience.";\n    refreshStats();');

main = replaceOnce(main,
`    runBtn.textContent = "Generating…";
    appendBubble("Where should five friends eat tonight in Austin?", "user");
    if (mode === "classic") await runClassic();
    else await runQuickSpin();`,
`    runBtn.textContent = "Running…";
    const prompt = promptInput.value.trim() || DEFAULT_PROMPT;
    promptInput.value = prompt;
    appendBubble(prompt, "user");
    if (mode === "classic") await runClassic(prompt);
    else await runQuickSpin(prompt);`,
'run custom prompt');
main = main.replace('    runBtn.textContent = "Run 12-second comparison";', '    runBtn.textContent = "Run my prompt";');

main = replaceOnce(main,
`  runBtn.addEventListener("click", () => void runDemo());`,
`  promptForm.addEventListener("submit", (event) => {
    event.preventDefault();
    void runDemo();
  });`,
'form submit');

main = replaceOnce(main,
`    copyGhostBtn.textContent = "Copy redacted Wait Ghost link";
    refreshStats();`,
`    copyGhostBtn.textContent = "Copy redacted Wait Ghost link";
    hideGhostTools();
    refreshStats();`,
'reset ghost visibility');

main = replaceOnce(main,
`  if (sharedGhost) {
    ghostStatus.textContent = \`Shared Wait Ghost loaded · \${sharedGhost.timeline.length} redacted event(s) · outcome \${sharedGhost.outcome}. Replay is historical, not live AI.\`;
  }
  refreshStats();`,
`  if (sharedGhost) {
    revealGhostTools();
    ghostStatus.textContent = \`Shared Wait Ghost loaded · \${sharedGhost.timeline.length} redacted event(s) · outcome \${sharedGhost.outcome}. Replay is historical, not live AI.\`;
  } else {
    hideGhostTools();
  }
  refreshStats();`,
'initial ghost visibility');

css += `

/* LAB USER PROMPT + RESULTS CLEANUP / 2026-09-16 */
[hidden] { display: none !important; }
.prompt-composer {
  display: grid;
  gap: 9px;
  margin: 0 0 16px;
  padding: 14px;
  border: 1px solid var(--line-strong);
  background: rgba(255, 255, 255, 0.025);
}
.prompt-composer label {
  color: var(--copper);
  font: 800 8px var(--mono);
  letter-spacing: 0.13em;
  text-transform: uppercase;
}
.prompt-composer textarea {
  width: 100%;
  min-height: 72px;
  resize: vertical;
  padding: 12px 13px;
  border: 1px solid var(--line);
  border-radius: 0;
  outline: none;
  color: var(--paper);
  background: #080b10;
  font: 500 13px/1.5 var(--sans);
}
.prompt-composer textarea:focus-visible {
  border-color: var(--acid);
  box-shadow: 0 0 0 1px var(--acid);
}
.prompt-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.prompt-meta span {
  color: var(--muted);
  font: 700 8px/1.45 var(--mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.prompt-meta .run {
  min-height: 40px;
  padding: 0 14px;
  border: 1px solid var(--acid);
  background: var(--acid);
  color: #0a0d08;
  cursor: pointer;
  font-weight: 800;
}
.demo-results {
  margin-top: 6px;
  border: 1px solid var(--line-strong);
  background: #0b0f14;
}
.demo-results-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 11px 13px;
  border-bottom: 1px solid var(--line);
}
.demo-results-head strong {
  color: var(--paper);
  font: 800 9px var(--mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.demo-results-head span {
  color: var(--muted);
  font: 700 8px var(--mono);
  text-transform: uppercase;
}
.demo-results-query {
  margin: 0;
  padding: 12px 13px;
  color: var(--paper-dim);
  border-bottom: 1px solid var(--line);
  font-size: 11px;
}
.demo-results-list { display: grid; }
.demo-result {
  display: grid;
  grid-template-columns: 34px 1fr;
  gap: 11px;
  padding: 12px 13px;
  border-bottom: 1px solid var(--line);
}
.demo-result:last-child { border-bottom: 0; }
.demo-result > b {
  color: var(--acid);
  font: 800 9px var(--mono);
}
.demo-result strong {
  display: block;
  color: var(--paper);
  font: 500 16px/1.1 var(--serif);
}
.demo-result span {
  display: block;
  margin-top: 4px;
  color: var(--copper);
  font: 800 7px var(--mono);
  letter-spacing: 0.1em;
}
.demo-result p {
  margin: 5px 0 0;
  color: var(--muted);
  font-size: 10px;
}
@media (max-width: 760px) {
  .mobile-dock { grid-template-columns: repeat(4, 1fr); }
  .prompt-meta { align-items: stretch; flex-direction: column; }
  .prompt-meta .run { width: 100%; }
  .demo-results-head { flex-direction: column; }
}
`;

fs.writeFileSync(mainPath, main);
fs.writeFileSync(cssPath, css);
console.log('Applied lab UX cleanup');

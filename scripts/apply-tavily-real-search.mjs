import fs from "node:fs";

const path = "src/demo/main.ts";
let s = fs.readFileSync(path, "utf8");

const mustReplace = (pattern, replacement, label) => {
  const next = s.replace(pattern, replacement);
  if (next === s) throw new Error(`Patch target not found: ${label}`);
  s = next;
};

mustReplace("  ExecutionSignal,\n", "", "unused execution signal import");

mustReplace(
  /interface DemoPhase[\s\S]*?const GENERAL_DEMO_RESULTS = \[[\s\S]*?\] as const;\n\n/,
  `interface SearchResult {\n  rank: number;\n  title: string;\n  url: string;\n  snippet: string;\n  score: number | null;\n  favicon: string | null;\n}\n\ninterface SearchSuccess {\n  ok: true;\n  provider: \"tavily\";\n  query: string;\n  answer: string;\n  results: SearchResult[];\n  requestId: string | null;\n  responseTime: number | string | null;\n  elapsedMs: number;\n}\n\ninterface SearchFailure {\n  ok: false;\n  code: string;\n  message: string;\n}\n\ntype SearchResponse = SearchSuccess | SearchFailure;\n\nconst PUBLIC_ROUTES = [\n  { path: \"/\", label: \"Home\" },\n  { path: \"/lab\", label: \"Lab\" },\n  { path: \"/proof\", label: \"Proof\" },\n  { path: \"/sdk\", label: \"SDK\" },\n] as const;\n\nconst INTERNAL_ROUTES = [{ path: \"/judges\", label: \"Judges\" }] as const;\nconst ALL_ROUTES = [...PUBLIC_ROUTES, ...INTERNAL_ROUTES];\n\nconst DEFAULT_PROMPT = \"Where should five friends eat tonight in Austin?\";\n\n`,
  "demo constants"
);

mustReplace(
  /\$\{pageHead\("Live wait lab", "Same wait\. Different experience\.", "Run the exact 12-second control, then the QuickSpin path\. The product can also demonstrate a real rejected-Promise failure without fabricating success\.", "02 \/ LAB"\)\}/,
  '${pageHead("Live wait lab", "Real search. Play the real wait.", "Ask a real question. QuickSpin stays active while Tavily searches the web, then the sourced results replace the waiting state. The negative path still proves that failure remains failure.", "02 / LAB")}',
  "lab heading"
);

mustReplace(
  '<div class="panel-kicker"><span>EXPERIMENT / QS-12</span><span>CONTROLLED 12.0s</span></div>',
  '<div class="panel-kicker"><span>LIVE SEARCH / TAVILY</span><span>REAL PROVIDER LATENCY</span></div>',
  "lab kicker"
);
mustReplace(
  '<div class="prompt-meta"><span>Same controlled 12-second wait · your prompt drives the demo</span><button id="run-demo" class="run" type="submit">Run my prompt</button></div>',
  '<div class="prompt-meta"><span>Real Tavily search · sourced results · no fabricated answer</span><button id="run-demo" class="run" type="submit">Search with QuickSpin</button></div>',
  "prompt meta"
);
mustReplace(
  '<div class="bubble ai">Ask for dinner ideas. The wait is deliberately fixed at twelve seconds.</div>',
  '<div class="bubble ai">Classic mode shows the same real Tavily request with a passive spinner.</div>',
  "classic intro"
);

mustReplace('delayMs: 0,', 'delayMs: 650,', "quickspin reveal delay");

mustReplace(
  /  const demoResultsFor = \(prompt: string\) =>[\s\S]*?  const revealGhostTools = \(\): void => \{/,
  `  const searchWeb = async (prompt: string): Promise<SearchSuccess> => {\n    const response = await fetch(\"/api/search\", {\n      method: \"POST\",\n      headers: { \"content-type\": \"application/json\" },\n      body: JSON.stringify({ query: prompt, maxResults: 5 }),\n    });\n    const payload = (await response.json().catch(() => null)) as SearchResponse | null;\n    if (!response.ok || !payload || !payload.ok) {\n      const message = payload && !payload.ok ? payload.message : \"Real search is unavailable.\";\n      const code = payload && !payload.ok ? payload.code : \`HTTP_\${response.status}\`;\n      throw new Error(\`\${code}: \${message}\`);\n    }\n    return payload;\n  };\n\n  const appendSearchResults = (search: SearchSuccess): void => {\n    const panel = mode === \"classic\" ? classicPanel : qsPanel;\n    const chat = panel.querySelector<HTMLElement>(\".chat\")!;\n    const wrap = document.createElement(\"section\");\n    wrap.className = \"demo-results\";\n    const head = document.createElement(\"div\");\n    head.className = \"demo-results-head\";\n    const title = document.createElement(\"strong\");\n    title.textContent = \`\${search.results.length} live result\${search.results.length === 1 ? \"\" : \"s\"}\`;\n    const note = document.createElement(\"span\");\n    note.textContent = \`Tavily · sourced web search\${search.responseTime ? \` · \${search.responseTime}s\` : \"\"}\`;\n    head.append(title, note);\n    const query = document.createElement(\"p\");\n    query.className = \"demo-results-query\";\n    query.textContent = \`For: “\${search.query}”\`;\n    wrap.append(head, query);\n    if (search.answer) {\n      const answer = document.createElement(\"p\");\n      answer.className = \"search-answer\";\n      answer.textContent = search.answer;\n      wrap.appendChild(answer);\n    }\n    const list = document.createElement(\"div\");\n    list.className = \"demo-results-list\";\n    for (const result of search.results) {\n      const item = document.createElement(\"article\");\n      item.className = \"demo-result\";\n      const rank = document.createElement(\"b\");\n      rank.textContent = String(result.rank).padStart(2, \"0\");\n      const body = document.createElement(\"div\");\n      const name = document.createElement(\"a\");\n      name.className = \"search-result-link\";\n      name.href = result.url;\n      name.target = \"_blank\";\n      name.rel = \"noopener noreferrer\";\n      name.textContent = result.title;\n      const meta = document.createElement(\"span\");\n      try {\n        meta.textContent = new URL(result.url).hostname.replace(/^www\\./, \"\");\n      } catch {\n        meta.textContent = \"source\";\n      }\n      const detail = document.createElement(\"p\");\n      detail.textContent = result.snippet || \"Open source result\";\n      body.append(name, meta, detail);\n      item.append(rank, body);\n      list.appendChild(item);\n    }\n    wrap.appendChild(list);\n    chat.appendChild(wrap);\n  };\n\n  const appendSearchFailure = (message: string): void => {\n    appendBubble(\`Search failed: \${message}\`, \"ai\");\n  };\n\n  const revealGhostTools = (): void => {`,
  "result renderer"
);

mustReplace(
  /  const runClassic = async \(prompt: string\): Promise<void> => \{[\s\S]*?\n  const runQuickSpin = async \(prompt: string\): Promise<void> => \{[\s\S]*?\n  \};\n\n  const runDemo = async \(\): Promise<void> => \{/,
  `  const runClassic = async (prompt: string): Promise<void> => {\n    classicPhase.textContent = \"Searching the web with Tavily…\";\n    const chat = classicPanel.querySelector<HTMLElement>(\".chat\")!;\n    const track = chat.querySelector<HTMLElement>(\".thinking\")!;\n    const fill = chat.querySelector<HTMLElement>(\".fill\")!;\n    const label = chat.querySelector<HTMLElement>(\".progress-label\")!;\n    track.style.display = \"flex\";\n    track.querySelector<HTMLElement>(\".spinner-label\")!.textContent = \"Searching the web…\";\n    fill.style.width = \"34%\";\n    label.textContent = \"LIVE\";\n    try {\n      const search = await searchWeb(prompt);\n      track.style.display = \"none\";\n      fill.style.width = \"100%\";\n      label.textContent = \"DONE\";\n      classicPhase.textContent = \`Tavily returned \${search.results.length} sourced result(s) in \${search.elapsedMs} ms.\`;\n      appendSearchResults(search);\n    } catch (error) {\n      track.style.display = \"none\";\n      const failure = error instanceof Error ? error : new Error(String(error));\n      classicPhase.textContent = \`FAILED — \${failure.message}\`;\n      appendSearchFailure(failure.message);\n      throw failure;\n    }\n  };\n\n  const runQuickSpin = async (prompt: string): Promise<void> => {\n    const session = ctrl.start({ status: \"Searching the web with Tavily…\" });\n    session.setProgress();\n    session.setPhase(\"Calling Tavily Search…\");\n    phaseEl.innerHTML = \"Phase: <strong>Calling Tavily Search…</strong> · real provider request in flight.\";\n    try {\n      const search = await searchWeb(prompt);\n      session.setPhase(\"Receiving sourced results…\");\n      for (const result of search.results) {\n        if (!result.url) continue;\n        session.signal({\n          kind: \"retrieval\",\n          label: \`Result \${result.rank}: \${result.title}\`.slice(0, 64),\n          evidenceRef: result.url,\n        });\n      }\n      if (search.requestId) {\n        session.signal({\n          kind: \"artifact\",\n          label: \`Tavily response assembled · \${search.results.length} results\`,\n          evidenceRef: \`tavily:request:\${search.requestId}\`,\n        });\n      }\n      session.setPhase(\"Rendering sourced answer…\");\n      session.complete();\n      appendSearchResults(search);\n      const capsule = ctrl.getLastCapsule();\n      phaseEl.innerHTML =\n        \`Phase: <strong>Done</strong> — Tavily returned <strong>\${search.results.length}</strong> sourced result(s) in <strong>\${search.elapsedMs} ms</strong>. Evidence Capsule retained <strong>\${capsule?.evidenceCoverage.acceptedSignals ?? 0}</strong> accepted signal(s).\`;\n      revealGhostTools();\n      ghostStatus.textContent =\n        \"Replay-safe Wait Ghost ready from this real search run. The Ghost excludes the prompt, result titles and source URLs.\";\n      refreshStats();\n      showGhostComparison();\n    } catch (error) {\n      const failure = error instanceof Error ? error : new Error(String(error));\n      session.signal({\n        kind: \"warning\",\n        label: \"Tavily search request failed\",\n        evidenceRef: \"provider:tavily:request-failed\",\n      });\n      session.fail(failure);\n      phaseEl.innerHTML = \`Phase: <strong>FAILED</strong> — \${failure.message}. No search results were fabricated.\`;\n      appendSearchFailure(failure.message);\n      refreshStats();\n      throw failure;\n    }\n  };\n\n  const runDemo = async (): Promise<void> => {`,
  "run functions"
);

mustReplace(
  /    if \(mode === "classic"\) await runClassic\(prompt\);\n    else await runQuickSpin\(prompt\);\n    running = false;\n    runBtn.disabled = false;\n    failureBtn.disabled = false;\n    runBtn.textContent = "Run my prompt";/,
  `    try {\n      if (mode === \"classic\") await runClassic(prompt);\n      else await runQuickSpin(prompt);\n    } finally {\n      running = false;\n      runBtn.disabled = false;\n      failureBtn.disabled = false;\n      runBtn.textContent = \"Search with QuickSpin\";\n    }`,
  "run demo cleanup"
);

fs.writeFileSync(path, s);

const cssPath = "src/demo/site.css";
let css = fs.readFileSync(cssPath, "utf8");
if (!css.includes(".search-result-link")) {
  css += `\n.search-result-link{display:inline-block;color:var(--paper);font-weight:800;text-decoration:none;line-height:1.2}.search-result-link:hover{text-decoration:underline;text-decoration-color:var(--acid);text-underline-offset:3px}.search-answer{margin:12px 0 2px;padding:12px 14px;border-left:2px solid var(--acid);background:#c9ff4a0a;color:var(--paper-dim);font-size:12px;line-height:1.55}\n`;
  fs.writeFileSync(cssPath, css);
}

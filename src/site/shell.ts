export type SitePage = "home" | "lab" | "proof" | "sdk" | "judges";

const NAV: Array<{ key: SitePage; label: string; href: string }> = [
  { key: "home", label: "Index", href: "/" },
  { key: "lab", label: "Live Lab", href: "/lab/" },
  { key: "proof", label: "Proof", href: "/proof/" },
  { key: "sdk", label: "SDK", href: "/sdk/" },
  { key: "judges", label: "Judges", href: "/judges/" },
];

export function mountPage(page: SitePage, body: string): HTMLElement {
  const app = document.getElementById("app");
  if (!app) throw new Error("#app mount not found");

  const nav = NAV.map(
    (item) =>
      `<a class="site-nav-link${item.key === page ? " is-active" : ""}" href="${item.href}">${item.label}</a>`
  ).join("");

  app.innerHTML = `
    <div class="site-shell">
      <div class="ambient-grid" aria-hidden="true"></div>
      <header class="site-header">
        <a class="brand-lockup" href="/" aria-label="QuickSpin home">
          <span class="brand-mark" aria-hidden="true"><i></i><b></b></span>
          <span class="brand-word">QUICKSPIN</span>
          <span class="brand-edition">WAIT SYSTEM / 01</span>
        </a>
        <nav class="site-nav" aria-label="Primary navigation">${nav}</nav>
        <a class="runtime-chip" href="https://quickspin-runtime.vercel.app" target="_blank" rel="noreferrer">
          <span class="runtime-dot" aria-hidden="true"></span> LIVE / VERIFIED
        </a>
      </header>
      <main>${body}</main>
      <footer class="site-footer">
        <div>
          <strong>QuickSpin</strong>
          <span>Playable waiting. Truthful outcomes.</span>
        </div>
        <div class="footer-links">
          <a href="https://github.com/Faadil1/quickspin" target="_blank" rel="noreferrer">Repository ↗</a>
          <a href="/proof/">Evidence</a>
          <a href="/judges/">Judge packet</a>
        </div>
        <div class="footer-stamp">BUILD CANDIDATE / 2026</div>
      </footer>
    </div>
  `;

  document.documentElement.dataset.page = page;
  return app;
}

export function statusMark(
  label: string,
  tone: "live" | "warn" | "fail" | "unknown" = "live"
): string {
  return `<span class="status-mark status-${tone}"><i></i>${label}</span>`;
}

export function receiptRow(key: string, value: string, note?: string): string {
  return `<div class="receipt-row"><span>${key}</span><strong>${value}</strong>${note ? `<small>${note}</small>` : ""}</div>`;
}

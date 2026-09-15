from pathlib import Path

p = Path('src/demo/main.ts')
text = p.read_text(encoding='utf-8')

anchor = '''const ROUTES = [\n'''
theme = '''const LAB_THEME = {\n  mode: "light" as const,\n  primary: "#a45f3d",\n  surface: "#e5e5de",\n  elevated: "#d4d5cf",\n  game: "#c7c9c3",\n  text: "#222321",\n  muted: "#62675f",\n  border: "rgba(34, 35, 33, 0.22)",\n  success: "#8fae2e",\n  radius: "2px",\n  font: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',\n};\n\n'''
if theme not in text:
    if anchor not in text:
        raise SystemExit('ROUTES anchor not found')
    text = text.replace(anchor, theme + anchor, 1)

old1 = '''  let controller: QuickSpinController = createQuickSpin({\n    target: mount,\n    delayMs: 0,\n    onEvent: logEvents(logEl),\n  });'''
new1 = '''  let controller: QuickSpinController = createQuickSpin({\n    target: mount,\n    delayMs: 0,\n    theme: LAB_THEME,\n    onEvent: logEvents(logEl),\n  });'''
if old1 not in text and new1 not in text:
    raise SystemExit('initial controller block not found')
text = text.replace(old1, new1, 1)

old2 = '''    controller = createQuickSpin({ target: mount, delayMs: 0, onEvent: logEvents(logEl) });'''
new2 = '''    controller = createQuickSpin({\n      target: mount,\n      delayMs: 0,\n      theme: LAB_THEME,\n      onEvent: logEvents(logEl),\n    });'''
if old2 not in text and new2 not in text:
    raise SystemExit('reset controller block not found')
text = text.replace(old2, new2, 1)

p.write_text(text, encoding='utf-8')
print('future-classic widget theme applied')

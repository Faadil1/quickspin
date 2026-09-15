from pathlib import Path

path = Path("scripts/apply-point12.py")
text = path.read_text()
text = text.replace(
    'import { createOrbitSurface, orbitGame, orbitResult, orbitStep, orbitTap } from "./orbit";',
    'import { createOrbitSurface, orbitResult, orbitStep, orbitTap } from "./orbit";',
)
text = text.replace(
    'import {\\n  createOrbitSurface,\\n  orbitAwardSignal,\\n  orbitGame,\\n  orbitResult,\\n  orbitStep,\\n  orbitTap,\\n} from "./orbit";',
    'import {\\n  createOrbitSurface,\\n  orbitAwardSignal,\\n  orbitResult,\\n  orbitStep,\\n  orbitTap,\\n} from "./orbit";',
)
path.write_text(text)
exec(compile(text, str(path), "exec"), {"__name__": "__main__"})

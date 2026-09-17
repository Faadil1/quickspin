import fs from 'node:fs';

const path = 'scripts/apply-lab-ux-cleanup.mjs';
let source = fs.readFileSync(path, 'utf8');
source = source.replace(/(?<!\\)\$\{/g, '\\${');
source = source.replace('`Missing patch target: \\${label}`', '`Missing patch target: ${label}`');
fs.writeFileSync(path, source);
console.log('Escaped generated template placeholders');

const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const files = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(target);
    else if (/\.(js|cjs)$/.test(entry.name)) files.push(target);
  }
}
walk(path.join(root, 'assets', 'js'));
walk(path.join(root, 'scripts'));
for (const file of files) execFileSync(process.execPath, ['--check', file], { stdio: 'inherit' });
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const match of html.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)) {
  if (!fs.existsSync(path.join(root, match[1]))) throw new Error(`Falta un recurso: ${match[1]}`);
}
console.log(`Sintaxis correcta en ${files.length} archivos. Recursos de Beyond verificados.`);
const {validateScience} = require('./validate-science.cjs');
const science = validateScience();
console.log(`Ciencias: ${science.questions} preguntas, ${science.topics} temas y distribuciones verificadas.`);
const {validateCitizenship} = require('./validate-citizenship.cjs');
const citizenship = validateCitizenship();
console.log(`Ciudadanía: ${citizenship.questions} preguntas, ${citizenship.topics} temas y distribuciones verificadas.`);

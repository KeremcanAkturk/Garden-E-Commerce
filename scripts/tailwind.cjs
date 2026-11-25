const fs = require('node:fs');
const path = require('node:path');
const { compile } = require('@tailwindcss/node');
const { Scanner } = require('@tailwindcss/oxide');
const root = path.resolve(__dirname, '..');

async function buildStyles() {
  const compiler = await compile('@import "tailwindcss";', { base: root, onDependency() {} });
  const scanner = new Scanner({ sources: [{ base: path.join(root, 'src'), pattern: '**/*.{js,jsx}', negated: false }] });
  const css = compiler.build(scanner.scan());
  const output = path.join(root, 'src/tailwind.generated.css');
  if (!fs.existsSync(output) || fs.readFileSync(output, 'utf8') !== css) fs.writeFileSync(output, css);
}

module.exports = buildStyles;
if (require.main === module) buildStyles().catch((error) => { console.error(error); process.exitCode = 1; });

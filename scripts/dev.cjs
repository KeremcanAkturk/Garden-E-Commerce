const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const buildStyles = require('./tailwind.cjs');

async function start() {
  await buildStyles();
  let timer;
  let pending = Promise.resolve();
  const watcher = fs.watch(path.resolve(__dirname, '../src'), { recursive: true }, (_, file) => {
    if (!file || !/\.jsx?$/.test(file)) return;
    clearTimeout(timer);
    timer = setTimeout(() => { pending = pending.then(buildStyles).catch(console.error); }, 100);
  });
  const server = spawn(process.execPath, [require.resolve('react-scripts/bin/react-scripts'), 'start'], { stdio: 'inherit', env: process.env });
  server.on('exit', (code) => { watcher.close(); process.exit(code || 0); });
  process.on('SIGINT', () => { watcher.close(); server.kill(); });
  process.on('SIGTERM', () => { watcher.close(); server.kill(); });
}
start().catch((error) => { console.error(error); process.exitCode = 1; });

import { benchmark } from './benchmark';

const testIdx = process.argv.findIndex(f => f.startsWith('--test'));
const test = testIdx !== -1 ? process.argv[testIdx + 1] : undefined;
const outIdx = process.argv.findIndex(f => f.startsWith('--out'));
const out = outIdx !== -1 ? process.argv[outIdx + 1] : undefined;
const durationIdx = process.argv.findIndex(f => f.startsWith('--duration'));
const duration = durationIdx !== -1 ? parseInt(process.argv[durationIdx + 1], 10) : undefined;
// const nodeIdx = process.argv.findIndex(f => f.startsWith('--node'));
// const node = nodeIdx ? process.argv[nodeIdx + 1] : undefined;
benchmark({
  fileName: out,
  duration: duration || 60000,
  benchName: test,
  // nodeVersion: node,
}).catch(console.log);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { config } = require('../../.build/vite.configurator');

export default config({
  cwd: __dirname,
  libName: '@aegenet/belt-benchmark',
  folder: 'node',
  entryPoint: 'belt-benchmark/src/node.js',
  external: ['node:perf_hooks'],
});
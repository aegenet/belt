// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../../.build/rollup.dts.configurator');

export default config({
  cwd: __dirname,
  libName: '@aegenet/belt',
  folder: 'node',
  entryPoint: 'node.ts',
  external: ['node:perf_hooks'],
  nodeExternal: true,
});

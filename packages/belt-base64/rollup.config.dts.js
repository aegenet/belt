// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../../.build/rollup.dts.configurator');

export default config({
  cwd: __dirname,
  libName: '@aegenet/belt-base64',
  folder: 'node',
  entryPoint: 'node.ts',
  nodeExternal: true,
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { config } = require('./../../.build/vite.configurator');

export default config({
  cwd: __dirname,
  libName: '@aegenet/belt-rows-inflator',
  entryPoint: 'belt-rows-inflator/src/index',
});

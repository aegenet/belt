import config from './../../.build/rollup.dts.configurator.mjs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export default config({
  cwd: dirname(fileURLToPath(import.meta.url)),
  libName: '@aegenet/belt-obj-to-map',
  entryPoint: 'index.ts',
  nodeExternal: true,
});
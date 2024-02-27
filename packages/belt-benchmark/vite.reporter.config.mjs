import config from '../../.build/vite.configurator.mjs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export default config({
  cwd: dirname(fileURLToPath(import.meta.url)),
  libName: '@aegenet/belt-benchmark',
  folder: 'reporter',
  entryPoint: 'bench/index.ts',
  external: [/^node:/],
});

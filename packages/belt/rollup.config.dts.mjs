import { rollupDTSConfigurator } from '@aegenet/yawt';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export default rollupDTSConfigurator({
  cwd: dirname(fileURLToPath(import.meta.url)),
  libName: '@aegenet/belt',
  folder: 'node',
  entryPoint: 'src/node.ts',
  external: ['node:perf_hooks'],
  nodeExternal: true,
});

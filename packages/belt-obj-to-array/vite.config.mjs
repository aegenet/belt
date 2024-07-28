import { viteConfigurator } from '@aegenet/yawt';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export default viteConfigurator({
  cwd: dirname(fileURLToPath(import.meta.url)),
  libName: '@aegenet/belt-obj-to-array',
  entryPoint: 'src/index.ts',
  nodeExternal: true,
});

import { viteConfigurator } from '@aegenet/yawt';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export default viteConfigurator({
  cwd: dirname(fileURLToPath(import.meta.url)),
  libName: '@aegenet/belt-task-flow',
  entryPoint: 'src/index.ts',
  nodeExternal: true,
});

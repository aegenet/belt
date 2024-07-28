import { viteConfigurator } from '@aegenet/yawt';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export default viteConfigurator({
  cwd: dirname(fileURLToPath(import.meta.url)),
  libName: '@aegenet/belt-fastify-abort',
  folder: 'node',
  entryPoint: 'src/node.ts',
  nodeExternal: true,
});

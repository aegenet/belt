import { rollupDTSConfigurator } from '@aegenet/yawt';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export default rollupDTSConfigurator({
  cwd: dirname(fileURLToPath(import.meta.url)),
  libName: '@aegenet/belt-str-escape-regex',
  entryPoint: 'src/index.ts',
  nodeExternal: true,
});

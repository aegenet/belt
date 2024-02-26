import dts from 'rollup-plugin-dts';
import path from 'node:path';
import { nodeExternals } from '@aegenet/ya-node-externals';

export default async function(options) {
  const folder = options.folder ? options.folder + '/' : '';
  return {
    input: path.resolve(options.cwd, `src/${options.entryPoint || 'index.ts'}`),
    // make sure to externalize deps that shouldn't be bundled
    // into your library
    external: options.nodeExternal ? (await nodeExternals(options.cwd)).concat([/node_modules/, /^node:/]).concat(options.external || []) : options.external || [],
    output: [
      {
        format: 'es',
        file: `./dist/${folder}bundle.d.ts`,
        globals: options.globals || {},
      },
    ],
    plugins: [(dts.default || dts)()],
  };  
}

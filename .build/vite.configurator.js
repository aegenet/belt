// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export function config(options) {
  const folder = options.folder ? options.folder + '/' : '';
  return defineConfig({
    build: {
      outDir: `./dist/${folder}`,
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(options.cwd, `build/${options.entryPoint || 'index.js'}`),
        name: options.libName,
        fileName: 'index',
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: options.external || [],
        output: [
          {
            format: 'cjs',
            entryFileNames: `index.cjs`,
            globals: options.globals || {},
          },
          {
            format: 'es',
            entryFileNames: `index.mjs`,
            globals: options.globals || {},
          },
          {
            format: 'umd',
            entryFileNames: `index.[format].js`,
            globals: options.globals || {},
          },
        ],
      },
    },
  });  
}

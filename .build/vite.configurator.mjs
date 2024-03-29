// vite.config.js
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { nodeExternals } from '@aegenet/ya-node-externals';
import { yaViteBanner } from '@aegenet/ya-vite-banner';

/**
 * Config
 */
export default async function config({
  /** Working directory */
  cwd = process.cwd(),
  /**
   * lib name
   */
  libName = '',
  /**
   * entry point (with extension)
   */
  entryPoint = 'index.js',
  /**
   * output subfolder (in ./dist/)
   */
  folder = '',
  /**
   * output name (in ./dist/[folder]/[outputName].xxx)
   */
  outputName = 'index',
  /** 
   * node external? (boolean)
   */
  nodeExternal = false,
  /** 
   * rollup external (string[])
   */
  external = [],
  /**
   * rollup globals
   * @param Record<string, string>
   */
  globals = {},
  /**
   * Minify Keep Class Names
   */
  minifyKeepClassNames = false,
}) {
  folder = folder ? folder + '/' : '';
  const dependencies = nodeExternal ? await nodeExternals(cwd) : [];
  if (dependencies.length) {
    console.log(`FYI: your project depends to ${dependencies.length} packages.`);
  }

  return defineConfig({
    build: {
      plugins: [yaViteBanner({
        raw: true,
        banner: "#!/usr/bin/env node",
        entryOnly: true,
        test: /cli\.(js|ts|cjs|mjs|.umd.js)$/
      })],
      outDir: `./dist/${folder}`,
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(cwd, entryPoint || 'index.ts'),
        name: libName,
        fileName: outputName || 'index',
      },
      minify: minifyKeepClassNames === true ? 'terser' : 'esbuild',
      terserOptions: minifyKeepClassNames === true ? {
        keep_classnames: true,
      } : undefined,
      rollupOptions: {
        // input: resolve(cwd, `src/${entryPoint || 'index.ts'}`),
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: nodeExternal ? dependencies.concat([/^node:/]).concat(external || []) : external || [],
        output: [
          {
            name: libName,
            // generatedCode: 'es2015',
            format: 'cjs',
            entryFileNames: `[name].cjs`,
            globals: globals || {},
          },
          {
            name: libName,
            // generatedCode: 'es2015',
            format: 'es',
            entryFileNames: `[name].mjs`,
            globals: globals || {},
          },
          {
            name: libName,
            // generatedCode: 'es2015',
            format: 'umd',
            entryFileNames: `[name].[format].js`,
            globals: globals || {},
          },
        ],
      },
    }
  });  
}

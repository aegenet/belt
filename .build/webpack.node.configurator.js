const path = require('path');
const fs = require('fs');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { BundleDeclarationsWebpackPlugin } = require('bundle-declarations-webpack-plugin');

/**
 * 
 * @param {
 *   org: string;
 *   name: string;
 *   directory: string;
 *   subdir?: string;
 *   target?: 'node' | 'web' | string;
 *   libraryType?: string;
 *   externals?: unknown[];
 *   plugins?: unknown[];
 *   indexFileName?: string;
 *   cliFileName?: string;
 * } options 
 * @returns Webpack Configuration
 * 
 */
module.exports = function(
  options
) {
  const indexPath = path.join(options.directory, `./src/${options.indexFileName ?? 'index.ts'}`);
  const cliPath = path.join(options.directory, `./src/${options.cliFileName ?? 'cli.ts'}`);
  const entry = { [options.name]: indexPath };
  const outputDir = path.join(options.directory, 'dist/');
  const outputDirSubDir = options.subdir ? path.join(outputDir, options.subdir) : outputDir;

  if (fs.existsSync(cliPath)) {
    entry[options.name + '-cli'] = cliPath;
  }

  return function (env, { analyze }) {
    const production = env.production || process.env.NODE_ENV === 'production';
    return {
      target: options.target ? options.target : 'es2017',
      mode: production ? 'production' : 'development',
      devtool: production ? undefined : 'eval-cheap-source-map',
      entry,
      node: {
        __dirname: false,
        __filename: false,
      },
      experiments: {
        outputModule: options.libraryType === 'module' ? true : false,
      },  
      output: {
        path: outputDirSubDir,
        filename: options.libraryType === 'module' ? 'index.mjs' : 'index.cjs',
        // filename: `[name].bundle.js`,
        library: production ? { type: options.libraryType ?? 'module' } : undefined,
        chunkFormat: options.libraryType === 'module' ? 'module' : 'commonjs',
      },
      externalsPresets: { node: true },
      externals: options.externals,
      plugins: [
        ... options.plugins ?? [],
        new BundleDeclarationsWebpackPlugin({
            entry: {
              filePath: indexPath,
              libraries: {
                inlinedLibraries: [],
                allowedTypesLibraries: [],
              },
              output: {
                exportReferencedTypes: false,
              }
            },
            outFile: 'bundle.d.ts',
            compilationOptions: {
              // Evite que nos projets du monorepo soient fusionnés dans le d.ts
              followSymlinks: false,
            },
        }),
        new Dotenv({
          path: `./.env${production ? '' : '.' + (process.env.NODE_ENV || 'development')}`,
        }),
        analyze && new BundleAnalyzerPlugin(),
      ].filter(f => f),
      resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(options.directory, 'src'), path.join(options.directory, 'node_modules')],
        alias: {
          [options.name]: path.join(options.directory, 'src'),
          [`@${options.org}/${options.name}`]: path.join(options.directory, 'src/'),
        },
      },
      devServer: {
        historyApiFallback: true,
        open: !process.env.CI,
        port: 9322,
      },
      module: {
        rules: [
          { test: /\.ts$/i, use: ['ts-loader'], exclude: /node_modules/ },
        ]
      }
    };
  };
};

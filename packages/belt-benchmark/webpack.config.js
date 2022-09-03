/* eslint-disable @typescript-eslint/no-var-requires */
const nodeExternals = require('webpack-node-externals');
const configuratorNode = require('./../../.build/webpack.node.configurator');

module.exports = [
  configuratorNode({
    org: 'aegenet',
    name: 'belt-benchmark',
    directory: __dirname,
    target: 'node16',
    subdir: 'node',
    libraryType: 'commonjs',
    externals: [nodeExternals({ importType: 'commonjs' })],
    indexFileName: 'node.ts',
  }),
  configuratorNode({
    org: 'aegenet',
    name: 'belt-benchmark',
    directory: __dirname,
    target: 'web',
    subdir: 'web',
    libraryType: 'commonjs',
    externals: [nodeExternals({ importType: 'commonjs' })],
    indexFileName: 'browser.ts',
  }),
  configuratorNode({
    org: 'aegenet',
    name: 'belt-benchmark',
    directory: __dirname,
    target: 'es2017',
    subdir: 'node',
    libraryType: 'module',
    externals: [nodeExternals({ importType: 'module' })],
    indexFileName: 'node.ts',
  }),
  configuratorNode({
    org: 'aegenet',
    name: 'belt-benchmark',
    directory: __dirname,
    target: 'es2017',
    subdir: 'web',
    libraryType: 'module',
    externals: [nodeExternals({ importType: 'module' })],
    indexFileName: 'browser.ts',
  }),
];

/* eslint-disable @typescript-eslint/no-var-requires */
const nodeExternals = require('webpack-node-externals');
const configuratorNode = require('./../../.build/webpack.node.configurator');

module.exports = [
  configuratorNode({
    org: 'aegenet',
    name: 'belt-symbols-is-balanced',
    directory: __dirname,
    target: 'node16',
    subdir: 'node',
    libraryType: 'commonjs',
    externals: [nodeExternals({ importType: 'commonjs' })],
  }),
  configuratorNode({
    org: 'aegenet',
    name: 'belt-symbols-is-balanced',
    directory: __dirname,
    target: 'web',
    subdir: 'web',
    libraryType: 'commonjs',
    externals: [nodeExternals({ importType: 'commonjs' })],
  }),
  configuratorNode({
    org: 'aegenet',
    name: 'belt-symbols-is-balanced',
    directory: __dirname,
    target: 'es2017',
    subdir: 'node',
    libraryType: 'module',
    externals: [nodeExternals({ importType: 'module' })],
  }),
  configuratorNode({
    org: 'aegenet',
    name: 'belt-symbols-is-balanced',
    directory: __dirname,
    target: 'es2017',
    subdir: 'web',
    libraryType: 'module',
    externals: [nodeExternals({ importType: 'module' })],
  }),
];

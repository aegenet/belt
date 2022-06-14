/* eslint-disable @typescript-eslint/no-var-requires */
// const nodeExternals = require('webpack-node-externals');
const configuratorNode = require('./../../.build/webpack.node.configurator');

module.exports = [
  configuratorNode({
    org: 'aegenet',
    name: 'belt',
    directory: __dirname,
    target: 'node16',
    subdir: 'node',
    libraryType: 'commonjs',
    indexFileName: 'node.ts',
    // externals: [nodeExternals({})],
  }),
  configuratorNode({
    org: 'aegenet',
    name: 'belt',
    directory: __dirname,
    target: 'es2017',
    subdir: 'node',
    libraryType: 'module',
    indexFileName: 'node.ts',
    // externals: [nodeExternals({})],
  }),
  configuratorNode({
    org: 'aegenet',
    name: 'belt',
    directory: __dirname,
    target: 'web',
    subdir: 'web',
    libraryType: 'commonjs',
    indexFileName: 'browser.ts',
    // externals: [nodeExternals({})],
  }),
  configuratorNode({
    org: 'aegenet',
    name: 'belt',
    directory: __dirname,
    target: 'es2017',
    subdir: 'web',
    libraryType: 'module',
    indexFileName: 'browser.ts',
    // externals: [nodeExternals({})],
  }),
];

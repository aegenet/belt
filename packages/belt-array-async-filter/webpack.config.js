/* eslint-disable @typescript-eslint/no-var-requires */
const nodeExternals = require('webpack-node-externals');
const configuratorNode = require('./../../.build/webpack.node.configurator');

module.exports = [
  configuratorNode({
    org: 'aegenet',
    name: 'belt-array-async-filter',
    directory: __dirname,
    target: 'node',
    subdir: 'node',
    libraryType: 'commonjs',
    externals: [nodeExternals({})],
  }),
  configuratorNode({
    org: 'aegenet',
    name: 'belt-array-async-filter',
    directory: __dirname,
    target: 'web',
    subdir: 'web',
    libraryType: 'commonjs',
    externals: [nodeExternals({})],
  }),
];

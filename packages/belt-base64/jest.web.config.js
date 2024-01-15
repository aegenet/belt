/* eslint-disable @typescript-eslint/no-var-requires */
const configurator = require('../../.build/jest.web.configurator');
module.exports = configurator({
  directory: __dirname,
  testRegex: 'src/(.*)\\.spec\\.(ts|js)$',
  // collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
});

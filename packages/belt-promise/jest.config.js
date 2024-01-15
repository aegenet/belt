/* eslint-disable @typescript-eslint/no-var-requires */
const configurator = require('../../.build/jest.configurator');

module.exports = configurator({
  directory: __dirname,
  testRegex: 'src/(.*)\\.spec\\.(ts|js)$',
});

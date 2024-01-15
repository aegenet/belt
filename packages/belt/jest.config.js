/* eslint-disable @typescript-eslint/no-var-requires */
const configurator = require('../../.build/jest.configurator');

module.exports = configurator({
  directory: __dirname,
  testRegex: '(/__tests__/node.*|\\.spec)\\.(ts|js)$',
});

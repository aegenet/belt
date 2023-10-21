/* eslint-disable @typescript-eslint/no-var-requires */
const { parentPort } = require('node:worker_threads');

parentPort.on('message', data => {
  parentPort.postMessage(data);
});

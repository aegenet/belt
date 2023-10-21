/* eslint-disable @typescript-eslint/no-var-requires */
const { workerData, parentPort } = require('node:worker_threads');

parentPort.postMessage(workerData);

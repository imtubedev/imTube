'use strict';

const assert = require('assert');
const Keyv = require('keyv');
let count = 0;
module.exports = app => {
  app.addSingleton('keyv', (config, app) => {

    assert(config.host && config.port && config.password !== undefined && config.db !== undefined,
      `[egg-keyv] 'host: ${config.host}', 'port: ${config.port}', 'password: ${config.password}', 'db: ${config.db}' are required on config`);
    const keyv = new Keyv(config.url || '', config); 
    keyv.on('error', err => app.coreLogger.error('Connection Error', err));

    app.beforeStart(() => {
      const index = count++;
      app.coreLogger.info(`[egg-keyv] instance[${index}] status OK`);
    });
    return keyv
  });
};
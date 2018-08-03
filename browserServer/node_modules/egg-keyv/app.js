'use strict';
const keyv = require('./lib/keyv')

module.exports = app => {
  if (app.config.keyv.app) keyv(app);
};

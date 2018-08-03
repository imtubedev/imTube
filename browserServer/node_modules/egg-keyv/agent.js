'use strict';
const keyv = require('./lib/keyv')

module.exports = agent => {
  if (agent.config.keyv.agent) keyv(agent)
};

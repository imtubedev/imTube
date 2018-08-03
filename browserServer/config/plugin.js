"use strict";
exports.mongo = {
    enable: false,
    package: 'egg-mongo-native',
};
exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks',
};
exports.mongoose = {
    enable: true,
    package: 'egg-mongoose',
};

exports.mongooseLogger = {
    enable: true,
    package: 'egg-mongoose-logger',
};

exports.sessionRedis = {
    enable: true,
    package: 'egg-session-redis',
};

exports.redis = {
    enable: true,
    package: 'egg-redis',
};
exports.keyv = {
    enable: true,
    package: 'egg-keyv'
};

exports.jwt = {
    enable: true,
    package: 'egg-jwt',
};

exports.joi = {
    enable: true,
    package: 'egg-joi',
};
exports.cors = {
    enable: false,
    package: 'egg-cors',
  };
exports.i18n = {
    enable: true,
    package: 'egg-i18n',
  };
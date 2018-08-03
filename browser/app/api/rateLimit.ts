const ratelimit = require('koa-ratelimit');
const redis = require('redis');
const config = require('../../config/config.params');

// email 限定
exports.emailBasedRatelimit = ratelimit({
    db: redis.createClient(),
    duration: config.baseLimit.email.duration,
    max: config.baseLimit.email.max,
    // tslint:disable-next-line:object-literal-shorthand
    id: function (context) {
        return context.body.email;
    }
});

// ip 限定
exports.ipBasedRatelimit = ratelimit({
    db: redis.createClient(),
    duration: config.baseLimit.ip.duration,
    max: config.baseLimit.ip.max,
    // tslint:disable-next-line:object-literal-shorthand
    id: function (context) {
        return context.ip;
    }
    // tslint:disable-next-line:eofline
}); 
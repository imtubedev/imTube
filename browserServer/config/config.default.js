'use strict';
const fs = require("fs");
const path = require("path");
require("source-map-support/register");
module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1515399912006_4674';
    config.mongoose = {
        url: 'mongodb://127.0.0.1:27017/eosmain',
        options: {
            // useMongoClient: true,
            // autoReconnect: true,
            // reconnectTries: Number.MAX_VALUE,
            // bufferMaxEntries: 0,
        },
    }

    config.mongooseLogger = {
        debug: true,
        // custom formatter, optional
        formatter: function (meta) {
            const query = JSON.stringify(meta.query);
            const options = JSON.stringify(meta.options || {});
            return `db.getCollection('${meta.collectionName}').${meta.methodName}(${query}, ${options})`;
        },
    };

    config.redis = {
        clients: {
            session: {
                port: 6379, // Redis port
                host: '127.0.0.1', // Redis host
                password: '',
                db: 0
            }
        }
    };

    exports.sessionRedis = {
        name: 'session', // specific instance `session` as the session store
    };

    config.siteFile = {
        '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/public/favicon.png')),
    };
    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks',
        },
    };
    config.news = {
        pageSize: 30,
        serverUrl: 'https://hacker-news.firebaseio.com/v0',
    };

    config.keyv = {
        clients: {
            instance: {
                port: 6379, // Redis port
                host: '127.0.0.1', // Redis host
                password: '',
                db: 0,
                namespace: 'keyv',
                adapter: 'redis'
            },
            user: {
                port: 6379, // Redis port
                host: '127.0.0.1', // Redis host
                password: '',
                db: 1,
                namespace: 'users',
                adapter: 'redis'
            }
        }
    };


    exports.passportGithub = {
        key: 'imTubeKey',
        secret: 'imTubeSecret',
    };

    config.joi = {
        options: {},
        locale: {
            'zh-cn': {}
        },
        enable: true,
    };

    config.jwt = {
        enable: false,
        //secret: 'd90289cc2e92c046b5f15f9a6ef747b9'
        secret: 'utwi57prx4yfgl12o0snmaq9h3vbjckz',
        match: '/shop',
    }

    config.static = {
        // maxAge: 31536000,
    };

    config.security = {
         /*xframe: {
            enable: false,
          },*/
          csrf: {
            enable: false,
          },
          //domainWhiteList: [ 'http://localhost:8000' ],
      };
    //跨越设置
    config.cors = {
        //credentials:true,
        //enable: true,
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
      };
    //云帆数据访问域名
    config.YFCLOUD = {
        // dnsname:'fenglikeji.oss.yfcloud.io',
        // accesskey:'7U__VuXwvT1Ht01ZGjXk9WbyCyldScxx2sad4uiY_Jo=',
        // secrect:'wwd0N4tW5d6sW0BX4aH4oFqwCPcgx07bJj_36BHDG6U=',
        // roomid:'fenglikeji'
        dnsname:'flimg.oss.yfcloud.io',
        accesskey:'7U__VuXwvT1Ht01ZGjXk9WbyCyldScxx2sad4uiY_Jo=',
        secrect:'wwd0N4tW5d6sW0BX4aH4oFqwCPcgx07bJj_36BHDG6U=',
        roomid:'flimg'
    };

     ////i18国际化插件设置
     config.i18n = {
        // 默认语言，默认 "en-US",'zh-CN',
        defaultLocale: 'zh-CN',
        // URL 参数，默认 "locale"
        queryField: 'locale',
        // Cookie 记录的 key, 默认："locale"
        cookieField: 'locale',
        // Cookie 默认 `1y` 一年后过期， 如果设置为 Number，则单位为 ms
        cookieMaxAge: '1y',
      };

    config.middleware=['auth'];
    config.middleware = ['saveSession'];

    return config;
};

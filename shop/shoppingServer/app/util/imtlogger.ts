'use strict';
const urllib = require('urllib');
const Transport = require('egg-logger').Transport;
const Logger = require('egg-logger').Logger; 
 
class UrllibTransport extends Transport {
 
  log(level, args, meta) {
    const msg = super.log(level, args, meta);
    return urllib.request('url?msg=' + msg);
  }
}

export default class ImtLogger {
    async logInfo(msg){
        const logger = new Logger();
        logger.set('remote', new UrllibTransport()); 
        logger.log(msg);
    }
}
 
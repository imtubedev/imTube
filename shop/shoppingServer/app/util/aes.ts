'use strict';
//const fs = require('fs');
import * as crypto from 'crypto';
const algorithm = 'aes-256-ctr';

exports.encrypt = (buffer, password) => {
    const cipher = crypto.createCipher(algorithm, password);
    const crypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return crypted;
};
exports.decrypt = (buffer, password) => {
    const decipher = crypto.createDecipher(algorithm, password);
    const dec = Buffer.concat([decipher.update(buffer), decipher.final()]);
    return dec;
};

'use strict';

const crypto = require('crypto');

module.exports = {
    getSalt() {
        const salt = crypto.randomBytes(128).toString('base64');
        return salt;
    },
    getPassHash(salt, password) {
        const passHash = crypto
            .createHmac('sha256', salt)
            .update(password)
            .digest('hex');

        return passHash;
    }
};
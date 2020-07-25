'use strict';

const LocalStrategy = require('passport-local');
const hashing = require("../../utilities/encryptor");

module.exports = (passport, data) => {
    const authStrategy = new LocalStrategy(
        (username, password, done) => {

            data.getUserByUsername(username)
                .then(user => {
                    const passHash = hashing.getPassHash(user.salt, password);

                    if (user && user.passHash === passHash) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                })
                .catch(err => done(err, false));
        }
    )

    passport.use(authStrategy);
}
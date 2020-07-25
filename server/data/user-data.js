'use strict'

const hashing = require('../utilities/encryptor');

module.exports = function (models) {
    const User = models.User;

    return {
        getUserById(id) {

        },
        getUserByUsername(username) {
            return new Promise((resolve, reject) => {
                User.findOne({ username: username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!user) {
                        return reject({ error: 'User not found' });
                    }

                    return resolve(user);
                });
            });
        },
        createUser(user) {
            return new Promise((resolve, reject) => {

                const salt = hashing.getSalt(),
                    passHash = hashing.getPassHash(salt, user.passHash);
                // if (!validator.isValidUser(user)) {
                //     return reject({ error: 'Invalid information' });
                // }
                const newUser = new User({
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    passHash: passHash,
                    salt: salt,
                    email: user.email,
                    giftCards: user.giftCards,
                    addresses: user.watchlist
                });
                newUser.save(err => {

                    if (err) {
                        return reject(err);
                    }

                    return resolve(newUser);
                });
            });
        },
        updateUserInformation(email, newInfo) {
            return new Promise((resolve, reject) => {
                User.findOneAndUpdate({ email }, newInfo,
                    (err, user) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(user);
                    }
                );
            });
        },
        addToWatchlist() {

        },
        addToPurchases() {

        }
    }
};
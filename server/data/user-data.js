'use strict'

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
        createUser() {

        },
        addToWatchlist() {

        },
        addToPurchases() {

        }
    }
};
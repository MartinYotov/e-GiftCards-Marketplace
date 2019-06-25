'use strict'

module.exports = function (models) {
    const Store = models.Store;

    return {
        getAllStores() {
            return new Promise((resolve, reject) => {
                Store.find({}, (err, stores) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(stores);
                })
            });
        },
        getStoreById(id) {
            return new Promise((resolve, reject) => {
                Store.findById(id, (err, store) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(store);
                });
            });
        },
        createStore(store) {
            const newStore = new Store(store);

            return new Promise((resolve, reject) => {
                newStore.save(err => {
                    if (err) {
                        reject(err);
                    }

                    return resolve(newStore);
                });
            });
        },
        addGiftCardToStore(giftCard) {
            console.log(111)
            console.log(giftCard);
            const giftCardToAdd = {
                _id: giftCard._id,
                cardValue: giftCard.cardValue,
                price: giftCard.price,
                discountPercentage: giftCard.discountPercentage

            }
            return new Promise((resolve, reject) => {
                Store.findOneAndUpdate(
                    { name: giftCard.store },
                    { $push: { 'giftCards': giftCardToAdd } },
                    (err) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve({ giftCardId: giftCardToAdd._id });
                    });
            });
        }
    }
};
'use strict'

module.exports = function (models) {
    const Store = models.Store;

    return {
        getAllStores() {
            return new Promise((resolve, reject) => {
                Store.find({}, null, {sort: {name: 1}}, (err, stores) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(stores);
                })
            });
        },
        getStoreNames() {
            return new Promise((resolve, reject) => {
                Store.find({}, 'name', {sort: {name: 1}}, (err, stores) => {
                    if (err) {
                        console.log(123);
                        console.log(err);
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
                        console.log(456);
                        console.log(err);
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
            const giftCardToAdd = {
                _id: giftCard._id,
                cardValue: giftCard.cardValue,
                price: giftCard.price,
                discountPercentage: giftCard.discountPercentage

            }
            console.log('addGiftCardToStore');
            console.log(giftCard);
            return new Promise((resolve, reject) => {
                Store.findByIdAndUpdate(
                    giftCard.store,
                    { $push: { 'giftCards': giftCardToAdd } },
                    (err) => {
                        if (err) {
                            console.log('Failed to add gc to store');
                            return reject(err);
                        }
                        return resolve({ giftCardId: giftCardToAdd._id });
                    });
            });
        }
    }
};
'use strict'

module.exports = function(models) {
    const GiftCard = models.GiftCard;

    return {
        getAllGiftCards() {
            return new Promise((resolve, reject) => {
                GiftCard.find({}, (err, giftCards) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(giftCards);
                });
            });
        },
        getGiftCardById(id){
            return new Promise((resolve, reject) => {
                GiftCard.findById(id, (err, giftCard) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(giftCard);
                });
            });
        },
        createGiftCard(giftCard) {
            const newGiftCard = new GiftCard(giftCard);
            console.log(newGiftCard);

            return new Promise((resolve, reject) => {
                // TODO: validate
                newGiftCard.save(err => {
                    if (err) {
                        console.log('err');
                        console.log(JSON.stringify(err));
                        return reject(err);
                    }

                    return resolve(newGiftCard);
                })
            });
        },
        getBestDeals() {

        },
        deleteGiftCard() {
            
        }
    }
};
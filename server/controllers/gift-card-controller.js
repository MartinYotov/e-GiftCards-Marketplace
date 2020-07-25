'use strict'

module.exports = ({ data }) => {
    console.log(data);
    return {
        getAllGiftCards(req, res) {
            data.getAllGiftCards()
                .then(giftCards => {
                    res.status(200).json(giftCards);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getGiftCardById(req, res) {
            const id = req.params.id;

            data.getGiftCardById(id)
                .then(giftCard => {

                    if (!giftCard) {
                        console.log('no gift card found');
                    }

                    res.json(giftCard);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        createGiftCard(req, res) {
            const body = req.body;
            const user = req.user.username;

            data.createGiftCard({
                store: body.store,
                code: body.code,
                cardValue: body.cardValue,
                price: body.price,
                discountPercentage: body.discountPercentage,
                // expirationDate: data.expirationDate,
                user: user
            })
            .then(giftCard => {
                return data.addGiftCardToStore(giftCard);
            })
            .then(({ giftCardId }) => {
                return res.status(201).json({
                    message: 'Gift Card created',
                    giftCard: giftCardId
                });
            })
            .catch(err => {
                return res.status(500).json({ 
                    error: "Failed to create gift card",
                    message: JSON.stringify(err)
                });
            });
        },
        getBestDeals(req, res) {
            data.getAllGiftCards()
                .then(giftCards => {
                    const bestDeals = [];
                    giftCards.forEach(card => {
                        let index = bestDeals.findIndex(deal => {
                            return deal.store === card.store;
                        });
                        if (index !== -1) {
                            if (bestDeals[index].discountPercentage < card.discountPercentage) {
                                bestDeals[index] = card;
                            }
                        } else {
                            bestDeals.push(card);
                        }
                    })
                    res.status(200).json(bestDeals);
                })
                .catch(err => {
                    console.log(err);
                 //   res.status()
                });
        },
    }
}
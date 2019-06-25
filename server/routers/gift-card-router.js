'use strict'

module.exports = ({ app, controllers }) => {
    const controller = controllers.giftCard;
    const giftCardsRoute = '/api/gift-card';

    app.get(giftCardsRoute, controller.getAllGiftCards);
    app.post(giftCardsRoute, controller.createGiftCard);
};
'use strict'

module.exports = ({ app, controllers, passport }) => {
    const controller = controllers.giftCard;
    const giftCardsRoute = '/api/gift-card';
    const bestDealsRoute = '/api/best-deals';

    app.get(giftCardsRoute, controller.getAllGiftCards);
    app.get(giftCardsRoute + '/:id', controller.getGiftCardById);
    app.post(giftCardsRoute, passport.authenticate('jwt', { session: false }), controller.createGiftCard);
    
    app.get(bestDealsRoute, controller.getBestDeals);
};
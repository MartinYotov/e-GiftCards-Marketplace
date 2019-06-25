'use strict'

module.exports = ({ app, controllers }) => {
    const controller = controllers.store;
    const storeRoute = '/api/store';

    app.get(storeRoute, controller.getAllStores);
    app.post(storeRoute, controller.createStore);
    app.get(storeRoute + '/:id', controller.getAllStores);
};
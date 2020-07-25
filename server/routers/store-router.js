'use strict'

module.exports = ({ app, controllers }) => {
    const controller = controllers.store;
    const storeRoute = '/api/store';

    app.get(storeRoute, controller.getAllStores);    
    app.get(storeRoute + '/names', controller.getStoreNames);
    app.get(storeRoute + '/:id', controller.getStoreById);
    app.post(storeRoute, controller.createStore);    
};
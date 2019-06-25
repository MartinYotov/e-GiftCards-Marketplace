'use strict'

module.exports = ({ app, controllers }) => {
    const controller = controllers.user;
    const userRoute = '/api/user';

    app.get(userRoute + '/:username', controller.getUser);
};
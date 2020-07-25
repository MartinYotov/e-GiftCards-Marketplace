'use strict'

module.exports = ({ app, controllers, passport }) => {
    const controller = controllers.user;
    const userRoute = '/api/user';
    
    app.get(userRoute + '/:username', passport.authenticate('jwt', { session: false }), controller.getUser);
    app.post(userRoute + '/register', controller.register);
    app.post(userRoute + '/login', controller.loginLocal);
    app.put(userRoute + '/edit', passport.authenticate('jwt', { session: false }), controller.editProfile);
};
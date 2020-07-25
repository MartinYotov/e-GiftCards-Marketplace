'use strict';

module.exports = (app, data, passport) => {
    require('./jwt-strategy')(passport, data);
    app.use(passport.initialize());
}
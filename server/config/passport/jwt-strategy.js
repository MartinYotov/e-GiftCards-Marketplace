const constants = require('../../utilities/constants');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../models/user-model');

module.exports = (passport, data) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = constants.secret;

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ _id: jwt_payload.id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};
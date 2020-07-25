'use strict';

const secretStrings = {
    production: process.env.SECRET_STRING,
    development: 'secret 07'
};

module.exports = {
    MIN_USERNAME_LENGTH: 5,
    MAX_USERNAME_LENGTH: 50,
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 50,
    EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    NAME_REGEX: /^[A-Z]([a-z]?)+$/,
    USERNAME_REGEX: /^[a-zA-Z0-9]+/g,
    MIN_ROLE_LENGTH: 5,
    MAX_ROLE_LENGTH: 10,
    secret: secretStrings[process.env.NODE_ENV || "development"]
};

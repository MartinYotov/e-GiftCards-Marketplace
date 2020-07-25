'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const constants = require('../utilities/constants.js');

const UserSchema = new Schema({    
    username: {
        type: String,
        required: true,
        unique: true,
        // TODO: match
        minlength: 5,
        maxlength: 25
    },
    firstName: {
        type: String,
        match: constants.NAME_REGEX,
        required: true,
        minlength: constants.MIN_NAME_LENGTH,
        maxlength: constants.MAX_NAME_LENGTH
    },
    lastName: {
        type: String,
        match: constants.NAME_REGEX,
        required: true,
        minlength: constants.MIN_NAME_LENGTH,
        maxlength: constants.MAX_NAME_LENGTH
    },
    passHash: { type: String, required: true },
    salt: { type: String, required: true },
    email: { type: String, match: constants.EMAIL_REGEX },    
    roles: [{ type: String, default: 'normal' }],
    giftCards: [{
        store: {
            type: String,
            required: true
        },
        cardValue: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        discountPercentage: {
            type: Number,
            required: true
        }
    }],
    watchlist: [{
        store: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }]
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
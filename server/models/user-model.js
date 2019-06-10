'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        // TODO: match
        minlength: 5,
        maxlength: 25
    },
    image: {
        type: String,
        default: ''
    },
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
    }],
    purchases: [{

    }]
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
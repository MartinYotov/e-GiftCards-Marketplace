'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    giftCards: [{
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
    }]
});

mongoose.model('Store', StoreSchema);

module.exports = mongoose.model('Store');
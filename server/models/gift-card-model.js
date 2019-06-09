'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiftCardSchema = new Schema({
    store: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    cardValue: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discountPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    expirationDate: {
        type: Date,
        required: true,
        min: Date.now
    },
    user: {
      type: String,
      required: true
    }
});

mongoose.model('GiftCard', GiftCardSchema);

module.exports = mongoose.model('GiftCard');
'use strict'

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = function(connectionString) {
    mongoose.connect(connectionString);

    const GiftCard = require('../models/gift-card-model');
    const Store = require('../models/store-model');
    const User = require('../models/user-model');

    const models = { GiftCard, Store, User };
    const data = {};

    fs.readdirSync('./data').forEach(file => console.log(file));
}
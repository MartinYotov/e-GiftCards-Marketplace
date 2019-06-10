'use strict'

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = function (connectionString) {
    mongoose.connect(connectionString, { useNewUrlParser: true });

    const GiftCard = require('../models/gift-card-model');
    const Store = require('../models/store-model');
    const User = require('../models/user-model');

    const models = { GiftCard, Store, User };
    const data = {};

    fs.readdirSync('./data')
        .filter(x => x.includes('-data'))
        .forEach(file => {
            const dataModule = require(path.join(__dirname, file))(models);
            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key]
                });
        });

    return data;
}
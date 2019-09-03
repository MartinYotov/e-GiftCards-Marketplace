'use strict';

const connectionStrings = {
    production: process.env.CONNECTION_STRING,
    development: "mongodb://localhost:27017/giftCards"
};

module.exports = {
    connectionString: connectionStrings[process.env.NODE_ENV || "development"],
    port: process.env.PORT || 3030
};
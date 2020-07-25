'use strict'

const path = require('path');
const fs = require('fs');

module.exports = ({ passport, data }) => {
    const controllers = {};

    fs.readdirSync(__dirname)
        .filter(file => file.includes('-controller'))
        .forEach(file => {
            const controller = require(path.join(__dirname, file))({ passport, data });
            const name = file
                .substring(0, file.indexOf('-controller'))
                .replace(/-([a-z])/g, g => g[1].toUpperCase());
            console.log(name);

            controllers[name] = controller;
        });

    return controllers;
}

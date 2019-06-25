'use strict'

const path = require('path');
const fs = require('fs');

module.exports = ({ app, controllers }) => {

    fs.readdirSync(__dirname)
        .filter(file => file.includes('-router'))
        .forEach(file => {
            require(path.join(__dirname, file))({ app, controllers });
        });

    app.get('*', (req, res) => {
        res.status(404).redirect('/404');
    });  
}
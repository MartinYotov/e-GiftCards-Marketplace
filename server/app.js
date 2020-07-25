'use strict'

const app = require('./config/application');
const config = require('./config');
const data = require('./data')(config.connectionString);
const passport = require('passport');
const controllers = require('./controllers')({ data });

require('./config/passport')(app, data, passport);
require('./routers')({ app, controllers, passport });

app.listen(config.port, (err) => {
    if (err) throw err;
    
    console.log(`Server is running on port: ${config.port}`);
});
'use strict'

const app = require('./config/application');
const config = require('./config');
const data = require('./data')(config.connectionString);

//console.log(data)

app.listen(config.port, (err) => {
    if (err) throw err;
    
    console.log(`Server is running on port: ${config.port}`);
});
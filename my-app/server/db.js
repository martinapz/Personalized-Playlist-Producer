const mysql = require('mysql');

let connection = mysql.createConnection({
    // socketPath: '/finalproject-365319:us-central1:mmab2',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS || null
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as thread id: ' + connection.threadId);
});


// PRODUCTION
/**
let config = {
    user: process.env.SQL_USER,
    database: process.env.SQL_DATABASE,
    password: process.env.SQL_PASSWORD,
}

if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
  config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}

let connection = mysql.createConnection(config);
*/

// Database Connection for Development

module.exports = connection;
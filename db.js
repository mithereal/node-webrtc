const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,    // the number of connections node.js will hold open to our database
    password: process.env.MYSQL_PASSWORD,
    user: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT

});

let db = {};

module.exports = db
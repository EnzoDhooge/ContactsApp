const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const connection = mysql.createConnection(database);
connection.connect((err) => {
    if(err) {
        console.log(err);
        return;
    } else {
        console.log('DB is connected');
    }
});

// Promisify Connection Query
connection.query = promisify(connection.query);

module.exports = connection;
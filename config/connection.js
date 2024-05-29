const { connect, connection } = require('mongoose');

const connectionString = '';     //add mongodb connection

connect(connectionString);

module.exports = connection;


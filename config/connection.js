const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost:27017/socialnetworkDB';

connect(connectionString);

module.exports = connection;

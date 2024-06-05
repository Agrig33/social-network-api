const mongoose = require('mongoose');
// const dotenv = require('dotenv');
const { connect, connection } = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/socialnetworkDB');
// dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetworkDB');
            console.log('Success! You are now connected to MongoDB.');
    } catch (err) {
        console.error('Error! Cannot connect to MongoDB', err);
    }
};

module.exports = connectDB;

// module.exports = mongoose.connection;
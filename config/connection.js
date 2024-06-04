const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetworkDB');
            console.log('Success! You are now connected to MongoDB.');
    } catch (err) {
        console.error('Error! Cannot connect to MongoDB', err);
    }
};

module.exports = connectDB;


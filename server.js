const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/connection');
const routes = require('./routes');
const { User, Thought } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

mongoose.connection.once('open', () => {
    console.log('Success! You are now connected to MongoDB');
    
    app.listen(PORT, () => {
        console.log(`API server is running on ${PORT}`);
    });
});
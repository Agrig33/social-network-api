const express = require('express');
const connectDB = require('./config/connection');

const routes = require('./routes');
const { User, Thought } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

// connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(routes);

connectDB().then(() => {
    console.log('Success! You are now connected to MongoDB');
    
    app.listen(PORT, () => {
        console.log(`API server is running on ${PORT}`);
    });
});
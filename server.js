const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', require('./routes'));

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server is running on http://localhost:${PORT}`);
    });
});
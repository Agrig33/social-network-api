const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res, next) => {
    return res.status(404).send('Error, this is the wrong route.');
});
    

module.exports = router;
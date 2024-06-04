const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    return res.status(404).send('Error, this is the wrong route.');
});

const apiRoutes = require('./api');
router.use('/api', apiRoutes);
    

module.exports = router;
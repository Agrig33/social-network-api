const router = require('express').Router();
const apiRoutes = require('./api');

router.route('/api', apiRoutes);
router.use((req,res) => {
    return res.send('Error, this is the wrong route.')});

module.exports = router;
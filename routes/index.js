const router = require('express').Router();
const friendsRoutes = require('./api/friendsRoutes');
const reactionRoutes = require('./api/reactionRoutes');
const thoughtRoutes = require('./api/thoughtRoutes');
const userRoutes = require('./api/userRoutes');

router.use('/api/friends', friendsRoutes);
router.use('/api/reactions', reactionRoutes);
router.use('/api/thoughts', thoughtRoutes);
router.use('/api/users', userRoutes);


// const express = require('express');
// const router = express.Router();
// const apiRoutes = require('./api');

// router.use('/api', apiRoutes);

router.use((req, res) => res.send('Oops! This is the wrong route.'));

    

module.exports = router;
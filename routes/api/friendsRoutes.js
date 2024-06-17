const router = require('express').Router();
const { addFriend, removeFriend } = require('../../controllers/friendsController');

router.post('/:userId/friends/:friendId', addFriend);

router.delete('/:userId/friends/:friendId', removeFriend);

module.exports = router;
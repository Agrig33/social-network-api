const router = require('express').Router();
const { addFriend, deleteFriend } = require('../../controllers/friendsController');

router.post('/:userId/friends/:friendId', addFriend);

router.delete('/:userId/friends/:friendId', deleteFriend);

module.exports = router;
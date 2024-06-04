const router = require('express').Router();
const { 
    getAllUsers,
    getSingleUser,
    createNewUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend 
} = require('../../controllers/userControllers');

router.route('/')
    .get(getAllUsers)
    .post(createNewUser);

router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;
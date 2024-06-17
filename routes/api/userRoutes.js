const router = require('express').Router();
const { 
    getAllUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    deleteUser,
    deleteThought
  
} = require('../../controllers/userControllers');

router.route('/')
    .get(getAllUsers)
    .post(createNewUser);

router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userId/thoughtData/:thoughtId')
    .delete(deleteThought);

module.exports = router;
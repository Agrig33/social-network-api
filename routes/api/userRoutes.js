const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    deleteUser,
    addNewFriend,
    deleteFriend,
    deleteAllFriends
} = require('../../')
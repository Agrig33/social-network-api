const mongoose = require('mongoose');
const { User } = require('../models/User');

// module.exports = {
    const getAllUsers = async (req, res) => {
        try {
            const { userId } = req.params;
            if (!mongoose.Types.ObjectId.isValid(userId)) {
            const users = await User.find().populate('thoughts', 'friends');
            // return res.status(200).json(users);
            return res.status(400).json({ message: 'Error. Invalid user ID format' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Error. User cannot be found' });
        }

        return res.json(user);
        } catch (err) {
            // console.log(err);
            // return res.status(500).json(err);
            return res.status(500).json({ message: 'Oops, there was an error retrieving the user.', error: err.message });
        }
    };

    // module.exports = {
    //     getAllUsers,
    // };

    const getSingleUser = async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.userId }).populate('thoughts');
            if (!user) {
                return res.status(404).json({ message: 'Error, no user found with that ID.'});
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    };

    const createNewUser = async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    };

    const deleteUser = async (req, res) => {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId});
            if (!user) {
                return res.status(404).json({ message: 'Error, no user found with that ID.'});
            }
            await Thought.deleteMany({ $in: user.thoughts});
            return res.status(200).json({ message: 'Success! User has been deleted.'});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    };

    const updateUser = async (req, res) => {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runvalidator: true, new: true });
            if (!user) {
                return res.status(404).json({ message: 'Error, no user found with that ID.'});
            }
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    };

    const addFriend = async (req, res) => {
        try{
            const friend = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $addToSet: { friends: req.params.friendId}},
                {runvalidator: true, new: true});
            if (!friend) {
                return res.status(404).json({ message: 'Error, no friend found with that ID.'});
            }
            return res.status(200).json(friend);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    };

    const deleteFriend = async (req, res) => {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }}, 
                {runvalidator: true, new: true});
            if (!friend) {
                return res.status(404).json({ message: 'Error, there was no friend found with that ID.'});
            }
            return res.status(200).json(friend);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    };

    module.exports = {
        getAllUsers,
        getSingleUser,
        createNewUser,
        deleteUser,
        updateUser,
        addFriend,
        deleteFriend
    };
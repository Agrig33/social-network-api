const mongoose = require('mongoose');
const { User, Thought } = require('../models');

const userCon = {
    async getAllUsers(req, res) {
        try {
            const userData = await User.find().populate('thoughts');
            return res.json(userData);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Oops, there was an error retrieving the user.', err });
        }
    },

    async getSingleUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId }).populate('thoughts').populate('friends');
            if (!userData) {
                return res.status(404).json({ message: 'Error, no user found with that ID.'});
            }
            res.json(userData);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Oops, there was an error retrieving the user.', err });
        }
    },

    async createNewUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Oops, there was an error creating the user.', err });
        }
    },

    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true });
            if (!userData) {
                return res.status(404).json({ message: 'Error, no user found with that ID.'});
            }
            return res.json(userData);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Oops, there was an error updating the user.', err });
        }
    },

    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete({ _id: req.params.userId })
            if (!userData) {
                return res.status(404).json({ message: 'Error, no user found with that ID.'});
            }
            await Thought.deleteMany({ _id: { $in: userData.thoughts }});
            return res.status(200).json({ message: 'Success! User and their thoughts have been deleted.'});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Oops, there was an error deleting the user.', err });
        }
    },

    async addFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId }},
                {runValidators: true, new: true});
            if (!userData) {
                return res.status(404).json({ message: 'Error, no friend found with that ID.'});
            }
            return res.status(200).json(userData);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Oops, there was an error adding the friend.', err });
        }
    },

    async deleteFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }}, 
                {runValidators: true, new: true});
            if (!userData) {
                return res.status(404).json({ message: 'Error, there was no friend found with that ID.'});
            }
            return res.status(200).json(userData);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Oops, there was an error deleting the friend.', err });
        }
    }
};

    module.exports = userCon;
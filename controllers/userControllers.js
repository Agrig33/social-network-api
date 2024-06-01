const { Thought, User } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts', 'friends');
            return res.status(200).json(users);

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
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
    },

    async createNewUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
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
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runvalidators: true, new: true });
            if (!user) {
                return res.status(404).json({ message: 'Error, no user found with that ID.'});
            }
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try{
            const friend = await User.findOneAndUpdate(
                { _id: req.params.friendId },
                { $addToSet: { friends: req.params.friendId}},
                {runvalidators: true, new: true});
            if (!friend) {
                return res.status(404).json({ message: 'Error, no friend found with that ID.'});
            }
            return res.status(200).json(friend);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }}, 
                {runvalidators: true, new: true});
            if (!friend) {
                return res.status(404).json({ message: 'Error, there was no friend found with that ID.'});
            }
            return res.status(200).json(friend);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
};
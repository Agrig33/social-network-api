const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        // try {
            const userData = await User.find().populate('thoughtData');
            return res.json(userData);
        // } catch (err) {
        //     console.log(err);
        //     return res.status(500).json({ message: 'Oops, there was an error retrieving the user.', err });
        // }
    },

    async getSingleUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId }).populate('thoughtData');
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
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true });

            if (!updatedUser) {
                return res.status(404).json({ message: 'Error, no user found with that ID.'});
            }
            return res.json(updatedUser);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Oops, there was an error updating the user.', err });
        }
    },

    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete({ _id: req.params.userId });

            if (!userData) {
                return res.status(404).json({ message: 'Error, no user found with that ID.'});
            }
            await Thought.deleteMany({ _id: { $in: userData.thoughtData }});
            return res.status(200).json({ message: 'Success! User and their thoughts have been deleted.'});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Oops, there was an error deleting the user.', err });
        }
    },

    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if(!deletedThought) {
                return res.status(404).json({ message: 'Oops, no thought found with this ID.'});
            }

            res.json({ message: 'Success! Thought has been deleted!.'});
        } catch (err) {
            res.status(500).json(err);
        }
    }
}


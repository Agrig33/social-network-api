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

    
}
const { Thought, User } = require('../models');

module.exports = { 
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            return res.status(200).json(thoughts);

        } catch (err) {
            console.log(err);
            return res.status(500).json(err)({ message: 'Oops, there was an error retrieving thoughts.'});
        }
    },

async getSingleThought(req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'Error, no thought found with that ID.'});
        }
        return res.status(200).json(thought);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)({ message: 'Oops, there was an error retrieving a thought.'});
    }
},

async createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id }},
            { new: true });

        if (!user) {
            return res.status(404).json({ message: 'Error, no user found with that ID.'});
        }
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
},

async deleteThought(req, res) {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (!thought) {
            return res.status(404).json({ message: 'Error, no thought found with that ID.'});
        }
        return res.status(200).json({ message: 'Success! Thought has been deleted.'});
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
},

async updateThought(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true });
            
    if (!thought) {
        return res.status(404).json({ message: 'Error, no thought found with that ID.'});
    } 
        return res.status(200).json(thought);
    } catch (err) {
    console.log(err);
        return res.status(500).json(err);
}

},

async addAReaction(req, res) {
    try {
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: {reactions: req.body }},
            { runValidators: true, new: true });

    if (!reaction) {
        return res.status(404).json({ message: 'Error, there was no thought found with that ID.'});
        }
        res.json(reaction);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
},

async deleteReaction(req, res) {
    try {
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {_id: req.params.reactionId} }},
            { runValidators: true, new: true });

    if (!reaction) {
        return res.status(404).json({ message: 'Error, there was no thought found with that ID.'});
    }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
    },
};

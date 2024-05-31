const { Thought, User } = require('../models');

module.exports = { 
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            const thoughtObject = {thoughts,};

            res.json(thoughtObject);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
},

async getAThought(req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'Error, no thought found with that ID.'})
        }
        res.json(thought);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
},

async createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            {_id: req.body.userId},
            { $addToSet: { thoughts: thought._id }},
            { new: true }
        );
        if (!user) {
            return res.status(404).json({
                message: 'Error, no user found with that ID.',
            })
        }
        return res.json(thought);
    } catch(err) {
        return res.status(500).json(err);
    }
},

async deleteThought(req, res) {
    try {
        const thought = await Thought.findOneAndDelete({
            _id: req.params.thoughtId,
        });
    if (!thought) {
            return res.status(404).json({ message: 'Error, no thought found with that ID.'});
        }
        return res.status(200).json({
            message: 'Success! Thought has been deleted.'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
},

aysnc updateThought(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        );
    if (!thought) {
        return res.status(404).json({ message: 'Error, no thought found with that ID.'});
    } 
    return res.status(200).json(thought)
;    } catch (err) {
    console.log(err);
    return res.status(500).json(err);
}
},

async addAReaction(req, res) {
    try {
        const reaction = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true}
        );
    if (!reaaction) {
            return res.status(404).json({ message: 'Error, there was no thought found with that ID.'});
        }
        res.json(newReaction);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
},

async deleteReaction(req, res) {
    try {
        const reaction = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: { reactions: {_id: req.params.reactionId}}},
            {runValidators: true, new: true}
        );
    if (!reaction) {
        return res.status(404).json({ message: 'Error, there was no thought found with that ID.'});
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
    },
};

module.exports = getThoughts;
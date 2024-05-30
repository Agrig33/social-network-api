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
            return res.status(404).json({ message: 'Error, no thought found with that ID'})
        }
        res.json(thought);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
},
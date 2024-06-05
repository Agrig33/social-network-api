const { Thought, User } = require('../models');

    const thoughtCon = {
        async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought.find();
            // return res.status(200).json(thoughts);
            return res.json(thoughtData);
    } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Oops, there was an error retrieving thoughts.', err });
        }
    },
    // module.exports = { 
    //     getAllThoughts,

async getSingleThought(req, res) {
    try {
        const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
       if (!thoughtData) {
            // return res.status(200).json(thought); //this is new
            return res.status(404).json({ message: 'Error, no thought found with that ID.'});
        }
        return res.status(200).json(thoughtData);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Oops, there was an error retrieving a thought.', err });
    }
},
// module.exports = { 
//     getSingleThought,

async createThought(req, res) {
    try {
        const thoughtData = await Thought.create(req.body);
        const userData = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thoughtData._id }},
            { new: true });

        if (!userData) {
      return res.status(404).json({ message: 'Error, user was not found.'});
    }
        res.json({ message: 'Success! Thought was created successfully!'}); 
     } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Oops, there was an error creating the thought.', err });
    }
},

async updateThought(req, res) {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true });
            
    if (!thoughtData) {
        return res.status(404).json({ message: 'Error, no thought found with that ID.'});
    } 
        return res.json(thoughtData);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Oops, there was an error updating the thought.', err });
    }
},

async deleteThought(req, res) {
    try {
        const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (!thoughtData) {
            return res.status(404).json({ message: 'Error, no thought found with that ID.'});
        }
        
        const userData = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId }},
            { new: true }
        );
        
    if(!userData) {
        return res.status(404).json({ message: 'Error, user was not found.' });
    }
        return res.json({ message: 'Success! Thought has been deleted.'});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Oops, there was an error deleting the thought.', err });
    }
},

async addAReaction(req, res) {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: {reactions: req.body }},
            { runValidators: true, new: true });

    if (!thoughtData) {
        return res.status(404).json({ message: 'Error, there was no thought found with that ID.'});
        }
        res.json(thoughtData);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Oops, there was an error adding the reaction.', err });
    }
},

async deleteReaction(req, res) {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {reactionId: req.params.reactionId} }},
            { runValidators: true, new: true });

    if (!thoughtData) {
        return res.status(404).json({ message: 'Error, there was no thought found with that ID.'});
    }
        return res.json(thoughtData);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Oops, there was an error deleting the reaction.', err });
    }
    },
};

module.exports = thoughtCon;
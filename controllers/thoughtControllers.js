const { Thought } = require('../models/Thought');



// module.exports = { 
    const getAllThoughts = async (req, res) => {
        try {
            const thoughts = await Thought.find();
            // return res.status(200).json(thoughts);
            return res.json(thoughts);

        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Oops, there was an error retrieving thoughts.', error: err.message });
        }
    };
    // module.exports = { 
    //     getAllThoughts,

const getSingleThought = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
       if (!thought) {
            // return res.status(200).json(thought); //this is new
            return res.status(404).json({ message: 'Error, no thought found with that ID.'});
        }
        return res.status(200).json(thought);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Oops, there was an error retrieving a thought.', error: err.message });
    }
};
// module.exports = { 
//     getSingleThought,

const createThought = async (req, res) => {
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
};

const deleteThought = async (req, res) => {
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
};

const updateThought= async (req, res) => {
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

};

const addAReaction = async (req, res) => {
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
};

const deleteReaction = async (req, res) => {
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
    // },
};

module.exports = {
    getAllThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    addAReaction,
    deleteReaction
};
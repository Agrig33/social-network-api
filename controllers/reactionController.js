const {Thought} = require('../models');

const reactionController = {
    async addAReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: {reactions: req.body }},
            // { runValidators: true, new: true });
        );
    if (!thought) {
        return res.status(404).json({ message: 'Error, there was no thought found with that ID.'});
        }
        res.json(thought);
    } catch (err) {
        console.error(err);
        return res.status(500).json
    }
},

async deleteReaction(req, res) {
    try {
        const { thoughtId, reactionId } = req.params;
        
        const thought = await Thought.findById(thoughtId);
            // { _id: req.params.thoughtId },
            // { $pull: { reactions: {reactionId: req.params.reactionId} }},
            // { runValidators: true, new: true });

    if (!thought) {
        return res.status(404).json({ message: 'Error, there was no thought found with that ID.'});
    }

    thought.reactions = thought.reactions.filter(reaction => reaction._id.toString() !== reactionId);
        await thought.save();

        return res.json(thought);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Oops, there was an error deleting the reaction.', err });
    }
},
};

module.exports = reactionController;
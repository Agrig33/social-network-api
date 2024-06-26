const { ObjectId } = require('mongoose').Types;
const { Thought, User, Reaction } = require('../models');

    module.exports = {
        async getAllThoughts(req, res) {
            try {
            const thoughts = await Thought.find();

            const thoughtObj ={
                thoughtData,
            };
        
            res.json(thoughtObj);
    } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Oops, there was an error retrieving thoughts.'});
        }
    },

async getSingleThought(req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
      
        if (!thought) {
            // return res.status(200).json(thought); //
            res.status(404).json({ message: 'Error, no thought found with that ID.'});
        }
        res.json({
            thought,
       });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Oops, there was an error retrieving a thought.', err });
    }
},

async createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughtdata: thought._id }},
            { new: true });

        if (!user) {
        res.status(404).json({ message: 'Error, user was not found.',

        })
    }
        res.json(thought);

     } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Oops, there was an error creating the thought.', err });
    }
},

async updateThought(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { thoughText: req.body.thoughtText },
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
        const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

    if (!thought) {
            return res.status(404).json({ message: 'Error, no thought found with that ID.'});
        }
        
        const userData = await User.findOneAndUpdate(
            { thoughtData: req.params.thoughtId },
            { $pull: { thoughtData: req.params.thoughtId }},
            { new: true }
        );
        
    if(!userData) {
        return res.status(404).json({ message: 'Error, user was not found.' });
    }
        res.json({ message: 'Success! Thought has been deleted.'});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Oops, there was an error deleting the thought.', err });
    }
},
    };
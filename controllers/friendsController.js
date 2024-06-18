const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');
    
    
    const addFriend = (req, res) => {
        const { userId, friendId } = req.params;

        res.json({ message: `Your friend with id ${friendId} added to user with id ${userId}'s friend list`,
        });
    };  

    const deleteFriend = (req, res) => {
        const { userId, friendId } = req.params;
      
        res.json({ message: `Your friend with id ${friendId} was deleted from user with id ${userId}'s friend list`,
        });
    };
            
    module.exports = { addFriend, deleteFriend};
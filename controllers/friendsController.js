const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');
    
    
    const addFriend = (req, res) => {
        const { userId, friendId } = req.params;

        res.json({ message: `Your friend with id ${friendId} added to user with id ${userId}'s friend list`,
        });
    };  
    //     try {
    //         const userData = await User.findOneAndUpdate(
    //             { _id: req.params.userId },
    //             { $addToSet: { friends: req.params.friendId }},
    //             {runValidators: true, new: true});

    //         if (!userData) {
    //             return res.status(404).json({ message: 'Error, no friend found with that ID.'});
    //         }
    //         return res.status(200).json(userData);
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(500).json({ message: 'Oops, there was an error adding the friend.', err });
    //     }
    // },

    const deleteFriend = (req, res) => {
        const { userId, friendId } = req.params;
        // User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId }}, { new: true })
        //     .then((userData) => {
        //         if (!userData) {
        //             return res.status(404).json({ message: 'Error, there was no friend found with that ID.'});
                // }
            // })
        res.json({ message: `Your friend with id ${friendId} was deleted from user with id ${userId}'s friend list`,
        });
    };
        // try {
        //     const userData = await User.findOneAndUpdate(
        //         { _id: req.params.userId },
        //         { $pull: { friends: req.params.friendId }}, 
        //         {runValidators: true, new: true});

        //     if (!userData) {
        //         return res.status(404).json({ message: 'Error, there was no friend found with that ID.'});
        //     }
        //     return res.status(200).json(userData);
        // } catch (err) {
        //     console.log(err);
        //     return res.status(500).json({ message: 'Oops, there was an error deleting the friend.', err });
//         }
//     }
// };
            
    module.exports = { addFriend, deleteFriend};
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { User, Thought } = require('../data');
// const connection = require('../config/connection');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

// const connectDB = async () => {
//     try{
//         await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetworkDB', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
// });
//    console.log('Success! You are now connected.');
//     } catch (err) {
//         console.error('Error! Cannot connect to MongoDB', err);
//     }
// };

const users = [
    { 
        username: 'Jennifer123',
        email: 'jennifer1@yahoo.com',
    },
    {
        username: 'Andre456',
        email: 'andre456@gmail.com',
    },
    {
        username: 'Fred33',
        email: 'fred33@yahoo.com',
    },
    {
        username: 'Ronny77',
        email: 'ronny77@yahoo.com',
    },
    {
        username: 'Dion33',
        email: 'dion33@gmail.com',
    },
    {
        username: 'AaronSparxx',
        email: 'aaronS11@yahoo.com',
    }
];

const thoughts = [
    {
        thoughtText: 'Coding is so much fun!',
        username: 'Ronny77',
        reactions: [
            {
                reactionBody: 'Agreed!',
                username: 'Andre456',
            },
        ],
    },
    {
        thoughtText: 'The weather is always sunny in California',
        username: 'Fred33',
        reactions: [
            {
                reactionBody: 'You are so lucky!',
                username: 'Jennifer123'
            },
            {
                reactionBody: 'Lucky? How about the traffic here? Try being stuck in traffic under the sun!',
                username: 'Ronny77',
            },
        ],
    },
    {
        thoughtText: 'Music is life!',
        username: 'AaronSparxx',
        reactions: [
            {
                reactionBody: 'Basketball is life!',
                username: 'Dion33',
            },
            {
                reactionBody: 'I prefer soccer over basketball any day!',
                username: 'Fred33',
            },
        ],
    },
    {
        thoughtText: 'I cannot wait for that new Mediterranean restaurant to open by my house!',
        username: 'Jennifer123',
        reactions: [
            {
                reactionBody: 'The one that has the Coming Soon sign on 1st street?',
                username: 'Dion33',
            },
            {
                reactionBody: 'Yes! It is so close to my house and I\'m so excited!',
                username: 'Jennifer123',
            },
        ],
    },
    {
        thoughtText: 'Sometimes I miss doing the stuff I used to do as a kid.',
        username: 'Andre456',
        reactions: [
            {
                reactionBody: 'Yes! Me too!',
                username: 'Fred33',
            },
        ],
    },
];

// console.log(connection);

const seedDatabase = async () => {
    try {
        await User.deleteMany();
        await Thought.deleteMany();
  
const users = await User.insertMany(users);

// // const updatedThoughts = thoughts.map(thought => {
//     const user = insertedUsers.find(user => user.username === thought.username);
//     thought.username = user._id;
//     thought.reactions = thought.reactions.map(reaction => {
//         const reactionUser = insertedUser.find(user => user.username === reaction.username);
//         return {
//             ...reaction,
//             username: reactionUser._id,
//         };
//     });
//     return thought;
// });

thoughts.forEach(async thought => {
    thought.username = users.find(user => user.username === thought.username)._id;
    thought.reactions.forEach(reaction => {
        reaction.username = users.find(user => user.username === reaction.username)._id;
    });
});

    await Thought.insertMany(thoughts);
        console.log('Success! Seeding is now completed.');
        // console.table(insertedUsers);
        // console.info('Success! Seeding is now completed.');
        process.exit(0);
} catch (err) {
    console.error('Error. Seeding was not completed:', err);
    process.exit(1);
} finally {
    mongoose.connection.close();
}
};

seedDatabase();
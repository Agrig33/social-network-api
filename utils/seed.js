const mongoose = require('mongoose');
const connection = require('../config/connection');
const { User, Thought } = require('../models');

mongoose.connect(process.env.MONGODB_URI || )//-----add mongo connection

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

const thoughtData = [
    {
        thoughtText: 'Coding is so much fun!',
        username: 'Ronny77',
        reactions: [
            {
                reaction: 'Agreed!',
                username: 'Andre456',
            },
        ],
    },
    {
        thoughtText: 'The weather is always sunny in California',
        username: 'Fred33',
        reactions: [
            {
                reaction: 'You are so lucky!',
                username: 'Jennifer123'
            },
            {
                reaction: 'Lucky? How about the traffic here? Try being stuck in traffic under the sun!',
                username: 'Ronny77',
            },
        ],
    },
    {
        thoughtText: 'Music is life!',
        username: 'AaronSparxx',
        reactions: [
            {
                reaction: 'Basketball is life!',
                username: 'Dion33',
            },
            {
                reaction: 'I prefer soccer over basketball any day!',
                username: 'Fred33',
            },
        ],
    },
    {
        thoughtText: 'I cannot wait for that new Mediterranean restaurant to open by my house!',
        username: 'Jennifer123',
        reactions: [
            {
                reaction: 'The one that has the Coming Soon sign on 1st street?',
                username: 'Dion33',
            },
            {
                reaction: 'Yes! It is so close to my house and I\'m so excited!',
                username: 'Jennifer123',
            },
        ],
    },
    {
        thoughtText: 'Sometimes I miss doing the stuff I used to do as a kid.',
        username: 'Andre456',
        reactions: [
            {
                reaction: 'Yes! Me too!',
                username: 'Fred33',
            },
        ],
    },
    {   thoughtText: 'I cannot wait for that new Mediterranean restaurant to open by my house!',
        username: 'Jennifer123',
        reactions: [
        {
            reaction: 'The one that has the Coming Soon sign on 1st street?',
            username: 'Dion33',
        },
        {
            reaction: 'Yes! It is so close to my house and I\'m so excited!',
            username: 'Jennifer123',
        },
    ],
}
];


console.log(connection);

connection.once('open', async() => {
    console.log('Success! You are now connected.');

    await User.deleteMany({});

    await User.collection.insertMany(users);
    console.table(users);
        console.info('Success! It is now completed.');
        process.exit(0);
});


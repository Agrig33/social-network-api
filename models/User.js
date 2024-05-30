const { Schema } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: [true, 'Try again. Username already exists.'],
            required: [true, 'Error, username cannot be blank.'],
            trim: true,
        },
        email: {
            type: String,
            unique: [true, 'Try again. Email already in use.'],
            required: [true, 'Error, email cannot be blank.'],
            match: [/^([a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})$/, 'Please use a valid email address']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.lenth;
});

const User = model('user', userSchema);

module.exports = User;

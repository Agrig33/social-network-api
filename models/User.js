const { Schema , model } = require('mongoose');


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
            unique: true,
            match: [/^([a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})$/, 'Please use a valid email address'],
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
    ],
        friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    });

   userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
   });

const User = model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');
const { Schema } = mongoose;

// const { Schema , model } = require('mongoose');


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
            required: [true, 'Error, email cannot be blank.'],
            unique: [true, 'Try again. Email already in use.'],
            match: [/^([a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})$/, 'Please use a valid email address'],
        },
        thougtData: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],

        friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }]
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    });

   userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
   });

const User = mongoose.model('User', userSchema);

module.exports = User;

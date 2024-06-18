const mongoose = require('mongoose');

const { Schema } = mongoose;

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        // get: (createdAtVal) => moment(createdAtVal).format('MM, DD, YYYY [at] hh:mm a'),
    },
},
{ 
    toJSON: {
        getters: true,
    },
    id: false,
}
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
        createdAt: {
            type: Date,
            default: Date.now,
            // get: (createdAtVal) => moment(createdAtVal).format('MM, DD, YYYY [at] hh:mm a'),
       },   
    },
       {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    });

    thoughtSchema.virtual('reactionCount').get(function() {
        return this.reactions.length;
    });

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
                unique: true,
                match: [/^([a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})$/, 'Please use a valid email address'],
            },
            thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
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
                getters: true,
            },
            id: false,
        });
        
        userSchema.virtual('friendCount').get(function() {
            return this.friends.length;
           });

    const User = mongoose.model('User', userSchema);
    const Thought = mongoose.model('Thought', thoughtSchema);

    module.exports = { User, Thought };
const mongoose = require('mongoose');
const moment = require('moment');
// const { Schema } = mongoose;

const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MM, DD, YYYY [at] hh:mm a'),
        },
        },
        {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const thoughtShema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MM, DD, YYYY [at] hh:mm a'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
       },   
       {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// thoughtShema.virtual('reactionCount').get(function() {
//     return this.reactions.length;
// });
    
const Thought = mongoose.model('Thought', thoughtSchema);

module.export = Thought;
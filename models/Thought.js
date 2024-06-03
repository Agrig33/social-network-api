const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const moment = require('moment');

const thoughtShema = new Schema(
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
        reactions: [
            {
                reactionBody: {
                    type: String,
                    required: true,
                    maxlength: 280,
                
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
],
 },
    {
        toJSON: { getters: true },
        toObject: { getters: true },
    });

const Thought = mongoose.model('Thought', thoughtSchema);

module.export = Thought;
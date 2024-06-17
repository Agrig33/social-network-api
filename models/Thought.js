const mongoose = require('mongoose');
const { Schema } = mongoose;
const reactionSchema = require('./Reaction');


// const { Schema, model } = require('mongoose');
// const reactionSchema = require('./Reaction');
// const moment = require('moment');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "true",
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
            virtuals: true,
            getters: true,
        },
        id: false,
    });

thoughtSchema.virtual('formattedCreatedAt').get(function() {
    return this.createdAt.toLocaleString();
});
    
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
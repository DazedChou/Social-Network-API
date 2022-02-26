// const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, maxLength: 280 },
    createdAt: { type: Date, default: Date.now, get: formatDate },
    username: [{ type: Schema.Types.String, ref: 'User' }],
    reactions: [Reaction],
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    });

function formatDate() {
    return (Date.getMonth(), '/', Date.getDate(), '/', Date.getFullYear())
}

thoughtSchema.virtual('reactionCount')
    .get(function () { return this.reactions.length });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
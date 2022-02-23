const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    thoughtText: { type: String, required: true, maxLength: 280 },
    createdAt: { type: Date, default: Date.now, get: formatDate},
    username: [{ type: Schema.Types.String, ref: 'User' }],
    reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
});

function formatDate() {
    return (Date.getMonth(),'/',Date.getDate(),'/',Date.getFullYear())
}

const Thought = mongoose.model('Thought', thoughtSchema);

Thought.virtual('reactionCount')
    .get(function() { return `${this.reactions.length}`});

module.exports = Thought;
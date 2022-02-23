const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: { type: Schema.ObjectId},
    reactionBody: { type: String, required: true, maxLength: 280},
    username: { type: String, required: true},
    createdAt: { type: Date, default: Date.now, get: formatDate},
});

function formatDate() {
    return (Date.getMonth(),'/',Date.getDate(),'/',Date.getFullYear())
}

const Reaction = mongoose.model('Thought', reactionSchema);

module.exports = Reaction;

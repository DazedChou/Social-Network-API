// const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: { type: Schema.Types.ObjectId},
    reactionBody: { type: String, required: true, maxLength: 280},
    username: { type: String, required: true},
    createdAt: { type: Date, default: Date.now, get: formatDate},
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

function formatDate() {
    return (Date.getMonth(),'/',Date.getDate(),'/',Date.getFullYear())
}

// const Reaction = model('Reaction', reactionSchema);

module.exports = reactionSchema;

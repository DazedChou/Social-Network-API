const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: {type: String, required: true, unique: true,  validate: [validateEmail, 'Please fill a valid email address'],},
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

User.virtual('friendCount')
    .get(function() { return `${this.friends.length}`});

const User = mongoose.model('User', userSchema);

module.exports = User;
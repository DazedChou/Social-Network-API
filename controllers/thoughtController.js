const { User, Reaction, Thought } = require('../models');

module.exports = {
    getThought(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                res.json(thought)
            )
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                res.json(thought);
                return User.findByIdAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thought._id } }
                );

            })
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });


    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: { thoughtText: req.body.thoughtText } },
            { runValidators: true, new: true }
        ).then((thought) =>
            res.json(thought)
        ).catch((err) => {
            console.error({ message: err });
            return res.status(500).json(err);
        });
    }
}
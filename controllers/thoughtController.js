const { User, Thought } = require('../models');

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
    },
    deleteThought(req, res) {
        User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { runValidators: true, new: true }
        ).then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with this id!' })
                : Thought.findOneAndDelete(
                    { _id: req.params.thoughtId },
                    { new: true }
                )
        ).then((thought) =>
            !thought
                ? res
                    .status(404)
                    .json({ message: 'Thought created but no user with this id!' })
                : res.json({ message: 'Thought successfully deleted!' })
        )

    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true, runValidators: true }
        ).then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No video with this id!' })
                : res.json(thought)
        ).catch((err) => res.status(500).json(err));

    }
}
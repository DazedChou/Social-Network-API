const { User } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((post) =>
                !post
                    ? res.status(404).json({ message: "No post with that ID" })
                    : res.json(post)
            )
    },
    createUser(req, res) {
        User.create(req.body)
            .then((post) => res.json(post))
            .catch((err) => {
                console.error({ message: err });
                return res.status(500).json(err);
            });
    }
}
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
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
    },
    deleteUser(req, res) {
        User.findOneAndRemove(
            { _id: req.params.userId },
            { $pull: { _id: req.params.userId } },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'User created but no user with this id!' })
                    : res.json({ message: 'User successfully deleted!' })
            )
    },
    createFriend(req, res) {
        User.create(req.body)
            .then((user) => {
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $addToSet: { friends: user._id } },
                    { new: true }
                )
            })
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'User created, but found no user with that ID',
                    })
                    : res.json('Created the User with associated friend')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
    }
}
const router = require('express').Router();
const { getThoughts, createThought, getSingleThought, updateThought, deleteThought, createReaction, deleteReaction} = require('../../controllers/userController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/users/:userId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);
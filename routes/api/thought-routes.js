const router = require('express').Router();
const { getThought, createThought, getSingleThought, updateThought, deleteThought, createReaction, deleteReaction} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThought).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought);
// .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions');
// .post(createReaction).delete(deleteReaction);

module.exports = router;
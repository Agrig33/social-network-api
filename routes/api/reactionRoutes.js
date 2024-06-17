const router = require('express').Router();
const { addAReaction, deleteReaction } = require('../../controllers/reactionControllers');

router.post('/:thoughtId/reactions', addAReaction);
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;
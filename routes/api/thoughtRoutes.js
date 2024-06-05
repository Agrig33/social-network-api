const router = require('express').Router();

const { 
    getAllThoughts, 
    getSingleThought, 
    createThought, 
    deleteThought, 
    updateThought, 
    addAReaction, 
    deleteReaction 
} = require('../../controllers/thoughtControllers');

router.route('/')
.get(getAllThoughts)
.post(createThought);

router.route('/thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/reactions')
.post(addAReaction);

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;

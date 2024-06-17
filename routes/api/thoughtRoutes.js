const router = require('express').Router();

const { 
    getAllThoughts, 
    getSingleThought, 
    createThought, 
    deleteThought, 
    updateThought, 
   
} = require('../../controllers/thoughtControllers');

router.route('/')
.get(getAllThoughts)
.post(createThought);

router.route('/thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

module.exports = router;

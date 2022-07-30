const router = require('express').Router();


const { AllThoughts,  newThought, thoughtId, updateThoughtId, deleteThoughtId, newReaction, deleteReactionId} = require('../../controllers/thought-controller')

router 
    .route('/')
    .get(AllThoughts)
    .post(newThought)

router
    .route('./:id')
    .get(thoughtId)
    .put(updateThoughtId)
    .delete(deleteThoughtId)

router
.route('/:thoughtId/reactions')
//posting to create a new reaction stored in a single thought
.post(newReaction)

router
.route('./:thoughtId/reactions/:reactionId')
//delete to pull and remove 
.delete(deleteReactionId)

module.exports = router;




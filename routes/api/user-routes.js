const router = require('express').Router();


const { AllUser, newUser, userId, updateUserId, deleteUserId, newFriend, deleteFriendId} = require('../../controllers/user-controller')


router 
    .route('/')
    .get(AllUser)
    .post(newUser)

router
    .route('/:id')
    .get(userId)
    .put(updateUserId)
    .delete(deleteUserId)

router
.route('/:userId/friends/:friendId')
.post(newFriend)
//delete to pull and remove 
.delete(deleteFriendId);

module.exports = router;

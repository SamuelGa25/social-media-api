const {User, Thought} = require('../models');

//api for users 

const users = {
    //getting all the users
    AllUser(req, res){
        User.find()
            .select('-__v')
            .sort({ _id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
        })
    },

    newUser({body},res){
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));

    },

    userId({params},res){
        User.findOne(
            {_id: params.id}

        )
        .select("-__v")
        .sort({_id:-1})
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: "The user was not found!"});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })

    },

    updateUserId({params, body},res){
        User.findOneAndUpdate(
            {_id: params.id},
            body,
            {new: true, runValidators: true}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: 'No user found!'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    deleteUserId({params}, res){
        User.findOneAndDelete(
            {_id: params.id}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: "No user found!"})
                return;
            }

            return Thought.deleteMany({_id:{$in: dbUserData.thoughts}})
        })
        .then(()=>{
            res.json({message: 'User deleted!'});
        })
        .catch(err => res.status(400).json(err));
    },

    newFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.userId},
            {$addToSet: {friends: params.friendId}},
            {new: true, runValidators: true}
        )
        .then(dbUserData =>{
            if(!dbUserData){
                res.status(404).json({message: "No user found!"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteFriendId({params}, res){
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true, runValidators: true}
        )
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({message:"No user found!"});
                    return;
                }
                res.json(dbUserData);
            })
        .catch(err => res.status(400).json(err))
        
    }
}

module.exports = users;
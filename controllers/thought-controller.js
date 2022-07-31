const {Thought, User} = require('../models');


const thoughts = {
    //api thoughts
    //Getting all the thoughts
    AllThoughts(req, res){
       Thought.find()
            // remove select from showing in return of the json data
            .select('-__v')
            .sort({ createdAt: -1 })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought with this id!" })
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err));
    },
    //creating the new thought
    newThought({body}, res){
        Thought.create(body)
        .then(dbThoughtData =>{
            return User.findOneAndUpdate(
                {_id: body.userId},
                {$push: {thoughts: dbThoughtData._id}},
                {new: true}
            )
        })
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message:"No thought with this id!"})
                return;
            }
            res.json(dbUserData);
        }) 
        .catch(err => res.status(400).json(err));
    },

    //Getting the thought id's
    thoughtId({params}, res){
        Thought.findOne(
            {_id:params.id}
        )
        .select("-__v")
        .sort({createAt: -1})
        .then(dbThoughtData =>{
            if(!dbThoughtData){
                res.status(404).json({message: "No thought found!"})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err))

    },

    //UPDATE WITH ID'S
    updateThoughtId({params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.id},
            body,
            {new: true, runValidators: true}
        )
        .then(dbThoughtData =>{
            if (!dbThoughtData){
                res.status(404).json({message: "No thought found!"})
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(404).json(err));
    },

    //DELETING THE THOUGHT WITH ID's
    deleteThoughtId({params}, res){
        Thought.findOneAndDelete({_id:params.id })
        
        .then((dbThoughtData) => {
            if (!dbThoughtData){
                res.status(404).json({message: "No thought with this id!"})
                return;
            }
            return User.findOneAndUpdate(
                {user: dbThoughtData.user},
                {$pull: {thoughts: params.id}},
                {new: true} 
            )
    
        })
        //in case of error
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: "The user was not found!"});
                return;
            }
            res.json({message: "Thought deleted!"})
        })
        .catch(err => res.json(err));
    
    },

    newReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId }, //finding the thought id
            {$addToSet: {reactions: body}},//and return new data after I passed all validation
            {new: true, runValidators: true },//returning the data 
        
        )   
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: "The reaction was not found!"});
                return;
            }
            res.json({message: "Reaction Created!"})
        })
        .catch(err => res.json(err));

    },

    //deleting and removing a reaction 
    deleteReactionId({params}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId }, //finding the thought id
            {$pull: { reactions: {_id: params.reactionId } } },//returning the updated thought
            {new: true, runValidators: true },//returning the data
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({message: "The reaction was not found!"});
                return;
            }
            res.json({message: "Reaction deleted!"})
        })
        .catch(err => res.json(err));
    },

}

module.exports = thoughts;
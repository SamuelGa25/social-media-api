const { Schema, Types} = require("mongoose");


//Reaction schema 
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody:{
            type: String,
            required: 'Provide a reaction to this thought',
            maxLength: 280
        },
        username:{
            type: String,
            required: 'Provide your name:'
        },
        createdAt:{
            type: Date,
            default: Date.now,
            // get: (value) => moment().format("MMM DoB YY, h:mm a")
        },
    },
    {
        toJSON:{
            getters: true
        }
    }
);

module.exports = reactionSchema;
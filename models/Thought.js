const { Schema, model} = require("mongoose");


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
        name:{
            type: String,
            required: 'Provide your name:'
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: (value) => moment().format("MMM DoB YY, h:mm a")
        },
    },
    {
        toJSON:{
            virtuals: true,
            getters:true
        }
    }
)


//Thought Schema both on same file
const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: 'provide Thought text:',
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (value) => moment().format("MMM DoB YY, h:mm a")

        },
        name:{

            type: String,
            required: true,
            
        },
        reactions: [reactionSchema]
    },
    {
        toJSON:{
            virtuals: true,
            getters: true,
        },
        id: false,
    },
);

const Thought = model("Thought", thoughtSchema)

module.exports = Thought;
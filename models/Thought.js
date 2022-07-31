const { Schema, model} = require("mongoose");
const reactionSchema = require("./Reaction");


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
            // get: (value) => moment().format("MMM DoB YY, h:mm a")

        },
        username:{
            type: String,
            required: "Provide the username"
            
        },
        reactions: [reactionSchema]
    },
    {
        toJSON:{
            virtuals: true,
            getters: true,
        }
    }
);

thoughtSchema.virtual('reactionCount', function(){
    return this.reactions.length;
})

const Thought = model("Thought", thoughtSchema)

module.exports = Thought;
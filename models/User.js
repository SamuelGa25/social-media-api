const {Schema, model, Types }= require("mongoose");

const UserSchema = new Schema(
    {
        username:{
            type: String, 
            unique: true,
            required: "Provide a username:",
            trim: true,
        },
        email:{
            type: String,
            required: "Provide an email:",
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,9})$/],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            },
        ],
        friends:[
            {
                type:Schema.Types.ObjectId,
                ref:'User'
            },
        ],
    },
    {
        toJSON:{
            virtuals: true,
        },
    }
);

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length
});

const User = model('User', UserSchema);

module.exports = User;
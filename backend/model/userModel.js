const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Enter username"],
        unique:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:[true,"Enter email"],
        unique:true,
        max:50
    },
    password:{
        type:String,
        required:[true,"Enter password"]
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false,
    },
    avatarImage:{
        type:String,
        default:"",
    },
});

module.exports = mongoose.model("User",userSchema);

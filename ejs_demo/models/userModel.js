const express= require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username : {
            type:String,
            required:[true, "user is required."]
        },
        fullname : {
            type:String
        },
        address : {
            type:String
        },
        age:{
            type:Number
        }
    }     
);

const User = mongoose.model("Users", userSchema);

module.exports = User;
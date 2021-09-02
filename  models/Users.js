// import mongoose, { mongo } from 'mongoose';
const mongoose = require('mongoose')
// const { Schema } = mongoose;

// const userSchema = new Schema({
//   title:  String, // String is shorthand for {type: String}
//   author: String,
//   body:   String,
//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs:  Number
//   }
// });

const userSchema = mongoose.Schema({
    name :{
        type : String,
        maxlength :50
    },
    email : {
        type :String,
        trim : true,
        unique:1
    },
    password: {
        type : String,
        minlength : 5
    },
    lastname : {
        type : String,
        maxlength:50
    },
    role : {
        type :Number ,
        default : 0
    },
    image : String,
    token : {
        type : String
    },
    tokenExp :{
        type : Number
    }
})

const User = mongoose.model('User', userSchema)
module.exports = {User}
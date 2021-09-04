// import mongoose, { mongo } from 'mongoose';
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require(`jsonwebtoken`);
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

//  저장
userSchema.pre('save', function(next){
    // 비밀번호를 암호화시킴
    let user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) {
                return next(err)
                }
            bcrypt.hash(user.password , salt, function(err,hash){
                // Store hash in your password DB.
                if(err){
                    return next(err)
                }
                    user.password= hash
                    next()
            });
        });
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    // 비밀번호 비교할때  암호화된 비밀번호 
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch)
    })
}
userSchema.methods.generateToken = function (cb) {
    // jsonwebToken을 이용해서 token을 생성하기
    let user= this;
    let token = jwt.sign(user._id.toHexString(),'secretToken')

    // user._id + 'secretToken' = token
    user.token = token 
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    
    // user._id + '' = token
    // 토큰을 decoded 한다.
    jwt.verify(token,'secretToken', function (err, decoded){
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 db에 보관한 토큰이 일치하는지 확인

    user.findOne(
        {
            "_id" : decoded, 
            "token" : token
        }, 
        function(err,user){
            if(err) {
                return cb(err);
            }
                cb(null,user)
        })
    })
}

const User = mongoose.model('User', userSchema)
module.exports = {User}
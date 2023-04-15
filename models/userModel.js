const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

   
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    contact:{
        type:Number,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    }
})

const User = new mongoose.model('user', UserSchema);
module.exports = User;
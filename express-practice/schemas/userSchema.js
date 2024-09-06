const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 4
    },
    status:{
        type: String,
        enum: ['active','inactive']
    },
   
})





module.exports=userSchema;
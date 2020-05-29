const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email :{
        type:String,
        required:true
    },
    username : {
        type : String ,
        required :true
    },
    password :{
        type : String,
        required : true
    },
    messages :{
        type:String
    }
});

module.exports=mongoose.model('User',userSchema);
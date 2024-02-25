const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    user_id :{
        type:Number,
        require:true,
        unique: true,
    },
    name:{
        type: String,
        require: true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    }
})
const Users = mongoose.model|('Users', userSchema);
module.exports = Users;
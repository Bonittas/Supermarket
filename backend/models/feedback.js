const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
 name:{
  type:String,
  required: true,
  unique:true
 },
 email:{
  type:String,
  required:true

 },
 message:{
    type:String,
    required:true

 }
});

const FeedBack = mongoose.model('FeedBack', feedbackSchema);

module.exports = FeedBack;
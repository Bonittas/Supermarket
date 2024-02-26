const mongoose =  require('mongoose')
const categorieSchema= new mongoose.Schema({

    categoryName:{
        type : String,
        required: true,
        unique:true
    }
},{timestamps:true})
const Category = mongoose.model('Category', categorieSchema);
module.exports= Category;

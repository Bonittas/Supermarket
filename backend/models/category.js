const mongoose =  require('mongoose')
const categorieSchema= new mongoose.Schema({

    Category_name:{
        type : String,
        required: true,
    }
})
const Category = mongoose.model('Category', categorieSchema);
module.exports= Category;
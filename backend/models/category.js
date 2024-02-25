const mongoose =  require('mongoose')
const categorieSchema= new mongoose.Schema({
    Catergory_id:{
      type :Number,
      required:true,
      unique:true,
    },
    Category_name:{
        type : String,
        required: true,
    }
})
const Category = mongoose.model('Category', categorieSchema);
module.exports= Category;
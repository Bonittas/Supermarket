<<<<<<< HEAD
const mongoose =  require('mongoose')
const categorieSchema= new mongoose.Schema({

    Category_name:{
        type : String,
        required: true,
    }
})
const Category = mongoose.model('Category', categorieSchema);
module.exports= Category;
=======
const mongoose = require("mongoose");
const categorieSchema = new mongoose.Schema(
  {
    Catergory_id: {
      type: Number,
      required: true,
      unique: true,
    },
    Category_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Category = mongoose.model("Category", categorieSchema);
module.exports = Category;
>>>>>>> 9dd699c9da7c9f5f3aef393feb43a621fc6b80b8

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({

    name:{
        type: String,
        required: true,
        unique:true
    },
    price:{
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
      },
      categoryName: {
        type: String,
        required: true,
        unique:true

      },
      quantity:{
        type: Number,
        required: true,
      }

    
},{timestamps:true})
const Product = mongoose.model('Product',productSchema);
module.exports = Product;
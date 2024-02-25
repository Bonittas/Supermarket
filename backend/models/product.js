const mongoose = reuire('mongoose')
const productSchema = new mongoose.schema({
    product_id:{
        type:Number,
        required: true,
    },
    product_name:{
        type: String,
        required: true,
    },
    product_price:{
        type: Number,
        required: true,
    },
    product_image: {
        type: String,
        required: true,
      },
      categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },

    
})
const Product = mongoose.model('Product',productSchema);
module.exports = Product;
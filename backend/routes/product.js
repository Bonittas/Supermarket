const express = require("express")
const router = express.Router();
const {createProduct, updateProduct, deleteProduct, getProduct,upload,getFeaturedProducts, getProductsforadmin} = require('../controllers/product')


router.get('/products/list',getProduct );
router.get('/products/lists',getProductsforadmin );
router.post('/product', upload.single('image'), createProduct);
router.delete('/product/:id', deleteProduct );
router.patch('/product/:id',upload.single('image'), updateProduct );
router.get('/products/featured', getFeaturedProducts); 

module.exports= router
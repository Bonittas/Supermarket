const express = require("express")
const router = express.Router();
const {createProduct, updateProduct, deleteProduct, getProduct,upload} = require('../controllers/product')


router.get('/',getProduct );
router.post('/', upload.single('image'), createProduct);
router.delete('/:id',deleteProduct );
router.patch('/:id',updateProduct );

module.exports= router
const express = require("express")
const router = express.Router();
const upload = require('../middleware/upload');
const categoryController = require('../controllers/category');

const {createCategory, getCategories, updateCategory, deleteCategory, getCategoriesForadmin} = require('../controllers/category')


router.post('/category', upload.single('image'), createCategory);
router.get('/category/list',  getCategories);
router.get('/category/lists',  getCategoriesForadmin);
router.patch('/category/:id',upload.single('image'),  updateCategory);
router.delete('/category/:id',  deleteCategory);


module.exports= router
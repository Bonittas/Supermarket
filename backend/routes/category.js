const express = require("express")
const router = express.Router();
const {createCategory, getCategories, updateCategory, deleteCategory} = require('../controllers/category')


router.post('/category',  createCategory);
router.get('/category/list',  getCategories);
router.patch('/category:id',  updateCategory);
router.delete('/category:id',  deleteCategory);


module.exports= router
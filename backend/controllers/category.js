const Category = require('../models/category');
const Product = require('../models/product');
const fs = require('fs-extra');


const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const { filename } = req.file;

    const category = new Category({
      categoryName,
      categoryImage: filename
    });

    await category.save();

    res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};



const getCategories = async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch only categoryName and categoryImage
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete({ _id: id });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Delete the corresponding folder if it exists
    const categoryPath = `uploads/${category._doc.categoryName}`;
    try {
      await fs.promises.access(categoryPath);
      await fs.remove(categoryPath);
    } catch (error) {
      console.log('Folder does not exist or there was an error deleting it:', error);
    }

    // Delete all products associated with the category
    await Product.deleteMany({ categoryName: category._doc.categoryName });

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { categoryName, image } = req.body;
  console.log('Received data:', { id, categoryName, image });
  
  
  if (image) {
    Category.categoryImage = image;
  }
  
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, {
      categoryName,
      ...(image && { categoryImage: image }),
    }, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { createCategory, getCategories, updateCategory, deleteCategory };






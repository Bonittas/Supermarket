const Category = require('../models/category');
const Product = require('../models/product');
const fs = require('fs-extra');

const createCategory = async (req, res) => {
  const { categoryName } = req.body;

  try {
    const category = await Category.create({ categoryName });

    const categoryPath = `uploads/${categoryName}`;

    // Check if the category folder exists, create it if not
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  const { categoryName } = req.body;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const oldCategoryPath = `uploads/${category.categoryName}`;
    const newCategoryPath = `uploads/${categoryName}`;

    // Update all products associated with the category
    await Product.updateMany({ categoryName: category.categoryName }, { categoryName });

    category.categoryName = categoryName;
    await category.save();

    // Add a delay to ensure the filesystem has time to update
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      await fs.promises.access(oldCategoryPath);
      console.log('Folder exists. Renaming...');
      await fs.promises.rename(oldCategoryPath, newCategoryPath);
      console.log('Folder renamed successfully.');
    } catch (error) {
      console.log('Folder does not exist or there was an error renaming it:', error);
    }

    res.status(200).json(category);
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createCategory, getCategories, updateCategory, deleteCategory };

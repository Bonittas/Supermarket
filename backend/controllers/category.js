const Category = require('../models/category');
const fs = require('fs');

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

const updateCategory = async (req, res) => {
  const {id} = req.params;
  const { categoryName } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(
      { _id: id },
      {categoryName},
      { new: true }
    );

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const {id} = req.params.id;

  try {
    const category = await Category.findByIdAndDelete({_id:id});

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Additional logic for deleting associated files,
    //...

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createCategory, getCategories, updateCategory, deleteCategory };

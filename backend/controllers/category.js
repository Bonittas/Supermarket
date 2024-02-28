const Category = require('../models/category');
const fs = require('fs');


const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const { filename } = req.file; // Assuming you're using multer for file uploads
    
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
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  const { image } = req.file; // Assuming the image is uploaded as 'image' field in the request

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    if (image) {
      const categoryPath = `uploads/category/${category._id}`;
      const imagePath = `${categoryPath}/${image.originalname}`;
      image.mv(imagePath); // Move the uploaded image to the desired location

      if (category.image) {
        fs.unlinkSync(category.image); // Delete the previous image file
      }

      category.image = imagePath;
    }

    category.categoryName = categoryName;

    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    if (category.image) {
      fs.unlinkSync(category.image); // Delete the associated image file
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createCategory, getCategories, updateCategory, deleteCategory};
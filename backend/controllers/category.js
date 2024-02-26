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

module.exports = { createCategory };
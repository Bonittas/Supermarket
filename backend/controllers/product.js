const product = require("../models/product");
const Category = require("../models/category");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const categoryName = req.body.categoryName; 
    const categoryPath = `uploads/${categoryName}`;

    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true });
    }

    cb(null, categoryPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const createProduct = async (req, res) => {
    const { name, price, quantity, categoryName } = req.body;
  
    try {
      const newProduct = await product.create({
        name,
        price,
        quantity,
        categoryName,
        image: req.file.filename,
      });
  
      const categoryPath = `uploads/${categoryName}`;
      const destinationPath = `${categoryPath}/${req.file.filename}`;
      fs.renameSync(req.file.path, destinationPath);
  
      res.status(200).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const getProduct = async (req, res) => {
  try {

    const products = await product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await product.findOneAndDelete({ _id: id });

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const categoryPath = `uploads/${deletedProduct.categoryName}`;
    const filePath = `${categoryPath}/${deletedProduct.image}`;

    // Remove the file from the file system
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { categoryName: newCategoryName, ...updateData } = req.body;

  try {
    const existingProduct = await product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the new categoryName exists in the database of the categories
    const categoryExists = await Category.exists({ categoryName: newCategoryName });

    if (!categoryExists) {
      return res.status(400).json({ error: 'New category does not exist' });
    }

    // Construct the paths for old and new category
    const oldCategoryPath = `uploads/${existingProduct.categoryName}`;
    const newCategoryPath = `uploads/${newCategoryName}`;

    // Move the file to the new category folder
    const newFileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${updateData.image}`;
    const oldFilePath = `${oldCategoryPath}/${existingProduct.image}`;
    const newFilePath = `${newCategoryPath}/${newFileName}`;

    // Rename the file and update the product in the database
    fs.renameSync(oldFilePath, newFilePath);
    const updatedProduct = await product.findByIdAndUpdate(
      id,
      { ...updateData, categoryName: newCategoryName, image: newFileName },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { createProduct, updateProduct, deleteProduct, getProduct,upload };
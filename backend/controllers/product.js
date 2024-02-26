const product = require("../models/product");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
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
    await product.findOneAndDelete({ _id: id }); // Correct the field name to "_id"
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: 'Product not found' });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProduct = await product.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!updatedProduct) {
      return res.status(400).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createProduct, updateProduct, deleteProduct, getProduct,upload };
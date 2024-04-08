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
  const { name, price, quantity, categoryName, isFeatured } = req.body;

  try {
    const newProduct = await product.create({
      name,
      price,
      quantity,
      categoryName,
      image: req.file.filename,
      isFeatured: isFeatured === "true",
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
    const { searchQuery } = req.query;
    let products;

    if (searchQuery) {
      products = await product.find({ name: { $regex: searchQuery, $options: 'i' } });
    } else {
      products = await product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const getProductsforadmin = async (req, res) => {
  try {
    const { searchQuery, page, limit } = req.query;
    let query = {};

    // Add search functionality if searchQuery exists
    if (searchQuery) {
      query = {
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { categoryName: { $regex: searchQuery, $options: "i" } },
        ],
      };
    }

    // Pagination logic
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    // Fetch products with pagination and search query
    const products = await product.find(query).skip(skip).limit(pageSize);

    // Count total number of products matching the search query
    const totalProductsCount = await product.countDocuments(query);

    res.status(200).json({
      products,
      totalPages: Math.ceil(totalProductsCount / pageSize),
      currentPage: pageNumber,
      totalProducts: totalProductsCount,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await product.find({ isFeatured: true });
    res.status(200).json(featuredProducts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await product.findOneAndDelete({ _id: id });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const categoryPath = `uploads/${deletedProduct.categoryName}`;
    const filePath = `${categoryPath}/${deletedProduct.image}`;

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProduct =
  (upload.single("image"),
  async (req, res) => {
    const { id } = req.params;
    const { categoryName: newCategoryName, ...updateData } = req.body;

    try {
      const existingProduct = await product.findById(id);
      if (!existingProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      const categoryExists = await Category.exists({
        categoryName: newCategoryName,
      });

      if (!categoryExists) {
        return res.status(400).json({ error: "New category does not exist" });
      }

      const oldCategoryPath = `uploads/${existingProduct.categoryName}`;
      const newCategoryPath = `uploads/${newCategoryName}`;

      let newFileName = existingProduct.image;
      if (req.file) {
        newFileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${
          req.file.originalname
        }`;
      }

      const oldFilePath = `${oldCategoryPath}/${existingProduct.image}`;
      const newFilePath = `${newCategoryPath}/${newFileName}`;

      if (req.file && fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      if (fs.existsSync(oldFilePath)) {
        fs.renameSync(oldFilePath, newFilePath);
      }

      const updatedProduct = await product.findByIdAndUpdate(
        id,
        { ...updateData, categoryName: newCategoryName, image: newFileName },
        { new: true }
      );

      if (req.file) {
        fs.renameSync(req.file.path, `${newCategoryPath}/${newFileName}`);
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsforadmin,
  getProduct,
  upload,
  getFeaturedProducts,
};

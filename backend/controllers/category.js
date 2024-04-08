const Category = require("../models/category");
const Product = require("../models/product");
const fs = require("fs-extra");

const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const { filename } = req.file;

    const category = new Category({
      categoryName,
      categoryImage: filename,
    });

    await category.save();

    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find(); 
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getCategoriesForadmin = async (req, res) => {
  try {
    const { searchQuery, page, limit } = req.query;
    let query = {};

    if (searchQuery) {
      query = { categoryName: { $regex: searchQuery, $options: "i" } };
    }

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const categories = await Category.find(query).skip(skip).limit(pageSize);

    const totalCategoriesCount = await Category.countDocuments(query);

    res.status(200).json({
      categories,
      totalPages: Math.ceil(totalCategoriesCount / pageSize),
      currentPage: pageNumber,
      totalCategories: totalCategoriesCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete({ _id: id });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const categoryPath = `uploads/${category._doc.categoryName}`;
    try {
      await fs.promises.access(categoryPath);
      await fs.remove(categoryPath);
    } catch (error) {
      console.log(
        "Folder does not exist or there was an error deleting it:",
        error
      );
    }

    await Product.deleteMany({ categoryName: category._doc.categoryName });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  const newImage = req.file;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const oldCategoryPath = `uploads/${category.categoryName}`;
    const newCategoryPath = `uploads/${categoryName}`;

    // Update all products associated with the category
    await Product.updateMany(
      { categoryName: category.categoryName },
      { categoryName }
    );

    // If a new image is uploaded, delete the old image from the filesystem
    if (newImage) {
      const oldImagePath = `uploads/${category.categoryImage}`;
      try {
        await fs.promises.access(oldImagePath);
        await fs.promises.unlink(oldImagePath);
      } catch (error) {
        console.log(
          "Old image does not exist or there was an error deleting it:",
          error
        );
      }
      category.categoryImage = newImage.filename;
    }

    category.categoryName = categoryName;
    await category.save();

    // Add a delay to ensure the filesystem has time to update
    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      await fs.promises.access(oldCategoryPath);
      console.log("Folder exists. Renaming...");
      await fs.promises.rename(oldCategoryPath, newCategoryPath);
      console.log("Folder renamed successfully.");
    } catch (error) {
      console.log(
        "Folder does not exist or there was an error renaming it:",
        error
      );
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoriesForadmin,
  updateCategory,
  deleteCategory,
};

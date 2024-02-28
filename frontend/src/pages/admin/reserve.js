

// import React, { useState } from "react";
// import axios from "axios";
// // import Header from "../../components/Header3";

// const CategoryForm = () => {
//   const [newCategory, setNewCategory] = useState({
//     categoryName: "",
//     image: null,
//   });
//   const [error, setError] = useState(null);

//   const handleCategoryChange = (e) => {
//     setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setNewCategory((prevCategory) => ({
//       ...prevCategory,
//       image: file,
//     }));
//   };

//   const handleCategorySubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const formData = new FormData();
//       formData.append("categoryName", newCategory.categoryName);
//       formData.append("image", newCategory.image);
  
//       const response = await axios.post('/api/category', formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("Successfully created category!", response.data);
  
//       setNewCategory({ categoryName: "", image: null });
//       setError(null);
//     } catch (error) {
//       console.error("Error creating category:", error);
//       setError("Error creating category");
//     }
//   };
  
//   return (
//     <>
//       {/* <Header /> */}
//       <div className="bg-green-50 min-h-screen p-6 shadow-md m-5">
//         <div className="w-1/2 mx-auto mt-8">
//           <h2 className="text-2xl font-bold mb-4">Create New Category</h2>
//           <form onSubmit={handleCategorySubmit}>
//             <div className="mb-4">
//               <label htmlFor="categoryName" className="block text-gray-700 font-bold">
//                 Category Name
//               </label>
//               <input
//                 type="text"
//                 id="categoryName"
//                 name="categoryName"
//                 value={newCategory.categoryName}
//                 onChange={handleCategoryChange}
//                 className="form-input mt-1 block w-3/6"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="image" className="block text-gray-700 font-bold">
//                 Image
//               </label>
//               <input
//                 type="file"
//                 id="image"
//                 name="image"
//                 onChange={handleImageChange}
//                 className="mt-1 block w-3/6"
//                 accept="image/*"
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
//             >
//               Create Category
//             </button>
//             {error && <p className="text-red-500 mt-2">{error}</p>}
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CategoryForm;







// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const CategoryList = () => {
//   const [categories, setCategories] = useState([]);
//   const [editingCategory, setEditingCategory] = useState(null);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("/api/category/list");
//       setCategories(response.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const handleEditCategory = (categoryId) => {
//     // Set the category being edited
//     const categoryToEdit = categories.find((category) => category._id === categoryId);
//     setEditingCategory(categoryToEdit);
//   };

//   const handleCancelEdit = () => {
//     // Cancel the edit mode
//     setEditingCategory(null);
//   };

//   const handleEditSave = async (editedCategory) => {
//     try {
//       const formData = new FormData();
//       formData.append("categoryName", editedCategory.categoryName);
//       formData.append("image", editedCategory.image);

//       // Update the category with the edited data
//       const response = await axios.put(`/api/category/${editedCategory._id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("Successfully updated category!", response.data);

//       // Refresh the category list
//       fetchCategories();

//       // Cancel the edit mode
//       setEditingCategory(null);
//     } catch (error) {
//       console.error("Error updating category:", error);
//     }
//   };

//   const handleDeleteCategory = async (categoryId) => {
//     try {
//       await axios.delete(`/api/category/${categoryId}`);
//       fetchCategories(); // Refresh the category list after deletion
//     } catch (error) {
//       console.error("Error deleting category:", error);
//     }
//   };

//   return (
//     <>
//       <div className="bg-green-50 min-h-screen p-6 shadow-md m-5">
//         <div className="w-full mx-auto mt-8">
//           <h2 className="text-2xl font-bold mb-4">All Categories</h2>
//           <table className="min-w-full bg-white border border-gray-300">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b">Category Name</th>
//                 <th className="py-2 px-4 border-b">Image</th>
//                 <th className="py-2 px-4 border-b">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categories.map((category) => (
//                 <tr key={category._id}>
//                   <td className="py-2 px-4 border-b">{category.categoryName}</td>
//                   <td className="py-2 px-4 border-b">
//                     {category.image && (
//                       <img
//                         src={`/uploads/${category.categoryImage}`}
//                         alt={category.categoryName}
//                         className="w-20 h-20"
//                         onError={(e) => console.error("Image load error:", e)}
//                       />
//                     )}
//                   </td>
//                   <td className="py-2 px-4 border-b">
//                     {editingCategory && editingCategory._id === category._id ? (
//                       <>
//                         <button
//                           className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600 transition-colors"
//                           onClick={() => handleEditSave(editingCategory)}
//                         >
//                           Save
//                         </button>
//                         <button
//                           className="bg-gray-500 text-white px-2 py-1 ml-2 rounded-lg hover:bg-gray-600 transition-colors"
//                           onClick={handleCancelEdit}
//                         >
//                           Cancel
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button
//                           className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600 transition-colors"
//                           onClick={() => handleEditCategory(category._id)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="bg-red-500 text-white px-2 py-1 ml-2 rounded-lg hover:bg-red-600 transition-colors"
//                           onClick={() => handleDeleteCategory(category._id)}
//                         >
//                           Delete
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CategoryList;




// const Category = require('../models/category');
// const fs = require('fs');
// const path = require('path');

// const createCategory = async (req, res) => {
//   try {
//     const { categoryName } = req.body;
//     const { filename } = req.file; // Assuming you're using multer for file uploads
    
//     const category = new Category({
//       categoryName,
//       categoryImage: filename
//     });

//     await category.save();

//     res.status(201).json({ message: 'Category created successfully' });
//   } catch (error) {
//     console.error('Error creating category:', error);
//     res.status(500).json({ message: 'Error creating category' });
//   }
// };

// const getCategories = async (req, res) => {
//   try {
//     const categories = await Category.find();

//     // Check if categories contain valid image paths
//     const categoriesWithValidImages = categories.map(category => {
//       if (category.image) {
//         try {
//           // Validate if the image file exists
//           fs.accessSync(category.image, fs.constants.F_OK);
//         } catch (imageError) {
//           // Log the error if the image file is missing
//           console.error(`Error loading image for category ${category._id}: ${imageError.message}`);
//           category.image = null; // Set image to null for categories with missing images
//         }
//       }
//       return category;
//     });

//     res.status(200).json(categoriesWithValidImages);
//   } catch (error) {
//     console.error('Error getting categories:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


// const updateCategory = async (req, res) => {
//   const { id } = req.params;
//   const { categoryName } = req.body;
//   const { image } = req.file; // Assuming the image is uploaded as 'image' field in the request

//   try {
//     const category = await Category.findById(id);

//     if (!category) {
//       return res.status(404).json({ error: 'Category not found' });
//     }

//     if (image) {
//       const categoryPath = path.join(__dirname, `../uploads/category/${category._id}`);
//       const imagePath = path.join(categoryPath, `${image.originalname}`);
      
//       // Create the directory if it doesn't exist
//       if (!fs.existsSync(categoryPath)) {
//         fs.mkdirSync(categoryPath, { recursive: true });
//       }

//       image.mv(imagePath, (err) => {
//         if (err) {
//           console.error('Error moving uploaded image:', err);
//           return res.status(500).json({ error: 'Internal server error' });
//         }
//       });

//       if (category.categoryImage) {
//         // Delete the previous image file
//         const previousImagePath = path.join(__dirname, '../', category.categoryImage);
//         fs.unlinkSync(previousImagePath);
//       }

//       category.categoryImage = imagePath;
//     }

//     category.categoryName = categoryName;

//     const updatedCategory = await category.save();
//     res.status(200).json(updatedCategory);
//   } catch (error) {
//     console.error('Error updating category:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const deleteCategory = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const category = await Category.findByIdAndDelete(id);

//     if (!category) {
//       return res.status(404).json({ error: 'Category not found' });
//     }

//     if (category.categoryImage) {
//       // Delete the associated image file
//       const imagePath = path.join(__dirname, '../', category.categoryImage);
//       fs.unlinkSync(imagePath);
//     }

//     res.status(200).json({ message: 'Category deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting category:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = { createCategory, getCategories, updateCategory, deleteCategory };
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors"); // Import the cors package
// const userAuth = require("./routes/user.router");
// const connectToDatabase = require("./config/database");
// const app = express();
// const product = require("./routes/product");
// const path = require("path");
// const category = require("./routes/category");

// // Middleware for parsing the request body
// app.use(express.jsaon());

// app.use("/", (req, res, next) => {
//   console.log(req.method, req.path);
//   next();
// });

// // Enable CORS for all routes
// app.use(cors());

// // Connect to the database
// connectToDatabase();

// app.use("/api", product);
// app.use("/api", category);
// app.use("/api/auth", userAuth);


// app.use((err, req, res, next) => {
//   console.error(err.stack); // Log the error stack trace
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Start the server
// app.listen(process.env.PORT, () => {
//   console.log("listening on port", process.env.PORT);
// });

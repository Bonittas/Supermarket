import React, { useState } from "react";
import axios from "axios";

const CategoryForm = () => {
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    image: null,
  });
  const [error, setError] = useState(null);

  const handleCategoryChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      image: file,
    }));
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("categoryName", newCategory.categoryName);
      formData.append("image", newCategory.image);

      const response = await axios.post('/api/category', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Successfully created category!", response.data);

      setNewCategory({ categoryName: "", image: null });
      setError(null);
    } catch (error) {
      console.error("Error creating category:", error);
      setError("Error creating category");
    }
  };

  return (
    <>
      {/* Container */}
      <div className="bg-green-50 h-auto px-4 pb-6 pt-2 border rounded-lg shadow-lg mx-auto my-2">
        {/* Form Wrapper */}
        <div className="w-1/2 mx-auto mt-4">
          {/* Form Title */}
          <h2 className="text-2xl font-bold mb-4 text-center">Create New Category</h2>
          
          {/* Form */}
          <form onSubmit={handleCategorySubmit} className="w-full mx-auto mt-4">
            {/* Category Name Input */}
            <div className="mb-4">
              <label htmlFor="categoryName" className="block text-gray-700 font-bold mb-2">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                value={newCategory.categoryName}
                onChange={handleCategoryChange}
                className="mt-1 block w-1/3 rounded-md border-2 border-gray-400 focus:border-green-500"
                required
              />
            </div>
            
            {/* Image Input */}
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Create Category
            </button>
            
            {/* Error Message */}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default CategoryForm;

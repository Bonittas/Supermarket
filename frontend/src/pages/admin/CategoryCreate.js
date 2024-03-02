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
      {/* <Header /> */}
      <div className="bg-green-50 min-h-screen p-6 shadow-md m-5">
        <div className="w-1/2 mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-4">Create New Category</h2>
          <form onSubmit={handleCategorySubmit}>
            <div className="mb-4">
              <label htmlFor="categoryName" className="block text-gray-700 font-bold">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                value={newCategory.categoryName}
                onChange={handleCategoryChange}
                className="form-input mt-1 block w-3/6"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 font-bold">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="mt-1 block w-3/6"
                accept="image/*"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Create Category
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default CategoryForm;
import React, { useState } from "react";
import axios from "axios";
import Header from "../../components/Header3";

const CategoryForm = () => {
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
  });
  const [error, setError] = useState(null);

  const handleCategoryChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    try {
      // Create new category
      const response = await axios.post("/api/category", {
        categoryName: newCategory.categoryName,
      });
      console.log("Succussfully created category!", response.data);

      // Reset form after successful creation
      setNewCategory({ categoryName: "" });
      setError(""); // Clear any previous errors
    } catch (error) {
      setError("Error creating category:");
      console.log(error)
    }
  };

  return (
    <>
    <div className="bg-green-50 min-h-screen p-6 shadow-md m-5 ">
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
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Create Category
        </button>
        {error && (
          <p className="text-red-500 mt-2">{error}</p>
        )}
      </form>
    </div>
    </div>
    </>
  );
};

export default CategoryForm;
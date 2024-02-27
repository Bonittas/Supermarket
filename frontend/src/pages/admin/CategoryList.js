import React, { useState, useEffect } from "react";
import Header from "../../components/Header3";
import axios from "axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category/list");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEditCategory = (categoryId) => {
    // Set the category being edited
    const categoryToEdit = categories.find((category) => category._id === categoryId);
    setEditingCategory(categoryToEdit);
  };

  const handleCancelEdit = () => {
    // Cancel the edit mode
    setEditingCategory(null);
  };

  const handleEditSave = (editedCategory) => {
    // Update the categories list with the edited category
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === editedCategory._id ? editedCategory : category
      )
    );

    // Cancel the edit mode
    setEditingCategory(null);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`/api/category/${categoryId}`);
      fetchCategories(); // Refresh the category list after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <>
      <div className="bg-green-50 min-h-screen p-6 shadow-md m-5">
        <div className="w-full mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-4">All Categories</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Category Name</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className="py-2 px-4 border-b">{category.categoryName}</td>
                  <td className="py-2 px-4 border-b">
                    {editingCategory && editingCategory._id === category._id ? (
                      <>
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600 transition-colors"
                          onClick={() => handleEditSave(editingCategory)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-500 text-white px-2 py-1 ml-2 rounded-lg hover:bg-gray-600 transition-colors"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600 transition-colors"
                          onClick={() => handleEditCategory(category._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 ml-2 rounded-lg hover:bg-red-600 transition-colors"
                          onClick={() => handleDeleteCategory(category._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
